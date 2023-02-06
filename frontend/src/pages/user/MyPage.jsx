import React, { useEffect, useState } from "react";
import CalendarComponent from "./components/CalendarComponent";
import "./MyPage.css";
import GetUser from "../../json/user.json";
import Grid from '@mui/material/Grid';
import CardList from './components/CardList'; 
import Temperature from './components/Temperature'; 
import instance from 'components/api/APIController';
import { useLocation } from "react-router-dom";

export default function Mypage() {
  const [userInfo, setUserInfo] = useState(GetUser)
  const [cardInfo, setCardInfo] = useState({match: 1, apply: 2, complete: 3,name: ['매칭인터뷰', '신청인터뷰', '완료인터뷰']})
  const [calendarInfo, setCalendarInfo] = useState([])
  const date = new Date()

  // 나중에 정부 수정할 때
  // const intro="저는 인터뷰 경험이 많아서 잘 할 수 있습니다."
  // const [userIntro, setUserIntro] = useState(intro)
  
  const userName = userInfo.name
  const userAge = date.getFullYear() - Number(userInfo.birth.slice(0, 4)) + 1
  const userIntro = userInfo.introduction

  const location = useLocation();
  const state = location.state;

  const infoInterview = () => {
    console.log('state', state);
    if (state) {
      instance
        .get(
          "http://i8a303.p.ssafy.io:8081/user/interviewee/mypage",
          {
            headers: {
              "Content-type": "application/json;charset=UTF-8",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((response) => {
          setUserInfo(response.data)
          console.log(response.data)
          setCardInfo({match: response.data.conduct_interview_count, apply: response.data.apply_interview_count, complete: response.data.complete_interview_count ,name: ['매칭인터뷰', '신청인터뷰', '완료인터뷰']})
          setCalendarInfo(response.data.conductInterviewTimeList)
          console.log(response.data.conductInterviewTimeList)
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setCardInfo(['모집인터뷰', '진행인터뷰', '완료인터뷰'])
    }
  };

  useEffect(() => {
    infoInterview();
  }, []);

  return (
    <div className="Mypage">
        <div id="sidebar">
        </div>
        <div id="info">
          <h1>{userName}</h1>
          <h3>{userAge}세 / {userInfo.gender === 'M' ? '남성' : '여성'}</h3>
          <h3>{userIntro}</h3>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <CardList cardInfo={cardInfo} />
              <h2 style={{color:'#10316B'}}>인터뷰 온도</h2>
              <br />
              <Temperature />
            </Grid>
            <Grid item xs={6}>
              <CalendarComponent calendarInfo={calendarInfo} />
            </Grid>
          </Grid>
    
        </div>
    </div>
  );
}
