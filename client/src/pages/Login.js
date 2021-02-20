import gql from "graphql-tag";
import { useState, useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";

const Login = (props) => {
   const context = useContext(AuthContext);
   const [errors, setErrors] = useState({});

   const { onChange, onSubmit, values } = useForm(loginUserCB, {
      username: "",
      password: "",
   });

   const [loginUser, { loading }] = useMutation(LOGIN_USER, {
      update(_, { data: { login: userData } }) {
         setErrors({});
         context.login(userData);
         props.history.push("/");
      },
      onError(err) {
         setErrors(err.graphQLErrors[0].extensions.errors);
      },
      variables: values,
   });

   function loginUserCB() {
      loginUser();
   }

   return (
      <div className="form-container">
         <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
            <h1>Login</h1>
            <Form.Input
               type="text"
               label="Username"
               placeholder="username"
               name="username"
               error={errors.general ? true : false}
               valuw={values.username}
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
            <Button type="submit" primary>
               Login
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

const LOGIN_USER = gql`
   mutation login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
         id
         email
         username
         createdAt
         token
      }
   }
`;

export default Login;
