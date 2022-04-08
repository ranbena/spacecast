import React, { useEffect, useState } from "react";
import { ApodT, fetchData } from "./api";

import "./App.css";
import GalleryItem from "./components/GalleryItem";
import Loader from "./components/Loader";

function App() {
    const [data, setData] = useState<ApodT>();
    const [firstUrl, setFirstUrl] = useState<string>();
    const [secondUrl, setSecondUrl] = useState<string>();
    const [firstZindex, setFirstZindex] = useState<number>(1);
    const [secondZindex, setSecondZindex] = useState<number>(0);
    const [fadeOutFirst, setFadeOutFirst] = useState<boolean>(false);
    const [fadeOutSecond, setFadeOutSecond] = useState<boolean>(false);

    console.log(firstUrl);

    const getImage = (isFirstImage: boolean) => {
        fetchData().then((data) => {
            setData(data);
            // if (!firstUrl) {
            //     setFirstUrl(data.url);
            // }
            setFadeOutFirst(false);
            setFadeOutSecond(false);
            isFirstImage ? setFirstUrl(data.hdurl) : setSecondUrl(data.hdurl);
            const imgLoader = new Image();
            imgLoader.src = data.hdurl;
            imgLoader.onload = () => {
                isFirstImage ? setFadeOutSecond(true) : setFadeOutFirst(true);
                if (isFirstImage) {
                    setFirstUrl(data.hdurl);
                    setFadeOutSecond(true);
                } else {
                    setSecondUrl(data.hdurl);
                    setFadeOutFirst(true);
                }
            };
        });
    };

    useEffect(() => {
        getImage(true);

        setInterval(() => {
            setSecondZindex(firstZindex - 1);
            getImage(false);
            setTimeout(() => {
                setFirstZindex(secondZindex - 1);
                getImage(true);
            }, 5000);
        }, 10000);
    }, []);

    return (
        <div className="App">
            {!data ? (
                <Loader />
            ) : (
                <>
                    <GalleryItem
                        url={firstUrl!}
                        fadeOut={fadeOutFirst}
                        zIndex={firstZindex!}
                    />
                    <GalleryItem
                        url={secondUrl!}
                        fadeOut={fadeOutSecond}
                        zIndex={secondZindex!}
                    />
                </>
            )}
        </div>
    );
}

export default App;
