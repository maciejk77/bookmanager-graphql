const graphql = require('graphql');
const _ = require('lodash');

const books = [
    {id: "1", name: "Peter Pan", genre: "Fantasy", authorId: "1"},
    {id: "2", name: "Great Siege", genre: "History", authorId: "2"},
    {id: "3", name: "Birds", genre: "Biology", authorId: "3"},
    {id: "4", name: "Ancient Rome", genre: "History", authorId: "2"},
    {id: "5", name: "Bacteria", genre: "Biology", authorId: "3"},
    {id: "6", name: "World of cats", genre: "Biology", authorId: "3"}
];

const authors = [
    {id: "1", name: "Peter Selfish", age: 45},
    {id: "2", name: "Napoleon Brave", age: 40},
    {id: "3", name: "Jan Funk", age: 76}
];

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

const BookType = new GraphQLObjectType({
   name: 'Book',
   fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
        type: AuthorType,
        resolve(parent, args) {
            console.log(parent);
            return _.find(authors, { id: parent.authorId });
        }
    }
   }) 
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
     id: { type: GraphQLID },
     name: { type: GraphQLString },
     age: { type: GraphQLInt },
     books: {
        type: new GraphQLList(BookType),
        resolve(parent, args) {
            return _.filter(books, { authorId: parent.id })
        }
     }
    }) 
 });

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args) {
                // code to get data from DB or other source
                return _.find(books, { id: args.id })
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID }},
            resolve(parent, args) {
                return _.find(authors, { id: args.id });
            }
        },
        books: {
            type:new GraphQLList(BookType),
            resolve(parent, args) {
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});