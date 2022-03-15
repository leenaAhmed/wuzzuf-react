import React, { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { languageContext } from "../../contexts/languageContext";
import "./login.scss";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const { lang, setLang } = useContext(languageContext);
  const [error, setError] = useState("");
  const [user,setUser]=useState({
    email: "",
    password: "",
    
})
  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const handle = (e) => {
    if (e.target.name == "email") {
      if (e.target.value == "") {
        setFormError({ ...formError, email: "Email is Required" })
      } else {
        setFormError({ ...formError, email: "" });
      }
    } else {
      if (e.target.value == "") {
        setFormError({ ...formError, password: "Password is Required" })
      } else {
        setFormError({ ...formError, password: "" });
      }
    }
  }
  const handleInputs = (e) => {
    if (e.target.name == "email") {
      setUser({...user,email:e.target.value})
      if (e.target.value == "") {
        setFormError({ ...formError, email: "Email is Required" })
      } else {
        setFormError({ ...formError, email: "" });
      }
    } else {
      setUser({...user,password:e.target.value})
      if (passwordRef.current.value == "") {
        setFormError({ ...formError, password: "Password is Required" })
      } else {
        setFormError({ ...formError, password: "" });
      }
    }
  };
  async function logIn(e) {
    e.preventDefault();


    try {
      setError("")
      await login(emailRef.current.value, passwordRef.current.value).then(user => {
        localStorage.setItem("uid", user.user.uid)
      })
      history.push("/");
      // if (setFormError({
      //   email: "",
      //   password: ""
      // })) {
      //   await login(emailRef.current.value, passwordRef.current.value).then(user => {
      //     localStorage.setItem("uid", user.user.uid)
      //   })
      //   history.push("/");
      // } else {
      //   if (emailRef.current.value == "" && passwordRef.current.value == "") {
      //     setFormError({
      //       email: "Email is invaid",
      //       password: "Password is invaid"
      //     })
      //   } else if (emailRef.current.value == "") {
      //     setFormError({
      //       email: "Email is invaid",
      //       password: ""
      //     })
      //   } else {
      //     setFormError({
      //       email: "",
      //       password: "Password is invaid"
      //     })
      //   }
    
      // }


    }catch (error) {
    
    switch(error.code){
      case "auth/wrong-password" :
      setError("Password is invaid")
      break;
    
    case "auth/invalid-email" :
      setError("Email is invaid")
      break;

      default:
        setError("Please valid your Email and Password")
    
    // setError("من فضلك ادخل البيانات بالشكل الصحيح");
  }
}
}
return (
  <>
    {/* {lang == "English" ? ( */}
    <div className="layout">
      <div className="container-fluid">
        <div className=" d-flex align-content-center justify-content-center flex-column">
          <section className="m-auto">
            <h1 className="text-light text-center mb-4 fw-bolder">
              WUZZUF
            </h1>

            <div className="card" style={{ width: "25rem" }}>
              <div className="card-body">
                <h3 className="card-title text-center">Welcome Back</h3>
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
                          Email
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
                          Password
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
                          formError.password!=="" ||
                          formError.email!=="" ||
                          user.password=="" ||
                          user.email=="" 
                        }
                      >
                        Log In
                      </button>
                    </form>
                    <NavLink to="/forget-password">
                      {" "}
                      <a className="form__a">Forget Password</a>
                    </NavLink>
                    <hr />
                    <div className="mb-3">
                      <h5 className="text-center d-inline ms-5 ">
                        NEW TO WUZZUF ?
                      </h5>
                      <NavLink
                        className="text-decoration-none ms-1 fs-6 form__a"
                        to="/sign-up"
                      >
                        Join us
                      </NavLink>
                    </div>
                    <span
                      className="fw-bold"
                      onClick={() => {
                        setLang(lang == "English" ? "العربية" : "English");
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
    {/* )  */}
    {/* : ( */}
    {/* //arabic Format
        <div className="layout" dir="rtl">
          <div className="container-fluid">
            <div className=" d-flex align-content-center justify-content-center flex-column">
              <section className="m-auto">
                <h1 className="text-light text-center mb-4 fw-bolder">
                  WUZZUF
                </h1>
                <div className="card" style={{ width: "25rem" }}>
                  <div className="card-body">
                    <h3 className="card-title text-center">مرحبا مجددا</h3>
                    <hr />
                    <div className="row">
                      <div className="col-12">
                        <form className="mb-2" onSubmit={logIn}>
                          <span className="text-danger">{error}</span>
                          <div className="mt-2">
                            <label
                              htmlFor="exampleInputEmail1"
                              className=" form-label"
                            >
                              ايميل المستخدم
                            </label>
                            <input
                              type="text"
                              name="email"
                              onChange={handleError}
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
                              كلمة المرور
                            </label>
                            <input
                              className="form-control"
                              onChange={handleError}
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
                          >
                            تسجيل الدخول
                          </button>
                        </form>
                        <NavLink to="/forget-password">
                          {" "}
                          <a className="form__a">نسيت كلمة المرور</a>
                        </NavLink>
                        <hr />
                        <div className="mb-3">
                          <h5 className="text-center d-inline me-5">
                            متسخدم جديد؟{" "}
                          </h5>
                          <NavLink
                            className="text-decoration-none ms-1 fs-6 form__a"
                            to="/sign-up"
                          >
                            انضم الينا الان
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
      )} */}
  </>
);
}

export default Login;
