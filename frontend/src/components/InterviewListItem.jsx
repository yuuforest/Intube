import React from "react";
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

export default function interviewListItem(props) {
  return (
    <div>
      <Card sx={{ minHeight: 300 }}>
        <CardContent>
          <Typography align="left" gutterBottom variant="h5" component="div">
            {props.interview.title}
          </Typography>

          <Divider />

          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <ContentPasteRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={props.interview.description} />
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
              <ListItemText primary={props.interview.point} />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </div>
  );
}
