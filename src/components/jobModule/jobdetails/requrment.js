import React from "react";
import ar from "../../../language/explore/ar.json";
import en from "../../../language/explore/en.json";
import { useState, useEffect, useContext } from "react";
import { languageContext } from "../../../contexts/languageContext";
export default function JobRequirements(props) {
  const { lang, setLang } = useContext(languageContext);
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
      <div className="card mt-3 mb-4">
        <div className="card-body m-3">
          <h4 className="card-title">{json.Requirements}</h4>
          <div className="ms-4">{props.requirements}</div>
        </div>
      </div>
    </>
  );
}
