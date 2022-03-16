import SavedCard from "./../components/jobModule/saved/index";
import React, { useState, useEffect, useContext } from "react";
import { languageContext } from "./../contexts/languageContext";
import saved from "../services/saved";
import ar from "./../language/explore/ar.json";
import en from "./../language/explore/en.json";
function SavedPage(props) {
  const [save, setInfoSave] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { lang } = useContext(languageContext);
  const [json, setJson] = useState(en);

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

          {save.length > 0 ? (
            save.map((post) => {
              return lang === "English" ? (
                <div key={post.id}>
                  <SavedCard
                    id={post.id}
                    saved={post.data.saved}
                    title={post.data.jobTitle}
                    city={post.data.companyCountry}
                    categories={post.data.jobCategories}
                    country={post.data.companyCountry}
                    componyName={post.data.companyName}
                    ImageUrl={post.data.logo}
                    experience={post.data.experience}
                    companyIndustry={post.data.companyIndustry}
                    careerLevel={post.data.careerLevel}
                    time={post.data.jobType}
                  />
                </div>
              ) : (
                <div key={post.id}>
                  <SavedCard
                    id={post.id}
                    saved={post.data.saved}
                    title={post.data.jobTitleAR}
                    city={post.data.companyCountry}
                    categories={post.data.jobCategoriesAR}
                    country={post.data.companyCountry}
                    componyName={post.data.companyName}
                    careerLevel={post.data.careerLevelAR}
                    ImageUrl={post.data.logo}
                    experience={post.data.experienceAR}
                    companyIndustry={post.data.companyIndustry}
                    time={post.data.jobTypeAR}
                  />
                </div>
              );
            })
          ) : (
            <div>
              <p>{json.savedJobNodata}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default SavedPage;
