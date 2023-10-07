import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const app = initializeApp({
    apiKey: "AIzaSyCpX7SITA305GjbPr-f-pREcJ25NOX2t3c",
    authDomain: "teacher-review-system.firebaseapp.com",
    projectId: "teacher-review-system",
    storageBucket: "teacher-review-system.appspot.com",
    messagingSenderId: "963678129608",
    appId: "1:963678129608:web:33cea4b7752c45907404fd"
});

export default app;
export const db = getFirestore(app);
export const surveysRef = collection(db, "surveys");