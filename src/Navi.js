import React from 'react';


export default function Navi({move,getRoom}) {

    return (
        <>
            <div class="navi">
                <button onClick={() => move('n')} id="up">North</button>
                <button onClick={() => move('s')} id="down">South</button>
                <button onClick={() => move('e')} id="left">East</button>
                <button onClick={() => move('w')} id="right">West</button>
            </div>
            <button onClick={getRoom}>Current Room</button>
        </>
    )
}