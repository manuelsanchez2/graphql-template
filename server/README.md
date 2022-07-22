# GRAPHQL basics

We use graphql in order to create queries and fetch directly the information that we want instead of taking everything and filtering already in the app.

Tutorial followed: https://www.youtube.com/watch?v=yqWzCV0kU_c&t=4008s

Generated data through: https://generatedata.com/generator

1. npm i apollo-server graphql nodemon

## STRUCTURE

`const { ApolloServer } = require("apollo-server");`
`const server = new ApolloServer({ typeDefs, resolvers });`

1. First of all, we need to create schema folder
2. Create type-defs.js (model)
3. Create resolvers.js (queries and api calls)

We have this schema folder where we include the type-defs and the resolvers.

- Type-defs seem to have the same function as schemas / models in other systems.

- Resolvers: we define what is happening in every Query. In the same way we say in the type-defs that users should take the User schema, here we will say what will happen / return. It is there where we would make the call to the API (in this case to FakeData.js)

- ENUMS --> we use it for validation of the field. For example, we use it so that the user only insert countries in the property of nationality and not any String.

## Handling a query for a certain user or a certain movie

We have decided to query user by ID and movie by name

`type Query { users: [User!]! user(id: ID!): User! }`

## Mutation vs Query

Query is like a get request
Mutation is like post, put and delete

That is the next part of the tutorial
2hour07mins --> Mutations --> https://www.youtube.com/watch?v=yqWzCV0kU_c
