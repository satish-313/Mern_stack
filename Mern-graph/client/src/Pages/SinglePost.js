import React, { useContext, useState } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  Button,
  Card,
  Grid,
  Icon,
  Label,
  Image,
  Form,
} from "semantic-ui-react";
import moment from "moment";

// local import
import LikeButton from "../Components/LikeButton";
import { AuthContext } from "../context/auth";
import DeleteButton from "../Components/DeleteButton";
import MyPopup from "../utils/Popup";

const SinglePost = (props) => {
  const { user } = useContext(AuthContext);
  const postId = props.match.params.postId;
  const [com, setCom] = useState("");

  const { data } = useQuery(FETCH_SINGLE_POST, {
    variables: { postId },
  });

  const [submitComment, { error }] = useMutation(SUBMIT_COMMENT, {
    update() {
      setCom("");
    },
    variables: {
      postId,
      body: com,
    },
    onError(error) {
      console.log(error);
    },
  });

  function deletePostCallback() {
    props.history.push("/");
  }

  let postMarkup;
  if (!data) {
    postMarkup = <p>Loading post...</p>;
  }
  if (data) {
    const { getPost } = data;
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              floated="right"
              size="mini"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <MyPopup content="comments"> 
                  <Button
                    as="div"
                    labelPosition="right"
                    onClick={() => console.log("comment on post")}
                  >
                    <Button basic color="blue">
                      <Icon name="comments" />
                    </Button>
                    <Label basic color="blue" pointing="left">
                      {commentCount}
                    </Label>
                  </Button>
                </MyPopup>
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="write comment"
                        name="comment"
                        value={com}
                        onChange={(e) => setCom(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="ui button teal"
                        disabled={com.trim() === ""}
                        onClick={submitComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map((comment) => {
              const { username, createdAt, body } = comment;
              return (
                <Card fluid key={comment.id}>
                  <Card.Content>
                    {user && user.username === username && (
                      <DeleteButton postId={id} commentId={comment.id} />
                    )}
                    <Card.Header>{username}</Card.Header>
                    <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                    <Card.Description>{body}</Card.Description>
                  </Card.Content>
                </Card>
              );
            })}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
};

const FETCH_SINGLE_POST = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      commentCount
      likes {
        username
      }
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

const SUBMIT_COMMENT = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        createdAt
        username
        body
      }
      commentCount
    }
  }
`;

export default SinglePost;
