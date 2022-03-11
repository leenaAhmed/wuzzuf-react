import React from 'react';
import "./editProfile.scss"

export default function OnlinePresence() {
    return (<>
        <article className="col-lg-8 col-md-12">
            <div className="row">
                <div className="col-md-12">
                    <div className="midsection mb-4">
                        <h5 className="mb-4">Your Online Presence</h5>
                        <div className="midsection__form">
                            <div className="mb-4 row">
                                <label for="LinkedIn" className="col-sm-2 form-label text-dark">LinkedIn</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" id="LinkedIn" placeholder="linkeding.com/in/username" />
                                </div>
                            </div>
                            <div className="mb-4 row">
                                <label for="Facebook" className="col-sm-2 form-label text-dark">Facebook</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" id="Facebook" placeholder="facebook.com/username" />
                                </div>
                            </div>
                            <div className="mb-4 row">
                                <label for="Twitter" className="col-sm-2 form-label text-dark">Twitter</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" id="Twitter" placeholder="twitter.com/username" />
                                </div>
                            </div>
                            <div className="mb-4 row">
                                <label for="Behance" className="col-sm-2 form-label text-dark" >Behance</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" id="Behance" placeholder="behance.net.com/username" />
                                </div>
                            </div>
                            <div className="mb-4 row">
                                <label for="Instagram" className="col-sm-2 form-label text-dark" >Instagram</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" id="Instagram" placeholder="instgram.com/username" />
                                </div>
                            </div>
                            <div className="mb-4 row">
                                <label for="GitHub" className="col-sm-2 form-label text-dark">GitHub</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" id="GitHub" placeholder="github.com/username" />
                                </div>
                            </div>

                            <div className="mb-4 row">
                                <label for="YouTube" className="col-sm-2 form-label text-dark">YouTube</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" id="YouTube" placeholder="youtube.com/username" />
                                </div>
                            </div>
                            <div className="mb-4 row">
                                <label for="Blog" className="col-sm-2 form-label text-dark">Blog</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" id="Blog" placeholder="your blog" />
                                </div>
                            </div>
                            <div className="mb-4 row">
                                <label for="Website" className="col-sm-2 form-label text-dark">Website</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" id="Website" placeholder="your personal website" />
                                </div>
                            </div>
                            <div className="mb-4 row">
                                <label for="Other" className="col-sm-2 form-label text-dark">Other</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" id="Other" />
                                </div>
                            </div>

                        </div>

                    </div>
                    <button type="submit" disabled className="btn btn-primary mb-2">Save Changes</button>


                </div>
            </div>
        </article>
    </>)
}
