import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import EditProfile from "./components/editProfile/editProfile";
import Navbar from "./components/navbar/navbar";
import ExplorPage from "./pages/explorPage";
import JobDetailsPage from "./pages/jobdetailsPage";
import SavedPage from "./pages/savedPage";
import ApplyToJob from "./components/jobModule/applayToJob/index";
import AboutUs from "./components/aboutUs/AboutUs";
import ContactUs from "./components/contactUs/ContactUs";
import PageAppliction from "./components/jobAppliction/applictionPage";
import SearchPage from "./pages/search";
function MainLayout() {
  const [lang, setLang] = useState("English");
  return (
    <>
      <Router>
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
              <Route path="/search" exact component={SearchPage} />
              <Route path="/profile" exact component={EditProfile} />
              <Route path="/about-us" exact component={AboutUs} />
              <Route path="/contact-us" exact component={ContactUs} />
              <Route path="/applications-page" exact component={PageAppliction} />
            </Switch>
        
      </Router>
    </>
  );
}

export default MainLayout;
