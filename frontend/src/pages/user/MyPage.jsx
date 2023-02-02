import React from "react";
import CalendarComponent from "./components/CalendarComponent";
import "./MyPage.css";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import CardList from "./components/CardList";
import Temperature from "./components/Temperature";

const label = { inputProps: { "aria-label": "Color switch demo" } };

export default function Mypage() {
  const userIntro = "안녕하세요. 저는 인터뷰 경험이 많아서 잘 할 수 있습니다.";

  // 나중에 axios로 user 정보 가져오면 사용
  // const [userName, setUserName] = useState('이한나')
  // const [userAge, setUserAge] = useState('25')
  // const [userGender, setUserGender] = useState('여성')
  // const [userIntro, setUserIntro] = useState(intro)
  const userName = "이한나";
  const userAge = 25;
  const userGender = "여성";

  return (
    <div className="Mypage">
      <div id="sidebar">
        <Switch {...label} defaultChecked />
      </div>
      <div id="info">
        <h1>{userName}</h1>
        <h3>
          {userAge}세 / {userGender}
        </h3>
        <h3>{userIntro}</h3>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CardList />
            <h2 style={{ color: "#10316B" }}>인터뷰 온도</h2>
            <br />
            <Temperature />
          </Grid>
          <Grid item xs={6}>
            <CalendarComponent />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
