import React from 'react'
import TextField from '@mui/material/TextField';

export default function AnswerWrite(props) {
  const [name, setName] = React.useState('');
  const handleChange = (event) => {
    setName(event.target.value);
    console.log(name)
  };

  return (
    <TextField
    id="outlined-multiline-static"
    multiline
    rows={10}
    fullWidth
    value={name}
    onChange={handleChange}
  />
  )
}
