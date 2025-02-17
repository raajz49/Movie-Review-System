<template>
  <Navbar />
  <div class="p-6 bg-gray-900">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
</script>
