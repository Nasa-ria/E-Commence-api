const jwt = require('jsonwebtoken');
// const express = require("express");

const authenticateToken = async(req,res,next)=>{
        try{
           if(req.headers.authorization){
         const token = req.headers.authorization.split(" ")[1]
         try{
             const verifyToken= jwt.verify(token,process.env.JWT_SECRET)
             req.user = verifyToken
             next()
         }catch(error){
             res.status(401).json("error from token")
 
         }
       
         }else{
             res.status(401).json("unAuthorise user")
         }
        }catch(error){
         res.status(400).json("error from verfication")
         
        }
    
 }



module.exports = authenticateToken;
