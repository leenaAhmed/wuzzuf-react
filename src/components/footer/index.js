/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faLinkedin,
  faFacebookF
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <>
      <div className="container-fluid text-white ">
        <div className="row px-xl-5 p-5 jobFooter">
          <div className="col-lg-4 col-md-12 mb-2">
            <a href="#" id="W">
              <h1 className="mb-4 display-4 font-weight-bold text-white">
                WUZZUF
              </h1>
            </a>
            <p className="mb-1">Employers and Recruiters, go to our</p>
            <a className="text-white mb-6" href="#">
              RECRUITMENT SERVICES.
            </a>

            <p className="mb-2 fw-bold">Members Directory:</p>
            <a className="text-white mb-2 text-decoration-none" href="#">
              A
            </a>
            <a className="text-white mb-2 text-decoration-none" href="#">
              B
            </a>
            <a className="text-white mb-2 text-decoration-none" href="#">
              C
            </a>
            <a className="text-white mb-2 text-decoration-none" href="#">
              D
            </a>
            <a className="text-white mb-2 text-decoration-none" href="#">
              E
            </a>
            <a className="text-white mb-2 text-decoration-none" href="#">
              F
            </a>
            <a className="text-white mb-2 text-decoration-none" href="#">
              G
            </a>
            <a className="text-white mb-2 text-decoration-none" href="#">
              H
            </a>
            <a className="text-white mb-2 text-decoration-none" href="#">
              I
            </a>
            <a className="text-white mb-2 text-decoration-none" href="#">
              J
            </a>
            <a className="text-white mb-2 text-decoration-none" href="#">
              K
            </a>
            <a className="text-white mb-2 text-decoration-none" href="#">
              L
            </a>
            <a className="text-white mb-2 text-decoration-none" href="#">
              M
            </a>
            <a className="text-white mb-2 text-decoration-none" href="#">
              N
            </a>
            <a className="text-white mb-2 text-decoration-none" href="#">
              O
            </a>
            <a className="text-white mb-2 text-decoration-none" href="#">
              P
            </a>
            <a className="text-white mb-2 text-decoration-none" href="#">
              Q
            </a>
            <a className="text-white mb-2 text-decoration-none" href="#">
              R
            </a>
            <a className="text-white mb-2 text-decoration-none" href="#">
              S
            </a>
            <a className="text-white mb-2 text-decoration-none" href="#">
              T
            </a>
            <a className="text-white mb-2 text-decoration-none" href="#">
              U
            </a>
            <a className="text-white mb-2 text-decoration-none" href="#">
              V
            </a>
            <a className="text-white mb-2 text-decoration-none" href="#">
              W
            </a>
            <a className="text-white mb-2 text-decoration-none" href="#">
              X
            </a>
            <a className="text-white mb-2 text-decoration-none" href="#">
              Y
            </a>
            <a className="text-white mb-2 text-decoration-none" href="#">
              Z
            </a>
            <a className="text-white mb-2 text-decoration-none" href="#">
              #
            </a>
          </div>

          <div className="col-lg-8 col-md-12">
            <div className="row">
              <div className="col-md-4 mb-3">
                <h5 className="font-weight-bold text-white mb-4">Links</h5>
                <div className="d-flex flex-column justify-content-start">
                  <a className="text-white mb-2 text-decoration-none" href="#">
                    Career Resources
                  </a>
                  <a className="text-white mb-2 text-decoration-none" href="#">
                    WUZZUF Coaches
                  </a>
                  <a className="text-white mb-2 text-decoration-none" href="#">
                    About Us
                  </a>
                  <a className="text-white mb-2 text-decoration-none" href="#">
                    Recruitment Service
                  </a>
                  <a className="text-white mb-2 text-decoration-none" href="#">
                    RSS
                  </a>
                </div>
              </div>

              <div className="col-md-4 mb-3">
                <pre></pre>
                <div className="d-flex flex-column justify-content-start">
                  <a className="text-white mb-2 text-decoration-none" href="#">
                    Partners
                  </a>
                  <a className="text-white mb-2 text-decoration-none" href="#">
                    Sitemap
                  </a>
                  <a className="text-white mb-2 text-decoration-none" href="#">
                    Contact Us
                  </a>
                  <a className="text-white mb-2 text-decoration-none" href="#">
                    Privacy, Cookies, Terms & Conditions
                  </a>
                  <a className="text-white mb-2 text-decoration-none" href="#">
                    وظائف مصر
                  </a>
                </div>
              </div>

              <div className="col-md-4 mb-3">
                <h5 className="font-weight-bold text-white mb-4">Follow Us</h5>
                <div className="mb-4">
                  <FontAwesomeIcon
                    classNameName="socialMedia_Facebook icon header_icon text-white me-3"
                    icon={faFacebookF}
                  />

                  <FontAwesomeIcon
                    classNameName="socialMedia_Twitter icon header_icon  text-white me-3"
                    icon={faLinkedin}
                  />

                  <FontAwesomeIcon
                    classNameName="socialMedia_LinkedIn icon header_icon text-white me-3"
                    icon={faTwitter}
                  />
                </div>
                <p className="fs-6">
                  © 2021 WUZZUF. All Rights Reserved. Owned by BasharSoft LLC.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
