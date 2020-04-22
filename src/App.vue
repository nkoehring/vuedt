<template>
  <vue-d-t v-model="date" :time="false" lang="de" />
</template>

<script>
import VueDT from './VueDT.vue'

export default {
  components: { VueDT },
  data () {
    return {
      date: new Date()
    }
  }
}
</script>
