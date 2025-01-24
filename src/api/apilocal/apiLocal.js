import axios from 'axios';

const apiLocal = axios.create({

    baseURL: 'http://localhost:7777' 
});

export default apiLocal
