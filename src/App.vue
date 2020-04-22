<template>
  <div>
    <strong>GB</strong> <vue-d-t v-model="date1" locale="en-GB" />
    <strong>DE</strong> <vue-d-t v-model="date2" locale="de-DE" />
    <strong>KR</strong> <vue-d-t v-model="date3" locale="ko-KR" />
    <hr />
    <strong>No Clock</strong> <vue-d-t v-model="date4" :time="false" locale="de-DE" />
    <hr />
    <strong>No Date</strong> <vue-d-t v-model="date5" placeholder="select date" :time="false" locale="de-DE" />
  </div>
</template>

<script>
import VueDT from './VueDT.vue'

export default {
  components: { VueDT },
  data () {
    return {
      date1: new Date(),
      date2: new Date(),
      date3: new Date(),
      date4: new Date(),
      date5: new Date()
    }
  }
}
</script>

<style>
.vuedt {
  display: inline-block;
  margin-right: 1em;
}
</style>
