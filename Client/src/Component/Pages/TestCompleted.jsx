import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import './TestCompleted.css';

const TestCompleted = () => {
    const [score, setScore] = useState(2);

    useEffect(() => {
        fetch('https://cipherschoolassignment-0jto.onrender.com/getScore', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setScore(data.score);
            console.log('Score fetched:', score); // Log the fetched score
        })
        .catch(error => {
            console.error('Error fetching score:', error);
        });
    }, []);

    return (
        <div className="test-completed">
            <Navbar />
            <div className="complete-message-container">
                <h1 className="complete-title">Test Completed Successfully 🏆🔢🎉</h1>
                <div className="card complete-card">
                    <h3 className="complete-text">Test submitted successfully! Thank you for completing the test.</h3>
                    {score !== null ? (
                        <h3 className="complete-text">Your score: 2 {score}</h3>
                    ) : (
                        <h3 className="complete-text">Calculating your score...</h3>
                    )}
                    <h3 className="complete-text">Your score will also be sent to your email shortly.</h3>
                </div>
            </div>
        </div>
    );
};

export default TestCompleted;
