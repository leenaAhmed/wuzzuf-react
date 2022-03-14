import './style.scss'
import { useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/authContext';
import { useHistory } from 'react-router-dom';
import { languageContext } from '../../contexts/languageContext';
import arLang from '../../language/contactUs/العربية.json'
import enLang from '../../language/contactUs/English.json'
const ContactUs =()=>
{
    const { lang, setLang } = useContext(languageContext);
    const history = useHistory();
    const [State, SetState] = useState({
        ProblemCategory: "",
        Subject: "",
        MessageContact: "",
        UserId: ""
      });

    const { currentUser } = useAuth();
    const[json,Setjson] = useState(enLang);
    useEffect(()=>
    {
      if(lang=="English") {Setjson(enLang)}
      if(lang=='العربية'){Setjson(arLang)}
    },[lang])

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
        <div className="container my-5 " dir={lang === "English" ? "ltr" : "rtl"}>
        <div className="ContactUsbodyContact rounded-0">
            <div className="row col-lg-5 col-sm-8 col-md-6 ">
                <div className=" ContactUsBody card  d-flex flex-row-rever rounded-0" >
                    <p className="card-header my-4 ContactUsheader bg-white">{json[0].title}
                    </p>
                    <div className="card-body">
                        <form className="row g-3 needs-validation my-2" onSubmit={(e) => SubmitForm(e)} noValidate>
                            <div className="col-md-12 col-lg-12 col-sm-12">
                                <label htmlFor="ProblemCategory" className="form-label d-flex flex-row">
                                    {json[0].firstQuestion}
                                </label>
                                <div className="input-group mb-3">
                                    <select className="form-select" id="ProblemCategory"  required onChange={(e) => ChangeInForm(e)}>
                                        <option selected disabled value={json[0].categoriesArray[0].Option0}>{json[0].categoriesArray[0].Option0}</option>
                                        <option value={json[0].categoriesArray[0].Option1}>{json[0].categoriesArray[0].Option1}</option>
                                        <option value={json[0].categoriesArray[0].Option2}>{json[0].categoriesArray[0].Option2}</option>
                                        <option value={json[0].categoriesArray[0].Option3}>{json[0].categoriesArray[0].Option3}</option>
                                        <option value={json[0].categoriesArray[0].Option4}>{json[0].categoriesArray[0].Option4}</option>
                                        <option value={json[0].categoriesArray[0].Option5}>{json[0].categoriesArray[0].Option5}</option>
                                        <option value={json[0].categoriesArray[0].Option6}>{json[0].categoriesArray[0].Option6}</option>
                                        <option value={json[0].categoriesArray[0].Option7}>{json[0].categoriesArray[0].Option7}</option>
                                        <option value={json[0].categoriesArray[0].Option8}>{json[0].categoriesArray[0].Option8}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-12">
                                <label htmlFor="Subject" className="form-label d-flex flex-row" >{json[0].secoundQuestion}</label>
                                <input type="text" className="form-control" id="Subject" name="subject"
                                    required onChange={(e) => ChangeInForm(e)} placeholder={json[0].messageLabel}/>
                            </div>
                            <div className="col-md-12 col-lg-12 ">
                                <label htmlFor="MessageContact" className="form-label d-flex flex-row">{json[0].thirdQuestion}</label>
                                <div className="form-floating">
                                    <textarea className="ContactUstextarea form-control " placeholder={json[0].messageLabel}
                                        id="MessageContact" style={{height: '100px'}} required onChange={(e) => ChangeInForm(e)}></textarea>
                                    <label >{json[0].messageLabel}</label>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-12 d-flex justify-content-center">
                                <button className="btn btn-primary col-lg-3 col-md-5 col-sm-5" type="submit">{json[0].sendButton}</button>
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