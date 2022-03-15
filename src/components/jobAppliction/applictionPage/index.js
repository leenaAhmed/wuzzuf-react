import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEye } from "@fortawesome/free-solid-svg-icons";
import ApplictionCard from "../applictionCard/index";
import React, { useContext, useEffect, useState } from "react";
import { db } from '../../../firebase';
import { useAuth } from "../../../contexts/authContext";
import { languageContext } from "../../../contexts/languageContext";
import arLang from '../../../language/applicationPage/العربية.json'
import enLang from '../../../language/applicationPage/English.json'
const PageAppliction = () => {


  const [applicationLength, setapplicationLength] = useState(0);


  const [appliction, setappliction] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { lang, setLang } = useContext(languageContext);
  const[json,Setjson] = useState(enLang);
  const [noApplicationMessage ,setnoApplicationMessage]  = useState(json[0].noApplicationMess) ;
  useEffect(()=>
  {
    if(lang=="English") {Setjson(enLang) ; setnoApplicationMessage(enLang[0].noApplicationMess)}
    if(lang=='العربية'){Setjson(arLang); setnoApplicationMessage(arLang[0].noApplicationMess)}
  },[lang])
 
  async function loadApplication() {
    const jobdata = db.collection('users').doc(localStorage.getItem("uid")).collection('applicion');
    const querySnapshot = await jobdata.get();
    setapplicationLength(querySnapshot.docs.length);
    if(querySnapshot.docs.length>0)
    {
      setnoApplicationMessage('');
      setIsLoading(false);
    }
    else if(querySnapshot.docs.length==0)
    {
      setIsLoading(false);
    }
    setappliction(
      querySnapshot.docs.map((doc) => ({
        id: doc.id,
        datauser: doc.data()
      }))
    );
  }
  useEffect(() => {
    // console.log(appliction);

    loadApplication();
  }, []);
  return (
    <>
      <div className="container" dir={lang === "English" ? "ltr" : "rtl"}>
        <div className="row  mt-4">
          <section className="application__supNav col-6">
            <header className="d-flex align-items-center">
              <div className="subnav__activity col ">
                <div className="d-flex align-items-center">
                    <div className="d-inline-flex active-color fs-4 fw-bold">
                      {json[0].title} <span> ({applicationLength})</span>
                    </div>
                </div>
              </div>
              {isLoading === true && (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">{json[0].loadingMessage}</span>
                </div>
              </div>
            )}
            </header>
          </section>
          <div className="row">
            <div className="col-sm-6 col-md-6">
              <section className="mt-3">
              {isLoading === false &&(<section className="applications__service mt-5 ms-5">
               
                <div className="fs-5 fw-bold">
                  {noApplicationMessage}
                </div>
              </section>)}
                <section className="applications__service">
                  {appliction.map((job) => {
                    return (
                      <div>
                        {lang=== "English" ?  
                        <ApplictionCard
                          companyname={job.datauser.companyName}
                          title={job.datauser.jobTitle}
                          location={job.datauser.companylocation}
                          ImageUrl={job.datauser.imageUrl}
                          timestamp={job.datauser.timestamp}
                          applicationId = {job.id}
                        />:
                        <ApplictionCard
                        companyname={job.datauser.companyName}
                        title={job.datauser.jobTitleAR}
                        location={job.datauser.companylocationAR}
                        ImageUrl={job.datauser.imageUrl}
                        timestamp={job.datauser.timestamp}
                        applicationId = {job.id}
                      />}
                       
                      </div>
                    );
                  })}
                </section>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageAppliction;
