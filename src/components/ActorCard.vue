<template>
  <div
    :class="[
      'rounded-lg p-4 shadow-md cursor-pointer  transition',
      props.simple ? 'bg-gray-800 hover:bg-gray-700' : 'hover:bg-gray-900', // Conditional background color
    ]"
    @click="goToActorDetail"
  >
    <img
      v-if="actor.profile_path"
      :src="`https://image.tmdb.org/t/p/w185${actor.profile_path}`"
      :alt="actor.name"
      class="w-24 h-24 object-cover rounded-full mx-auto"
    />
    <p class="text-white text-center mt-2 font-medium">{{ actor.name }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
// import type { Actor } from "@/types";

const props = defineProps({
  actor: {
    type: Object,
    required: true,
  },
  simple: {
    type: Boolean,
    default: false,
  },
});
const router = useRouter();

const goToActorDetail = () => {
  router.push(`/actor/${props.actor.id}`);
};
</script>
