import React from "react";

export default function JobCard(props) {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <h4 className="font4 mt-4">Job Details</h4>

          <div className="ms-4">
            <p>
              <span className="fonti"> Experience Needed: </span>
              <span className="font1"> {props.experience}</span>
            </p>
            <p>
              <span className="fonti">Education Level: </span>

              <span className="font1">{props.education}</span>
            </p>

            <p>
              <span className="fonti">Salary: </span>
              <span className="font1"> {props.salary}</span>
            </p>
            <p>
              <span className="fonti">Job Categories:</span>

              <span className="font1">{props.categories}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
