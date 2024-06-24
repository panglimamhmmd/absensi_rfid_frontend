import React, { useEffect } from 'react';
import NewLayout from './NewLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';
import ListRekap from '../components/ListRekap';

const Rekapitulasi = () => {
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
    }, [isError, user, navigate]);
    return (
        <NewLayout>
            <ListRekap />
        </NewLayout>
    );
};

export default Rekapitulasi;
