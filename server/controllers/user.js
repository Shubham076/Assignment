const Permission = require("../models/permissions")
const User = require("../models/user")



exports.getAllUsers = async (req,res,next) => {

    
    try{

        let users = await User.findAll({ where : {admin : false}});
            
        let permissions = await Permission.findAll(); 

        let data = [];

        for(let i = 0 ; i< users.length ; i++){

            data.push({
                userId:users[i].id,
                email:users[i].email,
                username: users[i].username,
                accessGreen : permissions[i].accessGreen,
                accessRed : permissions[i].accessRed
            })

        }



        res.status(201).json({
            users : data
        })
    }

    catch(err){
        next(err);
    }

}

exports.getPermissions = async(req ,res ,next) => {
    let id  = req.id;

 try{
     
    let permission = await Permission.findOne({ where : {userId : id}});
    res.status(201).json({
        permission : permission
    })

 }
 catch(err){
     next(err);
 }
}

exports.updatePermissions = async(req , res, next) => {

    let id = req.params.id;
    let permission = req.body.permission;

    try{
        
        let updatedPermission = await Permission.update(permission , {where:{ userId : id}});

        res.status(201).json({
            message: "Successfully updated"
        })

    }

    catch(err){
        next(err)
    }



}