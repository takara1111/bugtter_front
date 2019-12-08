<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        xs12
        md8
      >
        <material-notification
          class="mb-3"
          color="info"
          v-if="$store.state.flush_message.text"
        >
        {{ $store.state.flush_message.text }}
        </material-notification>
        <material-card class="v-card-profile">
          <v-card-text class="text-xs-center">
            <h2 class="category font-weight-medium mb-3">{{ json_data.error_message }}</h2>
            <h4 class="card-title font-weight-light">{{ json_data.description }}</h4>
            <v-btn
              color="success"
              round
              class="font-weight-light"
              v-bind:to="{ name : 'post-id-edit', params:{ id:$route.params.id }}"
              nuxt
            >編集する</v-btn>
            <v-btn
              color="danger"
              round
              class="font-weight-light"
              v-on:click="destroy"
            >削除する</v-btn>
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  import materialCard from '~/components/material/AppCard'
  import materialNotification from '~/components/material/AppNotification'
  
  const axios = require('axios');
  
  // 環境変数からAPIのURLを読み込み
  const URL = process.env.API_URL;

  export default {
    layout: 'dashboard',
    middleware: 'authentication',
    components: {
      materialCard,
      materialNotification
    },
    data() {
      return {
        json_data: [],
        success: true
      }
    },
    methods:{
      // 投稿を削除する
      destroy: function() {
        axios.delete('http://' + URL + '/api/v1/posts/' + this.postid , {
        })
        .then(function (response) {
          console.log(response);
          this.$router.push({ path: '/post/list' });
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });
      },
    },
    async asyncData (context) {
      let { data } = await axios.get('http://' + URL + '/api/v1/posts/' + context.params.id )
      return {
        json_data: data,
        postid: context.params.id // クエリパラメータを取得し保持させる
      }
    }
  }
</script>