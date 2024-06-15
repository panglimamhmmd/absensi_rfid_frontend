import React, { useEffect } from 'react';
import NewLayout from './NewLayout';
import Userlist from '../components/Userlist';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const Users = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate('/');
        }
        if (user && user.role !== 'admin') {
            navigate('/dashboard');
        }
    }, [isError, user, navigate]);
    return (
        <NewLayout>
            <Userlist />
        </NewLayout>
    );
};

export default Users;
