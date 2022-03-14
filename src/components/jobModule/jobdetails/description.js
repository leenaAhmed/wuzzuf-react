import React from "react";

export default function JobDescription(props) {
  return (
    <>
      <div className="card mt-3 mb-4 ">
        <div className="card-body">
          <h4 className="card-title">Job Description</h4>
          <div className="ms-4">{props.description}</div>
        </div>
      </div>
    </>
  );
}
