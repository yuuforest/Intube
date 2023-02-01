import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import getAnswererList from "json/answerer_list";
import Checkbox from "@mui/material/Checkbox";
import { useLocation } from "react-router-dom";

const newList = getAnswererList.answerer_list.map((item) => {
  return item;
});
export default function ManageAnswerer() {
  const location = useLocation();
  const interview = location.state.interview;
  const index = location.state.index;
  return (
    <div>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: "bold", ml: 3, mt: 3, textAlign: "center" }}
      >
        {interview.title} {interview.interview_time[index]} 지원자 관리
      </Typography>
      <Divider />
      <List>
        <ListItem>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={3}
          >
            <Grid item xs={1} sx={{ textAlign: "center" }}>
              <Checkbox />
            </Grid>
            <Grid item xs={3} sx={{ textAlign: "center" }}>
              <Typography variant="subtitle2">지원자</Typography>
            </Grid>
            <Grid item xs={3} sx={{ textAlign: "center" }}>
              <Typography variant="subtitle2" gutterBottom>
                자기소개
              </Typography>
            </Grid>
            <Grid item xs={3} sx={{ textAlign: "center" }}>
              <Typography variant="subtitle2" gutterBottom>
                인터뷰온도
              </Typography>
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "center" }}>
              <Typography variant="subtitle2" gutterBottom>
                평가
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
        <Divider />
        {newList.map((answerer) => (
          <div className="list-item" key={answerer.id}>
            <ListItem>
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                spacing={3}
              >
                <Grid item xs={1} sx={{ textAlign: "center" }}>
                  <Typography variant="subtitle2">
                    <Checkbox />
                  </Typography>
                </Grid>
                <Grid item xs={3} sx={{ textAlign: "left" }}>
                  <Avatar sx={{ float: "left", mr: 2 }}>
                    {answerer.email[0]}
                  </Avatar>
                  <Typography variant="subtitle1">{answerer.name}</Typography>
                  <Typography variant="subtitle2">
                    {answerer.nickname} / {answerer.birth} /{answerer.gender}
                  </Typography>
                </Grid>
                <Grid item xs={3} sx={{ textAlign: "center" }}>
                  <Typography variant="subtitle2" gutterBottom>
                    {answerer.introduction}
                  </Typography>
                </Grid>
                <Grid item xs={3} sx={{ textAlign: "center" }}>
                  <Typography variant="subtitle2" gutterBottom>
                    {answerer.temperature}
                  </Typography>
                </Grid>
                <Grid item xs={2} sx={{ textAlign: "center" }}>
                  <Button variant="outlined">합격</Button>
                  <Button variant="outlined" sx={{ ml: 2 }}>
                    불합격
                  </Button>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
}
