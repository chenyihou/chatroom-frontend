import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider} from "react-apollo";
import Routes from './routes'
import ApolloClient from "apollo-boost";
import 'antd/dist/antd.css';  

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});
// Create the client as outlined above
const App = () => (
    <ApolloProvider client={client}>
        <Routes/>
    </ApolloProvider>
);

ReactDOM.render(
    <App/>, document.getElementById("root"));
