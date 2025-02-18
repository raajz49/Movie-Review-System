<template>
  <div
    class="bg-gray-900 p-0.5 py-4 rounded-lg shadow-lg cursor-pointer"
    @click="goToDetail"
  >
    <img
      :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
      :alt="movie.title"
      class="w-full hover:opacity-75 transition ease-in-out duration-150"
      v-if="!simple"
    />
    <img
      :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
      :alt="movie.title"
      class="w-32 h-auto hover:opacity-75 transition ease-in-out duration-150"
      v-if="simple"
    />
    <div class="p-1">
      <h2 class="text-white text-xs font-sans mb-2 mt-2">{{ movie.title }}</h2>
      <!-- Star Rating -->
      <template v-if="!simple">
        <div class="flex mb-1">
          <template v-for="star in maxStars">
            <svg
              v-if="star <= movie.vote_average / 2"
              fill="currentColor"
              viewBox="0 0 24 24"
              class="w-4 h-4 text-yellow-400"
            >
              <path
                d="M12 17.27l5.18 3.09-1.39-6.03 4.82-4.71-6.06-.52L12 2.47 9.45 9.29l-6.06.52 4.82 4.71-1.39 6.03L12 17.27z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              class="w-4 h-4 text-gray-400"
            >
              <path
                d="M12 17.27l5.18 3.09-1.39-6.03 4.82-4.71-6.06-.52L12 2.47 9.45 9.29l-6.06.52 4.82 4.71-1.39 6.03L12 17.27z"
              />
            </svg>
          </template>
        </div>
        <!-- Vote Average -->
        <p class="text-gray-400 text-[10px]">
          {{ formattedvote_average }}% | {{ formattedDate }}
        </p>
        <p class="text-gray-400 text-[10px]">
          {{ movie.details }}
        </p>
        <p class="text-gray-400 text-[10px]">{{ genres.join(", ") }}</p>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
  genres: {
    type: Array,
    required: true,
    default: () => [],
  },
  simple: {
    type: Boolean,
    default: false,
  },
});
const maxStars = 5;
const formattedvote_average = props.movie.vote_average * 10;
const formattedDate = new Date(props.movie.release_date).toLocaleDateString();
const goToDetail = () => {
  router.push(`/movie/${props.movie.id}`);
};
</script>
