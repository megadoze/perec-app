import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, child } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCC4KkO1LLHdf54bcjx7EjSG_V3kzrkzr4",
  authDomain: "perec-news.firebaseapp.com",
  databaseURL:
    "https://perec-news-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "perec-news",
  storageBucket: "perec-news.firebasestorage.app",
  messagingSenderId: "515432474591",
  appId: "1:515432474591:web:caec05acd33c2f651dc66a",
};

initializeApp(firebaseConfig);

export async function getAllNewsSlugs() {
  const db = getDatabase();
  const snapshot = await get(child(ref(db), "news"));
  const data = snapshot.val() || {};

  return Object.values(data)
    .filter((n) => n.slug && n.category)
    .map((n) => ({
      slug: n.slug,
      category: n.category,
    }));
}

export async function getAllCategorySlugs() {
  return ["politics", "economics", "life", "culture", "bezkupur"]; // укажи свой актуальный список
}

// export async function getAllCategorySlugs() {
//   const db = getDatabase();
//   const snapshot = await get(child(ref(db), "categories"));
//   const data = snapshot.val() || {};

//   return Object.keys(data); // ["politics", "economics", "life"]
// }
