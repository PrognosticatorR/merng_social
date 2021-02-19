import { useState } from "react";
import { Button, Form } from "semantic-ui-react";
const Login = () => {
   const [values, setValues] = useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
   });

   function handleSubmit(e) {
      e.preventDefault();
      console.log(values);
   }
   function onChange(e) {
      setValues({ ...values, [e.target.name]: e.target.value });
   }
   return (
      <div>
         <Form onSubmit={handleSubmit} noValidate>
            <h1>Register</h1>
            <Form.Input
               label="username"
               placeholder="Username"
               name="username"
               valuw={values.username}
               onChange={onChange}
            />
            <Form.Input
               label="email"
               placeholder="email"
               name="email"
               valuw={values.email}
               onChange={onChange}
            />
            <Form.Input
               label="password"
               placeholder="password"
               name="password"
               valuw={values.password}
               onChange={onChange}
            />
            <Form.Input
               label="confirmPassword"
               placeholder="confirmPassword"
               name="confirmPassword"
               valuw={values.confirmPassword}
               onChange={onChange}
            />
            <Button type="submit" primary>
               Register
            </Button>
         </Form>
      </div>
   );
};

export default Login;
