require('dotenv').config();
const axiosAuth = require('../utils/axiosAuth');
const token = process.env.API_KEY;
const us = require('underscore');

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

    unexplore = (id) => {
        if (!(id in this.grid)) {
            return null;
        }
        // for (let [way,r_id] of Object.entries(this.grid[id])) {
        //     console.log(`${way}`);
        //     console.log(r_id);
        //     // unexplored = Object.entries(waze).filter(w => waze[w] == '?');
        // }
        // console.log(this.grid[id]);
        // Object.entries(this.grid[id]).forEach(w => console.log(this.grid[id][w[0]]));

        const unexplored = Object.entries(this.grid[id]).filter(w => this.grid[id][w[0]] == '?');
        
        if (!unexplored.length) {
            return null;
        }

        // const unexplored = Object.fromEntries(entries);
        // console.log(unexplored);

        const random_way = us.sample(unexplored);
        console.log(random_way);
        return random_way[0];
    }



}

module.exports = IslandMap;
