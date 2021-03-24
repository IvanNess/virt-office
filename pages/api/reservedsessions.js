// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Cors from 'cors'
import initMiddleware from '../../init-middleware'
import firebase from 'firebase'

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    origin: process.env.ORIGIN,
    credentials: true
  })
)

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  };

try {
    firebase.initializeApp(firebaseConfig);
} catch(err){
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack)
    }
}

export default async(req, res) => {
    // Run cors
    console.log('api', req.body)
    await cors(req, res)

    //   const response = await fire.firestore().collection('comments')
    //     .where('path', '==', req.body.path)
    //     .where('isApproved', '==', true)
    //     .orderBy('date')
    //     .get()
    //   const docs = response.docs.map(doc=>doc.data())
    //   console.log('docs', docs)

    const auth = firebase.auth() 
    console.log('auth', auth)

    const data = await firebase.firestore().collection('reservedSessions')
        .where('year', '==', req.body.year)
        .where('month', '==', req.body.month)
        .where('day', '==', req.body.day)
        .get()
    const sessions = data.docs.map(doc=>{
        return doc.data()
    })
    console.log('sessions', sessions)
    res.status(200).json({sessions})
}
