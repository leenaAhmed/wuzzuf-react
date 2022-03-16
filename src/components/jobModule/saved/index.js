import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import ar from "../../../language/explore/ar.json";
import en from "../../../language/explore/en.json";
import download from "./../../../assets/download.png";
import { languageContext } from "../../../contexts/languageContext";
import { useState, useEffect, useContext } from "react";

import saved from "../../../services/saved";
const SavedCard = (props) => {
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

  const HandleClick = (id) => {
    let jobId = id;
    saved
      .deletSavedJob(jobId)
      .then(() => {
        localStorage.removeItem("id");
         
        toast.success("saved delted succesfully !", {
          position: toast.POSITION.TOP_LEFT
        });
      })
      .catch((err) => {
        toast.error(err.message, {
          position: toast.POSITION.TOP_LEFT
        });
      });
  };
  return (
    <>
      
    </>
  );
};

export default SavedCard;
