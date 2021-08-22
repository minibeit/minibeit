import axios from './refresh';

export const schoolGetApi = async () =>{
    const accessToken = localStorage.getItem('accessToken');
    const result = await axios
    .get(`http://3.36.95.15:8080/api/school/list`,{
        headers: {
            Authorization: `Bearer ${accessToken}`
        },cache: true,
    })
    .then((res)=>{
        return res;
        })
        .catch((err)=>{
        return false
        });
        console.log(result)
        return result.data;
}