import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import firebase from 'firebase';
import 'firebase/firestore'

Vue.config.productionTip = false

let app = '';
/*
firebase.initializeApp({

  apiKey: "AIzaSyDhgjfbGPemF1wB3B9yD75A9K7djJ_mIcY",
  authDomain: "whatsthefood-c885a.firebaseapp.com",
  databaseURL: "https://whatsthefood-c885a.firebaseio.com",
  projectId: "whatsthefood-c885a",
  storageBucket: "whatsthefood-c885a.appspot.com",
  messagingSenderId: "316755566220"
  
}); */

firebase.auth().onAuthStateChanged(() =>{

  if(!app){
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
});

