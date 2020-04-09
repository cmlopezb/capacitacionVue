<template>
  <v-card class="d-flex mb-6">
    <v-app-bar
        color="deep-blue"
        dense
        app
        dark
    >
      <v-toolbar-title>Bienvenido a Capacitacion</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu
      left
      bottom
      >
      <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
      </template>

      <v-list>
          <v-list-item :to="link.route" v-for="link in links" :key="link.text">
          <v-list-item-action>
              <v-icon class="indigo--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
              {{ link.text }}
          </v-list-item-content>
          </v-list-item>
      </v-list>
      </v-menu>
    </v-app-bar>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      links: [
        { icon: 'mdi-account', text: 'Login', route: '/login' },
        { icon: 'mdi-information', text: 'Registrarse', route: '/singup' }
      ]
    }
  }
}
</script>
