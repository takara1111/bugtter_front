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
        <material-card class="v-card-profile">
          <v-card-text class="text-xs-center">
            <v-flex xs12>
              <v-textarea
                v-model="json_data.error_message"
                label="バグの内容・エラーメッセージ"
                class="purple-input"
                rows="3"
                />
            </v-flex>
            <v-flex xs12>
              <v-textarea
                v-model="json_data.description"
                class="purple-input"
                label="解決方法"
              />
            </v-flex>
            <v-btn
              color="success"
              round
              class="font-weight-light"
              v-on:click="submit"
            >送信する</v-btn>
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import materialCard from '~/components/material/AppCard'
  
  const axios = require('axios');
  let url = "http://localhost:8080/api/v1/posts"
  // let id = this.nuxt.route.params.id

  export default {
    layout: 'dashboard',
    components: {
      materialCard
    },
    data() {
      return {
        json_data: [],
        postid: 0
      }
    },
    methods: {
      ...mapActions({
        showFlashMessage: 'flush_message/showFlashMessage',
      }),
      submit: function() {
        axios.patch('http://localhost:8080/api/v1/posts/' + this.postid , {
          error_message: this.json_data.error_message,
          description: this.json_data.description,
          language: this.json_data.language,
          user_id: this.$store.state.user.userid
        })
        .then(function (response) {
          console.log(response);
          this.showFlashMessage({text: "編集に成功しました"}) // フラッシュメッセージをセット
          this.$router.push({ path: 'show' });
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });
      }
    },
    async asyncData (context) {
      let { data } = await axios.get('http://localhost:8080/api/v1/posts/' + context.params.id )
      return {
        json_data: data,
        postid: context.params.id // クエリパラメータを取得し保持させる
      }
    }
  }
</script>