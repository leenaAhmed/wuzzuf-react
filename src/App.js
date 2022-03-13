import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import EditProfile from "./components/editProfile/editProfile";
import ForgetPassword from "./components/registration/forgetPassword";
import Login from "./components/registration/login";
import SignUp from "./components/registration/sign-up";
import AuthProvider from "./contexts/authContext";
import Navbar from "./components/navbar/navbar";
import { LanguageProvider } from "./contexts/languageContext";
import ExplorPage from "./pages/explorPage";
import PrivateRoute from "./components/PrivateRoute";
import JobDetailsPage from "./pages/jobdetailsPage";
import SavedPage from "./pages/savedPage";
import ApplyToJob from "./components/jobModule/applayToJob/index";
import AboutUs from "./components/aboutUs/AboutUs";
import ContactUs from "./components/contactUs/ContactUs";
import PageAppliction from "./components/jobAppliction/applictionPage";

function App() {
  const [lang, setLang] = useState("English");

  return (
    <>
      <Router>
        <AuthProvider>
          <LanguageProvider value={{ lang, setLang }}>
            <Navbar />
            <Switch>
              <Route path="/" exact component={ExplorPage} />
              <Route
                path="/jopdetails/:companyId/:jobId"
                component={JobDetailsPage}
              />
              <Route path="/saved" exact component={SavedPage} />
              <Route
                path="/applytojob/:companyId/:jobId"
                exact
                component={ApplyToJob}
              />
              <Route path="/sign-up" exact component={SignUp} />
              <Route path="/login" exact component={Login} />
              <Route path="/forget-password" exact component={ForgetPassword} />
              <Route path="/profile" component={EditProfile} />
              <Route path="/about-us" component={AboutUs} />
              <Route path="/contact-us" component={ContactUs} />
              <Route path="/applications-page" component={PageAppliction} />
            </Switch>
          </LanguageProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
