import mongoose from "mongoose";

const userSechmea= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    role:{
        type:String,
        enum:['admin','receptionist','laboratorist','pharmacist','radiologist'],
        default:"admin"
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})


const UserModel= mongoose.model('users',userSechmea)


export default UserModel