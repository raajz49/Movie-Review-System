<template>
  <div class="container mx-auto p-6 mt-6">
    <Loader v-if="tvShowDetailStore.loading" />
    <div v-else-if="tvShowDetailStore.error" class="text-red-500">
      {{ tvShowDetailStore.error }}
    </div>
    <TvShowDetailCard v-else :tvshow="tvShowDetailStore.TvShowDetail" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import TvShowDetailCard from "@/components/TvShowDetailCard.vue";
import Loader from "@/components/Loader.vue";
import { useTvshowSDetailStore } from "@/stores/tvshowDetailStore";

const route = useRoute();
const tvShowId = Number(route.params.id);

const tvShowDetailStore = useTvshowSDetailStore();

onMounted(() => {
  tvShowDetailStore.fetchTvShowDetail(tvShowId);
});
</script>
