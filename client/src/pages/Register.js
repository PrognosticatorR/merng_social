import gql from "graphql-tag";
import { useState, useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";
const Register = (props) => {
   const context = useContext(AuthContext);
   const [errors, setErrors] = useState({});

   const { onChange, onSubmit, values } = useForm(registerUser, {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
   });

   const [addUser, { loading }] = useMutation(REGISTER_USER, {
      update(_, { data: { register: userData } }) {
         setErrors({});
         context.login(userData);
         props.history.push("/");
      },
      onError(err) {
         setErrors(err.graphQLErrors[0].extensions.errors);
      },
      variables: values,
   });

   function registerUser() {
      addUser();
   }
   return (
      <div className="form-container">
         <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
            <h1>Register</h1>
            <Form.Input
               type="text"
               label="username"
               placeholder="Username"
               name="username"
               error={errors.username ? true : false}
               valuw={values.username}
               onChange={onChange}
            />
            <Form.Input
               type="email"
               label="email"
               placeholder="email"
               name="email"
               error={errors.email ? true : false}
               valuw={values.email}
               onChange={onChange}
            />
            <Form.Input
               type="password"
               label="password"
               placeholder="password"
               name="password"
               error={errors.password ? true : false}
               valuw={values.password}
               onChange={onChange}
            />
            <Form.Input
               type="password"
               label="confirmPassword"
               placeholder="confirmPassword"
               name="confirmPassword"
               valuw={values.confirmPassword}
               error={errors.confirmPassword ? true : false}
               onChange={onChange}
            />
            <Button type="submit" primary>
               Register
            </Button>
         </Form>
         {Object.keys(errors).length > 0 && (
            <div className="ui error message">
               <ul className="list">
                  {Object.values(errors).map((value) => (
                     <li key={value}>{value}</li>
                  ))}
               </ul>
            </div>
         )}
      </div>
   );
};

const REGISTER_USER = gql`
   mutation register(
      $username: String!
      $email: String!
      $password: String!
      $confirmPassword: String!
   ) {
      register(
         registerInput: {
            username: $username
            email: $email
            password: $password
            confirmPassword: $confirmPassword
         }
      ) {
         id
         email
         username
         createdAt
         token
      }
   }
`;

export default Register;
