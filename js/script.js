(function () {
	'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var vue_runtime_common = createCommonjsModule(function (module) {

	/*  */

	var emptyObject = Object.freeze({});

	// these helpers produces better vm code in JS engines due to their
	// explicitness and function inlining
	function isUndef (v) {
	  return v === undefined || v === null
	}

	function isDef (v) {
	  return v !== undefined && v !== null
	}

	function isTrue (v) {
	  return v === true
	}

	function isFalse (v) {
	  return v === false
	}

	/**
	 * Check if value is primitive
	 */
	function isPrimitive (value) {
	  return (
	    typeof value === 'string' ||
	    typeof value === 'number' ||
	    // $flow-disable-line
	    typeof value === 'symbol' ||
	    typeof value === 'boolean'
	  )
	}

	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 */
	function isObject (obj) {
	  return obj !== null && typeof obj === 'object'
	}

	/**
	 * Get the raw type string of a value e.g. [object Object]
	 */
	var _toString = Object.prototype.toString;

	function toRawType (value) {
	  return _toString.call(value).slice(8, -1)
	}

	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 */
	function isPlainObject (obj) {
	  return _toString.call(obj) === '[object Object]'
	}

	function isRegExp (v) {
	  return _toString.call(v) === '[object RegExp]'
	}

	/**
	 * Check if val is a valid array index.
	 */
	function isValidArrayIndex (val) {
	  var n = parseFloat(String(val));
	  return n >= 0 && Math.floor(n) === n && isFinite(val)
	}

	/**
	 * Convert a value to a string that is actually rendered.
	 */
	function toString (val) {
	  return val == null
	    ? ''
	    : typeof val === 'object'
	      ? JSON.stringify(val, null, 2)
	      : String(val)
	}

	/**
	 * Convert a input value to a number for persistence.
	 * If the conversion fails, return original string.
	 */
	function toNumber (val) {
	  var n = parseFloat(val);
	  return isNaN(n) ? val : n
	}

	/**
	 * Make a map and return a function for checking if a key
	 * is in that map.
	 */
	function makeMap (
	  str,
	  expectsLowerCase
	) {
	  var map = Object.create(null);
	  var list = str.split(',');
	  for (var i = 0; i < list.length; i++) {
	    map[list[i]] = true;
	  }
	  return expectsLowerCase
	    ? function (val) { return map[val.toLowerCase()]; }
	    : function (val) { return map[val]; }
	}

	/**
	 * Check if a tag is a built-in tag.
	 */
	var isBuiltInTag = makeMap('slot,component', true);

	/**
	 * Check if a attribute is a reserved attribute.
	 */
	var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

	/**
	 * Remove an item from an array
	 */
	function remove (arr, item) {
	  if (arr.length) {
	    var index = arr.indexOf(item);
	    if (index > -1) {
	      return arr.splice(index, 1)
	    }
	  }
	}

	/**
	 * Check whether the object has the property.
	 */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function hasOwn (obj, key) {
	  return hasOwnProperty.call(obj, key)
	}

	/**
	 * Create a cached version of a pure function.
	 */
	function cached (fn) {
	  var cache = Object.create(null);
	  return (function cachedFn (str) {
	    var hit = cache[str];
	    return hit || (cache[str] = fn(str))
	  })
	}

	/**
	 * Camelize a hyphen-delimited string.
	 */
	var camelizeRE = /-(\w)/g;
	var camelize = cached(function (str) {
	  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
	});

	/**
	 * Capitalize a string.
	 */
	var capitalize = cached(function (str) {
	  return str.charAt(0).toUpperCase() + str.slice(1)
	});

	/**
	 * Hyphenate a camelCase string.
	 */
	var hyphenateRE = /\B([A-Z])/g;
	var hyphenate = cached(function (str) {
	  return str.replace(hyphenateRE, '-$1').toLowerCase()
	});

	/**
	 * Simple bind polyfill for environments that do not support it... e.g.
	 * PhantomJS 1.x. Technically we don't need this anymore since native bind is
	 * now more performant in most browsers, but removing it would be breaking for
	 * code that was able to run in PhantomJS 1.x, so this must be kept for
	 * backwards compatibility.
	 */

	/* istanbul ignore next */
	function polyfillBind (fn, ctx) {
	  function boundFn (a) {
	    var l = arguments.length;
	    return l
	      ? l > 1
	        ? fn.apply(ctx, arguments)
	        : fn.call(ctx, a)
	      : fn.call(ctx)
	  }

	  boundFn._length = fn.length;
	  return boundFn
	}

	function nativeBind (fn, ctx) {
	  return fn.bind(ctx)
	}

	var bind = Function.prototype.bind
	  ? nativeBind
	  : polyfillBind;

	/**
	 * Convert an Array-like object to a real Array.
	 */
	function toArray (list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret
	}

	/**
	 * Mix properties into target object.
	 */
	function extend (to, _from) {
	  for (var key in _from) {
	    to[key] = _from[key];
	  }
	  return to
	}

	/**
	 * Merge an Array of Objects into a single Object.
	 */
	function toObject (arr) {
	  var res = {};
	  for (var i = 0; i < arr.length; i++) {
	    if (arr[i]) {
	      extend(res, arr[i]);
	    }
	  }
	  return res
	}

	/**
	 * Perform no operation.
	 * Stubbing args to make Flow happy without leaving useless transpiled code
	 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
	 */
	function noop (a, b, c) {}

	/**
	 * Always return false.
	 */
	var no = function (a, b, c) { return false; };

	/**
	 * Return same value
	 */
	var identity = function (_) { return _; };

	/**
	 * Generate a static keys string from compiler modules.
	 */


	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 */
	function looseEqual (a, b) {
	  if (a === b) { return true }
	  var isObjectA = isObject(a);
	  var isObjectB = isObject(b);
	  if (isObjectA && isObjectB) {
	    try {
	      var isArrayA = Array.isArray(a);
	      var isArrayB = Array.isArray(b);
	      if (isArrayA && isArrayB) {
	        return a.length === b.length && a.every(function (e, i) {
	          return looseEqual(e, b[i])
	        })
	      } else if (!isArrayA && !isArrayB) {
	        var keysA = Object.keys(a);
	        var keysB = Object.keys(b);
	        return keysA.length === keysB.length && keysA.every(function (key) {
	          return looseEqual(a[key], b[key])
	        })
	      } else {
	        /* istanbul ignore next */
	        return false
	      }
	    } catch (e) {
	      /* istanbul ignore next */
	      return false
	    }
	  } else if (!isObjectA && !isObjectB) {
	    return String(a) === String(b)
	  } else {
	    return false
	  }
	}

	function looseIndexOf (arr, val) {
	  for (var i = 0; i < arr.length; i++) {
	    if (looseEqual(arr[i], val)) { return i }
	  }
	  return -1
	}

	/**
	 * Ensure a function is called only once.
	 */
	function once (fn) {
	  var called = false;
	  return function () {
	    if (!called) {
	      called = true;
	      fn.apply(this, arguments);
	    }
	  }
	}

	var SSR_ATTR = 'data-server-rendered';

	var ASSET_TYPES = [
	  'component',
	  'directive',
	  'filter'
	];

	var LIFECYCLE_HOOKS = [
	  'beforeCreate',
	  'created',
	  'beforeMount',
	  'mounted',
	  'beforeUpdate',
	  'updated',
	  'beforeDestroy',
	  'destroyed',
	  'activated',
	  'deactivated',
	  'errorCaptured'
	];

	/*  */

	var config = ({
	  /**
	   * Option merge strategies (used in core/util/options)
	   */
	  // $flow-disable-line
	  optionMergeStrategies: Object.create(null),

	  /**
	   * Whether to suppress warnings.
	   */
	  silent: false,

	  /**
	   * Show production mode tip message on boot?
	   */
	  productionTip: undefined !== 'production',

	  /**
	   * Whether to enable devtools
	   */
	  devtools: undefined !== 'production',

	  /**
	   * Whether to record perf
	   */
	  performance: false,

	  /**
	   * Error handler for watcher errors
	   */
	  errorHandler: null,

	  /**
	   * Warn handler for watcher warns
	   */
	  warnHandler: null,

	  /**
	   * Ignore certain custom elements
	   */
	  ignoredElements: [],

	  /**
	   * Custom user key aliases for v-on
	   */
	  // $flow-disable-line
	  keyCodes: Object.create(null),

	  /**
	   * Check if a tag is reserved so that it cannot be registered as a
	   * component. This is platform-dependent and may be overwritten.
	   */
	  isReservedTag: no,

	  /**
	   * Check if an attribute is reserved so that it cannot be used as a component
	   * prop. This is platform-dependent and may be overwritten.
	   */
	  isReservedAttr: no,

	  /**
	   * Check if a tag is an unknown element.
	   * Platform-dependent.
	   */
	  isUnknownElement: no,

	  /**
	   * Get the namespace of an element
	   */
	  getTagNamespace: noop,

	  /**
	   * Parse the real tag name for the specific platform.
	   */
	  parsePlatformTagName: identity,

	  /**
	   * Check if an attribute must be bound using property, e.g. value
	   * Platform-dependent.
	   */
	  mustUseProp: no,

	  /**
	   * Exposed for legacy reasons
	   */
	  _lifecycleHooks: LIFECYCLE_HOOKS
	});

	/*  */

	/**
	 * Check if a string starts with $ or _
	 */
	function isReserved (str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F
	}

	/**
	 * Define a property.
	 */
	function def (obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}

	/**
	 * Parse simple path.
	 */
	var bailRE = /[^\w.$]/;
	function parsePath (path) {
	  if (bailRE.test(path)) {
	    return
	  }
	  var segments = path.split('.');
	  return function (obj) {
	    for (var i = 0; i < segments.length; i++) {
	      if (!obj) { return }
	      obj = obj[segments[i]];
	    }
	    return obj
	  }
	}

	/*  */

	// can we use __proto__?
	var hasProto = '__proto__' in {};

	// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined';
	var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
	var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE = UA && /msie|trident/.test(UA);
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isEdge = UA && UA.indexOf('edge/') > 0;
	var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
	var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
	var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

	// Firefox has a "watch" function on Object.prototype...
	var nativeWatch = ({}).watch;

	var supportsPassive = false;
	if (inBrowser) {
	  try {
	    var opts = {};
	    Object.defineProperty(opts, 'passive', ({
	      get: function get () {
	        /* istanbul ignore next */
	        supportsPassive = true;
	      }
	    })); // https://github.com/facebook/flow/issues/285
	    window.addEventListener('test-passive', null, opts);
	  } catch (e) {}
	}

	// this needs to be lazy-evaled because vue may be required before
	// vue-server-renderer can set VUE_ENV
	var _isServer;
	var isServerRendering = function () {
	  if (_isServer === undefined) {
	    /* istanbul ignore if */
	    if (!inBrowser && !inWeex && typeof commonjsGlobal !== 'undefined') {
	      // detect presence of vue-server-renderer and avoid
	      // Webpack shimming the process
	      _isServer = commonjsGlobal['process'].env.VUE_ENV === 'server';
	    } else {
	      _isServer = false;
	    }
	  }
	  return _isServer
	};

	// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

	/* istanbul ignore next */
	function isNative (Ctor) {
	  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
	}

	var hasSymbol =
	  typeof Symbol !== 'undefined' && isNative(Symbol) &&
	  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

	var _Set;
	/* istanbul ignore if */ // $flow-disable-line
	if (typeof Set !== 'undefined' && isNative(Set)) {
	  // use native Set when available.
	  _Set = Set;
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  _Set = (function () {
	    function Set () {
	      this.set = Object.create(null);
	    }
	    Set.prototype.has = function has (key) {
	      return this.set[key] === true
	    };
	    Set.prototype.add = function add (key) {
	      this.set[key] = true;
	    };
	    Set.prototype.clear = function clear () {
	      this.set = Object.create(null);
	    };

	    return Set;
	  }());
	}

	/*  */

	var warn = noop;
	var tip = noop;
	var generateComponentTrace = (noop); // work around flow check
	var formatComponentName = (noop);

	{
	  var hasConsole = typeof console !== 'undefined';
	  var classifyRE = /(?:^|[-_])(\w)/g;
	  var classify = function (str) { return str
	    .replace(classifyRE, function (c) { return c.toUpperCase(); })
	    .replace(/[-_]/g, ''); };

	  warn = function (msg, vm) {
	    var trace = vm ? generateComponentTrace(vm) : '';

	    if (config.warnHandler) {
	      config.warnHandler.call(null, msg, vm, trace);
	    } else if (hasConsole && (!config.silent)) {
	      console.error(("[Vue warn]: " + msg + trace));
	    }
	  };

	  tip = function (msg, vm) {
	    if (hasConsole && (!config.silent)) {
	      console.warn("[Vue tip]: " + msg + (
	        vm ? generateComponentTrace(vm) : ''
	      ));
	    }
	  };

	  formatComponentName = function (vm, includeFile) {
	    if (vm.$root === vm) {
	      return '<Root>'
	    }
	    var options = typeof vm === 'function' && vm.cid != null
	      ? vm.options
	      : vm._isVue
	        ? vm.$options || vm.constructor.options
	        : vm || {};
	    var name = options.name || options._componentTag;
	    var file = options.__file;
	    if (!name && file) {
	      var match = file.match(/([^/\\]+)\.vue$/);
	      name = match && match[1];
	    }

	    return (
	      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
	      (file && includeFile !== false ? (" at " + file) : '')
	    )
	  };

	  var repeat = function (str, n) {
	    var res = '';
	    while (n) {
	      if (n % 2 === 1) { res += str; }
	      if (n > 1) { str += str; }
	      n >>= 1;
	    }
	    return res
	  };

	  generateComponentTrace = function (vm) {
	    if (vm._isVue && vm.$parent) {
	      var tree = [];
	      var currentRecursiveSequence = 0;
	      while (vm) {
	        if (tree.length > 0) {
	          var last = tree[tree.length - 1];
	          if (last.constructor === vm.constructor) {
	            currentRecursiveSequence++;
	            vm = vm.$parent;
	            continue
	          } else if (currentRecursiveSequence > 0) {
	            tree[tree.length - 1] = [last, currentRecursiveSequence];
	            currentRecursiveSequence = 0;
	          }
	        }
	        tree.push(vm);
	        vm = vm.$parent;
	      }
	      return '\n\nfound in\n\n' + tree
	        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
	            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
	            : formatComponentName(vm))); })
	        .join('\n')
	    } else {
	      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
	    }
	  };
	}

	/*  */


	var uid = 0;

	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 */
	var Dep = function Dep () {
	  this.id = uid++;
	  this.subs = [];
	};

	Dep.prototype.addSub = function addSub (sub) {
	  this.subs.push(sub);
	};

	Dep.prototype.removeSub = function removeSub (sub) {
	  remove(this.subs, sub);
	};

	Dep.prototype.depend = function depend () {
	  if (Dep.target) {
	    Dep.target.addDep(this);
	  }
	};

	Dep.prototype.notify = function notify () {
	  // stabilize the subscriber list first
	  var subs = this.subs.slice();
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};

	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;
	var targetStack = [];

	function pushTarget (_target) {
	  if (Dep.target) { targetStack.push(Dep.target); }
	  Dep.target = _target;
	}

	function popTarget () {
	  Dep.target = targetStack.pop();
	}

	/*  */

	var VNode = function VNode (
	  tag,
	  data,
	  children,
	  text,
	  elm,
	  context,
	  componentOptions,
	  asyncFactory
	) {
	  this.tag = tag;
	  this.data = data;
	  this.children = children;
	  this.text = text;
	  this.elm = elm;
	  this.ns = undefined;
	  this.context = context;
	  this.fnContext = undefined;
	  this.fnOptions = undefined;
	  this.fnScopeId = undefined;
	  this.key = data && data.key;
	  this.componentOptions = componentOptions;
	  this.componentInstance = undefined;
	  this.parent = undefined;
	  this.raw = false;
	  this.isStatic = false;
	  this.isRootInsert = true;
	  this.isComment = false;
	  this.isCloned = false;
	  this.isOnce = false;
	  this.asyncFactory = asyncFactory;
	  this.asyncMeta = undefined;
	  this.isAsyncPlaceholder = false;
	};

	var prototypeAccessors = { child: { configurable: true } };

	// DEPRECATED: alias for componentInstance for backwards compat.
	/* istanbul ignore next */
	prototypeAccessors.child.get = function () {
	  return this.componentInstance
	};

	Object.defineProperties( VNode.prototype, prototypeAccessors );

	var createEmptyVNode = function (text) {
	  if ( text === void 0 ) text = '';

	  var node = new VNode();
	  node.text = text;
	  node.isComment = true;
	  return node
	};

	function createTextVNode (val) {
	  return new VNode(undefined, undefined, undefined, String(val))
	}

	// optimized shallow clone
	// used for static nodes and slot nodes because they may be reused across
	// multiple renders, cloning them avoids errors when DOM manipulations rely
	// on their elm reference.
	function cloneVNode (vnode) {
	  var cloned = new VNode(
	    vnode.tag,
	    vnode.data,
	    vnode.children,
	    vnode.text,
	    vnode.elm,
	    vnode.context,
	    vnode.componentOptions,
	    vnode.asyncFactory
	  );
	  cloned.ns = vnode.ns;
	  cloned.isStatic = vnode.isStatic;
	  cloned.key = vnode.key;
	  cloned.isComment = vnode.isComment;
	  cloned.fnContext = vnode.fnContext;
	  cloned.fnOptions = vnode.fnOptions;
	  cloned.fnScopeId = vnode.fnScopeId;
	  cloned.isCloned = true;
	  return cloned
	}

	/*
	 * not type checking this file because flow doesn't play well with
	 * dynamically accessing methods on Array prototype
	 */

	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto);

	var methodsToPatch = [
	  'push',
	  'pop',
	  'shift',
	  'unshift',
	  'splice',
	  'sort',
	  'reverse'
	];

	/**
	 * Intercept mutating methods and emit events
	 */
	methodsToPatch.forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator () {
	    var args = [], len = arguments.length;
	    while ( len-- ) args[ len ] = arguments[ len ];

	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	      case 'unshift':
	        inserted = args;
	        break
	      case 'splice':
	        inserted = args.slice(2);
	        break
	    }
	    if (inserted) { ob.observeArray(inserted); }
	    // notify change
	    ob.dep.notify();
	    return result
	  });
	});

	/*  */

	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

	/**
	 * In some cases we may want to disable observation inside a component's
	 * update computation.
	 */
	var shouldObserve = true;

	function toggleObserving (value) {
	  shouldObserve = value;
	}

	/**
	 * Observer class that is attached to each observed
	 * object. Once attached, the observer converts the target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatch updates.
	 */
	var Observer = function Observer (value) {
	  this.value = value;
	  this.dep = new Dep();
	  this.vmCount = 0;
	  def(value, '__ob__', this);
	  if (Array.isArray(value)) {
	    var augment = hasProto
	      ? protoAugment
	      : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	};

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 */
	Observer.prototype.walk = function walk (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0; i < keys.length; i++) {
	    defineReactive(obj, keys[i]);
	  }
	};

	/**
	 * Observe a list of Array items.
	 */
	Observer.prototype.observeArray = function observeArray (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};

	// helpers

	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 */
	function protoAugment (target, src, keys) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}

	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 */
	/* istanbul ignore next */
	function copyAugment (target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}

	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 */
	function observe (value, asRootData) {
	  if (!isObject(value) || value instanceof VNode) {
	    return
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if (
	    shouldObserve &&
	    !isServerRendering() &&
	    (Array.isArray(value) || isPlainObject(value)) &&
	    Object.isExtensible(value) &&
	    !value._isVue
	  ) {
	    ob = new Observer(value);
	  }
	  if (asRootData && ob) {
	    ob.vmCount++;
	  }
	  return ob
	}

	/**
	 * Define a reactive property on an Object.
	 */
	function defineReactive (
	  obj,
	  key,
	  val,
	  customSetter,
	  shallow
	) {
	  var dep = new Dep();

	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return
	  }

	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  if (!getter && arguments.length === 2) {
	    val = obj[key];
	  }
	  var setter = property && property.set;

	  var childOb = !shallow && observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter () {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	          if (Array.isArray(value)) {
	            dependArray(value);
	          }
	        }
	      }
	      return value
	    },
	    set: function reactiveSetter (newVal) {
	      var value = getter ? getter.call(obj) : val;
	      /* eslint-disable no-self-compare */
	      if (newVal === value || (newVal !== newVal && value !== value)) {
	        return
	      }
	      /* eslint-enable no-self-compare */
	      if (customSetter) {
	        customSetter();
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = !shallow && observe(newVal);
	      dep.notify();
	    }
	  });
	}

	/**
	 * Set a property on an object. Adds the new property and
	 * triggers change notification if the property doesn't
	 * already exist.
	 */
	function set (target, key, val) {
	  if (isUndef(target) || isPrimitive(target)
	  ) {
	    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
	  }
	  if (Array.isArray(target) && isValidArrayIndex(key)) {
	    target.length = Math.max(target.length, key);
	    target.splice(key, 1, val);
	    return val
	  }
	  if (key in target && !(key in Object.prototype)) {
	    target[key] = val;
	    return val
	  }
	  var ob = (target).__ob__;
	  if (target._isVue || (ob && ob.vmCount)) {
	    warn(
	      'Avoid adding reactive properties to a Vue instance or its root $data ' +
	      'at runtime - declare it upfront in the data option.'
	    );
	    return val
	  }
	  if (!ob) {
	    target[key] = val;
	    return val
	  }
	  defineReactive(ob.value, key, val);
	  ob.dep.notify();
	  return val
	}

	/**
	 * Delete a property and trigger change if necessary.
	 */
	function del (target, key) {
	  if (isUndef(target) || isPrimitive(target)
	  ) {
	    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
	  }
	  if (Array.isArray(target) && isValidArrayIndex(key)) {
	    target.splice(key, 1);
	    return
	  }
	  var ob = (target).__ob__;
	  if (target._isVue || (ob && ob.vmCount)) {
	    warn(
	      'Avoid deleting properties on a Vue instance or its root $data ' +
	      '- just set it to null.'
	    );
	    return
	  }
	  if (!hasOwn(target, key)) {
	    return
	  }
	  delete target[key];
	  if (!ob) {
	    return
	  }
	  ob.dep.notify();
	}

	/**
	 * Collect dependencies on array elements when the array is touched, since
	 * we cannot intercept array element access like property getters.
	 */
	function dependArray (value) {
	  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
	    e = value[i];
	    e && e.__ob__ && e.__ob__.dep.depend();
	    if (Array.isArray(e)) {
	      dependArray(e);
	    }
	  }
	}

	/*  */

	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 */
	var strats = config.optionMergeStrategies;

	/**
	 * Options with restrictions
	 */
	{
	  strats.el = strats.propsData = function (parent, child, vm, key) {
	    if (!vm) {
	      warn(
	        "option \"" + key + "\" can only be used during instance " +
	        'creation with the `new` keyword.'
	      );
	    }
	    return defaultStrat(parent, child)
	  };
	}

	/**
	 * Helper that recursively merges two data objects together.
	 */
	function mergeData (to, from) {
	  if (!from) { return to }
	  var key, toVal, fromVal;
	  var keys = Object.keys(from);
	  for (var i = 0; i < keys.length; i++) {
	    key = keys[i];
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal);
	    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to
	}

	/**
	 * Data
	 */
	function mergeDataOrFn (
	  parentVal,
	  childVal,
	  vm
	) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal
	    }
	    if (!parentVal) {
	      return childVal
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn () {
	      return mergeData(
	        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
	        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
	      )
	    }
	  } else {
	    return function mergedInstanceDataFn () {
	      // instance merge
	      var instanceData = typeof childVal === 'function'
	        ? childVal.call(vm, vm)
	        : childVal;
	      var defaultData = typeof parentVal === 'function'
	        ? parentVal.call(vm, vm)
	        : parentVal;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData)
	      } else {
	        return defaultData
	      }
	    }
	  }
	}

	strats.data = function (
	  parentVal,
	  childVal,
	  vm
	) {
	  if (!vm) {
	    if (childVal && typeof childVal !== 'function') {
	      warn(
	        'The "data" option should be a function ' +
	        'that returns a per-instance value in component ' +
	        'definitions.',
	        vm
	      );

	      return parentVal
	    }
	    return mergeDataOrFn(parentVal, childVal)
	  }

	  return mergeDataOrFn(parentVal, childVal, vm)
	};

	/**
	 * Hooks and props are merged as arrays.
	 */
	function mergeHook (
	  parentVal,
	  childVal
	) {
	  return childVal
	    ? parentVal
	      ? parentVal.concat(childVal)
	      : Array.isArray(childVal)
	        ? childVal
	        : [childVal]
	    : parentVal
	}

	LIFECYCLE_HOOKS.forEach(function (hook) {
	  strats[hook] = mergeHook;
	});

	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */
	function mergeAssets (
	  parentVal,
	  childVal,
	  vm,
	  key
	) {
	  var res = Object.create(parentVal || null);
	  if (childVal) {
	    assertObjectType(key, childVal, vm);
	    return extend(res, childVal)
	  } else {
	    return res
	  }
	}

	ASSET_TYPES.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});

	/**
	 * Watchers.
	 *
	 * Watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */
	strats.watch = function (
	  parentVal,
	  childVal,
	  vm,
	  key
	) {
	  // work around Firefox's Object.prototype.watch...
	  if (parentVal === nativeWatch) { parentVal = undefined; }
	  if (childVal === nativeWatch) { childVal = undefined; }
	  /* istanbul ignore if */
	  if (!childVal) { return Object.create(parentVal || null) }
	  {
	    assertObjectType(key, childVal, vm);
	  }
	  if (!parentVal) { return childVal }
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key$1 in childVal) {
	    var parent = ret[key$1];
	    var child = childVal[key$1];
	    if (parent && !Array.isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key$1] = parent
	      ? parent.concat(child)
	      : Array.isArray(child) ? child : [child];
	  }
	  return ret
	};

	/**
	 * Other object hashes.
	 */
	strats.props =
	strats.methods =
	strats.inject =
	strats.computed = function (
	  parentVal,
	  childVal,
	  vm,
	  key
	) {
	  if (childVal && undefined !== 'production') {
	    assertObjectType(key, childVal, vm);
	  }
	  if (!parentVal) { return childVal }
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  if (childVal) { extend(ret, childVal); }
	  return ret
	};
	strats.provide = mergeDataOrFn;

	/**
	 * Default strategy.
	 */
	var defaultStrat = function (parentVal, childVal) {
	  return childVal === undefined
	    ? parentVal
	    : childVal
	};

	/**
	 * Validate component names
	 */
	function checkComponents (options) {
	  for (var key in options.components) {
	    validateComponentName(key);
	  }
	}

	function validateComponentName (name) {
	  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	    warn(
	      'Invalid component name: "' + name + '". Component names ' +
	      'can only contain alphanumeric characters and the hyphen, ' +
	      'and must start with a letter.'
	    );
	  }
	  if (isBuiltInTag(name) || config.isReservedTag(name)) {
	    warn(
	      'Do not use built-in or reserved HTML elements as component ' +
	      'id: ' + name
	    );
	  }
	}

	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 */
	function normalizeProps (options, vm) {
	  var props = options.props;
	  if (!props) { return }
	  var res = {};
	  var i, val, name;
	  if (Array.isArray(props)) {
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        name = camelize(val);
	        res[name] = { type: null };
	      } else {
	        warn('props must be strings when using array syntax.');
	      }
	    }
	  } else if (isPlainObject(props)) {
	    for (var key in props) {
	      val = props[key];
	      name = camelize(key);
	      res[name] = isPlainObject(val)
	        ? val
	        : { type: val };
	    }
	  } else {
	    warn(
	      "Invalid value for option \"props\": expected an Array or an Object, " +
	      "but got " + (toRawType(props)) + ".",
	      vm
	    );
	  }
	  options.props = res;
	}

	/**
	 * Normalize all injections into Object-based format
	 */
	function normalizeInject (options, vm) {
	  var inject = options.inject;
	  if (!inject) { return }
	  var normalized = options.inject = {};
	  if (Array.isArray(inject)) {
	    for (var i = 0; i < inject.length; i++) {
	      normalized[inject[i]] = { from: inject[i] };
	    }
	  } else if (isPlainObject(inject)) {
	    for (var key in inject) {
	      var val = inject[key];
	      normalized[key] = isPlainObject(val)
	        ? extend({ from: key }, val)
	        : { from: val };
	    }
	  } else {
	    warn(
	      "Invalid value for option \"inject\": expected an Array or an Object, " +
	      "but got " + (toRawType(inject)) + ".",
	      vm
	    );
	  }
	}

	/**
	 * Normalize raw function directives into object format.
	 */
	function normalizeDirectives (options) {
	  var dirs = options.directives;
	  if (dirs) {
	    for (var key in dirs) {
	      var def = dirs[key];
	      if (typeof def === 'function') {
	        dirs[key] = { bind: def, update: def };
	      }
	    }
	  }
	}

	function assertObjectType (name, value, vm) {
	  if (!isPlainObject(value)) {
	    warn(
	      "Invalid value for option \"" + name + "\": expected an Object, " +
	      "but got " + (toRawType(value)) + ".",
	      vm
	    );
	  }
	}

	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 */
	function mergeOptions (
	  parent,
	  child,
	  vm
	) {
	  {
	    checkComponents(child);
	  }

	  if (typeof child === 'function') {
	    child = child.options;
	  }

	  normalizeProps(child, vm);
	  normalizeInject(child, vm);
	  normalizeDirectives(child);
	  var extendsFrom = child.extends;
	  if (extendsFrom) {
	    parent = mergeOptions(parent, extendsFrom, vm);
	  }
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      parent = mergeOptions(parent, child.mixins[i], vm);
	    }
	  }
	  var options = {};
	  var key;
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField (key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options
	}

	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 */
	function resolveAsset (
	  options,
	  type,
	  id,
	  warnMissing
	) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return
	  }
	  var assets = options[type];
	  // check local registration variations first
	  if (hasOwn(assets, id)) { return assets[id] }
	  var camelizedId = camelize(id);
	  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
	  var PascalCaseId = capitalize(camelizedId);
	  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
	  // fallback to prototype chain
	  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
	  if (warnMissing && !res) {
	    warn(
	      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
	      options
	    );
	  }
	  return res
	}

	/*  */

	function validateProp (
	  key,
	  propOptions,
	  propsData,
	  vm
	) {
	  var prop = propOptions[key];
	  var absent = !hasOwn(propsData, key);
	  var value = propsData[key];
	  // boolean casting
	  var booleanIndex = getTypeIndex(Boolean, prop.type);
	  if (booleanIndex > -1) {
	    if (absent && !hasOwn(prop, 'default')) {
	      value = false;
	    } else if (value === '' || value === hyphenate(key)) {
	      // only cast empty string / same name to boolean if
	      // boolean has higher priority
	      var stringIndex = getTypeIndex(String, prop.type);
	      if (stringIndex < 0 || booleanIndex < stringIndex) {
	        value = true;
	      }
	    }
	  }
	  // check default value
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop, key);
	    // since the default value is a fresh copy,
	    // make sure to observe it.
	    var prevShouldObserve = shouldObserve;
	    toggleObserving(true);
	    observe(value);
	    toggleObserving(prevShouldObserve);
	  }
	  {
	    assertProp(prop, key, value, vm, absent);
	  }
	  return value
	}

	/**
	 * Get the default value of a prop.
	 */
	function getPropDefaultValue (vm, prop, key) {
	  // no default, return undefined
	  if (!hasOwn(prop, 'default')) {
	    return undefined
	  }
	  var def = prop.default;
	  // warn against non-factory defaults for Object & Array
	  if (isObject(def)) {
	    warn(
	      'Invalid default value for prop "' + key + '": ' +
	      'Props with type Object/Array must use a factory function ' +
	      'to return the default value.',
	      vm
	    );
	  }
	  // the raw prop value was also undefined from previous render,
	  // return previous default value to avoid unnecessary watcher trigger
	  if (vm && vm.$options.propsData &&
	    vm.$options.propsData[key] === undefined &&
	    vm._props[key] !== undefined
	  ) {
	    return vm._props[key]
	  }
	  // call factory function for non-Function types
	  // a value is Function if its prototype is function even across different execution context
	  return typeof def === 'function' && getType(prop.type) !== 'Function'
	    ? def.call(vm)
	    : def
	}

	/**
	 * Assert whether a prop is valid.
	 */
	function assertProp (
	  prop,
	  name,
	  value,
	  vm,
	  absent
	) {
	  if (prop.required && absent) {
	    warn(
	      'Missing required prop: "' + name + '"',
	      vm
	    );
	    return
	  }
	  if (value == null && !prop.required) {
	    return
	  }
	  var type = prop.type;
	  var valid = !type || type === true;
	  var expectedTypes = [];
	  if (type) {
	    if (!Array.isArray(type)) {
	      type = [type];
	    }
	    for (var i = 0; i < type.length && !valid; i++) {
	      var assertedType = assertType(value, type[i]);
	      expectedTypes.push(assertedType.expectedType || '');
	      valid = assertedType.valid;
	    }
	  }
	  if (!valid) {
	    warn(
	      "Invalid prop: type check failed for prop \"" + name + "\"." +
	      " Expected " + (expectedTypes.map(capitalize).join(', ')) +
	      ", got " + (toRawType(value)) + ".",
	      vm
	    );
	    return
	  }
	  var validator = prop.validator;
	  if (validator) {
	    if (!validator(value)) {
	      warn(
	        'Invalid prop: custom validator check failed for prop "' + name + '".',
	        vm
	      );
	    }
	  }
	}

	var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

	function assertType (value, type) {
	  var valid;
	  var expectedType = getType(type);
	  if (simpleCheckRE.test(expectedType)) {
	    var t = typeof value;
	    valid = t === expectedType.toLowerCase();
	    // for primitive wrapper objects
	    if (!valid && t === 'object') {
	      valid = value instanceof type;
	    }
	  } else if (expectedType === 'Object') {
	    valid = isPlainObject(value);
	  } else if (expectedType === 'Array') {
	    valid = Array.isArray(value);
	  } else {
	    valid = value instanceof type;
	  }
	  return {
	    valid: valid,
	    expectedType: expectedType
	  }
	}

	/**
	 * Use function string name to check built-in types,
	 * because a simple equality check will fail when running
	 * across different vms / iframes.
	 */
	function getType (fn) {
	  var match = fn && fn.toString().match(/^\s*function (\w+)/);
	  return match ? match[1] : ''
	}

	function isSameType (a, b) {
	  return getType(a) === getType(b)
	}

	function getTypeIndex (type, expectedTypes) {
	  if (!Array.isArray(expectedTypes)) {
	    return isSameType(expectedTypes, type) ? 0 : -1
	  }
	  for (var i = 0, len = expectedTypes.length; i < len; i++) {
	    if (isSameType(expectedTypes[i], type)) {
	      return i
	    }
	  }
	  return -1
	}

	/*  */

	function handleError (err, vm, info) {
	  if (vm) {
	    var cur = vm;
	    while ((cur = cur.$parent)) {
	      var hooks = cur.$options.errorCaptured;
	      if (hooks) {
	        for (var i = 0; i < hooks.length; i++) {
	          try {
	            var capture = hooks[i].call(cur, err, vm, info) === false;
	            if (capture) { return }
	          } catch (e) {
	            globalHandleError(e, cur, 'errorCaptured hook');
	          }
	        }
	      }
	    }
	  }
	  globalHandleError(err, vm, info);
	}

	function globalHandleError (err, vm, info) {
	  if (config.errorHandler) {
	    try {
	      return config.errorHandler.call(null, err, vm, info)
	    } catch (e) {
	      logError(e, null, 'config.errorHandler');
	    }
	  }
	  logError(err, vm, info);
	}

	function logError (err, vm, info) {
	  {
	    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
	  }
	  /* istanbul ignore else */
	  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
	    console.error(err);
	  } else {
	    throw err
	  }
	}

	/*  */
	/* globals MessageChannel */

	var callbacks = [];
	var pending = false;

	function flushCallbacks () {
	  pending = false;
	  var copies = callbacks.slice(0);
	  callbacks.length = 0;
	  for (var i = 0; i < copies.length; i++) {
	    copies[i]();
	  }
	}

	// Here we have async deferring wrappers using both microtasks and (macro) tasks.
	// In < 2.4 we used microtasks everywhere, but there are some scenarios where
	// microtasks have too high a priority and fire in between supposedly
	// sequential events (e.g. #4521, #6690) or even between bubbling of the same
	// event (#6566). However, using (macro) tasks everywhere also has subtle problems
	// when state is changed right before repaint (e.g. #6813, out-in transitions).
	// Here we use microtask by default, but expose a way to force (macro) task when
	// needed (e.g. in event handlers attached by v-on).
	var microTimerFunc;
	var macroTimerFunc;
	var useMacroTask = false;

	// Determine (macro) task defer implementation.
	// Technically setImmediate should be the ideal choice, but it's only available
	// in IE. The only polyfill that consistently queues the callback after all DOM
	// events triggered in the same loop is by using MessageChannel.
	/* istanbul ignore if */
	if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
	  macroTimerFunc = function () {
	    setImmediate(flushCallbacks);
	  };
	} else if (typeof MessageChannel !== 'undefined' && (
	  isNative(MessageChannel) ||
	  // PhantomJS
	  MessageChannel.toString() === '[object MessageChannelConstructor]'
	)) {
	  var channel = new MessageChannel();
	  var port = channel.port2;
	  channel.port1.onmessage = flushCallbacks;
	  macroTimerFunc = function () {
	    port.postMessage(1);
	  };
	} else {
	  /* istanbul ignore next */
	  macroTimerFunc = function () {
	    setTimeout(flushCallbacks, 0);
	  };
	}

	// Determine microtask defer implementation.
	/* istanbul ignore next, $flow-disable-line */
	if (typeof Promise !== 'undefined' && isNative(Promise)) {
	  var p = Promise.resolve();
	  microTimerFunc = function () {
	    p.then(flushCallbacks);
	    // in problematic UIWebViews, Promise.then doesn't completely break, but
	    // it can get stuck in a weird state where callbacks are pushed into the
	    // microtask queue but the queue isn't being flushed, until the browser
	    // needs to do some other work, e.g. handle a timer. Therefore we can
	    // "force" the microtask queue to be flushed by adding an empty timer.
	    if (isIOS) { setTimeout(noop); }
	  };
	} else {
	  // fallback to macro
	  microTimerFunc = macroTimerFunc;
	}

	/**
	 * Wrap a function so that if any code inside triggers state change,
	 * the changes are queued using a (macro) task instead of a microtask.
	 */
	function withMacroTask (fn) {
	  return fn._withTask || (fn._withTask = function () {
	    useMacroTask = true;
	    var res = fn.apply(null, arguments);
	    useMacroTask = false;
	    return res
	  })
	}

	function nextTick (cb, ctx) {
	  var _resolve;
	  callbacks.push(function () {
	    if (cb) {
	      try {
	        cb.call(ctx);
	      } catch (e) {
	        handleError(e, ctx, 'nextTick');
	      }
	    } else if (_resolve) {
	      _resolve(ctx);
	    }
	  });
	  if (!pending) {
	    pending = true;
	    if (useMacroTask) {
	      macroTimerFunc();
	    } else {
	      microTimerFunc();
	    }
	  }
	  // $flow-disable-line
	  if (!cb && typeof Promise !== 'undefined') {
	    return new Promise(function (resolve) {
	      _resolve = resolve;
	    })
	  }
	}

	/*  */

	/* not type checking this file because flow doesn't play well with Proxy */

	var initProxy;

	{
	  var allowedGlobals = makeMap(
	    'Infinity,undefined,NaN,isFinite,isNaN,' +
	    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
	    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
	    'require' // for Webpack/Browserify
	  );

	  var warnNonPresent = function (target, key) {
	    warn(
	      "Property or method \"" + key + "\" is not defined on the instance but " +
	      'referenced during render. Make sure that this property is reactive, ' +
	      'either in the data option, or for class-based components, by ' +
	      'initializing the property. ' +
	      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
	      target
	    );
	  };

	  var hasProxy =
	    typeof Proxy !== 'undefined' && isNative(Proxy);

	  if (hasProxy) {
	    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
	    config.keyCodes = new Proxy(config.keyCodes, {
	      set: function set (target, key, value) {
	        if (isBuiltInModifier(key)) {
	          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
	          return false
	        } else {
	          target[key] = value;
	          return true
	        }
	      }
	    });
	  }

	  var hasHandler = {
	    has: function has (target, key) {
	      var has = key in target;
	      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
	      if (!has && !isAllowed) {
	        warnNonPresent(target, key);
	      }
	      return has || !isAllowed
	    }
	  };

	  var getHandler = {
	    get: function get (target, key) {
	      if (typeof key === 'string' && !(key in target)) {
	        warnNonPresent(target, key);
	      }
	      return target[key]
	    }
	  };

	  initProxy = function initProxy (vm) {
	    if (hasProxy) {
	      // determine which proxy handler to use
	      var options = vm.$options;
	      var handlers = options.render && options.render._withStripped
	        ? getHandler
	        : hasHandler;
	      vm._renderProxy = new Proxy(vm, handlers);
	    } else {
	      vm._renderProxy = vm;
	    }
	  };
	}

	/*  */

	var seenObjects = new _Set();

	/**
	 * Recursively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 */
	function traverse (val) {
	  _traverse(val, seenObjects);
	  seenObjects.clear();
	}

	function _traverse (val, seen) {
	  var i, keys;
	  var isA = Array.isArray(val);
	  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
	    return
	  }
	  if (val.__ob__) {
	    var depId = val.__ob__.dep.id;
	    if (seen.has(depId)) {
	      return
	    }
	    seen.add(depId);
	  }
	  if (isA) {
	    i = val.length;
	    while (i--) { _traverse(val[i], seen); }
	  } else {
	    keys = Object.keys(val);
	    i = keys.length;
	    while (i--) { _traverse(val[keys[i]], seen); }
	  }
	}

	var mark;
	var measure;

	{
	  var perf = inBrowser && window.performance;
	  /* istanbul ignore if */
	  if (
	    perf &&
	    perf.mark &&
	    perf.measure &&
	    perf.clearMarks &&
	    perf.clearMeasures
	  ) {
	    mark = function (tag) { return perf.mark(tag); };
	    measure = function (name, startTag, endTag) {
	      perf.measure(name, startTag, endTag);
	      perf.clearMarks(startTag);
	      perf.clearMarks(endTag);
	      perf.clearMeasures(name);
	    };
	  }
	}

	/*  */

	var normalizeEvent = cached(function (name) {
	  var passive = name.charAt(0) === '&';
	  name = passive ? name.slice(1) : name;
	  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
	  name = once$$1 ? name.slice(1) : name;
	  var capture = name.charAt(0) === '!';
	  name = capture ? name.slice(1) : name;
	  return {
	    name: name,
	    once: once$$1,
	    capture: capture,
	    passive: passive
	  }
	});

	function createFnInvoker (fns) {
	  function invoker () {
	    var arguments$1 = arguments;

	    var fns = invoker.fns;
	    if (Array.isArray(fns)) {
	      var cloned = fns.slice();
	      for (var i = 0; i < cloned.length; i++) {
	        cloned[i].apply(null, arguments$1);
	      }
	    } else {
	      // return handler return value for single handlers
	      return fns.apply(null, arguments)
	    }
	  }
	  invoker.fns = fns;
	  return invoker
	}

	function updateListeners (
	  on,
	  oldOn,
	  add,
	  remove$$1,
	  vm
	) {
	  var name, def, cur, old, event;
	  for (name in on) {
	    def = cur = on[name];
	    old = oldOn[name];
	    event = normalizeEvent(name);
	    /* istanbul ignore if */
	    if (isUndef(cur)) {
	      warn(
	        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
	        vm
	      );
	    } else if (isUndef(old)) {
	      if (isUndef(cur.fns)) {
	        cur = on[name] = createFnInvoker(cur);
	      }
	      add(event.name, cur, event.once, event.capture, event.passive, event.params);
	    } else if (cur !== old) {
	      old.fns = cur;
	      on[name] = old;
	    }
	  }
	  for (name in oldOn) {
	    if (isUndef(on[name])) {
	      event = normalizeEvent(name);
	      remove$$1(event.name, oldOn[name], event.capture);
	    }
	  }
	}

	/*  */

	function mergeVNodeHook (def, hookKey, hook) {
	  if (def instanceof VNode) {
	    def = def.data.hook || (def.data.hook = {});
	  }
	  var invoker;
	  var oldHook = def[hookKey];

	  function wrappedHook () {
	    hook.apply(this, arguments);
	    // important: remove merged hook to ensure it's called only once
	    // and prevent memory leak
	    remove(invoker.fns, wrappedHook);
	  }

	  if (isUndef(oldHook)) {
	    // no existing hook
	    invoker = createFnInvoker([wrappedHook]);
	  } else {
	    /* istanbul ignore if */
	    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
	      // already a merged invoker
	      invoker = oldHook;
	      invoker.fns.push(wrappedHook);
	    } else {
	      // existing plain hook
	      invoker = createFnInvoker([oldHook, wrappedHook]);
	    }
	  }

	  invoker.merged = true;
	  def[hookKey] = invoker;
	}

	/*  */

	function extractPropsFromVNodeData (
	  data,
	  Ctor,
	  tag
	) {
	  // we are only extracting raw values here.
	  // validation and default values are handled in the child
	  // component itself.
	  var propOptions = Ctor.options.props;
	  if (isUndef(propOptions)) {
	    return
	  }
	  var res = {};
	  var attrs = data.attrs;
	  var props = data.props;
	  if (isDef(attrs) || isDef(props)) {
	    for (var key in propOptions) {
	      var altKey = hyphenate(key);
	      {
	        var keyInLowerCase = key.toLowerCase();
	        if (
	          key !== keyInLowerCase &&
	          attrs && hasOwn(attrs, keyInLowerCase)
	        ) {
	          tip(
	            "Prop \"" + keyInLowerCase + "\" is passed to component " +
	            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
	            " \"" + key + "\". " +
	            "Note that HTML attributes are case-insensitive and camelCased " +
	            "props need to use their kebab-case equivalents when using in-DOM " +
	            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
	          );
	        }
	      }
	      checkProp(res, props, key, altKey, true) ||
	      checkProp(res, attrs, key, altKey, false);
	    }
	  }
	  return res
	}

	function checkProp (
	  res,
	  hash,
	  key,
	  altKey,
	  preserve
	) {
	  if (isDef(hash)) {
	    if (hasOwn(hash, key)) {
	      res[key] = hash[key];
	      if (!preserve) {
	        delete hash[key];
	      }
	      return true
	    } else if (hasOwn(hash, altKey)) {
	      res[key] = hash[altKey];
	      if (!preserve) {
	        delete hash[altKey];
	      }
	      return true
	    }
	  }
	  return false
	}

	/*  */

	// The template compiler attempts to minimize the need for normalization by
	// statically analyzing the template at compile time.
	//
	// For plain HTML markup, normalization can be completely skipped because the
	// generated render function is guaranteed to return Array<VNode>. There are
	// two cases where extra normalization is needed:

	// 1. When the children contains components - because a functional component
	// may return an Array instead of a single root. In this case, just a simple
	// normalization is needed - if any child is an Array, we flatten the whole
	// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
	// because functional components already normalize their own children.
	function simpleNormalizeChildren (children) {
	  for (var i = 0; i < children.length; i++) {
	    if (Array.isArray(children[i])) {
	      return Array.prototype.concat.apply([], children)
	    }
	  }
	  return children
	}

	// 2. When the children contains constructs that always generated nested Arrays,
	// e.g. <template>, <slot>, v-for, or when the children is provided by user
	// with hand-written render functions / JSX. In such cases a full normalization
	// is needed to cater to all possible types of children values.
	function normalizeChildren (children) {
	  return isPrimitive(children)
	    ? [createTextVNode(children)]
	    : Array.isArray(children)
	      ? normalizeArrayChildren(children)
	      : undefined
	}

	function isTextNode (node) {
	  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
	}

	function normalizeArrayChildren (children, nestedIndex) {
	  var res = [];
	  var i, c, lastIndex, last;
	  for (i = 0; i < children.length; i++) {
	    c = children[i];
	    if (isUndef(c) || typeof c === 'boolean') { continue }
	    lastIndex = res.length - 1;
	    last = res[lastIndex];
	    //  nested
	    if (Array.isArray(c)) {
	      if (c.length > 0) {
	        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
	        // merge adjacent text nodes
	        if (isTextNode(c[0]) && isTextNode(last)) {
	          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
	          c.shift();
	        }
	        res.push.apply(res, c);
	      }
	    } else if (isPrimitive(c)) {
	      if (isTextNode(last)) {
	        // merge adjacent text nodes
	        // this is necessary for SSR hydration because text nodes are
	        // essentially merged when rendered to HTML strings
	        res[lastIndex] = createTextVNode(last.text + c);
	      } else if (c !== '') {
	        // convert primitive to vnode
	        res.push(createTextVNode(c));
	      }
	    } else {
	      if (isTextNode(c) && isTextNode(last)) {
	        // merge adjacent text nodes
	        res[lastIndex] = createTextVNode(last.text + c.text);
	      } else {
	        // default key for nested array children (likely generated by v-for)
	        if (isTrue(children._isVList) &&
	          isDef(c.tag) &&
	          isUndef(c.key) &&
	          isDef(nestedIndex)) {
	          c.key = "__vlist" + nestedIndex + "_" + i + "__";
	        }
	        res.push(c);
	      }
	    }
	  }
	  return res
	}

	/*  */

	function ensureCtor (comp, base) {
	  if (
	    comp.__esModule ||
	    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
	  ) {
	    comp = comp.default;
	  }
	  return isObject(comp)
	    ? base.extend(comp)
	    : comp
	}

	function createAsyncPlaceholder (
	  factory,
	  data,
	  context,
	  children,
	  tag
	) {
	  var node = createEmptyVNode();
	  node.asyncFactory = factory;
	  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
	  return node
	}

	function resolveAsyncComponent (
	  factory,
	  baseCtor,
	  context
	) {
	  if (isTrue(factory.error) && isDef(factory.errorComp)) {
	    return factory.errorComp
	  }

	  if (isDef(factory.resolved)) {
	    return factory.resolved
	  }

	  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
	    return factory.loadingComp
	  }

	  if (isDef(factory.contexts)) {
	    // already pending
	    factory.contexts.push(context);
	  } else {
	    var contexts = factory.contexts = [context];
	    var sync = true;

	    var forceRender = function () {
	      for (var i = 0, l = contexts.length; i < l; i++) {
	        contexts[i].$forceUpdate();
	      }
	    };

	    var resolve = once(function (res) {
	      // cache resolved
	      factory.resolved = ensureCtor(res, baseCtor);
	      // invoke callbacks only if this is not a synchronous resolve
	      // (async resolves are shimmed as synchronous during SSR)
	      if (!sync) {
	        forceRender();
	      }
	    });

	    var reject = once(function (reason) {
	      warn(
	        "Failed to resolve async component: " + (String(factory)) +
	        (reason ? ("\nReason: " + reason) : '')
	      );
	      if (isDef(factory.errorComp)) {
	        factory.error = true;
	        forceRender();
	      }
	    });

	    var res = factory(resolve, reject);

	    if (isObject(res)) {
	      if (typeof res.then === 'function') {
	        // () => Promise
	        if (isUndef(factory.resolved)) {
	          res.then(resolve, reject);
	        }
	      } else if (isDef(res.component) && typeof res.component.then === 'function') {
	        res.component.then(resolve, reject);

	        if (isDef(res.error)) {
	          factory.errorComp = ensureCtor(res.error, baseCtor);
	        }

	        if (isDef(res.loading)) {
	          factory.loadingComp = ensureCtor(res.loading, baseCtor);
	          if (res.delay === 0) {
	            factory.loading = true;
	          } else {
	            setTimeout(function () {
	              if (isUndef(factory.resolved) && isUndef(factory.error)) {
	                factory.loading = true;
	                forceRender();
	              }
	            }, res.delay || 200);
	          }
	        }

	        if (isDef(res.timeout)) {
	          setTimeout(function () {
	            if (isUndef(factory.resolved)) {
	              reject(
	                "timeout (" + (res.timeout) + "ms)"
	              );
	            }
	          }, res.timeout);
	        }
	      }
	    }

	    sync = false;
	    // return in case resolved synchronously
	    return factory.loading
	      ? factory.loadingComp
	      : factory.resolved
	  }
	}

	/*  */

	function isAsyncPlaceholder (node) {
	  return node.isComment && node.asyncFactory
	}

	/*  */

	function getFirstComponentChild (children) {
	  if (Array.isArray(children)) {
	    for (var i = 0; i < children.length; i++) {
	      var c = children[i];
	      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
	        return c
	      }
	    }
	  }
	}

	/*  */

	/*  */

	function initEvents (vm) {
	  vm._events = Object.create(null);
	  vm._hasHookEvent = false;
	  // init parent attached events
	  var listeners = vm.$options._parentListeners;
	  if (listeners) {
	    updateComponentListeners(vm, listeners);
	  }
	}

	var target;

	function add (event, fn, once) {
	  if (once) {
	    target.$once(event, fn);
	  } else {
	    target.$on(event, fn);
	  }
	}

	function remove$1 (event, fn) {
	  target.$off(event, fn);
	}

	function updateComponentListeners (
	  vm,
	  listeners,
	  oldListeners
	) {
	  target = vm;
	  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
	  target = undefined;
	}

	function eventsMixin (Vue) {
	  var hookRE = /^hook:/;
	  Vue.prototype.$on = function (event, fn) {
	    var this$1 = this;

	    var vm = this;
	    if (Array.isArray(event)) {
	      for (var i = 0, l = event.length; i < l; i++) {
	        this$1.$on(event[i], fn);
	      }
	    } else {
	      (vm._events[event] || (vm._events[event] = [])).push(fn);
	      // optimize hook:event cost by using a boolean flag marked at registration
	      // instead of a hash lookup
	      if (hookRE.test(event)) {
	        vm._hasHookEvent = true;
	      }
	    }
	    return vm
	  };

	  Vue.prototype.$once = function (event, fn) {
	    var vm = this;
	    function on () {
	      vm.$off(event, on);
	      fn.apply(vm, arguments);
	    }
	    on.fn = fn;
	    vm.$on(event, on);
	    return vm
	  };

	  Vue.prototype.$off = function (event, fn) {
	    var this$1 = this;

	    var vm = this;
	    // all
	    if (!arguments.length) {
	      vm._events = Object.create(null);
	      return vm
	    }
	    // array of events
	    if (Array.isArray(event)) {
	      for (var i = 0, l = event.length; i < l; i++) {
	        this$1.$off(event[i], fn);
	      }
	      return vm
	    }
	    // specific event
	    var cbs = vm._events[event];
	    if (!cbs) {
	      return vm
	    }
	    if (!fn) {
	      vm._events[event] = null;
	      return vm
	    }
	    if (fn) {
	      // specific handler
	      var cb;
	      var i$1 = cbs.length;
	      while (i$1--) {
	        cb = cbs[i$1];
	        if (cb === fn || cb.fn === fn) {
	          cbs.splice(i$1, 1);
	          break
	        }
	      }
	    }
	    return vm
	  };

	  Vue.prototype.$emit = function (event) {
	    var vm = this;
	    {
	      var lowerCaseEvent = event.toLowerCase();
	      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
	        tip(
	          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
	          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
	          "Note that HTML attributes are case-insensitive and you cannot use " +
	          "v-on to listen to camelCase events when using in-DOM templates. " +
	          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
	        );
	      }
	    }
	    var cbs = vm._events[event];
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        try {
	          cbs[i].apply(vm, args);
	        } catch (e) {
	          handleError(e, vm, ("event handler for \"" + event + "\""));
	        }
	      }
	    }
	    return vm
	  };
	}

	/*  */



	/**
	 * Runtime helper for resolving raw children VNodes into a slot object.
	 */
	function resolveSlots (
	  children,
	  context
	) {
	  var slots = {};
	  if (!children) {
	    return slots
	  }
	  for (var i = 0, l = children.length; i < l; i++) {
	    var child = children[i];
	    var data = child.data;
	    // remove slot attribute if the node is resolved as a Vue slot node
	    if (data && data.attrs && data.attrs.slot) {
	      delete data.attrs.slot;
	    }
	    // named slots should only be respected if the vnode was rendered in the
	    // same context.
	    if ((child.context === context || child.fnContext === context) &&
	      data && data.slot != null
	    ) {
	      var name = data.slot;
	      var slot = (slots[name] || (slots[name] = []));
	      if (child.tag === 'template') {
	        slot.push.apply(slot, child.children || []);
	      } else {
	        slot.push(child);
	      }
	    } else {
	      (slots.default || (slots.default = [])).push(child);
	    }
	  }
	  // ignore slots that contains only whitespace
	  for (var name$1 in slots) {
	    if (slots[name$1].every(isWhitespace)) {
	      delete slots[name$1];
	    }
	  }
	  return slots
	}

	function isWhitespace (node) {
	  return (node.isComment && !node.asyncFactory) || node.text === ' '
	}

	function resolveScopedSlots (
	  fns, // see flow/vnode
	  res
	) {
	  res = res || {};
	  for (var i = 0; i < fns.length; i++) {
	    if (Array.isArray(fns[i])) {
	      resolveScopedSlots(fns[i], res);
	    } else {
	      res[fns[i].key] = fns[i].fn;
	    }
	  }
	  return res
	}

	/*  */

	var activeInstance = null;
	var isUpdatingChildComponent = false;

	function initLifecycle (vm) {
	  var options = vm.$options;

	  // locate first non-abstract parent
	  var parent = options.parent;
	  if (parent && !options.abstract) {
	    while (parent.$options.abstract && parent.$parent) {
	      parent = parent.$parent;
	    }
	    parent.$children.push(vm);
	  }

	  vm.$parent = parent;
	  vm.$root = parent ? parent.$root : vm;

	  vm.$children = [];
	  vm.$refs = {};

	  vm._watcher = null;
	  vm._inactive = null;
	  vm._directInactive = false;
	  vm._isMounted = false;
	  vm._isDestroyed = false;
	  vm._isBeingDestroyed = false;
	}

	function lifecycleMixin (Vue) {
	  Vue.prototype._update = function (vnode, hydrating) {
	    var vm = this;
	    if (vm._isMounted) {
	      callHook(vm, 'beforeUpdate');
	    }
	    var prevEl = vm.$el;
	    var prevVnode = vm._vnode;
	    var prevActiveInstance = activeInstance;
	    activeInstance = vm;
	    vm._vnode = vnode;
	    // Vue.prototype.__patch__ is injected in entry points
	    // based on the rendering backend used.
	    if (!prevVnode) {
	      // initial render
	      vm.$el = vm.__patch__(
	        vm.$el, vnode, hydrating, false /* removeOnly */,
	        vm.$options._parentElm,
	        vm.$options._refElm
	      );
	      // no need for the ref nodes after initial patch
	      // this prevents keeping a detached DOM tree in memory (#5851)
	      vm.$options._parentElm = vm.$options._refElm = null;
	    } else {
	      // updates
	      vm.$el = vm.__patch__(prevVnode, vnode);
	    }
	    activeInstance = prevActiveInstance;
	    // update __vue__ reference
	    if (prevEl) {
	      prevEl.__vue__ = null;
	    }
	    if (vm.$el) {
	      vm.$el.__vue__ = vm;
	    }
	    // if parent is an HOC, update its $el as well
	    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
	      vm.$parent.$el = vm.$el;
	    }
	    // updated hook is called by the scheduler to ensure that children are
	    // updated in a parent's updated hook.
	  };

	  Vue.prototype.$forceUpdate = function () {
	    var vm = this;
	    if (vm._watcher) {
	      vm._watcher.update();
	    }
	  };

	  Vue.prototype.$destroy = function () {
	    var vm = this;
	    if (vm._isBeingDestroyed) {
	      return
	    }
	    callHook(vm, 'beforeDestroy');
	    vm._isBeingDestroyed = true;
	    // remove self from parent
	    var parent = vm.$parent;
	    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
	      remove(parent.$children, vm);
	    }
	    // teardown watchers
	    if (vm._watcher) {
	      vm._watcher.teardown();
	    }
	    var i = vm._watchers.length;
	    while (i--) {
	      vm._watchers[i].teardown();
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (vm._data.__ob__) {
	      vm._data.__ob__.vmCount--;
	    }
	    // call the last hook...
	    vm._isDestroyed = true;
	    // invoke destroy hooks on current rendered tree
	    vm.__patch__(vm._vnode, null);
	    // fire destroyed hook
	    callHook(vm, 'destroyed');
	    // turn off all instance listeners.
	    vm.$off();
	    // remove __vue__ reference
	    if (vm.$el) {
	      vm.$el.__vue__ = null;
	    }
	    // release circular reference (#6759)
	    if (vm.$vnode) {
	      vm.$vnode.parent = null;
	    }
	  };
	}

	function mountComponent (
	  vm,
	  el,
	  hydrating
	) {
	  vm.$el = el;
	  if (!vm.$options.render) {
	    vm.$options.render = createEmptyVNode;
	    {
	      /* istanbul ignore if */
	      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
	        vm.$options.el || el) {
	        warn(
	          'You are using the runtime-only build of Vue where the template ' +
	          'compiler is not available. Either pre-compile the templates into ' +
	          'render functions, or use the compiler-included build.',
	          vm
	        );
	      } else {
	        warn(
	          'Failed to mount component: template or render function not defined.',
	          vm
	        );
	      }
	    }
	  }
	  callHook(vm, 'beforeMount');

	  var updateComponent;
	  /* istanbul ignore if */
	  if (config.performance && mark) {
	    updateComponent = function () {
	      var name = vm._name;
	      var id = vm._uid;
	      var startTag = "vue-perf-start:" + id;
	      var endTag = "vue-perf-end:" + id;

	      mark(startTag);
	      var vnode = vm._render();
	      mark(endTag);
	      measure(("vue " + name + " render"), startTag, endTag);

	      mark(startTag);
	      vm._update(vnode, hydrating);
	      mark(endTag);
	      measure(("vue " + name + " patch"), startTag, endTag);
	    };
	  } else {
	    updateComponent = function () {
	      vm._update(vm._render(), hydrating);
	    };
	  }

	  // we set this to vm._watcher inside the watcher's constructor
	  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
	  // component's mounted hook), which relies on vm._watcher being already defined
	  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
	  hydrating = false;

	  // manually mounted instance, call mounted on self
	  // mounted is called for render-created child components in its inserted hook
	  if (vm.$vnode == null) {
	    vm._isMounted = true;
	    callHook(vm, 'mounted');
	  }
	  return vm
	}

	function updateChildComponent (
	  vm,
	  propsData,
	  listeners,
	  parentVnode,
	  renderChildren
	) {
	  {
	    isUpdatingChildComponent = true;
	  }

	  // determine whether component has slot children
	  // we need to do this before overwriting $options._renderChildren
	  var hasChildren = !!(
	    renderChildren ||               // has new static slots
	    vm.$options._renderChildren ||  // has old static slots
	    parentVnode.data.scopedSlots || // has new scoped slots
	    vm.$scopedSlots !== emptyObject // has old scoped slots
	  );

	  vm.$options._parentVnode = parentVnode;
	  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

	  if (vm._vnode) { // update child tree's parent
	    vm._vnode.parent = parentVnode;
	  }
	  vm.$options._renderChildren = renderChildren;

	  // update $attrs and $listeners hash
	  // these are also reactive so they may trigger child update if the child
	  // used them during render
	  vm.$attrs = parentVnode.data.attrs || emptyObject;
	  vm.$listeners = listeners || emptyObject;

	  // update props
	  if (propsData && vm.$options.props) {
	    toggleObserving(false);
	    var props = vm._props;
	    var propKeys = vm.$options._propKeys || [];
	    for (var i = 0; i < propKeys.length; i++) {
	      var key = propKeys[i];
	      var propOptions = vm.$options.props; // wtf flow?
	      props[key] = validateProp(key, propOptions, propsData, vm);
	    }
	    toggleObserving(true);
	    // keep a copy of raw propsData
	    vm.$options.propsData = propsData;
	  }

	  // update listeners
	  listeners = listeners || emptyObject;
	  var oldListeners = vm.$options._parentListeners;
	  vm.$options._parentListeners = listeners;
	  updateComponentListeners(vm, listeners, oldListeners);

	  // resolve slots + force update if has children
	  if (hasChildren) {
	    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
	    vm.$forceUpdate();
	  }

	  {
	    isUpdatingChildComponent = false;
	  }
	}

	function isInInactiveTree (vm) {
	  while (vm && (vm = vm.$parent)) {
	    if (vm._inactive) { return true }
	  }
	  return false
	}

	function activateChildComponent (vm, direct) {
	  if (direct) {
	    vm._directInactive = false;
	    if (isInInactiveTree(vm)) {
	      return
	    }
	  } else if (vm._directInactive) {
	    return
	  }
	  if (vm._inactive || vm._inactive === null) {
	    vm._inactive = false;
	    for (var i = 0; i < vm.$children.length; i++) {
	      activateChildComponent(vm.$children[i]);
	    }
	    callHook(vm, 'activated');
	  }
	}

	function deactivateChildComponent (vm, direct) {
	  if (direct) {
	    vm._directInactive = true;
	    if (isInInactiveTree(vm)) {
	      return
	    }
	  }
	  if (!vm._inactive) {
	    vm._inactive = true;
	    for (var i = 0; i < vm.$children.length; i++) {
	      deactivateChildComponent(vm.$children[i]);
	    }
	    callHook(vm, 'deactivated');
	  }
	}

	function callHook (vm, hook) {
	  // #7573 disable dep collection when invoking lifecycle hooks
	  pushTarget();
	  var handlers = vm.$options[hook];
	  if (handlers) {
	    for (var i = 0, j = handlers.length; i < j; i++) {
	      try {
	        handlers[i].call(vm);
	      } catch (e) {
	        handleError(e, vm, (hook + " hook"));
	      }
	    }
	  }
	  if (vm._hasHookEvent) {
	    vm.$emit('hook:' + hook);
	  }
	  popTarget();
	}

	/*  */


	var MAX_UPDATE_COUNT = 100;

	var queue = [];
	var activatedChildren = [];
	var has = {};
	var circular = {};
	var waiting = false;
	var flushing = false;
	var index = 0;

	/**
	 * Reset the scheduler's state.
	 */
	function resetSchedulerState () {
	  index = queue.length = activatedChildren.length = 0;
	  has = {};
	  {
	    circular = {};
	  }
	  waiting = flushing = false;
	}

	/**
	 * Flush both queues and run the watchers.
	 */
	function flushSchedulerQueue () {
	  flushing = true;
	  var watcher, id;

	  // Sort queue before flush.
	  // This ensures that:
	  // 1. Components are updated from parent to child. (because parent is always
	  //    created before the child)
	  // 2. A component's user watchers are run before its render watcher (because
	  //    user watchers are created before the render watcher)
	  // 3. If a component is destroyed during a parent component's watcher run,
	  //    its watchers can be skipped.
	  queue.sort(function (a, b) { return a.id - b.id; });

	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (index = 0; index < queue.length; index++) {
	    watcher = queue[index];
	    id = watcher.id;
	    has[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if (has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > MAX_UPDATE_COUNT) {
	        warn(
	          'You may have an infinite update loop ' + (
	            watcher.user
	              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
	              : "in a component render function."
	          ),
	          watcher.vm
	        );
	        break
	      }
	    }
	  }

	  // keep copies of post queues before resetting state
	  var activatedQueue = activatedChildren.slice();
	  var updatedQueue = queue.slice();

	  resetSchedulerState();

	  // call component updated and activated hooks
	  callActivatedHooks(activatedQueue);
	  callUpdatedHooks(updatedQueue);

	  // devtool hook
	  /* istanbul ignore if */
	  if (devtools && config.devtools) {
	    devtools.emit('flush');
	  }
	}

	function callUpdatedHooks (queue) {
	  var i = queue.length;
	  while (i--) {
	    var watcher = queue[i];
	    var vm = watcher.vm;
	    if (vm._watcher === watcher && vm._isMounted) {
	      callHook(vm, 'updated');
	    }
	  }
	}

	/**
	 * Queue a kept-alive component that was activated during patch.
	 * The queue will be processed after the entire tree has been patched.
	 */
	function queueActivatedComponent (vm) {
	  // setting _inactive to false here so that a render function can
	  // rely on checking whether it's in an inactive tree (e.g. router-view)
	  vm._inactive = false;
	  activatedChildren.push(vm);
	}

	function callActivatedHooks (queue) {
	  for (var i = 0; i < queue.length; i++) {
	    queue[i]._inactive = true;
	    activateChildComponent(queue[i], true /* true */);
	  }
	}

	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 */
	function queueWatcher (watcher) {
	  var id = watcher.id;
	  if (has[id] == null) {
	    has[id] = true;
	    if (!flushing) {
	      queue.push(watcher);
	    } else {
	      // if already flushing, splice the watcher based on its id
	      // if already past its id, it will be run next immediately.
	      var i = queue.length - 1;
	      while (i > index && queue[i].id > watcher.id) {
	        i--;
	      }
	      queue.splice(i + 1, 0, watcher);
	    }
	    // queue the flush
	    if (!waiting) {
	      waiting = true;
	      nextTick(flushSchedulerQueue);
	    }
	  }
	}

	/*  */

	var uid$1 = 0;

	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 */
	var Watcher = function Watcher (
	  vm,
	  expOrFn,
	  cb,
	  options,
	  isRenderWatcher
	) {
	  this.vm = vm;
	  if (isRenderWatcher) {
	    vm._watcher = this;
	  }
	  vm._watchers.push(this);
	  // options
	  if (options) {
	    this.deep = !!options.deep;
	    this.user = !!options.user;
	    this.lazy = !!options.lazy;
	    this.sync = !!options.sync;
	  } else {
	    this.deep = this.user = this.lazy = this.sync = false;
	  }
	  this.cb = cb;
	  this.id = ++uid$1; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = new _Set();
	  this.newDepIds = new _Set();
	  this.expression = expOrFn.toString();
	  // parse expression for getter
	  if (typeof expOrFn === 'function') {
	    this.getter = expOrFn;
	  } else {
	    this.getter = parsePath(expOrFn);
	    if (!this.getter) {
	      this.getter = function () {};
	      warn(
	        "Failed watching path: \"" + expOrFn + "\" " +
	        'Watcher only accepts simple dot-delimited paths. ' +
	        'For full control, use a function instead.',
	        vm
	      );
	    }
	  }
	  this.value = this.lazy
	    ? undefined
	    : this.get();
	};

	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	Watcher.prototype.get = function get () {
	  pushTarget(this);
	  var value;
	  var vm = this.vm;
	  try {
	    value = this.getter.call(vm, vm);
	  } catch (e) {
	    if (this.user) {
	      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
	    } else {
	      throw e
	    }
	  } finally {
	    // "touch" every property so they are all tracked as
	    // dependencies for deep watching
	    if (this.deep) {
	      traverse(value);
	    }
	    popTarget();
	    this.cleanupDeps();
	  }
	  return value
	};

	/**
	 * Add a dependency to this directive.
	 */
	Watcher.prototype.addDep = function addDep (dep) {
	  var id = dep.id;
	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id);
	    this.newDeps.push(dep);
	    if (!this.depIds.has(id)) {
	      dep.addSub(this);
	    }
	  }
	};

	/**
	 * Clean up for dependency collection.
	 */
	Watcher.prototype.cleanupDeps = function cleanupDeps () {
	    var this$1 = this;

	  var i = this.deps.length;
	  while (i--) {
	    var dep = this$1.deps[i];
	    if (!this$1.newDepIds.has(dep.id)) {
	      dep.removeSub(this$1);
	    }
	  }
	  var tmp = this.depIds;
	  this.depIds = this.newDepIds;
	  this.newDepIds = tmp;
	  this.newDepIds.clear();
	  tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	  this.newDeps.length = 0;
	};

	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 */
	Watcher.prototype.update = function update () {
	  /* istanbul ignore else */
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync) {
	    this.run();
	  } else {
	    queueWatcher(this);
	  }
	};

	/**
	 * Scheduler job interface.
	 * Will be called by the scheduler.
	 */
	Watcher.prototype.run = function run () {
	  if (this.active) {
	    var value = this.get();
	    if (
	      value !== this.value ||
	      // Deep watchers and watchers on Object/Arrays should fire even
	      // when the value is the same, because the value may
	      // have mutated.
	      isObject(value) ||
	      this.deep
	    ) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      if (this.user) {
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	  }
	};

	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */
	Watcher.prototype.evaluate = function evaluate () {
	  this.value = this.get();
	  this.dirty = false;
	};

	/**
	 * Depend on all deps collected by this watcher.
	 */
	Watcher.prototype.depend = function depend () {
	    var this$1 = this;

	  var i = this.deps.length;
	  while (i--) {
	    this$1.deps[i].depend();
	  }
	};

	/**
	 * Remove self from all dependencies' subscriber list.
	 */
	Watcher.prototype.teardown = function teardown () {
	    var this$1 = this;

	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed.
	    if (!this.vm._isBeingDestroyed) {
	      remove(this.vm._watchers, this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this$1.deps[i].removeSub(this$1);
	    }
	    this.active = false;
	  }
	};

	/*  */

	var sharedPropertyDefinition = {
	  enumerable: true,
	  configurable: true,
	  get: noop,
	  set: noop
	};

	function proxy (target, sourceKey, key) {
	  sharedPropertyDefinition.get = function proxyGetter () {
	    return this[sourceKey][key]
	  };
	  sharedPropertyDefinition.set = function proxySetter (val) {
	    this[sourceKey][key] = val;
	  };
	  Object.defineProperty(target, key, sharedPropertyDefinition);
	}

	function initState (vm) {
	  vm._watchers = [];
	  var opts = vm.$options;
	  if (opts.props) { initProps(vm, opts.props); }
	  if (opts.methods) { initMethods(vm, opts.methods); }
	  if (opts.data) {
	    initData(vm);
	  } else {
	    observe(vm._data = {}, true /* asRootData */);
	  }
	  if (opts.computed) { initComputed(vm, opts.computed); }
	  if (opts.watch && opts.watch !== nativeWatch) {
	    initWatch(vm, opts.watch);
	  }
	}

	function initProps (vm, propsOptions) {
	  var propsData = vm.$options.propsData || {};
	  var props = vm._props = {};
	  // cache prop keys so that future props updates can iterate using Array
	  // instead of dynamic object key enumeration.
	  var keys = vm.$options._propKeys = [];
	  var isRoot = !vm.$parent;
	  // root instance props should be converted
	  if (!isRoot) {
	    toggleObserving(false);
	  }
	  var loop = function ( key ) {
	    keys.push(key);
	    var value = validateProp(key, propsOptions, propsData, vm);
	    /* istanbul ignore else */
	    {
	      var hyphenatedKey = hyphenate(key);
	      if (isReservedAttribute(hyphenatedKey) ||
	          config.isReservedAttr(hyphenatedKey)) {
	        warn(
	          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
	          vm
	        );
	      }
	      defineReactive(props, key, value, function () {
	        if (vm.$parent && !isUpdatingChildComponent) {
	          warn(
	            "Avoid mutating a prop directly since the value will be " +
	            "overwritten whenever the parent component re-renders. " +
	            "Instead, use a data or computed property based on the prop's " +
	            "value. Prop being mutated: \"" + key + "\"",
	            vm
	          );
	        }
	      });
	    }
	    // static props are already proxied on the component's prototype
	    // during Vue.extend(). We only need to proxy props defined at
	    // instantiation here.
	    if (!(key in vm)) {
	      proxy(vm, "_props", key);
	    }
	  };

	  for (var key in propsOptions) loop( key );
	  toggleObserving(true);
	}

	function initData (vm) {
	  var data = vm.$options.data;
	  data = vm._data = typeof data === 'function'
	    ? getData(data, vm)
	    : data || {};
	  if (!isPlainObject(data)) {
	    data = {};
	    warn(
	      'data functions should return an object:\n' +
	      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
	      vm
	    );
	  }
	  // proxy data on instance
	  var keys = Object.keys(data);
	  var props = vm.$options.props;
	  var methods = vm.$options.methods;
	  var i = keys.length;
	  while (i--) {
	    var key = keys[i];
	    {
	      if (methods && hasOwn(methods, key)) {
	        warn(
	          ("Method \"" + key + "\" has already been defined as a data property."),
	          vm
	        );
	      }
	    }
	    if (props && hasOwn(props, key)) {
	      warn(
	        "The data property \"" + key + "\" is already declared as a prop. " +
	        "Use prop default value instead.",
	        vm
	      );
	    } else if (!isReserved(key)) {
	      proxy(vm, "_data", key);
	    }
	  }
	  // observe data
	  observe(data, true /* asRootData */);
	}

	function getData (data, vm) {
	  // #7573 disable dep collection when invoking data getters
	  pushTarget();
	  try {
	    return data.call(vm, vm)
	  } catch (e) {
	    handleError(e, vm, "data()");
	    return {}
	  } finally {
	    popTarget();
	  }
	}

	var computedWatcherOptions = { lazy: true };

	function initComputed (vm, computed) {
	  // $flow-disable-line
	  var watchers = vm._computedWatchers = Object.create(null);
	  // computed properties are just getters during SSR
	  var isSSR = isServerRendering();

	  for (var key in computed) {
	    var userDef = computed[key];
	    var getter = typeof userDef === 'function' ? userDef : userDef.get;
	    if (getter == null) {
	      warn(
	        ("Getter is missing for computed property \"" + key + "\"."),
	        vm
	      );
	    }

	    if (!isSSR) {
	      // create internal watcher for the computed property.
	      watchers[key] = new Watcher(
	        vm,
	        getter || noop,
	        noop,
	        computedWatcherOptions
	      );
	    }

	    // component-defined computed properties are already defined on the
	    // component prototype. We only need to define computed properties defined
	    // at instantiation here.
	    if (!(key in vm)) {
	      defineComputed(vm, key, userDef);
	    } else {
	      if (key in vm.$data) {
	        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
	      } else if (vm.$options.props && key in vm.$options.props) {
	        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
	      }
	    }
	  }
	}

	function defineComputed (
	  target,
	  key,
	  userDef
	) {
	  var shouldCache = !isServerRendering();
	  if (typeof userDef === 'function') {
	    sharedPropertyDefinition.get = shouldCache
	      ? createComputedGetter(key)
	      : userDef;
	    sharedPropertyDefinition.set = noop;
	  } else {
	    sharedPropertyDefinition.get = userDef.get
	      ? shouldCache && userDef.cache !== false
	        ? createComputedGetter(key)
	        : userDef.get
	      : noop;
	    sharedPropertyDefinition.set = userDef.set
	      ? userDef.set
	      : noop;
	  }
	  if (sharedPropertyDefinition.set === noop) {
	    sharedPropertyDefinition.set = function () {
	      warn(
	        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
	        this
	      );
	    };
	  }
	  Object.defineProperty(target, key, sharedPropertyDefinition);
	}

	function createComputedGetter (key) {
	  return function computedGetter () {
	    var watcher = this._computedWatchers && this._computedWatchers[key];
	    if (watcher) {
	      if (watcher.dirty) {
	        watcher.evaluate();
	      }
	      if (Dep.target) {
	        watcher.depend();
	      }
	      return watcher.value
	    }
	  }
	}

	function initMethods (vm, methods) {
	  var props = vm.$options.props;
	  for (var key in methods) {
	    {
	      if (methods[key] == null) {
	        warn(
	          "Method \"" + key + "\" has an undefined value in the component definition. " +
	          "Did you reference the function correctly?",
	          vm
	        );
	      }
	      if (props && hasOwn(props, key)) {
	        warn(
	          ("Method \"" + key + "\" has already been defined as a prop."),
	          vm
	        );
	      }
	      if ((key in vm) && isReserved(key)) {
	        warn(
	          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
	          "Avoid defining component methods that start with _ or $."
	        );
	      }
	    }
	    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
	  }
	}

	function initWatch (vm, watch) {
	  for (var key in watch) {
	    var handler = watch[key];
	    if (Array.isArray(handler)) {
	      for (var i = 0; i < handler.length; i++) {
	        createWatcher(vm, key, handler[i]);
	      }
	    } else {
	      createWatcher(vm, key, handler);
	    }
	  }
	}

	function createWatcher (
	  vm,
	  expOrFn,
	  handler,
	  options
	) {
	  if (isPlainObject(handler)) {
	    options = handler;
	    handler = handler.handler;
	  }
	  if (typeof handler === 'string') {
	    handler = vm[handler];
	  }
	  return vm.$watch(expOrFn, handler, options)
	}

	function stateMixin (Vue) {
	  // flow somehow has problems with directly declared definition object
	  // when using Object.defineProperty, so we have to procedurally build up
	  // the object here.
	  var dataDef = {};
	  dataDef.get = function () { return this._data };
	  var propsDef = {};
	  propsDef.get = function () { return this._props };
	  {
	    dataDef.set = function (newData) {
	      warn(
	        'Avoid replacing instance root $data. ' +
	        'Use nested data properties instead.',
	        this
	      );
	    };
	    propsDef.set = function () {
	      warn("$props is readonly.", this);
	    };
	  }
	  Object.defineProperty(Vue.prototype, '$data', dataDef);
	  Object.defineProperty(Vue.prototype, '$props', propsDef);

	  Vue.prototype.$set = set;
	  Vue.prototype.$delete = del;

	  Vue.prototype.$watch = function (
	    expOrFn,
	    cb,
	    options
	  ) {
	    var vm = this;
	    if (isPlainObject(cb)) {
	      return createWatcher(vm, expOrFn, cb, options)
	    }
	    options = options || {};
	    options.user = true;
	    var watcher = new Watcher(vm, expOrFn, cb, options);
	    if (options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn () {
	      watcher.teardown();
	    }
	  };
	}

	/*  */

	function initProvide (vm) {
	  var provide = vm.$options.provide;
	  if (provide) {
	    vm._provided = typeof provide === 'function'
	      ? provide.call(vm)
	      : provide;
	  }
	}

	function initInjections (vm) {
	  var result = resolveInject(vm.$options.inject, vm);
	  if (result) {
	    toggleObserving(false);
	    Object.keys(result).forEach(function (key) {
	      /* istanbul ignore else */
	      {
	        defineReactive(vm, key, result[key], function () {
	          warn(
	            "Avoid mutating an injected value directly since the changes will be " +
	            "overwritten whenever the provided component re-renders. " +
	            "injection being mutated: \"" + key + "\"",
	            vm
	          );
	        });
	      }
	    });
	    toggleObserving(true);
	  }
	}

	function resolveInject (inject, vm) {
	  if (inject) {
	    // inject is :any because flow is not smart enough to figure out cached
	    var result = Object.create(null);
	    var keys = hasSymbol
	      ? Reflect.ownKeys(inject).filter(function (key) {
	        /* istanbul ignore next */
	        return Object.getOwnPropertyDescriptor(inject, key).enumerable
	      })
	      : Object.keys(inject);

	    for (var i = 0; i < keys.length; i++) {
	      var key = keys[i];
	      var provideKey = inject[key].from;
	      var source = vm;
	      while (source) {
	        if (source._provided && hasOwn(source._provided, provideKey)) {
	          result[key] = source._provided[provideKey];
	          break
	        }
	        source = source.$parent;
	      }
	      if (!source) {
	        if ('default' in inject[key]) {
	          var provideDefault = inject[key].default;
	          result[key] = typeof provideDefault === 'function'
	            ? provideDefault.call(vm)
	            : provideDefault;
	        } else {
	          warn(("Injection \"" + key + "\" not found"), vm);
	        }
	      }
	    }
	    return result
	  }
	}

	/*  */

	/**
	 * Runtime helper for rendering v-for lists.
	 */
	function renderList (
	  val,
	  render
	) {
	  var ret, i, l, keys, key;
	  if (Array.isArray(val) || typeof val === 'string') {
	    ret = new Array(val.length);
	    for (i = 0, l = val.length; i < l; i++) {
	      ret[i] = render(val[i], i);
	    }
	  } else if (typeof val === 'number') {
	    ret = new Array(val);
	    for (i = 0; i < val; i++) {
	      ret[i] = render(i + 1, i);
	    }
	  } else if (isObject(val)) {
	    keys = Object.keys(val);
	    ret = new Array(keys.length);
	    for (i = 0, l = keys.length; i < l; i++) {
	      key = keys[i];
	      ret[i] = render(val[key], key, i);
	    }
	  }
	  if (isDef(ret)) {
	    (ret)._isVList = true;
	  }
	  return ret
	}

	/*  */

	/**
	 * Runtime helper for rendering <slot>
	 */
	function renderSlot (
	  name,
	  fallback,
	  props,
	  bindObject
	) {
	  var scopedSlotFn = this.$scopedSlots[name];
	  var nodes;
	  if (scopedSlotFn) { // scoped slot
	    props = props || {};
	    if (bindObject) {
	      if (!isObject(bindObject)) {
	        warn(
	          'slot v-bind without argument expects an Object',
	          this
	        );
	      }
	      props = extend(extend({}, bindObject), props);
	    }
	    nodes = scopedSlotFn(props) || fallback;
	  } else {
	    var slotNodes = this.$slots[name];
	    // warn duplicate slot usage
	    if (slotNodes) {
	      if (slotNodes._rendered) {
	        warn(
	          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
	          "- this will likely cause render errors.",
	          this
	        );
	      }
	      slotNodes._rendered = true;
	    }
	    nodes = slotNodes || fallback;
	  }

	  var target = props && props.slot;
	  if (target) {
	    return this.$createElement('template', { slot: target }, nodes)
	  } else {
	    return nodes
	  }
	}

	/*  */

	/**
	 * Runtime helper for resolving filters
	 */
	function resolveFilter (id) {
	  return resolveAsset(this.$options, 'filters', id, true) || identity
	}

	/*  */

	function isKeyNotMatch (expect, actual) {
	  if (Array.isArray(expect)) {
	    return expect.indexOf(actual) === -1
	  } else {
	    return expect !== actual
	  }
	}

	/**
	 * Runtime helper for checking keyCodes from config.
	 * exposed as Vue.prototype._k
	 * passing in eventKeyName as last argument separately for backwards compat
	 */
	function checkKeyCodes (
	  eventKeyCode,
	  key,
	  builtInKeyCode,
	  eventKeyName,
	  builtInKeyName
	) {
	  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
	  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
	    return isKeyNotMatch(builtInKeyName, eventKeyName)
	  } else if (mappedKeyCode) {
	    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
	  } else if (eventKeyName) {
	    return hyphenate(eventKeyName) !== key
	  }
	}

	/*  */

	/**
	 * Runtime helper for merging v-bind="object" into a VNode's data.
	 */
	function bindObjectProps (
	  data,
	  tag,
	  value,
	  asProp,
	  isSync
	) {
	  if (value) {
	    if (!isObject(value)) {
	      warn(
	        'v-bind without argument expects an Object or Array value',
	        this
	      );
	    } else {
	      if (Array.isArray(value)) {
	        value = toObject(value);
	      }
	      var hash;
	      var loop = function ( key ) {
	        if (
	          key === 'class' ||
	          key === 'style' ||
	          isReservedAttribute(key)
	        ) {
	          hash = data;
	        } else {
	          var type = data.attrs && data.attrs.type;
	          hash = asProp || config.mustUseProp(tag, type, key)
	            ? data.domProps || (data.domProps = {})
	            : data.attrs || (data.attrs = {});
	        }
	        if (!(key in hash)) {
	          hash[key] = value[key];

	          if (isSync) {
	            var on = data.on || (data.on = {});
	            on[("update:" + key)] = function ($event) {
	              value[key] = $event;
	            };
	          }
	        }
	      };

	      for (var key in value) loop( key );
	    }
	  }
	  return data
	}

	/*  */

	/**
	 * Runtime helper for rendering static trees.
	 */
	function renderStatic (
	  index,
	  isInFor
	) {
	  var cached = this._staticTrees || (this._staticTrees = []);
	  var tree = cached[index];
	  // if has already-rendered static tree and not inside v-for,
	  // we can reuse the same tree.
	  if (tree && !isInFor) {
	    return tree
	  }
	  // otherwise, render a fresh tree.
	  tree = cached[index] = this.$options.staticRenderFns[index].call(
	    this._renderProxy,
	    null,
	    this // for render fns generated for functional component templates
	  );
	  markStatic(tree, ("__static__" + index), false);
	  return tree
	}

	/**
	 * Runtime helper for v-once.
	 * Effectively it means marking the node as static with a unique key.
	 */
	function markOnce (
	  tree,
	  index,
	  key
	) {
	  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
	  return tree
	}

	function markStatic (
	  tree,
	  key,
	  isOnce
	) {
	  if (Array.isArray(tree)) {
	    for (var i = 0; i < tree.length; i++) {
	      if (tree[i] && typeof tree[i] !== 'string') {
	        markStaticNode(tree[i], (key + "_" + i), isOnce);
	      }
	    }
	  } else {
	    markStaticNode(tree, key, isOnce);
	  }
	}

	function markStaticNode (node, key, isOnce) {
	  node.isStatic = true;
	  node.key = key;
	  node.isOnce = isOnce;
	}

	/*  */

	function bindObjectListeners (data, value) {
	  if (value) {
	    if (!isPlainObject(value)) {
	      warn(
	        'v-on without argument expects an Object value',
	        this
	      );
	    } else {
	      var on = data.on = data.on ? extend({}, data.on) : {};
	      for (var key in value) {
	        var existing = on[key];
	        var ours = value[key];
	        on[key] = existing ? [].concat(existing, ours) : ours;
	      }
	    }
	  }
	  return data
	}

	/*  */

	function installRenderHelpers (target) {
	  target._o = markOnce;
	  target._n = toNumber;
	  target._s = toString;
	  target._l = renderList;
	  target._t = renderSlot;
	  target._q = looseEqual;
	  target._i = looseIndexOf;
	  target._m = renderStatic;
	  target._f = resolveFilter;
	  target._k = checkKeyCodes;
	  target._b = bindObjectProps;
	  target._v = createTextVNode;
	  target._e = createEmptyVNode;
	  target._u = resolveScopedSlots;
	  target._g = bindObjectListeners;
	}

	/*  */

	function FunctionalRenderContext (
	  data,
	  props,
	  children,
	  parent,
	  Ctor
	) {
	  var options = Ctor.options;
	  // ensure the createElement function in functional components
	  // gets a unique context - this is necessary for correct named slot check
	  var contextVm;
	  if (hasOwn(parent, '_uid')) {
	    contextVm = Object.create(parent);
	    // $flow-disable-line
	    contextVm._original = parent;
	  } else {
	    // the context vm passed in is a functional context as well.
	    // in this case we want to make sure we are able to get a hold to the
	    // real context instance.
	    contextVm = parent;
	    // $flow-disable-line
	    parent = parent._original;
	  }
	  var isCompiled = isTrue(options._compiled);
	  var needNormalization = !isCompiled;

	  this.data = data;
	  this.props = props;
	  this.children = children;
	  this.parent = parent;
	  this.listeners = data.on || emptyObject;
	  this.injections = resolveInject(options.inject, parent);
	  this.slots = function () { return resolveSlots(children, parent); };

	  // support for compiled functional template
	  if (isCompiled) {
	    // exposing $options for renderStatic()
	    this.$options = options;
	    // pre-resolve slots for renderSlot()
	    this.$slots = this.slots();
	    this.$scopedSlots = data.scopedSlots || emptyObject;
	  }

	  if (options._scopeId) {
	    this._c = function (a, b, c, d) {
	      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
	      if (vnode && !Array.isArray(vnode)) {
	        vnode.fnScopeId = options._scopeId;
	        vnode.fnContext = parent;
	      }
	      return vnode
	    };
	  } else {
	    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
	  }
	}

	installRenderHelpers(FunctionalRenderContext.prototype);

	function createFunctionalComponent (
	  Ctor,
	  propsData,
	  data,
	  contextVm,
	  children
	) {
	  var options = Ctor.options;
	  var props = {};
	  var propOptions = options.props;
	  if (isDef(propOptions)) {
	    for (var key in propOptions) {
	      props[key] = validateProp(key, propOptions, propsData || emptyObject);
	    }
	  } else {
	    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
	    if (isDef(data.props)) { mergeProps(props, data.props); }
	  }

	  var renderContext = new FunctionalRenderContext(
	    data,
	    props,
	    children,
	    contextVm,
	    Ctor
	  );

	  var vnode = options.render.call(null, renderContext._c, renderContext);

	  if (vnode instanceof VNode) {
	    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options)
	  } else if (Array.isArray(vnode)) {
	    var vnodes = normalizeChildren(vnode) || [];
	    var res = new Array(vnodes.length);
	    for (var i = 0; i < vnodes.length; i++) {
	      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options);
	    }
	    return res
	  }
	}

	function cloneAndMarkFunctionalResult (vnode, data, contextVm, options) {
	  // #7817 clone node before setting fnContext, otherwise if the node is reused
	  // (e.g. it was from a cached normal slot) the fnContext causes named slots
	  // that should not be matched to match.
	  var clone = cloneVNode(vnode);
	  clone.fnContext = contextVm;
	  clone.fnOptions = options;
	  if (data.slot) {
	    (clone.data || (clone.data = {})).slot = data.slot;
	  }
	  return clone
	}

	function mergeProps (to, from) {
	  for (var key in from) {
	    to[camelize(key)] = from[key];
	  }
	}

	/*  */




	// Register the component hook to weex native render engine.
	// The hook will be triggered by native, not javascript.


	// Updates the state of the component to weex native render engine.

	/*  */

	// https://github.com/Hanks10100/weex-native-directive/tree/master/component

	// listening on native callback

	/*  */

	/*  */

	// inline hooks to be invoked on component VNodes during patch
	var componentVNodeHooks = {
	  init: function init (
	    vnode,
	    hydrating,
	    parentElm,
	    refElm
	  ) {
	    if (
	      vnode.componentInstance &&
	      !vnode.componentInstance._isDestroyed &&
	      vnode.data.keepAlive
	    ) {
	      // kept-alive components, treat as a patch
	      var mountedNode = vnode; // work around flow
	      componentVNodeHooks.prepatch(mountedNode, mountedNode);
	    } else {
	      var child = vnode.componentInstance = createComponentInstanceForVnode(
	        vnode,
	        activeInstance,
	        parentElm,
	        refElm
	      );
	      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
	    }
	  },

	  prepatch: function prepatch (oldVnode, vnode) {
	    var options = vnode.componentOptions;
	    var child = vnode.componentInstance = oldVnode.componentInstance;
	    updateChildComponent(
	      child,
	      options.propsData, // updated props
	      options.listeners, // updated listeners
	      vnode, // new parent vnode
	      options.children // new children
	    );
	  },

	  insert: function insert (vnode) {
	    var context = vnode.context;
	    var componentInstance = vnode.componentInstance;
	    if (!componentInstance._isMounted) {
	      componentInstance._isMounted = true;
	      callHook(componentInstance, 'mounted');
	    }
	    if (vnode.data.keepAlive) {
	      if (context._isMounted) {
	        // vue-router#1212
	        // During updates, a kept-alive component's child components may
	        // change, so directly walking the tree here may call activated hooks
	        // on incorrect children. Instead we push them into a queue which will
	        // be processed after the whole patch process ended.
	        queueActivatedComponent(componentInstance);
	      } else {
	        activateChildComponent(componentInstance, true /* direct */);
	      }
	    }
	  },

	  destroy: function destroy (vnode) {
	    var componentInstance = vnode.componentInstance;
	    if (!componentInstance._isDestroyed) {
	      if (!vnode.data.keepAlive) {
	        componentInstance.$destroy();
	      } else {
	        deactivateChildComponent(componentInstance, true /* direct */);
	      }
	    }
	  }
	};

	var hooksToMerge = Object.keys(componentVNodeHooks);

	function createComponent (
	  Ctor,
	  data,
	  context,
	  children,
	  tag
	) {
	  if (isUndef(Ctor)) {
	    return
	  }

	  var baseCtor = context.$options._base;

	  // plain options object: turn it into a constructor
	  if (isObject(Ctor)) {
	    Ctor = baseCtor.extend(Ctor);
	  }

	  // if at this stage it's not a constructor or an async component factory,
	  // reject.
	  if (typeof Ctor !== 'function') {
	    {
	      warn(("Invalid Component definition: " + (String(Ctor))), context);
	    }
	    return
	  }

	  // async component
	  var asyncFactory;
	  if (isUndef(Ctor.cid)) {
	    asyncFactory = Ctor;
	    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
	    if (Ctor === undefined) {
	      // return a placeholder node for async component, which is rendered
	      // as a comment node but preserves all the raw information for the node.
	      // the information will be used for async server-rendering and hydration.
	      return createAsyncPlaceholder(
	        asyncFactory,
	        data,
	        context,
	        children,
	        tag
	      )
	    }
	  }

	  data = data || {};

	  // resolve constructor options in case global mixins are applied after
	  // component constructor creation
	  resolveConstructorOptions(Ctor);

	  // transform component v-model data into props & events
	  if (isDef(data.model)) {
	    transformModel(Ctor.options, data);
	  }

	  // extract props
	  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

	  // functional component
	  if (isTrue(Ctor.options.functional)) {
	    return createFunctionalComponent(Ctor, propsData, data, context, children)
	  }

	  // extract listeners, since these needs to be treated as
	  // child component listeners instead of DOM listeners
	  var listeners = data.on;
	  // replace with listeners with .native modifier
	  // so it gets processed during parent component patch.
	  data.on = data.nativeOn;

	  if (isTrue(Ctor.options.abstract)) {
	    // abstract components do not keep anything
	    // other than props & listeners & slot

	    // work around flow
	    var slot = data.slot;
	    data = {};
	    if (slot) {
	      data.slot = slot;
	    }
	  }

	  // install component management hooks onto the placeholder node
	  installComponentHooks(data);

	  // return a placeholder vnode
	  var name = Ctor.options.name || tag;
	  var vnode = new VNode(
	    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
	    data, undefined, undefined, undefined, context,
	    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
	    asyncFactory
	  );

	  // Weex specific: invoke recycle-list optimized @render function for
	  // extracting cell-slot template.
	  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
	  /* istanbul ignore if */
	  return vnode
	}

	function createComponentInstanceForVnode (
	  vnode, // we know it's MountedComponentVNode but flow doesn't
	  parent, // activeInstance in lifecycle state
	  parentElm,
	  refElm
	) {
	  var options = {
	    _isComponent: true,
	    parent: parent,
	    _parentVnode: vnode,
	    _parentElm: parentElm || null,
	    _refElm: refElm || null
	  };
	  // check inline-template render functions
	  var inlineTemplate = vnode.data.inlineTemplate;
	  if (isDef(inlineTemplate)) {
	    options.render = inlineTemplate.render;
	    options.staticRenderFns = inlineTemplate.staticRenderFns;
	  }
	  return new vnode.componentOptions.Ctor(options)
	}

	function installComponentHooks (data) {
	  var hooks = data.hook || (data.hook = {});
	  for (var i = 0; i < hooksToMerge.length; i++) {
	    var key = hooksToMerge[i];
	    hooks[key] = componentVNodeHooks[key];
	  }
	}

	// transform component v-model info (value and callback) into
	// prop and event handler respectively.
	function transformModel (options, data) {
	  var prop = (options.model && options.model.prop) || 'value';
	  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
	  var on = data.on || (data.on = {});
	  if (isDef(on[event])) {
	    on[event] = [data.model.callback].concat(on[event]);
	  } else {
	    on[event] = data.model.callback;
	  }
	}

	/*  */

	var SIMPLE_NORMALIZE = 1;
	var ALWAYS_NORMALIZE = 2;

	// wrapper function for providing a more flexible interface
	// without getting yelled at by flow
	function createElement (
	  context,
	  tag,
	  data,
	  children,
	  normalizationType,
	  alwaysNormalize
	) {
	  if (Array.isArray(data) || isPrimitive(data)) {
	    normalizationType = children;
	    children = data;
	    data = undefined;
	  }
	  if (isTrue(alwaysNormalize)) {
	    normalizationType = ALWAYS_NORMALIZE;
	  }
	  return _createElement(context, tag, data, children, normalizationType)
	}

	function _createElement (
	  context,
	  tag,
	  data,
	  children,
	  normalizationType
	) {
	  if (isDef(data) && isDef((data).__ob__)) {
	    warn(
	      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
	      'Always create fresh vnode data objects in each render!',
	      context
	    );
	    return createEmptyVNode()
	  }
	  // object syntax in v-bind
	  if (isDef(data) && isDef(data.is)) {
	    tag = data.is;
	  }
	  if (!tag) {
	    // in case of component :is set to falsy value
	    return createEmptyVNode()
	  }
	  // warn against non-primitive key
	  if (isDef(data) && isDef(data.key) && !isPrimitive(data.key)
	  ) {
	    {
	      warn(
	        'Avoid using non-primitive value as key, ' +
	        'use string/number value instead.',
	        context
	      );
	    }
	  }
	  // support single function children as default scoped slot
	  if (Array.isArray(children) &&
	    typeof children[0] === 'function'
	  ) {
	    data = data || {};
	    data.scopedSlots = { default: children[0] };
	    children.length = 0;
	  }
	  if (normalizationType === ALWAYS_NORMALIZE) {
	    children = normalizeChildren(children);
	  } else if (normalizationType === SIMPLE_NORMALIZE) {
	    children = simpleNormalizeChildren(children);
	  }
	  var vnode, ns;
	  if (typeof tag === 'string') {
	    var Ctor;
	    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
	    if (config.isReservedTag(tag)) {
	      // platform built-in elements
	      vnode = new VNode(
	        config.parsePlatformTagName(tag), data, children,
	        undefined, undefined, context
	      );
	    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
	      // component
	      vnode = createComponent(Ctor, data, context, children, tag);
	    } else {
	      // unknown or unlisted namespaced elements
	      // check at runtime because it may get assigned a namespace when its
	      // parent normalizes children
	      vnode = new VNode(
	        tag, data, children,
	        undefined, undefined, context
	      );
	    }
	  } else {
	    // direct component options / constructor
	    vnode = createComponent(tag, data, context, children);
	  }
	  if (Array.isArray(vnode)) {
	    return vnode
	  } else if (isDef(vnode)) {
	    if (isDef(ns)) { applyNS(vnode, ns); }
	    if (isDef(data)) { registerDeepBindings(data); }
	    return vnode
	  } else {
	    return createEmptyVNode()
	  }
	}

	function applyNS (vnode, ns, force) {
	  vnode.ns = ns;
	  if (vnode.tag === 'foreignObject') {
	    // use default namespace inside foreignObject
	    ns = undefined;
	    force = true;
	  }
	  if (isDef(vnode.children)) {
	    for (var i = 0, l = vnode.children.length; i < l; i++) {
	      var child = vnode.children[i];
	      if (isDef(child.tag) && (
	        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
	        applyNS(child, ns, force);
	      }
	    }
	  }
	}

	// ref #5318
	// necessary to ensure parent re-render when deep bindings like :style and
	// :class are used on slot nodes
	function registerDeepBindings (data) {
	  if (isObject(data.style)) {
	    traverse(data.style);
	  }
	  if (isObject(data.class)) {
	    traverse(data.class);
	  }
	}

	/*  */

	function initRender (vm) {
	  vm._vnode = null; // the root of the child tree
	  vm._staticTrees = null; // v-once cached trees
	  var options = vm.$options;
	  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
	  var renderContext = parentVnode && parentVnode.context;
	  vm.$slots = resolveSlots(options._renderChildren, renderContext);
	  vm.$scopedSlots = emptyObject;
	  // bind the createElement fn to this instance
	  // so that we get proper render context inside it.
	  // args order: tag, data, children, normalizationType, alwaysNormalize
	  // internal version is used by render functions compiled from templates
	  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
	  // normalization is always applied for the public version, used in
	  // user-written render functions.
	  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

	  // $attrs & $listeners are exposed for easier HOC creation.
	  // they need to be reactive so that HOCs using them are always updated
	  var parentData = parentVnode && parentVnode.data;

	  /* istanbul ignore else */
	  {
	    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
	      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
	    }, true);
	    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
	      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
	    }, true);
	  }
	}

	function renderMixin (Vue) {
	  // install runtime convenience helpers
	  installRenderHelpers(Vue.prototype);

	  Vue.prototype.$nextTick = function (fn) {
	    return nextTick(fn, this)
	  };

	  Vue.prototype._render = function () {
	    var vm = this;
	    var ref = vm.$options;
	    var render = ref.render;
	    var _parentVnode = ref._parentVnode;

	    // reset _rendered flag on slots for duplicate slot check
	    {
	      for (var key in vm.$slots) {
	        // $flow-disable-line
	        vm.$slots[key]._rendered = false;
	      }
	    }

	    if (_parentVnode) {
	      vm.$scopedSlots = _parentVnode.data.scopedSlots || emptyObject;
	    }

	    // set parent vnode. this allows render functions to have access
	    // to the data on the placeholder node.
	    vm.$vnode = _parentVnode;
	    // render self
	    var vnode;
	    try {
	      vnode = render.call(vm._renderProxy, vm.$createElement);
	    } catch (e) {
	      handleError(e, vm, "render");
	      // return error render result,
	      // or previous vnode to prevent render error causing blank component
	      /* istanbul ignore else */
	      {
	        if (vm.$options.renderError) {
	          try {
	            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
	          } catch (e) {
	            handleError(e, vm, "renderError");
	            vnode = vm._vnode;
	          }
	        } else {
	          vnode = vm._vnode;
	        }
	      }
	    }
	    // return empty vnode in case the render function errored out
	    if (!(vnode instanceof VNode)) {
	      if (Array.isArray(vnode)) {
	        warn(
	          'Multiple root nodes returned from render function. Render function ' +
	          'should return a single root node.',
	          vm
	        );
	      }
	      vnode = createEmptyVNode();
	    }
	    // set parent
	    vnode.parent = _parentVnode;
	    return vnode
	  };
	}

	/*  */

	var uid$3 = 0;

	function initMixin (Vue) {
	  Vue.prototype._init = function (options) {
	    var vm = this;
	    // a uid
	    vm._uid = uid$3++;

	    var startTag, endTag;
	    /* istanbul ignore if */
	    if (config.performance && mark) {
	      startTag = "vue-perf-start:" + (vm._uid);
	      endTag = "vue-perf-end:" + (vm._uid);
	      mark(startTag);
	    }

	    // a flag to avoid this being observed
	    vm._isVue = true;
	    // merge options
	    if (options && options._isComponent) {
	      // optimize internal component instantiation
	      // since dynamic options merging is pretty slow, and none of the
	      // internal component options needs special treatment.
	      initInternalComponent(vm, options);
	    } else {
	      vm.$options = mergeOptions(
	        resolveConstructorOptions(vm.constructor),
	        options || {},
	        vm
	      );
	    }
	    /* istanbul ignore else */
	    {
	      initProxy(vm);
	    }
	    // expose real self
	    vm._self = vm;
	    initLifecycle(vm);
	    initEvents(vm);
	    initRender(vm);
	    callHook(vm, 'beforeCreate');
	    initInjections(vm); // resolve injections before data/props
	    initState(vm);
	    initProvide(vm); // resolve provide after data/props
	    callHook(vm, 'created');

	    /* istanbul ignore if */
	    if (config.performance && mark) {
	      vm._name = formatComponentName(vm, false);
	      mark(endTag);
	      measure(("vue " + (vm._name) + " init"), startTag, endTag);
	    }

	    if (vm.$options.el) {
	      vm.$mount(vm.$options.el);
	    }
	  };
	}

	function initInternalComponent (vm, options) {
	  var opts = vm.$options = Object.create(vm.constructor.options);
	  // doing this because it's faster than dynamic enumeration.
	  var parentVnode = options._parentVnode;
	  opts.parent = options.parent;
	  opts._parentVnode = parentVnode;
	  opts._parentElm = options._parentElm;
	  opts._refElm = options._refElm;

	  var vnodeComponentOptions = parentVnode.componentOptions;
	  opts.propsData = vnodeComponentOptions.propsData;
	  opts._parentListeners = vnodeComponentOptions.listeners;
	  opts._renderChildren = vnodeComponentOptions.children;
	  opts._componentTag = vnodeComponentOptions.tag;

	  if (options.render) {
	    opts.render = options.render;
	    opts.staticRenderFns = options.staticRenderFns;
	  }
	}

	function resolveConstructorOptions (Ctor) {
	  var options = Ctor.options;
	  if (Ctor.super) {
	    var superOptions = resolveConstructorOptions(Ctor.super);
	    var cachedSuperOptions = Ctor.superOptions;
	    if (superOptions !== cachedSuperOptions) {
	      // super option changed,
	      // need to resolve new options.
	      Ctor.superOptions = superOptions;
	      // check if there are any late-modified/attached options (#4976)
	      var modifiedOptions = resolveModifiedOptions(Ctor);
	      // update base extend options
	      if (modifiedOptions) {
	        extend(Ctor.extendOptions, modifiedOptions);
	      }
	      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
	      if (options.name) {
	        options.components[options.name] = Ctor;
	      }
	    }
	  }
	  return options
	}

	function resolveModifiedOptions (Ctor) {
	  var modified;
	  var latest = Ctor.options;
	  var extended = Ctor.extendOptions;
	  var sealed = Ctor.sealedOptions;
	  for (var key in latest) {
	    if (latest[key] !== sealed[key]) {
	      if (!modified) { modified = {}; }
	      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
	    }
	  }
	  return modified
	}

	function dedupe (latest, extended, sealed) {
	  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
	  // between merges
	  if (Array.isArray(latest)) {
	    var res = [];
	    sealed = Array.isArray(sealed) ? sealed : [sealed];
	    extended = Array.isArray(extended) ? extended : [extended];
	    for (var i = 0; i < latest.length; i++) {
	      // push original options and not sealed options to exclude duplicated options
	      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
	        res.push(latest[i]);
	      }
	    }
	    return res
	  } else {
	    return latest
	  }
	}

	function Vue (options) {
	  if (!(this instanceof Vue)
	  ) {
	    warn('Vue is a constructor and should be called with the `new` keyword');
	  }
	  this._init(options);
	}

	initMixin(Vue);
	stateMixin(Vue);
	eventsMixin(Vue);
	lifecycleMixin(Vue);
	renderMixin(Vue);

	/*  */

	function initUse (Vue) {
	  Vue.use = function (plugin) {
	    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
	    if (installedPlugins.indexOf(plugin) > -1) {
	      return this
	    }

	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else if (typeof plugin === 'function') {
	      plugin.apply(null, args);
	    }
	    installedPlugins.push(plugin);
	    return this
	  };
	}

	/*  */

	function initMixin$1 (Vue) {
	  Vue.mixin = function (mixin) {
	    this.options = mergeOptions(this.options, mixin);
	    return this
	  };
	}

	/*  */

	function initExtend (Vue) {
	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */
	  Vue.cid = 0;
	  var cid = 1;

	  /**
	   * Class inheritance
	   */
	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var SuperId = Super.cid;
	    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
	    if (cachedCtors[SuperId]) {
	      return cachedCtors[SuperId]
	    }

	    var name = extendOptions.name || Super.options.name;
	    if (name) {
	      validateComponentName(name);
	    }

	    var Sub = function VueComponent (options) {
	      this._init(options);
	    };
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(
	      Super.options,
	      extendOptions
	    );
	    Sub['super'] = Super;

	    // For props and computed properties, we define the proxy getters on
	    // the Vue instances at extension time, on the extended prototype. This
	    // avoids Object.defineProperty calls for each instance created.
	    if (Sub.options.props) {
	      initProps$1(Sub);
	    }
	    if (Sub.options.computed) {
	      initComputed$1(Sub);
	    }

	    // allow further extension/mixin/plugin usage
	    Sub.extend = Super.extend;
	    Sub.mixin = Super.mixin;
	    Sub.use = Super.use;

	    // create asset registers, so extended classes
	    // can have their private assets too.
	    ASSET_TYPES.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }

	    // keep a reference to the super options at extension time.
	    // later at instantiation we can check if Super's options have
	    // been updated.
	    Sub.superOptions = Super.options;
	    Sub.extendOptions = extendOptions;
	    Sub.sealedOptions = extend({}, Sub.options);

	    // cache constructor
	    cachedCtors[SuperId] = Sub;
	    return Sub
	  };
	}

	function initProps$1 (Comp) {
	  var props = Comp.options.props;
	  for (var key in props) {
	    proxy(Comp.prototype, "_props", key);
	  }
	}

	function initComputed$1 (Comp) {
	  var computed = Comp.options.computed;
	  for (var key in computed) {
	    defineComputed(Comp.prototype, key, computed[key]);
	  }
	}

	/*  */

	function initAssetRegisters (Vue) {
	  /**
	   * Create asset registration methods.
	   */
	  ASSET_TYPES.forEach(function (type) {
	    Vue[type] = function (
	      id,
	      definition
	    ) {
	      if (!definition) {
	        return this.options[type + 's'][id]
	      } else {
	        /* istanbul ignore if */
	        if (type === 'component') {
	          validateComponentName(id);
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          definition.name = definition.name || id;
	          definition = this.options._base.extend(definition);
	        }
	        if (type === 'directive' && typeof definition === 'function') {
	          definition = { bind: definition, update: definition };
	        }
	        this.options[type + 's'][id] = definition;
	        return definition
	      }
	    };
	  });
	}

	/*  */

	function getComponentName (opts) {
	  return opts && (opts.Ctor.options.name || opts.tag)
	}

	function matches (pattern, name) {
	  if (Array.isArray(pattern)) {
	    return pattern.indexOf(name) > -1
	  } else if (typeof pattern === 'string') {
	    return pattern.split(',').indexOf(name) > -1
	  } else if (isRegExp(pattern)) {
	    return pattern.test(name)
	  }
	  /* istanbul ignore next */
	  return false
	}

	function pruneCache (keepAliveInstance, filter) {
	  var cache = keepAliveInstance.cache;
	  var keys = keepAliveInstance.keys;
	  var _vnode = keepAliveInstance._vnode;
	  for (var key in cache) {
	    var cachedNode = cache[key];
	    if (cachedNode) {
	      var name = getComponentName(cachedNode.componentOptions);
	      if (name && !filter(name)) {
	        pruneCacheEntry(cache, key, keys, _vnode);
	      }
	    }
	  }
	}

	function pruneCacheEntry (
	  cache,
	  key,
	  keys,
	  current
	) {
	  var cached$$1 = cache[key];
	  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
	    cached$$1.componentInstance.$destroy();
	  }
	  cache[key] = null;
	  remove(keys, key);
	}

	var patternTypes = [String, RegExp, Array];

	var KeepAlive = {
	  name: 'keep-alive',
	  abstract: true,

	  props: {
	    include: patternTypes,
	    exclude: patternTypes,
	    max: [String, Number]
	  },

	  created: function created () {
	    this.cache = Object.create(null);
	    this.keys = [];
	  },

	  destroyed: function destroyed () {
	    var this$1 = this;

	    for (var key in this$1.cache) {
	      pruneCacheEntry(this$1.cache, key, this$1.keys);
	    }
	  },

	  mounted: function mounted () {
	    var this$1 = this;

	    this.$watch('include', function (val) {
	      pruneCache(this$1, function (name) { return matches(val, name); });
	    });
	    this.$watch('exclude', function (val) {
	      pruneCache(this$1, function (name) { return !matches(val, name); });
	    });
	  },

	  render: function render () {
	    var slot = this.$slots.default;
	    var vnode = getFirstComponentChild(slot);
	    var componentOptions = vnode && vnode.componentOptions;
	    if (componentOptions) {
	      // check pattern
	      var name = getComponentName(componentOptions);
	      var ref = this;
	      var include = ref.include;
	      var exclude = ref.exclude;
	      if (
	        // not included
	        (include && (!name || !matches(include, name))) ||
	        // excluded
	        (exclude && name && matches(exclude, name))
	      ) {
	        return vnode
	      }

	      var ref$1 = this;
	      var cache = ref$1.cache;
	      var keys = ref$1.keys;
	      var key = vnode.key == null
	        // same constructor may get registered as different local components
	        // so cid alone is not enough (#3269)
	        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
	        : vnode.key;
	      if (cache[key]) {
	        vnode.componentInstance = cache[key].componentInstance;
	        // make current key freshest
	        remove(keys, key);
	        keys.push(key);
	      } else {
	        cache[key] = vnode;
	        keys.push(key);
	        // prune oldest entry
	        if (this.max && keys.length > parseInt(this.max)) {
	          pruneCacheEntry(cache, keys[0], keys, this._vnode);
	        }
	      }

	      vnode.data.keepAlive = true;
	    }
	    return vnode || (slot && slot[0])
	  }
	};

	var builtInComponents = {
	  KeepAlive: KeepAlive
	};

	/*  */

	function initGlobalAPI (Vue) {
	  // config
	  var configDef = {};
	  configDef.get = function () { return config; };
	  {
	    configDef.set = function () {
	      warn(
	        'Do not replace the Vue.config object, set individual fields instead.'
	      );
	    };
	  }
	  Object.defineProperty(Vue, 'config', configDef);

	  // exposed util methods.
	  // NOTE: these are not considered part of the public API - avoid relying on
	  // them unless you are aware of the risk.
	  Vue.util = {
	    warn: warn,
	    extend: extend,
	    mergeOptions: mergeOptions,
	    defineReactive: defineReactive
	  };

	  Vue.set = set;
	  Vue.delete = del;
	  Vue.nextTick = nextTick;

	  Vue.options = Object.create(null);
	  ASSET_TYPES.forEach(function (type) {
	    Vue.options[type + 's'] = Object.create(null);
	  });

	  // this is used to identify the "base" constructor to extend all plain-object
	  // components with in Weex's multi-instance scenarios.
	  Vue.options._base = Vue;

	  extend(Vue.options.components, builtInComponents);

	  initUse(Vue);
	  initMixin$1(Vue);
	  initExtend(Vue);
	  initAssetRegisters(Vue);
	}

	initGlobalAPI(Vue);

	Object.defineProperty(Vue.prototype, '$isServer', {
	  get: isServerRendering
	});

	Object.defineProperty(Vue.prototype, '$ssrContext', {
	  get: function get () {
	    /* istanbul ignore next */
	    return this.$vnode && this.$vnode.ssrContext
	  }
	});

	// expose FunctionalRenderContext for ssr runtime helper installation
	Object.defineProperty(Vue, 'FunctionalRenderContext', {
	  value: FunctionalRenderContext
	});

	Vue.version = '2.5.17';

	/*  */

	// these are reserved for web because they are directly compiled away
	// during template compilation
	var isReservedAttr = makeMap('style,class');

	// attributes that should be using props for binding
	var acceptValue = makeMap('input,textarea,option,select,progress');
	var mustUseProp = function (tag, type, attr) {
	  return (
	    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
	    (attr === 'selected' && tag === 'option') ||
	    (attr === 'checked' && tag === 'input') ||
	    (attr === 'muted' && tag === 'video')
	  )
	};

	var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

	var isBooleanAttr = makeMap(
	  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
	  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
	  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
	  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
	  'required,reversed,scoped,seamless,selected,sortable,translate,' +
	  'truespeed,typemustmatch,visible'
	);

	var xlinkNS = 'http://www.w3.org/1999/xlink';

	var isXlink = function (name) {
	  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
	};

	var getXlinkProp = function (name) {
	  return isXlink(name) ? name.slice(6, name.length) : ''
	};

	var isFalsyAttrValue = function (val) {
	  return val == null || val === false
	};

	/*  */

	function genClassForVnode (vnode) {
	  var data = vnode.data;
	  var parentNode = vnode;
	  var childNode = vnode;
	  while (isDef(childNode.componentInstance)) {
	    childNode = childNode.componentInstance._vnode;
	    if (childNode && childNode.data) {
	      data = mergeClassData(childNode.data, data);
	    }
	  }
	  while (isDef(parentNode = parentNode.parent)) {
	    if (parentNode && parentNode.data) {
	      data = mergeClassData(data, parentNode.data);
	    }
	  }
	  return renderClass(data.staticClass, data.class)
	}

	function mergeClassData (child, parent) {
	  return {
	    staticClass: concat(child.staticClass, parent.staticClass),
	    class: isDef(child.class)
	      ? [child.class, parent.class]
	      : parent.class
	  }
	}

	function renderClass (
	  staticClass,
	  dynamicClass
	) {
	  if (isDef(staticClass) || isDef(dynamicClass)) {
	    return concat(staticClass, stringifyClass(dynamicClass))
	  }
	  /* istanbul ignore next */
	  return ''
	}

	function concat (a, b) {
	  return a ? b ? (a + ' ' + b) : a : (b || '')
	}

	function stringifyClass (value) {
	  if (Array.isArray(value)) {
	    return stringifyArray(value)
	  }
	  if (isObject(value)) {
	    return stringifyObject(value)
	  }
	  if (typeof value === 'string') {
	    return value
	  }
	  /* istanbul ignore next */
	  return ''
	}

	function stringifyArray (value) {
	  var res = '';
	  var stringified;
	  for (var i = 0, l = value.length; i < l; i++) {
	    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
	      if (res) { res += ' '; }
	      res += stringified;
	    }
	  }
	  return res
	}

	function stringifyObject (value) {
	  var res = '';
	  for (var key in value) {
	    if (value[key]) {
	      if (res) { res += ' '; }
	      res += key;
	    }
	  }
	  return res
	}

	/*  */

	var namespaceMap = {
	  svg: 'http://www.w3.org/2000/svg',
	  math: 'http://www.w3.org/1998/Math/MathML'
	};

	var isHTMLTag = makeMap(
	  'html,body,base,head,link,meta,style,title,' +
	  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
	  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
	  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
	  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
	  'embed,object,param,source,canvas,script,noscript,del,ins,' +
	  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
	  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
	  'output,progress,select,textarea,' +
	  'details,dialog,menu,menuitem,summary,' +
	  'content,element,shadow,template,blockquote,iframe,tfoot'
	);

	// this map is intentionally selective, only covering SVG elements that may
	// contain child elements.
	var isSVG = makeMap(
	  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
	  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
	  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
	  true
	);



	var isReservedTag = function (tag) {
	  return isHTMLTag(tag) || isSVG(tag)
	};

	function getTagNamespace (tag) {
	  if (isSVG(tag)) {
	    return 'svg'
	  }
	  // basic support for MathML
	  // note it doesn't support other MathML elements being component roots
	  if (tag === 'math') {
	    return 'math'
	  }
	}

	var unknownElementCache = Object.create(null);
	function isUnknownElement (tag) {
	  /* istanbul ignore if */
	  if (!inBrowser) {
	    return true
	  }
	  if (isReservedTag(tag)) {
	    return false
	  }
	  tag = tag.toLowerCase();
	  /* istanbul ignore if */
	  if (unknownElementCache[tag] != null) {
	    return unknownElementCache[tag]
	  }
	  var el = document.createElement(tag);
	  if (tag.indexOf('-') > -1) {
	    // http://stackoverflow.com/a/28210364/1070244
	    return (unknownElementCache[tag] = (
	      el.constructor === window.HTMLUnknownElement ||
	      el.constructor === window.HTMLElement
	    ))
	  } else {
	    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
	  }
	}

	var isTextInputType = makeMap('text,number,password,search,email,tel,url');

	/*  */

	/**
	 * Query an element selector if it's not an element already.
	 */
	function query (el) {
	  if (typeof el === 'string') {
	    var selected = document.querySelector(el);
	    if (!selected) {
	      warn(
	        'Cannot find element: ' + el
	      );
	      return document.createElement('div')
	    }
	    return selected
	  } else {
	    return el
	  }
	}

	/*  */

	function createElement$1 (tagName, vnode) {
	  var elm = document.createElement(tagName);
	  if (tagName !== 'select') {
	    return elm
	  }
	  // false or null will remove the attribute but undefined will not
	  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
	    elm.setAttribute('multiple', 'multiple');
	  }
	  return elm
	}

	function createElementNS (namespace, tagName) {
	  return document.createElementNS(namespaceMap[namespace], tagName)
	}

	function createTextNode (text) {
	  return document.createTextNode(text)
	}

	function createComment (text) {
	  return document.createComment(text)
	}

	function insertBefore (parentNode, newNode, referenceNode) {
	  parentNode.insertBefore(newNode, referenceNode);
	}

	function removeChild (node, child) {
	  node.removeChild(child);
	}

	function appendChild (node, child) {
	  node.appendChild(child);
	}

	function parentNode (node) {
	  return node.parentNode
	}

	function nextSibling (node) {
	  return node.nextSibling
	}

	function tagName (node) {
	  return node.tagName
	}

	function setTextContent (node, text) {
	  node.textContent = text;
	}

	function setStyleScope (node, scopeId) {
	  node.setAttribute(scopeId, '');
	}


	var nodeOps = Object.freeze({
		createElement: createElement$1,
		createElementNS: createElementNS,
		createTextNode: createTextNode,
		createComment: createComment,
		insertBefore: insertBefore,
		removeChild: removeChild,
		appendChild: appendChild,
		parentNode: parentNode,
		nextSibling: nextSibling,
		tagName: tagName,
		setTextContent: setTextContent,
		setStyleScope: setStyleScope
	});

	/*  */

	var ref = {
	  create: function create (_, vnode) {
	    registerRef(vnode);
	  },
	  update: function update (oldVnode, vnode) {
	    if (oldVnode.data.ref !== vnode.data.ref) {
	      registerRef(oldVnode, true);
	      registerRef(vnode);
	    }
	  },
	  destroy: function destroy (vnode) {
	    registerRef(vnode, true);
	  }
	};

	function registerRef (vnode, isRemoval) {
	  var key = vnode.data.ref;
	  if (!isDef(key)) { return }

	  var vm = vnode.context;
	  var ref = vnode.componentInstance || vnode.elm;
	  var refs = vm.$refs;
	  if (isRemoval) {
	    if (Array.isArray(refs[key])) {
	      remove(refs[key], ref);
	    } else if (refs[key] === ref) {
	      refs[key] = undefined;
	    }
	  } else {
	    if (vnode.data.refInFor) {
	      if (!Array.isArray(refs[key])) {
	        refs[key] = [ref];
	      } else if (refs[key].indexOf(ref) < 0) {
	        // $flow-disable-line
	        refs[key].push(ref);
	      }
	    } else {
	      refs[key] = ref;
	    }
	  }
	}

	/**
	 * Virtual DOM patching algorithm based on Snabbdom by
	 * Simon Friis Vindum (@paldepind)
	 * Licensed under the MIT License
	 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
	 *
	 * modified by Evan You (@yyx990803)
	 *
	 * Not type-checking this because this file is perf-critical and the cost
	 * of making flow understand it is not worth it.
	 */

	var emptyNode = new VNode('', {}, []);

	var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

	function sameVnode (a, b) {
	  return (
	    a.key === b.key && (
	      (
	        a.tag === b.tag &&
	        a.isComment === b.isComment &&
	        isDef(a.data) === isDef(b.data) &&
	        sameInputType(a, b)
	      ) || (
	        isTrue(a.isAsyncPlaceholder) &&
	        a.asyncFactory === b.asyncFactory &&
	        isUndef(b.asyncFactory.error)
	      )
	    )
	  )
	}

	function sameInputType (a, b) {
	  if (a.tag !== 'input') { return true }
	  var i;
	  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
	  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
	  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
	}

	function createKeyToOldIdx (children, beginIdx, endIdx) {
	  var i, key;
	  var map = {};
	  for (i = beginIdx; i <= endIdx; ++i) {
	    key = children[i].key;
	    if (isDef(key)) { map[key] = i; }
	  }
	  return map
	}

	function createPatchFunction (backend) {
	  var i, j;
	  var cbs = {};

	  var modules = backend.modules;
	  var nodeOps = backend.nodeOps;

	  for (i = 0; i < hooks.length; ++i) {
	    cbs[hooks[i]] = [];
	    for (j = 0; j < modules.length; ++j) {
	      if (isDef(modules[j][hooks[i]])) {
	        cbs[hooks[i]].push(modules[j][hooks[i]]);
	      }
	    }
	  }

	  function emptyNodeAt (elm) {
	    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
	  }

	  function createRmCb (childElm, listeners) {
	    function remove () {
	      if (--remove.listeners === 0) {
	        removeNode(childElm);
	      }
	    }
	    remove.listeners = listeners;
	    return remove
	  }

	  function removeNode (el) {
	    var parent = nodeOps.parentNode(el);
	    // element may have already been removed due to v-html / v-text
	    if (isDef(parent)) {
	      nodeOps.removeChild(parent, el);
	    }
	  }

	  function isUnknownElement$$1 (vnode, inVPre) {
	    return (
	      !inVPre &&
	      !vnode.ns &&
	      !(
	        config.ignoredElements.length &&
	        config.ignoredElements.some(function (ignore) {
	          return isRegExp(ignore)
	            ? ignore.test(vnode.tag)
	            : ignore === vnode.tag
	        })
	      ) &&
	      config.isUnknownElement(vnode.tag)
	    )
	  }

	  var creatingElmInVPre = 0;

	  function createElm (
	    vnode,
	    insertedVnodeQueue,
	    parentElm,
	    refElm,
	    nested,
	    ownerArray,
	    index
	  ) {
	    if (isDef(vnode.elm) && isDef(ownerArray)) {
	      // This vnode was used in a previous render!
	      // now it's used as a new node, overwriting its elm would cause
	      // potential patch errors down the road when it's used as an insertion
	      // reference node. Instead, we clone the node on-demand before creating
	      // associated DOM element for it.
	      vnode = ownerArray[index] = cloneVNode(vnode);
	    }

	    vnode.isRootInsert = !nested; // for transition enter check
	    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
	      return
	    }

	    var data = vnode.data;
	    var children = vnode.children;
	    var tag = vnode.tag;
	    if (isDef(tag)) {
	      {
	        if (data && data.pre) {
	          creatingElmInVPre++;
	        }
	        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
	          warn(
	            'Unknown custom element: <' + tag + '> - did you ' +
	            'register the component correctly? For recursive components, ' +
	            'make sure to provide the "name" option.',
	            vnode.context
	          );
	        }
	      }

	      vnode.elm = vnode.ns
	        ? nodeOps.createElementNS(vnode.ns, tag)
	        : nodeOps.createElement(tag, vnode);
	      setScope(vnode);

	      /* istanbul ignore if */
	      {
	        createChildren(vnode, children, insertedVnodeQueue);
	        if (isDef(data)) {
	          invokeCreateHooks(vnode, insertedVnodeQueue);
	        }
	        insert(parentElm, vnode.elm, refElm);
	      }

	      if (data && data.pre) {
	        creatingElmInVPre--;
	      }
	    } else if (isTrue(vnode.isComment)) {
	      vnode.elm = nodeOps.createComment(vnode.text);
	      insert(parentElm, vnode.elm, refElm);
	    } else {
	      vnode.elm = nodeOps.createTextNode(vnode.text);
	      insert(parentElm, vnode.elm, refElm);
	    }
	  }

	  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
	    var i = vnode.data;
	    if (isDef(i)) {
	      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
	      if (isDef(i = i.hook) && isDef(i = i.init)) {
	        i(vnode, false /* hydrating */, parentElm, refElm);
	      }
	      // after calling the init hook, if the vnode is a child component
	      // it should've created a child instance and mounted it. the child
	      // component also has set the placeholder vnode's elm.
	      // in that case we can just return the element and be done.
	      if (isDef(vnode.componentInstance)) {
	        initComponent(vnode, insertedVnodeQueue);
	        if (isTrue(isReactivated)) {
	          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
	        }
	        return true
	      }
	    }
	  }

	  function initComponent (vnode, insertedVnodeQueue) {
	    if (isDef(vnode.data.pendingInsert)) {
	      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
	      vnode.data.pendingInsert = null;
	    }
	    vnode.elm = vnode.componentInstance.$el;
	    if (isPatchable(vnode)) {
	      invokeCreateHooks(vnode, insertedVnodeQueue);
	      setScope(vnode);
	    } else {
	      // empty component root.
	      // skip all element-related modules except for ref (#3455)
	      registerRef(vnode);
	      // make sure to invoke the insert hook
	      insertedVnodeQueue.push(vnode);
	    }
	  }

	  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
	    var i;
	    // hack for #4339: a reactivated component with inner transition
	    // does not trigger because the inner node's created hooks are not called
	    // again. It's not ideal to involve module-specific logic in here but
	    // there doesn't seem to be a better way to do it.
	    var innerNode = vnode;
	    while (innerNode.componentInstance) {
	      innerNode = innerNode.componentInstance._vnode;
	      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
	        for (i = 0; i < cbs.activate.length; ++i) {
	          cbs.activate[i](emptyNode, innerNode);
	        }
	        insertedVnodeQueue.push(innerNode);
	        break
	      }
	    }
	    // unlike a newly created component,
	    // a reactivated keep-alive component doesn't insert itself
	    insert(parentElm, vnode.elm, refElm);
	  }

	  function insert (parent, elm, ref$$1) {
	    if (isDef(parent)) {
	      if (isDef(ref$$1)) {
	        if (ref$$1.parentNode === parent) {
	          nodeOps.insertBefore(parent, elm, ref$$1);
	        }
	      } else {
	        nodeOps.appendChild(parent, elm);
	      }
	    }
	  }

	  function createChildren (vnode, children, insertedVnodeQueue) {
	    if (Array.isArray(children)) {
	      {
	        checkDuplicateKeys(children);
	      }
	      for (var i = 0; i < children.length; ++i) {
	        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
	      }
	    } else if (isPrimitive(vnode.text)) {
	      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
	    }
	  }

	  function isPatchable (vnode) {
	    while (vnode.componentInstance) {
	      vnode = vnode.componentInstance._vnode;
	    }
	    return isDef(vnode.tag)
	  }

	  function invokeCreateHooks (vnode, insertedVnodeQueue) {
	    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
	      cbs.create[i$1](emptyNode, vnode);
	    }
	    i = vnode.data.hook; // Reuse variable
	    if (isDef(i)) {
	      if (isDef(i.create)) { i.create(emptyNode, vnode); }
	      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
	    }
	  }

	  // set scope id attribute for scoped CSS.
	  // this is implemented as a special case to avoid the overhead
	  // of going through the normal attribute patching process.
	  function setScope (vnode) {
	    var i;
	    if (isDef(i = vnode.fnScopeId)) {
	      nodeOps.setStyleScope(vnode.elm, i);
	    } else {
	      var ancestor = vnode;
	      while (ancestor) {
	        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
	          nodeOps.setStyleScope(vnode.elm, i);
	        }
	        ancestor = ancestor.parent;
	      }
	    }
	    // for slot content they should also get the scopeId from the host instance.
	    if (isDef(i = activeInstance) &&
	      i !== vnode.context &&
	      i !== vnode.fnContext &&
	      isDef(i = i.$options._scopeId)
	    ) {
	      nodeOps.setStyleScope(vnode.elm, i);
	    }
	  }

	  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
	    }
	  }

	  function invokeDestroyHook (vnode) {
	    var i, j;
	    var data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
	      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
	    }
	    if (isDef(i = vnode.children)) {
	      for (j = 0; j < vnode.children.length; ++j) {
	        invokeDestroyHook(vnode.children[j]);
	      }
	    }
	  }

	  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      var ch = vnodes[startIdx];
	      if (isDef(ch)) {
	        if (isDef(ch.tag)) {
	          removeAndInvokeRemoveHook(ch);
	          invokeDestroyHook(ch);
	        } else { // Text node
	          removeNode(ch.elm);
	        }
	      }
	    }
	  }

	  function removeAndInvokeRemoveHook (vnode, rm) {
	    if (isDef(rm) || isDef(vnode.data)) {
	      var i;
	      var listeners = cbs.remove.length + 1;
	      if (isDef(rm)) {
	        // we have a recursively passed down rm callback
	        // increase the listeners count
	        rm.listeners += listeners;
	      } else {
	        // directly removing
	        rm = createRmCb(vnode.elm, listeners);
	      }
	      // recursively invoke hooks on child component root node
	      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
	        removeAndInvokeRemoveHook(i, rm);
	      }
	      for (i = 0; i < cbs.remove.length; ++i) {
	        cbs.remove[i](vnode, rm);
	      }
	      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
	        i(vnode, rm);
	      } else {
	        rm();
	      }
	    } else {
	      removeNode(vnode.elm);
	    }
	  }

	  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
	    var oldStartIdx = 0;
	    var newStartIdx = 0;
	    var oldEndIdx = oldCh.length - 1;
	    var oldStartVnode = oldCh[0];
	    var oldEndVnode = oldCh[oldEndIdx];
	    var newEndIdx = newCh.length - 1;
	    var newStartVnode = newCh[0];
	    var newEndVnode = newCh[newEndIdx];
	    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

	    // removeOnly is a special flag used only by <transition-group>
	    // to ensure removed elements stay in correct relative positions
	    // during leaving transitions
	    var canMove = !removeOnly;

	    {
	      checkDuplicateKeys(newCh);
	    }

	    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	      if (isUndef(oldStartVnode)) {
	        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
	      } else if (isUndef(oldEndVnode)) {
	        oldEndVnode = oldCh[--oldEndIdx];
	      } else if (sameVnode(oldStartVnode, newStartVnode)) {
	        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
	        oldStartVnode = oldCh[++oldStartIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else if (sameVnode(oldEndVnode, newEndVnode)) {
	        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
	        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
	        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
	        oldStartVnode = oldCh[++oldStartIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
	        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
	        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else {
	        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
	        idxInOld = isDef(newStartVnode.key)
	          ? oldKeyToIdx[newStartVnode.key]
	          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
	        if (isUndef(idxInOld)) { // New element
	          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
	        } else {
	          vnodeToMove = oldCh[idxInOld];
	          if (sameVnode(vnodeToMove, newStartVnode)) {
	            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
	            oldCh[idxInOld] = undefined;
	            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
	          } else {
	            // same key but different element. treat as new element
	            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
	          }
	        }
	        newStartVnode = newCh[++newStartIdx];
	      }
	    }
	    if (oldStartIdx > oldEndIdx) {
	      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
	      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
	    } else if (newStartIdx > newEndIdx) {
	      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
	    }
	  }

	  function checkDuplicateKeys (children) {
	    var seenKeys = {};
	    for (var i = 0; i < children.length; i++) {
	      var vnode = children[i];
	      var key = vnode.key;
	      if (isDef(key)) {
	        if (seenKeys[key]) {
	          warn(
	            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
	            vnode.context
	          );
	        } else {
	          seenKeys[key] = true;
	        }
	      }
	    }
	  }

	  function findIdxInOld (node, oldCh, start, end) {
	    for (var i = start; i < end; i++) {
	      var c = oldCh[i];
	      if (isDef(c) && sameVnode(node, c)) { return i }
	    }
	  }

	  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
	    if (oldVnode === vnode) {
	      return
	    }

	    var elm = vnode.elm = oldVnode.elm;

	    if (isTrue(oldVnode.isAsyncPlaceholder)) {
	      if (isDef(vnode.asyncFactory.resolved)) {
	        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
	      } else {
	        vnode.isAsyncPlaceholder = true;
	      }
	      return
	    }

	    // reuse element for static trees.
	    // note we only do this if the vnode is cloned -
	    // if the new node is not cloned it means the render functions have been
	    // reset by the hot-reload-api and we need to do a proper re-render.
	    if (isTrue(vnode.isStatic) &&
	      isTrue(oldVnode.isStatic) &&
	      vnode.key === oldVnode.key &&
	      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
	    ) {
	      vnode.componentInstance = oldVnode.componentInstance;
	      return
	    }

	    var i;
	    var data = vnode.data;
	    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
	      i(oldVnode, vnode);
	    }

	    var oldCh = oldVnode.children;
	    var ch = vnode.children;
	    if (isDef(data) && isPatchable(vnode)) {
	      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
	      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
	    }
	    if (isUndef(vnode.text)) {
	      if (isDef(oldCh) && isDef(ch)) {
	        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
	      } else if (isDef(ch)) {
	        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
	        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
	      } else if (isDef(oldCh)) {
	        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
	      } else if (isDef(oldVnode.text)) {
	        nodeOps.setTextContent(elm, '');
	      }
	    } else if (oldVnode.text !== vnode.text) {
	      nodeOps.setTextContent(elm, vnode.text);
	    }
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
	    }
	  }

	  function invokeInsertHook (vnode, queue, initial) {
	    // delay insert hooks for component root nodes, invoke them after the
	    // element is really inserted
	    if (isTrue(initial) && isDef(vnode.parent)) {
	      vnode.parent.data.pendingInsert = queue;
	    } else {
	      for (var i = 0; i < queue.length; ++i) {
	        queue[i].data.hook.insert(queue[i]);
	      }
	    }
	  }

	  var hydrationBailed = false;
	  // list of modules that can skip create hook during hydration because they
	  // are already rendered on the client or has no need for initialization
	  // Note: style is excluded because it relies on initial clone for future
	  // deep updates (#7063).
	  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

	  // Note: this is a browser-only function so we can assume elms are DOM nodes.
	  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
	    var i;
	    var tag = vnode.tag;
	    var data = vnode.data;
	    var children = vnode.children;
	    inVPre = inVPre || (data && data.pre);
	    vnode.elm = elm;

	    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
	      vnode.isAsyncPlaceholder = true;
	      return true
	    }
	    // assert node match
	    {
	      if (!assertNodeMatch(elm, vnode, inVPre)) {
	        return false
	      }
	    }
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
	      if (isDef(i = vnode.componentInstance)) {
	        // child component. it should have hydrated its own tree.
	        initComponent(vnode, insertedVnodeQueue);
	        return true
	      }
	    }
	    if (isDef(tag)) {
	      if (isDef(children)) {
	        // empty element, allow client to pick up and populate children
	        if (!elm.hasChildNodes()) {
	          createChildren(vnode, children, insertedVnodeQueue);
	        } else {
	          // v-html and domProps: innerHTML
	          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
	            if (i !== elm.innerHTML) {
	              /* istanbul ignore if */
	              if (typeof console !== 'undefined' &&
	                !hydrationBailed
	              ) {
	                hydrationBailed = true;
	                console.warn('Parent: ', elm);
	                console.warn('server innerHTML: ', i);
	                console.warn('client innerHTML: ', elm.innerHTML);
	              }
	              return false
	            }
	          } else {
	            // iterate and compare children lists
	            var childrenMatch = true;
	            var childNode = elm.firstChild;
	            for (var i$1 = 0; i$1 < children.length; i$1++) {
	              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
	                childrenMatch = false;
	                break
	              }
	              childNode = childNode.nextSibling;
	            }
	            // if childNode is not null, it means the actual childNodes list is
	            // longer than the virtual children list.
	            if (!childrenMatch || childNode) {
	              /* istanbul ignore if */
	              if (typeof console !== 'undefined' &&
	                !hydrationBailed
	              ) {
	                hydrationBailed = true;
	                console.warn('Parent: ', elm);
	                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
	              }
	              return false
	            }
	          }
	        }
	      }
	      if (isDef(data)) {
	        var fullInvoke = false;
	        for (var key in data) {
	          if (!isRenderedModule(key)) {
	            fullInvoke = true;
	            invokeCreateHooks(vnode, insertedVnodeQueue);
	            break
	          }
	        }
	        if (!fullInvoke && data['class']) {
	          // ensure collecting deps for deep class bindings for future updates
	          traverse(data['class']);
	        }
	      }
	    } else if (elm.data !== vnode.text) {
	      elm.data = vnode.text;
	    }
	    return true
	  }

	  function assertNodeMatch (node, vnode, inVPre) {
	    if (isDef(vnode.tag)) {
	      return vnode.tag.indexOf('vue-component') === 0 || (
	        !isUnknownElement$$1(vnode, inVPre) &&
	        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
	      )
	    } else {
	      return node.nodeType === (vnode.isComment ? 8 : 3)
	    }
	  }

	  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
	    if (isUndef(vnode)) {
	      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
	      return
	    }

	    var isInitialPatch = false;
	    var insertedVnodeQueue = [];

	    if (isUndef(oldVnode)) {
	      // empty mount (likely as component), create new root element
	      isInitialPatch = true;
	      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
	    } else {
	      var isRealElement = isDef(oldVnode.nodeType);
	      if (!isRealElement && sameVnode(oldVnode, vnode)) {
	        // patch existing root node
	        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
	      } else {
	        if (isRealElement) {
	          // mounting to a real element
	          // check if this is server-rendered content and if we can perform
	          // a successful hydration.
	          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
	            oldVnode.removeAttribute(SSR_ATTR);
	            hydrating = true;
	          }
	          if (isTrue(hydrating)) {
	            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
	              invokeInsertHook(vnode, insertedVnodeQueue, true);
	              return oldVnode
	            } else {
	              warn(
	                'The client-side rendered virtual DOM tree is not matching ' +
	                'server-rendered content. This is likely caused by incorrect ' +
	                'HTML markup, for example nesting block-level elements inside ' +
	                '<p>, or missing <tbody>. Bailing hydration and performing ' +
	                'full client-side render.'
	              );
	            }
	          }
	          // either not server-rendered, or hydration failed.
	          // create an empty node and replace it
	          oldVnode = emptyNodeAt(oldVnode);
	        }

	        // replacing existing element
	        var oldElm = oldVnode.elm;
	        var parentElm$1 = nodeOps.parentNode(oldElm);

	        // create new node
	        createElm(
	          vnode,
	          insertedVnodeQueue,
	          // extremely rare edge case: do not insert if old element is in a
	          // leaving transition. Only happens when combining transition +
	          // keep-alive + HOCs. (#4590)
	          oldElm._leaveCb ? null : parentElm$1,
	          nodeOps.nextSibling(oldElm)
	        );

	        // update parent placeholder node element, recursively
	        if (isDef(vnode.parent)) {
	          var ancestor = vnode.parent;
	          var patchable = isPatchable(vnode);
	          while (ancestor) {
	            for (var i = 0; i < cbs.destroy.length; ++i) {
	              cbs.destroy[i](ancestor);
	            }
	            ancestor.elm = vnode.elm;
	            if (patchable) {
	              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
	                cbs.create[i$1](emptyNode, ancestor);
	              }
	              // #6513
	              // invoke insert hooks that may have been merged by create hooks.
	              // e.g. for directives that uses the "inserted" hook.
	              var insert = ancestor.data.hook.insert;
	              if (insert.merged) {
	                // start at index 1 to avoid re-invoking component mounted hook
	                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
	                  insert.fns[i$2]();
	                }
	              }
	            } else {
	              registerRef(ancestor);
	            }
	            ancestor = ancestor.parent;
	          }
	        }

	        // destroy old node
	        if (isDef(parentElm$1)) {
	          removeVnodes(parentElm$1, [oldVnode], 0, 0);
	        } else if (isDef(oldVnode.tag)) {
	          invokeDestroyHook(oldVnode);
	        }
	      }
	    }

	    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
	    return vnode.elm
	  }
	}

	/*  */

	var directives = {
	  create: updateDirectives,
	  update: updateDirectives,
	  destroy: function unbindDirectives (vnode) {
	    updateDirectives(vnode, emptyNode);
	  }
	};

	function updateDirectives (oldVnode, vnode) {
	  if (oldVnode.data.directives || vnode.data.directives) {
	    _update(oldVnode, vnode);
	  }
	}

	function _update (oldVnode, vnode) {
	  var isCreate = oldVnode === emptyNode;
	  var isDestroy = vnode === emptyNode;
	  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
	  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

	  var dirsWithInsert = [];
	  var dirsWithPostpatch = [];

	  var key, oldDir, dir;
	  for (key in newDirs) {
	    oldDir = oldDirs[key];
	    dir = newDirs[key];
	    if (!oldDir) {
	      // new directive, bind
	      callHook$1(dir, 'bind', vnode, oldVnode);
	      if (dir.def && dir.def.inserted) {
	        dirsWithInsert.push(dir);
	      }
	    } else {
	      // existing directive, update
	      dir.oldValue = oldDir.value;
	      callHook$1(dir, 'update', vnode, oldVnode);
	      if (dir.def && dir.def.componentUpdated) {
	        dirsWithPostpatch.push(dir);
	      }
	    }
	  }

	  if (dirsWithInsert.length) {
	    var callInsert = function () {
	      for (var i = 0; i < dirsWithInsert.length; i++) {
	        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
	      }
	    };
	    if (isCreate) {
	      mergeVNodeHook(vnode, 'insert', callInsert);
	    } else {
	      callInsert();
	    }
	  }

	  if (dirsWithPostpatch.length) {
	    mergeVNodeHook(vnode, 'postpatch', function () {
	      for (var i = 0; i < dirsWithPostpatch.length; i++) {
	        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
	      }
	    });
	  }

	  if (!isCreate) {
	    for (key in oldDirs) {
	      if (!newDirs[key]) {
	        // no longer present, unbind
	        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
	      }
	    }
	  }
	}

	var emptyModifiers = Object.create(null);

	function normalizeDirectives$1 (
	  dirs,
	  vm
	) {
	  var res = Object.create(null);
	  if (!dirs) {
	    // $flow-disable-line
	    return res
	  }
	  var i, dir;
	  for (i = 0; i < dirs.length; i++) {
	    dir = dirs[i];
	    if (!dir.modifiers) {
	      // $flow-disable-line
	      dir.modifiers = emptyModifiers;
	    }
	    res[getRawDirName(dir)] = dir;
	    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
	  }
	  // $flow-disable-line
	  return res
	}

	function getRawDirName (dir) {
	  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
	}

	function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
	  var fn = dir.def && dir.def[hook];
	  if (fn) {
	    try {
	      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
	    } catch (e) {
	      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
	    }
	  }
	}

	var baseModules = [
	  ref,
	  directives
	];

	/*  */

	function updateAttrs (oldVnode, vnode) {
	  var opts = vnode.componentOptions;
	  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
	    return
	  }
	  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
	    return
	  }
	  var key, cur, old;
	  var elm = vnode.elm;
	  var oldAttrs = oldVnode.data.attrs || {};
	  var attrs = vnode.data.attrs || {};
	  // clone observed objects, as the user probably wants to mutate it
	  if (isDef(attrs.__ob__)) {
	    attrs = vnode.data.attrs = extend({}, attrs);
	  }

	  for (key in attrs) {
	    cur = attrs[key];
	    old = oldAttrs[key];
	    if (old !== cur) {
	      setAttr(elm, key, cur);
	    }
	  }
	  // #4391: in IE9, setting type can reset value for input[type=radio]
	  // #6666: IE/Edge forces progress value down to 1 before setting a max
	  /* istanbul ignore if */
	  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
	    setAttr(elm, 'value', attrs.value);
	  }
	  for (key in oldAttrs) {
	    if (isUndef(attrs[key])) {
	      if (isXlink(key)) {
	        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
	      } else if (!isEnumeratedAttr(key)) {
	        elm.removeAttribute(key);
	      }
	    }
	  }
	}

	function setAttr (el, key, value) {
	  if (el.tagName.indexOf('-') > -1) {
	    baseSetAttr(el, key, value);
	  } else if (isBooleanAttr(key)) {
	    // set attribute for blank value
	    // e.g. <option disabled>Select one</option>
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      // technically allowfullscreen is a boolean attribute for <iframe>,
	      // but Flash expects a value of "true" when used on <embed> tag
	      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
	        ? 'true'
	        : key;
	      el.setAttribute(key, value);
	    }
	  } else if (isEnumeratedAttr(key)) {
	    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
	  } else if (isXlink(key)) {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
	    } else {
	      el.setAttributeNS(xlinkNS, key, value);
	    }
	  } else {
	    baseSetAttr(el, key, value);
	  }
	}

	function baseSetAttr (el, key, value) {
	  if (isFalsyAttrValue(value)) {
	    el.removeAttribute(key);
	  } else {
	    // #7138: IE10 & 11 fires input event when setting placeholder on
	    // <textarea>... block the first input event and remove the blocker
	    // immediately.
	    /* istanbul ignore if */
	    if (
	      isIE && !isIE9 &&
	      el.tagName === 'TEXTAREA' &&
	      key === 'placeholder' && !el.__ieph
	    ) {
	      var blocker = function (e) {
	        e.stopImmediatePropagation();
	        el.removeEventListener('input', blocker);
	      };
	      el.addEventListener('input', blocker);
	      // $flow-disable-line
	      el.__ieph = true; /* IE placeholder patched */
	    }
	    el.setAttribute(key, value);
	  }
	}

	var attrs = {
	  create: updateAttrs,
	  update: updateAttrs
	};

	/*  */

	function updateClass (oldVnode, vnode) {
	  var el = vnode.elm;
	  var data = vnode.data;
	  var oldData = oldVnode.data;
	  if (
	    isUndef(data.staticClass) &&
	    isUndef(data.class) && (
	      isUndef(oldData) || (
	        isUndef(oldData.staticClass) &&
	        isUndef(oldData.class)
	      )
	    )
	  ) {
	    return
	  }

	  var cls = genClassForVnode(vnode);

	  // handle transition classes
	  var transitionClass = el._transitionClasses;
	  if (isDef(transitionClass)) {
	    cls = concat(cls, stringifyClass(transitionClass));
	  }

	  // set the class
	  if (cls !== el._prevClass) {
	    el.setAttribute('class', cls);
	    el._prevClass = cls;
	  }
	}

	var klass = {
	  create: updateClass,
	  update: updateClass
	};

	/*  */

	/*  */









	// add a raw attr (use this in preTransforms)








	// note: this only removes the attr from the Array (attrsList) so that it
	// doesn't get processed by processAttrs.
	// By default it does NOT remove it from the map (attrsMap) because the map is
	// needed during codegen.

	/*  */

	/**
	 * Cross-platform code generation for component v-model
	 */


	/**
	 * Cross-platform codegen helper for generating v-model value assignment code.
	 */

	/*  */

	// in some cases, the event used has to be determined at runtime
	// so we used some reserved tokens during compile.
	var RANGE_TOKEN = '__r';
	var CHECKBOX_RADIO_TOKEN = '__c';

	/*  */

	// normalize v-model event tokens that can only be determined at runtime.
	// it's important to place the event as the first in the array because
	// the whole point is ensuring the v-model callback gets called before
	// user-attached handlers.
	function normalizeEvents (on) {
	  /* istanbul ignore if */
	  if (isDef(on[RANGE_TOKEN])) {
	    // IE input[type=range] only supports `change` event
	    var event = isIE ? 'change' : 'input';
	    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
	    delete on[RANGE_TOKEN];
	  }
	  // This was originally intended to fix #4521 but no longer necessary
	  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
	  /* istanbul ignore if */
	  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
	    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
	    delete on[CHECKBOX_RADIO_TOKEN];
	  }
	}

	var target$1;

	function createOnceHandler (handler, event, capture) {
	  var _target = target$1; // save current target element in closure
	  return function onceHandler () {
	    var res = handler.apply(null, arguments);
	    if (res !== null) {
	      remove$2(event, onceHandler, capture, _target);
	    }
	  }
	}

	function add$1 (
	  event,
	  handler,
	  once$$1,
	  capture,
	  passive
	) {
	  handler = withMacroTask(handler);
	  if (once$$1) { handler = createOnceHandler(handler, event, capture); }
	  target$1.addEventListener(
	    event,
	    handler,
	    supportsPassive
	      ? { capture: capture, passive: passive }
	      : capture
	  );
	}

	function remove$2 (
	  event,
	  handler,
	  capture,
	  _target
	) {
	  (_target || target$1).removeEventListener(
	    event,
	    handler._withTask || handler,
	    capture
	  );
	}

	function updateDOMListeners (oldVnode, vnode) {
	  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
	    return
	  }
	  var on = vnode.data.on || {};
	  var oldOn = oldVnode.data.on || {};
	  target$1 = vnode.elm;
	  normalizeEvents(on);
	  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
	  target$1 = undefined;
	}

	var events = {
	  create: updateDOMListeners,
	  update: updateDOMListeners
	};

	/*  */

	function updateDOMProps (oldVnode, vnode) {
	  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
	    return
	  }
	  var key, cur;
	  var elm = vnode.elm;
	  var oldProps = oldVnode.data.domProps || {};
	  var props = vnode.data.domProps || {};
	  // clone observed objects, as the user probably wants to mutate it
	  if (isDef(props.__ob__)) {
	    props = vnode.data.domProps = extend({}, props);
	  }

	  for (key in oldProps) {
	    if (isUndef(props[key])) {
	      elm[key] = '';
	    }
	  }
	  for (key in props) {
	    cur = props[key];
	    // ignore children if the node has textContent or innerHTML,
	    // as these will throw away existing DOM nodes and cause removal errors
	    // on subsequent patches (#3360)
	    if (key === 'textContent' || key === 'innerHTML') {
	      if (vnode.children) { vnode.children.length = 0; }
	      if (cur === oldProps[key]) { continue }
	      // #6601 work around Chrome version <= 55 bug where single textNode
	      // replaced by innerHTML/textContent retains its parentNode property
	      if (elm.childNodes.length === 1) {
	        elm.removeChild(elm.childNodes[0]);
	      }
	    }

	    if (key === 'value') {
	      // store value as _value as well since
	      // non-string values will be stringified
	      elm._value = cur;
	      // avoid resetting cursor position when value is the same
	      var strCur = isUndef(cur) ? '' : String(cur);
	      if (shouldUpdateValue(elm, strCur)) {
	        elm.value = strCur;
	      }
	    } else {
	      elm[key] = cur;
	    }
	  }
	}

	// check platforms/web/util/attrs.js acceptValue


	function shouldUpdateValue (elm, checkVal) {
	  return (!elm.composing && (
	    elm.tagName === 'OPTION' ||
	    isNotInFocusAndDirty(elm, checkVal) ||
	    isDirtyWithModifiers(elm, checkVal)
	  ))
	}

	function isNotInFocusAndDirty (elm, checkVal) {
	  // return true when textbox (.number and .trim) loses focus and its value is
	  // not equal to the updated value
	  var notInFocus = true;
	  // #6157
	  // work around IE bug when accessing document.activeElement in an iframe
	  try { notInFocus = document.activeElement !== elm; } catch (e) {}
	  return notInFocus && elm.value !== checkVal
	}

	function isDirtyWithModifiers (elm, newVal) {
	  var value = elm.value;
	  var modifiers = elm._vModifiers; // injected by v-model runtime
	  if (isDef(modifiers)) {
	    if (modifiers.lazy) {
	      // inputs with lazy should only be updated when not in focus
	      return false
	    }
	    if (modifiers.number) {
	      return toNumber(value) !== toNumber(newVal)
	    }
	    if (modifiers.trim) {
	      return value.trim() !== newVal.trim()
	    }
	  }
	  return value !== newVal
	}

	var domProps = {
	  create: updateDOMProps,
	  update: updateDOMProps
	};

	/*  */

	var parseStyleText = cached(function (cssText) {
	  var res = {};
	  var listDelimiter = /;(?![^(]*\))/g;
	  var propertyDelimiter = /:(.+)/;
	  cssText.split(listDelimiter).forEach(function (item) {
	    if (item) {
	      var tmp = item.split(propertyDelimiter);
	      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
	    }
	  });
	  return res
	});

	// merge static and dynamic style data on the same vnode
	function normalizeStyleData (data) {
	  var style = normalizeStyleBinding(data.style);
	  // static style is pre-processed into an object during compilation
	  // and is always a fresh object, so it's safe to merge into it
	  return data.staticStyle
	    ? extend(data.staticStyle, style)
	    : style
	}

	// normalize possible array / string values into Object
	function normalizeStyleBinding (bindingStyle) {
	  if (Array.isArray(bindingStyle)) {
	    return toObject(bindingStyle)
	  }
	  if (typeof bindingStyle === 'string') {
	    return parseStyleText(bindingStyle)
	  }
	  return bindingStyle
	}

	/**
	 * parent component style should be after child's
	 * so that parent component's style could override it
	 */
	function getStyle (vnode, checkChild) {
	  var res = {};
	  var styleData;

	  if (checkChild) {
	    var childNode = vnode;
	    while (childNode.componentInstance) {
	      childNode = childNode.componentInstance._vnode;
	      if (
	        childNode && childNode.data &&
	        (styleData = normalizeStyleData(childNode.data))
	      ) {
	        extend(res, styleData);
	      }
	    }
	  }

	  if ((styleData = normalizeStyleData(vnode.data))) {
	    extend(res, styleData);
	  }

	  var parentNode = vnode;
	  while ((parentNode = parentNode.parent)) {
	    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
	      extend(res, styleData);
	    }
	  }
	  return res
	}

	/*  */

	var cssVarRE = /^--/;
	var importantRE = /\s*!important$/;
	var setProp = function (el, name, val) {
	  /* istanbul ignore if */
	  if (cssVarRE.test(name)) {
	    el.style.setProperty(name, val);
	  } else if (importantRE.test(val)) {
	    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
	  } else {
	    var normalizedName = normalize(name);
	    if (Array.isArray(val)) {
	      // Support values array created by autoprefixer, e.g.
	      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
	      // Set them one by one, and the browser will only set those it can recognize
	      for (var i = 0, len = val.length; i < len; i++) {
	        el.style[normalizedName] = val[i];
	      }
	    } else {
	      el.style[normalizedName] = val;
	    }
	  }
	};

	var vendorNames = ['Webkit', 'Moz', 'ms'];

	var emptyStyle;
	var normalize = cached(function (prop) {
	  emptyStyle = emptyStyle || document.createElement('div').style;
	  prop = camelize(prop);
	  if (prop !== 'filter' && (prop in emptyStyle)) {
	    return prop
	  }
	  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
	  for (var i = 0; i < vendorNames.length; i++) {
	    var name = vendorNames[i] + capName;
	    if (name in emptyStyle) {
	      return name
	    }
	  }
	});

	function updateStyle (oldVnode, vnode) {
	  var data = vnode.data;
	  var oldData = oldVnode.data;

	  if (isUndef(data.staticStyle) && isUndef(data.style) &&
	    isUndef(oldData.staticStyle) && isUndef(oldData.style)
	  ) {
	    return
	  }

	  var cur, name;
	  var el = vnode.elm;
	  var oldStaticStyle = oldData.staticStyle;
	  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

	  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
	  var oldStyle = oldStaticStyle || oldStyleBinding;

	  var style = normalizeStyleBinding(vnode.data.style) || {};

	  // store normalized style under a different key for next diff
	  // make sure to clone it if it's reactive, since the user likely wants
	  // to mutate it.
	  vnode.data.normalizedStyle = isDef(style.__ob__)
	    ? extend({}, style)
	    : style;

	  var newStyle = getStyle(vnode, true);

	  for (name in oldStyle) {
	    if (isUndef(newStyle[name])) {
	      setProp(el, name, '');
	    }
	  }
	  for (name in newStyle) {
	    cur = newStyle[name];
	    if (cur !== oldStyle[name]) {
	      // ie9 setting to null has no effect, must use empty string
	      setProp(el, name, cur == null ? '' : cur);
	    }
	  }
	}

	var style = {
	  create: updateStyle,
	  update: updateStyle
	};

	/*  */

	/**
	 * Add class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function addClass (el, cls) {
	  /* istanbul ignore if */
	  if (!cls || !(cls = cls.trim())) {
	    return
	  }

	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
	    } else {
	      el.classList.add(cls);
	    }
	  } else {
	    var cur = " " + (el.getAttribute('class') || '') + " ";
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      el.setAttribute('class', (cur + cls).trim());
	    }
	  }
	}

	/**
	 * Remove class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function removeClass (el, cls) {
	  /* istanbul ignore if */
	  if (!cls || !(cls = cls.trim())) {
	    return
	  }

	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
	    } else {
	      el.classList.remove(cls);
	    }
	    if (!el.classList.length) {
	      el.removeAttribute('class');
	    }
	  } else {
	    var cur = " " + (el.getAttribute('class') || '') + " ";
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    cur = cur.trim();
	    if (cur) {
	      el.setAttribute('class', cur);
	    } else {
	      el.removeAttribute('class');
	    }
	  }
	}

	/*  */

	function resolveTransition (def) {
	  if (!def) {
	    return
	  }
	  /* istanbul ignore else */
	  if (typeof def === 'object') {
	    var res = {};
	    if (def.css !== false) {
	      extend(res, autoCssTransition(def.name || 'v'));
	    }
	    extend(res, def);
	    return res
	  } else if (typeof def === 'string') {
	    return autoCssTransition(def)
	  }
	}

	var autoCssTransition = cached(function (name) {
	  return {
	    enterClass: (name + "-enter"),
	    enterToClass: (name + "-enter-to"),
	    enterActiveClass: (name + "-enter-active"),
	    leaveClass: (name + "-leave"),
	    leaveToClass: (name + "-leave-to"),
	    leaveActiveClass: (name + "-leave-active")
	  }
	});

	var hasTransition = inBrowser && !isIE9;
	var TRANSITION = 'transition';
	var ANIMATION = 'animation';

	// Transition property/event sniffing
	var transitionProp = 'transition';
	var transitionEndEvent = 'transitionend';
	var animationProp = 'animation';
	var animationEndEvent = 'animationend';
	if (hasTransition) {
	  /* istanbul ignore if */
	  if (window.ontransitionend === undefined &&
	    window.onwebkittransitionend !== undefined
	  ) {
	    transitionProp = 'WebkitTransition';
	    transitionEndEvent = 'webkitTransitionEnd';
	  }
	  if (window.onanimationend === undefined &&
	    window.onwebkitanimationend !== undefined
	  ) {
	    animationProp = 'WebkitAnimation';
	    animationEndEvent = 'webkitAnimationEnd';
	  }
	}

	// binding to window is necessary to make hot reload work in IE in strict mode
	var raf = inBrowser
	  ? window.requestAnimationFrame
	    ? window.requestAnimationFrame.bind(window)
	    : setTimeout
	  : /* istanbul ignore next */ function (fn) { return fn(); };

	function nextFrame (fn) {
	  raf(function () {
	    raf(fn);
	  });
	}

	function addTransitionClass (el, cls) {
	  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
	  if (transitionClasses.indexOf(cls) < 0) {
	    transitionClasses.push(cls);
	    addClass(el, cls);
	  }
	}

	function removeTransitionClass (el, cls) {
	  if (el._transitionClasses) {
	    remove(el._transitionClasses, cls);
	  }
	  removeClass(el, cls);
	}

	function whenTransitionEnds (
	  el,
	  expectedType,
	  cb
	) {
	  var ref = getTransitionInfo(el, expectedType);
	  var type = ref.type;
	  var timeout = ref.timeout;
	  var propCount = ref.propCount;
	  if (!type) { return cb() }
	  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
	  var ended = 0;
	  var end = function () {
	    el.removeEventListener(event, onEnd);
	    cb();
	  };
	  var onEnd = function (e) {
	    if (e.target === el) {
	      if (++ended >= propCount) {
	        end();
	      }
	    }
	  };
	  setTimeout(function () {
	    if (ended < propCount) {
	      end();
	    }
	  }, timeout + 1);
	  el.addEventListener(event, onEnd);
	}

	var transformRE = /\b(transform|all)(,|$)/;

	function getTransitionInfo (el, expectedType) {
	  var styles = window.getComputedStyle(el);
	  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
	  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
	  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
	  var animationDelays = styles[animationProp + 'Delay'].split(', ');
	  var animationDurations = styles[animationProp + 'Duration'].split(', ');
	  var animationTimeout = getTimeout(animationDelays, animationDurations);

	  var type;
	  var timeout = 0;
	  var propCount = 0;
	  /* istanbul ignore if */
	  if (expectedType === TRANSITION) {
	    if (transitionTimeout > 0) {
	      type = TRANSITION;
	      timeout = transitionTimeout;
	      propCount = transitionDurations.length;
	    }
	  } else if (expectedType === ANIMATION) {
	    if (animationTimeout > 0) {
	      type = ANIMATION;
	      timeout = animationTimeout;
	      propCount = animationDurations.length;
	    }
	  } else {
	    timeout = Math.max(transitionTimeout, animationTimeout);
	    type = timeout > 0
	      ? transitionTimeout > animationTimeout
	        ? TRANSITION
	        : ANIMATION
	      : null;
	    propCount = type
	      ? type === TRANSITION
	        ? transitionDurations.length
	        : animationDurations.length
	      : 0;
	  }
	  var hasTransform =
	    type === TRANSITION &&
	    transformRE.test(styles[transitionProp + 'Property']);
	  return {
	    type: type,
	    timeout: timeout,
	    propCount: propCount,
	    hasTransform: hasTransform
	  }
	}

	function getTimeout (delays, durations) {
	  /* istanbul ignore next */
	  while (delays.length < durations.length) {
	    delays = delays.concat(delays);
	  }

	  return Math.max.apply(null, durations.map(function (d, i) {
	    return toMs(d) + toMs(delays[i])
	  }))
	}

	function toMs (s) {
	  return Number(s.slice(0, -1)) * 1000
	}

	/*  */

	function enter (vnode, toggleDisplay) {
	  var el = vnode.elm;

	  // call leave callback now
	  if (isDef(el._leaveCb)) {
	    el._leaveCb.cancelled = true;
	    el._leaveCb();
	  }

	  var data = resolveTransition(vnode.data.transition);
	  if (isUndef(data)) {
	    return
	  }

	  /* istanbul ignore if */
	  if (isDef(el._enterCb) || el.nodeType !== 1) {
	    return
	  }

	  var css = data.css;
	  var type = data.type;
	  var enterClass = data.enterClass;
	  var enterToClass = data.enterToClass;
	  var enterActiveClass = data.enterActiveClass;
	  var appearClass = data.appearClass;
	  var appearToClass = data.appearToClass;
	  var appearActiveClass = data.appearActiveClass;
	  var beforeEnter = data.beforeEnter;
	  var enter = data.enter;
	  var afterEnter = data.afterEnter;
	  var enterCancelled = data.enterCancelled;
	  var beforeAppear = data.beforeAppear;
	  var appear = data.appear;
	  var afterAppear = data.afterAppear;
	  var appearCancelled = data.appearCancelled;
	  var duration = data.duration;

	  // activeInstance will always be the <transition> component managing this
	  // transition. One edge case to check is when the <transition> is placed
	  // as the root node of a child component. In that case we need to check
	  // <transition>'s parent for appear check.
	  var context = activeInstance;
	  var transitionNode = activeInstance.$vnode;
	  while (transitionNode && transitionNode.parent) {
	    transitionNode = transitionNode.parent;
	    context = transitionNode.context;
	  }

	  var isAppear = !context._isMounted || !vnode.isRootInsert;

	  if (isAppear && !appear && appear !== '') {
	    return
	  }

	  var startClass = isAppear && appearClass
	    ? appearClass
	    : enterClass;
	  var activeClass = isAppear && appearActiveClass
	    ? appearActiveClass
	    : enterActiveClass;
	  var toClass = isAppear && appearToClass
	    ? appearToClass
	    : enterToClass;

	  var beforeEnterHook = isAppear
	    ? (beforeAppear || beforeEnter)
	    : beforeEnter;
	  var enterHook = isAppear
	    ? (typeof appear === 'function' ? appear : enter)
	    : enter;
	  var afterEnterHook = isAppear
	    ? (afterAppear || afterEnter)
	    : afterEnter;
	  var enterCancelledHook = isAppear
	    ? (appearCancelled || enterCancelled)
	    : enterCancelled;

	  var explicitEnterDuration = toNumber(
	    isObject(duration)
	      ? duration.enter
	      : duration
	  );

	  if (explicitEnterDuration != null) {
	    checkDuration(explicitEnterDuration, 'enter', vnode);
	  }

	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl = getHookArgumentsLength(enterHook);

	  var cb = el._enterCb = once(function () {
	    if (expectsCSS) {
	      removeTransitionClass(el, toClass);
	      removeTransitionClass(el, activeClass);
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, startClass);
	      }
	      enterCancelledHook && enterCancelledHook(el);
	    } else {
	      afterEnterHook && afterEnterHook(el);
	    }
	    el._enterCb = null;
	  });

	  if (!vnode.data.show) {
	    // remove pending leave element on enter by injecting an insert hook
	    mergeVNodeHook(vnode, 'insert', function () {
	      var parent = el.parentNode;
	      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
	      if (pendingNode &&
	        pendingNode.tag === vnode.tag &&
	        pendingNode.elm._leaveCb
	      ) {
	        pendingNode.elm._leaveCb();
	      }
	      enterHook && enterHook(el, cb);
	    });
	  }

	  // start enter transition
	  beforeEnterHook && beforeEnterHook(el);
	  if (expectsCSS) {
	    addTransitionClass(el, startClass);
	    addTransitionClass(el, activeClass);
	    nextFrame(function () {
	      removeTransitionClass(el, startClass);
	      if (!cb.cancelled) {
	        addTransitionClass(el, toClass);
	        if (!userWantsControl) {
	          if (isValidDuration(explicitEnterDuration)) {
	            setTimeout(cb, explicitEnterDuration);
	          } else {
	            whenTransitionEnds(el, type, cb);
	          }
	        }
	      }
	    });
	  }

	  if (vnode.data.show) {
	    toggleDisplay && toggleDisplay();
	    enterHook && enterHook(el, cb);
	  }

	  if (!expectsCSS && !userWantsControl) {
	    cb();
	  }
	}

	function leave (vnode, rm) {
	  var el = vnode.elm;

	  // call enter callback now
	  if (isDef(el._enterCb)) {
	    el._enterCb.cancelled = true;
	    el._enterCb();
	  }

	  var data = resolveTransition(vnode.data.transition);
	  if (isUndef(data) || el.nodeType !== 1) {
	    return rm()
	  }

	  /* istanbul ignore if */
	  if (isDef(el._leaveCb)) {
	    return
	  }

	  var css = data.css;
	  var type = data.type;
	  var leaveClass = data.leaveClass;
	  var leaveToClass = data.leaveToClass;
	  var leaveActiveClass = data.leaveActiveClass;
	  var beforeLeave = data.beforeLeave;
	  var leave = data.leave;
	  var afterLeave = data.afterLeave;
	  var leaveCancelled = data.leaveCancelled;
	  var delayLeave = data.delayLeave;
	  var duration = data.duration;

	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl = getHookArgumentsLength(leave);

	  var explicitLeaveDuration = toNumber(
	    isObject(duration)
	      ? duration.leave
	      : duration
	  );

	  if (isDef(explicitLeaveDuration)) {
	    checkDuration(explicitLeaveDuration, 'leave', vnode);
	  }

	  var cb = el._leaveCb = once(function () {
	    if (el.parentNode && el.parentNode._pending) {
	      el.parentNode._pending[vnode.key] = null;
	    }
	    if (expectsCSS) {
	      removeTransitionClass(el, leaveToClass);
	      removeTransitionClass(el, leaveActiveClass);
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, leaveClass);
	      }
	      leaveCancelled && leaveCancelled(el);
	    } else {
	      rm();
	      afterLeave && afterLeave(el);
	    }
	    el._leaveCb = null;
	  });

	  if (delayLeave) {
	    delayLeave(performLeave);
	  } else {
	    performLeave();
	  }

	  function performLeave () {
	    // the delayed leave may have already been cancelled
	    if (cb.cancelled) {
	      return
	    }
	    // record leaving element
	    if (!vnode.data.show) {
	      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
	    }
	    beforeLeave && beforeLeave(el);
	    if (expectsCSS) {
	      addTransitionClass(el, leaveClass);
	      addTransitionClass(el, leaveActiveClass);
	      nextFrame(function () {
	        removeTransitionClass(el, leaveClass);
	        if (!cb.cancelled) {
	          addTransitionClass(el, leaveToClass);
	          if (!userWantsControl) {
	            if (isValidDuration(explicitLeaveDuration)) {
	              setTimeout(cb, explicitLeaveDuration);
	            } else {
	              whenTransitionEnds(el, type, cb);
	            }
	          }
	        }
	      });
	    }
	    leave && leave(el, cb);
	    if (!expectsCSS && !userWantsControl) {
	      cb();
	    }
	  }
	}

	// only used in dev mode
	function checkDuration (val, name, vnode) {
	  if (typeof val !== 'number') {
	    warn(
	      "<transition> explicit " + name + " duration is not a valid number - " +
	      "got " + (JSON.stringify(val)) + ".",
	      vnode.context
	    );
	  } else if (isNaN(val)) {
	    warn(
	      "<transition> explicit " + name + " duration is NaN - " +
	      'the duration expression might be incorrect.',
	      vnode.context
	    );
	  }
	}

	function isValidDuration (val) {
	  return typeof val === 'number' && !isNaN(val)
	}

	/**
	 * Normalize a transition hook's argument length. The hook may be:
	 * - a merged hook (invoker) with the original in .fns
	 * - a wrapped component method (check ._length)
	 * - a plain function (.length)
	 */
	function getHookArgumentsLength (fn) {
	  if (isUndef(fn)) {
	    return false
	  }
	  var invokerFns = fn.fns;
	  if (isDef(invokerFns)) {
	    // invoker
	    return getHookArgumentsLength(
	      Array.isArray(invokerFns)
	        ? invokerFns[0]
	        : invokerFns
	    )
	  } else {
	    return (fn._length || fn.length) > 1
	  }
	}

	function _enter (_, vnode) {
	  if (vnode.data.show !== true) {
	    enter(vnode);
	  }
	}

	var transition = inBrowser ? {
	  create: _enter,
	  activate: _enter,
	  remove: function remove$$1 (vnode, rm) {
	    /* istanbul ignore else */
	    if (vnode.data.show !== true) {
	      leave(vnode, rm);
	    } else {
	      rm();
	    }
	  }
	} : {};

	var platformModules = [
	  attrs,
	  klass,
	  events,
	  domProps,
	  style,
	  transition
	];

	/*  */

	// the directive module should be applied last, after all
	// built-in modules have been applied.
	var modules = platformModules.concat(baseModules);

	var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

	/**
	 * Not type checking this file because flow doesn't like attaching
	 * properties to Elements.
	 */

	/* istanbul ignore if */
	if (isIE9) {
	  // http://www.matts411.com/post/internet-explorer-9-oninput/
	  document.addEventListener('selectionchange', function () {
	    var el = document.activeElement;
	    if (el && el.vmodel) {
	      trigger(el, 'input');
	    }
	  });
	}

	var directive = {
	  inserted: function inserted (el, binding, vnode, oldVnode) {
	    if (vnode.tag === 'select') {
	      // #6903
	      if (oldVnode.elm && !oldVnode.elm._vOptions) {
	        mergeVNodeHook(vnode, 'postpatch', function () {
	          directive.componentUpdated(el, binding, vnode);
	        });
	      } else {
	        setSelected(el, binding, vnode.context);
	      }
	      el._vOptions = [].map.call(el.options, getValue);
	    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
	      el._vModifiers = binding.modifiers;
	      if (!binding.modifiers.lazy) {
	        el.addEventListener('compositionstart', onCompositionStart);
	        el.addEventListener('compositionend', onCompositionEnd);
	        // Safari < 10.2 & UIWebView doesn't fire compositionend when
	        // switching focus before confirming composition choice
	        // this also fixes the issue where some browsers e.g. iOS Chrome
	        // fires "change" instead of "input" on autocomplete.
	        el.addEventListener('change', onCompositionEnd);
	        /* istanbul ignore if */
	        if (isIE9) {
	          el.vmodel = true;
	        }
	      }
	    }
	  },

	  componentUpdated: function componentUpdated (el, binding, vnode) {
	    if (vnode.tag === 'select') {
	      setSelected(el, binding, vnode.context);
	      // in case the options rendered by v-for have changed,
	      // it's possible that the value is out-of-sync with the rendered options.
	      // detect such cases and filter out values that no longer has a matching
	      // option in the DOM.
	      var prevOptions = el._vOptions;
	      var curOptions = el._vOptions = [].map.call(el.options, getValue);
	      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
	        // trigger change event if
	        // no matching option found for at least one value
	        var needReset = el.multiple
	          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
	          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
	        if (needReset) {
	          trigger(el, 'change');
	        }
	      }
	    }
	  }
	};

	function setSelected (el, binding, vm) {
	  actuallySetSelected(el, binding, vm);
	  /* istanbul ignore if */
	  if (isIE || isEdge) {
	    setTimeout(function () {
	      actuallySetSelected(el, binding, vm);
	    }, 0);
	  }
	}

	function actuallySetSelected (el, binding, vm) {
	  var value = binding.value;
	  var isMultiple = el.multiple;
	  if (isMultiple && !Array.isArray(value)) {
	    warn(
	      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
	      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
	      vm
	    );
	    return
	  }
	  var selected, option;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    option = el.options[i];
	    if (isMultiple) {
	      selected = looseIndexOf(value, getValue(option)) > -1;
	      if (option.selected !== selected) {
	        option.selected = selected;
	      }
	    } else {
	      if (looseEqual(getValue(option), value)) {
	        if (el.selectedIndex !== i) {
	          el.selectedIndex = i;
	        }
	        return
	      }
	    }
	  }
	  if (!isMultiple) {
	    el.selectedIndex = -1;
	  }
	}

	function hasNoMatchingOption (value, options) {
	  return options.every(function (o) { return !looseEqual(o, value); })
	}

	function getValue (option) {
	  return '_value' in option
	    ? option._value
	    : option.value
	}

	function onCompositionStart (e) {
	  e.target.composing = true;
	}

	function onCompositionEnd (e) {
	  // prevent triggering an input event for no reason
	  if (!e.target.composing) { return }
	  e.target.composing = false;
	  trigger(e.target, 'input');
	}

	function trigger (el, type) {
	  var e = document.createEvent('HTMLEvents');
	  e.initEvent(type, true, true);
	  el.dispatchEvent(e);
	}

	/*  */

	// recursively search for possible transition defined inside the component root
	function locateNode (vnode) {
	  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
	    ? locateNode(vnode.componentInstance._vnode)
	    : vnode
	}

	var show = {
	  bind: function bind (el, ref, vnode) {
	    var value = ref.value;

	    vnode = locateNode(vnode);
	    var transition$$1 = vnode.data && vnode.data.transition;
	    var originalDisplay = el.__vOriginalDisplay =
	      el.style.display === 'none' ? '' : el.style.display;
	    if (value && transition$$1) {
	      vnode.data.show = true;
	      enter(vnode, function () {
	        el.style.display = originalDisplay;
	      });
	    } else {
	      el.style.display = value ? originalDisplay : 'none';
	    }
	  },

	  update: function update (el, ref, vnode) {
	    var value = ref.value;
	    var oldValue = ref.oldValue;

	    /* istanbul ignore if */
	    if (!value === !oldValue) { return }
	    vnode = locateNode(vnode);
	    var transition$$1 = vnode.data && vnode.data.transition;
	    if (transition$$1) {
	      vnode.data.show = true;
	      if (value) {
	        enter(vnode, function () {
	          el.style.display = el.__vOriginalDisplay;
	        });
	      } else {
	        leave(vnode, function () {
	          el.style.display = 'none';
	        });
	      }
	    } else {
	      el.style.display = value ? el.__vOriginalDisplay : 'none';
	    }
	  },

	  unbind: function unbind (
	    el,
	    binding,
	    vnode,
	    oldVnode,
	    isDestroy
	  ) {
	    if (!isDestroy) {
	      el.style.display = el.__vOriginalDisplay;
	    }
	  }
	};

	var platformDirectives = {
	  model: directive,
	  show: show
	};

	/*  */

	// Provides transition support for a single element/component.
	// supports transition mode (out-in / in-out)

	var transitionProps = {
	  name: String,
	  appear: Boolean,
	  css: Boolean,
	  mode: String,
	  type: String,
	  enterClass: String,
	  leaveClass: String,
	  enterToClass: String,
	  leaveToClass: String,
	  enterActiveClass: String,
	  leaveActiveClass: String,
	  appearClass: String,
	  appearActiveClass: String,
	  appearToClass: String,
	  duration: [Number, String, Object]
	};

	// in case the child is also an abstract component, e.g. <keep-alive>
	// we want to recursively retrieve the real component to be rendered
	function getRealChild (vnode) {
	  var compOptions = vnode && vnode.componentOptions;
	  if (compOptions && compOptions.Ctor.options.abstract) {
	    return getRealChild(getFirstComponentChild(compOptions.children))
	  } else {
	    return vnode
	  }
	}

	function extractTransitionData (comp) {
	  var data = {};
	  var options = comp.$options;
	  // props
	  for (var key in options.propsData) {
	    data[key] = comp[key];
	  }
	  // events.
	  // extract listeners and pass them directly to the transition methods
	  var listeners = options._parentListeners;
	  for (var key$1 in listeners) {
	    data[camelize(key$1)] = listeners[key$1];
	  }
	  return data
	}

	function placeholder (h, rawChild) {
	  if (/\d-keep-alive$/.test(rawChild.tag)) {
	    return h('keep-alive', {
	      props: rawChild.componentOptions.propsData
	    })
	  }
	}

	function hasParentTransition (vnode) {
	  while ((vnode = vnode.parent)) {
	    if (vnode.data.transition) {
	      return true
	    }
	  }
	}

	function isSameChild (child, oldChild) {
	  return oldChild.key === child.key && oldChild.tag === child.tag
	}

	var Transition = {
	  name: 'transition',
	  props: transitionProps,
	  abstract: true,

	  render: function render (h) {
	    var this$1 = this;

	    var children = this.$slots.default;
	    if (!children) {
	      return
	    }

	    // filter out text nodes (possible whitespaces)
	    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
	    /* istanbul ignore if */
	    if (!children.length) {
	      return
	    }

	    // warn multiple elements
	    if (children.length > 1) {
	      warn(
	        '<transition> can only be used on a single element. Use ' +
	        '<transition-group> for lists.',
	        this.$parent
	      );
	    }

	    var mode = this.mode;

	    // warn invalid mode
	    if (mode && mode !== 'in-out' && mode !== 'out-in'
	    ) {
	      warn(
	        'invalid <transition> mode: ' + mode,
	        this.$parent
	      );
	    }

	    var rawChild = children[0];

	    // if this is a component root node and the component's
	    // parent container node also has transition, skip.
	    if (hasParentTransition(this.$vnode)) {
	      return rawChild
	    }

	    // apply transition data to child
	    // use getRealChild() to ignore abstract components e.g. keep-alive
	    var child = getRealChild(rawChild);
	    /* istanbul ignore if */
	    if (!child) {
	      return rawChild
	    }

	    if (this._leaving) {
	      return placeholder(h, rawChild)
	    }

	    // ensure a key that is unique to the vnode type and to this transition
	    // component instance. This key will be used to remove pending leaving nodes
	    // during entering.
	    var id = "__transition-" + (this._uid) + "-";
	    child.key = child.key == null
	      ? child.isComment
	        ? id + 'comment'
	        : id + child.tag
	      : isPrimitive(child.key)
	        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
	        : child.key;

	    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
	    var oldRawChild = this._vnode;
	    var oldChild = getRealChild(oldRawChild);

	    // mark v-show
	    // so that the transition module can hand over the control to the directive
	    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
	      child.data.show = true;
	    }

	    if (
	      oldChild &&
	      oldChild.data &&
	      !isSameChild(child, oldChild) &&
	      !isAsyncPlaceholder(oldChild) &&
	      // #6687 component root is a comment node
	      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
	    ) {
	      // replace old child transition data with fresh one
	      // important for dynamic transitions!
	      var oldData = oldChild.data.transition = extend({}, data);
	      // handle transition mode
	      if (mode === 'out-in') {
	        // return placeholder node and queue update when leave finishes
	        this._leaving = true;
	        mergeVNodeHook(oldData, 'afterLeave', function () {
	          this$1._leaving = false;
	          this$1.$forceUpdate();
	        });
	        return placeholder(h, rawChild)
	      } else if (mode === 'in-out') {
	        if (isAsyncPlaceholder(child)) {
	          return oldRawChild
	        }
	        var delayedLeave;
	        var performLeave = function () { delayedLeave(); };
	        mergeVNodeHook(data, 'afterEnter', performLeave);
	        mergeVNodeHook(data, 'enterCancelled', performLeave);
	        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
	      }
	    }

	    return rawChild
	  }
	};

	/*  */

	// Provides transition support for list items.
	// supports move transitions using the FLIP technique.

	// Because the vdom's children update algorithm is "unstable" - i.e.
	// it doesn't guarantee the relative positioning of removed elements,
	// we force transition-group to update its children into two passes:
	// in the first pass, we remove all nodes that need to be removed,
	// triggering their leaving transition; in the second pass, we insert/move
	// into the final desired state. This way in the second pass removed
	// nodes will remain where they should be.

	var props = extend({
	  tag: String,
	  moveClass: String
	}, transitionProps);

	delete props.mode;

	var TransitionGroup = {
	  props: props,

	  render: function render (h) {
	    var tag = this.tag || this.$vnode.data.tag || 'span';
	    var map = Object.create(null);
	    var prevChildren = this.prevChildren = this.children;
	    var rawChildren = this.$slots.default || [];
	    var children = this.children = [];
	    var transitionData = extractTransitionData(this);

	    for (var i = 0; i < rawChildren.length; i++) {
	      var c = rawChildren[i];
	      if (c.tag) {
	        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
	          children.push(c);
	          map[c.key] = c
	          ;(c.data || (c.data = {})).transition = transitionData;
	        } else {
	          var opts = c.componentOptions;
	          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
	          warn(("<transition-group> children must be keyed: <" + name + ">"));
	        }
	      }
	    }

	    if (prevChildren) {
	      var kept = [];
	      var removed = [];
	      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
	        var c$1 = prevChildren[i$1];
	        c$1.data.transition = transitionData;
	        c$1.data.pos = c$1.elm.getBoundingClientRect();
	        if (map[c$1.key]) {
	          kept.push(c$1);
	        } else {
	          removed.push(c$1);
	        }
	      }
	      this.kept = h(tag, null, kept);
	      this.removed = removed;
	    }

	    return h(tag, null, children)
	  },

	  beforeUpdate: function beforeUpdate () {
	    // force removing pass
	    this.__patch__(
	      this._vnode,
	      this.kept,
	      false, // hydrating
	      true // removeOnly (!important, avoids unnecessary moves)
	    );
	    this._vnode = this.kept;
	  },

	  updated: function updated () {
	    var children = this.prevChildren;
	    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
	    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
	      return
	    }

	    // we divide the work into three loops to avoid mixing DOM reads and writes
	    // in each iteration - which helps prevent layout thrashing.
	    children.forEach(callPendingCbs);
	    children.forEach(recordPosition);
	    children.forEach(applyTranslation);

	    // force reflow to put everything in position
	    // assign to this to avoid being removed in tree-shaking
	    // $flow-disable-line
	    this._reflow = document.body.offsetHeight;

	    children.forEach(function (c) {
	      if (c.data.moved) {
	        var el = c.elm;
	        var s = el.style;
	        addTransitionClass(el, moveClass);
	        s.transform = s.WebkitTransform = s.transitionDuration = '';
	        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
	          if (!e || /transform$/.test(e.propertyName)) {
	            el.removeEventListener(transitionEndEvent, cb);
	            el._moveCb = null;
	            removeTransitionClass(el, moveClass);
	          }
	        });
	      }
	    });
	  },

	  methods: {
	    hasMove: function hasMove (el, moveClass) {
	      /* istanbul ignore if */
	      if (!hasTransition) {
	        return false
	      }
	      /* istanbul ignore if */
	      if (this._hasMove) {
	        return this._hasMove
	      }
	      // Detect whether an element with the move class applied has
	      // CSS transitions. Since the element may be inside an entering
	      // transition at this very moment, we make a clone of it and remove
	      // all other transition classes applied to ensure only the move class
	      // is applied.
	      var clone = el.cloneNode();
	      if (el._transitionClasses) {
	        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
	      }
	      addClass(clone, moveClass);
	      clone.style.display = 'none';
	      this.$el.appendChild(clone);
	      var info = getTransitionInfo(clone);
	      this.$el.removeChild(clone);
	      return (this._hasMove = info.hasTransform)
	    }
	  }
	};

	function callPendingCbs (c) {
	  /* istanbul ignore if */
	  if (c.elm._moveCb) {
	    c.elm._moveCb();
	  }
	  /* istanbul ignore if */
	  if (c.elm._enterCb) {
	    c.elm._enterCb();
	  }
	}

	function recordPosition (c) {
	  c.data.newPos = c.elm.getBoundingClientRect();
	}

	function applyTranslation (c) {
	  var oldPos = c.data.pos;
	  var newPos = c.data.newPos;
	  var dx = oldPos.left - newPos.left;
	  var dy = oldPos.top - newPos.top;
	  if (dx || dy) {
	    c.data.moved = true;
	    var s = c.elm.style;
	    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
	    s.transitionDuration = '0s';
	  }
	}

	var platformComponents = {
	  Transition: Transition,
	  TransitionGroup: TransitionGroup
	};

	/*  */

	// install platform specific utils
	Vue.config.mustUseProp = mustUseProp;
	Vue.config.isReservedTag = isReservedTag;
	Vue.config.isReservedAttr = isReservedAttr;
	Vue.config.getTagNamespace = getTagNamespace;
	Vue.config.isUnknownElement = isUnknownElement;

	// install platform runtime directives & components
	extend(Vue.options.directives, platformDirectives);
	extend(Vue.options.components, platformComponents);

	// install platform patch function
	Vue.prototype.__patch__ = inBrowser ? patch : noop;

	// public mount method
	Vue.prototype.$mount = function (
	  el,
	  hydrating
	) {
	  el = el && inBrowser ? query(el) : undefined;
	  return mountComponent(this, el, hydrating)
	};

	// devtools global hook
	/* istanbul ignore next */
	if (inBrowser) {
	  setTimeout(function () {
	    if (config.devtools) {
	      if (devtools) {
	        devtools.emit('init', Vue);
	      } else if (
	        isChrome
	      ) {
	        console[console.info ? 'info' : 'log'](
	          'Download the Vue Devtools extension for a better development experience:\n' +
	          'https://github.com/vuejs/vue-devtools'
	        );
	      }
	    }
	    if (config.productionTip !== false &&
	      typeof console !== 'undefined'
	    ) {
	      console[console.info ? 'info' : 'log'](
	        "You are running Vue in development mode.\n" +
	        "Make sure to turn on production mode when deploying for production.\n" +
	        "See more tips at https://vuejs.org/guide/deployment.html"
	      );
	    }
	  }, 0);
	}

	/*  */

	module.exports = Vue;
	});

	var Vue = unwrapExports(vue_runtime_common);

	var buefy = createCommonjsModule(function (module, exports) {
	/*! Buefy v0.7.1 | MIT License | github.com/buefy/buefy */ 
	(function webpackUniversalModuleDefinition(root, factory) {
		module.exports = factory(vue_runtime_common);
	})(typeof self !== 'undefined' ? self : commonjsGlobal, function(__WEBPACK_EXTERNAL_MODULE_22__) {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId]) {
	/******/ 			return installedModules[moduleId].exports;
	/******/ 		}
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			i: moduleId,
	/******/ 			l: false,
	/******/ 			exports: {}
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.l = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// define getter function for harmony exports
	/******/ 	__webpack_require__.d = function(exports, name, getter) {
	/******/ 		if(!__webpack_require__.o(exports, name)) {
	/******/ 			Object.defineProperty(exports, name, {
	/******/ 				configurable: false,
	/******/ 				enumerable: true,
	/******/ 				get: getter
	/******/ 			});
	/******/ 		}
	/******/ 	};
	/******/
	/******/ 	// getDefaultExport function for compatibility with non-harmony modules
	/******/ 	__webpack_require__.n = function(module) {
	/******/ 		var getter = module && module.__esModule ?
	/******/ 			function getDefault() { return module['default']; } :
	/******/ 			function getModuleExports() { return module; };
	/******/ 		__webpack_require__.d(getter, 'a', getter);
	/******/ 		return getter;
	/******/ 	};
	/******/
	/******/ 	// Object.prototype.hasOwnProperty.call
	/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "/";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(__webpack_require__.s = 68);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ (function(module, exports) {

	/* globals __VUE_SSR_CONTEXT__ */

	// this module is a runtime utility for cleaner component module output and will
	// be included in the final webpack user bundle

	module.exports = function normalizeComponent (
	  rawScriptExports,
	  compiledTemplate,
	  injectStyles,
	  scopeId,
	  moduleIdentifier /* server only */
	) {
	  var esModule;
	  var scriptExports = rawScriptExports = rawScriptExports || {};

	  // ES6 modules interop
	  var type = typeof rawScriptExports.default;
	  if (type === 'object' || type === 'function') {
	    esModule = rawScriptExports;
	    scriptExports = rawScriptExports.default;
	  }

	  // Vue.extend constructor export interop
	  var options = typeof scriptExports === 'function'
	    ? scriptExports.options
	    : scriptExports;

	  // render functions
	  if (compiledTemplate) {
	    options.render = compiledTemplate.render;
	    options.staticRenderFns = compiledTemplate.staticRenderFns;
	  }

	  // scopedId
	  if (scopeId) {
	    options._scopeId = scopeId;
	  }

	  var hook;
	  if (moduleIdentifier) { // server build
	    hook = function (context) {
	      // 2.3 injection
	      context =
	        context || // cached call
	        (this.$vnode && this.$vnode.ssrContext) || // stateful
	        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
	      // 2.2 with runInNewContext: true
	      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
	        context = __VUE_SSR_CONTEXT__;
	      }
	      // inject component styles
	      if (injectStyles) {
	        injectStyles.call(this, context);
	      }
	      // register component module identifier for async chunk inferrence
	      if (context && context._registeredComponents) {
	        context._registeredComponents.add(moduleIdentifier);
	      }
	    };
	    // used by ssr in case component is cached and beforeCreate
	    // never gets called
	    options._ssrRegister = hook;
	  } else if (injectStyles) {
	    hook = injectStyles;
	  }

	  if (hook) {
	    var functional = options.functional;
	    var existing = functional
	      ? options.render
	      : options.beforeCreate;
	    if (!functional) {
	      // inject component registration as beforeCreate hook
	      options.beforeCreate = existing
	        ? [].concat(existing, hook)
	        : [hook];
	    } else {
	      // register for functioal component in vue file
	      options.render = function renderWithStyleInjection (h, context) {
	        hook.call(context);
	        return existing(h, context)
	      };
	    }
	  }

	  return {
	    esModule: esModule,
	    exports: scriptExports,
	    options: options
	  }
	};


	/***/ }),
	/* 1 */
	/***/ (function(module, exports, __webpack_require__) {


	exports.__esModule = true;

	var _defineProperty = __webpack_require__(100);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

	/***/ }),
	/* 2 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return setOptions; });
	var config = {
	    defaultContainerElement: null,
	    defaultIconPack: 'mdi',
	    defaultDialogConfirmText: null,
	    defaultDialogCancelText: null,
	    defaultSnackbarDuration: 3500,
	    defaultToastDuration: 2000,
	    defaultTooltipType: 'is-primary',
	    defaultTooltipAnimated: false,
	    defaultInputAutocomplete: 'on',
	    defaultDateFormatter: null,
	    defaultDateParser: null,
	    defaultDateCreator: null,
	    defaultDayNames: null,
	    defaultMonthNames: null,
	    defaultFirstDayOfWeek: null,
	    defaultUnselectableDaysOfWeek: null,
	    defaultTimeFormatter: null,
	    defaultTimeParser: null,
	    defaultModalScroll: null,
	    defaultDatepickerMobileNative: true,
	    defaultTimepickerMobileNative: true,
	    defaultNoticeQueue: true,
	    defaultInputHasCounter: true
	};

	/* harmony default export */ __webpack_exports__["a"] = (config);

	var setOptions = function setOptions(options) {
	    config = options;
	};

	/***/ }),
	/* 3 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(104),
	  /* template */
	  __webpack_require__(105),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 4 */
	/***/ (function(module, exports, __webpack_require__) {

	var store = __webpack_require__(34)('wks');
	var uid = __webpack_require__(25);
	var Symbol = __webpack_require__(8).Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;


	/***/ }),
	/* 5 */
	/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(87), __esModule: true };

	/***/ }),
	/* 6 */
	/***/ (function(module, exports) {

	var core = module.exports = { version: '2.5.7' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


	/***/ }),
	/* 7 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	/* harmony export (immutable) */ __webpack_exports__["b"] = getValueByPath;
	/* harmony export (immutable) */ __webpack_exports__["c"] = indexOf;
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return isMobile; });
	/* harmony export (immutable) */ __webpack_exports__["e"] = removeElement;
	/* harmony export (immutable) */ __webpack_exports__["a"] = escapeRegExpChars;
	/**
	 * Get value of an object property/path even if it's nested
	 */
	function getValueByPath(obj, path) {
	    var value = path.split('.').reduce(function (o, i) {
	        return o[i];
	    }, obj);
	    return value;
	}

	/**
	 * Extension of indexOf method by equality function if specified
	 */
	function indexOf(array, obj, fn) {
	    if (!array) return -1;

	    if (!fn || typeof fn !== 'function') return array.indexOf(obj);

	    for (var i = 0; i < array.length; i++) {
	        if (fn(array[i], obj)) {
	            return i;
	        }
	    }

	    return -1;
	}

	/**
	 * Mobile detection
	 * https://www.abeautifulsite.net/detecting-mobile-devices-with-javascript
	 */
	var isMobile = {
	    Android: function Android() {
	        return typeof window !== 'undefined' && window.navigator.userAgent.match(/Android/i);
	    },
	    BlackBerry: function BlackBerry() {
	        return typeof window !== 'undefined' && window.navigator.userAgent.match(/BlackBerry/i);
	    },
	    iOS: function iOS() {
	        return typeof window !== 'undefined' && window.navigator.userAgent.match(/iPhone|iPad|iPod/i);
	    },
	    Opera: function Opera() {
	        return typeof window !== 'undefined' && window.navigator.userAgent.match(/Opera Mini/i);
	    },
	    Windows: function Windows() {
	        return typeof window !== 'undefined' && window.navigator.userAgent.match(/IEMobile/i);
	    },
	    any: function any() {
	        return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
	    }
	};

	function removeElement(el) {
	    if (typeof el.remove !== 'undefined') {
	        el.remove();
	    } else if (typeof el.parentNode !== 'undefined') {
	        el.parentNode.removeChild(el);
	    }
	}

	/**
	 * Escape regex characters
	 * http://stackoverflow.com/a/6969486
	 */
	function escapeRegExpChars(value) {
	    if (!value) return value;

	    // eslint-disable-next-line
	    return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
	}

	/***/ }),
	/* 8 */
	/***/ (function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


	/***/ }),
	/* 9 */
	/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(15);
	var IE8_DOM_DEFINE = __webpack_require__(46);
	var toPrimitive = __webpack_require__(29);
	var dP = Object.defineProperty;

	exports.f = __webpack_require__(10) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};


	/***/ }),
	/* 10 */
	/***/ (function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(19)(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});


	/***/ }),
	/* 11 */
	/***/ (function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};


	/***/ }),
	/* 12 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_config__ = __webpack_require__(2);


	/* harmony default export */ __webpack_exports__["a"] = ({
	    props: {
	        size: String,
	        expanded: Boolean,
	        loading: Boolean,
	        rounded: Boolean,
	        icon: String,
	        iconPack: String,
	        // Native options to use in HTML5 validation
	        autocomplete: String,
	        maxlength: [Number, String]
	    },
	    data: function data() {
	        return {
	            isValid: true,
	            isFocused: false,
	            newIconPack: this.iconPack || __WEBPACK_IMPORTED_MODULE_0__utils_config__["a" /* default */].defaultIconPack
	        };
	    },

	    computed: {
	        /**
	         * Find parent Field, max 3 levels deep.
	         */
	        parentField: function parentField() {
	            var parent = this.$parent;
	            for (var i = 0; i < 3; i++) {
	                if (parent && !parent.$data._isField) {
	                    parent = parent.$parent;
	                }
	            }
	            return parent;
	        },


	        /**
	         * Get the type prop from parent if it's a Field.
	         */
	        statusType: function statusType() {
	            if (!this.parentField) return;
	            if (!this.parentField.newType) return;
	            if (typeof this.parentField.newType === 'string') {
	                return this.parentField.newType;
	            } else {
	                for (var key in this.parentField.newType) {
	                    if (this.parentField.newType[key]) {
	                        return key;
	                    }
	                }
	            }
	        },


	        /**
	         * Get the message prop from parent if it's a Field.
	         */
	        statusMessage: function statusMessage() {
	            if (!this.parentField) return;

	            return this.parentField.newMessage;
	        },


	        /**
	         * Fix icon size for inputs, large was too big
	         */
	        iconSize: function iconSize() {
	            switch (this.size) {
	                case 'is-small':
	                    return this.size;
	                case 'is-medium':
	                    return;
	                case 'is-large':
	                    return this.newIconPack === 'mdi' ? 'is-medium' : '';
	            }
	        }
	    },
	    methods: {
	        /**
	         * Focus method that work dynamically depending on the component.
	         */
	        focus: function focus() {
	            var _this = this;

	            if (this.$data._elementRef === undefined) return;

	            this.$nextTick(function () {
	                return _this.$el.querySelector(_this.$data._elementRef).focus();
	            });
	        },
	        onBlur: function onBlur($event) {
	            this.isFocused = false;
	            this.$emit('blur', $event);
	            this.checkHtml5Validity();
	        },
	        onFocus: function onFocus($event) {
	            this.isFocused = true;
	            this.$emit('focus', $event);
	        },


	        /**
	         * Check HTML5 validation, set isValid property.
	         * If validation fail, send 'is-danger' type,
	         * and error message to parent if it's a Field.
	         */
	        checkHtml5Validity: function checkHtml5Validity() {
	            if (this.$refs[this.$data._elementRef] === undefined) return;

	            var el = this.$el.querySelector(this.$data._elementRef);

	            var type = null;
	            var message = null;
	            var isValid = true;
	            if (!el.checkValidity()) {
	                type = 'is-danger';
	                message = el.validationMessage;
	                isValid = false;
	            }
	            this.isValid = isValid;

	            if (this.parentField) {
	                // Set type only if not defined
	                if (!this.parentField.type) {
	                    this.parentField.newType = type;
	                }
	                // Set message only if not defined
	                if (!this.parentField.message) {
	                    this.parentField.newMessage = message;
	                }
	            }

	            return this.isValid;
	        }
	    }
	});

	/***/ }),
	/* 13 */
	/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(69), __esModule: true };

	/***/ }),
	/* 14 */
	/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(9);
	var createDesc = __webpack_require__(20);
	module.exports = __webpack_require__(10) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};


	/***/ }),
	/* 15 */
	/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(18);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};


	/***/ }),
	/* 16 */
	/***/ (function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(49);
	var defined = __webpack_require__(31);
	module.exports = function (it) {
	  return IObject(defined(it));
	};


	/***/ }),
	/* 17 */
	/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(8);
	var core = __webpack_require__(6);
	var ctx = __webpack_require__(45);
	var hide = __webpack_require__(14);
	var has = __webpack_require__(11);
	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && has(exports, key)) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	module.exports = $export;


	/***/ }),
	/* 18 */
	/***/ (function(module, exports) {

	module.exports = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};


	/***/ }),
	/* 19 */
	/***/ (function(module, exports) {

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};


	/***/ }),
	/* 20 */
	/***/ (function(module, exports) {

	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};


	/***/ }),
	/* 21 */
	/***/ (function(module, exports) {

	module.exports = {};


	/***/ }),
	/* 22 */
	/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_22__;

	/***/ }),
	/* 23 */
	/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys = __webpack_require__(48);
	var enumBugKeys = __webpack_require__(35);

	module.exports = Object.keys || function keys(O) {
	  return $keys(O, enumBugKeys);
	};


	/***/ }),
	/* 24 */
	/***/ (function(module, exports) {

	module.exports = true;


	/***/ }),
	/* 25 */
	/***/ (function(module, exports) {

	var id = 0;
	var px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};


	/***/ }),
	/* 26 */
	/***/ (function(module, exports) {

	exports.f = {}.propertyIsEnumerable;


	/***/ }),
	/* 27 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(103),
	  /* template */
	  __webpack_require__(106),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 28 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(126),
	  /* template */
	  __webpack_require__(127),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 29 */
	/***/ (function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(18);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};


	/***/ }),
	/* 30 */
	/***/ (function(module, exports) {

	var toString = {}.toString;

	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};


	/***/ }),
	/* 31 */
	/***/ (function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};


	/***/ }),
	/* 32 */
	/***/ (function(module, exports) {

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};


	/***/ }),
	/* 33 */
	/***/ (function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(34)('keys');
	var uid = __webpack_require__(25);
	module.exports = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};


	/***/ }),
	/* 34 */
	/***/ (function(module, exports, __webpack_require__) {

	var core = __webpack_require__(6);
	var global = __webpack_require__(8);
	var SHARED = '__core-js_shared__';
	var store = global[SHARED] || (global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: core.version,
	  mode: __webpack_require__(24) ? 'pure' : 'global',
	  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
	});


	/***/ }),
	/* 35 */
	/***/ (function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');


	/***/ }),
	/* 36 */
	/***/ (function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;


	/***/ }),
	/* 37 */
	/***/ (function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(31);
	module.exports = function (it) {
	  return Object(defined(it));
	};


	/***/ }),
	/* 38 */
	/***/ (function(module, exports, __webpack_require__) {

	var $at = __webpack_require__(79)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(53)(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});


	/***/ }),
	/* 39 */
	/***/ (function(module, exports, __webpack_require__) {

	var def = __webpack_require__(9).f;
	var has = __webpack_require__(11);
	var TAG = __webpack_require__(4)('toStringTag');

	module.exports = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};


	/***/ }),
	/* 40 */
	/***/ (function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(4);


	/***/ }),
	/* 41 */
	/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(8);
	var core = __webpack_require__(6);
	var LIBRARY = __webpack_require__(24);
	var wksExt = __webpack_require__(40);
	var defineProperty = __webpack_require__(9).f;
	module.exports = function (name) {
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
	};


	/***/ }),
	/* 42 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(118),
	  /* template */
	  __webpack_require__(119),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 43 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(120),
	  /* template */
	  __webpack_require__(121),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 44 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(122),
	  /* template */
	  __webpack_require__(125),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 45 */
	/***/ (function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(71);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};


	/***/ }),
	/* 46 */
	/***/ (function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(10) && !__webpack_require__(19)(function () {
	  return Object.defineProperty(__webpack_require__(47)('div'), 'a', { get: function () { return 7; } }).a != 7;
	});


	/***/ }),
	/* 47 */
	/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(18);
	var document = __webpack_require__(8).document;
	// typeof document.createElement is 'object' in old IE
	var is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};


	/***/ }),
	/* 48 */
	/***/ (function(module, exports, __webpack_require__) {

	var has = __webpack_require__(11);
	var toIObject = __webpack_require__(16);
	var arrayIndexOf = __webpack_require__(73)(false);
	var IE_PROTO = __webpack_require__(33)('IE_PROTO');

	module.exports = function (object, names) {
	  var O = toIObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};


	/***/ }),
	/* 49 */
	/***/ (function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(30);
	// eslint-disable-next-line no-prototype-builtins
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};


	/***/ }),
	/* 50 */
	/***/ (function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(32);
	var min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};


	/***/ }),
	/* 51 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(76),
	  /* template */
	  __webpack_require__(107),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 52 */
	/***/ (function(module, exports, __webpack_require__) {


	exports.__esModule = true;

	var _iterator = __webpack_require__(77);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(5);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

	/***/ }),
	/* 53 */
	/***/ (function(module, exports, __webpack_require__) {

	var LIBRARY = __webpack_require__(24);
	var $export = __webpack_require__(17);
	var redefine = __webpack_require__(54);
	var hide = __webpack_require__(14);
	var Iterators = __webpack_require__(21);
	var $iterCreate = __webpack_require__(80);
	var setToStringTag = __webpack_require__(39);
	var getPrototypeOf = __webpack_require__(83);
	var ITERATOR = __webpack_require__(4)('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};


	/***/ }),
	/* 54 */
	/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(14);


	/***/ }),
	/* 55 */
	/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject = __webpack_require__(15);
	var dPs = __webpack_require__(81);
	var enumBugKeys = __webpack_require__(35);
	var IE_PROTO = __webpack_require__(33)('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(47)('iframe');
	  var i = enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(82).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


	/***/ }),
	/* 56 */
	/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(84);
	var global = __webpack_require__(8);
	var hide = __webpack_require__(14);
	var Iterators = __webpack_require__(21);
	var TO_STRING_TAG = __webpack_require__(4)('toStringTag');

	var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
	  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
	  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
	  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
	  'TextTrackList,TouchList').split(',');

	for (var i = 0; i < DOMIterables.length; i++) {
	  var NAME = DOMIterables[i];
	  var Collection = global[NAME];
	  var proto = Collection && Collection.prototype;
	  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}


	/***/ }),
	/* 57 */
	/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys = __webpack_require__(48);
	var hiddenKeys = __webpack_require__(35).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return $keys(O, hiddenKeys);
	};


	/***/ }),
	/* 58 */
	/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(97), __esModule: true };

	/***/ }),
	/* 59 */
	/***/ (function(module, exports, __webpack_require__) {

	var classof = __webpack_require__(99);
	var ITERATOR = __webpack_require__(4)('iterator');
	var Iterators = __webpack_require__(21);
	module.exports = __webpack_require__(6).getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};


	/***/ }),
	/* 60 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(108),
	  /* template */
	  __webpack_require__(109),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 61 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(137),
	  /* template */
	  __webpack_require__(138),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 62 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	/* unused harmony export isSSR */
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return HTMLElement; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return File; });
	// Polyfills for SSR

	var isSSR = typeof window === 'undefined';

	var HTMLElement = isSSR ? Object : window.HTMLElement;
	var File = isSSR ? Object : window.File;

	/***/ }),
	/* 63 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_icon_Icon__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_icon_Icon__);



	/* harmony default export */ __webpack_exports__["a"] = ({
	    components: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({}, __WEBPACK_IMPORTED_MODULE_1__components_icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_1__components_icon_Icon___default.a),
	    props: {
	        active: {
	            type: Boolean,
	            default: true
	        },
	        title: String,
	        closable: {
	            type: Boolean,
	            default: true
	        },
	        type: String,
	        hasIcon: Boolean,
	        size: String,
	        iconPack: String,
	        iconSize: String,
	        autoClose: {
	            type: Boolean,
	            default: false
	        },
	        duration: {
	            type: Number,
	            default: 5000
	        }
	    },
	    data: function data() {
	        return {
	            isActive: this.active
	        };
	    },

	    watch: {
	        active: function active(value) {
	            this.isActive = value;
	        },
	        isActive: function isActive(value) {
	            if (value) {
	                this.setAutoClose();
	            } else {
	                if (this.timer) {
	                    clearTimeout(this.timer);
	                }
	            }
	        }
	    },
	    computed: {
	        /**
	         * Icon name (MDI) based on type.
	         */
	        icon: function icon() {
	            switch (this.type) {
	                case 'is-info':
	                    return 'information';
	                case 'is-success':
	                    return 'check-circle';
	                case 'is-warning':
	                    return 'alert';
	                case 'is-danger':
	                    return 'alert-circle';
	                default:
	                    return null;
	            }
	        }
	    },
	    methods: {
	        /**
	         * Close the Message and emit events.
	         */
	        close: function close() {
	            this.isActive = false;
	            this.$emit('close');
	            this.$emit('update:active', false);
	        },

	        /**
	         * Set timer to auto close message
	         */
	        setAutoClose: function setAutoClose() {
	            var _this = this;

	            if (this.autoClose) {
	                this.timer = setTimeout(function () {
	                    if (_this.isActive) {
	                        _this.close();
	                    }
	                }, this.duration);
	            }
	        }
	    },
	    mounted: function mounted() {
	        this.setAutoClose();
	    }
	});

	/***/ }),
	/* 64 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(149),
	  /* template */
	  __webpack_require__(150),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 65 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers__ = __webpack_require__(7);



	/* harmony default export */ __webpack_exports__["a"] = ({
	    props: {
	        type: {
	            type: String,
	            default: 'is-dark'
	        },
	        message: String,
	        duration: Number,
	        queue: {
	            type: Boolean,
	            default: undefined
	        },
	        position: {
	            type: String,
	            default: 'is-top',
	            validator: function validator(value) {
	                return ['is-top-right', 'is-top', 'is-top-left', 'is-bottom-right', 'is-bottom', 'is-bottom-left'].indexOf(value) > -1;
	            }
	        },
	        container: String
	    },
	    data: function data() {
	        return {
	            isActive: false,
	            parentTop: null,
	            parentBottom: null,
	            newContainer: this.container || __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaultContainerElement
	        };
	    },

	    computed: {
	        correctParent: function correctParent() {
	            switch (this.position) {
	                case 'is-top-right':
	                case 'is-top':
	                case 'is-top-left':
	                    return this.parentTop;

	                case 'is-bottom-right':
	                case 'is-bottom':
	                case 'is-bottom-left':
	                    return this.parentBottom;
	            }
	        },
	        transition: function transition() {
	            switch (this.position) {
	                case 'is-top-right':
	                case 'is-top':
	                case 'is-top-left':
	                    return {
	                        enter: 'fadeInDown',
	                        leave: 'fadeOut'
	                    };
	                case 'is-bottom-right':
	                case 'is-bottom':
	                case 'is-bottom-left':
	                    return {
	                        enter: 'fadeInUp',
	                        leave: 'fadeOut'
	                    };
	            }
	        }
	    },
	    methods: {
	        shouldQueue: function shouldQueue() {
	            var queue = this.queue !== undefined ? this.queue : __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaultNoticeQueue;

	            if (!queue) return false;

	            return this.parentTop.childElementCount > 0 || this.parentBottom.childElementCount > 0;
	        },
	        close: function close() {
	            var _this = this;

	            clearTimeout(this.timer);
	            this.isActive = false;

	            // Timeout for the animation complete before destroying
	            setTimeout(function () {
	                _this.$destroy();
	                Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["e" /* removeElement */])(_this.$el);
	            }, 150);
	        },
	        showNotice: function showNotice() {
	            var _this2 = this;

	            if (this.shouldQueue()) {
	                // Call recursively if should queue
	                setTimeout(function () {
	                    return _this2.showNotice();
	                }, 250);
	                return;
	            }
	            this.correctParent.insertAdjacentElement('afterbegin', this.$el);
	            this.isActive = true;

	            if (!this.indefinite) {
	                this.timer = setTimeout(function () {
	                    return _this2.close();
	                }, this.newDuration);
	            }
	        },
	        setupContainer: function setupContainer() {
	            this.parentTop = document.querySelector('.notices.is-top');
	            this.parentBottom = document.querySelector('.notices.is-bottom');

	            if (this.parentTop && this.parentBottom) return;

	            if (!this.parentTop) {
	                this.parentTop = document.createElement('div');
	                this.parentTop.className = 'notices is-top';
	            }

	            if (!this.parentBottom) {
	                this.parentBottom = document.createElement('div');
	                this.parentBottom.className = 'notices is-bottom';
	            }

	            var container = document.querySelector(this.newContainer) || document.body;

	            container.appendChild(this.parentTop);
	            container.appendChild(this.parentBottom);

	            if (this.newContainer) {
	                this.parentTop.classList.add('has-custom-container');
	                this.parentBottom.classList.add('has-custom-container');
	            }
	        }
	    },
	    beforeMount: function beforeMount() {
	        this.setupContainer();
	    },
	    mounted: function mounted() {
	        this.showNotice();
	    }
	});

	/***/ }),
	/* 66 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(176),
	  /* template */
	  __webpack_require__(177),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 67 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(185),
	  /* template */
	  __webpack_require__(186),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 68 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	var components_namespaceObject = {};
	__webpack_require__.d(components_namespaceObject, "Autocomplete", function() { return autocomplete; });
	__webpack_require__.d(components_namespaceObject, "Checkbox", function() { return components_checkbox; });
	__webpack_require__.d(components_namespaceObject, "Collapse", function() { return collapse; });
	__webpack_require__.d(components_namespaceObject, "Datepicker", function() { return datepicker; });
	__webpack_require__.d(components_namespaceObject, "Dialog", function() { return dialog; });
	__webpack_require__.d(components_namespaceObject, "Dropdown", function() { return dropdown; });
	__webpack_require__.d(components_namespaceObject, "Field", function() { return field; });
	__webpack_require__.d(components_namespaceObject, "Icon", function() { return icon; });
	__webpack_require__.d(components_namespaceObject, "Input", function() { return input; });
	__webpack_require__.d(components_namespaceObject, "Loading", function() { return loading; });
	__webpack_require__.d(components_namespaceObject, "Message", function() { return components_message; });
	__webpack_require__.d(components_namespaceObject, "Modal", function() { return modal; });
	__webpack_require__.d(components_namespaceObject, "Notification", function() { return notification; });
	__webpack_require__.d(components_namespaceObject, "Pagination", function() { return pagination; });
	__webpack_require__.d(components_namespaceObject, "Radio", function() { return components_radio; });
	__webpack_require__.d(components_namespaceObject, "Select", function() { return components_select; });
	__webpack_require__.d(components_namespaceObject, "Snackbar", function() { return snackbar; });
	__webpack_require__.d(components_namespaceObject, "Switch", function() { return components_switch; });
	__webpack_require__.d(components_namespaceObject, "Table", function() { return table; });
	__webpack_require__.d(components_namespaceObject, "Tabs", function() { return tabs; });
	__webpack_require__.d(components_namespaceObject, "Tag", function() { return tag; });
	__webpack_require__.d(components_namespaceObject, "Taginput", function() { return taginput; });
	__webpack_require__.d(components_namespaceObject, "Timepicker", function() { return timepicker; });
	__webpack_require__.d(components_namespaceObject, "Toast", function() { return toast; });
	__webpack_require__.d(components_namespaceObject, "Tooltip", function() { return tooltip; });
	__webpack_require__.d(components_namespaceObject, "Upload", function() { return upload; });

	// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/assign.js
	var object_assign = __webpack_require__(13);
	var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

	// EXTERNAL MODULE: ./src/scss/buefy-build.scss
	var buefy_build = __webpack_require__(75);
	var buefy_build_default = /*#__PURE__*/__webpack_require__.n(buefy_build);

	// EXTERNAL MODULE: ./src/components/autocomplete/Autocomplete.vue
	var Autocomplete = __webpack_require__(51);
	var Autocomplete_default = /*#__PURE__*/__webpack_require__.n(Autocomplete);

	// CONCATENATED MODULE: ./src/utils/plugins.js

	var use = function use(plugin) {
	    if (typeof window !== 'undefined' && window.Vue) {
	        window.Vue.use(plugin);
	    }
	};

	var registerComponent = function registerComponent(Vue, component) {
	    Vue.component(component.name, component);
	};

	var registerComponentProgrammatic = function registerComponentProgrammatic(Vue, property, component) {
	    Vue.prototype[property] = component;
	};
	// CONCATENATED MODULE: ./src/components/autocomplete/index.js




	var Plugin = {
	    install: function install(Vue) {
	        registerComponent(Vue, Autocomplete_default.a);
	    }
	};

	use(Plugin);

	/* harmony default export */ var autocomplete = (Plugin);


	// EXTERNAL MODULE: ./src/components/checkbox/Checkbox.vue
	var Checkbox = __webpack_require__(60);
	var Checkbox_default = /*#__PURE__*/__webpack_require__.n(Checkbox);

	// EXTERNAL MODULE: ./src/components/checkbox/CheckboxButton.vue
	var CheckboxButton = __webpack_require__(110);
	var CheckboxButton_default = /*#__PURE__*/__webpack_require__.n(CheckboxButton);

	// CONCATENATED MODULE: ./src/components/checkbox/index.js





	var checkbox_Plugin = {
	    install: function install(Vue) {
	        registerComponent(Vue, Checkbox_default.a);
	        registerComponent(Vue, CheckboxButton_default.a);
	    }
	};

	use(checkbox_Plugin);

	/* harmony default export */ var components_checkbox = (checkbox_Plugin);


	// EXTERNAL MODULE: ./src/components/collapse/Collapse.vue
	var Collapse = __webpack_require__(113);
	var Collapse_default = /*#__PURE__*/__webpack_require__.n(Collapse);

	// CONCATENATED MODULE: ./src/components/collapse/index.js




	var collapse_Plugin = {
	    install: function install(Vue) {
	        registerComponent(Vue, Collapse_default.a);
	    }
	};

	use(collapse_Plugin);

	/* harmony default export */ var collapse = (collapse_Plugin);


	// EXTERNAL MODULE: ./src/components/datepicker/Datepicker.vue
	var Datepicker = __webpack_require__(116);
	var Datepicker_default = /*#__PURE__*/__webpack_require__.n(Datepicker);

	// CONCATENATED MODULE: ./src/components/datepicker/index.js




	var datepicker_Plugin = {
	    install: function install(Vue) {
	        registerComponent(Vue, Datepicker_default.a);
	    }
	};

	use(datepicker_Plugin);

	/* harmony default export */ var datepicker = (datepicker_Plugin);


	// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","amd":"vue","root":"Vue"}
	var external___commonjs___vue___commonjs2___vue___amd___vue___root___Vue__ = __webpack_require__(22);
	var external___commonjs___vue___commonjs2___vue___amd___vue___root___Vue___default = /*#__PURE__*/__webpack_require__.n(external___commonjs___vue___commonjs2___vue___amd___vue___root___Vue__);

	// EXTERNAL MODULE: ./src/components/dialog/Dialog.vue
	var Dialog = __webpack_require__(135);
	var Dialog_default = /*#__PURE__*/__webpack_require__.n(Dialog);

	// CONCATENATED MODULE: ./src/components/dialog/index.js






	function dialog_open(propsData) {
	    var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : external___commonjs___vue___commonjs2___vue___amd___vue___root___Vue___default.a;
	    var DialogComponent = vm.extend(Dialog_default.a);
	    return new DialogComponent({
	        el: document.createElement('div'),
	        propsData: propsData
	    });
	}

	var DialogProgrammatic = {
	    alert: function alert(params) {
	        var message = void 0;
	        if (typeof params === 'string') message = params;
	        var defaultParam = {
	            canCancel: false,
	            message: message
	        };
	        var propsData = assign_default()(defaultParam, params);
	        return dialog_open(propsData);
	    },
	    confirm: function confirm(params) {
	        var defaultParam = {};
	        var propsData = assign_default()(defaultParam, params);
	        return dialog_open(propsData);
	    },
	    prompt: function prompt(params) {
	        var defaultParam = {
	            hasInput: true,
	            confirmText: 'Done'
	        };
	        var propsData = assign_default()(defaultParam, params);
	        return dialog_open(propsData);
	    }
	};

	var dialog_Plugin = {
	    install: function install(Vue) {
	        registerComponent(Vue, Dialog_default.a);
	        registerComponentProgrammatic(Vue, '$dialog', DialogProgrammatic);
	    }
	};

	use(dialog_Plugin);

	/* harmony default export */ var dialog = (dialog_Plugin);


	// EXTERNAL MODULE: ./src/components/dropdown/Dropdown.vue
	var Dropdown = __webpack_require__(42);
	var Dropdown_default = /*#__PURE__*/__webpack_require__.n(Dropdown);

	// EXTERNAL MODULE: ./src/components/dropdown/DropdownItem.vue
	var DropdownItem = __webpack_require__(43);
	var DropdownItem_default = /*#__PURE__*/__webpack_require__.n(DropdownItem);

	// CONCATENATED MODULE: ./src/components/dropdown/index.js





	var dropdown_Plugin = {
	    install: function install(Vue) {
	        registerComponent(Vue, Dropdown_default.a);
	        registerComponent(Vue, DropdownItem_default.a);
	    }
	};

	use(dropdown_Plugin);

	/* harmony default export */ var dropdown = (dropdown_Plugin);


	// EXTERNAL MODULE: ./src/components/field/Field.vue
	var Field = __webpack_require__(44);
	var Field_default = /*#__PURE__*/__webpack_require__.n(Field);

	// CONCATENATED MODULE: ./src/components/field/index.js




	var field_Plugin = {
	    install: function install(Vue) {
	        registerComponent(Vue, Field_default.a);
	    }
	};

	use(field_Plugin);

	/* harmony default export */ var field = (field_Plugin);


	// EXTERNAL MODULE: ./src/components/icon/Icon.vue
	var Icon = __webpack_require__(3);
	var Icon_default = /*#__PURE__*/__webpack_require__.n(Icon);

	// CONCATENATED MODULE: ./src/components/icon/index.js




	var icon_Plugin = {
	    install: function install(Vue) {
	        registerComponent(Vue, Icon_default.a);
	    }
	};

	use(icon_Plugin);

	/* harmony default export */ var icon = (icon_Plugin);


	// EXTERNAL MODULE: ./src/components/input/Input.vue
	var Input = __webpack_require__(27);
	var Input_default = /*#__PURE__*/__webpack_require__.n(Input);

	// CONCATENATED MODULE: ./src/components/input/index.js




	var input_Plugin = {
	    install: function install(Vue) {
	        registerComponent(Vue, Input_default.a);
	    }
	};

	use(input_Plugin);

	/* harmony default export */ var input = (input_Plugin);


	// EXTERNAL MODULE: ./src/components/loading/Loading.vue
	var Loading = __webpack_require__(140);
	var Loading_default = /*#__PURE__*/__webpack_require__.n(Loading);

	// CONCATENATED MODULE: ./src/components/loading/index.js






	var LoadingProgrammatic = {
	    open: function open(params) {
	        var defaultParam = {
	            programmatic: true
	        };
	        var propsData = assign_default()(defaultParam, params);

	        var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : external___commonjs___vue___commonjs2___vue___amd___vue___root___Vue___default.a;
	        var LoadingComponent = vm.extend(Loading_default.a);
	        return new LoadingComponent({
	            el: document.createElement('div'),
	            propsData: propsData
	        });
	    }
	};

	var loading_Plugin = {
	    install: function install(Vue) {
	        registerComponent(Vue, Loading_default.a);
	        registerComponentProgrammatic(Vue, '$loading', LoadingProgrammatic);
	    }
	};

	use(loading_Plugin);

	/* harmony default export */ var loading = (loading_Plugin);


	// EXTERNAL MODULE: ./src/components/message/Message.vue
	var Message = __webpack_require__(143);
	var Message_default = /*#__PURE__*/__webpack_require__.n(Message);

	// CONCATENATED MODULE: ./src/components/message/index.js




	var message_Plugin = {
	    install: function install(Vue) {
	        registerComponent(Vue, Message_default.a);
	    }
	};

	use(message_Plugin);

	/* harmony default export */ var components_message = (message_Plugin);


	// EXTERNAL MODULE: ./src/components/modal/Modal.vue
	var Modal = __webpack_require__(61);
	var Modal_default = /*#__PURE__*/__webpack_require__.n(Modal);

	// CONCATENATED MODULE: ./src/components/modal/index.js






	var ModalProgrammatic = {
	    open: function open(params) {
	        var content = void 0;
	        var parent = void 0;
	        if (typeof params === 'string') content = params;

	        var defaultParam = {
	            programmatic: true,
	            content: content
	        };
	        if (params.parent) {
	            parent = params.parent;
	            delete params.parent;
	        }
	        var propsData = assign_default()(defaultParam, params);

	        var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : external___commonjs___vue___commonjs2___vue___amd___vue___root___Vue___default.a;
	        var ModalComponent = vm.extend(Modal_default.a);
	        return new ModalComponent({
	            parent: parent,
	            el: document.createElement('div'),
	            propsData: propsData
	        });
	    }
	};

	var modal_Plugin = {
	    install: function install(Vue) {
	        registerComponent(Vue, Modal_default.a);
	        registerComponentProgrammatic(Vue, '$modal', ModalProgrammatic);
	    }
	};

	use(modal_Plugin);

	/* harmony default export */ var modal = (modal_Plugin);


	// EXTERNAL MODULE: ./src/components/notification/Notification.vue
	var Notification = __webpack_require__(146);
	var Notification_default = /*#__PURE__*/__webpack_require__.n(Notification);

	// CONCATENATED MODULE: ./src/components/notification/index.js




	var notification_Plugin = {
	    install: function install(Vue) {
	        registerComponent(Vue, Notification_default.a);
	    }
	};

	use(notification_Plugin);

	/* harmony default export */ var notification = (notification_Plugin);


	// EXTERNAL MODULE: ./src/components/pagination/Pagination.vue
	var Pagination = __webpack_require__(64);
	var Pagination_default = /*#__PURE__*/__webpack_require__.n(Pagination);

	// CONCATENATED MODULE: ./src/components/pagination/index.js




	var pagination_Plugin = {
	    install: function install(Vue) {
	        registerComponent(Vue, Pagination_default.a);
	    }
	};

	use(pagination_Plugin);

	/* harmony default export */ var pagination = (pagination_Plugin);


	// EXTERNAL MODULE: ./src/components/radio/Radio.vue
	var Radio = __webpack_require__(151);
	var Radio_default = /*#__PURE__*/__webpack_require__.n(Radio);

	// EXTERNAL MODULE: ./src/components/radio/RadioButton.vue
	var RadioButton = __webpack_require__(154);
	var RadioButton_default = /*#__PURE__*/__webpack_require__.n(RadioButton);

	// CONCATENATED MODULE: ./src/components/radio/index.js





	var radio_Plugin = {
	    install: function install(Vue) {
	        registerComponent(Vue, Radio_default.a);
	        registerComponent(Vue, RadioButton_default.a);
	    }
	};

	use(radio_Plugin);

	/* harmony default export */ var components_radio = (radio_Plugin);


	// EXTERNAL MODULE: ./src/components/select/Select.vue
	var Select = __webpack_require__(28);
	var Select_default = /*#__PURE__*/__webpack_require__.n(Select);

	// CONCATENATED MODULE: ./src/components/select/index.js




	var select_Plugin = {
	    install: function install(Vue) {
	        registerComponent(Vue, Select_default.a);
	    }
	};

	use(select_Plugin);

	/* harmony default export */ var components_select = (select_Plugin);


	// EXTERNAL MODULE: ./src/components/snackbar/Snackbar.vue
	var Snackbar = __webpack_require__(157);
	var Snackbar_default = /*#__PURE__*/__webpack_require__.n(Snackbar);

	// CONCATENATED MODULE: ./src/components/snackbar/index.js






	var SnackbarProgrammatic = {
	    open: function open(params) {
	        var message = void 0;
	        if (typeof params === 'string') message = params;

	        var defaultParam = {
	            type: 'is-success',
	            position: 'is-bottom-right',
	            message: message
	        };
	        var propsData = assign_default()(defaultParam, params);

	        var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : external___commonjs___vue___commonjs2___vue___amd___vue___root___Vue___default.a;
	        var SnackbarComponent = vm.extend(Snackbar_default.a);
	        return new SnackbarComponent({
	            el: document.createElement('div'),
	            propsData: propsData
	        });
	    }
	};

	var snackbar_Plugin = {
	    install: function install(Vue) {
	        registerComponentProgrammatic(Vue, '$snackbar', SnackbarProgrammatic);
	    }
	};

	use(snackbar_Plugin);

	/* harmony default export */ var snackbar = (snackbar_Plugin);


	// EXTERNAL MODULE: ./src/components/switch/Switch.vue
	var Switch = __webpack_require__(160);
	var Switch_default = /*#__PURE__*/__webpack_require__.n(Switch);

	// CONCATENATED MODULE: ./src/components/switch/index.js




	var switch_Plugin = {
	    install: function install(Vue) {
	        registerComponent(Vue, Switch_default.a);
	    }
	};

	use(switch_Plugin);

	/* harmony default export */ var components_switch = (switch_Plugin);


	// EXTERNAL MODULE: ./src/components/table/Table.vue
	var Table = __webpack_require__(163);
	var Table_default = /*#__PURE__*/__webpack_require__.n(Table);

	// EXTERNAL MODULE: ./src/components/table/TableColumn.vue
	var TableColumn = __webpack_require__(66);
	var TableColumn_default = /*#__PURE__*/__webpack_require__.n(TableColumn);

	// CONCATENATED MODULE: ./src/components/table/index.js





	var table_Plugin = {
	    install: function install(Vue) {
	        registerComponent(Vue, Table_default.a);
	        registerComponent(Vue, TableColumn_default.a);
	    }
	};

	use(table_Plugin);

	/* harmony default export */ var table = (table_Plugin);


	// EXTERNAL MODULE: ./src/components/tabs/Tabs.vue
	var Tabs = __webpack_require__(179);
	var Tabs_default = /*#__PURE__*/__webpack_require__.n(Tabs);

	// EXTERNAL MODULE: ./src/components/tabs/TabItem.vue
	var TabItem = __webpack_require__(182);
	var TabItem_default = /*#__PURE__*/__webpack_require__.n(TabItem);

	// CONCATENATED MODULE: ./src/components/tabs/index.js





	var tabs_Plugin = {
	    install: function install(Vue) {
	        registerComponent(Vue, Tabs_default.a);
	        registerComponent(Vue, TabItem_default.a);
	    }
	};

	use(tabs_Plugin);

	/* harmony default export */ var tabs = (tabs_Plugin);


	// EXTERNAL MODULE: ./src/components/tag/Tag.vue
	var Tag = __webpack_require__(67);
	var Tag_default = /*#__PURE__*/__webpack_require__.n(Tag);

	// EXTERNAL MODULE: ./src/components/tag/Taglist.vue
	var Taglist = __webpack_require__(187);
	var Taglist_default = /*#__PURE__*/__webpack_require__.n(Taglist);

	// CONCATENATED MODULE: ./src/components/tag/index.js





	var tag_Plugin = {
	    install: function install(Vue) {
	        registerComponent(Vue, Tag_default.a);
	        registerComponent(Vue, Taglist_default.a);
	    }
	};

	use(tag_Plugin);

	/* harmony default export */ var tag = (tag_Plugin);


	// EXTERNAL MODULE: ./src/components/taginput/Taginput.vue
	var Taginput = __webpack_require__(190);
	var Taginput_default = /*#__PURE__*/__webpack_require__.n(Taginput);

	// CONCATENATED MODULE: ./src/components/taginput/index.js




	var taginput_Plugin = {
	    install: function install(Vue) {
	        registerComponent(Vue, Taginput_default.a);
	    }
	};

	use(taginput_Plugin);

	/* harmony default export */ var taginput = (taginput_Plugin);


	// EXTERNAL MODULE: ./src/components/timepicker/Timepicker.vue
	var Timepicker = __webpack_require__(193);
	var Timepicker_default = /*#__PURE__*/__webpack_require__.n(Timepicker);

	// CONCATENATED MODULE: ./src/components/timepicker/index.js




	var timepicker_Plugin = {
	    install: function install(Vue) {
	        registerComponent(Vue, Timepicker_default.a);
	    }
	};

	use(timepicker_Plugin);

	/* harmony default export */ var timepicker = (timepicker_Plugin);


	// EXTERNAL MODULE: ./src/components/toast/Toast.vue
	var Toast = __webpack_require__(196);
	var Toast_default = /*#__PURE__*/__webpack_require__.n(Toast);

	// CONCATENATED MODULE: ./src/components/toast/index.js






	var ToastProgrammatic = {
	    open: function open(params) {
	        var message = void 0;
	        if (typeof params === 'string') message = params;

	        var defaultParam = { message: message };
	        var propsData = assign_default()(defaultParam, params);

	        var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : external___commonjs___vue___commonjs2___vue___amd___vue___root___Vue___default.a;
	        var ToastComponent = vm.extend(Toast_default.a);
	        return new ToastComponent({
	            el: document.createElement('div'),
	            propsData: propsData
	        });
	    }
	};

	var toast_Plugin = {
	    install: function install(Vue) {
	        registerComponentProgrammatic(Vue, '$toast', ToastProgrammatic);
	    }
	};

	use(toast_Plugin);

	/* harmony default export */ var toast = (toast_Plugin);


	// EXTERNAL MODULE: ./src/components/tooltip/Tooltip.vue
	var Tooltip = __webpack_require__(199);
	var Tooltip_default = /*#__PURE__*/__webpack_require__.n(Tooltip);

	// CONCATENATED MODULE: ./src/components/tooltip/index.js




	var tooltip_Plugin = {
	    install: function install(Vue) {
	        registerComponent(Vue, Tooltip_default.a);
	    }
	};

	use(tooltip_Plugin);

	/* harmony default export */ var tooltip = (tooltip_Plugin);


	// EXTERNAL MODULE: ./src/components/upload/Upload.vue
	var Upload = __webpack_require__(202);
	var Upload_default = /*#__PURE__*/__webpack_require__.n(Upload);

	// CONCATENATED MODULE: ./src/components/upload/index.js




	var upload_Plugin = {
	    install: function install(Vue) {
	        registerComponent(Vue, Upload_default.a);
	    }
	};

	use(upload_Plugin);

	/* harmony default export */ var upload = (upload_Plugin);


	// CONCATENATED MODULE: ./src/components/index.js




























	// EXTERNAL MODULE: ./src/utils/config.js
	var config = __webpack_require__(2);

	// CONCATENATED MODULE: ./src/index.js









	var Buefy = {
	    install: function install(Vue) {
	        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	        // Options
	        Object(config["b" /* setOptions */])(assign_default()(config["a" /* default */], options));
	        // Components
	        for (var componentKey in components_namespaceObject) {
	            Vue.use(components_namespaceObject[componentKey]);
	        }
	        // Config component
	        var BuefyProgrammatic = {
	            setOptions: function setOptions(options) {
	                Object(config["b" /* setOptions */])(assign_default()(config["a" /* default */], options));
	            }
	        };
	        registerComponentProgrammatic(Vue, '$buefy', BuefyProgrammatic);
	    }
	};

	use(Buefy);

	/* harmony default export */ var src = __webpack_exports__["default"] = (Buefy);

	/***/ }),
	/* 69 */
	/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(70);
	module.exports = __webpack_require__(6).Object.assign;


	/***/ }),
	/* 70 */
	/***/ (function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(17);

	$export($export.S + $export.F, 'Object', { assign: __webpack_require__(72) });


	/***/ }),
	/* 71 */
	/***/ (function(module, exports) {

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};


	/***/ }),
	/* 72 */
	/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys = __webpack_require__(23);
	var gOPS = __webpack_require__(36);
	var pIE = __webpack_require__(26);
	var toObject = __webpack_require__(37);
	var IObject = __webpack_require__(49);
	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(19)(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = gOPS.f;
	  var isEnum = pIE.f;
	  while (aLen > index) {
	    var S = IObject(arguments[index++]);
	    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	  } return T;
	} : $assign;


	/***/ }),
	/* 73 */
	/***/ (function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(16);
	var toLength = __webpack_require__(50);
	var toAbsoluteIndex = __webpack_require__(74);
	module.exports = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};


	/***/ }),
	/* 74 */
	/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(32);
	var max = Math.max;
	var min = Math.min;
	module.exports = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};


	/***/ }),
	/* 75 */
	/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

	/***/ }),
	/* 76 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(52);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator__ = __webpack_require__(58);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_helpers__ = __webpack_require__(7);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_FormElementMixin__ = __webpack_require__(12);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__input_Input__ = __webpack_require__(27);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__input_Input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__input_Input__);



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





	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BAutocomplete',
	    components: __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default()({}, __WEBPACK_IMPORTED_MODULE_5__input_Input___default.a.name, __WEBPACK_IMPORTED_MODULE_5__input_Input___default.a),
	    mixins: [__WEBPACK_IMPORTED_MODULE_4__utils_FormElementMixin__["a" /* default */]],
	    inheritAttrs: false,
	    props: {
	        value: [Number, String],
	        data: {
	            type: Array,
	            default: function _default() {
	                return [];
	            }
	        },
	        field: {
	            type: String,
	            default: 'value'
	        },
	        keepFirst: Boolean,
	        clearOnSelect: Boolean,
	        openOnFocus: Boolean
	    },
	    data: function data() {
	        return {
	            selected: null,
	            hovered: null,
	            isActive: false,
	            newValue: this.value,
	            isListInViewportVertically: true,
	            hasFocus: false,
	            _isAutocomplete: true,
	            _elementRef: 'input'
	        };
	    },

	    computed: {
	        /**
	         * White-listed items to not close when clicked.
	         * Add input, dropdown and all children.
	         */
	        whiteList: function whiteList() {
	            var whiteList = [];
	            whiteList.push(this.$refs.input.$el.querySelector('input'));
	            whiteList.push(this.$refs.dropdown);
	            // Add all chidren from dropdown
	            if (this.$refs.dropdown !== undefined) {
	                var children = this.$refs.dropdown.querySelectorAll('*');
	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;

	                try {
	                    for (var _iterator = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator___default()(children), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                        var child = _step.value;

	                        whiteList.push(child);
	                    }
	                } catch (err) {
	                    _didIteratorError = true;
	                    _iteratorError = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion && _iterator.return) {
	                            _iterator.return();
	                        }
	                    } finally {
	                        if (_didIteratorError) {
	                            throw _iteratorError;
	                        }
	                    }
	                }
	            }

	            return whiteList;
	        },


	        /**
	         * Check if exists default slot
	         */
	        hasDefaultSlot: function hasDefaultSlot() {
	            return !!this.$scopedSlots.default;
	        },


	        /**
	         * Check if exists "empty" slot
	         */
	        hasEmptySlot: function hasEmptySlot() {
	            return !!this.$slots.empty;
	        },


	        /**
	         * Check if exists "header" slot
	         */
	        hasHeaderSlot: function hasHeaderSlot() {
	            return !!this.$slots.header;
	        }
	    },
	    watch: {
	        /**
	         * When dropdown is toggled, check the visibility to know when
	         * to open upwards.
	         */
	        isActive: function isActive(active) {
	            var _this = this;

	            if (active) {
	                this.calcDropdownInViewportVertical();
	            } else {
	                this.$nextTick(function () {
	                    return _this.setHovered(null);
	                });
	                // Timeout to wait for the animation to finish before recalculating
	                setTimeout(function () {
	                    _this.calcDropdownInViewportVertical();
	                }, 100);
	            }
	        },


	        /**
	         * When updating input's value
	         *   1. Emit changes
	         *   2. If value isn't the same as selected, set null
	         *   3. Close dropdown if value is clear or else open it
	         */
	        newValue: function newValue(value) {
	            this.$emit('input', value);
	            // Check if selected is invalid
	            var currentValue = this.getValue(this.selected);
	            if (currentValue && currentValue !== value) {
	                this.setSelected(null, false);
	            }
	            // Close dropdown if input is clear or else open it
	            if (this.hasFocus && (!this.openOnFocus || value)) {
	                this.isActive = !!value;
	            }
	        },


	        /**
	         * When v-model is changed:
	         *   1. Update internal value.
	         *   2. If it's invalid, validate again.
	         */
	        value: function value(_value) {
	            this.newValue = _value;
	            !this.isValid && this.$refs.input.checkHtml5Validity();
	        },


	        /**
	         * Select first option if "keep-first
	         */
	        data: function data(value) {
	            // Keep first option always pre-selected
	            if (this.keepFirst) {
	                this.selectFirstOption(value);
	            }
	        }
	    },
	    methods: {
	        /**
	         * Set which option is currently hovered.
	         */
	        setHovered: function setHovered(option) {
	            if (option === undefined) return;

	            this.hovered = option;
	        },


	        /**
	         * Set which option is currently selected, update v-model,
	         * update input value and close dropdown.
	         */
	        setSelected: function setSelected(option) {
	            var _this2 = this;

	            var closeDropdown = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	            if (option === undefined) return;

	            this.selected = option;
	            this.$emit('select', this.selected);
	            if (this.selected !== null) {
	                this.newValue = this.clearOnSelect ? '' : this.getValue(this.selected);
	            }
	            closeDropdown && this.$nextTick(function () {
	                _this2.isActive = false;
	            });
	        },


	        /**
	         * Select first option
	         */
	        selectFirstOption: function selectFirstOption(options) {
	            var _this3 = this;

	            this.$nextTick(function () {
	                if (options.length) {
	                    // If has visible data or open on focus, keep updating the hovered
	                    if (_this3.openOnFocus || _this3.newValue !== '' && _this3.hovered !== options[0]) {
	                        _this3.setHovered(options[0]);
	                    }
	                } else {
	                    _this3.setHovered(null);
	                }
	            });
	        },


	        /**
	         * Enter key listener.
	         * Select the hovered option.
	         */
	        enterPressed: function enterPressed() {
	            if (this.hovered === null) return;
	            this.setSelected(this.hovered);
	        },


	        /**
	         * Tab key listener.
	         * Select hovered option if it exists, close dropdown, then allow
	         * native handling to move to next tabbable element.
	         */
	        tabPressed: function tabPressed() {
	            if (this.hovered === null) {
	                this.isActive = false;
	                return;
	            }
	            this.setSelected(this.hovered);
	        },


	        /**
	         * Close dropdown if clicked outside.
	         */
	        clickedOutside: function clickedOutside(event) {
	            if (this.whiteList.indexOf(event.target) < 0) this.isActive = false;
	        },


	        /**
	         * Return display text for the input.
	         * If object, get value from path, or else just the value.
	         * If hightlight, find the text with regex and make bold.
	         */
	        getValue: function getValue(option) {
	            var isHighlight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	            if (!option) return;

	            var value = (typeof option === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(option)) === 'object' ? Object(__WEBPACK_IMPORTED_MODULE_3__utils_helpers__["b" /* getValueByPath */])(option, this.field) : option;

	            var escapedValue = typeof this.newValue === 'string' ? Object(__WEBPACK_IMPORTED_MODULE_3__utils_helpers__["a" /* escapeRegExpChars */])(this.newValue) : this.newValue;
	            var regex = new RegExp('(' + escapedValue + ')', 'gi');

	            return isHighlight ? value.replace(regex, '<b>$1</b>') : value;
	        },


	        /**
	         * Calculate if the dropdown is vertically visible when activated,
	         * otherwise it is openened upwards.
	         */
	        calcDropdownInViewportVertical: function calcDropdownInViewportVertical() {
	            var _this4 = this;

	            this.$nextTick(function () {
	                /**
	                 * this.$refs.dropdown may be undefined
	                 * when Autocomplete is conditional rendered
	                 */
	                if (_this4.$refs.dropdown === undefined) return;

	                var rect = _this4.$refs.dropdown.getBoundingClientRect();

	                _this4.isListInViewportVertically = rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
	            });
	        },


	        /**
	         * Arrows keys listener.
	         * If dropdown is active, set hovered option, or else just open.
	         */
	        keyArrows: function keyArrows(direction) {
	            var sum = direction === 'down' ? 1 : -1;
	            if (this.isActive) {
	                var index = this.data.indexOf(this.hovered) + sum;
	                index = index > this.data.length - 1 ? this.data.length : index;
	                index = index < 0 ? 0 : index;

	                this.setHovered(this.data[index]);

	                var list = this.$refs.dropdown.querySelector('.dropdown-content');
	                var element = list.querySelectorAll('.dropdown-item:not(.is-disabled)')[index];

	                if (!element) return;

	                var visMin = list.scrollTop;
	                var visMax = list.scrollTop + list.clientHeight - element.clientHeight;

	                if (element.offsetTop < visMin) {
	                    list.scrollTop = element.offsetTop;
	                } else if (element.offsetTop >= visMax) {
	                    list.scrollTop = element.offsetTop - list.clientHeight + element.clientHeight;
	                }
	            } else {
	                this.isActive = true;
	            }
	        },


	        /**
	         * Focus listener.
	         * If value is the same as selected, select all text.
	         */
	        focused: function focused(event) {
	            if (this.getValue(this.selected) === this.newValue) {
	                this.$el.querySelector('input').select();
	            }
	            if (this.openOnFocus) {
	                this.isActive = true;
	                if (this.keepFirst) {
	                    this.selectFirstOption(this.data);
	                }
	            }
	            this.hasFocus = true;
	            this.$emit('focus', event);
	        },


	        /**
	         * Blur listener.
	        */
	        onBlur: function onBlur(event) {
	            this.hasFocus = false;
	            this.$emit('blur', event);
	        }
	    },
	    created: function created() {
	        if (typeof window !== 'undefined') {
	            document.addEventListener('click', this.clickedOutside);
	            window.addEventListener('resize', this.calcDropdownInViewportVertical);
	        }
	    },
	    beforeDestroy: function beforeDestroy() {
	        if (typeof window !== 'undefined') {
	            document.removeEventListener('click', this.clickedOutside);
	            window.removeEventListener('resize', this.calcDropdownInViewportVertical);
	        }
	    }
	});

	/***/ }),
	/* 77 */
	/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(78), __esModule: true };

	/***/ }),
	/* 78 */
	/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(38);
	__webpack_require__(56);
	module.exports = __webpack_require__(40).f('iterator');


	/***/ }),
	/* 79 */
	/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(32);
	var defined = __webpack_require__(31);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(defined(that));
	    var i = toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};


	/***/ }),
	/* 80 */
	/***/ (function(module, exports, __webpack_require__) {

	var create = __webpack_require__(55);
	var descriptor = __webpack_require__(20);
	var setToStringTag = __webpack_require__(39);
	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(14)(IteratorPrototype, __webpack_require__(4)('iterator'), function () { return this; });

	module.exports = function (Constructor, NAME, next) {
	  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
	  setToStringTag(Constructor, NAME + ' Iterator');
	};


	/***/ }),
	/* 81 */
	/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(9);
	var anObject = __webpack_require__(15);
	var getKeys = __webpack_require__(23);

	module.exports = __webpack_require__(10) ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = getKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};


	/***/ }),
	/* 82 */
	/***/ (function(module, exports, __webpack_require__) {

	var document = __webpack_require__(8).document;
	module.exports = document && document.documentElement;


	/***/ }),
	/* 83 */
	/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has = __webpack_require__(11);
	var toObject = __webpack_require__(37);
	var IE_PROTO = __webpack_require__(33)('IE_PROTO');
	var ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};


	/***/ }),
	/* 84 */
	/***/ (function(module, exports, __webpack_require__) {

	var addToUnscopables = __webpack_require__(85);
	var step = __webpack_require__(86);
	var Iterators = __webpack_require__(21);
	var toIObject = __webpack_require__(16);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(53)(Array, 'Array', function (iterated, kind) {
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return step(1);
	  }
	  if (kind == 'keys') return step(0, index);
	  if (kind == 'values') return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');


	/***/ }),
	/* 85 */
	/***/ (function(module, exports) {

	module.exports = function () { /* empty */ };


	/***/ }),
	/* 86 */
	/***/ (function(module, exports) {

	module.exports = function (done, value) {
	  return { value: value, done: !!done };
	};


	/***/ }),
	/* 87 */
	/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(88);
	__webpack_require__(94);
	__webpack_require__(95);
	__webpack_require__(96);
	module.exports = __webpack_require__(6).Symbol;


	/***/ }),
	/* 88 */
	/***/ (function(module, exports, __webpack_require__) {

	// ECMAScript 6 symbols shim
	var global = __webpack_require__(8);
	var has = __webpack_require__(11);
	var DESCRIPTORS = __webpack_require__(10);
	var $export = __webpack_require__(17);
	var redefine = __webpack_require__(54);
	var META = __webpack_require__(89).KEY;
	var $fails = __webpack_require__(19);
	var shared = __webpack_require__(34);
	var setToStringTag = __webpack_require__(39);
	var uid = __webpack_require__(25);
	var wks = __webpack_require__(4);
	var wksExt = __webpack_require__(40);
	var wksDefine = __webpack_require__(41);
	var enumKeys = __webpack_require__(90);
	var isArray = __webpack_require__(91);
	var anObject = __webpack_require__(15);
	var isObject = __webpack_require__(18);
	var toIObject = __webpack_require__(16);
	var toPrimitive = __webpack_require__(29);
	var createDesc = __webpack_require__(20);
	var _create = __webpack_require__(55);
	var gOPNExt = __webpack_require__(92);
	var $GOPD = __webpack_require__(93);
	var $DP = __webpack_require__(9);
	var $keys = __webpack_require__(23);
	var gOPD = $GOPD.f;
	var dP = $DP.f;
	var gOPN = gOPNExt.f;
	var $Symbol = global.Symbol;
	var $JSON = global.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE = 'prototype';
	var HIDDEN = wks('_hidden');
	var TO_PRIMITIVE = wks('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = shared('symbol-registry');
	var AllSymbols = shared('symbols');
	var OPSymbols = shared('op-symbols');
	var ObjectProto = Object[PROTOTYPE];
	var USE_NATIVE = typeof $Symbol == 'function';
	var QObject = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function () {
	  return _create(dP({}, 'a', {
	    get: function () { return dP(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD(ObjectProto, key);
	  if (protoDesc) delete ObjectProto[key];
	  dP(it, key, D);
	  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if (has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _create(D, { enumerable: createDesc(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = toIObject(it);
	  key = toPrimitive(key, true);
	  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
	  var D = gOPD(it, key);
	  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN(toIObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto;
	  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto) $set.call(OPSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f = $defineProperty;
	  __webpack_require__(57).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(26).f = $propertyIsEnumerable;
	  __webpack_require__(36).f = $getOwnPropertySymbols;

	  if (DESCRIPTORS && !__webpack_require__(24)) {
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function (name) {
	    return wrap(wks(name));
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

	for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    $replacer = replacer = args[1];
	    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!isArray(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(14)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);


	/***/ }),
	/* 89 */
	/***/ (function(module, exports, __webpack_require__) {

	var META = __webpack_require__(25)('meta');
	var isObject = __webpack_require__(18);
	var has = __webpack_require__(11);
	var setDesc = __webpack_require__(9).f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !__webpack_require__(19)(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function (it, create) {
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};


	/***/ }),
	/* 90 */
	/***/ (function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(23);
	var gOPS = __webpack_require__(36);
	var pIE = __webpack_require__(26);
	module.exports = function (it) {
	  var result = getKeys(it);
	  var getSymbols = gOPS.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = pIE.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};


	/***/ }),
	/* 91 */
	/***/ (function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(30);
	module.exports = Array.isArray || function isArray(arg) {
	  return cof(arg) == 'Array';
	};


	/***/ }),
	/* 92 */
	/***/ (function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(16);
	var gOPN = __webpack_require__(57).f;
	var toString = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it) {
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


	/***/ }),
	/* 93 */
	/***/ (function(module, exports, __webpack_require__) {

	var pIE = __webpack_require__(26);
	var createDesc = __webpack_require__(20);
	var toIObject = __webpack_require__(16);
	var toPrimitive = __webpack_require__(29);
	var has = __webpack_require__(11);
	var IE8_DOM_DEFINE = __webpack_require__(46);
	var gOPD = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(10) ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if (IE8_DOM_DEFINE) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
	};


	/***/ }),
	/* 94 */
	/***/ (function(module, exports) {



	/***/ }),
	/* 95 */
	/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(41)('asyncIterator');


	/***/ }),
	/* 96 */
	/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(41)('observable');


	/***/ }),
	/* 97 */
	/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(56);
	__webpack_require__(38);
	module.exports = __webpack_require__(98);


	/***/ }),
	/* 98 */
	/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(15);
	var get = __webpack_require__(59);
	module.exports = __webpack_require__(6).getIterator = function (it) {
	  var iterFn = get(it);
	  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};


	/***/ }),
	/* 99 */
	/***/ (function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(30);
	var TAG = __webpack_require__(4)('toStringTag');
	// ES3 wrong here
	var ARG = cof(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	module.exports = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};


	/***/ }),
	/* 100 */
	/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(101), __esModule: true };

	/***/ }),
	/* 101 */
	/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(102);
	var $Object = __webpack_require__(6).Object;
	module.exports = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};


	/***/ }),
	/* 102 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(17);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(10), 'Object', { defineProperty: __webpack_require__(9).f });


	/***/ }),
	/* 103 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__icon_Icon__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__icon_Icon__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_config__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_FormElementMixin__ = __webpack_require__(12);

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





	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BInput',
	    components: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({}, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a),
	    mixins: [__WEBPACK_IMPORTED_MODULE_3__utils_FormElementMixin__["a" /* default */]],
	    inheritAttrs: false,
	    props: {
	        value: [Number, String],
	        type: {
	            type: String,
	            default: 'text'
	        },
	        passwordReveal: Boolean,
	        hasCounter: {
	            type: Boolean,
	            default: function _default() {
	                return __WEBPACK_IMPORTED_MODULE_2__utils_config__["a" /* default */].defaultInputHasCounter;
	            }
	        }
	    },
	    data: function data() {
	        return {
	            newValue: this.value,
	            newType: this.type,
	            newAutocomplete: this.autocomplete || __WEBPACK_IMPORTED_MODULE_2__utils_config__["a" /* default */].defaultInputAutocomplete,
	            isPasswordVisible: false,
	            _elementRef: this.type === 'textarea' ? 'textarea' : 'input'
	        };
	    },

	    computed: {
	        rootClasses: function rootClasses() {
	            return [this.iconPosition, this.size, {
	                'is-expanded': this.expanded,
	                'is-loading': this.loading,
	                'is-clearfix': !this.hasMessage
	            }];
	        },
	        inputClasses: function inputClasses() {
	            return [this.statusType, this.size, { 'is-rounded': this.rounded }];
	        },
	        hasIconRight: function hasIconRight() {
	            return this.passwordReveal || this.loading || this.statusType;
	        },


	        /**
	         * Position of the icon or if it's both sides.
	         */
	        iconPosition: function iconPosition() {
	            if (this.icon && this.hasIconRight) {
	                return 'has-icons-left has-icons-right';
	            } else if (!this.icon && this.hasIconRight) {
	                return 'has-icons-right';
	            } else if (this.icon) {
	                return 'has-icons-left';
	            }
	        },


	        /**
	         * Icon name (MDI) based on the type.
	         */
	        statusTypeIcon: function statusTypeIcon() {
	            switch (this.statusType) {
	                case 'is-success':
	                    return 'check';
	                case 'is-danger':
	                    return 'alert-circle';
	                case 'is-info':
	                    return 'information';
	                case 'is-warning':
	                    return 'alert';
	            }
	        },


	        /**
	         * Check if have any message prop from parent if it's a Field.
	         */
	        hasMessage: function hasMessage() {
	            return !!this.statusMessage;
	        },


	        /**
	         * Current password-reveal icon name.
	         */
	        passwordVisibleIcon: function passwordVisibleIcon() {
	            return !this.isPasswordVisible ? 'eye' : 'eye-off';
	        },

	        /**
	         * Get value length
	         */
	        valueLength: function valueLength() {
	            if (typeof this.newValue === 'string') {
	                return this.newValue.length;
	            } else if (typeof this.newValue === 'number') {
	                return this.newValue.toString().length;
	            }
	            return 0;
	        }
	    },
	    watch: {
	        /**
	         * When v-model is changed:
	         *   1. Set internal value.
	         *   2. If it's invalid, validate again.
	         */
	        value: function value(_value) {
	            this.newValue = _value;
	        },


	        /**
	         * Update user's v-model and validate again whenever
	         * internal value is changed.
	         */
	        newValue: function newValue(value) {
	            this.$emit('input', value);
	            !this.isValid && this.checkHtml5Validity();
	        }
	    },
	    methods: {
	        /**
	         * Toggle the visibility of a password-reveal input
	         * by changing the type and focus the input right away.
	         */
	        togglePasswordVisibility: function togglePasswordVisibility() {
	            var _this = this;

	            this.isPasswordVisible = !this.isPasswordVisible;
	            this.newType = this.isPasswordVisible ? 'text' : 'password';

	            this.$nextTick(function () {
	                _this.$refs.input.focus();
	            });
	        },


	        /**
	         * Input's 'input' event listener, 'nextTick' is used to prevent event firing
	         * before ui update, helps when using masks (Cleavejs and potentially others).
	         */
	        onInput: function onInput(event) {
	            var _this2 = this;

	            this.$nextTick(function () {
	                _this2.newValue = event.target.value;
	            });
	        }
	    }
	});

	/***/ }),
	/* 104 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_config__ = __webpack_require__(2);
	//
	//
	//
	//
	//
	//



	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BIcon',
	    props: {
	        type: [String, Object],
	        pack: String,
	        icon: String,
	        size: String,
	        customSize: String,
	        customClass: String,
	        both: Boolean // This is used internally to show both MDI and FA icon
	    },
	    computed: {
	        /**
	         * Internal icon name based on the pack.
	         * If pack is 'fa', gets the equivalent FA icon name of the MDI,
	         * internal icons are always MDI.
	         */
	        newIcon: function newIcon() {
	            if (!this.both) {
	                if (this.newPack === 'mdi') {
	                    return this.newPack + '-' + this.icon;
	                } else {
	                    return 'fa-' + this.icon;
	                }
	            }

	            return this.newPack === 'mdi' ? this.newPack + '-' + this.icon : 'fa-' + this.getEquivalentIconOf(this.icon);
	        },
	        newPack: function newPack() {
	            return this.pack || __WEBPACK_IMPORTED_MODULE_0__utils_config__["a" /* default */].defaultIconPack;
	        },
	        newType: function newType() {
	            if (!this.type) return;

	            var splitType = [];
	            if (typeof this.type === 'string') {
	                splitType = this.type.split('-');
	            } else {
	                for (var key in this.type) {
	                    if (this.type[key]) {
	                        splitType = key.split('-');
	                        break;
	                    }
	                }
	            }
	            if (splitType.length <= 1) return;

	            return 'has-text-' + splitType[1];
	        },
	        newCustomSize: function newCustomSize() {
	            return this.customSize || this.customSizeByPack;
	        },
	        customSizeByPack: function customSizeByPack() {
	            var defaultSize = this.newPack === 'mdi' ? 'mdi-24px' : 'fa-lg';
	            var mediumSize = this.newPack === 'mdi' ? 'mdi-36px' : 'fa-2x';
	            var largeSize = this.newPack === 'mdi' ? 'mdi-48px' : 'fa-3x';
	            switch (this.size) {
	                case 'is-small':
	                    return;
	                case 'is-medium':
	                    return mediumSize;
	                case 'is-large':
	                    return largeSize;
	                default:
	                    return defaultSize;
	            }
	        }
	    },
	    methods: {
	        /**
	         * Equivalent FA icon name of the MDI.
	         */
	        getEquivalentIconOf: function getEquivalentIconOf(value) {
	            switch (value) {
	                case 'check':
	                    return 'check';
	                case 'information':
	                    return 'info-circle';
	                case 'check-circle':
	                    return 'check-circle';
	                case 'alert':
	                    return 'exclamation-triangle';
	                case 'alert-circle':
	                    return 'exclamation-circle';
	                case 'arrow-up':
	                    return 'arrow-up';
	                case 'chevron-right':
	                    return 'angle-right';
	                case 'chevron-left':
	                    return 'angle-left';
	                case 'chevron-down':
	                    return 'angle-down';
	                case 'eye':
	                    return 'eye';
	                case 'eye-off':
	                    return 'eye-slash';
	                case 'menu-down':
	                    return 'caret-down';
	                case 'menu-up':
	                    return 'caret-up';
	                default:
	                    return value;
	            }
	        }
	    }
	});

	/***/ }),
	/* 105 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('span', {
	    staticClass: "icon",
	    class: [_vm.newType, _vm.size]
	  }, [_c('i', {
	    class: [_vm.newPack, _vm.newIcon, _vm.newCustomSize, _vm.customClass]
	  })])
	},staticRenderFns: []};

	/***/ }),
	/* 106 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "control",
	    class: _vm.rootClasses
	  }, [(_vm.type !== 'textarea') ? _c('input', _vm._b({
	    ref: "input",
	    staticClass: "input",
	    class: _vm.inputClasses,
	    attrs: {
	      "type": _vm.newType,
	      "autocomplete": _vm.newAutocomplete,
	      "maxlength": _vm.maxlength
	    },
	    domProps: {
	      "value": _vm.newValue
	    },
	    on: {
	      "input": _vm.onInput,
	      "blur": _vm.onBlur,
	      "focus": _vm.onFocus
	    }
	  }, 'input', _vm.$attrs, false)) : _c('textarea', _vm._b({
	    ref: "textarea",
	    staticClass: "textarea",
	    class: _vm.inputClasses,
	    attrs: {
	      "maxlength": _vm.maxlength
	    },
	    domProps: {
	      "value": _vm.newValue
	    },
	    on: {
	      "input": _vm.onInput,
	      "blur": _vm.onBlur,
	      "focus": _vm.onFocus
	    }
	  }, 'textarea', _vm.$attrs, false)), _vm._v(" "), (_vm.icon) ? _c('b-icon', {
	    staticClass: "is-left",
	    attrs: {
	      "icon": _vm.icon,
	      "pack": _vm.iconPack,
	      "size": _vm.iconSize
	    }
	  }) : _vm._e(), _vm._v(" "), (!_vm.loading && (_vm.passwordReveal || _vm.statusType)) ? _c('b-icon', {
	    staticClass: "is-right",
	    class: {
	      'is-clickable': _vm.passwordReveal
	    },
	    attrs: {
	      "icon": _vm.passwordReveal ? _vm.passwordVisibleIcon : _vm.statusTypeIcon,
	      "pack": _vm.iconPack,
	      "size": _vm.iconSize,
	      "type": !_vm.passwordReveal ? _vm.statusType : 'is-primary',
	      "both": ""
	    },
	    nativeOn: {
	      "click": function($event) {
	        _vm.togglePasswordVisibility($event);
	      }
	    }
	  }) : _vm._e(), _vm._v(" "), (_vm.maxlength && _vm.hasCounter && _vm.type !== 'number') ? _c('small', {
	    staticClass: "help counter",
	    class: {
	      'is-invisible': !_vm.isFocused
	    }
	  }, [_vm._v("\n        " + _vm._s(_vm.valueLength) + " / " + _vm._s(_vm.maxlength) + "\n    ")]) : _vm._e()], 1)
	},staticRenderFns: []};

	/***/ }),
	/* 107 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "autocomplete control",
	    class: {
	      'is-expanded': _vm.expanded
	    }
	  }, [_c('b-input', _vm._b({
	    ref: "input",
	    attrs: {
	      "size": _vm.size,
	      "loading": _vm.loading,
	      "rounded": _vm.rounded,
	      "icon": _vm.icon,
	      "icon-pack": _vm.iconPack,
	      "maxlength": _vm.maxlength,
	      "autocomplete": "off"
	    },
	    on: {
	      "focus": _vm.focused,
	      "blur": _vm.onBlur
	    },
	    nativeOn: {
	      "keyup": function($event) {
	        if (!('button' in $event) && _vm._k($event.keyCode, "esc", 27, $event.key)) { return null; }
	        $event.preventDefault();
	        _vm.isActive = false;
	      },
	      "keydown": [function($event) {
	        if (!('button' in $event) && _vm._k($event.keyCode, "tab", 9, $event.key)) { return null; }
	        _vm.tabPressed($event);
	      }, function($event) {
	        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) { return null; }
	        $event.preventDefault();
	        _vm.enterPressed($event);
	      }, function($event) {
	        if (!('button' in $event) && _vm._k($event.keyCode, "up", 38, $event.key)) { return null; }
	        $event.preventDefault();
	        _vm.keyArrows('up');
	      }, function($event) {
	        if (!('button' in $event) && _vm._k($event.keyCode, "down", 40, $event.key)) { return null; }
	        $event.preventDefault();
	        _vm.keyArrows('down');
	      }]
	    },
	    model: {
	      value: (_vm.newValue),
	      callback: function($$v) {
	        _vm.newValue = $$v;
	      },
	      expression: "newValue"
	    }
	  }, 'b-input', _vm.$attrs, false)), _vm._v(" "), _c('transition', {
	    attrs: {
	      "name": "fade"
	    }
	  }, [_c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.isActive && (_vm.data.length > 0 || _vm.hasEmptySlot || _vm.hasHeaderSlot)),
	      expression: "isActive && (data.length > 0 || hasEmptySlot || hasHeaderSlot)"
	    }],
	    ref: "dropdown",
	    staticClass: "dropdown-menu",
	    class: {
	      'is-opened-top': !_vm.isListInViewportVertically
	    }
	  }, [_c('div', {
	    staticClass: "dropdown-content"
	  }, [(_vm.hasHeaderSlot) ? _c('div', {
	    staticClass: "dropdown-item"
	  }, [_vm._t("header")], 2) : _vm._e(), _vm._v(" "), _vm._l((_vm.data), function(option, index) {
	    return _c('a', {
	      directives: [{
	        name: "show",
	        rawName: "v-show",
	        value: (_vm.isActive),
	        expression: "isActive"
	      }],
	      key: index,
	      staticClass: "dropdown-item",
	      class: {
	        'is-hovered': option === _vm.hovered
	      },
	      on: {
	        "click": function($event) {
	          _vm.setSelected(option);
	        }
	      }
	    }, [(_vm.hasDefaultSlot) ? _vm._t("default", null, {
	      option: option,
	      index: index
	    }) : _c('span', {
	      domProps: {
	        "innerHTML": _vm._s(_vm.getValue(option, true))
	      }
	    })], 2)
	  }), _vm._v(" "), (_vm.data.length === 0 && _vm.hasEmptySlot) ? _c('div', {
	    staticClass: "dropdown-item is-disabled"
	  }, [_vm._t("empty")], 2) : _vm._e()], 2)])])], 1)
	},staticRenderFns: []};

	/***/ }),
	/* 108 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__);

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

	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BCheckbox',
	    props: {
	        value: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
	        nativeValue: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
	        indeterminate: Boolean,
	        type: String,
	        disabled: Boolean,
	        required: Boolean,
	        name: String,
	        size: String,
	        trueValue: {
	            type: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
	            default: true
	        },
	        falseValue: {
	            type: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
	            default: false
	        }
	    },
	    data: function data() {
	        return {
	            newValue: this.value
	        };
	    },

	    computed: {
	        computedValue: {
	            get: function get() {
	                return this.newValue;
	            },
	            set: function set(value) {
	                this.newValue = value;
	                this.$emit('input', value);
	            }
	        }
	    },
	    watch: {
	        /**
	         * When v-model change, set internal value.
	         */
	        value: function value(_value) {
	            this.newValue = _value;
	        }
	    }
	});

	/***/ }),
	/* 109 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('label', {
	    ref: "label",
	    staticClass: "b-checkbox checkbox",
	    class: [_vm.size, {
	      'is-disabled': _vm.disabled
	    }],
	    attrs: {
	      "disabled": _vm.disabled,
	      "tabindex": _vm.disabled ? false : 0
	    },
	    on: {
	      "keydown": function($event) {
	        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key) && _vm._k($event.keyCode, "space", 32, $event.key)) { return null; }
	        $event.preventDefault();
	        _vm.$refs.label.click();
	      }
	    }
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.computedValue),
	      expression: "computedValue"
	    }],
	    attrs: {
	      "type": "checkbox",
	      "disabled": _vm.disabled,
	      "required": _vm.required,
	      "name": _vm.name,
	      "true-value": _vm.trueValue,
	      "false-value": _vm.falseValue
	    },
	    domProps: {
	      "indeterminate": _vm.indeterminate,
	      "value": _vm.nativeValue,
	      "checked": Array.isArray(_vm.computedValue) ? _vm._i(_vm.computedValue, _vm.nativeValue) > -1 : _vm._q(_vm.computedValue, _vm.trueValue)
	    },
	    on: {
	      "change": function($event) {
	        var $$a = _vm.computedValue,
	          $$el = $event.target,
	          $$c = $$el.checked ? (_vm.trueValue) : (_vm.falseValue);
	        if (Array.isArray($$a)) {
	          var $$v = _vm.nativeValue,
	            $$i = _vm._i($$a, $$v);
	          if ($$el.checked) {
	            $$i < 0 && (_vm.computedValue = $$a.concat([$$v]));
	          } else {
	            $$i > -1 && (_vm.computedValue = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
	          }
	        } else {
	          _vm.computedValue = $$c;
	        }
	      }
	    }
	  }), _vm._v(" "), _c('span', {
	    staticClass: "check",
	    class: _vm.type
	  }), _vm._v(" "), _c('span', {
	    staticClass: "control-label"
	  }, [_vm._t("default")], 2)])
	},staticRenderFns: []};

	/***/ }),
	/* 110 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(111),
	  /* template */
	  __webpack_require__(112),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 111 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__);

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

	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BCheckboxButton',
	    props: {
	        value: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
	        nativeValue: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
	        disabled: Boolean,
	        name: String,
	        size: String,
	        type: {
	            type: String,
	            default: 'is-primary'
	        }
	    },
	    data: function data() {
	        return {
	            newValue: this.value
	        };
	    },

	    computed: {
	        computedValue: {
	            get: function get() {
	                return this.newValue;
	            },
	            set: function set(value) {
	                this.newValue = value;
	                this.$emit('input', value);
	            }
	        },
	        checked: function checked() {
	            if (Array.isArray(this.newValue)) {
	                return this.newValue.indexOf(this.nativeValue) >= 0;
	            }
	            return this.newValue === this.nativeValue;
	        }
	    },
	    watch: {
	        /**
	         * When v-model change, set internal value.
	         */
	        value: function value(_value) {
	            this.newValue = _value;
	        }
	    }
	});

	/***/ }),
	/* 112 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "control"
	  }, [_c('label', {
	    ref: "label",
	    staticClass: "b-checkbox checkbox button",
	    class: [_vm.checked ? _vm.type : null, _vm.size, {
	      'is-disabled': _vm.disabled
	    }],
	    attrs: {
	      "disabled": _vm.disabled,
	      "tabindex": _vm.disabled ? false : 0
	    },
	    on: {
	      "keydown": function($event) {
	        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key) && _vm._k($event.keyCode, "space", 32, $event.key)) { return null; }
	        $event.preventDefault();
	        _vm.$refs.label.click();
	      }
	    }
	  }, [_vm._t("default"), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.computedValue),
	      expression: "computedValue"
	    }],
	    attrs: {
	      "type": "checkbox",
	      "disabled": _vm.disabled,
	      "name": _vm.name
	    },
	    domProps: {
	      "value": _vm.nativeValue,
	      "checked": Array.isArray(_vm.computedValue) ? _vm._i(_vm.computedValue, _vm.nativeValue) > -1 : (_vm.computedValue)
	    },
	    on: {
	      "change": function($event) {
	        var $$a = _vm.computedValue,
	          $$el = $event.target,
	          $$c = $$el.checked ? (true) : (false);
	        if (Array.isArray($$a)) {
	          var $$v = _vm.nativeValue,
	            $$i = _vm._i($$a, $$v);
	          if ($$el.checked) {
	            $$i < 0 && (_vm.computedValue = $$a.concat([$$v]));
	          } else {
	            $$i > -1 && (_vm.computedValue = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
	          }
	        } else {
	          _vm.computedValue = $$c;
	        }
	      }
	    }
	  })], 2)])
	},staticRenderFns: []};

	/***/ }),
	/* 113 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(114),
	  /* template */
	  __webpack_require__(115),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 114 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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

	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BCollapse',
	    props: {
	        open: {
	            type: Boolean,
	            default: true
	        },
	        animation: {
	            type: String,
	            default: 'fade'
	        }
	    },
	    data: function data() {
	        return {
	            isOpen: this.open
	        };
	    },

	    watch: {
	        open: function open(value) {
	            this.isOpen = value;
	        }
	    },
	    methods: {
	        /**
	         * Toggle and emit events
	         */
	        toggle: function toggle() {
	            this.isOpen = !this.isOpen;
	            this.$emit('update:open', this.isOpen);
	            this.$emit(this.isOpen ? 'open' : 'close');
	        }
	    }
	});

	/***/ }),
	/* 115 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "collapse"
	  }, [_c('div', {
	    staticClass: "collapse-trigger",
	    on: {
	      "click": _vm.toggle
	    }
	  }, [_vm._t("trigger", null, {
	    open: _vm.isOpen
	  })], 2), _vm._v(" "), _c('transition', {
	    attrs: {
	      "name": _vm.animation
	    }
	  }, [_c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.isOpen),
	      expression: "isOpen"
	    }],
	    staticClass: "collapse-content"
	  }, [_vm._t("default")], 2)])], 1)
	},staticRenderFns: []};

	/***/ }),
	/* 116 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(117),
	  /* template */
	  __webpack_require__(134),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 117 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_FormElementMixin__ = __webpack_require__(12);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_helpers__ = __webpack_require__(7);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_config__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dropdown_Dropdown__ = __webpack_require__(42);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dropdown_Dropdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__dropdown_Dropdown__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dropdown_DropdownItem__ = __webpack_require__(43);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dropdown_DropdownItem___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__dropdown_DropdownItem__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__input_Input__ = __webpack_require__(27);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__input_Input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__input_Input__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__field_Field__ = __webpack_require__(44);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__field_Field___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__field_Field__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__select_Select__ = __webpack_require__(28);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__select_Select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__select_Select__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__icon_Icon__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__icon_Icon__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__DatepickerTable__ = __webpack_require__(128);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__DatepickerTable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__DatepickerTable__);


	var _components;

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













	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BDatepicker',
	    components: (_components = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_10__DatepickerTable___default.a.name, __WEBPACK_IMPORTED_MODULE_10__DatepickerTable___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_6__input_Input___default.a.name, __WEBPACK_IMPORTED_MODULE_6__input_Input___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_7__field_Field___default.a.name, __WEBPACK_IMPORTED_MODULE_7__field_Field___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_8__select_Select___default.a.name, __WEBPACK_IMPORTED_MODULE_8__select_Select___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_9__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_9__icon_Icon___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_4__dropdown_Dropdown___default.a.name, __WEBPACK_IMPORTED_MODULE_4__dropdown_Dropdown___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_5__dropdown_DropdownItem___default.a.name, __WEBPACK_IMPORTED_MODULE_5__dropdown_DropdownItem___default.a), _components),
	    mixins: [__WEBPACK_IMPORTED_MODULE_1__utils_FormElementMixin__["a" /* default */]],
	    inheritAttrs: false,
	    props: {
	        value: Date,
	        dayNames: {
	            type: Array,
	            default: function _default() {
	                if (Array.isArray(__WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultDayNames)) {
	                    return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultDayNames;
	                } else {
	                    return ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'S'];
	                }
	            }
	        },
	        monthNames: {
	            type: Array,
	            default: function _default() {
	                if (Array.isArray(__WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultMonthNames)) {
	                    return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultMonthNames;
	                } else {
	                    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	                }
	            }
	        },
	        firstDayOfWeek: {
	            type: Number,
	            default: function _default() {
	                if (typeof __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultFirstDayOfWeek === 'number') {
	                    return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultFirstDayOfWeek;
	                } else {
	                    return 0;
	                }
	            }
	        },
	        inline: Boolean,
	        minDate: Date,
	        maxDate: Date,
	        focusedDate: Date,
	        placeholder: String,
	        editable: Boolean,
	        disabled: Boolean,
	        unselectableDates: Array,
	        unselectableDaysOfWeek: {
	            type: Array,
	            default: function _default() {
	                return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultUnselectableDaysOfWeek;
	            }
	        },
	        selectableDates: Array,
	        dateFormatter: {
	            type: Function,
	            default: function _default(date) {
	                if (typeof __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultDateFormatter === 'function') {
	                    return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultDateFormatter(date);
	                } else {
	                    var yyyyMMdd = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
	                    var d = new Date(yyyyMMdd);
	                    return d.toLocaleDateString();
	                }
	            }
	        },
	        dateParser: {
	            type: Function,
	            default: function _default(date) {
	                if (typeof __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultDateParser === 'function') {
	                    return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultDateParser(date);
	                } else {
	                    return new Date(Date.parse(date));
	                }
	            }
	        },
	        dateCreator: {
	            type: Function,
	            default: function _default() {
	                if (typeof __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultDateCreator === 'function') {
	                    return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultDateCreator();
	                } else {
	                    return new Date();
	                }
	            }
	        },
	        mobileNative: {
	            type: Boolean,
	            default: function _default() {
	                return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultDatepickerMobileNative;
	            }
	        },
	        position: String,
	        events: Array,
	        indicators: {
	            type: String,
	            default: 'dots'
	        }
	    },
	    data: function data() {
	        var focusedDate = this.value || this.focusedDate || this.dateCreator();

	        return {
	            dateSelected: this.value,
	            focusedDateData: {
	                month: focusedDate.getMonth(),
	                year: focusedDate.getFullYear()
	            },
	            _elementRef: 'input',
	            _isDatepicker: true
	        };
	    },

	    computed: {
	        /*
	        * Returns an array of years for the year dropdown. If earliest/latest
	        * dates are set by props, range of years will fall within those dates.
	        */
	        listOfYears: function listOfYears() {
	            var latestYear = this.maxDate ? this.maxDate.getFullYear() : Math.max(this.dateCreator().getFullYear(), this.focusedDateData.year) + 3;

	            var earliestYear = this.minDate ? this.minDate.getFullYear() : 1900;

	            var arrayOfYears = [];
	            for (var i = earliestYear; i <= latestYear; i++) {
	                arrayOfYears.push(i);
	            }

	            return arrayOfYears.reverse();
	        },
	        isFirstMonth: function isFirstMonth() {
	            if (!this.minDate) return false;
	            var dateToCheck = new Date(this.focusedDateData.year, this.focusedDateData.month);
	            var date = new Date(this.minDate.getFullYear(), this.minDate.getMonth());
	            return dateToCheck <= date;
	        },
	        isLastMonth: function isLastMonth() {
	            if (!this.maxDate) return false;
	            var dateToCheck = new Date(this.focusedDateData.year, this.focusedDateData.month);
	            var date = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth());
	            return dateToCheck >= date;
	        },
	        isMobile: function isMobile() {
	            return this.mobileNative && __WEBPACK_IMPORTED_MODULE_2__utils_helpers__["d" /* isMobile */].any();
	        }
	    },
	    watch: {
	        /*
	        * Emit input event with selected date as payload, set isActive to false.
	        * Update internal focusedDateData
	        */
	        dateSelected: function dateSelected(value) {
	            var currentDate = !value ? this.dateCreator() : value;
	            this.focusedDateData = {
	                month: currentDate.getMonth(),
	                year: currentDate.getFullYear()
	            };
	            this.$emit('input', value);
	            if (this.$refs.dropdown) {
	                this.$refs.dropdown.isActive = false;
	            }
	        },


	        /**
	         * When v-model is changed:
	         *   1. Update internal value.
	         *   2. If it's invalid, validate again.
	         */
	        value: function value(_value) {
	            this.dateSelected = _value;

	            !this.isValid && this.$refs.input.checkHtml5Validity();
	        },
	        focusedDate: function focusedDate(value) {
	            if (value) {
	                this.focusedDateData = {
	                    month: value.getMonth(),
	                    year: value.getFullYear()
	                };
	            }
	        },


	        /*
	        * Emit input event on month and/or year change
	        */
	        'focusedDateData.month': function focusedDateDataMonth(value) {
	            this.$emit('change-month', value);
	        },
	        'focusedDateData.year': function focusedDateDataYear(value) {
	            this.$emit('change-year', value);
	        }
	    },
	    methods: {
	        /*
	        * Emit input event with selected date as payload for v-model in parent
	        */
	        updateSelectedDate: function updateSelectedDate(date) {
	            this.dateSelected = date;
	        },


	        /*
	        * Parse string into date
	        */
	        onChange: function onChange(value) {
	            var date = this.dateParser(value);
	            if (date && !isNaN(date)) {
	                this.dateSelected = date;
	            } else {
	                // Force refresh input value when not valid date
	                this.dateSelected = null;
	                this.$refs.input.newValue = this.dateSelected;
	            }
	        },


	        /*
	        * Format date into string
	        */
	        formatValue: function formatValue(value) {
	            if (value && !isNaN(value)) {
	                return this.dateFormatter(value);
	            } else {
	                return null;
	            }
	        },


	        /*
	        * Either decrement month by 1 if not January or decrement year by 1
	        * and set month to 11 (December)
	        */
	        decrementMonth: function decrementMonth() {
	            if (this.disabled) return;

	            if (this.focusedDateData.month > 0) {
	                this.focusedDateData.month -= 1;
	            } else {
	                this.focusedDateData.month = 11;
	                this.focusedDateData.year -= 1;
	            }
	        },


	        /*
	        * Either increment month by 1 if not December or increment year by 1
	        * and set month to 0 (January)
	        */
	        incrementMonth: function incrementMonth() {
	            if (this.disabled) return;

	            if (this.focusedDateData.month < 11) {
	                this.focusedDateData.month += 1;
	            } else {
	                this.focusedDateData.month = 0;
	                this.focusedDateData.year += 1;
	            }
	        },


	        /*
	        * Format date into string 'YYYY-MM-DD'
	        */
	        formatYYYYMMDD: function formatYYYYMMDD(value) {
	            var date = new Date(value);
	            if (value && !isNaN(date)) {
	                var year = date.getFullYear();
	                var month = date.getMonth() + 1;
	                var day = date.getDate();
	                return year + '-' + ((month < 10 ? '0' : '') + month) + '-' + ((day < 10 ? '0' : '') + day);
	            }
	            return '';
	        },


	        /*
	        * Parse date from string
	        */
	        onChangeNativePicker: function onChangeNativePicker(event) {
	            var date = event.target.value;
	            this.dateSelected = date ? new Date(date.replace(/-/g, '/')) : null;
	        }
	    }
	});

	/***/ }),
	/* 118 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__ = __webpack_require__(58);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_symbol__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_symbol__);


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

	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BDropdown',
	    props: {
	        value: {
	            type: [String, Number, Boolean, Object, Array, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_symbol___default.a, Function],
	            default: null
	        },
	        disabled: Boolean,
	        hoverable: Boolean,
	        inline: Boolean,
	        position: {
	            type: String,
	            validator: function validator(value) {
	                return ['is-top-right', 'is-top-left', 'is-bottom-left'].indexOf(value) > -1;
	            }
	        },
	        mobileModal: {
	            type: Boolean,
	            default: true
	        }
	    },
	    data: function data() {
	        return {
	            selected: this.value,
	            isActive: false,
	            _isDropdown: true // Used internally by DropdownItem
	        };
	    },

	    computed: {
	        rootClasses: function rootClasses() {
	            return [this.position, {
	                'is-disabled': this.disabled,
	                'is-hoverable': this.hoverable,
	                'is-inline': this.inline,
	                'is-active': this.isActive || this.inline,
	                'is-mobile-modal': this.isMobileModal
	            }];
	        },
	        isMobileModal: function isMobileModal() {
	            return this.mobileModal && !this.inline && !this.hoverable;
	        }
	    },
	    watch: {
	        /**
	         * When v-model is changed set the new selected item.
	         */
	        value: function value(_value) {
	            this.selected = _value;
	        },


	        /**
	         * Emit event when isActive value is changed.
	         */
	        isActive: function isActive(value) {
	            this.$emit('active-change', value);
	        }
	    },
	    methods: {
	        /**
	         * Click listener from DropdownItem.
	         *   1. Set new selected item.
	         *   2. Emit input event to update the user v-model.
	         *   3. Close the dropdown.
	         */
	        selectItem: function selectItem(value) {
	            if (this.selected !== value) {
	                this.$emit('change', value);
	                this.selected = value;
	            }
	            this.$emit('input', value);
	            this.isActive = false;
	        },


	        /**
	         * White-listed items to not close when clicked.
	         */
	        isInWhiteList: function isInWhiteList(el) {
	            if (el === this.$refs.dropdownMenu) return true;
	            if (el === this.$refs.trigger) return true;
	            // All chidren from dropdown
	            if (this.$refs.dropdownMenu !== undefined) {
	                var children = this.$refs.dropdownMenu.querySelectorAll('*');
	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;

	                try {
	                    for (var _iterator = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default()(children), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                        var child = _step.value;

	                        if (el === child) {
	                            return true;
	                        }
	                    }
	                } catch (err) {
	                    _didIteratorError = true;
	                    _iteratorError = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion && _iterator.return) {
	                            _iterator.return();
	                        }
	                    } finally {
	                        if (_didIteratorError) {
	                            throw _iteratorError;
	                        }
	                    }
	                }
	            }
	            // All children from trigger
	            if (this.$refs.trigger !== undefined) {
	                var _children = this.$refs.trigger.querySelectorAll('*');
	                var _iteratorNormalCompletion2 = true;
	                var _didIteratorError2 = false;
	                var _iteratorError2 = undefined;

	                try {
	                    for (var _iterator2 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default()(_children), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                        var _child = _step2.value;

	                        if (el === _child) {
	                            return true;
	                        }
	                    }
	                } catch (err) {
	                    _didIteratorError2 = true;
	                    _iteratorError2 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                            _iterator2.return();
	                        }
	                    } finally {
	                        if (_didIteratorError2) {
	                            throw _iteratorError2;
	                        }
	                    }
	                }
	            }

	            return false;
	        },


	        /**
	         * Close dropdown if clicked outside.
	         */
	        clickedOutside: function clickedOutside(event) {
	            if (this.inline) return;

	            if (!this.isInWhiteList(event.target)) this.isActive = false;
	        },


	        /**
	         * Toggle dropdown if it's not disabled.
	         */
	        toggle: function toggle() {
	            var _this = this;

	            if (this.disabled || this.hoverable) return;

	            if (!this.isActive) {
	                // if not active, toggle after clickOutside event
	                // this fixes toggling programmatic
	                this.$nextTick(function () {
	                    _this.isActive = !_this.isActive;
	                });
	            } else {
	                this.isActive = !this.isActive;
	            }
	        }
	    },
	    created: function created() {
	        if (typeof window !== 'undefined') {
	            document.addEventListener('click', this.clickedOutside);
	        }
	    },
	    beforeDestroy: function beforeDestroy() {
	        if (typeof window !== 'undefined') {
	            document.removeEventListener('click', this.clickedOutside);
	        }
	    }
	});

	/***/ }),
	/* 119 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "dropdown",
	    class: _vm.rootClasses
	  }, [(!_vm.inline) ? _c('div', {
	    ref: "trigger",
	    staticClass: "dropdown-trigger",
	    attrs: {
	      "role": "button"
	    },
	    on: {
	      "click": _vm.toggle
	    }
	  }, [_vm._t("trigger")], 2) : _vm._e(), _vm._v(" "), _c('transition', {
	    attrs: {
	      "name": "fade"
	    }
	  }, [(_vm.isMobileModal) ? _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.isActive),
	      expression: "isActive"
	    }],
	    staticClass: "background"
	  }) : _vm._e()]), _vm._v(" "), _c('transition', {
	    attrs: {
	      "name": "fade"
	    }
	  }, [_c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: ((!_vm.disabled && (_vm.isActive || _vm.hoverable)) || _vm.inline),
	      expression: "(!disabled && (isActive || hoverable)) || inline"
	    }],
	    ref: "dropdownMenu",
	    staticClass: "dropdown-menu"
	  }, [_c('div', {
	    staticClass: "dropdown-content"
	  }, [_vm._t("default")], 2)])])], 1)
	},staticRenderFns: []};

	/***/ }),
	/* 120 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__);

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

	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BDropdownItem',
	    props: {
	        value: {
	            type: [String, Number, Boolean, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a, Function],
	            default: null
	        },
	        separator: Boolean,
	        disabled: Boolean,
	        custom: Boolean,
	        paddingless: Boolean,
	        hasLink: Boolean
	    },
	    computed: {
	        anchorClasses: function anchorClasses() {
	            return {
	                'is-disabled': this.$parent.disabled || this.disabled,
	                'is-paddingless': this.paddingless,
	                'is-active': this.value !== null && this.value === this.$parent.selected
	            };
	        },
	        itemClasses: function itemClasses() {
	            return {
	                'dropdown-item': !this.hasLink,
	                'is-disabled': this.disabled,
	                'is-paddingless': this.paddingless,
	                'is-active': this.value !== null && this.value === this.$parent.selected,
	                'has-link': this.hasLink
	            };
	        },

	        /**
	         * Check if item can be clickable.
	         */
	        isClickable: function isClickable() {
	            return !this.$parent.disabled && !this.separator && !this.disabled && !this.custom;
	        }
	    },
	    methods: {
	        /**
	         * Click listener, select the item.
	         */
	        selectItem: function selectItem() {
	            if (!this.isClickable) return;

	            this.$parent.selectItem(this.value);
	            this.$emit('click');
	        }
	    },
	    created: function created() {
	        if (!this.$parent.$data._isDropdown) {
	            this.$destroy();
	            throw new Error('You should wrap bDropdownItem on a bDropdown');
	        }
	    }
	});

	/***/ }),
	/* 121 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return (_vm.separator) ? _c('hr', {
	    staticClass: "dropdown-divider"
	  }) : (!_vm.custom && !_vm.hasLink) ? _c('a', {
	    staticClass: "dropdown-item",
	    class: _vm.anchorClasses,
	    on: {
	      "click": _vm.selectItem
	    }
	  }, [_vm._t("default")], 2) : _c('div', {
	    class: _vm.itemClasses,
	    on: {
	      "click": _vm.selectItem
	    }
	  }, [_vm._t("default")], 2)
	},staticRenderFns: []};

	/***/ }),
	/* 122 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FieldBody__ = __webpack_require__(123);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FieldBody___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__FieldBody__);

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
	//



	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BField',
	    components: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({}, __WEBPACK_IMPORTED_MODULE_1__FieldBody___default.a.name, __WEBPACK_IMPORTED_MODULE_1__FieldBody___default.a),
	    props: {
	        type: [String, Object],
	        label: String,
	        labelFor: String,
	        message: [String, Array, Object],
	        grouped: Boolean,
	        groupMultiline: Boolean,
	        position: String,
	        expanded: Boolean,
	        horizontal: Boolean,
	        addons: {
	            type: Boolean,
	            default: true
	        },
	        customClass: String
	    },
	    data: function data() {
	        return {
	            newType: this.type,
	            newMessage: this.message,
	            fieldLabelSize: null,
	            _isField: true // Used internally by Input and Select
	        };
	    },

	    computed: {
	        rootClasses: function rootClasses() {
	            return [this.newPosition, {
	                'is-expanded': this.expanded,
	                'is-grouped-multiline': this.groupMultiline,
	                'is-horizontal': this.horizontal
	            }];
	        },

	        /**
	         * Correct Bulma class for the side of the addon or group.
	         *
	         * This is not kept like the others (is-small, etc.),
	         * because since 'has-addons' is set automatically it
	         * doesn't make sense to teach users what addons are exactly.
	         */
	        newPosition: function newPosition() {
	            if (this.position === undefined) return;

	            var position = this.position.split('-');
	            if (position.length < 1) return;

	            var prefix = this.grouped ? 'is-grouped-' : 'has-addons-';

	            if (this.position) return prefix + position[1];
	        },

	        /**
	         * Formatted message in case it's an array
	         * (each element is separated by <br> tag)
	         */
	        formattedMessage: function formattedMessage() {
	            if (typeof this.newMessage === 'string') {
	                return this.newMessage;
	            } else {
	                var messages = [];
	                if (Array.isArray(this.newMessage)) {
	                    this.newMessage.forEach(function (message) {
	                        if (typeof message === 'string') {
	                            messages.push(message);
	                        } else {
	                            for (var key in message) {
	                                if (message[key]) {
	                                    messages.push(key);
	                                }
	                            }
	                        }
	                    });
	                } else {
	                    for (var key in this.newMessage) {
	                        if (this.newMessage[key]) {
	                            messages.push(key);
	                        }
	                    }
	                }
	                return messages.filter(function (m) {
	                    if (m) return m;
	                }).join(' <br> ');
	            }
	        }
	    },
	    watch: {
	        /**
	         * Set internal type when prop change.
	         */
	        type: function type(value) {
	            this.newType = value;
	        },


	        /**
	         * Set internal message when prop change.
	         */
	        message: function message(value) {
	            this.newMessage = value;
	        }
	    },
	    methods: {
	        /**
	         * Field has addons if there are more than one slot
	         * (element / component) in the Field.
	         * Or is grouped when prop is set.
	         * Is a method to be called when component re-render.
	         */
	        fieldType: function fieldType() {
	            if (this.grouped) return 'is-grouped';

	            var renderedNode = 0;
	            if (this.$slots.default) {
	                renderedNode = this.$slots.default.reduce(function (i, node) {
	                    return node.tag ? i + 1 : i;
	                }, 0);
	            }
	            if (renderedNode > 1 && this.addons && !this.horizontal) {
	                return 'has-addons';
	            }
	        }
	    },
	    mounted: function mounted() {
	        if (this.horizontal) {
	            // Bulma docs: .is-normal for any .input or .button
	            var elements = this.$el.querySelectorAll('.input, .select, .button, .textarea');
	            if (elements.length > 0) {
	                this.fieldLabelSize = 'is-normal';
	            }
	        }
	    }
	});

	/***/ }),
	/* 123 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(124),
	  /* template */
	  null,
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 124 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BFieldBody',
	    props: {
	        message: {
	            type: String
	        },
	        type: {
	            type: String
	        }
	    },
	    render: function render(createElement) {
	        var _this = this;

	        return createElement('div', { attrs: { 'class': 'field-body' } }, this.$slots.default.map(function (element) {
	            // skip returns and comments
	            if (!element.tag) {
	                return element;
	            }
	            if (_this.message) {
	                return createElement('b-field', { attrs: { message: _this.message, 'type': _this.type } }, [element]);
	            }
	            return createElement('b-field', { attrs: { 'type': _this.type } }, [element]);
	        }));
	    }
	});

	/***/ }),
	/* 125 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "field",
	    class: [_vm.rootClasses, _vm.fieldType()]
	  }, [(_vm.horizontal) ? _c('div', {
	    staticClass: "field-label",
	    class: [_vm.customClass, _vm.fieldLabelSize]
	  }, [(_vm.label) ? _c('label', {
	    staticClass: "label",
	    attrs: {
	      "for": _vm.labelFor
	    }
	  }, [_vm._v("\n            " + _vm._s(_vm.label) + "\n        ")]) : _vm._e()]) : [(_vm.label) ? _c('label', {
	    staticClass: "label",
	    class: _vm.customClass,
	    attrs: {
	      "for": _vm.labelFor
	    }
	  }, [_vm._v("\n            " + _vm._s(_vm.label) + "\n        ")]) : _vm._e()], _vm._v(" "), (_vm.horizontal) ? _c('b-field-body', {
	    attrs: {
	      "message": _vm.newMessage ? _vm.formattedMessage : '',
	      "type": _vm.newType
	    }
	  }, [_vm._t("default")], 2) : [_vm._t("default")], _vm._v(" "), (_vm.newMessage && !_vm.horizontal) ? _c('p', {
	    staticClass: "help",
	    class: _vm.newType,
	    domProps: {
	      "innerHTML": _vm._s(_vm.formattedMessage)
	    }
	  }) : _vm._e()], 2)
	},staticRenderFns: []};

	/***/ }),
	/* 126 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__icon_Icon__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__icon_Icon__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_FormElementMixin__ = __webpack_require__(12);


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




	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BSelect',
	    components: __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()({}, __WEBPACK_IMPORTED_MODULE_2__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_2__icon_Icon___default.a),
	    mixins: [__WEBPACK_IMPORTED_MODULE_3__utils_FormElementMixin__["a" /* default */]],
	    inheritAttrs: false,
	    props: {
	        value: {
	            type: [String, Number, Boolean, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a, Function],
	            default: null
	        },
	        placeholder: String,
	        multiple: Boolean,
	        nativeSize: [String, Number]
	    },
	    data: function data() {
	        return {
	            selected: this.value,
	            _elementRef: 'select'
	        };
	    },

	    computed: {
	        computedValue: {
	            get: function get() {
	                return this.selected;
	            },
	            set: function set(value) {
	                this.selected = value;
	                this.$emit('input', value);
	                !this.isValid && this.checkHtml5Validity();
	            }
	        },
	        spanClasses: function spanClasses() {
	            return [this.size, this.statusType, {
	                'is-fullwidth': this.expanded,
	                'is-loading': this.loading,
	                'is-multiple': this.multiple,
	                'is-rounded': this.rounded,
	                'is-empty': this.selected === null
	            }];
	        }
	    },
	    watch: {
	        /**
	         * When v-model is changed:
	         *   1. Set the selected option.
	         *   2. If it's invalid, validate again.
	         */
	        value: function value(_value) {
	            this.selected = _value;
	            !this.isValid && this.checkHtml5Validity();
	        }
	    }
	});

	/***/ }),
	/* 127 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "control",
	    class: {
	      'is-expanded': _vm.expanded, 'has-icons-left': _vm.icon
	    }
	  }, [_c('span', {
	    staticClass: "select",
	    class: _vm.spanClasses
	  }, [_c('select', _vm._b({
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.computedValue),
	      expression: "computedValue"
	    }],
	    ref: "select",
	    attrs: {
	      "multiple": _vm.multiple,
	      "size": _vm.nativeSize
	    },
	    on: {
	      "blur": function($event) {
	        _vm.$emit('blur', $event) && _vm.checkHtml5Validity();
	      },
	      "focus": function($event) {
	        _vm.$emit('focus', $event);
	      },
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.computedValue = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
	      }
	    }
	  }, 'select', _vm.$attrs, false), [(_vm.placeholder) ? [(_vm.computedValue == null) ? _c('option', {
	    attrs: {
	      "selected": "",
	      "disabled": "",
	      "hidden": ""
	    },
	    domProps: {
	      "value": null
	    }
	  }, [_vm._v("\n                    " + _vm._s(_vm.placeholder) + "\n                ")]) : _vm._e()] : _vm._e(), _vm._v(" "), _vm._t("default")], 2)]), _vm._v(" "), (_vm.icon) ? _c('b-icon', {
	    staticClass: "is-left",
	    attrs: {
	      "icon": _vm.icon,
	      "pack": _vm.iconPack,
	      "size": _vm.iconSize
	    }
	  }) : _vm._e()], 1)
	},staticRenderFns: []};

	/***/ }),
	/* 128 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(129),
	  /* template */
	  __webpack_require__(133),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 129 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DatepickerTableRow__ = __webpack_require__(130);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DatepickerTableRow___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__DatepickerTableRow__);

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



	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BDatepickerTable',
	    components: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({}, __WEBPACK_IMPORTED_MODULE_1__DatepickerTableRow___default.a.name, __WEBPACK_IMPORTED_MODULE_1__DatepickerTableRow___default.a),
	    props: {
	        value: Date,
	        dayNames: Array,
	        monthNames: Array,
	        firstDayOfWeek: Number,
	        events: Array,
	        indicators: String,
	        minDate: Date,
	        maxDate: Date,
	        focused: Object,
	        disabled: Boolean,
	        dateCreator: Function,
	        unselectableDates: Array,
	        unselectableDaysOfWeek: Array,
	        selectableDates: Array
	    },
	    computed: {
	        visibleDayNames: function visibleDayNames() {
	            var visibleDayNames = [];
	            var index = this.firstDayOfWeek;
	            while (visibleDayNames.length < this.dayNames.length) {
	                var currentDayName = this.dayNames[index % this.dayNames.length];
	                visibleDayNames.push(currentDayName);
	                index++;
	            }
	            return visibleDayNames;
	        },
	        hasEvents: function hasEvents() {
	            return this.events && this.events.length;
	        },


	        /*
	        * Return array of all events in the specified month
	        */
	        eventsInThisMonth: function eventsInThisMonth() {
	            if (!this.events) return [];

	            var monthEvents = [];

	            for (var i = 0; i < this.events.length; i++) {
	                var event = this.events[i];

	                if (!event.hasOwnProperty('date')) {
	                    event = { date: event };
	                }
	                if (!event.hasOwnProperty('type')) {
	                    event.type = 'is-primary';
	                }
	                if (event.date.getMonth() === this.focused.month && event.date.getFullYear() === this.focused.year) {
	                    monthEvents.push(event);
	                }
	            }

	            return monthEvents;
	        }
	    },
	    methods: {
	        /*
	        * Emit input event with selected date as payload for v-model in parent
	        */
	        updateSelectedDate: function updateSelectedDate(date) {
	            this.$emit('input', date);
	        },


	        /*
	        * Return array of all days in the week that the startingDate is within
	        */
	        weekBuilder: function weekBuilder(startingDate, month, year) {
	            var thisMonth = new Date(year, month);

	            var thisWeek = [];

	            var dayOfWeek = new Date(year, month, startingDate).getDay();

	            var end = dayOfWeek >= this.firstDayOfWeek ? dayOfWeek - this.firstDayOfWeek : 7 - this.firstDayOfWeek + dayOfWeek;

	            var daysAgo = 1;
	            for (var i = 0; i < end; i++) {
	                thisWeek.unshift(new Date(thisMonth.getFullYear(), thisMonth.getMonth(), startingDate - daysAgo));
	                daysAgo++;
	            }

	            thisWeek.push(new Date(year, month, startingDate));

	            var daysForward = 1;
	            while (thisWeek.length < 7) {
	                thisWeek.push(new Date(year, month, startingDate + daysForward));
	                daysForward++;
	            }

	            return thisWeek;
	        },


	        /*
	        * Return array of all weeks in the specified month
	        */
	        weeksInThisMonth: function weeksInThisMonth(month, year) {
	            var weeksInThisMonth = [];
	            var daysInThisMonth = new Date(year, month + 1, 0).getDate();

	            var startingDay = 1;

	            while (startingDay <= daysInThisMonth + 6) {
	                var newWeek = this.weekBuilder(startingDay, month, year);
	                var weekValid = false;

	                newWeek.forEach(function (day) {
	                    if (day.getMonth() === month) {
	                        weekValid = true;
	                    }
	                });

	                if (weekValid) {
	                    weeksInThisMonth.push(newWeek);
	                }

	                startingDay += 7;
	            }

	            return weeksInThisMonth;
	        },
	        eventsInThisWeek: function eventsInThisWeek(week, index) {
	            if (!this.eventsInThisMonth.length) return [];

	            var weekEvents = [];

	            var weeksInThisMonth = [];
	            weeksInThisMonth = this.weeksInThisMonth(this.focused.month, this.focused.year);

	            for (var d = 0; d < weeksInThisMonth[index].length; d++) {
	                for (var e = 0; e < this.eventsInThisMonth.length; e++) {
	                    var eventsInThisMonth = this.eventsInThisMonth[e].date.getTime();
	                    if (eventsInThisMonth === weeksInThisMonth[index][d].getTime()) {
	                        weekEvents.push(this.eventsInThisMonth[e]);
	                    }
	                }
	            }

	            return weekEvents;
	        }
	    }
	});

	/***/ }),
	/* 130 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(131),
	  /* template */
	  __webpack_require__(132),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 131 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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

	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BDatepickerTableRow',
	    props: {
	        selectedDate: Date,
	        week: {
	            type: Array,
	            required: true
	        },
	        month: {
	            type: Number,
	            required: true
	        },
	        minDate: Date,
	        maxDate: Date,
	        disabled: Boolean,
	        unselectableDates: Array,
	        unselectableDaysOfWeek: Array,
	        selectableDates: Array,
	        events: Array,
	        indicators: String,
	        dateCreator: Function
	    },
	    methods: {
	        /*
	        * Check that selected day is within earliest/latest params and
	        * is within this month
	        */
	        selectableDate: function selectableDate(day) {
	            var validity = [];

	            if (this.minDate) {
	                validity.push(day >= this.minDate);
	            }

	            if (this.maxDate) {
	                validity.push(day <= this.maxDate);
	            }

	            validity.push(day.getMonth() === this.month);

	            if (this.selectableDates) {
	                for (var i = 0; i < this.selectableDates.length; i++) {
	                    var enabledDate = this.selectableDates[i];
	                    if (day.getDate() === enabledDate.getDate() && day.getFullYear() === enabledDate.getFullYear() && day.getMonth() === enabledDate.getMonth()) {
	                        return true;
	                    } else {
	                        validity.push(false);
	                    }
	                }
	            }

	            if (this.unselectableDates) {
	                for (var _i = 0; _i < this.unselectableDates.length; _i++) {
	                    var disabledDate = this.unselectableDates[_i];
	                    validity.push(day.getDate() !== disabledDate.getDate() || day.getFullYear() !== disabledDate.getFullYear() || day.getMonth() !== disabledDate.getMonth());
	                }
	            }

	            if (this.unselectableDaysOfWeek) {
	                for (var _i2 = 0; _i2 < this.unselectableDaysOfWeek.length; _i2++) {
	                    var dayOfWeek = this.unselectableDaysOfWeek[_i2];
	                    validity.push(day.getDay() !== dayOfWeek);
	                }
	            }

	            return validity.indexOf(false) < 0;
	        },


	        /*
	        * Emit select event with chosen date as payload
	        */
	        emitChosenDate: function emitChosenDate(day) {
	            if (this.disabled) return;

	            if (this.selectableDate(day)) {
	                this.$emit('select', day);
	            }
	        },
	        eventsDateMatch: function eventsDateMatch(day) {
	            if (!this.events.length) return false;

	            var dayEvents = [];

	            for (var i = 0; i < this.events.length; i++) {
	                if (this.events[i].date.getDay() === day.getDay()) {
	                    dayEvents.push(this.events[i]);
	                }
	            }

	            if (!dayEvents.length) {
	                return false;
	            }

	            return dayEvents;
	        },


	        /*
	        * Build classObject for cell using validations
	        */
	        classObject: function classObject(day) {
	            function dateMatch(dateOne, dateTwo) {
	                // if either date is null or undefined, return false
	                if (!dateOne || !dateTwo) {
	                    return false;
	                }

	                return dateOne.getDate() === dateTwo.getDate() && dateOne.getFullYear() === dateTwo.getFullYear() && dateOne.getMonth() === dateTwo.getMonth();
	            }

	            return {
	                'is-selected': dateMatch(day, this.selectedDate),
	                'is-today': dateMatch(day, this.dateCreator()),
	                'is-selectable': this.selectableDate(day) && !this.disabled,
	                'is-unselectable': !this.selectableDate(day) || this.disabled
	            };
	        }
	    }
	});

	/***/ }),
	/* 132 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "datepicker-row"
	  }, [_vm._l((_vm.week), function(day, index) {
	    return [(_vm.selectableDate(day) && !_vm.disabled) ? _c('a', {
	      key: index,
	      staticClass: "datepicker-cell",
	      class: [_vm.classObject(day), {
	        'has-event': _vm.eventsDateMatch(day)
	      }, _vm.indicators],
	      attrs: {
	        "role": "button",
	        "href": "#",
	        "disabled": _vm.disabled
	      },
	      on: {
	        "click": function($event) {
	          $event.preventDefault();
	          _vm.emitChosenDate(day);
	        },
	        "keydown": [function($event) {
	          if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) { return null; }
	          $event.preventDefault();
	          _vm.emitChosenDate(day);
	        }, function($event) {
	          if (!('button' in $event) && _vm._k($event.keyCode, "space", 32, $event.key)) { return null; }
	          $event.preventDefault();
	          _vm.emitChosenDate(day);
	        }]
	      }
	    }, [_vm._v("\n            " + _vm._s(day.getDate()) + "\n\n            "), (_vm.eventsDateMatch(day)) ? _c('div', {
	      staticClass: "events"
	    }, _vm._l((_vm.eventsDateMatch(day)), function(event, index) {
	      return _c('div', {
	        key: index,
	        staticClass: "event",
	        class: event.type
	      })
	    })) : _vm._e()]) : _c('div', {
	      key: index,
	      staticClass: "datepicker-cell",
	      class: _vm.classObject(day)
	    }, [_vm._v("\n            " + _vm._s(day.getDate()) + "\n        ")])]
	  })], 2)
	},staticRenderFns: []};

	/***/ }),
	/* 133 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('section', {
	    staticClass: "datepicker-table"
	  }, [_c('header', {
	    staticClass: "datepicker-header"
	  }, _vm._l((_vm.visibleDayNames), function(day, index) {
	    return _c('div', {
	      key: index,
	      staticClass: "datepicker-cell"
	    }, [_vm._v("\n            " + _vm._s(day) + "\n        ")])
	  })), _vm._v(" "), _c('div', {
	    staticClass: "datepicker-body",
	    class: {
	      'has-events': _vm.hasEvents
	    }
	  }, _vm._l((_vm.weeksInThisMonth(_vm.focused.month, _vm.focused.year)), function(week, index) {
	    return _c('b-datepicker-table-row', {
	      key: index,
	      attrs: {
	        "selected-date": _vm.value,
	        "week": week,
	        "month": _vm.focused.month,
	        "min-date": _vm.minDate,
	        "max-date": _vm.maxDate,
	        "disabled": _vm.disabled,
	        "unselectable-dates": _vm.unselectableDates,
	        "unselectable-days-of-week": _vm.unselectableDaysOfWeek,
	        "selectable-dates": _vm.selectableDates,
	        "events": _vm.eventsInThisWeek(week, index),
	        "indicators": _vm.indicators,
	        "date-creator": _vm.dateCreator
	      },
	      on: {
	        "select": _vm.updateSelectedDate
	      }
	    })
	  }))])
	},staticRenderFns: []};

	/***/ }),
	/* 134 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "datepicker control",
	    class: [_vm.size, {
	      'is-expanded': _vm.expanded
	    }]
	  }, [(!_vm.isMobile || _vm.inline) ? _c('b-dropdown', {
	    ref: "dropdown",
	    attrs: {
	      "position": _vm.position,
	      "disabled": _vm.disabled,
	      "inline": _vm.inline
	    }
	  }, [(!_vm.inline) ? _c('b-input', _vm._b({
	    ref: "input",
	    attrs: {
	      "slot": "trigger",
	      "autocomplete": "off",
	      "value": _vm.formatValue(_vm.dateSelected),
	      "placeholder": _vm.placeholder,
	      "size": _vm.size,
	      "icon": _vm.icon,
	      "icon-pack": _vm.iconPack,
	      "rounded": _vm.rounded,
	      "loading": _vm.loading,
	      "disabled": _vm.disabled,
	      "readonly": !_vm.editable
	    },
	    on: {
	      "focus": function($event) {
	        _vm.$emit('focus', $event);
	      },
	      "blur": function($event) {
	        _vm.$emit('blur', $event) && _vm.checkHtml5Validity();
	      }
	    },
	    nativeOn: {
	      "change": function($event) {
	        _vm.onChange($event.target.value);
	      }
	    },
	    slot: "trigger"
	  }, 'b-input', _vm.$attrs, false)) : _vm._e(), _vm._v(" "), _c('b-dropdown-item', {
	    attrs: {
	      "disabled": _vm.disabled,
	      "custom": ""
	    }
	  }, [_c('header', {
	    staticClass: "datepicker-header"
	  }, [(_vm.$slots.header !== undefined && _vm.$slots.header.length) ? [_vm._t("header")] : _c('div', {
	    staticClass: "pagination field is-centered",
	    class: _vm.size
	  }, [(!_vm.isFirstMonth && !_vm.disabled) ? _c('a', {
	    staticClass: "pagination-previous",
	    attrs: {
	      "role": "button",
	      "href": "#",
	      "disabled": _vm.disabled
	    },
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.decrementMonth($event);
	      },
	      "keydown": [function($event) {
	        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) { return null; }
	        $event.preventDefault();
	        _vm.decrementMonth($event);
	      }, function($event) {
	        if (!('button' in $event) && _vm._k($event.keyCode, "space", 32, $event.key)) { return null; }
	        $event.preventDefault();
	        _vm.decrementMonth($event);
	      }]
	    }
	  }, [_c('b-icon', {
	    attrs: {
	      "icon": "chevron-left",
	      "pack": _vm.iconPack,
	      "both": "",
	      "type": "is-primary is-clickable"
	    }
	  })], 1) : _vm._e(), _vm._v(" "), _c('a', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (!_vm.isLastMonth && !_vm.disabled),
	      expression: "!isLastMonth && !disabled"
	    }],
	    staticClass: "pagination-next",
	    attrs: {
	      "role": "button",
	      "href": "#",
	      "disabled": _vm.disabled
	    },
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.incrementMonth($event);
	      },
	      "keydown": [function($event) {
	        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) { return null; }
	        $event.preventDefault();
	        _vm.incrementMonth($event);
	      }, function($event) {
	        if (!('button' in $event) && _vm._k($event.keyCode, "space", 32, $event.key)) { return null; }
	        $event.preventDefault();
	        _vm.incrementMonth($event);
	      }]
	    }
	  }, [_c('b-icon', {
	    attrs: {
	      "icon": "chevron-right",
	      "pack": _vm.iconPack,
	      "both": "",
	      "type": "is-primary is-clickable"
	    }
	  })], 1), _vm._v(" "), _c('div', {
	    staticClass: "pagination-list"
	  }, [_c('b-field', [_c('b-select', {
	    attrs: {
	      "disabled": _vm.disabled,
	      "size": _vm.size
	    },
	    model: {
	      value: (_vm.focusedDateData.month),
	      callback: function($$v) {
	        _vm.$set(_vm.focusedDateData, "month", $$v);
	      },
	      expression: "focusedDateData.month"
	    }
	  }, _vm._l((_vm.monthNames), function(month, index) {
	    return _c('option', {
	      key: month,
	      domProps: {
	        "value": index
	      }
	    }, [_vm._v("\n                                    " + _vm._s(month) + "\n                                ")])
	  })), _vm._v(" "), _c('b-select', {
	    attrs: {
	      "disabled": _vm.disabled,
	      "size": _vm.size
	    },
	    model: {
	      value: (_vm.focusedDateData.year),
	      callback: function($$v) {
	        _vm.$set(_vm.focusedDateData, "year", $$v);
	      },
	      expression: "focusedDateData.year"
	    }
	  }, _vm._l((_vm.listOfYears), function(year) {
	    return _c('option', {
	      key: year,
	      domProps: {
	        "value": year
	      }
	    }, [_vm._v("\n                                    " + _vm._s(year) + "\n                                ")])
	  }))], 1)], 1)])], 2), _vm._v(" "), _c('b-datepicker-table', {
	    attrs: {
	      "day-names": _vm.dayNames,
	      "month-names": _vm.monthNames,
	      "first-day-of-week": _vm.firstDayOfWeek,
	      "min-date": _vm.minDate,
	      "max-date": _vm.maxDate,
	      "focused": _vm.focusedDateData,
	      "disabled": _vm.disabled,
	      "unselectable-dates": _vm.unselectableDates,
	      "unselectable-days-of-week": _vm.unselectableDaysOfWeek,
	      "selectable-dates": _vm.selectableDates,
	      "events": _vm.events,
	      "indicators": _vm.indicators,
	      "date-creator": _vm.dateCreator
	    },
	    on: {
	      "close": function($event) {
	        _vm.$refs.dropdown.isActive = false;
	      }
	    },
	    model: {
	      value: (_vm.dateSelected),
	      callback: function($$v) {
	        _vm.dateSelected = $$v;
	      },
	      expression: "dateSelected"
	    }
	  }), _vm._v(" "), (_vm.$slots.default !== undefined && _vm.$slots.default.length) ? _c('footer', {
	    staticClass: "datepicker-footer"
	  }, [_vm._t("default")], 2) : _vm._e()], 1)], 1) : _c('b-input', _vm._b({
	    ref: "input",
	    attrs: {
	      "type": "date",
	      "autocomplete": "off",
	      "value": _vm.formatYYYYMMDD(_vm.value),
	      "placeholder": _vm.placeholder,
	      "size": _vm.size,
	      "icon": _vm.icon,
	      "icon-pack": _vm.iconPack,
	      "loading": _vm.loading,
	      "max": _vm.formatYYYYMMDD(_vm.maxDate),
	      "min": _vm.formatYYYYMMDD(_vm.minDate),
	      "disabled": _vm.disabled,
	      "readonly": false
	    },
	    on: {
	      "focus": function($event) {
	        _vm.$emit('focus', $event);
	      },
	      "blur": function($event) {
	        _vm.$emit('blur', $event) && _vm.checkHtml5Validity();
	      }
	    },
	    nativeOn: {
	      "change": function($event) {
	        _vm.onChangeNativePicker($event);
	      }
	    }
	  }, 'b-input', _vm.$attrs, false))], 1)
	},staticRenderFns: []};

	/***/ }),
	/* 135 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(136),
	  /* template */
	  __webpack_require__(139),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 136 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__icon_Icon__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__icon_Icon__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modal_Modal__ = __webpack_require__(61);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modal_Modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__modal_Modal__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_config__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_helpers__ = __webpack_require__(7);

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






	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BDialog',
	    components: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({}, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a),
	    extends: __WEBPACK_IMPORTED_MODULE_2__modal_Modal___default.a,
	    props: {
	        title: String,
	        message: String,
	        icon: String,
	        iconPack: String,
	        hasIcon: Boolean,
	        type: {
	            type: String,
	            default: 'is-primary'
	        },
	        size: String,
	        confirmText: {
	            type: String,
	            default: function _default() {
	                return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultDialogConfirmText ? __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultDialogConfirmText : 'OK';
	            }
	        },
	        cancelText: {
	            type: String,
	            default: function _default() {
	                return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultDialogCancelText ? __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultDialogCancelText : 'Cancel';
	            }
	        },
	        hasInput: Boolean, // Used internally to know if it's prompt
	        inputAttrs: {
	            type: Object,
	            default: function _default() {
	                return {};
	            }
	        },
	        onConfirm: {
	            type: Function,
	            default: function _default() {}
	        },
	        focusOn: {
	            type: String,
	            default: 'confirm'
	        }
	    },
	    data: function data() {
	        var prompt = this.hasInput ? this.inputAttrs.value || '' : '';

	        return {
	            prompt: prompt,
	            isActive: false,
	            validationMessage: ''
	        };
	    },

	    computed: {
	        /**
	         * Icon name (MDI) based on the type.
	         */
	        iconByType: function iconByType() {
	            switch (this.type) {
	                case 'is-info':
	                    return 'information';
	                case 'is-success':
	                    return 'check-circle';
	                case 'is-warning':
	                    return 'alert';
	                case 'is-danger':
	                    return 'alert-circle';
	                default:
	                    return null;
	            }
	        },
	        showCancel: function showCancel() {
	            return this.cancelOptions.indexOf('button') >= 0;
	        }
	    },
	    methods: {
	        /**
	         * If it's a prompt Dialog, validate the input.
	         * Call the onConfirm prop (function) and close the Dialog.
	         */
	        confirm: function confirm() {
	            var _this = this;

	            if (this.$refs.input !== undefined) {
	                if (!this.$refs.input.checkValidity()) {
	                    this.validationMessage = this.$refs.input.validationMessage;
	                    this.$nextTick(function () {
	                        return _this.$refs.input.select();
	                    });
	                    return;
	                }
	            }

	            this.onConfirm(this.prompt);
	            this.close();
	        },


	        /**
	         * Close the Dialog.
	         */
	        close: function close() {
	            var _this2 = this;

	            this.isActive = false;
	            // Timeout for the animation complete before destroying
	            setTimeout(function () {
	                _this2.$destroy();
	                Object(__WEBPACK_IMPORTED_MODULE_4__utils_helpers__["e" /* removeElement */])(_this2.$el);
	            }, 150);
	        }
	    },
	    beforeMount: function beforeMount() {
	        var _this3 = this;

	        // Insert the Dialog component in body tag
	        this.$nextTick(function () {
	            document.body.appendChild(_this3.$el);
	        });
	    },
	    mounted: function mounted() {
	        var _this4 = this;

	        this.isActive = true;

	        if (typeof this.inputAttrs.required === 'undefined') {
	            this.$set(this.inputAttrs, 'required', true);
	        }

	        this.$nextTick(function () {
	            // Handle which element receives focus
	            if (_this4.hasInput) {
	                _this4.$refs.input.focus();
	            } else if (_this4.focusOn === 'cancel' && _this4.showCancel) {
	                _this4.$refs.cancelButton.focus();
	            } else {
	                _this4.$refs.confirmButton.focus();
	            }
	        });
	    }
	});

	/***/ }),
	/* 137 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_helpers__ = __webpack_require__(7);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_config__ = __webpack_require__(2);
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




	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BModal',
	    props: {
	        active: Boolean,
	        component: [Object, Function],
	        content: String,
	        programmatic: Boolean,
	        props: Object,
	        events: Object,
	        width: {
	            type: [String, Number],
	            default: 960
	        },
	        hasModalCard: Boolean,
	        animation: {
	            type: String,
	            default: 'zoom-out'
	        },
	        canCancel: {
	            type: [Array, Boolean],
	            default: function _default() {
	                return ['escape', 'x', 'outside', 'button'];
	            }
	        },
	        onCancel: {
	            type: Function,
	            default: function _default() {}
	        },
	        scroll: {
	            type: String,
	            default: function _default() {
	                return __WEBPACK_IMPORTED_MODULE_1__utils_config__["a" /* default */].defaultModalScroll ? __WEBPACK_IMPORTED_MODULE_1__utils_config__["a" /* default */].defaultModalScroll : 'clip';
	            },
	            validator: function validator(value) {
	                return ['clip', 'keep'].indexOf(value) >= 0;
	            }
	        }
	    },
	    data: function data() {
	        return {
	            isActive: this.active || false,
	            savedScrollTop: null,
	            newWidth: typeof this.width === 'number' ? this.width + 'px' : this.width
	        };
	    },

	    computed: {
	        cancelOptions: function cancelOptions() {
	            return typeof this.canCancel === 'boolean' ? this.canCancel ? ['escape', 'x', 'outside', 'button'] : [] : this.canCancel;
	        },
	        showX: function showX() {
	            return this.cancelOptions.indexOf('x') >= 0;
	        }
	    },
	    watch: {
	        active: function active(value) {
	            this.isActive = value;
	        },
	        isActive: function isActive() {
	            this.handleScroll();
	        }
	    },
	    methods: {
	        handleScroll: function handleScroll() {
	            if (typeof window === 'undefined') return;

	            if (this.scroll === 'clip') {
	                if (this.isActive) {
	                    document.documentElement.classList.add('is-clipped');
	                } else {
	                    document.documentElement.classList.remove('is-clipped');
	                }
	                return;
	            }

	            this.savedScrollTop = !this.savedScrollTop ? document.documentElement.scrollTop : this.savedScrollTop;

	            if (this.isActive) {
	                document.body.classList.add('is-noscroll');
	            } else {
	                document.body.classList.remove('is-noscroll');
	            }

	            if (this.isActive) {
	                document.body.style.top = '-' + this.savedScrollTop + 'px';
	                return;
	            }

	            document.documentElement.scrollTop = this.savedScrollTop;
	            document.body.style.top = null;
	            this.savedScrollTop = null;
	        },


	        /**
	         * Close the Modal if canCancel and call the onCancel prop (function).
	         */
	        cancel: function cancel(method) {
	            if (this.cancelOptions.indexOf(method) < 0) return;

	            this.onCancel.apply(null, arguments);
	            this.close();
	        },


	        /**
	         * Call the onCancel prop (function).
	         * Emit events, and destroy modal if it's programmatic.
	         */
	        close: function close() {
	            var _this = this;

	            this.$emit('close');
	            this.$emit('update:active', false);

	            // Timeout for the animation complete before destroying
	            if (this.programmatic) {
	                this.isActive = false;
	                setTimeout(function () {
	                    _this.$destroy();
	                    Object(__WEBPACK_IMPORTED_MODULE_0__utils_helpers__["e" /* removeElement */])(_this.$el);
	                }, 150);
	            }
	        },


	        /**
	         * Keypress event that is bound to the document.
	         */
	        keyPress: function keyPress(event) {
	            // Esc key
	            if (this.isActive && event.keyCode === 27) this.cancel('escape');
	        }
	    },
	    created: function created() {
	        if (typeof window !== 'undefined') {
	            document.addEventListener('keyup', this.keyPress);
	        }
	    },
	    beforeMount: function beforeMount() {
	        // Insert the Modal component in body tag
	        // only if it's programmatic
	        this.programmatic && document.body.appendChild(this.$el);
	    },
	    mounted: function mounted() {
	        if (this.programmatic) this.isActive = true;else if (this.isActive) this.handleScroll();
	    },
	    beforeDestroy: function beforeDestroy() {
	        if (typeof window !== 'undefined') {
	            document.removeEventListener('keyup', this.keyPress);
	            // reset scroll
	            document.documentElement.classList.remove('is-clipped');
	            var savedScrollTop = !this.savedScrollTop ? document.documentElement.scrollTop : this.savedScrollTop;
	            document.body.classList.remove('is-noscroll');
	            document.documentElement.scrollTop = savedScrollTop;
	            document.body.style.top = null;
	        }
	    }
	});

	/***/ }),
	/* 138 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('transition', {
	    attrs: {
	      "name": _vm.animation
	    }
	  }, [(_vm.isActive) ? _c('div', {
	    staticClass: "modal is-active"
	  }, [_c('div', {
	    staticClass: "modal-background",
	    on: {
	      "click": function($event) {
	        _vm.cancel('outside');
	      }
	    }
	  }), _vm._v(" "), _c('div', {
	    staticClass: "animation-content",
	    class: {
	      'modal-content': !_vm.hasModalCard
	    },
	    style: ({
	      maxWidth: _vm.newWidth
	    })
	  }, [(_vm.component) ? _c(_vm.component, _vm._g(_vm._b({
	    tag: "component",
	    on: {
	      "close": _vm.close
	    }
	  }, 'component', _vm.props, false), _vm.events)) : (_vm.content) ? _c('div', {
	    domProps: {
	      "innerHTML": _vm._s(_vm.content)
	    }
	  }) : _vm._t("default")], 2), _vm._v(" "), (_vm.showX) ? _c('button', {
	    staticClass: "modal-close is-large",
	    attrs: {
	      "type": "button"
	    },
	    on: {
	      "click": function($event) {
	        _vm.cancel('x');
	      }
	    }
	  }) : _vm._e()]) : _vm._e()])
	},staticRenderFns: []};

	/***/ }),
	/* 139 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('transition', {
	    attrs: {
	      "name": _vm.animation
	    }
	  }, [(_vm.isActive) ? _c('div', {
	    staticClass: "dialog modal is-active",
	    class: _vm.size
	  }, [_c('div', {
	    staticClass: "modal-background",
	    on: {
	      "click": function($event) {
	        _vm.cancel('outside');
	      }
	    }
	  }), _vm._v(" "), _c('div', {
	    staticClass: "modal-card animation-content"
	  }, [(_vm.title) ? _c('header', {
	    staticClass: "modal-card-head"
	  }, [_c('p', {
	    staticClass: "modal-card-title"
	  }, [_vm._v(_vm._s(_vm.title))])]) : _vm._e(), _vm._v(" "), _c('section', {
	    staticClass: "modal-card-body",
	    class: {
	      'is-titleless': !_vm.title, 'is-flex': _vm.hasIcon
	    }
	  }, [_c('div', {
	    staticClass: "media"
	  }, [(_vm.hasIcon) ? _c('div', {
	    staticClass: "media-left"
	  }, [_c('b-icon', {
	    attrs: {
	      "icon": _vm.icon ? _vm.icon : _vm.iconByType,
	      "pack": _vm.iconPack,
	      "type": _vm.type,
	      "both": !_vm.icon,
	      "size": "is-large"
	    }
	  })], 1) : _vm._e(), _vm._v(" "), _c('div', {
	    staticClass: "media-content"
	  }, [_c('p', {
	    domProps: {
	      "innerHTML": _vm._s(_vm.message)
	    }
	  }), _vm._v(" "), (_vm.hasInput) ? _c('div', {
	    staticClass: "field"
	  }, [_c('div', {
	    staticClass: "control"
	  }, [_c('input', _vm._b({
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.prompt),
	      expression: "prompt"
	    }],
	    ref: "input",
	    staticClass: "input",
	    class: {
	      'is-danger': _vm.validationMessage
	    },
	    domProps: {
	      "value": (_vm.prompt)
	    },
	    on: {
	      "keyup": function($event) {
	        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) { return null; }
	        _vm.confirm($event);
	      },
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.prompt = $event.target.value;
	      }
	    }
	  }, 'input', _vm.inputAttrs, false))]), _vm._v(" "), _c('p', {
	    staticClass: "help is-danger"
	  }, [_vm._v(_vm._s(_vm.validationMessage))])]) : _vm._e()])])]), _vm._v(" "), _c('footer', {
	    staticClass: "modal-card-foot"
	  }, [(_vm.showCancel) ? _c('button', {
	    ref: "cancelButton",
	    staticClass: "button",
	    on: {
	      "click": function($event) {
	        _vm.cancel('button');
	      }
	    }
	  }, [_vm._v("\n                    " + _vm._s(_vm.cancelText) + "\n                ")]) : _vm._e(), _vm._v(" "), _c('button', {
	    ref: "confirmButton",
	    staticClass: "button",
	    class: _vm.type,
	    on: {
	      "click": _vm.confirm
	    }
	  }, [_vm._v("\n                    " + _vm._s(_vm.confirmText) + "\n                ")])])])]) : _vm._e()])
	},staticRenderFns: []};

	/***/ }),
	/* 140 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(141),
	  /* template */
	  __webpack_require__(142),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 141 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_helpers__ = __webpack_require__(7);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_ssr__ = __webpack_require__(62);
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




	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BLoading',
	    props: {
	        active: Boolean,
	        programmatic: Boolean,
	        container: [Object, Function, __WEBPACK_IMPORTED_MODULE_1__utils_ssr__["b" /* HTMLElement */]],
	        isFullPage: {
	            type: Boolean,
	            default: true
	        },
	        animation: {
	            type: String,
	            default: 'fade'
	        },
	        canCancel: {
	            type: Boolean,
	            default: false
	        },
	        onCancel: {
	            type: Function,
	            default: function _default() {}
	        }
	    },
	    data: function data() {
	        return {
	            isActive: this.active || false
	        };
	    },

	    watch: {
	        active: function active(value) {
	            this.isActive = value;
	        }
	    },
	    methods: {
	        /**
	         * Close the Modal if canCancel.
	         */
	        cancel: function cancel() {
	            if (!this.canCancel || !this.isActive) return;

	            this.close();
	        },

	        /**
	         * Emit events, and destroy modal if it's programmatic.
	         */
	        close: function close() {
	            var _this = this;

	            this.onCancel.apply(null, arguments);
	            this.$emit('close');
	            this.$emit('update:active', false);

	            // Timeout for the animation complete before destroying
	            if (this.programmatic) {
	                this.isActive = false;
	                setTimeout(function () {
	                    _this.$destroy();
	                    Object(__WEBPACK_IMPORTED_MODULE_0__utils_helpers__["e" /* removeElement */])(_this.$el);
	                }, 150);
	            }
	        },

	        /**
	         * Keypress event that is bound to the document.
	         */
	        keyPress: function keyPress(event) {
	            // Esc key
	            if (event.keyCode === 27) this.cancel();
	        }
	    },
	    created: function created() {
	        if (typeof window !== 'undefined') {
	            document.addEventListener('keyup', this.keyPress);
	        }
	    },
	    beforeMount: function beforeMount() {
	        // Insert the Loading component in body tag
	        // only if it's programmatic
	        if (this.programmatic) {
	            if (!this.container) {
	                document.body.appendChild(this.$el);
	            } else {
	                this.isFullPage = false;
	                this.container.appendChild(this.$el);
	            }
	        }
	    },
	    mounted: function mounted() {
	        if (this.programmatic) this.isActive = true;
	    },
	    beforeDestroy: function beforeDestroy() {
	        if (typeof window !== 'undefined') {
	            document.removeEventListener('keyup', this.keyPress);
	        }
	    }
	});

	/***/ }),
	/* 142 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('transition', {
	    attrs: {
	      "name": _vm.animation
	    }
	  }, [(_vm.isActive) ? _c('div', {
	    staticClass: "loading-overlay is-active",
	    class: {
	      'is-full-page': _vm.isFullPage
	    }
	  }, [_c('div', {
	    staticClass: "loading-background",
	    on: {
	      "click": _vm.cancel
	    }
	  }), _vm._v(" "), _c('div', {
	    staticClass: "loading-icon"
	  })]) : _vm._e()])
	},staticRenderFns: []};

	/***/ }),
	/* 143 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(144),
	  /* template */
	  __webpack_require__(145),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 144 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_MessageMixin_js__ = __webpack_require__(63);
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



	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BMessage',
	    mixins: [__WEBPACK_IMPORTED_MODULE_0__utils_MessageMixin_js__["a" /* default */]],
	    data: function data() {
	        return {
	            newIconSize: this.iconSize || this.size || 'is-large'
	        };
	    }
	});

	/***/ }),
	/* 145 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('transition', {
	    attrs: {
	      "name": "fade"
	    }
	  }, [(_vm.isActive) ? _c('article', {
	    staticClass: "message",
	    class: [_vm.type, _vm.size]
	  }, [(_vm.title) ? _c('header', {
	    staticClass: "message-header"
	  }, [_c('p', [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), (_vm.closable) ? _c('button', {
	    staticClass: "delete",
	    attrs: {
	      "type": "button"
	    },
	    on: {
	      "click": _vm.close
	    }
	  }) : _vm._e()]) : _vm._e(), _vm._v(" "), _c('section', {
	    staticClass: "message-body"
	  }, [_c('div', {
	    staticClass: "media"
	  }, [(_vm.icon && _vm.hasIcon) ? _c('div', {
	    staticClass: "media-left"
	  }, [_c('b-icon', {
	    class: _vm.type,
	    attrs: {
	      "icon": _vm.icon,
	      "pack": _vm.iconPack,
	      "both": "",
	      "size": _vm.newIconSize
	    }
	  })], 1) : _vm._e(), _vm._v(" "), _c('div', {
	    staticClass: "media-content"
	  }, [_vm._t("default")], 2)])])]) : _vm._e()])
	},staticRenderFns: []};

	/***/ }),
	/* 146 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(147),
	  /* template */
	  __webpack_require__(148),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 147 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_MessageMixin_js__ = __webpack_require__(63);
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



	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BNotification',
	    mixins: [__WEBPACK_IMPORTED_MODULE_0__utils_MessageMixin_js__["a" /* default */]]
	});

	/***/ }),
	/* 148 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('transition', {
	    attrs: {
	      "name": "fade"
	    }
	  }, [(_vm.isActive) ? _c('article', {
	    staticClass: "notification",
	    class: _vm.type
	  }, [(_vm.closable) ? _c('button', {
	    staticClass: "delete",
	    attrs: {
	      "type": "button"
	    },
	    on: {
	      "click": _vm.close
	    }
	  }) : _vm._e(), _vm._v(" "), _c('div', {
	    staticClass: "media"
	  }, [(_vm.icon && _vm.hasIcon) ? _c('div', {
	    staticClass: "media-left"
	  }, [_c('b-icon', {
	    attrs: {
	      "icon": _vm.icon,
	      "pack": _vm.iconPack,
	      "both": "",
	      "size": "is-large"
	    }
	  })], 1) : _vm._e(), _vm._v(" "), _c('div', {
	    staticClass: "media-content"
	  }, [_vm._t("default")], 2)])]) : _vm._e()])
	},staticRenderFns: []};

	/***/ }),
	/* 149 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__icon_Icon__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__icon_Icon__);

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



	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BPagination',
	    components: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({}, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a),
	    props: {
	        total: [Number, String],
	        perPage: {
	            type: [Number, String],
	            default: 20
	        },
	        current: {
	            type: [Number, String],
	            default: 1
	        },
	        size: String,
	        simple: Boolean,
	        rounded: Boolean,
	        order: String,
	        iconPack: String
	    },
	    computed: {
	        rootClasses: function rootClasses() {
	            return [this.order, this.size, {
	                'is-simple': this.simple,
	                'is-rounded': this.rounded
	            }];
	        },


	        /**
	         * Total page size (count).
	         */
	        pageCount: function pageCount() {
	            return Math.ceil(this.total / this.perPage);
	        },


	        /**
	         * First item of the page (count).
	         */
	        firstItem: function firstItem() {
	            var firstItem = this.current * this.perPage - this.perPage + 1;
	            return firstItem >= 0 ? firstItem : 0;
	        },


	        /**
	         * Check if previous button is available.
	         */
	        hasPrev: function hasPrev() {
	            return this.current > 1;
	        },


	        /**
	         * Check if first page button should be visible.
	         */
	        hasFirst: function hasFirst() {
	            return this.current >= 3;
	        },


	        /**
	         * Check if first ellipsis should be visible.
	         */
	        hasFirstEllipsis: function hasFirstEllipsis() {
	            return this.current >= 4;
	        },


	        /**
	         * Check if last page button should be visible.
	         */
	        hasLast: function hasLast() {
	            return this.current <= this.pageCount - 2;
	        },


	        /**
	         * Check if last ellipsis should be visible.
	         */
	        hasLastEllipsis: function hasLastEllipsis() {
	            return this.current < this.pageCount - 2 && this.current <= this.pageCount - 3;
	        },


	        /**
	         * Check if next button is available.
	         */
	        hasNext: function hasNext() {
	            return this.current < this.pageCount;
	        },


	        /**
	         * Get near pages, 1 before and 1 after the current.
	         * Also add the click event to the array.
	         */
	        pagesInRange: function pagesInRange() {
	            var _this = this;

	            if (this.simple) return;

	            var left = Math.max(1, this.current - 1);
	            var right = Math.min(this.current + 1, this.pageCount);

	            var pages = [];

	            var _loop = function _loop(i) {
	                pages.push({
	                    number: i,
	                    isCurrent: _this.current === i,
	                    click: function click(event) {
	                        if (_this.current === i) return;
	                        _this.$emit('change', i);
	                        _this.$emit('update:current', i);

	                        // Set focus on element to keep tab order
	                        _this.$nextTick(function () {
	                            return event.target.focus();
	                        });
	                    }
	                });
	            };

	            for (var i = left; i <= right; i++) {
	                _loop(i);
	            }
	            return pages;
	        }
	    },
	    watch: {
	        /**
	         * If current page is trying to be greater than page count, set to last.
	         */
	        pageCount: function pageCount(value) {
	            if (this.current > value) this.last();
	        }
	    },
	    methods: {
	        /**
	         * Previous button click listener.
	         */
	        prev: function prev() {
	            if (!this.hasPrev) return;
	            this.$emit('change', this.current - 1);
	            this.$emit('update:current', this.current - 1);
	        },


	        /**
	         * First button click listener.
	         */
	        first: function first() {
	            this.$emit('change', 1);
	            this.$emit('update:current', 1);
	        },


	        /**
	         * Last button click listener.
	         */
	        last: function last() {
	            this.$emit('change', this.pageCount);
	            this.$emit('update:current', this.pageCount);
	        },


	        /**
	         * Next button click listener.
	         */
	        next: function next() {
	            if (!this.hasNext) return;
	            this.$emit('change', this.current + 1);
	            this.$emit('update:current', this.current + 1);
	        }
	    }
	});

	/***/ }),
	/* 150 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "pagination",
	    class: _vm.rootClasses
	  }, [_c('a', {
	    staticClass: "pagination-previous",
	    attrs: {
	      "role": "button",
	      "href": "#",
	      "disabled": !_vm.hasPrev
	    },
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.prev($event);
	      }
	    }
	  }, [_c('b-icon', {
	    attrs: {
	      "icon": "chevron-left",
	      "pack": _vm.iconPack,
	      "both": ""
	    }
	  })], 1), _vm._v(" "), _c('a', {
	    staticClass: "pagination-next",
	    attrs: {
	      "role": "button",
	      "href": "#",
	      "disabled": !_vm.hasNext
	    },
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.next($event);
	      }
	    }
	  }, [_c('b-icon', {
	    attrs: {
	      "icon": "chevron-right",
	      "pack": _vm.iconPack,
	      "both": ""
	    }
	  })], 1), _vm._v(" "), (!_vm.simple) ? _c('ul', {
	    staticClass: "pagination-list"
	  }, [(_vm.hasFirst) ? _c('li', [_c('a', {
	    staticClass: "pagination-link",
	    attrs: {
	      "role": "button",
	      "href": "#"
	    },
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.first($event);
	      }
	    }
	  }, [_vm._v("\n                1\n            ")])]) : _vm._e(), _vm._v(" "), (_vm.hasFirstEllipsis) ? _c('li', [_c('span', {
	    staticClass: "pagination-ellipsis"
	  }, [_vm._v("…")])]) : _vm._e(), _vm._v(" "), _vm._l((_vm.pagesInRange), function(page) {
	    return _c('li', {
	      key: page.number
	    }, [_c('a', {
	      staticClass: "pagination-link",
	      class: {
	        'is-current': page.isCurrent
	      },
	      attrs: {
	        "role": "button",
	        "href": "#"
	      },
	      on: {
	        "click": function($event) {
	          $event.preventDefault();
	          page.click($event);
	        }
	      }
	    }, [_vm._v("\n                " + _vm._s(page.number) + "\n            ")])])
	  }), _vm._v(" "), (_vm.hasLastEllipsis) ? _c('li', [_c('span', {
	    staticClass: "pagination-ellipsis"
	  }, [_vm._v("…")])]) : _vm._e(), _vm._v(" "), (_vm.hasLast) ? _c('li', [_c('a', {
	    staticClass: "pagination-link",
	    attrs: {
	      "role": "button",
	      "href": "#"
	    },
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.last($event);
	      }
	    }
	  }, [_vm._v("\n                " + _vm._s(_vm.pageCount) + "\n            ")])]) : _vm._e()], 2) : _vm._e(), _vm._v(" "), (_vm.simple) ? _c('small', {
	    staticClass: "info"
	  }, [(_vm.perPage == 1) ? [_vm._v("\n            " + _vm._s(_vm.firstItem) + " / " + _vm._s(_vm.total) + "\n        ")] : [_vm._v("\n            " + _vm._s(_vm.firstItem) + "-" + _vm._s(Math.min(_vm.current * _vm.perPage, _vm.total)) + " / " + _vm._s(_vm.total) + "\n        ")]], 2) : _vm._e()])
	},staticRenderFns: []};

	/***/ }),
	/* 151 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(152),
	  /* template */
	  __webpack_require__(153),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 152 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__);

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

	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BRadio',
	    props: {
	        value: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
	        nativeValue: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
	        type: String,
	        disabled: Boolean,
	        required: Boolean,
	        name: String,
	        size: String
	    },
	    data: function data() {
	        return {
	            newValue: this.value
	        };
	    },

	    computed: {
	        computedValue: {
	            get: function get() {
	                return this.newValue;
	            },
	            set: function set(value) {
	                this.newValue = value;
	                this.$emit('input', value);
	            }
	        }
	    },
	    watch: {
	        /**
	         * When v-model change, set internal value.
	         */
	        value: function value(_value) {
	            this.newValue = _value;
	        }
	    }
	});

	/***/ }),
	/* 153 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('label', {
	    ref: "label",
	    staticClass: "b-radio radio",
	    class: [_vm.size, {
	      'is-disabled': _vm.disabled
	    }],
	    attrs: {
	      "disabled": _vm.disabled,
	      "tabindex": _vm.disabled ? false : 0
	    },
	    on: {
	      "keydown": function($event) {
	        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key) && _vm._k($event.keyCode, "space", 32, $event.key)) { return null; }
	        $event.preventDefault();
	        _vm.$refs.label.click();
	      }
	    }
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.computedValue),
	      expression: "computedValue"
	    }],
	    attrs: {
	      "type": "radio",
	      "disabled": _vm.disabled,
	      "required": _vm.required,
	      "name": _vm.name
	    },
	    domProps: {
	      "value": _vm.nativeValue,
	      "checked": _vm._q(_vm.computedValue, _vm.nativeValue)
	    },
	    on: {
	      "change": function($event) {
	        _vm.computedValue = _vm.nativeValue;
	      }
	    }
	  }), _vm._v(" "), _c('span', {
	    staticClass: "check",
	    class: _vm.type
	  }), _vm._v(" "), _c('span', {
	    staticClass: "control-label"
	  }, [_vm._t("default")], 2)])
	},staticRenderFns: []};

	/***/ }),
	/* 154 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(155),
	  /* template */
	  __webpack_require__(156),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 155 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__);

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

	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BRadioButton',
	    props: {
	        value: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
	        nativeValue: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
	        type: {
	            type: String,
	            default: 'is-primary'
	        },
	        disabled: Boolean,
	        name: String,
	        size: String
	    },
	    data: function data() {
	        return {
	            newValue: this.value
	        };
	    },

	    computed: {
	        computedValue: {
	            get: function get() {
	                return this.newValue;
	            },
	            set: function set(value) {
	                this.newValue = value;
	                this.$emit('input', value);
	            }
	        }
	    },
	    watch: {
	        /**
	         * When v-model change, set internal value.
	         */
	        value: function value(_value) {
	            this.newValue = _value;
	        }
	    }
	});

	/***/ }),
	/* 156 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "control"
	  }, [_c('label', {
	    ref: "label",
	    staticClass: "b-radio radio button",
	    class: [_vm.newValue === _vm.nativeValue ? _vm.type : null, _vm.size],
	    attrs: {
	      "disabled": _vm.disabled,
	      "tabindex": _vm.disabled ? false : 0
	    },
	    on: {
	      "keydown": function($event) {
	        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key) && _vm._k($event.keyCode, "space", 32, $event.key)) { return null; }
	        $event.preventDefault();
	        _vm.$refs.label.click();
	      }
	    }
	  }, [_vm._t("default"), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.computedValue),
	      expression: "computedValue"
	    }],
	    attrs: {
	      "type": "radio",
	      "disabled": _vm.disabled,
	      "name": _vm.name
	    },
	    domProps: {
	      "value": _vm.nativeValue,
	      "checked": _vm._q(_vm.computedValue, _vm.nativeValue)
	    },
	    on: {
	      "change": function($event) {
	        _vm.computedValue = _vm.nativeValue;
	      }
	    }
	  })], 2)])
	},staticRenderFns: []};

	/***/ }),
	/* 157 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(158),
	  /* template */
	  __webpack_require__(159),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 158 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_config__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_NoticeMixin_js__ = __webpack_require__(65);
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




	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BSnackbar',
	    mixins: [__WEBPACK_IMPORTED_MODULE_1__utils_NoticeMixin_js__["a" /* default */]],
	    props: {
	        actionText: {
	            type: String,
	            default: 'OK'
	        },
	        onAction: {
	            type: Function,
	            default: function _default() {}
	        },
	        indefinite: {
	            type: Boolean,
	            default: false
	        }
	    },
	    data: function data() {
	        return {
	            newDuration: this.duration || __WEBPACK_IMPORTED_MODULE_0__utils_config__["a" /* default */].defaultSnackbarDuration
	        };
	    },

	    methods: {
	        /**
	         * Click listener.
	         * Call action prop before closing (from Mixin).
	         */
	        action: function action() {
	            this.onAction();
	            this.close();
	        }
	    }
	});

	/***/ }),
	/* 159 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('transition', {
	    attrs: {
	      "enter-active-class": _vm.transition.enter,
	      "leave-active-class": _vm.transition.leave
	    }
	  }, [_c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.isActive),
	      expression: "isActive"
	    }],
	    staticClass: "snackbar",
	    class: [_vm.type, _vm.position]
	  }, [_c('p', {
	    staticClass: "text"
	  }, [_vm._v(_vm._s(_vm.message))]), _vm._v(" "), (_vm.actionText) ? _c('div', {
	    staticClass: "action",
	    class: _vm.type,
	    on: {
	      "click": _vm.action
	    }
	  }, [_c('button', {
	    staticClass: "button is-dark"
	  }, [_vm._v(_vm._s(_vm.actionText))])]) : _vm._e()])])
	},staticRenderFns: []};

	/***/ }),
	/* 160 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(161),
	  /* template */
	  __webpack_require__(162),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 161 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__);

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

	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BSwitch',
	    props: {
	        value: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
	        nativeValue: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
	        disabled: Boolean,
	        type: String,
	        name: String,
	        size: String,
	        trueValue: {
	            type: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
	            default: true
	        },
	        falseValue: {
	            type: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
	            default: false
	        }
	    },
	    data: function data() {
	        return {
	            newValue: this.value,
	            isMouseDown: false
	        };
	    },

	    computed: {
	        computedValue: {
	            get: function get() {
	                return this.newValue;
	            },
	            set: function set(value) {
	                this.newValue = value;
	                this.$emit('input', value);
	            }
	        }
	    },
	    watch: {
	        /**
	         * When v-model change, set internal value.
	         */
	        value: function value(_value) {
	            this.newValue = _value;
	        }
	    }
	});

	/***/ }),
	/* 162 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('label', {
	    ref: "label",
	    staticClass: "switch",
	    class: [_vm.size, {
	      'is-disabled': _vm.disabled
	    }],
	    attrs: {
	      "disabled": _vm.disabled,
	      "tabindex": _vm.disabled ? false : 0
	    },
	    on: {
	      "keydown": function($event) {
	        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key) && _vm._k($event.keyCode, "space", 32, $event.key)) { return null; }
	        $event.preventDefault();
	        _vm.$refs.label.click();
	      },
	      "mousedown": function($event) {
	        _vm.isMouseDown = true;
	      },
	      "mouseup": function($event) {
	        _vm.isMouseDown = false;
	      },
	      "mouseout": function($event) {
	        _vm.isMouseDown = false;
	      },
	      "blur": function($event) {
	        _vm.isMouseDown = false;
	      }
	    }
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.computedValue),
	      expression: "computedValue"
	    }],
	    attrs: {
	      "type": "checkbox",
	      "disabled": _vm.disabled,
	      "name": _vm.name,
	      "true-value": _vm.trueValue,
	      "false-value": _vm.falseValue
	    },
	    domProps: {
	      "value": _vm.nativeValue,
	      "checked": Array.isArray(_vm.computedValue) ? _vm._i(_vm.computedValue, _vm.nativeValue) > -1 : _vm._q(_vm.computedValue, _vm.trueValue)
	    },
	    on: {
	      "click": function($event) {
	        $event.stopPropagation();
	      },
	      "change": function($event) {
	        var $$a = _vm.computedValue,
	          $$el = $event.target,
	          $$c = $$el.checked ? (_vm.trueValue) : (_vm.falseValue);
	        if (Array.isArray($$a)) {
	          var $$v = _vm.nativeValue,
	            $$i = _vm._i($$a, $$v);
	          if ($$el.checked) {
	            $$i < 0 && (_vm.computedValue = $$a.concat([$$v]));
	          } else {
	            $$i > -1 && (_vm.computedValue = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
	          }
	        } else {
	          _vm.computedValue = $$c;
	        }
	      }
	    }
	  }), _vm._v(" "), _c('span', {
	    staticClass: "check",
	    class: [{
	      'is-elastic': _vm.isMouseDown && !_vm.disabled
	    }, _vm.type]
	  }), _vm._v(" "), _c('span', {
	    staticClass: "control-label"
	  }, [_vm._t("default")], 2)])
	},staticRenderFns: []};

	/***/ }),
	/* 163 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(164),
	  /* template */
	  __webpack_require__(178),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 164 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(165);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_helpers__ = __webpack_require__(7);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__checkbox_Checkbox__ = __webpack_require__(60);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__checkbox_Checkbox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__checkbox_Checkbox__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__icon_Icon__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__icon_Icon__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pagination_Pagination__ = __webpack_require__(64);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pagination_Pagination___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__pagination_Pagination__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__TableMobileSort__ = __webpack_require__(173);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__TableMobileSort___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__TableMobileSort__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__TableColumn__ = __webpack_require__(66);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__TableColumn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__TableColumn__);



	var _components;

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










	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BTable',
	    components: (_components = {}, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_3__checkbox_Checkbox___default.a.name, __WEBPACK_IMPORTED_MODULE_3__checkbox_Checkbox___default.a), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_4__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_4__icon_Icon___default.a), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_5__pagination_Pagination___default.a.name, __WEBPACK_IMPORTED_MODULE_5__pagination_Pagination___default.a), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_6__TableMobileSort___default.a.name, __WEBPACK_IMPORTED_MODULE_6__TableMobileSort___default.a), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_7__TableColumn___default.a.name, __WEBPACK_IMPORTED_MODULE_7__TableColumn___default.a), _components),
	    props: {
	        data: {
	            type: Array,
	            default: function _default() {
	                return [];
	            }
	        },
	        columns: {
	            type: Array,
	            default: function _default() {
	                return [];
	            }
	        },
	        bordered: Boolean,
	        striped: Boolean,
	        narrowed: Boolean,
	        hoverable: Boolean,
	        loading: Boolean,
	        detailed: Boolean,
	        checkable: Boolean,
	        selected: Object,
	        focusable: Boolean,
	        customIsChecked: Function,
	        isRowCheckable: {
	            type: Function,
	            default: function _default() {
	                return true;
	            }
	        },
	        checkedRows: {
	            type: Array,
	            default: function _default() {
	                return [];
	            }
	        },
	        mobileCards: {
	            type: Boolean,
	            default: true
	        },
	        defaultSort: [String, Array],
	        defaultSortDirection: {
	            type: String,
	            default: 'asc'
	        },
	        paginated: Boolean,
	        currentPage: {
	            type: Number,
	            default: 1
	        },
	        perPage: {
	            type: [Number, String],
	            default: 20
	        },
	        paginationSimple: Boolean,
	        paginationSize: String,
	        backendSorting: Boolean,
	        rowClass: {
	            type: Function,
	            default: function _default() {
	                return '';
	            }
	        },
	        openedDetailed: {
	            type: Array,
	            default: function _default() {
	                return [];
	            }
	        },
	        hasDetailedVisible: {
	            type: Function,
	            default: function _default() {
	                return true;
	            }
	        },
	        detailKey: {
	            type: String,
	            default: ''
	        },
	        backendPagination: Boolean,
	        total: {
	            type: [Number, String],
	            default: 0
	        },
	        iconPack: String
	    },
	    data: function data() {
	        return {
	            getValueByPath: __WEBPACK_IMPORTED_MODULE_2__utils_helpers__["b" /* getValueByPath */],
	            newColumns: [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(this.columns)),
	            visibleDetailRows: this.openedDetailed,
	            newData: this.data,
	            newDataTotal: this.backendPagination ? this.total : this.data.length,
	            newCheckedRows: [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(this.checkedRows)),
	            newCurrentPage: this.currentPage,
	            currentSortColumn: {},
	            isAsc: true,
	            firstTimeSort: true, // Used by first time initSort
	            _isTable: true // Used by TableColumn
	        };
	    },

	    computed: {
	        tableClasses: function tableClasses() {
	            return {
	                'is-bordered': this.bordered,
	                'is-striped': this.striped,
	                'is-narrow': this.narrowed,
	                'has-mobile-cards': this.mobileCards,
	                'is-hoverable': (this.hoverable || this.focusable) && this.visibleData.length
	            };
	        },


	        /**
	         * Splitted data based on the pagination.
	         */
	        visibleData: function visibleData() {
	            if (!this.paginated) return this.newData;

	            var currentPage = this.newCurrentPage;
	            var perPage = this.perPage;

	            if (this.newData.length <= perPage) {
	                return this.newData;
	            } else {
	                var start = (currentPage - 1) * perPage;
	                var end = parseInt(start, 10) + parseInt(perPage, 10);
	                return this.newData.slice(start, end);
	            }
	        },


	        /**
	         * Check if all rows in the page are checked.
	         */
	        isAllChecked: function isAllChecked() {
	            var _this = this;

	            var validVisibleData = this.visibleData.filter(function (row) {
	                return _this.isRowCheckable(row);
	            });
	            if (validVisibleData.length === 0) return false;
	            var isAllChecked = validVisibleData.some(function (currentVisibleRow) {
	                return Object(__WEBPACK_IMPORTED_MODULE_2__utils_helpers__["c" /* indexOf */])(_this.newCheckedRows, currentVisibleRow, _this.customIsChecked) < 0;
	            });
	            return !isAllChecked;
	        },


	        /**
	         * Check if all rows in the page are checkable.
	         */
	        isAllUncheckable: function isAllUncheckable() {
	            var _this2 = this;

	            var validVisibleData = this.visibleData.filter(function (row) {
	                return _this2.isRowCheckable(row);
	            });
	            return validVisibleData.length === 0;
	        },


	        /**
	         * Check if has any sortable column.
	         */
	        hasSortablenewColumns: function hasSortablenewColumns() {
	            return this.newColumns.some(function (column) {
	                return column.sortable;
	            });
	        },


	        /**
	         * Return total column count based if it's checkable or expanded
	         */
	        columnCount: function columnCount() {
	            var count = this.newColumns.length;
	            count += this.checkable ? 1 : 0;
	            count += this.detailed ? 1 : 0;

	            return count;
	        }
	    },
	    watch: {
	        /**
	         * When data prop change:
	         *   1. Update internal value.
	         *   2. Reset newColumns (thead), in case it's on a v-for loop.
	         *   3. Sort again if it's not backend-sort.
	         *   4. Set new total if it's not backend-paginated.
	         */
	        data: function data(value) {
	            var _this3 = this;

	            // Save newColumns before resetting
	            var newColumns = this.newColumns;

	            this.newColumns = [];
	            this.newData = value;

	            // Prevent table from being headless, data could change and created hook
	            // on column might not trigger
	            this.$nextTick(function () {
	                if (!_this3.newColumns.length) _this3.newColumns = newColumns;
	            });

	            if (!this.backendSorting) {
	                this.sort(this.currentSortColumn, true);
	            }
	            if (!this.backendPagination) {
	                this.newDataTotal = value.length;
	            }
	        },


	        /**
	         * When Pagination total change, update internal total
	         * only if it's backend-paginated.
	         */
	        total: function total(newTotal) {
	            if (!this.backendPagination) return;

	            this.newDataTotal = newTotal;
	        },


	        /**
	         * When checkedRows prop change, update internal value without
	         * mutating original data.
	         */
	        checkedRows: function checkedRows(rows) {
	            this.newCheckedRows = [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(rows));
	        },
	        columns: function columns(value) {
	            this.newColumns = [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(value));
	        },


	        /**
	         * When newColumns change, call initSort only first time (For example async data).
	         */
	        newColumns: function newColumns(_newColumns) {
	            if (_newColumns.length && this.firstTimeSort) {
	                this.initSort();
	                this.firstTimeSort = false;
	            } else if (_newColumns.length) {
	                if (this.currentSortColumn.field) {
	                    for (var i = 0; i < _newColumns.length; i++) {
	                        if (_newColumns[i].field === this.currentSortColumn.field) {
	                            this.currentSortColumn = _newColumns[i];
	                            break;
	                        }
	                    }
	                }
	            }
	        },


	        /**
	        * When the user wants to control the detailed rows via props.
	        * Or wants to open the details of certain row with the router for example.
	        */
	        openedDetailed: function openedDetailed(expandedRows) {
	            this.visibleDetailRows = expandedRows;
	        },
	        currentPage: function currentPage(newVal) {
	            this.newCurrentPage = newVal;
	        }
	    },
	    methods: {
	        /**
	         * Sort an array by key without mutating original data.
	         * Call the user sort function if it was passed.
	         */
	        sortBy: function sortBy(array, key, fn, isAsc) {
	            var sorted = [];
	            // Sorting without mutating original data
	            if (fn && typeof fn === 'function') {
	                sorted = [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(array)).sort(function (a, b) {
	                    return fn(a, b, isAsc);
	                });
	            } else {
	                sorted = [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(array)).sort(function (a, b) {
	                    // Get nested values from objects
	                    var newA = Object(__WEBPACK_IMPORTED_MODULE_2__utils_helpers__["b" /* getValueByPath */])(a, key);
	                    var newB = Object(__WEBPACK_IMPORTED_MODULE_2__utils_helpers__["b" /* getValueByPath */])(b, key);

	                    // sort boolean type
	                    if (typeof newA === 'boolean' && typeof newB === 'boolean') {
	                        return isAsc ? newA - newB : newB - newA;
	                    }

	                    if (!newA && newA !== 0) return 1;
	                    if (!newB && newB !== 0) return -1;
	                    if (newA === newB) return 0;

	                    newA = typeof newA === 'string' ? newA.toUpperCase() : newA;
	                    newB = typeof newB === 'string' ? newB.toUpperCase() : newB;

	                    return isAsc ? newA > newB ? 1 : -1 : newA > newB ? -1 : 1;
	                });
	            }

	            return sorted;
	        },


	        /**
	         * Sort the column.
	         * Toggle current direction on column if it's sortable
	         * and not just updating the prop.
	         */
	        sort: function sort(column) {
	            var updatingData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	            if (!column || !column.sortable) return;

	            if (!updatingData) {
	                this.isAsc = column === this.currentSortColumn ? !this.isAsc : this.defaultSortDirection.toLowerCase() !== 'desc';
	            }
	            if (!this.firstTimeSort) {
	                this.$emit('sort', column.field, this.isAsc ? 'asc' : 'desc');
	            }
	            if (!this.backendSorting) {
	                this.newData = this.sortBy(this.newData, column.field, column.customSort, this.isAsc);
	            }
	            this.currentSortColumn = column;
	        },


	        /**
	         * Check if the row is checked (is added to the array).
	         */
	        isRowChecked: function isRowChecked(row) {
	            return Object(__WEBPACK_IMPORTED_MODULE_2__utils_helpers__["c" /* indexOf */])(this.newCheckedRows, row, this.customIsChecked) >= 0;
	        },


	        /**
	         * Remove a checked row from the array.
	         */
	        removeCheckedRow: function removeCheckedRow(row) {
	            var index = Object(__WEBPACK_IMPORTED_MODULE_2__utils_helpers__["c" /* indexOf */])(this.newCheckedRows, row, this.customIsChecked);
	            if (index >= 0) {
	                this.newCheckedRows.splice(index, 1);
	            }
	        },


	        /**
	         * Header checkbox click listener.
	         * Add or remove all rows in current page.
	         */
	        checkAll: function checkAll() {
	            var _this4 = this;

	            var isAllChecked = this.isAllChecked;
	            this.visibleData.forEach(function (currentRow) {
	                _this4.removeCheckedRow(currentRow);
	                if (!isAllChecked) {
	                    if (_this4.isRowCheckable(currentRow)) {
	                        _this4.newCheckedRows.push(currentRow);
	                    }
	                }
	            });

	            this.$emit('check', this.newCheckedRows);
	            this.$emit('check-all', this.newCheckedRows);

	            // Emit checked rows to update user variable
	            this.$emit('update:checkedRows', this.newCheckedRows);
	        },


	        /**
	         * Row checkbox click listener.
	         * Add or remove a single row.
	         */
	        checkRow: function checkRow(row) {
	            if (!this.isRowChecked(row)) {
	                this.newCheckedRows.push(row);
	            } else {
	                this.removeCheckedRow(row);
	            }

	            this.$emit('check', this.newCheckedRows, row);

	            // Emit checked rows to update user variable
	            this.$emit('update:checkedRows', this.newCheckedRows);
	        },


	        /**
	         * Row click listener.
	         * Emit all necessary events.
	         */
	        selectRow: function selectRow(row, index) {
	            this.$emit('click', row);

	            if (this.selected === row) return;

	            // Emit new and old row
	            this.$emit('select', row, this.selected);

	            // Emit new row to update user variable
	            this.$emit('update:selected', row);
	        },


	        /**
	         * Paginator change listener.
	         */
	        pageChanged: function pageChanged(page) {
	            this.newCurrentPage = page > 0 ? page : 1;
	            this.$emit('page-change', this.newCurrentPage);
	            this.$emit('update:currentPage', this.newCurrentPage);
	        },


	        /**
	         * Toggle to show/hide details slot
	         */
	        toggleDetails: function toggleDetails(obj) {
	            var found = this.isVisibleDetailRow(obj);

	            if (found) {
	                this.closeDetailRow(obj);
	                this.$emit('details-close', obj);
	            } else {
	                this.openDetailRow(obj);
	                this.$emit('details-open', obj);
	            }

	            // Syncs the detailed rows with the parent component
	            this.$emit('update:openedDetailed', this.visibleDetailRows);
	        },
	        openDetailRow: function openDetailRow(obj) {
	            var index = this.handleDetailKey(obj);
	            this.visibleDetailRows.push(index);
	        },
	        closeDetailRow: function closeDetailRow(obj) {
	            var index = this.handleDetailKey(obj);
	            var i = this.visibleDetailRows.indexOf(index);
	            this.visibleDetailRows.splice(i, 1);
	        },
	        isVisibleDetailRow: function isVisibleDetailRow(obj) {
	            var index = this.handleDetailKey(obj);
	            var result = this.visibleDetailRows.indexOf(index) >= 0;
	            return result;
	        },


	        /**
	        * When the detailKey is defined we use the object[detailKey] as index.
	        * If not, use the object reference by default.
	        */
	        handleDetailKey: function handleDetailKey(index) {
	            var key = this.detailKey;
	            return !key.length ? index : index[key];
	        },
	        checkPredefinedDetailedRows: function checkPredefinedDetailedRows() {
	            var defaultExpandedRowsDefined = this.openedDetailed.length > 0;
	            if (defaultExpandedRowsDefined && !this.detailKey.length) {
	                throw new Error('If you set a predefined opened-detailed, you must provide a unique key using the prop "detail-key"');
	            }
	        },


	        /**
	         * Check if footer slot has custom content.
	         */
	        hasCustomFooterSlot: function hasCustomFooterSlot() {
	            if (this.$slots.footer.length > 1) return true;

	            var tag = this.$slots.footer[0].tag;
	            if (tag !== 'th' && tag !== 'td') return false;

	            return true;
	        },


	        /**
	         * Check if bottom-left slot exists.
	         */
	        hasBottomLeftSlot: function hasBottomLeftSlot() {
	            return typeof this.$slots['bottom-left'] !== 'undefined';
	        },


	        /**
	         * Table arrow keys listener, change selection.
	         */
	        pressedArrow: function pressedArrow(pos) {
	            if (!this.visibleData.length) return;

	            var index = this.visibleData.indexOf(this.selected) + pos;

	            // Prevent from going up from first and down from last
	            index = index < 0 ? 0 : index > this.visibleData.length - 1 ? this.visibleData.length - 1 : index;

	            this.selectRow(this.visibleData[index]);
	        },


	        /**
	         * Focus table element if has selected prop.
	         */
	        focus: function focus() {
	            if (!this.focusable) return;

	            this.$el.querySelector('table').focus();
	        },


	        /**
	         * Initial sorted column based on the default-sort prop.
	         */
	        initSort: function initSort() {
	            var _this5 = this;

	            if (!this.defaultSort) return;

	            var sortField = '';
	            var sortDirection = this.defaultSortDirection;

	            if (Array.isArray(this.defaultSort)) {
	                sortField = this.defaultSort[0];
	                if (this.defaultSort[1]) {
	                    sortDirection = this.defaultSort[1];
	                }
	            } else {
	                sortField = this.defaultSort;
	            }

	            this.newColumns.forEach(function (column) {
	                if (column.field === sortField) {
	                    _this5.isAsc = sortDirection.toLowerCase() !== 'desc';
	                    _this5.sort(column, true);
	                }
	            });
	        }
	    },

	    mounted: function mounted() {
	        this.checkPredefinedDetailedRows();
	    }
	});

	/***/ }),
	/* 165 */
	/***/ (function(module, exports, __webpack_require__) {


	exports.__esModule = true;

	var _from = __webpack_require__(166);

	var _from2 = _interopRequireDefault(_from);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};

	/***/ }),
	/* 166 */
	/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(167), __esModule: true };

	/***/ }),
	/* 167 */
	/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(38);
	__webpack_require__(168);
	module.exports = __webpack_require__(6).Array.from;


	/***/ }),
	/* 168 */
	/***/ (function(module, exports, __webpack_require__) {

	var ctx = __webpack_require__(45);
	var $export = __webpack_require__(17);
	var toObject = __webpack_require__(37);
	var call = __webpack_require__(169);
	var isArrayIter = __webpack_require__(170);
	var toLength = __webpack_require__(50);
	var createProperty = __webpack_require__(171);
	var getIterFn = __webpack_require__(59);

	$export($export.S + $export.F * !__webpack_require__(172)(function (iter) { }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	    var O = toObject(arrayLike);
	    var C = typeof this == 'function' ? this : Array;
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var index = 0;
	    var iterFn = getIterFn(O);
	    var length, result, step, iterator;
	    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for (result = new C(length); length > index; index++) {
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


	/***/ }),
	/* 169 */
	/***/ (function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(15);
	module.exports = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) anObject(ret.call(iterator));
	    throw e;
	  }
	};


	/***/ }),
	/* 170 */
	/***/ (function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators = __webpack_require__(21);
	var ITERATOR = __webpack_require__(4)('iterator');
	var ArrayProto = Array.prototype;

	module.exports = function (it) {
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};


	/***/ }),
	/* 171 */
	/***/ (function(module, exports, __webpack_require__) {

	var $defineProperty = __webpack_require__(9);
	var createDesc = __webpack_require__(20);

	module.exports = function (object, index, value) {
	  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};


	/***/ }),
	/* 172 */
	/***/ (function(module, exports, __webpack_require__) {

	var ITERATOR = __webpack_require__(4)('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function () { SAFE_CLOSING = true; };
	} catch (e) { /* empty */ }

	module.exports = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR]();
	    iter.next = function () { return { done: safe = true }; };
	    arr[ITERATOR] = function () { return iter; };
	    exec(arr);
	  } catch (e) { /* empty */ }
	  return safe;
	};


	/***/ }),
	/* 173 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(174),
	  /* template */
	  __webpack_require__(175),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 174 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__select_Select__ = __webpack_require__(28);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__select_Select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__select_Select__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__icon_Icon__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__icon_Icon__);


	var _components;

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




	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BTableMobileSort',
	    components: (_components = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_1__select_Select___default.a.name, __WEBPACK_IMPORTED_MODULE_1__select_Select___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_2__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_2__icon_Icon___default.a), _components),
	    props: {
	        currentSortColumn: Object,
	        isAsc: Boolean,
	        columns: Array
	    },
	    data: function data() {
	        return {
	            mobileSort: this.currentSortColumn
	        };
	    },

	    watch: {
	        mobileSort: function mobileSort(column) {
	            if (this.currentSortColumn === column) return;

	            this.$emit('sort', column);
	        },
	        currentSortColumn: function currentSortColumn(column) {
	            this.mobileSort = column;
	        }
	    },
	    methods: {
	        sort: function sort() {
	            this.$emit('sort', this.mobileSort);
	        }
	    }
	});

	/***/ }),
	/* 175 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "field table-mobile-sort"
	  }, [_c('div', {
	    staticClass: "field has-addons"
	  }, [_c('b-select', {
	    attrs: {
	      "expanded": ""
	    },
	    model: {
	      value: (_vm.mobileSort),
	      callback: function($$v) {
	        _vm.mobileSort = $$v;
	      },
	      expression: "mobileSort"
	    }
	  }, _vm._l((_vm.columns), function(column, index) {
	    return (column.sortable) ? _c('option', {
	      key: index,
	      domProps: {
	        "value": column
	      }
	    }, [_vm._v("\n                " + _vm._s(column.label) + "\n            ")]) : _vm._e()
	  })), _vm._v(" "), _c('div', {
	    staticClass: "control"
	  }, [_c('button', {
	    staticClass: "button is-primary",
	    on: {
	      "click": _vm.sort
	    }
	  }, [_c('b-icon', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.currentSortColumn === _vm.mobileSort),
	      expression: "currentSortColumn === mobileSort"
	    }],
	    class: {
	      'is-desc': !_vm.isAsc
	    },
	    attrs: {
	      "icon": "arrow-up",
	      "size": "is-small",
	      "both": ""
	    }
	  })], 1)])], 1)])
	},staticRenderFns: []};

	/***/ }),
	/* 176 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__);

	//
	//
	//
	//
	//
	//
	//
	//
	//

	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BTableColumn',
	    props: {
	        label: String,
	        customKey: [String, Number],
	        field: String,
	        meta: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
	        width: [Number, String],
	        numeric: Boolean,
	        centered: Boolean,
	        sortable: Boolean,
	        visible: {
	            type: Boolean,
	            default: true
	        },
	        customSort: Function,
	        internal: Boolean // Used internally by Table
	    },
	    data: function data() {
	        return {
	            newKey: this.customKey || this.label
	        };
	    },

	    computed: {
	        rootClasses: function rootClasses() {
	            return {
	                'has-text-right': this.numeric && !this.centered,
	                'has-text-centered': this.centered
	            };
	        }
	    },
	    methods: {
	        addRefToTable: function addRefToTable() {
	            var _this = this;

	            if (!this.$parent.$data._isTable) {
	                this.$destroy();
	                throw new Error('You should wrap bTableColumn on a bTable');
	            }

	            if (this.internal) return;

	            // Since we're using scoped prop the columns gonna be multiplied,
	            // this finds when to stop based on the newKey property.
	            var repeated = this.$parent.newColumns.some(function (column) {
	                return column.newKey === _this.newKey;
	            });
	            !repeated && this.$parent.newColumns.push(this);
	        }
	    },
	    beforeMount: function beforeMount() {
	        this.addRefToTable();
	    },
	    beforeUpdate: function beforeUpdate() {
	        this.addRefToTable();
	    },
	    beforeDestroy: function beforeDestroy() {
	        var index = this.$parent.newColumns.map(function (column) {
	            return column.newKey;
	        }).indexOf(this.newKey);
	        if (index >= 0) {
	            this.$parent.newColumns.splice(index, 1);
	        }
	    }
	});

	/***/ }),
	/* 177 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return (_vm.visible) ? _c('td', {
	    class: _vm.rootClasses,
	    attrs: {
	      "data-label": _vm.label
	    }
	  }, [_c('span', [_vm._t("default")], 2)]) : _vm._e()
	},staticRenderFns: []};

	/***/ }),
	/* 178 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "b-table",
	    class: {
	      'is-loading': _vm.loading
	    }
	  }, [(_vm.mobileCards && _vm.hasSortablenewColumns) ? _c('b-table-mobile-sort', {
	    attrs: {
	      "current-sort-column": _vm.currentSortColumn,
	      "is-asc": _vm.isAsc,
	      "columns": _vm.newColumns
	    },
	    on: {
	      "sort": function (column) { return _vm.sort(column); }
	    }
	  }) : _vm._e(), _vm._v(" "), _c('div', {
	    staticClass: "table-wrapper"
	  }, [_c('table', {
	    staticClass: "table",
	    class: _vm.tableClasses,
	    attrs: {
	      "tabindex": !_vm.focusable ? false : 0
	    },
	    on: {
	      "keydown": [function($event) {
	        if (!('button' in $event) && _vm._k($event.keyCode, "up", 38, $event.key)) { return null; }
	        $event.preventDefault();
	        _vm.pressedArrow(-1);
	      }, function($event) {
	        if (!('button' in $event) && _vm._k($event.keyCode, "down", 40, $event.key)) { return null; }
	        $event.preventDefault();
	        _vm.pressedArrow(1);
	      }]
	    }
	  }, [(_vm.newColumns.length) ? _c('thead', [_c('tr', [(_vm.detailed) ? _c('th', {
	    attrs: {
	      "width": "40px"
	    }
	  }) : _vm._e(), _vm._v(" "), (_vm.checkable) ? _c('th', {
	    staticClass: "checkbox-cell"
	  }, [_c('b-checkbox', {
	    attrs: {
	      "value": _vm.isAllChecked,
	      "disabled": _vm.isAllUncheckable
	    },
	    nativeOn: {
	      "change": function($event) {
	        _vm.checkAll($event);
	      }
	    }
	  })], 1) : _vm._e(), _vm._v(" "), _vm._l((_vm.newColumns), function(column, index) {
	    return (column.visible || column.visible === undefined) ? _c('th', {
	      key: index,
	      class: {
	        'is-current-sort': _vm.currentSortColumn === column,
	          'is-sortable': column.sortable
	      },
	      style: ({
	        width: column.width + 'px'
	      }),
	      on: {
	        "click": function($event) {
	          $event.stopPropagation();
	          _vm.sort(column);
	        }
	      }
	    }, [_c('div', {
	      staticClass: "th-wrap",
	      class: {
	        'is-numeric': column.numeric,
	          'is-centered': column.centered
	      }
	    }, [(_vm.$scopedSlots.header) ? _vm._t("header", null, {
	      column: column,
	      index: index
	    }) : [_vm._v(_vm._s(column.label))], _vm._v(" "), _c('b-icon', {
	      directives: [{
	        name: "show",
	        rawName: "v-show",
	        value: (_vm.currentSortColumn === column),
	        expression: "currentSortColumn === column"
	      }],
	      class: {
	        'is-desc': !_vm.isAsc
	      },
	      attrs: {
	        "icon": "arrow-up",
	        "pack": _vm.iconPack,
	        "both": "",
	        "size": "is-small"
	      }
	    })], 2)]) : _vm._e()
	  })], 2)]) : _vm._e(), _vm._v(" "), (_vm.visibleData.length) ? _c('tbody', [_vm._l((_vm.visibleData), function(row, index) {
	    return [_c('tr', {
	      key: index,
	      class: [_vm.rowClass(row, index), {
	        'is-selected': row === _vm.selected,
	        'is-checked': _vm.isRowChecked(row)
	      }],
	      on: {
	        "click": function($event) {
	          _vm.selectRow(row);
	        },
	        "dblclick": function($event) {
	          _vm.$emit('dblclick', row);
	        }
	      }
	    }, [(_vm.detailed) ? _c('td', {
	      staticClass: "chevron-cell"
	    }, [(_vm.hasDetailedVisible(row)) ? _c('a', {
	      attrs: {
	        "role": "button"
	      },
	      on: {
	        "click": function($event) {
	          $event.stopPropagation();
	          _vm.toggleDetails(row);
	        }
	      }
	    }, [_c('b-icon', {
	      class: {
	        'is-expanded': _vm.isVisibleDetailRow(row)
	      },
	      attrs: {
	        "icon": "chevron-right",
	        "pack": _vm.iconPack,
	        "both": ""
	      }
	    })], 1) : _vm._e()]) : _vm._e(), _vm._v(" "), (_vm.checkable) ? _c('td', {
	      staticClass: "checkbox-cell"
	    }, [_c('b-checkbox', {
	      attrs: {
	        "disabled": !_vm.isRowCheckable(row),
	        "value": _vm.isRowChecked(row)
	      },
	      nativeOn: {
	        "change": function($event) {
	          _vm.checkRow(row);
	        }
	      }
	    })], 1) : _vm._e(), _vm._v(" "), (_vm.$scopedSlots.default) ? _vm._t("default", null, {
	      row: row,
	      index: index
	    }) : _vm._l((_vm.newColumns), function(column) {
	      return _c('BTableColumn', _vm._b({
	        key: column.field,
	        attrs: {
	          "internal": ""
	        }
	      }, 'BTableColumn', column, false), [(column.renderHtml) ? _c('span', {
	        domProps: {
	          "innerHTML": _vm._s(_vm.getValueByPath(row, column.field))
	        }
	      }) : [_vm._v("\n                                    " + _vm._s(_vm.getValueByPath(row, column.field)) + "\n                                ")]], 2)
	    })], 2), _vm._v(" "), (_vm.detailed && _vm.isVisibleDetailRow(row)) ? _c('tr', {
	      staticClass: "detail"
	    }, [_c('td', {
	      attrs: {
	        "colspan": _vm.columnCount
	      }
	    }, [_c('div', {
	      staticClass: "detail-container"
	    }, [_vm._t("detail", null, {
	      row: row,
	      index: index
	    })], 2)])]) : _vm._e()]
	  })], 2) : _c('tbody', [_c('tr', {
	    staticClass: "is-empty"
	  }, [_c('td', {
	    attrs: {
	      "colspan": _vm.columnCount
	    }
	  }, [_vm._t("empty")], 2)])]), _vm._v(" "), (_vm.$slots.footer !== undefined) ? _c('tfoot', [_c('tr', {
	    staticClass: "table-footer"
	  }, [(_vm.hasCustomFooterSlot()) ? _vm._t("footer") : _c('th', {
	    attrs: {
	      "colspan": _vm.columnCount
	    }
	  }, [_vm._t("footer")], 2)], 2)]) : _vm._e()])]), _vm._v(" "), ((_vm.checkable && _vm.hasBottomLeftSlot()) || _vm.paginated) ? _c('div', {
	    staticClass: "level"
	  }, [_c('div', {
	    staticClass: "level-left"
	  }, [_vm._t("bottom-left")], 2), _vm._v(" "), _c('div', {
	    staticClass: "level-right"
	  }, [(_vm.paginated) ? _c('div', {
	    staticClass: "level-item"
	  }, [_c('b-pagination', {
	    attrs: {
	      "icon-pack": _vm.iconPack,
	      "total": _vm.newDataTotal,
	      "per-page": _vm.perPage,
	      "simple": _vm.paginationSimple,
	      "size": _vm.paginationSize,
	      "current": _vm.newCurrentPage
	    },
	    on: {
	      "change": _vm.pageChanged
	    }
	  })], 1) : _vm._e()])]) : _vm._e()], 1)
	},staticRenderFns: []};

	/***/ }),
	/* 179 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(180),
	  /* template */
	  __webpack_require__(181),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 180 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

	// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/defineProperty.js
	var defineProperty = __webpack_require__(1);
	var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

	// EXTERNAL MODULE: ./src/components/icon/Icon.vue
	var Icon = __webpack_require__(3);
	var Icon_default = /*#__PURE__*/__webpack_require__.n(Icon);

	// CONCATENATED MODULE: ./src/utils/SlotComponent.js
	/* harmony default export */ var SlotComponent = ({
	    name: 'BSlotComponent',
	    props: {
	        component: {
	            type: Object,
	            required: true
	        },
	        name: {
	            type: String,
	            default: 'default'
	        },
	        tag: {
	            type: String,
	            default: 'div'
	        },
	        event: {
	            type: String,
	            default: 'hook:updated'
	        }
	    },
	    methods: {
	        refresh: function refresh() {
	            this.$forceUpdate();
	        },
	        isVueComponent: function isVueComponent() {
	            return this.component && this.component._isVue;
	        }
	    },
	    created: function created() {
	        if (this.isVueComponent()) {
	            this.component.$on(this.event, this.refresh);
	        }
	    },
	    beforeDestroy: function beforeDestroy() {
	        if (this.isVueComponent()) {
	            this.component.$off(this.event, this.refresh);
	        }
	    },
	    render: function render(h) {
	        if (this.isVueComponent()) {
	            var slots = this.component.$slots[this.name];
	            return h(this.tag, {}, slots);
	        }
	    }
	});
	// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/tabs/Tabs.vue


	var _components;

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




	/* harmony default export */ var Tabs = __webpack_exports__["default"] = ({
	    name: 'BTabs',
	    components: (_components = {}, defineProperty_default()(_components, Icon_default.a.name, Icon_default.a), defineProperty_default()(_components, SlotComponent.name, SlotComponent), _components),
	    props: {
	        value: Number,
	        expanded: Boolean,
	        type: String,
	        size: String,
	        position: String,
	        animated: {
	            type: Boolean,
	            default: true
	        }
	    },
	    data: function data() {
	        return {
	            activeTab: this.value || 0,
	            tabItems: [],
	            contentHeight: 0,
	            _isTabs: true // Used internally by TabItem
	        };
	    },

	    computed: {
	        navClasses: function navClasses() {
	            return [this.type, this.size, this.position, {
	                'is-fullwidth': this.expanded,
	                'is-toggle-rounded is-toggle': this.type === 'is-toggle-rounded'
	            }];
	        }
	    },
	    watch: {
	        /**
	         * When v-model is changed set the new active tab.
	         */
	        value: function value(_value) {
	            this.changeTab(_value);
	        },


	        /**
	         * When tab-items are updated, set active one.
	         */
	        tabItems: function tabItems() {
	            if (this.tabItems.length) {
	                this.tabItems[this.activeTab].isActive = true;
	            }
	        }
	    },
	    methods: {
	        /**
	         * Change the active tab and emit change event.
	         */
	        changeTab: function changeTab(newIndex) {
	            if (this.activeTab === newIndex) return;

	            this.tabItems[this.activeTab].deactivate(this.activeTab, newIndex);
	            this.tabItems[newIndex].activate(this.activeTab, newIndex);
	            this.activeTab = newIndex;
	            this.$emit('change', newIndex);
	        },


	        /**
	         * Tab click listener, emit input event and change active tab.
	         */
	        tabClick: function tabClick(value) {
	            this.$emit('input', value);
	            this.changeTab(value);
	        }
	    },
	    mounted: function mounted() {
	        if (this.tabItems.length) {
	            this.tabItems[this.activeTab].isActive = true;
	        }
	    }
	});

	/***/ }),
	/* 181 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "b-tabs",
	    class: {
	      'is-fullwidth': _vm.expanded
	    }
	  }, [_c('nav', {
	    staticClass: "tabs",
	    class: _vm.navClasses
	  }, [_c('ul', _vm._l((_vm.tabItems), function(tabItem, index) {
	    return _c('li', {
	      directives: [{
	        name: "show",
	        rawName: "v-show",
	        value: (tabItem.visible),
	        expression: "tabItem.visible"
	      }],
	      key: index,
	      class: {
	        'is-active': _vm.activeTab === index, 'is-disabled': tabItem.disabled
	      }
	    }, [_c('a', {
	      on: {
	        "click": function($event) {
	          _vm.tabClick(index);
	        }
	      }
	    }, [(tabItem.$slots.header) ? [_c('b-slot-component', {
	      attrs: {
	        "component": tabItem,
	        "name": "header",
	        "tag": "span"
	      }
	    })] : [(tabItem.icon) ? _c('b-icon', {
	      attrs: {
	        "icon": tabItem.icon,
	        "pack": tabItem.iconPack,
	        "size": _vm.size
	      }
	    }) : _vm._e(), _vm._v(" "), _c('span', [_vm._v(_vm._s(tabItem.label))])]], 2)])
	  }))]), _vm._v(" "), _c('section', {
	    staticClass: "tab-content"
	  }, [_vm._t("default")], 2)])
	},staticRenderFns: []};

	/***/ }),
	/* 182 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(183),
	  /* template */
	  __webpack_require__(184),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 183 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	//
	//
	//
	//
	//
	//
	//
	//

	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BTabItem',
	    props: {
	        label: String,
	        icon: String,
	        iconPack: String,
	        disabled: Boolean,
	        visible: {
	            type: Boolean,
	            default: true
	        }
	    },
	    data: function data() {
	        return {
	            isActive: false,
	            transitionName: null
	        };
	    },

	    methods: {
	        /**
	         * Activate tab, alter animation name based on the index.
	         */
	        activate: function activate(oldIndex, index) {
	            if (!this.$parent.animated) {
	                this.transitionName = null;
	            } else {
	                this.transitionName = index < oldIndex ? 'slide-next' : 'slide-prev';
	            }
	            this.isActive = true;
	        },


	        /**
	         * Deactivate tab, alter animation name based on the index.
	         */
	        deactivate: function deactivate(oldIndex, index) {
	            if (!this.$parent.animated) {
	                this.transitionName = null;
	            } else {
	                this.transitionName = index < oldIndex ? 'slide-next' : 'slide-prev';
	            }
	            this.isActive = false;
	        }
	    },
	    created: function created() {
	        if (!this.$parent.$data._isTabs) {
	            this.$destroy();
	            throw new Error('You should wrap bTabItem on a bTabs');
	        }
	        this.$parent.tabItems.push(this);
	    },
	    beforeDestroy: function beforeDestroy() {
	        var index = this.$parent.tabItems.indexOf(this);
	        if (index >= 0) {
	            this.$parent.tabItems.splice(index, 1);
	        }
	    }
	});

	/***/ }),
	/* 184 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('transition', {
	    attrs: {
	      "name": _vm.transitionName
	    }
	  }, [_c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.isActive && _vm.visible),
	      expression: "isActive && visible"
	    }],
	    staticClass: "tab-item"
	  }, [_vm._t("default")], 2)])
	},staticRenderFns: []};

	/***/ }),
	/* 185 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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

	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BTag',
	    props: {
	        attached: Boolean,
	        closable: Boolean,
	        type: String,
	        size: String,
	        rounded: Boolean,
	        disabled: Boolean,
	        ellipsis: Boolean,
	        tabstop: {
	            type: Boolean,
	            default: true
	        }
	    },
	    methods: {
	        /**
	         * Emit close event when delete button is clicked
	         * or delete key is pressed.
	         */
	        close: function close() {
	            if (this.disabled) return;

	            this.$emit('close');
	        }
	    }
	});

	/***/ }),
	/* 186 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return (_vm.attached && _vm.closable) ? _c('div', {
	    staticClass: "tags has-addons"
	  }, [_c('span', {
	    staticClass: "tag",
	    class: [_vm.type, _vm.size, {
	      'is-rounded': _vm.rounded
	    }]
	  }, [_c('span', {
	    class: {
	      'has-ellipsis': _vm.ellipsis
	    }
	  }, [_vm._t("default")], 2)]), _vm._v(" "), _c('a', {
	    staticClass: "tag is-delete",
	    class: [_vm.size, {
	      'is-rounded': _vm.rounded
	    }],
	    attrs: {
	      "role": "button",
	      "tabindex": _vm.tabstop ? 0 : false,
	      "disabled": _vm.disabled
	    },
	    on: {
	      "click": function($event) {
	        _vm.close();
	      },
	      "keyup": function($event) {
	        if (!('button' in $event) && _vm._k($event.keyCode, "delete", [8, 46], $event.key)) { return null; }
	        $event.preventDefault();
	        _vm.close();
	      }
	    }
	  })]) : _c('span', {
	    staticClass: "tag",
	    class: [_vm.type, _vm.size, {
	      'is-rounded': _vm.rounded
	    }]
	  }, [_c('span', {
	    class: {
	      'has-ellipsis': _vm.ellipsis
	    }
	  }, [_vm._t("default")], 2), _vm._v(" "), (_vm.closable) ? _c('a', {
	    staticClass: "delete is-small",
	    attrs: {
	      "role": "button",
	      "disabled": _vm.disabled,
	      "tabindex": _vm.tabstop ? 0 : false
	    },
	    on: {
	      "click": function($event) {
	        _vm.close();
	      },
	      "keyup": function($event) {
	        if (!('button' in $event) && _vm._k($event.keyCode, "delete", [8, 46], $event.key)) { return null; }
	        $event.preventDefault();
	        _vm.close();
	      }
	    }
	  }) : _vm._e()])
	},staticRenderFns: []};

	/***/ }),
	/* 187 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(188),
	  /* template */
	  __webpack_require__(189),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 188 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	//
	//
	//
	//
	//
	//

	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BTaglist',
	    props: {
	        attached: Boolean
	    }
	});

	/***/ }),
	/* 189 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "tags",
	    class: {
	      'has-addons': _vm.attached
	    }
	  }, [_vm._t("default")], 2)
	},staticRenderFns: []};

	/***/ }),
	/* 190 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(191),
	  /* template */
	  __webpack_require__(192),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 191 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(52);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_helpers__ = __webpack_require__(7);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tag_Tag__ = __webpack_require__(67);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tag_Tag___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__tag_Tag__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__autocomplete_Autocomplete__ = __webpack_require__(51);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__autocomplete_Autocomplete___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__autocomplete_Autocomplete__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_FormElementMixin__ = __webpack_require__(12);



	var _components;

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






	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BTaginput',
	    components: (_components = {}, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_4__autocomplete_Autocomplete___default.a.name, __WEBPACK_IMPORTED_MODULE_4__autocomplete_Autocomplete___default.a), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_3__tag_Tag___default.a.name, __WEBPACK_IMPORTED_MODULE_3__tag_Tag___default.a), _components),
	    mixins: [__WEBPACK_IMPORTED_MODULE_5__utils_FormElementMixin__["a" /* default */]],
	    inheritAttrs: false,
	    props: {
	        value: {
	            type: Array,
	            default: function _default() {
	                return [];
	            }
	        },
	        data: {
	            type: Array,
	            default: function _default() {
	                return [];
	            }
	        },
	        type: String,
	        rounded: {
	            type: Boolean,
	            default: false
	        },
	        attached: {
	            type: Boolean,
	            default: false
	        },
	        maxtags: {
	            type: [Number, String],
	            required: false
	        },
	        field: {
	            type: String,
	            default: 'value'
	        },
	        autocomplete: Boolean,
	        disabled: Boolean,
	        ellipsis: Boolean,
	        closable: {
	            type: Boolean,
	            default: true
	        },
	        confirmKeyCodes: {
	            type: Array,
	            default: function _default() {
	                return [13, 188, 9];
	            }
	        },
	        removeOnKeys: {
	            type: Array,
	            default: function _default() {
	                return [8];
	            }
	        },
	        allowNew: Boolean,
	        onPasteSeparators: {
	            type: Array,
	            default: function _default() {
	                return [','];
	            }
	        },
	        beforeAdding: {
	            type: Function,
	            default: function _default() {
	                return true;
	            }
	        },
	        allowDuplicates: {
	            type: Boolean,
	            default: false
	        }
	    },
	    data: function data() {
	        return {
	            tags: this.value || [],
	            newTag: '',
	            _elementRef: 'input',
	            _isTaginput: true
	        };
	    },

	    computed: {
	        rootClasses: function rootClasses() {
	            return {
	                'is-expanded': this.expanded
	            };
	        },
	        containerClasses: function containerClasses() {
	            return {
	                'is-focused': this.isFocused,
	                'is-focusable': this.hasInput
	            };
	        },
	        valueLength: function valueLength() {
	            return this.newTag.trim().length;
	        },
	        defaultSlotName: function defaultSlotName() {
	            return this.hasDefaultSlot ? 'default' : 'dontrender';
	        },
	        emptySlotName: function emptySlotName() {
	            return this.hasEmptySlot ? 'empty' : 'dontrender';
	        },
	        hasDefaultSlot: function hasDefaultSlot() {
	            return !!this.$scopedSlots.default;
	        },
	        hasEmptySlot: function hasEmptySlot() {
	            return !!this.$slots.empty;
	        },


	        /**
	         * Show the input field if a maxtags hasn't been set or reached.
	         */
	        hasInput: function hasInput() {
	            return this.maxtags == null || this.tagsLength < this.maxtags;
	        },
	        tagsLength: function tagsLength() {
	            return this.tags.length;
	        },


	        /**
	         * If Taginput has onPasteSeparators prop,
	         * returning new RegExp used to split pasted string.
	         */
	        separatorsAsRegExp: function separatorsAsRegExp() {
	            var sep = this.onPasteSeparators;

	            return sep.length ? new RegExp(sep.map(function (s) {
	                return s ? s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') : null;
	            }).join('|'), 'g') : null;
	        }
	    },
	    watch: {
	        /**
	         * When v-model is changed set internal value.
	         */
	        value: function value(_value) {
	            this.tags = _value;
	        },
	        newTag: function newTag(value) {
	            this.$emit('typing', value.trim());
	        },
	        hasInput: function hasInput() {
	            if (!this.hasInput) this.onBlur();
	        }
	    },
	    methods: {
	        addTag: function addTag(tag) {
	            var tagToAdd = tag || this.newTag.trim();

	            if (tagToAdd) {
	                if (!this.autocomplete) {
	                    var reg = this.separatorsAsRegExp;
	                    if (reg && tagToAdd.match(reg)) {
	                        tagToAdd.split(reg).map(function (t) {
	                            return t.trim();
	                        }).filter(function (t) {
	                            return t.length !== 0;
	                        }).map(this.addTag);
	                        return;
	                    }
	                }

	                // Add the tag input if it is not blank
	                // or previously added (if not allowDuplicates).
	                var add = !this.allowDuplicates ? this.tags.indexOf(tagToAdd) === -1 : true;
	                if (add && this.beforeAdding(tagToAdd)) {
	                    this.tags.push(tagToAdd);
	                    this.$emit('input', this.tags);
	                    this.$emit('add', tagToAdd);
	                }
	            }

	            this.newTag = '';
	        },
	        getNormalizedTagText: function getNormalizedTagText(tag) {
	            if ((typeof tag === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(tag)) === 'object') {
	                return Object(__WEBPACK_IMPORTED_MODULE_2__utils_helpers__["b" /* getValueByPath */])(tag, this.field);
	            }

	            return tag;
	        },
	        customOnBlur: function customOnBlur($event) {
	            // Add tag on-blur if not select only
	            if (!this.autocomplete) this.addTag();

	            this.onBlur($event);
	        },
	        onSelect: function onSelect(option) {
	            var _this = this;

	            if (!option) return;

	            this.addTag(option);
	            this.$nextTick(function () {
	                _this.newTag = '';
	            });
	        },
	        removeTag: function removeTag(index) {
	            var tag = this.tags.splice(index, 1)[0];
	            this.$emit('input', this.tags);
	            this.$emit('remove', tag);
	            return tag;
	        },
	        removeLastTag: function removeLastTag() {
	            if (this.tagsLength > 0) {
	                this.removeTag(this.tagsLength - 1);
	            }
	        },
	        keydown: function keydown(event) {
	            if (this.removeOnKeys.indexOf(event.keyCode) !== -1 && !this.newTag.length) {
	                this.removeLastTag();
	            }
	            // Stop if is to accept select only
	            if (this.autocomplete && !this.allowNew) return;

	            if (this.confirmKeyCodes.indexOf(event.keyCode) >= 0) {
	                event.preventDefault();
	                this.addTag();
	            }
	        }
	    }
	});

	/***/ }),
	/* 192 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "taginput control",
	    class: _vm.rootClasses
	  }, [_c('div', {
	    staticClass: "taginput-container",
	    class: [_vm.statusType, _vm.size, _vm.containerClasses],
	    attrs: {
	      "disabled": _vm.disabled
	    },
	    on: {
	      "click": function($event) {
	        _vm.hasInput && _vm.focus($event);
	      }
	    }
	  }, [_vm._l((_vm.tags), function(tag, index) {
	    return _c('b-tag', {
	      key: index,
	      attrs: {
	        "type": _vm.type,
	        "size": _vm.size,
	        "rounded": _vm.rounded,
	        "attached": _vm.attached,
	        "tabstop": false,
	        "disabled": _vm.disabled,
	        "ellipsis": _vm.ellipsis,
	        "closable": _vm.closable
	      },
	      on: {
	        "close": function($event) {
	          _vm.removeTag(index);
	        }
	      }
	    }, [_vm._v("\n            " + _vm._s(_vm.getNormalizedTagText(tag)) + "\n        ")])
	  }), _vm._v(" "), (_vm.hasInput) ? _c('b-autocomplete', _vm._b({
	    ref: "autocomplete",
	    attrs: {
	      "data": _vm.data,
	      "field": _vm.field,
	      "icon": _vm.icon,
	      "icon-pack": _vm.iconPack,
	      "maxlength": _vm.maxlength,
	      "has-counter": false,
	      "size": _vm.size,
	      "disabled": _vm.disabled,
	      "loading": _vm.loading,
	      "keep-first": ""
	    },
	    on: {
	      "focus": _vm.onFocus,
	      "blur": _vm.customOnBlur,
	      "select": _vm.onSelect
	    },
	    nativeOn: {
	      "keydown": function($event) {
	        _vm.keydown($event);
	      }
	    },
	    scopedSlots: _vm._u([{
	      key: _vm.defaultSlotName,
	      fn: function(props) {
	        return [_vm._t("default", null, {
	          option: props.option,
	          index: props.index
	        })]
	      }
	    }]),
	    model: {
	      value: (_vm.newTag),
	      callback: function($$v) {
	        _vm.newTag = $$v;
	      },
	      expression: "newTag"
	    }
	  }, 'b-autocomplete', _vm.$attrs, false), [_c('template', {
	    slot: _vm.emptySlotName
	  }, [_vm._t("empty")], 2)], 2) : _vm._e()], 2), _vm._v(" "), (_vm.maxtags || _vm.maxlength) ? _c('p', {
	    staticClass: "help counter"
	  }, [(_vm.maxlength && _vm.valueLength > 0) ? [_vm._v("\n            " + _vm._s(_vm.valueLength) + " / " + _vm._s(_vm.maxlength) + "\n        ")] : (_vm.maxtags) ? [_vm._v("\n            " + _vm._s(_vm.tagsLength) + " / " + _vm._s(_vm.maxtags) + "\n        ")] : _vm._e()], 2) : _vm._e()])
	},staticRenderFns: []};

	/***/ }),
	/* 193 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(194),
	  /* template */
	  __webpack_require__(195),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 194 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_FormElementMixin__ = __webpack_require__(12);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_helpers__ = __webpack_require__(7);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_config__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dropdown_Dropdown__ = __webpack_require__(42);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dropdown_Dropdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__dropdown_Dropdown__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dropdown_DropdownItem__ = __webpack_require__(43);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dropdown_DropdownItem___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__dropdown_DropdownItem__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__input_Input__ = __webpack_require__(27);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__input_Input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__input_Input__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__field_Field__ = __webpack_require__(44);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__field_Field___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__field_Field__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__select_Select__ = __webpack_require__(28);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__select_Select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__select_Select__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__icon_Icon__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__icon_Icon__);


	var _components;

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












	var AM = 'AM';
	var PM = 'PM';
	var HOUR_FORMAT_24 = '24';
	var HOUR_FORMAT_12 = '12';

	var formatNumber = function formatNumber(value) {
	    return (value < 10 ? '0' : '') + value;
	};

	var timeFormatter = function timeFormatter(date, vm) {
	    var hours = date.getHours();
	    var minutes = date.getMinutes();
	    var am = false;
	    if (vm.hourFormat === HOUR_FORMAT_12) {
	        am = hours < 12;
	        if (hours > 12) {
	            hours -= 12;
	        } else if (hours === 0) {
	            hours = 12;
	        }
	    }
	    return formatNumber(hours) + ':' + formatNumber(minutes) + (vm.hourFormat === HOUR_FORMAT_12 ? ' ' + (am ? AM : PM) : '');
	};

	var timeParser = function timeParser(date, vm) {
	    if (date) {
	        var dateString = date;
	        var am = false;
	        if (vm.hourFormat === HOUR_FORMAT_12) {
	            var dateString12 = date.split(' ');
	            dateString = dateString12[0];
	            am = dateString12[1] === AM;
	        }
	        var time = dateString.split(':');
	        var hours = parseInt(time[0], 10);
	        var minutes = parseInt(time[1], 10);
	        if (isNaN(hours) || hours < 0 || hours > 23 || vm.hourFormat === HOUR_FORMAT_12 && (hours < 1 || hours > 12) || isNaN(minutes) || minutes < 0 || minutes > 59) {
	            return null;
	        }
	        var d = null;
	        if (vm.dateSelected && !isNaN(vm.dateSelected)) {
	            d = new Date(vm.dateSelected);
	        } else {
	            d = new Date();
	            d.setMilliseconds(0);
	            d.setSeconds(0);
	        }
	        d.setMinutes(minutes);
	        if (vm.hourFormat === HOUR_FORMAT_12) {
	            if (am && hours === 12) {
	                hours = 0;
	            } else if (!am && hours !== 12) {
	                hours += 12;
	            }
	        }
	        d.setHours(hours);
	        return d;
	    }
	    return null;
	};

	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BTimepicker',
	    components: (_components = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_6__input_Input___default.a.name, __WEBPACK_IMPORTED_MODULE_6__input_Input___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_7__field_Field___default.a.name, __WEBPACK_IMPORTED_MODULE_7__field_Field___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_8__select_Select___default.a.name, __WEBPACK_IMPORTED_MODULE_8__select_Select___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_9__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_9__icon_Icon___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_4__dropdown_Dropdown___default.a.name, __WEBPACK_IMPORTED_MODULE_4__dropdown_Dropdown___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_5__dropdown_DropdownItem___default.a.name, __WEBPACK_IMPORTED_MODULE_5__dropdown_DropdownItem___default.a), _components),
	    mixins: [__WEBPACK_IMPORTED_MODULE_1__utils_FormElementMixin__["a" /* default */]],
	    inheritAttrs: false,
	    props: {
	        value: Date,
	        inline: Boolean,
	        minTime: Date,
	        maxTime: Date,
	        placeholder: String,
	        editable: Boolean,
	        disabled: Boolean,
	        hourFormat: {
	            type: String,
	            default: HOUR_FORMAT_24,
	            validator: function validator(value) {
	                return value === HOUR_FORMAT_24 || value === HOUR_FORMAT_12;
	            }
	        },
	        incrementMinutes: {
	            type: Number,
	            default: 1
	        },
	        timeFormatter: {
	            type: Function,
	            default: function _default(date, vm) {
	                if (typeof __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultTimeFormatter === 'function') {
	                    return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultTimeFormatter(date);
	                } else {
	                    return timeFormatter(date, vm);
	                }
	            }
	        },
	        timeParser: {
	            type: Function,
	            default: function _default(date, vm) {
	                if (typeof __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultTimeParser === 'function') {
	                    return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultTimeParser(date);
	                } else {
	                    return timeParser(date, vm);
	                }
	            }
	        },
	        mobileNative: {
	            type: Boolean,
	            default: function _default() {
	                return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a" /* default */].defaultTimepickerMobileNative;
	            }
	        },
	        position: String,
	        unselectableTimes: Array
	    },
	    data: function data() {
	        return {
	            dateSelected: this.value,
	            hoursSelected: null,
	            minutesSelected: null,
	            meridienSelected: null,
	            _elementRef: 'input',
	            _isTimepicker: true
	        };
	    },

	    computed: {
	        hours: function hours() {
	            var hours = [];
	            var numberOfHours = this.isHourFormat24 ? 24 : 12;
	            for (var i = 0; i < numberOfHours; i++) {
	                var value = i;
	                var label = value;
	                if (!this.isHourFormat24) {
	                    value = i + 1;
	                    label = value;
	                    if (this.meridienSelected === AM) {
	                        if (value === 12) {
	                            value = 0;
	                        }
	                    } else if (this.meridienSelected === PM) {
	                        if (value !== 12) {
	                            value += 12;
	                        }
	                    }
	                }
	                hours.push({
	                    label: formatNumber(label),
	                    value: value
	                });
	            }
	            return hours;
	        },
	        minutes: function minutes() {
	            var minutes = [];
	            for (var i = 0; i < 60; i += this.incrementMinutes) {
	                minutes.push({
	                    label: formatNumber(i),
	                    value: i
	                });
	            }
	            return minutes;
	        },
	        meridiens: function meridiens() {
	            return [AM, PM];
	        },
	        isMobile: function isMobile() {
	            return this.mobileNative && __WEBPACK_IMPORTED_MODULE_2__utils_helpers__["d" /* isMobile */].any();
	        },
	        isHourFormat24: function isHourFormat24() {
	            return this.hourFormat === HOUR_FORMAT_24;
	        }
	    },
	    watch: {
	        hourFormat: function hourFormat(value) {
	            if (this.hoursSelected !== null) {
	                this.meridienSelected = this.hoursSelected >= 12 ? PM : AM;
	            }
	        },


	        /**
	        * Emit input event with selected date as payload.
	        */
	        dateSelected: function dateSelected(value) {
	            this.$emit('input', value);
	        },


	        /**
	         * When v-model is changed:
	         *   1. Update internal value.
	         *   2. If it's invalid, validate again.
	         */
	        value: function value(_value) {
	            this.updateInternalState(_value);
	            this.dateSelected = _value;

	            !this.isValid && this.$refs.input.checkHtml5Validity();
	        }
	    },
	    methods: {
	        onMeridienChange: function onMeridienChange(value) {
	            if (this.hoursSelected !== null) {
	                if (value === PM) {
	                    if (this.hoursSelected === 0) {
	                        this.hoursSelected = 12;
	                    } else {
	                        this.hoursSelected += 12;
	                    }
	                } else if (value === AM) {
	                    if (this.hoursSelected === 12) {
	                        this.hoursSelected = 0;
	                    } else {
	                        this.hoursSelected -= 12;
	                    }
	                }
	            }
	            this.updateDateSelected(this.hoursSelected, this.minutesSelected, value);
	        },
	        onHoursChange: function onHoursChange(value) {
	            this.updateDateSelected(parseInt(value, 10), this.minutesSelected, this.meridienSelected);
	        },
	        onMinutesChange: function onMinutesChange(value) {
	            this.updateDateSelected(this.hoursSelected, parseInt(value, 10), this.meridienSelected);
	        },
	        updateDateSelected: function updateDateSelected(hours, minutes, meridiens) {
	            if (hours != null && minutes != null && (!this.isHourFormat24 && meridiens !== null || this.isHourFormat24)) {
	                if (this.dateSelected && !isNaN(this.dateSelected)) {
	                    this.dateSelected = new Date(this.dateSelected);
	                } else {
	                    this.dateSelected = new Date();
	                    this.dateSelected.setMilliseconds(0);
	                    this.dateSelected.setSeconds(0);
	                }
	                this.dateSelected.setHours(hours);
	                this.dateSelected.setMinutes(minutes);
	            }
	        },
	        updateInternalState: function updateInternalState(value) {
	            if (value) {
	                this.hoursSelected = value.getHours();
	                this.minutesSelected = value.getMinutes();
	                this.meridienSelected = value.getHours() >= 12 ? PM : AM;
	            } else {
	                this.hoursSelected = null;
	                this.minutesSelected = null;
	                this.meridienSelected = AM;
	            }
	        },
	        isHourDisabled: function isHourDisabled(hour) {
	            var _this = this;

	            var disabled = false;
	            if (this.minTime) {
	                var minHours = this.minTime.getHours();
	                disabled = hour < minHours;
	            }
	            if (this.maxTime) {
	                if (!disabled) {
	                    var maxHours = this.maxTime.getHours();
	                    disabled = hour > maxHours;
	                }
	            }
	            if (this.unselectableTimes) {
	                if (!disabled) {
	                    if (this.minutesSelected !== null) {
	                        var unselectable = this.unselectableTimes.filter(function (time) {
	                            return time.getHours() === hour && time.getMinutes() === _this.minutesSelected;
	                        });
	                        disabled = unselectable.length > 0;
	                    } else {
	                        var _unselectable = this.unselectableTimes.filter(function (time) {
	                            return time.getHours() === hour;
	                        });
	                        disabled = _unselectable.length === this.minutes.length;
	                    }
	                }
	            }
	            return disabled;
	        },
	        isMinuteDisabled: function isMinuteDisabled(minute) {
	            var _this2 = this;

	            var disabled = false;
	            if (this.hoursSelected !== null) {
	                if (this.isHourDisabled(this.hoursSelected)) {
	                    disabled = true;
	                } else {
	                    if (this.minTime) {
	                        var minHours = this.minTime.getHours();
	                        var minMinutes = this.minTime.getMinutes();
	                        disabled = this.hoursSelected === minHours && minute < minMinutes;
	                    }
	                    if (this.maxTime) {
	                        if (!disabled) {
	                            var maxHours = this.maxTime.getHours();
	                            var _minMinutes = this.maxTime.getMinutes();
	                            disabled = this.hoursSelected === maxHours && minute > _minMinutes;
	                        }
	                    }
	                }
	                if (this.unselectableTimes) {
	                    if (!disabled) {
	                        var unselectable = this.unselectableTimes.filter(function (time) {
	                            return time.getHours() === _this2.hoursSelected && time.getMinutes() === minute;
	                        });
	                        disabled = unselectable.length > 0;
	                    }
	                }
	            }
	            return disabled;
	        },


	        /*
	        * Parse string into date
	        */
	        onChange: function onChange(value) {
	            var date = this.timeParser(value, this);
	            this.updateInternalState(date);
	            if (date && !isNaN(date)) {
	                this.dateSelected = date;
	            } else {
	                // Force refresh input value when not valid date
	                this.dateSelected = null;
	                this.$refs.input.newValue = this.dateSelected;
	            }
	        },


	        /*
	        * Format date into string
	        */
	        formatValue: function formatValue(value) {
	            if (value && !isNaN(value)) {
	                return this.timeFormatter(value, this);
	            } else {
	                return null;
	            }
	        },


	        /*
	        * Close dropdown time picker
	        */
	        close: function close() {
	            if (this.$refs.dropdown) {
	                this.$refs.dropdown.isActive = false;
	            }
	        },


	        /*
	        * Format date into string 'HH-MM-SS'
	        */
	        formatHHMMSS: function formatHHMMSS(value) {
	            var date = new Date(value);
	            if (value && !isNaN(date)) {
	                var hours = date.getHours();
	                var minutes = date.getMinutes();
	                return formatNumber(hours) + ':' + formatNumber(minutes) + ':00';
	            }
	            return '';
	        },


	        /*
	        * Parse time from string
	        */
	        onChangeNativePicker: function onChangeNativePicker(event) {
	            var date = event.target.value;
	            if (date) {
	                if (this.dateSelected && !isNaN(this.dateSelected)) {
	                    this.dateSelected = new Date(this.dateSelected);
	                } else {
	                    this.dateSelected = new Date();
	                    this.dateSelected.setMilliseconds(0);
	                    this.dateSelected.setSeconds(0);
	                }
	                var time = date.split(':');
	                this.dateSelected.setHours(parseInt(time[0], 10));
	                this.dateSelected.setMinutes(parseInt(time[1], 10));
	            } else {
	                this.dateSelected = null;
	            }
	        }
	    },
	    mounted: function mounted() {
	        this.updateInternalState(this.value);
	    }
	});

	/***/ }),
	/* 195 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "timepicker control",
	    class: [_vm.size, {
	      'is-expanded': _vm.expanded
	    }]
	  }, [(!_vm.isMobile || _vm.inline) ? _c('b-dropdown', {
	    ref: "dropdown",
	    attrs: {
	      "position": _vm.position,
	      "disabled": _vm.disabled,
	      "inline": _vm.inline
	    }
	  }, [(!_vm.inline) ? _c('b-input', _vm._b({
	    ref: "input",
	    attrs: {
	      "slot": "trigger",
	      "autocomplete": "off",
	      "value": _vm.formatValue(_vm.dateSelected),
	      "placeholder": _vm.placeholder,
	      "size": _vm.size,
	      "icon": _vm.icon,
	      "icon-pack": _vm.iconPack,
	      "loading": _vm.loading,
	      "disabled": _vm.disabled,
	      "readonly": !_vm.editable,
	      "rounded": _vm.rounded
	    },
	    on: {
	      "focus": function($event) {
	        _vm.$emit('focus', $event);
	      },
	      "blur": function($event) {
	        _vm.$emit('blur', $event) && _vm.checkHtml5Validity();
	      }
	    },
	    nativeOn: {
	      "change": function($event) {
	        _vm.onChange($event.target.value);
	      }
	    },
	    slot: "trigger"
	  }, 'b-input', _vm.$attrs, false)) : _vm._e(), _vm._v(" "), _c('b-dropdown-item', {
	    attrs: {
	      "disabled": _vm.disabled,
	      "custom": ""
	    }
	  }, [_c('b-field', {
	    attrs: {
	      "grouped": "",
	      "position": "is-centered"
	    }
	  }, [_c('b-select', {
	    attrs: {
	      "disabled": _vm.disabled,
	      "placeholder": "00"
	    },
	    nativeOn: {
	      "change": function($event) {
	        _vm.onHoursChange($event.target.value);
	      }
	    },
	    model: {
	      value: (_vm.hoursSelected),
	      callback: function($$v) {
	        _vm.hoursSelected = $$v;
	      },
	      expression: "hoursSelected"
	    }
	  }, _vm._l((_vm.hours), function(hour) {
	    return _c('option', {
	      key: hour.value,
	      attrs: {
	        "disabled": _vm.isHourDisabled(hour.value)
	      },
	      domProps: {
	        "value": hour.value
	      }
	    }, [_vm._v("\n                        " + _vm._s(hour.label) + "\n                    ")])
	  })), _vm._v(" "), _c('span', {
	    staticClass: "control is-colon"
	  }, [_vm._v(":")]), _vm._v(" "), _c('b-select', {
	    attrs: {
	      "disabled": _vm.disabled,
	      "placeholder": "00"
	    },
	    nativeOn: {
	      "change": function($event) {
	        _vm.onMinutesChange($event.target.value);
	      }
	    },
	    model: {
	      value: (_vm.minutesSelected),
	      callback: function($$v) {
	        _vm.minutesSelected = $$v;
	      },
	      expression: "minutesSelected"
	    }
	  }, _vm._l((_vm.minutes), function(minute) {
	    return _c('option', {
	      key: minute.value,
	      attrs: {
	        "disabled": _vm.isMinuteDisabled(minute.value)
	      },
	      domProps: {
	        "value": minute.value
	      }
	    }, [_vm._v("\n                        " + _vm._s(minute.label) + "\n                    ")])
	  })), _vm._v(" "), (!_vm.isHourFormat24) ? _c('b-select', {
	    attrs: {
	      "disabled": _vm.disabled
	    },
	    nativeOn: {
	      "change": function($event) {
	        _vm.onMeridienChange($event.target.value);
	      }
	    },
	    model: {
	      value: (_vm.meridienSelected),
	      callback: function($$v) {
	        _vm.meridienSelected = $$v;
	      },
	      expression: "meridienSelected"
	    }
	  }, _vm._l((_vm.meridiens), function(meridien) {
	    return _c('option', {
	      key: meridien,
	      domProps: {
	        "value": meridien
	      }
	    }, [_vm._v("\n                        " + _vm._s(meridien) + "\n                    ")])
	  })) : _vm._e()], 1), _vm._v(" "), (_vm.$slots.default !== undefined && _vm.$slots.default.length) ? _c('footer', {
	    staticClass: "timepicker-footer"
	  }, [_vm._t("default")], 2) : _vm._e()], 1)], 1) : _c('b-input', _vm._b({
	    ref: "input",
	    attrs: {
	      "type": "time",
	      "autocomplete": "off",
	      "value": _vm.formatHHMMSS(_vm.value),
	      "placeholder": _vm.placeholder,
	      "size": _vm.size,
	      "icon": _vm.icon,
	      "icon-pack": _vm.iconPack,
	      "loading": _vm.loading,
	      "max": _vm.formatHHMMSS(_vm.maxTime),
	      "min": _vm.formatHHMMSS(_vm.minTime),
	      "disabled": _vm.disabled,
	      "readonly": false
	    },
	    on: {
	      "focus": function($event) {
	        _vm.$emit('focus', $event);
	      },
	      "blur": function($event) {
	        _vm.$emit('blur', $event) && _vm.checkHtml5Validity();
	      }
	    },
	    nativeOn: {
	      "change": function($event) {
	        _vm.onChangeNativePicker($event);
	      }
	    }
	  }, 'b-input', _vm.$attrs, false))], 1)
	},staticRenderFns: []};

	/***/ }),
	/* 196 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(197),
	  /* template */
	  __webpack_require__(198),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 197 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_config__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_NoticeMixin_js__ = __webpack_require__(65);
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




	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BToast',
	    mixins: [__WEBPACK_IMPORTED_MODULE_1__utils_NoticeMixin_js__["a" /* default */]],
	    data: function data() {
	        return {
	            newDuration: this.duration || __WEBPACK_IMPORTED_MODULE_0__utils_config__["a" /* default */].defaultToastDuration
	        };
	    }
	});

	/***/ }),
	/* 198 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('transition', {
	    attrs: {
	      "enter-active-class": _vm.transition.enter,
	      "leave-active-class": _vm.transition.leave
	    }
	  }, [_c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.isActive),
	      expression: "isActive"
	    }],
	    staticClass: "toast",
	    class: [_vm.type, _vm.position]
	  }, [_c('div', {
	    domProps: {
	      "innerHTML": _vm._s(_vm.message)
	    }
	  })])])
	},staticRenderFns: []};

	/***/ }),
	/* 199 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(200),
	  /* template */
	  __webpack_require__(201),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 200 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_config__ = __webpack_require__(2);
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



	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BTooltip',
	    props: {
	        active: {
	            type: Boolean,
	            default: true
	        },
	        type: String,
	        label: String,
	        position: {
	            type: String,
	            default: 'is-top',
	            validator: function validator(value) {
	                return ['is-top', 'is-bottom', 'is-left', 'is-right'].indexOf(value) > -1;
	            }
	        },
	        always: Boolean,
	        animated: Boolean,
	        square: Boolean,
	        dashed: Boolean,
	        multilined: Boolean,
	        size: {
	            type: String,
	            default: 'is-medium'
	        }
	    },
	    computed: {
	        newType: function newType() {
	            return this.type || __WEBPACK_IMPORTED_MODULE_0__utils_config__["a" /* default */].defaultTooltipType;
	        },
	        newAnimated: function newAnimated() {
	            return this.animated || __WEBPACK_IMPORTED_MODULE_0__utils_config__["a" /* default */].defaultTooltipAnimated;
	        }
	    }
	});

	/***/ }),
	/* 201 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('span', {
	    class: [_vm.newType, _vm.position, _vm.size, {
	      'tooltip': _vm.active,
	      'is-square': _vm.square,
	      'is-animated': _vm.newAnimated,
	      'is-always': _vm.always,
	      'is-multiline': _vm.multilined,
	      'is-dashed': _vm.dashed
	    }],
	    attrs: {
	      "data-label": _vm.label
	    }
	  }, [_vm._t("default")], 2)
	},staticRenderFns: []};

	/***/ }),
	/* 202 */
	/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(0)(
	  /* script */
	  __webpack_require__(203),
	  /* template */
	  __webpack_require__(204),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	);

	module.exports = Component.exports;


	/***/ }),
	/* 203 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_FormElementMixin__ = __webpack_require__(12);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_ssr__ = __webpack_require__(62);
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




	/* harmony default export */ __webpack_exports__["default"] = ({
	    name: 'BUpload',
	    mixins: [__WEBPACK_IMPORTED_MODULE_0__utils_FormElementMixin__["a" /* default */]],
	    inheritAttrs: false,
	    props: {
	        value: {
	            type: [Object, Function, __WEBPACK_IMPORTED_MODULE_1__utils_ssr__["a" /* File */], Array]
	        },
	        multiple: Boolean,
	        disabled: Boolean,
	        accept: String,
	        dragDrop: Boolean,
	        type: {
	            type: String,
	            default: 'is-primary'
	        },
	        native: {
	            type: Boolean,
	            default: false
	        }
	    },
	    data: function data() {
	        return {
	            newValue: this.value,
	            dragDropFocus: false,
	            _elementRef: 'input'
	        };
	    },

	    watch: {
	        /**
	         * When v-model is changed:
	         *   1. Set internal value.
	         *   2. Reset input value if array is empty
	         *   3. If it's invalid, validate again.
	         */
	        value: function value(_value) {
	            this.newValue = _value;
	            if (!this.newValue || Array.isArray(this.newValue) && this.newValue.length === 0) {
	                this.$refs.input.value = null;
	            }
	            !this.isValid && !this.dragDrop && this.checkHtml5Validity();
	        }
	    },
	    methods: {

	        /**
	         * Listen change event on input type 'file',
	         * emit 'input' event and validate
	         */
	        onFileChange: function onFileChange(event) {
	            if (this.disabled || this.loading) return;
	            if (this.dragDrop) {
	                this.updateDragDropFocus(false);
	            }
	            var value = event.target.files || event.dataTransfer.files;
	            if (value && value.length) {
	                if (!this.multiple) {
	                    // only one element in case drag drop mode and isn't multiple
	                    if (this.dragDrop && value.length !== 1) return false;else {
	                        var file = value[0];
	                        if (this.checkType(file)) {
	                            this.newValue = file;
	                        }
	                    }
	                } else {
	                    // always new values if native or undefined local
	                    if (this.native || !this.newValue) {
	                        this.newValue = [];
	                    }
	                    for (var i = 0; i < value.length; i++) {
	                        var _file = value[i];
	                        if (this.checkType(_file)) {
	                            this.newValue.push(_file);
	                        }
	                    }
	                }
	            }
	            this.$emit('input', this.newValue);
	            !this.dragDrop && this.checkHtml5Validity();
	        },


	        /**
	         * Listen drag-drop to update internal variable
	         */
	        updateDragDropFocus: function updateDragDropFocus(focus) {
	            if (!this.disabled && !this.loading) {
	                this.dragDropFocus = focus;
	            }
	        },


	        /**
	         * Check mime type of file
	         */
	        checkType: function checkType(file) {
	            if (!this.accept) return true;
	            var types = this.accept.split(',');
	            if (types.length === 0) return true;
	            var valid = false;
	            for (var i = 0; i < types.length && !valid; i++) {
	                var type = types[i].trim();
	                if (type) {
	                    if (type.substring(0, 1) === '.') {
	                        // check extension
	                        var extIndex = file.name.lastIndexOf('.');
	                        if (extIndex >= 0 && file.name.substring(extIndex) === type) {
	                            valid = true;
	                        }
	                    } else {
	                        // check mime type
	                        if (file.type.match(type)) {
	                            valid = true;
	                        }
	                    }
	                }
	            }
	            return valid;
	        }
	    }
	});

	/***/ }),
	/* 204 */
	/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('label', {
	    staticClass: "upload control"
	  }, [(!_vm.dragDrop) ? [_vm._t("default")] : _c('div', {
	    staticClass: "upload-draggable",
	    class: [_vm.type, {
	      'is-loading': _vm.loading,
	      'is-disabled': _vm.disabled,
	      'is-hovered': _vm.dragDropFocus
	    }],
	    on: {
	      "dragover": function($event) {
	        $event.preventDefault();
	        _vm.updateDragDropFocus(true);
	      },
	      "dragleave": function($event) {
	        $event.preventDefault();
	        _vm.updateDragDropFocus(false);
	      },
	      "dragenter": function($event) {
	        $event.preventDefault();
	        _vm.updateDragDropFocus(true);
	      },
	      "drop": function($event) {
	        $event.preventDefault();
	        _vm.onFileChange($event);
	      }
	    }
	  }, [_vm._t("default")], 2), _vm._v(" "), _c('input', _vm._b({
	    ref: "input",
	    attrs: {
	      "type": "file",
	      "multiple": _vm.multiple,
	      "accept": _vm.accept,
	      "disabled": _vm.disabled
	    },
	    on: {
	      "change": _vm.onFileChange
	    }
	  }, 'input', _vm.$attrs, false))], 2)
	},staticRenderFns: []};

	/***/ })
	/******/ ]);
	});
	});

	var Buefy = unwrapExports(buefy);

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
	var script = {
	  name: 'WidgetBody',
	  components: {},
	  data: function data() {
	    return {
	      isComponentModalActive: false,
	      formProps: {
	        email: 'evan@you.com',
	        password: 'testing'
	      }
	    };
	  }
	};

	/* script */
	            const __vue_script__ = script;
	            
	/* template */
	var __vue_render__ = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "section",
	    [
	      _c(
	        "button",
	        {
	          staticClass: "button is-primary is-medium",
	          on: {
	            click: function($event) {
	              _vm.isComponentModalActive = true;
	            }
	          }
	        },
	        [_vm._v("\n        Launch component modal\n    ")]
	      ),
	      _vm._v(" "),
	      _c(
	        "b-modal",
	        {
	          attrs: { active: _vm.isComponentModalActive, "has-modal-card": "" },
	          on: {
	            "update:active": function($event) {
	              _vm.isComponentModalActive = $event;
	            }
	          }
	        },
	        [
	          _c("div", { staticClass: "container" }, [
	            _c("div", { staticClass: "notification" }, [
	              _vm._v("\n                This container is "),
	              _c("strong", [_vm._v("centered")]),
	              _vm._v(" on desktop.\n            ")
	            ])
	          ])
	        ]
	      )
	    ],
	    1
	  )
	};
	var __vue_staticRenderFns__ = [];
	__vue_render__._withStripped = true;

	  /* style */
	  const __vue_inject_styles__ = function (inject) {
	    if (!inject) return
	    inject("data-v-f1370152_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"WidgetBody.vue"}, media: undefined });

	  };
	  /* scoped */
	  const __vue_scope_id__ = "data-v-f1370152";
	  /* module identifier */
	  const __vue_module_identifier__ = undefined;
	  /* functional template */
	  const __vue_is_functional_template__ = false;
	  /* component normalizer */
	  function __vue_normalize__(
	    template, style, script$$1,
	    scope, functional, moduleIdentifier,
	    createInjector, createInjectorSSR
	  ) {
	    const component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

	    // For security concerns, we use only base name in production mode.
	    component.__file = "/Users/nikitapilgrim/WebstormProjects/sms.ru_widget/src/js/components/WidgetBody.vue";

	    if (!component.render) {
	      component.render = template.render;
	      component.staticRenderFns = template.staticRenderFns;
	      component._compiled = true;

	      if (functional) component.functional = true;
	    }

	    component._scopeId = scope;

	    {
	      let hook;
	      if (style) {
	        hook = function(context) {
	          style.call(this, createInjector(context));
	        };
	      }

	      if (hook !== undefined) {
	        if (component.functional) {
	          // register for functional component in vue file
	          const originalRender = component.render;
	          component.render = function renderWithStyleInjection(h, context) {
	            hook.call(context);
	            return originalRender(h, context)
	          };
	        } else {
	          // inject component registration as beforeCreate hook
	          const existing = component.beforeCreate;
	          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
	        }
	      }
	    }

	    return component
	  }
	  /* style inject */
	  function __vue_create_injector__() {
	    const head = document.head || document.getElementsByTagName('head')[0];
	    const styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
	    const isOldIE =
	      typeof navigator !== 'undefined' &&
	      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

	    return function addStyle(id, css) {
	      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

	      const group = isOldIE ? css.media || 'default' : id;
	      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

	      if (!style.ids.includes(id)) {
	        let code = css.source;
	        let index = style.ids.length;

	        style.ids.push(id);

	        if (isOldIE) {
	          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
	        }

	        if (!style.element) {
	          const el = style.element = document.createElement('style');
	          el.type = 'text/css';

	          if (css.media) el.setAttribute('media', css.media);
	          if (isOldIE) {
	            el.setAttribute('data-group', group);
	            el.setAttribute('data-next-index', '0');
	          }

	          head.appendChild(el);
	        }

	        if (isOldIE) {
	          index = parseInt(style.element.getAttribute('data-next-index'));
	          style.element.setAttribute('data-next-index', index + 1);
	        }

	        if (style.element.styleSheet) {
	          style.parts.push(code);
	          style.element.styleSheet.cssText = style.parts
	            .filter(Boolean)
	            .join('\n');
	        } else {
	          const textNode = document.createTextNode(code);
	          const nodes = style.element.childNodes;
	          if (nodes[index]) style.element.removeChild(nodes[index]);
	          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
	          else style.element.appendChild(textNode);
	        }
	      }
	    }
	  }
	  /* style inject SSR */
	  

	  
	  var WidgetBody = __vue_normalize__(
	    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
	    __vue_inject_styles__,
	    __vue_script__,
	    __vue_scope_id__,
	    __vue_is_functional_template__,
	    __vue_module_identifier__,
	    __vue_create_injector__,
	    undefined
	  );

	function styleInject(css, ref) {
	  if ( ref === void 0 ) ref = {};
	  var insertAt = ref.insertAt;

	  if (!css || typeof document === 'undefined') { return; }

	  var head = document.head || document.getElementsByTagName('head')[0];
	  var style = document.createElement('style');
	  style.type = 'text/css';

	  if (insertAt === 'top') {
	    if (head.firstChild) {
	      head.insertBefore(style, head.firstChild);
	    } else {
	      head.appendChild(style);
	    }
	  } else {
	    head.appendChild(style);
	  }

	  if (style.styleSheet) {
	    style.styleSheet.cssText = css;
	  } else {
	    style.appendChild(document.createTextNode(css));
	  }
	}

	var css = "/*! Buefy v0.7.1 | MIT License | github.com/buefy/buefy */ \n/*! bulma.io v0.7.2 | MIT License | github.com/jgthms/bulma */@keyframes spinAround{0%{transform:rotate(0deg)}to{transform:rotate(359deg)}}.breadcrumb,.button,.delete,.file,.is-unselectable,.modal-close,.pagination-ellipsis,.pagination-link,.pagination-next,.pagination-previous,.tabs{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.navbar-link:not(.is-arrowless):after,.select:not(.is-multiple):not(.is-loading):after{border:3px solid transparent;border-radius:2px;border-right:0;border-top:0;content:\" \";display:block;height:.625em;margin-top:-.4375em;pointer-events:none;position:absolute;top:50%;transform:rotate(-45deg);transform-origin:center;width:.625em}.block:not(:last-child),.box:not(:last-child),.breadcrumb:not(:last-child),.content:not(:last-child),.highlight:not(:last-child),.level:not(:last-child),.list:not(:last-child),.message:not(:last-child),.notification:not(:last-child),.progress:not(:last-child),.subtitle:not(:last-child),.table-container:not(:last-child),.table:not(:last-child),.tabs:not(:last-child),.title:not(:last-child){margin-bottom:1.5rem}.delete,.modal-close{-moz-appearance:none;-webkit-appearance:none;background-color:hsla(0,0%,4%,.2);border:none;border-radius:290486px;cursor:pointer;pointer-events:auto;display:inline-block;flex-grow:0;flex-shrink:0;font-size:0;height:20px;max-height:20px;max-width:20px;min-height:20px;min-width:20px;outline:none;position:relative;vertical-align:top;width:20px}.delete:after,.delete:before,.modal-close:after,.modal-close:before{background-color:#fff;content:\"\";display:block;left:50%;position:absolute;top:50%;transform:translateX(-50%) translateY(-50%) rotate(45deg);transform-origin:center center}.delete:before,.modal-close:before{height:2px;width:50%}.delete:after,.modal-close:after{height:50%;width:2px}.delete:focus,.delete:hover,.modal-close:focus,.modal-close:hover{background-color:hsla(0,0%,4%,.3)}.delete:active,.modal-close:active{background-color:hsla(0,0%,4%,.4)}.is-small.delete,.is-small.modal-close{height:16px;max-height:16px;max-width:16px;min-height:16px;min-width:16px;width:16px}.is-medium.delete,.is-medium.modal-close{height:24px;max-height:24px;max-width:24px;min-height:24px;min-width:24px;width:24px}.is-large.delete,.is-large.modal-close{height:32px;max-height:32px;max-width:32px;min-height:32px;min-width:32px;width:32px}.button.is-loading:after,.control.is-loading:after,.loader,.select.is-loading:after{animation:spinAround .5s infinite linear;border:2px solid #dbdbdb;border-radius:290486px;border-right-color:transparent;border-top-color:transparent;content:\"\";display:block;height:1em;position:relative;width:1em}.hero-video,.image.is-1by1 img,.image.is-1by2 img,.image.is-1by3 img,.image.is-2by1 img,.image.is-2by3 img,.image.is-3by1 img,.image.is-3by2 img,.image.is-3by4 img,.image.is-3by5 img,.image.is-4by3 img,.image.is-4by5 img,.image.is-5by3 img,.image.is-5by4 img,.image.is-9by16 img,.image.is-16by9 img,.image.is-square img,.is-overlay,.modal,.modal-background{bottom:0;left:0;position:absolute;right:0;top:0}.button,.file-cta,.file-name,.input,.pagination-ellipsis,.pagination-link,.pagination-next,.pagination-previous,.select select,.taginput .taginput-container.is-focusable,.textarea{-moz-appearance:none;-webkit-appearance:none;align-items:center;border:1px solid transparent;border-radius:4px;box-shadow:none;display:inline-flex;font-size:1rem;height:2.25em;justify-content:flex-start;line-height:1.5;padding:calc(.375em - 1px) calc(.625em - 1px);position:relative;vertical-align:top}.button:active,.button:focus,.file-cta:active,.file-cta:focus,.file-name:active,.file-name:focus,.input:active,.input:focus,.is-active.button,.is-active.file-cta,.is-active.file-name,.is-active.input,.is-active.pagination-ellipsis,.is-active.pagination-link,.is-active.pagination-next,.is-active.pagination-previous,.is-active.textarea,.is-focused.button,.is-focused.file-cta,.is-focused.file-name,.is-focused.input,.is-focused.pagination-ellipsis,.is-focused.pagination-link,.is-focused.pagination-next,.is-focused.pagination-previous,.is-focused.textarea,.pagination-ellipsis:active,.pagination-ellipsis:focus,.pagination-link:active,.pagination-link:focus,.pagination-next:active,.pagination-next:focus,.pagination-previous:active,.pagination-previous:focus,.select select.is-active,.select select.is-focused,.select select:active,.select select:focus,.taginput .is-active.taginput-container.is-focusable,.taginput .is-focused.taginput-container.is-focusable,.taginput .taginput-container.is-focusable:active,.taginput .taginput-container.is-focusable:focus,.textarea:active,.textarea:focus{outline:none}.select select[disabled],.taginput [disabled].taginput-container.is-focusable,[disabled].button,[disabled].file-cta,[disabled].file-name,[disabled].input,[disabled].pagination-ellipsis,[disabled].pagination-link,[disabled].pagination-next,[disabled].pagination-previous,[disabled].textarea{cursor:not-allowed}\n\n/*! minireset.css v0.0.3 | MIT License | github.com/jgthms/minireset.css */blockquote,body,dd,dl,dt,fieldset,figure,h1,h2,h3,h4,h5,h6,hr,html,iframe,legend,li,ol,p,pre,textarea,ul{margin:0;padding:0}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:400}ul{list-style:none}button,input,select,textarea{margin:0}html{box-sizing:border-box}*,:after,:before{box-sizing:inherit}audio,img,video{height:auto;max-width:100%}iframe{border:0}table{border-collapse:collapse;border-spacing:0}td,th{padding:0;text-align:left}html{background-color:#fff;font-size:16px;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;min-width:300px;overflow-x:hidden;overflow-y:scroll;text-rendering:optimizeLegibility;text-size-adjust:100%}article,aside,figure,footer,header,hgroup,section{display:block}body,button,input,select,textarea{font-family:BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif}code,pre{-moz-osx-font-smoothing:auto;-webkit-font-smoothing:auto;font-family:monospace}body{color:#4a4a4a;font-size:1rem;font-weight:400;line-height:1.5}a{color:#7957d5;cursor:pointer;text-decoration:none}a strong{color:currentColor}a:hover{color:#363636}code{color:#ff3860;font-size:.875em;font-weight:400;padding:.25em .5em}code,hr{background-color:#f5f5f5}hr{border:none;display:block;height:2px;margin:1.5rem 0}img{height:auto;max-width:100%}input[type=checkbox],input[type=radio]{vertical-align:baseline}small{font-size:.875em}span{font-style:inherit;font-weight:inherit}strong{color:#363636;font-weight:700}pre{-webkit-overflow-scrolling:touch;background-color:#f5f5f5;color:#4a4a4a;font-size:.875em;overflow-x:auto;padding:1.25rem 1.5rem;white-space:pre;word-wrap:normal}pre code{background-color:transparent;color:currentColor;font-size:1em;padding:0}table td,table th{text-align:left;vertical-align:top}table th{color:#363636}.is-clearfix:after{clear:both;content:\" \";display:table}.is-pulled-left{float:left!important}.is-pulled-right{float:right!important}.is-clipped{overflow:hidden!important}.is-size-1{font-size:3rem!important}.is-size-2{font-size:2.5rem!important}.is-size-3{font-size:2rem!important}.is-size-4{font-size:1.5rem!important}.is-size-5{font-size:1.25rem!important}.is-size-6{font-size:1rem!important}.is-size-7{font-size:.75rem!important}@media screen and (max-width:768px){.is-size-1-mobile{font-size:3rem!important}.is-size-2-mobile{font-size:2.5rem!important}.is-size-3-mobile{font-size:2rem!important}.is-size-4-mobile{font-size:1.5rem!important}.is-size-5-mobile{font-size:1.25rem!important}.is-size-6-mobile{font-size:1rem!important}.is-size-7-mobile{font-size:.75rem!important}}@media print,screen and (min-width:769px){.is-size-1-tablet{font-size:3rem!important}.is-size-2-tablet{font-size:2.5rem!important}.is-size-3-tablet{font-size:2rem!important}.is-size-4-tablet{font-size:1.5rem!important}.is-size-5-tablet{font-size:1.25rem!important}.is-size-6-tablet{font-size:1rem!important}.is-size-7-tablet{font-size:.75rem!important}}@media screen and (max-width:1087px){.is-size-1-touch{font-size:3rem!important}.is-size-2-touch{font-size:2.5rem!important}.is-size-3-touch{font-size:2rem!important}.is-size-4-touch{font-size:1.5rem!important}.is-size-5-touch{font-size:1.25rem!important}.is-size-6-touch{font-size:1rem!important}.is-size-7-touch{font-size:.75rem!important}}@media screen and (min-width:1088px){.is-size-1-desktop{font-size:3rem!important}.is-size-2-desktop{font-size:2.5rem!important}.is-size-3-desktop{font-size:2rem!important}.is-size-4-desktop{font-size:1.5rem!important}.is-size-5-desktop{font-size:1.25rem!important}.is-size-6-desktop{font-size:1rem!important}.is-size-7-desktop{font-size:.75rem!important}}@media screen and (min-width:1280px){.is-size-1-widescreen{font-size:3rem!important}.is-size-2-widescreen{font-size:2.5rem!important}.is-size-3-widescreen{font-size:2rem!important}.is-size-4-widescreen{font-size:1.5rem!important}.is-size-5-widescreen{font-size:1.25rem!important}.is-size-6-widescreen{font-size:1rem!important}.is-size-7-widescreen{font-size:.75rem!important}}@media screen and (min-width:1472px){.is-size-1-fullhd{font-size:3rem!important}.is-size-2-fullhd{font-size:2.5rem!important}.is-size-3-fullhd{font-size:2rem!important}.is-size-4-fullhd{font-size:1.5rem!important}.is-size-5-fullhd{font-size:1.25rem!important}.is-size-6-fullhd{font-size:1rem!important}.is-size-7-fullhd{font-size:.75rem!important}}.has-text-centered{text-align:center!important}.has-text-justified{text-align:justify!important}.has-text-left{text-align:left!important}.has-text-right{text-align:right!important}@media screen and (max-width:768px){.has-text-centered-mobile{text-align:center!important}}@media print,screen and (min-width:769px){.has-text-centered-tablet{text-align:center!important}}@media screen and (min-width:769px) and (max-width:1087px){.has-text-centered-tablet-only{text-align:center!important}}@media screen and (max-width:1087px){.has-text-centered-touch{text-align:center!important}}@media screen and (min-width:1088px){.has-text-centered-desktop{text-align:center!important}}@media screen and (min-width:1088px) and (max-width:1279px){.has-text-centered-desktop-only{text-align:center!important}}@media screen and (min-width:1280px){.has-text-centered-widescreen{text-align:center!important}}@media screen and (min-width:1280px) and (max-width:1471px){.has-text-centered-widescreen-only{text-align:center!important}}@media screen and (min-width:1472px){.has-text-centered-fullhd{text-align:center!important}}@media screen and (max-width:768px){.has-text-justified-mobile{text-align:justify!important}}@media print,screen and (min-width:769px){.has-text-justified-tablet{text-align:justify!important}}@media screen and (min-width:769px) and (max-width:1087px){.has-text-justified-tablet-only{text-align:justify!important}}@media screen and (max-width:1087px){.has-text-justified-touch{text-align:justify!important}}@media screen and (min-width:1088px){.has-text-justified-desktop{text-align:justify!important}}@media screen and (min-width:1088px) and (max-width:1279px){.has-text-justified-desktop-only{text-align:justify!important}}@media screen and (min-width:1280px){.has-text-justified-widescreen{text-align:justify!important}}@media screen and (min-width:1280px) and (max-width:1471px){.has-text-justified-widescreen-only{text-align:justify!important}}@media screen and (min-width:1472px){.has-text-justified-fullhd{text-align:justify!important}}@media screen and (max-width:768px){.has-text-left-mobile{text-align:left!important}}@media print,screen and (min-width:769px){.has-text-left-tablet{text-align:left!important}}@media screen and (min-width:769px) and (max-width:1087px){.has-text-left-tablet-only{text-align:left!important}}@media screen and (max-width:1087px){.has-text-left-touch{text-align:left!important}}@media screen and (min-width:1088px){.has-text-left-desktop{text-align:left!important}}@media screen and (min-width:1088px) and (max-width:1279px){.has-text-left-desktop-only{text-align:left!important}}@media screen and (min-width:1280px){.has-text-left-widescreen{text-align:left!important}}@media screen and (min-width:1280px) and (max-width:1471px){.has-text-left-widescreen-only{text-align:left!important}}@media screen and (min-width:1472px){.has-text-left-fullhd{text-align:left!important}}@media screen and (max-width:768px){.has-text-right-mobile{text-align:right!important}}@media print,screen and (min-width:769px){.has-text-right-tablet{text-align:right!important}}@media screen and (min-width:769px) and (max-width:1087px){.has-text-right-tablet-only{text-align:right!important}}@media screen and (max-width:1087px){.has-text-right-touch{text-align:right!important}}@media screen and (min-width:1088px){.has-text-right-desktop{text-align:right!important}}@media screen and (min-width:1088px) and (max-width:1279px){.has-text-right-desktop-only{text-align:right!important}}@media screen and (min-width:1280px){.has-text-right-widescreen{text-align:right!important}}@media screen and (min-width:1280px) and (max-width:1471px){.has-text-right-widescreen-only{text-align:right!important}}@media screen and (min-width:1472px){.has-text-right-fullhd{text-align:right!important}}.is-capitalized{text-transform:capitalize!important}.is-lowercase{text-transform:lowercase!important}.is-uppercase{text-transform:uppercase!important}.is-italic{font-style:italic!important}.has-text-white{color:#fff!important}a.has-text-white:focus,a.has-text-white:hover{color:#e6e6e6!important}.has-background-white{background-color:#fff!important}.has-text-black{color:#0a0a0a!important}a.has-text-black:focus,a.has-text-black:hover{color:#000!important}.has-background-black{background-color:#0a0a0a!important}.has-text-light{color:#f5f5f5!important}a.has-text-light:focus,a.has-text-light:hover{color:#dbdbdb!important}.has-background-light{background-color:#f5f5f5!important}.has-text-dark{color:#363636!important}a.has-text-dark:focus,a.has-text-dark:hover{color:#1c1c1c!important}.has-background-dark{background-color:#363636!important}.has-text-primary{color:#7957d5!important}a.has-text-primary:focus,a.has-text-primary:hover{color:#5a32c7!important}.has-background-primary{background-color:#7957d5!important}.has-text-link{color:#7957d5!important}a.has-text-link:focus,a.has-text-link:hover{color:#5a32c7!important}.has-background-link{background-color:#7957d5!important}.has-text-info{color:#167df0!important}a.has-text-info:focus,a.has-text-info:hover{color:#0d64c6!important}.has-background-info{background-color:#167df0!important}.has-text-success{color:#23d160!important}a.has-text-success:focus,a.has-text-success:hover{color:#1ca64c!important}.has-background-success{background-color:#23d160!important}.has-text-warning{color:#ffdd57!important}a.has-text-warning:focus,a.has-text-warning:hover{color:#ffd324!important}.has-background-warning{background-color:#ffdd57!important}.has-text-danger{color:#ff3860!important}a.has-text-danger:focus,a.has-text-danger:hover{color:#ff0537!important}.has-background-danger{background-color:#ff3860!important}.has-text-black-bis{color:#121212!important}.has-background-black-bis{background-color:#121212!important}.has-text-black-ter{color:#242424!important}.has-background-black-ter{background-color:#242424!important}.has-text-grey-darker{color:#363636!important}.has-background-grey-darker{background-color:#363636!important}.has-text-grey-dark{color:#4a4a4a!important}.has-background-grey-dark{background-color:#4a4a4a!important}.has-text-grey{color:#7a7a7a!important}.has-background-grey{background-color:#7a7a7a!important}.has-text-grey-light{color:#b5b5b5!important}.has-background-grey-light{background-color:#b5b5b5!important}.has-text-grey-lighter{color:#dbdbdb!important}.has-background-grey-lighter{background-color:#dbdbdb!important}.has-text-white-ter{color:#f5f5f5!important}.has-background-white-ter{background-color:#f5f5f5!important}.has-text-white-bis{color:#fafafa!important}.has-background-white-bis{background-color:#fafafa!important}.has-text-weight-light{font-weight:300!important}.has-text-weight-normal{font-weight:400!important}.has-text-weight-semibold{font-weight:600!important}.has-text-weight-bold{font-weight:700!important}.is-block{display:block!important}@media screen and (max-width:768px){.is-block-mobile{display:block!important}}@media print,screen and (min-width:769px){.is-block-tablet{display:block!important}}@media screen and (min-width:769px) and (max-width:1087px){.is-block-tablet-only{display:block!important}}@media screen and (max-width:1087px){.is-block-touch{display:block!important}}@media screen and (min-width:1088px){.is-block-desktop{display:block!important}}@media screen and (min-width:1088px) and (max-width:1279px){.is-block-desktop-only{display:block!important}}@media screen and (min-width:1280px){.is-block-widescreen{display:block!important}}@media screen and (min-width:1280px) and (max-width:1471px){.is-block-widescreen-only{display:block!important}}@media screen and (min-width:1472px){.is-block-fullhd{display:block!important}}.is-flex{display:flex!important}@media screen and (max-width:768px){.is-flex-mobile{display:flex!important}}@media print,screen and (min-width:769px){.is-flex-tablet{display:flex!important}}@media screen and (min-width:769px) and (max-width:1087px){.is-flex-tablet-only{display:flex!important}}@media screen and (max-width:1087px){.is-flex-touch{display:flex!important}}@media screen and (min-width:1088px){.is-flex-desktop{display:flex!important}}@media screen and (min-width:1088px) and (max-width:1279px){.is-flex-desktop-only{display:flex!important}}@media screen and (min-width:1280px){.is-flex-widescreen{display:flex!important}}@media screen and (min-width:1280px) and (max-width:1471px){.is-flex-widescreen-only{display:flex!important}}@media screen and (min-width:1472px){.is-flex-fullhd{display:flex!important}}.is-inline{display:inline!important}@media screen and (max-width:768px){.is-inline-mobile{display:inline!important}}@media print,screen and (min-width:769px){.is-inline-tablet{display:inline!important}}@media screen and (min-width:769px) and (max-width:1087px){.is-inline-tablet-only{display:inline!important}}@media screen and (max-width:1087px){.is-inline-touch{display:inline!important}}@media screen and (min-width:1088px){.is-inline-desktop{display:inline!important}}@media screen and (min-width:1088px) and (max-width:1279px){.is-inline-desktop-only{display:inline!important}}@media screen and (min-width:1280px){.is-inline-widescreen{display:inline!important}}@media screen and (min-width:1280px) and (max-width:1471px){.is-inline-widescreen-only{display:inline!important}}@media screen and (min-width:1472px){.is-inline-fullhd{display:inline!important}}.is-inline-block{display:inline-block!important}@media screen and (max-width:768px){.is-inline-block-mobile{display:inline-block!important}}@media print,screen and (min-width:769px){.is-inline-block-tablet{display:inline-block!important}}@media screen and (min-width:769px) and (max-width:1087px){.is-inline-block-tablet-only{display:inline-block!important}}@media screen and (max-width:1087px){.is-inline-block-touch{display:inline-block!important}}@media screen and (min-width:1088px){.is-inline-block-desktop{display:inline-block!important}}@media screen and (min-width:1088px) and (max-width:1279px){.is-inline-block-desktop-only{display:inline-block!important}}@media screen and (min-width:1280px){.is-inline-block-widescreen{display:inline-block!important}}@media screen and (min-width:1280px) and (max-width:1471px){.is-inline-block-widescreen-only{display:inline-block!important}}@media screen and (min-width:1472px){.is-inline-block-fullhd{display:inline-block!important}}.is-inline-flex{display:inline-flex!important}@media screen and (max-width:768px){.is-inline-flex-mobile{display:inline-flex!important}}@media print,screen and (min-width:769px){.is-inline-flex-tablet{display:inline-flex!important}}@media screen and (min-width:769px) and (max-width:1087px){.is-inline-flex-tablet-only{display:inline-flex!important}}@media screen and (max-width:1087px){.is-inline-flex-touch{display:inline-flex!important}}@media screen and (min-width:1088px){.is-inline-flex-desktop{display:inline-flex!important}}@media screen and (min-width:1088px) and (max-width:1279px){.is-inline-flex-desktop-only{display:inline-flex!important}}@media screen and (min-width:1280px){.is-inline-flex-widescreen{display:inline-flex!important}}@media screen and (min-width:1280px) and (max-width:1471px){.is-inline-flex-widescreen-only{display:inline-flex!important}}@media screen and (min-width:1472px){.is-inline-flex-fullhd{display:inline-flex!important}}.is-hidden{display:none!important}.is-sr-only{border:none!important;clip:rect(0,0,0,0)!important;height:.01em!important;overflow:hidden!important;padding:0!important;position:absolute!important;white-space:nowrap!important;width:.01em!important}@media screen and (max-width:768px){.is-hidden-mobile{display:none!important}}@media print,screen and (min-width:769px){.is-hidden-tablet{display:none!important}}@media screen and (min-width:769px) and (max-width:1087px){.is-hidden-tablet-only{display:none!important}}@media screen and (max-width:1087px){.is-hidden-touch{display:none!important}}@media screen and (min-width:1088px){.is-hidden-desktop{display:none!important}}@media screen and (min-width:1088px) and (max-width:1279px){.is-hidden-desktop-only{display:none!important}}@media screen and (min-width:1280px){.is-hidden-widescreen{display:none!important}}@media screen and (min-width:1280px) and (max-width:1471px){.is-hidden-widescreen-only{display:none!important}}@media screen and (min-width:1472px){.is-hidden-fullhd{display:none!important}}.is-invisible{visibility:hidden!important}@media screen and (max-width:768px){.is-invisible-mobile{visibility:hidden!important}}@media print,screen and (min-width:769px){.is-invisible-tablet{visibility:hidden!important}}@media screen and (min-width:769px) and (max-width:1087px){.is-invisible-tablet-only{visibility:hidden!important}}@media screen and (max-width:1087px){.is-invisible-touch{visibility:hidden!important}}@media screen and (min-width:1088px){.is-invisible-desktop{visibility:hidden!important}}@media screen and (min-width:1088px) and (max-width:1279px){.is-invisible-desktop-only{visibility:hidden!important}}@media screen and (min-width:1280px){.is-invisible-widescreen{visibility:hidden!important}}@media screen and (min-width:1280px) and (max-width:1471px){.is-invisible-widescreen-only{visibility:hidden!important}}@media screen and (min-width:1472px){.is-invisible-fullhd{visibility:hidden!important}}.is-marginless{margin:0!important}.is-paddingless{padding:0!important}.is-radiusless{border-radius:0!important}.is-shadowless{box-shadow:none!important}.box{background-color:#fff;border-radius:6px;box-shadow:0 2px 3px hsla(0,0%,4%,.1),0 0 0 1px hsla(0,0%,4%,.1);color:#4a4a4a;display:block;padding:1.25rem}a.box:focus,a.box:hover{box-shadow:0 2px 3px hsla(0,0%,4%,.1),0 0 0 1px #7957d5}a.box:active{box-shadow:inset 0 1px 2px hsla(0,0%,4%,.2),0 0 0 1px #7957d5}.button{background-color:#fff;border-color:#dbdbdb;border-width:1px;color:#363636;cursor:pointer;justify-content:center;padding:calc(.375em - 1px) .75em;text-align:center;white-space:nowrap}.button strong{color:inherit}.button .icon,.button .icon.is-large,.button .icon.is-medium,.button .icon.is-small{height:1.5em;width:1.5em}.button .icon:first-child:not(:last-child){margin-left:calc(-.375em - 1px);margin-right:.1875em}.button .icon:last-child:not(:first-child){margin-left:.1875em;margin-right:calc(-.375em - 1px)}.button .icon:first-child:last-child{margin-left:calc(-.375em - 1px);margin-right:calc(-.375em - 1px)}.button.is-hovered,.button:hover{border-color:#b5b5b5;color:#363636}.button.is-focused,.button:focus{border-color:#7957d5;color:#363636}.button.is-focused:not(:active),.button:focus:not(:active){box-shadow:0 0 0 .125em rgba(121,87,213,.25)}.button.is-active,.button:active{border-color:#4a4a4a;color:#363636}.button.is-text{background-color:transparent;border-color:transparent;color:#4a4a4a;text-decoration:underline}.button.is-text.is-focused,.button.is-text.is-hovered,.button.is-text:focus,.button.is-text:hover{background-color:#f5f5f5;color:#363636}.button.is-text.is-active,.button.is-text:active{background-color:#e8e8e8;color:#363636}.button.is-text[disabled]{background-color:transparent;border-color:transparent;box-shadow:none}.button.is-white{background-color:#fff;border-color:transparent;color:#0a0a0a}.button.is-white.is-hovered,.button.is-white:hover{background-color:#f9f9f9;border-color:transparent;color:#0a0a0a}.button.is-white.is-focused,.button.is-white:focus{border-color:transparent;color:#0a0a0a}.button.is-white.is-focused:not(:active),.button.is-white:focus:not(:active){box-shadow:0 0 0 .125em hsla(0,0%,100%,.25)}.button.is-white.is-active,.button.is-white:active{background-color:#f2f2f2;border-color:transparent;color:#0a0a0a}.button.is-white[disabled]{background-color:#fff;border-color:transparent;box-shadow:none}.button.is-white.is-inverted{background-color:#0a0a0a;color:#fff}.button.is-white.is-inverted:hover{background-color:#000}.button.is-white.is-inverted[disabled]{background-color:#0a0a0a;border-color:transparent;box-shadow:none;color:#fff}.button.is-white.is-loading:after{border-color:transparent transparent #0a0a0a #0a0a0a!important}.button.is-white.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-white.is-outlined:focus,.button.is-white.is-outlined:hover{background-color:#fff;border-color:#fff;color:#0a0a0a}.button.is-white.is-outlined.is-loading:after{border-color:transparent transparent #fff #fff!important}.button.is-white.is-outlined[disabled]{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-white.is-inverted.is-outlined{background-color:transparent;border-color:#0a0a0a;color:#0a0a0a}.button.is-white.is-inverted.is-outlined:focus,.button.is-white.is-inverted.is-outlined:hover{background-color:#0a0a0a;color:#fff}.button.is-white.is-inverted.is-outlined[disabled]{background-color:transparent;border-color:#0a0a0a;box-shadow:none;color:#0a0a0a}.button.is-black{background-color:#0a0a0a;border-color:transparent;color:#fff}.button.is-black.is-hovered,.button.is-black:hover{background-color:#040404;border-color:transparent;color:#fff}.button.is-black.is-focused,.button.is-black:focus{border-color:transparent;color:#fff}.button.is-black.is-focused:not(:active),.button.is-black:focus:not(:active){box-shadow:0 0 0 .125em hsla(0,0%,4%,.25)}.button.is-black.is-active,.button.is-black:active{background-color:#000;border-color:transparent;color:#fff}.button.is-black[disabled]{background-color:#0a0a0a;border-color:transparent;box-shadow:none}.button.is-black.is-inverted{background-color:#fff;color:#0a0a0a}.button.is-black.is-inverted:hover{background-color:#f2f2f2}.button.is-black.is-inverted[disabled]{background-color:#fff;border-color:transparent;box-shadow:none;color:#0a0a0a}.button.is-black.is-loading:after{border-color:transparent transparent #fff #fff!important}.button.is-black.is-outlined{background-color:transparent;border-color:#0a0a0a;color:#0a0a0a}.button.is-black.is-outlined:focus,.button.is-black.is-outlined:hover{background-color:#0a0a0a;border-color:#0a0a0a;color:#fff}.button.is-black.is-outlined.is-loading:after{border-color:transparent transparent #0a0a0a #0a0a0a!important}.button.is-black.is-outlined[disabled]{background-color:transparent;border-color:#0a0a0a;box-shadow:none;color:#0a0a0a}.button.is-black.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-black.is-inverted.is-outlined:focus,.button.is-black.is-inverted.is-outlined:hover{background-color:#fff;color:#0a0a0a}.button.is-black.is-inverted.is-outlined[disabled]{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-light{background-color:#f5f5f5;border-color:transparent;color:#363636}.button.is-light.is-hovered,.button.is-light:hover{background-color:#eee;border-color:transparent;color:#363636}.button.is-light.is-focused,.button.is-light:focus{border-color:transparent;color:#363636}.button.is-light.is-focused:not(:active),.button.is-light:focus:not(:active){box-shadow:0 0 0 .125em hsla(0,0%,96%,.25)}.button.is-light.is-active,.button.is-light:active{background-color:#e8e8e8;border-color:transparent;color:#363636}.button.is-light[disabled]{background-color:#f5f5f5;border-color:transparent;box-shadow:none}.button.is-light.is-inverted{background-color:#363636;color:#f5f5f5}.button.is-light.is-inverted:hover{background-color:#292929}.button.is-light.is-inverted[disabled]{background-color:#363636;border-color:transparent;box-shadow:none;color:#f5f5f5}.button.is-light.is-loading:after{border-color:transparent transparent #363636 #363636!important}.button.is-light.is-outlined{background-color:transparent;border-color:#f5f5f5;color:#f5f5f5}.button.is-light.is-outlined:focus,.button.is-light.is-outlined:hover{background-color:#f5f5f5;border-color:#f5f5f5;color:#363636}.button.is-light.is-outlined.is-loading:after{border-color:transparent transparent #f5f5f5 #f5f5f5!important}.button.is-light.is-outlined[disabled]{background-color:transparent;border-color:#f5f5f5;box-shadow:none;color:#f5f5f5}.button.is-light.is-inverted.is-outlined{background-color:transparent;border-color:#363636;color:#363636}.button.is-light.is-inverted.is-outlined:focus,.button.is-light.is-inverted.is-outlined:hover{background-color:#363636;color:#f5f5f5}.button.is-light.is-inverted.is-outlined[disabled]{background-color:transparent;border-color:#363636;box-shadow:none;color:#363636}.button.is-dark{background-color:#363636;border-color:transparent;color:#f5f5f5}.button.is-dark.is-hovered,.button.is-dark:hover{background-color:#2f2f2f;border-color:transparent;color:#f5f5f5}.button.is-dark.is-focused,.button.is-dark:focus{border-color:transparent;color:#f5f5f5}.button.is-dark.is-focused:not(:active),.button.is-dark:focus:not(:active){box-shadow:0 0 0 .125em rgba(54,54,54,.25)}.button.is-dark.is-active,.button.is-dark:active{background-color:#292929;border-color:transparent;color:#f5f5f5}.button.is-dark[disabled]{background-color:#363636;border-color:transparent;box-shadow:none}.button.is-dark.is-inverted{background-color:#f5f5f5;color:#363636}.button.is-dark.is-inverted:hover{background-color:#e8e8e8}.button.is-dark.is-inverted[disabled]{background-color:#f5f5f5;border-color:transparent;box-shadow:none;color:#363636}.button.is-dark.is-loading:after{border-color:transparent transparent #f5f5f5 #f5f5f5!important}.button.is-dark.is-outlined{background-color:transparent;border-color:#363636;color:#363636}.button.is-dark.is-outlined:focus,.button.is-dark.is-outlined:hover{background-color:#363636;border-color:#363636;color:#f5f5f5}.button.is-dark.is-outlined.is-loading:after{border-color:transparent transparent #363636 #363636!important}.button.is-dark.is-outlined[disabled]{background-color:transparent;border-color:#363636;box-shadow:none;color:#363636}.button.is-dark.is-inverted.is-outlined{background-color:transparent;border-color:#f5f5f5;color:#f5f5f5}.button.is-dark.is-inverted.is-outlined:focus,.button.is-dark.is-inverted.is-outlined:hover{background-color:#f5f5f5;color:#363636}.button.is-dark.is-inverted.is-outlined[disabled]{background-color:transparent;border-color:#f5f5f5;box-shadow:none;color:#f5f5f5}.button.is-primary{background-color:#7957d5;border-color:transparent;color:#fff}.button.is-primary.is-hovered,.button.is-primary:hover{background-color:#714dd2;border-color:transparent;color:#fff}.button.is-primary.is-focused,.button.is-primary:focus{border-color:transparent;color:#fff}.button.is-primary.is-focused:not(:active),.button.is-primary:focus:not(:active){box-shadow:0 0 0 .125em rgba(121,87,213,.25)}.button.is-primary.is-active,.button.is-primary:active{background-color:#6943d0;border-color:transparent;color:#fff}.button.is-primary[disabled]{background-color:#7957d5;border-color:transparent;box-shadow:none}.button.is-primary.is-inverted{background-color:#fff;color:#7957d5}.button.is-primary.is-inverted:hover{background-color:#f2f2f2}.button.is-primary.is-inverted[disabled]{background-color:#fff;border-color:transparent;box-shadow:none;color:#7957d5}.button.is-primary.is-loading:after{border-color:transparent transparent #fff #fff!important}.button.is-primary.is-outlined{background-color:transparent;border-color:#7957d5;color:#7957d5}.button.is-primary.is-outlined:focus,.button.is-primary.is-outlined:hover{background-color:#7957d5;border-color:#7957d5;color:#fff}.button.is-primary.is-outlined.is-loading:after{border-color:transparent transparent #7957d5 #7957d5!important}.button.is-primary.is-outlined[disabled]{background-color:transparent;border-color:#7957d5;box-shadow:none;color:#7957d5}.button.is-primary.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-primary.is-inverted.is-outlined:focus,.button.is-primary.is-inverted.is-outlined:hover{background-color:#fff;color:#7957d5}.button.is-primary.is-inverted.is-outlined[disabled]{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-link{background-color:#7957d5;border-color:transparent;color:#fff}.button.is-link.is-hovered,.button.is-link:hover{background-color:#714dd2;border-color:transparent;color:#fff}.button.is-link.is-focused,.button.is-link:focus{border-color:transparent;color:#fff}.button.is-link.is-focused:not(:active),.button.is-link:focus:not(:active){box-shadow:0 0 0 .125em rgba(121,87,213,.25)}.button.is-link.is-active,.button.is-link:active{background-color:#6943d0;border-color:transparent;color:#fff}.button.is-link[disabled]{background-color:#7957d5;border-color:transparent;box-shadow:none}.button.is-link.is-inverted{background-color:#fff;color:#7957d5}.button.is-link.is-inverted:hover{background-color:#f2f2f2}.button.is-link.is-inverted[disabled]{background-color:#fff;border-color:transparent;box-shadow:none;color:#7957d5}.button.is-link.is-loading:after{border-color:transparent transparent #fff #fff!important}.button.is-link.is-outlined{background-color:transparent;border-color:#7957d5;color:#7957d5}.button.is-link.is-outlined:focus,.button.is-link.is-outlined:hover{background-color:#7957d5;border-color:#7957d5;color:#fff}.button.is-link.is-outlined.is-loading:after{border-color:transparent transparent #7957d5 #7957d5!important}.button.is-link.is-outlined[disabled]{background-color:transparent;border-color:#7957d5;box-shadow:none;color:#7957d5}.button.is-link.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-link.is-inverted.is-outlined:focus,.button.is-link.is-inverted.is-outlined:hover{background-color:#fff;color:#7957d5}.button.is-link.is-inverted.is-outlined[disabled]{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-info{background-color:#167df0;border-color:transparent;color:#fff}.button.is-info.is-hovered,.button.is-info:hover{background-color:#0f77ea;border-color:transparent;color:#fff}.button.is-info.is-focused,.button.is-info:focus{border-color:transparent;color:#fff}.button.is-info.is-focused:not(:active),.button.is-info:focus:not(:active){box-shadow:0 0 0 .125em rgba(22,125,240,.25)}.button.is-info.is-active,.button.is-info:active{background-color:#0e71de;border-color:transparent;color:#fff}.button.is-info[disabled]{background-color:#167df0;border-color:transparent;box-shadow:none}.button.is-info.is-inverted{background-color:#fff;color:#167df0}.button.is-info.is-inverted:hover{background-color:#f2f2f2}.button.is-info.is-inverted[disabled]{background-color:#fff;border-color:transparent;box-shadow:none;color:#167df0}.button.is-info.is-loading:after{border-color:transparent transparent #fff #fff!important}.button.is-info.is-outlined{background-color:transparent;border-color:#167df0;color:#167df0}.button.is-info.is-outlined:focus,.button.is-info.is-outlined:hover{background-color:#167df0;border-color:#167df0;color:#fff}.button.is-info.is-outlined.is-loading:after{border-color:transparent transparent #167df0 #167df0!important}.button.is-info.is-outlined[disabled]{background-color:transparent;border-color:#167df0;box-shadow:none;color:#167df0}.button.is-info.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-info.is-inverted.is-outlined:focus,.button.is-info.is-inverted.is-outlined:hover{background-color:#fff;color:#167df0}.button.is-info.is-inverted.is-outlined[disabled]{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-success{background-color:#23d160;border-color:transparent;color:#fff}.button.is-success.is-hovered,.button.is-success:hover{background-color:#22c65b;border-color:transparent;color:#fff}.button.is-success.is-focused,.button.is-success:focus{border-color:transparent;color:#fff}.button.is-success.is-focused:not(:active),.button.is-success:focus:not(:active){box-shadow:0 0 0 .125em rgba(35,209,96,.25)}.button.is-success.is-active,.button.is-success:active{background-color:#20bc56;border-color:transparent;color:#fff}.button.is-success[disabled]{background-color:#23d160;border-color:transparent;box-shadow:none}.button.is-success.is-inverted{background-color:#fff;color:#23d160}.button.is-success.is-inverted:hover{background-color:#f2f2f2}.button.is-success.is-inverted[disabled]{background-color:#fff;border-color:transparent;box-shadow:none;color:#23d160}.button.is-success.is-loading:after{border-color:transparent transparent #fff #fff!important}.button.is-success.is-outlined{background-color:transparent;border-color:#23d160;color:#23d160}.button.is-success.is-outlined:focus,.button.is-success.is-outlined:hover{background-color:#23d160;border-color:#23d160;color:#fff}.button.is-success.is-outlined.is-loading:after{border-color:transparent transparent #23d160 #23d160!important}.button.is-success.is-outlined[disabled]{background-color:transparent;border-color:#23d160;box-shadow:none;color:#23d160}.button.is-success.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-success.is-inverted.is-outlined:focus,.button.is-success.is-inverted.is-outlined:hover{background-color:#fff;color:#23d160}.button.is-success.is-inverted.is-outlined[disabled]{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-warning{background-color:#ffdd57;border-color:transparent;color:rgba(0,0,0,.7)}.button.is-warning.is-hovered,.button.is-warning:hover{background-color:#ffdb4a;border-color:transparent;color:rgba(0,0,0,.7)}.button.is-warning.is-focused,.button.is-warning:focus{border-color:transparent;color:rgba(0,0,0,.7)}.button.is-warning.is-focused:not(:active),.button.is-warning:focus:not(:active){box-shadow:0 0 0 .125em rgba(255,221,87,.25)}.button.is-warning.is-active,.button.is-warning:active{background-color:#ffd83d;border-color:transparent;color:rgba(0,0,0,.7)}.button.is-warning[disabled]{background-color:#ffdd57;border-color:transparent;box-shadow:none}.button.is-warning.is-inverted{color:#ffdd57}.button.is-warning.is-inverted,.button.is-warning.is-inverted:hover{background-color:rgba(0,0,0,.7)}.button.is-warning.is-inverted[disabled]{background-color:rgba(0,0,0,.7);border-color:transparent;box-shadow:none;color:#ffdd57}.button.is-warning.is-loading:after{border-color:transparent transparent rgba(0,0,0,.7) rgba(0,0,0,.7)!important}.button.is-warning.is-outlined{background-color:transparent;border-color:#ffdd57;color:#ffdd57}.button.is-warning.is-outlined:focus,.button.is-warning.is-outlined:hover{background-color:#ffdd57;border-color:#ffdd57;color:rgba(0,0,0,.7)}.button.is-warning.is-outlined.is-loading:after{border-color:transparent transparent #ffdd57 #ffdd57!important}.button.is-warning.is-outlined[disabled]{background-color:transparent;border-color:#ffdd57;box-shadow:none;color:#ffdd57}.button.is-warning.is-inverted.is-outlined{background-color:transparent;border-color:rgba(0,0,0,.7);color:rgba(0,0,0,.7)}.button.is-warning.is-inverted.is-outlined:focus,.button.is-warning.is-inverted.is-outlined:hover{background-color:rgba(0,0,0,.7);color:#ffdd57}.button.is-warning.is-inverted.is-outlined[disabled]{background-color:transparent;border-color:rgba(0,0,0,.7);box-shadow:none;color:rgba(0,0,0,.7)}.button.is-danger{background-color:#ff3860;border-color:transparent;color:#fff}.button.is-danger.is-hovered,.button.is-danger:hover{background-color:#ff2b56;border-color:transparent;color:#fff}.button.is-danger.is-focused,.button.is-danger:focus{border-color:transparent;color:#fff}.button.is-danger.is-focused:not(:active),.button.is-danger:focus:not(:active){box-shadow:0 0 0 .125em rgba(255,56,96,.25)}.button.is-danger.is-active,.button.is-danger:active{background-color:#ff1f4b;border-color:transparent;color:#fff}.button.is-danger[disabled]{background-color:#ff3860;border-color:transparent;box-shadow:none}.button.is-danger.is-inverted{background-color:#fff;color:#ff3860}.button.is-danger.is-inverted:hover{background-color:#f2f2f2}.button.is-danger.is-inverted[disabled]{background-color:#fff;border-color:transparent;box-shadow:none;color:#ff3860}.button.is-danger.is-loading:after{border-color:transparent transparent #fff #fff!important}.button.is-danger.is-outlined{background-color:transparent;border-color:#ff3860;color:#ff3860}.button.is-danger.is-outlined:focus,.button.is-danger.is-outlined:hover{background-color:#ff3860;border-color:#ff3860;color:#fff}.button.is-danger.is-outlined.is-loading:after{border-color:transparent transparent #ff3860 #ff3860!important}.button.is-danger.is-outlined[disabled]{background-color:transparent;border-color:#ff3860;box-shadow:none;color:#ff3860}.button.is-danger.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-danger.is-inverted.is-outlined:focus,.button.is-danger.is-inverted.is-outlined:hover{background-color:#fff;color:#ff3860}.button.is-danger.is-inverted.is-outlined[disabled]{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-small{border-radius:2px;font-size:.75rem}.button.is-medium{font-size:1.25rem}.button.is-large{font-size:1.5rem}.button[disabled]{background-color:#fff;border-color:#dbdbdb;box-shadow:none;opacity:.5}.button.is-fullwidth{display:flex;width:100%}.button.is-loading{color:transparent!important;pointer-events:none}.button.is-loading:after{position:absolute;left:calc(50% - .5em);top:calc(50% - .5em);position:absolute!important}.button.is-static{background-color:#f5f5f5;border-color:#dbdbdb;color:#7a7a7a;box-shadow:none;pointer-events:none}.button.is-rounded{border-radius:290486px;padding-left:1em;padding-right:1em}.buttons{align-items:center;display:flex;flex-wrap:wrap;justify-content:flex-start}.buttons .button{margin-bottom:.5rem}.buttons .button:not(:last-child):not(.is-fullwidth){margin-right:.5rem}.buttons:last-child{margin-bottom:-.5rem}.buttons:not(:last-child){margin-bottom:1rem}.buttons.has-addons .button:not(:first-child){border-bottom-left-radius:0;border-top-left-radius:0}.buttons.has-addons .button:not(:last-child){border-bottom-right-radius:0;border-top-right-radius:0;margin-right:-1px}.buttons.has-addons .button:last-child{margin-right:0}.buttons.has-addons .button.is-hovered,.buttons.has-addons .button:hover{z-index:2}.buttons.has-addons .button.is-active,.buttons.has-addons .button.is-focused,.buttons.has-addons .button.is-selected,.buttons.has-addons .button:active,.buttons.has-addons .button:focus{z-index:3}.buttons.has-addons .button.is-active:hover,.buttons.has-addons .button.is-focused:hover,.buttons.has-addons .button.is-selected:hover,.buttons.has-addons .button:active:hover,.buttons.has-addons .button:focus:hover{z-index:4}.buttons.has-addons .button.is-expanded{flex-grow:1}.buttons.is-centered{justify-content:center}.buttons.is-right{justify-content:flex-end}.container{margin:0 auto;position:relative}@media screen and (min-width:1088px){.container{max-width:960px;width:960px}.container.is-fluid{margin-left:64px;margin-right:64px;max-width:none;width:auto}}@media screen and (max-width:1279px){.container.is-widescreen{max-width:1152px;width:auto}}@media screen and (max-width:1471px){.container.is-fullhd{max-width:1344px;width:auto}}@media screen and (min-width:1280px){.container{max-width:1152px;width:1152px}}@media screen and (min-width:1472px){.container{max-width:1344px;width:1344px}}.content li+li{margin-top:.25em}.content blockquote:not(:last-child),.content dl:not(:last-child),.content ol:not(:last-child),.content p:not(:last-child),.content pre:not(:last-child),.content table:not(:last-child),.content ul:not(:last-child){margin-bottom:1em}.content h1,.content h2,.content h3,.content h4,.content h5,.content h6{color:#363636;font-weight:600;line-height:1.125}.content h1{font-size:2em;margin-bottom:.5em}.content h1:not(:first-child){margin-top:1em}.content h2{font-size:1.75em;margin-bottom:.5714em}.content h2:not(:first-child){margin-top:1.1428em}.content h3{font-size:1.5em;margin-bottom:.6666em}.content h3:not(:first-child){margin-top:1.3333em}.content h4{font-size:1.25em;margin-bottom:.8em}.content h5{font-size:1.125em;margin-bottom:.8888em}.content h6{font-size:1em;margin-bottom:1em}.content blockquote{background-color:#f5f5f5;border-left:5px solid #dbdbdb;padding:1.25em 1.5em}.content ol{list-style-position:outside;margin-left:2em;margin-top:1em}.content ol:not([type]){list-style-type:decimal}.content ol:not([type]).is-lower-alpha{list-style-type:lower-alpha}.content ol:not([type]).is-lower-roman{list-style-type:lower-roman}.content ol:not([type]).is-upper-alpha{list-style-type:upper-alpha}.content ol:not([type]).is-upper-roman{list-style-type:upper-roman}.content ul{list-style:disc outside;margin-left:2em;margin-top:1em}.content ul ul{list-style-type:circle;margin-top:.5em}.content ul ul ul{list-style-type:square}.content dd{margin-left:2em}.content figure{margin-left:2em;margin-right:2em;text-align:center}.content figure:not(:first-child){margin-top:2em}.content figure:not(:last-child){margin-bottom:2em}.content figure img{display:inline-block}.content figure figcaption{font-style:italic}.content pre{-webkit-overflow-scrolling:touch;overflow-x:auto;padding:1.25em 1.5em;white-space:pre;word-wrap:normal}.content sub,.content sup{font-size:75%}.content table{width:100%}.content table td,.content table th{border:1px solid #dbdbdb;border-width:0 0 1px;padding:.5em .75em;vertical-align:top}.content table th{color:#363636;text-align:left}.content table thead td,.content table thead th{border-width:0 0 2px;color:#363636}.content table tfoot td,.content table tfoot th{border-width:2px 0 0;color:#363636}.content table tbody tr:last-child td,.content table tbody tr:last-child th{border-bottom-width:0}.content.is-small{font-size:.75rem}.content.is-medium{font-size:1.25rem}.content.is-large{font-size:1.5rem}.input,.taginput .taginput-container.is-focusable,.textarea{background-color:#fff;border-color:#dbdbdb;color:#363636;box-shadow:inset 0 1px 2px hsla(0,0%,4%,.1);max-width:100%;width:100%}.input::-moz-placeholder,.taginput .taginput-container.is-focusable::-moz-placeholder,.textarea::-moz-placeholder{color:rgba(54,54,54,.3)}.input::-webkit-input-placeholder,.taginput .taginput-container.is-focusable::-webkit-input-placeholder,.textarea::-webkit-input-placeholder{color:rgba(54,54,54,.3)}.input:-moz-placeholder,.taginput .taginput-container.is-focusable:-moz-placeholder,.textarea:-moz-placeholder{color:rgba(54,54,54,.3)}.input:-ms-input-placeholder,.taginput .taginput-container.is-focusable:-ms-input-placeholder,.textarea:-ms-input-placeholder{color:rgba(54,54,54,.3)}.input.is-hovered,.input:hover,.taginput .is-hovered.taginput-container.is-focusable,.taginput .taginput-container.is-focusable:hover,.textarea.is-hovered,.textarea:hover{border-color:#b5b5b5}.input.is-active,.input.is-focused,.input:active,.input:focus,.taginput .is-active.taginput-container.is-focusable,.taginput .is-focused.taginput-container.is-focusable,.taginput .taginput-container.is-focusable:active,.taginput .taginput-container.is-focusable:focus,.textarea.is-active,.textarea.is-focused,.textarea:active,.textarea:focus{border-color:#7957d5;box-shadow:0 0 0 .125em rgba(121,87,213,.25)}.input[disabled],.taginput [disabled].taginput-container.is-focusable,.textarea[disabled]{background-color:#f5f5f5;border-color:#f5f5f5;box-shadow:none;color:#7a7a7a}.input[disabled]::-moz-placeholder,.taginput [disabled].taginput-container.is-focusable::-moz-placeholder,.textarea[disabled]::-moz-placeholder{color:hsla(0,0%,48%,.3)}.input[disabled]::-webkit-input-placeholder,.taginput [disabled].taginput-container.is-focusable::-webkit-input-placeholder,.textarea[disabled]::-webkit-input-placeholder{color:hsla(0,0%,48%,.3)}.input[disabled]:-moz-placeholder,.taginput [disabled].taginput-container.is-focusable:-moz-placeholder,.textarea[disabled]:-moz-placeholder{color:hsla(0,0%,48%,.3)}.input[disabled]:-ms-input-placeholder,.taginput [disabled].taginput-container.is-focusable:-ms-input-placeholder,.textarea[disabled]:-ms-input-placeholder{color:hsla(0,0%,48%,.3)}.input[readonly],.taginput [readonly].taginput-container.is-focusable,.textarea[readonly]{box-shadow:none}.input.is-white,.taginput .is-white.taginput-container.is-focusable,.textarea.is-white{border-color:#fff}.input.is-white.is-active,.input.is-white.is-focused,.input.is-white:active,.input.is-white:focus,.taginput .is-white.is-active.taginput-container.is-focusable,.taginput .is-white.is-focused.taginput-container.is-focusable,.taginput .is-white.taginput-container.is-focusable:active,.taginput .is-white.taginput-container.is-focusable:focus,.textarea.is-white.is-active,.textarea.is-white.is-focused,.textarea.is-white:active,.textarea.is-white:focus{box-shadow:0 0 0 .125em hsla(0,0%,100%,.25)}.input.is-black,.taginput .is-black.taginput-container.is-focusable,.textarea.is-black{border-color:#0a0a0a}.input.is-black.is-active,.input.is-black.is-focused,.input.is-black:active,.input.is-black:focus,.taginput .is-black.is-active.taginput-container.is-focusable,.taginput .is-black.is-focused.taginput-container.is-focusable,.taginput .is-black.taginput-container.is-focusable:active,.taginput .is-black.taginput-container.is-focusable:focus,.textarea.is-black.is-active,.textarea.is-black.is-focused,.textarea.is-black:active,.textarea.is-black:focus{box-shadow:0 0 0 .125em hsla(0,0%,4%,.25)}.input.is-light,.taginput .is-light.taginput-container.is-focusable,.textarea.is-light{border-color:#f5f5f5}.input.is-light.is-active,.input.is-light.is-focused,.input.is-light:active,.input.is-light:focus,.taginput .is-light.is-active.taginput-container.is-focusable,.taginput .is-light.is-focused.taginput-container.is-focusable,.taginput .is-light.taginput-container.is-focusable:active,.taginput .is-light.taginput-container.is-focusable:focus,.textarea.is-light.is-active,.textarea.is-light.is-focused,.textarea.is-light:active,.textarea.is-light:focus{box-shadow:0 0 0 .125em hsla(0,0%,96%,.25)}.input.is-dark,.taginput .is-dark.taginput-container.is-focusable,.textarea.is-dark{border-color:#363636}.input.is-dark.is-active,.input.is-dark.is-focused,.input.is-dark:active,.input.is-dark:focus,.taginput .is-dark.is-active.taginput-container.is-focusable,.taginput .is-dark.is-focused.taginput-container.is-focusable,.taginput .is-dark.taginput-container.is-focusable:active,.taginput .is-dark.taginput-container.is-focusable:focus,.textarea.is-dark.is-active,.textarea.is-dark.is-focused,.textarea.is-dark:active,.textarea.is-dark:focus{box-shadow:0 0 0 .125em rgba(54,54,54,.25)}.input.is-primary,.taginput .is-primary.taginput-container.is-focusable,.textarea.is-primary{border-color:#7957d5}.input.is-primary.is-active,.input.is-primary.is-focused,.input.is-primary:active,.input.is-primary:focus,.taginput .is-primary.is-active.taginput-container.is-focusable,.taginput .is-primary.is-focused.taginput-container.is-focusable,.taginput .is-primary.taginput-container.is-focusable:active,.taginput .is-primary.taginput-container.is-focusable:focus,.textarea.is-primary.is-active,.textarea.is-primary.is-focused,.textarea.is-primary:active,.textarea.is-primary:focus{box-shadow:0 0 0 .125em rgba(121,87,213,.25)}.input.is-link,.taginput .is-link.taginput-container.is-focusable,.textarea.is-link{border-color:#7957d5}.input.is-link.is-active,.input.is-link.is-focused,.input.is-link:active,.input.is-link:focus,.taginput .is-link.is-active.taginput-container.is-focusable,.taginput .is-link.is-focused.taginput-container.is-focusable,.taginput .is-link.taginput-container.is-focusable:active,.taginput .is-link.taginput-container.is-focusable:focus,.textarea.is-link.is-active,.textarea.is-link.is-focused,.textarea.is-link:active,.textarea.is-link:focus{box-shadow:0 0 0 .125em rgba(121,87,213,.25)}.input.is-info,.taginput .is-info.taginput-container.is-focusable,.textarea.is-info{border-color:#167df0}.input.is-info.is-active,.input.is-info.is-focused,.input.is-info:active,.input.is-info:focus,.taginput .is-info.is-active.taginput-container.is-focusable,.taginput .is-info.is-focused.taginput-container.is-focusable,.taginput .is-info.taginput-container.is-focusable:active,.taginput .is-info.taginput-container.is-focusable:focus,.textarea.is-info.is-active,.textarea.is-info.is-focused,.textarea.is-info:active,.textarea.is-info:focus{box-shadow:0 0 0 .125em rgba(22,125,240,.25)}.input.is-success,.taginput .is-success.taginput-container.is-focusable,.textarea.is-success{border-color:#23d160}.input.is-success.is-active,.input.is-success.is-focused,.input.is-success:active,.input.is-success:focus,.taginput .is-success.is-active.taginput-container.is-focusable,.taginput .is-success.is-focused.taginput-container.is-focusable,.taginput .is-success.taginput-container.is-focusable:active,.taginput .is-success.taginput-container.is-focusable:focus,.textarea.is-success.is-active,.textarea.is-success.is-focused,.textarea.is-success:active,.textarea.is-success:focus{box-shadow:0 0 0 .125em rgba(35,209,96,.25)}.input.is-warning,.taginput .is-warning.taginput-container.is-focusable,.textarea.is-warning{border-color:#ffdd57}.input.is-warning.is-active,.input.is-warning.is-focused,.input.is-warning:active,.input.is-warning:focus,.taginput .is-warning.is-active.taginput-container.is-focusable,.taginput .is-warning.is-focused.taginput-container.is-focusable,.taginput .is-warning.taginput-container.is-focusable:active,.taginput .is-warning.taginput-container.is-focusable:focus,.textarea.is-warning.is-active,.textarea.is-warning.is-focused,.textarea.is-warning:active,.textarea.is-warning:focus{box-shadow:0 0 0 .125em rgba(255,221,87,.25)}.input.is-danger,.taginput .is-danger.taginput-container.is-focusable,.textarea.is-danger{border-color:#ff3860}.input.is-danger.is-active,.input.is-danger.is-focused,.input.is-danger:active,.input.is-danger:focus,.taginput .is-danger.is-active.taginput-container.is-focusable,.taginput .is-danger.is-focused.taginput-container.is-focusable,.taginput .is-danger.taginput-container.is-focusable:active,.taginput .is-danger.taginput-container.is-focusable:focus,.textarea.is-danger.is-active,.textarea.is-danger.is-focused,.textarea.is-danger:active,.textarea.is-danger:focus{box-shadow:0 0 0 .125em rgba(255,56,96,.25)}.input.is-small,.taginput .is-small.taginput-container.is-focusable,.textarea.is-small{border-radius:2px;font-size:.75rem}.input.is-medium,.taginput .is-medium.taginput-container.is-focusable,.textarea.is-medium{font-size:1.25rem}.input.is-large,.taginput .is-large.taginput-container.is-focusable,.textarea.is-large{font-size:1.5rem}.input.is-fullwidth,.taginput .is-fullwidth.taginput-container.is-focusable,.textarea.is-fullwidth{display:block;width:100%}.input.is-inline,.taginput .is-inline.taginput-container.is-focusable,.textarea.is-inline{display:inline;width:auto}.input.is-rounded,.taginput .is-rounded.taginput-container.is-focusable{border-radius:290486px;padding-left:1em;padding-right:1em}.input.is-static,.taginput .is-static.taginput-container.is-focusable{background-color:transparent;border-color:transparent;box-shadow:none;padding-left:0;padding-right:0}.textarea{display:block;max-width:100%;min-width:100%;padding:.625em;resize:vertical}.textarea:not([rows]){max-height:600px;min-height:120px}.textarea[rows]{height:auto}.textarea.has-fixed-size{resize:none}.checkbox,.radio{cursor:pointer;display:inline-block;line-height:1.25;position:relative}.checkbox input,.radio input{cursor:pointer}.checkbox:hover,.radio:hover{color:#363636}.checkbox[disabled],.radio[disabled]{color:#7a7a7a;cursor:not-allowed}.radio+.radio{margin-left:.5em}.select{display:inline-block;max-width:100%;position:relative;vertical-align:top}.select:not(.is-multiple){height:2.25em}.select:not(.is-multiple):not(.is-loading):after{border-color:#7957d5;right:1.125em;z-index:4}.select.is-rounded select{border-radius:290486px;padding-left:1em}.select select{background-color:#fff;border-color:#dbdbdb;color:#363636;cursor:pointer;display:block;font-size:1em;max-width:100%;outline:none}.select select::-moz-placeholder{color:rgba(54,54,54,.3)}.select select::-webkit-input-placeholder{color:rgba(54,54,54,.3)}.select select:-moz-placeholder{color:rgba(54,54,54,.3)}.select select:-ms-input-placeholder{color:rgba(54,54,54,.3)}.select select.is-hovered,.select select:hover{border-color:#b5b5b5}.select select.is-active,.select select.is-focused,.select select:active,.select select:focus{border-color:#7957d5;box-shadow:0 0 0 .125em rgba(121,87,213,.25)}.select select[disabled]{background-color:#f5f5f5;border-color:#f5f5f5;box-shadow:none;color:#7a7a7a}.select select[disabled]::-moz-placeholder{color:hsla(0,0%,48%,.3)}.select select[disabled]::-webkit-input-placeholder{color:hsla(0,0%,48%,.3)}.select select[disabled]:-moz-placeholder{color:hsla(0,0%,48%,.3)}.select select[disabled]:-ms-input-placeholder{color:hsla(0,0%,48%,.3)}.select select::-ms-expand{display:none}.select select[disabled]:hover{border-color:#f5f5f5}.select select:not([multiple]){padding-right:2.5em}.select select[multiple]{height:auto;padding:0}.select select[multiple] option{padding:.5em 1em}.select:not(.is-multiple):not(.is-loading):hover:after{border-color:#363636}.select.is-white:not(:hover):after,.select.is-white select{border-color:#fff}.select.is-white select.is-hovered,.select.is-white select:hover{border-color:#f2f2f2}.select.is-white select.is-active,.select.is-white select.is-focused,.select.is-white select:active,.select.is-white select:focus{box-shadow:0 0 0 .125em hsla(0,0%,100%,.25)}.select.is-black:not(:hover):after,.select.is-black select{border-color:#0a0a0a}.select.is-black select.is-hovered,.select.is-black select:hover{border-color:#000}.select.is-black select.is-active,.select.is-black select.is-focused,.select.is-black select:active,.select.is-black select:focus{box-shadow:0 0 0 .125em hsla(0,0%,4%,.25)}.select.is-light:not(:hover):after,.select.is-light select{border-color:#f5f5f5}.select.is-light select.is-hovered,.select.is-light select:hover{border-color:#e8e8e8}.select.is-light select.is-active,.select.is-light select.is-focused,.select.is-light select:active,.select.is-light select:focus{box-shadow:0 0 0 .125em hsla(0,0%,96%,.25)}.select.is-dark:not(:hover):after,.select.is-dark select{border-color:#363636}.select.is-dark select.is-hovered,.select.is-dark select:hover{border-color:#292929}.select.is-dark select.is-active,.select.is-dark select.is-focused,.select.is-dark select:active,.select.is-dark select:focus{box-shadow:0 0 0 .125em rgba(54,54,54,.25)}.select.is-primary:not(:hover):after,.select.is-primary select{border-color:#7957d5}.select.is-primary select.is-hovered,.select.is-primary select:hover{border-color:#6943d0}.select.is-primary select.is-active,.select.is-primary select.is-focused,.select.is-primary select:active,.select.is-primary select:focus{box-shadow:0 0 0 .125em rgba(121,87,213,.25)}.select.is-link:not(:hover):after,.select.is-link select{border-color:#7957d5}.select.is-link select.is-hovered,.select.is-link select:hover{border-color:#6943d0}.select.is-link select.is-active,.select.is-link select.is-focused,.select.is-link select:active,.select.is-link select:focus{box-shadow:0 0 0 .125em rgba(121,87,213,.25)}.select.is-info:not(:hover):after,.select.is-info select{border-color:#167df0}.select.is-info select.is-hovered,.select.is-info select:hover{border-color:#0e71de}.select.is-info select.is-active,.select.is-info select.is-focused,.select.is-info select:active,.select.is-info select:focus{box-shadow:0 0 0 .125em rgba(22,125,240,.25)}.select.is-success:not(:hover):after,.select.is-success select{border-color:#23d160}.select.is-success select.is-hovered,.select.is-success select:hover{border-color:#20bc56}.select.is-success select.is-active,.select.is-success select.is-focused,.select.is-success select:active,.select.is-success select:focus{box-shadow:0 0 0 .125em rgba(35,209,96,.25)}.select.is-warning:not(:hover):after,.select.is-warning select{border-color:#ffdd57}.select.is-warning select.is-hovered,.select.is-warning select:hover{border-color:#ffd83d}.select.is-warning select.is-active,.select.is-warning select.is-focused,.select.is-warning select:active,.select.is-warning select:focus{box-shadow:0 0 0 .125em rgba(255,221,87,.25)}.select.is-danger:not(:hover):after,.select.is-danger select{border-color:#ff3860}.select.is-danger select.is-hovered,.select.is-danger select:hover{border-color:#ff1f4b}.select.is-danger select.is-active,.select.is-danger select.is-focused,.select.is-danger select:active,.select.is-danger select:focus{box-shadow:0 0 0 .125em rgba(255,56,96,.25)}.select.is-small{border-radius:2px;font-size:.75rem}.select.is-medium{font-size:1.25rem}.select.is-large{font-size:1.5rem}.select.is-disabled:after{border-color:#7a7a7a}.select.is-fullwidth,.select.is-fullwidth select{width:100%}.select.is-loading:after{margin-top:0;position:absolute;right:.625em;top:.625em;transform:none}.select.is-loading.is-small:after{font-size:.75rem}.select.is-loading.is-medium:after{font-size:1.25rem}.select.is-loading.is-large:after{font-size:1.5rem}.file{align-items:stretch;display:flex;justify-content:flex-start;position:relative}.file.is-white .file-cta{background-color:#fff;border-color:transparent;color:#0a0a0a}.file.is-white.is-hovered .file-cta,.file.is-white:hover .file-cta{background-color:#f9f9f9;border-color:transparent;color:#0a0a0a}.file.is-white.is-focused .file-cta,.file.is-white:focus .file-cta{border-color:transparent;box-shadow:0 0 .5em hsla(0,0%,100%,.25);color:#0a0a0a}.file.is-white.is-active .file-cta,.file.is-white:active .file-cta{background-color:#f2f2f2;border-color:transparent;color:#0a0a0a}.file.is-black .file-cta{background-color:#0a0a0a;border-color:transparent;color:#fff}.file.is-black.is-hovered .file-cta,.file.is-black:hover .file-cta{background-color:#040404;border-color:transparent;color:#fff}.file.is-black.is-focused .file-cta,.file.is-black:focus .file-cta{border-color:transparent;box-shadow:0 0 .5em hsla(0,0%,4%,.25);color:#fff}.file.is-black.is-active .file-cta,.file.is-black:active .file-cta{background-color:#000;border-color:transparent;color:#fff}.file.is-light .file-cta{background-color:#f5f5f5;border-color:transparent;color:#363636}.file.is-light.is-hovered .file-cta,.file.is-light:hover .file-cta{background-color:#eee;border-color:transparent;color:#363636}.file.is-light.is-focused .file-cta,.file.is-light:focus .file-cta{border-color:transparent;box-shadow:0 0 .5em hsla(0,0%,96%,.25);color:#363636}.file.is-light.is-active .file-cta,.file.is-light:active .file-cta{background-color:#e8e8e8;border-color:transparent;color:#363636}.file.is-dark .file-cta{background-color:#363636;border-color:transparent;color:#f5f5f5}.file.is-dark.is-hovered .file-cta,.file.is-dark:hover .file-cta{background-color:#2f2f2f;border-color:transparent;color:#f5f5f5}.file.is-dark.is-focused .file-cta,.file.is-dark:focus .file-cta{border-color:transparent;box-shadow:0 0 .5em rgba(54,54,54,.25);color:#f5f5f5}.file.is-dark.is-active .file-cta,.file.is-dark:active .file-cta{background-color:#292929;border-color:transparent;color:#f5f5f5}.file.is-primary .file-cta{background-color:#7957d5;border-color:transparent;color:#fff}.file.is-primary.is-hovered .file-cta,.file.is-primary:hover .file-cta{background-color:#714dd2;border-color:transparent;color:#fff}.file.is-primary.is-focused .file-cta,.file.is-primary:focus .file-cta{border-color:transparent;box-shadow:0 0 .5em rgba(121,87,213,.25);color:#fff}.file.is-primary.is-active .file-cta,.file.is-primary:active .file-cta{background-color:#6943d0;border-color:transparent;color:#fff}.file.is-link .file-cta{background-color:#7957d5;border-color:transparent;color:#fff}.file.is-link.is-hovered .file-cta,.file.is-link:hover .file-cta{background-color:#714dd2;border-color:transparent;color:#fff}.file.is-link.is-focused .file-cta,.file.is-link:focus .file-cta{border-color:transparent;box-shadow:0 0 .5em rgba(121,87,213,.25);color:#fff}.file.is-link.is-active .file-cta,.file.is-link:active .file-cta{background-color:#6943d0;border-color:transparent;color:#fff}.file.is-info .file-cta{background-color:#167df0;border-color:transparent;color:#fff}.file.is-info.is-hovered .file-cta,.file.is-info:hover .file-cta{background-color:#0f77ea;border-color:transparent;color:#fff}.file.is-info.is-focused .file-cta,.file.is-info:focus .file-cta{border-color:transparent;box-shadow:0 0 .5em rgba(22,125,240,.25);color:#fff}.file.is-info.is-active .file-cta,.file.is-info:active .file-cta{background-color:#0e71de;border-color:transparent;color:#fff}.file.is-success .file-cta{background-color:#23d160;border-color:transparent;color:#fff}.file.is-success.is-hovered .file-cta,.file.is-success:hover .file-cta{background-color:#22c65b;border-color:transparent;color:#fff}.file.is-success.is-focused .file-cta,.file.is-success:focus .file-cta{border-color:transparent;box-shadow:0 0 .5em rgba(35,209,96,.25);color:#fff}.file.is-success.is-active .file-cta,.file.is-success:active .file-cta{background-color:#20bc56;border-color:transparent;color:#fff}.file.is-warning .file-cta{background-color:#ffdd57;border-color:transparent;color:rgba(0,0,0,.7)}.file.is-warning.is-hovered .file-cta,.file.is-warning:hover .file-cta{background-color:#ffdb4a;border-color:transparent;color:rgba(0,0,0,.7)}.file.is-warning.is-focused .file-cta,.file.is-warning:focus .file-cta{border-color:transparent;box-shadow:0 0 .5em rgba(255,221,87,.25);color:rgba(0,0,0,.7)}.file.is-warning.is-active .file-cta,.file.is-warning:active .file-cta{background-color:#ffd83d;border-color:transparent;color:rgba(0,0,0,.7)}.file.is-danger .file-cta{background-color:#ff3860;border-color:transparent;color:#fff}.file.is-danger.is-hovered .file-cta,.file.is-danger:hover .file-cta{background-color:#ff2b56;border-color:transparent;color:#fff}.file.is-danger.is-focused .file-cta,.file.is-danger:focus .file-cta{border-color:transparent;box-shadow:0 0 .5em rgba(255,56,96,.25);color:#fff}.file.is-danger.is-active .file-cta,.file.is-danger:active .file-cta{background-color:#ff1f4b;border-color:transparent;color:#fff}.file.is-small{font-size:.75rem}.file.is-medium{font-size:1.25rem}.file.is-medium .file-icon .fa{font-size:21px}.file.is-large{font-size:1.5rem}.file.is-large .file-icon .fa{font-size:28px}.file.has-name .file-cta{border-bottom-right-radius:0;border-top-right-radius:0}.file.has-name .file-name{border-bottom-left-radius:0;border-top-left-radius:0}.file.has-name.is-empty .file-cta{border-radius:4px}.file.has-name.is-empty .file-name{display:none}.file.is-boxed .file-label{flex-direction:column}.file.is-boxed .file-cta{flex-direction:column;height:auto;padding:1em 3em}.file.is-boxed .file-name{border-width:0 1px 1px}.file.is-boxed .file-icon{height:1.5em;width:1.5em}.file.is-boxed .file-icon .fa{font-size:21px}.file.is-boxed.is-small .file-icon .fa{font-size:14px}.file.is-boxed.is-medium .file-icon .fa{font-size:28px}.file.is-boxed.is-large .file-icon .fa{font-size:35px}.file.is-boxed.has-name .file-cta{border-radius:4px 4px 0 0}.file.is-boxed.has-name .file-name{border-radius:0 0 4px 4px;border-width:0 1px 1px}.file.is-centered{justify-content:center}.file.is-fullwidth .file-label{width:100%}.file.is-fullwidth .file-name{flex-grow:1;max-width:none}.file.is-right{justify-content:flex-end}.file.is-right .file-cta{border-radius:0 4px 4px 0}.file.is-right .file-name{border-radius:4px 0 0 4px;border-width:1px 0 1px 1px;order:-1}.file-label{align-items:stretch;display:flex;cursor:pointer;justify-content:flex-start;overflow:hidden;position:relative}.file-label:hover .file-cta{background-color:#eee;color:#363636}.file-label:hover .file-name{border-color:#d5d5d5}.file-label:active .file-cta{background-color:#e8e8e8;color:#363636}.file-label:active .file-name{border-color:#cfcfcf}.file-input{height:100%;left:0;opacity:0;outline:none;position:absolute;top:0;width:100%}.file-cta,.file-name{border-color:#dbdbdb;border-radius:4px;font-size:1em;padding-left:1em;padding-right:1em;white-space:nowrap}.file-cta{background-color:#f5f5f5;color:#4a4a4a}.file-name{border-color:#dbdbdb;border-style:solid;border-width:1px 1px 1px 0;display:block;max-width:16em;overflow:hidden;text-align:left;text-overflow:ellipsis}.file-icon{align-items:center;display:flex;height:1em;justify-content:center;margin-right:.5em;width:1em}.file-icon .fa{font-size:14px}.label{color:#363636;display:block;font-size:1rem;font-weight:700}.label:not(:last-child){margin-bottom:.5em}.label.is-small{font-size:.75rem}.label.is-medium{font-size:1.25rem}.label.is-large{font-size:1.5rem}.help{display:block;font-size:.75rem;margin-top:.25rem}.help.is-white{color:#fff}.help.is-black{color:#0a0a0a}.help.is-light{color:#f5f5f5}.help.is-dark{color:#363636}.help.is-link,.help.is-primary{color:#7957d5}.help.is-info{color:#167df0}.help.is-success{color:#23d160}.help.is-warning{color:#ffdd57}.help.is-danger{color:#ff3860}.field:not(:last-child){margin-bottom:.75rem}.field.has-addons{display:flex;justify-content:flex-start}.field.has-addons .control:not(:last-child){margin-right:-1px}.field.has-addons .control:not(:first-child):not(:last-child) .button,.field.has-addons .control:not(:first-child):not(:last-child) .input,.field.has-addons .control:not(:first-child):not(:last-child) .select select,.field.has-addons .control:not(:first-child):not(:last-child) .taginput .taginput-container.is-focusable,.taginput .field.has-addons .control:not(:first-child):not(:last-child) .taginput-container.is-focusable{border-radius:0}.field.has-addons .control:first-child .button,.field.has-addons .control:first-child .input,.field.has-addons .control:first-child .select select,.field.has-addons .control:first-child .taginput .taginput-container.is-focusable,.taginput .field.has-addons .control:first-child .taginput-container.is-focusable{border-bottom-right-radius:0;border-top-right-radius:0}.field.has-addons .control:last-child .button,.field.has-addons .control:last-child .input,.field.has-addons .control:last-child .select select,.field.has-addons .control:last-child .taginput .taginput-container.is-focusable,.taginput .field.has-addons .control:last-child .taginput-container.is-focusable{border-bottom-left-radius:0;border-top-left-radius:0}.field.has-addons .control .button:not([disabled]).is-hovered,.field.has-addons .control .button:not([disabled]):hover,.field.has-addons .control .input:not([disabled]).is-hovered,.field.has-addons .control .input:not([disabled]):hover,.field.has-addons .control .select select:not([disabled]).is-hovered,.field.has-addons .control .select select:not([disabled]):hover,.field.has-addons .control .taginput .taginput-container.is-focusable:not([disabled]).is-hovered,.field.has-addons .control .taginput .taginput-container.is-focusable:not([disabled]):hover,.taginput .field.has-addons .control .taginput-container.is-focusable:not([disabled]).is-hovered,.taginput .field.has-addons .control .taginput-container.is-focusable:not([disabled]):hover{z-index:2}.field.has-addons .control .button:not([disabled]).is-active,.field.has-addons .control .button:not([disabled]).is-focused,.field.has-addons .control .button:not([disabled]):active,.field.has-addons .control .button:not([disabled]):focus,.field.has-addons .control .input:not([disabled]).is-active,.field.has-addons .control .input:not([disabled]).is-focused,.field.has-addons .control .input:not([disabled]):active,.field.has-addons .control .input:not([disabled]):focus,.field.has-addons .control .select select:not([disabled]).is-active,.field.has-addons .control .select select:not([disabled]).is-focused,.field.has-addons .control .select select:not([disabled]):active,.field.has-addons .control .select select:not([disabled]):focus,.field.has-addons .control .taginput .taginput-container.is-focusable:not([disabled]).is-active,.field.has-addons .control .taginput .taginput-container.is-focusable:not([disabled]).is-focused,.field.has-addons .control .taginput .taginput-container.is-focusable:not([disabled]):active,.field.has-addons .control .taginput .taginput-container.is-focusable:not([disabled]):focus,.taginput .field.has-addons .control .taginput-container.is-focusable:not([disabled]).is-active,.taginput .field.has-addons .control .taginput-container.is-focusable:not([disabled]).is-focused,.taginput .field.has-addons .control .taginput-container.is-focusable:not([disabled]):active,.taginput .field.has-addons .control .taginput-container.is-focusable:not([disabled]):focus{z-index:3}.field.has-addons .control .button:not([disabled]).is-active:hover,.field.has-addons .control .button:not([disabled]).is-focused:hover,.field.has-addons .control .button:not([disabled]):active:hover,.field.has-addons .control .button:not([disabled]):focus:hover,.field.has-addons .control .input:not([disabled]).is-active:hover,.field.has-addons .control .input:not([disabled]).is-focused:hover,.field.has-addons .control .input:not([disabled]):active:hover,.field.has-addons .control .input:not([disabled]):focus:hover,.field.has-addons .control .select select:not([disabled]).is-active:hover,.field.has-addons .control .select select:not([disabled]).is-focused:hover,.field.has-addons .control .select select:not([disabled]):active:hover,.field.has-addons .control .select select:not([disabled]):focus:hover,.field.has-addons .control .taginput .taginput-container.is-focusable:not([disabled]).is-active:hover,.field.has-addons .control .taginput .taginput-container.is-focusable:not([disabled]).is-focused:hover,.field.has-addons .control .taginput .taginput-container.is-focusable:not([disabled]):active:hover,.field.has-addons .control .taginput .taginput-container.is-focusable:not([disabled]):focus:hover,.taginput .field.has-addons .control .taginput-container.is-focusable:not([disabled]).is-active:hover,.taginput .field.has-addons .control .taginput-container.is-focusable:not([disabled]).is-focused:hover,.taginput .field.has-addons .control .taginput-container.is-focusable:not([disabled]):active:hover,.taginput .field.has-addons .control .taginput-container.is-focusable:not([disabled]):focus:hover{z-index:4}.field.has-addons .control.is-expanded{flex-grow:1}.field.has-addons.has-addons-centered{justify-content:center}.field.has-addons.has-addons-right{justify-content:flex-end}.field.has-addons.has-addons-fullwidth .control{flex-grow:1;flex-shrink:0}.field.is-grouped{display:flex;justify-content:flex-start}.field.is-grouped>.control{flex-shrink:0}.field.is-grouped>.control:not(:last-child){margin-bottom:0;margin-right:.75rem}.field.is-grouped>.control.is-expanded{flex-grow:1;flex-shrink:1}.field.is-grouped.is-grouped-centered{justify-content:center}.field.is-grouped.is-grouped-right{justify-content:flex-end}.field.is-grouped.is-grouped-multiline{flex-wrap:wrap}.field.is-grouped.is-grouped-multiline>.control:last-child,.field.is-grouped.is-grouped-multiline>.control:not(:last-child){margin-bottom:.75rem}.field.is-grouped.is-grouped-multiline:last-child{margin-bottom:-.75rem}.field.is-grouped.is-grouped-multiline:not(:last-child){margin-bottom:0}@media print,screen and (min-width:769px){.field.is-horizontal{display:flex}}.field-label .label{font-size:inherit}@media screen and (max-width:768px){.field-label{margin-bottom:.5rem}}@media print,screen and (min-width:769px){.field-label{flex-basis:0;flex-grow:1;flex-shrink:0;margin-right:1.5rem;text-align:right}.field-label.is-small{font-size:.75rem;padding-top:.375em}.field-label.is-normal{padding-top:.375em}.field-label.is-medium{font-size:1.25rem;padding-top:.375em}.field-label.is-large{font-size:1.5rem;padding-top:.375em}}.field-body .field .field{margin-bottom:0}@media print,screen and (min-width:769px){.field-body{display:flex;flex-basis:0;flex-grow:5;flex-shrink:1}.field-body .field{margin-bottom:0}.field-body>.field{flex-shrink:1}.field-body>.field:not(.is-narrow){flex-grow:1}.field-body>.field:not(:last-child){margin-right:.75rem}}.control{clear:both;font-size:1rem;position:relative;text-align:left}.control.has-icon .icon{color:#dbdbdb;height:2.25em;pointer-events:none;position:absolute;top:0;width:2.25em;z-index:4}.control.has-icon .input:focus+.icon,.control.has-icon .taginput .taginput-container.is-focusable:focus+.icon,.taginput .control.has-icon .taginput-container.is-focusable:focus+.icon{color:#7a7a7a}.control.has-icon .input.is-small+.icon,.control.has-icon .taginput .is-small.taginput-container.is-focusable+.icon,.taginput .control.has-icon .is-small.taginput-container.is-focusable+.icon{font-size:.75rem}.control.has-icon .input.is-medium+.icon,.control.has-icon .taginput .is-medium.taginput-container.is-focusable+.icon,.taginput .control.has-icon .is-medium.taginput-container.is-focusable+.icon{font-size:1.25rem}.control.has-icon .input.is-large+.icon,.control.has-icon .taginput .is-large.taginput-container.is-focusable+.icon,.taginput .control.has-icon .is-large.taginput-container.is-focusable+.icon{font-size:1.5rem}.control.has-icon:not(.has-icon-right) .icon{left:0}.control.has-icon:not(.has-icon-right) .input,.control.has-icon:not(.has-icon-right) .taginput .taginput-container.is-focusable,.taginput .control.has-icon:not(.has-icon-right) .taginput-container.is-focusable{padding-left:2.25em}.control.has-icon.has-icon-right .icon{right:0}.control.has-icon.has-icon-right .input,.control.has-icon.has-icon-right .taginput .taginput-container.is-focusable,.taginput .control.has-icon.has-icon-right .taginput-container.is-focusable{padding-right:2.25em}.control.has-icons-left .input:focus~.icon,.control.has-icons-left .select:focus~.icon,.control.has-icons-left .taginput .taginput-container.is-focusable:focus~.icon,.control.has-icons-right .input:focus~.icon,.control.has-icons-right .select:focus~.icon,.control.has-icons-right .taginput .taginput-container.is-focusable:focus~.icon,.taginput .control.has-icons-left .taginput-container.is-focusable:focus~.icon,.taginput .control.has-icons-right .taginput-container.is-focusable:focus~.icon{color:#7a7a7a}.control.has-icons-left .input.is-small~.icon,.control.has-icons-left .select.is-small~.icon,.control.has-icons-left .taginput .is-small.taginput-container.is-focusable~.icon,.control.has-icons-right .input.is-small~.icon,.control.has-icons-right .select.is-small~.icon,.control.has-icons-right .taginput .is-small.taginput-container.is-focusable~.icon,.taginput .control.has-icons-left .is-small.taginput-container.is-focusable~.icon,.taginput .control.has-icons-right .is-small.taginput-container.is-focusable~.icon{font-size:.75rem}.control.has-icons-left .input.is-medium~.icon,.control.has-icons-left .select.is-medium~.icon,.control.has-icons-left .taginput .is-medium.taginput-container.is-focusable~.icon,.control.has-icons-right .input.is-medium~.icon,.control.has-icons-right .select.is-medium~.icon,.control.has-icons-right .taginput .is-medium.taginput-container.is-focusable~.icon,.taginput .control.has-icons-left .is-medium.taginput-container.is-focusable~.icon,.taginput .control.has-icons-right .is-medium.taginput-container.is-focusable~.icon{font-size:1.25rem}.control.has-icons-left .input.is-large~.icon,.control.has-icons-left .select.is-large~.icon,.control.has-icons-left .taginput .is-large.taginput-container.is-focusable~.icon,.control.has-icons-right .input.is-large~.icon,.control.has-icons-right .select.is-large~.icon,.control.has-icons-right .taginput .is-large.taginput-container.is-focusable~.icon,.taginput .control.has-icons-left .is-large.taginput-container.is-focusable~.icon,.taginput .control.has-icons-right .is-large.taginput-container.is-focusable~.icon{font-size:1.5rem}.control.has-icons-left .icon,.control.has-icons-right .icon{color:#dbdbdb;height:2.25em;pointer-events:none;position:absolute;top:0;width:2.25em;z-index:4}.control.has-icons-left .input,.control.has-icons-left .select select,.control.has-icons-left .taginput .taginput-container.is-focusable,.taginput .control.has-icons-left .taginput-container.is-focusable{padding-left:2.25em}.control.has-icons-left .icon.is-left{left:0}.control.has-icons-right .input,.control.has-icons-right .select select,.control.has-icons-right .taginput .taginput-container.is-focusable,.taginput .control.has-icons-right .taginput-container.is-focusable{padding-right:2.25em}.control.has-icons-right .icon.is-right{right:0}.control.is-loading:after{position:absolute!important;right:.625em;top:.625em;z-index:4}.control.is-loading.is-small:after{font-size:.75rem}.control.is-loading.is-medium:after{font-size:1.25rem}.control.is-loading.is-large:after{font-size:1.5rem}.icon{align-items:center;display:inline-flex;justify-content:center;height:1.5rem;width:1.5rem}.icon.is-small{height:1rem;width:1rem}.icon.is-medium{height:2rem;width:2rem}.icon.is-large{height:3rem;width:3rem}.image{display:block;position:relative}.image img{display:block;height:auto;width:100%}.image img.is-rounded{border-radius:290486px}.image.is-1by1 img,.image.is-1by2 img,.image.is-1by3 img,.image.is-2by1 img,.image.is-2by3 img,.image.is-3by1 img,.image.is-3by2 img,.image.is-3by4 img,.image.is-3by5 img,.image.is-4by3 img,.image.is-4by5 img,.image.is-5by3 img,.image.is-5by4 img,.image.is-9by16 img,.image.is-16by9 img,.image.is-square img{height:100%;width:100%}.image.is-1by1,.image.is-square{padding-top:100%}.image.is-5by4{padding-top:80%}.image.is-4by3{padding-top:75%}.image.is-3by2{padding-top:66.6666%}.image.is-5by3{padding-top:60%}.image.is-16by9{padding-top:56.25%}.image.is-2by1{padding-top:50%}.image.is-3by1{padding-top:33.3333%}.image.is-4by5{padding-top:125%}.image.is-3by4{padding-top:133.3333%}.image.is-2by3{padding-top:150%}.image.is-3by5{padding-top:166.6666%}.image.is-9by16{padding-top:177.7777%}.image.is-1by2{padding-top:200%}.image.is-1by3{padding-top:300%}.image.is-16x16{height:16px;width:16px}.image.is-24x24{height:24px;width:24px}.image.is-32x32{height:32px;width:32px}.image.is-48x48{height:48px;width:48px}.image.is-64x64{height:64px;width:64px}.image.is-96x96{height:96px;width:96px}.image.is-128x128{height:128px;width:128px}.notification{background-color:#f5f5f5;border-radius:4px;padding:1.25rem 2.5rem 1.25rem 1.5rem;position:relative}.notification a:not(.button):not(.dropdown-item):not(.dropdown .dropdown-menu .has-link a){color:currentColor;text-decoration:underline}.notification strong{color:currentColor}.notification code,.notification pre{background:#fff}.notification pre code{background:transparent}.notification>.delete{position:absolute;right:.5rem;top:.5rem}.notification .content,.notification .subtitle,.notification .title{color:currentColor}.notification.is-white{background-color:#fff;color:#0a0a0a}.notification.is-black{background-color:#0a0a0a;color:#fff}.notification.is-light{background-color:#f5f5f5;color:#363636}.notification.is-dark{background-color:#363636;color:#f5f5f5}.notification.is-link,.notification.is-primary{background-color:#7957d5;color:#fff}.notification.is-info{background-color:#167df0;color:#fff}.notification.is-success{background-color:#23d160;color:#fff}.notification.is-warning{background-color:#ffdd57;color:rgba(0,0,0,.7)}.notification.is-danger{background-color:#ff3860;color:#fff}.progress{-moz-appearance:none;-webkit-appearance:none;border:none;border-radius:290486px;display:block;height:1rem;overflow:hidden;padding:0;width:100%}.progress::-webkit-progress-bar{background-color:#dbdbdb}.progress::-webkit-progress-value{background-color:#4a4a4a}.progress::-moz-progress-bar{background-color:#4a4a4a}.progress::-ms-fill{background-color:#4a4a4a;border:none}.progress.is-white::-webkit-progress-value{background-color:#fff}.progress.is-white::-moz-progress-bar{background-color:#fff}.progress.is-white::-ms-fill{background-color:#fff}.progress.is-black::-webkit-progress-value{background-color:#0a0a0a}.progress.is-black::-moz-progress-bar{background-color:#0a0a0a}.progress.is-black::-ms-fill{background-color:#0a0a0a}.progress.is-light::-webkit-progress-value{background-color:#f5f5f5}.progress.is-light::-moz-progress-bar{background-color:#f5f5f5}.progress.is-light::-ms-fill{background-color:#f5f5f5}.progress.is-dark::-webkit-progress-value{background-color:#363636}.progress.is-dark::-moz-progress-bar{background-color:#363636}.progress.is-dark::-ms-fill{background-color:#363636}.progress.is-primary::-webkit-progress-value{background-color:#7957d5}.progress.is-primary::-moz-progress-bar{background-color:#7957d5}.progress.is-primary::-ms-fill{background-color:#7957d5}.progress.is-link::-webkit-progress-value{background-color:#7957d5}.progress.is-link::-moz-progress-bar{background-color:#7957d5}.progress.is-link::-ms-fill{background-color:#7957d5}.progress.is-info::-webkit-progress-value{background-color:#167df0}.progress.is-info::-moz-progress-bar{background-color:#167df0}.progress.is-info::-ms-fill{background-color:#167df0}.progress.is-success::-webkit-progress-value{background-color:#23d160}.progress.is-success::-moz-progress-bar{background-color:#23d160}.progress.is-success::-ms-fill{background-color:#23d160}.progress.is-warning::-webkit-progress-value{background-color:#ffdd57}.progress.is-warning::-moz-progress-bar{background-color:#ffdd57}.progress.is-warning::-ms-fill{background-color:#ffdd57}.progress.is-danger::-webkit-progress-value{background-color:#ff3860}.progress.is-danger::-moz-progress-bar{background-color:#ff3860}.progress.is-danger::-ms-fill{background-color:#ff3860}.progress.is-small{height:.75rem}.progress.is-medium{height:1.25rem}.progress.is-large{height:1.5rem}.table{background-color:#fff;color:#363636}.table td,.table th{border:1px solid #dbdbdb;border-width:0 0 1px;padding:.5em .75em;vertical-align:top}.table td.is-white,.table th.is-white{background-color:#fff;border-color:#fff;color:#0a0a0a}.table td.is-black,.table th.is-black{background-color:#0a0a0a;border-color:#0a0a0a;color:#fff}.table td.is-light,.table th.is-light{background-color:#f5f5f5;border-color:#f5f5f5;color:#363636}.table td.is-dark,.table th.is-dark{background-color:#363636;border-color:#363636;color:#f5f5f5}.table td.is-link,.table td.is-primary,.table th.is-link,.table th.is-primary{background-color:#7957d5;border-color:#7957d5;color:#fff}.table td.is-info,.table th.is-info{background-color:#167df0;border-color:#167df0;color:#fff}.table td.is-success,.table th.is-success{background-color:#23d160;border-color:#23d160;color:#fff}.table td.is-warning,.table th.is-warning{background-color:#ffdd57;border-color:#ffdd57;color:rgba(0,0,0,.7)}.table td.is-danger,.table th.is-danger{background-color:#ff3860;border-color:#ff3860;color:#fff}.table td.is-narrow,.table th.is-narrow{white-space:nowrap;width:1%}.table td.is-selected,.table th.is-selected{background-color:#7957d5;color:#fff}.table td.is-selected a,.table td.is-selected strong,.table th.is-selected a,.table th.is-selected strong{color:currentColor}.table th{color:#363636;text-align:left}.table tr.is-selected{background-color:#7957d5;color:#fff}.table tr.is-selected a,.table tr.is-selected strong{color:currentColor}.table tr.is-selected td,.table tr.is-selected th{border-color:#fff;color:currentColor}.table thead td,.table thead th{border-width:0 0 2px;color:#363636}.table tfoot td,.table tfoot th{border-width:2px 0 0;color:#363636}.table tbody tr:last-child td,.table tbody tr:last-child th{border-bottom-width:0}.table.is-bordered td,.table.is-bordered th{border-width:1px}.table.is-bordered tr:last-child td,.table.is-bordered tr:last-child th{border-bottom-width:1px}.table.is-fullwidth{width:100%}.table.is-hoverable.is-striped tbody tr:not(.is-selected):hover,.table.is-hoverable tbody tr:not(.is-selected):hover{background-color:#fafafa}.table.is-hoverable.is-striped tbody tr:not(.is-selected):hover:nth-child(2n){background-color:#f5f5f5}.table.is-narrow td,.table.is-narrow th{padding:.25em .5em}.table.is-striped tbody tr:not(.is-selected):nth-child(2n){background-color:#fafafa}.table-container{-webkit-overflow-scrolling:touch;overflow:auto;overflow-y:hidden;max-width:100%}.tags{align-items:center;display:flex;flex-wrap:wrap;justify-content:flex-start}.tags .tag{margin-bottom:.5rem}.tags .tag:not(:last-child){margin-right:.5rem}.tags:last-child{margin-bottom:-.5rem}.tags:not(:last-child){margin-bottom:1rem}.tags.has-addons .tag{margin-right:0}.tags.has-addons .tag:not(:first-child){border-bottom-left-radius:0;border-top-left-radius:0}.tags.has-addons .tag:not(:last-child){border-bottom-right-radius:0;border-top-right-radius:0}.tags.is-centered{justify-content:center}.tags.is-centered .tag{margin-right:.25rem;margin-left:.25rem}.tags.is-right{justify-content:flex-end}.tags.is-right .tag:not(:first-child){margin-left:.5rem}.tags.is-right .tag:not(:last-child){margin-right:0}.tag:not(body){align-items:center;background-color:#f5f5f5;border-radius:4px;color:#4a4a4a;display:inline-flex;font-size:.75rem;height:2em;justify-content:center;line-height:1.5;padding-left:.75em;padding-right:.75em;white-space:nowrap}.tag:not(body) .delete{margin-left:.25rem;margin-right:-.375rem}.tag:not(body).is-white{background-color:#fff;color:#0a0a0a}.tag:not(body).is-black{background-color:#0a0a0a;color:#fff}.tag:not(body).is-light{background-color:#f5f5f5;color:#363636}.tag:not(body).is-dark{background-color:#363636;color:#f5f5f5}.tag:not(body).is-link,.tag:not(body).is-primary{background-color:#7957d5;color:#fff}.tag:not(body).is-info{background-color:#167df0;color:#fff}.tag:not(body).is-success{background-color:#23d160;color:#fff}.tag:not(body).is-warning{background-color:#ffdd57;color:rgba(0,0,0,.7)}.tag:not(body).is-danger{background-color:#ff3860;color:#fff}.tag:not(body).is-medium{font-size:1rem}.tag:not(body).is-large{font-size:1.25rem}.tag:not(body) .icon:first-child:not(:last-child){margin-left:-.375em;margin-right:.1875em}.tag:not(body) .icon:last-child:not(:first-child){margin-left:.1875em;margin-right:-.375em}.tag:not(body) .icon:first-child:last-child{margin-left:-.375em;margin-right:-.375em}.tag:not(body).is-delete{margin-left:1px;padding:0;position:relative;width:2em}.tag:not(body).is-delete:after,.tag:not(body).is-delete:before{background-color:currentColor;content:\"\";display:block;left:50%;position:absolute;top:50%;transform:translateX(-50%) translateY(-50%) rotate(45deg);transform-origin:center center}.tag:not(body).is-delete:before{height:1px;width:50%}.tag:not(body).is-delete:after{height:50%;width:1px}.tag:not(body).is-delete:focus,.tag:not(body).is-delete:hover{background-color:#e8e8e8}.tag:not(body).is-delete:active{background-color:#dbdbdb}.tag:not(body).is-rounded{border-radius:290486px}a.tag:hover{text-decoration:underline}.subtitle,.title{word-break:break-word}.subtitle em,.subtitle span,.title em,.title span{font-weight:inherit}.subtitle sub,.subtitle sup,.title sub,.title sup{font-size:.75em}.subtitle .tag,.title .tag{vertical-align:middle}.title{color:#363636;font-size:2rem;font-weight:600;line-height:1.125}.title strong{color:inherit;font-weight:inherit}.title+.highlight{margin-top:-.75rem}.title:not(.is-spaced)+.subtitle{margin-top:-1.25rem}.title.is-1{font-size:3rem}.title.is-2{font-size:2.5rem}.title.is-3{font-size:2rem}.title.is-4{font-size:1.5rem}.title.is-5{font-size:1.25rem}.title.is-6{font-size:1rem}.title.is-7{font-size:.75rem}.subtitle{color:#4a4a4a;font-size:1.25rem;font-weight:400;line-height:1.25}.subtitle strong{color:#363636;font-weight:600}.subtitle:not(.is-spaced)+.title{margin-top:-1.25rem}.subtitle.is-1{font-size:3rem}.subtitle.is-2{font-size:2.5rem}.subtitle.is-3{font-size:2rem}.subtitle.is-4{font-size:1.5rem}.subtitle.is-5{font-size:1.25rem}.subtitle.is-6{font-size:1rem}.subtitle.is-7{font-size:.75rem}.heading{display:block;font-size:11px;letter-spacing:1px;margin-bottom:5px;text-transform:uppercase}.highlight{font-weight:400;max-width:100%;overflow:hidden;padding:0}.highlight pre{overflow:auto;max-width:100%}.number{align-items:center;background-color:#f5f5f5;border-radius:290486px;display:inline-flex;font-size:1.25rem;height:2em;justify-content:center;margin-right:1.5rem;min-width:2.5em;padding:.25rem .5rem;text-align:center;vertical-align:top}.breadcrumb{font-size:1rem;white-space:nowrap}.breadcrumb a{align-items:center;color:#7957d5;display:flex;justify-content:center;padding:0 .75em}.breadcrumb a:hover{color:#363636}.breadcrumb li{align-items:center;display:flex}.breadcrumb li:first-child a{padding-left:0}.breadcrumb li.is-active a{color:#363636;cursor:default;pointer-events:none}.breadcrumb li+li:before{color:#b5b5b5;content:\"/\"}.breadcrumb ol,.breadcrumb ul{align-items:flex-start;display:flex;flex-wrap:wrap;justify-content:flex-start}.breadcrumb .icon:first-child{margin-right:.5em}.breadcrumb .icon:last-child{margin-left:.5em}.breadcrumb.is-centered ol,.breadcrumb.is-centered ul{justify-content:center}.breadcrumb.is-right ol,.breadcrumb.is-right ul{justify-content:flex-end}.breadcrumb.is-small{font-size:.75rem}.breadcrumb.is-medium{font-size:1.25rem}.breadcrumb.is-large{font-size:1.5rem}.breadcrumb.has-arrow-separator li+li:before{content:\"\\2192\"}.breadcrumb.has-bullet-separator li+li:before{content:\"\\2022\"}.breadcrumb.has-dot-separator li+li:before{content:\"\\B7\"}.breadcrumb.has-succeeds-separator li+li:before{content:\"\\227B\"}.card{background-color:#fff;box-shadow:0 2px 3px hsla(0,0%,4%,.1),0 0 0 1px hsla(0,0%,4%,.1);color:#4a4a4a;max-width:100%;position:relative}.card-header{background-color:transparent;align-items:stretch;box-shadow:0 1px 2px hsla(0,0%,4%,.1);display:flex}.card-header-title{align-items:center;color:#363636;display:flex;flex-grow:1;font-weight:700;padding:.75rem}.card-header-icon,.card-header-title.is-centered{justify-content:center}.card-header-icon{align-items:center;cursor:pointer;display:flex;padding:.75rem}.card-image{display:block;position:relative}.card-content{padding:1.5rem}.card-content,.card-footer{background-color:transparent}.card-footer{border-top:1px solid #dbdbdb;align-items:stretch;display:flex}.card-footer-item{align-items:center;display:flex;flex-basis:0;flex-grow:1;flex-shrink:0;justify-content:center;padding:.75rem}.card-footer-item:not(:last-child){border-right:1px solid #dbdbdb}.card .media:not(:last-child){margin-bottom:.75rem}.dropdown{display:inline-flex;position:relative;vertical-align:top}.dropdown.is-active .dropdown-menu,.dropdown.is-hoverable:hover .dropdown-menu{display:block}.dropdown.is-right .dropdown-menu{left:auto;right:0}.dropdown.is-up .dropdown-menu{bottom:100%;padding-bottom:4px;padding-top:0;top:auto}.dropdown-menu{display:none;left:0;min-width:12rem;padding-top:4px;position:absolute;top:100%;z-index:20}.dropdown-content{background-color:#fff;border-radius:4px;box-shadow:0 2px 3px hsla(0,0%,4%,.1),0 0 0 1px hsla(0,0%,4%,.1);padding-bottom:.5rem;padding-top:.5rem}.dropdown-item,.dropdown .dropdown-menu .has-link a{color:#4a4a4a;display:block;font-size:.875rem;line-height:1.5;padding:.375rem 1rem;position:relative}.dropdown .dropdown-menu .has-link a,a.dropdown-item,button.dropdown-item{padding-right:3rem;text-align:left;white-space:nowrap;width:100%}.dropdown .dropdown-menu .has-link a:hover,a.dropdown-item:hover,button.dropdown-item:hover{background-color:#f5f5f5;color:#0a0a0a}.dropdown .dropdown-menu .has-link a.is-active,a.dropdown-item.is-active,button.dropdown-item.is-active{background-color:#7957d5;color:#fff}.dropdown-divider{background-color:#dbdbdb;border:none;display:block;height:1px;margin:.5rem 0}.level{align-items:center;justify-content:space-between}.level code{border-radius:4px}.level img{display:inline-block;vertical-align:top}.level.is-mobile,.level.is-mobile .level-left,.level.is-mobile .level-right{display:flex}.level.is-mobile .level-left+.level-right{margin-top:0}.level.is-mobile .level-item:not(:last-child){margin-bottom:0;margin-right:.75rem}.level.is-mobile .level-item:not(.is-narrow){flex-grow:1}@media print,screen and (min-width:769px){.level{display:flex}.level>.level-item:not(.is-narrow){flex-grow:1}}.level-item{align-items:center;display:flex;flex-basis:auto;flex-grow:0;flex-shrink:0;justify-content:center}.level-item .subtitle,.level-item .title{margin-bottom:0}@media screen and (max-width:768px){.level-item:not(:last-child){margin-bottom:.75rem}}.level-left,.level-right{flex-basis:auto;flex-grow:0;flex-shrink:0}.level-left .level-item.is-flexible,.level-right .level-item.is-flexible{flex-grow:1}@media print,screen and (min-width:769px){.level-left .level-item:not(:last-child),.level-right .level-item:not(:last-child){margin-right:.75rem}}.level-left{align-items:center;justify-content:flex-start}@media screen and (max-width:768px){.level-left+.level-right{margin-top:1.5rem}}@media print,screen and (min-width:769px){.level-left{display:flex}}.level-right{align-items:center;justify-content:flex-end}@media print,screen and (min-width:769px){.level-right{display:flex}}.list{background-color:#fff;border-radius:4px;box-shadow:0 2px 3px hsla(0,0%,4%,.1),0 0 0 1px hsla(0,0%,4%,.1)}.list-item{display:block;padding:.5em 1em}.list-item:not(a){color:#4a4a4a}.list-item:first-child,.list-item:last-child{border-top-left-radius:4px;border-top-right-radius:4px}.list-item:not(:last-child){border-bottom:1px solid #dbdbdb}.list-item.is-active{background-color:#7957d5;color:#fff}a.list-item{background-color:#f5f5f5;cursor:pointer}.media{align-items:flex-start;display:flex;text-align:left}.media .content:not(:last-child){margin-bottom:.75rem}.media .media{border-top:1px solid hsla(0,0%,86%,.5);display:flex;padding-top:.75rem}.media .media .content:not(:last-child),.media .media .control:not(:last-child){margin-bottom:.5rem}.media .media .media{padding-top:.5rem}.media .media .media+.media{margin-top:.5rem}.media+.media{border-top:1px solid hsla(0,0%,86%,.5);margin-top:1rem;padding-top:1rem}.media.is-large+.media{margin-top:1.5rem;padding-top:1.5rem}.media-left,.media-right{flex-basis:auto;flex-grow:0;flex-shrink:0}.media-left{margin-right:1rem}.media-right{margin-left:1rem}.media-content{flex-basis:auto;flex-grow:1;flex-shrink:1;text-align:left}@media screen and (max-width:768px){.media-content{overflow-x:auto}}.menu{font-size:1rem}.menu.is-small{font-size:.75rem}.menu.is-medium{font-size:1.25rem}.menu.is-large{font-size:1.5rem}.menu-list{line-height:1.25}.menu-list a{border-radius:2px;color:#4a4a4a;display:block;padding:.5em .75em}.menu-list a:hover{background-color:#f5f5f5;color:#363636}.menu-list a.is-active{background-color:#7957d5;color:#fff}.menu-list li ul{border-left:1px solid #dbdbdb;margin:.75em;padding-left:.75em}.menu-label{color:#7a7a7a;font-size:.75em;letter-spacing:.1em;text-transform:uppercase}.menu-label:not(:first-child){margin-top:1em}.menu-label:not(:last-child){margin-bottom:1em}.message{background-color:#f5f5f5;border-radius:4px;font-size:1rem}.message strong{color:currentColor}.message a:not(.button):not(.tag){color:currentColor;text-decoration:underline}.message.is-small{font-size:.75rem}.message.is-medium{font-size:1.25rem}.message.is-large{font-size:1.5rem}.message.is-white{background-color:#fff}.message.is-white .message-header{background-color:#fff;color:#0a0a0a}.message.is-white .message-body{border-color:#fff;color:#4d4d4d}.message.is-black{background-color:#fafafa}.message.is-black .message-header{background-color:#0a0a0a;color:#fff}.message.is-black .message-body{border-color:#0a0a0a;color:#090909}.message.is-light{background-color:#fafafa}.message.is-light .message-header{background-color:#f5f5f5;color:#363636}.message.is-light .message-body{border-color:#f5f5f5;color:#505050}.message.is-dark{background-color:#fafafa}.message.is-dark .message-header{background-color:#363636;color:#f5f5f5}.message.is-dark .message-body{border-color:#363636;color:#2a2a2a}.message.is-primary{background-color:#f8f7fd}.message.is-primary .message-header{background-color:#7957d5;color:#fff}.message.is-primary .message-body{border-color:#7957d5;color:#5534ae}.message.is-link{background-color:#f8f7fd}.message.is-link .message-header{background-color:#7957d5;color:#fff}.message.is-link .message-body{border-color:#7957d5;color:#5534ae}.message.is-info{background-color:#f5fafe}.message.is-info .message-header{background-color:#167df0;color:#fff}.message.is-info .message-body{border-color:#167df0;color:#115199}.message.is-success{background-color:#f6fef9}.message.is-success .message-header{background-color:#23d160;color:#fff}.message.is-success .message-body{border-color:#23d160;color:#0e301a}.message.is-warning{background-color:#fffdf5}.message.is-warning .message-header{background-color:#ffdd57;color:rgba(0,0,0,.7)}.message.is-warning .message-body{border-color:#ffdd57;color:#3b3108}.message.is-danger{background-color:#fff5f7}.message.is-danger .message-header{background-color:#ff3860;color:#fff}.message.is-danger .message-body{border-color:#ff3860;color:#cd0930}.message-header{align-items:center;background-color:#4a4a4a;border-radius:4px 4px 0 0;color:#fff;display:flex;font-weight:700;justify-content:space-between;line-height:1.25;padding:.75em 1em;position:relative}.message-header .delete{flex-grow:0;flex-shrink:0;margin-left:.75em}.message-header+.message-body{border-width:0;border-top-left-radius:0;border-top-right-radius:0}.message-body{border-color:#dbdbdb;border-radius:4px;border-style:solid;border-width:0 0 0 4px;color:#4a4a4a;padding:1.25em 1.5em}.message-body code,.message-body pre{background-color:#fff}.message-body pre code{background-color:transparent}.modal{align-items:center;display:none;flex-direction:column;justify-content:center;overflow:hidden;position:fixed;z-index:40}.modal.is-active{display:flex}.modal-background{background-color:hsla(0,0%,4%,.86)}.modal-card,.modal-content{margin:0 20px;max-height:calc(100vh - 160px);overflow:auto;position:relative;width:100%}@media print,screen and (min-width:769px){.modal-card,.modal-content{margin:0 auto;max-height:calc(100vh - 40px);width:640px}}.modal-close{background:none;height:40px;position:fixed;right:20px;top:20px;width:40px}.modal-card{display:flex;flex-direction:column;max-height:calc(100vh - 40px);overflow:hidden;-ms-overflow-y:visible}.modal-card-foot,.modal-card-head{align-items:center;background-color:#f5f5f5;display:flex;flex-shrink:0;justify-content:flex-start;padding:20px;position:relative}.modal-card-head{border-bottom:1px solid #dbdbdb;border-top-left-radius:6px;border-top-right-radius:6px}.modal-card-title{color:#363636;flex-grow:1;flex-shrink:0;font-size:1.5rem;line-height:1}.modal-card-foot{border-bottom-left-radius:6px;border-bottom-right-radius:6px;border-top:1px solid #dbdbdb}.modal-card-foot .button:not(:last-child){margin-right:10px}.modal-card-body{-webkit-overflow-scrolling:touch;background-color:#fff;flex-grow:1;flex-shrink:1;overflow:auto;padding:20px}.navbar{background-color:#fff;min-height:3.25rem;position:relative;z-index:30}.navbar.is-white{background-color:#fff;color:#0a0a0a}.navbar.is-white .navbar-brand .navbar-link,.navbar.is-white .navbar-brand>.navbar-item{color:#0a0a0a}.navbar.is-white .navbar-brand .navbar-link.is-active,.navbar.is-white .navbar-brand .navbar-link:hover,.navbar.is-white .navbar-brand>a.navbar-item.is-active,.navbar.is-white .navbar-brand>a.navbar-item:hover{background-color:#f2f2f2;color:#0a0a0a}.navbar.is-white .navbar-brand .navbar-link:after{border-color:#0a0a0a}.navbar.is-white .navbar-burger{color:#0a0a0a}@media screen and (min-width:1088px){.navbar.is-white .navbar-end .navbar-link,.navbar.is-white .navbar-end>.navbar-item,.navbar.is-white .navbar-start .navbar-link,.navbar.is-white .navbar-start>.navbar-item{color:#0a0a0a}.navbar.is-white .navbar-end .navbar-link.is-active,.navbar.is-white .navbar-end .navbar-link:hover,.navbar.is-white .navbar-end>a.navbar-item.is-active,.navbar.is-white .navbar-end>a.navbar-item:hover,.navbar.is-white .navbar-start .navbar-link.is-active,.navbar.is-white .navbar-start .navbar-link:hover,.navbar.is-white .navbar-start>a.navbar-item.is-active,.navbar.is-white .navbar-start>a.navbar-item:hover{background-color:#f2f2f2;color:#0a0a0a}.navbar.is-white .navbar-end .navbar-link:after,.navbar.is-white .navbar-start .navbar-link:after{border-color:#0a0a0a}.navbar.is-white .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-white .navbar-item.has-dropdown:hover .navbar-link{background-color:#f2f2f2;color:#0a0a0a}.navbar.is-white .navbar-dropdown a.navbar-item.is-active{background-color:#fff;color:#0a0a0a}}.navbar.is-black{background-color:#0a0a0a;color:#fff}.navbar.is-black .navbar-brand .navbar-link,.navbar.is-black .navbar-brand>.navbar-item{color:#fff}.navbar.is-black .navbar-brand .navbar-link.is-active,.navbar.is-black .navbar-brand .navbar-link:hover,.navbar.is-black .navbar-brand>a.navbar-item.is-active,.navbar.is-black .navbar-brand>a.navbar-item:hover{background-color:#000;color:#fff}.navbar.is-black .navbar-brand .navbar-link:after{border-color:#fff}.navbar.is-black .navbar-burger{color:#fff}@media screen and (min-width:1088px){.navbar.is-black .navbar-end .navbar-link,.navbar.is-black .navbar-end>.navbar-item,.navbar.is-black .navbar-start .navbar-link,.navbar.is-black .navbar-start>.navbar-item{color:#fff}.navbar.is-black .navbar-end .navbar-link.is-active,.navbar.is-black .navbar-end .navbar-link:hover,.navbar.is-black .navbar-end>a.navbar-item.is-active,.navbar.is-black .navbar-end>a.navbar-item:hover,.navbar.is-black .navbar-start .navbar-link.is-active,.navbar.is-black .navbar-start .navbar-link:hover,.navbar.is-black .navbar-start>a.navbar-item.is-active,.navbar.is-black .navbar-start>a.navbar-item:hover{background-color:#000;color:#fff}.navbar.is-black .navbar-end .navbar-link:after,.navbar.is-black .navbar-start .navbar-link:after{border-color:#fff}.navbar.is-black .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-black .navbar-item.has-dropdown:hover .navbar-link{background-color:#000;color:#fff}.navbar.is-black .navbar-dropdown a.navbar-item.is-active{background-color:#0a0a0a;color:#fff}}.navbar.is-light{background-color:#f5f5f5;color:#363636}.navbar.is-light .navbar-brand .navbar-link,.navbar.is-light .navbar-brand>.navbar-item{color:#363636}.navbar.is-light .navbar-brand .navbar-link.is-active,.navbar.is-light .navbar-brand .navbar-link:hover,.navbar.is-light .navbar-brand>a.navbar-item.is-active,.navbar.is-light .navbar-brand>a.navbar-item:hover{background-color:#e8e8e8;color:#363636}.navbar.is-light .navbar-brand .navbar-link:after{border-color:#363636}.navbar.is-light .navbar-burger{color:#363636}@media screen and (min-width:1088px){.navbar.is-light .navbar-end .navbar-link,.navbar.is-light .navbar-end>.navbar-item,.navbar.is-light .navbar-start .navbar-link,.navbar.is-light .navbar-start>.navbar-item{color:#363636}.navbar.is-light .navbar-end .navbar-link.is-active,.navbar.is-light .navbar-end .navbar-link:hover,.navbar.is-light .navbar-end>a.navbar-item.is-active,.navbar.is-light .navbar-end>a.navbar-item:hover,.navbar.is-light .navbar-start .navbar-link.is-active,.navbar.is-light .navbar-start .navbar-link:hover,.navbar.is-light .navbar-start>a.navbar-item.is-active,.navbar.is-light .navbar-start>a.navbar-item:hover{background-color:#e8e8e8;color:#363636}.navbar.is-light .navbar-end .navbar-link:after,.navbar.is-light .navbar-start .navbar-link:after{border-color:#363636}.navbar.is-light .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-light .navbar-item.has-dropdown:hover .navbar-link{background-color:#e8e8e8;color:#363636}.navbar.is-light .navbar-dropdown a.navbar-item.is-active{background-color:#f5f5f5;color:#363636}}.navbar.is-dark{background-color:#363636;color:#f5f5f5}.navbar.is-dark .navbar-brand .navbar-link,.navbar.is-dark .navbar-brand>.navbar-item{color:#f5f5f5}.navbar.is-dark .navbar-brand .navbar-link.is-active,.navbar.is-dark .navbar-brand .navbar-link:hover,.navbar.is-dark .navbar-brand>a.navbar-item.is-active,.navbar.is-dark .navbar-brand>a.navbar-item:hover{background-color:#292929;color:#f5f5f5}.navbar.is-dark .navbar-brand .navbar-link:after{border-color:#f5f5f5}.navbar.is-dark .navbar-burger{color:#f5f5f5}@media screen and (min-width:1088px){.navbar.is-dark .navbar-end .navbar-link,.navbar.is-dark .navbar-end>.navbar-item,.navbar.is-dark .navbar-start .navbar-link,.navbar.is-dark .navbar-start>.navbar-item{color:#f5f5f5}.navbar.is-dark .navbar-end .navbar-link.is-active,.navbar.is-dark .navbar-end .navbar-link:hover,.navbar.is-dark .navbar-end>a.navbar-item.is-active,.navbar.is-dark .navbar-end>a.navbar-item:hover,.navbar.is-dark .navbar-start .navbar-link.is-active,.navbar.is-dark .navbar-start .navbar-link:hover,.navbar.is-dark .navbar-start>a.navbar-item.is-active,.navbar.is-dark .navbar-start>a.navbar-item:hover{background-color:#292929;color:#f5f5f5}.navbar.is-dark .navbar-end .navbar-link:after,.navbar.is-dark .navbar-start .navbar-link:after{border-color:#f5f5f5}.navbar.is-dark .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-dark .navbar-item.has-dropdown:hover .navbar-link{background-color:#292929;color:#f5f5f5}.navbar.is-dark .navbar-dropdown a.navbar-item.is-active{background-color:#363636;color:#f5f5f5}}.navbar.is-primary{background-color:#7957d5;color:#fff}.navbar.is-primary .navbar-brand .navbar-link,.navbar.is-primary .navbar-brand>.navbar-item{color:#fff}.navbar.is-primary .navbar-brand .navbar-link.is-active,.navbar.is-primary .navbar-brand .navbar-link:hover,.navbar.is-primary .navbar-brand>a.navbar-item.is-active,.navbar.is-primary .navbar-brand>a.navbar-item:hover{background-color:#6943d0;color:#fff}.navbar.is-primary .navbar-brand .navbar-link:after{border-color:#fff}.navbar.is-primary .navbar-burger{color:#fff}@media screen and (min-width:1088px){.navbar.is-primary .navbar-end .navbar-link,.navbar.is-primary .navbar-end>.navbar-item,.navbar.is-primary .navbar-start .navbar-link,.navbar.is-primary .navbar-start>.navbar-item{color:#fff}.navbar.is-primary .navbar-end .navbar-link.is-active,.navbar.is-primary .navbar-end .navbar-link:hover,.navbar.is-primary .navbar-end>a.navbar-item.is-active,.navbar.is-primary .navbar-end>a.navbar-item:hover,.navbar.is-primary .navbar-start .navbar-link.is-active,.navbar.is-primary .navbar-start .navbar-link:hover,.navbar.is-primary .navbar-start>a.navbar-item.is-active,.navbar.is-primary .navbar-start>a.navbar-item:hover{background-color:#6943d0;color:#fff}.navbar.is-primary .navbar-end .navbar-link:after,.navbar.is-primary .navbar-start .navbar-link:after{border-color:#fff}.navbar.is-primary .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-primary .navbar-item.has-dropdown:hover .navbar-link{background-color:#6943d0;color:#fff}.navbar.is-primary .navbar-dropdown a.navbar-item.is-active{background-color:#7957d5;color:#fff}}.navbar.is-link{background-color:#7957d5;color:#fff}.navbar.is-link .navbar-brand .navbar-link,.navbar.is-link .navbar-brand>.navbar-item{color:#fff}.navbar.is-link .navbar-brand .navbar-link.is-active,.navbar.is-link .navbar-brand .navbar-link:hover,.navbar.is-link .navbar-brand>a.navbar-item.is-active,.navbar.is-link .navbar-brand>a.navbar-item:hover{background-color:#6943d0;color:#fff}.navbar.is-link .navbar-brand .navbar-link:after{border-color:#fff}.navbar.is-link .navbar-burger{color:#fff}@media screen and (min-width:1088px){.navbar.is-link .navbar-end .navbar-link,.navbar.is-link .navbar-end>.navbar-item,.navbar.is-link .navbar-start .navbar-link,.navbar.is-link .navbar-start>.navbar-item{color:#fff}.navbar.is-link .navbar-end .navbar-link.is-active,.navbar.is-link .navbar-end .navbar-link:hover,.navbar.is-link .navbar-end>a.navbar-item.is-active,.navbar.is-link .navbar-end>a.navbar-item:hover,.navbar.is-link .navbar-start .navbar-link.is-active,.navbar.is-link .navbar-start .navbar-link:hover,.navbar.is-link .navbar-start>a.navbar-item.is-active,.navbar.is-link .navbar-start>a.navbar-item:hover{background-color:#6943d0;color:#fff}.navbar.is-link .navbar-end .navbar-link:after,.navbar.is-link .navbar-start .navbar-link:after{border-color:#fff}.navbar.is-link .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-link .navbar-item.has-dropdown:hover .navbar-link{background-color:#6943d0;color:#fff}.navbar.is-link .navbar-dropdown a.navbar-item.is-active{background-color:#7957d5;color:#fff}}.navbar.is-info{background-color:#167df0;color:#fff}.navbar.is-info .navbar-brand .navbar-link,.navbar.is-info .navbar-brand>.navbar-item{color:#fff}.navbar.is-info .navbar-brand .navbar-link.is-active,.navbar.is-info .navbar-brand .navbar-link:hover,.navbar.is-info .navbar-brand>a.navbar-item.is-active,.navbar.is-info .navbar-brand>a.navbar-item:hover{background-color:#0e71de;color:#fff}.navbar.is-info .navbar-brand .navbar-link:after{border-color:#fff}.navbar.is-info .navbar-burger{color:#fff}@media screen and (min-width:1088px){.navbar.is-info .navbar-end .navbar-link,.navbar.is-info .navbar-end>.navbar-item,.navbar.is-info .navbar-start .navbar-link,.navbar.is-info .navbar-start>.navbar-item{color:#fff}.navbar.is-info .navbar-end .navbar-link.is-active,.navbar.is-info .navbar-end .navbar-link:hover,.navbar.is-info .navbar-end>a.navbar-item.is-active,.navbar.is-info .navbar-end>a.navbar-item:hover,.navbar.is-info .navbar-start .navbar-link.is-active,.navbar.is-info .navbar-start .navbar-link:hover,.navbar.is-info .navbar-start>a.navbar-item.is-active,.navbar.is-info .navbar-start>a.navbar-item:hover{background-color:#0e71de;color:#fff}.navbar.is-info .navbar-end .navbar-link:after,.navbar.is-info .navbar-start .navbar-link:after{border-color:#fff}.navbar.is-info .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-info .navbar-item.has-dropdown:hover .navbar-link{background-color:#0e71de;color:#fff}.navbar.is-info .navbar-dropdown a.navbar-item.is-active{background-color:#167df0;color:#fff}}.navbar.is-success{background-color:#23d160;color:#fff}.navbar.is-success .navbar-brand .navbar-link,.navbar.is-success .navbar-brand>.navbar-item{color:#fff}.navbar.is-success .navbar-brand .navbar-link.is-active,.navbar.is-success .navbar-brand .navbar-link:hover,.navbar.is-success .navbar-brand>a.navbar-item.is-active,.navbar.is-success .navbar-brand>a.navbar-item:hover{background-color:#20bc56;color:#fff}.navbar.is-success .navbar-brand .navbar-link:after{border-color:#fff}.navbar.is-success .navbar-burger{color:#fff}@media screen and (min-width:1088px){.navbar.is-success .navbar-end .navbar-link,.navbar.is-success .navbar-end>.navbar-item,.navbar.is-success .navbar-start .navbar-link,.navbar.is-success .navbar-start>.navbar-item{color:#fff}.navbar.is-success .navbar-end .navbar-link.is-active,.navbar.is-success .navbar-end .navbar-link:hover,.navbar.is-success .navbar-end>a.navbar-item.is-active,.navbar.is-success .navbar-end>a.navbar-item:hover,.navbar.is-success .navbar-start .navbar-link.is-active,.navbar.is-success .navbar-start .navbar-link:hover,.navbar.is-success .navbar-start>a.navbar-item.is-active,.navbar.is-success .navbar-start>a.navbar-item:hover{background-color:#20bc56;color:#fff}.navbar.is-success .navbar-end .navbar-link:after,.navbar.is-success .navbar-start .navbar-link:after{border-color:#fff}.navbar.is-success .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-success .navbar-item.has-dropdown:hover .navbar-link{background-color:#20bc56;color:#fff}.navbar.is-success .navbar-dropdown a.navbar-item.is-active{background-color:#23d160;color:#fff}}.navbar.is-warning{background-color:#ffdd57}.navbar.is-warning,.navbar.is-warning .navbar-brand .navbar-link,.navbar.is-warning .navbar-brand>.navbar-item{color:rgba(0,0,0,.7)}.navbar.is-warning .navbar-brand .navbar-link.is-active,.navbar.is-warning .navbar-brand .navbar-link:hover,.navbar.is-warning .navbar-brand>a.navbar-item.is-active,.navbar.is-warning .navbar-brand>a.navbar-item:hover{background-color:#ffd83d;color:rgba(0,0,0,.7)}.navbar.is-warning .navbar-brand .navbar-link:after{border-color:rgba(0,0,0,.7)}.navbar.is-warning .navbar-burger{color:rgba(0,0,0,.7)}@media screen and (min-width:1088px){.navbar.is-warning .navbar-end .navbar-link,.navbar.is-warning .navbar-end>.navbar-item,.navbar.is-warning .navbar-start .navbar-link,.navbar.is-warning .navbar-start>.navbar-item{color:rgba(0,0,0,.7)}.navbar.is-warning .navbar-end .navbar-link.is-active,.navbar.is-warning .navbar-end .navbar-link:hover,.navbar.is-warning .navbar-end>a.navbar-item.is-active,.navbar.is-warning .navbar-end>a.navbar-item:hover,.navbar.is-warning .navbar-start .navbar-link.is-active,.navbar.is-warning .navbar-start .navbar-link:hover,.navbar.is-warning .navbar-start>a.navbar-item.is-active,.navbar.is-warning .navbar-start>a.navbar-item:hover{background-color:#ffd83d;color:rgba(0,0,0,.7)}.navbar.is-warning .navbar-end .navbar-link:after,.navbar.is-warning .navbar-start .navbar-link:after{border-color:rgba(0,0,0,.7)}.navbar.is-warning .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-warning .navbar-item.has-dropdown:hover .navbar-link{background-color:#ffd83d;color:rgba(0,0,0,.7)}.navbar.is-warning .navbar-dropdown a.navbar-item.is-active{background-color:#ffdd57;color:rgba(0,0,0,.7)}}.navbar.is-danger{background-color:#ff3860;color:#fff}.navbar.is-danger .navbar-brand .navbar-link,.navbar.is-danger .navbar-brand>.navbar-item{color:#fff}.navbar.is-danger .navbar-brand .navbar-link.is-active,.navbar.is-danger .navbar-brand .navbar-link:hover,.navbar.is-danger .navbar-brand>a.navbar-item.is-active,.navbar.is-danger .navbar-brand>a.navbar-item:hover{background-color:#ff1f4b;color:#fff}.navbar.is-danger .navbar-brand .navbar-link:after{border-color:#fff}.navbar.is-danger .navbar-burger{color:#fff}@media screen and (min-width:1088px){.navbar.is-danger .navbar-end .navbar-link,.navbar.is-danger .navbar-end>.navbar-item,.navbar.is-danger .navbar-start .navbar-link,.navbar.is-danger .navbar-start>.navbar-item{color:#fff}.navbar.is-danger .navbar-end .navbar-link.is-active,.navbar.is-danger .navbar-end .navbar-link:hover,.navbar.is-danger .navbar-end>a.navbar-item.is-active,.navbar.is-danger .navbar-end>a.navbar-item:hover,.navbar.is-danger .navbar-start .navbar-link.is-active,.navbar.is-danger .navbar-start .navbar-link:hover,.navbar.is-danger .navbar-start>a.navbar-item.is-active,.navbar.is-danger .navbar-start>a.navbar-item:hover{background-color:#ff1f4b;color:#fff}.navbar.is-danger .navbar-end .navbar-link:after,.navbar.is-danger .navbar-start .navbar-link:after{border-color:#fff}.navbar.is-danger .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-danger .navbar-item.has-dropdown:hover .navbar-link{background-color:#ff1f4b;color:#fff}.navbar.is-danger .navbar-dropdown a.navbar-item.is-active{background-color:#ff3860;color:#fff}}.navbar>.container{align-items:stretch;display:flex;min-height:3.25rem;width:100%}.navbar.has-shadow{box-shadow:0 2px 0 0 #f5f5f5}.navbar.is-fixed-bottom,.navbar.is-fixed-top{left:0;position:fixed;right:0;z-index:30}.navbar.is-fixed-bottom{bottom:0}.navbar.is-fixed-bottom.has-shadow{box-shadow:0 -2px 0 0 #f5f5f5}.navbar.is-fixed-top{top:0}body.has-navbar-fixed-top,html.has-navbar-fixed-top{padding-top:3.25rem}body.has-navbar-fixed-bottom,html.has-navbar-fixed-bottom{padding-bottom:3.25rem}.navbar-brand,.navbar-tabs{align-items:stretch;display:flex;flex-shrink:0;min-height:3.25rem}.navbar-brand a.navbar-item:hover{background-color:transparent}.navbar-tabs{-webkit-overflow-scrolling:touch;max-width:100vw;overflow-x:auto;overflow-y:hidden}.navbar-burger{color:#4a4a4a;cursor:pointer;display:block;height:3.25rem;position:relative;width:3.25rem;margin-left:auto}.navbar-burger span{background-color:currentColor;display:block;height:1px;left:calc(50% - 8px);position:absolute;transform-origin:center;transition-duration:86ms;transition-property:background-color,opacity,transform;transition-timing-function:ease-out;width:16px}.navbar-burger span:first-child{top:calc(50% - 6px)}.navbar-burger span:nth-child(2){top:calc(50% - 1px)}.navbar-burger span:nth-child(3){top:calc(50% + 4px)}.navbar-burger:hover{background-color:rgba(0,0,0,.05)}.navbar-burger.is-active span:first-child{transform:translateY(5px) rotate(45deg)}.navbar-burger.is-active span:nth-child(2){opacity:0}.navbar-burger.is-active span:nth-child(3){transform:translateY(-5px) rotate(-45deg)}.navbar-menu{display:none}.navbar-item,.navbar-link{color:#4a4a4a;display:block;line-height:1.5;padding:.5rem .75rem;position:relative}.navbar-item .icon:only-child,.navbar-link .icon:only-child{margin-left:-.25rem;margin-right:-.25rem}.navbar-link,a.navbar-item{cursor:pointer}.navbar-link.is-active,.navbar-link:hover,a.navbar-item.is-active,a.navbar-item:hover{background-color:#fafafa;color:#7957d5}.navbar-item{display:block;flex-grow:0;flex-shrink:0}.navbar-item img{max-height:1.75rem}.navbar-item.has-dropdown{padding:0}.navbar-item.is-expanded{flex-grow:1;flex-shrink:1}.navbar-item.is-tab{border-bottom:1px solid transparent;min-height:3.25rem;padding-bottom:calc(.5rem - 1px)}.navbar-item.is-tab.is-active,.navbar-item.is-tab:hover{background-color:transparent;border-bottom-color:#7957d5}.navbar-item.is-tab.is-active{border-bottom-style:solid;border-bottom-width:3px;color:#7957d5;padding-bottom:calc(.5rem - 3px)}.navbar-content{flex-grow:1;flex-shrink:1}.navbar-link:not(.is-arrowless){padding-right:2.5em}.navbar-link:not(.is-arrowless):after{border-color:#7957d5;margin-top:-.375em;right:1.125em}.navbar-dropdown{font-size:.875rem;padding-bottom:.5rem;padding-top:.5rem}.navbar-dropdown .navbar-item{padding-left:1.5rem;padding-right:1.5rem}.navbar-divider{background-color:#f5f5f5;border:none;display:none;height:2px;margin:.5rem 0}@media screen and (max-width:1087px){.navbar>.container{display:block}.navbar-brand .navbar-item,.navbar-tabs .navbar-item{align-items:center;display:flex}.navbar-link:after{display:none}.navbar-menu{background-color:#fff;box-shadow:0 8px 16px hsla(0,0%,4%,.1);padding:.5rem 0}.navbar-menu.is-active{display:block}.navbar.is-fixed-bottom-touch,.navbar.is-fixed-top-touch{left:0;position:fixed;right:0;z-index:30}.navbar.is-fixed-bottom-touch{bottom:0}.navbar.is-fixed-bottom-touch.has-shadow{box-shadow:0 -2px 3px hsla(0,0%,4%,.1)}.navbar.is-fixed-top-touch{top:0}.navbar.is-fixed-top-touch .navbar-menu,.navbar.is-fixed-top .navbar-menu{-webkit-overflow-scrolling:touch;max-height:calc(100vh - 3.25rem);overflow:auto}body.has-navbar-fixed-top-touch,html.has-navbar-fixed-top-touch{padding-top:3.25rem}body.has-navbar-fixed-bottom-touch,html.has-navbar-fixed-bottom-touch{padding-bottom:3.25rem}}@media screen and (min-width:1088px){.navbar,.navbar-end,.navbar-menu,.navbar-start{align-items:stretch;display:flex}.navbar{min-height:3.25rem}.navbar.is-spaced{padding:1rem 2rem}.navbar.is-spaced .navbar-end,.navbar.is-spaced .navbar-start{align-items:center}.navbar.is-spaced .navbar-link,.navbar.is-spaced a.navbar-item{border-radius:4px}.navbar.is-transparent .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-transparent .navbar-item.has-dropdown.is-hoverable:hover .navbar-link,.navbar.is-transparent .navbar-link.is-active,.navbar.is-transparent .navbar-link:hover,.navbar.is-transparent a.navbar-item.is-active,.navbar.is-transparent a.navbar-item:hover{background-color:transparent!important}.navbar.is-transparent .navbar-dropdown a.navbar-item:hover{background-color:#f5f5f5;color:#0a0a0a}.navbar.is-transparent .navbar-dropdown a.navbar-item.is-active{background-color:#f5f5f5;color:#7957d5}.navbar-burger{display:none}.navbar-item,.navbar-link{align-items:center;display:flex}.navbar-item{display:flex}.navbar-item.has-dropdown{align-items:stretch}.navbar-item.has-dropdown-up .navbar-link:after{transform:rotate(135deg) translate(.25em,-.25em)}.navbar-item.has-dropdown-up .navbar-dropdown{border-bottom:2px solid #dbdbdb;border-radius:6px 6px 0 0;border-top:none;bottom:100%;box-shadow:0 -8px 8px hsla(0,0%,4%,.1);top:auto}.navbar-item.is-active .navbar-dropdown,.navbar-item.is-hoverable:hover .navbar-dropdown{display:block}.navbar-item.is-active .navbar-dropdown.is-boxed,.navbar-item.is-hoverable:hover .navbar-dropdown.is-boxed,.navbar.is-spaced .navbar-item.is-active .navbar-dropdown,.navbar.is-spaced .navbar-item.is-hoverable:hover .navbar-dropdown{opacity:1;pointer-events:auto;transform:translateY(0)}.navbar-menu{flex-grow:1;flex-shrink:0}.navbar-start{justify-content:flex-start;margin-right:auto}.navbar-end{justify-content:flex-end;margin-left:auto}.navbar-dropdown{background-color:#fff;border-bottom-left-radius:6px;border-bottom-right-radius:6px;border-top:2px solid #dbdbdb;box-shadow:0 8px 8px hsla(0,0%,4%,.1);display:none;font-size:.875rem;left:0;min-width:100%;position:absolute;top:100%;z-index:20}.navbar-dropdown .navbar-item{padding:.375rem 1rem;white-space:nowrap}.navbar-dropdown a.navbar-item{padding-right:3rem}.navbar-dropdown a.navbar-item:hover{background-color:#f5f5f5;color:#0a0a0a}.navbar-dropdown a.navbar-item.is-active{background-color:#f5f5f5;color:#7957d5}.navbar-dropdown.is-boxed,.navbar.is-spaced .navbar-dropdown{border-radius:6px;border-top:none;box-shadow:0 8px 8px hsla(0,0%,4%,.1),0 0 0 1px hsla(0,0%,4%,.1);display:block;opacity:0;pointer-events:none;top:calc(100% + -4px);transform:translateY(-5px);transition-duration:86ms;transition-property:opacity,transform}.navbar-dropdown.is-right{left:auto;right:0}.navbar-divider{display:block}.container>.navbar .navbar-brand,.navbar>.container .navbar-brand{margin-left:-.75rem}.container>.navbar .navbar-menu,.navbar>.container .navbar-menu{margin-right:-.75rem}.navbar.is-fixed-bottom-desktop,.navbar.is-fixed-top-desktop{left:0;position:fixed;right:0;z-index:30}.navbar.is-fixed-bottom-desktop{bottom:0}.navbar.is-fixed-bottom-desktop.has-shadow{box-shadow:0 -2px 3px hsla(0,0%,4%,.1)}.navbar.is-fixed-top-desktop{top:0}body.has-navbar-fixed-top-desktop,html.has-navbar-fixed-top-desktop{padding-top:3.25rem}body.has-navbar-fixed-bottom-desktop,html.has-navbar-fixed-bottom-desktop{padding-bottom:3.25rem}body.has-spaced-navbar-fixed-top,html.has-spaced-navbar-fixed-top{padding-top:5.25rem}body.has-spaced-navbar-fixed-bottom,html.has-spaced-navbar-fixed-bottom{padding-bottom:5.25rem}.navbar-link.is-active,a.navbar-item.is-active{color:#0a0a0a}.navbar-link.is-active:not(:hover),a.navbar-item.is-active:not(:hover){background-color:transparent}.navbar-item.has-dropdown.is-active .navbar-link,.navbar-item.has-dropdown:hover .navbar-link{background-color:#fafafa}}.pagination{font-size:1rem;margin:-.25rem}.pagination.is-small{font-size:.75rem}.pagination.is-medium{font-size:1.25rem}.pagination.is-large{font-size:1.5rem}.pagination.is-rounded .pagination-next,.pagination.is-rounded .pagination-previous{padding-left:1em;padding-right:1em;border-radius:290486px}.pagination.is-rounded .pagination-link{border-radius:290486px}.pagination,.pagination-list{align-items:center;display:flex;justify-content:center;text-align:center}.pagination-ellipsis,.pagination-link,.pagination-next,.pagination-previous{font-size:1em;padding-left:.5em;padding-right:.5em;justify-content:center;margin:.25rem;text-align:center}.pagination-link,.pagination-next,.pagination-previous{border-color:#dbdbdb;color:#363636;min-width:2.25em}.pagination-link:hover,.pagination-next:hover,.pagination-previous:hover{border-color:#b5b5b5;color:#363636}.pagination-link:focus,.pagination-next:focus,.pagination-previous:focus{border-color:#7957d5}.pagination-link:active,.pagination-next:active,.pagination-previous:active{box-shadow:inset 0 1px 2px hsla(0,0%,4%,.2)}.pagination-link[disabled],.pagination-next[disabled],.pagination-previous[disabled]{background-color:#dbdbdb;border-color:#dbdbdb;box-shadow:none;color:#7a7a7a;opacity:.5}.pagination-next,.pagination-previous{padding-left:.75em;padding-right:.75em;white-space:nowrap}.pagination-link.is-current{background-color:#7957d5;border-color:#7957d5;color:#fff}.pagination-ellipsis{color:#b5b5b5;pointer-events:none}.pagination-list{flex-wrap:wrap}@media screen and (max-width:768px){.pagination{flex-wrap:wrap}.pagination-list li,.pagination-next,.pagination-previous{flex-grow:1;flex-shrink:1}}@media print,screen and (min-width:769px){.pagination-list{flex-grow:1;flex-shrink:1;justify-content:flex-start;order:1}.pagination-previous{order:2}.pagination-next{order:3}.pagination{justify-content:space-between}.pagination.is-centered .pagination-previous{order:1}.pagination.is-centered .pagination-list{justify-content:center;order:2}.pagination.is-centered .pagination-next{order:3}.pagination.is-right .pagination-previous{order:1}.pagination.is-right .pagination-next{order:2}.pagination.is-right .pagination-list{justify-content:flex-end;order:3}}.panel{font-size:1rem}.panel:not(:last-child){margin-bottom:1.5rem}.panel-block,.panel-heading,.panel-tabs{border-bottom:1px solid #dbdbdb;border-left:1px solid #dbdbdb;border-right:1px solid #dbdbdb}.panel-block:first-child,.panel-heading:first-child,.panel-tabs:first-child{border-top:1px solid #dbdbdb}.panel-heading{background-color:#f5f5f5;border-radius:4px 4px 0 0;color:#363636;font-size:1.25em;font-weight:300;line-height:1.25;padding:.5em .75em}.panel-tabs{align-items:flex-end;display:flex;font-size:.875em;justify-content:center}.panel-tabs a{border-bottom:1px solid #dbdbdb;margin-bottom:-1px;padding:.5em}.panel-tabs a.is-active{border-bottom-color:#4a4a4a;color:#363636}.panel-list a{color:#4a4a4a}.panel-list a:hover{color:#7957d5}.panel-block{align-items:center;color:#363636;display:flex;justify-content:flex-start;padding:.5em .75em}.panel-block input[type=checkbox]{margin-right:.75em}.panel-block>.control{flex-grow:1;flex-shrink:1;width:100%}.panel-block.is-wrapped{flex-wrap:wrap}.panel-block.is-active{border-left-color:#7957d5;color:#363636}.panel-block.is-active .panel-icon{color:#7957d5}a.panel-block,label.panel-block{cursor:pointer}a.panel-block:hover,label.panel-block:hover{background-color:#f5f5f5}.panel-icon{display:inline-block;font-size:14px;height:1em;line-height:1em;text-align:center;vertical-align:top;width:1em;color:#7a7a7a;margin-right:.75em}.panel-icon .fa{font-size:inherit;line-height:inherit}.tabs{-webkit-overflow-scrolling:touch;align-items:stretch;display:flex;font-size:1rem;justify-content:space-between;overflow:hidden;overflow-x:auto;white-space:nowrap}.tabs a{align-items:center;border-bottom-color:#dbdbdb;border-bottom-style:solid;border-bottom-width:1px;color:#4a4a4a;display:flex;justify-content:center;margin-bottom:-1px;padding:.5em 1em;vertical-align:top}.tabs a:hover{border-bottom-color:#363636;color:#363636}.tabs li{display:block}.tabs li.is-active a{border-bottom-color:#7957d5;color:#7957d5}.tabs ul{align-items:center;border-bottom-color:#dbdbdb;border-bottom-style:solid;border-bottom-width:1px;display:flex;flex-grow:1;flex-shrink:0;justify-content:flex-start}.tabs ul.is-center,.tabs ul.is-left{padding-right:.75em}.tabs ul.is-center{flex:none;justify-content:center;padding-left:.75em}.tabs ul.is-right{justify-content:flex-end;padding-left:.75em}.tabs .icon:first-child{margin-right:.5em}.tabs .icon:last-child{margin-left:.5em}.tabs.is-centered ul{justify-content:center}.tabs.is-right ul{justify-content:flex-end}.tabs.is-boxed a{border:1px solid transparent;border-radius:4px 4px 0 0}.tabs.is-boxed a:hover{background-color:#f5f5f5;border-bottom-color:#dbdbdb}.tabs.is-boxed li.is-active a{background-color:#fff;border-color:#dbdbdb;border-bottom-color:transparent!important}.tabs.is-fullwidth li{flex-grow:1;flex-shrink:0}.tabs.is-toggle a{border:1px solid #dbdbdb;margin-bottom:0;position:relative}.tabs.is-toggle a:hover{background-color:#f5f5f5;border-color:#b5b5b5;z-index:2}.tabs.is-toggle li+li{margin-left:-1px}.tabs.is-toggle li:first-child a{border-radius:4px 0 0 4px}.tabs.is-toggle li:last-child a{border-radius:0 4px 4px 0}.tabs.is-toggle li.is-active a{background-color:#7957d5;border-color:#7957d5;color:#fff;z-index:1}.tabs.is-toggle ul{border-bottom:none}.tabs.is-toggle.is-toggle-rounded li:first-child a{border-bottom-left-radius:290486px;border-top-left-radius:290486px;padding-left:1.25em}.tabs.is-toggle.is-toggle-rounded li:last-child a{border-bottom-right-radius:290486px;border-top-right-radius:290486px;padding-right:1.25em}.tabs.is-small{font-size:.75rem}.tabs.is-medium{font-size:1.25rem}.tabs.is-large{font-size:1.5rem}.column{display:block;flex-basis:0;flex-grow:1;flex-shrink:1;padding:.75rem}.columns.is-mobile>.column.is-narrow{flex:none}.columns.is-mobile>.column.is-full{flex:none;width:100%}.columns.is-mobile>.column.is-three-quarters{flex:none;width:75%}.columns.is-mobile>.column.is-two-thirds{flex:none;width:66.6666%}.columns.is-mobile>.column.is-half{flex:none;width:50%}.columns.is-mobile>.column.is-one-third{flex:none;width:33.3333%}.columns.is-mobile>.column.is-one-quarter{flex:none;width:25%}.columns.is-mobile>.column.is-one-fifth{flex:none;width:20%}.columns.is-mobile>.column.is-two-fifths{flex:none;width:40%}.columns.is-mobile>.column.is-three-fifths{flex:none;width:60%}.columns.is-mobile>.column.is-four-fifths{flex:none;width:80%}.columns.is-mobile>.column.is-offset-three-quarters{margin-left:75%}.columns.is-mobile>.column.is-offset-two-thirds{margin-left:66.6666%}.columns.is-mobile>.column.is-offset-half{margin-left:50%}.columns.is-mobile>.column.is-offset-one-third{margin-left:33.3333%}.columns.is-mobile>.column.is-offset-one-quarter{margin-left:25%}.columns.is-mobile>.column.is-offset-one-fifth{margin-left:20%}.columns.is-mobile>.column.is-offset-two-fifths{margin-left:40%}.columns.is-mobile>.column.is-offset-three-fifths{margin-left:60%}.columns.is-mobile>.column.is-offset-four-fifths{margin-left:80%}.columns.is-mobile>.column.is-1{flex:none;width:8.33333%}.columns.is-mobile>.column.is-offset-1{margin-left:8.33333%}.columns.is-mobile>.column.is-2{flex:none;width:16.66667%}.columns.is-mobile>.column.is-offset-2{margin-left:16.66667%}.columns.is-mobile>.column.is-3{flex:none;width:25%}.columns.is-mobile>.column.is-offset-3{margin-left:25%}.columns.is-mobile>.column.is-4{flex:none;width:33.33333%}.columns.is-mobile>.column.is-offset-4{margin-left:33.33333%}.columns.is-mobile>.column.is-5{flex:none;width:41.66667%}.columns.is-mobile>.column.is-offset-5{margin-left:41.66667%}.columns.is-mobile>.column.is-6{flex:none;width:50%}.columns.is-mobile>.column.is-offset-6{margin-left:50%}.columns.is-mobile>.column.is-7{flex:none;width:58.33333%}.columns.is-mobile>.column.is-offset-7{margin-left:58.33333%}.columns.is-mobile>.column.is-8{flex:none;width:66.66667%}.columns.is-mobile>.column.is-offset-8{margin-left:66.66667%}.columns.is-mobile>.column.is-9{flex:none;width:75%}.columns.is-mobile>.column.is-offset-9{margin-left:75%}.columns.is-mobile>.column.is-10{flex:none;width:83.33333%}.columns.is-mobile>.column.is-offset-10{margin-left:83.33333%}.columns.is-mobile>.column.is-11{flex:none;width:91.66667%}.columns.is-mobile>.column.is-offset-11{margin-left:91.66667%}.columns.is-mobile>.column.is-12{flex:none;width:100%}.columns.is-mobile>.column.is-offset-12{margin-left:100%}@media screen and (max-width:768px){.column.is-narrow-mobile{flex:none}.column.is-full-mobile{flex:none;width:100%}.column.is-three-quarters-mobile{flex:none;width:75%}.column.is-two-thirds-mobile{flex:none;width:66.6666%}.column.is-half-mobile{flex:none;width:50%}.column.is-one-third-mobile{flex:none;width:33.3333%}.column.is-one-quarter-mobile{flex:none;width:25%}.column.is-one-fifth-mobile{flex:none;width:20%}.column.is-two-fifths-mobile{flex:none;width:40%}.column.is-three-fifths-mobile{flex:none;width:60%}.column.is-four-fifths-mobile{flex:none;width:80%}.column.is-offset-three-quarters-mobile{margin-left:75%}.column.is-offset-two-thirds-mobile{margin-left:66.6666%}.column.is-offset-half-mobile{margin-left:50%}.column.is-offset-one-third-mobile{margin-left:33.3333%}.column.is-offset-one-quarter-mobile{margin-left:25%}.column.is-offset-one-fifth-mobile{margin-left:20%}.column.is-offset-two-fifths-mobile{margin-left:40%}.column.is-offset-three-fifths-mobile{margin-left:60%}.column.is-offset-four-fifths-mobile{margin-left:80%}.column.is-1-mobile{flex:none;width:8.33333%}.column.is-offset-1-mobile{margin-left:8.33333%}.column.is-2-mobile{flex:none;width:16.66667%}.column.is-offset-2-mobile{margin-left:16.66667%}.column.is-3-mobile{flex:none;width:25%}.column.is-offset-3-mobile{margin-left:25%}.column.is-4-mobile{flex:none;width:33.33333%}.column.is-offset-4-mobile{margin-left:33.33333%}.column.is-5-mobile{flex:none;width:41.66667%}.column.is-offset-5-mobile{margin-left:41.66667%}.column.is-6-mobile{flex:none;width:50%}.column.is-offset-6-mobile{margin-left:50%}.column.is-7-mobile{flex:none;width:58.33333%}.column.is-offset-7-mobile{margin-left:58.33333%}.column.is-8-mobile{flex:none;width:66.66667%}.column.is-offset-8-mobile{margin-left:66.66667%}.column.is-9-mobile{flex:none;width:75%}.column.is-offset-9-mobile{margin-left:75%}.column.is-10-mobile{flex:none;width:83.33333%}.column.is-offset-10-mobile{margin-left:83.33333%}.column.is-11-mobile{flex:none;width:91.66667%}.column.is-offset-11-mobile{margin-left:91.66667%}.column.is-12-mobile{flex:none;width:100%}.column.is-offset-12-mobile{margin-left:100%}}@media print,screen and (min-width:769px){.column.is-narrow,.column.is-narrow-tablet{flex:none}.column.is-full,.column.is-full-tablet{flex:none;width:100%}.column.is-three-quarters,.column.is-three-quarters-tablet{flex:none;width:75%}.column.is-two-thirds,.column.is-two-thirds-tablet{flex:none;width:66.6666%}.column.is-half,.column.is-half-tablet{flex:none;width:50%}.column.is-one-third,.column.is-one-third-tablet{flex:none;width:33.3333%}.column.is-one-quarter,.column.is-one-quarter-tablet{flex:none;width:25%}.column.is-one-fifth,.column.is-one-fifth-tablet{flex:none;width:20%}.column.is-two-fifths,.column.is-two-fifths-tablet{flex:none;width:40%}.column.is-three-fifths,.column.is-three-fifths-tablet{flex:none;width:60%}.column.is-four-fifths,.column.is-four-fifths-tablet{flex:none;width:80%}.column.is-offset-three-quarters,.column.is-offset-three-quarters-tablet{margin-left:75%}.column.is-offset-two-thirds,.column.is-offset-two-thirds-tablet{margin-left:66.6666%}.column.is-offset-half,.column.is-offset-half-tablet{margin-left:50%}.column.is-offset-one-third,.column.is-offset-one-third-tablet{margin-left:33.3333%}.column.is-offset-one-quarter,.column.is-offset-one-quarter-tablet{margin-left:25%}.column.is-offset-one-fifth,.column.is-offset-one-fifth-tablet{margin-left:20%}.column.is-offset-two-fifths,.column.is-offset-two-fifths-tablet{margin-left:40%}.column.is-offset-three-fifths,.column.is-offset-three-fifths-tablet{margin-left:60%}.column.is-offset-four-fifths,.column.is-offset-four-fifths-tablet{margin-left:80%}.column.is-1,.column.is-1-tablet{flex:none;width:8.33333%}.column.is-offset-1,.column.is-offset-1-tablet{margin-left:8.33333%}.column.is-2,.column.is-2-tablet{flex:none;width:16.66667%}.column.is-offset-2,.column.is-offset-2-tablet{margin-left:16.66667%}.column.is-3,.column.is-3-tablet{flex:none;width:25%}.column.is-offset-3,.column.is-offset-3-tablet{margin-left:25%}.column.is-4,.column.is-4-tablet{flex:none;width:33.33333%}.column.is-offset-4,.column.is-offset-4-tablet{margin-left:33.33333%}.column.is-5,.column.is-5-tablet{flex:none;width:41.66667%}.column.is-offset-5,.column.is-offset-5-tablet{margin-left:41.66667%}.column.is-6,.column.is-6-tablet{flex:none;width:50%}.column.is-offset-6,.column.is-offset-6-tablet{margin-left:50%}.column.is-7,.column.is-7-tablet{flex:none;width:58.33333%}.column.is-offset-7,.column.is-offset-7-tablet{margin-left:58.33333%}.column.is-8,.column.is-8-tablet{flex:none;width:66.66667%}.column.is-offset-8,.column.is-offset-8-tablet{margin-left:66.66667%}.column.is-9,.column.is-9-tablet{flex:none;width:75%}.column.is-offset-9,.column.is-offset-9-tablet{margin-left:75%}.column.is-10,.column.is-10-tablet{flex:none;width:83.33333%}.column.is-offset-10,.column.is-offset-10-tablet{margin-left:83.33333%}.column.is-11,.column.is-11-tablet{flex:none;width:91.66667%}.column.is-offset-11,.column.is-offset-11-tablet{margin-left:91.66667%}.column.is-12,.column.is-12-tablet{flex:none;width:100%}.column.is-offset-12,.column.is-offset-12-tablet{margin-left:100%}}@media screen and (max-width:1087px){.column.is-narrow-touch{flex:none}.column.is-full-touch{flex:none;width:100%}.column.is-three-quarters-touch{flex:none;width:75%}.column.is-two-thirds-touch{flex:none;width:66.6666%}.column.is-half-touch{flex:none;width:50%}.column.is-one-third-touch{flex:none;width:33.3333%}.column.is-one-quarter-touch{flex:none;width:25%}.column.is-one-fifth-touch{flex:none;width:20%}.column.is-two-fifths-touch{flex:none;width:40%}.column.is-three-fifths-touch{flex:none;width:60%}.column.is-four-fifths-touch{flex:none;width:80%}.column.is-offset-three-quarters-touch{margin-left:75%}.column.is-offset-two-thirds-touch{margin-left:66.6666%}.column.is-offset-half-touch{margin-left:50%}.column.is-offset-one-third-touch{margin-left:33.3333%}.column.is-offset-one-quarter-touch{margin-left:25%}.column.is-offset-one-fifth-touch{margin-left:20%}.column.is-offset-two-fifths-touch{margin-left:40%}.column.is-offset-three-fifths-touch{margin-left:60%}.column.is-offset-four-fifths-touch{margin-left:80%}.column.is-1-touch{flex:none;width:8.33333%}.column.is-offset-1-touch{margin-left:8.33333%}.column.is-2-touch{flex:none;width:16.66667%}.column.is-offset-2-touch{margin-left:16.66667%}.column.is-3-touch{flex:none;width:25%}.column.is-offset-3-touch{margin-left:25%}.column.is-4-touch{flex:none;width:33.33333%}.column.is-offset-4-touch{margin-left:33.33333%}.column.is-5-touch{flex:none;width:41.66667%}.column.is-offset-5-touch{margin-left:41.66667%}.column.is-6-touch{flex:none;width:50%}.column.is-offset-6-touch{margin-left:50%}.column.is-7-touch{flex:none;width:58.33333%}.column.is-offset-7-touch{margin-left:58.33333%}.column.is-8-touch{flex:none;width:66.66667%}.column.is-offset-8-touch{margin-left:66.66667%}.column.is-9-touch{flex:none;width:75%}.column.is-offset-9-touch{margin-left:75%}.column.is-10-touch{flex:none;width:83.33333%}.column.is-offset-10-touch{margin-left:83.33333%}.column.is-11-touch{flex:none;width:91.66667%}.column.is-offset-11-touch{margin-left:91.66667%}.column.is-12-touch{flex:none;width:100%}.column.is-offset-12-touch{margin-left:100%}}@media screen and (min-width:1088px){.column.is-narrow-desktop{flex:none}.column.is-full-desktop{flex:none;width:100%}.column.is-three-quarters-desktop{flex:none;width:75%}.column.is-two-thirds-desktop{flex:none;width:66.6666%}.column.is-half-desktop{flex:none;width:50%}.column.is-one-third-desktop{flex:none;width:33.3333%}.column.is-one-quarter-desktop{flex:none;width:25%}.column.is-one-fifth-desktop{flex:none;width:20%}.column.is-two-fifths-desktop{flex:none;width:40%}.column.is-three-fifths-desktop{flex:none;width:60%}.column.is-four-fifths-desktop{flex:none;width:80%}.column.is-offset-three-quarters-desktop{margin-left:75%}.column.is-offset-two-thirds-desktop{margin-left:66.6666%}.column.is-offset-half-desktop{margin-left:50%}.column.is-offset-one-third-desktop{margin-left:33.3333%}.column.is-offset-one-quarter-desktop{margin-left:25%}.column.is-offset-one-fifth-desktop{margin-left:20%}.column.is-offset-two-fifths-desktop{margin-left:40%}.column.is-offset-three-fifths-desktop{margin-left:60%}.column.is-offset-four-fifths-desktop{margin-left:80%}.column.is-1-desktop{flex:none;width:8.33333%}.column.is-offset-1-desktop{margin-left:8.33333%}.column.is-2-desktop{flex:none;width:16.66667%}.column.is-offset-2-desktop{margin-left:16.66667%}.column.is-3-desktop{flex:none;width:25%}.column.is-offset-3-desktop{margin-left:25%}.column.is-4-desktop{flex:none;width:33.33333%}.column.is-offset-4-desktop{margin-left:33.33333%}.column.is-5-desktop{flex:none;width:41.66667%}.column.is-offset-5-desktop{margin-left:41.66667%}.column.is-6-desktop{flex:none;width:50%}.column.is-offset-6-desktop{margin-left:50%}.column.is-7-desktop{flex:none;width:58.33333%}.column.is-offset-7-desktop{margin-left:58.33333%}.column.is-8-desktop{flex:none;width:66.66667%}.column.is-offset-8-desktop{margin-left:66.66667%}.column.is-9-desktop{flex:none;width:75%}.column.is-offset-9-desktop{margin-left:75%}.column.is-10-desktop{flex:none;width:83.33333%}.column.is-offset-10-desktop{margin-left:83.33333%}.column.is-11-desktop{flex:none;width:91.66667%}.column.is-offset-11-desktop{margin-left:91.66667%}.column.is-12-desktop{flex:none;width:100%}.column.is-offset-12-desktop{margin-left:100%}}@media screen and (min-width:1280px){.column.is-narrow-widescreen{flex:none}.column.is-full-widescreen{flex:none;width:100%}.column.is-three-quarters-widescreen{flex:none;width:75%}.column.is-two-thirds-widescreen{flex:none;width:66.6666%}.column.is-half-widescreen{flex:none;width:50%}.column.is-one-third-widescreen{flex:none;width:33.3333%}.column.is-one-quarter-widescreen{flex:none;width:25%}.column.is-one-fifth-widescreen{flex:none;width:20%}.column.is-two-fifths-widescreen{flex:none;width:40%}.column.is-three-fifths-widescreen{flex:none;width:60%}.column.is-four-fifths-widescreen{flex:none;width:80%}.column.is-offset-three-quarters-widescreen{margin-left:75%}.column.is-offset-two-thirds-widescreen{margin-left:66.6666%}.column.is-offset-half-widescreen{margin-left:50%}.column.is-offset-one-third-widescreen{margin-left:33.3333%}.column.is-offset-one-quarter-widescreen{margin-left:25%}.column.is-offset-one-fifth-widescreen{margin-left:20%}.column.is-offset-two-fifths-widescreen{margin-left:40%}.column.is-offset-three-fifths-widescreen{margin-left:60%}.column.is-offset-four-fifths-widescreen{margin-left:80%}.column.is-1-widescreen{flex:none;width:8.33333%}.column.is-offset-1-widescreen{margin-left:8.33333%}.column.is-2-widescreen{flex:none;width:16.66667%}.column.is-offset-2-widescreen{margin-left:16.66667%}.column.is-3-widescreen{flex:none;width:25%}.column.is-offset-3-widescreen{margin-left:25%}.column.is-4-widescreen{flex:none;width:33.33333%}.column.is-offset-4-widescreen{margin-left:33.33333%}.column.is-5-widescreen{flex:none;width:41.66667%}.column.is-offset-5-widescreen{margin-left:41.66667%}.column.is-6-widescreen{flex:none;width:50%}.column.is-offset-6-widescreen{margin-left:50%}.column.is-7-widescreen{flex:none;width:58.33333%}.column.is-offset-7-widescreen{margin-left:58.33333%}.column.is-8-widescreen{flex:none;width:66.66667%}.column.is-offset-8-widescreen{margin-left:66.66667%}.column.is-9-widescreen{flex:none;width:75%}.column.is-offset-9-widescreen{margin-left:75%}.column.is-10-widescreen{flex:none;width:83.33333%}.column.is-offset-10-widescreen{margin-left:83.33333%}.column.is-11-widescreen{flex:none;width:91.66667%}.column.is-offset-11-widescreen{margin-left:91.66667%}.column.is-12-widescreen{flex:none;width:100%}.column.is-offset-12-widescreen{margin-left:100%}}@media screen and (min-width:1472px){.column.is-narrow-fullhd{flex:none}.column.is-full-fullhd{flex:none;width:100%}.column.is-three-quarters-fullhd{flex:none;width:75%}.column.is-two-thirds-fullhd{flex:none;width:66.6666%}.column.is-half-fullhd{flex:none;width:50%}.column.is-one-third-fullhd{flex:none;width:33.3333%}.column.is-one-quarter-fullhd{flex:none;width:25%}.column.is-one-fifth-fullhd{flex:none;width:20%}.column.is-two-fifths-fullhd{flex:none;width:40%}.column.is-three-fifths-fullhd{flex:none;width:60%}.column.is-four-fifths-fullhd{flex:none;width:80%}.column.is-offset-three-quarters-fullhd{margin-left:75%}.column.is-offset-two-thirds-fullhd{margin-left:66.6666%}.column.is-offset-half-fullhd{margin-left:50%}.column.is-offset-one-third-fullhd{margin-left:33.3333%}.column.is-offset-one-quarter-fullhd{margin-left:25%}.column.is-offset-one-fifth-fullhd{margin-left:20%}.column.is-offset-two-fifths-fullhd{margin-left:40%}.column.is-offset-three-fifths-fullhd{margin-left:60%}.column.is-offset-four-fifths-fullhd{margin-left:80%}.column.is-1-fullhd{flex:none;width:8.33333%}.column.is-offset-1-fullhd{margin-left:8.33333%}.column.is-2-fullhd{flex:none;width:16.66667%}.column.is-offset-2-fullhd{margin-left:16.66667%}.column.is-3-fullhd{flex:none;width:25%}.column.is-offset-3-fullhd{margin-left:25%}.column.is-4-fullhd{flex:none;width:33.33333%}.column.is-offset-4-fullhd{margin-left:33.33333%}.column.is-5-fullhd{flex:none;width:41.66667%}.column.is-offset-5-fullhd{margin-left:41.66667%}.column.is-6-fullhd{flex:none;width:50%}.column.is-offset-6-fullhd{margin-left:50%}.column.is-7-fullhd{flex:none;width:58.33333%}.column.is-offset-7-fullhd{margin-left:58.33333%}.column.is-8-fullhd{flex:none;width:66.66667%}.column.is-offset-8-fullhd{margin-left:66.66667%}.column.is-9-fullhd{flex:none;width:75%}.column.is-offset-9-fullhd{margin-left:75%}.column.is-10-fullhd{flex:none;width:83.33333%}.column.is-offset-10-fullhd{margin-left:83.33333%}.column.is-11-fullhd{flex:none;width:91.66667%}.column.is-offset-11-fullhd{margin-left:91.66667%}.column.is-12-fullhd{flex:none;width:100%}.column.is-offset-12-fullhd{margin-left:100%}}.columns{margin-left:-.75rem;margin-right:-.75rem;margin-top:-.75rem}.columns:last-child{margin-bottom:-.75rem}.columns:not(:last-child){margin-bottom:.75rem}.columns.is-centered{justify-content:center}.columns.is-gapless{margin-left:0;margin-right:0;margin-top:0}.columns.is-gapless>.column{margin:0;padding:0!important}.columns.is-gapless:not(:last-child){margin-bottom:1.5rem}.columns.is-gapless:last-child{margin-bottom:0}.columns.is-mobile{display:flex}.columns.is-multiline{flex-wrap:wrap}.columns.is-vcentered{align-items:center}@media print,screen and (min-width:769px){.columns:not(.is-desktop){display:flex}}@media screen and (min-width:1088px){.columns.is-desktop{display:flex}}.columns.is-variable{--columnGap:0.75rem;margin-left:calc(-1 * var(--columnGap));margin-right:calc(-1 * var(--columnGap))}.columns.is-variable .column{padding-left:var(--columnGap);padding-right:var(--columnGap)}.columns.is-variable.is-0{--columnGap:0rem}@media screen and (max-width:768px){.columns.is-variable.is-0-mobile{--columnGap:0rem}}@media print,screen and (min-width:769px){.columns.is-variable.is-0-tablet{--columnGap:0rem}}@media screen and (min-width:769px) and (max-width:1087px){.columns.is-variable.is-0-tablet-only{--columnGap:0rem}}@media screen and (max-width:1087px){.columns.is-variable.is-0-touch{--columnGap:0rem}}@media screen and (min-width:1088px){.columns.is-variable.is-0-desktop{--columnGap:0rem}}@media screen and (min-width:1088px) and (max-width:1279px){.columns.is-variable.is-0-desktop-only{--columnGap:0rem}}@media screen and (min-width:1280px){.columns.is-variable.is-0-widescreen{--columnGap:0rem}}@media screen and (min-width:1280px) and (max-width:1471px){.columns.is-variable.is-0-widescreen-only{--columnGap:0rem}}@media screen and (min-width:1472px){.columns.is-variable.is-0-fullhd{--columnGap:0rem}}.columns.is-variable.is-1{--columnGap:0.25rem}@media screen and (max-width:768px){.columns.is-variable.is-1-mobile{--columnGap:0.25rem}}@media print,screen and (min-width:769px){.columns.is-variable.is-1-tablet{--columnGap:0.25rem}}@media screen and (min-width:769px) and (max-width:1087px){.columns.is-variable.is-1-tablet-only{--columnGap:0.25rem}}@media screen and (max-width:1087px){.columns.is-variable.is-1-touch{--columnGap:0.25rem}}@media screen and (min-width:1088px){.columns.is-variable.is-1-desktop{--columnGap:0.25rem}}@media screen and (min-width:1088px) and (max-width:1279px){.columns.is-variable.is-1-desktop-only{--columnGap:0.25rem}}@media screen and (min-width:1280px){.columns.is-variable.is-1-widescreen{--columnGap:0.25rem}}@media screen and (min-width:1280px) and (max-width:1471px){.columns.is-variable.is-1-widescreen-only{--columnGap:0.25rem}}@media screen and (min-width:1472px){.columns.is-variable.is-1-fullhd{--columnGap:0.25rem}}.columns.is-variable.is-2{--columnGap:0.5rem}@media screen and (max-width:768px){.columns.is-variable.is-2-mobile{--columnGap:0.5rem}}@media print,screen and (min-width:769px){.columns.is-variable.is-2-tablet{--columnGap:0.5rem}}@media screen and (min-width:769px) and (max-width:1087px){.columns.is-variable.is-2-tablet-only{--columnGap:0.5rem}}@media screen and (max-width:1087px){.columns.is-variable.is-2-touch{--columnGap:0.5rem}}@media screen and (min-width:1088px){.columns.is-variable.is-2-desktop{--columnGap:0.5rem}}@media screen and (min-width:1088px) and (max-width:1279px){.columns.is-variable.is-2-desktop-only{--columnGap:0.5rem}}@media screen and (min-width:1280px){.columns.is-variable.is-2-widescreen{--columnGap:0.5rem}}@media screen and (min-width:1280px) and (max-width:1471px){.columns.is-variable.is-2-widescreen-only{--columnGap:0.5rem}}@media screen and (min-width:1472px){.columns.is-variable.is-2-fullhd{--columnGap:0.5rem}}.columns.is-variable.is-3{--columnGap:0.75rem}@media screen and (max-width:768px){.columns.is-variable.is-3-mobile{--columnGap:0.75rem}}@media print,screen and (min-width:769px){.columns.is-variable.is-3-tablet{--columnGap:0.75rem}}@media screen and (min-width:769px) and (max-width:1087px){.columns.is-variable.is-3-tablet-only{--columnGap:0.75rem}}@media screen and (max-width:1087px){.columns.is-variable.is-3-touch{--columnGap:0.75rem}}@media screen and (min-width:1088px){.columns.is-variable.is-3-desktop{--columnGap:0.75rem}}@media screen and (min-width:1088px) and (max-width:1279px){.columns.is-variable.is-3-desktop-only{--columnGap:0.75rem}}@media screen and (min-width:1280px){.columns.is-variable.is-3-widescreen{--columnGap:0.75rem}}@media screen and (min-width:1280px) and (max-width:1471px){.columns.is-variable.is-3-widescreen-only{--columnGap:0.75rem}}@media screen and (min-width:1472px){.columns.is-variable.is-3-fullhd{--columnGap:0.75rem}}.columns.is-variable.is-4{--columnGap:1rem}@media screen and (max-width:768px){.columns.is-variable.is-4-mobile{--columnGap:1rem}}@media print,screen and (min-width:769px){.columns.is-variable.is-4-tablet{--columnGap:1rem}}@media screen and (min-width:769px) and (max-width:1087px){.columns.is-variable.is-4-tablet-only{--columnGap:1rem}}@media screen and (max-width:1087px){.columns.is-variable.is-4-touch{--columnGap:1rem}}@media screen and (min-width:1088px){.columns.is-variable.is-4-desktop{--columnGap:1rem}}@media screen and (min-width:1088px) and (max-width:1279px){.columns.is-variable.is-4-desktop-only{--columnGap:1rem}}@media screen and (min-width:1280px){.columns.is-variable.is-4-widescreen{--columnGap:1rem}}@media screen and (min-width:1280px) and (max-width:1471px){.columns.is-variable.is-4-widescreen-only{--columnGap:1rem}}@media screen and (min-width:1472px){.columns.is-variable.is-4-fullhd{--columnGap:1rem}}.columns.is-variable.is-5{--columnGap:1.25rem}@media screen and (max-width:768px){.columns.is-variable.is-5-mobile{--columnGap:1.25rem}}@media print,screen and (min-width:769px){.columns.is-variable.is-5-tablet{--columnGap:1.25rem}}@media screen and (min-width:769px) and (max-width:1087px){.columns.is-variable.is-5-tablet-only{--columnGap:1.25rem}}@media screen and (max-width:1087px){.columns.is-variable.is-5-touch{--columnGap:1.25rem}}@media screen and (min-width:1088px){.columns.is-variable.is-5-desktop{--columnGap:1.25rem}}@media screen and (min-width:1088px) and (max-width:1279px){.columns.is-variable.is-5-desktop-only{--columnGap:1.25rem}}@media screen and (min-width:1280px){.columns.is-variable.is-5-widescreen{--columnGap:1.25rem}}@media screen and (min-width:1280px) and (max-width:1471px){.columns.is-variable.is-5-widescreen-only{--columnGap:1.25rem}}@media screen and (min-width:1472px){.columns.is-variable.is-5-fullhd{--columnGap:1.25rem}}.columns.is-variable.is-6{--columnGap:1.5rem}@media screen and (max-width:768px){.columns.is-variable.is-6-mobile{--columnGap:1.5rem}}@media print,screen and (min-width:769px){.columns.is-variable.is-6-tablet{--columnGap:1.5rem}}@media screen and (min-width:769px) and (max-width:1087px){.columns.is-variable.is-6-tablet-only{--columnGap:1.5rem}}@media screen and (max-width:1087px){.columns.is-variable.is-6-touch{--columnGap:1.5rem}}@media screen and (min-width:1088px){.columns.is-variable.is-6-desktop{--columnGap:1.5rem}}@media screen and (min-width:1088px) and (max-width:1279px){.columns.is-variable.is-6-desktop-only{--columnGap:1.5rem}}@media screen and (min-width:1280px){.columns.is-variable.is-6-widescreen{--columnGap:1.5rem}}@media screen and (min-width:1280px) and (max-width:1471px){.columns.is-variable.is-6-widescreen-only{--columnGap:1.5rem}}@media screen and (min-width:1472px){.columns.is-variable.is-6-fullhd{--columnGap:1.5rem}}.columns.is-variable.is-7{--columnGap:1.75rem}@media screen and (max-width:768px){.columns.is-variable.is-7-mobile{--columnGap:1.75rem}}@media print,screen and (min-width:769px){.columns.is-variable.is-7-tablet{--columnGap:1.75rem}}@media screen and (min-width:769px) and (max-width:1087px){.columns.is-variable.is-7-tablet-only{--columnGap:1.75rem}}@media screen and (max-width:1087px){.columns.is-variable.is-7-touch{--columnGap:1.75rem}}@media screen and (min-width:1088px){.columns.is-variable.is-7-desktop{--columnGap:1.75rem}}@media screen and (min-width:1088px) and (max-width:1279px){.columns.is-variable.is-7-desktop-only{--columnGap:1.75rem}}@media screen and (min-width:1280px){.columns.is-variable.is-7-widescreen{--columnGap:1.75rem}}@media screen and (min-width:1280px) and (max-width:1471px){.columns.is-variable.is-7-widescreen-only{--columnGap:1.75rem}}@media screen and (min-width:1472px){.columns.is-variable.is-7-fullhd{--columnGap:1.75rem}}.columns.is-variable.is-8{--columnGap:2rem}@media screen and (max-width:768px){.columns.is-variable.is-8-mobile{--columnGap:2rem}}@media print,screen and (min-width:769px){.columns.is-variable.is-8-tablet{--columnGap:2rem}}@media screen and (min-width:769px) and (max-width:1087px){.columns.is-variable.is-8-tablet-only{--columnGap:2rem}}@media screen and (max-width:1087px){.columns.is-variable.is-8-touch{--columnGap:2rem}}@media screen and (min-width:1088px){.columns.is-variable.is-8-desktop{--columnGap:2rem}}@media screen and (min-width:1088px) and (max-width:1279px){.columns.is-variable.is-8-desktop-only{--columnGap:2rem}}@media screen and (min-width:1280px){.columns.is-variable.is-8-widescreen{--columnGap:2rem}}@media screen and (min-width:1280px) and (max-width:1471px){.columns.is-variable.is-8-widescreen-only{--columnGap:2rem}}@media screen and (min-width:1472px){.columns.is-variable.is-8-fullhd{--columnGap:2rem}}.tile{align-items:stretch;display:block;flex-basis:0;flex-grow:1;flex-shrink:1;min-height:min-content}.tile.is-ancestor{margin-left:-.75rem;margin-right:-.75rem;margin-top:-.75rem}.tile.is-ancestor:last-child{margin-bottom:-.75rem}.tile.is-ancestor:not(:last-child){margin-bottom:.75rem}.tile.is-child{margin:0!important}.tile.is-parent{padding:.75rem}.tile.is-vertical{flex-direction:column}.tile.is-vertical>.tile.is-child:not(:last-child){margin-bottom:1.5rem!important}@media print,screen and (min-width:769px){.tile:not(.is-child){display:flex}.tile.is-1{flex:none;width:8.33333%}.tile.is-2{flex:none;width:16.66667%}.tile.is-3{flex:none;width:25%}.tile.is-4{flex:none;width:33.33333%}.tile.is-5{flex:none;width:41.66667%}.tile.is-6{flex:none;width:50%}.tile.is-7{flex:none;width:58.33333%}.tile.is-8{flex:none;width:66.66667%}.tile.is-9{flex:none;width:75%}.tile.is-10{flex:none;width:83.33333%}.tile.is-11{flex:none;width:91.66667%}.tile.is-12{flex:none;width:100%}}.hero{align-items:stretch;display:flex;flex-direction:column;justify-content:space-between}.hero .navbar{background:none}.hero .tabs ul{border-bottom:none}.hero.is-white{background-color:#fff;color:#0a0a0a}.hero.is-white a:not(.button):not(.dropdown-item):not(.dropdown .dropdown-menu .has-link a):not(.tag),.hero.is-white strong{color:inherit}.hero.is-white .title{color:#0a0a0a}.hero.is-white .subtitle{color:hsla(0,0%,4%,.9)}.hero.is-white .subtitle a:not(.button),.hero.is-white .subtitle strong{color:#0a0a0a}@media screen and (max-width:1087px){.hero.is-white .navbar-menu{background-color:#fff}}.hero.is-white .navbar-item,.hero.is-white .navbar-link{color:hsla(0,0%,4%,.7)}.hero.is-white .navbar-link.is-active,.hero.is-white .navbar-link:hover,.hero.is-white a.navbar-item.is-active,.hero.is-white a.navbar-item:hover{background-color:#f2f2f2;color:#0a0a0a}.hero.is-white .tabs a{color:#0a0a0a;opacity:.9}.hero.is-white .tabs a:hover,.hero.is-white .tabs li.is-active a{opacity:1}.hero.is-white .tabs.is-boxed a,.hero.is-white .tabs.is-toggle a{color:#0a0a0a}.hero.is-white .tabs.is-boxed a:hover,.hero.is-white .tabs.is-toggle a:hover{background-color:hsla(0,0%,4%,.1)}.hero.is-white .tabs.is-boxed li.is-active a,.hero.is-white .tabs.is-boxed li.is-active a:hover,.hero.is-white .tabs.is-toggle li.is-active a,.hero.is-white .tabs.is-toggle li.is-active a:hover{background-color:#0a0a0a;border-color:#0a0a0a;color:#fff}.hero.is-white.is-bold{background-image:linear-gradient(141deg,#e6e6e6,#fff 71%,#fff)}@media screen and (max-width:768px){.hero.is-white.is-bold .navbar-menu{background-image:linear-gradient(141deg,#e6e6e6,#fff 71%,#fff)}}.hero.is-black{background-color:#0a0a0a;color:#fff}.hero.is-black a:not(.button):not(.dropdown-item):not(.dropdown .dropdown-menu .has-link a):not(.tag),.hero.is-black strong{color:inherit}.hero.is-black .title{color:#fff}.hero.is-black .subtitle{color:hsla(0,0%,100%,.9)}.hero.is-black .subtitle a:not(.button),.hero.is-black .subtitle strong{color:#fff}@media screen and (max-width:1087px){.hero.is-black .navbar-menu{background-color:#0a0a0a}}.hero.is-black .navbar-item,.hero.is-black .navbar-link{color:hsla(0,0%,100%,.7)}.hero.is-black .navbar-link.is-active,.hero.is-black .navbar-link:hover,.hero.is-black a.navbar-item.is-active,.hero.is-black a.navbar-item:hover{background-color:#000;color:#fff}.hero.is-black .tabs a{color:#fff;opacity:.9}.hero.is-black .tabs a:hover,.hero.is-black .tabs li.is-active a{opacity:1}.hero.is-black .tabs.is-boxed a,.hero.is-black .tabs.is-toggle a{color:#fff}.hero.is-black .tabs.is-boxed a:hover,.hero.is-black .tabs.is-toggle a:hover{background-color:hsla(0,0%,4%,.1)}.hero.is-black .tabs.is-boxed li.is-active a,.hero.is-black .tabs.is-boxed li.is-active a:hover,.hero.is-black .tabs.is-toggle li.is-active a,.hero.is-black .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#0a0a0a}.hero.is-black.is-bold{background-image:linear-gradient(141deg,#000,#0a0a0a 71%,#181616)}@media screen and (max-width:768px){.hero.is-black.is-bold .navbar-menu{background-image:linear-gradient(141deg,#000,#0a0a0a 71%,#181616)}}.hero.is-light{background-color:#f5f5f5;color:#363636}.hero.is-light a:not(.button):not(.dropdown-item):not(.dropdown .dropdown-menu .has-link a):not(.tag),.hero.is-light strong{color:inherit}.hero.is-light .title{color:#363636}.hero.is-light .subtitle{color:rgba(54,54,54,.9)}.hero.is-light .subtitle a:not(.button),.hero.is-light .subtitle strong{color:#363636}@media screen and (max-width:1087px){.hero.is-light .navbar-menu{background-color:#f5f5f5}}.hero.is-light .navbar-item,.hero.is-light .navbar-link{color:rgba(54,54,54,.7)}.hero.is-light .navbar-link.is-active,.hero.is-light .navbar-link:hover,.hero.is-light a.navbar-item.is-active,.hero.is-light a.navbar-item:hover{background-color:#e8e8e8;color:#363636}.hero.is-light .tabs a{color:#363636;opacity:.9}.hero.is-light .tabs a:hover,.hero.is-light .tabs li.is-active a{opacity:1}.hero.is-light .tabs.is-boxed a,.hero.is-light .tabs.is-toggle a{color:#363636}.hero.is-light .tabs.is-boxed a:hover,.hero.is-light .tabs.is-toggle a:hover{background-color:hsla(0,0%,4%,.1)}.hero.is-light .tabs.is-boxed li.is-active a,.hero.is-light .tabs.is-boxed li.is-active a:hover,.hero.is-light .tabs.is-toggle li.is-active a,.hero.is-light .tabs.is-toggle li.is-active a:hover{background-color:#363636;border-color:#363636;color:#f5f5f5}.hero.is-light.is-bold{background-image:linear-gradient(141deg,#dfd8d9,#f5f5f5 71%,#fff)}@media screen and (max-width:768px){.hero.is-light.is-bold .navbar-menu{background-image:linear-gradient(141deg,#dfd8d9,#f5f5f5 71%,#fff)}}.hero.is-dark{background-color:#363636;color:#f5f5f5}.hero.is-dark a:not(.button):not(.dropdown-item):not(.dropdown .dropdown-menu .has-link a):not(.tag),.hero.is-dark strong{color:inherit}.hero.is-dark .title{color:#f5f5f5}.hero.is-dark .subtitle{color:hsla(0,0%,96%,.9)}.hero.is-dark .subtitle a:not(.button),.hero.is-dark .subtitle strong{color:#f5f5f5}@media screen and (max-width:1087px){.hero.is-dark .navbar-menu{background-color:#363636}}.hero.is-dark .navbar-item,.hero.is-dark .navbar-link{color:hsla(0,0%,96%,.7)}.hero.is-dark .navbar-link.is-active,.hero.is-dark .navbar-link:hover,.hero.is-dark a.navbar-item.is-active,.hero.is-dark a.navbar-item:hover{background-color:#292929;color:#f5f5f5}.hero.is-dark .tabs a{color:#f5f5f5;opacity:.9}.hero.is-dark .tabs a:hover,.hero.is-dark .tabs li.is-active a{opacity:1}.hero.is-dark .tabs.is-boxed a,.hero.is-dark .tabs.is-toggle a{color:#f5f5f5}.hero.is-dark .tabs.is-boxed a:hover,.hero.is-dark .tabs.is-toggle a:hover{background-color:hsla(0,0%,4%,.1)}.hero.is-dark .tabs.is-boxed li.is-active a,.hero.is-dark .tabs.is-boxed li.is-active a:hover,.hero.is-dark .tabs.is-toggle li.is-active a,.hero.is-dark .tabs.is-toggle li.is-active a:hover{background-color:#f5f5f5;border-color:#f5f5f5;color:#363636}.hero.is-dark.is-bold{background-image:linear-gradient(141deg,#1f191a,#363636 71%,#46403f)}@media screen and (max-width:768px){.hero.is-dark.is-bold .navbar-menu{background-image:linear-gradient(141deg,#1f191a,#363636 71%,#46403f)}}.hero.is-primary{background-color:#7957d5;color:#fff}.hero.is-primary a:not(.button):not(.dropdown-item):not(.dropdown .dropdown-menu .has-link a):not(.tag),.hero.is-primary strong{color:inherit}.hero.is-primary .title{color:#fff}.hero.is-primary .subtitle{color:hsla(0,0%,100%,.9)}.hero.is-primary .subtitle a:not(.button),.hero.is-primary .subtitle strong{color:#fff}@media screen and (max-width:1087px){.hero.is-primary .navbar-menu{background-color:#7957d5}}.hero.is-primary .navbar-item,.hero.is-primary .navbar-link{color:hsla(0,0%,100%,.7)}.hero.is-primary .navbar-link.is-active,.hero.is-primary .navbar-link:hover,.hero.is-primary a.navbar-item.is-active,.hero.is-primary a.navbar-item:hover{background-color:#6943d0;color:#fff}.hero.is-primary .tabs a{color:#fff;opacity:.9}.hero.is-primary .tabs a:hover,.hero.is-primary .tabs li.is-active a{opacity:1}.hero.is-primary .tabs.is-boxed a,.hero.is-primary .tabs.is-toggle a{color:#fff}.hero.is-primary .tabs.is-boxed a:hover,.hero.is-primary .tabs.is-toggle a:hover{background-color:hsla(0,0%,4%,.1)}.hero.is-primary .tabs.is-boxed li.is-active a,.hero.is-primary .tabs.is-boxed li.is-active a:hover,.hero.is-primary .tabs.is-toggle li.is-active a,.hero.is-primary .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#7957d5}.hero.is-primary.is-bold{background-image:linear-gradient(141deg,#3725d4,#7957d5 71%,#9b67df)}@media screen and (max-width:768px){.hero.is-primary.is-bold .navbar-menu{background-image:linear-gradient(141deg,#3725d4,#7957d5 71%,#9b67df)}}.hero.is-link{background-color:#7957d5;color:#fff}.hero.is-link a:not(.button):not(.dropdown-item):not(.dropdown .dropdown-menu .has-link a):not(.tag),.hero.is-link strong{color:inherit}.hero.is-link .title{color:#fff}.hero.is-link .subtitle{color:hsla(0,0%,100%,.9)}.hero.is-link .subtitle a:not(.button),.hero.is-link .subtitle strong{color:#fff}@media screen and (max-width:1087px){.hero.is-link .navbar-menu{background-color:#7957d5}}.hero.is-link .navbar-item,.hero.is-link .navbar-link{color:hsla(0,0%,100%,.7)}.hero.is-link .navbar-link.is-active,.hero.is-link .navbar-link:hover,.hero.is-link a.navbar-item.is-active,.hero.is-link a.navbar-item:hover{background-color:#6943d0;color:#fff}.hero.is-link .tabs a{color:#fff;opacity:.9}.hero.is-link .tabs a:hover,.hero.is-link .tabs li.is-active a{opacity:1}.hero.is-link .tabs.is-boxed a,.hero.is-link .tabs.is-toggle a{color:#fff}.hero.is-link .tabs.is-boxed a:hover,.hero.is-link .tabs.is-toggle a:hover{background-color:hsla(0,0%,4%,.1)}.hero.is-link .tabs.is-boxed li.is-active a,.hero.is-link .tabs.is-boxed li.is-active a:hover,.hero.is-link .tabs.is-toggle li.is-active a,.hero.is-link .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#7957d5}.hero.is-link.is-bold{background-image:linear-gradient(141deg,#3725d4,#7957d5 71%,#9b67df)}@media screen and (max-width:768px){.hero.is-link.is-bold .navbar-menu{background-image:linear-gradient(141deg,#3725d4,#7957d5 71%,#9b67df)}}.hero.is-info{background-color:#167df0;color:#fff}.hero.is-info a:not(.button):not(.dropdown-item):not(.dropdown .dropdown-menu .has-link a):not(.tag),.hero.is-info strong{color:inherit}.hero.is-info .title{color:#fff}.hero.is-info .subtitle{color:hsla(0,0%,100%,.9)}.hero.is-info .subtitle a:not(.button),.hero.is-info .subtitle strong{color:#fff}@media screen and (max-width:1087px){.hero.is-info .navbar-menu{background-color:#167df0}}.hero.is-info .navbar-item,.hero.is-info .navbar-link{color:hsla(0,0%,100%,.7)}.hero.is-info .navbar-link.is-active,.hero.is-info .navbar-link:hover,.hero.is-info a.navbar-item.is-active,.hero.is-info a.navbar-item:hover{background-color:#0e71de;color:#fff}.hero.is-info .tabs a{color:#fff;opacity:.9}.hero.is-info .tabs a:hover,.hero.is-info .tabs li.is-active a{opacity:1}.hero.is-info .tabs.is-boxed a,.hero.is-info .tabs.is-toggle a{color:#fff}.hero.is-info .tabs.is-boxed a:hover,.hero.is-info .tabs.is-toggle a:hover{background-color:hsla(0,0%,4%,.1)}.hero.is-info .tabs.is-boxed li.is-active a,.hero.is-info .tabs.is-boxed li.is-active a:hover,.hero.is-info .tabs.is-toggle li.is-active a,.hero.is-info .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#167df0}.hero.is-info.is-bold{background-image:linear-gradient(141deg,#0286d1,#167df0 71%,#2868f7)}@media screen and (max-width:768px){.hero.is-info.is-bold .navbar-menu{background-image:linear-gradient(141deg,#0286d1,#167df0 71%,#2868f7)}}.hero.is-success{background-color:#23d160;color:#fff}.hero.is-success a:not(.button):not(.dropdown-item):not(.dropdown .dropdown-menu .has-link a):not(.tag),.hero.is-success strong{color:inherit}.hero.is-success .title{color:#fff}.hero.is-success .subtitle{color:hsla(0,0%,100%,.9)}.hero.is-success .subtitle a:not(.button),.hero.is-success .subtitle strong{color:#fff}@media screen and (max-width:1087px){.hero.is-success .navbar-menu{background-color:#23d160}}.hero.is-success .navbar-item,.hero.is-success .navbar-link{color:hsla(0,0%,100%,.7)}.hero.is-success .navbar-link.is-active,.hero.is-success .navbar-link:hover,.hero.is-success a.navbar-item.is-active,.hero.is-success a.navbar-item:hover{background-color:#20bc56;color:#fff}.hero.is-success .tabs a{color:#fff;opacity:.9}.hero.is-success .tabs a:hover,.hero.is-success .tabs li.is-active a{opacity:1}.hero.is-success .tabs.is-boxed a,.hero.is-success .tabs.is-toggle a{color:#fff}.hero.is-success .tabs.is-boxed a:hover,.hero.is-success .tabs.is-toggle a:hover{background-color:hsla(0,0%,4%,.1)}.hero.is-success .tabs.is-boxed li.is-active a,.hero.is-success .tabs.is-boxed li.is-active a:hover,.hero.is-success .tabs.is-toggle li.is-active a,.hero.is-success .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#23d160}.hero.is-success.is-bold{background-image:linear-gradient(141deg,#12af2f,#23d160 71%,#2ce28a)}@media screen and (max-width:768px){.hero.is-success.is-bold .navbar-menu{background-image:linear-gradient(141deg,#12af2f,#23d160 71%,#2ce28a)}}.hero.is-warning{background-color:#ffdd57;color:rgba(0,0,0,.7)}.hero.is-warning a:not(.button):not(.dropdown-item):not(.dropdown .dropdown-menu .has-link a):not(.tag),.hero.is-warning strong{color:inherit}.hero.is-warning .title{color:rgba(0,0,0,.7)}.hero.is-warning .subtitle{color:rgba(0,0,0,.9)}.hero.is-warning .subtitle a:not(.button),.hero.is-warning .subtitle strong{color:rgba(0,0,0,.7)}@media screen and (max-width:1087px){.hero.is-warning .navbar-menu{background-color:#ffdd57}}.hero.is-warning .navbar-item,.hero.is-warning .navbar-link{color:rgba(0,0,0,.7)}.hero.is-warning .navbar-link.is-active,.hero.is-warning .navbar-link:hover,.hero.is-warning a.navbar-item.is-active,.hero.is-warning a.navbar-item:hover{background-color:#ffd83d;color:rgba(0,0,0,.7)}.hero.is-warning .tabs a{color:rgba(0,0,0,.7);opacity:.9}.hero.is-warning .tabs a:hover,.hero.is-warning .tabs li.is-active a{opacity:1}.hero.is-warning .tabs.is-boxed a,.hero.is-warning .tabs.is-toggle a{color:rgba(0,0,0,.7)}.hero.is-warning .tabs.is-boxed a:hover,.hero.is-warning .tabs.is-toggle a:hover{background-color:hsla(0,0%,4%,.1)}.hero.is-warning .tabs.is-boxed li.is-active a,.hero.is-warning .tabs.is-boxed li.is-active a:hover,.hero.is-warning .tabs.is-toggle li.is-active a,.hero.is-warning .tabs.is-toggle li.is-active a:hover{background-color:rgba(0,0,0,.7);border-color:rgba(0,0,0,.7);color:#ffdd57}.hero.is-warning.is-bold{background-image:linear-gradient(141deg,#ffaf24,#ffdd57 71%,#fffa70)}@media screen and (max-width:768px){.hero.is-warning.is-bold .navbar-menu{background-image:linear-gradient(141deg,#ffaf24,#ffdd57 71%,#fffa70)}}.hero.is-danger{background-color:#ff3860;color:#fff}.hero.is-danger a:not(.button):not(.dropdown-item):not(.dropdown .dropdown-menu .has-link a):not(.tag),.hero.is-danger strong{color:inherit}.hero.is-danger .title{color:#fff}.hero.is-danger .subtitle{color:hsla(0,0%,100%,.9)}.hero.is-danger .subtitle a:not(.button),.hero.is-danger .subtitle strong{color:#fff}@media screen and (max-width:1087px){.hero.is-danger .navbar-menu{background-color:#ff3860}}.hero.is-danger .navbar-item,.hero.is-danger .navbar-link{color:hsla(0,0%,100%,.7)}.hero.is-danger .navbar-link.is-active,.hero.is-danger .navbar-link:hover,.hero.is-danger a.navbar-item.is-active,.hero.is-danger a.navbar-item:hover{background-color:#ff1f4b;color:#fff}.hero.is-danger .tabs a{color:#fff;opacity:.9}.hero.is-danger .tabs a:hover,.hero.is-danger .tabs li.is-active a{opacity:1}.hero.is-danger .tabs.is-boxed a,.hero.is-danger .tabs.is-toggle a{color:#fff}.hero.is-danger .tabs.is-boxed a:hover,.hero.is-danger .tabs.is-toggle a:hover{background-color:hsla(0,0%,4%,.1)}.hero.is-danger .tabs.is-boxed li.is-active a,.hero.is-danger .tabs.is-boxed li.is-active a:hover,.hero.is-danger .tabs.is-toggle li.is-active a,.hero.is-danger .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#ff3860}.hero.is-danger.is-bold{background-image:linear-gradient(141deg,#ff0561,#ff3860 71%,#ff5257)}@media screen and (max-width:768px){.hero.is-danger.is-bold .navbar-menu{background-image:linear-gradient(141deg,#ff0561,#ff3860 71%,#ff5257)}}.hero.is-small .hero-body{padding-bottom:1.5rem;padding-top:1.5rem}@media print,screen and (min-width:769px){.hero.is-medium .hero-body{padding-bottom:9rem;padding-top:9rem}}@media print,screen and (min-width:769px){.hero.is-large .hero-body{padding-bottom:18rem;padding-top:18rem}}.hero.is-fullheight-with-navbar .hero-body,.hero.is-fullheight .hero-body,.hero.is-halfheight .hero-body{align-items:center;display:flex}.hero.is-fullheight-with-navbar .hero-body>.container,.hero.is-fullheight .hero-body>.container,.hero.is-halfheight .hero-body>.container{flex-grow:1;flex-shrink:1}.hero.is-halfheight{min-height:50vh}.hero.is-fullheight{min-height:100vh}.hero.is-fullheight-with-navbar{min-height:calc(100vh - 3.25rem)}.hero-video{overflow:hidden}.hero-video video{left:50%;min-height:100%;min-width:100%;position:absolute;top:50%;transform:translate3d(-50%,-50%,0)}.hero-video.is-transparent{opacity:.3}@media screen and (max-width:768px){.hero-video{display:none}}.hero-buttons{margin-top:1.5rem}@media screen and (max-width:768px){.hero-buttons .button{display:flex}.hero-buttons .button:not(:last-child){margin-bottom:.75rem}}@media print,screen and (min-width:769px){.hero-buttons{display:flex;justify-content:center}.hero-buttons .button:not(:last-child){margin-right:1.5rem}}.hero-foot,.hero-head{flex-grow:0;flex-shrink:0}.hero-body{flex-grow:1;flex-shrink:0}.hero-body,.section{padding:3rem 1.5rem}@media screen and (min-width:1088px){.section.is-medium{padding:9rem 1.5rem}.section.is-large{padding:18rem 1.5rem}}.footer{background-color:#fafafa;padding:3rem 1.5rem 6rem}.is-noscroll{position:fixed;overflow-y:hidden;width:100%;bottom:0}@keyframes fadeOut{0%{opacity:1}to{opacity:0}}.fadeOut{animation-name:fadeOut}@keyframes fadeOutDown{0%{opacity:1}to{opacity:0;transform:translate3d(0,100%,0)}}.fadeOutDown{animation-name:fadeOutDown}@keyframes fadeOutUp{0%{opacity:1}to{opacity:0;transform:translate3d(0,-100%,0)}}.fadeOutUp{animation-name:fadeOutUp}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}.fadeIn{animation-name:fadeIn}@keyframes fadeInDown{0%{opacity:0;transform:translate3d(0,-100%,0)}to{opacity:1;transform:none}}.fadeInDown{animation-name:fadeInDown}@keyframes fadeInUp{0%{opacity:0;transform:translate3d(0,100%,0)}to{opacity:1;transform:none}}.fadeInUp{animation-name:fadeInUp}.fade-enter-active,.fade-leave-active{transition:opacity .15s ease-out}.fade-enter,.fade-leave-to{opacity:0}.zoom-in-enter-active,.zoom-in-leave-active{transition:opacity .15s ease-out}.zoom-in-enter-active .animation-content,.zoom-in-leave-active .animation-content{transition:transform .15s ease-out}.zoom-in-enter,.zoom-in-leave-active{opacity:0}.zoom-in-enter .animation-content,.zoom-in-leave-active .animation-content{transform:scale(.95)}.zoom-out-enter-active,.zoom-out-leave-active{transition:opacity .15s ease-out}.zoom-out-enter-active .animation-content,.zoom-out-leave-active .animation-content{transition:transform .15s ease-out}.zoom-out-enter,.zoom-out-leave-active{opacity:0}.zoom-out-enter .animation-content,.zoom-out-leave-active .animation-content{transform:scale(1.05)}.slide-next-enter-active,.slide-next-leave-active,.slide-prev-enter-active,.slide-prev-leave-active{transition:transform .25s cubic-bezier(.785,.135,.15,.86)}.slide-next-enter,.slide-prev-leave-to{transform:translate3d(-100%,0,0);position:absolute;width:100%}.slide-next-leave-to,.slide-prev-enter{transform:translate3d(100%,0,0);position:absolute;width:100%}.autocomplete{position:relative}.autocomplete .dropdown-menu{display:block;min-width:100%;max-width:100%}.autocomplete .dropdown-menu.is-opened-top{top:auto;bottom:100%}.autocomplete .dropdown-content{overflow:auto;max-height:200px}.autocomplete .dropdown-item,.autocomplete .dropdown .dropdown-menu .has-link a,.dropdown .dropdown-menu .has-link .autocomplete a{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.autocomplete .dropdown-item.is-hovered,.autocomplete .dropdown .dropdown-menu .has-link a.is-hovered,.dropdown .dropdown-menu .has-link .autocomplete a.is-hovered{background:#f5f5f5;color:#0a0a0a}.autocomplete .dropdown-item.is-disabled,.autocomplete .dropdown .dropdown-menu .has-link a.is-disabled,.dropdown .dropdown-menu .has-link .autocomplete a.is-disabled{opacity:.5;cursor:not-allowed}.autocomplete.is-small{border-radius:2px;font-size:.75rem}.autocomplete.is-medium{font-size:1.25rem}.autocomplete.is-large{font-size:1.5rem}.b-checkbox.checkbox{outline:none;display:inline-flex;align-items:center;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.b-checkbox.checkbox+.checkbox{margin-left:.5em}.b-checkbox.checkbox input[type=checkbox]{position:absolute;left:0;opacity:0;outline:none;z-index:-1}.b-checkbox.checkbox input[type=checkbox]+.check{width:1.25em;height:1.25em;flex-shrink:0;border-radius:4px;border:2px solid #7a7a7a;transition:background .15s ease-out}.b-checkbox.checkbox input[type=checkbox]:checked+.check{background:#7957d5 url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cpath d='M.04.627L.146.52.43.804.323.91zm.177.177L.854.167.96.273.323.91z' fill='%23fff'/%3E%3C/svg%3E\") no-repeat 50%;border-color:#7957d5}.b-checkbox.checkbox input[type=checkbox]:checked+.check.is-white{background:#fff url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cpath d='M.04.627L.146.52.43.804.323.91zm.177.177L.854.167.96.273.323.91z' fill='%230a0a0a'/%3E%3C/svg%3E\") no-repeat 50%;border-color:#fff}.b-checkbox.checkbox input[type=checkbox]:checked+.check.is-black{background:#0a0a0a url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cpath d='M.04.627L.146.52.43.804.323.91zm.177.177L.854.167.96.273.323.91z' fill='%23fff'/%3E%3C/svg%3E\") no-repeat 50%;border-color:#0a0a0a}.b-checkbox.checkbox input[type=checkbox]:checked+.check.is-light{background:#f5f5f5 url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cpath d='M.04.627L.146.52.43.804.323.91zm.177.177L.854.167.96.273.323.91z' fill='%23363636'/%3E%3C/svg%3E\") no-repeat 50%;border-color:#f5f5f5}.b-checkbox.checkbox input[type=checkbox]:checked+.check.is-dark{background:#363636 url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cpath d='M.04.627L.146.52.43.804.323.91zm.177.177L.854.167.96.273.323.91z' fill='%23f5f5f5'/%3E%3C/svg%3E\") no-repeat 50%;border-color:#363636}.b-checkbox.checkbox input[type=checkbox]:checked+.check.is-link,.b-checkbox.checkbox input[type=checkbox]:checked+.check.is-primary{background:#7957d5 url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cpath d='M.04.627L.146.52.43.804.323.91zm.177.177L.854.167.96.273.323.91z' fill='%23fff'/%3E%3C/svg%3E\") no-repeat 50%;border-color:#7957d5}.b-checkbox.checkbox input[type=checkbox]:checked+.check.is-info{background:#167df0 url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cpath d='M.04.627L.146.52.43.804.323.91zm.177.177L.854.167.96.273.323.91z' fill='%23fff'/%3E%3C/svg%3E\") no-repeat 50%;border-color:#167df0}.b-checkbox.checkbox input[type=checkbox]:checked+.check.is-success{background:#23d160 url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cpath d='M.04.627L.146.52.43.804.323.91zm.177.177L.854.167.96.273.323.91z' fill='%23fff'/%3E%3C/svg%3E\") no-repeat 50%;border-color:#23d160}.b-checkbox.checkbox input[type=checkbox]:checked+.check.is-warning{background:#ffdd57 url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cpath d='M.04.627L.146.52.43.804.323.91zm.177.177L.854.167.96.273.323.91z' fill='rgba(0,0,0,.7)'/%3E%3C/svg%3E\") no-repeat 50%;border-color:#ffdd57}.b-checkbox.checkbox input[type=checkbox]:checked+.check.is-danger{background:#ff3860 url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cpath d='M.04.627L.146.52.43.804.323.91zm.177.177L.854.167.96.273.323.91z' fill='%23fff'/%3E%3C/svg%3E\") no-repeat 50%;border-color:#ff3860}.b-checkbox.checkbox input[type=checkbox]:indeterminate+.check{background:#7957d5 url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cpath fill='%23fff' d='M.15.4h.7v.2h-.7z'/%3E%3C/svg%3E\") no-repeat 50%;border-color:#7957d5}.b-checkbox.checkbox input[type=checkbox]:indeterminate+.check.is-white{background:#fff url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cpath fill='%230a0a0a' d='M.15.4h.7v.2h-.7z'/%3E%3C/svg%3E\") no-repeat 50%;border-color:#fff}.b-checkbox.checkbox input[type=checkbox]:indeterminate+.check.is-black{background:#0a0a0a url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cpath fill='%23fff' d='M.15.4h.7v.2h-.7z'/%3E%3C/svg%3E\") no-repeat 50%;border-color:#0a0a0a}.b-checkbox.checkbox input[type=checkbox]:indeterminate+.check.is-light{background:#f5f5f5 url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cpath fill='%23363636' d='M.15.4h.7v.2h-.7z'/%3E%3C/svg%3E\") no-repeat 50%;border-color:#f5f5f5}.b-checkbox.checkbox input[type=checkbox]:indeterminate+.check.is-dark{background:#363636 url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cpath fill='%23f5f5f5' d='M.15.4h.7v.2h-.7z'/%3E%3C/svg%3E\") no-repeat 50%;border-color:#363636}.b-checkbox.checkbox input[type=checkbox]:indeterminate+.check.is-primary{background:#7957d5 url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cpath fill='%23fff' d='M.15.4h.7v.2h-.7z'/%3E%3C/svg%3E\") no-repeat 50%;border-color:#7957d5}.b-checkbox.checkbox input[type=checkbox]:indeterminate+.check.is-link{background:#7957d5 url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cpath fill='%23fff' d='M.15.4h.7v.2h-.7z'/%3E%3C/svg%3E\") no-repeat 50%;border-color:#7957d5}.b-checkbox.checkbox input[type=checkbox]:indeterminate+.check.is-info{background:#167df0 url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cpath fill='%23fff' d='M.15.4h.7v.2h-.7z'/%3E%3C/svg%3E\") no-repeat 50%;border-color:#167df0}.b-checkbox.checkbox input[type=checkbox]:indeterminate+.check.is-success{background:#23d160 url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cpath fill='%23fff' d='M.15.4h.7v.2h-.7z'/%3E%3C/svg%3E\") no-repeat 50%;border-color:#23d160}.b-checkbox.checkbox input[type=checkbox]:indeterminate+.check.is-warning{background:#ffdd57 url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cpath fill='rgba(0,0,0,.7)' d='M.15.4h.7v.2h-.7z'/%3E%3C/svg%3E\") no-repeat 50%;border-color:#ffdd57}.b-checkbox.checkbox input[type=checkbox]:indeterminate+.check.is-danger{background:#ff3860 url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cpath fill='%23fff' d='M.15.4h.7v.2h-.7z'/%3E%3C/svg%3E\") no-repeat 50%;border-color:#ff3860}.b-checkbox.checkbox .control-label{padding-left:.5em}.b-checkbox.checkbox[disabled]{opacity:.5}.b-checkbox.checkbox:hover input[type=checkbox]+.check{border-color:#7957d5}.b-checkbox.checkbox:hover input[type=checkbox]+.check.is-white{border-color:#fff}.b-checkbox.checkbox:hover input[type=checkbox]+.check.is-black{border-color:#0a0a0a}.b-checkbox.checkbox:hover input[type=checkbox]+.check.is-light{border-color:#f5f5f5}.b-checkbox.checkbox:hover input[type=checkbox]+.check.is-dark{border-color:#363636}.b-checkbox.checkbox:hover input[type=checkbox]+.check.is-link,.b-checkbox.checkbox:hover input[type=checkbox]+.check.is-primary{border-color:#7957d5}.b-checkbox.checkbox:hover input[type=checkbox]+.check.is-info{border-color:#167df0}.b-checkbox.checkbox:hover input[type=checkbox]+.check.is-success{border-color:#23d160}.b-checkbox.checkbox:hover input[type=checkbox]+.check.is-warning{border-color:#ffdd57}.b-checkbox.checkbox:hover input[type=checkbox]+.check.is-danger{border-color:#ff3860}.b-checkbox.checkbox:focus input[type=checkbox]+.check{box-shadow:0 0 .5em hsla(0,0%,48%,.8)}.b-checkbox.checkbox:focus input[type=checkbox]:checked+.check{box-shadow:0 0 .5em rgba(121,87,213,.8)}.b-checkbox.checkbox:focus input[type=checkbox]:checked+.check.is-white{box-shadow:0 0 .5em hsla(0,0%,100%,.8)}.b-checkbox.checkbox:focus input[type=checkbox]:checked+.check.is-black{box-shadow:0 0 .5em hsla(0,0%,4%,.8)}.b-checkbox.checkbox:focus input[type=checkbox]:checked+.check.is-light{box-shadow:0 0 .5em hsla(0,0%,96%,.8)}.b-checkbox.checkbox:focus input[type=checkbox]:checked+.check.is-dark{box-shadow:0 0 .5em rgba(54,54,54,.8)}.b-checkbox.checkbox:focus input[type=checkbox]:checked+.check.is-link,.b-checkbox.checkbox:focus input[type=checkbox]:checked+.check.is-primary{box-shadow:0 0 .5em rgba(121,87,213,.8)}.b-checkbox.checkbox:focus input[type=checkbox]:checked+.check.is-info{box-shadow:0 0 .5em rgba(22,125,240,.8)}.b-checkbox.checkbox:focus input[type=checkbox]:checked+.check.is-success{box-shadow:0 0 .5em rgba(35,209,96,.8)}.b-checkbox.checkbox:focus input[type=checkbox]:checked+.check.is-warning{box-shadow:0 0 .5em rgba(255,221,87,.8)}.b-checkbox.checkbox:focus input[type=checkbox]:checked+.check.is-danger{box-shadow:0 0 .5em rgba(255,56,96,.8)}.b-checkbox.checkbox.is-small{border-radius:2px;font-size:.75rem}.b-checkbox.checkbox.is-medium{font-size:1.25rem}.b-checkbox.checkbox.is-large{font-size:1.5rem}.collapse .collapse-trigger{display:inline;cursor:pointer}.collapse .collapse-content{display:inherit}.datepicker{font-size:.875rem}.datepicker .dropdown,.datepicker .dropdown-trigger{width:100%}.datepicker .dropdown-item,.datepicker .dropdown .dropdown-menu .has-link a,.dropdown .dropdown-menu .has-link .datepicker a{font-size:inherit}.datepicker .datepicker-header{padding-bottom:.875rem;margin-bottom:.875rem;border-bottom:1px solid #dbdbdb}.datepicker .datepicker-footer{padding-top:.875rem;border-top:1px solid #dbdbdb}.datepicker .datepicker-table{display:table;margin:0 auto .875rem}.datepicker .datepicker-table .datepicker-cell{text-align:center;vertical-align:middle;display:table-cell;border-radius:4px;padding:.5rem .75rem}.datepicker .datepicker-table .datepicker-header{display:table-header-group}.datepicker .datepicker-table .datepicker-header .datepicker-cell{color:#7a7a7a;font-weight:600}.datepicker .datepicker-table .datepicker-body{display:table-row-group}.datepicker .datepicker-table .datepicker-body .datepicker-row{display:table-row}.datepicker .datepicker-table .datepicker-body .datepicker-row .datepicker-cell.is-unselectable{color:#b5b5b5}.datepicker .datepicker-table .datepicker-body .datepicker-row .datepicker-cell.is-today{border:1px solid rgba(121,87,213,.5)}.datepicker .datepicker-table .datepicker-body .datepicker-row .datepicker-cell.is-selectable{color:#4a4a4a}.datepicker .datepicker-table .datepicker-body .datepicker-row .datepicker-cell.is-selectable:focus:not(.is-selected),.datepicker .datepicker-table .datepicker-body .datepicker-row .datepicker-cell.is-selectable:hover:not(.is-selected){background-color:#f5f5f5;color:#0a0a0a;cursor:pointer}.datepicker .datepicker-table .datepicker-body .datepicker-row .datepicker-cell.is-selected{background-color:#7957d5;color:#fff}.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell{padding:.3rem .75rem .75rem}.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell.has-event{position:relative}.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell.has-event .events{bottom:.425rem;display:flex;justify-content:center;left:0;padding:0 .35rem;position:absolute;width:100%}.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell.has-event .events .event.is-white{background-color:#fff}.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell.has-event .events .event.is-black{background-color:#0a0a0a}.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell.has-event .events .event.is-light{background-color:#f5f5f5}.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell.has-event .events .event.is-dark{background-color:#363636}.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell.has-event .events .event.is-link,.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell.has-event .events .event.is-primary{background-color:#7957d5}.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell.has-event .events .event.is-info{background-color:#167df0}.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell.has-event .events .event.is-success{background-color:#23d160}.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell.has-event .events .event.is-warning{background-color:#ffdd57}.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell.has-event .events .event.is-danger{background-color:#ff3860}.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell.has-event.dots .event{border-radius:50%;height:.35em;margin:0 .1em;width:.35em}.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell.has-event.bars .event{height:.25em;width:100%}.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell.is-selected{overflow:hidden}.datepicker .datepicker-table .datepicker-body.has-events .datepicker-cell.is-selected .events .event.is-primary{background-color:#aa94e4}.datepicker.is-small{border-radius:2px;font-size:.75rem}.datepicker.is-medium{font-size:1.25rem}.datepicker.is-large{font-size:1.5rem}@media screen and (min-width:769px) and (max-width:1087px){.datepicker .datepicker-table .datepicker-cell{padding:.75rem 1rem}}@media screen and (max-width:768px){.datepicker .datepicker-table .datepicker-cell{padding:.25rem .5rem}}.dialog .modal-card{max-width:460px;width:auto}.dialog .modal-card .modal-card-head{font-size:1.25rem;font-weight:600}.dialog .modal-card .modal-card-body .field{margin-top:16px}.dialog .modal-card .modal-card-body.is-titleless{border-top-left-radius:6px;border-top-right-radius:6px}.dialog .modal-card .modal-card-foot{justify-content:flex-end}.dialog .modal-card .modal-card-foot .button{display:inline;min-width:5em;font-weight:600}@media print,screen and (min-width:769px){.dialog .modal-card{min-width:320px}}.dialog.is-small .button,.dialog.is-small .input,.dialog.is-small .modal-card,.dialog.is-small .taginput .taginput-container.is-focusable,.taginput .dialog.is-small .taginput-container.is-focusable{border-radius:2px;font-size:.75rem}.dialog.is-medium .button,.dialog.is-medium .input,.dialog.is-medium .modal-card,.dialog.is-medium .taginput .taginput-container.is-focusable,.taginput .dialog.is-medium .taginput-container.is-focusable{font-size:1.25rem}.dialog.is-large .button,.dialog.is-large .input,.dialog.is-large .modal-card,.dialog.is-large .taginput .taginput-container.is-focusable,.taginput .dialog.is-large .taginput-container.is-focusable{font-size:1.5rem}.dropdown+.dropdown{margin-left:.5em}.dropdown .background{bottom:0;left:0;position:absolute;right:0;top:0;position:fixed;background-color:hsla(0,0%,4%,.86);z-index:10;cursor:pointer}@media screen and (min-width:1088px){.dropdown .background{display:none}}.dropdown .dropdown-menu .dropdown-item.is-disabled,.dropdown .dropdown-menu .has-link a.is-disabled{cursor:not-allowed}.dropdown .dropdown-menu .dropdown-item.is-disabled:hover,.dropdown .dropdown-menu .has-link a.is-disabled:hover{background:inherit;color:inherit}.dropdown .dropdown-menu .has-link a{padding-right:3rem;white-space:nowrap}.dropdown:not(.is-disabled) .dropdown-menu .dropdown-item.is-disabled,.dropdown:not(.is-disabled) .dropdown-menu .has-link a.is-disabled{opacity:.5}.dropdown .navbar-item{height:100%}.dropdown.is-disabled{opacity:.5;cursor:not-allowed}.dropdown.is-disabled .dropdown-trigger{pointer-events:none}.dropdown.is-inline .dropdown-menu{position:static;display:inline-block;padding:0}.dropdown.is-top-right .dropdown-menu{top:auto;bottom:100%}.dropdown.is-top-left .dropdown-menu{top:auto;bottom:100%;right:0;left:auto}.dropdown.is-bottom-left .dropdown-menu{right:0;left:auto}@media screen and (max-width:1087px){.dropdown.is-mobile-modal .dropdown-menu{position:fixed;width:calc(100vw - 40px);max-width:460px;max-height:calc(100vh - 120px);top:25%!important;left:50%!important;bottom:auto!important;right:auto!important;transform:translate3d(-50%,-25%,0);white-space:normal;overflow-y:auto}.dropdown.is-mobile-modal .dropdown-menu .dropdown-item,.dropdown.is-mobile-modal .dropdown-menu .has-link a{padding:1rem 1.5rem}}.label{font-weight:600}.field.is-grouped .field{flex-shrink:0}.field.is-grouped .field+.field{margin-left:.75rem}.field.is-grouped .field.is-expanded{flex-grow:1;flex-shrink:1}.field.has-addons .control:first-child .control .button,.field.has-addons .control:first-child .control .input,.field.has-addons .control:first-child .control .select select,.field.has-addons .control:first-child .control .taginput .taginput-container.is-focusable,.taginput .field.has-addons .control:first-child .control .taginput-container.is-focusable{border-bottom-left-radius:4px;border-top-left-radius:4px}.field.has-addons .control:last-child .control .button,.field.has-addons .control:last-child .control .input,.field.has-addons .control:last-child .control .select select,.field.has-addons .control:last-child .control .taginput .taginput-container.is-focusable,.taginput .field.has-addons .control:last-child .control .taginput-container.is-focusable{border-bottom-right-radius:4px;border-top-right-radius:4px}.field.has-addons .control .control .button,.field.has-addons .control .control .input,.field.has-addons .control .control .select select,.field.has-addons .control .control .taginput .taginput-container.is-focusable,.taginput .field.has-addons .control .control .taginput-container.is-focusable{border-radius:0}.control .help.counter{float:right;margin-left:.5em}.control .icon.is-clickable{pointer-events:auto;cursor:pointer}.icon{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:inherit}.icon svg{background-color:transparent;fill:currentColor;stroke-width:0;stroke:currentColor;pointer-events:none;width:1.5rem;height:1.5rem}.loading-overlay{bottom:0;left:0;position:absolute;right:0;top:0;align-items:center;display:none;justify-content:center;overflow:hidden}.loading-overlay.is-active{display:flex}.loading-overlay.is-full-page{z-index:999;position:fixed}.loading-overlay.is-full-page .loading-icon:after{top:calc(50% - 2.5em);left:calc(50% - 2.5em);width:5em;height:5em}.loading-overlay .loading-background{bottom:0;left:0;position:absolute;right:0;top:0;background:#7f7f7f;background:hsla(0,0%,100%,.5)}.loading-overlay .loading-icon{position:relative}.loading-overlay .loading-icon:after{animation:spinAround .5s infinite linear;border:2px solid #dbdbdb;border-radius:290486px;border-right-color:transparent;border-top-color:transparent;content:\"\";display:block;height:1em;position:relative;width:1em;position:absolute;top:calc(50% - 1.5em);left:calc(50% - 1.5em);width:3em;height:3em;border-width:.25em}.message .media,.notification .media{padding-top:0;border:0}.notification>.delete{right:.5rem!important;top:.5rem!important}.modal .animation-content{margin:0 20px}.modal .animation-content .modal-card{margin:0}@media screen and (max-width:768px){.modal .animation-content{width:100%}}.notices{position:fixed;display:flex;top:0;bottom:0;left:0;right:0;padding:2em;overflow:hidden;z-index:1000;pointer-events:none}.notices .toast{display:inline-flex;animation-duration:.15s;margin:.5em 0;text-align:center;box-shadow:0 1px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.04);border-radius:2em;padding:.75em 1.5em;pointer-events:auto;opacity:.92}.notices .toast.is-white{color:#0a0a0a;background:#fff}.notices .toast.is-black{color:#fff;background:#0a0a0a}.notices .toast.is-light{color:#363636;background:#f5f5f5}.notices .toast.is-dark{color:#f5f5f5;background:#363636}.notices .toast.is-link,.notices .toast.is-primary{color:#fff;background:#7957d5}.notices .toast.is-info{color:#fff;background:#167df0}.notices .toast.is-success{color:#fff;background:#23d160}.notices .toast.is-warning{color:rgba(0,0,0,.7);background:#ffdd57}.notices .toast.is-danger{color:#fff;background:#ff3860}.notices .snackbar{display:inline-flex;align-items:center;justify-content:space-around;animation-duration:.15s;margin:.5em 0;box-shadow:0 1px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.04);border-radius:4px;pointer-events:auto;background:#363636;color:#f5f5f5;min-height:3em}.notices .snackbar .text{padding:.5em 1em}.notices .snackbar .action{margin-left:auto;padding:.5em;padding-left:0}.notices .snackbar .action .button{font-weight:600;text-transform:uppercase}.notices .snackbar .action.is-white .button{color:#fff}.notices .snackbar .action.is-black .button{color:#0a0a0a}.notices .snackbar .action.is-light .button{color:#f5f5f5}.notices .snackbar .action.is-dark .button{color:#363636}.notices .snackbar .action.is-link .button,.notices .snackbar .action.is-primary .button{color:#7957d5}.notices .snackbar .action.is-info .button{color:#167df0}.notices .snackbar .action.is-success .button{color:#23d160}.notices .snackbar .action.is-warning .button{color:#ffdd57}.notices .snackbar .action.is-danger .button{color:#ff3860}@media screen and (max-width:768px){.notices .snackbar{width:100%;margin:0;border-radius:0}}@media print,screen and (min-width:769px){.notices .snackbar{min-width:350px;max-width:600px;overflow:hidden}}.notices .snackbar.is-bottom,.notices .snackbar.is-top,.notices .toast.is-bottom,.notices .toast.is-top{align-self:center}.notices .snackbar.is-bottom-right,.notices .snackbar.is-top-right,.notices .toast.is-bottom-right,.notices .toast.is-top-right{align-self:flex-end}.notices .snackbar.is-bottom-left,.notices .snackbar.is-top-left,.notices .toast.is-bottom-left,.notices .toast.is-top-left{align-self:flex-start}.notices .snackbar.is-toast,.notices .toast.is-toast{opacity:.92}.notices.is-top{flex-direction:column}.notices.is-bottom{flex-direction:column-reverse}.notices.has-custom-container{position:absolute}@media screen and (max-width:768px){.notices{padding:0;position:fixed!important}}.pagination .pagination-next,.pagination .pagination-previous{padding-left:.25em;padding-right:.25em}.pagination .pagination-next.is-disabled,.pagination .pagination-previous.is-disabled{pointer-events:none;cursor:not-allowed;opacity:.5}.pagination.is-simple{justify-content:normal}.pagination .is-current{pointer-events:none;cursor:not-allowed}.b-radio.radio{outline:none;display:inline-flex;align-items:center;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.b-radio.radio+.radio{margin-left:.5em}.b-radio.radio input[type=radio]{position:absolute;left:0;opacity:0;outline:none;z-index:-1}.b-radio.radio input[type=radio]+.check{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:1.25em;height:1.25em;border:2px solid #7a7a7a;border-radius:50%;transition:background .15s ease-out}.b-radio.radio input[type=radio]+.check:before{content:\"\";border-radius:50%;width:.625em;height:.625em;background:#7957d5;transform:scale(0);transition:transform .15s ease-out}.b-radio.radio input[type=radio]+.check.is-white:before{background:#fff}.b-radio.radio input[type=radio]+.check.is-black:before{background:#0a0a0a}.b-radio.radio input[type=radio]+.check.is-light:before{background:#f5f5f5}.b-radio.radio input[type=radio]+.check.is-dark:before{background:#363636}.b-radio.radio input[type=radio]+.check.is-link:before,.b-radio.radio input[type=radio]+.check.is-primary:before{background:#7957d5}.b-radio.radio input[type=radio]+.check.is-info:before{background:#167df0}.b-radio.radio input[type=radio]+.check.is-success:before{background:#23d160}.b-radio.radio input[type=radio]+.check.is-warning:before{background:#ffdd57}.b-radio.radio input[type=radio]+.check.is-danger:before{background:#ff3860}.b-radio.radio input[type=radio]:checked+.check{border-color:#7957d5}.b-radio.radio input[type=radio]:checked+.check.is-white{border-color:#fff}.b-radio.radio input[type=radio]:checked+.check.is-black{border-color:#0a0a0a}.b-radio.radio input[type=radio]:checked+.check.is-light{border-color:#f5f5f5}.b-radio.radio input[type=radio]:checked+.check.is-dark{border-color:#363636}.b-radio.radio input[type=radio]:checked+.check.is-link,.b-radio.radio input[type=radio]:checked+.check.is-primary{border-color:#7957d5}.b-radio.radio input[type=radio]:checked+.check.is-info{border-color:#167df0}.b-radio.radio input[type=radio]:checked+.check.is-success{border-color:#23d160}.b-radio.radio input[type=radio]:checked+.check.is-warning{border-color:#ffdd57}.b-radio.radio input[type=radio]:checked+.check.is-danger{border-color:#ff3860}.b-radio.radio input[type=radio]:checked+.check:before{transform:scale(1)}.b-radio.radio .control-label{padding-left:.5em}.b-radio.radio[disabled]{opacity:.5}.b-radio.radio:hover input[type=radio]+.check{border-color:#7957d5}.b-radio.radio:hover input[type=radio]+.check.is-white{border-color:#fff}.b-radio.radio:hover input[type=radio]+.check.is-black{border-color:#0a0a0a}.b-radio.radio:hover input[type=radio]+.check.is-light{border-color:#f5f5f5}.b-radio.radio:hover input[type=radio]+.check.is-dark{border-color:#363636}.b-radio.radio:hover input[type=radio]+.check.is-link,.b-radio.radio:hover input[type=radio]+.check.is-primary{border-color:#7957d5}.b-radio.radio:hover input[type=radio]+.check.is-info{border-color:#167df0}.b-radio.radio:hover input[type=radio]+.check.is-success{border-color:#23d160}.b-radio.radio:hover input[type=radio]+.check.is-warning{border-color:#ffdd57}.b-radio.radio:hover input[type=radio]+.check.is-danger{border-color:#ff3860}.b-radio.radio:focus input[type=radio]+.check{box-shadow:0 0 .5em hsla(0,0%,48%,.8)}.b-radio.radio:focus input[type=radio]:checked+.check{box-shadow:0 0 .5em rgba(121,87,213,.8)}.b-radio.radio:focus input[type=radio]:checked+.check.is-white{box-shadow:0 0 .5em hsla(0,0%,100%,.8)}.b-radio.radio:focus input[type=radio]:checked+.check.is-black{box-shadow:0 0 .5em hsla(0,0%,4%,.8)}.b-radio.radio:focus input[type=radio]:checked+.check.is-light{box-shadow:0 0 .5em hsla(0,0%,96%,.8)}.b-radio.radio:focus input[type=radio]:checked+.check.is-dark{box-shadow:0 0 .5em rgba(54,54,54,.8)}.b-radio.radio:focus input[type=radio]:checked+.check.is-link,.b-radio.radio:focus input[type=radio]:checked+.check.is-primary{box-shadow:0 0 .5em rgba(121,87,213,.8)}.b-radio.radio:focus input[type=radio]:checked+.check.is-info{box-shadow:0 0 .5em rgba(22,125,240,.8)}.b-radio.radio:focus input[type=radio]:checked+.check.is-success{box-shadow:0 0 .5em rgba(35,209,96,.8)}.b-radio.radio:focus input[type=radio]:checked+.check.is-warning{box-shadow:0 0 .5em rgba(255,221,87,.8)}.b-radio.radio:focus input[type=radio]:checked+.check.is-danger{box-shadow:0 0 .5em rgba(255,56,96,.8)}.b-radio.radio.is-small{border-radius:2px;font-size:.75rem}.b-radio.radio.is-medium{font-size:1.25rem}.b-radio.radio.is-large{font-size:1.5rem}.select select{padding-right:2.5em}.select select option{color:#4a4a4a;padding:.25em .5em}.select select option:disabled{cursor:not-allowed;opacity:.5}.select select optgroup{color:#b5b5b5;font-weight:400;font-style:normal;padding:.25em 0}.select.is-empty select{color:hsla(0,0%,48%,.7)}.switch{cursor:pointer;display:inline-flex;align-items:center;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.switch+.switch{margin-left:.5em}.switch input[type=checkbox]{display:none}.switch input[type=checkbox]+.check{display:flex;align-items:center;flex-shrink:0;width:2.75em;height:1.575em;padding:.2em;background:#b5b5b5;border-radius:1em;transition:background .15s ease-out}.switch input[type=checkbox]+.check:before{content:\"\";display:block;border-radius:1em;width:1.175em;height:1.175em;background:#f5f5f5;box-shadow:0 3px 1px 0 rgba(0,0,0,.05),0 2px 2px 0 rgba(0,0,0,.1),0 3px 3px 0 rgba(0,0,0,.05);transition:transform .15s ease-out,width .15s ease-out;will-change:transform}.switch input[type=checkbox]+.check.is-elastic:before{width:1.75em}.switch input[type=checkbox]:checked+.check{background:#7957d5}.switch input[type=checkbox]:checked+.check.is-white{background:#fff}.switch input[type=checkbox]:checked+.check.is-black{background:#0a0a0a}.switch input[type=checkbox]:checked+.check.is-light{background:#f5f5f5}.switch input[type=checkbox]:checked+.check.is-dark{background:#363636}.switch input[type=checkbox]:checked+.check.is-link,.switch input[type=checkbox]:checked+.check.is-primary{background:#7957d5}.switch input[type=checkbox]:checked+.check.is-info{background:#167df0}.switch input[type=checkbox]:checked+.check.is-success{background:#23d160}.switch input[type=checkbox]:checked+.check.is-warning{background:#ffdd57}.switch input[type=checkbox]:checked+.check.is-danger{background:#ff3860}.switch input[type=checkbox]:checked+.check:before{transform:translate3d(100%,0,0)}.switch input[type=checkbox]:checked+.check.is-elastic:before{transform:translate3d(36.36364%,0,0)}.switch .control-label{padding-left:.5em}.switch:hover input[type=checkbox]+.check{background:hsla(0,0%,71%,.9)}.switch:hover input[type=checkbox]:checked+.check{background:rgba(121,87,213,.9)}.switch:hover input[type=checkbox]:checked+.check.is-white{background:hsla(0,0%,100%,.9)}.switch:hover input[type=checkbox]:checked+.check.is-black{background:hsla(0,0%,4%,.9)}.switch:hover input[type=checkbox]:checked+.check.is-light{background:hsla(0,0%,96%,.9)}.switch:hover input[type=checkbox]:checked+.check.is-dark{background:rgba(54,54,54,.9)}.switch:hover input[type=checkbox]:checked+.check.is-link,.switch:hover input[type=checkbox]:checked+.check.is-primary{background:rgba(121,87,213,.9)}.switch:hover input[type=checkbox]:checked+.check.is-info{background:rgba(22,125,240,.9)}.switch:hover input[type=checkbox]:checked+.check.is-success{background:rgba(35,209,96,.9)}.switch:hover input[type=checkbox]:checked+.check.is-warning{background:rgba(255,221,87,.9)}.switch:hover input[type=checkbox]:checked+.check.is-danger{background:rgba(255,56,96,.9)}.switch:focus{outline:none}.switch:focus input[type=checkbox]+.check{box-shadow:0 0 .5em hsla(0,0%,48%,.6)}.switch:focus input[type=checkbox]:checked+.check{box-shadow:0 0 .5em rgba(121,87,213,.8)}.switch:focus input[type=checkbox]:checked+.check.is-white{box-shadow:0 0 .5em hsla(0,0%,100%,.8)}.switch:focus input[type=checkbox]:checked+.check.is-black{box-shadow:0 0 .5em hsla(0,0%,4%,.8)}.switch:focus input[type=checkbox]:checked+.check.is-light{box-shadow:0 0 .5em hsla(0,0%,96%,.8)}.switch:focus input[type=checkbox]:checked+.check.is-dark{box-shadow:0 0 .5em rgba(54,54,54,.8)}.switch:focus input[type=checkbox]:checked+.check.is-link,.switch:focus input[type=checkbox]:checked+.check.is-primary{box-shadow:0 0 .5em rgba(121,87,213,.8)}.switch:focus input[type=checkbox]:checked+.check.is-info{box-shadow:0 0 .5em rgba(22,125,240,.8)}.switch:focus input[type=checkbox]:checked+.check.is-success{box-shadow:0 0 .5em rgba(35,209,96,.8)}.switch:focus input[type=checkbox]:checked+.check.is-warning{box-shadow:0 0 .5em rgba(255,221,87,.8)}.switch:focus input[type=checkbox]:checked+.check.is-danger{box-shadow:0 0 .5em rgba(255,56,96,.8)}.switch.is-small{border-radius:2px;font-size:.75rem}.switch.is-medium{font-size:1.25rem}.switch.is-large{font-size:1.5rem}.switch[disabled]{opacity:.5;cursor:not-allowed;color:#7a7a7a}.table-wrapper .table{margin-bottom:0}.table-wrapper:not(:last-child){margin-bottom:1.5rem}@media screen and (max-width:1087px){.table-wrapper{overflow-x:auto}}.b-table{transition:opacity 86ms ease-out}@media print,screen and (min-width:769px){.b-table .table-mobile-sort{display:none}}.b-table .icon{transition:transform .15s ease-out,opacity 86ms ease-out}.b-table .icon.is-desc{transform:rotate(180deg)}.b-table .icon.is-expanded{transform:rotate(90deg)}.b-table .table{width:100%;border:1px solid transparent;border-radius:4px;border-collapse:separate}.b-table .table th{font-weight:600}.b-table .table th .th-wrap{display:flex;align-items:center}.b-table .table th .th-wrap .icon{margin-left:.5rem;margin-right:0;font-size:1rem}.b-table .table th .th-wrap.is-numeric{flex-direction:row-reverse;text-align:right}.b-table .table th .th-wrap.is-numeric .icon{margin-left:0;margin-right:.5rem}.b-table .table th .th-wrap.is-centered{justify-content:center;text-align:center}.b-table .table th.is-current-sort{border-color:#7a7a7a;font-weight:700}.b-table .table th.is-sortable:hover{border-color:#7a7a7a}.b-table .table th.is-sortable,.b-table .table th.is-sortable .th-wrap{cursor:pointer}.b-table .table tr.is-selected .checkbox input:checked+.check{background:#fff url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cpath d='M.04.627L.146.52.43.804.323.91zm.177.177L.854.167.96.273.323.91z' fill='%237957d5'/%3E%3C/svg%3E\") no-repeat 50%}.b-table .table tr.is-selected .checkbox input+.check{border-color:#fff}.b-table .table tr.is-empty:hover{background-color:transparent}.b-table .table .chevron-cell{vertical-align:middle}.b-table .table .checkbox-cell{width:40px}.b-table .table .checkbox-cell .checkbox{vertical-align:middle}.b-table .table .checkbox-cell .checkbox .check{transition:none}.b-table .table tr.detail{box-shadow:inset 0 1px 3px #dbdbdb;background:#fafafa}.b-table .table tr.detail .detail-container{padding:1rem}.b-table .table:focus{border-color:#7957d5;box-shadow:0 0 0 .125em rgba(121,87,213,.25)}.b-table .table.is-bordered th.is-current-sort,.b-table .table.is-bordered th.is-sortable:hover{border-color:#dbdbdb;background:#f5f5f5}@media screen and (max-width:768px){.b-table .table.has-mobile-cards thead{display:none}.b-table .table.has-mobile-cards tfoot th{border:0;display:inherit}.b-table .table.has-mobile-cards tr{box-shadow:0 2px 3px hsla(0,0%,4%,.1),0 0 0 1px hsla(0,0%,4%,.1);max-width:100%;position:relative;display:block}.b-table .table.has-mobile-cards tr td{border:0;display:inherit}.b-table .table.has-mobile-cards tr td:last-child{border-bottom:0}.b-table .table.has-mobile-cards tr:not(:last-child){margin-bottom:1rem}.b-table .table.has-mobile-cards tr:not([class*=is-]){background:inherit}.b-table .table.has-mobile-cards tr:not([class*=is-]):hover{background-color:inherit}.b-table .table.has-mobile-cards tr.detail{margin-top:-1rem}.b-table .table.has-mobile-cards tr:not(.detail):not(.is-empty):not(.table-footer) td{display:flex;width:auto;justify-content:space-between;text-align:right;border-bottom:1px solid #f5f5f5}.b-table .table.has-mobile-cards tr:not(.detail):not(.is-empty):not(.table-footer) td:before{content:attr(data-label);font-weight:600;padding-right:.5em;text-align:left}}.b-table .level{padding-bottom:1.5rem}.b-table.is-loading{position:relative;pointer-events:none;opacity:.5}.b-table.is-loading:after{animation:spinAround .5s infinite linear;border:2px solid #dbdbdb;border-radius:290486px;border-right-color:transparent;border-top-color:transparent;content:\"\";display:block;height:1em;position:relative;width:1em;position:absolute;top:4em;left:calc(50% - 2.5em);width:5em;height:5em;border-width:.25em}.b-tabs .tabs{margin-bottom:0;flex-shrink:0}.b-tabs .is-disabled{pointer-events:none;cursor:not-allowed;opacity:.5}.b-tabs .tab-content{position:relative;overflow:hidden;display:flex;flex-direction:column;padding:1rem}.b-tabs .tab-content .tab-item{flex-shrink:0;flex-basis:auto}.b-tabs:not(:last-child){margin-bottom:1.5rem}.b-tabs.is-fullwidth{width:100%}.tag .has-ellipsis{max-width:10em;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.taginput .taginput-container.is-focusable{padding-bottom:0;padding-top:calc(.275em - 1px);align-items:center;display:flex;flex-wrap:wrap;justify-content:flex-start;height:auto;cursor:text}.taginput .taginput-container>.tag,.taginput .taginput-container>.tags{margin-bottom:calc(.275em - 1px);font-size:.9em;height:1.7em}.taginput .taginput-container>.tag .tag,.taginput .taginput-container>.tags .tag{margin-bottom:0;font-size:.9em;height:1.7em}.taginput .taginput-container>.tag:not(:last-child),.taginput .taginput-container>.tags:not(:last-child){margin-right:.275rem}.taginput .taginput-container .autocomplete{flex:1}.taginput .taginput-container .autocomplete input{height:1.7em;margin-bottom:calc(.275em - 1px);padding-top:0;padding-bottom:0;border:none;box-shadow:none;min-width:8em}.taginput .taginput-container .autocomplete input:focus{box-shadow:none!important}.taginput .taginput-container .autocomplete .icon{height:1.7em}.taginput .taginput-container .autocomplete>.control.is-loading:after{top:.375em}.timepicker .dropdown-menu{min-width:0}.timepicker .dropdown,.timepicker .dropdown-trigger{width:100%}.dropdown .dropdown-menu .has-link .timepicker a,.timepicker .dropdown-item,.timepicker .dropdown .dropdown-menu .has-link a{font-size:inherit;padding:0}.timepicker .timepicker-footer{padding:0 .5rem}.timepicker .dropdown-content .control{font-size:1.25em;margin-right:0!important}.timepicker .dropdown-content .control .select select{font-weight:600;padding-right:calc(.625em - 1px);border:0}.timepicker .dropdown-content .control .select select option:disabled{color:hsla(0,0%,48%,.7)}.timepicker .dropdown-content .control .select:after{display:none}.timepicker .dropdown-content .control.is-colon{font-size:1.7em}.timepicker.is-small{border-radius:2px;font-size:.75rem}.timepicker.is-medium{font-size:1.25rem}.timepicker.is-large{font-size:1.5rem}.tooltip{position:relative;display:inline-flex}.tooltip.is-top:after,.tooltip.is-top:before{top:auto;right:auto;bottom:calc(100% + 5px + 2px);left:50%;transform:translateX(-50%)}.tooltip.is-top.is-white:before{border-top:5px solid #fff}.tooltip.is-top.is-black:before,.tooltip.is-top.is-white:before{border-right:5px solid transparent;border-left:5px solid transparent;bottom:calc(100% + 2px)}.tooltip.is-top.is-black:before{border-top:5px solid #0a0a0a}.tooltip.is-top.is-light:before{border-top:5px solid #f5f5f5}.tooltip.is-top.is-dark:before,.tooltip.is-top.is-light:before{border-right:5px solid transparent;border-left:5px solid transparent;bottom:calc(100% + 2px)}.tooltip.is-top.is-dark:before{border-top:5px solid #363636}.tooltip.is-top.is-link:before,.tooltip.is-top.is-primary:before{border-top:5px solid #7957d5;border-right:5px solid transparent;border-left:5px solid transparent;bottom:calc(100% + 2px)}.tooltip.is-top.is-info:before{border-top:5px solid #167df0}.tooltip.is-top.is-info:before,.tooltip.is-top.is-success:before{border-right:5px solid transparent;border-left:5px solid transparent;bottom:calc(100% + 2px)}.tooltip.is-top.is-success:before{border-top:5px solid #23d160}.tooltip.is-top.is-warning:before{border-top:5px solid #ffdd57}.tooltip.is-top.is-danger:before,.tooltip.is-top.is-warning:before{border-right:5px solid transparent;border-left:5px solid transparent;bottom:calc(100% + 2px)}.tooltip.is-top.is-danger:before{border-top:5px solid #ff3860}.tooltip.is-top.is-multiline.is-small:after{width:180px}.tooltip.is-top.is-multiline.is-medium:after{width:240px}.tooltip.is-top.is-multiline.is-large:after{width:300px}.tooltip.is-right:after,.tooltip.is-right:before{top:50%;right:auto;bottom:auto;left:calc(100% + 5px + 2px);transform:translateY(-50%)}.tooltip.is-right.is-white:before{border-right:5px solid #fff}.tooltip.is-right.is-black:before,.tooltip.is-right.is-white:before{border-top:5px solid transparent;border-bottom:5px solid transparent;left:calc(100% + 2px)}.tooltip.is-right.is-black:before{border-right:5px solid #0a0a0a}.tooltip.is-right.is-light:before{border-right:5px solid #f5f5f5}.tooltip.is-right.is-dark:before,.tooltip.is-right.is-light:before{border-top:5px solid transparent;border-bottom:5px solid transparent;left:calc(100% + 2px)}.tooltip.is-right.is-dark:before{border-right:5px solid #363636}.tooltip.is-right.is-link:before,.tooltip.is-right.is-primary:before{border-top:5px solid transparent;border-right:5px solid #7957d5;border-bottom:5px solid transparent;left:calc(100% + 2px)}.tooltip.is-right.is-info:before{border-right:5px solid #167df0}.tooltip.is-right.is-info:before,.tooltip.is-right.is-success:before{border-top:5px solid transparent;border-bottom:5px solid transparent;left:calc(100% + 2px)}.tooltip.is-right.is-success:before{border-right:5px solid #23d160}.tooltip.is-right.is-warning:before{border-right:5px solid #ffdd57}.tooltip.is-right.is-danger:before,.tooltip.is-right.is-warning:before{border-top:5px solid transparent;border-bottom:5px solid transparent;left:calc(100% + 2px)}.tooltip.is-right.is-danger:before{border-right:5px solid #ff3860}.tooltip.is-right.is-multiline.is-small:after{width:180px}.tooltip.is-right.is-multiline.is-medium:after{width:240px}.tooltip.is-right.is-multiline.is-large:after{width:300px}.tooltip.is-bottom:after,.tooltip.is-bottom:before{top:calc(100% + 5px + 2px);right:auto;bottom:auto;left:50%;transform:translateX(-50%)}.tooltip.is-bottom.is-white:before{border-bottom:5px solid #fff}.tooltip.is-bottom.is-black:before,.tooltip.is-bottom.is-white:before{border-right:5px solid transparent;border-left:5px solid transparent;top:calc(100% + 2px)}.tooltip.is-bottom.is-black:before{border-bottom:5px solid #0a0a0a}.tooltip.is-bottom.is-light:before{border-bottom:5px solid #f5f5f5}.tooltip.is-bottom.is-dark:before,.tooltip.is-bottom.is-light:before{border-right:5px solid transparent;border-left:5px solid transparent;top:calc(100% + 2px)}.tooltip.is-bottom.is-dark:before{border-bottom:5px solid #363636}.tooltip.is-bottom.is-link:before,.tooltip.is-bottom.is-primary:before{border-right:5px solid transparent;border-bottom:5px solid #7957d5;border-left:5px solid transparent;top:calc(100% + 2px)}.tooltip.is-bottom.is-info:before{border-bottom:5px solid #167df0}.tooltip.is-bottom.is-info:before,.tooltip.is-bottom.is-success:before{border-right:5px solid transparent;border-left:5px solid transparent;top:calc(100% + 2px)}.tooltip.is-bottom.is-success:before{border-bottom:5px solid #23d160}.tooltip.is-bottom.is-warning:before{border-bottom:5px solid #ffdd57}.tooltip.is-bottom.is-danger:before,.tooltip.is-bottom.is-warning:before{border-right:5px solid transparent;border-left:5px solid transparent;top:calc(100% + 2px)}.tooltip.is-bottom.is-danger:before{border-bottom:5px solid #ff3860}.tooltip.is-bottom.is-multiline.is-small:after{width:180px}.tooltip.is-bottom.is-multiline.is-medium:after{width:240px}.tooltip.is-bottom.is-multiline.is-large:after{width:300px}.tooltip.is-left:after,.tooltip.is-left:before{top:50%;right:calc(100% + 5px + 2px);bottom:auto;left:auto;transform:translateY(-50%)}.tooltip.is-left.is-white:before{border-left:5px solid #fff}.tooltip.is-left.is-black:before,.tooltip.is-left.is-white:before{border-top:5px solid transparent;border-bottom:5px solid transparent;right:calc(100% + 2px)}.tooltip.is-left.is-black:before{border-left:5px solid #0a0a0a}.tooltip.is-left.is-light:before{border-left:5px solid #f5f5f5}.tooltip.is-left.is-dark:before,.tooltip.is-left.is-light:before{border-top:5px solid transparent;border-bottom:5px solid transparent;right:calc(100% + 2px)}.tooltip.is-left.is-dark:before{border-left:5px solid #363636}.tooltip.is-left.is-link:before,.tooltip.is-left.is-primary:before{border-top:5px solid transparent;border-bottom:5px solid transparent;border-left:5px solid #7957d5;right:calc(100% + 2px)}.tooltip.is-left.is-info:before{border-left:5px solid #167df0}.tooltip.is-left.is-info:before,.tooltip.is-left.is-success:before{border-top:5px solid transparent;border-bottom:5px solid transparent;right:calc(100% + 2px)}.tooltip.is-left.is-success:before{border-left:5px solid #23d160}.tooltip.is-left.is-warning:before{border-left:5px solid #ffdd57}.tooltip.is-left.is-danger:before,.tooltip.is-left.is-warning:before{border-top:5px solid transparent;border-bottom:5px solid transparent;right:calc(100% + 2px)}.tooltip.is-left.is-danger:before{border-left:5px solid #ff3860}.tooltip.is-left.is-multiline.is-small:after{width:180px}.tooltip.is-left.is-multiline.is-medium:after{width:240px}.tooltip.is-left.is-multiline.is-large:after{width:300px}.tooltip:after,.tooltip:before{position:absolute;content:\"\";opacity:0;visibility:hidden;pointer-events:none}.tooltip:before{z-index:889}.tooltip:after{content:attr(data-label);width:auto;padding:.35rem .75rem;border-radius:6px;font-size:.85rem;font-weight:400;box-shadow:0 1px 2px 1px rgba(0,1,0,.2);z-index:888;white-space:nowrap}.tooltip:not([data-label=\"\"]):hover:after,.tooltip:not([data-label=\"\"]):hover:before{opacity:1;visibility:visible}.tooltip.is-white:after{background:#fff;color:#0a0a0a}.tooltip.is-black:after{background:#0a0a0a;color:#fff}.tooltip.is-light:after{background:#f5f5f5;color:#363636}.tooltip.is-dark:after{background:#363636;color:#f5f5f5}.tooltip.is-link:after,.tooltip.is-primary:after{background:#7957d5;color:#fff}.tooltip.is-info:after{background:#167df0;color:#fff}.tooltip.is-success:after{background:#23d160;color:#fff}.tooltip.is-warning:after{background:#ffdd57;color:rgba(0,0,0,.7)}.tooltip.is-danger:after{background:#ff3860;color:#fff}.tooltip:not([data-label=\"\"]).is-always:after,.tooltip:not([data-label=\"\"]).is-always:before{opacity:1;visibility:visible}.tooltip.is-multiline:after{display:flex-block;text-align:center;white-space:normal}.tooltip.is-dashed{border-bottom:1px dashed #b5b5b5;cursor:default}.tooltip.is-square:after{border-radius:0}.tooltip.is-animated:after,.tooltip.is-animated:before{transition:opacity 86ms ease-out,visibility 86ms ease-out}.upload{position:relative}.upload input[type=file]{position:absolute;top:0;left:0;width:100%;opacity:0;outline:none;z-index:-1}.upload .upload-draggable{display:inline-block;cursor:pointer;padding:.25em;border:1px dashed #b5b5b5;border-radius:6px}.upload .upload-draggable.is-disabled{opacity:.5;cursor:not-allowed}.upload .upload-draggable.is-loading{position:relative;pointer-events:none;opacity:.5}.upload .upload-draggable.is-loading:after{animation:spinAround .5s infinite linear;border:2px solid #dbdbdb;border-radius:290486px;border-right-color:transparent;border-top-color:transparent;content:\"\";display:block;height:1em;position:relative;width:1em;top:0;left:calc(50% - 1.5em);width:3em;height:3em;border-width:.25em}.upload .upload-draggable.is-hovered.is-white,.upload .upload-draggable:hover.is-white{border-color:#fff;background:hsla(0,0%,100%,.05)}.upload .upload-draggable.is-hovered.is-black,.upload .upload-draggable:hover.is-black{border-color:#0a0a0a;background:hsla(0,0%,4%,.05)}.upload .upload-draggable.is-hovered.is-light,.upload .upload-draggable:hover.is-light{border-color:#f5f5f5;background:hsla(0,0%,96%,.05)}.upload .upload-draggable.is-hovered.is-dark,.upload .upload-draggable:hover.is-dark{border-color:#363636;background:rgba(54,54,54,.05)}.upload .upload-draggable.is-hovered.is-link,.upload .upload-draggable.is-hovered.is-primary,.upload .upload-draggable:hover.is-link,.upload .upload-draggable:hover.is-primary{border-color:#7957d5;background:rgba(121,87,213,.05)}.upload .upload-draggable.is-hovered.is-info,.upload .upload-draggable:hover.is-info{border-color:#167df0;background:rgba(22,125,240,.05)}.upload .upload-draggable.is-hovered.is-success,.upload .upload-draggable:hover.is-success{border-color:#23d160;background:rgba(35,209,96,.05)}.upload .upload-draggable.is-hovered.is-warning,.upload .upload-draggable:hover.is-warning{border-color:#ffdd57;background:rgba(255,221,87,.05)}.upload .upload-draggable.is-hovered.is-danger,.upload .upload-draggable:hover.is-danger{border-color:#ff3860;background:rgba(255,56,96,.05)}";
	styleInject(css);

	var css$1 = ".mi{font-family:\"Material Icons\";font-weight:normal;font-style:normal;font-size:24px;display:inline-block;line-height:1;text-transform:none;letter-spacing:normal;word-wrap:normal;white-space:nowrap;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:'liga'}.mi-3d-rotation:before{content:\"\\e84d\"}.mi-ac-unit:before{content:\"\\eb3b\"}.mi-access-alarm:before{content:\"\\e190\"}.mi-access-alarms:before{content:\"\\e191\"}.mi-access-time:before{content:\"\\e192\"}.mi-accessibility:before{content:\"\\e84e\"}.mi-accessible:before{content:\"\\e914\"}.mi-account-balance:before{content:\"\\e84f\"}.mi-account-balance-wallet:before{content:\"\\e850\"}.mi-account-box:before{content:\"\\e851\"}.mi-account-circle:before{content:\"\\e853\"}.mi-adb:before{content:\"\\e60e\"}.mi-add:before{content:\"\\e145\"}.mi-add-a-photo:before{content:\"\\e439\"}.mi-add-alarm:before{content:\"\\e193\"}.mi-add-alert:before{content:\"\\e003\"}.mi-add-box:before{content:\"\\e146\"}.mi-add-circle:before{content:\"\\e147\"}.mi-add-circle-outline:before{content:\"\\e148\"}.mi-add-location:before{content:\"\\e567\"}.mi-add-shopping-cart:before{content:\"\\e854\"}.mi-add-to-photos:before{content:\"\\e39d\"}.mi-add-to-queue:before{content:\"\\e05c\"}.mi-adjust:before{content:\"\\e39e\"}.mi-airline-seat-flat:before{content:\"\\e630\"}.mi-airline-seat-flat-angled:before{content:\"\\e631\"}.mi-airline-seat-individual-suite:before{content:\"\\e632\"}.mi-airline-seat-legroom-extra:before{content:\"\\e633\"}.mi-airline-seat-legroom-normal:before{content:\"\\e634\"}.mi-airline-seat-legroom-reduced:before{content:\"\\e635\"}.mi-airline-seat-recline-extra:before{content:\"\\e636\"}.mi-airline-seat-recline-normal:before{content:\"\\e637\"}.mi-airplanemode-active:before{content:\"\\e195\"}.mi-airplanemode-inactive:before{content:\"\\e194\"}.mi-airplay:before{content:\"\\e055\"}.mi-airport-shuttle:before{content:\"\\eb3c\"}.mi-alarm:before{content:\"\\e855\"}.mi-alarm-add:before{content:\"\\e856\"}.mi-alarm-off:before{content:\"\\e857\"}.mi-alarm-on:before{content:\"\\e858\"}.mi-album:before{content:\"\\e019\"}.mi-all-inclusive:before{content:\"\\eb3d\"}.mi-all-out:before{content:\"\\e90b\"}.mi-android:before{content:\"\\e859\"}.mi-announcement:before{content:\"\\e85a\"}.mi-apps:before{content:\"\\e5c3\"}.mi-archive:before{content:\"\\e149\"}.mi-arrow-back:before{content:\"\\e5c4\"}.mi-arrow-downward:before{content:\"\\e5db\"}.mi-arrow-drop-down:before{content:\"\\e5c5\"}.mi-arrow-drop-down-circle:before{content:\"\\e5c6\"}.mi-arrow-drop-up:before{content:\"\\e5c7\"}.mi-arrow-forward:before{content:\"\\e5c8\"}.mi-arrow-upward:before{content:\"\\e5d8\"}.mi-art-track:before{content:\"\\e060\"}.mi-aspect-ratio:before{content:\"\\e85b\"}.mi-assessment:before{content:\"\\e85c\"}.mi-assignment:before{content:\"\\e85d\"}.mi-assignment-ind:before{content:\"\\e85e\"}.mi-assignment-late:before{content:\"\\e85f\"}.mi-assignment-return:before{content:\"\\e860\"}.mi-assignment-returned:before{content:\"\\e861\"}.mi-assignment-turned-in:before{content:\"\\e862\"}.mi-assistant:before{content:\"\\e39f\"}.mi-assistant-photo:before{content:\"\\e3a0\"}.mi-attach-file:before{content:\"\\e226\"}.mi-attach-money:before{content:\"\\e227\"}.mi-attachment:before{content:\"\\e2bc\"}.mi-audiotrack:before{content:\"\\e3a1\"}.mi-autorenew:before{content:\"\\e863\"}.mi-av-timer:before{content:\"\\e01b\"}.mi-backspace:before{content:\"\\e14a\"}.mi-backup:before{content:\"\\e864\"}.mi-battery-alert:before{content:\"\\e19c\"}.mi-battery-charging-full:before{content:\"\\e1a3\"}.mi-battery-full:before{content:\"\\e1a4\"}.mi-battery-std:before{content:\"\\e1a5\"}.mi-battery-unknown:before{content:\"\\e1a6\"}.mi-beach-access:before{content:\"\\eb3e\"}.mi-beenhere:before{content:\"\\e52d\"}.mi-block:before{content:\"\\e14b\"}.mi-bluetooth:before{content:\"\\e1a7\"}.mi-bluetooth-audio:before{content:\"\\e60f\"}.mi-bluetooth-connected:before{content:\"\\e1a8\"}.mi-bluetooth-disabled:before{content:\"\\e1a9\"}.mi-bluetooth-searching:before{content:\"\\e1aa\"}.mi-blur-circular:before{content:\"\\e3a2\"}.mi-blur-linear:before{content:\"\\e3a3\"}.mi-blur-off:before{content:\"\\e3a4\"}.mi-blur-on:before{content:\"\\e3a5\"}.mi-book:before{content:\"\\e865\"}.mi-bookmark:before{content:\"\\e866\"}.mi-bookmark-border:before{content:\"\\e867\"}.mi-border-all:before{content:\"\\e228\"}.mi-border-bottom:before{content:\"\\e229\"}.mi-border-clear:before{content:\"\\e22a\"}.mi-border-color:before{content:\"\\e22b\"}.mi-border-horizontal:before{content:\"\\e22c\"}.mi-border-inner:before{content:\"\\e22d\"}.mi-border-left:before{content:\"\\e22e\"}.mi-border-outer:before{content:\"\\e22f\"}.mi-border-right:before{content:\"\\e230\"}.mi-border-style:before{content:\"\\e231\"}.mi-border-top:before{content:\"\\e232\"}.mi-border-vertical:before{content:\"\\e233\"}.mi-branding-watermark:before{content:\"\\e06b\"}.mi-brightness-1:before{content:\"\\e3a6\"}.mi-brightness-2:before{content:\"\\e3a7\"}.mi-brightness-3:before{content:\"\\e3a8\"}.mi-brightness-4:before{content:\"\\e3a9\"}.mi-brightness-5:before{content:\"\\e3aa\"}.mi-brightness-6:before{content:\"\\e3ab\"}.mi-brightness-7:before{content:\"\\e3ac\"}.mi-brightness-auto:before{content:\"\\e1ab\"}.mi-brightness-high:before{content:\"\\e1ac\"}.mi-brightness-low:before{content:\"\\e1ad\"}.mi-brightness-medium:before{content:\"\\e1ae\"}.mi-broken-image:before{content:\"\\e3ad\"}.mi-brush:before{content:\"\\e3ae\"}.mi-bubble-chart:before{content:\"\\e6dd\"}.mi-bug-report:before{content:\"\\e868\"}.mi-build:before{content:\"\\e869\"}.mi-burst-mode:before{content:\"\\e43c\"}.mi-business:before{content:\"\\e0af\"}.mi-business-center:before{content:\"\\eb3f\"}.mi-cached:before{content:\"\\e86a\"}.mi-cake:before{content:\"\\e7e9\"}.mi-call:before{content:\"\\e0b0\"}.mi-call-end:before{content:\"\\e0b1\"}.mi-call-made:before{content:\"\\e0b2\"}.mi-call-merge:before{content:\"\\e0b3\"}.mi-call-missed:before{content:\"\\e0b4\"}.mi-call-missed-outgoing:before{content:\"\\e0e4\"}.mi-call-received:before{content:\"\\e0b5\"}.mi-call-split:before{content:\"\\e0b6\"}.mi-call-to-action:before{content:\"\\e06c\"}.mi-camera:before{content:\"\\e3af\"}.mi-camera-alt:before{content:\"\\e3b0\"}.mi-camera-enhance:before{content:\"\\e8fc\"}.mi-camera-front:before{content:\"\\e3b1\"}.mi-camera-rear:before{content:\"\\e3b2\"}.mi-camera-roll:before{content:\"\\e3b3\"}.mi-cancel:before{content:\"\\e5c9\"}.mi-card-giftcard:before{content:\"\\e8f6\"}.mi-card-membership:before{content:\"\\e8f7\"}.mi-card-travel:before{content:\"\\e8f8\"}.mi-casino:before{content:\"\\eb40\"}.mi-cast:before{content:\"\\e307\"}.mi-cast-connected:before{content:\"\\e308\"}.mi-center-focus-strong:before{content:\"\\e3b4\"}.mi-center-focus-weak:before{content:\"\\e3b5\"}.mi-change-history:before{content:\"\\e86b\"}.mi-chat:before{content:\"\\e0b7\"}.mi-chat-bubble:before{content:\"\\e0ca\"}.mi-chat-bubble-outline:before{content:\"\\e0cb\"}.mi-check:before{content:\"\\e5ca\"}.mi-check-box:before{content:\"\\e834\"}.mi-check-box-outline-blank:before{content:\"\\e835\"}.mi-check-circle:before{content:\"\\e86c\"}.mi-chevron-left:before{content:\"\\e5cb\"}.mi-chevron-right:before{content:\"\\e5cc\"}.mi-child-care:before{content:\"\\eb41\"}.mi-child-friendly:before{content:\"\\eb42\"}.mi-chrome-reader-mode:before{content:\"\\e86d\"}.mi-class:before{content:\"\\e86e\"}.mi-clear:before{content:\"\\e14c\"}.mi-clear-all:before{content:\"\\e0b8\"}.mi-close:before{content:\"\\e5cd\"}.mi-closed-caption:before{content:\"\\e01c\"}.mi-cloud:before{content:\"\\e2bd\"}.mi-cloud-circle:before{content:\"\\e2be\"}.mi-cloud-done:before{content:\"\\e2bf\"}.mi-cloud-download:before{content:\"\\e2c0\"}.mi-cloud-off:before{content:\"\\e2c1\"}.mi-cloud-queue:before{content:\"\\e2c2\"}.mi-cloud-upload:before{content:\"\\e2c3\"}.mi-code:before{content:\"\\e86f\"}.mi-collections:before{content:\"\\e3b6\"}.mi-collections-bookmark:before{content:\"\\e431\"}.mi-color-lens:before{content:\"\\e3b7\"}.mi-colorize:before{content:\"\\e3b8\"}.mi-comment:before{content:\"\\e0b9\"}.mi-compare:before{content:\"\\e3b9\"}.mi-compare-arrows:before{content:\"\\e915\"}.mi-computer:before{content:\"\\e30a\"}.mi-confirmation-number:before{content:\"\\e638\"}.mi-contact-mail:before{content:\"\\e0d0\"}.mi-contact-phone:before{content:\"\\e0cf\"}.mi-contacts:before{content:\"\\e0ba\"}.mi-content-copy:before{content:\"\\e14d\"}.mi-content-cut:before{content:\"\\e14e\"}.mi-content-paste:before{content:\"\\e14f\"}.mi-control-point:before{content:\"\\e3ba\"}.mi-control-point-duplicate:before{content:\"\\e3bb\"}.mi-copyright:before{content:\"\\e90c\"}.mi-create:before{content:\"\\e150\"}.mi-create-new-folder:before{content:\"\\e2cc\"}.mi-credit-card:before{content:\"\\e870\"}.mi-crop:before{content:\"\\e3be\"}.mi-crop-16-9:before{content:\"\\e3bc\"}.mi-crop-3-2:before{content:\"\\e3bd\"}.mi-crop-5-4:before{content:\"\\e3bf\"}.mi-crop-7-5:before{content:\"\\e3c0\"}.mi-crop-din:before{content:\"\\e3c1\"}.mi-crop-free:before{content:\"\\e3c2\"}.mi-crop-landscape:before{content:\"\\e3c3\"}.mi-crop-original:before{content:\"\\e3c4\"}.mi-crop-portrait:before{content:\"\\e3c5\"}.mi-crop-rotate:before{content:\"\\e437\"}.mi-crop-square:before{content:\"\\e3c6\"}.mi-dashboard:before{content:\"\\e871\"}.mi-data-usage:before{content:\"\\e1af\"}.mi-date-range:before{content:\"\\e916\"}.mi-dehaze:before{content:\"\\e3c7\"}.mi-delete:before{content:\"\\e872\"}.mi-delete-forever:before{content:\"\\e92b\"}.mi-delete-sweep:before{content:\"\\e16c\"}.mi-description:before{content:\"\\e873\"}.mi-desktop-mac:before{content:\"\\e30b\"}.mi-desktop-windows:before{content:\"\\e30c\"}.mi-details:before{content:\"\\e3c8\"}.mi-developer-board:before{content:\"\\e30d\"}.mi-developer-mode:before{content:\"\\e1b0\"}.mi-device-hub:before{content:\"\\e335\"}.mi-devices:before{content:\"\\e1b1\"}.mi-devices-other:before{content:\"\\e337\"}.mi-dialer-sip:before{content:\"\\e0bb\"}.mi-dialpad:before{content:\"\\e0bc\"}.mi-directions:before{content:\"\\e52e\"}.mi-directions-bike:before{content:\"\\e52f\"}.mi-directions-boat:before{content:\"\\e532\"}.mi-directions-bus:before{content:\"\\e530\"}.mi-directions-car:before{content:\"\\e531\"}.mi-directions-railway:before{content:\"\\e534\"}.mi-directions-run:before{content:\"\\e566\"}.mi-directions-subway:before{content:\"\\e533\"}.mi-directions-transit:before{content:\"\\e535\"}.mi-directions-walk:before{content:\"\\e536\"}.mi-disc-full:before{content:\"\\e610\"}.mi-dns:before{content:\"\\e875\"}.mi-do-not-disturb:before{content:\"\\e612\"}.mi-do-not-disturb-alt:before{content:\"\\e611\"}.mi-do-not-disturb-off:before{content:\"\\e643\"}.mi-do-not-disturb-on:before{content:\"\\e644\"}.mi-dock:before{content:\"\\e30e\"}.mi-domain:before{content:\"\\e7ee\"}.mi-done:before{content:\"\\e876\"}.mi-done-all:before{content:\"\\e877\"}.mi-donut-large:before{content:\"\\e917\"}.mi-donut-small:before{content:\"\\e918\"}.mi-drafts:before{content:\"\\e151\"}.mi-drag-handle:before{content:\"\\e25d\"}.mi-drive-eta:before{content:\"\\e613\"}.mi-dvr:before{content:\"\\e1b2\"}.mi-edit:before{content:\"\\e3c9\"}.mi-edit-location:before{content:\"\\e568\"}.mi-eject:before{content:\"\\e8fb\"}.mi-email:before{content:\"\\e0be\"}.mi-enhanced-encryption:before{content:\"\\e63f\"}.mi-equalizer:before{content:\"\\e01d\"}.mi-error:before{content:\"\\e000\"}.mi-error-outline:before{content:\"\\e001\"}.mi-euro-symbol:before{content:\"\\e926\"}.mi-ev-station:before{content:\"\\e56d\"}.mi-event:before{content:\"\\e878\"}.mi-event-available:before{content:\"\\e614\"}.mi-event-busy:before{content:\"\\e615\"}.mi-event-note:before{content:\"\\e616\"}.mi-event-seat:before{content:\"\\e903\"}.mi-exit-to-app:before{content:\"\\e879\"}.mi-expand-less:before{content:\"\\e5ce\"}.mi-expand-more:before{content:\"\\e5cf\"}.mi-explicit:before{content:\"\\e01e\"}.mi-explore:before{content:\"\\e87a\"}.mi-exposure:before{content:\"\\e3ca\"}.mi-exposure-neg-1:before{content:\"\\e3cb\"}.mi-exposure-neg-2:before{content:\"\\e3cc\"}.mi-exposure-plus-1:before{content:\"\\e3cd\"}.mi-exposure-plus-2:before{content:\"\\e3ce\"}.mi-exposure-zero:before{content:\"\\e3cf\"}.mi-extension:before{content:\"\\e87b\"}.mi-face:before{content:\"\\e87c\"}.mi-fast-forward:before{content:\"\\e01f\"}.mi-fast-rewind:before{content:\"\\e020\"}.mi-favorite:before{content:\"\\e87d\"}.mi-favorite-border:before{content:\"\\e87e\"}.mi-featured-play-list:before{content:\"\\e06d\"}.mi-featured-video:before{content:\"\\e06e\"}.mi-feedback:before{content:\"\\e87f\"}.mi-fiber-dvr:before{content:\"\\e05d\"}.mi-fiber-manual-record:before{content:\"\\e061\"}.mi-fiber-new:before{content:\"\\e05e\"}.mi-fiber-pin:before{content:\"\\e06a\"}.mi-fiber-smart-record:before{content:\"\\e062\"}.mi-file-download:before{content:\"\\e2c4\"}.mi-file-upload:before{content:\"\\e2c6\"}.mi-filter:before{content:\"\\e3d3\"}.mi-filter-1:before{content:\"\\e3d0\"}.mi-filter-2:before{content:\"\\e3d1\"}.mi-filter-3:before{content:\"\\e3d2\"}.mi-filter-4:before{content:\"\\e3d4\"}.mi-filter-5:before{content:\"\\e3d5\"}.mi-filter-6:before{content:\"\\e3d6\"}.mi-filter-7:before{content:\"\\e3d7\"}.mi-filter-8:before{content:\"\\e3d8\"}.mi-filter-9:before{content:\"\\e3d9\"}.mi-filter-9-plus:before{content:\"\\e3da\"}.mi-filter-b-and-w:before{content:\"\\e3db\"}.mi-filter-center-focus:before{content:\"\\e3dc\"}.mi-filter-drama:before{content:\"\\e3dd\"}.mi-filter-frames:before{content:\"\\e3de\"}.mi-filter-hdr:before{content:\"\\e3df\"}.mi-filter-list:before{content:\"\\e152\"}.mi-filter-none:before{content:\"\\e3e0\"}.mi-filter-tilt-shift:before{content:\"\\e3e2\"}.mi-filter-vintage:before{content:\"\\e3e3\"}.mi-find-in-page:before{content:\"\\e880\"}.mi-find-replace:before{content:\"\\e881\"}.mi-fingerprint:before{content:\"\\e90d\"}.mi-first-page:before{content:\"\\e5dc\"}.mi-fitness-center:before{content:\"\\eb43\"}.mi-flag:before{content:\"\\e153\"}.mi-flare:before{content:\"\\e3e4\"}.mi-flash-auto:before{content:\"\\e3e5\"}.mi-flash-off:before{content:\"\\e3e6\"}.mi-flash-on:before{content:\"\\e3e7\"}.mi-flight:before{content:\"\\e539\"}.mi-flight-land:before{content:\"\\e904\"}.mi-flight-takeoff:before{content:\"\\e905\"}.mi-flip:before{content:\"\\e3e8\"}.mi-flip-to-back:before{content:\"\\e882\"}.mi-flip-to-front:before{content:\"\\e883\"}.mi-folder:before{content:\"\\e2c7\"}.mi-folder-open:before{content:\"\\e2c8\"}.mi-folder-shared:before{content:\"\\e2c9\"}.mi-folder-special:before{content:\"\\e617\"}.mi-font-download:before{content:\"\\e167\"}.mi-format-align-center:before{content:\"\\e234\"}.mi-format-align-justify:before{content:\"\\e235\"}.mi-format-align-left:before{content:\"\\e236\"}.mi-format-align-right:before{content:\"\\e237\"}.mi-format-bold:before{content:\"\\e238\"}.mi-format-clear:before{content:\"\\e239\"}.mi-format-color-fill:before{content:\"\\e23a\"}.mi-format-color-reset:before{content:\"\\e23b\"}.mi-format-color-text:before{content:\"\\e23c\"}.mi-format-indent-decrease:before{content:\"\\e23d\"}.mi-format-indent-increase:before{content:\"\\e23e\"}.mi-format-italic:before{content:\"\\e23f\"}.mi-format-line-spacing:before{content:\"\\e240\"}.mi-format-list-bulleted:before{content:\"\\e241\"}.mi-format-list-numbered:before{content:\"\\e242\"}.mi-format-paint:before{content:\"\\e243\"}.mi-format-quote:before{content:\"\\e244\"}.mi-format-shapes:before{content:\"\\e25e\"}.mi-format-size:before{content:\"\\e245\"}.mi-format-strikethrough:before{content:\"\\e246\"}.mi-format-textdirection-l-to-r:before{content:\"\\e247\"}.mi-format-textdirection-r-to-l:before{content:\"\\e248\"}.mi-format-underlined:before{content:\"\\e249\"}.mi-forum:before{content:\"\\e0bf\"}.mi-forward:before{content:\"\\e154\"}.mi-forward-10:before{content:\"\\e056\"}.mi-forward-30:before{content:\"\\e057\"}.mi-forward-5:before{content:\"\\e058\"}.mi-free-breakfast:before{content:\"\\eb44\"}.mi-fullscreen:before{content:\"\\e5d0\"}.mi-fullscreen-exit:before{content:\"\\e5d1\"}.mi-functions:before{content:\"\\e24a\"}.mi-g-translate:before{content:\"\\e927\"}.mi-gamepad:before{content:\"\\e30f\"}.mi-games:before{content:\"\\e021\"}.mi-gavel:before{content:\"\\e90e\"}.mi-gesture:before{content:\"\\e155\"}.mi-get-app:before{content:\"\\e884\"}.mi-gif:before{content:\"\\e908\"}.mi-golf-course:before{content:\"\\eb45\"}.mi-gps-fixed:before{content:\"\\e1b3\"}.mi-gps-not-fixed:before{content:\"\\e1b4\"}.mi-gps-off:before{content:\"\\e1b5\"}.mi-grade:before{content:\"\\e885\"}.mi-gradient:before{content:\"\\e3e9\"}.mi-grain:before{content:\"\\e3ea\"}.mi-graphic-eq:before{content:\"\\e1b8\"}.mi-grid-off:before{content:\"\\e3eb\"}.mi-grid-on:before{content:\"\\e3ec\"}.mi-group:before{content:\"\\e7ef\"}.mi-group-add:before{content:\"\\e7f0\"}.mi-group-work:before{content:\"\\e886\"}.mi-hd:before{content:\"\\e052\"}.mi-hdr-off:before{content:\"\\e3ed\"}.mi-hdr-on:before{content:\"\\e3ee\"}.mi-hdr-strong:before{content:\"\\e3f1\"}.mi-hdr-weak:before{content:\"\\e3f2\"}.mi-headset:before{content:\"\\e310\"}.mi-headset-mic:before{content:\"\\e311\"}.mi-healing:before{content:\"\\e3f3\"}.mi-hearing:before{content:\"\\e023\"}.mi-help:before{content:\"\\e887\"}.mi-help-outline:before{content:\"\\e8fd\"}.mi-high-quality:before{content:\"\\e024\"}.mi-highlight:before{content:\"\\e25f\"}.mi-highlight-off:before{content:\"\\e888\"}.mi-history:before{content:\"\\e889\"}.mi-home:before{content:\"\\e88a\"}.mi-hot-tub:before{content:\"\\eb46\"}.mi-hotel:before{content:\"\\e53a\"}.mi-hourglass-empty:before{content:\"\\e88b\"}.mi-hourglass-full:before{content:\"\\e88c\"}.mi-http:before{content:\"\\e902\"}.mi-https:before{content:\"\\e88d\"}.mi-image:before{content:\"\\e3f4\"}.mi-image-aspect-ratio:before{content:\"\\e3f5\"}.mi-import-contacts:before{content:\"\\e0e0\"}.mi-import-export:before{content:\"\\e0c3\"}.mi-important-devices:before{content:\"\\e912\"}.mi-inbox:before{content:\"\\e156\"}.mi-indeterminate-check-box:before{content:\"\\e909\"}.mi-info:before{content:\"\\e88e\"}.mi-info-outline:before{content:\"\\e88f\"}.mi-input:before{content:\"\\e890\"}.mi-insert-chart:before{content:\"\\e24b\"}.mi-insert-comment:before{content:\"\\e24c\"}.mi-insert-drive-file:before{content:\"\\e24d\"}.mi-insert-emoticon:before{content:\"\\e24e\"}.mi-insert-invitation:before{content:\"\\e24f\"}.mi-insert-link:before{content:\"\\e250\"}.mi-insert-photo:before{content:\"\\e251\"}.mi-invert-colors:before{content:\"\\e891\"}.mi-invert-colors-off:before{content:\"\\e0c4\"}.mi-iso:before{content:\"\\e3f6\"}.mi-keyboard:before{content:\"\\e312\"}.mi-keyboard-arrow-down:before{content:\"\\e313\"}.mi-keyboard-arrow-left:before{content:\"\\e314\"}.mi-keyboard-arrow-right:before{content:\"\\e315\"}.mi-keyboard-arrow-up:before{content:\"\\e316\"}.mi-keyboard-backspace:before{content:\"\\e317\"}.mi-keyboard-capslock:before{content:\"\\e318\"}.mi-keyboard-hide:before{content:\"\\e31a\"}.mi-keyboard-return:before{content:\"\\e31b\"}.mi-keyboard-tab:before{content:\"\\e31c\"}.mi-keyboard-voice:before{content:\"\\e31d\"}.mi-kitchen:before{content:\"\\eb47\"}.mi-label:before{content:\"\\e892\"}.mi-label-outline:before{content:\"\\e893\"}.mi-landscape:before{content:\"\\e3f7\"}.mi-language:before{content:\"\\e894\"}.mi-laptop:before{content:\"\\e31e\"}.mi-laptop-chromebook:before{content:\"\\e31f\"}.mi-laptop-mac:before{content:\"\\e320\"}.mi-laptop-windows:before{content:\"\\e321\"}.mi-last-page:before{content:\"\\e5dd\"}.mi-launch:before{content:\"\\e895\"}.mi-layers:before{content:\"\\e53b\"}.mi-layers-clear:before{content:\"\\e53c\"}.mi-leak-add:before{content:\"\\e3f8\"}.mi-leak-remove:before{content:\"\\e3f9\"}.mi-lens:before{content:\"\\e3fa\"}.mi-library-add:before{content:\"\\e02e\"}.mi-library-books:before{content:\"\\e02f\"}.mi-library-music:before{content:\"\\e030\"}.mi-lightbulb-outline:before{content:\"\\e90f\"}.mi-line-style:before{content:\"\\e919\"}.mi-line-weight:before{content:\"\\e91a\"}.mi-linear-scale:before{content:\"\\e260\"}.mi-link:before{content:\"\\e157\"}.mi-linked-camera:before{content:\"\\e438\"}.mi-list:before{content:\"\\e896\"}.mi-live-help:before{content:\"\\e0c6\"}.mi-live-tv:before{content:\"\\e639\"}.mi-local-activity:before{content:\"\\e53f\"}.mi-local-airport:before{content:\"\\e53d\"}.mi-local-atm:before{content:\"\\e53e\"}.mi-local-bar:before{content:\"\\e540\"}.mi-local-cafe:before{content:\"\\e541\"}.mi-local-car-wash:before{content:\"\\e542\"}.mi-local-convenience-store:before{content:\"\\e543\"}.mi-local-dining:before{content:\"\\e556\"}.mi-local-drink:before{content:\"\\e544\"}.mi-local-florist:before{content:\"\\e545\"}.mi-local-gas-station:before{content:\"\\e546\"}.mi-local-grocery-store:before{content:\"\\e547\"}.mi-local-hospital:before{content:\"\\e548\"}.mi-local-hotel:before{content:\"\\e549\"}.mi-local-laundry-service:before{content:\"\\e54a\"}.mi-local-library:before{content:\"\\e54b\"}.mi-local-mall:before{content:\"\\e54c\"}.mi-local-movies:before{content:\"\\e54d\"}.mi-local-offer:before{content:\"\\e54e\"}.mi-local-parking:before{content:\"\\e54f\"}.mi-local-pharmacy:before{content:\"\\e550\"}.mi-local-phone:before{content:\"\\e551\"}.mi-local-pizza:before{content:\"\\e552\"}.mi-local-play:before{content:\"\\e553\"}.mi-local-post-office:before{content:\"\\e554\"}.mi-local-printshop:before{content:\"\\e555\"}.mi-local-see:before{content:\"\\e557\"}.mi-local-shipping:before{content:\"\\e558\"}.mi-local-taxi:before{content:\"\\e559\"}.mi-location-city:before{content:\"\\e7f1\"}.mi-location-disabled:before{content:\"\\e1b6\"}.mi-location-off:before{content:\"\\e0c7\"}.mi-location-on:before{content:\"\\e0c8\"}.mi-location-searching:before{content:\"\\e1b7\"}.mi-lock:before{content:\"\\e897\"}.mi-lock-open:before{content:\"\\e898\"}.mi-lock-outline:before{content:\"\\e899\"}.mi-looks:before{content:\"\\e3fc\"}.mi-looks-3:before{content:\"\\e3fb\"}.mi-looks-4:before{content:\"\\e3fd\"}.mi-looks-5:before{content:\"\\e3fe\"}.mi-looks-6:before{content:\"\\e3ff\"}.mi-looks-one:before{content:\"\\e400\"}.mi-looks-two:before{content:\"\\e401\"}.mi-loop:before{content:\"\\e028\"}.mi-loupe:before{content:\"\\e402\"}.mi-low-priority:before{content:\"\\e16d\"}.mi-loyalty:before{content:\"\\e89a\"}.mi-mail:before{content:\"\\e158\"}.mi-mail-outline:before{content:\"\\e0e1\"}.mi-map:before{content:\"\\e55b\"}.mi-markunread:before{content:\"\\e159\"}.mi-markunread-mailbox:before{content:\"\\e89b\"}.mi-memory:before{content:\"\\e322\"}.mi-menu:before{content:\"\\e5d2\"}.mi-merge-type:before{content:\"\\e252\"}.mi-message:before{content:\"\\e0c9\"}.mi-mic:before{content:\"\\e029\"}.mi-mic-none:before{content:\"\\e02a\"}.mi-mic-off:before{content:\"\\e02b\"}.mi-mms:before{content:\"\\e618\"}.mi-mode-comment:before{content:\"\\e253\"}.mi-mode-edit:before{content:\"\\e254\"}.mi-monetization-on:before{content:\"\\e263\"}.mi-money-off:before{content:\"\\e25c\"}.mi-monochrome-photos:before{content:\"\\e403\"}.mi-mood:before{content:\"\\e7f2\"}.mi-mood-bad:before{content:\"\\e7f3\"}.mi-more:before{content:\"\\e619\"}.mi-more-horiz:before{content:\"\\e5d3\"}.mi-more-vert:before{content:\"\\e5d4\"}.mi-motorcycle:before{content:\"\\e91b\"}.mi-mouse:before{content:\"\\e323\"}.mi-move-to-inbox:before{content:\"\\e168\"}.mi-movie:before{content:\"\\e02c\"}.mi-movie-creation:before{content:\"\\e404\"}.mi-movie-filter:before{content:\"\\e43a\"}.mi-multiline-chart:before{content:\"\\e6df\"}.mi-music-note:before{content:\"\\e405\"}.mi-music-video:before{content:\"\\e063\"}.mi-my-location:before{content:\"\\e55c\"}.mi-nature:before{content:\"\\e406\"}.mi-nature-people:before{content:\"\\e407\"}.mi-navigate-before:before{content:\"\\e408\"}.mi-navigate-next:before{content:\"\\e409\"}.mi-navigation:before{content:\"\\e55d\"}.mi-near-me:before{content:\"\\e569\"}.mi-network-cell:before{content:\"\\e1b9\"}.mi-network-check:before{content:\"\\e640\"}.mi-network-locked:before{content:\"\\e61a\"}.mi-network-wifi:before{content:\"\\e1ba\"}.mi-new-releases:before{content:\"\\e031\"}.mi-next-week:before{content:\"\\e16a\"}.mi-nfc:before{content:\"\\e1bb\"}.mi-no-encryption:before{content:\"\\e641\"}.mi-no-sim:before{content:\"\\e0cc\"}.mi-not-interested:before{content:\"\\e033\"}.mi-note:before{content:\"\\e06f\"}.mi-note-add:before{content:\"\\e89c\"}.mi-notifications:before{content:\"\\e7f4\"}.mi-notifications-active:before{content:\"\\e7f7\"}.mi-notifications-none:before{content:\"\\e7f5\"}.mi-notifications-off:before{content:\"\\e7f6\"}.mi-notifications-paused:before{content:\"\\e7f8\"}.mi-offline-pin:before{content:\"\\e90a\"}.mi-ondemand-video:before{content:\"\\e63a\"}.mi-opacity:before{content:\"\\e91c\"}.mi-open-in-browser:before{content:\"\\e89d\"}.mi-open-in-new:before{content:\"\\e89e\"}.mi-open-with:before{content:\"\\e89f\"}.mi-pages:before{content:\"\\e7f9\"}.mi-pageview:before{content:\"\\e8a0\"}.mi-palette:before{content:\"\\e40a\"}.mi-pan-tool:before{content:\"\\e925\"}.mi-panorama:before{content:\"\\e40b\"}.mi-panorama-fish-eye:before{content:\"\\e40c\"}.mi-panorama-horizontal:before{content:\"\\e40d\"}.mi-panorama-vertical:before{content:\"\\e40e\"}.mi-panorama-wide-angle:before{content:\"\\e40f\"}.mi-party-mode:before{content:\"\\e7fa\"}.mi-pause:before{content:\"\\e034\"}.mi-pause-circle-filled:before{content:\"\\e035\"}.mi-pause-circle-outline:before{content:\"\\e036\"}.mi-payment:before{content:\"\\e8a1\"}.mi-people:before{content:\"\\e7fb\"}.mi-people-outline:before{content:\"\\e7fc\"}.mi-perm-camera-mic:before{content:\"\\e8a2\"}.mi-perm-contact-calendar:before{content:\"\\e8a3\"}.mi-perm-data-setting:before{content:\"\\e8a4\"}.mi-perm-device-information:before{content:\"\\e8a5\"}.mi-perm-identity:before{content:\"\\e8a6\"}.mi-perm-media:before{content:\"\\e8a7\"}.mi-perm-phone-msg:before{content:\"\\e8a8\"}.mi-perm-scan-wifi:before{content:\"\\e8a9\"}.mi-person:before{content:\"\\e7fd\"}.mi-person-add:before{content:\"\\e7fe\"}.mi-person-outline:before{content:\"\\e7ff\"}.mi-person-pin:before{content:\"\\e55a\"}.mi-person-pin-circle:before{content:\"\\e56a\"}.mi-personal-video:before{content:\"\\e63b\"}.mi-pets:before{content:\"\\e91d\"}.mi-phone:before{content:\"\\e0cd\"}.mi-phone-android:before{content:\"\\e324\"}.mi-phone-bluetooth-speaker:before{content:\"\\e61b\"}.mi-phone-forwarded:before{content:\"\\e61c\"}.mi-phone-in-talk:before{content:\"\\e61d\"}.mi-phone-iphone:before{content:\"\\e325\"}.mi-phone-locked:before{content:\"\\e61e\"}.mi-phone-missed:before{content:\"\\e61f\"}.mi-phone-paused:before{content:\"\\e620\"}.mi-phonelink:before{content:\"\\e326\"}.mi-phonelink-erase:before{content:\"\\e0db\"}.mi-phonelink-lock:before{content:\"\\e0dc\"}.mi-phonelink-off:before{content:\"\\e327\"}.mi-phonelink-ring:before{content:\"\\e0dd\"}.mi-phonelink-setup:before{content:\"\\e0de\"}.mi-photo:before{content:\"\\e410\"}.mi-photo-album:before{content:\"\\e411\"}.mi-photo-camera:before{content:\"\\e412\"}.mi-photo-filter:before{content:\"\\e43b\"}.mi-photo-library:before{content:\"\\e413\"}.mi-photo-size-select-actual:before{content:\"\\e432\"}.mi-photo-size-select-large:before{content:\"\\e433\"}.mi-photo-size-select-small:before{content:\"\\e434\"}.mi-picture-as-pdf:before{content:\"\\e415\"}.mi-picture-in-picture:before{content:\"\\e8aa\"}.mi-picture-in-picture-alt:before{content:\"\\e911\"}.mi-pie-chart:before{content:\"\\e6c4\"}.mi-pie-chart-outlined:before{content:\"\\e6c5\"}.mi-pin-drop:before{content:\"\\e55e\"}.mi-place:before{content:\"\\e55f\"}.mi-play-arrow:before{content:\"\\e037\"}.mi-play-circle-filled:before{content:\"\\e038\"}.mi-play-circle-outline:before{content:\"\\e039\"}.mi-play-for-work:before{content:\"\\e906\"}.mi-playlist-add:before{content:\"\\e03b\"}.mi-playlist-add-check:before{content:\"\\e065\"}.mi-playlist-play:before{content:\"\\e05f\"}.mi-plus-one:before{content:\"\\e800\"}.mi-poll:before{content:\"\\e801\"}.mi-polymer:before{content:\"\\e8ab\"}.mi-pool:before{content:\"\\eb48\"}.mi-portable-wifi-off:before{content:\"\\e0ce\"}.mi-portrait:before{content:\"\\e416\"}.mi-power:before{content:\"\\e63c\"}.mi-power-input:before{content:\"\\e336\"}.mi-power-settings-new:before{content:\"\\e8ac\"}.mi-pregnant-woman:before{content:\"\\e91e\"}.mi-present-to-all:before{content:\"\\e0df\"}.mi-print:before{content:\"\\e8ad\"}.mi-priority-high:before{content:\"\\e645\"}.mi-public:before{content:\"\\e80b\"}.mi-publish:before{content:\"\\e255\"}.mi-query-builder:before{content:\"\\e8ae\"}.mi-question-answer:before{content:\"\\e8af\"}.mi-queue:before{content:\"\\e03c\"}.mi-queue-music:before{content:\"\\e03d\"}.mi-queue-play-next:before{content:\"\\e066\"}.mi-radio:before{content:\"\\e03e\"}.mi-radio-button-checked:before{content:\"\\e837\"}.mi-radio-button-unchecked:before{content:\"\\e836\"}.mi-rate-review:before{content:\"\\e560\"}.mi-receipt:before{content:\"\\e8b0\"}.mi-recent-actors:before{content:\"\\e03f\"}.mi-record-voice-over:before{content:\"\\e91f\"}.mi-redeem:before{content:\"\\e8b1\"}.mi-redo:before{content:\"\\e15a\"}.mi-refresh:before{content:\"\\e5d5\"}.mi-remove:before{content:\"\\e15b\"}.mi-remove-circle:before{content:\"\\e15c\"}.mi-remove-circle-outline:before{content:\"\\e15d\"}.mi-remove-from-queue:before{content:\"\\e067\"}.mi-remove-red-eye:before{content:\"\\e417\"}.mi-remove-shopping-cart:before{content:\"\\e928\"}.mi-reorder:before{content:\"\\e8fe\"}.mi-repeat:before{content:\"\\e040\"}.mi-repeat-one:before{content:\"\\e041\"}.mi-replay:before{content:\"\\e042\"}.mi-replay-10:before{content:\"\\e059\"}.mi-replay-30:before{content:\"\\e05a\"}.mi-replay-5:before{content:\"\\e05b\"}.mi-reply:before{content:\"\\e15e\"}.mi-reply-all:before{content:\"\\e15f\"}.mi-report:before{content:\"\\e160\"}.mi-report-problem:before{content:\"\\e8b2\"}.mi-restaurant:before{content:\"\\e56c\"}.mi-restaurant-menu:before{content:\"\\e561\"}.mi-restore:before{content:\"\\e8b3\"}.mi-restore-page:before{content:\"\\e929\"}.mi-ring-volume:before{content:\"\\e0d1\"}.mi-room:before{content:\"\\e8b4\"}.mi-room-service:before{content:\"\\eb49\"}.mi-rotate-90-degrees-ccw:before{content:\"\\e418\"}.mi-rotate-left:before{content:\"\\e419\"}.mi-rotate-right:before{content:\"\\e41a\"}.mi-rounded-corner:before{content:\"\\e920\"}.mi-router:before{content:\"\\e328\"}.mi-rowing:before{content:\"\\e921\"}.mi-rss-feed:before{content:\"\\e0e5\"}.mi-rv-hookup:before{content:\"\\e642\"}.mi-satellite:before{content:\"\\e562\"}.mi-save:before{content:\"\\e161\"}.mi-scanner:before{content:\"\\e329\"}.mi-schedule:before{content:\"\\e8b5\"}.mi-school:before{content:\"\\e80c\"}.mi-screen-lock-landscape:before{content:\"\\e1be\"}.mi-screen-lock-portrait:before{content:\"\\e1bf\"}.mi-screen-lock-rotation:before{content:\"\\e1c0\"}.mi-screen-rotation:before{content:\"\\e1c1\"}.mi-screen-share:before{content:\"\\e0e2\"}.mi-sd-card:before{content:\"\\e623\"}.mi-sd-storage:before{content:\"\\e1c2\"}.mi-search:before{content:\"\\e8b6\"}.mi-security:before{content:\"\\e32a\"}.mi-select-all:before{content:\"\\e162\"}.mi-send:before{content:\"\\e163\"}.mi-sentiment-dissatisfied:before{content:\"\\e811\"}.mi-sentiment-neutral:before{content:\"\\e812\"}.mi-sentiment-satisfied:before{content:\"\\e813\"}.mi-sentiment-very-dissatisfied:before{content:\"\\e814\"}.mi-sentiment-very-satisfied:before{content:\"\\e815\"}.mi-settings:before{content:\"\\e8b8\"}.mi-settings-applications:before{content:\"\\e8b9\"}.mi-settings-backup-restore:before{content:\"\\e8ba\"}.mi-settings-bluetooth:before{content:\"\\e8bb\"}.mi-settings-brightness:before{content:\"\\e8bd\"}.mi-settings-cell:before{content:\"\\e8bc\"}.mi-settings-ethernet:before{content:\"\\e8be\"}.mi-settings-input-antenna:before{content:\"\\e8bf\"}.mi-settings-input-component:before{content:\"\\e8c0\"}.mi-settings-input-composite:before{content:\"\\e8c1\"}.mi-settings-input-hdmi:before{content:\"\\e8c2\"}.mi-settings-input-svideo:before{content:\"\\e8c3\"}.mi-settings-overscan:before{content:\"\\e8c4\"}.mi-settings-phone:before{content:\"\\e8c5\"}.mi-settings-power:before{content:\"\\e8c6\"}.mi-settings-remote:before{content:\"\\e8c7\"}.mi-settings-system-daydream:before{content:\"\\e1c3\"}.mi-settings-voice:before{content:\"\\e8c8\"}.mi-share:before{content:\"\\e80d\"}.mi-shop:before{content:\"\\e8c9\"}.mi-shop-two:before{content:\"\\e8ca\"}.mi-shopping-basket:before{content:\"\\e8cb\"}.mi-shopping-cart:before{content:\"\\e8cc\"}.mi-short-text:before{content:\"\\e261\"}.mi-show-chart:before{content:\"\\e6e1\"}.mi-shuffle:before{content:\"\\e043\"}.mi-signal-cellular-4-bar:before{content:\"\\e1c8\"}.mi-signal-cellular-connected-no-internet-4-bar:before{content:\"\\e1cd\"}.mi-signal-cellular-no-sim:before{content:\"\\e1ce\"}.mi-signal-cellular-null:before{content:\"\\e1cf\"}.mi-signal-cellular-off:before{content:\"\\e1d0\"}.mi-signal-wifi-4-bar:before{content:\"\\e1d8\"}.mi-signal-wifi-4-bar-lock:before{content:\"\\e1d9\"}.mi-signal-wifi-off:before{content:\"\\e1da\"}.mi-sim-card:before{content:\"\\e32b\"}.mi-sim-card-alert:before{content:\"\\e624\"}.mi-skip-next:before{content:\"\\e044\"}.mi-skip-previous:before{content:\"\\e045\"}.mi-slideshow:before{content:\"\\e41b\"}.mi-slow-motion-video:before{content:\"\\e068\"}.mi-smartphone:before{content:\"\\e32c\"}.mi-smoke-free:before{content:\"\\eb4a\"}.mi-smoking-rooms:before{content:\"\\eb4b\"}.mi-sms:before{content:\"\\e625\"}.mi-sms-failed:before{content:\"\\e626\"}.mi-snooze:before{content:\"\\e046\"}.mi-sort:before{content:\"\\e164\"}.mi-sort-by-alpha:before{content:\"\\e053\"}.mi-spa:before{content:\"\\eb4c\"}.mi-space-bar:before{content:\"\\e256\"}.mi-speaker:before{content:\"\\e32d\"}.mi-speaker-group:before{content:\"\\e32e\"}.mi-speaker-notes:before{content:\"\\e8cd\"}.mi-speaker-notes-off:before{content:\"\\e92a\"}.mi-speaker-phone:before{content:\"\\e0d2\"}.mi-spellcheck:before{content:\"\\e8ce\"}.mi-star:before{content:\"\\e838\"}.mi-star-border:before{content:\"\\e83a\"}.mi-star-half:before{content:\"\\e839\"}.mi-stars:before{content:\"\\e8d0\"}.mi-stay-current-landscape:before{content:\"\\e0d3\"}.mi-stay-current-portrait:before{content:\"\\e0d4\"}.mi-stay-primary-landscape:before{content:\"\\e0d5\"}.mi-stay-primary-portrait:before{content:\"\\e0d6\"}.mi-stop:before{content:\"\\e047\"}.mi-stop-screen-share:before{content:\"\\e0e3\"}.mi-storage:before{content:\"\\e1db\"}.mi-store:before{content:\"\\e8d1\"}.mi-store-mall-directory:before{content:\"\\e563\"}.mi-straighten:before{content:\"\\e41c\"}.mi-streetview:before{content:\"\\e56e\"}.mi-strikethrough-s:before{content:\"\\e257\"}.mi-style:before{content:\"\\e41d\"}.mi-subdirectory-arrow-left:before{content:\"\\e5d9\"}.mi-subdirectory-arrow-right:before{content:\"\\e5da\"}.mi-subject:before{content:\"\\e8d2\"}.mi-subscriptions:before{content:\"\\e064\"}.mi-subtitles:before{content:\"\\e048\"}.mi-subway:before{content:\"\\e56f\"}.mi-supervisor-account:before{content:\"\\e8d3\"}.mi-surround-sound:before{content:\"\\e049\"}.mi-swap-calls:before{content:\"\\e0d7\"}.mi-swap-horiz:before{content:\"\\e8d4\"}.mi-swap-vert:before{content:\"\\e8d5\"}.mi-swap-vertical-circle:before{content:\"\\e8d6\"}.mi-switch-camera:before{content:\"\\e41e\"}.mi-switch-video:before{content:\"\\e41f\"}.mi-sync:before{content:\"\\e627\"}.mi-sync-disabled:before{content:\"\\e628\"}.mi-sync-problem:before{content:\"\\e629\"}.mi-system-update:before{content:\"\\e62a\"}.mi-system-update-alt:before{content:\"\\e8d7\"}.mi-tab:before{content:\"\\e8d8\"}.mi-tab-unselected:before{content:\"\\e8d9\"}.mi-tablet:before{content:\"\\e32f\"}.mi-tablet-android:before{content:\"\\e330\"}.mi-tablet-mac:before{content:\"\\e331\"}.mi-tag-faces:before{content:\"\\e420\"}.mi-tap-and-play:before{content:\"\\e62b\"}.mi-terrain:before{content:\"\\e564\"}.mi-text-fields:before{content:\"\\e262\"}.mi-text-format:before{content:\"\\e165\"}.mi-textsms:before{content:\"\\e0d8\"}.mi-texture:before{content:\"\\e421\"}.mi-theaters:before{content:\"\\e8da\"}.mi-thumb-down:before{content:\"\\e8db\"}.mi-thumb-up:before{content:\"\\e8dc\"}.mi-thumbs-up-down:before{content:\"\\e8dd\"}.mi-time-to-leave:before{content:\"\\e62c\"}.mi-timelapse:before{content:\"\\e422\"}.mi-timeline:before{content:\"\\e922\"}.mi-timer:before{content:\"\\e425\"}.mi-timer-10:before{content:\"\\e423\"}.mi-timer-3:before{content:\"\\e424\"}.mi-timer-off:before{content:\"\\e426\"}.mi-title:before{content:\"\\e264\"}.mi-toc:before{content:\"\\e8de\"}.mi-today:before{content:\"\\e8df\"}.mi-toll:before{content:\"\\e8e0\"}.mi-tonality:before{content:\"\\e427\"}.mi-touch-app:before{content:\"\\e913\"}.mi-toys:before{content:\"\\e332\"}.mi-track-changes:before{content:\"\\e8e1\"}.mi-traffic:before{content:\"\\e565\"}.mi-train:before{content:\"\\e570\"}.mi-tram:before{content:\"\\e571\"}.mi-transfer-within-a-station:before{content:\"\\e572\"}.mi-transform:before{content:\"\\e428\"}.mi-translate:before{content:\"\\e8e2\"}.mi-trending-down:before{content:\"\\e8e3\"}.mi-trending-flat:before{content:\"\\e8e4\"}.mi-trending-up:before{content:\"\\e8e5\"}.mi-tune:before{content:\"\\e429\"}.mi-turned-in:before{content:\"\\e8e6\"}.mi-turned-in-not:before{content:\"\\e8e7\"}.mi-tv:before{content:\"\\e333\"}.mi-unarchive:before{content:\"\\e169\"}.mi-undo:before{content:\"\\e166\"}.mi-unfold-less:before{content:\"\\e5d6\"}.mi-unfold-more:before{content:\"\\e5d7\"}.mi-update:before{content:\"\\e923\"}.mi-usb:before{content:\"\\e1e0\"}.mi-verified-user:before{content:\"\\e8e8\"}.mi-vertical-align-bottom:before{content:\"\\e258\"}.mi-vertical-align-center:before{content:\"\\e259\"}.mi-vertical-align-top:before{content:\"\\e25a\"}.mi-vibration:before{content:\"\\e62d\"}.mi-video-call:before{content:\"\\e070\"}.mi-video-label:before{content:\"\\e071\"}.mi-video-library:before{content:\"\\e04a\"}.mi-videocam:before{content:\"\\e04b\"}.mi-videocam-off:before{content:\"\\e04c\"}.mi-videogame-asset:before{content:\"\\e338\"}.mi-view-agenda:before{content:\"\\e8e9\"}.mi-view-array:before{content:\"\\e8ea\"}.mi-view-carousel:before{content:\"\\e8eb\"}.mi-view-column:before{content:\"\\e8ec\"}.mi-view-comfy:before{content:\"\\e42a\"}.mi-view-compact:before{content:\"\\e42b\"}.mi-view-day:before{content:\"\\e8ed\"}.mi-view-headline:before{content:\"\\e8ee\"}.mi-view-list:before{content:\"\\e8ef\"}.mi-view-module:before{content:\"\\e8f0\"}.mi-view-quilt:before{content:\"\\e8f1\"}.mi-view-stream:before{content:\"\\e8f2\"}.mi-view-week:before{content:\"\\e8f3\"}.mi-vignette:before{content:\"\\e435\"}.mi-visibility:before{content:\"\\e8f4\"}.mi-visibility-off:before{content:\"\\e8f5\"}.mi-voice-chat:before{content:\"\\e62e\"}.mi-voicemail:before{content:\"\\e0d9\"}.mi-volume-down:before{content:\"\\e04d\"}.mi-volume-mute:before{content:\"\\e04e\"}.mi-volume-off:before{content:\"\\e04f\"}.mi-volume-up:before{content:\"\\e050\"}.mi-vpn-key:before{content:\"\\e0da\"}.mi-vpn-lock:before{content:\"\\e62f\"}.mi-wallpaper:before{content:\"\\e1bc\"}.mi-warning:before{content:\"\\e002\"}.mi-watch:before{content:\"\\e334\"}.mi-watch-later:before{content:\"\\e924\"}.mi-wb-auto:before{content:\"\\e42c\"}.mi-wb-cloudy:before{content:\"\\e42d\"}.mi-wb-incandescent:before{content:\"\\e42e\"}.mi-wb-iridescent:before{content:\"\\e436\"}.mi-wb-sunny:before{content:\"\\e430\"}.mi-wc:before{content:\"\\e63d\"}.mi-web:before{content:\"\\e051\"}.mi-web-asset:before{content:\"\\e069\"}.mi-weekend:before{content:\"\\e16b\"}.mi-whatshot:before{content:\"\\e80e\"}.mi-widgets:before{content:\"\\e1bd\"}.mi-wifi:before{content:\"\\e63e\"}.mi-wifi-lock:before{content:\"\\e1e1\"}.mi-wifi-tethering:before{content:\"\\e1e2\"}.mi-work:before{content:\"\\e8f9\"}.mi-wrap-text:before{content:\"\\e25b\"}.mi-youtube-searched-for:before{content:\"\\e8fa\"}.mi-zoom-in:before{content:\"\\e8ff\"}.mi-zoom-out:before{content:\"\\e900\"}.mi-zoom-out-map:before{content:\"\\e56b\"}\n";
	styleInject(css$1);

	function preRenderWidget(name) {
	  var _this = this;

	  return new Promise(function (resolve) {
	    var bodyWidget = "".concat(name, "__body");

	    _this.render_template({
	      caption: {
	        class_name: name,
	        html: ''
	      },
	      body: '',
	      render: "<div class=\"".concat(bodyWidget, "\"></div>")
	    });

	    resolve(document.querySelector(".".concat(bodyWidget)));
	  });
	}
	function renderWidget(target) {
	  //console.log(123);
	  Vue.use(Buefy);
	  new Vue({
	    el: target,
	    render: function render(h) {
	      return h(WidgetBody);
	    }
	  });
	}

	var widget = function widget() {
	  var _this = this;

	  var system = self.system;
	  this.callbacks = {
	    render: function render() {
	      preRenderWidget.call(_this, 'smsru-widget').then(function (target) {
	        renderWidget(target);
	      });
	      return true;
	    },
	    init: function init() {
	      return true;
	    },
	    bind_actions: function bind_actions() {
	      return true;
	    },
	    settings: function settings($modal) {
	      alert('lol');
	      return true;
	    },
	    onSave: function onSave(data) {
	      return true;
	    },
	    destroy: function destroy() {},
	    contacts: {
	      selected: function selected() {}
	    },
	    leads: {
	      selected: function selected() {}
	    },
	    tasks: {
	      selected: function selected() {}
	    }
	  };
	};

	window.define([], function () {
	  return widget;
	});

}());
