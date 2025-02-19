import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useTvshowSDetailStore = defineStore("TvShowDetail", () => {
  const TvShowDetail = ref<any>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchTvShowDetail = async (id: number) => {
    loading.value = true;
    error.value = null;
    const apiKey = "4fea2a6c366b2178d11ca9763eb39dac";
    const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`;

    try {
      const response = await axios.get(url);
      TvShowDetail.value = response.data;
    } catch (err) {
      console.error("Error fetching movie details:", err);
      error.value = "Failed to fetch movie details.";
    } finally {
      loading.value = false;
    }
  };

  return { TvShowDetail, loading, error, fetchTvShowDetail };
});
