const API_KEY = "1e5f7d71230a3518f670cab20c6d5d29";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  total_pages: number;
  total_results: number;
  results: IMovie[];
}

export interface IGetDetail extends IMovie {
  release_date: string;
}

export function getNowMovie(): Promise<IGetMoviesResult> {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then((res) => res.json());
}

export function getPopularMovie() {
  return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}`).then((res) => res.json());
}

export function getTopMovie() {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then((res) => res.json());
}

export function getUpcomingMovie() {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then((res) => res.json());
}

export function getDetail(type: string, id: string) {
  return fetch(`${BASE_PATH}/${type}/${id}?api_key=${API_KEY}`).then((res) => res.json());
}
