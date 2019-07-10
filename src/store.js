import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import firebase from 'firebase';
import 'firebase/storage' // <- needed if using storage
import {firebaseReducer, reactReduxFirebase} from "react-redux-firebase";
import {firestoreReducer, reduxFirestore} from "redux-firestore";
import {firebaseConfig} from "./firebaseConfig";
import notifyReducer from "./reducers/notifyReducer";
import settingsReducer from "./reducers/settingsReducer";
import ReduxThunk from "redux-thunk";


// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB

};

//Init firebase instance
firebase.initializeApp(firebaseConfig);
// const firestore = firebase.firestore();
// const setting = {};
// firestore.setting(setting);
// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  notify: notifyReducer,
  settings: settingsReducer,
});

//check for settings in localStorage
if (localStorage.getItem("settings") == null) {
  // Default settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false,
  };
  // Set to localStorage
  localStorage.setItem('settings', JSON.stringify(defaultSettings));
}
// Create initial state
// Create store with reducers and initial state
const initialState = {settings: JSON.parse(localStorage.getItem("settings"))};

const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    applyMiddleware(ReduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ));

export default store;