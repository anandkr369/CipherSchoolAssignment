import React, { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import './Webpermission.css';

const Webpermission = () => {
    const navigate = useNavigate();
    const webcamRef = useRef(null);
    const [cameraAccess, setCameraAccess] = useState(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
        .then(() => {
            setCameraAccess(true);
        })
        .catch(() => {
            setCameraAccess(false);
        });
    }, []);

    return (
        <div className="webpermission">
            <Navbar type={"Test Environment"} />
            
            <div className="notice-container">
                <div className="notice-card">
                    <h2>Important Notice: Camera Access Required</h2>
                    <p>
                        To proceed with the exam, you must allow access to your webcam. 
                        The platform requires your camera to be enabled for monitoring purposes 
                        throughout the test. Please follow these instructions:
                    </p>
                    <ol>
                        <li><strong>Grant Camera Permission:</strong> Allow camera access in your browser settings.</li>
                        <li><strong>Ensure Proper Functionality:</strong> Make sure your camera is working correctly before starting the test.</li>
                        <li><strong>Test Environment:</strong> You will not be able to start the exam unless camera access is granted.</li>
                    </ol>
                    <p>If you encounter any issues, please contact support for assistance.</p>
                </div>
            </div>

            <div className="webcam-preview">
                {cameraAccess && <Webcam ref={webcamRef} className="webcam" />}
            </div>

            <div className="access-buttons">
                <button className={`btn ${cameraAccess ? 'btn-success' : 'btn-danger'}`} disabled>
                    {cameraAccess ? 'Webcam Access Successful' : 'Allow Webcam Access'}
                </button>
            </div>

            <div className="start-button-container">
                <button 
                    className="start-button btn-primary" 
                    disabled={!cameraAccess}
                    onClick={() => navigate('/test')}
                >
                    Start Test
                </button>
            </div>
        </div>
    );
};

export default Webpermission;
