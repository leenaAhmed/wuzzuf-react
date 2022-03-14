import React from 'react';
import { Route } from 'react-router-dom';
import Experience from './experience';
import GeneralInfo from "./generalInfo";
import Sidebar from './sidebar';
import LearningInterests from "./learningInterests";
import OnlinePresence from './onlinePresence';
import AdditionalInfo from './additionalInfo';
import UploadCV from './uploadCV';

export default function EditProfile() {
    return (
        <>
            <section className='container mt-3'>
                <div className='row'>
                    <div>editProfile</div>
                    <Sidebar />
                    <Route path="/profile/general-info" component={GeneralInfo} />
                    <Route path="/profile/experience" component={Experience} />
                    <Route path="/profile/learning-interests" component={LearningInterests} />
                    <Route path="/profile/online-presence" component={OnlinePresence} />
                    <Route path="/profile/additional-info" component={AdditionalInfo} />
                    <Route path="/profile/cv" component={UploadCV} />
                </div>
            </section>
        </>
    )
}
