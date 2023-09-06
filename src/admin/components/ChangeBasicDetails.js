import React, { useEffect, useState } from 'react';

import { updateBasicProfile } from '../services/AdminService';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../actions/authActions';

const ChangeBasicDetails = (props) => {
    const { user } = props;
    const token = useSelector((state) => state.auth.token);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [errors, setErrors] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setName(user.name || '');
        setEmail(user.email || '');
    }, [user])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name, email
        }
        try {
            const response = await updateBasicProfile(data);
            if (response && response.status === 200) {
                dispatch(login(response.data.data, token));
                window.location.href = '/admin/dashboard';
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.errors);
            }
            // Unauthorized
            else if (error.response && error.response.status === 401) {
                dispatch(logout());
                navigate('/admin')
            }
            else if (error.response && error.response.status === 500) {
                dispatch(logout());
                navigate('/admin')
            }
        }
    }

    return (
        <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Change Profile</h1>
            </div>
            <div className="card">
                <div className="card-body">

                    <form onSubmit={handleSubmit} className="p-5 w-75">

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="name"
                                className="form-control"
                                id="name"
                                defaultValue={name}
                                onChange={(e) => setName(e.target.value)}

                            />
                            {errors.name && <span className='error'>{errors.name}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                defaultValue={email}
                                onChange={(e) => setEmail(e.target.value)}

                            />
                            {errors.email && <span className='error'>{errors.email}</span>}
                        </div>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default ChangeBasicDetails;
