import { Card, Label, Icon, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
const PostCard = ({
   post: { body, createdAt, commentCount, likes, likeCount, id, username },
}) => {
   const likePost = () => {
      console.log("like post");
   };
   const commentOnPost = () => {
      console.log("like post");
   };
   return (
      <Card fluid>
         <Card.Content>
            <Image
               floated="right"
               size="mini"
               src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            />
            <Card.Header>{username}</Card.Header>
            <Card.Meta as={Link} to={`/posts/${id}`}>
               {moment(createdAt).fromNow(true)}
            </Card.Meta>
            <Card.Description>{body}</Card.Description>
         </Card.Content>
         <Card.Content extra>
            <Button
               onClick={likePost}
               basic
               size="tiny"
               color="teal"
               icon="heart"
               label={{
                  basic: true,
                  color: "teal",
                  pointing: "left",
                  content: likeCount,
               }}
            />
            <Button
               labelPosition="right"
               onClick={commentOnPost}
               basic
               size="tiny"
               color="blue"
               icon="comments"
               label={{
                  basic: true,
                  color: "blue",
                  pointing: "left",
                  content: commentCount,
               }}
            />
         </Card.Content>
      </Card>
   );
};

export default PostCard;
