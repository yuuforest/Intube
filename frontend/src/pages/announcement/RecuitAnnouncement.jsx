import React from 'react'
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

export default function RecuitAnnouncement() {
  const location = useLocation();
  const interview = location.state;

  const navigate = useNavigate();
  function handlePage(e) {
    navigate("/conference", {state : interview});
  }
  return (
    <div>
    <div>{interview.title}</div>
   { interview.interview_time.map((time, index) => (
    <div key={index}>{time}       <Button variant="outlined" onClick={handlePage}>방만들기</Button></div>))}
    </div>
  )
}
