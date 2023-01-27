import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../assets/logo.png";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Sidebar from "./Sidebar";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import ContentPasteSearchOutlinedIcon from "@mui/icons-material/ContentPasteSearchOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import "./Common.css";

export default function DenseAppBar() {
  const menu = [
    {
      text: "인터뷰찾기",
      icon: <ContentPasteSearchOutlinedIcon fontSize="inherit" />,
    },
    { text: "공고올리기", icon: <CampaignOutlinedIcon fontSize="inherit" /> },
    {
      text: "마이페이지",
      icon: <PersonOutlineRoundedIcon fontSize="inherit" />,
    },
    {
      text: "로그인",
      icon: <LoginOutlinedIcon fontSize="inherit" />,
    },
  ];
  const [state, setState] = React.useState({
    left: false,
  });
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, left: open });
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
        <img src={Logo} alt="logo" width="130px" />
        <Box sx={{ flexGrow: 1 }} />
        {menu.map((item, index) => (
          <IconButton
            edge="start"
            size="large"
            color="inherit"
            aria-label={item.text}
            sx={{ mr: 2 }}
            key={index}
          >
            {item.icon}
          </IconButton>
        ))}
      </Toolbar>

      <Drawer anchor="left" open={state["left"]} onClose={toggleDrawer(false)}>
        <Sidebar toggleDrawer={toggleDrawer} />
      </Drawer>
    </div>
  );
}
