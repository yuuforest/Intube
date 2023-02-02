import React from "react";
import CalendarComponent from "./components/CalendarComponent";
import "./MyPage.css";
import GetUser from "../../json/user.json";
import Grid from '@mui/material/Grid';
import CardList from './components/CardList'; 
import Temperature from './components/Temperature'; 

export default function Mypage() {
  const userInfo = GetUser
  const date = new Date()
  
  // 나중에 정부 수정할 때
  // const intro="저는 인터뷰 경험이 많아서 잘 할 수 있습니다."
  // const [userIntro, setUserIntro] = useState(intro)
  
  const userName = userInfo.name
  const userAge = date.getFullYear() - Number(userInfo.birth.slice(0, 4)) + 1
  const userIntro = userInfo.introduction


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
              <CardList />
              <h2 style={{color:'#10316B'}}>인터뷰 온도</h2>
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
