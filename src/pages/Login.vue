<template>
<div class="grid">
  <div class="blue a"></div>
  <div class="blue b"></div>
  <div class="green a"></div>
  <div class="green b"></div>
  <div class="yellow a"></div>
  <div class="yellow b"></div>
  <div class="red a"></div>
  <div class="red b"></div>
  <div class="container">
    <div class="row">
      <button @click="login" class="button-login">Login</button>
    </div>
  </div>
</div>
</template>

<script>
import auth from 'firebase/auth'
import database from 'firebase/database'
export default {
  name: 'login',

  data() {
    return {
      errors: [],
      loading: false,
      usersRef: firebase.database().ref('users')
    }
  },

 computed: {
   hasErrors() {
     return this.errors.length > 0
   }
 },


  methods: {
    login(){
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {

        this.saveUserToUsersRef(response.user)

        this.$store.dispatch('setUser', response.user)
        console.log('response.user', response.user);

        this.$router.push('/')
        // this.$router.push({ name: 'chat', query: { redirect: '/' } });
      })
    },

      saveUserToUsersRef(user) {
          return this.usersRef.child(user.uid).set({
            name: user.displayName,
            image: user.photoURL
          })
      }
    }
  }

</script>

<style>

.button-login {
  background-color: #4a154b;
  border: 2px solid #ffffff;
  border-radius: 16px;
  color: #140202;
  font-size: 24px;
  position: fixed;
  top: 400px;
  left: 930px;

}


.html,
body {
  height: 100%;
  width: 100%;
  background-color: #f5edf5;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
}

.grid {
  display: grid;
  grid-template-columns: 50px 50px 50px 50px;
  grid-template-rows: 50px 50px 50px 50px;
  grid-gap: 12px;
}

.blue {
  background-color: #36c5f0;
}

.green {
  background-color: #2eb67d;
}

.yellow {
  background-color: #ecb22e;
}

.red {
  background-color: #e01e5a;
}

.b {
  border-radius: 25px;
}

.blue.a {
  grid-column: 2;
  grid-row: 1;
  border-radius: 50% 50% 0 50%;
}

.blue.b {
  grid-column: 1 / 3;
  grid-row: 2;
}

.green.a {
  grid-column: 4;
  grid-row: 2;
  border-radius: 50% 50% 50% 0;
}

.green.b {
  grid-column: 3;
  grid-row: 1 / 3;
}

.yellow.a {
  grid-column: 3;
  grid-row: 4;
  border-radius: 0 50% 50% 50%;
}

.yellow.b {
  grid-column: 3 / 5;
  grid-row: 3;
}

.red.a {
  grid-column: 1;
  grid-row: 3;
  border-radius: 50% 0 50% 50%;
}

.red.b {
  grid-column: 2;
  grid-row: 3 / 5;
}

</style>
