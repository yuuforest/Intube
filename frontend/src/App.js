import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ManageAnswerer from "pages/announcement/ManageAnswerer";
import Signup from "./pages/user/Signup";
import KakaoSignup from "./pages/user/KakaoSignup";
import Kakaoloading from "./pages/user/Kakaoloading";
import FindUser from "./pages/user/FindUser";
import UserUpdate from "./pages/user/UserUpdate";
import CheckPassword from "./pages/user/CheckPassword";
import ChangePassword from "./pages/user/ChangePassword";

// page router
import Main from "pages/Main";
import UserLogin from "pages/user/UserLogin";
import AnswererList from "pages/Answerer";
import Questioner from "pages/questioner/Questioner";
import Announcement from "pages/Announcement";
import Conference from "pages/conference/Conference";
import UserMyPage from "pages/answerer/AnswererMyPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/manage/answerer"} element={<ManageAnswerer />}></Route>
        <Route path="/userupdate" element={<UserUpdate />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/checkpassword" element={<CheckPassword />}></Route>
        <Route path="/changepassword" element={<ChangePassword />}></Route>
        <Route path="/KakaoSignup" element={<KakaoSignup />}></Route>
        <Route path="/auth/kakao/callback" element={<Kakaoloading />}></Route>
        <Route path="/findUser" element={<FindUser />}></Route>
        <Route path={"/conference"} element={<Conference />}></Route>
        <Route path={"/"} element={<Main />}></Route>
        <Route path={"user/login"} element={<UserLogin />}></Route>
        <Route path={"answerer/mypage"} element={<UserMyPage />}></Route>
        <Route path={"answerer"} element={<AnswererList />}></Route>
        <Route path={"questioner"} element={<Questioner />}></Route>
        <Route path={"announcement"} element={<Announcement />}></Route>
        <Route path={"conference"} element={<Conference />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
