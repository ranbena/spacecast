import React from "react";
import {
    GALLERY_TRANSITION_DURATION,
    INITIAL_GALLERY_TRANSITION_DURATION,
} from "../config";
import Clock from "./Clock";
import GalleryItem from "./GalleryItem";

interface IProps {
    url: string;
}

function Gallery({ url }: IProps) {
    const [url1, setUrl1] = React.useState<string>();
    const [url2, setUrl2] = React.useState<string>();

    // determine transition duration
    const transitionDuration = React.useMemo(
        () =>
            !url1
                ? INITIAL_GALLERY_TRANSITION_DURATION
                : GALLERY_TRANSITION_DURATION,
        [url1]
    );

    const onTransitionEnd = React.useCallback(() => setUrl1(url2), [url2]);

    React.useEffect(() => setUrl2(url), [url]);

    return (
        <>
            {url1 && <GalleryItem url={url1} />}
            {url2 && (
                <GalleryItem
                    key={url2}
                    url={url2}
                    transitionDuration={transitionDuration}
                    onTransitionEnd={onTransitionEnd}
                />
            )}
            <Clock />
        </>
    );
}

export default Gallery;
