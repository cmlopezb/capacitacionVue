<template>
  <v-app>
    <v-card width="400" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">Registrarse</h1>
        <v-progress-linear v-if="apiRequest"
        indeterminate
        color="grey"
        ></v-progress-linear>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="username" label="Usuario" prepend-icon="mdi-account"/>
          <v-text-field :type="showPassword ? 'text' : 'password'" v-model="password" label="Contraseña" prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"/>
          <v-text-field v-model="email" label="Email" prepend-icon="mdi-email"/>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="error">Cancelar</v-btn>
        <v-spacer></v-spacer>
        <!-- <v-btn color="success" @click="singedUpUser">Registrarse</v-btn> -->
        <v-btn color="success" @click="createAccount">Registrarse</v-btn>
      </v-card-actions>
    </v-card>
    <p class="mx-auto mt-5">Ya tiene una cuenta? <a href="login">Iniciar Sesion</a></p>
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
    apiRequest: false,
    singedIn: false,
    username: '',
    email: '',
    password: ''
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
    async createAccount () {
      this.apiRequest = true /* Progress barr */
      Auth.signUp({
        username: this.email, /* se coloco email porq se definio como pk */
        password: this.password,
        attributes: {
          email: this.email,
          name: this.username
        },
        validationData: []// optional
      })
        .then(data => {
          this.apiRequest = false
          console.log(data) /* Asi se pasa la info de una pag a otra */
          this.$router.push({ path: '/confirmsignup', query: { email: this.email } })
        })
        .catch(err => console.log(err))
    }
  }
}
</script>
