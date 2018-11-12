import jwt from 'jsonwebtoken';
export function login(req, res){
    const {username, password} = req.body;
    if(username === 'admin' && password === 'admin'){
        res.send(jwt.sign({username: 'admin'}, 'secret', {expiresIn: 50}));
    }else{
        res.status(401).end();
    }
}

