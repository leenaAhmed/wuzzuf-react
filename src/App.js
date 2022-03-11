import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import EditProfile from './components/editProfile/editProfile';
import ForgetPassword from './components/registration/forgetPassword';
import Login from './components/registration/login';
import SignUp from './components/registration/sign-up';
import Test from './components/test';
import AuthProvider from './contexts/authContext';
import Navbar from './components/navbar/navbar';
import { LanguageProvider } from './contexts/languageContext';
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [lang, setLang] = useState("English");

  return (
    <>
      <Router>
        <AuthProvider>
          <LanguageProvider value={{ lang, setLang }}>
            <Navbar />
            <Switch>
              <Route path='/' exact component={Test} />
              <Route path="/sign-up" exact component={SignUp} />
              <Route path="/login" exact component={Login} />
              <Route path="/forget-password" exact component={ForgetPassword} />
              <Route path="/profile" component={EditProfile} />
            </Switch>
          </LanguageProvider>
        </AuthProvider>
      </Router>


    </>


  );
}

export default App;
