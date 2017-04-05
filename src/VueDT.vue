<template>
  <div class="vuedt">
    <input type="datetime" :value="date.toISOString()" disabled="true" />
    <button @click="active = !active">&#128197;</button>
    <div class="pickers" v-show="active">
      <date-picker v-model="date" />
      <time-picker v-model="date" />
    </div>
  </div>
</template>

<script>
import DatePicker from './VuedtCalendar.vue'
import TimePicker from './VuedtClock.vue'

export default {
  name: 'vuedt',
  components: { DatePicker, TimePicker },
  props: { value: { type: Date, default: () => new Date() } },
  data () {
    return {
      active: false,
      date: new Date()
    }
  }
}
</script>

<style scoped>
.vuedt > input {
  width: 200px;
  text-align: center;
}
.pickers {
  position: absolute;
  z-index: 99999;
}
.pickers > .calendar,
.pickers > .clock {
  display: inline-block;
  vertical-align: top;
  min-width: 252px;
  border: 1px solid #666;
  background: #FFE;
}
</style>
