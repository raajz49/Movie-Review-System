<template>
  <div v-if="movie" class="bg-gray-800 rounded-lg shadow-lg p-4">
    <div class="flex flex-col md:flex-row">
      <img
        :src="
          movie.poster_path
            ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path
            : logo
        "
        class="w-full md:w-1/3 rounded-lg"
      />
      <div class="mt-4 md:mt-0 md:ml-6">
        <h1 class="text-2xl font-bold text-white">{{ movie.title }}</h1>
        <p class="text-gray-400 mt-2">{{ movie.overview }}</p>
        <p class="text-gray-300 mt-2">Release Date: {{ formattedDate }}</p>
        <p class="text-gray-300 mt-2">Rating: {{ movie.vote_average }}</p>
        <div class="mt-2">
          <span
            v-for="genre in movie.genres"
            :key="genre.id"
            class="inline-block bg-gray-700 text-gray-200 text-xs px-2 py-1 rounded mr-2"
          >
            {{ genre.name }}
          </span>
        </div>
        <div class="flex space-x-4 mt-6">
          <button
            @click="$router.go(-1)"
            class="mt-4 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg cursor-pointer"
          >
            Go Back
          </button>
          <button
            @click="$router.push(`/trailer/${movie.id}`)"
            class="mt-4 bg-amber-700 hover:bg-amber-900 px-4 py-2 rounded-lg cursor-pointer"
          >
            Play Trailer
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p class="text-white">No movie details available.</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import logo from "@/assets/logo.svg";
const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

const formattedDate = computed(() => {
  return new Date(props.movie.release_date).toLocaleDateString();
});
</script>
