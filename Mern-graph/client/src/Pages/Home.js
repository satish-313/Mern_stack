import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";

// local component
import PostCard from "../Components/PostCard";
import Loading from "../Pages/Loading";
import { AuthContext } from "../context/auth";
import PostForm from "../Components/PostForm";
import { FETCH_POST_QUERY } from "../utils/graphql";

function Home() {
  const { user } = useContext(AuthContext);

  const { loading, data } = useQuery(FETCH_POST_QUERY);

  if (loading) {
    console.log(loading);
    return (
      <div>
        <Loading />
      </div>
    );
  }
  if (data) {
    const { getPosts: posts } = data;
    return (
      <Grid columns={3}>
        <Grid.Row className="page-title">
          <h4>Recent Posts</h4>
        </Grid.Row>
        <Grid.Row>
          {user && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )}
          <Transition.Group duration={2000}>
            {posts.map((post) => (
              <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                <PostCard post={post} />
              </Grid.Column>
            ))}
          </Transition.Group>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Home;
