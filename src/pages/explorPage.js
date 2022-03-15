import { Link } from "react-router-dom";
import Card from "../components/jobModule/exploer/index";
import React, { useEffect, useState, useContext } from "react";
import { languageContext } from "./../contexts/languageContext";
import { useAuth } from "./../contexts/authContext";
import { db } from "./../firebase";
import explorjob from "../services/explorjob";
function ExplorPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { lang } = useContext(languageContext);
  const [userDetails, setUserDetails] = useState({});
  const { currentUser } = useAuth();

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
            {lang === "English" ? (
              <>
                <h4> Explore New Career Opportunities</h4>
                <p className=" fw-light">
                  To get relevant content in the feed below,
                  <Link to={"/career-interests"}>
                    update your career interests
                  </Link>
                </p>
              </>
            ) : (
              <>
                <h4>اكتشف فرص عمل جديدة</h4>
                <p className=" fw-light">
                  للحصول على محتوى ذي صلة في الخلاصة أدناه
                  <Link to={"/career-interests"}>
                    &nbsp;قم بتحديث اهتماماتك المهنية &nbsp;
                  </Link>
                </p>
              </>
            )}
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
                      saved={post.data.saved}
                      title={post.data.jobTitle}
                      categories={post.data.jobCategories}
                      country={post.data.Country}
                      dateTime={post.data.date.Time}
                      jobtime={post.data.jobType}
                      experience={post.data.experience}
                      careerLevel={post.data.careerLevel}
                      timestamp={post.data.date}
                      save={"Save"}
                      Share={"Share"}
                      Hide={"Hide"}
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
                      careerLevel={post.data.careerLevel}
                      timestamp={post.data.date}
                      save={"حفظ"}
                      Share={"مشاركة"}
                      Hide={"اخفاء"}
                    />
                  </div>
                ))}
          </div>
          {/*prograss */}
          <div className="jobs__prograss col-lg-3 col-md-12 col-12 ">
            {lang === "English" ? (
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
                  <h5 className="fs-6"> Add Skills</h5>
                  <p className="text-muted fs-6 fw-light">
                    Users with 10+ related skills have more chances to get
                    selected by employers
                  </p>
                  <button className="btn btn-outline-primary">Add Skill</button>
                </div>
              </div>
            ) : (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">تحسين صفحتك الشخصية</h5>
                  <small className="mb-2 text-muted"></small>
                  <div className="progress">
                    <div
                      className="progress-bar bg-warning"
                      role="progressbar"
                      style={{ width: " 63%" }}
                      aria-valuenow="63"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <small className="mt-3 text-muted">صفختك قوية بنسبة 67</small>
                </div>
              </div>
            )}
          </div>
          {/*prograss */}
        </div>
      </div>
    </>
  );
}

export default ExplorPage;
