
import { initializeApp } from 'firebase/app';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import {getFirestore, collection, doc, setDoc, updateDoc , deleteField, getDoc, Timestamp } from "firebase/firestore"; 






const firebaseConfig = {

    apiKey: "AIzaSyCZjyy1oKPcOmkLX1QiP1qgscpbiA9c5fA",
  
    authDomain: "internship-5eb90.firebaseapp.com",
  
    projectId: "internship-5eb90",
  
    storageBucket: "internship-5eb90.appspot.com",
  
    messagingSenderId: "412513808874",
  
    appId: "1:412513808874:web:0675a0c89d9bcc04bf4293",
  
    measurementId: "G-KPW7RYT60S"
  
  };
  
  
    



const app = initializeApp(firebaseConfig);

const auth  = getAuth();

const db = getFirestore(app);


let signUpNameInput = document.getElementById('signUpNameInput');
let numberInput = document.getElementById('numberInput');
let addressInput = document.getElementById('addressInput');
let cityInput = document.getElementById('cityInput');
let stateInput = document.getElementById('stateInput');
let countryInput = document.getElementById('countryInput');
let signUpEmailInput = document.getElementById('signUpEmailInput');
let signUpPasswordInput = document.getElementById('signUpPasswordInput');
let signUpButton = document.getElementById('signUpButton');

let signInEmailInput = document.getElementById('signInEmailInput');
let signInPasswordInput = document.getElementById('signInPasswordInput');
let signInButton = document.getElementById('signInButton');

if (signUpButton != null){

signUpButton.onclick = () => {
  const email = signUpEmailInput.value;
  const password = signUpPasswordInput.value;
  console.log(email,password)
createUserWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
  const user = userCredential.user;
  console.log(user);
  console.log('User registration done!');

  const userProfile = {
    name: signUpNameInput.value,
        phoneNumber: numberInput.value,
        adress: addressInput.value,
        state: stateInput.value,
        city: cityInput.value,
        country: countryInput.value
  }



  const userData = doc(collection(db, "userProfile"), user.uid);
  const userTask = doc(collection(db, "userTask"), user.uid);
  setDoc(userTask, {});
  setDoc(userData, userProfile).then(()=>{
    window.location.replace('/home.html');
  });

  

 
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  
});

}
}



if (signInButton != null){
  
signInButton.onclick = () => {
  const email = signInEmailInput.value;
  const password = signInPasswordInput.value;
  console.log(email,password);
  
  signInWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
    
    const user = userCredential.user;
    console.log('Done signing in!!');


    window.location.replace("/home.html");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

}


}


export function addUserTask(userTask){
  const user = auth.currentUser;
  const userData = doc(collection(db, "userTask"), user.uid);
  updateDoc(userData, userTask)
}

export async function getUserTask(){
  const user = auth.currentUser;
  console.log(user.uid);
  const userData = doc(db, "userTask", user.uid);
  return await getDoc(userData)
}

// to delete tasks
export function removeTask(k){
  const userData = doc(db, "userTask", user.uid);
    updateDoc(userData, {
    k: deleteField()
  }).then(() => {
    console.log('deleted');
  });

}
