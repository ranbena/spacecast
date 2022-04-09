import React from "react";
import cx from "classnames";
import styles from "./GalleryItem.module.css";

interface Iprops {
    url: string;
    transitionDuration?: number;
    onTransitionEnd?(): void;
}

function GalleryItem({ url, transitionDuration = 0, onTransitionEnd }: Iprops) {
    const style = React.useMemo(() => ({
        backgroundImage: `url(${url})`,
        "--transition-duration": `${transitionDuration}ms`,
    }), [transitionDuration, url]);

    return (
        <div
            className={cx(styles.root, {[styles.fadeIn]: !!transitionDuration})}
            onAnimationEnd={onTransitionEnd}
            style={style}
        />
    );
}

export default GalleryItem;
