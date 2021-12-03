import User from "@/types/user.type"
import firebase from "firebase"
import { db } from "./app"

/**
 * Query user from firestore database.
 * if user exists, return user data.
 * else, add new data to database and return user data.
 * 
 * @param {firebase.User} User user information from firebase authentication
 * @return {Promise<User | firebase.firestore.DocumentData | undefined>}
 */
export const queryUser = async ({ uid, displayName, email, photoURL }: firebase.User): Promise<User | firebase.firestore.DocumentData | undefined> => {
  try {
    const snapshot = await db.collection('users').where('uid', '==', uid).get()

    if (snapshot.docs.length === 0) {
      await db.collection('users').add({
        uid,
        displayName,
        email,
        photoURL
      })
      return { uid, displayName, email, photoURL }
    } else {
      return snapshot.docs[0].data()
    }
  } catch (err) {
    console.error(err)
  }
}