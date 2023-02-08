import React from 'react';
// import GetList from "../../../json/answerer_list_state2.json";
import MatchListItem from "./MatchListItem"

export default function MatchList(props) {
  const interviewList = props.matchInfo

  return (
    <div>
      {
        interviewList.map((x) => {
          return (
            <MatchListItem position={props.position} interview={x} key={x.id} />
            )
        })
      }
    </div>
  );
}