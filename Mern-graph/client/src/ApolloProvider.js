import React from 'react'
//import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { ApolloProvider } from '@apollo/react-hooks'


import App from './App'

const httpLink = createHttpLink({
  uri: 'http://localhost:5500'
})

const client = new ApolloClient({
  link: 'http://localhost:5500',
  cache: new InMemoryCache()
})

export default () =>{
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
} 