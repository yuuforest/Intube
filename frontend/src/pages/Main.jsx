import MainInterview from "components/main/MainInterview";
import MainSplash from "components/main/MainSplash";
import React from "react";

import Header from "components/common/Header";

export default function Main() {
  const [searchCondition, setSearchCondition] = React.useState({
    category_name: "",
    word: "",
  });
  const handleChangeWord = (event) => {
    console.log(event.target.value);
    setSearchCondition({
      category_name: " ",
      word: event.target.value,
    });
  };
  return (
    <div className="main">
      <Header handleChangeWord={handleChangeWord}></Header>
      {localStorage.getItem("accessToken") === null ? (
        <MainSplash></MainSplash>
      ) : (
        <MainInterview searchCondition={searchCondition}></MainInterview>
      )}
    </div>
  );
}
