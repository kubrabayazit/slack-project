<template>
  <div>
    <h3 style="display: flex; color: white;">Channels</h3>
    <div>
      <a v-for="channel in channels" :key="channel.id" class="list-channels" type="button" :class="{'active': setActiveChannel(channel)}" @click="changeChannel(channel)"># {{ channel.name }}</a>
    </div>
    <transition name="modal">
      <div v-if="isOpen">
        <div class="overlay" @click.self="isOpen = false;">
          <div class="modal">
            <h1>Create a channel</h1>
            <form>
              <div>
                <input v-model="new_channel" type="text" id="new_channel" name="new_channel" placeholder="channel name" class="input-form">
              </div>
              <div class="modal-footer">
              <button type="button" class="cancel">Cancel</button>
              <button @click="addChannel" type="button" class="add-channel">Add Channel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
    <button @click="isOpen = !isOpen;">
      {{ isOpen ? "Close" : "Add" }} channel
    </button>
  </div>
</template>

<script>
import database from 'firebase/database'
import {mapGetters} from 'vuex'

export default {
  name:'channels',

  data: function() {
    return {
      isOpen: false,
      new_channel: '',
      errors: [],
      channelsRef: firebase.database().ref('channels'),
      channels:[],
      channel: null
    };
  },

   computed: {
     ...mapGetters(['currentChannel']),
   hasErrors() {
     return this.errors.length > 0
   }
 },

  methods: {
    addChannel() {

      let key = this.channelsRef.push().key
      console.log('new keyyy', key)

      let newChannel = {id: key, name: this.new_channel}

      this.channelsRef.child(key).update(newChannel)
      .then(() => {
        this.new_channel = ''
        $("#channelModal").modal('hide')
      })

      .catch(() => {
        this.errors.push(console.error.message)
      })
    },

    addListeners() {
       this.channelsRef.on('child_added', snapshot => {
          //console.log('child_added_test', snapshot.val())
          this.channels.push(snapshot.val())

          if(this.channels.length > 0) {
            this.channel = this.channels[0]

            this.$store.dispatch("setCurrentChannel", this.channel)
          }
       })
    },
    setActiveChannel(channel){
          return channel.id === this.currentChannel.id
    },

    changeChannel(channel){
          this.$store.dispatch('setCurrentChannel', channel)
    },

    detachListeners() {
          this.channelsRef.off()
    }
    },

    mounted() {
      this.addListeners()

    },

    beforeDestroy() {
      this.detachListeners()
    }
  }

</script>

<style scoped>
.modal {
  width: 400px;
  height: 200px;
  margin: 0px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px 3px;
  transition: all 0.2s ease-in;
  font-family: Helvetica, Arial, sans-serif;
}
.fadeIn-enter {
  opacity: 0;
}

.fadeIn-leave-active {
  opacity: 0;
  transition: all 0.2s step-end;
}

.fadeIn-enter .modal,
.fadeIn-leave-active.modal {
  transform: scale(1.1);
}
button {
  padding: 7px;
  margin-top: 10px;
  background-color: white;
  color: #4a154b;
  font-size: 1.1rem;
  border-radius: 10px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #00000094;
  z-index: 999;
  transition: opacity 0.2s ease;
}

.modal-footer {
  padding: 7px;
  background-color: white;
  color: #4a154b;
  font-size: 1.1rem;
  border-radius: 10px;
}

.input-form {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}

.list-channels {
  display:flex;
	flex-direction:row-reverse;
  flex-wrap:wrap;
  padding: 5px;
  color: white;
}
</style>
