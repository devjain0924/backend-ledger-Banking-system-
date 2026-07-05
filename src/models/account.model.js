const mongoose= require('mongoose');

const accountSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"Account must be associated with a user"],
        index:true
        //B+ tree index for faster queries
    },
    status:{
        type:String,
        enum:{
            values:["ACTIVE","INACTIVE","FROZEN"],
            message:"Status must be either ACTIVE, INACTIVE or FROZEN",
            default:"ACTIVE"
        }
    },
    currency:{
        type:String,
        required:[true,"Currency is required"],
        default:"INR"
    },

})

accountSchema.index({user:1,status:1}); //compound index for user and status

const accountModel= mongoose.model("Account",accountSchema);

module.exports=accountModel;