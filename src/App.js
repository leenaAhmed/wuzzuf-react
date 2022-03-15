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
import ExplorPage from "./pages/explorPage";
import SavedPage from "./pages/savedPage";
import ApplyToJob from "./components/jobModule/applayToJob";
import SearchPage from "./pages/search";
import EditProfile from "./components/editProfile/editProfile";
import AboutUs from "./components/aboutUs/AboutUs";
import ContactUs from "./components/contactUs/ContactUs";
import PageAppliction from "./components/jobAppliction/applictionPage";
import Navbar from "./components/navbar/navbar";
import JobDetailsPage from "./pages/jobdetailsPage";
function App() {
  const [lang, setLang] = useState("English");
  return (
    <>
      <Router>
        <AuthProvider>
          <LanguageProvider value={{ lang, setLang }}>
            {/* <ProtectedRoute path="/" exact component={MainLayout} /> */}

            <Navbar />
            <Switch>
              <LoginProtectedRoute
                path="/registration"
                exact
                component={Registration}
              />
              <ProtectedRoute path="/" exact component={ExplorPage} />
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
              <Route path="/search/:searchTerm" exact component={SearchPage} />
              <Route
                path="/profile/general-info"
                exact
                component={EditProfile}
              />
              <Route path="/about-us" exact component={AboutUs} />
              <Route path="/contact-us" exact component={ContactUs} />
              <Route
                path="/applications-page"
                exact
                component={PageAppliction}
              />
            </Switch>
          </LanguageProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
