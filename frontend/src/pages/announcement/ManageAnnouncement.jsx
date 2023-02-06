import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import StateTag from "components/management/stateTag";
import "./Announcement.css";

export default function ManageAnnouncement() {
  const [interviewList, setInterviewList] = useState([]);
  const [searchCondition, setSearchCondition] = useState({
    interview_state: 0,
    word: "",
  });
  const changeState = (e) => {
    console.log(e.target.value);
    setSearchCondition({ interview_state: e.target.value, word: "" });
  };
  useEffect(() => {
    getInterviewList();
  }, [searchCondition]);
  const navigate = useNavigate();
  function handlePage(e, interview) {
    let link = "/";
    if (interview.interview_state === 4) link = "/announcement/recuit";
    else if (interview.interview_state === 5) link = "/announcement/progress";
    else if (interview.interview_state === 6) link = "/announcement/close";
    navigate(link, { state: interview });
  }
  function goManageAnswerer(e, interview, index) {
    navigate("/manage/answerer", { state: { interview, index } });
  }
  const getInterviewList = () => {
    axios
      .post(
        "http://i8a303.p.ssafy.io:8081/user/interviewer",
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
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const onClickDeadline = (e) => {
    axios
      .put(
        "http://i8a303.p.ssafy.io:8081/interviews/interviewer/expired-interview?interview_id=" +
          e.target.value +
          "&interview_state=5",
        {
          headers: {
            "Content-type": "application/json;charset=UTF-8",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        getInterviewList();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const onClickEnd = (e) => {
    axios
      .put(
        "http://i8a303.p.ssafy.io:8081/interviews/interviewer/expired-interview?interview_id=" +
          e.target.value +
          "&interview_state=6",
        {
          headers: {
            "Content-type": "application/json;charset=UTF-8",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        getInterviewList();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="announcement-table">
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: "bold", ml: 3, mt: 3, textAlign: "center" }}
      >
        인터뷰 관리
      </Typography>
      <Button
        variant="outlined"
        sx={{ ml: 2, my: 1 }}
        value={0}
        onClick={changeState}
      >
        전체
      </Button>
      <Button
        variant="outlined"
        sx={{ ml: 2, my: 1 }}
        value={5}
        onClick={changeState}
      >
        진행중
      </Button>
      <Button
        variant="outlined"
        sx={{ ml: 2, my: 1 }}
        value={4}
        onClick={changeState}
      >
        모집중
      </Button>
      <Button
        variant="outlined"
        sx={{ ml: 2, my: 1 }}
        value={6}
        onClick={changeState}
      >
        완료
      </Button>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ pl: 0 }} disabled>
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              spacing={3}
            >
              <Grid item xs={2} sx={{ textAlign: "center" }}>
                <Typography variant="subtitle2">공고번호/등록일</Typography>
              </Grid>
              <Grid item xs={1} sx={{ textAlign: "center" }}>
                <Typography variant="subtitle2" gutterBottom>
                  상태
                </Typography>
              </Grid>
              <Grid item xs={3} sx={{ textAlign: "center" }}>
                <Typography variant="subtitle2" gutterBottom>
                  인터뷰공고
                </Typography>
              </Grid>
              <Grid item xs={2} sx={{ textAlign: "center" }}>
                <Typography variant="subtitle2" gutterBottom>
                  인터뷰시간
                </Typography>
              </Grid>
              <Grid item xs={2} sx={{ textAlign: "center" }}>
                <Typography variant="subtitle2" gutterBottom>
                  지원현황
                </Typography>
              </Grid>
              <Grid item xs={1} sx={{ textAlign: "center" }}>
                <Typography variant="subtitle2" gutterBottom>
                  버튼
                </Typography>
              </Grid>
            </Grid>
          </ListItemButton>
        </ListItem>
        <Divider />
        {interviewList.map((interview) => (
          <div className="list-item" key={interview.id}>
            <ListItem disablePadding>
              <ListItemButton sx={{ pl: 0, pt: 2 }}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  spacing={3}
                >
                  <Grid item xs={2} sx={{ textAlign: "center" }}>
                    <Typography variant="subtitle2">{interview.id}</Typography>
                    <Typography variant="caption">
                      {interview.apply_start_time}
                    </Typography>
                  </Grid>
                  <Grid item xs={1} sx={{ textAlign: "center" }}>
                    <StateTag state={interview.interview_state} />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1" gutterBottom>
                      {interview.title}
                    </Typography>
                    <Typography variant="caption" gutterBottom>
                      {interview.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} sx={{ textAlign: "center" }}>
                    {interview.interviewTimeDetailResList.map((time, index) => (
                      <Typography key={index} variant="subtitle2" gutterBottom>
                        {time.interview_start_time}
                      </Typography>
                    ))}
                  </Grid>
                  {interview.interview_state === 4 && (
                    <Grid item xs={2} sx={{ textAlign: "center" }}>
                      {interview.interviewTimeDetailResList.map(
                        (time, index) => (
                          <Typography
                            key={index}
                            variant="subtitle2"
                            gutterBottom
                            onClick={(e) =>
                              goManageAnswerer(e, interview, index)
                            }
                          >
                            지원자 : {time.wait_applicant_count} / 합격 :{" "}
                            {time.apply_applicant_count}
                          </Typography>
                        )
                      )}
                    </Grid>
                  )}
                  {interview.interview_state === 5 && (
                    <Grid item xs={2} sx={{ textAlign: "center" }}>
                      {interview.interviewTimeDetailResList.map(
                        (time, index) => (
                          <Typography
                            key={index}
                            variant="subtitle2"
                            gutterBottom
                            onClick={(e) =>
                              goManageAnswerer(e, interview, index)
                            }
                          >
                            참가자 : {time.apply_applicant_count}
                          </Typography>
                        )
                      )}
                    </Grid>
                  )}
                  {interview.interview_state === 6 && (
                    <Grid item xs={2} sx={{ textAlign: "center" }}></Grid>
                  )}
                  <Grid item xs={1} sx={{ textAlign: "center" }}>
                    {interview.interview_state === 4 && (
                      <div>
                        <Button
                          variant="outlined"
                          sx={{ ml: 2 }}
                          onClick={onClickDeadline}
                          value={interview.id}
                        >
                          마감
                        </Button>
                      </div>
                    )}
                    {interview.interview_state === 5 && (
                      <div>
                        <Button
                          variant="outlined"
                          sx={{ ml: 2 }}
                          onClick={(e) => handlePage(e, interview)}
                          value={interview.id}
                        >
                          진행
                        </Button>
                        <Button
                          variant="outlined"
                          sx={{ ml: 2, mt: 1 }}
                          onClick={onClickEnd}
                          value={interview.id}
                        >
                          완료
                        </Button>
                      </div>
                    )}
                    {interview.interview_state === 6 && (
                      <div>
                        <Button
                          variant="outlined"
                          sx={{ ml: 2 }}
                          onClick={(e) => handlePage(e, interview)}
                          value={interview.id}
                        >
                          결과
                        </Button>
                      </div>
                    )}
                  </Grid>
                </Grid>
              </ListItemButton>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
}
