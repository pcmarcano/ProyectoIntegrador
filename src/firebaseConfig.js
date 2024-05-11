import { initializeApp } from "firebase/app";
import {
  signInWithEmailAndPassword,
  getAuth,
  signOut,
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

export const storage = getStorage(app);
export const db = getFirestore(app);

export const uploadFile = async (file) => {
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
