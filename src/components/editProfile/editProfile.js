import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Experience from './experience';
import GeneralInfo from "./generalInfo";
import Sidebar from './sidebar';
import LearningInterests from "./learningInterests";
import OnlinePresence from './onlinePresence';
import AdditionalInfo from './additionalInfo';
import UploadCV from './uploadCV';
import { languageContext } from "./../../contexts/languageContext";

export default function EditProfile() {
    const { lang } = useContext(languageContext);

    return (
        <>
            <div dir={lang === "English" ? "ltr" : "rtl"}>
                <section className='container mt-3'>
                    <div className='row'>
                        <Router>

                            <Sidebar />
                            <Switch>
                                <Route path="/profile/general-info" exact component={GeneralInfo} />
                                <Route path="/profile/experience" exact component={Experience} />
                                <Route path="/profile/learning-interests" exact component={LearningInterests} />
                                <Route path="/profile/online-presence" exact component={OnlinePresence} />
                                <Route path="/profile/additional-info" exact component={AdditionalInfo} />
                                <Route path="/profile/cv" exact component={UploadCV} />
                            </Switch>
                        </Router>
                    </div>
                </section>
            </div>
        </>
    )
}
