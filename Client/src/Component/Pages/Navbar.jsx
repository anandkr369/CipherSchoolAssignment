import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Pages.css';

const Navbar = ({ type }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    return (
        <div>
            <nav className="nav">
                <div className="image">
                    <img src="https://www.impunjab.org/wp-content/uploads/2022/11/cypher-schools.png" alt="Logo" />
                </div>
                <div>
                    <h3>{type}</h3>
                </div>
                <div className="menu" onClick={() => setOpen(!open)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </nav>
            <div className={open ? 'menu-options open' : 'menu-options'}>
                <ul>
                    <li>
                        <p>Email: {state.email}</p>
                    </li>
                    <li>
                        <p>Name: {state.name}</p>
                    </li>
                    <li>
                        <button
                            className="btn btn-danger logout"
                            onClick={() => {
                                navigate('/');
                                dispatch({ type: 'token', payload: { token: '' } });
                            }}
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
