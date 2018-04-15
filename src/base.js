
// import Rebase from 're-base';


// const base = Rebase.createClass({
//     apiKey: "AIzaSyDG9wv6tqJleKcDiF65v9uxxVWmsQNfm6Q",
//     authDomain: "react-workout.firebaseapp.com",
//     databaseURL: "https://react-workout.firebaseio.com"
// });
var Rebase = require('re-base');
var firebase = require('firebase');
var app = firebase.initializeApp({
      apiKey: "AIzaSyDG9wv6tqJleKcDiF65v9uxxVWmsQNfm6Q",
      authDomain: "react-workout.firebaseapp.com",
      databaseURL: "https://react-workout.firebaseio.com",
});
var base = Rebase.createClass(app.database());

export default base;


