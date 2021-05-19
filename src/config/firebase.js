import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAxwQmJB1C--SYHzyVigR68a3dZibZV3ok",
    authDomain: "venda-b7359.firebaseapp.com",
    projectId: "venda-b7359",
    storageBucket: "venda-b7359.appspot.com",
    messagingSenderId: "332968345269",
    appId: "1:332968345269:web:2b3cbc44e34912548288fc",
    measurementId: "G-5GN91SP5BN"
  };
  // Initialize Firebase
  export default firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
