<template>
  <div class="information">
    <h1>Informacion</h1>
    <div>
      <v-simple-table>
        <template v-slot:default>
          <table>
            <thead>
              <tr>
                <th class="text-left">Id</th>
                <th class="text-left">Nombre</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="todo in todos" :key="todo.id">
                <td>{{ todo.id }}</td>
                <td>{{ todo.title }}</td>
              </tr>
            </tbody>
          </table>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
import api from '@/plugins/api'

export default {
  data () {
    return {
      todos: null
    }
  },
  mounted () {
    this.getTodos()
  },
  methods: {
    async getTodos () {
      const response = await api.get('todos')
      this.todos = response.data
      console.log(response)
    }
  }
}
</script>
