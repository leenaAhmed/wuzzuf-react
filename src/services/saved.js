import app from "../firebase";
import auth from "../firebase";


const db = app.firestore();
const user = auth.auth().currentUser;
let userId;
if (!user) {
  userId = "";
  // userId = user.uid
} else {
  userId = user.uid;
}

function addJobtoSavedPage(
  componyName,
  city,
  ImageUrl,
  companyIndustry,
  title,
  jobtime,
  timestamp,
  categories,
  experience
) {
  return new Promise((resolve, reject) => {
    const data = {
      saved: true,
      componyName: componyName,
      location: city,
      companyLogo: ImageUrl,
      companyIndustry: companyIndustry,
      jobTitle: title,
      jobStatus: jobtime,
      timeRanges: timestamp,
      categoriey: categories,
      experience: experience
    };
    db.collection("users")
      .doc(userId)
      .collection("savedJob")
      .add(data)
      .then((docRef) => {
        resolve(docRef);
      })
      .catch((e) => {
        reject(e);
      });
  });
}
function getSavedJob() {
  return new Promise((resolve, reject) => {
    console.log(auth.auth());
    db.collection("users")
      .doc(userId)
      .collection("savedJob")
      .get()
      .then((data) => {
        const allacceptedJobs = data.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
          companyId: doc.data().companyID
        }));

        resolve(allacceptedJobs);
      })
      .catch((e) => {
        reject(e);
      });
  });
}
function deletSavedJob(jobId) {
  return new Promise((resolve, reject) => {
    console.log(auth.auth());
    db.collection("users")
      .doc(userId)
      .collection("savedJob")
      .doc(jobId)
      .delete()
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);

        console.error("Error removing document: ", error);
      });
  });
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { addJobtoSavedPage, getSavedJob, deletSavedJob };
