const express = require('express');
const expressGraphQL = require('express-graphql');	//this library is like a glue, compatibility layer between GraphQL and Express
const schema = require('./schema/schema');

const app = express();

// Now, we are going to tell our express app, that any request that comes into our app,
// looking for the route '/graphql', we want the graphql library to handle it.
// Middlewares are tiny functions meant to modify requests as they come to an express server
// So, we register expressGraphQL as a middleware

app.use('/graphql', expressGraphQL({	//app.use is how we wire up a middleware to an express app
	schema,
	graphiql: true	//'graphiql' = Graphical - development tool
}));

app.listen(4000, () => {
	console.log('Listening on port 4000');
}); 