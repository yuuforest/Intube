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
  });
  const interviewChangeHandler = (data) => {
    setInterview(data);
  };
  return (
    <div>
      <AnnouncementStep1
        value={props.value}
        interview={interview}
        interviewChangeHandler={interviewChangeHandler}
      ></AnnouncementStep1>
      <AnnouncementStep2
        value={props.value}
        interview={interview}
        interviewChangeHandler={interviewChangeHandler}
      ></AnnouncementStep2>
      <AnnouncementStep3
        value={props.value}
        interview={interview}
        interviewChangeHandler={interviewChangeHandler}
      ></AnnouncementStep3>
      <AnnouncementStep4
        value={props.value}
        interview={interview}
        interviewChangeHandler={interviewChangeHandler}
      ></AnnouncementStep4>
    </div>
  );
}
