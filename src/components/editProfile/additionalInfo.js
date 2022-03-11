import React from 'react';
import "./editProfile.scss"

export default function AdditionalInfo() {
    return (<>
        <article className="col-lg-8 col-md-12">
            <div className="row">
                <div className="col-md-12">
                    <div className="midsection mb-4">
                        <h5 className="mb-1">Achievements</h5>

                        <div className="col-md-9 ">
                            <div className="midsection__form">
                                <p className="midsection__form__pa">Sports, patents, publications, books, awards, etc.</p>
                                <div className="form-group">
                                    <label for="exampleFormControlTextarea1" className="form-label">Add Achievements</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                </div>
                                <p className="midsection__form__pa mt-2">You have 1000 characters remaining (max 1000)</p>
                                <button type="submit" className="btn btn-primary rounded-0 mt-3 mb-2">Save Changes</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </article>
    </>);
}
