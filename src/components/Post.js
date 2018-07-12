import {Query} from 'react-apollo'
import gql from 'graphql-tag'

import {
  Card,
  Header as CardHeader,
  Footer as CardFooter,
  Body as CardBody
} from '../components/Card'

const GET_POST = gql`
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

const Post = ({id}) => (
  <div>
    <Query query={GET_POST} variables={{id}}>
      {({loading, error, data}) => {
        if (error) return <h1>Error fetching post!</h1>
        if (loading) return <h2>Loading posts...</h2>

        const {post} = data

        return (
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
        )
      }}
    </Query>
  </div>
)

export default Post
