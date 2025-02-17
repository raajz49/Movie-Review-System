import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useGenreStore = defineStore("genre", () => {
  const genres = ref<any[]>([]);
  const loading = ref(false);

  const fetchGenres = async () => {
    loading.value = true;
    const apikey = "4fea2a6c366b2178d11ca9763eb39dac";
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}&language=en-US&page=1`;
    try {
      const response = await axios.get(url);
      genres.value = response.data.genres;
    } catch (error) {
      console.error("Error fetching genres:", error);
    } finally {
      loading.value = false;
    }
  };
  return { genres, loading, fetchGenres };
});
