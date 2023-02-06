import React from "react";
import AnnouncementStep1 from "./AnnouncementStep1";
import AnnouncementStep2 from "./AnnouncementStep2";
import AnnouncementStep3 from "./AnnouncementStep3";
import axios from "axios";
import AnnouncementStep4 from "./AnnouncementStep4";
import "./AnnouncementSteps.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function AnnouncementSteps(props) {
  const [interview, setInterview] = React.useState({
    category_name: "1:1",
    title: "",
    description: "",
    estimated_time: "",
    start_standard_age: "",
    end_standard_age: "",
    gender: "",
    max_people: "",
    standard_point: "",
    interviewTimeList: [],
    applicant_state: "0",
    apply_end_time: "",
    download_expiration: "",
    questionList: [],
  });
  const step1Handeler = (e, data) => {
    console.log(data);
    setInterview((interview) => {
      let newCondition = { ...interview };
      newCondition.category_name = data;
      return newCondition;
    });
  };

  const step2Handeler = (
    title,
    description,
    estimatedTime,
    age,
    gender,
    maxPeople,
    standard_point,
    interviewTime
  ) => {
    setInterview((interview) => {
      let newCondition = { ...interview };
      newCondition.title = title;
      newCondition.description = description;
      newCondition.estimated_time = estimatedTime;
      newCondition.start_standard_age = age[0];
      newCondition.end_standard_age = age[1];
      newCondition.gender = gender;
      newCondition.max_people = maxPeople;
      newCondition.standard_point = standard_point;
      const times = [];

      interviewTime.forEach((time) => {
        if (time.value.length > 0) times.push(time.value);
      });
      newCondition.interviewTimeList = times;
      return newCondition;
    });
  };
  const step3Handeler = (data) => {
    const qlist = [];
    data.forEach((d) => {
      qlist.push(d.value);
    });
    setInterview((interview) => {
      let newCondition = { ...interview };
      newCondition.questionList = qlist;
      return newCondition;
    });
  };

  const step4Handeler = () => {
    console.log(interview);
    axios
      .post(
        "http://i8a303.p.ssafy.io:8081/interviews?questionContentList=",
        JSON.stringify(interview),
        {
          headers: {
            "Content-type": "application/json;charset=UTF-8",
            // Accept: "application/json",
            // "Access-Control-Allow-Origin": "http://localhost:8080",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          // withCredentials: true,
        }
      )
      .then((response) => {
        setOpen(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div>
      <AnnouncementStep1
        value={props.value}
        interview={interview}
        step1Handeler={step1Handeler}
      ></AnnouncementStep1>
      <AnnouncementStep2
        value={props.value}
        interview={interview}
        step2Handeler={step2Handeler}
      ></AnnouncementStep2>
      <AnnouncementStep3
        value={props.value}
        interview={interview}
        step3Handeler={step3Handeler}
      ></AnnouncementStep3>
      <AnnouncementStep4
        value={props.value}
        interview={interview}
        question={interview.questionList}
        step4Handeler={step4Handeler}
      ></AnnouncementStep4>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          등록성공
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
