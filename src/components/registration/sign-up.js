import React, { useContext, useRef, useState } from "react"
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { languageContext } from "../../contexts/languageContext";
import { db } from "../../firebase";
import { toast } from 'react-toastify';
import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'



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
    const [user,setUser]=useState({
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    })
    const handle = (e) => {
        if (e.target.name == "email") {
            if (e.target.value == "") {
                setFormError({ ...formError, email: "Email is Required" })
            } else {
                setFormError({ ...formError, email: "" });
            }
        } else if (e.target.name == "password") {
            if (e.target.value == "") {
                setFormError({ ...formError, password: "Password is Required" })
            } else {
                setFormError({ ...formError, password: "" });
            }
        }
        else if (e.target.name == "lastName") {
            if (e.target.value == "") {
                setFormError({ ...formError, lastName: "Last Name is Required" })
            } else {
                setFormError({ ...formError, lastName: "" });
            }
        }
        else if (e.target.name == "firstName") {
            if (e.target.value == "") {
                setFormError({ ...formError, firstName: "First Name is Required" })
            } else {
                setFormError({ ...formError, firstName: "" });
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
        } else if (e.target.name == "password") {
            setUser({...user,password:e.target.value})
            if (e.target.value == "") {
                setFormError({ ...formError, password: "Password is Required" })
            } else {
                setFormError({ ...formError, password: "" });
            }
        }
        else if (e.target.name == "lastName") {
            setUser({...user,lastName:e.target.value})
            if (e.target.value == "") {
                setFormError({ ...formError, lastName: "Last Name is Required" })
            } else {
                setFormError({ ...formError, lastName: "" });
            }
        }
        else if (e.target.name == "firstName") {
            setUser({...user,firstName:e.target.value})
            if (e.target.value == "") {
                setFormError({ ...formError, firstName: "First Name is Required" })
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
                            toast.success("Sign up succesfully !", {
                                position: toast.POSITION.TOP_LEFT
                            })
                            history.push("/")
                        })
                }
            })
        }
        catch (error) {
            switch(error.code){
                case "auth/wrong-password" :
                setError("Password is invaid")
                break;
              
              case "auth/invalid-email" :
                setError("Email is invaid")
                break;  
                case "auth/email-already-exists" :
                setError("Email Already Exists")
                break; 
                case "auth/weak-password" :
                setError("Password must be more than 6 character")
                break;
          
                default:
                  setError("Please valid your Email and Password")
              
              // setError("من فضلك ادخل البيانات بالشكل الصحيح");
            }
        }
    }
    return (
        <>
            {/* {lang == "English" ?
                //english Format */}
            <div className="container-fluid">
                <div className="row">
                    <div className="layout">
                        <div className=" d-flex align-content-center justify-content-center flex-column">
                            <section className="m-auto">
                                <h2 className="text-light text-center fw-bolder">WUZZUF</h2>
                                <div className="card" style={{ "width": "25rem" }} >
                                    <div className="card-body">
                                        <p className="card-title text-center fw-bold">Sign Up and Start Applying For Jobs</p>
                                        <hr />
                                        <div className="row">
                                            <div className="col-12">

                                                <form className="mb-2" onSubmit={handleSumbite} >
                                                    <span className="text-danger">{error}</span>
                                                    <div className="row">

                                                  
                                                    <div className=" mt-1 col-6">
                                                        <label htmlFor="firstName" className="form-label ">First Name</label>
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
                                                        
                                                        <label htmlFor="lastName" className="form-label">Last Name</label>
                                                        <input type="text" name="lastName" onBlur={handle} ref={lastNameRef}
                                                       onChange={handleInputs} className="form-control" id="lastName"
                                                        />
                                                        <span className="text-danger mt-2">
                                                            {formError.lastName}
                                                        </span>
                                                    </div>
                                                    </div>
                                                    <div className="mt-1">
                                                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                                        <input type="email" name="email" onBlur={handle} ref={emailRef} className="form-control" id="exampleInputEmail1"
                                                            aria-describedby="emailHelp"
                                                            onChange={handleInputs} />
                                                        <span className="text-danger mt-2">
                                                            {formError.email}
                                                        </span>
                                                    </div>
                                                    <div className="mt-1">
                                                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                                        <input className="form-control" onBlur={handle} ref={passwordRef} id="exampleInputPassword1" placeholder="Password" name="password"
                                                            type="password" 
                                                            onChange={handleInputs}
                                                            
                                                            />
                                                        <span className="text-danger mt-2">
                                                            {formError.password}
                                                        </span>
                                                    </div>
                                                    <button type="submit"
                                                    disabled={
                                                        formError.password!=="" ||
                                                        formError.email!=="" ||
                                                        formError.firstName!=="" ||
                                                        formError.lastName!=="" ||
                                                        user.password=="" ||
                                                        user.email=="" ||
                                                        user.firstName=="" ||
                                                        user.lastName=="" 
                                                        
                                                    }
                                                     className="btn btn-primary mt-2 w-100">Sign Up</button>
                                                </form>
                                                <hr />
                                                <div className="mb-3">
                                                    <h6 className="te}xt-center d-inline ms-5 ">Already in WUZZUF ?</h6>
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
            </div>
            {/* :
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
                </div>} */}
        </>
    )
}
export default SignUp