<template>
  <div class="vuedt" @click="active = !active">
    <input type="datetime" :value="date.toLocaleString()" disabled="true" />
    <div class="pickers" v-show="active">
      <date-picker v-model="date" :lang="lang" />
      <time-picker v-model="date" :lang="lang" />
    </div>
  </div>
</template>

<script>
import DatePicker from './VuedtCalendar.vue'
import TimePicker from './VuedtClock.vue'

export default {
  name: 'vuedt',
  components: { DatePicker, TimePicker },
  props: {
    lang: { type: String, default: 'en' },
    value: { type: Date, default () { return new Date() } }
  },
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
  pointer-events: none;
}
.vuedt > input::after {
  content: '\1f4c5';
}
.pickers {
  display: inline-block;
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
