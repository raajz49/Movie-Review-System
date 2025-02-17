<template>
  <div
    class="flex justify-center items-center h-screen bg-gray-900 bg-opacity-50 absolute top-0 left-0 w-full z-50"
  >
    <div
      class="spinner-border animate-spin border-t-4 border-b-4 border-blue-500 border-solid w-16 h-16 rounded-full"
    ></div>
  </div>
</template>

<script setup lang="ts">
// This loader component doesn't need any logic for now
</script>

<style scoped>
.spinner-border {
  border-top-color: transparent;
}
</style>
