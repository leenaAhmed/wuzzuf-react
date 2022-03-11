import React, { useContext, useRef, useState } from "react"
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { languageContext } from "../../contexts/languageContext";
import "./login.scss"

function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const { lang, setLang } = useContext(languageContext)
    const [error, setError] = useState("")
    const [formError, setFormError] = useState({
        email: "",
        password: ""
    })
    const history = useHistory()
    const handleError = (e) => {
        if (e.target.name == "email") {

            if (emailRef.current.value == "") {
                lang == "Englis" ? setFormError({ ...formError, email: "Email is Required" }) :
                    setFormError({ ...formError, email: " يجب ادخال ايميل المستخدم" })
            } else {
                setFormError({ ...formError, email: "" })
            }

        } else {
            if (passwordRef.current.value == "") {
                lang == "Englis" ? setFormError({ ...formError, password: "Password is Required" }) :
                    setFormError({ ...formError, password: " يجب ادخال كلمة المرور" })
            } else {
                setFormError({ ...formError, password: "" })
            }
        }
    }
    async function logIn(e) {
        e.preventDefault()

        try {
            setError("")

            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch (error) {
            lang == "English" ? setError(error.message) :
                setError("من فضلك ادخل البيانات بالشكل الصحيح")

        }

    }
    return (
        <>
            {lang == "English" ?
                <div className="layout">
                    <div className="container-fluid">
                        <div className=" d-flex align-content-center justify-content-center flex-column">
                            <section className="m-auto">
                                <h1 className="text-light text-center mb-4 fw-bolder">WUZZUF</h1>
                                <div className="card" style={{ "width": "25rem" }} >
                                    <div className="card-body">
                                        <h3 className="card-title text-center">Welcome Back</h3>
                                        <hr />
                                        <div className="row">
                                            <div className="col-12">

                                                <form className="mb-2" onSubmit={logIn}>
                                                    <span className="text-danger">{error}</span>
                                                    <div className="mt-2">
                                                        <label htmlFor="exampleInputEmail1" className=" form-label">Email</label>
                                                        <input type="text" name="email" onChange={handleError} ref={emailRef} className="form-control" id="exampleInputEmail1"
                                                        />
                                                        <span className="text-danger mt-2">{formError.email}</span>
                                                    </div>
                                                    <div className="mt-2">
                                                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                                        <input className="form-control" onChange={handleError} ref={passwordRef} id="exampleInputPassword1" name="password"
                                                            type="password" />
                                                        <span className="text-danger mt-2">{formError.password}</span>
                                                    </div>
                                                    <button type="submit" className="btn btn-primary mt-2 w-100">Log In</button>
                                                </form>
                                                <NavLink to="/forget-password"> <a className="form__a" >Forget Password</a></NavLink>
                                                <hr />
                                                <div className="mb-3">
                                                    <h5 className="text-center d-inline ms-5 ">NEW TO WUZZUF ?</h5>
                                                    <NavLink className="text-decoration-none ms-1 fs-6 form__a" to="/sign-up">Join us</NavLink>
                                                </div>
                                                <span className="fw-bold" onClick={() => {
                                                    setLang(lang == "English" ? "العربية" : "English")
                                                }} style={{ "cursor": "pointer" }}>{lang}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div> :
                //arabic Format
                <div className="layout" dir="rtl">
                    <div className="container-fluid">
                        <div className=" d-flex align-content-center justify-content-center flex-column">
                            <section className="m-auto">
                                <h1 className="text-light text-center mb-4 fw-bolder">WUZZUF</h1>
                                <div className="card" style={{ "width": "25rem" }} >
                                    <div className="card-body">
                                        <h3 className="card-title text-center">مرحبا مجددا</h3>
                                        <hr />
                                        <div className="row">
                                            <div className="col-12">

                                                <form className="mb-2" onSubmit={logIn}>
                                                    <span className="text-danger">{error}</span>
                                                    <div className="mt-2">
                                                        <label htmlFor="exampleInputEmail1" className=" form-label">ايميل المستخدم</label>
                                                        <input type="text" name="email" onChange={handleError} ref={emailRef} className="form-control" id="exampleInputEmail1"
                                                        />
                                                        <span className="text-danger mt-2">{formError.email}</span>
                                                    </div>
                                                    <div className="mt-2">
                                                        <label htmlFor="exampleInputPassword1" className="form-label">كلمة المرور</label>
                                                        <input className="form-control" onChange={handleError} ref={passwordRef} id="exampleInputPassword1" name="password"
                                                            type="password" />
                                                        <span className="text-danger mt-2">{formError.password}</span>
                                                    </div>
                                                    <button type="submit" className="btn btn-primary mt-2 w-100">تسجيل الدخول</button>
                                                </form>
                                                <NavLink to="/forget-password"> <a className="form__a" >نسيت كلمة المرور</a></NavLink>
                                                <hr />
                                                <div className="mb-3">
                                                    <h5 className="text-center d-inline me-5">متسخدم جديد؟ </h5>
                                                    <NavLink className="text-decoration-none ms-1 fs-6 form__a" to="/sign-up">انضم الينا الان</NavLink>
                                                </div>
                                                <span className="fw-bold" onClick={() => {
                                                    setLang(lang == "English" ? "العربية" : "English")
                                                }} style={{ "cursor": "pointer" }}>{lang}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>


            }</>
    )
}

export default Login;