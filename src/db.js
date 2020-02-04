import Dexie from "dexie";
import axios from "axios";
import { config } from "./config";

let db;

export const start = () => {
  db = new Dexie("mapDB");
  db.version(1).stores({
    rooms: "&id"
  });

  let url = `${config.API_PATH}/init`;

  return axios
    .get(url)
    .then(({ data }) => {
      return db.rooms.get(data.room_id).then(startingRoom => {
        console.log("starting room is ", startingRoom);

        if (!startingRoom) {
          return addRoom(data);
        } else {
          return getRoom(data.room_id);
        }
      });
    })
    .catch(err => {
      throw err;
    });
};

export const getRoom = id => {
  return db.rooms.get(id).then(room => {
    return room;
  });
};

export const addRoom = room => {
  room.id = room.room_id;
  let doors = {};
  for (let i of room.doors) {
    doors[i] = -1;
  }
  room.doors = doors;

  return db
    .table("rooms")
    .add(room)
    .then(id => {
      return db.rooms
        .get(room.room_id)
        .then(startingRoom => {
          return startingRoom;
        })
        .catch(err => {
          console.log(err);
        });
    });
};

export const updateRoom = room => {
  return db
    .table("rooms")
    .put(room)
    .then(() => {
      return room;
    });
};

export const getTotal = () => {
  return db.rooms.count();
};
