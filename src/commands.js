import axios from "axios";
import { addRoom, getRoom, updateRoom, getTotal } from "db";
import config from "config";

let coolDownTime = 1;

const coolDown = () => {
  return new Promise((resolve, reject) => {
    if (coolDownTime > 1) {
      setTimeout(() => {
        resolve(true);
      });
    }
  });
};

export const move = async (direction, nextRoomId) => {
  await coolDown;
};
