import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA_LzzUSSo1QGKhv_VFPvAbh5VjVpUC2S4",
  authDomain: "todoapp-6fd88.firebaseapp.com",
  databaseURL: "https://todoapp-6fd88-default-rtdb.firebaseio.com",
  projectId: "todoapp-6fd88",
  storageBucket: "todoapp-6fd88.appspot.com",
  messagingSenderId: "26146459123",
  appId: "1:26146459123:web:1ead97b4916047a9fa1686"
};

firebase.initializeApp(firebaseConfig);
const databaseRef = firebase.database().ref();

export const todosDb = databaseRef.child("todos");
export default firebase;