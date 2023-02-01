import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment"

export default function CalendarComponent() {
  const [value, onChange] = useState(new Date());

  return (
    <div
    // style={{float:'right', margin:'0 200px'}}
    >
      <Calendar
      id="calendar" onChange={onChange} value={value}
      formatDay={(locale, date) => moment(date).format("DD")}
      navigationLabel={null}
      />
         <div className="text-gray-500 mt-4">
           {moment(value).format("YYYY년 MM월 DD일")} 
         </div>
    </div>
  );
}
