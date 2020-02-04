import React from "react";
import Button from "react-bootstrap/Button";
import { move, explore, grabItem } from "../commands";

export const Buttons = props => {
  const moveCommand = direction => {
    move(direction)
      .then(room => {
        props.setRoom(room);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const grabCommand = async () => {
    if (props.room.items.length) {
      for (let item of props.room.items) {
        const pickedUp = await grabItem(item);
        console.log("picked up ", pickedUp);
      }
    }
  };

  return (
    <div>
      <Button variant="dark" onClick={() => moveCommand("n")}>
        North
      </Button>
      <Button variant="dark" onClick={() => moveCommand("s")}>
        South
      </Button>
      <Button variant="dark" onClick={() => moveCommand("e")}>
        East
      </Button>
      <Button variant="dark" onClick={() => moveCommand("w")}>
        West
      </Button>
      <Button variant="warning" onClick={() => grabCommand()}>
        Treasure
      </Button>
      <Button variant="success" onClick={() => explore(props.room)}>
        Explore
      </Button>
    </div>
  );
};
