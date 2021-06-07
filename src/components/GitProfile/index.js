import React from 'react';

import './style.css';

function GitProfile({ projects }) {
    return (
        <div className="projects">
            <p className="title">Your Git Projects</p>
            {projects && projects.map(obj => {
                return (
                    <article className="git-detail" key={obj.html_url}>
                        <p className="name">{obj.name}</p>
                        <p className="desc">{obj.description}</p>
                        <a href={obj.html_url} target="_blank" rel="noopener noreferrer">Navigate to Project Repo</a>
                    </article>
                )
            })}
        </div>
    )
}

export default GitProfile;