const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");
const { SECRET } = require("../config");

module.exports = (context) => {
   const authHeader = context.req.headers.authorization;
   if (authHeader) {
      const token = authHeader.split("Bearer ")[1];
      if (token) {
         try {
            const user = jwt.verify(token, SECRET);
            return user;
         } catch (error) {
            throw new AuthenticationError("Invalid/Expired token");
         }
      }
      throw new Error("Authentication  token must me 'Bearer [token]' ");
   }
   throw new Error("Authorization  header must me provided ");
};
