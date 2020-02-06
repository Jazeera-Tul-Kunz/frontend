import Dexie from 'dexie';

const db = new Dexie('kunzDB');
db.version(1).stores({
    rooms : "++room_id, title, description, coordinates, elevation, terrain, players, items, exits,cooldown, errors, messages"
})

export default db;
