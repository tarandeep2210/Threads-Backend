import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ThreadSchema = new Schema({

        title : {
            type: String,
            required : 'Enter a Title'
        }
        ,
        description : {
            type: String,
            required : 'Enter a description'
        }
        ,
        tags : {
            type: [String],
        }
        ,
        email : {
            type : String,
            required : 'Enter a email'
        }
        ,
        created_date :{
                type: Date,
                default : Date.now
        }
})