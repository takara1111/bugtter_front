<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <material-card
            color="success"
            elevation="12"
            title="新規登録"
          >
            <v-card-text>
              <v-form>
                <v-text-field type="text" v-model="email" prepend-icon="person" name="email" label="email"></v-text-field>
                <v-text-field type="password" v-model="password" prepend-icon="lock" name="password" label="Password"></v-text-field>
                <v-text-field type="password" v-model="password_confirmation" prepend-icon="lock" name="password_confirmation" label="Password(確認)"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-layout justify-center align-center> 
                <v-btn color="success" @click.prevent="authenticate">登録</v-btn>
              </v-layout>
            </v-card-actions>
            <nuxt-link to="/">ログインはこちら</nuxt-link>
          </material-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  import { mapActions } from 'vuex'
  import materialCard  from '~/components/material/AppCard'

  const axios = require('axios');


  export default {
    components: {
      materialCard
    },
    data() {
      return {
        email: '',
        password: '',
        password_confirmation: '',
      }
    },
    
    computed: {
      isDisabled() {
        return this.username !== this.defaultUserPassword || this.password !== this.defaultUserPassword;
      }
    },
    methods: {
      ...mapActions({
        setUsername: 'user/setUsername'
      }),

      registration: function() {
        axios.post('http://localhost:8080/api/v1/users', {
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        })
        .then(function (response) {
          console.log(response);
          this.$router.push({ path: 'dashboard' });
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        }.bind(this));
      },

      async authenticate() {
          // await this.setUsername(this.defaultUserPassword);
          this.$router.push({ path: 'icons' });
      }
    }
  }
</script>
