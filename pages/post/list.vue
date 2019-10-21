<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      justify-center
      wrap
    >
      <v-flex md12>
        <material-card color="green">
          <v-data-table 
            :headers="headers"
            :items="json_data"
            :search="search"
            :server-items-length="totalPosts"
            :loading="loading"
            >
            <template slot="headerCell" slot-scope="{ header }">
              <span
                class="subheading font-weight-light text-success text--darken-3"
                v-text="header.text"
              />
            </template>
            <template slot="items" slot-scope="{ item }">
              <td><nuxt-link v-bind:to="{name:'post-id-show',params:{id:item.id}}">{{ item.error_message }}</nuxt-link></td>
              <td><nuxt-link v-bind:to="{name:'post-id-show',params:{id:item.id}}">{{ item.description }}</nuxt-link></td>
              <td>{{ item.language }}</td>
            </template>
          </v-data-table>
        </material-card>
        <v-pagination
        v-model="pagination.current"
        :length="pages"
        ></v-pagination>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  const axios = require('axios');

  let url = "http://localhost:8080/api/v1/posts"

  export default {
    layout: 'dashboard',
    data: () => ({
      json_data: [],
      headers: [
        {
          sortable: false,
          text: "エラーメッセージ",
          value: "error_message"
        },
        {
          sortable: false,
          text: "解決方法",
          value: "description"
        },
        {
          sortable: true,
          text: "言語",
          value: "language"
        }
      ],
      pagination: {
      },
      totalPosts: 0,
    }),
    computed: {
      pages() {
        if (this.pagination.rows_per_page === null || this.totalPosts === null) {
          return 0;
        }
        return Math.ceil(this.totalPosts / this.pagination.rows_per_page);
      }
    },
    created () {
      axios.get(url).then((res) => {
        
        const items = [];
        // オブジェクトの値を配列として取得
        // `values`は`[ data1のオブジェクト, data2のオブジェクト ]`という配列になっている
        const values = Object.values(res.data) 

        // `forEach()`でひとつずつ処理していく
        values.forEach((value) => {
          const item = {
            id: value.id,
            error_message: value.error_message,
            description: value.description,
            language: value.language
          };

          // `items`の一番後ろに追加
          items.push(item)
        });

        // コンポーネントのデータに代入
        this.json_data = items;
        this.totalPosts = items.length
      });
    }
  }
</script>

<style>

</style>