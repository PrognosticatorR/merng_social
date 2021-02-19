import gql from "graphql-tag";
import { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
const Register = (props) => {
   const [errors, setErrors] = useState({});
   const [values, setValues] = useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
   });

   const [addUser, { loading }] = useMutation(REGISTER_USER, {
      update(_, result) {
         props.history.push("/");
         console.log(result);
      },
      onError(err) {
         setErrors(err.graphQLErrors[0].extensions.errors);
      },
      variables: values,
   });
   function onChange(e) {
      setValues({ ...values, [e.target.name]: e.target.value });
      setErrors({});
   }

   function handleSubmit(e) {
      e.preventDefault();
      addUser();
   }

   return (
      <div className="form-container">
         <Form onSubmit={handleSubmit} noValidate className={loading ? "loading" : ""}>
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
