import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

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
                    `http://${process.env.REACT_APP_SERVER_ADDRESS}:${process.env.REACT_APP_SERVER_PORT}/users/${id}`
                );
                setName(response.data.name);
                setEmail(response.data.email);
                setRole(response.data.role);
                setNoKartu(response.data.uuid);
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
                `http://${process.env.REACT_APP_SERVER_ADDRESS}:${process.env.REACT_APP_SERVER_PORT}/users/${id}`,
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
    const reset = () => {};
    return (
        <div className="col-md-6 col-12">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Edit User: {name}</h3>
                    <p className="text-danger">{msg}</p>
                </div>
                <div className="card-content">
                    <div className="card-body">
                        <form
                            className="form form-horizontal"
                            onSubmit={updateUser}
                        >
                            <div className="form-body">
                                <div className="row">
                                    <div className="col-md-4">
                                        <label htmlFor="first-name-horizontal">
                                            No Kartu
                                        </label>
                                    </div>
                                    <div className="col-md-8 form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={noKartu}
                                            placeholder="Silahkan Tap Kartu RFID"
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="first-name-horizontal">
                                            Nama
                                        </label>
                                    </div>
                                    <div className="col-md-8 form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            placeholder="Nama"
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="email-horizontal">
                                            Email
                                        </label>
                                    </div>
                                    <div className="col-md-8 form-group">
                                        <input
                                            type="email"
                                            id="email-horizontal"
                                            className="form-control"
                                            name="email-id"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="Status">Role</label>
                                    </div>

                                    <div className="col-md-8 form-group">
                                        <fieldset className="form-group">
                                            <select
                                                className="form-select"
                                                value={role}
                                                onChange={(e) =>
                                                    setRole(e.target.value)
                                                }
                                            >
                                                <option
                                                    selected
                                                    disabled
                                                    hidden
                                                    value=""
                                                >
                                                    User Role
                                                </option>
                                                <option value={'admin'}>
                                                    Admin
                                                </option>
                                                <option value={'user'}>
                                                    User
                                                </option>
                                            </select>
                                        </fieldset>
                                    </div>
                                    <hr />
                                    <div className="col-md-4">
                                        <label>Password</label>
                                    </div>
                                    <div className="col-md-8 form-group">
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label>Confirm Password</label>
                                    </div>
                                    <div className="col-md-8 form-group">
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            placeholder="Password"
                                            value={confPassword}
                                            onChange={(e) =>
                                                setConfPassword(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="col-sm-12 d-flex justify-content-end">
                                        <button
                                            type="submit"
                                            className="btn btn-primary me-1 mb-1"
                                        >
                                            Submit
                                        </button>
                                        <button
                                            type="reset"
                                            onClick={reset}
                                            className="btn btn-light-secondary me-1 mb-1"
                                        >
                                            Reset
                                        </button>
                                    </div>
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
