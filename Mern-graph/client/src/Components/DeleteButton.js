import React, { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { FETCH_POST_QUERY } from "../utils/graphql";
import MyPopup from '../utils/Popup';

const DeleteButton = ({ postId, commentId, callback }) => {
  const [confirm, setConfirm] = useState(false);

  const mutation = commentId ? DELETE_COMMENT : DELETE_POST;

  const [deletePost, { error }] = useMutation(mutation, {
    update(cache) {
      setConfirm(false);
      if (!commentId) {
        const data = cache.readQuery({
          query: FETCH_POST_QUERY,
        });
        data.getPosts = data.getPosts.filter((p) => p.id !== postId);
        cache.writeQuery({
          query: FETCH_POST_QUERY,
          data: { getPosts: [...data.getPosts] },
        });
      }
      if (callback) callback();
    },
    variables: { postId, commentId },
    onError(err) {
      console.log(err);
    },
  });

  return (
    <>
      <MyPopup
        content={commentId ? "delete comment" : "delete post"}>
        <Button
            as="div"
            color="red"
            floated="right"
            onClick={() => setConfirm(true)}
          >
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
      </MyPopup>

      <Confirm
        open={confirm}
        onCancel={() => setConfirm(false)}
        onConfirm={deletePost}
      />
    </>
  );
};

const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton;
