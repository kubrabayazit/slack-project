<template>
  <div>
    <side-message :messages="messages"></side-message>
    <message-form></message-form>
  </div>
</template>

<script>
import SideMessage from './SideMessage'
import MessageForm from './MessageForm'
import database from 'firebase/database'
import {mapGetters} from 'vuex'

   export default {
     name: 'messages',

     components: { SideMessage, MessageForm},

     data(){
       return {
         messagesRef: firebase.database().ref('messages'),
         messages: [],
         channel: ''
       }
     },
     computed: {
       ...mapGetters(['currentChannel'])
     },

      watch: {
          currentChannel: function() {
            this.messages = []
            this.addListeners()
            this.channel = this.currentChannel
          }
        },


     methods: {
       addListeners() {
         this.messagesRef.child(this.currentChannel.id).on('child_added', (snapshot) => {
           this.messages.push(snapshot.val())
         })
       },

       detachListeners() {
            if(this.channel !==null){
              this.messagesRef.child(this.channel.id).off()
        }

       }
     },

     beforeDestroy(){
       this.detachListeners()
     }
   }
</script>
