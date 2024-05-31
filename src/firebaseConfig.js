import { initializeApp } from "firebase/app";
import {
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth firstasd
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

export const uploadFile = async (file) => {
  console.log(file);
  try {
    // Obtener una referencia al almacenamiento
    const storageRef = ref(storage, "nuevaCarpeta/" + v4());

    // Cargar la imagen comprimida en el almacenamiento
    const subida = await uploadBytes(storageRef, file);
    console.log(subida);

    // Obtener la URL de descarga de la imagen cargada
    const url = await getDownloadURL(storageRef);

    // Devolver la URL de descarga de la imagen
    return url;
  } catch (error) {
    // Manejar cualquier error que ocurra durante el proceso de carga
    console.error("Error al cargar la imagen:", error);
    throw error;
  }
};

export const onSignIn = async ({ email, password }) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    // Borrar información del usuario del localStorage
    localStorage.removeItem("userInfo");
    localStorage.removeItem("isLogged");
    console.log(
      "Cerró Sesión y se eliminó la información del usuario del localStorage."
    );
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw error;
  }
};

let googleProvider = new GoogleAuthProvider();

export const loginGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);

    return res;
  } catch (error) {
    console.error("Error al iniciar sesión con Google:", error);
    throw error;
  }
};

export const signUp = async ({ email, password }) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    console.log(res);
    return res;
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      console.log("El email ya está en uso.");
    } else {
      console.error("Error al registrarse:", error);
    }
    throw error;
  }
};

export const forgotPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Correo de restablecimiento de contraseña enviado.");
  } catch (error) {
    console.error(
      "Error al enviar el correo de restablecimiento de contraseña:",
      error
    );
    throw error;
  }
};
