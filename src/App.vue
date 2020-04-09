<template>
  <v-app>
   <!--  <v-content v-if="singedIn">
      <Navbar />
    </v-content> -->
    <v-content>
      <v-container>
       <!--  {{ singedIn }} -->
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
/* import Navbar from '@/components/Navbar' */
import { Auth } from 'aws-amplify'
import { AmplifyEventBus } from 'aws-amplify-vue'

export default {
  name: 'App',
  components: {/*  Navbar  */},
  data: () => ({
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
    }
  }
}
</script>
