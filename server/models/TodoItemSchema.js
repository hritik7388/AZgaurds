import Mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import userType from "../enums/userType";
import status from '../enums/status';
import bcrypt from 'bcryptjs';
import { trim } from "lodash";
const options = {
  collection: "TodoItem",
  timestamps: true,
};

const TodoItemSchema = new Schema(
  {  
 
  description:{
    type:String,
    require:true,
    trim:trim

  },
    name: { type: String },
    userName: { type: String },
    email: { type: String },  
    countryCode: { type: String },
    mobileNumber: { type: String },
    userType: { type: String, default: userType.USER }, 
    password: { type: String },   
    status: { type: String, default: status.ACTIVE },
  },

  options
);
TodoItemSchema.plugin(mongoosePaginate);
TodoItemSchema.plugin(mongooseAggregatePaginate);
module.exports = Mongoose.model("TodoItem", TodoItemSchema);

Mongoose.model("user", TodoItemSchema).find({ userType: userType.ADMIN }, async (err, result) => {
  if (err) {
    console.log("DEFAULT ADMIN ERROR", err);
  }
  else if (result.length != 0) {
    console.log("Default Admin.");
  }
  else {
    let obj = {
      userType: userType.ADMIN,
      name: "Hritik",
      countryCode: "+91",
      mobileNumber: "7388503329",
      email: "choreohritik52@gmail.com", 
      dateOfBirth: "20-08-2001",
      gender: "Male",
      password: bcrypt.hashSync("Mobiloitte@1"),
      address: "Kannauj, UP, India", 
    };
    Mongoose.model("user", TodoItemSchema).create(obj, async (err1, result1) => {
      if (err1) {
        console.log("DEFAULT ADMIN  creation ERROR", err1);
      } else {
        console.log("DEFAULT ADMIN Created", result1);
      }
    });
  }
});




