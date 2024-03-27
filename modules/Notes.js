const { default: mongoose } = require("mongoose");
const mongooes=require("mongoose");
const {Schema}=mongooes;
const notesSchema = new Schema({
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'user'
    },
    title:{type:String,required:true},
    desc:{type:String,required:true},
    date: { type: Date, default: Date.now },
  });

module.exports=mongooes.model("notes",notesSchema);