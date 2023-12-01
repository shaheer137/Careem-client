import { initializeApp } from "firebase/app";
import { collection, addDoc , getFirestore , doc , onSnapshot } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDtDl-raIFNKHf7YgO2m062onRzmRGFRds",
    authDomain: "careem-a145e.firebaseapp.com",
    projectId: "careem-a145e",
    storageBucket: "careem-a145e.appspot.com",
    messagingSenderId: "586752728101",
    appId: "1:586752728101:web:37a1cb53e08cabc65e73cc"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addARide({ pickup, destination, carType, fare, status }) {
    try {
       const doc = await addDoc(collection(db, "rides"), {
            pickup, destination, carType, fare, status
        });
        return doc.id
    } catch (e) {
        alert(e.message)
    }
}

export {
    addARide, 
    doc, 
    onSnapshot,
    db
}
