//inicializamos el firebase para el proyecto
import firebase from 'firebase/compat/app'
//imports de los metodos de firebase
import 'firebase/compat/auth'
//import firestore
import 'firebase/compat/firestore'
//imports de almacenamiento de imagnes o archivos
import 'firebase/compat/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBkjDiSmnQSHsqFyxNPYak3NS09R0abpmk",
    authDomain: "astucianaval-45418.firebaseapp.com",
    databaseURL: "https://astucianaval-45418-default-rtdb.firebaseio.com",
    projectId: "astucianaval-45418",
    storageBucket: "astucianaval-45418.appspot.com",
    messagingSenderId: "423461636462",
    appId: "1:423461636462:web:5ea6542846214cfd24597f"
  };

  // validador de conexion

try {
    firebase.initializeApp(firebaseConfig);
} catch (err) {
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack)
    }
}

// exportar las herramientas de firebase
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const firebaseNow = firebase.firestore.FieldValue.serverTimestamp();

export default firebase;