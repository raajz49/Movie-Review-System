<template>
  <div class="relative w-64">
    <!-- Search Icon using Lucide -->
    <div class="relative">
      <div
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <Search class="w-4 h-4 text-gray-400" />
      </div>
      <!-- Search Input -->
      <input
        type="text"
        class="bg-gray-900 text-sm rounded-full w-full pl-10 pr-4 py-2 focus:outline-none focus:shadow-outline"
        placeholder="Search"
        v-model="searchTerm"
        @focus="showDropdown = true"
        @blur="hideDropdown"
      />
    </div>
    <div
      v-if="showDropdown"
      class="absolute z-10 mt-1 w-full bg-gray-800 rounded-md shadow-lg overflow-hidden"
    >
      <ul>
        <!-- Show "Not Found" if no results and search term exists -->
        <li
          v-if="results.length === 0 && searchTerm.trim().length > 0"
          class="px-4 py-2 text-gray-400"
        >
          Not Found
        </li>
        <!-- Display search results -->
        <li
          v-for="result in results"
          :key="result.id"
          class="px-4 py-2 hover:bg-gray-700 cursor-pointer"
          @mousedown.prevent="selectResult(result)"
        >
          {{ result.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSearchStore } from "@/stores/searchStore";
import axios from "axios";
import { Search } from "lucide-vue-next";
import { computed, ref, watch } from "vue";

const searchStore = useSearchStore();
const searchTerm = ref(searchStore.term);
const results = ref<any[]>([]);
const showDropdown = ref(false);

watch(searchTerm, async (newTerm) => {
  searchStore.setSearch(newTerm);
  if (newTerm.trim().length > 0) {
    try {
      const apikey = "4fea2a6c366b2178d11ca9763eb39dac"; // Replace with your actual TMDb API key
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${encodeURIComponent(
          newTerm
        )}`
      );
      results.value = response.data.results;
    } catch (error) {
      console.error("Error fetching search results:", error);
      results.value = [];
    }
  } else {
    results.value = [];
  }
});
const hideDropdown = () => {
  setTimeout(() => {
    showDropdown.value = false;
  }, 200);
};
const selectResult = (result: any) => {
  searchTerm.value = result.title;
  // You could also navigate to a details page here, for example:
  // router.push(`/movies/${result.id}`);
  showDropdown.value = false;
};
</script>
