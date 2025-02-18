<template>
  <div class="p-6">
    <!-- Loading State -->
    <Loader v-if="isLoading" />

    <!-- Actor Detail Content -->
    <div v-else-if="actor">
      <!-- Reusable Actor Detail Card -->

      <ActorDetailCard :actor="actor" />

      <!-- Movies Section -->
      <div class="mt-6">
        <h2 v-if="seeAll" class="text-xl font-bold text-white mb-4">
          Casted Movies
        </h2>
        <h2 v-if="!seeAll" class="text-xl font-bold text-white mb-4">
          Popular Movies
        </h2>
        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
          <MovieCard
            v-for="movie in displayMovies"
            :key="movie.id"
            :movie="movie"
            :simple="true"
          />
        </div>
        <div v-if="!seeAll && movies.length > 5" class="mt-4 text-center">
          <button
            @click="seeAll = true"
            class="text-blue-500 underline cursor-pointer"
          >
            See All
          </button>
        </div>
        <div v-if="seeAll" class="mt-4 text-center">
          <button
            @click="seeAll = false"
            class="text-blue-500 underline cursor-pointer"
          >
            Show Popular
          </button>
        </div>
        <p v-if="!movies.length" class="text-gray-400">
          No movies found for this actor.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useActorStore } from "@/stores/actorStore";
import ActorDetailCard from "@/components/ActorDetailCard.vue";
import Loader from "@/components/Loader.vue";
import MovieCard from "@/components/MovieCard.vue"; // Make sure you have this component or create one.

const route = useRoute();
const actorStore = useActorStore();
const seeAll = ref(false);
const actor = computed(() => actorStore.actor);
const movies = computed(() => actorStore.movies);
const isLoading = computed(() => actorStore.isLoading);
// Compute a sorted list of movies based on vote_average (popularity)
const sortedMovies = computed(() => {
  return movies.value.slice().sort((a, b) => b.vote_average - a.vote_average);
});

// If "See All" is false, show only the top 5; otherwise, show all movies
const displayMovies = computed(() => {
  return seeAll.value ? sortedMovies.value : sortedMovies.value.slice(0, 5);
});
// When this component mounts, fetch the actor's details based on the URL param.
onMounted(() => {
  const actorId = Number(route.params.id);
  if (actorId) {
    actorStore.fetchActorDetails(actorId);
  }
});
</script>
