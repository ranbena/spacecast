import React from "react";
import { fetchData } from "./api";
import Gallery from "./components/Gallery";
import Loader from "./components/Loader";
import { GALLERY_INTERVAL } from "./config";
import { loadImage } from "./utils/loadImage";

type ImageDataT = { url: string, deferInterval?: boolean };

function App() {
    const [imageData, setImageData] = React.useState<ImageDataT>();

    // load new image
    const loadNewImage = React.useCallback(async () => {
        const data = await fetchData();
        loadImage(data.hdurl || data.url).then((url) => setImageData({ url }));
    }, []);

    // load initial image
    const loadInitialImage = React.useCallback(async () => {
        try {
            // load sd image
            const data = await fetchData();
            await loadImage(data.url).then((url) => setImageData({ url, deferInterval: !!data.hdurl }));

            // load hd image if available, new image if not
            if (data.hdurl) {
                loadImage(data.hdurl).then((url) => setImageData({ url }));
            } else {
                loadNewImage();    
            }
        } catch {
            // sth went wrong, load new image
            loadNewImage();
        }
    }, [loadNewImage]);


    // on imageUrl change
    React.useEffect(() => {
        let timeoutId: NodeJS.Timeout | undefined;

        // set timeout for new image, if not deferred
        if (imageData && !imageData.deferInterval) {
            timeoutId = setTimeout(loadNewImage, GALLERY_INTERVAL);
        }
        
        // clear timeout on unmount
        return () => timeoutId && clearTimeout(timeoutId);
    }, [imageData, loadNewImage]);

    // load initial image on mount
    React.useEffect(() => {
        loadInitialImage();
    }, [loadInitialImage]);

    return !imageData ? <Loader /> : <Gallery url={imageData.url} />;
}

export default App;
