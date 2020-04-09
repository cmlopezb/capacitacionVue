<template>
  <nav>
      <v-app-bar flat app>
          <v-app-bar-nav-icon class="indigo--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title class="text-uppercase black--text">
            <span class="font-weight-light">Capacitacion</span>
            <span>Vue</span>
            <v-btn color="error" @click="logout">Cerrar Sesion</v-btn>
          </v-toolbar-title>

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
            <v-list-item
              v-for="option in options"
              :key="option.index"
              @click="updateSelected(option,index)"
            >
              <v-list-item-content>
                {{ option.text }}
              </v-list-item-content>
              <v-list-item-action>
                <v-icon class="indigo--text">{{ option.icon }}</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" app class="grey">
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
      </v-navigation-drawer>
  </nav>
</template>

<script>
import { Auth } from 'aws-amplify'

export default {
  data () {
    return {
      drawer: false,
      links: [
        { icon: 'mdi-home', text: 'Dashboard', route: '/dashboard' },
        { icon: 'mdi-information', text: 'Informacion', route: '/information' }
      ],
      options: [
        { icon: 'mdi-account', text: 'logout' }
      ],
      selectedOption: {}
    }
  },
  method: {
    logout () {
      Auth.signOut()
        .then(data => {
          this.$router.push({ path: '/' })
        })
        .catch(err => console.log(err))
    },
    updateSelected (selectedItem) {
      this.selectedOption = selectedItem
      this.logout()
    }
  }
}
</script>
