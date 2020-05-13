(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.vuedt = factory());
}(this, (function () { 'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var i18n = {
    en: {
      day: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    de: {
      day: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
      month: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
    }
  };
  var script = {
    name: 'vuedt-calendar',
    props: {
      lang: {
        type: String,
        default: 'en'
      },
      value: {
        type: Date,
        default: function _default() {
          return new Date();
        }
      }
    },
    data: function data() {
      return {
        baseYear: 0,
        baseMonth: 0,
        year: 0,
        month: 0,
        day: 0
      };
    },
    computed: {
      msg: function msg() {
        return i18n[this.lang] || i18n.en;
      }
    },
    methods: {
      calendarDay: function calendarDay(x, y) {
        var offset = this.monthOffset();
        var n = (y - 1) * 7 + x - offset;
        return n;
      },
      isLastMonth: function isLastMonth(x, y) {
        var n = this.calendarDay(x, y);
        return n <= 0;
      },
      isNextMonth: function isNextMonth(x, y) {
        var n = this.calendarDay(x, y);
        return n > this.lastDay();
      },
      isToday: function isToday(x, y) {
        var n = this.calendarDay(x, y);
        var today = new Date();
        var thisYear = this.year === today.getFullYear();
        var thisMonth = this.month === today.getMonth();
        return thisYear && thisMonth && n === today.getDate();
      },
      prettyDay: function prettyDay(x, y) {
        var n = this.calendarDay(x, y);

        if (this.isLastMonth(x, y)) {
          return this.lastDayBefore() + n;
        } else if (this.isNextMonth(x, y)) {
          return n - this.lastDay();
        } else {
          return n;
        }
      },
      cssClasses: function cssClasses(x, y) {
        var n = this.calendarDay(x, y);
        var thisYear = this.year === this.value.getFullYear();
        var thisMonth = this.month === this.value.getMonth();
        var thisDay = n === this.value.getDate();
        return {
          'out-of-month': this.isLastMonth(x, y) || this.isNextMonth(x, y),
          today: this.isToday(x, y),
          selected: thisYear && thisMonth && thisDay
        };
      },
      monthOffset: function monthOffset() {
        return new Date(this.year, this.month, 1).getDay();
      },
      lastDayBefore: function lastDayBefore() {
        return new Date(this.year, this.month, 0).getDate();
      },
      lastDay: function lastDay() {
        return new Date(this.year, this.month + 1, 0).getDate();
      },
      selectDay: function selectDay(x, y) {
        var n = this.calendarDay(x, y); // save the time

        var d = new Date(this.value);
        d.setFullYear(this.year);
        d.setMonth(this.month);
        d.setDate(n);
        this.$emit('input', d);
      }
    },
    beforeMount: function beforeMount() {
      var now = this.value || new Date();
      this.year = this.baseYear = now.getFullYear();
      this.month = this.baseMonth = now.getMonth();
      this.day = now.getDate();
    },
    watch: {
      value: function value(newValue) {
        var now = newValue || new Date();
        this.year = this.baseYear = now.getFullYear();
        this.month = this.baseMonth = now.getMonth();
        this.day = now.getDate();
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function (context) {
        style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  /* script */
  const __vue_script__ = script;
  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "calendar" }, [
      _c(
        "div",
        { staticClass: "year-selector" },
        [
          _c(
            "button",
            {
              on: {
                click: function($event) {
                  $event.stopPropagation();
                  _vm.baseYear = _vm.baseYear - 1;
                }
              }
            },
            [_vm._v("‹")]
          ),
          _vm._v(" "),
          _vm._l([_vm.baseYear - 1, _vm.baseYear, _vm.baseYear + 1], function(y) {
            return _c(
              "button",
              {
                key: y,
                class: { selected: _vm.year === y },
                on: {
                  click: function($event) {
                    $event.stopPropagation();
                    _vm.year = y;
                  }
                }
              },
              [_vm._v("\n      " + _vm._s(y) + "\n    ")]
            )
          }),
          _vm._v(" "),
          _c(
            "button",
            {
              on: {
                click: function($event) {
                  $event.stopPropagation();
                  _vm.baseYear = _vm.baseYear + 1;
                }
              }
            },
            [_vm._v("›")]
          )
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "month-selector" },
        [
          _c(
            "button",
            {
              attrs: { disabled: _vm.baseMonth < 3 },
              on: {
                click: function($event) {
                  $event.stopPropagation();
                  _vm.baseMonth = _vm.baseMonth - 1;
                }
              }
            },
            [_vm._v("‹")]
          ),
          _vm._v(" "),
          _vm._l(
            [
              _vm.baseMonth - 2,
              _vm.baseMonth - 1,
              _vm.baseMonth,
              _vm.baseMonth + 1,
              _vm.baseMonth + 2
            ],
            function(m) {
              return _c(
                "button",
                {
                  key: m,
                  class: { selected: _vm.month === m },
                  on: {
                    click: function($event) {
                      $event.stopPropagation();
                      _vm.month = m;
                    }
                  }
                },
                [_vm._v("\n      " + _vm._s(_vm.msg.month[m]) + "\n    ")]
              )
            }
          ),
          _vm._v(" "),
          _c(
            "button",
            {
              attrs: { disabled: _vm.baseMonth > 8 },
              on: {
                click: function($event) {
                  $event.stopPropagation();
                  _vm.baseMonth = _vm.baseMonth + 1;
                }
              }
            },
            [_vm._v("›")]
          )
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "day-selector" },
        [
          _c(
            "header",
            _vm._l(_vm.msg.day, function(d) {
              return _c("div", { key: d, staticClass: "day" }, [
                _vm._v(_vm._s(d))
              ])
            }),
            0
          ),
          _vm._v(" "),
          _vm._l(6, function(y) {
            return _c(
              "div",
              { key: y, staticClass: "row" },
              _vm._l(7, function(x) {
                return _c(
                  "button",
                  {
                    key: x,
                    class: _vm.cssClasses(x, y),
                    on: {
                      click: function($event) {
                        $event.stopPropagation();
                        return _vm.selectDay(x, y)
                      }
                    }
                  },
                  [
                    _vm._v(
                      "\n        " + _vm._s(_vm.prettyDay(x, y)) + "\n      "
                    )
                  ]
                )
              }),
              0
            )
          })
        ],
        2
      )
    ])
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    const __vue_inject_styles__ = undefined;
    /* scoped */
    const __vue_scope_id__ = "data-v-04979f91";
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__ = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      undefined,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var markers = ['zerosix', 'oneseven', 'twoeight', 'threenine', 'fourten', 'fiveeleven'];
  var modes = ['hour', 'minute', 'second'];
  var script$1 = {
    name: 'vuedt-clock',
    props: {
      lang: {
        type: String,
        default: 'en'
      },
      value: {
        type: Date,
        default: function _default() {
          return new Date();
        }
      }
    },
    data: function data() {
      return {
        markers: markers,
        mode: 0,
        baseYear: 0,
        baseMonth: 0,
        hour: 0,
        minute: 0,
        second: 0,
        pm: false
      };
    },
    methods: {
      ampm: function ampm() {
        this.pm = !this.pm;
        if (this.pm) this.hour += 12;else this.hour -= 12;
        this.emitValue();
      },
      pad: function pad(n) {
        return "0".concat(n).slice(-2);
      },
      handleValue: function handleValue(i) {
        var second = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var isHours = this.mode === 0;

        if (isHours) {
          return second ? i + 6 : i;
        } else {
          return second ? (i + 6) * 5 : i * 5;
        }
      },
      emitValue: function emitValue() {
        // save the date
        var d = new Date(this.value);
        d.setHours(this.hour, this.minute, this.second, 0);
        this.$emit('input', d);
      },
      setValue: function setValue(n) {
        if (this.pm && this.mode === 0) n += 12; // handle PM

        this[modes[this.mode]] = n; // sets this.(hour|minute|second) to value

        this.mode = (this.mode + 1) % modes.length;
        this.setHandles(this.hour, this.minute, this.second);
        this.emitValue();
      },
      setHandles: function setHandles(h, m, s) {
        h = h !== undefined ? h : this.value.getHours();
        m = m !== undefined ? m : this.value.getMinutes();
        s = s !== undefined ? s : this.value.getSeconds();
        var hourInDeg = h % 12 / 12 * 360;
        var minuteInDeg = m / 60 * 360;
        var secondInDeg = s / 60 * 360;
        this.$refs.hour.style.transform = "rotate(".concat(hourInDeg, "deg)");
        this.$refs.minute.style.transform = "rotate(".concat(minuteInDeg, "deg)");
        this.$refs.second.style.transform = "rotate(".concat(secondInDeg, "deg)");
      }
    },
    computed: {
      formattedTime: function formattedTime() {
        var h = this.pad(this.hour);
        var m = this.pad(this.minute);
        var s = this.pad(this.second);
        return "".concat(h, ":").concat(m, ":").concat(s);
      }
    },
    beforeMount: function beforeMount() {
      this.hour = this.value.getHours();
      this.minute = this.value.getMinutes();
      this.second = this.value.getSeconds();
      this.pm = this.hour > 11;
    }
  };

  /* script */
  const __vue_script__$1 = script$1;
  /* template */
  var __vue_render__$1 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "clock" }, [
      _c("header", [
        _c("h1", [
          _c(
            "span",
            {
              class: { highlight: _vm.mode === 0 },
              on: {
                click: function($event) {
                  $event.stopPropagation();
                  _vm.mode = 0;
                }
              }
            },
            [_vm._v(_vm._s(_vm.pad(_vm.hour)))]
          ),
          _vm._v(" :\n      "),
          _c(
            "span",
            {
              class: { highlight: _vm.mode === 1 },
              on: {
                click: function($event) {
                  $event.stopPropagation();
                  _vm.mode = 1;
                }
              }
            },
            [_vm._v(_vm._s(_vm.pad(_vm.minute)))]
          ),
          _vm._v(" :\n      "),
          _c(
            "span",
            {
              class: { highlight: _vm.mode === 2 },
              on: {
                click: function($event) {
                  $event.stopPropagation();
                  _vm.mode = 2;
                }
              }
            },
            [_vm._v(_vm._s(_vm.pad(_vm.second)))]
          )
        ])
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "outer_face" },
        [
          _vm._l(_vm.markers, function(marker, i) {
            return _c("div", { key: marker, class: "marker " + marker }, [
              _c(
                "span",
                {
                  staticClass: "handle0",
                  on: {
                    click: function($event) {
                      $event.stopPropagation();
                      _vm.setValue(_vm.handleValue(i));
                    }
                  }
                },
                [_vm._v(_vm._s(_vm.handleValue(i)))]
              ),
              _vm._v(" "),
              _c(
                "span",
                {
                  staticClass: "handle1",
                  on: {
                    click: function($event) {
                      $event.stopPropagation();
                      _vm.setValue(_vm.handleValue(i, true));
                    }
                  }
                },
                [_vm._v(_vm._s(_vm.handleValue(i, true)))]
              )
            ])
          }),
          _vm._v(" "),
          _c("div", { staticClass: "inner_face" }, [
            _c(
              "div",
              {
                staticClass: "am-pm",
                on: {
                  click: function($event) {
                    $event.stopPropagation();
                    return _vm.ampm()
                  }
                }
              },
              [
                _c("div", { staticClass: "wrap", class: { pm: _vm.pm } }, [
                  _c("div", { staticClass: "label" }, [_vm._v("AM")]),
                  _vm._v(" "),
                  _c("div", { staticClass: "slider" }),
                  _vm._v(" "),
                  _c("div", { staticClass: "label" }, [_vm._v("PM")])
                ])
              ]
            ),
            _vm._v(" "),
            _c("div", { ref: "hour", staticClass: "hand hour" }),
            _vm._v(" "),
            _c("div", { ref: "minute", staticClass: "hand minute" }),
            _vm._v(" "),
            _c("div", { ref: "second", staticClass: "hand second" })
          ])
        ],
        2
      )
    ])
  };
  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;

    /* style */
    const __vue_inject_styles__$1 = undefined;
    /* scoped */
    const __vue_scope_id__$1 = "data-v-38f80229";
    /* module identifier */
    const __vue_module_identifier__$1 = undefined;
    /* functional template */
    const __vue_is_functional_template__$1 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      false,
      undefined,
      undefined,
      undefined
    );

  var localeOptions = {
    weekday: undefined,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  var script$2 = {
    name: 'vuedt',
    components: {
      DatePicker: __vue_component__,
      TimePicker: __vue_component__$1
    },
    props: {
      placeholder: String,
      locale: {
        type: String,
        default: 'en-US'
      },
      localeOptions: {
        type: Object,
        default: function _default() {
          return localeOptions;
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
    data: function data() {
      return {
        active: false,
        clock: false,
        showPlaceholder: !!this.placeholder
      };
    },
    computed: {
      lang: function lang() {
        return this.locale.split('-')[0];
      },
      localizedValue: function localizedValue() {
        if (this.showPlaceholder) return this.placeholder;
        var locale = this.locale;

        var options = _objectSpread2({}, this.localeOptions);

        if (!this.time && options.weekday === undefined) {
          options.weekday = 'short';
          delete options.hour;
          delete options.minute;
          delete options.second;
        }

        if (this.timeZone) {
          options.timeZone = this.timeZone;
        }

        return this.value.toLocaleString(locale, options);
      }
    },
    methods: {
      selectDate: function selectDate(event) {
        this.showPlaceholder = false;
        this.$emit('input', event);
        if (this.time) this.showClock();else this.active = false;
      },
      showClock: function showClock() {
        this.clock = true;
        this.$refs.clockEl.setHandles();
      },
      hideClock: function hideClock() {
        this.clock = false;
      }
    }
  };

  /* script */
  const __vue_script__$2 = script$2;
  /* template */
  var __vue_render__$2 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "vuedt" },
      [
        _c(
          "div",
          {
            staticClass: "input-wrap",
            on: {
              click: function($event) {
                _vm.active = true;
              }
            }
          },
          [
            _c("input", {
              attrs: { type: "text", disabled: "true" },
              domProps: { value: _vm.localizedValue }
            })
          ]
        ),
        _vm._v(" "),
        _c("transition", { attrs: { name: "fade" } }, [
          _vm.active
            ? _c("div", {
                staticClass: "fullscreen",
                on: {
                  click: function($event) {
                    _vm.active = false;
                  }
                }
              })
            : _vm._e()
        ]),
        _vm._v(" "),
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.active,
                expression: "active"
              }
            ],
            staticClass: "pickers",
            class: { clock: _vm.clock }
          },
          [
            _c(
              "div",
              { staticClass: "calendar-wrap" },
              [
                _c("date-picker", {
                  attrs: { value: _vm.value, lang: _vm.lang },
                  on: { input: _vm.selectDate }
                }),
                _vm._v(" "),
                _vm.time
                  ? _c(
                      "button",
                      {
                        staticClass: "next",
                        on: {
                          click: function($event) {
                            $event.stopPropagation();
                            return _vm.showClock()
                          }
                        }
                      },
                      [_vm._v("switch to clock")]
                    )
                  : _c(
                      "button",
                      {
                        staticClass: "next",
                        on: {
                          click: function($event) {
                            $event.stopPropagation();
                            _vm.active = false;
                          }
                        }
                      },
                      [_vm._v("close")]
                    )
              ],
              1
            ),
            _vm._v(" "),
            _vm.time
              ? _c(
                  "div",
                  { staticClass: "clock-wrap" },
                  [
                    _c(
                      "button",
                      {
                        staticClass: "prev",
                        on: {
                          click: function($event) {
                            $event.stopPropagation();
                            return _vm.hideClock()
                          }
                        }
                      },
                      [_vm._v("back to calendar")]
                    ),
                    _vm._v(" "),
                    _c("time-picker", {
                      ref: "clockEl",
                      attrs: { value: _vm.value, lang: _vm.lang },
                      on: {
                        input: function($event) {
                          return _vm.$emit("input", $event)
                        }
                      }
                    })
                  ],
                  1
                )
              : _vm._e()
          ]
        )
      ],
      1
    )
  };
  var __vue_staticRenderFns__$2 = [];
  __vue_render__$2._withStripped = true;

    /* style */
    const __vue_inject_styles__$2 = undefined;
    /* scoped */
    const __vue_scope_id__$2 = "data-v-1bedc490";
    /* module identifier */
    const __vue_module_identifier__$2 = undefined;
    /* functional template */
    const __vue_is_functional_template__$2 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$2 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
      __vue_inject_styles__$2,
      __vue_script__$2,
      __vue_scope_id__$2,
      __vue_is_functional_template__$2,
      __vue_module_identifier__$2,
      false,
      undefined,
      undefined,
      undefined
    );

  return __vue_component__$2;

})));
