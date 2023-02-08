import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AnnouncementStep4 from "./AnnouncementStep4";
import AnnouncementStep1 from "./AnnouncementStep1";
import AnnouncementStep2 from "./AnnouncementStep2";
import AnnouncementStep3 from "./AnnouncementStep3";
import "./AnnouncementPost.css";

export default function AnnouncementSteps(props) {
  const navigate = useNavigate();
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
    apply_end_time: new Date().toISOString() + 1,
    download_expiration: "",
    questionList: [],
  });
  const [needPoint, setNeedPoint] = React.useState();
  const step1Handeler = (e, data) => {
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
    interviewTime,
    p
  ) => {
    setNeedPoint(p);
    console.log(p);
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
    axios
      .post(
        "http://i8a303.p.ssafy.io:8081/interviews?questionContentList=",
        JSON.stringify(interview),
        {
          headers: {
            "Content-type": "application/json;charset=UTF-8",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then(() => {
        axios
          .put(
            "http://i8a303.p.ssafy.io:8081/user/point",
            JSON.stringify({
              email: userInfo.email,
              point: needPoint,
              key: 0,
            }),
            {
              headers: {
                "Content-type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          )
          .then(() => {
            alert("등록성공");
            navigate("/announcement/manage");
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <AnnouncementStep1
        value={props.value}
        handleChange={props.handleChange}
        interview={interview}
        step1Handeler={step1Handeler}
      ></AnnouncementStep1>
      <AnnouncementStep2
        value={props.value}
        handleChange={props.handleChange}
        interview={interview}
        step2Handeler={step2Handeler}
      ></AnnouncementStep2>
      <AnnouncementStep3
        value={props.value}
        interview={interview}
        handleChange={props.handleChange}
        step3Handeler={step3Handeler}
      ></AnnouncementStep3>
      <AnnouncementStep4
        value={props.value}
        interview={interview}
        question={interview.questionList}
        step4Handeler={step4Handeler}
      ></AnnouncementStep4>
    </div>
  );
}
