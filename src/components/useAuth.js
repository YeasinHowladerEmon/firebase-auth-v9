import { useContext, useEffect, useState } from "react"
import firebaseConfig from "../firebase";
import firebase from 'firebase/compat/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateEmail, updatePassword } from "firebase/auth";
import { AuthContext } from "./contexts/AuthContext";


!firebase.apps.length && firebase.initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export const useAuth = () => {
    const { setCurrentUser } = useContext(AuthContext);
    const [user, setUser] = useState({})
    
    const googleSignIn = () => {
        return signInWithPopup(auth, provider)
    }
    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        return signOut(auth)
    }
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }
    const updateProfileEmail = (email) => {
        return updateEmail(auth.currentUser, email)
    }
    const updateProfilePassword = (password) => {
        const user = auth.currentUser
        return updatePassword(user, password)
        .then((res) => console.log("response" ,res))
        .catch((err) => console.log("error aise", err))
    }
    useEffect(() => {
        // const auth = getAuth(firebase);
        const subs = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                // setCurrentUser(user)
                console.log(user);
            }
            else {
                setUser(false)
            }
        }, [])
        return () => subs;
    })



    return {
        signup,
        googleSignIn,
        user,
        login,
        logOut,
        resetPassword,
        updateProfileEmail,
        updateProfilePassword
    }

}