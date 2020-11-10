import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ promt: "select_account"});
export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider)


// Takes userAuth and checks if it exist, if not make a new user to register it and return the userref to store info
export const handleUserProfile = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const { uid } = userAuth;

    const userRef = firestore.doc(`users/${uid}`);
    const snapshop = await userRef.get();

    if(!snapshop.exists) {
        const { displayName, email } = userAuth;
        const timestamp = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdDate: timestamp,
                ...additionalData
            });
        } catch(err) {
            //console.log(err);
        }
    }

    return userRef;
}