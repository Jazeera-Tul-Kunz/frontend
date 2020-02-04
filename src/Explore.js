import React, {useState} from 'react';
import Dexie from 'dexie';
import db from './db';
import Navi from './Navi';
import axios from 'axios';

const move_url = 'https://lambda-treasure-hunt.herokuapp.com/api/adv/move/'
const room_url = 'https://lambda-treasure-hunt.herokuapp.com/api/adv/init/';

export default function Explore() {

    const [room,setRoom] = useState();

    const move = () => {
        console.log('move clicked');
        axios.post(move_url, {direction: 's'},{headers : {Authorization : 'Token e91091807dc50e6bf25669440c1b4fc3ebaf2aaa'}})
            .then(res => {
                console.log(res.data);
                setRoom(res.data);
            })
            .catch(err => console.log(err.response))
    }

    const getRoom = () => {
        axios.get(room_url, {headers : {Authorization : 'Token e91091807dc50e6bf25669440c1b4fc3ebaf2aaa'}})
            .then(res => {
                console.log(res.data);
                setRoom(res.data)
            })
            .catch(err => console.log(err.response))
    }

    return (
        <>
            <Navi move={move} getRoom={getRoom} />
            {room && <ul>
                        <li>{room.title}</li>
                        <li>{room.description}</li>
                        <h4>Exits</h4>
                        <div class="exits">
                            {room.exits.map(e => <p>{e}</p>)}
                        </div>
                    </ul>
            }
            
        </>
    )
}

