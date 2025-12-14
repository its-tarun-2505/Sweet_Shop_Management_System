import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authController';
import InputField from './UI/InputField';

const Login = () => {
    const dispatch = useDispatch();
    const stateData = useSelector(state => state.auth);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData));
        
    };

    return (
        <div style={{ maxWidth: 400, margin: 'auto' }}>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
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
                    label="Password"
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                />

                <p>{stateData.message}</p>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
