import { APPLY_JOB_API, BASE_API_URI, JOB_API, JOB_BY_EMAIL_API, LOGIN_API } from './constant';


const headers = {
    'Content-Type': 'application/json',
    'Authorization': sessionStorage.getItem('token')
}
export async function login(email, password, history) {
    const url = BASE_API_URI + LOGIN_API;
    const payload = {
        email: email,
        password: password
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (response.status === 200) {
        const { data } = result;
        sessionStorage.setItem("username", data.firstName + ' ' + data.lastName);
        sessionStorage.setItem('token', `Bearer ${data.token}`);
        sessionStorage.setItem('userId', data.id);
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('gitUrl', data.gitUrl);
        if (data.userType === 'freelancer') {
            history.push('/Home/freelancer');
        } else {
            history.push('/Home/employer');
        }
    } else {
        alert('Login Failed');
    }
};

export async function getAllJobs() {
    const url = BASE_API_URI + JOB_API;
    const response = await fetch(url, {
        method: 'GET',
        headers
    });
    const result = await response.json()
    if (response.status === 200) {
        return result.data;
    } else {
        console.log(`API error occured for ${url}`);
        return [];
    }
}

export async function applyJob(jobId, userId) {
    const url = BASE_API_URI + APPLY_JOB_API;
    const payload = {
        jobId: jobId,
        applicantId: userId
    };
    const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
    });
    const result = await response.json()
    if (response.status === 200) {
        return result.data;
    } else {
        console.log(`API error occured for ${url}`);
        return [];
    }
}

export async function addNewJob(data) {
    const url = BASE_API_URI + JOB_API;
    const payload = {
        "title": data.projectName,
        "description": data.projectDesc,
        "cost": +data.cost,
        "owner": data.org,
        "email": sessionStorage.getItem('email'),
        "skills": data.skills.toUpperCase()
    }
    const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
    });
    const result = await response.json()
    if (response.status === 200) {
        return result.data;
    } else {
        console.log(`API error occured for ${url}`);
        return [];
    }
}

export async function getJobByEMail() {
    const url = BASE_API_URI + JOB_BY_EMAIL_API + sessionStorage.getItem('email');
    const response = await fetch(url, {
        method: 'GET',
        headers
    });
    const result = await response.json()
    if (response.status === 200) {
        return result.data;
    } else {
        console.log(`API error occured for ${url}`);
        return [];
    }
}

export async function getUserGitProfile() {
    const url = `https://api.github.com/users/${sessionStorage.getItem('gitUrl')}/repos`;
    const response = await fetch(url, {
        method: 'GET'
    });
    const result = await response.json()
    if (response.status === 200) {
        return result;
    } else {
        console.log(`API error occured for ${url}`);
        return [];
    }
}
