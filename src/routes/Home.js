import {h, Component} from 'preact'
import {Link} from 'preact-router/match'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import Image from 'pimg'
import styled from 'preact-emotion'

import {
  Card,
  Header as CardHeader,
  Footer as CardFooter,
  Body as CardBody
} from '../components/Card'

export const GET_FEED = gql`
  query {
    feed {
      id
      title
      thumbnail
      description
      pubDate
      author
      categories
    }
    allCategories {
      name
    }
  }
`

const CategorySelectClass = styled('div')`
  margin: 20px 20px;
`

function mapCategoriesIntoOptions(categories) {
  return categories.map(c => ({
    value: c.name,
    label: c.name
  }))
}

function InputSelect({name, value, options, defaultOption, ...restProps}) {
  return (
    <select name={name} id={name} {...restProps}>
      {defaultOption && <option value="">{defaultOption}</option>}
      {options.map(option => (
        <option value={option.value}>{option.label}</option>
      ))}
    </select>
  )
}

class Home extends Component {
  state = {
    selectedCategory: ''
  }

  handleCategoryChange = e => {
    this.setState({selectedCategory: e.target.value})
  }

  componentDidMount() {
    const {category = ''} = this.props.matches
    if (category.length > 0) {
      this.setState({ selectedCategory: category })
    }
  }

  render(_props, {selectedCategory}) {
    return (
      <div>
        <Query query={GET_FEED}>
          {({loading, error, data}) => {
            if (error) return <h1>Error fetching feed!</h1>
            if (loading) return <h2>Loading posts...</h2>

            const categorySelect = (
              <CategorySelectClass>
                <InputSelect
                  name="category"
                  value={selectedCategory}
                  defaultOption="Pilih Kategori"
                  options={mapCategoriesIntoOptions(data.allCategories)}
                  onChange={this.handleCategoryChange}
                />
              </CategorySelectClass>
            )

            return (
              <div>
                {categorySelect}
                {data.feed
                  .filter(post => {
                    if (selectedCategory.length === 0) {
                      return true
                    }
                    return post.categories.includes(selectedCategory)
                  })
                  .map(post => (
                    <Card key={post.id}>
                      <CardHeader
                        title={
                          <Link href={'/posts/' + post.id}>{post.title}</Link>
                        }
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
                        <p
                          dangerouslySetInnerHTML={{__html: post.description}}
                        />
                      </CardBody>
                      <CardFooter>{post.author}</CardFooter>
                    </Card>
                  ))}
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default Home
