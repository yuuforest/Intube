import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/MainView";
import InterviewList from "@/views/interview/InterviewList";
import MyAnnouncement from "@/views/interview/MyAnnouncement  ";

const routes = [
  {
    path: "/",
    name: "main",
    component: MainView,
    children: [
      {
        path: "interview",
        name: "interview",
        component: InterviewList,
      },
      {
        path: "announcement",
        name: "announcement",
        component: MyAnnouncement,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
