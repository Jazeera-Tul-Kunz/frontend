import React, {useState} from 'react';
import db from './db';

export default function Navi(props) {
    const {move,getRoom,footsteps,clear} = props

    return (
        <>
            <div className="navi">
                <button onClick={() => move('n')} id="up">North</button>
                <button onClick={() => move('s')} id="down">South</button>
                <button onClick={() => move('e')} id="left">East</button>
                <button onClick={() => move('w')} id="right">West</button>
            </div>
            <button onClick={getRoom}>Current Room</button>
            <button onClick={footsteps}>Explored Rooms</button>
            <button onClick={clear}>Clear path</button>
        </>
    )
}