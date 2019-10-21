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
            <h2 class="category font-weight-medium mb-3">aaa</h2>
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
              to="{ name : 'post-id-edit', params:{ id:$route.params.id }}"
              nuxt
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
        json_data: []
      }
    },
    async asyncData (context) {
      let { data } = await axios.get('http://localhost:8080/api/v1/posts/' + context.params.id )
      return {
        json_data: data
      }
    }
  }
</script>