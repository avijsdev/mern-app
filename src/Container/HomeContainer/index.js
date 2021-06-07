import React from "react";
import { useParams} from 'react-router-dom';

import './style.css';
import Developer from '../../components/Developer';
import Employer from '../../components/Employer';

function HomeDashboard({ classes }) {
    let { id } = useParams();
    const userName = sessionStorage.getItem('username');
    return (
        <div>
            <p className="title">{`Hello ${id} ${userName}!!`}</p>
            <div className="content">
                {id === 'freelancer' ? <Developer /> : <Employer />}
            </div>
        </div>
    )
}

export default HomeDashboard;
