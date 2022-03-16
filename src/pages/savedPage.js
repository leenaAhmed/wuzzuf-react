import SavedCard from "./../components/jobModule/saved/index";
import React, { useState, useEffect, useContext } from "react";
import { languageContext } from "./../contexts/languageContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import ar from "./../language/explore/ar.json";
import en from "./../language/explore/en.json";
import download from "./../assets/download.png";
import saved from "../services/saved";

function SavedPage(props) {
  const [save, setInfoSave] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { lang } = useContext(languageContext);
  const [json, setJson] = useState(en);

  const HandleClick = (id) => {
    let jobId = id;
    saved
      .deletSavedJob(jobId)
      .then(() => {
        localStorage.removeItem("id");
        let list = save.filter((item) => {
          console.log("item", item);
          return item.id !== id;
        });
        setInfoSave(list);
        toast.success("saved delted succesfully !", {
          position: toast.POSITION.TOP_LEFT
        });
      })
      .catch((err) => {
        toast.error(err.message, {
          position: toast.POSITION.TOP_LEFT
        });
      });
  };
  //   const [count, setCount] = useState();
  useEffect(() => {
    if (lang === "English") {
      setJson(en);
    }
    if (lang === "العربية") {
      setJson(ar);
    }
  }, [lang]);
  const loadsavedjobs = () => {
    saved
      .getSavedJob()
      .then((response) => {
        setTimeout(() => {
          setInfoSave(response);
          setIsLoading(false);
        }, 1000);

        setIsLoading(true);
      })
      .catch((error) => {
        setIsLoading(false);

        console.log("Error  " + error);
      });
  };

  useEffect(() => {
    loadsavedjobs();
  }, []);
  return (
    <>
      <div
        className="col-md-6 offset-md-3 mt-4"
        dir={lang === "English" ? "ltr" : "rtl"}
      >
        <div className="jobs__container col-lg-10 col-xs-12" id="listSaved">
          {save === undefined ||
            (isLoading === true && (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ))}
          <div>
            <h4>
              <span id="jobNumSaved"> </span> {json.savedJob}
            </h4>
          </div>

          {save.map((post, index) => {
            return (
              <div key={post.id}>
                <div className="job__detail bg-body card bx-1 bt-1 mb-3">
                  <header className="job__description d-flex justify-content-between border-bottom mx-2 pb-2">
                    <div className="card-body">
                      <div>
                        <Link
                          to={`/jopdetails/${post.companyId}/${post.id}`}
                          className="app_blue_color"
                        >
                          <span className=" job_title">
                            {post.data.jobTitle}
                          </span>
                        </Link>
                        <i className="badge text-secondary bg-light fw-light">
                          {post.data.jobType}
                        </i>
                        <p>
                          <small className="text-dark fw-normal">
                            {post.data.companyName}
                          </small>

                          <span>-</span>
                          <small className="text-secondary ">
                            {post.data.companyCountry}
                          </small>
                        </p>
                      </div>
                      <div className="text-secondary fs-6">
                        <small>
                          {post.data.jobCategories} . {post.data.experience} .
                          {post.data.companyIndustry} , {post.data.careerLevel}
                        </small>
                        <time className="text-success"> {json.day}</time>
                      </div>
                    </div>
                    <a href="company" className="mt-4 me-4">
                      <img
                        src={`${!post.data.logo ? download : post.data.logo}`}
                        width="85px"
                        alt={post.data.jobTitle}
                      />
                    </a>
                  </header>
                  <div className="job__reacts d-flex align-items-center ps-3 mt-1  mb-1 text-secondary">
                    <button
                      id="save"
                      className={`btn  text-secondary`}
                      onClick={() => HandleClick(post.id)}
                    >
                      <FontAwesomeIcon
                        icon={faBookmark}
                        className="me-1 ms-1"
                      />
                      {json.UnSave}
                    </button>
                    <button className="btn   text-secondary hovering_btn ">
                      <FontAwesomeIcon icon={faShare} className="me-1 ms-1" />
                      {json.share}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default SavedPage;
