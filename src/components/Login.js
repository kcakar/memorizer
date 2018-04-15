/*  eslint-disable no-unused-vars*/
// login fonksiyonu her seferinde 2-3-4 kere çağrılıyor
import React from 'react';
import { render } from 'react-dom';

import LanguageSwitcher from './LanguageSwitcher';
import base from '../base';
import * as firebase from "firebase";
import {Elevation} from "rmwc";


import brainIMG from "../images/brain.png";
import '../css/Intro.css';
import language from '../Language';


class Login extends React.Component {

    constructor() {
        super();

        this.authenticate = this.authenticate.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.logout = this.logout.bind(this);
        
        this.state = {
            uid: null,
            owner: null
        }

    }

    componentDidMount() {
        let component=this;
        firebase.auth().onAuthStateChanged(function(user, error) {
            if (user) {
                component.authHandler(null, { user });
            }
          });
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.userLogout) {
            this.logout();
        }
    }

    authHandler(err, authData) {
        if (err) {
            console.error(err);
            return;
        }

        //get store info
        const userRef = firebase.database().ref(this.props.userId);

        //query db for store data
        userRef.once('value', (snapshot) => {
            const data = snapshot.val() ||  {}
            if (!data.owner) {
                userRef.set({
                    owner: authData.user.uid
                })
            }

            let user = {
                uid: authData.user.uid,
                userName: authData.user.displayName,
                photoURL: authData.user.photoURL
            }

            this.props.login(user);
        });
    }

    authenticate(providerType) {
        console.log("AUTHENTİKATE")

        var provider = new firebase.auth.FacebookAuthProvider();
        switch (providerType) {
            case "facebook":
                break;
            case "twitter":
                provider = new firebase.auth.TwitterAuthProvider();
                break;  
            case "google":
                provider = new firebase.auth.GoogleAuthProvider();
                break; 
            case "github":
                provider = new firebase.auth.GithubAuthProvider();
            break; 
            default:
                break;
        }
        

        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            console.log(error.code)
            console.log(error.message)
            console.log(error.email)
            console.log(error.credential)
          });
    }

    logout() {
        console.log("login.logout")
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
          }).catch(function(error) {
            // An error happened.
          });
        this.props.userLoggedOut();
    }



    render() {
        const siteLang=this.props.settings.siteLanguage;
        return (
            <section className="intro">
                <Elevation z="7">
                        <div className="login">
                            <img alt="memorizer" src={brainIMG}/>
                            <h2>MEMORIZER!</h2>
                            <LanguageSwitcher siteLang={siteLang} changeLanguage={this.props.changeLanguage} />
                            <div className="loginButtons">
                                <button className="facebook" onClick={() => this.authenticate('google')}>{language.intro[siteLang].login_google}</button>
                                <button className="facebook" onClick={() => this.authenticate('twitter')}>{language.intro[siteLang].login_twitter}</button>
                                <button className="facebook" onClick={() => this.authenticate('github')}>{language.intro[siteLang].login_github}</button>
                                <button className="facebook" onClick={() => this.authenticate('facebook')}>{language.intro[siteLang].login_facebook}</button>
                            </div>
                        </div>
                </Elevation>
            </section>
        );
    }
}

export default Login