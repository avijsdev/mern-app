import React, { useState, useEffect } from 'react';

import NewJob from '../NewJob';
import JobList from '../JobList';
import './style.css';
import { getJobByEMail, addNewJob } from '../../utils';
function Employer() {
    const [availJobs, updateAvailJobs] = useState([]);
    const [newJob, setNewJob] = useState(false);
    const handleSubmit = data => {
        addNewJob(data).then(res => {
            updateAvailJobs(prev => {
                prev.push(res);
                return [...prev];
            });
        });
    }
    const handleNewPost = () => {
        setNewJob(prev => !prev);
    }
    useEffect(() => {
        getJobByEMail().then(res => {
            updateAvailJobs(res);
        });
    }, [])
    return (
        <div className="emp-content">
            <div className="post-btn"><button onClick={handleNewPost} className={newJob ? 'small' : ''}>{newJob ? 'X' : 'Post New Job'}</button></div>
            {newJob && <NewJob onSubmit={handleSubmit} />}
            <JobList from="employer" jobs={availJobs} />
        </div>
    )
}
export default Employer;