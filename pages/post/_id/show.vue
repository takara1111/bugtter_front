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
          <v-avatar
            slot="offset"
            class="mx-auto d-block"
            size="130"
          >
            <img
              src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
            >
          </v-avatar>
          <v-card-text class="text-xs-center">
            <h2 class="category text-gray font-weight-thin mb-3">aaa</h2>
            <h4 class="card-title font-weight-light">{{ json_data.description }}</h4>
            <v-btn
              color="success"
              round
              class="font-weight-light"
            >Follow</v-btn>
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