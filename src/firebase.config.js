import {getApp,getApps,initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyAmX7QBwAg2-5qMuGpoLXfVkgf4QnC9ong",
    authDomain: "foodyapp-1272f.firebaseapp.com",
    databaseURL: "https://foodyapp-1272f-default-rtdb.firebaseio.com",
    projectId: "foodyapp-1272f",
    storageBucket: "foodyapp-1272f.appspot.com",
    messagingSenderId: "931300964865",
    appId: "1:931300964865:web:548471b3c69b842be45e00"
  };

const app= getApps.length>0 ? getApp() : initializeApp(firebaseConfig)

const firestore= getFirestore(app);
const storage = getStorage(app);
export {app,firestore,storage};
  