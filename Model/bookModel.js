const {Schema, model}=require('mongoose')
const bookSchema= new Schema({
    name:{type:String},
    genre:{type:String},
    authorId:{type:String},
    status:{type:String},
})

const bookModel= model("book_tb",bookSchema)
module.exports=bookModel