import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom"; // React Router

const AuthContext = createContext({});

async function verifyUser(user, password, username) {
  const docRef = doc(db, `users/${user.email}`);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    await setDoc(docRef, {
      email: user.email,
      password: password ?? "",
      photoURL: user.photoURL,
      username: user.displayName ?? username,
      uid: user.uid,
    });
  } else {
    if (!password) {
      return;
    } else {
      throw new Error("User already exists");
    }
  }
}

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // React Router navigate function

  const storeUserInLocalStorage = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, provider);
      setUser(user);
      storeUserInLocalStorage(user);
      verifyUser(user);
      navigate("/"); // Replace with the route you want to navigate to
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    await signOut(auth);
    removeUserFromLocalStorage();
    setUser(null);
    setLoading(false);
    navigate("/login"); // Replace with the logout route
  };

  const emailSignUp = async (username, email, password) => {
    try {
      setLoading(true);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await verifyUser(user, password, username);
      setUser(user);
      storeUserInLocalStorage(user);
      navigate("/sign-in"); // After successful signup
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const emailSignIn = async (email, password) => {
    try {
      setLoading(true);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setUser(user);
      storeUserInLocalStorage(user);
      const docRef = doc(db, `users/${user.email}`);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        throw new Error("User does not exist");
      }
      navigate("/"); // Replace with the route after successful login
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) storeUserInLocalStorage(currentUser);
      else removeUserFromLocalStorage();
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signInWithGoogle,
        logout,
        emailSignUp,
        emailSignIn,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
