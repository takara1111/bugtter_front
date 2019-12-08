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
        md4
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
            <h6 class="category text-gray font-weight-thin mb-3">{{ user.function }}</h6>
            <h4 class="card-title font-weight-light">あなた</h4>
            <p class="card-description font-weight-light">あなたなのです</p>
            <blockquote class="blockquote">{{ user.citation }}</blockquote>
            <v-btn
              color="success"
              round
              class="font-weight-light"
              to="/post/new"
              nuxt
            >メモする</v-btn>
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  import materialCard from '~/components/material/AppCard'

  export default {
    layout: 'dashboard',
    components: {
      materialCard
    },
    computed: {
      ...mapGetters({
        user: 'user/getUser',
        fullname: 'user/getFullname',
      })
    }
  }
</script>
