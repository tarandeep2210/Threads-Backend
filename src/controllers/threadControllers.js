import mongoose from 'mongoose';

import { ThreadSchema } from '../models/threadModel';


const Thread = mongoose.model('Thread',ThreadSchema);

export const addNewThread = (req,res) => {
    let newThread = new Thread(req.body);

    newThread.save((err,thread) => {
        if(err){
            res.send(err);
        }
        res.json(thread);
    });
}; 
 
export const getThreads = (req,res)=>{
    Thread.find({}, (err,thread) => {
        if(err){
            res.send(err);
        }
        res.json(thread);
    });
};



export const deleteThread = (req,res)=>{
    Thread.findOneAndDelete( {_id : req.params.threadId  },(err,thread) => {
        if(err){
            res.send(err);
        }
        res.json({ message : ' Sucessfully Deleted '});
    });
};
