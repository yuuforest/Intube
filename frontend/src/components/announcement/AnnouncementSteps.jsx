import React from "react";
import AnnouncementStep1 from "./AnnouncementStep1";
import AnnouncementStep2 from "./AnnouncementStep2";
import AnnouncementStep3 from "./AnnouncementStep3";
import AnnouncementStep4 from "./AnnouncementStep4";
import "./AnnouncementSteps.css";

export default function AnnouncementSteps(props) {
  const [interview, setInterview] = React.useState({
    category_name: "",
    title: "",
    description: "",
    estimated_time: "",
    start_standard_age: "",
    end_standard_age: "",
    gender: "",
    max_people: "",
    point: "",
    interview_time: [],
    applicant_state: "0",
    apply_end_time: "",
    download_expiration: "",
  });
  const [question, setQuestion] = React.useState([""]);

  const step3Handeler = (data) => {
    const qlist = [];
    data.forEach((d) => {
      qlist.push(d.value);
    });
    setQuestion(qlist);
  };

  const step2Handeler = (
    title,
    description,
    estimatedTime,
    age,
    gender,
    maxPeople,
    point,
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
      newCondition.point = point;
      const times = [];

      interviewTime.forEach((time) => {
        if (time.value.length > 0) times.push(time.value);
      });
      newCondition.interview_time = times;
      return newCondition;
    });
  };
  const step1Handeler = (e, data) => {
    console.log(data);
    setInterview((interview) => {
      let newCondition = { ...interview };
      newCondition.category_name = data;
      return newCondition;
    });
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
        question={question}
      ></AnnouncementStep4>
    </div>
  );
}
