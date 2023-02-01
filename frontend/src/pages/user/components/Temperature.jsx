import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
// import { styled } from '@mui/material/styles';
// import { blue, yellow } from "@mui/material/colors";

const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 30,
    label: `첫 온도 30°C`,
  },
  {
    value: 100,
    label: '100°C',
  },
];


// 나중에 정보 불러오고 수정하기
const mytemp = 45.2
// if (mytemp > 30) {
//   color = yellow[600]
// } else {
//   color = blue[600]
// }

function valuetext(value) {
  return `${value}°C`;
}

export default function DiscreteSliderMarks() {

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Custom marks"
        defaultValue={mytemp}
        getAriaValueText={valuetext}
        valueLabelDisplay="on"
        marks={marks}
        disabled={true}
      />
    </Box>
  );
}
