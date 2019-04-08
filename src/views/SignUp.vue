<template>
    <div class="signup">
        <h3>Let's create a new account !</h3>
        <input type="text" v-model="email" placeholder="Email"><br>
        <input type="password" v-model="password" placeholder="Password">
         <input type="checkbox">
         <p>I am not a robot.</p>
        <button @click="signUp">Create Account</button>
        <span>or go back to the <router-link  to="/login">login page.</router-link> </span>
    </div>
</template>


<script>

import firebase from 'firebase/app';
/* eslint-disable */
export default {
    name: 'login',
    data(){
        return{
          email: '',
          password: ''
        };
    },
    methods: {
        signUp: function(){
             firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
               (user)=>{
                   
                     this.$router.replace('login');
                },
               (err)=>{
                    alert('Oops. ' + err.message)
                }
            ); 
                
        }

    }
}
</script>

<style scoped>
    .signup{
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

    span{
        display: block;
        margin-top: 20px;
        font-size: 11px;
    }

</style>

