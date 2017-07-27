// The SCHEMA file is the very basic file of a graphQL app. 
// It is what tells the GraphQL what type of data we are working with, and the relations between them

// The key thing to keep in mind about the schema file, is that it contains ALL of the knowledge,
// required to tell GraphQL exactly what your app data looks like,
// including, most importantly, what properties each object has,
// and excactly, how each object is related to each other  

const graphql = require('graphql');
const axios = require('axios');
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,	//takes in a root quer and returns a graphql schema instance
	GraphQLList
} = graphql;

const CompanyType = new GraphQLObjectType({	
	name: 'Company',
	fields: {	
		id: { type: GraphQLString },	
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		users: {
			type: new GraphQLList(UserType),	//because we have multiple users associated with one company
			resolve(parentValue, args) {
				return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
					.then(resp => resp.data);
			}
		}
	}
});

const UserType = new GraphQLObjectType({	//this object instructs GraphQL about what a user object looks like
	// required properties: name and fields
	name: 'User',
	fields: {	//tells about all the different properties that a User has
		id: { type: GraphQLString },	//we are using build in types
		firstName: { type: GraphQLString },
		age: { type: GraphQLInt },
		company: {
			type: CompanyType,
			resolve(parentValue, args) {
				return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
					.then(res => res.data);
			}
		}
	}
});

// The purpose of the Root Query is to allow GraphQl to jump on a very specific node in the graph from all of our data
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		user: {
			type: UserType,
			args: { id: { type: GraphQLString } },
			// Resolve is the most important function of our root query, where we have to actually fetch the data
			resolve(parentValue, args) {	//purpose: go into the db and find the actual data
				// when an id will be passed, it will be available on the args object
				// RESOLVE can handle a promise!!
				return axios.get(`http://localhost:3000/users/${args.id}`)
					.then(resp => resp.data);
			}
		},	//meaning: if you are looking for a user, and you give me an id, I will give you back the user(of UserType)
		company: {
			type: CompanyType,
			args: { id: { type: GraphQLString } },
			resolve(parentValue, args) {
				return axios.get(`http://localhost:3000/companies/${args.id}`)
					.then(resp => resp.data);
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});