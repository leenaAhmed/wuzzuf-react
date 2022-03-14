import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShare,
  faEyeSlash,
  faBookmark
} from "@fortawesome/free-solid-svg-icons";

import download from "./../../../assets/download.png";
import saved from "../../../services/saved";
import "./style.scss";

const ExplorCard = (props) => {
  const HandleClick = (id) => {
    saved
      .addJobtoSavedPage(
        props.componyName,
        props.city,
        props.ImageUrl,
        props.companyIndustry,
        props.title,
        props.jobtime,
        props.timestamp,
        props.categories,
        props.experience
      )
      .then(() => {
        alert("saved");
      })
      .catch((err) => {
        console.log(err);
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
  return (
    <>
      <div className="job__detail bg-body card bx-1 bt-1 mb-3">
        <header className="job__description d-flex justify-content-between border-bottom  mx-3 pb-2">
          <div className="card-body ">
            <div>
              <Link
                to={`/jopdetails/${props.companyId}/${props.id}`}
                className="app_blue_color"
              >
                <span className="app_blue_color job_title">{props.title}</span>
              </Link>
              <i className="badge text-secondary bg-light fw-light">
                {props.jobtime}
              </i>
              <p>
                <small className="text-dark text-normal job_title">
                  {props.componyName}
                </small>

                <span>-</span>
                <small className="text-secondary ">{props.city}</small>
              </p>
            </div>
            <div className="text-secondary fs-6">
              <small>
                {props.categories} . {props.experience} experience .
                {props.companyIndustry} .
              </small>

              <time className="text-success text-small fs-6 fw-light">
                <i>{timestampToString(props.timestamp)} Day</i>
              </time>
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
        <div className="job__reacts d-flex align-items-center  px-4 mt-1  mb-1 text-secondary">
          <button
            id="save"
            className={`btn  hovering_btn ${
              props.saved === true ? "save-active" : "text-secondary"
            }`}
            onClick={() => HandleClick(props.id)}
          >
            <FontAwesomeIcon icon={faBookmark} className="me-1 ms-1" />
            {props.save}
          </button>
          <button className="btn   text-secondary hovering_btn">
            <FontAwesomeIcon icon={faShare} className="me-1 ms-1" />
            {props.Share}
          </button>
          <button className="btn   text-secondary hovering_btn">
            <FontAwesomeIcon icon={faEyeSlash} className="me-1 ms-1" />
            {props.Hide}
          </button>
        </div>
      </div>
    </>
  );
};

export default ExplorCard;
