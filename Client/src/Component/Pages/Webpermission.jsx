import React, { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import Webcam from "react-webcam";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Webpermission = () => {
    const navigate=useNavigate();
    const webRef=useRef(null);
    const videoRef=useRef(null);
    const dispatch=useDispatch();
    const videoState=useSelector((state)=>{return state.videoStream});
    

    const[cameraAccess,setcameraAccess]=useState(null);

    
    function handlevideo(){
        
        videoRef.current.srcObject = videoState;
    }

    useEffect(()=>{
        navigator.mediaDevices.getUserMedia({ video: true })
        .then(()=>{
            setcameraAccess(true);
        })
        .catch(()=>{
            setcameraAccess(false);
        })
    },[])
  return (
    <div>
        <Navbar type={"Test Environment"}/>
                <div className="d-flex justify-content-center">
                <div className='w-50 bg-warning card p-2 mt-2 '>
                        <h2>Important Notice: Camera Access Required</h2>
                        <p>To proceed with the exam, you must allow access to your webcam. The platform requires 
                            your camera to be enabled for monitoring purposes throughout the test. Please follow these instructions:</p>
                        <ol>
                            <li><strong>Grant Camera Permission:</strong> If prompted, please allow camera access in your browser settings.</li>
                            <li><strong>Ensure Proper Functionality:</strong> Make sure your camera is working correctly before starting the test.</li>
                            <li><strong>Test Environment:</strong> You will not be able to start the exam unless camera access is granted.</li>                        
                        </ol>
                        <p>If you encounter any issues enabling your camera, please contact support for assistance.</p>

                </div>
                </div>

                <div className='d-flex justify-content-center mt-3'>
                        <div>
                            {
                                <Webcam ref={webRef} width={"250px"}/>
                            }
                        </div>
                        

                </div>
                <div className='d-flex justify-content-center'>
                       
                        <div>
                        {
                            (!cameraAccess)? <button className='btn btn-danger w-100'>Allow Webcam Access</button>
                            : <button className='btn btn-success w-100' >Webcam Access Successful </button>
                            }
                        </div>

                </div>

                <div className='container mx-auto m-5'>
                <button className=" btn btn-primary w-100" disabled={!cameraAccess}  onClick={()=>{
            navigate('/test')
        }}>Start Test</button>
                </div>
           
            
            

        
        
        
    </div>
  )
}

export default Webpermission