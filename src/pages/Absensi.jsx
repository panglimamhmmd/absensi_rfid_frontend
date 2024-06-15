import React, { useEffect } from 'react';
import NewLayout from './NewLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';
import AbsensiList from '../components/AbsensiList';
const Absensi = () => {
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
        <NewLayout>
            <AbsensiList />
        </NewLayout>
    );
};

export default Absensi;
