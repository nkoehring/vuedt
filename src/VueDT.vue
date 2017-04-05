<template>
  <div class="vuedt" @click="clock = false; active = !active">
    <input type="datetime" :value="date.toLocaleString()" disabled="true" />
    <div class="pickers" :class="{ clock }" v-show="active">
      <date-picker v-model="date" :lang="lang" @input="clock = true" />
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
      mode: 0,
      date: 0
    }
  },
  beforeMount () {
    const now = new Date()
    const year = this.value.getFullYear()
    const month = this.value.getMonth()
    const day = this.value.getDate()

    this.date = new Date(year, month, day, 12, 0, 0)
  }
}
</script>

<style scoped>
.vuedt {
  position: relative;
}
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
  top: 24px;
  margin-left: -206px;
  z-index: 99999;
  height: 276px;
  overflow: hidden;
}
.pickers > .calendar,
.pickers > .clock {
  display: block;
  width: 252px;
  height: 276px;
  border: 1px solid #666;
  background: white;
  transition: transform .2s ease-out;
}
.pickers.clock > .calendar,
.pickers.clock > .clock {
  transform: translateY(-100%);
}
</style>
