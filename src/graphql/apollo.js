import VueApollo from 'vue-apollo'

import { ApolloClient } from 'apollo-boost'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import dotenv from 'dotenv';

dotenv.config()

const GRAPHQL_URI = process.env['VUE_APP_GRAPHQL_URL']

console.log('GRAPHQL_URI------', GRAPHQL_URI)
const httpLink = new HttpLink({
    uri: GRAPHQL_URI
})

// Create the apollo client
export const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: true
})


export const apolloProvider = new VueApollo({
    defaultClient: apolloClient
})