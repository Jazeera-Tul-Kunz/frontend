require('dotenv').config();
const axiosAuth = require('../utils/axiosAuth');
const token = process.env.API_KEY;
console.log('token', token);

class Traverse {
    constructor() {
        this.graph = {}
    }

    start = async () => {
        try {
            const res =  await axiosAuth(token).get('/init');
            const room = res.data;
            console.log('room', room);
            this.graph[room.room_id] = room.exits;
            
        } catch(err) {
            console.log(err.response.data.detail);
        }
    }

    explore = () => {
        return;
    }
}

t = new Traverse()
t.start();





