import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import Spinner from '../../Components/Spinner/Spinner'
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, isLoading } = useContext(AuthContext);
    const location = useLocation();


    if (isLoading) {
        return <Spinner></Spinner>
    }
    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;