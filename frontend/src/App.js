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
import ManageAnswerer from "pages/announcement/ManageAnswerer";
import Signup from "./pages/user/Signup";
import KakaoSignup from "./pages/user/KakaoSignup";
import Kakaoloading from "./pages/user/Kakaoloading";
import FindUser from "./pages/user/FindUser";
import UserUpdate from "./pages/user/UserUpdate";
import CheckPassword from "./pages/user/CheckPassword";
import ChangePassword from "./pages/user/ChangePassword";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={"/interview"} element={<InterviewList />}></Route>
        <Route
          path={"/announcement/post"}
          element={<PostAnnouncement />}
        ></Route>
        <Route path={"/manage/answerer"} element={<ManageAnswerer />}></Route>
        <Route path={"/mypage"} element={<Mypage />}></Route>
        <Route path={"/login"} element={<Login />}></Route>
        <Route path="/userupdate" element={<UserUpdate />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/checkpassword" element={<CheckPassword />}></Route>
        <Route path="/changepassword" element={<ChangePassword />}></Route>
        <Route path="/KakaoSignup" element={<KakaoSignup />}></Route>
        <Route path="/auth/kakao/callback" element={<Kakaoloading />}></Route>
        <Route path="/findUser" element={<FindUser />}></Route>
        <Route path={"/main"} element={<PostAnnouncement />}></Route>
        <Route
          path={"/announcement/manage"}
          element={<ManageAnnouncement />}
        ></Route>
        <Route
          path={"/announcement/recuit"}
          element={<RecuitAnnouncement />}
        ></Route>
        <Route
          path={"/announcement/progress"}
          element={<ProgressAnnouncement />}
        ></Route>
        <Route
          path={"/announcement/close"}
          element={<CloseAnnouncement />}
        ></Route>
        <Route path={"/conference"} element={<Conference />}></Route>
        <Route path={"/"} element={<Main />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
