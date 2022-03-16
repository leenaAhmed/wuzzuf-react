import "./style.scss";
import { useParams, useHistory } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import download from "./../../../assets/download.png";
import explorjob from "../../../services/explorjob";
import appliction from "../../../services/appliction";
import ar from "../../../language/explore/ar.json";
import en from "../../../language/explore/en.json";
import { languageContext } from "../../../contexts/languageContext";
import { toast } from "react-toastify";

export default function ApplyToJob(props) {
  let { jobId } = useParams();
  let { companyId } = useParams();
  let history = useHistory();
  const { lang, setLang } = useContext(languageContext);
  const [json, setJson] = useState(en);
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
        history.push("/applications-page");
        toast.success("Applied succesfully !", {
          position: toast.POSITION.TOP_LEFT
        });
      })
      .catch((err) => {

      
        toast.warn("Error in sending your application !", {
          position: toast.POSITION.TOP_LEFT
        });
      });
  };
  console.log(jobDetails);
  const loadingdetails = () => {
    explorjob.getSingleJob(companyId, jobId).then((job) => {
      setjobrDetails(job);
    });
  };
  useEffect(() => {
    if (lang === "English") {
      setJson(en);
    }
    if (lang === "العربية") {
      setJson(ar);
    }
  }, [lang]);
  useEffect(() => {
    loadingdetails();
    console.log(jobDetails);
  }, []);
  return (
    <>
      <div className="container" dir={lang === "English" ? "ltr" : "rtl"}>
        <div className="row mt-5 m-0 p-0">
          <div className="col-lg-3 col-md-6 col-sm-12 rounded">
            <div className=" rounded p-2 m-5 smallanswerdiv">
              <p className="font13">{json.answer}</p>
            </div>
          </div>
          <div className="card col-lg-6 col-md-12 col-sm-12 mb-5">
            <div className="rounded d-flex  justify-content-between text-light fs-5 p-2 m-0 Appform">
              {json.form}
              <button
                className="btn btn-light btn-sm "
                onClick={() => backHandelar()}
                type="button"
              >
                {json.View}
              </button>
            </div>
            <div className="p-3 m-0">
              <img
                className={`${
                  lang === "English" ? "float-end" : "float-start"
                } mt-4 `}
                src={`${!jobDetails.logo ? download : jobDetails.logo}`}
                width="85px"
                alt={props.title}
              />

              <h5 className="text-dark fw-bold job_title ">
                {lang === "English" ? (
                  <span> {jobDetails.jobTitle}</span>
                ) : (
                  <span>{jobDetails.jobTitleAR}</span>
                )}
              </h5>
              <span className="font13 hiringteam">
                {json.applyToJob}
                <strong className="job_title  ">
                  {lang === "English" ? (
                    <span>{jobDetails.companyName}</span>
                  ) : (
                    <span>{jobDetails.companyName}</span>
                  )}
                </strong>
                {json.applyToRequire}
              </span>
              <form onSubmit={(e) => submitHandelar(e)}>
                <div className="mb-3 mt-4">
                  <label
                    htmlFor="formGroupExampleInput"
                    className="form-label fw-bold font13"
                  >
                    {json.position}
                  </label>
                  <div>
                    <textarea
                      className="form-control h70"
                      id="floatingInputValue"
                      name="position"
                      placeholder={json.placeholder}
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
                    {json.sample}
                  </label>
                  <div className="">
                    <textarea
                      className="form-control h70"
                      id="floatingInputValue"
                      placeholder={json.placeholder}
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
                    {json.responsibilities}
                  </label>
                  <div className="">
                    <textarea
                      className="form-control h70"
                      id="floatingInputValue"
                      name="currentjob"
                      placeholder={json.placeholder}
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
                    {json.submit}
                  </button>

                  <a
                    href
                    onClick={() => backHandelar()}
                    className="btn btn-secondary btn-sm float-start mt-3 m-1 ms-2 font13"
                  >
                    {json.cancel}
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
