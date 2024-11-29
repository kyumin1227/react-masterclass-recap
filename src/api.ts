const BASE_URL = "https://api.coinpaprika.com/v1";
const BASE_URL2 = "https://ohlcv-api.nomadcoders.workers.dev";

export const fetchCoins = () => {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
};

export const fetchCoinInfo = (coinId: string) => {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) => response.json());
};

export const fetchCoinTickers = (coinId: string) => {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) => response.json());
};

export const fetchCoinHistory = (coinId: string) => {
  return fetch(`${BASE_URL2}/?coinId=${coinId}`).then((response) => response.json());
};
