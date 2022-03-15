import "./navbar.scss";
import { NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../contexts/authContext";
import { db } from "../../firebase";
import arLang from '../../language/navBar/العربية.json'
import enLang from '../../language/navBar/English.json'

import {
  faEdit,
  faHeart,
  faBookOpen,
  faBookReader,
  faHandsHelping,
  faEnvelope,
  faCog,
  faBars,
  faGlobe,
  faSearch,
  faSignOut
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { languageContext } from "./../../contexts/languageContext";

export default function Navbar() {
  //nav bar class showen state
  const [menueShowen, setmenueShowen] = useState(" ");
  const { currentUser, logout } = useAuth();
  const [userDetails, setUserDetails] = useState({});
  const [SearchTerm, SetSearchTerm] = useState(" ");
  const history = useHistory();

  const[json,Setjson] = useState(enLang);

  //toggle class showen function in drop down menue in nav
  const toggleShownClass = () => {
    setmenueShowen(menueShowen === "" ? "profile-settings-menue-showed" : "");
  };

  // language
  const { lang, setLang } = useContext(languageContext);
  useEffect(()=>
  {
    if(lang=="English") {Setjson(enLang)}
    if(lang=='العربية'){Setjson(arLang)}
  },[lang])

  //get user details according to auth
  useEffect(() => {
    if (currentUser) {
      const userId = currentUser.uid;
      console.log(userId);
      db.collection("users")
        .doc(userId)
        .onSnapshot((doc) => {
          if (doc.exists) {
            setUserDetails(doc.data());
          }
        });
    }
  }, [currentUser]);

  //logut
  async function handleLogOut() {
    try {
      await logout().then(() => {
        localStorage.removeItem("uid");
        history.push("/login");
      });
    } catch {
      console.log("faile to logout");
    }
  }

  return (
    <div dir={lang === "English" ? "ltr" : "rtl"}>
      <header className="main-header sticky-top">
        <div className="container">
          <div className="row">
            <div className="header-left col-xs-12 col-lg-7">
              <div className="row align-items-baseline ">
                <NavLink to="/" className="wuzzuf-logo col col-3">
                  <svg
                    viewBox="0 0 125 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-labelledby="wuzzuf-logo"
                    className="css-1hbwp7i"
                  >
                    <path
                      fill="#0055D9"
                      d="M23.724.001h4.906L22.583 20H18.17L14.315 7.96 10.489 20H6.046L0 .001h4.936L8.793 12.32 12.587 0h3.61l3.671 12.319L23.724 0zm9.147 17.552c-1.604-1.63-2.406-3.823-2.406-6.577V.001h4.689v11.036c0 1.54.432 2.714 1.296 3.524.864.81 2.046 1.215 3.548 1.215 1.48 0 2.648-.405 3.502-1.215.853-.81 1.28-1.985 1.28-3.524V0h4.689v10.975c0 2.754-.792 4.947-2.376 6.577C45.51 19.184 43.145 20 39.998 20s-5.523-.815-7.127-2.446zm18.416-.694L62.456 3.95H51.565V.001h16.69v3.17L57.15 16.052h11.106V20H51.287v-3.14zm18.803 0L81.258 3.95h-10.89V.001h16.69v3.17l-11.106 12.88h11.106v3.948H70.09v-3.14zm21.226.694c-1.605-1.63-2.407-3.823-2.407-6.577V.001h4.69v11.036c0 1.54.432 2.714 1.295 3.524.864.81 2.047 1.215 3.548 1.215 1.481 0 2.648-.405 3.502-1.215.853-.81 1.28-1.985 1.28-3.524V0h4.69v10.975c0 2.754-.793 4.947-2.376 6.577-1.584 1.631-3.949 2.446-7.096 2.446-3.147 0-5.522-.815-7.126-2.446zm23.279-5.733V20h-4.69V0H125l-1.08 3.982h-9.325V8.18h7.959l-.99 3.64h-6.97z"
                    ></path>
                  </svg>
                </NavLink>
                <nav className="header-nav col col-lg-9">
                  <ul className="d-flex list-unstyled">
                    <li className=" d-inline-flex">
                      <NavLink to="/">{json[0].explore}</NavLink>
                    </li>
                    <li className="d-inline-flex">
                      <NavLink to="/saved">{json[0].saved}</NavLink>
                    </li>
                    <li className="d-inline-flex">
                      <NavLink to="/applications-page">{json[0].applications}</NavLink>
                    </li>
                    <li className="d-inline-flex mt-2">
                      <FontAwesomeIcon
                        icon={faGlobe}
                        className="text-dark"
                        onClick={() => {
                          setLang(lang === "English" ? "العربية" : "English");
                        }}
                      />
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="header-right col-lg-5 ">
              <div className="row align-items-center">
                <div className="col-9">
                  <div className="form">
                    <form action="">
                      <div className="input-group">
                        <input
                          type="text"
                          className="search form-control"
                          placeholder={json[0].searchInput}
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                          onChange={(event) => {
                            SetSearchTerm(event.target.value);
                            console.log(event.target.value);
                          }}
                        />
                        <Link to={SearchTerm?`/search/${SearchTerm}`:`/search/ `}>
                          <span className="input-group-text" id="basic-addon2">
                            <FontAwesomeIcon icon={faSearch}/>
                          </span>
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-3">
                  <div
                    className="profile-img-btn"
                    id="profile_toggle_btn"
                    onClick={() => toggleShownClass()}
                  >
                    <img
                      className="img-fluid nav-profile-img img-thumbnail rounded-circle"
                      src={
                        userDetails.imageUrl
                          ? userDetails.imageUrl
                          : "/default.png"
                      }
                      alt=""
                    />
                    <FontAwesomeIcon className="menue-btn" icon={faBars} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* hidden drop */}
        <div
          className={`profile-settings-menue ${menueShowen}`}
          id="setting_menue"
        >
          <div className="row profile-info setting-option">
            <a href className="col-3 img-container">
              <img
                className="img-fluid rounded-circle dropdown-img"
                src={
                  userDetails.imageUrl ? userDetails.imageUrl : "/default.png"
                }
                alt="avatar"
              />
            </a>
            <div className="col-9">
              <NavLink
                to="/profile/general-info/"
                className="view-profile d-flex flex-column"
              >
                <span className="h5 user-name">
                  {userDetails.firstName + " " + userDetails.lastName}
                </span>
                <span className="email">{userDetails.email}</span>
                <span className="view-profile-link">{json[0].viewProfile}</span>
              </NavLink>
            </div>
          </div>
          <hr />
          <div className="row row-cols-1 setting-links" id="setting_links">
            <NavLink
              to={`/profile/general-info/`}
              className="col setting-option"
              onClick={() => toggleShownClass()}
            >
              <FontAwesomeIcon icon={faEdit} className="me-2" />
              {json[0].editProfile}
            </NavLink>
            <hr />
            <NavLink
              to="/about-us"
              className="col setting-option"
              onClick={() => toggleShownClass()}
            >
              <FontAwesomeIcon icon={faHandsHelping} className="me-2" />
              {json[0].aboutUs}
            </NavLink>
            <NavLink
              to={`/contact-us`}
              className="col setting-option"
              onClick={() => toggleShownClass()}
            >
              <FontAwesomeIcon icon={faEnvelope} className="me-2" />
              {json[0].contactUs}
            </NavLink>
            <hr />
            <Link
              className="col setting-option"
              onClick={() => {
                handleLogOut();
                toggleShownClass();
              }}
            >
              <FontAwesomeIcon icon={faSignOut} className="me-2" />
              {json[0].logout}
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
