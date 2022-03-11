import React from 'react'
import { Route } from 'react-router-dom'
import Experience from './experience'
import GeneralInfo from "./generalInfo"
import Sidebar from './sidebar'

export default function EditProfile() {
    return (
        <>
            <section className='container mt-3'>
                <div className='row'>
                    <div>editProfile</div>
                    <Sidebar />
                    <Route path="/profile/general-info" component={GeneralInfo} />
                    <Route path="/profile/experience" component={Experience} />

                </div>
            </section>
        </>
    )
}
