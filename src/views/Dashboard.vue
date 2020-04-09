<template>
  <div class="Dashboard">
    <Navbar />
    <h1>Linea de comentarios</h1>
    <v-btn @click="logout">Cerrar Sesion</v-btn>
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
import api from '@/plugins/api'
import { Auth } from 'aws-amplify'
import Navbar from '@/components/Navbar'

export default {
  components: { Navbar },
  data () {
    return {
      coments: null
    }
  },
  mounted () {
    this.getComents()
  },
  methods: {
    async getComents () {
      const { data } = await api.get('comments')

      this.coments = data
      console.log(data)
    },
    logout () {
      Auth.signOut()
      .then(data => {
        this.$router.push({ path: '/' })
      })
      .catch(err => console.log(err))
    }
  }
}
</script>
