request = require('request')

module.exports = function(req, res, next) {
    const token = req.headers["authorization"]
    
   console.log(req.url)
    if(!token) return res.status(401).json('unauthorized');
    const options = {
        headers: {
            'authorization' : token
        },
        method: 'GET',
        url: 'http://localhost:4001/validate',
        json : true  
    };
    request(options, function(err, response, body) {
        if(response.statusCode == 200){
            if(req.url=='/create' || req.url=='/update' ){
                if(body.response.is_admin) next()
                return res.status(401).json("unauthorized");
            }
            req.data = body.response
            req.data.token =  req.headers["authorization"]
            next()
        }else{
            return res.status(401).json("unauthorized");
        }
    });


};
