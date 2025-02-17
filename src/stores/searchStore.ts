import { defineStore } from "pinia";
import { ref } from "vue";

export const useSearchStore = defineStore("search", () => {
  const term = ref("");

  function setSearch(newTerm: string) {
    term.value = newTerm;
  }
  return { setSearch, term };
});
