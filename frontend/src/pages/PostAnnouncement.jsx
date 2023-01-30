import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import HistoryEduOutlinedIcon from "@mui/icons-material/HistoryEduOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
export default function PostAnnouncement() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange} centered>
      <Tab
        icon={<PlaylistAddCheckOutlinedIcon />}
        label="종류선택"
        sx={{ width: 1 / 6, fontSize: 24, fontWeight: "bold" }}
      />
      <Tab
        icon={<HistoryEduOutlinedIcon />}
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
  );
}
