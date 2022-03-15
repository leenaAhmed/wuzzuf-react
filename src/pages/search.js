import { Link } from "react-router-dom";
import explorjob from "../services/explorjob";
import Card from "../components/jobModule/exploer/index";
import "./SearchStyle.scss";
import React, { useEffect, useState, useContext } from "react";
import { languageContext } from "./../contexts/languageContext";
import { useParams } from "react-router-dom";
import arLang from '../language/search/العربية.json'
import enLang from '../language/search/English.json'

function SearchPage(props) {
  const [jobsItems, setjobItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { lang } = useContext(languageContext);
  const params = useParams()
  const [SearchTerm, SetSearchTerm] = useState(params.searchTerm);
  
  // console.log(params.searchTerm)

  const[json,Setjson] = useState(enLang);
  useEffect(()=>
  {
    if(lang=="English") {Setjson(enLang)}
    if(lang=='العربية'){Setjson(arLang)}
  },[lang])

  useEffect(() => {
    explorjob
      .getAlljobs()
      .then((response) => {
        setTimeout(() => {
          setjobItems(response);
          setIsLoading(false);
        }, 1000);
        console.log(response.length);
        setIsLoading(true);
      })
      .catch((error) => {
        setIsLoading(false);

        console.log("Error  " + error);
      });
  }, []);

  const filtering=(queryCatrgory,e)=>
  {
    let jobsArray = [] ;
    explorjob
    .getAlljobs()
    .then((response) => {
    //   if(!e.target.checked)
    //   {
    //     setjobItems(response);
    //     setIsLoading(false);
    //   }
    // else
    setjobItems(response);
    if(
      e.target.checked&&e.target.name==='Egypt'&&queryCatrgory==='companyCountry',
      e.target.checked&&e.target.name==="Saudi Arabia"&&queryCatrgory==='companyCountry',
      e.target.checked&&e.target.name==="1"&&queryCatrgory==='experience',
      e.target.checked&&e.target.name==="2"&&queryCatrgory==='experience',
      e.target.checked&&e.target.name==="3"&&queryCatrgory==='experience')
    {
        jobsArray = []
        setTimeout(() => {
            for (let i = 0; i < response.length; i++) 
            {
              if(response[i].data.companyCountry === 'Egypt' 
              || response[i].data.companyCountry === 'Saudi Arabia'
              || response[i].data.experience.includes('1')
              || response[i].data.experience.includes('2')
              || response[i].data.experience.includes('3'))
              {
                console.log(response[i])
                jobsArray.push(response[i])
              }  
            }
          
          console.log(jobsArray)
          setjobItems(jobsArray);
          setIsLoading(false);
          
        }, 1000);
        console.log(response);

        setIsLoading(true);
      }
      // jobType
      else if(
        e.target.checked&&e.target.name==='Egypt'&&queryCatrgory==='companyCountry',
        e.target.checked&&e.target.name==="Part time"&&queryCatrgory==='jobType',
        e.target.checked&&e.target.name==="Full time"&&queryCatrgory==='jobType')
      {
          jobsArray = []
          setTimeout(() => {
              for (let i = 0; i < response.length; i++) 
              {
                if(response[i].data.companyCountry === 'Egypt'
                || response[i].data.jobType==="Part Time"
                || response[i].data.jobType==="Full Time")
                {
                  console.log(response[i])
                  jobsArray.push(response[i])
                }  
              }
            
            console.log(jobsArray)
            setjobItems(jobsArray);
            setIsLoading(false);
            
          }, 1000);
          console.log(response);
  
          setIsLoading(true);
        }
        else if(
          e.target.checked&&e.target.name==='Egypt'&&queryCatrgory==='companyCountry',
          e.target.checked&&e.target.name==="Part time"&&queryCatrgory==='jobType')
        {
            jobsArray = []
            setTimeout(() => {
                for (let i = 0; i < response.length; i++) 
                {
                  if(response[i].data.companyCountry === 'Egypt'
                  || response[i].data.jobType==="Part Time")
                  {
                    console.log(response[i])
                    jobsArray.push(response[i])
                  }  
                }
              
              console.log(jobsArray)
              setjobItems(jobsArray);
              setIsLoading(false);
              
            }, 1000);
            console.log(response);
    
            setIsLoading(true);
          }
          else if(
            e.target.checked&&e.target.name==='Egypt'&&queryCatrgory==='companyCountry',
            e.target.checked&&e.target.name==="Full time"&&queryCatrgory==='jobType')
          {
              jobsArray = []
              setTimeout(() => {
                  for (let i = 0; i < response.length; i++) 
                  {
                    if(response[i].data.companyCountry === 'Egypt'
                    || response[i].data.jobType==="Full Time")
                    {
                      console.log(response[i])
                      jobsArray.push(response[i])
                    }  
                  }
                
                console.log(jobsArray)
                setjobItems(jobsArray);
                setIsLoading(false);
                
              }, 1000);
              console.log(response);
      
              setIsLoading(true);
            }
            else if(
              e.target.checked&&e.target.name==="Full time"&&queryCatrgory==='jobType')
            {
                jobsArray = []
                setTimeout(() => {
                    for (let i = 0; i < response.length; i++) 
                    {
                      if( response[i].data.jobType==="Full Time")
                      {
                        console.log(response[i])
                        jobsArray.push(response[i])
                      }  
                    }
                  
                  console.log(jobsArray)
                  setjobItems(jobsArray);
                  setIsLoading(false);
                  
                }, 1000);
                console.log(response);
        
                setIsLoading(true);
              }
              else if(
                e.target.checked&&e.target.name==="Part time"&&queryCatrgory==='jobType')
              {
                  jobsArray = []
                  setTimeout(() => {
                      for (let i = 0; i < response.length; i++) 
                      {
                        if(response[i].data.jobType==="Part Time")
                        {
                          console.log(response[i])
                          jobsArray.push(response[i])
                        }  
                      }
                    
                    console.log(jobsArray)
                    setjobItems(jobsArray);
                    setIsLoading(false);
                    
                  }, 1000);
                  console.log(response);
          
                  setIsLoading(true);
                }
      else if(
        e.target.checked&&e.target.name==='Egypt'&&queryCatrgory==='companyCountry',
        e.target.checked&&e.target.name==="Engineering"&&queryCatrgory==='jobCategories',
        e.target.checked&&e.target.name==="IT"&&queryCatrgory==='jobCategories')
      {
          jobsArray = []
          setTimeout(() => {
              for (let i = 0; i < response.length; i++) 
              {
                if(response[i].data.companyCountry === 'Egypt'
                || response[i].data.jobCategories.includes('Engineering')
                || response[i].data.jobCategories.includes('IT'))
                {
                  console.log(response[i])
                  jobsArray.push(response[i])
                }  
              }
            
            console.log(jobsArray)
            setjobItems(jobsArray);
            setIsLoading(false);
            
          }, 1000);
          console.log(response);
  
          setIsLoading(true);
        }
        else if(
          e.target.checked&&e.target.name==="Engineering"&&queryCatrgory==='jobCategories',
          e.target.checked&&e.target.name==="IT"&&queryCatrgory==='jobCategories')
        {
            jobsArray = []
            setTimeout(() => {
                for (let i = 0; i < response.length; i++) 
                {
                  if( response[i].data.jobCategories.includes('Engineering')
                  || response[i].data.jobCategories.includes('IT'))
                  {
                    console.log(response[i])
                    jobsArray.push(response[i])
                  }  
                }
              
              console.log(jobsArray)
              setjobItems(jobsArray);
              setIsLoading(false);
              
            }, 1000);
            console.log(response);
    
            setIsLoading(true);
          }
          else if(
            e.target.checked&&e.target.name==="IT"&&queryCatrgory==='jobCategories')
          {
              jobsArray = []
              setTimeout(() => {
                  for (let i = 0; i < response.length; i++) 
                  {
                    if(  response[i].data.jobCategories.includes("IT"))
                    {
                      console.log(response[i])
                      jobsArray.push(response[i])
                    }  
                  }
                
                console.log(jobsArray)
                setjobItems(jobsArray);
                setIsLoading(false);
                
              }, 1000);
              console.log(response);
      
              setIsLoading(true);
            }
            else if(
              e.target.checked&&e.target.name==="Engineering"&&queryCatrgory==='jobCategories')
            {
                jobsArray = []
                setTimeout(() => {
                    for (let i = 0; i < response.length; i++) 
                    {
                      if( response[i].data.jobCategories.includes('Engineering'))
                      {
                        console.log(response[i])
                        jobsArray.push(response[i])
                      }  
                    }
                  
                  console.log(jobsArray)
                  setjobItems(jobsArray);
                  setIsLoading(false);
                  
                }, 1000);
                console.log(response);
        
                setIsLoading(true);
              }
      else if(
        e.target.checked&&e.target.name==='Egypt'&&queryCatrgory==='companyCountry',
        e.target.checked&&e.target.name==="1"&&queryCatrgory==='experience',
        e.target.checked&&e.target.name==="3"&&queryCatrgory==='experience')
      {
          jobsArray = []
          setTimeout(() => {
              for (let i = 0; i < response.length; i++) 
              {
                if(response[i].data.companyCountry === 'Egypt'
                || response[i].data.experience.includes('1')
                || response[i].data.experience.includes('3'))
                {
                  console.log(response[i])
                  jobsArray.push(response[i])
                }  
              }
            
            console.log(jobsArray)
            setjobItems(jobsArray);
            setIsLoading(false);
            
          }, 1000);
          console.log(response);
  
          setIsLoading(true);
        }
        else if(
          e.target.checked&&e.target.name==='Egypt'&&queryCatrgory==='companyCountry',
          e.target.checked&&e.target.name==="1"&&queryCatrgory==='experience')
        {
            jobsArray = []
            setTimeout(() => {
                for (let i = 0; i < response.length; i++) 
                {
                  if(response[i].data.companyCountry === 'Egypt'
                  || response[i].data.experience.includes('1'))
                  {
                    console.log(response[i])
                    jobsArray.push(response[i])
                  }  
                }
              
              console.log(jobsArray)
              setjobItems(jobsArray);
              setIsLoading(false);
              
            }, 1000);
            console.log(response);
    
            setIsLoading(true);
          }
          else if(
            e.target.checked&&e.target.name==="2"&&queryCatrgory==='experience')
          {
              jobsArray = []
              setTimeout(() => {
                  for (let i = 0; i < response.length; i++) 
                  {
                    if( response[i].data.experience.includes('2'))
                    {
                      console.log(response[i])
                      jobsArray.push(response[i])
                    }  
                  }
                
                console.log(jobsArray)
                setjobItems(jobsArray);
                setIsLoading(false);
                
              }, 1000);
              console.log(response);
      
              setIsLoading(true);
            }
            else if(
              e.target.checked&&e.target.name==="1"&&queryCatrgory==='experience')
            {
                jobsArray = []
                setTimeout(() => {
                    for (let i = 0; i < response.length; i++) 
                    {
                      if( response[i].data.experience.includes('1'))
                      {
                        console.log(response[i])
                        jobsArray.push(response[i])
                      }  
                    }
                  
                  console.log(jobsArray)
                  setjobItems(jobsArray);
                  setIsLoading(false);
                  
                }, 1000);
                console.log(response);
        
                setIsLoading(true);
              }
            else if(
              e.target.checked&&e.target.name==="3"&&queryCatrgory==='experience')
            {
                jobsArray = []
                setTimeout(() => {
                    for (let i = 0; i < response.length; i++) 
                    {
                      if( response[i].data.experience.includes('3'))
                      {
                        console.log(response[i])
                        jobsArray.push(response[i])
                      }  
                    }
                  
                  console.log(jobsArray)
                  setjobItems(jobsArray);
                  setIsLoading(false);
                  
                }, 1000);
                console.log(response);
        
                setIsLoading(true);
              }
     else if(
      e.target.checked&&e.target.name==='Egypt'&&queryCatrgory==='companyCountry',
      e.target.checked&&e.target.name==="Saudi Arabia"&&queryCatrgory==='companyCountry')
    {
        jobsArray = []
        setTimeout(() => {
            for (let i = 0; i < response.length; i++) 
            {
              if(response[i].data.companyCountry === 'Egypt' 
              || response[i].data.companyCountry === 'Saudi Arabia')
              {
                jobsArray.push(response[i])
              }  
            }
          
          console.log(jobsArray)
          setjobItems(jobsArray);
          setIsLoading(false);
          
        }, 1000);
        console.log(response);

        setIsLoading(true);
      }
      else if(
        e.target.checked&&e.target.name==='Egypt'&&queryCatrgory==='companyCountry')
      {
        jobsArray = []
          setTimeout(() => {
              for (let i = 0; i < response.length; i++) 
              {
                if(response[i].data.companyCountry === e.target.name )
                {
                  jobsArray.push(response[i])
                }  
              }
            
            console.log(jobsArray)
            setjobItems(jobsArray);
            setIsLoading(false);
            
          }, 1000);
          console.log(response);
  
          setIsLoading(true);
        }
      })
      .catch((error) => {
        setIsLoading(false);

        console.log("Error  " + error);
      });
    
    
  }
  return (
    <>
      <div class="container mt-4"  dir={lang === "English" ? "ltr" : "rtl"}>
      <div class="css-rqgsqp">
        <div>
          <div class="css-bjn8wh">
            <div class="css-150a24d">
              <span class="css-1igbm66 e1n2h7jb0">
                <i size="24" class="css-lpyyjx efou2fk0">
                  <svg
                    width="24"
                    height="24"
                    preserveAspectRatio="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#4D6182"
                      d="M15.462 10.615a4.852 4.852 0 0 0-4.847-4.846 4.852 4.852 0 0 0-4.846 4.846 4.852 4.852 0 0 0 4.846 4.847 4.852 4.852 0 0 0 4.847-4.847zm5.538 9c0 .758-.627 1.385-1.385 1.385-.367 0-.724-.151-.973-.411l-3.71-3.7a7.598 7.598 0 0 1-4.317 1.342A7.613 7.613 0 0 1 3 10.615 7.613 7.613 0 0 1 10.615 3a7.613 7.613 0 0 1 7.616 7.615c0 1.536-.465 3.05-1.342 4.316l3.71 3.71c.25.25.401.607.401.974z"
                    ></path>
                  </svg>
                </i>
              </span>
              <input
                placeholder={json[0].searchInput}
                class="css-18p135f e1n2h7jb1"
                type='text'
                value={SearchTerm}
                onChange={(event) => {
                  SetSearchTerm(event.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div tabindex="1"></div>
      </div>
    </div>
      <div className="container " dir={lang === "English" ? "ltr" : "rtl"}>
        <div className="row mt-5">
          <aside className="col-md-3 col-6">
            <div className="row">
              <div className="col-lg-12 d-lg-block">
                <div className="sidebar">
                  <ul className="list-group ">
                    <a to="" activeClassName="sidebar__actived">
                      <li className="list-group-item fw-bold">{json[0].filterTitle}</li>
                    </a>

                    <a to="" activeClassName="sidebar__actived">
                      <li className="list-group-itemx">
                        <h6 className="fw-bold">{json[0].country}</h6>
                        <input
                          type="checkbox"
                          id="flexCheckIndeterminate"
                          name="Egypt"
                          onChange={(e) => {
                            filtering('companyCountry',e)
                          }}
                          className="form-check-input"
                        ></input>
                        <label
                          class="form-check-label ms-2"
                          htmlFor="flexCheckIndeterminate"
                        >
                          {json[0].countryEg}
                        </label>
                        <br />
                        <input
                          type="checkbox"
                          id="flexCheckIndeterminate"
                          name="Saudi Arabia"
                          onChange={(e) => {
                            filtering('companyCountry',e)
                          }}
                          className="form-check-input"
                        ></input>
                        <label
                          class="form-check-label ms-2 mb-2"
                          htmlFor="flexCheckIndeterminate"
                        >
                          {json[0].countrySa}
                        </label>
                        <br />
                      </li>
                    </a>
                    <a to="" activeClassName="sidebar__actived">
                      <li className="list-group-itemx ">
                        <h6 className="fw-bold">{json[0].yearsExperiance}</h6>
                        <input
                          type="checkbox"
                          id="flexCheckIndeterminate"
                          name="1"
                          onChange={(e) => {
                            filtering('experience',e)
                          }}
                          className="form-check-input"
                        ></input>
                        <label
                          class="form-check-label ms-2"
                          htmlFor="flexCheckIndeterminate"
                        >
                          {json[0].year1}
                        </label>
                        <br />
                        <input
                          type="checkbox"
                          id="flexCheckIndeterminate"
                          name="2"
                          onChange={(e) => {
                            filtering('experience',e)
                          }}
                          className="form-check-input"
                        ></input>
                        <label
                          class="form-check-label ms-2"
                          htmlFor="flexCheckIndeterminate"
                        >
                         {json[0].year2}
                        </label>
                        <br />
                        <input
                          type="checkbox"
                          id="flexCheckIndeterminate"
                          name="3"
                          onChange={(e) => {
                            filtering('experience',e)
                          }}
                          className="form-check-input"
                        ></input>
                        <label
                          class="form-check-label ms-2"
                          htmlFor="flexCheckIndeterminate"
                        >
                         {json[0].year3}
                        </label>
                        <br />
                      </li>
                    </a>

                    <li className="list-group-itemx list-height">
                      <h6 className="fw-bold">{json[0].jobCategory}</h6>
                      <input
                        type="checkbox"
                        id="flexCheckIndeterminate"
                        name="Engineering"
                        onChange={(e) => {
                          filtering('jobCategories',e)
                        }}
                        className="form-check-input"
                      ></input>
                      <label
                        class="form-check-label ms-2"
                        htmlFor="flexCheckIndeterminate"
                      >
                       {json[0].jobCategoryEng}
                      </label>
                      <br />
                      <input
                        type="checkbox"
                        id="flexCheckIndeterminate"
                        name="IT"
                        onChange={(e) => {
                          filtering('jobCategories',e)
                        }}
                        className="form-check-input"
                      ></input>
                      <label
                        class="form-check-label ms-2"
                        htmlFor="flexCheckIndeterminate"
                      >
                       {json[0].jobCategoryIt}
                      </label>
                      <br />
                    </li>

                    <a to="" activeClassName="sidebar__actived">
                      <li className="list-group-itemx ">
                        <h6 className="fw-bold">{json[0].jobType}</h6>
                        <input
                          type="checkbox"
                          id="flexCheckIndeterminate"
                          name="Part time"
                          onChange={(e) => {
                            filtering('jobType',e)
                          }}
                          className="form-check-input"
                        ></input>
                        <label
                          class="form-check-label ms-2"
                          htmlFor="flexCheckIndeterminate"
                        >
                         {json[0].jobTypePart}
                        </label>
                        <br />
                        <input
                          type="checkbox"
                          id="flexCheckIndeterminate"
                          name="Full time"
                          onChange={(e) => {
                            filtering('jobType',e)
                          }}
                          className="form-check-input"
                        ></input>
                        <label
                          class="form-check-label ms-2 mb-2"
                          htmlFor="flexCheckIndeterminate"
                        >
                          {json[0].jobTypeFull}
                        </label>
                        <br />
                      </li>
                    </a>
                  </ul>
                </div>
              </div>
            </div>
          </aside>

          <div
            className="jobs__container col-md-6 col-lg-6 col-md-6"
            id="listOfJobs"
          >
            {isLoading === true && (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            {lang === "English"
              ? jobsItems &&
                jobsItems.filter((post)=>{
                    if (SearchTerm ==="")
                    {
                      return post ;
                    }else if(post.data.jobTitle ||post.data.companyIndustry)
                     {if(post.data.jobTitle.toLowerCase().includes(SearchTerm.toLowerCase())
                    // || post.data.companyIndustry.toLowerCase().includes(SearchTerm.toLowerCase())
                    )
                    {
                      return post ;
                    }}
                  }).map((post, index) => (
                  <div key={post.id}>
                    <Card
                      id={post.id}
                      companyId={post.companyId}
                      componyName={post.data.companyName}
                      companyIndustry={post.data.companyIndustry}
                      city={post.data.companyCountry}
                      ImageUrl={post.data.logo}
                      saved={post.data.saved}
                      title={post.data.jobTitle}
                      categories={post.data.jobCategories}
                      country={post.data.Country}
                      dateTime={post.data.date.Time}
                      jobtime={post.data.jobType}
                      experience={post.data.experience}
                      careerLevel={post.data.careerLevel}
                      timestamp={post.data.date}
                      save={"Save"}
                      Share={"Share"}
                      Hide={"Hide"}
                    />
                  </div>
                ))
              : jobsItems &&
              jobsItems.map((post, index) => (
                  <div key={post.id}>
                    <Card
                      id={post.id}
                      companyId={post.companyId}
                      componyName={post.data.companyName}
                      companyIndustry={post.data.companyIndustry}
                      city={post.data.companyCountry}
                      ImageUrl={post.data.logo}
                      saved={post.data.saved}
                      title={post.data.jobTitleAR}
                      categories={post.data.jobCategoriesAR}
                      country={post.data.Country}
                      dateTime={post.data.date.Time}
                      jobtime={post.data.jobTypeAR}
                      experience={post.data.experienceAR}
                      careerLevel={post.data.careerLevel}
                      timestamp={post.data.date}
                      save={"حفظ"}
                      Share={"مشاركة"}
                      Hide={"اخفاء"}
                    />
                  </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchPage;
