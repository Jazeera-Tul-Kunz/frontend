const axios = require('axios');
// require('dotenv').config();

function axiosAuth(token=process.env.REACT_APP_API_KEY) {
    // console.log('API Key in axiosAuth()', process.env.REACT_APP_API_KEY, process.env.API_KEY);
    // const token = process.env.REACT_APP_API_KEY || process.env.API_KEY;
    console.log('token in axiosAuth', token);
    const config = {
        headers : {Authorization: `Token ${token}`},
        baseURL: 'https://lambda-treasure-hunt.herokuapp.com/api/adv'
    }
    return axios.create(config)
}

module.exports = axiosAuth;