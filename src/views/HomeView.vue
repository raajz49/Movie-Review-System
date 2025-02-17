<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Popular Movies</h1>
    <!-- <div v-if="loading" class="text-gray-500">Loading...</div> -->
    <Loader v-if="movieStore.loading" />
    <div
      v-else
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 gap-y-6"
    >
      <div
        v-for="movie in movieStore.movies"
        :key="movie.id"
        class="bg-gray-800 p-1 py-4 rounded-lg shadow-lg"
      >
        <img
          :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
          :alt="movie.title"
          class="w-full hover:opacity-75 transition ease-in-out duration-150"
        />
        <h2 class="text-white text-md mt-2 font-semibold">{{ movie.title }}</h2>
        <p class="text-gray-400 text-sm">⭐ {{ movie.vote_average }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import { useMovieStore } from "@/stores/movieStore";
import Loader from "@/components/Loader.vue";

const movieStore = useMovieStore();

onMounted(() => {
  movieStore.fetchMovies();
});
</script>
