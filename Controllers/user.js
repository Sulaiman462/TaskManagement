const User = require('../models/user')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.postSignup= async (req,res,next)=>{
    try{
        console.log(req.body)
        const name=req.body.name;
        const email=req.body.email;
        const phone=req.body.phone;
        const age=req.body.age;
        const gender=req.body.gender;
        const password=req.body.password;

        if(!name || !email || !password || !phone || !age || !gender || !password ){
            return res.status(400).json({message:'add all fields'})
        }
        const user=await User.findOne({email})
        console.log(">>>>>>>>>>>>>",user)
            if(user!= null){
            return res.status(409).json({message:'user already exist'})
        }

        
        const saltRounds=10;
        bcrypt.hash(password, saltRounds, async(err,hash)=>{
        const data=  await User.create({ name , email , phone, age, gender ,password:hash })
         return res.status(201).json({data,message:'successfully created new user'})

})

        
    }   
    catch(err){
        console.log(err)
    } 
}


exports.postLogin=async  (req,res,next)=>{

    try{
    const email=req.body.email;
    const password=req.body.password;

    if( !email || !password){
        return res.status(400).json({message:'add all fields'})
    }

    
    const user = await User.findOne({email})

    if(user.length === 0){
        return res.status(404).json({message:'user not found'})
    }



    const foundUser = user;
    console.log(foundUser,"///////////")
    bcrypt.compare(password, foundUser.password, (err, matchPassUser)=>{
        console.log("typed--" ,password, "databse", foundUser.password, "compaared---", matchPassUser)
        if(!matchPassUser){
         return res.status(401).json({message:'User not authorized'})
        }
        
        return res.status(200).json({message:'login sucess' , token:generateAccessToken(foundUser.id)
    
    })
     });

    
    // if(foundUser.Password !== password){
    //     return res.status(401).json({message:'invalid password'})
    // }
    //  res.status(200).json(foundUser)
    function generateAccessToken(id){
        return jwt.sign({ userId:id  },'itstoken');
    }

}
catch(err){
    console.log(err)

    res.status(500).json({error:err})
    }

}

