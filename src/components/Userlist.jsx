import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Userlist = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get(
            `http://${process.env.REACT_APP_SERVER_ADDRESS}:${process.env.REACT_APP_SERVER_PORT}/users`
        );
        setUsers(response.data);
    };

    const deleteUser = async (userId) => {
        await axios.delete(
            `http://${process.env.REACT_APP_SERVER_ADDRESS}:${process.env.REACT_APP_SERVER_PORT}/users/${userId}`
        );
        getUsers();
    };

    function formatDate(isoString) {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const day = date.getDate();
        const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        const month = monthNames[date.getMonth()];
        return `${year}, ${day} ${month}`;
    }

    function capitalizeFirstCharacter(str) {
        if (!str) {
            return str;
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <div className="col-12 col-md-12">
            <div className="card">
                <div className="card-content">
                    <div className="card-body">
                        <div className=" d-flex justify-content-between mx-auto">
                            <div>
                                <h1>Daftar User</h1>
                            </div>

                            <div>
                                <Link
                                    to="/users/add"
                                    className="btn btn-success"
                                >
                                    Add User
                                </Link>
                            </div>
                        </div>

                        <div className="table-responsive">
                            <table className="table table-lg table-hover">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Nama</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Add At</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr key={user.id}>
                                            <td>{index + 1}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                {capitalizeFirstCharacter(
                                                    user.role
                                                )}
                                            </td>

                                            <td>
                                                {formatDate(user.createdAt)}
                                            </td>
                                            <td>
                                                <Link
                                                    to={`/users/edit/${user.uuid}`}
                                                    className="btn btn-primary"
                                                >
                                                    <i className="bi bi-pencil-fill"></i>
                                                </Link>
                                                <Link
                                                    to="#"
                                                    onClick={() => {
                                                        const confirmDelete =
                                                            window.confirm(
                                                                `Apakah Anda yakin ingin menghapus data absensi ${
                                                                    user.name
                                                                        ? user.name
                                                                        : 'user deleted'
                                                                }?`
                                                            );
                                                        if (confirmDelete) {
                                                            deleteUser(
                                                                `${user.uuid}`
                                                            );
                                                        }
                                                    }}
                                                    className="btn btn-danger"
                                                >
                                                    <i className="bi bi-trash-fill"></i>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Userlist;
