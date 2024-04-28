import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserCard from './UserCard';

const FormAddUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [role, setRole] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    // !
    const [noKartu, setNoKartu] = useState('');

    const saveUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users', {
                name: name,
                uuid: noKartu,
                email: email,
                password: password,
                confPassword: confPassword,
                role: role,
            });
            navigate('/users');
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    useEffect(() => {
        deleteKartu();
        const interval = setInterval(() => {
            getNoKartu();
        }, 2000);

        return () => {
            clearInterval(interval); // Membersihkan interval saat komponen dilepas
        };
    }, []); // Dependensi kosong, artinya efek ini hanya dijalankan sekali saat komponen dipasang

    const getNoKartu = async () => {
        try {
            const response = await axios.get('http://localhost:5000/tmprfid');
            setNoKartu(response.data.msg.nokartu);
            console.log(response);
        } catch (error) {
            // Handle error
            console.log(error.message);
        }
    };

    const deleteKartu = async () => {
        try {
            await axios.delete('http://localhost:5000/tmprfid');
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            <h1 className="title">Users</h1>
            <h2 className="subtitle">Add New User</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={saveUser}>
                            <p className="has-text-centered">{msg}</p>

                            <div className="field">
                                <label className="label">Nomor Kartu</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={noKartu}
                                        readOnly
                                        placeholder="Tempelkan Kartu"
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Name</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        placeholder="Name"
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Email</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="Email"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control">
                                    <input
                                        type="password"
                                        className="input"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="******"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">
                                    Confirm Password
                                </label>
                                <div className="control">
                                    <input
                                        type="password"
                                        className="input"
                                        value={confPassword}
                                        onChange={(e) =>
                                            setConfPassword(e.target.value)
                                        }
                                        placeholder="******"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Role</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select
                                            value={role}
                                            onChange={(e) =>
                                                setRole(e.target.value)
                                            }
                                        >
                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button
                                        type="submit"
                                        className="button is-success"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormAddUser;
