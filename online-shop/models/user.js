import { getDB } from "../utils/mongo";



async function findAll(){
    const db = getDB('auth');
    
    return db.collection('users').find().toArray();
}

async function findById(_id){
    const db = getDB('auth');
    
    return db.collection('users').findOne({_id});
}

async function findOrCreate(user){
    const db = getDB('auth');
    const _user = await db.collection('users').findOne(user);
    return _user || await db.collection('users').insertOne(user);
}

export default {findAll, findById, findOrCreate};