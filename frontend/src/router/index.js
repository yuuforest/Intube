import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/MainView";
import InterviewFind from "@/views/InterviewFind";
import AnnouncementPost from "@/views/AnnouncementPost";
import LoginView from "@/views/LoginView"
import SignupView from "@/views/SignupView"
import FindIdPasswordView from "@/views/FindIdPasswordView"

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
    {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
  },
  {
    path: "/findIdPassword",
    name: "findIdPassword",
    component: FindIdPasswordView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
