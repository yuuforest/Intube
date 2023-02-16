import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import http from "api/Http";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import EventIcon from "@mui/icons-material/Event";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import EvaluatePerson from "components/questioner/EvaluatePerson";
import VideoFileOutlinedIcon from "@mui/icons-material/VideoFileOutlined";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import Swal from "sweetalert2";

export default function QuestionerNow(props) {
  const position = 1;

  const [timeid, setTimeid] = useState();
  const [questionindex, setQuestionIndex] = useState(0);
  const [timeindex, setTimeindex] = useState(0);

  const [timeCheck, setTimeCheck] = useState("");

  const diff =
    new Date(timeCheck.split(" ")[0] + "T" + timeCheck.split(" ")[1]) -
    new Date();
  console.log(diff);
  const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHour = Math.floor((diff / (1000 * 60 * 60)) % 24);

  // 페이지 이동
  const navigate = useNavigate();
  function handlePage(e, link) {
    const interviewId = interviewList[questionindex].id;
    const interviewTimeId = timeid;

    console.log(link);
    navigate(link, {
      state: {
        timeid,
        interviewList,
        questionindex,
        timeindex,
        interviewId,
        interviewTimeId,
      },
    });
  }

  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [modalOpen, setModalOpen] = useState(false);
  const [evalname, setevalname] = useState(false);
  const [evalemail, setevalemail] = useState(false);
  const [evalpoint, setevalpoint] = useState(0);

  const [isEndInterview, setIsEndInterview] = useState(-1);

  const handleChangeQuestionIndex = (event) => {
    setQuestionIndex(event.target.value);
    setTimeid(
      interviewList[event.target.value].interviewTimeDetailResList[0].id
    );
    setTimeCheck(
      interviewList[event.target.value].interviewTimeDetailResList[0]
        .interview_start_time
    );
    setIsEndInterview(
      interviewList[event.target.value].interviewTimeDetailResList[0]
        .modifyResultState
    );
    setTimeindex(0);
    setevalpoint(interviewList[event.target.value].point);
  };

  const handleChangeTimeindex = (event, id) => {
    setTimeindex(event.target.value);
    setTimeid(
      interviewList[questionindex].interviewTimeDetailResList[
        event.target.value
      ].id
    );
    setTimeCheck(
      interviewList[questionindex].interviewTimeDetailResList[
        event.target.value
      ].interview_start_time
    );
    setIsEndInterview(
      interviewList[questionindex].interviewTimeDetailResList[
        event.target.value
      ].modifyResultState
    );
    setevalpoint(interviewList[questionindex].point);
  };

  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    getInterviewList();
    getUser();
  }, [questionindex, timeindex, props.value, modalOpen]);
  useEffect(() => {
    getInterviewList();
    interviewList.forEach((interview, index) => {
      if (interview.id === props.selectId) {
        setQuestionIndex(index);
        setTimeid(
          interviewList[index].interviewTimeDetailResList[props.selectTimeIndex]
            .id
        );
        setTimeCheck(
          interviewList[index].interviewTimeDetailResList[props.selectTimeIndex]
            .id
        );
        setIsEndInterview(
          interviewList[index].interviewTimeDetailResList[props.selectTimeIndex]
            .modifyResultState
        );
        setTimeindex(props.selectTimeIndex);
        setevalpoint(interviewList[index].point);
      }
    });
  }, [props.selectTimeIndex, props.selectId]);
  const [userInfo, setUserInfo] = useState([]);
  const getUser = () => {
    http
      .get("/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        console.log("userInfo", response.data);
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getInterviewList = () => {
    http
      .post(
        "/user/interviewer?page=0",
        JSON.stringify({ interview_state: 5, word: "" }),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        console.log("interview", response.data.content);
        setInterviewList(response.data.content);

        setTimeid(
          response.data.content[questionindex].interviewTimeDetailResList[
            timeindex
          ].id
        );
        setTimeCheck(
          response.data.content[questionindex].interviewTimeDetailResList[
            timeindex
          ].interview_start_time
        );
        setIsEndInterview(
          response.data.content[questionindex].interviewTimeDetailResList[
            timeindex
          ].modifyResultState
        );
        getAnswererList(
          response.data.content[questionindex].interviewTimeDetailResList[
            timeindex
          ].id
        );
        setevalpoint(response.data.content[questionindex].point);
      })
      .catch((error) => {
        // console.error(error);
      });
  };

  const [AnsewererList, setAnsewererList] = useState([]);

  const getAnswererList = (id) => {
    http
      .get("/user/interviewer/" + id + "/manage-applicant", {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setAnsewererList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const endInterview = () => {
    Swal.fire({
      title: "인터뷰를 마감하시겠습니까?",
      text: "인터뷰를 마감하시면 더이상 결과를 수정할 수 없습니다.",
      footer: "마감인터뷰 : " + interviewList[questionindex].title,
      showDenyButton: true,
      confirmButtonText: "예",
      denyButtonText: "아니오",
      icon: "question",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed && isEndInterview === 1) {
        http
          .put(
            "/interviews/interviewer/finish-interview",
            JSON.stringify({
              interview_id: interviewList[questionindex].id,
              interview_state: 6,
            }),
            {
              headers: {
                "Content-type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          )
          .then((response) => {
            Swal.fire({
              title: "마감완료",
              text: interviewList[questionindex].title + "를 마감했습니다",
              icon: "success",
            });
            props.setValue(0);
            window.location.reload();
          })
          .catch((error) => {
            console.error(error);
            Swal.fire("완료하지 않은 평가가 있습니다", "error");
          });
      } else if (result.isDenied) {
        Swal.fire("네", "", "info");
      } else {
        Swal.fire("아직 진행하지 않은 인터뷰 입니다", "error");
      }
    });
  };

  const onClickEnter = (e) => {
    const interview = interviewList[questionindex];
    const interviewId = interviewList[questionindex].id;
    const interviewTimeId = timeid;
    http
      .post(
        "/conference/start?interviewTimeID=" + interviewTimeId,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        const conferenceID = response.data.conferenceID;
        localStorage.setItem("historyID", response.data.historyID);
        navigate("/conference", {
          state: {
            userInfo,
            interviewId,
            interviewTimeId,
            position,
            conferenceID,
            interview,
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const openModal = (e, name, email, id) => {
    if (isEndInterview === 1) {
      setevalname(name);
      setevalemail(email);
      setModalOpen(true);

      http
        .put(
          "/user/interviewer/accept-applicant?applicant_id=" +
            id +
            "&applicant_state=3",
          {},
          {
            headers: {
              "Content-type": "application/json;charset=UTF-8",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      Swal.fire({
        title: "에러",
        text: "아직 진행하지 않은 인터뷰 입니다.",
        icon: "error",
      });
    }
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // const [isConference, setIsConference]
  const getConferenceId = () => {
    if (isEndInterview === 1) {
      handlePage("", "/questioner/modify");
    } else {
      Swal.fire({
        title: "에러",
        text: "아직 진행하지 않은 인터뷰 입니다.",
        icon: "error",
      });
    }
  };

  return (
    <div hidden={props.value !== 2}>
      {interviewList.length > 0 && (
        <div>
          <FormControl sx={{ mr: 3, background: "white" }}>
            <Select
              value={questionindex}
              onChange={handleChangeQuestionIndex}
              defaultValue={0}
            >
              {interviewList.map((interview, index) => (
                <MenuItem value={index} key={interview.id}>
                  {interview.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ mr: 3, background: "white" }}>
            <Select
              value={timeindex}
              onChange={handleChangeTimeindex}
              defaultValue={0}
            >
              {interviewList[questionindex].interviewTimeDetailResList.map(
                (time, index) => (
                  <MenuItem value={index} key={time.id}>
                    {time.interview_start_time}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<TaskOutlinedIcon />}
            sx={{ backgroundColor: "white", float: "right" }}
            size="large"
            onClick={endInterview}
          >
            인터뷰 마감
          </Button>
          <div className="question-list">
            <List>
              <ListItem>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  spacing={3}
                >
                  <Grid item xs={3} sx={{ textAlign: "center" }}>
                    <Typography variant="subtitle2">지원자</Typography>
                  </Grid>
                  <Grid item xs={3} sx={{ textAlign: "center" }}>
                    <Typography variant="subtitle2" gutterBottom>
                      자기소개
                    </Typography>
                  </Grid>
                  <Grid item xs={3} sx={{ textAlign: "center" }}>
                    <Typography variant="subtitle2" gutterBottom>
                      인터뷰온도
                    </Typography>
                  </Grid>
                  <Grid item xs={3} sx={{ textAlign: "center" }}>
                    <Typography variant="subtitle2" gutterBottom>
                      평가
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <Divider />
              {AnsewererList.map((answerer) => (
                <div className="list-item" key={answerer.id}>
                  <ListItem>
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="center"
                      spacing={3}
                    >
                      <Grid item xs={3} sx={{ textAlign: "left" }}>
                        <Avatar
                          sx={{ height: 64, width: 64, float: "left", mr: 2 }}
                          alt="profile"
                          src={
                            "https://303-intube.s3.ap-northeast-2.amazonaws.com/" +
                            answerer.profile_url
                          }
                        />
                        <Typography variant="subtitle1" sx={{ mt: 1 }}>
                          {answerer.name}
                        </Typography>
                        <Typography variant="subtitle2">
                          {answerer.nickname} / {answerer.birth} /
                          {answerer.gender}
                        </Typography>
                      </Grid>
                      <Grid item xs={3} sx={{ textAlign: "left" }}>
                        <Typography variant="subtitle2" gutterBottom>
                          {answerer.introduction}
                        </Typography>
                      </Grid>
                      <Grid item xs={3} sx={{ textAlign: "center" }}>
                        <Typography variant="subtitle2" gutterBottom>
                          {Math.round(
                            (answerer.temperature + Number.EPSILON) * 100
                          ) / 100}
                          ℃
                        </Typography>
                      </Grid>
                      <Grid item xs={3} sx={{ textAlign: "center" }}>
                        {answerer.applicant_state === 2 ? (
                          <Button
                            variant="outlined"
                            onClick={(e) =>
                              openModal(
                                e,
                                answerer.name,
                                answerer.email,
                                answerer.id
                              )
                            }
                          >
                            평가하기
                          </Button>
                        ) : (
                          <Button variant="contained">평가완료</Button>
                        )}
                      </Grid>
                    </Grid>
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
            {/* {-diffHour > 0 ? (
              <Button variant="contained" sx={{ m: 3 }} size="large">
                {-diffDay}일 {-diffHour}시간 남았음
              </Button>
            ) : (
              <Button
                variant="outlined"
                startIcon={<VideocamOutlinedIcon />}
                sx={{ backgroundColor: "white", m: 3 }}
                size="large"
                onClick={onClickEnter}
              >
                인터뷰 방만들기
              </Button>
            )} */}
            <Button
              variant="outlined"
              startIcon={<VideocamOutlinedIcon />}
              sx={{ backgroundColor: "white", m: 3 }}
              size="large"
              onClick={onClickEnter}
            >
              인터뷰 방만들기
            </Button>
            <Button
              variant="outlined"
              startIcon={<VideoFileOutlinedIcon />}
              sx={{ backgroundColor: "white", m: 3 }}
              size="large"
              onClick={getConferenceId}
            >
              인터뷰 결과 수정
            </Button>
          </div>
        </div>
      )}

      <React.Fragment>
        {/* //header 부분에 텍스트를 입력한다. */}
        <EvaluatePerson
          open={modalOpen}
          close={closeModal}
          header="가제: 답변자님을 평가해주세요🙂🤗(완료버튼을 누르면 되돌릴 수 없습니다!)"
          name={evalname}
          email={evalemail}
          setModalOpen={setModalOpen}
          point={evalpoint}
        >
          {/* // EvalPerson.js <main> {props.children} </main>에 내용이입력된다. 리액트 함수형 모달  */}
          이건 안나오는 부분
        </EvaluatePerson>
      </React.Fragment>
    </div>
  );
}
