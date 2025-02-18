<template>
  <div class="bg-black min-h-screen flex justify-center items-center">
    <div v-if="loading">
      <Loader />
    </div>
    <div v-if="trailerUrl" class="w-full max-w-3xl rounded-lg shadow-lg">
      <iframe
        :src="trailerUrl"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        class="w-full h-96"
      ></iframe>
    </div>
    <p v-else class="text-white">No trailer available.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Loader from "./Loader.vue";

const route = useRoute();
const trailerUrl = ref("");
const loading = ref(true);

onMounted(async () => {
  try {
    const movieId = route.params.movieId;
    const apikey = "4fea2a6c366b2178d11ca9763eb39dac";
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apikey}`
    );
    const data = await response.json();

    const trailer = data.results.find((video: any) => video.type === "Trailer");

    if (trailer) {
      trailerUrl.value = `https://www.youtube.com/embed/${trailer.key}?autoplay=1`;
    }
  } catch (error) {
    console.error("Error fetching trailer:", error);
  } finally {
    loading.value = false;
  }
});
</script>
