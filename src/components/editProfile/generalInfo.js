import React, { useEffect, useState, useRef, useContext } from 'react';
import './editProfile.scss'
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/authContext"
import { db, storage } from "../../firebase";
import Select from 'react-select';
import { toast } from 'react-toastify';
import { languageContext } from '../../contexts/languageContext';

import ar from "../../language/editProfile/general-info/ar.json"
import en from "../../language/editProfile/general-info/en.json"

export default function GeneralInfo() {
    const { currentUser } = useAuth()
    const [userDetails, setUserDetails] = useState({});
    const dayOptions = displayDaysInSelect()
    const monthOptions = displayMonthInSelect()
    const yearOptions = displayYearInSelect()
    const { lang, setLang } = useContext(languageContext);
    const [json, setJson] = useState(en);
    const history = useHistory();
    const [progress, setProgress] = useState(0)
    const [image, setImage] = useState("")
    const fileRef = useRef(null);
    const [visible, setVisible] = useState(false);

    const militaryStatus = [
        { value: 'not applicable', label: 'Not Applicable' },
        { value: 'exempted', label: 'Exempted' },
        { value: 'completed', label: 'Completed' },
        { value: 'postponed', label: 'Postponed' },
    ]


    const militaryStatusAr = [
        { value: 'not applicable', label: json.notApplicable },
        { value: 'exempted', label: json.extepmted },
        { value: 'completed', label: json.completed },
        { value: 'postponed', label: json.posponded },
    ]



    console.log(currentUser);
    useEffect(() => {
        if (lang == "English") { setJson(en) }
        if (lang == 'العربية') { setJson(ar) }
    }, [lang])

    //get user details according to auth
    useEffect(() => {
        if (currentUser) {
            const userId = currentUser.uid
            // console.log(userId);
            db.collection("users").doc(userId).onSnapshot((doc) => {
                if (doc.exists) {
                    setUserDetails(doc.data())
                }
            })
        }

    }, [currentUser])

    useEffect(() => {
        progress === 0 ? setVisible(false) : setVisible(true)
    }, [progress])

    console.log(userDetails);

    const firstNameChangeHandler = (event) => {
        setUserDetails((prevState) => {
            return {
                ...prevState,
                firstName: event.target.value
            }
        })
    }

    const lastNameChangeHandler = (event) => {
        setUserDetails((prevState) => {
            return {
                ...prevState,
                lastName: event.target.value
            }
        })
    }

    const middleNameChangeHandler = (event) => {
        setUserDetails((prevState) => {
            return {
                ...prevState,
                middleName: event.target.value
            }
        })
    }

    const genderChangeHandler = (event) => {
        setUserDetails((prevState) => {
            return {
                ...prevState,
                gender: event.target.value
            }
        })
    }

    const militaryChangeHandler = (selectedOption) => {
        setUserDetails((prevState) => {
            return {
                ...prevState,
                militarySatus: selectedOption.value
            }
        })
    }

    const dayChangeHandler = (selectedOption) => {
        setUserDetails((prevState) => {
            return {
                ...prevState,
                birthDate: {
                    ...prevState.birthDate,
                    day: selectedOption.value
                }
            }
        })
    }

    const monthChangeHandler = (selectedOption) => {
        setUserDetails((prevState) => {
            return {
                ...prevState,
                birthDate: {
                    ...prevState.birthDate,
                    month: selectedOption.value
                }
            }
        })
    }

    const yearChangeHandler = (selectedOption) => {
        setUserDetails((prevState) => {
            return {
                ...prevState,
                birthDate: {
                    ...prevState.birthDate,
                    year: selectedOption.value
                }
            }
        })
    }

    function displayDaysInSelect() {
        const dayOptions = [];
        for (let i = 1; i <= 31; i++) {
            dayOptions.push({
                value: i, label: i
            })
        }
        return dayOptions
    }

    function displayMonthInSelect() {
        var months = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"];

        let monthOption = [];
        months.map((month) => {
            monthOption.push({
                value: month, label: month
            })
        })

        return monthOption
    }

    function displayYearInSelect() {
        let yearOption = []
        for (let i = 2012; i >= 1990; i--) {
            yearOption.push({
                value: i, label: i
            })
        }
        return yearOption

    }

    const mobileNoChangeHandler = (event) => {
        setUserDetails((prevState) => {
            return {
                ...prevState,
                mobile: event.target.value
            }
        })
    }

    const altMobileNoChangeHandler = (event) => {
        setUserDetails((prevState) => {
            return {
                ...prevState,
                altMobile: event.target.value
            }
        })
    }

    const maritalStatusChangeHandler = (event) => {
        setUserDetails((prevState) => {
            return {
                ...prevState,
                maritalStatus: event.target.value
            }
        })
    }

    const drivingLicenseChangeHandler = (event) => {
        setUserDetails((prevState) => {
            return {
                ...prevState,
                drivingLicense: event.target.value
            }
        })
    }

    const carOwnChangeHandler = (event) => {
        setUserDetails((prevState) => {
            return {
                ...prevState,
                carOwn: event.target.value
            }
        })
    }

    const tagLineChangeHandler = (event) => {
        setUserDetails((prevState) => {
            return {
                ...prevState,
                title: event.target.value
            }
        })
    }

    const relocationChangeHandler = (event) => {
        setUserDetails((prevState) => {
            return {
                ...prevState,
                relocation: event.target.value
            }
        })
    }

    const postalCodeChangeHandler = (event) => {
        setUserDetails((prevState) => {
            return {
                ...prevState,
                postalCode: event.target.value
            }
        })
    }

    const imageChangeHandler = (event) => {
        if (event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }


    async function uploadImage(e) {
        e.preventDefault()
        if (!image) return;
        const storageRef = storage.ref(`/users/${currentUser?.uid}`).child(image.name)
        const colllectionRef = db.collection("users")

        const uploadTask = storageRef.put(image)

        uploadTask.on("state_changed", (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            setProgress(progress)

        }, (err) => {
            console.log(err)
        },
            () => {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setProgress("uploaded succesfully")
                    if (currentUser) {
                        colllectionRef.doc(currentUser.uid).set({
                            imageUrl: downloadURL,
                            imageName: image.name
                        }, { merge: true }).then(() => {
                            toast.success("image uploaded succesfully !", {
                                position: toast.POSITION.TOP_LEFT
                            })
                            fileRef.current.value = "";
                        })
                    }
                });
            }
        )
    }


    const delteImageHandler = (e) => {
        e.preventDefault()
        const imageRef = storage.ref(`/users/${currentUser?.uid}`).child(userDetails.imageName)
        const colllectionRef = db.collection("users")
        imageRef.delete().then(() => {
            console.log("gile delet");
            colllectionRef.doc(currentUser.uid).set({
                imageName: "",
                imageUrl: ""
            }, { merge: true }).then(() => {
                toast.success("image deleted succesfully !", {
                    position: toast.POSITION.TOP_LEFT
                })
                fileRef.current.value = "";
            })
        }).catch((error) => {
            console.log(error);

        });
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if (currentUser) {
            const userId = currentUser.uid

            db.collection("users").doc(userId)
                .set(userDetails).then(() => {
                    console.log(userDetails);

                }).then(() => {
                    toast.success("general info updated succesfully !", {
                        position: toast.POSITION.TOP_LEFT
                    })
                })
        }
    }




    return (<>
        <article className="col-lg-8 col-md-12">
            <div className="row">
                <div className="col-md-12">
                    <div className="midsection mb-4" style={lang=="English" ?{paddingLeft : "5px"} : {paddingRight : "20px"}}>

                        <form className="row">
                            <div className="col-12 py-3">
                                <section className="profile_image_box row px-3 py-2 w-100">
                                    <div className="col-3 w-10">
                                        <img src={userDetails.imageUrl ? userDetails.imageUrl : "/default.png"} className="profile-img rounded-circle w-100" alt="profile-img" />
                                    </div>
                                    <div className="col-9 mt-2">
                                        <h4>{json.profilePhoto}</h4>
                                        <p>{json.imgTypeMsg}</p>
                                        <input ref={fileRef} type="file" onChange={imageChangeHandler} />

                                        <button onClick={uploadImage} className="btn btn-primary">{json.changePhoto}</button>
                                        {
                                            userDetails.imageUrl &&
                                            <button onClick={delteImageHandler} className="btn btn-danger bt-sm ms-1 cursor-pointer">{json.delete}</button>
                                        }
                                        {
                                            visible && <p className="midsection__form__pa mt-2">Uploaded {progress} %</p>
                                        }
                                    </div>
                                </section>
                                <h5>{json.presonalInfo}</h5>
                            </div>
                            <div className="col-md-6 ">
                                <div className="midsection__form">
                                    <label htmlFor="FirstName" className="form-label labelFont">{json.firstName}</label>
                                    <span className="text-danger">*</span>
                                    <input type="text"
                                        className="form-control"
                                        id="FirstName"
                                        value={userDetails.firstName ? userDetails.firstName : ""}
                                        onChange={firstNameChangeHandler}
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="midsection__form">
                                    <label htmlFor="MiddleName" className="form-label">{json.middleName}</label>
                                    <input type="text"
                                        className="form-control"
                                        id="MiddleName"
                                        value={userDetails.middleName ? userDetails.middleName : ""}
                                        onChange={middleNameChangeHandler}
                                    />
                                </div>
                            </div>

                            <div className="col-md-6 ">
                                <div className="midsection__form">
                                    <label htmlFor="LastName" className="form-label labelFont">{json.lastName}</label>
                                    <span className="text-danger">*</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="LastName"
                                        value={userDetails.lastName ? userDetails.lastName : ""}
                                        onChange={lastNameChangeHandler} />
                                </div>
                            </div>

                            <div className="col-md-7 ">
                                <div className="midsection__form">
                                    <label className="col-form-label form-label">{json.birthDay}</label>
                                    <span className="text-danger">*</span>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <Select className='w-100'
                                                options={dayOptions}
                                                placeholder={userDetails.birthDate ? userDetails.birthDate.day : "day"}
                                                onChange={dayChangeHandler}
                                                noOptionsMessage="day"
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <Select className='w-100'
                                                options={monthOptions}
                                                placeholder={userDetails.birthDate ? userDetails.birthDate.month : "month"}
                                                onChange={monthChangeHandler}
                                                noOptionsMessage="month"
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <Select className='w-100'
                                                options={yearOptions}
                                                placeholder={userDetails.birthDate ? userDetails.birthDate.year : "year"}
                                                onChange={yearChangeHandler}
                                                noOptionsMessage="year"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 ">
                                <div className="midsection__form">
                                    <label className="col-form-label form-label">{json.gender}</label>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="Gender" id="Male"
                                                value="male" checked={userDetails.gender === "male"} onChange={genderChangeHandler} />
                                            {json.male}
                                        </label> &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="Gender" id="Female"
                                                value="female" checked={userDetails.gender === "female"} onChange={genderChangeHandler} />
                                            {json.female}
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-7 ">
                                <div className="midsection__form">
                                    <label className="col-form-label form-label">{json.militraySatus}</label>
                                    <Select className='w-100'
                                        options={lang == "English" ? militaryStatus  : militaryStatusAr}
                                        placeholder={userDetails.militarySatus}
                                        onChange={militaryChangeHandler}
                                    />
                                </div>
                            </div>

                            <div className="col-md-12 ">
                                <div className="midsection__form">
                                    <label className="col-form-label form-label">{json.maritalStatus}</label>
                                    <div className="form-check" onChange={maritalStatusChangeHandler}>
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="MaritalStatus"
                                                id="unspecified" value="unspecified"
                                                checked={userDetails.maritalStatus === "unspecified"}
                                            />
                                            {json.unspecified}
                                        </label> &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="MaritalStatus"
                                                id="single" value="single"
                                                checked={userDetails.maritalStatus === "single"} />
                                            {json.single}
                                        </label> &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="MaritalStatus"
                                                id="married" value="married"
                                                checked={userDetails.maritalStatus === "married"} />
                                            {json.married}
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 ">
                                <div className="midsection__form">
                                    <label className="col-form-label form-label">{json.license}</label>
                                    <div className="form-check" onChange={drivingLicenseChangeHandler}>
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="license" id="Yes"
                                                value="yes" checked={userDetails.drivingLicense === "yes"} />
                                            {json.yes}
                                        </label> &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="license" id="No"
                                                value="no" checked={userDetails.drivingLicense === "no"} />
                                            {json.no}
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 ">
                                <div className="midsection__form">
                                    <label className="col-form-label form-label">{json.car}</label>
                                    <div className="form-check">
                                        <label className="form-check-label" >
                                            <input type="radio" className="form-check-input" name="Car" id="Yes"
                                                value="yes"
                                                checked={userDetails.carOwn === "yes"} onChange={carOwnChangeHandler} />
                                            {json.yes}
                                        </label> &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="Car" id="No"
                                                value="no" onChange={carOwnChangeHandler}
                                                checked={userDetails.carOwn === "no"} />
                                            {json.no}
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-9 ">
                                <div className="midsection__form">
                                    <label htmlFor="TagLine" className="form-label labelFont">{json.tagLine}</label>
                                    <input type="text" className="form-control" id="TagLine"
                                        onChange={tagLineChangeHandler}
                                        value={userDetails.title ? userDetails.title : ""}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-12 mb-4 ">
                        <div className="midsection"  style={lang=="English" ?{paddingLeft : "5px"} : {paddingRight : "20px"}}>
                            <h5>{json.location}</h5>
                            <form className="row">
                                <div className="col-md-7">
                                    <div className="midsection__form">
                                        {/* <label className="col-form-label form-label">Country <span
                                            className="text-danger">*</span></label> */}
                                        {/* <select className="form-select mb-2" id="Country"
                                            aria-label="Disabled select example">
                                            <option disabled selected>Select..</option>
                                        </select>
                                        <label className="col-form-label form-label">City <span
                                            className="text-danger">*</span></label>
                                        <select className="form-select mb-2" id="City"
                                            aria-label="Disabled select example">
                                            <option disabled selected>Select..</option>
                                        </select>
                                        <label className="col-form-label form-label">Area</label>
                                        <select className="form-select" id="Area" aria-label="Disabled select example">
                                            <option disabled selected>Select..</option>
                                        </select> */}

                                    </div>
                                </div>

                                <div className="col-md-7 ">
                                    <div className="midsection__form">
                                        <label htmlFor="postalCode" className="form-label labelFont">{json.postalCode}</label>
                                        <input type="text" className="form-control" id="postalCode"
                                            onChange={postalCodeChangeHandler}
                                            value={userDetails.postalCode ? userDetails.postalCode : ""}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-12 ">
                                    <div className="midsection__form">
                                        <label className="col-form-label form-label">{json.relocate}</label>
                                        <div className="form-check">
                                            <label className="form-check-label">
                                                <input type="radio" className="form-check-input" name="opportunity"
                                                    id="Yes" value="yes" checked={userDetails.relocation === "yes"} onChange={relocationChangeHandler} />
                                                {json.yes}
                                            </label> &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                                            <label className="form-check-label">
                                                <input type="radio" checked={userDetails.relocation === "no"} onChange={relocationChangeHandler} className="form-check-input" name="opportunity"
                                                    id="No" value="no" />
                                                {json.no}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>


                    <div className="col-md-12 mb-4 ">
                        <div className="midsection"  style={lang=="English" ?{paddingLeft : "5px"} : {paddingRight : "20px"}}>
                            <h5>{json.contactInfo}</h5>
                            <div className="row">
                                <div className="col-md-6 me-5">
                                    <div className="midsection__form">
                                        <label htmlFor="TagLine" className="form-label labelFont">{json.mobileNumber}</label>
                                        <span className="text-danger">*</span>
                                        <input type="text" onChange={mobileNoChangeHandler}
                                            value={userDetails.mobile ? userDetails.mobile : ""}
                                            className="form-control" id="TagLine" />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="midsection__form">
                                        <label htmlFor="TagLine" className="form-label labelFont">{json.altMobileNumber}</label>
                                        <input type="text" onChange={altMobileNoChangeHandler}
                                            value={userDetails.altMobile ? userDetails.altMobile : ""}
                                            className="form-control" id="TagLine" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={submitHandler} type="submit" className="btn btn-primary mb-2">{json.save}</button>
                </div>
            </div>
        </article>
    </>)
}
