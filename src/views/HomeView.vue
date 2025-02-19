<template>
  <div class="container mx-auto p-6 mt-6">
    <!-- Popular Celebrities Section -->
    <div class="mb-8 relative swiper-section" id="popular-celebrities">
      <SwiperCarousel
        sectionId="popular-celebrities"
        title="Popular Celebrities"
        :items="actorStore.actors"
        :loading="false"
        :slidesPerView="5"
      >
        <template #default="{ item }">
          <ActorCard :actor="item" />
        </template>
      </SwiperCarousel>
    </div>

    <!-- Latest Movies Section -->
    <div v-if="movieStore.loading" class="loading-overlay">
      <Loader />
    </div>
    <SwiperCarousel
      sectionId="latest-movies"
      title="Latest Movies"
      :items="movieStore.latestMovies"
      :loading="movieStore.loading"
      :slidesPerView="5"
    >
      <template #default="{ item }">
        <MovieCard :movie="item" :genres="getGenresForMovie(item.genre_ids)" />
      </template>
    </SwiperCarousel>

    <!-- Popular Movies Section -->
    <div v-if="movieStore.loading" class="loading-overlay">
      <Loader />
    </div>
    <SwiperCarousel
      sectionId="popular-movies"
      title="Popular Movies"
      :items="movieStore.movies"
      :loading="movieStore.loading"
      :slidesPerView="5"
    >
      <template #default="{ item }">
        <MovieCard :movie="item" :genres="getGenresForMovie(item.genre_ids)" />
      </template>
    </SwiperCarousel>

    <!-- Viewer's Choice Section -->
    <div v-if="movieStore.loading" class="loading-overlay">
      <Loader />
    </div>
    <SwiperCarousel
      sectionId="viewers-choice"
      title="Viewer's Choice"
      :items="movieStore.viewersChoiceMovies"
      :loading="movieStore.loading"
      :slidesPerView="5"
    >
      <template #default="{ item }">
        <MovieCard :movie="item" :genres="getGenresForMovie(item.genre_ids)" />
      </template>
    </SwiperCarousel>
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
import { Navigation as SwiperNavigation } from "swiper/modules";
import SwiperCarousel from "@/components/SwiperCarousel.vue";

const movieStore = useMovieStore();
const genreStore = useGenreStore();
const actorStore = useActorStore();

onMounted(() => {
  movieStore.fetchMovies();
  movieStore.fetchLatestMovies();
  movieStore.fetchViewerChoiceMovies();
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
/* Swiper styling for popular actors */
.swiper-container {
  background-color: #1a1a1a;
  padding: 20px;
  border-radius: 12px;
}

/* Carousel styling for movies */
.movie-carousel {
  background-color: #1a1a1a;
  padding: 20px;
  border-radius: 12px;
}

/* Custom navigation buttons */
.custom-swiper-prev,
.custom-swiper-next,
.custom-carousel-prev,
.custom-carousel-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.5);
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
  font-size: 24px;
  font-weight: bold;
  color: white;
  border-radius: 50%;
}

.custom-swiper-prev {
  left: -10px;
}

.custom-swiper-next {
  right: -10px;
}

.custom-carousel-prev {
  left: 10px;
}

.custom-carousel-next {
  right: 10px;
}
.swiper-section {
  background-color: #1a1a1a;
  padding: 20px;
  border-radius: 12px;
}

.custom-swiper-prev,
.custom-swiper-next {
  transition: opacity 0.3s ease;
}

.custom-swiper-prev:hover,
.custom-swiper-next:hover {
  opacity: 0.8;
}

.swiper-button-disabled {
  opacity: 0.35;
  pointer-events: none;
}
</style>
