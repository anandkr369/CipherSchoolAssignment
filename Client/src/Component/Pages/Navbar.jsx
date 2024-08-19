import React, { useState } from 'react'
import "./Pages.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
const Navbar = ({type}) => {
    const[open,setopen]=useState(false);
    const Navigate=useNavigate();
    const state=useSelector((state)=>{return state})
    const dispatch=useDispatch();

  return (
    <div>
        <nav className='nav'>
            <div className='image'>
                <img src="https://www.impunjab.org/wp-content/uploads/2022/11/cypher-schools.png" alt="not found" />
            </div>
            <div className='text-danger'><h3>{type}</h3></div>
        
                <div>
                <div className='menu' onClick={()=>{setopen(!open)}}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                </div>

        </nav>
        <div className={(open)?"menu-options open":"menu-options"}>
            <ul>
                <li><p>Email: {state.email}</p></li>
                <li><p>Name : {state.name}</p></li>
                <li><button className='btn btn-outline-danger w-100 logout' onClick={()=>{Navigate('/'); dispatch({type:"token",payload:{token:""}})}}>Logout</button></li>
            </ul>

        </div>
    </div>
  )
}

export default Navbar