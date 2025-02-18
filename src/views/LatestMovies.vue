<!-- <template>
  <div class="min-h-screen bg-gray-900 text-white p-6">
    <h1 class="text-2xl font-bold mb-4">Latest Movies</h1>

    <div v-if="loading">
      <Loader />
    </div>

    <div v-else-if="error" class="text-red-500">
      {{ error }}
    </div>

    <swiper
      v-else
      :modules="[Navigation, Pagination, Autoplay]"
      :slides-per-view="1"
      :space-between="10"
      :breakpoints="{
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }"
      :loop="true"
      :autoplay="{ delay: 3000 }"
      navigation
      pagination
      class="pb-6"
    >
      <swiper-slide v-for="movie in latestMovies" :key="movie.id">
        <MovieCard :movie="movie" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useMovieStore } from "@/stores/movieStore";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import MovieCard from "@/components/MovieCard.vue";
import Loader from "@/components/Loader.vue";

const movieStore = useMovieStore();
const { fetchLatestMovies, latestMovies, loading, error } = movieStore;

onMounted(() => {
  fetchLatestMovies();
});
</script> -->
