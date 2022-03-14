import React from "react";

export default function JobRequirements(props) {
  return (
    <>
      <div className="card mt-3 mb-4">
        <div className="card-body m-3">
          <h4 className="card-title">Job Requirements</h4>
          <div className="ms-4">{props.requirements}</div>
        </div>
      </div>
    </>
  );
}
