/*  eslint-disable no-unused-vars*/
// login fonksiyonu her seferinde 2-3-4 kere çağrılıyor
import React from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import * as firebase from "firebase";
import {Elevation} from "rmwc";
import {base} from "../base.js";//this is used. grayout is a bug
import brainIMG from "../images/brain.png";
import language from '../data/Language';
import Authentication from "./Authentication";

class Login extends React.Component {

    constructor() {
        super();
        this.authenticate = this.authenticate.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.logout = this.logout.bind(this);
        this.cancelLoading=this.cancelLoading.bind(this);
        
        this.state = {
            uid: null,
            owner: null,
            isLoading:true,
            isDebug:true
        }
    }

    componentDidMount() {
        console.log(this.state.isLoading)
        let component=this;

        if(!this.state.isDebug)
        {
            firebase.auth().onAuthStateChanged(function(user, error) {
                if (user) {
                    component.authHandler(null, { user });
                }
                else{
                    console.log("else")
                    component.cancelLoading();
                }
            });
            //Authentication.bindFirebaseEvent();
        }
        else{
            this.props.login({uid: "kfccF86VRYUqA0bkLgwrDiMTo1u1", userName: "Keremcan Çakar", photoURL: "https://avatars3.githubusercontent.com/u/11277098?v=4"} );
            component.cancelLoading();
        }
    }

