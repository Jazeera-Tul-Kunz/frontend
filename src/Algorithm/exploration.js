const IslandMap = require('./Island.js');

//TODO: write out grid to JSON

async function wrapper() {

    async function exploration() {
        const island = new IslandMap()
        let r = null;
        while (island.size() < 500) {
            try {
                r = await island.currentRoom();
                console.log('current room in exploration', r.room_id);
                await island.wait(r.cooldown);
            } catch(err) {
                throw Error(err)
            }

            const roomID = r.room_id;
            const exits = r.exits;
           
            console.log('current room : ', r.room_id,r.exits);
            island.loadRoom(roomID,exits);
            console.log(island.grid)
            const newWay = island.unexplore(roomID);
            console.log('newWay', newWay);
            if (!newWay) {
                const trail = island.bfs(roomID);
                console.log('trail after bfs', trail)
                if (!trail) {
                    break;
                }
                await island.backtrack(trail);
                continue;
            } else { 
                let next = null;
                try {
                    next = await island.travel(newWay);
                    island.path.push(newWay);
                    await island.wait(next.cooldown);
                } catch(err) {
                    throw Error(err);
                }
                console.log('next room', next);
                island.loadRoom(next.room_id, next.exits);
                island.updateRooms(roomID,newWay,next.room_id);
                }
            console.log(island.grid);
            }
            return island;
        }

    const mapped = await exploration();
    console.log(mapped.grid,mapped.path);
}
wrapper();