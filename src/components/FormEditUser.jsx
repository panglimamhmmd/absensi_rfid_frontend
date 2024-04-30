import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import dotenv from 'dotenv';
dotenv.config();

const FormEditUser = () => {
    const [name, setName] = useState('');
    const [noKartu, setNoKartu] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [role, setRole] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getUserById = async () => {
            try {
                const response = await axios.get(
                    `http://${process.env.SERVER_ADDRESS}:${process.env.SERVER_PORT}/users/${id}`
                );
                setName(response.data.name);
                setEmail(response.data.email);
                setRole(response.data.role);
                setNoKartu(response.data.nokartu);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getUserById();
    }, [id]);

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(
                `http://${process.env.SERVER_ADDRESS}:${process.env.SERVER_PORT}/users/${id}`,
                {
                    name: name,
                    email: email,
                    password: password,
                    confPassword: confPassword,
                    role: role,
                }
            );
            navigate('/users');
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };
    return (
        <div>
            <h1 className="title">Users</h1>
            <h2 className="subtitle">Update User</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updateUser}>
                            <p className="has-text-centered">{msg}</p>
                            <div className="field">
                                <label className="label">No Kartu</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={noKartu}
                                        readOnly
                                        placeholder="Nomor Kartu"
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
                                        Update
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

export default FormEditUser;