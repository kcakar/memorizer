import * as firebase from "firebase";

class  Authentication{
    bindFirebaseEvent(){
        firebase.auth().onAuthStateChanged(function(user, error) {
            if (user) {
                this.authHandler(null, { user });
            }
            else{
                this.props.cancelLoading();
            }
          });
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
            //var token = result.credential.accessToken;
            // The signed-in user info.
            //var user = result.user;
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            //var errorCode = error.code;
            //var errorMessage = error.message;
            // The email of the user's account used.
            //var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            //var credential = error.credential;
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
}

export default new Authentication();