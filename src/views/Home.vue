<template>
  <v-card class="d-flex mb-6">
    <Appbar />
    <v-flex x12>
      <v-img :src="require('../assets/logo.png')" height="200" contain></v-img>
    </v-flex>
  </v-card>
</template>

<script>
import Appbar from '@/components/Appbar'

export default {
  components: { Appbar },
  data () {
    return {
    }
  }
}
</script>
