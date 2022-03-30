import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase/app'
import store from './store'

// Vue.component('modal', require('./sidebar/Channels.vue'));

Vue.config.productionTip = false



  var firebaseConfig = {
    apiKey: "AIzaSyCJwSia2w94C0a5VrxppUFfwnXwrxEO8Gw",
    authDomain: "slack-chat-99187.firebaseapp.com",
    projectId: "slack-chat-99187",
    storageBucket: "slack-chat-99187.appspot.com",
    messagingSenderId: "901993644425",
    appId: "1:901993644425:web:428598a90a6864396a2158",
    measurementId: "G-6LX3TSWN22"
  };

  firebase.initializeApp(firebaseConfig);

  window.firebase = firebase;

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  // data: {
  //   showModal: false
  // }
})
