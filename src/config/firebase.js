import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAxFAGVMv-Ys0IQDDI_SZosih7DdJBg6kQ",
    authDomain: "venda-fe854.firebaseapp.com",
    projectId: "venda-fe854",
    storageBucket: "venda-fe854.appspot.com",
    messagingSenderId: "243430698875",
    appId: "1:243430698875:web:801d78975ddf813f0617de",
    measurementId: "G-457ZWDNC5R"
  };
  // Initialize Firebase
  export default firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
