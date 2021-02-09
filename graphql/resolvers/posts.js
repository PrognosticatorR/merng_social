const Post = require("../../models/Post");
const checkAuth = require("../../utils/checkAuth");
const { AuthenticationError, UserInputError } = require("apollo-server");

module.exports = {
   Query: {
      async getPosts() {
         try {
            const posts = Post.find().sort({ createdAt: -1 });
            return posts;
         } catch (error) {
            throw new Error(error);
         }
      },
      async getPost(_, { postId }) {
         try {
            const post = await Post.findById(postId);
            if (post) {
               return post;
            }
            throw new Error("Post not found!");
         } catch (error) {
            throw new Error(error);
         }
      },
   },
   Mutation: {
      async createPost(_, { body }, context) {
         if (body.trim() === "") throw new Error("Post body must not be Empty!");
         const user = checkAuth(context);
         const newPost = new Post({
            body,
            user: user.id,
            username: user.username,
            createdAt: new Date().toISOString(),
         });
         const post = await newPost.save();
         context.pubsub.publish("NEW_POST", {
            newPost: post,
         });
         return post;
      },
      async deletePost(_, { postId }, context) {
         const user = checkAuth(context);
         try {
            const post = await Post.findById(postId);
            if (!post) throw new Error("post not found!");
            if (user.username === post.username) {
               await post.delete();
               return "Post deleted successfully!";
            } else {
               throw new AuthenticationError("Action not allowed!");
            }
         } catch (error) {
            throw new Error(error);
         }
      },
      async likePost(_, { postId }, context) {
         const { username } = checkAuth(context);
         try {
            const post = await Post.findById(postId);
            if (!post) throw new Error("post not found!");

            if (post) {
               if (post.likes.find((like) => like.username === username)) {
                  post.likes = post.likes.filter((like) => like.username !== username);
               } else {
                  post.likes.push({
                     username,
                     createdAt: new Date().toISOString(),
                  });
               }
               await post.save();
               return post;
            } else {
               throw new UserInputError("Post not found!");
            }
         } catch (error) {
            throw new UserInputError(error);
         }
      },
   },
   Subscription: {
      newPost: {
         subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_POST"),
      },
   },
};
