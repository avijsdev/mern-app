import React from "react";
import { useHistory } from 'react-router-dom';

import './style.css';
import LoginForm from '../../components/login';
import { login } from '../../utils';

function Dashboard({ classes }) {
    const history = useHistory();
    const handleSubmit = (type, { userName, password }) => {
        login(userName, password, history);
    }
    return (
        <div className="container">
            <div className="paper">
                <div className="item">
                    <LoginForm title="Freelancer" submit={handleSubmit} />
                </div>
                <span>------ or ------</span>
                <div className="item">
                    <LoginForm title="Employer" submit={handleSubmit} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
