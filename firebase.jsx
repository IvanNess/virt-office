import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAYZ65E-ZXOAwukWAT5jYwUM5Ah7kKZ69g",
    authDomain: "virt-office.firebaseapp.com",
    projectId: "virt-office",
    storageBucket: "virt-office.appspot.com",
    messagingSenderId: "854614542993",
    appId: "1:854614542993:web:00f466be9c6955fd0a0d30"
  };


try {
    firebase.initializeApp(firebaseConfig);
} catch(err){
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack)
    }
}

const fire = firebase

export default fire



