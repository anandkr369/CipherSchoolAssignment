import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate=useNavigate();

    const [data,setData]=useState({
        username:"",
        password:"",
        name:"",
        mobile:""
    })
    const [error,setError]=useState({email:"",password:"",name:"",mobile:""});
    function handleData(e){
        setData({...data,[e.target.name]:e.target.value});
    }
    function handleSubmit(e){
        e.preventDefault();
        let emailerror="";
        let passworderror="";
        let nameerror="";
        let mobileerror="";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(data.username.trim()==""){
            emailerror="email field should be filled"
        }else if(!emailRegex.test(data.username)){
            emailerror="Enter valid Email"
        }

        if(data.password.trim()==""){
            passworderror="password field should be filled"
        }else if(data.password.length<5){
            passworderror="Password length should atleast be 5 character"
        }

        if(data.name.trim()==""){
            nameerror="Name field should be filled"
        }

        if(data.mobile.trim()==""){
            mobileerror="Mobile field should be filled"
        }else if(data.mobile.length!=10){
            mobileerror="Mobile number should be exactly 10 number"
        }

        setError({email:emailerror,password:passworderror,name:nameerror,mobile:mobileerror});

        if(emailerror==""&&passworderror==""&&nameerror==""&&mobileerror==""){
            fetch('http://localhost:3000/register',{
                method:"POST",
                body:JSON.stringify(data),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then((info)=>info.json())
            .then((data)=>{
                alert(data.message);
                setData({username:"",password:"",name:"",mobile:""});
                navigate('/')
            })
            .catch((error)=>{
                alert(error.message)
                
            })
        }
    }

  return (
    <div className='container'>
        <h2 className='text-center text-primary'>Register Form </h2>
        <form className='w-25 mx-auto border border-primary p-3 rounded' onSubmit={handleSubmit}>
            <div className='form-group'>
            <label htmlFor="email" className='mb-1'>Email: </label>
            <input type="email" id='email' name='username' placeholder='Enter Email' className='form-control' value={data.username} onChange={handleData}/>
            <p className='text-danger'>{(error.email!=="")?error.email:""}</p>
            </div>

            <div className='form-group'>
            <label htmlFor="pass" className='mb-1'>Password: </label>
            <input type="password" id='pass' name='password' placeholder='Enter Password' className='form-control'value={data.password} onChange={handleData} />
            <p className='text-danger'>{(error.password!=="")?error.password:""}</p>
            </div>

            <div className='form-group'>
            <label htmlFor="name" className='mb-1'>Name: </label>
            <input type="text" id='name' name='name' placeholder='Enter Name' className='form-control' value={data.name} onChange={handleData}/>
            <p className='text-danger'>{(error.name!=="")?error.name:""}</p>
            </div>

            <div className='form-group'>
            <label htmlFor="mobile" className='mb-1'>Mobile: </label>
            <input type="number" id='mobile' name='mobile' placeholder='Enter Mobile' className='form-control'value={data.mobile} onChange={handleData} />
            <p className='text-danger'>{(error.mobile!=="")?error.mobile:""}</p>
            </div>
            <div className='d-flex justify-content-center mt-3'>

            <button className='btn btn-outline-primary w-75 ' type='submit'>Register</button>
            </div>
            <div className='mt-3 mb-0'>
                <p className='text-center'>Already have an account?<Link to='/'>Login here </Link></p>
            </div>
        </form>
    </div>
  )
}

export default Register