import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./components/user/login/Signup";
import KakaoSignup from "./components/user/login/KakaoSignup";
import Kakaoloading from "./components/user/login/Kakaoloading";
import FindUser from "./components/user/login/FindUser";
import UserUpdate from "./components/user/login/UserUpdate";
import CheckPassword from "./components/user/login/CheckPassword";
import ChangePassword from "./pages/user/ChangePassword";

// page router
import Main from "pages/Main";
import UserLogin from "pages/user/UserLogin";
import AnswererList from "pages/Answerer";
import Questioner from "pages/questioner/Questioner";
import Announcement from "pages/Announcement";
import Conference from "pages/conference/Conference";
import UserMyPage from "pages/answerer/AnswererMyPage";
import QuestionerApply from "pages/questioner/QuestionerApply";
import QuestionerMyPage from "pages/questioner/QuestionerMyPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
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
        <Route path={"questioner/apply"} element={<QuestionerApply />}></Route>
        <Route
          path={"questioner/mypage"}
          element={<QuestionerMyPage />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
