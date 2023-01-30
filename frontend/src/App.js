import InterviewList from "components/Interview/InterviewList";
import Main from "pages/Main";
import PostAnnouncement from "pages/PostAnnouncement";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./common/Header";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={"/interview"} element={<InterviewList />}></Route>
        <Route
          path={"/post"}
          element={<PostAnnouncement></PostAnnouncement>}
        ></Route>
        <Route path={"/"} element={<Main />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
