import React, { useEffect, useState, useContext } from 'react'
import { storage, db } from '../../firebase';
import { useAuth } from '../../contexts/authContext';
import { toast } from 'react-toastify';
import { languageContext } from '../../contexts/languageContext';
import ar from "../../language/editProfile/general-info/ar.json"
import en from "../../language/editProfile/general-info/en.json"

export default function UploadCV() {
    const { currentUser } = useAuth()
    const [progress, setProgress] = useState(0)
    const [url, setUrl] = useState(0)
    const [userDetails, setUserDetails] = useState({});
    const { lang, setLang } = useContext(languageContext);
    const [json, setJson] = useState(en);

    async function uploadFiles(file, path) {
        if (!file) return;
        const storageRef = storage.ref(`/cv/${currentUser?.uid}`).child(file.name)
        const colllectionRef = db.collection("users")

        const uploadTask = storageRef.put(file)

        uploadTask.on("state_changed", (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            setProgress(progress)

        }, (err) => {
            console.log(err)
        },
            () => {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setProgress("uploaded succesfully")
                    if (currentUser) {
                        colllectionRef.doc(currentUser.uid).update({
                            cvPath: downloadURL
                        }).then(() => {
                            toast.success("Your CV succesfully !", {
                                position: toast.POSITION.TOP_LEFT
                            })
                        })
                    }
                });
            }
        )
    }

    const formHandler = (e) => {
        e.preventDefault()
        const file = e.target[0].files[0]
        // console.log(file);
        uploadFiles(file).then(() => {
            e.target.reset()
        })
    }

    useEffect(() => {
        if (lang == "English") { setJson(en) }
        if (lang == 'العربية') { setJson(ar) }
    }, [lang])

    //get user details according to auth
    useEffect(() => {
        if (currentUser) {
            const userId = currentUser.uid
            // console.log(userId);
            db.collection("users").doc(userId).onSnapshot((doc) => {
                if (doc.exists) {
                    setUserDetails(doc.data())
                }
            })
        }
    }, [currentUser])


    console.log(userDetails);
    return (<>
        <article className="col-lg-8 col-md-12">
            <div className="row">
                <div className="col-md-12">
                    <div className="midsection mb-4">
                        <h5 className="mb-1">{json.yourCv}</h5>

                        <div className="col-md-9 ">
                            <div className="midsection__form">
                                <p className="midsection__form__pa mt-2">{json.upload} {progress} %</p>
                                <form onSubmit={formHandler}>
                                    <input type="file" className='w-100 ' />
                                    <button type="submit" className="btn btn-primary rounded-0 mt-3 mb-2">{json.upload}</button>
                                    {
                                        userDetails.cvPath &&
                                        <a href={userDetails.cvPath} className="ms-4 mt-1" target="_blank">{json.viewCv}</a>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </article>
    </>);
}

