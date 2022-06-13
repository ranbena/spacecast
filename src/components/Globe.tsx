import React from "react";
import { fetchImagesData, getImageUrl } from "../api";
import { loadImage } from "../utils/loadImage";
import styles from "./Globe.module.css";
import { ANIMATION_FPS, GLOBE_SIZE } from "../config";
import { useInterval } from "../utils/useInterval";
import Progress from "./Progress";

const frameInterval = Math.round(1000 / ANIMATION_FPS);

function Images({ items }: { items: (HTMLImageElement | null)[] }) {
  const index = React.useRef(0);
  const ref = React.useRef<HTMLCanvasElement | null>(null);
  const interval = useInterval(frameInterval);

  React.useEffect(() => {
    let index_ = index.current + 1;
    if (index_ === items.length) {
      index_ = 0;
    }
    index.current = index_;

    const context = ref.current?.getContext("2d");
    const image = items[index_];
    if (context && image) {
      context.drawImage(image, 0, 0, GLOBE_SIZE, GLOBE_SIZE);
    }
  }, [interval, items]);

  return (
    <canvas
      className={styles.canvas}
      ref={ref}
      width={GLOBE_SIZE}
      height={GLOBE_SIZE}
    />
  );
}

function Globe({ date }: { date: string }) {
  const [loaded, setLoaded] = React.useState(0);
  const [images, setImages] = React.useState<(HTMLImageElement | null)[]>();
  const [error, setError] = React.useState<string>();

  const ready = images?.length && loaded === images.length;

  React.useEffect(() => {
    fetchImagesData(new Date(date).valueOf()).then((data) => {
      const urls = data.map(({ image }) => getImageUrl(date, image));

      const images_: HTMLImageElement[] = [];
      const promises = urls.map((url) => {
        const img = new Image();
        images_.push(img);
        return loadImage(url, img).then(() => {
          setLoaded((prev) => prev + 1);
        });
      });

      setImages(images_);

      Promise.all(promises).catch(() => {
        setError("Failed to retreive all images");
      });
    });

    // remove images from memory
    return () => {
      setImages((images) => {
        images?.forEach((img) => {
          img = null;
        });

        return undefined;
      });

      setLoaded(0);
    };
  }, [date]);

  return (
    <div className={styles.root}>
      {error ? (
        <div>{error}</div>
      ) : ready ? (
        <Images items={images} />
      ) : images ? (
        // the minus 1 is so that the last step would seem full, or else the progress would never show full
        <Progress total={images.length - 1} current={loaded} />
      ) : null}
    </div>
  );
}

export default Globe;
