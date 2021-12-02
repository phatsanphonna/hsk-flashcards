import { auth } from "./app"
import { auth as Auth } from 'firebase'

const GoogleAuthProvider = new Auth.GoogleAuthProvider()

/*
 * @ssuniie
 * 
 * Sign In with Pop-up, use Google Authentication
 * 
 * @return {Promise<Auth.UserCredential>}
 */
export const signInWithPopup = async (): Promise<Auth.UserCredential> => {
    return await auth.signInWithPopup(GoogleAuthProvider)
}

/*
 * @ssuniie
 * 
 * Sign In with redirect to Google Authentication page
 * and redirect back to index page with Auth.UserCredential
 * 
 * @return {Promise<void>}
 */
export const signInWithRedirect = async (): Promise<void> => {
    return await auth.signInWithRedirect(GoogleAuthProvider)
}

export const getRedirectResult = auth.getRedirectResult

/*
 * @ssuniie
 * 
 * Sign Out and clear UserCredential in IndexDB storage
 * 
 * @return {Promise<void>}
 */
export const signOut = async (): Promise<void> => {
    return auth.signOut()
}

export const currentUser = auth.currentUser

export const handleAuthState = auth.onAuthStateChanged