import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import InterviewListItem from "./InterviewListItem";
import { useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./InterviewList.css";

export default function InterviewList() {
  const location = useLocation();
  const state = location.state;
  const [interviewList, setInterviewList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(0);
  const [searchCondition, setSearchCondition] = React.useState({
    category_name: "",
    word: "",
  });
  const handleChangePage = (event, value) => {
    setPage(value);
  };
  const selectInterview = () => {
    axios
      .post(
        "http://i8a303.p.ssafy.io:8081/interviews/search?page=" + page,
        JSON.stringify(searchCondition),
        {
          headers: {
            "Content-type": "application/json;charset=UTF-8",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setInterviewList(response.data.content);
        setTotalPage(response.data.totalPages);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    selectInterview();
  }, [page]);

  return (
    <div className="interviewList">
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {interviewList.length > 0 ? (
            interviewList.map((interview) => (
              <Grid item sm={12} md={6} lg={4} xl={3} key={interview.id}>
                <InterviewListItem interview={interview} />
              </Grid>
            ))
          ) : (
            <div>신청한 인터뷰가 없습니다. 인터뷰 찾기에서 신청해보세요</div>
          )}
        </Grid>
      </Container>

      <Pagination
        count={totalPage}
        onChange={handleChangePage}
        page={page}
        color="primary"
      />
    </div>
  );
}
