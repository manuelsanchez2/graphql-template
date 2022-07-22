import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./App.css";
import DisplayData from "./DisplayData";
// ApolloClient takes care of the connection with the server
// useQuery allows to make queries and useMutation allows to make mutations (logically)

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql",
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <h1>List of users:</h1>
          <DisplayData />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
