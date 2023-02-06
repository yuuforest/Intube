import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProgressAnnouncement() {
  const location = useLocation();
  const interview = location.state;

  const navigate = useNavigate();
  function handlePage(e) {
    navigate("/conference", { state: { interview, userName } });
  }
  const [userName, setUserName] = useState([]);
  useEffect(() => {
    axios
      .get("http://i8a303.p.ssafy.io:8081/user/me", {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setUserName(response.data.name);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <div>{interview.title}</div>
      {interview.interviewTimeDetailResList.map((time, index) => (
        <div key={index}>
          {time.interview_start_time}
          <Button variant="outlined" onClick={handlePage}>
            방만들기
          </Button>
        </div>
      ))}
    </div>
  );
}
