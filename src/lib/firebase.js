import Firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import dotenv from 'dotenv'
import { seedDatabase } from '../seed';
dotenv.config()


const config = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID
}

const firebase = Firebase.initializeApp(config);
const {FieldValue} = Firebase.firestore;

// seedDatabase(firebase)

export { firebase, FieldValue}

