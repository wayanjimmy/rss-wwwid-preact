import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloProvider} from 'react-apollo'

import './style'
import App from './components/App'

const WWWID_API = 'https://wwwid-graphql.glitch.me'

const client = new ApolloClient({
  link: new HttpLink({uri: WWWID_API}),
  cache: new InMemoryCache(),
  ssr: false
})

export default () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
