import {
    User
} from '../models';
import debug from 'debug';
import jwtUtils from '../utils/jwt-utils';
const log = debug('server:controllers:auth');

export function login(req, res) {
    const {
        username
    } = req.body;
    log('%s tries to login ', username);
    User.findById(username).then(u => {
        if (u) {
            res.json({
                code: 200,
                message: 'OK',
                data: {
                    username,
                    email: u.email
                },
                token: jwtUtils.sign({username})
            });
        } else {
            log('incorrect credentials');
            throw {userNotExisting: username};
        }
    }).catch((err) => {
        res.status(401).json({
            code: 401,
            message: 'Unauthorized',
            data: err
        });
    });
}