<template>
  <div class="container mx-auto p-6 mt-6">
    <div class="mb-8">
      <h1 class="text-lg font-medium text-gray-300 mb-4">
        Popular Celebrities
      </h1>
      <swiper
        :modules="[Navigation]"
        :slidesPerView="7"
        :spaceBetween="20"
        :navigation="true"
        :breakpoints="{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 5 },
        }"
        class="popular-actors-swiper swiper-container"
      >
        <swiper-slide
          v-for="actor in actorStore.actors"
          :key="actor.id"
          class="flex justify-center items-center"
        >
          <ActorCard :actor="actor" />
        </swiper-slide>
      </swiper>
    </div>

    <h1 class="text-lg font-medium text-gray-300">Popular Movies</h1>
    <Loader v-if="movieStore.loading" />

    <div
      v-else
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 gap-y-6"
    >
      <MovieCard
        v-for="movie in movieStore.movies"
        :key="movie.id"
        :movie="movie"
        :genres="getGenresForMovie(movie.genre_ids)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useMovieStore } from "@/stores/movieStore";
import { useGenreStore } from "@/stores/genre";
import { useActorStore } from "@/stores/actorStore";
import Loader from "@/components/Loader.vue";
import MovieCard from "@/components/MovieCard.vue";
import ActorCard from "@/components/ActorCard.vue";

// Import Swiper components and CSS
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const movieStore = useMovieStore();
const genreStore = useGenreStore();
const actorStore = useActorStore();

onMounted(() => {
  movieStore.fetchMovies();
  genreStore.fetchGenres();
  actorStore.fetchActors();
});

const getGenresForMovie = (genreIds: number[]) => {
  return genreIds.map((id) => {
    const genre = genreStore.genres.find((g) => g.id === id);
    return genre ? genre.name : "Unknown";
  });
};
</script>

<style scoped>
.swiper-container {
  background-color: #1a1a1a; /* Dark background */
  padding: 20px;
  border-radius: 12px;
}
</style>
