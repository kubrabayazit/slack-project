<template>
    <div>
        <h2 style="color:white" class="text">Gricreative</h2>
        <hr style="border: 1px solid #333;">
        <span>
          <img class="image" height="30" :src="currentUser.photoURL"/>
          <span style="color:white" class="display-name">{{ currentUser.displayName }}</span>
        </span>
        <hr style="border: 1px solid #333;">
        <channels></channels>
    </div>
</template>

<script>
import auth from 'firebase/auth'
import {mapGetters} from 'vuex'
import Channels from './Channels'


     export default {
       name: 'sidebar',

       components: {Channels},

       computed: {
         ...mapGetters(['currentUser'])
       }
     }

</script>
<style scoped>

.image {
  border-radius: 5px;
}
</style>

