import React, { useState, useEffect } from "react";
import http from "api/Http";

import QuestionerList from "components/questioner/QuestionerList";
import Pagination from "@mui/material/Pagination";
import NativeSelect from "@mui/material/NativeSelect";

import "pages/questioner/Questioner.css";

export default function Questioner(props) {
  const [interviewList, setInterviewList] = useState([]);
  const [searchCondition, setSearchCondition] = useState({
    interview_state: 0,
    word: "",
  });

  const [totalPage, setTotalPage] = useState(0);

  const [page, setPage] = useState(0);
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleChangeState = (event) => {
    console.log(event.target.value);
    setSearchCondition({
      interview_state: event.target.value,
      word: "",
    });
  };

  useEffect(() => {
    getInterviewList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchCondition, page]);

  const getInterviewList = () => {
    http
      .post("/user/interviewer?page=" + page, JSON.stringify(searchCondition), {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setInterviewList(response.data.content);
        setTotalPage(response.data.totalPages);
      })
      .catch((error) => {
        console.log(searchCondition);
        console.error(error);
      });
  };

  return (
    <div>
      <NativeSelect
        defaultValue={0}
        inputProps={{
          name: "interview_state",
        }}
        sx={{ mx: 1, mb: 1 }}
        onChange={handleChangeState}
      >
        <option value={0}>공고 전체</option>
        <option value={4}>모집중</option>
        <option value={5}>진행중</option>
        <option value={6}>완료</option>
      </NativeSelect>
      <QuestionerList interviewList={interviewList}></QuestionerList>

      <Pagination
        count={totalPage}
        onChange={handleChangePage}
        page={page}
        color="primary"
      />
    </div>
  );
}
