import React from "react";

export default function AnswererList(props) {
  console.log(props.subscriber);
  return (
    <div>
      입장한 사람
      {props.subscriber.map((sub, index) => (
        <div key={index}>
          {sub.connectionId}
          {sub.nickname}
        </div>
      ))}
    </div>
  );
}
