const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLSchema, GraphQLInt, GraphQLNonNull, GraphQLEnumType, graphql}=require("graphql");
const authorModel = require('./Model/authorModel')
const bookModel = require('./Model/bookModel')


const bookList=[
    {id:"1",name:"Harry Potter",genre:"drama", authorId:"1"},
    {id:"2",name:"Harry Pot", genre:"drama", authorId:"2"},
    {id:"3",name:"Harry P", genre:"drama", authorId:"3"},
    {id:"4",name:"Harry P", genre:"drama", authorId:"4"}
]

const authors=[
    {id:"1", name:"John", age:20, bookId:"1"},
    {id:"2", name:"Peter", age:21, bookId:"2"},
    {id:"3", name:"David", age:27, bookId:"3"},
    {id:"4", name:"Gabriel", age:25, bookId:"4"},
]
const authorTypes = new GraphQLObjectType({
    name : "author",
    fields :()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        bookId:{type:GraphQLInt},

        bookDetails:{
            type:new GraphQLList (bookTypes),
            resolve(parent,args){
                return bookModel.find({authorId:parent.id})
            }
        }
    })
})

const bookTypes= new GraphQLObjectType({
    name:"book",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        authorId:{type:GraphQLID},
        status:{type:GraphQLString},
            author_details:{
                type: authorTypes,
                resolve(parent,args){
                    // return authors.filter((val)=>val.id===parent.authorId)
                    return authorModel.findById(parent.authorId)

                }

            }
    })
})

const RootQuery= new GraphQLObjectType({
    name:"books",
    fields:{
        allBook:{
            type:new GraphQLList(bookTypes),
            resolve(parent,args){
                return bookModel.find({})
            }
        },
        getSingleBook:{
            type:bookTypes,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return bookModel.findOne({_id:args.id})
            }
        },
        getBookByName:{
            type:bookTypes,
            args:{name:{type:GraphQLString}},
            resolve(parent,args){
                return bookList.find((book)=>book.name===args.name)
            }
        },
        allAuthors:{
            type:new GraphQLList (authorTypes),
            resolve(parent,args){
                return authorModel.find({})
            }
        }
    }
})


const Mutation = new GraphQLObjectType({
    name:"add_new_infos",
    fields:{
        addBook:{
            type:bookTypes,
            args:{
                name:{type: new GraphQLNonNull (GraphQLString)},
                genre:{type: new GraphQLNonNull (GraphQLString)},
                authorId:{type: new GraphQLNonNull (GraphQLID)},
                status:{
                    type: new GraphQLEnumType({
                        name:"book_status",
                        values:{
                            "new":{value:"Not available"},
                            "progressive":{value:"Progressive"},
                            "ready":{value:"Available"},
                        }
                    }),
                    defaultValue:"Not available"
                }
            },
            resolve(parent,args){
                let all_book =  bookModel.create(args)
                return all_book
            }
        },
        delBook:{
            type: new GraphQLList (bookTypes),
            args:{id:{type: GraphQLID}},
            resolve(parent,args){
                return bookModel.findOneAndDelete(_id=args.id)
            }
        },
        editBook:{
            type: new GraphQLList (bookTypes),
            args:{
                id:{type: new GraphQLNonNull(GraphQLID)},
                name:{type: new GraphQLNonNull (GraphQLString)},
                genre:{type: new GraphQLNonNull (GraphQLString)},
                authorId:{type: new GraphQLNonNull (GraphQLID)}
            },
            resolve(parent,args){
                bookList[parseInt(args.id)-1].name=args.name;
                return bookList
            }
        },
        addAuthor:{
            type:authorTypes,
            args:{
                name:{type: new GraphQLNonNull (GraphQLString)},
                age:{type: GraphQLInt}
            },
            resolve(parent,args){
                let all_authors =  authorModel.create(args)
                return all_authors
            }
        }
    }
})


module.exports = new GraphQLSchema({
    mutation:Mutation,
    query:RootQuery,
})