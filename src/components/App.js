import {h, Component} from 'preact'
import {Router} from 'preact-router'
import {Link} from 'preact-router/match'

import Home from 'async!../routes/Home'
import Post from 'async!../routes/Post'

function Header() {
  return (
    <header className="section" style={{background: '#101719'}}>
      <div>
        <div
          className="header-top"
          style={{
            display: 'flex',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: 'white',
            padding: '15px'
          }}
        >
          <Link href="/" style={{margin: 0, fontSize: '1.6em'}}>
            RSS WWWID
          </Link>
        </div>
      </div>
    </header>
  )
}

export default class App extends Component {
  handleRoute = e => {
    this.currentUrl = e.url
  }

  render() {
    return (
      <div>
        <Header />
        <main>
          <Router onChange={this.handleRoute}>
            <Home path="/" />
            <Post path="/posts/:id" />
          </Router>
        </main>
      </div>
    )
  }
}
