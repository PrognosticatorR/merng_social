import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./app.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MennuBar from "./component/MenuBar";
import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/authRoute";

function App() {
   return (
      <AuthProvider>
         <Router>
            <Container>
               <MennuBar />
               <Route exact path="/" component={Home}></Route>
               <AuthRoute exact path="/login" component={Login} />
               <AuthRoute exact path="/register" component={Register} />
            </Container>
         </Router>
      </AuthProvider>
   );
}

export default App;
