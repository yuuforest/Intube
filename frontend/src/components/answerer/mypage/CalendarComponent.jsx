import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment"
// import GetList from "../../../json/answerer_list_state2.json";
import './CalendarComponent.css'
import MatchList from './MatchList.jsx';

export default function CalendarComponent(props) {
  const [value, onChange] = useState(new Date());
  const interviewList = props.calendarInfo
  console.log('check', interviewList[0].interviewTimeRes.interview_start_time.slice(0,10))

  return (
    <div
    // style={{float:'right', margin:'0 200px'}}
    >
      <Calendar
      id="calendar"
      onChange={onChange}
      value={value}
      formatDay={(locale, date) => moment(date).format("DD")}
      navigationLabel={null}
      showNeighboringMonth={false}
      tileClassName={({ date, view }) => {
        if (interviewList.find((x) => 
        x.interviewTimeRes.interview_start_time.slice(0,10) === moment(date).format("YYYY-MM-DD"))) {
          return "highlight";
        }
      }}
      />
         <div>
           <p>{moment(value).format("YYYY년 MM월 DD일")}</p>
           <MatchList 
           position={props.position}
           matchInfo={interviewList.filter(
            (x) => x.interviewTimeRes.interview_start_time.slice(0,10) === moment(value).format("YYYY-MM-DD"))} 
           />
         </div>
    </div>
  );
}
