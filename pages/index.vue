<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <material-card
            color="success"
            elevation="12"
            title="ログイン"
          >
            <v-card-text>
              <v-form>
                <v-text-field type="text" v-model="email" prepend-icon="person" name="email" label="Login" :placeholder="defaultUserPassword"></v-text-field>
                <v-text-field type="password" v-model="password" prepend-icon="lock" name="password" label="Password" :placeholder="defaultUserPassword"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-layout justify-center align-center>
                <v-btn color="success" @click.prevent="authenticate">Login</v-btn>
              </v-layout>
            </v-card-actions>
            <v-layout justify-center align-center>
              <v-btn
                color="success"
                class="font-weight-light"
                v-on:click="loginAsTestuser"
              >テストユーザーでログイン</v-btn>
            </v-layout>

          </material-card>
                      <nuxt-link to="/sign-up">新規登録はこちら</nuxt-link>

        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  import { mapActions } from 'vuex'
  import materialCard  from '~/components/material/AppCard'

  const axios = require('axios');

  // 環境変数からAPIのURLを読み込み
  const URL = process.env.API_URL;

  export default {
    components: {
      materialCard
    },
    data() {
      return {
        email: '',
        password: '',
        defaultUserPassword: ''
      }
    },
    methods: {
      ...mapActions({
        setUsername: 'user/setUsername',
        setUserid: 'user/setUserid'
      }),
      
      // ログイン認証
      authenticate: function() {
        axios.post('http://' + URL + '/api/v1/users/sign_in', {
          email: this.email,
          password: this.password,
        })
        .then(function (response) {
          console.log(response);
          this.setUserid(response.data.id);
          this.$router.push({ path: 'dashboard' });
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        }.bind(this));
      },
      // テストユーザーでログイン
      loginAsTestuser: function() {
        axios.post('http://' + URL + '/api/v1/users/sign_in', {
          email: "test@test.com",
          password: "test1234"
        })
        .then(function (response) {
          console.log(response);
          this.setUserid(response.data.id);
          this.$router.push({ path: 'dashboard' });
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });
      }
    }
  }
</script>
