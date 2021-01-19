import React, { useEffect, useState } from "react";
import { Icon, Label, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import MyPopup from "../utils/Popup";

const LikeButton = ({ post: { id, likeCount, likes }, user }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likesPost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeButton = user ? (
    liked ? (
      <Button color="blue">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="blue" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button color="blue" basic as="div" to="/login">
      <Icon name="heart" />
    </Button>
  );

  return (
    <MyPopup content={liked?"unlike":"like"}>
      <Button labelPosition="right" as="div" onClick={likesPost}>
        {likeButton}
        <Label basic color="blue" pointing="left">
          {likeCount}
        </Label>
      </Button>
    </MyPopup>
  );
};

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
