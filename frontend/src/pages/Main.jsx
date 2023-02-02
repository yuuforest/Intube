import React from "react";
import SignInSide from "./mainpage/SignInSide.jsx";
import InterviewAll from "./mainpage/InterviewAll.jsx";

export default function Main() {
  return (
  <div
  style={{margin:'40px 100px'}}
  >
    {/* <br />
    <br /> */}
    <SignInSide />
    <br />
    <br />
    <InterviewAll />
  </div> 
  );

}
