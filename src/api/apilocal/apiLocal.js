import axios from 'axios';

const apiLocal = axios.create({

    baseURL: 'https://api-academia-77ca.onrender.com' 
});

export default apiLocal
