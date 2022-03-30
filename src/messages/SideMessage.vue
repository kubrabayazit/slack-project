<template>
  <div>
    <div class="user-message">
      <div v-for="message in messages" v-bind:key="message">
        <div class="media">
          <img :src="message.user.image" height="40" class="image">
          <div class="media-username">
             <a href="#" class="username">{{ message.user.name }}</a>
             <!-- <a href="#">{{ message.user.name }}</a> - {{ message.timestamp }} -->
            <div class="content">{{ message.content }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

   export default {
     name: 'side-message',
     props: ['messages']
   }
</script>

<style scoped>

.image {
  margin-right:90rem;
  border-radius: 10px;
}

.username {
  margin-right:750px;
  position:relative;
  top: -35px;
}

.content {
  margin-right:810px;
  position:relative;
  top: -25px;
}
</style>
