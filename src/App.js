import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './components/contexts/AuthContext';
import Signup from './components/Signup';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import ForgetPassword from './components/ForgetPassword';
import ProfileUpdate from './components/ProfileUpdate';
function App() {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/"  component={Dashboard} />
              <PrivateRoute  path="/update-profile"  component={ProfileUpdate} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forget-password" component={ForgetPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
