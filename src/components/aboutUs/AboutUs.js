import './style.scss'
import AboutUsImage from './map.jpg'
import { useContext, useEffect, useState } from 'react';
import { languageContext } from '../../contexts/languageContext';
import arLang from '../../language/aboutUs/العربية.json'
import enLang from '../../language/aboutUs/English.json'

const AboutUs = () => {
  const { lang, setLang } = useContext(languageContext);
  const[json,Setjson] = useState(enLang);
  useEffect(()=>
  {
    if(lang=="English") {Setjson(enLang)}
    if(lang=='العربية'){Setjson(arLang)}
  },[lang])
  console.log(json)
  return (
    <>
      <div className="container my-5"  dir={lang === "English" ? "ltr" : "rtl"}>
        <div className="AboutUsbodyContact">
          <div className="row col-lg-10 col-sm-12 col-md-12 ">
            <div className=" justify-content-center  ">
              <div className=" AboutUsBody card  col-12 ">
                <p
                  className="card-header my-3 AboutUsheader col-md-12 col-lg-12 d-flex flex-row-revers bg-white"   
                >
                  {json[0].title}
                </p>

                <div className="card-body">
                  <form className="row g-3 needs-validation" action="#" noValidate>
                    <div className="row col-lg-9 col-sm-9 col-md-9">
                      <div>
                        <p>
                        {json[0].firstPara}
                        </p>
                        <p>
                         {json[0].secoundPara}
                        </p>
                        <h4>{json[0].firstQuestion}</h4>
                        <p>
                          {json[0].firstAnswer}
                        </p>
                        <h4>{json[0].secoundQuestion}</h4>
                        <p>
                          {json[0].secoundAnswer}
                        </p>
                        <h4>{json[0].thirdQuestion}</h4>
                        <p>
                         {json[0].thirdAnswer}
                        </p>
                      </div>
                    </div>
                    <div className="row col-lg-3 col-sm-3 col-md-3 ">
                      <div >
                        <img
                          src={AboutUsImage}
                          className="AboutUsImage" alt='AboutUsImage'
                        />
                      </div>
                    </div>
                  </form>
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
