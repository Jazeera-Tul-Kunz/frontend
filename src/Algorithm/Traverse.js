require('dotenv').config();
const axiosAuth = require('../utils/axiosAuth');
const token = process.env.API_KEY;
console.log('token', token);
const fs = require('fs');



class Traverse {
    constructor() {
        this.graph = {}
    }

    wait = (seconds) => {
        console.log('seconds', seconds);
        let makeMS = seconds * 1000;
        return new Promise((resolve, reject) => setTimeout(() => resolve('time to move!'),makeMS));
    }

    start = async () => {
        try {
            const res =  await axiosAuth(token).get('/init');
            const room = res.data;
            this.graph[room.room_id] = room;
            fs.writeFile('./rooms.json',JSON.stringify(this.graph,null,2), err => {if (err) throw err})
            return [room.cooldown, room.exits]
        } catch(err) {
            console.log(err.response.data.detail);
        }
    }

    trackInit = async () => {
        const [cooldown,exits,id] = await this.start();
        const rand = Math.floor(Math.random()*exits.length);
        return [cooldown,exits[rand]]
    }

    getTrack = ([cooldown,way]) => {
        console.log('cooldown','way',cooldown,way);
        try {
            return this.wait(cooldown).then( async (res) => {
                console.log(res);
                const [cool,exits,id] = await this.explore(way);
                // console.log('coolexits in traverse', cool,exits)
                const rand = Math.floor(Math.random()*exits.length);
                return [cool,exits[rand]];
            })
        }
        catch(err) {
            console.log(err);
        }
    }

    explore = async (way) => {
        try {
            const res = await axiosAuth(token).post('/move',{direction : way})
            const room = res.data;

            this.graph[room.room_id] = room;
        
            fs.writeFile('./rooms.json',JSON.stringify(this.graph,null,2), err => {if (err) throw err })

            // console.log('graph in explore', this.graph)
            return [room.cooldown, room.exits, room.room_id]
        } catch(err) {
            if (err.response) {
                console.log(err.response.data);
            }
        }
    }
}

const t = new Traverse()

async function wrap() {
    let coolexit = await t.trackInit();

    while (Object.keys(t.graph).length <= 500) {
        const nextCE = await t.getTrack(coolexit);
        coolexit = nextCE;
        console.log('rooms traversed: ', Object.keys(t.graph).length)
    }
}
wrap();
