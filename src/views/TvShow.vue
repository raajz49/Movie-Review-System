<template>
  <div class="container mx-auto p-6 mt-6">
    <h1 class="text-lg font-medium text-gray-300">Popular TV Shows</h1>
    <Loader v-if="tvStore.loading" />

    <div class="grid grid-cols-4 gap-4">
      <TvShowCard v-for="tv in tvStore.series" :key="tv.id" :tvshow="tv" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Loader from "@/components/Loader.vue";
import TvShowCard from "@/components/TvShowCard.vue";
import { useTvShowStore } from "@/stores/tvShowStore";
import { onMounted } from "vue";

const tvStore = useTvShowStore();
onMounted(() => {
  tvStore.fetchSeries();
});

// const getGenres = (genreIds) => {
//   return genreIds.map((id) => "Genre " + id); // Replace with actual genre mapping
// };
</script>
