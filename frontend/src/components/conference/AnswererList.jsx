import React from "react";
import getAnswererList from "json/answerer_list.json";

export default function AnswererList() {
  const newList = getAnswererList.question_list.map((item) => {
    return item;
  });
  return <div>AnswererList</div>;
}
