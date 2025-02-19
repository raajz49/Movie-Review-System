import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useTvShowStore = defineStore("show", () => {
  const series = ref<any[]>([]);
  const latestTvShows = ref([]);
  const popularTvShows = ref([]);
  const loading = ref(false);
  const apiKey = "4fea2a6c366b2178d11ca9763eb39dac";

  const fetchSeries = async () => {
    loading.value = true;
    const url = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`;
    try {
      const response = await axios.get(url);
      series.value = response.data.results;
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      loading.value = false;
    }
  };
  const fetchPopularTvShows = async () => {
    loading.value = true;
    const url = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`;

    try {
      const response = await axios.get(url);
      // console.log(response.data.results);
      popularTvShows.value = response.data.results;
    } catch (err) {
      console.error("Error fetching popular TV shows:", err);
    } finally {
      loading.value = false;
    }
  };
  const fetchLatestTvShows = async () => {
    loading.value = true;
    const url = `https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}&language=en-US&page=1`;
    try {
      const response = await axios.get(url);
      // Assuming you want to store these in a separate variable:
      console.log(response.data.results);
      latestTvShows.value = response.data.results;
    } catch (err) {
      console.error("Error fetching latest TV shows:", err);
    } finally {
      loading.value = false;
    }
  };

  return {
    series,
    loading,
    fetchSeries,
    fetchPopularTvShows,
    popularTvShows,
    fetchLatestTvShows,
    latestTvShows,
  };
});
