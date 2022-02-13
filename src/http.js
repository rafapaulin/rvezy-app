import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.thecatapi.com/v1/',
    headers: {
        'x-api-key': process.env.VUE_APP_CAT_API_KEY
    }
});
