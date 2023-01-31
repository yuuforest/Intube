import React from 'react'
import Box from '@mui/material/Box';


export default function nowQuestion(props) {
    console.log(props)
  return (
    <Box sx={{ p: 2, border: '1px solid grey', width:"80%" }}>
    <h1>
    {props.state.question}
    </h1>
  </Box>
  )
}
