const IslandMap = require('./Island.js');

async function wrapper() {








    async function exploration() {
        const island = new IslandMap()
        // island.currentRoom();
        // island.wait();
        // while (island.size() < 10) {
    
            // const x = await island.currentRoom();
            const {room_id, exits} = await island.currentRoom();
            // console.log(room_id,exits);
            island.loadRoom(room_id,exits)
            // console.log(island.grid)
            const newWay = island.unexplore(room_id);
    
            // if (!newWay) {
            //     const trail = island.bfs(room_id); TODO:
            //     if (!trail) {
            //         // break;
            //     }
            //     island.backtrack(trail); TODO:
            //     // continue;
            // } else {
                await island.travel(newWay); 
                island.path.push(newWay);
                const next = await island.currentRoom();
                console.log('nextRoom', next);
                island.loadRoom(next.room_id, next.exits);
                island.updateRooms(room_id,newWay,next.room_id)  //TODO:
                console.log(island.grid);
            // }
        // }
        return island;
    }

    const island = await exploration();
    console.log(island.grid);

    











}

wrapper();




/*
sajkdlfa
TODO
*/



