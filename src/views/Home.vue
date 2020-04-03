<template>
  <div class="Home">
    <h1>Linea de comentarios</h1>
    <v-timeline >
      <v-timeline-item
        v-for="comentarios in coments" :key="comentarios.id"
      >
      <h1>Linea de comentarios</h1>
        <template v-slot:opposite>
          <span>Correo: {{ comentarios.email }}</span>
        </template>
        <v-card class="elevation-2">
          <v-card-title class="headline">Nombre: {{ comentarios.name }}</v-card-title>
          <v-card-text>Comentario: {{ comentarios.body }}</v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      coments: null
    }
  },
  mounted () {
    this.getComents()
  },
  methods: {
    getComents () {
      axios.get('https://jsonplaceholder.typicode.com/comments').then(response => {
        this.coments = response.data
        console.log(response)
      }).catch(e => console.log(e))
    }
  }
}
</script>
