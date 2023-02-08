import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InterpreterModeIcon from "@mui/icons-material/InterpreterMode";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import AnnouncementPost from "components/announcement/AnnouncementPost";

import QuestionerHeader from "components/questioner/QuestionerHeader";

export default function Announcement() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log("asdsa");
  };

  return (
    <div>
      <QuestionerHeader></QuestionerHeader>
      <Tabs value={value} onChange={handleChange} sx={{ mt: 3 }} centered>
        <Tab
          icon={<InterpreterModeIcon />}
          label="종류선택"
          sx={{ width: 1 / 6, fontSize: 24, fontWeight: "bold" }}
        />
        <Tab
          icon={<ContentPasteIcon />}
          label="공고입력"
          sx={{ width: 1 / 6, fontSize: 24, fontWeight: "bold" }}
        />
        <Tab
          icon={<HelpOutlineIcon />}
          label="질문입력"
          sx={{ width: 1 / 6, fontSize: 24, fontWeight: "bold" }}
        />
        <Tab
          icon={<PostAddOutlinedIcon />}
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
