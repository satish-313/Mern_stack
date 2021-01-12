import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Grid } from 'semantic-ui-react'

// local component
import PostCard from '../Components/PostCard'
import Loading from '../Pages/Loading'

// function
const FETCH_POST_QUERY = gql`
{
  getPosts{
    id 
    body 
    createdAt 
    username 
    likeCount
    likes{
      username
    }
    commentCount
    comments{
      id username createdAt body
    }
  }
} 
`

function Home() {


  const { loading, data } = useQuery(FETCH_POST_QUERY);

  if (loading) {
    console.log(loading)
    return (
      <div>
        <Loading />
      </div>
    )
  }
  else {
    const {getPosts:posts} = data
    return (
      <Grid columns={3}>
        <Grid.Row className="page-title">
          <h4>Recent Posts</h4>
        </Grid.Row>
        <Grid.Row>
          {posts && posts.map(post => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    )
  }
}

export default Home;
