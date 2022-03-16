import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { languageContext } from "../../contexts/languageContext";
import "./login.scss";
import arLang from '../../language/auth/العربية.json'
import enLang from '../../language/auth/English.json'

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login} = useAuth();
  const { lang, setLang } = useContext(languageContext);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [formError, setFormError] = useState({
    email: "",
    password: ""
  });
  const history = useHistory();
  const [json, Setjson] = useState(enLang);
  useEffect(() => {
    if (lang == "English") { Setjson(enLang) }
    if (lang == 'العربية') { Setjson(arLang) }
  }, [lang])
  const handle = (e) => {
    if (e.target.name === "email") {
      if (e.target.value === "") {
        setFormError({ ...formError, email: `${json[0].logIn[0].emailError}` });
      } else {
        setFormError({ ...formError, email: "" });
      }
    } else {
      if (e.target.value === "") {
        setFormError({ ...formError, password: `${json[0].logIn[0].passwordError}` });
      } else {
        setFormError({ ...formError, password: "" });
      }
    }
  };
  const handleInputs = (e) => {
    if (e.target.name === "email") {
      setUser({ ...user, email: e.target.value });
      if (e.target.value === "") {
        setFormError({ ...formError, email: `${json[0].logIn[0].emailError}` });
      } else {
        setFormError({ ...formError, email: "" });
      }
    } else {
      setUser({ ...user, password: e.target.value });
      if (passwordRef.current.value === "") {
        setFormError({ ...formError, password: `${json[0].logIn[0].passwordError}` });
      } else {
        setFormError({ ...formError, password: "" });
      }
    }
  };
  async function logIn(e) {
    e.preventDefault();
    try {
      setError("");
      await login(emailRef.current.value, passwordRef.current.value).then(
        (user) => {
          localStorage.setItem("uid", user.user.uid);
        }
      );
      window.location.href = "/";
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          setError(`${json[0].logIn[0].errorP}`);
          break;
        case "auth/invalid-email":
          setError(`${json[0].logIn[0].errorE}`);
          break;
        default:
          setError(`${json[0].logIn[0].errorD}`);
      }
    }
  }
  return (
    <>
      <div className="layout" dir={lang === "English" ? "ltr" : "rtl"}>
        <div className="container-fluid">
          <div className=" d-flex align-content-center justify-content-center flex-column">
            <section className="m-auto">
              <h1 className="text-light text-center mb-4 fw-bolder">WUZZUF</h1>
              <div className="card" style={{ width: "25rem" }}>
                <div className="card-body">
                  <h3 className="card-title text-center">{json[0].logIn[0].welcome}</h3>
                  <hr />
                  <div className="row">
                    <div className="col-12">
                      <form className="mb-2" onSubmit={logIn}>
                        <span className="text-danger fw-bold">{error}</span>
                        <div className="mt-2">
                          <label
                            htmlFor="exampleInputEmail1"
                            className=" form-label"
                          >
                            {json[0].logIn[0].email}
                          </label>
                          <input
                            type="text"
                            name="email"
                            onBlur={handle}
                            onChange={handleInputs}
                            ref={emailRef}
                            className="form-control"
                            id="exampleInputEmail1"
                          />
                          <span className="text-danger mt-2">
                            {formError.email}
                          </span>
                        </div>
                        <div className="mt-2">
                          <label
                            htmlFor="exampleInputPassword1"
                            className="form-label"
                          >
                            {json[0].logIn[0].password}
                          </label>
                          <input
                            className="form-control"
                            onBlur={handle}
                            onChange={handleInputs}
                            ref={passwordRef}
                            id="exampleInputPassword1"
                            name="password"
                            type="password"
                          />
                          <span className="text-danger mt-2">
                            {formError.password}
                          </span>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary mt-2 w-100"
                          disabled={
                            formError.password !== "" ||
                            formError.email !== "" ||
                            user.password === "" ||
                            user.email === ""
                          }
                        >
                          {json[0].logIn[0].logIn}
                        </button>
                      </form>
                      <NavLink to="/registration/forget-password">
                        <a className="form__a">{json[0].logIn[0].forgetPassword}</a>
                      </NavLink>
                      <hr />
                      <div className="mb-3">
                        <h5
                          className={`${lang == "English" ? "ms-5" : "me-5"} text-center d-inline`}>
                          {json[0].logIn[0].new}
                        </h5>
                        <NavLink
                          className="text-decoration-none ms-1 fs-6 form__a"
                          to="/registration/sign-up"
                        >
                          {json[0].logIn[0].join}
                        </NavLink>
                      </div>
                      <span
                        className="fw-bold"
                        onClick={() => {
                          setLang(lang === "English" ? "العربية" : "English");
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {lang}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

    </>
  );
}

export default Login;
