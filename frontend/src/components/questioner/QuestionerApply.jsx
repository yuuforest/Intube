import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import http from "api/Http";

export default function QuestionerApply(props) {
  const [index, setIndex] = useState(0);

  const handleChangeIndex = (event) => {
    setIndex(event.target.value);
  };

  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    getInterviewList();
  }, []);

  const getInterviewList = () => {
    http
      .post(
        "/user/interviewer?page=0",
        JSON.stringify({ interview_state: 4, word: "" }),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.content);
        setInterviewList(response.data.content);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div hidden={props.value !== 1}>
      {interviewList.length > 0 && (
        <div>
          <FormControl>
            <Select value={index} onChange={handleChangeIndex} defaultValue={0}>
              {interviewList.map((interview, index) => (
                <MenuItem value={index} key={interview.id}>
                  {interview.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <Select value={index} onChange={handleChangeIndex} defaultValue={0}>
              {interviewList[0].interviewTimeDetailResList.map(
                (interview, index) => (
                  <MenuItem value={index} key={interview.id}>
                    {interview.title}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </div>
      )}
    </div>
  );
}
