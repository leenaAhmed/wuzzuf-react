import React from "react";
import ar from "../../../language/explore/ar.json";
import en from "../../../language/explore/en.json";
import { useState, useEffect, useContext } from "react";
import { languageContext } from "../../../contexts/languageContext";
export default function JobCard(props) {
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
  return (
    <>
      <div className="card">
        <div className="card-body">
          <h4 className="font4 mt-4">{json.JobDetails}</h4>

          <div className="ms-4">
            <p>
              <span className="fonti"> {json.Experience} : </span>
              <span className="font1"> {props.experience}</span>
            </p>
            <p>
              <span className="fonti">{json.Education}: </span>

              <span className="font1">{props.education}</span>
            </p>

            <p>
              <span className="fonti">{json.Salary}: </span>
              <span className="font1"> {props.salary}</span>
            </p>
            <p>
              <span className="fonti">{json.categories}:</span>

              <span className="font1">{props.categories}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
