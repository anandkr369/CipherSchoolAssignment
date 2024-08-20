import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({ email: '', password: '' });
    const dispatch = useDispatch();
    const [error, setError] = useState({ email: '', password: '' });

    const handleData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let emailerror = '';
        let passworderror = '';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (data.email.trim() === '') {
            emailerror = 'Email field should be filled';
        } else if (!emailRegex.test(data.email)) {
            emailerror = 'Enter valid Email';
        }

        if (data.password.trim() === '') {
            passworderror = 'Password field should be filled';
        } else if (data.password.length < 5) {
            passworderror = 'Password length should be at least 5 characters';
        }

        setError({ email: emailerror, password: passworderror });

        if (emailerror === '' && passworderror === '') {
            fetch('http://localhost:3000/login', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    alert(data.message);
                    if (data.status) {
                        dispatch({
                            type: 'data',
                            payload: { token: data.token, name: data.data.name, email: data.data.username },
                        });
                        navigate('/home');
                    }
                })
                .catch((err) => {
                    alert(err.error);
                });
        }
    };

    return (
        <div className="container">
            <h2 className="text-center text-primary">Login Form</h2>
            <form className="form w-50 mx-auto" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter Email"
                        className="form-control"
                        value={data.email}
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

                <div className="d-flex justify-content-center mt-3">
                    <button className="btn btn-dark w-75" type="submit">
                        Login
                    </button>
                </div>

                <div className="mt-3 mb-0">
                    <p className="text-center">
                        Don't have an account? <Link to="/register">Register here</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
