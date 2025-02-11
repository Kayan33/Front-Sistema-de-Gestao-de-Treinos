import axios from 'axios';

const apiLocal = axios.create({

    baseURL: 'https://kayanpereira.com.br:21065' 
});

export default apiLocal
