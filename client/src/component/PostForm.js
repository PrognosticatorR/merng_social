import { Form, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import { FETCH_POSTS_QUERY } from "../util/graphql";
import { useForm } from "../util/hooks";

export const PostForm = () => {
   const { values, onChange, onSubmit } = useForm(createPostCallback, { body: "" });

   const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
      variables: values,
      update(proxy, result) {
         let data = proxy.readQuery({
            query: FETCH_POSTS_QUERY,
         });
         let newData = [...data.getPosts];
         newData = [result.data.createPost, ...newData];
         proxy.writeQuery({
            query: FETCH_POSTS_QUERY,
            data: {
               ...data,
               getPosts: {
                  newData,
               },
            },
         });
         values.body = "";
      },
   });

   function createPostCallback() {
      createPost();
   }
   return (
      <Form onSubmit={onSubmit}>
         <h2>Create Post:</h2>
         <Form.Field>
            <Form.Input
               placeholder="Write here!"
               value={values.body}
               onChange={onChange}
               name="body"
            />
            <Button type="submit" color="teal">
               {" "}
               submit
            </Button>
         </Form.Field>
      </Form>
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
