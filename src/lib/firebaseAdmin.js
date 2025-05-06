import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";
import serviceAccount from "../../serviceAccountKey.json"; // путь зависит от места, где ты импортируешь

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
    databaseURL: "https://perec-news-default-rtdb.europe-west1.firebasedatabase.app",
  });
}

export const adminDb = getDatabase();
