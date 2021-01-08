import React from 'react';
import ReactDOM from 'react-dom';
import Provider from './ApolloProvider'
//import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

//import App from './App'

/* const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:5500'
})
 */
//ReactDOM.render(<ApolloProvider client={client}><App/></ApolloProvider>, document.getElementById('root'));

ReactDOM.render(<Provider/>,document.getElementById('root'))

