import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import ForgetPassword from './components/registration/forgetPassword';
import Login from './components/registration/login';
import SignUp from './components/registration/sign-up';
import Test from './components/test';
import AuthProvider from './contexts/authContext';



import { LanguageProvider } from './contexts/languageContext';

function App() {
  const [lang, setLang] = useState("English");

  return (
    <>
      <Router>
        <AuthProvider>
          <LanguageProvider value={{ lang, setLang }}>
            <Route path="/login" exact component={Login} />
            <Route path="/sign-up" exact component={SignUp} />
            <Route path="/forget-password" exact component={ForgetPassword} />
            <Route path="/" exact component={Test} />
          </LanguageProvider>
        </AuthProvider>
      </Router>


    </>


  );
}

export default App;
