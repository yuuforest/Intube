import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/main/main-view";

const routes = [
  {
    path: "/",
    name: "main",
    component: MainView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
