import React from 'react';


export default function Navi({move,getRoom}) {

    return (
        <>
            <div class="navi">
                <button onClick={() => move()} id="up">Up</button>
                <button onClick={() => move()} id="down">Down</button>
                <button onClick={() => move()} id="left">Left</button>
                <button onClick={() => move()} id="right">Right</button>
            </div>
            <button onClick={getRoom}>Current Room</button>
        </>
    )
}