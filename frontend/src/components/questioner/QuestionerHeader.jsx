import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "api/logout";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import PersonIcon from "@mui/icons-material/Person";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
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
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import http from "api/Http";
import Logo from "assets/logo2.png";

import "components/questioner/QuestionerHeader.css";

export default function Header(props) {
  const [userInfo, setUserInfo] = useState({ name: "" });
  useEffect(() => {
    getUser();
  }, []);
  const getUser = () => {
    http
      .get("/user/me", {
        headers: {
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

  // 페이지 이동
  const navigate = useNavigate();
  function handlePage(e, link) {
    console.log(link);
    navigate(link);
  }

  function logoutApi() {
    logout();
  }

  //로그인 후
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickAvatar = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAvatar = () => {
    setAnchorEl(null);
  };

  return (
    <div className="question-header">
      <Toolbar variant="" sx={{ height: "60px" }}>
        <img
          src={Logo}
          alt="logo"
          width="130px"
          onClick={(e) => handlePage(e, "/")}
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
            onClick={(e) => handlePage(e, "/user/login")}
          >
            <LoginOutlinedIcon />
          </IconButton>
        )}
        {/* ------ 로그인 후 -------- */}

        {localStorage.getItem("accessToken") != null &&
          // <Avatar>{userInfo.email[0]}</Avatar>
          (console.log(
            localStorage.getItem("accessToken"),
            "엑세스토큰 있음. 로그인 상태 맞음?"
            // eslint-disable-next-line no-sequences
          ),
          (
            <React.Fragment>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<VideoCallOutlinedIcon />}
                  onClick={(e) => handlePage(e, "/announcement")}
                >
                  공고 만들기
                </Button>

                <Tooltip title="Account info">
                  <IconButton
                    onClick={handleClickAvatar}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar sx={{ width: 42, height: 42 }}>
                      {userInfo.name[0]}
                    </Avatar>
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
                  ></Avatar>
                  <Typography variant="h5" gutterBottom>
                    {userInfo.name}
                  </Typography>

                  <Typography variant="subtitle1" gutterBottom>
                    질문자
                  </Typography>
                </div>

                <Divider />
                <MenuItem onClick={(e) => handlePage(e, "/questioner/mypage")}>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  마이페이지
                </MenuItem>
                <MenuItem onClick={(e) => handlePage(e, "/")}>
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
              </Menu>
            </React.Fragment>
          ))}
      </Toolbar>
    </div>
  );
}
