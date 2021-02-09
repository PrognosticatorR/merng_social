const Post = require("../../models/Post");
const checkAuth = require("../../utils/checkAuth");
const { AuthenticationError } = require("apollo-server");

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
         const user = checkAuth(context);
         const newPost = new Post({
            body,
            user: user.id,
            username: user.username,
            createdAt: new Date().toISOString(),
         });
         const post = await newPost.save();
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
   },
};
