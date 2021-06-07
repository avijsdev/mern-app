export const getAPIResponse=async()=>{
    const url='https://avinashara.free.beeceptor.com/';
    return fetch(url).then(res=>res.json());
}