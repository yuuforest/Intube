import React from 'react';
import InterviewListItemDetail from 'components/Interview/InterviewListItemDetail';

export default function MatchListItem(props) {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div>
    <p onClick={handleClickOpen}>{props.interview.interview_start_time.slice(11)}: {props.interview.title}</p>
    {/* <InterviewListItemDetail
     open={open} setOpen={setOpen} interview={props.interview} /> */}
    </div>
  );
}