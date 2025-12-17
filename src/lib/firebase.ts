import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCMgA60gYKgPUF6AjD26i3tJtcc48tst08",
  authDomain: "vbts-production.firebaseapp.com",
  databaseURL: "https://vbts-production-default-rtdb.firebaseio.com",
  projectId: "vbts-production",
  storageBucket: "vbts-production.appspot.com",
  appId: "1:896873230776:web:bb63660ea1f529c8535f4d"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

export default app;