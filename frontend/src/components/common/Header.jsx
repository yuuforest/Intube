import React, { useEffect, useState } from "react";
import http from "api/Http";
import { useNavigate } from "react-router-dom";
import { logout } from "api/logout";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import PersonIcon from "@mui/icons-material/Person";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "assets/logo.png";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import Logout from "@mui/icons-material/Logout";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import Drawer from "@mui/material/Drawer";
import Sidebar from "components/common/Sidebar";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import "components/common/Header.css";

export default function Header(props) {
  const [userInfo, setUserInfo] = useState({ name: "" });

  useEffect(() => {
    if (localStorage.getItem("accessToken") !== null) getUser();
  }, []);
  const getUser = () => {
    http
      .get("/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(response => {
        setUserInfo(response.data);
      })
      .catch(error => {
        if (error.response.status === 401) {
          console.log("로그아웃 상태, 토큰이 없어서 401에러가 맞음. 걱정마셈");
        }
      });
  };
  const [state, setState] = React.useState({
    left: false,
  });
  const toggleDrawer = open => event => {
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

  const handlePoint = () => {
    http
      .put(
        "/user/point",
        JSON.stringify({ email: userInfo.email, point: 500, key: 1 }),
        {
          headers: {
            "Content-type": "application/json;charset=UTF-8",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then(response => {
        console.log(response);
        getUser();
      })
      .catch(error => {
        console.error(error);
      });
  };

  //로그인 후
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickAvatar = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAvatar = () => {
    setAnchorEl(null);
  };

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
          onClick={e => handlePage(e, "/")}
        />
        <Box sx={{ flexGrow: 1 }} />
        {props.handleChangeWord !== undefined && (
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Interview"
              inputProps={{ "aria-label": "search google maps" }}
              onChange={props.handleChangeWord}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        )}
        <Box sx={{ flexGrow: 1 }} />
        {/* ------ 로그인 전 -------- */}
        {/* Object.keys(userInfo).length */}
        {localStorage.getItem("accessToken") === null && (
          <IconButton
            edge="start"
            size="large"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={e => handlePage(e, "/user/login")}
          >
            <LoginOutlinedIcon />
          </IconButton>
        )}
        {/* ------ 로그인 후 -------- */}

        {localStorage.getItem("accessToken") != null && (
          <React.Fragment>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Tooltip title="인터뷰 찾기">
                <IconButton size={"large"} onClick={e => handlePage(e, "/")}>
                  <ContentPasteSearchIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="공고 만들기">
                <IconButton
                  size={"large"}
                  onClick={e => handlePage(e, "/announcement")}
                >
                  <VideoCallOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Account info">
                <IconButton
                  onClick={handleClickAvatar}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar
                    sx={{ width: 42, height: 42 }}
                    alt="profile"
                    src={
                      "https://303-intube.s3.ap-northeast-2.amazonaws.com/" +
                      userInfo.profile_url
                    }
                  />
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleCloseAvatar}
              onClick={handleCloseAvatar}
              sx={{ width: "300px" }}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  width: "500px",
                  mt: 1.5,
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <div className="sidebar-profile">
                <Avatar
                  sx={{ height: 82, width: 82, margin: "auto" }}
                  alt="profile"
                  src={
                    "https://303-intube.s3.ap-northeast-2.amazonaws.com/" +
                    userInfo.profile_url
                  }
                />
                <Typography variant="h5" gutterBottom>
                  {userInfo.name}
                </Typography>

                <Typography variant="subtitle1" gutterBottom>
                  답변자
                </Typography>
              </div>

              <Divider />
              <MenuItem onClick={e => handlePage(e, "answerer/mypage")}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                마이페이지
              </MenuItem>
              <MenuItem onClick={e => handlePage(e, "/questioner")}>
                <ListItemIcon>
                  <SwitchAccountIcon fontSize="small" />
                </ListItemIcon>
                사용자 전환
              </MenuItem>
              <MenuItem onClick={logoutApi}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                로그아웃
              </MenuItem>
              <Divider />
              <MenuItem sx={{ px: 2 }} onClick={handlePoint}>
                <Avatar>
                  <AttachMoneyIcon />
                </Avatar>
                {userInfo.point}
              </MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </Toolbar>

      <Drawer anchor="left" open={state["left"]} onClose={toggleDrawer(false)}>
        <Sidebar toggleDrawer={toggleDrawer} userInfo={userInfo} />
      </Drawer>
    </div>
  );
}
