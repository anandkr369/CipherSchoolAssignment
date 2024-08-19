import React, { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import emailjs from '@emailjs/browser';

const TestArea = () => {
    const [mcqs, setMcqs] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [date,setDate]=useState("");

    const[score,setscore]=useState(0);
    

    const state=useSelector((state)=>{return state})
    
    
    const navigate=useNavigate();
    const form = useRef();

    useEffect(() => {
        console.log(state);
        fetch('http://localhost:3000/mcqs', {
            method: "GET",
            headers: {
                "Authorization":state.token,
                "Content-Type": "application/json"
            }
        })
        .then((res) => res.json())
        .then((data) => {
            if (data && data.mcqs) {
                setMcqs(data.mcqs);  // Ensure data.mcqs exists before setting state
            } else {
                alert("No questions found.");
            }
        })
        .catch((err) => {
            alert("Something went wrong. Please try again.");
        });
    }, []);

    const handleOptionChange = (questionIndex, option) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionIndex]: option
        });
        console.log(selectedAnswers);
    };

    

    function handleSubmit(){
        alert("Do you want to Submit the Test");
        let testscore = 0;
        mcqs.forEach((mcq, index) => {
            if (selectedAnswers[index] === mcq.correctAnswer) {
                testscore += 1;
            }
        });
        

        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1; 
        const day = today.getDate();
        let todayDate=`${day}-${month}-${year}`;
        setDate(todayDate);
        form.current.elements.name.value = state.name;
        form.current.elements.score.value = testscore;  
        form.current.elements.date.value = todayDate;
        form.current.elements.email.value = state.email;

        let data={
            email:state.email,
            name:state.name,
            score:testscore,
            date:todayDate
        }
        emailjs
      .sendForm('service_am5v4um', 'template_77bnwgj', form.current, {
        publicKey: 'NPPkHdO55CWfC_R2-',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );

        fetch("http://localhost:3000/save-score",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data.message);
            navigate('/complete')
        })
        .catch((err)=>{
            alert("something went wrong")
        })
       
    }

    const resetOptionForQuestion = (questionIndex) => {
       
        const newSelectedAnswers = { ...selectedAnswers };
        delete newSelectedAnswers[questionIndex];
        setSelectedAnswers(newSelectedAnswers);

        // Uncheck the radio buttons for the specific question
        document.getElementsByName(`question${questionIndex}`).forEach(radio => {
            radio.checked = false;
        });
    };

    return (
        <div>
            <Navbar type={"Test Interface"}/>
            
            <div className='mt-4'>
            {mcqs.map((mcq, index) => (
                <div key={index} className='container card border border-secondary p-3 w-75 mb-3'>
                    <h4>{index+1}) {mcq.question}</h4>
                    <ul style={{ listStyleType: "none", padding: 0 }} >
                        {mcq.options.map((option, i) => (
                            <li key={i} className='border border-secondary w-50 p-2 rounded mt-1 '>
                                <input
                                    type="radio"
                                    name={`question${index}`}
                                    value={option}
                                    id={`q${index}_option${i}`}
                                    onChange={() => handleOptionChange(index, option)}
                                    
                                />
                                <label htmlFor={`q${index}_option${i}`} style={{ marginLeft: '8px',cursor:'pointer' }} >
                                    {option}
                                </label>
                            </li>
                        ))}
                    </ul>
                    <b
                        onClick={() => resetOptionForQuestion(index)} 
                        className="text-black m-0 p-0" 
                        style={{cursor:"pointer"}}                   >
                        Reset 
                    </b>
                </div>
            ))}
            </div>
            <div className='d-flex justify-content-center'>
            <button onClick={handleSubmit} className="btn btn-primary w-75 mb-3">Submit</button>
            </div>
            <div>
                <Webcam width={"140px"} className='webcam'/>
            </div>

            <div className='form' >
                <form action="" ref={form}>
                <input type="text" name='name' value={state.name} readOnly/>
                <input type="text" name='score' value={score} readOnly/>
                <input type ='text' name="date" value={date} readOnly/>
                <input type='text' name='email' value={state.email} readOnly/>
                </form>
            </div>
            
        </div>
    );
};

export default TestArea;
