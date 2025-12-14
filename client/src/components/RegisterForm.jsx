import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/auth/authController';
import InputField from './UI/InputField';

const Register = () => {
    const dispatch = useDispatch();
    const stateData = useSelector(state => state.auth);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(formData));
        
    };

    return (
        <div style={{ maxWidth: 400, margin: 'auto' }}>
            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                <InputField
                    label="Name"
                    type="name"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter username"
                />
               
                <InputField
                    label="Email"
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                />
               
                <InputField
                    label="Role"
                    type="role"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="Enter role"
                />

                <InputField
                    label="Password"
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                />

                <p>{stateData.message}</p>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Register;
