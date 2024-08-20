import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = (props) => {
    const token = useSelector((state) => state.token);

    return token !== '' ? <props.component /> : <Navigate to="/" />;
};

export default PrivateRoute;
