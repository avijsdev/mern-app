import React, { useState } from 'react';

import './style.css';

function Login({ title, submit, classes }) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        submit(title, { userName, password })
    }
    const handleChange = (event, type) => {
        let value = event.target.value;
        if (type === 'userName') {
            setUserName(value);
        } else if (type === 'password') {
            setPassword(value);
        }
    }
    return (
        <div container className="login">
            <label type="h3" >{`${title} Sign In`}</label>
            <input
                type="text"
                placeholder="Username"
                value={userName}
                onChange={event => handleChange(event, 'userName')} />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={event => handleChange(event, 'password')} />
            <button type="button" onClick={handleSubmit} disabled={userName.length === 0 || password.length === 0}>Sign In</button>
        </div>

    )
}
export default Login;