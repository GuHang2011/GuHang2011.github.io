// \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t, t.exports), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, o) => (o = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)), l = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.provider"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.iterator;
	function p(e) {
		return typeof e != "object" || !e ? null : (e = f && e[f] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var m = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, h = Object.assign, g = {};
	function _(e, t, n) {
		this.props = e, this.context = t, this.refs = g, this.updater = n || m;
	}
	_.prototype.isReactComponent = {}, _.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, _.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function v() {}
	v.prototype = _.prototype;
	function y(e, t, n) {
		this.props = e, this.context = t, this.refs = g, this.updater = n || m;
	}
	var b = y.prototype = new v();
	b.constructor = y, h(b, _.prototype), b.isPureReactComponent = !0;
	var x = Array.isArray, S = Object.prototype.hasOwnProperty, C = { current: null }, w = {
		key: !0,
		ref: !0,
		__self: !0,
		__source: !0
	};
	function T(e, n, r) {
		var i, a = {}, o = null, s = null;
		if (n != null) for (i in n.ref !== void 0 && (s = n.ref), n.key !== void 0 && (o = "" + n.key), n) S.call(n, i) && !w.hasOwnProperty(i) && (a[i] = n[i]);
		var c = arguments.length - 2;
		if (c === 1) a.children = r;
		else if (1 < c) {
			for (var l = Array(c), u = 0; u < c; u++) l[u] = arguments[u + 2];
			a.children = l;
		}
		if (e && e.defaultProps) for (i in c = e.defaultProps, c) a[i] === void 0 && (a[i] = c[i]);
		return {
			$$typeof: t,
			type: e,
			key: o,
			ref: s,
			props: a,
			_owner: C.current
		};
	}
	function E(e, n) {
		return {
			$$typeof: t,
			type: e.type,
			key: n,
			ref: e.ref,
			props: e.props,
			_owner: e._owner
		};
	}
	function D(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function O(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var k = /\/+/g;
	function A(e, t) {
		return typeof e == "object" && e && e.key != null ? O("" + e.key) : t.toString(36);
	}
	function j(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n: c = !0;
			}
		}
		if (c) return c = e, o = o(c), e = a === "" ? "." + A(c, 0) : a, x(o) ? (i = "", e != null && (i = e.replace(k, "$&/") + "/"), j(o, r, i, "", function(e) {
			return e;
		})) : o != null && (D(o) && (o = E(o, i + (!o.key || c && c.key === o.key ? "" : ("" + o.key).replace(k, "$&/") + "/") + e)), r.push(o)), 1;
		if (c = 0, a = a === "" ? "." : a + ":", x(e)) for (var l = 0; l < e.length; l++) {
			s = e[l];
			var u = a + A(s, l);
			c += j(s, r, i, u, o);
		}
		else if (u = p(e), typeof u == "function") for (e = u.call(e), l = 0; !(s = e.next()).done;) s = s.value, u = a + A(s, l++), c += j(s, r, i, u, o);
		else if (s === "object") throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		return c;
	}
	function M(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return j(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function N(e) {
		if (e._status === -1) {
			var t = e._result;
			t = t(), t.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t);
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t);
			}), e._status === -1 && (e._status = 0, e._result = t);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var P = { current: null }, F = { transition: null }, I = {
		ReactCurrentDispatcher: P,
		ReactCurrentBatchConfig: F,
		ReactCurrentOwner: C
	};
	function L() {
		throw Error("act(...) is not supported in production builds of React.");
	}
	e.Children = {
		map: M,
		forEach: function(e, t, n) {
			M(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return M(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return M(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!D(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	}, e.Component = _, e.Fragment = r, e.Profiler = a, e.PureComponent = y, e.StrictMode = i, e.Suspense = l, e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = I, e.act = L, e.cloneElement = function(e, n, r) {
		if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
		var i = h({}, e.props), a = e.key, o = e.ref, s = e._owner;
		if (n != null) {
			if (n.ref !== void 0 && (o = n.ref, s = C.current), n.key !== void 0 && (a = "" + n.key), e.type && e.type.defaultProps) var c = e.type.defaultProps;
			for (l in n) S.call(n, l) && !w.hasOwnProperty(l) && (i[l] = n[l] === void 0 && c !== void 0 ? c[l] : n[l]);
		}
		var l = arguments.length - 2;
		if (l === 1) i.children = r;
		else if (1 < l) {
			c = Array(l);
			for (var u = 0; u < l; u++) c[u] = arguments[u + 2];
			i.children = c;
		}
		return {
			$$typeof: t,
			type: e.type,
			key: a,
			ref: o,
			props: i,
			_owner: s
		};
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null,
			_defaultValue: null,
			_globalName: null
		}, e.Provider = {
			$$typeof: o,
			_context: e
		}, e.Consumer = e;
	}, e.createElement = T, e.createFactory = function(e) {
		var t = T.bind(null, e);
		return t.type = e, t;
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = D, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: N
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = function(e) {
		var t = F.transition;
		F.transition = {};
		try {
			e();
		} finally {
			F.transition = t;
		}
	}, e.unstable_act = L, e.useCallback = function(e, t) {
		return P.current.useCallback(e, t);
	}, e.useContext = function(e) {
		return P.current.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e) {
		return P.current.useDeferredValue(e);
	}, e.useEffect = function(e, t) {
		return P.current.useEffect(e, t);
	}, e.useId = function() {
		return P.current.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return P.current.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return P.current.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return P.current.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return P.current.useMemo(e, t);
	}, e.useReducer = function(e, t, n) {
		return P.current.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return P.current.useRef(e);
	}, e.useState = function(e) {
		return P.current.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return P.current.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return P.current.useTransition();
	}, e.version = "18.3.1";
})), u = /* @__PURE__ */ o(((e, t) => {
	t.exports = l();
})), d = /* @__PURE__ */ o(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = typeof setTimeout == "function" ? setTimeout : null, _ = typeof clearTimeout == "function" ? clearTimeout : null, v = typeof setImmediate < "u" ? setImmediate : null;
	typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
	function y(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function b(e) {
		if (h = !1, y(e), !m) {
			if (n(c) !== null) m = !0, M(x);
			else {
				var t = n(l);
				t !== null && N(b, t.startTime - e);
			}
		}
	}
	function x(t, i) {
		m = !1, h && (h = !1, _(w), w = -1), p = !0;
		var a = f;
		try {
			for (y(i), d = n(c); d !== null && (!(d.expirationTime > i) || t && !D());) {
				var o = d.callback;
				if (typeof o == "function") {
					d.callback = null, f = d.priorityLevel;
					var s = o(d.expirationTime <= i);
					i = e.unstable_now(), typeof s == "function" ? d.callback = s : d === n(c) && r(c), y(i);
				} else r(c);
				d = n(c);
			}
			if (d !== null) var u = !0;
			else {
				var g = n(l);
				g !== null && N(b, g.startTime - i), u = !1;
			}
			return u;
		} finally {
			d = null, f = a, p = !1;
		}
	}
	var S = !1, C = null, w = -1, T = 5, E = -1;
	function D() {
		return !(e.unstable_now() - E < T);
	}
	function O() {
		if (C !== null) {
			var t = e.unstable_now();
			E = t;
			var n = !0;
			try {
				n = C(!0, t);
			} finally {
				n ? k() : (S = !1, C = null);
			}
		} else S = !1;
	}
	var k;
	if (typeof v == "function") k = function() {
		v(O);
	};
	else if (typeof MessageChannel < "u") {
		var A = new MessageChannel(), j = A.port2;
		A.port1.onmessage = O, k = function() {
			j.postMessage(null);
		};
	} else k = function() {
		g(O, 0);
	};
	function M(e) {
		C = e, S || (S = !0, k());
	}
	function N(t, n) {
		w = g(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_continueExecution = function() {
		m || p || (m = !0, M(x));
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : T = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_getFirstCallbackNode = function() {
		return n(c);
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_pauseExecution = function() {}, e.unstable_requestPaint = function() {}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (_(w), w = -1) : h = !0, N(b, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, M(x))), r;
	}, e.unstable_shouldYield = D, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), f = /* @__PURE__ */ o(((e, t) => {
	t.exports = d();
})), p = /* @__PURE__ */ o(((e) => {
	var t = u(), n = f();
	function r(e) {
		for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	var i = /* @__PURE__ */ new Set(), a = {};
	function o(e, t) {
		s(e, t), s(e + "Capture", t);
	}
	function s(e, t) {
		for (a[e] = t, e = 0; e < t.length; e++) i.add(t[e]);
	}
	var c = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, l = Object.prototype.hasOwnProperty, d = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, p = {}, m = {};
	function h(e) {
		return l.call(m, e) ? !0 : l.call(p, e) ? !1 : d.test(e) ? m[e] = !0 : (p[e] = !0, !1);
	}
	function g(e, t, n, r) {
		if (n !== null && n.type === 0) return !1;
		switch (typeof t) {
			case "function":
			case "symbol": return !0;
			case "boolean": return r ? !1 : n === null ? (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-") : !n.acceptsBooleans;
			default: return !1;
		}
	}
	function _(e, t, n, r) {
		if (t == null || g(e, t, n, r)) return !0;
		if (r) return !1;
		if (n !== null) switch (n.type) {
			case 3: return !t;
			case 4: return !1 === t;
			case 5: return isNaN(t);
			case 6: return isNaN(t) || 1 > t;
		}
		return !1;
	}
	function v(e, t, n, r, i, a, o) {
		this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = i, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = a, this.removeEmptyString = o;
	}
	var y = {};
	"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
		y[e] = new v(e, 0, !1, e, null, !1, !1);
	}), [
		["acceptCharset", "accept-charset"],
		["className", "class"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"]
	].forEach(function(e) {
		var t = e[0];
		y[t] = new v(t, 1, !1, e[1], null, !1, !1);
	}), [
		"contentEditable",
		"draggable",
		"spellCheck",
		"value"
	].forEach(function(e) {
		y[e] = new v(e, 2, !1, e.toLowerCase(), null, !1, !1);
	}), [
		"autoReverse",
		"externalResourcesRequired",
		"focusable",
		"preserveAlpha"
	].forEach(function(e) {
		y[e] = new v(e, 2, !1, e, null, !1, !1);
	}), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
		y[e] = new v(e, 3, !1, e.toLowerCase(), null, !1, !1);
	}), [
		"checked",
		"multiple",
		"muted",
		"selected"
	].forEach(function(e) {
		y[e] = new v(e, 3, !0, e, null, !1, !1);
	}), ["capture", "download"].forEach(function(e) {
		y[e] = new v(e, 4, !1, e, null, !1, !1);
	}), [
		"cols",
		"rows",
		"size",
		"span"
	].forEach(function(e) {
		y[e] = new v(e, 6, !1, e, null, !1, !1);
	}), ["rowSpan", "start"].forEach(function(e) {
		y[e] = new v(e, 5, !1, e.toLowerCase(), null, !1, !1);
	});
	var b = /[\-:]([a-z])/g;
	function x(e) {
		return e[1].toUpperCase();
	}
	"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
		var t = e.replace(b, x);
		y[t] = new v(t, 1, !1, e, null, !1, !1);
	}), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
		var t = e.replace(b, x);
		y[t] = new v(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
	}), [
		"xml:base",
		"xml:lang",
		"xml:space"
	].forEach(function(e) {
		var t = e.replace(b, x);
		y[t] = new v(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
	}), ["tabIndex", "crossOrigin"].forEach(function(e) {
		y[e] = new v(e, 1, !1, e.toLowerCase(), null, !1, !1);
	}), y.xlinkHref = new v("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), [
		"src",
		"href",
		"action",
		"formAction"
	].forEach(function(e) {
		y[e] = new v(e, 1, !1, e.toLowerCase(), null, !0, !0);
	});
	function S(e, t, n, r) {
		var i = y.hasOwnProperty(t) ? y[t] : null;
		(i === null ? r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N" : i.type !== 0) && (_(t, n, i, r) && (n = null), r || i === null ? h(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : i.mustUseProperty ? e[i.propertyName] = n === null ? i.type !== 3 && "" : n : (t = i.attributeName, r = i.attributeNamespace, n === null ? e.removeAttribute(t) : (i = i.type, n = i === 3 || i === 4 && !0 === n ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
	}
	var C = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, w = Symbol.for("react.element"), T = Symbol.for("react.portal"), E = Symbol.for("react.fragment"), D = Symbol.for("react.strict_mode"), O = Symbol.for("react.profiler"), k = Symbol.for("react.provider"), A = Symbol.for("react.context"), j = Symbol.for("react.forward_ref"), M = Symbol.for("react.suspense"), N = Symbol.for("react.suspense_list"), P = Symbol.for("react.memo"), F = Symbol.for("react.lazy"), I = Symbol.for("react.offscreen"), L = Symbol.iterator;
	function R(e) {
		return typeof e != "object" || !e ? null : (e = L && e[L] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var z = Object.assign, ee;
	function B(e) {
		if (ee === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			ee = t && t[1] || "";
		}
		return "\n" + ee + e;
	}
	var V = !1;
	function H(e, t) {
		if (!e || V) return "";
		V = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			if (t) {
				if (t = function() {
					throw Error();
				}, Object.defineProperty(t.prototype, "props", { set: function() {
					throw Error();
				} }), typeof Reflect == "object" && Reflect.construct) {
					try {
						Reflect.construct(t, []);
					} catch (e) {
						var r = e;
					}
					Reflect.construct(e, [], t);
				} else {
					try {
						t.call();
					} catch (e) {
						r = e;
					}
					e.call(t.prototype);
				}
			} else {
				try {
					throw Error();
				} catch (e) {
					r = e;
				}
				e();
			}
		} catch (t) {
			if (t && r && typeof t.stack == "string") {
				for (var i = t.stack.split("\n"), a = r.stack.split("\n"), o = i.length - 1, s = a.length - 1; 1 <= o && 0 <= s && i[o] !== a[s];) s--;
				for (; 1 <= o && 0 <= s; o--, s--) if (i[o] !== a[s]) {
					if (o !== 1 || s !== 1) do
						if (o--, s--, 0 > s || i[o] !== a[s]) {
							var c = "\n" + i[o].replace(" at new ", " at ");
							return e.displayName && c.includes("<anonymous>") && (c = c.replace("<anonymous>", e.displayName)), c;
						}
					while (1 <= o && 0 <= s);
					break;
				}
			}
		} finally {
			V = !1, Error.prepareStackTrace = n;
		}
		return (e = e ? e.displayName || e.name : "") ? B(e) : "";
	}
	function te(e) {
		switch (e.tag) {
			case 5: return B(e.type);
			case 16: return B("Lazy");
			case 13: return B("Suspense");
			case 19: return B("SuspenseList");
			case 0:
			case 2:
			case 15: return e = H(e.type, !1), e;
			case 11: return e = H(e.type.render, !1), e;
			case 1: return e = H(e.type, !0), e;
			default: return "";
		}
	}
	function ne(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case E: return "Fragment";
			case T: return "Portal";
			case O: return "Profiler";
			case D: return "StrictMode";
			case M: return "Suspense";
			case N: return "SuspenseList";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case A: return (e.displayName || "Context") + ".Consumer";
			case k: return (e._context.displayName || "Context") + ".Provider";
			case j:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case P: return t = e.displayName || null, t === null ? ne(e.type) || "Memo" : t;
			case F:
				t = e._payload, e = e._init;
				try {
					return ne(e(t));
				} catch {}
		}
		return null;
	}
	function re(e) {
		var t = e.type;
		switch (e.tag) {
			case 24: return "Cache";
			case 9: return (t.displayName || "Context") + ".Consumer";
			case 10: return (t._context.displayName || "Context") + ".Provider";
			case 18: return "DehydratedFragment";
			case 11: return e = t.render, e = e.displayName || e.name || "", t.displayName || (e === "" ? "ForwardRef" : "ForwardRef(" + e + ")");
			case 7: return "Fragment";
			case 5: return t;
			case 4: return "Portal";
			case 3: return "Root";
			case 6: return "Text";
			case 16: return ne(t);
			case 8: return t === D ? "StrictMode" : "Mode";
			case 22: return "Offscreen";
			case 12: return "Profiler";
			case 21: return "Scope";
			case 13: return "Suspense";
			case 19: return "SuspenseList";
			case 25: return "TracingMarker";
			case 1:
			case 0:
			case 17:
			case 2:
			case 14:
			case 15:
				if (typeof t == "function") return t.displayName || t.name || null;
				if (typeof t == "string") return t;
		}
		return null;
	}
	function U(e) {
		switch (typeof e) {
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function ie(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function ae(e) {
		var t = ie(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
		if (!e.hasOwnProperty(t) && n !== void 0 && typeof n.get == "function" && typeof n.set == "function") {
			var i = n.get, a = n.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					r = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: n.enumerable }), {
				getValue: function() {
					return r;
				},
				setValue: function(e) {
					r = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function oe(e) {
		e._valueTracker ||= ae(e);
	}
	function se(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = ie(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	function W(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	function ce(e, t) {
		var n = t.checked;
		return z({}, t, {
			defaultChecked: void 0,
			defaultValue: void 0,
			value: void 0,
			checked: n ?? e._wrapperState.initialChecked
		});
	}
	function le(e, t) {
		var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked == null ? t.defaultChecked : t.checked;
		n = U(t.value == null ? n : t.value), e._wrapperState = {
			initialChecked: r,
			initialValue: n,
			controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null
		};
	}
	function ue(e, t) {
		t = t.checked, t != null && S(e, "checked", t, !1);
	}
	function G(e, t) {
		ue(e, t);
		var n = U(t.value), r = t.type;
		if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
		else if (r === "submit" || r === "reset") {
			e.removeAttribute("value");
			return;
		}
		t.hasOwnProperty("value") ? K(e, t.type, n) : t.hasOwnProperty("defaultValue") && K(e, t.type, U(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
	}
	function de(e, t, n) {
		if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
			var r = t.type;
			if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
			t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
		}
		n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
	}
	function K(e, t, n) {
		(t !== "number" || W(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
	}
	var q = Array.isArray;
	function fe(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + U(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function pe(e, t) {
		if (t.dangerouslySetInnerHTML != null) throw Error(r(91));
		return z({}, t, {
			value: void 0,
			defaultValue: void 0,
			children: "" + e._wrapperState.initialValue
		});
	}
	function me(e, t) {
		var n = t.value;
		if (n == null) {
			if (n = t.children, t = t.defaultValue, n != null) {
				if (t != null) throw Error(r(92));
				if (q(n)) {
					if (1 < n.length) throw Error(r(93));
					n = n[0];
				}
				t = n;
			}
			t ??= "", n = t;
		}
		e._wrapperState = { initialValue: U(n) };
	}
	function J(e, t) {
		var n = U(t.value), r = U(t.defaultValue);
		n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
	}
	function Y(e) {
		var t = e.textContent;
		t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
	}
	function he(e) {
		switch (e) {
			case "svg": return "http://www.w3.org/2000/svg";
			case "math": return "http://www.w3.org/1998/Math/MathML";
			default: return "http://www.w3.org/1999/xhtml";
		}
	}
	function ge(e, t) {
		return e == null || e === "http://www.w3.org/1999/xhtml" ? he(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
	}
	var _e, ve = function(e) {
		return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, i) {
			MSApp.execUnsafeLocalFunction(function() {
				return e(t, n, r, i);
			});
		} : e;
	}(function(e, t) {
		if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
		else {
			for (_e ||= document.createElement("div"), _e.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = _e.firstChild; e.firstChild;) e.removeChild(e.firstChild);
			for (; t.firstChild;) e.appendChild(t.firstChild);
		}
	});
	function ye(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var be = {
		animationIterationCount: !0,
		aspectRatio: !0,
		borderImageOutset: !0,
		borderImageSlice: !0,
		borderImageWidth: !0,
		boxFlex: !0,
		boxFlexGroup: !0,
		boxOrdinalGroup: !0,
		columnCount: !0,
		columns: !0,
		flex: !0,
		flexGrow: !0,
		flexPositive: !0,
		flexShrink: !0,
		flexNegative: !0,
		flexOrder: !0,
		gridArea: !0,
		gridRow: !0,
		gridRowEnd: !0,
		gridRowSpan: !0,
		gridRowStart: !0,
		gridColumn: !0,
		gridColumnEnd: !0,
		gridColumnSpan: !0,
		gridColumnStart: !0,
		fontWeight: !0,
		lineClamp: !0,
		lineHeight: !0,
		opacity: !0,
		order: !0,
		orphans: !0,
		tabSize: !0,
		widows: !0,
		zIndex: !0,
		zoom: !0,
		fillOpacity: !0,
		floodOpacity: !0,
		stopOpacity: !0,
		strokeDasharray: !0,
		strokeDashoffset: !0,
		strokeMiterlimit: !0,
		strokeOpacity: !0,
		strokeWidth: !0
	}, X = [
		"Webkit",
		"ms",
		"Moz",
		"O"
	];
	Object.keys(be).forEach(function(e) {
		X.forEach(function(t) {
			t = t + e.charAt(0).toUpperCase() + e.substring(1), be[t] = be[e];
		});
	});
	function xe(e, t, n) {
		return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || be.hasOwnProperty(e) && be[e] ? ("" + t).trim() : t + "px";
	}
	function Se(e, t) {
		for (var n in e = e.style, t) if (t.hasOwnProperty(n)) {
			var r = n.indexOf("--") === 0, i = xe(n, t[n], r);
			n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : e[n] = i;
		}
	}
	var Ce = z({ menuitem: !0 }, {
		area: !0,
		base: !0,
		br: !0,
		col: !0,
		embed: !0,
		hr: !0,
		img: !0,
		input: !0,
		keygen: !0,
		link: !0,
		meta: !0,
		param: !0,
		source: !0,
		track: !0,
		wbr: !0
	});
	function we(e, t) {
		if (t) {
			if (Ce[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(r(137, e));
			if (t.dangerouslySetInnerHTML != null) {
				if (t.children != null) throw Error(r(60));
				if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(r(61));
			}
			if (t.style != null && typeof t.style != "object") throw Error(r(62));
		}
	}
	function Te(e, t) {
		if (e.indexOf("-") === -1) return typeof t.is == "string";
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var Ee = null;
	function De(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var Oe = null, ke = null, Ae = null;
	function je(e) {
		if (e = ji(e)) {
			if (typeof Oe != "function") throw Error(r(280));
			var t = e.stateNode;
			t && (t = Ni(t), Oe(e.stateNode, e.type, t));
		}
	}
	function Me(e) {
		ke ? Ae ? Ae.push(e) : Ae = [e] : ke = e;
	}
	function Ne() {
		if (ke) {
			var e = ke, t = Ae;
			if (Ae = ke = null, je(e), t) for (e = 0; e < t.length; e++) je(t[e]);
		}
	}
	function Pe(e, t) {
		return e(t);
	}
	function Fe() {}
	var Ie = !1;
	function Le(e, t, n) {
		if (Ie) return e(t, n);
		Ie = !0;
		try {
			return Pe(e, t, n);
		} finally {
			Ie = !1, (ke !== null || Ae !== null) && (Fe(), Ne());
		}
	}
	function Re(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var i = Ni(n);
		if (i === null) return null;
		n = i[t];
		a: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(i = !i.disabled) || (e = e.type, i = e !== "button" && e !== "input" && e !== "select" && e !== "textarea"), e = !i;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(r(231, t, typeof n));
		return n;
	}
	var ze = !1;
	if (c) try {
		var Be = {};
		Object.defineProperty(Be, "passive", { get: function() {
			ze = !0;
		} }), window.addEventListener("test", Be, Be), window.removeEventListener("test", Be, Be);
	} catch {
		ze = !1;
	}
	function Ve(e, t, n, r, i, a, o, s, c) {
		var l = Array.prototype.slice.call(arguments, 3);
		try {
			t.apply(n, l);
		} catch (e) {
			this.onError(e);
		}
	}
	var He = !1, Ue = null, We = !1, Ge = null, Ke = { onError: function(e) {
		He = !0, Ue = e;
	} };
	function qe(e, t, n, r, i, a, o, s, c) {
		He = !1, Ue = null, Ve.apply(Ke, arguments);
	}
	function Je(e, t, n, i, a, o, s, c, l) {
		if (qe.apply(this, arguments), He) {
			if (He) {
				var u = Ue;
				He = !1, Ue = null;
			} else throw Error(r(198));
			We || (We = !0, Ge = u);
		}
	}
	function Ye(e) {
		var t = e, n = e;
		if (e.alternate) for (; t.return;) t = t.return;
		else {
			e = t;
			do
				t = e, t.flags & 4098 && (n = t.return), e = t.return;
			while (e);
		}
		return t.tag === 3 ? n : null;
	}
	function Xe(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function Ze(e) {
		if (Ye(e) !== e) throw Error(r(188));
	}
	function Qe(e) {
		var t = e.alternate;
		if (!t) {
			if (t = Ye(e), t === null) throw Error(r(188));
			return t === e ? e : null;
		}
		for (var n = e, i = t;;) {
			var a = n.return;
			if (a === null) break;
			var o = a.alternate;
			if (o === null) {
				if (i = a.return, i !== null) {
					n = i;
					continue;
				}
				break;
			}
			if (a.child === o.child) {
				for (o = a.child; o;) {
					if (o === n) return Ze(a), e;
					if (o === i) return Ze(a), t;
					o = o.sibling;
				}
				throw Error(r(188));
			}
			if (n.return !== i.return) n = a, i = o;
			else {
				for (var s = !1, c = a.child; c;) {
					if (c === n) {
						s = !0, n = a, i = o;
						break;
					}
					if (c === i) {
						s = !0, i = a, n = o;
						break;
					}
					c = c.sibling;
				}
				if (!s) {
					for (c = o.child; c;) {
						if (c === n) {
							s = !0, n = o, i = a;
							break;
						}
						if (c === i) {
							s = !0, i = o, n = a;
							break;
						}
						c = c.sibling;
					}
					if (!s) throw Error(r(189));
				}
			}
			if (n.alternate !== i) throw Error(r(190));
		}
		if (n.tag !== 3) throw Error(r(188));
		return n.stateNode.current === n ? e : t;
	}
	function $e(e) {
		return e = Qe(e), e === null ? null : et(e);
	}
	function et(e) {
		if (e.tag === 5 || e.tag === 6) return e;
		for (e = e.child; e !== null;) {
			var t = et(e);
			if (t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var tt = n.unstable_scheduleCallback, nt = n.unstable_cancelCallback, rt = n.unstable_shouldYield, it = n.unstable_requestPaint, at = n.unstable_now, ot = n.unstable_getCurrentPriorityLevel, st = n.unstable_ImmediatePriority, ct = n.unstable_UserBlockingPriority, lt = n.unstable_NormalPriority, ut = n.unstable_LowPriority, dt = n.unstable_IdlePriority, ft = null, pt = null;
	function mt(e) {
		if (pt && typeof pt.onCommitFiberRoot == "function") try {
			pt.onCommitFiberRoot(ft, e, void 0, (e.current.flags & 128) == 128);
		} catch {}
	}
	var ht = Math.clz32 ? Math.clz32 : vt, gt = Math.log, _t = Math.LN2;
	function vt(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (gt(e) / _t | 0) | 0;
	}
	var yt = 64, bt = 4194304;
	function Z(e) {
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 4194240;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
			case 67108864: return e & 130023424;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 1073741824;
			default: return e;
		}
	}
	function xt(e, t) {
		var n = e.pendingLanes;
		if (n === 0) return 0;
		var r = 0, i = e.suspendedLanes, a = e.pingedLanes, o = n & 268435455;
		if (o !== 0) {
			var s = o & ~i;
			s === 0 ? (a &= o, a !== 0 && (r = Z(a))) : r = Z(s);
		} else o = n & ~i, o === 0 ? a !== 0 && (r = Z(a)) : r = Z(o);
		if (r === 0) return 0;
		if (t !== 0 && t !== r && (t & i) === 0 && (i = r & -r, a = t & -t, i >= a || i === 16 && a & 4194240)) return t;
		if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t;) n = 31 - ht(t), i = 1 << n, r |= e[n], t &= ~i;
		return r;
	}
	function St(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4: return t + 250;
			case 8:
			case 16:
			case 32:
			case 64:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
			case 67108864: return -1;
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function Ct(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes; 0 < a;) {
			var o = 31 - ht(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = St(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
	}
	function wt(e) {
		return e = e.pendingLanes & -1073741825, e === 0 ? e & 1073741824 ? 1073741824 : 0 : e;
	}
	function Tt() {
		var e = yt;
		return yt <<= 1, !(yt & 4194240) && (yt = 64), e;
	}
	function Et(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function Dt(e, t, n) {
		e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - ht(t), e[t] = n;
	}
	function Ot(e, t) {
		var n = e.pendingLanes & ~t;
		e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
		var r = e.eventTimes;
		for (e = e.expirationTimes; 0 < n;) {
			var i = 31 - ht(n), a = 1 << i;
			t[i] = 0, r[i] = -1, e[i] = -1, n &= ~a;
		}
	}
	function kt(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - ht(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	var At = 0;
	function jt(e) {
		return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
	}
	var Mt, Nt, Pt, Ft, It, Lt = !1, Rt = [], zt = null, Bt = null, Vt = null, Ht = /* @__PURE__ */ new Map(), Ut = /* @__PURE__ */ new Map(), Wt = [], Gt = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
	function Kt(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				zt = null;
				break;
			case "dragenter":
			case "dragleave":
				Bt = null;
				break;
			case "mouseover":
			case "mouseout":
				Vt = null;
				break;
			case "pointerover":
			case "pointerout":
				Ht.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": Ut.delete(t.pointerId);
		}
	}
	function qt(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = ji(t), t !== null && Nt(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Jt(e, t, n, r, i) {
		switch (t) {
			case "focusin": return zt = qt(zt, e, t, n, r, i), !0;
			case "dragenter": return Bt = qt(Bt, e, t, n, r, i), !0;
			case "mouseover": return Vt = qt(Vt, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return Ht.set(a, qt(Ht.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, Ut.set(a, qt(Ut.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Yt(e) {
		var t = Ai(e.target);
		if (t !== null) {
			var n = Ye(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = Xe(n), t !== null) {
						e.blockedOn = t, It(e.priority, function() {
							Pt(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function Xt(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = cn(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				Ee = r, n.target.dispatchEvent(r), Ee = null;
			} else return t = ji(n), t !== null && Nt(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Zt(e, t, n) {
		Xt(e) && n.delete(t);
	}
	function Qt() {
		Lt = !1, zt !== null && Xt(zt) && (zt = null), Bt !== null && Xt(Bt) && (Bt = null), Vt !== null && Xt(Vt) && (Vt = null), Ht.forEach(Zt), Ut.forEach(Zt);
	}
	function $t(e, t) {
		e.blockedOn === t && (e.blockedOn = null, Lt || (Lt = !0, n.unstable_scheduleCallback(n.unstable_NormalPriority, Qt)));
	}
	function en(e) {
		function t(t) {
			return $t(t, e);
		}
		if (0 < Rt.length) {
			$t(Rt[0], e);
			for (var n = 1; n < Rt.length; n++) {
				var r = Rt[n];
				r.blockedOn === e && (r.blockedOn = null);
			}
		}
		for (zt !== null && $t(zt, e), Bt !== null && $t(Bt, e), Vt !== null && $t(Vt, e), Ht.forEach(t), Ut.forEach(t), n = 0; n < Wt.length; n++) r = Wt[n], r.blockedOn === e && (r.blockedOn = null);
		for (; 0 < Wt.length && (n = Wt[0], n.blockedOn === null);) Yt(n), n.blockedOn === null && Wt.shift();
	}
	var tn = C.ReactCurrentBatchConfig, nn = !0;
	function rn(e, t, n, r) {
		var i = At, a = tn.transition;
		tn.transition = null;
		try {
			At = 1, on(e, t, n, r);
		} finally {
			At = i, tn.transition = a;
		}
	}
	function an(e, t, n, r) {
		var i = At, a = tn.transition;
		tn.transition = null;
		try {
			At = 4, on(e, t, n, r);
		} finally {
			At = i, tn.transition = a;
		}
	}
	function on(e, t, n, r) {
		if (nn) {
			var i = cn(e, t, n, r);
			if (i === null) ni(e, t, r, sn, n), Kt(e, r);
			else if (Jt(i, e, t, n, r)) r.stopPropagation();
			else if (Kt(e, r), t & 4 && -1 < Gt.indexOf(e)) {
				for (; i !== null;) {
					var a = ji(i);
					if (a !== null && Mt(a), a = cn(e, t, n, r), a === null && ni(e, t, r, sn, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else ni(e, t, r, null, n);
		}
	}
	var sn = null;
	function cn(e, t, n, r) {
		if (sn = null, e = De(r), e = Ai(e), e !== null) {
			if (t = Ye(e), t === null) e = null;
			else if (n = t.tag, n === 13) {
				if (e = Xe(t), e !== null) return e;
				e = null;
			} else if (n === 3) {
				if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
				e = null;
			} else t !== e && (e = null);
		}
		return sn = e, null;
	}
	function ln(e) {
		switch (e) {
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "resize":
			case "seeked":
			case "submit":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 1;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "scroll":
			case "toggle":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 4;
			case "message": switch (ot()) {
				case st: return 1;
				case ct: return 4;
				case lt:
				case ut: return 16;
				case dt: return 536870912;
				default: return 16;
			}
			default: return 16;
		}
	}
	var un = null, dn = null, fn = null;
	function pn() {
		if (fn) return fn;
		var e, t = dn, n = t.length, r, i = "value" in un ? un.value : un.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return fn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function mn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function hn() {
		return !0;
	}
	function gn() {
		return !1;
	}
	function _n(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? hn : gn, this.isPropagationStopped = gn, this;
		}
		return z(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = hn);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = hn);
			},
			persist: function() {},
			isPersistent: hn
		}), t;
	}
	var vn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, yn = _n(vn), bn = z({}, vn, {
		view: 0,
		detail: 0
	}), xn = _n(bn), Sn, Cn, wn, Tn = z({}, bn, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: In,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== wn && (wn && e.type === "mousemove" ? (Sn = e.screenX - wn.screenX, Cn = e.screenY - wn.screenY) : Cn = Sn = 0, wn = e), Sn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : Cn;
		}
	}), En = _n(Tn), Dn = _n(z({}, Tn, { dataTransfer: 0 })), On = _n(z({}, bn, { relatedTarget: 0 })), kn = _n(z({}, vn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), An = _n(z({}, vn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), jn = _n(z({}, vn, { data: 0 })), Mn = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, Nn = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, Pn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Fn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = Pn[e]) ? !!t[e] : !1;
	}
	function In() {
		return Fn;
	}
	var Ln = _n(z({}, bn, {
		key: function(e) {
			if (e.key) {
				var t = Mn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = mn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Nn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: In,
		charCode: function(e) {
			return e.type === "keypress" ? mn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? mn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), Rn = _n(z({}, Tn, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), zn = _n(z({}, bn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: In
	})), Bn = _n(z({}, vn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Vn = _n(z({}, Tn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), Hn = [
		9,
		13,
		27,
		32
	], Un = c && "CompositionEvent" in window, Wn = null;
	c && "documentMode" in document && (Wn = document.documentMode);
	var Gn = c && "TextEvent" in window && !Wn, Kn = c && (!Un || Wn && 8 < Wn && 11 >= Wn), qn = " ", Jn = !1;
	function Yn(e, t) {
		switch (e) {
			case "keyup": return Hn.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function Xn(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var Zn = !1;
	function Qn(e, t) {
		switch (e) {
			case "compositionend": return Xn(t);
			case "keypress": return t.which === 32 ? (Jn = !0, qn) : null;
			case "textInput": return e = t.data, e === qn && Jn ? null : e;
			default: return null;
		}
	}
	function $n(e, t) {
		if (Zn) return e === "compositionend" || !Un && Yn(e, t) ? (e = pn(), fn = dn = un = null, Zn = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return Kn && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var er = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function tr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!er[e.type] : t === "textarea";
	}
	function nr(e, t, n, r) {
		Me(r), t = ii(t, "onChange"), 0 < t.length && (n = new yn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var rr = null, ir = null;
	function ar(e) {
		Xr(e, 0);
	}
	function or(e) {
		if (se(Mi(e))) return e;
	}
	function sr(e, t) {
		if (e === "change") return t;
	}
	var cr = !1;
	if (c) {
		var lr;
		if (c) {
			var ur = "oninput" in document;
			if (!ur) {
				var dr = document.createElement("div");
				dr.setAttribute("oninput", "return;"), ur = typeof dr.oninput == "function";
			}
			lr = ur;
		} else lr = !1;
		cr = lr && (!document.documentMode || 9 < document.documentMode);
	}
	function fr() {
		rr && (rr.detachEvent("onpropertychange", pr), ir = rr = null);
	}
	function pr(e) {
		if (e.propertyName === "value" && or(ir)) {
			var t = [];
			nr(t, ir, e, De(e)), Le(ar, t);
		}
	}
	function mr(e, t, n) {
		e === "focusin" ? (fr(), rr = t, ir = n, rr.attachEvent("onpropertychange", pr)) : e === "focusout" && fr();
	}
	function hr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return or(ir);
	}
	function gr(e, t) {
		if (e === "click") return or(t);
	}
	function _r(e, t) {
		if (e === "input" || e === "change") return or(t);
	}
	function vr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var yr = typeof Object.is == "function" ? Object.is : vr;
	function br(e, t) {
		if (yr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!l.call(t, i) || !yr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function xr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function Sr(e, t) {
		var n = xr(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = xr(n);
		}
	}
	function Cr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Cr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function wr() {
		for (var e = window, t = W(); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = W(e.document);
		}
		return t;
	}
	function Tr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	function Er(e) {
		var t = wr(), n = e.focusedElem, r = e.selectionRange;
		if (t !== n && n && n.ownerDocument && Cr(n.ownerDocument.documentElement, n)) {
			if (r !== null && Tr(n)) {
				if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
				else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
					e = e.getSelection();
					var i = n.textContent.length, a = Math.min(r.start, i);
					r = r.end === void 0 ? a : Math.min(r.end, i), !e.extend && a > r && (i = r, r = a, a = i), i = Sr(n, a);
					var o = Sr(n, r);
					i && o && (e.rangeCount !== 1 || e.anchorNode !== i.node || e.anchorOffset !== i.offset || e.focusNode !== o.node || e.focusOffset !== o.offset) && (t = t.createRange(), t.setStart(i.node, i.offset), e.removeAllRanges(), a > r ? (e.addRange(t), e.extend(o.node, o.offset)) : (t.setEnd(o.node, o.offset), e.addRange(t)));
				}
			}
			for (t = [], e = n; e = e.parentNode;) e.nodeType === 1 && t.push({
				element: e,
				left: e.scrollLeft,
				top: e.scrollTop
			});
			for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
		}
	}
	var Dr = c && "documentMode" in document && 11 >= document.documentMode, Or = null, kr = null, Ar = null, jr = !1;
	function Mr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		jr || Or == null || Or !== W(r) || (r = Or, "selectionStart" in r && Tr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Ar && br(Ar, r) || (Ar = r, r = ii(kr, "onSelect"), 0 < r.length && (t = new yn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Or)));
	}
	function Nr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Pr = {
		animationend: Nr("Animation", "AnimationEnd"),
		animationiteration: Nr("Animation", "AnimationIteration"),
		animationstart: Nr("Animation", "AnimationStart"),
		transitionend: Nr("Transition", "TransitionEnd")
	}, Fr = {}, Ir = {};
	c && (Ir = document.createElement("div").style, "AnimationEvent" in window || (delete Pr.animationend.animation, delete Pr.animationiteration.animation, delete Pr.animationstart.animation), "TransitionEvent" in window || delete Pr.transitionend.transition);
	function Lr(e) {
		if (Fr[e]) return Fr[e];
		if (!Pr[e]) return e;
		var t = Pr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Ir) return Fr[e] = t[n];
		return e;
	}
	var Rr = Lr("animationend"), zr = Lr("animationiteration"), Br = Lr("animationstart"), Vr = Lr("transitionend"), Hr = /* @__PURE__ */ new Map(), Ur = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	function Wr(e, t) {
		Hr.set(e, t), o(t, [e]);
	}
	for (var Gr = 0; Gr < Ur.length; Gr++) {
		var Kr = Ur[Gr];
		Wr(Kr.toLowerCase(), "on" + (Kr[0].toUpperCase() + Kr.slice(1)));
	}
	Wr(Rr, "onAnimationEnd"), Wr(zr, "onAnimationIteration"), Wr(Br, "onAnimationStart"), Wr("dblclick", "onDoubleClick"), Wr("focusin", "onFocus"), Wr("focusout", "onBlur"), Wr(Vr, "onTransitionEnd"), s("onMouseEnter", ["mouseout", "mouseover"]), s("onMouseLeave", ["mouseout", "mouseover"]), s("onPointerEnter", ["pointerout", "pointerover"]), s("onPointerLeave", ["pointerout", "pointerover"]), o("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), o("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), o("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), o("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), o("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), o("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var qr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Jr = new Set("cancel close invalid load scroll toggle".split(" ").concat(qr));
	function Yr(e, t, n) {
		var r = e.type || "unknown-event";
		e.currentTarget = n, Je(r, t, void 0, e), e.currentTarget = null;
	}
	function Xr(e, t) {
		t = !!(t & 4);
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					Yr(i, s, l), a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					Yr(i, s, l), a = c;
				}
			}
		}
		if (We) throw e = Ge, We = !1, Ge = null, e;
	}
	function Zr(e, t) {
		var n = t[Di];
		n === void 0 && (n = t[Di] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (ti(t, e, 2, !1), n.add(r));
	}
	function Qr(e, t, n) {
		var r = 0;
		t && (r |= 4), ti(n, e, r, t);
	}
	var $r = "_reactListening" + Math.random().toString(36).slice(2);
	function ei(e) {
		if (!e[$r]) {
			e[$r] = !0, i.forEach(function(t) {
				t !== "selectionchange" && (Jr.has(t) || Qr(t, !1, e), Qr(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[$r] || (t[$r] = !0, Qr("selectionchange", !1, t));
		}
	}
	function ti(e, t, n, r) {
		switch (ln(t)) {
			case 1:
				var i = rn;
				break;
			case 4:
				i = an;
				break;
			default: i = on;
		}
		n = i.bind(null, t, n, e), i = void 0, !ze || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function ni(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var o = r.tag;
			if (o === 3 || o === 4) {
				var s = r.stateNode.containerInfo;
				if (s === i || s.nodeType === 8 && s.parentNode === i) break;
				if (o === 4) for (o = r.return; o !== null;) {
					var c = o.tag;
					if ((c === 3 || c === 4) && (c = o.stateNode.containerInfo, c === i || c.nodeType === 8 && c.parentNode === i)) return;
					o = o.return;
				}
				for (; s !== null;) {
					if (o = Ai(s), o === null) return;
					if (c = o.tag, c === 5 || c === 6) {
						r = a = o;
						continue a;
					}
					s = s.parentNode;
				}
			}
			r = r.return;
		}
		Le(function() {
			var r = a, i = De(n), o = [];
			a: {
				var s = Hr.get(e);
				if (s !== void 0) {
					var c = yn, l = e;
					switch (e) {
						case "keypress": if (mn(n) === 0) break a;
						case "keydown":
						case "keyup":
							c = Ln;
							break;
						case "focusin":
							l = "focus", c = On;
							break;
						case "focusout":
							l = "blur", c = On;
							break;
						case "beforeblur":
						case "afterblur":
							c = On;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							c = En;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							c = Dn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							c = zn;
							break;
						case Rr:
						case zr:
						case Br:
							c = kn;
							break;
						case Vr:
							c = Bn;
							break;
						case "scroll":
							c = xn;
							break;
						case "wheel":
							c = Vn;
							break;
						case "copy":
						case "cut":
						case "paste":
							c = An;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup": c = Rn;
					}
					var u = !!(t & 4), d = !u && e === "scroll", f = u ? s === null ? null : s + "Capture" : s;
					u = [];
					for (var p = r, m; p !== null;) {
						m = p;
						var h = m.stateNode;
						if (m.tag === 5 && h !== null && (m = h, f !== null && (h = Re(p, f), h != null && u.push(ri(p, h, m)))), d) break;
						p = p.return;
					}
					0 < u.length && (s = new c(s, l, null, n, i), o.push({
						event: s,
						listeners: u
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (s = e === "mouseover" || e === "pointerover", c = e === "mouseout" || e === "pointerout", s && n !== Ee && (l = n.relatedTarget || n.fromElement) && (Ai(l) || l[Ei])) break a;
					if ((c || s) && (s = i.window === i ? i : (s = i.ownerDocument) ? s.defaultView || s.parentWindow : window, c ? (l = n.relatedTarget || n.toElement, c = r, l = l ? Ai(l) : null, l !== null && (d = Ye(l), l !== d || l.tag !== 5 && l.tag !== 6) && (l = null)) : (c = null, l = r), c !== l)) {
						if (u = En, h = "onMouseLeave", f = "onMouseEnter", p = "mouse", (e === "pointerout" || e === "pointerover") && (u = Rn, h = "onPointerLeave", f = "onPointerEnter", p = "pointer"), d = c == null ? s : Mi(c), m = l == null ? s : Mi(l), s = new u(h, p + "leave", c, n, i), s.target = d, s.relatedTarget = m, h = null, Ai(i) === r && (u = new u(f, p + "enter", l, n, i), u.target = m, u.relatedTarget = d, h = u), d = h, c && l) b: {
							for (u = c, f = l, p = 0, m = u; m; m = ai(m)) p++;
							for (m = 0, h = f; h; h = ai(h)) m++;
							for (; 0 < p - m;) u = ai(u), p--;
							for (; 0 < m - p;) f = ai(f), m--;
							for (; p--;) {
								if (u === f || f !== null && u === f.alternate) break b;
								u = ai(u), f = ai(f);
							}
							u = null;
						}
						else u = null;
						c !== null && oi(o, s, c, u, !1), l !== null && d !== null && oi(o, d, l, u, !0);
					}
				}
				a: {
					if (s = r ? Mi(r) : window, c = s.nodeName && s.nodeName.toLowerCase(), c === "select" || c === "input" && s.type === "file") var g = sr;
					else if (tr(s)) {
						if (cr) g = _r;
						else {
							g = hr;
							var _ = mr;
						}
					} else (c = s.nodeName) && c.toLowerCase() === "input" && (s.type === "checkbox" || s.type === "radio") && (g = gr);
					if (g &&= g(e, r)) {
						nr(o, g, n, i);
						break a;
					}
					_ && _(e, s, r), e === "focusout" && (_ = s._wrapperState) && _.controlled && s.type === "number" && K(s, "number", s.value);
				}
				switch (_ = r ? Mi(r) : window, e) {
					case "focusin":
						(tr(_) || _.contentEditable === "true") && (Or = _, kr = r, Ar = null);
						break;
					case "focusout":
						Ar = kr = Or = null;
						break;
					case "mousedown":
						jr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						jr = !1, Mr(o, n, i);
						break;
					case "selectionchange": if (Dr) break;
					case "keydown":
					case "keyup": Mr(o, n, i);
				}
				var v;
				if (Un) b: {
					switch (e) {
						case "compositionstart":
							var y = "onCompositionStart";
							break b;
						case "compositionend":
							y = "onCompositionEnd";
							break b;
						case "compositionupdate":
							y = "onCompositionUpdate";
							break b;
					}
					y = void 0;
				}
				else Zn ? Yn(e, n) && (y = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (y = "onCompositionStart");
				y && (Kn && n.locale !== "ko" && (Zn || y !== "onCompositionStart" ? y === "onCompositionEnd" && Zn && (v = pn()) : (un = i, dn = "value" in un ? un.value : un.textContent, Zn = !0)), _ = ii(r, y), 0 < _.length && (y = new jn(y, e, null, n, i), o.push({
					event: y,
					listeners: _
				}), v ? y.data = v : (v = Xn(n), v !== null && (y.data = v)))), (v = Gn ? Qn(e, n) : $n(e, n)) && (r = ii(r, "onBeforeInput"), 0 < r.length && (i = new jn("onBeforeInput", "beforeinput", null, n, i), o.push({
					event: i,
					listeners: r
				}), i.data = v));
			}
			Xr(o, t);
		});
	}
	function ri(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function ii(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			i.tag === 5 && a !== null && (i = a, a = Re(e, n), a != null && r.unshift(ri(e, a, i)), a = Re(e, t), a != null && r.push(ri(e, a, i))), e = e.return;
		}
		return r;
	}
	function ai(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5);
		return e || null;
	}
	function oi(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (c !== null && c === r) break;
			s.tag === 5 && l !== null && (s = l, i ? (c = Re(n, a), c != null && o.unshift(ri(n, c, s))) : i || (c = Re(n, a), c != null && o.push(ri(n, c, s)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var si = /\r\n?/g, ci = /\u0000|\uFFFD/g;
	function li(e) {
		return (typeof e == "string" ? e : "" + e).replace(si, "\n").replace(ci, "");
	}
	function ui(e, t, n) {
		if (t = li(t), li(e) !== t && n) throw Error(r(425));
	}
	function di() {}
	var fi = null, pi = null;
	function mi(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var hi = typeof setTimeout == "function" ? setTimeout : void 0, gi = typeof clearTimeout == "function" ? clearTimeout : void 0, _i = typeof Promise == "function" ? Promise : void 0, vi = typeof queueMicrotask == "function" ? queueMicrotask : _i === void 0 ? hi : function(e) {
		return _i.resolve(null).then(e).catch(yi);
	};
	function yi(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function bi(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) {
				if (n = i.data, n === "/$") {
					if (r === 0) {
						e.removeChild(i), en(t);
						return;
					}
					r--;
				} else n !== "$" && n !== "$?" && n !== "$!" || r++;
			}
			n = i;
		} while (n);
		en(t);
	}
	function xi(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
				if (t === "/$") return null;
			}
		}
		return e;
	}
	function Si(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?") {
					if (t === 0) return e;
					t--;
				} else n === "/$" && t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	var Ci = Math.random().toString(36).slice(2), wi = "__reactFiber$" + Ci, Ti = "__reactProps$" + Ci, Ei = "__reactContainer$" + Ci, Di = "__reactEvents$" + Ci, Oi = "__reactListeners$" + Ci, ki = "__reactHandles$" + Ci;
	function Ai(e) {
		var t = e[wi];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[Ei] || n[wi]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Si(e); e !== null;) {
					if (n = e[wi]) return n;
					e = Si(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function ji(e) {
		return e = e[wi] || e[Ei], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
	}
	function Mi(e) {
		if (e.tag === 5 || e.tag === 6) return e.stateNode;
		throw Error(r(33));
	}
	function Ni(e) {
		return e[Ti] || null;
	}
	var Pi = [], Fi = -1;
	function Ii(e) {
		return { current: e };
	}
	function Li(e) {
		0 > Fi || (e.current = Pi[Fi], Pi[Fi] = null, Fi--);
	}
	function Ri(e, t) {
		Fi++, Pi[Fi] = e.current, e.current = t;
	}
	var zi = {}, Bi = Ii(zi), Vi = Ii(!1), Hi = zi;
	function Ui(e, t) {
		var n = e.type.contextTypes;
		if (!n) return zi;
		var r = e.stateNode;
		if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
		var i = {}, a;
		for (a in n) i[a] = t[a];
		return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = i), i;
	}
	function Wi(e) {
		return e = e.childContextTypes, e != null;
	}
	function Gi() {
		Li(Vi), Li(Bi);
	}
	function Ki(e, t, n) {
		if (Bi.current !== zi) throw Error(r(168));
		Ri(Bi, t), Ri(Vi, n);
	}
	function qi(e, t, n) {
		var i = e.stateNode;
		if (t = t.childContextTypes, typeof i.getChildContext != "function") return n;
		for (var a in i = i.getChildContext(), i) if (!(a in t)) throw Error(r(108, re(e) || "Unknown", a));
		return z({}, n, i);
	}
	function Ji(e) {
		return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || zi, Hi = Bi.current, Ri(Bi, e), Ri(Vi, Vi.current), !0;
	}
	function Yi(e, t, n) {
		var i = e.stateNode;
		if (!i) throw Error(r(169));
		n ? (e = qi(e, t, Hi), i.__reactInternalMemoizedMergedChildContext = e, Li(Vi), Li(Bi), Ri(Bi, e)) : Li(Vi), Ri(Vi, n);
	}
	var Xi = null, Zi = !1, Qi = !1;
	function $i(e) {
		Xi === null ? Xi = [e] : Xi.push(e);
	}
	function ea(e) {
		Zi = !0, $i(e);
	}
	function ta() {
		if (!Qi && Xi !== null) {
			Qi = !0;
			var e = 0, t = At;
			try {
				var n = Xi;
				for (At = 1; e < n.length; e++) {
					var r = n[e];
					do
						r = r(!0);
					while (r !== null);
				}
				Xi = null, Zi = !1;
			} catch (t) {
				throw Xi !== null && (Xi = Xi.slice(e + 1)), tt(st, ta), t;
			} finally {
				At = t, Qi = !1;
			}
		}
		return null;
	}
	var na = [], ra = 0, ia = null, aa = 0, oa = [], sa = 0, ca = null, la = 1, ua = "";
	function da(e, t) {
		na[ra++] = aa, na[ra++] = ia, ia = e, aa = t;
	}
	function fa(e, t, n) {
		oa[sa++] = la, oa[sa++] = ua, oa[sa++] = ca, ca = e;
		var r = la;
		e = ua;
		var i = 32 - ht(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - ht(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, la = 1 << 32 - ht(t) + i | n << i | r, ua = a + e;
		} else la = 1 << a | n << i | r, ua = e;
	}
	function pa(e) {
		e.return !== null && (da(e, 1), fa(e, 1, 0));
	}
	function ma(e) {
		for (; e === ia;) ia = na[--ra], na[ra] = null, aa = na[--ra], na[ra] = null;
		for (; e === ca;) ca = oa[--sa], oa[sa] = null, ua = oa[--sa], oa[sa] = null, la = oa[--sa], oa[sa] = null;
	}
	var ha = null, ga = null, _a = !1, va = null;
	function ya(e, t) {
		var n = ql(5, null, null, 0);
		n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
	}
	function ba(e, t) {
		switch (e.tag) {
			case 5:
				var n = e.type;
				return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null && (e.stateNode = t, ha = e, ga = xi(t.firstChild), !0);
			case 6: return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null && (e.stateNode = t, ha = e, ga = null, !0);
			case 13: return t = t.nodeType === 8 ? t : null, t !== null && (n = ca === null ? null : {
				id: la,
				overflow: ua
			}, e.memoizedState = {
				dehydrated: t,
				treeContext: n,
				retryLane: 1073741824
			}, n = ql(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, ha = e, ga = null, !0);
			default: return !1;
		}
	}
	function xa(e) {
		return !!(e.mode & 1) && !(e.flags & 128);
	}
	function Sa(e) {
		if (_a) {
			var t = ga;
			if (t) {
				var n = t;
				if (!ba(e, t)) {
					if (xa(e)) throw Error(r(418));
					t = xi(n.nextSibling);
					var i = ha;
					t && ba(e, t) ? ya(i, n) : (e.flags = e.flags & -4097 | 2, _a = !1, ha = e);
				}
			} else {
				if (xa(e)) throw Error(r(418));
				e.flags = e.flags & -4097 | 2, _a = !1, ha = e;
			}
		}
	}
	function Ca(e) {
		for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;) e = e.return;
		ha = e;
	}
	function wa(e) {
		if (e !== ha) return !1;
		if (!_a) return Ca(e), _a = !0, !1;
		var t;
		if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !mi(e.type, e.memoizedProps)), t &&= ga) {
			if (xa(e)) throw Ta(), Error(r(418));
			for (; t;) ya(e, t), t = xi(t.nextSibling);
		}
		if (Ca(e), e.tag === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(r(317));
			a: {
				for (e = e.nextSibling, t = 0; e;) {
					if (e.nodeType === 8) {
						var n = e.data;
						if (n === "/$") {
							if (t === 0) {
								ga = xi(e.nextSibling);
								break a;
							}
							t--;
						} else n !== "$" && n !== "$!" && n !== "$?" || t++;
					}
					e = e.nextSibling;
				}
				ga = null;
			}
		} else ga = ha ? xi(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Ta() {
		for (var e = ga; e;) e = xi(e.nextSibling);
	}
	function Ea() {
		ga = ha = null, _a = !1;
	}
	function Da(e) {
		va === null ? va = [e] : va.push(e);
	}
	var Oa = C.ReactCurrentBatchConfig;
	function ka(e, t, n) {
		if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
			if (n._owner) {
				if (n = n._owner, n) {
					if (n.tag !== 1) throw Error(r(309));
					var i = n.stateNode;
				}
				if (!i) throw Error(r(147, e));
				var a = i, o = "" + e;
				return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(e) {
					var t = a.refs;
					e === null ? delete t[o] : t[o] = e;
				}, t._stringRef = o, t);
			}
			if (typeof e != "string") throw Error(r(284));
			if (!n._owner) throw Error(r(290, e));
		}
		return e;
	}
	function Aa(e, t) {
		throw e = Object.prototype.toString.call(t), Error(r(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
	}
	function ja(e) {
		var t = e._init;
		return t(e._payload);
	}
	function Ma(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function i(e, t) {
			for (e = /* @__PURE__ */ new Map(); t !== null;) t.key === null ? e.set(t.index, t) : e.set(t.key, t), t = t.sibling;
			return e;
		}
		function a(e, t) {
			return e = Xl(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 2, n) : (r = r.index, r < n ? (t.flags |= 2, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 2), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = eu(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === E ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === F && ja(i) === t.type) ? (r = a(t, n.props), r.ref = ka(e, t, n), r.return = e, r) : (r = Zl(n.type, n.key, n.props, null, e.mode, r), r.ref = ka(e, t, n), r.return = e, r);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = tu(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = Ql(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number") return t = eu("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case w: return n = Zl(t.type, t.key, t.props, null, e.mode, n), n.ref = ka(e, null, t), n.return = e, n;
					case T: return t = tu(t, e.mode, n), t.return = e, t;
					case F:
						var r = t._init;
						return f(e, r(t._payload), n);
				}
				if (q(t) || R(t)) return t = Ql(t, e.mode, n, null), t.return = e, t;
				Aa(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case w: return n.key === i ? l(e, t, n, r) : null;
					case T: return n.key === i ? u(e, t, n, r) : null;
					case F: return i = n._init, p(e, t, i(n._payload), r);
				}
				if (q(n) || R(n)) return i === null ? d(e, t, n, r, null) : null;
				Aa(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case w: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case T: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case F:
						var a = r._init;
						return m(e, t, n, a(r._payload), i);
				}
				if (q(r) || R(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				Aa(t, r);
			}
			return null;
		}
		function h(r, a, s, c) {
			for (var l = null, u = null, d = a, h = a = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(r, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(r, d), a = o(_, a, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(r, d), _a && da(r, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(r, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return _a && da(r, h), l;
			}
			for (d = i(r, d); h < s.length; h++) g = m(d, r, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(r, e);
			}), _a && da(r, h), l;
		}
		function g(a, s, c, l) {
			var u = R(c);
			if (typeof u != "function") throw Error(r(150));
			if (c = u.call(c), c == null) throw Error(r(151));
			for (var d = u = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(a, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(a, h), s = o(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(a, h), _a && da(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return _a && da(a, g), u;
			}
			for (h = i(a, h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), _a && da(a, g), u;
		}
		function _(e, r, i, o) {
			if (typeof i == "object" && i && i.type === E && i.key === null && (i = i.props.children), typeof i == "object" && i) {
				switch (i.$$typeof) {
					case w:
						a: {
							for (var c = i.key, l = r; l !== null;) {
								if (l.key === c) {
									if (c = i.type, c === E) {
										if (l.tag === 7) {
											n(e, l.sibling), r = a(l, i.props.children), r.return = e, e = r;
											break a;
										}
									} else if (l.elementType === c || typeof c == "object" && c && c.$$typeof === F && ja(c) === l.type) {
										n(e, l.sibling), r = a(l, i.props), r.ref = ka(e, l, i), r.return = e, e = r;
										break a;
									}
									n(e, l);
									break;
								}
								t(e, l), l = l.sibling;
							}
							i.type === E ? (r = Ql(i.props.children, e.mode, o, i.key), r.return = e, e = r) : (o = Zl(i.type, i.key, i.props, null, e.mode, o), o.ref = ka(e, r, i), o.return = e, e = o);
						}
						return s(e);
					case T:
						a: {
							for (l = i.key; r !== null;) {
								if (r.key === l) {
									if (r.tag === 4 && r.stateNode.containerInfo === i.containerInfo && r.stateNode.implementation === i.implementation) {
										n(e, r.sibling), r = a(r, i.children || []), r.return = e, e = r;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							r = tu(i, e.mode, o), r.return = e, e = r;
						}
						return s(e);
					case F: return l = i._init, _(e, r, l(i._payload), o);
				}
				if (q(i)) return h(e, r, i, o);
				if (R(i)) return g(e, r, i, o);
				Aa(e, i);
			}
			return typeof i == "string" && i !== "" || typeof i == "number" ? (i = "" + i, r !== null && r.tag === 6 ? (n(e, r.sibling), r = a(r, i), r.return = e, e = r) : (n(e, r), r = eu(i, e.mode, o), r.return = e, e = r), s(e)) : n(e, r);
		}
		return _;
	}
	var Na = Ma(!0), Pa = Ma(!1), Fa = Ii(null), Ia = null, La = null, Ra = null;
	function za() {
		Ra = La = Ia = null;
	}
	function Ba(e) {
		var t = Fa.current;
		Li(Fa), e._currentValue = t;
	}
	function Va(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function Ha(e, t) {
		Ia = e, Ra = La = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (Ms = !0), e.firstContext = null);
	}
	function Ua(e) {
		var t = e._currentValue;
		if (Ra !== e) {
			if (e = {
				context: e,
				memoizedValue: t,
				next: null
			}, La === null) {
				if (Ia === null) throw Error(r(308));
				La = e, Ia.dependencies = {
					lanes: 0,
					firstContext: e
				};
			} else La = La.next = e;
		}
		return t;
	}
	var Wa = null;
	function Ga(e) {
		Wa === null ? Wa = [e] : Wa.push(e);
	}
	function Ka(e, t, n, r) {
		var i = t.interleaved;
		return i === null ? (n.next = n, Ga(t)) : (n.next = i.next, i.next = n), t.interleaved = n, qa(e, r);
	}
	function qa(e, t) {
		e.lanes |= t;
		var n = e.alternate;
		for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null;) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
		return n.tag === 3 ? n.stateNode : null;
	}
	var Ja = !1;
	function Ya(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				interleaved: null,
				lanes: 0
			},
			effects: null
		};
	}
	function Xa(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			effects: e.effects
		});
	}
	function Za(e, t) {
		return {
			eventTime: e,
			lane: t,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function Qa(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, Vc & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, qa(e, n);
		}
		return i = r.interleaved, i === null ? (t.next = t, Ga(r)) : (t.next = i.next, i.next = t), r.interleaved = t, qa(e, n);
	}
	function $a(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194240)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, kt(e, n);
		}
	}
	function eo(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						eventTime: n.eventTime,
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: n.callback,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				effects: r.effects
			}, e.updateQueue = n;
		} else e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	function to(e, t, n, r) {
		var i = e.updateQueue;
		Ja = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane, p = s.eventTime;
				if ((r & f) === f) {
					u !== null && (u = u.next = {
						eventTime: p,
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: s.callback,
						next: null
					});
					a: {
						var m = e, h = s;
						switch (f = t, p = n, h.tag) {
							case 1:
								if (m = h.payload, typeof m == "function") {
									d = m.call(p, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = h.payload, f = typeof m == "function" ? m.call(p, d, f) : m, f == null) break a;
								d = z({}, d, f);
								break a;
							case 2: Ja = !0;
						}
					}
					s.callback !== null && s.lane !== 0 && (e.flags |= 64, f = i.effects, f === null ? i.effects = [s] : f.push(s));
				} else p = {
					eventTime: p,
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					f = s, s = f.next, f.next = null, i.lastBaseUpdate = f, i.shared.pending = null;
				}
			} while (1);
			if (u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, t = i.shared.interleaved, t !== null) {
				i = t;
				do
					o |= i.lane, i = i.next;
				while (i !== t);
			} else a === null && (i.shared.lanes = 0);
			Yc |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function no(e, t, n) {
		if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
			var i = e[t], a = i.callback;
			if (a !== null) {
				if (i.callback = null, i = n, typeof a != "function") throw Error(r(191, a));
				a.call(i);
			}
		}
	}
	var ro = {}, io = Ii(ro), ao = Ii(ro), oo = Ii(ro);
	function so(e) {
		if (e === ro) throw Error(r(174));
		return e;
	}
	function co(e, t) {
		switch (Ri(oo, t), Ri(ao, e), Ri(io, ro), e = t.nodeType, e) {
			case 9:
			case 11:
				t = (t = t.documentElement) ? t.namespaceURI : ge(null, "");
				break;
			default: e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = ge(t, e);
		}
		Li(io), Ri(io, t);
	}
	function lo() {
		Li(io), Li(ao), Li(oo);
	}
	function uo(e) {
		so(oo.current);
		var t = so(io.current), n = ge(t, e.type);
		t !== n && (Ri(ao, e), Ri(io, n));
	}
	function fo(e) {
		ao.current === e && (Li(io), Li(ao));
	}
	var po = Ii(0);
	function mo(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t;
			} else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var ho = [];
	function go() {
		for (var e = 0; e < ho.length; e++) ho[e]._workInProgressVersionPrimary = null;
		ho.length = 0;
	}
	var _o = C.ReactCurrentDispatcher, vo = C.ReactCurrentBatchConfig, yo = 0, bo = null, xo = null, So = null, Co = !1, wo = !1, To = 0, Eo = 0;
	function Do() {
		throw Error(r(321));
	}
	function Oo(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!yr(e[n], t[n])) return !1;
		return !0;
	}
	function ko(e, t, n, i, a, o) {
		if (yo = o, bo = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, _o.current = e === null || e.memoizedState === null ? fs : ps, e = n(i, a), wo) {
			o = 0;
			do {
				if (wo = !1, To = 0, 25 <= o) throw Error(r(301));
				o += 1, So = xo = null, t.updateQueue = null, _o.current = ms, e = n(i, a);
			} while (wo);
		}
		if (_o.current = ds, t = xo !== null && xo.next !== null, yo = 0, So = xo = bo = null, Co = !1, t) throw Error(r(300));
		return e;
	}
	function Ao() {
		var e = To !== 0;
		return To = 0, e;
	}
	function jo() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return So === null ? bo.memoizedState = So = e : So = So.next = e, So;
	}
	function Mo() {
		if (xo === null) {
			var e = bo.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = xo.next;
		var t = So === null ? bo.memoizedState : So.next;
		if (t !== null) So = t, xo = e;
		else {
			if (e === null) throw Error(r(310));
			xo = e, e = {
				memoizedState: xo.memoizedState,
				baseState: xo.baseState,
				baseQueue: xo.baseQueue,
				queue: xo.queue,
				next: null
			}, So === null ? bo.memoizedState = So = e : So = So.next = e;
		}
		return So;
	}
	function No(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Po(e) {
		var t = Mo(), n = t.queue;
		if (n === null) throw Error(r(311));
		n.lastRenderedReducer = e;
		var i = xo, a = i.baseQueue, o = n.pending;
		if (o !== null) {
			if (a !== null) {
				var s = a.next;
				a.next = o.next, o.next = s;
			}
			i.baseQueue = a = o, n.pending = null;
		}
		if (a !== null) {
			o = a.next, i = i.baseState;
			var c = s = null, l = null, u = o;
			do {
				var d = u.lane;
				if ((yo & d) === d) l !== null && (l = l.next = {
					lane: 0,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}), i = u.hasEagerState ? u.eagerState : e(i, u.action);
				else {
					var f = {
						lane: d,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					};
					l === null ? (c = l = f, s = i) : l = l.next = f, bo.lanes |= d, Yc |= d;
				}
				u = u.next;
			} while (u !== null && u !== o);
			l === null ? s = i : l.next = c, yr(i, t.memoizedState) || (Ms = !0), t.memoizedState = i, t.baseState = s, t.baseQueue = l, n.lastRenderedState = i;
		}
		if (e = n.interleaved, e !== null) {
			a = e;
			do
				o = a.lane, bo.lanes |= o, Yc |= o, a = a.next;
			while (a !== e);
		} else a === null && (n.lanes = 0);
		return [t.memoizedState, n.dispatch];
	}
	function Fo(e) {
		var t = Mo(), n = t.queue;
		if (n === null) throw Error(r(311));
		n.lastRenderedReducer = e;
		var i = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			yr(o, t.memoizedState) || (Ms = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, i];
	}
	function Io() {}
	function Lo(e, t) {
		var n = bo, i = Mo(), a = t(), o = !yr(i.memoizedState, a);
		if (o && (i.memoizedState = a, Ms = !0), i = i.queue, Yo(Bo.bind(null, n, i, e), [e]), i.getSnapshot !== t || o || So !== null && So.memoizedState.tag & 1) {
			if (n.flags |= 2048, Wo(9, zo.bind(null, n, i, a, t), void 0, null), Hc === null) throw Error(r(349));
			yo & 30 || Ro(n, t, a);
		}
		return a;
	}
	function Ro(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = bo.updateQueue, t === null ? (t = {
			lastEffect: null,
			stores: null
		}, bo.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function zo(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Vo(t) && Ho(e);
	}
	function Bo(e, t, n) {
		return n(function() {
			Vo(t) && Ho(e);
		});
	}
	function Vo(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !yr(e, n);
		} catch {
			return !0;
		}
	}
	function Ho(e) {
		var t = qa(e, 1);
		t !== null && hl(t, e, 1, -1);
	}
	function Uo(e) {
		var t = jo();
		return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = {
			pending: null,
			interleaved: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: No,
			lastRenderedState: e
		}, t.queue = e, e = e.dispatch = ss.bind(null, bo, e), [t.memoizedState, e];
	}
	function Wo(e, t, n, r) {
		return e = {
			tag: e,
			create: t,
			destroy: n,
			deps: r,
			next: null
		}, t = bo.updateQueue, t === null ? (t = {
			lastEffect: null,
			stores: null
		}, bo.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
	}
	function Go() {
		return Mo().memoizedState;
	}
	function Ko(e, t, n, r) {
		var i = jo();
		bo.flags |= e, i.memoizedState = Wo(1 | t, n, void 0, r === void 0 ? null : r);
	}
	function qo(e, t, n, r) {
		var i = Mo();
		r = r === void 0 ? null : r;
		var a = void 0;
		if (xo !== null) {
			var o = xo.memoizedState;
			if (a = o.destroy, r !== null && Oo(r, o.deps)) {
				i.memoizedState = Wo(t, n, a, r);
				return;
			}
		}
		bo.flags |= e, i.memoizedState = Wo(1 | t, n, a, r);
	}
	function Jo(e, t) {
		return Ko(8390656, 8, e, t);
	}
	function Yo(e, t) {
		return qo(2048, 8, e, t);
	}
	function Xo(e, t) {
		return qo(4, 2, e, t);
	}
	function Zo(e, t) {
		return qo(4, 4, e, t);
	}
	function Qo(e, t) {
		if (typeof t == "function") return e = e(), t(e), function() {
			t(null);
		};
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function $o(e, t, n) {
		return n = n == null ? null : n.concat([e]), qo(4, 4, Qo.bind(null, t, e), n);
	}
	function es() {}
	function ts(e, t) {
		var n = Mo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return r !== null && t !== null && Oo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function ns(e, t) {
		var n = Mo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return r !== null && t !== null && Oo(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
	}
	function rs(e, t, n) {
		return yo & 21 ? (yr(n, t) || (n = Tt(), bo.lanes |= n, Yc |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Ms = !0), e.memoizedState = n);
	}
	function is(e, t) {
		var n = At;
		At = n !== 0 && 4 > n ? n : 4, e(!0);
		var r = vo.transition;
		vo.transition = {};
		try {
			e(!1), t();
		} finally {
			At = n, vo.transition = r;
		}
	}
	function as() {
		return Mo().memoizedState;
	}
	function os(e, t, n) {
		var r = ml(e);
		if (n = {
			lane: r,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, cs(e)) ls(t, n);
		else if (n = Ka(e, t, n, r), n !== null) {
			var i = pl();
			hl(n, e, r, i), us(n, t, r);
		}
	}
	function ss(e, t, n) {
		var r = ml(e), i = {
			lane: r,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (cs(e)) ls(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, yr(s, o)) {
					var c = t.interleaved;
					c === null ? (i.next = i, Ga(t)) : (i.next = c.next, c.next = i), t.interleaved = i;
					return;
				}
			} catch {}
			n = Ka(e, t, i, r), n !== null && (i = pl(), hl(n, e, r, i), us(n, t, r));
		}
	}
	function cs(e) {
		var t = e.alternate;
		return e === bo || t !== null && t === bo;
	}
	function ls(e, t) {
		wo = Co = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function us(e, t, n) {
		if (n & 4194240) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, kt(e, n);
		}
	}
	var ds = {
		readContext: Ua,
		useCallback: Do,
		useContext: Do,
		useEffect: Do,
		useImperativeHandle: Do,
		useInsertionEffect: Do,
		useLayoutEffect: Do,
		useMemo: Do,
		useReducer: Do,
		useRef: Do,
		useState: Do,
		useDebugValue: Do,
		useDeferredValue: Do,
		useTransition: Do,
		useMutableSource: Do,
		useSyncExternalStore: Do,
		useId: Do,
		unstable_isNewReconciler: !1
	}, fs = {
		readContext: Ua,
		useCallback: function(e, t) {
			return jo().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: Ua,
		useEffect: Jo,
		useImperativeHandle: function(e, t, n) {
			return n = n == null ? null : n.concat([e]), Ko(4194308, 4, Qo.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return Ko(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			return Ko(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = jo();
			return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
		},
		useReducer: function(e, t, n) {
			var r = jo();
			return t = n === void 0 ? t : n(t), r.memoizedState = r.baseState = t, e = {
				pending: null,
				interleaved: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: t
			}, r.queue = e, e = e.dispatch = os.bind(null, bo, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = jo();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: Uo,
		useDebugValue: es,
		useDeferredValue: function(e) {
			return jo().memoizedState = e;
		},
		useTransition: function() {
			var e = Uo(!1), t = e[0];
			return e = is.bind(null, e[1]), jo().memoizedState = e, [t, e];
		},
		useMutableSource: function() {},
		useSyncExternalStore: function(e, t, n) {
			var i = bo, a = jo();
			if (_a) {
				if (n === void 0) throw Error(r(407));
				n = n();
			} else {
				if (n = t(), Hc === null) throw Error(r(349));
				yo & 30 || Ro(i, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, Jo(Bo.bind(null, i, o, e), [e]), i.flags |= 2048, Wo(9, zo.bind(null, i, o, n, t), void 0, null), n;
		},
		useId: function() {
			var e = jo(), t = Hc.identifierPrefix;
			if (_a) {
				var n = ua, r = la;
				n = (r & ~(1 << 32 - ht(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = To++, 0 < n && (t += "H" + n.toString(32)), t += ":";
			} else n = Eo++, t = ":" + t + "r" + n.toString(32) + ":";
			return e.memoizedState = t;
		},
		unstable_isNewReconciler: !1
	}, ps = {
		readContext: Ua,
		useCallback: ts,
		useContext: Ua,
		useEffect: Yo,
		useImperativeHandle: $o,
		useInsertionEffect: Xo,
		useLayoutEffect: Zo,
		useMemo: ns,
		useReducer: Po,
		useRef: Go,
		useState: function() {
			return Po(No);
		},
		useDebugValue: es,
		useDeferredValue: function(e) {
			return rs(Mo(), xo.memoizedState, e);
		},
		useTransition: function() {
			return [Po(No)[0], Mo().memoizedState];
		},
		useMutableSource: Io,
		useSyncExternalStore: Lo,
		useId: as,
		unstable_isNewReconciler: !1
	}, ms = {
		readContext: Ua,
		useCallback: ts,
		useContext: Ua,
		useEffect: Yo,
		useImperativeHandle: $o,
		useInsertionEffect: Xo,
		useLayoutEffect: Zo,
		useMemo: ns,
		useReducer: Fo,
		useRef: Go,
		useState: function() {
			return Fo(No);
		},
		useDebugValue: es,
		useDeferredValue: function(e) {
			var t = Mo();
			return xo === null ? t.memoizedState = e : rs(t, xo.memoizedState, e);
		},
		useTransition: function() {
			return [Fo(No)[0], Mo().memoizedState];
		},
		useMutableSource: Io,
		useSyncExternalStore: Lo,
		useId: as,
		unstable_isNewReconciler: !1
	};
	function hs(e, t) {
		if (e && e.defaultProps) {
			for (var n in t = z({}, t), e = e.defaultProps, e) t[n] === void 0 && (t[n] = e[n]);
			return t;
		}
		return t;
	}
	function gs(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : z({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var _s = {
		isMounted: function(e) {
			return (e = e._reactInternals) ? Ye(e) === e : !1;
		},
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = pl(), i = ml(e), a = Za(r, i);
			a.payload = t, n != null && (a.callback = n), t = Qa(e, a, i), t !== null && (hl(t, e, i, r), $a(t, e, i));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = pl(), i = ml(e), a = Za(r, i);
			a.tag = 1, a.payload = t, n != null && (a.callback = n), t = Qa(e, a, i), t !== null && (hl(t, e, i, r), $a(t, e, i));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = pl(), r = ml(e), i = Za(n, r);
			i.tag = 2, t != null && (i.callback = t), t = Qa(e, i, r), t !== null && (hl(t, e, r, n), $a(t, e, r));
		}
	};
	function vs(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !br(n, r) || !br(i, a) : !0;
	}
	function ys(e, t, n) {
		var r = !1, i = zi, a = t.contextType;
		return typeof a == "object" && a ? a = Ua(a) : (i = Wi(t) ? Hi : Bi.current, r = t.contextTypes, a = (r = r != null) ? Ui(e, i) : zi), t = new t(n, a), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = _s, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = i, e.__reactInternalMemoizedMaskedChildContext = a), t;
	}
	function bs(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && _s.enqueueReplaceState(t, t.state, null);
	}
	function xs(e, t, n, r) {
		var i = e.stateNode;
		i.props = n, i.state = e.memoizedState, i.refs = {}, Ya(e);
		var a = t.contextType;
		typeof a == "object" && a ? i.context = Ua(a) : (a = Wi(t) ? Hi : Bi.current, i.context = Ui(e, a)), i.state = e.memoizedState, a = t.getDerivedStateFromProps, typeof a == "function" && (gs(e, t, a, n), i.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (t = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), t !== i.state && _s.enqueueReplaceState(i, i.state, null), to(e, n, i, r), i.state = e.memoizedState), typeof i.componentDidMount == "function" && (e.flags |= 4194308);
	}
	function Ss(e, t) {
		try {
			var n = "", r = t;
			do
				n += te(r), r = r.return;
			while (r);
			var i = n;
		} catch (e) {
			i = "\nError generating stack: " + e.message + "\n" + e.stack;
		}
		return {
			value: e,
			source: t,
			stack: i,
			digest: null
		};
	}
	function Cs(e, t, n) {
		return {
			value: e,
			source: null,
			stack: n ?? null,
			digest: t ?? null
		};
	}
	function ws(e, t) {
		try {
			console.error(t.value);
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	var Ts = typeof WeakMap == "function" ? WeakMap : Map;
	function Es(e, t, n) {
		n = Za(-1, n), n.tag = 3, n.payload = { element: null };
		var r = t.value;
		return n.callback = function() {
			rl || (rl = !0, il = r), ws(e, t);
		}, n;
	}
	function Ds(e, t, n) {
		n = Za(-1, n), n.tag = 3;
		var r = e.type.getDerivedStateFromError;
		if (typeof r == "function") {
			var i = t.value;
			n.payload = function() {
				return r(i);
			}, n.callback = function() {
				ws(e, t);
			};
		}
		var a = e.stateNode;
		return a !== null && typeof a.componentDidCatch == "function" && (n.callback = function() {
			ws(e, t), typeof r != "function" && (al === null ? al = /* @__PURE__ */ new Set([this]) : al.add(this));
			var n = t.stack;
			this.componentDidCatch(t.value, { componentStack: n === null ? "" : n });
		}), n;
	}
	function Os(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Ts();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (i.add(n), e = Bl.bind(null, e, t, n), t.then(e, e));
	}
	function ks(e) {
		do {
			var t;
			if ((t = e.tag === 13) && (t = e.memoizedState, t = t === null || t.dehydrated !== null), t) return e;
			e = e.return;
		} while (e !== null);
		return null;
	}
	function As(e, t, n, r, i) {
		return e.mode & 1 ? (e.flags |= 65536, e.lanes = i, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Za(-1, 1), t.tag = 2, Qa(n, t, 1))), n.lanes |= 1), e);
	}
	var js = C.ReactCurrentOwner, Ms = !1;
	function Ns(e, t, n, r) {
		t.child = e === null ? Pa(t, null, n, r) : Na(t, e.child, n, r);
	}
	function Ps(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		return Ha(t, i), r = ko(e, t, n, r, a, i), n = Ao(), e !== null && !Ms ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, ec(e, t, i)) : (_a && n && pa(t), t.flags |= 1, Ns(e, t, r, i), t.child);
	}
	function Fs(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !Jl(a) && a.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = a, Is(e, t, a, r, i)) : (e = Zl(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, (e.lanes & i) === 0) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? br : n, n(o, r) && e.ref === t.ref) return ec(e, t, i);
		}
		return t.flags |= 1, e = Xl(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function Is(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (br(a, r) && e.ref === t.ref) {
				if (Ms = !1, t.pendingProps = r = a, (e.lanes & i) !== 0) e.flags & 131072 && (Ms = !0);
				else return t.lanes = e.lanes, ec(e, t, i);
			}
		}
		return zs(e, t, n, r, i);
	}
	function Ls(e, t, n) {
		var r = t.pendingProps, i = r.children, a = e === null ? null : e.memoizedState;
		if (r.mode === "hidden") {
			if (!(t.mode & 1)) t.memoizedState = {
				baseLanes: 0,
				cachePool: null,
				transitions: null
			}, Ri(Kc, Gc), Gc |= n;
			else {
				if (!(n & 1073741824)) return e = a === null ? n : a.baseLanes | n, t.lanes = t.childLanes = 1073741824, t.memoizedState = {
					baseLanes: e,
					cachePool: null,
					transitions: null
				}, t.updateQueue = null, Ri(Kc, Gc), Gc |= e, null;
				t.memoizedState = {
					baseLanes: 0,
					cachePool: null,
					transitions: null
				}, r = a === null ? n : a.baseLanes, Ri(Kc, Gc), Gc |= r;
			}
		} else a === null ? r = n : (r = a.baseLanes | n, t.memoizedState = null), Ri(Kc, Gc), Gc |= r;
		return Ns(e, t, i, n), t.child;
	}
	function Rs(e, t) {
		var n = t.ref;
		(e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
	}
	function zs(e, t, n, r, i) {
		var a = Wi(n) ? Hi : Bi.current;
		return a = Ui(t, a), Ha(t, i), n = ko(e, t, n, r, a, i), r = Ao(), e !== null && !Ms ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, ec(e, t, i)) : (_a && r && pa(t), t.flags |= 1, Ns(e, t, n, i), t.child);
	}
	function Bs(e, t, n, r, i) {
		if (Wi(n)) {
			var a = !0;
			Ji(t);
		} else a = !1;
		if (Ha(t, i), t.stateNode === null) $s(e, t), ys(t, n, r), xs(t, n, r, i), r = !0;
		else if (e === null) {
			var o = t.stateNode, s = t.memoizedProps;
			o.props = s;
			var c = o.context, l = n.contextType;
			typeof l == "object" && l ? l = Ua(l) : (l = Wi(n) ? Hi : Bi.current, l = Ui(t, l));
			var u = n.getDerivedStateFromProps, d = typeof u == "function" || typeof o.getSnapshotBeforeUpdate == "function";
			d || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (s !== r || c !== l) && bs(t, o, r, l), Ja = !1;
			var f = t.memoizedState;
			o.state = f, to(t, r, o, i), c = t.memoizedState, s !== r || f !== c || Vi.current || Ja ? (typeof u == "function" && (gs(t, n, u, r), c = t.memoizedState), (s = Ja || vs(t, n, s, r, f, c, l)) ? (d || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = c), o.props = r, o.state = c, o.context = l, r = s) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			o = t.stateNode, Xa(e, t), s = t.memoizedProps, l = t.type === t.elementType ? s : hs(t.type, s), o.props = l, d = t.pendingProps, f = o.context, c = n.contextType, typeof c == "object" && c ? c = Ua(c) : (c = Wi(n) ? Hi : Bi.current, c = Ui(t, c));
			var p = n.getDerivedStateFromProps;
			(u = typeof p == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (s !== d || f !== c) && bs(t, o, r, c), Ja = !1, f = t.memoizedState, o.state = f, to(t, r, o, i);
			var m = t.memoizedState;
			s !== d || f !== m || Vi.current || Ja ? (typeof p == "function" && (gs(t, n, p, r), m = t.memoizedState), (l = Ja || vs(t, n, l, r, f, m, c) || !1) ? (u || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, m, c), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, m, c)), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || s === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = m), o.props = r, o.state = m, o.context = c, r = l) : (typeof o.componentDidUpdate != "function" || s === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return Vs(e, t, n, r, a, i);
	}
	function Vs(e, t, n, r, i, a) {
		Rs(e, t);
		var o = !!(t.flags & 128);
		if (!r && !o) return i && Yi(t, n, !1), ec(e, t, a);
		r = t.stateNode, js.current = t;
		var s = o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
		return t.flags |= 1, e !== null && o ? (t.child = Na(t, e.child, null, a), t.child = Na(t, null, s, a)) : Ns(e, t, s, a), t.memoizedState = r.state, i && Yi(t, n, !0), t.child;
	}
	function Hs(e) {
		var t = e.stateNode;
		t.pendingContext ? Ki(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Ki(e, t.context, !1), co(e, t.containerInfo);
	}
	function Us(e, t, n, r, i) {
		return Ea(), Da(i), t.flags |= 256, Ns(e, t, n, r), t.child;
	}
	var Ws = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0
	};
	function Gs(e) {
		return {
			baseLanes: e,
			cachePool: null,
			transitions: null
		};
	}
	function Ks(e, t, n) {
		var r = t.pendingProps, i = po.current, a = !1, o = !!(t.flags & 128), s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : !!(i & 2)), s ? (a = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (i |= 1), Ri(po, i & 1), e === null) return Sa(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.lanes = t.mode & 1 ? e.data === "$!" ? 8 : 1073741824 : 1, null) : (o = r.children, e = r.fallback, a ? (r = t.mode, a = t.child, o = {
			mode: "hidden",
			children: o
		}, !(r & 1) && a !== null ? (a.childLanes = 0, a.pendingProps = o) : a = $l(o, r, 0, null), e = Ql(e, r, n, null), a.return = t, e.return = t, a.sibling = e, t.child = a, t.child.memoizedState = Gs(n), t.memoizedState = Ws, e) : qs(t, o));
		if (i = e.memoizedState, i !== null && (s = i.dehydrated, s !== null)) return Ys(e, t, o, r, s, i, n);
		if (a) {
			a = r.fallback, o = t.mode, i = e.child, s = i.sibling;
			var c = {
				mode: "hidden",
				children: r.children
			};
			return !(o & 1) && t.child !== i ? (r = t.child, r.childLanes = 0, r.pendingProps = c, t.deletions = null) : (r = Xl(i, c), r.subtreeFlags = i.subtreeFlags & 14680064), s === null ? (a = Ql(a, o, n, null), a.flags |= 2) : a = Xl(s, a), a.return = t, r.return = t, r.sibling = a, t.child = r, r = a, a = t.child, o = e.child.memoizedState, o = o === null ? Gs(n) : {
				baseLanes: o.baseLanes | n,
				cachePool: null,
				transitions: o.transitions
			}, a.memoizedState = o, a.childLanes = e.childLanes & ~n, t.memoizedState = Ws, r;
		}
		return a = e.child, e = a.sibling, r = Xl(a, {
			mode: "visible",
			children: r.children
		}), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
	}
	function qs(e, t) {
		return t = $l({
			mode: "visible",
			children: t
		}, e.mode, 0, null), t.return = e, e.child = t;
	}
	function Js(e, t, n, r) {
		return r !== null && Da(r), Na(t, e.child, null, n), e = qs(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function Ys(e, t, n, i, a, o, s) {
		if (n) return t.flags & 256 ? (t.flags &= -257, i = Cs(Error(r(422))), Js(e, t, s, i)) : t.memoizedState === null ? (o = i.fallback, a = t.mode, i = $l({
			mode: "visible",
			children: i.children
		}, a, 0, null), o = Ql(o, a, s, null), o.flags |= 2, i.return = t, o.return = t, i.sibling = o, t.child = i, t.mode & 1 && Na(t, e.child, null, s), t.child.memoizedState = Gs(s), t.memoizedState = Ws, o) : (t.child = e.child, t.flags |= 128, null);
		if (!(t.mode & 1)) return Js(e, t, s, null);
		if (a.data === "$!") {
			if (i = a.nextSibling && a.nextSibling.dataset, i) var c = i.dgst;
			return i = c, o = Error(r(419)), i = Cs(o, i, void 0), Js(e, t, s, i);
		}
		if (c = (s & e.childLanes) !== 0, Ms || c) {
			if (i = Hc, i !== null) {
				switch (s & -s) {
					case 4:
						a = 2;
						break;
					case 16:
						a = 8;
						break;
					case 64:
					case 128:
					case 256:
					case 512:
					case 1024:
					case 2048:
					case 4096:
					case 8192:
					case 16384:
					case 32768:
					case 65536:
					case 131072:
					case 262144:
					case 524288:
					case 1048576:
					case 2097152:
					case 4194304:
					case 8388608:
					case 16777216:
					case 33554432:
					case 67108864:
						a = 32;
						break;
					case 536870912:
						a = 268435456;
						break;
					default: a = 0;
				}
				a = (a & (i.suspendedLanes | s)) === 0 ? a : 0, a !== 0 && a !== o.retryLane && (o.retryLane = a, qa(e, a), hl(i, e, a, -1));
			}
			return kl(), i = Cs(Error(r(421))), Js(e, t, s, i);
		}
		return a.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Hl.bind(null, e), a._reactRetry = t, null) : (e = o.treeContext, ga = xi(a.nextSibling), ha = t, _a = !0, va = null, e !== null && (oa[sa++] = la, oa[sa++] = ua, oa[sa++] = ca, la = e.id, ua = e.overflow, ca = t), t = qs(t, i.children), t.flags |= 4096, t);
	}
	function Xs(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), Va(e.return, t, n);
	}
	function Zs(e, t, n, r, i) {
		var a = e.memoizedState;
		a === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i
		} : (a.isBackwards = t, a.rendering = null, a.renderingStartTime = 0, a.last = r, a.tail = n, a.tailMode = i);
	}
	function Qs(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		if (Ns(e, t, r.children, n), r = po.current, r & 2) r = r & 1 | 2, t.flags |= 128;
		else {
			if (e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
				if (e.tag === 13) e.memoizedState !== null && Xs(e, n, t);
				else if (e.tag === 19) Xs(e, n, t);
				else if (e.child !== null) {
					e.child.return = e, e = e.child;
					continue;
				}
				if (e === t) break a;
				for (; e.sibling === null;) {
					if (e.return === null || e.return === t) break a;
					e = e.return;
				}
				e.sibling.return = e.return, e = e.sibling;
			}
			r &= 1;
		}
		if (Ri(po, r), !(t.mode & 1)) t.memoizedState = null;
		else switch (i) {
			case "forwards":
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && mo(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Zs(t, !1, i, n, a);
				break;
			case "backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && mo(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				Zs(t, !0, n, null, a);
				break;
			case "together":
				Zs(t, !1, null, null, void 0);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function $s(e, t) {
		!(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
	}
	function ec(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Yc |= t.lanes, (n & t.childLanes) === 0) return null;
		if (e !== null && t.child !== e.child) throw Error(r(153));
		if (t.child !== null) {
			for (e = t.child, n = Xl(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Xl(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function tc(e, t, n) {
		switch (t.tag) {
			case 3:
				Hs(t), Ea();
				break;
			case 5:
				uo(t);
				break;
			case 1:
				Wi(t.type) && Ji(t);
				break;
			case 4:
				co(t, t.stateNode.containerInfo);
				break;
			case 10:
				var r = t.type._context, i = t.memoizedProps.value;
				Ri(Fa, r._currentValue), r._currentValue = i;
				break;
			case 13:
				if (r = t.memoizedState, r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (Ri(po, po.current & 1), e = ec(e, t, n), e === null ? null : e.sibling) : Ks(e, t, n) : (Ri(po, po.current & 1), t.flags |= 128, null);
				Ri(po, po.current & 1);
				break;
			case 19:
				if (r = (n & t.childLanes) !== 0, e.flags & 128) {
					if (r) return Qs(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), Ri(po, po.current), r) break;
				return null;
			case 22:
			case 23: return t.lanes = 0, Ls(e, t, n);
		}
		return ec(e, t, n);
	}
	var nc = function(e, t) {
		for (var n = t.child; n !== null;) {
			if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
			else if (n.tag !== 4 && n.child !== null) {
				n.child.return = n, n = n.child;
				continue;
			}
			if (n === t) break;
			for (; n.sibling === null;) {
				if (n.return === null || n.return === t) return;
				n = n.return;
			}
			n.sibling.return = n.return, n = n.sibling;
		}
	}, rc = function(e, t, n, r) {
		var i = e.memoizedProps;
		if (i !== r) {
			e = t.stateNode, so(io.current);
			var o = null;
			switch (n) {
				case "input":
					i = ce(e, i), r = ce(e, r), o = [];
					break;
				case "select":
					i = z({}, i, { value: void 0 }), r = z({}, r, { value: void 0 }), o = [];
					break;
				case "textarea":
					i = pe(e, i), r = pe(e, r), o = [];
					break;
				default: typeof i.onClick != "function" && typeof r.onClick == "function" && (e.onclick = di);
			}
			we(n, r);
			var s;
			for (u in n = null, i) if (!r.hasOwnProperty(u) && i.hasOwnProperty(u) && i[u] != null) {
				if (u === "style") {
					var c = i[u];
					for (s in c) c.hasOwnProperty(s) && (n ||= {}, n[s] = "");
				} else u !== "dangerouslySetInnerHTML" && u !== "children" && u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (a.hasOwnProperty(u) ? o ||= [] : (o ||= []).push(u, null));
			}
			for (u in r) {
				var l = r[u];
				if (c = i?.[u], r.hasOwnProperty(u) && l !== c && (l != null || c != null)) {
					if (u === "style") {
						if (c) {
							for (s in c) !c.hasOwnProperty(s) || l && l.hasOwnProperty(s) || (n ||= {}, n[s] = "");
							for (s in l) l.hasOwnProperty(s) && c[s] !== l[s] && (n ||= {}, n[s] = l[s]);
						} else n || (o ||= [], o.push(u, n)), n = l;
					} else u === "dangerouslySetInnerHTML" ? (l = l ? l.__html : void 0, c = c ? c.__html : void 0, l != null && c !== l && (o ||= []).push(u, l)) : u === "children" ? typeof l != "string" && typeof l != "number" || (o ||= []).push(u, "" + l) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && (a.hasOwnProperty(u) ? (l != null && u === "onScroll" && Zr("scroll", e), o || c === l || (o = [])) : (o ||= []).push(u, l));
				}
			}
			n && (o ||= []).push("style", n);
			var u = o;
			(t.updateQueue = u) && (t.flags |= 4);
		}
	}, ic = function(e, t, n, r) {
		n !== r && (t.flags |= 4);
	};
	function ac(e, t) {
		if (!_a) switch (e.tailMode) {
			case "hidden":
				t = e.tail;
				for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
				break;
			case "collapsed":
				n = e.tail;
				for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
		}
	}
	function oc(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 14680064, r |= i.flags & 14680064, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function sc(e, t, n) {
		var i = t.pendingProps;
		switch (ma(t), t.tag) {
			case 2:
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return oc(t), null;
			case 1: return Wi(t.type) && Gi(), oc(t), null;
			case 3: return i = t.stateNode, lo(), Li(Vi), Li(Bi), go(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (wa(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, va !== null && (yl(va), va = null))), oc(t), null;
			case 5:
				fo(t);
				var o = so(oo.current);
				if (n = t.type, e !== null && t.stateNode != null) rc(e, t, n, i, o), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
				else {
					if (!i) {
						if (t.stateNode === null) throw Error(r(166));
						return oc(t), null;
					}
					if (e = so(io.current), wa(t)) {
						i = t.stateNode, n = t.type;
						var s = t.memoizedProps;
						switch (i[wi] = t, i[Ti] = s, e = !!(t.mode & 1), n) {
							case "dialog":
								Zr("cancel", i), Zr("close", i);
								break;
							case "iframe":
							case "object":
							case "embed":
								Zr("load", i);
								break;
							case "video":
							case "audio":
								for (o = 0; o < qr.length; o++) Zr(qr[o], i);
								break;
							case "source":
								Zr("error", i);
								break;
							case "img":
							case "image":
							case "link":
								Zr("error", i), Zr("load", i);
								break;
							case "details":
								Zr("toggle", i);
								break;
							case "input":
								le(i, s), Zr("invalid", i);
								break;
							case "select":
								i._wrapperState = { wasMultiple: !!s.multiple }, Zr("invalid", i);
								break;
							case "textarea": me(i, s), Zr("invalid", i);
						}
						for (var c in we(n, s), o = null, s) if (s.hasOwnProperty(c)) {
							var l = s[c];
							c === "children" ? typeof l == "string" ? i.textContent !== l && (!0 !== s.suppressHydrationWarning && ui(i.textContent, l, e), o = ["children", l]) : typeof l == "number" && i.textContent !== "" + l && (!0 !== s.suppressHydrationWarning && ui(i.textContent, l, e), o = ["children", "" + l]) : a.hasOwnProperty(c) && l != null && c === "onScroll" && Zr("scroll", i);
						}
						switch (n) {
							case "input":
								oe(i), de(i, s, !0);
								break;
							case "textarea":
								oe(i), Y(i);
								break;
							case "select":
							case "option": break;
							default: typeof s.onClick == "function" && (i.onclick = di);
						}
						i = o, t.updateQueue = i, i !== null && (t.flags |= 4);
					} else {
						c = o.nodeType === 9 ? o : o.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = he(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = c.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof i.is == "string" ? e = c.createElement(n, { is: i.is }) : (e = c.createElement(n), n === "select" && (c = e, i.multiple ? c.multiple = !0 : i.size && (c.size = i.size))) : e = c.createElementNS(e, n), e[wi] = t, e[Ti] = i, nc(e, t, !1, !1), t.stateNode = e;
						a: {
							switch (c = Te(n, i), n) {
								case "dialog":
									Zr("cancel", e), Zr("close", e), o = i;
									break;
								case "iframe":
								case "object":
								case "embed":
									Zr("load", e), o = i;
									break;
								case "video":
								case "audio":
									for (o = 0; o < qr.length; o++) Zr(qr[o], e);
									o = i;
									break;
								case "source":
									Zr("error", e), o = i;
									break;
								case "img":
								case "image":
								case "link":
									Zr("error", e), Zr("load", e), o = i;
									break;
								case "details":
									Zr("toggle", e), o = i;
									break;
								case "input":
									le(e, i), o = ce(e, i), Zr("invalid", e);
									break;
								case "option":
									o = i;
									break;
								case "select":
									e._wrapperState = { wasMultiple: !!i.multiple }, o = z({}, i, { value: void 0 }), Zr("invalid", e);
									break;
								case "textarea":
									me(e, i), o = pe(e, i), Zr("invalid", e);
									break;
								default: o = i;
							}
							for (s in we(n, o), l = o, l) if (l.hasOwnProperty(s)) {
								var u = l[s];
								s === "style" ? Se(e, u) : s === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && ve(e, u)) : s === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && ye(e, u) : typeof u == "number" && ye(e, "" + u) : s !== "suppressContentEditableWarning" && s !== "suppressHydrationWarning" && s !== "autoFocus" && (a.hasOwnProperty(s) ? u != null && s === "onScroll" && Zr("scroll", e) : u != null && S(e, s, u, c));
							}
							switch (n) {
								case "input":
									oe(e), de(e, i, !1);
									break;
								case "textarea":
									oe(e), Y(e);
									break;
								case "option":
									i.value != null && e.setAttribute("value", "" + U(i.value));
									break;
								case "select":
									e.multiple = !!i.multiple, s = i.value, s == null ? i.defaultValue != null && fe(e, !!i.multiple, i.defaultValue, !0) : fe(e, !!i.multiple, s, !1);
									break;
								default: typeof o.onClick == "function" && (e.onclick = di);
							}
							switch (n) {
								case "button":
								case "input":
								case "select":
								case "textarea":
									i = !!i.autoFocus;
									break a;
								case "img":
									i = !0;
									break a;
								default: i = !1;
							}
						}
						i && (t.flags |= 4);
					}
					t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
				}
				return oc(t), null;
			case 6:
				if (e && t.stateNode != null) ic(e, t, e.memoizedProps, i);
				else {
					if (typeof i != "string" && t.stateNode === null) throw Error(r(166));
					if (n = so(oo.current), so(io.current), wa(t)) {
						if (i = t.stateNode, n = t.memoizedProps, i[wi] = t, (s = i.nodeValue !== n) && (e = ha, e !== null)) switch (e.tag) {
							case 3:
								ui(i.nodeValue, n, !!(e.mode & 1));
								break;
							case 5: !0 !== e.memoizedProps.suppressHydrationWarning && ui(i.nodeValue, n, !!(e.mode & 1));
						}
						s && (t.flags |= 4);
					} else i = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(i), i[wi] = t, t.stateNode = i;
				}
				return oc(t), null;
			case 13:
				if (Li(po), i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (_a && ga !== null && t.mode & 1 && !(t.flags & 128)) Ta(), Ea(), t.flags |= 98560, s = !1;
					else if (s = wa(t), i !== null && i.dehydrated !== null) {
						if (e === null) {
							if (!s) throw Error(r(318));
							if (s = t.memoizedState, s = s === null ? null : s.dehydrated, !s) throw Error(r(317));
							s[wi] = t;
						} else Ea(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						oc(t), s = !1;
					} else va !== null && (yl(va), va = null), s = !0;
					if (!s) return t.flags & 65536 ? t : null;
				}
				return t.flags & 128 ? (t.lanes = n, t) : (i = i !== null, i !== (e !== null && e.memoizedState !== null) && i && (t.child.flags |= 8192, t.mode & 1 && (e === null || po.current & 1 ? qc === 0 && (qc = 3) : kl())), t.updateQueue !== null && (t.flags |= 4), oc(t), null);
			case 4: return lo(), e === null && ei(t.stateNode.containerInfo), oc(t), null;
			case 10: return Ba(t.type._context), oc(t), null;
			case 17: return Wi(t.type) && Gi(), oc(t), null;
			case 19:
				if (Li(po), s = t.memoizedState, s === null) return oc(t), null;
				if (i = !!(t.flags & 128), c = s.rendering, c === null) {
					if (i) ac(s, !1);
					else {
						if (qc !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (c = mo(e), c !== null) {
								for (t.flags |= 128, ac(s, !1), i = c.updateQueue, i !== null && (t.updateQueue = i, t.flags |= 4), t.subtreeFlags = 0, i = n, n = t.child; n !== null;) s = n, e = i, s.flags &= 14680066, c = s.alternate, c === null ? (s.childLanes = 0, s.lanes = e, s.child = null, s.subtreeFlags = 0, s.memoizedProps = null, s.memoizedState = null, s.updateQueue = null, s.dependencies = null, s.stateNode = null) : (s.childLanes = c.childLanes, s.lanes = c.lanes, s.child = c.child, s.subtreeFlags = 0, s.deletions = null, s.memoizedProps = c.memoizedProps, s.memoizedState = c.memoizedState, s.updateQueue = c.updateQueue, s.type = c.type, e = c.dependencies, s.dependencies = e === null ? null : {
									lanes: e.lanes,
									firstContext: e.firstContext
								}), n = n.sibling;
								return Ri(po, po.current & 1 | 2), t.child;
							}
							e = e.sibling;
						}
						s.tail !== null && at() > tl && (t.flags |= 128, i = !0, ac(s, !1), t.lanes = 4194304);
					}
				} else {
					if (!i) {
						if (e = mo(c), e !== null) {
							if (t.flags |= 128, i = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), ac(s, !0), s.tail === null && s.tailMode === "hidden" && !c.alternate && !_a) return oc(t), null;
						} else 2 * at() - s.renderingStartTime > tl && n !== 1073741824 && (t.flags |= 128, i = !0, ac(s, !1), t.lanes = 4194304);
					}
					s.isBackwards ? (c.sibling = t.child, t.child = c) : (n = s.last, n === null ? t.child = c : n.sibling = c, s.last = c);
				}
				return s.tail === null ? (oc(t), null) : (t = s.tail, s.rendering = t, s.tail = t.sibling, s.renderingStartTime = at(), t.sibling = null, n = po.current, Ri(po, i ? n & 1 | 2 : n & 1), t);
			case 22:
			case 23: return Tl(), i = t.memoizedState !== null, e !== null && e.memoizedState !== null !== i && (t.flags |= 8192), i && t.mode & 1 ? Gc & 1073741824 && (oc(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : oc(t), null;
			case 24: return null;
			case 25: return null;
		}
		throw Error(r(156, t.tag));
	}
	function cc(e, t) {
		switch (ma(t), t.tag) {
			case 1: return Wi(t.type) && Gi(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return lo(), Li(Vi), Li(Bi), go(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 5: return fo(t), null;
			case 13:
				if (Li(po), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(r(340));
					Ea();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return Li(po), null;
			case 4: return lo(), null;
			case 10: return Ba(t.type._context), null;
			case 22:
			case 23: return Tl(), null;
			case 24: return null;
			default: return null;
		}
	}
	var lc = !1, uc = !1, dc = typeof WeakSet == "function" ? WeakSet : Set, Q = null;
	function fc(e, t) {
		var n = e.ref;
		if (n !== null) {
			if (typeof n == "function") try {
				n(null);
			} catch (n) {
				zl(e, t, n);
			}
			else n.current = null;
		}
	}
	function pc(e, t, n) {
		try {
			n();
		} catch (n) {
			zl(e, t, n);
		}
	}
	var mc = !1;
	function hc(e, t) {
		if (fi = nn, e = wr(), Tr(e)) {
			if ("selectionStart" in e) var n = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				n = (n = e.ownerDocument) && n.defaultView || window;
				var i = n.getSelection && n.getSelection();
				if (i && i.rangeCount !== 0) {
					n = i.anchorNode;
					var a = i.anchorOffset, o = i.focusNode;
					i = i.focusOffset;
					try {
						n.nodeType, o.nodeType;
					} catch {
						n = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== n || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || i !== 0 && f.nodeType !== 3 || (l = s + i), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === n && ++u === a && (c = s), p === o && ++d === i && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					n = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else n = null;
			}
			n ||= {
				start: 0,
				end: 0
			};
		} else n = null;
		for (pi = {
			focusedElem: e,
			selectionRange: n
		}, nn = !1, Q = t; Q !== null;) if (t = Q, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, Q = e;
		else for (; Q !== null;) {
			t = Q;
			try {
				var h = t.alternate;
				if (t.flags & 1024) switch (t.tag) {
					case 0:
					case 11:
					case 15: break;
					case 1:
						if (h !== null) {
							var g = h.memoizedProps, _ = h.memoizedState, v = t.stateNode;
							v.__reactInternalSnapshotBeforeUpdate = v.getSnapshotBeforeUpdate(t.elementType === t.type ? g : hs(t.type, g), _);
						}
						break;
					case 3:
						var y = t.stateNode.containerInfo;
						y.nodeType === 1 ? y.textContent = "" : y.nodeType === 9 && y.documentElement && y.removeChild(y.documentElement);
						break;
					case 5:
					case 6:
					case 4:
					case 17: break;
					default: throw Error(r(163));
				}
			} catch (e) {
				zl(t, t.return, e);
			}
			if (e = t.sibling, e !== null) {
				e.return = t.return, Q = e;
				break;
			}
			Q = t.return;
		}
		return h = mc, mc = !1, h;
	}
	function gc(e, t, n) {
		var r = t.updateQueue;
		if (r = r === null ? null : r.lastEffect, r !== null) {
			var i = r = r.next;
			do {
				if ((i.tag & e) === e) {
					var a = i.destroy;
					i.destroy = void 0, a !== void 0 && pc(t, n, a);
				}
				i = i.next;
			} while (i !== r);
		}
	}
	function _c(e, t) {
		if (t = t.updateQueue, t = t === null ? null : t.lastEffect, t !== null) {
			var n = t = t.next;
			do {
				if ((n.tag & e) === e) {
					var r = n.create;
					n.destroy = r();
				}
				n = n.next;
			} while (n !== t);
		}
	}
	function vc(e) {
		var t = e.ref;
		if (t !== null) {
			var n = e.stateNode;
			switch (e.tag) {
				case 5:
					e = n;
					break;
				default: e = n;
			}
			typeof t == "function" ? t(e) : t.current = e;
		}
	}
	function yc(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, yc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[wi], delete t[Ti], delete t[Di], delete t[Oi], delete t[ki])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	function bc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 4;
	}
	function xc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || bc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Sc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = di));
		else if (r !== 4 && (e = e.child, e !== null)) for (Sc(e, t, n), e = e.sibling; e !== null;) Sc(e, t, n), e = e.sibling;
	}
	function Cc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (e = e.child, e !== null)) for (Cc(e, t, n), e = e.sibling; e !== null;) Cc(e, t, n), e = e.sibling;
	}
	var wc = null, Tc = !1;
	function Ec(e, t, n) {
		for (n = n.child; n !== null;) Dc(e, t, n), n = n.sibling;
	}
	function Dc(e, t, n) {
		if (pt && typeof pt.onCommitFiberUnmount == "function") try {
			pt.onCommitFiberUnmount(ft, n);
		} catch {}
		switch (n.tag) {
			case 5: uc || fc(n, t);
			case 6:
				var r = wc, i = Tc;
				wc = null, Ec(e, t, n), wc = r, Tc = i, wc !== null && (Tc ? (e = wc, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : wc.removeChild(n.stateNode));
				break;
			case 18:
				wc !== null && (Tc ? (e = wc, n = n.stateNode, e.nodeType === 8 ? bi(e.parentNode, n) : e.nodeType === 1 && bi(e, n), en(e)) : bi(wc, n.stateNode));
				break;
			case 4:
				r = wc, i = Tc, wc = n.stateNode.containerInfo, Tc = !0, Ec(e, t, n), wc = r, Tc = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				if (!uc && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
					i = r = r.next;
					do {
						var a = i, o = a.destroy;
						a = a.tag, o !== void 0 && (a & 2 || a & 4) && pc(n, t, o), i = i.next;
					} while (i !== r);
				}
				Ec(e, t, n);
				break;
			case 1:
				if (!uc && (fc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
					r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
				} catch (e) {
					zl(n, t, e);
				}
				Ec(e, t, n);
				break;
			case 21:
				Ec(e, t, n);
				break;
			case 22:
				n.mode & 1 ? (uc = (r = uc) || n.memoizedState !== null, Ec(e, t, n), uc = r) : Ec(e, t, n);
				break;
			default: Ec(e, t, n);
		}
	}
	function Oc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			e.updateQueue = null;
			var n = e.stateNode;
			n === null && (n = e.stateNode = new dc()), t.forEach(function(t) {
				var r = Ul.bind(null, e, t);
				n.has(t) || (n.add(t), t.then(r, r));
			});
		}
	}
	function kc(e, t) {
		var n = t.deletions;
		if (n !== null) for (var i = 0; i < n.length; i++) {
			var a = n[i];
			try {
				var o = e, s = t, c = s;
				a: for (; c !== null;) {
					switch (c.tag) {
						case 5:
							wc = c.stateNode, Tc = !1;
							break a;
						case 3:
							wc = c.stateNode.containerInfo, Tc = !0;
							break a;
						case 4:
							wc = c.stateNode.containerInfo, Tc = !0;
							break a;
					}
					c = c.return;
				}
				if (wc === null) throw Error(r(160));
				Dc(o, s, a), wc = null, Tc = !1;
				var l = a.alternate;
				l !== null && (l.return = null), a.return = null;
			} catch (e) {
				zl(a, t, e);
			}
		}
		if (t.subtreeFlags & 12854) for (t = t.child; t !== null;) Ac(t, e), t = t.sibling;
	}
	function Ac(e, t) {
		var n = e.alternate, i = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				if (kc(t, e), jc(e), i & 4) {
					try {
						gc(3, e, e.return), _c(3, e);
					} catch (t) {
						zl(e, e.return, t);
					}
					try {
						gc(5, e, e.return);
					} catch (t) {
						zl(e, e.return, t);
					}
				}
				break;
			case 1:
				kc(t, e), jc(e), i & 512 && n !== null && fc(n, n.return);
				break;
			case 5:
				if (kc(t, e), jc(e), i & 512 && n !== null && fc(n, n.return), e.flags & 32) {
					var a = e.stateNode;
					try {
						ye(a, "");
					} catch (t) {
						zl(e, e.return, t);
					}
				}
				if (i & 4 && (a = e.stateNode, a != null)) {
					var o = e.memoizedProps, s = n === null ? o : n.memoizedProps, c = e.type, l = e.updateQueue;
					if (e.updateQueue = null, l !== null) try {
						c === "input" && o.type === "radio" && o.name != null && ue(a, o), Te(c, s);
						var u = Te(c, o);
						for (s = 0; s < l.length; s += 2) {
							var d = l[s], f = l[s + 1];
							d === "style" ? Se(a, f) : d === "dangerouslySetInnerHTML" ? ve(a, f) : d === "children" ? ye(a, f) : S(a, d, f, u);
						}
						switch (c) {
							case "input":
								G(a, o);
								break;
							case "textarea":
								J(a, o);
								break;
							case "select":
								var p = a._wrapperState.wasMultiple;
								a._wrapperState.wasMultiple = !!o.multiple;
								var m = o.value;
								m == null ? p !== !!o.multiple && (o.defaultValue == null ? fe(a, !!o.multiple, o.multiple ? [] : "", !1) : fe(a, !!o.multiple, o.defaultValue, !0)) : fe(a, !!o.multiple, m, !1);
						}
						a[Ti] = o;
					} catch (t) {
						zl(e, e.return, t);
					}
				}
				break;
			case 6:
				if (kc(t, e), jc(e), i & 4) {
					if (e.stateNode === null) throw Error(r(162));
					a = e.stateNode, o = e.memoizedProps;
					try {
						a.nodeValue = o;
					} catch (t) {
						zl(e, e.return, t);
					}
				}
				break;
			case 3:
				if (kc(t, e), jc(e), i & 4 && n !== null && n.memoizedState.isDehydrated) try {
					en(t.containerInfo);
				} catch (t) {
					zl(e, e.return, t);
				}
				break;
			case 4:
				kc(t, e), jc(e);
				break;
			case 13:
				kc(t, e), jc(e), a = e.child, a.flags & 8192 && (o = a.memoizedState !== null, a.stateNode.isHidden = o, !o || a.alternate !== null && a.alternate.memoizedState !== null || (el = at())), i & 4 && Oc(e);
				break;
			case 22:
				if (d = n !== null && n.memoizedState !== null, e.mode & 1 ? (uc = (u = uc) || d, kc(t, e), uc = u) : kc(t, e), jc(e), i & 8192) {
					if (u = e.memoizedState !== null, (e.stateNode.isHidden = u) && !d && e.mode & 1) for (Q = e, d = e.child; d !== null;) {
						for (f = Q = d; Q !== null;) {
							switch (p = Q, m = p.child, p.tag) {
								case 0:
								case 11:
								case 14:
								case 15:
									gc(4, p, p.return);
									break;
								case 1:
									fc(p, p.return);
									var h = p.stateNode;
									if (typeof h.componentWillUnmount == "function") {
										i = p, n = p.return;
										try {
											t = i, h.props = t.memoizedProps, h.state = t.memoizedState, h.componentWillUnmount();
										} catch (e) {
											zl(i, n, e);
										}
									}
									break;
								case 5:
									fc(p, p.return);
									break;
								case 22: if (p.memoizedState !== null) {
									Fc(f);
									continue;
								}
							}
							m === null ? Fc(f) : (m.return = p, Q = m);
						}
						d = d.sibling;
					}
					a: for (d = null, f = e;;) {
						if (f.tag === 5) {
							if (d === null) {
								d = f;
								try {
									a = f.stateNode, u ? (o = a.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (c = f.stateNode, l = f.memoizedProps.style, s = l != null && l.hasOwnProperty("display") ? l.display : null, c.style.display = xe("display", s));
								} catch (t) {
									zl(e, e.return, t);
								}
							}
						} else if (f.tag === 6) {
							if (d === null) try {
								f.stateNode.nodeValue = u ? "" : f.memoizedProps;
							} catch (t) {
								zl(e, e.return, t);
							}
						} else if ((f.tag !== 22 && f.tag !== 23 || f.memoizedState === null || f === e) && f.child !== null) {
							f.child.return = f, f = f.child;
							continue;
						}
						if (f === e) break a;
						for (; f.sibling === null;) {
							if (f.return === null || f.return === e) break a;
							d === f && (d = null), f = f.return;
						}
						d === f && (d = null), f.sibling.return = f.return, f = f.sibling;
					}
				}
				break;
			case 19:
				kc(t, e), jc(e), i & 4 && Oc(e);
				break;
			case 21: break;
			default: kc(t, e), jc(e);
		}
	}
	function jc(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				a: {
					for (var n = e.return; n !== null;) {
						if (bc(n)) {
							var i = n;
							break a;
						}
						n = n.return;
					}
					throw Error(r(160));
				}
				switch (i.tag) {
					case 5:
						var a = i.stateNode;
						i.flags & 32 && (ye(a, ""), i.flags &= -33), Cc(e, xc(e), a);
						break;
					case 3:
					case 4:
						var o = i.stateNode.containerInfo;
						Sc(e, xc(e), o);
						break;
					default: throw Error(r(161));
				}
			} catch (t) {
				zl(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function Mc(e, t, n) {
		Q = e, Nc(e, t, n);
	}
	function Nc(e, t, n) {
		for (var r = !!(e.mode & 1); Q !== null;) {
			var i = Q, a = i.child;
			if (i.tag === 22 && r) {
				var o = i.memoizedState !== null || lc;
				if (!o) {
					var s = i.alternate, c = s !== null && s.memoizedState !== null || uc;
					s = lc;
					var l = uc;
					if (lc = o, (uc = c) && !l) for (Q = i; Q !== null;) o = Q, c = o.child, o.tag === 22 && o.memoizedState !== null || c === null ? Ic(i) : (c.return = o, Q = c);
					for (; a !== null;) Q = a, Nc(a, t, n), a = a.sibling;
					Q = i, lc = s, uc = l;
				}
				Pc(e, t, n);
			} else i.subtreeFlags & 8772 && a !== null ? (a.return = i, Q = a) : Pc(e, t, n);
		}
	}
	function Pc(e) {
		for (; Q !== null;) {
			var t = Q;
			if (t.flags & 8772) {
				var n = t.alternate;
				try {
					if (t.flags & 8772) switch (t.tag) {
						case 0:
						case 11:
						case 15:
							uc || _c(5, t);
							break;
						case 1:
							var i = t.stateNode;
							if (t.flags & 4 && !uc) {
								if (n === null) i.componentDidMount();
								else {
									var a = t.elementType === t.type ? n.memoizedProps : hs(t.type, n.memoizedProps);
									i.componentDidUpdate(a, n.memoizedState, i.__reactInternalSnapshotBeforeUpdate);
								}
							}
							var o = t.updateQueue;
							o !== null && no(t, o, i);
							break;
						case 3:
							var s = t.updateQueue;
							if (s !== null) {
								if (n = null, t.child !== null) switch (t.child.tag) {
									case 5:
										n = t.child.stateNode;
										break;
									case 1: n = t.child.stateNode;
								}
								no(t, s, n);
							}
							break;
						case 5:
							var c = t.stateNode;
							if (n === null && t.flags & 4) {
								n = c;
								var l = t.memoizedProps;
								switch (t.type) {
									case "button":
									case "input":
									case "select":
									case "textarea":
										l.autoFocus && n.focus();
										break;
									case "img": l.src && (n.src = l.src);
								}
							}
							break;
						case 6: break;
						case 4: break;
						case 12: break;
						case 13:
							if (t.memoizedState === null) {
								var u = t.alternate;
								if (u !== null) {
									var d = u.memoizedState;
									if (d !== null) {
										var f = d.dehydrated;
										f !== null && en(f);
									}
								}
							}
							break;
						case 19:
						case 17:
						case 21:
						case 22:
						case 23:
						case 25: break;
						default: throw Error(r(163));
					}
					uc || t.flags & 512 && vc(t);
				} catch (e) {
					zl(t, t.return, e);
				}
			}
			if (t === e) {
				Q = null;
				break;
			}
			if (n = t.sibling, n !== null) {
				n.return = t.return, Q = n;
				break;
			}
			Q = t.return;
		}
	}
	function Fc(e) {
		for (; Q !== null;) {
			var t = Q;
			if (t === e) {
				Q = null;
				break;
			}
			var n = t.sibling;
			if (n !== null) {
				n.return = t.return, Q = n;
				break;
			}
			Q = t.return;
		}
	}
	function Ic(e) {
		for (; Q !== null;) {
			var t = Q;
			try {
				switch (t.tag) {
					case 0:
					case 11:
					case 15:
						var n = t.return;
						try {
							_c(4, t);
						} catch (e) {
							zl(t, n, e);
						}
						break;
					case 1:
						var r = t.stateNode;
						if (typeof r.componentDidMount == "function") {
							var i = t.return;
							try {
								r.componentDidMount();
							} catch (e) {
								zl(t, i, e);
							}
						}
						var a = t.return;
						try {
							vc(t);
						} catch (e) {
							zl(t, a, e);
						}
						break;
					case 5:
						var o = t.return;
						try {
							vc(t);
						} catch (e) {
							zl(t, o, e);
						}
				}
			} catch (e) {
				zl(t, t.return, e);
			}
			if (t === e) {
				Q = null;
				break;
			}
			var s = t.sibling;
			if (s !== null) {
				s.return = t.return, Q = s;
				break;
			}
			Q = t.return;
		}
	}
	var Lc = Math.ceil, Rc = C.ReactCurrentDispatcher, zc = C.ReactCurrentOwner, Bc = C.ReactCurrentBatchConfig, Vc = 0, Hc = null, Uc = null, Wc = 0, Gc = 0, Kc = Ii(0), qc = 0, Jc = null, Yc = 0, Xc = 0, Zc = 0, Qc = null, $c = null, el = 0, tl = Infinity, nl = null, rl = !1, il = null, al = null, ol = !1, sl = null, cl = 0, ll = 0, ul = null, dl = -1, fl = 0;
	function pl() {
		return Vc & 6 ? at() : dl === -1 ? dl = at() : dl;
	}
	function ml(e) {
		return e.mode & 1 ? Vc & 2 && Wc !== 0 ? Wc & -Wc : Oa.transition === null ? (e = At, e === 0 && (e = window.event, e = e === void 0 ? 16 : ln(e.type)), e) : (fl === 0 && (fl = Tt()), fl) : 1;
	}
	function hl(e, t, n, i) {
		if (50 < ll) throw ll = 0, ul = null, Error(r(185));
		Dt(e, n, i), Vc & 2 && e === Hc || (e === Hc && (!(Vc & 2) && (Xc |= n), qc === 4 && xl(e, Wc)), gl(e, i), n === 1 && Vc === 0 && !(t.mode & 1) && (tl = at() + 500, Zi && ta()));
	}
	function gl(e, t) {
		var n = e.callbackNode;
		Ct(e, t);
		var r = xt(e, e === Hc ? Wc : 0);
		if (r === 0) n !== null && nt(n), e.callbackNode = null, e.callbackPriority = 0;
		else if (t = r & -r, e.callbackPriority !== t) {
			if (n != null && nt(n), t === 1) e.tag === 0 ? ea(Sl.bind(null, e)) : $i(Sl.bind(null, e)), vi(function() {
				!(Vc & 6) && ta();
			}), n = null;
			else {
				switch (jt(r)) {
					case 1:
						n = st;
						break;
					case 4:
						n = ct;
						break;
					case 16:
						n = lt;
						break;
					case 536870912:
						n = dt;
						break;
					default: n = lt;
				}
				n = Gl(n, _l.bind(null, e));
			}
			e.callbackPriority = t, e.callbackNode = n;
		}
	}
	function _l(e, t) {
		if (dl = -1, fl = 0, Vc & 6) throw Error(r(327));
		var n = e.callbackNode;
		if (Ll() && e.callbackNode !== n) return null;
		var i = xt(e, e === Hc ? Wc : 0);
		if (i === 0) return null;
		if (i & 30 || (i & e.expiredLanes) !== 0 || t) t = Al(e, i);
		else {
			t = i;
			var a = Vc;
			Vc |= 2;
			var o = Ol();
			(Hc !== e || Wc !== t) && (nl = null, tl = at() + 500, El(e, t));
			do
				try {
					Ml();
					break;
				} catch (t) {
					Dl(e, t);
				}
			while (1);
			za(), Rc.current = o, Vc = a, Uc === null ? (Hc = null, Wc = 0, t = qc) : t = 0;
		}
		if (t !== 0) {
			if (t === 2 && (a = wt(e), a !== 0 && (i = a, t = vl(e, a))), t === 1) throw n = Jc, El(e, 0), xl(e, i), gl(e, at()), n;
			if (t === 6) xl(e, i);
			else {
				if (a = e.current.alternate, !(i & 30) && !bl(a) && (t = Al(e, i), t === 2 && (o = wt(e), o !== 0 && (i = o, t = vl(e, o))), t === 1)) throw n = Jc, El(e, 0), xl(e, i), gl(e, at()), n;
				switch (e.finishedWork = a, e.finishedLanes = i, t) {
					case 0:
					case 1: throw Error(r(345));
					case 2:
						Fl(e, $c, nl);
						break;
					case 3:
						if (xl(e, i), (i & 130023424) === i && (t = el + 500 - at(), 10 < t)) {
							if (xt(e, 0) !== 0) break;
							if (a = e.suspendedLanes, (a & i) !== i) {
								pl(), e.pingedLanes |= e.suspendedLanes & a;
								break;
							}
							e.timeoutHandle = hi(Fl.bind(null, e, $c, nl), t);
							break;
						}
						Fl(e, $c, nl);
						break;
					case 4:
						if (xl(e, i), (i & 4194240) === i) break;
						for (t = e.eventTimes, a = -1; 0 < i;) {
							var s = 31 - ht(i);
							o = 1 << s, s = t[s], s > a && (a = s), i &= ~o;
						}
						if (i = a, i = at() - i, i = (120 > i ? 120 : 480 > i ? 480 : 1080 > i ? 1080 : 1920 > i ? 1920 : 3e3 > i ? 3e3 : 4320 > i ? 4320 : 1960 * Lc(i / 1960)) - i, 10 < i) {
							e.timeoutHandle = hi(Fl.bind(null, e, $c, nl), i);
							break;
						}
						Fl(e, $c, nl);
						break;
					case 5:
						Fl(e, $c, nl);
						break;
					default: throw Error(r(329));
				}
			}
		}
		return gl(e, at()), e.callbackNode === n ? _l.bind(null, e) : null;
	}
	function vl(e, t) {
		var n = Qc;
		return e.current.memoizedState.isDehydrated && (El(e, t).flags |= 256), e = Al(e, t), e !== 2 && (t = $c, $c = n, t !== null && yl(t)), e;
	}
	function yl(e) {
		$c === null ? $c = e : $c.push.apply($c, e);
	}
	function bl(e) {
		for (var t = e;;) {
			if (t.flags & 16384) {
				var n = t.updateQueue;
				if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
					var i = n[r], a = i.getSnapshot;
					i = i.value;
					try {
						if (!yr(a(), i)) return !1;
					} catch {
						return !1;
					}
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function xl(e, t) {
		for (t &= ~Zc, t &= ~Xc, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t;) {
			var n = 31 - ht(t), r = 1 << n;
			e[n] = -1, t &= ~r;
		}
	}
	function Sl(e) {
		if (Vc & 6) throw Error(r(327));
		Ll();
		var t = xt(e, 0);
		if (!(t & 1)) return gl(e, at()), null;
		var n = Al(e, t);
		if (e.tag !== 0 && n === 2) {
			var i = wt(e);
			i !== 0 && (t = i, n = vl(e, i));
		}
		if (n === 1) throw n = Jc, El(e, 0), xl(e, t), gl(e, at()), n;
		if (n === 6) throw Error(r(345));
		return e.finishedWork = e.current.alternate, e.finishedLanes = t, Fl(e, $c, nl), gl(e, at()), null;
	}
	function Cl(e, t) {
		var n = Vc;
		Vc |= 1;
		try {
			return e(t);
		} finally {
			Vc = n, Vc === 0 && (tl = at() + 500, Zi && ta());
		}
	}
	function wl(e) {
		sl !== null && sl.tag === 0 && !(Vc & 6) && Ll();
		var t = Vc;
		Vc |= 1;
		var n = Bc.transition, r = At;
		try {
			if (Bc.transition = null, At = 1, e) return e();
		} finally {
			At = r, Bc.transition = n, Vc = t, !(Vc & 6) && ta();
		}
	}
	function Tl() {
		Gc = Kc.current, Li(Kc);
	}
	function El(e, t) {
		e.finishedWork = null, e.finishedLanes = 0;
		var n = e.timeoutHandle;
		if (n !== -1 && (e.timeoutHandle = -1, gi(n)), Uc !== null) for (n = Uc.return; n !== null;) {
			var r = n;
			switch (ma(r), r.tag) {
				case 1:
					r = r.type.childContextTypes, r != null && Gi();
					break;
				case 3:
					lo(), Li(Vi), Li(Bi), go();
					break;
				case 5:
					fo(r);
					break;
				case 4:
					lo();
					break;
				case 13:
					Li(po);
					break;
				case 19:
					Li(po);
					break;
				case 10:
					Ba(r.type._context);
					break;
				case 22:
				case 23: Tl();
			}
			n = n.return;
		}
		if (Hc = e, Uc = e = Xl(e.current, null), Wc = Gc = t, qc = 0, Jc = null, Zc = Xc = Yc = 0, $c = Qc = null, Wa !== null) {
			for (t = 0; t < Wa.length; t++) if (n = Wa[t], r = n.interleaved, r !== null) {
				n.interleaved = null;
				var i = r.next, a = n.pending;
				if (a !== null) {
					var o = a.next;
					a.next = i, r.next = o;
				}
				n.pending = r;
			}
			Wa = null;
		}
		return e;
	}
	function Dl(e, t) {
		do {
			var n = Uc;
			try {
				if (za(), _o.current = ds, Co) {
					for (var i = bo.memoizedState; i !== null;) {
						var a = i.queue;
						a !== null && (a.pending = null), i = i.next;
					}
					Co = !1;
				}
				if (yo = 0, So = xo = bo = null, wo = !1, To = 0, zc.current = null, n === null || n.return === null) {
					qc = 1, Jc = t, Uc = null;
					break;
				}
				a: {
					var o = e, s = n.return, c = n, l = t;
					if (t = Wc, c.flags |= 32768, typeof l == "object" && l && typeof l.then == "function") {
						var u = l, d = c, f = d.tag;
						if (!(d.mode & 1) && (f === 0 || f === 11 || f === 15)) {
							var p = d.alternate;
							p ? (d.updateQueue = p.updateQueue, d.memoizedState = p.memoizedState, d.lanes = p.lanes) : (d.updateQueue = null, d.memoizedState = null);
						}
						var m = ks(s);
						if (m !== null) {
							m.flags &= -257, As(m, s, c, o, t), m.mode & 1 && Os(o, u, t), t = m, l = u;
							var h = t.updateQueue;
							if (h === null) {
								var g = /* @__PURE__ */ new Set();
								g.add(l), t.updateQueue = g;
							} else h.add(l);
							break a;
						}
						if (!(t & 1)) {
							Os(o, u, t), kl();
							break a;
						}
						l = Error(r(426));
					} else if (_a && c.mode & 1) {
						var _ = ks(s);
						if (_ !== null) {
							!(_.flags & 65536) && (_.flags |= 256), As(_, s, c, o, t), Da(Ss(l, c));
							break a;
						}
					}
					o = l = Ss(l, c), qc !== 4 && (qc = 2), Qc === null ? Qc = [o] : Qc.push(o), o = s;
					do {
						switch (o.tag) {
							case 3:
								o.flags |= 65536, t &= -t, o.lanes |= t;
								var v = Es(o, l, t);
								eo(o, v);
								break a;
							case 1:
								c = l;
								var y = o.type, b = o.stateNode;
								if (!(o.flags & 128) && (typeof y.getDerivedStateFromError == "function" || b !== null && typeof b.componentDidCatch == "function" && (al === null || !al.has(b)))) {
									o.flags |= 65536, t &= -t, o.lanes |= t;
									var x = Ds(o, c, t);
									eo(o, x);
									break a;
								}
						}
						o = o.return;
					} while (o !== null);
				}
				Pl(n);
			} catch (e) {
				t = e, Uc === n && n !== null && (Uc = n = n.return);
				continue;
			}
			break;
		} while (1);
	}
	function Ol() {
		var e = Rc.current;
		return Rc.current = ds, e === null ? ds : e;
	}
	function kl() {
		(qc === 0 || qc === 3 || qc === 2) && (qc = 4), Hc === null || !(Yc & 268435455) && !(Xc & 268435455) || xl(Hc, Wc);
	}
	function Al(e, t) {
		var n = Vc;
		Vc |= 2;
		var i = Ol();
		(Hc !== e || Wc !== t) && (nl = null, El(e, t));
		do
			try {
				jl();
				break;
			} catch (t) {
				Dl(e, t);
			}
		while (1);
		if (za(), Vc = n, Rc.current = i, Uc !== null) throw Error(r(261));
		return Hc = null, Wc = 0, qc;
	}
	function jl() {
		for (; Uc !== null;) Nl(Uc);
	}
	function Ml() {
		for (; Uc !== null && !rt();) Nl(Uc);
	}
	function Nl(e) {
		var t = Wl(e.alternate, e, Gc);
		e.memoizedProps = e.pendingProps, t === null ? Pl(e) : Uc = t, zc.current = null;
	}
	function Pl(e) {
		var t = e;
		do {
			var n = t.alternate;
			if (e = t.return, t.flags & 32768) {
				if (n = cc(n, t), n !== null) {
					n.flags &= 32767, Uc = n;
					return;
				}
				if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
				else {
					qc = 6, Uc = null;
					return;
				}
			} else if (n = sc(n, t, Gc), n !== null) {
				Uc = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				Uc = t;
				return;
			}
			Uc = t = e;
		} while (t !== null);
		qc === 0 && (qc = 5);
	}
	function Fl(e, t, n) {
		var r = At, i = Bc.transition;
		try {
			Bc.transition = null, At = 1, Il(e, t, n, r);
		} finally {
			Bc.transition = i, At = r;
		}
		return null;
	}
	function Il(e, t, n, i) {
		do
			Ll();
		while (sl !== null);
		if (Vc & 6) throw Error(r(327));
		n = e.finishedWork;
		var a = e.finishedLanes;
		if (n === null) return null;
		if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(r(177));
		e.callbackNode = null, e.callbackPriority = 0;
		var o = n.lanes | n.childLanes;
		if (Ot(e, o), e === Hc && (Uc = Hc = null, Wc = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || ol || (ol = !0, Gl(lt, function() {
			return Ll(), null;
		})), o = !!(n.flags & 15990), n.subtreeFlags & 15990 || o) {
			o = Bc.transition, Bc.transition = null;
			var s = At;
			At = 1;
			var c = Vc;
			Vc |= 4, zc.current = null, hc(e, n), Ac(n, e), Er(pi), nn = !!fi, pi = fi = null, e.current = n, Mc(n, e, a), it(), Vc = c, At = s, Bc.transition = o;
		} else e.current = n;
		if (ol && (ol = !1, sl = e, cl = a), o = e.pendingLanes, o === 0 && (al = null), mt(n.stateNode, i), gl(e, at()), t !== null) for (i = e.onRecoverableError, n = 0; n < t.length; n++) a = t[n], i(a.value, {
			componentStack: a.stack,
			digest: a.digest
		});
		if (rl) throw rl = !1, e = il, il = null, e;
		return cl & 1 && e.tag !== 0 && Ll(), o = e.pendingLanes, o & 1 ? e === ul ? ll++ : (ll = 0, ul = e) : ll = 0, ta(), null;
	}
	function Ll() {
		if (sl !== null) {
			var e = jt(cl), t = Bc.transition, n = At;
			try {
				if (Bc.transition = null, At = 16 > e ? 16 : e, sl === null) var i = !1;
				else {
					if (e = sl, sl = null, cl = 0, Vc & 6) throw Error(r(331));
					var a = Vc;
					for (Vc |= 4, Q = e.current; Q !== null;) {
						var o = Q, s = o.child;
						if (Q.flags & 16) {
							var c = o.deletions;
							if (c !== null) {
								for (var l = 0; l < c.length; l++) {
									var u = c[l];
									for (Q = u; Q !== null;) {
										var d = Q;
										switch (d.tag) {
											case 0:
											case 11:
											case 15: gc(8, d, o);
										}
										var f = d.child;
										if (f !== null) f.return = d, Q = f;
										else for (; Q !== null;) {
											d = Q;
											var p = d.sibling, m = d.return;
											if (yc(d), d === u) {
												Q = null;
												break;
											}
											if (p !== null) {
												p.return = m, Q = p;
												break;
											}
											Q = m;
										}
									}
								}
								var h = o.alternate;
								if (h !== null) {
									var g = h.child;
									if (g !== null) {
										h.child = null;
										do {
											var _ = g.sibling;
											g.sibling = null, g = _;
										} while (g !== null);
									}
								}
								Q = o;
							}
						}
						if (o.subtreeFlags & 2064 && s !== null) s.return = o, Q = s;
						else b: for (; Q !== null;) {
							if (o = Q, o.flags & 2048) switch (o.tag) {
								case 0:
								case 11:
								case 15: gc(9, o, o.return);
							}
							var v = o.sibling;
							if (v !== null) {
								v.return = o.return, Q = v;
								break b;
							}
							Q = o.return;
						}
					}
					var y = e.current;
					for (Q = y; Q !== null;) {
						s = Q;
						var b = s.child;
						if (s.subtreeFlags & 2064 && b !== null) b.return = s, Q = b;
						else b: for (s = y; Q !== null;) {
							if (c = Q, c.flags & 2048) try {
								switch (c.tag) {
									case 0:
									case 11:
									case 15: _c(9, c);
								}
							} catch (e) {
								zl(c, c.return, e);
							}
							if (c === s) {
								Q = null;
								break b;
							}
							var x = c.sibling;
							if (x !== null) {
								x.return = c.return, Q = x;
								break b;
							}
							Q = c.return;
						}
					}
					if (Vc = a, ta(), pt && typeof pt.onPostCommitFiberRoot == "function") try {
						pt.onPostCommitFiberRoot(ft, e);
					} catch {}
					i = !0;
				}
				return i;
			} finally {
				At = n, Bc.transition = t;
			}
		}
		return !1;
	}
	function Rl(e, t, n) {
		t = Ss(n, t), t = Es(e, t, 1), e = Qa(e, t, 1), t = pl(), e !== null && (Dt(e, 1, t), gl(e, t));
	}
	function zl(e, t, n) {
		if (e.tag === 3) Rl(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				Rl(t, e, n);
				break;
			}
			if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (al === null || !al.has(r))) {
					e = Ss(n, e), e = Ds(t, e, 1), t = Qa(t, e, 1), e = pl(), t !== null && (Dt(t, 1, e), gl(t, e));
					break;
				}
			}
			t = t.return;
		}
	}
	function Bl(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), t = pl(), e.pingedLanes |= e.suspendedLanes & n, Hc === e && (Wc & n) === n && (qc === 4 || qc === 3 && (Wc & 130023424) === Wc && 500 > at() - el ? El(e, 0) : Zc |= n), gl(e, t);
	}
	function Vl(e, t) {
		t === 0 && (e.mode & 1 ? (t = bt, bt <<= 1, !(bt & 130023424) && (bt = 4194304)) : t = 1);
		var n = pl();
		e = qa(e, t), e !== null && (Dt(e, t, n), gl(e, n));
	}
	function Hl(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), Vl(e, n);
	}
	function Ul(e, t) {
		var n = 0;
		switch (e.tag) {
			case 13:
				var i = e.stateNode, a = e.memoizedState;
				a !== null && (n = a.retryLane);
				break;
			case 19:
				i = e.stateNode;
				break;
			default: throw Error(r(314));
		}
		i !== null && i.delete(t), Vl(e, n);
	}
	var Wl = function(e, t, n) {
		if (e !== null) {
			if (e.memoizedProps !== t.pendingProps || Vi.current) Ms = !0;
			else {
				if ((e.lanes & n) === 0 && !(t.flags & 128)) return Ms = !1, tc(e, t, n);
				Ms = !!(e.flags & 131072);
			}
		} else Ms = !1, _a && t.flags & 1048576 && fa(t, aa, t.index);
		switch (t.lanes = 0, t.tag) {
			case 2:
				var i = t.type;
				$s(e, t), e = t.pendingProps;
				var a = Ui(t, Bi.current);
				Ha(t, n), a = ko(null, t, i, e, a, n);
				var o = Ao();
				return t.flags |= 1, typeof a == "object" && a && typeof a.render == "function" && a.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Wi(i) ? (o = !0, Ji(t)) : o = !1, t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, Ya(t), a.updater = _s, t.stateNode = a, a._reactInternals = t, xs(t, i, e, n), t = Vs(null, t, i, !0, o, n)) : (t.tag = 0, _a && o && pa(t), Ns(null, t, a, n), t = t.child), t;
			case 16:
				i = t.elementType;
				a: {
					switch ($s(e, t), e = t.pendingProps, a = i._init, i = a(i._payload), t.type = i, a = t.tag = Yl(i), e = hs(i, e), a) {
						case 0:
							t = zs(null, t, i, e, n);
							break a;
						case 1:
							t = Bs(null, t, i, e, n);
							break a;
						case 11:
							t = Ps(null, t, i, e, n);
							break a;
						case 14:
							t = Fs(null, t, i, hs(i.type, e), n);
							break a;
					}
					throw Error(r(306, i, ""));
				}
				return t;
			case 0: return i = t.type, a = t.pendingProps, a = t.elementType === i ? a : hs(i, a), zs(e, t, i, a, n);
			case 1: return i = t.type, a = t.pendingProps, a = t.elementType === i ? a : hs(i, a), Bs(e, t, i, a, n);
			case 3:
				a: {
					if (Hs(t), e === null) throw Error(r(387));
					i = t.pendingProps, o = t.memoizedState, a = o.element, Xa(e, t), to(t, i, null, n);
					var s = t.memoizedState;
					if (i = s.element, o.isDehydrated) {
						if (o = {
							element: i,
							isDehydrated: !1,
							cache: s.cache,
							pendingSuspenseBoundaries: s.pendingSuspenseBoundaries,
							transitions: s.transitions
						}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
							a = Ss(Error(r(423)), t), t = Us(e, t, i, n, a);
							break a;
						}
						if (i !== a) {
							a = Ss(Error(r(424)), t), t = Us(e, t, i, n, a);
							break a;
						}
						for (ga = xi(t.stateNode.containerInfo.firstChild), ha = t, _a = !0, va = null, n = Pa(t, null, i, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					} else {
						if (Ea(), i === a) {
							t = ec(e, t, n);
							break a;
						}
						Ns(e, t, i, n);
					}
					t = t.child;
				}
				return t;
			case 5: return uo(t), e === null && Sa(t), i = t.type, a = t.pendingProps, o = e === null ? null : e.memoizedProps, s = a.children, mi(i, a) ? s = null : o !== null && mi(i, o) && (t.flags |= 32), Rs(e, t), Ns(e, t, s, n), t.child;
			case 6: return e === null && Sa(t), null;
			case 13: return Ks(e, t, n);
			case 4: return co(t, t.stateNode.containerInfo), i = t.pendingProps, e === null ? t.child = Na(t, null, i, n) : Ns(e, t, i, n), t.child;
			case 11: return i = t.type, a = t.pendingProps, a = t.elementType === i ? a : hs(i, a), Ps(e, t, i, a, n);
			case 7: return Ns(e, t, t.pendingProps, n), t.child;
			case 8: return Ns(e, t, t.pendingProps.children, n), t.child;
			case 12: return Ns(e, t, t.pendingProps.children, n), t.child;
			case 10:
				a: {
					if (i = t.type._context, a = t.pendingProps, o = t.memoizedProps, s = a.value, Ri(Fa, i._currentValue), i._currentValue = s, o !== null) {
						if (yr(o.value, s)) {
							if (o.children === a.children && !Vi.current) {
								t = ec(e, t, n);
								break a;
							}
						} else for (o = t.child, o !== null && (o.return = t); o !== null;) {
							var c = o.dependencies;
							if (c !== null) {
								s = o.child;
								for (var l = c.firstContext; l !== null;) {
									if (l.context === i) {
										if (o.tag === 1) {
											l = Za(-1, n & -n), l.tag = 2;
											var u = o.updateQueue;
											if (u !== null) {
												u = u.shared;
												var d = u.pending;
												d === null ? l.next = l : (l.next = d.next, d.next = l), u.pending = l;
											}
										}
										o.lanes |= n, l = o.alternate, l !== null && (l.lanes |= n), Va(o.return, n, t), c.lanes |= n;
										break;
									}
									l = l.next;
								}
							} else if (o.tag === 10) s = o.type === t.type ? null : o.child;
							else if (o.tag === 18) {
								if (s = o.return, s === null) throw Error(r(341));
								s.lanes |= n, c = s.alternate, c !== null && (c.lanes |= n), Va(s, n, t), s = o.sibling;
							} else s = o.child;
							if (s !== null) s.return = o;
							else for (s = o; s !== null;) {
								if (s === t) {
									s = null;
									break;
								}
								if (o = s.sibling, o !== null) {
									o.return = s.return, s = o;
									break;
								}
								s = s.return;
							}
							o = s;
						}
					}
					Ns(e, t, a.children, n), t = t.child;
				}
				return t;
			case 9: return a = t.type, i = t.pendingProps.children, Ha(t, n), a = Ua(a), i = i(a), t.flags |= 1, Ns(e, t, i, n), t.child;
			case 14: return i = t.type, a = hs(i, t.pendingProps), a = hs(i.type, a), Fs(e, t, i, a, n);
			case 15: return Is(e, t, t.type, t.pendingProps, n);
			case 17: return i = t.type, a = t.pendingProps, a = t.elementType === i ? a : hs(i, a), $s(e, t), t.tag = 1, Wi(i) ? (e = !0, Ji(t)) : e = !1, Ha(t, n), ys(t, i, a), xs(t, i, a, n), Vs(null, t, i, !0, e, n);
			case 19: return Qs(e, t, n);
			case 22: return Ls(e, t, n);
		}
		throw Error(r(156, t.tag));
	};
	function Gl(e, t) {
		return tt(e, t);
	}
	function Kl(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function ql(e, t, n, r) {
		return new Kl(e, t, n, r);
	}
	function Jl(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function Yl(e) {
		if (typeof e == "function") return +!!Jl(e);
		if (e != null) {
			if (e = e.$$typeof, e === j) return 11;
			if (e === P) return 14;
		}
		return 2;
	}
	function Xl(e, t) {
		var n = e.alternate;
		return n === null ? (n = ql(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
	}
	function Zl(e, t, n, i, a, o) {
		var s = 2;
		if (i = e, typeof e == "function") Jl(e) && (s = 1);
		else if (typeof e == "string") s = 5;
		else a: switch (e) {
			case E: return Ql(n.children, a, o, t);
			case D:
				s = 8, a |= 8;
				break;
			case O: return e = ql(12, n, t, a | 2), e.elementType = O, e.lanes = o, e;
			case M: return e = ql(13, n, t, a), e.elementType = M, e.lanes = o, e;
			case N: return e = ql(19, n, t, a), e.elementType = N, e.lanes = o, e;
			case I: return $l(n, a, o, t);
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case k:
						s = 10;
						break a;
					case A:
						s = 9;
						break a;
					case j:
						s = 11;
						break a;
					case P:
						s = 14;
						break a;
					case F:
						s = 16, i = null;
						break a;
				}
				throw Error(r(130, e == null ? e : typeof e, ""));
		}
		return t = ql(s, n, t, a), t.elementType = e, t.type = i, t.lanes = o, t;
	}
	function Ql(e, t, n, r) {
		return e = ql(7, e, r, t), e.lanes = n, e;
	}
	function $l(e, t, n, r) {
		return e = ql(22, e, r, t), e.elementType = I, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
	}
	function eu(e, t, n) {
		return e = ql(6, e, null, t), e.lanes = n, e;
	}
	function tu(e, t, n) {
		return t = ql(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	function nu(e, t, n, r, i) {
		this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Et(0), this.expirationTimes = Et(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Et(0), this.identifierPrefix = r, this.onRecoverableError = i, this.mutableSourceEagerHydrationData = null;
	}
	function ru(e, t, n, r, i, a, o, s, c) {
		return e = new nu(e, t, n, s, c), t === 1 ? (t = 1, !0 === a && (t |= 8)) : t = 0, a = ql(3, null, null, t), e.current = a, a.stateNode = e, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: null,
			transitions: null,
			pendingSuspenseBoundaries: null
		}, Ya(a), e;
	}
	function iu(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: T,
			key: r == null ? null : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	function au(e) {
		if (!e) return zi;
		e = e._reactInternals;
		a: {
			if (Ye(e) !== e || e.tag !== 1) throw Error(r(170));
			var t = e;
			do {
				switch (t.tag) {
					case 3:
						t = t.stateNode.context;
						break a;
					case 1: if (Wi(t.type)) {
						t = t.stateNode.__reactInternalMemoizedMergedChildContext;
						break a;
					}
				}
				t = t.return;
			} while (t !== null);
			throw Error(r(171));
		}
		if (e.tag === 1) {
			var n = e.type;
			if (Wi(n)) return qi(e, n, t);
		}
		return t;
	}
	function ou(e, t, n, r, i, a, o, s, c) {
		return e = ru(n, r, !0, e, i, a, o, s, c), e.context = au(null), n = e.current, r = pl(), i = ml(n), a = Za(r, i), a.callback = t ?? null, Qa(n, a, i), e.current.lanes = i, Dt(e, i, r), gl(e, r), e;
	}
	function su(e, t, n, r) {
		var i = t.current, a = pl(), o = ml(i);
		return n = au(n), t.context === null ? t.context = n : t.pendingContext = n, t = Za(a, o), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = Qa(i, t, o), e !== null && (hl(e, i, o, a), $a(e, i, o)), o;
	}
	function cu(e) {
		if (e = e.current, !e.child) return null;
		switch (e.child.tag) {
			case 5: return e.child.stateNode;
			default: return e.child.stateNode;
		}
	}
	function lu(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function uu(e, t) {
		lu(e, t), (e = e.alternate) && lu(e, t);
	}
	function du() {
		return null;
	}
	var fu = typeof reportError == "function" ? reportError : function(e) {
		console.error(e);
	};
	function pu(e) {
		this._internalRoot = e;
	}
	mu.prototype.render = pu.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(r(409));
		su(e, t, null, null);
	}, mu.prototype.unmount = pu.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			wl(function() {
				su(null, e, null, null);
			}), t[Ei] = null;
		}
	};
	function mu(e) {
		this._internalRoot = e;
	}
	mu.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = Ft();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < Wt.length && t !== 0 && t < Wt[n].priority; n++);
			Wt.splice(n, 0, e), n === 0 && Yt(e);
		}
	};
	function hu(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function gu(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
	}
	function _u() {}
	function vu(e, t, n, r, i) {
		if (i) {
			if (typeof r == "function") {
				var a = r;
				r = function() {
					var e = cu(o);
					a.call(e);
				};
			}
			var o = ou(t, r, e, 0, null, !1, !1, "", _u);
			return e._reactRootContainer = o, e[Ei] = o.current, ei(e.nodeType === 8 ? e.parentNode : e), wl(), o;
		}
		for (; i = e.lastChild;) e.removeChild(i);
		if (typeof r == "function") {
			var s = r;
			r = function() {
				var e = cu(c);
				s.call(e);
			};
		}
		var c = ru(e, 0, !1, null, null, !1, !1, "", _u);
		return e._reactRootContainer = c, e[Ei] = c.current, ei(e.nodeType === 8 ? e.parentNode : e), wl(function() {
			su(t, c, n, r);
		}), c;
	}
	function yu(e, t, n, r, i) {
		var a = n._reactRootContainer;
		if (a) {
			var o = a;
			if (typeof i == "function") {
				var s = i;
				i = function() {
					var e = cu(o);
					s.call(e);
				};
			}
			su(t, o, e, i);
		} else o = vu(n, t, e, i, r);
		return cu(o);
	}
	Mt = function(e) {
		switch (e.tag) {
			case 3:
				var t = e.stateNode;
				if (t.current.memoizedState.isDehydrated) {
					var n = Z(t.pendingLanes);
					n !== 0 && (kt(t, n | 1), gl(t, at()), !(Vc & 6) && (tl = at() + 500, ta()));
				}
				break;
			case 13: wl(function() {
				var t = qa(e, 1);
				t !== null && hl(t, e, 1, pl());
			}), uu(e, 1);
		}
	}, Nt = function(e) {
		if (e.tag === 13) {
			var t = qa(e, 134217728);
			t !== null && hl(t, e, 134217728, pl()), uu(e, 134217728);
		}
	}, Pt = function(e) {
		if (e.tag === 13) {
			var t = ml(e), n = qa(e, t);
			n !== null && hl(n, e, t, pl()), uu(e, t);
		}
	}, Ft = function() {
		return At;
	}, It = function(e, t) {
		var n = At;
		try {
			return At = e, t();
		} finally {
			At = n;
		}
	}, Oe = function(e, t, n) {
		switch (t) {
			case "input":
				if (G(e, n), t = n.name, n.type === "radio" && t != null) {
					for (n = e; n.parentNode;) n = n.parentNode;
					for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + "][type=\"radio\"]"), t = 0; t < n.length; t++) {
						var i = n[t];
						if (i !== e && i.form === e.form) {
							var a = Ni(i);
							if (!a) throw Error(r(90));
							se(i), G(i, a);
						}
					}
				}
				break;
			case "textarea":
				J(e, n);
				break;
			case "select": t = n.value, t != null && fe(e, !!n.multiple, t, !1);
		}
	}, Pe = Cl, Fe = wl;
	var bu = {
		usingClientEntryPoint: !1,
		Events: [
			ji,
			Mi,
			Ni,
			Me,
			Ne,
			Cl
		]
	}, xu = {
		findFiberByHostInstance: Ai,
		bundleType: 0,
		version: "18.3.1",
		rendererPackageName: "react-dom"
	}, Su = {
		bundleType: xu.bundleType,
		version: xu.version,
		rendererPackageName: xu.rendererPackageName,
		rendererConfig: xu.rendererConfig,
		overrideHookState: null,
		overrideHookStateDeletePath: null,
		overrideHookStateRenamePath: null,
		overrideProps: null,
		overridePropsDeletePath: null,
		overridePropsRenamePath: null,
		setErrorHandler: null,
		setSuspenseHandler: null,
		scheduleUpdate: null,
		currentDispatcherRef: C.ReactCurrentDispatcher,
		findHostInstanceByFiber: function(e) {
			return e = $e(e), e === null ? null : e.stateNode;
		},
		findFiberByHostInstance: xu.findFiberByHostInstance || du,
		findHostInstancesForRefresh: null,
		scheduleRefresh: null,
		scheduleRoot: null,
		setRefreshHandler: null,
		getCurrentFiber: null,
		reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var Cu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!Cu.isDisabled && Cu.supportsFiber) try {
			ft = Cu.inject(Su), pt = Cu;
		} catch {}
	}
	e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = bu, e.createPortal = function(e, t) {
		var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!hu(t)) throw Error(r(200));
		return iu(e, t, null, n);
	}, e.createRoot = function(e, t) {
		if (!hu(e)) throw Error(r(299));
		var n = !1, i = "", a = fu;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onRecoverableError !== void 0 && (a = t.onRecoverableError)), t = ru(e, 1, !1, null, null, n, !1, i, a), e[Ei] = t.current, ei(e.nodeType === 8 ? e.parentNode : e), new pu(t);
	}, e.findDOMNode = function(e) {
		if (e == null) return null;
		if (e.nodeType === 1) return e;
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(r(188)) : (e = Object.keys(e).join(","), Error(r(268, e)));
		return e = $e(t), e = e === null ? null : e.stateNode, e;
	}, e.flushSync = function(e) {
		return wl(e);
	}, e.hydrate = function(e, t, n) {
		if (!gu(t)) throw Error(r(200));
		return yu(null, e, t, !0, n);
	}, e.hydrateRoot = function(e, t, n) {
		if (!hu(e)) throw Error(r(405));
		var i = n != null && n.hydratedSources || null, a = !1, o = "", s = fu;
		if (n != null && (!0 === n.unstable_strictMode && (a = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (s = n.onRecoverableError)), t = ou(t, null, e, 1, n ?? null, a, !1, o, s), e[Ei] = t.current, ei(e), i) for (e = 0; e < i.length; e++) n = i[e], a = n._getVersion, a = a(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, a] : t.mutableSourceEagerHydrationData.push(n, a);
		return new mu(t);
	}, e.render = function(e, t, n) {
		if (!gu(t)) throw Error(r(200));
		return yu(null, e, t, !1, n);
	}, e.unmountComponentAtNode = function(e) {
		if (!gu(e)) throw Error(r(40));
		return e._reactRootContainer ? (wl(function() {
			yu(null, null, e, !1, function() {
				e._reactRootContainer = null, e[Ei] = null;
			});
		}), !0) : !1;
	}, e.unstable_batchedUpdates = Cl, e.unstable_renderSubtreeIntoContainer = function(e, t, n, i) {
		if (!gu(n)) throw Error(r(200));
		if (e == null || e._reactInternals === void 0) throw Error(r(38));
		return yu(e, t, n, !1, i);
	}, e.version = "18.3.1-next-f1338f8080-20240426";
})), m = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = p();
})), h = /* @__PURE__ */ o(((e) => {
	var t = m();
	e.createRoot = t.createRoot, e.hydrateRoot = t.hydrateRoot;
})), g = /* @__PURE__ */ c(u()), _ = (e) => {
	let t = g.useRef(e);
	return t.current = e, g.useCallback((...e) => t.current?.(...e), []);
};
// node_modules/@rc-component/util/es/Dom/canUseDom.js
function v() {
	return !!(typeof window < "u" && window.document && window.document.createElement);
}
// node_modules/@rc-component/util/es/hooks/useLayoutEffect.js
var y = v() ? g.useLayoutEffect : g.useEffect, b = (e, t) => {
	let n = g.useRef(!0);
	y(() => e(n.current), t), y(() => (n.current = !1, () => {
		n.current = !0;
	}), []);
}, x = (e) => {
	let t = g.useRef(!1), [n, r] = g.useState(e);
	g.useEffect(() => (t.current = !1, () => {
		t.current = !0;
	}), []);
	function i(e, n) {
		n && t.current || r(e);
	}
	return [n, i];
};
// node_modules/@rc-component/util/es/hooks/useControlledState.js
function S(e, t) {
	let [n, r] = (0, g.useState)(e), i = t === void 0 ? n : t;
	return b((e) => {
		e || r(t);
	}, [t]), [i, r];
}
// node_modules/@rc-component/util/es/raf.js
var C = (e) => +setTimeout(e, 16), w = (e) => clearTimeout(e);
typeof window < "u" && "requestAnimationFrame" in window && (C = (e) => window.requestAnimationFrame(e), w = (e) => window.cancelAnimationFrame(e));
var T = 0, E = /* @__PURE__ */ new Map();
function D(e) {
	E.delete(e);
}
var O = (e, t = 1) => {
	T += 1;
	let n = T;
	function r(t) {
		if (t === 0) D(n), e();
		else {
			let e = C(() => {
				r(t - 1);
			});
			E.set(n, e);
		}
	}
	return r(t), n;
};
O.cancel = (e) => {
	let t = E.get(e);
	return D(e), w(t);
};
// node_modules/@rc-component/util/es/hooks/useDelayState.js
function k(e) {
	let [t, n] = g.useState(e), r = g.useRef(null), i = _(() => {
		if (r.current) {
			let [e, t] = r.current;
			e ? O.cancel(t) : clearTimeout(t), r.current = null;
		}
	});
	return g.useEffect(() => i, [i]), [t, _((e, t) => {
		let a = t || { frame: 1 };
		i(), a === !0 ? n(e) : "ms" in a ? r.current = [!1, setTimeout(() => n(e), a.ms)] : r.current = [!0, O(() => n(e), a.frame)];
	})];
}
// node_modules/@rc-component/util/es/hooks/useId.js
function A() {
	return { ...g }.useId;
}
var j = 0, M = A(), N = M ? function(e) {
	let t = M();
	return e || t;
} : function(e) {
	let [t, n] = g.useState("ssr-id");
	return g.useEffect(() => {
		let e = j;
		j += 1, n(`rc_unique_${e}`);
	}, []), e || t;
};
// node_modules/@rc-component/util/es/hooks/useMemo.js
function P(e, t, n) {
	let r = g.useRef({});
	return (!("value" in r.current) || n(r.current.condition, t)) && (r.current.value = e(), r.current.condition = t), r.current.value;
}
// node_modules/@rc-component/util/es/hooks/useSyncState.js
function F(e) {
	let [, t] = g.useReducer((e) => e + 1, 0), n = g.useRef(e);
	return [_(() => n.current), _((e) => {
		n.current = typeof e == "function" ? e(n.current) : e, t();
	})];
}
// node_modules/react-is/cjs/react-is.production.js
var I = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), p = Symbol.for("react.view_transition");
	function m(e) {
		if (typeof e == "object" && e) {
			var m = e.$$typeof;
			switch (m) {
				case t: switch (e = e.type, e) {
					case r:
					case a:
					case i:
					case l:
					case u:
					case p: return e;
					default: switch (e &&= e.$$typeof, e) {
						case s:
						case c:
						case f:
						case d: return e;
						case o: return e;
						default: return m;
					}
				}
				case n: return m;
			}
		}
	}
	e.ForwardRef = c, e.isMemo = function(e) {
		return m(e) === d;
	};
})), L = /* @__PURE__ */ o(((e, t) => {
	t.exports = I();
})), R = Symbol.for("react.element"), z = Symbol.for("react.transitional.element"), ee = Symbol.for("react.fragment");
function B(e) {
	return e && typeof e == "object" && (e.$$typeof === R || e.$$typeof === z) && e.type === ee;
}
// node_modules/@rc-component/util/es/ref.js
var V = L(), H = Number(g.version?.split(".")[0]), te = (e, t) => {
	typeof e == "function" ? e(t) : typeof e == "object" && e && "current" in e && (e.current = t);
}, ne = (...e) => {
	let t = e.filter(Boolean);
	return t.length <= 1 ? t[0] : (t) => {
		e.forEach((e) => {
			te(e, t);
		});
	};
}, re = (...e) => P(() => ne(...e), e, (e, t) => e.length !== t.length || e.every((e, n) => e !== t[n])), U = (e) => {
	if (!e) return !1;
	if (ie(e) && H >= 19) return !0;
	let t = (0, V.isMemo)(e) ? e.type.type : e.type;
	return !(typeof t == "function" && !t.prototype?.render && t.$$typeof !== V.ForwardRef || typeof e == "function" && !e.prototype?.render && e.$$typeof !== V.ForwardRef);
};
function ie(e) {
	return /*#__PURE__*/ (0, g.isValidElement)(e) && !B(e);
}
var ae = (e) => ie(e) && U(e), oe = (e) => {
	if (e && ie(e)) {
		let t = e;
		return t.props.propertyIsEnumerable("ref") ? t.props.ref : t.ref;
	}
	return null;
};
// node_modules/@rc-component/util/es/Dom/contains.js
function se(e, t) {
	if (!e) return !1;
	if (e.contains) return e.contains(t);
	let n = t;
	for (; n;) {
		if (n === e) return !0;
		n = n.parentNode;
	}
	return !1;
}
// node_modules/@rc-component/util/es/Dom/dynamicCSS.js
var W = "data-rc-order", ce = "data-rc-priority", le = "rc-util-key", ue = /* @__PURE__ */ new Map();
function G({ mark: e } = {}) {
	return e ? e.startsWith("data-") ? e : `data-${e}` : le;
}
function de(e) {
	return e.attachTo ? e.attachTo : document.querySelector("head") || document.body;
}
function K(e) {
	return e === "queue" ? "prependQueue" : e ? "prepend" : "append";
}
function q(e) {
	return e ? Array.from((ue.get(e) || e).children).filter((e) => e.tagName === "STYLE") : [];
}
function fe(e, t = {}) {
	if (!v()) return null;
	let { csp: n, prepend: r, priority: i = 0 } = t, a = K(r), o = a === "prependQueue", s = document.createElement("style");
	s.setAttribute(W, a), o && i && s.setAttribute(ce, `${i}`), n?.nonce && (s.nonce = n?.nonce), s.innerHTML = e;
	let c = de(t);
	if (!c) return null;
	let { firstChild: l } = c;
	if (r) {
		if (o) {
			let e = (t.styles || q(c)).filter((e) => {
				if (!["prepend", "prependQueue"].includes(e.getAttribute(W))) return !1;
				let t = Number(e.getAttribute(ce) || 0);
				return i >= t;
			});
			if (e.length) return c.insertBefore(s, e[e.length - 1].nextSibling), s;
		}
		c.insertBefore(s, l);
	} else c.appendChild(s);
	return s;
}
function pe(e, t = {}) {
	let { styles: n } = t;
	return n ||= q(de(t)), n.find((n) => n.getAttribute(G(t)) === e);
}
function me(e, t = {}) {
	let n = pe(e, t);
	n && de(t)?.removeChild(n);
}
function J(e, t) {
	let n = ue.get(e);
	if (!n || !se(document, n)) {
		let n = fe("", t);
		if (!n) return;
		let { parentNode: r } = n;
		ue.set(e, r), e.removeChild(n);
	}
}
function Y(e, t, n = {}) {
	let r = de(n);
	if (!r) return null;
	let i = q(r), a = {
		...n,
		styles: i
	};
	J(r, a);
	let o = pe(t, a);
	if (o) return a.csp?.nonce && o.nonce !== a.csp?.nonce && (o.nonce = a.csp?.nonce), o.innerHTML !== e && (o.innerHTML = e), o;
	let s = fe(e, a);
	return s ? (s.setAttribute(G(a), t), s) : null;
}
// node_modules/@rc-component/util/es/Dom/findDOMNode.js
function he(e) {
	return e instanceof HTMLElement || e instanceof SVGElement;
}
function ge(e) {
	return e && typeof e == "object" && he(e.nativeElement) ? e.nativeElement : he(e) ? e : null;
}
// node_modules/@rc-component/util/es/Dom/isVisible.js
var _e = ((e) => {
	if (!e) return !1;
	if (e instanceof Element) {
		if (e.offsetParent) return !0;
		if (e.getBBox) {
			let { width: t, height: n } = e.getBBox();
			if (t || n) return !0;
		}
		if (e.getBoundingClientRect) {
			let { width: t, height: n } = e.getBoundingClientRect();
			if (t || n) return !0;
		}
	}
	return !1;
});
// node_modules/@rc-component/util/es/Dom/shadow.js
function ve(e) {
	return e?.getRootNode?.();
}
function ye(e) {
	return ve(e) instanceof ShadowRoot;
}
function be(e) {
	return ye(e) ? ve(e) : null;
}
// node_modules/@rc-component/util/es/KeyCode.js
var X = {
	MAC_ENTER: 3,
	BACKSPACE: 8,
	TAB: 9,
	NUM_CENTER: 12,
	ENTER: 13,
	SHIFT: 16,
	CTRL: 17,
	ALT: 18,
	PAUSE: 19,
	CAPS_LOCK: 20,
	ESC: 27,
	SPACE: 32,
	PAGE_UP: 33,
	PAGE_DOWN: 34,
	END: 35,
	HOME: 36,
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	PRINT_SCREEN: 44,
	INSERT: 45,
	DELETE: 46,
	ZERO: 48,
	ONE: 49,
	TWO: 50,
	THREE: 51,
	FOUR: 52,
	FIVE: 53,
	SIX: 54,
	SEVEN: 55,
	EIGHT: 56,
	NINE: 57,
	QUESTION_MARK: 63,
	A: 65,
	B: 66,
	C: 67,
	D: 68,
	E: 69,
	F: 70,
	G: 71,
	H: 72,
	I: 73,
	J: 74,
	K: 75,
	L: 76,
	M: 77,
	N: 78,
	O: 79,
	P: 80,
	Q: 81,
	R: 82,
	S: 83,
	T: 84,
	U: 85,
	V: 86,
	W: 87,
	X: 88,
	Y: 89,
	Z: 90,
	META: 91,
	WIN_KEY_RIGHT: 92,
	CONTEXT_MENU: 93,
	NUM_ZERO: 96,
	NUM_ONE: 97,
	NUM_TWO: 98,
	NUM_THREE: 99,
	NUM_FOUR: 100,
	NUM_FIVE: 101,
	NUM_SIX: 102,
	NUM_SEVEN: 103,
	NUM_EIGHT: 104,
	NUM_NINE: 105,
	NUM_MULTIPLY: 106,
	NUM_PLUS: 107,
	NUM_MINUS: 109,
	NUM_PERIOD: 110,
	NUM_DIVISION: 111,
	F1: 112,
	F2: 113,
	F3: 114,
	F4: 115,
	F5: 116,
	F6: 117,
	F7: 118,
	F8: 119,
	F9: 120,
	F10: 121,
	F11: 122,
	F12: 123,
	NUMLOCK: 144,
	SEMICOLON: 186,
	DASH: 189,
	EQUALS: 187,
	COMMA: 188,
	PERIOD: 190,
	SLASH: 191,
	APOSTROPHE: 192,
	SINGLE_QUOTE: 222,
	OPEN_SQUARE_BRACKET: 219,
	BACKSLASH: 220,
	CLOSE_SQUARE_BRACKET: 221,
	WIN_KEY: 224,
	MAC_FF_META: 224,
	WIN_IME: 229,
	isTextModifyingKeyEvent: function(e) {
		let { keyCode: t } = e;
		if (e.altKey && !e.ctrlKey || e.metaKey || t >= X.F1 && t <= X.F12) return !1;
		switch (t) {
			case X.ALT:
			case X.CAPS_LOCK:
			case X.CONTEXT_MENU:
			case X.CTRL:
			case X.DOWN:
			case X.END:
			case X.ESC:
			case X.HOME:
			case X.INSERT:
			case X.LEFT:
			case X.MAC_FF_META:
			case X.META:
			case X.NUMLOCK:
			case X.NUM_CENTER:
			case X.PAGE_DOWN:
			case X.PAGE_UP:
			case X.PAUSE:
			case X.PRINT_SCREEN:
			case X.RIGHT:
			case X.SHIFT:
			case X.UP:
			case X.WIN_KEY:
			case X.WIN_KEY_RIGHT: return !1;
			default: return !0;
		}
	},
	isCharacterKey: function(e) {
		if (e >= X.ZERO && e <= X.NINE || e >= X.NUM_ZERO && e <= X.NUM_MULTIPLY || e >= X.A && e <= X.Z || window.navigator.userAgent.indexOf("WebKit") !== -1 && e === 0) return !0;
		switch (e) {
			case X.SPACE:
			case X.QUESTION_MARK:
			case X.NUM_PLUS:
			case X.NUM_MINUS:
			case X.NUM_PERIOD:
			case X.NUM_DIVISION:
			case X.SEMICOLON:
			case X.DASH:
			case X.EQUALS:
			case X.COMMA:
			case X.PERIOD:
			case X.SLASH:
			case X.APOSTROPHE:
			case X.SINGLE_QUOTE:
			case X.OPEN_SQUARE_BRACKET:
			case X.BACKSLASH:
			case X.CLOSE_SQUARE_BRACKET: return !0;
			default: return !1;
		}
	},
	isEditableTarget: function(e) {
		let t = e.target;
		if (!(t instanceof HTMLElement)) return !1;
		let n = t.tagName;
		return !!(n === "INPUT" || n === "TEXTAREA" || n === "SELECT" || t.isContentEditable);
	}
};
// node_modules/@rc-component/util/es/getScrollBarSize.js
function xe(e) {
	let t = `rc-scrollbar-measure-${Math.random().toString(36).substring(7)}`, n = document.createElement("div");
	n.id = t;
	let r = n.style;
	r.position = "absolute", r.left = "0", r.top = "0", r.width = "100px", r.height = "100px", r.overflow = "scroll";
	let i, a;
	if (e) {
		let n = getComputedStyle(e);
		r.scrollbarColor = n.scrollbarColor, r.scrollbarWidth = n.scrollbarWidth;
		let o = getComputedStyle(e, "::-webkit-scrollbar"), s = parseInt(o.width, 10), c = parseInt(o.height, 10);
		try {
			Y(`
#${t}::-webkit-scrollbar {
${s ? `width: ${o.width};` : ""}
${c ? `height: ${o.height};` : ""}
}`, t);
		} catch (e) {
			console.error(e), i = s, a = c;
		}
	}
	document.body.appendChild(n);
	let o = e && i && !Number.isNaN(i) ? i : n.offsetWidth - n.clientWidth, s = e && a && !Number.isNaN(a) ? a : n.offsetHeight - n.clientHeight;
	return document.body.removeChild(n), me(t), {
		width: o,
		height: s
	};
}
function Se(e) {
	return typeof document > "u" || !e || !(e instanceof Element) ? {
		width: 0,
		height: 0
	} : xe(e);
}
// node_modules/@rc-component/util/es/warning.js
var Ce = {}, we = [], Te = (e) => {
	we.push(e);
};
function Ee(e, t) {}
function De(e, t) {}
function Oe() {
	Ce = {};
}
function ke(e, t, n) {
	!t && !Ce[n] && (e(!1, n), Ce[n] = !0);
}
function Ae(e, t) {
	ke(Ee, e, t);
}
function je(e, t) {
	ke(De, e, t);
}
Ae.preMessage = Te, Ae.resetWarned = Oe, Ae.noteOnce = je;
// node_modules/@rc-component/util/es/isEqual.js
function Me(e, t, n = !1) {
	let r = /* @__PURE__ */ new Set();
	function i(e, t, a = 1) {
		let o = r.has(e);
		if (Ae(!o, "Warning: There may be circular references"), o) return !1;
		if (e === t) return !0;
		if (n && a > 1) return !1;
		r.add(e);
		let s = a + 1;
		if (Array.isArray(e)) {
			if (!Array.isArray(t) || e.length !== t.length) return !1;
			for (let n = 0; n < e.length; n++) if (!i(e[n], t[n], s)) return !1;
			return !0;
		}
		if (e && t && typeof e == "object" && typeof t == "object") {
			let n = Object.keys(e);
			return n.length === Object.keys(t).length && n.every((n) => i(e[n], t[n], s));
		}
		return !1;
	}
	return i(e, t);
}
// node_modules/@rc-component/util/es/is.js
function Ne(e) {
	return e != null;
}
function Pe(e) {
	return Ne(e) && e !== !1 && e !== "";
}
(/* @__PURE__ */ o(((e, t) => {
	t.exports = a, t.exports.isMobile = a, t.exports.default = a;
	var n = /(android|bb\d+|meego).+mobile|armv7l|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|redmi|series[46]0|samsungbrowser.*mobile|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i, r = /CrOS/, i = /android|ipad|playbook|silk/i;
	function a(e) {
		e ||= {};
		let t = e.ua;
		if (!t && typeof navigator < "u" && (t = navigator.userAgent), t && t.headers && typeof t.headers["user-agent"] == "string" && (t = t.headers["user-agent"]), typeof t != "string") return !1;
		let a = n.test(t) && !r.test(t) || !!e.tablet && i.test(t);
		return !a && e.tablet && e.featureDetect && navigator && navigator.maxTouchPoints > 1 && t.indexOf("Macintosh") !== -1 && t.indexOf("Safari") !== -1 && (a = !0), a;
	}
})))();
// node_modules/@rc-component/util/es/omit.js
function Fe(e, t) {
	let n = Object.assign({}, e);
	return Array.isArray(t) && t.forEach((e) => {
		delete n[e];
	}), n;
}
// node_modules/@rc-component/util/es/pickAttrs.js
var Ie = "accept acceptCharset accessKey action allowFullScreen allowTransparency\n    alt async autoComplete autoFocus autoPlay capture cellPadding cellSpacing challenge\n    charSet checked classID className colSpan cols content contentEditable contextMenu\n    controls coords crossOrigin data dateTime default defer dir disabled download draggable\n    encType form formAction formEncType formMethod formNoValidate formTarget frameBorder\n    headers height hidden high href hrefLang htmlFor httpEquiv icon id inputMode integrity\n    is keyParams keyType kind label lang list loop low manifest marginHeight marginWidth max maxLength media\n    mediaGroup method min minLength multiple muted name noValidate nonce open\n    optimum pattern placeholder poster preload radioGroup readOnly rel required\n    reversed role rowSpan rows sandbox scope scoped scrolling seamless selected\n    shape size sizes span spellCheck src srcDoc srcLang srcSet start step style\n    summary tabIndex target title type useMap value width wmode wrap onCopy onCut onPaste onCompositionEnd onCompositionStart onCompositionUpdate onKeyDown\n    onKeyPress onKeyUp onFocus onBlur onChange onInput onSubmit onClick onContextMenu onDoubleClick\n    onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown\n    onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onSelect onTouchCancel\n    onTouchEnd onTouchMove onTouchStart onScroll onWheel onAbort onCanPlay onCanPlayThrough\n    onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata\n    onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting onLoad\n    onPointerDown onPointerMove onPointerUp onPointerCancel onPointerEnter onPointerLeave onPointerOver onPointerOut onGotPointerCapture onLostPointerCapture\n    onAnimationStart onAnimationEnd onAnimationIteration\n    onTransitionEnd onTransitionRun onTransitionStart onTransitionCancel\n    onBeforeInput onReset onInvalid\n    onAuxClick onToggle onBeforeToggle onCancel onClose onResize onScrollEnd".split(/[\s\n]+/), Le = "aria-", Re = "data-";
function ze(e, t) {
	return e.indexOf(t) === 0;
}
function Be(e, t = !1) {
	let n;
	n = t === !1 ? {
		aria: !0,
		data: !0,
		attr: !0
	} : t === !0 ? { aria: !0 } : { ...t };
	let r = {};
	return Object.keys(e).forEach((t) => {
		(n.aria && (t === "role" || ze(t, Le)) || n.data && ze(t, Re) || n.attr && Ie.includes(t)) && (r[t] = e[t]);
	}), r;
}
// node_modules/@rc-component/util/es/Children/toArray.js
function Ve(e, t = {}) {
	let n = [];
	return g.Children.forEach(e, (e) => {
		(e != null || t.keepEmpty) && (Array.isArray(e) ? n = n.concat(Ve(e)) : B(e) && e.props ? n = n.concat(Ve(e.props.children, t)) : n.push(e));
	}), n;
}
// node_modules/@rc-component/util/es/utils/get.js
function He(e, t) {
	let n = e;
	for (let e = 0; e < t.length; e += 1) {
		if (n == null) return;
		n = n[t[e]];
	}
	return n;
}
// node_modules/@rc-component/util/es/utils/set.js
function Ue(e, t, n, r) {
	if (!t.length) return n;
	let [i, ...a] = t, o;
	if (o = !e && typeof i == "number" ? [] : Array.isArray(e) ? [...e] : { ...e }, r && n === void 0 && a.length === 1) {
		let e = o[i];
		if (e && typeof e == "object") {
			let t = Array.isArray(e) ? [...e] : { ...e };
			delete t[a[0]], o[i] = t;
		}
	} else o[i] = Ue(o[i], a, n, r);
	return o;
}
function We(e, t, n, r = !1) {
	return t.length && r && n === void 0 && !He(e, t.slice(0, -1)) ? e : Ue(e, t, n, r);
}
function Ge(e) {
	return typeof e == "object" && !!e && Object.getPrototypeOf(e) === Object.prototype;
}
function Ke(e) {
	return Array.isArray(e) ? [] : {};
}
var qe = typeof Reflect > "u" ? Object.keys : Reflect.ownKeys;
function Je(e, t = {}) {
	let { prepareArray: n } = t, r = n || (() => []), i = Ke(e[0]);
	return e.forEach((e) => {
		function t(n, a) {
			let o = new Set(a), s = He(e, n), c = Array.isArray(s);
			if (c || Ge(s)) {
				if (!o.has(s)) {
					o.add(s);
					let e = He(i, n);
					c ? i = We(i, n, r(e, s)) : e && typeof e == "object" || (i = We(i, n, Ke(s))), qe(s).forEach((e) => {
						Object.getOwnPropertyDescriptor(s, e).enumerable && t([...n, e], o);
					});
				}
			} else i = We(i, n, s);
		}
		t([]);
	}), i;
}
function Ye(...e) {
	return Je(e);
}
// node_modules/@rc-component/util/es/React/render.js
var Xe = h(), Ze = "__rc_react_root__";
function Qe(e, t) {
	let n = t[Ze] || (0, Xe.createRoot)(t);
	n.render(e), t[Ze] = n;
}
async function $e(e) {
	return Promise.resolve().then(() => {
		e[Ze]?.unmount(), delete e[Ze];
	});
}
// node_modules/@rc-component/util/es/Portal.js
var et = /* @__PURE__ */ c(m());
// node_modules/antd/es/_util/warning.js
function tt() {}
var { resetWarned: nt } = Ae, rt = /*#__PURE__*/ g.createContext({}), it = () => {
	let e = () => {};
	return e.deprecated = tt, e;
}, at = /*#__PURE__*/ g.createContext(null);
function ot({ children: e, onBatchResize: t }) {
	let n = g.useRef(0), r = g.useRef([]), i = g.useContext(at), a = g.useCallback((e, a, o) => {
		n.current += 1;
		let s = n.current;
		r.current.push({
			size: e,
			element: a,
			data: o
		}), Promise.resolve().then(() => {
			s === n.current && (t?.(r.current), r.current = []);
		}), i?.(e, a, o);
	}, [t, i]);
	return /*#__PURE__*/ g.createElement(at.Provider, { value: a }, e);
}
// node_modules/@rc-component/resize-observer/es/utils/observerUtil.js
var st = /* @__PURE__ */ new Map();
function ct(e) {
	e.forEach((e) => {
		let { target: t } = e;
		st.get(t)?.forEach((e) => e(t));
	});
}
var lt;
function ut() {
	return lt ||= new ResizeObserver(ct), lt;
}
function dt(e, t) {
	st.has(e) || (st.set(e, /* @__PURE__ */ new Set()), ut().observe(e)), st.get(e).add(t);
}
function ft(e, t) {
	st.has(e) && (st.get(e).delete(t), st.get(e).size || (ut().unobserve(e), st.delete(e)));
}
// node_modules/@rc-component/resize-observer/es/useResizeObserver.js
function pt(e, t, n, r) {
	let i = g.useRef({
		width: -1,
		height: -1,
		offsetWidth: -1,
		offsetHeight: -1
	}), a = _((e) => {
		let { width: t, height: a } = e.getBoundingClientRect(), { offsetWidth: o, offsetHeight: s } = e, c = Math.floor(t), l = Math.floor(a);
		if (i.current.width !== c || i.current.height !== l || i.current.offsetWidth !== o || i.current.offsetHeight !== s) {
			let u = {
				width: c,
				height: l,
				offsetWidth: o,
				offsetHeight: s
			};
			i.current = u;
			let d = o === Math.round(t) ? t : o, f = s === Math.round(a) ? a : s, p = {
				...u,
				offsetWidth: d,
				offsetHeight: f
			};
			r?.(p, e), Promise.resolve().then(() => {
				n?.(p, e);
			});
		}
	}), o = typeof t == "function", s = g.useRef(0);
	g.useEffect(() => {
		let n = o ? t() : t;
		return n && e ? dt(n, a) : e && o && (s.current += 1), () => {
			n && ft(n, a);
		};
	}, [e, o ? s.current : t]);
}
// node_modules/@rc-component/resize-observer/es/SingleObserver/index.js
function mt(e, t) {
	let { children: n, disabled: r, onResize: i, data: a } = e, o = g.useRef(null), s = g.useContext(at), c = typeof n == "function", l = c ? n(o) : n, u = !c && /*#__PURE__*/ g.isValidElement(l) && U(l), d = re(u ? oe(l) : null, o), f = () => ge(o.current);
	return g.useImperativeHandle(t, () => f()), pt(!r, f, i, (e, t) => {
		s?.(e, t, a);
	}), u ? /*#__PURE__*/ g.cloneElement(l, { ref: d }) : l;
}
var ht = /*#__PURE__*/ g.forwardRef(mt);
// node_modules/@rc-component/resize-observer/es/index.js
function gt() {
	return gt = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, gt.apply(this, arguments);
}
var _t = "rc-observer-key";
function vt(e, t) {
	let { children: n } = e;
	return (typeof n == "function" ? [n] : Ve(n)).map((n, r) => {
		let i = n?.key || `${_t}-${r}`;
		return /*#__PURE__*/ g.createElement(ht, gt({}, e, {
			key: i,
			ref: r === 0 ? t : void 0
		}), n);
	});
}
var yt = /*#__PURE__*/ g.forwardRef(vt);
yt.Collection = ot;
// node_modules/clsx/dist/clsx.mjs
function bt(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = bt(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function Z() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = bt(e)) && (r && (r += " "), r += t);
	return r;
}
// node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function xt(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
// node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js
function St(e) {
	if (Array.isArray(e)) return xt(e);
}
// node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function Ct(e) {
	if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
// node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
function wt(e, t) {
	if (e) {
		if (typeof e == "string") return xt(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? xt(e, t) : void 0;
	}
}
// node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function Tt() {
	throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// node_modules/@babel/runtime/helpers/esm/toConsumableArray.js
function Et(e) {
	return St(e) || Ct(e) || wt(e) || Tt();
}
var Dt = "anticon", Ot = [
	"outlined",
	"borderless",
	"filled",
	"underlined"
], kt = /*#__PURE__*/ g.createContext({
	getPrefixCls: (e, t) => t || (e ? `ant-${e}` : "ant"),
	iconPrefixCls: Dt
}), { Consumer: At } = kt, jt = {};
function Mt(e) {
	let t = g.useContext(kt), { getPrefixCls: n, direction: r, getPopupContainer: i, renderEmpty: a } = t;
	return {
		classNames: jt,
		styles: jt,
		...t[e],
		getPrefixCls: n,
		direction: r,
		getPopupContainer: i,
		renderEmpty: a
	};
}
// node_modules/@emotion/hash/dist/hash.browser.esm.js
function Nt(e) {
	for (var t = 0, n, r = 0, i = e.length; i >= 4; ++r, i -= 4) n = e.charCodeAt(r) & 255 | (e.charCodeAt(++r) & 255) << 8 | (e.charCodeAt(++r) & 255) << 16 | (e.charCodeAt(++r) & 255) << 24, n = (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16), n ^= n >>> 24, t = (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16) ^ (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
	switch (i) {
		case 3: t ^= (e.charCodeAt(r + 2) & 255) << 16;
		case 2: t ^= (e.charCodeAt(r + 1) & 255) << 8;
		case 1: t ^= e.charCodeAt(r) & 255, t = (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
	}
	return t ^= t >>> 13, t = (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), ((t ^ t >>> 15) >>> 0).toString(36);
}
// node_modules/@ant-design/cssinjs/es/Cache.js
var Pt = "%";
function Ft(e) {
	return e.join(Pt);
}
var It = 0, Lt = class {
	instanceId;
	constructor(e) {
		this.instanceId = e;
	}
	cache = /* @__PURE__ */ new Map();
	updateTimes = /* @__PURE__ */ new Map();
	extracted = /* @__PURE__ */ new Set();
	get(e) {
		return this.opGet(Ft(e));
	}
	opGet(e) {
		return this.cache.get(e) || null;
	}
	update(e, t) {
		return this.opUpdate(Ft(e), t);
	}
	opUpdate(e, t) {
		let n = t(this.cache.get(e));
		n === null ? (this.cache.delete(e), this.updateTimes.delete(e)) : (this.cache.set(e, n), this.updateTimes.set(e, It), It += 1);
	}
}, Rt = "data-token-hash", zt = "data-css-hash", Bt = "__cssinjs_instance__";
function Vt() {
	let e = Math.random().toString(12).slice(2);
	if (typeof document < "u" && document.head && document.body) {
		let t = document.body.querySelectorAll("style[data-css-hash]") || [], { firstChild: n } = document.head;
		Array.from(t).forEach((t) => {
			t[Bt] ||= e, t.__cssinjs_instance__ === e && document.head.insertBefore(t, n);
		});
		let r = {};
		Array.from(document.querySelectorAll(`style[${zt}]`)).forEach((t) => {
			let n = t.getAttribute(zt);
			r[n] ? t.__cssinjs_instance__ === e && t.parentNode?.removeChild(t) : r[n] = !0;
		});
	}
	return new Lt(e);
}
var Ht = /*#__PURE__*/ g.createContext({
	hashPriority: "low",
	cache: Vt(),
	defaultCache: !0,
	autoPrefix: !1
});
// node_modules/@ant-design/cssinjs/es/theme/ThemeCache.js
function Ut(e, t) {
	if (e.length !== t.length) return !1;
	for (let n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;
	return !0;
}
var Wt = class e {
	static MAX_CACHE_SIZE = 20;
	static MAX_CACHE_OFFSET = 5;
	cache;
	keys;
	cacheCallTimes;
	constructor() {
		this.cache = /* @__PURE__ */ new Map(), this.keys = [], this.cacheCallTimes = 0;
	}
	size() {
		return this.keys.length;
	}
	internalGet(e, t = !1) {
		let n = { map: this.cache };
		return e.forEach((e) => {
			n = n ? n?.map?.get(e) : void 0;
		}), n?.value && t && (n.value[1] = this.cacheCallTimes++), n?.value;
	}
	get(e) {
		return this.internalGet(e, !0)?.[0];
	}
	has(e) {
		return !!this.internalGet(e);
	}
	set(t, n) {
		if (!this.has(t)) {
			if (this.size() + 1 > e.MAX_CACHE_SIZE + e.MAX_CACHE_OFFSET) {
				let [e] = this.keys.reduce((e, t) => {
					let [, n] = e;
					return this.internalGet(t)[1] < n ? [t, this.internalGet(t)[1]] : e;
				}, [this.keys[0], this.cacheCallTimes]);
				this.delete(e);
			}
			this.keys.push(t);
		}
		let r = this.cache;
		t.forEach((e, i) => {
			if (i === t.length - 1) r.set(e, { value: [n, this.cacheCallTimes++] });
			else {
				let t = r.get(e);
				t ? t.map ||= /* @__PURE__ */ new Map() : r.set(e, { map: /* @__PURE__ */ new Map() }), r = r.get(e).map;
			}
		});
	}
	deleteByPath(e, t) {
		let n = e.get(t[0]);
		if (t.length === 1) return n.map ? e.set(t[0], { map: n.map }) : e.delete(t[0]), n.value?.[0];
		let r = this.deleteByPath(n.map, t.slice(1));
		return n.map && n.map.size !== 0 || n.value || e.delete(t[0]), r;
	}
	delete(e) {
		if (this.has(e)) return this.keys = this.keys.filter((t) => !Ut(t, e)), this.deleteByPath(this.cache, e);
	}
}, Gt = 0, Kt = class {
	derivatives;
	id;
	constructor(e) {
		this.derivatives = Array.isArray(e) ? e : [e], this.id = Gt, e.length === 0 && e.length, Gt += 1;
	}
	getDerivativeToken(e) {
		return this.derivatives.reduce((t, n) => n(e, t), void 0);
	}
}, qt = new Wt();
function Jt(e) {
	let t = Array.isArray(e) ? e : [e];
	return qt.has(t) || qt.set(t, new Kt(t)), qt.get(t);
}
// node_modules/@ant-design/cssinjs/es/util/index.js
var Yt = /* @__PURE__ */ new WeakMap(), Xt = {};
function Zt(e, t) {
	let n = Yt;
	for (let e = 0; e < t.length; e += 1) {
		let r = t[e];
		n.has(r) || n.set(r, /* @__PURE__ */ new WeakMap()), n = n.get(r);
	}
	return n.has(Xt) || n.set(Xt, e()), n.get(Xt);
}
var Qt = /* @__PURE__ */ new WeakMap();
function $t(e) {
	let t = Qt.get(e) || "";
	return t || (Object.keys(e).forEach((n) => {
		let r = e[n];
		t += n, r instanceof Kt ? t += r.id : t += r && typeof r == "object" ? $t(r) : r;
	}), t = Nt(t), Qt.set(e, t)), t;
}
function en(e, t) {
	return Nt(`${t}_${$t(e)}`);
}
`random-${Date.now()}-${Math.random()}`.replace(/\./g, "");
var tn = v();
function nn(e) {
	return typeof e == "number" ? `${e}px` : e;
}
function rn(e) {
	let { hashCls: t, hashPriority: n = "low" } = e || {};
	if (!t) return "";
	let r = `.${t}`;
	return n === "low" ? `:where(${r})` : r;
}
var an = (e) => e != null;
function on(e, t) {
	let n = typeof t == "function" ? t() : t;
	return n ? {
		...e,
		csp: {
			...e.csp,
			nonce: n
		}
	} : e;
}
// node_modules/@ant-design/cssinjs/es/util/css-variables.js
var sn = (e, t = "") => `--${t ? `${t}-` : ""}${e}`.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, "$1-$2").replace(/([a-z])([A-Z0-9])/g, "$1-$2").toLowerCase(), cn = (e, t, n) => {
	let { hashCls: r, hashPriority: i = "low", scope: a } = n || {};
	if (!Object.keys(e).length) return "";
	let o = `${rn({
		hashCls: r,
		hashPriority: i
	})}.${t}`, s = [a].flat().filter(Boolean);
	return `${s.length ? s.map((e) => `${o}.${e}`).join(", ") : o}{${Object.entries(e).map(([e, t]) => `${e}:${t};`).join("")}}`;
}, ln = (e, t, n) => {
	let { hashCls: r, hashPriority: i = "low", prefix: a, unitless: o, ignore: s, preserve: c } = n || {}, l = {}, u = {};
	return Object.entries(e).forEach(([e, t]) => {
		if (c?.[e]) u[e] = t;
		else if ((typeof t == "string" || typeof t == "number") && !s?.[e]) {
			let n = sn(e, a);
			l[n] = typeof t == "number" && !o?.[e] ? `${t}px` : String(t), u[e] = `var(${n})`;
		}
	}), [u, cn(l, t, {
		scope: n?.scope,
		hashCls: r,
		hashPriority: i
	})];
}, un = /* @__PURE__ */ new Map();
function dn(e, t, n, r, i) {
	let { cache: a } = g.useContext(Ht), o = Ft([e, ...t]), s = (e) => {
		a.opUpdate(o, (t) => {
			let [r = 0, i] = t || [void 0, void 0], a = [r, i || n()];
			return e ? e(a) : a;
		});
	};
	g.useMemo(() => {
		s();
	}, [o]);
	let c = a.opGet(o)[1];
	return (0, g.useInsertionEffect)(() => (s(([e, t]) => [e + 1, t]), un.has(o) || (i?.(c), un.set(o, !0), Promise.resolve().then(() => {
		un.delete(o);
	})), () => {
		a.opUpdate(o, (e) => {
			let [t = 0, n] = e || [];
			return t - 1 == 0 ? (r?.(n, !1), un.delete(o), null) : [t - 1, n];
		});
	}), [o]), c;
}
// node_modules/@ant-design/cssinjs/es/hooks/useCacheToken.js
var fn = {}, pn = "css", mn = /* @__PURE__ */ new Map();
function hn(e) {
	mn.set(e, (mn.get(e) || 0) + 1);
}
function gn(e, t) {
	typeof document < "u" && document.querySelectorAll(`style[${Rt}="${e}"]`).forEach((e) => {
		e.__cssinjs_instance__ === t && e.parentNode?.removeChild(e);
	});
}
var _n = -1;
function vn(e, t) {
	mn.set(e, (mn.get(e) || 0) - 1);
	let n = /* @__PURE__ */ new Set();
	mn.forEach((e, t) => {
		e <= 0 && n.add(t);
	}), mn.size - n.size > _n && n.forEach((e) => {
		gn(e, t), mn.delete(e);
	});
}
var yn = (e, t, n, r) => {
	let i = {
		...n.getDerivativeToken(e),
		...t
	};
	return r && (i = r(i)), i;
}, bn = "token";
function xn(e, t, n) {
	let { cache: { instanceId: r }, container: i, hashPriority: a } = (0, g.useContext)(Ht), { salt: o = "", override: s = fn, formatToken: c, getComputedToken: l, cssVar: u, nonce: d } = n, f = Zt(() => Object.assign({}, ...t), t), p = $t(f), m = $t(s), h = $t(u);
	return dn(bn, [
		o,
		e.id,
		p,
		m,
		h
	], () => {
		let t = l ? l(f, s, e) : yn(f, s, e, c), n = { ...t }, r = `${o}_${u.prefix}`, i = Nt(r), d = `${pn}-${i}`;
		n._tokenKey = en(n, r);
		let [p, m] = ln(t, u.key, {
			prefix: u.prefix,
			ignore: u.ignore,
			unitless: u.unitless,
			preserve: u.preserve,
			hashPriority: a,
			hashCls: u.hashed ? d : void 0
		});
		return p._hashId = i, hn(u.key), [
			p,
			d,
			n,
			m,
			u.key
		];
	}, ([, , , , e]) => {
		vn(e, r);
	}, ([, , , e, t]) => {
		if (!e) return;
		let n = {
			mark: zt,
			prepend: "queue",
			attachTo: i,
			priority: -999
		};
		n = on(n, d);
		let a = Y(e, Nt(`css-var-${t}`), n);
		a[Bt] = r, a.setAttribute(Rt, t);
	});
}
// node_modules/@emotion/unitless/dist/unitless.browser.esm.js
var Sn = {
	animationIterationCount: 1,
	borderImageOutset: 1,
	borderImageSlice: 1,
	borderImageWidth: 1,
	boxFlex: 1,
	boxFlexGroup: 1,
	boxOrdinalGroup: 1,
	columnCount: 1,
	columns: 1,
	flex: 1,
	flexGrow: 1,
	flexPositive: 1,
	flexShrink: 1,
	flexNegative: 1,
	flexOrder: 1,
	gridRow: 1,
	gridRowEnd: 1,
	gridRowSpan: 1,
	gridRowStart: 1,
	gridColumn: 1,
	gridColumnEnd: 1,
	gridColumnSpan: 1,
	gridColumnStart: 1,
	msGridRow: 1,
	msGridRowSpan: 1,
	msGridColumn: 1,
	msGridColumnSpan: 1,
	fontWeight: 1,
	lineHeight: 1,
	opacity: 1,
	order: 1,
	orphans: 1,
	tabSize: 1,
	widows: 1,
	zIndex: 1,
	zoom: 1,
	WebkitLineClamp: 1,
	fillOpacity: 1,
	floodOpacity: 1,
	stopOpacity: 1,
	strokeDasharray: 1,
	strokeDashoffset: 1,
	strokeMiterlimit: 1,
	strokeOpacity: 1,
	strokeWidth: 1
}, Cn = "-ms-", wn = "-moz-", Tn = "-webkit-", En = "comm", Dn = "rule", On = "decl", kn = "@import", An = "@namespace", jn = "@keyframes", Mn = "@layer", Nn = Math.abs, Pn = String.fromCharCode, Fn = Object.assign;
function In(e, t) {
	return Vn(e, 0) ^ 45 ? (((t << 2 ^ Vn(e, 0)) << 2 ^ Vn(e, 1)) << 2 ^ Vn(e, 2)) << 2 ^ Vn(e, 3) : 0;
}
function Ln(e) {
	return e.trim();
}
function Rn(e, t) {
	return (e = t.exec(e)) ? e[0] : e;
}
function zn(e, t, n) {
	return e.replace(t, n);
}
function Bn(e, t) {
	return e.indexOf(t);
}
function Vn(e, t) {
	return e.charCodeAt(t) | 0;
}
function Hn(e, t, n) {
	return e.slice(t, n);
}
function Un(e) {
	return e.length;
}
function Wn(e) {
	return e.length;
}
function Gn(e, t) {
	return t.push(e), e;
}
function Kn(e, t) {
	return e.map(t).join("");
}
function qn(e, t) {
	return e.filter(function(e) {
		return !Rn(e, t);
	});
}
// node_modules/stylis/src/Tokenizer.js
var Jn = 1, Yn = 1, Xn = 0, Zn = 0, Qn = 0, $n = "";
function er(e, t, n, r, i, a, o, s) {
	return {
		value: e,
		root: t,
		parent: n,
		type: r,
		props: i,
		children: a,
		line: Jn,
		column: Yn,
		length: o,
		return: "",
		siblings: s
	};
}
function tr(e, t) {
	return Fn(er("", null, null, "", null, null, 0, e.siblings), e, { length: -e.length }, t);
}
function nr(e) {
	for (; e.root;) e = tr(e.root, { children: [e] });
	Gn(e, e.siblings);
}
function rr() {
	return Qn;
}
function ir() {
	return Qn = Zn > 0 ? Vn($n, --Zn) : 0, Yn--, Qn === 10 && (Yn = 1, Jn--), Qn;
}
function ar() {
	return Qn = Zn < Xn ? Vn($n, Zn++) : 0, Yn++, Qn === 10 && (Yn = 1, Jn++), Qn;
}
function or() {
	return Vn($n, Zn);
}
function sr() {
	return Zn;
}
function cr(e, t) {
	return Hn($n, e, t);
}
function lr(e) {
	switch (e) {
		case 0:
		case 9:
		case 10:
		case 13:
		case 32: return 5;
		case 33:
		case 43:
		case 44:
		case 47:
		case 62:
		case 64:
		case 126:
		case 59:
		case 123:
		case 125: return 4;
		case 58: return 3;
		case 34:
		case 39:
		case 40:
		case 91: return 2;
		case 41:
		case 93: return 1;
	}
	return 0;
}
function ur(e) {
	return Jn = Yn = 1, Xn = Un($n = e), Zn = 0, [];
}
function dr(e) {
	return $n = "", e;
}
function fr(e) {
	return Ln(cr(Zn - 1, hr(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function pr(e) {
	for (; (Qn = or()) && Qn < 33;) ar();
	return lr(e) > 2 || lr(Qn) > 3 ? "" : " ";
}
function mr(e, t) {
	for (; --t && ar() && !(Qn < 48 || Qn > 102 || Qn > 57 && Qn < 65 || Qn > 70 && Qn < 97););
	return cr(e, sr() + (t < 6 && or() == 32 && ar() == 32));
}
function hr(e) {
	for (; ar();) switch (Qn) {
		case e: return Zn;
		case 34:
		case 39:
			e !== 34 && e !== 39 && hr(Qn);
			break;
		case 40:
			e === 41 && hr(e);
			break;
		case 92: ar();
	}
	return Zn;
}
function gr(e, t) {
	for (; ar() && e + Qn !== 57 && (e + Qn !== 84 || or() !== 47););
	return "/*" + cr(t, Zn - 1) + "*" + Pn(e === 47 ? e : ar());
}
function _r(e) {
	for (; !lr(or());) ar();
	return cr(e, Zn);
}
// node_modules/stylis/src/Parser.js
function vr(e) {
	return dr(yr("", null, null, null, [""], e = ur(e), 0, [0], e));
}
function yr(e, t, n, r, i, a, o, s, c) {
	for (var l = 0, u = 0, d = o, f = 0, p = 0, m = 0, h = 1, g = 1, _ = 1, v = 0, y = 0, b = "", x = i, S = a, C = r, w = b; g;) switch (m = y, y = ar()) {
		case 40:
			m != 108 && Vn(w, d - 1) == 58 ? (v++, w += "(") : w += fr(y);
			break;
		case 41:
			v--, w += ")";
			break;
		case 34:
		case 39:
		case 91:
			w += fr(y);
			break;
		case 9:
		case 10:
		case 13:
		case 32:
			if (v > 0) {
				w += Pn(y);
				break;
			}
			w += pr(m);
			break;
		case 92:
			w += mr(sr() - 1, 7);
			continue;
		case 47:
			switch (or()) {
				case 42:
				case 47:
					Gn(xr(gr(ar(), sr()), t, n, c), c), (lr(m || 1) == 5 || lr(or() || 1) == 5) && Un(w) && Hn(w, -1, void 0) !== " " && (w += " ");
					break;
				default: w += "/";
			}
			break;
		case 123 * h: s[l++] = Un(w) * _;
		case 125 * h:
		case 59:
		case 0:
			if (v > 0 && y) {
				w += Pn(y);
				break;
			}
			switch (y) {
				case 0:
				case 125: g = 0;
				case 59 + u:
					_ == -1 && (w = zn(w, /\f/g, "")), p > 0 && (Un(w) - d || h === 0) && Gn(p > 32 ? Sr(w + ";", r, n, d - 1, c) : Sr(zn(w, " ", "") + ";", r, n, d - 2, c), c);
					break;
				case 59: w += ";";
				default: if (Gn(C = br(w, t, n, l, u, i, s, b, x = [], S = [], d, a), a), y === 123) {
					if (u === 0) yr(w, t, C, C, x, a, d, s, S);
					else {
						switch (f) {
							case 99: if (Vn(w, 3) === 110) break;
							case 108: if (Vn(w, 2) === 97) break;
							default: u = 0;
							case 100:
							case 109:
							case 115:
						}
						u ? yr(e, C, C, r && Gn(br(e, C, C, 0, 0, i, s, b, i, x = [], d, S), S), i, S, d, s, r ? x : S) : yr(w, C, C, C, [""], S, 0, s, S);
					}
				}
			}
			l = u = p = 0, h = _ = 1, b = w = "", d = o;
			break;
		case 58: d = 1 + Un(w), p = m;
		default:
			if (h < 1) {
				if (y == 123) --h;
				else if (y == 125 && h++ == 0 && ir() == 125) continue;
			}
			switch (w += Pn(y), y * h) {
				case 38:
					_ = u > 0 ? 1 : (w += "\f", -1);
					break;
				case 44:
					if (v > 0) break;
					s[l++] = (Un(w) - 1) * _, _ = 1;
					break;
				case 64:
					or() === 45 && (w += fr(ar())), f = or(), u = d = Un(b = w += _r(sr())), y++;
					break;
				case 45: m === 45 && Un(w) == 2 && (h = 0);
			}
	}
	return a;
}
function br(e, t, n, r, i, a, o, s, c, l, u, d) {
	for (var f = i - 1, p = i === 0 ? a : [""], m = Wn(p), h = 0, g = 0, _ = 0; h < r; ++h) for (var v = 0, y = Hn(e, f + 1, f = Nn(g = o[h])), b = e; v < m; ++v) (b = Ln(g > 0 ? p[v] + " " + y : zn(y, /&\f/g, p[v]))) && (c[_++] = b);
	return er(e, t, n, i === 0 ? Dn : s, c, l, u, d);
}
function xr(e, t, n, r) {
	return er(e, t, n, En, Pn(rr()), Hn(e, 2, -2), 0, r);
}
function Sr(e, t, n, r, i) {
	return er(e, t, n, On, Hn(e, 0, r), Hn(e, r + 1, -1), r, i);
}
// node_modules/stylis/src/Prefixer.js
function Cr(e, t, n) {
	switch (In(e, t)) {
		case 5103: return Tn + "print-" + e + e;
		case 5737:
		case 4201:
		case 3177:
		case 3433:
		case 1641:
		case 4457:
		case 2921:
		case 5572:
		case 6356:
		case 5844:
		case 3191:
		case 6645:
		case 3005:
		case 4215:
		case 6389:
		case 5109:
		case 5365:
		case 5621:
		case 3829:
		case 6391:
		case 5879:
		case 5623:
		case 6135:
		case 4599: return Tn + e + e;
		case 4855: return Tn + e.replace("add", "source-over").replace("substract", "source-out").replace("intersect", "source-in").replace("exclude", "xor") + e;
		case 4789: return wn + e + e;
		case 5349:
		case 4246:
		case 4810:
		case 6968:
		case 2756: return Tn + e + wn + e + Cn + e + e;
		case 5936: switch (Vn(e, t + 11)) {
			case 114: return Tn + e + Cn + zn(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
			case 108: return Tn + e + Cn + zn(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
			case 45: return Tn + e + Cn + zn(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
		}
		case 6828:
		case 4268:
		case 2903: return Tn + e + Cn + e + e;
		case 6165: return Tn + e + Cn + "flex-" + e + e;
		case 5187: return Tn + e + zn(e, /(\w+).+(:[^]+)/, Tn + "box-$1$2" + Cn + "flex-$1$2") + e;
		case 5443: return Tn + e + Cn + "flex-item-" + zn(e, /flex-|-self/g, "") + (Rn(e, /flex-|baseline/) ? "" : Cn + "grid-row-" + zn(e, /flex-|-self/g, "")) + e;
		case 4675: return Tn + e + Cn + "flex-line-pack" + zn(e, /align-content|flex-|-self/g, "") + e;
		case 5548: return Tn + e + Cn + zn(e, "shrink", "negative") + e;
		case 5292: return Tn + e + Cn + zn(e, "basis", "preferred-size") + e;
		case 6060: return Tn + "box-" + zn(e, "-grow", "") + Tn + e + Cn + zn(e, "grow", "positive") + e;
		case 4554: return Tn + zn(e, /([^-])(transform)/g, "$1" + Tn + "$2") + e;
		case 6187: return zn(zn(zn(e, /(zoom-|grab)/, Tn + "$1"), /(image-set)/, Tn + "$1"), e, "") + e;
		case 5495:
		case 3959: return zn(e, /(image-set\([^]*)/, Tn + "$1$`$1");
		case 4968: return zn(zn(e, /(.+:)(flex-)?(.*)/, Tn + "box-pack:$3" + Cn + "flex-pack:$3"), /space-between/, "justify") + Tn + e + e;
		case 4200:
			if (!Rn(e, /flex-|baseline/)) return Cn + "grid-column-align" + Hn(e, t) + e;
			break;
		case 2592:
		case 3360: return Cn + zn(e, "template-", "") + e;
		case 4384:
		case 3616: return n && n.some(function(e, n) {
			return t = n, Rn(e.props, /grid-\w+-end/);
		}) ? ~Bn(e + (n = n[t].value), "span") ? e : Cn + zn(e, "-start", "") + e + Cn + "grid-row-span:" + (~Bn(n, "span") ? Rn(n, /\d+/) : +Rn(n, /\d+/) - Rn(e, /\d+/)) + ";" : Cn + zn(e, "-start", "") + e;
		case 4896:
		case 4128: return n && n.some(function(e) {
			return Rn(e.props, /grid-\w+-start/);
		}) ? e : Cn + zn(zn(e, "-end", "-span"), "span ", "") + e;
		case 4095:
		case 3583:
		case 4068:
		case 2532: return zn(e, /(.+)-inline(.+)/, Tn + "$1$2") + e;
		case 8116:
		case 7059:
		case 5753:
		case 5535:
		case 5445:
		case 5701:
		case 4933:
		case 4677:
		case 5533:
		case 5789:
		case 5021:
		case 4765:
			if (Un(e) - 1 - t > 6) switch (Vn(e, t + 1)) {
				case 109: if (Vn(e, t + 4) !== 45) break;
				case 102: return zn(e, /(.+:)(.+)-([^]+)/, "$1" + Tn + "$2-$3$1" + wn + (Vn(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
				case 115: return ~Bn(e, "stretch") ? Cr(zn(e, "stretch", "fill-available"), t, n) + e : e;
			}
			break;
		case 5152:
		case 5920: return zn(e, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function(t, n, r, i, a, o, s) {
			return Cn + n + ":" + r + s + (i ? Cn + n + "-span:" + (a ? o : +o - r) + s : "") + e;
		});
		case 4949:
			if (Vn(e, t + 6) === 121) return zn(e, ":", ":" + Tn) + e;
			break;
		case 6444:
			switch (Vn(e, Vn(e, 14) === 45 ? 18 : 11)) {
				case 120: return zn(e, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, "$1" + Tn + (Vn(e, 14) === 45 ? "inline-" : "") + "box$3$1" + Tn + "$2$3$1" + Cn + "$2box$3") + e;
				case 100: return zn(e, ":", ":" + Cn) + e;
			}
			break;
		case 5719:
		case 2647:
		case 2135:
		case 3927:
		case 2391: return zn(e, "scroll-", "scroll-snap-") + e;
	}
	return e;
}
// node_modules/stylis/src/Serializer.js
function wr(e, t) {
	for (var n = "", r = 0; r < e.length; r++) n += t(e[r], r, e, t) || "";
	return n;
}
function Tr(e, t, n, r) {
	switch (e.type) {
		case Mn: if (e.children.length) break;
		case kn:
		case An:
		case On: return e.return = e.return || e.value;
		case En: return "";
		case jn: return e.return = e.value + "{" + wr(e.children, r) + "}";
		case Dn: if (!Un(e.value = e.props.join(","))) return "";
	}
	return Un(n = wr(e.children, r)) ? e.return = e.value + "{" + n + "}" : "";
}
// node_modules/stylis/src/Middleware.js
function Er(e) {
	var t = Wn(e);
	return function(n, r, i, a) {
		for (var o = "", s = 0; s < t; s++) o += e[s](n, r, i, a) || "";
		return o;
	};
}
function Dr(e, t, n, r) {
	if (e.length > -1 && !e.return) switch (e.type) {
		case On:
			e.return = Cr(e.value, e.length, n);
			return;
		case jn: return wr([tr(e, { value: zn(e.value, "@", "@" + Tn) })], r);
		case Dn: if (e.length) return Kn(n = e.props, function(t) {
			switch (Rn(t, r = /(::plac\w+|:read-\w+)/)) {
				case ":read-only":
				case ":read-write":
					nr(tr(e, { props: [zn(t, /:(read-\w+)/, ":" + wn + "$1")] })), nr(tr(e, { props: [t] })), Fn(e, { props: qn(n, r) });
					break;
				case "::placeholder": nr(tr(e, { props: [zn(t, /:(plac\w+)/, ":" + Tn + "input-$1")] })), nr(tr(e, { props: [zn(t, /:(plac\w+)/, ":" + wn + "$1")] })), nr(tr(e, { props: [zn(t, /:(plac\w+)/, Cn + "input-$1")] })), nr(tr(e, { props: [t] })), Fn(e, { props: qn(n, r) });
			}
			return "";
		});
	}
}
// node_modules/@ant-design/cssinjs/es/util/cacheMapUtil.js
var Or = "data-ant-cssinjs-cache-path", kr = "_FILE_STYLE__", Ar, jr = !0;
function Mr() {
	if (!Ar && (Ar = {}, v())) {
		let e = document.createElement("div");
		e.className = Or, e.style.position = "fixed", e.style.visibility = "hidden", e.style.top = "-9999px", document.body.appendChild(e);
		let t = getComputedStyle(e).content || "";
		t = t.replace(/^"/, "").replace(/"$/, ""), t.split(";").forEach((e) => {
			let [t, n] = e.split(":");
			Ar[t] = n;
		});
		let n = document.querySelector(`style[${Or}]`);
		n && (jr = !1, n.parentNode?.removeChild(n)), document.body.removeChild(e);
	}
}
function Nr(e) {
	return Mr(), !!Ar[e];
}
function Pr(e) {
	let t = Ar[e], n = null;
	if (t && v()) {
		if (jr) n = kr;
		else {
			let t = document.querySelector(`style[${zt}="${Ar[e]}"]`);
			t ? n = t.innerHTML : delete Ar[e];
		}
	}
	return [n, t];
}
// node_modules/@ant-design/cssinjs/es/hooks/useStyleRegister.js
var Fr = "_skip_check_", Ir = "_multi_value_";
function Lr(e, t) {
	return (t ? wr(vr(e), Er([Dr, Tr])) : wr(vr(e), Tr)).replace(/\{%%%\:[^;];}/g, ";");
}
function Rr(e) {
	return typeof e == "object" && e && (Fr in e || Ir in e);
}
function zr(e, t, n = "high") {
	if (!t) return e;
	let r = rn({
		hashCls: t,
		hashPriority: n
	});
	return e.split(",").map((e) => {
		let t = e.trim().split(/\s+/), n = t[0] || "", i = n.match(/^\w+/)?.[0] || "";
		return n = `${i}${r}${n.slice(i.length)}`, [n, ...t.slice(1)].join(" ");
	}).join(",");
}
var Br = (e, t = {}, { root: n, injectHash: r, parentSelectors: i } = {
	root: !0,
	parentSelectors: []
}) => {
	let { hashId: a, layer: o, path: s, hashPriority: c, transformers: l = [], linters: u = [] } = t, d = "", f = {};
	function p(e) {
		let n = e.getName(a);
		if (!f[n]) {
			let [r] = Br(e.style, t, {
				root: !1,
				parentSelectors: i
			});
			f[n] = `@keyframes ${e.getName(a)}${r}`;
		}
	}
	function m(e, t = []) {
		return e.forEach((e) => {
			Array.isArray(e) ? m(e, t) : e && t.push(e);
		}), t;
	}
	return m(Array.isArray(e) ? e : [e]).forEach((e) => {
		let o = typeof e == "string" && !n ? {} : e;
		if (typeof o == "string") d += `${o}\n`;
		else if (o._keyframe) p(o);
		else {
			let e = l.reduce((e, t) => t?.visit?.(e) || e, o);
			Object.keys(e).forEach((o) => {
				let s = e[o];
				if (typeof s == "object" && s && (o !== "animationName" || !s._keyframe) && !Rr(s)) {
					let e = !1, l = o.trim(), u = !1;
					(n || r) && a ? l.startsWith("@") ? e = !0 : l = zr(l === "&" ? "" : o, a, c) : n && !a && (l === "&" || l === "") && (l = "", u = !0);
					let [p, m] = Br(s, t, {
						root: u,
						injectHash: e,
						parentSelectors: [...i, l]
					});
					f = {
						...f,
						...m
					}, d += `${l}${p}`;
				} else {
					function e(e, t) {
						let n = e.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`), r = t;
						!Sn[e] && typeof r == "number" && r !== 0 && (r = `${r}px`), e === "animationName" && t?._keyframe && (p(t), r = t.getName(a)), d += `${n}:${r};`;
					}
					let t = s?.value ?? s;
					typeof s == "object" && s?.[Ir] && Array.isArray(t) ? t.forEach((t) => {
						e(o, t);
					}) : an(t) && e(o, t);
				}
			});
		}
	}), n ? o && (d &&= `@layer ${o.name} {${d}}`, o.dependencies && (f[`@layer ${o.name}`] = o.dependencies.map((e) => `@layer ${e}, ${o.name};`).join("\n"))) : d = `{${d}}`, [d, f];
};
function Vr(e, t) {
	return Nt(`${e.join("%")}${t}`);
}
var Hr = "style";
function Ur(e, t) {
	let { path: n, hashId: r, layer: i, nonce: a, clientOnly: o, order: s = 0 } = e, { mock: c, hashPriority: l, container: u, transformers: d, linters: f, cache: p, layer: m, autoPrefix: h } = g.useContext(Ht), _ = [r || ""];
	m && _.push("layer"), _.push(...n);
	let v = tn;
	dn(Hr, _, () => {
		let e = _.join("|");
		if (Nr(e)) {
			let [t, n] = Pr(e);
			if (t) return [
				t,
				n,
				{},
				o,
				s
			];
		}
		let [a, c] = Br(t(), {
			hashId: r,
			hashPriority: l,
			layer: m ? i : void 0,
			path: n.join("-"),
			transformers: d,
			linters: f
		}), u = Lr(a, h || !1);
		return [
			u,
			Vr(_, u),
			c,
			o,
			s
		];
	}, (e, t) => {
		let [, n] = e;
		t && tn && me(n, {
			mark: zt,
			attachTo: u
		});
	}, (e) => {
		let [t, n, r, , i] = e;
		if (v && t !== "_FILE_STYLE__") {
			let e = {
				mark: zt,
				prepend: !m && "queue",
				attachTo: u,
				priority: i
			};
			e = on(e, a);
			let o = [], s = [];
			Object.keys(r).forEach((e) => {
				e.startsWith("@layer") ? o.push(e) : s.push(e);
			}), o.forEach((t) => {
				Y(Lr(r[t], h || !1), `_layer-${t}`, {
					...e,
					prepend: !0
				});
			});
			let c = Y(t, n, e);
			c[Bt] = p.instanceId, s.forEach((t) => {
				Y(Lr(r[t], h || !1), `_effect-${t}`, e);
			});
		}
	});
}
// node_modules/@ant-design/cssinjs/es/hooks/useCSSVarRegister.js
var Wr = "cssVar", Gr = (e, t) => {
	let { key: n, prefix: r, unitless: i, ignore: a, token: o, hashId: s, scope: c, nonce: l } = e, { cache: { instanceId: u }, container: d, hashPriority: f } = (0, g.useContext)(Ht), { _tokenKey: p } = o, m = Array.isArray(c) ? c.join("@@") : c, h = [
		...e.path,
		n,
		m,
		p
	];
	return dn(Wr, h, () => {
		let [e, o] = ln(t(), n, {
			prefix: r,
			unitless: i,
			ignore: a,
			scope: c,
			hashPriority: f,
			hashCls: s
		});
		return [
			e,
			o,
			Vr(h, o),
			n
		];
	}, ([, , e]) => {
		tn && me(e, {
			mark: zt,
			attachTo: d
		});
	}, ([, e, t]) => {
		if (!e) return;
		let r = {
			mark: zt,
			prepend: "queue",
			attachTo: d,
			priority: -999
		};
		r = on(r, l);
		let i = Y(e, t, r);
		i[Bt] = u, i.setAttribute(Rt, n);
	});
}, Kr = class {
	name;
	style;
	constructor(e, t) {
		this.name = e, this.style = t;
	}
	getName(e = "") {
		return e ? `${e}-${this.name}` : this.name;
	}
	_keyframe = !0;
};
// node_modules/@ant-design/cssinjs/es/transformers/legacyLogicalProperties.js
function qr(e) {
	return e.notSplit = !0, e;
}
qr(["borderTop", "borderBottom"]), qr(["borderTop"]), qr(["borderBottom"]), qr(["borderLeft", "borderRight"]), qr(["borderLeft"]), qr(["borderRight"]);
// node_modules/@babel/runtime/helpers/esm/typeof.js
function Jr(e) {
	"@babel/helpers - typeof";
	return Jr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, Jr(e);
}
// node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function Yr(e) {
	if (Array.isArray(e)) return e;
}
// node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function Xr(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
// node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function Zr() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// node_modules/@babel/runtime/helpers/esm/slicedToArray.js
function Qr(e, t) {
	return Yr(e) || Xr(e, t) || wt(e, t) || Zr();
}
// node_modules/@babel/runtime/helpers/esm/toPrimitive.js
function $r(e, t) {
	if (Jr(e) != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (Jr(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
// node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function ei(e) {
	var t = $r(e, "string");
	return Jr(t) == "symbol" ? t : t + "";
}
// node_modules/@babel/runtime/helpers/esm/defineProperty.js
function ti(e, t, n) {
	return (t = ei(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
// node_modules/@babel/runtime/helpers/esm/objectSpread2.js
function ni(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function ri(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? ni(Object(n), !0).forEach(function(t) {
			ti(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ni(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
// node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function ii(e, t) {
	if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
}
// node_modules/@babel/runtime/helpers/esm/createClass.js
function ai(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, ei(r.key), r);
	}
}
function oi(e, t, n) {
	return t && ai(e.prototype, t), n && ai(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
// node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function si(e) {
	if (e === void 0) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
// node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function ci(e, t) {
	return ci = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
		return e.__proto__ = t, e;
	}, ci(e, t);
}
// node_modules/@babel/runtime/helpers/esm/inherits.js
function li(e, t) {
	if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function");
	e.prototype = Object.create(t && t.prototype, { constructor: {
		value: e,
		writable: !0,
		configurable: !0
	} }), Object.defineProperty(e, "prototype", { writable: !1 }), t && ci(e, t);
}
// node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function ui(e) {
	return ui = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
		return e.__proto__ || Object.getPrototypeOf(e);
	}, ui(e);
}
// node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js
function di() {
	try {
		var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch {}
	return (di = function() {
		return !!e;
	})();
}
// node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js
function fi(e, t) {
	if (t && (Jr(t) == "object" || typeof t == "function")) return t;
	if (t !== void 0) throw TypeError("Derived constructors may only return object or undefined");
	return si(e);
}
// node_modules/@babel/runtime/helpers/esm/createSuper.js
function pi(e) {
	var t = di();
	return function() {
		var n, r = ui(e);
		if (t) {
			var i = ui(this).constructor;
			n = Reflect.construct(r, arguments, i);
		} else n = r.apply(this, arguments);
		return fi(this, n);
	};
}
// node_modules/@ant-design/cssinjs-utils/es/util/calc/calculator.js
var mi = /*#__PURE__*/ oi(function e() {
	ii(this, e);
}), hi = "CALC_UNIT", gi = new RegExp(hi, "g");
function _i(e) {
	return typeof e == "number" ? `${e}${hi}` : e;
}
var vi = /*#__PURE__*/ function(e) {
	li(n, e);
	var t = pi(n);
	function n(e, r) {
		var i;
		ii(this, n), i = t.call(this), ti(si(i), "result", ""), ti(si(i), "unitlessCssVar", void 0), ti(si(i), "lowPriority", void 0);
		var a = Jr(e);
		return i.unitlessCssVar = r, e instanceof n ? i.result = `(${e.result})` : a === "number" ? i.result = _i(e) : a === "string" && (i.result = e), i;
	}
	return oi(n, [
		{
			key: "add",
			value: function(e) {
				return e instanceof n ? this.result = `${this.result} + ${e.getResult()}` : (typeof e == "number" || typeof e == "string") && (this.result = `${this.result} + ${_i(e)}`), this.lowPriority = !0, this;
			}
		},
		{
			key: "sub",
			value: function(e) {
				return e instanceof n ? this.result = `${this.result} - ${e.getResult()}` : (typeof e == "number" || typeof e == "string") && (this.result = `${this.result} - ${_i(e)}`), this.lowPriority = !0, this;
			}
		},
		{
			key: "mul",
			value: function(e) {
				return this.lowPriority && (this.result = `(${this.result})`), e instanceof n ? this.result = `${this.result} * ${e.getResult(!0)}` : (typeof e == "number" || typeof e == "string") && (this.result = `${this.result} * ${e}`), this.lowPriority = !1, this;
			}
		},
		{
			key: "div",
			value: function(e) {
				return this.lowPriority && (this.result = `(${this.result})`), e instanceof n ? this.result = `${this.result} / ${e.getResult(!0)}` : (typeof e == "number" || typeof e == "string") && (this.result = `${this.result} / ${e}`), this.lowPriority = !1, this;
			}
		},
		{
			key: "getResult",
			value: function(e) {
				return this.lowPriority || e ? `(${this.result})` : this.result;
			}
		},
		{
			key: "equal",
			value: function(e) {
				var t = this, n = (e || {}).unit, r = !0;
				return typeof n == "boolean" ? r = n : Array.from(this.unitlessCssVar).some(function(e) {
					return t.result.includes(e);
				}) && (r = !1), this.result = this.result.replace(gi, r ? "px" : ""), this.lowPriority === void 0 ? this.result : `calc(${this.result})`;
			}
		}
	]), n;
}(mi), yi = /*#__PURE__*/ function(e) {
	li(n, e);
	var t = pi(n);
	function n(e) {
		var r;
		return ii(this, n), r = t.call(this), ti(si(r), "result", 0), e instanceof n ? r.result = e.result : typeof e == "number" && (r.result = e), r;
	}
	return oi(n, [
		{
			key: "add",
			value: function(e) {
				return e instanceof n ? this.result += e.result : typeof e == "number" && (this.result += e), this;
			}
		},
		{
			key: "sub",
			value: function(e) {
				return e instanceof n ? this.result -= e.result : typeof e == "number" && (this.result -= e), this;
			}
		},
		{
			key: "mul",
			value: function(e) {
				return e instanceof n ? this.result *= e.result : typeof e == "number" && (this.result *= e), this;
			}
		},
		{
			key: "div",
			value: function(e) {
				return e instanceof n ? this.result /= e.result : typeof e == "number" && (this.result /= e), this;
			}
		},
		{
			key: "equal",
			value: function() {
				return this.result;
			}
		}
	]), n;
}(mi), bi = function(e, t) {
	var n = e === "css" ? vi : yi;
	return function(e) {
		return new n(e, t);
	};
}, xi = function(e, t) {
	return `${[t, e.replace(/([A-Z]+)([A-Z][a-z]+)/g, "$1-$2").replace(/([a-z])([A-Z])/g, "$1-$2")].filter(Boolean).join("-")}`;
};
// node_modules/@ant-design/cssinjs-utils/es/util/getComponentToken.js
function Si(e, t, n, r) {
	var i = ri({}, t[e]);
	r != null && r.deprecatedTokens && r.deprecatedTokens.forEach(function(e) {
		var t = Qr(e, 2), n = t[0], r = t[1];
		(i != null && i[n] || i != null && i[r]) && (i[r] ?? (i[r] = i?.[n]));
	});
	var a = ri(ri({}, n), i);
	return Object.keys(a).forEach(function(e) {
		a[e] === t[e] && delete a[e];
	}), a;
}
// node_modules/@ant-design/cssinjs-utils/es/util/statistic.js
var Ci = typeof CSSINJS_STATISTIC < "u", wi = !0;
function Ti() {
	var e = [...arguments];
	/* istanbul ignore next */
	if (!Ci) return Object.assign.apply(Object, [{}].concat(e));
	wi = !1;
	var t = {};
	return e.forEach(function(e) {
		Jr(e) === "object" && Object.keys(e).forEach(function(n) {
			Object.defineProperty(t, n, {
				configurable: !0,
				enumerable: !0,
				get: function() {
					return e[n];
				}
			});
		});
	}), wi = !0, t;
}
var Ei = {};
/* istanbul ignore next */
function Di() {}
var Oi = function(e) {
	var t, n = e, r = Di;
	return Ci && typeof Proxy < "u" && (t = /* @__PURE__ */ new Set(), n = new Proxy(e, { get: function(e, n) {
		if (wi) {
			var r;
			(r = t) == null || r.add(n);
		}
		return e[n];
	} }), r = function(e, n) {
		Ei[e] = {
			global: Array.from(t),
			component: ri(ri({}, Ei[e]?.component), n)
		};
	}), {
		token: n,
		keys: t,
		flush: r
	};
};
// node_modules/@ant-design/cssinjs-utils/es/util/getDefaultComponentToken.js
function ki(e, t, n) {
	return typeof n == "function" ? n(Ti(t, t[e] ?? {})) : n ?? {};
}
// node_modules/@ant-design/cssinjs-utils/es/util/maxmin.js
function Ai(e) {
	return e === "js" ? {
		max: Math.max,
		min: Math.min
	} : {
		max: function() {
			return `max(${[...arguments].map(function(e) {
				return nn(e);
			}).join(",")})`;
		},
		min: function() {
			return `min(${[...arguments].map(function(e) {
				return nn(e);
			}).join(",")})`;
		}
	};
}
// node_modules/@ant-design/cssinjs-utils/es/_util/hooks/useUniqueMemo.js
var ji = 6e5, Mi = new (/* @__PURE__ */ function() {
	function e() {
		ii(this, e), ti(this, "map", /* @__PURE__ */ new Map()), ti(this, "objectIDMap", /* @__PURE__ */ new WeakMap()), ti(this, "nextID", 0), ti(this, "lastAccessBeat", /* @__PURE__ */ new Map()), ti(this, "accessBeat", 0);
	}
	return oi(e, [
		{
			key: "set",
			value: function(e, t) {
				this.clear();
				var n = this.getCompositeKey(e);
				this.map.set(n, t), this.lastAccessBeat.set(n, Date.now());
			}
		},
		{
			key: "get",
			value: function(e) {
				var t = this.getCompositeKey(e), n = this.map.get(t);
				return this.lastAccessBeat.set(t, Date.now()), this.accessBeat += 1, n;
			}
		},
		{
			key: "getCompositeKey",
			value: function(e) {
				var t = this;
				return e.map(function(e) {
					return e && Jr(e) === "object" ? `obj_${t.getObjectID(e)}` : `${Jr(e)}_${e}`;
				}).join("|");
			}
		},
		{
			key: "getObjectID",
			value: function(e) {
				if (this.objectIDMap.has(e)) return this.objectIDMap.get(e);
				var t = this.nextID;
				return this.objectIDMap.set(e, t), this.nextID += 1, t;
			}
		},
		{
			key: "clear",
			value: function() {
				var e = this;
				if (this.accessBeat > 1e4) {
					var t = Date.now();
					this.lastAccessBeat.forEach(function(n, r) {
						t - n > ji && (e.map.delete(r), e.lastAccessBeat.delete(r));
					}), this.accessBeat = 0;
				}
			}
		}
	]), e;
}())();
function Ni(e, t) {
	return g.useMemo(function() {
		var n = Mi.get(t);
		if (n) return n;
		var r = e();
		return Mi.set(t, r), r;
	}, t);
}
// node_modules/@ant-design/cssinjs-utils/es/hooks/useCSP.js
var Pi = function() {
	return {};
};
// node_modules/@ant-design/cssinjs-utils/es/util/genStyleUtils.js
function Fi(e) {
	var t = e.useCSP, n = t === void 0 ? Pi : t, r = e.useToken, i = e.usePrefix, a = e.getResetStyles, o = e.getCommonStyle, s = e.getCompUnitless;
	function c(e, t, n, r) {
		var i = Array.isArray(e) ? e[0] : e;
		function a(e) {
			return `${String(i)}${e.slice(0, 1).toUpperCase()}${e.slice(1)}`;
		}
		var o = r?.unitless || {}, c = ri(ri({}, typeof s == "function" ? s(e) : {}), {}, ti({}, a("zIndexPopup"), !0));
		Object.keys(o).forEach(function(e) {
			c[a(e)] = o[e];
		});
		var d = ri(ri({}, r), {}, {
			unitless: c,
			prefixToken: a
		}), f = u(e, t, n, d), p = l(i, n, d);
		return function(e) {
			var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, n = f(e, t), i = r?.extraCssVarPrefixCls, a = typeof i == "function" ? i({
				prefixCls: e,
				rootCls: t
			}) : i;
			return [n, p(a != null && a.length ? [t].concat(Et(a)) : t)];
		};
	}
	function l(e, t, i) {
		var a = i.unitless, o = i.prefixToken, s = i.ignore;
		return function(c) {
			var l = r(), u = l.cssVar, d = l.realToken, f = n();
			return Gr({
				path: [e],
				prefix: u.prefix,
				key: u.key,
				unitless: a,
				ignore: s,
				token: d,
				scope: c,
				nonce: function() {
					return f.nonce;
				}
			}, function() {
				var n = ki(e, d, t), r = Si(e, d, n, { deprecatedTokens: i?.deprecatedTokens });
				return n && Object.keys(n).forEach(function(e) {
					r[o(e)] = r[e], delete r[e];
				}), r;
			}), u?.key;
		};
	}
	function u(t, s, c) {
		var l = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, u = Array.isArray(t) ? t : [t, t], d = Qr(u, 1)[0], f = u.join("-"), p = e.layer || { name: "antd" };
		return function(e) {
			var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, u = r(), m = u.theme, h = u.realToken, _ = u.hashId, v = u.token, y = u.cssVar, b = u.zeroRuntime;
			if ((0, g.useMemo)(function() {
				return b;
			}, [])) return _;
			var x = i(), S = x.rootPrefixCls, C = x.iconPrefixCls, w = n(), T = "css", E = Ni(function() {
				var e = /* @__PURE__ */ new Set();
				return Object.keys(l.unitless || {}).forEach(function(t) {
					e.add(sn(t, y.prefix)), e.add(sn(t, xi(d, y.prefix)));
				}), bi(T, e);
			}, [
				T,
				d,
				y?.prefix
			]), D = Ai(T), O = D.max, k = D.min, A = {
				theme: m,
				token: v,
				hashId: _,
				nonce: function() {
					return w.nonce;
				},
				clientOnly: l.clientOnly,
				layer: p,
				order: l.order || -999
			};
			return typeof a == "function" && Ur(ri(ri({}, A), {}, {
				clientOnly: !1,
				path: ["Shared", S]
			}), function() {
				return a(v, {
					prefix: {
						rootPrefixCls: S,
						iconPrefixCls: C
					},
					csp: w
				});
			}), Ur(ri(ri({}, A), {}, { path: [
				f,
				e,
				C
			] }), function() {
				if (l.injectStyle === !1) return [];
				var n = Oi(v), r = n.token, i = n.flush, a = ki(d, h, c), u = `.${e}`, f = Si(d, h, a, { deprecatedTokens: l.deprecatedTokens });
				a && Jr(a) === "object" && Object.keys(a).forEach(function(e) {
					a[e] = `var(${sn(e, xi(d, y.prefix))})`;
				});
				var p = Ti(r, {
					componentCls: u,
					prefixCls: e,
					iconCls: `.${C}`,
					antCls: `.${S}`,
					calc: E,
					max: O,
					min: k
				}, a), m = s(p, {
					hashId: _,
					prefixCls: e,
					rootPrefixCls: S,
					iconPrefixCls: C
				});
				i(d, f);
				var g = typeof o == "function" ? o(p, e, t, l.resetFont) : null;
				return [l.resetStyle === !1 ? null : g, m];
			}), _;
		};
	}
	function d(e, t, n) {
		var r = u(e, t, n, ri({
			resetStyle: !1,
			order: -998
		}, arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}));
		return function(e) {
			var t = e.prefixCls, n = e.rootCls;
			return r(t, n === void 0 ? t : n), null;
		};
	}
	return {
		genStyleHooks: c,
		genSubStyleComponent: d,
		genComponentStyleHook: u
	};
}
// node_modules/antd/es/theme/interface/presetColors.js
var Ii = [
	"blue",
	"purple",
	"cyan",
	"green",
	"magenta",
	"pink",
	"red",
	"orange",
	"yellow",
	"volcano",
	"geekblue",
	"lime",
	"gold"
];
// node_modules/antd/es/theme/themes/shared/genFontSizes.js
function Li(e) {
	return (e + 8) / e;
}
function Ri(e) {
	let t = Array.from({ length: 10 }).map((t, n) => {
		let r = n - 1, i = e * Math.E ** (r / 5);
		return Math.floor((n > 1 ? Math.floor(i) : Math.ceil(i)) / 2) * 2;
	});
	return t[1] = e, t.map((e) => ({
		size: e,
		lineHeight: Li(e)
	}));
}
// node_modules/antd/es/version/index.js
var zi = "6.6.8", Bi = {
	blue: "#1677FF",
	purple: "#722ED1",
	cyan: "#13C2C2",
	green: "#52C41A",
	magenta: "#EB2F96",
	pink: "#EB2F96",
	red: "#F5222D",
	orange: "#FA8C16",
	yellow: "#FADB14",
	volcano: "#FA541C",
	geekblue: "#2F54EB",
	gold: "#FAAD14",
	lime: "#A0D911"
}, Vi = {
	...Bi,
	colorPrimary: "#1677ff",
	colorSuccess: "#52c41a",
	colorWarning: "#faad14",
	colorError: "#ff4d4f",
	colorInfo: "#1677ff",
	colorLink: "",
	colorTextBase: "",
	colorBgBase: "",
	fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,\n'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',\n'Noto Color Emoji'",
	fontFamilyCode: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
	fontSize: 14,
	lineWidth: 1,
	lineType: "solid",
	motionUnit: .1,
	motionBase: 0,
	motionEaseOutCirc: "cubic-bezier(0.08, 0.82, 0.17, 1)",
	motionEaseInOutCirc: "cubic-bezier(0.78, 0.14, 0.15, 0.86)",
	motionEaseOut: "cubic-bezier(0.215, 0.61, 0.355, 1)",
	motionEaseInOut: "cubic-bezier(0.645, 0.045, 0.355, 1)",
	motionEaseOutBack: "cubic-bezier(0.12, 0.4, 0.29, 1.46)",
	motionEaseInBack: "cubic-bezier(0.71, -0.46, 0.88, 0.6)",
	motionEaseInQuint: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
	motionEaseOutQuint: "cubic-bezier(0.23, 1, 0.32, 1)",
	borderRadius: 6,
	sizeUnit: 4,
	sizeStep: 4,
	sizePopupArrow: 16,
	controlHeight: 32,
	zIndexBase: 0,
	zIndexPopupBase: 1e3,
	opacityImage: 1,
	wireframe: !1,
	focusOutline: !0,
	motion: !0
}, Hi = {
	aliceblue: "9ehhb",
	antiquewhite: "9sgk7",
	aqua: "1ekf",
	aquamarine: "4zsno",
	azure: "9eiv3",
	beige: "9lhp8",
	bisque: "9zg04",
	black: "0",
	blanchedalmond: "9zhe5",
	blue: "73",
	blueviolet: "5e31e",
	brown: "6g016",
	burlywood: "8ouiv",
	cadetblue: "3qba8",
	chartreuse: "4zshs",
	chocolate: "87k0u",
	coral: "9yvyo",
	cornflowerblue: "3xael",
	cornsilk: "9zjz0",
	crimson: "8l4xo",
	cyan: "1ekf",
	darkblue: "3v",
	darkcyan: "rkb",
	darkgoldenrod: "776yz",
	darkgray: "6mbhl",
	darkgreen: "jr4",
	darkgrey: "6mbhl",
	darkkhaki: "7ehkb",
	darkmagenta: "5f91n",
	darkolivegreen: "3bzfz",
	darkorange: "9yygw",
	darkorchid: "5z6x8",
	darkred: "5f8xs",
	darksalmon: "9441m",
	darkseagreen: "5lwgf",
	darkslateblue: "2th1n",
	darkslategray: "1ugcv",
	darkslategrey: "1ugcv",
	darkturquoise: "14up",
	darkviolet: "5rw7n",
	deeppink: "9yavn",
	deepskyblue: "11xb",
	dimgray: "442g9",
	dimgrey: "442g9",
	dodgerblue: "16xof",
	firebrick: "6y7tu",
	floralwhite: "9zkds",
	forestgreen: "1cisi",
	fuchsia: "9y70f",
	gainsboro: "8m8kc",
	ghostwhite: "9pq0v",
	goldenrod: "8j4f4",
	gold: "9zda8",
	gray: "50i2o",
	green: "pa8",
	greenyellow: "6senj",
	grey: "50i2o",
	honeydew: "9eiuo",
	hotpink: "9yrp0",
	indianred: "80gnw",
	indigo: "2xcoy",
	ivory: "9zldc",
	khaki: "9edu4",
	lavenderblush: "9ziet",
	lavender: "90c8q",
	lawngreen: "4vk74",
	lemonchiffon: "9zkct",
	lightblue: "6s73a",
	lightcoral: "9dtog",
	lightcyan: "8s1rz",
	lightgoldenrodyellow: "9sjiq",
	lightgray: "89jo3",
	lightgreen: "5nkwg",
	lightgrey: "89jo3",
	lightpink: "9z6wx",
	lightsalmon: "9z2ii",
	lightseagreen: "19xgq",
	lightskyblue: "5arju",
	lightslategray: "4nwk9",
	lightslategrey: "4nwk9",
	lightsteelblue: "6wau6",
	lightyellow: "9zlcw",
	lime: "1edc",
	limegreen: "1zcxe",
	linen: "9shk6",
	magenta: "9y70f",
	maroon: "4zsow",
	mediumaquamarine: "40eju",
	mediumblue: "5p",
	mediumorchid: "79qkz",
	mediumpurple: "5r3rv",
	mediumseagreen: "2d9ip",
	mediumslateblue: "4tcku",
	mediumspringgreen: "1di2",
	mediumturquoise: "2uabw",
	mediumvioletred: "7rn9h",
	midnightblue: "z980",
	mintcream: "9ljp6",
	mistyrose: "9zg0x",
	moccasin: "9zfzp",
	navajowhite: "9zest",
	navy: "3k",
	oldlace: "9wq92",
	olive: "50hz4",
	olivedrab: "472ub",
	orange: "9z3eo",
	orangered: "9ykg0",
	orchid: "8iu3a",
	palegoldenrod: "9bl4a",
	palegreen: "5yw0o",
	paleturquoise: "6v4ku",
	palevioletred: "8k8lv",
	papayawhip: "9zi6t",
	peachpuff: "9ze0p",
	peru: "80oqn",
	pink: "9z8wb",
	plum: "8nba5",
	powderblue: "6wgdi",
	purple: "4zssg",
	rebeccapurple: "3zk49",
	red: "9y6tc",
	rosybrown: "7cv4f",
	royalblue: "2jvtt",
	saddlebrown: "5fmkz",
	salmon: "9rvci",
	sandybrown: "9jn1c",
	seagreen: "1tdnb",
	seashell: "9zje6",
	sienna: "6973h",
	silver: "7ir40",
	skyblue: "5arjf",
	slateblue: "45e4t",
	slategray: "4e100",
	slategrey: "4e100",
	snow: "9zke2",
	springgreen: "1egv",
	steelblue: "2r1kk",
	tan: "87yx8",
	teal: "pds",
	thistle: "8ggk8",
	tomato: "9yqfb",
	turquoise: "2j4r4",
	violet: "9b10u",
	wheat: "9ld4j",
	white: "9zldr",
	whitesmoke: "9lhpx",
	yellow: "9zl6o",
	yellowgreen: "61fzm"
}, Ui = Math.round;
function Wi(e, t) {
	let n = e.replace(/^[^(]*\((.*)/, "$1").replace(/\).*/, "").match(/\d*\.?\d+%?/g) || [], r = n.map((e) => parseFloat(e));
	for (let e = 0; e < 3; e += 1) r[e] = t(r[e] || 0, n[e] || "", e);
	return r[3] = n[3] ? n[3].includes("%") ? r[3] / 100 : r[3] : 1, r;
}
var Gi = (e, t, n) => n === 0 ? e : e / 100;
function Ki(e, t) {
	let n = t || 255;
	return e > n ? n : e < 0 ? 0 : e;
}
var qi = class e {
	isValid = !0;
	r = 0;
	g = 0;
	b = 0;
	a = 1;
	_h;
	_hsl_s;
	_hsv_s;
	_l;
	_v;
	_max;
	_min;
	_brightness;
	constructor(t) {
		function n(e) {
			return e[0] in t && e[1] in t && e[2] in t;
		}
		if (t) {
			if (typeof t == "string") {
				let e = t.trim();
				function n(t) {
					return e.startsWith(t);
				}
				if (/^#?[A-F\d]{3,8}$/i.test(e)) this.fromHexString(e);
				else if (n("rgb")) this.fromRgbString(e);
				else if (n("hsl")) this.fromHslString(e);
				else if (n("hsv") || n("hsb")) this.fromHsvString(e);
				else {
					let t = Hi[e.toLowerCase()];
					t && this.fromHexString(parseInt(t, 36).toString(16).padStart(6, "0"));
				}
			} else if (t instanceof e) this.r = t.r, this.g = t.g, this.b = t.b, this.a = t.a, this._h = t._h, this._hsl_s = t._hsl_s, this._hsv_s = t._hsv_s, this._l = t._l, this._v = t._v;
			else if (n("rgb")) this.r = Ki(t.r), this.g = Ki(t.g), this.b = Ki(t.b), this.a = typeof t.a == "number" ? Ki(t.a, 1) : 1;
			else if (n("hsl")) this.fromHsl(t);
			else if (n("hsv")) this.fromHsv(t);
			else throw Error("@ant-design/fast-color: unsupported input " + JSON.stringify(t));
		}
	}
	setR(e) {
		return this._sc("r", e);
	}
	setG(e) {
		return this._sc("g", e);
	}
	setB(e) {
		return this._sc("b", e);
	}
	setA(e) {
		return this._sc("a", e, 1);
	}
	setHue(e) {
		let t = this.toHsv();
		return t.h = e, this._c(t);
	}
	getLuminance() {
		function e(e) {
			let t = e / 255;
			return t <= .03928 ? t / 12.92 : ((t + .055) / 1.055) ** 2.4;
		}
		let t = e(this.r), n = e(this.g), r = e(this.b);
		return .2126 * t + .7152 * n + .0722 * r;
	}
	getHue() {
		if (this._h === void 0) {
			let e = this.getMax() - this.getMin();
			this._h = e === 0 ? 0 : Ui(60 * (this.r === this.getMax() ? (this.g - this.b) / e + (this.g < this.b ? 6 : 0) : this.g === this.getMax() ? (this.b - this.r) / e + 2 : (this.r - this.g) / e + 4));
		}
		return this._h;
	}
	getSaturation() {
		return this.getHSVSaturation();
	}
	getHSVSaturation() {
		if (this._hsv_s === void 0) {
			let e = this.getMax() - this.getMin();
			this._hsv_s = e === 0 ? 0 : e / this.getMax();
		}
		return this._hsv_s;
	}
	getHSLSaturation() {
		if (this._hsl_s === void 0) {
			let e = this.getMax() - this.getMin();
			if (e === 0) this._hsl_s = 0;
			else {
				let t = this.getLightness();
				this._hsl_s = e / 255 / (1 - Math.abs(2 * t - 1));
			}
		}
		return this._hsl_s;
	}
	getLightness() {
		return this._l === void 0 && (this._l = (this.getMax() + this.getMin()) / 510), this._l;
	}
	getValue() {
		return this._v === void 0 && (this._v = this.getMax() / 255), this._v;
	}
	getBrightness() {
		return this._brightness === void 0 && (this._brightness = (this.r * 299 + this.g * 587 + this.b * 114) / 1e3), this._brightness;
	}
	darken(e = 10) {
		let t = this.getHue(), n = this.getSaturation(), r = this.getLightness() - e / 100;
		return r < 0 && (r = 0), this._c({
			h: t,
			s: n,
			l: r,
			a: this.a
		});
	}
	lighten(e = 10) {
		let t = this.getHue(), n = this.getSaturation(), r = this.getLightness() + e / 100;
		return r > 1 && (r = 1), this._c({
			h: t,
			s: n,
			l: r,
			a: this.a
		});
	}
	mix(e, t = 50) {
		let n = this._c(e), r = t / 100, i = (e) => (n[e] - this[e]) * r + this[e], a = {
			r: Ui(i("r")),
			g: Ui(i("g")),
			b: Ui(i("b")),
			a: Ui(i("a") * 100) / 100
		};
		return this._c(a);
	}
	tint(e = 10) {
		return this.mix({
			r: 255,
			g: 255,
			b: 255,
			a: 1
		}, e);
	}
	shade(e = 10) {
		return this.mix({
			r: 0,
			g: 0,
			b: 0,
			a: 1
		}, e);
	}
	onBackground(e) {
		let t = this._c(e), n = this.a + t.a * (1 - this.a), r = (e) => Ui((this[e] * this.a + t[e] * t.a * (1 - this.a)) / n);
		return this._c({
			r: r("r"),
			g: r("g"),
			b: r("b"),
			a: n
		});
	}
	isDark() {
		return this.getBrightness() < 128;
	}
	isLight() {
		return this.getBrightness() >= 128;
	}
	equals(e) {
		return this.r === e.r && this.g === e.g && this.b === e.b && this.a === e.a;
	}
	clone() {
		return this._c(this);
	}
	toHexString() {
		let e = "#", t = (this.r || 0).toString(16);
		e += t.length === 2 ? t : "0" + t;
		let n = (this.g || 0).toString(16);
		e += n.length === 2 ? n : "0" + n;
		let r = (this.b || 0).toString(16);
		if (e += r.length === 2 ? r : "0" + r, typeof this.a == "number" && this.a >= 0 && this.a < 1) {
			let t = Ui(this.a * 255).toString(16);
			e += t.length === 2 ? t : "0" + t;
		}
		return e;
	}
	toHsl() {
		return {
			h: this.getHue(),
			s: this.getHSLSaturation(),
			l: this.getLightness(),
			a: this.a
		};
	}
	toHslString() {
		let e = this.getHue(), t = Ui(this.getHSLSaturation() * 100), n = Ui(this.getLightness() * 100);
		return this.a === 1 ? `hsl(${e},${t}%,${n}%)` : `hsla(${e},${t}%,${n}%,${this.a})`;
	}
	toHsv() {
		return {
			h: this.getHue(),
			s: this.getHSVSaturation(),
			v: this.getValue(),
			a: this.a
		};
	}
	toRgb() {
		return {
			r: this.r,
			g: this.g,
			b: this.b,
			a: this.a
		};
	}
	toRgbString() {
		return this.a === 1 ? `rgb(${this.r},${this.g},${this.b})` : `rgba(${this.r},${this.g},${this.b},${this.a})`;
	}
	toString() {
		return this.toRgbString();
	}
	_sc(e, t, n) {
		let r = this.clone();
		return r[e] = Ki(t, n), r;
	}
	_c(e) {
		return new this.constructor(e);
	}
	getMax() {
		return this._max === void 0 && (this._max = Math.max(this.r, this.g, this.b)), this._max;
	}
	getMin() {
		return this._min === void 0 && (this._min = Math.min(this.r, this.g, this.b)), this._min;
	}
	fromHexString(e) {
		let t = e.replace("#", "");
		function n(e, n) {
			return parseInt(t[e] + t[n || e], 16);
		}
		t.length < 6 ? (this.r = n(0), this.g = n(1), this.b = n(2), this.a = t[3] ? n(3) / 255 : 1) : (this.r = n(0, 1), this.g = n(2, 3), this.b = n(4, 5), this.a = t[6] ? n(6, 7) / 255 : 1);
	}
	fromHsl({ h: e, s: t, l: n, a: r }) {
		let i = (e % 360 + 360) % 360;
		if (this._h = i, this._hsl_s = t, this._l = n, this.a = typeof r == "number" ? r : 1, t <= 0) {
			let e = Ui(n * 255);
			this.r = e, this.g = e, this.b = e;
			return;
		}
		let a = 0, o = 0, s = 0, c = i / 60, l = (1 - Math.abs(2 * n - 1)) * t, u = l * (1 - Math.abs(c % 2 - 1));
		c >= 0 && c < 1 ? (a = l, o = u) : c >= 1 && c < 2 ? (a = u, o = l) : c >= 2 && c < 3 ? (o = l, s = u) : c >= 3 && c < 4 ? (o = u, s = l) : c >= 4 && c < 5 ? (a = u, s = l) : c >= 5 && c < 6 && (a = l, s = u);
		let d = n - l / 2;
		this.r = Ui((a + d) * 255), this.g = Ui((o + d) * 255), this.b = Ui((s + d) * 255);
	}
	fromHsv({ h: e, s: t, v: n, a: r }) {
		let i = (e % 360 + 360) % 360;
		this._h = i, this._hsv_s = t, this._v = n, this.a = typeof r == "number" ? r : 1;
		let a = Ui(n * 255);
		if (this.r = a, this.g = a, this.b = a, t <= 0) return;
		let o = i / 60, s = Math.floor(o), c = o - s, l = Ui(n * (1 - t) * 255), u = Ui(n * (1 - t * c) * 255), d = Ui(n * (1 - t * (1 - c)) * 255);
		switch (s) {
			case 0:
				this.g = d, this.b = l;
				break;
			case 1:
				this.r = u, this.b = l;
				break;
			case 2:
				this.r = l, this.b = d;
				break;
			case 3:
				this.r = l, this.g = u;
				break;
			case 4:
				this.r = d, this.g = l;
				break;
			default: this.g = l, this.b = u;
		}
	}
	fromHsvString(e) {
		let t = Wi(e, Gi);
		this.fromHsv({
			h: t[0],
			s: t[1],
			v: t[2],
			a: t[3]
		});
	}
	fromHslString(e) {
		let t = Wi(e, Gi);
		this.fromHsl({
			h: t[0],
			s: t[1],
			l: t[2],
			a: t[3]
		});
	}
	fromRgbString(e) {
		let t = Wi(e, (e, t) => t.includes("%") ? Ui(e / 100 * 255) : e);
		this.r = t[0], this.g = t[1], this.b = t[2], this.a = t[3];
	}
}, Ji = 2, Yi = .16, Xi = .05, Zi = .05, Qi = .15, $i = 5, ea = 4, ta = [
	{
		index: 7,
		amount: 15
	},
	{
		index: 6,
		amount: 25
	},
	{
		index: 5,
		amount: 30
	},
	{
		index: 5,
		amount: 45
	},
	{
		index: 5,
		amount: 65
	},
	{
		index: 5,
		amount: 85
	},
	{
		index: 4,
		amount: 90
	},
	{
		index: 3,
		amount: 95
	},
	{
		index: 2,
		amount: 97
	},
	{
		index: 1,
		amount: 98
	}
];
function na(e, t, n) {
	let r;
	return r = Math.round(e.h) >= 60 && Math.round(e.h) <= 240 ? n ? Math.round(e.h) - Ji * t : Math.round(e.h) + Ji * t : n ? Math.round(e.h) + Ji * t : Math.round(e.h) - Ji * t, r < 0 ? r += 360 : r >= 360 && (r -= 360), r;
}
function ra(e, t, n) {
	if (e.h === 0 && e.s === 0) return e.s;
	let r;
	return r = n ? e.s - Yi * t : t === ea ? e.s + Yi : e.s + Xi * t, r > 1 && (r = 1), n && t === $i && r > .1 && (r = .1), r < .06 && (r = .06), Math.round(r * 100) / 100;
}
function ia(e, t, n) {
	let r;
	return r = n ? e.v + Zi * t : e.v - Qi * t, r = Math.max(0, Math.min(1, r)), Math.round(r * 100) / 100;
}
function aa(e, t = {}) {
	let n = [], r = new qi(e), i = r.toHsv();
	for (let e = $i; e > 0; --e) {
		let t = new qi({
			h: na(i, e, !0),
			s: ra(i, e, !0),
			v: ia(i, e, !0)
		});
		n.push(t);
	}
	n.push(r);
	for (let e = 1; e <= ea; e += 1) {
		let t = new qi({
			h: na(i, e),
			s: ra(i, e),
			v: ia(i, e)
		});
		n.push(t);
	}
	return t.theme === "dark" ? ta.map(({ index: e, amount: r }) => new qi(t.backgroundColor || "#141414").mix(n[e], r).toHexString()) : n.map((e) => e.toHexString());
}
// node_modules/@ant-design/colors/es/presets.js
var oa = {
	red: "#F5222D",
	volcano: "#FA541C",
	orange: "#FA8C16",
	gold: "#FAAD14",
	yellow: "#FADB14",
	lime: "#A0D911",
	green: "#52C41A",
	cyan: "#13C2C2",
	blue: "#1677FF",
	geekblue: "#2F54EB",
	purple: "#722ED1",
	magenta: "#EB2F96",
	grey: "#666666"
}, sa = [
	"#fff1f0",
	"#ffccc7",
	"#ffa39e",
	"#ff7875",
	"#ff4d4f",
	"#f5222d",
	"#cf1322",
	"#a8071a",
	"#820014",
	"#5c0011"
];
sa.primary = sa[5];
var ca = [
	"#fff2e8",
	"#ffd8bf",
	"#ffbb96",
	"#ff9c6e",
	"#ff7a45",
	"#fa541c",
	"#d4380d",
	"#ad2102",
	"#871400",
	"#610b00"
];
ca.primary = ca[5];
var la = [
	"#fff7e6",
	"#ffe7ba",
	"#ffd591",
	"#ffc069",
	"#ffa940",
	"#fa8c16",
	"#d46b08",
	"#ad4e00",
	"#873800",
	"#612500"
];
la.primary = la[5];
var ua = [
	"#fffbe6",
	"#fff1b8",
	"#ffe58f",
	"#ffd666",
	"#ffc53d",
	"#faad14",
	"#d48806",
	"#ad6800",
	"#874d00",
	"#613400"
];
ua.primary = ua[5];
var da = [
	"#feffe6",
	"#ffffb8",
	"#fffb8f",
	"#fff566",
	"#ffec3d",
	"#fadb14",
	"#d4b106",
	"#ad8b00",
	"#876800",
	"#614700"
];
da.primary = da[5];
var fa = [
	"#fcffe6",
	"#f4ffb8",
	"#eaff8f",
	"#d3f261",
	"#bae637",
	"#a0d911",
	"#7cb305",
	"#5b8c00",
	"#3f6600",
	"#254000"
];
fa.primary = fa[5];
var pa = [
	"#f6ffed",
	"#d9f7be",
	"#b7eb8f",
	"#95de64",
	"#73d13d",
	"#52c41a",
	"#389e0d",
	"#237804",
	"#135200",
	"#092b00"
];
pa.primary = pa[5];
var ma = [
	"#e6fffb",
	"#b5f5ec",
	"#87e8de",
	"#5cdbd3",
	"#36cfc9",
	"#13c2c2",
	"#08979c",
	"#006d75",
	"#00474f",
	"#002329"
];
ma.primary = ma[5];
var ha = [
	"#e6f4ff",
	"#bae0ff",
	"#91caff",
	"#69b1ff",
	"#4096ff",
	"#1677ff",
	"#0958d9",
	"#003eb3",
	"#002c8c",
	"#001d66"
];
ha.primary = ha[5];
var ga = [
	"#f0f5ff",
	"#d6e4ff",
	"#adc6ff",
	"#85a5ff",
	"#597ef7",
	"#2f54eb",
	"#1d39c4",
	"#10239e",
	"#061178",
	"#030852"
];
ga.primary = ga[5];
var _a = [
	"#f9f0ff",
	"#efdbff",
	"#d3adf7",
	"#b37feb",
	"#9254de",
	"#722ed1",
	"#531dab",
	"#391085",
	"#22075e",
	"#120338"
];
_a.primary = _a[5];
var va = [
	"#fff0f6",
	"#ffd6e7",
	"#ffadd2",
	"#ff85c0",
	"#f759ab",
	"#eb2f96",
	"#c41d7f",
	"#9e1068",
	"#780650",
	"#520339"
];
va.primary = va[5];
var ya = [
	"#a6a6a6",
	"#999999",
	"#8c8c8c",
	"#808080",
	"#737373",
	"#666666",
	"#404040",
	"#1a1a1a",
	"#000000",
	"#000000"
];
ya.primary = ya[5];
var ba = {
	red: sa,
	volcano: ca,
	orange: la,
	gold: ua,
	yellow: da,
	lime: fa,
	green: pa,
	cyan: ma,
	blue: ha,
	geekblue: ga,
	purple: _a,
	magenta: va,
	grey: ya
}, xa = [
	"#2a1215",
	"#431418",
	"#58181c",
	"#791a1f",
	"#a61d24",
	"#d32029",
	"#e84749",
	"#f37370",
	"#f89f9a",
	"#fac8c3"
];
xa.primary = xa[5];
var Sa = [
	"#2b1611",
	"#441d12",
	"#592716",
	"#7c3118",
	"#aa3e19",
	"#d84a1b",
	"#e87040",
	"#f3956a",
	"#f8b692",
	"#fad4bc"
];
Sa.primary = Sa[5];
var Ca = [
	"#2b1d11",
	"#442a11",
	"#593815",
	"#7c4a15",
	"#aa6215",
	"#d87a16",
	"#e89a3c",
	"#f3b765",
	"#f8cf8d",
	"#fae3b7"
];
Ca.primary = Ca[5];
var wa = [
	"#2b2111",
	"#443111",
	"#594214",
	"#7c5914",
	"#aa7714",
	"#d89614",
	"#e8b339",
	"#f3cc62",
	"#f8df8b",
	"#faedb5"
];
wa.primary = wa[5];
var Ta = [
	"#2b2611",
	"#443b11",
	"#595014",
	"#7c6e14",
	"#aa9514",
	"#d8bd14",
	"#e8d639",
	"#f3ea62",
	"#f8f48b",
	"#fafab5"
];
Ta.primary = Ta[5];
var Ea = [
	"#1f2611",
	"#2e3c10",
	"#3e4f13",
	"#536d13",
	"#6f9412",
	"#8bbb11",
	"#a9d134",
	"#c9e75d",
	"#e4f88b",
	"#f0fab5"
];
Ea.primary = Ea[5];
var Da = [
	"#162312",
	"#1d3712",
	"#274916",
	"#306317",
	"#3c8618",
	"#49aa19",
	"#6abe39",
	"#8fd460",
	"#b2e58b",
	"#d5f2bb"
];
Da.primary = Da[5];
var Oa = [
	"#112123",
	"#113536",
	"#144848",
	"#146262",
	"#138585",
	"#13a8a8",
	"#33bcb7",
	"#58d1c9",
	"#84e2d8",
	"#b2f1e8"
];
Oa.primary = Oa[5];
var ka = [
	"#111a2c",
	"#112545",
	"#15325b",
	"#15417e",
	"#1554ad",
	"#1668dc",
	"#3c89e8",
	"#65a9f3",
	"#8dc5f8",
	"#b7dcfa"
];
ka.primary = ka[5];
var Aa = [
	"#131629",
	"#161d40",
	"#1c2755",
	"#203175",
	"#263ea0",
	"#2b4acb",
	"#5273e0",
	"#7f9ef3",
	"#a8c1f8",
	"#d2e0fa"
];
Aa.primary = Aa[5];
var ja = [
	"#1a1325",
	"#24163a",
	"#301c4d",
	"#3e2069",
	"#51258f",
	"#642ab5",
	"#854eca",
	"#ab7ae0",
	"#cda8f0",
	"#ebd7fa"
];
ja.primary = ja[5];
var Ma = [
	"#291321",
	"#40162f",
	"#551c3b",
	"#75204f",
	"#a02669",
	"#cb2b83",
	"#e0529c",
	"#f37fb7",
	"#f8a8cc",
	"#fad2e3"
];
Ma.primary = Ma[5];
var Na = [
	"#151515",
	"#1f1f1f",
	"#2d2d2d",
	"#393939",
	"#494949",
	"#5a5a5a",
	"#6a6a6a",
	"#7b7b7b",
	"#888888",
	"#969696"
];
Na.primary = Na[5];
// node_modules/antd/es/theme/themes/shared/genColorMapToken.js
function Pa(e, { generateColorPalettes: t, generateNeutralColorPalettes: n }) {
	let { colorSuccess: r, colorWarning: i, colorError: a, colorInfo: o, colorPrimary: s, colorBgBase: c, colorTextBase: l } = e, u = t(s), d = t(r), f = t(i), p = t(a), m = t(o), h = n(c, l), g = t(e.colorLink || e.colorInfo), _ = new qi(p[1]).mix(new qi(p[3]), 50).toHexString(), v = {};
	return Ii.forEach((n) => {
		let r = e[n];
		if (r) {
			let e = t(r);
			v[`${n}Hover`] = e[5], v[`${n}Active`] = e[7];
		}
	}), {
		...h,
		colorPrimaryBg: u[1],
		colorPrimaryBgHover: u[2],
		colorPrimaryBorder: u[3],
		colorPrimaryBorderHover: u[4],
		colorPrimaryHover: u[5],
		colorPrimary: u[6],
		colorPrimaryActive: u[7],
		colorPrimaryTextHover: u[8],
		colorPrimaryText: u[9],
		colorPrimaryTextActive: u[10],
		colorSuccessBg: d[1],
		colorSuccessBgHover: d[2],
		colorSuccessBorder: d[3],
		colorSuccessBorderHover: d[4],
		colorSuccessHover: d[4],
		colorSuccess: d[6],
		colorSuccessActive: d[7],
		colorSuccessTextHover: d[8],
		colorSuccessText: d[9],
		colorSuccessTextActive: d[10],
		colorErrorBg: p[1],
		colorErrorBgHover: p[2],
		colorErrorBgFilledHover: _,
		colorErrorBgActive: p[3],
		colorErrorBorder: p[3],
		colorErrorBorderHover: p[4],
		colorErrorHover: p[5],
		colorError: p[6],
		colorErrorActive: p[7],
		colorErrorTextHover: p[8],
		colorErrorText: p[9],
		colorErrorTextActive: p[10],
		colorWarningBg: f[1],
		colorWarningBgHover: f[2],
		colorWarningBorder: f[3],
		colorWarningBorderHover: f[4],
		colorWarningHover: f[4],
		colorWarning: f[6],
		colorWarningActive: f[7],
		colorWarningTextHover: f[8],
		colorWarningText: f[9],
		colorWarningTextActive: f[10],
		colorInfoBg: m[1],
		colorInfoBgHover: m[2],
		colorInfoBorder: m[3],
		colorInfoBorderHover: m[4],
		colorInfoHover: m[4],
		colorInfo: m[6],
		colorInfoActive: m[7],
		colorInfoTextHover: m[8],
		colorInfoText: m[9],
		colorInfoTextActive: m[10],
		colorLinkHover: g[4],
		colorLink: g[6],
		colorLinkActive: g[7],
		...v,
		colorBgMask: new qi("#000").setA(.45).toRgbString(),
		colorWhite: "#fff"
	};
}
// node_modules/antd/es/theme/themes/shared/genRadius.js
var Fa = (e) => {
	let t = e, n = e, r = e, i = e;
	return e < 6 && e >= 5 ? t = e + 1 : e < 16 && e >= 6 ? t = e + 2 : e >= 16 && (t = 16), e < 7 && e >= 5 ? n = 4 : e < 8 && e >= 7 ? n = 5 : e < 14 && e >= 8 ? n = 6 : e < 16 && e >= 14 ? n = 7 : e >= 16 && (n = 8), e < 6 && e >= 2 ? r = 1 : e >= 6 && (r = 2), e > 4 && e < 8 ? i = 4 : e >= 8 && (i = 6), {
		borderRadius: e,
		borderRadiusXS: r,
		borderRadiusSM: n,
		borderRadiusLG: t,
		borderRadiusOuter: i
	};
};
// node_modules/antd/es/theme/themes/shared/genCommonMapToken.js
function Ia(e) {
	let { motionUnit: t, motionBase: n, borderRadius: r, lineWidth: i } = e;
	return {
		motionDurationFast: `${(n + t).toFixed(1)}s`,
		motionDurationMid: `${(n + t * 2).toFixed(1)}s`,
		motionDurationSlow: `${(n + t * 3).toFixed(1)}s`,
		lineWidthBold: i + 1,
		...Fa(r)
	};
}
// node_modules/antd/es/theme/themes/shared/genControlHeight.js
var La = (e) => {
	let { controlHeight: t } = e;
	return {
		controlHeightSM: t * .75,
		controlHeightXS: t * .5,
		controlHeightLG: t * 1.25
	};
}, Ra = (e) => {
	let t = Ri(e), n = t.map((e) => e.size), r = t.map((e) => e.lineHeight), i = n[1], a = n[0], o = n[2], s = r[1], c = r[0], l = r[2];
	return {
		fontSizeSM: a,
		fontSize: i,
		fontSizeLG: o,
		fontSizeXL: n[3],
		fontSizeHeading1: n[6],
		fontSizeHeading2: n[5],
		fontSizeHeading3: n[4],
		fontSizeHeading4: n[3],
		fontSizeHeading5: n[2],
		lineHeight: s,
		lineHeightLG: l,
		lineHeightSM: c,
		fontHeight: Math.round(s * i),
		fontHeightLG: Math.round(l * o),
		fontHeightSM: Math.round(c * a),
		lineHeightHeading1: r[6],
		lineHeightHeading2: r[5],
		lineHeightHeading3: r[4],
		lineHeightHeading4: r[3],
		lineHeightHeading5: r[2]
	};
};
// node_modules/antd/es/theme/themes/shared/genSizeMapToken.js
function za(e) {
	let { sizeUnit: t, sizeStep: n } = e;
	return {
		sizeXXL: t * (n + 8),
		sizeXL: t * (n + 4),
		sizeLG: t * (n + 2),
		sizeMD: t * (n + 1),
		sizeMS: t * n,
		size: t * n,
		sizeSM: t * (n - 1),
		sizeXS: t * (n - 2),
		sizeXXS: t * (n - 3)
	};
}
// node_modules/antd/es/theme/themes/default/colorAlgorithm.js
var Ba = (e, t) => new qi(e).setA(t).toRgbString(), Va = (e, t) => new qi(e).darken(t).toHexString(), Ha = (e) => {
	let t = aa(e);
	return {
		1: t[0],
		2: t[1],
		3: t[2],
		4: t[3],
		5: t[4],
		6: t[5],
		7: t[6],
		8: t[4],
		9: t[5],
		10: t[6]
	};
}, Ua = (e, t, n) => {
	let r = e || "#fff", i = t || "#000";
	return {
		colorBgBase: r,
		colorTextBase: i,
		colorShadow: n || "#000",
		colorText: Ba(i, .88),
		colorTextSecondary: Ba(i, .65),
		colorTextTertiary: Ba(i, .45),
		colorTextQuaternary: Ba(i, .25),
		colorFill: Ba(i, .15),
		colorFillSecondary: Ba(i, .06),
		colorFillTertiary: Ba(i, .04),
		colorFillQuaternary: Ba(i, .02),
		colorBgSolid: Ba(i, 1),
		colorBgSolidHover: Ba(i, .75),
		colorBgSolidActive: Ba(i, .95),
		colorBgLayout: Va(r, 4),
		colorBgContainer: Va(r, 0),
		colorBgElevated: Va(r, 0),
		colorBgSpotlight: Ba(i, .85),
		colorBgBlur: "transparent",
		colorBorder: Va(r, 15),
		colorBorderDisabled: Va(r, 15),
		colorBorderSecondary: Va(r, 6)
	};
};
// node_modules/antd/es/theme/themes/default/index.js
function Wa(e) {
	oa.pink = oa.magenta, ba.pink = ba.magenta;
	let t = Object.keys(Bi).map((t) => {
		let n = e[t] === oa[t] ? ba[t] : aa(e[t]);
		return Array.from({ length: 10 }, () => 1).reduce((e, r, i) => (e[`${t}-${i + 1}`] = n[i], e[`${t}${i + 1}`] = n[i], e), {});
	}).reduce((e, t) => (e = {
		...e,
		...t
	}, e), {});
	return {
		...e,
		...t,
		...Pa(e, {
			generateColorPalettes: Ha,
			generateNeutralColorPalettes: Ua
		}),
		...Ra(e.fontSize),
		...za(e),
		...La(e),
		...Ia(e)
	};
}
// node_modules/antd/es/theme/themes/default/theme.js
var Ga = Jt(Wa), Ka = {
	token: Vi,
	override: { override: Vi },
	hashed: !0
}, qa = /*#__PURE__*/ g.createContext(Ka);
// node_modules/antd/es/theme/util/getAlphaColor.js
function Ja(e) {
	return e >= 0 && e <= 255;
}
function Ya(e, t) {
	let { r: n, g: r, b: i, a } = new qi(e).toRgb();
	if (a < 1) return e;
	let { r: o, g: s, b: c } = new qi(t).toRgb();
	for (let e = .01; e <= 1; e += .01) {
		let t = Math.round((n - o * (1 - e)) / e), a = Math.round((r - s * (1 - e)) / e), l = Math.round((i - c * (1 - e)) / e);
		if (Ja(t) && Ja(a) && Ja(l)) return new qi({
			r: t,
			g: a,
			b: l,
			a: Math.round(e * 100) / 100
		}).toRgbString();
	}
	/* istanbul ignore next */
	return new qi({
		r: n,
		g: r,
		b: i,
		a: 1
	}).toRgbString();
}
// node_modules/antd/es/theme/util/alias.js
function Xa(e) {
	let { override: t, ...n } = e, r = { ...t };
	Object.keys(Vi).forEach((e) => {
		delete r[e];
	});
	let i = {
		...n,
		...r
	}, a = new qi(i.colorShadow), o = a.a, s = (e) => a.clone().setA(o * e).toRgbString(), c = 1200, l = 1600, u = 1920;
	return i.motion === !1 && (i.motionDurationFast = "0s", i.motionDurationMid = "0s", i.motionDurationSlow = "0s"), {
		...i,
		colorFillContent: i.colorFillSecondary,
		colorFillContentHover: i.colorFill,
		colorFillAlter: i.colorFillQuaternary,
		colorBgContainerDisabled: i.colorFillTertiary,
		colorBorderBg: i.colorBgContainer,
		colorSplit: Ya(i.colorBorderSecondary, i.colorBgContainer),
		colorTextPlaceholder: i.colorTextQuaternary,
		colorTextDisabled: i.colorTextQuaternary,
		colorTextHeading: i.colorText,
		colorTextLabel: i.colorTextSecondary,
		colorTextDescription: i.colorTextTertiary,
		colorTextLightSolid: i.colorWhite,
		colorHighlight: i.colorError,
		colorBgTextHover: i.colorFillSecondary,
		colorBgTextActive: i.colorFill,
		colorIcon: i.colorTextTertiary,
		colorIconHover: i.colorText,
		colorErrorOutline: Ya(i.colorErrorBg, i.colorBgContainer),
		colorWarningOutline: Ya(i.colorWarningBg, i.colorBgContainer),
		colorErrorAffix: i.colorError,
		colorWarningAffix: i.colorWarning,
		fontHeight: Math.round(i.fontSize * i.lineHeight),
		fontHeightSM: Math.round(i.fontSizeSM * i.lineHeightSM),
		fontHeightLG: Math.round(i.fontSizeLG * i.lineHeightLG),
		fontSizeIcon: i.fontSizeSM,
		lineWidthFocus: i.focusOutline === !1 ? 0 : i.lineWidth * 3,
		lineWidth: i.lineWidth,
		controlOutlineWidth: i.lineWidth * 2,
		controlInteractiveSize: i.controlHeight / 2,
		controlItemBgHover: i.colorFillTertiary,
		controlItemBgActive: i.colorPrimaryBg,
		controlItemBgActiveHover: i.colorPrimaryBgHover,
		controlItemBgActiveDisabled: i.colorFill,
		controlTmpOutline: i.colorFillQuaternary,
		controlOutline: Ya(i.colorPrimaryBg, i.colorBgContainer),
		lineType: i.lineType,
		borderRadius: i.borderRadius,
		borderRadiusXS: i.borderRadiusXS,
		borderRadiusSM: i.borderRadiusSM,
		borderRadiusLG: i.borderRadiusLG,
		fontWeightStrong: 600,
		opacityLoading: .65,
		linkDecoration: "none",
		linkHoverDecoration: "none",
		linkFocusDecoration: "none",
		controlPaddingHorizontal: 12,
		controlPaddingHorizontalSM: 8,
		paddingXXS: i.sizeXXS,
		paddingXS: i.sizeXS,
		paddingSM: i.sizeSM,
		padding: i.size,
		paddingMD: i.sizeMD,
		paddingLG: i.sizeLG,
		paddingXL: i.sizeXL,
		paddingContentHorizontalLG: i.sizeLG,
		paddingContentVerticalLG: i.sizeMS,
		paddingContentHorizontal: i.sizeMS,
		paddingContentVertical: i.sizeSM,
		paddingContentHorizontalSM: i.size,
		paddingContentVerticalSM: i.sizeXS,
		marginXXS: i.sizeXXS,
		marginXS: i.sizeXS,
		marginSM: i.sizeSM,
		margin: i.size,
		marginMD: i.sizeMD,
		marginLG: i.sizeLG,
		marginXL: i.sizeXL,
		marginXXL: i.sizeXXL,
		boxShadow: `
      0 6px 16px 0 ${s(.08)},
      0 3px 6px -4px ${s(.12)},
      0 9px 28px 8px ${s(.05)}
    `,
		boxShadowSecondary: `
      0 6px 16px 0 ${s(.08)},
      0 3px 6px -4px ${s(.12)},
      0 9px 28px 8px ${s(.05)}
    `,
		boxShadowTertiary: `
      0 1px 2px 0 ${s(.05)},
      0 1px 6px -1px ${s(.03)},
      0 2px 4px 0 ${s(.03)}
    `,
		screenXS: 480,
		screenXSMin: 480,
		screenXSMax: 575,
		screenSM: 576,
		screenSMMin: 576,
		screenSMMax: 767,
		screenMD: 768,
		screenMDMin: 768,
		screenMDMax: 991,
		screenLG: 992,
		screenLGMin: 992,
		screenLGMax: 1199,
		screenXL: c,
		screenXLMin: c,
		screenXLMax: 1599,
		screenXXL: l,
		screenXXLMin: l,
		screenXXLMax: 1919,
		screenXXXL: u,
		screenXXXLMin: u,
		boxShadowPopoverArrow: `2px 2px 5px ${s(.05)}`,
		dropShadowPopover: `drop-shadow(0 6px 16px ${s(.08)}) drop-shadow(0 3px 6px ${s(.12)}) drop-shadow(0 9px 28px ${s(.05)})`,
		boxShadowCard: `
      0 1px 2px -2px ${s(.16)},
      0 3px 6px 0 ${s(.12)},
      0 5px 12px 4px ${s(.09)}
    `,
		boxShadowDrawerRight: `
      -6px 0 16px 0 ${s(.08)},
      -3px 0 6px -4px ${s(.12)},
      -9px 0 28px 8px ${s(.05)}
    `,
		boxShadowDrawerLeft: `
      6px 0 16px 0 ${s(.08)},
      3px 0 6px -4px ${s(.12)},
      9px 0 28px 8px ${s(.05)}
    `,
		boxShadowDrawerUp: `
      0 6px 16px 0 ${s(.08)},
      0 3px 6px -4px ${s(.12)},
      0 9px 28px 8px ${s(.05)}
    `,
		boxShadowDrawerDown: `
      0 -6px 16px 0 ${s(.08)},
      0 -3px 6px -4px ${s(.12)},
      0 -9px 28px 8px ${s(.05)}
    `,
		boxShadowTabsOverflowLeft: `inset 10px 0 8px -8px ${s(.08)}`,
		boxShadowTabsOverflowRight: `inset -10px 0 8px -8px ${s(.08)}`,
		boxShadowTabsOverflowTop: `inset 0 10px 8px -8px ${s(.08)}`,
		boxShadowTabsOverflowBottom: `inset 0 -10px 8px -8px ${s(.08)}`,
		...r
	};
}
// node_modules/antd/es/theme/useToken.js
var Za = {
	lineHeight: !0,
	lineHeightSM: !0,
	lineHeightLG: !0,
	lineHeightHeading1: !0,
	lineHeightHeading2: !0,
	lineHeightHeading3: !0,
	lineHeightHeading4: !0,
	lineHeightHeading5: !0,
	opacityLoading: !0,
	fontWeightStrong: !0,
	zIndexPopupBase: !0,
	zIndexBase: !0,
	opacityImage: !0
}, Qa = {
	motionBase: !0,
	motionUnit: !0
}, $a = {
	screenXS: !0,
	screenXSMin: !0,
	screenXSMax: !0,
	screenSM: !0,
	screenSMMin: !0,
	screenSMMax: !0,
	screenMD: !0,
	screenMDMin: !0,
	screenMDMax: !0,
	screenLG: !0,
	screenLGMin: !0,
	screenLGMax: !0,
	screenXL: !0,
	screenXLMin: !0,
	screenXLMax: !0,
	screenXXL: !0,
	screenXXLMin: !0,
	screenXXLMax: !0,
	screenXXXL: !0,
	screenXXXLMin: !0
}, eo = (e, t, n) => {
	let r = n.getDerivativeToken(e), { override: i, ...a } = t, o = {
		...r,
		override: i
	};
	return o = Xa(o), a && Object.entries(a).forEach(([e, t]) => {
		let { theme: n, ...r } = t, i = r;
		n && (i = eo({
			...o,
			...r
		}, { override: r }, n)), o[e] = i;
	}), o;
};
function to() {
	let { token: e, hashed: t, theme: n, override: r, cssVar: i, zeroRuntime: a } = g.useContext(qa), { csp: o, getPrefixCls: s } = g.useContext(kt), c = {
		prefix: i?.prefix ?? s(),
		key: i?.key ?? "css-var-root"
	}, l = `${zi}-${t || ""}`, u = n || Ga, [d, f, p] = xn(u, [Vi, e], {
		salt: l,
		override: r,
		getComputedToken: eo,
		cssVar: {
			...c,
			unitless: Za,
			ignore: Qa,
			preserve: $a
		},
		nonce: o?.nonce
	});
	return [
		u,
		p,
		t ? f : "",
		d,
		c,
		!!a
	];
}
// node_modules/antd/es/style/index.js
var no = {
	overflow: "hidden",
	whiteSpace: "nowrap",
	textOverflow: "ellipsis"
}, ro = (e, t = !1) => ({
	boxSizing: "border-box",
	margin: 0,
	padding: 0,
	color: e.colorText,
	fontSize: e.fontSize,
	lineHeight: e.lineHeight,
	listStyle: "none",
	fontFamily: t ? "inherit" : e.fontFamily
}), io = () => ({
	display: "inline-flex",
	alignItems: "center",
	color: "inherit",
	fontStyle: "normal",
	lineHeight: 0,
	textAlign: "center",
	textTransform: "none",
	verticalAlign: "-0.125em",
	textRendering: "optimizeLegibility",
	"-webkit-font-smoothing": "antialiased",
	"-moz-osx-font-smoothing": "grayscale",
	"> *": { lineHeight: 1 },
	svg: {
		display: "inline-block",
		verticalAlign: "inherit"
	}
}), ao = new Kr("loadingCircle", { "100%": { transform: "rotate(360deg)" } }), oo = (e, t) => ({
	outline: `${nn(e.lineWidthFocus)} solid ${e.colorPrimaryBorder}`,
	outlineOffset: t ?? 1,
	transition: ["outline-offset", "outline"].map((e) => `${e} 0s`).join(", ")
}), so = (e, t) => ({ "&:focus-visible": oo(e, t) }), co = (e) => ({ a: {
	color: e.colorLink,
	textDecoration: e.linkDecoration,
	backgroundColor: "transparent",
	outline: "none",
	cursor: "pointer",
	transition: `color ${e.motionDurationSlow}`,
	"-webkit-text-decoration-skip": "objects",
	"&:hover": { color: e.colorLinkHover },
	"&:active": { color: e.colorLinkActive },
	"&:active, &:hover": {
		textDecoration: e.linkHoverDecoration,
		outline: 0
	},
	"&:focus": {
		textDecoration: e.linkFocusDecoration,
		outline: 0
	},
	...so(e),
	"&[disabled]": {
		color: e.colorTextDisabled,
		cursor: "not-allowed"
	}
} }), lo = (e, t, n, r) => {
	let i = `[class^="${t}"], [class*=" ${t}"]`, a = n ? `.${n}` : i, o = {
		boxSizing: "border-box",
		"&::before, &::after": { boxSizing: "border-box" }
	}, s = {};
	return r !== !1 && (s = {
		fontFamily: e.fontFamily,
		fontSize: e.fontSize
	}), { [a]: {
		...s,
		...o,
		[i]: o
	} };
}, uo = (e) => ({
	[`.${e}`]: {
		...io(),
		"&::before": { display: "none" },
		"&[tabindex]": { cursor: "pointer" }
	},
	[`.${e} .${e}-icon`]: { display: "block" },
	[`.${e}-spin`]: {
		animationName: ao,
		animationDuration: "1s",
		animationIterationCount: "infinite",
		animationTimingFunction: "linear"
	}
}), { genStyleHooks: fo, genComponentStyleHook: po, genSubStyleComponent: mo } = Fi({
	usePrefix: () => {
		let { getPrefixCls: e, iconPrefixCls: t } = (0, g.useContext)(kt);
		return {
			rootPrefixCls: e(),
			iconPrefixCls: t
		};
	},
	useToken: () => {
		let [e, t, n, r, i, a] = to();
		return {
			theme: e,
			realToken: t,
			hashId: n,
			token: r,
			cssVar: i,
			zeroRuntime: a
		};
	},
	useCSP: () => {
		let { csp: e } = (0, g.useContext)(kt);
		return e ?? {};
	},
	getResetStyles: (e, t) => {
		let n = co(e);
		return [
			n,
			{ "&": n },
			uo(t?.prefix.iconPrefixCls ?? "anticon")
		];
	},
	getCommonStyle: lo,
	getCompUnitless: () => Za
}), ho = (e, t) => {
	let n = `--${e.replace(/\./g, "")}-${t}-`;
	return [(e) => `${n}${e}`, (e, t) => t ? `var(${n}${e}, ${t})` : `var(${n}${e})`];
}, go = (e, t) => {
	let [n, r] = to();
	return Ur({
		theme: n,
		token: r,
		hashId: "",
		path: ["ant-design-icons", e],
		nonce: () => t?.nonce,
		layer: { name: "antd" }
	}, () => uo(e));
}, _o = {
	icon: {
		tag: "svg",
		attrs: {
			viewBox: "64 64 896 896",
			focusable: "false"
		},
		children: [{
			tag: "path",
			attrs: { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" }
		}]
	},
	name: "check-circle",
	theme: "filled"
}, vo = /*#__PURE__*/ (0, g.createContext)({}), yo = "data-rc-order", bo = "data-rc-priority", xo = "rc-util-key", So = /* @__PURE__ */ new Map();
function Co() {
	return !!(typeof window < "u" && window.document && window.document.createElement);
}
function wo(e, t) {
	if (!e || !t) return !1;
	if (e.contains) return e.contains(t);
	let n = t;
	for (; n;) {
		if (n === e) return !0;
		n = n.parentNode;
	}
	return !1;
}
function To({ mark: e } = {}) {
	return e ? e.startsWith("data-") ? e : `data-${e}` : xo;
}
function Eo(e) {
	return e.attachTo ? e.attachTo : document.querySelector("head") || document.body;
}
function Do(e) {
	return e === "queue" ? "prependQueue" : e ? "prepend" : "append";
}
function Oo(e) {
	return Array.from((So.get(e) || e).children).filter((e) => e.tagName === "STYLE");
}
function ko(e, t = {}) {
	if (!Co()) return null;
	let { csp: n, prepend: r, priority: i = 0 } = t, a = Do(r), o = a === "prependQueue", s = document.createElement("style");
	s.setAttribute(yo, a), o && i && s.setAttribute(bo, `${i}`), n?.nonce && (s.nonce = n.nonce), s.innerHTML = e;
	let c = Eo(t), { firstChild: l } = c;
	if (r) {
		if (o) {
			let e = (t.styles || Oo(c)).filter((e) => {
				if (!["prepend", "prependQueue"].includes(e.getAttribute(yo))) return !1;
				let t = Number(e.getAttribute(bo) || 0);
				return i >= t;
			});
			if (e.length) return c.insertBefore(s, e[e.length - 1].nextSibling), s;
		}
		c.insertBefore(s, l);
	} else c.appendChild(s);
	return s;
}
function Ao(e, t = {}) {
	let { styles: n } = t;
	return n ||= Oo(Eo(t)), n.find((n) => n.getAttribute(To(t)) === e);
}
function jo(e, t) {
	let n = So.get(e);
	if (!n || !wo(document, n)) {
		let n = ko("", t);
		if (!n) return;
		let { parentNode: r } = n;
		So.set(e, r), e.removeChild(n);
	}
}
function Mo(e, t, n = {}) {
	if (!Co()) return null;
	let r = Eo(n), i = Oo(r), a = {
		...n,
		styles: i
	};
	jo(r, a);
	let o = Ao(t, a);
	if (o) return a.csp?.nonce && o.nonce !== a.csp.nonce && (o.nonce = a.csp.nonce), o.innerHTML !== e && (o.innerHTML = e), o;
	let s = ko(e, a);
	return s?.setAttribute(To(a), t), s;
}
function No(e) {
	return e?.getRootNode?.();
}
function Po(e) {
	let t = No(e);
	return typeof ShadowRoot < "u" && t instanceof ShadowRoot ? t : null;
}
var Fo = {};
function Io(e, t) {
	e || Fo[t] || (Fo[t] = !0);
}
// node_modules/@ant-design/icons/es/renderUtils.js
function Lo(e) {
	return e.replace(/-(.)/g, (e, t) => t.toUpperCase());
}
function Ro(e, t) {
	Io(e, `[@ant-design/icons] ${t}`);
}
function zo(e) {
	return typeof e == "object" && !!e && typeof e.name == "string" && typeof e.theme == "string" && (typeof e.icon == "object" || typeof e.icon == "function");
}
function Bo(e = {}) {
	return Object.keys(e).reduce((t, n) => {
		let r = e[n];
		switch (n) {
			case "class":
				t.className = r, delete t.class;
				break;
			default: delete t[n], t[Lo(n)] = r;
		}
		return t;
	}, {});
}
function Vo(e, t, n) {
	return n ? /*#__PURE__*/ g.createElement(e.tag, {
		key: t,
		...Bo(e.attrs),
		...n
	}, (e.children || []).map((n, r) => Vo(n, `${t}-${e.tag}-${r}`))) : /*#__PURE__*/ g.createElement(e.tag, {
		key: t,
		...Bo(e.attrs)
	}, (e.children || []).map((n, r) => Vo(n, `${t}-${e.tag}-${r}`)));
}
var Ho = "\n.anticon {\n  display: inline-flex;\n  align-items: center;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.anticon > * {\n  line-height: 1;\n}\n\n.anticon svg {\n  display: inline-block;\n  vertical-align: inherit;\n}\n\n.anticon::before {\n  display: none;\n}\n\n.anticon .anticon-icon {\n  display: block;\n}\n\n.anticon[tabindex] {\n  cursor: pointer;\n}\n\n.anticon-spin {\n  -webkit-animation: loadingCircle 1s infinite linear;\n  animation: loadingCircle 1s infinite linear;\n}\n\n@-webkit-keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n", Uo = (e) => {
	let { csp: t, prefixCls: n, layer: r, zeroRuntime: i } = (0, g.useContext)(vo), a = Ho;
	n && (a = a.replace(/anticon/g, n)), r && (a = `@layer ${r} {\n${a}\n}`), (0, g.useEffect)(() => {
		if (i) return;
		let n = e.current, o = Po(n);
		Mo(a, "@ant-design-icons", {
			prepend: !r,
			csp: t,
			attachTo: o
		});
	}, []);
}, Wo = (e) => {
	let { icon: t, className: n, onClick: r, style: i, primaryColor: a, secondaryColor: o, ...s } = e, c = g.useRef(null);
	if (Uo(c), Ro(zo(t), `icon should be icon definiton, but got ${typeof t}`), !zo(t)) return null;
	let l = t;
	return Vo(l.icon, `svg-${l.name}`, {
		className: n,
		onClick: r,
		style: i,
		"data-icon": l.name,
		width: "1em",
		height: "1em",
		fill: "currentColor",
		"aria-hidden": "true",
		...s,
		ref: c
	});
};
Wo.displayName = "IconReact";
// node_modules/@ant-design/icons/es/components/AntdIconLight.js
function Go() {
	return Go = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Go.apply(this, arguments);
}
var Ko = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { className: n, icon: r, spin: i, rotate: a, tabIndex: o, onClick: s, twoToneColor: c, ...l } = e, { prefixCls: u = "anticon", rootClassName: d } = g.useContext(vo);
	if (Ro(zo(r), `icon should be icon definiton, but got ${typeof r}`), !zo(r)) return null;
	let f = Z(d, u, {
		[`${u}-${r.name}`]: !!r.name,
		[`${u}-spin`]: !!i || r.name === "loading"
	}, n), p = o;
	p === void 0 && s && (p = -1);
	let m = a ? {
		msTransform: `rotate(${a}deg)`,
		transform: `rotate(${a}deg)`
	} : void 0;
	return /*#__PURE__*/ g.createElement("span", Go({
		role: "img",
		"aria-label": r.name
	}, l, {
		ref: t,
		tabIndex: p,
		onClick: s,
		className: f
	}), /*#__PURE__*/ g.createElement(Wo, {
		icon: r,
		style: m
	}));
});
// node_modules/@ant-design/icons/es/icons/CheckCircleFilled.js
function qo() {
	return qo = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, qo.apply(this, arguments);
}
var Jo = /*#__PURE__*/ g.forwardRef((e, t) => /*#__PURE__*/ g.createElement(Ko, qo({}, e, {
	ref: t,
	icon: _o
}))), Yo = {
	icon: {
		tag: "svg",
		attrs: {
			"fill-rule": "evenodd",
			viewBox: "64 64 896 896",
			focusable: "false"
		},
		children: [{
			tag: "path",
			attrs: { d: "M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z" }
		}]
	},
	name: "close-circle",
	theme: "filled"
};
// node_modules/@ant-design/icons/es/icons/CloseCircleFilled.js
function Xo() {
	return Xo = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Xo.apply(this, arguments);
}
var Zo = /*#__PURE__*/ g.forwardRef((e, t) => /*#__PURE__*/ g.createElement(Ko, Xo({}, e, {
	ref: t,
	icon: Yo
}))), Qo = {
	icon: {
		tag: "svg",
		attrs: {
			"fill-rule": "evenodd",
			viewBox: "64 64 896 896",
			focusable: "false"
		},
		children: [{
			tag: "path",
			attrs: { d: "M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z" }
		}]
	},
	name: "close",
	theme: "outlined"
};
// node_modules/@ant-design/icons/es/icons/CloseOutlined.js
function $o() {
	return $o = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, $o.apply(this, arguments);
}
var es = /*#__PURE__*/ g.forwardRef((e, t) => /*#__PURE__*/ g.createElement(Ko, $o({}, e, {
	ref: t,
	icon: Qo
}))), ts = {
	icon: {
		tag: "svg",
		attrs: {
			viewBox: "64 64 896 896",
			focusable: "false"
		},
		children: [{
			tag: "path",
			attrs: { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }
		}]
	},
	name: "exclamation-circle",
	theme: "filled"
};
// node_modules/@ant-design/icons/es/icons/ExclamationCircleFilled.js
function ns() {
	return ns = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, ns.apply(this, arguments);
}
var rs = /*#__PURE__*/ g.forwardRef((e, t) => /*#__PURE__*/ g.createElement(Ko, ns({}, e, {
	ref: t,
	icon: ts
}))), is = {
	icon: {
		tag: "svg",
		attrs: {
			viewBox: "64 64 896 896",
			focusable: "false"
		},
		children: [{
			tag: "path",
			attrs: { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" }
		}]
	},
	name: "info-circle",
	theme: "filled"
};
// node_modules/@ant-design/icons/es/icons/InfoCircleFilled.js
function as() {
	return as = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, as.apply(this, arguments);
}
var os = /*#__PURE__*/ g.forwardRef((e, t) => /*#__PURE__*/ g.createElement(Ko, as({}, e, {
	ref: t,
	icon: is
}))), ss = /*#__PURE__*/ g.createContext({}), cs = (e) => {
	let { children: t, ...n } = e, r = g.useMemo(() => ({ motion: n.motion }), [n.motion]);
	return /*#__PURE__*/ g.createElement(ss.Provider, { value: r }, t);
}, ls = "none", us = "appear", ds = "enter", fs = "leave", ps = "none", ms = "prepare", hs = "start", gs = "active", _s = "prepared";
// node_modules/@rc-component/motion/es/util/motion.js
function vs(e, t) {
	let n = {};
	return n[e.toLowerCase()] = t.toLowerCase(), n[`Webkit${e}`] = `webkit${t}`, n[`Moz${e}`] = `moz${t}`, n[`ms${e}`] = `MS${t}`, n[`O${e}`] = `o${t.toLowerCase()}`, n;
}
function ys(e, t) {
	let n = {
		animationend: vs("Animation", "AnimationEnd"),
		transitionend: vs("Transition", "TransitionEnd")
	};
	return e && ("AnimationEvent" in t || delete n.animationend.animation, "TransitionEvent" in t || delete n.transitionend.transition), n;
}
var bs = ys(v(), typeof window < "u" ? window : {}), xs = {};
v() && ({style: xs} = document.createElement("div"));
var Ss = {};
function Cs(e) {
	if (Ss[e]) return Ss[e];
	let t = bs[e];
	if (t) {
		let n = Object.keys(t), r = n.length;
		for (let i = 0; i < r; i += 1) {
			let r = n[i];
			if (Object.prototype.hasOwnProperty.call(t, r) && r in xs) return Ss[e] = t[r], Ss[e];
		}
	}
	return "";
}
var ws = Cs("animationend"), Ts = Cs("transitionend"), Es = !!(ws && Ts), Ds = ws || "animationend", Os = Ts || "transitionend";
function ks(e, t) {
	return e ? typeof e == "object" ? e[t.replace(/-\w/g, (e) => e[1].toUpperCase())] : `${e}-${t}` : null;
}
// node_modules/@rc-component/motion/es/hooks/useDomMotionEvents.js
var As = ((e) => {
	let t = (0, g.useRef)();
	function n(t) {
		t && (t.removeEventListener(Os, e), t.removeEventListener(Ds, e));
	}
	function r(r) {
		t.current && t.current !== r && n(t.current), r && r !== t.current && (r.addEventListener(Os, e), r.addEventListener(Ds, e), t.current = r);
	}
	return g.useEffect(() => () => {
		n(t.current), t.current = null;
	}, []), [r, n];
}), js = v() ? g.useLayoutEffect : g.useEffect, Ms = (() => {
	let e = g.useRef(null);
	function t() {
		O.cancel(e.current);
	}
	function n(r, i = 2) {
		t();
		let a = O(() => {
			i <= 1 ? r({ isCanceled: () => a !== e.current }) : n(r, i - 1);
		});
		e.current = a;
	}
	return g.useEffect(() => () => {
		t();
	}, []), [n, t];
}), Ns = [
	ms,
	hs,
	gs,
	"end"
], Ps = [ms, _s];
function Fs(e) {
	return e === "active" || e === "end";
}
var Is = ((e, t, n) => {
	let [r, i] = x(ps), [a, o] = Ms();
	function s() {
		i(ms, !0);
	}
	let c = t ? Ps : Ns;
	return js(() => {
		if (r !== "none" && r !== "end") {
			let e = c.indexOf(r), t = c[e + 1], o = n(r);
			o === !1 ? i(t, !0) : t && a((e) => {
				function n() {
					e.isCanceled() || i(t, !0);
				}
				o === !0 ? n() : Promise.resolve(o).then(n);
			});
		}
	}, [e, r]), g.useEffect(() => () => {
		o();
	}, []), [s, r];
});
// node_modules/@rc-component/motion/es/hooks/useStatus.js
function Ls(e, t, n, { motionEnter: r = !0, motionAppear: i = !0, motionLeave: a = !0, motionDeadline: o, motionLeaveImmediately: s, onAppearPrepare: c, onEnterPrepare: l, onLeavePrepare: u, onAppearStart: d, onEnterStart: f, onLeaveStart: p, onAppearActive: m, onEnterActive: h, onLeaveActive: v, onAppearEnd: y, onEnterEnd: b, onLeaveEnd: x, onVisibleChanged: S }) {
	let [C, w] = g.useState(), [T, E] = F(ls), [D, O] = g.useState([null, null]), k = T(), A = (0, g.useRef)(!1), j = (0, g.useRef)(null);
	function M() {
		return n();
	}
	let N = (0, g.useRef)(!1);
	function P() {
		E(ls), O([null, null]);
	}
	let I = _((e) => {
		let t = T();
		if (t === "none") return;
		let n = M();
		if (e && !e.deadline && e.target !== n) return;
		let r = N.current, i;
		t === "appear" && r ? i = y?.(n, e) : t === "enter" && r ? i = b?.(n, e) : t === "leave" && r && (i = x?.(n, e)), r && i !== !1 && P();
	}), [L] = As(I), R = (e) => {
		switch (e) {
			case us: return {
				[ms]: c,
				[hs]: d,
				[gs]: m
			};
			case ds: return {
				[ms]: l,
				[hs]: f,
				[gs]: h
			};
			case fs: return {
				[ms]: u,
				[hs]: p,
				[gs]: v
			};
			default: return {};
		}
	}, z = g.useMemo(() => R(k), [k]), [ee, B] = Is(k, !e, (e) => {
		if (e === "prepare") {
			let e = z[ms];
			return e ? e(M()) : !1;
		}
		return e in z && O([z[e]?.(M(), null) || null, e]), e === "active" && k !== "none" && (L(M()), o > 0 && (clearTimeout(j.current), j.current = setTimeout(() => {
			I({ deadline: !0 });
		}, o))), e === "prepared" && P(), !0;
	});
	N.current = Fs(B);
	let V = (0, g.useRef)(null);
	js(() => {
		if (A.current && V.current === t) return;
		w(t);
		let n = A.current;
		A.current = !0;
		let o;
		!n && t && i && (o = us), n && t && r && (o = ds), (n && !t && a || !n && s && !t && a) && (o = fs);
		let c = R(o);
		o && (e || c.prepare) ? (E(o), ee()) : E(ls), V.current = t;
	}, [t]), (0, g.useEffect)(() => {
		(k === "appear" && !i || k === "enter" && !r || k === "leave" && !a) && E(ls);
	}, [
		i,
		r,
		a
	]), (0, g.useEffect)(() => () => {
		A.current = !1, clearTimeout(j.current);
	}, []);
	let H = g.useRef(!1);
	(0, g.useEffect)(() => {
		C && (H.current = !0), C !== void 0 && k === "none" && ((H.current || C) && S?.(C), H.current = !0);
	}, [C, k]);
	let te = D[0];
	z.prepare && B === "start" && (te = {
		transition: "none",
		...te
	});
	let ne = D[1];
	return [
		T,
		B,
		te,
		C ?? t,
		!A.current && k === "none" && e && i ? "NONE" : B === "start" || B === "active" ? ne === B : !0
	];
}
// node_modules/@rc-component/motion/es/CSSMotion.js
function Rs(e) {
	return e?.length < 2;
}
function zs(e) {
	let t = e;
	typeof e == "object" && ({transitionSupport: t} = e);
	function n(e, n) {
		return !!(e.motionName && t && n !== !1);
	}
	let r = /*#__PURE__*/ g.forwardRef((e, t) => {
		let { visible: r = !0, removeOnLeave: i = !0, forceRender: a, children: o, motionName: s, leavedClassName: c, eventProps: l } = e, { motion: u } = g.useContext(ss), d = n(e, u), f = (0, g.useRef)();
		function p() {
			return ge(f.current);
		}
		let [m, h, _, v, y] = Ls(d, r, p, e), b = m(), x = g.useRef(v);
		v && (x.current = !0);
		let S = g.useMemo(() => {
			let e = {};
			return Object.defineProperties(e, {
				nativeElement: {
					enumerable: !0,
					get: p
				},
				inMotion: {
					enumerable: !0,
					get: () => () => m() !== ls
				},
				enableMotion: {
					enumerable: !0,
					get: () => () => d
				}
			}), e;
		}, []);
		g.useImperativeHandle(t, () => S, []);
		let C = g.useRef(0);
		y && (C.current += 1);
		let w = g.useMemo(() => {
			if (y === "NONE") return null;
			let e, t = {
				...l,
				visible: r
			};
			if (!o) e = null;
			else if (b === "none") e = v ? o({ ...t }, f) : !i && x.current && c ? o({
				...t,
				className: c
			}, f) : a || !i && !c ? o({
				...t,
				style: { display: "none" }
			}, f) : null;
			else {
				let n;
				h === "prepare" ? n = "prepare" : Fs(h) ? n = "active" : h === "start" && (n = "start");
				let r = ks(s, `${b}-${n}`);
				e = o({
					...t,
					className: Z(ks(s, b), {
						[r]: r && n,
						[s]: typeof s == "string"
					}),
					style: _
				}, f);
			}
			return e;
		}, [C.current]);
		if (Rs(o) && ae(w)) {
			let e = oe(w);
			if (e !== f) return /*#__PURE__*/ g.cloneElement(w, { ref: ne(e, f) });
		}
		return w;
	});
	return r.displayName = "CSSMotion", r;
}
var Bs = zs(Es), Vs = "keep", Hs = "remove", Us = "removed";
function Ws(e) {
	let t;
	return t = e && typeof e == "object" && "key" in e ? e : { key: e }, {
		...t,
		key: String(t.key)
	};
}
function Gs(e = []) {
	return e.map(Ws);
}
function Ks(e = [], t = []) {
	let n = [], r = 0, i = t.length, a = Gs(e), o = Gs(t);
	a.forEach((e) => {
		let t = !1;
		for (let a = r; a < i; a += 1) {
			let i = o[a];
			if (i.key === e.key) {
				r < a && (n = n.concat(o.slice(r, a).map((e) => ({
					...e,
					status: "add"
				}))), r = a), n.push({
					...i,
					status: Vs
				}), r += 1, t = !0;
				break;
			}
		}
		t || n.push({
			...e,
			status: Hs
		});
	}), r < i && (n = n.concat(o.slice(r).map((e) => ({
		...e,
		status: "add"
	}))));
	let s = {};
	return n.forEach(({ key: e }) => {
		s[e] = (s[e] || 0) + 1;
	}), Object.keys(s).filter((e) => s[e] > 1).forEach((e) => {
		n = n.filter(({ key: t, status: n }) => t !== e || n !== "remove"), n.forEach((t) => {
			t.key === e && (t.status = Vs);
		});
	}), n;
}
// node_modules/@rc-component/motion/es/CSSMotionList.js
function qs() {
	return qs = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, qs.apply(this, arguments);
}
var Js = [
	"eventProps",
	"visible",
	"children",
	"motionName",
	"motionAppear",
	"motionEnter",
	"motionLeave",
	"motionLeaveImmediately",
	"motionDeadline",
	"removeOnLeave",
	"leavedClassName",
	"onAppearPrepare",
	"onAppearStart",
	"onAppearActive",
	"onAppearEnd",
	"onEnterStart",
	"onEnterActive",
	"onEnterEnd",
	"onLeaveStart",
	"onLeaveActive",
	"onLeaveEnd"
];
function Ys(e, t = Bs) {
	class n extends g.Component {
		static defaultProps = { component: "div" };
		state = { keyEntities: [] };
		static getDerivedStateFromProps({ keys: e }, { keyEntities: t }) {
			return { keyEntities: Ks(t, Gs(e)).filter((e) => {
				let n = t.find(({ key: t }) => e.key === t);
				return !(n && n.status === "removed" && e.status === "remove");
			}) };
		}
		removeKey = (e) => {
			this.setState((t) => ({ keyEntities: t.keyEntities.map((t) => t.key === e ? {
				...t,
				status: Us
			} : t) }), () => {
				let { keyEntities: e } = this.state;
				e.filter(({ status: e }) => e !== "removed").length === 0 && this.props.onAllRemoved && this.props.onAllRemoved();
			});
		};
		render() {
			let { keyEntities: e } = this.state, { component: n, children: r, onVisibleChanged: i, onAllRemoved: a, ...o } = this.props, s = n || g.Fragment, c = {};
			return Js.forEach((e) => {
				c[e] = o[e], delete o[e];
			}), delete o.keys, /*#__PURE__*/ g.createElement(s, o, e.map(({ status: e, ...n }, a) => {
				let o = e === "add" || e === "keep";
				return /*#__PURE__*/ g.createElement(t, qs({}, c, {
					key: n.key,
					visible: o,
					eventProps: n,
					onVisibleChanged: (e) => {
						i?.(e, { key: n.key }), e || this.removeKey(n.key);
					}
				}), Rs(r) ? (e) => r({
					...e,
					index: a
				}) : (e, t) => r({
					...e,
					index: a
				}, t));
			}));
		}
	}
	return n;
}
Ys(Es);
// node_modules/@rc-component/motion/es/index.js
var Xs = Bs, Zs = (e) => typeof e == "number" && !Number.isNaN(e), Qs = (e) => typeof e == "string", $s = (e) => typeof e == "object" && !!e, ec = (e) => typeof e == "function", tc = (e) => $s(e) && "propertyName" in e && Qs(e.propertyName), nc = (e, t) => {
	let n = { ...e };
	return Object.keys(t).forEach((e) => {
		t[e]._default ? n[e] || (n[e] = {}) : n[e] = nc(n[e], t[e]);
	}), n;
}, rc = (e = {}, ...t) => t.filter((e) => !!e).reduce((t, n) => (Object.keys(n).forEach((r) => {
	let i = e[r], a = n[r];
	if (i) {
		if ($s(a)) t[r] = rc(i, t[r], a);
		else {
			let { _default: e } = i;
			e && (t[r] = t[r] || {}, t[r][e] = Z(t[r][e], a));
		}
	} else t[r] = Z(t[r], a);
}), t), {}), ic = (e, ...t) => g.useMemo(() => rc.apply(void 0, [e].concat(t)), [e].concat(t)), ac = (...e) => e.filter((e) => !!e).reduce((e, t = {}) => (Object.keys(t).forEach((n) => {
	e[n] = {
		...e[n],
		...t[n]
	};
}), e), {}), oc = (...e) => g.useMemo(() => ac.apply(void 0, e), [].concat(e)), sc = (e, t = "root") => g.useMemo(() => e ? { [t]: e } : void 0, [e, t]), cc = (e, t) => ec(e) ? e(t) : e, lc = (e, t, n, r) => {
	let i = e.map((e) => e ? cc(e, n) : void 0), a = t.map((e) => e ? cc(e, n) : void 0), o = ic.apply(void 0, [r].concat(Et(i))), s = oc.apply(void 0, Et(a));
	return g.useMemo(() => r ? [nc(o, r), nc(s, r)] : [o, s], [
		o,
		s,
		r
	]);
}, uc = (e, t, n) => ({
	background: e,
	[`${n}-icon`]: { color: t }
}), dc = (e) => {
	let { componentCls: t, motionDurationSlow: n, marginXS: r, marginSM: i, fontSize: a, fontSizeLG: o, lineHeight: s, motionEaseInOutCirc: c, borderRadius: l, withDescriptionIconSize: u, colorText: d, colorTextHeading: f, withDescriptionPadding: p, defaultPadding: m, lineWidth: h, lineType: g, colorSuccessBorder: _, colorWarningBorder: v, colorErrorBorder: y, colorInfoBorder: b } = e;
	return { [t]: {
		...ro(e),
		position: "relative",
		display: "flex",
		alignItems: "center",
		padding: m,
		wordWrap: "break-word",
		borderRadius: l,
		borderWidth: nn(h),
		borderStyle: g,
		[`&${t}-success`]: { borderColor: _ },
		[`&${t}-info`]: { borderColor: b },
		[`&${t}-warning`]: { borderColor: v },
		[`&${t}-error`]: { borderColor: y },
		[`&${t}-filled`]: { borderColor: "transparent" },
		[`&${t}-rtl`]: { direction: "rtl" },
		[`${t}-section`]: {
			flex: 1,
			minWidth: 0
		},
		[`${t}-icon`]: {
			marginInlineEnd: r,
			lineHeight: 0
		},
		"&-description": {
			display: "none",
			fontSize: a,
			lineHeight: s
		},
		"&-title": { color: f },
		[`&${t}-motion-leave`]: {
			overflow: "hidden",
			opacity: 1,
			transition: [
				"max-height",
				"opacity",
				"padding-top",
				"padding-bottom",
				"margin-bottom"
			].map((e) => `${e} ${n} ${c}`).join(", ")
		},
		[`&${t}-motion-leave-active`]: {
			maxHeight: 0,
			marginBottom: "0 !important",
			paddingTop: 0,
			paddingBottom: 0,
			opacity: 0
		},
		[`&${t}-with-description`]: {
			alignItems: "flex-start",
			padding: p,
			[`${t}-icon`]: {
				marginInlineEnd: i,
				fontSize: u,
				lineHeight: 0
			},
			[`${t}-title`]: {
				display: "block",
				marginBottom: r,
				color: f,
				fontSize: o
			},
			[`${t}-description`]: {
				display: "block",
				color: d
			}
		},
		[`&${t}-banner`]: {
			marginBottom: 0,
			border: "0 !important",
			borderRadius: 0
		}
	} };
}, Q = (e) => {
	let { componentCls: t, colorSuccess: n, colorSuccessBg: r, colorWarning: i, colorWarningBg: a, colorError: o, colorErrorBg: s, colorInfo: c, colorInfoBg: l } = e;
	return { [t]: {
		"&-success": uc(r, n, t),
		"&-info": uc(l, c, t),
		"&-warning": uc(a, i, t),
		"&-error": {
			...uc(s, o, t),
			[`${t}-description > pre`]: {
				margin: 0,
				padding: 0
			}
		}
	} };
}, fc = (e) => {
	let { componentCls: t, iconCls: n, motionDurationMid: r, marginXS: i, fontSizeIcon: a, colorIcon: o, colorIconHover: s, colorTextDisabled: c } = e;
	return { [t]: {
		[`${t}-actions`]: { marginInlineStart: i },
		[`${t}-close-icon`]: {
			marginInlineStart: i,
			padding: 0,
			overflow: "hidden",
			fontSize: a,
			lineHeight: nn(a),
			backgroundColor: "transparent",
			border: "none",
			cursor: "pointer",
			...so(e),
			[`${n}-close`]: {
				color: o,
				transition: `color ${r}`,
				"&:hover": { color: s }
			},
			"&:disabled": {
				cursor: "not-allowed",
				color: c,
				[`${n}-close`]: {
					color: "inherit",
					pointerEvents: "none"
				}
			}
		}
	} };
}, pc = fo("Alert", (e) => [
	dc(e),
	Q(e),
	fc(e)
], (e) => ({
	borderRadius: e.borderRadiusLG,
	withDescriptionIconSize: e.fontSizeHeading3,
	defaultPadding: `${e.paddingContentVerticalSM}px 12px`,
	withDescriptionPadding: `${e.paddingMD}px ${e.paddingContentHorizontalLG}px`
})), mc = (e) => {
	let { icon: t, type: n, className: r, style: i, successIcon: a, infoIcon: o, warningIcon: s, errorIcon: c } = e, l = {
		success: a ?? /*#__PURE__*/ g.createElement(Jo, null),
		info: o ?? /*#__PURE__*/ g.createElement(os, null),
		error: c ?? /*#__PURE__*/ g.createElement(Zo, null),
		warning: s ?? /*#__PURE__*/ g.createElement(rs, null)
	};
	return /*#__PURE__*/ g.createElement("span", {
		className: r,
		style: i
	}, t ?? l[n]);
}, hc = (e) => {
	let { isClosable: t, disabled: n, prefixCls: r, closeIcon: i, handleClose: a, ariaProps: o, className: s, style: c } = e, l = i === !0 || i === void 0 ? /*#__PURE__*/ g.createElement(es, null) : i;
	return t ? /*#__PURE__*/ g.createElement("button", {
		type: "button",
		disabled: n,
		onClick: a,
		className: Z(`${r}-close-icon`, s),
		style: c,
		...o
	}, l) : null;
}, gc = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { description: n, prefixCls: r, message: i, title: a, banner: o, className: s, rootClassName: c, style: l, onMouseEnter: u, onMouseLeave: d, onClick: f, afterClose: p, showIcon: m, closable: h, closeText: _, closeIcon: v, action: y, id: b, styles: x, classNames: S, ...C } = e, w = a ?? i, [T, E] = g.useState(!1), D = g.useRef(null);
	g.useImperativeHandle(t, () => ({ nativeElement: D.current }));
	let { getPrefixCls: O, direction: k, variant: A, closable: j, closeIcon: M, className: N, style: P, classNames: F, styles: I, successIcon: L, infoIcon: R, warningIcon: z, errorIcon: ee } = Mt("alert"), B = O("alert", r), [V, H] = pc(B), { onClose: te, afterClose: re, disabled: U } = $s(h) ? h : {}, ie = (t) => {
		E(!0), (te ?? e.onClose)?.(t);
	}, ae = g.useMemo(() => e.type === void 0 ? o ? "warning" : "info" : e.type, [e.type, o]), oe = e.variant ?? A ?? "outlined", se = g.useMemo(() => $s(h) || _ ? !0 : typeof h == "boolean" ? h : v !== !1 && Ne(v) ? !0 : !!j, [
		_,
		v,
		h,
		j
	]), W = o && m === void 0 ? !0 : m, ce = {
		...e,
		prefixCls: B,
		variant: oe,
		type: ae,
		showIcon: W,
		closable: se
	}, le = sc(P), ue = sc(l), [G, de] = lc([F, S], [
		I,
		le,
		x,
		ue
	], { props: ce }), K = Z(B, `${B}-${ae}`, `${B}-${oe}`, {
		[`${B}-with-description`]: Pe(n),
		[`${B}-no-icon`]: !W,
		[`${B}-banner`]: !!o,
		[`${B}-rtl`]: k === "rtl"
	}, N, s, c, G.root, H, V), q = Be(C, {
		aria: !0,
		data: !0
	}), fe = g.useMemo(() => $s(h) && h.closeIcon ? h.closeIcon : _ || (v === void 0 ? $s(j) && j.closeIcon ? j.closeIcon : M : v), [
		v,
		h,
		j,
		_,
		M
	]), pe = g.useMemo(() => {
		let e = h ?? j;
		return $s(e) ? Be(e, {
			data: !0,
			aria: !0
		}) : {};
	}, [h, j]);
	return /*#__PURE__*/ g.createElement(Xs, {
		visible: !T,
		motionName: `${B}-motion`,
		motionAppear: !1,
		motionEnter: !1,
		onLeaveStart: (e) => ({ maxHeight: e.offsetHeight }),
		onLeaveEnd: re ?? p
	}, ({ className: t, style: r }, i) => /*#__PURE__*/ g.createElement("div", {
		id: b,
		ref: ne(D, i),
		"data-show": !T,
		className: Z(K, t),
		style: {
			...de.root,
			...r
		},
		onMouseEnter: u,
		onMouseLeave: d,
		onClick: f,
		role: "alert",
		...q
	}, W ? /*#__PURE__*/ g.createElement(mc, {
		className: Z(`${B}-icon`, G.icon),
		style: de.icon,
		icon: e.icon,
		type: ae,
		successIcon: L,
		infoIcon: R,
		warningIcon: z,
		errorIcon: ee
	}) : null, /*#__PURE__*/ g.createElement("div", {
		className: Z(`${B}-section`, G.section),
		style: de.section
	}, Pe(w) ? /*#__PURE__*/ g.createElement("div", {
		className: Z(`${B}-title`, G.title),
		style: de.title
	}, w) : null, Pe(n) ? /*#__PURE__*/ g.createElement("div", {
		className: Z(`${B}-description`, G.description),
		style: de.description
	}, n) : null), Pe(y) ? /*#__PURE__*/ g.createElement("div", {
		className: Z(`${B}-actions`, G.actions),
		style: de.actions
	}, y) : null, /*#__PURE__*/ g.createElement(hc, {
		className: G.close,
		style: de.close,
		isClosable: se,
		disabled: U,
		prefixCls: B,
		closeIcon: fe,
		handleClose: ie,
		ariaProps: pe
	})));
});
// node_modules/@babel/runtime/helpers/esm/callSuper.js
function _c(e, t, n) {
	return t = ui(t), fi(e, di() ? Reflect.construct(t, n || [], ui(e).constructor) : t.apply(e, n));
}
// node_modules/antd/es/alert/ErrorBoundary.js
var vc = /*#__PURE__*/ function(e) {
	function t() {
		var e;
		return ii(this, t), e = _c(this, t, arguments), e.state = {
			error: void 0,
			info: {}
		}, e;
	}
	return li(t, e), oi(t, [{
		key: "componentDidCatch",
		value: function(e, t) {
			this.setState({
				error: e,
				info: t
			});
		}
	}, {
		key: "render",
		value: function() {
			let { message: e, title: t, description: n, id: r, children: i } = this.props, { error: a, info: o } = this.state, s = t ?? e, c = o?.componentStack || null, l = Ne(s) ? s : a?.toString(), u = Ne(n) ? n : c;
			return a ? /*#__PURE__*/ g.createElement(gc, {
				id: r,
				type: "error",
				title: l,
				description: /*#__PURE__*/ g.createElement("pre", { style: {
					fontSize: "0.9em",
					overflowX: "auto"
				} }, u)
			}) : i;
		}
	}]);
}(g.PureComponent), yc = gc;
yc.ErrorBoundary = vc;
// node_modules/antd/es/config-provider/hooks/useCSSVarCls.js
var bc = (e) => `${e}-css-var`, xc = /*#__PURE__*/ (0, g.createContext)(void 0), Sc = {
	items_per_page: "/ page",
	jump_to: "Go to",
	jump_to_confirm: "confirm",
	page: "Page",
	prev_page: "Previous Page",
	next_page: "Next Page",
	prev_5: "Previous 5 Pages",
	next_5: "Next 5 Pages",
	prev_3: "Previous 3 Pages",
	next_3: "Next 3 Pages",
	page_size: "Page Size"
}, Cc = {
	yearFormat: "YYYY",
	dayFormat: "D",
	cellMeridiemFormat: "A",
	monthBeforeYear: !0,
	locale: "en_US",
	today: "Today",
	now: "Now",
	backToToday: "Back to today",
	ok: "OK",
	clear: "Clear",
	week: "Week",
	month: "Month",
	year: "Year",
	timeSelect: "select time",
	dateSelect: "select date",
	weekSelect: "Choose a week",
	monthSelect: "Choose a month",
	yearSelect: "Choose a year",
	decadeSelect: "Choose a decade",
	previousMonth: "Previous month",
	nextMonth: "Next month",
	previousYear: "Last year",
	nextYear: "Next year",
	previousDecade: "Last decade",
	nextDecade: "Next decade",
	previousCentury: "Last century",
	nextCentury: "Next century"
}, wc = {
	placeholder: "Select time",
	rangePlaceholder: ["Start time", "End time"]
}, Tc = {
	lang: {
		placeholder: "Select date",
		yearPlaceholder: "Select year",
		quarterPlaceholder: "Select quarter",
		monthPlaceholder: "Select month",
		weekPlaceholder: "Select week",
		rangePlaceholder: ["Start date", "End date"],
		rangeYearPlaceholder: ["Start year", "End year"],
		rangeQuarterPlaceholder: ["Start quarter", "End quarter"],
		rangeMonthPlaceholder: ["Start month", "End month"],
		rangeWeekPlaceholder: ["Start week", "End week"],
		...Cc
	},
	timePickerLocale: { ...wc }
}, Ec = Tc, Dc = "${label} is not a valid ${type}", Oc = {
	locale: "en",
	Pagination: Sc,
	DatePicker: Tc,
	TimePicker: wc,
	Calendar: Ec,
	global: {
		placeholder: "Please select",
		close: "Close",
		sortable: "sortable",
		show: "Show",
		hide: "Hide"
	},
	Table: {
		filterTitle: "Filter menu",
		filterConfirm: "OK",
		filterReset: "Reset",
		filterEmptyText: "No filters",
		filterCheckAll: "Select all items",
		filterSearchPlaceholder: "Search in filters",
		emptyText: "No data",
		selectAll: "Select current page",
		selectInvert: "Invert current page",
		selectNone: "Clear all data",
		selectionAll: "Select all data",
		sortTitle: "Sort",
		expand: "Expand row",
		collapse: "Collapse row",
		triggerDesc: "Click to sort descending",
		triggerAsc: "Click to sort ascending",
		cancelSort: "Click to cancel sorting"
	},
	Tour: {
		Next: "Next",
		Previous: "Previous",
		Finish: "Finish"
	},
	Modal: {
		okText: "OK",
		cancelText: "Cancel",
		justOkText: "OK"
	},
	Popconfirm: {
		okText: "OK",
		cancelText: "Cancel"
	},
	Transfer: {
		titles: ["", ""],
		searchPlaceholder: "Search here",
		itemUnit: "item",
		itemsUnit: "items",
		remove: "Remove",
		selectCurrent: "Select current page",
		removeCurrent: "Remove current page",
		selectAll: "Select all data",
		deselectAll: "Deselect all data",
		removeAll: "Remove all data",
		selectInvert: "Invert current page"
	},
	Upload: {
		uploading: "Uploading...",
		removeFile: "Remove file",
		uploadError: "Upload error",
		previewFile: "Preview file",
		downloadFile: "Download file"
	},
	Empty: { description: "No data" },
	Icon: { icon: "icon" },
	Text: {
		edit: "Edit",
		copy: "Copy",
		copied: "Copied",
		expand: "Expand",
		collapse: "Collapse"
	},
	Carousel: {
		prevSlide: "Previous slide",
		nextSlide: "Next slide"
	},
	Form: {
		optional: "(optional)",
		defaultValidateMessages: {
			default: "Field validation error for ${label}",
			required: "Please enter ${label}",
			enum: "${label} must be one of [${enum}]",
			whitespace: "${label} cannot be a blank character",
			date: {
				format: "${label} date format is invalid",
				parse: "${label} cannot be converted to a date",
				invalid: "${label} is an invalid date"
			},
			types: {
				string: Dc,
				method: Dc,
				array: Dc,
				object: Dc,
				number: Dc,
				date: Dc,
				boolean: Dc,
				integer: Dc,
				float: Dc,
				regexp: Dc,
				email: Dc,
				url: Dc,
				hex: Dc
			},
			string: {
				len: "${label} must be ${len} characters",
				min: "${label} must be at least ${min} characters",
				max: "${label} must be up to ${max} characters",
				range: "${label} must be between ${min}-${max} characters"
			},
			number: {
				len: "${label} must be equal to ${len}",
				min: "${label} must be minimum ${min}",
				max: "${label} must be maximum ${max}",
				range: "${label} must be between ${min}-${max}"
			},
			array: {
				len: "Must be ${len} ${label}",
				min: "At least ${min} ${label}",
				max: "At most ${max} ${label}",
				range: "The amount of ${label} must be between ${min}-${max}"
			},
			pattern: { mismatch: "${label} does not match the pattern ${pattern}" }
		}
	},
	QRCode: {
		expired: "QR code expired",
		refresh: "Refresh",
		scanned: "Scanned"
	},
	ColorPicker: {
		presetEmpty: "Empty",
		transparent: "Transparent",
		singleColor: "Single",
		gradientColor: "Gradient"
	}
};
({ ...Oc.Modal });
var kc = [], Ac = () => kc.reduce((e, t) => ({
	...e,
	...t
}), Oc.Modal);
function jc(e) {
	if (e) {
		let t = { ...e };
		return kc.push(t), Ac(), () => {
			kc = kc.filter((e) => e !== t), Ac();
		};
	}
	({ ...Oc.Modal });
}
// node_modules/antd/es/locale/context.js
var Mc = /*#__PURE__*/ (0, g.createContext)(void 0), Nc = (e, t) => {
	let n = g.useContext(Mc);
	return [g.useMemo(() => {
		let r = t || Oc[e], i = n?.[e] ?? {};
		return {
			...ec(r) ? r() : r,
			...i || {}
		};
	}, [
		e,
		t,
		n
	]), g.useMemo(() => {
		let e = n?.locale;
		return n?.exist && !e ? Oc.locale : e;
	}, [n])];
}, Pc = "internalMark", Fc = (e) => {
	let { locale: t = {}, children: n, _ANT_MARK__: r } = e;
	g.useEffect(() => jc(t?.Modal), [t]);
	let i = g.useMemo(() => ({
		...t,
		exist: !0
	}), [t]);
	return /*#__PURE__*/ g.createElement(Mc.Provider, { value: i }, n);
}, Ic = /*#__PURE__*/ g.createContext(null), Lc = !1;
function Rc(e) {
	return typeof e == "boolean" && (Lc = e), Lc;
}
// node_modules/@rc-component/portal/es/useDom.js
var zc = [];
function Bc(e, t) {
	let [n] = g.useState(() => v() ? document.createElement("div") : null), r = g.useRef(!1), i = g.useContext(Ic), [a, o] = g.useState(zc), s = i || (r.current ? void 0 : (e) => {
		o((t) => [e, ...t]);
	});
	function c() {
		n.parentElement || document.body.appendChild(n), r.current = !0;
	}
	function l() {
		n.parentElement?.removeChild(n), r.current = !1;
	}
	return b(() => (e ? i ? i(c) : c() : l(), l), [e]), b(() => {
		a.length && (a.forEach((e) => e()), o(zc));
	}, [a]), [n, s];
}
// node_modules/@rc-component/portal/es/util.js
function Vc() {
	return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) && window.innerWidth > document.body.offsetWidth;
}
// node_modules/@rc-component/portal/es/useScrollLocker.js
var Hc = `rc-util-locker-${Date.now()}`, Uc = 0;
function Wc(e) {
	let t = !!e, [n] = g.useState(() => (Uc += 1, `${Hc}_${Uc}`));
	b(() => {
		if (t) {
			let e = Se(document.body).width;
			Y(`
html body {
  overflow-y: hidden;
  ${Vc() ? `width: calc(100% - ${e}px);` : ""}
}`, n);
		} else me(n);
		return () => {
			me(n);
		};
	}, [t, n]);
}
// node_modules/@rc-component/portal/es/useEscKeyDown.js
var Gc = [], Kc = 200, qc = 0, Jc = (e) => {
	if (e.key === "Escape" && !e.isComposing) {
		if (Date.now() - qc < Kc) return;
		let t = Gc.length;
		for (let n = t - 1; n >= 0; --n) Gc[n].onEsc({
			top: n === t - 1,
			event: e
		});
	}
}, Yc = () => {
	qc = Date.now();
};
function Xc() {
	window.addEventListener("keydown", Jc), window.addEventListener("compositionend", Yc);
}
function Zc() {
	Gc.length === 0 && (window.removeEventListener("keydown", Jc), window.removeEventListener("compositionend", Yc));
}
function Qc(e, t) {
	let n = N(), r = _(t), i = () => {
		Gc.find((e) => e.id === n) || Gc.push({
			id: n,
			onEsc: r
		});
	}, a = () => {
		Gc = Gc.filter((e) => e.id !== n);
	};
	(0, g.useMemo)(() => {
		e ? i() : e || a();
	}, [e]), (0, g.useEffect)(() => {
		if (e) return i(), Xc(), () => {
			a(), Zc();
		};
	}, [e]);
}
// node_modules/@rc-component/portal/es/Portal.js
var $c = (e) => e === !1 ? !1 : !v() || !e ? null : typeof e == "string" ? document.querySelector(e) : typeof e == "function" ? e() : e, el = /* @__PURE__ */ g.forwardRef((e, t) => {
	let { open: n, autoLock: r, getContainer: i, debug: a, autoDestroy: o = !0, children: s, onEsc: c } = e, [l, u] = g.useState(n), d = l || n;
	g.useEffect(() => {
		(o || n) && u(n);
	}, [n, o]);
	let [f, p] = g.useState(() => $c(i));
	g.useEffect(() => {
		let e = $c(i);
		p(() => e ?? null);
	});
	let [m, h] = Bc(d && !f, a), _ = f ?? m;
	Wc(r && n && v() && (_ === m || _ === document.body)), Qc(n, c);
	let y = null;
	s && U(s) && t && (y = oe(s));
	let b = re(y, t);
	if (!d || !v() || f === void 0) return null;
	let x = _ === !1 || Rc(), S = s;
	return t && (S = /*#__PURE__*/ g.cloneElement(s, { ref: b })), /*#__PURE__*/ g.createElement(Ic.Provider, { value: h }, x ? S : /*#__PURE__*/ (0, et.createPortal)(S, _));
});
// node_modules/@rc-component/trigger/es/Popup/Arrow.js
function tl(e) {
	let { prefixCls: t, align: n, arrow: r, arrowPos: i } = e, { className: a, content: o, style: s } = r || {}, { x: c = 0, y: l = 0 } = i, u = g.useRef(null);
	if (!n || !n.points) return null;
	let d = { position: "absolute" };
	if (n.autoArrow !== !1) {
		let e = n.points[0], t = n.points[1], r = e[0], i = e[1], a = t[0], o = t[1];
		r === a || !["t", "b"].includes(r) ? d.top = l : r === "t" ? d.top = 0 : d.bottom = 0, i === o || !["l", "r"].includes(i) ? d.left = c : i === "l" ? d.left = 0 : d.right = 0;
	}
	return /*#__PURE__*/ g.createElement("div", {
		ref: u,
		className: Z(`${t}-arrow`, a),
		style: {
			...d,
			...s
		}
	}, o);
}
// node_modules/@rc-component/trigger/es/Popup/Mask.js
function nl() {
	return nl = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, nl.apply(this, arguments);
}
function rl(e) {
	let { prefixCls: t, open: n, zIndex: r, mask: i, motion: a, mobile: o } = e;
	return i ? /*#__PURE__*/ g.createElement(Xs, nl({}, a, {
		motionAppear: !0,
		visible: n,
		removeOnLeave: !0
	}), ({ className: e }) => /*#__PURE__*/ g.createElement("div", {
		style: { zIndex: r },
		className: Z(`${t}-mask`, o && `${t}-mobile-mask`, e)
	})) : null;
}
// node_modules/@rc-component/trigger/es/Popup/PopupContent.js
var il = /*#__PURE__*/ g.memo(({ children: e }) => e, (e, t) => t.cache);
// node_modules/@rc-component/trigger/es/hooks/useOffsetStyle.js
function al(e, t, n, r, i, a, o, s) {
	let c = "auto", l = e ? {} : {
		left: "-1000vw",
		top: "-1000vh",
		right: c,
		bottom: c
	};
	if (!e && (t || !n)) {
		let { points: e } = r, t = r.dynamicInset || r._experimental?.dynamicInset, n = t && e[0][1] === "r", u = t && e[0][0] === "b";
		n ? (l.right = i, l.left = c) : (l.left = o, l.right = c), u ? (l.bottom = a, l.top = c) : (l.top = s, l.bottom = c);
	}
	return l;
}
// node_modules/@rc-component/trigger/es/Popup/index.js
function ol() {
	return ol = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, ol.apply(this, arguments);
}
var sl = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { onEsc: n, popup: r, className: i, prefixCls: a, style: o, target: s, onVisibleChanged: c, open: l, keepDom: u, fresh: d, onClick: f, mask: p, arrow: m, arrowPos: h, align: v, motion: y, maskMotion: x, mobile: S, forceRender: C, getPopupContainer: w, autoDestroy: T, portal: E, children: D, zIndex: O, onMouseEnter: k, onMouseLeave: A, onPointerEnter: j, onPointerDownCapture: M, ready: N, offsetX: P, offsetY: F, offsetR: I, offsetB: L, onAlign: R, onPrepare: z, onResize: ee, stretch: B, targetWidth: V, targetHeight: H } = e, te = typeof r == "function" ? r() : r, re = l || u, U = !!S, [ie, ae, oe] = g.useMemo(() => S ? [
		S.mask,
		S.maskMotion,
		S.motion
	] : [
		p,
		x,
		y
	], [
		S,
		p,
		x,
		y
	]), se = w?.length > 0, [W, ce] = g.useState(!w || !se);
	b(() => {
		!W && se && s && ce(!0);
	}, [
		W,
		se,
		s
	]);
	let le = _((e, t) => {
		ee?.(e, t), R();
	}), ue = al(U, N, l, v, I, L, P, F);
	if (!W) return null;
	let G = {};
	return B && (B.includes("height") && H ? G.height = H : B.includes("minHeight") && H && (G.minHeight = H), B.includes("width") && V ? G.width = V : B.includes("minWidth") && V && (G.minWidth = V)), l || (G.pointerEvents = "none"), /*#__PURE__*/ g.createElement(E, {
		open: C || re,
		getContainer: w && (() => w(s)),
		autoDestroy: T,
		onEsc: n
	}, /*#__PURE__*/ g.createElement(rl, {
		prefixCls: a,
		open: l,
		zIndex: O,
		mask: ie,
		motion: ae,
		mobile: U
	}), /*#__PURE__*/ g.createElement(yt, {
		onResize: le,
		disabled: !l
	}, (e) => /*#__PURE__*/ g.createElement(Xs, ol({
		motionAppear: !0,
		motionEnter: !0,
		motionLeave: !0,
		removeOnLeave: !1,
		forceRender: C,
		leavedClassName: `${a}-hidden`
	}, oe, {
		onAppearPrepare: z,
		onEnterPrepare: z,
		visible: l,
		onVisibleChanged: (e) => {
			y?.onVisibleChanged?.(e), c(e);
		}
	}), ({ className: n, style: r }, s) => {
		let c = Z(a, n, i, { [`${a}-mobile`]: U });
		return /*#__PURE__*/ g.createElement("div", {
			ref: ne(e, t, s),
			className: c,
			style: {
				"--arrow-x": `${h.x || 0}px`,
				"--arrow-y": `${h.y || 0}px`,
				...ue,
				...G,
				...r,
				boxSizing: "border-box",
				zIndex: O,
				...o
			},
			onMouseEnter: k,
			onMouseLeave: A,
			onPointerEnter: j,
			onClick: f,
			onPointerDownCapture: M
		}, m && /*#__PURE__*/ g.createElement(tl, {
			prefixCls: a,
			arrow: m,
			arrowPos: h,
			align: v
		}), /*#__PURE__*/ g.createElement(il, { cache: !l && !d }, te));
	})), D);
}), cl = /*#__PURE__*/ g.createContext(null), ll = /*#__PURE__*/ g.createContext(null);
// node_modules/@rc-component/trigger/es/hooks/useAction.js
function ul(e) {
	return e ? Array.isArray(e) ? e : [e] : [];
}
function dl(e, t, n) {
	return g.useMemo(() => {
		let r = ul(t ?? e), i = ul(n ?? e), a = new Set(r), o = new Set(i);
		return a.has("hover") && !a.has("click") && a.add("touch"), o.has("hover") && !o.has("click") && o.add("touch"), [a, o];
	}, [
		e,
		t,
		n
	]);
}
// node_modules/@rc-component/trigger/es/util.js
function fl(e = [], t = [], n) {
	let r = (e, t) => e[t] || "";
	return n ? r(e, 0) === r(t, 0) : r(e, 0) === r(t, 0) && r(e, 1) === r(t, 1);
}
function pl(e, t, n, r) {
	let { points: i } = n, a = Object.keys(e);
	for (let n = 0; n < a.length; n += 1) {
		let o = a[n];
		if (fl(e[o]?.points, i, r)) return `${t}-placement-${o}`;
	}
	return "";
}
function ml(e) {
	return e.ownerDocument.defaultView;
}
function hl(e) {
	let t = [], n = e?.parentElement, r = [
		"hidden",
		"scroll",
		"clip",
		"auto"
	];
	for (; n;) {
		let { overflowX: e, overflowY: i, overflow: a } = ml(n).getComputedStyle(n);
		[
			e,
			i,
			a
		].some((e) => r.includes(e)) && t.push(n), n = n.parentElement;
	}
	return t;
}
function gl(e, t = 1) {
	return Number.isNaN(e) ? t : e;
}
function _l(e) {
	return gl(parseFloat(e), 0);
}
function vl(e, t) {
	let n = { ...e };
	return (t || []).forEach((e) => {
		if (e instanceof HTMLBodyElement || e instanceof HTMLHtmlElement) return;
		let { overflow: t, overflowClipMargin: r, borderTopWidth: i, borderBottomWidth: a, borderLeftWidth: o, borderRightWidth: s } = ml(e).getComputedStyle(e), c = e.getBoundingClientRect(), { offsetHeight: l, clientHeight: u, offsetWidth: d, clientWidth: f } = e, p = _l(i), m = _l(a), h = _l(o), g = _l(s), _ = gl(Math.round(c.width / d * 1e3) / 1e3), v = gl(Math.round(c.height / l * 1e3) / 1e3), y = (d - f - h - g) * _, b = (l - u - p - m) * v, x = p * v, S = m * v, C = h * _, w = g * _, T = 0, E = 0;
		if (t === "clip") {
			let e = _l(r);
			T = e * _, E = e * v;
		}
		let D = c.x + C - T, O = c.y + x - E, k = D + c.width + 2 * T - C - w - y, A = O + c.height + 2 * E - x - S - b;
		n.left = Math.max(n.left, D), n.top = Math.max(n.top, O), n.right = Math.min(n.right, k), n.bottom = Math.min(n.bottom, A);
	}), n;
}
// node_modules/@rc-component/trigger/es/hooks/useAlign.js
function yl(e, t = 0) {
	let n = `${t}`, r = n.match(/^(.*)\%$/);
	return r ? e * (parseFloat(r[1]) / 100) : parseFloat(n);
}
function bl(e, t) {
	let [n, r] = t || [];
	return [yl(e.width, n), yl(e.height, r)];
}
function xl(e = "") {
	return [e[0], e[1]];
}
function Sl(e, t) {
	let n = t[0], r = t[1], i, a;
	return a = n === "t" ? e.y : n === "b" ? e.y + e.height : e.y + e.height / 2, i = r === "l" ? e.x : r === "r" ? e.x + e.width : e.x + e.width / 2, {
		x: i,
		y: a
	};
}
function Cl(e, t) {
	let n = {
		t: "b",
		b: "t",
		l: "r",
		r: "l"
	}, r = [...e];
	return r[t] = n[e[t]] || "c", r;
}
function wl(e) {
	return e.join("");
}
function Tl(e, t, n, r, i, a, o, s) {
	let [c, l] = g.useState({
		ready: !1,
		offsetX: 0,
		offsetY: 0,
		offsetR: 0,
		offsetB: 0,
		arrowX: 0,
		arrowY: 0,
		scaleX: 1,
		scaleY: 1,
		align: i[r] || {}
	}), u = g.useRef(0), d = g.useMemo(() => !t || s ? [] : hl(t), [t]), f = g.useRef({});
	e || (f.current = {});
	let p = _(() => {
		if (t && n && e && !s) {
			let e = t, s = e.ownerDocument, c = ml(e), { position: u } = c.getComputedStyle(e), p = e.style.left, m = e.style.top, h = e.style.right, g = e.style.bottom, _ = e.style.overflow, v = e.style.overflowX, y = e.style.overflowY, b = {
				...i[r],
				...a
			}, x = s.createElement("div");
			e.parentElement?.appendChild(x), x.style.left = `${e.offsetLeft}px`, x.style.top = `${e.offsetTop}px`, x.style.position = u, x.style.height = `${e.offsetHeight}px`, x.style.width = `${e.offsetWidth}px`, e.style.left = "0", e.style.top = "0", e.style.right = "auto", e.style.bottom = "auto", e.style.overflow = "hidden";
			let S;
			if (Array.isArray(n)) S = {
				x: n[0],
				y: n[1],
				width: 0,
				height: 0
			};
			else {
				let e = n.getBoundingClientRect();
				e.x = e.x ?? e.left, e.y = e.y ?? e.top, S = {
					x: e.x,
					y: e.y,
					width: e.width,
					height: e.height
				};
			}
			let C = e.getBoundingClientRect(), { height: w, width: T } = c.getComputedStyle(e);
			C.x = C.x ?? C.left, C.y = C.y ?? C.top;
			let { clientWidth: E, clientHeight: D, scrollWidth: O, scrollHeight: k, scrollTop: A, scrollLeft: j } = s.documentElement, M = C.height, N = C.width, P = S.height, F = S.width, I = {
				left: 0,
				top: 0,
				right: E,
				bottom: D
			}, L = {
				left: -j,
				top: -A,
				right: O - j,
				bottom: k - A
			}, { htmlRegion: R } = b, z = "visible", ee = "visibleFirst";
			R !== "scroll" && R !== ee && (R = z);
			let B = R === ee, V = vl(L, d), H = vl(I, d), te = R === z ? H : V, ne = B ? H : te;
			e.style.left = "auto", e.style.top = "auto", e.style.right = "0", e.style.bottom = "0";
			let re = e.getBoundingClientRect();
			e.style.left = p, e.style.top = m, e.style.right = h, e.style.bottom = g, e.style.overflow = _, e.style.overflowX = v, e.style.overflowY = y, e.parentElement?.removeChild(x);
			let U = gl(Math.round(N / parseFloat(T) * 1e3) / 1e3), ie = gl(Math.round(M / parseFloat(w) * 1e3) / 1e3);
			if (U === 0 || ie === 0 || he(n) && !_e(n)) return;
			let { offset: ae, targetOffset: oe } = b, [se, W] = bl(C, ae), [ce, le] = bl(S, oe);
			S.x -= ce, S.y -= le;
			let [ue, G] = b.points || [], de = xl(G), K = xl(ue), q = Sl(S, de), fe = Sl(C, K), pe = { ...b }, me = [K, de], J = q.x - fe.x + se, Y = q.y - fe.y + W;
			function ge(e, t, n = te) {
				let r = C.x + e, i = C.y + t, a = r + N, o = i + M, s = Math.max(r, n.left), c = Math.max(i, n.top), l = Math.min(a, n.right), u = Math.min(o, n.bottom);
				return Math.max(0, (l - s) * (u - c));
			}
			let ve = ge(J, Y), ye = ge(J, Y, H), be = Sl(S, ["t", "l"]), X = Sl(C, ["t", "l"]), xe = Sl(S, ["b", "r"]), Se = Sl(C, ["b", "r"]), { adjustX: Ce, adjustY: we, shiftX: Te, shiftY: Ee } = b.overflow || {}, De = (e) => typeof e == "boolean" ? e : e >= 0, Oe, ke, Ae, je;
			function Me() {
				Oe = C.y + Y, ke = Oe + M, Ae = C.x + J, je = Ae + N;
			}
			Me();
			let Ne = De(we), Pe = K[0] === de[0];
			if (Ne && K[0] === "t" && (ke > ne.bottom || f.current.bt)) {
				let e = Y;
				Pe ? e -= M - P : e = be.y - Se.y - W;
				let t = ge(J, e), n = ge(J, e, H);
				t > ve || t === ve && (!B || n >= ye) ? (f.current.bt = !0, Y = e, W = -W, me = [Cl(me[0], 0), Cl(me[1], 0)]) : f.current.bt = !1;
			}
			if (Ne && K[0] === "b" && (Oe < ne.top || f.current.tb)) {
				let e = Y;
				Pe ? e += M - P : e = xe.y - X.y - W;
				let t = ge(J, e), n = ge(J, e, H);
				t > ve || t === ve && (!B || n >= ye) ? (f.current.tb = !0, Y = e, W = -W, me = [Cl(me[0], 0), Cl(me[1], 0)]) : f.current.tb = !1;
			}
			let Fe = De(Ce), Ie = K[1] === de[1];
			if (Fe && K[1] === "l" && (je > ne.right || f.current.rl)) {
				let e = J;
				Ie ? e -= N - F : e = be.x - Se.x - se;
				let t = ge(e, Y), n = ge(e, Y, H);
				t > ve || t === ve && (!B || n >= ye) ? (f.current.rl = !0, J = e, se = -se, me = [Cl(me[0], 1), Cl(me[1], 1)]) : f.current.rl = !1;
			}
			if (Fe && K[1] === "r" && (Ae < ne.left || f.current.lr)) {
				let e = J;
				Ie ? e += N - F : e = xe.x - X.x - se;
				let t = ge(e, Y), n = ge(e, Y, H);
				t > ve || t === ve && (!B || n >= ye) ? (f.current.lr = !0, J = e, se = -se, me = [Cl(me[0], 1), Cl(me[1], 1)]) : f.current.lr = !1;
			}
			pe.points = [wl(me[0]), wl(me[1])], Me();
			let Le = Te === !0 ? 0 : Te;
			typeof Le == "number" && (Ae < H.left && (J -= Ae - H.left - se, S.x + F < H.left + Le && (J += S.x - H.left + F - Le)), je > H.right && (J -= je - H.right - se, S.x > H.right - Le && (J += S.x - H.right + Le)));
			let Re = Ee === !0 ? 0 : Ee;
			typeof Re == "number" && (Oe < H.top && (Y -= Oe - H.top - W, S.y + P < H.top + Re && (Y += S.y - H.top + P - Re)), ke > H.bottom && (Y -= ke - H.bottom - W, S.y > H.bottom - Re && (Y += S.y - H.bottom + Re)));
			let ze = C.x + J, Be = ze + N, Ve = C.y + Y, He = Ve + M, Ue = S.x, We = Ue + F, Ge = S.y, Ke = Ge + P, qe = (Math.max(ze, Ue) + Math.min(Be, We)) / 2 - ze, Je = (Math.max(Ve, Ge) + Math.min(He, Ke)) / 2 - Ve;
			o?.(t, pe);
			let Ye = re.right - C.x - (J + C.width), Xe = re.bottom - C.y - (Y + C.height);
			U === 1 && (J = Math.floor(J), Ye = Math.floor(Ye)), ie === 1 && (Y = Math.floor(Y), Xe = Math.floor(Xe));
			let Ze = {
				ready: !0,
				offsetX: J / U,
				offsetY: Y / ie,
				offsetR: Ye / U,
				offsetB: Xe / ie,
				arrowX: qe / U,
				arrowY: Je / ie,
				scaleX: U,
				scaleY: ie,
				align: pe
			};
			l(Ze);
		}
	}), m = () => {
		u.current += 1;
		let e = u.current;
		Promise.resolve().then(() => {
			u.current === e && p();
		});
	}, h = () => {
		l((e) => ({
			...e,
			ready: !1
		}));
	};
	return b(h, [r]), b(() => {
		e || h();
	}, [e]), [
		c.ready,
		c.offsetX,
		c.offsetY,
		c.offsetR,
		c.offsetB,
		c.arrowX,
		c.arrowY,
		c.scaleX,
		c.scaleY,
		c.align,
		m
	];
}
// node_modules/@rc-component/trigger/es/hooks/useDelay.js
function El() {
	let e = g.useRef(null), t = () => {
		e.current &&= (clearTimeout(e.current), null);
	};
	return g.useEffect(() => () => {
		t();
	}, []), (n, r) => {
		t(), r === 0 ? n() : e.current = setTimeout(() => {
			n();
		}, r * 1e3);
	};
}
// node_modules/@rc-component/trigger/es/hooks/useWatch.js
function Dl(e, t, n, r, i) {
	b(() => {
		if (e && t && n) {
			let e = t, a = n, o = hl(e), s = hl(a), c = ml(a), l = /* @__PURE__ */ new Set([
				c,
				...o,
				...s
			]);
			function u() {
				r(), i();
			}
			return l.forEach((e) => {
				e.addEventListener("scroll", u, { passive: !0 });
			}), c.addEventListener("resize", u, { passive: !0 }), r(), () => {
				l.forEach((e) => {
					e.removeEventListener("scroll", u), c.removeEventListener("resize", u);
				});
			};
		}
	}, [
		e,
		t,
		n
	]);
}
// node_modules/@rc-component/trigger/es/hooks/useWinClick.js
function Ol(e, t, n, r, i, a, o, s) {
	let c = g.useRef(e);
	c.current = e;
	let l = g.useRef(!1);
	g.useEffect(() => {
		if (t && r && (!i || a)) {
			let e = () => {
				l.current = !1;
			}, t = (e) => {
				c.current && !o(e.composedPath?.()?.[0] || e.target) && !l.current && s(!1);
			}, i = ml(r);
			i.addEventListener("pointerdown", e, !0), i.addEventListener("mousedown", t, !0), i.addEventListener("contextmenu", t, !0);
			let a = be(n);
			return a && (a.addEventListener("mousedown", t, !0), a.addEventListener("contextmenu", t, !0)), () => {
				i.removeEventListener("pointerdown", e, !0), i.removeEventListener("mousedown", t, !0), i.removeEventListener("contextmenu", t, !0), a && (a.removeEventListener("mousedown", t, !0), a.removeEventListener("contextmenu", t, !0));
			};
		}
	}, [
		t,
		n,
		r,
		i,
		a
	]);
	function u() {
		l.current = !0;
	}
	return u;
}
// node_modules/@rc-component/trigger/es/UniqueProvider/useTargetState.js
function kl() {
	let [e, t] = g.useState(null), [n, r] = g.useState(!1), [i, a] = g.useState(!1), o = g.useRef(null);
	return [
		_((e) => {
			e === !1 ? (o.current = null, r(!1)) : i && n ? o.current = e : (r(!0), t(e), o.current = null, n || a(!0));
		}),
		n,
		e,
		_((e) => {
			e ? (a(!1), o.current &&= (t(o.current), null)) : (a(!1), o.current = null);
		})
	];
}
// node_modules/@rc-component/trigger/es/UniqueProvider/UniqueContainer.js
function Al() {
	return Al = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Al.apply(this, arguments);
}
var jl = (e) => {
	let { prefixCls: t, isMobile: n, ready: r, open: i, align: a, offsetR: o, offsetB: s, offsetX: c, offsetY: l, arrowPos: u, popupSize: d, motion: f, uniqueContainerClassName: p, uniqueContainerStyle: m } = e, h = `${t}-unique-container`, [_, v] = g.useState(!1), y = al(n, r, i, a, o, s, c, l), b = g.useRef(y);
	r && (b.current = y);
	let x = {};
	return d && (x.width = d.width, x.height = d.height), /*#__PURE__*/ g.createElement(Xs, Al({
		motionAppear: !0,
		motionEnter: !0,
		motionLeave: !0,
		removeOnLeave: !1,
		leavedClassName: `${h}-hidden`
	}, f, {
		visible: i,
		onVisibleChanged: (e) => {
			v(e);
		}
	}), ({ className: e, style: t }) => {
		let n = Z(h, e, p, { [`${h}-visible`]: _ });
		return /*#__PURE__*/ g.createElement("div", {
			className: n,
			style: {
				"--arrow-x": `${u?.x || 0}px`,
				"--arrow-y": `${u?.y || 0}px`,
				...b.current,
				...x,
				...t,
				...m
			}
		});
	});
}, Ml = ({ children: e, postTriggerProps: t }) => {
	let [n, r, i, a] = kl(), o = g.useMemo(() => !i || !t ? i : t(i), [i, t]), [s, c] = g.useState(null), [l, u] = g.useState(null), d = g.useRef(null), f = _((e) => {
		d.current = e, he(e) && s !== e && c(e);
	}), p = g.useRef(null), m = El(), h = _((e, t) => {
		p.current = t, m(() => {
			n(e);
		}, e.delay);
	}), v = (e) => {
		m(() => {
			p.current?.() || n(!1);
		}, e);
	}, y = _((e) => {
		a(e);
	}), [b, x, S, C, w, T, E, , , D, O] = Tl(r, s, o?.target, o?.popupPlacement, o?.builtinPlacements || {}, o?.popupAlign, void 0, !1), k = g.useMemo(() => o ? Z(pl(o.builtinPlacements || {}, o.prefixCls || "", D, !1), o.getPopupClassNameFromAlign?.(D)) : "", [
		D,
		o?.getPopupClassNameFromAlign,
		o?.builtinPlacements,
		o?.prefixCls
	]), A = g.useMemo(() => ({
		show: h,
		hide: v
	}), []);
	g.useEffect(() => {
		O();
	}, [o?.target]);
	let j = _(() => (O(), Promise.resolve())), M = g.useRef({}), N = g.useContext(cl), P = g.useMemo(() => ({ registerSubPopup: (e, t) => {
		M.current[e] = t, N?.registerSubPopup(e, t);
	} }), [N]), F = o?.prefixCls;
	return /*#__PURE__*/ g.createElement(ll.Provider, { value: A }, e, o && /*#__PURE__*/ g.createElement(cl.Provider, { value: P }, /*#__PURE__*/ g.createElement(sl, {
		ref: f,
		portal: el,
		onEsc: o.onEsc,
		prefixCls: F,
		popup: o.popup,
		className: Z(o.popupClassName, k, `${F}-unique-controlled`),
		style: o.popupStyle,
		target: o.target,
		open: r,
		keepDom: !0,
		fresh: !0,
		autoDestroy: !1,
		onVisibleChanged: y,
		ready: b,
		offsetX: x,
		offsetY: S,
		offsetR: C,
		offsetB: w,
		onAlign: O,
		onPrepare: j,
		onResize: (e) => u({
			width: e.offsetWidth,
			height: e.offsetHeight
		}),
		arrowPos: {
			x: T,
			y: E
		},
		align: D,
		zIndex: o.zIndex,
		mask: o.mask,
		arrow: o.arrow,
		motion: o.popupMotion,
		maskMotion: o.maskMotion,
		getPopupContainer: o.getPopupContainer
	}, /*#__PURE__*/ g.createElement(jl, {
		prefixCls: F,
		isMobile: !1,
		ready: b,
		open: r,
		align: D,
		offsetR: C,
		offsetB: w,
		offsetX: x,
		offsetY: S,
		arrowPos: {
			x: T,
			y: E
		},
		popupSize: l,
		motion: o.popupMotion,
		uniqueContainerClassName: Z(o.uniqueContainerClassName, k),
		uniqueContainerStyle: o.uniqueContainerStyle
	}))));
};
// node_modules/@rc-component/trigger/es/index.js
function Nl(e = el) {
	return /* @__PURE__ */ g.forwardRef((t, n) => {
		let { prefixCls: r = "rc-trigger-popup", children: i, action: a = "hover", showAction: o, hideAction: s, disabled: c = !1, popupVisible: l, defaultPopupVisible: u, onOpenChange: d, afterOpenChange: f, onPopupVisibleChange: p, afterPopupVisibleChange: m, mouseEnterDelay: h, mouseLeaveDelay: v = .1, focusDelay: y, blurDelay: x, mask: C, maskClosable: w = !0, getPopupContainer: T, forceRender: E, autoDestroy: D, popup: O, popupClassName: k, uniqueContainerClassName: A, uniqueContainerStyle: j, popupStyle: M, popupPlacement: P, builtinPlacements: F = {}, popupAlign: I, zIndex: L, stretch: R, getPopupClassNameFromAlign: z, fresh: ee, unique: B, alignPoint: V, onPopupClick: H, onPopupAlign: te, arrow: ne, popupMotion: U, maskMotion: ie, mobile: ae, ...se } = t, W = D || !1, ce = l === void 0, le = !!ae, ue = g.useRef({}), G = g.useContext(cl), de = g.useMemo(() => ({ registerSubPopup: (e, t) => {
			ue.current[e] = t, G?.registerSubPopup(e, t);
		} }), [G]), K = g.useContext(ll), q = N(), [fe, pe] = g.useState(null), me = g.useRef(null), J = _((e) => {
			me.current = e, he(e) && fe !== e && pe(e), G?.registerSubPopup(q, e);
		}), [Y, _e] = g.useState(null), ve = g.useRef(null), ye = _((e) => {
			let t = ge(e);
			he(t) && Y !== t && (_e(t), ve.current = t);
		}), X = {}, xe = _((e) => {
			let t = Y;
			return t?.contains(e) || be(t)?.host === e || e === t || fe?.contains(e) || be(fe)?.host === e || e === fe || Object.values(ue.current).some((t) => t?.contains(e) || e === t);
		}), Se = ne ? { ...ne === !0 ? {} : ne } : null, [Ce, we] = S(u || !1, l), Te = Ce || !1, Ee = Te && !c, De = g.useMemo(() => {
			let e = typeof i == "function" ? i({ open: Ee }) : i;
			return g.Children.only(e);
		}, [i, Ee]), Oe = De?.props || {}, ke = _(() => Ee), Ae = _((e = 0) => ({
			popup: O,
			target: Y,
			delay: e,
			prefixCls: r,
			popupClassName: k,
			uniqueContainerClassName: A,
			uniqueContainerStyle: j,
			popupStyle: M,
			popupPlacement: P,
			builtinPlacements: F,
			popupAlign: I,
			zIndex: L,
			mask: C,
			maskClosable: w,
			popupMotion: U,
			maskMotion: ie,
			arrow: Se,
			getPopupContainer: T,
			getPopupClassNameFromAlign: z,
			id: q,
			onEsc: Fe
		}));
		b(() => {
			K && B && Y && !ce && !G && (Ee ? K.show(Ae(h), ke) : K.hide(v));
		}, [Ee, Y]);
		let je = g.useRef(Ee);
		je.current = Ee;
		let Me = _((e) => {
			(0, et.flushSync)(() => {
				Te !== e && (we(e), d?.(e), p?.(e));
			});
		}), Ne = El(), Pe = (e, t = 0) => {
			l === void 0 && K && B && ce && !G ? e ? K.show(Ae(t), ke) : K.hide(t) : Ne(() => {
				Me(e);
			}, t);
		};
		function Fe({ top: e }) {
			e && Pe(!1);
		}
		let [Ie, Le] = g.useState(!1);
		b((e) => {
			(!e || Ee) && Le(!0);
		}, [Ee]);
		let [Re, ze] = g.useState(null), [Be, Ve] = g.useState(null), He = (e) => {
			Ve([e.clientX, e.clientY]);
		}, [Ue, We, Ge, Ke, qe, Je, Ye, Xe, Ze, Qe, $e] = Tl(Ee, fe, V && Be !== null ? Be : Y, P, F, I, te, le), [tt, nt] = dl(a, o, s), rt = tt.has("click"), it = nt.has("click") || nt.has("contextMenu"), at = _(() => {
			Ie || $e();
		});
		Dl(Ee, Y, fe, at, () => {
			je.current && V && it && Pe(!1);
		}), b(() => {
			at();
		}, [Be, P]), b(() => {
			Ee && !F?.[P] && at();
		}, [JSON.stringify(I)]);
		let ot = g.useMemo(() => Z(pl(F, r, Qe, V), z?.(Qe)), [
			Qe,
			z,
			F,
			r,
			V
		]);
		g.useImperativeHandle(n, () => ({
			nativeElement: ve.current,
			popupElement: me.current,
			forceAlign: at
		}));
		let [st, ct] = g.useState(0), [lt, ut] = g.useState(0), dt = () => {
			if (R && Y) {
				let e = Y.getBoundingClientRect();
				ct(e.width), ut(e.height);
			}
		}, ft = () => {
			dt(), at();
		}, mt = (e) => {
			Le(!1), $e(), f?.(e), m?.(e);
		}, ht = () => new Promise((e) => {
			dt(), ze(() => e);
		});
		b(() => {
			Re && ($e(), Re(), ze(null));
		}, [Re]);
		function gt(e, t, n, r, i) {
			X[e] = (a, ...o) => {
				i && i() || (r?.(a), Pe(t, n)), Oe[e]?.(a, ...o);
			};
		}
		let _t = tt.has("touch"), vt = nt.has("touch"), yt = g.useRef(!1);
		(_t || vt) && (X.onTouchStart = (...e) => {
			yt.current = !0, je.current && vt ? Pe(!1) : !je.current && _t && Pe(!0), Oe.onTouchStart?.(...e);
		}), (rt || it) && (X.onClick = (e, ...t) => {
			je.current && it ? Pe(!1) : !je.current && rt && (He(e), Pe(!0)), Oe.onClick?.(e, ...t), yt.current = !1;
		});
		let bt = Ol(Ee, it || vt, Y, fe, C, w, xe, Pe), xt = tt.has("hover"), St = nt.has("hover"), Ct, wt, Tt = () => yt.current;
		if (xt) {
			let e = (e) => {
				He(e);
			};
			gt("onMouseEnter", !0, h, e, Tt), gt("onPointerEnter", !0, h, e, Tt), Ct = (e) => {
				(Ee || Ie) && fe?.contains(e.target) && Pe(!0, h);
			}, V && (X.onMouseMove = (e) => {
				Oe.onMouseMove?.(e);
			});
		}
		St && (gt("onMouseLeave", !1, v, void 0, Tt), gt("onPointerLeave", !1, v, void 0, Tt), wt = () => {
			Pe(!1, v);
		}), tt.has("focus") && gt("onFocus", !0, y), nt.has("focus") && gt("onBlur", !1, x), tt.has("contextMenu") && (X.onContextMenu = (e, ...t) => {
			je.current && nt.has("contextMenu") ? Pe(!1) : (He(e), Pe(!0)), e.preventDefault(), Oe.onContextMenu?.(e, ...t);
		});
		let Et = g.useRef(!1);
		Et.current ||= E || Ee || Ie;
		let Dt = {
			...Oe,
			...X
		}, Ot = {};
		[
			"onContextMenu",
			"onClick",
			"onMouseDown",
			"onTouchStart",
			"onMouseEnter",
			"onMouseLeave",
			"onFocus",
			"onBlur"
		].forEach((e) => {
			se[e] && (Ot[e] = (...t) => {
				Dt[e]?.(...t), se[e](...t);
			});
		});
		let kt = {
			x: Je,
			y: Ye
		};
		pt(Ee, Y, ft);
		let At = re(ye, oe(De)), jt = /*#__PURE__*/ g.cloneElement(De, {
			...Dt,
			...Ot,
			ref: At
		});
		return /*#__PURE__*/ g.createElement(g.Fragment, null, jt, Et.current && (!K || !B) && /*#__PURE__*/ g.createElement(cl.Provider, { value: de }, /*#__PURE__*/ g.createElement(sl, {
			portal: e,
			ref: J,
			prefixCls: r,
			popup: O,
			className: Z(k, !le && ot),
			style: M,
			target: Y,
			onMouseEnter: Ct,
			onMouseLeave: wt,
			onPointerEnter: Ct,
			zIndex: L,
			open: Ee,
			keepDom: Ie,
			fresh: ee,
			onClick: H,
			onPointerDownCapture: bt,
			mask: C,
			motion: U,
			maskMotion: ie,
			onVisibleChanged: mt,
			onPrepare: ht,
			forceRender: E,
			autoDestroy: W,
			getPopupContainer: T,
			onEsc: Fe,
			align: Qe,
			arrow: Se,
			arrowPos: kt,
			ready: Ue,
			offsetX: We,
			offsetY: Ge,
			offsetR: Ke,
			offsetB: qe,
			onAlign: at,
			stretch: R,
			targetWidth: st / Xe,
			targetHeight: lt / Ze,
			mobile: ae
		})));
	});
}
var Pl = Nl(el);
// node_modules/antd/es/_util/reactNode.js
function Fl(e) {
	return e && /*#__PURE__*/ g.isValidElement(e) && e.type === g.Fragment;
}
var Il = (e, t, n) => /*#__PURE__*/ g.isValidElement(e) ? /*#__PURE__*/ g.cloneElement(e, ec(n) ? n(e.props || {}) : n) : t;
function Ll(e, t) {
	return Il(e, e, t);
}
// node_modules/antd/es/tooltip/UniqueProvider/MotionContent.js
var Rl = ({ children: e }) => {
	let { getPrefixCls: t } = g.useContext(kt), n = t();
	return /*#__PURE__*/ g.isValidElement(e) ? /*#__PURE__*/ g.createElement(Xs, {
		visible: !0,
		motionName: `${n}-fade`,
		motionAppear: !0,
		motionEnter: !0,
		motionLeave: !1,
		removeOnLeave: !1
	}, ({ style: t, className: n }) => Ll(e, (e) => ({
		className: Z(e.className, n),
		style: {
			...e.style,
			...t
		}
	}))) : e;
}, zl = [null, null];
function Bl(e) {
	if (zl[0] !== e) {
		let t = {};
		Object.keys(e).forEach((n) => {
			t[n] = {
				...e[n],
				dynamicInset: !1
			};
		}), zl[0] = e, zl[1] = t;
	}
	return zl[1];
}
var Vl = ({ children: e }) => /*#__PURE__*/ g.createElement(Ml, { postTriggerProps: (e) => {
	let { id: t, builtinPlacements: n, popup: r } = e, i = ec(r) ? r() : r, a = Bl(n);
	return {
		...e,
		getPopupContainer: null,
		arrow: !1,
		popup: /*#__PURE__*/ g.createElement(Rl, { key: t }, i),
		builtinPlacements: a
	};
} }, e), Hl = /*#__PURE__*/ g.createContext(!1), Ul = ({ children: e, disabled: t }) => {
	let n = g.useContext(Hl);
	return /*#__PURE__*/ g.createElement(Hl.Provider, { value: t ?? n }, e);
}, Wl = /*#__PURE__*/ g.createContext(void 0), Gl = ({ children: e, size: t }) => {
	let n = g.useContext(Wl);
	return /*#__PURE__*/ g.createElement(Wl.Provider, { value: t || n }, e);
};
// node_modules/antd/es/config-provider/hooks/useConfig.js
function Kl() {
	return {
		componentDisabled: (0, g.useContext)(Hl),
		componentSize: (0, g.useContext)(Wl)
	};
}
// node_modules/antd/es/config-provider/hooks/useTheme.js
function ql(e, t, n) {
	it("ConfigProvider");
	let r = e || {}, i = r.inherit === !1 || !t ? {
		...Ka,
		hashed: t?.hashed ?? Ka.hashed,
		cssVar: t?.cssVar,
		zeroRuntime: t?.zeroRuntime
	} : t, a = (0, g.useId)();
	return P(() => {
		if (!e) return t;
		let o = { ...i.components };
		Object.keys(e.components || {}).forEach((t) => {
			o[t] = {
				...o[t],
				...e.components[t]
			};
		});
		let s = `css-var-${a.replace(/:/g, "")}`, c = {
			prefix: n?.prefixCls,
			...i.cssVar,
			...r.cssVar,
			key: r.cssVar?.key || s
		};
		return {
			...i,
			...r,
			token: {
				...i.token,
				...r.token
			},
			components: o,
			cssVar: c
		};
	}, [
		r,
		i,
		n?.prefixCls,
		a
	], (e, t) => e.some((e, n) => {
		let r = t[n];
		return !Me(e, r, !0);
	}));
}
// node_modules/antd/es/config-provider/MotionWrapper.js
var Jl = /*#__PURE__*/ g.createContext(!0);
function Yl(e) {
	let t = g.useContext(Jl), { children: n } = e, [, r] = to(), { motion: i } = r, a = g.useRef(!1);
	return a.current ||= t !== i, a.current ? /*#__PURE__*/ g.createElement(Jl.Provider, { value: i }, /*#__PURE__*/ g.createElement(cs, { motion: i }, n)) : n;
}
// node_modules/antd/es/config-provider/PropWarning.js
var Xl = () => null, Zl = ({ iconPrefixCls: e, csp: t }) => (go(e, t), null), Ql = [
	"getTargetContainer",
	"getPopupContainer",
	"renderEmpty",
	"input",
	"pagination",
	"form",
	"select",
	"button"
], $l = (e) => {
	let { prefixCls: t, iconPrefixCls: n, theme: r, holderRender: i } = e;
	"holderRender" in e;
}, eu = (e) => {
	let { children: t, csp: n, autoInsertSpaceInButton: r, alert: i, affix: a, anchor: o, app: s, form: c, locale: l, componentSize: u, direction: d, space: f, splitter: p, virtual: m, dropdownMatchSelectWidth: h, popupMatchSelectWidth: _, popupOverflow: v, legacyLocale: y, parentContext: b, iconPrefixCls: x, theme: S, componentDisabled: C, segmented: w, statistic: T, spin: E, calendar: D, carousel: O, cascader: k, collapse: A, typography: j, checkbox: M, descriptions: N, divider: F, drawer: I, skeleton: L, steps: R, image: z, layout: ee, list: B, listy: V, mentions: H, modal: te, progress: ne, result: re, slider: U, breadcrumb: ie, masonry: ae, menu: oe, pagination: se, input: W, inputPassword: ce, inputSearch: le, textArea: ue, otp: G, empty: de, badge: K, borderBeam: q, radio: fe, rate: pe, ribbon: me, switch: J, transfer: Y, avatar: he, message: ge, tag: _e, table: ve, card: ye, cardMeta: be, tabs: X, timeline: xe, timePicker: Se, upload: Ce, notification: we, tree: Te, colorPicker: Ee, datePicker: De, rangePicker: Oe, flex: ke, wave: Ae, dropdown: je, warning: Me, tour: Ne, tooltip: Pe, popover: Fe, popconfirm: Ie, qrcode: Le, floatButton: Re, floatButtonGroup: ze, variant: Be, inputNumber: Ve, treeSelect: He, watermark: Ue } = e, We = g.useMemo(() => $s(l) && Object.prototype.hasOwnProperty.call(l, "default") && l.default?.locale ? l.default : l, [l]), Ge = g.useCallback((t, n) => {
		let { prefixCls: r } = e;
		if (n) return n;
		let i = r || b.getPrefixCls("");
		return t ? `${i}-${t}` : i;
	}, [b.getPrefixCls, e.prefixCls]), Ke = x || b.iconPrefixCls || "anticon", qe = n || b.csp, Je = ql(S, b.theme, { prefixCls: Ge("") }), Xe = {
		csp: qe,
		autoInsertSpaceInButton: r,
		alert: i,
		affix: a,
		anchor: o,
		app: s,
		locale: We || y,
		direction: d,
		space: f,
		splitter: p,
		virtual: m,
		popupMatchSelectWidth: _ ?? h,
		popupOverflow: v,
		getPrefixCls: Ge,
		iconPrefixCls: Ke,
		theme: Je,
		segmented: w,
		statistic: T,
		spin: E,
		calendar: D,
		carousel: O,
		cascader: k,
		collapse: A,
		typography: j,
		checkbox: M,
		descriptions: N,
		divider: F,
		drawer: I,
		skeleton: L,
		steps: R,
		image: z,
		input: W,
		inputPassword: ce,
		inputSearch: le,
		textArea: ue,
		otp: G,
		layout: ee,
		list: B,
		listy: V,
		mentions: H,
		modal: te,
		progress: ne,
		result: re,
		slider: U,
		breadcrumb: ie,
		masonry: ae,
		menu: oe,
		pagination: se,
		empty: de,
		badge: K,
		borderBeam: q,
		radio: fe,
		rate: pe,
		ribbon: me,
		switch: J,
		transfer: Y,
		avatar: he,
		message: ge,
		tag: _e,
		table: ve,
		card: ye,
		cardMeta: be,
		tabs: X,
		timeline: xe,
		timePicker: Se,
		upload: Ce,
		notification: we,
		tree: Te,
		colorPicker: Ee,
		datePicker: De,
		rangePicker: Oe,
		flex: ke,
		wave: Ae,
		dropdown: je,
		warning: Me,
		tour: Ne,
		tooltip: Pe,
		popover: Fe,
		popconfirm: Ie,
		qrcode: Le,
		floatButton: Re,
		floatButtonGroup: ze,
		variant: Be,
		inputNumber: Ve,
		treeSelect: He,
		watermark: Ue
	}, Ze = { ...b };
	Object.keys(Xe).forEach((e) => {
		Xe[e] !== void 0 && (Ze[e] = Xe[e]);
	}), Ql.forEach((t) => {
		let n = e[t];
		n && (Ze[t] = n);
	}), r !== void 0 && (Ze.button = {
		autoInsertSpace: r,
		...Ze.button
	});
	let Qe = P(() => Ze, Ze, (e, t) => {
		let n = Object.keys(e), r = Object.keys(t);
		return n.length !== r.length || n.some((n) => e[n] !== t[n]);
	}), { layer: $e } = g.useContext(Ht), et = g.useMemo(() => ({
		prefixCls: Ke,
		csp: qe,
		layer: $e ? "antd" : void 0,
		zeroRuntime: !!$e || Je?.zeroRuntime
	}), [
		Ke,
		qe,
		$e,
		Je?.zeroRuntime
	]), tt = /*#__PURE__*/ g.createElement(g.Fragment, null, /*#__PURE__*/ g.createElement(Zl, {
		iconPrefixCls: Ke,
		csp: qe
	}), /*#__PURE__*/ g.createElement(Xl, { dropdownMatchSelectWidth: h }), t), nt = g.useMemo(() => Ye(Oc.Form?.defaultValidateMessages || {}, Qe.locale?.Form?.defaultValidateMessages || {}, Qe.form?.validateMessages || {}, c?.validateMessages || {}), [Qe, c?.validateMessages]);
	Object.keys(nt).length > 0 && (tt = /*#__PURE__*/ g.createElement(xc.Provider, { value: nt }, tt)), We && (tt = /*#__PURE__*/ g.createElement(Fc, {
		locale: We,
		_ANT_MARK__: Pc
	}, tt)), (Ke || qe) && (tt = /*#__PURE__*/ g.createElement(vo.Provider, { value: et }, tt)), u && (tt = /*#__PURE__*/ g.createElement(Gl, { size: u }, tt)), tt = /*#__PURE__*/ g.createElement(Yl, null, tt), Pe?.unique && (tt = /*#__PURE__*/ g.createElement(Vl, null, tt));
	let it = g.useMemo(() => {
		let { algorithm: e, token: t, components: n, cssVar: r, ...i } = Je || {}, a = e && (!Array.isArray(e) || e.length > 0) ? Jt(e) : Ga, o = {};
		Object.entries(n || {}).forEach(([e, t]) => {
			let n = { ...t };
			"algorithm" in n && (n.algorithm === !0 ? n.theme = a : (Array.isArray(n.algorithm) || ec(n.algorithm)) && (n.theme = Jt(n.algorithm)), delete n.algorithm), o[e] = n;
		});
		let s = {
			...Vi,
			...t
		};
		return {
			...i,
			theme: a,
			token: s,
			components: o,
			override: {
				override: s,
				...o
			},
			cssVar: r
		};
	}, [Je]);
	return S && (tt = /*#__PURE__*/ g.createElement(qa.Provider, { value: it }, tt)), Qe.warning && (tt = /*#__PURE__*/ g.createElement(rt.Provider, { value: Qe.warning }, tt)), C !== void 0 && (tt = /*#__PURE__*/ g.createElement(Ul, { disabled: C }, tt)), /*#__PURE__*/ g.createElement(kt.Provider, { value: Qe }, tt);
}, tu = (e) => {
	let t = g.useContext(kt), n = g.useContext(Mc);
	return /*#__PURE__*/ g.createElement(eu, {
		parentContext: t,
		legacyLocale: n,
		...e
	});
};
tu.ConfigContext = kt, tu.SizeContext = Wl, tu.config = $l, tu.useConfig = Kl, Object.defineProperty(tu, "SizeContext", { get: () => Wl });
// node_modules/@ant-design/icons-svg/es/asn/LoadingOutlined.js
var nu = {
	icon: {
		tag: "svg",
		attrs: {
			viewBox: "0 0 1024 1024",
			focusable: "false"
		},
		children: [{
			tag: "path",
			attrs: { d: "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" }
		}]
	},
	name: "loading",
	theme: "outlined"
};
// node_modules/@ant-design/icons/es/icons/LoadingOutlined.js
function ru() {
	return ru = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, ru.apply(this, arguments);
}
var iu = /*#__PURE__*/ g.forwardRef((e, t) => /*#__PURE__*/ g.createElement(Ko, ru({}, e, {
	ref: t,
	icon: nu
})));
// node_modules/antd/es/_util/fallbackProp.js
function au(...e) {
	return e.find((e) => e !== void 0);
}
// node_modules/antd/es/_util/hooks/useOrientation.js
var ou = (e) => e === "horizontal" || e === "vertical", su = (e, t, n) => (0, g.useMemo)(() => {
	let r = ou(e), i;
	return i = r ? e : typeof t == "boolean" ? t ? "vertical" : "horizontal" : ou(n) ? n : "horizontal", [i, i === "vertical"];
}, [
	n,
	e,
	t
]), cu = /*#__PURE__*/ g.createContext(void 0), lu = 100, uu = {
	Modal: lu,
	Drawer: lu,
	Popover: lu,
	Popconfirm: lu,
	Tooltip: lu,
	Tour: lu,
	FloatButton: lu
}, du = {
	SelectLike: 50,
	Dropdown: 50,
	DatePicker: 50,
	Menu: 50,
	ImagePreview: 1
}, fu = (e) => e in uu, pu = (e, t) => {
	let [, n] = to(), r = g.useContext(cu), i = fu(e), a;
	if (t !== void 0) a = [t, t];
	else {
		let o = r ?? 0;
		o += i ? (r ? 0 : n.zIndexPopupBase) + uu[e] : du[e], a = [r === void 0 ? t : o, o];
	}
	return a;
}, mu = (e, t, n) => n === void 0 ? `${e}-${t}` : n, hu = po("Wave", (e) => {
	let { componentCls: t, colorPrimary: n, motionDurationSlow: r, motionEaseInOut: i, motionEaseOutCirc: a, antCls: o } = e, [, s] = ho(o, "wave");
	return { [t]: {
		position: "absolute",
		background: "transparent",
		pointerEvents: "none",
		boxSizing: "border-box",
		color: s("color", n),
		boxShadow: "0 0 0 0 currentcolor",
		opacity: .2,
		"&.wave-motion-appear": {
			transition: ["box-shadow 0.4s", "opacity 2s"].map((e) => `${e} ${a}`).join(","),
			"&-active": {
				boxShadow: "0 0 0 6px currentcolor",
				opacity: 0
			},
			"&.wave-quick": { transition: ["box-shadow", "opacity"].map((e) => `${e} ${r} ${i}`).join(",") }
		}
	} };
}), gu = "ant-wave-target", _u = (e) => e ? Qs(e) && e !== "#fff" && e !== "#ffffff" && e !== "rgb(255, 255, 255)" && e !== "rgba(255, 255, 255, 1)" && !/rgba\((?:\d*, ){3}0\)/i.test(e) && !/^#(?:[0-9a-f]{3}0|[0-9a-f]{6}00)$/i.test(e) && e !== "transparent" && e !== "canvastext" : !1;
function vu(e, t = null) {
	let n = getComputedStyle(e), { borderTopColor: r, borderColor: i, backgroundColor: a } = n;
	return t && _u(n[t]) ? n[t] : [
		r,
		i,
		a
	].find(_u) ?? null;
}
// node_modules/antd/es/_util/wave/WaveEffect.js
function yu(e) {
	return Number.isNaN(e) ? 0 : e;
}
var bu = (e) => {
	let { className: t, target: n, component: r, colorSource: i } = e, a = g.useRef(null), { getPrefixCls: o } = g.useContext(kt), [s] = ho(o(), "wave"), [c, l] = g.useState(null), [u, d] = g.useState([]), [f, p] = g.useState(0), [m, h] = g.useState(0), [_, v] = g.useState(0), [y, b] = g.useState(0), [x, S] = g.useState(!1), C = {
		left: f,
		top: m,
		width: _,
		height: y,
		borderRadius: u.map((e) => `${e}px`).join(" ")
	};
	c && (C[s("color")] = c);
	function w() {
		let e = getComputedStyle(n);
		l(vu(n, i));
		let t = e.position === "static", { borderLeftWidth: r, borderTopWidth: a } = e;
		p(t ? n.offsetLeft : yu(-Number.parseFloat(r))), h(t ? n.offsetTop : yu(-Number.parseFloat(a))), v(n.offsetWidth), b(n.offsetHeight);
		let { borderTopLeftRadius: o, borderTopRightRadius: s, borderBottomLeftRadius: c, borderBottomRightRadius: u } = e;
		d([
			o,
			s,
			u,
			c
		].map((e) => yu(Number.parseFloat(e))));
	}
	if (g.useEffect(() => {
		if (n) {
			let e = O(() => {
				w(), S(!0);
			}), t;
			return typeof ResizeObserver < "u" && (t = new ResizeObserver(w), t.observe(n)), () => {
				O.cancel(e), t?.disconnect();
			};
		}
	}, [n]), !x) return null;
	let T = (r === "Checkbox" || r === "Radio") && n?.classList.contains(gu);
	return /*#__PURE__*/ g.createElement(Xs, {
		visible: !0,
		motionAppear: !0,
		motionName: "wave-motion",
		motionDeadline: 5e3,
		onAppearEnd: (e, t) => {
			if (t.deadline || tc(t) && t.propertyName === "opacity") {
				let e = a.current?.parentElement;
				$e(e).then(() => {
					e?.remove();
				});
			}
			return !1;
		}
	}, ({ className: e }, n) => /*#__PURE__*/ g.createElement("div", {
		ref: ne(a, n),
		className: Z(t, e, { "wave-quick": T }),
		style: C
	}));
}, xu = (e, t) => {
	let { component: n } = t;
	if (n === "Checkbox" && !e.querySelector("input")?.checked) return;
	let r = document.createElement("div");
	r.style.position = "absolute", r.style.left = "0px", r.style.top = "0px", e?.insertBefore(r, e?.firstChild), Qe(/*#__PURE__*/ g.createElement(bu, {
		...t,
		target: e
	}), r);
}, Su = (e, t, n, r) => {
	let { wave: i } = g.useContext(kt), [, a, o] = to(), s = _((s) => {
		let c = e.current;
		if (i?.disabled || !c) return;
		let l = c.querySelector(`.${gu}`) || c, { showEffect: u } = i || {};
		(u || xu)(l, {
			className: t,
			token: a,
			component: n,
			event: s,
			hashId: o,
			colorSource: r
		});
	}), c = g.useRef(null);
	return g.useEffect(() => () => {
		O.cancel(c.current);
	}, []), (e) => {
		O.cancel(c.current), c.current = O(() => {
			s(e);
		});
	};
}, Cu = {
	click: "click",
	mousedown: "mousedown",
	mouseup: "mouseup",
	pointerdown: "pointerdown",
	pointerup: "pointerup"
}, wu = (e) => {
	let { children: t, disabled: n, component: r, colorSource: i } = e, { getPrefixCls: a, wave: o } = (0, g.useContext)(kt), s = (0, g.useRef)(null), c = a("wave"), l = Su(s, Z(c, hu(c)), r, i);
	return g.useEffect(() => {
		let e = s.current;
		if (!e || e.nodeType !== window.Node.ELEMENT_NODE || n) return;
		let t = (t) => {
			!_e(t.target) || !e.getAttribute || e.getAttribute("disabled") || e.disabled || e.className.includes("disabled") && !e.className.includes("disabled:") || e.getAttribute("aria-disabled") === "true" || e.className.includes("-leave") || l(t);
		}, r = o?.triggerType, i = r && r in Cu ? Cu[r] : "click";
		return e.addEventListener(i, t, !0), () => {
			e.removeEventListener(i, t, !0);
		};
	}, [n, o?.triggerType]), /*#__PURE__*/ g.isValidElement(t) ? Ll(t, { ref: U(t) ? ne(oe(t), s) : s }) : t ?? null;
}, Tu = (e) => {
	let t = g.useContext(Wl);
	return g.useMemo(() => e ? Qs(e) ? e : ec(e) ? e(t) : t : t, [e, t]);
}, Eu = /*#__PURE__*/ g.createContext(null), Du = (e, t) => {
	let n = g.useContext(Eu), r = g.useMemo(() => {
		if (!n) return "";
		let { compactDirection: r, isFirstItem: i, isLastItem: a } = n, o = r === "vertical" ? "-vertical-" : "-";
		return Z(`${e}-compact${o}item`, {
			[`${e}-compact${o}first-item`]: i,
			[`${e}-compact${o}last-item`]: a,
			[`${e}-compact${o}item-rtl`]: t === "rtl"
		});
	}, [
		e,
		t,
		n
	]);
	return {
		compactSize: n?.compactSize,
		compactDirection: n?.compactDirection,
		compactItemClassnames: r
	};
}, Ou = (e) => {
	let { children: t } = e;
	return /*#__PURE__*/ g.createElement(Eu.Provider, { value: null }, t);
}, ku = /*#__PURE__*/ g.createContext(void 0), Au = (e) => {
	let { getPrefixCls: t, direction: n } = g.useContext(kt), { prefixCls: r, size: i, className: a, ...o } = e, s = t("btn-group", r), [, , c] = to(), l = g.useMemo(() => {
		switch (i) {
			case "large": return "lg";
			case "small": return "sm";
			default: return "";
		}
	}, [i]), u = Z(s, {
		[`${s}-${l}`]: l,
		[`${s}-rtl`]: n === "rtl"
	}, a, c);
	return /*#__PURE__*/ g.createElement(ku.Provider, { value: i }, /*#__PURE__*/ g.createElement("div", {
		...o,
		className: u
	}));
}, ju = /^[\u4E00-\u9FA5]{2}$/, Mu = ju.test.bind(ju);
function Nu(e) {
	return e === "text" || e === "link";
}
function Pu(e, t, n, r) {
	if (!Pe(e)) return;
	let i = t ? " " : "";
	return !Qs(e) && !Zs(e) && Qs(e.type) && Mu(e.props.children) ? Ll(e, (e) => {
		let t = Z(e.className, r) || void 0, a = {
			...n,
			...e.style
		};
		return {
			...e,
			children: e.children.split("").join(i),
			className: t,
			style: a
		};
	}) : Qs(e) ? /*#__PURE__*/ g.createElement("span", {
		className: r,
		style: n
	}, Mu(e) ? e.split("").join(i) : e) : Fl(e) ? /*#__PURE__*/ g.createElement("span", {
		className: r,
		style: n
	}, e) : Ll(e, (e) => ({
		...e,
		className: Z(e.className, r) || void 0,
		style: {
			...e.style,
			...n
		}
	}));
}
function Fu(e, t, n, r) {
	let i = !1, a = [];
	return g.Children.forEach(e, (e) => {
		let t = Qs(e) || Zs(e);
		if (i && t) {
			let t = a.length - 1, n = a[t];
			a[t] = `${n}${e}`;
		} else a.push(e);
		i = t;
	}), g.Children.map(a, (e) => Pu(e, t, n, r));
}
[
	"default",
	"primary",
	"danger"
].concat(Et(Ii));
// node_modules/antd/es/button/IconWrapper.js
var Iu = /*#__PURE__*/ (0, g.forwardRef)((e, t) => {
	let { className: n, style: r, children: i, prefixCls: a } = e, o = Z(`${a}-icon`, n);
	return /*#__PURE__*/ g.createElement("span", {
		ref: t,
		className: o,
		style: r
	}, i);
}), Lu = /*#__PURE__*/ (0, g.forwardRef)((e, t) => {
	let { prefixCls: n, className: r, style: i, iconClassName: a } = e, o = Z(`${n}-loading-icon`, r);
	return /*#__PURE__*/ g.createElement(Iu, {
		prefixCls: n,
		className: o,
		style: i,
		ref: t
	}, /*#__PURE__*/ g.createElement(iu, { className: a }));
}), Ru = () => ({
	width: 0,
	opacity: 0,
	transform: "scale(0)"
}), zu = (e) => ({
	width: e.scrollWidth,
	opacity: 1,
	transform: "scale(1)"
}), Bu = (e) => {
	let { prefixCls: t, loading: n, existIcon: r, className: i, style: a, mount: o } = e, s = !!n;
	return r ? /*#__PURE__*/ g.createElement(Lu, {
		prefixCls: t,
		className: i,
		style: a
	}) : /*#__PURE__*/ g.createElement(Xs, {
		visible: s,
		motionName: `${t}-loading-icon-motion`,
		motionAppear: !o,
		motionEnter: !o,
		motionLeave: !o,
		removeOnLeave: !0,
		onAppearStart: Ru,
		onAppearActive: zu,
		onEnterStart: Ru,
		onEnterActive: zu,
		onLeaveStart: zu,
		onLeaveActive: Ru
	}, ({ className: e, style: n }, r) => {
		let o = {
			...a,
			...n
		};
		return /*#__PURE__*/ g.createElement(Lu, {
			prefixCls: t,
			className: Z(i, e),
			style: o,
			ref: r
		});
	});
}, Vu = (e) => ({
	animationDuration: e,
	animationFillMode: "both"
}), Hu = (e, t, n, r, i = !1) => {
	let a = i ? "&" : "";
	return {
		[`
      ${a}${e}-enter,
      ${a}${e}-appear
    `]: {
			...Vu(r),
			animationPlayState: "paused"
		},
		[`${a}${e}-leave`]: {
			...Vu(r),
			animationPlayState: "paused"
		},
		[`
      ${a}${e}-enter${e}-enter-active,
      ${a}${e}-appear${e}-appear-active
    `]: {
			animationName: t,
			animationPlayState: "running"
		},
		[`${a}${e}-leave${e}-leave-active`]: {
			animationName: n,
			animationPlayState: "running",
			pointerEvents: "none"
		}
	};
}, Uu = new Kr("antMoveDownIn", {
	"0%": {
		transform: "translate3d(0, 100%, 0)",
		transformOrigin: "0 0",
		opacity: 0
	},
	"100%": {
		transform: "translate3d(0, 0, 0)",
		transformOrigin: "0 0",
		opacity: 1
	}
}), Wu = new Kr("antMoveDownOut", {
	"0%": {
		transform: "translate3d(0, 0, 0)",
		transformOrigin: "0 0",
		opacity: 1
	},
	"100%": {
		transform: "translate3d(0, 100%, 0)",
		transformOrigin: "0 0",
		opacity: 0
	}
}), Gu = new Kr("antMoveLeftIn", {
	"0%": {
		transform: "translate3d(-100%, 0, 0)",
		transformOrigin: "0 0",
		opacity: 0
	},
	"100%": {
		transform: "translate3d(0, 0, 0)",
		transformOrigin: "0 0",
		opacity: 1
	}
}), Ku = new Kr("antMoveLeftOut", {
	"0%": {
		transform: "translate3d(0, 0, 0)",
		transformOrigin: "0 0",
		opacity: 1
	},
	"100%": {
		transform: "translate3d(-100%, 0, 0)",
		transformOrigin: "0 0",
		opacity: 0
	}
}), qu = new Kr("antMoveRightIn", {
	"0%": {
		transform: "translate3d(100%, 0, 0)",
		transformOrigin: "0 0",
		opacity: 0
	},
	"100%": {
		transform: "translate3d(0, 0, 0)",
		transformOrigin: "0 0",
		opacity: 1
	}
}), Ju = new Kr("antMoveRightOut", {
	"0%": {
		transform: "translate3d(0, 0, 0)",
		transformOrigin: "0 0",
		opacity: 1
	},
	"100%": {
		transform: "translate3d(100%, 0, 0)",
		transformOrigin: "0 0",
		opacity: 0
	}
}), Yu = {
	"move-up": {
		inKeyframes: new Kr("antMoveUpIn", {
			"0%": {
				transform: "translate3d(0, -100%, 0)",
				transformOrigin: "0 0",
				opacity: 0
			},
			"100%": {
				transform: "translate3d(0, 0, 0)",
				transformOrigin: "0 0",
				opacity: 1
			}
		}),
		outKeyframes: new Kr("antMoveUpOut", {
			"0%": {
				transform: "translate3d(0, 0, 0)",
				transformOrigin: "0 0",
				opacity: 1
			},
			"100%": {
				transform: "translate3d(0, -100%, 0)",
				transformOrigin: "0 0",
				opacity: 0
			}
		})
	},
	"move-down": {
		inKeyframes: Uu,
		outKeyframes: Wu
	},
	"move-left": {
		inKeyframes: Gu,
		outKeyframes: Ku
	},
	"move-right": {
		inKeyframes: qu,
		outKeyframes: Ju
	}
}, Xu = (e, t) => {
	let { antCls: n } = e, r = `${n}-${t}`, { inKeyframes: i, outKeyframes: a } = Yu[t];
	return [Hu(r, i, a, e.motionDurationMid), {
		[`
        ${r}-enter,
        ${r}-appear
      `]: {
			opacity: 0,
			animationTimingFunction: e.motionEaseOutCirc
		},
		[`${r}-leave`]: { animationTimingFunction: e.motionEaseInOutCirc }
	}];
}, Zu = new Kr("antSlideUpIn", {
	"0%": {
		transform: "scaleY(0.8)",
		transformOrigin: "0% 0%",
		opacity: 0
	},
	"100%": {
		transform: "scaleY(1)",
		transformOrigin: "0% 0%",
		opacity: 1
	}
}), Qu = new Kr("antSlideUpOut", {
	"0%": {
		transform: "scaleY(1)",
		transformOrigin: "0% 0%",
		opacity: 1
	},
	"100%": {
		transform: "scaleY(0.8)",
		transformOrigin: "0% 0%",
		opacity: 0
	}
}), $u = new Kr("antSlideDownIn", {
	"0%": {
		transform: "scaleY(0.8)",
		transformOrigin: "100% 100%",
		opacity: 0
	},
	"100%": {
		transform: "scaleY(1)",
		transformOrigin: "100% 100%",
		opacity: 1
	}
}), ed = new Kr("antSlideDownOut", {
	"0%": {
		transform: "scaleY(1)",
		transformOrigin: "100% 100%",
		opacity: 1
	},
	"100%": {
		transform: "scaleY(0.8)",
		transformOrigin: "100% 100%",
		opacity: 0
	}
}), td = new Kr("antSlideLeftIn", {
	"0%": {
		transform: "scaleX(0.8)",
		transformOrigin: "0% 0%",
		opacity: 0
	},
	"100%": {
		transform: "scaleX(1)",
		transformOrigin: "0% 0%",
		opacity: 1
	}
}), nd = new Kr("antSlideLeftOut", {
	"0%": {
		transform: "scaleX(1)",
		transformOrigin: "0% 0%",
		opacity: 1
	},
	"100%": {
		transform: "scaleX(0.8)",
		transformOrigin: "0% 0%",
		opacity: 0
	}
}), rd = new Kr("antSlideRightIn", {
	"0%": {
		transform: "scaleX(0.8)",
		transformOrigin: "100% 0%",
		opacity: 0
	},
	"100%": {
		transform: "scaleX(1)",
		transformOrigin: "100% 0%",
		opacity: 1
	}
}), id = new Kr("antSlideRightOut", {
	"0%": {
		transform: "scaleX(1)",
		transformOrigin: "100% 0%",
		opacity: 1
	},
	"100%": {
		transform: "scaleX(0.8)",
		transformOrigin: "100% 0%",
		opacity: 0
	}
}), ad = {
	"slide-up": {
		inKeyframes: Zu,
		outKeyframes: Qu
	},
	"slide-down": {
		inKeyframes: $u,
		outKeyframes: ed
	},
	"slide-left": {
		inKeyframes: td,
		outKeyframes: nd
	},
	"slide-right": {
		inKeyframes: rd,
		outKeyframes: id
	}
}, od = (e, t) => {
	let { antCls: n } = e, r = `${n}-${t}`, { inKeyframes: i, outKeyframes: a } = ad[t];
	return [Hu(r, i, a, e.motionDurationMid), {
		[`
      ${r}-enter,
      ${r}-appear
    `]: {
			transform: "scale(0)",
			transformOrigin: "0% 0%",
			opacity: 0,
			animationTimingFunction: e.motionEaseOutQuint,
			"&-prepare": { transform: "scale(1)" }
		},
		[`${r}-leave`]: { animationTimingFunction: e.motionEaseInQuint }
	}];
}, sd = () => ({ "@media (prefers-reduced-motion: reduce)": { "&, &::before, &::after": {
	transition: "none",
	animation: "none"
} } }), cd = (e, t) => ({ [`> span, > ${e}`]: {
	"&:not(:last-child)": { [`&, & > ${e}`]: { "&:not(:disabled)": { borderInlineEndColor: t } } },
	"&:not(:first-child)": { [`&, & > ${e}`]: { "&:not(:disabled)": { borderInlineStartColor: t } } }
} }), ld = (e) => {
	let { componentCls: t, fontSize: n, lineWidth: r, groupBorderColor: i, colorErrorHover: a } = e;
	return { [`${t}-group`]: [
		{
			position: "relative",
			display: "inline-flex",
			[`> span, > ${t}`]: {
				"&:not(:last-child)": { [`&, & > ${t}`]: {
					borderStartEndRadius: 0,
					borderEndEndRadius: 0
				} },
				"&:not(:first-child)": {
					marginInlineStart: e.calc(r).mul(-1).equal(),
					[`&, & > ${t}`]: {
						borderStartStartRadius: 0,
						borderEndStartRadius: 0
					}
				}
			},
			[t]: {
				position: "relative",
				zIndex: 1,
				"&:hover, &:focus, &:active": { zIndex: 2 },
				"&[disabled]": { zIndex: 0 }
			},
			[`${t}-icon-only`]: { fontSize: n }
		},
		cd(`${t}-primary`, i),
		cd(`${t}-danger`, a)
	] };
}, ud = (e) => Math.round(Number(e || 0)), dd = (e) => {
	if (e instanceof qi) return e;
	if (e && typeof e == "object" && "h" in e && "b" in e) {
		let { b: t, ...n } = e;
		return {
			...n,
			v: t
		};
	}
	return typeof e == "string" && /hsb/.test(e) ? e.replace(/hsb/, "hsv") : e;
}, fd = class extends qi {
	constructor(e) {
		super(dd(e));
	}
	toHsbString() {
		let e = this.toHsb(), t = ud(e.s * 100), n = ud(e.b * 100), r = ud(e.h), i = e.a, a = `hsb(${r}, ${t}%, ${n}%)`, o = `hsba(${r}, ${t}%, ${n}%, ${i.toFixed(i === 0 ? 0 : 2)})`;
		return i === 1 ? a : o;
	}
	toHsb() {
		let { v: e, ...t } = this.toHsv();
		return {
			...t,
			b: e,
			a: this.a
		};
	}
};
((e) => e instanceof fd ? e : new fd(e))("#1677ff");
// node_modules/antd/es/color-picker/color.js
var pd = (e, t) => e?.replace(/[^0-9a-f]/gi, "").slice(0, t ? 8 : 6) || "", md = (e, t) => e ? pd(e, t) : "", hd = /*#__PURE__*/ function() {
	function e(t) {
		if (ii(this, e), this.cleared = !1, t instanceof e) {
			this.metaColor = t.metaColor.clone(), this.colors = t.colors?.map((t) => ({
				color: new e(t.color),
				percent: t.percent
			})), this.cleared = t.cleared;
			return;
		}
		let n = Array.isArray(t);
		n && t.length ? (this.colors = t.map(({ color: t, percent: n }) => ({
			color: new e(t),
			percent: n
		})), this.metaColor = new fd(this.colors[0].color.metaColor)) : this.metaColor = new fd(n ? "" : t), (!t || n && !this.colors) && (this.metaColor = this.metaColor.setA(0), this.cleared = !0);
	}
	return oi(e, [
		{
			key: "toHsb",
			value: function() {
				return this.metaColor.toHsb();
			}
		},
		{
			key: "toHsbString",
			value: function() {
				return this.metaColor.toHsbString();
			}
		},
		{
			key: "toHex",
			value: function() {
				return md(this.toHexString(), this.metaColor.a < 1);
			}
		},
		{
			key: "toHexString",
			value: function() {
				return this.metaColor.toHexString();
			}
		},
		{
			key: "toRgb",
			value: function() {
				return this.metaColor.toRgb();
			}
		},
		{
			key: "toRgbString",
			value: function() {
				return this.metaColor.toRgbString();
			}
		},
		{
			key: "isGradient",
			value: function() {
				return !!this.colors && !this.cleared;
			}
		},
		{
			key: "getColors",
			value: function() {
				return this.colors || [{
					color: this,
					percent: 0
				}];
			}
		},
		{
			key: "toCssString",
			value: function() {
				let { colors: e } = this;
				return e ? `linear-gradient(90deg, ${e.map((e) => `${e.color.toRgbString()} ${e.percent}%`).join(", ")})` : this.metaColor.toRgbString();
			}
		},
		{
			key: "equals",
			value: function(e) {
				return !e || this.isGradient() !== e.isGradient() ? !1 : this.isGradient() ? this.colors.length === e.colors.length && this.colors.every((t, n) => {
					let r = e.colors[n];
					return t.percent === r.percent && t.color.equals(r.color);
				}) : this.toHexString() === e.toHexString();
			}
		}
	]);
}();
// node_modules/@babel/runtime/helpers/esm/extends.js
function gd() {
	return gd = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, gd.apply(null, arguments);
}
// node_modules/antd/es/color-picker/components/ColorPresets.js
var _d = (e, t) => {
	let { r: n, g: r, b: i, a } = e.toRgb(), o = new fd(e.toRgbString()).onBackground(t).toHsv();
	return a <= .5 ? o.v > .5 : n * .299 + r * .587 + i * .114 > 192;
}, vd = (e) => {
	let { paddingInline: t, onlyIconSize: n, borderColorDisabled: r } = e;
	return Ti(e, {
		buttonPaddingHorizontal: t,
		buttonPaddingVertical: 0,
		buttonIconOnlyFontSize: n,
		colorBorderDisabled: r
	});
}, yd = (e) => {
	let t = e.contentFontSize ?? e.fontSize, n = e.contentFontSizeSM ?? e.fontSize, r = e.contentFontSizeLG ?? e.fontSizeLG, i = e.contentLineHeight ?? Li(t), a = e.contentLineHeightSM ?? Li(n), o = e.contentLineHeightLG ?? Li(r), s = _d(new hd(e.colorBgSolid), "#fff") ? "#000" : "#fff", c = Ii.reduce((t, n) => ({
		...t,
		[`${n}ShadowColor`]: `0 ${nn(e.controlOutlineWidth)} 0 ${Ya(e[`${n}1`], e.colorBgContainer)}`
	}), {}), l = e.colorBgContainerDisabled, u = e.colorBgContainerDisabled;
	return {
		...c,
		fontWeight: 400,
		iconGap: e.marginXS,
		defaultShadow: `0 ${e.controlOutlineWidth}px 0 ${e.controlTmpOutline}`,
		primaryShadow: `0 ${e.controlOutlineWidth}px 0 ${e.controlOutline}`,
		dangerShadow: `0 ${e.controlOutlineWidth}px 0 ${e.colorErrorOutline}`,
		primaryColor: e.colorTextLightSolid,
		dangerColor: e.colorTextLightSolid,
		borderColorDisabled: e.colorBorderDisabled,
		defaultGhostColor: e.colorBgContainer,
		ghostBg: "transparent",
		defaultGhostBorderColor: e.colorBgContainer,
		paddingInline: e.paddingContentHorizontal - e.lineWidth,
		paddingInlineLG: e.paddingContentHorizontal - e.lineWidth,
		paddingInlineSM: 8 - e.lineWidth,
		onlyIconSize: "inherit",
		onlyIconSizeSM: "inherit",
		onlyIconSizeLG: "inherit",
		groupBorderColor: e.colorPrimaryHover,
		linkHoverBg: "transparent",
		textTextColor: e.colorText,
		textTextHoverColor: e.colorText,
		textTextActiveColor: e.colorText,
		textHoverBg: e.colorFillTertiary,
		defaultColor: e.colorText,
		defaultBg: e.colorBgContainer,
		defaultBorderColor: e.colorBorder,
		defaultBorderColorDisabled: e.colorBorder,
		defaultHoverBg: e.colorBgContainer,
		defaultHoverColor: e.colorPrimaryHover,
		defaultHoverBorderColor: e.colorPrimaryHover,
		defaultActiveBg: e.colorBgContainer,
		defaultActiveColor: e.colorPrimaryActive,
		defaultActiveBorderColor: e.colorPrimaryActive,
		solidTextColor: s,
		contentFontSize: t,
		contentFontSizeSM: n,
		contentFontSizeLG: r,
		contentLineHeight: i,
		contentLineHeightSM: a,
		contentLineHeightLG: o,
		paddingBlock: Math.max((e.controlHeight - t * i) / 2 - e.lineWidth, 0),
		paddingBlockSM: Math.max((e.controlHeightSM - n * a) / 2 - e.lineWidth, 0),
		paddingBlockLG: Math.max((e.controlHeightLG - r * o) / 2 - e.lineWidth, 0),
		defaultBgDisabled: l,
		dashedBgDisabled: u
	};
}, bd = (e) => {
	let { componentCls: t, antCls: n, lineWidth: r, lineType: i } = e, [a, o] = ho(n, "btn");
	return { [t]: [
		{
			[a("border-width")]: r,
			[a("border-color")]: "#000",
			[a("border-color-hover")]: o("border-color"),
			[a("border-color-active")]: o("border-color"),
			[a("border-color-disabled")]: o("border-color"),
			[a("border-style")]: i,
			[a("text-color")]: "#000",
			[a("text-color-hover")]: o("text-color"),
			[a("text-color-active")]: o("text-color"),
			[a("text-color-disabled")]: o("text-color"),
			[a("bg-color")]: "#ddd",
			[a("bg-color-hover")]: o("bg-color"),
			[a("bg-color-active")]: o("bg-color"),
			[a("bg-color-disabled")]: e.colorBgContainerDisabled,
			[a("bg-color-container")]: e.colorBgContainer,
			[a("shadow")]: "none"
		},
		{
			border: [
				o("border-width"),
				o("border-style"),
				o("border-color")
			].join(" "),
			color: o("text-color"),
			backgroundColor: o("bg-color"),
			[`&:not(:disabled):not(${t}-disabled)`]: {
				"&:hover": {
					border: [
						o("border-width"),
						o("border-style"),
						o("border-color-hover")
					].join(" "),
					color: o("text-color-hover"),
					backgroundColor: o("bg-color-hover")
				},
				"&:active": {
					border: [
						o("border-width"),
						o("border-style"),
						o("border-color-active")
					].join(" "),
					color: o("text-color-active"),
					backgroundColor: o("bg-color-active")
				}
			}
		},
		{
			[`&${t}-variant-solid`]: {
				[a("solid-bg-color")]: o("color-base"),
				[a("solid-bg-color-hover")]: o("color-hover"),
				[a("solid-bg-color-active")]: o("color-active"),
				[a("border-color")]: "transparent",
				[a("text-color")]: e.colorTextLightSolid,
				[a("bg-color")]: o("solid-bg-color"),
				[a("bg-color-hover")]: o("solid-bg-color-hover"),
				[a("bg-color-active")]: o("solid-bg-color-active"),
				boxShadow: o("shadow")
			},
			[`&${t}-variant-outlined, &${t}-variant-dashed`]: {
				[a("border-color")]: o("color-base"),
				[a("border-color-hover")]: o("color-hover"),
				[a("border-color-active")]: o("color-active"),
				[a("bg-color")]: o("bg-color-container"),
				[a("text-color")]: o("color-base"),
				[a("text-color-hover")]: o("color-hover"),
				[a("text-color-active")]: o("color-active"),
				boxShadow: o("shadow")
			},
			[`&${t}-variant-dashed`]: {
				[a("border-style")]: "dashed",
				[a("bg-color-disabled")]: e.dashedBgDisabled
			},
			[`&${t}-variant-filled`]: {
				[a("border-color")]: "transparent",
				[a("text-color")]: o("color-base"),
				[a("bg-color")]: o("color-light"),
				[a("bg-color-hover")]: o("color-light-hover"),
				[a("bg-color-active")]: o("color-light-active")
			},
			[`&${t}-variant-text, &${t}-variant-link`]: {
				[a("border-color")]: "transparent",
				[a("text-color")]: o("color-base"),
				[a("text-color-hover")]: o("color-hover"),
				[a("text-color-active")]: o("color-active"),
				[a("bg-color")]: "transparent",
				[a("bg-color-hover")]: "transparent",
				[a("bg-color-active")]: "transparent",
				[`&:disabled, &${e.componentCls}-disabled`]: {
					background: "transparent",
					borderColor: "transparent"
				}
			},
			[`&${t}-variant-text`]: {
				[a("bg-color-hover")]: o("color-light"),
				[a("bg-color-active")]: o("color-light-active")
			}
		},
		{
			[`&${t}-variant-link`]: {
				[a("color-base")]: e.colorLink,
				[a("color-hover")]: e.colorLinkHover,
				[a("color-active")]: e.colorLinkActive,
				[a("bg-color-hover")]: e.linkHoverBg
			},
			[`&${t}-color-primary`]: {
				[a("color-base")]: e.colorPrimary,
				[a("color-hover")]: e.colorPrimaryHover,
				[a("color-active")]: e.colorPrimaryActive,
				[a("color-light")]: e.colorPrimaryBg,
				[a("color-light-hover")]: e.colorPrimaryBgHover,
				[a("color-light-active")]: e.colorPrimaryBorder,
				[a("shadow")]: e.primaryShadow,
				[`&${t}-variant-solid`]: {
					[a("text-color")]: e.primaryColor,
					[a("text-color-hover")]: o("text-color"),
					[a("text-color-active")]: o("text-color")
				}
			},
			[`&${t}-color-dangerous`]: {
				[a("color-base")]: e.colorError,
				[a("color-hover")]: e.colorErrorHover,
				[a("color-active")]: e.colorErrorActive,
				[a("color-light")]: e.colorErrorBg,
				[a("color-light-hover")]: e.colorErrorBgFilledHover,
				[a("color-light-active")]: e.colorErrorBgActive,
				[a("shadow")]: e.dangerShadow,
				[`&${t}-variant-solid`]: {
					[a("text-color")]: e.dangerColor,
					[a("text-color-hover")]: o("text-color"),
					[a("text-color-active")]: o("text-color")
				}
			},
			[`&${t}-color-default`]: {
				[a("solid-bg-color")]: e.colorBgSolid,
				[a("solid-bg-color-hover")]: e.colorBgSolidHover,
				[a("solid-bg-color-active")]: e.colorBgSolidActive,
				[a("color-base")]: e.defaultBorderColor,
				[a("color-hover")]: e.defaultHoverBorderColor,
				[a("color-active")]: e.defaultActiveBorderColor,
				[a("color-light")]: e.colorFillTertiary,
				[a("color-light-hover")]: e.colorFillSecondary,
				[a("color-light-active")]: e.colorFill,
				[a("text-color")]: e.defaultColor,
				[a("text-color-hover")]: e.defaultHoverColor,
				[a("text-color-active")]: e.defaultActiveColor,
				[a("shadow")]: e.defaultShadow,
				[`&${t}-variant-outlined`]: { [a("bg-color-disabled")]: e.defaultBgDisabled },
				[`&${t}-variant-solid`]: {
					[a("text-color")]: e.solidTextColor,
					[a("text-color-hover")]: o("text-color"),
					[a("text-color-active")]: o("text-color")
				},
				[`&${t}-variant-filled, &${t}-variant-text`]: {
					[a("text-color-hover")]: o("text-color"),
					[a("text-color-active")]: o("text-color")
				},
				[`&${t}-variant-outlined, &${t}-variant-dashed`]: {
					[a("text-color")]: e.defaultColor,
					[a("text-color-hover")]: e.defaultHoverColor,
					[a("text-color-active")]: e.defaultActiveColor,
					[a("bg-color-container")]: e.defaultBg,
					[a("bg-color-hover")]: e.defaultHoverBg,
					[a("bg-color-active")]: e.defaultActiveBg
				},
				[`&${t}-variant-text`]: {
					[a("text-color")]: e.textTextColor,
					[a("text-color-hover")]: e.textTextHoverColor,
					[a("text-color-active")]: e.textTextActiveColor,
					[a("bg-color-hover")]: e.textHoverBg
				},
				[`&${t}-background-ghost`]: { [`&${t}-variant-outlined, &${t}-variant-dashed`]: {
					[a("text-color")]: e.defaultGhostColor,
					[a("border-color")]: e.defaultGhostBorderColor
				} }
			}
		},
		Ii.map((n) => {
			let r = e[`${n}6`], i = e[`${n}1`], o = e[`${n}Hover`], s = e[`${n}2`], c = e[`${n}3`], l = e[`${n}Active`], u = e[`${n}ShadowColor`];
			return { [`&${t}-color-${n}`]: {
				[a("color-base")]: r,
				[a("color-hover")]: o,
				[a("color-active")]: l,
				[a("color-light")]: i,
				[a("color-light-hover")]: s,
				[a("color-light-active")]: c,
				[a("shadow")]: u
			} };
		}),
		{ [`&:disabled, &${e.componentCls}-disabled`]: {
			cursor: "not-allowed",
			borderColor: e.colorBorderDisabled,
			background: o("bg-color-disabled"),
			color: e.colorTextDisabled,
			boxShadow: "none"
		} },
		{ [`&${t}-background-ghost`]: {
			[a("bg-color")]: e.ghostBg,
			[a("bg-color-hover")]: e.ghostBg,
			[a("bg-color-active")]: e.ghostBg,
			[a("shadow")]: "none",
			[`&${t}-variant-outlined, &${t}-variant-dashed`]: {
				[a("bg-color-hover")]: e.ghostBg,
				[a("bg-color-active")]: e.ghostBg
			}
		} }
	] };
}, xd = (e) => {
	let { componentCls: t, iconCls: n, fontWeight: r, opacityLoading: i, motionDurationSlow: a, motionEaseInOut: o, iconGap: s, calc: c } = e;
	return { [t]: {
		outline: "none",
		position: "relative",
		display: "inline-flex",
		gap: s,
		alignItems: "center",
		justifyContent: "center",
		fontWeight: r,
		whiteSpace: "nowrap",
		textAlign: "center",
		backgroundImage: "none",
		cursor: "pointer",
		transition: `all ${e.motionDurationMid} ${e.motionEaseInOut}`,
		userSelect: "none",
		touchAction: "manipulation",
		...sd(),
		"&:disabled > *": { pointerEvents: "none" },
		[`${t}-icon > svg`]: io(),
		[`${t}-icon`]: {
			display: "inline-flex",
			alignItems: "center",
			[n]: {
				verticalAlign: "middle",
				"&:before": {
					content: "\"\\a0\"",
					display: "inline-block",
					width: 0
				}
			}
		},
		"> a": { color: "currentColor" },
		"&:not(:disabled)": so(e),
		[`&${t}-two-chinese-chars::first-letter`]: { letterSpacing: "0.34em" },
		[`&${t}-two-chinese-chars > *:not(${n})`]: {
			marginInlineEnd: "-0.34em",
			letterSpacing: "0.34em"
		},
		[`&${t}-icon-only`]: {
			paddingInline: 0,
			[`&${t}-compact-item`]: { flex: "none" }
		},
		[`&${t}-loading`]: {
			opacity: i,
			cursor: "default"
		},
		[`${t}-loading-icon`]: { transition: [
			"width",
			"opacity",
			"margin"
		].map((e) => `${e} ${a} ${o}`).join(",") },
		[`&:not(${t}-icon-end)`]: { [`${t}-loading-icon-motion`]: {
			"&-appear-start, &-enter-start, &-appear-prepare, &-enter-prepare": {
				marginInlineEnd: c(s).mul(-1).equal(),
				opacity: 0
			},
			"&-appear-active, &-enter-active": { marginInlineEnd: 0 },
			"&-leave-start": { marginInlineEnd: 0 },
			"&-leave-active": { marginInlineEnd: c(s).mul(-1).equal() }
		} },
		"&-icon-end": {
			flexDirection: "row-reverse",
			[`${t}-loading-icon-motion`]: {
				"&-appear-start, &-enter-start, &-appear-prepare, &-enter-prepare": {
					marginInlineStart: c(s).mul(-1).equal(),
					opacity: 0
				},
				"&-appear-active, &-enter-active": { marginInlineStart: 0 },
				"&-leave-start": { marginInlineStart: 0 },
				"&-leave-active": { marginInlineStart: c(s).mul(-1).equal() }
			}
		}
	} };
}, Sd = (e) => ({
	minWidth: e.controlHeight,
	paddingInline: 0,
	borderRadius: "50%"
}), Cd = (e, t = "") => {
	let { componentCls: n, controlHeight: r, fontSize: i, borderRadius: a, buttonPaddingHorizontal: o, iconCls: s, buttonPaddingVertical: c, buttonIconOnlyFontSize: l } = e;
	return [
		{ [t]: {
			fontSize: i,
			height: r,
			padding: `${nn(c)} ${nn(o)}`,
			borderRadius: a,
			[`&${n}-icon-only`]: {
				width: r,
				[s]: { fontSize: l }
			}
		} },
		{ [`${n}${n}-circle${t}`]: Sd(e) },
		{ [`${n}${n}-round${t}`]: {
			borderRadius: e.controlHeight,
			[`&:not(${n}-icon-only)`]: { paddingInline: e.buttonPaddingHorizontal }
		} }
	];
}, wd = (e) => Cd(Ti(e, { fontSize: e.contentFontSize }), e.componentCls), Td = (e) => Cd(Ti(e, {
	controlHeight: e.controlHeightSM,
	fontSize: e.contentFontSizeSM,
	padding: e.paddingXS,
	buttonPaddingHorizontal: e.paddingInlineSM,
	buttonPaddingVertical: 0,
	borderRadius: e.borderRadiusSM,
	buttonIconOnlyFontSize: e.onlyIconSizeSM
}), `${e.componentCls}-sm`), Ed = (e) => Cd(Ti(e, {
	controlHeight: e.controlHeightLG,
	fontSize: e.contentFontSizeLG,
	buttonPaddingHorizontal: e.paddingInlineLG,
	buttonPaddingVertical: 0,
	borderRadius: e.borderRadiusLG,
	buttonIconOnlyFontSize: e.onlyIconSizeLG
}), `${e.componentCls}-lg`), Dd = (e) => {
	let { componentCls: t } = e;
	return { [t]: { [`&${t}-block`]: { width: "100%" } } };
}, Od = fo("Button", (e) => {
	let t = vd(e);
	return [
		xd(t),
		wd(t),
		Td(t),
		Ed(t),
		Dd(t),
		bd(t),
		ld(t)
	];
}, yd, { unitless: {
	fontWeight: !0,
	contentLineHeight: !0,
	contentLineHeightSM: !0,
	contentLineHeightLG: !0
} });
// node_modules/antd/es/style/compact-item.js
function kd(e, t, n, r) {
	let { focusElCls: i, focus: a, borderElCls: o } = n, s = o ? "> *" : "", c = s ? ` ${s}` : "", l = (e) => e.filter(Boolean).map((e) => `&:${e}${c}`).join(","), u = l(["hover", i ? `hover${i}` : null]), d = l([a ? "focus" : null, "active"]);
	return {
		[`&-item:not(${t}-last-item)`]: { marginInlineEnd: e.calc(e.lineWidth).mul(-1).equal() },
		[`&-item:not(${r}-status-success)`]: { zIndex: 2 },
		"&-item": {
			[d]: { zIndex: 3 },
			[u]: { zIndex: 4 },
			...i ? { [`&${i}`]: { zIndex: 3 } } : {},
			[`&[disabled] ${s}`]: { zIndex: 0 }
		}
	};
}
function Ad(e, t, n) {
	let { borderElCls: r } = n, i = r ? `> ${r}` : "";
	return {
		[`&-item:not(${t}-first-item):not(${t}-last-item) ${i}`]: { borderRadius: 0 },
		[`&-item:not(${t}-last-item)${t}-first-item`]: { [`& ${i}, &${e}-sm ${i}, &${e}-lg ${i}`]: {
			borderStartEndRadius: 0,
			borderEndEndRadius: 0
		} },
		[`&-item:not(${t}-first-item)${t}-last-item`]: { [`& ${i}, &${e}-sm ${i}, &${e}-lg ${i}`]: {
			borderStartStartRadius: 0,
			borderEndStartRadius: 0
		} }
	};
}
function jd(e, t = { focus: !0 }) {
	let { componentCls: n } = e, { componentCls: r } = t, i = r || n, a = `${i}-compact`;
	return { [a]: {
		...kd(e, a, t, i),
		...Ad(i, a, t)
	} };
}
// node_modules/antd/es/style/compact-item-vertical.js
function Md(e, t, n) {
	return {
		[`&-item:not(${t}-last-item)`]: { marginBottom: e.calc(e.lineWidth).mul(-1).equal() },
		[`&-item:not(${n}-status-success)`]: { zIndex: 2 },
		"&-item": {
			"&:focus,&:active": { zIndex: 3 },
			"&:hover": { zIndex: 4 },
			"&[disabled]": { zIndex: 0 }
		}
	};
}
function Nd(e, t) {
	return {
		[`&-item:not(${t}-first-item):not(${t}-last-item)`]: { borderRadius: 0 },
		[`&-item${t}-first-item:not(${t}-last-item)`]: { [`&, &${e}-sm, &${e}-lg`]: {
			borderEndEndRadius: 0,
			borderEndStartRadius: 0
		} },
		[`&-item${t}-last-item:not(${t}-first-item)`]: { [`&, &${e}-sm, &${e}-lg`]: {
			borderStartStartRadius: 0,
			borderStartEndRadius: 0
		} }
	};
}
function Pd(e) {
	let t = `${e.componentCls}-compact-vertical`;
	return { [t]: {
		...Md(e, t, e.componentCls),
		...Nd(e.componentCls, t)
	} };
}
// node_modules/antd/es/button/style/compact.js
var Fd = (e) => {
	let { antCls: t, componentCls: n, lineWidth: r, calc: i, colorBgContainer: a } = e, o = `${n}-variant-solid:not([disabled])`, s = i(r).mul(-1).equal(), [c, l] = ho(t, "btn"), u = (e) => ({ [`${n}-compact${e ? "-vertical" : ""}-item`]: {
		[c("compact-connect-border-color")]: l("bg-color-hover"),
		[`&${o}`]: {
			transition: "none",
			[`& + ${o}:before`]: [{
				position: "absolute",
				backgroundColor: l("compact-connect-border-color"),
				content: "\"\""
			}, e ? {
				top: s,
				insetInline: s,
				height: r
			} : {
				insetBlock: s,
				insetInlineStart: s,
				width: r
			}],
			"&:hover:before": { display: "none" }
		}
	} });
	return [
		u(),
		u(!0),
		{ [`${o}${n}-color-default`]: { [c("compact-connect-border-color")]: `color-mix(in srgb, ${l("bg-color-hover")} 75%, ${a})` } }
	];
}, Id = mo(["Button", "compact"], (e) => {
	let t = vd(e);
	return [
		jd(t),
		Pd(t),
		Fd(t)
	];
}, yd);
// node_modules/antd/es/button/Button.js
function Ld(e) {
	if ($s(e)) {
		let t = e?.delay;
		return t = Zs(t) ? t : 0, {
			loading: t <= 0,
			delay: t
		};
	}
	return {
		loading: !!e,
		delay: 0
	};
}
var Rd = {
	default: ["default", "outlined"],
	primary: ["primary", "solid"],
	dashed: ["default", "dashed"],
	link: ["link", "link"],
	text: ["default", "text"]
}, zd = /* @__PURE__ */ g.forwardRef((e, t) => {
	let { _skipSemantic: n, loading: r = !1, prefixCls: i, color: a, variant: o, type: s, danger: c = !1, shape: l, size: u, disabled: d, className: f, rootClassName: p, children: m, icon: h, iconPosition: _, iconPlacement: v, ghost: y = !1, block: x = !1, htmlType: S = "button", classNames: C, styles: w, style: T, autoInsertSpace: E, autoFocus: D, ...O } = e, A = Ve(m), j = s || "default", { getPrefixCls: M, direction: N, autoInsertSpace: P, className: F, style: I, classNames: L, styles: R, loadingIcon: z, shape: ee, color: B, variant: V } = Mt("button"), H = l || ee || "default", [te, ne] = (0, g.useMemo)(() => {
		if (a && o) return [a, o];
		if (s || c) {
			let e = Rd[j] || [];
			return c ? ["danger", e[1]] : e;
		}
		return o === "solid" ? ["primary", o] : B && V ? [B, V] : V === "solid" ? ["primary", V] : ["default", "outlined"];
	}, [
		a,
		o,
		s,
		c,
		B,
		V,
		j
	]), [U, ie] = (0, g.useMemo)(() => y && ne === "solid" ? [te, "outlined"] : [te, ne], [
		te,
		ne,
		y
	]), ae = U === "danger", oe = ae ? "dangerous" : U, se = E ?? P ?? !0, W = M("btn", i), [ce, le] = Od(W), ue = (0, g.useContext)(Hl), G = d ?? ue, de = (0, g.useContext)(ku), K = (0, g.useMemo)(() => Ld(r), [r]), [q, fe] = k(K.loading), [pe, me] = (0, g.useState)(!1), J = (0, g.useRef)(null), Y = re(t, J), he = A.length === 1 && !h && !Nu(ie), ge = (0, g.useRef)(!0);
	g.useEffect(() => (ge.current = !1, () => {
		ge.current = !0;
	}), []), b(() => {
		K.delay > 0 ? fe(!0, { ms: K.delay }) : fe(K.loading, !0);
	}, [K.delay, K.loading]), (0, g.useEffect)(() => {
		if (!J.current || !se) return;
		let e = J.current.textContent || "";
		he && Mu(e) ? pe || me(!0) : pe && me(!1);
	}), (0, g.useEffect)(() => {
		D && J.current?.focus();
	}, []);
	let _e = g.useCallback((t) => {
		q || G ? t.preventDefault() : e.onClick?.(("href" in e, t));
	}, [
		e.onClick,
		q,
		G
	]), { compactSize: ve, compactItemClassnames: ye } = Du(W, N), be = Tu((e) => u ?? ve ?? de ?? e), X = q ? "loading" : h, xe = v ?? _ ?? "start", Se = Fe(O, ["navigate"]), Ce = {
		...e,
		type: j,
		color: U,
		variant: ie,
		danger: ae,
		shape: H,
		size: be,
		disabled: G,
		loading: q,
		iconPlacement: xe
	}, we = sc(I), Te = sc(T), [Ee, De] = lc([n ? void 0 : L, C], [
		n ? void 0 : R,
		we,
		w,
		Te
	], { props: Ce }), Oe = Z(W, ce, le, {
		[`${W}-${H}`]: H !== "default" && H !== "square" && H,
		[`${W}-${j}`]: j,
		[`${W}-dangerous`]: c,
		[`${W}-color-${oe}`]: oe,
		[`${W}-variant-${ie}`]: ie,
		[`${W}-lg`]: be === "large",
		[`${W}-sm`]: be === "small",
		[`${W}-icon-only`]: !m && m !== 0 && !!X,
		[`${W}-background-ghost`]: y && !Nu(ie),
		[`${W}-loading`]: q,
		[`${W}-two-chinese-chars`]: pe && se && !q,
		[`${W}-block`]: x,
		[`${W}-rtl`]: N === "rtl",
		[`${W}-icon-end`]: xe === "end"
	}, ye, f, p, F, Ee.root), ke = {
		className: Ee.icon,
		style: De.icon
	}, Ae = (e) => /*#__PURE__*/ g.createElement(Iu, {
		prefixCls: W,
		...ke
	}, e), je = /*#__PURE__*/ g.createElement(Bu, {
		existIcon: !!h,
		prefixCls: W,
		loading: q,
		mount: ge.current,
		...ke
	}), Me = $s(r) && r.icon || z, Ne;
	Ne = h && !q ? Ae(h) : q && Me ? Ae(Me) : je;
	let Ie = Pe(m) ? Fu(m, he && se, De.content, Ee.content) : null;
	if (Se.href !== void 0) return /*#__PURE__*/ g.createElement("a", {
		...Se,
		className: Z(Oe, { [`${W}-disabled`]: G }),
		href: G ? void 0 : Se.href,
		style: De.root,
		onClick: _e,
		ref: Y,
		tabIndex: G ? -1 : 0,
		"aria-disabled": G
	}, Ne, Ie);
	let Le = /*#__PURE__*/ g.createElement("button", {
		...O,
		type: S,
		className: Oe,
		style: De.root,
		onClick: _e,
		disabled: G,
		ref: Y
	}, Ne, Ie, ye && /*#__PURE__*/ g.createElement(Id, { prefixCls: W }));
	return Nu(ie) || (Le = /*#__PURE__*/ g.createElement(wu, {
		component: "Button",
		disabled: q
	}, Le)), Le;
});
zd.Group = Au, zd.__ANT_BUTTON = !0;
// node_modules/@rc-component/form/es/FieldContext.js
var Bd = "RC_FORM_INTERNAL_HOOKS", Vd = () => {
	Ae(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
}, Hd = /*#__PURE__*/ g.createContext({
	getFieldValue: Vd,
	getFieldsValue: Vd,
	getFieldError: Vd,
	getFieldWarning: Vd,
	getFieldsError: Vd,
	isFieldsTouched: Vd,
	isFieldTouched: Vd,
	isFieldValidating: Vd,
	isFieldsValidating: Vd,
	resetFields: Vd,
	setFields: Vd,
	setFieldValue: Vd,
	setFieldsValue: Vd,
	validateFields: Vd,
	submit: Vd,
	getInternalHooks: () => (Vd(), {
		dispatch: Vd,
		initEntityValue: Vd,
		registerField: Vd,
		useSubscribe: Vd,
		setInitialValues: Vd,
		destroyForm: Vd,
		setCallbacks: Vd,
		registerWatch: Vd,
		getFields: Vd,
		setValidateMessages: Vd,
		setPreserve: Vd,
		getInitialValue: Vd
	})
}), Ud = /*#__PURE__*/ g.createContext(null);
// node_modules/@rc-component/form/es/utils/typeUtil.js
function Wd(e) {
	return e == null ? [] : Array.isArray(e) ? e : [e];
}
function Gd(e) {
	return e && !!e._init;
}
// node_modules/@rc-component/async-validator/es/messages.js
function Kd() {
	return {
		default: "Validation error on field %s",
		required: "%s is required",
		enum: "%s must be one of %s",
		whitespace: "%s cannot be empty",
		date: {
			format: "%s date %s is invalid for format %s",
			parse: "%s date could not be parsed, %s is invalid ",
			invalid: "%s date %s is invalid"
		},
		types: {
			string: "%s is not a %s",
			method: "%s is not a %s (function)",
			array: "%s is not an %s",
			object: "%s is not an %s",
			number: "%s is not a %s",
			date: "%s is not a %s",
			boolean: "%s is not a %s",
			integer: "%s is not an %s",
			float: "%s is not a %s",
			regexp: "%s is not a valid %s",
			email: "%s is not a valid %s",
			tel: "%s is not a valid %s",
			url: "%s is not a valid %s",
			hex: "%s is not a valid %s"
		},
		string: {
			len: "%s must be exactly %s characters",
			min: "%s must be at least %s characters",
			max: "%s cannot be longer than %s characters",
			range: "%s must be between %s and %s characters"
		},
		number: {
			len: "%s must equal %s",
			min: "%s cannot be less than %s",
			max: "%s cannot be greater than %s",
			range: "%s must be between %s and %s"
		},
		array: {
			len: "%s must be exactly %s in length",
			min: "%s cannot be less than %s in length",
			max: "%s cannot be greater than %s in length",
			range: "%s must be between %s and %s in length"
		},
		pattern: { mismatch: "%s value %s does not match pattern %s" },
		clone() {
			let e = JSON.parse(JSON.stringify(this));
			return e.clone = this.clone, e;
		}
	};
}
var qd = Kd(), Jd = /%[sdj%]/g, Yd = () => {};
typeof process < "u" && process.env;
function Xd(e) {
	if (!e || !e.length) return null;
	let t = {};
	return e.forEach((e) => {
		let n = e.field;
		t[n] = t[n] || [], t[n].push(e);
	}), t;
}
function Zd(e, ...t) {
	let n = 0, r = t.length;
	return typeof e == "function" ? e.apply(null, t) : typeof e == "string" ? e.replace(Jd, (e) => {
		if (e === "%%") return "%";
		if (n >= r) return e;
		switch (e) {
			case "%s": return String(t[n++]);
			case "%d": return Number(t[n++]);
			case "%j": try {
				return JSON.stringify(t[n++]);
			} catch {
				return "[Circular]";
			}
			default: return e;
		}
	}) : e;
}
function Qd(e) {
	return e === "string" || e === "url" || e === "hex" || e === "email" || e === "date" || e === "pattern" || e === "tel";
}
function $d(e, t) {
	return !!(e == null || t === "array" && Array.isArray(e) && !e.length || Qd(t) && typeof e == "string" && !e);
}
function ef(e, t, n) {
	let r = [], i = 0, a = e.length;
	function o(e) {
		r.push(...e || []), i++, i === a && n(r);
	}
	e.forEach((e) => {
		t(e, o);
	});
}
function tf(e, t, n) {
	let r = 0, i = e.length;
	function a(o) {
		if (o && o.length) {
			n(o);
			return;
		}
		let s = r;
		r += 1, s < i ? t(e[s], a) : n([]);
	}
	a([]);
}
function nf(e) {
	let t = [];
	return Object.keys(e).forEach((n) => {
		t.push(...e[n] || []);
	}), t;
}
var rf = class extends Error {
	errors;
	fields;
	constructor(e, t) {
		super("Async Validation Error"), this.errors = e, this.fields = t;
	}
};
function af(e, t, n, r, i) {
	if (t.first) {
		let t = new Promise((t, a) => {
			tf(nf(e), n, (e) => (r(e), e.length ? a(new rf(e, Xd(e))) : t(i)));
		});
		return t.catch((e) => e), t;
	}
	let a = t.firstFields === !0 ? Object.keys(e) : t.firstFields || [], o = Object.keys(e), s = o.length, c = 0, l = [], u = new Promise((t, u) => {
		let d = (e) => {
			if (l.push.apply(l, e), c++, c === s) return r(l), l.length ? u(new rf(l, Xd(l))) : t(i);
		};
		o.length || (r(l), t(i)), o.forEach((t) => {
			let r = e[t];
			a.indexOf(t) === -1 ? ef(r, n, d) : tf(r, n, d);
		});
	});
	return u.catch((e) => e), u;
}
function of(e) {
	return !!(e && e.message !== void 0);
}
function sf(e, t) {
	let n = e;
	for (let e = 0; e < t.length; e++) {
		if (n == null) return n;
		n = n[t[e]];
	}
	return n;
}
function cf(e, t) {
	return (n) => {
		let r;
		return r = e.fullFields ? sf(t, e.fullFields) : t[n.field || e.fullField], of(n) ? (n.field = n.field || e.fullField, n.fieldValue = r, n) : {
			message: typeof n == "function" ? n() : n,
			fieldValue: r,
			field: n.field || e.fullField
		};
	};
}
function lf(e, t) {
	if (t) {
		for (let n in t) if (t.hasOwnProperty(n)) {
			let r = t[n];
			e[n] = typeof r == "object" && typeof e[n] == "object" ? {
				...e[n],
				...r
			} : r;
		}
	}
	return e;
}
// node_modules/@rc-component/async-validator/es/rule/enum.js
var uf = "enum", df = (e, t, n, r, i) => {
	e[uf] = Array.isArray(e[uf]) ? e[uf] : [], e[uf].indexOf(t) === -1 && r.push(Zd(i.messages[uf], e.fullField, e[uf].join(", ")));
}, ff = (e, t, n, r, i) => {
	e.pattern && (e.pattern instanceof RegExp ? (e.pattern.lastIndex = 0, e.pattern.test(t) || r.push(Zd(i.messages.pattern.mismatch, e.fullField, t, e.pattern))) : typeof e.pattern == "string" && (new RegExp(e.pattern).test(t) || r.push(Zd(i.messages.pattern.mismatch, e.fullField, t, e.pattern))));
}, pf = (e, t, n, r, i) => {
	let a = typeof e.len == "number", o = typeof e.min == "number", s = typeof e.max == "number", c = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, l = t, u = null, d = typeof t == "number", f = typeof t == "string", p = Array.isArray(t);
	if (d ? u = "number" : f ? u = "string" : p && (u = "array"), !u) return !1;
	p && (l = t.length), f && (l = t.replace(c, "_").length), a ? l !== e.len && r.push(Zd(i.messages[u].len, e.fullField, e.len)) : o && !s && l < e.min ? r.push(Zd(i.messages[u].min, e.fullField, e.min)) : s && !o && l > e.max ? r.push(Zd(i.messages[u].max, e.fullField, e.max)) : o && s && (l < e.min || l > e.max) && r.push(Zd(i.messages[u].range, e.fullField, e.min, e.max));
}, mf = (e, t, n, r, i, a) => {
	e.required && (!n.hasOwnProperty(e.field) || $d(t, a || e.type)) && r.push(Zd(i.messages.required, e.fullField));
}, hf, gf = (() => {
	if (hf) return hf;
	let e = "[a-fA-F\\d:]", t = (t) => t && t.includeBoundaries ? `(?:(?<=\\s|^)(?=${e})|(?<=${e})(?=\\s|$))` : "", n = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}", r = "[a-fA-F\\d]{1,4}", i = `(?:${[
		`(?:${r}:){7}(?:${r}|:)`,
		`(?:${r}:){6}(?:${n}|:${r}|:)`,
		`(?:${r}:){5}(?::${n}|(?::${r}){1,2}|:)`,
		`(?:${r}:){4}(?:(?::${r}){0,1}:${n}|(?::${r}){1,3}|:)`,
		`(?:${r}:){3}(?:(?::${r}){0,2}:${n}|(?::${r}){1,4}|:)`,
		`(?:${r}:){2}(?:(?::${r}){0,3}:${n}|(?::${r}){1,5}|:)`,
		`(?:${r}:){1}(?:(?::${r}){0,4}:${n}|(?::${r}){1,6}|:)`,
		`(?::(?:(?::${r}){0,5}:${n}|(?::${r}){1,7}|:))`
	].join("|")})(?:%[0-9a-zA-Z]{1,})?`, a = RegExp(`(?:^${n}$)|(?:^${i}$)`), o = RegExp(`^${n}$`), s = RegExp(`^${i}$`), c = (e) => e && e.exact ? a : RegExp(`(?:${t(e)}${n}${t(e)})|(?:${t(e)}${i}${t(e)})`, "g");
	c.v4 = (e) => e && e.exact ? o : RegExp(`${t(e)}${n}${t(e)}`, "g"), c.v6 = (e) => e && e.exact ? s : RegExp(`${t(e)}${i}${t(e)}`, "g");
	let l = `(?:(?:(?:[a-z]+:)?//)|www\\.)(?:\\S+(?::\\S*)?@)?(?:localhost|${c.v4().source}|${c.v6().source}|(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:[/?#][^\\s"]*)?`;
	return hf = RegExp(`(?:^${l}$)`, "i"), hf;
}), _f = {
	email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
	tel: /^(\+[0-9]{1,3}[-\s\u2011]?)?(\([0-9]{1,4}\)[-\s\u2011]?)?([0-9]+[-\s\u2011]?)*[0-9]+$/,
	hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
}, vf = {
	integer(e) {
		return vf.number(e) && parseInt(e, 10) === e;
	},
	float(e) {
		return vf.number(e) && !vf.integer(e);
	},
	array(e) {
		return Array.isArray(e);
	},
	regexp(e) {
		if (e instanceof RegExp) return !0;
		try {
			return !!new RegExp(e);
		} catch {
			return !1;
		}
	},
	date(e) {
		return typeof e.getTime == "function" && typeof e.getMonth == "function" && typeof e.getYear == "function" && !isNaN(e.getTime());
	},
	number(e) {
		return !isNaN(e) && typeof e == "number";
	},
	object(e) {
		return typeof e == "object" && !vf.array(e);
	},
	method(e) {
		return typeof e == "function";
	},
	email(e) {
		return typeof e == "string" && e.length <= 320 && !!e.match(_f.email);
	},
	tel(e) {
		return typeof e == "string" && e.length <= 32 && !!e.match(_f.tel);
	},
	url(e) {
		return typeof e == "string" && e.length <= 2048 && !!e.match(gf());
	},
	hex(e) {
		return typeof e == "string" && !!e.match(_f.hex);
	}
}, yf = {
	required: mf,
	whitespace: (e, t, n, r, i) => {
		(/^\s+$/.test(t) || t === "") && r.push(Zd(i.messages.whitespace, e.fullField));
	},
	type: (e, t, n, r, i) => {
		if (e.required && t === void 0) {
			mf(e, t, n, r, i);
			return;
		}
		let a = [
			"integer",
			"float",
			"array",
			"regexp",
			"object",
			"method",
			"email",
			"tel",
			"number",
			"date",
			"url",
			"hex"
		], o = e.type;
		a.indexOf(o) > -1 ? vf[o](t) || r.push(Zd(i.messages.types[o], e.fullField, e.type)) : o && typeof t !== e.type && r.push(Zd(i.messages.types[o], e.fullField, e.type));
	},
	range: pf,
	enum: df,
	pattern: ff
}, bf = (e, t, n, r, i) => {
	let a = [];
	if (e.required || !e.required && r.hasOwnProperty(e.field)) {
		if ($d(t) && !e.required) return n();
		yf.required(e, t, r, a, i);
	}
	n(a);
}, xf = (e, t, n, r, i) => {
	let a = [];
	if (e.required || !e.required && r.hasOwnProperty(e.field)) {
		if (t == null && !e.required) return n();
		yf.required(e, t, r, a, i, "array"), t != null && (yf.type(e, t, r, a, i), yf.range(e, t, r, a, i));
	}
	n(a);
}, Sf = (e, t, n, r, i) => {
	let a = [];
	if (e.required || !e.required && r.hasOwnProperty(e.field)) {
		if ($d(t) && !e.required) return n();
		yf.required(e, t, r, a, i), t !== void 0 && yf.type(e, t, r, a, i);
	}
	n(a);
}, Cf = (e, t, n, r, i) => {
	let a = [];
	if (e.required || !e.required && r.hasOwnProperty(e.field)) {
		if ($d(t, "date") && !e.required) return n();
		if (yf.required(e, t, r, a, i), !$d(t, "date")) {
			let n;
			n = t instanceof Date ? t : new Date(t), yf.type(e, n, r, a, i), n && yf.range(e, n.getTime(), r, a, i);
		}
	}
	n(a);
}, wf = "enum", Tf = (e, t, n, r, i) => {
	let a = [];
	if (e.required || !e.required && r.hasOwnProperty(e.field)) {
		if ($d(t) && !e.required) return n();
		yf.required(e, t, r, a, i), t !== void 0 && yf[wf](e, t, r, a, i);
	}
	n(a);
}, Ef = (e, t, n, r, i) => {
	let a = [];
	if (e.required || !e.required && r.hasOwnProperty(e.field)) {
		if ($d(t) && !e.required) return n();
		yf.required(e, t, r, a, i), t !== void 0 && (yf.type(e, t, r, a, i), yf.range(e, t, r, a, i));
	}
	n(a);
}, Df = (e, t, n, r, i) => {
	let a = [];
	if (e.required || !e.required && r.hasOwnProperty(e.field)) {
		if ($d(t) && !e.required) return n();
		yf.required(e, t, r, a, i), t !== void 0 && (yf.type(e, t, r, a, i), yf.range(e, t, r, a, i));
	}
	n(a);
}, Of = (e, t, n, r, i) => {
	let a = [];
	if (e.required || !e.required && r.hasOwnProperty(e.field)) {
		if ($d(t) && !e.required) return n();
		yf.required(e, t, r, a, i), t !== void 0 && yf.type(e, t, r, a, i);
	}
	n(a);
}, kf = (e, t, n, r, i) => {
	let a = [];
	if (e.required || !e.required && r.hasOwnProperty(e.field)) {
		if (t === "" && (t = void 0), $d(t) && !e.required) return n();
		yf.required(e, t, r, a, i), t !== void 0 && (yf.type(e, t, r, a, i), yf.range(e, t, r, a, i));
	}
	n(a);
}, Af = (e, t, n, r, i) => {
	let a = [];
	if (e.required || !e.required && r.hasOwnProperty(e.field)) {
		if ($d(t) && !e.required) return n();
		yf.required(e, t, r, a, i), t !== void 0 && yf.type(e, t, r, a, i);
	}
	n(a);
}, jf = (e, t, n, r, i) => {
	let a = [];
	if (e.required || !e.required && r.hasOwnProperty(e.field)) {
		if ($d(t, "string") && !e.required) return n();
		yf.required(e, t, r, a, i), $d(t, "string") || yf.pattern(e, t, r, a, i);
	}
	n(a);
}, Mf = (e, t, n, r, i) => {
	let a = [];
	if (e.required || !e.required && r.hasOwnProperty(e.field)) {
		if ($d(t) && !e.required) return n();
		yf.required(e, t, r, a, i), $d(t) || yf.type(e, t, r, a, i);
	}
	n(a);
}, Nf = (e, t, n, r, i) => {
	let a = [], o = Array.isArray(t) ? "array" : typeof t;
	yf.required(e, t, r, a, i, o), n(a);
}, Pf = (e, t, n, r, i) => {
	let a = [];
	if (e.required || !e.required && r.hasOwnProperty(e.field)) {
		if ($d(t, "string") && !e.required) return n();
		yf.required(e, t, r, a, i, "string"), $d(t, "string") || (yf.type(e, t, r, a, i), yf.range(e, t, r, a, i), yf.pattern(e, t, r, a, i), e.whitespace === !0 && yf.whitespace(e, t, r, a, i));
	}
	n(a);
}, Ff = (e, t, n, r, i) => {
	let a = e.type, o = [];
	if (e.required || !e.required && r.hasOwnProperty(e.field)) {
		if ($d(t, a) && !e.required) return n();
		yf.required(e, t, r, o, i, a), $d(t, a) || yf.type(e, t, r, o, i);
	}
	n(o);
}, If = {
	string: Pf,
	method: Of,
	number: kf,
	boolean: Sf,
	regexp: Mf,
	integer: Df,
	float: Ef,
	array: xf,
	object: Af,
	enum: Tf,
	pattern: jf,
	date: Cf,
	url: Ff,
	hex: Ff,
	email: Ff,
	tel: Ff,
	required: Nf,
	any: bf
}, Lf = class e {
	static register = function(e, t) {
		if (typeof t != "function") throw Error("Cannot register a validator by type, validator is not a function");
		If[e] = t;
	};
	static warning = Yd;
	static messages = qd;
	static validators = If;
	rules = null;
	_messages = qd;
	constructor(e) {
		this.define(e);
	}
	define(e) {
		if (!e) throw Error("Cannot configure a schema with no rules");
		if (typeof e != "object" || Array.isArray(e)) throw Error("Rules must be an object");
		this.rules = {}, Object.keys(e).forEach((t) => {
			let n = e[t];
			this.rules[t] = Array.isArray(n) ? n : [n];
		});
	}
	messages(e) {
		return e && (this._messages = lf(Kd(), e)), this._messages;
	}
	validate(t, n = {}, r = () => {}) {
		let i = t, a = n, o = r;
		if (typeof a == "function" && (o = a, a = {}), !this.rules || Object.keys(this.rules).length === 0) return o && o(null, i), Promise.resolve(i);
		function s(e) {
			let t = [], n = {};
			function r(e) {
				Array.isArray(e) ? t = t.concat(...e) : t.push(e);
			}
			for (let t = 0; t < e.length; t++) r(e[t]);
			t.length ? (n = Xd(t), o(t, n)) : o(null, i);
		}
		if (a.messages) {
			let e = this.messages();
			e === qd && (e = Kd()), lf(e, a.messages), a.messages = e;
		} else a.messages = this.messages();
		let c = {};
		(a.keys || Object.keys(this.rules)).forEach((e) => {
			let n = this.rules[e], r = i[e];
			n.forEach((n) => {
				let a = n;
				typeof a.transform == "function" && (i === t && (i = { ...i }), r = i[e] = a.transform(r), r != null && (a.type = a.type || (Array.isArray(r) ? "array" : typeof r))), a = typeof a == "function" ? { validator: a } : { ...a }, a.validator = this.getValidationMethod(a), a.validator && (a.field = e, a.fullField = a.fullField || e, a.type = this.getType(a), c[e] = c[e] || [], c[e].push({
					rule: a,
					value: r,
					source: i,
					field: e
				}));
			});
		});
		let l = {};
		return af(c, a, (t, n) => {
			let r = t.rule, o = (r.type === "object" || r.type === "array") && (typeof r.fields == "object" || typeof r.defaultField == "object");
			o &&= r.required || !r.required && t.value, r.field = t.field;
			function s(e, t) {
				return {
					...t,
					fullField: `${r.fullField}.${e}`,
					fullFields: r.fullFields ? [...r.fullFields, e] : [e]
				};
			}
			function c(c = []) {
				let u = Array.isArray(c) ? c : [c];
				!a.suppressWarning && u.length && e.warning("async-validator:", u), u.length && r.message !== void 0 && r.message !== null && (u = [].concat(r.message));
				let d = u.map(cf(r, i));
				if (a.first && d.length) return l[r.field] = 1, n(d);
				if (!o) n(d);
				else {
					if (r.required && !t.value) return r.message === void 0 ? a.error && (d = [a.error(r, Zd(a.messages.required, r.field))]) : d = [].concat(r.message).map(cf(r, i)), n(d);
					let o = {};
					r.defaultField && Object.keys(t.value).map((e) => {
						o[e] = r.defaultField;
					}), o = {
						...o,
						...t.rule.fields
					};
					let c = {};
					Object.keys(o).forEach((e) => {
						let t = o[e];
						c[e] = (Array.isArray(t) ? t : [t]).map(s.bind(null, e));
					});
					let l = new e(c);
					l.messages(a.messages), t.rule.options && (t.rule.options.messages = a.messages, t.rule.options.error = a.error), l.validate(t.value, t.rule.options || a, (e) => {
						let t = [];
						d && d.length && t.push(...d), e && e.length && t.push(...e), n(t.length ? t : null);
					});
				}
			}
			let u;
			if (r.asyncValidator) u = r.asyncValidator(r, t.value, c, t.source, a);
			else if (r.validator) {
				try {
					u = r.validator(r, t.value, c, t.source, a);
				} catch (e) {
					console.error?.(e), a.suppressValidatorError || setTimeout(() => {
						throw e;
					}, 0), c(e.message);
				}
				u === !0 ? c() : u === !1 ? c(typeof r.message == "function" ? r.message(r.fullField || r.field) : r.message || `${r.fullField || r.field} fails`) : u instanceof Array ? c(u) : u instanceof Error && c(u.message);
			}
			u && u.then && u.then(() => c(), (e) => c(e));
		}, (e) => {
			s(e);
		}, i);
	}
	getType(e) {
		if (e.type === void 0 && e.pattern instanceof RegExp && (e.type = "pattern"), typeof e.validator != "function" && e.type && !If.hasOwnProperty(e.type)) throw Error(Zd("Unknown rule type %s", e.type));
		return e.type || "string";
	}
	getValidationMethod(e) {
		if (typeof e.validator == "function") return e.validator;
		let t = Object.keys(e), n = t.indexOf("message");
		return n !== -1 && t.splice(n, 1), t.length === 1 && t[0] === "required" ? If.required : If[this.getType(e)] || void 0;
	}
}, Rf = "'${name}' is not a valid ${type}", zf = {
	default: "Validation error on field '${name}'",
	required: "'${name}' is required",
	enum: "'${name}' must be one of [${enum}]",
	whitespace: "'${name}' cannot be empty",
	date: {
		format: "'${name}' is invalid for format date",
		parse: "'${name}' could not be parsed as date",
		invalid: "'${name}' is invalid date"
	},
	types: {
		string: Rf,
		method: Rf,
		array: Rf,
		object: Rf,
		number: Rf,
		date: Rf,
		boolean: Rf,
		integer: Rf,
		float: Rf,
		regexp: Rf,
		email: Rf,
		tel: Rf,
		url: Rf,
		hex: Rf
	},
	string: {
		len: "'${name}' must be exactly ${len} characters",
		min: "'${name}' must be at least ${min} characters",
		max: "'${name}' cannot be longer than ${max} characters",
		range: "'${name}' must be between ${min} and ${max} characters"
	},
	number: {
		len: "'${name}' must equal ${len}",
		min: "'${name}' cannot be less than ${min}",
		max: "'${name}' cannot be greater than ${max}",
		range: "'${name}' must be between ${min} and ${max}"
	},
	array: {
		len: "'${name}' must be exactly ${len} in length",
		min: "'${name}' cannot be less than ${min} in length",
		max: "'${name}' cannot be greater than ${max} in length",
		range: "'${name}' must be between ${min} and ${max} in length"
	},
	pattern: { mismatch: "'${name}' does not match pattern ${pattern}" }
}, Bf = Lf;
function Vf(e, t) {
	return e.replace(/\\?\$\{\w+\}/g, (e) => e.startsWith("\\") ? e.slice(1) : t[e.slice(2, -1)]);
}
var Hf = "CODE_LOGIC_ERROR";
async function Uf(e, t, n, r, i) {
	let a = { ...n };
	if (delete a.ruleIndex, Bf.warning = () => void 0, a.validator) {
		let e = a.validator;
		a.validator = (...t) => {
			try {
				return e(...t);
			} catch (e) {
				return console.error(e), Promise.reject(Hf);
			}
		};
	}
	let o = null;
	a && a.type === "array" && a.defaultField && (o = a.defaultField, delete a.defaultField);
	let s = new Bf({ [e]: [a] }), c = Ye(zf, r.validateMessages);
	s.messages(c);
	let l = [];
	try {
		await Promise.resolve(s.validate({ [e]: t }, { ...r }));
	} catch (e) {
		e.errors && (l = e.errors.map(({ message: e }, t) => {
			let n = e === Hf ? c.default : e;
			return /*#__PURE__*/ g.isValidElement(n) ? /*#__PURE__*/ g.cloneElement(n, { key: `error_${t}` }) : n;
		}));
	}
	if (!l.length && o && Array.isArray(t) && t.length > 0) return (await Promise.all(t.map((t, n) => Uf(`${e}.${n}`, t, o, r, i)))).reduce((e, t) => [...e, ...t], []);
	let u = {
		...n,
		name: e,
		enum: (n.enum || []).join(", "),
		...i
	};
	return l.map((e) => typeof e == "string" ? Vf(e, u) : e);
}
function Wf(e, t, n, r, i, a) {
	let o = e.join("."), s = n.map((e, t) => {
		let n = e.validator, r = {
			...e,
			ruleIndex: t
		};
		return n && (r.validator = (e, t, r) => {
			let i = !1, a = n(e, t, (...e) => {
				Promise.resolve().then(() => {
					Ae(!i, "Your validator function has already return a promise. `callback` will be ignored."), i || r(...e);
				});
			});
			i = a && typeof a.then == "function" && typeof a.catch == "function", Ae(i, "`callback` is deprecated. Please return a promise instead."), i && a.then(() => {
				r();
			}).catch((e) => {
				r(e || " ");
			});
		}), r;
	}).sort(({ warningOnly: e, ruleIndex: t }, { warningOnly: n, ruleIndex: r }) => !!e == !!n ? t - r : e ? 1 : -1), c;
	if (i === !0) c = new Promise(async (e, n) => {
		for (let e = 0; e < s.length; e += 1) {
			let i = s[e], c = await Uf(o, t, i, r, a);
			if (c.length) {
				n([{
					errors: c,
					rule: i
				}]);
				return;
			}
		}
		e([]);
	});
	else {
		let e = s.map((e) => Uf(o, t, e, r, a).then((t) => ({
			errors: t,
			rule: e
		})));
		c = (i ? Kf(e) : Gf(e)).then((e) => Promise.reject(e));
	}
	return c.catch((e) => e), c;
}
async function Gf(e) {
	return Promise.all(e).then((e) => [].concat(...e));
}
async function Kf(e) {
	let t = 0;
	return new Promise((n) => {
		e.forEach((r) => {
			r.then((r) => {
				r.errors.length && n([r]), t += 1, t === e.length && n([]);
			});
		});
	});
}
// node_modules/@rc-component/form/es/utils/valueUtil.js
function qf(e) {
	return Wd(e);
}
function Jf(e, t) {
	let n = {};
	return t.forEach((t) => {
		let r = He(e, t);
		n = We(n, t, r);
	}), n;
}
function Yf(e, t, n = !1) {
	return e && e.some((e) => Xf(t, e, n));
}
function Xf(e, t, n = !1) {
	return !e || !t || !n && e.length !== t.length ? !1 : t.every((t, n) => e[n] === t);
}
function Zf(e, t) {
	if (e === t) return !0;
	if (!e && t || e && !t || !e || !t || typeof e != "object" || typeof t != "object") return !1;
	let n = Object.keys(e), r = Object.keys(t);
	return [.../* @__PURE__ */ new Set([...n, ...r])].every((n) => {
		let r = e[n], i = t[n];
		return typeof r == "function" && typeof i == "function" || r === i;
	});
}
function Qf(e, ...t) {
	let n = t[0];
	return n && n.target && typeof n.target == "object" && e in n.target ? n.target[e] : n;
}
function $f(e, t, n) {
	let { length: r } = e;
	if (t < 0 || t >= r || n < 0 || n >= r) return e;
	let i = e[t], a = t - n;
	return a > 0 ? [
		...e.slice(0, n),
		i,
		...e.slice(n, t),
		...e.slice(t + 1, r)
	] : a < 0 ? [
		...e.slice(0, t),
		...e.slice(t + 1, n + 1),
		i,
		...e.slice(n + 1, r)
	] : e;
}
// node_modules/@rc-component/form/es/hooks/useNotifyWatch.js
var ep = (e) => {
	let t = new MessageChannel();
	t.port1.onmessage = e, t.port2.postMessage(null);
}, tp = class {
	namePathList = [];
	taskId = 0;
	watcherList = /* @__PURE__ */ new Set();
	form;
	constructor(e) {
		this.form = e;
	}
	register(e) {
		return this.watcherList.add(e), () => {
			this.watcherList.delete(e);
		};
	}
	notify(e) {
		e.forEach((e) => {
			this.namePathList.every((t) => !Xf(t, e)) && this.namePathList.push(e);
		}), this.doBatch();
	}
	doBatch() {
		this.taskId += 1;
		let e = this.taskId;
		ep(() => {
			if (e === this.taskId && this.watcherList.size) {
				let e = this.form.getForm(), t = e.getFieldsValue(), n = e.getFieldsValue(!0);
				this.watcherList.forEach((e) => {
					e(t, n, this.namePathList);
				}), this.namePathList = [];
			}
		});
	}
};
// node_modules/@rc-component/form/es/utils/delayUtil.js
async function np() {
	return new Promise((e) => {
		ep(() => {
			O(() => {
				e();
			});
		});
	});
}
// node_modules/@rc-component/form/es/Field.js
function rp() {
	return rp = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, rp.apply(this, arguments);
}
var ip = [], ap = [];
function op(e, t, n, r, i, a) {
	return typeof e == "function" ? e(t, n, "source" in a ? { source: a.source } : {}) : r !== i;
}
var sp = class extends g.PureComponent {
	static contextType = Hd;
	state = { resetCount: 0 };
	cancelRegisterFunc = null;
	mounted = !1;
	touched = !1;
	dirty = !1;
	validatePromise;
	prevValidating;
	errors = ip;
	warnings = ap;
	constructor(e) {
		if (super(e), e.fieldContext) {
			let { getInternalHooks: t } = e.fieldContext, { initEntityValue: n } = t(Bd);
			n(this);
		}
	}
	componentDidMount() {
		let { shouldUpdate: e, fieldContext: t } = this.props;
		if (this.mounted = !0, t) {
			let { getInternalHooks: e } = t, { registerField: n } = e(Bd);
			this.cancelRegisterFunc = n(this);
		}
		e === !0 && this.reRender();
	}
	componentWillUnmount() {
		this.cancelRegister(), this.triggerMetaEvent(!0), this.mounted = !1;
	}
	cancelRegister = () => {
		let { preserve: e, isListField: t, name: n } = this.props;
		this.cancelRegisterFunc && this.cancelRegisterFunc(t, e, qf(n)), this.cancelRegisterFunc = null;
	};
	getNamePath = () => {
		let { name: e, fieldContext: t } = this.props, { prefixName: n = [] } = t;
		return e === void 0 ? [] : [...n, ...e];
	};
	getRules = () => {
		let { rules: e = [], fieldContext: t } = this.props;
		return e.map((e) => typeof e == "function" ? e(t) : e);
	};
	reRender() {
		this.mounted && this.forceUpdate();
	}
	refresh = () => {
		this.mounted && this.setState(({ resetCount: e }) => ({ resetCount: e + 1 }));
	};
	metaCache = null;
	triggerMetaEvent = (e) => {
		let { onMetaChange: t } = this.props;
		if (t) {
			let n = {
				...this.getMeta(),
				destroy: e
			};
			Me(this.metaCache, n) || t(n), this.metaCache = n;
		} else this.metaCache = null;
	};
	onStoreChange = (e, t, n) => {
		let { shouldUpdate: r, dependencies: i = [], onReset: a } = this.props, { store: o } = n, s = this.getNamePath(), c = this.getValue(e), l = this.getValue(o), u = t && Yf(t, s);
		switch (n.type === "valueUpdate" && n.source === "external" && !Me(c, l) && (this.touched = !0, this.dirty = !0, this.validatePromise = null, this.errors = ip, this.warnings = ap, this.triggerMetaEvent()), n.type) {
			case "reset":
				if (!t || u) {
					this.touched = !1, this.dirty = !1, this.validatePromise = void 0, this.errors = ip, this.warnings = ap, this.triggerMetaEvent(), a?.(), this.refresh();
					return;
				}
				break;
			case "remove":
				if (r && op(r, e, o, c, l, n)) {
					this.reRender();
					return;
				}
				break;
			case "setField": {
				let { data: i } = n;
				if (u) {
					"touched" in i && (this.touched = i.touched), "validating" in i && !("originRCField" in i) && (this.validatePromise = i.validating ? Promise.resolve([]) : null), "errors" in i && (this.errors = i.errors || ip), "warnings" in i && (this.warnings = i.warnings || ap), this.dirty = !0, this.triggerMetaEvent(), this.reRender();
					return;
				}
				if ("value" in i && Yf(t, s, !0) || r && !s.length && op(r, e, o, c, l, n)) {
					this.reRender();
					return;
				}
				break;
			}
			case "dependenciesUpdate":
				if (i.map(qf).some((e) => Yf(n.relatedFields, e))) {
					this.reRender();
					return;
				}
				break;
			default: if (u || (!i.length || s.length || r) && op(r, e, o, c, l, n)) {
				this.reRender();
				return;
			}
		}
		r === !0 && this.reRender();
	};
	validateRules = (e) => {
		let t = this.getNamePath(), n = this.getValue(), { triggerName: r, validateOnly: i = !1, delayFrame: a } = e || {}, o = Promise.resolve().then(async () => {
			if (!this.mounted) return [];
			let { validateFirst: i = !1, messageVariables: s, validateDebounce: c } = this.props;
			a && await np();
			let l = this.getRules();
			if (r && (l = l.filter((e) => e).filter((e) => {
				let { validateTrigger: t } = e;
				return !t || Wd(t).includes(r);
			})), c && r && (await new Promise((e) => {
				setTimeout(e, c);
			}), this.validatePromise !== o)) return [];
			let u = Wf(t, n, l, e, i, s);
			return u.catch((e) => e).then((e = ip) => {
				if (this.validatePromise === o) {
					this.validatePromise = null;
					let t = [], n = [];
					e.forEach?.(({ rule: { warningOnly: e }, errors: r = ip }) => {
						e ? n.push(...r) : t.push(...r);
					}), this.errors = t, this.warnings = n, this.triggerMetaEvent(), this.reRender();
				}
			}), u;
		});
		return i || (this.validatePromise = o, this.dirty = !0, this.errors = ip, this.warnings = ap, this.triggerMetaEvent(), this.reRender()), o;
	};
	isFieldValidating = () => !!this.validatePromise;
	isFieldTouched = () => this.touched;
	isFieldDirty = () => {
		if (this.dirty || this.props.initialValue !== void 0) return !0;
		let { fieldContext: e } = this.props, { getInitialValue: t } = e.getInternalHooks(Bd);
		return t(this.getNamePath()) !== void 0;
	};
	getErrors = () => this.errors;
	getWarnings = () => this.warnings;
	isListField = () => this.props.isListField;
	isList = () => this.props.isList;
	isPreserve = () => this.props.preserve;
	getMeta = () => (this.prevValidating = this.isFieldValidating(), {
		touched: this.isFieldTouched(),
		validating: this.prevValidating,
		errors: this.errors,
		warnings: this.warnings,
		name: this.getNamePath(),
		validated: this.validatePromise === null
	});
	getOnlyChild = (e) => {
		if (typeof e == "function") {
			let t = this.getMeta();
			return {
				...this.getOnlyChild(e(this.getControlled(), t, this.props.fieldContext)),
				isFunction: !0
			};
		}
		let t = Ve(e);
		return t.length !== 1 || !/*#__PURE__*/ g.isValidElement(t[0]) ? {
			child: t,
			isFunction: !1
		} : {
			child: t[0],
			isFunction: !1
		};
	};
	getValue = (e) => {
		let { getFieldsValue: t } = this.props.fieldContext, n = this.getNamePath();
		return He(e || t(!0), n);
	};
	getControlled = (e = {}) => {
		let { name: t, trigger: n = "onChange", validateTrigger: r, getValueFromEvent: i, normalize: a, valuePropName: o = "value", getValueProps: s, fieldContext: c } = this.props, l = r === void 0 ? c.validateTrigger : r, u = this.getNamePath(), { getInternalHooks: d, getFieldsValue: f } = c, { dispatch: p } = d(Bd), m = this.getValue(), h = s || ((e) => ({ [o]: e })), g = e[n], _ = t === void 0 ? {} : h(m), v = {
			...e,
			..._
		};
		return v[n] = (...e) => {
			this.touched = !0, this.dirty = !0, this.triggerMetaEvent();
			let t = this.getValue(), n;
			n = i ? i(...e) : Qf(o, ...e), a && (n = a(n, t, f(!0))), n !== t && p({
				type: "updateValue",
				namePath: u,
				value: n
			}), g && g(...e);
		}, Wd(l || []).forEach((e) => {
			let t = v[e];
			v[e] = (...n) => {
				t && t(...n);
				let { rules: r } = this.props;
				r && r.length && p({
					type: "validateField",
					namePath: u,
					triggerName: e
				});
			};
		}), v;
	};
	render() {
		let { resetCount: e } = this.state, { children: t } = this.props, { child: n, isFunction: r } = this.getOnlyChild(t), i;
		return r ? i = n : /*#__PURE__*/ g.isValidElement(n) ? i = /*#__PURE__*/ g.cloneElement(n, this.getControlled(n.props)) : (Ae(!n, "`children` of Field is not validate ReactElement."), i = n), /*#__PURE__*/ g.createElement(g.Fragment, { key: e }, i);
	}
};
function cp({ name: e, ...t }) {
	let n = g.useContext(Hd), r = g.useContext(Ud), i = e === void 0 ? void 0 : qf(e), a = t.isListField ?? !!r, o = "keep";
	return a || (o = `_${(i || []).join("_")}`), /*#__PURE__*/ g.createElement(sp, rp({
		key: o,
		name: i,
		isListField: a
	}, t, { fieldContext: n }));
}
// node_modules/@rc-component/form/es/List.js
function lp({ name: e, initialValue: t, children: n, rules: r, validateTrigger: i, isListField: a }) {
	let o = g.useContext(Hd), s = g.useContext(Ud), c = g.useRef({
		keys: [],
		id: 0
	}).current, l = g.useMemo(() => [...qf(o.prefixName) || [], ...qf(e)], [o.prefixName, e]), u = g.useMemo(() => ({
		...o,
		prefixName: l
	}), [o, l]), d = g.useMemo(() => ({ getKey: (e) => {
		let t = l.length, n = e[t];
		return [c.keys[n], e.slice(t + 1)];
	} }), [c, l]);
	return typeof n == "function" ? /*#__PURE__*/ g.createElement(Ud.Provider, { value: d }, /*#__PURE__*/ g.createElement(Hd.Provider, { value: u }, /*#__PURE__*/ g.createElement(cp, {
		name: [],
		shouldUpdate: (e, t, { source: n }) => n !== "internal" && e !== t,
		rules: r,
		validateTrigger: i,
		initialValue: t,
		isList: !0,
		isListField: a ?? !!s
	}, ({ value: e = [], onChange: t }, r) => {
		let { getFieldValue: i } = o, a = () => i(l || []) || [], s = {
			add: (e, n) => {
				let r = a();
				n >= 0 && n <= r.length ? (c.keys = [
					...c.keys.slice(0, n),
					c.id,
					...c.keys.slice(n)
				], t([
					...r.slice(0, n),
					e,
					...r.slice(n)
				])) : (c.keys = [...c.keys, c.id], t([...r, e])), c.id += 1;
			},
			remove: (e) => {
				let n = a(), r = new Set(Array.isArray(e) ? e : [e]);
				r.size <= 0 || (c.keys = c.keys.filter((e, t) => !r.has(t)), t(n.filter((e, t) => !r.has(t))));
			},
			move(e, n) {
				if (e === n) return;
				let r = a();
				e < 0 || e >= r.length || n < 0 || n >= r.length || (c.keys = $f(c.keys, e, n), t($f(r, e, n)));
			}
		}, u = e || [];
		return Array.isArray(u) || (u = []), n(u.map((e, t) => {
			let n = c.keys[t];
			return n === void 0 && (c.keys[t] = c.id, n = c.keys[t], c.id += 1), {
				name: t,
				key: n,
				isListField: !0
			};
		}), s, r);
	}))) : (Ae(!1, "Form.List only accepts function as children."), null);
}
// node_modules/@rc-component/form/es/utils/asyncUtil.js
function up(e) {
	let t = !1, n = e.length, r = [];
	return e.length ? new Promise((i, a) => {
		e.forEach((e, o) => {
			e.catch((e) => (t = !0, e)).then((e) => {
				--n, r[o] = e, !(n > 0) && (t && a(r), i(r));
			});
		});
	}) : Promise.resolve([]);
}
// node_modules/@rc-component/form/es/utils/NameMap.js
var dp = "__@field_split__";
function fp(e) {
	return e.map((e) => `${typeof e}:${e}`).join(dp);
}
var pp = class {
	kvs = /* @__PURE__ */ new Map();
	set(e, t) {
		this.kvs.set(fp(e), t);
	}
	get(e) {
		return this.kvs.get(fp(e));
	}
	getAsPrefix(e) {
		let t = fp(e), n = t + dp, r = [], i = this.kvs.get(t);
		return i !== void 0 && r.push(i), this.kvs.forEach((e, t) => {
			t.startsWith(n) && r.push(e);
		}), r;
	}
	update(e, t) {
		let n = t(this.get(e));
		n ? this.set(e, n) : this.delete(e);
	}
	delete(e) {
		this.kvs.delete(fp(e));
	}
	map(e) {
		return [...this.kvs.entries()].map(([t, n]) => e({
			key: t.split(dp).map((e) => {
				let [, t, n] = e.match(/^([^:]*):(.*)$/);
				return t === "number" ? Number(n) : n;
			}),
			value: n
		}));
	}
	toJSON() {
		let e = {};
		return this.map(({ key: t, value: n }) => (e[t.join(".")] = n, null)), e;
	}
}, mp = class {
	formHooked = !1;
	forceRootUpdate;
	subscribable = !0;
	store = {};
	fieldEntities = [];
	initialValues = {};
	callbacks = {};
	validateMessages = null;
	preserve = null;
	lastValidatePromise = null;
	watcherCenter = new tp(this);
	constructor(e) {
		this.forceRootUpdate = e;
	}
	getForm = () => ({
		getFieldValue: this.getFieldValue,
		getFieldsValue: this.getFieldsValue,
		getFieldError: this.getFieldError,
		getFieldWarning: this.getFieldWarning,
		getFieldsError: this.getFieldsError,
		isFieldsTouched: this.isFieldsTouched,
		isFieldTouched: this.isFieldTouched,
		isFieldValidating: this.isFieldValidating,
		isFieldsValidating: this.isFieldsValidating,
		resetFields: this.resetFields,
		setFields: this.setFields,
		setFieldValue: this.setFieldValue,
		setFieldsValue: this.setFieldsValue,
		validateFields: this.validateFields,
		submit: this.submit,
		_init: !0,
		getInternalHooks: this.getInternalHooks
	});
	getInternalHooks = (e) => e === "RC_FORM_INTERNAL_HOOKS" ? (this.formHooked = !0, {
		dispatch: this.dispatch,
		initEntityValue: this.initEntityValue,
		registerField: this.registerField,
		useSubscribe: this.useSubscribe,
		setInitialValues: this.setInitialValues,
		destroyForm: this.destroyForm,
		setCallbacks: this.setCallbacks,
		setValidateMessages: this.setValidateMessages,
		getFields: this.getFields,
		setPreserve: this.setPreserve,
		getInitialValue: this.getInitialValue,
		registerWatch: this.registerWatch
	}) : (Ae(!1, "`getInternalHooks` is internal usage. Should not call directly."), null);
	useSubscribe = (e) => {
		this.subscribable = e;
	};
	prevWithoutPreserves = null;
	setInitialValues = (e, t) => {
		if (this.initialValues = e || {}, t) {
			let t = Ye(e, this.store);
			this.prevWithoutPreserves?.map(({ key: n }) => {
				t = We(t, n, He(e, n));
			}), this.prevWithoutPreserves = null, this.updateStore(t);
		}
	};
	destroyForm = (e) => {
		if (e) this.updateStore({});
		else {
			let e = new pp();
			this.getFieldEntities(!0).forEach((t) => {
				this.isMergedPreserve(t.isPreserve()) || e.set(t.getNamePath(), !0);
			}), this.prevWithoutPreserves = e;
		}
	};
	getInitialValue = (e) => {
		let t = He(this.initialValues, e);
		return e.length ? Ye(t) : t;
	};
	setCallbacks = (e) => {
		this.callbacks = e;
	};
	setValidateMessages = (e) => {
		this.validateMessages = e;
	};
	setPreserve = (e) => {
		this.preserve = e;
	};
	registerWatch = (e) => this.watcherCenter.register(e);
	notifyWatch = (e = []) => {
		this.watcherCenter.notify(e);
	};
	timeoutId = null;
	warningUnhooked = () => {};
	updateStore = (e) => {
		this.store = e;
	};
	getFieldEntities = (e = !1) => e ? this.fieldEntities.filter((e) => e.getNamePath().length) : this.fieldEntities;
	getFieldsMap = (e = !1) => {
		let t = new pp();
		return this.getFieldEntities(e).forEach((e) => {
			let n = e.getNamePath();
			t.set(n, e);
		}), t;
	};
	getFieldEntitiesForNamePathList = (e, t = !1) => {
		if (!e) return this.getFieldEntities(!0);
		let n = this.getFieldsMap(!0);
		return t ? e.flatMap((e) => {
			let t = qf(e), r = n.getAsPrefix(t);
			return r.length ? r : [{ INVALIDATE_NAME_PATH: t }];
		}) : e.map((e) => {
			let t = qf(e);
			return n.get(t) || { INVALIDATE_NAME_PATH: qf(e) };
		});
	};
	getFieldsValue = (e, t) => {
		this.warningUnhooked();
		let n, r;
		if (e === !0 || Array.isArray(e) ? (n = e, r = t) : e && typeof e == "object" && (r = e.filter), n === !0 && !r) return this.store;
		let i = this.getFieldEntitiesForNamePathList(Array.isArray(n) ? n : null, !0), a = [], o = [];
		i.forEach((e) => {
			let t = e.INVALIDATE_NAME_PATH || e.getNamePath();
			if (e.isList?.()) o.push(t);
			else if (!r) a.push(t);
			else {
				let n = "getMeta" in e ? e.getMeta() : null;
				r(n) && a.push(t);
			}
		});
		let s = Jf(this.store, a.map(qf));
		return o.forEach((e) => {
			He(s, e) || (s = We(s, e, []));
		}), s;
	};
	getFieldValue = (e) => {
		this.warningUnhooked();
		let t = qf(e);
		return He(this.store, t);
	};
	getFieldsError = (e) => (this.warningUnhooked(), this.getFieldEntitiesForNamePathList(e).map((t, n) => t && !t.INVALIDATE_NAME_PATH ? {
		name: t.getNamePath(),
		errors: t.getErrors(),
		warnings: t.getWarnings()
	} : {
		name: qf(e[n]),
		errors: [],
		warnings: []
	}));
	getFieldError = (e) => {
		this.warningUnhooked();
		let t = qf(e);
		return this.getFieldsError([t])[0].errors;
	};
	getFieldWarning = (e) => {
		this.warningUnhooked();
		let t = qf(e);
		return this.getFieldsError([t])[0].warnings;
	};
	isFieldsTouched = (...e) => {
		this.warningUnhooked();
		let [t, n] = e, r, i = !1;
		e.length === 0 ? r = null : e.length === 1 ? Array.isArray(t) ? (r = t.map(qf), i = !1) : (r = null, i = t) : (r = t.map(qf), i = n);
		let a = this.getFieldEntities(!0), o = (e) => e.isFieldTouched();
		if (!r) return i ? a.every((e) => o(e) || e.isList()) : a.some(o);
		let s = new pp();
		r.forEach((e) => {
			s.set(e, []);
		}), a.forEach((e) => {
			let t = e.getNamePath();
			r.forEach((n) => {
				n.every((e, n) => t[n] === e) && s.update(n, (t) => [...t, e]);
			});
		});
		let c = (e) => e.some(o), l = s.map(({ value: e }) => e);
		return i ? l.every(c) : l.some(c);
	};
	isFieldTouched = (e) => (this.warningUnhooked(), this.isFieldsTouched([e]));
	isFieldsValidating = (e) => {
		this.warningUnhooked();
		let t = this.getFieldEntities();
		if (!e) return t.some((e) => e.isFieldValidating());
		let n = e.map(qf);
		return t.some((e) => {
			let t = e.getNamePath();
			return Yf(n, t) && e.isFieldValidating();
		});
	};
	isFieldValidating = (e) => (this.warningUnhooked(), this.isFieldsValidating([e]));
	resetWithFieldInitialValue = (e = {}) => {
		let t = new pp(), n = this.getFieldEntities(!0);
		n.forEach((e) => {
			let { initialValue: n } = e.props, r = e.getNamePath();
			if (n !== void 0) {
				let i = t.get(r) || /* @__PURE__ */ new Set();
				i.add({
					entity: e,
					value: n
				}), t.set(r, i);
			}
		});
		let r = (n) => {
			n.forEach((n) => {
				let { initialValue: r } = n.props;
				if (r !== void 0) {
					let r = n.getNamePath();
					if (this.getInitialValue(r) !== void 0) Ae(!1, `Form already set 'initialValues' with path '${r.join(".")}'. Field can not overwrite it.`);
					else {
						let i = t.get(r);
						if (i && i.size > 1) Ae(!1, `Multiple Field with path '${r.join(".")}' set 'initialValue'. Can not decide which one to pick.`);
						else if (i) {
							let t = this.getFieldValue(r);
							n.isListField() || e.skipExist && t !== void 0 || this.updateStore(We(this.store, r, [...i][0].value));
						}
					}
				}
			});
		}, i;
		e.entities ? i = e.entities : e.namePathList ? (i = [], e.namePathList.forEach((e) => {
			let n = t.get(e);
			n && i.push(...[...n].map((e) => e.entity));
		})) : i = n, r(i);
	};
	resetFields = (e) => {
		this.warningUnhooked();
		let t = this.store;
		if (!e) {
			this.updateStore(Ye(this.initialValues)), this.resetWithFieldInitialValue(), this.notifyObservers(t, null, { type: "reset" }), this.notifyWatch();
			return;
		}
		let n = e.map(qf);
		n.forEach((e) => {
			let t = this.getInitialValue(e);
			this.updateStore(We(this.store, e, t));
		}), this.resetWithFieldInitialValue({ namePathList: n }), this.notifyObservers(t, n, { type: "reset" }), this.notifyWatch(n);
	};
	setFields = (e) => {
		this.warningUnhooked();
		let t = this.store, n = [];
		e.forEach((e) => {
			let { name: r, ...i } = e, a = qf(r);
			n.push(a), "value" in i && this.updateStore(We(this.store, a, i.value)), this.notifyObservers(t, [a], {
				type: "setField",
				data: e
			});
		}), this.notifyWatch(n);
	};
	getFields = () => this.getFieldEntities(!0).map((e) => {
		let t = e.getNamePath(), n = {
			...e.getMeta(),
			name: t,
			value: this.getFieldValue(t)
		};
		return Object.defineProperty(n, "originRCField", { value: !0 }), n;
	});
	initEntityValue = (e) => {
		let { initialValue: t } = e.props;
		if (t !== void 0) {
			let n = e.getNamePath();
			He(this.store, n) === void 0 && this.updateStore(We(this.store, n, t));
		}
	};
	isMergedPreserve = (e) => (e === void 0 ? this.preserve : e) ?? !0;
	registerField = (e) => {
		this.fieldEntities.push(e);
		let t = e.getNamePath();
		if (this.notifyWatch([t]), e.props.initialValue !== void 0) {
			let t = this.store;
			this.resetWithFieldInitialValue({
				entities: [e],
				skipExist: !0
			}), this.notifyObservers(t, [e.getNamePath()], {
				type: "valueUpdate",
				source: "internal"
			});
		}
		return (n, r, i = []) => {
			if (this.fieldEntities = this.fieldEntities.filter((t) => t !== e), !this.isMergedPreserve(r) && (!n || i.length > 1)) {
				let e = n ? void 0 : this.getInitialValue(t);
				if (t.length && this.getFieldValue(t) !== e && this.fieldEntities.every((e) => !Xf(e.getNamePath(), t))) {
					let n = this.store;
					this.updateStore(We(n, t, e, !0)), this.notifyObservers(n, [t], { type: "remove" }), this.triggerDependenciesUpdate(n, t);
				}
			}
			this.notifyWatch([t]);
		};
	};
	dispatch = (e) => {
		switch (e.type) {
			case "updateValue": {
				let { namePath: t, value: n } = e;
				this.updateValue(t, n);
				break;
			}
			case "validateField": {
				let { namePath: t, triggerName: n } = e;
				this.validateFields([t], { triggerName: n });
				break;
			}
		}
	};
	notifyObservers = (e, t, n) => {
		if (this.subscribable) {
			let r = {
				...n,
				store: this.getFieldsValue(!0)
			};
			this.getFieldEntities().forEach(({ onStoreChange: n }) => {
				n(e, t, r);
			});
		} else this.forceRootUpdate();
	};
	triggerDependenciesUpdate = (e, t) => {
		let n = this.getDependencyChildrenFields(t);
		return n.length && this.validateFields(n, { delayFrame: !0 }), this.notifyObservers(e, n, {
			type: "dependenciesUpdate",
			relatedFields: [t, ...n]
		}), n;
	};
	updateValue = (e, t) => {
		let n = qf(e), r = this.store;
		this.updateStore(We(this.store, n, t)), this.notifyObservers(r, [n], {
			type: "valueUpdate",
			source: "internal"
		}), this.notifyWatch([n]);
		let i = this.triggerDependenciesUpdate(r, n), { onValuesChange: a } = this.callbacks;
		if (a) {
			let e = Jf(this.store, [n]);
			a(e, We(this.getFieldsValue(), n, He(e, n)));
		}
		this.triggerOnFieldsChange([n, ...i]);
	};
	setFieldsValue = (e) => {
		this.warningUnhooked();
		let t = this.store;
		if (e) {
			let t = Ye(this.store, e);
			this.updateStore(t);
		}
		this.notifyObservers(t, null, {
			type: "valueUpdate",
			source: "external"
		}), this.notifyWatch();
	};
	setFieldValue = (e, t) => {
		this.setFields([{
			name: e,
			value: t,
			errors: [],
			warnings: [],
			touched: !0
		}]);
	};
	getDependencyChildrenFields = (e) => {
		let t = /* @__PURE__ */ new Set(), n = [], r = new pp();
		this.getFieldEntities().forEach((e) => {
			let { dependencies: t } = e.props;
			(t || []).forEach((t) => {
				let n = qf(t);
				r.update(n, (t = /* @__PURE__ */ new Set()) => (t.add(e), t));
			});
		});
		let i = (e) => {
			(r.get(e) || /* @__PURE__ */ new Set()).forEach((e) => {
				if (!t.has(e)) {
					t.add(e);
					let r = e.getNamePath();
					e.isFieldDirty() && r.length && (n.push(r), i(r));
				}
			});
		};
		return i(e), n;
	};
	triggerOnFieldsChange = (e, t) => {
		let { onFieldsChange: n } = this.callbacks;
		if (n) {
			let r = this.getFields();
			if (t) {
				let e = new pp();
				t.forEach(({ name: t, errors: n }) => {
					e.set(t, n);
				}), r.forEach((t) => {
					t.errors = e.get(t.name) || t.errors;
				});
			}
			let i = r.filter(({ name: t }) => Yf(e, t));
			i.length && n(i, r);
		}
	};
	validateFields = (e, t) => {
		this.warningUnhooked();
		let n, r;
		Array.isArray(e) || typeof e == "string" || typeof t == "string" ? (n = e, r = t) : r = e;
		let i = !!n, a = i ? n.map(qf) : [], o = [...a], s = [], c = String(Date.now()), l = /* @__PURE__ */ new Set(), { recursive: u, dirty: d } = r || {};
		this.getFieldEntities(!0).forEach((e) => {
			let t = e.getNamePath();
			if (i || (e.isList() && a.some((e) => Xf(e, t, !0)) || o.push(t), a.push(t)), e.props.rules && e.props.rules.length && (!d || e.isFieldDirty()) && (l.add(t.join(c)), !i || Yf(a, t, u))) {
				let n = e.validateRules({
					validateMessages: {
						...zf,
						...this.validateMessages
					},
					...r
				});
				s.push(n.then(() => ({
					name: t,
					errors: [],
					warnings: []
				})).catch((e) => {
					let n = [], r = [];
					return e.forEach?.(({ rule: { warningOnly: e }, errors: t }) => {
						e ? r.push(...t) : n.push(...t);
					}), n.length ? Promise.reject({
						name: t,
						errors: n,
						warnings: r
					}) : {
						name: t,
						errors: n,
						warnings: r
					};
				}));
			}
		});
		let f = up(s);
		this.lastValidatePromise = f, f.catch((e) => e).then((e) => {
			let t = e.map(({ name: e }) => e);
			this.notifyObservers(this.store, t, { type: "validateFinish" }), this.triggerOnFieldsChange(t, e);
		});
		let p = f.then(() => this.lastValidatePromise === f ? Promise.resolve(this.getFieldsValue(o)) : Promise.reject([])).catch((e) => {
			let t = e.filter((e) => e && e.errors.length), n = t[0]?.errors?.[0];
			return Promise.reject({
				message: n,
				values: this.getFieldsValue(a),
				errorFields: t,
				outOfDate: this.lastValidatePromise !== f
			});
		});
		p.catch((e) => e);
		let m = a.filter((e) => l.has(e.join(c)));
		return this.triggerOnFieldsChange(m), p;
	};
	submit = () => {
		this.warningUnhooked(), this.validateFields().then((e) => {
			let { onFinish: t } = this.callbacks;
			if (t) try {
				t(e);
			} catch (e) {
				console.error(e);
			}
		}).catch((e) => {
			let { onFinishFailed: t } = this.callbacks;
			t && t(e);
		});
	};
};
function hp(e) {
	let t = g.useRef(null), [, n] = g.useState({});
	return t.current ||= e || new mp(() => {
		n({});
	}).getForm(), [t.current];
}
// node_modules/@rc-component/form/es/FormContext.js
var gp = /*#__PURE__*/ g.createContext({
	triggerFormChange: () => {},
	triggerFormFinish: () => {},
	registerForm: () => {},
	unregisterForm: () => {}
}), _p = ({ validateMessages: e, onFormChange: t, onFormFinish: n, children: r }) => {
	let i = g.useContext(gp), a = g.useRef({});
	return /*#__PURE__*/ g.createElement(gp.Provider, { value: {
		...i,
		validateMessages: {
			...i.validateMessages,
			...e
		},
		triggerFormChange: (e, n) => {
			t && t(e, {
				changedFields: n,
				forms: a.current
			}), i.triggerFormChange(e, n);
		},
		triggerFormFinish: (e, t) => {
			n && n(e, {
				values: t,
				forms: a.current
			}), i.triggerFormFinish(e, t);
		},
		registerForm: (e, t) => {
			e && (a.current = {
				...a.current,
				[e]: t
			}), i.registerForm(e, t);
		},
		unregisterForm: (e) => {
			let t = { ...a.current };
			delete t[e], a.current = t, i.unregisterForm(e);
		}
	} }, r);
};
// node_modules/@rc-component/form/es/Form.js
function vp() {
	return vp = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, vp.apply(this, arguments);
}
var yp = (e, t) => {
	let { name: n, initialValues: r, fields: i, form: a, preserve: o, children: s, component: c = "form", validateMessages: l, validateTrigger: u = "onChange", onValuesChange: d, onFieldsChange: f, onFinish: p, onFinishFailed: m, clearOnDestroy: h, ..._ } = e, v = g.useRef(null), y = g.useContext(gp), [b] = hp(a), { useSubscribe: x, setInitialValues: S, setCallbacks: C, setValidateMessages: w, setPreserve: T, destroyForm: E } = b.getInternalHooks(Bd);
	g.useImperativeHandle(t, () => ({
		...b,
		nativeElement: v.current
	})), g.useEffect(() => (y.registerForm(n, b), () => {
		y.unregisterForm(n);
	}), [
		y,
		b,
		n
	]), w({
		...y.validateMessages,
		...l
	}), C({
		onValuesChange: d,
		onFieldsChange: (e, ...t) => {
			y.triggerFormChange(n, e), f && f(e, ...t);
		},
		onFinish: (e) => {
			y.triggerFormFinish(n, e), p && p(e);
		},
		onFinishFailed: m
	}), T(o);
	let D = g.useRef(null);
	S(r, !D.current), D.current ||= !0, g.useEffect(() => () => E(h), []);
	let O, k = typeof s == "function";
	O = k ? s(b.getFieldsValue(!0), b) : s, x(!k);
	let A = g.useRef(null);
	g.useEffect(() => {
		Zf(A.current || [], i || []) || b.setFields(i || []), A.current = i;
	}, [i, b]);
	let j = g.useMemo(() => ({
		...b,
		validateTrigger: u
	}), [b, u]), M = /*#__PURE__*/ g.createElement(Ud.Provider, { value: null }, /*#__PURE__*/ g.createElement(Hd.Provider, { value: j }, O));
	return c === !1 ? M : /*#__PURE__*/ g.createElement(c, vp({}, _, {
		ref: v,
		onSubmit: (e) => {
			e.preventDefault(), e.stopPropagation(), b.submit();
		},
		onReset: (e) => {
			e.preventDefault(), b.resetFields(), _.onReset?.(e);
		}
	}), M);
};
// node_modules/@rc-component/form/es/hooks/useWatch.js
function bp(e) {
	try {
		return JSON.stringify(e);
	} catch {
		return Math.random();
	}
}
function xp(...e) {
	let [t, n = {}] = e, r = Gd(n) ? { form: n } : n, i = r.form, [a, o] = (0, g.useState)(() => typeof t == "function" ? t({}) : void 0), s = (0, g.useMemo)(() => bp(a), [a]), c = (0, g.useRef)(s);
	c.current = s;
	let l = (0, g.useContext)(Hd), u = i || l, d = u && u._init, { getFieldsValue: f, getInternalHooks: p } = u, { registerWatch: m } = p(Bd), h = _((e, n) => {
		let i = r.preserve ? n ?? f(!0) : e ?? f(), s = typeof t == "function" ? t(i) : He(i, qf(t));
		bp(a) !== bp(s) && o(s);
	}), v = typeof t == "function" ? t : JSON.stringify(t);
	return (0, g.useEffect)(() => {
		d && h();
	}, [d, v]), (0, g.useEffect)(() => {
		if (d) return m((e, t) => {
			h(e, t);
		});
	}, [d]), a;
}
// node_modules/@rc-component/form/es/index.js
var Sp = /* @__PURE__ */ g.forwardRef(yp);
Sp.FormProvider = _p, Sp.Field = cp, Sp.List = lp, Sp.useForm = hp, Sp.useWatch = xp;
// node_modules/antd/es/form/context.js
var Cp = /*#__PURE__*/ g.createContext({}), wp = ({ children: e, status: t, override: n }) => {
	let r = g.useContext(Cp), i = g.useMemo(() => {
		let e = { ...r };
		return n && delete e.isFormItemInput, t && (delete e.status, delete e.hasFeedback, delete e.feedbackIcon), e;
	}, [
		t,
		n,
		r
	]);
	return /*#__PURE__*/ g.createElement(Cp.Provider, { value: i }, e);
}, Tp = /*#__PURE__*/ g.createContext(void 0), Ep = (e) => {
	let { space: t, form: n, children: r } = e;
	if (!Pe(r)) return null;
	let i = r;
	return n && (i = /*#__PURE__*/ g.createElement(wp, {
		override: !0,
		status: !0
	}, i)), t && (i = /*#__PURE__*/ g.createElement(Ou, null, i)), i;
};
// node_modules/antd/es/_util/PurePanel.js
function Dp(e) {
	return (t) => /*#__PURE__*/ g.createElement(tu, { theme: { token: {
		motion: !1,
		zIndexPopupBase: 0
	} } }, /*#__PURE__*/ g.createElement(e, { ...t }));
}
/* istanbul ignore next */
var Op = (e, t, n, r, i) => Dp((a) => {
	let { prefixCls: o, style: s } = a, c = g.useRef(null), [l, u] = g.useState(0), [d, f] = g.useState(0), [p, m] = S(!1, a.open), { getPrefixCls: h } = g.useContext(kt), _ = h(r || "select", o);
	g.useEffect(() => {
		if (m(!0), typeof ResizeObserver < "u") {
			let e = new ResizeObserver((e) => {
				let t = e[0].target;
				u(t.offsetHeight + 8), f(t.offsetWidth);
			}), t = setInterval(() => {
				let n = i ? `.${i(_)}` : `.${_}-dropdown`, r = c.current?.querySelector(n);
				r && (clearInterval(t), e.observe(r));
			}, 10);
			return () => {
				clearInterval(t), e.disconnect();
			};
		}
	}, [_]);
	let v = {
		...a,
		style: {
			...s,
			margin: 0
		},
		open: p,
		getPopupContainer: () => c.current
	};
	n && (v = n(v)), t && (v = {
		...v,
		[t]: { overflow: {
			adjustX: !1,
			adjustY: !1
		} }
	});
	let y = {
		paddingBottom: l,
		position: "relative",
		minWidth: d
	};
	return /*#__PURE__*/ g.createElement("div", {
		ref: c,
		style: y
	}, /*#__PURE__*/ g.createElement(e, { ...v }));
}), kp = (e, t, n, r, i = !1, a, o) => {
	let s = (0, g.useMemo)(() => typeof n == "boolean" ? { allowClear: n } : n && typeof n == "object" ? n : { allowClear: !1 }, [n]);
	return (0, g.useMemo)(() => {
		let e = !i && s.allowClear !== !1 && (t.length || a) && (o !== "combobox" || a !== "");
		return {
			allowClear: e,
			clearIcon: e ? s.clearIcon || r || "×" : null,
			label: e ? s.label ?? "Clear" : ""
		};
	}, [
		s,
		r,
		i,
		t.length,
		a,
		o
	]);
}, Ap = /*#__PURE__*/ g.createContext(null);
function jp() {
	return g.useContext(Ap);
}
// node_modules/@rc-component/select/es/hooks/useLock.js
function Mp(e = 250) {
	let t = g.useRef(null), n = g.useRef(null);
	g.useEffect(() => () => {
		window.clearTimeout(n.current);
	}, []);
	function r(r) {
		(r || t.current === null) && (t.current = r), window.clearTimeout(n.current), n.current = window.setTimeout(() => {
			t.current = null;
		}, e);
	}
	return [() => t.current, r];
}
// node_modules/@rc-component/select/es/hooks/useSelectTriggerControl.js
function Np(e, t) {
	return e.filter((e) => e).some((e) => e.contains(t) || e === t);
}
function Pp(e, t, n, r) {
	let i = _((i) => {
		if (r) return;
		let a = i.target;
		a.shadowRoot && i.composed && (a = i.composedPath()[0] || a), i._ori_target && (a = i._ori_target), t && !Np(e(), a) && n(!1);
	});
	g.useEffect(() => (window.addEventListener("mousedown", i), () => window.removeEventListener("mousedown", i)), [i]);
}
// node_modules/@rc-component/select/es/SelectTrigger.js
function Fp() {
	return Fp = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Fp.apply(this, arguments);
}
var Ip = (e) => {
	let t = e === !0 ? 0 : 1;
	return {
		bottomLeft: {
			points: ["tl", "bl"],
			offset: [0, 4],
			overflow: {
				adjustX: t,
				adjustY: 1
			},
			htmlRegion: "scroll"
		},
		bottomRight: {
			points: ["tr", "br"],
			offset: [0, 4],
			overflow: {
				adjustX: t,
				adjustY: 1
			},
			htmlRegion: "scroll"
		},
		topLeft: {
			points: ["bl", "tl"],
			offset: [0, -4],
			overflow: {
				adjustX: t,
				adjustY: 1
			},
			htmlRegion: "scroll"
		},
		topRight: {
			points: ["br", "tr"],
			offset: [0, -4],
			overflow: {
				adjustX: t,
				adjustY: 1
			},
			htmlRegion: "scroll"
		}
	};
}, Lp = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { prefixCls: n, disabled: r, visible: i, children: a, popupElement: o, animation: s, transitionName: c, popupStyle: l, popupClassName: u, direction: d = "ltr", placement: f, builtinPlacements: p, popupMatchSelectWidth: m, popupRender: h, popupAlign: _, getPopupContainer: v, empty: y, onPopupVisibleChange: b, onPopupMouseEnter: x, onPopupMouseDown: S, onPopupBlur: C, ...w } = e, T = `${n}-dropdown`, E = o;
	h && (E = h(o));
	let D = g.useMemo(() => p || Ip(m), [p, m]), O = s ? `${T}-${s}` : c, k = typeof m == "number", A = g.useMemo(() => m === !1 || k ? "minWidth" : "width", [m, k]), j = l;
	k && (j = {
		...l,
		width: m
	});
	let M = g.useRef(null);
	return g.useImperativeHandle(t, () => ({ getPopupElement: () => M.current?.popupElement })), /*#__PURE__*/ g.createElement(Pl, Fp({}, w, {
		showAction: b ? ["click"] : [],
		hideAction: b ? ["click"] : [],
		popupPlacement: f || (d === "rtl" ? "bottomRight" : "bottomLeft"),
		builtinPlacements: D,
		prefixCls: T,
		popupMotion: { motionName: O },
		popup: /*#__PURE__*/ g.createElement("div", {
			onMouseEnter: x,
			onMouseDown: S,
			onBlur: C
		}, E),
		ref: M,
		stretch: A,
		popupAlign: _,
		popupVisible: i,
		getPopupContainer: v,
		popupClassName: Z(u, { [`${T}-empty`]: y }),
		popupStyle: j,
		onPopupVisibleChange: b
	}), a);
});
// node_modules/@rc-component/select/es/utils/valueUtil.js
function Rp(e, t) {
	let { key: n } = e, r;
	return "value" in e && ({value: r} = e), n ?? (r === void 0 ? `rc-index-key-${t}` : r);
}
function zp(e) {
	return e !== void 0 && !Number.isNaN(e);
}
function Bp(e, t) {
	let { label: n, value: r, options: i, groupLabel: a } = e || {}, o = n || (t ? "children" : "label");
	return {
		label: o,
		value: r || "value",
		options: i || "options",
		groupLabel: a || o
	};
}
function Vp(e, { fieldNames: t, childrenAsData: n } = {}) {
	let r = [], { label: i, value: a, options: o, groupLabel: s } = Bp(t, !1);
	function c(e, t) {
		Array.isArray(e) && e.forEach((e) => {
			if (t || !(o in e)) {
				let n = e[a];
				r.push({
					key: Rp(e, r.length),
					groupOption: t,
					data: e,
					label: e[i],
					value: n
				});
			} else {
				let t = e[s];
				t === void 0 && n && (t = e.label), r.push({
					key: Rp(e, r.length),
					group: !0,
					data: e,
					label: t
				}), c(e[o], !0);
			}
		});
	}
	return c(e, !1), r;
}
function Hp(e) {
	let t = { ...e };
	return "props" in t || Object.defineProperty(t, "props", { get() {
		return Ae(!1, "Return type is option instead of Option instance. Please read value directly instead of reading from `props`."), t;
	} }), t;
}
var Up = (e, t, n) => {
	if (!t || !t.length) return null;
	let r = !1, i = (e, [t, ...n]) => {
		if (!t) return [e];
		let a = e.split(t);
		return r ||= a.length > 1, a.reduce((e, t) => [...e, ...i(t, n)], []).filter(Boolean);
	}, a = i(e, t);
	return r ? n === void 0 ? a : a.slice(0, n) : null;
};
// node_modules/@rc-component/select/es/BaseSelect/Polite.js
function Wp(e) {
	let { visible: t, values: n } = e;
	return t ? /*#__PURE__*/ g.createElement("span", {
		"aria-live": "polite",
		style: {
			width: 0,
			height: 0,
			position: "absolute",
			overflow: "hidden",
			opacity: 0
		}
	}, `${n.slice(0, 50).map(({ label: e, value: t }) => ["number", "string"].includes(typeof e) ? e : t).join(", ")}`, n.length > 50 ? ", ..." : null) : null;
}
// node_modules/@rc-component/select/es/hooks/useOpen.js
var Gp = (e) => {
	let t = new MessageChannel();
	t.port1.onmessage = e, t.port2.postMessage(null);
}, Kp = (e, t = 1) => {
	t <= 0 ? e() : Gp(() => {
		Kp(e, t - 1);
	});
};
function qp(e, t, n, r) {
	let [i, a] = (0, g.useState)(!1);
	(0, g.useEffect)(() => {
		a(!0);
	}, []);
	let [o, s] = S(e, t), [c, l] = (0, g.useState)(!1), u = i ? o : !1, d = r(u), f = (0, g.useRef)(0), p = _((e) => {
		n && d !== e && n(e), s(e);
	});
	return [
		u,
		d,
		_((e, t = {}) => {
			let { cancelFun: n } = t;
			f.current += 1;
			let r = f.current, i = typeof e == "boolean" ? e : !d;
			l(!i);
			function a() {
				r === f.current && !n?.() && (p(i), l(!1));
			}
			i ? a() : Kp(() => {
				a();
			});
		}),
		c
	];
}
// node_modules/@rc-component/select/es/SelectInput/Affix.js
function Jp(e) {
	let { children: t, ...n } = e;
	return t ? /*#__PURE__*/ g.createElement("div", n, t) : null;
}
// node_modules/@rc-component/select/es/SelectInput/context.js
var Yp = /*#__PURE__*/ g.createContext(null);
function Xp() {
	return g.useContext(Yp);
}
// node_modules/@rc-component/select/es/SelectInput/Input.js
var Zp = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { onChange: n, onKeyDown: r, onBlur: i, style: a, syncWidth: o, value: s, className: c, autoComplete: l, ...u } = e, { prefixCls: d, mode: f, onSearch: p, onSearchSubmit: m, onInputBlur: h, autoFocus: _, tokenWithEnter: v, placeholder: y, components: { input: x = "input" } } = Xp(), { id: S, classNames: C, styles: w, open: T, activeDescendantId: E, role: D, disabled: O } = jp() || {}, k = Z(`${d}-input`, C?.input, c), A = g.useRef(!1), j = g.useRef(null), M = g.useRef(null);
	g.useImperativeHandle(t, () => M.current);
	let N = (e) => {
		let { value: t } = e.target;
		if (v && j.current && /[\r\n]/.test(j.current)) {
			let e = j.current.replace(/[\r\n]+$/, "").replace(/\r\n/g, " ").replace(/[\r\n]/g, " ");
			t = t.replace(e, j.current);
		}
		j.current = null, p && p(t, !0, A.current), n?.(e);
	}, P = (e) => {
		let { key: t } = e, { value: n } = e.currentTarget;
		t === "Enter" && f === "tags" && !T && !A.current && m && m(n), r?.(e);
	}, F = (e) => {
		h?.(), i?.(e);
	}, I = () => {
		A.current = !0;
	}, L = (e) => {
		if (A.current = !1, f !== "combobox") {
			let { value: t } = e.currentTarget;
			p?.(t, !0, !1);
		}
	}, R = (e) => {
		let { clipboardData: t } = e, n = t?.getData("text");
		j.current = n || "";
	}, [z, ee] = g.useState(void 0);
	b(() => {
		let e = M.current;
		if (o && e) {
			e.style.width = "0px";
			let t = e.scrollWidth;
			ee(t), e.style.width = "";
		}
	}, [o, s]);
	let B = {
		id: S,
		type: "text",
		...u,
		ref: M,
		style: {
			...w?.input,
			...a,
			"--select-input-width": z
		},
		autoFocus: _,
		autoComplete: l || "new-password",
		className: k,
		disabled: O,
		value: s || "",
		onChange: N,
		onKeyDown: P,
		onBlur: F,
		onPaste: R,
		onCompositionStart: I,
		onCompositionEnd: L,
		role: D || "combobox",
		"aria-expanded": T || !1,
		"aria-haspopup": "listbox",
		"aria-owns": T ? `${S}_list` : void 0,
		"aria-autocomplete": "list",
		"aria-controls": T ? `${S}_list` : void 0,
		"aria-activedescendant": T ? E : void 0
	};
	if (/*#__PURE__*/ g.isValidElement(x)) {
		let t = x.props || {}, n = {
			placeholder: e.placeholder || y,
			...B,
			...t
		};
		return Object.keys(t).forEach((e) => {
			let r = t[e];
			typeof r == "function" && (n[e] = (...t) => {
				r(...t), B[e]?.(...t);
			});
		}), n.ref = ne(x.ref, B.ref), /*#__PURE__*/ g.cloneElement(x, n);
	}
	let V = x;
	return /*#__PURE__*/ g.createElement(V, B);
});
// node_modules/@rc-component/select/es/SelectInput/Content/Placeholder.js
function Qp(e) {
	let { prefixCls: t, placeholder: n, displayValues: r } = Xp(), { classNames: i, styles: a } = jp(), { show: o = !0 } = e;
	return r.length ? null : /*#__PURE__*/ g.createElement("div", {
		className: Z(`${t}-placeholder`, i?.placeholder),
		style: {
			...o ? {} : { visibility: "hidden" },
			...a?.placeholder
		}
	}, n);
}
// node_modules/@rc-component/select/es/SelectContext.js
var $p = /*#__PURE__*/ g.createContext(null);
// node_modules/@rc-component/select/es/utils/commonUtil.js
function em(e) {
	return Array.isArray(e) ? e : e === void 0 ? [] : [e];
}
typeof window < "u" && window.document && window.document.documentElement;
function tm(e) {
	return e != null;
}
function nm(e) {
	return !e && e !== 0;
}
function rm(e) {
	return ["string", "number"].includes(typeof e);
}
function im(e) {
	let t;
	return e && (rm(e.title) ? t = e.title.toString() : rm(e.label) && (t = e.label.toString())), t;
}
// node_modules/@rc-component/select/es/SelectInput/Content/SingleContent.js
function am() {
	return am = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, am.apply(this, arguments);
}
var om = /*#__PURE__*/ g.forwardRef(({ inputProps: e }, t) => {
	let { prefixCls: n, searchValue: r, activeValue: i, displayValues: a, maxLength: o, mode: s, components: c } = Xp(), { triggerOpen: l, title: u, showSearch: d, classNames: f, styles: p } = jp(), m = g.useContext($p), [h, _] = g.useState(!1), v = s === "combobox", y = a[0], b = g.useMemo(() => v && i && !h && l ? i : d ? r : "", [
		v,
		i,
		h,
		l,
		r,
		d
	]), [x, S, C, w] = g.useMemo(() => {
		let e, t, n;
		if (y && m?.flattenOptions) {
			let r = m.flattenOptions.find((e) => e.value === y.value);
			r?.data && (e = r.data.className, t = r.data.style, n = im(r.data));
		}
		return y && !n && (n = im(y)), u !== void 0 && (n = u), [
			e,
			t,
			n,
			!!e || !!t
		];
	}, [
		y,
		m?.flattenOptions,
		u
	]);
	g.useEffect(() => {
		v && _(!1);
	}, [v, i]);
	let T = y && y.label !== null && y.label !== void 0 && String(y.label).trim() !== "", E = v && c?.input ? null : y ? w ? /*#__PURE__*/ g.createElement("div", {
		className: Z(`${n}-content-value`, x),
		style: {
			...b ? { visibility: "hidden" } : {},
			...S
		},
		title: C
	}, y.label) : y.label : /*#__PURE__*/ g.createElement(Qp, { show: !b });
	return /*#__PURE__*/ g.createElement("div", {
		className: Z(`${n}-content`, T && `${n}-content-has-value`, b && `${n}-content-has-search-value`, w && `${n}-content-has-option-style`, f?.content),
		style: p?.content,
		title: w ? void 0 : C
	}, E, /*#__PURE__*/ g.createElement(Zp, am({ ref: t }, e, {
		value: b,
		maxLength: s === "combobox" ? o : void 0,
		onChange: (t) => {
			_(!0), e.onChange?.(t);
		}
	})));
}), sm = void 0;
function cm(e, t) {
	let { prefixCls: n, invalidate: r, item: i, renderItem: a, responsive: o, responsiveDisabled: s, registerSize: c, itemKey: l, className: u, style: d, children: f, display: p, order: m, component: h = "div", ..._ } = e, v = o && !p;
	function y(e) {
		c(l, e);
	}
	g.useEffect(() => () => {
		y(null);
	}, []);
	let b = a && i !== sm ? a(i, { index: m }) : f, x;
	r || (x = {
		opacity: +!v,
		height: v ? 0 : sm,
		overflowY: v ? "hidden" : sm,
		order: o ? m : sm,
		pointerEvents: v ? "none" : sm,
		position: v ? "absolute" : sm
	});
	let S = {};
	v && (S["aria-hidden"] = !0);
	let C = /*#__PURE__*/ g.createElement(h, gd({
		className: Z(!r && n, u),
		style: {
			...x,
			...d
		}
	}, S, _, { ref: t }), b);
	return o && (C = /*#__PURE__*/ g.createElement(yt, {
		onResize: ({ offsetWidth: e }) => {
			y(e);
		},
		disabled: s
	}, C)), C;
}
var lm = /*#__PURE__*/ g.forwardRef(cm);
// node_modules/@rc-component/overflow/es/hooks/channelUpdate.js
function um(e) {
	if (typeof MessageChannel > "u") O(e);
	else {
		let t = new MessageChannel();
		t.port1.onmessage = () => e(), t.port2.postMessage(void 0);
	}
}
// node_modules/@rc-component/overflow/es/hooks/useEffectState.js
function dm() {
	let e = g.useRef(null);
	return (t) => {
		e.current || (e.current = [], um(() => {
			(0, et.unstable_batchedUpdates)(() => {
				e.current.forEach((e) => {
					e();
				}), e.current = null;
			});
		})), e.current.push(t);
	};
}
function fm(e, t) {
	let [n, r] = g.useState(t);
	return [n, _((t) => {
		e(() => {
			r(t);
		});
	})];
}
// node_modules/@rc-component/overflow/es/context.js
var pm = /*#__PURE__*/ g.createContext(null), mm = /*#__PURE__*/ g.forwardRef((e, t) => {
	let n = g.useContext(pm);
	if (!n) {
		let { component: n = "div", ...r } = e;
		return /*#__PURE__*/ g.createElement(n, gd({}, r, { ref: t }));
	}
	let { className: r, ...i } = n, { className: a, ...o } = e;
	return /*#__PURE__*/ g.createElement(pm.Provider, { value: null }, /*#__PURE__*/ g.createElement(lm, gd({
		ref: t,
		className: Z(r, a)
	}, i, o)));
}), hm = "responsive", gm = "invalidate";
function _m(e) {
	return `+ ${e.length} ...`;
}
function vm(e, t) {
	let { prefixCls: n = "rc-overflow", data: r = [], renderItem: i, renderRawItem: a, itemKey: o, itemWidth: s = 10, ssr: c, style: l, className: u, maxCount: d, renderRest: f, renderRawRest: p, prefix: m, suffix: h, component: _ = "div", itemComponent: v, onVisibleChange: y, ...x } = e, S = c === "full", C = dm(), [w, T] = fm(C, null), E = w || 0, [D, O] = fm(C, /* @__PURE__ */ new Map()), [k, A] = fm(C, 0), [j, M] = fm(C, 0), [N, P] = fm(C, 0), [F, I] = fm(C, 0), [L, R] = (0, g.useState)(null), [z, ee] = (0, g.useState)(null), B = g.useMemo(() => z === null && S ? 2 ** 53 - 1 : z || 0, [z, w]), [V, H] = (0, g.useState)(!1), te = `${n}-item`, ne = Math.max(k, j), re = d === hm, U = r.length && re, ie = d === gm, ae = U || typeof d == "number" && r.length > d, oe = (0, g.useMemo)(() => {
		let e = r;
		return U ? e = w === null && S ? r : r.slice(0, Math.min(r.length, E / s)) : typeof d == "number" && (e = r.slice(0, d)), e;
	}, [
		r,
		s,
		w,
		d,
		U
	]), se = (0, g.useMemo)(() => U ? r.slice(B + 1) : r.slice(oe.length), [
		r,
		oe,
		U,
		B
	]), W = (0, g.useCallback)((e, t) => typeof o == "function" ? o(e) : (o && e?.[o]) ?? t, [o]), ce = (0, g.useCallback)(i || ((e) => e), [i]);
	function le(e, t, n) {
		(z !== e || t !== void 0 && t !== L) && (ee(e), n || (H(e < r.length - 1), y?.(e)), t !== void 0 && R(t));
	}
	function ue(e, t) {
		T(t.clientWidth);
	}
	function G(e, t) {
		O((n) => {
			let r = new Map(n);
			return t === null ? r.delete(e) : r.set(e, t), r;
		});
	}
	function de(e, t) {
		M(t), A(j);
	}
	function K(e, t) {
		P(t);
	}
	function q(e, t) {
		I(t);
	}
	function fe(e) {
		return D.get(W(oe[e], e));
	}
	b(() => {
		if (E && typeof ne == "number" && oe) {
			let e = N + F, t = oe.length, n = t - 1;
			if (!t) {
				le(0, null);
				return;
			}
			for (let r = 0; r < t; r += 1) {
				let t = fe(r);
				if (S && (t ||= 0), t === void 0) {
					le(r - 1, void 0, !0);
					break;
				}
				if (e += t, n === 0 && e <= E || r === n - 1 && e + fe(n) <= E) {
					le(n, null);
					break;
				}
				if (e + ne > E) {
					le(r - 1, e - t - F + j);
					break;
				}
			}
			h && fe(0) + F > E && R(null);
		}
	}, [
		E,
		D,
		j,
		N,
		F,
		W,
		oe
	]);
	let pe = V && !!se.length, me = {};
	L !== null && U && (me = {
		position: "absolute",
		top: 0,
		insetInlineStart: L
	});
	let J = {
		prefixCls: te,
		responsive: U,
		component: v,
		invalidate: ie
	}, Y = a ? (e, t) => {
		let n = W(e, t);
		return /*#__PURE__*/ g.createElement(pm.Provider, {
			key: n,
			value: {
				...J,
				order: t,
				item: e,
				itemKey: n,
				registerSize: G,
				display: t <= B
			}
		}, a(e, t));
	} : (e, t) => {
		let n = W(e, t);
		return /*#__PURE__*/ g.createElement(lm, gd({}, J, {
			order: t,
			key: n,
			item: e,
			renderItem: ce,
			itemKey: n,
			registerSize: G,
			display: t <= B
		}));
	}, he = {
		order: pe ? B : 2 ** 53 - 1,
		className: `${te}-rest`,
		registerSize: de,
		display: pe
	}, ge = f || _m, _e = p ? /*#__PURE__*/ g.createElement(pm.Provider, { value: {
		...J,
		...he
	} }, p(se)) : /*#__PURE__*/ g.createElement(lm, gd({}, J, he), typeof ge == "function" ? ge(se) : ge), ve = /*#__PURE__*/ g.createElement(_, gd({
		className: Z(!ie && n, u),
		style: l,
		ref: t
	}, x), m && /*#__PURE__*/ g.createElement(lm, gd({}, J, {
		responsive: re,
		responsiveDisabled: !U,
		order: -1,
		className: `${te}-prefix`,
		registerSize: K,
		display: !0
	}), m), oe.map(Y), ae ? _e : null, h && /*#__PURE__*/ g.createElement(lm, gd({}, J, {
		responsive: re,
		responsiveDisabled: !U,
		order: B,
		className: `${te}-suffix`,
		registerSize: q,
		display: !0,
		style: me
	}), h));
	return re ? /*#__PURE__*/ g.createElement(yt, {
		onResize: ue,
		disabled: !U
	}, ve) : ve;
}
var ym = /*#__PURE__*/ g.forwardRef(vm);
ym.Item = mm, ym.RESPONSIVE = hm, ym.INVALIDATE = gm;
// node_modules/@rc-component/overflow/es/index.js
var bm = ym, xm = (e) => {
	let { className: t, style: n, customizeIcon: r, customizeIconProps: i, children: a, onMouseDown: o, onClick: s } = e, c = typeof r == "function" ? r(i) : r;
	return /*#__PURE__*/ g.createElement("span", {
		className: t,
		onMouseDown: (e) => {
			e.preventDefault(), o?.(e);
		},
		style: {
			userSelect: "none",
			WebkitUserSelect: "none",
			...n
		},
		unselectable: "on",
		onClick: s,
		"aria-hidden": !0
	}, c === void 0 ? /*#__PURE__*/ g.createElement("span", { className: Z(t.split(/\s+/).map((e) => `${e}-icon`)) }, a) : c);
};
// node_modules/@rc-component/select/es/SelectInput/Content/MultipleContent.js
function Sm() {
	return Sm = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Sm.apply(this, arguments);
}
function Cm(e) {
	return e.key ?? e.value;
}
var wm = (e) => {
	e.preventDefault(), e.stopPropagation();
}, Tm = /*#__PURE__*/ g.forwardRef(function({ inputProps: e }, t) {
	let { prefixCls: n, displayValues: r, searchValue: i, mode: a, onSelectorRemove: o, removeIcon: s } = Xp(), { disabled: c, showSearch: l, triggerOpen: u, rawOpen: d, toggleOpen: f, autoClearSearchValue: p, tagRender: m, maxTagPlaceholder: h, maxTagTextLength: _, maxTagCount: v, classNames: y, styles: b } = jp(), x = `${n}-selection-item`, S = i;
	!d && a === "multiple" && p !== !1 && (S = "");
	let C = l && S || "", w = l && !c, T = s ?? "×", E = h ?? ((e) => `+ ${e.length} ...`), D = m, O = (e) => {
		f(e);
	}, k = (e) => {
		o?.(e);
	}, A = (e, t, n, r, i) => /*#__PURE__*/ g.createElement("span", {
		title: im(e),
		className: Z(x, { [`${x}-disabled`]: n }, y?.item),
		style: b?.item
	}, /*#__PURE__*/ g.createElement("span", {
		className: Z(`${x}-content`, y?.itemContent),
		style: b?.itemContent
	}, t), r && /*#__PURE__*/ g.createElement(xm, {
		className: Z(`${x}-remove`, y?.itemRemove),
		style: b?.itemRemove,
		onMouseDown: wm,
		onClick: i,
		customizeIcon: T
	}, "×")), j = (e, t, n, r, i, a, o) => /*#__PURE__*/ g.createElement("span", { onMouseDown: (e) => {
		wm(e), O(!u);
	} }, D({
		label: t,
		value: e,
		index: o?.index,
		disabled: n,
		closable: r,
		onClose: i,
		isMaxTag: !!a
	}));
	return /*#__PURE__*/ g.createElement(bm, {
		prefixCls: `${n}-content`,
		className: y?.content,
		style: b?.content,
		prefix: !r.length && !C && /*#__PURE__*/ g.createElement(Qp, null),
		data: r,
		renderItem: (e, t) => {
			let { disabled: n, label: r, value: i } = e, a = !c && !n, o = r;
			if (typeof _ == "number" && (typeof r == "string" || typeof r == "number")) {
				let e = String(o);
				e.length > _ && (o = `${e.slice(0, _)}...`);
			}
			let s = (t) => {
				t && t.stopPropagation(), k(e);
			};
			return typeof D == "function" ? j(i, o, n, a, s, void 0, t) : A(e, o, n, a, s);
		},
		renderRest: (e) => {
			if (!r.length) return null;
			let t = typeof E == "function" ? E(e) : E;
			return typeof D == "function" ? j(void 0, t, !1, !1, void 0, !0) : A({ title: t }, t, !1);
		},
		suffix: /*#__PURE__*/ g.createElement(Zp, Sm({
			ref: t,
			disabled: c,
			readOnly: !w
		}, e, {
			value: C || "",
			syncWidth: !0
		})),
		itemKey: Cm,
		maxCount: v
	});
}), Em = /*#__PURE__*/ g.forwardRef(function(e, t) {
	let { multiple: n, onInputKeyDown: r, tabIndex: i } = Xp(), a = jp(), { showSearch: o } = a, s = {
		...Be(a, { aria: !0 }),
		onKeyDown: r,
		readOnly: !o,
		tabIndex: i
	};
	return n ? /*#__PURE__*/ g.createElement(Tm, {
		ref: t,
		inputProps: s
	}) : /*#__PURE__*/ g.createElement(om, {
		ref: t,
		inputProps: s
	});
});
// node_modules/@rc-component/select/es/utils/keyUtil.js
function Dm(e) {
	return e && ![
		X.ESC,
		X.SHIFT,
		X.BACKSPACE,
		X.TAB,
		X.WIN_KEY,
		X.ALT,
		X.META,
		X.WIN_KEY_RIGHT,
		X.CTRL,
		X.SEMICOLON,
		X.EQUALS,
		X.CAPS_LOCK,
		X.CONTEXT_MENU,
		X.UP,
		X.LEFT,
		X.RIGHT,
		X.F1,
		X.F2,
		X.F3,
		X.F4,
		X.F5,
		X.F6,
		X.F7,
		X.F8,
		X.F9,
		X.F10,
		X.F11,
		X.F12
	].includes(e);
}
// node_modules/@rc-component/select/es/SelectInput/index.js
function Om() {
	return Om = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Om.apply(this, arguments);
}
var km = [
	"value",
	"onChange",
	"removeIcon",
	"placeholder",
	"maxTagCount",
	"maxTagTextLength",
	"maxTagPlaceholder",
	"choiceTransitionName",
	"onInputKeyDown",
	"onPopupScroll",
	"tabIndex",
	"activeValue",
	"onSelectorRemove",
	"focused"
], Am = /*#__PURE__*/ g.forwardRef(function(e, t) {
	let { prefixCls: n, className: r, style: i, prefix: a, suffix: o, clearIcon: s, clearLabel: c, children: l, multiple: u, displayValues: d, placeholder: f, mode: p, searchValue: m, onSearch: h, onSearchSubmit: v, onInputBlur: y, maxLength: b, autoFocus: x, onMouseDown: S, onClearMouseDown: C, onInputKeyDown: w, onSelectorRemove: T, tokenWithEnter: E, components: D, ...O } = e, { triggerOpen: k, toggleOpen: A, showSearch: j, disabled: M, loading: N, classNames: P, styles: F } = jp(), I = g.useRef(null), L = g.useRef(null), R = _((e) => {
		let { which: t } = e, n = L.current instanceof HTMLTextAreaElement;
		!n && k && (t === X.UP || t === X.DOWN) && e.preventDefault(), w && w(e), !(n && !k && ~[
			X.UP,
			X.DOWN,
			X.LEFT,
			X.RIGHT
		].indexOf(t)) && !(e.ctrlKey || e.altKey || e.metaKey) && Dm(t) && A(!0);
	});
	g.useImperativeHandle(t, () => ({
		focus: (e) => {
			(L.current || I.current).focus?.(e);
		},
		blur: () => {
			(L.current || I.current).blur?.();
		},
		nativeElement: ge(I.current)
	}));
	let z = _((e) => {
		if (!M) {
			let t = ge(L.current);
			e.nativeEvent._ori_target = t;
			let n = t === e.target || t?.contains(e.target);
			t && !n && e.preventDefault();
			let r = k && !u && (p === "combobox" || j) || k && u && n;
			e.nativeEvent._select_lazy ? k && !u && A(!1) : (L.current?.focus(), r || A());
		}
		S?.(e);
	}), ee = (e) => {
		(e.key === "Enter" || e.key === " ") && e.stopPropagation();
	}, { root: B } = D, V = Fe(O, km), H = Be(V, { aria: !0 }), te = Object.keys(H), re = {
		...e,
		onInputKeyDown: R
	};
	if (B) {
		let e = B.props || {}, t = {
			...e,
			...V
		};
		return Object.keys(e).forEach((n) => {
			let r = e[n], i = V[n];
			typeof r == "function" && typeof i == "function" && (t[n] = (...e) => {
				i(...e), r(...e);
			});
		}), /*#__PURE__*/ g.isValidElement(B) ? /*#__PURE__*/ g.cloneElement(B, {
			...t,
			ref: ne(B.ref, I)
		}) : /*#__PURE__*/ g.createElement(B, Om({}, t, { ref: I }));
	}
	return /*#__PURE__*/ g.createElement(Yp.Provider, { value: re }, /*#__PURE__*/ g.createElement("div", Om({}, Fe(V, te), {
		ref: I,
		className: r,
		style: i,
		onMouseDown: z
	}), /*#__PURE__*/ g.createElement(Jp, {
		className: Z(`${n}-prefix`, P?.prefix),
		style: F?.prefix
	}, a), /*#__PURE__*/ g.createElement(Em, { ref: L }), /*#__PURE__*/ g.createElement(Jp, {
		className: Z(`${n}-suffix`, { [`${n}-suffix-loading`]: N }, P?.suffix),
		style: F?.suffix
	}, o), s && /*#__PURE__*/ g.createElement("button", {
		type: "button",
		"aria-label": c,
		className: Z(`${n}-clear`, P?.clear),
		style: F?.clear,
		onMouseDown: (e) => {
			e.preventDefault(), e.nativeEvent._select_lazy = !0;
		},
		onKeyDown: ee,
		onClick: C
	}, s), l));
});
// node_modules/@rc-component/select/es/hooks/useComponents.js
function jm(e, t, n) {
	return g.useMemo(() => {
		let { root: r, input: i } = e || {};
		return n && (r = n()), t && (i = t()), {
			root: r,
			input: i
		};
	}, [
		e,
		t,
		n
	]);
}
// node_modules/@rc-component/select/es/BaseSelect/index.js
function Mm() {
	return Mm = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Mm.apply(this, arguments);
}
var Nm = (e) => e === "tags" || e === "multiple", Pm = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { id: n, prefixCls: r, className: i, styles: a, classNames: o, showSearch: s, tagRender: c, showScrollBar: l = "optional", direction: u, omitDomProps: d, displayValues: f, onDisplayValuesChange: p, emptyOptions: m, notFoundContent: h = "Not Found", onClear: v, maxCount: y, placeholder: b, mode: x, disabled: S, loading: C, getInputElement: w, getRawInputElement: T, open: E, defaultOpen: D, onPopupVisibleChange: O, activeValue: k, onActiveValueChange: A, activeDescendantId: j, searchValue: M, autoClearSearchValue: N, onSearch: P, onSearchSplit: F, tokenSeparators: I, allowClear: L, prefix: R, suffix: z, suffixIcon: ee, clearIcon: B, OptionList: V, animation: H, transitionName: te, popupStyle: ne, popupClassName: re, popupMatchSelectWidth: U, popupRender: ie, popupAlign: ae, placement: oe, builtinPlacements: se, getPopupContainer: W, showAction: ce = [], onFocus: le, onBlur: ue, onKeyUp: G, onKeyDown: de, onMouseDown: K, components: q, ...fe } = e, pe = Nm(x), me = g.useRef(null), J = g.useRef(null), Y = g.useRef(null), [he, _e] = g.useState(!1);
	g.useImperativeHandle(t, () => ({
		focus: me.current?.focus,
		blur: me.current?.blur,
		scrollTo: (e) => Y.current?.scrollTo(e),
		nativeElement: ge(me.current)
	}));
	let ve = jm(q, w, T), ye = g.useMemo(() => {
		if (x !== "combobox") return M;
		let e = f[0]?.value;
		return typeof e == "string" || typeof e == "number" ? String(e) : "";
	}, [
		M,
		x,
		f
	]), be = x === "combobox" && typeof w == "function" && w() || null, X = !h && m, [xe, Se, Ce, we] = qp(D || !1, E, O, (e) => S || X ? !1 : e), Te = g.useMemo(() => typeof I == "function" || (I || []).some((e) => ["\n", "\r\n"].includes(e)), [I]), Ee = g.useMemo(() => typeof I == "function" ? (e, t) => {
		let n = I(e), r = Array.isArray(n) && n.length === 1 && n[0] === e;
		return !Array.isArray(n) || !n.length || r ? null : t === void 0 ? n : n.slice(0, t);
	} : (e, t) => Up(e, I, t), [I]), De = (e, t, n) => {
		if (pe && zp(y) && f.length >= y) return;
		let r = !0, i = e;
		A?.(null);
		let a = zp(y) ? y - f.length : void 0, o = n ? null : Ee(e, a);
		return x !== "combobox" && o && (i = "", F?.(o), Ce(!1), r = !1), P && ye !== i && P(i, { source: t ? "typing" : "effect" }), e && t && r && Ce(!0), r;
	}, Oe = (e) => {
		e && e.trim() && P(e, { source: "submit" });
	};
	g.useEffect(() => {
		!xe && !pe && x !== "combobox" && De("", !1, !1);
	}, [xe]), g.useEffect(() => {
		S && (Ce(!1), _e(!1));
	}, [S, Se]);
	let [ke, Ae] = Mp(), je = g.useRef(!1), Me = (e) => {
		let t = ke(), { key: n } = e, r = n === "Enter", i = n === " ";
		if (r || i) {
			let t = x === "combobox";
			(i && !(t || s) || r && !t) && e.preventDefault(), Se || Ce(!0);
		}
		if (Ae(!!ye), n === "Backspace" && !t && pe && !ye && f.length) {
			let e = [...f], t = null;
			for (let n = e.length - 1; n >= 0; --n) {
				let r = e[n];
				if (!r.disabled) {
					e.splice(n, 1), t = r;
					break;
				}
			}
			t && p(e, {
				type: "remove",
				values: [t]
			});
		}
		!Se || r && je.current || i || (r && (je.current = !0), Y.current?.onKeyDown(e)), de?.(e);
	}, Ne = (e, ...t) => {
		Se && Y.current?.onKeyUp(e, ...t), e.key === "Enter" && (je.current = !1), G?.(e, ...t);
	}, Pe = _((e) => {
		let t = f.filter((t) => t !== e);
		p(t, {
			type: "remove",
			values: [e]
		});
	}), Fe = () => {
		je.current = !1;
	}, Ie = () => [ge(me.current), J.current?.getPopupElement()];
	Pp(Ie, Se, Ce, !!ve.root);
	let Le = g.useRef(!1), Re = (e) => {
		_e(!0), S || (ce.includes("focus") && Ce(!0), le?.(e));
	}, ze = () => {
		Se && !Le.current && Ce(!1, { cancelFun: () => Np(Ie(), document.activeElement) });
	}, Be = (e) => {
		_e(!1), ye && (x === "tags" ? P(ye, { source: "submit" }) : x === "multiple" && P("", { source: "blur" })), ze(), S || ue?.(e);
	}, Ve = (e, ...t) => {
		let { target: n } = e;
		(J.current?.getPopupElement())?.contains(n) && Ce && Ce(!0), K?.(e, ...t), Le.current = !0, Kp(() => {
			Le.current = !1;
		});
	}, [, He] = g.useState({});
	function Ue() {
		He({});
	}
	let We;
	ve.root && (We = (e) => {
		Ce(e);
	});
	let Ge = g.useMemo(() => ({
		...e,
		notFoundContent: h,
		open: Se,
		triggerOpen: Se,
		rawOpen: xe,
		id: n,
		showSearch: s,
		multiple: pe,
		toggleOpen: Ce,
		showScrollBar: l,
		styles: a,
		classNames: o,
		lockOptions: we
	}), [
		e,
		h,
		Ce,
		n,
		s,
		pe,
		Se,
		xe,
		l,
		a,
		o,
		we
	]), Ke = g.useMemo(() => {
		let e = z ?? ee;
		return typeof e == "function" ? e({
			searchValue: ye,
			open: Se,
			focused: he,
			showSearch: s,
			loading: C
		}) : e;
	}, [
		z,
		ee,
		ye,
		Se,
		he,
		s,
		C
	]), qe = () => {
		v?.(), me.current?.focus(), p([], {
			type: "clear",
			values: f
		}), De("", !1, !1);
	}, { allowClear: Je, clearIcon: Ye, label: Xe } = kp(r, f, L, B, S, ye, x), Ze = /*#__PURE__*/ g.createElement(V, { ref: Y }), Qe = Z(r, i, {
		[`${r}-focused`]: he,
		[`${r}-multiple`]: pe,
		[`${r}-single`]: !pe,
		[`${r}-allow-clear`]: Je,
		[`${r}-show-arrow`]: Ke != null,
		[`${r}-disabled`]: S,
		[`${r}-loading`]: C,
		[`${r}-open`]: Se,
		[`${r}-customize-input`]: be,
		[`${r}-show-search`]: s
	}), $e = /*#__PURE__*/ g.createElement(Am, Mm({}, fe, {
		ref: me,
		prefixCls: r,
		className: Qe,
		focused: he,
		prefix: R,
		suffix: Ke,
		clearIcon: Ye,
		clearLabel: Xe,
		multiple: pe,
		mode: x,
		displayValues: f,
		placeholder: b,
		searchValue: ye,
		activeValue: k,
		onSearch: De,
		onSearchSubmit: Oe,
		onInputBlur: Fe,
		onFocus: Re,
		onBlur: Be,
		onClearMouseDown: qe,
		onKeyDown: Me,
		onKeyUp: Ne,
		onSelectorRemove: Pe,
		tokenWithEnter: Te,
		onMouseDown: Ve,
		components: ve
	}));
	return $e = /*#__PURE__*/ g.createElement(Lp, {
		ref: J,
		disabled: S,
		prefixCls: r,
		visible: Se,
		popupElement: Ze,
		animation: H,
		transitionName: te,
		popupStyle: ne,
		popupClassName: re,
		direction: u,
		popupMatchSelectWidth: U,
		popupRender: ie,
		popupAlign: ae,
		placement: oe,
		builtinPlacements: se,
		getPopupContainer: W,
		empty: m,
		onPopupVisibleChange: We,
		onPopupMouseEnter: Ue,
		onPopupMouseDown: Ve,
		onPopupBlur: ze
	}, $e), /*#__PURE__*/ g.createElement(Ap.Provider, { value: Ge }, /*#__PURE__*/ g.createElement(Wp, {
		visible: he && !Se,
		values: f
	}), $e);
}), Fm = () => null;
/* istanbul ignore file */
Fm.isSelectOptGroup = !0;
// node_modules/@rc-component/select/es/Option.js
/* istanbul ignore file */
var Im = () => null;
Im.isSelectOption = !0;
// node_modules/@rc-component/virtual-list/es/Filler.js
function Lm() {
	return Lm = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Lm.apply(this, arguments);
}
var Rm = /*#__PURE__*/ g.forwardRef(({ height: e, offsetY: t, offsetX: n, children: r, prefixCls: i, onInnerResize: a, innerProps: o, rtl: s, extra: c }, l) => {
	let u = {}, d = {
		display: "flex",
		flexDirection: "column"
	};
	return t !== void 0 && (u = {
		height: e,
		position: "relative",
		overflow: "hidden"
	}, d = {
		...d,
		transform: `translateY(${t}px)`,
		[s ? "marginRight" : "marginLeft"]: -n || 0,
		position: "absolute",
		left: 0,
		right: 0,
		top: 0
	}), /*#__PURE__*/ g.createElement("div", { style: u }, /*#__PURE__*/ g.createElement(yt, { onResize: ({ offsetHeight: e }) => {
		e && a && a();
	} }, /*#__PURE__*/ g.createElement("div", Lm({
		style: d,
		className: Z({ [`${i}-holder-inner`]: i }),
		ref: l
	}, o), r, c)));
});
Rm.displayName = "Filler";
// node_modules/@rc-component/virtual-list/es/Item.js
function zm({ children: e, setRef: t }) {
	let n = g.useCallback((e) => {
		t(e);
	}, [t]);
	return /*#__PURE__*/ g.cloneElement(e, { ref: n });
}
// node_modules/@rc-component/virtual-list/es/hooks/useChildren.js
function Bm(e, t, n, r, i, a, o, { getKey: s }) {
	return e.slice(t, n + 1).map((e, n) => {
		let c = o(e, t + n, {
			style: { width: r },
			offsetX: i
		}), l = s(e);
		return /*#__PURE__*/ g.createElement(zm, {
			key: l,
			setRef: (t) => a(e, t)
		}, c);
	});
}
// node_modules/@rc-component/virtual-list/es/utils/algorithmUtil.js
function Vm(e, t, n) {
	let r = e.length, i = t.length, a, o;
	if (r === 0 && i === 0) return null;
	r < i ? (a = e, o = t) : (a = t, o = e);
	let s = { __EMPTY_ITEM__: !0 };
	function c(e) {
		return e === void 0 ? s : n(e);
	}
	let l = null, u = Math.abs(r - i) !== 1;
	for (let e = 0; e < o.length; e += 1) {
		let t = c(a[e]);
		if (t !== c(o[e])) {
			l = e, u ||= t !== c(o[e + 1]);
			break;
		}
	}
	return l === null ? null : {
		index: l,
		multiple: u
	};
}
// node_modules/@rc-component/virtual-list/es/hooks/useDiffItem.js
function Hm(e, t, n) {
	let [r, i] = g.useState(e), [a, o] = g.useState(null);
	return g.useEffect(() => {
		let a = Vm(r || [], e || [], t);
		a?.index !== void 0 && (n?.(a.index), o(e[a.index])), i(e);
	}, [e]), [a];
}
// node_modules/@rc-component/virtual-list/es/utils/isFirefox.js
var Um = typeof navigator == "object" && /Firefox/i.test(navigator.userAgent), Wm = ((e, t, n, r) => {
	let i = (0, g.useRef)(!1), a = (0, g.useRef)(null);
	function o() {
		clearTimeout(a.current), i.current = !0, a.current = setTimeout(() => {
			i.current = !1;
		}, 50);
	}
	let s = (0, g.useRef)({
		top: e,
		bottom: t,
		left: n,
		right: r
	});
	return s.current.top = e, s.current.bottom = t, s.current.left = n, s.current.right = r, (e, t, n = !1) => {
		let r = e ? t < 0 && s.current.left || t > 0 && s.current.right : t < 0 && s.current.top || t > 0 && s.current.bottom;
		return n && r ? (clearTimeout(a.current), i.current = !1) : (!r || i.current) && o(), !i.current && r;
	};
});
// node_modules/@rc-component/virtual-list/es/hooks/useFrameWheel.js
function Gm(e, t, n, r, i, a, o) {
	let s = (0, g.useRef)(0), c = (0, g.useRef)(null), l = (0, g.useRef)(null), u = (0, g.useRef)(!1), d = Wm(t, n, r, i);
	function f(e, t) {
		if (O.cancel(c.current), d(!1, t)) return;
		let n = e;
		if (!n._virtualHandled) n._virtualHandled = !0;
		else return;
		s.current += t, l.current = t, Um || n.preventDefault(), c.current = O(() => {
			let e = u.current ? 10 : 1;
			o(s.current * e, !1), s.current = 0;
		});
	}
	function p(e, t) {
		o(t, !0), Um || e.preventDefault();
	}
	let m = (0, g.useRef)(null), h = (0, g.useRef)(null);
	function _(t) {
		if (!e) return;
		O.cancel(h.current), h.current = O(() => {
			m.current = null;
		}, 2);
		let { deltaX: n, deltaY: r, shiftKey: i } = t, o = n, s = r;
		(m.current === "sx" || !m.current && i && r && !n) && (o = r, s = 0, m.current = "sx");
		let c = Math.abs(o), l = Math.abs(s);
		m.current === null && (m.current = a && c > l ? "x" : "y"), m.current === "y" ? f(t, s) : p(t, o);
	}
	function v(t) {
		e && (u.current = t.detail === l.current);
	}
	return [_, v];
}
// node_modules/@rc-component/virtual-list/es/hooks/useGetSize.js
function Km(e, t, n, r) {
	let [i, a] = g.useMemo(() => [/* @__PURE__ */ new Map(), []], [
		e,
		n.id,
		r
	]);
	return (o, s = o) => {
		let c = i.get(o), l = i.get(s);
		if (c === void 0 || l === void 0) {
			let u = e.length;
			for (let d = a.length; d < u; d += 1) {
				let u = e[d], f = t(u);
				i.set(f, d);
				let p = n.get(f) ?? r;
				if (a[d] = (a[d - 1] || 0) + p, f === o && (c = d), f === s && (l = d), c !== void 0 && l !== void 0) break;
			}
		}
		return {
			top: a[c - 1] || 0,
			bottom: a[l]
		};
	};
}
// node_modules/@rc-component/virtual-list/es/utils/CacheMap.js
var qm = class {
	maps;
	id = 0;
	diffRecords = /* @__PURE__ */ new Map();
	constructor() {
		this.maps = Object.create(null);
	}
	set(e, t) {
		this.diffRecords.set(e, this.maps[e]), this.maps[e] = t, this.id += 1;
	}
	get(e) {
		return this.maps[e];
	}
	resetRecord() {
		this.diffRecords.clear();
	}
	getRecord() {
		return this.diffRecords;
	}
};
// node_modules/@rc-component/virtual-list/es/hooks/useHeights.js
function Jm(e) {
	let t = parseFloat(e);
	return isNaN(t) ? 0 : t;
}
function Ym(e, t, n) {
	let [r, i] = g.useState(0), a = (0, g.useRef)(/* @__PURE__ */ new Map()), o = (0, g.useRef)(new qm()), s = (0, g.useRef)(0);
	function c() {
		s.current += 1;
	}
	function l(e = !1) {
		c();
		let t = () => {
			let e = !1;
			a.current.forEach((t, n) => {
				if (t && t.offsetParent) {
					let { offsetHeight: r } = t, { marginTop: i, marginBottom: a } = getComputedStyle(t), s = Jm(i), c = Jm(a), l = r + s + c;
					o.current.get(n) !== l && (o.current.set(n, l), e = !0);
				}
			}), e && i((e) => e + 1);
		};
		if (e) t();
		else {
			s.current += 1;
			let e = s.current;
			Promise.resolve().then(() => {
				e === s.current && t();
			});
		}
	}
	function u(r, i) {
		let o = e(r), s = a.current.get(o);
		i ? (a.current.set(o, i), l()) : a.current.delete(o), !s != !i && (i ? t?.(r) : n?.(r));
	}
	return (0, g.useEffect)(() => c, []), [
		u,
		l,
		o.current,
		r
	];
}
// node_modules/@rc-component/virtual-list/es/hooks/useMobileTouchMove.js
var Xm = 14 / 15;
function Zm(e, t, n) {
	let r = (0, g.useRef)(!1), i = (0, g.useRef)(0), a = (0, g.useRef)(0), o = (0, g.useRef)(null), s = (0, g.useRef)(null), c, l = (e) => {
		if (r.current) {
			let t = Math.ceil(e.touches[0].pageX), r = Math.ceil(e.touches[0].pageY), o = i.current - t, c = a.current - r, l = Math.abs(o) > Math.abs(c);
			l ? i.current = t : a.current = r;
			let u = n(l, l ? o : c, !1, e);
			u && e.preventDefault(), clearInterval(s.current), u && (s.current = setInterval(() => {
				l ? o *= Xm : c *= Xm;
				let e = Math.trunc(l ? o : c);
				(!n(l, e, !0) || Math.abs(e) <= .1) && clearInterval(s.current);
			}, 16));
		}
	}, u = () => {
		r.current = !1, c();
	}, d = (e) => {
		c(), e.touches.length === 1 && !r.current && (r.current = !0, i.current = Math.ceil(e.touches[0].pageX), a.current = Math.ceil(e.touches[0].pageY), o.current = e.target, o.current.addEventListener("touchmove", l, { passive: !1 }), o.current.addEventListener("touchend", u, { passive: !0 }));
	};
	c = () => {
		o.current && (o.current.removeEventListener("touchmove", l), o.current.removeEventListener("touchend", u));
	}, b(() => (e && t.current.addEventListener("touchstart", d, { passive: !0 }), () => {
		t.current?.removeEventListener("touchstart", d), c(), clearInterval(s.current);
	}), [e]);
}
// node_modules/@rc-component/virtual-list/es/hooks/useScrollDrag.js
function Qm(e) {
	return Math.floor(e ** .5);
}
function $m(e, t) {
	return ("touches" in e ? e.touches[0] : e)[t ? "pageX" : "pageY"] - window[t ? "scrollX" : "scrollY"];
}
function eh(e) {
	let t = e;
	for (; t;) {
		if (t.draggable) return !0;
		t = t.parentElement;
	}
	return !1;
}
function th(e, t, n) {
	g.useEffect(() => {
		let r = t.current;
		if (e && r) {
			let e = !1, t, i, a = () => {
				O.cancel(t);
			}, o = () => {
				a(), t = O(() => {
					n(i), o();
				});
			}, s = () => {
				e = !1, a();
			}, c = (t) => {
				if (eh(t.target) || t.button !== 0) return;
				let n = t;
				n._virtualHandled || (n._virtualHandled = !0, e = !0);
			}, l = (t) => {
				if (e) {
					let e = $m(t, !1), { top: n, bottom: s } = r.getBoundingClientRect();
					e <= n ? (i = -Qm(n - e), o()) : e >= s ? (i = Qm(e - s), o()) : a();
				}
			};
			return r.addEventListener("mousedown", c), r.ownerDocument.addEventListener("mouseup", s), r.ownerDocument.addEventListener("mousemove", l), r.ownerDocument.addEventListener("dragend", s), () => {
				r.removeEventListener("mousedown", c), r.ownerDocument.removeEventListener("mouseup", s), r.ownerDocument.removeEventListener("mousemove", l), r.ownerDocument.removeEventListener("dragend", s), a();
			};
		}
	}, [e]);
}
// node_modules/@rc-component/virtual-list/es/hooks/useDragEdgeScroll.js
function nh(e, t, n, r, i) {
	let a = g.useRef(i);
	a.current = i, g.useEffect(() => {
		let i = t.current;
		if (!e || !i || !n) return;
		let o = Math.min(r * 1.2, n / 4), s = null, c = 0, l = () => {
			s !== null && (O.cancel(s), s = null), c = 0;
		}, u = () => {
			a.current(c), s = O(u);
		}, d = () => {
			c === 0 ? l() : s === null && (s = O(u));
		}, f = (e) => {
			let t = e;
			if (t._virtualHandled) {
				l();
				return;
			}
			t._virtualHandled = !0;
			let { top: n, bottom: r } = i.getBoundingClientRect(), { clientY: a } = e;
			a <= n + o ? (c = -Qm(n + o - a), d()) : a >= r - o ? (c = Qm(a - (r - o)), d()) : l();
		}, p = (e) => {
			let t = e.relatedTarget;
			t && i.contains(t) || l();
		}, m = i.ownerDocument;
		return i.addEventListener("dragover", f), i.addEventListener("dragleave", p), m.addEventListener("drop", l, !0), m.addEventListener("dragend", l, !0), () => {
			l(), i.removeEventListener("dragover", f), i.removeEventListener("dragleave", p), m.removeEventListener("drop", l, !0), m.removeEventListener("dragend", l, !0);
		};
	}, [
		e,
		n,
		r
	]);
}
// node_modules/@rc-component/virtual-list/es/hooks/useScrollTo.js
var rh = 10;
function ih(e, t) {
	let n = typeof e == "function" ? e(t) : e;
	return Number.isFinite(n) ? n : 0;
}
function ah(e, t, n, r, i, a, o, s, c) {
	let l = g.useRef(void 0), [u, d] = g.useState(null);
	return b(() => {
		if (u && u.times < rh) {
			if (!e.current) {
				d((e) => ({ ...e }));
				return;
			}
			o();
			let { targetAlign: c, originAlign: l, offset: f } = u, p = u.index >= 0 ? u.index : t.findIndex((e) => i(e) === u.key), m = c || l, h = ih(f, {
				getSize: a,
				align: m
			}), g = e.current.clientHeight, _ = p < 0, v = c, y = null;
			if (g && p >= 0) {
				let a = 0, o = 0, c = 0, l = Math.min(t.length - 1, p);
				for (let e = 0; e <= l; e += 1) {
					let s = i(t[e]);
					o = a;
					let l = n.get(s);
					c = o + (l === void 0 ? r : l), a = c;
				}
				let d = m === "top" ? h : g - h;
				for (let e = l; e >= 0; --e) {
					let r = i(t[e]), a = n.get(r);
					if (a === void 0) {
						_ = !0;
						break;
					}
					if (d -= a, d <= 0) break;
				}
				switch (m) {
					case "top":
						y = o - h;
						break;
					case "bottom":
						y = c - g + h;
						break;
					default: {
						let { scrollTop: t } = e.current, n = t + g;
						o < t ? v = "top" : c > n && (v = "bottom");
					}
				}
				y !== null && s(y), y !== u.lastTop && (_ = !0);
			}
			_ && d((e) => ({
				...e,
				times: e.times + 1,
				index: p,
				targetAlign: v,
				lastTop: y
			}));
		}
	}, [u, e.current]), (e) => {
		if (e == null) c();
		else if (O.cancel(l.current), typeof e == "number") s(e);
		else if (e && typeof e == "object") {
			let n, r, { align: a } = e;
			"index" in e ? {index: n} = e : (r = e.key, n = t.findIndex((e) => i(e) === r));
			let { offset: o = 0 } = e;
			d({
				times: 0,
				index: n,
				key: r,
				offset: o,
				originAlign: a
			});
		}
	};
}
// node_modules/@rc-component/virtual-list/es/ScrollBar.js
function oh(e, t, n) {
	if (t <= 0 || n <= 0) return 0;
	let r = Math.max(Math.min(e, n), 0) / n, i = Math.ceil(r * t);
	return i = Math.max(i, 0), i = Math.min(i, t), i;
}
var sh = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { prefixCls: n, rtl: r, scrollOffset: i, scrollRange: a, onStartMove: o, onStopMove: s, onScroll: c, horizontal: l, spinSize: u, containerSize: d, style: f, thumbStyle: p, showScrollBar: m } = e, [h, v] = g.useState(!1), [y, b] = g.useState(null), [x, S] = g.useState(null), C = !r, w = g.useRef(null), T = g.useRef(null), [E, D] = g.useState(m), k = g.useRef(void 0), A = () => {
		m !== !0 && m !== !1 && (clearTimeout(k.current), D(!0), k.current = setTimeout(() => {
			D(!1);
		}, 3e3));
	}, j = a - d || 0, M = d - u || 0, N = g.useMemo(() => i === 0 || j === 0 ? 0 : i / j * M, [
		i,
		j,
		M
	]), P = (e) => !!e && T.current?.contains(e), F = (e) => {
		let t = w.current;
		if (!t) return;
		let n = t.getBoundingClientRect(), r = $m(e, l), i;
		if (Number.isFinite(r)) {
			if (l) {
				let e = C ? n.left : n.right;
				if (!Number.isFinite(e)) return;
				i = (C ? r - e : e - r) - u / 2;
			} else {
				if (!Number.isFinite(n.top)) return;
				i = r - n.top - u / 2;
			}
			c(oh(i, j, M), l);
		}
	}, I = (e) => {
		e.stopPropagation(), e.preventDefault(), !(e.button !== 0 || P(e.target)) && F(e);
	}, L = g.useRef({
		top: N,
		dragging: h,
		pageY: y,
		startTop: x
	});
	L.current = {
		top: N,
		dragging: h,
		pageY: y,
		startTop: x
	};
	let R = _((e) => {
		v(!0), b($m(e, l)), S(L.current.top), o(), e.stopPropagation(), e.preventDefault();
	});
	g.useEffect(() => {
		let e = (e) => {
			e.preventDefault();
		}, t = w.current, n = T.current;
		return t.addEventListener("touchstart", e, { passive: !1 }), n.addEventListener("touchstart", R, { passive: !1 }), () => {
			t.removeEventListener("touchstart", e), n.removeEventListener("touchstart", R);
		};
	}, [R]);
	let z = g.useRef(void 0);
	z.current = j;
	let ee = g.useRef(void 0);
	ee.current = M, g.useEffect(() => {
		if (h) {
			let e, t = (t) => {
				let { dragging: n, pageY: r, startTop: i } = L.current;
				O.cancel(e);
				let a = w.current.getBoundingClientRect(), o = d / (l ? a.width : a.height);
				if (n) {
					let n = ($m(t, l) - r) * o, a = i;
					!C && l ? a -= n : a += n;
					let s = z.current, u = ee.current, d = oh(a, s, u);
					e = O(() => {
						c(d, l);
					});
				}
			}, n = () => {
				v(!1), s();
			};
			return window.addEventListener("mousemove", t, { passive: !0 }), window.addEventListener("touchmove", t, { passive: !0 }), window.addEventListener("mouseup", n, { passive: !0 }), window.addEventListener("touchend", n, { passive: !0 }), () => {
				window.removeEventListener("mousemove", t), window.removeEventListener("touchmove", t), window.removeEventListener("mouseup", n), window.removeEventListener("touchend", n), O.cancel(e);
			};
		}
	}, [h]), g.useEffect(() => (A(), () => {
		clearTimeout(k.current);
	}), [i]), g.useImperativeHandle(t, () => ({ delayHidden: A }));
	let B = `${n}-scrollbar`, V = {
		position: "absolute",
		visibility: E ? null : "hidden"
	}, H = {
		position: "absolute",
		borderRadius: 99,
		background: "var(--rc-virtual-list-scrollbar-bg, rgba(0, 0, 0, 0.5))",
		cursor: "pointer",
		userSelect: "none"
	};
	return l ? (Object.assign(V, {
		height: 8,
		left: 0,
		right: 0,
		bottom: 0
	}), Object.assign(H, {
		height: "100%",
		width: u,
		[C ? "left" : "right"]: N
	})) : (Object.assign(V, {
		width: 8,
		top: 0,
		bottom: 0,
		[C ? "right" : "left"]: 0
	}), Object.assign(H, {
		width: "100%",
		height: u,
		top: N
	})), /*#__PURE__*/ g.createElement("div", {
		ref: w,
		className: Z(B, {
			[`${B}-horizontal`]: l,
			[`${B}-vertical`]: !l,
			[`${B}-visible`]: E
		}),
		style: {
			...V,
			...f
		},
		onMouseDown: I,
		onMouseMove: A
	}, /*#__PURE__*/ g.createElement("div", {
		ref: T,
		className: Z(`${B}-thumb`, { [`${B}-thumb-moving`]: h }),
		style: {
			...H,
			...p
		},
		onMouseDown: R
	}));
}), ch = 20;
function lh(e = 0, t = 0) {
	let n = e / t * e;
	return isNaN(n) && (n = 0), n = Math.max(n, ch), Math.floor(n);
}
// node_modules/@rc-component/virtual-list/es/List.js
function uh() {
	return uh = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, uh.apply(this, arguments);
}
var dh = [], fh = {
	overflowY: "auto",
	overflowAnchor: "none"
};
function ph(e, t) {
	let { prefixCls: n = "rc-virtual-list", className: r, height: i, itemHeight: a, fullHeight: o = !0, style: s, data: c, children: l, itemKey: u, virtual: d, direction: f, scrollWidth: p, component: m = "div", onScroll: h, onVirtualScroll: v, onVisibleChange: y, innerProps: x, extraRender: S, styles: C, showScrollBar: w = "optional", ...T } = e, E = g.useCallback((e) => typeof u == "function" ? u(e) : e?.[u], [u]), [D, O, k, A] = Ym(E, null, null), j = !!(d !== !1 && i && a), M = g.useMemo(() => Object.values(k.maps).reduce((e, t) => e + t, 0), [k.id, k.maps]), N = j && c && (Math.max(a * c.length, M) > i || !!p), P = f === "rtl", F = Z(n, { [`${n}-rtl`]: P }, r), I = c || dh, L = (0, g.useRef)(null), R = (0, g.useRef)(null), z = (0, g.useRef)(null), [ee, B] = (0, g.useState)(0), [V, H] = (0, g.useState)(0), [te, ne] = (0, g.useState)(!1), re = () => {
		ne(!0);
	}, U = () => {
		ne(!1);
	}, ie = { getKey: E };
	function ae(e) {
		B((t) => {
			let n;
			n = typeof e == "function" ? e(t) : e;
			let r = ge(n);
			return L.current.scrollTop = r, r;
		});
	}
	let oe = (0, g.useRef)({
		start: 0,
		end: I.length
	}), se = (0, g.useRef)(void 0), [W] = Hm(I, E);
	se.current = W;
	let { scrollHeight: ce, start: le, end: ue, offset: G } = g.useMemo(() => {
		if (!j) return {
			scrollHeight: void 0,
			start: 0,
			end: I.length - 1,
			offset: void 0
		};
		if (!N) return {
			scrollHeight: R.current?.offsetHeight || 0,
			start: 0,
			end: I.length - 1,
			offset: void 0
		};
		let e = 0, t, n, r, o = I.length;
		for (let s = 0; s < o; s += 1) {
			let o = I[s], c = E(o), l = k.get(c), u = e + (l === void 0 ? a : l);
			u >= ee && t === void 0 && (t = s, n = e), u > ee + i && r === void 0 && (r = s), e = u;
		}
		return t === void 0 && (t = 0, n = 0, r = Math.ceil(i / a)), r === void 0 && (r = I.length - 1), r = Math.min(r + 1, I.length - 1), {
			scrollHeight: e,
			start: t,
			end: r,
			offset: n
		};
	}, [
		N,
		j,
		ee,
		I,
		A,
		i
	]);
	oe.current.start = le, oe.current.end = ue, g.useLayoutEffect(() => {
		let e = k.getRecord();
		if (e.size === 1) {
			let t = Array.from(e.keys())[0], n = e.get(t), r = I[le];
			if (r && n === void 0 && E(r) === t) {
				let e = k.get(t) - a;
				ae((t) => t + e);
			}
		}
		k.resetRecord();
	}, [ce]);
	let [de, K] = g.useState({
		width: 0,
		height: i
	}), q = (e) => {
		K({
			width: e.offsetWidth,
			height: e.offsetHeight
		});
	}, fe = (0, g.useRef)(null), pe = (0, g.useRef)(null), me = g.useMemo(() => lh(de.width, p), [de.width, p]), J = g.useMemo(() => lh(de.height, ce), [de.height, ce]), Y = ce - i, he = (0, g.useRef)(Y);
	he.current = Y;
	function ge(e) {
		let t = e;
		return Number.isNaN(he.current) || (t = Math.min(t, he.current)), t = Math.max(t, 0), t;
	}
	let _e = ee <= 0, ve = ee >= Y, ye = V <= 0, be = V >= p, X = Wm(_e, ve, ye, be), xe = () => ({
		x: P ? -V : V,
		y: ee
	}), Se = (0, g.useRef)(xe()), Ce = _((e) => {
		if (v) {
			let t = {
				...xe(),
				...e
			};
			(Se.current.x !== t.x || Se.current.y !== t.y) && (v(t), Se.current = t);
		}
	});
	function we(e, t) {
		let n = e;
		t ? ((0, et.flushSync)(() => {
			H(n);
		}), Ce()) : ae(n);
	}
	function Te(e) {
		let { scrollTop: t } = e.currentTarget;
		t !== ee && ae(t), h?.(e), Ce();
	}
	let Ee = (e) => {
		let t = e, n = p ? p - de.width : 0;
		return t = Math.max(t, 0), t = Math.min(t, n), t;
	}, De = _((e, t) => {
		t ? ((0, et.flushSync)(() => {
			H((t) => {
				let n = t + (P ? -e : e);
				return Ee(n);
			});
		}), Ce()) : ae((t) => t + e);
	}), [Oe, ke] = Gm(j, _e, ve, ye, be, !!p, De);
	Zm(j, L, (e, t, n, r) => {
		let i = r;
		return X(e, t, n) ? !1 : !i || !i._virtualHandled ? (i && (i._virtualHandled = !0), Oe({
			preventDefault() {},
			deltaX: e ? t : 0,
			deltaY: e ? 0 : t
		}), !0) : !1;
	}), th(N, L, (e) => {
		ae((t) => t + e);
	}), nh(N, L, i, a, (e) => {
		ae((t) => t + e);
	}), b(() => {
		function e(e) {
			let t = _e && e.detail < 0, n = ve && e.detail > 0;
			j && !t && !n && e.preventDefault();
		}
		let t = L.current;
		return t.addEventListener("wheel", Oe, { passive: !1 }), t.addEventListener("DOMMouseScroll", ke, { passive: !0 }), t.addEventListener("MozMousePixelScroll", e, { passive: !1 }), () => {
			t.removeEventListener("wheel", Oe), t.removeEventListener("DOMMouseScroll", ke), t.removeEventListener("MozMousePixelScroll", e);
		};
	}, [
		j,
		_e,
		ve
	]), b(() => {
		if (p) {
			let e = Ee(V);
			H(e), Ce({ x: e });
		}
	}, [de.width, p]);
	let Ae = () => {
		fe.current?.delayHidden(), pe.current?.delayHidden();
	}, je = Km(I, E, k, a), Me = ah(L, I, k, a, E, je, () => O(!0), ae, Ae);
	g.useImperativeHandle(t, () => ({
		nativeElement: z.current,
		getScrollInfo: xe,
		scrollTo: (e) => {
			function t(e) {
				return e && typeof e == "object" && ("left" in e || "top" in e);
			}
			t(e) ? (e.left !== void 0 && H(Ee(e.left)), Me(e.top)) : Me(e);
		}
	})), b(() => {
		if (y) {
			let e = I.slice(le, ue + 1);
			y(e, I);
		}
	}, [
		le,
		ue,
		I
	]);
	let Ne = S?.({
		start: le,
		end: ue,
		virtual: N,
		offsetX: V,
		scrollTop: ee,
		offsetY: G,
		rtl: P,
		getSize: je
	}), Pe = Bm(I, le, ue, p, V, D, l, ie), Fe = null;
	i && (Fe = {
		[o ? "height" : "maxHeight"]: i,
		...fh
	}, j && (Fe.overflowY = "hidden", p && (Fe.overflowX = "hidden"), te && (Fe.pointerEvents = "none")));
	let Ie = {};
	return P && (Ie.dir = "rtl"), /*#__PURE__*/ g.createElement("div", uh({
		ref: z,
		style: {
			...s,
			position: "relative"
		},
		className: F
	}, Ie, T), /*#__PURE__*/ g.createElement(yt, { onResize: q }, /*#__PURE__*/ g.createElement(m, {
		className: `${n}-holder`,
		style: Fe,
		ref: L,
		onScroll: Te,
		onMouseEnter: Ae
	}, /*#__PURE__*/ g.createElement(Rm, {
		prefixCls: n,
		height: ce,
		offsetX: V,
		offsetY: G,
		scrollWidth: p,
		onInnerResize: O,
		ref: R,
		innerProps: x,
		rtl: P,
		extra: Ne
	}, Pe))), N && ce > i && /*#__PURE__*/ g.createElement(sh, {
		ref: fe,
		prefixCls: n,
		scrollOffset: ee,
		scrollRange: ce,
		rtl: P,
		onScroll: we,
		onStartMove: re,
		onStopMove: U,
		spinSize: J,
		containerSize: de.height,
		style: C?.verticalScrollBar,
		thumbStyle: C?.verticalScrollBarThumb,
		showScrollBar: w
	}), N && p > de.width && /*#__PURE__*/ g.createElement(sh, {
		ref: pe,
		prefixCls: n,
		scrollOffset: V,
		scrollRange: p,
		rtl: P,
		onScroll: we,
		onStartMove: re,
		onStopMove: U,
		spinSize: me,
		containerSize: de.width,
		horizontal: !0,
		style: C?.horizontalScrollBar,
		thumbStyle: C?.horizontalScrollBarThumb,
		showScrollBar: w
	}));
}
var mh = /*#__PURE__*/ g.forwardRef(ph);
mh.displayName = "List";
// node_modules/@rc-component/virtual-list/es/mock.js
var hh = /*#__PURE__*/ g.forwardRef((e, t) => ph({
	...e,
	virtual: !1
}, t));
hh.displayName = "List";
// node_modules/@rc-component/virtual-list/es/index.js
var gh = mh;
// node_modules/@rc-component/select/es/utils/platformUtil.js
/* istanbul ignore file */
function _h() {
	return /(mac\sos|macintosh)/i.test(navigator.appVersion);
}
// node_modules/@rc-component/select/es/OptionList.js
function vh() {
	return vh = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, vh.apply(this, arguments);
}
function yh(e) {
	return typeof e == "string" || typeof e == "number";
}
var bh = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { prefixCls: n, id: r, open: i, multiple: a, mode: o, searchValue: s, toggleOpen: c, notFoundContent: l, onPopupScroll: u, showScrollBar: d, lockOptions: f } = jp(), { maxCount: p, flattenOptions: m, onActiveValue: h, defaultActiveFirstOption: _, onSelect: v, menuItemSelectedIcon: y, rawValues: b, fieldNames: x, virtual: S, direction: C, listHeight: w, listItemHeight: T, optionRender: E, classNames: D, styles: O } = g.useContext($p), k = `${n}-item`, A = P(() => m, [i, f], (e, t) => t[0] && !t[1]), j = g.useRef(null), M = g.useMemo(() => a && zp(p) && b?.size >= p, [
		a,
		p,
		b?.size
	]), N = (e) => {
		e.preventDefault();
	}, F = (e) => {
		j.current?.scrollTo(typeof e == "number" ? { index: e } : e);
	}, I = g.useCallback((e) => o !== "combobox" && b.has(e), [
		o,
		[...b].toString(),
		b.size
	]), L = (e, t = 1) => {
		let n = A.length;
		for (let r = 0; r < n; r += 1) {
			let i = (e + r * t + n) % n, { group: a, data: o } = A[i] || {};
			if (!a && !o?.disabled && (I(o.value) || !M)) return i;
		}
		return -1;
	}, [R, z] = g.useState(() => L(0)), ee = (e, t = !1) => {
		z(e);
		let n = { source: t ? "keyboard" : "mouse" }, r = A[e];
		r ? h(r.value, e, n) : h(null, -1, n);
	};
	(0, g.useEffect)(() => {
		ee(_ === !1 ? -1 : L(0));
	}, [A.length, s]);
	let B = g.useCallback((e) => o === "combobox" ? String(e).toLowerCase() === s.toLowerCase() : b.has(e), [
		o,
		s,
		[...b].toString(),
		b.size
	]);
	(0, g.useEffect)(() => {
		let e;
		if (!a && i && b.size === 1) {
			let t = Array.from(b)[0], n = A.findIndex(({ data: e }) => s ? String(e.value).startsWith(s) : e.value === t);
			n !== -1 && (ee(n), e = setTimeout(() => {
				F(n);
			}));
		}
		return i && j.current?.scrollTo(void 0), () => clearTimeout(e);
	}, [i, s]);
	let V = (e) => {
		e !== void 0 && v(e, { selected: !b.has(e) }), a || c(!1);
	};
	if (g.useImperativeHandle(t, () => ({
		onKeyDown: (e) => {
			let { which: t, ctrlKey: n } = e;
			switch (t) {
				case X.N:
				case X.P:
				case X.UP:
				case X.DOWN: {
					let e = 0;
					if (t === X.UP ? e = -1 : t === X.DOWN ? e = 1 : _h() && n && (t === X.N ? e = 1 : t === X.P && (e = -1)), e !== 0) {
						let t = L(R + e, e);
						F(t), ee(t, !0);
					}
					break;
				}
				case X.TAB:
				case X.ENTER: {
					let t = A[R];
					if (!t || t.data.disabled) return V(void 0);
					!M || b.has(t.value) ? V(t.value) : V(void 0), i && e.preventDefault();
					break;
				}
				case X.ESC: c(!1), i && e.stopPropagation();
			}
		},
		onKeyUp: () => {},
		scrollTo: (e) => {
			F(e);
		}
	})), A.length === 0) return /*#__PURE__*/ g.createElement("div", {
		role: "listbox",
		id: `${r}_list`,
		className: `${k}-empty`,
		onMouseDown: N
	}, l);
	let H = Object.keys(x).map((e) => x[e]), te = (e) => e.label;
	function ne(e, t) {
		let { group: n } = e;
		return {
			role: n ? "presentation" : "option",
			id: `${r}_list_${t}`
		};
	}
	let re = (e) => {
		let t = A[e];
		if (!t) return null;
		let n = t.data || {}, { value: r, disabled: i } = n, { group: a } = t, o = Be(n, !0), s = te(t);
		return t ? /*#__PURE__*/ g.createElement("div", vh({ "aria-label": typeof s == "string" && !a ? s : null }, o, { key: e }, ne(t, e), {
			"aria-selected": B(r),
			"aria-disabled": i
		}), r) : null;
	}, U = {
		role: "listbox",
		id: `${r}_list`
	};
	return /*#__PURE__*/ g.createElement(g.Fragment, null, S && /*#__PURE__*/ g.createElement("div", vh({}, U, { style: {
		height: 0,
		width: 0,
		overflow: "hidden"
	} }), re(R - 1), re(R), re(R + 1)), /*#__PURE__*/ g.createElement(gh, {
		prefixCls: `${n}-dropdown-list`,
		itemKey: "key",
		ref: j,
		data: A,
		height: w,
		itemHeight: T,
		fullHeight: !1,
		onMouseDown: N,
		onScroll: u,
		virtual: S,
		direction: C,
		innerProps: S ? null : U,
		showScrollBar: d,
		className: D?.popup?.list,
		style: O?.popup?.list
	}, (e, t) => {
		let { group: n, groupOption: r, data: i, label: a, value: o } = e, { key: s } = i;
		if (n) {
			let e = i.title ?? (yh(a) ? a.toString() : void 0);
			return /*#__PURE__*/ g.createElement("div", {
				className: Z(k, `${k}-group`, i.className),
				title: e
			}, a === void 0 ? s : a);
		}
		let { disabled: c, title: l, children: u, style: d, className: f, ...p } = i, m = Fe(p, H), h = I(o), _ = c || !h && M, v = `${k}-option`, b = Z(k, v, f, D?.popup?.listItem, {
			[`${v}-grouped`]: r,
			[`${v}-active`]: R === t && !_,
			[`${v}-disabled`]: _,
			[`${v}-selected`]: h
		}), x = te(e), C = !y || typeof y == "function" || h, w = typeof x == "number" ? x : x || o, T = yh(w) ? w.toString() : void 0;
		return l !== void 0 && (T = l), /*#__PURE__*/ g.createElement("div", vh({}, Be(m), S ? {} : ne(e, t), {
			"aria-selected": S ? void 0 : B(o),
			"aria-disabled": _,
			className: b,
			title: T,
			onMouseMove: () => {
				R === t || _ || ee(t);
			},
			onClick: () => {
				_ || V(o);
			},
			style: {
				...O?.popup?.listItem,
				...d
			}
		}), /*#__PURE__*/ g.createElement("div", { className: `${v}-content` }, typeof E == "function" ? E(e, { index: t }) : w), /*#__PURE__*/ g.isValidElement(y) || h, C && /*#__PURE__*/ g.createElement(xm, {
			className: `${k}-option-state`,
			customizeIcon: y,
			customizeIconProps: {
				value: o,
				disabled: _,
				isSelected: h
			}
		}, h ? "✓" : null));
	}));
}), xh = ((e, t) => {
	let n = g.useRef({
		values: /* @__PURE__ */ new Map(),
		options: /* @__PURE__ */ new Map()
	});
	return [g.useMemo(() => {
		let { values: r, options: i } = n.current, a = e.map((e) => e.label === void 0 ? {
			...e,
			label: r.get(e.value)?.label
		} : e), o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
		return a.forEach((e) => {
			o.set(e.value, e), s.set(e.value, t.get(e.value) || i.get(e.value));
		}), n.current.values = o, n.current.options = s, a;
	}, [e, t]), g.useCallback((e) => t.get(e) || n.current.options.get(e), [t])];
});
// node_modules/@rc-component/select/es/hooks/useFilterOptions.js
function Sh(e, t) {
	return em(e).join("").toUpperCase().includes(t);
}
var Ch = ((e, t, n, r, i) => g.useMemo(() => {
	if (!n || r === !1) return e;
	let { options: a, label: o, value: s } = t, c = [], l = typeof r == "function", u = n.toUpperCase(), d = l ? r : (e, t) => i && i.length ? i.some((e) => Sh(t[e], u)) : t[a] ? Sh(t[o === "children" ? "label" : o], u) : Sh(t[s], u), f = l ? (e) => Hp(e) : (e) => e;
	return e.forEach((e) => {
		if (e[a]) {
			if (d(n, f(e))) c.push(e);
			else {
				let t = e[a].filter((e) => d(n, f(e)));
				t.length && c.push({
					...e,
					[a]: t
				});
			}
		} else d(n, f(e)) && c.push(e);
	}), c;
}, [
	e,
	r,
	i,
	n,
	t
]));
// node_modules/@rc-component/select/es/utils/legacyUtil.js
function wh(e) {
	let { key: t, props: { children: n, value: r, ...i } } = e;
	return {
		key: t,
		value: r === void 0 ? t : r,
		children: n,
		...i
	};
}
function Th(e, t = !1) {
	return Ve(e).map((e, n) => {
		if (!/*#__PURE__*/ g.isValidElement(e) || !e.type) return null;
		let { type: { isSelectOptGroup: r }, key: i, props: { children: a, ...o } } = e;
		return t || !r ? wh(e) : {
			key: `__RC_SELECT_GRP__${i === null ? n : i}__`,
			label: i,
			...o,
			options: Th(a)
		};
	}).filter((e) => e);
}
// node_modules/@rc-component/select/es/hooks/useOptions.js
var Eh = (e, t, n, r, i) => g.useMemo(() => {
	let a = e;
	e || (a = Th(t));
	let o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), c = (e, t, n) => {
		n && typeof n == "string" && e.set(t[n], t);
	}, l = (e, t = !1) => {
		for (let a = 0; a < e.length; a += 1) {
			let u = e[a];
			!u[n.options] || t ? (o.set(u[n.value], u), c(s, u, n.label), r.forEach((e) => {
				c(s, u, e);
			}), c(s, u, i)) : l(u[n.options], !0);
		}
	};
	return l(a), {
		options: a,
		valueOptions: o,
		labelOptions: s
	};
}, [
	e,
	t,
	n,
	r,
	i
]);
// node_modules/@rc-component/select/es/hooks/useRefFunc.js
function Dh(e) {
	let t = g.useRef(e);
	return t.current = e, g.useCallback((...e) => t.current(...e), []);
}
// node_modules/@rc-component/select/es/hooks/useSearchConfig.js
function Oh(e, t, n) {
	let { filterOption: r, searchValue: i, optionFilterProp: a, filterSort: o, onSearch: s, autoClearSearchValue: c } = t;
	return g.useMemo(() => {
		let t = typeof e == "object", l = {
			filterOption: r,
			searchValue: i,
			optionFilterProp: a,
			filterSort: o,
			onSearch: s,
			autoClearSearchValue: c,
			...t ? e : {}
		};
		return [t || n === "combobox" || n === "tags" || n === "multiple" && e === void 0 ? !0 : e, l];
	}, [
		n,
		e,
		r,
		i,
		a,
		o,
		s,
		c
	]);
}
// node_modules/@rc-component/select/es/Select.js
function kh() {
	return kh = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, kh.apply(this, arguments);
}
var Ah = ["inputValue"];
function jh(e) {
	return !e || typeof e != "object";
}
var Mh = /* @__PURE__ */ g.forwardRef((e, t) => {
	let { id: n, mode: r, prefixCls: i = "rc-select", backfill: a, fieldNames: o, showSearch: s, searchValue: c, onSearch: l, autoClearSearchValue: u, filterOption: d, optionFilterProp: f, filterSort: p, onSelect: m, onDeselect: h, onActive: _, popupMatchSelectWidth: v = !0, optionLabelProp: y, options: b, optionRender: x, children: C, defaultActiveFirstOption: w, menuItemSelectedIcon: T, virtual: E, direction: D, listHeight: O = 200, listItemHeight: k = 20, labelRender: A, value: j, defaultValue: M, labelInValue: P, onChange: F, maxCount: I, classNames: L, styles: R, ...z } = e, [ee, B] = Oh(s, {
		searchValue: c,
		onSearch: l,
		autoClearSearchValue: u,
		filterOption: d,
		optionFilterProp: f,
		filterSort: p
	}, r), { filterOption: V, searchValue: H, optionFilterProp: te, filterSort: ne, onSearch: re, autoClearSearchValue: U = !0 } = B, ie = g.useMemo(() => te ? Array.isArray(te) ? te : [te] : [], [te]), ae = N(n), oe = Nm(r), se = !(b || !C), W = g.useMemo(() => V === void 0 && r === "combobox" ? !1 : V, [V, r]), ce = g.useMemo(() => Bp(o, se), [JSON.stringify(o), se]), [le, ue] = S("", H), G = le || "", de = Eh(b, C, ce, ie, y), { valueOptions: K, labelOptions: q, options: fe } = de, pe = g.useCallback((e) => em(e).map((e) => {
		let t, n, r, i;
		jh(e) ? t = e : (n = e.label, t = e.value);
		let a = K.get(t);
		return a && (n === void 0 && (n = a?.[y || ce.label]), r = a?.disabled, i = a?.title), {
			label: n,
			value: t,
			key: t,
			disabled: r,
			title: i
		};
	}), [
		ce,
		y,
		K
	]), [me, J] = S(M, j), [Y, he] = xh(g.useMemo(() => {
		let e = pe(oe && me === null ? [] : me);
		return r === "combobox" && nm(e[0]?.value) ? [] : e;
	}, [
		me,
		pe,
		r,
		oe
	]), K), ge = g.useMemo(() => {
		if (!r && Y.length === 1) {
			let e = Y[0];
			if (e.value === null && (e.label === null || e.label === void 0)) return [];
		}
		return Y.map((e) => ({
			...e,
			label: (typeof A == "function" ? A(e) : e.label) ?? e.value
		}));
	}, [
		r,
		Y,
		A
	]), _e = g.useMemo(() => new Set(Y.map((e) => e.value)), [Y]);
	g.useEffect(() => {
		if (r === "combobox") {
			let e = Y[0]?.value;
			ue(tm(e) ? String(e) : "");
		}
	}, [Y]);
	let ve = Dh((e, t) => {
		let n = t ?? e;
		return {
			[ce.value]: e,
			[ce.label]: n
		};
	}), ye = Ch(g.useMemo(() => {
		if (r !== "tags") return fe;
		let e = [...fe], t = (e) => K.has(e);
		return [...Y].sort((e, t) => e.value < t.value ? -1 : 1).forEach((n) => {
			let r = n.value;
			t(r) || e.push(ve(r, n.label));
		}), e;
	}, [
		ve,
		fe,
		K,
		Y,
		r
	]), ce, G, W, ie), be = g.useMemo(() => {
		let e = (e) => ie.length ? ie.some((t) => e?.[t] === G) : e?.value === G;
		return r !== "tags" || !G || ye.some((t) => e(t)) || ye.some((e) => e[ce.value] === G) || K.get(G)?.disabled ? ye : [ve(G), ...ye];
	}, [
		ve,
		ie,
		r,
		ye,
		G,
		ce,
		K
	]), X = (e) => [...e].sort((e, t) => ne(e, t, { searchValue: G })).map((e) => Array.isArray(e.options) ? {
		...e,
		options: e.options.length > 0 ? X(e.options) : e.options
	} : e), xe = g.useMemo(() => ne ? X(be) : be, [
		be,
		ne,
		G
	]), Se = g.useMemo(() => Vp(xe, {
		fieldNames: ce,
		childrenAsData: se
	}), [
		xe,
		ce,
		se
	]), Ce = (e) => {
		let t = pe(e);
		if (J(t), F && (t.length !== Y.length || t.some((e, t) => Y[t]?.value !== e?.value))) {
			let e = P ? t.map(({ label: e, value: t }) => ({
				label: e,
				value: t
			})) : t.map((e) => e.value), n = t.map((e) => Hp(he(e.value)));
			F(oe ? e : e[0], oe ? n : n[0]);
		}
	}, [we, Te] = g.useState(null), [Ee, De] = g.useState(0), Oe = w === void 0 ? r !== "combobox" : w, ke = g.useRef(void 0), Ae = g.useCallback((e, t, { source: n = "keyboard" } = {}) => {
		De(t), a && r === "combobox" && e !== null && n === "keyboard" && Te(String(e));
		let i = Promise.resolve().then(() => {
			ke.current === i && _?.(e);
		});
		ke.current = i;
	}, [
		a,
		r,
		_
	]), je = (e, t, n) => {
		let r = () => {
			let t = he(e);
			return [P ? {
				label: t?.[ce.label],
				value: e
			} : e, Hp(t)];
		};
		if (t && m) {
			let [e, t] = r();
			m(e, t);
		} else if (!t && h && n !== "clear") {
			let [e, t] = r();
			h(e, t);
		}
	}, Me = Dh((e, t) => {
		let n, i = !oe || t.selected;
		n = i ? oe ? [...Y, e] : [e] : Y.filter((t) => t.value !== e), Ce(n), je(e, i), r === "combobox" ? Te("") : (!Nm || U) && (ue(""), Te(""));
	}), Ne = (e, t) => {
		Ce(e);
		let { type: n, values: r } = t;
		(n === "remove" || n === "clear") && r.forEach((e) => {
			je(e.value, !1, n);
		});
	}, Pe = (e, t) => {
		if (ue(e), Te(null), t.source === "submit") {
			let t = (e || "").trim();
			if (t) {
				if (K.get(t)?.disabled) {
					ue("");
					return;
				}
				let e = Array.from(/* @__PURE__ */ new Set([..._e, t]));
				Ce(e), je(t, !0), ue("");
			}
		} else t.source !== "blur" && (r === "combobox" && Ce(e), re?.(e));
	}, Fe = (e) => {
		let t = e;
		r !== "tags" && (t = e.map((e) => q.get(e)?.value).filter((e) => e !== void 0)), r === "tags" && (t = t.filter((e) => !K.get(e)?.disabled));
		let n = Array.from(/* @__PURE__ */ new Set([..._e, ...t]));
		Ce(n), n.forEach((e) => {
			je(e, !0);
		});
	}, Ie = g.useMemo(() => {
		let e = E !== !1 && v !== !1;
		return {
			...de,
			flattenOptions: Se,
			onActiveValue: Ae,
			defaultActiveFirstOption: Oe,
			onSelect: Me,
			menuItemSelectedIcon: T,
			rawValues: _e,
			fieldNames: ce,
			virtual: e,
			direction: D,
			listHeight: O,
			listItemHeight: k,
			childrenAsData: se,
			maxCount: I,
			optionRender: x,
			classNames: L,
			styles: R
		};
	}, [
		I,
		de,
		Se,
		Ae,
		Oe,
		Me,
		T,
		_e,
		ce,
		E,
		v,
		D,
		O,
		k,
		se,
		x,
		L,
		R
	]);
	return /*#__PURE__*/ g.createElement($p.Provider, { value: Ie }, /*#__PURE__*/ g.createElement(Pm, kh({}, z, {
		id: ae,
		prefixCls: i,
		ref: t,
		omitDomProps: Ah,
		mode: r,
		classNames: L,
		styles: R,
		displayValues: ge,
		onDisplayValuesChange: Ne,
		maxCount: I,
		direction: D,
		showSearch: ee,
		searchValue: G,
		onSearch: Pe,
		autoClearSearchValue: U,
		onSearchSplit: Fe,
		popupMatchSelectWidth: v,
		OptionList: bh,
		emptyOptions: !Se.length,
		activeValue: we,
		activeDescendantId: `${ae}_list_${Ee}`
	})));
});
Mh.Option = Im, Mh.OptGroup = Fm;
// node_modules/@rc-component/select/es/index.js
var Nh = Mh, Ph = (e, t, n) => e === !1 ? null : e === !0 ? n : e && t && e[t] !== void 0 ? e[t] : n, Fh = (e, t, n) => Z({
	[`${e}-status-success`]: t === "success",
	[`${e}-status-warning`]: t === "warning",
	[`${e}-status-error`]: t === "error",
	[`${e}-status-validating`]: t === "validating",
	[`${e}-has-feedback`]: n
}), Ih = (e, t) => t || e, Lh = (e, t) => e?.startsWith("var(") || t?.startsWith("var(") ? e : new qi(e).onBackground(t).toHexString(), Rh = () => {
	let [, e] = to(), [t] = Nc("Empty"), { colorBgContainer: n, colorFill: r, colorFillSecondary: i, colorFillTertiary: a, colorTextQuaternary: o } = e, { panelBgColor: s, borderColor: c, detailColor: l, shadowColor: u, iconColor: d } = (0, g.useMemo)(() => ({
		panelBgColor: Lh(a, n),
		borderColor: Lh(o, n),
		detailColor: Lh(r, n),
		shadowColor: Lh(i, n),
		iconColor: n
	}), [
		n,
		r,
		i,
		a,
		o
	]);
	return /*#__PURE__*/ g.createElement("svg", {
		width: "184",
		height: "152",
		viewBox: "0 0 184 152",
		xmlns: "http://www.w3.org/2000/svg"
	}, /*#__PURE__*/ g.createElement("title", null, t?.description || "Empty"), /*#__PURE__*/ g.createElement("g", {
		fill: "none",
		fillRule: "evenodd"
	}, /*#__PURE__*/ g.createElement("g", { transform: "translate(24 31.7)" }, /*#__PURE__*/ g.createElement("ellipse", {
		fillOpacity: ".8",
		fill: u,
		cx: "67.8",
		cy: "106.9",
		rx: "67.8",
		ry: "12.7"
	}), /*#__PURE__*/ g.createElement("path", {
		fill: c,
		d: "M122 69.7 98.1 40.2a6 6 0 0 0-4.6-2.2H42.1a6 6 0 0 0-4.6 2.2l-24 29.5V85H122z"
	}), /*#__PURE__*/ g.createElement("path", {
		fill: s,
		d: "M33.8 0h68a4 4 0 0 1 4 4v93.3a4 4 0 0 1-4 4h-68a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4"
	}), /*#__PURE__*/ g.createElement("path", {
		fill: l,
		d: "M42.7 10h50.2a2 2 0 0 1 2 2v25a2 2 0 0 1-2 2H42.7a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2m.2 39.8h49.8a2.3 2.3 0 1 1 0 4.5H42.9a2.3 2.3 0 0 1 0-4.5m0 11.7h49.8a2.3 2.3 0 1 1 0 4.6H42.9a2.3 2.3 0 0 1 0-4.6m79 43.5a7 7 0 0 1-6.8 5.4H20.5a7 7 0 0 1-6.7-5.4l-.2-1.8V69.7h26.3c2.9 0 5.2 2.4 5.2 5.4s2.4 5.4 5.3 5.4h34.8c2.9 0 5.3-2.4 5.3-5.4s2.3-5.4 5.2-5.4H122v33.5q0 1-.2 1.8"
	})), /*#__PURE__*/ g.createElement("path", {
		fill: l,
		d: "m149.1 33.3-6.8 2.6a1 1 0 0 1-1.3-1.2l2-6.2q-4.1-4.5-4.2-10.4c0-10 10.1-18.1 22.6-18.1S184 8.1 184 18.1s-10.1 18-22.6 18q-6.8 0-12.3-2.8"
	}), /*#__PURE__*/ g.createElement("g", {
		fill: d,
		transform: "translate(149.7 15.4)"
	}, /*#__PURE__*/ g.createElement("circle", {
		cx: "20.7",
		cy: "3.2",
		r: "2.8"
	}), /*#__PURE__*/ g.createElement("path", { d: "M5.7 5.6H0L2.9.7zM9.3.7h5v5h-5z" }))));
}, zh = () => {
	let [, e] = to(), [t] = Nc("Empty"), { colorFill: n, colorFillTertiary: r, colorFillQuaternary: i, colorBgContainer: a } = e, { borderColor: o, shadowColor: s, contentColor: c } = (0, g.useMemo)(() => ({
		borderColor: Lh(n, a),
		shadowColor: Lh(r, a),
		contentColor: Lh(i, a)
	}), [
		n,
		r,
		i,
		a
	]);
	return /*#__PURE__*/ g.createElement("svg", {
		width: "64",
		height: "41",
		viewBox: "0 0 64 41",
		xmlns: "http://www.w3.org/2000/svg"
	}, /*#__PURE__*/ g.createElement("title", null, t?.description || "Empty"), /*#__PURE__*/ g.createElement("g", {
		transform: "translate(0 1)",
		fill: "none",
		fillRule: "evenodd"
	}, /*#__PURE__*/ g.createElement("ellipse", {
		fill: s,
		cx: "32",
		cy: "33",
		rx: "32",
		ry: "7"
	}), /*#__PURE__*/ g.createElement("g", {
		fillRule: "nonzero",
		stroke: o
	}, /*#__PURE__*/ g.createElement("path", { d: "M55 12.8 44.9 1.3Q44 0 42.9 0H21.1q-1.2 0-2 1.3L9 12.8V22h46z" }), /*#__PURE__*/ g.createElement("path", {
		d: "M41.6 16c0-1.7 1-3 2.2-3H55v18.1c0 2.2-1.3 3.9-3 3.9H12c-1.7 0-3-1.7-3-3.9V13h11.2c1.2 0 2.2 1.3 2.2 3s1 2.9 2.2 2.9h14.8c1.2 0 2.2-1.4 2.2-3",
		fill: c
	}))));
}, Bh = (e) => {
	let { componentCls: t, margin: n, marginXS: r, marginXL: i, fontSize: a, lineHeight: o } = e;
	return { [t]: {
		marginInline: r,
		fontSize: a,
		lineHeight: o,
		textAlign: "center",
		[`${t}-image`]: {
			height: e.emptyImgHeight,
			marginBottom: r,
			opacity: e.opacityImage,
			img: { height: "100%" },
			svg: {
				maxWidth: "100%",
				height: "100%",
				margin: "auto"
			}
		},
		[`${t}-description`]: { color: e.colorTextDescription },
		[`${t}-footer`]: { marginTop: n },
		"&-normal": {
			marginBlock: i,
			color: e.colorTextDescription,
			[`${t}-description`]: { color: e.colorTextDescription },
			[`${t}-image`]: { height: e.emptyImgHeightMD }
		},
		"&-small": {
			marginBlock: r,
			color: e.colorTextDescription,
			[`${t}-image`]: { height: e.emptyImgHeightSM }
		}
	} };
}, Vh = fo("Empty", (e) => {
	let { componentCls: t, controlHeightLG: n, calc: r } = e;
	return Bh(Ti(e, {
		emptyImgCls: `${t}-img`,
		emptyImgHeight: r(n).mul(2.5).equal(),
		emptyImgHeightMD: n,
		emptyImgHeightSM: r(n).mul(.875).equal()
	}));
}), Hh = /*#__PURE__*/ g.createElement(Rh, null), Uh = /*#__PURE__*/ g.createElement(zh, null), Wh = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { className: n, rootClassName: r, prefixCls: i, image: a, description: o, children: s, imageStyle: c, style: l, classNames: u, styles: d, ...f } = e, { getPrefixCls: p, direction: m, className: h, style: _, classNames: v, styles: y, image: b } = Mt("empty"), x = p("empty", i), [S, C] = Vh(x), w = sc(_), T = sc(l), [E, D] = lc([v, u], [
		y,
		w,
		d,
		T
	], { props: e }), [O] = Nc("Empty"), k = o === void 0 ? O?.description : o, A = typeof k == "string" ? k : "empty", j = a ?? b ?? Hh, M = null;
	M = typeof j == "string" ? /*#__PURE__*/ g.createElement("img", {
		draggable: !1,
		alt: A,
		src: j
	}) : j;
	let N = g.useRef(null);
	return g.useImperativeHandle(t, () => ({ nativeElement: N.current })), /*#__PURE__*/ g.createElement("div", {
		ref: N,
		className: Z(S, C, x, h, {
			[`${x}-normal`]: j === Uh,
			[`${x}-rtl`]: m === "rtl"
		}, n, r, E.root),
		style: D.root,
		...f
	}, /*#__PURE__*/ g.createElement("div", {
		className: Z(`${x}-image`, E.image),
		style: {
			...c,
			...D.image
		}
	}, M), Pe(k) && /*#__PURE__*/ g.createElement("div", {
		className: Z(`${x}-description`, E.description),
		style: D.description
	}, k), Pe(s) && /*#__PURE__*/ g.createElement("div", {
		className: Z(`${x}-footer`, E.footer),
		style: D.footer
	}, s));
});
Wh.PRESENTED_IMAGE_DEFAULT = Hh, Wh.PRESENTED_IMAGE_SIMPLE = Uh;
// node_modules/antd/es/config-provider/defaultRenderEmpty.js
var Gh = (e) => {
	let { componentName: t } = e, { getPrefixCls: n } = (0, g.useContext)(kt), r = n("empty");
	switch (t) {
		case "Table":
		case "List": return /*#__PURE__*/ g.createElement(Wh, { image: Wh.PRESENTED_IMAGE_SIMPLE });
		case "Select":
		case "TreeSelect":
		case "Cascader":
		case "Transfer":
		case "Mentions": return /*#__PURE__*/ g.createElement(Wh, {
			image: Wh.PRESENTED_IMAGE_SIMPLE,
			className: `${r}-small`
		});
		case "Table.filter": return null;
		default: return /*#__PURE__*/ g.createElement(Wh, null);
	}
}, Kh = (e, t, n, r) => {
	let i = g.useContext(kt), { variant: a, [e]: o } = i, s = g.useContext(Tp), c = r ? i[r] : void 0, l = o?.variant ?? c?.variant, u = t !== void 0 || n === !1 || s !== void 0 || l !== void 0 || a !== void 0, d;
	d = t === void 0 ? n === !1 ? "borderless" : s ?? l ?? a ?? "outlined" : t;
	let f = Ot.includes(d);
	return [
		d,
		f,
		u
	];
}, qh = (e) => {
	let t = {
		overflow: {
			adjustX: !0,
			adjustY: !0,
			shiftY: !0
		},
		htmlRegion: e === "scroll" ? "scroll" : "visible",
		dynamicInset: !0
	};
	return {
		bottomLeft: {
			...t,
			points: ["tl", "bl"],
			offset: [0, 4]
		},
		bottomRight: {
			...t,
			points: ["tr", "br"],
			offset: [0, 4]
		},
		topLeft: {
			...t,
			points: ["bl", "tl"],
			offset: [0, -4]
		},
		topRight: {
			...t,
			points: ["br", "tr"],
			offset: [0, -4]
		}
	};
};
function Jh(e, t) {
	return e || qh(t);
}
// node_modules/antd/es/select/style/dropdown.js
var Yh = (e) => {
	let { optionHeight: t, optionFontSize: n, optionLineHeight: r, optionPadding: i } = e;
	return {
		position: "relative",
		display: "block",
		minHeight: t,
		padding: i,
		color: e.colorText,
		fontWeight: 400,
		fontSize: n,
		lineHeight: r,
		boxSizing: "border-box"
	};
}, Xh = (e) => {
	let { antCls: t, componentCls: n } = e, r = `${n}-item`, i = `&${t}-slide-up-enter${t}-slide-up-enter-active`, a = `&${t}-slide-up-appear${t}-slide-up-appear-active`, o = `&${t}-slide-up-leave${t}-slide-up-leave-active`, s = `${n}-dropdown-placement-`, c = `${r}-option-selected`;
	return [
		{ [`${n}-dropdown`]: {
			...ro(e),
			position: "absolute",
			top: -9999,
			zIndex: e.zIndexPopup,
			boxSizing: "border-box",
			padding: e.paddingXXS,
			overflow: "hidden",
			fontSize: e.fontSize,
			fontVariant: "initial",
			backgroundColor: e.colorBgElevated,
			borderRadius: e.borderRadiusLG,
			outline: "none",
			boxShadow: e.boxShadowSecondary,
			[`
          ${i}${s}bottomLeft,
          ${a}${s}bottomLeft
        `]: { animationName: Zu },
			[`
          ${i}${s}topLeft,
          ${a}${s}topLeft,
          ${i}${s}topRight,
          ${a}${s}topRight
        `]: { animationName: $u },
			[`${o}${s}bottomLeft`]: { animationName: Qu },
			[`
          ${o}${s}topLeft,
          ${o}${s}topRight
        `]: { animationName: ed },
			"&-hidden": { display: "none" },
			[`${n}-dropdown-list-scrollbar`]: {
				cursor: "pointer",
				"&:hover": { backgroundColor: e.colorFillQuaternary }
			},
			[r]: {
				...Yh(e),
				cursor: "pointer",
				transition: `background-color ${e.motionDurationSlow} ease`,
				borderRadius: e.borderRadiusSM,
				"&-group": {
					color: e.colorTextDescription,
					fontSize: e.fontSizeSM,
					cursor: "default"
				},
				"&-option": {
					display: "flex",
					"&-content": {
						flex: "auto",
						...no
					},
					"&-state": {
						flex: "none",
						display: "flex",
						alignItems: "center"
					},
					[`&-selected:not(${r}-option-disabled)`]: {
						color: e.optionSelectedColor,
						fontWeight: e.optionSelectedFontWeight,
						backgroundColor: e.optionSelectedBg,
						[`${r}-option-state`]: { color: e.colorPrimary }
					},
					[`&-active:not(${r}-option-disabled)`]: { backgroundColor: e.optionActiveBg },
					[`&-selected${r}-option-active:not(${r}-option-disabled)`]: { backgroundColor: e.controlItemBgActiveHover },
					"&-disabled": {
						[`&${r}-option-selected`]: { backgroundColor: e.colorBgContainerDisabled },
						color: e.colorTextDisabled,
						cursor: "not-allowed"
					},
					"&-grouped": { paddingInlineStart: e.calc(e.controlPaddingHorizontal).mul(2).equal() }
				},
				"&-empty": {
					...Yh(e),
					color: e.colorTextDisabled
				}
			},
			[`${c}:has(+ ${c})`]: {
				borderEndStartRadius: 0,
				borderEndEndRadius: 0,
				[`& + ${c}`]: {
					borderStartStartRadius: 0,
					borderStartEndRadius: 0
				}
			},
			"&-rtl": { direction: "rtl" }
		} },
		od(e, "slide-up"),
		od(e, "slide-down"),
		Xu(e, "move-up"),
		Xu(e, "move-down")
	];
}, Zh = (e) => {
	let { antCls: t, componentCls: n } = e, r = { background: "transparent" }, i = [
		"> input[disabled]",
		"> textarea[disabled]",
		`> ${n}-input`,
		`> ${t}-input-affix-wrapper-disabled`,
		`> ${t}-input-search`
	].join(", ");
	return { [`&${n}-customize`]: {
		border: 0,
		padding: 0,
		fontSize: "inherit",
		lineHeight: "inherit",
		[`${n}-placeholder`]: { display: "none" },
		[`${n}-content`]: {
			margin: 0,
			padding: 0,
			"&-value": { display: "none" }
		},
		[`&${n}-filled ${n}-content`]: { [`${t}-input-filled`]: r },
		[`&${n}-disabled ${n}-content`]: {
			[i]: r,
			"input[disabled], textarea[disabled]": r
		}
	} };
}, Qh = 4, $h = (e) => {
	let { componentCls: t, calc: n, iconCls: r, paddingXS: i, paddingXXS: a, INTERNAL_FIXED_ITEM_MARGIN: o, lineWidth: s, lineType: c, colorIcon: l, colorIconHover: u, inputPaddingHorizontalBase: d, antCls: f } = e, [p, m] = ho(f, "select");
	return { "&-multiple": {
		[p("multi-item-background")]: e.multipleItemBg,
		[p("multi-item-border-color")]: "transparent",
		[p("multi-item-border-radius")]: e.borderRadiusSM,
		[p("multi-item-height")]: e.multipleItemHeight,
		[p("multi-padding-base")]: `calc((${m("height")} - ${m("multi-item-height")}) / 2)`,
		[p("multi-padding-vertical")]: `calc(${m("multi-padding-base")} - ${o} - ${s})`,
		[p("multi-item-padding-horizontal")]: `calc(${d} - ${m("multi-padding-vertical")} - ${s} * 2)`,
		paddingBlock: m("multi-padding-vertical"),
		paddingInlineStart: `calc(${m("multi-padding-base")} - ${s})`,
		[`${t}-prefix`]: { marginInlineStart: m("multi-item-padding-horizontal") },
		[`${t}-prefix + ${t}-content`]: {
			[`${t}-placeholder`]: { insetInlineStart: 0 },
			[`${t}-content-item${t}-content-item-suffix`]: { marginInlineStart: 0 }
		},
		[`${t}-placeholder`]: {
			position: "absolute",
			lineHeight: m("line-height"),
			insetInlineStart: m("multi-item-padding-horizontal"),
			width: `calc(100% - ${m("multi-item-padding-horizontal")})`,
			top: "50%",
			transform: "translateY(-50%)"
		},
		[`${t}-content`]: {
			flexWrap: "wrap",
			alignItems: "center",
			lineHeight: 1,
			"&-item-prefix": { height: m("font-size") },
			"&-item": {
				lineHeight: 1,
				maxWidth: `calc(100% - ${Qh}px)`
			},
			[`${t}-content-item-prefix + ${t}-content-item-suffix,
          ${t}-content-item-suffix:first-child`]: { marginInlineStart: m("multi-item-padding-horizontal") },
			[`${t}-selection-item`]: {
				lineHeight: `calc(${m("multi-item-height")} - ${s} * 2)`,
				border: `${s} ${c} ${m("multi-item-border-color")}`,
				display: "flex",
				marginBlock: o,
				marginInlineEnd: n(o).mul(2).equal(),
				background: m("multi-item-background"),
				borderRadius: m("multi-item-border-radius"),
				paddingInlineStart: i,
				paddingInlineEnd: a,
				transition: [
					"height",
					"line-height",
					"padding"
				].map((t) => `${t} ${e.motionDurationSlow}`).join(","),
				"&-content": {
					...no,
					marginInlineEnd: a
				},
				"&-remove": {
					...io(),
					display: "inline-flex",
					alignItems: "center",
					color: l,
					fontWeight: 700,
					fontSize: 10,
					lineHeight: "inherit",
					cursor: "pointer",
					[`> ${r}`]: { verticalAlign: "-0.2em" },
					"&:hover": { color: u }
				}
			},
			[`${t}-input`]: {
				lineHeight: n(o).mul(2).add(m("multi-item-height")).equal(),
				width: "calc(var(--select-input-width, 0) * 1px)",
				minWidth: Qh,
				maxWidth: "100%",
				transition: `line-height ${e.motionDurationSlow}`
			}
		},
		[`&${t}-sm`]: {
			[p("multi-item-height")]: e.multipleItemHeightSM,
			[p("multi-item-border-radius")]: e.borderRadiusXS
		},
		[`&${t}-lg`]: {
			[p("multi-item-height")]: e.multipleItemHeightLG,
			[p("multi-item-border-radius")]: e.borderRadius
		},
		[`&${t}-filled`]: {
			[p("multi-item-border-color")]: e.colorSplit,
			[p("multi-item-background")]: e.colorBgContainer,
			[`&${t}-disabled`]: { [p("multi-item-border-color")]: "transparent" }
		}
	} };
}, eg = (e, t) => {
	let { componentCls: n, antCls: r } = e, [i] = ho(r, "select"), { border: a, borderHover: o, borderActive: s, borderOutline: c } = t, l = t.background || e.selectorBg || e.colorBgContainer;
	return {
		[i("border-color")]: a,
		[i("background-color")]: l,
		[i("affix-color")]: t.affixColor,
		[`&:not(${n}-disabled)`]: {
			"&:hover": {
				[i("border-color")]: o,
				[i("background-color")]: t.backgroundHover || l
			},
			[`&${n}-focused`]: {
				[i("border-color")]: s,
				[i("background-color")]: t.backgroundActive || l,
				boxShadow: `0 0 0 ${nn(e.controlOutlineWidth)} ${c}`
			}
		},
		[`&${n}-disabled`]: {
			[i("border-color")]: t.borderDisabled || t.border,
			[i("background-color")]: t.backgroundDisabled || t.background
		}
	};
}, tg = (e, t, n, r, i, a) => {
	let { componentCls: o } = e;
	return { [`&${o}-${t}`]: [
		eg(e, n),
		{
			[`&${o}-status-error`]: eg(e, {
				...n,
				...r
			}),
			[`&${o}-status-warning`]: eg(e, {
				...n,
				...i
			})
		},
		a
	] };
}, ng = (e, t) => ({
	outline: `${nn(e.lineWidthFocus)} ${e.lineType} ${t}`,
	outlineOffset: nn(e.calc(e.lineWidth).mul(-1).equal()),
	transition: ["outline-offset", "outline"].map((e) => `${e} 0s`).join(", ")
}), rg = (e) => {
	let { componentCls: t, fontHeight: n, controlHeight: r, fontSizeIcon: i, showArrowPaddingInlineEnd: a, iconCls: o, antCls: s, max: c, calc: l } = e, [u, d] = ho(s, "select"), f = c(l(a).sub(i).equal(), 0);
	return { [t]: [
		{
			[u("border-radius")]: e.borderRadius,
			[u("border-color")]: "#000",
			[u("border-size")]: e.lineWidth,
			[u("background-color")]: e.colorBgContainer,
			[u("font-size")]: e.fontSize,
			[u("line-height")]: e.lineHeight,
			[u("font-height")]: n,
			[u("color")]: e.colorText,
			[u("affix-color")]: e.colorText,
			[u("height")]: r,
			[u("padding-horizontal")]: l(e.paddingSM).sub(e.lineWidth).equal(),
			[u("padding-vertical")]: `calc((${d("height")} - ${d("font-height")}) / 2 - ${d("border-size")})`,
			...ro(e),
			display: "inline-flex",
			flexWrap: "nowrap",
			position: "relative",
			transition: `all ${e.motionDurationSlow}`,
			alignItems: "flex-start",
			outline: 0,
			cursor: "pointer",
			borderRadius: d("border-radius"),
			borderWidth: d("border-size"),
			borderStyle: e.lineType,
			borderColor: d("border-color"),
			background: d("background-color"),
			fontSize: d("font-size"),
			lineHeight: d("line-height"),
			color: d("color"),
			paddingInline: d("padding-horizontal"),
			paddingBlock: d("padding-vertical"),
			[`${t}-prefix`]: {
				color: d("affix-color"),
				flex: "none",
				lineHeight: 1
			},
			[`${t}-placeholder`]: {
				...no,
				color: e.colorTextPlaceholder,
				pointerEvents: "none",
				zIndex: 1
			},
			[`${t}-content`]: {
				flex: "auto",
				minWidth: 0,
				position: "relative",
				display: "flex",
				marginInlineEnd: f,
				"&:before": {
					content: "\"\\a0\"",
					width: 0,
					overflow: "hidden"
				},
				"&-value": { visibility: "inherit" },
				"input[readonly]": {
					cursor: "inherit",
					caretColor: "transparent"
				}
			},
			[`${t}-suffix`]: {
				flex: "none",
				color: e.colorTextQuaternary,
				fontSize: e.fontSizeIcon,
				lineHeight: 1,
				transition: ["opacity", "color"].map((t) => `${t} ${e.motionDurationMid} ease`).join(", "),
				"> :not(:last-child)": { marginInlineEnd: e.marginXS }
			},
			[`${t}-prefix, ${t}-suffix`]: {
				alignSelf: "center",
				[o]: { verticalAlign: "top" }
			},
			"&-disabled": {
				background: e.colorBgContainerDisabled,
				[u("color")]: e.colorTextDisabled,
				cursor: "not-allowed",
				input: { cursor: "not-allowed" }
			},
			"&-sm": {
				[u("height")]: e.controlHeightSM,
				[u("padding-horizontal")]: l(e.paddingXS).sub(e.lineWidth).equal(),
				[u("border-radius")]: e.borderRadiusSM,
				[`${t}-clear`]: { insetInlineEnd: d("padding-horizontal") }
			},
			"&-lg": {
				[u("height")]: e.controlHeightLG,
				[u("font-size")]: e.fontSizeLG,
				[u("line-height")]: e.lineHeightLG,
				[u("font-height")]: e.fontHeightLG,
				[u("border-radius")]: e.borderRadiusLG
			}
		},
		{ [`&:not(${t}-customize)`]: { [`${t}-input`]: {
			outline: "none",
			background: "transparent",
			appearance: "none",
			border: 0,
			margin: 0,
			padding: 0,
			color: d("color"),
			fontFamily: "inherit",
			fontSize: "inherit",
			"&::-webkit-search-cancel-button": {
				display: "none",
				appearance: "none"
			}
		} } },
		{ [`&-single:not(${t}-customize)`]: {
			[`${t}-input`]: {
				position: "absolute",
				inset: 0,
				lineHeight: "inherit"
			},
			[`${t}-content`]: {
				...no,
				alignSelf: "center",
				"&-has-value": {
					display: "block",
					"&:before": { display: "none" }
				},
				"&-has-search-value": {
					color: "transparent",
					[`> *:not(${t}-input)`]: { opacity: 0 }
				},
				"&-value": {
					transition: `all ${e.motionDurationMid} ${e.motionEaseInOut}`,
					zIndex: 1,
					opacity: 1
				}
			},
			[`&${t}-open ${t}-content`]: {
				"&-has-value": { opacity: .25 },
				"&-has-search-value": {
					opacity: 1,
					transition: `opacity ${e.motionDurationMid} ${e.motionEaseInOut}`,
					color: "transparent",
					[`> *:not(${t}-input)`]: { opacity: 0 }
				}
			}
		} },
		{ [`&-show-search:not(${t}-customize-input):not(${t}-disabled)`]: { cursor: "text" } },
		$h(e),
		tg(e, "outlined", {
			border: e.colorBorder,
			borderHover: e.hoverBorderColor,
			borderActive: e.activeBorderColor,
			borderOutline: e.activeOutlineColor,
			borderDisabled: e.colorBorderDisabled
		}, {
			border: e.colorError,
			borderHover: e.colorErrorBorderHover,
			borderActive: e.colorError,
			borderOutline: e.colorErrorOutline,
			affixColor: e.colorErrorAffix
		}, {
			border: e.colorWarning,
			borderHover: e.colorWarningHover,
			borderActive: e.colorWarning,
			borderOutline: e.colorWarningOutline,
			affixColor: e.colorWarningAffix
		}),
		tg(e, "filled", {
			border: "transparent",
			borderHover: "transparent",
			borderActive: e.activeBorderColor,
			borderOutline: "transparent",
			borderDisabled: e.colorBorderDisabled,
			background: e.colorFillTertiary,
			backgroundHover: e.colorFillSecondary,
			backgroundActive: e.colorBgContainer
		}, {
			color: e.colorErrorText,
			background: e.colorErrorBg,
			backgroundHover: e.colorErrorBgHover,
			borderActive: e.colorError
		}, {
			background: e.colorWarningBg,
			backgroundHover: e.colorWarningBgHover,
			borderActive: e.colorWarning
		}),
		tg(e, "borderless", {
			border: "transparent",
			borderHover: "transparent",
			borderActive: "transparent",
			borderOutline: "transparent",
			background: "transparent"
		}, {}, {}, {
			[`&:not(${t}-disabled):has(input:focus-visible), &:not(${t}-disabled):has(textarea:focus-visible)`]: ng(e, e.activeBorderColor),
			[`&${t}-status-error:not(${t}-disabled):has(input:focus-visible), &${t}-status-error:not(${t}-disabled):has(textarea:focus-visible)`]: ng(e, e.colorError),
			[`&${t}-status-warning:not(${t}-disabled):has(input:focus-visible), &${t}-status-warning:not(${t}-disabled):has(textarea:focus-visible)`]: ng(e, e.colorWarning)
		}),
		tg(e, "underlined", {
			border: e.colorBorder,
			borderHover: e.hoverBorderColor,
			borderActive: e.activeBorderColor,
			borderOutline: "transparent"
		}, {
			border: e.colorError,
			borderHover: e.colorErrorBorderHover,
			borderActive: e.colorError
		}, {
			border: e.colorWarning,
			borderHover: e.colorWarningHover,
			borderActive: e.colorWarning
		}, {
			borderRadius: 0,
			borderTopColor: "transparent",
			borderInlineColor: "transparent"
		}),
		Zh(e)
	] };
}, ig = (e) => {
	let { fontSize: t, lineHeight: n, lineWidth: r, lineWidthFocus: i, controlHeight: a, controlHeightSM: o, controlHeightLG: s, paddingXXS: c, controlPaddingHorizontal: l, zIndexPopupBase: u, colorText: d, fontWeightStrong: f, controlItemBgActive: p, controlItemBgHover: m, colorBgContainer: h, colorFillSecondary: g, colorBgContainerDisabled: _, colorTextDisabled: v, colorPrimaryHover: y, colorPrimary: b, controlOutline: x } = e, S = c * 2, C = r * 2, w = Math.min(a - S, a - C), T = Math.min(o - S, o - C), E = Math.min(s - S, s - C), D = Math.floor(c / 2);
	return {
		lineWidthFocus: i === 0 ? 0 : r,
		INTERNAL_FIXED_ITEM_MARGIN: D,
		zIndexPopup: u + 50,
		optionSelectedColor: d,
		optionSelectedFontWeight: f,
		optionSelectedBg: p,
		optionActiveBg: m,
		optionPadding: `${(a - t * n) / 2}px ${l}px`,
		optionFontSize: t,
		optionLineHeight: n,
		optionHeight: a,
		selectorBg: h,
		clearBg: h,
		singleItemHeightLG: s,
		multipleItemBg: g,
		multipleItemBorderColor: "transparent",
		multipleItemHeight: w,
		multipleItemHeightSM: T,
		multipleItemHeightLG: E,
		multipleSelectorBgDisabled: _,
		multipleItemColorDisabled: v,
		multipleItemBorderColorDisabled: "transparent",
		showArrowPaddingInlineEnd: Math.ceil(e.fontSize * 1.25),
		hoverBorderColor: y,
		activeBorderColor: b,
		activeOutlineColor: x,
		selectAffixPadding: c
	};
}, ag = (e) => {
	let { antCls: t, componentCls: n, motionDurationMid: r, inputPaddingHorizontalBase: i } = e, a = {
		[`${n}-clear`]: { opacity: 1 },
		[`${n}-suffix:not(:last-child)`]: {
			opacity: 0,
			pointerEvents: "none"
		},
		[`&${n}-allow-clear:not(${n}-show-arrow):not(${n}-customize) ${n}-content`]: { marginInlineEnd: e.showArrowPaddingInlineEnd }
	};
	return {
		[n]: {
			...ro(e),
			[`${n}-selection-item`]: {
				flex: 1,
				fontWeight: 400,
				position: "relative",
				userSelect: "none",
				...no,
				[`> ${t}-typography`]: { display: "inline" }
			},
			[`${n}-prefix`]: {
				flex: "none",
				marginInlineEnd: e.selectAffixPadding
			},
			[`${n}-clear`]: {
				position: "absolute",
				top: "50%",
				insetInlineStart: "auto",
				insetInlineEnd: i,
				zIndex: 1,
				display: "inline-block",
				width: e.fontSizeIcon,
				height: e.fontSizeIcon,
				marginTop: e.calc(e.fontSizeIcon).mul(-1).div(2).equal(),
				padding: 0,
				background: "transparent",
				color: e.colorTextQuaternary,
				fontSize: e.fontSizeIcon,
				fontFamily: "inherit",
				fontStyle: "normal",
				lineHeight: 1,
				textAlign: "center",
				textTransform: "none",
				appearance: "none",
				border: 0,
				cursor: "pointer",
				opacity: 0,
				transition: ["color", "opacity"].map((e) => `${e} ${r} ease`).join(", "),
				textRendering: "auto",
				transform: "translateZ(0)",
				"&:before": { display: "block" },
				"&:hover": { color: e.colorIcon }
			},
			"@media(hover:none)": a,
			"&:hover": a
		},
		[`${n}-status`]: { "&-error, &-warning, &-success, &-validating": { [`&${n}-has-feedback`]: { [`${n}-clear`]: { insetInlineEnd: e.calc(i).add(e.fontSize).add(e.paddingXS).equal() } } } }
	};
}, og = (e) => {
	let { componentCls: t } = e;
	return [
		{ [t]: { [`&${t}-in-form-item`]: { width: "100%" } } },
		ag(e),
		Xh(e),
		{ [`${t}-rtl`]: { direction: "rtl" } },
		jd(e, { focusElCls: `${t}-focused` })
	];
}, sg = fo("Select", (e, { rootPrefixCls: t }) => {
	let n = Ti(e, {
		rootPrefixCls: t,
		inputPaddingHorizontalBase: e.calc(e.paddingSM).sub(e.lineWidth).equal(),
		multipleSelectItemHeight: e.multipleItemHeight,
		selectHeight: e.controlHeight
	});
	return [og(n), rg(n)];
}, ig, { unitless: {
	optionLineHeight: !0,
	optionSelectedFontWeight: !0
} }), cg = {
	icon: {
		tag: "svg",
		attrs: {
			viewBox: "64 64 896 896",
			focusable: "false"
		},
		children: [{
			tag: "path",
			attrs: { d: "M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" }
		}]
	},
	name: "check",
	theme: "outlined"
};
// node_modules/@ant-design/icons/es/icons/CheckOutlined.js
function lg() {
	return lg = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, lg.apply(this, arguments);
}
var ug = /*#__PURE__*/ g.forwardRef((e, t) => /*#__PURE__*/ g.createElement(Ko, lg({}, e, {
	ref: t,
	icon: cg
}))), dg = {
	icon: {
		tag: "svg",
		attrs: {
			viewBox: "64 64 896 896",
			focusable: "false"
		},
		children: [{
			tag: "path",
			attrs: { d: "M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" }
		}]
	},
	name: "down",
	theme: "outlined"
};
// node_modules/@ant-design/icons/es/icons/DownOutlined.js
function fg() {
	return fg = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, fg.apply(this, arguments);
}
var pg = /*#__PURE__*/ g.forwardRef((e, t) => /*#__PURE__*/ g.createElement(Ko, fg({}, e, {
	ref: t,
	icon: dg
}))), mg = {
	icon: {
		tag: "svg",
		attrs: {
			viewBox: "64 64 896 896",
			focusable: "false"
		},
		children: [{
			tag: "path",
			attrs: { d: "M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" }
		}]
	},
	name: "search",
	theme: "outlined"
};
// node_modules/@ant-design/icons/es/icons/SearchOutlined.js
function hg() {
	return hg = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, hg.apply(this, arguments);
}
var gg = /*#__PURE__*/ g.forwardRef((e, t) => /*#__PURE__*/ g.createElement(Ko, hg({}, e, {
	ref: t,
	icon: mg
})));
// node_modules/antd/es/select/useIcons.js
function _g({ suffixIcon: e, contextSuffixIcon: t, clearIcon: n, contextClearIcon: r, menuItemSelectedIcon: i, contextMenuItemSelectedIcon: a, removeIcon: o, contextRemoveIcon: s, loading: c, loadingIcon: l, contextLoadingIcon: u, searchIcon: d, contextSearchIcon: f, multiple: p, hasFeedback: m, showSuffixIcon: h, feedbackIcon: _, showArrow: v, componentName: y }) {
	return g.useMemo(() => {
		let y = au(n, r, /*#__PURE__*/ g.createElement(Zo, null)), b = (t) => e === null && !m && !v ? null : /*#__PURE__*/ g.createElement(g.Fragment, null, h !== !1 && t, m && _), x = null;
		x = e === void 0 ? c ? b(au(l, u, /*#__PURE__*/ g.createElement(iu, { spin: !0 }))) : ({ open: e, showSearch: n }) => b(e && n ? au(d, f, /*#__PURE__*/ g.createElement(gg, null)) : au(t, /*#__PURE__*/ g.createElement(pg, null))) : b(e);
		let S = au(i, a, p ? /*#__PURE__*/ g.createElement(ug, null) : null), C = au(o, s, /*#__PURE__*/ g.createElement(es, null));
		return {
			clearIcon: y,
			suffixIcon: x,
			itemIcon: S,
			removeIcon: C
		};
	}, [
		e,
		t,
		n,
		r,
		i,
		a,
		o,
		s,
		c,
		l,
		u,
		d,
		f,
		p,
		m,
		h,
		_,
		v
	]);
}
// node_modules/antd/es/select/usePopupRender.js
function vg(e) {
	return g.useMemo(() => {
		if (e) return (...t) => /*#__PURE__*/ g.createElement(Ep, {
			space: !0,
			form: !0
		}, e.apply(void 0, t));
	}, [e]);
}
// node_modules/antd/es/select/useShowArrow.js
function yg(e, t) {
	return t === void 0 ? e !== null : t;
}
// node_modules/antd/es/select/index.js
var bg = "SECRET_COMBOBOX_MODE_DO_NOT_USE", xg = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { prefixCls: n, bordered: r, className: i, rootClassName: a, getPopupContainer: o, popupClassName: s, dropdownClassName: c, listHeight: l = 256, placement: u, listItemHeight: d, size: f, disabled: p, notFoundContent: m, status: h, builtinPlacements: _, dropdownMatchSelectWidth: v, popupMatchSelectWidth: y, direction: b, style: x, allowClear: S, variant: C, popupStyle: w, dropdownStyle: T, transitionName: E, tagRender: D, maxCount: O, prefix: k, dropdownRender: A, popupRender: j, onDropdownVisibleChange: M, onOpenChange: N, styles: P, classNames: F, clearIcon: I, showSearch: L, ...R } = e, { getPopupContainer: z, getPrefixCls: ee, renderEmpty: B, direction: V, virtual: H, popupMatchSelectWidth: te, popupOverflow: ne } = g.useContext(kt), { showSearch: re, allowClear: U, style: ie, styles: ae, className: oe, classNames: se, clearIcon: W, loadingIcon: ce, menuItemSelectedIcon: le, removeIcon: ue, suffixIcon: G } = Mt("select"), [, de] = to(), K = d ?? de?.controlHeight, q = ee("select", n), fe = ee(), pe = b ?? V, { compactSize: me, compactItemClassnames: J } = Du(q, pe), [Y, he] = Kh("select", C, r), ge = bc(q), [_e, ve] = sg(q, ge), ye = g.useMemo(() => {
		let { mode: t } = e;
		if (t !== "combobox") return t === bg ? "combobox" : t;
	}, [e.mode]), be = ye === "multiple" || ye === "tags", X = yg(e.suffixIcon, e.showArrow), xe = y ?? v ?? te, Se = vg(j || A), Ce = N || M, { status: we, hasFeedback: Te, isFormItemInput: Ee, feedbackIcon: De } = g.useContext(Cp), Oe = Ih(we, h), ke;
	ke = m === void 0 ? ye === "combobox" ? null : B?.("Select") || /*#__PURE__*/ g.createElement(Gh, { componentName: "Select" }) : m;
	let { suffixIcon: Ae, itemIcon: je, removeIcon: Me, clearIcon: Ne } = _g({
		...R,
		multiple: be,
		hasFeedback: Te,
		feedbackIcon: De,
		showSuffixIcon: X,
		prefixCls: q,
		componentName: "Select",
		clearIcon: I,
		searchIcon: Ph(L, "searchIcon"),
		contextClearIcon: W,
		contextLoadingIcon: ce,
		contextMenuItemSelectedIcon: le,
		contextRemoveIcon: ue,
		contextSearchIcon: Ph(re, "searchIcon"),
		contextSuffixIcon: G
	}), Pe = S ?? U, Ie = Pe === !0 ? { clearIcon: Ne } : Pe, Le = L ?? re, Re = Fe(R, ["suffixIcon", "itemIcon"]), ze = Tu((e) => f ?? me ?? e), Be = g.useContext(Hl), Ve = p ?? Be, He = {
		...e,
		variant: Y,
		status: Oe,
		disabled: Ve,
		size: ze
	}, Ue = sc(ie), We = sc(x), [Ge, Ke] = lc([se, F], [
		ae,
		Ue,
		P,
		We
	], { props: He }, { popup: { _default: "root" } }), qe = Z(Ge.popup.root, s, c, { [`${q}-dropdown-${pe}`]: pe === "rtl" }, a, ve, ge, _e), Je = {
		...Ke.popup?.root,
		...w ?? T
	}, Ye = Z({
		[`${q}-lg`]: ze === "large",
		[`${q}-sm`]: ze === "small",
		[`${q}-rtl`]: pe === "rtl",
		[`${q}-${Y}`]: he,
		[`${q}-in-form-item`]: Ee
	}, Fh(q, Oe, Te), J, oe, i, Ge.root, a, ve, ge, _e), Xe = g.useMemo(() => u === void 0 ? pe === "rtl" ? "bottomRight" : "bottomLeft" : u, [u, pe]), [Ze] = pu("SelectLike", Ke.popup.root?.zIndex ?? Je.zIndex);
	return /*#__PURE__*/ g.createElement(Nh, {
		ref: t,
		virtual: H,
		classNames: Ge,
		styles: Ke,
		showSearch: Le,
		...Re,
		style: Ke.root,
		popupMatchSelectWidth: xe,
		transitionName: mu(fe, "slide-up", E),
		builtinPlacements: Jh(_, ne),
		listHeight: l,
		listItemHeight: K,
		mode: ye,
		prefixCls: q,
		placement: Xe,
		direction: pe,
		prefix: k,
		suffixIcon: Ae,
		menuItemSelectedIcon: je,
		removeIcon: Me,
		allowClear: Ie,
		notFoundContent: ke,
		className: Ye,
		getPopupContainer: o || z,
		popupClassName: qe,
		disabled: Ve,
		popupStyle: {
			...Ke.popup.root,
			...Je,
			zIndex: Ze
		},
		maxCount: be ? O : void 0,
		tagRender: be ? D : void 0,
		popupRender: Se,
		onPopupVisibleChange: Ce
	});
}), Sg = Op(xg, "popupAlign");
xg.SECRET_COMBOBOX_MODE_DO_NOT_USE = bg, xg.Option = Im, xg.OptGroup = Fm, xg._InternalPanelDoNotUseOrYouWillBeFired = Sg;
// node_modules/antd/es/button/index.js
var Cg = zd;
// node_modules/antd/es/form/util.js
function wg(e) {
	return e === void 0 || e === !1 ? [] : Array.isArray(e) ? e : [e];
}
// node_modules/antd/es/form/hooks/useForm.js
function Tg(e) {
	return wg(e).join("_");
}
// node_modules/antd/es/radio/context.js
var Eg = /*#__PURE__*/ g.createContext(void 0), Dg = Eg.Provider, Og = /*#__PURE__*/ g.createContext(void 0), kg = Og.Provider;
// node_modules/@rc-component/checkbox/es/index.js
function Ag() {
	return Ag = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Ag.apply(this, arguments);
}
var jg = /*#__PURE__*/ (0, g.forwardRef)((e, t) => {
	let { prefixCls: n = "rc-checkbox", className: r, style: i, checked: a, disabled: o, defaultChecked: s = !1, type: c = "checkbox", title: l, onChange: u, ...d } = e, f = (0, g.useRef)(null), p = (0, g.useRef)(null), [m, h] = S(s, a);
	(0, g.useImperativeHandle)(t, () => ({
		focus: (e) => {
			f.current?.focus(e);
		},
		blur: () => {
			f.current?.blur();
		},
		input: f.current,
		nativeElement: p.current
	}));
	let _ = Z(n, r, {
		[`${n}-checked`]: m,
		[`${n}-disabled`]: o
	});
	return /*#__PURE__*/ g.createElement("span", {
		className: _,
		title: l,
		style: i,
		ref: p
	}, /*#__PURE__*/ g.createElement("input", Ag({}, d, {
		className: `${n}-input`,
		ref: f,
		onChange: (t) => {
			o || ("checked" in e || h(t.target.checked), u?.({
				target: {
					...e,
					type: c,
					checked: t.target.checked
				},
				stopPropagation() {
					t.stopPropagation();
				},
				preventDefault() {
					t.preventDefault();
				},
				nativeEvent: t.nativeEvent
			}));
		},
		disabled: o,
		checked: !!m,
		type: c
	})));
});
// node_modules/antd/es/checkbox/useBubbleLock.js
function Mg(e) {
	let t = g.useRef(null), n = () => {
		O.cancel(t.current), t.current = null;
	};
	return [() => {
		n(), t.current = O(() => {
			t.current = null;
		});
	}, (r) => {
		t.current && (r.stopPropagation(), n()), e?.(r);
	}];
}
// node_modules/antd/es/radio/style/index.js
var Ng = (e) => {
	let { componentCls: t, antCls: n, lineWidth: r, borderRadius: i, borderRadiusLG: a, borderRadiusSM: o, calc: s } = e, c = `${t}-group`, l = `${t}-button-wrapper`, u = `${n}-badge`, d = (e) => ({
		[`> ${u}`]: { width: "auto" },
		[`> ${u} > ${l}`]: { width: "100%" },
		[`> ${u}:not(:last-child)`]: { marginBlockEnd: s(r).mul(-1).equal() },
		[`> ${u} > ${l}:not(:last-child)`]: { marginBlockEnd: 0 },
		[`> ${u}:first-child > ${l}`]: {
			borderStartStartRadius: e,
			borderStartEndRadius: e,
			borderEndStartRadius: 0,
			borderEndEndRadius: 0
		},
		[`> ${u}:last-child > ${l}`]: {
			borderStartStartRadius: 0,
			borderStartEndRadius: 0,
			borderEndStartRadius: e,
			borderEndEndRadius: e
		},
		[`> ${u}:not(:first-child):not(:last-child) > ${l}`]: { borderRadius: 0 },
		[`> ${u}:first-child:last-child > ${l}`]: { borderRadius: e }
	});
	return { [c]: {
		...ro(e),
		display: "inline-block",
		fontSize: 0,
		[`&${c}-rtl`]: { direction: "rtl" },
		[`&${c}-block`]: { display: "flex" },
		[`${n}-badge ${n}-badge-count`]: { zIndex: 1 },
		[`> ${n}-badge:not(:first-child) > ${n}-button-wrapper`]: { borderInlineStart: "none" },
		"&-vertical": {
			display: "flex",
			flexDirection: "column",
			rowGap: e.marginXS,
			[`&:has(> ${l}, > ${u} > ${l})`]: { rowGap: 0 },
			[`${t}-wrapper`]: { marginInlineEnd: 0 },
			...d(i),
			[`&${c}-large`]: { ...d(a) },
			[`&${c}-small`]: { ...d(o) }
		}
	} };
}, Pg = (e) => {
	let { componentCls: t, wrapperMarginInlineEnd: n, colorPrimary: r, colorPrimaryHover: i, radioSize: a, motionDurationSlow: o, motionDurationMid: s, motionEaseInOutCirc: c, colorBgContainer: l, colorBorder: u, lineWidth: d, colorBgContainerDisabled: f, colorTextDisabled: p, paddingXS: m, dotColorDisabled: h, dotSize: g, lineType: _, radioColor: v, radioBgColor: y } = e;
	return { [`${t}-wrapper`]: {
		...ro(e),
		display: "inline-flex",
		alignItems: "baseline",
		marginInlineStart: 0,
		marginInlineEnd: n,
		cursor: "pointer",
		"&:last-child": { marginInlineEnd: 0 },
		[`&${t}-wrapper-rtl`]: { direction: "rtl" },
		"&-disabled": {
			cursor: "not-allowed",
			color: e.colorTextDisabled
		},
		"&::after": {
			display: "inline-block",
			width: 0,
			overflow: "hidden",
			content: "\"\\a0\""
		},
		"&-block": {
			flex: 1,
			justifyContent: "center"
		},
		[t]: {
			...ro(e),
			position: "relative",
			whiteSpace: "nowrap",
			lineHeight: 1,
			cursor: "pointer",
			alignSelf: "center",
			boxSizing: "border-box",
			display: "block",
			width: `calc(${a} * 1px)`,
			height: `calc(${a} * 1px)`,
			backgroundColor: l,
			border: `${nn(d)} ${_} ${u}`,
			borderRadius: "50%",
			transition: `all ${s}`,
			flex: "none",
			"&:after": {
				content: "\"\"",
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%) scale(0)",
				width: `calc(${g} * 1px)`,
				height: `calc(${g} * 1px)`,
				backgroundColor: v,
				borderRadius: "50%",
				transformOrigin: "50% 50%",
				opacity: 0,
				transition: `all ${o} ${c}`
			},
			[`${t}-input`]: {
				position: "absolute",
				inset: 0,
				zIndex: 1,
				cursor: "pointer",
				opacity: 0,
				margin: 0
			},
			[`&:has(${t}-input:focus-visible)`]: oo(e)
		},
		[`&:hover:not(${t}-wrapper-disabled) ${t}`]: { borderColor: r },
		[`&:hover ${t}-checked:not(${t}-disabled)`]: {
			backgroundColor: i,
			borderColor: "transparent"
		},
		[`${t}-checked`]: {
			backgroundColor: y,
			borderColor: r,
			"&::after": {
				transform: "translate(-50%, -50%)",
				opacity: 1
			}
		},
		[`${t}-disabled`]: {
			[`&, ${t}-input`]: {
				cursor: "not-allowed",
				pointerEvents: "none"
			},
			background: f,
			borderColor: u,
			"&::after": { backgroundColor: h }
		},
		[`${t}-disabled + span`]: {
			color: p,
			cursor: "not-allowed"
		},
		[`span${t} + *`]: {
			paddingInlineStart: m,
			paddingInlineEnd: m
		}
	} };
}, Fg = (e) => {
	let { buttonColor: t, controlHeight: n, componentCls: r, lineWidth: i, lineType: a, colorBorder: o, motionDurationMid: s, buttonPaddingInline: c, fontSize: l, buttonBg: u, fontSizeLG: d, controlHeightLG: f, controlHeightSM: p, paddingXS: m, borderRadius: h, borderRadiusSM: g, borderRadiusLG: _, buttonCheckedBg: v, buttonSolidCheckedColor: y, colorTextDisabled: b, colorBgContainerDisabled: x, buttonCheckedBgDisabled: S, buttonCheckedColorDisabled: C, colorPrimary: w, colorPrimaryHover: T, colorPrimaryActive: E, buttonSolidCheckedBg: D, buttonSolidCheckedHoverBg: O, buttonSolidCheckedActiveBg: k, calc: A } = e;
	return { [`${r}-button-wrapper`]: {
		position: "relative",
		display: "inline-block",
		height: n,
		margin: 0,
		paddingInline: c,
		paddingBlock: 0,
		color: t,
		fontSize: l,
		lineHeight: nn(A(n).sub(A(i).mul(2)).equal()),
		background: u,
		border: `${nn(i)} ${a} ${o}`,
		borderBlockStartWidth: A(i).add(.02).equal(),
		borderInlineEndWidth: i,
		cursor: "pointer",
		transition: [
			"color",
			"background-color",
			"box-shadow"
		].map((e) => `${e} ${s}`).join(","),
		a: { color: t },
		[`> ${r}-button`]: {
			position: "absolute",
			insetBlockStart: 0,
			insetInlineStart: 0,
			zIndex: -1,
			width: "100%",
			height: "100%"
		},
		"&:not(:last-child)": { marginInlineEnd: A(i).mul(-1).equal() },
		"&:first-child": {
			borderInlineStart: `${nn(i)} ${a} ${o}`,
			borderStartStartRadius: h,
			borderEndStartRadius: h
		},
		"&:last-child": {
			borderStartEndRadius: h,
			borderEndEndRadius: h
		},
		"&:first-child:last-child": { borderRadius: h },
		[`${r}-group-large &`]: {
			height: f,
			fontSize: d,
			lineHeight: nn(A(f).sub(A(i).mul(2)).equal()),
			"&:first-child": {
				borderStartStartRadius: _,
				borderEndStartRadius: _
			},
			"&:last-child": {
				borderStartEndRadius: _,
				borderEndEndRadius: _
			}
		},
		[`${r}-group-small &`]: {
			height: p,
			paddingInline: A(m).sub(i).equal(),
			paddingBlock: 0,
			lineHeight: nn(A(p).sub(A(i).mul(2)).equal()),
			"&:first-child": {
				borderStartStartRadius: g,
				borderEndStartRadius: g
			},
			"&:last-child": {
				borderStartEndRadius: g,
				borderEndEndRadius: g
			}
		},
		[`${r}-group-vertical > &`]: {
			marginInlineEnd: 0,
			borderRadius: 0,
			"&:not(:last-child)": { marginBlockEnd: A(i).mul(-1).equal() },
			"&:first-child": {
				borderStartStartRadius: h,
				borderStartEndRadius: h,
				borderEndStartRadius: 0,
				borderEndEndRadius: 0
			},
			"&:last-child": {
				borderStartStartRadius: 0,
				borderStartEndRadius: 0,
				borderEndStartRadius: h,
				borderEndEndRadius: h
			},
			"&:first-child:last-child": { borderRadius: h }
		},
		[`${r}-group-vertical${r}-group-large > &`]: {
			"&:first-child": {
				borderStartStartRadius: _,
				borderStartEndRadius: _
			},
			"&:last-child": {
				borderEndStartRadius: _,
				borderEndEndRadius: _
			},
			"&:first-child:last-child": { borderRadius: _ }
		},
		[`${r}-group-vertical${r}-group-small > &`]: {
			"&:first-child": {
				borderStartStartRadius: g,
				borderStartEndRadius: g
			},
			"&:last-child": {
				borderEndStartRadius: g,
				borderEndEndRadius: g
			},
			"&:first-child:last-child": { borderRadius: g }
		},
		"&:hover": {
			position: "relative",
			color: w
		},
		"&:has(:focus-visible)": oo(e),
		[`${r}, input[type='checkbox'], input[type='radio']`]: {
			width: 0,
			height: 0,
			opacity: 0,
			pointerEvents: "none"
		},
		[`&-checked:not(${r}-button-wrapper-disabled)`]: {
			zIndex: 1,
			color: w,
			background: v,
			borderColor: w,
			"&::before": { backgroundColor: w },
			"&:first-child": { borderColor: w },
			"&:hover": {
				color: T,
				borderColor: T,
				"&::before": { backgroundColor: T }
			},
			"&:active": {
				color: E,
				borderColor: E,
				"&::before": { backgroundColor: E }
			}
		},
		[`${r}-group-solid &-checked:not(${r}-button-wrapper-disabled)`]: {
			color: y,
			background: D,
			borderColor: D,
			"&:hover": {
				color: y,
				background: O,
				borderColor: O
			},
			"&:active": {
				color: y,
				background: k,
				borderColor: k
			}
		},
		"&-disabled": {
			color: b,
			backgroundColor: x,
			borderColor: o,
			cursor: "not-allowed",
			"&:first-child, &:hover": {
				color: b,
				backgroundColor: x,
				borderColor: o
			}
		},
		[`&-disabled${r}-button-wrapper-checked`]: {
			color: C,
			backgroundColor: S,
			borderColor: o,
			boxShadow: "none"
		},
		"&-block": {
			flex: 1,
			textAlign: "center"
		}
	} };
}, Ig = fo("Radio", (e) => {
	let { controlOutline: t, controlOutlineWidth: n } = e, r = `0 0 0 ${nn(n)} ${t}`, i = Ti(e, {
		radioFocusShadow: r,
		radioButtonFocusShadow: r
	});
	return [
		Ng(i),
		Pg(i),
		Fg(i)
	];
}, (e) => {
	let { wireframe: t, padding: n, marginXS: r, lineWidth: i, fontSizeLG: a, colorText: o, colorBgContainer: s, colorTextDisabled: c, controlItemBgActiveDisabled: l, colorTextLightSolid: u, colorPrimary: d, colorPrimaryHover: f, colorPrimaryActive: p, colorWhite: m } = e, h = a;
	return {
		radioSize: h,
		dotSize: t ? h - 8 : h - (4 + i) * 2,
		dotColorDisabled: c,
		buttonSolidCheckedColor: u,
		buttonSolidCheckedBg: d,
		buttonSolidCheckedHoverBg: f,
		buttonSolidCheckedActiveBg: p,
		buttonBg: s,
		buttonCheckedBg: s,
		buttonColor: o,
		buttonCheckedBgDisabled: l,
		buttonCheckedColorDisabled: c,
		buttonPaddingInline: n - i,
		wrapperMarginInlineEnd: r,
		radioColor: t ? d : m,
		radioBgColor: t ? s : d
	};
}, { unitless: {
	radioSize: !0,
	dotSize: !0
} }), Lg = /*#__PURE__*/ g.forwardRef((e, t) => {
	let n = g.useContext(Eg), r = g.useContext(Og), { getPrefixCls: i, direction: a, className: o, style: s, classNames: c, styles: l } = Mt("radio"), u = ne(t, g.useRef(null)), { isFormItemInput: d } = g.useContext(Cp), f = (t) => {
		e.onChange?.(t), n?.onChange?.(t);
	}, { prefixCls: p, className: m, rootClassName: h, children: _, style: v, title: y, classNames: b, styles: x, checked: S, ...C } = e, w = i("radio", p), T = (n?.optionType || r) === "button", E = T ? `${w}-button` : w, D = bc(w), [O, k] = Ig(w, D), A = { ...C }, j = g.useContext(Hl), M = "checked" in e, N = S;
	n && (A.name = n.name, A.onChange = f, N = e.value === n.value, A.disabled = A.disabled ?? n.disabled), (M || n) && (A.checked = N), A.disabled = A.disabled ?? j;
	let P = {
		...e,
		...A,
		checked: N
	}, F = sc(s), I = sc(v), [L, R] = lc([c, b], [
		l,
		F,
		x,
		I
	], { props: P }), z = Z(`${E}-wrapper`, {
		[`${E}-wrapper-checked`]: N,
		[`${E}-wrapper-disabled`]: A.disabled,
		[`${E}-wrapper-rtl`]: a === "rtl",
		[`${E}-wrapper-in-form-item`]: d,
		[`${E}-wrapper-block`]: !!n?.block
	}, o, m, h, L.root, O, k, D), [ee, B] = Mg(A.onClick);
	return /*#__PURE__*/ g.createElement(wu, {
		component: "Radio",
		disabled: A.disabled
	}, /*#__PURE__*/ g.createElement("label", {
		className: z,
		style: R.root,
		onMouseEnter: e.onMouseEnter,
		onMouseLeave: e.onMouseLeave,
		title: y,
		onClick: ee
	}, /*#__PURE__*/ g.createElement(jg, {
		...A,
		className: Z(L.icon, { [gu]: !T }),
		style: R.icon,
		type: "radio",
		prefixCls: E,
		ref: u,
		onClick: B
	}), Pe(_) ? /*#__PURE__*/ g.createElement("span", {
		className: Z(`${E}-label`, L.label),
		style: R.label
	}, _) : null));
}), Rg = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { getPrefixCls: n, direction: r } = g.useContext(kt), { name: i } = g.useContext(Cp), a = N(Tg(i)), { prefixCls: o, className: s, rootClassName: c, options: l, buttonStyle: u = "outline", disabled: d, children: f, size: p, style: m, id: h, optionType: _, name: v = a, defaultValue: y, value: b, block: x = !1, onChange: C, onMouseEnter: w, onMouseLeave: T, onFocus: E, onBlur: D, orientation: O, vertical: k, role: A = "radiogroup" } = e, [j, M] = S(y, b), P = g.useCallback((e) => {
		let t = j, n = e.target.value;
		M(n), n !== t && C?.(e);
	}, [
		j,
		M,
		C
	]), F = n("radio", o), I = `${F}-group`, L = bc(F), [R, z] = Ig(F, L), ee = f;
	l && l.length > 0 && (ee = l.map((e) => typeof e == "string" || Zs(e) ? /*#__PURE__*/ g.createElement(Lg, {
		key: e.toString(),
		prefixCls: F,
		disabled: d,
		value: e,
		checked: j === e
	}, e) : /*#__PURE__*/ g.createElement(Lg, {
		key: `radio-group-value-options-${e.value}`,
		prefixCls: F,
		disabled: e.disabled || d,
		value: e.value,
		checked: j === e.value,
		title: e.title,
		style: e.style,
		className: e.className,
		id: e.id,
		required: e.required,
		onChange: e.onChange
	}, e.label)));
	let B = Tu(p), [, V] = su(O, k), H = Z(I, `${I}-${u}`, {
		[`${I}-large`]: B === "large",
		[`${I}-small`]: B === "small",
		[`${I}-rtl`]: r === "rtl",
		[`${I}-block`]: x
	}, s, c, R, z, L), te = g.useMemo(() => ({
		onChange: P,
		value: j,
		disabled: d,
		name: v,
		optionType: _,
		block: x
	}), [
		P,
		j,
		d,
		v,
		_,
		x
	]);
	return /*#__PURE__*/ g.createElement("div", {
		...Be(e, {
			aria: !0,
			data: !0
		}),
		role: A,
		className: Z(H, { [`${F}-group-vertical`]: V }),
		style: m,
		onMouseEnter: w,
		onMouseLeave: T,
		onFocus: E,
		onBlur: D,
		id: h,
		ref: t
	}, /*#__PURE__*/ g.createElement(Dg, { value: te }, ee));
}), zg = /*#__PURE__*/ g.memo(Rg), Bg = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { getPrefixCls: n } = g.useContext(kt), { prefixCls: r, ...i } = e, a = n("radio", r);
	return /*#__PURE__*/ g.createElement(kg, { value: "button" }, /*#__PURE__*/ g.createElement(Lg, {
		prefixCls: a,
		...i,
		type: "radio",
		ref: t
	}));
}), Vg = Lg;
Vg.Button = Bg, Vg.Group = zg, Vg.__ANT_RADIO = !0;
// src/stream.ts
var Hg = class {
	snapshot = {
		phase: "idle",
		text: "",
		attempt: 0,
		options: null
	};
	listeners = /* @__PURE__ */ new Set();
	generation = 0;
	controller = null;
	transport;
	constructor(e) {
		this.transport = e;
	}
	getSnapshot = () => this.snapshot;
	subscribe = (e) => (this.listeners.add(e), () => {
		this.listeners.delete(e);
	});
	set(e) {
		this.snapshot = e, this.listeners.forEach((e) => e());
	}
	invalidate() {
		this.generation += 1, this.controller?.abort(), this.controller = null;
	}
	start(e) {
		if (["waiting", "streaming"].includes(this.snapshot.phase)) return !1;
		this.invalidate();
		let t = this.generation, n = new AbortController();
		this.controller = n;
		let r = { ...e };
		return this.set({
			phase: "waiting",
			text: "",
			attempt: this.snapshot.attempt + 1,
			options: r
		}), this.consume(t, r, n.signal), !0;
	}
	async consume(e, t, n) {
		try {
			for await (let r of this.transport(t, n)) {
				if (e !== this.generation) return;
				this.set({
					...this.snapshot,
					phase: "streaming",
					text: this.snapshot.text + r
				});
			}
			e === this.generation && (this.controller = null, this.set({
				...this.snapshot,
				phase: "done"
			}));
		} catch {
			e === this.generation && (this.controller = null, this.set({
				...this.snapshot,
				phase: "error"
			}));
		}
	}
	stop() {
		["waiting", "streaming"].includes(this.snapshot.phase) && (this.invalidate(), this.set({
			...this.snapshot,
			phase: "stopped"
		}));
	}
	retry() {
		return !["stopped", "error"].includes(this.snapshot.phase) || !this.snapshot.options ? !1 : this.start({
			...this.snapshot.options,
			mode: "normal"
		});
	}
	reset() {
		this.invalidate(), this.set({
			phase: "idle",
			text: "",
			attempt: 0,
			options: null
		});
	}
	dispose() {
		this.invalidate(), this.listeners.clear();
	}
}, Ug = {
	portfolio: "先让读者看清楚你做了什么。\n\n首页保留少量代表项目，每个项目给出一个清楚的入口：能操作的演示、实现说明和对应源码。长篇技术细节可以放进独立页面。\n\n正文需要在手机上读得清楚。标题、说明和辅助文字拉开层级，颜色负责区分重点，不必让每张卡片都抢着说话。\n\n做完后沿着真实的阅读路径走一遍：从首页找到项目，打开演示，返回笔记。也试试键盘、窄屏和加载失败的情况。\n\n这段文字是本地预设示例，用于观察分段显示和中途停止的行为。",
	form: "报名表可以先从姓名、参与场次和联系方式开始。\n\n配置字段时给每个字段一个稳定标识；用户填写的值单独保存，避免修改标签时连输入内容也被清空。\n\n提交前显示具体的校验原因。例如必填项为空，提示应靠近相应字段；数值 0 不能直接被当成空值。\n\n网络失败后保留填写内容，恢复操作要让用户看得见。涉及名额与重复报名时，还需要服务端校验。\n\n这段文字是本地预设示例，没有提交报名数据，也没有调用语言模型。"
};
function Wg(e, t) {
	return new Promise((n, r) => {
		if (t.aborted) {
			r(/* @__PURE__ */ Error("aborted"));
			return;
		}
		let i = () => {
			clearTimeout(a), t.removeEventListener("abort", i), r(/* @__PURE__ */ Error("aborted"));
		}, a = setTimeout(() => {
			t.removeEventListener("abort", i), n();
		}, e);
		t.addEventListener("abort", i, { once: !0 });
	});
}
async function* Gg(e, t) {
	await Wg(e.mode === "slow" ? 1600 : 500, t);
	let n = Array.from(Ug[e.topic]);
	for (let r = 0; r < n.length; r += 4) {
		if (await Wg(e.mode === "slow" ? 240 : 75, t), e.mode === "failure" && r >= 52) throw Error("simulated interruption");
		yield n.slice(r, r + 4).join("");
	}
}
// node_modules/react/cjs/react-jsx-runtime.production.min.js
var Kg = /* @__PURE__ */ o(((e) => {
	var t = u(), n = Symbol.for("react.element"), r = Object.prototype.hasOwnProperty, i = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, a = {
		key: !0,
		ref: !0,
		__self: !0,
		__source: !0
	};
	function o(e, t, o) {
		var s, c = {}, l = null, u = null;
		for (s in o !== void 0 && (l = "" + o), t.key !== void 0 && (l = "" + t.key), t.ref !== void 0 && (u = t.ref), t) r.call(t, s) && !a.hasOwnProperty(s) && (c[s] = t[s]);
		if (e && e.defaultProps) for (s in t = e.defaultProps, t) c[s] === void 0 && (c[s] = t[s]);
		return {
			$$typeof: n,
			type: e,
			key: l,
			ref: u,
			props: c,
			_owner: i.current
		};
	}
	e.jsx = o, e.jsxs = o;
})), $ = (/* @__PURE__ */ o(((e, t) => {
	t.exports = Kg();
})))(), qg = {
	idle: "准备好了",
	waiting: "正在等待第一段",
	streaming: "正在输出",
	stopped: "已停止",
	error: "连接中断",
	done: "输出完成"
}, Jg = {
	idle: "选一个话题，开始观察回答怎样出现。",
	waiting: "尚未收到正文，现在也可以停止。",
	streaming: "正文会逐段出现，可以随时停止。",
	stopped: "已保留收到的文字。重新生成会从头开始。",
	error: "保留已收到的文字。重试将恢复模拟连接，并从头生成。",
	done: "本次输出结束，可以换个场景再试一次。"
};
function Yg() {
	let [e] = (0, g.useState)(() => new Hg(Gg)), t = (0, g.useSyncExternalStore)(e.subscribe, e.getSnapshot), [n, r] = (0, g.useState)("portfolio"), [i, a] = (0, g.useState)("normal"), [o, s] = (0, g.useState)(""), [c, l] = (0, g.useState)(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
	(0, g.useEffect)(() => {
		let e = matchMedia("(prefers-reduced-motion: reduce)"), t = () => l(e.matches);
		return e.addEventListener("change", t), () => e.removeEventListener("change", t);
	}, []);
	let u = t.phase === "waiting" || t.phase === "streaming";
	return (0, g.useEffect)(() => {
		let t = () => e.stop();
		return window.addEventListener("pagehide", t), () => {
			window.removeEventListener("pagehide", t), e.dispose();
		};
	}, [e]), (0, g.useEffect)(() => {
		s("");
	}, [t.attempt, t.phase]), /* @__PURE__ */ (0, $.jsx)(tu, {
		theme: { token: {
			motion: !c,
			colorPrimary: "#155f56",
			colorInfo: "#155f56",
			colorError: "#a52a32",
			borderRadius: 7,
			fontSize: 16,
			controlHeight: 44,
			fontFamily: "\"IBM Plex Sans\", \"Microsoft YaHei\", sans-serif"
		} },
		children: /* @__PURE__ */ (0, $.jsxs)("div", {
			className: "studio",
			children: [/* @__PURE__ */ (0, $.jsxs)("aside", {
				className: "controls",
				"aria-label": "演示设置",
				children: [
					/* @__PURE__ */ (0, $.jsx)("p", {
						className: "overline",
						children: "01 / 选择场景"
					}),
					/* @__PURE__ */ (0, $.jsx)("h2", { children: "先试一次正常输出。" }),
					/* @__PURE__ */ (0, $.jsx)("p", {
						className: "muted",
						children: "再切换到慢速或中断，看看界面如何回应。"
					}),
					/* @__PURE__ */ (0, $.jsx)("label", {
						htmlFor: "topic",
						children: "预设话题"
					}),
					/* @__PURE__ */ (0, $.jsx)(xg, {
						id: "topic",
						"aria-label": "预设话题",
						value: n,
						disabled: u,
						onChange: r,
						virtual: !1,
						options: [{
							value: "portfolio",
							label: "怎样整理个人项目主页？"
						}, {
							value: "form",
							label: "怎样设计一张报名表？"
						}]
					}),
					/* @__PURE__ */ (0, $.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, $.jsx)("legend", { children: "模拟连接" }), /* @__PURE__ */ (0, $.jsxs)(Vg.Group, {
						"aria-label": "模拟连接",
						value: i,
						disabled: u,
						onChange: (e) => a(e.target.value),
						children: [
							/* @__PURE__ */ (0, $.jsx)(Vg, {
								value: "normal",
								children: "正常输出"
							}),
							/* @__PURE__ */ (0, $.jsx)(Vg, {
								value: "slow",
								children: "慢速连接"
							}),
							/* @__PURE__ */ (0, $.jsx)(Vg, {
								value: "failure",
								children: "中途断开"
							})
						]
					})] }),
					/* @__PURE__ */ (0, $.jsxs)("div", {
						className: "primary-actions",
						children: [/* @__PURE__ */ (0, $.jsx)(Cg, {
							type: "primary",
							disabled: u,
							onClick: () => {
								e.start({
									topic: n,
									mode: i
								});
							},
							children: "开始演示"
						}), /* @__PURE__ */ (0, $.jsx)(Cg, {
							danger: !0,
							disabled: !u,
							onClick: () => e.stop(),
							children: "停止输出"
						})]
					}),
					/* @__PURE__ */ (0, $.jsx)(Cg, {
						type: "text",
						onClick: () => {
							e.reset(), s("");
						},
						children: "清空本次内容"
					}),
					/* @__PURE__ */ (0, $.jsxs)("div", {
						className: "experiment-tip",
						children: [/* @__PURE__ */ (0, $.jsx)("span", { children: "可以这样试" }), /* @__PURE__ */ (0, $.jsx)("p", { children: "选择“中途断开”，等待错误出现，再点击“恢复连接并重试”。旧文字会清空，新尝试独立开始。" })]
					})
				]
			}), /* @__PURE__ */ (0, $.jsxs)("section", {
				className: "output",
				"aria-labelledby": "output-title",
				children: [
					/* @__PURE__ */ (0, $.jsxs)("div", {
						className: "output-heading",
						children: [/* @__PURE__ */ (0, $.jsxs)("div", { children: [/* @__PURE__ */ (0, $.jsx)("p", {
							className: "overline",
							children: "02 / 观察过程"
						}), /* @__PURE__ */ (0, $.jsx)("h2", {
							id: "output-title",
							children: "回答工作区"
						})] }), /* @__PURE__ */ (0, $.jsxs)("span", {
							className: "attempt",
							children: ["尝试 ", t.attempt.toString().padStart(2, "0")]
						})]
					}),
					/* @__PURE__ */ (0, $.jsxs)("div", {
						className: "status-line",
						role: "status",
						"aria-live": "polite",
						"aria-atomic": "true",
						"data-phase": t.phase,
						children: [
							/* @__PURE__ */ (0, $.jsx)("span", {
								className: `status-dot ${u ? "active" : ""}`,
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, $.jsx)("strong", { children: qg[t.phase] }),
							/* @__PURE__ */ (0, $.jsx)("span", { children: Jg[t.phase] })
						]
					}),
					/* @__PURE__ */ (0, $.jsxs)("div", {
						className: "answer",
						"data-testid": "answer",
						tabIndex: 0,
						"aria-label": "预设回答正文",
						"aria-busy": u,
						children: [t.text ? /* @__PURE__ */ (0, $.jsx)("p", { children: t.text }) : /* @__PURE__ */ (0, $.jsxs)("div", {
							className: "empty",
							children: [
								/* @__PURE__ */ (0, $.jsx)("span", {
									"aria-hidden": "true",
									children: "Aa"
								}),
								/* @__PURE__ */ (0, $.jsx)("p", { children: t.phase === "idle" ? "一段回答，也是一串需要处理的状态。" : t.phase === "stopped" ? "已在收到正文前停止。" : "等待第一段文字……" }),
								/* @__PURE__ */ (0, $.jsx)("small", { children: "预设文本 · 本地模拟" })
							]
						}), t.phase === "streaming" && /* @__PURE__ */ (0, $.jsx)("span", {
							className: "cursor",
							"aria-hidden": "true"
						})]
					}),
					(t.phase === "error" || t.phase === "stopped") && /* @__PURE__ */ (0, $.jsxs)("div", {
						className: "recovery",
						children: [/* @__PURE__ */ (0, $.jsx)(yc, {
							type: t.phase === "error" ? "error" : "info",
							showIcon: !0,
							title: t.phase === "error" ? "本次模拟在收到部分文字后中断" : "本次输出已由你停止",
							description: "重新开始不会续写旧内容，也不会自动重复提交。"
						}), /* @__PURE__ */ (0, $.jsx)(Cg, {
							onClick: () => {
								e.retry() && a("normal");
							},
							children: t.phase === "error" ? "恢复连接并重试" : "重新生成"
						})]
					}),
					/* @__PURE__ */ (0, $.jsxs)("div", {
						className: "output-footer",
						children: [/* @__PURE__ */ (0, $.jsxs)("span", { children: [
							Array.from(t.text).length,
							" 字符",
							/* @__PURE__ */ (0, $.jsx)("span", {
								className: "muted",
								children: " · 仅统计本次已显示内容"
							})
						] }), /* @__PURE__ */ (0, $.jsx)(Cg, {
							disabled: !t.text || u,
							onClick: async () => {
								try {
									await navigator.clipboard.writeText(t.text), s("已复制");
								} catch {
									s("复制不可用，可在正文中选择文字复制");
								}
							},
							children: "复制文字"
						})]
					}),
					/* @__PURE__ */ (0, $.jsx)("p", {
						className: "copy-status",
						role: "status",
						children: o
					})
				]
			})]
		})
	});
}
// src/main.tsx
(0, Xe.createRoot)(document.getElementById("app")).render(/* @__PURE__ */ (0, $.jsx)(Yg, {}));
