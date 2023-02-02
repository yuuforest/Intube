import React from "react";
import Box from "@mui/material/Box";

export default function nowQuestion(props) {
  console.log(props);
  return (
    <Box
      sx={{
        border: "1px solid grey",
        height: "50px",
        fontSize: 25,
      }}
    >
      <div>[질문] {props.state.question}</div>
    </Box>
  );
}
