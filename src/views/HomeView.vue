<template>
  <div class="container mx-auto p-6 mt-6">
    <h1 class="text-lg font-medium text-gray-300">Popular Movies</h1>
    <!-- <div v-if="loading" class="text-gray-500">Loading...</div> -->
    <Loader v-if="movieStore.loading" />
    <!-- <div
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
    </div> -->
    <div
      v-else
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 gap-y-6"
    >
      <MovieCard
        v-for="movie in movieStore.movies"
        :key="movie.id"
        :movie="movie"
        :genres="getGenresForMovie(movie.genre_ids)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import { useMovieStore } from "@/stores/movieStore";
import { useGenreStore } from "@/stores/genre";
import Loader from "@/components/Loader.vue";
import MovieCard from "@/components/MovieCard.vue";

const movieStore = useMovieStore();
const genreStore = useGenreStore();

onMounted(() => {
  movieStore.fetchMovies();
  genreStore.fetchGenres();
});
const getGenresForMovie = (genreIds: number[]) => {
  return genreIds.map((id) => {
    const genre = genreStore.genres.find((g) => g.id === id);
    return genre ? genre.name : "Unknown";
  });
};
</script>
