const IslandMap = require('./Island.js');

async function exploration() {
    const island = new IslandMap()
    // island.currentRoom();
    // island.wait();
    // while (island.size() < 10) {

        // const x = await island.currentRoom();
        const {room_id, exits} = await island.currentRoom();
        console.log(room_id,exits);
        island.loadRoom(room_id,exits)
        console.log(island.grid)
    // }
}

exploration();







