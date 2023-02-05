import React from "react";

export default function AnswererList(props) {
  console.log(props.subscriber);
  return (
    <div>
      입장한 사람
      {props.subscriber.map((sub) => (
        <div>
          {sub.connectionId}
          {sub.nickname}
        </div>
      ))}
    </div>
  );
}
