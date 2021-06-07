import React from "react";
import { useParams, useHistory } from 'react-router-dom';

import './style.css';
import Developer from '../../components/Developer';
import Employer from '../../components/Employer';

function HomeDashboard({ classes }) {
    let { id } = useParams();
    const history = useHistory();
    const userName = sessionStorage.getItem('username');
    const handleLogout = () => {
        sessionStorage.setItem("username", null);
        sessionStorage.setItem('token', null);
        sessionStorage.setItem('userId', null);
        sessionStorage.setItem('email', null);
        sessionStorage.setItem('gitUrl', null);
        history.push('/');
    }
    return (
        <div>
            <header className="title">
                <span>{`Hello ${id} ${userName}!!`}</span>
                <span className="logout" onClick={handleLogout} title="logout">&#10094;</span>
            </header>
            <div className="content">
                {id === 'freelancer' ? <Developer /> : <Employer />}
            </div>
        </div>
    )
}

export default HomeDashboard;
