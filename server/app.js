const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://bruce:test123@ds163835.mlab.com:63835/gql-ninja');
mongoose.connection.once('open', () => {
  console.log('connected to MongoDB');
});

app.use('/graphql', graphqlHTTP({
    schema,  //schema: schema
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Listening on port 4000...')
});