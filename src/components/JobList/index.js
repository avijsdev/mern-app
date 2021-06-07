import React from 'react';
import './style.css';

function JobList({ jobs, onApply, from, handleApplicantDetails }) {
    let availJobs = jobs ? jobs : [];
    const userId = sessionStorage.getItem('userId');
    return (
        <div className="job-list">
            {availJobs.length === 0 && from === 'developer' && <p>No Job available for the filter criteria, Please try differnt criteria.</p>}
            {availJobs.length === 0 && from === 'employer' && <p>No any previous Job posted by you, Please click "Post New Job" to post a Job </p>}
            {availJobs.map(job => {
                return (
                    <article key={job.id}>
                        <div className="header">
                            <span>{job.title}</span>
                            {from === 'developer' && <button
                                disabled={job.applicants.includes(userId)}
                                onClick={() => onApply(job.id, userId)} >{job.applicants.includes(userId) ? 'Applied' : 'Apply'}</button>}
                            {from === 'employer' && <button onClick={() => handleApplicantDetails(job.id)}>{job.applicants.length}</button>}
                        </div>
                        <p>{job.description}</p>
                        <p>Skills Required: <span>{job.skills}</span></p>
                        <div className="details">
                            <span>Date:{job.date}</span>
                            <span>Cost: ${job.cost}/Hour</span>
                            <span>Status:{job.status || 'NA'}</span>
                            <span>By:{job.owner}</span>
                        </div>
                    </article>
                )
            })}
        </div>
    )
}
export default JobList;