import mongoose from 'mongoose';

import { UserSchema } from '../models/userModel';

import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import fs from "fs";
import bcrypt from 'bcrypt';



const RSA_PRIVATE_KEY = fs.readFileSync('./pub.key'); 

const User = mongoose.model('User',UserSchema);

export const addNewUser = (req,res) => {
    let newUser = new User(req.body);

    newUser.save((err,user) => {
        if(err){
            res.send(err);
        }
        res.json(user);
    });
}; 
 
export const getUsers = (req,res)=>{
    User.find({}, (err,user) => {
        if(err){
            res.send(err);
        }
        res.json(user);
    });
};

// export const login = (req,res) => {
//     const email = req.body.email,
//           password = req.body.password;

//           console.log(email,password);

//             const user = authenticate(email,password);
//             // const userId = email;
//             console.log(user);
//             if(user){

//                 jwt.sign({ user : user} , 'secretkey' , (err,token) => {
//                    console.log(token);
//                     res.status(200).json({
//                         token : token, 
//                         expiresIn: 5
//                       });  

//                 });
//             //  const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
//             //          algorithm: 'RS256',
//             //          expiresIn: 120,
//             //          subject: email
//             //      });
     
//                // send the JWT back to the user
//                // TODO - multiple options available   
//             //    res.cookie("SESSIONID", jwtBearerToken, {httpOnly:true, secure:true});
//             //    res.status(200).json({
//             //     idToken: jwtBearerToken, 
//             //     expiresIn: 5
//             //   });                           
//          }
//          else {
//              // send status 401 Unauthorized
//              res.sendStatus(401); 
//          }          

// };

    export const register = (req,res,next) =>{
        createUser(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
    }

// export const getUserWithEmail = (email,password)=>{
    
    // User.find({ email , password } , (err, user) => {
    //     if(err){
    //         return null;
    //     }
    //     // return user[0];
    //     return user;
    // });
   
// };

    export const login = (req, res, next) =>{
        authenticate(req.body)
            .then(user => user ? res.json(user) : res.status(401).json({ message: 'Username or password is incorrect' }))
            .catch(err => next(err));
    }

async function authenticate({ email, password }) {
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
        const { password, ...userWithoutPass } = user.toObject();
        const token = jwt.sign({ sub: user.id }, 'secretkey');
        return {
            ...userWithoutPass,
            token
        };
    }
}

async function createUser(userParam) {
    // validate
    if (await User.findOne({ username: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

