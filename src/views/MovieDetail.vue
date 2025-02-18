<template>
  <div class="container mx-auto p-6 mt-6">
    <Loader v-if="movieDetailStore.loading" />
    <div v-else-if="movieDetailStore.error" class="text-red-500">
      {{ movieDetailStore.error }}
    </div>
    <MovieDetailCard v-else :movie="movieDetailStore.movieDetail" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useMovieDetailStore } from "@/stores/movieDetailStore";
import MovieDetailCard from "@/components/MovieDetailCard.vue";
import Loader from "@/components/Loader.vue";

const route = useRoute();
const movieId = Number(route.params.id);

const movieDetailStore = useMovieDetailStore();

onMounted(() => {
  movieDetailStore.fetchMovieDetail(movieId);
});
</script>
