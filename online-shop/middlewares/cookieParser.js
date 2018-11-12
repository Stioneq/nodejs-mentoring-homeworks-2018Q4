


export default function handle(req, res, next){
    
    const cookies = req.headers.cookie;
    
    if(cookies){
        req.parsedCookies = cookies.split(';').map(cookie => cookie.split('=')).reduce((acc, cur) => {
            return {...acc, [cur[0]]: cur[1]}
        }, {});
    
    }

    next();
}