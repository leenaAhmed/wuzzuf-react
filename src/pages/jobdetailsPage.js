import "./style.scss";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import JobCard from "./../components/jobModule/jobdetails/details";
import JobDescription from "./../components/jobModule/jobdetails/description";
import CardHeader from "./../components/jobModule/jobdetails/header";
import JobRequirements from "./../components/jobModule/jobdetails/requrment";
import explorjob from "../services/explorjob";
import { languageContext } from "./../contexts/languageContext";
import ar from "./../language/explore/ar.json";
import en from "./../language/explore/en.json";
import Footer from "./../components/footer/index";
export default function JobDetailsPage(props) {
  let { jobId } = useParams();
  let { companyId } = useParams();
  console.log(jobId, companyId);
  const [isLoading, setIsLoading] = useState(false);
  const [jobDetails, setjobrDetails] = useState({});
  const [showMore, setShowMore] = useState(false);

  const { lang } = useContext(languageContext);
  const [json, setJson] = useState(en);

  useEffect(() => {
    if (lang === "English") {
      setJson(en);
    }
    if (lang === "العربية") {
      setJson(ar);
    }
  }, [lang]);
  const loadingdetails = () => {
    explorjob
      .getSingleJob(companyId, jobId)
      .then((response) => {
        setTimeout(() => {
          setjobrDetails(response);
          setIsLoading(false);
        }, 1000);
        setIsLoading(true);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("Error occured while fetching the menu item. " + error);
      });
  };
  useEffect(() => {
    loadingdetails();
  }, []);

  return (
    <>
      <div className="container mt-5" dir={lang === "English" ? "ltr" : "rtl"}>
        <div className="row ms-2 me-2">
          <div
            className="col-md-8 col-lg-8 col-sm-12 rounded"
            dir={lang === "English" ? "ltr" : "rtl"}
          >
            {jobDetails === undefined || isLoading === true ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                {lang === "English" ? (
                  <>
                    <CardHeader
                      companyId={jobDetails.companyID}
                      id={jobDetails.id}
                      companyCountry={jobDetails.companyCountry}
                      jobTitle={jobDetails.jobTitle}
                      companyName={jobDetails.companyName}
                      jobType={jobDetails.jobType}
                      ImageUrl={jobDetails.logo}
                      timestamp={jobDetails.date}
                    />

                    <JobCard
                      experience={jobDetails.experience}
                      education={jobDetails.educationLevel}
                      salary={jobDetails.salary}
                      categories={jobDetails.jobCategories}
                    />
                    <JobDescription description={jobDetails.jobDescription} />
                    <JobRequirements
                      requirements={jobDetails.jobRequirements}
                    />
                  </>
                ) : (
                  <>
                    <CardHeader
                      companyId={jobDetails.companyID}
                      id={jobDetails.id}
                      companyCountry={jobDetails.companyCountry}
                      jobTitle={jobDetails.jobTitleAR}
                      companyName={jobDetails.companyName}
                      jobType={jobDetails.jobTypeAR}
                      ImageUrl={jobDetails.logo}
                      timestamp={jobDetails.date}
                    />

                    <JobCard
                      experience={jobDetails.experienceAR}
                      education={jobDetails.educationLevelAR}
                      salary={jobDetails.salary}
                      categories={jobDetails.jobCategoriesAR}
                    />
                    <JobDescription description={jobDetails.jobDescriptionAR} />
                    <JobRequirements
                      requirements={jobDetails.jobRequirementsAR}
                    />
                  </>
                )}
              </>
            )}
          </div>
          {jobDetails.aboutCompany === undefined ? (
            <div className="col-sm-3">
              <aside className=" aside">
                <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              </aside>
            </div>
          ) : (
            <div className="col-sm-3">
              <aside className=" aside  ">
                <section className="card-body sbar">
                  <h3 className="text-small companyname">
                    {json.About} {jobDetails.companyName}
                  </h3>
                  <span className="subdetail">
                    {jobDetails.companyIndustry}
                  </span>
                  <span className="metainfo">
                    {jobDetails.companyCountry} •{jobDetails.companySize}
                    {json.employees}
                  </span>
                  <p className="description">
                    <span className="little-descpt">
                      {showMore
                        ? jobDetails.aboutCompany
                        : `${jobDetails.aboutCompany
                            .slice(0, 120)
                            .concat("....")}`}
                      <button
                        className="btn btn-sm text-primary"
                        onClick={() => setShowMore(!showMore)}
                      >
                        {showMore ? `${json.showMore}` : `${json.showless}`}
                      </button>
                    </span>
                  </p>
                </section>
              </aside>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
