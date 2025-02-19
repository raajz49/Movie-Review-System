<template>
  <div class="swiper-section relative">
    <h1 class="text-lg font-medium text-gray-300 mb-4">{{ title }}</h1>
    <Loader v-if="loading" />
    <swiper
      v-else
      :modules="[SwiperNavigation]"
      :slidesPerView="slidesPerView"
      :spaceBetween="20"
      :navigation="{
        nextEl: `#${sectionId}-next`,
        prevEl: `#${sectionId}-prev`,
      }"
      :breakpoints="{
        320: { slidesPerView: 2 },
        640: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: slidesPerView },
      }"
      class="swiper-container"
    >
      <swiper-slide v-for="item in items" :key="item.id">
        <slot :item="item"></slot>
      </swiper-slide>
    </swiper>

    <!-- Navigation Buttons -->
    <button
      :id="`${sectionId}-prev`"
      class="custom-swiper-prev cursor-pointer absolute left-[-10px] top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white w-12 h-12 flex items-center justify-center rounded-full text-3xl leading-none"
    >
      ‹
    </button>
    <button
      :id="`${sectionId}-next`"
      class="custom-swiper-next cursor-pointer absolute right-[-10px] top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white w-12 h-12 flex items-center justify-center rounded-full text-3xl leading-none"
    >
      ›
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation as SwiperNavigation } from "swiper/modules";
import Loader from "@/components/Loader.vue";

// Define props
defineProps<{
  sectionId: string;
  title: string;
  items: any[];
  loading: boolean;
  slidesPerView?: number;
}>();
</script>

<style scoped>
.swiper-section {
  background-color: #1a1a1a;
  padding: 20px;
  border-radius: 12px;
  position: relative;
}

.custom-swiper-prev,
.custom-swiper-next {
  transition: opacity 0.3s ease;
}

.custom-swiper-prev:hover,
.custom-swiper-next:hover {
  opacity: 0.8;
}

/* Ensure visibility */
.custom-swiper-prev,
.custom-swiper-next {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50 !important;
}

.swiper-button-disabled {
  opacity: 0.35;
  pointer-events: none;
}
</style>
