import React, { useContext, useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { useAuth } from "../../contexts/authContext";
import { languageContext } from "../../contexts/languageContext";
import "./login.scss"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

function ForgetPassword() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { resetPassword } = useAuth()
    const { lang, setLang } = useContext(languageContext)

    const [formError, setFormError] = useState("")
    const [error, setError] = useState("")
    const history = useHistory()

    const handleError = (e) => {

        if (e.target.name == "email") {
            if (emailRef.current.value == "") {
                lang == "English" ? setFormError("Email is Required") :
                    setFormError("يجب ادخال ايميل المستخدم")
            } else {
                setFormError("")
            }
        }
    }
    async function resetPass(e) {
        e.preventDefault()
        try {
            await resetPassword(emailRef.current.value)
            toast.success(`${lang == "English" ? 'Check Your Mail' : 'راجع بريدك الالكتروني'}`, {
                position: "top-center",
                hideProgressBar: true,
                autoClose: 2000,
                dir: "rtl"
            })
            setTimeout(() => {
                history.push("/login")
            }, 1500)

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
                                        <h3 className="card-title text-center">Reset Password</h3>
                                        <hr />
                                        <div className="row">
                                            <div className="col-12">

                                                <form className="mb-2" onSubmit={resetPass}>
                                                    <span className="text-danger">{error}</span>

                                                    <div className="mt-2">
                                                        <label htmlFor="exampleInputEmail1" className=" form-label">Enter Your Email</label>
                                                        <input type="text" name="email" onChange={handleError} ref={emailRef} className="form-control" id="exampleInputEmail1"
                                                        />
                                                        <span className="text-danger mt-2">{formError}</span>
                                                    </div>

                                                    <button type="submit" disabled={formError != ""} className="btn btn-primary mt-2 w-100">Reset</button>
                                                </form>

                                                <hr />

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
                                        <h3 className="card-title text-center"> اعادة تعيين كلمةالمرور</h3>
                                        <hr />
                                        <div className="row">
                                            <div className="col-12">

                                                <form className="mb-2" onSubmit={resetPass}>
                                                    <span className="text-danger">{error}</span>

                                                    <div className="mt-2">
                                                        <label htmlFor="exampleInputEmail1" className=" form-label">ادخل ايميل المستخدم</label>
                                                        <input type="text" name="email" onChange={handleError} ref={emailRef} className="form-control" id="exampleInputEmail1"
                                                        />
                                                        <span className="text-danger mt-2">{formError}</span>
                                                    </div>

                                                    <button type="submit" disabled={formError != ""} className="btn btn-primary mt-2 w-100"> ارسال </button>
                                                </form>

                                                <hr />

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

export default ForgetPassword;