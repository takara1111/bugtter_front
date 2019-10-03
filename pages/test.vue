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
        <material-card color="green" title="解決したバグ" text="Here is a subtitle for this table">
          <v-data-table :headers="test" :items="json_data" hide-actions>
            <template slot="headerCell" slot-scope="{ header }">
              <span
                class="subheading font-weight-light text-success text--darken-3"
                v-text="header.text"
              />
            </template>
            <template slot="items" slot-scope="{ item }">
              <td>{{ item.id }}</td>
              <td>{{ item.user_id }}</td>
              <td>{{ item.city }}</td>
              <td class="text-xs-right">{{ item.salary }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  const axios = require('axios');

  let url = "http://jsonplaceholder.typicode.com/posts/"

  export default {
    layout: 'dashboard',
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
            title: value.title
          };

          // `items`の一番後ろに追加
          items.push(item)
        });

        // コンポーネントのデータに代入
        this.json_data = items;
      });
    },
    data: () => ({
      json_data: [],
      test: [
        {
          sortable: false,
          text: "あああ",
          value: "name"
        },
        {
          sortable: false,
          text: "ううう",
          value: "name"
        },
      ],
      headers: [
        {
          sortable: false,
          text: "Name",
          value: "name"
        },
        {
          sortable: false,
          text: "Country",
          value: "country"
        },
        {
          sortable: false,
          text: "City",
          value: "city"
        },
        {
          sortable: false,
          text: "Salary",
          value: "salary",
          align: "right"
        }
      ]
    })
  }
</script>

<style>

</style>