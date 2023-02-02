import React from 'react';
import GetList from "../../../json/answerer_list_state2.json";
import MatchListItem from "./MatchListItem"

export default function MatchList(props) {
  const interviewList = GetList.interview_list.filter((x) => x.interview_time.slice(0,10) === props.date)

  return (
    <div>
      {
        interviewList.map((x) => {
          return (
            <MatchListItem interview={x} key={x.id} />
            )
        })
      }
    </div>
  );
}