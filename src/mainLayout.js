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
              <Route path="/main" exact component={ExplorPage} />
              <Route
                path="/main/jopdetails/:companyId/:jobId"
                component={JobDetailsPage}
              />
              <Route path="/main/saved" exact component={SavedPage} />
              <Route
                path="/main/applytojob/:companyId/:jobId"
                exact
                component={ApplyToJob}
              />
              <Route path="/main/search" exact component={SearchPage} />
              <Route path="/main/profile" exact component={EditProfile} />
              <Route path="/main/about-us" exact component={AboutUs} />
              <Route path="/main/contact-us" exact component={ContactUs} />
              <Route path="/main/applications-page" exact component={PageAppliction} />
            </Switch>
        
      </Router>
    </>
  );
}

export default MainLayout;
