import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: '',
        password: '',
        name: '',
        mobile: '',
    });
    const [error, setError] = useState({ email: '', password: '', name: '', mobile: '' });

    const handleData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let emailerror = '';
        let passworderror = '';
        let nameerror = '';
        let mobileerror = '';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (data.username.trim() === '') {
            emailerror = 'Email field should be filled';
        } else if (!emailRegex.test(data.username)) {
            emailerror = 'Enter valid Email';
        }

        if (data.password.trim() === '') {
            passworderror = 'Password field should be filled';
        } else if (data.password.length < 5) {
            passworderror = 'Password length should be at least 5 characters';
        }

        if (data.name.trim() === '') {
            nameerror = 'Name field should be filled';
        }

        if (data.mobile.trim() === '') {
            mobileerror = 'Mobile field should be filled';
        } else if (data.mobile.length !== 10) {
            mobileerror = 'Mobile number should be exactly 10 digits';
        }

        setError({ email: emailerror, password: passworderror, name: nameerror, mobile: mobileerror });

        if (emailerror === '' && passworderror === '' && nameerror === '' && mobileerror === '') {
            fetch('https://cipherschoolassignment-0jto.onrender.com/register', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((info) => info.json())
                .then((data) => {
                    alert(data.message);
                    setData({ username: '', password: '', name: '', mobile: '' });
                    navigate('/');
                })
                .catch((error) => {
                    alert(error.message);
                });
        }
    };

    return (
        <div className="container">
            <h2 className="text-center text-primary">Register Form</h2>
            <form className="form w-50 mx-auto" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="username"
                        placeholder="Enter Email"
                        className="form-control"
                        value={data.username}
                        onChange={handleData}
                    />
                    <p className="text-danger">{error.email !== '' ? error.email : ''}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="pass">Password:</label>
                    <input
                        type="password"
                        id="pass"
                        name="password"
                        placeholder="Enter Password"
                        className="form-control"
                        value={data.password}
                        onChange={handleData}
                    />
                    <p className="text-danger">{error.password !== '' ? error.password : ''}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter Name"
                        className="form-control"
                        value={data.name}
                        onChange={handleData}
                    />
                    <p className="text-danger">{error.name !== '' ? error.name : ''}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="mobile">Mobile:</label>
                    <input
                        type="number"
                        id="mobile"
                        name="mobile"
                        placeholder="Enter Mobile Number"
                        className="form-control"
                        value={data.mobile}
                        onChange={handleData}
                    />
                    <p className="text-danger">{error.mobile !== '' ? error.mobile : ''}</p>
                </div>

                <div className="d-flex justify-content-center mt-3">
                    <button className="btn btn-dark w-75" type="submit">
                        Register
                    </button>
                </div>

                <div className="mt-3 mb-0">
                    <p className="text-center">
                        Already have an account? <Link to="/">Login here</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;
