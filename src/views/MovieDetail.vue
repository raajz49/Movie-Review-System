<template>
  <div
    class="min-h-screen bg-gray-900 text-white flex items-center justify-center"
  >
    <Loader v-if="detailLoading" />
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <MovieDetailCard v-else-if="movieDetail" :movie="movieDetail" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useMovieStore } from "@/stores/movieStore";
import MovieDetailCard from "@/components/MovieDetailCard.vue";
import Loader from "@/components/Loader.vue";

const route = useRoute();
const movieStore = useMovieStore();

const { fetchMovieDetails, movieDetail, detailLoading, error } = movieStore;

onMounted(() => {
  fetchMovieDetails(route.params.id as string);
});
</script>
