import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";
import config from "./config/index";
import { start } from "./db";
import { Buttons } from "./Buttons/Buttons";

function App() {
  const [room, setRoom] = useState(null);
  const [player, setPlayer] = useState(null);
  console.log("ROOM", room);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Token ${config.API_KEY}`;

    start().then(room => {
      setRoom(room);
    });
  }, []);

  return (
    <div className="App">
      <Buttons room={room} setRoom={setRoom} />
    </div>
  );
}

export default App;
