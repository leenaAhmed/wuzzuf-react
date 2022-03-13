import React from "react";
import download from "./../../../assets/download.png";
import { Link } from "react-router-dom";

export default function CardHeader(props) {
  const timestampToString = (timestamp) => {
    return Date(timestamp).toString();
  };
  return (
    <>
      <div className="bigsec">
        <div className="pos">
          <img
            className="logo me-3 mt-2"
            src={`${!props.ImageUrl ? download : props.ImageUrl}`}
            width="95px"
            alt={props.title}
          />
          <h1 className="title job_title">{props.jobTitle}</h1>
          <div className="btns">
            <span className="fullbtn"> {props.jobType}</span>

            {/* <span className="remotebtn">Remotely during COVID-19</span> */}
          </div>

          <strong className="verified-company">
            <div className="comp-name job_title text-primary">
              {props.companyName} -
            </div>
            {props.companyCountry}
          </strong>

          <span className="post-time">
            Posted {timestampToString(props.timestamp)} 2 days ago
          </span>

          <div className="green-div">
            <span className="nextstar">
              Your profile meets the requirements of this role
            </span>
          </div>

          <div className="staticapps">
            <div className="apps">
              <strong className="appsnum">34</strong>
              <span className="appstext">
                <span>Applicants for</span>
                <span>1 open position</span>
              </span>
            </div>
            <ul className="ulofapp">
              <li className="firstli">
                <strong className="viewnum">31</strong>
                <span className="viewtext">Viewed</span>
              </li>
              <li className="secondli">
                <strong className="viewnum">6</strong>
                <span className="viewtext">In Consideration</span>
              </li>
              <li className="firstli">
                <strong className="viewnum">14</strong>
                <span className="viewtext">Not Selected</span>
              </li>
            </ul>
          </div>

          <div className="applaysec">
            <Link
              to={`/applytojob/${props.companyId}/${props.id}`}
              className="app_blue_color"
            >
              <span className="applybtn">Apply For Job</span>
            </Link>

            <div className="mr-8">
              <button type="button" className="sharebtn">
                <i size="24" className="css-16r7llb efou2fk0">
                  <svg
                    width="24"
                    height="24"
                    preserveAspectRatio="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#4D6182"
                      d="M17 4c1.1 0 2 .9 2 2v14l-7-3-7 3V6c0-1.1.9-2 2-2zm0 1.6H7a.4.4 0 0 0-.399.4v11.574L12 15.259l5.399 2.315V6A.4.4 0 0 0 17 5.6z"
                    ></path>
                  </svg>
                </i>
              </button>
            </div>
            <div className="mr-8">
              <div>
                <div className="css-0">
                  <button type="button" className="sharebtn">
                    <i size="24" className="css-16r7llb efou2fk0">
                      <svg
                        width="24"
                        height="24"
                        preserveAspectRatio="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#4D6182"
                          d="M13.8 14.152v3.691l7.2-6.307-7.2-6.286v3.586c-6.998.907-9.788 5.4-10.8 9.914 2.497-3.164 5.805-4.598 10.8-4.598z"
                        ></path>
                      </svg>
                    </i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
