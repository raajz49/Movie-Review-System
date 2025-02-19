import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MovieDetail from "@/views/MovieDetail.vue";
import TrailerPlayer from "@/components/TrailerPlayer.vue";
import ActorView from "@/views/ActorView.vue";
import ActorDetail from "@/views/ActorDetail.vue";
import MovieView from "@/views/MovieView.vue";
import TvShow from "@/views/TvShow.vue";
import TvShowDetail from "@/views/TvShowDetail.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/tvshow",
      name: "tvshow",
      component: TvShow,
    },
    {
      path: "/tv/:id",
      name: "TvShowDetail",
      component: TvShowDetail,
      props: true, // Pass route params as props
    },
    {
      path: "/actor",
      name: "Actor",
      component: ActorView,
    },
    { path: "/actor/:id", component: ActorDetail },
    {
      path: "/movie/:id",
      name: "MovieDetail",
      component: MovieDetail,
      props: true, // Pass route params as props
    },
    {
      path: "/movie",
      name: "Movie",
      component: MovieView,
      // props: true, // Pass route params as props
    },
    { path: "/trailer/:movieId", component: TrailerPlayer },
  ],
});

export default router;
