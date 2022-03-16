import React, { useContext, useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom";
import arLang from '../../language/auth/العربية.json'
import enLang from '../../language/auth/English.json'
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
    const [email, setEmail] = useState("")
    const history = useHistory()
    const[json,Setjson] = useState(enLang);
    useEffect(()=>
    {
      if(lang=="English") {Setjson(enLang)}
      if(lang=='العربية'){Setjson(arLang)}
    },[lang])
    const handleError = (e) => {

        if (e.target.name == "email") {
            setEmail(e.target.value)
            if (emailRef.current.value == "") {
                 setFormError(`${json[0].forgetPassword[0].emailError}`)          
                    
            } else {
                setFormError("")
            }
        }
    }
    async function resetPass(e) {
        e.preventDefault()
        try {
            await resetPassword(emailRef.current.value)
            toast.success(` ${json[0].forgetPassword[0].checkEmail} `, {
                position: "top-center",
                hideProgressBar: true,
                autoClose: 2000,
                dir: "rtl"
            })
            setTimeout(() => {
                history.push("/registration")
            }, 1500)

        } catch (error) {
             setError(`${json[0].forgetPassword[0].error}`) 
                

        }

    }
    return (
        <>
          
                <div className="layout" dir={lang === "English" ? "ltr" : "rtl"}>
                    <div className="container-fluid">
                        <div className=" d-flex align-content-center justify-content-center flex-column">
                            <section className="m-auto">
                                <h1 className="text-light text-center mb-4 fw-bolder">WUZZUF</h1>
                                <div className="card" style={{ "width": "25rem" }} >
                                    <div className="card-body">
                                        <h3 className="card-title text-center">{json[0].forgetPassword[0].resetPassword}</h3>
                                        <hr />
                                        <div className="row">
                                            <div className="col-12">

                                                <form className="mb-2" onSubmit={resetPass}>
                                                    <span className="text-danger">{error}</span>

                                                    <div className="mt-2">
                                                        <label htmlFor="exampleInputEmail1" className=" form-label">{json[0].forgetPassword[0].email}</label>
                                                        <input type="text" name="email" onBlur={handleError} onChange={handleError}
                                                     
                                                        ref={emailRef} className="form-control" id="exampleInputEmail1"
                                                        />
                                                        <span className="text-danger mt-2">{formError}</span>
                                                    </div>

                                                    <button type="submit" disabled={formError != ""|| email==""} className="btn btn-primary mt-2 w-100">{json[0].forgetPassword[0].reset}</button>
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
           </>
    )
}

export default ForgetPassword;