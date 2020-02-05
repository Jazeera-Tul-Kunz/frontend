require('dotenv').config();
const axiosAuth = require('../utils/axiosAuth');
const token = process.env.API_KEY;
console.log('token', token);
// const os = require('os');
// const fs = require('fs-extra');
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
            // console.log('room', room);
            // this.graph[room.room_id] = [room.cooldown,...room.exits];
            this.graph[room.room_id] = room;
            // console.log('graph', this.graph);
            // fs.writeFile('./rooms.json',this.graph[room.room_id], err => {if (err) throw err})
            fs.writeFile('./rooms.json',JSON.stringify(this.graph,null,2), err => {if (err) throw err})
            return [room.cooldown, room.exits]
        } catch(err) {
            console.log(err.response.data.detail);
        }
    }

    trackInit = async () => {
        const [cooldown,exits] = await this.start();
        const rand = Math.floor(Math.random()*exits.length);
        return [cooldown,exits[rand]]
    }

    getTrack = ([cooldown,way]) => {
        console.log('cooldown','way',cooldown,way);
        try {
            return this.wait(cooldown).then( async (res) => {
                console.log(res);
                const [cool,exits] = await this.explore(way);
                console.log('coolexits in traverse', cool,exits)
                // const explored = await t.explore(way);
                // console.log('explored', explored);
                const rand = Math.floor(Math.random()*exits.length);
                // return [cool,exits[rand]];
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
            this.graph[room.room_id] = [room.cooldown,...room.exits];
            this.graph[room.room_id] = room;
        
            fs.writeFile('./rooms.json',JSON.stringify(this.graph,null,2), err => {if (err) throw err })

            console.log('graph in explore', this.graph)
            return [room.cooldown, room.exits]
        } catch(err) {
            // if (err.response) {
            console.log(err.response.data);
            // }
        }
    }
}

const t = new Traverse()

async function wrap() {
    let coolexit = await t.trackInit();
    for (let i=0; i<10; i++) {
        const nextCE = await t.getTrack(coolexit);
        coolexit = nextCE;
    }
}
wrap();


 // .then(() => {
    //     t.explore(way)
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err))
    // })
    // .catch(err => {
    //     console.log(err);
    // })

    // const promise = new Promise((resolve,reject) => {
    //     setTimeout(async () => {
    //         try {
    //             const [cool,exits] = await t.explore(way)
    //             const rand = Math.floor(Math.random()*exits.length);
    //             resolve([cool,exits[rand]])
    //         } catch(err) {
    //             console.log('t.explore() err',err)
    //         }
            
    //     },cooldown*1000)
    // })



// const wait = seconds => {
//     console.log('seconds', seconds);
//     let makeMS = seconds * 1000;
//     return new Promise((resolve, reject) => setTimeout(() => resolve('time to move!'),makeMS));
//   };


// const begin = async () => {
//         const [cooldown,exits] = await t.start();
//         const rand = Math.floor(Math.random()*exits.length);
//         return [cooldown,exits[rand]]
// }

// const traverse = ([cooldown,way]) => {
//     console.log('cooldown','way',cooldown,way);
//     try {
//         return wait(cooldown).then( async (res) => {
//             console.log(res);
//             const [cool,exits] = await t.explore(way);
//             console.log('coolexits in traverse', cool,exits)
//             // const explored = await t.explore(way);
//             // console.log('explored', explored);
//             const rand = Math.floor(Math.random()*exits.length);
//             // return [cool,exits[rand]];
//             return [cool,exits[rand]];
//         })
//     }
//     catch(err) {
//         console.log(err);
//     }
// }



