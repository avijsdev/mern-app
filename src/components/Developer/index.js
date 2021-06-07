import React, { useState, useEffect } from 'react';

import './style.css';
import DevFilter from '../Filter';
import JobLists from '../JobList';
import GitProfile from '../GitProfile';
import { getAllJobs, applyJob, getUserGitProfile } from '../../utils';

function Developer() {
    const [jobs, setJobs] = useState([]);
    const [projects, setProjects] = useState([]);
    const handleSubmit = ({ skills, minCost, maxCost }) => {
        let filtJobs = jobs.filter(obj => {
            return obj.skills.includes(skills) && obj.cost >= minCost && obj.cost <= maxCost;
        });
        setJobs(filtJobs);
    }
    const handleApply = (jobId, UserId) => {
        applyJob(jobId, UserId).then(res => {
            setJobs(prev => {
                prev.filter(obj => obj.id === jobId)[0].applicants.push(UserId);
                return [...prev];
            })
        });
    }
    const reset = () => {
        getAllJobs().then(res => {
            setJobs(res);
        });
    }
    useEffect(() => {
        reset();
        getUserGitProfile().then(res=>{
            setProjects(res);
        })
    }, [])
    return (
        <React.Fragment>
            <div className="left">
                <DevFilter onSubmit={handleSubmit} onReset={reset} />
                <JobLists jobs={jobs} onApply={handleApply} from="developer" />
            </div>
            <div className="right">
                <GitProfile projects={projects}/>
            </div>
        </React.Fragment>
    )
}
export default Developer;