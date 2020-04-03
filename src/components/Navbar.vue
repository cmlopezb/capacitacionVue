<template>
  <nav>
      <v-app-bar flat app>
          <v-app-bar-nav-icon class="indigo--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title class="text-uppercase black--text">
            <span class="font-weight-light">Capacitacion</span>
            <span>Vue</span>
          </v-toolbar-title>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" app class="grey">
        <v-list v-for="link in links" :key="link.text">
            <v-list-tile>
              <v-list-tile-action>
                <v-icon class="indigo--text">{{ link.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <router-link :to="link.route" class="white--text"> {{ link.text }} </router-link>
              </v-list-tile-content>
            </v-list-tile>
        </v-list>
      </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      links: [
        { icon: 'mdi-home', text: 'Home', route: '/' },
        { icon: 'mdi-information', text: 'Informacion', route: '/information' }
      ]
    }
  }
}
</script>
