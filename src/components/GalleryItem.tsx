import React from "react";
import styles from "./GalleryItem.module.css";

interface Iprops {
    url: string;
    fadeOut: boolean;
    zIndex: number;
}

function GalleryItem({ url, fadeOut, zIndex }: Iprops) {
    return (
        <div
            className={`${styles.root} ${fadeOut ? styles.fadeOut : ""}`}
            style={{ backgroundImage: `url(${url})`, zIndex }}
        />
    );
}

export default GalleryItem;
