import React, { useState } from 'react';

import './style.css';
const MAXS = [10, 20, 30, 40, 50];
const MINS = [10, 20, 30, 40, 50]
function Filter({ onSubmit, onReset }) {
    const techs = ['JAVASCRIPT', 'HTML5', 'CSS3'];
    const [minCosts, setMinCosts] = useState([...MINS]);
    const [maxCosts, setMaxCosts] = useState([...MAXS]);
    const [skills, setSkills] = useState('JAVASCRIPT');
    const [minCost, setMintCost] = useState(10);
    const [maxCost, setMaxtCost] = useState(50);
    const handleSubmit = () => {
        onSubmit({ skills, minCost, maxCost });
    }
    const handleReset = () => {
        setSkills('JAVASCRIPT');
        setMintCost(10);
        setMaxtCost(50)
        onReset();
    }
    const handleChange = (event, type) => {
        let { value } = event.target;
        if (type === 'skill') {
            setSkills(value);
        } else if (type === 'min-cost') {
            setMintCost(value);
            setMaxCosts(() => {
                return MAXS.filter(obj => obj >= value);
            });
        }
        else if (type === "max-cost") {
            setMaxtCost(value);
            setMinCosts(() => {
                return MINS.filter(obj => obj <= value);
            });
        }
    }
    return (
        <div className="main-content">
            <select
                value={skills}
                onChange={e => handleChange(e, 'skill')}
                placeholder="Select any skills"
            >
                {techs.map(name => <option value={name} key={'flt' + name}>{name}</option>)}
            </select>
            <select
                value={minCost}
                onChange={e => handleChange(e, 'min-cost')}
                placeholder="Select Min cost"
                id="min"
            >
                {minCosts.map(name => <option value={name} key={'min' + name}>${name}</option>)}
            </select>
            <select
                value={maxCost}
                onChange={e => handleChange(e, 'max-cost')}
                placeholder="Select Max cost"
                id="max"
            >
                {maxCosts.map(name => <option value={name} key={'max' + name}>${name}</option>)}
            </select>
            <button onClick={handleSubmit}>SUBMIT</button>
            <button onClick={handleReset}>RESET</button>
        </div>
    )
}

export default Filter;