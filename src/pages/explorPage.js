import { Link } from "react-router-dom";
import Card from "../components/jobModule/exploer/index";
import React, { useEffect, useState, useContext } from "react";
import { languageContext } from "./../contexts/languageContext";
import { useAuth } from "./../contexts/authContext";
import { db } from "./../firebase";
import explorjob from "../services/explorjob";
import saved from "../services/saved";
import ar from "./../language/explore/ar.json";
import en from "./../language/explore/en.json";
import Footer from "./../components/footer/index";
function ExplorPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { lang } = useContext(languageContext);
  const [json, setJson] = useState(en);

  const [userDetails, setUserDetails] = useState({});
  const { currentUser } = useAuth();
  const [save, setInfoSave] = useState([]);

  const loadsavedjobs = () => {
    saved
      .getSavedJob()
      .then((response) => {
        setInfoSave(response);
      })
      .catch((error) => {
        console.log("Error  " + error);
      });
  };
  console.log(save);

  useEffect(() => {
    if (lang === "English") {
      setJson(en);
    }
    if (lang === "العربية") {
      setJson(ar);
    }
  }, [lang]);
  // const savedJob = () => {
  //   save.forEach((save) => {
  //     saced = save.data.saved;
  //     console.log(save.data.saved);
  //   });
  // };

  useEffect(() => {
    explorjob
      .getAlljobs()
      .then((response) => {
        setTimeout(() => {
          setMenuItems(response);
          setIsLoading(false);
        }, 1000);
        console.log(response);

        setIsLoading(true);
      })
      .catch((error) => {
        setIsLoading(false);

        console.log("Error  " + error);
      });
    loadsavedjobs();
  }, []);

  useEffect(() => {
    if (currentUser) {
      const userId = currentUser.uid;
      console.log(userId);
      db.collection("users")
        .doc(userId)
        .onSnapshot((doc) => {
          if (doc.exists) {
            setUserDetails(doc.data());
          }
        });
      console.log(userDetails);
    }
  }, [currentUser]);

  return (
    <>
      <div className="container " dir={lang === "English" ? "ltr" : "rtl"}>
        <div className="row">
          <div className=" my-3">
            <>
              <h4> {json.title}</h4>
              <p className=" fw-light">
                {json.subtitle}
                <Link to={"/career-interests"}>{json.interests}</Link>
              </p>
            </>
          </div>

          <div
            className="jobs__container col-md-6 col-lg-8 col-md-12"
            id="listOfJobs"
          >
            {isLoading === true && (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            {lang === "English"
              ? menuItems &&
                menuItems.map((post, index) => (
                  <div key={post.id}>
                    <Card
                      id={post.id}
                      companyId={post.companyId}
                      componyName={post.data.companyName}
                      companyIndustry={post.data.companyIndustry}
                      city={post.data.companyCountry}
                      ImageUrl={post.data.logo}
                      saved={save.map((sav) => sav.data.jobId)}
                      title={post.data.jobTitle}
                      categories={post.data.jobCategories}
                      country={post.data.Country}
                      dateTime={post.data.date.Time}
                      jobtime={post.data.jobType}
                      experience={post.data.experience}
                      careerLevel={post.data.careerLevel}
                      timestamp={post.data.date}
                    />
                  </div>
                ))
              : menuItems &&
                menuItems.map((post, index) => (
                  <div key={post.id}>
                    <Card
                      id={post.id}
                      companyId={post.companyId}
                      componyName={post.data.companyName}
                      companyIndustry={post.data.companyIndustry}
                      city={post.data.companyCountry}
                      ImageUrl={post.data.logo}
                      saved={post.data.saved}
                      title={post.data.jobTitleAR}
                      categories={post.data.jobCategoriesAR}
                      country={post.data.Country}
                      dateTime={post.data.date.Time}
                      jobtime={post.data.jobTypeAR}
                      experience={post.data.experienceAR}
                      careerLevel={post.data.careerLevelAR}
                      timestamp={post.data.date}
                    />
                  </div>
                ))}
          </div>
          {/*prograss */}
          <div className="jobs__prograss col-lg-3 col-md-12 col-12 ">
            <div className="card">
              <div className="card-body d-flex">
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                  <img
                    className="img-fluid nav-profile-img img-thumbnail rounded-circle"
                    src={
                      userDetails.imageUrl
                        ? userDetails.imageUrl
                        : "/default.png"
                    }
                    alt={userDetails.firstName}
                  />
                </div>
                <div className="col-lg col-md ms-4">
                  <span className="user-name mt-1 text-capitalize">
                    {userDetails.firstName + " " + userDetails.lastName}
                  </span>
                  <p className="text-capitalize text-muted">
                    {userDetails.title}
                  </p>
                </div>
              </div>
              <div className="px-3 py-2">
                <h5 className="fs-6"> {json.sidebarskill}</h5>
                <p className="text-muted fs-6 fw-light">
                  {json.sidebarSubskill}
                </p>
                <button className="btn btn-outline-primary">
                  {json.sidebarskill}
                </button>
              </div>
            </div>
          </div>
          {/*prograss */}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ExplorPage;
