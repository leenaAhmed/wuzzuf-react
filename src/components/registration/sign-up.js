import React, { useContext, useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { languageContext } from "../../contexts/languageContext";
import { db } from "../../firebase";
import { toast } from 'react-toastify';
import arLang from '../../language/auth/العربية.json'
import enLang from '../../language/auth/English.json'

function SignUp() {
    const [error, setError] = useState('')
    const emailRef = useRef()
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const passwordRef = useRef()
    const history = useHistory()
    const { signUp, currentUser } = useAuth()
    const { lang, setLang } = useContext(languageContext)
    const [formError, setFormError] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    });
    const [user, setUser] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    })
    const [json, Setjson] = useState(enLang);
    useEffect(() => {
        if (lang == "English") { Setjson(enLang) }
        if (lang == 'العربية') { Setjson(arLang) }
    }, [lang])
    const handle = (e) => {
        if (e.target.name == "email") {
            if (e.target.value == "") {
                setFormError({ ...formError, email: `${json[0].signUp[0].emailError}` })
            } else {
                setFormError({ ...formError, email: "" });
            }
        } else if (e.target.name == "password") {
            if (e.target.value == "") {
                setFormError({ ...formError, password: `${json[0].signUp[0].passwordError}` })
            } else {
                setFormError({ ...formError, password: "" });
            }
        }
        else if (e.target.name == "lastName") {
            if (e.target.value == "") {
                setFormError({ ...formError, lastName: `${json[0].signUp[0].lastNameError}` })
            } else {
                setFormError({ ...formError, lastName: "" });
            }
        }
        else if (e.target.name == "firstName") {
            if (e.target.value == "") {
                setFormError({ ...formError, firstName:`${json[0].signUp[0].firstNameError}` })
            } else {
                setFormError({ ...formError, firstName: "" });
            }
        }
    }
    const handleInputs = (e) => {
        if (e.target.name == "email") {
            setUser({ ...user, email: e.target.value })
            if (e.target.value == "") {
                setFormError({ ...formError, email: `${json[0].signUp[0].emailError}`})
            } else {
                setFormError({ ...formError, email: "" });
            }
        } else if (e.target.name == "password") {
            setUser({ ...user, password: e.target.value })
            if (e.target.value == "") {
                setFormError({ ...formError, password:  `${json[0].signUp[0].passwordError}`  })
            } else {
                setFormError({ ...formError, password: "" });
            }
        }
        else if (e.target.name == "lastName") {
            setUser({ ...user, lastName: e.target.value })
            if (e.target.value == "") {
                setFormError({ ...formError, lastName: `${json[0].signUp[0].lastNameError}` })
            } else {
                setFormError({ ...formError, lastName: "" });
            }
        }
        else if (e.target.name == "firstName") {
            setUser({ ...user, firstName: e.target.value })
            if (e.target.value == "") {
                setFormError({ ...formError, firstName: `${json[0].signUp[0].firstNameError}`  })
            } else {
                setFormError({ ...formError, firstName: "" });
            }
        }
    }
    async function handleSumbite(e) {
        e.preventDefault()
        try {
            setError("")
            await signUp(emailRef.current.value, passwordRef.current.value).then((auth) => {
                if (auth) {
                    db.collection("users")
                        .doc(auth.user.uid)
                        .set({
                            email: emailRef.current.value,
                            firstName: firstNameRef.current.value,
                            lastName: lastNameRef.current.value,
                        }).then(() => {
                            toast.success(`${json[0].signUp[0].toast}`, {
                                position: toast.POSITION.TOP_LEFT
                            })
                            history.push("/")
                        })
                }
            })
        }
        catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    setError(`${json[0].signUp[0].errorP}`)
                    break;

                case "auth/invalid-email":
                    setError(`${json[0].signUp[0].errorE}`)
                    break;
                case "auth/email-already-exists":
                    setError(`${json[0].signUp[0].errorExist}`)
                    break;
                case "auth/weak-password":
                    setError(`${json[0].signUp[0].errorPasswordWeak}`)
                    break;

                default:
                    setError(`${json[0].signUp[0].errorExist}`)

            }
        }
    }
    return (
        <>
            <div className="container-fluid" >
                <div className="row">
                    <div className="layout" dir={lang === "English" ? "ltr" : "rtl"}>
                        <div className=" d-flex align-content-center justify-content-center flex-column">
                            <section className="m-auto">
                                <h2 className="text-light text-center fw-bolder">WUZZUF</h2>
                                <div className="card" style={{ "width": "25rem" }} >
                                    <div className="card-body">
                                        <p className="card-title text-center fw-bold">{json[0].signUp[0].welcome}</p>
                                        <hr />
                                        <div className="row">
                                            <div className="col-12">
                                                <form className="mb-2" onSubmit={handleSumbite} >
                                                    <span className="text-danger">{error}</span>
                                                    <div className="row">
                                                        <div className=" mt-1 col-6">
                                                            <label htmlFor="firstName" className="form-label ">{json[0].signUp[0].firstName}</label>
                                                            <input type="text" ref={firstNameRef}
                                                                onBlur={handle}
                                                                onChange={handleInputs}
                                                                name="firstName" className="form-control " id="firstName"
                                                            />
                                                            <span className="text-danger mt-2">
                                                                {formError.firstName}
                                                            </span>
                                                        </div>
                                                        <div className="mt-1 col-6">
                                                            <label htmlFor="lastName" className="form-label">{json[0].signUp[0].lastName}</label>
                                                            <input type="text" name="lastName" onBlur={handle} ref={lastNameRef}
                                                                onChange={handleInputs} className="form-control" id="lastName"
                                                            />
                                                            <span className="text-danger mt-2">
                                                                {formError.lastName}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="mt-1">
                                                        <label htmlFor="exampleInputEmail1" className="form-label">{json[0].signUp[0].email}</label>
                                                        <input type="email" name="email" onBlur={handle} ref={emailRef} className="form-control" id="exampleInputEmail1"
                                                            aria-describedby="emailHelp"
                                                            onChange={handleInputs} />
                                                        <span className="text-danger mt-2">
                                                            {formError.email}
                                                        </span>
                                                    </div>
                                                    <div className="mt-1">
                                                        <label htmlFor="exampleInputPassword1" className="form-label">{json[0].signUp[0].password}</label>
                                                        <input className="form-control" onBlur={handle} ref={passwordRef} id="exampleInputPassword1" name="password"
                                                            type="password"
                                                            onChange={handleInputs}
                                                        />
                                                        <span className="text-danger mt-2">
                                                            {formError.password}
                                                        </span>
                                                    </div>
                                                    <button type="submit"
                                                        disabled={
                                                            formError.password !== "" ||
                                                            formError.email !== "" ||
                                                            formError.firstName !== "" ||
                                                            formError.lastName !== "" ||
                                                            user.password == "" ||
                                                            user.email == "" ||
                                                            user.firstName == "" ||
                                                            user.lastName == ""
                                                        }
                                                        className="btn btn-primary mt-2 w-100">{json[0].signUp[0].signUp}</button>
                                                </form>
                                                <hr />
                                                <div className="mb-3">
                                                    <h6 className={`${lang == "English" ? "ms-5" : "me-5"} text-center d-inline`}>{json[0].signUp[0].already}</h6>
                                                    <NavLink className="text-decoration-none ms-1 fs-6 form__a" to="/registration">{json[0].signUp[0].logIn}</NavLink>
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
            </div>
        </>
    )
}
export default SignUp