    cancelLoading(){
        this.setState({isLoading:false});
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
            console.log("user")
            console.log(user)
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
            alert(error.message);
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
        if(this.state.isLoading)
        {
          return(
            <section className="loading fade-enter fade-enter-active">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 150" preserveAspectRatio="xMidYMid meet">
                    <defs>
                        <linearGradient id="a" x1="100%" x2="-8.891%" y1="50%" y2="40.121%">
                        <stop offset="0%" stopColor="#FFEC49"/>
                        <stop offset="35.925%" stopColor="#FFDD3A"/>
                        <stop offset="42.882%" stopColor="#FFE33A"/>
                        <stop offset="100%" stopColor="#FED523"/>
                        </linearGradient>
                        <filter id="b" width="311.7%" height="241.5%" x="-105.9%" y="-70.8%" filterUnits="objectBoundingBox">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10"/>
                        </filter>
                        <linearGradient id="c" x1="89.664%" x2="-13.835%" y1="23.26%" y2="29.268%">
                        <stop offset="0%" stopColor="#FFEC49"/>
                        <stop offset="35.925%" stopColor="#FFDD3A"/>
                        <stop offset="42.882%" stopColor="#FFE33A"/>
                        <stop offset="100%" stopColor="#FED523"/>
                        </linearGradient>
                        <filter id="d" width="380.3%" height="279.7%" x="-140.1%" y="-89.9%" filterUnits="objectBoundingBox">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10"/>
                        </filter>
                        <linearGradient id="e" x1="100%" x2="0%" y1="50%" y2="50%">
                        <stop offset="0%" stopColor="#FFEC4C"/>
                        <stop offset="100%" stopColor="#FED525"/>
                        </linearGradient>
                        <filter id="f" width="652.1%" height="235.6%" x="-276.1%" y="-67.8%" filterUnits="objectBoundingBox">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10"/>
                        </filter>
                    </defs>
                    <g fill="none" fillRule="evenodd">
                        <g id="lightning1">
                            <path fill="#FFEC9B" d="M13.724 17.55L6.364 14l-5.32 3.264a2 2 0 0 0 1.488 3.655l3.833-.87 7.359-2.498z"/>
                            <path fill="url(#c)" d="M12.415 17.028l-5.997-2.956-2.712-7.604a2 2 0 0 1 3.044-2.3l2.41 1.716.006.016 6.118-3.507a2 2 0 0 1 2.959 1.357l3.272 16.997a2 2 0 0 1-2.076 2.375l-2.73-.152a2 2 0 0 0-2.064 2.428l2.02 9.157a.673.673 0 0 1-.735.813c-.303.172-.682.2-1.023.045l-2.01-.918a2 2 0 0 1-.685-.514L.628 20.53a2 2 0 0 1 2.13-3.21l3.986 1.288 1.386.495 4.369-1.792-.084-.284z"/>
                            <path fill="url(#c)" d="M12.415 17.028l-5.997-2.956-2.712-7.604a2 2 0 0 1 3.044-2.3l2.41 1.716.006.016 6.118-3.507a2 2 0 0 1 2.959 1.357l3.272 16.997a2 2 0 0 1-2.076 2.375l-2.73-.152a2 2 0 0 0-2.064 2.428l2.02 9.157a.673.673 0 0 1-.735.813c-.303.172-.682.2-1.023.045l-2.01-.918a2 2 0 0 1-.685-.514L.628 20.53a2 2 0 0 1 2.13-3.21l3.986 1.288 1.386.495 4.369-1.792-.084-.284z" filter="url(#d)"/>
                            <path fill="#FFEC9B" d="M16.909 1.859L12.937.205a2 2 0 0 0-1.747.102L4.742 3.922a2 2 0 0 0 .841 3.74l6.455.443 5.028-2.628a2 2 0 0 0-.157-3.618z"/>
                        </g>
                        <g id="lightning3">
                            <path fill="#F5C501" d="M3.366 45.585L7.34 42.85a2 2 0 0 0 .667-.778l2.95-6.11-5.586-4.235-4.515 11.89a1.671 1.671 0 0 0 2.51 1.97z"/>
                            <path fill="url(#a)" d="M21.222 8.234l7.318-3.245-7.23 30.266a2 2 0 0 1-1.17 1.38l-4.006 1.683a2 2 0 0 1-1.32.08l-.002.004-.03-.013a1.998 1.998 0 0 1-.417-.179l-8.111-3.48-1.782 9.514a2 2 0 0 1-3.965-.342L.204 20.84a2 2 0 0 1 3.381-1.473l4.988 4.764 5.118-19.163a2 2 0 0 1 2.867-1.253l5.03 2.66-.366 1.859z"/>
                            <path fill="url(#a)" d="M21.222 8.234l7.318-3.245-7.23 30.266a2 2 0 0 1-1.17 1.38l-4.006 1.683a2 2 0 0 1-1.32.08l-.002.004-.03-.013a1.998 1.998 0 0 1-.417-.179l-8.111-3.48-1.782 9.514a2 2 0 0 1-3.965-.342L.204 20.84a2 2 0 0 1 3.381-1.473l4.988 4.764 5.118-19.163a2 2 0 0 1 2.867-1.253l5.03 2.66-.366 1.859z" filter="url(#b)"/>
                            <path fill="#FFE46E" d="M1.555 18.776l6.065-2.483a2 2 0 0 1 2.059.332l1.14.977-1.776 8.625-.188 1.268-7.667-5.214a2 2 0 0 1 .367-3.505z"/>
                            <path fill="#FFEC9B" d="M14.859 3.507l5.26-2.96a2 2 0 0 1 1.949-.006l5.372 2.974a2 2 0 0 1 .019 3.489l-5.303 3.01a2 2 0 0 1-1.975 0L14.852 6.99a2 2 0 0 1 .007-3.482z"/>
                        </g>
                        <image id="brain" width="250" height="150" xlinkHref={require('../images/beyin.png')}/>
                        <g id="lightning2">
                            <path fill="#FFE36E" d="M.354 4.643l-.186-.437A1 1 0 0 1 .536 2.98l2.788-1.847a1 1 0 0 1 1.06-.028L7.4 2.884a1 1 0 0 1 .114 1.644L4.486 6.934l-2.37-.712A2.786 2.786 0 0 1 .354 4.643z"/>
                            <path fill="url(#e)" d="M3.907 4.428l.014-.01 2.455-1.493a1 1 0 0 1 1.52.854v13.683l3.04-1.922-1.017 29.698-3.451 1.615-.103-2.702v2.873L3.914 25.705l-2.9 3.869L.07 3.878a1 1 0 0 1 1.527-.886l2.31 1.436z"/>
                            <path fill="url(#e)" d="M3.907 4.428l.014-.01 2.455-1.493a1 1 0 0 1 1.52.854v13.683l3.04-1.922-1.017 29.698-3.451 1.615-.103-2.702v2.873L3.914 25.705l-2.9 3.869L.07 3.878a1 1 0 0 1 1.527-.886l2.31 1.436z" filter="url(#f)"/>
                        </g>
                    </g>
                </svg>
                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </section>);
        }
        else{
            return (
                <section className="intro">
                    <Elevation z="7">
                            <div className="login">
                                <img alt="memorizer" src={brainIMG}/>
                                <h2>MEMORIZER</h2>
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
}

export default Login