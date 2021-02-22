import gql from "graphql-tag";
export const FETCH_POSTS_QUERY = gql`
   {
      getPosts {
         id
         body
         createdAt
         username
         likes {
            username
         }
         commentCount
         likeCount
         comments {
            id
            username
            createdAt
            body
         }
      }
   }
`;
