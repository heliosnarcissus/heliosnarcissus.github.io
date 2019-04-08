<template>
    <div class="login">
         <img src="../assets/logo.png" alt="Vue logo"> 
        <h3>Sign In</h3>
        <input type="text" v-model="email" placeholder="Email"><br>
        <input type="password" v-model="password" placeholder="Password"><br><br>
        <button @click="login" >Log In with Email</button><br>
        <button @click="signInWithGoogle" >Log In with GOOGLE </button><br>
        <button @click="signInWithFacebook" >Log In with FACEBOOK </button><br>
        <button @click="signInWithTwitter" >Log In with TWITTER </button><br>
        <button @click="signInWithGithub" >Log In with GITHUB </button><br>
       
        <p> You don't have an account? You can <router-link to="/new">Sign Up</router-link></p><br>

        <form id="form1" >
            <input type="text" id="verification code" placeholder="enter verfication code"  > <br>  
        </form>
           <button @click="signInWithPhoneNumber" id='sign-in-button' type="submit" form="form1" >Log In with PhoneNumber </button><br>  
        <div class='recaptcha-container'>   
  	
        </div><br><br>
    </div>
</template>

<script>

import firebase from 'firebase/app';

export default {
    name: 'login',
    data(){
        return{
          email: '',
          password: ''
        }   
    },
    methods: {
        login: function(){

                   firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                     (user)=>{            
                        this.$router.replace('home');
                    },
                    (err)=>{
                        alert('Oops. ' + err.message)
                    }
            ); 
        } ,    
        signInWithGoogle: function(){
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then((result)=> {
                console.log('signInWithGoogle success!');
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                // ...
                console.log(user)
                this.$router.replace('home');       
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                alert('ERROR: ' + errorMessage)
            });
        },
         signInWithFacebook: function(){ 
                console.log('facebook login success')
                var provider = new firebase.auth.FacebookAuthProvider();
                firebase.auth().signInWithPopup(provider).then((result)=> {
                    var token = result.credential.accessToken; 
                    var user = result.user;      
                    this.$router.replace('home');  
                }).catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;        
                    var email = error.email;           
                    var credential = error.credential;
                     alert('ERROR ' + errorMessage);
                });
         },
         signInWithTwitter: function(){
            console.log('Twitter login success')
            var provider = new firebase.auth.TwitterAuthProvider();
                    firebase.auth().signInWithPopup(provider).then((result)=> {
                    var token = result.credential.accessToken; 
                    var user = result.user;      
                    this.$router.replace('home');  
            }).catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;        
                    var email = error.email;           
                    var credential = error.credential;
                     alert('ERROR ' + errorMessage);
            });
        },
         signInWithGithub: function(){
                    console.log('Github login success')
                    var provider = new firebase.auth.GithubAuthProvider();
                    firebase.auth().signInWithPopup(provider).then((result)=> {
                    var token = result.credential.accessToken; 
                    var user = result.user;      
                    this.$router.replace('home');  
            }).catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;        
                    var email = error.email;           
                    var credential = error.credential;
                     alert('ERROR ' + errorMessage);
            });
        },
          signInWithPhoneNumber: function(){
                 window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
                    'size': 'invisible',
                    'callback': function(response) {
                        // reCAPTCHA solved, allow signInWithPhoneNumber.
                        onSignInSubmit();
                        this.$router.replace('home');  
                        console.log('Sign in With Phone Number')
                          var phoneNumber = getPhoneNumberFromUserInput();
                        var appVerifier = window.recaptchaVerifier;
                        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
                            .then(function (confirmationResult) {
                            // SMS sent. Prompt user to type the code from the message, then sign the
                            // user in with confirmationResult.confirm(code).
                            window.confirmationResult = confirmationResult;
                        }).catch(function (error) {
                            // Error; SMS not sent
                            // ...
                        });
                    }
                }); 
              /*  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
                'size': 'normal',
                'callback': function(response) {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                     this.$router.replace('home');  
                      console.log('Sign in With Phone Number')

                },
                'expired-callback': function() {
                    // Response expired. Ask user to solve reCAPTCHA again.
                    // ...
                }
                }); */
         },
         onSignInSubmit: function(){
                var phoneNumber = getPhoneNumberFromUserInput();
                var appVerifier = window.recaptchaVerifier;
                firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
                    .then(function (confirmationResult) {
                    // SMS sent. Prompt user to type the code from the message, then sign the
                    // user in with confirmationResult.confirm(code).
                    window.confirmationResult = confirmationResult;
                }).catch(function (error) {
                    // Error; SMS not sent
                    // ...
                });
         }
    }
}
</script>

<style scoped>
    .login{
        margin-top: 40px;
    }

    input {
        margin: 10px 0;
        width: 20%;
        padding: 15px;
    }

    button{
        margin-top: 20px;
        width: 10%;
        cursor: pointer;
    }

    p{
        margin-top: 40px;
        font-size: 13px;
    }
    p a{
        text-decoration: underline;
        cursor: pointer;
    }

</style>

