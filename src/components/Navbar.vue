<template>
  <nav
    class="fixed top-0 left-0 right-0 z-30 bg-gray-800 text-white p-4 shadow-lg"
  >
    <div class="container mx-auto flex justify-between items-center">
      <!-- Left Side: Logo and Title -->
      <router-link to="/" class="flex items-center space-x-2 cursor-pointer">
        <LucideCamera class="w-6 h-6 text-yellow-400" />
        <h1 class="text-xl font-bold">Movies Ktm</h1>
      </router-link>
      <Searchbar />
      <!-- Right Side: Navigation Links -->
      <div class="flex space-x-6">
        <router-link to="/movie" class="hover:text-gray-300 transition"
          >Movies</router-link
        >
        <router-link to="/tvshow" class="hover:text-gray-300 transition"
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
import Searchbar from "./Searchbar.vue";
</script>
