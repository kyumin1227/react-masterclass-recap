const API_KEY = "1e5f7d71230a3518f670cab20c6d5d29";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  name: string;
  last_air_date: string;
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

export function getAiringTv() {
  return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`).then((res) => res.json());
}

export function getOnTheAirTv() {
  return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}`).then((res) => res.json());
}

export function getPopularTv() {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then((res) => res.json());
}

export function getTopTv() {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then((res) => res.json());
}

export function getDetail(type: string, id: string) {
  return fetch(`${BASE_PATH}/${type}/${id}?api_key=${API_KEY}`).then((res) => res.json());
}

export function getSearch(keyword: string) {
  return fetch(`${BASE_PATH}/search/multi?query=${keyword}&api_key=${API_KEY}`).then((res) => res.json());
}
