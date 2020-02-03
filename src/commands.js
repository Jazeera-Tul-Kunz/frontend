import axios from "axios";
import { addRoom, getRoom, updateRoom, getTotal } from "db";
import config from "config";

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
  await coolDown;

  return axios
    .post(`${config.API_PATH}/move`, {
      direction: direction,
      next_room_id: nextRoomId
    })
    .then(({ data }) => {
      coolDownTime = data.cooldown ? +data.cooldown : 15;
      return data;
    })
    .catch(err => {
      throw err;
    });
};
