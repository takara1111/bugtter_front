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
        <material-card
          color="green"
          title="バグを投稿する"
          text="Complete this form"
        >
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex
                  xs12
                  md12
                >
                  <v-textarea
                    v-model="error_message"
                    label="バグの内容・エラーメッセージ"
                    class="purple-input"
                    rows="3"/>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    v-model="description"
                    class="purple-input"
                    label="解決方法"
                    value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  />
                </v-flex>
                <v-select
                  v-model="language"
                  :items="languages"
                  label="言語を選択"
                  item-text
                  solo
                ></v-select>
                <v-flex
                  xs12
                  text-xs-right
                >
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="success"
                    v-on:click="submit"
                  >
                    メモする
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import materialCard from '~/components/material/AppCard'

  const axios = require('axios');

  export default {
    layout: 'dashboard',
    components: {
      materialCard
    },
    data() {
      return {
        error_message:"",
        description: "",
        language: [],
        languages: ['HTML', 'CSS', 'JavaScript', 'Ruby', 'PHP', 'Python', 'Java', 'Others']
      }
    },
    methods: {
      ...mapActions({
        showFlashMessage: 'flush_message/showFlashMessage',
      }),
      // 投稿内容を送信する
      submit: function() {
        axios.post('http://localhost:8080/api/v1/posts', {
          error_message: this.error_message,
          description: this.description,
          language: this.language,
          user_id: this.$store.state.user.userid
        })
        .then(function (response) {
          console.log(response);
          this.showFlashMessage({text: "投稿しました"}) //フラッシュメッセージをセット
          this.$router.push({name:'post-id-show', params:{ id:response.data.post.id }});
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });
      }
    },
    computed: {
      ...mapGetters({
        user: 'user/getUser',
        fullname: 'user/getFullname',
      })
    }
  }
</script>
