import "./style.scss";
import { useParams, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import download from "./../../../assets/download.png";
import explorjob from "../../../services/explorjob";
import appliction from "../../../services/appliction";
export default function ApplyToJob(props) {
  let { jobId } = useParams();
  let { companyId } = useParams();
  let history = useHistory();
  const [jobDetails, setjobrDetails] = useState({});
  const [applicion, setApplicion] = useState({
    currentjob: "",
    position: "",
    samplework: ""
  });
  const backHandelar = (e) => {
    history.goBack();
  };
  const changehandlar = (e) => {
    setApplicion({
      ...applicion,
      [e.target.name]: e.target.value
    });
  };
  var data = {
    userPosition: applicion.position,
    userSampleWork: applicion.samplework,
    currentPosition: applicion.currentjob
  };
  const submitHandelar = (e) => {
    e.preventDefault();
    appliction
      .addApplicationJob(jobId, companyId, data, jobDetails)
      .then(() => {
        history.goBack();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  console.log(jobDetails);
  const loadingdetails = () => {
    explorjob.getSingleJob(companyId, jobId).then((job) => {
      setjobrDetails(job);
    });
  };
  useEffect(() => {
    loadingdetails();
    console.log(jobDetails);
  }, []);
  return (
    <>
      <div className="container">
        <div className="row mt-5 m-0 p-0">
          <div className="col-lg-3 col-md-6 col-sm-12 rounded">
            <div className=" rounded p-2 m-5 smallanswerdiv">
              <p className="font13">
                Your answers reflect your vital skills and experience. Providing
                excellent answers sets you apart from the competition.
              </p>
            </div>
          </div>
          <div className="card col-lg-6 col-md-12 col-sm-12 mb-5">
            <div className="rounded d-flex  justify-content-between text-light fs-5 p-2 m-0   Appform">
              Application Form
              <button
                className="btn btn-light btn-sm "
                onClick={() => backHandelar()}
                type="button"
              >
                View job details
              </button>
            </div>
            <div className="p-3 m-0 ">
              <img
                className="float-end mt-4"
                src={`${!jobDetails.logo ? download : jobDetails.logo}`}
                width="85px"
                alt={props.title}
              />

              <h5 className="text-dark fw-bold job_title">
                {jobDetails.jobTitle}{" "}
              </h5>
              <span className="font13 hiringteam">
                The hiring team at
                <strong className="job_title">{jobDetails.companyName}</strong>
                requires you to answer the below questions.
              </span>
              <form onSubmit={(e) => submitHandelar(e)}>
                <div className="mb-3 mt-4">
                  <label
                    htmlFor="formGroupExampleInput"
                    className="form-label fw-bold font13"
                  >
                    Why should we hire you for this position?
                  </label>
                  <div>
                    <textarea
                      className="form-control h70"
                      id="floatingInputValue"
                      name="position"
                      placeholder="Write your answer here.."
                      required
                      value={applicion.position}
                      onChange={(e) => changehandlar(e)}
                    ></textarea>
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    for="formGroupExampleInput2"
                    className="form-label fw-bold font13"
                  >
                    Can you provide us with a sample of your work?
                  </label>
                  <div className="">
                    <textarea
                      className="form-control h70"
                      id="floatingInputValue"
                      placeholder=" Write your answer here..  "
                      name="samplework"
                      required
                      value={applicion.samplework}
                      onChange={(e) => changehandlar(e)}
                    ></textarea>
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    for="formGroupExampleInput2"
                    className="form-label fw-bold font13"
                  >
                    Describe your current job responsibilities
                  </label>
                  <div className="">
                    <textarea
                      className="form-control h70"
                      id="floatingInputValue"
                      name="currentjob"
                      placeholder=" Write your answer here.. "
                      required
                      value={applicion.currentjob}
                      onChange={(e) => changehandlar(e)}
                    ></textarea>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    class="btn btn-primary btn-sm float-end mt-3 m-1 font13"
                  >
                    Submit Application
                  </button>
                  <a
                    href
                    className="btn btn-secondary btn-sm float-end mt-3 m-1 font13"
                  >
                    Save and Apply later
                  </a>
                  <a
                    href
                    onClick={() => backHandelar()}
                    className="btn btn-secondary btn-sm float-start mt-3 m-1 ms-2 font13"
                  >
                    Cancel
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
