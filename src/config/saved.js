import app from "../firebase";
import auth from "../firebase";

const db = app.firestore();
const user = auth.auth().currentUser;

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
  if (user) {
    let userId = user.uid;

    return new Promise((resolve, reject) => {
      console.log(auth.auth());
      console.log();
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
}
function getSavedJob() {
  let userId = user.uid;
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
  if (user) {
    let userId = user.uid;

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
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { addJobtoSavedPage, getSavedJob, deletSavedJob };
