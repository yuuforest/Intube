import React, { useEffect, useState } from "react";
import MainInterviewList from "components/main/interview/MainInterviewList";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import http from "api/Http";

export default function MainInterview(props) {
  const [selectedValue, setSelectedValue] = React.useState(
    "apply_start_time,desc"
  );

  const handleChangeRadio = (event) => {
    setSelectedValue(event.target.value);
  };

  const [interviewList, setInterviewList] = useState([]);

  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getInterview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, props.searchCondition, selectedValue]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const getInterview = () => {
    http
      .post(
        "/interviews/search?page=" + page + "&sort=" + selectedValue,
        JSON.stringify(props.searchCondition),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        setInterviewList(response.data.content);
        setTotalPage(response.data.totalPages);
      })
      .catch((error) => {
        console.log(props.searchCondition);
        console.error(error);
      });
  };
  return (
    <div className="main-interview">
      <div className="main-interview-check">
        <Button
          value="apply_start_time,desc"
          variant="outlined"
          onClick={handleChangeRadio}
          sx={{ my: 3, ml: 27 }}
        >
          등록순
        </Button>
        <Button
          value="end_start_time,desc"
          variant="outlined"
          onClick={handleChangeRadio}
          sx={{ my: 3, ml: 1 }}
        >
          마감순
        </Button>
        <Button
          value="standard_point,desc"
          variant="outlined"
          onClick={handleChangeRadio}
          sx={{ my: 3, ml: 1 }}
        >
          포인트순
        </Button>
      </div>

      <MainInterviewList interviewList={interviewList}></MainInterviewList>
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
