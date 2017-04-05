<template>
  <div class="clock">
    <header>
      <h1>
        <span :class="{highlight: mode === 0}" @click.stop="mode = 0">{{ pad(hour) }}</span> :
        <span :class="{highlight: mode === 1}" @click.stop="mode = 1">{{ pad(minute) }}</span> :
        <span :class="{highlight: mode === 2}" @click.stop="mode = 2">{{ pad(second) }}</span>
      </h1>
    </header>
    <div class="outer_face">
      <div :class="`marker ${marker}`" v-for="(marker,i) in markers">
        <span class="handle0" @click.stop="setValue(handleValue(i))">{{ handleValue(i) }}</span/>
        <span class="handle1" @click.stop="setValue(handleValue(i, true))">{{ handleValue(i, true) }}</span/>
      </div>

      <div class="inner_face">
        <div ref="hour" class="hand hour"></div>
        <div ref="minute" class="hand minute"></div>
        <div ref="second" class="hand second"></div>
      </div>
    </div>
  </div>
</template>

<script>
const markers = [
  'zerosix', 'oneseven', 'twoeight',
  'threenine', 'fourten', 'fiveeleven'
]

const modes = [ 'hour', 'minute', 'second' ]

export default {
  name: 'vuedt-clock',
  props: {
    lang: { type: String, default: 'en' },
    value: { type: Date, default () { return new Date() } }
  },
  data () {
    return {
      markers,
      mode: 0,
      baseYear: 0,
      baseMonth: 0,
      hour: 0,
      minute: 0,
      second: 0
    }
  },
  methods: {
    pad (n) {
      return `0${n}`.slice(-2)
    },
    handleValue (i, second=false) {
      const isHours = this.mode === 0

      if (isHours) {
        return second ? i + 6 : i
      } else {
        return second ? (i+6) * 5 : i * 5
      }
    },
    setValue (n) {
      this[modes[this.mode]] = n
      this.mode = (this.mode + 1) % modes.length

      // save the date
      const year = this.value.getFullYear()
      const month = this.value.getMonth()
      const day = this.value.getDate()

      const d = new Date(year, month, day, this.hour, this.minute, this.second)

      this.$emit('input', d)
    }
  },
  computed: {

    formattedTime () {
      const h = this.pad(this.hour)
      const m = this.pad(this.minute)
      const s = this.pad(this.second)

      return `${h}:${m}:${s}`
    }
  },
  watch: {
    value (newValue, oldValue) {
      const now = newValue || new Date()
      this.hour = now.getHours()
      this.minute = now.getMinutes()
      this.second = now.getSeconds()

      const hourEl = this.$refs.hour
      const minuteEl = this.$refs.minute
      const secondEl = this.$refs.second

      const hourInDeg = this.hour / 12 * 360
      const minuteInDeg = this.minute / 60 * 360
      const secondInDeg = this.second / 60 * 360
      hourEl.style.transform = 'rotate(0deg)'
      minuteEl.style.transform = 'rotate(0deg)'
      secondEl.style.transform = 'rotate(0deg)'

      this.$nextTick(() => {
        hourEl.style.transform = `rotate(${hourInDeg}deg)`
        minuteEl.style.transform = `rotate(${minuteInDeg}deg)`
        secondEl.style.transform = `rotate(${secondInDeg}deg)`
      })
    }
  }
}
</script>

<style scoped>
.clock {
  background: white;
}
.clock > header > h1 {
  font-size: 30px;
  margin: .2em;
  text-align: center;
  color: #333;
}
.clock > header > h1 > span {
  cursor: pointer;
  border-bottom: 2px solid transparent;
}
.clock > header > h1 > span:hover {
  border-bottom: 2px solid #333;
}
.clock > header > h1 > span.highlight {
  color: #06b;
  border-bottom: 2px solid #333;
}

/* http://www.javascriptkit.com/dhtmltutors/css3clock.shtml */
.outer_face {
  position: relative;
  width: 186px;
  height: 186px;
  margin: auto;
  border-radius: 50%;
  background: white;
  box-shadow: inset 0 0 10px gray;
  border: 10px solid black
}
.outer_face > .marker {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  width: 3px;
  height: 100%;
  margin-left: -2px;
  z-index: 0;
  background: grey;
}
.outer_face > .marker.zerosix,
.outer_face > .marker.threenine {
  background: black;
  width: 5px;
  margin-left: -3px;
}
.outer_face > .marker.oneseven { transform: rotate(30deg) }
.outer_face > .marker.twoeight { transform: rotate(60deg) }
.outer_face > .marker.threenine { transform: rotate(90deg) }
.outer_face > .marker.fourten { transform: rotate(120deg) }
.outer_face > .marker.fiveeleven { transform: rotate(150deg) }

.marker > .handle0,
.marker > .handle1 {
  opacity: 0;
  position: absolute;
  left: -250%;
  width: 600%;
  height: 15%;
  z-index: 3;
  color: white;
  line-height: 1em;
  text-shadow: 0 0 2px black;
  text-align: center;
  cursor: pointer;
}
.marker > .handle0:hover,
.marker > .handle1:hover {
  opacity: 1;
}
.marker > .handle0 {
  top: -10%;
  transform: scale(1.5);
}
.marker > .handle1 {
  top: 95%;
  transform: rotate(180deg) scale(1.5);
}

.inner_face {
  position: relative;
  top: 5%;
  left: 5%;
  width: 90%;
  height: 90%;
  background: white;
  border-radius: 50%;
  z-index: 2;
}
.inner_face::before {
  /* dot in the center of the clock */
  content: "";
  position: absolute;
  top: 47%;
  left: 47%;
  width: 6%;
  height: 6%;
  background: black;
  border-radius: 50%;
  box-shadow: 0 0 15px gray;
}
.inner_face::after {
  content: "vuedt";
  position: absolute;
  top: 83%;
  left: 0;
  width: 100%;
  font: normal 0.8em sans-serif;
  color: gray;
  text-align: center;
  text-transform: uppercase;
}

.hand {
  position: absolute;
  background: black;
  left: 50%;
  transform: rotate(0deg);
  transform-origin: bottom;
  z-index: -1;
  box-shadow: 0 0 4px gray;
  transition: transform .5s linear;
}
.hand.hour {
  top: 15%;
  width: 4%;
  height: 35%;
  margin-left: -2%;
  transform: rotate(15deg);
}
.hand.minute {
  top: 5%;
  width: 3%;
  height: 45%;
  margin-left: -2%;
  transform: rotate(45deg);
}
.hand.second {
  width: 1%;
  height: 50%;
  margin-left: -1%;
  background: red;
  transform: rotate(0deg);
}
</style>
