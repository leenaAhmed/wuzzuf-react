import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShare,
  faEyeSlash,
  faBookmark
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { languageContext } from "../../../contexts/languageContext";
import ShareModel from "./../model/index";
import download from "./../../../assets/download.png";
import saved from "../../../services/saved";
import ar from "../../../language/explore/ar.json";
import en from "../../../language/explore/en.json";
import "./style.scss";

const ExplorCard = ({ item }) => {
  console.log(item);
  const [showModal, setShowModal] = useState(false);
  const [save, setSave] = useState(false);
  const { lang, setLang } = useContext(languageContext);
  const [json, setJson] = useState(en);
  const handelShare = (id) => {
    setShowModal(!showModal);
  };
  const handleCloseModal = () => {
    setShowModal(!showModal);
  };
  useEffect(() => {
    if (lang === "English") {
      setJson(en);
    }
    if (lang === "العربية") {
      setJson(ar);
    }
  }, [lang]);

  let id = localStorage.getItem("id");
  const HandleClick = (jobid) => {
    console.log(jobid);
    saved
      .addJobtoSavedPage(item.data)
      .then(() => {
        setSave(true);
        localStorage.setItem("id", jobid);
        toast.success("saved   succesfully !", {
          position: toast.POSITION.TOP_LEFT
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message, {
          position: toast.POSITION.TOP_LEFT
        });
      });
  };

  const timestampToString = (timestamp) => {
    const mydate = new Date(timestamp.toDate());
    mydate.toLocaleDateString();

    var date2 = new Date();
    console.log(timestamp.seconds);
    var Difference_In_Time = date2.getUTCDate() - mydate.getUTCDate();
    console.log(Difference_In_Time);

    return Difference_In_Time;
  };

  if (lang === "English") {
  }
  return (
    <>
      <div className="job__detail bg-body card bx-1 bt-1 mb-3">
        <header className="job__description d-flex justify-content-between border-bottom  mx-3 pb-2">
          <div className="card-body ">
            <div>
              <Link
                to={`/jopdetails/${item.companyId}/${item.id}`}
                className="app_blue_color"
              >
                <span className="app_blue_color job_title">
                  {lang === "English" ? (
                    <span>{item.data.jobTitle}</span>
                  ) : (
                    <span>{item.data.jobTitleAR}</span>
                  )}
                </span>
              </Link>
              <i className="badge text-secondary bg-light fw-light">
                {lang === "English" ? (
                  <span> {item.data.jobType}</span>
                ) : (
                  <span>{item.data.jobTypeAR}</span>
                )}
              </i>
              <p>
                <small className="text-dark text-normal job_title">
                  {lang === "English" ? (
                    <span> {item.data.companyName}</span>
                  ) : (
                    <span>{item.data.jobTypeAR}</span>
                  )}
                </small>

                <span>-</span>
                <small className="text-secondary ">
                  {item.data.companyCountry}
                </small>
              </p>
            </div>
            <div className="text-secondary fs-6">
              {lang === "English" ? (
                <small>
                  {item.data.careerLevel} . {item.data.jobCategories} .
                  {item.data.experience} experience .{item.data.companyIndustry}{" "}
                  .
                </small>
              ) : (
                <small>
                  {item.data.careerLevelAR} . {item.data.jobCategoriesAR} .
                  {item.data.experienceAR} خبرة .
                </small>
              )}
              <time className="text-success text-small fs-6 fw-light">
                <i>
                  {timestampToString(item.data.date)} {json.day}
                </i>
              </time>
            </div>
          </div>
          <a href="company" className="mt-4 me-4">
            <img
              src={`${!item.data.logo ? download : item.data.logo}`}
              width="85px"
              alt={item.data.jobTitle}
            />
          </a>
        </header>
        <div className="job__reacts d-flex align-items-center  px-4 mt-1  mb-1 text-secondary">
          <button
            id="save"
            className={`btn  hovering_btn ${
              save === true || id === item.id ? "save-active" : "text-secondary"
            }`}
            onClick={() => HandleClick(item.data.id)}
          >
            <FontAwesomeIcon icon={faBookmark} className="me-1 ms-1" />
            {save === true || id === item.data.id ? (
              <span className=""> {json.saved}</span>
            ) : (
              <span className=""> {json.save}</span>
            )}
          </button>

          <button
            className="btn   text-secondary hovering_btn"
            onClick={() => handelShare(item.id)}
          >
            <FontAwesomeIcon icon={faShare} className="me-1 ms-1" />
            {json.share}
          </button>
          <ShareModel
            isOpen={showModal}
            closeModal={handleCloseModal}
            toggle={handelShare}
            quote={item.data.jobTitle}
            value={`${"jopdetails/" + item.companyId + "/" + item.id}`}
          />
          {/* <button className="btn   text-secondary hovering_btn">
            <FontAwesomeIcon icon={faEyeSlash} className="me-1 ms-1" />
            {item.Hide}
          </button> */}
        </div>
      </div>
    </>
  );
};

export default ExplorCard;
