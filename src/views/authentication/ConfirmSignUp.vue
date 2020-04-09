<template>
  <v-app>
    <v-card width="400" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">Confirmar Registro</h1>
        <v-progress-linear v-if="apiRequest"
        indeterminate
        color="grey"
        ></v-progress-linear>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="email" label="email" prepend-icon="mdi-email" />
          <v-text-field v-model="confirmCode" label="Codigo confirmacion" prepend-icon="mdi-account"/>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="error" :to="'/'">Cancelar</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="confirmSignup">Enviar</v-btn>
      </v-card-actions>
    </v-card>
    <p class="mx-auto mt-5">Perdio el codigo? <a href="#">Reenviar condigo</a></p>
  </v-app>
</template>

<script>
import { Auth } from 'aws-amplify'
import { AmplifyEventBus } from 'aws-amplify-vue'
// @ is an alias to /src

export default {
  name: 'Login',
  components: {
  },
  data: () => ({
    showPassword: false,
    /* email: this.$router.query.email, */ /* Asi se recibe el valor de la otra pag */
    email: '',
    confirmCode: '',
    apiRequest: false,
    singedIn: false
  }),
  mounted () {
    this.isUserSingedIn()
    AmplifyEventBus.$on('authState', info => {
      if (info === 'signedIn') {
        this.isUserSingedIn()
      } else {
        this.singedIn = false
      }
    })
  },
  /* Metodo para saber si el usuario esta logeado */
  methods: {
    async isUserSingedIn () {
      try {
        const userObj = await Auth.currentAuthenticatedUser()
        this.singedIn = true
        console.log(userObj)
      } catch (error) {
        this.singedIn = false
        console.log(error)
      }
    },
    async confirmSignup () {
      this.apiRequest = true
      Auth.confirmSignUp(this.email, this.confirmCode, {
        forceAliasCreation: true
      }).then(data => {
        console.log(data)
        this.apiRequest = false
        this.$router.push({ path: '/login' })
      })
        .catch(err => console.log(err))
    }
  }
}
</script>
