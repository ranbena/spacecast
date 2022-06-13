import { fetchAndParse } from "./utils/fetch";
import { formatDate } from "./utils/format";

const API_KEY = process.env.REACT_APP_API_KEY;

export type DatesT = {
  date: string;
}[];

type ImagesT = {
  identifier: string;
  caption: string;
  image: string;
  version: string;
  centroid_coordinates: {
    lat: number;
    lon: number;
  };
  dscovr_j2000_position: {
    x: number;
    y: number;
    z: number;
  };
  lunar_j2000_position: {
    x: number;
    y: number;
    z: number;
  };
  sun_j2000_position: {
    x: number;
    y: number;
    z: number;
  };
  attitude_quaternions: {
    q0: number;
    q1: number;
    q2: number;
    q3: number;
  };
  date: string;
}[];

export function fetchDates(): Promise<DatesT> {
  return fetchAndParse<DatesT>(
    `https://api.nasa.gov/EPIC/api/natural/all?api_key=${API_KEY}`
  );
}

export function fetchImagesData(timestamp: number): Promise<ImagesT> {
  return fetchAndParse<ImagesT>(
    `https://api.nasa.gov/EPIC/api/natural/date/${formatDate(
      new Date(timestamp)
    )}?api_key=${API_KEY}`
  );
}

export function getImageUrl(datestring: string, fileName: string): string {
  return `https://api.nasa.gov/EPIC/archive/natural/${formatDate(
    new Date(datestring),
    "/"
  )}/png/${fileName}.png?api_key=${API_KEY}`;
}
