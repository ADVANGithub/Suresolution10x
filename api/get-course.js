import jwt from "jsonwebtoken";

export default async function handler(req,res){

try{

const auth=req.headers.authorization;

if(!auth){

return res.status(401).json({

success:false

});

}

const token=auth.replace("Bearer ","");

jwt.verify(

token,

process.env.JWT_SECRET

);

return res.status(200).json({

success:true,

course:"Master AI From Scratch"

});

}catch{

return res.status(401).json({

success:false

});

}

}
