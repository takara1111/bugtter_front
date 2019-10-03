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
                    label="バグの内容・エラーメッセージ"
                    class="purple-input"
                    rows="3"/>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    class="purple-input"
                    label="解決方法"
                    value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  />
                </v-flex>
                <v-flex
                  xs12
                  text-xs-right
                >
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="success"
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
