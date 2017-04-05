<template>
  <div class="vuedt" @click="clock = false; active = !active">
    <input type="datetime" :value="date.toLocaleString()" disabled="true" />
    <div class="pickers" :class="{ clock }" v-show="active">
      <div class="calendar-wrap">
        <date-picker v-model="date" :lang="lang" @input="clock = true" />
        <button class="next" @click.stop="clock = true">switch to clock</button>
      </div>
      <div class="clock-wrap">
        <button class="prev" @click.stop="clock = false">back to calendar</button>
        <time-picker v-model="date" :lang="lang" />
      </div>
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
      clock: false,
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
  height: 290px;
  overflow: hidden;
}
.pickers > .calendar-wrap,
.pickers > .clock-wrap {
  display: block;
  width: 252px;
  height: 290px;
  border: 1px solid #666;
  background: white;
  transition: transform .2s ease-out;
}
.pickers.clock > .calendar-wrap,
.pickers.clock > .clock-wrap {
  transform: translateY(-100%);
}
button.prev, button.next {
  display: block;
  width: 100%;
  height: 20px;
  font-size: 10px;
  text-spacing: 1px;
}
</style>
