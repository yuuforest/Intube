import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AnnouncementPost from "components/announcement/AnnouncementPost";
import QuestionerHeader from "components/questioner/QuestionerHeader";
import "pages/Announcement.css";

export default function Announcement() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log("asdsa");
  };

  return (
    <div className="announcement">
      <QuestionerHeader></QuestionerHeader>
      <Tabs value={value} onChange={handleChange} sx={{ my: 3 }} centered>
        <Tab
          label="종류선택"
          sx={{ width: 1 / 6, fontSize: 24, fontWeight: "bold" }}
        />
        <Tab
          label="공고입력"
          sx={{ width: 1 / 6, fontSize: 24, fontWeight: "bold" }}
        />
        <Tab
          label="질문입력"
          sx={{ width: 1 / 6, fontSize: 24, fontWeight: "bold" }}
        />
        <Tab
          label="등록완료"
          sx={{ width: 1 / 6, fontSize: 24, fontWeight: "bold" }}
        />
      </Tabs>
      <AnnouncementPost
        value={value}
        handleChange={handleChange}
      ></AnnouncementPost>
    </div>
  );
}
