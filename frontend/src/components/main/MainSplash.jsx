// inTube 로그인 전 페이지
import React from "react";
import "./MainSplash.css";
import maininterview from "assets/mainInterview.jpg";
import maininterview2 from "assets/mainInterview2.jpg";
import maininterview3 from "assets/mainInterview3.png";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";

export default function MainSplash() {
  // 페이지 이동
  const navigate = useNavigate();
  function handlePage(e, link) {
    console.log(link);
    navigate(link);
  }

  return (
    <div className="main">
      <div className="first">
        <div className="text">
          <span>당신이 필요한 인터뷰</span>
          <br />
          <br />
          <span>
            여러분의 의견이 필요한 사람들에게 <br />
            당신의 이야기를 들려주세요.
          </span>
        </div>
        <div>
          <img className="picture1" src={maininterview} alt="dd"></img>
          <img className="picture2" src={maininterview2} alt="dd"></img>
        </div>
      </div>
      <div className="second">
        <div className="text">
          <span>당신이 편한 인터뷰</span>
          <br />
          <br />
          <span>
            편하게 질문하세요. <br />
            저희가 인터뷰 내용을 기록해 드릴게요.
          </span>
        </div>
        <div className="button">
          <Button
            variant="outlined"
            size="large"
            onClick={e => handlePage(e, "/user/login")}
          >
            로그인 하기
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ ml: 2 }}
            onClick={e => handlePage(e, "/signup")}
          >
            회원가입 하기
          </Button>
        </div>
        <div>
          <img className="picture1" src={maininterview3} alt="dd"></img>
        </div>
      </div>
    </div>
  );
}
