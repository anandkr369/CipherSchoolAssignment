import React, { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import emailjs from '@emailjs/browser';
import './TestArea.css';

const TestArea = () => {
    const [mcqs, setMcqs] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [date, setDate] = useState("");
    const [score, setScore] = useState(0);

    const state = useSelector((state) => state);
    const navigate = useNavigate();
    const form = useRef();

    useEffect(() => {
        fetch('https://cipherschoolassignment-0jto.onrender.com/mcqs', {
            method: "GET",
            headers: {
                "Authorization": state.token,
                "Content-Type": "application/json"
            }
        })
        .then((res) => res.json())
        .then((data) => {
            if (data && data.mcqs) {
                setMcqs(data.mcqs);
            } else {
                alert("No questions found.");
            }
        })
        .catch(() => {
            alert("Something went wrong. Please try again.");
        });
    }, [state.token]);

    const handleOptionChange = (questionIndex, option) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionIndex]: option
        });
    };

    const handleSubmit = () => {
        if (window.confirm("Do you want to Submit the Test?")) {
            let testScore = 0;
            mcqs.forEach((mcq, index) => {
                if (selectedAnswers[index] === mcq.correctAnswer) {
                    testScore += 1;
                }
            });

            const today = new Date();
            const todayDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
            setDate(todayDate);
            setScore(testScore);

            form.current.elements.name.value = state.name;
            form.current.elements.score.value = testScore;
            form.current.elements.date.value = todayDate;
            form.current.elements.email.value = state.email;

            const data = {
                email: state.email,
                name: state.name,
                score: testScore,
                date: todayDate
            };

            emailjs.sendForm('service_am5v4um', 'template_77bnwgj', form.current, 'NPPkHdO55CWfC_R2-')
            .then(() => {
                console.log('Email sent successfully');
            })
            .catch((error) => {
                console.error('Email failed to send', error);
            });

            fetch("https://cipherschoolassignment-0jto.onrender.com/save-score", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((res) => res.json())
            .then(() => {
                navigate('/complete');
            })
            .catch(() => {
                alert("Something went wrong");
            });
        }
    };

    const resetOptionForQuestion = (questionIndex) => {
        const newSelectedAnswers = { ...selectedAnswers };
        delete newSelectedAnswers[questionIndex];
        setSelectedAnswers(newSelectedAnswers);

        document.getElementsByName(`question${questionIndex}`).forEach(radio => {
            radio.checked = false;
        });
    };

    return (
        <div className="test-area">
            <Navbar type={"Test Interface"} />
            
            <div className='questions-container'>
                {mcqs.map((mcq, index) => (
                    <div key={index} className='question-card'>
                        <h4>{index + 1}. {mcq.question}</h4>
                        <ul className="options-list">
                            {mcq.options.map((option, i) => (
                                <li key={i} className='option-item'>
                                    <input
                                        type="radio"
                                        name={`question${index}`}
                                        value={option}
                                        id={`q${index}_option${i}`}
                                        onChange={() => handleOptionChange(index, option)}
                                    />
                                    <label htmlFor={`q${index}_option${i}`} className='option-label'>
                                        {option}
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => resetOptionForQuestion(index)} className="reset-button">Reset</button>
                    </div>
                ))}
            </div>

            <div className='submit-container'>
                <button onClick={handleSubmit} className="submit-button">Submit</button>
            </div>

            <div className='webcam-container'>
                <Webcam className='webcam' />
            </div>

            <form ref={form} className='hidden-form'>
                <input type="text" name='name' readOnly />
                <input type="text" name='score' readOnly />
                <input type='text' name="date" readOnly />
                <input type='text' name='email' readOnly />
            </form>
        </div>
    );
};

export default TestArea;
