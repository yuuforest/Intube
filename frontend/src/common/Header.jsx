import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../assets/logo.png";
import Drawer from "@mui/material/Drawer";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Sidebar from "./Sidebar";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { logout } from "../components/api/logout";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import "./Common.css";

export default function DenseAppBar() {
  // const userInfo = useSelector(state => state.counter.user);
  // console.log(userInfo);
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    console.log(checked);
  };
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    getUser();
  }, []);
  const getUser = () => {
    axios
      .get("http://i8a303.p.ssafy.io:8081/user/me", {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const loginButton = [
    {
      text: "로그인",
      icon: <LoginOutlinedIcon fontSize="inherit" />,
      link: "/login",
    },
  ];
  const logoutButton = [
    {
      text: "로그아웃",
      icon: <LogoutIcon fontSize="inherit" />,
      link: "/",
    },
    // console.log(localStorage.getItem("accessToken").length),
  ];
  const [state, setState] = React.useState({
    left: false,
  });
  const toggleDrawer = (open) => (event) => {
    setState({ ...state, left: open });
  };

  // 페이지 이동
  const navigate = useNavigate();
  function handlePage(e, link) {
    console.log(link);
    navigate(link, {
      state: state,
    });
  }

  function logoutApi() {
    logout();
  }

  return (
    <div>
      <Toolbar variant="dense" className="Header">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 3 }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <img
          src={Logo}
          alt="logo"
          width="130px"
          onClick={(e) => handlePage(e, "/")}
        />

        <Box sx={{ flexGrow: 1 }} />
        {/* ------ 로그인 전 -------- */}
        {/* Object.keys(userInfo).length */}
        {localStorage.getItem("accessToken") === null &&
          loginButton.map(
            (item, index) => (
              // eslint-disable-next-line no-sequences
              console.log(localStorage.getItem("accessToken")),
              (
                <IconButton
                  edge="start"
                  size="large"
                  color="inherit"
                  aria-label={item.text}
                  sx={{ mr: 2 }}
                  key={index}
                  onClick={(e) => handlePage(e, item.link)}
                >
                  {item.icon}
                </IconButton>
              )
            )
          )}
        {/* ------ 로그인 후 -------- */}
        {userInfo != "" && <Avatar sx={{ mr: 3 }}>{userInfo.name[0]}</Avatar>}

        {localStorage.getItem("accessToken") != null &&
          // <Avatar>{userInfo.email[0]}</Avatar>
          logoutButton.map(
            (item, index) => (
              console.log(
                localStorage.getItem("accessToken"),
                "엑세스토큰 있음. 로그인 상태 맞음?"
                // eslint-disable-next-line no-sequences
              ),
              (
                <IconButton
                  edge="start"
                  size="large"
                  color="inherit"
                  aria-label={item.text}
                  sx={{ mr: 2 }}
                  key={index}
                  // onClick={e => handlePage(e, item.link)}
                  onClick={logoutApi}
                  // 길어져서 따로 로그아웃 컴포넌트 만들어야 할듯
                >
                  {item.icon}
                </IconButton>
              )
            )
          )}
      </Toolbar>

      <Drawer anchor="left" open={state["left"]} onClose={toggleDrawer(false)}>
        <Sidebar
          toggleDrawer={toggleDrawer}
          handleChange={handleChange}
          checked={checked}
          userInfo={userInfo}
        />
      </Drawer>
    </div>
  );
}
