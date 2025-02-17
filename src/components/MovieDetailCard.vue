<template>
  <div
    v-if="movie"
    class="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg"
  >
    <div class="grid md:grid-cols-2 gap-6">
      <!-- Movie Poster -->
      <img
        v-if="movie.poster_path"
        :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
        :alt="movie.title"
        class="rounded-lg shadow-md"
      />

      <!-- Movie Details -->
      <div>
        <h1 class="text-3xl font-bold">{{ movie.title }}</h1>
        <p class="text-gray-400">{{ formattedDate }}</p>
        <p class="mt-2 text-gray-300">{{ movie.overview }}</p>

        <div class="mt-4 flex items-center">
          <StarIcon class="w-6 h-6 text-yellow-400" />
          <span class="ml-2 text-lg font-semibold">
            {{ movie.vote_average.toFixed(1) }}/10
          </span>
        </div>

        <!-- Back Button -->
        <button
          @click="$router.go(-1)"
          class="mt-4 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
        >
          Go Back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import { Star as StarIcon } from "lucide-vue-next";

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

const formattedDate = computed(() =>
  new Date(props.movie.release_date).toLocaleDateString()
);
</script>
