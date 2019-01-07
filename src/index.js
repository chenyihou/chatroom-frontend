import React from "react";
import ReactDOM from "react-dom";
import {ApolloProvider} from "react-apollo";
import Routes from './routes'
import 'antd/dist/antd.css';
import {ApolloClient} from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';

const httpLink = createHttpLink({uri: 'http://localhost:4000/graphql'});

const authLink = setContext((_, {headers}) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token
                ? `${token}`
                : ""
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

// Create the client as outlined above
const App = () => (
    <ApolloProvider client={client}>
        <Routes/>
    </ApolloProvider>
);

ReactDOM.render(
    <App/>, document.getElementById("root"));
