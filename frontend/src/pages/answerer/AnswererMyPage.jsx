import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
import CalendarComponent from "components/answerer/mypage/CalendarComponent";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import CardList from "components/answerer/mypage/CardList";
import Box from "@mui/material/Box";
import instance from "api/APIController";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Header from "components/common/Header";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import "./AnswererMyPage.css";

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
    name: ["매칭인터뷰", "신청인터뷰", "완료인터뷰"],
  });

  const routeInfo = {
    route: "/answerer",
    matchInfo: 2,
    applyInfo: 1,
    completeInfo: 3,
  };

  const [calendarInfo, setCalendarInfo] = useState([
    {
      applicant_state: 2,
      apply_end_time: "2023-02-10 02:11",
      apply_start_time: "2023-02-10 02:11",
      category_name: "1:1",
      description: "유제품 좋아하는 사람?",
      download_expiration: null,
      end_standard_age: 53,
      estimated_time: "12",
      gender: "M",
      id: 39,
      interviewTimeRes: {
        id: 31,
        interview_start_time: "2023-02-10 13:13",
        modifyResultState: 0,
      },
      interview_state: 5,
      max_people: 12,
      owner_email: "ssafy1@ssafy.com",
      owner_id: 10,
      owner_name: "영싸피",
      owner_phone: "01022222222",
      standard_point: 11,
      start_standard_age: 20,
      title: "유제품 맛테스트 조사",
    },
  ]);
  const date = new Date();

  // 나중에 정부 수정할 때
  // const intro="저는 인터뷰 경험이 많아서 잘 할 수 있습니다."
  // const [userIntro, setUserIntro] = useState(intro)

  const userName = userInfo.name;
  const userAge = date.getFullYear() - Number(userInfo.birth.slice(0, 4)) + 1;
  const userIntro = userInfo.introduction;

  const infoInterview = () => {
    instance
      .get("/user/interviewee/mypage", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setUserInfo(response.data);
        setCardInfo({
          match: response.data.conduct_interview_count,
          apply: response.data.apply_interview_count,
          complete: response.data.complete_interview_count,
          name: ["매칭인터뷰", "신청인터뷰", "완료인터뷰"],
        });
        setCalendarInfo(response.data.conductInterviewTimeList);
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
      <Header></Header>
      <Grid container spacing={6} justifyContent="space-between" sx={{ mt: 5 }}>
        <Grid item xs={1}></Grid>
        <Grid item xs={4}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Avatar
                sx={{
                  width: 240,
                  height: 240,
                }}
                alt="profile"
                src={
                  "https://303-intube.s3.ap-northeast-2.amazonaws.com/" +
                  userInfo.profile_url
                }
              />
            </Grid>
            <Grid item xs={6}>
              <h1>{userName}</h1>
              <h3>
                {userAge}세 / {userInfo.gender === "M" ? "남성" : "여성"}
              </h3>
              <h3>{userIntro}</h3>
              <Avatar sx={{ mr: 2, mt: 2, float: "left" }}>
                <AttachMoneyIcon />
              </Avatar>
              <Typography variant="h4" sx={{ mt: 2 }}>
                {userInfo.point
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <CardList cardInfo={cardInfo} routeInfo={routeInfo} />
              <Typography variant="h4" sx={{ my: 3, color: "#10316B" }}>
                인터뷰 온도
              </Typography>
              <Box
                sx={{
                  width: userInfo.temperature + "%",
                  textAlign: "right",
                  height: 10,
                }}
              >
                {userInfo.temperature}℃
              </Box>
              <Box
                sx={{
                  width: userInfo.temperature + "%",
                  textAlign: "right",
                  color: "primary.dark",
                  height: 30,
                }}
              >
                <ArrowDropDownIcon sx={{ fontSize: 40 }} />
              </Box>

              <Box
                sx={{
                  position: "relative",
                  width: "95%",
                  height: 30,
                  borderRadius: 20,
                  backgroundColor: "lightgrey",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    width: userInfo.temperature + "%",
                    height: 30,
                    borderRadius: 20,
                    backgroundColor: "primary.dark",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <CalendarComponent position={1} calendarInfo={calendarInfo} />
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>

      <Grid
        container
        spacing={6}
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ mt: 3 }}
      >
        <Grid item xs={2}></Grid>
        <Grid item xs={5}></Grid>
        <Grid item xs={5}></Grid>
      </Grid>
    </div>
  );
}
