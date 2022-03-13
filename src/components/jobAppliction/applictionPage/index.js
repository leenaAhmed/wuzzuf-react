import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEye } from "@fortawesome/free-solid-svg-icons";
import ApplictionCard from "../applictionCard/index";
import React, { useEffect, useState } from "react";
import { db } from '../../../firebase';
import { useAuth } from "../../../contexts/authContext";
const PageAppliction = () => {

  const { currentUser } = useAuth();
  const [applicationLength, setapplicationLength] = useState(0);
  const [noApplicationMessage ,setnoApplicationMessage]  = useState('No applications yet !!') ;

  const [appliction, setappliction] = useState([]);
 
  async function loadApplication() {
    const jobdata = db.collection('users').doc(currentUser.uid).collection('applicion');
    const querySnapshot = await jobdata.get();
    setapplicationLength(querySnapshot.docs.length);
    if(querySnapshot.docs.length>0)
    {
      setnoApplicationMessage('')
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
      <div className="container">
        <div className="row  mt-4">
          <section className="application__supNav col-6">
            <header className="d-flex align-items-center">
              <div className="subnav__activity col ">
                <div className="d-flex align-items-center">
                    <div className="d-inline-flex active-color fs-4 fw-bold">
                      Applications <span> ({applicationLength})</span>
                    </div>
                </div>
              </div>
              {/* <div className="col d-flex align-items-center justify-content-end">
                <p className="text-center fs-6 lh-base pe-2 mt-2"> Sort By </p>
                <div>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Latest Activity</option>
                    <option value="1">Application Date</option>
                  </select>
                </div>
              </div> */}
            </header>
            <div className="row ">
              {/* <section className="row applications__service  mt-4">
                <p> Account activity in the last 90 days</p>

                <div className="d-flex align-items-center">
                  <div
                    className="application__search d-flex align-items-center col-sm-3 col-md-4"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <div className="search__icon ">
                      <FontAwesomeIcon icon={faSearch} />
                    </div>
                    <div className="px-2">
                      <strong> 1</strong>
                      <p className="small__fonts"> Search appearances </p>
                    </div>
                  </div> */}
                  {/* <div
                    className="application__search d-flex align-items-center ms-2 col-sm-3 col-md-4"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <div className="search__icon">
                      <FontAwesomeIcon icon={faEye} />
                    </div>
                    <div className="px-2">
                      <strong> 3</strong>
                      <p className="small__fonts"> Viewed your profile </p>
                    </div>
                  </div>
                </div>
              </section> */}
            </div>
          </section>
          <div className="row">
            <div className="col-sm-6 col-md-6">
              <section className="mt-3">
              <section className="applications__service mt-5 ms-5">
               
                <div className="fs-5 fw-bold">
                  {noApplicationMessage}
                </div>
              </section>
                <section className="applications__service">
                  {appliction.map((job) => {
                    return (
                      <div>
                        <ApplictionCard
                          companyname={job.datauser.companyName}
                          title={job.datauser.jobTitle}
                          location={job.datauser.companylocation}
                          ImageUrl={job.datauser.imageUrl}
                          timestamp={job.datauser.timestamp}
                          applicationId = {job.id}
                        />
                      </div>
                    );
                  })}
                </section>
              </section>
            </div>
          </div>

          {/* <div className="row mt-4">
            <div className="col-sm-5 col-md-6 ">
              <div className="card  career__applied">
                <div className="card-body col-6 mx-3 py-5">
                  <header>
                    <h2 className="css-1psx8u2">Choose a career!</h2>
                  </header>
                  <section>
                    <p className="sub_title">
                      Identify the career that matches your vital skills and
                      interests, and book a
                      <strong className="text-muted">WUZZUF coach</strong>.
                    </p>
                    <button
                      target="_blank"
                      href="#"
                      className="btn btn-primary mt-3"
                    >
                      Book Now
                    </button>
                  </section>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default PageAppliction;
