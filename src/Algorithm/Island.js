require('dotenv').config();
const axiosAuth = require('../utils/axiosAuth');
const token = process.env.API_KEY;

class IslandMap {
    constructor() {
        this.grid = {};
        this.path = [];
    }

    size = () => {
        return Object.keys(this.grid).length
    }

    wait = (sec) => {
        let millisecs = sec * 1000;
        return new Promise((resolve,reject) => setTimeout(() => resolve('time to move!'),millisecs));
    }

    currentRoom = async () => {
        try {
            const res = await axiosAuth(token).get('/adv/init');
            const room = res.data;
            // console.log(room);
            return room;
        } catch(err) {
            // console.log(err.response.data.detail);
            return err.response.data.detail;
        }
    }

    loadRoom = (id,exits) => {
        if (id in this.grid) {
            return this.grid[id];
        }

        this.grid[id] = {};

        exits.forEach(way => {
            this.grid[id][way] = '?';
        })
    }
}

module.exports = IslandMap;
