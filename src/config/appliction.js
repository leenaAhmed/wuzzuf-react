import app from "../firebase";
import auth from "../firebase";
const db = app.firestore();

const user = auth.auth().currentUser;
let userId = user.uid;
