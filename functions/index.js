const functions = require("firebase-functions");

const stripe = require('stripe')(process.env.STRIPE_SECRET)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// const express = require('express');
// const cookieParser = require('cookie-parser')();
// const cors = require('cors')({origin: true});
// const app = express();

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();


// Take the text parameter passed to this HTTP endpoint and insert it into 
// Firestore under the path /messages/:documentId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {


    console.log('Check if request is authorized with Firebase ID token', req.headers);

    if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
        !(req.cookies && req.cookies.__session)) {
        console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
            'Make sure you authorize your request by providing the following HTTP header:',
            'Authorization: Bearer <Firebase ID Token>',
            'or by passing a "__session" cookie.');
        res.status(403).send('Unauthorized');
        return;
    }

    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        console.log('Found "Authorization" header');
        // Read the ID Token from the Authorization header.
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else if(req.cookies) {
        console.log('Found "__session" cookie');
        // Read the ID Token from cookie.
        idToken = req.cookies.__session;
    } else {
        // No cookie
        res.status(403).send('Unauthorized');
        return;
    }

    try {
        const decodedIdToken = await admin.auth().verifyIdToken(idToken);
        console.log('ID Token correctly decoded', decodedIdToken);
        req.user = decodedIdToken;
        // next();

        // Grab the text parameter.
        const original = req.query.text;
        // Push the new message into Firestore using the Firebase Admin SDK.
        const writeResult = await admin.firestore().collection('messages').add({original: original});
        // Send back a message that we've successfully written the message
        res.json({result: `Message with ID: ${writeResult.id} added.`});
        return;

    } catch (error) {
        console.error('Error while verifying Firebase ID token:', error);
        res.status(403).send('Unauthorized');
        return;
    }
});

exports.test = functions.https.onCall(async (data, context) => {

    const {buf, sig, endpointSecret} = data

    try {
        event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    } catch (err) {
        console.log(`Webhook Error: ${err.message}`)
        return res.status(400).send(`Cloud Function Stripe Error: ${err.message}`);
    }

    await admin.firestore().collection('messages').add({original: 'test'});

    return {data: 'success'}
})
