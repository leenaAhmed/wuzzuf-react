import { current } from "@reduxjs/toolkit";
import React, { useContext, useRef, useState } from "react"
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { languageContext } from "../../contexts/languageContext";
function SignUp() {
    const [error, setError] = useState('')
    const emailRef = useRef()
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const passwordRef = useRef()
    const history=useHistory()
    const { signUp, currentUser } = useAuth()
    const { lang, setLang } = useContext(languageContext)

    async function handleSumbite(e) {
        e.preventDefault()
        try {
            setError("")
            await signUp(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        }
        catch (error) {
            lang == "English" ? setError(error.message) : setError("من فضلك ادخل البيانات بالشكل الصحيح")
        }
    }
    return (
        <>
            {lang == "English" ?
                //english Format
                <div className="container-fluid">
                    <div className="row">
                        <div className="layout">
                            <div className=" d-flex align-content-center justify-content-center flex-column">
                                <section className="m-auto">
                                    <h2 className="text-light text-center fw-bolder">WUZZUF</h2>
                                    <div className="card" style={{ "width": "25rem" }} >
                                        <div className="card-body">
                                            <p className="card-title text-center">Sign Up and Start Applying For Jobs</p>
                                            <hr />
                                            <div className="row">
                                                <div className="col-12">

                                                    <form className="mb-2" onSubmit={handleSumbite} >
                                                        <span className="text-danger">{error}</span>
                                                        <div className=" mt-1">
                                                            <label htmlFor="firstName" className="form-label ">First Name</label>
                                                            <input type="text" ref={firstNameRef} name="firstName" className="form-control " id="firstName"
                                                            />
                                                        </div>
                                                        <div className="mt-1">
                                                            <label htmlFor="lastName" className="form-label">Last Name</label>
                                                            <input type="text" name="lastName" ref={lastNameRef} className="form-control" id="lastName"
                                                            />
                                                        </div>
                                                        <div className="mt-1">
                                                            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                                            <input type="email" name="email" ref={emailRef} className="form-control" id="exampleInputEmail1"
                                                                aria-describedby="emailHelp" />
                                                        </div>
                                                        <div className="mt-1">
                                                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                                            <input className="form-control" ref={passwordRef} id="exampleInputPassword1" placeholder="Password" name="password"
                                                                type="password" />
                                                        </div>
                                                        <button type="submit" className="btn btn-primary mt-2 w-100">Sign Up</button>
                                                    </form>
                                                    <hr />
                                                    <div className="mb-3">
                                                        <h6 className="text-center d-inline ms-5 ">Already in WUZZUF ?</h6>
                                                        <NavLink className="text-decoration-none ms-1 fs-6 form__a" to="/login">Log In</NavLink>
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
                </div> :
                //ARABIC Format
                <div className="container-fluid" dir="rtl">
                    <div className="row">
                        <div className="layout">
                            <div className=" d-flex align-content-center justify-content-center flex-column">
                                <section className="m-auto">
                                    <h2 className="text-light text-center fw-bolder">WUZZUF</h2>
                                    <div className="card" style={{ "width": "25rem" }} >
                                        <div className="card-body">
                                            <p className="card-title text-center">سجل و ابدا في التقديم علي الوظائف</p>
                                            <hr />
                                            <div className="row">
                                                <div className="col-12">

                                                    <form className="mb-2" onSubmit={handleSumbite} >
                                                        <span className="text-danger">{error}</span>
                                                        <div className=" mt-2">
                                                            <label htmlFor="firstName" className="form-label ">الاسم الاول</label>
                                                            <input type="text" ref={firstNameRef} name="firstName" className="form-control " id="firstName"
                                                            />
                                                        </div>
                                                        <div className="mt-2">
                                                            <label htmlFor="lastName" className="form-label">الاسم الثاني</label>
                                                            <input type="text" name="lastName" ref={lastNameRef} className="form-control" id="lastName"
                                                            />
                                                        </div>
                                                        <div className="mt-2">
                                                            <label htmlFor="exampleInputEmail1" className="form-label">ايميل المستخدم</label>
                                                            <input type="email" name="email" ref={emailRef} className="form-control" id="exampleInputEmail1"
                                                                aria-describedby="emailHelp" />
                                                        </div>
                                                        <div className="mt-2">
                                                            <label htmlFor="exampleInputPassword1" className="form-label">كلمة المرور</label>
                                                            <input className="form-control" ref={passwordRef} id="exampleInputPassword1" name="password"
                                                                type="password" />
                                                        </div>
                                                        <button type="submit" className="btn btn-primary mt-2 w-100">تسجيل</button>
                                                    </form>
                                                    <hr />
                                                    <div className="mb-3">
                                                        <h6 className="text-center d-inline me-5 "> بالفعل علي وظف ؟ </h6>
                                                        <NavLink className="text-decoration-none ms-1 fs-6 form__a" to="/login"> تسجيل الدخول </NavLink>
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
                </div>}
        </>
    )
}
export default SignUp