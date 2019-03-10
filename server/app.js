const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Error handler
app.use(function(err, req, res, next) {
  res.status(400).send(res.json());
});

// allow cros-origin requests
app.use(cors());

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