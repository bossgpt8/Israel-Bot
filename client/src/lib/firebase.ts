import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  type User 
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-Y-1-WxtrAxDonf6H7OXzezakyaxPL8I",
  authDomain: "boss-bot-md.firebaseapp.com",
  projectId: "boss-bot-md",
  storageBucket: "boss-bot-md.firebasestorage.app",
  messagingSenderId: "382812382967",
  appId: "1:382812382967:web:884faea91e645af14455f2",
  measurementId: "G-J19CBQ8BPJ"
};

const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
export const auth = getAuth(app);
export const db = getFirestore(app);

async function checkFirestore() {
  try {
    if (typeof window !== "undefined") {
      const docRef = doc(db, "users", "test");
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Firestore check timed out")), 3000)
      );
      await Promise.race([getDoc(docRef), timeoutPromise]);
    }
  } catch (e: any) {
    if (e.message?.includes("Database '(default)' not found") || e.code === 'not-found') {
      console.error("FIREBASE ERROR: Database '(default)' not found. ACTION REQUIRED: 1. Go to https://console.firebase.google.com/ 2. Select your project 'boss-bot-md' 3. Click 'Firestore Database' in the sidebar 4. Click 'Create database' 5. Select 'Native mode' and a location.");
    }
  }
}
checkFirestore();

const googleProvider = new GoogleAuthProvider();

export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      lastLogin: serverTimestamp(),
    }, { merge: true });
    
    return user;
  } catch (error: any) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function signUpWithEmail(email: string, pass: string, name: string) {
  const result = await createUserWithEmailAndPassword(auth, email, pass);
  await updateProfile(result.user, { displayName: name });
  
  await setDoc(doc(db, "users", result.user.uid), {
    email: result.user.email,
    displayName: name,
    lastLogin: serverTimestamp(),
  }, { merge: true });
  
  return result.user;
}

export async function loginWithEmail(email: string, pass: string) {
  const result = await signInWithEmailAndPassword(auth, email, pass);
  return result.user;
}

export async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}

export async function getUserBotSession(userId: string) {
  try {
    const docRef = doc(db, "botSessions", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error("Error getting bot session:", error);
    return null;
  }
}

export async function saveBotSession(userId: string, sessionData: any) {
  try {
    await setDoc(doc(db, "botSessions", userId), {
      ...sessionData,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.error("Error saving bot session:", error);
    throw error;
  }
}

export { onAuthStateChanged, type User };
