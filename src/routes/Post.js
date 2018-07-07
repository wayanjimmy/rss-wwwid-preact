import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

import {
  Card,
  Header as CardHeader,
  Footer as CardFooter,
  Body as CardBody
} from '../components/Card'
import Container from '../components/Container'

const Post = ({data: {loading, error, post}}) => {
  if (error) return <h1>Error fetching post!</h1>
  if (loading) return <h2>Loading posts...</h2>

  return (
    <Container>
      <Card key={post.id}>
        <CardHeader title={<h3>{post.title}</h3>}>
          <span>
            <small>{post.pubDate}</small>
          </span>
        </CardHeader>
        <CardBody>
          <div dangerouslySetInnerHTML={{__html: post.content}} />
        </CardBody>
        <CardFooter>{post.author}</CardFooter>
      </Card>
    </Container>
  )
}

const q = gql`
  query post($id: ID!) {
    post(id: $id) {
      id
      content
      title
      pubDate
      author
    }
  }
`

export default graphql(q, {
  options: ({id}) => ({
    variables: {id}
  })
})(Post)
