<template>
  <v-toolbar
    id="core-toolbar"
    flat
    prominent
    style="background: #eee;"
  >
    <div class="v-toolbar-title">
      <v-toolbar-title
        class="tertiary--text font-weight-light"
      >
        <v-btn
          class="default v-btn--simple"
          dark
          icon
          @click.stop="onClickBtn"
        >
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
        {{ title }}
      </v-toolbar-title>
    </div>

    <v-spacer />
    <v-toolbar-items>
      <v-flex
        align-center
        layout
        py-2
      >
        <nuxt-link
          v-ripple
          class="toolbar-items"
          to="/post/list"
          title="メモ一覧"
        >
          <v-icon color="tertiary">mdi-book-open-outline</v-icon>
        </nuxt-link>
        <v-menu
          bottom
          left
          content-class="dropdown-menu"
          offset-y
          transition="slide-y-transition">
          <router-link
            v-ripple
            slot="activator"
            class="toolbar-items"
            to="/notifications"
          >
            <v-badge
              color="error"
              overlap
            >
              <template slot="badge">
                {{ notifications.length }}
              </template>
              <v-icon color="tertiary">mdi-bell</v-icon>
            </v-badge>
          </router-link>
          <v-card>
            <v-list dense>
              <v-list-tile
                v-for="notification in notifications"
                :key="notification"
                @click="onClick"
              >
                <v-list-tile-title
                  v-text="notification"
                />
              </v-list-tile>
            </v-list>
          </v-card>
        </v-menu>
        <!-- <nuxt-link
          v-ripple
          class="toolbar-items"
          to="/user-profile"
          title="User profile"
        >
          <v-icon color="tertiary">mdi-account</v-icon>
        </nuxt-link> -->
        <nuxt-link
          v-ripple
          class="toolbar-items"
          to="/"
          title="Logout"
          @click.native="logout"
        >
          <v-icon color="tertiary">mdi-logout</v-icon>
        </nuxt-link>
      </v-flex>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    data: () => ({
      notifications: [
        
      ],
      title: '',
      responsive: true,
      responsiveInput: true
    }),
    watch: {
      '$route' (val) {
        this.title = val.name
      }
    },
    computed: {
      ...mapGetters({
        drawer: 'app/getDrawer'
      })
    },
    methods: {
      ...mapActions({
        setUsername: 'user/setUsername',
        setUserid: 'user/setUserid',
        setDrawer: 'app/setDrawer'
      }),

      onClickBtn () {
        this.setDrawer(!this.drawer)
      },
      onClick () {
        // Do something
      },
      onResponsiveInverted () {
        if (window.innerWidth < 991) {
          this.responsive = true
          this.responsiveInput = false
        } else {
          this.responsive = false
          this.responsiveInput = true
        }
      },
      async logout() {
        await this.setUserid(null);
        this.$router.push({ path: '/' });
      }
    },
    mounted () {
      this.onResponsiveInverted()
      window.addEventListener('resize', this.onResponsiveInverted)
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.onResponsiveInverted)
    }
  }
</script>

<style>
  #core-toolbar a {
    text-decoration: none;
  }
</style>
