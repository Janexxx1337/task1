<template>
  <div style="max-width: 1400px; margin: auto;">
    <a-input-search placeholder="Поиск по имени" :value="searchQuery" @input="searchQuery = $event.target.value" />

    <a-table bordered size="small" :columns="columns" :dataSource="filteredData" :pagination="pagination"
             @change="handleTableChange">
      <template #actions="{ text, record, index }">
        <button @click="editRow(index)">✏️</button>
        <button @click="deleteRow(index)">🗑️</button>
        <button @click="warnRow(index)">⚠️</button>
      </template>
    </a-table>
  </div>
</template>
<script>
import moment from 'moment';
import 'moment-timezone';

export default {
  data() {
    return {
      users: Array.from({length: 25}, (_, i) => ({
        id: i + 1,
        name: `Пользователь ${i + 1}`,
        age: Math.floor(Math.random() * 50) + 18,
        last_login: moment(new Date(Date.now() - Math.floor(Math.random() * 10000000000))).format('YYYY-MM-DD HH:mm:ss')
      })),
      searchQuery: '',
      filteredData: [],
      pagination: {
        current: 1,
        pageSize: 5,
        total: 0
      },
      columns: [
        {
          title: "ID",
          dataIndex: "id",
          key: "id"
        },
        {
          title: "Имя",
          dataIndex: "name",
          key: "name",
          filters: Array.from({length: 25}, (_, i) => ({
            text: `Пользователь ${i + 1}`,
            value: `Пользователь ${i + 1}`
          })),
          onFilter: (value, record) => record.name.indexOf(value) === 0
        },
        {
          title: "Возраст",
          dataIndex: "age",
          key: "age",
          sorter: (a, b) => a.age - b.age
        },
        {
          title: "Последний вход",
          dataIndex: "last_login",
          key: "last_login"
        },
        {
          title: 'Действия',
          key: 'actions',
          slots: { customRender: 'actions' }
        }
      ]
    };
  },
  watch: {
    searchQuery(newQuery) {
      this.filterByName(newQuery);  // <-- Изменение здесь
    }
  },
  methods: {
    filterByName(query) {
      query = query.toLowerCase();
      this.filteredData = this.users.filter(user => user.name.toLowerCase().includes(query));
    },

    inputChanged(event) {
      console.log("Input changed:", event.target.value);
    },
    generalSearch(query) {
      console.log("General search called with query:", query);
      query = query.toLowerCase();
      this.filteredData = this.users.filter(user => {
        return Object.values(user).some(value =>
            value.toString().toLowerCase().includes(query)
        );
      });
      this.pagination.total = this.filteredData.length;
    },
    handleTableChange(pagination) {
      this.pagination = pagination;
    },
    deleteRow(index) {
      this.users.splice(index, 1);
      this.filteredData = [...this.users];
    },
    warnRow(index) {
      // логика предупреждения
    },
    editRow(index) {
      // логика редактирования
    }
  },
  created() {
    this.filteredData = this.users;
    this.pagination.total = this.users.length;
  }
};
</script>
