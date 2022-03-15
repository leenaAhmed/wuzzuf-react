import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import AuthProvider from "./contexts/authContext";
import { LanguageProvider } from "./contexts/languageContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginProtectedRoute from "./components/loginProtectedRoute";
import Registration from "./components/registration/registration";
import MainLayout from "./mainLayout";
function App() {
  const [lang, setLang] = useState("English");
  return (
    <>
      <Router>
        <AuthProvider>
          <LanguageProvider value={{ lang, setLang }}>
            <LoginProtectedRoute path="/registration" exact component={Registration} />
            <ProtectedRoute path="/" exact component={MainLayout} />
          </LanguageProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
