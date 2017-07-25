const express = require('express');
const expressGraphQL = require('express-graphql');	//this library is like a glue, compatibility layer between GraphQL and Express

const app = express();

// Now, we are going to tell our express app, that any request that comes into our app,
// looking for the route '/graphql', we want the graphql library to handle it.
app.use('/graphql', expressGraphQL({
	graphiql: true	//'graphiql' = Graphical - development tool
}));

app.listen(4000, () => {
	console.log('Listening on port 4000');
}); 