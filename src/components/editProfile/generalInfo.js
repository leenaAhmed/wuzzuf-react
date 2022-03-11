import React from 'react';
import { useParams } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import './editProfile.scss'
export default function GeneralInfo() {
    const params = useParams()
    console.log(params.userId);
    return (<>
        <article className="col-lg-8 col-md-12">
            <div className="row">
                <div className="col-md-12">
                    <div className="midsection mb-4">
                        <h5>Your Personal Info</h5>
                        <form className="row">
                            <div className="col-md-6 ">
                                <div className="midsection__form">
                                    <label for="FirstName" className="form-label labelFont">First Name</label>
                                    <span className="text-danger">*</span>
                                    <input type="text" className="form-control" id="FirstName" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="midsection__form">
                                    <label for="MiddleName" className="form-label">Middle Name</label>
                                    <input type="text" className="form-control" id="MiddleName" />
                                </div>
                            </div>
                            <div className="col-md-6 ">
                                <div className="midsection__form">
                                    <label for="LastName" className="form-label labelFont">Last Name</label>
                                    <span className="text-danger">*</span>
                                    <input type="text" className="form-control" id="LastName" />
                                </div>
                            </div>

                            <div className="col-md-7 ">
                                <div className="midsection__form">
                                    <label className="col-form-label form-label">Birthday</label>
                                    <span className="text-danger">*</span>
                                    <div className="row">
                                        <div className="col-md-2">
                                            <select className="form-select" id="Military"
                                                aria-label="Disabled select example">
                                                <option disabled selected>Select..</option>
                                            </select>
                                        </div>
                                        <div className="col-md-5">
                                            <select className="form-select" id="Military"
                                                aria-label="Disabled select example">
                                                <option disabled selected>Select..</option>
                                            </select>
                                        </div>
                                        <div className="col-md-5">
                                            <select className="form-select" id="Military"
                                                aria-label="Disabled select example">
                                                <option disabled selected>Select..</option>
                                            </select>
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
                                                value="Male" />
                                            Male
                                        </label> &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="Gender" id="Female"
                                                value="Female" />
                                            Female
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7 ">
                                <div className="midsection__form">
                                    <label className="col-form-label form-label">Number of Dependents</label>
                                    <select className="form-select  " id="Dependents"
                                        aria-label="Disabled select example">
                                        <option disabled selected>Select..</option>

                                    </select>
                                </div>
                            </div>
                            <div className="col-md-7 ">
                                <div className="midsection__form">
                                    <label className="col-form-label form-label">Military Status</label>
                                    <select className="form-select  " id="Military"
                                        aria-label="Disabled select example">
                                        <option disabled selected>Select..</option>
                                        <option value="Not Applicable">Not Applicable</option>
                                        <option value="Exempted">Exempted</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Postponed">Postponed</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-12 ">
                                <div className="midsection__form">
                                    <label className="col-form-label form-label">Marital Status</label>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="MaritalStatus"
                                                id="unspecified" value="unspecified" />
                                            Unspecified
                                        </label> &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="MaritalStatus"
                                                id="single" value="single" />
                                            Single
                                        </label> &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="MaritalStatus"
                                                id="married" value="married" />
                                            Married
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 ">
                                <div className="midsection__form">
                                    <label className="col-form-label form-label">Do you have a driving license?</label>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="license" id="Yes"
                                                value="Yes" />
                                            Yes
                                        </label> &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="license" id="No"
                                                value="No" />
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 ">
                                <div className="midsection__form">
                                    <label className="col-form-label form-label">Do you have a car?</label>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="Car" id="Yes"
                                                value="Male" />
                                            Yes
                                        </label> &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                                        <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="Car" id="No"
                                                value="No" />
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9 ">
                                <div className="midsection__form">
                                    <label for="TagLine" className="form-label labelFont">Tag Line</label>
                                    <input type="text" className="form-control" id="TagLine" />
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
                                        <select className="form-select mb-2" id="Country"
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
                                        </select>

                                    </div>
                                </div>
                                <div className="col-md-7 ">
                                    <div className="midsection__form">
                                        <label for="TagLine" className="form-label labelFont">Tag Line</label>

                                        <input type="text" className="form-control" id="TagLine" />
                                    </div>
                                </div>
                                <div className="col-md-12 ">
                                    <div className="midsection__form">
                                        <label className="col-form-label form-label">Would you be willing to relocate to
                                            another city or country if you find the right opportunity?</label>
                                        <div className="form-check">
                                            <label className="form-check-label">
                                                <input type="radio" className="form-check-input" name="opportunity"
                                                    id="Yes" value="Male" />
                                                Yes
                                            </label> &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                                            <label className="form-check-label">
                                                <input type="radio" className="form-check-input" name="opportunity"
                                                    id="No" value="No" />
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
                                        <label for="TagLine" className="form-label labelFont">Mobile Number</label>
                                        <span className="text-danger">*</span>
                                        <input type="text" className="form-control" id="TagLine" />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="midsection__form">
                                        <label for="TagLine" className="form-label labelFont">Alternative Number</label>
                                        <input type="text" className="form-control" id="TagLine" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary mb-2">Save Changes</button>
                </div>
            </div>
        </article>
    </>)
}
