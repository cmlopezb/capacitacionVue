<template>
  <v-app>
    <v-card width="400" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">Cambiar Contraseña</h1>
        <v-progress-linear v-if="apiRequest"
        indeterminate
        color="grey"
        ></v-progress-linear>
      </v-card-title>
      <v-card-text>
        <v-form>
            <p>Ingrese nuevamente su correo</p>
          <v-text-field :label="email" prepend-icon="mdi-email" />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="error" :to="'/'">Cancelar</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="changePassword">Enviar</v-btn>
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
    email: '',
    apiRequest: false,
    singedIn: false
  }),
  methods: {
    async changePassword () {
      this.apiRequest = true
      Auth.forgotPassword({email: this.email})
      .then(data => console.log(data))
      .catch(err => console.log(err))
      this.apiRequest = false
      this.$router.push({ path: '/login' })
    }
  }
}
</script>
