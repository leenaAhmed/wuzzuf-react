import React, { useEffect, useState, useRef } from 'react';
import './editProfile.scss'
import { useAuth } from "../../contexts/authContext"
import { db, storage } from "../../firebase";
import Select from 'react-select';
import { toast } from 'react-toastify';


export default function GeneralInfo() {
    const { currentUser } = useAuth()
    const [userDetails, setUserDetails] = useState({});
    const dayOptions = displayDaysInSelect()
    const monthOptions = displayMonthInSelect()
    const yearOptions = displayYearInSelect()
    const militaryStatus = [
        { value: 'not applicable', label: 'Not Applicable' },
        { value: 'exempted', label: 'Exempted' },
        { value: 'completed', label: 'Completed' },
        { value: 'postponed', label: 'Postponed' },
    ]

    const [progress, setProgress] = useState(0)
    const [image, setImage] = useState("")
    const fileRef = useRef(null);
    console.log(currentUser);

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
                    <div className="midsection mb-4">

                        <form className="row">
                            <div className="col-12 py-3">
                                <section className="profile_image_box row px-3 py-2 w-100">
                                    <div className="col-3 w-10">
                                        <img src={userDetails.imageUrl ? userDetails.imageUrl : "/default.png"} className="profile-img rounded-circle w-100" alt="profile-img" />
                                    </div>
                                    <div className="col-9 mt-2">
                                        <h4>Profile Photo</h4>
                                        <p>You can upload a .jpg, .png, or .gif photo</p>
                                        <input ref={fileRef} type="file" onChange={imageChangeHandler} />
                                        <button onClick={uploadImage} className="btn btn-primary">Change Photo</button>
                                        {
                                            userDetails.imageUrl &&
                                            <button onClick={delteImageHandler} className="btn btn-danger bt-sm ms-1 cursor-pointer">delete</button>
                                        }
                                    </div>
                                </section>
                                <h5>Your Personal Info</h5>
                            </div>
                            <div className="col-md-6 ">
                                <div className="midsection__form">
                                    <label htmlFor="FirstName" className="form-label labelFont">First Name</label>
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
                                    <label htmlFor="MiddleName" className="form-label">Middle Name</label>
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
                                    <label htmlFor="LastName" className="form-label labelFont">Last Name</label>
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
                                    <label className="col-form-label form-label">Birthday</label>
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
                                    <label className="col-form-label form-label">Gender</label>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="Gender" id="Male"
                                                value="male" checked={userDetails.gender === "male"} onChange={genderChangeHandler} />
                                            Male
                                        </label> &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="Gender" id="Female"
                                                value="female" checked={userDetails.gender === "female"} onChange={genderChangeHandler} />
                                            Female
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-7 ">
                                <div className="midsection__form">
                                    <label className="col-form-label form-label">Military Status</label>
                                    <Select className='w-100'
                                        options={militaryStatus}
                                        placeholder={userDetails.militarySatus}
                                        onChange={militaryChangeHandler}
                                    />
                                </div>
                            </div>

                            <div className="col-md-12 ">
                                <div className="midsection__form">
                                    <label className="col-form-label form-label">Marital Status</label>
                                    <div className="form-check" onChange={maritalStatusChangeHandler}>
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="MaritalStatus"
                                                id="unspecified" value="unspecified"
                                                checked={userDetails.maritalStatus === "unspecified"}
                                            />
                                            Unspecified
                                        </label> &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="MaritalStatus"
                                                id="single" value="single"
                                                checked={userDetails.maritalStatus === "single"} />
                                            Single
                                        </label> &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="MaritalStatus"
                                                id="married" value="married"
                                                checked={userDetails.maritalStatus === "married"} />
                                            Married
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 ">
                                <div className="midsection__form">
                                    <label className="col-form-label form-label">Do you have a driving license?</label>
                                    <div className="form-check" onChange={drivingLicenseChangeHandler}>
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="license" id="Yes"
                                                value="yes" checked={userDetails.drivingLicense === "yes"} />
                                            Yes
                                        </label> &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="license" id="No"
                                                value="no" checked={userDetails.drivingLicense === "no"} />
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 ">
                                <div className="midsection__form">
                                    <label className="col-form-label form-label">Do you have a car?</label>
                                    <div className="form-check">
                                        <label className="form-check-label" >
                                            <input type="radio" className="form-check-input" name="Car" id="Yes"
                                                value="yes"
                                                checked={userDetails.carOwn === "yes"} onChange={carOwnChangeHandler} />
                                            Yes
                                        </label> &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="Car" id="No"
                                                value="no" onChange={carOwnChangeHandler}
                                                checked={userDetails.carOwn === "no"} />
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-9 ">
                                <div className="midsection__form">
                                    <label htmlFor="TagLine" className="form-label labelFont">Tag Line</label>
                                    <input type="text" className="form-control" id="TagLine"
                                        onChange={tagLineChangeHandler}
                                        value={userDetails.title ? userDetails.title : ""}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-12 mb-4 ">
                        <div className="midsection">
                            <h5>Your Location</h5>
                            <form className="row">
                                <div className="col-md-7">
                                    <div className="midsection__form">
                                        <label className="col-form-label form-label">Country <span
                                            className="text-danger">*</span></label>
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
                                        <label htmlFor="postalCode" className="form-label labelFont">Postal Code</label>
                                        <input type="text" className="form-control" id="postalCode"
                                            onChange={postalCodeChangeHandler}
                                            value={userDetails.postalCode ? userDetails.postalCode : ""}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-12 ">
                                    <div className="midsection__form">
                                        <label className="col-form-label form-label">Would you be willing to relocate to
                                            another city or country if you find the right opportunity?</label>
                                        <div className="form-check">
                                            <label className="form-check-label">
                                                <input type="radio" className="form-check-input" name="opportunity"
                                                    id="Yes" value="yes" checked={userDetails.relocation === "yes"} onChange={relocationChangeHandler} />
                                                Yes
                                            </label> &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                                            <label className="form-check-label">
                                                <input type="radio" checked={userDetails.relocation === "no"} onChange={relocationChangeHandler} className="form-check-input" name="opportunity"
                                                    id="No" value="no" />
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>


                    <div className="col-md-12 mb-4 ">
                        <div className="midsection">
                            <h5>Your Contact Info</h5>
                            <div className="row">
                                <div className="col-md-6 me-5">
                                    <div className="midsection__form">
                                        <label htmlFor="TagLine" className="form-label labelFont">Mobile Number</label>
                                        <span className="text-danger">*</span>
                                        <input type="text" onChange={mobileNoChangeHandler}
                                            value={userDetails.mobile ? userDetails.mobile : ""}
                                            className="form-control" id="TagLine" />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="midsection__form">
                                        <label htmlFor="TagLine" className="form-label labelFont">Alternative Number</label>
                                        <input type="text" onChange={altMobileNoChangeHandler}
                                            value={userDetails.altMobile ? userDetails.altMobile : ""}
                                            className="form-control" id="TagLine" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={submitHandler} type="submit" className="btn btn-primary mb-2">Save Changes</button>
                </div>
            </div>
        </article>
    </>)
}
