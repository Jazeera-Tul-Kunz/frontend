import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config();

export default function axiosAuth() {
    console.log('API Key in axiosAuth()', process.env.REACT_APP_API_KEY);
    const token = process.env.REACT_APP_API_KEY;

    const config = {
        headers : {Authorization: `Token ${token}`},
        baseURL: 'https://lambda-treasure-hunt.herokuapp.com/api/adv/'
    }
    return axios.create(config)
}