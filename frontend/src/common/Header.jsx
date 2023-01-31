import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../assets/logo.png";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Sidebar from "./Sidebar";
import Avatar from '@mui/material/Avatar';
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import "./Common.css";

export default function DenseAppBar() {
  const userInfo = useSelector((state) => state.counter.user)
  console.log(userInfo)
  const menu = [
    {
      text: "로그인",
      icon: <LoginOutlinedIcon fontSize="inherit" />,
      link: "/login"
    },
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
        <img src={Logo} alt="logo" width="130px" onClick={(e) => handlePage(e, "/")} />
        <Box sx={{ flexGrow: 1 }} />

        {/* ------ 로그인 전 -------- */}
        {
        Object.keys(userInfo).length === 0 && 
        menu.map((item, index) => (
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
        ))
        }
        {/* ------ 로그인 후 -------- */}
        {
          Object.keys(userInfo).length > 0 &&
          <Avatar>{userInfo.email[0]}</Avatar>
        }
      </Toolbar>

      <Drawer anchor="left" open={state["left"]} onClose={toggleDrawer(false)}>
        <Sidebar toggleDrawer={toggleDrawer} />
      </Drawer>
    </div>
  );
}
