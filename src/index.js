import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloProvider} from 'react-apollo'
import {injectGlobal} from 'preact-emotion'

import App from './components/App'
import emotionNormalize from './normalize'

const WWWID_API = 'https://wwwid-graphql.glitch.me'

const client = new ApolloClient({
  link: new HttpLink({uri: WWWID_API}),
  cache: new InMemoryCache(),
  ssr: false
})

injectGlobal`
${emotionNormalize}

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  text-decoration: none;
  color: inherit;
}
`

export default () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
