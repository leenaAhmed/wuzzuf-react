import { Link } from "react-router-dom";
import explorjob from "../services/explorjob";
import Card from "../components/jobModule/exploer/index";
import "./SearchStyle.scss";
import SearchCard from "./../components/search";
import React, { useEffect, useState, useContext } from "react";
import { languageContext } from "./../contexts/languageContext";
function SearchPage(props) {
  const [jobsItems, setjobItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { lang } = useContext(languageContext);

  const filtration = (e) => {};

  useEffect(() => {
    explorjob
      .getAlljobs()
      .then((response) => {
        setTimeout(() => {
          setjobItems(response);
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
  return (
    <>
      <SearchCard />
      <div className="container " dir={lang === "English" ? "ltr" : "rtl"}>
        <div className="row mt-5">
          <aside className="col-md-3 col-6">
            <div className="row">
              <div className="col-lg-12 d-lg-block">
                <div className="sidebar">
                  <ul className="list-group ">
                    <a to="" activeClassName="sidebar__actived">
                      <li className="list-group-item fw-bold">Filters</li>
                    </a>

                    <a to="" activeClassName="sidebar__actived">
                      <li className="list-group-itemx">
                        <h6 className="fw-bold">Country</h6>
                        <input
                          type="checkbox"
                          id="flexCheckIndeterminate"
                          name="Egypt"
                          onChange={(s) => {
                            filtration(s);
                          }}
                          className="form-check-input"
                        ></input>
                        <label
                          class="form-check-label ms-2"
                          htmlFor="flexCheckIndeterminate"
                        >
                          Egypt
                        </label>
                        <br />
                        <input
                          type="checkbox"
                          id="flexCheckIndeterminate"
                          name="Saudi Arabia"
                          onChange={(s) => {
                            filtration(s);
                          }}
                          className="form-check-input"
                        ></input>
                        <label
                          class="form-check-label ms-2 mb-2"
                          htmlFor="flexCheckIndeterminate"
                        >
                          Saudi Arabia
                        </label>
                        <br />
                      </li>
                    </a>
                    <a to="" activeClassName="sidebar__actived">
                      <li className="list-group-itemx">
                        <h6 className="fw-bold">City</h6>
                        <input
                          type="checkbox"
                          id="flexCheckIndeterminate"
                          name="Cairo"
                          onChange={(s) => {
                            filtration(s);
                          }}
                          className="form-check-input"
                        ></input>
                        <label
                          class="form-check-label ms-2"
                          htmlFor="flexCheckIndeterminate"
                        >
                          Cairo
                        </label>
                        <br />
                        <input
                          type="checkbox"
                          id="flexCheckIndeterminate"
                          name="Giza"
                          onChange={(s) => {
                            filtration(s);
                          }}
                          className="form-check-input"
                        ></input>
                        <label
                          class="form-check-label ms-2 mb-2"
                          htmlFor="flexCheckIndeterminate"
                        >
                          Giza
                        </label>
                        <br />
                      </li>
                    </a>
                    <a to="" activeClassName="sidebar__actived">
                      <li className="list-group-itemx ">
                        <h6 className="fw-bold">Years of experiance</h6>
                        <input
                          type="checkbox"
                          id="flexCheckIndeterminate"
                          name="1 year"
                          onChange={(s) => {
                            filtration(s);
                          }}
                          className="form-check-input"
                        ></input>
                        <label
                          class="form-check-label ms-2"
                          htmlFor="flexCheckIndeterminate"
                        >
                          1 year
                        </label>
                        <br />
                        <input
                          type="checkbox"
                          id="flexCheckIndeterminate"
                          name=" 2 years"
                          onChange={(s) => {
                            filtration(s);
                          }}
                          className="form-check-input"
                        ></input>
                        <label
                          class="form-check-label ms-2"
                          htmlFor="flexCheckIndeterminate"
                        >
                          2 years
                        </label>
                        <br />
                        <input
                          type="checkbox"
                          id="flexCheckIndeterminate"
                          name="3 years"
                          onChange={(s) => {
                            filtration(s);
                          }}
                          className="form-check-input"
                        ></input>
                        <label
                          class="form-check-label ms-2"
                          htmlFor="flexCheckIndeterminate"
                        >
                          3 years
                        </label>
                        <br />
                        <input
                          type="checkbox"
                          id="flexCheckIndeterminate"
                          name="No Experience"
                          onChange={(s) => {
                            filtration(s);
                          }}
                          className="form-check-input"
                        ></input>
                        <label
                          class="form-check-label ms-2 mb-2"
                          htmlFor="flexCheckIndeterminate"
                        >
                          No Experiance
                        </label>
                        <br />
                      </li>
                    </a>

                    <li className="list-group-itemx list-height">
                      <h6 className="fw-bold">Job category</h6>
                      <input
                        type="checkbox"
                        id="flexCheckIndeterminate"
                        name="Engineering"
                        onChange={(s) => {
                          filtration(s);
                        }}
                        className="form-check-input"
                      ></input>
                      <label
                        class="form-check-label ms-2"
                        htmlFor="flexCheckIndeterminate"
                      >
                        Engineering
                      </label>
                      <br />
                      <input
                        type="checkbox"
                        id="flexCheckIndeterminate"
                        name="IT/Software Development"
                        onChange={(s) => {
                          filtration(s);
                        }}
                        className="form-check-input"
                      ></input>
                      <label
                        class="form-check-label ms-2"
                        htmlFor="flexCheckIndeterminate"
                      >
                        IT/Software Development
                      </label>
                      <br />
                    </li>

                    <a to="" activeClassName="sidebar__actived">
                      <li className="list-group-itemx ">
                        <h6 className="fw-bold">Job type</h6>
                        <input
                          type="checkbox"
                          id="flexCheckIndeterminate"
                          name="Part time"
                          onChange={(s) => {
                            filtration(s);
                          }}
                          className="form-check-input"
                        ></input>
                        <label
                          class="form-check-label ms-2"
                          htmlFor="flexCheckIndeterminate"
                        >
                          Part time
                        </label>
                        <br />
                        <input
                          type="checkbox"
                          id="flexCheckIndeterminate"
                          name="Full time"
                          onChange={(s) => {
                            filtration(s);
                          }}
                          className="form-check-input"
                        ></input>
                        <label
                          class="form-check-label ms-2 mb-2"
                          htmlFor="flexCheckIndeterminate"
                        >
                          Full time
                        </label>
                        <br />
                      </li>
                    </a>
                  </ul>
                </div>
              </div>
            </div>
          </aside>

          <div
            className="jobs__container col-md-6 col-lg-6 col-md-6"
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
              ? jobsItems &&
                jobsItems.map((post, index) => (
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
              : jobsItems &&
                jobsItems.map((post, index) => (
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
        </div>
      </div>
    </>
  );
}

export default SearchPage;
