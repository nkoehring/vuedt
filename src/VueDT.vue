<template>
  <div class="vuedt">
    <div class="input-wrap" @click="active = true">
      <input type="text" :value="localizedValue" disabled="true" />
    </div>

    <transition name="fade">
      <div class="fullscreen" @click="active = false" v-if="active" />
    </transition>

    <div class="pickers" :class="{ clock }" v-show="active">

      <div class="calendar-wrap">
        <date-picker :value="value" :lang="lang" @input="selectDate" />

        <button class="next" @click.stop="showClock()" v-if="time">switch to clock</button>
        <button class="next" @click.stop="active = false" v-else>close</button>
      </div>

      <div class="clock-wrap" v-if="time">
        <button class="prev" @click.stop="hideClock()">back to calendar</button>
        <time-picker ref="clockEl" :value="value" :lang="lang" @input="$emit('input', $event)" />
      </div>

    </div>
  </div>
</template>

<script>
import DatePicker from './VuedtCalendar.vue'
import TimePicker from './VuedtClock.vue'

const localeOptions = {
  weekday: undefined,
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
}

export default {
  name: 'vuedt',
  components: { DatePicker, TimePicker },
  props: {
    placeholder: String,
    locale: { type: String, default: 'en-US' },
    localeOptions: {
      type: Object,
      default () {
        return localeOptions
      }
    },
    timeZone: String,
    time: {
      type: Boolean,
      default: true
    },
    value: {
      type: Date,
      required: true
    }
  },
  data () {
    return { active: false, clock: false, showPlaceholder: !!this.placeholder }
  },
  computed: {
    lang () {
      return this.locale.split('-')[0]
    },
    localizedValue () {
      if (this.showPlaceholder) return this.placeholder

      const locale = this.locale
      const options = { ...this.localeOptions }

      if (!this.time && options.weekday === undefined) {
        options.weekday = 'short'
        delete options.hour
        delete options.minute
        delete options.second
      }

      if (this.timeZone) {
        options.timeZone = this.timeZone
      }

      return this.value.toLocaleString(locale, options)
    }
  },
  methods: {
    selectDate (event) {
      this.showPlaceholder = false

      this.$emit('input', event)
      if (this.time) this.showClock()
      else this.active = false
    },
    showClock () {
      this.clock = true
      this.$refs.clockEl.setHandles()
    },
    hideClock () {
      this.clock = false
    }
  }
}
</script>

<style scoped>
.vuedt {
  position: relative;
}
.vuedt > .input-wrap {
  width: 200px;
  margin-right: 1em;
}
.vuedt > .input-wrap > input {
  width: 200px;
  text-align: center;
  pointer-events: none;
}
.vuedt > .input-wrap > input::after {
  content: '\1f4c5';
}
.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,.2);
  z-index: 99998;
}
.pickers {
  display: inline-block;
  position: absolute;
  top: 24px;
  z-index: 99999;
  height: 290px;
  overflow: hidden;
}
.pickers > .calendar-wrap,
.pickers > .clock-wrap {
  display: block;
  height: 290px;
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
  letter-spacing: 1px;
}
button.next {
  margin-top: 2px;
}
.fade-enter-active, .fade-leave-active { transition: opacity .5s }
.fade-enter, .fade-leave-to .fade-leave-active { opacity: 0 }
</style>
