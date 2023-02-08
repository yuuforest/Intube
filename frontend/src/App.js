import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// page router
import Main from "pages/Main";
import UserLogin from "pages/user/UserLogin";
import AnswererList from "pages/Answerer";
import Questioner from "pages/questioner/Questioner";
import Announcement from "pages/Announcement";
import Conference from "pages/conference/Conference";
import UserMyPage from "pages/answerer/AnswererMyPage";
import QuestionerApply from "pages/questioner/QuestionerApply";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Main />}></Route>
        <Route path={"user/login"} element={<UserLogin />}></Route>
        <Route path={"answerer/mypage"} element={<UserMyPage />}></Route>
        <Route path={"answerer"} element={<AnswererList />}></Route>
        <Route path={"questioner"} element={<Questioner />}></Route>
        <Route path={"announcement"} element={<Announcement />}></Route>
        <Route path={"conference"} element={<Conference />}></Route>
        <Route path={"questioner/apply"} element={<QuestionerApply />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
