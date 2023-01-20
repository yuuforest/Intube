import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/MainView";
import InterviewFind from "@/views/InterviewFind";
import AnnouncementPost from "@/views/AnnouncementPost";

const routes = [
  {
    path: "/",
    name: "main",
    component: MainView,
    children: [],
  },
  {
    path: "/interview",
    name: "interview",
    component: InterviewFind,
  },
  {
    path: "/announcement",
    name: "announcement",
    component: AnnouncementPost,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
