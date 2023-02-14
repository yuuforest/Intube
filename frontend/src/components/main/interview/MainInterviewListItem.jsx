import React from "react";
import http from "api/Http";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ContentPasteRoundedIcon from "@mui/icons-material/ContentPasteRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";

import MainInterviewListItemDetail from "components/main/interview/MainInterviewListItemDetail";
import InterviewTag from "components/common/InterviewTag";

import "components/main/interview/MainInterviewListItem.css";

export default function MainInterviewListItem(props) {
  const [open, setOpen] = React.useState(false);
  const [interview, setInterview] = React.useState({
    id: "",
    category_name: "",
    title: "",
    description: "",
    estimated_time: "",
    start_standard_age: "",
    end_standard_age: "",
    gender: "",
    max_people: "",
    standard_point: "",
    apply_start_time: "",
    apply_end_time: "",
    interviewTimeResList: [{ id: "", interview_start_time: "" }],
    download_expiration: "",
    owner_id: "",
    owner_email: "",
    owner_name: "",
    owner_phone: "",
    applicant_state: "",
  });

  const handleClickOpen = () => () => {
    http
      .get("/interviews/search/" + props.interview.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setInterview(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setOpen(true);
  };

  return (
    <div>
      <Card
        sx={{
          height: 350,
          borderRadius: 3,
          "&:hover": {
            transform: "scale(1.07)",
            cursor: "pointer",
          },
        }}
        onClick={handleClickOpen()}
      >
        <CardContent>
          <InterviewTag interview={props.interview}></InterviewTag>
          <Typography
            align="left"
            gutterBottom
            variant="h5"
            component="div"
            className="title"
            sx={{
              fontWeight: "bold",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
            }}
          >
            {props.interview.title}
          </Typography>

          <Divider />

          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <ContentPasteRoundedIcon />
              </ListItemIcon>
              <ListItemText
                primary={props.interview.description}
                className="interview-list-item-description"
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <PersonRoundedIcon />
              </ListItemIcon>
              <ListItemText>
                {props.interview.start_standard_age}~
                {props.interview.end_standard_age}세{" "}
                {props.interview.gender === "W" && "여성"}
                {props.interview.gender === "M" && "남성"}
                {props.interview.gender === "O" && "상관없음"}
              </ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <AccessTimeRoundedIcon />
              </ListItemIcon>
              <ListItemText>
                {props.interview.apply_start_time} ~
                {props.interview.apply_end_time}
              </ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <PaidRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={props.interview.standard_point} />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      <MainInterviewListItemDetail
        open={open}
        setOpen={setOpen}
        interview={interview}
      />
    </div>
  );
}
