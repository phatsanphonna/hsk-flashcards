import { auth } from "./app"
import { auth as Auth } from 'firebase'

const GoogleAuthProvider = new Auth.GoogleAuthProvider()

export const signInWithPopup = async (): Promise<Auth.UserCredential> => {
    return await auth.signInWithPopup(GoogleAuthProvider)
}

export const signInWithRedirect = async (): Promise<void> => {
    return await auth.signInWithRedirect(GoogleAuthProvider)
}

export const getRedirectResult = auth.getRedirectResult

export const signOut = async (): Promise<void> => {
    return auth.signOut()
}

export const currentUser = auth.currentUser

export const handleAuthState = auth.onAuthStateChanged