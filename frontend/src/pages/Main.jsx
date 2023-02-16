import MainInterview from "components/main/MainInterview";
import MainSplash from "components/main/MainSplash";
import React, { useState } from "react";

import Header from "components/common/Header";

export default function Main() {
  const [searchCondition, setSearchCondition] = useState({
    category_name: "",
    word: "",
  });
  const handleChangeWord = (event) => {
    let newCondition = { ...searchCondition };
    newCondition.word = event.target.value;
    setSearchCondition({
      newCondition,
    });
  };
  const handleChangeCategroy = (event) => {
    let newCondition = { ...searchCondition };
    newCondition.category_name = event.target.value;
    setSearchCondition(newCondition);
  };
  return (
    <div className="main">
      <Header handleChangeWord={handleChangeWord}></Header>
      {localStorage.getItem("accessToken") === null ? (
        <MainSplash></MainSplash>
      ) : (
        <MainInterview
          searchCondition={searchCondition}
          handleChangeCategroy={handleChangeCategroy}
        ></MainInterview>
      )}
    </div>
  );
}
