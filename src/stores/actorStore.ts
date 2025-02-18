import { defineStore } from "pinia";
import axios from "axios";

const API_KEY = "4fea2a6c366b2178d11ca9763eb39dac";

export const useActorStore = defineStore("actor", {
  state: () => ({
    actors: [] as any[],
    actor: null as any,
    movies: [] as any[],
    isLoading: false,
    currentPage: 1,
  }),

  actions: {
    async fetchActors(page = 1) {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=${page}`
        );
        this.actors = response.data.results;
        this.currentPage = page;
      } catch (error) {
        console.error("Error fetching actors:", error);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchActorDetails(actorId: number) {
      if (!actorId) return;

      this.isLoading = true;
      try {
        // Fetch actor details
        const { data: actor } = await axios.get(
          `https://api.themoviedb.org/3/person/${actorId}?api_key=${API_KEY}&language=en-US`
        );

        // Fetch actor's movie credits
        const { data: movies } = await axios.get(
          `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${API_KEY}&language=en-US`
        );

        this.actor = actor;
        this.movies = movies.cast || [];
      } catch (error) {
        console.error("Error fetching actor details:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
