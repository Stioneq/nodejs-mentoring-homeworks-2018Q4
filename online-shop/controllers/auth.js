import jwt from 'jsonwebtoken';
export function login(req, res){
    const {username, password} = req.body;
    if(username === 'admin' && password === 'admin'){
        res.json(jwt.sign({username: 'admin'}, 'secret', {expiresIn: 10}));
    }else{
        res.status(401).end();
    }
}

