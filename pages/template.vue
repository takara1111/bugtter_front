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
    }
  }
</script>
