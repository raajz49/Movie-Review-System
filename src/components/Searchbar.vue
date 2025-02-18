<template>
  <div class="relative w-64">
    <div class="relative">
      <div
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <Search class="w-4 h-4 text-gray-400" />
      </div>
      <input
        type="text"
        class="bg-gray-900 text-sm rounded-full w-full pl-10 pr-4 py-2 focus:outline-none focus:shadow-outline"
        placeholder="Search"
        v-model="searchTerm"
        @focus="showDropdown = true"
        @blur="hideDropdown"
      />
    </div>

    <!-- Dropdown with Search Results -->
    <div
      v-if="showDropdown"
      class="absolute z-10 mt-2 w-80 bg-gray-800 rounded-md shadow-lg overflow-y-auto max-h-96"
    >
      <ul>
        <!-- Loading indicator -->
        <li v-if="isLoading" class="px-4 py-2 text-gray-400 flex items-center">
          <Loader2 class="animate-spin w-4 h-4 mr-2" />
          Loading...
        </li>
        <!-- Not Found message -->
        <li
          v-else-if="results.length === 0 && searchTerm.trim().length > 0"
          class="px-4 py-2 text-gray-400"
        >
          Not Found
        </li>
        <li
          v-for="(result, index) in results"
          :key="result.id"
          class="px-4 py-2 hover:bg-gray-700 cursor-pointer"
          @click="goToDetail(result)"
        >
          <div class="flex items-center space-x-3">
            <!-- Movie Poster Thumbnail -->
            <img
              v-if="result.poster_path"
              :src="`https://image.tmdb.org/t/p/w92${result.poster_path}`"
              alt="Poster"
              class="w-12 h-18 object-cover rounded"
            />
            <div class="flex-1">
              <!-- Movie Title: Click to open detail page -->
              <span class="font-medium text-white">
                {{ result.title }}
              </span>
            </div>
          </div>
          <!-- Render search results -->
          <!-- Show Trailer for First Search Result -->
          <div v-if="index === 0" class="mt-3 cursor-pointer relative">
            <div
              v-if="trailerMap[result.id]?.loading"
              class="text-gray-400 text-xs"
            >
              Loading trailer...
            </div>
            <div
              v-else-if="trailerMap[result.id]?.error"
              class="text-gray-400 text-xs"
            >
              {{ trailerMap[result.id].error }}
            </div>
            <div
              v-else
              class="cursor-pointer relative"
              @click="onTrailerClick(result)"
            >
              <img
                v-if="trailerMap[result.id]?.key"
                :src="`https://img.youtube.com/vi/${
                  trailerMap[result.id].key
                }/0.jpg`"
                alt="Trailer Thumbnail"
                class="w-64 h-36 object-cover rounded-lg mb-1"
              />
              <div
                class="absolute bottom-1 left-1 text-white text-xs flex items-center px-2 py-1 rounded-md"
              >
                <svg
                  width="30"
                  height="30"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  role="presentation"
                >
                  <path
                    d="M10.56 16.68l5.604-4.2a.596.596 0 0 0 0-.96l-5.604-4.2a.6.6 0 0 0-.96.48v8.4a.6.6 0 0 0 .96.48zM12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 21.6c-5.292 0-9.6-4.308-9.6-9.6S6.708 2.4 12 2.4s9.6 4.308 9.6 9.6-4.308 9.6-9.6 9.6z"
                  ></path>
                </svg>
                <span class="ml-2">{{
                  trailerMap[result.id]?.duration || "0:00"
                }}</span>
              </div>
            </div>
            <span class="text-gray-300 text-[13px]"> Official Trailer</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { Search, Loader2 } from "lucide-vue-next";
import { useSearchStore } from "@/stores/searchStore";

const router = useRouter();
const searchStore = useSearchStore();

const searchTerm = ref(searchStore.term);
const results = ref<any[]>([]);
const showDropdown = ref(false);
const isLoading = ref(false);

// Object for trailer info per movie ID
// Structure: { key?: string, loading: boolean, error?: string }
const trailerMap = ref<
  Record<
    number,
    { key?: string; loading: boolean; error?: string; duration?: string }
  >
>({});

// Debounce timer for API calls
let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

const fetchTrailerInfo = async (result: any) => {
  const apikey = "4fea2a6c366b2178d11ca9763eb39dac";
  trailerMap.value[result.id] = { loading: true };
  try {
    const trailerResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/${result.id}/videos?api_key=${apikey}&language=en-US`
    );
    const videos = trailerResponse.data.results;
    // Look for the official YouTube trailer.
    const officialTrailer = videos.find(
      (video: any) => video.type === "Trailer" && video.site === "YouTube"
    );
    if (officialTrailer) {
      trailerMap.value[result.id] = {
        key: officialTrailer.key,
        loading: false,
      };
    } else {
      trailerMap.value[result.id] = {
        loading: false,
        error: "Trailer not found",
      };
    }
  } catch (error) {
    console.error("Error fetching trailer for movie id", result.id, error);
    trailerMap.value[result.id] = {
      loading: false,
      error: "Error fetching trailer",
    };
  }
};

watch(
  searchTerm,
  (newTerm, _oldTerm, onCleanup) => {
    searchStore.setSearch(newTerm);
    if (debounceTimeout) clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(async () => {
      if (newTerm.trim().length > 0) {
        isLoading.value = true;
        try {
          const apikey = "4fea2a6c366b2178d11ca9763eb39dac";
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${encodeURIComponent(
              newTerm
            )}`
          );
          results.value = response.data.results;
          // Pre-fetch trailer info for each result
          results.value.forEach((result: any) => {
            if (!trailerMap.value[result.id]) {
              fetchTrailerInfo(result);
            }
          });
        } catch (error) {
          console.error("Error fetching search results:", error);
          results.value = [];
        } finally {
          isLoading.value = false;
        }
      } else {
        results.value = [];
      }
    }, 500);

    onCleanup(() => {
      if (debounceTimeout) clearTimeout(debounceTimeout);
    });
  },
  { immediate: false }
);

const hideDropdown = () => {
  setTimeout(() => {
    showDropdown.value = false;
  }, 200);
};

const goToDetail = (result: any) => {
  router.push(`/movie/${result.id}`);
};

const onTrailerClick = async (result: any) => {
  // If trailer info is already fetched, navigate immediately
  if (trailerMap.value[result.id]?.key) {
    router.push(`/trailer/${result.id}?key=${trailerMap.value[result.id].key}`);
  } else {
    // Otherwise, try fetching trailer info first, then navigate
    await fetchTrailerInfo(result);
    if (trailerMap.value[result.id]?.key) {
      router.push(
        `/trailer/${result.id}?key=${trailerMap.value[result.id].key}`
      );
    } else {
      alert("Trailer not available");
    }
  }
};
</script>
