<template>
  <div>
    <div class="message-form">
      <form>
        <div class="input">
          <input v-model.trim="message" type="text" name="message" id="message" placeholder="Typing" class="form-control" autofocus>
         <div class="input-group">
        <button @click="sendMessage" class="input-group__button button-send" type="button">Send</button>
        <!-- <button class="input-group__button button-upload" type="button">Upload</button> -->
        </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

   export default {
     name: 'message-form',

     data(){
       return {
         message: '',
         errors: []
       }
     },

     computed: {
       ...mapGetters(['currentChannel', 'currentUser'])
     },

     methods: {
       sendMessage(){
   //console.log('send')
         let newMessage = {
           content: this.message,
           timestamp: firebase.database.ServerValue.TIMESTAMP,
           user: {
            name: this.currentUser.displayName,
            image: this.currentUser.photoURL,
            id: this.currentUser.uid
           }
         }

         if(this.currentChannel !== null) {
           if(this.message.length > 0) {
             this.$parent.messagesRef.child(this.currentChannel.id).push().set(newMessage)
             .then(() => {

             })
             this.message = ''
           }
         }
       }
     }
   }
</script>
<style scoped>
    .message-form {
        position: fixed;
        left:0;
        bottom:0;
        width: 70%;
        z-index:100;
        color:white;
        text-align:center;
        margin-bottom:10px;
        margin-left:30.3%;
    }
    input, button {
        height:50px;
    }
    .progress {
        margin-bottom: -16px;
    }
    .input-group {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: stretch;
        width: 100%;

    }

   .input-group__button {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 50%;
        border: 3px solid #400d40;
        border-radius: 10px;
        margin: 5px;
        appearance: none;
	      outline: 0;
	      resize: none;
}
    .form-control {
        width: 100%;
        padding: 12px 16px;
        appearance: none;
	      outline: 0;
	      resize: none;
        border: 3px solid #400d40;
        border-radius: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
         border-radius: 10px;
}
</style>
