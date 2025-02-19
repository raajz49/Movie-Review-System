<template>
  <div v-if="tvshow" class="bg-gray-800 rounded-lg shadow-lg p-4">
    <div class="flex flex-col md:flex-row">
      <img
        :src="
          tvshow.poster_path
            ? 'https://image.tmdb.org/t/p/w500' + tvshow.poster_path
            : logo
        "
        class="w-full md:w-1/3 rounded-lg"
      />
      <div class="mt-4 md:mt-0 md:ml-6">
        <h1 class="text-2xl font-bold text-white">{{ tvshow.name }}</h1>
        <p class="text-gray-400 mt-2">{{ tvshow.overview }}</p>
        <p class="text-gray-300 mt-2">First Air Date: {{ formattedDate }}</p>
        <p class="text-gray-300 mt-2">Rating: {{ tvshow.vote_average }}</p>
        <div class="mt-2">
          <span
            v-for="genre in tvshow.genres"
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
            @click="$router.push(`/trailer/${tvshow.id}`)"
            class="mt-4 bg-amber-700 hover:bg-amber-900 px-4 py-2 rounded-lg cursor-pointer"
          >
            Play Trailer
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p class="text-white">No TV show details available.</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import logo from "@/assets/logo.svg";

const props = defineProps({
  tvshow: {
    type: Object,
    required: true,
  },
});

const formattedDate = computed(() => {
  return new Date(props.tvshow.first_air_date).toLocaleDateString();
});
</script>
