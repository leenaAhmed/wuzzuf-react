import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import download from "../../../assets/download.png";

function ApplictionCard(props) {
  const timestampToString = (timestamp) => {
    return Date(timestamp).toString();
  };

  const sendApplicationId = (ApplicationId)=>
  {
    console.log(ApplicationId)
  }
  return (
    <>
      <div className="card ">
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
                  <span className="badge text-secondary bg-light">Applied</span>
                  <small className="text-muted">
                    {" "}
                    {timestampToString(props.timestamp)}{" "}
                  </small>
                </div>
                <div className="col-md-12 col-lg-12 d-flex justify-content-end">
                <button className="btn btn-primary col-lg-3 col-md-5 col-sm-5 mt-3" type="submit" onClick={()=>sendApplicationId(props.applicationId)}>Edit</button>
              </div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplictionCard;
