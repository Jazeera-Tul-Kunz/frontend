const axiosAuth = require('./utils/axiosAuth');

class Traverse {
    constructor() {
        this.graph = {}
    }

    start = async () => {
        try {
            const startRoom =  await axiosAuth().get('/init');
            this.graph[startRoom.room_id] = startRoom.exits;
        } catch(err) {
            console.log(err)
        }
    }

    explore = () => {
        return;
    }
}

t = new Traverse()
t.start()
console.log(t.graph)



