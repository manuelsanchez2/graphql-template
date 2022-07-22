const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema/type-defs");
const { resolvers } = require("./schema/resolvers");
const { UsersMapList } = require("./data/SetData");

// It takes as parameters the typeDefs (schemas) and resolvers (queries/api calls)
// All that information is in a folder called schema

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`YOUR API IS RUNNING AT: ${url} :)`);
});

console.log(UsersMapList);
