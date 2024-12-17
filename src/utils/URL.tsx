import axios from "axios";
import { getFromStorage } from "./localstorage";

const getAPIKey = async () => {
  const key = await getFromStorage("TMDb-Key");
  return key;
};

const BASE_URL = "https://api.themoviedb.org/3";
const lang = "ko-KR";

export class TMDB {
  filterMovies = async ({
    page,
    genre,
    rating,
    sortBy,
    sortDirection,
  }: any) => {
    try {
      const API_KEY = await getAPIKey(); // await 추가
      const response = await axios.get(`${BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          page,
          with_genres: genre || undefined,
          "vote_average.gte": rating || undefined,
          sort_by: `${sortBy}.${sortDirection}`,
          language: "ko-KR",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch filtered movies:", error);
      return [];
    }
  };

  fetchMovies = async (page: number = 1) => {
    try {
      const API_KEY = await getAPIKey(); // await 추가
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: { api_key: API_KEY, language: lang, page: page },
      });
      console.log(lang);
      return response.data.results;
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      return [];
    }
  };

  getNowPlaying = async () => {
    try {
      const API_KEY = await getAPIKey(); // await 추가
      const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
        params: { api_key: API_KEY, language: lang, page: 2 },
      });
      return response.data.results;
    } catch (error) {
      console.error("Failed to fetch now playing movies:", error);
      return [];
    }
  };

  getTop_Rated = async () => {
    try {
      const API_KEY = await getAPIKey(); // await 추가
      const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
        params: { api_key: API_KEY, language: lang, page: 2 },
      });
      return response.data.results;
    } catch (error) {
      console.error("Failed to fetch top-rated movies:", error);
      return [];
    }
  };

  getUpcoming = async () => {
    try {
      const API_KEY = await getAPIKey(); // await 추가
      const response = await axios.get(
        `${BASE_URL}/discover/movie?include_adult=false&include_video=false&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}`,
        {
          params: { api_key: API_KEY, language: lang, page: 3 },
        }
      );
      return response.data.results;
    } catch (error) {
      console.error("Failed to fetch upcoming movies:", error);
      return [];
    }
  };
}

export const tmdb = new TMDB();
