import jwt from 'jsonwebtoken';
import {promisify} from 'util';
const secret = 'SOME-SECRET';
const signConfig = {};
const verifyConfig = {};
const jwtVerify = promisify(jwt.verify);

const sign = (payload) => {

    return jwt.sign(payload, secret, signConfig);
}

const verify = async (token) => {
    return jwtVerify(token, secret, verifyConfig);
}

export default {sign, verify};