import React from 'react';
import MazerLayout from './NewLayout';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MonthlyList from '../components/MonthlyList';
import { getMe } from '../features/authSlice';

const MonthlyRekap = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate('/');
        }
    }, [isError, navigate]);
    return (
        <MazerLayout>
            <MonthlyList />
        </MazerLayout>
    );
};

export default MonthlyRekap;
