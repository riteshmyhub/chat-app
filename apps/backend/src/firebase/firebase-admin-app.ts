import * as admin from "firebase-admin";

const serviceAccount = {
   project_id: process.env.FIREBASE_PROJECT_ID,
   private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"), // Handle escaped newlines
   client_email: process.env.FIREBASE_CLIENT_EMAIL,
   client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};

if (!admin.apps.length) {
   admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
   });
}

const FIREBASE = {
   ADMIN: admin,
   DB: admin.firestore(),
   get COLLECTION() {
      return {
         MESSAGES: this.DB.collection("messages"),
      };
   },
};

export default FIREBASE;
