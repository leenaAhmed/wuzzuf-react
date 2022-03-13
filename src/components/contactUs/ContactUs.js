import './style.scss'
import { useState } from "react";
import { toast } from 'react-toastify';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/authContext';
import { useHistory } from 'react-router-dom';
const ContactUs =()=>
{
    const history = useHistory();
    const [State, SetState] = useState({
        ProblemCategory: "",
        Subject: "",
        MessageContact: "",
        UserId: ""
      });

    const { currentUser } = useAuth();

    async function SubmitForm (e) {
        e.preventDefault();
        var data = {
            ProblemCategory: State.ProblemCategory[0],
            Subject:  State.Subject[0],
            MessageContact:  State.MessageContact[0],
            UserId:  State.UserId
          };
        await db.collection('contactUs').add(data)
        .then(()=>
        {
            toast.success("Your message send succesfully", {
                position: toast.POSITION.TOP_CENTER
            })
            setTimeout(()=>{history.push('/')},5000)
            
        })
        .catch(()=>
        {
            toast.error("Error in sending message", {
                position: toast.POSITION.TOP_LEFT
            })
        })
      };
      const ChangeInForm = (e) => {
        SetState({
          ...State,
          [e.target.id]: [e.target.value],
          UserId:currentUser.uid
        });
      };
    return (
        <>
        <div className="container my-5 ">
        <div className="ContactUsbodyContact rounded-0">
            <div className="row col-lg-5 col-sm-8 col-md-6 ">
                <div className=" ContactUsBody card  d-flex flex-row-revers rounded-0" >
                    <p className="card-header my-4 ContactUsheader bg-white">Contact us
                    </p>
                    <div className="card-body">
                        <form className="row g-3 needs-validation my-2" onSubmit={(e) => SubmitForm(e)} noValidate>
                            <div className="col-md-12 col-lg-12 col-sm-12">
                                <label htmlFor="ProblemCategory" className="form-label d-flex flex-row">What is your question
                                    about?</label>
                                <div className="input-group mb-3">
                                    <select className="form-select" id="ProblemCategory"  required onChange={(e) => ChangeInForm(e)}>
                                        <option selected disabled value="0">Select...</option>
                                        <option value="Technical Issue / Error with the Site">Technical Issue / Error with the Site</option>
                                        <option value="Sales Inquiry / Request">Sales Inquiry / Request</option>
                                        <option value="Partnerships / Sponsorships">Partnerships / Sponsorships</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Product / Service Idea"> Product / Service Idea</option>
                                        <option value="General Inquiry / Complaint">General Inquiry / Complaint</option>
                                        <option value="Thanks / Praise">Thanks / Praise</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-12">
                                <label htmlFor="Subject" className="form-label d-flex flex-row">Subject</label>
                                <input type="text" className="form-control" id="Subject" name="subject"
                                    required onChange={(e) => ChangeInForm(e)}/>
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-12 ">
                                <label htmlFor="MessageContact" className="form-label d-flex flex-row">Message</label>
                                <div className="form-floating">
                                    <textarea className="ContactUstextarea form-control " placeholder="Leave a comment here"
                                        id="MessageContact" style={{height: '100px'}} required onChange={(e) => ChangeInForm(e)}></textarea>
                                    <label htmlFor="floatingInput">Leave a comment here</label>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-12 d-flex justify-content-center">
                                <button className="btn btn-primary col-lg-3 col-md-5 col-sm-5" type="submit">Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </>
    );
}
export default ContactUs