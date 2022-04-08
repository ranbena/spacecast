export type ApodT = {
    copyright: string;
    date: string;
    explanation: string;
    hdurl: string;
    media_type: string;
    service_version: string;
    title: string;
    url: string;
};

export const fetchData = async (): Promise<ApodT> => {
    const response = await fetch(
        `https://api.nasa.gov/planetary/apod?count=1&api_key=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.json();
    return data[0];
};
