import axios from "axios";
import { addRoom, getRoom, updateRoom, getTotal } from "./db";
import config from "./config/index";

let coolDownTime = 1;

const coolDown = () => {
  return new Promise((resolve, reject) => {
    if (coolDownTime > 1) {
      setTimeout(() => {
        resolve(true);
      }, +coolDownTime * 1000);
    } else {
      resolve(true);
    }
  });
};

export const move = async (direction, nextRoomId) => {
  let cd = await coolDown();
  console.log("cd", cd);

  return axios
    .post(`${config.API_PATH}/move`, {
      direction: direction,
      next_room_id: nextRoomId
    })
    .then(({ data }) => {
      console.log(data);
      coolDownTime = data.cooldown ? +data.cooldown : 15;
      console.log(coolDownTime);
      return data;
    })
    .catch(err => {
      throw err;
    });
};

export const getBackwards = direction => {
  const backwards = {
    n: "s",
    s: "n",
    e: "w",
    w: "e"
  };
  return backwards[direction];
};

export const grabItem = async item => {
  await coolDown();

  return axios
    .post(`${config.API_PATH}/take`, {
      name: item
    })
    .then(({ data }) => {
      coolDownTime = data.cooldown ? +data.cooldown : 15;
    })
    .catch(err => {
      throw err;
    });
};

export const dropItem = async item => {
  await coolDown();

  return axios
    .post(`${config.API_PATH}/drop`, {
      name: item
    })
    .then(({ data }) => {
      coolDownTime = data.cooldown ? +data.cooldown : 15;
      return data;
    })
    .catch(err => {
      throw err;
    });
};

export const status = async () => {
  await coolDown();

  return axios
    .post(`${config.API_PATH}/status`)
    .then(({ data }) => {
      coolDownTime = data.cooldown ? +data.cooldown : 15;
      return data;
    })
    .catch(err => {
      throw err;
    });
};

export const sellItem = async item => {
  await coolDown();

  return axios
    .post(`${config.API_PATH}/sell`, {
      name: item,
      confirm: "yes"
    })
    .then(({ data }) => {
      coolDownTime = data.cooldown ? +data.cooldown : 15;
      return data;
    })
    .catch(err => {
      throw err;
    });
};

export const explore = async currentRoom => {
  coolDownTime = currentRoom.cooldown;

  let exit;
  console.log(
    "current room",
    JSON.stringify(currentRoom, null, 1),
    currentRoom.exits
  );

  for (let d of Object.keys(currentRoom.exits)) {
    if (currentRoom.exits[d] === -1) {
      exit = { [d]: currentRoom.exits[d] };
    }
  }

  if (!exit && Object.keys(currentRoom.exits).length === 1) {
    for (let d of Object.keys(currentRoom.exits)) {
      exit = { [d]: currentRoom.exits[d] };
    }
  } else if (!exit) {
    const exits = Object.keys(currentRoom.exits);
    const d = exits[Math.floor(Math.random() * exits.length)];
    exit = { [d]: currentRoom.exits[d] };
  }
  console.log("Moving ", exit);

  let nextRoom = await move(Object.keys(exit)[0]);
  let visitedRoom = await getRoom(nextRoom.room_id);
  if (!visitedRoom) {
    visitedRoom = await addRoom(nextRoom);
  }

  visitedRoom.exits[getBackwards(Object.keys(exit)[0])] = currentRoom.id;
  await updateRoom(visitedRoom, visitedRoom.id);

  currentRoom.exits[Object.keys(exit)[0]] = visitedRoom.id;
  await updateRoom(currentRoom, currentRoom.id);

  console.log("current room: ", visitedRoom);

  if (visitedRoom.items.length) {
    for (let item of visitedRoom.items) {
      const pickedUpItem = await grabItem(item);
      console.log("picked up item ", pickedUpItem);
    }
  }

  if (visitedRoom.title === "Store") {
    const status = await status();
    console.log("status: ", status);
  }

  if (status.inventory.length) {
    for (let item of status.inventory) {
      const soldItem = await sellItem(item);
      console.log("sold item: ", soldItem);
    }
  }
  explore(visitedRoom);
};
