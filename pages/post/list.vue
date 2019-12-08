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
              hide-actions
              :rows-per-page-items="perPageItems"
              :pagination.sync="pagination"
              class="elevation-1"
            >
            <template slot="headerCell" slot-scope="{ header }">
              <span
                class="subheading font-weight-light text--darken-3"
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
        v-model="pagination.page"
        :length="5"
        ></v-pagination>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  const axios = require('axios');

  // 環境変数からAPIのURLを読み込み
  const URL = process.env.API_URL;

  export default {
    layout: 'dashboard',
    middleware: 'clearNotification',
    middleware: 'authentication',

    data: () => ({
      title: 'メモ一覧',
      search: '',
      pagination: {},
      selected: [],
      json_data: [], // axiosで取得した値を格納
      perPageItems:[10,25,{"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}], // ページネーション用の設定
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
      axios.get('http://' + URL + '/api/v1/posts').then((res) => {
        
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
        this.totalPosts = items.length;

      });
    }
  }
</script>

<style>

</style>