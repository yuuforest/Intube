import InterviewList from "components/Interview/InterviewList";
import Main from "pages/Main";
import Conference from "pages/Conference";
import Login from "pages/user/Login";
import PostAnnouncement from "pages/announcement/PostAnnouncement";
import ManageAnnouncement from "pages/announcement/ManageAnnouncement";
import RecuitAnnouncement from "pages/announcement/RecuitAnnouncement";
import ProgressAnnouncement from "pages/announcement/ProgressAnnouncement";
import CloseAnnouncement from "pages/announcement/CloseAnnouncement";
import Mypage from "pages/user/MyPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./common/Header";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={"/interview"} element={<InterviewList />}></Route>
        <Route path={"/announcement/post"} element={<PostAnnouncement/>}></Route>
        <Route path={"/mypage"} element={<Mypage/>}></Route>
        <Route path={"/login"} element={<Login/>}></Route>
        <Route path={"/main"} element={<PostAnnouncement/>}></Route>
        <Route path={"/announcement/manage"} element={<ManageAnnouncement/>}></Route>
        <Route path={"/announcement/recuit"} element={<RecuitAnnouncement/>}></Route>
        <Route path={"/announcement/progress"} element={<ProgressAnnouncement/>}></Route>
        <Route path={"/announcement/close"} element={<CloseAnnouncement/>}></Route>
        <Route path={"/conference"} element={<Conference/>}></Route>
        <Route path={"/"} element={<Main />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
