const express=require("express");
const {graphqlHTTP} = require("express-graphql");
const app=express();
const cors = require("cors");
const URI = "mongodb+srv://pisco:055pisco@cluster0.upmid7w.mongodb.net/book_query?retryWrites=true&w=majority"
const mongoose = require("mongoose");
const schemaBook=require("./schema");
app.use(cors({
    origin:"*"
}))
mongoose.set("strictQuery",false)

mongoose.connect(URI, (err,res)=>{
    if (err) {
        console.log("Not connected to Mongoose");
    }else{
        console.log("Connected to Mongoose");
    }
})

app.use("/graphql", graphqlHTTP({
    schema:schemaBook,
    graphiql:true,
}))




app.listen(4000,(req,res)=>{
    console.log("App running ");
})

            // Assignment
// Write a graphql query for an ecommerce store
// 1. Get all products\
// 2. Get a single product with products "name" not "id"
// b. Get all sellers
// 1. Get a single seller with seller's "age" not "id"

// 1. Get each seller with their products