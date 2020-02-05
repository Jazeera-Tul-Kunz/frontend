import React, {useState, useEffect} from 'react';
import Dexie from 'dexie';
import db from './db';
import Navi from './Navi';
import axiosAuth from './utils/axiosAuth';
import Room from './Room';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

export default function Explore() {
    const [room,setRoom] = useState();
    const [cooldown,setCooldown] = useState(0);
    const [coolErr, setCoolErr] = useState('');
    const [explored, setExplored] = useState([])
    const [modal, setModal] = useState(false);


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

    const footsteps = async () => {
        console.log('getting footsteps please wait...')
        if (explored.length) {
            setExplored([])
            return;
        }
        try {
            const footsteps = await db.table('rooms').toArray();
            console.log('rooms explored', footsteps);
            setExplored(footsteps)
        } catch(err) {
            console.log('error retrieving data', err);
        }
    }

    const clearFootsteps = async () => {
        console.log('clearing footsteps...');

        try {
            await db.table('rooms').clear();
            setExplored([]);
            setModal(!modal);
        } catch(err) {
            console.log('err deleting', err);
        }
    }


    const move = (way) => {
        console.log('move clicked');

         axiosAuth().post('/move',{direction: way})
            .then(async res => {
                console.log('moved: ', res.data);
                setRoom(res.data);
                try {
                    await db.table('rooms').add(res.data);
                } catch(err) {
                    console.log('err adding to db', err)
                }
                // db.table('rooms').add(res.data)
                //     .then(res => console.log('room data'))
                //     .catch(err => console.log('err adding', err))
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
            .then(async res => {
                console.log(res.data);
                setRoom(res.data)
                await db.table('rooms').add(res.data);
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

    const toggleModal = () => setModal(!modal)

    return (
        <>
            <Navi move={move} getRoom={getRoom} footsteps={footsteps} clear={toggleModal} />
            {room && <Room room={room}/>}
            {cooldown > 0 && <div><span>Too tired to move! Must Wait: </span><br/>{cooldown}</div>}
            {explored.length && <div>Explored Rooms</div>}
            {explored.map(room => <Room room={room}/>)}
            {modal && <Button color="danger" onClick={clearFootsteps}>Doing this will erase your tracks.  Are you sure you want to proceed?</Button>}
            {/* <Modal isOpen={modal} toggle={toggleModal} className="modal">
                <ModalBody>
                    Doing this will erase your tracks.  Are you sure you want to proceed?
                   
                </ModalBody>
            </Modal> */}
        </>
    )
}

