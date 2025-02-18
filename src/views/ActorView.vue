<template>
  <div class="p-6 text-white">
    <h1 class="text-3xl font-bold mb-4 mt-10">Popular Actors</h1>

    <Loader v-if="isLoading" />

    <div v-else>
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
      >
        <ActorCard v-for="actor in actors" :key="actor.id" :actor="actor" />
      </div>

      <!-- Pagination Controls -->
      <div class="flex justify-center mt-6 space-x-4">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-gray-700 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <button @click="nextPage" class="px-4 py-2 bg-gray-700 rounded-md">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import ActorCard from "@/components/ActorCard.vue";
import { useActorStore } from "@/stores/actorStore";
import Loader from "@/components/Loader.vue";

const actorStore = useActorStore();

const actors = computed(() => actorStore.actors);
const isLoading = computed(() => actorStore.isLoading);
const currentPage = computed(() => actorStore.currentPage);

const nextPage = () => actorStore.fetchActors(currentPage.value + 1);
const prevPage = () => actorStore.fetchActors(currentPage.value - 1);

onMounted(() => {
  actorStore.fetchActors();
});
</script>
