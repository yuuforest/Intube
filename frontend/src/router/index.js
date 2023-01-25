import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/MainView";
import InterviewFind from "@/views/InterviewFind";
import AnnouncementPost from "@/views/AnnouncementPost";
import AnnouncementType from "@/components/announcement/AnnouncementType";
import AnnouncementInfo from "@/components/announcement/AnnouncementInfo";
import AnnouncementQuestion from "@/components/announcement/AnnouncementQuestion";
import AnnouncementAlert from "@/components/announcement/AnnouncementAlert";
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
  },
  {
    path: "/interview",
    name: "interview",
    component: InterviewFind,
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
  {
    path: "/announcement",
    name: "announcement",
    component: AnnouncementPost,
    children: [
      {
        path: "type",
        name: "announcement-type",
        component: AnnouncementType,
      },
      {
        path: "info",
        name: "announcement-info",
        component: AnnouncementInfo,
      },
      {
        path: "question",
        name: "announcement-question",
        component: AnnouncementQuestion,
      },
      {
        path: "alert",
        name: "announcement-alert",
        component: AnnouncementAlert,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
