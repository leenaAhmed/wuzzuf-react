import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import download from "../../../assets/download.png";
import arLang from '../../../language/applicationPage/العربية.json'
import enLang from '../../../language/applicationPage/English.json'
import { useContext, useEffect, useState } from "react";
import { languageContext } from "../../../contexts/languageContext";

function ApplictionCard(props) {
  const[json,Setjson] = useState(enLang);
  const { lang, setLang } = useContext(languageContext);
  useEffect(()=>
  {
    if(lang=="English") {Setjson(enLang)}
    if(lang=='العربية'){Setjson(arLang)}
  },[lang])

  const timestampToString = (timestamp) => {
    return Date(timestamp).toString().slice(4, 15);
  };

  const sendApplicationId = (ApplicationId) => {
    console.log(ApplicationId);
  };
  return (
    <>
      <div className="card mb-3">
        <div
          tabIndex="0"
          className="card-body"
          data-container="body"
          data-bs-toggle="popover"
          data-placement="right"
          data-html="true"
          data-bs-content-id="popover-content"
        >
          <div className="d-flex  justify-content-between">
            <div className="d-flex">
              <div className="app__image me-3 text-center">
                <img
                  src={`${props.ImageUrl === " " ? props.ImageUrl : download}`}
                  width="75px"
                  alt={props.title}
                />
              </div>
              <div className="">
                <div className="pb-2 ">
                  <h5 className="fs-6 lh-base pe-2 d-flex job_title">
                    {" "}
                    {props.title}
                  </h5>

                  <small className="mb-2">
                    <span>{props.companyname}</span> -
                    <span className="text-muted">{props.location}</span>
                  </small>
                </div>

                <div>
                  <span className="badge text-secondary bg-light">{json[0].timestampApplied}</span>
                  <small className="text-muted">
                    {" "}
                    {timestampToString(props.timestamp)}{" "}
                  </small>
                </div>
              </div>
            </div>
            <div>
              <button
                className="btn text-primary  mt-3"
                type="submit"
                onClick={() => sendApplicationId(props.applicationId)}
              >
                {json[0].editButton}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplictionCard;
