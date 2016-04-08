$traceurRuntime.registerModule("../bower_components/mocha/mocha.js", [], function() {
  "use strict";
  var __moduleName = "../bower_components/mocha/mocha.js";
  (function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;
          if (!u && a)
            return a(o, !0);
          if (i)
            return i(o, !0);
          var f = new Error("Cannot find module '" + o + "'");
          throw f.code = "MODULE_NOT_FOUND", f;
        }
        var l = n[o] = {exports: {}};
        t[o][0].call(l.exports, function(e) {
          var n = t[o][1][e];
          return s(n ? n : e);
        }, l, l.exports, e, t, n, r);
      }
      return n[o].exports;
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++)
      s(r[o]);
    return s;
  })({
    1: [function(require, module, exports) {
      (function(process) {
        module.exports = process.env.COV ? require('./lib-cov/mocha') : require('./lib/mocha');
      }).call(this, require('_process'));
    }, {
      "./lib-cov/mocha": undefined,
      "./lib/mocha": 14,
      "_process": 51
    }],
    2: [function(require, module, exports) {
      module.exports = function(type) {
        return function() {};
      };
    }, {}],
    3: [function(require, module, exports) {
      exports.EventEmitter = EventEmitter;
      var objToString = Object.prototype.toString;
      function isArray(val) {
        return objToString.call(val) === '[object Array]';
      }
      function EventEmitter() {}
      EventEmitter.prototype.on = function(name, fn) {
        if (!this.$events) {
          this.$events = {};
        }
        if (!this.$events[name]) {
          this.$events[name] = fn;
        } else if (isArray(this.$events[name])) {
          this.$events[name].push(fn);
        } else {
          this.$events[name] = [this.$events[name], fn];
        }
        return this;
      };
      EventEmitter.prototype.addListener = EventEmitter.prototype.on;
      EventEmitter.prototype.once = function(name, fn) {
        var self = this;
        function on() {
          self.removeListener(name, on);
          fn.apply(this, arguments);
        }
        on.listener = fn;
        this.on(name, on);
        return this;
      };
      EventEmitter.prototype.removeListener = function(name, fn) {
        if (this.$events && this.$events[name]) {
          var list = this.$events[name];
          if (isArray(list)) {
            var pos = -1;
            for (var i = 0,
                l = list.length; i < l; i++) {
              if (list[i] === fn || (list[i].listener && list[i].listener === fn)) {
                pos = i;
                break;
              }
            }
            if (pos < 0) {
              return this;
            }
            list.splice(pos, 1);
            if (!list.length) {
              delete this.$events[name];
            }
          } else if (list === fn || (list.listener && list.listener === fn)) {
            delete this.$events[name];
          }
        }
        return this;
      };
      EventEmitter.prototype.removeAllListeners = function(name) {
        if (name === undefined) {
          this.$events = {};
          return this;
        }
        if (this.$events && this.$events[name]) {
          this.$events[name] = null;
        }
        return this;
      };
      EventEmitter.prototype.listeners = function(name) {
        if (!this.$events) {
          this.$events = {};
        }
        if (!this.$events[name]) {
          this.$events[name] = [];
        }
        if (!isArray(this.$events[name])) {
          this.$events[name] = [this.$events[name]];
        }
        return this.$events[name];
      };
      EventEmitter.prototype.emit = function(name) {
        if (!this.$events) {
          return false;
        }
        var handler = this.$events[name];
        if (!handler) {
          return false;
        }
        var args = Array.prototype.slice.call(arguments, 1);
        if (typeof handler === 'function') {
          handler.apply(this, args);
        } else if (isArray(handler)) {
          var listeners = handler.slice();
          for (var i = 0,
              l = listeners.length; i < l; i++) {
            listeners[i].apply(this, args);
          }
        } else {
          return false;
        }
        return true;
      };
    }, {}],
    4: [function(require, module, exports) {
      module.exports = Progress;
      function Progress() {
        this.percent = 0;
        this.size(0);
        this.fontSize(11);
        this.font('helvetica, arial, sans-serif');
      }
      Progress.prototype.size = function(size) {
        this._size = size;
        return this;
      };
      Progress.prototype.text = function(text) {
        this._text = text;
        return this;
      };
      Progress.prototype.fontSize = function(size) {
        this._fontSize = size;
        return this;
      };
      Progress.prototype.font = function(family) {
        this._font = family;
        return this;
      };
      Progress.prototype.update = function(n) {
        this.percent = n;
        return this;
      };
      Progress.prototype.draw = function(ctx) {
        try {
          var percent = Math.min(this.percent, 100);
          var size = this._size;
          var half = size / 2;
          var x = half;
          var y = half;
          var rad = half - 1;
          var fontSize = this._fontSize;
          ctx.font = fontSize + 'px ' + this._font;
          var angle = Math.PI * 2 * (percent / 100);
          ctx.clearRect(0, 0, size, size);
          ctx.strokeStyle = '#9f9f9f';
          ctx.beginPath();
          ctx.arc(x, y, rad, 0, angle, false);
          ctx.stroke();
          ctx.strokeStyle = '#eee';
          ctx.beginPath();
          ctx.arc(x, y, rad - 1, 0, angle, true);
          ctx.stroke();
          var text = this._text || (percent | 0) + '%';
          var w = ctx.measureText(text).width;
          ctx.fillText(text, x - w / 2 + 1, y + fontSize / 2 - 1);
        } catch (err) {}
        return this;
      };
    }, {}],
    5: [function(require, module, exports) {
      (function(global) {
        exports.isatty = function isatty() {
          return true;
        };
        exports.getWindowSize = function getWindowSize() {
          if ('innerHeight' in global) {
            return [global.innerHeight, global.innerWidth];
          }
          return [640, 480];
        };
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}],
    6: [function(require, module, exports) {
      module.exports = Context;
      function Context() {}
      Context.prototype.runnable = function(runnable) {
        if (!arguments.length) {
          return this._runnable;
        }
        this.test = this._runnable = runnable;
        return this;
      };
      Context.prototype.timeout = function(ms) {
        if (!arguments.length) {
          return this.runnable().timeout();
        }
        this.runnable().timeout(ms);
        return this;
      };
      Context.prototype.enableTimeouts = function(enabled) {
        this.runnable().enableTimeouts(enabled);
        return this;
      };
      Context.prototype.slow = function(ms) {
        this.runnable().slow(ms);
        return this;
      };
      Context.prototype.skip = function() {
        this.runnable().skip();
        return this;
      };
      Context.prototype.retries = function(n) {
        if (!arguments.length) {
          return this.runnable().retries();
        }
        this.runnable().retries(n);
        return this;
      };
      Context.prototype.inspect = function() {
        return JSON.stringify(this, function(key, val) {
          return key === 'runnable' || key === 'test' ? undefined : val;
        }, 2);
      };
    }, {}],
    7: [function(require, module, exports) {
      var Runnable = require('./runnable');
      var inherits = require('./utils').inherits;
      module.exports = Hook;
      function Hook(title, fn) {
        Runnable.call(this, title, fn);
        this.type = 'hook';
      }
      inherits(Hook, Runnable);
      Hook.prototype.error = function(err) {
        if (!arguments.length) {
          err = this._error;
          this._error = null;
          return err;
        }
        this._error = err;
      };
    }, {
      "./runnable": 35,
      "./utils": 39
    }],
    8: [function(require, module, exports) {
      var Suite = require('../suite');
      var Test = require('../test');
      var escapeRe = require('escape-string-regexp');
      module.exports = function(suite) {
        var suites = [suite];
        suite.on('pre-require', function(context, file, mocha) {
          var common = require('./common')(suites, context);
          context.before = common.before;
          context.after = common.after;
          context.beforeEach = common.beforeEach;
          context.afterEach = common.afterEach;
          context.run = mocha.options.delay && common.runWithSuite(suite);
          context.describe = context.context = function(title, fn) {
            var suite = Suite.create(suites[0], title);
            suite.file = file;
            suites.unshift(suite);
            fn.call(suite);
            suites.shift();
            return suite;
          };
          context.xdescribe = context.xcontext = context.describe.skip = function(title, fn) {
            var suite = Suite.create(suites[0], title);
            suite.pending = true;
            suites.unshift(suite);
            fn.call(suite);
            suites.shift();
          };
          context.describe.only = function(title, fn) {
            var suite = context.describe(title, fn);
            mocha.grep(suite.fullTitle());
            return suite;
          };
          var it = context.it = context.specify = function(title, fn) {
            var suite = suites[0];
            if (suite.pending) {
              fn = null;
            }
            var test = new Test(title, fn);
            test.file = file;
            suite.addTest(test);
            return test;
          };
          context.it.only = function(title, fn) {
            var test = it(title, fn);
            var reString = '^' + escapeRe(test.fullTitle()) + '$';
            mocha.grep(new RegExp(reString));
            return test;
          };
          context.xit = context.xspecify = context.it.skip = function(title) {
            context.it(title);
          };
          context.it.retries = function(n) {
            context.retries(n);
          };
        });
      };
    }, {
      "../suite": 37,
      "../test": 38,
      "./common": 9,
      "escape-string-regexp": 68
    }],
    9: [function(require, module, exports) {
      'use strict';
      module.exports = function(suites, context) {
        return {
          runWithSuite: function runWithSuite(suite) {
            return function run() {
              suite.run();
            };
          },
          before: function(name, fn) {
            suites[0].beforeAll(name, fn);
          },
          after: function(name, fn) {
            suites[0].afterAll(name, fn);
          },
          beforeEach: function(name, fn) {
            suites[0].beforeEach(name, fn);
          },
          afterEach: function(name, fn) {
            suites[0].afterEach(name, fn);
          },
          test: {
            skip: function(title) {
              context.test(title);
            },
            retries: function(n) {
              context.retries(n);
            }
          }
        };
      };
    }, {}],
    10: [function(require, module, exports) {
      var Suite = require('../suite');
      var Test = require('../test');
      module.exports = function(suite) {
        var suites = [suite];
        suite.on('require', visit);
        function visit(obj, file) {
          var suite;
          for (var key in obj) {
            if (typeof obj[key] === 'function') {
              var fn = obj[key];
              switch (key) {
                case 'before':
                  suites[0].beforeAll(fn);
                  break;
                case 'after':
                  suites[0].afterAll(fn);
                  break;
                case 'beforeEach':
                  suites[0].beforeEach(fn);
                  break;
                case 'afterEach':
                  suites[0].afterEach(fn);
                  break;
                default:
                  var test = new Test(key, fn);
                  test.file = file;
                  suites[0].addTest(test);
              }
            } else {
              suite = Suite.create(suites[0], key);
              suites.unshift(suite);
              visit(obj[key], file);
              suites.shift();
            }
          }
        }
      };
    }, {
      "../suite": 37,
      "../test": 38
    }],
    11: [function(require, module, exports) {
      exports.bdd = require('./bdd');
      exports.tdd = require('./tdd');
      exports.qunit = require('./qunit');
      exports.exports = require('./exports');
    }, {
      "./bdd": 8,
      "./exports": 10,
      "./qunit": 12,
      "./tdd": 13
    }],
    12: [function(require, module, exports) {
      var Suite = require('../suite');
      var Test = require('../test');
      var escapeRe = require('escape-string-regexp');
      module.exports = function(suite) {
        var suites = [suite];
        suite.on('pre-require', function(context, file, mocha) {
          var common = require('./common')(suites, context);
          context.before = common.before;
          context.after = common.after;
          context.beforeEach = common.beforeEach;
          context.afterEach = common.afterEach;
          context.run = mocha.options.delay && common.runWithSuite(suite);
          context.suite = function(title) {
            if (suites.length > 1) {
              suites.shift();
            }
            var suite = Suite.create(suites[0], title);
            suite.file = file;
            suites.unshift(suite);
            return suite;
          };
          context.suite.only = function(title, fn) {
            var suite = context.suite(title, fn);
            mocha.grep(suite.fullTitle());
          };
          context.test = function(title, fn) {
            var test = new Test(title, fn);
            test.file = file;
            suites[0].addTest(test);
            return test;
          };
          context.test.only = function(title, fn) {
            var test = context.test(title, fn);
            var reString = '^' + escapeRe(test.fullTitle()) + '$';
            mocha.grep(new RegExp(reString));
          };
          context.test.skip = common.test.skip;
          context.test.retries = common.test.retries;
        });
      };
    }, {
      "../suite": 37,
      "../test": 38,
      "./common": 9,
      "escape-string-regexp": 68
    }],
    13: [function(require, module, exports) {
      var Suite = require('../suite');
      var Test = require('../test');
      var escapeRe = require('escape-string-regexp');
      module.exports = function(suite) {
        var suites = [suite];
        suite.on('pre-require', function(context, file, mocha) {
          var common = require('./common')(suites, context);
          context.setup = common.beforeEach;
          context.teardown = common.afterEach;
          context.suiteSetup = common.before;
          context.suiteTeardown = common.after;
          context.run = mocha.options.delay && common.runWithSuite(suite);
          context.suite = function(title, fn) {
            var suite = Suite.create(suites[0], title);
            suite.file = file;
            suites.unshift(suite);
            fn.call(suite);
            suites.shift();
            return suite;
          };
          context.suite.skip = function(title, fn) {
            var suite = Suite.create(suites[0], title);
            suite.pending = true;
            suites.unshift(suite);
            fn.call(suite);
            suites.shift();
          };
          context.suite.only = function(title, fn) {
            var suite = context.suite(title, fn);
            mocha.grep(suite.fullTitle());
          };
          context.test = function(title, fn) {
            var suite = suites[0];
            if (suite.pending) {
              fn = null;
            }
            var test = new Test(title, fn);
            test.file = file;
            suite.addTest(test);
            return test;
          };
          context.test.only = function(title, fn) {
            var test = context.test(title, fn);
            var reString = '^' + escapeRe(test.fullTitle()) + '$';
            mocha.grep(new RegExp(reString));
          };
          context.test.skip = common.test.skip;
          context.test.retries = common.test.retries;
        });
      };
    }, {
      "../suite": 37,
      "../test": 38,
      "./common": 9,
      "escape-string-regexp": 68
    }],
    14: [function(require, module, exports) {
      (function(process, global, __dirname) {
        var escapeRe = require('escape-string-regexp');
        var path = require('path');
        var reporters = require('./reporters');
        var utils = require('./utils');
        exports = module.exports = Mocha;
        if (!process.browser) {
          var cwd = process.cwd();
          module.paths.push(cwd, path.join(cwd, 'node_modules'));
        }
        exports.utils = utils;
        exports.interfaces = require('./interfaces');
        exports.reporters = reporters;
        exports.Runnable = require('./runnable');
        exports.Context = require('./context');
        exports.Runner = require('./runner');
        exports.Suite = require('./suite');
        exports.Hook = require('./hook');
        exports.Test = require('./test');
        function image(name) {
          return path.join(__dirname, '../images', name + '.png');
        }
        function Mocha(options) {
          options = options || {};
          this.files = [];
          this.options = options;
          if (options.grep) {
            this.grep(new RegExp(options.grep));
          }
          if (options.fgrep) {
            this.grep(options.fgrep);
          }
          this.suite = new exports.Suite('', new exports.Context());
          this.ui(options.ui);
          this.bail(options.bail);
          this.reporter(options.reporter, options.reporterOptions);
          if (typeof options.timeout !== 'undefined' && options.timeout !== null) {
            this.timeout(options.timeout);
          }
          if (typeof options.retries !== 'undefined' && options.retries !== null) {
            this.retries(options.retries);
          }
          this.useColors(options.useColors);
          if (options.enableTimeouts !== null) {
            this.enableTimeouts(options.enableTimeouts);
          }
          if (options.slow) {
            this.slow(options.slow);
          }
          this.suite.on('pre-require', function(context) {
            exports.afterEach = context.afterEach || context.teardown;
            exports.after = context.after || context.suiteTeardown;
            exports.beforeEach = context.beforeEach || context.setup;
            exports.before = context.before || context.suiteSetup;
            exports.describe = context.describe || context.suite;
            exports.it = context.it || context.test;
            exports.setup = context.setup || context.beforeEach;
            exports.suiteSetup = context.suiteSetup || context.before;
            exports.suiteTeardown = context.suiteTeardown || context.after;
            exports.suite = context.suite || context.describe;
            exports.teardown = context.teardown || context.afterEach;
            exports.test = context.test || context.it;
            exports.run = context.run;
          });
        }
        Mocha.prototype.bail = function(bail) {
          if (!arguments.length) {
            bail = true;
          }
          this.suite.bail(bail);
          return this;
        };
        Mocha.prototype.addFile = function(file) {
          this.files.push(file);
          return this;
        };
        Mocha.prototype.reporter = function(reporter, reporterOptions) {
          if (typeof reporter === 'function') {
            this._reporter = reporter;
          } else {
            reporter = reporter || 'spec';
            var _reporter;
            if (reporters[reporter]) {
              _reporter = reporters[reporter];
            }
            if (!_reporter) {
              try {
                _reporter = require(reporter);
              } catch (err) {
                err.message.indexOf('Cannot find module') !== -1 ? console.warn('"' + reporter + '" reporter not found') : console.warn('"' + reporter + '" reporter blew up with error:\n' + err.stack);
              }
            }
            if (!_reporter && reporter === 'teamcity') {
              console.warn('The Teamcity reporter was moved to a package named ' + 'mocha-teamcity-reporter ' + '(https://npmjs.org/package/mocha-teamcity-reporter).');
            }
            if (!_reporter) {
              throw new Error('invalid reporter "' + reporter + '"');
            }
            this._reporter = _reporter;
          }
          this.options.reporterOptions = reporterOptions;
          return this;
        };
        Mocha.prototype.ui = function(name) {
          name = name || 'bdd';
          this._ui = exports.interfaces[name];
          if (!this._ui) {
            try {
              this._ui = require(name);
            } catch (err) {
              throw new Error('invalid interface "' + name + '"');
            }
          }
          this._ui = this._ui(this.suite);
          return this;
        };
        Mocha.prototype.loadFiles = function(fn) {
          var self = this;
          var suite = this.suite;
          this.files.forEach(function(file) {
            file = path.resolve(file);
            suite.emit('pre-require', global, file, self);
            suite.emit('require', require(file), file, self);
            suite.emit('post-require', global, file, self);
          });
          fn && fn();
        };
        Mocha.prototype._growl = function(runner, reporter) {
          var notify = require('growl');
          runner.on('end', function() {
            var stats = reporter.stats;
            if (stats.failures) {
              var msg = stats.failures + ' of ' + runner.total + ' tests failed';
              notify(msg, {
                name: 'mocha',
                title: 'Failed',
                image: image('error')
              });
            } else {
              notify(stats.passes + ' tests passed in ' + stats.duration + 'ms', {
                name: 'mocha',
                title: 'Passed',
                image: image('ok')
              });
            }
          });
        };
        Mocha.prototype.grep = function(re) {
          this.options.grep = typeof re === 'string' ? new RegExp(escapeRe(re)) : re;
          return this;
        };
        Mocha.prototype.invert = function() {
          this.options.invert = true;
          return this;
        };
        Mocha.prototype.ignoreLeaks = function(ignore) {
          this.options.ignoreLeaks = Boolean(ignore);
          return this;
        };
        Mocha.prototype.checkLeaks = function() {
          this.options.ignoreLeaks = false;
          return this;
        };
        Mocha.prototype.fullTrace = function() {
          this.options.fullStackTrace = true;
          return this;
        };
        Mocha.prototype.growl = function() {
          this.options.growl = true;
          return this;
        };
        Mocha.prototype.globals = function(globals) {
          this.options.globals = (this.options.globals || []).concat(globals);
          return this;
        };
        Mocha.prototype.useColors = function(colors) {
          if (colors !== undefined) {
            this.options.useColors = colors;
          }
          return this;
        };
        Mocha.prototype.useInlineDiffs = function(inlineDiffs) {
          this.options.useInlineDiffs = inlineDiffs !== undefined && inlineDiffs;
          return this;
        };
        Mocha.prototype.timeout = function(timeout) {
          this.suite.timeout(timeout);
          return this;
        };
        Mocha.prototype.retries = function(n) {
          this.suite.retries(n);
          return this;
        };
        Mocha.prototype.slow = function(slow) {
          this.suite.slow(slow);
          return this;
        };
        Mocha.prototype.enableTimeouts = function(enabled) {
          this.suite.enableTimeouts(arguments.length && enabled !== undefined ? enabled : true);
          return this;
        };
        Mocha.prototype.asyncOnly = function() {
          this.options.asyncOnly = true;
          return this;
        };
        Mocha.prototype.noHighlighting = function() {
          this.options.noHighlighting = true;
          return this;
        };
        Mocha.prototype.allowUncaught = function() {
          this.options.allowUncaught = true;
          return this;
        };
        Mocha.prototype.delay = function delay() {
          this.options.delay = true;
          return this;
        };
        Mocha.prototype.run = function(fn) {
          if (this.files.length) {
            this.loadFiles();
          }
          var suite = this.suite;
          var options = this.options;
          options.files = this.files;
          var runner = new exports.Runner(suite, options.delay);
          var reporter = new this._reporter(runner, options);
          runner.ignoreLeaks = options.ignoreLeaks !== false;
          runner.fullStackTrace = options.fullStackTrace;
          runner.asyncOnly = options.asyncOnly;
          runner.allowUncaught = options.allowUncaught;
          if (options.grep) {
            runner.grep(options.grep, options.invert);
          }
          if (options.globals) {
            runner.globals(options.globals);
          }
          if (options.growl) {
            this._growl(runner, reporter);
          }
          if (options.useColors !== undefined) {
            exports.reporters.Base.useColors = options.useColors;
          }
          exports.reporters.Base.inlineDiffs = options.useInlineDiffs;
          function done(failures) {
            if (reporter.done) {
              reporter.done(failures, fn);
            } else {
              fn && fn(failures);
            }
          }
          return runner.run(done);
        };
      }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, "/lib");
    }, {
      "./context": 6,
      "./hook": 7,
      "./interfaces": 11,
      "./reporters": 22,
      "./runnable": 35,
      "./runner": 36,
      "./suite": 37,
      "./test": 38,
      "./utils": 39,
      "_process": 51,
      "escape-string-regexp": 68,
      "growl": 69,
      "path": 41
    }],
    15: [function(require, module, exports) {
      var s = 1000;
      var m = s * 60;
      var h = m * 60;
      var d = h * 24;
      var y = d * 365.25;
      module.exports = function(val, options) {
        options = options || {};
        if (typeof val === 'string') {
          return parse(val);
        }
        return options['long'] ? longFormat(val) : shortFormat(val);
      };
      function parse(str) {
        var match = (/^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i).exec(str);
        if (!match) {
          return;
        }
        var n = parseFloat(match[1]);
        var type = (match[2] || 'ms').toLowerCase();
        switch (type) {
          case 'years':
          case 'year':
          case 'y':
            return n * y;
          case 'days':
          case 'day':
          case 'd':
            return n * d;
          case 'hours':
          case 'hour':
          case 'h':
            return n * h;
          case 'minutes':
          case 'minute':
          case 'm':
            return n * m;
          case 'seconds':
          case 'second':
          case 's':
            return n * s;
          case 'ms':
            return n;
          default:
        }
      }
      function shortFormat(ms) {
        if (ms >= d) {
          return Math.round(ms / d) + 'd';
        }
        if (ms >= h) {
          return Math.round(ms / h) + 'h';
        }
        if (ms >= m) {
          return Math.round(ms / m) + 'm';
        }
        if (ms >= s) {
          return Math.round(ms / s) + 's';
        }
        return ms + 'ms';
      }
      function longFormat(ms) {
        return plural(ms, d, 'day') || plural(ms, h, 'hour') || plural(ms, m, 'minute') || plural(ms, s, 'second') || ms + ' ms';
      }
      function plural(ms, n, name) {
        if (ms < n) {
          return;
        }
        if (ms < n * 1.5) {
          return Math.floor(ms / n) + ' ' + name;
        }
        return Math.ceil(ms / n) + ' ' + name + 's';
      }
    }, {}],
    16: [function(require, module, exports) {
      module.exports = Pending;
      function Pending(message) {
        this.message = message;
      }
    }, {}],
    17: [function(require, module, exports) {
      (function(process, global) {
        var tty = require('tty');
        var diff = require('diff');
        var ms = require('../ms');
        var utils = require('../utils');
        var supportsColor = process.browser ? null : require('supports-color');
        exports = module.exports = Base;
        var Date = global.Date;
        var setTimeout = global.setTimeout;
        var setInterval = global.setInterval;
        var clearTimeout = global.clearTimeout;
        var clearInterval = global.clearInterval;
        var isatty = tty.isatty(1) && tty.isatty(2);
        exports.useColors = !process.browser && (supportsColor || (process.env.MOCHA_COLORS !== undefined));
        exports.inlineDiffs = false;
        exports.colors = {
          pass: 90,
          fail: 31,
          'bright pass': 92,
          'bright fail': 91,
          'bright yellow': 93,
          pending: 36,
          suite: 0,
          'error title': 0,
          'error message': 31,
          'error stack': 90,
          checkmark: 32,
          fast: 90,
          medium: 33,
          slow: 31,
          green: 32,
          light: 90,
          'diff gutter': 90,
          'diff added': 32,
          'diff removed': 31
        };
        exports.symbols = {
          ok: '✓',
          err: '✖',
          dot: '․'
        };
        if (process.platform === 'win32') {
          exports.symbols.ok = '\u221A';
          exports.symbols.err = '\u00D7';
          exports.symbols.dot = '.';
        }
        var color = exports.color = function(type, str) {
          if (!exports.useColors) {
            return String(str);
          }
          return '\u001b[' + exports.colors[type] + 'm' + str + '\u001b[0m';
        };
        exports.window = {width: 75};
        if (isatty) {
          exports.window.width = process.stdout.getWindowSize ? process.stdout.getWindowSize(1)[0] : tty.getWindowSize()[1];
        }
        exports.cursor = {
          hide: function() {
            isatty && process.stdout.write('\u001b[?25l');
          },
          show: function() {
            isatty && process.stdout.write('\u001b[?25h');
          },
          deleteLine: function() {
            isatty && process.stdout.write('\u001b[2K');
          },
          beginningOfLine: function() {
            isatty && process.stdout.write('\u001b[0G');
          },
          CR: function() {
            if (isatty) {
              exports.cursor.deleteLine();
              exports.cursor.beginningOfLine();
            } else {
              process.stdout.write('\r');
            }
          }
        };
        exports.list = function(failures) {
          console.log();
          failures.forEach(function(test, i) {
            var fmt = color('error title', '  %s) %s:\n') + color('error message', '     %s') + color('error stack', '\n%s\n');
            var msg;
            var err = test.err;
            var message;
            if (err.message) {
              message = err.message;
            } else if (typeof err.inspect === 'function') {
              message = err.inspect() + '';
            } else {
              message = '';
            }
            var stack = err.stack || message;
            var index = stack.indexOf(message);
            var actual = err.actual;
            var expected = err.expected;
            var escape = true;
            if (index === -1) {
              msg = message;
            } else {
              index += message.length;
              msg = stack.slice(0, index);
              stack = stack.slice(index + 1);
            }
            if (err.uncaught) {
              msg = 'Uncaught ' + msg;
            }
            if (err.showDiff !== false && sameType(actual, expected) && expected !== undefined) {
              escape = false;
              if (!(utils.isString(actual) && utils.isString(expected))) {
                err.actual = actual = utils.stringify(actual);
                err.expected = expected = utils.stringify(expected);
              }
              fmt = color('error title', '  %s) %s:\n%s') + color('error stack', '\n%s\n');
              var match = message.match(/^([^:]+): expected/);
              msg = '\n      ' + color('error message', match ? match[1] : msg);
              if (exports.inlineDiffs) {
                msg += inlineDiff(err, escape);
              } else {
                msg += unifiedDiff(err, escape);
              }
            }
            stack = stack.replace(/^/gm, '  ');
            console.log(fmt, (i + 1), test.fullTitle(), msg, stack);
          });
        };
        function Base(runner) {
          var stats = this.stats = {
            suites: 0,
            tests: 0,
            passes: 0,
            pending: 0,
            failures: 0
          };
          var failures = this.failures = [];
          if (!runner) {
            return;
          }
          this.runner = runner;
          runner.stats = stats;
          runner.on('start', function() {
            stats.start = new Date();
          });
          runner.on('suite', function(suite) {
            stats.suites = stats.suites || 0;
            suite.root || stats.suites++;
          });
          runner.on('test end', function() {
            stats.tests = stats.tests || 0;
            stats.tests++;
          });
          runner.on('pass', function(test) {
            stats.passes = stats.passes || 0;
            if (test.duration > test.slow()) {
              test.speed = 'slow';
            } else if (test.duration > test.slow() / 2) {
              test.speed = 'medium';
            } else {
              test.speed = 'fast';
            }
            stats.passes++;
          });
          runner.on('fail', function(test, err) {
            stats.failures = stats.failures || 0;
            stats.failures++;
            test.err = err;
            failures.push(test);
          });
          runner.on('end', function() {
            stats.end = new Date();
            stats.duration = new Date() - stats.start;
          });
          runner.on('pending', function() {
            stats.pending++;
          });
        }
        Base.prototype.epilogue = function() {
          var stats = this.stats;
          var fmt;
          console.log();
          fmt = color('bright pass', ' ') + color('green', ' %d passing') + color('light', ' (%s)');
          console.log(fmt, stats.passes || 0, ms(stats.duration));
          if (stats.pending) {
            fmt = color('pending', ' ') + color('pending', ' %d pending');
            console.log(fmt, stats.pending);
          }
          if (stats.failures) {
            fmt = color('fail', '  %d failing');
            console.log(fmt, stats.failures);
            Base.list(this.failures);
            console.log();
          }
          console.log();
        };
        function pad(str, len) {
          str = String(str);
          return Array(len - str.length + 1).join(' ') + str;
        }
        function inlineDiff(err, escape) {
          var msg = errorDiff(err, 'WordsWithSpace', escape);
          var lines = msg.split('\n');
          if (lines.length > 4) {
            var width = String(lines.length).length;
            msg = lines.map(function(str, i) {
              return pad(++i, width) + ' |' + ' ' + str;
            }).join('\n');
          }
          msg = '\n' + color('diff removed', 'actual') + ' ' + color('diff added', 'expected') + '\n\n' + msg + '\n';
          msg = msg.replace(/^/gm, '      ');
          return msg;
        }
        function unifiedDiff(err, escape) {
          var indent = '      ';
          function cleanUp(line) {
            if (escape) {
              line = escapeInvisibles(line);
            }
            if (line[0] === '+') {
              return indent + colorLines('diff added', line);
            }
            if (line[0] === '-') {
              return indent + colorLines('diff removed', line);
            }
            if (line.match(/\@\@/)) {
              return null;
            }
            if (line.match(/\\ No newline/)) {
              return null;
            }
            return indent + line;
          }
          function notBlank(line) {
            return typeof line !== 'undefined' && line !== null;
          }
          var msg = diff.createPatch('string', err.actual, err.expected);
          var lines = msg.split('\n').splice(4);
          return '\n      ' + colorLines('diff added', '+ expected') + ' ' + colorLines('diff removed', '- actual') + '\n\n' + lines.map(cleanUp).filter(notBlank).join('\n');
        }
        function errorDiff(err, type, escape) {
          var actual = escape ? escapeInvisibles(err.actual) : err.actual;
          var expected = escape ? escapeInvisibles(err.expected) : err.expected;
          return diff['diff' + type](actual, expected).map(function(str) {
            if (str.added) {
              return colorLines('diff added', str.value);
            }
            if (str.removed) {
              return colorLines('diff removed', str.value);
            }
            return str.value;
          }).join('');
        }
        function escapeInvisibles(line) {
          return line.replace(/\t/g, '<tab>').replace(/\r/g, '<CR>').replace(/\n/g, '<LF>\n');
        }
        function colorLines(name, str) {
          return str.split('\n').map(function(str) {
            return color(name, str);
          }).join('\n');
        }
        var objToString = Object.prototype.toString;
        function sameType(a, b) {
          return objToString.call(a) === objToString.call(b);
        }
      }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "../ms": 15,
      "../utils": 39,
      "_process": 51,
      "diff": 67,
      "supports-color": 41,
      "tty": 5
    }],
    18: [function(require, module, exports) {
      var Base = require('./base');
      var utils = require('../utils');
      exports = module.exports = Doc;
      function Doc(runner) {
        Base.call(this, runner);
        var indents = 2;
        function indent() {
          return Array(indents).join('  ');
        }
        runner.on('suite', function(suite) {
          if (suite.root) {
            return;
          }
          ++indents;
          console.log('%s<section class="suite">', indent());
          ++indents;
          console.log('%s<h1>%s</h1>', indent(), utils.escape(suite.title));
          console.log('%s<dl>', indent());
        });
        runner.on('suite end', function(suite) {
          if (suite.root) {
            return;
          }
          console.log('%s</dl>', indent());
          --indents;
          console.log('%s</section>', indent());
          --indents;
        });
        runner.on('pass', function(test) {
          console.log('%s  <dt>%s</dt>', indent(), utils.escape(test.title));
          var code = utils.escape(utils.clean(test.body));
          console.log('%s  <dd><pre><code>%s</code></pre></dd>', indent(), code);
        });
        runner.on('fail', function(test, err) {
          console.log('%s  <dt class="error">%s</dt>', indent(), utils.escape(test.title));
          var code = utils.escape(utils.clean(test.fn.body));
          console.log('%s  <dd class="error"><pre><code>%s</code></pre></dd>', indent(), code);
          console.log('%s  <dd class="error">%s</dd>', indent(), utils.escape(err));
        });
      }
    }, {
      "../utils": 39,
      "./base": 17
    }],
    19: [function(require, module, exports) {
      (function(process) {
        var Base = require('./base');
        var inherits = require('../utils').inherits;
        var color = Base.color;
        exports = module.exports = Dot;
        function Dot(runner) {
          Base.call(this, runner);
          var self = this;
          var width = Base.window.width * .75 | 0;
          var n = -1;
          runner.on('start', function() {
            process.stdout.write('\n');
          });
          runner.on('pending', function() {
            if (++n % width === 0) {
              process.stdout.write('\n  ');
            }
            process.stdout.write(color('pending', Base.symbols.dot));
          });
          runner.on('pass', function(test) {
            if (++n % width === 0) {
              process.stdout.write('\n  ');
            }
            if (test.speed === 'slow') {
              process.stdout.write(color('bright yellow', Base.symbols.dot));
            } else {
              process.stdout.write(color(test.speed, Base.symbols.dot));
            }
          });
          runner.on('fail', function() {
            if (++n % width === 0) {
              process.stdout.write('\n  ');
            }
            process.stdout.write(color('fail', Base.symbols.dot));
          });
          runner.on('end', function() {
            console.log();
            self.epilogue();
          });
        }
        inherits(Dot, Base);
      }).call(this, require('_process'));
    }, {
      "../utils": 39,
      "./base": 17,
      "_process": 51
    }],
    20: [function(require, module, exports) {
      (function(process, __dirname) {
        var JSONCov = require('./json-cov');
        var readFileSync = require('fs').readFileSync;
        var join = require('path').join;
        exports = module.exports = HTMLCov;
        function HTMLCov(runner) {
          var jade = require('jade');
          var file = join(__dirname, '/templates/coverage.jade');
          var str = readFileSync(file, 'utf8');
          var fn = jade.compile(str, {filename: file});
          var self = this;
          JSONCov.call(this, runner, false);
          runner.on('end', function() {
            process.stdout.write(fn({
              cov: self.cov,
              coverageClass: coverageClass
            }));
          });
        }
        function coverageClass(coveragePctg) {
          if (coveragePctg >= 75) {
            return 'high';
          }
          if (coveragePctg >= 50) {
            return 'medium';
          }
          if (coveragePctg >= 25) {
            return 'low';
          }
          return 'terrible';
        }
      }).call(this, require('_process'), "/lib/reporters");
    }, {
      "./json-cov": 23,
      "_process": 51,
      "fs": 41,
      "jade": 41,
      "path": 41
    }],
    21: [function(require, module, exports) {
      (function(global) {
        var Base = require('./base');
        var utils = require('../utils');
        var Progress = require('../browser/progress');
        var escapeRe = require('escape-string-regexp');
        var escape = utils.escape;
        var Date = global.Date;
        var setTimeout = global.setTimeout;
        var setInterval = global.setInterval;
        var clearTimeout = global.clearTimeout;
        var clearInterval = global.clearInterval;
        exports = module.exports = HTML;
        var statsTemplate = '<ul id="mocha-stats">' + '<li class="progress"><canvas width="40" height="40"></canvas></li>' + '<li class="passes"><a href="javascript:void(0);">passes:</a> <em>0</em></li>' + '<li class="failures"><a href="javascript:void(0);">failures:</a> <em>0</em></li>' + '<li class="duration">duration: <em>0</em>s</li>' + '</ul>';
        function HTML(runner) {
          Base.call(this, runner);
          var self = this;
          var stats = this.stats;
          var stat = fragment(statsTemplate);
          var items = stat.getElementsByTagName('li');
          var passes = items[1].getElementsByTagName('em')[0];
          var passesLink = items[1].getElementsByTagName('a')[0];
          var failures = items[2].getElementsByTagName('em')[0];
          var failuresLink = items[2].getElementsByTagName('a')[0];
          var duration = items[3].getElementsByTagName('em')[0];
          var canvas = stat.getElementsByTagName('canvas')[0];
          var report = fragment('<ul id="mocha-report"></ul>');
          var stack = [report];
          var progress;
          var ctx;
          var root = document.getElementById('mocha');
          if (canvas.getContext) {
            var ratio = window.devicePixelRatio || 1;
            canvas.style.width = canvas.width;
            canvas.style.height = canvas.height;
            canvas.width *= ratio;
            canvas.height *= ratio;
            ctx = canvas.getContext('2d');
            ctx.scale(ratio, ratio);
            progress = new Progress();
          }
          if (!root) {
            return error('#mocha div missing, add it to your document');
          }
          on(passesLink, 'click', function() {
            unhide();
            var name = (/pass/).test(report.className) ? '' : ' pass';
            report.className = report.className.replace(/fail|pass/g, '') + name;
            if (report.className.trim()) {
              hideSuitesWithout('test pass');
            }
          });
          on(failuresLink, 'click', function() {
            unhide();
            var name = (/fail/).test(report.className) ? '' : ' fail';
            report.className = report.className.replace(/fail|pass/g, '') + name;
            if (report.className.trim()) {
              hideSuitesWithout('test fail');
            }
          });
          root.appendChild(stat);
          root.appendChild(report);
          if (progress) {
            progress.size(40);
          }
          runner.on('suite', function(suite) {
            if (suite.root) {
              return;
            }
            var url = self.suiteURL(suite);
            var el = fragment('<li class="suite"><h1><a href="%s">%s</a></h1></li>', url, escape(suite.title));
            stack[0].appendChild(el);
            stack.unshift(document.createElement('ul'));
            el.appendChild(stack[0]);
          });
          runner.on('suite end', function(suite) {
            if (suite.root) {
              return;
            }
            stack.shift();
          });
          runner.on('fail', function(test) {
            if (test.type === 'hook' || test.type === 'test') {
              runner.emit('test end', test);
            }
          });
          runner.on('test end', function(test) {
            var percent = stats.tests / this.total * 100 | 0;
            if (progress) {
              progress.update(percent).draw(ctx);
            }
            var ms = new Date() - stats.start;
            text(passes, stats.passes);
            text(failures, stats.failures);
            text(duration, (ms / 1000).toFixed(2));
            var el;
            if (test.state === 'passed') {
              var url = self.testURL(test);
              el = fragment('<li class="test pass %e"><h2>%e<span class="duration">%ems</span> <a href="%s" class="replay">‣</a></h2></li>', test.speed, test.title, test.duration, url);
            } else if (test.pending) {
              el = fragment('<li class="test pass pending"><h2>%e</h2></li>', test.title);
            } else {
              el = fragment('<li class="test fail"><h2>%e <a href="%e" class="replay">‣</a></h2></li>', test.title, self.testURL(test));
              var stackString;
              var message = test.err.toString();
              if (message === '[object Error]') {
                message = test.err.message;
              }
              if (test.err.stack) {
                var indexOfMessage = test.err.stack.indexOf(test.err.message);
                if (indexOfMessage === -1) {
                  stackString = test.err.stack;
                } else {
                  stackString = test.err.stack.substr(test.err.message.length + indexOfMessage);
                }
              } else if (test.err.sourceURL && test.err.line !== undefined) {
                stackString = '\n(' + test.err.sourceURL + ':' + test.err.line + ')';
              }
              stackString = stackString || '';
              if (test.err.htmlMessage && stackString) {
                el.appendChild(fragment('<div class="html-error">%s\n<pre class="error">%e</pre></div>', test.err.htmlMessage, stackString));
              } else if (test.err.htmlMessage) {
                el.appendChild(fragment('<div class="html-error">%s</div>', test.err.htmlMessage));
              } else {
                el.appendChild(fragment('<pre class="error">%e%e</pre>', message, stackString));
              }
            }
            if (!test.pending) {
              var h2 = el.getElementsByTagName('h2')[0];
              on(h2, 'click', function() {
                pre.style.display = pre.style.display === 'none' ? 'block' : 'none';
              });
              var pre = fragment('<pre><code>%e</code></pre>', utils.clean(test.body));
              el.appendChild(pre);
              pre.style.display = 'none';
            }
            if (stack[0]) {
              stack[0].appendChild(el);
            }
          });
        }
        function makeUrl(s) {
          var search = window.location.search;
          if (search) {
            search = search.replace(/[?&]grep=[^&\s]*/g, '').replace(/^&/, '?');
          }
          return window.location.pathname + (search ? search + '&' : '?') + 'grep=' + encodeURIComponent(escapeRe(s));
        }
        HTML.prototype.suiteURL = function(suite) {
          return makeUrl(suite.fullTitle());
        };
        HTML.prototype.testURL = function(test) {
          return makeUrl(test.fullTitle());
        };
        function error(msg) {
          document.body.appendChild(fragment('<div id="mocha-error">%s</div>', msg));
        }
        function fragment(html) {
          var args = arguments;
          var div = document.createElement('div');
          var i = 1;
          div.innerHTML = html.replace(/%([se])/g, function(_, type) {
            switch (type) {
              case 's':
                return String(args[i++]);
              case 'e':
                return escape(args[i++]);
            }
          });
          return div.firstChild;
        }
        function hideSuitesWithout(classname) {
          var suites = document.getElementsByClassName('suite');
          for (var i = 0; i < suites.length; i++) {
            var els = suites[i].getElementsByClassName(classname);
            if (!els.length) {
              suites[i].className += ' hidden';
            }
          }
        }
        function unhide() {
          var els = document.getElementsByClassName('suite hidden');
          for (var i = 0; i < els.length; ++i) {
            els[i].className = els[i].className.replace('suite hidden', 'suite');
          }
        }
        function text(el, contents) {
          if (el.textContent) {
            el.textContent = contents;
          } else {
            el.innerText = contents;
          }
        }
        function on(el, event, fn) {
          if (el.addEventListener) {
            el.addEventListener(event, fn, false);
          } else {
            el.attachEvent('on' + event, fn);
          }
        }
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "../browser/progress": 4,
      "../utils": 39,
      "./base": 17,
      "escape-string-regexp": 68
    }],
    22: [function(require, module, exports) {
      exports.Base = exports.base = require('./base');
      exports.Dot = exports.dot = require('./dot');
      exports.Doc = exports.doc = require('./doc');
      exports.TAP = exports.tap = require('./tap');
      exports.JSON = exports.json = require('./json');
      exports.HTML = exports.html = require('./html');
      exports.List = exports.list = require('./list');
      exports.Min = exports.min = require('./min');
      exports.Spec = exports.spec = require('./spec');
      exports.Nyan = exports.nyan = require('./nyan');
      exports.XUnit = exports.xunit = require('./xunit');
      exports.Markdown = exports.markdown = require('./markdown');
      exports.Progress = exports.progress = require('./progress');
      exports.Landing = exports.landing = require('./landing');
      exports.JSONCov = exports['json-cov'] = require('./json-cov');
      exports.HTMLCov = exports['html-cov'] = require('./html-cov');
      exports.JSONStream = exports['json-stream'] = require('./json-stream');
    }, {
      "./base": 17,
      "./doc": 18,
      "./dot": 19,
      "./html": 21,
      "./html-cov": 20,
      "./json": 25,
      "./json-cov": 23,
      "./json-stream": 24,
      "./landing": 26,
      "./list": 27,
      "./markdown": 28,
      "./min": 29,
      "./nyan": 30,
      "./progress": 31,
      "./spec": 32,
      "./tap": 33,
      "./xunit": 34
    }],
    23: [function(require, module, exports) {
      (function(process, global) {
        var Base = require('./base');
        exports = module.exports = JSONCov;
        function JSONCov(runner, output) {
          Base.call(this, runner);
          output = arguments.length === 1 || output;
          var self = this;
          var tests = [];
          var failures = [];
          var passes = [];
          runner.on('test end', function(test) {
            tests.push(test);
          });
          runner.on('pass', function(test) {
            passes.push(test);
          });
          runner.on('fail', function(test) {
            failures.push(test);
          });
          runner.on('end', function() {
            var cov = global._$jscoverage || {};
            var result = self.cov = map(cov);
            result.stats = self.stats;
            result.tests = tests.map(clean);
            result.failures = failures.map(clean);
            result.passes = passes.map(clean);
            if (!output) {
              return;
            }
            process.stdout.write(JSON.stringify(result, null, 2));
          });
        }
        function map(cov) {
          var ret = {
            instrumentation: 'node-jscoverage',
            sloc: 0,
            hits: 0,
            misses: 0,
            coverage: 0,
            files: []
          };
          for (var filename in cov) {
            if (Object.prototype.hasOwnProperty.call(cov, filename)) {
              var data = coverage(filename, cov[filename]);
              ret.files.push(data);
              ret.hits += data.hits;
              ret.misses += data.misses;
              ret.sloc += data.sloc;
            }
          }
          ret.files.sort(function(a, b) {
            return a.filename.localeCompare(b.filename);
          });
          if (ret.sloc > 0) {
            ret.coverage = (ret.hits / ret.sloc) * 100;
          }
          return ret;
        }
        function coverage(filename, data) {
          var ret = {
            filename: filename,
            coverage: 0,
            hits: 0,
            misses: 0,
            sloc: 0,
            source: {}
          };
          data.source.forEach(function(line, num) {
            num++;
            if (data[num] === 0) {
              ret.misses++;
              ret.sloc++;
            } else if (data[num] !== undefined) {
              ret.hits++;
              ret.sloc++;
            }
            ret.source[num] = {
              source: line,
              coverage: data[num] === undefined ? '' : data[num]
            };
          });
          ret.coverage = ret.hits / ret.sloc * 100;
          return ret;
        }
        function clean(test) {
          return {
            duration: test.duration,
            currentRetry: test.currentRetry(),
            fullTitle: test.fullTitle(),
            title: test.title
          };
        }
      }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "./base": 17,
      "_process": 51
    }],
    24: [function(require, module, exports) {
      (function(process) {
        var Base = require('./base');
        exports = module.exports = List;
        function List(runner) {
          Base.call(this, runner);
          var self = this;
          var total = runner.total;
          runner.on('start', function() {
            console.log(JSON.stringify(['start', {total: total}]));
          });
          runner.on('pass', function(test) {
            console.log(JSON.stringify(['pass', clean(test)]));
          });
          runner.on('fail', function(test, err) {
            test = clean(test);
            test.err = err.message;
            test.stack = err.stack || null;
            console.log(JSON.stringify(['fail', test]));
          });
          runner.on('end', function() {
            process.stdout.write(JSON.stringify(['end', self.stats]));
          });
        }
        function clean(test) {
          return {
            title: test.title,
            fullTitle: test.fullTitle(),
            duration: test.duration,
            currentRetry: test.currentRetry()
          };
        }
      }).call(this, require('_process'));
    }, {
      "./base": 17,
      "_process": 51
    }],
    25: [function(require, module, exports) {
      (function(process) {
        var Base = require('./base');
        exports = module.exports = JSONReporter;
        function JSONReporter(runner) {
          Base.call(this, runner);
          var self = this;
          var tests = [];
          var pending = [];
          var failures = [];
          var passes = [];
          runner.on('test end', function(test) {
            tests.push(test);
          });
          runner.on('pass', function(test) {
            passes.push(test);
          });
          runner.on('fail', function(test) {
            failures.push(test);
          });
          runner.on('pending', function(test) {
            pending.push(test);
          });
          runner.on('end', function() {
            var obj = {
              stats: self.stats,
              tests: tests.map(clean),
              pending: pending.map(clean),
              failures: failures.map(clean),
              passes: passes.map(clean)
            };
            runner.testResults = obj;
            process.stdout.write(JSON.stringify(obj, null, 2));
          });
        }
        function clean(test) {
          return {
            title: test.title,
            fullTitle: test.fullTitle(),
            duration: test.duration,
            currentRetry: test.currentRetry(),
            err: errorJSON(test.err || {})
          };
        }
        function errorJSON(err) {
          var res = {};
          Object.getOwnPropertyNames(err).forEach(function(key) {
            res[key] = err[key];
          }, err);
          return res;
        }
      }).call(this, require('_process'));
    }, {
      "./base": 17,
      "_process": 51
    }],
    26: [function(require, module, exports) {
      (function(process) {
        var Base = require('./base');
        var inherits = require('../utils').inherits;
        var cursor = Base.cursor;
        var color = Base.color;
        exports = module.exports = Landing;
        Base.colors.plane = 0;
        Base.colors['plane crash'] = 31;
        Base.colors.runway = 90;
        function Landing(runner) {
          Base.call(this, runner);
          var self = this;
          var width = Base.window.width * .75 | 0;
          var total = runner.total;
          var stream = process.stdout;
          var plane = color('plane', '✈');
          var crashed = -1;
          var n = 0;
          function runway() {
            var buf = Array(width).join('-');
            return '  ' + color('runway', buf);
          }
          runner.on('start', function() {
            stream.write('\n\n\n  ');
            cursor.hide();
          });
          runner.on('test end', function(test) {
            var col = crashed === -1 ? width * ++n / total | 0 : crashed;
            if (test.state === 'failed') {
              plane = color('plane crash', '✈');
              crashed = col;
            }
            stream.write('\u001b[' + (width + 1) + 'D\u001b[2A');
            stream.write(runway());
            stream.write('\n  ');
            stream.write(color('runway', Array(col).join('⋅')));
            stream.write(plane);
            stream.write(color('runway', Array(width - col).join('⋅') + '\n'));
            stream.write(runway());
            stream.write('\u001b[0m');
          });
          runner.on('end', function() {
            cursor.show();
            console.log();
            self.epilogue();
          });
        }
        inherits(Landing, Base);
      }).call(this, require('_process'));
    }, {
      "../utils": 39,
      "./base": 17,
      "_process": 51
    }],
    27: [function(require, module, exports) {
      (function(process) {
        var Base = require('./base');
        var inherits = require('../utils').inherits;
        var color = Base.color;
        var cursor = Base.cursor;
        exports = module.exports = List;
        function List(runner) {
          Base.call(this, runner);
          var self = this;
          var n = 0;
          runner.on('start', function() {
            console.log();
          });
          runner.on('test', function(test) {
            process.stdout.write(color('pass', '    ' + test.fullTitle() + ': '));
          });
          runner.on('pending', function(test) {
            var fmt = color('checkmark', '  -') + color('pending', ' %s');
            console.log(fmt, test.fullTitle());
          });
          runner.on('pass', function(test) {
            var fmt = color('checkmark', '  ' + Base.symbols.dot) + color('pass', ' %s: ') + color(test.speed, '%dms');
            cursor.CR();
            console.log(fmt, test.fullTitle(), test.duration);
          });
          runner.on('fail', function(test) {
            cursor.CR();
            console.log(color('fail', '  %d) %s'), ++n, test.fullTitle());
          });
          runner.on('end', self.epilogue.bind(self));
        }
        inherits(List, Base);
      }).call(this, require('_process'));
    }, {
      "../utils": 39,
      "./base": 17,
      "_process": 51
    }],
    28: [function(require, module, exports) {
      (function(process) {
        var Base = require('./base');
        var utils = require('../utils');
        var SUITE_PREFIX = '$';
        exports = module.exports = Markdown;
        function Markdown(runner) {
          Base.call(this, runner);
          var level = 0;
          var buf = '';
          function title(str) {
            return Array(level).join('#') + ' ' + str;
          }
          function mapTOC(suite, obj) {
            var ret = obj;
            var key = SUITE_PREFIX + suite.title;
            obj = obj[key] = obj[key] || {suite: suite};
            suite.suites.forEach(function(suite) {
              mapTOC(suite, obj);
            });
            return ret;
          }
          function stringifyTOC(obj, level) {
            ++level;
            var buf = '';
            var link;
            for (var key in obj) {
              if (key === 'suite') {
                continue;
              }
              if (key !== SUITE_PREFIX) {
                link = ' - [' + key.substring(1) + ']';
                link += '(#' + utils.slug(obj[key].suite.fullTitle()) + ')\n';
                buf += Array(level).join('  ') + link;
              }
              buf += stringifyTOC(obj[key], level);
            }
            return buf;
          }
          function generateTOC(suite) {
            var obj = mapTOC(suite, {});
            return stringifyTOC(obj, 0);
          }
          generateTOC(runner.suite);
          runner.on('suite', function(suite) {
            ++level;
            var slug = utils.slug(suite.fullTitle());
            buf += '<a name="' + slug + '"></a>' + '\n';
            buf += title(suite.title) + '\n';
          });
          runner.on('suite end', function() {
            --level;
          });
          runner.on('pass', function(test) {
            var code = utils.clean(test.body);
            buf += test.title + '.\n';
            buf += '\n```js\n';
            buf += code + '\n';
            buf += '```\n\n';
          });
          runner.on('end', function() {
            process.stdout.write('# TOC\n');
            process.stdout.write(generateTOC(runner.suite));
            process.stdout.write(buf);
          });
        }
      }).call(this, require('_process'));
    }, {
      "../utils": 39,
      "./base": 17,
      "_process": 51
    }],
    29: [function(require, module, exports) {
      (function(process) {
        var Base = require('./base');
        var inherits = require('../utils').inherits;
        exports = module.exports = Min;
        function Min(runner) {
          Base.call(this, runner);
          runner.on('start', function() {
            process.stdout.write('\u001b[2J');
            process.stdout.write('\u001b[1;3H');
          });
          runner.on('end', this.epilogue.bind(this));
        }
        inherits(Min, Base);
      }).call(this, require('_process'));
    }, {
      "../utils": 39,
      "./base": 17,
      "_process": 51
    }],
    30: [function(require, module, exports) {
      (function(process) {
        var Base = require('./base');
        var inherits = require('../utils').inherits;
        exports = module.exports = NyanCat;
        function NyanCat(runner) {
          Base.call(this, runner);
          var self = this;
          var width = Base.window.width * .75 | 0;
          var nyanCatWidth = this.nyanCatWidth = 11;
          this.colorIndex = 0;
          this.numberOfLines = 4;
          this.rainbowColors = self.generateColors();
          this.scoreboardWidth = 5;
          this.tick = 0;
          this.trajectories = [[], [], [], []];
          this.trajectoryWidthMax = (width - nyanCatWidth);
          runner.on('start', function() {
            Base.cursor.hide();
            self.draw();
          });
          runner.on('pending', function() {
            self.draw();
          });
          runner.on('pass', function() {
            self.draw();
          });
          runner.on('fail', function() {
            self.draw();
          });
          runner.on('end', function() {
            Base.cursor.show();
            for (var i = 0; i < self.numberOfLines; i++) {
              write('\n');
            }
            self.epilogue();
          });
        }
        inherits(NyanCat, Base);
        NyanCat.prototype.draw = function() {
          this.appendRainbow();
          this.drawScoreboard();
          this.drawRainbow();
          this.drawNyanCat();
          this.tick = !this.tick;
        };
        NyanCat.prototype.drawScoreboard = function() {
          var stats = this.stats;
          function draw(type, n) {
            write(' ');
            write(Base.color(type, n));
            write('\n');
          }
          draw('green', stats.passes);
          draw('fail', stats.failures);
          draw('pending', stats.pending);
          write('\n');
          this.cursorUp(this.numberOfLines);
        };
        NyanCat.prototype.appendRainbow = function() {
          var segment = this.tick ? '_' : '-';
          var rainbowified = this.rainbowify(segment);
          for (var index = 0; index < this.numberOfLines; index++) {
            var trajectory = this.trajectories[index];
            if (trajectory.length >= this.trajectoryWidthMax) {
              trajectory.shift();
            }
            trajectory.push(rainbowified);
          }
        };
        NyanCat.prototype.drawRainbow = function() {
          var self = this;
          this.trajectories.forEach(function(line) {
            write('\u001b[' + self.scoreboardWidth + 'C');
            write(line.join(''));
            write('\n');
          });
          this.cursorUp(this.numberOfLines);
        };
        NyanCat.prototype.drawNyanCat = function() {
          var self = this;
          var startWidth = this.scoreboardWidth + this.trajectories[0].length;
          var dist = '\u001b[' + startWidth + 'C';
          var padding = '';
          write(dist);
          write('_,------,');
          write('\n');
          write(dist);
          padding = self.tick ? '  ' : '   ';
          write('_|' + padding + '/\\_/\\ ');
          write('\n');
          write(dist);
          padding = self.tick ? '_' : '__';
          var tail = self.tick ? '~' : '^';
          write(tail + '|' + padding + this.face() + ' ');
          write('\n');
          write(dist);
          padding = self.tick ? ' ' : '  ';
          write(padding + '""  "" ');
          write('\n');
          this.cursorUp(this.numberOfLines);
        };
        NyanCat.prototype.face = function() {
          var stats = this.stats;
          if (stats.failures) {
            return '( x .x)';
          } else if (stats.pending) {
            return '( o .o)';
          } else if (stats.passes) {
            return '( ^ .^)';
          }
          return '( - .-)';
        };
        NyanCat.prototype.cursorUp = function(n) {
          write('\u001b[' + n + 'A');
        };
        NyanCat.prototype.cursorDown = function(n) {
          write('\u001b[' + n + 'B');
        };
        NyanCat.prototype.generateColors = function() {
          var colors = [];
          for (var i = 0; i < (6 * 7); i++) {
            var pi3 = Math.floor(Math.PI / 3);
            var n = (i * (1.0 / 6));
            var r = Math.floor(3 * Math.sin(n) + 3);
            var g = Math.floor(3 * Math.sin(n + 2 * pi3) + 3);
            var b = Math.floor(3 * Math.sin(n + 4 * pi3) + 3);
            colors.push(36 * r + 6 * g + b + 16);
          }
          return colors;
        };
        NyanCat.prototype.rainbowify = function(str) {
          if (!Base.useColors) {
            return str;
          }
          var color = this.rainbowColors[this.colorIndex % this.rainbowColors.length];
          this.colorIndex += 1;
          return '\u001b[38;5;' + color + 'm' + str + '\u001b[0m';
        };
        function write(string) {
          process.stdout.write(string);
        }
      }).call(this, require('_process'));
    }, {
      "../utils": 39,
      "./base": 17,
      "_process": 51
    }],
    31: [function(require, module, exports) {
      (function(process) {
        var Base = require('./base');
        var inherits = require('../utils').inherits;
        var color = Base.color;
        var cursor = Base.cursor;
        exports = module.exports = Progress;
        Base.colors.progress = 90;
        function Progress(runner, options) {
          Base.call(this, runner);
          var self = this;
          var width = Base.window.width * .50 | 0;
          var total = runner.total;
          var complete = 0;
          var lastN = -1;
          options = options || {};
          options.open = options.open || '[';
          options.complete = options.complete || '▬';
          options.incomplete = options.incomplete || Base.symbols.dot;
          options.close = options.close || ']';
          options.verbose = false;
          runner.on('start', function() {
            console.log();
            cursor.hide();
          });
          runner.on('test end', function() {
            complete++;
            var percent = complete / total;
            var n = width * percent | 0;
            var i = width - n;
            if (n === lastN && !options.verbose) {
              return;
            }
            lastN = n;
            cursor.CR();
            process.stdout.write('\u001b[J');
            process.stdout.write(color('progress', '  ' + options.open));
            process.stdout.write(Array(n).join(options.complete));
            process.stdout.write(Array(i).join(options.incomplete));
            process.stdout.write(color('progress', options.close));
            if (options.verbose) {
              process.stdout.write(color('progress', ' ' + complete + ' of ' + total));
            }
          });
          runner.on('end', function() {
            cursor.show();
            console.log();
            self.epilogue();
          });
        }
        inherits(Progress, Base);
      }).call(this, require('_process'));
    }, {
      "../utils": 39,
      "./base": 17,
      "_process": 51
    }],
    32: [function(require, module, exports) {
      var Base = require('./base');
      var inherits = require('../utils').inherits;
      var color = Base.color;
      var cursor = Base.cursor;
      exports = module.exports = Spec;
      function Spec(runner) {
        Base.call(this, runner);
        var self = this;
        var indents = 0;
        var n = 0;
        function indent() {
          return Array(indents).join('  ');
        }
        runner.on('start', function() {
          console.log();
        });
        runner.on('suite', function(suite) {
          ++indents;
          console.log(color('suite', '%s%s'), indent(), suite.title);
        });
        runner.on('suite end', function() {
          --indents;
          if (indents === 1) {
            console.log();
          }
        });
        runner.on('pending', function(test) {
          var fmt = indent() + color('pending', '  - %s');
          console.log(fmt, test.title);
        });
        runner.on('pass', function(test) {
          var fmt;
          if (test.speed === 'fast') {
            fmt = indent() + color('checkmark', '  ' + Base.symbols.ok) + color('pass', ' %s');
            cursor.CR();
            console.log(fmt, test.title);
          } else {
            fmt = indent() + color('checkmark', '  ' + Base.symbols.ok) + color('pass', ' %s') + color(test.speed, ' (%dms)');
            cursor.CR();
            console.log(fmt, test.title, test.duration);
          }
        });
        runner.on('fail', function(test) {
          cursor.CR();
          console.log(indent() + color('fail', '  %d) %s'), ++n, test.title);
        });
        runner.on('end', self.epilogue.bind(self));
      }
      inherits(Spec, Base);
    }, {
      "../utils": 39,
      "./base": 17
    }],
    33: [function(require, module, exports) {
      var Base = require('./base');
      exports = module.exports = TAP;
      function TAP(runner) {
        Base.call(this, runner);
        var n = 1;
        var passes = 0;
        var failures = 0;
        runner.on('start', function() {
          var total = runner.grepTotal(runner.suite);
          console.log('%d..%d', 1, total);
        });
        runner.on('test end', function() {
          ++n;
        });
        runner.on('pending', function(test) {
          console.log('ok %d %s # SKIP -', n, title(test));
        });
        runner.on('pass', function(test) {
          passes++;
          console.log('ok %d %s', n, title(test));
        });
        runner.on('fail', function(test, err) {
          failures++;
          console.log('not ok %d %s', n, title(test));
          if (err.stack) {
            console.log(err.stack.replace(/^/gm, '  '));
          }
        });
        runner.on('end', function() {
          console.log('# tests ' + (passes + failures));
          console.log('# pass ' + passes);
          console.log('# fail ' + failures);
        });
      }
      function title(test) {
        return test.fullTitle().replace(/#/g, '');
      }
    }, {"./base": 17}],
    34: [function(require, module, exports) {
      (function(process, global) {
        var Base = require('./base');
        var utils = require('../utils');
        var inherits = utils.inherits;
        var fs = require('fs');
        var escape = utils.escape;
        var mkdirp = require('mkdirp');
        var path = require('path');
        var Date = global.Date;
        var setTimeout = global.setTimeout;
        var setInterval = global.setInterval;
        var clearTimeout = global.clearTimeout;
        var clearInterval = global.clearInterval;
        exports = module.exports = XUnit;
        function XUnit(runner, options) {
          Base.call(this, runner);
          var stats = this.stats;
          var tests = [];
          var self = this;
          if (options.reporterOptions && options.reporterOptions.output) {
            if (!fs.createWriteStream) {
              throw new Error('file output not supported in browser');
            }
            mkdirp.sync(path.dirname(options.reporterOptions.output));
            self.fileStream = fs.createWriteStream(options.reporterOptions.output);
          }
          runner.on('pending', function(test) {
            tests.push(test);
          });
          runner.on('pass', function(test) {
            tests.push(test);
          });
          runner.on('fail', function(test) {
            tests.push(test);
          });
          runner.on('end', function() {
            self.write(tag('testsuite', {
              name: 'Mocha Tests',
              tests: stats.tests,
              failures: stats.failures,
              errors: stats.failures,
              skipped: stats.tests - stats.failures - stats.passes,
              timestamp: (new Date()).toUTCString(),
              time: (stats.duration / 1000) || 0
            }, false));
            tests.forEach(function(t) {
              self.test(t);
            });
            self.write('</testsuite>');
          });
        }
        inherits(XUnit, Base);
        XUnit.prototype.done = function(failures, fn) {
          if (this.fileStream) {
            this.fileStream.end(function() {
              fn(failures);
            });
          } else {
            fn(failures);
          }
        };
        XUnit.prototype.write = function(line) {
          if (this.fileStream) {
            this.fileStream.write(line + '\n');
          } else if ((typeof process === 'undefined' ? 'undefined' : $traceurRuntime.typeof(process)) === 'object' && process.stdout) {
            process.stdout.write(line + '\n');
          } else {
            console.log(line);
          }
        };
        XUnit.prototype.test = function(test) {
          var attrs = {
            classname: test.parent.fullTitle(),
            name: test.title,
            time: (test.duration / 1000) || 0
          };
          if (test.state === 'failed') {
            var err = test.err;
            this.write(tag('testcase', attrs, false, tag('failure', {}, false, cdata(escape(err.message) + '\n' + err.stack))));
          } else if (test.pending) {
            this.write(tag('testcase', attrs, false, tag('skipped', {}, true)));
          } else {
            this.write(tag('testcase', attrs, true));
          }
        };
        function tag(name, attrs, close, content) {
          var end = close ? '/>' : '>';
          var pairs = [];
          var tag;
          for (var key in attrs) {
            if (Object.prototype.hasOwnProperty.call(attrs, key)) {
              pairs.push(key + '="' + escape(attrs[key]) + '"');
            }
          }
          tag = '<' + name + (pairs.length ? ' ' + pairs.join(' ') : '') + end;
          if (content) {
            tag += content + '</' + name + end;
          }
          return tag;
        }
        function cdata(str) {
          return '<![CDATA[' + escape(str) + ']]>';
        }
      }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "../utils": 39,
      "./base": 17,
      "_process": 51,
      "fs": 41,
      "mkdirp": 70,
      "path": 41
    }],
    35: [function(require, module, exports) {
      (function(global) {
        var EventEmitter = require('events').EventEmitter;
        var Pending = require('./pending');
        var debug = require('debug')('mocha:runnable');
        var milliseconds = require('./ms');
        var utils = require('./utils');
        var inherits = utils.inherits;
        var Date = global.Date;
        var setTimeout = global.setTimeout;
        var setInterval = global.setInterval;
        var clearTimeout = global.clearTimeout;
        var clearInterval = global.clearInterval;
        var toString = Object.prototype.toString;
        module.exports = Runnable;
        function Runnable(title, fn) {
          this.title = title;
          this.fn = fn;
          this.async = fn && fn.length;
          this.sync = !this.async;
          this._timeout = 2000;
          this._slow = 75;
          this._enableTimeouts = true;
          this.timedOut = false;
          this._trace = new Error('done() called multiple times');
          this._retries = -1;
          this._currentRetry = 0;
        }
        inherits(Runnable, EventEmitter);
        Runnable.prototype.timeout = function(ms) {
          if (!arguments.length) {
            return this._timeout;
          }
          if (ms === 0) {
            this._enableTimeouts = false;
          }
          if (typeof ms === 'string') {
            ms = milliseconds(ms);
          }
          debug('timeout %d', ms);
          this._timeout = ms;
          if (this.timer) {
            this.resetTimeout();
          }
          return this;
        };
        Runnable.prototype.slow = function(ms) {
          if (!arguments.length) {
            return this._slow;
          }
          if (typeof ms === 'string') {
            ms = milliseconds(ms);
          }
          debug('timeout %d', ms);
          this._slow = ms;
          return this;
        };
        Runnable.prototype.enableTimeouts = function(enabled) {
          if (!arguments.length) {
            return this._enableTimeouts;
          }
          debug('enableTimeouts %s', enabled);
          this._enableTimeouts = enabled;
          return this;
        };
        Runnable.prototype.skip = function() {
          throw new Pending();
        };
        Runnable.prototype.retries = function(n) {
          if (!arguments.length) {
            return this._retries;
          }
          this._retries = n;
        };
        Runnable.prototype.currentRetry = function(n) {
          if (!arguments.length) {
            return this._currentRetry;
          }
          this._currentRetry = n;
        };
        Runnable.prototype.fullTitle = function() {
          return this.parent.fullTitle() + ' ' + this.title;
        };
        Runnable.prototype.clearTimeout = function() {
          clearTimeout(this.timer);
        };
        Runnable.prototype.inspect = function() {
          return JSON.stringify(this, function(key, val) {
            if (key[0] === '_') {
              return;
            }
            if (key === 'parent') {
              return '#<Suite>';
            }
            if (key === 'ctx') {
              return '#<Context>';
            }
            return val;
          }, 2);
        };
        Runnable.prototype.resetTimeout = function() {
          var self = this;
          var ms = this.timeout() || 1e9;
          if (!this._enableTimeouts) {
            return;
          }
          this.clearTimeout();
          this.timer = setTimeout(function() {
            if (!self._enableTimeouts) {
              return;
            }
            self.callback(new Error('timeout of ' + ms + 'ms exceeded. Ensure the done() callback is being called in this test.'));
            self.timedOut = true;
          }, ms);
        };
        Runnable.prototype.globals = function(globals) {
          if (!arguments.length) {
            return this._allowedGlobals;
          }
          this._allowedGlobals = globals;
        };
        Runnable.prototype.run = function(fn) {
          var self = this;
          var start = new Date();
          var ctx = this.ctx;
          var finished;
          var emitted;
          if (ctx && ctx.runnable) {
            ctx.runnable(this);
          }
          function multiple(err) {
            if (emitted) {
              return;
            }
            emitted = true;
            self.emit('error', err || new Error('done() called multiple times; stacktrace may be inaccurate'));
          }
          function done(err) {
            var ms = self.timeout();
            if (self.timedOut) {
              return;
            }
            if (finished) {
              return multiple(err || self._trace);
            }
            self.clearTimeout();
            self.duration = new Date() - start;
            finished = true;
            if (!err && self.duration > ms && self._enableTimeouts) {
              err = new Error('timeout of ' + ms + 'ms exceeded. Ensure the done() callback is being called in this test.');
            }
            fn(err);
          }
          this.callback = done;
          if (this.async) {
            this.resetTimeout();
            if (this.allowUncaught) {
              return callFnAsync(this.fn);
            }
            try {
              callFnAsync(this.fn);
            } catch (err) {
              done(utils.getError(err));
            }
            return;
          }
          if (this.allowUncaught) {
            callFn(this.fn);
            done();
            return;
          }
          try {
            if (this.pending) {
              done();
            } else {
              callFn(this.fn);
            }
          } catch (err) {
            done(utils.getError(err));
          }
          function callFn(fn) {
            var result = fn.call(ctx);
            if (result && typeof result.then === 'function') {
              self.resetTimeout();
              result.then(function() {
                done();
                return null;
              }, function(reason) {
                done(reason || new Error('Promise rejected with no or falsy reason'));
              });
            } else {
              if (self.asyncOnly) {
                return done(new Error('--async-only option in use without declaring `done()` or returning a promise'));
              }
              done();
            }
          }
          function callFnAsync(fn) {
            fn.call(ctx, function(err) {
              if (err instanceof Error || toString.call(err) === '[object Error]') {
                return done(err);
              }
              if (err) {
                if (Object.prototype.toString.call(err) === '[object Object]') {
                  return done(new Error('done() invoked with non-Error: ' + JSON.stringify(err)));
                }
                return done(new Error('done() invoked with non-Error: ' + err));
              }
              done();
            });
          }
        };
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "./ms": 15,
      "./pending": 16,
      "./utils": 39,
      "debug": 2,
      "events": 3
    }],
    36: [function(require, module, exports) {
      (function(process, global) {
        var EventEmitter = require('events').EventEmitter;
        var Pending = require('./pending');
        var utils = require('./utils');
        var inherits = utils.inherits;
        var debug = require('debug')('mocha:runner');
        var Runnable = require('./runnable');
        var filter = utils.filter;
        var indexOf = utils.indexOf;
        var keys = utils.keys;
        var stackFilter = utils.stackTraceFilter();
        var stringify = utils.stringify;
        var type = utils.type;
        var undefinedError = utils.undefinedError;
        var isArray = utils.isArray;
        var globals = ['setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'XMLHttpRequest', 'Date', 'setImmediate', 'clearImmediate'];
        module.exports = Runner;
        function Runner(suite, delay) {
          var self = this;
          this._globals = [];
          this._abort = false;
          this._delay = delay;
          this.suite = suite;
          this.started = false;
          this.total = suite.total();
          this.failures = 0;
          this.on('test end', function(test) {
            self.checkGlobals(test);
          });
          this.on('hook end', function(hook) {
            self.checkGlobals(hook);
          });
          this._defaultGrep = /.*/;
          this.grep(this._defaultGrep);
          this.globals(this.globalProps().concat(extraGlobals()));
        }
        Runner.immediately = global.setImmediate || process.nextTick;
        inherits(Runner, EventEmitter);
        Runner.prototype.grep = function(re, invert) {
          debug('grep %s', re);
          this._grep = re;
          this._invert = invert;
          this.total = this.grepTotal(this.suite);
          return this;
        };
        Runner.prototype.grepTotal = function(suite) {
          var self = this;
          var total = 0;
          suite.eachTest(function(test) {
            var match = self._grep.test(test.fullTitle());
            if (self._invert) {
              match = !match;
            }
            if (match) {
              total++;
            }
          });
          return total;
        };
        Runner.prototype.globalProps = function() {
          var props = keys(global);
          for (var i = 0; i < globals.length; ++i) {
            if (~indexOf(props, globals[i])) {
              continue;
            }
            props.push(globals[i]);
          }
          return props;
        };
        Runner.prototype.globals = function(arr) {
          if (!arguments.length) {
            return this._globals;
          }
          debug('globals %j', arr);
          this._globals = this._globals.concat(arr);
          return this;
        };
        Runner.prototype.checkGlobals = function(test) {
          if (this.ignoreLeaks) {
            return;
          }
          var ok = this._globals;
          var globals = this.globalProps();
          var leaks;
          if (test) {
            ok = ok.concat(test._allowedGlobals || []);
          }
          if (this.prevGlobalsLength === globals.length) {
            return;
          }
          this.prevGlobalsLength = globals.length;
          leaks = filterLeaks(ok, globals);
          this._globals = this._globals.concat(leaks);
          if (leaks.length > 1) {
            this.fail(test, new Error('global leaks detected: ' + leaks.join(', ') + ''));
          } else if (leaks.length) {
            this.fail(test, new Error('global leak detected: ' + leaks[0]));
          }
        };
        Runner.prototype.fail = function(test, err) {
          ++this.failures;
          test.state = 'failed';
          if (!(err instanceof Error || err && typeof err.message === 'string')) {
            err = new Error('the ' + type(err) + ' ' + stringify(err) + ' was thrown, throw an Error :)');
          }
          err.stack = (this.fullStackTrace || !err.stack) ? err.stack : stackFilter(err.stack);
          this.emit('fail', test, err);
        };
        Runner.prototype.failHook = function(hook, err) {
          if (hook.ctx && hook.ctx.currentTest) {
            hook.originalTitle = hook.originalTitle || hook.title;
            hook.title = hook.originalTitle + ' for "' + hook.ctx.currentTest.title + '"';
          }
          this.fail(hook, err);
          if (this.suite.bail()) {
            this.emit('end');
          }
        };
        Runner.prototype.hook = function(name, fn) {
          var suite = this.suite;
          var hooks = suite['_' + name];
          var self = this;
          function next(i) {
            var hook = hooks[i];
            if (!hook) {
              return fn();
            }
            self.currentRunnable = hook;
            hook.ctx.currentTest = self.test;
            self.emit('hook', hook);
            if (!hook.listeners('error').length) {
              hook.on('error', function(err) {
                self.failHook(hook, err);
              });
            }
            hook.run(function(err) {
              var testError = hook.error();
              if (testError) {
                self.fail(self.test, testError);
              }
              if (err) {
                if (err instanceof Pending) {
                  suite.pending = true;
                } else {
                  self.failHook(hook, err);
                  return fn(err);
                }
              }
              self.emit('hook end', hook);
              delete hook.ctx.currentTest;
              next(++i);
            });
          }
          Runner.immediately(function() {
            next(0);
          });
        };
        Runner.prototype.hooks = function(name, suites, fn) {
          var self = this;
          var orig = this.suite;
          function next(suite) {
            self.suite = suite;
            if (!suite) {
              self.suite = orig;
              return fn();
            }
            self.hook(name, function(err) {
              if (err) {
                var errSuite = self.suite;
                self.suite = orig;
                return fn(err, errSuite);
              }
              next(suites.pop());
            });
          }
          next(suites.pop());
        };
        Runner.prototype.hookUp = function(name, fn) {
          var suites = [this.suite].concat(this.parents()).reverse();
          this.hooks(name, suites, fn);
        };
        Runner.prototype.hookDown = function(name, fn) {
          var suites = [this.suite].concat(this.parents());
          this.hooks(name, suites, fn);
        };
        Runner.prototype.parents = function() {
          var suite = this.suite;
          var suites = [];
          while (suite.parent) {
            suite = suite.parent;
            suites.push(suite);
          }
          return suites;
        };
        Runner.prototype.runTest = function(fn) {
          var self = this;
          var test = this.test;
          if (this.asyncOnly) {
            test.asyncOnly = true;
          }
          if (this.allowUncaught) {
            test.allowUncaught = true;
            return test.run(fn);
          }
          try {
            test.on('error', function(err) {
              self.fail(test, err);
            });
            test.run(fn);
          } catch (err) {
            fn(err);
          }
        };
        Runner.prototype.runTests = function(suite, fn) {
          var self = this;
          var tests = suite.tests.slice();
          var test;
          function hookErr(_, errSuite, after) {
            var orig = self.suite;
            self.suite = after ? errSuite.parent : errSuite;
            if (self.suite) {
              self.hookUp('afterEach', function(err2, errSuite2) {
                self.suite = orig;
                if (err2) {
                  return hookErr(err2, errSuite2, true);
                }
                fn(errSuite);
              });
            } else {
              self.suite = orig;
              fn(errSuite);
            }
          }
          function next(err, errSuite) {
            if (self.failures && suite._bail) {
              return fn();
            }
            if (self._abort) {
              return fn();
            }
            if (err) {
              return hookErr(err, errSuite, true);
            }
            test = tests.shift();
            if (!test) {
              return fn();
            }
            var match = self._grep.test(test.fullTitle());
            if (self._invert) {
              match = !match;
            }
            if (!match) {
              if (self._grep !== self._defaultGrep) {
                Runner.immediately(next);
              } else {
                next();
              }
              return;
            }
            function parentPending(suite) {
              return suite.pending || (suite.parent && parentPending(suite.parent));
            }
            if (test.pending || parentPending(test.parent)) {
              self.emit('pending', test);
              self.emit('test end', test);
              return next();
            }
            self.emit('test', self.test = test);
            self.hookDown('beforeEach', function(err, errSuite) {
              if (suite.pending) {
                self.emit('pending', test);
                self.emit('test end', test);
                return next();
              }
              if (err) {
                return hookErr(err, errSuite, false);
              }
              self.currentRunnable = self.test;
              self.runTest(function(err) {
                test = self.test;
                if (err) {
                  var retry = test.currentRetry();
                  if (err instanceof Pending) {
                    test.pending = true;
                    self.emit('pending', test);
                  } else if (retry < test.retries()) {
                    var clonedTest = test.clone();
                    clonedTest.currentRetry(retry + 1);
                    tests.unshift(clonedTest);
                    return self.hookUp('afterEach', next);
                  } else {
                    self.fail(test, err);
                  }
                  self.emit('test end', test);
                  if (err instanceof Pending) {
                    return next();
                  }
                  return self.hookUp('afterEach', next);
                }
                test.state = 'passed';
                self.emit('pass', test);
                self.emit('test end', test);
                self.hookUp('afterEach', next);
              });
            });
          }
          this.next = next;
          this.hookErr = hookErr;
          next();
        };
        Runner.prototype.runSuite = function(suite, fn) {
          var i = 0;
          var self = this;
          var total = this.grepTotal(suite);
          var afterAllHookCalled = false;
          debug('run suite %s', suite.fullTitle());
          if (!total || (self.failures && suite._bail)) {
            return fn();
          }
          this.emit('suite', this.suite = suite);
          function next(errSuite) {
            if (errSuite) {
              if (errSuite === suite) {
                return done();
              }
              return done(errSuite);
            }
            if (self._abort) {
              return done();
            }
            var curr = suite.suites[i++];
            if (!curr) {
              return done();
            }
            if (self._grep !== self._defaultGrep) {
              Runner.immediately(function() {
                self.runSuite(curr, next);
              });
            } else {
              self.runSuite(curr, next);
            }
          }
          function done(errSuite) {
            self.suite = suite;
            self.nextSuite = next;
            if (afterAllHookCalled) {
              fn(errSuite);
            } else {
              afterAllHookCalled = true;
              delete self.test;
              self.hook('afterAll', function() {
                self.emit('suite end', suite);
                fn(errSuite);
              });
            }
          }
          this.nextSuite = next;
          this.hook('beforeAll', function(err) {
            if (err) {
              return done();
            }
            self.runTests(suite, next);
          });
        };
        Runner.prototype.uncaught = function(err) {
          if (err) {
            debug('uncaught exception %s', err !== function() {
              return this;
            }.call(err) ? err : (err.message || err));
          } else {
            debug('uncaught undefined exception');
            err = undefinedError();
          }
          err.uncaught = true;
          var runnable = this.currentRunnable;
          if (!runnable) {
            runnable = new Runnable('Uncaught error outside test suite');
            runnable.parent = this.suite;
            if (this.started) {
              this.fail(runnable, err);
            } else {
              this.emit('start');
              this.fail(runnable, err);
              this.emit('end');
            }
            return;
          }
          runnable.clearTimeout();
          if (runnable.state) {
            return;
          }
          this.fail(runnable, err);
          if (runnable.type === 'test') {
            this.emit('test end', runnable);
            this.hookUp('afterEach', this.next);
            return;
          }
          if (runnable.type === 'hook') {
            var errSuite = this.suite;
            if (runnable.fullTitle().indexOf('after each') > -1) {
              return this.hookErr(err, errSuite, true);
            }
            if (runnable.fullTitle().indexOf('before each') > -1) {
              return this.hookErr(err, errSuite, false);
            }
            return this.nextSuite(errSuite);
          }
          this.emit('end');
        };
        function cleanSuiteReferences(suite) {
          function cleanArrReferences(arr) {
            for (var i = 0; i < arr.length; i++) {
              delete arr[i].fn;
            }
          }
          if (isArray(suite._beforeAll)) {
            cleanArrReferences(suite._beforeAll);
          }
          if (isArray(suite._beforeEach)) {
            cleanArrReferences(suite._beforeEach);
          }
          if (isArray(suite._afterAll)) {
            cleanArrReferences(suite._afterAll);
          }
          if (isArray(suite._afterEach)) {
            cleanArrReferences(suite._afterEach);
          }
          for (var i = 0; i < suite.tests.length; i++) {
            delete suite.tests[i].fn;
          }
        }
        Runner.prototype.run = function(fn) {
          var self = this;
          var rootSuite = this.suite;
          fn = fn || function() {};
          function uncaught(err) {
            self.uncaught(err);
          }
          function start() {
            self.started = true;
            self.emit('start');
            self.runSuite(rootSuite, function() {
              debug('finished running');
              self.emit('end');
            });
          }
          debug('start');
          this.on('suite end', cleanSuiteReferences);
          this.on('end', function() {
            debug('end');
            process.removeListener('uncaughtException', uncaught);
            fn(self.failures);
          });
          process.on('uncaughtException', uncaught);
          if (this._delay) {
            this.emit('waiting', rootSuite);
            rootSuite.once('run', start);
          } else {
            start();
          }
          return this;
        };
        Runner.prototype.abort = function() {
          debug('aborting');
          this._abort = true;
          return this;
        };
        function filterLeaks(ok, globals) {
          return filter(globals, function(key) {
            if (/^d+/.test(key)) {
              return false;
            }
            if (global.navigator && (/^getInterface/).test(key)) {
              return false;
            }
            if (global.navigator && (/^\d+/).test(key)) {
              return false;
            }
            if (/^mocha-/.test(key)) {
              return false;
            }
            var matched = filter(ok, function(ok) {
              if (~ok.indexOf('*')) {
                return key.indexOf(ok.split('*')[0]) === 0;
              }
              return key === ok;
            });
            return !matched.length && (!global.navigator || key !== 'onerror');
          });
        }
        function extraGlobals() {
          if ((typeof process === 'undefined' ? 'undefined' : $traceurRuntime.typeof(process)) === 'object' && typeof process.version === 'string') {
            var parts = process.version.split('.');
            var nodeVersion = utils.reduce(parts, function(a, v) {
              return a << 8 | v;
            });
            if (nodeVersion < 0x00090B) {
              return ['errno'];
            }
          }
          return [];
        }
      }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "./pending": 16,
      "./runnable": 35,
      "./utils": 39,
      "_process": 51,
      "debug": 2,
      "events": 3
    }],
    37: [function(require, module, exports) {
      var EventEmitter = require('events').EventEmitter;
      var Hook = require('./hook');
      var utils = require('./utils');
      var inherits = utils.inherits;
      var debug = require('debug')('mocha:suite');
      var milliseconds = require('./ms');
      exports = module.exports = Suite;
      exports.create = function(parent, title) {
        var suite = new Suite(title, parent.ctx);
        suite.parent = parent;
        if (parent.pending) {
          suite.pending = true;
        }
        title = suite.fullTitle();
        parent.addSuite(suite);
        return suite;
      };
      function Suite(title, parentContext) {
        this.title = title;
        function Context() {}
        Context.prototype = parentContext;
        this.ctx = new Context();
        this.suites = [];
        this.tests = [];
        this.pending = false;
        this._beforeEach = [];
        this._beforeAll = [];
        this._afterEach = [];
        this._afterAll = [];
        this.root = !title;
        this._timeout = 2000;
        this._enableTimeouts = true;
        this._slow = 75;
        this._bail = false;
        this._retries = -1;
        this.delayed = false;
      }
      inherits(Suite, EventEmitter);
      Suite.prototype.clone = function() {
        var suite = new Suite(this.title);
        debug('clone');
        suite.ctx = this.ctx;
        suite.timeout(this.timeout());
        suite.retries(this.retries());
        suite.enableTimeouts(this.enableTimeouts());
        suite.slow(this.slow());
        suite.bail(this.bail());
        return suite;
      };
      Suite.prototype.timeout = function(ms) {
        if (!arguments.length) {
          return this._timeout;
        }
        if (ms.toString() === '0') {
          this._enableTimeouts = false;
        }
        if (typeof ms === 'string') {
          ms = milliseconds(ms);
        }
        debug('timeout %d', ms);
        this._timeout = parseInt(ms, 10);
        return this;
      };
      Suite.prototype.retries = function(n) {
        if (!arguments.length) {
          return this._retries;
        }
        debug('retries %d', n);
        this._retries = parseInt(n, 10) || 0;
        return this;
      };
      Suite.prototype.enableTimeouts = function(enabled) {
        if (!arguments.length) {
          return this._enableTimeouts;
        }
        debug('enableTimeouts %s', enabled);
        this._enableTimeouts = enabled;
        return this;
      };
      Suite.prototype.slow = function(ms) {
        if (!arguments.length) {
          return this._slow;
        }
        if (typeof ms === 'string') {
          ms = milliseconds(ms);
        }
        debug('slow %d', ms);
        this._slow = ms;
        return this;
      };
      Suite.prototype.bail = function(bail) {
        if (!arguments.length) {
          return this._bail;
        }
        debug('bail %s', bail);
        this._bail = bail;
        return this;
      };
      Suite.prototype.beforeAll = function(title, fn) {
        if (this.pending) {
          return this;
        }
        if (typeof title === 'function') {
          fn = title;
          title = fn.name;
        }
        title = '"before all" hook' + (title ? ': ' + title : '');
        var hook = new Hook(title, fn);
        hook.parent = this;
        hook.timeout(this.timeout());
        hook.retries(this.retries());
        hook.enableTimeouts(this.enableTimeouts());
        hook.slow(this.slow());
        hook.ctx = this.ctx;
        this._beforeAll.push(hook);
        this.emit('beforeAll', hook);
        return this;
      };
      Suite.prototype.afterAll = function(title, fn) {
        if (this.pending) {
          return this;
        }
        if (typeof title === 'function') {
          fn = title;
          title = fn.name;
        }
        title = '"after all" hook' + (title ? ': ' + title : '');
        var hook = new Hook(title, fn);
        hook.parent = this;
        hook.timeout(this.timeout());
        hook.retries(this.retries());
        hook.enableTimeouts(this.enableTimeouts());
        hook.slow(this.slow());
        hook.ctx = this.ctx;
        this._afterAll.push(hook);
        this.emit('afterAll', hook);
        return this;
      };
      Suite.prototype.beforeEach = function(title, fn) {
        if (this.pending) {
          return this;
        }
        if (typeof title === 'function') {
          fn = title;
          title = fn.name;
        }
        title = '"before each" hook' + (title ? ': ' + title : '');
        var hook = new Hook(title, fn);
        hook.parent = this;
        hook.timeout(this.timeout());
        hook.retries(this.retries());
        hook.enableTimeouts(this.enableTimeouts());
        hook.slow(this.slow());
        hook.ctx = this.ctx;
        this._beforeEach.push(hook);
        this.emit('beforeEach', hook);
        return this;
      };
      Suite.prototype.afterEach = function(title, fn) {
        if (this.pending) {
          return this;
        }
        if (typeof title === 'function') {
          fn = title;
          title = fn.name;
        }
        title = '"after each" hook' + (title ? ': ' + title : '');
        var hook = new Hook(title, fn);
        hook.parent = this;
        hook.timeout(this.timeout());
        hook.retries(this.retries());
        hook.enableTimeouts(this.enableTimeouts());
        hook.slow(this.slow());
        hook.ctx = this.ctx;
        this._afterEach.push(hook);
        this.emit('afterEach', hook);
        return this;
      };
      Suite.prototype.addSuite = function(suite) {
        suite.parent = this;
        suite.timeout(this.timeout());
        suite.retries(this.retries());
        suite.enableTimeouts(this.enableTimeouts());
        suite.slow(this.slow());
        suite.bail(this.bail());
        this.suites.push(suite);
        this.emit('suite', suite);
        return this;
      };
      Suite.prototype.addTest = function(test) {
        test.parent = this;
        test.timeout(this.timeout());
        test.retries(this.retries());
        test.enableTimeouts(this.enableTimeouts());
        test.slow(this.slow());
        test.ctx = this.ctx;
        this.tests.push(test);
        this.emit('test', test);
        return this;
      };
      Suite.prototype.fullTitle = function() {
        if (this.parent) {
          var full = this.parent.fullTitle();
          if (full) {
            return full + ' ' + this.title;
          }
        }
        return this.title;
      };
      Suite.prototype.total = function() {
        return utils.reduce(this.suites, function(sum, suite) {
          return sum + suite.total();
        }, 0) + this.tests.length;
      };
      Suite.prototype.eachTest = function(fn) {
        utils.forEach(this.tests, fn);
        utils.forEach(this.suites, function(suite) {
          suite.eachTest(fn);
        });
        return this;
      };
      Suite.prototype.run = function run() {
        if (this.root) {
          this.emit('run');
        }
      };
    }, {
      "./hook": 7,
      "./ms": 15,
      "./utils": 39,
      "debug": 2,
      "events": 3
    }],
    38: [function(require, module, exports) {
      var Runnable = require('./runnable');
      var inherits = require('./utils').inherits;
      module.exports = Test;
      function Test(title, fn) {
        Runnable.call(this, title, fn);
        this.pending = !fn;
        this.type = 'test';
        this.body = (fn || '').toString();
      }
      inherits(Test, Runnable);
      Test.prototype.clone = function() {
        var test = new Test(this.title, this.fn);
        test.timeout(this.timeout());
        test.slow(this.slow());
        test.enableTimeouts(this.enableTimeouts());
        test.retries(this.retries());
        test.currentRetry(this.currentRetry());
        test.globals(this.globals());
        test.parent = this.parent;
        test.file = this.file;
        test.ctx = this.ctx;
        return test;
      };
    }, {
      "./runnable": 35,
      "./utils": 39
    }],
    39: [function(require, module, exports) {
      (function(process, Buffer) {
        var basename = require('path').basename;
        var debug = require('debug')('mocha:watch');
        var exists = require('fs').existsSync || require('path').existsSync;
        var glob = require('glob');
        var join = require('path').join;
        var readdirSync = require('fs').readdirSync;
        var statSync = require('fs').statSync;
        var watchFile = require('fs').watchFile;
        var ignore = ['node_modules', '.git'];
        exports.inherits = require('util').inherits;
        exports.escape = function(html) {
          return String(html).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        };
        exports.forEach = function(arr, fn, scope) {
          for (var i = 0,
              l = arr.length; i < l; i++) {
            fn.call(scope, arr[i], i);
          }
        };
        exports.isString = function(obj) {
          return typeof obj === 'string';
        };
        exports.map = function(arr, fn, scope) {
          var result = [];
          for (var i = 0,
              l = arr.length; i < l; i++) {
            result.push(fn.call(scope, arr[i], i, arr));
          }
          return result;
        };
        exports.indexOf = function(arr, obj, start) {
          for (var i = start || 0,
              l = arr.length; i < l; i++) {
            if (arr[i] === obj) {
              return i;
            }
          }
          return -1;
        };
        exports.reduce = function(arr, fn, val) {
          var rval = val;
          for (var i = 0,
              l = arr.length; i < l; i++) {
            rval = fn(rval, arr[i], i, arr);
          }
          return rval;
        };
        exports.filter = function(arr, fn) {
          var ret = [];
          for (var i = 0,
              l = arr.length; i < l; i++) {
            var val = arr[i];
            if (fn(val, i, arr)) {
              ret.push(val);
            }
          }
          return ret;
        };
        exports.keys = typeof Object.keys === 'function' ? Object.keys : function(obj) {
          var keys = [];
          var has = Object.prototype.hasOwnProperty;
          for (var key in obj) {
            if (has.call(obj, key)) {
              keys.push(key);
            }
          }
          return keys;
        };
        exports.watch = function(files, fn) {
          var options = {interval: 100};
          files.forEach(function(file) {
            debug('file %s', file);
            watchFile(file, options, function(curr, prev) {
              if (prev.mtime < curr.mtime) {
                fn(file);
              }
            });
          });
        };
        var isArray = typeof Array.isArray === 'function' ? Array.isArray : function(obj) {
          return Object.prototype.toString.call(obj) === '[object Array]';
        };
        exports.isArray = isArray;
        if (typeof Buffer !== 'undefined' && Buffer.prototype) {
          Buffer.prototype.toJSON = Buffer.prototype.toJSON || function() {
            return Array.prototype.slice.call(this, 0);
          };
        }
        function ignored(path) {
          return !~ignore.indexOf(path);
        }
        exports.files = function(dir, ext, ret) {
          ret = ret || [];
          ext = ext || ['js'];
          var re = new RegExp('\\.(' + ext.join('|') + ')$');
          readdirSync(dir).filter(ignored).forEach(function(path) {
            path = join(dir, path);
            if (statSync(path).isDirectory()) {
              exports.files(path, ext, ret);
            } else if (path.match(re)) {
              ret.push(path);
            }
          });
          return ret;
        };
        exports.slug = function(str) {
          return str.toLowerCase().replace(/ +/g, '-').replace(/[^-\w]/g, '');
        };
        exports.clean = function(str) {
          str = str.replace(/\r\n?|[\n\u2028\u2029]/g, '\n').replace(/^\uFEFF/, '').replace(/^function *\(.*\)\s*\{|\(.*\) *=> *\{?/, '').replace(/\s+\}$/, '');
          var spaces = str.match(/^\n?( *)/)[1].length;
          var tabs = str.match(/^\n?(\t*)/)[1].length;
          var re = new RegExp('^\n?' + (tabs ? '\t' : ' ') + '{' + (tabs ? tabs : spaces) + '}', 'gm');
          str = str.replace(re, '');
          return exports.trim(str);
        };
        exports.trim = function(str) {
          return str.replace(/^\s+|\s+$/g, '');
        };
        exports.parseQuery = function(qs) {
          return exports.reduce(qs.replace('?', '').split('&'), function(obj, pair) {
            var i = pair.indexOf('=');
            var key = pair.slice(0, i);
            var val = pair.slice(++i);
            obj[key] = decodeURIComponent(val);
            return obj;
          }, {});
        };
        function highlight(js) {
          return js.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\/\/(.*)/gm, '<span class="comment">//$1</span>').replace(/('.*?')/gm, '<span class="string">$1</span>').replace(/(\d+\.\d+)/gm, '<span class="number">$1</span>').replace(/(\d+)/gm, '<span class="number">$1</span>').replace(/\bnew[ \t]+(\w+)/gm, '<span class="keyword">new</span> <span class="init">$1</span>').replace(/\b(function|new|throw|return|var|if|else)\b/gm, '<span class="keyword">$1</span>');
        }
        exports.highlightTags = function(name) {
          var code = document.getElementById('mocha').getElementsByTagName(name);
          for (var i = 0,
              len = code.length; i < len; ++i) {
            code[i].innerHTML = highlight(code[i].innerHTML);
          }
        };
        function emptyRepresentation(value, type) {
          type = type || exports.type(value);
          switch (type) {
            case 'function':
              return '[Function]';
            case 'object':
              return '{}';
            case 'array':
              return '[]';
            default:
              return value.toString();
          }
        }
        exports.type = function type(value) {
          if (value === undefined) {
            return 'undefined';
          } else if (value === null) {
            return 'null';
          } else if (typeof Buffer !== 'undefined' && Buffer.isBuffer(value)) {
            return 'buffer';
          }
          return Object.prototype.toString.call(value).replace(/^\[.+\s(.+?)\]$/, '$1').toLowerCase();
        };
        exports.stringify = function(value) {
          var type = exports.type(value);
          if (!~exports.indexOf(['object', 'array', 'function'], type)) {
            if (type !== 'buffer') {
              return jsonStringify(value);
            }
            var json = value.toJSON();
            return jsonStringify(json.data && json.type ? json.data : json, 2).replace(/,(\n|$)/g, '$1');
          }
          for (var prop in value) {
            if (Object.prototype.hasOwnProperty.call(value, prop)) {
              return jsonStringify(exports.canonicalize(value), 2).replace(/,(\n|$)/g, '$1');
            }
          }
          return emptyRepresentation(value, type);
        };
        function jsonStringify(object, spaces, depth) {
          if (typeof spaces === 'undefined') {
            return _stringify(object);
          }
          depth = depth || 1;
          var space = spaces * depth;
          var str = isArray(object) ? '[' : '{';
          var end = isArray(object) ? ']' : '}';
          var length = object.length || exports.keys(object).length;
          function repeat(s, n) {
            return new Array(n).join(s);
          }
          function _stringify(val) {
            switch (exports.type(val)) {
              case 'null':
              case 'undefined':
                val = '[' + val + ']';
                break;
              case 'array':
              case 'object':
                val = jsonStringify(val, spaces, depth + 1);
                break;
              case 'boolean':
              case 'regexp':
              case 'number':
                val = val === 0 && (1 / val) === -Infinity ? '-0' : val.toString();
                break;
              case 'date':
                var sDate = isNaN(val.getTime()) ? val.toString() : val.toISOString();
                val = '[Date: ' + sDate + ']';
                break;
              case 'buffer':
                var json = val.toJSON();
                json = json.data && json.type ? json.data : json;
                val = '[Buffer: ' + jsonStringify(json, 2, depth + 1) + ']';
                break;
              default:
                val = (val === '[Function]' || val === '[Circular]') ? val : JSON.stringify(val);
            }
            return val;
          }
          for (var i in object) {
            if (!object.hasOwnProperty(i)) {
              continue;
            }
            --length;
            str += '\n ' + repeat(' ', space) + (isArray(object) ? '' : '"' + i + '": ') + _stringify(object[i]) + (length ? ',' : '');
          }
          return str + (str.length !== 1 ? '\n' + repeat(' ', --space) + end : end);
        }
        exports.isBuffer = function(value) {
          return typeof Buffer !== 'undefined' && Buffer.isBuffer(value);
        };
        exports.canonicalize = function(value, stack) {
          var canonicalizedObj;
          var prop;
          var type = exports.type(value);
          function withStack(value, fn) {
            stack.push(value);
            fn();
            stack.pop();
          }
          stack = stack || [];
          if (exports.indexOf(stack, value) !== -1) {
            return '[Circular]';
          }
          switch (type) {
            case 'undefined':
            case 'buffer':
            case 'null':
              canonicalizedObj = value;
              break;
            case 'array':
              withStack(value, function() {
                canonicalizedObj = exports.map(value, function(item) {
                  return exports.canonicalize(item, stack);
                });
              });
              break;
            case 'function':
              for (prop in value) {
                canonicalizedObj = {};
                break;
              }
              if (!canonicalizedObj) {
                canonicalizedObj = emptyRepresentation(value, type);
                break;
              }
            case 'object':
              canonicalizedObj = canonicalizedObj || {};
              withStack(value, function() {
                exports.forEach(exports.keys(value).sort(), function(key) {
                  canonicalizedObj[key] = exports.canonicalize(value[key], stack);
                });
              });
              break;
            case 'date':
            case 'number':
            case 'regexp':
            case 'boolean':
              canonicalizedObj = value;
              break;
            default:
              canonicalizedObj = value + '';
          }
          return canonicalizedObj;
        };
        exports.lookupFiles = function lookupFiles(path, extensions, recursive) {
          var files = [];
          var re = new RegExp('\\.(' + extensions.join('|') + ')$');
          if (!exists(path)) {
            if (exists(path + '.js')) {
              path += '.js';
            } else {
              files = glob.sync(path);
              if (!files.length) {
                throw new Error("cannot resolve path (or pattern) '" + path + "'");
              }
              return files;
            }
          }
          try {
            var stat = statSync(path);
            if (stat.isFile()) {
              return path;
            }
          } catch (err) {
            return;
          }
          readdirSync(path).forEach(function(file) {
            file = join(path, file);
            try {
              var stat = statSync(file);
              if (stat.isDirectory()) {
                if (recursive) {
                  files = files.concat(lookupFiles(file, extensions, recursive));
                }
                return;
              }
            } catch (err) {
              return;
            }
            if (!stat.isFile() || !re.test(file) || basename(file)[0] === '.') {
              return;
            }
            files.push(file);
          });
          return files;
        };
        exports.undefinedError = function() {
          return new Error('Caught undefined error, did you throw without specifying what?');
        };
        exports.getError = function(err) {
          return err || exports.undefinedError();
        };
        exports.stackTraceFilter = function() {
          var slash = '/';
          var is = typeof document === 'undefined' ? {node: true} : {browser: true};
          var cwd = is.node ? process.cwd() + slash : (typeof location === 'undefined' ? window.location : location).href.replace(/\/[^\/]*$/, '/');
          function isMochaInternal(line) {
            return (~line.indexOf('node_modules' + slash + 'mocha' + slash)) || (~line.indexOf('components' + slash + 'mochajs' + slash)) || (~line.indexOf('components' + slash + 'mocha' + slash)) || (~line.indexOf(slash + 'mocha.js'));
          }
          function isNodeInternal(line) {
            return (~line.indexOf('(timers.js:')) || (~line.indexOf('(events.js:')) || (~line.indexOf('(node.js:')) || (~line.indexOf('(module.js:')) || (~line.indexOf('GeneratorFunctionPrototype.next (native)')) || false;
          }
          return function(stack) {
            stack = stack.split('\n');
            stack = exports.reduce(stack, function(list, line) {
              if (isMochaInternal(line)) {
                return list;
              }
              if (is.node && isNodeInternal(line)) {
                return list;
              }
              list.push(line.replace(cwd, ''));
              return list;
            }, []);
            return stack.join('\n');
          };
        };
      }).call(this, require('_process'), require("buffer").Buffer);
    }, {
      "_process": 51,
      "buffer": 43,
      "debug": 2,
      "fs": 41,
      "glob": 41,
      "path": 41,
      "util": 66
    }],
    40: [function(require, module, exports) {
      (function(process) {
        var WritableStream = require('stream').Writable;
        var inherits = require('util').inherits;
        module.exports = BrowserStdout;
        inherits(BrowserStdout, WritableStream);
        function BrowserStdout(opts) {
          if (!(this instanceof BrowserStdout))
            return new BrowserStdout(opts);
          opts = opts || {};
          WritableStream.call(this, opts);
          this.label = (opts.label !== undefined) ? opts.label : 'stdout';
        }
        BrowserStdout.prototype._write = function(chunks, encoding, cb) {
          var output = chunks.toString ? chunks.toString() : chunks;
          if (this.label === false) {
            console.log(output);
          } else {
            console.log(this.label + ':', output);
          }
          process.nextTick(cb);
        };
      }).call(this, require('_process'));
    }, {
      "_process": 51,
      "stream": 63,
      "util": 66
    }],
    41: [function(require, module, exports) {}, {}],
    42: [function(require, module, exports) {
      arguments[4][41][0].apply(exports, arguments);
    }, {"dup": 41}],
    43: [function(require, module, exports) {
      var base64 = require('base64-js');
      var ieee754 = require('ieee754');
      var isArray = require('is-array');
      exports.Buffer = Buffer;
      exports.SlowBuffer = SlowBuffer;
      exports.INSPECT_MAX_BYTES = 50;
      Buffer.poolSize = 8192;
      var rootParent = {};
      Buffer.TYPED_ARRAY_SUPPORT = (function() {
        function Bar() {}
        try {
          var arr = new Uint8Array(1);
          arr.foo = function() {
            return 42;
          };
          arr.constructor = Bar;
          return arr.foo() === 42 && arr.constructor === Bar && typeof arr.subarray === 'function' && arr.subarray(1, 1).byteLength === 0;
        } catch (e) {
          return false;
        }
      })();
      function kMaxLength() {
        return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
      }
      function Buffer(arg) {
        if (!(this instanceof Buffer)) {
          if (arguments.length > 1)
            return new Buffer(arg, arguments[1]);
          return new Buffer(arg);
        }
        this.length = 0;
        this.parent = undefined;
        if (typeof arg === 'number') {
          return fromNumber(this, arg);
        }
        if (typeof arg === 'string') {
          return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8');
        }
        return fromObject(this, arg);
      }
      function fromNumber(that, length) {
        that = allocate(that, length < 0 ? 0 : checked(length) | 0);
        if (!Buffer.TYPED_ARRAY_SUPPORT) {
          for (var i = 0; i < length; i++) {
            that[i] = 0;
          }
        }
        return that;
      }
      function fromString(that, string, encoding) {
        if (typeof encoding !== 'string' || encoding === '')
          encoding = 'utf8';
        var length = byteLength(string, encoding) | 0;
        that = allocate(that, length);
        that.write(string, encoding);
        return that;
      }
      function fromObject(that, object) {
        if (Buffer.isBuffer(object))
          return fromBuffer(that, object);
        if (isArray(object))
          return fromArray(that, object);
        if (object == null) {
          throw new TypeError('must start with number, buffer, array or string');
        }
        if (typeof ArrayBuffer !== 'undefined') {
          if (object.buffer instanceof ArrayBuffer) {
            return fromTypedArray(that, object);
          }
          if (object instanceof ArrayBuffer) {
            return fromArrayBuffer(that, object);
          }
        }
        if (object.length)
          return fromArrayLike(that, object);
        return fromJsonObject(that, object);
      }
      function fromBuffer(that, buffer) {
        var length = checked(buffer.length) | 0;
        that = allocate(that, length);
        buffer.copy(that, 0, 0, length);
        return that;
      }
      function fromArray(that, array) {
        var length = checked(array.length) | 0;
        that = allocate(that, length);
        for (var i = 0; i < length; i += 1) {
          that[i] = array[i] & 255;
        }
        return that;
      }
      function fromTypedArray(that, array) {
        var length = checked(array.length) | 0;
        that = allocate(that, length);
        for (var i = 0; i < length; i += 1) {
          that[i] = array[i] & 255;
        }
        return that;
      }
      function fromArrayBuffer(that, array) {
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          array.byteLength;
          that = Buffer._augment(new Uint8Array(array));
        } else {
          that = fromTypedArray(that, new Uint8Array(array));
        }
        return that;
      }
      function fromArrayLike(that, array) {
        var length = checked(array.length) | 0;
        that = allocate(that, length);
        for (var i = 0; i < length; i += 1) {
          that[i] = array[i] & 255;
        }
        return that;
      }
      function fromJsonObject(that, object) {
        var array;
        var length = 0;
        if (object.type === 'Buffer' && isArray(object.data)) {
          array = object.data;
          length = checked(array.length) | 0;
        }
        that = allocate(that, length);
        for (var i = 0; i < length; i += 1) {
          that[i] = array[i] & 255;
        }
        return that;
      }
      function allocate(that, length) {
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          that = Buffer._augment(new Uint8Array(length));
        } else {
          that.length = length;
          that._isBuffer = true;
        }
        var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1;
        if (fromPool)
          that.parent = rootParent;
        return that;
      }
      function checked(length) {
        if (length >= kMaxLength()) {
          throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
        }
        return length | 0;
      }
      function SlowBuffer(subject, encoding) {
        if (!(this instanceof SlowBuffer))
          return new SlowBuffer(subject, encoding);
        var buf = new Buffer(subject, encoding);
        delete buf.parent;
        return buf;
      }
      Buffer.isBuffer = function isBuffer(b) {
        return !!(b != null && b._isBuffer);
      };
      Buffer.compare = function compare(a, b) {
        if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
          throw new TypeError('Arguments must be Buffers');
        }
        if (a === b)
          return 0;
        var x = a.length;
        var y = b.length;
        var i = 0;
        var len = Math.min(x, y);
        while (i < len) {
          if (a[i] !== b[i])
            break;
          ++i;
        }
        if (i !== len) {
          x = a[i];
          y = b[i];
        }
        if (x < y)
          return -1;
        if (y < x)
          return 1;
        return 0;
      };
      Buffer.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
          case 'hex':
          case 'utf8':
          case 'utf-8':
          case 'ascii':
          case 'binary':
          case 'base64':
          case 'raw':
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return true;
          default:
            return false;
        }
      };
      Buffer.concat = function concat(list, length) {
        if (!isArray(list))
          throw new TypeError('list argument must be an Array of Buffers.');
        if (list.length === 0) {
          return new Buffer(0);
        }
        var i;
        if (length === undefined) {
          length = 0;
          for (i = 0; i < list.length; i++) {
            length += list[i].length;
          }
        }
        var buf = new Buffer(length);
        var pos = 0;
        for (i = 0; i < list.length; i++) {
          var item = list[i];
          item.copy(buf, pos);
          pos += item.length;
        }
        return buf;
      };
      function byteLength(string, encoding) {
        if (typeof string !== 'string')
          string = '' + string;
        var len = string.length;
        if (len === 0)
          return 0;
        var loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case 'ascii':
            case 'binary':
            case 'raw':
            case 'raws':
              return len;
            case 'utf8':
            case 'utf-8':
              return utf8ToBytes(string).length;
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
              return len * 2;
            case 'hex':
              return len >>> 1;
            case 'base64':
              return base64ToBytes(string).length;
            default:
              if (loweredCase)
                return utf8ToBytes(string).length;
              encoding = ('' + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer.byteLength = byteLength;
      Buffer.prototype.length = undefined;
      Buffer.prototype.parent = undefined;
      function slowToString(encoding, start, end) {
        var loweredCase = false;
        start = start | 0;
        end = end === undefined || end === Infinity ? this.length : end | 0;
        if (!encoding)
          encoding = 'utf8';
        if (start < 0)
          start = 0;
        if (end > this.length)
          end = this.length;
        if (end <= start)
          return '';
        while (true) {
          switch (encoding) {
            case 'hex':
              return hexSlice(this, start, end);
            case 'utf8':
            case 'utf-8':
              return utf8Slice(this, start, end);
            case 'ascii':
              return asciiSlice(this, start, end);
            case 'binary':
              return binarySlice(this, start, end);
            case 'base64':
              return base64Slice(this, start, end);
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
              return utf16leSlice(this, start, end);
            default:
              if (loweredCase)
                throw new TypeError('Unknown encoding: ' + encoding);
              encoding = (encoding + '').toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer.prototype.toString = function toString() {
        var length = this.length | 0;
        if (length === 0)
          return '';
        if (arguments.length === 0)
          return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer.prototype.equals = function equals(b) {
        if (!Buffer.isBuffer(b))
          throw new TypeError('Argument must be a Buffer');
        if (this === b)
          return true;
        return Buffer.compare(this, b) === 0;
      };
      Buffer.prototype.inspect = function inspect() {
        var str = '';
        var max = exports.INSPECT_MAX_BYTES;
        if (this.length > 0) {
          str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
          if (this.length > max)
            str += ' ... ';
        }
        return '<Buffer ' + str + '>';
      };
      Buffer.prototype.compare = function compare(b) {
        if (!Buffer.isBuffer(b))
          throw new TypeError('Argument must be a Buffer');
        if (this === b)
          return 0;
        return Buffer.compare(this, b);
      };
      Buffer.prototype.indexOf = function indexOf(val, byteOffset) {
        if (byteOffset > 0x7fffffff)
          byteOffset = 0x7fffffff;
        else if (byteOffset < -0x80000000)
          byteOffset = -0x80000000;
        byteOffset >>= 0;
        if (this.length === 0)
          return -1;
        if (byteOffset >= this.length)
          return -1;
        if (byteOffset < 0)
          byteOffset = Math.max(this.length + byteOffset, 0);
        if (typeof val === 'string') {
          if (val.length === 0)
            return -1;
          return String.prototype.indexOf.call(this, val, byteOffset);
        }
        if (Buffer.isBuffer(val)) {
          return arrayIndexOf(this, val, byteOffset);
        }
        if (typeof val === 'number') {
          if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
            return Uint8Array.prototype.indexOf.call(this, val, byteOffset);
          }
          return arrayIndexOf(this, [val], byteOffset);
        }
        function arrayIndexOf(arr, val, byteOffset) {
          var foundIndex = -1;
          for (var i = 0; byteOffset + i < arr.length; i++) {
            if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
              if (foundIndex === -1)
                foundIndex = i;
              if (i - foundIndex + 1 === val.length)
                return byteOffset + foundIndex;
            } else {
              foundIndex = -1;
            }
          }
          return -1;
        }
        throw new TypeError('val must be string, number or Buffer');
      };
      Buffer.prototype.get = function get(offset) {
        console.log('.get() is deprecated. Access using array indexes instead.');
        return this.readUInt8(offset);
      };
      Buffer.prototype.set = function set(v, offset) {
        console.log('.set() is deprecated. Access using array indexes instead.');
        return this.writeUInt8(v, offset);
      };
      function hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        var remaining = buf.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }
        var strLen = string.length;
        if (strLen % 2 !== 0)
          throw new Error('Invalid hex string');
        if (length > strLen / 2) {
          length = strLen / 2;
        }
        for (var i = 0; i < length; i++) {
          var parsed = parseInt(string.substr(i * 2, 2), 16);
          if (isNaN(parsed))
            throw new Error('Invalid hex string');
          buf[offset + i] = parsed;
        }
        return i;
      }
      function utf8Write(buf, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
      }
      function asciiWrite(buf, string, offset, length) {
        return blitBuffer(asciiToBytes(string), buf, offset, length);
      }
      function binaryWrite(buf, string, offset, length) {
        return asciiWrite(buf, string, offset, length);
      }
      function base64Write(buf, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf, offset, length);
      }
      function ucs2Write(buf, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
      }
      Buffer.prototype.write = function write(string, offset, length, encoding) {
        if (offset === undefined) {
          encoding = 'utf8';
          length = this.length;
          offset = 0;
        } else if (length === undefined && typeof offset === 'string') {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else if (isFinite(offset)) {
          offset = offset | 0;
          if (isFinite(length)) {
            length = length | 0;
            if (encoding === undefined)
              encoding = 'utf8';
          } else {
            encoding = length;
            length = undefined;
          }
        } else {
          var swap = encoding;
          encoding = offset;
          offset = length | 0;
          length = swap;
        }
        var remaining = this.length - offset;
        if (length === undefined || length > remaining)
          length = remaining;
        if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
          throw new RangeError('attempt to write outside buffer bounds');
        }
        if (!encoding)
          encoding = 'utf8';
        var loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case 'hex':
              return hexWrite(this, string, offset, length);
            case 'utf8':
            case 'utf-8':
              return utf8Write(this, string, offset, length);
            case 'ascii':
              return asciiWrite(this, string, offset, length);
            case 'binary':
              return binaryWrite(this, string, offset, length);
            case 'base64':
              return base64Write(this, string, offset, length);
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
              return ucs2Write(this, string, offset, length);
            default:
              if (loweredCase)
                throw new TypeError('Unknown encoding: ' + encoding);
              encoding = ('' + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      };
      Buffer.prototype.toJSON = function toJSON() {
        return {
          type: 'Buffer',
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return base64.fromByteArray(buf);
        } else {
          return base64.fromByteArray(buf.slice(start, end));
        }
      }
      function utf8Slice(buf, start, end) {
        end = Math.min(buf.length, end);
        var res = [];
        var i = start;
        while (i < end) {
          var firstByte = buf[i];
          var codePoint = null;
          var bytesPerSequence = (firstByte > 0xEF) ? 4 : (firstByte > 0xDF) ? 3 : (firstByte > 0xBF) ? 2 : 1;
          if (i + bytesPerSequence <= end) {
            var secondByte = void 0,
                thirdByte = void 0,
                fourthByte = void 0,
                tempCodePoint = void 0;
            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 0x80) {
                  codePoint = firstByte;
                }
                break;
              case 2:
                secondByte = buf[i + 1];
                if ((secondByte & 0xC0) === 0x80) {
                  tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
                  if (tempCodePoint > 0x7F) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 3:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
                  tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
                  if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 4:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                fourthByte = buf[i + 3];
                if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
                  tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
                  if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                    codePoint = tempCodePoint;
                  }
                }
            }
          }
          if (codePoint === null) {
            codePoint = 0xFFFD;
            bytesPerSequence = 1;
          } else if (codePoint > 0xFFFF) {
            codePoint -= 0x10000;
            res.push(codePoint >>> 10 & 0x3FF | 0xD800);
            codePoint = 0xDC00 | codePoint & 0x3FF;
          }
          res.push(codePoint);
          i += bytesPerSequence;
        }
        return decodeCodePointsArray(res);
      }
      var MAX_ARGUMENTS_LENGTH = 0x1000;
      function decodeCodePointsArray(codePoints) {
        var len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH) {
          return String.fromCharCode.apply(String, codePoints);
        }
        var res = '';
        var i = 0;
        while (i < len) {
          res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
        }
        return res;
      }
      function asciiSlice(buf, start, end) {
        var ret = '';
        end = Math.min(buf.length, end);
        for (var i = start; i < end; i++) {
          ret += String.fromCharCode(buf[i] & 0x7F);
        }
        return ret;
      }
      function binarySlice(buf, start, end) {
        var ret = '';
        end = Math.min(buf.length, end);
        for (var i = start; i < end; i++) {
          ret += String.fromCharCode(buf[i]);
        }
        return ret;
      }
      function hexSlice(buf, start, end) {
        var len = buf.length;
        if (!start || start < 0)
          start = 0;
        if (!end || end < 0 || end > len)
          end = len;
        var out = '';
        for (var i = start; i < end; i++) {
          out += toHex(buf[i]);
        }
        return out;
      }
      function utf16leSlice(buf, start, end) {
        var bytes = buf.slice(start, end);
        var res = '';
        for (var i = 0; i < bytes.length; i += 2) {
          res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
        }
        return res;
      }
      Buffer.prototype.slice = function slice(start, end) {
        var len = this.length;
        start = ~~start;
        end = end === undefined ? len : ~~end;
        if (start < 0) {
          start += len;
          if (start < 0)
            start = 0;
        } else if (start > len) {
          start = len;
        }
        if (end < 0) {
          end += len;
          if (end < 0)
            end = 0;
        } else if (end > len) {
          end = len;
        }
        if (end < start)
          end = start;
        var newBuf;
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          newBuf = Buffer._augment(this.subarray(start, end));
        } else {
          var sliceLen = end - start;
          newBuf = new Buffer(sliceLen, undefined);
          for (var i = 0; i < sliceLen; i++) {
            newBuf[i] = this[i + start];
          }
        }
        if (newBuf.length)
          newBuf.parent = this.parent || this;
        return newBuf;
      };
      function checkOffset(offset, ext, length) {
        if ((offset % 1) !== 0 || offset < 0)
          throw new RangeError('offset is not uint');
        if (offset + ext > length)
          throw new RangeError('Trying to access beyond buffer length');
      }
      Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
        offset = offset | 0;
        byteLength = byteLength | 0;
        if (!noAssert)
          checkOffset(offset, byteLength, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength && (mul *= 0x100)) {
          val += this[offset + i] * mul;
        }
        return val;
      };
      Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
        offset = offset | 0;
        byteLength = byteLength | 0;
        if (!noAssert) {
          checkOffset(offset, byteLength, this.length);
        }
        var val = this[offset + --byteLength];
        var mul = 1;
        while (byteLength > 0 && (mul *= 0x100)) {
          val += this[offset + --byteLength] * mul;
        }
        return val;
      };
      Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        return this[offset] | (this[offset + 1] << 8);
      };
      Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        return (this[offset] << 8) | this[offset + 1];
      };
      Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return ((this[offset]) | (this[offset + 1] << 8) | (this[offset + 2] << 16)) + (this[offset + 3] * 0x1000000);
      };
      Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return (this[offset] * 0x1000000) + ((this[offset + 1] << 16) | (this[offset + 2] << 8) | this[offset + 3]);
      };
      Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
        offset = offset | 0;
        byteLength = byteLength | 0;
        if (!noAssert)
          checkOffset(offset, byteLength, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength && (mul *= 0x100)) {
          val += this[offset + i] * mul;
        }
        mul *= 0x80;
        if (val >= mul)
          val -= Math.pow(2, 8 * byteLength);
        return val;
      };
      Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
        offset = offset | 0;
        byteLength = byteLength | 0;
        if (!noAssert)
          checkOffset(offset, byteLength, this.length);
        var i = byteLength;
        var mul = 1;
        var val = this[offset + --i];
        while (i > 0 && (mul *= 0x100)) {
          val += this[offset + --i] * mul;
        }
        mul *= 0x80;
        if (val >= mul)
          val -= Math.pow(2, 8 * byteLength);
        return val;
      };
      Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 1, this.length);
        if (!(this[offset] & 0x80))
          return (this[offset]);
        return ((0xff - this[offset] + 1) * -1);
      };
      Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        var val = this[offset] | (this[offset + 1] << 8);
        return (val & 0x8000) ? val | 0xFFFF0000 : val;
      };
      Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        var val = this[offset + 1] | (this[offset] << 8);
        return (val & 0x8000) ? val | 0xFFFF0000 : val;
      };
      Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return (this[offset]) | (this[offset + 1] << 8) | (this[offset + 2] << 16) | (this[offset + 3] << 24);
      };
      Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return (this[offset] << 24) | (this[offset + 1] << 16) | (this[offset + 2] << 8) | (this[offset + 3]);
      };
      Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, true, 23, 4);
      };
      Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, false, 23, 4);
      };
      Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, true, 52, 8);
      };
      Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, false, 52, 8);
      };
      function checkInt(buf, value, offset, ext, max, min) {
        if (!Buffer.isBuffer(buf))
          throw new TypeError('buffer must be a Buffer instance');
        if (value > max || value < min)
          throw new RangeError('value is out of bounds');
        if (offset + ext > buf.length)
          throw new RangeError('index out of range');
      }
      Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
        value = +value;
        offset = offset | 0;
        byteLength = byteLength | 0;
        if (!noAssert)
          checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0);
        var mul = 1;
        var i = 0;
        this[offset] = value & 0xFF;
        while (++i < byteLength && (mul *= 0x100)) {
          this[offset + i] = (value / mul) & 0xFF;
        }
        return offset + byteLength;
      };
      Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
        value = +value;
        offset = offset | 0;
        byteLength = byteLength | 0;
        if (!noAssert)
          checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0);
        var i = byteLength - 1;
        var mul = 1;
        this[offset + i] = value & 0xFF;
        while (--i >= 0 && (mul *= 0x100)) {
          this[offset + i] = (value / mul) & 0xFF;
        }
        return offset + byteLength;
      };
      Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 1, 0xff, 0);
        if (!Buffer.TYPED_ARRAY_SUPPORT)
          value = Math.floor(value);
        this[offset] = value;
        return offset + 1;
      };
      function objectWriteUInt16(buf, value, offset, littleEndian) {
        if (value < 0)
          value = 0xffff + value + 1;
        for (var i = 0,
            j = Math.min(buf.length - offset, 2); i < j; i++) {
          buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>> (littleEndian ? i : 1 - i) * 8;
        }
      }
      Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 0xffff, 0);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = value;
          this[offset + 1] = (value >>> 8);
        } else {
          objectWriteUInt16(this, value, offset, true);
        }
        return offset + 2;
      };
      Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 0xffff, 0);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = (value >>> 8);
          this[offset + 1] = value;
        } else {
          objectWriteUInt16(this, value, offset, false);
        }
        return offset + 2;
      };
      function objectWriteUInt32(buf, value, offset, littleEndian) {
        if (value < 0)
          value = 0xffffffff + value + 1;
        for (var i = 0,
            j = Math.min(buf.length - offset, 4); i < j; i++) {
          buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
        }
      }
      Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 0xffffffff, 0);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset + 3] = (value >>> 24);
          this[offset + 2] = (value >>> 16);
          this[offset + 1] = (value >>> 8);
          this[offset] = value;
        } else {
          objectWriteUInt32(this, value, offset, true);
        }
        return offset + 4;
      };
      Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 0xffffffff, 0);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = (value >>> 24);
          this[offset + 1] = (value >>> 16);
          this[offset + 2] = (value >>> 8);
          this[offset + 3] = value;
        } else {
          objectWriteUInt32(this, value, offset, false);
        }
        return offset + 4;
      };
      Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength - 1);
          checkInt(this, value, offset, byteLength, limit - 1, -limit);
        }
        var i = 0;
        var mul = 1;
        var sub = value < 0 ? 1 : 0;
        this[offset] = value & 0xFF;
        while (++i < byteLength && (mul *= 0x100)) {
          this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
        }
        return offset + byteLength;
      };
      Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength - 1);
          checkInt(this, value, offset, byteLength, limit - 1, -limit);
        }
        var i = byteLength - 1;
        var mul = 1;
        var sub = value < 0 ? 1 : 0;
        this[offset + i] = value & 0xFF;
        while (--i >= 0 && (mul *= 0x100)) {
          this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
        }
        return offset + byteLength;
      };
      Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 1, 0x7f, -0x80);
        if (!Buffer.TYPED_ARRAY_SUPPORT)
          value = Math.floor(value);
        if (value < 0)
          value = 0xff + value + 1;
        this[offset] = value;
        return offset + 1;
      };
      Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 0x7fff, -0x8000);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = value;
          this[offset + 1] = (value >>> 8);
        } else {
          objectWriteUInt16(this, value, offset, true);
        }
        return offset + 2;
      };
      Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 0x7fff, -0x8000);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = (value >>> 8);
          this[offset + 1] = value;
        } else {
          objectWriteUInt16(this, value, offset, false);
        }
        return offset + 2;
      };
      Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = value;
          this[offset + 1] = (value >>> 8);
          this[offset + 2] = (value >>> 16);
          this[offset + 3] = (value >>> 24);
        } else {
          objectWriteUInt32(this, value, offset, true);
        }
        return offset + 4;
      };
      Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
        if (value < 0)
          value = 0xffffffff + value + 1;
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = (value >>> 24);
          this[offset + 1] = (value >>> 16);
          this[offset + 2] = (value >>> 8);
          this[offset + 3] = value;
        } else {
          objectWriteUInt32(this, value, offset, false);
        }
        return offset + 4;
      };
      function checkIEEE754(buf, value, offset, ext, max, min) {
        if (value > max || value < min)
          throw new RangeError('value is out of bounds');
        if (offset + ext > buf.length)
          throw new RangeError('index out of range');
        if (offset < 0)
          throw new RangeError('index out of range');
      }
      function writeFloat(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
        }
        ieee754.write(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };
      function writeDouble(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
        }
        ieee754.write(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer.prototype.copy = function copy(target, targetStart, start, end) {
        if (!start)
          start = 0;
        if (!end && end !== 0)
          end = this.length;
        if (targetStart >= target.length)
          targetStart = target.length;
        if (!targetStart)
          targetStart = 0;
        if (end > 0 && end < start)
          end = start;
        if (end === start)
          return 0;
        if (target.length === 0 || this.length === 0)
          return 0;
        if (targetStart < 0) {
          throw new RangeError('targetStart out of bounds');
        }
        if (start < 0 || start >= this.length)
          throw new RangeError('sourceStart out of bounds');
        if (end < 0)
          throw new RangeError('sourceEnd out of bounds');
        if (end > this.length)
          end = this.length;
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start;
        }
        var len = end - start;
        var i;
        if (this === target && start < targetStart && targetStart < end) {
          for (i = len - 1; i >= 0; i--) {
            target[i + targetStart] = this[i + start];
          }
        } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
          for (i = 0; i < len; i++) {
            target[i + targetStart] = this[i + start];
          }
        } else {
          target._set(this.subarray(start, start + len), targetStart);
        }
        return len;
      };
      Buffer.prototype.fill = function fill(value, start, end) {
        if (!value)
          value = 0;
        if (!start)
          start = 0;
        if (!end)
          end = this.length;
        if (end < start)
          throw new RangeError('end < start');
        if (end === start)
          return;
        if (this.length === 0)
          return;
        if (start < 0 || start >= this.length)
          throw new RangeError('start out of bounds');
        if (end < 0 || end > this.length)
          throw new RangeError('end out of bounds');
        var i;
        if (typeof value === 'number') {
          for (i = start; i < end; i++) {
            this[i] = value;
          }
        } else {
          var bytes = utf8ToBytes(value.toString());
          var len = bytes.length;
          for (i = start; i < end; i++) {
            this[i] = bytes[i % len];
          }
        }
        return this;
      };
      Buffer.prototype.toArrayBuffer = function toArrayBuffer() {
        if (typeof Uint8Array !== 'undefined') {
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            return (new Buffer(this)).buffer;
          } else {
            var buf = new Uint8Array(this.length);
            for (var i = 0,
                len = buf.length; i < len; i += 1) {
              buf[i] = this[i];
            }
            return buf.buffer;
          }
        } else {
          throw new TypeError('Buffer.toArrayBuffer not supported in this browser');
        }
      };
      var BP = Buffer.prototype;
      Buffer._augment = function _augment(arr) {
        arr.constructor = Buffer;
        arr._isBuffer = true;
        arr._set = arr.set;
        arr.get = BP.get;
        arr.set = BP.set;
        arr.write = BP.write;
        arr.toString = BP.toString;
        arr.toLocaleString = BP.toString;
        arr.toJSON = BP.toJSON;
        arr.equals = BP.equals;
        arr.compare = BP.compare;
        arr.indexOf = BP.indexOf;
        arr.copy = BP.copy;
        arr.slice = BP.slice;
        arr.readUIntLE = BP.readUIntLE;
        arr.readUIntBE = BP.readUIntBE;
        arr.readUInt8 = BP.readUInt8;
        arr.readUInt16LE = BP.readUInt16LE;
        arr.readUInt16BE = BP.readUInt16BE;
        arr.readUInt32LE = BP.readUInt32LE;
        arr.readUInt32BE = BP.readUInt32BE;
        arr.readIntLE = BP.readIntLE;
        arr.readIntBE = BP.readIntBE;
        arr.readInt8 = BP.readInt8;
        arr.readInt16LE = BP.readInt16LE;
        arr.readInt16BE = BP.readInt16BE;
        arr.readInt32LE = BP.readInt32LE;
        arr.readInt32BE = BP.readInt32BE;
        arr.readFloatLE = BP.readFloatLE;
        arr.readFloatBE = BP.readFloatBE;
        arr.readDoubleLE = BP.readDoubleLE;
        arr.readDoubleBE = BP.readDoubleBE;
        arr.writeUInt8 = BP.writeUInt8;
        arr.writeUIntLE = BP.writeUIntLE;
        arr.writeUIntBE = BP.writeUIntBE;
        arr.writeUInt16LE = BP.writeUInt16LE;
        arr.writeUInt16BE = BP.writeUInt16BE;
        arr.writeUInt32LE = BP.writeUInt32LE;
        arr.writeUInt32BE = BP.writeUInt32BE;
        arr.writeIntLE = BP.writeIntLE;
        arr.writeIntBE = BP.writeIntBE;
        arr.writeInt8 = BP.writeInt8;
        arr.writeInt16LE = BP.writeInt16LE;
        arr.writeInt16BE = BP.writeInt16BE;
        arr.writeInt32LE = BP.writeInt32LE;
        arr.writeInt32BE = BP.writeInt32BE;
        arr.writeFloatLE = BP.writeFloatLE;
        arr.writeFloatBE = BP.writeFloatBE;
        arr.writeDoubleLE = BP.writeDoubleLE;
        arr.writeDoubleBE = BP.writeDoubleBE;
        arr.fill = BP.fill;
        arr.inspect = BP.inspect;
        arr.toArrayBuffer = BP.toArrayBuffer;
        return arr;
      };
      var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
      function base64clean(str) {
        str = stringtrim(str).replace(INVALID_BASE64_RE, '');
        if (str.length < 2)
          return '';
        while (str.length % 4 !== 0) {
          str = str + '=';
        }
        return str;
      }
      function stringtrim(str) {
        if (str.trim)
          return str.trim();
        return str.replace(/^\s+|\s+$/g, '');
      }
      function toHex(n) {
        if (n < 16)
          return '0' + n.toString(16);
        return n.toString(16);
      }
      function utf8ToBytes(string, units) {
        units = units || Infinity;
        var codePoint;
        var length = string.length;
        var leadSurrogate = null;
        var bytes = [];
        for (var i = 0; i < length; i++) {
          codePoint = string.charCodeAt(i);
          if (codePoint > 0xD7FF && codePoint < 0xE000) {
            if (!leadSurrogate) {
              if (codePoint > 0xDBFF) {
                if ((units -= 3) > -1)
                  bytes.push(0xEF, 0xBF, 0xBD);
                continue;
              } else if (i + 1 === length) {
                if ((units -= 3) > -1)
                  bytes.push(0xEF, 0xBF, 0xBD);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 0xDC00) {
              if ((units -= 3) > -1)
                bytes.push(0xEF, 0xBF, 0xBD);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00 | 0x10000;
          } else if (leadSurrogate) {
            if ((units -= 3) > -1)
              bytes.push(0xEF, 0xBF, 0xBD);
          }
          leadSurrogate = null;
          if (codePoint < 0x80) {
            if ((units -= 1) < 0)
              break;
            bytes.push(codePoint);
          } else if (codePoint < 0x800) {
            if ((units -= 2) < 0)
              break;
            bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
          } else if (codePoint < 0x10000) {
            if ((units -= 3) < 0)
              break;
            bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
          } else if (codePoint < 0x110000) {
            if ((units -= 4) < 0)
              break;
            bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
          } else {
            throw new Error('Invalid code point');
          }
        }
        return bytes;
      }
      function asciiToBytes(str) {
        var byteArray = [];
        for (var i = 0; i < str.length; i++) {
          byteArray.push(str.charCodeAt(i) & 0xFF);
        }
        return byteArray;
      }
      function utf16leToBytes(str, units) {
        var c,
            hi,
            lo;
        var byteArray = [];
        for (var i = 0; i < str.length; i++) {
          if ((units -= 2) < 0)
            break;
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str));
      }
      function blitBuffer(src, dst, offset, length) {
        for (var i = 0; i < length; i++) {
          if ((i + offset >= dst.length) || (i >= src.length))
            break;
          dst[i + offset] = src[i];
        }
        return i;
      }
    }, {
      "base64-js": 44,
      "ieee754": 45,
      "is-array": 46
    }],
    44: [function(require, module, exports) {
      var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      ;
      (function(exports) {
        'use strict';
        var Arr = (typeof Uint8Array !== 'undefined') ? Uint8Array : Array;
        var PLUS = '+'.charCodeAt(0);
        var SLASH = '/'.charCodeAt(0);
        var NUMBER = '0'.charCodeAt(0);
        var LOWER = 'a'.charCodeAt(0);
        var UPPER = 'A'.charCodeAt(0);
        var PLUS_URL_SAFE = '-'.charCodeAt(0);
        var SLASH_URL_SAFE = '_'.charCodeAt(0);
        function decode(elt) {
          var code = elt.charCodeAt(0);
          if (code === PLUS || code === PLUS_URL_SAFE)
            return 62;
          if (code === SLASH || code === SLASH_URL_SAFE)
            return 63;
          if (code < NUMBER)
            return -1;
          if (code < NUMBER + 10)
            return code - NUMBER + 26 + 26;
          if (code < UPPER + 26)
            return code - UPPER;
          if (code < LOWER + 26)
            return code - LOWER + 26;
        }
        function b64ToByteArray(b64) {
          var i,
              j,
              l,
              tmp,
              placeHolders,
              arr;
          if (b64.length % 4 > 0) {
            throw new Error('Invalid string. Length must be a multiple of 4');
          }
          var len = b64.length;
          placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0;
          arr = new Arr(b64.length * 3 / 4 - placeHolders);
          l = placeHolders > 0 ? b64.length - 4 : b64.length;
          var L = 0;
          function push(v) {
            arr[L++] = v;
          }
          for (i = 0, j = 0; i < l; i += 4, j += 3) {
            tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3));
            push((tmp & 0xFF0000) >> 16);
            push((tmp & 0xFF00) >> 8);
            push(tmp & 0xFF);
          }
          if (placeHolders === 2) {
            tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4);
            push(tmp & 0xFF);
          } else if (placeHolders === 1) {
            tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2);
            push((tmp >> 8) & 0xFF);
            push(tmp & 0xFF);
          }
          return arr;
        }
        function uint8ToBase64(uint8) {
          var i,
              extraBytes = uint8.length % 3,
              output = "",
              temp,
              length;
          function encode(num) {
            return lookup.charAt(num);
          }
          function tripletToBase64(num) {
            return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F);
          }
          for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
            temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
            output += tripletToBase64(temp);
          }
          switch (extraBytes) {
            case 1:
              temp = uint8[uint8.length - 1];
              output += encode(temp >> 2);
              output += encode((temp << 4) & 0x3F);
              output += '==';
              break;
            case 2:
              temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1]);
              output += encode(temp >> 10);
              output += encode((temp >> 4) & 0x3F);
              output += encode((temp << 2) & 0x3F);
              output += '=';
              break;
          }
          return output;
        }
        exports.toByteArray = b64ToByteArray;
        exports.fromByteArray = uint8ToBase64;
      }(typeof exports === 'undefined' ? (this.base64js = {}) : exports));
    }, {}],
    45: [function(require, module, exports) {
      exports.read = function(buffer, offset, isLE, mLen, nBytes) {
        var e,
            m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? (nBytes - 1) : 0;
        var d = isLE ? -1 : 1;
        var s = buffer[offset + i];
        i += d;
        e = s & ((1 << (-nBits)) - 1);
        s >>= (-nBits);
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
        m = e & ((1 << (-nBits)) - 1);
        e >>= (-nBits);
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : ((s ? -1 : 1) * Infinity);
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };
      exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
        var e,
            m,
            c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
        var i = isLE ? 0 : (nBytes - 1);
        var d = isLE ? 1 : -1;
        var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
        e = (e << mLen) | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
        buffer[offset + i - d] |= s * 128;
      };
    }, {}],
    46: [function(require, module, exports) {
      var isArray = Array.isArray;
      var str = Object.prototype.toString;
      module.exports = isArray || function(val) {
        return !!val && '[object Array]' == str.call(val);
      };
    }, {}],
    47: [function(require, module, exports) {
      function EventEmitter() {
        this._events = this._events || {};
        this._maxListeners = this._maxListeners || undefined;
      }
      module.exports = EventEmitter;
      EventEmitter.EventEmitter = EventEmitter;
      EventEmitter.prototype._events = undefined;
      EventEmitter.prototype._maxListeners = undefined;
      EventEmitter.defaultMaxListeners = 10;
      EventEmitter.prototype.setMaxListeners = function(n) {
        if (!isNumber(n) || n < 0 || isNaN(n))
          throw TypeError('n must be a positive number');
        this._maxListeners = n;
        return this;
      };
      EventEmitter.prototype.emit = function(type) {
        var er,
            handler,
            len,
            args,
            i,
            listeners;
        if (!this._events)
          this._events = {};
        if (type === 'error') {
          if (!this._events.error || (isObject(this._events.error) && !this._events.error.length)) {
            er = arguments[1];
            if (er instanceof Error) {
              throw er;
            }
            throw TypeError('Uncaught, unspecified "error" event.');
          }
        }
        handler = this._events[type];
        if (isUndefined(handler))
          return false;
        if (isFunction(handler)) {
          switch (arguments.length) {
            case 1:
              handler.call(this);
              break;
            case 2:
              handler.call(this, arguments[1]);
              break;
            case 3:
              handler.call(this, arguments[1], arguments[2]);
              break;
            default:
              len = arguments.length;
              args = new Array(len - 1);
              for (i = 1; i < len; i++)
                args[i - 1] = arguments[i];
              handler.apply(this, args);
          }
        } else if (isObject(handler)) {
          len = arguments.length;
          args = new Array(len - 1);
          for (i = 1; i < len; i++)
            args[i - 1] = arguments[i];
          listeners = handler.slice();
          len = listeners.length;
          for (i = 0; i < len; i++)
            listeners[i].apply(this, args);
        }
        return true;
      };
      EventEmitter.prototype.addListener = function(type, listener) {
        var m;
        if (!isFunction(listener))
          throw TypeError('listener must be a function');
        if (!this._events)
          this._events = {};
        if (this._events.newListener)
          this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);
        if (!this._events[type])
          this._events[type] = listener;
        else if (isObject(this._events[type]))
          this._events[type].push(listener);
        else
          this._events[type] = [this._events[type], listener];
        if (isObject(this._events[type]) && !this._events[type].warned) {
          var m;
          if (!isUndefined(this._maxListeners)) {
            m = this._maxListeners;
          } else {
            m = EventEmitter.defaultMaxListeners;
          }
          if (m && m > 0 && this._events[type].length > m) {
            this._events[type].warned = true;
            console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
            if (typeof console.trace === 'function') {
              console.trace();
            }
          }
        }
        return this;
      };
      EventEmitter.prototype.on = EventEmitter.prototype.addListener;
      EventEmitter.prototype.once = function(type, listener) {
        if (!isFunction(listener))
          throw TypeError('listener must be a function');
        var fired = false;
        function g() {
          this.removeListener(type, g);
          if (!fired) {
            fired = true;
            listener.apply(this, arguments);
          }
        }
        g.listener = listener;
        this.on(type, g);
        return this;
      };
      EventEmitter.prototype.removeListener = function(type, listener) {
        var list,
            position,
            length,
            i;
        if (!isFunction(listener))
          throw TypeError('listener must be a function');
        if (!this._events || !this._events[type])
          return this;
        list = this._events[type];
        length = list.length;
        position = -1;
        if (list === listener || (isFunction(list.listener) && list.listener === listener)) {
          delete this._events[type];
          if (this._events.removeListener)
            this.emit('removeListener', type, listener);
        } else if (isObject(list)) {
          for (i = length; i-- > 0; ) {
            if (list[i] === listener || (list[i].listener && list[i].listener === listener)) {
              position = i;
              break;
            }
          }
          if (position < 0)
            return this;
          if (list.length === 1) {
            list.length = 0;
            delete this._events[type];
          } else {
            list.splice(position, 1);
          }
          if (this._events.removeListener)
            this.emit('removeListener', type, listener);
        }
        return this;
      };
      EventEmitter.prototype.removeAllListeners = function(type) {
        var key,
            listeners;
        if (!this._events)
          return this;
        if (!this._events.removeListener) {
          if (arguments.length === 0)
            this._events = {};
          else if (this._events[type])
            delete this._events[type];
          return this;
        }
        if (arguments.length === 0) {
          for (key in this._events) {
            if (key === 'removeListener')
              continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners('removeListener');
          this._events = {};
          return this;
        }
        listeners = this._events[type];
        if (isFunction(listeners)) {
          this.removeListener(type, listeners);
        } else {
          while (listeners.length)
            this.removeListener(type, listeners[listeners.length - 1]);
        }
        delete this._events[type];
        return this;
      };
      EventEmitter.prototype.listeners = function(type) {
        var ret;
        if (!this._events || !this._events[type])
          ret = [];
        else if (isFunction(this._events[type]))
          ret = [this._events[type]];
        else
          ret = this._events[type].slice();
        return ret;
      };
      EventEmitter.listenerCount = function(emitter, type) {
        var ret;
        if (!emitter._events || !emitter._events[type])
          ret = 0;
        else if (isFunction(emitter._events[type]))
          ret = 1;
        else
          ret = emitter._events[type].length;
        return ret;
      };
      function isFunction(arg) {
        return typeof arg === 'function';
      }
      function isNumber(arg) {
        return typeof arg === 'number';
      }
      function isObject(arg) {
        return (typeof arg === 'undefined' ? 'undefined' : $traceurRuntime.typeof(arg)) === 'object' && arg !== null;
      }
      function isUndefined(arg) {
        return arg === void 0;
      }
    }, {}],
    48: [function(require, module, exports) {
      if (typeof Object.create === 'function') {
        module.exports = function inherits(ctor, superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }});
        };
      } else {
        module.exports = function inherits(ctor, superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {};
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        };
      }
    }, {}],
    49: [function(require, module, exports) {
      module.exports = Array.isArray || function(arr) {
        return Object.prototype.toString.call(arr) == '[object Array]';
      };
    }, {}],
    50: [function(require, module, exports) {
      exports.endianness = function() {
        return 'LE';
      };
      exports.hostname = function() {
        if (typeof location !== 'undefined') {
          return location.hostname;
        } else
          return '';
      };
      exports.loadavg = function() {
        return [];
      };
      exports.uptime = function() {
        return 0;
      };
      exports.freemem = function() {
        return Number.MAX_VALUE;
      };
      exports.totalmem = function() {
        return Number.MAX_VALUE;
      };
      exports.cpus = function() {
        return [];
      };
      exports.type = function() {
        return 'Browser';
      };
      exports.release = function() {
        if (typeof navigator !== 'undefined') {
          return navigator.appVersion;
        }
        return '';
      };
      exports.networkInterfaces = exports.getNetworkInterfaces = function() {
        return {};
      };
      exports.arch = function() {
        return 'javascript';
      };
      exports.platform = function() {
        return 'browser';
      };
      exports.tmpdir = exports.tmpDir = function() {
        return '/tmp';
      };
      exports.EOL = '\n';
    }, {}],
    51: [function(require, module, exports) {
      var process = module.exports = {};
      var queue = [];
      var draining = false;
      var currentQueue;
      var queueIndex = -1;
      function cleanUpNextTick() {
        draining = false;
        if (currentQueue.length) {
          queue = currentQueue.concat(queue);
        } else {
          queueIndex = -1;
        }
        if (queue.length) {
          drainQueue();
        }
      }
      function drainQueue() {
        if (draining) {
          return;
        }
        var timeout = setTimeout(cleanUpNextTick);
        draining = true;
        var len = queue.length;
        while (len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
            if (currentQueue) {
              currentQueue[queueIndex].run();
            }
          }
          queueIndex = -1;
          len = queue.length;
        }
        currentQueue = null;
        draining = false;
        clearTimeout(timeout);
      }
      process.nextTick = function(fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
          }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
          setTimeout(drainQueue, 0);
        }
      };
      function Item(fun, array) {
        this.fun = fun;
        this.array = array;
      }
      Item.prototype.run = function() {
        this.fun.apply(null, this.array);
      };
      process.title = 'browser';
      process.browser = true;
      process.env = {};
      process.argv = [];
      process.version = '';
      process.versions = {};
      function noop() {}
      process.on = noop;
      process.addListener = noop;
      process.once = noop;
      process.off = noop;
      process.removeListener = noop;
      process.removeAllListeners = noop;
      process.emit = noop;
      process.binding = function(name) {
        throw new Error('process.binding is not supported');
      };
      process.cwd = function() {
        return '/';
      };
      process.chdir = function(dir) {
        throw new Error('process.chdir is not supported');
      };
      process.umask = function() {
        return 0;
      };
    }, {}],
    52: [function(require, module, exports) {
      module.exports = require("./lib/_stream_duplex.js");
    }, {"./lib/_stream_duplex.js": 53}],
    53: [function(require, module, exports) {
      (function(process) {
        module.exports = Duplex;
        var objectKeys = Object.keys || function(obj) {
          var keys = [];
          for (var key in obj)
            keys.push(key);
          return keys;
        };
        var util = require('core-util-is');
        util.inherits = require('inherits');
        var Readable = require('./_stream_readable');
        var Writable = require('./_stream_writable');
        util.inherits(Duplex, Readable);
        forEach(objectKeys(Writable.prototype), function(method) {
          if (!Duplex.prototype[method])
            Duplex.prototype[method] = Writable.prototype[method];
        });
        function Duplex(options) {
          if (!(this instanceof Duplex))
            return new Duplex(options);
          Readable.call(this, options);
          Writable.call(this, options);
          if (options && options.readable === false)
            this.readable = false;
          if (options && options.writable === false)
            this.writable = false;
          this.allowHalfOpen = true;
          if (options && options.allowHalfOpen === false)
            this.allowHalfOpen = false;
          this.once('end', onend);
        }
        function onend() {
          if (this.allowHalfOpen || this._writableState.ended)
            return;
          process.nextTick(this.end.bind(this));
        }
        function forEach(xs, f) {
          for (var i = 0,
              l = xs.length; i < l; i++) {
            f(xs[i], i);
          }
        }
      }).call(this, require('_process'));
    }, {
      "./_stream_readable": 55,
      "./_stream_writable": 57,
      "_process": 51,
      "core-util-is": 58,
      "inherits": 48
    }],
    54: [function(require, module, exports) {
      module.exports = PassThrough;
      var Transform = require('./_stream_transform');
      var util = require('core-util-is');
      util.inherits = require('inherits');
      util.inherits(PassThrough, Transform);
      function PassThrough(options) {
        if (!(this instanceof PassThrough))
          return new PassThrough(options);
        Transform.call(this, options);
      }
      PassThrough.prototype._transform = function(chunk, encoding, cb) {
        cb(null, chunk);
      };
    }, {
      "./_stream_transform": 56,
      "core-util-is": 58,
      "inherits": 48
    }],
    55: [function(require, module, exports) {
      (function(process) {
        module.exports = Readable;
        var isArray = require('isarray');
        var Buffer = require('buffer').Buffer;
        Readable.ReadableState = ReadableState;
        var EE = require('events').EventEmitter;
        if (!EE.listenerCount)
          EE.listenerCount = function(emitter, type) {
            return emitter.listeners(type).length;
          };
        var Stream = require('stream');
        var util = require('core-util-is');
        util.inherits = require('inherits');
        var StringDecoder;
        var debug = require('util');
        if (debug && debug.debuglog) {
          debug = debug.debuglog('stream');
        } else {
          debug = function() {};
        }
        util.inherits(Readable, Stream);
        function ReadableState(options, stream) {
          var Duplex = require('./_stream_duplex');
          options = options || {};
          var hwm = options.highWaterMark;
          var defaultHwm = options.objectMode ? 16 : 16 * 1024;
          this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;
          this.highWaterMark = ~~this.highWaterMark;
          this.buffer = [];
          this.length = 0;
          this.pipes = null;
          this.pipesCount = 0;
          this.flowing = null;
          this.ended = false;
          this.endEmitted = false;
          this.reading = false;
          this.sync = true;
          this.needReadable = false;
          this.emittedReadable = false;
          this.readableListening = false;
          this.objectMode = !!options.objectMode;
          if (stream instanceof Duplex)
            this.objectMode = this.objectMode || !!options.readableObjectMode;
          this.defaultEncoding = options.defaultEncoding || 'utf8';
          this.ranOut = false;
          this.awaitDrain = 0;
          this.readingMore = false;
          this.decoder = null;
          this.encoding = null;
          if (options.encoding) {
            if (!StringDecoder)
              StringDecoder = require('string_decoder/').StringDecoder;
            this.decoder = new StringDecoder(options.encoding);
            this.encoding = options.encoding;
          }
        }
        function Readable(options) {
          var Duplex = require('./_stream_duplex');
          if (!(this instanceof Readable))
            return new Readable(options);
          this._readableState = new ReadableState(options, this);
          this.readable = true;
          Stream.call(this);
        }
        Readable.prototype.push = function(chunk, encoding) {
          var state = this._readableState;
          if (util.isString(chunk) && !state.objectMode) {
            encoding = encoding || state.defaultEncoding;
            if (encoding !== state.encoding) {
              chunk = new Buffer(chunk, encoding);
              encoding = '';
            }
          }
          return readableAddChunk(this, state, chunk, encoding, false);
        };
        Readable.prototype.unshift = function(chunk) {
          var state = this._readableState;
          return readableAddChunk(this, state, chunk, '', true);
        };
        function readableAddChunk(stream, state, chunk, encoding, addToFront) {
          var er = chunkInvalid(state, chunk);
          if (er) {
            stream.emit('error', er);
          } else if (util.isNullOrUndefined(chunk)) {
            state.reading = false;
            if (!state.ended)
              onEofChunk(stream, state);
          } else if (state.objectMode || chunk && chunk.length > 0) {
            if (state.ended && !addToFront) {
              var e = new Error('stream.push() after EOF');
              stream.emit('error', e);
            } else if (state.endEmitted && addToFront) {
              var e = new Error('stream.unshift() after end event');
              stream.emit('error', e);
            } else {
              if (state.decoder && !addToFront && !encoding)
                chunk = state.decoder.write(chunk);
              if (!addToFront)
                state.reading = false;
              if (state.flowing && state.length === 0 && !state.sync) {
                stream.emit('data', chunk);
                stream.read(0);
              } else {
                state.length += state.objectMode ? 1 : chunk.length;
                if (addToFront)
                  state.buffer.unshift(chunk);
                else
                  state.buffer.push(chunk);
                if (state.needReadable)
                  emitReadable(stream);
              }
              maybeReadMore(stream, state);
            }
          } else if (!addToFront) {
            state.reading = false;
          }
          return needMoreData(state);
        }
        function needMoreData(state) {
          return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
        }
        Readable.prototype.setEncoding = function(enc) {
          if (!StringDecoder)
            StringDecoder = require('string_decoder/').StringDecoder;
          this._readableState.decoder = new StringDecoder(enc);
          this._readableState.encoding = enc;
          return this;
        };
        var MAX_HWM = 0x800000;
        function roundUpToNextPowerOf2(n) {
          if (n >= MAX_HWM) {
            n = MAX_HWM;
          } else {
            n--;
            for (var p = 1; p < 32; p <<= 1)
              n |= n >> p;
            n++;
          }
          return n;
        }
        function howMuchToRead(n, state) {
          if (state.length === 0 && state.ended)
            return 0;
          if (state.objectMode)
            return n === 0 ? 0 : 1;
          if (isNaN(n) || util.isNull(n)) {
            if (state.flowing && state.buffer.length)
              return state.buffer[0].length;
            else
              return state.length;
          }
          if (n <= 0)
            return 0;
          if (n > state.highWaterMark)
            state.highWaterMark = roundUpToNextPowerOf2(n);
          if (n > state.length) {
            if (!state.ended) {
              state.needReadable = true;
              return 0;
            } else
              return state.length;
          }
          return n;
        }
        Readable.prototype.read = function(n) {
          debug('read', n);
          var state = this._readableState;
          var nOrig = n;
          if (!util.isNumber(n) || n > 0)
            state.emittedReadable = false;
          if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
            debug('read: emitReadable', state.length, state.ended);
            if (state.length === 0 && state.ended)
              endReadable(this);
            else
              emitReadable(this);
            return null;
          }
          n = howMuchToRead(n, state);
          if (n === 0 && state.ended) {
            if (state.length === 0)
              endReadable(this);
            return null;
          }
          var doRead = state.needReadable;
          debug('need readable', doRead);
          if (state.length === 0 || state.length - n < state.highWaterMark) {
            doRead = true;
            debug('length less than watermark', doRead);
          }
          if (state.ended || state.reading) {
            doRead = false;
            debug('reading or ended', doRead);
          }
          if (doRead) {
            debug('do read');
            state.reading = true;
            state.sync = true;
            if (state.length === 0)
              state.needReadable = true;
            this._read(state.highWaterMark);
            state.sync = false;
          }
          if (doRead && !state.reading)
            n = howMuchToRead(nOrig, state);
          var ret;
          if (n > 0)
            ret = fromList(n, state);
          else
            ret = null;
          if (util.isNull(ret)) {
            state.needReadable = true;
            n = 0;
          }
          state.length -= n;
          if (state.length === 0 && !state.ended)
            state.needReadable = true;
          if (nOrig !== n && state.ended && state.length === 0)
            endReadable(this);
          if (!util.isNull(ret))
            this.emit('data', ret);
          return ret;
        };
        function chunkInvalid(state, chunk) {
          var er = null;
          if (!util.isBuffer(chunk) && !util.isString(chunk) && !util.isNullOrUndefined(chunk) && !state.objectMode) {
            er = new TypeError('Invalid non-string/buffer chunk');
          }
          return er;
        }
        function onEofChunk(stream, state) {
          if (state.decoder && !state.ended) {
            var chunk = state.decoder.end();
            if (chunk && chunk.length) {
              state.buffer.push(chunk);
              state.length += state.objectMode ? 1 : chunk.length;
            }
          }
          state.ended = true;
          emitReadable(stream);
        }
        function emitReadable(stream) {
          var state = stream._readableState;
          state.needReadable = false;
          if (!state.emittedReadable) {
            debug('emitReadable', state.flowing);
            state.emittedReadable = true;
            if (state.sync)
              process.nextTick(function() {
                emitReadable_(stream);
              });
            else
              emitReadable_(stream);
          }
        }
        function emitReadable_(stream) {
          debug('emit readable');
          stream.emit('readable');
          flow(stream);
        }
        function maybeReadMore(stream, state) {
          if (!state.readingMore) {
            state.readingMore = true;
            process.nextTick(function() {
              maybeReadMore_(stream, state);
            });
          }
        }
        function maybeReadMore_(stream, state) {
          var len = state.length;
          while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
            debug('maybeReadMore read 0');
            stream.read(0);
            if (len === state.length)
              break;
            else
              len = state.length;
          }
          state.readingMore = false;
        }
        Readable.prototype._read = function(n) {
          this.emit('error', new Error('not implemented'));
        };
        Readable.prototype.pipe = function(dest, pipeOpts) {
          var src = this;
          var state = this._readableState;
          switch (state.pipesCount) {
            case 0:
              state.pipes = dest;
              break;
            case 1:
              state.pipes = [state.pipes, dest];
              break;
            default:
              state.pipes.push(dest);
              break;
          }
          state.pipesCount += 1;
          debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
          var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
          var endFn = doEnd ? onend : cleanup;
          if (state.endEmitted)
            process.nextTick(endFn);
          else
            src.once('end', endFn);
          dest.on('unpipe', onunpipe);
          function onunpipe(readable) {
            debug('onunpipe');
            if (readable === src) {
              cleanup();
            }
          }
          function onend() {
            debug('onend');
            dest.end();
          }
          var ondrain = pipeOnDrain(src);
          dest.on('drain', ondrain);
          function cleanup() {
            debug('cleanup');
            dest.removeListener('close', onclose);
            dest.removeListener('finish', onfinish);
            dest.removeListener('drain', ondrain);
            dest.removeListener('error', onerror);
            dest.removeListener('unpipe', onunpipe);
            src.removeListener('end', onend);
            src.removeListener('end', cleanup);
            src.removeListener('data', ondata);
            if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain))
              ondrain();
          }
          src.on('data', ondata);
          function ondata(chunk) {
            debug('ondata');
            var ret = dest.write(chunk);
            if (false === ret) {
              debug('false write response, pause', src._readableState.awaitDrain);
              src._readableState.awaitDrain++;
              src.pause();
            }
          }
          function onerror(er) {
            debug('onerror', er);
            unpipe();
            dest.removeListener('error', onerror);
            if (EE.listenerCount(dest, 'error') === 0)
              dest.emit('error', er);
          }
          if (!dest._events || !dest._events.error)
            dest.on('error', onerror);
          else if (isArray(dest._events.error))
            dest._events.error.unshift(onerror);
          else
            dest._events.error = [onerror, dest._events.error];
          function onclose() {
            dest.removeListener('finish', onfinish);
            unpipe();
          }
          dest.once('close', onclose);
          function onfinish() {
            debug('onfinish');
            dest.removeListener('close', onclose);
            unpipe();
          }
          dest.once('finish', onfinish);
          function unpipe() {
            debug('unpipe');
            src.unpipe(dest);
          }
          dest.emit('pipe', src);
          if (!state.flowing) {
            debug('pipe resume');
            src.resume();
          }
          return dest;
        };
        function pipeOnDrain(src) {
          return function() {
            var state = src._readableState;
            debug('pipeOnDrain', state.awaitDrain);
            if (state.awaitDrain)
              state.awaitDrain--;
            if (state.awaitDrain === 0 && EE.listenerCount(src, 'data')) {
              state.flowing = true;
              flow(src);
            }
          };
        }
        Readable.prototype.unpipe = function(dest) {
          var state = this._readableState;
          if (state.pipesCount === 0)
            return this;
          if (state.pipesCount === 1) {
            if (dest && dest !== state.pipes)
              return this;
            if (!dest)
              dest = state.pipes;
            state.pipes = null;
            state.pipesCount = 0;
            state.flowing = false;
            if (dest)
              dest.emit('unpipe', this);
            return this;
          }
          if (!dest) {
            var dests = state.pipes;
            var len = state.pipesCount;
            state.pipes = null;
            state.pipesCount = 0;
            state.flowing = false;
            for (var i = 0; i < len; i++)
              dests[i].emit('unpipe', this);
            return this;
          }
          var i = indexOf(state.pipes, dest);
          if (i === -1)
            return this;
          state.pipes.splice(i, 1);
          state.pipesCount -= 1;
          if (state.pipesCount === 1)
            state.pipes = state.pipes[0];
          dest.emit('unpipe', this);
          return this;
        };
        Readable.prototype.on = function(ev, fn) {
          var res = Stream.prototype.on.call(this, ev, fn);
          if (ev === 'data' && false !== this._readableState.flowing) {
            this.resume();
          }
          if (ev === 'readable' && this.readable) {
            var state = this._readableState;
            if (!state.readableListening) {
              state.readableListening = true;
              state.emittedReadable = false;
              state.needReadable = true;
              if (!state.reading) {
                var self = this;
                process.nextTick(function() {
                  debug('readable nexttick read 0');
                  self.read(0);
                });
              } else if (state.length) {
                emitReadable(this, state);
              }
            }
          }
          return res;
        };
        Readable.prototype.addListener = Readable.prototype.on;
        Readable.prototype.resume = function() {
          var state = this._readableState;
          if (!state.flowing) {
            debug('resume');
            state.flowing = true;
            if (!state.reading) {
              debug('resume read 0');
              this.read(0);
            }
            resume(this, state);
          }
          return this;
        };
        function resume(stream, state) {
          if (!state.resumeScheduled) {
            state.resumeScheduled = true;
            process.nextTick(function() {
              resume_(stream, state);
            });
          }
        }
        function resume_(stream, state) {
          state.resumeScheduled = false;
          stream.emit('resume');
          flow(stream);
          if (state.flowing && !state.reading)
            stream.read(0);
        }
        Readable.prototype.pause = function() {
          debug('call pause flowing=%j', this._readableState.flowing);
          if (false !== this._readableState.flowing) {
            debug('pause');
            this._readableState.flowing = false;
            this.emit('pause');
          }
          return this;
        };
        function flow(stream) {
          var state = stream._readableState;
          debug('flow', state.flowing);
          if (state.flowing) {
            do {
              var chunk = stream.read();
            } while (null !== chunk && state.flowing);
          }
        }
        Readable.prototype.wrap = function(stream) {
          var state = this._readableState;
          var paused = false;
          var self = this;
          stream.on('end', function() {
            debug('wrapped end');
            if (state.decoder && !state.ended) {
              var chunk = state.decoder.end();
              if (chunk && chunk.length)
                self.push(chunk);
            }
            self.push(null);
          });
          stream.on('data', function(chunk) {
            debug('wrapped data');
            if (state.decoder)
              chunk = state.decoder.write(chunk);
            if (!chunk || !state.objectMode && !chunk.length)
              return;
            var ret = self.push(chunk);
            if (!ret) {
              paused = true;
              stream.pause();
            }
          });
          for (var i in stream) {
            if (util.isFunction(stream[i]) && util.isUndefined(this[i])) {
              this[i] = function(method) {
                return function() {
                  return stream[method].apply(stream, arguments);
                };
              }(i);
            }
          }
          var events = ['error', 'close', 'destroy', 'pause', 'resume'];
          forEach(events, function(ev) {
            stream.on(ev, self.emit.bind(self, ev));
          });
          self._read = function(n) {
            debug('wrapped _read', n);
            if (paused) {
              paused = false;
              stream.resume();
            }
          };
          return self;
        };
        Readable._fromList = fromList;
        function fromList(n, state) {
          var list = state.buffer;
          var length = state.length;
          var stringMode = !!state.decoder;
          var objectMode = !!state.objectMode;
          var ret;
          if (list.length === 0)
            return null;
          if (length === 0)
            ret = null;
          else if (objectMode)
            ret = list.shift();
          else if (!n || n >= length) {
            if (stringMode)
              ret = list.join('');
            else
              ret = Buffer.concat(list, length);
            list.length = 0;
          } else {
            if (n < list[0].length) {
              var buf = list[0];
              ret = buf.slice(0, n);
              list[0] = buf.slice(n);
            } else if (n === list[0].length) {
              ret = list.shift();
            } else {
              if (stringMode)
                ret = '';
              else
                ret = new Buffer(n);
              var c = 0;
              for (var i = 0,
                  l = list.length; i < l && c < n; i++) {
                var buf = list[0];
                var cpy = Math.min(n - c, buf.length);
                if (stringMode)
                  ret += buf.slice(0, cpy);
                else
                  buf.copy(ret, c, 0, cpy);
                if (cpy < buf.length)
                  list[0] = buf.slice(cpy);
                else
                  list.shift();
                c += cpy;
              }
            }
          }
          return ret;
        }
        function endReadable(stream) {
          var state = stream._readableState;
          if (state.length > 0)
            throw new Error('endReadable called on non-empty stream');
          if (!state.endEmitted) {
            state.ended = true;
            process.nextTick(function() {
              if (!state.endEmitted && state.length === 0) {
                state.endEmitted = true;
                stream.readable = false;
                stream.emit('end');
              }
            });
          }
        }
        function forEach(xs, f) {
          for (var i = 0,
              l = xs.length; i < l; i++) {
            f(xs[i], i);
          }
        }
        function indexOf(xs, x) {
          for (var i = 0,
              l = xs.length; i < l; i++) {
            if (xs[i] === x)
              return i;
          }
          return -1;
        }
      }).call(this, require('_process'));
    }, {
      "./_stream_duplex": 53,
      "_process": 51,
      "buffer": 43,
      "core-util-is": 58,
      "events": 47,
      "inherits": 48,
      "isarray": 49,
      "stream": 63,
      "string_decoder/": 64,
      "util": 42
    }],
    56: [function(require, module, exports) {
      module.exports = Transform;
      var Duplex = require('./_stream_duplex');
      var util = require('core-util-is');
      util.inherits = require('inherits');
      util.inherits(Transform, Duplex);
      function TransformState(options, stream) {
        this.afterTransform = function(er, data) {
          return afterTransform(stream, er, data);
        };
        this.needTransform = false;
        this.transforming = false;
        this.writecb = null;
        this.writechunk = null;
      }
      function afterTransform(stream, er, data) {
        var ts = stream._transformState;
        ts.transforming = false;
        var cb = ts.writecb;
        if (!cb)
          return stream.emit('error', new Error('no writecb in Transform class'));
        ts.writechunk = null;
        ts.writecb = null;
        if (!util.isNullOrUndefined(data))
          stream.push(data);
        if (cb)
          cb(er);
        var rs = stream._readableState;
        rs.reading = false;
        if (rs.needReadable || rs.length < rs.highWaterMark) {
          stream._read(rs.highWaterMark);
        }
      }
      function Transform(options) {
        if (!(this instanceof Transform))
          return new Transform(options);
        Duplex.call(this, options);
        this._transformState = new TransformState(options, this);
        var stream = this;
        this._readableState.needReadable = true;
        this._readableState.sync = false;
        this.once('prefinish', function() {
          if (util.isFunction(this._flush))
            this._flush(function(er) {
              done(stream, er);
            });
          else
            done(stream);
        });
      }
      Transform.prototype.push = function(chunk, encoding) {
        this._transformState.needTransform = false;
        return Duplex.prototype.push.call(this, chunk, encoding);
      };
      Transform.prototype._transform = function(chunk, encoding, cb) {
        throw new Error('not implemented');
      };
      Transform.prototype._write = function(chunk, encoding, cb) {
        var ts = this._transformState;
        ts.writecb = cb;
        ts.writechunk = chunk;
        ts.writeencoding = encoding;
        if (!ts.transforming) {
          var rs = this._readableState;
          if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
            this._read(rs.highWaterMark);
        }
      };
      Transform.prototype._read = function(n) {
        var ts = this._transformState;
        if (!util.isNull(ts.writechunk) && ts.writecb && !ts.transforming) {
          ts.transforming = true;
          this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
        } else {
          ts.needTransform = true;
        }
      };
      function done(stream, er) {
        if (er)
          return stream.emit('error', er);
        var ws = stream._writableState;
        var ts = stream._transformState;
        if (ws.length)
          throw new Error('calling transform done when ws.length != 0');
        if (ts.transforming)
          throw new Error('calling transform done when still transforming');
        return stream.push(null);
      }
    }, {
      "./_stream_duplex": 53,
      "core-util-is": 58,
      "inherits": 48
    }],
    57: [function(require, module, exports) {
      (function(process) {
        module.exports = Writable;
        var Buffer = require('buffer').Buffer;
        Writable.WritableState = WritableState;
        var util = require('core-util-is');
        util.inherits = require('inherits');
        var Stream = require('stream');
        util.inherits(Writable, Stream);
        function WriteReq(chunk, encoding, cb) {
          this.chunk = chunk;
          this.encoding = encoding;
          this.callback = cb;
        }
        function WritableState(options, stream) {
          var Duplex = require('./_stream_duplex');
          options = options || {};
          var hwm = options.highWaterMark;
          var defaultHwm = options.objectMode ? 16 : 16 * 1024;
          this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;
          this.objectMode = !!options.objectMode;
          if (stream instanceof Duplex)
            this.objectMode = this.objectMode || !!options.writableObjectMode;
          this.highWaterMark = ~~this.highWaterMark;
          this.needDrain = false;
          this.ending = false;
          this.ended = false;
          this.finished = false;
          var noDecode = options.decodeStrings === false;
          this.decodeStrings = !noDecode;
          this.defaultEncoding = options.defaultEncoding || 'utf8';
          this.length = 0;
          this.writing = false;
          this.corked = 0;
          this.sync = true;
          this.bufferProcessing = false;
          this.onwrite = function(er) {
            onwrite(stream, er);
          };
          this.writecb = null;
          this.writelen = 0;
          this.buffer = [];
          this.pendingcb = 0;
          this.prefinished = false;
          this.errorEmitted = false;
        }
        function Writable(options) {
          var Duplex = require('./_stream_duplex');
          if (!(this instanceof Writable) && !(this instanceof Duplex))
            return new Writable(options);
          this._writableState = new WritableState(options, this);
          this.writable = true;
          Stream.call(this);
        }
        Writable.prototype.pipe = function() {
          this.emit('error', new Error('Cannot pipe. Not readable.'));
        };
        function writeAfterEnd(stream, state, cb) {
          var er = new Error('write after end');
          stream.emit('error', er);
          process.nextTick(function() {
            cb(er);
          });
        }
        function validChunk(stream, state, chunk, cb) {
          var valid = true;
          if (!util.isBuffer(chunk) && !util.isString(chunk) && !util.isNullOrUndefined(chunk) && !state.objectMode) {
            var er = new TypeError('Invalid non-string/buffer chunk');
            stream.emit('error', er);
            process.nextTick(function() {
              cb(er);
            });
            valid = false;
          }
          return valid;
        }
        Writable.prototype.write = function(chunk, encoding, cb) {
          var state = this._writableState;
          var ret = false;
          if (util.isFunction(encoding)) {
            cb = encoding;
            encoding = null;
          }
          if (util.isBuffer(chunk))
            encoding = 'buffer';
          else if (!encoding)
            encoding = state.defaultEncoding;
          if (!util.isFunction(cb))
            cb = function() {};
          if (state.ended)
            writeAfterEnd(this, state, cb);
          else if (validChunk(this, state, chunk, cb)) {
            state.pendingcb++;
            ret = writeOrBuffer(this, state, chunk, encoding, cb);
          }
          return ret;
        };
        Writable.prototype.cork = function() {
          var state = this._writableState;
          state.corked++;
        };
        Writable.prototype.uncork = function() {
          var state = this._writableState;
          if (state.corked) {
            state.corked--;
            if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.buffer.length)
              clearBuffer(this, state);
          }
        };
        function decodeChunk(state, chunk, encoding) {
          if (!state.objectMode && state.decodeStrings !== false && util.isString(chunk)) {
            chunk = new Buffer(chunk, encoding);
          }
          return chunk;
        }
        function writeOrBuffer(stream, state, chunk, encoding, cb) {
          chunk = decodeChunk(state, chunk, encoding);
          if (util.isBuffer(chunk))
            encoding = 'buffer';
          var len = state.objectMode ? 1 : chunk.length;
          state.length += len;
          var ret = state.length < state.highWaterMark;
          if (!ret)
            state.needDrain = true;
          if (state.writing || state.corked)
            state.buffer.push(new WriteReq(chunk, encoding, cb));
          else
            doWrite(stream, state, false, len, chunk, encoding, cb);
          return ret;
        }
        function doWrite(stream, state, writev, len, chunk, encoding, cb) {
          state.writelen = len;
          state.writecb = cb;
          state.writing = true;
          state.sync = true;
          if (writev)
            stream._writev(chunk, state.onwrite);
          else
            stream._write(chunk, encoding, state.onwrite);
          state.sync = false;
        }
        function onwriteError(stream, state, sync, er, cb) {
          if (sync)
            process.nextTick(function() {
              state.pendingcb--;
              cb(er);
            });
          else {
            state.pendingcb--;
            cb(er);
          }
          stream._writableState.errorEmitted = true;
          stream.emit('error', er);
        }
        function onwriteStateUpdate(state) {
          state.writing = false;
          state.writecb = null;
          state.length -= state.writelen;
          state.writelen = 0;
        }
        function onwrite(stream, er) {
          var state = stream._writableState;
          var sync = state.sync;
          var cb = state.writecb;
          onwriteStateUpdate(state);
          if (er)
            onwriteError(stream, state, sync, er, cb);
          else {
            var finished = needFinish(stream, state);
            if (!finished && !state.corked && !state.bufferProcessing && state.buffer.length) {
              clearBuffer(stream, state);
            }
            if (sync) {
              process.nextTick(function() {
                afterWrite(stream, state, finished, cb);
              });
            } else {
              afterWrite(stream, state, finished, cb);
            }
          }
        }
        function afterWrite(stream, state, finished, cb) {
          if (!finished)
            onwriteDrain(stream, state);
          state.pendingcb--;
          cb();
          finishMaybe(stream, state);
        }
        function onwriteDrain(stream, state) {
          if (state.length === 0 && state.needDrain) {
            state.needDrain = false;
            stream.emit('drain');
          }
        }
        function clearBuffer(stream, state) {
          state.bufferProcessing = true;
          if (stream._writev && state.buffer.length > 1) {
            var cbs = [];
            for (var c = 0; c < state.buffer.length; c++)
              cbs.push(state.buffer[c].callback);
            state.pendingcb++;
            doWrite(stream, state, true, state.length, state.buffer, '', function(err) {
              for (var i = 0; i < cbs.length; i++) {
                state.pendingcb--;
                cbs[i](err);
              }
            });
            state.buffer = [];
          } else {
            for (var c = 0; c < state.buffer.length; c++) {
              var entry = state.buffer[c];
              var chunk = entry.chunk;
              var encoding = entry.encoding;
              var cb = entry.callback;
              var len = state.objectMode ? 1 : chunk.length;
              doWrite(stream, state, false, len, chunk, encoding, cb);
              if (state.writing) {
                c++;
                break;
              }
            }
            if (c < state.buffer.length)
              state.buffer = state.buffer.slice(c);
            else
              state.buffer.length = 0;
          }
          state.bufferProcessing = false;
        }
        Writable.prototype._write = function(chunk, encoding, cb) {
          cb(new Error('not implemented'));
        };
        Writable.prototype._writev = null;
        Writable.prototype.end = function(chunk, encoding, cb) {
          var state = this._writableState;
          if (util.isFunction(chunk)) {
            cb = chunk;
            chunk = null;
            encoding = null;
          } else if (util.isFunction(encoding)) {
            cb = encoding;
            encoding = null;
          }
          if (!util.isNullOrUndefined(chunk))
            this.write(chunk, encoding);
          if (state.corked) {
            state.corked = 1;
            this.uncork();
          }
          if (!state.ending && !state.finished)
            endWritable(this, state, cb);
        };
        function needFinish(stream, state) {
          return (state.ending && state.length === 0 && !state.finished && !state.writing);
        }
        function prefinish(stream, state) {
          if (!state.prefinished) {
            state.prefinished = true;
            stream.emit('prefinish');
          }
        }
        function finishMaybe(stream, state) {
          var need = needFinish(stream, state);
          if (need) {
            if (state.pendingcb === 0) {
              prefinish(stream, state);
              state.finished = true;
              stream.emit('finish');
            } else
              prefinish(stream, state);
          }
          return need;
        }
        function endWritable(stream, state, cb) {
          state.ending = true;
          finishMaybe(stream, state);
          if (cb) {
            if (state.finished)
              process.nextTick(cb);
            else
              stream.once('finish', cb);
          }
          state.ended = true;
        }
      }).call(this, require('_process'));
    }, {
      "./_stream_duplex": 53,
      "_process": 51,
      "buffer": 43,
      "core-util-is": 58,
      "inherits": 48,
      "stream": 63
    }],
    58: [function(require, module, exports) {
      (function(Buffer) {
        function isArray(ar) {
          return Array.isArray(ar);
        }
        exports.isArray = isArray;
        function isBoolean(arg) {
          return typeof arg === 'boolean';
        }
        exports.isBoolean = isBoolean;
        function isNull(arg) {
          return arg === null;
        }
        exports.isNull = isNull;
        function isNullOrUndefined(arg) {
          return arg == null;
        }
        exports.isNullOrUndefined = isNullOrUndefined;
        function isNumber(arg) {
          return typeof arg === 'number';
        }
        exports.isNumber = isNumber;
        function isString(arg) {
          return typeof arg === 'string';
        }
        exports.isString = isString;
        function isSymbol(arg) {
          return (typeof arg === 'undefined' ? 'undefined' : $traceurRuntime.typeof(arg)) === 'symbol';
        }
        exports.isSymbol = isSymbol;
        function isUndefined(arg) {
          return arg === void 0;
        }
        exports.isUndefined = isUndefined;
        function isRegExp(re) {
          return isObject(re) && objectToString(re) === '[object RegExp]';
        }
        exports.isRegExp = isRegExp;
        function isObject(arg) {
          return (typeof arg === 'undefined' ? 'undefined' : $traceurRuntime.typeof(arg)) === 'object' && arg !== null;
        }
        exports.isObject = isObject;
        function isDate(d) {
          return isObject(d) && objectToString(d) === '[object Date]';
        }
        exports.isDate = isDate;
        function isError(e) {
          return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
        }
        exports.isError = isError;
        function isFunction(arg) {
          return typeof arg === 'function';
        }
        exports.isFunction = isFunction;
        function isPrimitive(arg) {
          return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || (typeof arg === 'undefined' ? 'undefined' : $traceurRuntime.typeof(arg)) === 'symbol' || typeof arg === 'undefined';
        }
        exports.isPrimitive = isPrimitive;
        function isBuffer(arg) {
          return Buffer.isBuffer(arg);
        }
        exports.isBuffer = isBuffer;
        function objectToString(o) {
          return Object.prototype.toString.call(o);
        }
      }).call(this, require("buffer").Buffer);
    }, {"buffer": 43}],
    59: [function(require, module, exports) {
      module.exports = require("./lib/_stream_passthrough.js");
    }, {"./lib/_stream_passthrough.js": 54}],
    60: [function(require, module, exports) {
      exports = module.exports = require('./lib/_stream_readable.js');
      exports.Stream = require('stream');
      exports.Readable = exports;
      exports.Writable = require('./lib/_stream_writable.js');
      exports.Duplex = require('./lib/_stream_duplex.js');
      exports.Transform = require('./lib/_stream_transform.js');
      exports.PassThrough = require('./lib/_stream_passthrough.js');
    }, {
      "./lib/_stream_duplex.js": 53,
      "./lib/_stream_passthrough.js": 54,
      "./lib/_stream_readable.js": 55,
      "./lib/_stream_transform.js": 56,
      "./lib/_stream_writable.js": 57,
      "stream": 63
    }],
    61: [function(require, module, exports) {
      module.exports = require("./lib/_stream_transform.js");
    }, {"./lib/_stream_transform.js": 56}],
    62: [function(require, module, exports) {
      module.exports = require("./lib/_stream_writable.js");
    }, {"./lib/_stream_writable.js": 57}],
    63: [function(require, module, exports) {
      module.exports = Stream;
      var EE = require('events').EventEmitter;
      var inherits = require('inherits');
      inherits(Stream, EE);
      Stream.Readable = require('readable-stream/readable.js');
      Stream.Writable = require('readable-stream/writable.js');
      Stream.Duplex = require('readable-stream/duplex.js');
      Stream.Transform = require('readable-stream/transform.js');
      Stream.PassThrough = require('readable-stream/passthrough.js');
      Stream.Stream = Stream;
      function Stream() {
        EE.call(this);
      }
      Stream.prototype.pipe = function(dest, options) {
        var source = this;
        function ondata(chunk) {
          if (dest.writable) {
            if (false === dest.write(chunk) && source.pause) {
              source.pause();
            }
          }
        }
        source.on('data', ondata);
        function ondrain() {
          if (source.readable && source.resume) {
            source.resume();
          }
        }
        dest.on('drain', ondrain);
        if (!dest._isStdio && (!options || options.end !== false)) {
          source.on('end', onend);
          source.on('close', onclose);
        }
        var didOnEnd = false;
        function onend() {
          if (didOnEnd)
            return;
          didOnEnd = true;
          dest.end();
        }
        function onclose() {
          if (didOnEnd)
            return;
          didOnEnd = true;
          if (typeof dest.destroy === 'function')
            dest.destroy();
        }
        function onerror(er) {
          cleanup();
          if (EE.listenerCount(this, 'error') === 0) {
            throw er;
          }
        }
        source.on('error', onerror);
        dest.on('error', onerror);
        function cleanup() {
          source.removeListener('data', ondata);
          dest.removeListener('drain', ondrain);
          source.removeListener('end', onend);
          source.removeListener('close', onclose);
          source.removeListener('error', onerror);
          dest.removeListener('error', onerror);
          source.removeListener('end', cleanup);
          source.removeListener('close', cleanup);
          dest.removeListener('close', cleanup);
        }
        source.on('end', cleanup);
        source.on('close', cleanup);
        dest.on('close', cleanup);
        dest.emit('pipe', source);
        return dest;
      };
    }, {
      "events": 47,
      "inherits": 48,
      "readable-stream/duplex.js": 52,
      "readable-stream/passthrough.js": 59,
      "readable-stream/readable.js": 60,
      "readable-stream/transform.js": 61,
      "readable-stream/writable.js": 62
    }],
    64: [function(require, module, exports) {
      var Buffer = require('buffer').Buffer;
      var isBufferEncoding = Buffer.isEncoding || function(encoding) {
        switch (encoding && encoding.toLowerCase()) {
          case 'hex':
          case 'utf8':
          case 'utf-8':
          case 'ascii':
          case 'binary':
          case 'base64':
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
          case 'raw':
            return true;
          default:
            return false;
        }
      };
      function assertEncoding(encoding) {
        if (encoding && !isBufferEncoding(encoding)) {
          throw new Error('Unknown encoding: ' + encoding);
        }
      }
      var StringDecoder = exports.StringDecoder = function(encoding) {
        this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
        assertEncoding(encoding);
        switch (this.encoding) {
          case 'utf8':
            this.surrogateSize = 3;
            break;
          case 'ucs2':
          case 'utf16le':
            this.surrogateSize = 2;
            this.detectIncompleteChar = utf16DetectIncompleteChar;
            break;
          case 'base64':
            this.surrogateSize = 3;
            this.detectIncompleteChar = base64DetectIncompleteChar;
            break;
          default:
            this.write = passThroughWrite;
            return;
        }
        this.charBuffer = new Buffer(6);
        this.charReceived = 0;
        this.charLength = 0;
      };
      StringDecoder.prototype.write = function(buffer) {
        var charStr = '';
        while (this.charLength) {
          var available = (buffer.length >= this.charLength - this.charReceived) ? this.charLength - this.charReceived : buffer.length;
          buffer.copy(this.charBuffer, this.charReceived, 0, available);
          this.charReceived += available;
          if (this.charReceived < this.charLength) {
            return '';
          }
          buffer = buffer.slice(available, buffer.length);
          charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);
          var charCode = charStr.charCodeAt(charStr.length - 1);
          if (charCode >= 0xD800 && charCode <= 0xDBFF) {
            this.charLength += this.surrogateSize;
            charStr = '';
            continue;
          }
          this.charReceived = this.charLength = 0;
          if (buffer.length === 0) {
            return charStr;
          }
          break;
        }
        this.detectIncompleteChar(buffer);
        var end = buffer.length;
        if (this.charLength) {
          buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
          end -= this.charReceived;
        }
        charStr += buffer.toString(this.encoding, 0, end);
        var end = charStr.length - 1;
        var charCode = charStr.charCodeAt(end);
        if (charCode >= 0xD800 && charCode <= 0xDBFF) {
          var size = this.surrogateSize;
          this.charLength += size;
          this.charReceived += size;
          this.charBuffer.copy(this.charBuffer, size, 0, size);
          buffer.copy(this.charBuffer, 0, 0, size);
          return charStr.substring(0, end);
        }
        return charStr;
      };
      StringDecoder.prototype.detectIncompleteChar = function(buffer) {
        var i = (buffer.length >= 3) ? 3 : buffer.length;
        for (; i > 0; i--) {
          var c = buffer[buffer.length - i];
          if (i == 1 && c >> 5 == 0x06) {
            this.charLength = 2;
            break;
          }
          if (i <= 2 && c >> 4 == 0x0E) {
            this.charLength = 3;
            break;
          }
          if (i <= 3 && c >> 3 == 0x1E) {
            this.charLength = 4;
            break;
          }
        }
        this.charReceived = i;
      };
      StringDecoder.prototype.end = function(buffer) {
        var res = '';
        if (buffer && buffer.length)
          res = this.write(buffer);
        if (this.charReceived) {
          var cr = this.charReceived;
          var buf = this.charBuffer;
          var enc = this.encoding;
          res += buf.slice(0, cr).toString(enc);
        }
        return res;
      };
      function passThroughWrite(buffer) {
        return buffer.toString(this.encoding);
      }
      function utf16DetectIncompleteChar(buffer) {
        this.charReceived = buffer.length % 2;
        this.charLength = this.charReceived ? 2 : 0;
      }
      function base64DetectIncompleteChar(buffer) {
        this.charReceived = buffer.length % 3;
        this.charLength = this.charReceived ? 3 : 0;
      }
    }, {"buffer": 43}],
    65: [function(require, module, exports) {
      module.exports = function isBuffer(arg) {
        return arg && (typeof arg === 'undefined' ? 'undefined' : $traceurRuntime.typeof(arg)) === 'object' && typeof arg.copy === 'function' && typeof arg.fill === 'function' && typeof arg.readUInt8 === 'function';
      };
    }, {}],
    66: [function(require, module, exports) {
      (function(process, global) {
        var formatRegExp = /%[sdj%]/g;
        exports.format = function(f) {
          if (!isString(f)) {
            var objects = [];
            for (var i = 0; i < arguments.length; i++) {
              objects.push(inspect(arguments[i]));
            }
            return objects.join(' ');
          }
          var i = 1;
          var args = arguments;
          var len = args.length;
          var str = String(f).replace(formatRegExp, function(x) {
            if (x === '%%')
              return '%';
            if (i >= len)
              return x;
            switch (x) {
              case '%s':
                return String(args[i++]);
              case '%d':
                return Number(args[i++]);
              case '%j':
                try {
                  return JSON.stringify(args[i++]);
                } catch (_) {
                  return '[Circular]';
                }
              default:
                return x;
            }
          });
          for (var x = args[i]; i < len; x = args[++i]) {
            if (isNull(x) || !isObject(x)) {
              str += ' ' + x;
            } else {
              str += ' ' + inspect(x);
            }
          }
          return str;
        };
        exports.deprecate = function(fn, msg) {
          if (isUndefined(global.process)) {
            return function() {
              return exports.deprecate(fn, msg).apply(this, arguments);
            };
          }
          if (process.noDeprecation === true) {
            return fn;
          }
          var warned = false;
          function deprecated() {
            if (!warned) {
              if (process.throwDeprecation) {
                throw new Error(msg);
              } else if (process.traceDeprecation) {
                console.trace(msg);
              } else {
                console.error(msg);
              }
              warned = true;
            }
            return fn.apply(this, arguments);
          }
          return deprecated;
        };
        var debugs = {};
        var debugEnviron;
        exports.debuglog = function(set) {
          if (isUndefined(debugEnviron))
            debugEnviron = process.env.NODE_DEBUG || '';
          set = set.toUpperCase();
          if (!debugs[set]) {
            if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
              var pid = process.pid;
              debugs[set] = function() {
                var msg = exports.format.apply(exports, arguments);
                console.error('%s %d: %s', set, pid, msg);
              };
            } else {
              debugs[set] = function() {};
            }
          }
          return debugs[set];
        };
        function inspect(obj, opts) {
          var ctx = {
            seen: [],
            stylize: stylizeNoColor
          };
          if (arguments.length >= 3)
            ctx.depth = arguments[2];
          if (arguments.length >= 4)
            ctx.colors = arguments[3];
          if (isBoolean(opts)) {
            ctx.showHidden = opts;
          } else if (opts) {
            exports._extend(ctx, opts);
          }
          if (isUndefined(ctx.showHidden))
            ctx.showHidden = false;
          if (isUndefined(ctx.depth))
            ctx.depth = 2;
          if (isUndefined(ctx.colors))
            ctx.colors = false;
          if (isUndefined(ctx.customInspect))
            ctx.customInspect = true;
          if (ctx.colors)
            ctx.stylize = stylizeWithColor;
          return formatValue(ctx, obj, ctx.depth);
        }
        exports.inspect = inspect;
        inspect.colors = {
          'bold': [1, 22],
          'italic': [3, 23],
          'underline': [4, 24],
          'inverse': [7, 27],
          'white': [37, 39],
          'grey': [90, 39],
          'black': [30, 39],
          'blue': [34, 39],
          'cyan': [36, 39],
          'green': [32, 39],
          'magenta': [35, 39],
          'red': [31, 39],
          'yellow': [33, 39]
        };
        inspect.styles = {
          'special': 'cyan',
          'number': 'yellow',
          'boolean': 'yellow',
          'undefined': 'grey',
          'null': 'bold',
          'string': 'green',
          'date': 'magenta',
          'regexp': 'red'
        };
        function stylizeWithColor(str, styleType) {
          var style = inspect.styles[styleType];
          if (style) {
            return '\u001b[' + inspect.colors[style][0] + 'm' + str + '\u001b[' + inspect.colors[style][1] + 'm';
          } else {
            return str;
          }
        }
        function stylizeNoColor(str, styleType) {
          return str;
        }
        function arrayToHash(array) {
          var hash = {};
          array.forEach(function(val, idx) {
            hash[val] = true;
          });
          return hash;
        }
        function formatValue(ctx, value, recurseTimes) {
          if (ctx.customInspect && value && isFunction(value.inspect) && value.inspect !== exports.inspect && !(value.constructor && value.constructor.prototype === value)) {
            var ret = value.inspect(recurseTimes, ctx);
            if (!isString(ret)) {
              ret = formatValue(ctx, ret, recurseTimes);
            }
            return ret;
          }
          var primitive = formatPrimitive(ctx, value);
          if (primitive) {
            return primitive;
          }
          var keys = Object.keys(value);
          var visibleKeys = arrayToHash(keys);
          if (ctx.showHidden) {
            keys = Object.getOwnPropertyNames(value);
          }
          if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
            return formatError(value);
          }
          if (keys.length === 0) {
            if (isFunction(value)) {
              var name = value.name ? ': ' + value.name : '';
              return ctx.stylize('[Function' + name + ']', 'special');
            }
            if (isRegExp(value)) {
              return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
            }
            if (isDate(value)) {
              return ctx.stylize(Date.prototype.toString.call(value), 'date');
            }
            if (isError(value)) {
              return formatError(value);
            }
          }
          var base = '',
              array = false,
              braces = ['{', '}'];
          if (isArray(value)) {
            array = true;
            braces = ['[', ']'];
          }
          if (isFunction(value)) {
            var n = value.name ? ': ' + value.name : '';
            base = ' [Function' + n + ']';
          }
          if (isRegExp(value)) {
            base = ' ' + RegExp.prototype.toString.call(value);
          }
          if (isDate(value)) {
            base = ' ' + Date.prototype.toUTCString.call(value);
          }
          if (isError(value)) {
            base = ' ' + formatError(value);
          }
          if (keys.length === 0 && (!array || value.length == 0)) {
            return braces[0] + base + braces[1];
          }
          if (recurseTimes < 0) {
            if (isRegExp(value)) {
              return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
            } else {
              return ctx.stylize('[Object]', 'special');
            }
          }
          ctx.seen.push(value);
          var output;
          if (array) {
            output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
          } else {
            output = keys.map(function(key) {
              return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
            });
          }
          ctx.seen.pop();
          return reduceToSingleString(output, base, braces);
        }
        function formatPrimitive(ctx, value) {
          if (isUndefined(value))
            return ctx.stylize('undefined', 'undefined');
          if (isString(value)) {
            var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
            return ctx.stylize(simple, 'string');
          }
          if (isNumber(value))
            return ctx.stylize('' + value, 'number');
          if (isBoolean(value))
            return ctx.stylize('' + value, 'boolean');
          if (isNull(value))
            return ctx.stylize('null', 'null');
        }
        function formatError(value) {
          return '[' + Error.prototype.toString.call(value) + ']';
        }
        function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
          var output = [];
          for (var i = 0,
              l = value.length; i < l; ++i) {
            if (hasOwnProperty(value, String(i))) {
              output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
            } else {
              output.push('');
            }
          }
          keys.forEach(function(key) {
            if (!key.match(/^\d+$/)) {
              output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
            }
          });
          return output;
        }
        function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
          var name,
              str,
              desc;
          desc = Object.getOwnPropertyDescriptor(value, key) || {value: value[key]};
          if (desc.get) {
            if (desc.set) {
              str = ctx.stylize('[Getter/Setter]', 'special');
            } else {
              str = ctx.stylize('[Getter]', 'special');
            }
          } else {
            if (desc.set) {
              str = ctx.stylize('[Setter]', 'special');
            }
          }
          if (!hasOwnProperty(visibleKeys, key)) {
            name = '[' + key + ']';
          }
          if (!str) {
            if (ctx.seen.indexOf(desc.value) < 0) {
              if (isNull(recurseTimes)) {
                str = formatValue(ctx, desc.value, null);
              } else {
                str = formatValue(ctx, desc.value, recurseTimes - 1);
              }
              if (str.indexOf('\n') > -1) {
                if (array) {
                  str = str.split('\n').map(function(line) {
                    return '  ' + line;
                  }).join('\n').substr(2);
                } else {
                  str = '\n' + str.split('\n').map(function(line) {
                    return '   ' + line;
                  }).join('\n');
                }
              }
            } else {
              str = ctx.stylize('[Circular]', 'special');
            }
          }
          if (isUndefined(name)) {
            if (array && key.match(/^\d+$/)) {
              return str;
            }
            name = JSON.stringify('' + key);
            if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
              name = name.substr(1, name.length - 2);
              name = ctx.stylize(name, 'name');
            } else {
              name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
              name = ctx.stylize(name, 'string');
            }
          }
          return name + ': ' + str;
        }
        function reduceToSingleString(output, base, braces) {
          var numLinesEst = 0;
          var length = output.reduce(function(prev, cur) {
            numLinesEst++;
            if (cur.indexOf('\n') >= 0)
              numLinesEst++;
            return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
          }, 0);
          if (length > 60) {
            return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
          }
          return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
        }
        function isArray(ar) {
          return Array.isArray(ar);
        }
        exports.isArray = isArray;
        function isBoolean(arg) {
          return typeof arg === 'boolean';
        }
        exports.isBoolean = isBoolean;
        function isNull(arg) {
          return arg === null;
        }
        exports.isNull = isNull;
        function isNullOrUndefined(arg) {
          return arg == null;
        }
        exports.isNullOrUndefined = isNullOrUndefined;
        function isNumber(arg) {
          return typeof arg === 'number';
        }
        exports.isNumber = isNumber;
        function isString(arg) {
          return typeof arg === 'string';
        }
        exports.isString = isString;
        function isSymbol(arg) {
          return (typeof arg === 'undefined' ? 'undefined' : $traceurRuntime.typeof(arg)) === 'symbol';
        }
        exports.isSymbol = isSymbol;
        function isUndefined(arg) {
          return arg === void 0;
        }
        exports.isUndefined = isUndefined;
        function isRegExp(re) {
          return isObject(re) && objectToString(re) === '[object RegExp]';
        }
        exports.isRegExp = isRegExp;
        function isObject(arg) {
          return (typeof arg === 'undefined' ? 'undefined' : $traceurRuntime.typeof(arg)) === 'object' && arg !== null;
        }
        exports.isObject = isObject;
        function isDate(d) {
          return isObject(d) && objectToString(d) === '[object Date]';
        }
        exports.isDate = isDate;
        function isError(e) {
          return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
        }
        exports.isError = isError;
        function isFunction(arg) {
          return typeof arg === 'function';
        }
        exports.isFunction = isFunction;
        function isPrimitive(arg) {
          return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || (typeof arg === 'undefined' ? 'undefined' : $traceurRuntime.typeof(arg)) === 'symbol' || typeof arg === 'undefined';
        }
        exports.isPrimitive = isPrimitive;
        exports.isBuffer = require('./support/isBuffer');
        function objectToString(o) {
          return Object.prototype.toString.call(o);
        }
        function pad(n) {
          return n < 10 ? '0' + n.toString(10) : n.toString(10);
        }
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        function timestamp() {
          var d = new Date();
          var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
          return [d.getDate(), months[d.getMonth()], time].join(' ');
        }
        exports.log = function() {
          console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
        };
        exports.inherits = require('inherits');
        exports._extend = function(origin, add) {
          if (!add || !isObject(add))
            return origin;
          var keys = Object.keys(add);
          var i = keys.length;
          while (i--) {
            origin[keys[i]] = add[keys[i]];
          }
          return origin;
        };
        function hasOwnProperty(obj, prop) {
          return Object.prototype.hasOwnProperty.call(obj, prop);
        }
      }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "./support/isBuffer": 65,
      "_process": 51,
      "inherits": 48
    }],
    67: [function(require, module, exports) {
      (function(global, undefined) {
        var objectPrototypeToString = Object.prototype.toString;
        function map(arr, mapper, that) {
          if (Array.prototype.map) {
            return Array.prototype.map.call(arr, mapper, that);
          }
          var other = new Array(arr.length);
          for (var i = 0,
              n = arr.length; i < n; i++) {
            other[i] = mapper.call(that, arr[i], i, arr);
          }
          return other;
        }
        function clonePath(path) {
          return {
            newPos: path.newPos,
            components: path.components.slice(0)
          };
        }
        function removeEmpty(array) {
          var ret = [];
          for (var i = 0; i < array.length; i++) {
            if (array[i]) {
              ret.push(array[i]);
            }
          }
          return ret;
        }
        function escapeHTML(s) {
          var n = s;
          n = n.replace(/&/g, '&amp;');
          n = n.replace(/</g, '&lt;');
          n = n.replace(/>/g, '&gt;');
          n = n.replace(/"/g, '&quot;');
          return n;
        }
        function canonicalize(obj, stack, replacementStack) {
          stack = stack || [];
          replacementStack = replacementStack || [];
          var i;
          for (i = 0; i < stack.length; i += 1) {
            if (stack[i] === obj) {
              return replacementStack[i];
            }
          }
          var canonicalizedObj;
          if ('[object Array]' === objectPrototypeToString.call(obj)) {
            stack.push(obj);
            canonicalizedObj = new Array(obj.length);
            replacementStack.push(canonicalizedObj);
            for (i = 0; i < obj.length; i += 1) {
              canonicalizedObj[i] = canonicalize(obj[i], stack, replacementStack);
            }
            stack.pop();
            replacementStack.pop();
          } else if ((typeof obj === 'undefined' ? 'undefined' : $traceurRuntime.typeof(obj)) === 'object' && obj !== null) {
            stack.push(obj);
            canonicalizedObj = {};
            replacementStack.push(canonicalizedObj);
            var sortedKeys = [],
                key;
            for (key in obj) {
              sortedKeys.push(key);
            }
            sortedKeys.sort();
            for (i = 0; i < sortedKeys.length; i += 1) {
              key = sortedKeys[i];
              canonicalizedObj[key] = canonicalize(obj[key], stack, replacementStack);
            }
            stack.pop();
            replacementStack.pop();
          } else {
            canonicalizedObj = obj;
          }
          return canonicalizedObj;
        }
        function buildValues(components, newString, oldString, useLongestToken) {
          var componentPos = 0,
              componentLen = components.length,
              newPos = 0,
              oldPos = 0;
          for (; componentPos < componentLen; componentPos++) {
            var component = components[componentPos];
            if (!component.removed) {
              if (!component.added && useLongestToken) {
                var value = newString.slice(newPos, newPos + component.count);
                value = map(value, function(value, i) {
                  var oldValue = oldString[oldPos + i];
                  return oldValue.length > value.length ? oldValue : value;
                });
                component.value = value.join('');
              } else {
                component.value = newString.slice(newPos, newPos + component.count).join('');
              }
              newPos += component.count;
              if (!component.added) {
                oldPos += component.count;
              }
            } else {
              component.value = oldString.slice(oldPos, oldPos + component.count).join('');
              oldPos += component.count;
              if (componentPos && components[componentPos - 1].added) {
                var tmp = components[componentPos - 1];
                components[componentPos - 1] = components[componentPos];
                components[componentPos] = tmp;
              }
            }
          }
          return components;
        }
        function Diff(ignoreWhitespace) {
          this.ignoreWhitespace = ignoreWhitespace;
        }
        Diff.prototype = {
          diff: function(oldString, newString, callback) {
            var self = this;
            function done(value) {
              if (callback) {
                setTimeout(function() {
                  callback(undefined, value);
                }, 0);
                return true;
              } else {
                return value;
              }
            }
            if (newString === oldString) {
              return done([{value: newString}]);
            }
            if (!newString) {
              return done([{
                value: oldString,
                removed: true
              }]);
            }
            if (!oldString) {
              return done([{
                value: newString,
                added: true
              }]);
            }
            newString = this.tokenize(newString);
            oldString = this.tokenize(oldString);
            var newLen = newString.length,
                oldLen = oldString.length;
            var editLength = 1;
            var maxEditLength = newLen + oldLen;
            var bestPath = [{
              newPos: -1,
              components: []
            }];
            var oldPos = this.extractCommon(bestPath[0], newString, oldString, 0);
            if (bestPath[0].newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
              return done([{value: newString.join('')}]);
            }
            function execEditLength() {
              for (var diagonalPath = -1 * editLength; diagonalPath <= editLength; diagonalPath += 2) {
                var basePath = void 0;
                var addPath = bestPath[diagonalPath - 1],
                    removePath = bestPath[diagonalPath + 1],
                    oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;
                if (addPath) {
                  bestPath[diagonalPath - 1] = undefined;
                }
                var canAdd = addPath && addPath.newPos + 1 < newLen,
                    canRemove = removePath && 0 <= oldPos && oldPos < oldLen;
                if (!canAdd && !canRemove) {
                  bestPath[diagonalPath] = undefined;
                  continue;
                }
                if (!canAdd || (canRemove && addPath.newPos < removePath.newPos)) {
                  basePath = clonePath(removePath);
                  self.pushComponent(basePath.components, undefined, true);
                } else {
                  basePath = addPath;
                  basePath.newPos++;
                  self.pushComponent(basePath.components, true, undefined);
                }
                oldPos = self.extractCommon(basePath, newString, oldString, diagonalPath);
                if (basePath.newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
                  return done(buildValues(basePath.components, newString, oldString, self.useLongestToken));
                } else {
                  bestPath[diagonalPath] = basePath;
                }
              }
              editLength++;
            }
            if (callback) {
              (function exec() {
                setTimeout(function() {
                  if (editLength > maxEditLength) {
                    return callback();
                  }
                  if (!execEditLength()) {
                    exec();
                  }
                }, 0);
              }());
            } else {
              while (editLength <= maxEditLength) {
                var ret = execEditLength();
                if (ret) {
                  return ret;
                }
              }
            }
          },
          pushComponent: function(components, added, removed) {
            var last = components[components.length - 1];
            if (last && last.added === added && last.removed === removed) {
              components[components.length - 1] = {
                count: last.count + 1,
                added: added,
                removed: removed
              };
            } else {
              components.push({
                count: 1,
                added: added,
                removed: removed
              });
            }
          },
          extractCommon: function(basePath, newString, oldString, diagonalPath) {
            var newLen = newString.length,
                oldLen = oldString.length,
                newPos = basePath.newPos,
                oldPos = newPos - diagonalPath,
                commonCount = 0;
            while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(newString[newPos + 1], oldString[oldPos + 1])) {
              newPos++;
              oldPos++;
              commonCount++;
            }
            if (commonCount) {
              basePath.components.push({count: commonCount});
            }
            basePath.newPos = newPos;
            return oldPos;
          },
          equals: function(left, right) {
            var reWhitespace = /\S/;
            return left === right || (this.ignoreWhitespace && !reWhitespace.test(left) && !reWhitespace.test(right));
          },
          tokenize: function(value) {
            return value.split('');
          }
        };
        var CharDiff = new Diff();
        var WordDiff = new Diff(true);
        var WordWithSpaceDiff = new Diff();
        WordDiff.tokenize = WordWithSpaceDiff.tokenize = function(value) {
          return removeEmpty(value.split(/(\s+|\b)/));
        };
        var CssDiff = new Diff(true);
        CssDiff.tokenize = function(value) {
          return removeEmpty(value.split(/([{}:;,]|\s+)/));
        };
        var LineDiff = new Diff();
        var TrimmedLineDiff = new Diff();
        TrimmedLineDiff.ignoreTrim = true;
        LineDiff.tokenize = TrimmedLineDiff.tokenize = function(value) {
          var retLines = [],
              lines = value.split(/^/m);
          for (var i = 0; i < lines.length; i++) {
            var line = lines[i],
                lastLine = lines[i - 1],
                lastLineLastChar = lastLine && lastLine[lastLine.length - 1];
            if (line === '\n' && lastLineLastChar === '\r') {
              retLines[retLines.length - 1] = retLines[retLines.length - 1].slice(0, -1) + '\r\n';
            } else {
              if (this.ignoreTrim) {
                line = line.trim();
                if (i < lines.length - 1) {
                  line += '\n';
                }
              }
              retLines.push(line);
            }
          }
          return retLines;
        };
        var PatchDiff = new Diff();
        PatchDiff.tokenize = function(value) {
          var ret = [],
              linesAndNewlines = value.split(/(\n|\r\n)/);
          if (!linesAndNewlines[linesAndNewlines.length - 1]) {
            linesAndNewlines.pop();
          }
          for (var i = 0; i < linesAndNewlines.length; i++) {
            var line = linesAndNewlines[i];
            if (i % 2) {
              ret[ret.length - 1] += line;
            } else {
              ret.push(line);
            }
          }
          return ret;
        };
        var SentenceDiff = new Diff();
        SentenceDiff.tokenize = function(value) {
          return removeEmpty(value.split(/(\S.+?[.!?])(?=\s+|$)/));
        };
        var JsonDiff = new Diff();
        JsonDiff.useLongestToken = true;
        JsonDiff.tokenize = LineDiff.tokenize;
        JsonDiff.equals = function(left, right) {
          return LineDiff.equals(left.replace(/,([\r\n])/g, '$1'), right.replace(/,([\r\n])/g, '$1'));
        };
        var JsDiff = {
          Diff: Diff,
          diffChars: function(oldStr, newStr, callback) {
            return CharDiff.diff(oldStr, newStr, callback);
          },
          diffWords: function(oldStr, newStr, callback) {
            return WordDiff.diff(oldStr, newStr, callback);
          },
          diffWordsWithSpace: function(oldStr, newStr, callback) {
            return WordWithSpaceDiff.diff(oldStr, newStr, callback);
          },
          diffLines: function(oldStr, newStr, callback) {
            return LineDiff.diff(oldStr, newStr, callback);
          },
          diffTrimmedLines: function(oldStr, newStr, callback) {
            return TrimmedLineDiff.diff(oldStr, newStr, callback);
          },
          diffSentences: function(oldStr, newStr, callback) {
            return SentenceDiff.diff(oldStr, newStr, callback);
          },
          diffCss: function(oldStr, newStr, callback) {
            return CssDiff.diff(oldStr, newStr, callback);
          },
          diffJson: function(oldObj, newObj, callback) {
            return JsonDiff.diff(typeof oldObj === 'string' ? oldObj : JSON.stringify(canonicalize(oldObj), undefined, '  '), typeof newObj === 'string' ? newObj : JSON.stringify(canonicalize(newObj), undefined, '  '), callback);
          },
          createTwoFilesPatch: function(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader) {
            var ret = [];
            if (oldFileName == newFileName) {
              ret.push('Index: ' + oldFileName);
            }
            ret.push('===================================================================');
            ret.push('--- ' + oldFileName + (typeof oldHeader === 'undefined' ? '' : '\t' + oldHeader));
            ret.push('+++ ' + newFileName + (typeof newHeader === 'undefined' ? '' : '\t' + newHeader));
            var diff = PatchDiff.diff(oldStr, newStr);
            diff.push({
              value: '',
              lines: []
            });
            function contextLines(lines) {
              return map(lines, function(entry) {
                return ' ' + entry;
              });
            }
            function eofNL(curRange, i, current) {
              var last = diff[diff.length - 2],
                  isLast = i === diff.length - 2,
                  isLastOfType = i === diff.length - 3 && current.added !== last.added;
              if (!(/\n$/.test(current.value)) && (isLast || isLastOfType)) {
                curRange.push('\\ No newline at end of file');
              }
            }
            var oldRangeStart = 0,
                newRangeStart = 0,
                curRange = [],
                oldLine = 1,
                newLine = 1;
            for (var i = 0; i < diff.length; i++) {
              var current = diff[i],
                  lines = current.lines || current.value.replace(/\n$/, '').split('\n');
              current.lines = lines;
              if (current.added || current.removed) {
                if (!oldRangeStart) {
                  var prev = diff[i - 1];
                  oldRangeStart = oldLine;
                  newRangeStart = newLine;
                  if (prev) {
                    curRange = contextLines(prev.lines.slice(-4));
                    oldRangeStart -= curRange.length;
                    newRangeStart -= curRange.length;
                  }
                }
                curRange.push.apply(curRange, map(lines, function(entry) {
                  return (current.added ? '+' : '-') + entry;
                }));
                eofNL(curRange, i, current);
                if (current.added) {
                  newLine += lines.length;
                } else {
                  oldLine += lines.length;
                }
              } else {
                if (oldRangeStart) {
                  if (lines.length <= 8 && i < diff.length - 2) {
                    curRange.push.apply(curRange, contextLines(lines));
                  } else {
                    var contextSize = Math.min(lines.length, 4);
                    ret.push('@@ -' + oldRangeStart + ',' + (oldLine - oldRangeStart + contextSize) + ' +' + newRangeStart + ',' + (newLine - newRangeStart + contextSize) + ' @@');
                    ret.push.apply(ret, curRange);
                    ret.push.apply(ret, contextLines(lines.slice(0, contextSize)));
                    if (lines.length <= 4) {
                      eofNL(ret, i, current);
                    }
                    oldRangeStart = 0;
                    newRangeStart = 0;
                    curRange = [];
                  }
                }
                oldLine += lines.length;
                newLine += lines.length;
              }
            }
            return ret.join('\n') + '\n';
          },
          createPatch: function(fileName, oldStr, newStr, oldHeader, newHeader) {
            return JsDiff.createTwoFilesPatch(fileName, fileName, oldStr, newStr, oldHeader, newHeader);
          },
          applyPatch: function(oldStr, uniDiff) {
            var diffstr = uniDiff.split('\n'),
                hunks = [],
                i = 0,
                remEOFNL = false,
                addEOFNL = false;
            while (i < diffstr.length && !(/^@@/.test(diffstr[i]))) {
              i++;
            }
            for (; i < diffstr.length; i++) {
              if (diffstr[i][0] === '@') {
                var chnukHeader = diffstr[i].split(/@@ -(\d+),(\d+) \+(\d+),(\d+) @@/);
                hunks.unshift({
                  start: chnukHeader[3],
                  oldlength: +chnukHeader[2],
                  removed: [],
                  newlength: chnukHeader[4],
                  added: []
                });
              } else if (diffstr[i][0] === '+') {
                hunks[0].added.push(diffstr[i].substr(1));
              } else if (diffstr[i][0] === '-') {
                hunks[0].removed.push(diffstr[i].substr(1));
              } else if (diffstr[i][0] === ' ') {
                hunks[0].added.push(diffstr[i].substr(1));
                hunks[0].removed.push(diffstr[i].substr(1));
              } else if (diffstr[i][0] === '\\') {
                if (diffstr[i - 1][0] === '+') {
                  remEOFNL = true;
                } else if (diffstr[i - 1][0] === '-') {
                  addEOFNL = true;
                }
              }
            }
            var lines = oldStr.split('\n');
            for (i = hunks.length - 1; i >= 0; i--) {
              var hunk = hunks[i];
              for (var j = 0; j < hunk.oldlength; j++) {
                if (lines[hunk.start - 1 + j] !== hunk.removed[j]) {
                  return false;
                }
              }
              Array.prototype.splice.apply(lines, [hunk.start - 1, hunk.oldlength].concat(hunk.added));
            }
            if (remEOFNL) {
              while (!lines[lines.length - 1]) {
                lines.pop();
              }
            } else if (addEOFNL) {
              lines.push('');
            }
            return lines.join('\n');
          },
          convertChangesToXML: function(changes) {
            var ret = [];
            for (var i = 0; i < changes.length; i++) {
              var change = changes[i];
              if (change.added) {
                ret.push('<ins>');
              } else if (change.removed) {
                ret.push('<del>');
              }
              ret.push(escapeHTML(change.value));
              if (change.added) {
                ret.push('</ins>');
              } else if (change.removed) {
                ret.push('</del>');
              }
            }
            return ret.join('');
          },
          convertChangesToDMP: function(changes) {
            var ret = [],
                change,
                operation;
            for (var i = 0; i < changes.length; i++) {
              change = changes[i];
              if (change.added) {
                operation = 1;
              } else if (change.removed) {
                operation = -1;
              } else {
                operation = 0;
              }
              ret.push([operation, change.value]);
            }
            return ret;
          },
          canonicalize: canonicalize
        };
        if (typeof module !== 'undefined' && module.exports) {
          module.exports = JsDiff;
        } else if (typeof define === 'function' && define.amd) {
          define([], function() {
            return JsDiff;
          });
        } else if (typeof global.JsDiff === 'undefined') {
          global.JsDiff = JsDiff;
        }
      }(this));
    }, {}],
    68: [function(require, module, exports) {
      'use strict';
      var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
      module.exports = function(str) {
        if (typeof str !== 'string') {
          throw new TypeError('Expected a string');
        }
        return str.replace(matchOperatorsRe, '\\$&');
      };
    }, {}],
    69: [function(require, module, exports) {
      (function(process) {
        var exec = require('child_process').exec,
            fs = require('fs'),
            path = require('path'),
            exists = fs.existsSync || path.existsSync,
            os = require('os'),
            quote = JSON.stringify,
            cmd;
        function which(name) {
          var paths = process.env.PATH.split(':');
          var loc;
          for (var i = 0,
              len = paths.length; i < len; ++i) {
            loc = path.join(paths[i], name);
            if (exists(loc))
              return loc;
          }
        }
        switch (os.type()) {
          case 'Darwin':
            if (which('terminal-notifier')) {
              cmd = {
                type: "Darwin-NotificationCenter",
                pkg: "terminal-notifier",
                msg: '-message',
                title: '-title',
                subtitle: '-subtitle',
                priority: {
                  cmd: '-execute',
                  range: []
                }
              };
            } else {
              cmd = {
                type: "Darwin-Growl",
                pkg: "growlnotify",
                msg: '-m',
                sticky: '--sticky',
                priority: {
                  cmd: '--priority',
                  range: [-2, -1, 0, 1, 2, "Very Low", "Moderate", "Normal", "High", "Emergency"]
                }
              };
            }
            break;
          case 'Linux':
            cmd = {
              type: "Linux",
              pkg: "notify-send",
              msg: '',
              sticky: '-t 0',
              icon: '-i',
              priority: {
                cmd: '-u',
                range: ["low", "normal", "critical"]
              }
            };
            break;
          case 'Windows_NT':
            cmd = {
              type: "Windows",
              pkg: "growlnotify",
              msg: '',
              sticky: '/s:true',
              title: '/t:',
              icon: '/i:',
              priority: {
                cmd: '/p:',
                range: [-2, -1, 0, 1, 2]
              }
            };
            break;
        }
        exports = module.exports = growl;
        exports.version = '1.4.1';
        function growl(msg, options, fn) {
          var image,
              args,
              options = options || {},
              fn = fn || function() {};
          if (!cmd)
            return fn(new Error('growl not supported on this platform'));
          args = [cmd.pkg];
          if (image = options.image) {
            switch (cmd.type) {
              case 'Darwin-Growl':
                var flag,
                    ext = path.extname(image).substr(1);
                flag = flag || ext == 'icns' && 'iconpath';
                flag = flag || /^[A-Z]/.test(image) && 'appIcon';
                flag = flag || /^png|gif|jpe?g$/.test(ext) && 'image';
                flag = flag || ext && (image = ext) && 'icon';
                flag = flag || 'icon';
                args.push('--' + flag, quote(image));
                break;
              case 'Linux':
                args.push(cmd.icon, quote(image));
                if (!options.sticky)
                  args.push('--hint=int:transient:1');
                break;
              case 'Windows':
                args.push(cmd.icon + quote(image));
                break;
            }
          }
          if (options.sticky)
            args.push(cmd.sticky);
          if (options.priority) {
            var priority = options.priority + '';
            var checkindexOf = cmd.priority.range.indexOf(priority);
            if (~cmd.priority.range.indexOf(priority)) {
              args.push(cmd.priority, options.priority);
            }
          }
          if (options.name && cmd.type === "Darwin-Growl") {
            args.push('--name', options.name);
          }
          switch (cmd.type) {
            case 'Darwin-Growl':
              args.push(cmd.msg);
              args.push(quote(msg));
              if (options.title)
                args.push(quote(options.title));
              break;
            case 'Darwin-NotificationCenter':
              args.push(cmd.msg);
              args.push(quote(msg));
              if (options.title) {
                args.push(cmd.title);
                args.push(quote(options.title));
              }
              if (options.subtitle) {
                args.push(cmd.subtitle);
                args.push(quote(options.subtitle));
              }
              break;
            case 'Darwin-Growl':
              args.push(cmd.msg);
              args.push(quote(msg));
              if (options.title)
                args.push(quote(options.title));
              break;
            case 'Linux':
              if (options.title) {
                args.push(quote(options.title));
                args.push(cmd.msg);
                args.push(quote(msg));
              } else {
                args.push(quote(msg));
              }
              break;
            case 'Windows':
              args.push(quote(msg));
              if (options.title)
                args.push(cmd.title + quote(options.title));
              break;
          }
          exec(args.join(' '), fn);
        }
        ;
      }).call(this, require('_process'));
    }, {
      "_process": 51,
      "child_process": 41,
      "fs": 41,
      "os": 50,
      "path": 41
    }],
    70: [function(require, module, exports) {
      (function(process) {
        var path = require('path');
        var fs = require('fs');
        var _0777 = parseInt('0777', 8);
        module.exports = mkdirP.mkdirp = mkdirP.mkdirP = mkdirP;
        function mkdirP(p, opts, f, made) {
          if (typeof opts === 'function') {
            f = opts;
            opts = {};
          } else if (!opts || (typeof opts === 'undefined' ? 'undefined' : $traceurRuntime.typeof(opts)) !== 'object') {
            opts = {mode: opts};
          }
          var mode = opts.mode;
          var xfs = opts.fs || fs;
          if (mode === undefined) {
            mode = _0777 & (~process.umask());
          }
          if (!made)
            made = null;
          var cb = f || function() {};
          p = path.resolve(p);
          xfs.mkdir(p, mode, function(er) {
            if (!er) {
              made = made || p;
              return cb(null, made);
            }
            switch (er.code) {
              case 'ENOENT':
                mkdirP(path.dirname(p), opts, function(er, made) {
                  if (er)
                    cb(er, made);
                  else
                    mkdirP(p, opts, cb, made);
                });
                break;
              default:
                xfs.stat(p, function(er2, stat) {
                  if (er2 || !stat.isDirectory())
                    cb(er, made);
                  else
                    cb(null, made);
                });
                break;
            }
          });
        }
        mkdirP.sync = function sync(p, opts, made) {
          if (!opts || (typeof opts === 'undefined' ? 'undefined' : $traceurRuntime.typeof(opts)) !== 'object') {
            opts = {mode: opts};
          }
          var mode = opts.mode;
          var xfs = opts.fs || fs;
          if (mode === undefined) {
            mode = _0777 & (~process.umask());
          }
          if (!made)
            made = null;
          p = path.resolve(p);
          try {
            xfs.mkdirSync(p, mode);
            made = made || p;
          } catch (err0) {
            switch (err0.code) {
              case 'ENOENT':
                made = sync(path.dirname(p), opts, made);
                sync(p, opts, made);
                break;
              default:
                var stat;
                try {
                  stat = xfs.statSync(p);
                } catch (err1) {
                  throw err0;
                }
                if (!stat.isDirectory())
                  throw err0;
                break;
            }
          }
          return made;
        };
      }).call(this, require('_process'));
    }, {
      "_process": 51,
      "fs": 41,
      "path": 41
    }],
    71: [function(require, module, exports) {
      (function(process, global) {
        process.stdout = require('browser-stdout')();
        var Mocha = require('../');
        var mocha = new Mocha({reporter: 'html'});
        var Date = global.Date;
        var setTimeout = global.setTimeout;
        var setInterval = global.setInterval;
        var clearTimeout = global.clearTimeout;
        var clearInterval = global.clearInterval;
        var uncaughtExceptionHandlers = [];
        var originalOnerrorHandler = global.onerror;
        process.removeListener = function(e, fn) {
          if ('uncaughtException' == e) {
            if (originalOnerrorHandler) {
              global.onerror = originalOnerrorHandler;
            } else {
              global.onerror = function() {};
            }
            var i = Mocha.utils.indexOf(uncaughtExceptionHandlers, fn);
            if (i != -1) {
              uncaughtExceptionHandlers.splice(i, 1);
            }
          }
        };
        process.on = function(e, fn) {
          if ('uncaughtException' == e) {
            global.onerror = function(err, url, line) {
              fn(new Error(err + ' (' + url + ':' + line + ')'));
              return !mocha.allowUncaught;
            };
            uncaughtExceptionHandlers.push(fn);
          }
        };
        mocha.suite.removeAllListeners('pre-require');
        var immediateQueue = [],
            immediateTimeout;
        function timeslice() {
          var immediateStart = new Date().getTime();
          while (immediateQueue.length && (new Date().getTime() - immediateStart) < 100) {
            immediateQueue.shift()();
          }
          if (immediateQueue.length) {
            immediateTimeout = setTimeout(timeslice, 0);
          } else {
            immediateTimeout = null;
          }
        }
        Mocha.Runner.immediately = function(callback) {
          immediateQueue.push(callback);
          if (!immediateTimeout) {
            immediateTimeout = setTimeout(timeslice, 0);
          }
        };
        mocha.throwError = function(err) {
          Mocha.utils.forEach(uncaughtExceptionHandlers, function(fn) {
            fn(err);
          });
          throw err;
        };
        mocha.ui = function(ui) {
          Mocha.prototype.ui.call(this, ui);
          this.suite.emit('pre-require', global, null, this);
          return this;
        };
        mocha.setup = function(opts) {
          if ('string' == typeof opts)
            opts = {ui: opts};
          for (var opt in opts)
            this[opt](opts[opt]);
          return this;
        };
        mocha.run = function(fn) {
          var options = mocha.options;
          mocha.globals('location');
          var query = Mocha.utils.parseQuery(global.location.search || '');
          if (query.grep)
            mocha.grep(new RegExp(query.grep));
          if (query.fgrep)
            mocha.grep(query.fgrep);
          if (query.invert)
            mocha.invert();
          return Mocha.prototype.run.call(mocha, function(err) {
            var document = global.document;
            if (document && document.getElementById('mocha') && options.noHighlighting !== true) {
              Mocha.utils.highlightTags('code');
            }
            if (fn)
              fn(err);
          });
        };
        Mocha.process = process;
        global.Mocha = Mocha;
        global.mocha = mocha;
      }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "../": 1,
      "_process": 51,
      "browser-stdout": 40
    }]
  }, {}, [71]);
  return {};
});
$traceurRuntime.registerModule("../bower_components/chai/chai.js", [], function() {
  "use strict";
  var __moduleName = "../bower_components/chai/chai.js";
  (function(f) {
    if ((typeof exports === 'undefined' ? 'undefined' : $traceurRuntime.typeof(exports)) === "object" && typeof module !== "undefined") {
      module.exports = f();
    } else if (typeof define === "function" && define.amd) {
      define([], f);
    } else {
      var g;
      if (typeof window !== "undefined") {
        g = window;
      } else if (typeof global !== "undefined") {
        g = global;
      } else if (typeof self !== "undefined") {
        g = self;
      } else {
        g = this;
      }
      g.chai = f();
    }
  })(function() {
    var define,
        module,
        exports;
    return (function e(t, n, r) {
      function s(o, u) {
        if (!n[o]) {
          if (!t[o]) {
            var a = typeof require == "function" && require;
            if (!u && a)
              return a(o, !0);
            if (i)
              return i(o, !0);
            var f = new Error("Cannot find module '" + o + "'");
            throw f.code = "MODULE_NOT_FOUND", f;
          }
          var l = n[o] = {exports: {}};
          t[o][0].call(l.exports, function(e) {
            var n = t[o][1][e];
            return s(n ? n : e);
          }, l, l.exports, e, t, n, r);
        }
        return n[o].exports;
      }
      var i = typeof require == "function" && require;
      for (var o = 0; o < r.length; o++)
        s(r[o]);
      return s;
    })({
      1: [function(require, module, exports) {
        module.exports = require('./lib/chai');
      }, {"./lib/chai": 2}],
      2: [function(require, module, exports) {
        var used = [],
            exports = module.exports = {};
        exports.version = '3.5.0';
        exports.AssertionError = require('assertion-error');
        var util = require('./chai/utils');
        exports.use = function(fn) {
          if (!~used.indexOf(fn)) {
            fn(this, util);
            used.push(fn);
          }
          return this;
        };
        exports.util = util;
        var config = require('./chai/config');
        exports.config = config;
        var assertion = require('./chai/assertion');
        exports.use(assertion);
        var core = require('./chai/core/assertions');
        exports.use(core);
        var expect = require('./chai/interface/expect');
        exports.use(expect);
        var should = require('./chai/interface/should');
        exports.use(should);
        var assert = require('./chai/interface/assert');
        exports.use(assert);
      }, {
        "./chai/assertion": 3,
        "./chai/config": 4,
        "./chai/core/assertions": 5,
        "./chai/interface/assert": 6,
        "./chai/interface/expect": 7,
        "./chai/interface/should": 8,
        "./chai/utils": 22,
        "assertion-error": 30
      }],
      3: [function(require, module, exports) {
        var config = require('./config');
        module.exports = function(_chai, util) {
          var AssertionError = _chai.AssertionError,
              flag = util.flag;
          _chai.Assertion = Assertion;
          function Assertion(obj, msg, stack) {
            flag(this, 'ssfi', stack || arguments.callee);
            flag(this, 'object', obj);
            flag(this, 'message', msg);
          }
          Object.defineProperty(Assertion, 'includeStack', {
            get: function() {
              console.warn('Assertion.includeStack is deprecated, use chai.config.includeStack instead.');
              return config.includeStack;
            },
            set: function(value) {
              console.warn('Assertion.includeStack is deprecated, use chai.config.includeStack instead.');
              config.includeStack = value;
            }
          });
          Object.defineProperty(Assertion, 'showDiff', {
            get: function() {
              console.warn('Assertion.showDiff is deprecated, use chai.config.showDiff instead.');
              return config.showDiff;
            },
            set: function(value) {
              console.warn('Assertion.showDiff is deprecated, use chai.config.showDiff instead.');
              config.showDiff = value;
            }
          });
          Assertion.addProperty = function(name, fn) {
            util.addProperty(this.prototype, name, fn);
          };
          Assertion.addMethod = function(name, fn) {
            util.addMethod(this.prototype, name, fn);
          };
          Assertion.addChainableMethod = function(name, fn, chainingBehavior) {
            util.addChainableMethod(this.prototype, name, fn, chainingBehavior);
          };
          Assertion.overwriteProperty = function(name, fn) {
            util.overwriteProperty(this.prototype, name, fn);
          };
          Assertion.overwriteMethod = function(name, fn) {
            util.overwriteMethod(this.prototype, name, fn);
          };
          Assertion.overwriteChainableMethod = function(name, fn, chainingBehavior) {
            util.overwriteChainableMethod(this.prototype, name, fn, chainingBehavior);
          };
          Assertion.prototype.assert = function(expr, msg, negateMsg, expected, _actual, showDiff) {
            var ok = util.test(this, arguments);
            if (true !== showDiff)
              showDiff = false;
            if (true !== config.showDiff)
              showDiff = false;
            if (!ok) {
              var msg = util.getMessage(this, arguments),
                  actual = util.getActual(this, arguments);
              throw new AssertionError(msg, {
                actual: actual,
                expected: expected,
                showDiff: showDiff
              }, (config.includeStack) ? this.assert : flag(this, 'ssfi'));
            }
          };
          Object.defineProperty(Assertion.prototype, '_obj', {
            get: function() {
              return flag(this, 'object');
            },
            set: function(val) {
              flag(this, 'object', val);
            }
          });
        };
      }, {"./config": 4}],
      4: [function(require, module, exports) {
        module.exports = {
          includeStack: false,
          showDiff: true,
          truncateThreshold: 40
        };
      }, {}],
      5: [function(require, module, exports) {
        module.exports = function(chai, _) {
          var Assertion = chai.Assertion,
              toString = Object.prototype.toString,
              flag = _.flag;
          ['to', 'be', 'been', 'is', 'and', 'has', 'have', 'with', 'that', 'which', 'at', 'of', 'same'].forEach(function(chain) {
            Assertion.addProperty(chain, function() {
              return this;
            });
          });
          Assertion.addProperty('not', function() {
            flag(this, 'negate', true);
          });
          Assertion.addProperty('deep', function() {
            flag(this, 'deep', true);
          });
          Assertion.addProperty('any', function() {
            flag(this, 'any', true);
            flag(this, 'all', false);
          });
          Assertion.addProperty('all', function() {
            flag(this, 'all', true);
            flag(this, 'any', false);
          });
          function an(type, msg) {
            if (msg)
              flag(this, 'message', msg);
            type = type.toLowerCase();
            var obj = flag(this, 'object'),
                article = ~['a', 'e', 'i', 'o', 'u'].indexOf(type.charAt(0)) ? 'an ' : 'a ';
            this.assert(type === _.type(obj), 'expected #{this} to be ' + article + type, 'expected #{this} not to be ' + article + type);
          }
          Assertion.addChainableMethod('an', an);
          Assertion.addChainableMethod('a', an);
          function includeChainingBehavior() {
            flag(this, 'contains', true);
          }
          function include(val, msg) {
            _.expectTypes(this, ['array', 'object', 'string']);
            if (msg)
              flag(this, 'message', msg);
            var obj = flag(this, 'object');
            var expected = false;
            if (_.type(obj) === 'array' && _.type(val) === 'object') {
              for (var i in obj) {
                if (_.eql(obj[i], val)) {
                  expected = true;
                  break;
                }
              }
            } else if (_.type(val) === 'object') {
              if (!flag(this, 'negate')) {
                for (var k in val)
                  new Assertion(obj).property(k, val[k]);
                return;
              }
              var subset = {};
              for (var k in val)
                subset[k] = obj[k];
              expected = _.eql(subset, val);
            } else {
              expected = (obj != undefined) && ~obj.indexOf(val);
            }
            this.assert(expected, 'expected #{this} to include ' + _.inspect(val), 'expected #{this} to not include ' + _.inspect(val));
          }
          Assertion.addChainableMethod('include', include, includeChainingBehavior);
          Assertion.addChainableMethod('contain', include, includeChainingBehavior);
          Assertion.addChainableMethod('contains', include, includeChainingBehavior);
          Assertion.addChainableMethod('includes', include, includeChainingBehavior);
          Assertion.addProperty('ok', function() {
            this.assert(flag(this, 'object'), 'expected #{this} to be truthy', 'expected #{this} to be falsy');
          });
          Assertion.addProperty('true', function() {
            this.assert(true === flag(this, 'object'), 'expected #{this} to be true', 'expected #{this} to be false', this.negate ? false : true);
          });
          Assertion.addProperty('false', function() {
            this.assert(false === flag(this, 'object'), 'expected #{this} to be false', 'expected #{this} to be true', this.negate ? true : false);
          });
          Assertion.addProperty('null', function() {
            this.assert(null === flag(this, 'object'), 'expected #{this} to be null', 'expected #{this} not to be null');
          });
          Assertion.addProperty('undefined', function() {
            this.assert(undefined === flag(this, 'object'), 'expected #{this} to be undefined', 'expected #{this} not to be undefined');
          });
          Assertion.addProperty('NaN', function() {
            this.assert(isNaN(flag(this, 'object')), 'expected #{this} to be NaN', 'expected #{this} not to be NaN');
          });
          Assertion.addProperty('exist', function() {
            this.assert(null != flag(this, 'object'), 'expected #{this} to exist', 'expected #{this} to not exist');
          });
          Assertion.addProperty('empty', function() {
            var obj = flag(this, 'object'),
                expected = obj;
            if (Array.isArray(obj) || 'string' === typeof object) {
              expected = obj.length;
            } else if ((typeof obj === 'undefined' ? 'undefined' : $traceurRuntime.typeof(obj)) === 'object') {
              expected = Object.keys(obj).length;
            }
            this.assert(!expected, 'expected #{this} to be empty', 'expected #{this} not to be empty');
          });
          function checkArguments() {
            var obj = flag(this, 'object'),
                type = Object.prototype.toString.call(obj);
            this.assert('[object Arguments]' === type, 'expected #{this} to be arguments but got ' + type, 'expected #{this} to not be arguments');
          }
          Assertion.addProperty('arguments', checkArguments);
          Assertion.addProperty('Arguments', checkArguments);
          function assertEqual(val, msg) {
            if (msg)
              flag(this, 'message', msg);
            var obj = flag(this, 'object');
            if (flag(this, 'deep')) {
              return this.eql(val);
            } else {
              this.assert(val === obj, 'expected #{this} to equal #{exp}', 'expected #{this} to not equal #{exp}', val, this._obj, true);
            }
          }
          Assertion.addMethod('equal', assertEqual);
          Assertion.addMethod('equals', assertEqual);
          Assertion.addMethod('eq', assertEqual);
          function assertEql(obj, msg) {
            if (msg)
              flag(this, 'message', msg);
            this.assert(_.eql(obj, flag(this, 'object')), 'expected #{this} to deeply equal #{exp}', 'expected #{this} to not deeply equal #{exp}', obj, this._obj, true);
          }
          Assertion.addMethod('eql', assertEql);
          Assertion.addMethod('eqls', assertEql);
          function assertAbove(n, msg) {
            if (msg)
              flag(this, 'message', msg);
            var obj = flag(this, 'object');
            if (flag(this, 'doLength')) {
              new Assertion(obj, msg).to.have.property('length');
              var len = obj.length;
              this.assert(len > n, 'expected #{this} to have a length above #{exp} but got #{act}', 'expected #{this} to not have a length above #{exp}', n, len);
            } else {
              this.assert(obj > n, 'expected #{this} to be above ' + n, 'expected #{this} to be at most ' + n);
            }
          }
          Assertion.addMethod('above', assertAbove);
          Assertion.addMethod('gt', assertAbove);
          Assertion.addMethod('greaterThan', assertAbove);
          function assertLeast(n, msg) {
            if (msg)
              flag(this, 'message', msg);
            var obj = flag(this, 'object');
            if (flag(this, 'doLength')) {
              new Assertion(obj, msg).to.have.property('length');
              var len = obj.length;
              this.assert(len >= n, 'expected #{this} to have a length at least #{exp} but got #{act}', 'expected #{this} to have a length below #{exp}', n, len);
            } else {
              this.assert(obj >= n, 'expected #{this} to be at least ' + n, 'expected #{this} to be below ' + n);
            }
          }
          Assertion.addMethod('least', assertLeast);
          Assertion.addMethod('gte', assertLeast);
          function assertBelow(n, msg) {
            if (msg)
              flag(this, 'message', msg);
            var obj = flag(this, 'object');
            if (flag(this, 'doLength')) {
              new Assertion(obj, msg).to.have.property('length');
              var len = obj.length;
              this.assert(len < n, 'expected #{this} to have a length below #{exp} but got #{act}', 'expected #{this} to not have a length below #{exp}', n, len);
            } else {
              this.assert(obj < n, 'expected #{this} to be below ' + n, 'expected #{this} to be at least ' + n);
            }
          }
          Assertion.addMethod('below', assertBelow);
          Assertion.addMethod('lt', assertBelow);
          Assertion.addMethod('lessThan', assertBelow);
          function assertMost(n, msg) {
            if (msg)
              flag(this, 'message', msg);
            var obj = flag(this, 'object');
            if (flag(this, 'doLength')) {
              new Assertion(obj, msg).to.have.property('length');
              var len = obj.length;
              this.assert(len <= n, 'expected #{this} to have a length at most #{exp} but got #{act}', 'expected #{this} to have a length above #{exp}', n, len);
            } else {
              this.assert(obj <= n, 'expected #{this} to be at most ' + n, 'expected #{this} to be above ' + n);
            }
          }
          Assertion.addMethod('most', assertMost);
          Assertion.addMethod('lte', assertMost);
          Assertion.addMethod('within', function(start, finish, msg) {
            if (msg)
              flag(this, 'message', msg);
            var obj = flag(this, 'object'),
                range = start + '..' + finish;
            if (flag(this, 'doLength')) {
              new Assertion(obj, msg).to.have.property('length');
              var len = obj.length;
              this.assert(len >= start && len <= finish, 'expected #{this} to have a length within ' + range, 'expected #{this} to not have a length within ' + range);
            } else {
              this.assert(obj >= start && obj <= finish, 'expected #{this} to be within ' + range, 'expected #{this} to not be within ' + range);
            }
          });
          function assertInstanceOf(constructor, msg) {
            if (msg)
              flag(this, 'message', msg);
            var name = _.getName(constructor);
            this.assert(flag(this, 'object') instanceof constructor, 'expected #{this} to be an instance of ' + name, 'expected #{this} to not be an instance of ' + name);
          }
          ;
          Assertion.addMethod('instanceof', assertInstanceOf);
          Assertion.addMethod('instanceOf', assertInstanceOf);
          Assertion.addMethod('property', function(name, val, msg) {
            if (msg)
              flag(this, 'message', msg);
            var isDeep = !!flag(this, 'deep'),
                descriptor = isDeep ? 'deep property ' : 'property ',
                negate = flag(this, 'negate'),
                obj = flag(this, 'object'),
                pathInfo = isDeep ? _.getPathInfo(name, obj) : null,
                hasProperty = isDeep ? pathInfo.exists : _.hasProperty(name, obj),
                value = isDeep ? pathInfo.value : obj[name];
            if (negate && arguments.length > 1) {
              if (undefined === value) {
                msg = (msg != null) ? msg + ': ' : '';
                throw new Error(msg + _.inspect(obj) + ' has no ' + descriptor + _.inspect(name));
              }
            } else {
              this.assert(hasProperty, 'expected #{this} to have a ' + descriptor + _.inspect(name), 'expected #{this} to not have ' + descriptor + _.inspect(name));
            }
            if (arguments.length > 1) {
              this.assert(val === value, 'expected #{this} to have a ' + descriptor + _.inspect(name) + ' of #{exp}, but got #{act}', 'expected #{this} to not have a ' + descriptor + _.inspect(name) + ' of #{act}', val, value);
            }
            flag(this, 'object', value);
          });
          function assertOwnProperty(name, msg) {
            if (msg)
              flag(this, 'message', msg);
            var obj = flag(this, 'object');
            this.assert(obj.hasOwnProperty(name), 'expected #{this} to have own property ' + _.inspect(name), 'expected #{this} to not have own property ' + _.inspect(name));
          }
          Assertion.addMethod('ownProperty', assertOwnProperty);
          Assertion.addMethod('haveOwnProperty', assertOwnProperty);
          function assertOwnPropertyDescriptor(name, descriptor, msg) {
            if (typeof descriptor === 'string') {
              msg = descriptor;
              descriptor = null;
            }
            if (msg)
              flag(this, 'message', msg);
            var obj = flag(this, 'object');
            var actualDescriptor = Object.getOwnPropertyDescriptor(Object(obj), name);
            if (actualDescriptor && descriptor) {
              this.assert(_.eql(descriptor, actualDescriptor), 'expected the own property descriptor for ' + _.inspect(name) + ' on #{this} to match ' + _.inspect(descriptor) + ', got ' + _.inspect(actualDescriptor), 'expected the own property descriptor for ' + _.inspect(name) + ' on #{this} to not match ' + _.inspect(descriptor), descriptor, actualDescriptor, true);
            } else {
              this.assert(actualDescriptor, 'expected #{this} to have an own property descriptor for ' + _.inspect(name), 'expected #{this} to not have an own property descriptor for ' + _.inspect(name));
            }
            flag(this, 'object', actualDescriptor);
          }
          Assertion.addMethod('ownPropertyDescriptor', assertOwnPropertyDescriptor);
          Assertion.addMethod('haveOwnPropertyDescriptor', assertOwnPropertyDescriptor);
          function assertLengthChain() {
            flag(this, 'doLength', true);
          }
          function assertLength(n, msg) {
            if (msg)
              flag(this, 'message', msg);
            var obj = flag(this, 'object');
            new Assertion(obj, msg).to.have.property('length');
            var len = obj.length;
            this.assert(len == n, 'expected #{this} to have a length of #{exp} but got #{act}', 'expected #{this} to not have a length of #{act}', n, len);
          }
          Assertion.addChainableMethod('length', assertLength, assertLengthChain);
          Assertion.addMethod('lengthOf', assertLength);
          function assertMatch(re, msg) {
            if (msg)
              flag(this, 'message', msg);
            var obj = flag(this, 'object');
            this.assert(re.exec(obj), 'expected #{this} to match ' + re, 'expected #{this} not to match ' + re);
          }
          Assertion.addMethod('match', assertMatch);
          Assertion.addMethod('matches', assertMatch);
          Assertion.addMethod('string', function(str, msg) {
            if (msg)
              flag(this, 'message', msg);
            var obj = flag(this, 'object');
            new Assertion(obj, msg).is.a('string');
            this.assert(~obj.indexOf(str), 'expected #{this} to contain ' + _.inspect(str), 'expected #{this} to not contain ' + _.inspect(str));
          });
          function assertKeys(keys) {
            var obj = flag(this, 'object'),
                str,
                ok = true,
                mixedArgsMsg = 'keys must be given single argument of Array|Object|String, or multiple String arguments';
            switch (_.type(keys)) {
              case "array":
                if (arguments.length > 1)
                  throw (new Error(mixedArgsMsg));
                break;
              case "object":
                if (arguments.length > 1)
                  throw (new Error(mixedArgsMsg));
                keys = Object.keys(keys);
                break;
              default:
                keys = Array.prototype.slice.call(arguments);
            }
            if (!keys.length)
              throw new Error('keys required');
            var actual = Object.keys(obj),
                expected = keys,
                len = keys.length,
                any = flag(this, 'any'),
                all = flag(this, 'all');
            if (!any && !all) {
              all = true;
            }
            if (any) {
              var intersection = expected.filter(function(key) {
                return ~actual.indexOf(key);
              });
              ok = intersection.length > 0;
            }
            if (all) {
              ok = keys.every(function(key) {
                return ~actual.indexOf(key);
              });
              if (!flag(this, 'negate') && !flag(this, 'contains')) {
                ok = ok && keys.length == actual.length;
              }
            }
            if (len > 1) {
              keys = keys.map(function(key) {
                return _.inspect(key);
              });
              var last = keys.pop();
              if (all) {
                str = keys.join(', ') + ', and ' + last;
              }
              if (any) {
                str = keys.join(', ') + ', or ' + last;
              }
            } else {
              str = _.inspect(keys[0]);
            }
            str = (len > 1 ? 'keys ' : 'key ') + str;
            str = (flag(this, 'contains') ? 'contain ' : 'have ') + str;
            this.assert(ok, 'expected #{this} to ' + str, 'expected #{this} to not ' + str, expected.slice(0).sort(), actual.sort(), true);
          }
          Assertion.addMethod('keys', assertKeys);
          Assertion.addMethod('key', assertKeys);
          function assertThrows(constructor, errMsg, msg) {
            if (msg)
              flag(this, 'message', msg);
            var obj = flag(this, 'object');
            new Assertion(obj, msg).is.a('function');
            var thrown = false,
                desiredError = null,
                name = null,
                thrownError = null;
            if (arguments.length === 0) {
              errMsg = null;
              constructor = null;
            } else if (constructor && (constructor instanceof RegExp || 'string' === typeof constructor)) {
              errMsg = constructor;
              constructor = null;
            } else if (constructor && constructor instanceof Error) {
              desiredError = constructor;
              constructor = null;
              errMsg = null;
            } else if (typeof constructor === 'function') {
              name = constructor.prototype.name;
              if (!name || (name === 'Error' && constructor !== Error)) {
                name = constructor.name || (new constructor()).name;
              }
            } else {
              constructor = null;
            }
            try {
              obj();
            } catch (err) {
              if (desiredError) {
                this.assert(err === desiredError, 'expected #{this} to throw #{exp} but #{act} was thrown', 'expected #{this} to not throw #{exp}', (desiredError instanceof Error ? desiredError.toString() : desiredError), (err instanceof Error ? err.toString() : err));
                flag(this, 'object', err);
                return this;
              }
              if (constructor) {
                this.assert(err instanceof constructor, 'expected #{this} to throw #{exp} but #{act} was thrown', 'expected #{this} to not throw #{exp} but #{act} was thrown', name, (err instanceof Error ? err.toString() : err));
                if (!errMsg) {
                  flag(this, 'object', err);
                  return this;
                }
              }
              var message = 'error' === _.type(err) && "message" in err ? err.message : '' + err;
              if ((message != null) && errMsg && errMsg instanceof RegExp) {
                this.assert(errMsg.exec(message), 'expected #{this} to throw error matching #{exp} but got #{act}', 'expected #{this} to throw error not matching #{exp}', errMsg, message);
                flag(this, 'object', err);
                return this;
              } else if ((message != null) && errMsg && 'string' === typeof errMsg) {
                this.assert(~message.indexOf(errMsg), 'expected #{this} to throw error including #{exp} but got #{act}', 'expected #{this} to throw error not including #{act}', errMsg, message);
                flag(this, 'object', err);
                return this;
              } else {
                thrown = true;
                thrownError = err;
              }
            }
            var actuallyGot = '',
                expectedThrown = name !== null ? name : desiredError ? '#{exp}' : 'an error';
            if (thrown) {
              actuallyGot = ' but #{act} was thrown';
            }
            this.assert(thrown === true, 'expected #{this} to throw ' + expectedThrown + actuallyGot, 'expected #{this} to not throw ' + expectedThrown + actuallyGot, (desiredError instanceof Error ? desiredError.toString() : desiredError), (thrownError instanceof Error ? thrownError.toString() : thrownError));
            flag(this, 'object', thrownError);
          }
          ;
          Assertion.addMethod('throw', assertThrows);
          Assertion.addMethod('throws', assertThrows);
          Assertion.addMethod('Throw', assertThrows);
          function respondTo(method, msg) {
            if (msg)
              flag(this, 'message', msg);
            var obj = flag(this, 'object'),
                itself = flag(this, 'itself'),
                context = ('function' === _.type(obj) && !itself) ? obj.prototype[method] : obj[method];
            this.assert('function' === typeof context, 'expected #{this} to respond to ' + _.inspect(method), 'expected #{this} to not respond to ' + _.inspect(method));
          }
          Assertion.addMethod('respondTo', respondTo);
          Assertion.addMethod('respondsTo', respondTo);
          Assertion.addProperty('itself', function() {
            flag(this, 'itself', true);
          });
          function satisfy(matcher, msg) {
            if (msg)
              flag(this, 'message', msg);
            var obj = flag(this, 'object');
            var result = matcher(obj);
            this.assert(result, 'expected #{this} to satisfy ' + _.objDisplay(matcher), 'expected #{this} to not satisfy' + _.objDisplay(matcher), this.negate ? false : true, result);
          }
          Assertion.addMethod('satisfy', satisfy);
          Assertion.addMethod('satisfies', satisfy);
          function closeTo(expected, delta, msg) {
            if (msg)
              flag(this, 'message', msg);
            var obj = flag(this, 'object');
            new Assertion(obj, msg).is.a('number');
            if (_.type(expected) !== 'number' || _.type(delta) !== 'number') {
              throw new Error('the arguments to closeTo or approximately must be numbers');
            }
            this.assert(Math.abs(obj - expected) <= delta, 'expected #{this} to be close to ' + expected + ' +/- ' + delta, 'expected #{this} not to be close to ' + expected + ' +/- ' + delta);
          }
          Assertion.addMethod('closeTo', closeTo);
          Assertion.addMethod('approximately', closeTo);
          function isSubsetOf(subset, superset, cmp) {
            return subset.every(function(elem) {
              if (!cmp)
                return superset.indexOf(elem) !== -1;
              return superset.some(function(elem2) {
                return cmp(elem, elem2);
              });
            });
          }
          Assertion.addMethod('members', function(subset, msg) {
            if (msg)
              flag(this, 'message', msg);
            var obj = flag(this, 'object');
            new Assertion(obj).to.be.an('array');
            new Assertion(subset).to.be.an('array');
            var cmp = flag(this, 'deep') ? _.eql : undefined;
            if (flag(this, 'contains')) {
              return this.assert(isSubsetOf(subset, obj, cmp), 'expected #{this} to be a superset of #{act}', 'expected #{this} to not be a superset of #{act}', obj, subset);
            }
            this.assert(isSubsetOf(obj, subset, cmp) && isSubsetOf(subset, obj, cmp), 'expected #{this} to have the same members as #{act}', 'expected #{this} to not have the same members as #{act}', obj, subset);
          });
          function oneOf(list, msg) {
            if (msg)
              flag(this, 'message', msg);
            var expected = flag(this, 'object');
            new Assertion(list).to.be.an('array');
            this.assert(list.indexOf(expected) > -1, 'expected #{this} to be one of #{exp}', 'expected #{this} to not be one of #{exp}', list, expected);
          }
          Assertion.addMethod('oneOf', oneOf);
          function assertChanges(object, prop, msg) {
            if (msg)
              flag(this, 'message', msg);
            var fn = flag(this, 'object');
            new Assertion(object, msg).to.have.property(prop);
            new Assertion(fn).is.a('function');
            var initial = object[prop];
            fn();
            this.assert(initial !== object[prop], 'expected .' + prop + ' to change', 'expected .' + prop + ' to not change');
          }
          Assertion.addChainableMethod('change', assertChanges);
          Assertion.addChainableMethod('changes', assertChanges);
          function assertIncreases(object, prop, msg) {
            if (msg)
              flag(this, 'message', msg);
            var fn = flag(this, 'object');
            new Assertion(object, msg).to.have.property(prop);
            new Assertion(fn).is.a('function');
            var initial = object[prop];
            fn();
            this.assert(object[prop] - initial > 0, 'expected .' + prop + ' to increase', 'expected .' + prop + ' to not increase');
          }
          Assertion.addChainableMethod('increase', assertIncreases);
          Assertion.addChainableMethod('increases', assertIncreases);
          function assertDecreases(object, prop, msg) {
            if (msg)
              flag(this, 'message', msg);
            var fn = flag(this, 'object');
            new Assertion(object, msg).to.have.property(prop);
            new Assertion(fn).is.a('function');
            var initial = object[prop];
            fn();
            this.assert(object[prop] - initial < 0, 'expected .' + prop + ' to decrease', 'expected .' + prop + ' to not decrease');
          }
          Assertion.addChainableMethod('decrease', assertDecreases);
          Assertion.addChainableMethod('decreases', assertDecreases);
          Assertion.addProperty('extensible', function() {
            var obj = flag(this, 'object');
            var isExtensible;
            try {
              isExtensible = Object.isExtensible(obj);
            } catch (err) {
              if (err instanceof TypeError)
                isExtensible = false;
              else
                throw err;
            }
            this.assert(isExtensible, 'expected #{this} to be extensible', 'expected #{this} to not be extensible');
          });
          Assertion.addProperty('sealed', function() {
            var obj = flag(this, 'object');
            var isSealed;
            try {
              isSealed = Object.isSealed(obj);
            } catch (err) {
              if (err instanceof TypeError)
                isSealed = true;
              else
                throw err;
            }
            this.assert(isSealed, 'expected #{this} to be sealed', 'expected #{this} to not be sealed');
          });
          Assertion.addProperty('frozen', function() {
            var obj = flag(this, 'object');
            var isFrozen;
            try {
              isFrozen = Object.isFrozen(obj);
            } catch (err) {
              if (err instanceof TypeError)
                isFrozen = true;
              else
                throw err;
            }
            this.assert(isFrozen, 'expected #{this} to be frozen', 'expected #{this} to not be frozen');
          });
        };
      }, {}],
      6: [function(require, module, exports) {
        module.exports = function(chai, util) {
          var Assertion = chai.Assertion,
              flag = util.flag;
          var assert = chai.assert = function(express, errmsg) {
            var test = new Assertion(null, null, chai.assert);
            test.assert(express, errmsg, '[ negation message unavailable ]');
          };
          assert.fail = function(actual, expected, message, operator) {
            message = message || 'assert.fail()';
            throw new chai.AssertionError(message, {
              actual: actual,
              expected: expected,
              operator: operator
            }, assert.fail);
          };
          assert.isOk = function(val, msg) {
            new Assertion(val, msg).is.ok;
          };
          assert.isNotOk = function(val, msg) {
            new Assertion(val, msg).is.not.ok;
          };
          assert.equal = function(act, exp, msg) {
            var test = new Assertion(act, msg, assert.equal);
            test.assert(exp == flag(test, 'object'), 'expected #{this} to equal #{exp}', 'expected #{this} to not equal #{act}', exp, act);
          };
          assert.notEqual = function(act, exp, msg) {
            var test = new Assertion(act, msg, assert.notEqual);
            test.assert(exp != flag(test, 'object'), 'expected #{this} to not equal #{exp}', 'expected #{this} to equal #{act}', exp, act);
          };
          assert.strictEqual = function(act, exp, msg) {
            new Assertion(act, msg).to.equal(exp);
          };
          assert.notStrictEqual = function(act, exp, msg) {
            new Assertion(act, msg).to.not.equal(exp);
          };
          assert.deepEqual = function(act, exp, msg) {
            new Assertion(act, msg).to.eql(exp);
          };
          assert.notDeepEqual = function(act, exp, msg) {
            new Assertion(act, msg).to.not.eql(exp);
          };
          assert.isAbove = function(val, abv, msg) {
            new Assertion(val, msg).to.be.above(abv);
          };
          assert.isAtLeast = function(val, atlst, msg) {
            new Assertion(val, msg).to.be.least(atlst);
          };
          assert.isBelow = function(val, blw, msg) {
            new Assertion(val, msg).to.be.below(blw);
          };
          assert.isAtMost = function(val, atmst, msg) {
            new Assertion(val, msg).to.be.most(atmst);
          };
          assert.isTrue = function(val, msg) {
            new Assertion(val, msg).is['true'];
          };
          assert.isNotTrue = function(val, msg) {
            new Assertion(val, msg).to.not.equal(true);
          };
          assert.isFalse = function(val, msg) {
            new Assertion(val, msg).is['false'];
          };
          assert.isNotFalse = function(val, msg) {
            new Assertion(val, msg).to.not.equal(false);
          };
          assert.isNull = function(val, msg) {
            new Assertion(val, msg).to.equal(null);
          };
          assert.isNotNull = function(val, msg) {
            new Assertion(val, msg).to.not.equal(null);
          };
          assert.isNaN = function(val, msg) {
            new Assertion(val, msg).to.be.NaN;
          };
          assert.isNotNaN = function(val, msg) {
            new Assertion(val, msg).not.to.be.NaN;
          };
          assert.isUndefined = function(val, msg) {
            new Assertion(val, msg).to.equal(undefined);
          };
          assert.isDefined = function(val, msg) {
            new Assertion(val, msg).to.not.equal(undefined);
          };
          assert.isFunction = function(val, msg) {
            new Assertion(val, msg).to.be.a('function');
          };
          assert.isNotFunction = function(val, msg) {
            new Assertion(val, msg).to.not.be.a('function');
          };
          assert.isObject = function(val, msg) {
            new Assertion(val, msg).to.be.a('object');
          };
          assert.isNotObject = function(val, msg) {
            new Assertion(val, msg).to.not.be.a('object');
          };
          assert.isArray = function(val, msg) {
            new Assertion(val, msg).to.be.an('array');
          };
          assert.isNotArray = function(val, msg) {
            new Assertion(val, msg).to.not.be.an('array');
          };
          assert.isString = function(val, msg) {
            new Assertion(val, msg).to.be.a('string');
          };
          assert.isNotString = function(val, msg) {
            new Assertion(val, msg).to.not.be.a('string');
          };
          assert.isNumber = function(val, msg) {
            new Assertion(val, msg).to.be.a('number');
          };
          assert.isNotNumber = function(val, msg) {
            new Assertion(val, msg).to.not.be.a('number');
          };
          assert.isBoolean = function(val, msg) {
            new Assertion(val, msg).to.be.a('boolean');
          };
          assert.isNotBoolean = function(val, msg) {
            new Assertion(val, msg).to.not.be.a('boolean');
          };
          assert.typeOf = function(val, type, msg) {
            new Assertion(val, msg).to.be.a(type);
          };
          assert.notTypeOf = function(val, type, msg) {
            new Assertion(val, msg).to.not.be.a(type);
          };
          assert.instanceOf = function(val, type, msg) {
            new Assertion(val, msg).to.be.instanceOf(type);
          };
          assert.notInstanceOf = function(val, type, msg) {
            new Assertion(val, msg).to.not.be.instanceOf(type);
          };
          assert.include = function(exp, inc, msg) {
            new Assertion(exp, msg, assert.include).include(inc);
          };
          assert.notInclude = function(exp, inc, msg) {
            new Assertion(exp, msg, assert.notInclude).not.include(inc);
          };
          assert.match = function(exp, re, msg) {
            new Assertion(exp, msg).to.match(re);
          };
          assert.notMatch = function(exp, re, msg) {
            new Assertion(exp, msg).to.not.match(re);
          };
          assert.property = function(obj, prop, msg) {
            new Assertion(obj, msg).to.have.property(prop);
          };
          assert.notProperty = function(obj, prop, msg) {
            new Assertion(obj, msg).to.not.have.property(prop);
          };
          assert.deepProperty = function(obj, prop, msg) {
            new Assertion(obj, msg).to.have.deep.property(prop);
          };
          assert.notDeepProperty = function(obj, prop, msg) {
            new Assertion(obj, msg).to.not.have.deep.property(prop);
          };
          assert.propertyVal = function(obj, prop, val, msg) {
            new Assertion(obj, msg).to.have.property(prop, val);
          };
          assert.propertyNotVal = function(obj, prop, val, msg) {
            new Assertion(obj, msg).to.not.have.property(prop, val);
          };
          assert.deepPropertyVal = function(obj, prop, val, msg) {
            new Assertion(obj, msg).to.have.deep.property(prop, val);
          };
          assert.deepPropertyNotVal = function(obj, prop, val, msg) {
            new Assertion(obj, msg).to.not.have.deep.property(prop, val);
          };
          assert.lengthOf = function(exp, len, msg) {
            new Assertion(exp, msg).to.have.length(len);
          };
          assert.throws = function(fn, errt, errs, msg) {
            if ('string' === typeof errt || errt instanceof RegExp) {
              errs = errt;
              errt = null;
            }
            var assertErr = new Assertion(fn, msg).to.throw(errt, errs);
            return flag(assertErr, 'object');
          };
          assert.doesNotThrow = function(fn, type, msg) {
            if ('string' === typeof type) {
              msg = type;
              type = null;
            }
            new Assertion(fn, msg).to.not.Throw(type);
          };
          assert.operator = function(val, operator, val2, msg) {
            var ok;
            switch (operator) {
              case '==':
                ok = val == val2;
                break;
              case '===':
                ok = val === val2;
                break;
              case '>':
                ok = val > val2;
                break;
              case '>=':
                ok = val >= val2;
                break;
              case '<':
                ok = val < val2;
                break;
              case '<=':
                ok = val <= val2;
                break;
              case '!=':
                ok = val != val2;
                break;
              case '!==':
                ok = val !== val2;
                break;
              default:
                throw new Error('Invalid operator "' + operator + '"');
            }
            var test = new Assertion(ok, msg);
            test.assert(true === flag(test, 'object'), 'expected ' + util.inspect(val) + ' to be ' + operator + ' ' + util.inspect(val2), 'expected ' + util.inspect(val) + ' to not be ' + operator + ' ' + util.inspect(val2));
          };
          assert.closeTo = function(act, exp, delta, msg) {
            new Assertion(act, msg).to.be.closeTo(exp, delta);
          };
          assert.approximately = function(act, exp, delta, msg) {
            new Assertion(act, msg).to.be.approximately(exp, delta);
          };
          assert.sameMembers = function(set1, set2, msg) {
            new Assertion(set1, msg).to.have.same.members(set2);
          };
          assert.sameDeepMembers = function(set1, set2, msg) {
            new Assertion(set1, msg).to.have.same.deep.members(set2);
          };
          assert.includeMembers = function(superset, subset, msg) {
            new Assertion(superset, msg).to.include.members(subset);
          };
          assert.includeDeepMembers = function(superset, subset, msg) {
            new Assertion(superset, msg).to.include.deep.members(subset);
          };
          assert.oneOf = function(inList, list, msg) {
            new Assertion(inList, msg).to.be.oneOf(list);
          };
          assert.changes = function(fn, obj, prop) {
            new Assertion(fn).to.change(obj, prop);
          };
          assert.doesNotChange = function(fn, obj, prop) {
            new Assertion(fn).to.not.change(obj, prop);
          };
          assert.increases = function(fn, obj, prop) {
            new Assertion(fn).to.increase(obj, prop);
          };
          assert.doesNotIncrease = function(fn, obj, prop) {
            new Assertion(fn).to.not.increase(obj, prop);
          };
          assert.decreases = function(fn, obj, prop) {
            new Assertion(fn).to.decrease(obj, prop);
          };
          assert.doesNotDecrease = function(fn, obj, prop) {
            new Assertion(fn).to.not.decrease(obj, prop);
          };
          assert.ifError = function(val) {
            if (val) {
              throw (val);
            }
          };
          assert.isExtensible = function(obj, msg) {
            new Assertion(obj, msg).to.be.extensible;
          };
          assert.isNotExtensible = function(obj, msg) {
            new Assertion(obj, msg).to.not.be.extensible;
          };
          assert.isSealed = function(obj, msg) {
            new Assertion(obj, msg).to.be.sealed;
          };
          assert.isNotSealed = function(obj, msg) {
            new Assertion(obj, msg).to.not.be.sealed;
          };
          assert.isFrozen = function(obj, msg) {
            new Assertion(obj, msg).to.be.frozen;
          };
          assert.isNotFrozen = function(obj, msg) {
            new Assertion(obj, msg).to.not.be.frozen;
          };
          (function alias(name, as) {
            assert[as] = assert[name];
            return alias;
          })('isOk', 'ok')('isNotOk', 'notOk')('throws', 'throw')('throws', 'Throw')('isExtensible', 'extensible')('isNotExtensible', 'notExtensible')('isSealed', 'sealed')('isNotSealed', 'notSealed')('isFrozen', 'frozen')('isNotFrozen', 'notFrozen');
        };
      }, {}],
      7: [function(require, module, exports) {
        module.exports = function(chai, util) {
          chai.expect = function(val, message) {
            return new chai.Assertion(val, message);
          };
          chai.expect.fail = function(actual, expected, message, operator) {
            message = message || 'expect.fail()';
            throw new chai.AssertionError(message, {
              actual: actual,
              expected: expected,
              operator: operator
            }, chai.expect.fail);
          };
        };
      }, {}],
      8: [function(require, module, exports) {
        module.exports = function(chai, util) {
          var Assertion = chai.Assertion;
          function loadShould() {
            function shouldGetter() {
              if (this instanceof String || this instanceof Number || this instanceof Boolean) {
                return new Assertion(this.valueOf(), null, shouldGetter);
              }
              return new Assertion(this, null, shouldGetter);
            }
            function shouldSetter(value) {
              Object.defineProperty(this, 'should', {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
              });
            }
            Object.defineProperty(Object.prototype, 'should', {
              set: shouldSetter,
              get: shouldGetter,
              configurable: true
            });
            var should = {};
            should.fail = function(actual, expected, message, operator) {
              message = message || 'should.fail()';
              throw new chai.AssertionError(message, {
                actual: actual,
                expected: expected,
                operator: operator
              }, should.fail);
            };
            should.equal = function(val1, val2, msg) {
              new Assertion(val1, msg).to.equal(val2);
            };
            should.Throw = function(fn, errt, errs, msg) {
              new Assertion(fn, msg).to.Throw(errt, errs);
            };
            should.exist = function(val, msg) {
              new Assertion(val, msg).to.exist;
            };
            should.not = {};
            should.not.equal = function(val1, val2, msg) {
              new Assertion(val1, msg).to.not.equal(val2);
            };
            should.not.Throw = function(fn, errt, errs, msg) {
              new Assertion(fn, msg).to.not.Throw(errt, errs);
            };
            should.not.exist = function(val, msg) {
              new Assertion(val, msg).to.not.exist;
            };
            should['throw'] = should['Throw'];
            should.not['throw'] = should.not['Throw'];
            return should;
          }
          ;
          chai.should = loadShould;
          chai.Should = loadShould;
        };
      }, {}],
      9: [function(require, module, exports) {
        var transferFlags = require('./transferFlags');
        var flag = require('./flag');
        var config = require('../config');
        var hasProtoSupport = '__proto__' in Object;
        var excludeNames = /^(?:length|name|arguments|caller)$/;
        var call = Function.prototype.call,
            apply = Function.prototype.apply;
        module.exports = function(ctx, name, method, chainingBehavior) {
          if (typeof chainingBehavior !== 'function') {
            chainingBehavior = function() {};
          }
          var chainableBehavior = {
            method: method,
            chainingBehavior: chainingBehavior
          };
          if (!ctx.__methods) {
            ctx.__methods = {};
          }
          ctx.__methods[name] = chainableBehavior;
          Object.defineProperty(ctx, name, {
            get: function() {
              chainableBehavior.chainingBehavior.call(this);
              var assert = function assert() {
                var old_ssfi = flag(this, 'ssfi');
                if (old_ssfi && config.includeStack === false)
                  flag(this, 'ssfi', assert);
                var result = chainableBehavior.method.apply(this, arguments);
                return result === undefined ? this : result;
              };
              if (hasProtoSupport) {
                var prototype = assert.__proto__ = Object.create(this);
                prototype.call = call;
                prototype.apply = apply;
              } else {
                var asserterNames = Object.getOwnPropertyNames(ctx);
                asserterNames.forEach(function(asserterName) {
                  if (!excludeNames.test(asserterName)) {
                    var pd = Object.getOwnPropertyDescriptor(ctx, asserterName);
                    Object.defineProperty(assert, asserterName, pd);
                  }
                });
              }
              transferFlags(this, assert);
              return assert;
            },
            configurable: true
          });
        };
      }, {
        "../config": 4,
        "./flag": 13,
        "./transferFlags": 29
      }],
      10: [function(require, module, exports) {
        var config = require('../config');
        var flag = require('./flag');
        module.exports = function(ctx, name, method) {
          ctx[name] = function() {
            var old_ssfi = flag(this, 'ssfi');
            if (old_ssfi && config.includeStack === false)
              flag(this, 'ssfi', ctx[name]);
            var result = method.apply(this, arguments);
            return result === undefined ? this : result;
          };
        };
      }, {
        "../config": 4,
        "./flag": 13
      }],
      11: [function(require, module, exports) {
        var config = require('../config');
        var flag = require('./flag');
        module.exports = function(ctx, name, getter) {
          Object.defineProperty(ctx, name, {
            get: function addProperty() {
              var old_ssfi = flag(this, 'ssfi');
              if (old_ssfi && config.includeStack === false)
                flag(this, 'ssfi', addProperty);
              var result = getter.call(this);
              return result === undefined ? this : result;
            },
            configurable: true
          });
        };
      }, {
        "../config": 4,
        "./flag": 13
      }],
      12: [function(require, module, exports) {
        var AssertionError = require('assertion-error');
        var flag = require('./flag');
        var type = require('type-detect');
        module.exports = function(obj, types) {
          var obj = flag(obj, 'object');
          types = types.map(function(t) {
            return t.toLowerCase();
          });
          types.sort();
          var str = types.map(function(t, index) {
            var art = ~['a', 'e', 'i', 'o', 'u'].indexOf(t.charAt(0)) ? 'an' : 'a';
            var or = types.length > 1 && index === types.length - 1 ? 'or ' : '';
            return or + art + ' ' + t;
          }).join(', ');
          if (!types.some(function(expected) {
            return type(obj) === expected;
          })) {
            throw new AssertionError('object tested must be ' + str + ', but ' + type(obj) + ' given');
          }
        };
      }, {
        "./flag": 13,
        "assertion-error": 30,
        "type-detect": 35
      }],
      13: [function(require, module, exports) {
        module.exports = function(obj, key, value) {
          var flags = obj.__flags || (obj.__flags = Object.create(null));
          if (arguments.length === 3) {
            flags[key] = value;
          } else {
            return flags[key];
          }
        };
      }, {}],
      14: [function(require, module, exports) {
        module.exports = function(obj, args) {
          return args.length > 4 ? args[4] : obj._obj;
        };
      }, {}],
      15: [function(require, module, exports) {
        module.exports = function getEnumerableProperties(object) {
          var result = [];
          for (var name in object) {
            result.push(name);
          }
          return result;
        };
      }, {}],
      16: [function(require, module, exports) {
        var flag = require('./flag'),
            getActual = require('./getActual'),
            inspect = require('./inspect'),
            objDisplay = require('./objDisplay');
        module.exports = function(obj, args) {
          var negate = flag(obj, 'negate'),
              val = flag(obj, 'object'),
              expected = args[3],
              actual = getActual(obj, args),
              msg = negate ? args[2] : args[1],
              flagMsg = flag(obj, 'message');
          if (typeof msg === "function")
            msg = msg();
          msg = msg || '';
          msg = msg.replace(/#\{this\}/g, function() {
            return objDisplay(val);
          }).replace(/#\{act\}/g, function() {
            return objDisplay(actual);
          }).replace(/#\{exp\}/g, function() {
            return objDisplay(expected);
          });
          return flagMsg ? flagMsg + ': ' + msg : msg;
        };
      }, {
        "./flag": 13,
        "./getActual": 14,
        "./inspect": 23,
        "./objDisplay": 24
      }],
      17: [function(require, module, exports) {
        module.exports = function(func) {
          if (func.name)
            return func.name;
          var match = /^\s?function ([^(]*)\(/.exec(func);
          return match && match[1] ? match[1] : "";
        };
      }, {}],
      18: [function(require, module, exports) {
        var hasProperty = require('./hasProperty');
        module.exports = function getPathInfo(path, obj) {
          var parsed = parsePath(path),
              last = parsed[parsed.length - 1];
          var info = {
            parent: parsed.length > 1 ? _getPathValue(parsed, obj, parsed.length - 1) : obj,
            name: last.p || last.i,
            value: _getPathValue(parsed, obj)
          };
          info.exists = hasProperty(info.name, info.parent);
          return info;
        };
        function parsePath(path) {
          var str = path.replace(/([^\\])\[/g, '$1.['),
              parts = str.match(/(\\\.|[^.]+?)+/g);
          return parts.map(function(value) {
            var re = /^\[(\d+)\]$/,
                mArr = re.exec(value);
            if (mArr)
              return {i: parseFloat(mArr[1])};
            else
              return {p: value.replace(/\\([.\[\]])/g, '$1')};
          });
        }
        function _getPathValue(parsed, obj, index) {
          var tmp = obj,
              res;
          index = (index === undefined ? parsed.length : index);
          for (var i = 0,
              l = index; i < l; i++) {
            var part = parsed[i];
            if (tmp) {
              if ('undefined' !== typeof part.p)
                tmp = tmp[part.p];
              else if ('undefined' !== typeof part.i)
                tmp = tmp[part.i];
              if (i == (l - 1))
                res = tmp;
            } else {
              res = undefined;
            }
          }
          return res;
        }
      }, {"./hasProperty": 21}],
      19: [function(require, module, exports) {
        var getPathInfo = require('./getPathInfo');
        module.exports = function(path, obj) {
          var info = getPathInfo(path, obj);
          return info.value;
        };
      }, {"./getPathInfo": 18}],
      20: [function(require, module, exports) {
        module.exports = function getProperties(object) {
          var result = Object.getOwnPropertyNames(object);
          function addProperty(property) {
            if (result.indexOf(property) === -1) {
              result.push(property);
            }
          }
          var proto = Object.getPrototypeOf(object);
          while (proto !== null) {
            Object.getOwnPropertyNames(proto).forEach(addProperty);
            proto = Object.getPrototypeOf(proto);
          }
          return result;
        };
      }, {}],
      21: [function(require, module, exports) {
        var type = require('type-detect');
        var literals = {
          'number': Number,
          'string': String
        };
        module.exports = function hasProperty(name, obj) {
          var ot = type(obj);
          if (ot === 'null' || ot === 'undefined')
            return false;
          if (literals[ot] && (typeof obj === 'undefined' ? 'undefined' : $traceurRuntime.typeof(obj)) !== 'object')
            obj = new literals[ot](obj);
          return name in obj;
        };
      }, {"type-detect": 35}],
      22: [function(require, module, exports) {
        var exports = module.exports = {};
        exports.test = require('./test');
        exports.type = require('type-detect');
        exports.expectTypes = require('./expectTypes');
        exports.getMessage = require('./getMessage');
        exports.getActual = require('./getActual');
        exports.inspect = require('./inspect');
        exports.objDisplay = require('./objDisplay');
        exports.flag = require('./flag');
        exports.transferFlags = require('./transferFlags');
        exports.eql = require('deep-eql');
        exports.getPathValue = require('./getPathValue');
        exports.getPathInfo = require('./getPathInfo');
        exports.hasProperty = require('./hasProperty');
        exports.getName = require('./getName');
        exports.addProperty = require('./addProperty');
        exports.addMethod = require('./addMethod');
        exports.overwriteProperty = require('./overwriteProperty');
        exports.overwriteMethod = require('./overwriteMethod');
        exports.addChainableMethod = require('./addChainableMethod');
        exports.overwriteChainableMethod = require('./overwriteChainableMethod');
      }, {
        "./addChainableMethod": 9,
        "./addMethod": 10,
        "./addProperty": 11,
        "./expectTypes": 12,
        "./flag": 13,
        "./getActual": 14,
        "./getMessage": 16,
        "./getName": 17,
        "./getPathInfo": 18,
        "./getPathValue": 19,
        "./hasProperty": 21,
        "./inspect": 23,
        "./objDisplay": 24,
        "./overwriteChainableMethod": 25,
        "./overwriteMethod": 26,
        "./overwriteProperty": 27,
        "./test": 28,
        "./transferFlags": 29,
        "deep-eql": 31,
        "type-detect": 35
      }],
      23: [function(require, module, exports) {
        var getName = require('./getName');
        var getProperties = require('./getProperties');
        var getEnumerableProperties = require('./getEnumerableProperties');
        module.exports = inspect;
        function inspect(obj, showHidden, depth, colors) {
          var ctx = {
            showHidden: showHidden,
            seen: [],
            stylize: function(str) {
              return str;
            }
          };
          return formatValue(ctx, obj, (typeof depth === 'undefined' ? 2 : depth));
        }
        var isDOMElement = function(object) {
          if ((typeof HTMLElement === 'undefined' ? 'undefined' : $traceurRuntime.typeof(HTMLElement)) === 'object') {
            return object instanceof HTMLElement;
          } else {
            return object && (typeof object === 'undefined' ? 'undefined' : $traceurRuntime.typeof(object)) === 'object' && object.nodeType === 1 && typeof object.nodeName === 'string';
          }
        };
        function formatValue(ctx, value, recurseTimes) {
          if (value && typeof value.inspect === 'function' && value.inspect !== exports.inspect && !(value.constructor && value.constructor.prototype === value)) {
            var ret = value.inspect(recurseTimes);
            if (typeof ret !== 'string') {
              ret = formatValue(ctx, ret, recurseTimes);
            }
            return ret;
          }
          var primitive = formatPrimitive(ctx, value);
          if (primitive) {
            return primitive;
          }
          if (isDOMElement(value)) {
            if ('outerHTML' in value) {
              return value.outerHTML;
            } else {
              try {
                if (document.xmlVersion) {
                  var xmlSerializer = new XMLSerializer();
                  return xmlSerializer.serializeToString(value);
                } else {
                  var ns = "http://www.w3.org/1999/xhtml";
                  var container = document.createElementNS(ns, '_');
                  container.appendChild(value.cloneNode(false));
                  html = container.innerHTML.replace('><', '>' + value.innerHTML + '<');
                  container.innerHTML = '';
                  return html;
                }
              } catch (err) {}
            }
          }
          var visibleKeys = getEnumerableProperties(value);
          var keys = ctx.showHidden ? getProperties(value) : visibleKeys;
          if (keys.length === 0 || (isError(value) && ((keys.length === 1 && keys[0] === 'stack') || (keys.length === 2 && keys[0] === 'description' && keys[1] === 'stack')))) {
            if (typeof value === 'function') {
              var name = getName(value);
              var nameSuffix = name ? ': ' + name : '';
              return ctx.stylize('[Function' + nameSuffix + ']', 'special');
            }
            if (isRegExp(value)) {
              return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
            }
            if (isDate(value)) {
              return ctx.stylize(Date.prototype.toUTCString.call(value), 'date');
            }
            if (isError(value)) {
              return formatError(value);
            }
          }
          var base = '',
              array = false,
              braces = ['{', '}'];
          if (isArray(value)) {
            array = true;
            braces = ['[', ']'];
          }
          if (typeof value === 'function') {
            var name = getName(value);
            var nameSuffix = name ? ': ' + name : '';
            base = ' [Function' + nameSuffix + ']';
          }
          if (isRegExp(value)) {
            base = ' ' + RegExp.prototype.toString.call(value);
          }
          if (isDate(value)) {
            base = ' ' + Date.prototype.toUTCString.call(value);
          }
          if (isError(value)) {
            return formatError(value);
          }
          if (keys.length === 0 && (!array || value.length == 0)) {
            return braces[0] + base + braces[1];
          }
          if (recurseTimes < 0) {
            if (isRegExp(value)) {
              return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
            } else {
              return ctx.stylize('[Object]', 'special');
            }
          }
          ctx.seen.push(value);
          var output;
          if (array) {
            output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
          } else {
            output = keys.map(function(key) {
              return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
            });
          }
          ctx.seen.pop();
          return reduceToSingleString(output, base, braces);
        }
        function formatPrimitive(ctx, value) {
          switch ((typeof value === 'undefined' ? 'undefined' : $traceurRuntime.typeof(value))) {
            case 'undefined':
              return ctx.stylize('undefined', 'undefined');
            case 'string':
              var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
              return ctx.stylize(simple, 'string');
            case 'number':
              if (value === 0 && (1 / value) === -Infinity) {
                return ctx.stylize('-0', 'number');
              }
              return ctx.stylize('' + value, 'number');
            case 'boolean':
              return ctx.stylize('' + value, 'boolean');
          }
          if (value === null) {
            return ctx.stylize('null', 'null');
          }
        }
        function formatError(value) {
          return '[' + Error.prototype.toString.call(value) + ']';
        }
        function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
          var output = [];
          for (var i = 0,
              l = value.length; i < l; ++i) {
            if (Object.prototype.hasOwnProperty.call(value, String(i))) {
              output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
            } else {
              output.push('');
            }
          }
          keys.forEach(function(key) {
            if (!key.match(/^\d+$/)) {
              output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
            }
          });
          return output;
        }
        function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
          var name,
              str;
          if (value.__lookupGetter__) {
            if (value.__lookupGetter__(key)) {
              if (value.__lookupSetter__(key)) {
                str = ctx.stylize('[Getter/Setter]', 'special');
              } else {
                str = ctx.stylize('[Getter]', 'special');
              }
            } else {
              if (value.__lookupSetter__(key)) {
                str = ctx.stylize('[Setter]', 'special');
              }
            }
          }
          if (visibleKeys.indexOf(key) < 0) {
            name = '[' + key + ']';
          }
          if (!str) {
            if (ctx.seen.indexOf(value[key]) < 0) {
              if (recurseTimes === null) {
                str = formatValue(ctx, value[key], null);
              } else {
                str = formatValue(ctx, value[key], recurseTimes - 1);
              }
              if (str.indexOf('\n') > -1) {
                if (array) {
                  str = str.split('\n').map(function(line) {
                    return '  ' + line;
                  }).join('\n').substr(2);
                } else {
                  str = '\n' + str.split('\n').map(function(line) {
                    return '   ' + line;
                  }).join('\n');
                }
              }
            } else {
              str = ctx.stylize('[Circular]', 'special');
            }
          }
          if (typeof name === 'undefined') {
            if (array && key.match(/^\d+$/)) {
              return str;
            }
            name = JSON.stringify('' + key);
            if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
              name = name.substr(1, name.length - 2);
              name = ctx.stylize(name, 'name');
            } else {
              name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
              name = ctx.stylize(name, 'string');
            }
          }
          return name + ': ' + str;
        }
        function reduceToSingleString(output, base, braces) {
          var numLinesEst = 0;
          var length = output.reduce(function(prev, cur) {
            numLinesEst++;
            if (cur.indexOf('\n') >= 0)
              numLinesEst++;
            return prev + cur.length + 1;
          }, 0);
          if (length > 60) {
            return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
          }
          return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
        }
        function isArray(ar) {
          return Array.isArray(ar) || ((typeof ar === 'undefined' ? 'undefined' : $traceurRuntime.typeof(ar)) === 'object' && objectToString(ar) === '[object Array]');
        }
        function isRegExp(re) {
          return (typeof re === 'undefined' ? 'undefined' : $traceurRuntime.typeof(re)) === 'object' && objectToString(re) === '[object RegExp]';
        }
        function isDate(d) {
          return (typeof d === 'undefined' ? 'undefined' : $traceurRuntime.typeof(d)) === 'object' && objectToString(d) === '[object Date]';
        }
        function isError(e) {
          return (typeof e === 'undefined' ? 'undefined' : $traceurRuntime.typeof(e)) === 'object' && objectToString(e) === '[object Error]';
        }
        function objectToString(o) {
          return Object.prototype.toString.call(o);
        }
      }, {
        "./getEnumerableProperties": 15,
        "./getName": 17,
        "./getProperties": 20
      }],
      24: [function(require, module, exports) {
        var inspect = require('./inspect');
        var config = require('../config');
        module.exports = function(obj) {
          var str = inspect(obj),
              type = Object.prototype.toString.call(obj);
          if (config.truncateThreshold && str.length >= config.truncateThreshold) {
            if (type === '[object Function]') {
              return !obj.name || obj.name === '' ? '[Function]' : '[Function: ' + obj.name + ']';
            } else if (type === '[object Array]') {
              return '[ Array(' + obj.length + ') ]';
            } else if (type === '[object Object]') {
              var keys = Object.keys(obj),
                  kstr = keys.length > 2 ? keys.splice(0, 2).join(', ') + ', ...' : keys.join(', ');
              return '{ Object (' + kstr + ') }';
            } else {
              return str;
            }
          } else {
            return str;
          }
        };
      }, {
        "../config": 4,
        "./inspect": 23
      }],
      25: [function(require, module, exports) {
        module.exports = function(ctx, name, method, chainingBehavior) {
          var chainableBehavior = ctx.__methods[name];
          var _chainingBehavior = chainableBehavior.chainingBehavior;
          chainableBehavior.chainingBehavior = function() {
            var result = chainingBehavior(_chainingBehavior).call(this);
            return result === undefined ? this : result;
          };
          var _method = chainableBehavior.method;
          chainableBehavior.method = function() {
            var result = method(_method).apply(this, arguments);
            return result === undefined ? this : result;
          };
        };
      }, {}],
      26: [function(require, module, exports) {
        module.exports = function(ctx, name, method) {
          var _method = ctx[name],
              _super = function() {
                return this;
              };
          if (_method && 'function' === typeof _method)
            _super = _method;
          ctx[name] = function() {
            var result = method(_super).apply(this, arguments);
            return result === undefined ? this : result;
          };
        };
      }, {}],
      27: [function(require, module, exports) {
        module.exports = function(ctx, name, getter) {
          var _get = Object.getOwnPropertyDescriptor(ctx, name),
              _super = function() {};
          if (_get && 'function' === typeof _get.get)
            _super = _get.get;
          Object.defineProperty(ctx, name, {
            get: function() {
              var result = getter(_super).call(this);
              return result === undefined ? this : result;
            },
            configurable: true
          });
        };
      }, {}],
      28: [function(require, module, exports) {
        var flag = require('./flag');
        module.exports = function(obj, args) {
          var negate = flag(obj, 'negate'),
              expr = args[0];
          return negate ? !expr : expr;
        };
      }, {"./flag": 13}],
      29: [function(require, module, exports) {
        module.exports = function(assertion, object, includeAll) {
          var flags = assertion.__flags || (assertion.__flags = Object.create(null));
          if (!object.__flags) {
            object.__flags = Object.create(null);
          }
          includeAll = arguments.length === 3 ? includeAll : true;
          for (var flag in flags) {
            if (includeAll || (flag !== 'object' && flag !== 'ssfi' && flag != 'message')) {
              object.__flags[flag] = flags[flag];
            }
          }
        };
      }, {}],
      30: [function(require, module, exports) {
        function exclude() {
          var excludes = [].slice.call(arguments);
          function excludeProps(res, obj) {
            Object.keys(obj).forEach(function(key) {
              if (!~excludes.indexOf(key))
                res[key] = obj[key];
            });
          }
          return function extendExclude() {
            var args = [].slice.call(arguments),
                i = 0,
                res = {};
            for (; i < args.length; i++) {
              excludeProps(res, args[i]);
            }
            return res;
          };
        }
        ;
        module.exports = AssertionError;
        function AssertionError(message, _props, ssf) {
          var extend = exclude('name', 'message', 'stack', 'constructor', 'toJSON'),
              props = extend(_props || {});
          this.message = message || 'Unspecified AssertionError';
          this.showDiff = false;
          for (var key in props) {
            this[key] = props[key];
          }
          ssf = ssf || arguments.callee;
          if (ssf && Error.captureStackTrace) {
            Error.captureStackTrace(this, ssf);
          } else {
            this.stack = new Error().stack;
          }
        }
        AssertionError.prototype = Object.create(Error.prototype);
        AssertionError.prototype.name = 'AssertionError';
        AssertionError.prototype.constructor = AssertionError;
        AssertionError.prototype.toJSON = function(stack) {
          var extend = exclude('constructor', 'toJSON', 'stack'),
              props = extend({name: this.name}, this);
          if (false !== stack && this.stack) {
            props.stack = this.stack;
          }
          return props;
        };
      }, {}],
      31: [function(require, module, exports) {
        module.exports = require('./lib/eql');
      }, {"./lib/eql": 32}],
      32: [function(require, module, exports) {
        var type = require('type-detect');
        var Buffer;
        try {
          Buffer = require('buffer').Buffer;
        } catch (ex) {
          Buffer = {};
          Buffer.isBuffer = function() {
            return false;
          };
        }
        module.exports = deepEqual;
        function deepEqual(a, b, m) {
          if (sameValue(a, b)) {
            return true;
          } else if ('date' === type(a)) {
            return dateEqual(a, b);
          } else if ('regexp' === type(a)) {
            return regexpEqual(a, b);
          } else if (Buffer.isBuffer(a)) {
            return bufferEqual(a, b);
          } else if ('arguments' === type(a)) {
            return argumentsEqual(a, b, m);
          } else if (!typeEqual(a, b)) {
            return false;
          } else if (('object' !== type(a) && 'object' !== type(b)) && ('array' !== type(a) && 'array' !== type(b))) {
            return sameValue(a, b);
          } else {
            return objectEqual(a, b, m);
          }
        }
        function sameValue(a, b) {
          if (a === b)
            return a !== 0 || 1 / a === 1 / b;
          return a !== a && b !== b;
        }
        function typeEqual(a, b) {
          return type(a) === type(b);
        }
        function dateEqual(a, b) {
          if ('date' !== type(b))
            return false;
          return sameValue(a.getTime(), b.getTime());
        }
        function regexpEqual(a, b) {
          if ('regexp' !== type(b))
            return false;
          return sameValue(a.toString(), b.toString());
        }
        function argumentsEqual(a, b, m) {
          if ('arguments' !== type(b))
            return false;
          a = [].slice.call(a);
          b = [].slice.call(b);
          return deepEqual(a, b, m);
        }
        function enumerable(a) {
          var res = [];
          for (var key in a)
            res.push(key);
          return res;
        }
        function iterableEqual(a, b) {
          if (a.length !== b.length)
            return false;
          var i = 0;
          var match = true;
          for (; i < a.length; i++) {
            if (a[i] !== b[i]) {
              match = false;
              break;
            }
          }
          return match;
        }
        function bufferEqual(a, b) {
          if (!Buffer.isBuffer(b))
            return false;
          return iterableEqual(a, b);
        }
        function isValue(a) {
          return a !== null && a !== undefined;
        }
        function objectEqual(a, b, m) {
          if (!isValue(a) || !isValue(b)) {
            return false;
          }
          if (a.prototype !== b.prototype) {
            return false;
          }
          var i;
          if (m) {
            for (i = 0; i < m.length; i++) {
              if ((m[i][0] === a && m[i][1] === b) || (m[i][0] === b && m[i][1] === a)) {
                return true;
              }
            }
          } else {
            m = [];
          }
          try {
            var ka = enumerable(a);
            var kb = enumerable(b);
          } catch (ex) {
            return false;
          }
          ka.sort();
          kb.sort();
          if (!iterableEqual(ka, kb)) {
            return false;
          }
          m.push([a, b]);
          var key;
          for (i = ka.length - 1; i >= 0; i--) {
            key = ka[i];
            if (!deepEqual(a[key], b[key], m)) {
              return false;
            }
          }
          return true;
        }
      }, {
        "buffer": undefined,
        "type-detect": 33
      }],
      33: [function(require, module, exports) {
        module.exports = require('./lib/type');
      }, {"./lib/type": 34}],
      34: [function(require, module, exports) {
        var exports = module.exports = getType;
        var natives = {
          '[object Array]': 'array',
          '[object RegExp]': 'regexp',
          '[object Function]': 'function',
          '[object Arguments]': 'arguments',
          '[object Date]': 'date'
        };
        function getType(obj) {
          var str = Object.prototype.toString.call(obj);
          if (natives[str])
            return natives[str];
          if (obj === null)
            return 'null';
          if (obj === undefined)
            return 'undefined';
          if (obj === Object(obj))
            return 'object';
          return (typeof obj === 'undefined' ? 'undefined' : $traceurRuntime.typeof(obj));
        }
        exports.Library = Library;
        function Library() {
          this.tests = {};
        }
        Library.prototype.of = getType;
        Library.prototype.define = function(type, test) {
          if (arguments.length === 1)
            return this.tests[type];
          this.tests[type] = test;
          return this;
        };
        Library.prototype.test = function(obj, type) {
          if (type === getType(obj))
            return true;
          var test = this.tests[type];
          if (test && 'regexp' === getType(test)) {
            return test.test(obj);
          } else if (test && 'function' === getType(test)) {
            return test(obj);
          } else {
            throw new ReferenceError('Type test "' + type + '" not defined or invalid.');
          }
        };
      }, {}],
      35: [function(require, module, exports) {
        arguments[4][33][0].apply(exports, arguments);
      }, {
        "./lib/type": 36,
        "dup": 33
      }],
      36: [function(require, module, exports) {
        var exports = module.exports = getType;
        var objectTypeRegexp = /^\[object (.*)\]$/;
        function getType(obj) {
          var type = Object.prototype.toString.call(obj).match(objectTypeRegexp)[1].toLowerCase();
          if (typeof Promise === 'function' && obj instanceof Promise)
            return 'promise';
          if (obj === null)
            return 'null';
          if (obj === undefined)
            return 'undefined';
          return type;
        }
        exports.Library = Library;
        function Library() {
          if (!(this instanceof Library))
            return new Library();
          this.tests = {};
        }
        Library.prototype.of = getType;
        Library.prototype.define = function(type, test) {
          if (arguments.length === 1)
            return this.tests[type];
          this.tests[type] = test;
          return this;
        };
        Library.prototype.test = function(obj, type) {
          if (type === getType(obj))
            return true;
          var test = this.tests[type];
          if (test && 'regexp' === getType(test)) {
            return test.test(obj);
          } else if (test && 'function' === getType(test)) {
            return test(obj);
          } else {
            throw new ReferenceError('Type test "' + type + '" not defined or invalid.');
          }
        };
      }, {}]
    }, {}, [1])(1);
  });
  return {};
});
$traceurRuntime.registerModule("1 - dummyModule.js", [], function() {
  "use strict";
  var __moduleName = "1 - dummyModule.js";
  function sayMessage() {
    return "hello";
  }
  var $__default = {sayMessage: sayMessage};
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("2 - modules.js", [], function() {
  "use strict";
  var __moduleName = "2 - modules.js";
  var mocha = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../bower_components/mocha/mocha.js", "2 - modules.js"));
  var chai = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../bower_components/chai/chai.js", "2 - modules.js"));
  var hello = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("1 - dummyModule.js", "2 - modules.js")).default;
  var should = chai.should();
  describe("modules", function() {
    it("it should have a method called sayMessage", function() {
      hello.sayMessage.should.be.a("function");
    });
  });
  return {};
});
$traceurRuntime.getModule("2 - modules.js" + '');
