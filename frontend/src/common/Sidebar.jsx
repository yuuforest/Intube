import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../assets/logo.png";
import Toolbar from "@mui/material/Toolbar";
import PersonIcon from "@mui/icons-material/Person";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import HandshakeIcon from "@mui/icons-material/Handshake";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import EditIcon from "@mui/icons-material/Edit";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ApprovalIcon from "@mui/icons-material/Approval";
import ConstructionIcon from "@mui/icons-material/Construction";
import "./Common.css";

export default function Sidebar(props) {
  const answererMenu = [
    {
      text: "마이페이지",
      icon: <PersonIcon color="primary" />,
      state: props.checked,
      link: "/mypage",
    },
    {
      text: "인터뷰찾기",
      icon: <ContentPasteSearchIcon />,
      state: "0",
      link: "/interview",
    },
    {
      text: "신청인터뷰",
      icon: <ApprovalIcon />,
      state: "1",
      link: "/interview/matching",
    },
    {
      text: "매칭인터뷰",
      icon: <HandshakeIcon />,
      state: "2",
      link: "/interview/matching",
    },
    {
      text: "완료인터뷰",
      icon: <AssignmentTurnedInIcon />,
      state: "2",
      link: "/interview/matching",
    },
    {
      text: "프로필 수정",
      icon: <ConstructionIcon />,
      link: "/",
    },
  ];
  const questionerMenu = [
    { text: "마이페이지", state: props.checked, icon: <PersonIcon />, link: "/mypage" },
    {
      text: "공고올리기",
      icon: <EditIcon />,
      link: "/announcement/post",
    },
    {
      text: "인터뷰관리",
      icon: <VideoFileIcon />,
      link: "/announcement/manage",
    },
    {
      text: "프로필 수정",
      icon: <ConstructionIcon />,
      link: "/",
    },
  ];

  // 페이지 이동
  const navigate = useNavigate();
  function handlePage(e, state, link) {
    console.log(link);
    navigate(link, {
      state: state,
    });
  }

  const backgroud = useRef(null);
  useEffect(() => {
    if (props.checked) backgroud.current.style.backgroundColor = "#0B409C";
    else backgroud.current.style.backgroundColor = "#FFCE63";
  }, [props.checked]);

  return (
    <div className="Sidebar" ref={backgroud}>
      <Box
        sx={{ width: "left" === "top" || "left" === "bottom" ? "auto" : 250 }}
        role="presentation"
      >
        <Toolbar variant="dense" className="Header">
          <IconButton
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={props.toggleDrawer(false)}
          >
            <MenuIcon />
          </IconButton>
          <img
            src={Logo}
            alt="logo"
            width="130px"
            onClick={(e) => handlePage(e, "", "/")}
          />
        </Toolbar>

        <Switch
          checked={props.checked}
          onChange={props.handleChange}
          onClick={props.onFavoriteToggle}
          inputProps={{ "aria-label": "controlled" }}
          sx={{ ml: 22 }}
        />

        {props.userInfo !== "" && (
          <div className="sidebar-profile">
            <Avatar sx={{ height: 82, width: 82, ml: "84px", mb: 2 }}></Avatar>
            <Typography variant="h5" gutterBottom>
              {props.userInfo.name}
            </Typography>
            {props.checked === true ? (
              <Typography variant="subtitle1" gutterBottom>
                답변자
              </Typography>
            ) : (
              <Typography variant="subtitle1" gutterBottom>
                질문자
              </Typography>
            )}
          </div>
        )}
        <div className="sidebar-menu">
          <List>
            {props.checked === true
              ? answererMenu.map((item, index) => (
                  <div key={index}>
                    <ListItem
                      onClick={(e) => handlePage(e, item.state, item.link)}
                    >
                      <ListItemButton>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                      </ListItemButton>
                    </ListItem>
                    {index % 3 === 1 && <Divider />}
                  </div>
                ))
              : questionerMenu.map((item, index) => (
                  <div key={index}>
                    <ListItem
                      onClick={(e) => handlePage(e, item.state, item.link)}
                    >
                      <ListItemButton>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                      </ListItemButton>
                    </ListItem>
                    {index % 3 === 1 && <Divider />}
                  </div>
                ))}
            <ListItem className="Footer">
              정보 보도자료 저작권 문의하기 크리에이터 광고개발자 약관
              개인정보처리방침 정책 및 안전YouTube 작동의 원리새로운 기능
              테스트하기 © 2023 Google LLC, Sundar Pichai, 1600 Amphitheatre
              Parkway, Mountain View CA 94043, USA, 0807-882-594 (무료),
              yt-support-solutions-kr@google.com, 호스팅: Google LLC,
              사업자정보, 불법촬영물 신고 크리에이터들이 유튜브 상에 게시, 태그
              또는 추천한 상품들은 판매자들의 약관에 따라 판매됩니다. 유튜브는
              이러한 제품들을 판매하지 않으며, 그에 대한 책임을 지지 않습니다.
            </ListItem>
          </List>
        </div>
      </Box>
    </div>
  );
}
