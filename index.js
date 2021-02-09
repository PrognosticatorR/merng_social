const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const { MONGODB } = require("./config");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");

const server = new ApolloServer({
   typeDefs,
   resolvers,
   context: ({ req }) => ({
      req,
   }),
});

mongoose
   .connect(MONGODB, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(
      server.listen({ port: 5000 }).then((res) => {
         console.log("connected to mongodb");
         console.log(`server is running at ${res.url}`);
      })
   )
   .catch((err) => console.log(err));
