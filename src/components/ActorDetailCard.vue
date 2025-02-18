<template>
  <div class="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
    <div class="flex flex-col md:flex-row">
      <!-- Actor Image -->
      <img
        v-if="actor.profile_path"
        :src="`https://image.tmdb.org/t/p/w300${actor.profile_path}`"
        :alt="actor.name"
        class="w-40 h-40 object-cover rounded-lg shadow-md"
      />

      <!-- Actor Information -->
      <div class="mt-4 md:mt-0 md:ml-6 flex-1">
        <h2 class="text-2xl font-bold">{{ actor.name }}</h2>
        <p class="text-gray-400 text-sm">
          <span>Born: </span>{{ actor.birthday || "Unknown" }}
        </p>
        <p v-if="actor.place_of_birth" class="text-gray-400 text-sm">
          <span>Birthplace: </span>{{ actor.place_of_birth }}
        </p>
        <p v-if="actor.deathday" class="text-gray-400 text-sm">
          <span>Died: </span>{{ actor.deathday }}
        </p>

        <!-- Biography -->
        <p class="mt-4 text-gray-300 text-sm">
          {{ actor.biography || "Biography not available." }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  actor: {
    type: Object,
    required: true,
  },
});
</script>
