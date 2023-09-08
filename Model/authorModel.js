const {Schema,model}=require("mongoose")
const authorSchema = new Schema({
    name:{type:String},
    age:{type:Number}
})
const authorModel=model("author_tb",authorSchema)
module.exports= authorModel