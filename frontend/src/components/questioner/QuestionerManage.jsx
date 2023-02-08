import React, { useState, useEffect } from "react";
import axios from "axios";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import QuestionerList from "components/questioner/QuestionerList";
import Pagination from "@mui/material/Pagination";

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
  const handleChangeWord = (event) => {
    console.log(event.target.value);
    setSearchCondition({
      category_name: " ",
      word: event.target.value,
    });
  };

  useEffect(() => {
    getInterviewList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchCondition, page]);

  const getInterviewList = () => {
    axios
      .post(
        "http://i8a303.p.ssafy.io:8081/user/interviewer?page=" + page,
        JSON.stringify(searchCondition),
        {
          headers: {
            "Content-type": "application/json;charset=UTF-8",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
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
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Interview"
          inputProps={{ "aria-label": "search google maps" }}
          onChange={handleChangeWord}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

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
