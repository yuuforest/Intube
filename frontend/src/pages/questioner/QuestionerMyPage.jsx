import React, { useEffect, useState } from "react";
import CalendarComponent from "components/answerer/mypage/CalendarComponent";
import Grid from "@mui/material/Grid";
import CardList from "components/answerer/mypage/CardList";
import Temperature from "components/answerer/mypage/Temperature";
import instance from "api/APIController";

import "./QuestionerMyPage.css";

export default function AnswererMyPage() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    name: "",
    nickname: "",
    phone: "",
    gender: "",
    birth: "",
    introduction: "",
    isEmailAuthorized: 1,
    temperature: 36.5,
    point: 0,
    profile_url: "",
  });
  const [cardInfo, setCardInfo] = useState({
    match: 1,
    apply: 2,
    complete: 3,
    name: ["모집인터뷰", "진행인터뷰", "완료인터뷰"],
  });

  const routeInfo = {
    route: '/questioner',
    matchInfo: 4,
    applyInfo: 5,
    completeInfo: 6,
  }

  const [calendarInfo, setCalendarInfo] = useState([]);
  const date = new Date();

  const userName = userInfo.name;
  const userAge = date.getFullYear() - Number(userInfo.birth.slice(0, 4)) + 1;
  const userIntro = userInfo.introduction;

  const infoInterview = () => {
    instance
      .get("http://i8a303.p.ssafy.io:8081/user/interviewer/mypage", {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setUserInfo(response.data);
        setCardInfo({
          match: response.data.recruit_interview_count,
          apply: response.data.conduct_interview_count,
          complete: response.data.complete_interview_count,
          name: ["모집인터뷰", "진행인터뷰", "완료인터뷰"],
        });
        setCalendarInfo(response.data.conductInterviewList);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    infoInterview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Mypage">
      <div id="sidebar"></div>
      <div id="info">
        <h1>{userName}</h1>
        <h3>
          {userAge}세 / {userInfo.gender === "M" ? "남성" : "여성"}
        </h3>
        <h3>{userIntro}</h3>
        <Grid container spacing={6}>
          <Grid item xs={6}>
            <CardList cardInfo={cardInfo} routeInfo={routeInfo}/>
            <h2 style={{ color: "#10316B" }}>인터뷰 온도</h2>
            <br />
            <Temperature />
          </Grid>
          <Grid item xs={6}>
            <CalendarComponent position={2} calendarInfo={calendarInfo} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
