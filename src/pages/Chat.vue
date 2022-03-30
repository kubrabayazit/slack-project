<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="sidebar">
                  <hr style="border: 1px solid #333;">
                    <sidebar></sidebar>
                </div>
                <div class="content">
                  <messages></messages>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Sidebar from '../sidebar/Sidebar'
import Messages from '../messages/Messages'



    export default {
        name: 'chat',
        components: {Sidebar, Messages}

    }
</script>

<style scoped>
    .sidebar {
        height:100%;/*Tam yükseklik: 'otomatik' yükseklik istiyorsanız bunu kaldırın*/
        width: 160px; /* Kenar çubuğunun genişliğini ayarlama */
        position: fixed; /* Sabit Kenar Çubuğu (kaydırmada, yerinde kal) */
        z-index: 1; /* Üst Katmanda kalmak */
        top: 0; /* En üstten menü oluştur */
        left: 0;/* Soldan menü oluştur */
        background-color: #400d40;
        overflow-x: hidden; /* Yatay kaydırmayı devre dışı bırak */
        padding-top: 20px;
        width: 30%;
    }
    .content {
        width: 66%;
        display: block;
        float: left;
        margin-left: 34%;
    }
</style>
