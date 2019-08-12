function statusAppCrud(status){
    if(status=='success') return {'message':'Data Saved','code':1}
 
}

function statusAppauth(status){
    if(status=='token') return {'message':'Token Created','code':20}
    if(status=='uservalidate') return {'message':'User Validate','code':21}
    
}

function errorApp(status){
    if(status=='validation') return {'message':'Form Validation','code':41}
    if(status=='inc') return {'message':'Auto Icrement','code':42}
    if(status=='errdb') return {'message':'Cant Save','code':43}
    if(status=='userexist') return {'message':'User already registered','code':44}
    if(status=='hash') return {'message':'Password Cant Hashed','code':45}
    if(status=='invaliduser') return {'message':'Invalid Username Or Password','code':46}
    if(status=='invalidpass') return {'message':'Invalid Username Or Password','code':47}
    if(status=='token') return {'message':'Invalid Username Or Password','code':48}
    if(status=='lastlogin') return {'message':'Cant write DB last login','code':49}
    if(status=='usernotfound') return {'message':'Cant write DB last login','code':50}
    if(status=='scorecantadd') return {'message':'Cant add Score','code':51}


    if(status=='wordnotfound') return {'message':'Not found','code':52}

    //user
    if(status=='userunvalidate') return {'message':'Cant write DB last login','code':22}

    //service 
    if(status=='errservicescore') return {'message':'Something Wrong','code':30}
    
}


module.exports = {
    statusAppCrud: statusAppCrud,
    errorApp:errorApp,
    statusAppauth:statusAppauth
}