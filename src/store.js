import {combineReducers, compose, createStore} from "redux";
import firebase from 'firebase';
import 'firebase/storage' // <- needed if using storage
import {firebaseReducer, reactReduxFirebase} from "react-redux-firebase";
import {firestoreReducer, reduxFirestore} from "redux-firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAukAv9CfiQ5xpfdHIEfSfymVUnMpoxOiE",
  authDomain: "reactclientpanel-1f47f.firebaseapp.com",
  databaseURL: "https://reactclientpanel-1f47f.firebaseio.com",
  projectId: "reactclientpanel-1f47f",
  storageBucket: "reactclientpanel-1f47f.appspot.com",
  messagingSenderId: "14332876136",
  appId: "1:14332876136:web:9c65a0d9bbfb39c4"
};
// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  userFirestoreForProfile: true,
};

//Init firebase instance
firebase.initializeApp(firebaseConfig);
// const firestore = firebase.firestore();
// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
});

// Create initial state

// Create store with reducers and initial state
const initialState = {};
const store = createStoreWithFirebase(rootReducer, initialState, compose(
  reactReduxFirebase(firebase),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;