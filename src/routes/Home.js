import {Link} from 'preact-router/match'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import Image from 'pimg'

import {
  Card,
  Header as CardHeader,
  Footer as CardFooter,
  Body as CardBody
} from '../components/Card'

const Home = ({data: {loading, error, feed, _allCategories}}) => {
  if (error) return <h1>Error fetching feed!</h1>
  if (loading) return <h2>Loading posts...</h2>

  return (
    <div>
      {feed.map(post => (
        <Card key={post.id}>
          <CardHeader
            title={<Link href={'/posts/' + post.id}>{post.title}</Link>}
          >
            <span>
              <small>{post.pubDate}</small>
            </span>
          </CardHeader>
          <CardBody>
            <Image
              src={post.thumbnail}
              alt={post.title}
              fetchOnDemand
              width={200}
            />
            <p dangerouslySetInnerHTML={{__html: post.description}} />
          </CardBody>
          <CardFooter>{post.author}</CardFooter>
        </Card>
      ))}
    </div>
  )
}

export const feed = gql`
  query {
    feed {
      id
      title
      thumbnail
      description
      pubDate
    }
    allCategories {
      name
    }
  }
`

export default graphql(feed)(Home)
