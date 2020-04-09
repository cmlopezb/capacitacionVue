<template>
  <v-app>
    <v-card width="400" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">Iniciar Sesion</h1>
        <v-progress-linear v-if="apiRequest"
        indeterminate
        color="grey"
        ></v-progress-linear>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="email" label="Email" prepend-icon="mdi-email"/>
          <v-text-field v-model="password" :type="showPassword ? 'text' : 'password'" label="Contraseña" prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"/>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="error" :to="'/'">Cancelar</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="info" @click="loginUser">Iniciar Sesion</v-btn>
      </v-card-actions>
      <p class="ma-5" align="right"><a href="forgotpassword">Olvido contraseña</a></p>
    </v-card>
    <p class="mx-auto mt-5">Quiere registrarse? <a href="singup">Registrarse</a></p>
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
    email: '',
    password: '',
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
    async loginUser () {
      this.apiRequest = true
      Auth.signIn({
        email: this.email, // Required, the username
        password: this.password // Optional, the password
      }).then(user => console.log(user))
        .catch(err => console.log(err))
      this.apiRequest = false
      this.$router.push({ path: '/dashboard' })
    }
  }
}
</script>
