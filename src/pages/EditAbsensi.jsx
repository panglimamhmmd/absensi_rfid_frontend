import React, { useEffect } from 'react';
import Layout from './Layout';
import NewLayout from './NewLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';
import FormEditAbsensi from '../components/FormEditAbsensi';

const EditAbsensi = () => {
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
            <FormEditAbsensi />
        </NewLayout>
    );
};

export default EditAbsensi;
