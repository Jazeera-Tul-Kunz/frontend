import React from 'react';


export default function Room({room}) {

    return (
        <div>
            <ul>
                <li>Room ID # {room.room_id}</li>
                <li>{room.title}</li>
                <li>{room.description}</li>
                <li>Room Items: <br/>{room.items.length ? room.items.map( (item,i) => <p key={i}>{item}</p>): <p>[_________]</p>}</li>
                <h4>Exits</h4>
                <div class="exits">
                    {room.exits.map(e => <p>{e}</p>)}
                </div>
                {room.errors && room.errors.map( (e,i) => <li key={i}>{e}</li>)}
            </ul>

        </div>
    )
}