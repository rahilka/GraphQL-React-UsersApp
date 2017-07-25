// The SCHEMA file is the very basic file of a graphQL app. 
// It is what tells the GraphQL what type of data we are working with, and the relations between them

// The key thing to keep in mind about the schema file, is that it contains ALL of the knowledge,
// required to tell GraphQL exactly what your app data looks like,
// including, most importantly, what properties each object has,
// and excactly, how each object is related to each other  

const graphql = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt
} = graphql;

const UserType = new GraphQLObjectType({	//this object instructs GraphQL about what a user object looks like
	// required properties: name and fields
	name: 'User',
	fields: {	//tells about all the different properties that a User has
		id: { type: GraphQLString },	//we are using build in types
		firstName: { type: GraphQLString },
		age: { type: GraphQLInt }
	}
});