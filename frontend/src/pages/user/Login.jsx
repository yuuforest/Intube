import React from 'react'
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux'
import { setUser } from 'store/counter/counterSlice'
import getUser from "json/user.json"

export default function Login() {
    const dispatch = useDispatch()

  return (
    <div>  
        <h1>login</h1>      
        <Button variant="outlined" onClick={() => dispatch(setUser(getUser))}>login</Button>'
    </div>
  )
}
