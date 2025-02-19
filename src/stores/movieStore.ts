import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useMovieStore = defineStore("movie", () => {
  const movies = ref<any[]>([]);
  const loading = ref(false);
  const movieDetail = ref<any>(null);
  const viewersChoiceMovies = ref<any[]>([]);
  const latestMovies = ref<any[]>([]);
  const detailLoading = ref(false);
  const error = ref<string | null>(null);
  const apiKey = "4fea2a6c366b2178d11ca9763eb39dac";

  const fetchMovies = async () => {
    loading.value = true;
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
    try {
      const response = await axios.get(url);
      movies.value = response.data.results;
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      loading.value = false;
    }
  };
  // Latest Movies (by date/now playing)
  const fetchLatestMovies = async () => {
    loading.value = true;
    error.value = null;
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;
    try {
      const response = await axios.get(url);
      latestMovies.value = response.data.results;
    } catch (err) {
      error.value = "Failed to load latest movies.";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };
  // Viewer's Choice Movies (by rating/top rated)
  const fetchViewerChoiceMovies = async () => {
    loading.value = true;
    error.value = null;
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;
    try {
      const response = await axios.get(url);
      viewersChoiceMovies.value = response.data.results;
    } catch (err) {
      error.value = "Failed to load viewer's choice movies.";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };
  // // Fetch details of a single movie
  // const fetchMovieDetails = async (id: string) => {
  //   detailLoading.value = true;
  //   error.value = null;
  //   const apiKey = "4fea2a6c366b2178d11ca9763eb39dac";

  //   try {
  //     const response = await axios.get(
  //       `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
  //     );
  //     movieDetail.value = response.data;
  //   } catch (err) {
  //     error.value = "Failed to fetch movie details.";
  //     console.error("Error fetching movie details:", err);
  //   } finally {
  //     detailLoading.value = false;
  //   }
  // };
  // const fetchLatestMovies = async () => {
  //   loading.value = true;
  //   error.value = "";
  //   const apiKey = "4fea2a6c366b2178d11ca9763eb39dac";
  //   const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;

  //   try {
  //     const response = await axios.get(url);
  //     latestMovies.value = response.data.results;
  //   } catch (err) {
  //     error.value = "Failed to load latest movies.";
  //     console.error(err);
  //   } finally {
  //     loading.value = false;
  //   }
  // };

  return {
    movies,
    loading,
    fetchMovies,
    movieDetail,
    viewersChoiceMovies,
    fetchViewerChoiceMovies,
    detailLoading,
    error,
    latestMovies,
    fetchLatestMovies,
  };
});
