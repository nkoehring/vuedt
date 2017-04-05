<template>
  <div class="calendar">

    <div class="year-selector">
      <button @click.stop="baseYear = baseYear - 1">‹</button>
      <button v-for="y in [baseYear - 1, baseYear, baseYear + 1]"
        @click.stop="year = y"
        :class="{ selected: year === y }">
        {{ y }}
      </button>
      <button @click.stop="baseYear = baseYear + 1">›</button>
    </div>
    
    <div class="month-selector">
      <button @click.stop="baseMonth = baseMonth - 1" :disabled="baseMonth < 3">‹</button>
      <button v-for="m in [baseMonth - 2, baseMonth - 1, baseMonth, baseMonth + 1, baseMonth + 2]"
        @click.stop="month = m"
        :class="{ selected: month === m }">
        {{ msg.month[m] }}
      </button>
      <button @click.stop="baseMonth = baseMonth + 1" :disabled="baseMonth > 8 ">›</button>
    </div>

    <div class="day-selector">
      <header>
        <div class="day" v-for="d in msg.day">{{ d }}</div>
      </header>
      <div class="row" v-for="y in 6">
        <button v-for="x in 7"
          @click.stop="selectDay(x,y)"
          :class="{'out-of-month': isLastMonth(x,y) || isNextMonth(x,y), today: isToday(x,y)}">
          {{ prettyDay(x,y) }}
        </button>
      </div>
    </div>

  </div>
</template>

<script>
const i18n = {
  en: {
    day: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  de: {
    day: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    month: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
  }
}

export default {
  name: 'vuedt-calendar',
  props: {
    lang: { type: String, default: 'en' },
    value: { type: Date, default () { return new Date() } }
  },
  data () {
    return {
      baseYear: 0,
      baseMonth: 0,
      year: 0,
      month: 0,
      day: 0
    }
  },
  computed: {
    msg () {
      return i18n[this.lang] || i18n.en
    }
  },
  methods: {
    calendarDay (x,y) {
      const offset = this.monthOffset()
      const n = ((y-1)*7) + x - this.monthOffset()

      return n
    },
    isLastMonth (x,y) {
      const n = this.calendarDay(x,y)
      return n <= 0
    },
    isNextMonth (x,y) {
      const n = this.calendarDay(x,y)
      return n > this.lastDay()
    },
    isToday (x,y) {
      const n = this.calendarDay(x,y)
      const today = new Date().getDate()
      return n === today
    },
    prettyDay (x,y) {
      const n = this.calendarDay(x,y)

      if (this.isLastMonth(x,y)) {
        return this.lastDayBefore() + n
      } else if (this.isNextMonth(x,y)) {
        return n - this.lastDay()
      } else {
        return n
      }
    },
    monthOffset () {
      return new Date(this.year, this.month, 1).getDay()
    },
    lastDayBefore () {
      return new Date(this.year, this.month, 0).getDate()
    },
    lastDay () {
      return new Date(this.year, this.month + 1, 0).getDate()
    },
    selectDay (x,y) {
      const n = this.calendarDay(x,y)

      // save the time
      const hour = this.value.getHours()
      const minute = this.value.getMinutes()
      const second = this.value.getSeconds()

      const d = new Date(this.year, this.month, n, hour, minute, second)

      this.$emit('input', d)
    }
  },
  beforeMount () {
    const now = this.value || new Date()
    this.year = this.baseYear = now.getFullYear()
    this.month = this.baseMonth = now.getMonth()
    this.day = now.getDate()
  },
  watch: {
    value (newValue, oldValue) {
      const now = newValue || new Date()
      this.year = this.baseYear = now.getFullYear()
      this.month = this.baseMonth = now.getMonth()
      this.day = now.getDate()
    }
  }
}
</script>

<style>
.year-selector,
.month-selector,
.day-selector > .row {
  display: flex;
  justify-content: center;
}
.year-selector > button,
.month-selector > button,
.day-selector > .row > button {
  flex: 1 0;
  border: 1px solid #aaa;
  background: #eee;
  background: linear-gradient(#fff, #f9f9f9);
}
.year-selector > button.selected,
.month-selector > button.selected,
.day-selector > .row > button.selected {
  background: #ddf;
  background: linear-gradient(#efefff, #e0e0f0);
  font-weight: bold;
}
.year-selector > button:hover,
.month-selector > button:hover {
  background: #ddf;
  cursor: pointer;
}
.year-selector > button:first-of-type,
.year-selector > button:last-of-type,
.month-selector > button:first-of-type,
.month-selector > button:last-of-type {
  flex: 0 0;
}
.day-selector > header {
  display: flex;
  justify-content: space-around;
}
.day-selector > header > .day {
  flex: 0 0 36px;
  color: black;
  text-align: center;
}
.day-selector > .row > button {
  height: 36px;
  box-sizing: border-box;
  border: 3px solid transparent;
}
.day-selector > .row > button:hover {
  border-bottom: 3px solid #333;
}
.day-selector > .row > button.out-of-month {
  color: #888;
}
.day-selector > .row > button.out-of-month:hover {
  border-bottom: 3px solid #999;
}
.day-selector > .row > button.today {
  color: #06b;
  font-weight: bold;
  border-bottom: 3px solid #06b;
}
</style>
