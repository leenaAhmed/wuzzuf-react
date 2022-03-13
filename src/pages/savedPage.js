import SavedCard from "./../components/jobModule/saved/index";
import React, { useState, useEffect } from "react";
import saved from "./../config/saved";
import { useAuth } from "./../contexts/authContext";
function SavedPage(props) {
  const [save, setInfoSave] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //   const [count, setCount] = useState();

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
      <div className="col-md-6 offset-md-3 mt-4">
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
              <span id="jobNumSaved"> {1}</span> Active Saved Job
            </h4>
          </div>
          {save.length > 0 ? (
            save.map((post) => {
              return (
                <div key={post.id}>
                  <SavedCard
                    id={post.id}
                    saved={post.data.saved}
                    title={post.data.jobTitle}
                    city={post.data.location}
                    categories={post.data.categoriey}
                    country={post.data.Country}
                    componyName={post.data.componyName}
                    ImageUrl={post.data.companyLogo}
                    experience={post.data.experience}
                    companyIndustry={post.data.companyIndustry}
                  />
                </div>
              );
            })
          ) : (
            <div> You have no saved data right now</div>
          )}
        </div>
      </div>
    </>
  );
}
export default SavedPage;
