import React, { useState } from 'react';

import './style.css';

function NewJob({ onSubmit }) {
    const [projectName, setProjectName] = useState('');
    const [projectDesc, setProjectDesc] = useState('');
    const [skills, setSkills] = useState('');
    const [org, setOrg] = useState('');
    const [cost, setCost] = useState(10);
    const handleChange = (event, type)=>{
        let value = event.target.value;
        if (type === 'name') {
            setProjectName(value);
        } else if (type === 'desc') {
            setProjectDesc(value)
        } else if (type === 'skill') {
            setSkills(value)
        } else if (type === 'org') {
            setOrg(value)
        } else if(type==='cost'){
            setCost(value);
        }
    }
    const handleSubmit = () => { onSubmit({ projectName, projectDesc, skills, org, cost }) };
    return (
        <article>
            <form className="new-job">
                Title:<input required type="text" maxLength="16" onChange={e => handleChange(e, 'name')} value={projectName}></input>
                Description: <input required type="textarea" maxLength="300" onChange={e => handleChange(e, 'desc')} value={projectDesc}></input>
                Skills Required: <input required type="text" maxLength="50" onChange={e => handleChange(e, 'skill')} value={skills} ></input>
                Cost(in $ per hour): <input required type="number" maxLength="50" onChange={e => handleChange(e, 'cost')} value={cost} ></input>
                Company:<input required type="text" maxLength="16" onChange={e => handleChange(e, 'org')} value={org}></input>
                <button onClick={handleSubmit}>Post New Job</button>
            </form>
        </article>
    );
}
export default NewJob;