import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useMovieStore = defineStore("movie", () => {
  const movies = ref<any[]>([]);
  const loading = ref(false);
  const movieDetail = ref<any>(null);
  const detailLoading = ref(false);
  const error = ref<string | null>(null);

  const apiKey = "4fea2a6c366b2178d11ca9763eb39dac";
  const fetchMovies = async () => {
    loading.value = true;
    const apikey = "4fea2a6c366b2178d11ca9763eb39dac";
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=1`;
    try {
      const response = await axios.get(url);
      movies.value = response.data.results;
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      loading.value = false;
    }
  };

  // Fetch details of a single movie
  const fetchMovieDetails = async (id: string) => {
    detailLoading.value = true;
    error.value = null;
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
      );
      movieDetail.value = response.data;
    } catch (err) {
      error.value = "Failed to fetch movie details.";
      console.error("Error fetching movie details:", err);
    } finally {
      detailLoading.value = false;
    }
  };

  return {
    movies,
    loading,
    fetchMovies,
    movieDetail,
    fetchMovieDetails,
    detailLoading,
    error,
  };
});
