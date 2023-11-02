import mongoose from "mongoose";

const orderModel = new mongoose.Schema({
    subject_code: {
        type: String,
        // required: true,
    },  
    order_completion_time: {
        type: Date, 
        // required:true
      },
    description:{
        type:String,
        // required:true,
    },
    file_data : [{
        filename :{
            type: String
        } ,
        content_type :{
                type: String
        } 
         }]

    ,
    order_price:{
        type:Number, 
    },
    No_of_pages:{
        type:Number
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        // required:true,
    },
    username:{
        type:String,
        required:true

    },
    payment_done:{
        type:Number,
        default:0,
    },
},{
    timestamps:true
});

export default mongoose.model("Order", orderModel);