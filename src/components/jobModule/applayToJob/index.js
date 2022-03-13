import "./style.scss";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import download from "./../../../assets/download.png";
import explorjob from "../../../config/explorjob";
export default function ApplyToJob(props) {
  let { jobId } = useParams();
  let { companyId } = useParams();

  const [jobDetails, setjobrDetails] = useState({});
  const [applicion, setApplicion] = useState({
    currentjob: "",
    position: "",
    samplework: ""
  });

  const changehandlar = (e) => {
    setApplicion({
      ...applicion,
      [e.target.name]: e.target.value
    });
    // console.log(e.target.value);
  };
  const submitHandelar = (e) => {};

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
          <div className="col-lg-3 col-md-3 col-sm-12 rounded">
            <div className=" rounded p-2 m-5 smallanswerdiv">
              <p className="font13">
                Your answers reflect your vital skills and experience. Providing
                excellent answers sets you apart from the competition.
              </p>
            </div>
          </div>
          <div className="card col-lg-6 col-md-6 col-sm-12 mb-5">
            <div className="rounded d-flex flex-row justify-content-between fs-5 p-2 m-0   Appform">
              Application Form
              <button className="btn btn-dark btn-sm " type="button">
                View job details
              </button>
            </div>
            <div className="p-3 m-0 ">
              <img
                className="float-end"
                src={`${!jobDetails.logo ? download : jobDetails.logo}`}
                width="75px"
                alt={props.title}
              />

              <h5 className="text-dark fw-bold">{jobDetails.jobTitle}</h5>
              <span className="font13 hiringteam">
                The hiring team at
                <span className="job_title"> {jobDetails.companyName}</span>
                requires you to answer the
                <br /> below questions.
              </span>
              <form onSubmit={(e) => submitHandelar(e)}>
                <div className="mb-3 mt-4">
                  <label
                    htmlFor="formGroupExampleInput"
                    className="form-label fw-bold font13"
                  >
                    Why should we hire you for this position?
                  </label>
                  <div className="form-floating">
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
                  <div className="form-floating">
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
                  <div className="form-floating">
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
