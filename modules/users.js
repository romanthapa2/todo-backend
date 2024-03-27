const mongooes=require("mongoose");
const {Schema}=mongooes;
const userSchema = new Schema({
    name: {type:String,required:true},
    email: {type:String,required:true,unique:true},
    password: {type:String,required:true},
    date: { type: Date, default: Date.now },
  });

const user=mongooes.model("user",userSchema);
module.exports=user;
