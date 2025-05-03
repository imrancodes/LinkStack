import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { app } from '../../firebase';

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const errorMsg = (err) => {
    switch (err.code) {
        case 'auth/popup-closed-by-user':
            toast.error('You closed the sign-in popup. Please try again.');
            break;
        case 'auth/account-exists-with-different-credential':
            toast.error('You have already signed up with another method.');
            break;
        case 'auth/network-request-failed':
            toast.error('Network error! Check your internet connection.');
            break;
        case 'auth/email-already-in-use':
            toast.error('This email is already registered. Try logging in.');
            break;
        case 'auth/cancelled-popup-request':
            toast.error('Login was interrupted. Please try again.');
            break;
        default:
            toast.error('Something went wrong! Please try again.');
    }
};

export const AuthWithGoogle = async (e, navigate) =>{
    e.preventDefault();
    try{
        await signInWithPopup(auth, googleProvider)
        navigate('/')
    }catch(err){
        errorMsg(err)
    }
} 