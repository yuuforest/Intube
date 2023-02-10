import React from "react";
// import InterviewListItemDetail from "components/main/interview/MainInterviewListItemDetail";
import AnswererListItemDetail from '../AnswererListItemDetail'

export default function MatchListItem(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <p onClick={handleClickOpen}>
        {props.interview.interviewTimeRes.interview_start_time.slice(11)}: {props.interview.title}
      </p>
      <AnswererListItemDetail
        open={open}
        setOpen={setOpen}
        interview={props.interview}
      />

      {/* {
        props.position === 1
        ?
        <AnswererListItemDetail
        open={open}
        setOpen={setOpen}
        interview={props.interview}
        />
        :
        // 이 부분 질문자 관련된 modal로 수정하기!
        <AnswererListItemDetail
          open={open}
          setOpen={setOpen}
          interview={props.interview}
        />
      } */}
    </div>
  );
}
