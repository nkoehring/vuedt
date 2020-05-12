VueDT
=====

Super lightweight Vuejs Date and Time picker component with i18n support.

Screenshots
-----------

![Screenshot01](https://raw.githubusercontent.com/nkoehring/vuedt/master/vuedt01.jpg)
![Screenshot02](https://raw.githubusercontent.com/nkoehring/vuedt/master/vuedt02.jpg)

There are also nice animations 'n stuff.

Usage
-----

Simple standard example for a date and time picker that is initialized with a data value:

```html
<template>
  <VueDT v-model="date" />
</template>

<script>
// don't forget to import the styles
import 'vuedt/dist/vuedt.css'
import VueDT from 'vuedt'

export default {
  components: { VueDT },
  data () {
    return {
      date: new Date()
    }
  }
}
</script>
```

More possibilities:

```html
<template>
  <!-- only calendar, no clock -->
  <VueDT v-model="date" :time="false" />

  <!-- show a placeholder until a date is selected -->
  <VueDT v-model="date" placeholder="select date" />

  <!-- Use a specific locale. You can also pass locale-options,
       both are passed to date.toLocaleString(locale, localeOptions)

       If :time="false" all options regarding the time are deleted. -->
  <VueDT v-model="date" locale="de-DE" :locale-options="..." />

  <!-- Set a specific timezone (can also be set via locale-options) -->
  <VueDT v-model="date" time-zone="Europe/Berlin" />
</template>

<script>
import 'vuedt/dist/vuedt.css'
import VueDT from 'vuedt'

export default {
  components: { VueDT },
  data () {
    return {
      date: new Date()
    }
  }
}
</script>
```

See [the Date toLocaleString MDN page](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) for all possible possible locale options.


Planned features
----------------

 * better way to store translations
 * black listing or white listing of dates and date ranges
 * highlighting of particular dates, date ranges and columns
 * (limited?) theming support


Contributing
------------
**This project is still in beta!**
Please help making it stable by testing and submitting issues and pull requests.

