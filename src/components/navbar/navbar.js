import "./navbar.scss";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../contexts/authContext"
import { db } from "../../firebase";

import {
  faEdit,
  faHeart,
  faBookOpen,
  faBookReader,
  faHandsHelping,
  faEnvelope,
  faCog, faBars,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Navbar() {

  //nav bar class showen state
  const [menueShowen, setmenueShowen] = useState(" ");
  const { currentUser, logout } = useAuth()
  const [userDetails, setUserDetails] = useState({});
  const history = useHistory()

  //toggle class showen function in drop down menue in nav
  const toggleShownClass = () => {
    setmenueShowen(menueShowen === "" ? "profile-settings-menue-showed" : "");
  };


  //get user details according to auth
  useEffect(() => {
    if (currentUser) {
      const userId = currentUser.uid
      console.log(userId);
      db.collection("users").doc(userId).onSnapshot((doc) => {
        if (doc.exists) {
          setUserDetails(doc.data())
        }
      })
    }
  }, [currentUser])


  //logut
  async function handleLogOut() {
    try {
      await logout().then(() => {
        history.push("/login")
      })
    } catch {
      console.log("faile to logout");
    }
  }


  return (
    <div>
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
                      <NavLink to="/">explore</NavLink>
                    </li>
                    <li className="d-inline-flex">
                      <NavLink to="/saved">saved</NavLink>
                    </li>
                    <li className="d-inline-flex">
                      <NavLink to="/application">applications</NavLink>
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
                          placeholder="Search jobs, companies.."
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                        />
                        <span className="input-group-text" id="basic-addon2">
                          <FontAwesomeIcon icon={faSearch} />
                        </span>
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
                      src={userDetails.imageUrl ? userDetails.imageUrl : "/default.png"}
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
            <a className="col-3 img-container">
              <img
                className="img-fluid rounded-circle dropdown-img"
                src={userDetails.imageUrl ? userDetails.imageUrl : "/default.png"}
                alt="avatar"
              />
            </a>
            <div className="col-9">
              <NavLink to="/profile/general-info/" className="view-profile d-flex flex-column">
                <span className="h5 user-name">{userDetails.firstName + " " + userDetails.lastName}</span>
                <span className="email">{userDetails.email}</span>
                <span className="view-profile-link">View profile</span>
              </NavLink>
            </div>
          </div>
          <hr />
          <div className="row row-cols-1 setting-links" id="setting_links">
            <NavLink to="/profile/general-info/" className="col setting-option">
              <FontAwesomeIcon icon={faEdit} />
              Edit Profile
            </NavLink>
            <NavLink to="/Career" className="col setting-option">
              <FontAwesomeIcon icon={faHeart} />      Update career interests
            </NavLink>
            <hr />
            <NavLink to="/Career" className="col setting-option">
              <FontAwesomeIcon icon={faBookOpen} />
              Career Readings
            </NavLink>
            <NavLink to="/AboutUs" className="col setting-option">
              <FontAwesomeIcon icon={faBookReader} />
              Learning opportunities
            </NavLink>
            <hr />
            <NavLink to="/AboutUs" className="col setting-option">
              <FontAwesomeIcon icon={faHandsHelping} />

              About us
            </NavLink>
            <NavLink to={`/ContactUs/`} className="col setting-option">
              <FontAwesomeIcon icon={faEnvelope} />

              <i className="fas fa-envelope"></i>contact Us
            </NavLink>
            <hr />
            <NavLink to="/settings" className="col setting-option">
              <FontAwesomeIcon icon={faCog} />
              Account settings
            </NavLink>
            <Link className="col setting-option" onClick={handleLogOut}>
              logout
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
