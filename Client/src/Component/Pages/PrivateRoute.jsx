
import React from 'react'
import { Navigate } from 'react-router-dom';
import {useSelector} from "react-redux";

const PrivateRoute = (props) => {
    const state=useSelector((state)=>{return state.token});

  return (
    state!==""?
    <props.component/>:<Navigate to='/'/>
  )
}

export default PrivateRoute