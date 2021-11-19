import User from "@/types/user.type"
import firebase from "firebase"
import { db } from "./app"

import * as HSK3 from '../files/HSK3.json'

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
    console.log(err)
  }
}