import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../utils/Hooks";
import {FETCH_POST_QUERY} from '../utils/graphql'

const PostForm = () => {
  const [errors,setErrors] = useState("")
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(cache, result) {
      const data = cache.readQuery({
        query: FETCH_POST_QUERY
      })
      cache.writeQuery({query: FETCH_POST_QUERY,data:{getPosts:[result.data.createPost,...data.getPosts]}})
      values.body = "";
    },
    
    onError(err) {
      setErrors(err.graphQLErrors[0].message)
    }
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
    <Form onSubmit={onSubmit}>
      <h2>Create a post</h2>
      <Form.Field>
        <Form.Input
          placeholder="hi world"
          name="body"
          onChange={onChange}
          value={values.body}
          error={error ? true : false}
        />
        <Button type="submit" color="teal">
          Submit
        </Button>
      </Form.Field>
    </Form>
    {errors && (
      <div className="ui error message"  style={{marginBottom: 20}}>
        <ul className="list">
          <li>{errors}</li>
        </ul>
      </div>
    )}
    </>
  );
};

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
