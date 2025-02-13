import { getDatabase } from "firebase/database";
import { getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyC2eim7o52-1qm8JHc8KpeReeMtmvILGdU",
    authDomain: "comidadiri.firebaseapp.com",
    databaseURL: "https://comidadiri-default-rtdb.firebaseio.com",
    projectId: "comidadiri",
    storageBucket: "comidadiri.firebasestorage.app",
    messagingSenderId: "647627909900",
    appId: "1:647627909900:web:fab8cb7fec7c7015153729",
    measurementId: "G-WFB7HSTPQD"
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getDatabase(app);