import App from "./App";
import {
   ApolloClient,
   InMemoryCache,
   createHttpLink,
   ApolloProvider,
   ApolloLink,
} from "@apollo/client";

const authLink = new ApolloLink((operation, forward) => {
   const token = localStorage.getItem("jwtToken");
   operation.setContext({
      headers: {
         authorization: token ? `Bearer ${token}` : "",
      },
   });
   return forward(operation);
});

const httpLink = createHttpLink({ uri: "http://localhost:5000" });
const client = new ApolloClient({
   link: authLink.concat(httpLink),
   cache: new InMemoryCache(),
   connectToDevTools: true,
});

const Provider = () => (
   <ApolloProvider client={client}>
      <App />
   </ApolloProvider>
);

export default Provider;
