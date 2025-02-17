<template>
  <nav class="bg-gray-900 text-white p-4 shadow-lg">
    <div class="container mx-auto flex space-x-10 items-center">
      <div class="flex items-center space-x-2">
        <LucideCamera class="w-6 h-6 text-yellow-400" />
        <h1 class="text-xl font-bold">Movies Ktm</h1>
      </div>
      <div class="flex space-x-6">
        <router-link to="/" class="hover:text-gray-300 transition"
          >Movies</router-link
        >
        <router-link to="/cart" class="hover:text-gray-300 transition"
          >TV</router-link
        >
        <router-link to="/actor" class="hover:text-gray-300 transition"
          >Actors</router-link
        >
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Clapperboard as LucideCamera } from "lucide-vue-next";
</script>

<style scoped></style>
