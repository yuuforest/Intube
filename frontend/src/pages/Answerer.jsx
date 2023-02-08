import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "components/common/Header";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";

import AnswererList from "components/answerer/AnswererList";

import axios from "axios";

export default function Answerer() {
  const location = useLocation();

  const state = location.state;
  const [word, setWord] = React.useState("");

  const handleChangeWord = (event) => {
    setWord(event.target.value);
  };

  const [selectedValue, setSelectedValue] = React.useState("");

  const handleChangeRadio = (event) => {
    setSelectedValue(event.target.value);
  };

  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const searchCondition = {
      applicant_state: state,
      word: word,
    };
    getInterview(searchCondition);
  }, [page, selectedValue, state, word]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const [interviewList, setInterviewList] = useState([]);
  const getInterview = (searchCondition) => {
    axios
      .post(
        "http://i8a303.p.ssafy.io:8081/user/interviewee",
        JSON.stringify(searchCondition),
        {
          headers: {
            "Content-type": "application/json;charset=UTF-8",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(searchCondition);
        setInterviewList(response.data.content);
        setTotalPage(response.data.totalPages);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="answerer">
      <Header handleChangeWord={handleChangeWord}></Header>
      <div className="main-interview-check">
        <Button
          value="apply_start_time,desc"
          variant="outlined"
          onClick={handleChangeRadio}
          sx={{ mt: 3, ml: 27 }}
        >
          등록순
        </Button>
        <Button
          value="end_start_time,desc"
          variant="outlined"
          onClick={handleChangeRadio}
          sx={{ mt: 3, ml: 1 }}
        >
          마감순
        </Button>
        <Button
          value="standard_point,desc"
          variant="outlined"
          onClick={handleChangeRadio}
          sx={{ mt: 3, ml: 1 }}
        >
          포인트순
        </Button>
      </div>
      <AnswererList interviewList={interviewList}></AnswererList>
      {interviewList.length > 0 && (
        <Pagination
          count={totalPage}
          onChange={handleChangePage}
          page={page}
          sx={{ mt: 4 }}
          color="primary"
        />
      )}
    </div>
  );
}
