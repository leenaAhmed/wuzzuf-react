import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import ar from "../../../language/explore/ar.json";
import en from "../../../language/explore/en.json";
import download from "./../../../assets/download.png";
import { languageContext } from "../../../contexts/languageContext";
import { useState, useEffect, useContext } from "react";

import saved from "../../../services/saved";
const SavedCard = (props) => {
  const { lang, setLang } = useContext(languageContext);
  const [json, setJson] = useState(en);

  useEffect(() => {
    if (lang === "English") {
      setJson(en);
    }
    if (lang === "العربية") {
      setJson(ar);
    }
  }, [lang]);

  const HandleClick = (id) => {
    let jobId = id;
    saved
      .deletSavedJob(jobId)
      .then(() => {
        localStorage.removeItem("id");
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
  return (
    <>
      <div className="job__detail bg-body card bx-1 bt-1 mb-3">
        <header className="job__description d-flex justify-content-between border-bottom mx-2 pb-2">
          <div className="card-body">
            <div>
              <Link to={`/jopdetails/${props.id}`} className="app_blue_color">
                <span className=" job_title">{props.title}</span>
              </Link>
              <i className="badge text-secondary bg-light fw-light">
                {props.time}
              </i>
              <p>
                <small className="text-dark fw-normal">
                  {props.componyName}
                </small>

                <span>-</span>
                <small className="text-secondary ">{props.city}</small>
              </p>
            </div>
            <div className="text-secondary fs-6">
              <small>
                {props.categories} . {props.experience} .{" "}
                {props.companyIndustry}
              </small>
              <time className="text-success">1day</time>
            </div>
          </div>
          <a href="company" className="mt-4 me-4">
            <img
              src={`${!props.ImageUrl ? download : props.ImageUrl}`}
              width="85px"
              alt={props.title}
            />
          </a>
        </header>
        <div className="job__reacts d-flex align-items-center ps-3 mt-1  mb-1 text-secondary">
          <button
            id="save"
            className={`btn  text-secondary`}
            onClick={() => HandleClick(props.id)}
          >
            <FontAwesomeIcon icon={faBookmark} className="me-1 ms-1" />
            {json.UnSave}
          </button>
          <button className="btn   text-secondary hovering_btn ">
            <FontAwesomeIcon icon={faShare} className="me-1 ms-1" />
            {json.share}
          </button>
        </div>
      </div>
    </>
  );
};

export default SavedCard;
