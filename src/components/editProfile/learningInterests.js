import React from "react";

export default function LearningInterests() {
  return (
    <>
      <article className="col-lg-8 col-md-12">
        <div className="row">
          <div className="col-md-12">
            <div className="midsection mb-4">
              <h5>What are the topics that interest you?</h5>
              <div className="col-md-9 ">
                <div className="midsection__form">
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="interest"
                    placeholder=" Write skills/topics you're interested in learning."
                  />
                  <p className="midsection__form__p">Suggested for you:</p>
                  <div className="midsection__form__items me-2">
                    CSS3 <i className="fa fa-plus"></i>
                  </div>
                  <div className="midsection__form__items me-2">
                    HTML5 <i className="fa fa-plus"></i>
                  </div>
                  <div className="midsection__form__items me-2">
                    JavaScript <i className="fa fa-plus"></i>
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary rounded-0 d-block mt-3"
                  >
                    Save learning interests
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
