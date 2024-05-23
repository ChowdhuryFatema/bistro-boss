import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    // social login provider
    const googleProvider = new GoogleAuthProvider();
    const gitHubProvider = new GithubAuthProvider();

    // create user 
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // update User Profile
    const updateUserProfile = (name, photo) => {
    
        updateProfile(auth.currentUser, {
 
             displayName: name, 
             photoURL: photo,
             
           })
 
           setUser({
             ...user,
             displayName: name, 
             photoURL: photo
           })
     }

    // sign in user 
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

       // google login 
       const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // github login 
    const gitHubLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, gitHubProvider)
    }

    // log out user 
    const logOutUser = () => {
        setLoading(true);
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {


            const userEmail = currentUser?.email || user?.email;
            const loggedUser = {email: userEmail}

            setUser(currentUser);
            setLoading(false)

            // if user exists then issue a token 
            if( currentUser ){
                axios.post('https://library-server-teal.vercel.app/jwt', loggedUser, {withCredentials: true})
                .then(data => {
                    console.log('token response', data.data)
                })
            }else {
                axios.post('https://library-server-teal.vercel.app/logout', loggedUser, {withCredentials: true})
                .then(res => {
                    console.log(res.data);
                })
            }


        });

        return () => unSubscribe();
    }, [user]);

    const authInfo = {
        user,
        setUser,
        loading,
        createUser,
        updateUserProfile,
        signInUser,
        googleLogin,
        gitHubLogin,
        logOutUser,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
}
export default AuthProvider;