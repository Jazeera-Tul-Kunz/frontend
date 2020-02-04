import React, {useState, useEffect} from 'react';
import Dexie from 'dexie';
import db from './db';
import Navi from './Navi';
import axios from 'axios';
import axiosAuth from './utils/axiosAuth';

const move_url = 'https://lambda-treasure-hunt.herokuapp.com/api/adv/move/'
const room_url = 'https://lambda-treasure-hunt.herokuapp.com/api/adv/init/';

export default function Explore() {

    const [room,setRoom] = useState();
    const [cooldown,setCooldown] = useState(0);
    const [coolErr, setCoolErr] = useState('');


    const coolTimer = (cd) => {
        cd = Math.ceil(cd);
        console.log(cd);
        setCooldown(cd);
        let interval = setInterval(() => {
            console.log('cooldown remaining: ', cd);
            cd -= 1;
            setCooldown(lastcool => lastcool-1);
            if (cd <= 0) clearInterval(interval);
        },1000)
    }

    const move = (way) => {
        console.log('move clicked');

        axiosAuth().post('/move',{direction: way})
            .then(res => {
                console.log('in then', res.data);
                setRoom(res.data);
            })
            .catch(err => {
                console.log('in catch', err.response);
                let cd = err.response.data.cooldown;
                const coolErr = err.response.data.cooldown.errors;
                coolTimer(cd);
                setCoolErr(coolErr)
            })
    }

    const getRoom = () => {

        axiosAuth().get('/init')
            .then(res => {
                console.log(res.data);
                setRoom(res.data)
            })
            .catch(err => {
                console.log(err.response);
                let cd = err.response.data.cooldown;
                const coolErr = err.response.data.cooldown.errors;
                // setCooldown(cd)
                coolTimer(cd)
                setCoolErr(coolErr)
            })
    }

    return (
        <>
            <Navi move={move} getRoom={getRoom} />
            {room && <ul>
                        <li>{room.room_id}</li>
                        <li>{room.title}</li>
                        <li>{room.description}</li>

                        <h4>Exits</h4>
                        <div class="exits">
                            {room.exits.map(e => <p>{e}</p>)}
                        </div>
                        {room.errors && room.errors.map(e => <li>{e}</li>)}
                    </ul>
            }
            {cooldown > 0 && <div><span>Too tired to move! Must Wait: </span><br/>{cooldown}</div>}
        </>
    )
}

