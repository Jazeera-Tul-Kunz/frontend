require('dotenv').config();
const axiosAuth = require('../utils/axiosAuth');
const token = process.env.API_KEY;
// const us = require('underscore');
const _ = require('underscore');
const Queue = require('../utils/queue');

class IslandMap {
    constructor() {
        this.grid = {};
        this.path = [];
    }

    bfs = (roomID) => {
        const q = new Queue(roomID);
        const visited = new Set();
        q.enque([roomID]);

        while (q.size() > 0) {
            const path = q.deque();
            const rID = path[path.length-1];
            if (!(rID in visited)) {
                if (rID == '?') {
                    return path;
                } else {
                    visited.add(rID);
                }
                const nextIDs = this.neighbors(rID); 
                console.log(nextIDs);
                nextIDs.forEach(nID => {
                    const newPath = [...path];
                    newPath.push(nID);
                    q.enque(new_path);
                })
            }
        }
    }

    neighbors = (rID) => {
        const neighIDs = Object.entries(this.grid[rID]).filter(w => w[1]);
        console.log('neighbors', neighIDs);
        return neighIDs;
    }

    travel = async (way) => {
        try {
            const res = await axiosAuth(token).post('/adv/move',{direction : way})
            const room = res.data;
            console.log(room);
            await this.wait(room.cooldown);

        } catch(err) {
            console.log(err);
        }
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

    updateRooms = (firstID,way,nextID) => {
        const flipped = this.flipWay(way);
        this.grid[nextID][flipped] = firstID;
        this.grid[firstID][way] = nextID;
        return [this.grid[firstID],this.grid[nextID]]
    }

    flipWay = (way) => {
        const waze = {'n' : 's', 's': 'n', 'e' : 'w', 'w' : 'e'};
        return waze[way];
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

        const random_way = _.sample(unexplored);
        return random_way[0];
    }

}

module.exports = IslandMap;
