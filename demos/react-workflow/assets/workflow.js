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
	var z = Object.assign, B;
	function V(e) {
		if (B === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			B = t && t[1] || "";
		}
		return "\n" + B + e;
	}
	var H = !1;
	function U(e, t) {
		if (!e || H) return "";
		H = !0;
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
			H = !1, Error.prepareStackTrace = n;
		}
		return (e = e ? e.displayName || e.name : "") ? V(e) : "";
	}
	function W(e) {
		switch (e.tag) {
			case 5: return V(e.type);
			case 16: return V("Lazy");
			case 13: return V("Suspense");
			case 19: return V("SuspenseList");
			case 0:
			case 2:
			case 15: return e = U(e.type, !1), e;
			case 11: return e = U(e.type.render, !1), e;
			case 1: return e = U(e.type, !0), e;
			default: return "";
		}
	}
	function ee(e) {
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
			case P: return t = e.displayName || null, t === null ? ee(e.type) || "Memo" : t;
			case F:
				t = e._payload, e = e._init;
				try {
					return ee(e(t));
				} catch {}
		}
		return null;
	}
	function te(e) {
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
			case 16: return ee(t);
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
	function ne(e) {
		switch (typeof e) {
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function re(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function ie(e) {
		var t = re(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
	function ae(e) {
		e._valueTracker ||= ie(e);
	}
	function G(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = re(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	function K(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	function oe(e, t) {
		var n = t.checked;
		return z({}, t, {
			defaultChecked: void 0,
			defaultValue: void 0,
			value: void 0,
			checked: n ?? e._wrapperState.initialChecked
		});
	}
	function se(e, t) {
		var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked == null ? t.defaultChecked : t.checked;
		n = ne(t.value == null ? n : t.value), e._wrapperState = {
			initialChecked: r,
			initialValue: n,
			controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null
		};
	}
	function ce(e, t) {
		t = t.checked, t != null && S(e, "checked", t, !1);
	}
	function q(e, t) {
		ce(e, t);
		var n = ne(t.value), r = t.type;
		if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
		else if (r === "submit" || r === "reset") {
			e.removeAttribute("value");
			return;
		}
		t.hasOwnProperty("value") ? ue(e, t.type, n) : t.hasOwnProperty("defaultValue") && ue(e, t.type, ne(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
	}
	function le(e, t, n) {
		if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
			var r = t.type;
			if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
			t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
		}
		n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
	}
	function ue(e, t, n) {
		(t !== "number" || K(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
	}
	var de = Array.isArray;
	function fe(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + ne(n), t = null, i = 0; i < e.length; i++) {
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
				if (de(n)) {
					if (1 < n.length) throw Error(r(93));
					n = n[0];
				}
				t = n;
			}
			t ??= "", n = t;
		}
		e._wrapperState = { initialValue: ne(n) };
	}
	function J(e, t) {
		var n = ne(t.value), r = ne(t.defaultValue);
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
	}, xe = [
		"Webkit",
		"ms",
		"Moz",
		"O"
	];
	Object.keys(be).forEach(function(e) {
		xe.forEach(function(t) {
			t = t + e.charAt(0).toUpperCase() + e.substring(1), be[t] = be[e];
		});
	});
	function Se(e, t, n) {
		return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || be.hasOwnProperty(e) && be[e] ? ("" + t).trim() : t + "px";
	}
	function Ce(e, t) {
		for (var n in e = e.style, t) if (t.hasOwnProperty(n)) {
			var r = n.indexOf("--") === 0, i = Se(n, t[n], r);
			n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : e[n] = i;
		}
	}
	var X = z({ menuitem: !0 }, {
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
			if (X[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(r(137, e));
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
		if (e = Ai(e)) {
			if (typeof Oe != "function") throw Error(r(280));
			var t = e.stateNode;
			t && (t = Mi(t), Oe(e.stateNode, e.type, t));
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
		var i = Mi(n);
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
	function xt(e) {
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
	function St(e, t) {
		var n = e.pendingLanes;
		if (n === 0) return 0;
		var r = 0, i = e.suspendedLanes, a = e.pingedLanes, o = n & 268435455;
		if (o !== 0) {
			var s = o & ~i;
			s === 0 ? (a &= o, a !== 0 && (r = xt(a))) : r = xt(s);
		} else o = n & ~i, o === 0 ? a !== 0 && (r = xt(a)) : r = xt(o);
		if (r === 0) return 0;
		if (t !== 0 && t !== r && (t & i) === 0 && (i = r & -r, a = t & -t, i >= a || i === 16 && a & 4194240)) return t;
		if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t;) n = 31 - ht(t), i = 1 << n, r |= e[n], t &= ~i;
		return r;
	}
	function Ct(e, t) {
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
	function wt(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes; 0 < a;) {
			var o = 31 - ht(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Ct(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
	}
	function Tt(e) {
		return e = e.pendingLanes & -1073741825, e === 0 ? e & 1073741824 ? 1073741824 : 0 : e;
	}
	function Et() {
		var e = yt;
		return yt <<= 1, !(yt & 4194240) && (yt = 64), e;
	}
	function Dt(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function Z(e, t, n) {
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
		}, t !== null && (t = Ai(t), t !== null && Nt(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
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
		var t = ki(e.target);
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
			} else return t = Ai(n), t !== null && Nt(t), e.blockedOn = n, !1;
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
			if (i === null) ti(e, t, r, sn, n), Kt(e, r);
			else if (Jt(i, e, t, n, r)) r.stopPropagation();
			else if (Kt(e, r), t & 4 && -1 < Gt.indexOf(e)) {
				for (; i !== null;) {
					var a = Ai(i);
					if (a !== null && Mt(a), a = cn(e, t, n, r), a === null && ti(e, t, r, sn, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else ti(e, t, r, null, n);
		}
	}
	var sn = null;
	function cn(e, t, n, r) {
		if (sn = null, e = De(r), e = ki(e), e !== null) {
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
	var Q = null, un = null, dn = null;
	function fn() {
		if (dn) return dn;
		var e, t = un, n = t.length, r, i = "value" in Q ? Q.value : Q.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return dn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function pn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function mn() {
		return !0;
	}
	function hn() {
		return !1;
	}
	function gn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? mn : hn, this.isPropagationStopped = hn, this;
		}
		return z(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = mn);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = mn);
			},
			persist: function() {},
			isPersistent: mn
		}), t;
	}
	var _n = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, vn = gn(_n), yn = z({}, _n, {
		view: 0,
		detail: 0
	}), bn = gn(yn), xn, Sn, Cn, wn = z({}, yn, {
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
		getModifierState: Fn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== Cn && (Cn && e.type === "mousemove" ? (xn = e.screenX - Cn.screenX, Sn = e.screenY - Cn.screenY) : Sn = xn = 0, Cn = e), xn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : Sn;
		}
	}), Tn = gn(wn), En = gn(z({}, wn, { dataTransfer: 0 })), Dn = gn(z({}, yn, { relatedTarget: 0 })), On = gn(z({}, _n, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), kn = gn(z({}, _n, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), An = gn(z({}, _n, { data: 0 })), jn = {
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
	}, Mn = {
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
	}, Nn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Pn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = Nn[e]) ? !!t[e] : !1;
	}
	function Fn() {
		return Pn;
	}
	var In = gn(z({}, yn, {
		key: function(e) {
			if (e.key) {
				var t = jn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = pn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Mn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: Fn,
		charCode: function(e) {
			return e.type === "keypress" ? pn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? pn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), Ln = gn(z({}, wn, {
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
	})), Rn = gn(z({}, yn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Fn
	})), zn = gn(z({}, _n, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Bn = gn(z({}, wn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), Vn = [
		9,
		13,
		27,
		32
	], Hn = c && "CompositionEvent" in window, Un = null;
	c && "documentMode" in document && (Un = document.documentMode);
	var Wn = c && "TextEvent" in window && !Un, Gn = c && (!Hn || Un && 8 < Un && 11 >= Un), Kn = " ", qn = !1;
	function Jn(e, t) {
		switch (e) {
			case "keyup": return Vn.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function Yn(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var Xn = !1;
	function Zn(e, t) {
		switch (e) {
			case "compositionend": return Yn(t);
			case "keypress": return t.which === 32 ? (qn = !0, Kn) : null;
			case "textInput": return e = t.data, e === Kn && qn ? null : e;
			default: return null;
		}
	}
	function Qn(e, t) {
		if (Xn) return e === "compositionend" || !Hn && Jn(e, t) ? (e = fn(), dn = un = Q = null, Xn = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return Gn && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var $n = {
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
	function er(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!$n[e.type] : t === "textarea";
	}
	function tr(e, t, n, r) {
		Me(r), t = ri(t, "onChange"), 0 < t.length && (n = new vn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var nr = null, rr = null;
	function ir(e) {
		Yr(e, 0);
	}
	function ar(e) {
		if (G(ji(e))) return e;
	}
	function or(e, t) {
		if (e === "change") return t;
	}
	var sr = !1;
	if (c) {
		var cr;
		if (c) {
			var lr = "oninput" in document;
			if (!lr) {
				var ur = document.createElement("div");
				ur.setAttribute("oninput", "return;"), lr = typeof ur.oninput == "function";
			}
			cr = lr;
		} else cr = !1;
		sr = cr && (!document.documentMode || 9 < document.documentMode);
	}
	function dr() {
		nr && (nr.detachEvent("onpropertychange", fr), rr = nr = null);
	}
	function fr(e) {
		if (e.propertyName === "value" && ar(rr)) {
			var t = [];
			tr(t, rr, e, De(e)), Le(ir, t);
		}
	}
	function pr(e, t, n) {
		e === "focusin" ? (dr(), nr = t, rr = n, nr.attachEvent("onpropertychange", fr)) : e === "focusout" && dr();
	}
	function mr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return ar(rr);
	}
	function hr(e, t) {
		if (e === "click") return ar(t);
	}
	function gr(e, t) {
		if (e === "input" || e === "change") return ar(t);
	}
	function _r(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var vr = typeof Object.is == "function" ? Object.is : _r;
	function yr(e, t) {
		if (vr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!l.call(t, i) || !vr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function br(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function xr(e, t) {
		var n = br(e);
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
			n = br(n);
		}
	}
	function Sr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Sr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Cr() {
		for (var e = window, t = K(); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = K(e.document);
		}
		return t;
	}
	function wr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	function Tr(e) {
		var t = Cr(), n = e.focusedElem, r = e.selectionRange;
		if (t !== n && n && n.ownerDocument && Sr(n.ownerDocument.documentElement, n)) {
			if (r !== null && wr(n)) {
				if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
				else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
					e = e.getSelection();
					var i = n.textContent.length, a = Math.min(r.start, i);
					r = r.end === void 0 ? a : Math.min(r.end, i), !e.extend && a > r && (i = r, r = a, a = i), i = xr(n, a);
					var o = xr(n, r);
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
	var Er = c && "documentMode" in document && 11 >= document.documentMode, Dr = null, Or = null, kr = null, Ar = !1;
	function jr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Ar || Dr == null || Dr !== K(r) || (r = Dr, "selectionStart" in r && wr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), kr && yr(kr, r) || (kr = r, r = ri(Or, "onSelect"), 0 < r.length && (t = new vn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Dr)));
	}
	function Mr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Nr = {
		animationend: Mr("Animation", "AnimationEnd"),
		animationiteration: Mr("Animation", "AnimationIteration"),
		animationstart: Mr("Animation", "AnimationStart"),
		transitionend: Mr("Transition", "TransitionEnd")
	}, Pr = {}, Fr = {};
	c && (Fr = document.createElement("div").style, "AnimationEvent" in window || (delete Nr.animationend.animation, delete Nr.animationiteration.animation, delete Nr.animationstart.animation), "TransitionEvent" in window || delete Nr.transitionend.transition);
	function Ir(e) {
		if (Pr[e]) return Pr[e];
		if (!Nr[e]) return e;
		var t = Nr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Fr) return Pr[e] = t[n];
		return e;
	}
	var Lr = Ir("animationend"), Rr = Ir("animationiteration"), zr = Ir("animationstart"), Br = Ir("transitionend"), Vr = /* @__PURE__ */ new Map(), Hr = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	function Ur(e, t) {
		Vr.set(e, t), o(t, [e]);
	}
	for (var Wr = 0; Wr < Hr.length; Wr++) {
		var Gr = Hr[Wr];
		Ur(Gr.toLowerCase(), "on" + (Gr[0].toUpperCase() + Gr.slice(1)));
	}
	Ur(Lr, "onAnimationEnd"), Ur(Rr, "onAnimationIteration"), Ur(zr, "onAnimationStart"), Ur("dblclick", "onDoubleClick"), Ur("focusin", "onFocus"), Ur("focusout", "onBlur"), Ur(Br, "onTransitionEnd"), s("onMouseEnter", ["mouseout", "mouseover"]), s("onMouseLeave", ["mouseout", "mouseover"]), s("onPointerEnter", ["pointerout", "pointerover"]), s("onPointerLeave", ["pointerout", "pointerover"]), o("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), o("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), o("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), o("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), o("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), o("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var Kr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), qr = new Set("cancel close invalid load scroll toggle".split(" ").concat(Kr));
	function Jr(e, t, n) {
		var r = e.type || "unknown-event";
		e.currentTarget = n, Je(r, t, void 0, e), e.currentTarget = null;
	}
	function Yr(e, t) {
		t = !!(t & 4);
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					Jr(i, s, l), a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					Jr(i, s, l), a = c;
				}
			}
		}
		if (We) throw e = Ge, We = !1, Ge = null, e;
	}
	function Xr(e, t) {
		var n = t[Ei];
		n === void 0 && (n = t[Ei] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (ei(t, e, 2, !1), n.add(r));
	}
	function Zr(e, t, n) {
		var r = 0;
		t && (r |= 4), ei(n, e, r, t);
	}
	var Qr = "_reactListening" + Math.random().toString(36).slice(2);
	function $r(e) {
		if (!e[Qr]) {
			e[Qr] = !0, i.forEach(function(t) {
				t !== "selectionchange" && (qr.has(t) || Zr(t, !1, e), Zr(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[Qr] || (t[Qr] = !0, Zr("selectionchange", !1, t));
		}
	}
	function ei(e, t, n, r) {
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
	function ti(e, t, n, r, i) {
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
					if (o = ki(s), o === null) return;
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
				var s = Vr.get(e);
				if (s !== void 0) {
					var c = vn, l = e;
					switch (e) {
						case "keypress": if (pn(n) === 0) break a;
						case "keydown":
						case "keyup":
							c = In;
							break;
						case "focusin":
							l = "focus", c = Dn;
							break;
						case "focusout":
							l = "blur", c = Dn;
							break;
						case "beforeblur":
						case "afterblur":
							c = Dn;
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
							c = Tn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							c = En;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							c = Rn;
							break;
						case Lr:
						case Rr:
						case zr:
							c = On;
							break;
						case Br:
							c = zn;
							break;
						case "scroll":
							c = bn;
							break;
						case "wheel":
							c = Bn;
							break;
						case "copy":
						case "cut":
						case "paste":
							c = kn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup": c = Ln;
					}
					var u = !!(t & 4), d = !u && e === "scroll", f = u ? s === null ? null : s + "Capture" : s;
					u = [];
					for (var p = r, m; p !== null;) {
						m = p;
						var h = m.stateNode;
						if (m.tag === 5 && h !== null && (m = h, f !== null && (h = Re(p, f), h != null && u.push(ni(p, h, m)))), d) break;
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
					if (s = e === "mouseover" || e === "pointerover", c = e === "mouseout" || e === "pointerout", s && n !== Ee && (l = n.relatedTarget || n.fromElement) && (ki(l) || l[Ti])) break a;
					if ((c || s) && (s = i.window === i ? i : (s = i.ownerDocument) ? s.defaultView || s.parentWindow : window, c ? (l = n.relatedTarget || n.toElement, c = r, l = l ? ki(l) : null, l !== null && (d = Ye(l), l !== d || l.tag !== 5 && l.tag !== 6) && (l = null)) : (c = null, l = r), c !== l)) {
						if (u = Tn, h = "onMouseLeave", f = "onMouseEnter", p = "mouse", (e === "pointerout" || e === "pointerover") && (u = Ln, h = "onPointerLeave", f = "onPointerEnter", p = "pointer"), d = c == null ? s : ji(c), m = l == null ? s : ji(l), s = new u(h, p + "leave", c, n, i), s.target = d, s.relatedTarget = m, h = null, ki(i) === r && (u = new u(f, p + "enter", l, n, i), u.target = m, u.relatedTarget = d, h = u), d = h, c && l) b: {
							for (u = c, f = l, p = 0, m = u; m; m = ii(m)) p++;
							for (m = 0, h = f; h; h = ii(h)) m++;
							for (; 0 < p - m;) u = ii(u), p--;
							for (; 0 < m - p;) f = ii(f), m--;
							for (; p--;) {
								if (u === f || f !== null && u === f.alternate) break b;
								u = ii(u), f = ii(f);
							}
							u = null;
						}
						else u = null;
						c !== null && ai(o, s, c, u, !1), l !== null && d !== null && ai(o, d, l, u, !0);
					}
				}
				a: {
					if (s = r ? ji(r) : window, c = s.nodeName && s.nodeName.toLowerCase(), c === "select" || c === "input" && s.type === "file") var g = or;
					else if (er(s)) {
						if (sr) g = gr;
						else {
							g = mr;
							var _ = pr;
						}
					} else (c = s.nodeName) && c.toLowerCase() === "input" && (s.type === "checkbox" || s.type === "radio") && (g = hr);
					if (g &&= g(e, r)) {
						tr(o, g, n, i);
						break a;
					}
					_ && _(e, s, r), e === "focusout" && (_ = s._wrapperState) && _.controlled && s.type === "number" && ue(s, "number", s.value);
				}
				switch (_ = r ? ji(r) : window, e) {
					case "focusin":
						(er(_) || _.contentEditable === "true") && (Dr = _, Or = r, kr = null);
						break;
					case "focusout":
						kr = Or = Dr = null;
						break;
					case "mousedown":
						Ar = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Ar = !1, jr(o, n, i);
						break;
					case "selectionchange": if (Er) break;
					case "keydown":
					case "keyup": jr(o, n, i);
				}
				var v;
				if (Hn) b: {
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
				else Xn ? Jn(e, n) && (y = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (y = "onCompositionStart");
				y && (Gn && n.locale !== "ko" && (Xn || y !== "onCompositionStart" ? y === "onCompositionEnd" && Xn && (v = fn()) : (Q = i, un = "value" in Q ? Q.value : Q.textContent, Xn = !0)), _ = ri(r, y), 0 < _.length && (y = new An(y, e, null, n, i), o.push({
					event: y,
					listeners: _
				}), v ? y.data = v : (v = Yn(n), v !== null && (y.data = v)))), (v = Wn ? Zn(e, n) : Qn(e, n)) && (r = ri(r, "onBeforeInput"), 0 < r.length && (i = new An("onBeforeInput", "beforeinput", null, n, i), o.push({
					event: i,
					listeners: r
				}), i.data = v));
			}
			Yr(o, t);
		});
	}
	function ni(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function ri(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			i.tag === 5 && a !== null && (i = a, a = Re(e, n), a != null && r.unshift(ni(e, a, i)), a = Re(e, t), a != null && r.push(ni(e, a, i))), e = e.return;
		}
		return r;
	}
	function ii(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5);
		return e || null;
	}
	function ai(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (c !== null && c === r) break;
			s.tag === 5 && l !== null && (s = l, i ? (c = Re(n, a), c != null && o.unshift(ni(n, c, s))) : i || (c = Re(n, a), c != null && o.push(ni(n, c, s)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var oi = /\r\n?/g, si = /\u0000|\uFFFD/g;
	function ci(e) {
		return (typeof e == "string" ? e : "" + e).replace(oi, "\n").replace(si, "");
	}
	function li(e, t, n) {
		if (t = ci(t), ci(e) !== t && n) throw Error(r(425));
	}
	function ui() {}
	var di = null, fi = null;
	function pi(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var mi = typeof setTimeout == "function" ? setTimeout : void 0, hi = typeof clearTimeout == "function" ? clearTimeout : void 0, gi = typeof Promise == "function" ? Promise : void 0, _i = typeof queueMicrotask == "function" ? queueMicrotask : gi === void 0 ? mi : function(e) {
		return gi.resolve(null).then(e).catch(vi);
	};
	function vi(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function yi(e, t) {
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
	function bi(e) {
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
	function xi(e) {
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
	var Si = Math.random().toString(36).slice(2), Ci = "__reactFiber$" + Si, wi = "__reactProps$" + Si, Ti = "__reactContainer$" + Si, Ei = "__reactEvents$" + Si, Di = "__reactListeners$" + Si, Oi = "__reactHandles$" + Si;
	function ki(e) {
		var t = e[Ci];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[Ti] || n[Ci]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = xi(e); e !== null;) {
					if (n = e[Ci]) return n;
					e = xi(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function Ai(e) {
		return e = e[Ci] || e[Ti], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
	}
	function ji(e) {
		if (e.tag === 5 || e.tag === 6) return e.stateNode;
		throw Error(r(33));
	}
	function Mi(e) {
		return e[wi] || null;
	}
	var Ni = [], Pi = -1;
	function Fi(e) {
		return { current: e };
	}
	function Ii(e) {
		0 > Pi || (e.current = Ni[Pi], Ni[Pi] = null, Pi--);
	}
	function Li(e, t) {
		Pi++, Ni[Pi] = e.current, e.current = t;
	}
	var Ri = {}, zi = Fi(Ri), Bi = Fi(!1), Vi = Ri;
	function Hi(e, t) {
		var n = e.type.contextTypes;
		if (!n) return Ri;
		var r = e.stateNode;
		if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
		var i = {}, a;
		for (a in n) i[a] = t[a];
		return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = i), i;
	}
	function Ui(e) {
		return e = e.childContextTypes, e != null;
	}
	function Wi() {
		Ii(Bi), Ii(zi);
	}
	function Gi(e, t, n) {
		if (zi.current !== Ri) throw Error(r(168));
		Li(zi, t), Li(Bi, n);
	}
	function Ki(e, t, n) {
		var i = e.stateNode;
		if (t = t.childContextTypes, typeof i.getChildContext != "function") return n;
		for (var a in i = i.getChildContext(), i) if (!(a in t)) throw Error(r(108, te(e) || "Unknown", a));
		return z({}, n, i);
	}
	function qi(e) {
		return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Ri, Vi = zi.current, Li(zi, e), Li(Bi, Bi.current), !0;
	}
	function Ji(e, t, n) {
		var i = e.stateNode;
		if (!i) throw Error(r(169));
		n ? (e = Ki(e, t, Vi), i.__reactInternalMemoizedMergedChildContext = e, Ii(Bi), Ii(zi), Li(zi, e)) : Ii(Bi), Li(Bi, n);
	}
	var Yi = null, Xi = !1, Zi = !1;
	function Qi(e) {
		Yi === null ? Yi = [e] : Yi.push(e);
	}
	function $i(e) {
		Xi = !0, Qi(e);
	}
	function ea() {
		if (!Zi && Yi !== null) {
			Zi = !0;
			var e = 0, t = At;
			try {
				var n = Yi;
				for (At = 1; e < n.length; e++) {
					var r = n[e];
					do
						r = r(!0);
					while (r !== null);
				}
				Yi = null, Xi = !1;
			} catch (t) {
				throw Yi !== null && (Yi = Yi.slice(e + 1)), tt(st, ea), t;
			} finally {
				At = t, Zi = !1;
			}
		}
		return null;
	}
	var ta = [], na = 0, ra = null, ia = 0, aa = [], oa = 0, sa = null, ca = 1, la = "";
	function ua(e, t) {
		ta[na++] = ia, ta[na++] = ra, ra = e, ia = t;
	}
	function da(e, t, n) {
		aa[oa++] = ca, aa[oa++] = la, aa[oa++] = sa, sa = e;
		var r = ca;
		e = la;
		var i = 32 - ht(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - ht(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, ca = 1 << 32 - ht(t) + i | n << i | r, la = a + e;
		} else ca = 1 << a | n << i | r, la = e;
	}
	function fa(e) {
		e.return !== null && (ua(e, 1), da(e, 1, 0));
	}
	function pa(e) {
		for (; e === ra;) ra = ta[--na], ta[na] = null, ia = ta[--na], ta[na] = null;
		for (; e === sa;) sa = aa[--oa], aa[oa] = null, la = aa[--oa], aa[oa] = null, ca = aa[--oa], aa[oa] = null;
	}
	var ma = null, ha = null, ga = !1, _a = null;
	function va(e, t) {
		var n = Kl(5, null, null, 0);
		n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
	}
	function ya(e, t) {
		switch (e.tag) {
			case 5:
				var n = e.type;
				return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null && (e.stateNode = t, ma = e, ha = bi(t.firstChild), !0);
			case 6: return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null && (e.stateNode = t, ma = e, ha = null, !0);
			case 13: return t = t.nodeType === 8 ? t : null, t !== null && (n = sa === null ? null : {
				id: ca,
				overflow: la
			}, e.memoizedState = {
				dehydrated: t,
				treeContext: n,
				retryLane: 1073741824
			}, n = Kl(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, ma = e, ha = null, !0);
			default: return !1;
		}
	}
	function ba(e) {
		return !!(e.mode & 1) && !(e.flags & 128);
	}
	function xa(e) {
		if (ga) {
			var t = ha;
			if (t) {
				var n = t;
				if (!ya(e, t)) {
					if (ba(e)) throw Error(r(418));
					t = bi(n.nextSibling);
					var i = ma;
					t && ya(e, t) ? va(i, n) : (e.flags = e.flags & -4097 | 2, ga = !1, ma = e);
				}
			} else {
				if (ba(e)) throw Error(r(418));
				e.flags = e.flags & -4097 | 2, ga = !1, ma = e;
			}
		}
	}
	function Sa(e) {
		for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;) e = e.return;
		ma = e;
	}
	function Ca(e) {
		if (e !== ma) return !1;
		if (!ga) return Sa(e), ga = !0, !1;
		var t;
		if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !pi(e.type, e.memoizedProps)), t &&= ha) {
			if (ba(e)) throw wa(), Error(r(418));
			for (; t;) va(e, t), t = bi(t.nextSibling);
		}
		if (Sa(e), e.tag === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(r(317));
			a: {
				for (e = e.nextSibling, t = 0; e;) {
					if (e.nodeType === 8) {
						var n = e.data;
						if (n === "/$") {
							if (t === 0) {
								ha = bi(e.nextSibling);
								break a;
							}
							t--;
						} else n !== "$" && n !== "$!" && n !== "$?" || t++;
					}
					e = e.nextSibling;
				}
				ha = null;
			}
		} else ha = ma ? bi(e.stateNode.nextSibling) : null;
		return !0;
	}
	function wa() {
		for (var e = ha; e;) e = bi(e.nextSibling);
	}
	function Ta() {
		ha = ma = null, ga = !1;
	}
	function Ea(e) {
		_a === null ? _a = [e] : _a.push(e);
	}
	var Da = C.ReactCurrentBatchConfig;
	function Oa(e, t, n) {
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
	function ka(e, t) {
		throw e = Object.prototype.toString.call(t), Error(r(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
	}
	function Aa(e) {
		var t = e._init;
		return t(e._payload);
	}
	function ja(e) {
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
			return e = Yl(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 2, n) : (r = r.index, r < n ? (t.flags |= 2, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 2), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = $l(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === E ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === F && Aa(i) === t.type) ? (r = a(t, n.props), r.ref = Oa(e, t, n), r.return = e, r) : (r = Xl(n.type, n.key, n.props, null, e.mode, r), r.ref = Oa(e, t, n), r.return = e, r);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = eu(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = Zl(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number") return t = $l("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case w: return n = Xl(t.type, t.key, t.props, null, e.mode, n), n.ref = Oa(e, null, t), n.return = e, n;
					case T: return t = eu(t, e.mode, n), t.return = e, t;
					case F:
						var r = t._init;
						return f(e, r(t._payload), n);
				}
				if (de(t) || R(t)) return t = Zl(t, e.mode, n, null), t.return = e, t;
				ka(e, t);
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
				if (de(n) || R(n)) return i === null ? d(e, t, n, r, null) : null;
				ka(e, n);
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
				if (de(r) || R(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				ka(t, r);
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
			if (h === s.length) return n(r, d), ga && ua(r, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(r, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return ga && ua(r, h), l;
			}
			for (d = i(r, d); h < s.length; h++) g = m(d, r, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(r, e);
			}), ga && ua(r, h), l;
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
			if (v.done) return n(a, h), ga && ua(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return ga && ua(a, g), u;
			}
			for (h = i(a, h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), ga && ua(a, g), u;
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
									} else if (l.elementType === c || typeof c == "object" && c && c.$$typeof === F && Aa(c) === l.type) {
										n(e, l.sibling), r = a(l, i.props), r.ref = Oa(e, l, i), r.return = e, e = r;
										break a;
									}
									n(e, l);
									break;
								}
								t(e, l), l = l.sibling;
							}
							i.type === E ? (r = Zl(i.props.children, e.mode, o, i.key), r.return = e, e = r) : (o = Xl(i.type, i.key, i.props, null, e.mode, o), o.ref = Oa(e, r, i), o.return = e, e = o);
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
							r = eu(i, e.mode, o), r.return = e, e = r;
						}
						return s(e);
					case F: return l = i._init, _(e, r, l(i._payload), o);
				}
				if (de(i)) return h(e, r, i, o);
				if (R(i)) return g(e, r, i, o);
				ka(e, i);
			}
			return typeof i == "string" && i !== "" || typeof i == "number" ? (i = "" + i, r !== null && r.tag === 6 ? (n(e, r.sibling), r = a(r, i), r.return = e, e = r) : (n(e, r), r = $l(i, e.mode, o), r.return = e, e = r), s(e)) : n(e, r);
		}
		return _;
	}
	var Ma = ja(!0), Na = ja(!1), Pa = Fi(null), Fa = null, Ia = null, La = null;
	function Ra() {
		La = Ia = Fa = null;
	}
	function za(e) {
		var t = Pa.current;
		Ii(Pa), e._currentValue = t;
	}
	function Ba(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function Va(e, t) {
		Fa = e, La = Ia = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (js = !0), e.firstContext = null);
	}
	function Ha(e) {
		var t = e._currentValue;
		if (La !== e) {
			if (e = {
				context: e,
				memoizedValue: t,
				next: null
			}, Ia === null) {
				if (Fa === null) throw Error(r(308));
				Ia = e, Fa.dependencies = {
					lanes: 0,
					firstContext: e
				};
			} else Ia = Ia.next = e;
		}
		return t;
	}
	var Ua = null;
	function Wa(e) {
		Ua === null ? Ua = [e] : Ua.push(e);
	}
	function Ga(e, t, n, r) {
		var i = t.interleaved;
		return i === null ? (n.next = n, Wa(t)) : (n.next = i.next, i.next = n), t.interleaved = n, Ka(e, r);
	}
	function Ka(e, t) {
		e.lanes |= t;
		var n = e.alternate;
		for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null;) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
		return n.tag === 3 ? n.stateNode : null;
	}
	var qa = !1;
	function Ja(e) {
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
	function Ya(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			effects: e.effects
		});
	}
	function Xa(e, t) {
		return {
			eventTime: e,
			lane: t,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function Za(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, Bc & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, Ka(e, n);
		}
		return i = r.interleaved, i === null ? (t.next = t, Wa(r)) : (t.next = i.next, i.next = t), r.interleaved = t, Ka(e, n);
	}
	function Qa(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194240)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, kt(e, n);
		}
	}
	function $a(e, t) {
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
	function eo(e, t, n, r) {
		var i = e.updateQueue;
		qa = !1;
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
							case 2: qa = !0;
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
			Jc |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function to(e, t, n) {
		if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
			var i = e[t], a = i.callback;
			if (a !== null) {
				if (i.callback = null, i = n, typeof a != "function") throw Error(r(191, a));
				a.call(i);
			}
		}
	}
	var no = {}, ro = Fi(no), io = Fi(no), ao = Fi(no);
	function oo(e) {
		if (e === no) throw Error(r(174));
		return e;
	}
	function so(e, t) {
		switch (Li(ao, t), Li(io, e), Li(ro, no), e = t.nodeType, e) {
			case 9:
			case 11:
				t = (t = t.documentElement) ? t.namespaceURI : ge(null, "");
				break;
			default: e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = ge(t, e);
		}
		Ii(ro), Li(ro, t);
	}
	function co() {
		Ii(ro), Ii(io), Ii(ao);
	}
	function lo(e) {
		oo(ao.current);
		var t = oo(ro.current), n = ge(t, e.type);
		t !== n && (Li(io, e), Li(ro, n));
	}
	function uo(e) {
		io.current === e && (Ii(ro), Ii(io));
	}
	var fo = Fi(0);
	function po(e) {
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
	var mo = [];
	function ho() {
		for (var e = 0; e < mo.length; e++) mo[e]._workInProgressVersionPrimary = null;
		mo.length = 0;
	}
	var go = C.ReactCurrentDispatcher, _o = C.ReactCurrentBatchConfig, vo = 0, yo = null, bo = null, xo = null, So = !1, Co = !1, wo = 0, To = 0;
	function Eo() {
		throw Error(r(321));
	}
	function Do(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!vr(e[n], t[n])) return !1;
		return !0;
	}
	function Oo(e, t, n, i, a, o) {
		if (vo = o, yo = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, go.current = e === null || e.memoizedState === null ? ds : fs, e = n(i, a), Co) {
			o = 0;
			do {
				if (Co = !1, wo = 0, 25 <= o) throw Error(r(301));
				o += 1, xo = bo = null, t.updateQueue = null, go.current = ps, e = n(i, a);
			} while (Co);
		}
		if (go.current = us, t = bo !== null && bo.next !== null, vo = 0, xo = bo = yo = null, So = !1, t) throw Error(r(300));
		return e;
	}
	function ko() {
		var e = wo !== 0;
		return wo = 0, e;
	}
	function Ao() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return xo === null ? yo.memoizedState = xo = e : xo = xo.next = e, xo;
	}
	function jo() {
		if (bo === null) {
			var e = yo.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = bo.next;
		var t = xo === null ? yo.memoizedState : xo.next;
		if (t !== null) xo = t, bo = e;
		else {
			if (e === null) throw Error(r(310));
			bo = e, e = {
				memoizedState: bo.memoizedState,
				baseState: bo.baseState,
				baseQueue: bo.baseQueue,
				queue: bo.queue,
				next: null
			}, xo === null ? yo.memoizedState = xo = e : xo = xo.next = e;
		}
		return xo;
	}
	function Mo(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function No(e) {
		var t = jo(), n = t.queue;
		if (n === null) throw Error(r(311));
		n.lastRenderedReducer = e;
		var i = bo, a = i.baseQueue, o = n.pending;
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
				if ((vo & d) === d) l !== null && (l = l.next = {
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
					l === null ? (c = l = f, s = i) : l = l.next = f, yo.lanes |= d, Jc |= d;
				}
				u = u.next;
			} while (u !== null && u !== o);
			l === null ? s = i : l.next = c, vr(i, t.memoizedState) || (js = !0), t.memoizedState = i, t.baseState = s, t.baseQueue = l, n.lastRenderedState = i;
		}
		if (e = n.interleaved, e !== null) {
			a = e;
			do
				o = a.lane, yo.lanes |= o, Jc |= o, a = a.next;
			while (a !== e);
		} else a === null && (n.lanes = 0);
		return [t.memoizedState, n.dispatch];
	}
	function Po(e) {
		var t = jo(), n = t.queue;
		if (n === null) throw Error(r(311));
		n.lastRenderedReducer = e;
		var i = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			vr(o, t.memoizedState) || (js = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, i];
	}
	function Fo() {}
	function Io(e, t) {
		var n = yo, i = jo(), a = t(), o = !vr(i.memoizedState, a);
		if (o && (i.memoizedState = a, js = !0), i = i.queue, Jo(zo.bind(null, n, i, e), [e]), i.getSnapshot !== t || o || xo !== null && xo.memoizedState.tag & 1) {
			if (n.flags |= 2048, Uo(9, Ro.bind(null, n, i, a, t), void 0, null), Vc === null) throw Error(r(349));
			vo & 30 || Lo(n, t, a);
		}
		return a;
	}
	function Lo(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = yo.updateQueue, t === null ? (t = {
			lastEffect: null,
			stores: null
		}, yo.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Ro(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Bo(t) && Vo(e);
	}
	function zo(e, t, n) {
		return n(function() {
			Bo(t) && Vo(e);
		});
	}
	function Bo(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !vr(e, n);
		} catch {
			return !0;
		}
	}
	function Vo(e) {
		var t = Ka(e, 1);
		t !== null && ml(t, e, 1, -1);
	}
	function Ho(e) {
		var t = Ao();
		return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = {
			pending: null,
			interleaved: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Mo,
			lastRenderedState: e
		}, t.queue = e, e = e.dispatch = os.bind(null, yo, e), [t.memoizedState, e];
	}
	function Uo(e, t, n, r) {
		return e = {
			tag: e,
			create: t,
			destroy: n,
			deps: r,
			next: null
		}, t = yo.updateQueue, t === null ? (t = {
			lastEffect: null,
			stores: null
		}, yo.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
	}
	function Wo() {
		return jo().memoizedState;
	}
	function Go(e, t, n, r) {
		var i = Ao();
		yo.flags |= e, i.memoizedState = Uo(1 | t, n, void 0, r === void 0 ? null : r);
	}
	function Ko(e, t, n, r) {
		var i = jo();
		r = r === void 0 ? null : r;
		var a = void 0;
		if (bo !== null) {
			var o = bo.memoizedState;
			if (a = o.destroy, r !== null && Do(r, o.deps)) {
				i.memoizedState = Uo(t, n, a, r);
				return;
			}
		}
		yo.flags |= e, i.memoizedState = Uo(1 | t, n, a, r);
	}
	function qo(e, t) {
		return Go(8390656, 8, e, t);
	}
	function Jo(e, t) {
		return Ko(2048, 8, e, t);
	}
	function Yo(e, t) {
		return Ko(4, 2, e, t);
	}
	function Xo(e, t) {
		return Ko(4, 4, e, t);
	}
	function Zo(e, t) {
		if (typeof t == "function") return e = e(), t(e), function() {
			t(null);
		};
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function Qo(e, t, n) {
		return n = n == null ? null : n.concat([e]), Ko(4, 4, Zo.bind(null, t, e), n);
	}
	function $o() {}
	function es(e, t) {
		var n = jo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return r !== null && t !== null && Do(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function ts(e, t) {
		var n = jo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return r !== null && t !== null && Do(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
	}
	function ns(e, t, n) {
		return vo & 21 ? (vr(n, t) || (n = Et(), yo.lanes |= n, Jc |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, js = !0), e.memoizedState = n);
	}
	function rs(e, t) {
		var n = At;
		At = n !== 0 && 4 > n ? n : 4, e(!0);
		var r = _o.transition;
		_o.transition = {};
		try {
			e(!1), t();
		} finally {
			At = n, _o.transition = r;
		}
	}
	function is() {
		return jo().memoizedState;
	}
	function as(e, t, n) {
		var r = pl(e);
		if (n = {
			lane: r,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, ss(e)) cs(t, n);
		else if (n = Ga(e, t, n, r), n !== null) {
			var i = fl();
			ml(n, e, r, i), ls(n, t, r);
		}
	}
	function os(e, t, n) {
		var r = pl(e), i = {
			lane: r,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (ss(e)) cs(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, vr(s, o)) {
					var c = t.interleaved;
					c === null ? (i.next = i, Wa(t)) : (i.next = c.next, c.next = i), t.interleaved = i;
					return;
				}
			} catch {}
			n = Ga(e, t, i, r), n !== null && (i = fl(), ml(n, e, r, i), ls(n, t, r));
		}
	}
	function ss(e) {
		var t = e.alternate;
		return e === yo || t !== null && t === yo;
	}
	function cs(e, t) {
		Co = So = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function ls(e, t, n) {
		if (n & 4194240) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, kt(e, n);
		}
	}
	var us = {
		readContext: Ha,
		useCallback: Eo,
		useContext: Eo,
		useEffect: Eo,
		useImperativeHandle: Eo,
		useInsertionEffect: Eo,
		useLayoutEffect: Eo,
		useMemo: Eo,
		useReducer: Eo,
		useRef: Eo,
		useState: Eo,
		useDebugValue: Eo,
		useDeferredValue: Eo,
		useTransition: Eo,
		useMutableSource: Eo,
		useSyncExternalStore: Eo,
		useId: Eo,
		unstable_isNewReconciler: !1
	}, ds = {
		readContext: Ha,
		useCallback: function(e, t) {
			return Ao().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: Ha,
		useEffect: qo,
		useImperativeHandle: function(e, t, n) {
			return n = n == null ? null : n.concat([e]), Go(4194308, 4, Zo.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return Go(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			return Go(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = Ao();
			return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
		},
		useReducer: function(e, t, n) {
			var r = Ao();
			return t = n === void 0 ? t : n(t), r.memoizedState = r.baseState = t, e = {
				pending: null,
				interleaved: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: t
			}, r.queue = e, e = e.dispatch = as.bind(null, yo, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = Ao();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: Ho,
		useDebugValue: $o,
		useDeferredValue: function(e) {
			return Ao().memoizedState = e;
		},
		useTransition: function() {
			var e = Ho(!1), t = e[0];
			return e = rs.bind(null, e[1]), Ao().memoizedState = e, [t, e];
		},
		useMutableSource: function() {},
		useSyncExternalStore: function(e, t, n) {
			var i = yo, a = Ao();
			if (ga) {
				if (n === void 0) throw Error(r(407));
				n = n();
			} else {
				if (n = t(), Vc === null) throw Error(r(349));
				vo & 30 || Lo(i, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, qo(zo.bind(null, i, o, e), [e]), i.flags |= 2048, Uo(9, Ro.bind(null, i, o, n, t), void 0, null), n;
		},
		useId: function() {
			var e = Ao(), t = Vc.identifierPrefix;
			if (ga) {
				var n = la, r = ca;
				n = (r & ~(1 << 32 - ht(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = wo++, 0 < n && (t += "H" + n.toString(32)), t += ":";
			} else n = To++, t = ":" + t + "r" + n.toString(32) + ":";
			return e.memoizedState = t;
		},
		unstable_isNewReconciler: !1
	}, fs = {
		readContext: Ha,
		useCallback: es,
		useContext: Ha,
		useEffect: Jo,
		useImperativeHandle: Qo,
		useInsertionEffect: Yo,
		useLayoutEffect: Xo,
		useMemo: ts,
		useReducer: No,
		useRef: Wo,
		useState: function() {
			return No(Mo);
		},
		useDebugValue: $o,
		useDeferredValue: function(e) {
			return ns(jo(), bo.memoizedState, e);
		},
		useTransition: function() {
			return [No(Mo)[0], jo().memoizedState];
		},
		useMutableSource: Fo,
		useSyncExternalStore: Io,
		useId: is,
		unstable_isNewReconciler: !1
	}, ps = {
		readContext: Ha,
		useCallback: es,
		useContext: Ha,
		useEffect: Jo,
		useImperativeHandle: Qo,
		useInsertionEffect: Yo,
		useLayoutEffect: Xo,
		useMemo: ts,
		useReducer: Po,
		useRef: Wo,
		useState: function() {
			return Po(Mo);
		},
		useDebugValue: $o,
		useDeferredValue: function(e) {
			var t = jo();
			return bo === null ? t.memoizedState = e : ns(t, bo.memoizedState, e);
		},
		useTransition: function() {
			return [Po(Mo)[0], jo().memoizedState];
		},
		useMutableSource: Fo,
		useSyncExternalStore: Io,
		useId: is,
		unstable_isNewReconciler: !1
	};
	function ms(e, t) {
		if (e && e.defaultProps) {
			for (var n in t = z({}, t), e = e.defaultProps, e) t[n] === void 0 && (t[n] = e[n]);
			return t;
		}
		return t;
	}
	function hs(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : z({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var gs = {
		isMounted: function(e) {
			return (e = e._reactInternals) ? Ye(e) === e : !1;
		},
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = fl(), i = pl(e), a = Xa(r, i);
			a.payload = t, n != null && (a.callback = n), t = Za(e, a, i), t !== null && (ml(t, e, i, r), Qa(t, e, i));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = fl(), i = pl(e), a = Xa(r, i);
			a.tag = 1, a.payload = t, n != null && (a.callback = n), t = Za(e, a, i), t !== null && (ml(t, e, i, r), Qa(t, e, i));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = fl(), r = pl(e), i = Xa(n, r);
			i.tag = 2, t != null && (i.callback = t), t = Za(e, i, r), t !== null && (ml(t, e, r, n), Qa(t, e, r));
		}
	};
	function _s(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !yr(n, r) || !yr(i, a) : !0;
	}
	function vs(e, t, n) {
		var r = !1, i = Ri, a = t.contextType;
		return typeof a == "object" && a ? a = Ha(a) : (i = Ui(t) ? Vi : zi.current, r = t.contextTypes, a = (r = r != null) ? Hi(e, i) : Ri), t = new t(n, a), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = gs, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = i, e.__reactInternalMemoizedMaskedChildContext = a), t;
	}
	function ys(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && gs.enqueueReplaceState(t, t.state, null);
	}
	function bs(e, t, n, r) {
		var i = e.stateNode;
		i.props = n, i.state = e.memoizedState, i.refs = {}, Ja(e);
		var a = t.contextType;
		typeof a == "object" && a ? i.context = Ha(a) : (a = Ui(t) ? Vi : zi.current, i.context = Hi(e, a)), i.state = e.memoizedState, a = t.getDerivedStateFromProps, typeof a == "function" && (hs(e, t, a, n), i.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (t = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), t !== i.state && gs.enqueueReplaceState(i, i.state, null), eo(e, n, i, r), i.state = e.memoizedState), typeof i.componentDidMount == "function" && (e.flags |= 4194308);
	}
	function xs(e, t) {
		try {
			var n = "", r = t;
			do
				n += W(r), r = r.return;
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
	function Ss(e, t, n) {
		return {
			value: e,
			source: null,
			stack: n ?? null,
			digest: t ?? null
		};
	}
	function Cs(e, t) {
		try {
			console.error(t.value);
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	var ws = typeof WeakMap == "function" ? WeakMap : Map;
	function Ts(e, t, n) {
		n = Xa(-1, n), n.tag = 3, n.payload = { element: null };
		var r = t.value;
		return n.callback = function() {
			nl || (nl = !0, rl = r), Cs(e, t);
		}, n;
	}
	function Es(e, t, n) {
		n = Xa(-1, n), n.tag = 3;
		var r = e.type.getDerivedStateFromError;
		if (typeof r == "function") {
			var i = t.value;
			n.payload = function() {
				return r(i);
			}, n.callback = function() {
				Cs(e, t);
			};
		}
		var a = e.stateNode;
		return a !== null && typeof a.componentDidCatch == "function" && (n.callback = function() {
			Cs(e, t), typeof r != "function" && (il === null ? il = /* @__PURE__ */ new Set([this]) : il.add(this));
			var n = t.stack;
			this.componentDidCatch(t.value, { componentStack: n === null ? "" : n });
		}), n;
	}
	function Ds(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new ws();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (i.add(n), e = zl.bind(null, e, t, n), t.then(e, e));
	}
	function Os(e) {
		do {
			var t;
			if ((t = e.tag === 13) && (t = e.memoizedState, t = t === null || t.dehydrated !== null), t) return e;
			e = e.return;
		} while (e !== null);
		return null;
	}
	function ks(e, t, n, r, i) {
		return e.mode & 1 ? (e.flags |= 65536, e.lanes = i, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Xa(-1, 1), t.tag = 2, Za(n, t, 1))), n.lanes |= 1), e);
	}
	var As = C.ReactCurrentOwner, js = !1;
	function Ms(e, t, n, r) {
		t.child = e === null ? Na(t, null, n, r) : Ma(t, e.child, n, r);
	}
	function Ns(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		return Va(t, i), r = Oo(e, t, n, r, a, i), n = ko(), e !== null && !js ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, $s(e, t, i)) : (ga && n && fa(t), t.flags |= 1, Ms(e, t, r, i), t.child);
	}
	function Ps(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !ql(a) && a.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = a, Fs(e, t, a, r, i)) : (e = Xl(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, (e.lanes & i) === 0) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? yr : n, n(o, r) && e.ref === t.ref) return $s(e, t, i);
		}
		return t.flags |= 1, e = Yl(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function Fs(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (yr(a, r) && e.ref === t.ref) {
				if (js = !1, t.pendingProps = r = a, (e.lanes & i) !== 0) e.flags & 131072 && (js = !0);
				else return t.lanes = e.lanes, $s(e, t, i);
			}
		}
		return Rs(e, t, n, r, i);
	}
	function Is(e, t, n) {
		var r = t.pendingProps, i = r.children, a = e === null ? null : e.memoizedState;
		if (r.mode === "hidden") {
			if (!(t.mode & 1)) t.memoizedState = {
				baseLanes: 0,
				cachePool: null,
				transitions: null
			}, Li(Gc, Wc), Wc |= n;
			else {
				if (!(n & 1073741824)) return e = a === null ? n : a.baseLanes | n, t.lanes = t.childLanes = 1073741824, t.memoizedState = {
					baseLanes: e,
					cachePool: null,
					transitions: null
				}, t.updateQueue = null, Li(Gc, Wc), Wc |= e, null;
				t.memoizedState = {
					baseLanes: 0,
					cachePool: null,
					transitions: null
				}, r = a === null ? n : a.baseLanes, Li(Gc, Wc), Wc |= r;
			}
		} else a === null ? r = n : (r = a.baseLanes | n, t.memoizedState = null), Li(Gc, Wc), Wc |= r;
		return Ms(e, t, i, n), t.child;
	}
	function Ls(e, t) {
		var n = t.ref;
		(e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
	}
	function Rs(e, t, n, r, i) {
		var a = Ui(n) ? Vi : zi.current;
		return a = Hi(t, a), Va(t, i), n = Oo(e, t, n, r, a, i), r = ko(), e !== null && !js ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, $s(e, t, i)) : (ga && r && fa(t), t.flags |= 1, Ms(e, t, n, i), t.child);
	}
	function zs(e, t, n, r, i) {
		if (Ui(n)) {
			var a = !0;
			qi(t);
		} else a = !1;
		if (Va(t, i), t.stateNode === null) Qs(e, t), vs(t, n, r), bs(t, n, r, i), r = !0;
		else if (e === null) {
			var o = t.stateNode, s = t.memoizedProps;
			o.props = s;
			var c = o.context, l = n.contextType;
			typeof l == "object" && l ? l = Ha(l) : (l = Ui(n) ? Vi : zi.current, l = Hi(t, l));
			var u = n.getDerivedStateFromProps, d = typeof u == "function" || typeof o.getSnapshotBeforeUpdate == "function";
			d || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (s !== r || c !== l) && ys(t, o, r, l), qa = !1;
			var f = t.memoizedState;
			o.state = f, eo(t, r, o, i), c = t.memoizedState, s !== r || f !== c || Bi.current || qa ? (typeof u == "function" && (hs(t, n, u, r), c = t.memoizedState), (s = qa || _s(t, n, s, r, f, c, l)) ? (d || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = c), o.props = r, o.state = c, o.context = l, r = s) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			o = t.stateNode, Ya(e, t), s = t.memoizedProps, l = t.type === t.elementType ? s : ms(t.type, s), o.props = l, d = t.pendingProps, f = o.context, c = n.contextType, typeof c == "object" && c ? c = Ha(c) : (c = Ui(n) ? Vi : zi.current, c = Hi(t, c));
			var p = n.getDerivedStateFromProps;
			(u = typeof p == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (s !== d || f !== c) && ys(t, o, r, c), qa = !1, f = t.memoizedState, o.state = f, eo(t, r, o, i);
			var m = t.memoizedState;
			s !== d || f !== m || Bi.current || qa ? (typeof p == "function" && (hs(t, n, p, r), m = t.memoizedState), (l = qa || _s(t, n, l, r, f, m, c) || !1) ? (u || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, m, c), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, m, c)), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || s === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = m), o.props = r, o.state = m, o.context = c, r = l) : (typeof o.componentDidUpdate != "function" || s === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return Bs(e, t, n, r, a, i);
	}
	function Bs(e, t, n, r, i, a) {
		Ls(e, t);
		var o = !!(t.flags & 128);
		if (!r && !o) return i && Ji(t, n, !1), $s(e, t, a);
		r = t.stateNode, As.current = t;
		var s = o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
		return t.flags |= 1, e !== null && o ? (t.child = Ma(t, e.child, null, a), t.child = Ma(t, null, s, a)) : Ms(e, t, s, a), t.memoizedState = r.state, i && Ji(t, n, !0), t.child;
	}
	function Vs(e) {
		var t = e.stateNode;
		t.pendingContext ? Gi(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Gi(e, t.context, !1), so(e, t.containerInfo);
	}
	function Hs(e, t, n, r, i) {
		return Ta(), Ea(i), t.flags |= 256, Ms(e, t, n, r), t.child;
	}
	var Us = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0
	};
	function Ws(e) {
		return {
			baseLanes: e,
			cachePool: null,
			transitions: null
		};
	}
	function Gs(e, t, n) {
		var r = t.pendingProps, i = fo.current, a = !1, o = !!(t.flags & 128), s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : !!(i & 2)), s ? (a = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (i |= 1), Li(fo, i & 1), e === null) return xa(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.lanes = t.mode & 1 ? e.data === "$!" ? 8 : 1073741824 : 1, null) : (o = r.children, e = r.fallback, a ? (r = t.mode, a = t.child, o = {
			mode: "hidden",
			children: o
		}, !(r & 1) && a !== null ? (a.childLanes = 0, a.pendingProps = o) : a = Ql(o, r, 0, null), e = Zl(e, r, n, null), a.return = t, e.return = t, a.sibling = e, t.child = a, t.child.memoizedState = Ws(n), t.memoizedState = Us, e) : Ks(t, o));
		if (i = e.memoizedState, i !== null && (s = i.dehydrated, s !== null)) return Js(e, t, o, r, s, i, n);
		if (a) {
			a = r.fallback, o = t.mode, i = e.child, s = i.sibling;
			var c = {
				mode: "hidden",
				children: r.children
			};
			return !(o & 1) && t.child !== i ? (r = t.child, r.childLanes = 0, r.pendingProps = c, t.deletions = null) : (r = Yl(i, c), r.subtreeFlags = i.subtreeFlags & 14680064), s === null ? (a = Zl(a, o, n, null), a.flags |= 2) : a = Yl(s, a), a.return = t, r.return = t, r.sibling = a, t.child = r, r = a, a = t.child, o = e.child.memoizedState, o = o === null ? Ws(n) : {
				baseLanes: o.baseLanes | n,
				cachePool: null,
				transitions: o.transitions
			}, a.memoizedState = o, a.childLanes = e.childLanes & ~n, t.memoizedState = Us, r;
		}
		return a = e.child, e = a.sibling, r = Yl(a, {
			mode: "visible",
			children: r.children
		}), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
	}
	function Ks(e, t) {
		return t = Ql({
			mode: "visible",
			children: t
		}, e.mode, 0, null), t.return = e, e.child = t;
	}
	function qs(e, t, n, r) {
		return r !== null && Ea(r), Ma(t, e.child, null, n), e = Ks(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function Js(e, t, n, i, a, o, s) {
		if (n) return t.flags & 256 ? (t.flags &= -257, i = Ss(Error(r(422))), qs(e, t, s, i)) : t.memoizedState === null ? (o = i.fallback, a = t.mode, i = Ql({
			mode: "visible",
			children: i.children
		}, a, 0, null), o = Zl(o, a, s, null), o.flags |= 2, i.return = t, o.return = t, i.sibling = o, t.child = i, t.mode & 1 && Ma(t, e.child, null, s), t.child.memoizedState = Ws(s), t.memoizedState = Us, o) : (t.child = e.child, t.flags |= 128, null);
		if (!(t.mode & 1)) return qs(e, t, s, null);
		if (a.data === "$!") {
			if (i = a.nextSibling && a.nextSibling.dataset, i) var c = i.dgst;
			return i = c, o = Error(r(419)), i = Ss(o, i, void 0), qs(e, t, s, i);
		}
		if (c = (s & e.childLanes) !== 0, js || c) {
			if (i = Vc, i !== null) {
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
				a = (a & (i.suspendedLanes | s)) === 0 ? a : 0, a !== 0 && a !== o.retryLane && (o.retryLane = a, Ka(e, a), ml(i, e, a, -1));
			}
			return Ol(), i = Ss(Error(r(421))), qs(e, t, s, i);
		}
		return a.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Vl.bind(null, e), a._reactRetry = t, null) : (e = o.treeContext, ha = bi(a.nextSibling), ma = t, ga = !0, _a = null, e !== null && (aa[oa++] = ca, aa[oa++] = la, aa[oa++] = sa, ca = e.id, la = e.overflow, sa = t), t = Ks(t, i.children), t.flags |= 4096, t);
	}
	function Ys(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), Ba(e.return, t, n);
	}
	function Xs(e, t, n, r, i) {
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
	function Zs(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		if (Ms(e, t, r.children, n), r = fo.current, r & 2) r = r & 1 | 2, t.flags |= 128;
		else {
			if (e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
				if (e.tag === 13) e.memoizedState !== null && Ys(e, n, t);
				else if (e.tag === 19) Ys(e, n, t);
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
		if (Li(fo, r), !(t.mode & 1)) t.memoizedState = null;
		else switch (i) {
			case "forwards":
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && po(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Xs(t, !1, i, n, a);
				break;
			case "backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && po(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				Xs(t, !0, n, null, a);
				break;
			case "together":
				Xs(t, !1, null, null, void 0);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function Qs(e, t) {
		!(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
	}
	function $s(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Jc |= t.lanes, (n & t.childLanes) === 0) return null;
		if (e !== null && t.child !== e.child) throw Error(r(153));
		if (t.child !== null) {
			for (e = t.child, n = Yl(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Yl(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function ec(e, t, n) {
		switch (t.tag) {
			case 3:
				Vs(t), Ta();
				break;
			case 5:
				lo(t);
				break;
			case 1:
				Ui(t.type) && qi(t);
				break;
			case 4:
				so(t, t.stateNode.containerInfo);
				break;
			case 10:
				var r = t.type._context, i = t.memoizedProps.value;
				Li(Pa, r._currentValue), r._currentValue = i;
				break;
			case 13:
				if (r = t.memoizedState, r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (Li(fo, fo.current & 1), e = $s(e, t, n), e === null ? null : e.sibling) : Gs(e, t, n) : (Li(fo, fo.current & 1), t.flags |= 128, null);
				Li(fo, fo.current & 1);
				break;
			case 19:
				if (r = (n & t.childLanes) !== 0, e.flags & 128) {
					if (r) return Zs(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), Li(fo, fo.current), r) break;
				return null;
			case 22:
			case 23: return t.lanes = 0, Is(e, t, n);
		}
		return $s(e, t, n);
	}
	var tc = function(e, t) {
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
	}, nc = function(e, t, n, r) {
		var i = e.memoizedProps;
		if (i !== r) {
			e = t.stateNode, oo(ro.current);
			var o = null;
			switch (n) {
				case "input":
					i = oe(e, i), r = oe(e, r), o = [];
					break;
				case "select":
					i = z({}, i, { value: void 0 }), r = z({}, r, { value: void 0 }), o = [];
					break;
				case "textarea":
					i = pe(e, i), r = pe(e, r), o = [];
					break;
				default: typeof i.onClick != "function" && typeof r.onClick == "function" && (e.onclick = ui);
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
					} else u === "dangerouslySetInnerHTML" ? (l = l ? l.__html : void 0, c = c ? c.__html : void 0, l != null && c !== l && (o ||= []).push(u, l)) : u === "children" ? typeof l != "string" && typeof l != "number" || (o ||= []).push(u, "" + l) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && (a.hasOwnProperty(u) ? (l != null && u === "onScroll" && Xr("scroll", e), o || c === l || (o = [])) : (o ||= []).push(u, l));
				}
			}
			n && (o ||= []).push("style", n);
			var u = o;
			(t.updateQueue = u) && (t.flags |= 4);
		}
	}, rc = function(e, t, n, r) {
		n !== r && (t.flags |= 4);
	};
	function ic(e, t) {
		if (!ga) switch (e.tailMode) {
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
	function ac(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 14680064, r |= i.flags & 14680064, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function oc(e, t, n) {
		var i = t.pendingProps;
		switch (pa(t), t.tag) {
			case 2:
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return ac(t), null;
			case 1: return Ui(t.type) && Wi(), ac(t), null;
			case 3: return i = t.stateNode, co(), Ii(Bi), Ii(zi), ho(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (Ca(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, _a !== null && (vl(_a), _a = null))), ac(t), null;
			case 5:
				uo(t);
				var o = oo(ao.current);
				if (n = t.type, e !== null && t.stateNode != null) nc(e, t, n, i, o), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
				else {
					if (!i) {
						if (t.stateNode === null) throw Error(r(166));
						return ac(t), null;
					}
					if (e = oo(ro.current), Ca(t)) {
						i = t.stateNode, n = t.type;
						var s = t.memoizedProps;
						switch (i[Ci] = t, i[wi] = s, e = !!(t.mode & 1), n) {
							case "dialog":
								Xr("cancel", i), Xr("close", i);
								break;
							case "iframe":
							case "object":
							case "embed":
								Xr("load", i);
								break;
							case "video":
							case "audio":
								for (o = 0; o < Kr.length; o++) Xr(Kr[o], i);
								break;
							case "source":
								Xr("error", i);
								break;
							case "img":
							case "image":
							case "link":
								Xr("error", i), Xr("load", i);
								break;
							case "details":
								Xr("toggle", i);
								break;
							case "input":
								se(i, s), Xr("invalid", i);
								break;
							case "select":
								i._wrapperState = { wasMultiple: !!s.multiple }, Xr("invalid", i);
								break;
							case "textarea": me(i, s), Xr("invalid", i);
						}
						for (var c in we(n, s), o = null, s) if (s.hasOwnProperty(c)) {
							var l = s[c];
							c === "children" ? typeof l == "string" ? i.textContent !== l && (!0 !== s.suppressHydrationWarning && li(i.textContent, l, e), o = ["children", l]) : typeof l == "number" && i.textContent !== "" + l && (!0 !== s.suppressHydrationWarning && li(i.textContent, l, e), o = ["children", "" + l]) : a.hasOwnProperty(c) && l != null && c === "onScroll" && Xr("scroll", i);
						}
						switch (n) {
							case "input":
								ae(i), le(i, s, !0);
								break;
							case "textarea":
								ae(i), Y(i);
								break;
							case "select":
							case "option": break;
							default: typeof s.onClick == "function" && (i.onclick = ui);
						}
						i = o, t.updateQueue = i, i !== null && (t.flags |= 4);
					} else {
						c = o.nodeType === 9 ? o : o.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = he(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = c.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof i.is == "string" ? e = c.createElement(n, { is: i.is }) : (e = c.createElement(n), n === "select" && (c = e, i.multiple ? c.multiple = !0 : i.size && (c.size = i.size))) : e = c.createElementNS(e, n), e[Ci] = t, e[wi] = i, tc(e, t, !1, !1), t.stateNode = e;
						a: {
							switch (c = Te(n, i), n) {
								case "dialog":
									Xr("cancel", e), Xr("close", e), o = i;
									break;
								case "iframe":
								case "object":
								case "embed":
									Xr("load", e), o = i;
									break;
								case "video":
								case "audio":
									for (o = 0; o < Kr.length; o++) Xr(Kr[o], e);
									o = i;
									break;
								case "source":
									Xr("error", e), o = i;
									break;
								case "img":
								case "image":
								case "link":
									Xr("error", e), Xr("load", e), o = i;
									break;
								case "details":
									Xr("toggle", e), o = i;
									break;
								case "input":
									se(e, i), o = oe(e, i), Xr("invalid", e);
									break;
								case "option":
									o = i;
									break;
								case "select":
									e._wrapperState = { wasMultiple: !!i.multiple }, o = z({}, i, { value: void 0 }), Xr("invalid", e);
									break;
								case "textarea":
									me(e, i), o = pe(e, i), Xr("invalid", e);
									break;
								default: o = i;
							}
							for (s in we(n, o), l = o, l) if (l.hasOwnProperty(s)) {
								var u = l[s];
								s === "style" ? Ce(e, u) : s === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && ve(e, u)) : s === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && ye(e, u) : typeof u == "number" && ye(e, "" + u) : s !== "suppressContentEditableWarning" && s !== "suppressHydrationWarning" && s !== "autoFocus" && (a.hasOwnProperty(s) ? u != null && s === "onScroll" && Xr("scroll", e) : u != null && S(e, s, u, c));
							}
							switch (n) {
								case "input":
									ae(e), le(e, i, !1);
									break;
								case "textarea":
									ae(e), Y(e);
									break;
								case "option":
									i.value != null && e.setAttribute("value", "" + ne(i.value));
									break;
								case "select":
									e.multiple = !!i.multiple, s = i.value, s == null ? i.defaultValue != null && fe(e, !!i.multiple, i.defaultValue, !0) : fe(e, !!i.multiple, s, !1);
									break;
								default: typeof o.onClick == "function" && (e.onclick = ui);
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
				return ac(t), null;
			case 6:
				if (e && t.stateNode != null) rc(e, t, e.memoizedProps, i);
				else {
					if (typeof i != "string" && t.stateNode === null) throw Error(r(166));
					if (n = oo(ao.current), oo(ro.current), Ca(t)) {
						if (i = t.stateNode, n = t.memoizedProps, i[Ci] = t, (s = i.nodeValue !== n) && (e = ma, e !== null)) switch (e.tag) {
							case 3:
								li(i.nodeValue, n, !!(e.mode & 1));
								break;
							case 5: !0 !== e.memoizedProps.suppressHydrationWarning && li(i.nodeValue, n, !!(e.mode & 1));
						}
						s && (t.flags |= 4);
					} else i = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(i), i[Ci] = t, t.stateNode = i;
				}
				return ac(t), null;
			case 13:
				if (Ii(fo), i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (ga && ha !== null && t.mode & 1 && !(t.flags & 128)) wa(), Ta(), t.flags |= 98560, s = !1;
					else if (s = Ca(t), i !== null && i.dehydrated !== null) {
						if (e === null) {
							if (!s) throw Error(r(318));
							if (s = t.memoizedState, s = s === null ? null : s.dehydrated, !s) throw Error(r(317));
							s[Ci] = t;
						} else Ta(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						ac(t), s = !1;
					} else _a !== null && (vl(_a), _a = null), s = !0;
					if (!s) return t.flags & 65536 ? t : null;
				}
				return t.flags & 128 ? (t.lanes = n, t) : (i = i !== null, i !== (e !== null && e.memoizedState !== null) && i && (t.child.flags |= 8192, t.mode & 1 && (e === null || fo.current & 1 ? Kc === 0 && (Kc = 3) : Ol())), t.updateQueue !== null && (t.flags |= 4), ac(t), null);
			case 4: return co(), e === null && $r(t.stateNode.containerInfo), ac(t), null;
			case 10: return za(t.type._context), ac(t), null;
			case 17: return Ui(t.type) && Wi(), ac(t), null;
			case 19:
				if (Ii(fo), s = t.memoizedState, s === null) return ac(t), null;
				if (i = !!(t.flags & 128), c = s.rendering, c === null) {
					if (i) ic(s, !1);
					else {
						if (Kc !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (c = po(e), c !== null) {
								for (t.flags |= 128, ic(s, !1), i = c.updateQueue, i !== null && (t.updateQueue = i, t.flags |= 4), t.subtreeFlags = 0, i = n, n = t.child; n !== null;) s = n, e = i, s.flags &= 14680066, c = s.alternate, c === null ? (s.childLanes = 0, s.lanes = e, s.child = null, s.subtreeFlags = 0, s.memoizedProps = null, s.memoizedState = null, s.updateQueue = null, s.dependencies = null, s.stateNode = null) : (s.childLanes = c.childLanes, s.lanes = c.lanes, s.child = c.child, s.subtreeFlags = 0, s.deletions = null, s.memoizedProps = c.memoizedProps, s.memoizedState = c.memoizedState, s.updateQueue = c.updateQueue, s.type = c.type, e = c.dependencies, s.dependencies = e === null ? null : {
									lanes: e.lanes,
									firstContext: e.firstContext
								}), n = n.sibling;
								return Li(fo, fo.current & 1 | 2), t.child;
							}
							e = e.sibling;
						}
						s.tail !== null && at() > el && (t.flags |= 128, i = !0, ic(s, !1), t.lanes = 4194304);
					}
				} else {
					if (!i) {
						if (e = po(c), e !== null) {
							if (t.flags |= 128, i = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), ic(s, !0), s.tail === null && s.tailMode === "hidden" && !c.alternate && !ga) return ac(t), null;
						} else 2 * at() - s.renderingStartTime > el && n !== 1073741824 && (t.flags |= 128, i = !0, ic(s, !1), t.lanes = 4194304);
					}
					s.isBackwards ? (c.sibling = t.child, t.child = c) : (n = s.last, n === null ? t.child = c : n.sibling = c, s.last = c);
				}
				return s.tail === null ? (ac(t), null) : (t = s.tail, s.rendering = t, s.tail = t.sibling, s.renderingStartTime = at(), t.sibling = null, n = fo.current, Li(fo, i ? n & 1 | 2 : n & 1), t);
			case 22:
			case 23: return wl(), i = t.memoizedState !== null, e !== null && e.memoizedState !== null !== i && (t.flags |= 8192), i && t.mode & 1 ? Wc & 1073741824 && (ac(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ac(t), null;
			case 24: return null;
			case 25: return null;
		}
		throw Error(r(156, t.tag));
	}
	function sc(e, t) {
		switch (pa(t), t.tag) {
			case 1: return Ui(t.type) && Wi(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return co(), Ii(Bi), Ii(zi), ho(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 5: return uo(t), null;
			case 13:
				if (Ii(fo), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(r(340));
					Ta();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return Ii(fo), null;
			case 4: return co(), null;
			case 10: return za(t.type._context), null;
			case 22:
			case 23: return wl(), null;
			case 24: return null;
			default: return null;
		}
	}
	var cc = !1, lc = !1, uc = typeof WeakSet == "function" ? WeakSet : Set, $ = null;
	function dc(e, t) {
		var n = e.ref;
		if (n !== null) {
			if (typeof n == "function") try {
				n(null);
			} catch (n) {
				Rl(e, t, n);
			}
			else n.current = null;
		}
	}
	function fc(e, t, n) {
		try {
			n();
		} catch (n) {
			Rl(e, t, n);
		}
	}
	var pc = !1;
	function mc(e, t) {
		if (di = nn, e = Cr(), wr(e)) {
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
		for (fi = {
			focusedElem: e,
			selectionRange: n
		}, nn = !1, $ = t; $ !== null;) if (t = $, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, $ = e;
		else for (; $ !== null;) {
			t = $;
			try {
				var h = t.alternate;
				if (t.flags & 1024) switch (t.tag) {
					case 0:
					case 11:
					case 15: break;
					case 1:
						if (h !== null) {
							var g = h.memoizedProps, _ = h.memoizedState, v = t.stateNode;
							v.__reactInternalSnapshotBeforeUpdate = v.getSnapshotBeforeUpdate(t.elementType === t.type ? g : ms(t.type, g), _);
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
				Rl(t, t.return, e);
			}
			if (e = t.sibling, e !== null) {
				e.return = t.return, $ = e;
				break;
			}
			$ = t.return;
		}
		return h = pc, pc = !1, h;
	}
	function hc(e, t, n) {
		var r = t.updateQueue;
		if (r = r === null ? null : r.lastEffect, r !== null) {
			var i = r = r.next;
			do {
				if ((i.tag & e) === e) {
					var a = i.destroy;
					i.destroy = void 0, a !== void 0 && fc(t, n, a);
				}
				i = i.next;
			} while (i !== r);
		}
	}
	function gc(e, t) {
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
	function _c(e) {
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
	function vc(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, vc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ci], delete t[wi], delete t[Ei], delete t[Di], delete t[Oi])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	function yc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 4;
	}
	function bc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || yc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function xc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = ui));
		else if (r !== 4 && (e = e.child, e !== null)) for (xc(e, t, n), e = e.sibling; e !== null;) xc(e, t, n), e = e.sibling;
	}
	function Sc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (e = e.child, e !== null)) for (Sc(e, t, n), e = e.sibling; e !== null;) Sc(e, t, n), e = e.sibling;
	}
	var Cc = null, wc = !1;
	function Tc(e, t, n) {
		for (n = n.child; n !== null;) Ec(e, t, n), n = n.sibling;
	}
	function Ec(e, t, n) {
		if (pt && typeof pt.onCommitFiberUnmount == "function") try {
			pt.onCommitFiberUnmount(ft, n);
		} catch {}
		switch (n.tag) {
			case 5: lc || dc(n, t);
			case 6:
				var r = Cc, i = wc;
				Cc = null, Tc(e, t, n), Cc = r, wc = i, Cc !== null && (wc ? (e = Cc, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : Cc.removeChild(n.stateNode));
				break;
			case 18:
				Cc !== null && (wc ? (e = Cc, n = n.stateNode, e.nodeType === 8 ? yi(e.parentNode, n) : e.nodeType === 1 && yi(e, n), en(e)) : yi(Cc, n.stateNode));
				break;
			case 4:
				r = Cc, i = wc, Cc = n.stateNode.containerInfo, wc = !0, Tc(e, t, n), Cc = r, wc = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				if (!lc && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
					i = r = r.next;
					do {
						var a = i, o = a.destroy;
						a = a.tag, o !== void 0 && (a & 2 || a & 4) && fc(n, t, o), i = i.next;
					} while (i !== r);
				}
				Tc(e, t, n);
				break;
			case 1:
				if (!lc && (dc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
					r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
				} catch (e) {
					Rl(n, t, e);
				}
				Tc(e, t, n);
				break;
			case 21:
				Tc(e, t, n);
				break;
			case 22:
				n.mode & 1 ? (lc = (r = lc) || n.memoizedState !== null, Tc(e, t, n), lc = r) : Tc(e, t, n);
				break;
			default: Tc(e, t, n);
		}
	}
	function Dc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			e.updateQueue = null;
			var n = e.stateNode;
			n === null && (n = e.stateNode = new uc()), t.forEach(function(t) {
				var r = Hl.bind(null, e, t);
				n.has(t) || (n.add(t), t.then(r, r));
			});
		}
	}
	function Oc(e, t) {
		var n = t.deletions;
		if (n !== null) for (var i = 0; i < n.length; i++) {
			var a = n[i];
			try {
				var o = e, s = t, c = s;
				a: for (; c !== null;) {
					switch (c.tag) {
						case 5:
							Cc = c.stateNode, wc = !1;
							break a;
						case 3:
							Cc = c.stateNode.containerInfo, wc = !0;
							break a;
						case 4:
							Cc = c.stateNode.containerInfo, wc = !0;
							break a;
					}
					c = c.return;
				}
				if (Cc === null) throw Error(r(160));
				Ec(o, s, a), Cc = null, wc = !1;
				var l = a.alternate;
				l !== null && (l.return = null), a.return = null;
			} catch (e) {
				Rl(a, t, e);
			}
		}
		if (t.subtreeFlags & 12854) for (t = t.child; t !== null;) kc(t, e), t = t.sibling;
	}
	function kc(e, t) {
		var n = e.alternate, i = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				if (Oc(t, e), Ac(e), i & 4) {
					try {
						hc(3, e, e.return), gc(3, e);
					} catch (t) {
						Rl(e, e.return, t);
					}
					try {
						hc(5, e, e.return);
					} catch (t) {
						Rl(e, e.return, t);
					}
				}
				break;
			case 1:
				Oc(t, e), Ac(e), i & 512 && n !== null && dc(n, n.return);
				break;
			case 5:
				if (Oc(t, e), Ac(e), i & 512 && n !== null && dc(n, n.return), e.flags & 32) {
					var a = e.stateNode;
					try {
						ye(a, "");
					} catch (t) {
						Rl(e, e.return, t);
					}
				}
				if (i & 4 && (a = e.stateNode, a != null)) {
					var o = e.memoizedProps, s = n === null ? o : n.memoizedProps, c = e.type, l = e.updateQueue;
					if (e.updateQueue = null, l !== null) try {
						c === "input" && o.type === "radio" && o.name != null && ce(a, o), Te(c, s);
						var u = Te(c, o);
						for (s = 0; s < l.length; s += 2) {
							var d = l[s], f = l[s + 1];
							d === "style" ? Ce(a, f) : d === "dangerouslySetInnerHTML" ? ve(a, f) : d === "children" ? ye(a, f) : S(a, d, f, u);
						}
						switch (c) {
							case "input":
								q(a, o);
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
						a[wi] = o;
					} catch (t) {
						Rl(e, e.return, t);
					}
				}
				break;
			case 6:
				if (Oc(t, e), Ac(e), i & 4) {
					if (e.stateNode === null) throw Error(r(162));
					a = e.stateNode, o = e.memoizedProps;
					try {
						a.nodeValue = o;
					} catch (t) {
						Rl(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Oc(t, e), Ac(e), i & 4 && n !== null && n.memoizedState.isDehydrated) try {
					en(t.containerInfo);
				} catch (t) {
					Rl(e, e.return, t);
				}
				break;
			case 4:
				Oc(t, e), Ac(e);
				break;
			case 13:
				Oc(t, e), Ac(e), a = e.child, a.flags & 8192 && (o = a.memoizedState !== null, a.stateNode.isHidden = o, !o || a.alternate !== null && a.alternate.memoizedState !== null || ($c = at())), i & 4 && Dc(e);
				break;
			case 22:
				if (d = n !== null && n.memoizedState !== null, e.mode & 1 ? (lc = (u = lc) || d, Oc(t, e), lc = u) : Oc(t, e), Ac(e), i & 8192) {
					if (u = e.memoizedState !== null, (e.stateNode.isHidden = u) && !d && e.mode & 1) for ($ = e, d = e.child; d !== null;) {
						for (f = $ = d; $ !== null;) {
							switch (p = $, m = p.child, p.tag) {
								case 0:
								case 11:
								case 14:
								case 15:
									hc(4, p, p.return);
									break;
								case 1:
									dc(p, p.return);
									var h = p.stateNode;
									if (typeof h.componentWillUnmount == "function") {
										i = p, n = p.return;
										try {
											t = i, h.props = t.memoizedProps, h.state = t.memoizedState, h.componentWillUnmount();
										} catch (e) {
											Rl(i, n, e);
										}
									}
									break;
								case 5:
									dc(p, p.return);
									break;
								case 22: if (p.memoizedState !== null) {
									Pc(f);
									continue;
								}
							}
							m === null ? Pc(f) : (m.return = p, $ = m);
						}
						d = d.sibling;
					}
					a: for (d = null, f = e;;) {
						if (f.tag === 5) {
							if (d === null) {
								d = f;
								try {
									a = f.stateNode, u ? (o = a.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (c = f.stateNode, l = f.memoizedProps.style, s = l != null && l.hasOwnProperty("display") ? l.display : null, c.style.display = Se("display", s));
								} catch (t) {
									Rl(e, e.return, t);
								}
							}
						} else if (f.tag === 6) {
							if (d === null) try {
								f.stateNode.nodeValue = u ? "" : f.memoizedProps;
							} catch (t) {
								Rl(e, e.return, t);
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
				Oc(t, e), Ac(e), i & 4 && Dc(e);
				break;
			case 21: break;
			default: Oc(t, e), Ac(e);
		}
	}
	function Ac(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				a: {
					for (var n = e.return; n !== null;) {
						if (yc(n)) {
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
						i.flags & 32 && (ye(a, ""), i.flags &= -33), Sc(e, bc(e), a);
						break;
					case 3:
					case 4:
						var o = i.stateNode.containerInfo;
						xc(e, bc(e), o);
						break;
					default: throw Error(r(161));
				}
			} catch (t) {
				Rl(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function jc(e, t, n) {
		$ = e, Mc(e, t, n);
	}
	function Mc(e, t, n) {
		for (var r = !!(e.mode & 1); $ !== null;) {
			var i = $, a = i.child;
			if (i.tag === 22 && r) {
				var o = i.memoizedState !== null || cc;
				if (!o) {
					var s = i.alternate, c = s !== null && s.memoizedState !== null || lc;
					s = cc;
					var l = lc;
					if (cc = o, (lc = c) && !l) for ($ = i; $ !== null;) o = $, c = o.child, o.tag === 22 && o.memoizedState !== null || c === null ? Fc(i) : (c.return = o, $ = c);
					for (; a !== null;) $ = a, Mc(a, t, n), a = a.sibling;
					$ = i, cc = s, lc = l;
				}
				Nc(e, t, n);
			} else i.subtreeFlags & 8772 && a !== null ? (a.return = i, $ = a) : Nc(e, t, n);
		}
	}
	function Nc(e) {
		for (; $ !== null;) {
			var t = $;
			if (t.flags & 8772) {
				var n = t.alternate;
				try {
					if (t.flags & 8772) switch (t.tag) {
						case 0:
						case 11:
						case 15:
							lc || gc(5, t);
							break;
						case 1:
							var i = t.stateNode;
							if (t.flags & 4 && !lc) {
								if (n === null) i.componentDidMount();
								else {
									var a = t.elementType === t.type ? n.memoizedProps : ms(t.type, n.memoizedProps);
									i.componentDidUpdate(a, n.memoizedState, i.__reactInternalSnapshotBeforeUpdate);
								}
							}
							var o = t.updateQueue;
							o !== null && to(t, o, i);
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
								to(t, s, n);
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
					lc || t.flags & 512 && _c(t);
				} catch (e) {
					Rl(t, t.return, e);
				}
			}
			if (t === e) {
				$ = null;
				break;
			}
			if (n = t.sibling, n !== null) {
				n.return = t.return, $ = n;
				break;
			}
			$ = t.return;
		}
	}
	function Pc(e) {
		for (; $ !== null;) {
			var t = $;
			if (t === e) {
				$ = null;
				break;
			}
			var n = t.sibling;
			if (n !== null) {
				n.return = t.return, $ = n;
				break;
			}
			$ = t.return;
		}
	}
	function Fc(e) {
		for (; $ !== null;) {
			var t = $;
			try {
				switch (t.tag) {
					case 0:
					case 11:
					case 15:
						var n = t.return;
						try {
							gc(4, t);
						} catch (e) {
							Rl(t, n, e);
						}
						break;
					case 1:
						var r = t.stateNode;
						if (typeof r.componentDidMount == "function") {
							var i = t.return;
							try {
								r.componentDidMount();
							} catch (e) {
								Rl(t, i, e);
							}
						}
						var a = t.return;
						try {
							_c(t);
						} catch (e) {
							Rl(t, a, e);
						}
						break;
					case 5:
						var o = t.return;
						try {
							_c(t);
						} catch (e) {
							Rl(t, o, e);
						}
				}
			} catch (e) {
				Rl(t, t.return, e);
			}
			if (t === e) {
				$ = null;
				break;
			}
			var s = t.sibling;
			if (s !== null) {
				s.return = t.return, $ = s;
				break;
			}
			$ = t.return;
		}
	}
	var Ic = Math.ceil, Lc = C.ReactCurrentDispatcher, Rc = C.ReactCurrentOwner, zc = C.ReactCurrentBatchConfig, Bc = 0, Vc = null, Hc = null, Uc = 0, Wc = 0, Gc = Fi(0), Kc = 0, qc = null, Jc = 0, Yc = 0, Xc = 0, Zc = null, Qc = null, $c = 0, el = Infinity, tl = null, nl = !1, rl = null, il = null, al = !1, ol = null, sl = 0, cl = 0, ll = null, ul = -1, dl = 0;
	function fl() {
		return Bc & 6 ? at() : ul === -1 ? ul = at() : ul;
	}
	function pl(e) {
		return e.mode & 1 ? Bc & 2 && Uc !== 0 ? Uc & -Uc : Da.transition === null ? (e = At, e === 0 && (e = window.event, e = e === void 0 ? 16 : ln(e.type)), e) : (dl === 0 && (dl = Et()), dl) : 1;
	}
	function ml(e, t, n, i) {
		if (50 < cl) throw cl = 0, ll = null, Error(r(185));
		Z(e, n, i), Bc & 2 && e === Vc || (e === Vc && (!(Bc & 2) && (Yc |= n), Kc === 4 && bl(e, Uc)), hl(e, i), n === 1 && Bc === 0 && !(t.mode & 1) && (el = at() + 500, Xi && ea()));
	}
	function hl(e, t) {
		var n = e.callbackNode;
		wt(e, t);
		var r = St(e, e === Vc ? Uc : 0);
		if (r === 0) n !== null && nt(n), e.callbackNode = null, e.callbackPriority = 0;
		else if (t = r & -r, e.callbackPriority !== t) {
			if (n != null && nt(n), t === 1) e.tag === 0 ? $i(xl.bind(null, e)) : Qi(xl.bind(null, e)), _i(function() {
				!(Bc & 6) && ea();
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
				n = Wl(n, gl.bind(null, e));
			}
			e.callbackPriority = t, e.callbackNode = n;
		}
	}
	function gl(e, t) {
		if (ul = -1, dl = 0, Bc & 6) throw Error(r(327));
		var n = e.callbackNode;
		if (Il() && e.callbackNode !== n) return null;
		var i = St(e, e === Vc ? Uc : 0);
		if (i === 0) return null;
		if (i & 30 || (i & e.expiredLanes) !== 0 || t) t = kl(e, i);
		else {
			t = i;
			var a = Bc;
			Bc |= 2;
			var o = Dl();
			(Vc !== e || Uc !== t) && (tl = null, el = at() + 500, Tl(e, t));
			do
				try {
					jl();
					break;
				} catch (t) {
					El(e, t);
				}
			while (1);
			Ra(), Lc.current = o, Bc = a, Hc === null ? (Vc = null, Uc = 0, t = Kc) : t = 0;
		}
		if (t !== 0) {
			if (t === 2 && (a = Tt(e), a !== 0 && (i = a, t = _l(e, a))), t === 1) throw n = qc, Tl(e, 0), bl(e, i), hl(e, at()), n;
			if (t === 6) bl(e, i);
			else {
				if (a = e.current.alternate, !(i & 30) && !yl(a) && (t = kl(e, i), t === 2 && (o = Tt(e), o !== 0 && (i = o, t = _l(e, o))), t === 1)) throw n = qc, Tl(e, 0), bl(e, i), hl(e, at()), n;
				switch (e.finishedWork = a, e.finishedLanes = i, t) {
					case 0:
					case 1: throw Error(r(345));
					case 2:
						Pl(e, Qc, tl);
						break;
					case 3:
						if (bl(e, i), (i & 130023424) === i && (t = $c + 500 - at(), 10 < t)) {
							if (St(e, 0) !== 0) break;
							if (a = e.suspendedLanes, (a & i) !== i) {
								fl(), e.pingedLanes |= e.suspendedLanes & a;
								break;
							}
							e.timeoutHandle = mi(Pl.bind(null, e, Qc, tl), t);
							break;
						}
						Pl(e, Qc, tl);
						break;
					case 4:
						if (bl(e, i), (i & 4194240) === i) break;
						for (t = e.eventTimes, a = -1; 0 < i;) {
							var s = 31 - ht(i);
							o = 1 << s, s = t[s], s > a && (a = s), i &= ~o;
						}
						if (i = a, i = at() - i, i = (120 > i ? 120 : 480 > i ? 480 : 1080 > i ? 1080 : 1920 > i ? 1920 : 3e3 > i ? 3e3 : 4320 > i ? 4320 : 1960 * Ic(i / 1960)) - i, 10 < i) {
							e.timeoutHandle = mi(Pl.bind(null, e, Qc, tl), i);
							break;
						}
						Pl(e, Qc, tl);
						break;
					case 5:
						Pl(e, Qc, tl);
						break;
					default: throw Error(r(329));
				}
			}
		}
		return hl(e, at()), e.callbackNode === n ? gl.bind(null, e) : null;
	}
	function _l(e, t) {
		var n = Zc;
		return e.current.memoizedState.isDehydrated && (Tl(e, t).flags |= 256), e = kl(e, t), e !== 2 && (t = Qc, Qc = n, t !== null && vl(t)), e;
	}
	function vl(e) {
		Qc === null ? Qc = e : Qc.push.apply(Qc, e);
	}
	function yl(e) {
		for (var t = e;;) {
			if (t.flags & 16384) {
				var n = t.updateQueue;
				if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
					var i = n[r], a = i.getSnapshot;
					i = i.value;
					try {
						if (!vr(a(), i)) return !1;
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
	function bl(e, t) {
		for (t &= ~Xc, t &= ~Yc, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t;) {
			var n = 31 - ht(t), r = 1 << n;
			e[n] = -1, t &= ~r;
		}
	}
	function xl(e) {
		if (Bc & 6) throw Error(r(327));
		Il();
		var t = St(e, 0);
		if (!(t & 1)) return hl(e, at()), null;
		var n = kl(e, t);
		if (e.tag !== 0 && n === 2) {
			var i = Tt(e);
			i !== 0 && (t = i, n = _l(e, i));
		}
		if (n === 1) throw n = qc, Tl(e, 0), bl(e, t), hl(e, at()), n;
		if (n === 6) throw Error(r(345));
		return e.finishedWork = e.current.alternate, e.finishedLanes = t, Pl(e, Qc, tl), hl(e, at()), null;
	}
	function Sl(e, t) {
		var n = Bc;
		Bc |= 1;
		try {
			return e(t);
		} finally {
			Bc = n, Bc === 0 && (el = at() + 500, Xi && ea());
		}
	}
	function Cl(e) {
		ol !== null && ol.tag === 0 && !(Bc & 6) && Il();
		var t = Bc;
		Bc |= 1;
		var n = zc.transition, r = At;
		try {
			if (zc.transition = null, At = 1, e) return e();
		} finally {
			At = r, zc.transition = n, Bc = t, !(Bc & 6) && ea();
		}
	}
	function wl() {
		Wc = Gc.current, Ii(Gc);
	}
	function Tl(e, t) {
		e.finishedWork = null, e.finishedLanes = 0;
		var n = e.timeoutHandle;
		if (n !== -1 && (e.timeoutHandle = -1, hi(n)), Hc !== null) for (n = Hc.return; n !== null;) {
			var r = n;
			switch (pa(r), r.tag) {
				case 1:
					r = r.type.childContextTypes, r != null && Wi();
					break;
				case 3:
					co(), Ii(Bi), Ii(zi), ho();
					break;
				case 5:
					uo(r);
					break;
				case 4:
					co();
					break;
				case 13:
					Ii(fo);
					break;
				case 19:
					Ii(fo);
					break;
				case 10:
					za(r.type._context);
					break;
				case 22:
				case 23: wl();
			}
			n = n.return;
		}
		if (Vc = e, Hc = e = Yl(e.current, null), Uc = Wc = t, Kc = 0, qc = null, Xc = Yc = Jc = 0, Qc = Zc = null, Ua !== null) {
			for (t = 0; t < Ua.length; t++) if (n = Ua[t], r = n.interleaved, r !== null) {
				n.interleaved = null;
				var i = r.next, a = n.pending;
				if (a !== null) {
					var o = a.next;
					a.next = i, r.next = o;
				}
				n.pending = r;
			}
			Ua = null;
		}
		return e;
	}
	function El(e, t) {
		do {
			var n = Hc;
			try {
				if (Ra(), go.current = us, So) {
					for (var i = yo.memoizedState; i !== null;) {
						var a = i.queue;
						a !== null && (a.pending = null), i = i.next;
					}
					So = !1;
				}
				if (vo = 0, xo = bo = yo = null, Co = !1, wo = 0, Rc.current = null, n === null || n.return === null) {
					Kc = 1, qc = t, Hc = null;
					break;
				}
				a: {
					var o = e, s = n.return, c = n, l = t;
					if (t = Uc, c.flags |= 32768, typeof l == "object" && l && typeof l.then == "function") {
						var u = l, d = c, f = d.tag;
						if (!(d.mode & 1) && (f === 0 || f === 11 || f === 15)) {
							var p = d.alternate;
							p ? (d.updateQueue = p.updateQueue, d.memoizedState = p.memoizedState, d.lanes = p.lanes) : (d.updateQueue = null, d.memoizedState = null);
						}
						var m = Os(s);
						if (m !== null) {
							m.flags &= -257, ks(m, s, c, o, t), m.mode & 1 && Ds(o, u, t), t = m, l = u;
							var h = t.updateQueue;
							if (h === null) {
								var g = /* @__PURE__ */ new Set();
								g.add(l), t.updateQueue = g;
							} else h.add(l);
							break a;
						}
						if (!(t & 1)) {
							Ds(o, u, t), Ol();
							break a;
						}
						l = Error(r(426));
					} else if (ga && c.mode & 1) {
						var _ = Os(s);
						if (_ !== null) {
							!(_.flags & 65536) && (_.flags |= 256), ks(_, s, c, o, t), Ea(xs(l, c));
							break a;
						}
					}
					o = l = xs(l, c), Kc !== 4 && (Kc = 2), Zc === null ? Zc = [o] : Zc.push(o), o = s;
					do {
						switch (o.tag) {
							case 3:
								o.flags |= 65536, t &= -t, o.lanes |= t;
								var v = Ts(o, l, t);
								$a(o, v);
								break a;
							case 1:
								c = l;
								var y = o.type, b = o.stateNode;
								if (!(o.flags & 128) && (typeof y.getDerivedStateFromError == "function" || b !== null && typeof b.componentDidCatch == "function" && (il === null || !il.has(b)))) {
									o.flags |= 65536, t &= -t, o.lanes |= t;
									var x = Es(o, c, t);
									$a(o, x);
									break a;
								}
						}
						o = o.return;
					} while (o !== null);
				}
				Nl(n);
			} catch (e) {
				t = e, Hc === n && n !== null && (Hc = n = n.return);
				continue;
			}
			break;
		} while (1);
	}
	function Dl() {
		var e = Lc.current;
		return Lc.current = us, e === null ? us : e;
	}
	function Ol() {
		(Kc === 0 || Kc === 3 || Kc === 2) && (Kc = 4), Vc === null || !(Jc & 268435455) && !(Yc & 268435455) || bl(Vc, Uc);
	}
	function kl(e, t) {
		var n = Bc;
		Bc |= 2;
		var i = Dl();
		(Vc !== e || Uc !== t) && (tl = null, Tl(e, t));
		do
			try {
				Al();
				break;
			} catch (t) {
				El(e, t);
			}
		while (1);
		if (Ra(), Bc = n, Lc.current = i, Hc !== null) throw Error(r(261));
		return Vc = null, Uc = 0, Kc;
	}
	function Al() {
		for (; Hc !== null;) Ml(Hc);
	}
	function jl() {
		for (; Hc !== null && !rt();) Ml(Hc);
	}
	function Ml(e) {
		var t = Ul(e.alternate, e, Wc);
		e.memoizedProps = e.pendingProps, t === null ? Nl(e) : Hc = t, Rc.current = null;
	}
	function Nl(e) {
		var t = e;
		do {
			var n = t.alternate;
			if (e = t.return, t.flags & 32768) {
				if (n = sc(n, t), n !== null) {
					n.flags &= 32767, Hc = n;
					return;
				}
				if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
				else {
					Kc = 6, Hc = null;
					return;
				}
			} else if (n = oc(n, t, Wc), n !== null) {
				Hc = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				Hc = t;
				return;
			}
			Hc = t = e;
		} while (t !== null);
		Kc === 0 && (Kc = 5);
	}
	function Pl(e, t, n) {
		var r = At, i = zc.transition;
		try {
			zc.transition = null, At = 1, Fl(e, t, n, r);
		} finally {
			zc.transition = i, At = r;
		}
		return null;
	}
	function Fl(e, t, n, i) {
		do
			Il();
		while (ol !== null);
		if (Bc & 6) throw Error(r(327));
		n = e.finishedWork;
		var a = e.finishedLanes;
		if (n === null) return null;
		if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(r(177));
		e.callbackNode = null, e.callbackPriority = 0;
		var o = n.lanes | n.childLanes;
		if (Ot(e, o), e === Vc && (Hc = Vc = null, Uc = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || al || (al = !0, Wl(lt, function() {
			return Il(), null;
		})), o = !!(n.flags & 15990), n.subtreeFlags & 15990 || o) {
			o = zc.transition, zc.transition = null;
			var s = At;
			At = 1;
			var c = Bc;
			Bc |= 4, Rc.current = null, mc(e, n), kc(n, e), Tr(fi), nn = !!di, fi = di = null, e.current = n, jc(n, e, a), it(), Bc = c, At = s, zc.transition = o;
		} else e.current = n;
		if (al && (al = !1, ol = e, sl = a), o = e.pendingLanes, o === 0 && (il = null), mt(n.stateNode, i), hl(e, at()), t !== null) for (i = e.onRecoverableError, n = 0; n < t.length; n++) a = t[n], i(a.value, {
			componentStack: a.stack,
			digest: a.digest
		});
		if (nl) throw nl = !1, e = rl, rl = null, e;
		return sl & 1 && e.tag !== 0 && Il(), o = e.pendingLanes, o & 1 ? e === ll ? cl++ : (cl = 0, ll = e) : cl = 0, ea(), null;
	}
	function Il() {
		if (ol !== null) {
			var e = jt(sl), t = zc.transition, n = At;
			try {
				if (zc.transition = null, At = 16 > e ? 16 : e, ol === null) var i = !1;
				else {
					if (e = ol, ol = null, sl = 0, Bc & 6) throw Error(r(331));
					var a = Bc;
					for (Bc |= 4, $ = e.current; $ !== null;) {
						var o = $, s = o.child;
						if ($.flags & 16) {
							var c = o.deletions;
							if (c !== null) {
								for (var l = 0; l < c.length; l++) {
									var u = c[l];
									for ($ = u; $ !== null;) {
										var d = $;
										switch (d.tag) {
											case 0:
											case 11:
											case 15: hc(8, d, o);
										}
										var f = d.child;
										if (f !== null) f.return = d, $ = f;
										else for (; $ !== null;) {
											d = $;
											var p = d.sibling, m = d.return;
											if (vc(d), d === u) {
												$ = null;
												break;
											}
											if (p !== null) {
												p.return = m, $ = p;
												break;
											}
											$ = m;
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
								$ = o;
							}
						}
						if (o.subtreeFlags & 2064 && s !== null) s.return = o, $ = s;
						else b: for (; $ !== null;) {
							if (o = $, o.flags & 2048) switch (o.tag) {
								case 0:
								case 11:
								case 15: hc(9, o, o.return);
							}
							var v = o.sibling;
							if (v !== null) {
								v.return = o.return, $ = v;
								break b;
							}
							$ = o.return;
						}
					}
					var y = e.current;
					for ($ = y; $ !== null;) {
						s = $;
						var b = s.child;
						if (s.subtreeFlags & 2064 && b !== null) b.return = s, $ = b;
						else b: for (s = y; $ !== null;) {
							if (c = $, c.flags & 2048) try {
								switch (c.tag) {
									case 0:
									case 11:
									case 15: gc(9, c);
								}
							} catch (e) {
								Rl(c, c.return, e);
							}
							if (c === s) {
								$ = null;
								break b;
							}
							var x = c.sibling;
							if (x !== null) {
								x.return = c.return, $ = x;
								break b;
							}
							$ = c.return;
						}
					}
					if (Bc = a, ea(), pt && typeof pt.onPostCommitFiberRoot == "function") try {
						pt.onPostCommitFiberRoot(ft, e);
					} catch {}
					i = !0;
				}
				return i;
			} finally {
				At = n, zc.transition = t;
			}
		}
		return !1;
	}
	function Ll(e, t, n) {
		t = xs(n, t), t = Ts(e, t, 1), e = Za(e, t, 1), t = fl(), e !== null && (Z(e, 1, t), hl(e, t));
	}
	function Rl(e, t, n) {
		if (e.tag === 3) Ll(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				Ll(t, e, n);
				break;
			}
			if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (il === null || !il.has(r))) {
					e = xs(n, e), e = Es(t, e, 1), t = Za(t, e, 1), e = fl(), t !== null && (Z(t, 1, e), hl(t, e));
					break;
				}
			}
			t = t.return;
		}
	}
	function zl(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), t = fl(), e.pingedLanes |= e.suspendedLanes & n, Vc === e && (Uc & n) === n && (Kc === 4 || Kc === 3 && (Uc & 130023424) === Uc && 500 > at() - $c ? Tl(e, 0) : Xc |= n), hl(e, t);
	}
	function Bl(e, t) {
		t === 0 && (e.mode & 1 ? (t = bt, bt <<= 1, !(bt & 130023424) && (bt = 4194304)) : t = 1);
		var n = fl();
		e = Ka(e, t), e !== null && (Z(e, t, n), hl(e, n));
	}
	function Vl(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), Bl(e, n);
	}
	function Hl(e, t) {
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
		i !== null && i.delete(t), Bl(e, n);
	}
	var Ul = function(e, t, n) {
		if (e !== null) {
			if (e.memoizedProps !== t.pendingProps || Bi.current) js = !0;
			else {
				if ((e.lanes & n) === 0 && !(t.flags & 128)) return js = !1, ec(e, t, n);
				js = !!(e.flags & 131072);
			}
		} else js = !1, ga && t.flags & 1048576 && da(t, ia, t.index);
		switch (t.lanes = 0, t.tag) {
			case 2:
				var i = t.type;
				Qs(e, t), e = t.pendingProps;
				var a = Hi(t, zi.current);
				Va(t, n), a = Oo(null, t, i, e, a, n);
				var o = ko();
				return t.flags |= 1, typeof a == "object" && a && typeof a.render == "function" && a.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Ui(i) ? (o = !0, qi(t)) : o = !1, t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, Ja(t), a.updater = gs, t.stateNode = a, a._reactInternals = t, bs(t, i, e, n), t = Bs(null, t, i, !0, o, n)) : (t.tag = 0, ga && o && fa(t), Ms(null, t, a, n), t = t.child), t;
			case 16:
				i = t.elementType;
				a: {
					switch (Qs(e, t), e = t.pendingProps, a = i._init, i = a(i._payload), t.type = i, a = t.tag = Jl(i), e = ms(i, e), a) {
						case 0:
							t = Rs(null, t, i, e, n);
							break a;
						case 1:
							t = zs(null, t, i, e, n);
							break a;
						case 11:
							t = Ns(null, t, i, e, n);
							break a;
						case 14:
							t = Ps(null, t, i, ms(i.type, e), n);
							break a;
					}
					throw Error(r(306, i, ""));
				}
				return t;
			case 0: return i = t.type, a = t.pendingProps, a = t.elementType === i ? a : ms(i, a), Rs(e, t, i, a, n);
			case 1: return i = t.type, a = t.pendingProps, a = t.elementType === i ? a : ms(i, a), zs(e, t, i, a, n);
			case 3:
				a: {
					if (Vs(t), e === null) throw Error(r(387));
					i = t.pendingProps, o = t.memoizedState, a = o.element, Ya(e, t), eo(t, i, null, n);
					var s = t.memoizedState;
					if (i = s.element, o.isDehydrated) {
						if (o = {
							element: i,
							isDehydrated: !1,
							cache: s.cache,
							pendingSuspenseBoundaries: s.pendingSuspenseBoundaries,
							transitions: s.transitions
						}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
							a = xs(Error(r(423)), t), t = Hs(e, t, i, n, a);
							break a;
						}
						if (i !== a) {
							a = xs(Error(r(424)), t), t = Hs(e, t, i, n, a);
							break a;
						}
						for (ha = bi(t.stateNode.containerInfo.firstChild), ma = t, ga = !0, _a = null, n = Na(t, null, i, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					} else {
						if (Ta(), i === a) {
							t = $s(e, t, n);
							break a;
						}
						Ms(e, t, i, n);
					}
					t = t.child;
				}
				return t;
			case 5: return lo(t), e === null && xa(t), i = t.type, a = t.pendingProps, o = e === null ? null : e.memoizedProps, s = a.children, pi(i, a) ? s = null : o !== null && pi(i, o) && (t.flags |= 32), Ls(e, t), Ms(e, t, s, n), t.child;
			case 6: return e === null && xa(t), null;
			case 13: return Gs(e, t, n);
			case 4: return so(t, t.stateNode.containerInfo), i = t.pendingProps, e === null ? t.child = Ma(t, null, i, n) : Ms(e, t, i, n), t.child;
			case 11: return i = t.type, a = t.pendingProps, a = t.elementType === i ? a : ms(i, a), Ns(e, t, i, a, n);
			case 7: return Ms(e, t, t.pendingProps, n), t.child;
			case 8: return Ms(e, t, t.pendingProps.children, n), t.child;
			case 12: return Ms(e, t, t.pendingProps.children, n), t.child;
			case 10:
				a: {
					if (i = t.type._context, a = t.pendingProps, o = t.memoizedProps, s = a.value, Li(Pa, i._currentValue), i._currentValue = s, o !== null) {
						if (vr(o.value, s)) {
							if (o.children === a.children && !Bi.current) {
								t = $s(e, t, n);
								break a;
							}
						} else for (o = t.child, o !== null && (o.return = t); o !== null;) {
							var c = o.dependencies;
							if (c !== null) {
								s = o.child;
								for (var l = c.firstContext; l !== null;) {
									if (l.context === i) {
										if (o.tag === 1) {
											l = Xa(-1, n & -n), l.tag = 2;
											var u = o.updateQueue;
											if (u !== null) {
												u = u.shared;
												var d = u.pending;
												d === null ? l.next = l : (l.next = d.next, d.next = l), u.pending = l;
											}
										}
										o.lanes |= n, l = o.alternate, l !== null && (l.lanes |= n), Ba(o.return, n, t), c.lanes |= n;
										break;
									}
									l = l.next;
								}
							} else if (o.tag === 10) s = o.type === t.type ? null : o.child;
							else if (o.tag === 18) {
								if (s = o.return, s === null) throw Error(r(341));
								s.lanes |= n, c = s.alternate, c !== null && (c.lanes |= n), Ba(s, n, t), s = o.sibling;
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
					Ms(e, t, a.children, n), t = t.child;
				}
				return t;
			case 9: return a = t.type, i = t.pendingProps.children, Va(t, n), a = Ha(a), i = i(a), t.flags |= 1, Ms(e, t, i, n), t.child;
			case 14: return i = t.type, a = ms(i, t.pendingProps), a = ms(i.type, a), Ps(e, t, i, a, n);
			case 15: return Fs(e, t, t.type, t.pendingProps, n);
			case 17: return i = t.type, a = t.pendingProps, a = t.elementType === i ? a : ms(i, a), Qs(e, t), t.tag = 1, Ui(i) ? (e = !0, qi(t)) : e = !1, Va(t, n), vs(t, i, a), bs(t, i, a, n), Bs(null, t, i, !0, e, n);
			case 19: return Zs(e, t, n);
			case 22: return Is(e, t, n);
		}
		throw Error(r(156, t.tag));
	};
	function Wl(e, t) {
		return tt(e, t);
	}
	function Gl(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function Kl(e, t, n, r) {
		return new Gl(e, t, n, r);
	}
	function ql(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function Jl(e) {
		if (typeof e == "function") return +!!ql(e);
		if (e != null) {
			if (e = e.$$typeof, e === j) return 11;
			if (e === P) return 14;
		}
		return 2;
	}
	function Yl(e, t) {
		var n = e.alternate;
		return n === null ? (n = Kl(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
	}
	function Xl(e, t, n, i, a, o) {
		var s = 2;
		if (i = e, typeof e == "function") ql(e) && (s = 1);
		else if (typeof e == "string") s = 5;
		else a: switch (e) {
			case E: return Zl(n.children, a, o, t);
			case D:
				s = 8, a |= 8;
				break;
			case O: return e = Kl(12, n, t, a | 2), e.elementType = O, e.lanes = o, e;
			case M: return e = Kl(13, n, t, a), e.elementType = M, e.lanes = o, e;
			case N: return e = Kl(19, n, t, a), e.elementType = N, e.lanes = o, e;
			case I: return Ql(n, a, o, t);
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
		return t = Kl(s, n, t, a), t.elementType = e, t.type = i, t.lanes = o, t;
	}
	function Zl(e, t, n, r) {
		return e = Kl(7, e, r, t), e.lanes = n, e;
	}
	function Ql(e, t, n, r) {
		return e = Kl(22, e, r, t), e.elementType = I, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
	}
	function $l(e, t, n) {
		return e = Kl(6, e, null, t), e.lanes = n, e;
	}
	function eu(e, t, n) {
		return t = Kl(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	function tu(e, t, n, r, i) {
		this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Dt(0), this.expirationTimes = Dt(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Dt(0), this.identifierPrefix = r, this.onRecoverableError = i, this.mutableSourceEagerHydrationData = null;
	}
	function nu(e, t, n, r, i, a, o, s, c) {
		return e = new tu(e, t, n, s, c), t === 1 ? (t = 1, !0 === a && (t |= 8)) : t = 0, a = Kl(3, null, null, t), e.current = a, a.stateNode = e, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: null,
			transitions: null,
			pendingSuspenseBoundaries: null
		}, Ja(a), e;
	}
	function ru(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: T,
			key: r == null ? null : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	function iu(e) {
		if (!e) return Ri;
		e = e._reactInternals;
		a: {
			if (Ye(e) !== e || e.tag !== 1) throw Error(r(170));
			var t = e;
			do {
				switch (t.tag) {
					case 3:
						t = t.stateNode.context;
						break a;
					case 1: if (Ui(t.type)) {
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
			if (Ui(n)) return Ki(e, n, t);
		}
		return t;
	}
	function au(e, t, n, r, i, a, o, s, c) {
		return e = nu(n, r, !0, e, i, a, o, s, c), e.context = iu(null), n = e.current, r = fl(), i = pl(n), a = Xa(r, i), a.callback = t ?? null, Za(n, a, i), e.current.lanes = i, Z(e, i, r), hl(e, r), e;
	}
	function ou(e, t, n, r) {
		var i = t.current, a = fl(), o = pl(i);
		return n = iu(n), t.context === null ? t.context = n : t.pendingContext = n, t = Xa(a, o), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = Za(i, t, o), e !== null && (ml(e, i, o, a), Qa(e, i, o)), o;
	}
	function su(e) {
		if (e = e.current, !e.child) return null;
		switch (e.child.tag) {
			case 5: return e.child.stateNode;
			default: return e.child.stateNode;
		}
	}
	function cu(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function lu(e, t) {
		cu(e, t), (e = e.alternate) && cu(e, t);
	}
	function uu() {
		return null;
	}
	var du = typeof reportError == "function" ? reportError : function(e) {
		console.error(e);
	};
	function fu(e) {
		this._internalRoot = e;
	}
	pu.prototype.render = fu.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(r(409));
		ou(e, t, null, null);
	}, pu.prototype.unmount = fu.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			Cl(function() {
				ou(null, e, null, null);
			}), t[Ti] = null;
		}
	};
	function pu(e) {
		this._internalRoot = e;
	}
	pu.prototype.unstable_scheduleHydration = function(e) {
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
	function mu(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function hu(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
	}
	function gu() {}
	function _u(e, t, n, r, i) {
		if (i) {
			if (typeof r == "function") {
				var a = r;
				r = function() {
					var e = su(o);
					a.call(e);
				};
			}
			var o = au(t, r, e, 0, null, !1, !1, "", gu);
			return e._reactRootContainer = o, e[Ti] = o.current, $r(e.nodeType === 8 ? e.parentNode : e), Cl(), o;
		}
		for (; i = e.lastChild;) e.removeChild(i);
		if (typeof r == "function") {
			var s = r;
			r = function() {
				var e = su(c);
				s.call(e);
			};
		}
		var c = nu(e, 0, !1, null, null, !1, !1, "", gu);
		return e._reactRootContainer = c, e[Ti] = c.current, $r(e.nodeType === 8 ? e.parentNode : e), Cl(function() {
			ou(t, c, n, r);
		}), c;
	}
	function vu(e, t, n, r, i) {
		var a = n._reactRootContainer;
		if (a) {
			var o = a;
			if (typeof i == "function") {
				var s = i;
				i = function() {
					var e = su(o);
					s.call(e);
				};
			}
			ou(t, o, e, i);
		} else o = _u(n, t, e, i, r);
		return su(o);
	}
	Mt = function(e) {
		switch (e.tag) {
			case 3:
				var t = e.stateNode;
				if (t.current.memoizedState.isDehydrated) {
					var n = xt(t.pendingLanes);
					n !== 0 && (kt(t, n | 1), hl(t, at()), !(Bc & 6) && (el = at() + 500, ea()));
				}
				break;
			case 13: Cl(function() {
				var t = Ka(e, 1);
				t !== null && ml(t, e, 1, fl());
			}), lu(e, 1);
		}
	}, Nt = function(e) {
		if (e.tag === 13) {
			var t = Ka(e, 134217728);
			t !== null && ml(t, e, 134217728, fl()), lu(e, 134217728);
		}
	}, Pt = function(e) {
		if (e.tag === 13) {
			var t = pl(e), n = Ka(e, t);
			n !== null && ml(n, e, t, fl()), lu(e, t);
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
				if (q(e, n), t = n.name, n.type === "radio" && t != null) {
					for (n = e; n.parentNode;) n = n.parentNode;
					for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + "][type=\"radio\"]"), t = 0; t < n.length; t++) {
						var i = n[t];
						if (i !== e && i.form === e.form) {
							var a = Mi(i);
							if (!a) throw Error(r(90));
							G(i), q(i, a);
						}
					}
				}
				break;
			case "textarea":
				J(e, n);
				break;
			case "select": t = n.value, t != null && fe(e, !!n.multiple, t, !1);
		}
	}, Pe = Sl, Fe = Cl;
	var yu = {
		usingClientEntryPoint: !1,
		Events: [
			Ai,
			ji,
			Mi,
			Me,
			Ne,
			Sl
		]
	}, bu = {
		findFiberByHostInstance: ki,
		bundleType: 0,
		version: "18.3.1",
		rendererPackageName: "react-dom"
	}, xu = {
		bundleType: bu.bundleType,
		version: bu.version,
		rendererPackageName: bu.rendererPackageName,
		rendererConfig: bu.rendererConfig,
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
		findFiberByHostInstance: bu.findFiberByHostInstance || uu,
		findHostInstancesForRefresh: null,
		scheduleRefresh: null,
		scheduleRoot: null,
		setRefreshHandler: null,
		getCurrentFiber: null,
		reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var Su = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!Su.isDisabled && Su.supportsFiber) try {
			ft = Su.inject(xu), pt = Su;
		} catch {}
	}
	e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = yu, e.createPortal = function(e, t) {
		var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!mu(t)) throw Error(r(200));
		return ru(e, t, null, n);
	}, e.createRoot = function(e, t) {
		if (!mu(e)) throw Error(r(299));
		var n = !1, i = "", a = du;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onRecoverableError !== void 0 && (a = t.onRecoverableError)), t = nu(e, 1, !1, null, null, n, !1, i, a), e[Ti] = t.current, $r(e.nodeType === 8 ? e.parentNode : e), new fu(t);
	}, e.findDOMNode = function(e) {
		if (e == null) return null;
		if (e.nodeType === 1) return e;
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(r(188)) : (e = Object.keys(e).join(","), Error(r(268, e)));
		return e = $e(t), e = e === null ? null : e.stateNode, e;
	}, e.flushSync = function(e) {
		return Cl(e);
	}, e.hydrate = function(e, t, n) {
		if (!hu(t)) throw Error(r(200));
		return vu(null, e, t, !0, n);
	}, e.hydrateRoot = function(e, t, n) {
		if (!mu(e)) throw Error(r(405));
		var i = n != null && n.hydratedSources || null, a = !1, o = "", s = du;
		if (n != null && (!0 === n.unstable_strictMode && (a = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (s = n.onRecoverableError)), t = au(t, null, e, 1, n ?? null, a, !1, o, s), e[Ti] = t.current, $r(e), i) for (e = 0; e < i.length; e++) n = i[e], a = n._getVersion, a = a(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, a] : t.mutableSourceEagerHydrationData.push(n, a);
		return new pu(t);
	}, e.render = function(e, t, n) {
		if (!hu(t)) throw Error(r(200));
		return vu(null, e, t, !1, n);
	}, e.unmountComponentAtNode = function(e) {
		if (!hu(e)) throw Error(r(40));
		return e._reactRootContainer ? (Cl(function() {
			vu(null, null, e, !1, function() {
				e._reactRootContainer = null, e[Ti] = null;
			});
		}), !0) : !1;
	}, e.unstable_batchedUpdates = Sl, e.unstable_renderSubtreeIntoContainer = function(e, t, n, i) {
		if (!hu(n)) throw Error(r(200));
		if (e == null || e._reactInternals === void 0) throw Error(r(38));
		return vu(e, t, n, !1, i);
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
}, x = (e, t) => {
	b((t) => {
		if (!t) return e();
	}, t);
}, S = (e) => {
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
function C(e, t) {
	let [n, r] = (0, g.useState)(e), i = t === void 0 ? n : t;
	return b((e) => {
		e || r(t);
	}, [t]), [i, r];
}
// node_modules/@rc-component/util/es/raf.js
var w = (e) => +setTimeout(e, 16), T = (e) => clearTimeout(e);
typeof window < "u" && "requestAnimationFrame" in window && (w = (e) => window.requestAnimationFrame(e), T = (e) => window.cancelAnimationFrame(e));
var E = 0, D = /* @__PURE__ */ new Map();
function O(e) {
	D.delete(e);
}
var k = (e, t = 1) => {
	E += 1;
	let n = E;
	function r(t) {
		if (t === 0) O(n), e();
		else {
			let e = w(() => {
				r(t - 1);
			});
			D.set(n, e);
		}
	}
	return r(t), n;
};
k.cancel = (e) => {
	let t = D.get(e);
	return O(e), T(t);
};
// node_modules/@rc-component/util/es/hooks/useDelayState.js
function A(e) {
	let [t, n] = g.useState(e), r = g.useRef(null), i = _(() => {
		if (r.current) {
			let [e, t] = r.current;
			e ? k.cancel(t) : clearTimeout(t), r.current = null;
		}
	});
	return g.useEffect(() => i, [i]), [t, _((e, t) => {
		let a = t || { frame: 1 };
		i(), a === !0 ? n(e) : "ms" in a ? r.current = [!1, setTimeout(() => n(e), a.ms)] : r.current = [!0, k(() => n(e), a.frame)];
	})];
}
// node_modules/@rc-component/util/es/hooks/useId.js
function j() {
	return { ...g }.useId;
}
var M = 0, N = j(), P = N ? function(e) {
	let t = N();
	return e || t;
} : function(e) {
	let [t, n] = g.useState("ssr-id");
	return g.useEffect(() => {
		let e = M;
		M += 1, n(`rc_unique_${e}`);
	}, []), e || t;
};
// node_modules/@rc-component/util/es/hooks/useMemo.js
function F(e, t, n) {
	let r = g.useRef({});
	return (!("value" in r.current) || n(r.current.condition, t)) && (r.current.value = e(), r.current.condition = t), r.current.value;
}
// node_modules/@rc-component/util/es/hooks/useSyncState.js
function I(e) {
	let [, t] = g.useReducer((e) => e + 1, 0), n = g.useRef(e);
	return [_(() => n.current), _((e) => {
		n.current = typeof e == "function" ? e(n.current) : e, t();
	})];
}
// node_modules/react-is/cjs/react-is.production.js
var L = /* @__PURE__ */ o(((e) => {
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
})), R = /* @__PURE__ */ o(((e, t) => {
	t.exports = L();
})), z = Symbol.for("react.element"), B = Symbol.for("react.transitional.element"), V = Symbol.for("react.fragment");
function H(e) {
	return e && typeof e == "object" && (e.$$typeof === z || e.$$typeof === B) && e.type === V;
}
// node_modules/@rc-component/util/es/ref.js
var U = R(), W = Number(g.version?.split(".")[0]), ee = (e, t) => {
	typeof e == "function" ? e(t) : typeof e == "object" && e && "current" in e && (e.current = t);
}, te = (...e) => {
	let t = e.filter(Boolean);
	return t.length <= 1 ? t[0] : (t) => {
		e.forEach((e) => {
			ee(e, t);
		});
	};
}, ne = (...e) => F(() => te(...e), e, (e, t) => e.length !== t.length || e.every((e, n) => e !== t[n])), re = (e) => {
	if (!e) return !1;
	if (ie(e) && W >= 19) return !0;
	let t = (0, U.isMemo)(e) ? e.type.type : e.type;
	return !(typeof t == "function" && !t.prototype?.render && t.$$typeof !== U.ForwardRef || typeof e == "function" && !e.prototype?.render && e.$$typeof !== U.ForwardRef);
};
function ie(e) {
	return /*#__PURE__*/ (0, g.isValidElement)(e) && !H(e);
}
var ae = (e) => ie(e) && re(e), G = (e) => {
	if (e && ie(e)) {
		let t = e;
		return t.props.propertyIsEnumerable("ref") ? t.props.ref : t.ref;
	}
	return null;
};
// node_modules/@rc-component/util/es/Dom/contains.js
function K(e, t) {
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
var oe = "data-rc-order", se = "data-rc-priority", ce = "rc-util-key", q = /* @__PURE__ */ new Map();
function le({ mark: e } = {}) {
	return e ? e.startsWith("data-") ? e : `data-${e}` : ce;
}
function ue(e) {
	return e.attachTo ? e.attachTo : document.querySelector("head") || document.body;
}
function de(e) {
	return e === "queue" ? "prependQueue" : e ? "prepend" : "append";
}
function fe(e) {
	return e ? Array.from((q.get(e) || e).children).filter((e) => e.tagName === "STYLE") : [];
}
function pe(e, t = {}) {
	if (!v()) return null;
	let { csp: n, prepend: r, priority: i = 0 } = t, a = de(r), o = a === "prependQueue", s = document.createElement("style");
	s.setAttribute(oe, a), o && i && s.setAttribute(se, `${i}`), n?.nonce && (s.nonce = n?.nonce), s.innerHTML = e;
	let c = ue(t);
	if (!c) return null;
	let { firstChild: l } = c;
	if (r) {
		if (o) {
			let e = (t.styles || fe(c)).filter((e) => {
				if (!["prepend", "prependQueue"].includes(e.getAttribute(oe))) return !1;
				let t = Number(e.getAttribute(se) || 0);
				return i >= t;
			});
			if (e.length) return c.insertBefore(s, e[e.length - 1].nextSibling), s;
		}
		c.insertBefore(s, l);
	} else c.appendChild(s);
	return s;
}
function me(e, t = {}) {
	let { styles: n } = t;
	return n ||= fe(ue(t)), n.find((n) => n.getAttribute(le(t)) === e);
}
function J(e, t = {}) {
	let n = me(e, t);
	n && ue(t)?.removeChild(n);
}
function Y(e, t) {
	let n = q.get(e);
	if (!n || !K(document, n)) {
		let n = pe("", t);
		if (!n) return;
		let { parentNode: r } = n;
		q.set(e, r), e.removeChild(n);
	}
}
function he(e, t, n = {}) {
	let r = ue(n);
	if (!r) return null;
	let i = fe(r), a = {
		...n,
		styles: i
	};
	Y(r, a);
	let o = me(t, a);
	if (o) return a.csp?.nonce && o.nonce !== a.csp?.nonce && (o.nonce = a.csp?.nonce), o.innerHTML !== e && (o.innerHTML = e), o;
	let s = pe(e, a);
	return s ? (s.setAttribute(le(a), t), s) : null;
}
// node_modules/@rc-component/util/es/Dom/findDOMNode.js
function ge(e) {
	return e instanceof HTMLElement || e instanceof SVGElement;
}
function _e(e) {
	return e && typeof e == "object" && ge(e.nativeElement) ? e.nativeElement : ge(e) ? e : null;
}
// node_modules/@rc-component/util/es/Dom/isVisible.js
var ve = ((e) => {
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
// node_modules/@rc-component/util/es/Dom/focus.js
function ye(e, t = !1) {
	if (ve(e)) {
		let n = e.nodeName.toLowerCase(), r = [
			"input",
			"select",
			"textarea",
			"button"
		].includes(n) || e.isContentEditable || n === "a" && !!e.getAttribute("href"), i = e.getAttribute("tabindex"), a = Number(i), o = null;
		return i && !Number.isNaN(a) ? o = a : r && o === null && (o = 0), r && e.disabled && (o = null), o !== null && (o >= 0 || t && o < 0);
	}
	return !1;
}
function be(e, t = !1) {
	let n = [...e.querySelectorAll("*")].filter((e) => ye(e, t));
	return ye(e, t) && n.unshift(e), n;
}
// node_modules/@rc-component/util/es/Dom/shadow.js
function xe(e) {
	return e?.getRootNode?.();
}
function Se(e) {
	return xe(e) instanceof ShadowRoot;
}
function Ce(e) {
	return Se(e) ? xe(e) : null;
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
function we(e) {
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
			he(`
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
	return document.body.removeChild(n), J(t), {
		width: o,
		height: s
	};
}
function Te(e) {
	return typeof document > "u" || !e || !(e instanceof Element) ? {
		width: 0,
		height: 0
	} : we(e);
}
// node_modules/@rc-component/util/es/warning.js
var Ee = {}, De = [], Oe = (e) => {
	De.push(e);
};
function ke(e, t) {}
function Ae(e, t) {}
function je() {
	Ee = {};
}
function Me(e, t, n) {
	!t && !Ee[n] && (e(!1, n), Ee[n] = !0);
}
function Ne(e, t) {
	Me(ke, e, t);
}
function Pe(e, t) {
	Me(Ae, e, t);
}
Ne.preMessage = Oe, Ne.resetWarned = je, Ne.noteOnce = Pe;
// node_modules/@rc-component/util/es/isEqual.js
function Fe(e, t, n = !1) {
	let r = /* @__PURE__ */ new Set();
	function i(e, t, a = 1) {
		let o = r.has(e);
		if (Ne(!o, "Warning: There may be circular references"), o) return !1;
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
function Ie(e) {
	return e != null;
}
function Le(e) {
	return Ie(e) && e !== !1 && e !== "";
}
// node_modules/@rc-component/util/es/isMobile.js
var Re = /* @__PURE__ */ c((/* @__PURE__ */ o(((e, t) => {
	t.exports = a, t.exports.isMobile = a, t.exports.default = a;
	var n = /(android|bb\d+|meego).+mobile|armv7l|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|redmi|series[46]0|samsungbrowser.*mobile|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i, r = /CrOS/, i = /android|ipad|playbook|silk/i;
	function a(e) {
		e ||= {};
		let t = e.ua;
		if (!t && typeof navigator < "u" && (t = navigator.userAgent), t && t.headers && typeof t.headers["user-agent"] == "string" && (t = t.headers["user-agent"]), typeof t != "string") return !1;
		let a = n.test(t) && !r.test(t) || !!e.tablet && i.test(t);
		return !a && e.tablet && e.featureDetect && navigator && navigator.maxTouchPoints > 1 && t.indexOf("Macintosh") !== -1 && t.indexOf("Safari") !== -1 && (a = !0), a;
	}
})))()), ze, Be = () => (ze === void 0 && (ze = (0, Re.default)()), ze);
// node_modules/@rc-component/util/es/omit.js
function Ve(e, t) {
	let n = Object.assign({}, e);
	return Array.isArray(t) && t.forEach((e) => {
		delete n[e];
	}), n;
}
// node_modules/@rc-component/util/es/pickAttrs.js
var He = "accept acceptCharset accessKey action allowFullScreen allowTransparency\n    alt async autoComplete autoFocus autoPlay capture cellPadding cellSpacing challenge\n    charSet checked classID className colSpan cols content contentEditable contextMenu\n    controls coords crossOrigin data dateTime default defer dir disabled download draggable\n    encType form formAction formEncType formMethod formNoValidate formTarget frameBorder\n    headers height hidden high href hrefLang htmlFor httpEquiv icon id inputMode integrity\n    is keyParams keyType kind label lang list loop low manifest marginHeight marginWidth max maxLength media\n    mediaGroup method min minLength multiple muted name noValidate nonce open\n    optimum pattern placeholder poster preload radioGroup readOnly rel required\n    reversed role rowSpan rows sandbox scope scoped scrolling seamless selected\n    shape size sizes span spellCheck src srcDoc srcLang srcSet start step style\n    summary tabIndex target title type useMap value width wmode wrap onCopy onCut onPaste onCompositionEnd onCompositionStart onCompositionUpdate onKeyDown\n    onKeyPress onKeyUp onFocus onBlur onChange onInput onSubmit onClick onContextMenu onDoubleClick\n    onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown\n    onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onSelect onTouchCancel\n    onTouchEnd onTouchMove onTouchStart onScroll onWheel onAbort onCanPlay onCanPlayThrough\n    onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata\n    onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting onLoad\n    onPointerDown onPointerMove onPointerUp onPointerCancel onPointerEnter onPointerLeave onPointerOver onPointerOut onGotPointerCapture onLostPointerCapture\n    onAnimationStart onAnimationEnd onAnimationIteration\n    onTransitionEnd onTransitionRun onTransitionStart onTransitionCancel\n    onBeforeInput onReset onInvalid\n    onAuxClick onToggle onBeforeToggle onCancel onClose onResize onScrollEnd".split(/[\s\n]+/), Ue = "aria-", We = "data-";
function Ge(e, t) {
	return e.indexOf(t) === 0;
}
function Ke(e, t = !1) {
	let n;
	n = t === !1 ? {
		aria: !0,
		data: !0,
		attr: !0
	} : t === !0 ? { aria: !0 } : { ...t };
	let r = {};
	return Object.keys(e).forEach((t) => {
		(n.aria && (t === "role" || Ge(t, Ue)) || n.data && Ge(t, We) || n.attr && He.includes(t)) && (r[t] = e[t]);
	}), r;
}
// node_modules/@rc-component/util/es/Children/toArray.js
function qe(e, t = {}) {
	let n = [];
	return g.Children.forEach(e, (e) => {
		(e != null || t.keepEmpty) && (Array.isArray(e) ? n = n.concat(qe(e)) : H(e) && e.props ? n = n.concat(qe(e.props.children, t)) : n.push(e));
	}), n;
}
// node_modules/@rc-component/util/es/mergeProps.js
function Je(...e) {
	let t = {};
	for (let n of e) if (n) for (let e of Object.keys(n)) n[e] !== void 0 && (t[e] = n[e]);
	return t;
}
// node_modules/@rc-component/util/es/utils/get.js
function Ye(e, t) {
	let n = e;
	for (let e = 0; e < t.length; e += 1) {
		if (n == null) return;
		n = n[t[e]];
	}
	return n;
}
// node_modules/@rc-component/util/es/utils/set.js
function Xe(e, t, n, r) {
	if (!t.length) return n;
	let [i, ...a] = t, o;
	if (o = !e && typeof i == "number" ? [] : Array.isArray(e) ? [...e] : { ...e }, r && n === void 0 && a.length === 1) {
		let e = o[i];
		if (e && typeof e == "object") {
			let t = Array.isArray(e) ? [...e] : { ...e };
			delete t[a[0]], o[i] = t;
		}
	} else o[i] = Xe(o[i], a, n, r);
	return o;
}
function Ze(e, t, n, r = !1) {
	return t.length && r && n === void 0 && !Ye(e, t.slice(0, -1)) ? e : Xe(e, t, n, r);
}
function Qe(e) {
	return typeof e == "object" && !!e && Object.getPrototypeOf(e) === Object.prototype;
}
function $e(e) {
	return Array.isArray(e) ? [] : {};
}
var et = typeof Reflect > "u" ? Object.keys : Reflect.ownKeys;
function tt(e, t = {}) {
	let { prepareArray: n } = t, r = n || (() => []), i = $e(e[0]);
	return e.forEach((e) => {
		function t(n, a) {
			let o = new Set(a), s = Ye(e, n), c = Array.isArray(s);
			if (c || Qe(s)) {
				if (!o.has(s)) {
					o.add(s);
					let e = Ye(i, n);
					c ? i = Ze(i, n, r(e, s)) : e && typeof e == "object" || (i = Ze(i, n, $e(s))), et(s).forEach((e) => {
						Object.getOwnPropertyDescriptor(s, e).enumerable && t([...n, e], o);
					});
				}
			} else i = Ze(i, n, s);
		}
		t([]);
	}), i;
}
function nt(...e) {
	return tt(e);
}
// node_modules/@rc-component/util/es/React/render.js
var rt = h(), it = "__rc_react_root__";
function at(e, t) {
	let n = t[it] || (0, rt.createRoot)(t);
	n.render(e), t[it] = n;
}
async function ot(e) {
	return Promise.resolve().then(() => {
		e[it]?.unmount(), delete e[it];
	});
}
// node_modules/@rc-component/util/es/Portal.js
var st = /* @__PURE__ */ c(m());
// node_modules/antd/es/_util/warning.js
function ct() {}
var { resetWarned: lt } = Ne, ut = /*#__PURE__*/ g.createContext({}), dt = () => {
	let e = () => {};
	return e.deprecated = ct, e;
}, ft = /*#__PURE__*/ g.createContext(null);
function pt({ children: e, onBatchResize: t }) {
	let n = g.useRef(0), r = g.useRef([]), i = g.useContext(ft), a = g.useCallback((e, a, o) => {
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
	return /*#__PURE__*/ g.createElement(ft.Provider, { value: a }, e);
}
// node_modules/@rc-component/resize-observer/es/utils/observerUtil.js
var mt = /* @__PURE__ */ new Map();
function ht(e) {
	e.forEach((e) => {
		let { target: t } = e;
		mt.get(t)?.forEach((e) => e(t));
	});
}
var gt;
function _t() {
	return gt ||= new ResizeObserver(ht), gt;
}
function vt(e, t) {
	mt.has(e) || (mt.set(e, /* @__PURE__ */ new Set()), _t().observe(e)), mt.get(e).add(t);
}
function yt(e, t) {
	mt.has(e) && (mt.get(e).delete(t), mt.get(e).size || (_t().unobserve(e), mt.delete(e)));
}
// node_modules/@rc-component/resize-observer/es/useResizeObserver.js
function bt(e, t, n, r) {
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
		return n && e ? vt(n, a) : e && o && (s.current += 1), () => {
			n && yt(n, a);
		};
	}, [e, o ? s.current : t]);
}
// node_modules/@rc-component/resize-observer/es/SingleObserver/index.js
function xt(e, t) {
	let { children: n, disabled: r, onResize: i, data: a } = e, o = g.useRef(null), s = g.useContext(ft), c = typeof n == "function", l = c ? n(o) : n, u = !c && /*#__PURE__*/ g.isValidElement(l) && re(l), d = ne(u ? G(l) : null, o), f = () => _e(o.current);
	return g.useImperativeHandle(t, () => f()), bt(!r, f, i, (e, t) => {
		s?.(e, t, a);
	}), u ? /*#__PURE__*/ g.cloneElement(l, { ref: d }) : l;
}
var St = /*#__PURE__*/ g.forwardRef(xt);
// node_modules/@rc-component/resize-observer/es/index.js
function Ct() {
	return Ct = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Ct.apply(this, arguments);
}
var wt = "rc-observer-key";
function Tt(e, t) {
	let { children: n } = e;
	return (typeof n == "function" ? [n] : qe(n)).map((n, r) => {
		let i = n?.key || `${wt}-${r}`;
		return /*#__PURE__*/ g.createElement(St, Ct({}, e, {
			key: i,
			ref: r === 0 ? t : void 0
		}), n);
	});
}
var Et = /*#__PURE__*/ g.forwardRef(Tt);
Et.Collection = pt;
// node_modules/clsx/dist/clsx.mjs
function Dt(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = Dt(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function Z() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = Dt(e)) && (r && (r += " "), r += t);
	return r;
}
// node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function Ot(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
// node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js
function kt(e) {
	if (Array.isArray(e)) return Ot(e);
}
// node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function At(e) {
	if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
// node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
function jt(e, t) {
	if (e) {
		if (typeof e == "string") return Ot(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Ot(e, t) : void 0;
	}
}
// node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function Mt() {
	throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// node_modules/@babel/runtime/helpers/esm/toConsumableArray.js
function Nt(e) {
	return kt(e) || At(e) || jt(e) || Mt();
}
var Pt = "anticon", Ft = [
	"outlined",
	"borderless",
	"filled",
	"underlined"
], It = /*#__PURE__*/ g.createContext({
	getPrefixCls: (e, t) => t || (e ? `ant-${e}` : "ant"),
	iconPrefixCls: Pt
}), { Consumer: Lt } = It, Rt = {};
function zt(e) {
	let t = g.useContext(It), { getPrefixCls: n, direction: r, getPopupContainer: i, renderEmpty: a } = t;
	return {
		classNames: Rt,
		styles: Rt,
		...t[e],
		getPrefixCls: n,
		direction: r,
		getPopupContainer: i,
		renderEmpty: a
	};
}
// node_modules/@emotion/hash/dist/hash.browser.esm.js
function Bt(e) {
	for (var t = 0, n, r = 0, i = e.length; i >= 4; ++r, i -= 4) n = e.charCodeAt(r) & 255 | (e.charCodeAt(++r) & 255) << 8 | (e.charCodeAt(++r) & 255) << 16 | (e.charCodeAt(++r) & 255) << 24, n = (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16), n ^= n >>> 24, t = (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16) ^ (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
	switch (i) {
		case 3: t ^= (e.charCodeAt(r + 2) & 255) << 16;
		case 2: t ^= (e.charCodeAt(r + 1) & 255) << 8;
		case 1: t ^= e.charCodeAt(r) & 255, t = (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
	}
	return t ^= t >>> 13, t = (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), ((t ^ t >>> 15) >>> 0).toString(36);
}
// node_modules/@ant-design/cssinjs/es/Cache.js
var Vt = "%";
function Ht(e) {
	return e.join(Vt);
}
var Ut = 0, Wt = class {
	instanceId;
	constructor(e) {
		this.instanceId = e;
	}
	cache = /* @__PURE__ */ new Map();
	updateTimes = /* @__PURE__ */ new Map();
	extracted = /* @__PURE__ */ new Set();
	get(e) {
		return this.opGet(Ht(e));
	}
	opGet(e) {
		return this.cache.get(e) || null;
	}
	update(e, t) {
		return this.opUpdate(Ht(e), t);
	}
	opUpdate(e, t) {
		let n = t(this.cache.get(e));
		n === null ? (this.cache.delete(e), this.updateTimes.delete(e)) : (this.cache.set(e, n), this.updateTimes.set(e, Ut), Ut += 1);
	}
}, Gt = "data-token-hash", Kt = "data-css-hash", qt = "__cssinjs_instance__";
function Jt() {
	let e = Math.random().toString(12).slice(2);
	if (typeof document < "u" && document.head && document.body) {
		let t = document.body.querySelectorAll("style[data-css-hash]") || [], { firstChild: n } = document.head;
		Array.from(t).forEach((t) => {
			t[qt] ||= e, t.__cssinjs_instance__ === e && document.head.insertBefore(t, n);
		});
		let r = {};
		Array.from(document.querySelectorAll(`style[${Kt}]`)).forEach((t) => {
			let n = t.getAttribute(Kt);
			r[n] ? t.__cssinjs_instance__ === e && t.parentNode?.removeChild(t) : r[n] = !0;
		});
	}
	return new Wt(e);
}
var Yt = /*#__PURE__*/ g.createContext({
	hashPriority: "low",
	cache: Jt(),
	defaultCache: !0,
	autoPrefix: !1
});
// node_modules/@ant-design/cssinjs/es/theme/ThemeCache.js
function Xt(e, t) {
	if (e.length !== t.length) return !1;
	for (let n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;
	return !0;
}
var Zt = class e {
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
		if (this.has(e)) return this.keys = this.keys.filter((t) => !Xt(t, e)), this.deleteByPath(this.cache, e);
	}
}, Qt = 0, $t = class {
	derivatives;
	id;
	constructor(e) {
		this.derivatives = Array.isArray(e) ? e : [e], this.id = Qt, e.length === 0 && e.length, Qt += 1;
	}
	getDerivativeToken(e) {
		return this.derivatives.reduce((t, n) => n(e, t), void 0);
	}
}, en = new Zt();
function tn(e) {
	let t = Array.isArray(e) ? e : [e];
	return en.has(t) || en.set(t, new $t(t)), en.get(t);
}
// node_modules/@ant-design/cssinjs/es/util/index.js
var nn = /* @__PURE__ */ new WeakMap(), rn = {};
function an(e, t) {
	let n = nn;
	for (let e = 0; e < t.length; e += 1) {
		let r = t[e];
		n.has(r) || n.set(r, /* @__PURE__ */ new WeakMap()), n = n.get(r);
	}
	return n.has(rn) || n.set(rn, e()), n.get(rn);
}
var on = /* @__PURE__ */ new WeakMap();
function sn(e) {
	let t = on.get(e) || "";
	return t || (Object.keys(e).forEach((n) => {
		let r = e[n];
		t += n, r instanceof $t ? t += r.id : t += r && typeof r == "object" ? sn(r) : r;
	}), t = Bt(t), on.set(e, t)), t;
}
function cn(e, t) {
	return Bt(`${t}_${sn(e)}`);
}
`random-${Date.now()}-${Math.random()}`.replace(/\./g, "");
var ln = v();
function Q(e) {
	return typeof e == "number" ? `${e}px` : e;
}
function un(e) {
	let { hashCls: t, hashPriority: n = "low" } = e || {};
	if (!t) return "";
	let r = `.${t}`;
	return n === "low" ? `:where(${r})` : r;
}
var dn = (e) => e != null;
function fn(e, t) {
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
var pn = (e, t = "") => `--${t ? `${t}-` : ""}${e}`.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, "$1-$2").replace(/([a-z])([A-Z0-9])/g, "$1-$2").toLowerCase(), mn = (e, t, n) => {
	let { hashCls: r, hashPriority: i = "low", scope: a } = n || {};
	if (!Object.keys(e).length) return "";
	let o = `${un({
		hashCls: r,
		hashPriority: i
	})}.${t}`, s = [a].flat().filter(Boolean);
	return `${s.length ? s.map((e) => `${o}.${e}`).join(", ") : o}{${Object.entries(e).map(([e, t]) => `${e}:${t};`).join("")}}`;
}, hn = (e, t, n) => {
	let { hashCls: r, hashPriority: i = "low", prefix: a, unitless: o, ignore: s, preserve: c } = n || {}, l = {}, u = {};
	return Object.entries(e).forEach(([e, t]) => {
		if (c?.[e]) u[e] = t;
		else if ((typeof t == "string" || typeof t == "number") && !s?.[e]) {
			let n = pn(e, a);
			l[n] = typeof t == "number" && !o?.[e] ? `${t}px` : String(t), u[e] = `var(${n})`;
		}
	}), [u, mn(l, t, {
		scope: n?.scope,
		hashCls: r,
		hashPriority: i
	})];
}, gn = /* @__PURE__ */ new Map();
function _n(e, t, n, r, i) {
	let { cache: a } = g.useContext(Yt), o = Ht([e, ...t]), s = (e) => {
		a.opUpdate(o, (t) => {
			let [r = 0, i] = t || [void 0, void 0], a = [r, i || n()];
			return e ? e(a) : a;
		});
	};
	g.useMemo(() => {
		s();
	}, [o]);
	let c = a.opGet(o)[1];
	return (0, g.useInsertionEffect)(() => (s(([e, t]) => [e + 1, t]), gn.has(o) || (i?.(c), gn.set(o, !0), Promise.resolve().then(() => {
		gn.delete(o);
	})), () => {
		a.opUpdate(o, (e) => {
			let [t = 0, n] = e || [];
			return t - 1 == 0 ? (r?.(n, !1), gn.delete(o), null) : [t - 1, n];
		});
	}), [o]), c;
}
// node_modules/@ant-design/cssinjs/es/hooks/useCacheToken.js
var vn = {}, yn = "css", bn = /* @__PURE__ */ new Map();
function xn(e) {
	bn.set(e, (bn.get(e) || 0) + 1);
}
function Sn(e, t) {
	typeof document < "u" && document.querySelectorAll(`style[${Gt}="${e}"]`).forEach((e) => {
		e.__cssinjs_instance__ === t && e.parentNode?.removeChild(e);
	});
}
var Cn = -1;
function wn(e, t) {
	bn.set(e, (bn.get(e) || 0) - 1);
	let n = /* @__PURE__ */ new Set();
	bn.forEach((e, t) => {
		e <= 0 && n.add(t);
	}), bn.size - n.size > Cn && n.forEach((e) => {
		Sn(e, t), bn.delete(e);
	});
}
var Tn = (e, t, n, r) => {
	let i = {
		...n.getDerivativeToken(e),
		...t
	};
	return r && (i = r(i)), i;
}, En = "token";
function Dn(e, t, n) {
	let { cache: { instanceId: r }, container: i, hashPriority: a } = (0, g.useContext)(Yt), { salt: o = "", override: s = vn, formatToken: c, getComputedToken: l, cssVar: u, nonce: d } = n, f = an(() => Object.assign({}, ...t), t), p = sn(f), m = sn(s), h = sn(u);
	return _n(En, [
		o,
		e.id,
		p,
		m,
		h
	], () => {
		let t = l ? l(f, s, e) : Tn(f, s, e, c), n = { ...t }, r = `${o}_${u.prefix}`, i = Bt(r), d = `${yn}-${i}`;
		n._tokenKey = cn(n, r);
		let [p, m] = hn(t, u.key, {
			prefix: u.prefix,
			ignore: u.ignore,
			unitless: u.unitless,
			preserve: u.preserve,
			hashPriority: a,
			hashCls: u.hashed ? d : void 0
		});
		return p._hashId = i, xn(u.key), [
			p,
			d,
			n,
			m,
			u.key
		];
	}, ([, , , , e]) => {
		wn(e, r);
	}, ([, , , e, t]) => {
		if (!e) return;
		let n = {
			mark: Kt,
			prepend: "queue",
			attachTo: i,
			priority: -999
		};
		n = fn(n, d);
		let a = he(e, Bt(`css-var-${t}`), n);
		a[qt] = r, a.setAttribute(Gt, t);
	});
}
// node_modules/@emotion/unitless/dist/unitless.browser.esm.js
var On = {
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
}, kn = "-ms-", An = "-moz-", jn = "-webkit-", Mn = "comm", Nn = "rule", Pn = "decl", Fn = "@import", In = "@namespace", Ln = "@keyframes", Rn = "@layer", zn = Math.abs, Bn = String.fromCharCode, Vn = Object.assign;
function Hn(e, t) {
	return qn(e, 0) ^ 45 ? (((t << 2 ^ qn(e, 0)) << 2 ^ qn(e, 1)) << 2 ^ qn(e, 2)) << 2 ^ qn(e, 3) : 0;
}
function Un(e) {
	return e.trim();
}
function Wn(e, t) {
	return (e = t.exec(e)) ? e[0] : e;
}
function Gn(e, t, n) {
	return e.replace(t, n);
}
function Kn(e, t) {
	return e.indexOf(t);
}
function qn(e, t) {
	return e.charCodeAt(t) | 0;
}
function Jn(e, t, n) {
	return e.slice(t, n);
}
function Yn(e) {
	return e.length;
}
function Xn(e) {
	return e.length;
}
function Zn(e, t) {
	return t.push(e), e;
}
function Qn(e, t) {
	return e.map(t).join("");
}
function $n(e, t) {
	return e.filter(function(e) {
		return !Wn(e, t);
	});
}
// node_modules/stylis/src/Tokenizer.js
var er = 1, tr = 1, nr = 0, rr = 0, ir = 0, ar = "";
function or(e, t, n, r, i, a, o, s) {
	return {
		value: e,
		root: t,
		parent: n,
		type: r,
		props: i,
		children: a,
		line: er,
		column: tr,
		length: o,
		return: "",
		siblings: s
	};
}
function sr(e, t) {
	return Vn(or("", null, null, "", null, null, 0, e.siblings), e, { length: -e.length }, t);
}
function cr(e) {
	for (; e.root;) e = sr(e.root, { children: [e] });
	Zn(e, e.siblings);
}
function lr() {
	return ir;
}
function ur() {
	return ir = rr > 0 ? qn(ar, --rr) : 0, tr--, ir === 10 && (tr = 1, er--), ir;
}
function dr() {
	return ir = rr < nr ? qn(ar, rr++) : 0, tr++, ir === 10 && (tr = 1, er++), ir;
}
function fr() {
	return qn(ar, rr);
}
function pr() {
	return rr;
}
function mr(e, t) {
	return Jn(ar, e, t);
}
function hr(e) {
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
function gr(e) {
	return er = tr = 1, nr = Yn(ar = e), rr = 0, [];
}
function _r(e) {
	return ar = "", e;
}
function vr(e) {
	return Un(mr(rr - 1, xr(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function yr(e) {
	for (; (ir = fr()) && ir < 33;) dr();
	return hr(e) > 2 || hr(ir) > 3 ? "" : " ";
}
function br(e, t) {
	for (; --t && dr() && !(ir < 48 || ir > 102 || ir > 57 && ir < 65 || ir > 70 && ir < 97););
	return mr(e, pr() + (t < 6 && fr() == 32 && dr() == 32));
}
function xr(e) {
	for (; dr();) switch (ir) {
		case e: return rr;
		case 34:
		case 39:
			e !== 34 && e !== 39 && xr(ir);
			break;
		case 40:
			e === 41 && xr(e);
			break;
		case 92: dr();
	}
	return rr;
}
function Sr(e, t) {
	for (; dr() && e + ir !== 57 && (e + ir !== 84 || fr() !== 47););
	return "/*" + mr(t, rr - 1) + "*" + Bn(e === 47 ? e : dr());
}
function Cr(e) {
	for (; !hr(fr());) dr();
	return mr(e, rr);
}
// node_modules/stylis/src/Parser.js
function wr(e) {
	return _r(Tr("", null, null, null, [""], e = gr(e), 0, [0], e));
}
function Tr(e, t, n, r, i, a, o, s, c) {
	for (var l = 0, u = 0, d = o, f = 0, p = 0, m = 0, h = 1, g = 1, _ = 1, v = 0, y = 0, b = "", x = i, S = a, C = r, w = b; g;) switch (m = y, y = dr()) {
		case 40:
			m != 108 && qn(w, d - 1) == 58 ? (v++, w += "(") : w += vr(y);
			break;
		case 41:
			v--, w += ")";
			break;
		case 34:
		case 39:
		case 91:
			w += vr(y);
			break;
		case 9:
		case 10:
		case 13:
		case 32:
			if (v > 0) {
				w += Bn(y);
				break;
			}
			w += yr(m);
			break;
		case 92:
			w += br(pr() - 1, 7);
			continue;
		case 47:
			switch (fr()) {
				case 42:
				case 47:
					Zn(Dr(Sr(dr(), pr()), t, n, c), c), (hr(m || 1) == 5 || hr(fr() || 1) == 5) && Yn(w) && Jn(w, -1, void 0) !== " " && (w += " ");
					break;
				default: w += "/";
			}
			break;
		case 123 * h: s[l++] = Yn(w) * _;
		case 125 * h:
		case 59:
		case 0:
			if (v > 0 && y) {
				w += Bn(y);
				break;
			}
			switch (y) {
				case 0:
				case 125: g = 0;
				case 59 + u:
					_ == -1 && (w = Gn(w, /\f/g, "")), p > 0 && (Yn(w) - d || h === 0) && Zn(p > 32 ? Or(w + ";", r, n, d - 1, c) : Or(Gn(w, " ", "") + ";", r, n, d - 2, c), c);
					break;
				case 59: w += ";";
				default: if (Zn(C = Er(w, t, n, l, u, i, s, b, x = [], S = [], d, a), a), y === 123) {
					if (u === 0) Tr(w, t, C, C, x, a, d, s, S);
					else {
						switch (f) {
							case 99: if (qn(w, 3) === 110) break;
							case 108: if (qn(w, 2) === 97) break;
							default: u = 0;
							case 100:
							case 109:
							case 115:
						}
						u ? Tr(e, C, C, r && Zn(Er(e, C, C, 0, 0, i, s, b, i, x = [], d, S), S), i, S, d, s, r ? x : S) : Tr(w, C, C, C, [""], S, 0, s, S);
					}
				}
			}
			l = u = p = 0, h = _ = 1, b = w = "", d = o;
			break;
		case 58: d = 1 + Yn(w), p = m;
		default:
			if (h < 1) {
				if (y == 123) --h;
				else if (y == 125 && h++ == 0 && ur() == 125) continue;
			}
			switch (w += Bn(y), y * h) {
				case 38:
					_ = u > 0 ? 1 : (w += "\f", -1);
					break;
				case 44:
					if (v > 0) break;
					s[l++] = (Yn(w) - 1) * _, _ = 1;
					break;
				case 64:
					fr() === 45 && (w += vr(dr())), f = fr(), u = d = Yn(b = w += Cr(pr())), y++;
					break;
				case 45: m === 45 && Yn(w) == 2 && (h = 0);
			}
	}
	return a;
}
function Er(e, t, n, r, i, a, o, s, c, l, u, d) {
	for (var f = i - 1, p = i === 0 ? a : [""], m = Xn(p), h = 0, g = 0, _ = 0; h < r; ++h) for (var v = 0, y = Jn(e, f + 1, f = zn(g = o[h])), b = e; v < m; ++v) (b = Un(g > 0 ? p[v] + " " + y : Gn(y, /&\f/g, p[v]))) && (c[_++] = b);
	return or(e, t, n, i === 0 ? Nn : s, c, l, u, d);
}
function Dr(e, t, n, r) {
	return or(e, t, n, Mn, Bn(lr()), Jn(e, 2, -2), 0, r);
}
function Or(e, t, n, r, i) {
	return or(e, t, n, Pn, Jn(e, 0, r), Jn(e, r + 1, -1), r, i);
}
// node_modules/stylis/src/Prefixer.js
function kr(e, t, n) {
	switch (Hn(e, t)) {
		case 5103: return jn + "print-" + e + e;
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
		case 4599: return jn + e + e;
		case 4855: return jn + e.replace("add", "source-over").replace("substract", "source-out").replace("intersect", "source-in").replace("exclude", "xor") + e;
		case 4789: return An + e + e;
		case 5349:
		case 4246:
		case 4810:
		case 6968:
		case 2756: return jn + e + An + e + kn + e + e;
		case 5936: switch (qn(e, t + 11)) {
			case 114: return jn + e + kn + Gn(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
			case 108: return jn + e + kn + Gn(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
			case 45: return jn + e + kn + Gn(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
		}
		case 6828:
		case 4268:
		case 2903: return jn + e + kn + e + e;
		case 6165: return jn + e + kn + "flex-" + e + e;
		case 5187: return jn + e + Gn(e, /(\w+).+(:[^]+)/, jn + "box-$1$2" + kn + "flex-$1$2") + e;
		case 5443: return jn + e + kn + "flex-item-" + Gn(e, /flex-|-self/g, "") + (Wn(e, /flex-|baseline/) ? "" : kn + "grid-row-" + Gn(e, /flex-|-self/g, "")) + e;
		case 4675: return jn + e + kn + "flex-line-pack" + Gn(e, /align-content|flex-|-self/g, "") + e;
		case 5548: return jn + e + kn + Gn(e, "shrink", "negative") + e;
		case 5292: return jn + e + kn + Gn(e, "basis", "preferred-size") + e;
		case 6060: return jn + "box-" + Gn(e, "-grow", "") + jn + e + kn + Gn(e, "grow", "positive") + e;
		case 4554: return jn + Gn(e, /([^-])(transform)/g, "$1" + jn + "$2") + e;
		case 6187: return Gn(Gn(Gn(e, /(zoom-|grab)/, jn + "$1"), /(image-set)/, jn + "$1"), e, "") + e;
		case 5495:
		case 3959: return Gn(e, /(image-set\([^]*)/, jn + "$1$`$1");
		case 4968: return Gn(Gn(e, /(.+:)(flex-)?(.*)/, jn + "box-pack:$3" + kn + "flex-pack:$3"), /space-between/, "justify") + jn + e + e;
		case 4200:
			if (!Wn(e, /flex-|baseline/)) return kn + "grid-column-align" + Jn(e, t) + e;
			break;
		case 2592:
		case 3360: return kn + Gn(e, "template-", "") + e;
		case 4384:
		case 3616: return n && n.some(function(e, n) {
			return t = n, Wn(e.props, /grid-\w+-end/);
		}) ? ~Kn(e + (n = n[t].value), "span") ? e : kn + Gn(e, "-start", "") + e + kn + "grid-row-span:" + (~Kn(n, "span") ? Wn(n, /\d+/) : +Wn(n, /\d+/) - Wn(e, /\d+/)) + ";" : kn + Gn(e, "-start", "") + e;
		case 4896:
		case 4128: return n && n.some(function(e) {
			return Wn(e.props, /grid-\w+-start/);
		}) ? e : kn + Gn(Gn(e, "-end", "-span"), "span ", "") + e;
		case 4095:
		case 3583:
		case 4068:
		case 2532: return Gn(e, /(.+)-inline(.+)/, jn + "$1$2") + e;
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
			if (Yn(e) - 1 - t > 6) switch (qn(e, t + 1)) {
				case 109: if (qn(e, t + 4) !== 45) break;
				case 102: return Gn(e, /(.+:)(.+)-([^]+)/, "$1" + jn + "$2-$3$1" + An + (qn(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
				case 115: return ~Kn(e, "stretch") ? kr(Gn(e, "stretch", "fill-available"), t, n) + e : e;
			}
			break;
		case 5152:
		case 5920: return Gn(e, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function(t, n, r, i, a, o, s) {
			return kn + n + ":" + r + s + (i ? kn + n + "-span:" + (a ? o : +o - r) + s : "") + e;
		});
		case 4949:
			if (qn(e, t + 6) === 121) return Gn(e, ":", ":" + jn) + e;
			break;
		case 6444:
			switch (qn(e, qn(e, 14) === 45 ? 18 : 11)) {
				case 120: return Gn(e, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, "$1" + jn + (qn(e, 14) === 45 ? "inline-" : "") + "box$3$1" + jn + "$2$3$1" + kn + "$2box$3") + e;
				case 100: return Gn(e, ":", ":" + kn) + e;
			}
			break;
		case 5719:
		case 2647:
		case 2135:
		case 3927:
		case 2391: return Gn(e, "scroll-", "scroll-snap-") + e;
	}
	return e;
}
// node_modules/stylis/src/Serializer.js
function Ar(e, t) {
	for (var n = "", r = 0; r < e.length; r++) n += t(e[r], r, e, t) || "";
	return n;
}
function jr(e, t, n, r) {
	switch (e.type) {
		case Rn: if (e.children.length) break;
		case Fn:
		case In:
		case Pn: return e.return = e.return || e.value;
		case Mn: return "";
		case Ln: return e.return = e.value + "{" + Ar(e.children, r) + "}";
		case Nn: if (!Yn(e.value = e.props.join(","))) return "";
	}
	return Yn(n = Ar(e.children, r)) ? e.return = e.value + "{" + n + "}" : "";
}
// node_modules/stylis/src/Middleware.js
function Mr(e) {
	var t = Xn(e);
	return function(n, r, i, a) {
		for (var o = "", s = 0; s < t; s++) o += e[s](n, r, i, a) || "";
		return o;
	};
}
function Nr(e, t, n, r) {
	if (e.length > -1 && !e.return) switch (e.type) {
		case Pn:
			e.return = kr(e.value, e.length, n);
			return;
		case Ln: return Ar([sr(e, { value: Gn(e.value, "@", "@" + jn) })], r);
		case Nn: if (e.length) return Qn(n = e.props, function(t) {
			switch (Wn(t, r = /(::plac\w+|:read-\w+)/)) {
				case ":read-only":
				case ":read-write":
					cr(sr(e, { props: [Gn(t, /:(read-\w+)/, ":" + An + "$1")] })), cr(sr(e, { props: [t] })), Vn(e, { props: $n(n, r) });
					break;
				case "::placeholder": cr(sr(e, { props: [Gn(t, /:(plac\w+)/, ":" + jn + "input-$1")] })), cr(sr(e, { props: [Gn(t, /:(plac\w+)/, ":" + An + "$1")] })), cr(sr(e, { props: [Gn(t, /:(plac\w+)/, kn + "input-$1")] })), cr(sr(e, { props: [t] })), Vn(e, { props: $n(n, r) });
			}
			return "";
		});
	}
}
// node_modules/@ant-design/cssinjs/es/util/cacheMapUtil.js
var Pr = "data-ant-cssinjs-cache-path", Fr = "_FILE_STYLE__", Ir, Lr = !0;
function Rr() {
	if (!Ir && (Ir = {}, v())) {
		let e = document.createElement("div");
		e.className = Pr, e.style.position = "fixed", e.style.visibility = "hidden", e.style.top = "-9999px", document.body.appendChild(e);
		let t = getComputedStyle(e).content || "";
		t = t.replace(/^"/, "").replace(/"$/, ""), t.split(";").forEach((e) => {
			let [t, n] = e.split(":");
			Ir[t] = n;
		});
		let n = document.querySelector(`style[${Pr}]`);
		n && (Lr = !1, n.parentNode?.removeChild(n)), document.body.removeChild(e);
	}
}
function zr(e) {
	return Rr(), !!Ir[e];
}
function Br(e) {
	let t = Ir[e], n = null;
	if (t && v()) {
		if (Lr) n = Fr;
		else {
			let t = document.querySelector(`style[${Kt}="${Ir[e]}"]`);
			t ? n = t.innerHTML : delete Ir[e];
		}
	}
	return [n, t];
}
// node_modules/@ant-design/cssinjs/es/hooks/useStyleRegister.js
var Vr = "_skip_check_", Hr = "_multi_value_";
function Ur(e, t) {
	return (t ? Ar(wr(e), Mr([Nr, jr])) : Ar(wr(e), jr)).replace(/\{%%%\:[^;];}/g, ";");
}
function Wr(e) {
	return typeof e == "object" && e && (Vr in e || Hr in e);
}
function Gr(e, t, n = "high") {
	if (!t) return e;
	let r = un({
		hashCls: t,
		hashPriority: n
	});
	return e.split(",").map((e) => {
		let t = e.trim().split(/\s+/), n = t[0] || "", i = n.match(/^\w+/)?.[0] || "";
		return n = `${i}${r}${n.slice(i.length)}`, [n, ...t.slice(1)].join(" ");
	}).join(",");
}
var Kr = (e, t = {}, { root: n, injectHash: r, parentSelectors: i } = {
	root: !0,
	parentSelectors: []
}) => {
	let { hashId: a, layer: o, path: s, hashPriority: c, transformers: l = [], linters: u = [] } = t, d = "", f = {};
	function p(e) {
		let n = e.getName(a);
		if (!f[n]) {
			let [r] = Kr(e.style, t, {
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
				if (typeof s == "object" && s && (o !== "animationName" || !s._keyframe) && !Wr(s)) {
					let e = !1, l = o.trim(), u = !1;
					(n || r) && a ? l.startsWith("@") ? e = !0 : l = Gr(l === "&" ? "" : o, a, c) : n && !a && (l === "&" || l === "") && (l = "", u = !0);
					let [p, m] = Kr(s, t, {
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
						!On[e] && typeof r == "number" && r !== 0 && (r = `${r}px`), e === "animationName" && t?._keyframe && (p(t), r = t.getName(a)), d += `${n}:${r};`;
					}
					let t = s?.value ?? s;
					typeof s == "object" && s?.[Hr] && Array.isArray(t) ? t.forEach((t) => {
						e(o, t);
					}) : dn(t) && e(o, t);
				}
			});
		}
	}), n ? o && (d &&= `@layer ${o.name} {${d}}`, o.dependencies && (f[`@layer ${o.name}`] = o.dependencies.map((e) => `@layer ${e}, ${o.name};`).join("\n"))) : d = `{${d}}`, [d, f];
};
function qr(e, t) {
	return Bt(`${e.join("%")}${t}`);
}
var Jr = "style";
function Yr(e, t) {
	let { path: n, hashId: r, layer: i, nonce: a, clientOnly: o, order: s = 0 } = e, { mock: c, hashPriority: l, container: u, transformers: d, linters: f, cache: p, layer: m, autoPrefix: h } = g.useContext(Yt), _ = [r || ""];
	m && _.push("layer"), _.push(...n);
	let v = ln;
	_n(Jr, _, () => {
		let e = _.join("|");
		if (zr(e)) {
			let [t, n] = Br(e);
			if (t) return [
				t,
				n,
				{},
				o,
				s
			];
		}
		let [a, c] = Kr(t(), {
			hashId: r,
			hashPriority: l,
			layer: m ? i : void 0,
			path: n.join("-"),
			transformers: d,
			linters: f
		}), u = Ur(a, h || !1);
		return [
			u,
			qr(_, u),
			c,
			o,
			s
		];
	}, (e, t) => {
		let [, n] = e;
		t && ln && J(n, {
			mark: Kt,
			attachTo: u
		});
	}, (e) => {
		let [t, n, r, , i] = e;
		if (v && t !== "_FILE_STYLE__") {
			let e = {
				mark: Kt,
				prepend: !m && "queue",
				attachTo: u,
				priority: i
			};
			e = fn(e, a);
			let o = [], s = [];
			Object.keys(r).forEach((e) => {
				e.startsWith("@layer") ? o.push(e) : s.push(e);
			}), o.forEach((t) => {
				he(Ur(r[t], h || !1), `_layer-${t}`, {
					...e,
					prepend: !0
				});
			});
			let c = he(t, n, e);
			c[qt] = p.instanceId, s.forEach((t) => {
				he(Ur(r[t], h || !1), `_effect-${t}`, e);
			});
		}
	});
}
// node_modules/@ant-design/cssinjs/es/hooks/useCSSVarRegister.js
var Xr = "cssVar", Zr = (e, t) => {
	let { key: n, prefix: r, unitless: i, ignore: a, token: o, hashId: s, scope: c, nonce: l } = e, { cache: { instanceId: u }, container: d, hashPriority: f } = (0, g.useContext)(Yt), { _tokenKey: p } = o, m = Array.isArray(c) ? c.join("@@") : c, h = [
		...e.path,
		n,
		m,
		p
	];
	return _n(Xr, h, () => {
		let [e, o] = hn(t(), n, {
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
			qr(h, o),
			n
		];
	}, ([, , e]) => {
		ln && J(e, {
			mark: Kt,
			attachTo: d
		});
	}, ([, e, t]) => {
		if (!e) return;
		let r = {
			mark: Kt,
			prepend: "queue",
			attachTo: d,
			priority: -999
		};
		r = fn(r, l);
		let i = he(e, t, r);
		i[qt] = u, i.setAttribute(Gt, n);
	});
}, Qr = class {
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
function $r(e) {
	return e.notSplit = !0, e;
}
$r(["borderTop", "borderBottom"]), $r(["borderTop"]), $r(["borderBottom"]), $r(["borderLeft", "borderRight"]), $r(["borderLeft"]), $r(["borderRight"]);
// node_modules/@babel/runtime/helpers/esm/typeof.js
function ei(e) {
	"@babel/helpers - typeof";
	return ei = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, ei(e);
}
// node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function ti(e) {
	if (Array.isArray(e)) return e;
}
// node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function ni(e, t) {
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
function ri() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// node_modules/@babel/runtime/helpers/esm/slicedToArray.js
function ii(e, t) {
	return ti(e) || ni(e, t) || jt(e, t) || ri();
}
// node_modules/@babel/runtime/helpers/esm/toPrimitive.js
function ai(e, t) {
	if (ei(e) != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (ei(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
// node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function oi(e) {
	var t = ai(e, "string");
	return ei(t) == "symbol" ? t : t + "";
}
// node_modules/@babel/runtime/helpers/esm/defineProperty.js
function si(e, t, n) {
	return (t = oi(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
// node_modules/@babel/runtime/helpers/esm/objectSpread2.js
function ci(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function li(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? ci(Object(n), !0).forEach(function(t) {
			si(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ci(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
// node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function ui(e, t) {
	if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
}
// node_modules/@babel/runtime/helpers/esm/createClass.js
function di(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, oi(r.key), r);
	}
}
function fi(e, t, n) {
	return t && di(e.prototype, t), n && di(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
// node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function pi(e) {
	if (e === void 0) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
// node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function mi(e, t) {
	return mi = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
		return e.__proto__ = t, e;
	}, mi(e, t);
}
// node_modules/@babel/runtime/helpers/esm/inherits.js
function hi(e, t) {
	if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function");
	e.prototype = Object.create(t && t.prototype, { constructor: {
		value: e,
		writable: !0,
		configurable: !0
	} }), Object.defineProperty(e, "prototype", { writable: !1 }), t && mi(e, t);
}
// node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function gi(e) {
	return gi = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
		return e.__proto__ || Object.getPrototypeOf(e);
	}, gi(e);
}
// node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js
function _i() {
	try {
		var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch {}
	return (_i = function() {
		return !!e;
	})();
}
// node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js
function vi(e, t) {
	if (t && (ei(t) == "object" || typeof t == "function")) return t;
	if (t !== void 0) throw TypeError("Derived constructors may only return object or undefined");
	return pi(e);
}
// node_modules/@babel/runtime/helpers/esm/createSuper.js
function yi(e) {
	var t = _i();
	return function() {
		var n, r = gi(e);
		if (t) {
			var i = gi(this).constructor;
			n = Reflect.construct(r, arguments, i);
		} else n = r.apply(this, arguments);
		return vi(this, n);
	};
}
// node_modules/@ant-design/cssinjs-utils/es/util/calc/calculator.js
var bi = /*#__PURE__*/ fi(function e() {
	ui(this, e);
}), xi = "CALC_UNIT", Si = new RegExp(xi, "g");
function Ci(e) {
	return typeof e == "number" ? `${e}${xi}` : e;
}
var wi = /*#__PURE__*/ function(e) {
	hi(n, e);
	var t = yi(n);
	function n(e, r) {
		var i;
		ui(this, n), i = t.call(this), si(pi(i), "result", ""), si(pi(i), "unitlessCssVar", void 0), si(pi(i), "lowPriority", void 0);
		var a = ei(e);
		return i.unitlessCssVar = r, e instanceof n ? i.result = `(${e.result})` : a === "number" ? i.result = Ci(e) : a === "string" && (i.result = e), i;
	}
	return fi(n, [
		{
			key: "add",
			value: function(e) {
				return e instanceof n ? this.result = `${this.result} + ${e.getResult()}` : (typeof e == "number" || typeof e == "string") && (this.result = `${this.result} + ${Ci(e)}`), this.lowPriority = !0, this;
			}
		},
		{
			key: "sub",
			value: function(e) {
				return e instanceof n ? this.result = `${this.result} - ${e.getResult()}` : (typeof e == "number" || typeof e == "string") && (this.result = `${this.result} - ${Ci(e)}`), this.lowPriority = !0, this;
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
				}) && (r = !1), this.result = this.result.replace(Si, r ? "px" : ""), this.lowPriority === void 0 ? this.result : `calc(${this.result})`;
			}
		}
	]), n;
}(bi), Ti = /*#__PURE__*/ function(e) {
	hi(n, e);
	var t = yi(n);
	function n(e) {
		var r;
		return ui(this, n), r = t.call(this), si(pi(r), "result", 0), e instanceof n ? r.result = e.result : typeof e == "number" && (r.result = e), r;
	}
	return fi(n, [
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
}(bi), Ei = function(e, t) {
	var n = e === "css" ? wi : Ti;
	return function(e) {
		return new n(e, t);
	};
}, Di = function(e, t) {
	return `${[t, e.replace(/([A-Z]+)([A-Z][a-z]+)/g, "$1-$2").replace(/([a-z])([A-Z])/g, "$1-$2")].filter(Boolean).join("-")}`;
};
// node_modules/@ant-design/cssinjs-utils/es/util/getComponentToken.js
function Oi(e, t, n, r) {
	var i = li({}, t[e]);
	r != null && r.deprecatedTokens && r.deprecatedTokens.forEach(function(e) {
		var t = ii(e, 2), n = t[0], r = t[1];
		(i != null && i[n] || i != null && i[r]) && (i[r] ?? (i[r] = i?.[n]));
	});
	var a = li(li({}, n), i);
	return Object.keys(a).forEach(function(e) {
		a[e] === t[e] && delete a[e];
	}), a;
}
// node_modules/@ant-design/cssinjs-utils/es/util/statistic.js
var ki = typeof CSSINJS_STATISTIC < "u", Ai = !0;
function ji() {
	var e = [...arguments];
	/* istanbul ignore next */
	if (!ki) return Object.assign.apply(Object, [{}].concat(e));
	Ai = !1;
	var t = {};
	return e.forEach(function(e) {
		ei(e) === "object" && Object.keys(e).forEach(function(n) {
			Object.defineProperty(t, n, {
				configurable: !0,
				enumerable: !0,
				get: function() {
					return e[n];
				}
			});
		});
	}), Ai = !0, t;
}
var Mi = {};
/* istanbul ignore next */
function Ni() {}
var Pi = function(e) {
	var t, n = e, r = Ni;
	return ki && typeof Proxy < "u" && (t = /* @__PURE__ */ new Set(), n = new Proxy(e, { get: function(e, n) {
		if (Ai) {
			var r;
			(r = t) == null || r.add(n);
		}
		return e[n];
	} }), r = function(e, n) {
		Mi[e] = {
			global: Array.from(t),
			component: li(li({}, Mi[e]?.component), n)
		};
	}), {
		token: n,
		keys: t,
		flush: r
	};
};
// node_modules/@ant-design/cssinjs-utils/es/util/getDefaultComponentToken.js
function Fi(e, t, n) {
	return typeof n == "function" ? n(ji(t, t[e] ?? {})) : n ?? {};
}
// node_modules/@ant-design/cssinjs-utils/es/util/maxmin.js
function Ii(e) {
	return e === "js" ? {
		max: Math.max,
		min: Math.min
	} : {
		max: function() {
			return `max(${[...arguments].map(function(e) {
				return Q(e);
			}).join(",")})`;
		},
		min: function() {
			return `min(${[...arguments].map(function(e) {
				return Q(e);
			}).join(",")})`;
		}
	};
}
// node_modules/@ant-design/cssinjs-utils/es/_util/hooks/useUniqueMemo.js
var Li = 6e5, Ri = new (/* @__PURE__ */ function() {
	function e() {
		ui(this, e), si(this, "map", /* @__PURE__ */ new Map()), si(this, "objectIDMap", /* @__PURE__ */ new WeakMap()), si(this, "nextID", 0), si(this, "lastAccessBeat", /* @__PURE__ */ new Map()), si(this, "accessBeat", 0);
	}
	return fi(e, [
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
					return e && ei(e) === "object" ? `obj_${t.getObjectID(e)}` : `${ei(e)}_${e}`;
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
						t - n > Li && (e.map.delete(r), e.lastAccessBeat.delete(r));
					}), this.accessBeat = 0;
				}
			}
		}
	]), e;
}())();
function zi(e, t) {
	return g.useMemo(function() {
		var n = Ri.get(t);
		if (n) return n;
		var r = e();
		return Ri.set(t, r), r;
	}, t);
}
// node_modules/@ant-design/cssinjs-utils/es/hooks/useCSP.js
var Bi = function() {
	return {};
};
// node_modules/@ant-design/cssinjs-utils/es/util/genStyleUtils.js
function Vi(e) {
	var t = e.useCSP, n = t === void 0 ? Bi : t, r = e.useToken, i = e.usePrefix, a = e.getResetStyles, o = e.getCommonStyle, s = e.getCompUnitless;
	function c(e, t, n, r) {
		var i = Array.isArray(e) ? e[0] : e;
		function a(e) {
			return `${String(i)}${e.slice(0, 1).toUpperCase()}${e.slice(1)}`;
		}
		var o = r?.unitless || {}, c = li(li({}, typeof s == "function" ? s(e) : {}), {}, si({}, a("zIndexPopup"), !0));
		Object.keys(o).forEach(function(e) {
			c[a(e)] = o[e];
		});
		var d = li(li({}, r), {}, {
			unitless: c,
			prefixToken: a
		}), f = u(e, t, n, d), p = l(i, n, d);
		return function(e) {
			var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, n = f(e, t), i = r?.extraCssVarPrefixCls, a = typeof i == "function" ? i({
				prefixCls: e,
				rootCls: t
			}) : i;
			return [n, p(a != null && a.length ? [t].concat(Nt(a)) : t)];
		};
	}
	function l(e, t, i) {
		var a = i.unitless, o = i.prefixToken, s = i.ignore;
		return function(c) {
			var l = r(), u = l.cssVar, d = l.realToken, f = n();
			return Zr({
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
				var n = Fi(e, d, t), r = Oi(e, d, n, { deprecatedTokens: i?.deprecatedTokens });
				return n && Object.keys(n).forEach(function(e) {
					r[o(e)] = r[e], delete r[e];
				}), r;
			}), u?.key;
		};
	}
	function u(t, s, c) {
		var l = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, u = Array.isArray(t) ? t : [t, t], d = ii(u, 1)[0], f = u.join("-"), p = e.layer || { name: "antd" };
		return function(e) {
			var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, u = r(), m = u.theme, h = u.realToken, _ = u.hashId, v = u.token, y = u.cssVar, b = u.zeroRuntime;
			if ((0, g.useMemo)(function() {
				return b;
			}, [])) return _;
			var x = i(), S = x.rootPrefixCls, C = x.iconPrefixCls, w = n(), T = "css", E = zi(function() {
				var e = /* @__PURE__ */ new Set();
				return Object.keys(l.unitless || {}).forEach(function(t) {
					e.add(pn(t, y.prefix)), e.add(pn(t, Di(d, y.prefix)));
				}), Ei(T, e);
			}, [
				T,
				d,
				y?.prefix
			]), D = Ii(T), O = D.max, k = D.min, A = {
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
			return typeof a == "function" && Yr(li(li({}, A), {}, {
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
			}), Yr(li(li({}, A), {}, { path: [
				f,
				e,
				C
			] }), function() {
				if (l.injectStyle === !1) return [];
				var n = Pi(v), r = n.token, i = n.flush, a = Fi(d, h, c), u = `.${e}`, f = Oi(d, h, a, { deprecatedTokens: l.deprecatedTokens });
				a && ei(a) === "object" && Object.keys(a).forEach(function(e) {
					a[e] = `var(${pn(e, Di(d, y.prefix))})`;
				});
				var p = ji(r, {
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
		var r = u(e, t, n, li({
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
var Hi = [
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
function Ui(e) {
	return (e + 8) / e;
}
function Wi(e) {
	let t = Array.from({ length: 10 }).map((t, n) => {
		let r = n - 1, i = e * Math.E ** (r / 5);
		return Math.floor((n > 1 ? Math.floor(i) : Math.ceil(i)) / 2) * 2;
	});
	return t[1] = e, t.map((e) => ({
		size: e,
		lineHeight: Ui(e)
	}));
}
// node_modules/antd/es/version/index.js
var Gi = "6.6.8", Ki = {
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
}, qi = {
	...Ki,
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
}, Ji = {
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
}, Yi = Math.round;
function Xi(e, t) {
	let n = e.replace(/^[^(]*\((.*)/, "$1").replace(/\).*/, "").match(/\d*\.?\d+%?/g) || [], r = n.map((e) => parseFloat(e));
	for (let e = 0; e < 3; e += 1) r[e] = t(r[e] || 0, n[e] || "", e);
	return r[3] = n[3] ? n[3].includes("%") ? r[3] / 100 : r[3] : 1, r;
}
var Zi = (e, t, n) => n === 0 ? e : e / 100;
function Qi(e, t) {
	let n = t || 255;
	return e > n ? n : e < 0 ? 0 : e;
}
var $i = class e {
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
					let t = Ji[e.toLowerCase()];
					t && this.fromHexString(parseInt(t, 36).toString(16).padStart(6, "0"));
				}
			} else if (t instanceof e) this.r = t.r, this.g = t.g, this.b = t.b, this.a = t.a, this._h = t._h, this._hsl_s = t._hsl_s, this._hsv_s = t._hsv_s, this._l = t._l, this._v = t._v;
			else if (n("rgb")) this.r = Qi(t.r), this.g = Qi(t.g), this.b = Qi(t.b), this.a = typeof t.a == "number" ? Qi(t.a, 1) : 1;
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
			this._h = e === 0 ? 0 : Yi(60 * (this.r === this.getMax() ? (this.g - this.b) / e + (this.g < this.b ? 6 : 0) : this.g === this.getMax() ? (this.b - this.r) / e + 2 : (this.r - this.g) / e + 4));
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
			r: Yi(i("r")),
			g: Yi(i("g")),
			b: Yi(i("b")),
			a: Yi(i("a") * 100) / 100
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
		let t = this._c(e), n = this.a + t.a * (1 - this.a), r = (e) => Yi((this[e] * this.a + t[e] * t.a * (1 - this.a)) / n);
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
			let t = Yi(this.a * 255).toString(16);
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
		let e = this.getHue(), t = Yi(this.getHSLSaturation() * 100), n = Yi(this.getLightness() * 100);
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
		return r[e] = Qi(t, n), r;
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
			let e = Yi(n * 255);
			this.r = e, this.g = e, this.b = e;
			return;
		}
		let a = 0, o = 0, s = 0, c = i / 60, l = (1 - Math.abs(2 * n - 1)) * t, u = l * (1 - Math.abs(c % 2 - 1));
		c >= 0 && c < 1 ? (a = l, o = u) : c >= 1 && c < 2 ? (a = u, o = l) : c >= 2 && c < 3 ? (o = l, s = u) : c >= 3 && c < 4 ? (o = u, s = l) : c >= 4 && c < 5 ? (a = u, s = l) : c >= 5 && c < 6 && (a = l, s = u);
		let d = n - l / 2;
		this.r = Yi((a + d) * 255), this.g = Yi((o + d) * 255), this.b = Yi((s + d) * 255);
	}
	fromHsv({ h: e, s: t, v: n, a: r }) {
		let i = (e % 360 + 360) % 360;
		this._h = i, this._hsv_s = t, this._v = n, this.a = typeof r == "number" ? r : 1;
		let a = Yi(n * 255);
		if (this.r = a, this.g = a, this.b = a, t <= 0) return;
		let o = i / 60, s = Math.floor(o), c = o - s, l = Yi(n * (1 - t) * 255), u = Yi(n * (1 - t * c) * 255), d = Yi(n * (1 - t * (1 - c)) * 255);
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
		let t = Xi(e, Zi);
		this.fromHsv({
			h: t[0],
			s: t[1],
			v: t[2],
			a: t[3]
		});
	}
	fromHslString(e) {
		let t = Xi(e, Zi);
		this.fromHsl({
			h: t[0],
			s: t[1],
			l: t[2],
			a: t[3]
		});
	}
	fromRgbString(e) {
		let t = Xi(e, (e, t) => t.includes("%") ? Yi(e / 100 * 255) : e);
		this.r = t[0], this.g = t[1], this.b = t[2], this.a = t[3];
	}
}, ea = 2, ta = .16, na = .05, ra = .05, ia = .15, aa = 5, oa = 4, sa = [
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
function ca(e, t, n) {
	let r;
	return r = Math.round(e.h) >= 60 && Math.round(e.h) <= 240 ? n ? Math.round(e.h) - ea * t : Math.round(e.h) + ea * t : n ? Math.round(e.h) + ea * t : Math.round(e.h) - ea * t, r < 0 ? r += 360 : r >= 360 && (r -= 360), r;
}
function la(e, t, n) {
	if (e.h === 0 && e.s === 0) return e.s;
	let r;
	return r = n ? e.s - ta * t : t === oa ? e.s + ta : e.s + na * t, r > 1 && (r = 1), n && t === aa && r > .1 && (r = .1), r < .06 && (r = .06), Math.round(r * 100) / 100;
}
function ua(e, t, n) {
	let r;
	return r = n ? e.v + ra * t : e.v - ia * t, r = Math.max(0, Math.min(1, r)), Math.round(r * 100) / 100;
}
function da(e, t = {}) {
	let n = [], r = new $i(e), i = r.toHsv();
	for (let e = aa; e > 0; --e) {
		let t = new $i({
			h: ca(i, e, !0),
			s: la(i, e, !0),
			v: ua(i, e, !0)
		});
		n.push(t);
	}
	n.push(r);
	for (let e = 1; e <= oa; e += 1) {
		let t = new $i({
			h: ca(i, e),
			s: la(i, e),
			v: ua(i, e)
		});
		n.push(t);
	}
	return t.theme === "dark" ? sa.map(({ index: e, amount: r }) => new $i(t.backgroundColor || "#141414").mix(n[e], r).toHexString()) : n.map((e) => e.toHexString());
}
// node_modules/@ant-design/colors/es/presets.js
var fa = {
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
}, pa = [
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
pa.primary = pa[5];
var ma = [
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
ma.primary = ma[5];
var ha = [
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
ha.primary = ha[5];
var ga = [
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
ga.primary = ga[5];
var _a = [
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
_a.primary = _a[5];
var va = [
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
va.primary = va[5];
var ya = [
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
ya.primary = ya[5];
var ba = [
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
ba.primary = ba[5];
var xa = [
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
xa.primary = xa[5];
var Sa = [
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
Sa.primary = Sa[5];
var Ca = [
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
Ca.primary = Ca[5];
var wa = [
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
wa.primary = wa[5];
var Ta = [
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
Ta.primary = Ta[5];
var Ea = {
	red: pa,
	volcano: ma,
	orange: ha,
	gold: ga,
	yellow: _a,
	lime: va,
	green: ya,
	cyan: ba,
	blue: xa,
	geekblue: Sa,
	purple: Ca,
	magenta: wa,
	grey: Ta
}, Da = [
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
Da.primary = Da[5];
var Oa = [
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
Oa.primary = Oa[5];
var ka = [
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
ka.primary = ka[5];
var Aa = [
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
Aa.primary = Aa[5];
var ja = [
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
ja.primary = ja[5];
var Ma = [
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
Ma.primary = Ma[5];
var Na = [
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
Na.primary = Na[5];
var Pa = [
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
Pa.primary = Pa[5];
var Fa = [
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
Fa.primary = Fa[5];
var Ia = [
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
Ia.primary = Ia[5];
var La = [
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
La.primary = La[5];
var Ra = [
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
Ra.primary = Ra[5];
var za = [
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
za.primary = za[5];
// node_modules/antd/es/theme/themes/shared/genColorMapToken.js
function Ba(e, { generateColorPalettes: t, generateNeutralColorPalettes: n }) {
	let { colorSuccess: r, colorWarning: i, colorError: a, colorInfo: o, colorPrimary: s, colorBgBase: c, colorTextBase: l } = e, u = t(s), d = t(r), f = t(i), p = t(a), m = t(o), h = n(c, l), g = t(e.colorLink || e.colorInfo), _ = new $i(p[1]).mix(new $i(p[3]), 50).toHexString(), v = {};
	return Hi.forEach((n) => {
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
		colorBgMask: new $i("#000").setA(.45).toRgbString(),
		colorWhite: "#fff"
	};
}
// node_modules/antd/es/theme/themes/shared/genRadius.js
var Va = (e) => {
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
function Ha(e) {
	let { motionUnit: t, motionBase: n, borderRadius: r, lineWidth: i } = e;
	return {
		motionDurationFast: `${(n + t).toFixed(1)}s`,
		motionDurationMid: `${(n + t * 2).toFixed(1)}s`,
		motionDurationSlow: `${(n + t * 3).toFixed(1)}s`,
		lineWidthBold: i + 1,
		...Va(r)
	};
}
// node_modules/antd/es/theme/themes/shared/genControlHeight.js
var Ua = (e) => {
	let { controlHeight: t } = e;
	return {
		controlHeightSM: t * .75,
		controlHeightXS: t * .5,
		controlHeightLG: t * 1.25
	};
}, Wa = (e) => {
	let t = Wi(e), n = t.map((e) => e.size), r = t.map((e) => e.lineHeight), i = n[1], a = n[0], o = n[2], s = r[1], c = r[0], l = r[2];
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
function Ga(e) {
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
var Ka = (e, t) => new $i(e).setA(t).toRgbString(), qa = (e, t) => new $i(e).darken(t).toHexString(), Ja = (e) => {
	let t = da(e);
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
}, Ya = (e, t, n) => {
	let r = e || "#fff", i = t || "#000";
	return {
		colorBgBase: r,
		colorTextBase: i,
		colorShadow: n || "#000",
		colorText: Ka(i, .88),
		colorTextSecondary: Ka(i, .65),
		colorTextTertiary: Ka(i, .45),
		colorTextQuaternary: Ka(i, .25),
		colorFill: Ka(i, .15),
		colorFillSecondary: Ka(i, .06),
		colorFillTertiary: Ka(i, .04),
		colorFillQuaternary: Ka(i, .02),
		colorBgSolid: Ka(i, 1),
		colorBgSolidHover: Ka(i, .75),
		colorBgSolidActive: Ka(i, .95),
		colorBgLayout: qa(r, 4),
		colorBgContainer: qa(r, 0),
		colorBgElevated: qa(r, 0),
		colorBgSpotlight: Ka(i, .85),
		colorBgBlur: "transparent",
		colorBorder: qa(r, 15),
		colorBorderDisabled: qa(r, 15),
		colorBorderSecondary: qa(r, 6)
	};
};
// node_modules/antd/es/theme/themes/default/index.js
function Xa(e) {
	fa.pink = fa.magenta, Ea.pink = Ea.magenta;
	let t = Object.keys(Ki).map((t) => {
		let n = e[t] === fa[t] ? Ea[t] : da(e[t]);
		return Array.from({ length: 10 }, () => 1).reduce((e, r, i) => (e[`${t}-${i + 1}`] = n[i], e[`${t}${i + 1}`] = n[i], e), {});
	}).reduce((e, t) => (e = {
		...e,
		...t
	}, e), {});
	return {
		...e,
		...t,
		...Ba(e, {
			generateColorPalettes: Ja,
			generateNeutralColorPalettes: Ya
		}),
		...Wa(e.fontSize),
		...Ga(e),
		...Ua(e),
		...Ha(e)
	};
}
// node_modules/antd/es/theme/themes/default/theme.js
var Za = tn(Xa), Qa = {
	token: qi,
	override: { override: qi },
	hashed: !0
}, $a = /*#__PURE__*/ g.createContext(Qa);
// node_modules/antd/es/theme/util/getAlphaColor.js
function eo(e) {
	return e >= 0 && e <= 255;
}
function to(e, t) {
	let { r: n, g: r, b: i, a } = new $i(e).toRgb();
	if (a < 1) return e;
	let { r: o, g: s, b: c } = new $i(t).toRgb();
	for (let e = .01; e <= 1; e += .01) {
		let t = Math.round((n - o * (1 - e)) / e), a = Math.round((r - s * (1 - e)) / e), l = Math.round((i - c * (1 - e)) / e);
		if (eo(t) && eo(a) && eo(l)) return new $i({
			r: t,
			g: a,
			b: l,
			a: Math.round(e * 100) / 100
		}).toRgbString();
	}
	/* istanbul ignore next */
	return new $i({
		r: n,
		g: r,
		b: i,
		a: 1
	}).toRgbString();
}
// node_modules/antd/es/theme/util/alias.js
function no(e) {
	let { override: t, ...n } = e, r = { ...t };
	Object.keys(qi).forEach((e) => {
		delete r[e];
	});
	let i = {
		...n,
		...r
	}, a = new $i(i.colorShadow), o = a.a, s = (e) => a.clone().setA(o * e).toRgbString(), c = 1200, l = 1600, u = 1920;
	return i.motion === !1 && (i.motionDurationFast = "0s", i.motionDurationMid = "0s", i.motionDurationSlow = "0s"), {
		...i,
		colorFillContent: i.colorFillSecondary,
		colorFillContentHover: i.colorFill,
		colorFillAlter: i.colorFillQuaternary,
		colorBgContainerDisabled: i.colorFillTertiary,
		colorBorderBg: i.colorBgContainer,
		colorSplit: to(i.colorBorderSecondary, i.colorBgContainer),
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
		colorErrorOutline: to(i.colorErrorBg, i.colorBgContainer),
		colorWarningOutline: to(i.colorWarningBg, i.colorBgContainer),
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
		controlOutline: to(i.colorPrimaryBg, i.colorBgContainer),
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
var ro = {
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
}, io = {
	motionBase: !0,
	motionUnit: !0
}, ao = {
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
}, oo = (e, t, n) => {
	let r = n.getDerivativeToken(e), { override: i, ...a } = t, o = {
		...r,
		override: i
	};
	return o = no(o), a && Object.entries(a).forEach(([e, t]) => {
		let { theme: n, ...r } = t, i = r;
		n && (i = oo({
			...o,
			...r
		}, { override: r }, n)), o[e] = i;
	}), o;
};
function so() {
	let { token: e, hashed: t, theme: n, override: r, cssVar: i, zeroRuntime: a } = g.useContext($a), { csp: o, getPrefixCls: s } = g.useContext(It), c = {
		prefix: i?.prefix ?? s(),
		key: i?.key ?? "css-var-root"
	}, l = `${Gi}-${t || ""}`, u = n || Za, [d, f, p] = Dn(u, [qi, e], {
		salt: l,
		override: r,
		getComputedToken: oo,
		cssVar: {
			...c,
			unitless: ro,
			ignore: io,
			preserve: ao
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
var co = {
	overflow: "hidden",
	whiteSpace: "nowrap",
	textOverflow: "ellipsis"
}, lo = (e, t = !1) => ({
	boxSizing: "border-box",
	margin: 0,
	padding: 0,
	color: e.colorText,
	fontSize: e.fontSize,
	lineHeight: e.lineHeight,
	listStyle: "none",
	fontFamily: t ? "inherit" : e.fontFamily
}), uo = () => ({
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
}), fo = new Qr("loadingCircle", { "100%": { transform: "rotate(360deg)" } }), po = () => ({
	"&::before": {
		display: "table",
		content: "\"\""
	},
	"&::after": {
		display: "table",
		clear: "both",
		content: "\"\""
	}
}), mo = (e, t) => ({
	outline: `${Q(e.lineWidthFocus)} solid ${e.colorPrimaryBorder}`,
	outlineOffset: t ?? 1,
	transition: ["outline-offset", "outline"].map((e) => `${e} 0s`).join(", ")
}), ho = (e, t) => ({ "&:focus-visible": mo(e, t) }), go = (e) => ({ a: {
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
	...ho(e),
	"&[disabled]": {
		color: e.colorTextDisabled,
		cursor: "not-allowed"
	}
} }), _o = (e, t, n, r) => {
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
}, vo = (e) => ({
	[`.${e}`]: {
		...uo(),
		"&::before": { display: "none" },
		"&[tabindex]": { cursor: "pointer" }
	},
	[`.${e} .${e}-icon`]: { display: "block" },
	[`.${e}-spin`]: {
		animationName: fo,
		animationDuration: "1s",
		animationIterationCount: "infinite",
		animationTimingFunction: "linear"
	}
}), { genStyleHooks: yo, genComponentStyleHook: bo, genSubStyleComponent: xo } = Vi({
	usePrefix: () => {
		let { getPrefixCls: e, iconPrefixCls: t } = (0, g.useContext)(It);
		return {
			rootPrefixCls: e(),
			iconPrefixCls: t
		};
	},
	useToken: () => {
		let [e, t, n, r, i, a] = so();
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
		let { csp: e } = (0, g.useContext)(It);
		return e ?? {};
	},
	getResetStyles: (e, t) => {
		let n = go(e);
		return [
			n,
			{ "&": n },
			vo(t?.prefix.iconPrefixCls ?? "anticon")
		];
	},
	getCommonStyle: _o,
	getCompUnitless: () => ro
}), So = (e, t) => {
	let n = `--${e.replace(/\./g, "")}-${t}-`;
	return [(e) => `${n}${e}`, (e, t) => t ? `var(${n}${e}, ${t})` : `var(${n}${e})`];
};
// node_modules/antd/es/theme/util/genPresetColor.js
function Co(e, t) {
	return Hi.reduce((n, r) => {
		let i = e[`${r}1`], a = e[`${r}3`], o = e[`${r}6`], s = e[`${r}7`];
		return {
			...n,
			...t(r, {
				lightColor: i,
				lightBorderColor: a,
				darkColor: o,
				textColor: s
			})
		};
	}, {});
}
// node_modules/antd/es/theme/util/useResetIconStyle.js
var wo = (e, t) => {
	let [n, r] = so();
	return Yr({
		theme: n,
		token: r,
		hashId: "",
		path: ["ant-design-icons", e],
		nonce: () => t?.nonce,
		layer: { name: "antd" }
	}, () => vo(e));
}, To = {
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
}, Eo = /*#__PURE__*/ (0, g.createContext)({}), Do = "data-rc-order", Oo = "data-rc-priority", ko = "rc-util-key", Ao = /* @__PURE__ */ new Map();
function jo() {
	return !!(typeof window < "u" && window.document && window.document.createElement);
}
function Mo(e, t) {
	if (!e || !t) return !1;
	if (e.contains) return e.contains(t);
	let n = t;
	for (; n;) {
		if (n === e) return !0;
		n = n.parentNode;
	}
	return !1;
}
function No({ mark: e } = {}) {
	return e ? e.startsWith("data-") ? e : `data-${e}` : ko;
}
function Po(e) {
	return e.attachTo ? e.attachTo : document.querySelector("head") || document.body;
}
function Fo(e) {
	return e === "queue" ? "prependQueue" : e ? "prepend" : "append";
}
function Io(e) {
	return Array.from((Ao.get(e) || e).children).filter((e) => e.tagName === "STYLE");
}
function Lo(e, t = {}) {
	if (!jo()) return null;
	let { csp: n, prepend: r, priority: i = 0 } = t, a = Fo(r), o = a === "prependQueue", s = document.createElement("style");
	s.setAttribute(Do, a), o && i && s.setAttribute(Oo, `${i}`), n?.nonce && (s.nonce = n.nonce), s.innerHTML = e;
	let c = Po(t), { firstChild: l } = c;
	if (r) {
		if (o) {
			let e = (t.styles || Io(c)).filter((e) => {
				if (!["prepend", "prependQueue"].includes(e.getAttribute(Do))) return !1;
				let t = Number(e.getAttribute(Oo) || 0);
				return i >= t;
			});
			if (e.length) return c.insertBefore(s, e[e.length - 1].nextSibling), s;
		}
		c.insertBefore(s, l);
	} else c.appendChild(s);
	return s;
}
function Ro(e, t = {}) {
	let { styles: n } = t;
	return n ||= Io(Po(t)), n.find((n) => n.getAttribute(No(t)) === e);
}
function zo(e, t) {
	let n = Ao.get(e);
	if (!n || !Mo(document, n)) {
		let n = Lo("", t);
		if (!n) return;
		let { parentNode: r } = n;
		Ao.set(e, r), e.removeChild(n);
	}
}
function Bo(e, t, n = {}) {
	if (!jo()) return null;
	let r = Po(n), i = Io(r), a = {
		...n,
		styles: i
	};
	zo(r, a);
	let o = Ro(t, a);
	if (o) return a.csp?.nonce && o.nonce !== a.csp.nonce && (o.nonce = a.csp.nonce), o.innerHTML !== e && (o.innerHTML = e), o;
	let s = Lo(e, a);
	return s?.setAttribute(No(a), t), s;
}
function Vo(e) {
	return e?.getRootNode?.();
}
function Ho(e) {
	let t = Vo(e);
	return typeof ShadowRoot < "u" && t instanceof ShadowRoot ? t : null;
}
var Uo = {};
function Wo(e, t) {
	e || Uo[t] || (Uo[t] = !0);
}
// node_modules/@ant-design/icons/es/renderUtils.js
function Go(e) {
	return e.replace(/-(.)/g, (e, t) => t.toUpperCase());
}
function Ko(e, t) {
	Wo(e, `[@ant-design/icons] ${t}`);
}
function qo(e) {
	return typeof e == "object" && !!e && typeof e.name == "string" && typeof e.theme == "string" && (typeof e.icon == "object" || typeof e.icon == "function");
}
function Jo(e = {}) {
	return Object.keys(e).reduce((t, n) => {
		let r = e[n];
		switch (n) {
			case "class":
				t.className = r, delete t.class;
				break;
			default: delete t[n], t[Go(n)] = r;
		}
		return t;
	}, {});
}
function Yo(e, t, n) {
	return n ? /*#__PURE__*/ g.createElement(e.tag, {
		key: t,
		...Jo(e.attrs),
		...n
	}, (e.children || []).map((n, r) => Yo(n, `${t}-${e.tag}-${r}`))) : /*#__PURE__*/ g.createElement(e.tag, {
		key: t,
		...Jo(e.attrs)
	}, (e.children || []).map((n, r) => Yo(n, `${t}-${e.tag}-${r}`)));
}
var Xo = "\n.anticon {\n  display: inline-flex;\n  align-items: center;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.anticon > * {\n  line-height: 1;\n}\n\n.anticon svg {\n  display: inline-block;\n  vertical-align: inherit;\n}\n\n.anticon::before {\n  display: none;\n}\n\n.anticon .anticon-icon {\n  display: block;\n}\n\n.anticon[tabindex] {\n  cursor: pointer;\n}\n\n.anticon-spin {\n  -webkit-animation: loadingCircle 1s infinite linear;\n  animation: loadingCircle 1s infinite linear;\n}\n\n@-webkit-keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n", Zo = (e) => {
	let { csp: t, prefixCls: n, layer: r, zeroRuntime: i } = (0, g.useContext)(Eo), a = Xo;
	n && (a = a.replace(/anticon/g, n)), r && (a = `@layer ${r} {\n${a}\n}`), (0, g.useEffect)(() => {
		if (i) return;
		let n = e.current, o = Ho(n);
		Bo(a, "@ant-design-icons", {
			prepend: !r,
			csp: t,
			attachTo: o
		});
	}, []);
}, Qo = (e) => {
	let { icon: t, className: n, onClick: r, style: i, primaryColor: a, secondaryColor: o, ...s } = e, c = g.useRef(null);
	if (Zo(c), Ko(qo(t), `icon should be icon definiton, but got ${typeof t}`), !qo(t)) return null;
	let l = t;
	return Yo(l.icon, `svg-${l.name}`, {
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
Qo.displayName = "IconReact";
// node_modules/@ant-design/icons/es/components/AntdIconLight.js
function $o() {
	return $o = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, $o.apply(this, arguments);
}
var es = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { className: n, icon: r, spin: i, rotate: a, tabIndex: o, onClick: s, twoToneColor: c, ...l } = e, { prefixCls: u = "anticon", rootClassName: d } = g.useContext(Eo);
	if (Ko(qo(r), `icon should be icon definiton, but got ${typeof r}`), !qo(r)) return null;
	let f = Z(d, u, {
		[`${u}-${r.name}`]: !!r.name,
		[`${u}-spin`]: !!i || r.name === "loading"
	}, n), p = o;
	p === void 0 && s && (p = -1);
	let m = a ? {
		msTransform: `rotate(${a}deg)`,
		transform: `rotate(${a}deg)`
	} : void 0;
	return /*#__PURE__*/ g.createElement("span", $o({
		role: "img",
		"aria-label": r.name
	}, l, {
		ref: t,
		tabIndex: p,
		onClick: s,
		className: f
	}), /*#__PURE__*/ g.createElement(Qo, {
		icon: r,
		style: m
	}));
});
// node_modules/@ant-design/icons/es/icons/CheckCircleFilled.js
function ts() {
	return ts = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, ts.apply(this, arguments);
}
var ns = /*#__PURE__*/ g.forwardRef((e, t) => /*#__PURE__*/ g.createElement(es, ts({}, e, {
	ref: t,
	icon: To
}))), rs = {
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
function is() {
	return is = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, is.apply(this, arguments);
}
var as = /*#__PURE__*/ g.forwardRef((e, t) => /*#__PURE__*/ g.createElement(es, is({}, e, {
	ref: t,
	icon: rs
}))), os = {
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
function ss() {
	return ss = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, ss.apply(this, arguments);
}
var cs = /*#__PURE__*/ g.forwardRef((e, t) => /*#__PURE__*/ g.createElement(es, ss({}, e, {
	ref: t,
	icon: os
}))), ls = {
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
function us() {
	return us = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, us.apply(this, arguments);
}
var ds = /*#__PURE__*/ g.forwardRef((e, t) => /*#__PURE__*/ g.createElement(es, us({}, e, {
	ref: t,
	icon: ls
}))), fs = {
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
function ps() {
	return ps = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, ps.apply(this, arguments);
}
var ms = /*#__PURE__*/ g.forwardRef((e, t) => /*#__PURE__*/ g.createElement(es, ps({}, e, {
	ref: t,
	icon: fs
}))), hs = /*#__PURE__*/ g.createContext({}), gs = (e) => {
	let { children: t, ...n } = e, r = g.useMemo(() => ({ motion: n.motion }), [n.motion]);
	return /*#__PURE__*/ g.createElement(hs.Provider, { value: r }, t);
}, _s = "none", vs = "appear", ys = "enter", bs = "leave", xs = "none", Ss = "prepare", Cs = "start", ws = "active", Ts = "prepared";
// node_modules/@rc-component/motion/es/util/motion.js
function Es(e, t) {
	let n = {};
	return n[e.toLowerCase()] = t.toLowerCase(), n[`Webkit${e}`] = `webkit${t}`, n[`Moz${e}`] = `moz${t}`, n[`ms${e}`] = `MS${t}`, n[`O${e}`] = `o${t.toLowerCase()}`, n;
}
function Ds(e, t) {
	let n = {
		animationend: Es("Animation", "AnimationEnd"),
		transitionend: Es("Transition", "TransitionEnd")
	};
	return e && ("AnimationEvent" in t || delete n.animationend.animation, "TransitionEvent" in t || delete n.transitionend.transition), n;
}
var Os = Ds(v(), typeof window < "u" ? window : {}), ks = {};
v() && ({style: ks} = document.createElement("div"));
var As = {};
function js(e) {
	if (As[e]) return As[e];
	let t = Os[e];
	if (t) {
		let n = Object.keys(t), r = n.length;
		for (let i = 0; i < r; i += 1) {
			let r = n[i];
			if (Object.prototype.hasOwnProperty.call(t, r) && r in ks) return As[e] = t[r], As[e];
		}
	}
	return "";
}
var Ms = js("animationend"), Ns = js("transitionend"), Ps = !!(Ms && Ns), Fs = Ms || "animationend", Is = Ns || "transitionend";
function Ls(e, t) {
	return e ? typeof e == "object" ? e[t.replace(/-\w/g, (e) => e[1].toUpperCase())] : `${e}-${t}` : null;
}
// node_modules/@rc-component/motion/es/hooks/useDomMotionEvents.js
var Rs = ((e) => {
	let t = (0, g.useRef)();
	function n(t) {
		t && (t.removeEventListener(Is, e), t.removeEventListener(Fs, e));
	}
	function r(r) {
		t.current && t.current !== r && n(t.current), r && r !== t.current && (r.addEventListener(Is, e), r.addEventListener(Fs, e), t.current = r);
	}
	return g.useEffect(() => () => {
		n(t.current), t.current = null;
	}, []), [r, n];
}), zs = v() ? g.useLayoutEffect : g.useEffect, Bs = (() => {
	let e = g.useRef(null);
	function t() {
		k.cancel(e.current);
	}
	function n(r, i = 2) {
		t();
		let a = k(() => {
			i <= 1 ? r({ isCanceled: () => a !== e.current }) : n(r, i - 1);
		});
		e.current = a;
	}
	return g.useEffect(() => () => {
		t();
	}, []), [n, t];
}), Vs = [
	Ss,
	Cs,
	ws,
	"end"
], Hs = [Ss, Ts];
function Us(e) {
	return e === "active" || e === "end";
}
var Ws = ((e, t, n) => {
	let [r, i] = S(xs), [a, o] = Bs();
	function s() {
		i(Ss, !0);
	}
	let c = t ? Hs : Vs;
	return zs(() => {
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
function Gs(e, t, n, { motionEnter: r = !0, motionAppear: i = !0, motionLeave: a = !0, motionDeadline: o, motionLeaveImmediately: s, onAppearPrepare: c, onEnterPrepare: l, onLeavePrepare: u, onAppearStart: d, onEnterStart: f, onLeaveStart: p, onAppearActive: m, onEnterActive: h, onLeaveActive: v, onAppearEnd: y, onEnterEnd: b, onLeaveEnd: x, onVisibleChanged: S }) {
	let [C, w] = g.useState(), [T, E] = I(_s), [D, O] = g.useState([null, null]), k = T(), A = (0, g.useRef)(!1), j = (0, g.useRef)(null);
	function M() {
		return n();
	}
	let N = (0, g.useRef)(!1);
	function P() {
		E(_s), O([null, null]);
	}
	let F = _((e) => {
		let t = T();
		if (t === "none") return;
		let n = M();
		if (e && !e.deadline && e.target !== n) return;
		let r = N.current, i;
		t === "appear" && r ? i = y?.(n, e) : t === "enter" && r ? i = b?.(n, e) : t === "leave" && r && (i = x?.(n, e)), r && i !== !1 && P();
	}), [L] = Rs(F), R = (e) => {
		switch (e) {
			case vs: return {
				[Ss]: c,
				[Cs]: d,
				[ws]: m
			};
			case ys: return {
				[Ss]: l,
				[Cs]: f,
				[ws]: h
			};
			case bs: return {
				[Ss]: u,
				[Cs]: p,
				[ws]: v
			};
			default: return {};
		}
	}, z = g.useMemo(() => R(k), [k]), [B, V] = Ws(k, !e, (e) => {
		if (e === "prepare") {
			let e = z[Ss];
			return e ? e(M()) : !1;
		}
		return e in z && O([z[e]?.(M(), null) || null, e]), e === "active" && k !== "none" && (L(M()), o > 0 && (clearTimeout(j.current), j.current = setTimeout(() => {
			F({ deadline: !0 });
		}, o))), e === "prepared" && P(), !0;
	});
	N.current = Us(V);
	let H = (0, g.useRef)(null);
	zs(() => {
		if (A.current && H.current === t) return;
		w(t);
		let n = A.current;
		A.current = !0;
		let o;
		!n && t && i && (o = vs), n && t && r && (o = ys), (n && !t && a || !n && s && !t && a) && (o = bs);
		let c = R(o);
		o && (e || c.prepare) ? (E(o), B()) : E(_s), H.current = t;
	}, [t]), (0, g.useEffect)(() => {
		(k === "appear" && !i || k === "enter" && !r || k === "leave" && !a) && E(_s);
	}, [
		i,
		r,
		a
	]), (0, g.useEffect)(() => () => {
		A.current = !1, clearTimeout(j.current);
	}, []);
	let U = g.useRef(!1);
	(0, g.useEffect)(() => {
		C && (U.current = !0), C !== void 0 && k === "none" && ((U.current || C) && S?.(C), U.current = !0);
	}, [C, k]);
	let W = D[0];
	z.prepare && V === "start" && (W = {
		transition: "none",
		...W
	});
	let ee = D[1];
	return [
		T,
		V,
		W,
		C ?? t,
		!A.current && k === "none" && e && i ? "NONE" : V === "start" || V === "active" ? ee === V : !0
	];
}
// node_modules/@rc-component/motion/es/CSSMotion.js
function Ks(e) {
	return e?.length < 2;
}
function qs(e) {
	let t = e;
	typeof e == "object" && ({transitionSupport: t} = e);
	function n(e, n) {
		return !!(e.motionName && t && n !== !1);
	}
	let r = /*#__PURE__*/ g.forwardRef((e, t) => {
		let { visible: r = !0, removeOnLeave: i = !0, forceRender: a, children: o, motionName: s, leavedClassName: c, eventProps: l } = e, { motion: u } = g.useContext(hs), d = n(e, u), f = (0, g.useRef)();
		function p() {
			return _e(f.current);
		}
		let [m, h, _, v, y] = Gs(d, r, p, e), b = m(), x = g.useRef(v);
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
					get: () => () => m() !== _s
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
				h === "prepare" ? n = "prepare" : Us(h) ? n = "active" : h === "start" && (n = "start");
				let r = Ls(s, `${b}-${n}`);
				e = o({
					...t,
					className: Z(Ls(s, b), {
						[r]: r && n,
						[s]: typeof s == "string"
					}),
					style: _
				}, f);
			}
			return e;
		}, [C.current]);
		if (Ks(o) && ae(w)) {
			let e = G(w);
			if (e !== f) return /*#__PURE__*/ g.cloneElement(w, { ref: te(e, f) });
		}
		return w;
	});
	return r.displayName = "CSSMotion", r;
}
var Js = qs(Ps), Ys = "keep", Xs = "remove", Zs = "removed";
function Qs(e) {
	let t;
	return t = e && typeof e == "object" && "key" in e ? e : { key: e }, {
		...t,
		key: String(t.key)
	};
}
function $s(e = []) {
	return e.map(Qs);
}
function ec(e = [], t = []) {
	let n = [], r = 0, i = t.length, a = $s(e), o = $s(t);
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
					status: Ys
				}), r += 1, t = !0;
				break;
			}
		}
		t || n.push({
			...e,
			status: Xs
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
			t.key === e && (t.status = Ys);
		});
	}), n;
}
// node_modules/@rc-component/motion/es/CSSMotionList.js
function tc() {
	return tc = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, tc.apply(this, arguments);
}
var nc = [
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
function rc(e, t = Js) {
	class n extends g.Component {
		static defaultProps = { component: "div" };
		state = { keyEntities: [] };
		static getDerivedStateFromProps({ keys: e }, { keyEntities: t }) {
			return { keyEntities: ec(t, $s(e)).filter((e) => {
				let n = t.find(({ key: t }) => e.key === t);
				return !(n && n.status === "removed" && e.status === "remove");
			}) };
		}
		removeKey = (e) => {
			this.setState((t) => ({ keyEntities: t.keyEntities.map((t) => t.key === e ? {
				...t,
				status: Zs
			} : t) }), () => {
				let { keyEntities: e } = this.state;
				e.filter(({ status: e }) => e !== "removed").length === 0 && this.props.onAllRemoved && this.props.onAllRemoved();
			});
		};
		render() {
			let { keyEntities: e } = this.state, { component: n, children: r, onVisibleChanged: i, onAllRemoved: a, ...o } = this.props, s = n || g.Fragment, c = {};
			return nc.forEach((e) => {
				c[e] = o[e], delete o[e];
			}), delete o.keys, /*#__PURE__*/ g.createElement(s, o, e.map(({ status: e, ...n }, a) => {
				let o = e === "add" || e === "keep";
				return /*#__PURE__*/ g.createElement(t, tc({}, c, {
					key: n.key,
					visible: o,
					eventProps: n,
					onVisibleChanged: (e) => {
						i?.(e, { key: n.key }), e || this.removeKey(n.key);
					}
				}), Ks(r) ? (e) => r({
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
rc(Ps);
// node_modules/@rc-component/motion/es/index.js
var ic = Js, ac = (e) => typeof e == "number" && !Number.isNaN(e), oc = (e) => typeof e == "string", sc = (e) => typeof e == "object" && !!e, cc = (e) => typeof e == "function", lc = (e) => sc(e) && "propertyName" in e && oc(e.propertyName), uc = (e, t) => {
	let n = { ...e };
	return Object.keys(t).forEach((e) => {
		t[e]._default ? n[e] || (n[e] = {}) : n[e] = uc(n[e], t[e]);
	}), n;
}, $ = (e = {}, ...t) => t.filter((e) => !!e).reduce((t, n) => (Object.keys(n).forEach((r) => {
	let i = e[r], a = n[r];
	if (i) {
		if (sc(a)) t[r] = $(i, t[r], a);
		else {
			let { _default: e } = i;
			e && (t[r] = t[r] || {}, t[r][e] = Z(t[r][e], a));
		}
	} else t[r] = Z(t[r], a);
}), t), {}), dc = (e, ...t) => g.useMemo(() => $.apply(void 0, [e].concat(t)), [e].concat(t)), fc = (...e) => e.filter((e) => !!e).reduce((e, t = {}) => (Object.keys(t).forEach((n) => {
	e[n] = {
		...e[n],
		...t[n]
	};
}), e), {}), pc = (...e) => g.useMemo(() => fc.apply(void 0, e), [].concat(e)), mc = (e, t = "root") => g.useMemo(() => e ? { [t]: e } : void 0, [e, t]), hc = (e, t) => cc(e) ? e(t) : e, gc = (e, t, n, r) => {
	let i = e.map((e) => e ? hc(e, n) : void 0), a = t.map((e) => e ? hc(e, n) : void 0), o = dc.apply(void 0, [r].concat(Nt(i))), s = pc.apply(void 0, Nt(a));
	return g.useMemo(() => r ? [uc(o, r), uc(s, r)] : [o, s], [
		o,
		s,
		r
	]);
}, _c = (e, t, n) => ({
	background: e,
	[`${n}-icon`]: { color: t }
}), vc = (e) => {
	let { componentCls: t, motionDurationSlow: n, marginXS: r, marginSM: i, fontSize: a, fontSizeLG: o, lineHeight: s, motionEaseInOutCirc: c, borderRadius: l, withDescriptionIconSize: u, colorText: d, colorTextHeading: f, withDescriptionPadding: p, defaultPadding: m, lineWidth: h, lineType: g, colorSuccessBorder: _, colorWarningBorder: v, colorErrorBorder: y, colorInfoBorder: b } = e;
	return { [t]: {
		...lo(e),
		position: "relative",
		display: "flex",
		alignItems: "center",
		padding: m,
		wordWrap: "break-word",
		borderRadius: l,
		borderWidth: Q(h),
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
}, yc = (e) => {
	let { componentCls: t, colorSuccess: n, colorSuccessBg: r, colorWarning: i, colorWarningBg: a, colorError: o, colorErrorBg: s, colorInfo: c, colorInfoBg: l } = e;
	return { [t]: {
		"&-success": _c(r, n, t),
		"&-info": _c(l, c, t),
		"&-warning": _c(a, i, t),
		"&-error": {
			..._c(s, o, t),
			[`${t}-description > pre`]: {
				margin: 0,
				padding: 0
			}
		}
	} };
}, bc = (e) => {
	let { componentCls: t, iconCls: n, motionDurationMid: r, marginXS: i, fontSizeIcon: a, colorIcon: o, colorIconHover: s, colorTextDisabled: c } = e;
	return { [t]: {
		[`${t}-actions`]: { marginInlineStart: i },
		[`${t}-close-icon`]: {
			marginInlineStart: i,
			padding: 0,
			overflow: "hidden",
			fontSize: a,
			lineHeight: Q(a),
			backgroundColor: "transparent",
			border: "none",
			cursor: "pointer",
			...ho(e),
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
}, xc = yo("Alert", (e) => [
	vc(e),
	yc(e),
	bc(e)
], (e) => ({
	borderRadius: e.borderRadiusLG,
	withDescriptionIconSize: e.fontSizeHeading3,
	defaultPadding: `${e.paddingContentVerticalSM}px 12px`,
	withDescriptionPadding: `${e.paddingMD}px ${e.paddingContentHorizontalLG}px`
})), Sc = (e) => {
	let { icon: t, type: n, className: r, style: i, successIcon: a, infoIcon: o, warningIcon: s, errorIcon: c } = e, l = {
		success: a ?? /*#__PURE__*/ g.createElement(ns, null),
		info: o ?? /*#__PURE__*/ g.createElement(ms, null),
		error: c ?? /*#__PURE__*/ g.createElement(as, null),
		warning: s ?? /*#__PURE__*/ g.createElement(ds, null)
	};
	return /*#__PURE__*/ g.createElement("span", {
		className: r,
		style: i
	}, t ?? l[n]);
}, Cc = (e) => {
	let { isClosable: t, disabled: n, prefixCls: r, closeIcon: i, handleClose: a, ariaProps: o, className: s, style: c } = e, l = i === !0 || i === void 0 ? /*#__PURE__*/ g.createElement(cs, null) : i;
	return t ? /*#__PURE__*/ g.createElement("button", {
		type: "button",
		disabled: n,
		onClick: a,
		className: Z(`${r}-close-icon`, s),
		style: c,
		...o
	}, l) : null;
}, wc = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { description: n, prefixCls: r, message: i, title: a, banner: o, className: s, rootClassName: c, style: l, onMouseEnter: u, onMouseLeave: d, onClick: f, afterClose: p, showIcon: m, closable: h, closeText: _, closeIcon: v, action: y, id: b, styles: x, classNames: S, ...C } = e, w = a ?? i, [T, E] = g.useState(!1), D = g.useRef(null);
	g.useImperativeHandle(t, () => ({ nativeElement: D.current }));
	let { getPrefixCls: O, direction: k, variant: A, closable: j, closeIcon: M, className: N, style: P, classNames: F, styles: I, successIcon: L, infoIcon: R, warningIcon: z, errorIcon: B } = zt("alert"), V = O("alert", r), [H, U] = xc(V), { onClose: W, afterClose: ee, disabled: ne } = sc(h) ? h : {}, re = (t) => {
		E(!0), (W ?? e.onClose)?.(t);
	}, ie = g.useMemo(() => e.type === void 0 ? o ? "warning" : "info" : e.type, [e.type, o]), ae = e.variant ?? A ?? "outlined", G = g.useMemo(() => sc(h) || _ ? !0 : typeof h == "boolean" ? h : v !== !1 && Ie(v) ? !0 : !!j, [
		_,
		v,
		h,
		j
	]), K = o && m === void 0 ? !0 : m, oe = {
		...e,
		prefixCls: V,
		variant: ae,
		type: ie,
		showIcon: K,
		closable: G
	}, se = mc(P), ce = mc(l), [q, le] = gc([F, S], [
		I,
		se,
		x,
		ce
	], { props: oe }), ue = Z(V, `${V}-${ie}`, `${V}-${ae}`, {
		[`${V}-with-description`]: Le(n),
		[`${V}-no-icon`]: !K,
		[`${V}-banner`]: !!o,
		[`${V}-rtl`]: k === "rtl"
	}, N, s, c, q.root, U, H), de = Ke(C, {
		aria: !0,
		data: !0
	}), fe = g.useMemo(() => sc(h) && h.closeIcon ? h.closeIcon : _ || (v === void 0 ? sc(j) && j.closeIcon ? j.closeIcon : M : v), [
		v,
		h,
		j,
		_,
		M
	]), pe = g.useMemo(() => {
		let e = h ?? j;
		return sc(e) ? Ke(e, {
			data: !0,
			aria: !0
		}) : {};
	}, [h, j]);
	return /*#__PURE__*/ g.createElement(ic, {
		visible: !T,
		motionName: `${V}-motion`,
		motionAppear: !1,
		motionEnter: !1,
		onLeaveStart: (e) => ({ maxHeight: e.offsetHeight }),
		onLeaveEnd: ee ?? p
	}, ({ className: t, style: r }, i) => /*#__PURE__*/ g.createElement("div", {
		id: b,
		ref: te(D, i),
		"data-show": !T,
		className: Z(ue, t),
		style: {
			...le.root,
			...r
		},
		onMouseEnter: u,
		onMouseLeave: d,
		onClick: f,
		role: "alert",
		...de
	}, K ? /*#__PURE__*/ g.createElement(Sc, {
		className: Z(`${V}-icon`, q.icon),
		style: le.icon,
		icon: e.icon,
		type: ie,
		successIcon: L,
		infoIcon: R,
		warningIcon: z,
		errorIcon: B
	}) : null, /*#__PURE__*/ g.createElement("div", {
		className: Z(`${V}-section`, q.section),
		style: le.section
	}, Le(w) ? /*#__PURE__*/ g.createElement("div", {
		className: Z(`${V}-title`, q.title),
		style: le.title
	}, w) : null, Le(n) ? /*#__PURE__*/ g.createElement("div", {
		className: Z(`${V}-description`, q.description),
		style: le.description
	}, n) : null), Le(y) ? /*#__PURE__*/ g.createElement("div", {
		className: Z(`${V}-actions`, q.actions),
		style: le.actions
	}, y) : null, /*#__PURE__*/ g.createElement(Cc, {
		className: q.close,
		style: le.close,
		isClosable: G,
		disabled: ne,
		prefixCls: V,
		closeIcon: fe,
		handleClose: re,
		ariaProps: pe
	})));
});
// node_modules/@babel/runtime/helpers/esm/callSuper.js
function Tc(e, t, n) {
	return t = gi(t), vi(e, _i() ? Reflect.construct(t, n || [], gi(e).constructor) : t.apply(e, n));
}
// node_modules/antd/es/alert/ErrorBoundary.js
var Ec = /*#__PURE__*/ function(e) {
	function t() {
		var e;
		return ui(this, t), e = Tc(this, t, arguments), e.state = {
			error: void 0,
			info: {}
		}, e;
	}
	return hi(t, e), fi(t, [{
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
			let { message: e, title: t, description: n, id: r, children: i } = this.props, { error: a, info: o } = this.state, s = t ?? e, c = o?.componentStack || null, l = Ie(s) ? s : a?.toString(), u = Ie(n) ? n : c;
			return a ? /*#__PURE__*/ g.createElement(wc, {
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
}(g.PureComponent), Dc = wc;
Dc.ErrorBoundary = Ec;
// node_modules/antd/es/config-provider/hooks/useCSSVarCls.js
var Oc = (e) => `${e}-css-var`, kc = /*#__PURE__*/ (0, g.createContext)(void 0), Ac = {
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
}, jc = {
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
}, Mc = {
	placeholder: "Select time",
	rangePlaceholder: ["Start time", "End time"]
}, Nc = {
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
		...jc
	},
	timePickerLocale: { ...Mc }
}, Pc = Nc, Fc = "${label} is not a valid ${type}", Ic = {
	locale: "en",
	Pagination: Ac,
	DatePicker: Nc,
	TimePicker: Mc,
	Calendar: Pc,
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
				string: Fc,
				method: Fc,
				array: Fc,
				object: Fc,
				number: Fc,
				date: Fc,
				boolean: Fc,
				integer: Fc,
				float: Fc,
				regexp: Fc,
				email: Fc,
				url: Fc,
				hex: Fc
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
({ ...Ic.Modal });
var Lc = [], Rc = () => Lc.reduce((e, t) => ({
	...e,
	...t
}), Ic.Modal);
function zc(e) {
	if (e) {
		let t = { ...e };
		return Lc.push(t), Rc(), () => {
			Lc = Lc.filter((e) => e !== t), Rc();
		};
	}
	({ ...Ic.Modal });
}
// node_modules/antd/es/locale/context.js
var Bc = /*#__PURE__*/ (0, g.createContext)(void 0), Vc = (e, t) => {
	let n = g.useContext(Bc);
	return [g.useMemo(() => {
		let r = t || Ic[e], i = n?.[e] ?? {};
		return {
			...cc(r) ? r() : r,
			...i || {}
		};
	}, [
		e,
		t,
		n
	]), g.useMemo(() => {
		let e = n?.locale;
		return n?.exist && !e ? Ic.locale : e;
	}, [n])];
}, Hc = "internalMark", Uc = (e) => {
	let { locale: t = {}, children: n, _ANT_MARK__: r } = e;
	g.useEffect(() => zc(t?.Modal), [t]);
	let i = g.useMemo(() => ({
		...t,
		exist: !0
	}), [t]);
	return /*#__PURE__*/ g.createElement(Bc.Provider, { value: i }, n);
}, Wc = /*#__PURE__*/ g.createContext(null), Gc = !1;
function Kc(e) {
	return typeof e == "boolean" && (Gc = e), Gc;
}
// node_modules/@rc-component/portal/es/useDom.js
var qc = [];
function Jc(e, t) {
	let [n] = g.useState(() => v() ? document.createElement("div") : null), r = g.useRef(!1), i = g.useContext(Wc), [a, o] = g.useState(qc), s = i || (r.current ? void 0 : (e) => {
		o((t) => [e, ...t]);
	});
	function c() {
		n.parentElement || document.body.appendChild(n), r.current = !0;
	}
	function l() {
		n.parentElement?.removeChild(n), r.current = !1;
	}
	return b(() => (e ? i ? i(c) : c() : l(), l), [e]), b(() => {
		a.length && (a.forEach((e) => e()), o(qc));
	}, [a]), [n, s];
}
// node_modules/@rc-component/portal/es/util.js
function Yc() {
	return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) && window.innerWidth > document.body.offsetWidth;
}
// node_modules/@rc-component/portal/es/useScrollLocker.js
var Xc = `rc-util-locker-${Date.now()}`, Zc = 0;
function Qc(e) {
	let t = !!e, [n] = g.useState(() => (Zc += 1, `${Xc}_${Zc}`));
	b(() => {
		if (t) {
			let e = Te(document.body).width;
			he(`
html body {
  overflow-y: hidden;
  ${Yc() ? `width: calc(100% - ${e}px);` : ""}
}`, n);
		} else J(n);
		return () => {
			J(n);
		};
	}, [t, n]);
}
// node_modules/@rc-component/portal/es/useEscKeyDown.js
var $c = [], el = 200, tl = 0, nl = (e) => {
	if (e.key === "Escape" && !e.isComposing) {
		if (Date.now() - tl < el) return;
		let t = $c.length;
		for (let n = t - 1; n >= 0; --n) $c[n].onEsc({
			top: n === t - 1,
			event: e
		});
	}
}, rl = () => {
	tl = Date.now();
};
function il() {
	window.addEventListener("keydown", nl), window.addEventListener("compositionend", rl);
}
function al() {
	$c.length === 0 && (window.removeEventListener("keydown", nl), window.removeEventListener("compositionend", rl));
}
function ol(e, t) {
	let n = P(), r = _(t), i = () => {
		$c.find((e) => e.id === n) || $c.push({
			id: n,
			onEsc: r
		});
	}, a = () => {
		$c = $c.filter((e) => e.id !== n);
	};
	(0, g.useMemo)(() => {
		e ? i() : e || a();
	}, [e]), (0, g.useEffect)(() => {
		if (e) return i(), il(), () => {
			a(), al();
		};
	}, [e]);
}
// node_modules/@rc-component/portal/es/Portal.js
var sl = (e) => e === !1 ? !1 : !v() || !e ? null : typeof e == "string" ? document.querySelector(e) : typeof e == "function" ? e() : e, cl = /* @__PURE__ */ g.forwardRef((e, t) => {
	let { open: n, autoLock: r, getContainer: i, debug: a, autoDestroy: o = !0, children: s, onEsc: c } = e, [l, u] = g.useState(n), d = l || n;
	g.useEffect(() => {
		(o || n) && u(n);
	}, [n, o]);
	let [f, p] = g.useState(() => sl(i));
	g.useEffect(() => {
		let e = sl(i);
		p(() => e ?? null);
	});
	let [m, h] = Jc(d && !f, a), _ = f ?? m;
	Qc(r && n && v() && (_ === m || _ === document.body)), ol(n, c);
	let y = null;
	s && re(s) && t && (y = G(s));
	let b = ne(y, t);
	if (!d || !v() || f === void 0) return null;
	let x = _ === !1 || Kc(), S = s;
	return t && (S = /*#__PURE__*/ g.cloneElement(s, { ref: b })), /*#__PURE__*/ g.createElement(Wc.Provider, { value: h }, x ? S : /*#__PURE__*/ (0, st.createPortal)(S, _));
});
// node_modules/@rc-component/trigger/es/Popup/Arrow.js
function ll(e) {
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
function ul() {
	return ul = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, ul.apply(this, arguments);
}
function dl(e) {
	let { prefixCls: t, open: n, zIndex: r, mask: i, motion: a, mobile: o } = e;
	return i ? /*#__PURE__*/ g.createElement(ic, ul({}, a, {
		motionAppear: !0,
		visible: n,
		removeOnLeave: !0
	}), ({ className: e }) => /*#__PURE__*/ g.createElement("div", {
		style: { zIndex: r },
		className: Z(`${t}-mask`, o && `${t}-mobile-mask`, e)
	})) : null;
}
// node_modules/@rc-component/trigger/es/Popup/PopupContent.js
var fl = /*#__PURE__*/ g.memo(({ children: e }) => e, (e, t) => t.cache);
// node_modules/@rc-component/trigger/es/hooks/useOffsetStyle.js
function pl(e, t, n, r, i, a, o, s) {
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
function ml() {
	return ml = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, ml.apply(this, arguments);
}
var hl = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { onEsc: n, popup: r, className: i, prefixCls: a, style: o, target: s, onVisibleChanged: c, open: l, keepDom: u, fresh: d, onClick: f, mask: p, arrow: m, arrowPos: h, align: v, motion: y, maskMotion: x, mobile: S, forceRender: C, getPopupContainer: w, autoDestroy: T, portal: E, children: D, zIndex: O, onMouseEnter: k, onMouseLeave: A, onPointerEnter: j, onPointerDownCapture: M, ready: N, offsetX: P, offsetY: F, offsetR: I, offsetB: L, onAlign: R, onPrepare: z, onResize: B, stretch: V, targetWidth: H, targetHeight: U } = e, W = typeof r == "function" ? r() : r, ee = l || u, ne = !!S, [re, ie, ae] = g.useMemo(() => S ? [
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
	]), G = w?.length > 0, [K, oe] = g.useState(!w || !G);
	b(() => {
		!K && G && s && oe(!0);
	}, [
		K,
		G,
		s
	]);
	let se = _((e, t) => {
		B?.(e, t), R();
	}), ce = pl(ne, N, l, v, I, L, P, F);
	if (!K) return null;
	let q = {};
	return V && (V.includes("height") && U ? q.height = U : V.includes("minHeight") && U && (q.minHeight = U), V.includes("width") && H ? q.width = H : V.includes("minWidth") && H && (q.minWidth = H)), l || (q.pointerEvents = "none"), /*#__PURE__*/ g.createElement(E, {
		open: C || ee,
		getContainer: w && (() => w(s)),
		autoDestroy: T,
		onEsc: n
	}, /*#__PURE__*/ g.createElement(dl, {
		prefixCls: a,
		open: l,
		zIndex: O,
		mask: re,
		motion: ie,
		mobile: ne
	}), /*#__PURE__*/ g.createElement(Et, {
		onResize: se,
		disabled: !l
	}, (e) => /*#__PURE__*/ g.createElement(ic, ml({
		motionAppear: !0,
		motionEnter: !0,
		motionLeave: !0,
		removeOnLeave: !1,
		forceRender: C,
		leavedClassName: `${a}-hidden`
	}, ae, {
		onAppearPrepare: z,
		onEnterPrepare: z,
		visible: l,
		onVisibleChanged: (e) => {
			y?.onVisibleChanged?.(e), c(e);
		}
	}), ({ className: n, style: r }, s) => {
		let c = Z(a, n, i, { [`${a}-mobile`]: ne });
		return /*#__PURE__*/ g.createElement("div", {
			ref: te(e, t, s),
			className: c,
			style: {
				"--arrow-x": `${h.x || 0}px`,
				"--arrow-y": `${h.y || 0}px`,
				...ce,
				...q,
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
		}, m && /*#__PURE__*/ g.createElement(ll, {
			prefixCls: a,
			arrow: m,
			arrowPos: h,
			align: v
		}), /*#__PURE__*/ g.createElement(fl, { cache: !l && !d }, W));
	})), D);
}), gl = /*#__PURE__*/ g.createContext(null), _l = /*#__PURE__*/ g.createContext(null);
// node_modules/@rc-component/trigger/es/hooks/useAction.js
function vl(e) {
	return e ? Array.isArray(e) ? e : [e] : [];
}
function yl(e, t, n) {
	return g.useMemo(() => {
		let r = vl(t ?? e), i = vl(n ?? e), a = new Set(r), o = new Set(i);
		return a.has("hover") && !a.has("click") && a.add("touch"), o.has("hover") && !o.has("click") && o.add("touch"), [a, o];
	}, [
		e,
		t,
		n
	]);
}
// node_modules/@rc-component/trigger/es/util.js
function bl(e = [], t = [], n) {
	let r = (e, t) => e[t] || "";
	return n ? r(e, 0) === r(t, 0) : r(e, 0) === r(t, 0) && r(e, 1) === r(t, 1);
}
function xl(e, t, n, r) {
	let { points: i } = n, a = Object.keys(e);
	for (let n = 0; n < a.length; n += 1) {
		let o = a[n];
		if (bl(e[o]?.points, i, r)) return `${t}-placement-${o}`;
	}
	return "";
}
function Sl(e) {
	return e.ownerDocument.defaultView;
}
function Cl(e) {
	let t = [], n = e?.parentElement, r = [
		"hidden",
		"scroll",
		"clip",
		"auto"
	];
	for (; n;) {
		let { overflowX: e, overflowY: i, overflow: a } = Sl(n).getComputedStyle(n);
		[
			e,
			i,
			a
		].some((e) => r.includes(e)) && t.push(n), n = n.parentElement;
	}
	return t;
}
function wl(e, t = 1) {
	return Number.isNaN(e) ? t : e;
}
function Tl(e) {
	return wl(parseFloat(e), 0);
}
function El(e, t) {
	let n = { ...e };
	return (t || []).forEach((e) => {
		if (e instanceof HTMLBodyElement || e instanceof HTMLHtmlElement) return;
		let { overflow: t, overflowClipMargin: r, borderTopWidth: i, borderBottomWidth: a, borderLeftWidth: o, borderRightWidth: s } = Sl(e).getComputedStyle(e), c = e.getBoundingClientRect(), { offsetHeight: l, clientHeight: u, offsetWidth: d, clientWidth: f } = e, p = Tl(i), m = Tl(a), h = Tl(o), g = Tl(s), _ = wl(Math.round(c.width / d * 1e3) / 1e3), v = wl(Math.round(c.height / l * 1e3) / 1e3), y = (d - f - h - g) * _, b = (l - u - p - m) * v, x = p * v, S = m * v, C = h * _, w = g * _, T = 0, E = 0;
		if (t === "clip") {
			let e = Tl(r);
			T = e * _, E = e * v;
		}
		let D = c.x + C - T, O = c.y + x - E, k = D + c.width + 2 * T - C - w - y, A = O + c.height + 2 * E - x - S - b;
		n.left = Math.max(n.left, D), n.top = Math.max(n.top, O), n.right = Math.min(n.right, k), n.bottom = Math.min(n.bottom, A);
	}), n;
}
// node_modules/@rc-component/trigger/es/hooks/useAlign.js
function Dl(e, t = 0) {
	let n = `${t}`, r = n.match(/^(.*)\%$/);
	return r ? e * (parseFloat(r[1]) / 100) : parseFloat(n);
}
function Ol(e, t) {
	let [n, r] = t || [];
	return [Dl(e.width, n), Dl(e.height, r)];
}
function kl(e = "") {
	return [e[0], e[1]];
}
function Al(e, t) {
	let n = t[0], r = t[1], i, a;
	return a = n === "t" ? e.y : n === "b" ? e.y + e.height : e.y + e.height / 2, i = r === "l" ? e.x : r === "r" ? e.x + e.width : e.x + e.width / 2, {
		x: i,
		y: a
	};
}
function jl(e, t) {
	let n = {
		t: "b",
		b: "t",
		l: "r",
		r: "l"
	}, r = [...e];
	return r[t] = n[e[t]] || "c", r;
}
function Ml(e) {
	return e.join("");
}
function Nl(e, t, n, r, i, a, o, s) {
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
	}), u = g.useRef(0), d = g.useMemo(() => !t || s ? [] : Cl(t), [t]), f = g.useRef({});
	e || (f.current = {});
	let p = _(() => {
		if (t && n && e && !s) {
			let e = t, s = e.ownerDocument, c = Sl(e), { position: u } = c.getComputedStyle(e), p = e.style.left, m = e.style.top, h = e.style.right, g = e.style.bottom, _ = e.style.overflow, v = e.style.overflowX, y = e.style.overflowY, b = {
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
			}, { htmlRegion: R } = b, z = "visible", B = "visibleFirst";
			R !== "scroll" && R !== B && (R = z);
			let V = R === B, H = El(L, d), U = El(I, d), W = R === z ? U : H, ee = V ? U : W;
			e.style.left = "auto", e.style.top = "auto", e.style.right = "0", e.style.bottom = "0";
			let te = e.getBoundingClientRect();
			e.style.left = p, e.style.top = m, e.style.right = h, e.style.bottom = g, e.style.overflow = _, e.style.overflowX = v, e.style.overflowY = y, e.parentElement?.removeChild(x);
			let ne = wl(Math.round(N / parseFloat(T) * 1e3) / 1e3), re = wl(Math.round(M / parseFloat(w) * 1e3) / 1e3);
			if (ne === 0 || re === 0 || ge(n) && !ve(n)) return;
			let { offset: ie, targetOffset: ae } = b, [G, K] = Ol(C, ie), [oe, se] = Ol(S, ae);
			S.x -= oe, S.y -= se;
			let [ce, q] = b.points || [], le = kl(q), ue = kl(ce), de = Al(S, le), fe = Al(C, ue), pe = { ...b }, me = [ue, le], J = de.x - fe.x + G, Y = de.y - fe.y + K;
			function he(e, t, n = W) {
				let r = C.x + e, i = C.y + t, a = r + N, o = i + M, s = Math.max(r, n.left), c = Math.max(i, n.top), l = Math.min(a, n.right), u = Math.min(o, n.bottom);
				return Math.max(0, (l - s) * (u - c));
			}
			let _e = he(J, Y), ye = he(J, Y, U), be = Al(S, ["t", "l"]), xe = Al(C, ["t", "l"]), Se = Al(S, ["b", "r"]), Ce = Al(C, ["b", "r"]), { adjustX: X, adjustY: we, shiftX: Te, shiftY: Ee } = b.overflow || {}, De = (e) => typeof e == "boolean" ? e : e >= 0, Oe, ke, Ae, je;
			function Me() {
				Oe = C.y + Y, ke = Oe + M, Ae = C.x + J, je = Ae + N;
			}
			Me();
			let Ne = De(we), Pe = ue[0] === le[0];
			if (Ne && ue[0] === "t" && (ke > ee.bottom || f.current.bt)) {
				let e = Y;
				Pe ? e -= M - P : e = be.y - Ce.y - K;
				let t = he(J, e), n = he(J, e, U);
				t > _e || t === _e && (!V || n >= ye) ? (f.current.bt = !0, Y = e, K = -K, me = [jl(me[0], 0), jl(me[1], 0)]) : f.current.bt = !1;
			}
			if (Ne && ue[0] === "b" && (Oe < ee.top || f.current.tb)) {
				let e = Y;
				Pe ? e += M - P : e = Se.y - xe.y - K;
				let t = he(J, e), n = he(J, e, U);
				t > _e || t === _e && (!V || n >= ye) ? (f.current.tb = !0, Y = e, K = -K, me = [jl(me[0], 0), jl(me[1], 0)]) : f.current.tb = !1;
			}
			let Fe = De(X), Ie = ue[1] === le[1];
			if (Fe && ue[1] === "l" && (je > ee.right || f.current.rl)) {
				let e = J;
				Ie ? e -= N - F : e = be.x - Ce.x - G;
				let t = he(e, Y), n = he(e, Y, U);
				t > _e || t === _e && (!V || n >= ye) ? (f.current.rl = !0, J = e, G = -G, me = [jl(me[0], 1), jl(me[1], 1)]) : f.current.rl = !1;
			}
			if (Fe && ue[1] === "r" && (Ae < ee.left || f.current.lr)) {
				let e = J;
				Ie ? e += N - F : e = Se.x - xe.x - G;
				let t = he(e, Y), n = he(e, Y, U);
				t > _e || t === _e && (!V || n >= ye) ? (f.current.lr = !0, J = e, G = -G, me = [jl(me[0], 1), jl(me[1], 1)]) : f.current.lr = !1;
			}
			pe.points = [Ml(me[0]), Ml(me[1])], Me();
			let Le = Te === !0 ? 0 : Te;
			typeof Le == "number" && (Ae < U.left && (J -= Ae - U.left - G, S.x + F < U.left + Le && (J += S.x - U.left + F - Le)), je > U.right && (J -= je - U.right - G, S.x > U.right - Le && (J += S.x - U.right + Le)));
			let Re = Ee === !0 ? 0 : Ee;
			typeof Re == "number" && (Oe < U.top && (Y -= Oe - U.top - K, S.y + P < U.top + Re && (Y += S.y - U.top + P - Re)), ke > U.bottom && (Y -= ke - U.bottom - K, S.y > U.bottom - Re && (Y += S.y - U.bottom + Re)));
			let ze = C.x + J, Be = ze + N, Ve = C.y + Y, He = Ve + M, Ue = S.x, We = Ue + F, Ge = S.y, Ke = Ge + P, qe = (Math.max(ze, Ue) + Math.min(Be, We)) / 2 - ze, Je = (Math.max(Ve, Ge) + Math.min(He, Ke)) / 2 - Ve;
			o?.(t, pe);
			let Ye = te.right - C.x - (J + C.width), Xe = te.bottom - C.y - (Y + C.height);
			ne === 1 && (J = Math.floor(J), Ye = Math.floor(Ye)), re === 1 && (Y = Math.floor(Y), Xe = Math.floor(Xe));
			let Ze = {
				ready: !0,
				offsetX: J / ne,
				offsetY: Y / re,
				offsetR: Ye / ne,
				offsetB: Xe / re,
				arrowX: qe / ne,
				arrowY: Je / re,
				scaleX: ne,
				scaleY: re,
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
function Pl() {
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
function Fl(e, t, n, r, i) {
	b(() => {
		if (e && t && n) {
			let e = t, a = n, o = Cl(e), s = Cl(a), c = Sl(a), l = /* @__PURE__ */ new Set([
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
function Il(e, t, n, r, i, a, o, s) {
	let c = g.useRef(e);
	c.current = e;
	let l = g.useRef(!1);
	g.useEffect(() => {
		if (t && r && (!i || a)) {
			let e = () => {
				l.current = !1;
			}, t = (e) => {
				c.current && !o(e.composedPath?.()?.[0] || e.target) && !l.current && s(!1);
			}, i = Sl(r);
			i.addEventListener("pointerdown", e, !0), i.addEventListener("mousedown", t, !0), i.addEventListener("contextmenu", t, !0);
			let a = Ce(n);
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
function Ll() {
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
function Rl() {
	return Rl = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Rl.apply(this, arguments);
}
var zl = (e) => {
	let { prefixCls: t, isMobile: n, ready: r, open: i, align: a, offsetR: o, offsetB: s, offsetX: c, offsetY: l, arrowPos: u, popupSize: d, motion: f, uniqueContainerClassName: p, uniqueContainerStyle: m } = e, h = `${t}-unique-container`, [_, v] = g.useState(!1), y = pl(n, r, i, a, o, s, c, l), b = g.useRef(y);
	r && (b.current = y);
	let x = {};
	return d && (x.width = d.width, x.height = d.height), /*#__PURE__*/ g.createElement(ic, Rl({
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
}, Bl = ({ children: e, postTriggerProps: t }) => {
	let [n, r, i, a] = Ll(), o = g.useMemo(() => !i || !t ? i : t(i), [i, t]), [s, c] = g.useState(null), [l, u] = g.useState(null), d = g.useRef(null), f = _((e) => {
		d.current = e, ge(e) && s !== e && c(e);
	}), p = g.useRef(null), m = Pl(), h = _((e, t) => {
		p.current = t, m(() => {
			n(e);
		}, e.delay);
	}), v = (e) => {
		m(() => {
			p.current?.() || n(!1);
		}, e);
	}, y = _((e) => {
		a(e);
	}), [b, x, S, C, w, T, E, , , D, O] = Nl(r, s, o?.target, o?.popupPlacement, o?.builtinPlacements || {}, o?.popupAlign, void 0, !1), k = g.useMemo(() => o ? Z(xl(o.builtinPlacements || {}, o.prefixCls || "", D, !1), o.getPopupClassNameFromAlign?.(D)) : "", [
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
	let j = _(() => (O(), Promise.resolve())), M = g.useRef({}), N = g.useContext(gl), P = g.useMemo(() => ({ registerSubPopup: (e, t) => {
		M.current[e] = t, N?.registerSubPopup(e, t);
	} }), [N]), F = o?.prefixCls;
	return /*#__PURE__*/ g.createElement(_l.Provider, { value: A }, e, o && /*#__PURE__*/ g.createElement(gl.Provider, { value: P }, /*#__PURE__*/ g.createElement(hl, {
		ref: f,
		portal: cl,
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
	}, /*#__PURE__*/ g.createElement(zl, {
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
function Vl(e = cl) {
	return /* @__PURE__ */ g.forwardRef((t, n) => {
		let { prefixCls: r = "rc-trigger-popup", children: i, action: a = "hover", showAction: o, hideAction: s, disabled: c = !1, popupVisible: l, defaultPopupVisible: u, onOpenChange: d, afterOpenChange: f, onPopupVisibleChange: p, afterPopupVisibleChange: m, mouseEnterDelay: h, mouseLeaveDelay: v = .1, focusDelay: y, blurDelay: x, mask: S, maskClosable: w = !0, getPopupContainer: T, forceRender: E, autoDestroy: D, popup: O, popupClassName: k, uniqueContainerClassName: A, uniqueContainerStyle: j, popupStyle: M, popupPlacement: N, builtinPlacements: F = {}, popupAlign: I, zIndex: L, stretch: R, getPopupClassNameFromAlign: z, fresh: B, unique: V, alignPoint: H, onPopupClick: U, onPopupAlign: W, arrow: ee, popupMotion: te, maskMotion: re, mobile: ie, ...ae } = t, K = D || !1, oe = l === void 0, se = !!ie, ce = g.useRef({}), q = g.useContext(gl), le = g.useMemo(() => ({ registerSubPopup: (e, t) => {
			ce.current[e] = t, q?.registerSubPopup(e, t);
		} }), [q]), ue = g.useContext(_l), de = P(), [fe, pe] = g.useState(null), me = g.useRef(null), J = _((e) => {
			me.current = e, ge(e) && fe !== e && pe(e), q?.registerSubPopup(de, e);
		}), [Y, he] = g.useState(null), ve = g.useRef(null), ye = _((e) => {
			let t = _e(e);
			ge(t) && Y !== t && (he(t), ve.current = t);
		}), be = {}, xe = _((e) => {
			let t = Y;
			return t?.contains(e) || Ce(t)?.host === e || e === t || fe?.contains(e) || Ce(fe)?.host === e || e === fe || Object.values(ce.current).some((t) => t?.contains(e) || e === t);
		}), Se = ee ? { ...ee === !0 ? {} : ee } : null, [X, we] = C(u || !1, l), Te = X || !1, Ee = Te && !c, De = g.useMemo(() => {
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
			popupPlacement: N,
			builtinPlacements: F,
			popupAlign: I,
			zIndex: L,
			mask: S,
			maskClosable: w,
			popupMotion: te,
			maskMotion: re,
			arrow: Se,
			getPopupContainer: T,
			getPopupClassNameFromAlign: z,
			id: de,
			onEsc: Fe
		}));
		b(() => {
			ue && V && Y && !oe && !q && (Ee ? ue.show(Ae(h), ke) : ue.hide(v));
		}, [Ee, Y]);
		let je = g.useRef(Ee);
		je.current = Ee;
		let Me = _((e) => {
			(0, st.flushSync)(() => {
				Te !== e && (we(e), d?.(e), p?.(e));
			});
		}), Ne = Pl(), Pe = (e, t = 0) => {
			l === void 0 && ue && V && oe && !q ? e ? ue.show(Ae(t), ke) : ue.hide(t) : Ne(() => {
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
		}, [Ue, We, Ge, Ke, qe, Je, Ye, Xe, Ze, Qe, $e] = Nl(Ee, fe, H && Be !== null ? Be : Y, N, F, I, W, se), [et, tt] = yl(a, o, s), nt = et.has("click"), rt = tt.has("click") || tt.has("contextMenu"), it = _(() => {
			Ie || $e();
		});
		Fl(Ee, Y, fe, it, () => {
			je.current && H && rt && Pe(!1);
		}), b(() => {
			it();
		}, [Be, N]), b(() => {
			Ee && !F?.[N] && it();
		}, [JSON.stringify(I)]);
		let at = g.useMemo(() => Z(xl(F, r, Qe, H), z?.(Qe)), [
			Qe,
			z,
			F,
			r,
			H
		]);
		g.useImperativeHandle(n, () => ({
			nativeElement: ve.current,
			popupElement: me.current,
			forceAlign: it
		}));
		let [ot, ct] = g.useState(0), [lt, ut] = g.useState(0), dt = () => {
			if (R && Y) {
				let e = Y.getBoundingClientRect();
				ct(e.width), ut(e.height);
			}
		}, ft = () => {
			dt(), it();
		}, pt = (e) => {
			Le(!1), $e(), f?.(e), m?.(e);
		}, mt = () => new Promise((e) => {
			dt(), ze(() => e);
		});
		b(() => {
			Re && ($e(), Re(), ze(null));
		}, [Re]);
		function ht(e, t, n, r, i) {
			be[e] = (a, ...o) => {
				i && i() || (r?.(a), Pe(t, n)), Oe[e]?.(a, ...o);
			};
		}
		let gt = et.has("touch"), _t = tt.has("touch"), vt = g.useRef(!1);
		(gt || _t) && (be.onTouchStart = (...e) => {
			vt.current = !0, je.current && _t ? Pe(!1) : !je.current && gt && Pe(!0), Oe.onTouchStart?.(...e);
		}), (nt || rt) && (be.onClick = (e, ...t) => {
			je.current && rt ? Pe(!1) : !je.current && nt && (He(e), Pe(!0)), Oe.onClick?.(e, ...t), vt.current = !1;
		});
		let yt = Il(Ee, rt || _t, Y, fe, S, w, xe, Pe), xt = et.has("hover"), St = tt.has("hover"), Ct, wt, Tt = () => vt.current;
		if (xt) {
			let e = (e) => {
				He(e);
			};
			ht("onMouseEnter", !0, h, e, Tt), ht("onPointerEnter", !0, h, e, Tt), Ct = (e) => {
				(Ee || Ie) && fe?.contains(e.target) && Pe(!0, h);
			}, H && (be.onMouseMove = (e) => {
				Oe.onMouseMove?.(e);
			});
		}
		St && (ht("onMouseLeave", !1, v, void 0, Tt), ht("onPointerLeave", !1, v, void 0, Tt), wt = () => {
			Pe(!1, v);
		}), et.has("focus") && ht("onFocus", !0, y), tt.has("focus") && ht("onBlur", !1, x), et.has("contextMenu") && (be.onContextMenu = (e, ...t) => {
			je.current && tt.has("contextMenu") ? Pe(!1) : (He(e), Pe(!0)), e.preventDefault(), Oe.onContextMenu?.(e, ...t);
		});
		let Et = g.useRef(!1);
		Et.current ||= E || Ee || Ie;
		let Dt = {
			...Oe,
			...be
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
			ae[e] && (Ot[e] = (...t) => {
				Dt[e]?.(...t), ae[e](...t);
			});
		});
		let kt = {
			x: Je,
			y: Ye
		};
		bt(Ee, Y, ft);
		let At = ne(ye, G(De)), jt = /*#__PURE__*/ g.cloneElement(De, {
			...Dt,
			...Ot,
			ref: At
		});
		return /*#__PURE__*/ g.createElement(g.Fragment, null, jt, Et.current && (!ue || !V) && /*#__PURE__*/ g.createElement(gl.Provider, { value: le }, /*#__PURE__*/ g.createElement(hl, {
			portal: e,
			ref: J,
			prefixCls: r,
			popup: O,
			className: Z(k, !se && at),
			style: M,
			target: Y,
			onMouseEnter: Ct,
			onMouseLeave: wt,
			onPointerEnter: Ct,
			zIndex: L,
			open: Ee,
			keepDom: Ie,
			fresh: B,
			onClick: U,
			onPointerDownCapture: yt,
			mask: S,
			motion: te,
			maskMotion: re,
			onVisibleChanged: pt,
			onPrepare: mt,
			forceRender: E,
			autoDestroy: K,
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
			onAlign: it,
			stretch: R,
			targetWidth: ot / Xe,
			targetHeight: lt / Ze,
			mobile: ie
		})));
	});
}
var Hl = Vl(cl);
// node_modules/antd/es/_util/reactNode.js
function Ul(e) {
	return e && /*#__PURE__*/ g.isValidElement(e) && e.type === g.Fragment;
}
var Wl = (e, t, n) => /*#__PURE__*/ g.isValidElement(e) ? /*#__PURE__*/ g.cloneElement(e, cc(n) ? n(e.props || {}) : n) : t;
function Gl(e, t) {
	return Wl(e, e, t);
}
// node_modules/antd/es/tooltip/UniqueProvider/MotionContent.js
var Kl = ({ children: e }) => {
	let { getPrefixCls: t } = g.useContext(It), n = t();
	return /*#__PURE__*/ g.isValidElement(e) ? /*#__PURE__*/ g.createElement(ic, {
		visible: !0,
		motionName: `${n}-fade`,
		motionAppear: !0,
		motionEnter: !0,
		motionLeave: !1,
		removeOnLeave: !1
	}, ({ style: t, className: n }) => Gl(e, (e) => ({
		className: Z(e.className, n),
		style: {
			...e.style,
			...t
		}
	}))) : e;
}, ql = [null, null];
function Jl(e) {
	if (ql[0] !== e) {
		let t = {};
		Object.keys(e).forEach((n) => {
			t[n] = {
				...e[n],
				dynamicInset: !1
			};
		}), ql[0] = e, ql[1] = t;
	}
	return ql[1];
}
var Yl = ({ children: e }) => /*#__PURE__*/ g.createElement(Bl, { postTriggerProps: (e) => {
	let { id: t, builtinPlacements: n, popup: r } = e, i = cc(r) ? r() : r, a = Jl(n);
	return {
		...e,
		getPopupContainer: null,
		arrow: !1,
		popup: /*#__PURE__*/ g.createElement(Kl, { key: t }, i),
		builtinPlacements: a
	};
} }, e), Xl = /*#__PURE__*/ g.createContext(!1), Zl = ({ children: e, disabled: t }) => {
	let n = g.useContext(Xl);
	return /*#__PURE__*/ g.createElement(Xl.Provider, { value: t ?? n }, e);
}, Ql = /*#__PURE__*/ g.createContext(void 0), $l = ({ children: e, size: t }) => {
	let n = g.useContext(Ql);
	return /*#__PURE__*/ g.createElement(Ql.Provider, { value: t || n }, e);
};
// node_modules/antd/es/config-provider/hooks/useConfig.js
function eu() {
	return {
		componentDisabled: (0, g.useContext)(Xl),
		componentSize: (0, g.useContext)(Ql)
	};
}
// node_modules/antd/es/config-provider/hooks/useTheme.js
function tu(e, t, n) {
	dt("ConfigProvider");
	let r = e || {}, i = r.inherit === !1 || !t ? {
		...Qa,
		hashed: t?.hashed ?? Qa.hashed,
		cssVar: t?.cssVar,
		zeroRuntime: t?.zeroRuntime
	} : t, a = (0, g.useId)();
	return F(() => {
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
		return !Fe(e, r, !0);
	}));
}
// node_modules/antd/es/config-provider/MotionWrapper.js
var nu = /*#__PURE__*/ g.createContext(!0);
function ru(e) {
	let t = g.useContext(nu), { children: n } = e, [, r] = so(), { motion: i } = r, a = g.useRef(!1);
	return a.current ||= t !== i, a.current ? /*#__PURE__*/ g.createElement(nu.Provider, { value: i }, /*#__PURE__*/ g.createElement(gs, { motion: i }, n)) : n;
}
// node_modules/antd/es/config-provider/PropWarning.js
var iu = () => null, au = ({ iconPrefixCls: e, csp: t }) => (wo(e, t), null), ou = [
	"getTargetContainer",
	"getPopupContainer",
	"renderEmpty",
	"input",
	"pagination",
	"form",
	"select",
	"button"
], su = (e) => {
	let { prefixCls: t, iconPrefixCls: n, theme: r, holderRender: i } = e;
	"holderRender" in e;
}, cu = (e) => {
	let { children: t, csp: n, autoInsertSpaceInButton: r, alert: i, affix: a, anchor: o, app: s, form: c, locale: l, componentSize: u, direction: d, space: f, splitter: p, virtual: m, dropdownMatchSelectWidth: h, popupMatchSelectWidth: _, popupOverflow: v, legacyLocale: y, parentContext: b, iconPrefixCls: x, theme: S, componentDisabled: C, segmented: w, statistic: T, spin: E, calendar: D, carousel: O, cascader: k, collapse: A, typography: j, checkbox: M, descriptions: N, divider: P, drawer: I, skeleton: L, steps: R, image: z, layout: B, list: V, listy: H, mentions: U, modal: W, progress: ee, result: te, slider: ne, breadcrumb: re, masonry: ie, menu: ae, pagination: G, input: K, inputPassword: oe, inputSearch: se, textArea: ce, otp: q, empty: le, badge: ue, borderBeam: de, radio: fe, rate: pe, ribbon: me, switch: J, transfer: Y, avatar: he, message: ge, tag: _e, table: ve, card: ye, cardMeta: be, tabs: xe, timeline: Se, timePicker: Ce, upload: X, notification: we, tree: Te, colorPicker: Ee, datePicker: De, rangePicker: Oe, flex: ke, wave: Ae, dropdown: je, warning: Me, tour: Ne, tooltip: Pe, popover: Fe, popconfirm: Ie, qrcode: Le, floatButton: Re, floatButtonGroup: ze, variant: Be, inputNumber: Ve, treeSelect: He, watermark: Ue } = e, We = g.useMemo(() => sc(l) && Object.prototype.hasOwnProperty.call(l, "default") && l.default?.locale ? l.default : l, [l]), Ge = g.useCallback((t, n) => {
		let { prefixCls: r } = e;
		if (n) return n;
		let i = r || b.getPrefixCls("");
		return t ? `${i}-${t}` : i;
	}, [b.getPrefixCls, e.prefixCls]), Ke = x || b.iconPrefixCls || "anticon", qe = n || b.csp, Je = tu(S, b.theme, { prefixCls: Ge("") }), Ye = {
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
		divider: P,
		drawer: I,
		skeleton: L,
		steps: R,
		image: z,
		input: K,
		inputPassword: oe,
		inputSearch: se,
		textArea: ce,
		otp: q,
		layout: B,
		list: V,
		listy: H,
		mentions: U,
		modal: W,
		progress: ee,
		result: te,
		slider: ne,
		breadcrumb: re,
		masonry: ie,
		menu: ae,
		pagination: G,
		empty: le,
		badge: ue,
		borderBeam: de,
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
		tabs: xe,
		timeline: Se,
		timePicker: Ce,
		upload: X,
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
	}, Xe = { ...b };
	Object.keys(Ye).forEach((e) => {
		Ye[e] !== void 0 && (Xe[e] = Ye[e]);
	}), ou.forEach((t) => {
		let n = e[t];
		n && (Xe[t] = n);
	}), r !== void 0 && (Xe.button = {
		autoInsertSpace: r,
		...Xe.button
	});
	let Ze = F(() => Xe, Xe, (e, t) => {
		let n = Object.keys(e), r = Object.keys(t);
		return n.length !== r.length || n.some((n) => e[n] !== t[n]);
	}), { layer: Qe } = g.useContext(Yt), $e = g.useMemo(() => ({
		prefixCls: Ke,
		csp: qe,
		layer: Qe ? "antd" : void 0,
		zeroRuntime: !!Qe || Je?.zeroRuntime
	}), [
		Ke,
		qe,
		Qe,
		Je?.zeroRuntime
	]), et = /*#__PURE__*/ g.createElement(g.Fragment, null, /*#__PURE__*/ g.createElement(au, {
		iconPrefixCls: Ke,
		csp: qe
	}), /*#__PURE__*/ g.createElement(iu, { dropdownMatchSelectWidth: h }), t), tt = g.useMemo(() => nt(Ic.Form?.defaultValidateMessages || {}, Ze.locale?.Form?.defaultValidateMessages || {}, Ze.form?.validateMessages || {}, c?.validateMessages || {}), [Ze, c?.validateMessages]);
	Object.keys(tt).length > 0 && (et = /*#__PURE__*/ g.createElement(kc.Provider, { value: tt }, et)), We && (et = /*#__PURE__*/ g.createElement(Uc, {
		locale: We,
		_ANT_MARK__: Hc
	}, et)), (Ke || qe) && (et = /*#__PURE__*/ g.createElement(Eo.Provider, { value: $e }, et)), u && (et = /*#__PURE__*/ g.createElement($l, { size: u }, et)), et = /*#__PURE__*/ g.createElement(ru, null, et), Pe?.unique && (et = /*#__PURE__*/ g.createElement(Yl, null, et));
	let rt = g.useMemo(() => {
		let { algorithm: e, token: t, components: n, cssVar: r, ...i } = Je || {}, a = e && (!Array.isArray(e) || e.length > 0) ? tn(e) : Za, o = {};
		Object.entries(n || {}).forEach(([e, t]) => {
			let n = { ...t };
			"algorithm" in n && (n.algorithm === !0 ? n.theme = a : (Array.isArray(n.algorithm) || cc(n.algorithm)) && (n.theme = tn(n.algorithm)), delete n.algorithm), o[e] = n;
		});
		let s = {
			...qi,
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
	return S && (et = /*#__PURE__*/ g.createElement($a.Provider, { value: rt }, et)), Ze.warning && (et = /*#__PURE__*/ g.createElement(ut.Provider, { value: Ze.warning }, et)), C !== void 0 && (et = /*#__PURE__*/ g.createElement(Zl, { disabled: C }, et)), /*#__PURE__*/ g.createElement(It.Provider, { value: Ze }, et);
}, lu = (e) => {
	let t = g.useContext(It), n = g.useContext(Bc);
	return /*#__PURE__*/ g.createElement(cu, {
		parentContext: t,
		legacyLocale: n,
		...e
	});
};
lu.ConfigContext = It, lu.SizeContext = Ql, lu.config = su, lu.useConfig = eu, Object.defineProperty(lu, "SizeContext", { get: () => Ql });
// node_modules/@ant-design/icons-svg/es/asn/LoadingOutlined.js
var uu = {
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
function du() {
	return du = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, du.apply(this, arguments);
}
var fu = /*#__PURE__*/ g.forwardRef((e, t) => /*#__PURE__*/ g.createElement(es, du({}, e, {
	ref: t,
	icon: uu
})));
// node_modules/antd/es/_util/fallbackProp.js
function pu(...e) {
	return e.find((e) => e !== void 0);
}
// node_modules/antd/es/_util/hooks/useClosable.js
var mu = (e) => {
	if (!e) return;
	let { closable: t, closeIcon: n } = e;
	return {
		closable: t,
		closeIcon: n
	};
}, hu = {}, gu = (e, t) => {
	if (!e && (e === !1 || t === !1 || t === null)) return !1;
	if (!Ie(e) && !Ie(t)) return null;
	let n = { closeIcon: typeof t != "boolean" && Ie(t) ? t : void 0 };
	return sc(e) && (n = {
		...n,
		...e
	}), n;
}, _u = (e, t, n) => e === !1 ? !1 : e ? Je(n, t, e) : t === !1 ? !1 : t ? Je(n, t) : n.closable ? n : !1, vu = (e, t, n) => {
	let { closeIconRender: r } = t, { closeIcon: i, ...a } = e, o = i, s = Ke(a, !0);
	return Ie(o) && (r && (o = r(o)), o = /*#__PURE__*/ g.isValidElement(o) ? /*#__PURE__*/ g.cloneElement(o, {
		"aria-label": n,
		...o.props,
		...s
	}) : /*#__PURE__*/ g.createElement("span", {
		"aria-label": n,
		...s
	}, o)), [o, {
		"aria-label": n,
		...s
	}];
}, yu = (e, t, n = hu, r = "Close") => {
	let i = gu(e?.closable, e?.closeIcon), a = gu(t?.closable, t?.closeIcon), o = {
		closeIcon: /*#__PURE__*/ g.createElement(cs, null),
		...n
	}, s = _u(i, a, o), c = typeof s != "boolean" && !!s?.disabled;
	if (s === !1) return [
		!1,
		null,
		c,
		{}
	];
	let [l, u] = vu(s, o, r);
	return [
		!0,
		l,
		c,
		u
	];
}, bu = (e, t, n = hu) => {
	let [r] = Vc("global", Ic.global);
	return g.useMemo(() => yu(e, t, {
		closeIcon: /*#__PURE__*/ g.createElement(cs, null),
		...n
	}, r.close), [
		e,
		t,
		n,
		r.close
	]);
}, xu = /*#__PURE__*/ g.createContext(void 0), Su = 100, Cu = {
	Modal: Su,
	Drawer: Su,
	Popover: Su,
	Popconfirm: Su,
	Tooltip: Su,
	Tour: Su,
	FloatButton: Su
}, wu = {
	SelectLike: 50,
	Dropdown: 50,
	DatePicker: 50,
	Menu: 50,
	ImagePreview: 1
}, Tu = (e) => e in Cu, Eu = (e, t) => {
	let [, n] = so(), r = g.useContext(xu), i = Tu(e), a;
	if (t !== void 0) a = [t, t];
	else {
		let o = r ?? 0;
		o += i ? (r ? 0 : n.zIndexPopupBase) + Cu[e] : wu[e], a = [r === void 0 ? t : o, o];
	}
	return a;
}, Du = (e, t, n) => n === void 0 ? `${e}-${t}` : n, Ou = bo("Wave", (e) => {
	let { componentCls: t, colorPrimary: n, motionDurationSlow: r, motionEaseInOut: i, motionEaseOutCirc: a, antCls: o } = e, [, s] = So(o, "wave");
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
}), ku = "ant-wave-target", Au = (e) => e ? oc(e) && e !== "#fff" && e !== "#ffffff" && e !== "rgb(255, 255, 255)" && e !== "rgba(255, 255, 255, 1)" && !/rgba\((?:\d*, ){3}0\)/i.test(e) && !/^#(?:[0-9a-f]{3}0|[0-9a-f]{6}00)$/i.test(e) && e !== "transparent" && e !== "canvastext" : !1;
function ju(e, t = null) {
	let n = getComputedStyle(e), { borderTopColor: r, borderColor: i, backgroundColor: a } = n;
	return t && Au(n[t]) ? n[t] : [
		r,
		i,
		a
	].find(Au) ?? null;
}
// node_modules/antd/es/_util/wave/WaveEffect.js
function Mu(e) {
	return Number.isNaN(e) ? 0 : e;
}
var Nu = (e) => {
	let { className: t, target: n, component: r, colorSource: i } = e, a = g.useRef(null), { getPrefixCls: o } = g.useContext(It), [s] = So(o(), "wave"), [c, l] = g.useState(null), [u, d] = g.useState([]), [f, p] = g.useState(0), [m, h] = g.useState(0), [_, v] = g.useState(0), [y, b] = g.useState(0), [x, S] = g.useState(!1), C = {
		left: f,
		top: m,
		width: _,
		height: y,
		borderRadius: u.map((e) => `${e}px`).join(" ")
	};
	c && (C[s("color")] = c);
	function w() {
		let e = getComputedStyle(n);
		l(ju(n, i));
		let t = e.position === "static", { borderLeftWidth: r, borderTopWidth: a } = e;
		p(t ? n.offsetLeft : Mu(-Number.parseFloat(r))), h(t ? n.offsetTop : Mu(-Number.parseFloat(a))), v(n.offsetWidth), b(n.offsetHeight);
		let { borderTopLeftRadius: o, borderTopRightRadius: s, borderBottomLeftRadius: c, borderBottomRightRadius: u } = e;
		d([
			o,
			s,
			u,
			c
		].map((e) => Mu(Number.parseFloat(e))));
	}
	if (g.useEffect(() => {
		if (n) {
			let e = k(() => {
				w(), S(!0);
			}), t;
			return typeof ResizeObserver < "u" && (t = new ResizeObserver(w), t.observe(n)), () => {
				k.cancel(e), t?.disconnect();
			};
		}
	}, [n]), !x) return null;
	let T = (r === "Checkbox" || r === "Radio") && n?.classList.contains(ku);
	return /*#__PURE__*/ g.createElement(ic, {
		visible: !0,
		motionAppear: !0,
		motionName: "wave-motion",
		motionDeadline: 5e3,
		onAppearEnd: (e, t) => {
			if (t.deadline || lc(t) && t.propertyName === "opacity") {
				let e = a.current?.parentElement;
				ot(e).then(() => {
					e?.remove();
				});
			}
			return !1;
		}
	}, ({ className: e }, n) => /*#__PURE__*/ g.createElement("div", {
		ref: te(a, n),
		className: Z(t, e, { "wave-quick": T }),
		style: C
	}));
}, Pu = (e, t) => {
	let { component: n } = t;
	if (n === "Checkbox" && !e.querySelector("input")?.checked) return;
	let r = document.createElement("div");
	r.style.position = "absolute", r.style.left = "0px", r.style.top = "0px", e?.insertBefore(r, e?.firstChild), at(/*#__PURE__*/ g.createElement(Nu, {
		...t,
		target: e
	}), r);
}, Fu = (e, t, n, r) => {
	let { wave: i } = g.useContext(It), [, a, o] = so(), s = _((s) => {
		let c = e.current;
		if (i?.disabled || !c) return;
		let l = c.querySelector(`.${ku}`) || c, { showEffect: u } = i || {};
		(u || Pu)(l, {
			className: t,
			token: a,
			component: n,
			event: s,
			hashId: o,
			colorSource: r
		});
	}), c = g.useRef(null);
	return g.useEffect(() => () => {
		k.cancel(c.current);
	}, []), (e) => {
		k.cancel(c.current), c.current = k(() => {
			s(e);
		});
	};
}, Iu = {
	click: "click",
	mousedown: "mousedown",
	mouseup: "mouseup",
	pointerdown: "pointerdown",
	pointerup: "pointerup"
}, Lu = (e) => {
	let { children: t, disabled: n, component: r, colorSource: i } = e, { getPrefixCls: a, wave: o } = (0, g.useContext)(It), s = (0, g.useRef)(null), c = a("wave"), l = Fu(s, Z(c, Ou(c)), r, i);
	return g.useEffect(() => {
		let e = s.current;
		if (!e || e.nodeType !== window.Node.ELEMENT_NODE || n) return;
		let t = (t) => {
			!ve(t.target) || !e.getAttribute || e.getAttribute("disabled") || e.disabled || e.className.includes("disabled") && !e.className.includes("disabled:") || e.getAttribute("aria-disabled") === "true" || e.className.includes("-leave") || l(t);
		}, r = o?.triggerType, i = r && r in Iu ? Iu[r] : "click";
		return e.addEventListener(i, t, !0), () => {
			e.removeEventListener(i, t, !0);
		};
	}, [n, o?.triggerType]), /*#__PURE__*/ g.isValidElement(t) ? Gl(t, { ref: re(t) ? te(G(t), s) : s }) : t ?? null;
}, Ru = (e) => {
	let t = g.useContext(Ql);
	return g.useMemo(() => e ? oc(e) ? e : cc(e) ? e(t) : t : t, [e, t]);
}, zu = /*#__PURE__*/ g.createContext(null), Bu = (e, t) => {
	let n = g.useContext(zu), r = g.useMemo(() => {
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
}, Vu = (e) => {
	let { children: t } = e;
	return /*#__PURE__*/ g.createElement(zu.Provider, { value: null }, t);
}, Hu = /*#__PURE__*/ g.createContext(void 0), Uu = (e) => {
	let { getPrefixCls: t, direction: n } = g.useContext(It), { prefixCls: r, size: i, className: a, ...o } = e, s = t("btn-group", r), [, , c] = so(), l = g.useMemo(() => {
		switch (i) {
			case "large": return "lg";
			case "small": return "sm";
			default: return "";
		}
	}, [i]), u = Z(s, {
		[`${s}-${l}`]: l,
		[`${s}-rtl`]: n === "rtl"
	}, a, c);
	return /*#__PURE__*/ g.createElement(Hu.Provider, { value: i }, /*#__PURE__*/ g.createElement("div", {
		...o,
		className: u
	}));
}, Wu = /^[\u4E00-\u9FA5]{2}$/, Gu = Wu.test.bind(Wu);
function Ku(e) {
	return e === "text" || e === "link";
}
function qu(e, t, n, r) {
	if (!Le(e)) return;
	let i = t ? " " : "";
	return !oc(e) && !ac(e) && oc(e.type) && Gu(e.props.children) ? Gl(e, (e) => {
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
	}) : oc(e) ? /*#__PURE__*/ g.createElement("span", {
		className: r,
		style: n
	}, Gu(e) ? e.split("").join(i) : e) : Ul(e) ? /*#__PURE__*/ g.createElement("span", {
		className: r,
		style: n
	}, e) : Gl(e, (e) => ({
		...e,
		className: Z(e.className, r) || void 0,
		style: {
			...e.style,
			...n
		}
	}));
}
function Ju(e, t, n, r) {
	let i = !1, a = [];
	return g.Children.forEach(e, (e) => {
		let t = oc(e) || ac(e);
		if (i && t) {
			let t = a.length - 1, n = a[t];
			a[t] = `${n}${e}`;
		} else a.push(e);
		i = t;
	}), g.Children.map(a, (e) => qu(e, t, n, r));
}
[
	"default",
	"primary",
	"danger"
].concat(Nt(Hi));
// node_modules/antd/es/button/IconWrapper.js
var Yu = /*#__PURE__*/ (0, g.forwardRef)((e, t) => {
	let { className: n, style: r, children: i, prefixCls: a } = e, o = Z(`${a}-icon`, n);
	return /*#__PURE__*/ g.createElement("span", {
		ref: t,
		className: o,
		style: r
	}, i);
}), Xu = /*#__PURE__*/ (0, g.forwardRef)((e, t) => {
	let { prefixCls: n, className: r, style: i, iconClassName: a } = e, o = Z(`${n}-loading-icon`, r);
	return /*#__PURE__*/ g.createElement(Yu, {
		prefixCls: n,
		className: o,
		style: i,
		ref: t
	}, /*#__PURE__*/ g.createElement(fu, { className: a }));
}), Zu = () => ({
	width: 0,
	opacity: 0,
	transform: "scale(0)"
}), Qu = (e) => ({
	width: e.scrollWidth,
	opacity: 1,
	transform: "scale(1)"
}), $u = (e) => {
	let { prefixCls: t, loading: n, existIcon: r, className: i, style: a, mount: o } = e, s = !!n;
	return r ? /*#__PURE__*/ g.createElement(Xu, {
		prefixCls: t,
		className: i,
		style: a
	}) : /*#__PURE__*/ g.createElement(ic, {
		visible: s,
		motionName: `${t}-loading-icon-motion`,
		motionAppear: !o,
		motionEnter: !o,
		motionLeave: !o,
		removeOnLeave: !0,
		onAppearStart: Zu,
		onAppearActive: Qu,
		onEnterStart: Zu,
		onEnterActive: Qu,
		onLeaveStart: Qu,
		onLeaveActive: Zu
	}, ({ className: e, style: n }, r) => {
		let o = {
			...a,
			...n
		};
		return /*#__PURE__*/ g.createElement(Xu, {
			prefixCls: t,
			className: Z(i, e),
			style: o,
			ref: r
		});
	});
}, ed = (e) => ({
	animationDuration: e,
	animationFillMode: "both"
}), td = (e, t, n, r, i = !1) => {
	let a = i ? "&" : "";
	return {
		[`
      ${a}${e}-enter,
      ${a}${e}-appear
    `]: {
			...ed(r),
			animationPlayState: "paused"
		},
		[`${a}${e}-leave`]: {
			...ed(r),
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
}, nd = new Qr("antMoveDownIn", {
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
}), rd = new Qr("antMoveDownOut", {
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
}), id = new Qr("antMoveLeftIn", {
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
}), ad = new Qr("antMoveLeftOut", {
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
}), od = new Qr("antMoveRightIn", {
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
}), sd = new Qr("antMoveRightOut", {
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
}), cd = {
	"move-up": {
		inKeyframes: new Qr("antMoveUpIn", {
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
		outKeyframes: new Qr("antMoveUpOut", {
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
		inKeyframes: nd,
		outKeyframes: rd
	},
	"move-left": {
		inKeyframes: id,
		outKeyframes: ad
	},
	"move-right": {
		inKeyframes: od,
		outKeyframes: sd
	}
}, ld = (e, t) => {
	let { antCls: n } = e, r = `${n}-${t}`, { inKeyframes: i, outKeyframes: a } = cd[t];
	return [td(r, i, a, e.motionDurationMid), {
		[`
        ${r}-enter,
        ${r}-appear
      `]: {
			opacity: 0,
			animationTimingFunction: e.motionEaseOutCirc
		},
		[`${r}-leave`]: { animationTimingFunction: e.motionEaseInOutCirc }
	}];
}, ud = new Qr("antSlideUpIn", {
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
}), dd = new Qr("antSlideUpOut", {
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
}), fd = new Qr("antSlideDownIn", {
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
}), pd = new Qr("antSlideDownOut", {
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
}), md = new Qr("antSlideLeftIn", {
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
}), hd = new Qr("antSlideLeftOut", {
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
}), gd = new Qr("antSlideRightIn", {
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
}), _d = new Qr("antSlideRightOut", {
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
}), vd = {
	"slide-up": {
		inKeyframes: ud,
		outKeyframes: dd
	},
	"slide-down": {
		inKeyframes: fd,
		outKeyframes: pd
	},
	"slide-left": {
		inKeyframes: md,
		outKeyframes: hd
	},
	"slide-right": {
		inKeyframes: gd,
		outKeyframes: _d
	}
}, yd = (e, t) => {
	let { antCls: n } = e, r = `${n}-${t}`, { inKeyframes: i, outKeyframes: a } = vd[t];
	return [td(r, i, a, e.motionDurationMid), {
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
}, bd = () => ({ "@media (prefers-reduced-motion: reduce)": { "&, &::before, &::after": {
	transition: "none",
	animation: "none"
} } }), xd = (e, t) => ({ [`> span, > ${e}`]: {
	"&:not(:last-child)": { [`&, & > ${e}`]: { "&:not(:disabled)": { borderInlineEndColor: t } } },
	"&:not(:first-child)": { [`&, & > ${e}`]: { "&:not(:disabled)": { borderInlineStartColor: t } } }
} }), Sd = (e) => {
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
		xd(`${t}-primary`, i),
		xd(`${t}-danger`, a)
	] };
}, Cd = (e) => Math.round(Number(e || 0)), wd = (e) => {
	if (e instanceof $i) return e;
	if (e && typeof e == "object" && "h" in e && "b" in e) {
		let { b: t, ...n } = e;
		return {
			...n,
			v: t
		};
	}
	return typeof e == "string" && /hsb/.test(e) ? e.replace(/hsb/, "hsv") : e;
}, Td = class extends $i {
	constructor(e) {
		super(wd(e));
	}
	toHsbString() {
		let e = this.toHsb(), t = Cd(e.s * 100), n = Cd(e.b * 100), r = Cd(e.h), i = e.a, a = `hsb(${r}, ${t}%, ${n}%)`, o = `hsba(${r}, ${t}%, ${n}%, ${i.toFixed(i === 0 ? 0 : 2)})`;
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
((e) => e instanceof Td ? e : new Td(e))("#1677ff");
// node_modules/antd/es/color-picker/color.js
var Ed = (e, t) => e?.replace(/[^0-9a-f]/gi, "").slice(0, t ? 8 : 6) || "", Dd = (e, t) => e ? Ed(e, t) : "", Od = /*#__PURE__*/ function() {
	function e(t) {
		if (ui(this, e), this.cleared = !1, t instanceof e) {
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
		})), this.metaColor = new Td(this.colors[0].color.metaColor)) : this.metaColor = new Td(n ? "" : t), (!t || n && !this.colors) && (this.metaColor = this.metaColor.setA(0), this.cleared = !0);
	}
	return fi(e, [
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
				return Dd(this.toHexString(), this.metaColor.a < 1);
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
function kd() {
	return kd = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, kd.apply(null, arguments);
}
// node_modules/antd/es/color-picker/components/ColorPresets.js
var Ad = (e, t) => {
	let { r: n, g: r, b: i, a } = e.toRgb(), o = new Td(e.toRgbString()).onBackground(t).toHsv();
	return a <= .5 ? o.v > .5 : n * .299 + r * .587 + i * .114 > 192;
}, jd = (e) => {
	let { paddingInline: t, onlyIconSize: n, borderColorDisabled: r } = e;
	return ji(e, {
		buttonPaddingHorizontal: t,
		buttonPaddingVertical: 0,
		buttonIconOnlyFontSize: n,
		colorBorderDisabled: r
	});
}, Md = (e) => {
	let t = e.contentFontSize ?? e.fontSize, n = e.contentFontSizeSM ?? e.fontSize, r = e.contentFontSizeLG ?? e.fontSizeLG, i = e.contentLineHeight ?? Ui(t), a = e.contentLineHeightSM ?? Ui(n), o = e.contentLineHeightLG ?? Ui(r), s = Ad(new Od(e.colorBgSolid), "#fff") ? "#000" : "#fff", c = Hi.reduce((t, n) => ({
		...t,
		[`${n}ShadowColor`]: `0 ${Q(e.controlOutlineWidth)} 0 ${to(e[`${n}1`], e.colorBgContainer)}`
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
}, Nd = (e) => {
	let { componentCls: t, antCls: n, lineWidth: r, lineType: i } = e, [a, o] = So(n, "btn");
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
		Hi.map((n) => {
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
}, Pd = (e) => {
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
		...bd(),
		"&:disabled > *": { pointerEvents: "none" },
		[`${t}-icon > svg`]: uo(),
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
		"&:not(:disabled)": ho(e),
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
}, Fd = (e) => ({
	minWidth: e.controlHeight,
	paddingInline: 0,
	borderRadius: "50%"
}), Id = (e, t = "") => {
	let { componentCls: n, controlHeight: r, fontSize: i, borderRadius: a, buttonPaddingHorizontal: o, iconCls: s, buttonPaddingVertical: c, buttonIconOnlyFontSize: l } = e;
	return [
		{ [t]: {
			fontSize: i,
			height: r,
			padding: `${Q(c)} ${Q(o)}`,
			borderRadius: a,
			[`&${n}-icon-only`]: {
				width: r,
				[s]: { fontSize: l }
			}
		} },
		{ [`${n}${n}-circle${t}`]: Fd(e) },
		{ [`${n}${n}-round${t}`]: {
			borderRadius: e.controlHeight,
			[`&:not(${n}-icon-only)`]: { paddingInline: e.buttonPaddingHorizontal }
		} }
	];
}, Ld = (e) => Id(ji(e, { fontSize: e.contentFontSize }), e.componentCls), Rd = (e) => Id(ji(e, {
	controlHeight: e.controlHeightSM,
	fontSize: e.contentFontSizeSM,
	padding: e.paddingXS,
	buttonPaddingHorizontal: e.paddingInlineSM,
	buttonPaddingVertical: 0,
	borderRadius: e.borderRadiusSM,
	buttonIconOnlyFontSize: e.onlyIconSizeSM
}), `${e.componentCls}-sm`), zd = (e) => Id(ji(e, {
	controlHeight: e.controlHeightLG,
	fontSize: e.contentFontSizeLG,
	buttonPaddingHorizontal: e.paddingInlineLG,
	buttonPaddingVertical: 0,
	borderRadius: e.borderRadiusLG,
	buttonIconOnlyFontSize: e.onlyIconSizeLG
}), `${e.componentCls}-lg`), Bd = (e) => {
	let { componentCls: t } = e;
	return { [t]: { [`&${t}-block`]: { width: "100%" } } };
}, Vd = yo("Button", (e) => {
	let t = jd(e);
	return [
		Pd(t),
		Ld(t),
		Rd(t),
		zd(t),
		Bd(t),
		Nd(t),
		Sd(t)
	];
}, Md, { unitless: {
	fontWeight: !0,
	contentLineHeight: !0,
	contentLineHeightSM: !0,
	contentLineHeightLG: !0
} });
// node_modules/antd/es/style/compact-item.js
function Hd(e, t, n, r) {
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
function Ud(e, t, n) {
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
function Wd(e, t = { focus: !0 }) {
	let { componentCls: n } = e, { componentCls: r } = t, i = r || n, a = `${i}-compact`;
	return { [a]: {
		...Hd(e, a, t, i),
		...Ud(i, a, t)
	} };
}
// node_modules/antd/es/style/compact-item-vertical.js
function Gd(e, t, n) {
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
function Kd(e, t) {
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
function qd(e) {
	let t = `${e.componentCls}-compact-vertical`;
	return { [t]: {
		...Gd(e, t, e.componentCls),
		...Kd(e.componentCls, t)
	} };
}
// node_modules/antd/es/button/style/compact.js
var Jd = (e) => {
	let { antCls: t, componentCls: n, lineWidth: r, calc: i, colorBgContainer: a } = e, o = `${n}-variant-solid:not([disabled])`, s = i(r).mul(-1).equal(), [c, l] = So(t, "btn"), u = (e) => ({ [`${n}-compact${e ? "-vertical" : ""}-item`]: {
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
}, Yd = xo(["Button", "compact"], (e) => {
	let t = jd(e);
	return [
		Wd(t),
		qd(t),
		Jd(t)
	];
}, Md);
// node_modules/antd/es/button/Button.js
function Xd(e) {
	if (sc(e)) {
		let t = e?.delay;
		return t = ac(t) ? t : 0, {
			loading: t <= 0,
			delay: t
		};
	}
	return {
		loading: !!e,
		delay: 0
	};
}
var Zd = {
	default: ["default", "outlined"],
	primary: ["primary", "solid"],
	dashed: ["default", "dashed"],
	link: ["link", "link"],
	text: ["default", "text"]
}, Qd = /* @__PURE__ */ g.forwardRef((e, t) => {
	let { _skipSemantic: n, loading: r = !1, prefixCls: i, color: a, variant: o, type: s, danger: c = !1, shape: l, size: u, disabled: d, className: f, rootClassName: p, children: m, icon: h, iconPosition: _, iconPlacement: v, ghost: y = !1, block: x = !1, htmlType: S = "button", classNames: C, styles: w, style: T, autoInsertSpace: E, autoFocus: D, ...O } = e, k = qe(m), j = s || "default", { getPrefixCls: M, direction: N, autoInsertSpace: P, className: F, style: I, classNames: L, styles: R, loadingIcon: z, shape: B, color: V, variant: H } = zt("button"), U = l || B || "default", [W, ee] = (0, g.useMemo)(() => {
		if (a && o) return [a, o];
		if (s || c) {
			let e = Zd[j] || [];
			return c ? ["danger", e[1]] : e;
		}
		return o === "solid" ? ["primary", o] : V && H ? [V, H] : H === "solid" ? ["primary", H] : ["default", "outlined"];
	}, [
		a,
		o,
		s,
		c,
		V,
		H,
		j
	]), [te, re] = (0, g.useMemo)(() => y && ee === "solid" ? [W, "outlined"] : [W, ee], [
		W,
		ee,
		y
	]), ie = te === "danger", ae = ie ? "dangerous" : te, G = E ?? P ?? !0, K = M("btn", i), [oe, se] = Vd(K), ce = (0, g.useContext)(Xl), q = d ?? ce, le = (0, g.useContext)(Hu), ue = (0, g.useMemo)(() => Xd(r), [r]), [de, fe] = A(ue.loading), [pe, me] = (0, g.useState)(!1), J = (0, g.useRef)(null), Y = ne(t, J), he = k.length === 1 && !h && !Ku(re), ge = (0, g.useRef)(!0);
	g.useEffect(() => (ge.current = !1, () => {
		ge.current = !0;
	}), []), b(() => {
		ue.delay > 0 ? fe(!0, { ms: ue.delay }) : fe(ue.loading, !0);
	}, [ue.delay, ue.loading]), (0, g.useEffect)(() => {
		if (!J.current || !G) return;
		let e = J.current.textContent || "";
		he && Gu(e) ? pe || me(!0) : pe && me(!1);
	}), (0, g.useEffect)(() => {
		D && J.current?.focus();
	}, []);
	let _e = g.useCallback((t) => {
		de || q ? t.preventDefault() : e.onClick?.(("href" in e, t));
	}, [
		e.onClick,
		de,
		q
	]), { compactSize: ve, compactItemClassnames: ye } = Bu(K, N), be = Ru((e) => u ?? ve ?? le ?? e), xe = de ? "loading" : h, Se = v ?? _ ?? "start", Ce = Ve(O, ["navigate"]), X = {
		...e,
		type: j,
		color: te,
		variant: re,
		danger: ie,
		shape: U,
		size: be,
		disabled: q,
		loading: de,
		iconPlacement: Se
	}, we = mc(I), Te = mc(T), [Ee, De] = gc([n ? void 0 : L, C], [
		n ? void 0 : R,
		we,
		w,
		Te
	], { props: X }), Oe = Z(K, oe, se, {
		[`${K}-${U}`]: U !== "default" && U !== "square" && U,
		[`${K}-${j}`]: j,
		[`${K}-dangerous`]: c,
		[`${K}-color-${ae}`]: ae,
		[`${K}-variant-${re}`]: re,
		[`${K}-lg`]: be === "large",
		[`${K}-sm`]: be === "small",
		[`${K}-icon-only`]: !m && m !== 0 && !!xe,
		[`${K}-background-ghost`]: y && !Ku(re),
		[`${K}-loading`]: de,
		[`${K}-two-chinese-chars`]: pe && G && !de,
		[`${K}-block`]: x,
		[`${K}-rtl`]: N === "rtl",
		[`${K}-icon-end`]: Se === "end"
	}, ye, f, p, F, Ee.root), ke = {
		className: Ee.icon,
		style: De.icon
	}, Ae = (e) => /*#__PURE__*/ g.createElement(Yu, {
		prefixCls: K,
		...ke
	}, e), je = /*#__PURE__*/ g.createElement($u, {
		existIcon: !!h,
		prefixCls: K,
		loading: de,
		mount: ge.current,
		...ke
	}), Me = sc(r) && r.icon || z, Ne;
	Ne = h && !de ? Ae(h) : de && Me ? Ae(Me) : je;
	let Pe = Le(m) ? Ju(m, he && G, De.content, Ee.content) : null;
	if (Ce.href !== void 0) return /*#__PURE__*/ g.createElement("a", {
		...Ce,
		className: Z(Oe, { [`${K}-disabled`]: q }),
		href: q ? void 0 : Ce.href,
		style: De.root,
		onClick: _e,
		ref: Y,
		tabIndex: q ? -1 : 0,
		"aria-disabled": q
	}, Ne, Pe);
	let Fe = /*#__PURE__*/ g.createElement("button", {
		...O,
		type: S,
		className: Oe,
		style: De.root,
		onClick: _e,
		disabled: q,
		ref: Y
	}, Ne, Pe, ye && /*#__PURE__*/ g.createElement(Yd, { prefixCls: K }));
	return Ku(re) || (Fe = /*#__PURE__*/ g.createElement(Lu, {
		component: "Button",
		disabled: de
	}, Fe)), Fe;
});
Qd.Group = Uu, Qd.__ANT_BUTTON = !0;
// node_modules/@rc-component/form/es/FieldContext.js
var $d = "RC_FORM_INTERNAL_HOOKS", ef = () => {
	Ne(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
}, tf = /*#__PURE__*/ g.createContext({
	getFieldValue: ef,
	getFieldsValue: ef,
	getFieldError: ef,
	getFieldWarning: ef,
	getFieldsError: ef,
	isFieldsTouched: ef,
	isFieldTouched: ef,
	isFieldValidating: ef,
	isFieldsValidating: ef,
	resetFields: ef,
	setFields: ef,
	setFieldValue: ef,
	setFieldsValue: ef,
	validateFields: ef,
	submit: ef,
	getInternalHooks: () => (ef(), {
		dispatch: ef,
		initEntityValue: ef,
		registerField: ef,
		useSubscribe: ef,
		setInitialValues: ef,
		destroyForm: ef,
		setCallbacks: ef,
		registerWatch: ef,
		getFields: ef,
		setValidateMessages: ef,
		setPreserve: ef,
		getInitialValue: ef
	})
}), nf = /*#__PURE__*/ g.createContext(null);
// node_modules/@rc-component/form/es/utils/typeUtil.js
function rf(e) {
	return e == null ? [] : Array.isArray(e) ? e : [e];
}
function af(e) {
	return e && !!e._init;
}
// node_modules/@rc-component/async-validator/es/messages.js
function of() {
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
var sf = of(), cf = /%[sdj%]/g, lf = () => {};
typeof process < "u" && process.env;
function uf(e) {
	if (!e || !e.length) return null;
	let t = {};
	return e.forEach((e) => {
		let n = e.field;
		t[n] = t[n] || [], t[n].push(e);
	}), t;
}
function df(e, ...t) {
	let n = 0, r = t.length;
	return typeof e == "function" ? e.apply(null, t) : typeof e == "string" ? e.replace(cf, (e) => {
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
function ff(e) {
	return e === "string" || e === "url" || e === "hex" || e === "email" || e === "date" || e === "pattern" || e === "tel";
}
function pf(e, t) {
	return !!(e == null || t === "array" && Array.isArray(e) && !e.length || ff(t) && typeof e == "string" && !e);
}
function mf(e, t, n) {
	let r = [], i = 0, a = e.length;
	function o(e) {
		r.push(...e || []), i++, i === a && n(r);
	}
	e.forEach((e) => {
		t(e, o);
	});
}
function hf(e, t, n) {
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
function gf(e) {
	let t = [];
	return Object.keys(e).forEach((n) => {
		t.push(...e[n] || []);
	}), t;
}
var _f = class extends Error {
	errors;
	fields;
	constructor(e, t) {
		super("Async Validation Error"), this.errors = e, this.fields = t;
	}
};
function vf(e, t, n, r, i) {
	if (t.first) {
		let t = new Promise((t, a) => {
			hf(gf(e), n, (e) => (r(e), e.length ? a(new _f(e, uf(e))) : t(i)));
		});
		return t.catch((e) => e), t;
	}
	let a = t.firstFields === !0 ? Object.keys(e) : t.firstFields || [], o = Object.keys(e), s = o.length, c = 0, l = [], u = new Promise((t, u) => {
		let d = (e) => {
			if (l.push.apply(l, e), c++, c === s) return r(l), l.length ? u(new _f(l, uf(l))) : t(i);
		};
		o.length || (r(l), t(i)), o.forEach((t) => {
			let r = e[t];
			a.indexOf(t) === -1 ? mf(r, n, d) : hf(r, n, d);
		});
	});
	return u.catch((e) => e), u;
}
function yf(e) {
	return !!(e && e.message !== void 0);
}
function bf(e, t) {
	let n = e;
	for (let e = 0; e < t.length; e++) {
		if (n == null) return n;
		n = n[t[e]];
	}
	return n;
}
function xf(e, t) {
	return (n) => {
		let r;
		return r = e.fullFields ? bf(t, e.fullFields) : t[n.field || e.fullField], yf(n) ? (n.field = n.field || e.fullField, n.fieldValue = r, n) : {
			message: typeof n == "function" ? n() : n,
			fieldValue: r,
			field: n.field || e.fullField
		};
	};
}
function Sf(e, t) {
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
var Cf = "enum", wf = (e, t, n, r, i) => {
	e[Cf] = Array.isArray(e[Cf]) ? e[Cf] : [], e[Cf].indexOf(t) === -1 && r.push(df(i.messages[Cf], e.fullField, e[Cf].join(", ")));
}, Tf = (e, t, n, r, i) => {
	e.pattern && (e.pattern instanceof RegExp ? (e.pattern.lastIndex = 0, e.pattern.test(t) || r.push(df(i.messages.pattern.mismatch, e.fullField, t, e.pattern))) : typeof e.pattern == "string" && (new RegExp(e.pattern).test(t) || r.push(df(i.messages.pattern.mismatch, e.fullField, t, e.pattern))));
}, Ef = (e, t, n, r, i) => {
	let a = typeof e.len == "number", o = typeof e.min == "number", s = typeof e.max == "number", c = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, l = t, u = null, d = typeof t == "number", f = typeof t == "string", p = Array.isArray(t);
	if (d ? u = "number" : f ? u = "string" : p && (u = "array"), !u) return !1;
	p && (l = t.length), f && (l = t.replace(c, "_").length), a ? l !== e.len && r.push(df(i.messages[u].len, e.fullField, e.len)) : o && !s && l < e.min ? r.push(df(i.messages[u].min, e.fullField, e.min)) : s && !o && l > e.max ? r.push(df(i.messages[u].max, e.fullField, e.max)) : o && s && (l < e.min || l > e.max) && r.push(df(i.messages[u].range, e.fullField, e.min, e.max));
}, Df = (e, t, n, r, i, a) => {
	e.required && (!n.hasOwnProperty(e.field) || pf(t, a || e.type)) && r.push(df(i.messages.required, e.fullField));
}, Of, kf = (() => {
	if (Of) return Of;
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
	return Of = RegExp(`(?:^${l}$)`, "i"), Of;
}), Af = {
	email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
	tel: /^(\+[0-9]{1,3}[-\s\u2011]?)?(\([0-9]{1,4}\)[-\s\u2011]?)?([0-9]+[-\s\u2011]?)*[0-9]+$/,
	hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
}, jf = {
	integer(e) {
		return jf.number(e) && parseInt(e, 10) === e;
	},
	float(e) {
		return jf.number(e) && !jf.integer(e);
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
		return typeof e == "object" && !jf.array(e);
	},
	method(e) {
		return typeof e == "function";
	},
	email(e) {
		return typeof e == "string" && e.length <= 320 && !!e.match(Af.email);
	},
	tel(e) {
		return typeof e == "string" && e.length <= 32 && !!e.match(Af.tel);
	},
	url(e) {
		return typeof e == "string" && e.length <= 2048 && !!e.match(kf());
	},
	hex(e) {
		return typeof e == "string" && !!e.match(Af.hex);
	}
}, Mf = {
	required: Df,
	whitespace: (e, t, n, r, i) => {
		(/^\s+$/.test(t) || t === "") && r.push(df(i.messages.whitespace, e.fullField));
	},
	type: (e, t, n, r, i) => {
		if (e.required && t === void 0) {
			Df(e, t, n, r, i);
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
		a.indexOf(o) > -1 ? jf[o](t) || r.push(df(i.messages.types[o], e.fullField, e.type)) : o && typeof t !== e.type && r.push(df(i.messages.types[o], e.fullField, e.type));
	},
	range: Ef,
	enum: wf,
	pattern: Tf
}, Nf = (e, t, n, r, i) => {
	let a = [];
	if (e.required || !e.required && r.hasOwnProperty(e.field)) {
		if (pf(t) && !e.required) return n();
		Mf.required(e, t, r, a, i);
	}
	n(a);
}, Pf = (e, t, n, r, i) => {
	let a = [];
	if (e.required || !e.required && r.hasOwnProperty(e.field)) {
		if (t == null && !e.required) return n();
		Mf.required(e, t, r, a, i, "array"), t != null && (Mf.type(e, t, r, a, i), Mf.range(e, t, r, a, i));
	}
	n(a);
}, Ff = (e, t, n, r, i) => {
	let a = [];
	if (e.required || !e.required && r.hasOwnProperty(e.field)) {
		if (pf(t) && !e.required) return n();
		Mf.required(e, t, r, a, i), t !== void 0 && Mf.type(e, t, r, a, i);
	}
	n(a);
}, If = (e, t, n, r, i) => {
	let a = [];
	if (e.required || !e.required && r.hasOwnProperty(e.field)) {
		if (pf(t, "date") && !e.required) return n();
		if (Mf.required(e, t, r, a, i), !pf(t, "date")) {
			let n;
			n = t instanceof Date ? t : new Date(t), Mf.type(e, n, r, a, i), n && Mf.range(e, n.getTime(), r, a, i);
		}
	}
	n(a);
}, Lf = "enum", Rf = (e, t, n, r, i) => {
	let a = [];
	if (e.required || !e.required && r.hasOwnProperty(e.field)) {
		if (pf(t) && !e.required) return n();
		Mf.required(e, t, r, a, i), t !== void 0 && Mf[Lf](e, t, r, a, i);
	}
	n(a);
}, zf = (e, t, n, r, i) => {
	let a = [];
	if (e.required || !e.required && r.hasOwnProperty(e.field)) {
		if (pf(t) && !e.required) return n();
		Mf.required(e, t, r, a, i), t !== void 0 && (Mf.type(e, t, r, a, i), Mf.range(e, t, r, a, i));
	}
	n(a);
}, Bf = (e, t, n, r, i) => {
	let a = [];
	if (e.required || !e.required && r.hasOwnProperty(e.field)) {
		if (pf(t) && !e.required) return n();
		Mf.required(e, t, r, a, i), t !== void 0 && (Mf.type(e, t, r, a, i), Mf.range(e, t, r, a, i));
	}
	n(a);
}, Vf = (e, t, n, r, i) => {
	let a = [];
	if (e.required || !e.required && r.hasOwnProperty(e.field)) {
		if (pf(t) && !e.required) return n();
		Mf.required(e, t, r, a, i), t !== void 0 && Mf.type(e, t, r, a, i);
	}
	n(a);
}, Hf = (e, t, n, r, i) => {
	let a = [];
	if (e.required || !e.required && r.hasOwnProperty(e.field)) {
		if (t === "" && (t = void 0), pf(t) && !e.required) return n();
		Mf.required(e, t, r, a, i), t !== void 0 && (Mf.type(e, t, r, a, i), Mf.range(e, t, r, a, i));
	}
	n(a);
}, Uf = (e, t, n, r, i) => {
	let a = [];
	if (e.required || !e.required && r.hasOwnProperty(e.field)) {
		if (pf(t) && !e.required) return n();
		Mf.required(e, t, r, a, i), t !== void 0 && Mf.type(e, t, r, a, i);
	}
	n(a);
}, Wf = (e, t, n, r, i) => {
	let a = [];
	if (e.required || !e.required && r.hasOwnProperty(e.field)) {
		if (pf(t, "string") && !e.required) return n();
		Mf.required(e, t, r, a, i), pf(t, "string") || Mf.pattern(e, t, r, a, i);
	}
	n(a);
}, Gf = (e, t, n, r, i) => {
	let a = [];
	if (e.required || !e.required && r.hasOwnProperty(e.field)) {
		if (pf(t) && !e.required) return n();
		Mf.required(e, t, r, a, i), pf(t) || Mf.type(e, t, r, a, i);
	}
	n(a);
}, Kf = (e, t, n, r, i) => {
	let a = [], o = Array.isArray(t) ? "array" : typeof t;
	Mf.required(e, t, r, a, i, o), n(a);
}, qf = (e, t, n, r, i) => {
	let a = [];
	if (e.required || !e.required && r.hasOwnProperty(e.field)) {
		if (pf(t, "string") && !e.required) return n();
		Mf.required(e, t, r, a, i, "string"), pf(t, "string") || (Mf.type(e, t, r, a, i), Mf.range(e, t, r, a, i), Mf.pattern(e, t, r, a, i), e.whitespace === !0 && Mf.whitespace(e, t, r, a, i));
	}
	n(a);
}, Jf = (e, t, n, r, i) => {
	let a = e.type, o = [];
	if (e.required || !e.required && r.hasOwnProperty(e.field)) {
		if (pf(t, a) && !e.required) return n();
		Mf.required(e, t, r, o, i, a), pf(t, a) || Mf.type(e, t, r, o, i);
	}
	n(o);
}, Yf = {
	string: qf,
	method: Vf,
	number: Hf,
	boolean: Ff,
	regexp: Gf,
	integer: Bf,
	float: zf,
	array: Pf,
	object: Uf,
	enum: Rf,
	pattern: Wf,
	date: If,
	url: Jf,
	hex: Jf,
	email: Jf,
	tel: Jf,
	required: Kf,
	any: Nf
}, Xf = class e {
	static register = function(e, t) {
		if (typeof t != "function") throw Error("Cannot register a validator by type, validator is not a function");
		Yf[e] = t;
	};
	static warning = lf;
	static messages = sf;
	static validators = Yf;
	rules = null;
	_messages = sf;
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
		return e && (this._messages = Sf(of(), e)), this._messages;
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
			t.length ? (n = uf(t), o(t, n)) : o(null, i);
		}
		if (a.messages) {
			let e = this.messages();
			e === sf && (e = of()), Sf(e, a.messages), a.messages = e;
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
		return vf(c, a, (t, n) => {
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
				let d = u.map(xf(r, i));
				if (a.first && d.length) return l[r.field] = 1, n(d);
				if (!o) n(d);
				else {
					if (r.required && !t.value) return r.message === void 0 ? a.error && (d = [a.error(r, df(a.messages.required, r.field))]) : d = [].concat(r.message).map(xf(r, i)), n(d);
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
		if (e.type === void 0 && e.pattern instanceof RegExp && (e.type = "pattern"), typeof e.validator != "function" && e.type && !Yf.hasOwnProperty(e.type)) throw Error(df("Unknown rule type %s", e.type));
		return e.type || "string";
	}
	getValidationMethod(e) {
		if (typeof e.validator == "function") return e.validator;
		let t = Object.keys(e), n = t.indexOf("message");
		return n !== -1 && t.splice(n, 1), t.length === 1 && t[0] === "required" ? Yf.required : Yf[this.getType(e)] || void 0;
	}
}, Zf = "'${name}' is not a valid ${type}", Qf = {
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
		string: Zf,
		method: Zf,
		array: Zf,
		object: Zf,
		number: Zf,
		date: Zf,
		boolean: Zf,
		integer: Zf,
		float: Zf,
		regexp: Zf,
		email: Zf,
		tel: Zf,
		url: Zf,
		hex: Zf
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
}, $f = Xf;
function ep(e, t) {
	return e.replace(/\\?\$\{\w+\}/g, (e) => e.startsWith("\\") ? e.slice(1) : t[e.slice(2, -1)]);
}
var tp = "CODE_LOGIC_ERROR";
async function np(e, t, n, r, i) {
	let a = { ...n };
	if (delete a.ruleIndex, $f.warning = () => void 0, a.validator) {
		let e = a.validator;
		a.validator = (...t) => {
			try {
				return e(...t);
			} catch (e) {
				return console.error(e), Promise.reject(tp);
			}
		};
	}
	let o = null;
	a && a.type === "array" && a.defaultField && (o = a.defaultField, delete a.defaultField);
	let s = new $f({ [e]: [a] }), c = nt(Qf, r.validateMessages);
	s.messages(c);
	let l = [];
	try {
		await Promise.resolve(s.validate({ [e]: t }, { ...r }));
	} catch (e) {
		e.errors && (l = e.errors.map(({ message: e }, t) => {
			let n = e === tp ? c.default : e;
			return /*#__PURE__*/ g.isValidElement(n) ? /*#__PURE__*/ g.cloneElement(n, { key: `error_${t}` }) : n;
		}));
	}
	if (!l.length && o && Array.isArray(t) && t.length > 0) return (await Promise.all(t.map((t, n) => np(`${e}.${n}`, t, o, r, i)))).reduce((e, t) => [...e, ...t], []);
	let u = {
		...n,
		name: e,
		enum: (n.enum || []).join(", "),
		...i
	};
	return l.map((e) => typeof e == "string" ? ep(e, u) : e);
}
function rp(e, t, n, r, i, a) {
	let o = e.join("."), s = n.map((e, t) => {
		let n = e.validator, r = {
			...e,
			ruleIndex: t
		};
		return n && (r.validator = (e, t, r) => {
			let i = !1, a = n(e, t, (...e) => {
				Promise.resolve().then(() => {
					Ne(!i, "Your validator function has already return a promise. `callback` will be ignored."), i || r(...e);
				});
			});
			i = a && typeof a.then == "function" && typeof a.catch == "function", Ne(i, "`callback` is deprecated. Please return a promise instead."), i && a.then(() => {
				r();
			}).catch((e) => {
				r(e || " ");
			});
		}), r;
	}).sort(({ warningOnly: e, ruleIndex: t }, { warningOnly: n, ruleIndex: r }) => !!e == !!n ? t - r : e ? 1 : -1), c;
	if (i === !0) c = new Promise(async (e, n) => {
		for (let e = 0; e < s.length; e += 1) {
			let i = s[e], c = await np(o, t, i, r, a);
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
		let e = s.map((e) => np(o, t, e, r, a).then((t) => ({
			errors: t,
			rule: e
		})));
		c = (i ? ap(e) : ip(e)).then((e) => Promise.reject(e));
	}
	return c.catch((e) => e), c;
}
async function ip(e) {
	return Promise.all(e).then((e) => [].concat(...e));
}
async function ap(e) {
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
function op(e) {
	return rf(e);
}
function sp(e, t) {
	let n = {};
	return t.forEach((t) => {
		let r = Ye(e, t);
		n = Ze(n, t, r);
	}), n;
}
function cp(e, t, n = !1) {
	return e && e.some((e) => lp(t, e, n));
}
function lp(e, t, n = !1) {
	return !e || !t || !n && e.length !== t.length ? !1 : t.every((t, n) => e[n] === t);
}
function up(e, t) {
	if (e === t) return !0;
	if (!e && t || e && !t || !e || !t || typeof e != "object" || typeof t != "object") return !1;
	let n = Object.keys(e), r = Object.keys(t);
	return [.../* @__PURE__ */ new Set([...n, ...r])].every((n) => {
		let r = e[n], i = t[n];
		return typeof r == "function" && typeof i == "function" || r === i;
	});
}
function dp(e, ...t) {
	let n = t[0];
	return n && n.target && typeof n.target == "object" && e in n.target ? n.target[e] : n;
}
function fp(e, t, n) {
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
var pp = (e) => {
	let t = new MessageChannel();
	t.port1.onmessage = e, t.port2.postMessage(null);
}, mp = class {
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
			this.namePathList.every((t) => !lp(t, e)) && this.namePathList.push(e);
		}), this.doBatch();
	}
	doBatch() {
		this.taskId += 1;
		let e = this.taskId;
		pp(() => {
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
async function hp() {
	return new Promise((e) => {
		pp(() => {
			k(() => {
				e();
			});
		});
	});
}
// node_modules/@rc-component/form/es/Field.js
function gp() {
	return gp = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, gp.apply(this, arguments);
}
var _p = [], vp = [];
function yp(e, t, n, r, i, a) {
	return typeof e == "function" ? e(t, n, "source" in a ? { source: a.source } : {}) : r !== i;
}
var bp = class extends g.PureComponent {
	static contextType = tf;
	state = { resetCount: 0 };
	cancelRegisterFunc = null;
	mounted = !1;
	touched = !1;
	dirty = !1;
	validatePromise;
	prevValidating;
	errors = _p;
	warnings = vp;
	constructor(e) {
		if (super(e), e.fieldContext) {
			let { getInternalHooks: t } = e.fieldContext, { initEntityValue: n } = t($d);
			n(this);
		}
	}
	componentDidMount() {
		let { shouldUpdate: e, fieldContext: t } = this.props;
		if (this.mounted = !0, t) {
			let { getInternalHooks: e } = t, { registerField: n } = e($d);
			this.cancelRegisterFunc = n(this);
		}
		e === !0 && this.reRender();
	}
	componentWillUnmount() {
		this.cancelRegister(), this.triggerMetaEvent(!0), this.mounted = !1;
	}
	cancelRegister = () => {
		let { preserve: e, isListField: t, name: n } = this.props;
		this.cancelRegisterFunc && this.cancelRegisterFunc(t, e, op(n)), this.cancelRegisterFunc = null;
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
			Fe(this.metaCache, n) || t(n), this.metaCache = n;
		} else this.metaCache = null;
	};
	onStoreChange = (e, t, n) => {
		let { shouldUpdate: r, dependencies: i = [], onReset: a } = this.props, { store: o } = n, s = this.getNamePath(), c = this.getValue(e), l = this.getValue(o), u = t && cp(t, s);
		switch (n.type === "valueUpdate" && n.source === "external" && !Fe(c, l) && (this.touched = !0, this.dirty = !0, this.validatePromise = null, this.errors = _p, this.warnings = vp, this.triggerMetaEvent()), n.type) {
			case "reset":
				if (!t || u) {
					this.touched = !1, this.dirty = !1, this.validatePromise = void 0, this.errors = _p, this.warnings = vp, this.triggerMetaEvent(), a?.(), this.refresh();
					return;
				}
				break;
			case "remove":
				if (r && yp(r, e, o, c, l, n)) {
					this.reRender();
					return;
				}
				break;
			case "setField": {
				let { data: i } = n;
				if (u) {
					"touched" in i && (this.touched = i.touched), "validating" in i && !("originRCField" in i) && (this.validatePromise = i.validating ? Promise.resolve([]) : null), "errors" in i && (this.errors = i.errors || _p), "warnings" in i && (this.warnings = i.warnings || vp), this.dirty = !0, this.triggerMetaEvent(), this.reRender();
					return;
				}
				if ("value" in i && cp(t, s, !0) || r && !s.length && yp(r, e, o, c, l, n)) {
					this.reRender();
					return;
				}
				break;
			}
			case "dependenciesUpdate":
				if (i.map(op).some((e) => cp(n.relatedFields, e))) {
					this.reRender();
					return;
				}
				break;
			default: if (u || (!i.length || s.length || r) && yp(r, e, o, c, l, n)) {
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
			a && await hp();
			let l = this.getRules();
			if (r && (l = l.filter((e) => e).filter((e) => {
				let { validateTrigger: t } = e;
				return !t || rf(t).includes(r);
			})), c && r && (await new Promise((e) => {
				setTimeout(e, c);
			}), this.validatePromise !== o)) return [];
			let u = rp(t, n, l, e, i, s);
			return u.catch((e) => e).then((e = _p) => {
				if (this.validatePromise === o) {
					this.validatePromise = null;
					let t = [], n = [];
					e.forEach?.(({ rule: { warningOnly: e }, errors: r = _p }) => {
						e ? n.push(...r) : t.push(...r);
					}), this.errors = t, this.warnings = n, this.triggerMetaEvent(), this.reRender();
				}
			}), u;
		});
		return i || (this.validatePromise = o, this.dirty = !0, this.errors = _p, this.warnings = vp, this.triggerMetaEvent(), this.reRender()), o;
	};
	isFieldValidating = () => !!this.validatePromise;
	isFieldTouched = () => this.touched;
	isFieldDirty = () => {
		if (this.dirty || this.props.initialValue !== void 0) return !0;
		let { fieldContext: e } = this.props, { getInitialValue: t } = e.getInternalHooks($d);
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
		let t = qe(e);
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
		return Ye(e || t(!0), n);
	};
	getControlled = (e = {}) => {
		let { name: t, trigger: n = "onChange", validateTrigger: r, getValueFromEvent: i, normalize: a, valuePropName: o = "value", getValueProps: s, fieldContext: c } = this.props, l = r === void 0 ? c.validateTrigger : r, u = this.getNamePath(), { getInternalHooks: d, getFieldsValue: f } = c, { dispatch: p } = d($d), m = this.getValue(), h = s || ((e) => ({ [o]: e })), g = e[n], _ = t === void 0 ? {} : h(m), v = {
			...e,
			..._
		};
		return v[n] = (...e) => {
			this.touched = !0, this.dirty = !0, this.triggerMetaEvent();
			let t = this.getValue(), n;
			n = i ? i(...e) : dp(o, ...e), a && (n = a(n, t, f(!0))), n !== t && p({
				type: "updateValue",
				namePath: u,
				value: n
			}), g && g(...e);
		}, rf(l || []).forEach((e) => {
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
		return r ? i = n : /*#__PURE__*/ g.isValidElement(n) ? i = /*#__PURE__*/ g.cloneElement(n, this.getControlled(n.props)) : (Ne(!n, "`children` of Field is not validate ReactElement."), i = n), /*#__PURE__*/ g.createElement(g.Fragment, { key: e }, i);
	}
};
function xp({ name: e, ...t }) {
	let n = g.useContext(tf), r = g.useContext(nf), i = e === void 0 ? void 0 : op(e), a = t.isListField ?? !!r, o = "keep";
	return a || (o = `_${(i || []).join("_")}`), /*#__PURE__*/ g.createElement(bp, gp({
		key: o,
		name: i,
		isListField: a
	}, t, { fieldContext: n }));
}
// node_modules/@rc-component/form/es/List.js
function Sp({ name: e, initialValue: t, children: n, rules: r, validateTrigger: i, isListField: a }) {
	let o = g.useContext(tf), s = g.useContext(nf), c = g.useRef({
		keys: [],
		id: 0
	}).current, l = g.useMemo(() => [...op(o.prefixName) || [], ...op(e)], [o.prefixName, e]), u = g.useMemo(() => ({
		...o,
		prefixName: l
	}), [o, l]), d = g.useMemo(() => ({ getKey: (e) => {
		let t = l.length, n = e[t];
		return [c.keys[n], e.slice(t + 1)];
	} }), [c, l]);
	return typeof n == "function" ? /*#__PURE__*/ g.createElement(nf.Provider, { value: d }, /*#__PURE__*/ g.createElement(tf.Provider, { value: u }, /*#__PURE__*/ g.createElement(xp, {
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
				e < 0 || e >= r.length || n < 0 || n >= r.length || (c.keys = fp(c.keys, e, n), t(fp(r, e, n)));
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
	}))) : (Ne(!1, "Form.List only accepts function as children."), null);
}
// node_modules/@rc-component/form/es/utils/asyncUtil.js
function Cp(e) {
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
var wp = "__@field_split__";
function Tp(e) {
	return e.map((e) => `${typeof e}:${e}`).join(wp);
}
var Ep = class {
	kvs = /* @__PURE__ */ new Map();
	set(e, t) {
		this.kvs.set(Tp(e), t);
	}
	get(e) {
		return this.kvs.get(Tp(e));
	}
	getAsPrefix(e) {
		let t = Tp(e), n = t + wp, r = [], i = this.kvs.get(t);
		return i !== void 0 && r.push(i), this.kvs.forEach((e, t) => {
			t.startsWith(n) && r.push(e);
		}), r;
	}
	update(e, t) {
		let n = t(this.get(e));
		n ? this.set(e, n) : this.delete(e);
	}
	delete(e) {
		this.kvs.delete(Tp(e));
	}
	map(e) {
		return [...this.kvs.entries()].map(([t, n]) => e({
			key: t.split(wp).map((e) => {
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
}, Dp = class {
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
	watcherCenter = new mp(this);
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
	}) : (Ne(!1, "`getInternalHooks` is internal usage. Should not call directly."), null);
	useSubscribe = (e) => {
		this.subscribable = e;
	};
	prevWithoutPreserves = null;
	setInitialValues = (e, t) => {
		if (this.initialValues = e || {}, t) {
			let t = nt(e, this.store);
			this.prevWithoutPreserves?.map(({ key: n }) => {
				t = Ze(t, n, Ye(e, n));
			}), this.prevWithoutPreserves = null, this.updateStore(t);
		}
	};
	destroyForm = (e) => {
		if (e) this.updateStore({});
		else {
			let e = new Ep();
			this.getFieldEntities(!0).forEach((t) => {
				this.isMergedPreserve(t.isPreserve()) || e.set(t.getNamePath(), !0);
			}), this.prevWithoutPreserves = e;
		}
	};
	getInitialValue = (e) => {
		let t = Ye(this.initialValues, e);
		return e.length ? nt(t) : t;
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
		let t = new Ep();
		return this.getFieldEntities(e).forEach((e) => {
			let n = e.getNamePath();
			t.set(n, e);
		}), t;
	};
	getFieldEntitiesForNamePathList = (e, t = !1) => {
		if (!e) return this.getFieldEntities(!0);
		let n = this.getFieldsMap(!0);
		return t ? e.flatMap((e) => {
			let t = op(e), r = n.getAsPrefix(t);
			return r.length ? r : [{ INVALIDATE_NAME_PATH: t }];
		}) : e.map((e) => {
			let t = op(e);
			return n.get(t) || { INVALIDATE_NAME_PATH: op(e) };
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
		let s = sp(this.store, a.map(op));
		return o.forEach((e) => {
			Ye(s, e) || (s = Ze(s, e, []));
		}), s;
	};
	getFieldValue = (e) => {
		this.warningUnhooked();
		let t = op(e);
		return Ye(this.store, t);
	};
	getFieldsError = (e) => (this.warningUnhooked(), this.getFieldEntitiesForNamePathList(e).map((t, n) => t && !t.INVALIDATE_NAME_PATH ? {
		name: t.getNamePath(),
		errors: t.getErrors(),
		warnings: t.getWarnings()
	} : {
		name: op(e[n]),
		errors: [],
		warnings: []
	}));
	getFieldError = (e) => {
		this.warningUnhooked();
		let t = op(e);
		return this.getFieldsError([t])[0].errors;
	};
	getFieldWarning = (e) => {
		this.warningUnhooked();
		let t = op(e);
		return this.getFieldsError([t])[0].warnings;
	};
	isFieldsTouched = (...e) => {
		this.warningUnhooked();
		let [t, n] = e, r, i = !1;
		e.length === 0 ? r = null : e.length === 1 ? Array.isArray(t) ? (r = t.map(op), i = !1) : (r = null, i = t) : (r = t.map(op), i = n);
		let a = this.getFieldEntities(!0), o = (e) => e.isFieldTouched();
		if (!r) return i ? a.every((e) => o(e) || e.isList()) : a.some(o);
		let s = new Ep();
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
		let n = e.map(op);
		return t.some((e) => {
			let t = e.getNamePath();
			return cp(n, t) && e.isFieldValidating();
		});
	};
	isFieldValidating = (e) => (this.warningUnhooked(), this.isFieldsValidating([e]));
	resetWithFieldInitialValue = (e = {}) => {
		let t = new Ep(), n = this.getFieldEntities(!0);
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
					if (this.getInitialValue(r) !== void 0) Ne(!1, `Form already set 'initialValues' with path '${r.join(".")}'. Field can not overwrite it.`);
					else {
						let i = t.get(r);
						if (i && i.size > 1) Ne(!1, `Multiple Field with path '${r.join(".")}' set 'initialValue'. Can not decide which one to pick.`);
						else if (i) {
							let t = this.getFieldValue(r);
							n.isListField() || e.skipExist && t !== void 0 || this.updateStore(Ze(this.store, r, [...i][0].value));
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
			this.updateStore(nt(this.initialValues)), this.resetWithFieldInitialValue(), this.notifyObservers(t, null, { type: "reset" }), this.notifyWatch();
			return;
		}
		let n = e.map(op);
		n.forEach((e) => {
			let t = this.getInitialValue(e);
			this.updateStore(Ze(this.store, e, t));
		}), this.resetWithFieldInitialValue({ namePathList: n }), this.notifyObservers(t, n, { type: "reset" }), this.notifyWatch(n);
	};
	setFields = (e) => {
		this.warningUnhooked();
		let t = this.store, n = [];
		e.forEach((e) => {
			let { name: r, ...i } = e, a = op(r);
			n.push(a), "value" in i && this.updateStore(Ze(this.store, a, i.value)), this.notifyObservers(t, [a], {
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
			Ye(this.store, n) === void 0 && this.updateStore(Ze(this.store, n, t));
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
				if (t.length && this.getFieldValue(t) !== e && this.fieldEntities.every((e) => !lp(e.getNamePath(), t))) {
					let n = this.store;
					this.updateStore(Ze(n, t, e, !0)), this.notifyObservers(n, [t], { type: "remove" }), this.triggerDependenciesUpdate(n, t);
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
		let n = op(e), r = this.store;
		this.updateStore(Ze(this.store, n, t)), this.notifyObservers(r, [n], {
			type: "valueUpdate",
			source: "internal"
		}), this.notifyWatch([n]);
		let i = this.triggerDependenciesUpdate(r, n), { onValuesChange: a } = this.callbacks;
		if (a) {
			let e = sp(this.store, [n]);
			a(e, Ze(this.getFieldsValue(), n, Ye(e, n)));
		}
		this.triggerOnFieldsChange([n, ...i]);
	};
	setFieldsValue = (e) => {
		this.warningUnhooked();
		let t = this.store;
		if (e) {
			let t = nt(this.store, e);
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
		let t = /* @__PURE__ */ new Set(), n = [], r = new Ep();
		this.getFieldEntities().forEach((e) => {
			let { dependencies: t } = e.props;
			(t || []).forEach((t) => {
				let n = op(t);
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
				let e = new Ep();
				t.forEach(({ name: t, errors: n }) => {
					e.set(t, n);
				}), r.forEach((t) => {
					t.errors = e.get(t.name) || t.errors;
				});
			}
			let i = r.filter(({ name: t }) => cp(e, t));
			i.length && n(i, r);
		}
	};
	validateFields = (e, t) => {
		this.warningUnhooked();
		let n, r;
		Array.isArray(e) || typeof e == "string" || typeof t == "string" ? (n = e, r = t) : r = e;
		let i = !!n, a = i ? n.map(op) : [], o = [...a], s = [], c = String(Date.now()), l = /* @__PURE__ */ new Set(), { recursive: u, dirty: d } = r || {};
		this.getFieldEntities(!0).forEach((e) => {
			let t = e.getNamePath();
			if (i || (e.isList() && a.some((e) => lp(e, t, !0)) || o.push(t), a.push(t)), e.props.rules && e.props.rules.length && (!d || e.isFieldDirty()) && (l.add(t.join(c)), !i || cp(a, t, u))) {
				let n = e.validateRules({
					validateMessages: {
						...Qf,
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
		let f = Cp(s);
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
function Op(e) {
	let t = g.useRef(null), [, n] = g.useState({});
	return t.current ||= e || new Dp(() => {
		n({});
	}).getForm(), [t.current];
}
// node_modules/@rc-component/form/es/FormContext.js
var kp = /*#__PURE__*/ g.createContext({
	triggerFormChange: () => {},
	triggerFormFinish: () => {},
	registerForm: () => {},
	unregisterForm: () => {}
}), Ap = ({ validateMessages: e, onFormChange: t, onFormFinish: n, children: r }) => {
	let i = g.useContext(kp), a = g.useRef({});
	return /*#__PURE__*/ g.createElement(kp.Provider, { value: {
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
function jp() {
	return jp = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, jp.apply(this, arguments);
}
var Mp = (e, t) => {
	let { name: n, initialValues: r, fields: i, form: a, preserve: o, children: s, component: c = "form", validateMessages: l, validateTrigger: u = "onChange", onValuesChange: d, onFieldsChange: f, onFinish: p, onFinishFailed: m, clearOnDestroy: h, ..._ } = e, v = g.useRef(null), y = g.useContext(kp), [b] = Op(a), { useSubscribe: x, setInitialValues: S, setCallbacks: C, setValidateMessages: w, setPreserve: T, destroyForm: E } = b.getInternalHooks($d);
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
		up(A.current || [], i || []) || b.setFields(i || []), A.current = i;
	}, [i, b]);
	let j = g.useMemo(() => ({
		...b,
		validateTrigger: u
	}), [b, u]), M = /*#__PURE__*/ g.createElement(nf.Provider, { value: null }, /*#__PURE__*/ g.createElement(tf.Provider, { value: j }, O));
	return c === !1 ? M : /*#__PURE__*/ g.createElement(c, jp({}, _, {
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
function Np(e) {
	try {
		return JSON.stringify(e);
	} catch {
		return Math.random();
	}
}
function Pp(...e) {
	let [t, n = {}] = e, r = af(n) ? { form: n } : n, i = r.form, [a, o] = (0, g.useState)(() => typeof t == "function" ? t({}) : void 0), s = (0, g.useMemo)(() => Np(a), [a]), c = (0, g.useRef)(s);
	c.current = s;
	let l = (0, g.useContext)(tf), u = i || l, d = u && u._init, { getFieldsValue: f, getInternalHooks: p } = u, { registerWatch: m } = p($d), h = _((e, n) => {
		let i = r.preserve ? n ?? f(!0) : e ?? f(), s = typeof t == "function" ? t(i) : Ye(i, op(t));
		Np(a) !== Np(s) && o(s);
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
var Fp = /* @__PURE__ */ g.forwardRef(Mp);
Fp.FormProvider = Ap, Fp.Field = xp, Fp.List = Sp, Fp.useForm = Op, Fp.useWatch = Pp;
// node_modules/antd/es/form/context.js
var Ip = /*#__PURE__*/ g.createContext({}), Lp = ({ children: e, status: t, override: n }) => {
	let r = g.useContext(Ip), i = g.useMemo(() => {
		let e = { ...r };
		return n && delete e.isFormItemInput, t && (delete e.status, delete e.hasFeedback, delete e.feedbackIcon), e;
	}, [
		t,
		n,
		r
	]);
	return /*#__PURE__*/ g.createElement(Ip.Provider, { value: i }, e);
}, Rp = /*#__PURE__*/ g.createContext(void 0), zp = (e) => {
	let { space: t, form: n, children: r } = e;
	if (!Le(r)) return null;
	let i = r;
	return n && (i = /*#__PURE__*/ g.createElement(Lp, {
		override: !0,
		status: !0
	}, i)), t && (i = /*#__PURE__*/ g.createElement(Vu, null, i)), i;
}, Bp = (e) => {
	let { prefixCls: t, className: n, style: r, size: i, shape: a } = e, o = Z({
		[`${t}-lg`]: i === "large",
		[`${t}-sm`]: i === "small"
	}), s = Z({
		[`${t}-circle`]: a === "circle",
		[`${t}-square`]: a === "square",
		[`${t}-round`]: a === "round"
	}), c = g.useMemo(() => ac(i) ? {
		width: i,
		height: i,
		lineHeight: `${i}px`
	} : {}, [i]);
	return /*#__PURE__*/ g.createElement("span", {
		className: Z(t, o, s, n),
		style: {
			...c,
			...r
		}
	});
}, Vp = new Qr("ant-skeleton-loading", {
	"0%": { backgroundPosition: "100% 50%" },
	"100%": { backgroundPosition: "0 50%" }
}), Hp = (e) => ({
	height: e,
	lineHeight: Q(e)
}), Up = (e) => ({
	width: e,
	...Hp(e)
}), Wp = (e) => ({
	background: e.skeletonLoadingBackground,
	backgroundSize: "400% 100%",
	animationName: Vp,
	animationDuration: e.skeletonLoadingMotionDuration,
	animationTimingFunction: "ease",
	animationIterationCount: "infinite"
}), Gp = (e, t) => ({
	width: t(e).mul(5).equal(),
	minWidth: t(e).mul(5).equal(),
	...Hp(e)
}), Kp = (e) => {
	let { skeletonAvatarCls: t, gradientFromColor: n, controlHeight: r, controlHeightLG: i, controlHeightSM: a } = e;
	return {
		[t]: {
			display: "inline-block",
			verticalAlign: "top",
			background: n,
			...Up(r)
		},
		[`${t}${t}-circle`]: { borderRadius: "50%" },
		[`${t}${t}-lg`]: { ...Up(i) },
		[`${t}${t}-sm`]: { ...Up(a) }
	};
}, qp = (e) => {
	let { controlHeight: t, borderRadiusSM: n, skeletonInputCls: r, controlHeightLG: i, controlHeightSM: a, gradientFromColor: o, calc: s } = e;
	return {
		[r]: {
			display: "inline-block",
			verticalAlign: "top",
			background: o,
			borderRadius: n,
			...Gp(t, s)
		},
		[`${r}-lg`]: { ...Gp(i, s) },
		[`${r}-sm`]: { ...Gp(a, s) }
	};
}, Jp = (e) => {
	let { gradientFromColor: t, borderRadiusSM: n, imageSizeBase: r, calc: i } = e;
	return {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		verticalAlign: "middle",
		background: t,
		borderRadius: n,
		...Up(i(r).mul(2).equal())
	};
}, Yp = (e) => ({ [e.skeletonNodeCls]: { ...Jp(e) } }), Xp = (e) => {
	let { skeletonImageCls: t, imageSizeBase: n, calc: r } = e;
	return {
		[t]: {
			...Jp(e),
			[`${t}-path`]: { fill: "#bfbfbf" },
			[`${t}-svg`]: {
				...Up(n),
				maxWidth: r(n).mul(4).equal(),
				maxHeight: r(n).mul(4).equal()
			},
			[`${t}-svg${t}-svg-circle`]: { borderRadius: "50%" }
		},
		[`${t}${t}-circle`]: { borderRadius: "50%" }
	};
}, Zp = (e, t, n) => {
	let { skeletonButtonCls: r } = e;
	return {
		[`${n}${r}-circle`]: {
			width: t,
			minWidth: t,
			borderRadius: "50%"
		},
		[`${n}${r}-round`]: { borderRadius: t }
	};
}, Qp = (e, t) => ({
	width: t(e).mul(2).equal(),
	minWidth: t(e).mul(2).equal(),
	...Hp(e)
}), $p = (e) => {
	let { borderRadiusSM: t, skeletonButtonCls: n, controlHeight: r, controlHeightLG: i, controlHeightSM: a, gradientFromColor: o, calc: s } = e;
	return {
		[n]: {
			display: "inline-block",
			verticalAlign: "top",
			background: o,
			borderRadius: t,
			width: s(r).mul(2).equal(),
			minWidth: s(r).mul(2).equal(),
			...Qp(r, s)
		},
		...Zp(e, r, n),
		[`${n}-lg`]: { ...Qp(i, s) },
		...Zp(e, i, `${n}-lg`),
		[`${n}-sm`]: { ...Qp(a, s) },
		...Zp(e, a, `${n}-sm`)
	};
}, em = (e) => {
	let { componentCls: t, skeletonAvatarCls: n, skeletonTitleCls: r, skeletonParagraphCls: i, skeletonButtonCls: a, skeletonInputCls: o, skeletonNodeCls: s, skeletonImageCls: c, controlHeight: l, controlHeightLG: u, controlHeightSM: d, gradientFromColor: f, padding: p, marginSM: m, borderRadius: h, titleHeight: g, blockRadius: _, paragraphLiHeight: v, controlHeightXS: y, paragraphMarginTop: b } = e;
	return {
		[t]: {
			display: "table",
			width: "100%",
			[`${t}-header`]: {
				display: "table-cell",
				paddingInlineEnd: p,
				verticalAlign: "top",
				[n]: {
					display: "inline-block",
					verticalAlign: "top",
					background: f,
					...Up(l)
				},
				[`${n}-circle`]: { borderRadius: "50%" },
				[`${n}-lg`]: { ...Up(u) },
				[`${n}-sm`]: { ...Up(d) }
			},
			[`${t}-section`]: {
				display: "table-cell",
				width: "100%",
				verticalAlign: "top",
				[r]: {
					width: "100%",
					height: g,
					background: f,
					borderRadius: _,
					[`+ ${i}`]: { marginBlockStart: d }
				},
				[i]: {
					padding: 0,
					"> li": {
						width: "100%",
						height: v,
						listStyle: "none",
						background: f,
						borderRadius: _,
						"+ li": { marginBlockStart: y }
					}
				},
				[`${i}> li:last-child:not(:first-child):not(:nth-child(2))`]: { width: "61%" }
			},
			[`&-round ${t}-section`]: { [`${r}, ${i} > li`]: { borderRadius: h } }
		},
		[`${t}-with-avatar ${t}-section`]: { [r]: {
			marginBlockStart: m,
			[`+ ${i}`]: { marginBlockStart: b }
		} },
		[`${t}${t}-element`]: {
			display: "inline-block",
			width: "auto",
			...$p(e),
			...Kp(e),
			...qp(e),
			...Yp(e),
			...Xp(e)
		},
		[`${t}${t}-block`]: {
			width: "100%",
			[a]: { width: "100%" },
			[o]: { width: "100%" }
		},
		[`${t}${t}-active`]: { [`
        ${r},
        ${i} > li,
        ${n},
        ${a},
        ${o},
        ${s},
        ${c}
      `]: { ...Wp(e) } }
	};
}, tm = yo("Skeleton", (e) => {
	let { componentCls: t, calc: n } = e;
	return em(ji(e, {
		skeletonAvatarCls: `${t}-avatar`,
		skeletonTitleCls: `${t}-title`,
		skeletonParagraphCls: `${t}-paragraph`,
		skeletonButtonCls: `${t}-button`,
		skeletonInputCls: `${t}-input`,
		skeletonNodeCls: `${t}-node`,
		skeletonImageCls: `${t}-image`,
		imageSizeBase: n(e.controlHeight).mul(1.5).equal(),
		borderRadius: 100,
		skeletonLoadingBackground: `linear-gradient(90deg, ${e.gradientFromColor} 25%, ${e.gradientToColor} 37%, ${e.gradientFromColor} 63%)`,
		skeletonLoadingMotionDuration: "1.4s"
	}));
}, (e) => {
	let { colorFillContent: t, colorFill: n } = e, r = t, i = n;
	return {
		color: r,
		colorGradientEnd: i,
		gradientFromColor: r,
		gradientToColor: i,
		titleHeight: e.controlHeight / 2,
		blockRadius: e.borderRadiusSM,
		paragraphMarginTop: e.marginLG + e.marginXXS,
		paragraphLiHeight: e.controlHeight / 2
	};
}, { deprecatedTokens: [["color", "gradientFromColor"], ["colorGradientEnd", "gradientToColor"]] }), nm = (e) => {
	let { prefixCls: t, className: n, classNames: r, rootClassName: i, active: a, style: o, styles: s, shape: c = "circle", size: l, ...u } = e, { getPrefixCls: d } = g.useContext(It), f = d("skeleton", t), [p, m] = tm(f), h = Ru((e) => l ?? e), _ = Z(f, `${f}-element`, { [`${f}-active`]: a }, r?.root, n, i, p, m);
	return /*#__PURE__*/ g.createElement("div", {
		className: _,
		style: s?.root
	}, /*#__PURE__*/ g.createElement(Bp, {
		prefixCls: `${f}-avatar`,
		className: r?.content,
		style: {
			...s?.content,
			...o
		},
		shape: c,
		size: h,
		...u
	}));
}, rm = (e) => {
	let { prefixCls: t, className: n, rootClassName: r, classNames: i, active: a, style: o, styles: s, block: c = !1, size: l, ...u } = e, { getPrefixCls: d } = g.useContext(It), f = d("skeleton", t), [p, m] = tm(f), h = Ru((e) => l ?? e), _ = Z(f, `${f}-element`, {
		[`${f}-active`]: a,
		[`${f}-block`]: c
	}, i?.root, n, r, p, m);
	return /*#__PURE__*/ g.createElement("div", {
		className: _,
		style: s?.root
	}, /*#__PURE__*/ g.createElement(Bp, {
		prefixCls: `${f}-button`,
		className: i?.content,
		style: {
			...s?.content,
			...o
		},
		size: h,
		...u
	}));
}, im = (e) => {
	let { prefixCls: t, className: n, classNames: r, rootClassName: i, internalClassName: a, style: o, styles: s, active: c, children: l } = e, { getPrefixCls: u } = g.useContext(It), d = u("skeleton", t), [f, p] = tm(d), m = Z(d, `${d}-element`, { [`${d}-active`]: c }, f, r?.root, n, i, p);
	return /*#__PURE__*/ g.createElement("div", {
		className: m,
		style: s?.root
	}, /*#__PURE__*/ g.createElement("div", {
		className: Z(r?.content, a || `${d}-node`),
		style: {
			...s?.content,
			...o
		}
	}, l));
}, am = (e) => {
	let { getPrefixCls: t } = g.useContext(It), n = t("skeleton", e.prefixCls);
	return /*#__PURE__*/ g.createElement(im, {
		...e,
		internalClassName: `${n}-image`
	}, /*#__PURE__*/ g.createElement("svg", {
		viewBox: "0 0 1098 1024",
		xmlns: "http://www.w3.org/2000/svg",
		className: `${n}-image-svg`,
		"aria-hidden": "true",
		focusable: "false"
	}, /*#__PURE__*/ g.createElement("title", null, "Image placeholder"), /*#__PURE__*/ g.createElement("path", {
		d: "M365.7 329.1q0 45.8-32 77.7t-77.7 32-77.7-32-32-77.7 32-77.6 77.7-32 77.7 32 32 77.6M951 548.6v256H146.3V694.9L329 512l91.5 91.4L713 311zm54.8-402.3H91.4q-7.4 0-12.8 5.4T73 164.6v694.8q0 7.5 5.5 12.9t12.8 5.4h914.3q7.5 0 12.9-5.4t5.4-12.9V164.6q0-7.5-5.4-12.9t-12.9-5.4m91.4 18.3v694.8q0 37.8-26.8 64.6t-64.6 26.9H91.4q-37.7 0-64.6-26.9T0 859.4V164.6q0-37.8 26.8-64.6T91.4 73h914.3q37.8 0 64.6 26.9t26.8 64.6",
		className: `${n}-image-path`
	})));
}, om = (e) => {
	let { prefixCls: t, className: n, classNames: r, rootClassName: i, active: a, block: o, style: s, styles: c, size: l, ...u } = e, { getPrefixCls: d } = g.useContext(It), f = d("skeleton", t), [p, m] = tm(f), h = Ru((e) => l ?? e), _ = Z(f, `${f}-element`, {
		[`${f}-active`]: a,
		[`${f}-block`]: o
	}, r?.root, n, i, p, m);
	return /*#__PURE__*/ g.createElement("div", {
		className: _,
		style: c?.root
	}, /*#__PURE__*/ g.createElement(Bp, {
		prefixCls: `${f}-input`,
		className: r?.content,
		style: {
			...c?.content,
			...s
		},
		size: h,
		...u
	}));
}, sm = (e, t) => {
	let { width: n, rows: r = 2 } = t;
	if (Array.isArray(n)) return n[e];
	if (r - 1 === e) return n;
}, cm = (e) => {
	let { prefixCls: t, className: n, style: r, rows: i = 0 } = e, a = Array.from({ length: i }).map((t, n) => /*#__PURE__*/ g.createElement("li", {
		key: n,
		style: { width: sm(n, e) }
	}));
	return /*#__PURE__*/ g.createElement("ul", {
		className: Z(t, n),
		style: r
	}, a);
}, lm = ({ prefixCls: e, className: t, width: n, style: r }) => /*#__PURE__*/ g.createElement("h3", {
	className: Z(e, t),
	style: {
		width: n,
		...r
	}
});
// node_modules/antd/es/skeleton/Skeleton.js
function um(e) {
	return sc(e) ? e : {};
}
function dm(e, t) {
	return e && !t ? {
		size: "large",
		shape: "square"
	} : {
		size: "large",
		shape: "circle"
	};
}
function fm(e, t) {
	return !e && t ? { width: "38%" } : e && t ? { width: "50%" } : {};
}
function pm(e, t) {
	let n = {};
	return e && t || (n.width = "61%"), n.rows = !e && t ? 3 : 2, n;
}
var mm = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { prefixCls: n, loading: r, className: i, rootClassName: a, classNames: o, style: s, styles: c, children: l, avatar: u = !1, title: d = !0, paragraph: f = !0, active: p, round: m } = e, { getPrefixCls: h, direction: _, className: v, style: y, classNames: b, styles: x } = zt("skeleton"), S = h("skeleton", n), [C, w] = tm(S), T = {
		...e,
		avatar: u,
		title: d,
		paragraph: f
	}, E = mc(y), D = mc(s), [O, k] = gc([b, o], [
		x,
		E,
		c,
		D
	], { props: T }), A = g.useRef(null);
	if (g.useImperativeHandle(t, () => ({ nativeElement: A.current })), r || !("loading" in e)) {
		let e = !!u, t = !!d, n = !!f, r;
		if (e) {
			let e = {
				className: O.avatar,
				prefixCls: `${S}-avatar`,
				...dm(t, n),
				...um(u),
				style: k.avatar
			};
			r = /*#__PURE__*/ g.createElement("div", {
				className: Z(O.header, `${S}-header`),
				style: k.header
			}, /*#__PURE__*/ g.createElement(Bp, { ...e }));
		}
		let o;
		if (t || n) {
			let r;
			if (t) {
				let t = {
					className: O.title,
					prefixCls: `${S}-title`,
					...fm(e, n),
					...um(d),
					style: k.title
				};
				r = /*#__PURE__*/ g.createElement(lm, { ...t });
			}
			let i;
			if (n) {
				let n = {
					className: O.paragraph,
					prefixCls: `${S}-paragraph`,
					...pm(e, t),
					...um(f),
					style: k.paragraph
				};
				i = /*#__PURE__*/ g.createElement(cm, { ...n });
			}
			o = /*#__PURE__*/ g.createElement("div", {
				className: Z(O.section, `${S}-section`),
				style: k.section
			}, r, i);
		}
		let s = Z(S, {
			[`${S}-with-avatar`]: e,
			[`${S}-active`]: p,
			[`${S}-rtl`]: _ === "rtl",
			[`${S}-round`]: m
		}, O.root, v, i, a, C, w);
		return /*#__PURE__*/ g.createElement("div", {
			ref: A,
			className: s,
			style: k.root
		}, r, o);
	}
	return l ?? null;
});
mm.Button = rm, mm.Avatar = nm, mm.Input = om, mm.Image = am, mm.Node = im;
// node_modules/antd/es/skeleton/index.js
var hm = mm;
// node_modules/antd/es/_util/PurePanel.js
function gm(e) {
	return (t) => /*#__PURE__*/ g.createElement(lu, { theme: { token: {
		motion: !1,
		zIndexPopupBase: 0
	} } }, /*#__PURE__*/ g.createElement(e, { ...t }));
}
/* istanbul ignore next */
var _m = (e, t, n, r, i) => gm((a) => {
	let { prefixCls: o, style: s } = a, c = g.useRef(null), [l, u] = g.useState(0), [d, f] = g.useState(0), [p, m] = C(!1, a.open), { getPrefixCls: h } = g.useContext(It), _ = h(r || "select", o);
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
}), vm = (e, t, n, r, i = !1, a, o) => {
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
}, ym = /*#__PURE__*/ g.createContext(null);
function bm() {
	return g.useContext(ym);
}
// node_modules/@rc-component/select/es/hooks/useLock.js
function xm(e = 250) {
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
function Sm(e, t) {
	return e.filter((e) => e).some((e) => e.contains(t) || e === t);
}
function Cm(e, t, n, r) {
	let i = _((i) => {
		if (r) return;
		let a = i.target;
		a.shadowRoot && i.composed && (a = i.composedPath()[0] || a), i._ori_target && (a = i._ori_target), t && !Sm(e(), a) && n(!1);
	});
	g.useEffect(() => (window.addEventListener("mousedown", i), () => window.removeEventListener("mousedown", i)), [i]);
}
// node_modules/@rc-component/select/es/SelectTrigger.js
function wm() {
	return wm = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, wm.apply(this, arguments);
}
var Tm = (e) => {
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
}, Em = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { prefixCls: n, disabled: r, visible: i, children: a, popupElement: o, animation: s, transitionName: c, popupStyle: l, popupClassName: u, direction: d = "ltr", placement: f, builtinPlacements: p, popupMatchSelectWidth: m, popupRender: h, popupAlign: _, getPopupContainer: v, empty: y, onPopupVisibleChange: b, onPopupMouseEnter: x, onPopupMouseDown: S, onPopupBlur: C, ...w } = e, T = `${n}-dropdown`, E = o;
	h && (E = h(o));
	let D = g.useMemo(() => p || Tm(m), [p, m]), O = s ? `${T}-${s}` : c, k = typeof m == "number", A = g.useMemo(() => m === !1 || k ? "minWidth" : "width", [m, k]), j = l;
	k && (j = {
		...l,
		width: m
	});
	let M = g.useRef(null);
	return g.useImperativeHandle(t, () => ({ getPopupElement: () => M.current?.popupElement })), /*#__PURE__*/ g.createElement(Hl, wm({}, w, {
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
function Dm(e, t) {
	let { key: n } = e, r;
	return "value" in e && ({value: r} = e), n ?? (r === void 0 ? `rc-index-key-${t}` : r);
}
function Om(e) {
	return e !== void 0 && !Number.isNaN(e);
}
function km(e, t) {
	let { label: n, value: r, options: i, groupLabel: a } = e || {}, o = n || (t ? "children" : "label");
	return {
		label: o,
		value: r || "value",
		options: i || "options",
		groupLabel: a || o
	};
}
function Am(e, { fieldNames: t, childrenAsData: n } = {}) {
	let r = [], { label: i, value: a, options: o, groupLabel: s } = km(t, !1);
	function c(e, t) {
		Array.isArray(e) && e.forEach((e) => {
			if (t || !(o in e)) {
				let n = e[a];
				r.push({
					key: Dm(e, r.length),
					groupOption: t,
					data: e,
					label: e[i],
					value: n
				});
			} else {
				let t = e[s];
				t === void 0 && n && (t = e.label), r.push({
					key: Dm(e, r.length),
					group: !0,
					data: e,
					label: t
				}), c(e[o], !0);
			}
		});
	}
	return c(e, !1), r;
}
function jm(e) {
	let t = { ...e };
	return "props" in t || Object.defineProperty(t, "props", { get() {
		return Ne(!1, "Return type is option instead of Option instance. Please read value directly instead of reading from `props`."), t;
	} }), t;
}
var Mm = (e, t, n) => {
	if (!t || !t.length) return null;
	let r = !1, i = (e, [t, ...n]) => {
		if (!t) return [e];
		let a = e.split(t);
		return r ||= a.length > 1, a.reduce((e, t) => [...e, ...i(t, n)], []).filter(Boolean);
	}, a = i(e, t);
	return r ? n === void 0 ? a : a.slice(0, n) : null;
};
// node_modules/@rc-component/select/es/BaseSelect/Polite.js
function Nm(e) {
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
var Pm = (e) => {
	let t = new MessageChannel();
	t.port1.onmessage = e, t.port2.postMessage(null);
}, Fm = (e, t = 1) => {
	t <= 0 ? e() : Pm(() => {
		Fm(e, t - 1);
	});
};
function Im(e, t, n, r) {
	let [i, a] = (0, g.useState)(!1);
	(0, g.useEffect)(() => {
		a(!0);
	}, []);
	let [o, s] = C(e, t), [c, l] = (0, g.useState)(!1), u = i ? o : !1, d = r(u), f = (0, g.useRef)(0), p = _((e) => {
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
			i ? a() : Fm(() => {
				a();
			});
		}),
		c
	];
}
// node_modules/@rc-component/select/es/SelectInput/Affix.js
function Lm(e) {
	let { children: t, ...n } = e;
	return t ? /*#__PURE__*/ g.createElement("div", n, t) : null;
}
// node_modules/@rc-component/select/es/SelectInput/context.js
var Rm = /*#__PURE__*/ g.createContext(null);
function zm() {
	return g.useContext(Rm);
}
// node_modules/@rc-component/select/es/SelectInput/Input.js
var Bm = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { onChange: n, onKeyDown: r, onBlur: i, style: a, syncWidth: o, value: s, className: c, autoComplete: l, ...u } = e, { prefixCls: d, mode: f, onSearch: p, onSearchSubmit: m, onInputBlur: h, autoFocus: _, tokenWithEnter: v, placeholder: y, components: { input: x = "input" } } = zm(), { id: S, classNames: C, styles: w, open: T, activeDescendantId: E, role: D, disabled: O } = bm() || {}, k = Z(`${d}-input`, C?.input, c), A = g.useRef(!1), j = g.useRef(null), M = g.useRef(null);
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
	}, [z, B] = g.useState(void 0);
	b(() => {
		let e = M.current;
		if (o && e) {
			e.style.width = "0px";
			let t = e.scrollWidth;
			B(t), e.style.width = "";
		}
	}, [o, s]);
	let V = {
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
			...V,
			...t
		};
		return Object.keys(t).forEach((e) => {
			let r = t[e];
			typeof r == "function" && (n[e] = (...t) => {
				r(...t), V[e]?.(...t);
			});
		}), n.ref = te(x.ref, V.ref), /*#__PURE__*/ g.cloneElement(x, n);
	}
	let H = x;
	return /*#__PURE__*/ g.createElement(H, V);
});
// node_modules/@rc-component/select/es/SelectInput/Content/Placeholder.js
function Vm(e) {
	let { prefixCls: t, placeholder: n, displayValues: r } = zm(), { classNames: i, styles: a } = bm(), { show: o = !0 } = e;
	return r.length ? null : /*#__PURE__*/ g.createElement("div", {
		className: Z(`${t}-placeholder`, i?.placeholder),
		style: {
			...o ? {} : { visibility: "hidden" },
			...a?.placeholder
		}
	}, n);
}
// node_modules/@rc-component/select/es/SelectContext.js
var Hm = /*#__PURE__*/ g.createContext(null);
// node_modules/@rc-component/select/es/utils/commonUtil.js
function Um(e) {
	return Array.isArray(e) ? e : e === void 0 ? [] : [e];
}
typeof window < "u" && window.document && window.document.documentElement;
function Wm(e) {
	return e != null;
}
function Gm(e) {
	return !e && e !== 0;
}
function Km(e) {
	return ["string", "number"].includes(typeof e);
}
function qm(e) {
	let t;
	return e && (Km(e.title) ? t = e.title.toString() : Km(e.label) && (t = e.label.toString())), t;
}
// node_modules/@rc-component/select/es/SelectInput/Content/SingleContent.js
function Jm() {
	return Jm = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Jm.apply(this, arguments);
}
var Ym = /*#__PURE__*/ g.forwardRef(({ inputProps: e }, t) => {
	let { prefixCls: n, searchValue: r, activeValue: i, displayValues: a, maxLength: o, mode: s, components: c } = zm(), { triggerOpen: l, title: u, showSearch: d, classNames: f, styles: p } = bm(), m = g.useContext(Hm), [h, _] = g.useState(!1), v = s === "combobox", y = a[0], b = g.useMemo(() => v && i && !h && l ? i : d ? r : "", [
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
			r?.data && (e = r.data.className, t = r.data.style, n = qm(r.data));
		}
		return y && !n && (n = qm(y)), u !== void 0 && (n = u), [
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
	}, y.label) : y.label : /*#__PURE__*/ g.createElement(Vm, { show: !b });
	return /*#__PURE__*/ g.createElement("div", {
		className: Z(`${n}-content`, T && `${n}-content-has-value`, b && `${n}-content-has-search-value`, w && `${n}-content-has-option-style`, f?.content),
		style: p?.content,
		title: w ? void 0 : C
	}, E, /*#__PURE__*/ g.createElement(Bm, Jm({ ref: t }, e, {
		value: b,
		maxLength: s === "combobox" ? o : void 0,
		onChange: (t) => {
			_(!0), e.onChange?.(t);
		}
	})));
}), Xm = void 0;
function Zm(e, t) {
	let { prefixCls: n, invalidate: r, item: i, renderItem: a, responsive: o, responsiveDisabled: s, registerSize: c, itemKey: l, className: u, style: d, children: f, display: p, order: m, component: h = "div", ..._ } = e, v = o && !p;
	function y(e) {
		c(l, e);
	}
	g.useEffect(() => () => {
		y(null);
	}, []);
	let b = a && i !== Xm ? a(i, { index: m }) : f, x;
	r || (x = {
		opacity: +!v,
		height: v ? 0 : Xm,
		overflowY: v ? "hidden" : Xm,
		order: o ? m : Xm,
		pointerEvents: v ? "none" : Xm,
		position: v ? "absolute" : Xm
	});
	let S = {};
	v && (S["aria-hidden"] = !0);
	let C = /*#__PURE__*/ g.createElement(h, kd({
		className: Z(!r && n, u),
		style: {
			...x,
			...d
		}
	}, S, _, { ref: t }), b);
	return o && (C = /*#__PURE__*/ g.createElement(Et, {
		onResize: ({ offsetWidth: e }) => {
			y(e);
		},
		disabled: s
	}, C)), C;
}
var Qm = /*#__PURE__*/ g.forwardRef(Zm);
// node_modules/@rc-component/overflow/es/hooks/channelUpdate.js
function $m(e) {
	if (typeof MessageChannel > "u") k(e);
	else {
		let t = new MessageChannel();
		t.port1.onmessage = () => e(), t.port2.postMessage(void 0);
	}
}
// node_modules/@rc-component/overflow/es/hooks/useEffectState.js
function eh() {
	let e = g.useRef(null);
	return (t) => {
		e.current || (e.current = [], $m(() => {
			(0, st.unstable_batchedUpdates)(() => {
				e.current.forEach((e) => {
					e();
				}), e.current = null;
			});
		})), e.current.push(t);
	};
}
function th(e, t) {
	let [n, r] = g.useState(t);
	return [n, _((t) => {
		e(() => {
			r(t);
		});
	})];
}
// node_modules/@rc-component/overflow/es/context.js
var nh = /*#__PURE__*/ g.createContext(null), rh = /*#__PURE__*/ g.forwardRef((e, t) => {
	let n = g.useContext(nh);
	if (!n) {
		let { component: n = "div", ...r } = e;
		return /*#__PURE__*/ g.createElement(n, kd({}, r, { ref: t }));
	}
	let { className: r, ...i } = n, { className: a, ...o } = e;
	return /*#__PURE__*/ g.createElement(nh.Provider, { value: null }, /*#__PURE__*/ g.createElement(Qm, kd({
		ref: t,
		className: Z(r, a)
	}, i, o)));
}), ih = "responsive", ah = "invalidate";
function oh(e) {
	return `+ ${e.length} ...`;
}
function sh(e, t) {
	let { prefixCls: n = "rc-overflow", data: r = [], renderItem: i, renderRawItem: a, itemKey: o, itemWidth: s = 10, ssr: c, style: l, className: u, maxCount: d, renderRest: f, renderRawRest: p, prefix: m, suffix: h, component: _ = "div", itemComponent: v, onVisibleChange: y, ...x } = e, S = c === "full", C = eh(), [w, T] = th(C, null), E = w || 0, [D, O] = th(C, /* @__PURE__ */ new Map()), [k, A] = th(C, 0), [j, M] = th(C, 0), [N, P] = th(C, 0), [F, I] = th(C, 0), [L, R] = (0, g.useState)(null), [z, B] = (0, g.useState)(null), V = g.useMemo(() => z === null && S ? 2 ** 53 - 1 : z || 0, [z, w]), [H, U] = (0, g.useState)(!1), W = `${n}-item`, ee = Math.max(k, j), te = d === ih, ne = r.length && te, re = d === ah, ie = ne || typeof d == "number" && r.length > d, ae = (0, g.useMemo)(() => {
		let e = r;
		return ne ? e = w === null && S ? r : r.slice(0, Math.min(r.length, E / s)) : typeof d == "number" && (e = r.slice(0, d)), e;
	}, [
		r,
		s,
		w,
		d,
		ne
	]), G = (0, g.useMemo)(() => ne ? r.slice(V + 1) : r.slice(ae.length), [
		r,
		ae,
		ne,
		V
	]), K = (0, g.useCallback)((e, t) => typeof o == "function" ? o(e) : (o && e?.[o]) ?? t, [o]), oe = (0, g.useCallback)(i || ((e) => e), [i]);
	function se(e, t, n) {
		(z !== e || t !== void 0 && t !== L) && (B(e), n || (U(e < r.length - 1), y?.(e)), t !== void 0 && R(t));
	}
	function ce(e, t) {
		T(t.clientWidth);
	}
	function q(e, t) {
		O((n) => {
			let r = new Map(n);
			return t === null ? r.delete(e) : r.set(e, t), r;
		});
	}
	function le(e, t) {
		M(t), A(j);
	}
	function ue(e, t) {
		P(t);
	}
	function de(e, t) {
		I(t);
	}
	function fe(e) {
		return D.get(K(ae[e], e));
	}
	b(() => {
		if (E && typeof ee == "number" && ae) {
			let e = N + F, t = ae.length, n = t - 1;
			if (!t) {
				se(0, null);
				return;
			}
			for (let r = 0; r < t; r += 1) {
				let t = fe(r);
				if (S && (t ||= 0), t === void 0) {
					se(r - 1, void 0, !0);
					break;
				}
				if (e += t, n === 0 && e <= E || r === n - 1 && e + fe(n) <= E) {
					se(n, null);
					break;
				}
				if (e + ee > E) {
					se(r - 1, e - t - F + j);
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
		K,
		ae
	]);
	let pe = H && !!G.length, me = {};
	L !== null && ne && (me = {
		position: "absolute",
		top: 0,
		insetInlineStart: L
	});
	let J = {
		prefixCls: W,
		responsive: ne,
		component: v,
		invalidate: re
	}, Y = a ? (e, t) => {
		let n = K(e, t);
		return /*#__PURE__*/ g.createElement(nh.Provider, {
			key: n,
			value: {
				...J,
				order: t,
				item: e,
				itemKey: n,
				registerSize: q,
				display: t <= V
			}
		}, a(e, t));
	} : (e, t) => {
		let n = K(e, t);
		return /*#__PURE__*/ g.createElement(Qm, kd({}, J, {
			order: t,
			key: n,
			item: e,
			renderItem: oe,
			itemKey: n,
			registerSize: q,
			display: t <= V
		}));
	}, he = {
		order: pe ? V : 2 ** 53 - 1,
		className: `${W}-rest`,
		registerSize: le,
		display: pe
	}, ge = f || oh, _e = p ? /*#__PURE__*/ g.createElement(nh.Provider, { value: {
		...J,
		...he
	} }, p(G)) : /*#__PURE__*/ g.createElement(Qm, kd({}, J, he), typeof ge == "function" ? ge(G) : ge), ve = /*#__PURE__*/ g.createElement(_, kd({
		className: Z(!re && n, u),
		style: l,
		ref: t
	}, x), m && /*#__PURE__*/ g.createElement(Qm, kd({}, J, {
		responsive: te,
		responsiveDisabled: !ne,
		order: -1,
		className: `${W}-prefix`,
		registerSize: ue,
		display: !0
	}), m), ae.map(Y), ie ? _e : null, h && /*#__PURE__*/ g.createElement(Qm, kd({}, J, {
		responsive: te,
		responsiveDisabled: !ne,
		order: V,
		className: `${W}-suffix`,
		registerSize: de,
		display: !0,
		style: me
	}), h));
	return te ? /*#__PURE__*/ g.createElement(Et, {
		onResize: ce,
		disabled: !ne
	}, ve) : ve;
}
var ch = /*#__PURE__*/ g.forwardRef(sh);
ch.Item = rh, ch.RESPONSIVE = ih, ch.INVALIDATE = ah;
// node_modules/@rc-component/overflow/es/index.js
var lh = ch, uh = (e) => {
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
function dh() {
	return dh = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, dh.apply(this, arguments);
}
function fh(e) {
	return e.key ?? e.value;
}
var ph = (e) => {
	e.preventDefault(), e.stopPropagation();
}, mh = /*#__PURE__*/ g.forwardRef(function({ inputProps: e }, t) {
	let { prefixCls: n, displayValues: r, searchValue: i, mode: a, onSelectorRemove: o, removeIcon: s } = zm(), { disabled: c, showSearch: l, triggerOpen: u, rawOpen: d, toggleOpen: f, autoClearSearchValue: p, tagRender: m, maxTagPlaceholder: h, maxTagTextLength: _, maxTagCount: v, classNames: y, styles: b } = bm(), x = `${n}-selection-item`, S = i;
	!d && a === "multiple" && p !== !1 && (S = "");
	let C = l && S || "", w = l && !c, T = s ?? "×", E = h ?? ((e) => `+ ${e.length} ...`), D = m, O = (e) => {
		f(e);
	}, k = (e) => {
		o?.(e);
	}, A = (e, t, n, r, i) => /*#__PURE__*/ g.createElement("span", {
		title: qm(e),
		className: Z(x, { [`${x}-disabled`]: n }, y?.item),
		style: b?.item
	}, /*#__PURE__*/ g.createElement("span", {
		className: Z(`${x}-content`, y?.itemContent),
		style: b?.itemContent
	}, t), r && /*#__PURE__*/ g.createElement(uh, {
		className: Z(`${x}-remove`, y?.itemRemove),
		style: b?.itemRemove,
		onMouseDown: ph,
		onClick: i,
		customizeIcon: T
	}, "×")), j = (e, t, n, r, i, a, o) => /*#__PURE__*/ g.createElement("span", { onMouseDown: (e) => {
		ph(e), O(!u);
	} }, D({
		label: t,
		value: e,
		index: o?.index,
		disabled: n,
		closable: r,
		onClose: i,
		isMaxTag: !!a
	}));
	return /*#__PURE__*/ g.createElement(lh, {
		prefixCls: `${n}-content`,
		className: y?.content,
		style: b?.content,
		prefix: !r.length && !C && /*#__PURE__*/ g.createElement(Vm, null),
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
		suffix: /*#__PURE__*/ g.createElement(Bm, dh({
			ref: t,
			disabled: c,
			readOnly: !w
		}, e, {
			value: C || "",
			syncWidth: !0
		})),
		itemKey: fh,
		maxCount: v
	});
}), hh = /*#__PURE__*/ g.forwardRef(function(e, t) {
	let { multiple: n, onInputKeyDown: r, tabIndex: i } = zm(), a = bm(), { showSearch: o } = a, s = {
		...Ke(a, { aria: !0 }),
		onKeyDown: r,
		readOnly: !o,
		tabIndex: i
	};
	return n ? /*#__PURE__*/ g.createElement(mh, {
		ref: t,
		inputProps: s
	}) : /*#__PURE__*/ g.createElement(Ym, {
		ref: t,
		inputProps: s
	});
});
// node_modules/@rc-component/select/es/utils/keyUtil.js
function gh(e) {
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
function _h() {
	return _h = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, _h.apply(this, arguments);
}
var vh = [
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
], yh = /*#__PURE__*/ g.forwardRef(function(e, t) {
	let { prefixCls: n, className: r, style: i, prefix: a, suffix: o, clearIcon: s, clearLabel: c, children: l, multiple: u, displayValues: d, placeholder: f, mode: p, searchValue: m, onSearch: h, onSearchSubmit: v, onInputBlur: y, maxLength: b, autoFocus: x, onMouseDown: S, onClearMouseDown: C, onInputKeyDown: w, onSelectorRemove: T, tokenWithEnter: E, components: D, ...O } = e, { triggerOpen: k, toggleOpen: A, showSearch: j, disabled: M, loading: N, classNames: P, styles: F } = bm(), I = g.useRef(null), L = g.useRef(null), R = _((e) => {
		let { which: t } = e, n = L.current instanceof HTMLTextAreaElement;
		!n && k && (t === X.UP || t === X.DOWN) && e.preventDefault(), w && w(e), !(n && !k && ~[
			X.UP,
			X.DOWN,
			X.LEFT,
			X.RIGHT
		].indexOf(t)) && !(e.ctrlKey || e.altKey || e.metaKey) && gh(t) && A(!0);
	});
	g.useImperativeHandle(t, () => ({
		focus: (e) => {
			(L.current || I.current).focus?.(e);
		},
		blur: () => {
			(L.current || I.current).blur?.();
		},
		nativeElement: _e(I.current)
	}));
	let z = _((e) => {
		if (!M) {
			let t = _e(L.current);
			e.nativeEvent._ori_target = t;
			let n = t === e.target || t?.contains(e.target);
			t && !n && e.preventDefault();
			let r = k && !u && (p === "combobox" || j) || k && u && n;
			e.nativeEvent._select_lazy ? k && !u && A(!1) : (L.current?.focus(), r || A());
		}
		S?.(e);
	}), B = (e) => {
		(e.key === "Enter" || e.key === " ") && e.stopPropagation();
	}, { root: V } = D, H = Ve(O, vh), U = Ke(H, { aria: !0 }), W = Object.keys(U), ee = {
		...e,
		onInputKeyDown: R
	};
	if (V) {
		let e = V.props || {}, t = {
			...e,
			...H
		};
		return Object.keys(e).forEach((n) => {
			let r = e[n], i = H[n];
			typeof r == "function" && typeof i == "function" && (t[n] = (...e) => {
				i(...e), r(...e);
			});
		}), /*#__PURE__*/ g.isValidElement(V) ? /*#__PURE__*/ g.cloneElement(V, {
			...t,
			ref: te(V.ref, I)
		}) : /*#__PURE__*/ g.createElement(V, _h({}, t, { ref: I }));
	}
	return /*#__PURE__*/ g.createElement(Rm.Provider, { value: ee }, /*#__PURE__*/ g.createElement("div", _h({}, Ve(H, W), {
		ref: I,
		className: r,
		style: i,
		onMouseDown: z
	}), /*#__PURE__*/ g.createElement(Lm, {
		className: Z(`${n}-prefix`, P?.prefix),
		style: F?.prefix
	}, a), /*#__PURE__*/ g.createElement(hh, { ref: L }), /*#__PURE__*/ g.createElement(Lm, {
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
		onKeyDown: B,
		onClick: C
	}, s), l));
});
// node_modules/@rc-component/select/es/hooks/useComponents.js
function bh(e, t, n) {
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
function xh() {
	return xh = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, xh.apply(this, arguments);
}
var Sh = (e) => e === "tags" || e === "multiple", Ch = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { id: n, prefixCls: r, className: i, styles: a, classNames: o, showSearch: s, tagRender: c, showScrollBar: l = "optional", direction: u, omitDomProps: d, displayValues: f, onDisplayValuesChange: p, emptyOptions: m, notFoundContent: h = "Not Found", onClear: v, maxCount: y, placeholder: b, mode: x, disabled: S, loading: C, getInputElement: w, getRawInputElement: T, open: E, defaultOpen: D, onPopupVisibleChange: O, activeValue: k, onActiveValueChange: A, activeDescendantId: j, searchValue: M, autoClearSearchValue: N, onSearch: P, onSearchSplit: F, tokenSeparators: I, allowClear: L, prefix: R, suffix: z, suffixIcon: B, clearIcon: V, OptionList: H, animation: U, transitionName: W, popupStyle: ee, popupClassName: te, popupMatchSelectWidth: ne, popupRender: re, popupAlign: ie, placement: ae, builtinPlacements: G, getPopupContainer: K, showAction: oe = [], onFocus: se, onBlur: ce, onKeyUp: q, onKeyDown: le, onMouseDown: ue, components: de, ...fe } = e, pe = Sh(x), me = g.useRef(null), J = g.useRef(null), Y = g.useRef(null), [he, ge] = g.useState(!1);
	g.useImperativeHandle(t, () => ({
		focus: me.current?.focus,
		blur: me.current?.blur,
		scrollTo: (e) => Y.current?.scrollTo(e),
		nativeElement: _e(me.current)
	}));
	let ve = bh(de, w, T), ye = g.useMemo(() => {
		if (x !== "combobox") return M;
		let e = f[0]?.value;
		return typeof e == "string" || typeof e == "number" ? String(e) : "";
	}, [
		M,
		x,
		f
	]), be = x === "combobox" && typeof w == "function" && w() || null, xe = !h && m, [Se, Ce, X, we] = Im(D || !1, E, O, (e) => S || xe ? !1 : e), Te = g.useMemo(() => typeof I == "function" || (I || []).some((e) => ["\n", "\r\n"].includes(e)), [I]), Ee = g.useMemo(() => typeof I == "function" ? (e, t) => {
		let n = I(e), r = Array.isArray(n) && n.length === 1 && n[0] === e;
		return !Array.isArray(n) || !n.length || r ? null : t === void 0 ? n : n.slice(0, t);
	} : (e, t) => Mm(e, I, t), [I]), De = (e, t, n) => {
		if (pe && Om(y) && f.length >= y) return;
		let r = !0, i = e;
		A?.(null);
		let a = Om(y) ? y - f.length : void 0, o = n ? null : Ee(e, a);
		return x !== "combobox" && o && (i = "", F?.(o), X(!1), r = !1), P && ye !== i && P(i, { source: t ? "typing" : "effect" }), e && t && r && X(!0), r;
	}, Oe = (e) => {
		e && e.trim() && P(e, { source: "submit" });
	};
	g.useEffect(() => {
		!Se && !pe && x !== "combobox" && De("", !1, !1);
	}, [Se]), g.useEffect(() => {
		S && (X(!1), ge(!1));
	}, [S, Ce]);
	let [ke, Ae] = xm(), je = g.useRef(!1), Me = (e) => {
		let t = ke(), { key: n } = e, r = n === "Enter", i = n === " ";
		if (r || i) {
			let t = x === "combobox";
			(i && !(t || s) || r && !t) && e.preventDefault(), Ce || X(!0);
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
		!Ce || r && je.current || i || (r && (je.current = !0), Y.current?.onKeyDown(e)), le?.(e);
	}, Ne = (e, ...t) => {
		Ce && Y.current?.onKeyUp(e, ...t), e.key === "Enter" && (je.current = !1), q?.(e, ...t);
	}, Pe = _((e) => {
		let t = f.filter((t) => t !== e);
		p(t, {
			type: "remove",
			values: [e]
		});
	}), Fe = () => {
		je.current = !1;
	}, Ie = () => [_e(me.current), J.current?.getPopupElement()];
	Cm(Ie, Ce, X, !!ve.root);
	let Le = g.useRef(!1), Re = (e) => {
		ge(!0), S || (oe.includes("focus") && X(!0), se?.(e));
	}, ze = () => {
		Ce && !Le.current && X(!1, { cancelFun: () => Sm(Ie(), document.activeElement) });
	}, Be = (e) => {
		ge(!1), ye && (x === "tags" ? P(ye, { source: "submit" }) : x === "multiple" && P("", { source: "blur" })), ze(), S || ce?.(e);
	}, Ve = (e, ...t) => {
		let { target: n } = e;
		(J.current?.getPopupElement())?.contains(n) && X && X(!0), ue?.(e, ...t), Le.current = !0, Fm(() => {
			Le.current = !1;
		});
	}, [, He] = g.useState({});
	function Ue() {
		He({});
	}
	let We;
	ve.root && (We = (e) => {
		X(e);
	});
	let Ge = g.useMemo(() => ({
		...e,
		notFoundContent: h,
		open: Ce,
		triggerOpen: Ce,
		rawOpen: Se,
		id: n,
		showSearch: s,
		multiple: pe,
		toggleOpen: X,
		showScrollBar: l,
		styles: a,
		classNames: o,
		lockOptions: we
	}), [
		e,
		h,
		X,
		n,
		s,
		pe,
		Ce,
		Se,
		l,
		a,
		o,
		we
	]), Ke = g.useMemo(() => {
		let e = z ?? B;
		return typeof e == "function" ? e({
			searchValue: ye,
			open: Ce,
			focused: he,
			showSearch: s,
			loading: C
		}) : e;
	}, [
		z,
		B,
		ye,
		Ce,
		he,
		s,
		C
	]), qe = () => {
		v?.(), me.current?.focus(), p([], {
			type: "clear",
			values: f
		}), De("", !1, !1);
	}, { allowClear: Je, clearIcon: Ye, label: Xe } = vm(r, f, L, V, S, ye, x), Ze = /*#__PURE__*/ g.createElement(H, { ref: Y }), Qe = Z(r, i, {
		[`${r}-focused`]: he,
		[`${r}-multiple`]: pe,
		[`${r}-single`]: !pe,
		[`${r}-allow-clear`]: Je,
		[`${r}-show-arrow`]: Ke != null,
		[`${r}-disabled`]: S,
		[`${r}-loading`]: C,
		[`${r}-open`]: Ce,
		[`${r}-customize-input`]: be,
		[`${r}-show-search`]: s
	}), $e = /*#__PURE__*/ g.createElement(yh, xh({}, fe, {
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
	return $e = /*#__PURE__*/ g.createElement(Em, {
		ref: J,
		disabled: S,
		prefixCls: r,
		visible: Ce,
		popupElement: Ze,
		animation: U,
		transitionName: W,
		popupStyle: ee,
		popupClassName: te,
		direction: u,
		popupMatchSelectWidth: ne,
		popupRender: re,
		popupAlign: ie,
		placement: ae,
		builtinPlacements: G,
		getPopupContainer: K,
		empty: m,
		onPopupVisibleChange: We,
		onPopupMouseEnter: Ue,
		onPopupMouseDown: Ve,
		onPopupBlur: ze
	}, $e), /*#__PURE__*/ g.createElement(ym.Provider, { value: Ge }, /*#__PURE__*/ g.createElement(Nm, {
		visible: he && !Ce,
		values: f
	}), $e);
}), wh = () => null;
/* istanbul ignore file */
wh.isSelectOptGroup = !0;
// node_modules/@rc-component/select/es/Option.js
/* istanbul ignore file */
var Th = () => null;
Th.isSelectOption = !0;
// node_modules/@rc-component/virtual-list/es/Filler.js
function Eh() {
	return Eh = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Eh.apply(this, arguments);
}
var Dh = /*#__PURE__*/ g.forwardRef(({ height: e, offsetY: t, offsetX: n, children: r, prefixCls: i, onInnerResize: a, innerProps: o, rtl: s, extra: c }, l) => {
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
	}), /*#__PURE__*/ g.createElement("div", { style: u }, /*#__PURE__*/ g.createElement(Et, { onResize: ({ offsetHeight: e }) => {
		e && a && a();
	} }, /*#__PURE__*/ g.createElement("div", Eh({
		style: d,
		className: Z({ [`${i}-holder-inner`]: i }),
		ref: l
	}, o), r, c)));
});
Dh.displayName = "Filler";
// node_modules/@rc-component/virtual-list/es/Item.js
function Oh({ children: e, setRef: t }) {
	let n = g.useCallback((e) => {
		t(e);
	}, [t]);
	return /*#__PURE__*/ g.cloneElement(e, { ref: n });
}
// node_modules/@rc-component/virtual-list/es/hooks/useChildren.js
function kh(e, t, n, r, i, a, o, { getKey: s }) {
	return e.slice(t, n + 1).map((e, n) => {
		let c = o(e, t + n, {
			style: { width: r },
			offsetX: i
		}), l = s(e);
		return /*#__PURE__*/ g.createElement(Oh, {
			key: l,
			setRef: (t) => a(e, t)
		}, c);
	});
}
// node_modules/@rc-component/virtual-list/es/utils/algorithmUtil.js
function Ah(e, t, n) {
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
function jh(e, t, n) {
	let [r, i] = g.useState(e), [a, o] = g.useState(null);
	return g.useEffect(() => {
		let a = Ah(r || [], e || [], t);
		a?.index !== void 0 && (n?.(a.index), o(e[a.index])), i(e);
	}, [e]), [a];
}
// node_modules/@rc-component/virtual-list/es/utils/isFirefox.js
var Mh = typeof navigator == "object" && /Firefox/i.test(navigator.userAgent), Nh = ((e, t, n, r) => {
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
function Ph(e, t, n, r, i, a, o) {
	let s = (0, g.useRef)(0), c = (0, g.useRef)(null), l = (0, g.useRef)(null), u = (0, g.useRef)(!1), d = Nh(t, n, r, i);
	function f(e, t) {
		if (k.cancel(c.current), d(!1, t)) return;
		let n = e;
		if (!n._virtualHandled) n._virtualHandled = !0;
		else return;
		s.current += t, l.current = t, Mh || n.preventDefault(), c.current = k(() => {
			let e = u.current ? 10 : 1;
			o(s.current * e, !1), s.current = 0;
		});
	}
	function p(e, t) {
		o(t, !0), Mh || e.preventDefault();
	}
	let m = (0, g.useRef)(null), h = (0, g.useRef)(null);
	function _(t) {
		if (!e) return;
		k.cancel(h.current), h.current = k(() => {
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
function Fh(e, t, n, r) {
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
var Ih = class {
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
function Lh(e) {
	let t = parseFloat(e);
	return isNaN(t) ? 0 : t;
}
function Rh(e, t, n) {
	let [r, i] = g.useState(0), a = (0, g.useRef)(/* @__PURE__ */ new Map()), o = (0, g.useRef)(new Ih()), s = (0, g.useRef)(0);
	function c() {
		s.current += 1;
	}
	function l(e = !1) {
		c();
		let t = () => {
			let e = !1;
			a.current.forEach((t, n) => {
				if (t && t.offsetParent) {
					let { offsetHeight: r } = t, { marginTop: i, marginBottom: a } = getComputedStyle(t), s = Lh(i), c = Lh(a), l = r + s + c;
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
var zh = 14 / 15;
function Bh(e, t, n) {
	let r = (0, g.useRef)(!1), i = (0, g.useRef)(0), a = (0, g.useRef)(0), o = (0, g.useRef)(null), s = (0, g.useRef)(null), c, l = (e) => {
		if (r.current) {
			let t = Math.ceil(e.touches[0].pageX), r = Math.ceil(e.touches[0].pageY), o = i.current - t, c = a.current - r, l = Math.abs(o) > Math.abs(c);
			l ? i.current = t : a.current = r;
			let u = n(l, l ? o : c, !1, e);
			u && e.preventDefault(), clearInterval(s.current), u && (s.current = setInterval(() => {
				l ? o *= zh : c *= zh;
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
function Vh(e) {
	return Math.floor(e ** .5);
}
function Hh(e, t) {
	return ("touches" in e ? e.touches[0] : e)[t ? "pageX" : "pageY"] - window[t ? "scrollX" : "scrollY"];
}
function Uh(e) {
	let t = e;
	for (; t;) {
		if (t.draggable) return !0;
		t = t.parentElement;
	}
	return !1;
}
function Wh(e, t, n) {
	g.useEffect(() => {
		let r = t.current;
		if (e && r) {
			let e = !1, t, i, a = () => {
				k.cancel(t);
			}, o = () => {
				a(), t = k(() => {
					n(i), o();
				});
			}, s = () => {
				e = !1, a();
			}, c = (t) => {
				if (Uh(t.target) || t.button !== 0) return;
				let n = t;
				n._virtualHandled || (n._virtualHandled = !0, e = !0);
			}, l = (t) => {
				if (e) {
					let e = Hh(t, !1), { top: n, bottom: s } = r.getBoundingClientRect();
					e <= n ? (i = -Vh(n - e), o()) : e >= s ? (i = Vh(e - s), o()) : a();
				}
			};
			return r.addEventListener("mousedown", c), r.ownerDocument.addEventListener("mouseup", s), r.ownerDocument.addEventListener("mousemove", l), r.ownerDocument.addEventListener("dragend", s), () => {
				r.removeEventListener("mousedown", c), r.ownerDocument.removeEventListener("mouseup", s), r.ownerDocument.removeEventListener("mousemove", l), r.ownerDocument.removeEventListener("dragend", s), a();
			};
		}
	}, [e]);
}
// node_modules/@rc-component/virtual-list/es/hooks/useDragEdgeScroll.js
function Gh(e, t, n, r, i) {
	let a = g.useRef(i);
	a.current = i, g.useEffect(() => {
		let i = t.current;
		if (!e || !i || !n) return;
		let o = Math.min(r * 1.2, n / 4), s = null, c = 0, l = () => {
			s !== null && (k.cancel(s), s = null), c = 0;
		}, u = () => {
			a.current(c), s = k(u);
		}, d = () => {
			c === 0 ? l() : s === null && (s = k(u));
		}, f = (e) => {
			let t = e;
			if (t._virtualHandled) {
				l();
				return;
			}
			t._virtualHandled = !0;
			let { top: n, bottom: r } = i.getBoundingClientRect(), { clientY: a } = e;
			a <= n + o ? (c = -Vh(n + o - a), d()) : a >= r - o ? (c = Vh(a - (r - o)), d()) : l();
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
var Kh = 10;
function qh(e, t) {
	let n = typeof e == "function" ? e(t) : e;
	return Number.isFinite(n) ? n : 0;
}
function Jh(e, t, n, r, i, a, o, s, c) {
	let l = g.useRef(void 0), [u, d] = g.useState(null);
	return b(() => {
		if (u && u.times < Kh) {
			if (!e.current) {
				d((e) => ({ ...e }));
				return;
			}
			o();
			let { targetAlign: c, originAlign: l, offset: f } = u, p = u.index >= 0 ? u.index : t.findIndex((e) => i(e) === u.key), m = c || l, h = qh(f, {
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
		else if (k.cancel(l.current), typeof e == "number") s(e);
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
function Yh(e, t, n) {
	if (t <= 0 || n <= 0) return 0;
	let r = Math.max(Math.min(e, n), 0) / n, i = Math.ceil(r * t);
	return i = Math.max(i, 0), i = Math.min(i, t), i;
}
var Xh = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { prefixCls: n, rtl: r, scrollOffset: i, scrollRange: a, onStartMove: o, onStopMove: s, onScroll: c, horizontal: l, spinSize: u, containerSize: d, style: f, thumbStyle: p, showScrollBar: m } = e, [h, v] = g.useState(!1), [y, b] = g.useState(null), [x, S] = g.useState(null), C = !r, w = g.useRef(null), T = g.useRef(null), [E, D] = g.useState(m), O = g.useRef(void 0), A = () => {
		m !== !0 && m !== !1 && (clearTimeout(O.current), D(!0), O.current = setTimeout(() => {
			D(!1);
		}, 3e3));
	}, j = a - d || 0, M = d - u || 0, N = g.useMemo(() => i === 0 || j === 0 ? 0 : i / j * M, [
		i,
		j,
		M
	]), P = (e) => !!e && T.current?.contains(e), F = (e) => {
		let t = w.current;
		if (!t) return;
		let n = t.getBoundingClientRect(), r = Hh(e, l), i;
		if (Number.isFinite(r)) {
			if (l) {
				let e = C ? n.left : n.right;
				if (!Number.isFinite(e)) return;
				i = (C ? r - e : e - r) - u / 2;
			} else {
				if (!Number.isFinite(n.top)) return;
				i = r - n.top - u / 2;
			}
			c(Yh(i, j, M), l);
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
		v(!0), b(Hh(e, l)), S(L.current.top), o(), e.stopPropagation(), e.preventDefault();
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
	let B = g.useRef(void 0);
	B.current = M, g.useEffect(() => {
		if (h) {
			let e, t = (t) => {
				let { dragging: n, pageY: r, startTop: i } = L.current;
				k.cancel(e);
				let a = w.current.getBoundingClientRect(), o = d / (l ? a.width : a.height);
				if (n) {
					let n = (Hh(t, l) - r) * o, a = i;
					!C && l ? a -= n : a += n;
					let s = z.current, u = B.current, d = Yh(a, s, u);
					e = k(() => {
						c(d, l);
					});
				}
			}, n = () => {
				v(!1), s();
			};
			return window.addEventListener("mousemove", t, { passive: !0 }), window.addEventListener("touchmove", t, { passive: !0 }), window.addEventListener("mouseup", n, { passive: !0 }), window.addEventListener("touchend", n, { passive: !0 }), () => {
				window.removeEventListener("mousemove", t), window.removeEventListener("touchmove", t), window.removeEventListener("mouseup", n), window.removeEventListener("touchend", n), k.cancel(e);
			};
		}
	}, [h]), g.useEffect(() => (A(), () => {
		clearTimeout(O.current);
	}), [i]), g.useImperativeHandle(t, () => ({ delayHidden: A }));
	let V = `${n}-scrollbar`, H = {
		position: "absolute",
		visibility: E ? null : "hidden"
	}, U = {
		position: "absolute",
		borderRadius: 99,
		background: "var(--rc-virtual-list-scrollbar-bg, rgba(0, 0, 0, 0.5))",
		cursor: "pointer",
		userSelect: "none"
	};
	return l ? (Object.assign(H, {
		height: 8,
		left: 0,
		right: 0,
		bottom: 0
	}), Object.assign(U, {
		height: "100%",
		width: u,
		[C ? "left" : "right"]: N
	})) : (Object.assign(H, {
		width: 8,
		top: 0,
		bottom: 0,
		[C ? "right" : "left"]: 0
	}), Object.assign(U, {
		width: "100%",
		height: u,
		top: N
	})), /*#__PURE__*/ g.createElement("div", {
		ref: w,
		className: Z(V, {
			[`${V}-horizontal`]: l,
			[`${V}-vertical`]: !l,
			[`${V}-visible`]: E
		}),
		style: {
			...H,
			...f
		},
		onMouseDown: I,
		onMouseMove: A
	}, /*#__PURE__*/ g.createElement("div", {
		ref: T,
		className: Z(`${V}-thumb`, { [`${V}-thumb-moving`]: h }),
		style: {
			...U,
			...p
		},
		onMouseDown: R
	}));
}), Zh = 20;
function Qh(e = 0, t = 0) {
	let n = e / t * e;
	return isNaN(n) && (n = 0), n = Math.max(n, Zh), Math.floor(n);
}
// node_modules/@rc-component/virtual-list/es/List.js
function $h() {
	return $h = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, $h.apply(this, arguments);
}
var eg = [], tg = {
	overflowY: "auto",
	overflowAnchor: "none"
};
function ng(e, t) {
	let { prefixCls: n = "rc-virtual-list", className: r, height: i, itemHeight: a, fullHeight: o = !0, style: s, data: c, children: l, itemKey: u, virtual: d, direction: f, scrollWidth: p, component: m = "div", onScroll: h, onVirtualScroll: v, onVisibleChange: y, innerProps: x, extraRender: S, styles: C, showScrollBar: w = "optional", ...T } = e, E = g.useCallback((e) => typeof u == "function" ? u(e) : e?.[u], [u]), [D, O, k, A] = Rh(E, null, null), j = !!(d !== !1 && i && a), M = g.useMemo(() => Object.values(k.maps).reduce((e, t) => e + t, 0), [k.id, k.maps]), N = j && c && (Math.max(a * c.length, M) > i || !!p), P = f === "rtl", F = Z(n, { [`${n}-rtl`]: P }, r), I = c || eg, L = (0, g.useRef)(null), R = (0, g.useRef)(null), z = (0, g.useRef)(null), [B, V] = (0, g.useState)(0), [H, U] = (0, g.useState)(0), [W, ee] = (0, g.useState)(!1), te = () => {
		ee(!0);
	}, ne = () => {
		ee(!1);
	}, re = { getKey: E };
	function ie(e) {
		V((t) => {
			let n;
			n = typeof e == "function" ? e(t) : e;
			let r = ge(n);
			return L.current.scrollTop = r, r;
		});
	}
	let ae = (0, g.useRef)({
		start: 0,
		end: I.length
	}), G = (0, g.useRef)(void 0), [K] = jh(I, E);
	G.current = K;
	let { scrollHeight: oe, start: se, end: ce, offset: q } = g.useMemo(() => {
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
			u >= B && t === void 0 && (t = s, n = e), u > B + i && r === void 0 && (r = s), e = u;
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
		B,
		I,
		A,
		i
	]);
	ae.current.start = se, ae.current.end = ce, g.useLayoutEffect(() => {
		let e = k.getRecord();
		if (e.size === 1) {
			let t = Array.from(e.keys())[0], n = e.get(t), r = I[se];
			if (r && n === void 0 && E(r) === t) {
				let e = k.get(t) - a;
				ie((t) => t + e);
			}
		}
		k.resetRecord();
	}, [oe]);
	let [le, ue] = g.useState({
		width: 0,
		height: i
	}), de = (e) => {
		ue({
			width: e.offsetWidth,
			height: e.offsetHeight
		});
	}, fe = (0, g.useRef)(null), pe = (0, g.useRef)(null), me = g.useMemo(() => Qh(le.width, p), [le.width, p]), J = g.useMemo(() => Qh(le.height, oe), [le.height, oe]), Y = oe - i, he = (0, g.useRef)(Y);
	he.current = Y;
	function ge(e) {
		let t = e;
		return Number.isNaN(he.current) || (t = Math.min(t, he.current)), t = Math.max(t, 0), t;
	}
	let _e = B <= 0, ve = B >= Y, ye = H <= 0, be = H >= p, xe = Nh(_e, ve, ye, be), Se = () => ({
		x: P ? -H : H,
		y: B
	}), Ce = (0, g.useRef)(Se()), X = _((e) => {
		if (v) {
			let t = {
				...Se(),
				...e
			};
			(Ce.current.x !== t.x || Ce.current.y !== t.y) && (v(t), Ce.current = t);
		}
	});
	function we(e, t) {
		let n = e;
		t ? ((0, st.flushSync)(() => {
			U(n);
		}), X()) : ie(n);
	}
	function Te(e) {
		let { scrollTop: t } = e.currentTarget;
		t !== B && ie(t), h?.(e), X();
	}
	let Ee = (e) => {
		let t = e, n = p ? p - le.width : 0;
		return t = Math.max(t, 0), t = Math.min(t, n), t;
	}, De = _((e, t) => {
		t ? ((0, st.flushSync)(() => {
			U((t) => {
				let n = t + (P ? -e : e);
				return Ee(n);
			});
		}), X()) : ie((t) => t + e);
	}), [Oe, ke] = Ph(j, _e, ve, ye, be, !!p, De);
	Bh(j, L, (e, t, n, r) => {
		let i = r;
		return xe(e, t, n) ? !1 : !i || !i._virtualHandled ? (i && (i._virtualHandled = !0), Oe({
			preventDefault() {},
			deltaX: e ? t : 0,
			deltaY: e ? 0 : t
		}), !0) : !1;
	}), Wh(N, L, (e) => {
		ie((t) => t + e);
	}), Gh(N, L, i, a, (e) => {
		ie((t) => t + e);
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
			let e = Ee(H);
			U(e), X({ x: e });
		}
	}, [le.width, p]);
	let Ae = () => {
		fe.current?.delayHidden(), pe.current?.delayHidden();
	}, je = Fh(I, E, k, a), Me = Jh(L, I, k, a, E, je, () => O(!0), ie, Ae);
	g.useImperativeHandle(t, () => ({
		nativeElement: z.current,
		getScrollInfo: Se,
		scrollTo: (e) => {
			function t(e) {
				return e && typeof e == "object" && ("left" in e || "top" in e);
			}
			t(e) ? (e.left !== void 0 && U(Ee(e.left)), Me(e.top)) : Me(e);
		}
	})), b(() => {
		if (y) {
			let e = I.slice(se, ce + 1);
			y(e, I);
		}
	}, [
		se,
		ce,
		I
	]);
	let Ne = S?.({
		start: se,
		end: ce,
		virtual: N,
		offsetX: H,
		scrollTop: B,
		offsetY: q,
		rtl: P,
		getSize: je
	}), Pe = kh(I, se, ce, p, H, D, l, re), Fe = null;
	i && (Fe = {
		[o ? "height" : "maxHeight"]: i,
		...tg
	}, j && (Fe.overflowY = "hidden", p && (Fe.overflowX = "hidden"), W && (Fe.pointerEvents = "none")));
	let Ie = {};
	return P && (Ie.dir = "rtl"), /*#__PURE__*/ g.createElement("div", $h({
		ref: z,
		style: {
			...s,
			position: "relative"
		},
		className: F
	}, Ie, T), /*#__PURE__*/ g.createElement(Et, { onResize: de }, /*#__PURE__*/ g.createElement(m, {
		className: `${n}-holder`,
		style: Fe,
		ref: L,
		onScroll: Te,
		onMouseEnter: Ae
	}, /*#__PURE__*/ g.createElement(Dh, {
		prefixCls: n,
		height: oe,
		offsetX: H,
		offsetY: q,
		scrollWidth: p,
		onInnerResize: O,
		ref: R,
		innerProps: x,
		rtl: P,
		extra: Ne
	}, Pe))), N && oe > i && /*#__PURE__*/ g.createElement(Xh, {
		ref: fe,
		prefixCls: n,
		scrollOffset: B,
		scrollRange: oe,
		rtl: P,
		onScroll: we,
		onStartMove: te,
		onStopMove: ne,
		spinSize: J,
		containerSize: le.height,
		style: C?.verticalScrollBar,
		thumbStyle: C?.verticalScrollBarThumb,
		showScrollBar: w
	}), N && p > le.width && /*#__PURE__*/ g.createElement(Xh, {
		ref: pe,
		prefixCls: n,
		scrollOffset: H,
		scrollRange: p,
		rtl: P,
		onScroll: we,
		onStartMove: te,
		onStopMove: ne,
		spinSize: me,
		containerSize: le.width,
		horizontal: !0,
		style: C?.horizontalScrollBar,
		thumbStyle: C?.horizontalScrollBarThumb,
		showScrollBar: w
	}));
}
var rg = /*#__PURE__*/ g.forwardRef(ng);
rg.displayName = "List";
// node_modules/@rc-component/virtual-list/es/mock.js
var ig = /*#__PURE__*/ g.forwardRef((e, t) => ng({
	...e,
	virtual: !1
}, t));
ig.displayName = "List";
// node_modules/@rc-component/virtual-list/es/index.js
var ag = rg;
// node_modules/@rc-component/select/es/utils/platformUtil.js
/* istanbul ignore file */
function og() {
	return /(mac\sos|macintosh)/i.test(navigator.appVersion);
}
// node_modules/@rc-component/select/es/OptionList.js
function sg() {
	return sg = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, sg.apply(this, arguments);
}
function cg(e) {
	return typeof e == "string" || typeof e == "number";
}
var lg = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { prefixCls: n, id: r, open: i, multiple: a, mode: o, searchValue: s, toggleOpen: c, notFoundContent: l, onPopupScroll: u, showScrollBar: d, lockOptions: f } = bm(), { maxCount: p, flattenOptions: m, onActiveValue: h, defaultActiveFirstOption: _, onSelect: v, menuItemSelectedIcon: y, rawValues: b, fieldNames: x, virtual: S, direction: C, listHeight: w, listItemHeight: T, optionRender: E, classNames: D, styles: O } = g.useContext(Hm), k = `${n}-item`, A = F(() => m, [i, f], (e, t) => t[0] && !t[1]), j = g.useRef(null), M = g.useMemo(() => a && Om(p) && b?.size >= p, [
		a,
		p,
		b?.size
	]), N = (e) => {
		e.preventDefault();
	}, P = (e) => {
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
	}, [R, z] = g.useState(() => L(0)), B = (e, t = !1) => {
		z(e);
		let n = { source: t ? "keyboard" : "mouse" }, r = A[e];
		r ? h(r.value, e, n) : h(null, -1, n);
	};
	(0, g.useEffect)(() => {
		B(_ === !1 ? -1 : L(0));
	}, [A.length, s]);
	let V = g.useCallback((e) => o === "combobox" ? String(e).toLowerCase() === s.toLowerCase() : b.has(e), [
		o,
		s,
		[...b].toString(),
		b.size
	]);
	(0, g.useEffect)(() => {
		let e;
		if (!a && i && b.size === 1) {
			let t = Array.from(b)[0], n = A.findIndex(({ data: e }) => s ? String(e.value).startsWith(s) : e.value === t);
			n !== -1 && (B(n), e = setTimeout(() => {
				P(n);
			}));
		}
		return i && j.current?.scrollTo(void 0), () => clearTimeout(e);
	}, [i, s]);
	let H = (e) => {
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
					if (t === X.UP ? e = -1 : t === X.DOWN ? e = 1 : og() && n && (t === X.N ? e = 1 : t === X.P && (e = -1)), e !== 0) {
						let t = L(R + e, e);
						P(t), B(t, !0);
					}
					break;
				}
				case X.TAB:
				case X.ENTER: {
					let t = A[R];
					if (!t || t.data.disabled) return H(void 0);
					!M || b.has(t.value) ? H(t.value) : H(void 0), i && e.preventDefault();
					break;
				}
				case X.ESC: c(!1), i && e.stopPropagation();
			}
		},
		onKeyUp: () => {},
		scrollTo: (e) => {
			P(e);
		}
	})), A.length === 0) return /*#__PURE__*/ g.createElement("div", {
		role: "listbox",
		id: `${r}_list`,
		className: `${k}-empty`,
		onMouseDown: N
	}, l);
	let U = Object.keys(x).map((e) => x[e]), W = (e) => e.label;
	function ee(e, t) {
		let { group: n } = e;
		return {
			role: n ? "presentation" : "option",
			id: `${r}_list_${t}`
		};
	}
	let te = (e) => {
		let t = A[e];
		if (!t) return null;
		let n = t.data || {}, { value: r, disabled: i } = n, { group: a } = t, o = Ke(n, !0), s = W(t);
		return t ? /*#__PURE__*/ g.createElement("div", sg({ "aria-label": typeof s == "string" && !a ? s : null }, o, { key: e }, ee(t, e), {
			"aria-selected": V(r),
			"aria-disabled": i
		}), r) : null;
	}, ne = {
		role: "listbox",
		id: `${r}_list`
	};
	return /*#__PURE__*/ g.createElement(g.Fragment, null, S && /*#__PURE__*/ g.createElement("div", sg({}, ne, { style: {
		height: 0,
		width: 0,
		overflow: "hidden"
	} }), te(R - 1), te(R), te(R + 1)), /*#__PURE__*/ g.createElement(ag, {
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
		innerProps: S ? null : ne,
		showScrollBar: d,
		className: D?.popup?.list,
		style: O?.popup?.list
	}, (e, t) => {
		let { group: n, groupOption: r, data: i, label: a, value: o } = e, { key: s } = i;
		if (n) {
			let e = i.title ?? (cg(a) ? a.toString() : void 0);
			return /*#__PURE__*/ g.createElement("div", {
				className: Z(k, `${k}-group`, i.className),
				title: e
			}, a === void 0 ? s : a);
		}
		let { disabled: c, title: l, children: u, style: d, className: f, ...p } = i, m = Ve(p, U), h = I(o), _ = c || !h && M, v = `${k}-option`, b = Z(k, v, f, D?.popup?.listItem, {
			[`${v}-grouped`]: r,
			[`${v}-active`]: R === t && !_,
			[`${v}-disabled`]: _,
			[`${v}-selected`]: h
		}), x = W(e), C = !y || typeof y == "function" || h, w = typeof x == "number" ? x : x || o, T = cg(w) ? w.toString() : void 0;
		return l !== void 0 && (T = l), /*#__PURE__*/ g.createElement("div", sg({}, Ke(m), S ? {} : ee(e, t), {
			"aria-selected": S ? void 0 : V(o),
			"aria-disabled": _,
			className: b,
			title: T,
			onMouseMove: () => {
				R === t || _ || B(t);
			},
			onClick: () => {
				_ || H(o);
			},
			style: {
				...O?.popup?.listItem,
				...d
			}
		}), /*#__PURE__*/ g.createElement("div", { className: `${v}-content` }, typeof E == "function" ? E(e, { index: t }) : w), /*#__PURE__*/ g.isValidElement(y) || h, C && /*#__PURE__*/ g.createElement(uh, {
			className: `${k}-option-state`,
			customizeIcon: y,
			customizeIconProps: {
				value: o,
				disabled: _,
				isSelected: h
			}
		}, h ? "✓" : null));
	}));
}), ug = ((e, t) => {
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
function dg(e, t) {
	return Um(e).join("").toUpperCase().includes(t);
}
var fg = ((e, t, n, r, i) => g.useMemo(() => {
	if (!n || r === !1) return e;
	let { options: a, label: o, value: s } = t, c = [], l = typeof r == "function", u = n.toUpperCase(), d = l ? r : (e, t) => i && i.length ? i.some((e) => dg(t[e], u)) : t[a] ? dg(t[o === "children" ? "label" : o], u) : dg(t[s], u), f = l ? (e) => jm(e) : (e) => e;
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
function pg(e) {
	let { key: t, props: { children: n, value: r, ...i } } = e;
	return {
		key: t,
		value: r === void 0 ? t : r,
		children: n,
		...i
	};
}
function mg(e, t = !1) {
	return qe(e).map((e, n) => {
		if (!/*#__PURE__*/ g.isValidElement(e) || !e.type) return null;
		let { type: { isSelectOptGroup: r }, key: i, props: { children: a, ...o } } = e;
		return t || !r ? pg(e) : {
			key: `__RC_SELECT_GRP__${i === null ? n : i}__`,
			label: i,
			...o,
			options: mg(a)
		};
	}).filter((e) => e);
}
// node_modules/@rc-component/select/es/hooks/useOptions.js
var hg = (e, t, n, r, i) => g.useMemo(() => {
	let a = e;
	e || (a = mg(t));
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
function gg(e) {
	let t = g.useRef(e);
	return t.current = e, g.useCallback((...e) => t.current(...e), []);
}
// node_modules/@rc-component/select/es/hooks/useSearchConfig.js
function _g(e, t, n) {
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
function vg() {
	return vg = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, vg.apply(this, arguments);
}
var yg = ["inputValue"];
function bg(e) {
	return !e || typeof e != "object";
}
var xg = /* @__PURE__ */ g.forwardRef((e, t) => {
	let { id: n, mode: r, prefixCls: i = "rc-select", backfill: a, fieldNames: o, showSearch: s, searchValue: c, onSearch: l, autoClearSearchValue: u, filterOption: d, optionFilterProp: f, filterSort: p, onSelect: m, onDeselect: h, onActive: _, popupMatchSelectWidth: v = !0, optionLabelProp: y, options: b, optionRender: x, children: S, defaultActiveFirstOption: w, menuItemSelectedIcon: T, virtual: E, direction: D, listHeight: O = 200, listItemHeight: k = 20, labelRender: A, value: j, defaultValue: M, labelInValue: N, onChange: F, maxCount: I, classNames: L, styles: R, ...z } = e, [B, V] = _g(s, {
		searchValue: c,
		onSearch: l,
		autoClearSearchValue: u,
		filterOption: d,
		optionFilterProp: f,
		filterSort: p
	}, r), { filterOption: H, searchValue: U, optionFilterProp: W, filterSort: ee, onSearch: te, autoClearSearchValue: ne = !0 } = V, re = g.useMemo(() => W ? Array.isArray(W) ? W : [W] : [], [W]), ie = P(n), ae = Sh(r), G = !(b || !S), K = g.useMemo(() => H === void 0 && r === "combobox" ? !1 : H, [H, r]), oe = g.useMemo(() => km(o, G), [JSON.stringify(o), G]), [se, ce] = C("", U), q = se || "", le = hg(b, S, oe, re, y), { valueOptions: ue, labelOptions: de, options: fe } = le, pe = g.useCallback((e) => Um(e).map((e) => {
		let t, n, r, i;
		bg(e) ? t = e : (n = e.label, t = e.value);
		let a = ue.get(t);
		return a && (n === void 0 && (n = a?.[y || oe.label]), r = a?.disabled, i = a?.title), {
			label: n,
			value: t,
			key: t,
			disabled: r,
			title: i
		};
	}), [
		oe,
		y,
		ue
	]), [me, J] = C(M, j), [Y, he] = ug(g.useMemo(() => {
		let e = pe(ae && me === null ? [] : me);
		return r === "combobox" && Gm(e[0]?.value) ? [] : e;
	}, [
		me,
		pe,
		r,
		ae
	]), ue), ge = g.useMemo(() => {
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
			ce(Wm(e) ? String(e) : "");
		}
	}, [Y]);
	let ve = gg((e, t) => {
		let n = t ?? e;
		return {
			[oe.value]: e,
			[oe.label]: n
		};
	}), ye = fg(g.useMemo(() => {
		if (r !== "tags") return fe;
		let e = [...fe], t = (e) => ue.has(e);
		return [...Y].sort((e, t) => e.value < t.value ? -1 : 1).forEach((n) => {
			let r = n.value;
			t(r) || e.push(ve(r, n.label));
		}), e;
	}, [
		ve,
		fe,
		ue,
		Y,
		r
	]), oe, q, K, re), be = g.useMemo(() => {
		let e = (e) => re.length ? re.some((t) => e?.[t] === q) : e?.value === q;
		return r !== "tags" || !q || ye.some((t) => e(t)) || ye.some((e) => e[oe.value] === q) || ue.get(q)?.disabled ? ye : [ve(q), ...ye];
	}, [
		ve,
		re,
		r,
		ye,
		q,
		oe,
		ue
	]), xe = (e) => [...e].sort((e, t) => ee(e, t, { searchValue: q })).map((e) => Array.isArray(e.options) ? {
		...e,
		options: e.options.length > 0 ? xe(e.options) : e.options
	} : e), Se = g.useMemo(() => ee ? xe(be) : be, [
		be,
		ee,
		q
	]), Ce = g.useMemo(() => Am(Se, {
		fieldNames: oe,
		childrenAsData: G
	}), [
		Se,
		oe,
		G
	]), X = (e) => {
		let t = pe(e);
		if (J(t), F && (t.length !== Y.length || t.some((e, t) => Y[t]?.value !== e?.value))) {
			let e = N ? t.map(({ label: e, value: t }) => ({
				label: e,
				value: t
			})) : t.map((e) => e.value), n = t.map((e) => jm(he(e.value)));
			F(ae ? e : e[0], ae ? n : n[0]);
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
			return [N ? {
				label: t?.[oe.label],
				value: e
			} : e, jm(t)];
		};
		if (t && m) {
			let [e, t] = r();
			m(e, t);
		} else if (!t && h && n !== "clear") {
			let [e, t] = r();
			h(e, t);
		}
	}, Me = gg((e, t) => {
		let n, i = !ae || t.selected;
		n = i ? ae ? [...Y, e] : [e] : Y.filter((t) => t.value !== e), X(n), je(e, i), r === "combobox" ? Te("") : (!Sh || ne) && (ce(""), Te(""));
	}), Ne = (e, t) => {
		X(e);
		let { type: n, values: r } = t;
		(n === "remove" || n === "clear") && r.forEach((e) => {
			je(e.value, !1, n);
		});
	}, Pe = (e, t) => {
		if (ce(e), Te(null), t.source === "submit") {
			let t = (e || "").trim();
			if (t) {
				if (ue.get(t)?.disabled) {
					ce("");
					return;
				}
				let e = Array.from(/* @__PURE__ */ new Set([..._e, t]));
				X(e), je(t, !0), ce("");
			}
		} else t.source !== "blur" && (r === "combobox" && X(e), te?.(e));
	}, Fe = (e) => {
		let t = e;
		r !== "tags" && (t = e.map((e) => de.get(e)?.value).filter((e) => e !== void 0)), r === "tags" && (t = t.filter((e) => !ue.get(e)?.disabled));
		let n = Array.from(/* @__PURE__ */ new Set([..._e, ...t]));
		X(n), n.forEach((e) => {
			je(e, !0);
		});
	}, Ie = g.useMemo(() => {
		let e = E !== !1 && v !== !1;
		return {
			...le,
			flattenOptions: Ce,
			onActiveValue: Ae,
			defaultActiveFirstOption: Oe,
			onSelect: Me,
			menuItemSelectedIcon: T,
			rawValues: _e,
			fieldNames: oe,
			virtual: e,
			direction: D,
			listHeight: O,
			listItemHeight: k,
			childrenAsData: G,
			maxCount: I,
			optionRender: x,
			classNames: L,
			styles: R
		};
	}, [
		I,
		le,
		Ce,
		Ae,
		Oe,
		Me,
		T,
		_e,
		oe,
		E,
		v,
		D,
		O,
		k,
		G,
		x,
		L,
		R
	]);
	return /*#__PURE__*/ g.createElement(Hm.Provider, { value: Ie }, /*#__PURE__*/ g.createElement(Ch, vg({}, z, {
		id: ie,
		prefixCls: i,
		ref: t,
		omitDomProps: yg,
		mode: r,
		classNames: L,
		styles: R,
		displayValues: ge,
		onDisplayValuesChange: Ne,
		maxCount: I,
		direction: D,
		showSearch: B,
		searchValue: q,
		onSearch: Pe,
		autoClearSearchValue: ne,
		onSearchSplit: Fe,
		popupMatchSelectWidth: v,
		OptionList: lg,
		emptyOptions: !Ce.length,
		activeValue: we,
		activeDescendantId: `${ie}_list_${Ee}`
	})));
});
xg.Option = Th, xg.OptGroup = wh;
// node_modules/@rc-component/select/es/index.js
var Sg = xg, Cg = (e, t, n) => e === !1 ? null : e === !0 ? n : e && t && e[t] !== void 0 ? e[t] : n, wg = (e, t, n) => Z({
	[`${e}-status-success`]: t === "success",
	[`${e}-status-warning`]: t === "warning",
	[`${e}-status-error`]: t === "error",
	[`${e}-status-validating`]: t === "validating",
	[`${e}-has-feedback`]: n
}), Tg = (e, t) => t || e, Eg = (e, t) => e?.startsWith("var(") || t?.startsWith("var(") ? e : new $i(e).onBackground(t).toHexString(), Dg = () => {
	let [, e] = so(), [t] = Vc("Empty"), { colorBgContainer: n, colorFill: r, colorFillSecondary: i, colorFillTertiary: a, colorTextQuaternary: o } = e, { panelBgColor: s, borderColor: c, detailColor: l, shadowColor: u, iconColor: d } = (0, g.useMemo)(() => ({
		panelBgColor: Eg(a, n),
		borderColor: Eg(o, n),
		detailColor: Eg(r, n),
		shadowColor: Eg(i, n),
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
}, Og = () => {
	let [, e] = so(), [t] = Vc("Empty"), { colorFill: n, colorFillTertiary: r, colorFillQuaternary: i, colorBgContainer: a } = e, { borderColor: o, shadowColor: s, contentColor: c } = (0, g.useMemo)(() => ({
		borderColor: Eg(n, a),
		shadowColor: Eg(r, a),
		contentColor: Eg(i, a)
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
}, kg = (e) => {
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
}, Ag = yo("Empty", (e) => {
	let { componentCls: t, controlHeightLG: n, calc: r } = e;
	return kg(ji(e, {
		emptyImgCls: `${t}-img`,
		emptyImgHeight: r(n).mul(2.5).equal(),
		emptyImgHeightMD: n,
		emptyImgHeightSM: r(n).mul(.875).equal()
	}));
}), jg = /*#__PURE__*/ g.createElement(Dg, null), Mg = /*#__PURE__*/ g.createElement(Og, null), Ng = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { className: n, rootClassName: r, prefixCls: i, image: a, description: o, children: s, imageStyle: c, style: l, classNames: u, styles: d, ...f } = e, { getPrefixCls: p, direction: m, className: h, style: _, classNames: v, styles: y, image: b } = zt("empty"), x = p("empty", i), [S, C] = Ag(x), w = mc(_), T = mc(l), [E, D] = gc([v, u], [
		y,
		w,
		d,
		T
	], { props: e }), [O] = Vc("Empty"), k = o === void 0 ? O?.description : o, A = typeof k == "string" ? k : "empty", j = a ?? b ?? jg, M = null;
	M = typeof j == "string" ? /*#__PURE__*/ g.createElement("img", {
		draggable: !1,
		alt: A,
		src: j
	}) : j;
	let N = g.useRef(null);
	return g.useImperativeHandle(t, () => ({ nativeElement: N.current })), /*#__PURE__*/ g.createElement("div", {
		ref: N,
		className: Z(S, C, x, h, {
			[`${x}-normal`]: j === Mg,
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
	}, M), Le(k) && /*#__PURE__*/ g.createElement("div", {
		className: Z(`${x}-description`, E.description),
		style: D.description
	}, k), Le(s) && /*#__PURE__*/ g.createElement("div", {
		className: Z(`${x}-footer`, E.footer),
		style: D.footer
	}, s));
});
Ng.PRESENTED_IMAGE_DEFAULT = jg, Ng.PRESENTED_IMAGE_SIMPLE = Mg;
// node_modules/antd/es/config-provider/defaultRenderEmpty.js
var Pg = (e) => {
	let { componentName: t } = e, { getPrefixCls: n } = (0, g.useContext)(It), r = n("empty");
	switch (t) {
		case "Table":
		case "List": return /*#__PURE__*/ g.createElement(Ng, { image: Ng.PRESENTED_IMAGE_SIMPLE });
		case "Select":
		case "TreeSelect":
		case "Cascader":
		case "Transfer":
		case "Mentions": return /*#__PURE__*/ g.createElement(Ng, {
			image: Ng.PRESENTED_IMAGE_SIMPLE,
			className: `${r}-small`
		});
		case "Table.filter": return null;
		default: return /*#__PURE__*/ g.createElement(Ng, null);
	}
}, Fg = (e, t, n, r) => {
	let i = g.useContext(It), { variant: a, [e]: o } = i, s = g.useContext(Rp), c = r ? i[r] : void 0, l = o?.variant ?? c?.variant, u = t !== void 0 || n === !1 || s !== void 0 || l !== void 0 || a !== void 0, d;
	d = t === void 0 ? n === !1 ? "borderless" : s ?? l ?? a ?? "outlined" : t;
	let f = Ft.includes(d);
	return [
		d,
		f,
		u
	];
}, Ig = (e) => {
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
function Lg(e, t) {
	return e || Ig(t);
}
// node_modules/antd/es/select/style/dropdown.js
var Rg = (e) => {
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
}, zg = (e) => {
	let { antCls: t, componentCls: n } = e, r = `${n}-item`, i = `&${t}-slide-up-enter${t}-slide-up-enter-active`, a = `&${t}-slide-up-appear${t}-slide-up-appear-active`, o = `&${t}-slide-up-leave${t}-slide-up-leave-active`, s = `${n}-dropdown-placement-`, c = `${r}-option-selected`;
	return [
		{ [`${n}-dropdown`]: {
			...lo(e),
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
        `]: { animationName: ud },
			[`
          ${i}${s}topLeft,
          ${a}${s}topLeft,
          ${i}${s}topRight,
          ${a}${s}topRight
        `]: { animationName: fd },
			[`${o}${s}bottomLeft`]: { animationName: dd },
			[`
          ${o}${s}topLeft,
          ${o}${s}topRight
        `]: { animationName: pd },
			"&-hidden": { display: "none" },
			[`${n}-dropdown-list-scrollbar`]: {
				cursor: "pointer",
				"&:hover": { backgroundColor: e.colorFillQuaternary }
			},
			[r]: {
				...Rg(e),
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
						...co
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
					...Rg(e),
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
		yd(e, "slide-up"),
		yd(e, "slide-down"),
		ld(e, "move-up"),
		ld(e, "move-down")
	];
}, Bg = (e) => {
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
}, Vg = 4, Hg = (e) => {
	let { componentCls: t, calc: n, iconCls: r, paddingXS: i, paddingXXS: a, INTERNAL_FIXED_ITEM_MARGIN: o, lineWidth: s, lineType: c, colorIcon: l, colorIconHover: u, inputPaddingHorizontalBase: d, antCls: f } = e, [p, m] = So(f, "select");
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
				maxWidth: `calc(100% - ${Vg}px)`
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
					...co,
					marginInlineEnd: a
				},
				"&-remove": {
					...uo(),
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
				minWidth: Vg,
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
}, Ug = (e, t) => {
	let { componentCls: n, antCls: r } = e, [i] = So(r, "select"), { border: a, borderHover: o, borderActive: s, borderOutline: c } = t, l = t.background || e.selectorBg || e.colorBgContainer;
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
				boxShadow: `0 0 0 ${Q(e.controlOutlineWidth)} ${c}`
			}
		},
		[`&${n}-disabled`]: {
			[i("border-color")]: t.borderDisabled || t.border,
			[i("background-color")]: t.backgroundDisabled || t.background
		}
	};
}, Wg = (e, t, n, r, i, a) => {
	let { componentCls: o } = e;
	return { [`&${o}-${t}`]: [
		Ug(e, n),
		{
			[`&${o}-status-error`]: Ug(e, {
				...n,
				...r
			}),
			[`&${o}-status-warning`]: Ug(e, {
				...n,
				...i
			})
		},
		a
	] };
}, Gg = (e, t) => ({
	outline: `${Q(e.lineWidthFocus)} ${e.lineType} ${t}`,
	outlineOffset: Q(e.calc(e.lineWidth).mul(-1).equal()),
	transition: ["outline-offset", "outline"].map((e) => `${e} 0s`).join(", ")
}), Kg = (e) => {
	let { componentCls: t, fontHeight: n, controlHeight: r, fontSizeIcon: i, showArrowPaddingInlineEnd: a, iconCls: o, antCls: s, max: c, calc: l } = e, [u, d] = So(s, "select"), f = c(l(a).sub(i).equal(), 0);
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
			...lo(e),
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
				...co,
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
				...co,
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
		Hg(e),
		Wg(e, "outlined", {
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
		Wg(e, "filled", {
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
		Wg(e, "borderless", {
			border: "transparent",
			borderHover: "transparent",
			borderActive: "transparent",
			borderOutline: "transparent",
			background: "transparent"
		}, {}, {}, {
			[`&:not(${t}-disabled):has(input:focus-visible), &:not(${t}-disabled):has(textarea:focus-visible)`]: Gg(e, e.activeBorderColor),
			[`&${t}-status-error:not(${t}-disabled):has(input:focus-visible), &${t}-status-error:not(${t}-disabled):has(textarea:focus-visible)`]: Gg(e, e.colorError),
			[`&${t}-status-warning:not(${t}-disabled):has(input:focus-visible), &${t}-status-warning:not(${t}-disabled):has(textarea:focus-visible)`]: Gg(e, e.colorWarning)
		}),
		Wg(e, "underlined", {
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
		Bg(e)
	] };
}, qg = (e) => {
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
}, Jg = (e) => {
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
			...lo(e),
			[`${n}-selection-item`]: {
				flex: 1,
				fontWeight: 400,
				position: "relative",
				userSelect: "none",
				...co,
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
}, Yg = (e) => {
	let { componentCls: t } = e;
	return [
		{ [t]: { [`&${t}-in-form-item`]: { width: "100%" } } },
		Jg(e),
		zg(e),
		{ [`${t}-rtl`]: { direction: "rtl" } },
		Wd(e, { focusElCls: `${t}-focused` })
	];
}, Xg = yo("Select", (e, { rootPrefixCls: t }) => {
	let n = ji(e, {
		rootPrefixCls: t,
		inputPaddingHorizontalBase: e.calc(e.paddingSM).sub(e.lineWidth).equal(),
		multipleSelectItemHeight: e.multipleItemHeight,
		selectHeight: e.controlHeight
	});
	return [Yg(n), Kg(n)];
}, qg, { unitless: {
	optionLineHeight: !0,
	optionSelectedFontWeight: !0
} }), Zg = {
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
function Qg() {
	return Qg = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Qg.apply(this, arguments);
}
var $g = /*#__PURE__*/ g.forwardRef((e, t) => /*#__PURE__*/ g.createElement(es, Qg({}, e, {
	ref: t,
	icon: Zg
}))), e_ = {
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
function t_() {
	return t_ = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, t_.apply(this, arguments);
}
var n_ = /*#__PURE__*/ g.forwardRef((e, t) => /*#__PURE__*/ g.createElement(es, t_({}, e, {
	ref: t,
	icon: e_
}))), r_ = {
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
function i_() {
	return i_ = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, i_.apply(this, arguments);
}
var a_ = /*#__PURE__*/ g.forwardRef((e, t) => /*#__PURE__*/ g.createElement(es, i_({}, e, {
	ref: t,
	icon: r_
})));
// node_modules/antd/es/select/useIcons.js
function o_({ suffixIcon: e, contextSuffixIcon: t, clearIcon: n, contextClearIcon: r, menuItemSelectedIcon: i, contextMenuItemSelectedIcon: a, removeIcon: o, contextRemoveIcon: s, loading: c, loadingIcon: l, contextLoadingIcon: u, searchIcon: d, contextSearchIcon: f, multiple: p, hasFeedback: m, showSuffixIcon: h, feedbackIcon: _, showArrow: v, componentName: y }) {
	return g.useMemo(() => {
		let y = pu(n, r, /*#__PURE__*/ g.createElement(as, null)), b = (t) => e === null && !m && !v ? null : /*#__PURE__*/ g.createElement(g.Fragment, null, h !== !1 && t, m && _), x = null;
		x = e === void 0 ? c ? b(pu(l, u, /*#__PURE__*/ g.createElement(fu, { spin: !0 }))) : ({ open: e, showSearch: n }) => b(e && n ? pu(d, f, /*#__PURE__*/ g.createElement(a_, null)) : pu(t, /*#__PURE__*/ g.createElement(n_, null))) : b(e);
		let S = pu(i, a, p ? /*#__PURE__*/ g.createElement($g, null) : null), C = pu(o, s, /*#__PURE__*/ g.createElement(cs, null));
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
function s_(e) {
	return g.useMemo(() => {
		if (e) return (...t) => /*#__PURE__*/ g.createElement(zp, {
			space: !0,
			form: !0
		}, e.apply(void 0, t));
	}, [e]);
}
// node_modules/antd/es/select/useShowArrow.js
function c_(e, t) {
	return t === void 0 ? e !== null : t;
}
// node_modules/antd/es/select/index.js
var l_ = "SECRET_COMBOBOX_MODE_DO_NOT_USE", u_ = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { prefixCls: n, bordered: r, className: i, rootClassName: a, getPopupContainer: o, popupClassName: s, dropdownClassName: c, listHeight: l = 256, placement: u, listItemHeight: d, size: f, disabled: p, notFoundContent: m, status: h, builtinPlacements: _, dropdownMatchSelectWidth: v, popupMatchSelectWidth: y, direction: b, style: x, allowClear: S, variant: C, popupStyle: w, dropdownStyle: T, transitionName: E, tagRender: D, maxCount: O, prefix: k, dropdownRender: A, popupRender: j, onDropdownVisibleChange: M, onOpenChange: N, styles: P, classNames: F, clearIcon: I, showSearch: L, ...R } = e, { getPopupContainer: z, getPrefixCls: B, renderEmpty: V, direction: H, virtual: U, popupMatchSelectWidth: W, popupOverflow: ee } = g.useContext(It), { showSearch: te, allowClear: ne, style: re, styles: ie, className: ae, classNames: G, clearIcon: K, loadingIcon: oe, menuItemSelectedIcon: se, removeIcon: ce, suffixIcon: q } = zt("select"), [, le] = so(), ue = d ?? le?.controlHeight, de = B("select", n), fe = B(), pe = b ?? H, { compactSize: me, compactItemClassnames: J } = Bu(de, pe), [Y, he] = Fg("select", C, r), ge = Oc(de), [_e, ve] = Xg(de, ge), ye = g.useMemo(() => {
		let { mode: t } = e;
		if (t !== "combobox") return t === l_ ? "combobox" : t;
	}, [e.mode]), be = ye === "multiple" || ye === "tags", xe = c_(e.suffixIcon, e.showArrow), Se = y ?? v ?? W, Ce = s_(j || A), X = N || M, { status: we, hasFeedback: Te, isFormItemInput: Ee, feedbackIcon: De } = g.useContext(Ip), Oe = Tg(we, h), ke;
	ke = m === void 0 ? ye === "combobox" ? null : V?.("Select") || /*#__PURE__*/ g.createElement(Pg, { componentName: "Select" }) : m;
	let { suffixIcon: Ae, itemIcon: je, removeIcon: Me, clearIcon: Ne } = o_({
		...R,
		multiple: be,
		hasFeedback: Te,
		feedbackIcon: De,
		showSuffixIcon: xe,
		prefixCls: de,
		componentName: "Select",
		clearIcon: I,
		searchIcon: Cg(L, "searchIcon"),
		contextClearIcon: K,
		contextLoadingIcon: oe,
		contextMenuItemSelectedIcon: se,
		contextRemoveIcon: ce,
		contextSearchIcon: Cg(te, "searchIcon"),
		contextSuffixIcon: q
	}), Pe = S ?? ne, Fe = Pe === !0 ? { clearIcon: Ne } : Pe, Ie = L ?? te, Le = Ve(R, ["suffixIcon", "itemIcon"]), Re = Ru((e) => f ?? me ?? e), ze = g.useContext(Xl), Be = p ?? ze, He = {
		...e,
		variant: Y,
		status: Oe,
		disabled: Be,
		size: Re
	}, Ue = mc(re), We = mc(x), [Ge, Ke] = gc([G, F], [
		ie,
		Ue,
		P,
		We
	], { props: He }, { popup: { _default: "root" } }), qe = Z(Ge.popup.root, s, c, { [`${de}-dropdown-${pe}`]: pe === "rtl" }, a, ve, ge, _e), Je = {
		...Ke.popup?.root,
		...w ?? T
	}, Ye = Z({
		[`${de}-lg`]: Re === "large",
		[`${de}-sm`]: Re === "small",
		[`${de}-rtl`]: pe === "rtl",
		[`${de}-${Y}`]: he,
		[`${de}-in-form-item`]: Ee
	}, wg(de, Oe, Te), J, ae, i, Ge.root, a, ve, ge, _e), Xe = g.useMemo(() => u === void 0 ? pe === "rtl" ? "bottomRight" : "bottomLeft" : u, [u, pe]), [Ze] = Eu("SelectLike", Ke.popup.root?.zIndex ?? Je.zIndex);
	return /*#__PURE__*/ g.createElement(Sg, {
		ref: t,
		virtual: U,
		classNames: Ge,
		styles: Ke,
		showSearch: Ie,
		...Le,
		style: Ke.root,
		popupMatchSelectWidth: Se,
		transitionName: Du(fe, "slide-up", E),
		builtinPlacements: Lg(_, ee),
		listHeight: l,
		listItemHeight: ue,
		mode: ye,
		prefixCls: de,
		placement: Xe,
		direction: pe,
		prefix: k,
		suffixIcon: Ae,
		menuItemSelectedIcon: je,
		removeIcon: Me,
		allowClear: Fe,
		notFoundContent: ke,
		className: Ye,
		getPopupContainer: o || z,
		popupClassName: qe,
		disabled: Be,
		popupStyle: {
			...Ke.popup.root,
			...Je,
			zIndex: Ze
		},
		maxCount: be ? O : void 0,
		tagRender: be ? D : void 0,
		popupRender: Ce,
		onPopupVisibleChange: X
	});
}), d_ = _m(u_, "popupAlign");
u_.SECRET_COMBOBOX_MODE_DO_NOT_USE = l_, u_.Option = Th, u_.OptGroup = wh, u_._InternalPanelDoNotUseOrYouWillBeFired = d_;
// node_modules/antd/es/_util/colors.js
var f_ = Hi.map((e) => `${e}-inverse`), p_ = [
	"success",
	"processing",
	"error",
	"default",
	"warning"
];
function m_(e, t = !0) {
	return t ? [].concat(Nt(f_), Nt(Hi)).includes(e) : Hi.includes(e);
}
function h_(e) {
	return p_.includes(e);
}
// node_modules/@rc-component/dropdown/es/hooks/useAccessibility.js
var { ESC: g_, TAB: __ } = X;
function v_({ visible: e, triggerRef: t, onVisibleChange: n, autoFocus: r, overlayRef: i }) {
	let a = g.useRef(!1), o = () => {
		e && (t.current?.focus?.(), n?.(!1));
	}, s = () => i.current?.focus ? (i.current.focus(), a.current = !0, !0) : !1, c = (e) => {
		switch (e.keyCode) {
			case g_:
				o();
				break;
			case __: {
				let t = !1;
				a.current || (t = s()), t ? e.preventDefault() : o();
				break;
			}
		}
	};
	g.useEffect(() => e ? (window.addEventListener("keydown", c), r && k(s, 3), () => {
		window.removeEventListener("keydown", c), a.current = !1;
	}) : () => {
		a.current = !1;
	}, [e]);
}
// node_modules/@rc-component/dropdown/es/Overlay.js
var y_ = /*#__PURE__*/ (0, g.forwardRef)((e, t) => {
	let { overlay: n, arrow: r, prefixCls: i } = e, a = (0, g.useMemo)(() => {
		let e;
		return e = typeof n == "function" ? n() : n, e;
	}, [n]), o = te(t, G(a));
	return /*#__PURE__*/ g.createElement(g.Fragment, null, r && /*#__PURE__*/ g.createElement("div", { className: `${i}-arrow` }), /*#__PURE__*/ g.cloneElement(a, { ref: re(a) ? o : void 0 }));
}), b_ = {
	adjustX: 1,
	adjustY: 1
}, x_ = [0, 0], S_ = {
	topLeft: {
		points: ["bl", "tl"],
		overflow: b_,
		offset: [0, -4],
		targetOffset: x_
	},
	top: {
		points: ["bc", "tc"],
		overflow: b_,
		offset: [0, -4],
		targetOffset: x_
	},
	topRight: {
		points: ["br", "tr"],
		overflow: b_,
		offset: [0, -4],
		targetOffset: x_
	},
	bottomLeft: {
		points: ["tl", "bl"],
		overflow: b_,
		offset: [0, 4],
		targetOffset: x_
	},
	bottom: {
		points: ["tc", "bc"],
		overflow: b_,
		offset: [0, 4],
		targetOffset: x_
	},
	bottomRight: {
		points: ["tr", "br"],
		overflow: b_,
		offset: [0, 4],
		targetOffset: x_
	}
};
// node_modules/@rc-component/dropdown/es/Dropdown.js
function C_() {
	return C_ = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, C_.apply(this, arguments);
}
// node_modules/@rc-component/dropdown/es/index.js
var w_ = /* @__PURE__ */ g.forwardRef((e, t) => {
	let { arrow: n = !1, prefixCls: r = "rc-dropdown", transitionName: i, animation: a, align: o, placement: s = "bottomLeft", placements: c = S_, getPopupContainer: l, showAction: u, hideAction: d, overlayClassName: f, overlayStyle: p, visible: m, trigger: h = ["hover"], autoFocus: _, overlay: v, children: y, onVisibleChange: b, disabled: x, ...S } = e, [C, w] = g.useState(), T = "visible" in e ? m : C, E = a ? `${r}-${a}` : i, D = g.useRef(null), O = g.useRef(null), k = g.useRef(null);
	g.useImperativeHandle(t, () => D.current);
	let A = (e) => {
		w(e), b?.(e);
	};
	v_({
		visible: T,
		triggerRef: k,
		onVisibleChange: A,
		autoFocus: _,
		overlayRef: O
	});
	let j = (t) => {
		let { onOverlayClick: n } = e;
		w(!1), n && n(t);
	}, M = () => /*#__PURE__*/ g.createElement(y_, {
		ref: O,
		overlay: v,
		prefixCls: r,
		arrow: n
	}), N = () => typeof v == "function" ? M : M(), P = () => {
		let { minOverlayWidthMatchTrigger: t, alignPoint: n } = e;
		return "minOverlayWidthMatchTrigger" in e ? t : !n;
	}, F = () => {
		let { openClassName: t } = e;
		return t === void 0 ? `${r}-open` : t;
	}, I = y, L = Z(I.props?.className, T && F()), R = {
		className: L,
		ref: te(k, G(I))
	}, z = re(I) ? /*#__PURE__*/ g.cloneElement(I, R) : /*#__PURE__*/ g.createElement("span", {
		className: L,
		ref: k
	}, /*#__PURE__*/ g.cloneElement(I, { className: L })), B = d;
	return !B && h.indexOf("contextMenu") !== -1 && (B = ["click"]), /*#__PURE__*/ g.createElement(Hl, C_({ builtinPlacements: c }, S, {
		prefixCls: r,
		ref: D,
		popupClassName: Z(f, { [`${r}-show-arrow`]: n }),
		popupStyle: p,
		action: h,
		showAction: u,
		hideAction: B,
		popupPlacement: s,
		popupAlign: o,
		popupMotion: { motionName: E },
		popupVisible: T,
		stretch: P() ? "minWidth" : "",
		popup: N(),
		onOpenChange: A,
		onPopupClick: j,
		getPopupContainer: l
	}), z);
}), T_ = /*#__PURE__*/ g.createContext(null);
function E_(e, t) {
	return `${e}-${t}`;
}
function D_(e) {
	return E_(g.useContext(T_), e);
}
// node_modules/@rc-component/menu/es/context/MenuContext.js
var O_ = /*#__PURE__*/ g.createContext(null);
function k_(e, t) {
	let n = { ...e };
	return Object.keys(t).forEach((e) => {
		let r = t[e];
		r !== void 0 && (n[e] = r);
	}), n;
}
function A_({ children: e, locked: t, ...n }) {
	let r = g.useContext(O_), i = F(() => k_(r, n), [r, n], (e, n) => !t && (e[0] !== n[0] || !Fe(e[1], n[1], !0)));
	return /*#__PURE__*/ g.createElement(O_.Provider, { value: i }, e);
}
// node_modules/@rc-component/menu/es/context/PathContext.js
var j_ = [], M_ = /*#__PURE__*/ g.createContext(null);
function N_() {
	return g.useContext(M_);
}
var P_ = /*#__PURE__*/ g.createContext(j_);
function F_(e) {
	let t = g.useContext(P_);
	return g.useMemo(() => e === void 0 ? t : [...t, e], [t, e]);
}
var I_ = /*#__PURE__*/ g.createContext(null), L_ = /*#__PURE__*/ g.createContext({}), { LEFT: R_, RIGHT: z_, UP: B_, DOWN: V_, ENTER: H_, ESC: U_, HOME: W_, END: G_ } = X, K_ = [
	B_,
	V_,
	R_,
	z_
];
function q_(e, t, n, r) {
	let i = "prev", a = "next", o = "children", s = "parent";
	if (e === "inline" && r === H_) return { inlineTrigger: !0 };
	let c = {
		[B_]: i,
		[V_]: a
	}, l = {
		[R_]: n ? a : i,
		[z_]: n ? i : a,
		[V_]: o,
		[H_]: o
	}, u = {
		[B_]: i,
		[V_]: a,
		[H_]: o,
		[U_]: s,
		[R_]: n ? o : s,
		[z_]: n ? s : o
	};
	switch ({
		inline: c,
		horizontal: l,
		vertical: u,
		inlineSub: c,
		horizontalSub: u,
		verticalSub: u
	}[`${e}${t ? "" : "Sub"}`]?.[r]) {
		case i: return {
			offset: -1,
			sibling: !0
		};
		case a: return {
			offset: 1,
			sibling: !0
		};
		case s: return {
			offset: -1,
			sibling: !1
		};
		case o: return {
			offset: 1,
			sibling: !1
		};
		default: return null;
	}
}
function J_(e) {
	let t = e;
	for (; t;) {
		if (t.getAttribute("data-menu-list")) return t;
		t = t.parentElement;
	}
	/* istanbul ignore next */
	return null;
}
function Y_(e, t) {
	let n = e || document.activeElement;
	for (; n;) {
		if (t.has(n)) return n;
		n = n.parentElement;
	}
	return null;
}
function X_(e, t) {
	return be(e, !0).filter((e) => t.has(e));
}
function Z_(e, t, n, r = 1) {
	if (!e) return null;
	let i = X_(e, t), a = i.length, o = i.findIndex((e) => n === e);
	return r < 0 ? o === -1 ? o = a - 1 : --o : r > 0 && (o += 1), o = (o + a) % a, i[o];
}
var Q_ = (e, t) => {
	let n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
	return e.forEach((e) => {
		let a = document.querySelector(`[data-menu-id='${E_(t, e)}']`);
		a && (n.add(a), i.set(a, e), r.set(e, a));
	}), {
		elements: n,
		key2element: r,
		element2key: i
	};
};
function $_(e, t, n, r, i, a, o, s, c, l) {
	let u = g.useRef(void 0), d = g.useRef(void 0);
	d.current = t;
	let f = () => {
		k.cancel(u.current);
	};
	return g.useEffect(() => () => {
		f();
	}, []), (p) => {
		let { which: m } = p;
		if ([
			...K_,
			H_,
			U_,
			W_,
			G_
		].includes(m)) {
			let l = a(), h = Q_(l, r), { elements: g, key2element: _, element2key: v } = h, y = Y_(_.get(t), g), b = v.get(y), x = q_(e, o(b, !0).length === 1, n, m);
			if (!x && m !== W_ && m !== G_) return;
			(K_.includes(m) || [W_, G_].includes(m)) && p.preventDefault();
			let S = (e) => {
				if (e) {
					let t = e, n = e.querySelector("a");
					n?.getAttribute("href") && (t = n);
					let r = v.get(e);
					s(r), f(), u.current = k(() => {
						d.current === r && t.focus();
					});
				}
			};
			if ([W_, G_].includes(m) || x.sibling || !y) {
				let t;
				t = !y || e === "inline" ? i.current : J_(y);
				let n, r = X_(t, g);
				n = m === W_ ? r[0] : m === G_ ? r[r.length - 1] : Z_(t, g, y, x.offset), S(n);
			} else if (x.inlineTrigger) c(b);
			else if (x.offset > 0) c(b, !0), f(), u.current = k(() => {
				h = Q_(l, r);
				let e = y.getAttribute("aria-controls"), t = Z_(document.getElementById(e), h.elements);
				S(t);
			}, 5);
			else if (x.offset < 0) {
				let e = o(b, !0), t = e[e.length - 2], n = _.get(t);
				c(t, !1), S(n);
			}
		}
		l?.(p);
	};
}
// node_modules/@rc-component/menu/es/utils/timeUtil.js
function ev(e) {
	/* istanbul ignore next */
	Promise.resolve().then(e);
}
// node_modules/@rc-component/menu/es/hooks/useKeyRecords.js
var tv = "__RC_UTIL_PATH_SPLIT__", nv = (e) => e.join(tv), rv = (e) => e.split(tv), iv = "rc-menu-more";
function av() {
	let [, e] = g.useState({}), t = (0, g.useRef)(/* @__PURE__ */ new Map()), n = (0, g.useRef)(/* @__PURE__ */ new Map()), [r, i] = g.useState([]), a = (0, g.useRef)(0), o = (0, g.useRef)(!1), s = () => {
		o.current || e({});
	}, c = (0, g.useCallback)((e, r) => {
		let i = nv(r);
		n.current.set(i, e), t.current.set(e, i), a.current += 1;
		let o = a.current;
		ev(() => {
			o === a.current && s();
		});
	}, []), l = (0, g.useCallback)((e, r) => {
		let i = nv(r);
		n.current.delete(i), t.current.delete(e);
	}, []), u = (0, g.useCallback)((e) => {
		i(e);
	}, []), d = (0, g.useCallback)((e, n) => {
		let i = rv(t.current.get(e) || "");
		return n && r.includes(i[0]) && i.unshift(iv), i;
	}, [r]), f = (0, g.useCallback)((e, t) => e.filter((e) => e !== void 0).some((e) => d(e, !0).includes(t)), [d]), p = () => {
		let e = [...t.current.keys()];
		return r.length && e.push(iv), e;
	}, m = (0, g.useCallback)((e) => {
		let r = `${t.current.get(e)}${tv}`, i = /* @__PURE__ */ new Set();
		return [...n.current.keys()].forEach((e) => {
			e.startsWith(r) && i.add(n.current.get(e));
		}), i;
	}, []);
	return g.useEffect(() => () => {
		o.current = !0;
	}, []), {
		registerPath: c,
		unregisterPath: l,
		refreshOverflowKeys: u,
		isSubPathKey: f,
		getKeyPath: d,
		getKeys: p,
		getSubPathKeys: m
	};
}
// node_modules/@rc-component/menu/es/hooks/useMemoCallback.js
function ov(e) {
	let t = g.useRef(e);
	t.current = e;
	let n = g.useCallback((...e) => t.current?.(...e), []);
	return e ? n : void 0;
}
// node_modules/@rc-component/menu/es/hooks/useActive.js
function sv(e, t, n, r) {
	let { activeKey: i, onActive: a, onInactive: o } = g.useContext(O_), s = { active: i === e };
	return t || (s.onMouseEnter = (t) => {
		n?.({
			key: e,
			domEvent: t
		}), a(e);
	}, s.onMouseLeave = (t) => {
		r?.({
			key: e,
			domEvent: t
		}), o(e);
	}), s;
}
// node_modules/@rc-component/menu/es/hooks/useDirectionStyle.js
function cv(e) {
	let { mode: t, rtl: n, inlineIndent: r } = g.useContext(O_);
	if (t !== "inline") return null;
	let i = e;
	return n ? { paddingRight: i * r } : { paddingLeft: i * r };
}
// node_modules/@rc-component/menu/es/Icon.js
function lv({ icon: e, props: t, children: n }) {
	let r;
	return e === null || e === !1 ? null : (typeof e == "function" ? r = /*#__PURE__*/ g.createElement(e, { ...t }) : typeof e != "boolean" && (r = e), r || n || null);
}
// node_modules/@rc-component/menu/es/utils/warnUtil.js
function uv({ item: e, ...t }) {
	return Object.defineProperty(t, "item", { get: () => (Ne(!1, "`info.item` is deprecated since we will move to function component that not provides React Node instance in future."), e) }), t;
}
// node_modules/@rc-component/menu/es/MenuItem.js
function dv() {
	return dv = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, dv.apply(this, arguments);
}
var fv = class extends g.Component {
	render() {
		let { title: e, attribute: t, elementRef: n, ...r } = this.props, i = Ve(r, [
			"eventKey",
			"popupClassName",
			"popupOffset",
			"onTitleClick"
		]);
		return Ne(!t, "`attribute` of Menu.Item is deprecated. Please pass attribute directly."), /*#__PURE__*/ g.createElement(lh.Item, dv({}, t, { title: typeof e == "string" ? e : void 0 }, i, { ref: n }));
	}
}, pv = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { style: n, className: r, eventKey: i, warnKey: a, disabled: o, itemIcon: s, children: c, itemData: l, role: u, onMouseEnter: d, onMouseLeave: f, onClick: p, onKeyDown: m, onFocus: h, ..._ } = e, v = D_(i), { prefixCls: y, onItemClick: b, disabled: x, overflowDisabled: S, itemIcon: C, selectedKeys: w, onActive: T } = g.useContext(O_), { _internalRenderMenuItem: E } = g.useContext(L_), D = `${y}-item`, O = g.useRef(null), k = g.useRef(null), A = x || o, j = ne(t, k), M = F_(i), N = (t) => {
		let n = l || {
			key: i || "",
			label: c,
			itemIcon: s,
			extra: e.extra,
			title: e.title
		};
		return {
			key: i,
			keyPath: [...M].reverse(),
			item: O.current,
			domEvent: t,
			itemData: l || n
		};
	}, P = s || C, { active: F, ...I } = sv(i, A, d, f), L = w.includes(i), R = cv(M.length), z = (e) => {
		if (A) return;
		let t = N(e);
		p?.(uv(t)), b(t);
	}, B = (e) => {
		if (m?.(e), e.which === X.ENTER) {
			let t = N(e);
			p?.(uv(t)), b(t);
		}
	}, V = (e) => {
		T(i), h?.(e);
	}, H = {};
	e.role === "option" && (H["aria-selected"] = L);
	let U = /*#__PURE__*/ g.createElement(fv, dv({
		ref: O,
		elementRef: j,
		role: u === null ? "none" : u || "menuitem",
		tabIndex: o ? null : -1,
		"data-menu-id": S && v ? null : v
	}, Ve(_, ["extra"]), I, H, {
		component: "li",
		"aria-disabled": o,
		style: {
			...R,
			...n
		},
		className: Z(D, {
			[`${D}-active`]: F,
			[`${D}-selected`]: L,
			[`${D}-disabled`]: A
		}, r),
		onClick: z,
		onKeyDown: B,
		onFocus: V
	}), c, /*#__PURE__*/ g.createElement(lv, {
		props: {
			...e,
			isSelected: L
		},
		icon: P
	}));
	return E && (U = E(U, e, { selected: L })), U;
});
function mv(e, t) {
	let { eventKey: n } = e, r = N_(), i = F_(n);
	return g.useEffect(() => {
		if (r) return r.registerPath(n, i), () => {
			r.unregisterPath(n, i);
		};
	}, [i]), r ? null : /*#__PURE__*/ g.createElement(pv, dv({}, e, { ref: t }));
}
var hv = /*#__PURE__*/ g.forwardRef(mv);
// node_modules/@rc-component/menu/es/SubMenu/SubMenuList.js
function gv() {
	return gv = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, gv.apply(this, arguments);
}
var _v = /*#__PURE__*/ g.forwardRef(({ className: e, children: t, ...n }, r) => {
	let { prefixCls: i, mode: a, rtl: o } = g.useContext(O_);
	return /*#__PURE__*/ g.createElement("ul", gv({
		className: Z(i, o && `${i}-rtl`, `${i}-sub`, `${i}-${a === "inline" ? "inline" : "vertical"}`, e),
		role: "menu"
	}, n, {
		"data-menu-list": !0,
		ref: r
	}), t);
});
// node_modules/@rc-component/menu/es/utils/commonUtil.js
function vv(e, t) {
	return qe(e).map((e, n) => {
		if (/*#__PURE__*/ g.isValidElement(e)) {
			let { key: r } = e, i = e.props?.eventKey ?? r;
			i ??= `tmp_key-${[...t, n].join("-")}`;
			let a = {
				key: i,
				eventKey: i
			};
			return /*#__PURE__*/ g.cloneElement(e, a);
		}
		return e;
	});
}
// node_modules/@rc-component/menu/es/placements.js
var yv = {
	adjustX: 1,
	adjustY: 1
}, bv = {
	topLeft: {
		points: ["bl", "tl"],
		overflow: yv
	},
	topRight: {
		points: ["br", "tr"],
		overflow: yv
	},
	bottomLeft: {
		points: ["tl", "bl"],
		overflow: yv
	},
	bottomRight: {
		points: ["tr", "br"],
		overflow: yv
	},
	leftTop: {
		points: ["tr", "tl"],
		overflow: yv
	},
	leftBottom: {
		points: ["br", "bl"],
		overflow: yv
	},
	rightTop: {
		points: ["tl", "tr"],
		overflow: yv
	},
	rightBottom: {
		points: ["bl", "br"],
		overflow: yv
	}
}, xv = {
	topLeft: {
		points: ["bl", "tl"],
		overflow: yv
	},
	topRight: {
		points: ["br", "tr"],
		overflow: yv
	},
	bottomLeft: {
		points: ["tl", "bl"],
		overflow: yv
	},
	bottomRight: {
		points: ["tr", "br"],
		overflow: yv
	},
	rightTop: {
		points: ["tr", "tl"],
		overflow: yv
	},
	rightBottom: {
		points: ["br", "bl"],
		overflow: yv
	},
	leftTop: {
		points: ["tl", "tr"],
		overflow: yv
	},
	leftBottom: {
		points: ["bl", "br"],
		overflow: yv
	}
};
// node_modules/@rc-component/menu/es/utils/motionUtil.js
function Sv(e, t, n) {
	if (t) return t;
	if (n) return n[e] || n.other;
}
// node_modules/@rc-component/menu/es/SubMenu/PopupTrigger.js
var Cv = {
	horizontal: "bottomLeft",
	vertical: "rightTop",
	"vertical-left": "rightTop",
	"vertical-right": "leftTop"
};
function wv({ prefixCls: e, visible: t, children: n, popup: r, popupStyle: i, popupClassName: a, popupOffset: o, disabled: s, mode: c, onVisibleChange: l }) {
	let { getPopupContainer: u, rtl: d, subMenuOpenDelay: f, subMenuCloseDelay: p, builtinPlacements: m, triggerSubMenuAction: h, forceSubMenuRender: _, rootClassName: v, motion: y, defaultMotions: b } = g.useContext(O_), [x, S] = g.useState(!1), C = d ? {
		...xv,
		...m
	} : {
		...bv,
		...m
	}, w = Cv[c], T = Sv(c, y, b), E = g.useRef(T);
	c !== "inline" && (E.current = T);
	let D = {
		...E.current,
		leavedClassName: `${e}-hidden`,
		removeOnLeave: !1,
		motionAppear: !0
	}, O = g.useRef(void 0);
	return g.useEffect(() => (O.current = k(() => {
		S(t);
	}), () => {
		k.cancel(O.current);
	}), [t]), /*#__PURE__*/ g.createElement(Hl, {
		prefixCls: e,
		popupClassName: Z(`${e}-popup`, { [`${e}-rtl`]: d }, a, v),
		stretch: c === "horizontal" ? "minWidth" : null,
		getPopupContainer: u,
		builtinPlacements: C,
		popupPlacement: w,
		popupVisible: x,
		popup: r,
		popupStyle: i,
		popupAlign: o && { offset: o },
		action: s ? [] : [h],
		mouseEnterDelay: f,
		mouseLeaveDelay: p,
		onPopupVisibleChange: l,
		forceRender: _,
		popupMotion: D,
		fresh: !0
	}, n);
}
// node_modules/@rc-component/menu/es/SubMenu/InlineSubMenuList.js
function Tv() {
	return Tv = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Tv.apply(this, arguments);
}
function Ev({ id: e, open: t, keyPath: n, children: r }) {
	let i = "inline", { prefixCls: a, forceSubMenuRender: o, motion: s, defaultMotions: c, mode: l } = g.useContext(O_), u = g.useRef(!1);
	u.current = l === i;
	let [d, f] = g.useState(!u.current), p = u.current ? t : !1;
	g.useEffect(() => {
		u.current && f(!1);
	}, [l]);
	let m = { ...Sv(i, s, c) };
	n.length > 1 && (m.motionAppear = !1);
	let h = m.onVisibleChanged;
	return m.onVisibleChanged = (e) => (!u.current && !e && f(!0), h?.(e)), d ? null : /*#__PURE__*/ g.createElement(A_, {
		mode: i,
		locked: !u.current
	}, /*#__PURE__*/ g.createElement(ic, Tv({ visible: p }, m, {
		forceRender: o,
		removeOnLeave: !1,
		leavedClassName: `${a}-hidden`
	}), ({ className: t, style: n }) => /*#__PURE__*/ g.createElement(_v, {
		id: e,
		className: t,
		style: n
	}, r)));
}
// node_modules/@rc-component/menu/es/SubMenu/index.js
function Dv() {
	return Dv = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Dv.apply(this, arguments);
}
var Ov = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { style: n, className: r, styles: i, classNames: a, title: o, itemTitle: s, eventKey: c, warnKey: l, disabled: u, internalPopupClose: d, children: f, itemIcon: p, expandIcon: m, popupClassName: h, popupOffset: _, popupStyle: v, onClick: y, onMouseEnter: b, onMouseLeave: x, onTitleClick: S, onTitleMouseEnter: C, onTitleMouseLeave: w, popupRender: T, ...E } = e, D = D_(c), { prefixCls: O, mode: k, openKeys: A, disabled: j, overflowDisabled: M, activeKey: N, selectedKeys: P, itemIcon: F, expandIcon: I, onItemClick: L, onOpenChange: R, onActive: z, popupRender: B } = g.useContext(O_), { _internalRenderSubMenuItem: V } = g.useContext(L_), { isSubPathKey: H } = g.useContext(I_), U = F_(), W = `${O}-submenu`, ee = j || u, te = g.useRef(null), ne = g.useRef(null), re = p ?? F, ie = m ?? I, ae = A.includes(c), G = !M && ae, K = H(P, c), { active: oe, ...se } = sv(c, ee, C, w), [ce, q] = g.useState(!1), le = (e) => {
		ee || q(e);
	}, ue = (e) => {
		le(!0), b?.({
			key: c,
			domEvent: e
		});
	}, de = (e) => {
		le(!1), x?.({
			key: c,
			domEvent: e
		});
	}, fe = g.useMemo(() => oe || (k === "inline" ? !1 : ce || H([N], c)), [
		k,
		oe,
		N,
		ce,
		c,
		H
	]), pe = cv(U.length), me = (e) => {
		ee || (S?.({
			key: c,
			domEvent: e
		}), k === "inline" && R(c, !ae));
	}, J = ov((e) => {
		y?.(uv(e)), L(e);
	}), Y = (e) => {
		k !== "inline" && R(c, e);
	}, he = () => {
		z(c);
	}, ge = D && `${D}-popup`, _e = g.useMemo(() => /*#__PURE__*/ g.createElement(lv, {
		icon: k === "horizontal" ? void 0 : ie,
		props: {
			...e,
			isOpen: G,
			isSubMenu: !0
		}
	}, /*#__PURE__*/ g.createElement("i", { className: `${W}-arrow` })), [
		k,
		ie,
		e,
		G,
		W
	]), ve = /*#__PURE__*/ g.createElement("div", Dv({
		role: "menuitem",
		style: pe,
		className: `${W}-title`,
		tabIndex: ee ? null : -1,
		ref: te,
		title: s ?? (typeof o == "string" ? o : null),
		"data-menu-id": M && D ? null : D,
		"aria-expanded": G,
		"aria-haspopup": !0,
		"aria-controls": ge,
		"aria-disabled": ee,
		onClick: me,
		onFocus: he
	}, se), o, _e), ye = g.useRef(k);
	ye.current = k !== "inline" && U.length > 1 ? "vertical" : k;
	let be = ye.current, xe = g.useMemo(() => {
		let t = /*#__PURE__*/ g.createElement(A_, {
			classNames: a,
			styles: i,
			mode: be === "horizontal" ? "vertical" : be
		}, /*#__PURE__*/ g.createElement(_v, {
			id: ge,
			ref: ne
		}, f)), n = T || B;
		return n ? n(t, {
			item: e,
			keys: U
		}) : t;
	}, [
		T,
		B,
		U,
		ge,
		f,
		e,
		be
	]);
	if (!M) {
		let e = ye.current;
		ve = /*#__PURE__*/ g.createElement(wv, {
			mode: e,
			prefixCls: W,
			visible: !d && G && k !== "inline",
			popupClassName: h,
			popupOffset: _,
			popupStyle: v,
			popup: xe,
			disabled: ee,
			onVisibleChange: Y
		}, ve);
	}
	let Se = /*#__PURE__*/ g.createElement(lh.Item, Dv({
		ref: t,
		role: "none"
	}, E, {
		component: "li",
		style: n,
		className: Z(W, `${W}-${k}`, r, {
			[`${W}-open`]: G,
			[`${W}-active`]: fe,
			[`${W}-selected`]: K,
			[`${W}-disabled`]: ee
		}),
		onMouseEnter: ue,
		onMouseLeave: de
	}), ve, !M && /*#__PURE__*/ g.createElement(Ev, {
		id: ge,
		open: G,
		keyPath: U
	}, f));
	return V && (Se = V(Se, e, {
		selected: K,
		active: fe,
		open: G,
		disabled: ee
	})), /*#__PURE__*/ g.createElement(A_, {
		classNames: a,
		styles: i,
		onItemClick: J,
		mode: k === "horizontal" ? "vertical" : k,
		itemIcon: re,
		expandIcon: ie
	}, Se);
}), kv = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { eventKey: n, children: r } = e, i = F_(n), a = vv(r, i), o = N_();
	g.useEffect(() => {
		if (o) return o.registerPath(n, i), () => {
			o.unregisterPath(n, i);
		};
	}, [i]);
	let s;
	return s = o ? a : /*#__PURE__*/ g.createElement(Ov, Dv({ ref: t }, e), a), /*#__PURE__*/ g.createElement(P_.Provider, { value: i }, s);
});
// node_modules/@rc-component/menu/es/Divider.js
function Av({ className: e, style: t }) {
	let { prefixCls: n } = g.useContext(O_);
	return N_() ? null : /*#__PURE__*/ g.createElement("li", {
		role: "separator",
		className: Z(`${n}-item-divider`, e),
		style: t
	});
}
// node_modules/@rc-component/menu/es/MenuItemGroup.js
function jv() {
	return jv = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, jv.apply(this, arguments);
}
var Mv = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { className: n, title: r, eventKey: i, children: a, ...o } = e, { prefixCls: s, classNames: c, styles: l } = g.useContext(O_), u = `${s}-item-group`;
	return /*#__PURE__*/ g.createElement("li", jv({
		ref: t,
		role: "presentation"
	}, o, {
		onClick: (e) => e.stopPropagation(),
		className: Z(u, n)
	}), /*#__PURE__*/ g.createElement("div", {
		role: "presentation",
		className: Z(`${u}-title`, c?.listTitle),
		style: l?.listTitle,
		title: typeof r == "string" ? r : void 0
	}, r), /*#__PURE__*/ g.createElement("ul", {
		role: "group",
		className: Z(`${u}-list`, c?.list),
		style: l?.list
	}, a));
}), Nv = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { eventKey: n, children: r } = e, i = vv(r, F_(n));
	return N_() ? i : /*#__PURE__*/ g.createElement(Mv, jv({ ref: t }, Ve(e, ["warnKey"])), i);
});
// node_modules/@rc-component/menu/es/utils/nodeUtil.js
function Pv() {
	return Pv = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Pv.apply(this, arguments);
}
function Fv(e, t, n) {
	let { item: r, group: i, submenu: a, divider: o } = t;
	return (e || []).map((e, s) => {
		if (e && typeof e == "object") {
			let { label: c, children: l, key: u, type: d, extra: f, ...p } = e, m = u ?? `tmp-${s}`;
			if (l || d === "group") {
				if (d === "group") return /*#__PURE__*/ g.createElement(i, Pv({ key: m }, p, { title: c }), Fv(l, t, n));
				let { title: e, ...r } = p;
				return /*#__PURE__*/ g.createElement(a, Pv({ key: m }, r, {
					title: c,
					itemTitle: typeof e == "string" ? e : void 0
				}), Fv(l, t, n));
			}
			if (d === "divider") return /*#__PURE__*/ g.createElement(o, Pv({ key: m }, p));
			let h = !!f || f === 0;
			return /*#__PURE__*/ g.createElement(r, Pv({ key: m }, p, {
				extra: f,
				itemData: {
					...e,
					key: m
				}
			}), h ? /*#__PURE__*/ g.createElement(g.Fragment, null, /*#__PURE__*/ g.createElement("span", { className: `${n}-item-label` }, c), /*#__PURE__*/ g.createElement("span", { className: `${n}-item-extra` }, f)) : c);
		}
		return null;
	}).filter((e) => e);
}
function Iv(e, t, n, r, i) {
	let a = e, o = {
		divider: Av,
		item: hv,
		group: Nv,
		submenu: kv,
		...r
	};
	return t && (a = Fv(t, o, i)), vv(a, n);
}
// node_modules/@rc-component/menu/es/Menu.js
function Lv() {
	return Lv = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Lv.apply(this, arguments);
}
var Rv = [], zv = /* @__PURE__ */ g.forwardRef((e, t) => {
	let { prefixCls: n = "rc-menu", rootClassName: r, style: i, className: a, styles: o, classNames: s, tabIndex: c = 0, items: l, children: u, direction: d, id: f, mode: p = "vertical", inlineCollapsed: m, disabled: h, disabledOverflow: _, subMenuOpenDelay: v = .1, subMenuCloseDelay: y = .1, forceSubMenuRender: b, defaultOpenKeys: x, openKeys: S, activeKey: w, defaultActiveFirst: T, selectable: E = !0, multiple: D = !1, defaultSelectedKeys: O, selectedKeys: k, onSelect: A, onDeselect: j, inlineIndent: M = 24, motion: N, defaultMotions: F, triggerSubMenuAction: I = "hover", builtinPlacements: L, itemIcon: R, expandIcon: z, overflowedIndicator: B = "...", overflowedIndicatorPopupClassName: V, getPopupContainer: H, onClick: U, onOpenChange: W, onKeyDown: ee, openAnimation: te, openTransitionName: ne, _internalRenderMenuItem: re, _internalRenderSubMenuItem: ie, _internalComponents: ae, popupRender: G, ...K } = e, [oe, se] = g.useMemo(() => [Iv(u, l, Rv, ae, n), Iv(u, l, Rv, {}, n)], [
		u,
		l,
		ae
	]), [ce, q] = g.useState(!1), le = g.useRef(null), ue = P(), de = f ?? `rc-menu-uuid-${ue}`, fe = d === "rtl", [pe, me] = C(x, S), J = pe || Rv, Y = (e, t = !1) => {
		function n() {
			me(e), W?.(e);
		}
		t ? (0, st.flushSync)(n) : n();
	}, [he, ge] = g.useState(J), _e = g.useRef(!1), [ve, ye] = g.useMemo(() => (p === "inline" || p === "vertical") && m ? ["vertical", m] : [p, !1], [p, m]), be = ve === "inline", [xe, Se] = g.useState(ve), [Ce, X] = g.useState(ye);
	g.useEffect(() => {
		Se(ve), X(ye), _e.current && (be ? me(he) : Y(Rv));
	}, [ve, ye]);
	let [we, Te] = g.useState(0), Ee = we >= oe.length - 1 || xe !== "horizontal" || _;
	g.useEffect(() => {
		be && ge(J);
	}, [J]), g.useEffect(() => (_e.current = !0, () => {
		_e.current = !1;
	}), []);
	let { registerPath: De, unregisterPath: Oe, refreshOverflowKeys: ke, isSubPathKey: Ae, getKeyPath: je, getKeys: Me, getSubPathKeys: Ne } = av(), Pe = g.useMemo(() => ({
		registerPath: De,
		unregisterPath: Oe
	}), [De, Oe]), Ie = g.useMemo(() => ({ isSubPathKey: Ae }), [Ae]);
	g.useEffect(() => {
		ke(Ee ? Rv : oe.slice(we + 1).map((e) => e.key));
	}, [we, Ee]);
	let [Le, Re] = C(w || T && oe[0]?.key, w), ze = ov((e) => {
		Re(e);
	}), Be = ov(() => {
		Re(void 0);
	});
	(0, g.useImperativeHandle)(t, () => ({
		list: le.current,
		focus: (e) => {
			let t = Me(), { elements: n, key2element: r, element2key: i } = Q_(t, de), a = X_(le.current, n), o;
			o = Le && t.includes(Le) ? Le : a[0] ? i.get(a[0]) : oe.find((e) => !e.props.disabled)?.key;
			let s = r.get(o);
			o && s && s?.focus?.(e);
		},
		findItem: ({ key: e }) => {
			let { key2element: t } = Q_(Me(), de);
			return t.get(e) || null;
		}
	}));
	let [Ve, He] = C(O || [], k), Ue = g.useMemo(() => Array.isArray(Ve) ? Ve : Ve == null ? Rv : [Ve], [Ve]), We = (e) => {
		if (E) {
			let { key: t } = e, n = Ue.includes(t), r;
			r = D ? n ? Ue.filter((e) => e !== t) : [...Ue, t] : [t], He(r);
			let i = {
				...e,
				selectedKeys: r
			};
			n ? j?.(i) : A?.(i);
		}
		!D && J.length && xe !== "inline" && Y(Rv);
	}, Ge = ov((e) => {
		U?.(uv(e)), We(e);
	}), Ke = ov((e, t) => {
		let n = J.filter((t) => t !== e);
		if (t) n.push(e);
		else if (xe !== "inline") {
			let t = Ne(e);
			n = n.filter((e) => !t.has(e));
		}
		Fe(J, n, !0) || Y(n, !0);
	}), qe = $_(xe, Le, fe, de, le, Me, je, Re, (e, t) => {
		let n = t ?? !J.includes(e);
		Ke(e, n);
	}, ee);
	g.useEffect(() => {
		q(!0);
	}, []);
	let Je = g.useMemo(() => ({
		_internalRenderMenuItem: re,
		_internalRenderSubMenuItem: ie
	}), [re, ie]), Ye = xe !== "horizontal" || _ ? oe : oe.map((e, t) => /*#__PURE__*/ g.createElement(A_, {
		key: e.key,
		overflowDisabled: t > we,
		classNames: s,
		styles: o
	}, e)), Xe = /*#__PURE__*/ g.createElement(lh, Lv({
		id: f,
		ref: le,
		prefixCls: `${n}-overflow`,
		component: "ul",
		itemComponent: hv,
		className: Z(n, `${n}-root`, `${n}-${xe}`, a, {
			[`${n}-inline-collapsed`]: Ce,
			[`${n}-rtl`]: fe
		}, r),
		dir: d,
		style: i,
		role: "menu",
		tabIndex: c,
		data: Ye,
		renderRawItem: (e) => e,
		renderRawRest: (e) => {
			let t = e.length, n = t ? oe.slice(-t) : null;
			return /*#__PURE__*/ g.createElement(kv, {
				eventKey: iv,
				title: B,
				disabled: Ee,
				internalPopupClose: t === 0,
				popupClassName: V
			}, n);
		},
		maxCount: xe !== "horizontal" || _ ? lh.INVALIDATE : lh.RESPONSIVE,
		ssr: "full",
		"data-menu-list": !0,
		onVisibleChange: (e) => {
			Te(e);
		},
		onKeyDown: qe
	}, K));
	return /*#__PURE__*/ g.createElement(L_.Provider, { value: Je }, /*#__PURE__*/ g.createElement(T_.Provider, { value: de }, /*#__PURE__*/ g.createElement(A_, {
		prefixCls: n,
		rootClassName: r,
		classNames: s,
		styles: o,
		mode: xe,
		openKeys: J,
		rtl: fe,
		disabled: h,
		motion: ce ? N : null,
		defaultMotions: ce ? F : null,
		activeKey: Le,
		onActive: ze,
		onInactive: Be,
		selectedKeys: Ue,
		inlineIndent: M,
		subMenuOpenDelay: v,
		subMenuCloseDelay: y,
		forceSubMenuRender: b,
		builtinPlacements: L,
		triggerSubMenuAction: I,
		getPopupContainer: H,
		itemIcon: R,
		expandIcon: z,
		onItemClick: Ge,
		onOpenChange: Ke,
		popupRender: G
	}, /*#__PURE__*/ g.createElement(I_.Provider, { value: Ie }, Xe), /*#__PURE__*/ g.createElement("div", {
		style: { display: "none" },
		"aria-hidden": !0
	}, /*#__PURE__*/ g.createElement(M_.Provider, { value: Pe }, se)))));
});
zv.Item = hv, zv.SubMenu = kv, zv.ItemGroup = Nv, zv.Divider = Av;
// node_modules/@ant-design/icons-svg/es/asn/EllipsisOutlined.js
var Bv = {
	icon: {
		tag: "svg",
		attrs: {
			viewBox: "64 64 896 896",
			focusable: "false"
		},
		children: [{
			tag: "path",
			attrs: { d: "M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z" }
		}]
	},
	name: "ellipsis",
	theme: "outlined"
};
// node_modules/@ant-design/icons/es/icons/EllipsisOutlined.js
function Vv() {
	return Vv = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Vv.apply(this, arguments);
}
var Hv = /*#__PURE__*/ g.forwardRef((e, t) => /*#__PURE__*/ g.createElement(es, Vv({}, e, {
	ref: t,
	icon: Bv
}))), Uv = Qd, Wv = {
	icon: {
		tag: "svg",
		attrs: {
			viewBox: "64 64 896 896",
			focusable: "false"
		},
		children: [{
			tag: "path",
			attrs: { d: "M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" }
		}, {
			tag: "path",
			attrs: { d: "M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z" }
		}]
	},
	name: "plus",
	theme: "outlined"
};
// node_modules/@ant-design/icons/es/icons/PlusOutlined.js
function Gv() {
	return Gv = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Gv.apply(this, arguments);
}
var Kv = /*#__PURE__*/ g.forwardRef((e, t) => /*#__PURE__*/ g.createElement(es, Gv({}, e, {
	ref: t,
	icon: Wv
}))), qv = /*#__PURE__*/ (0, g.createContext)(null), Jv = (e) => {
	let { activeTabOffset: t, horizontal: n, rtl: r, indicator: i = {} } = e, { size: a, align: o = "center" } = i, [s, c] = (0, g.useState)(), l = (0, g.useRef)(void 0), u = g.useCallback((e) => typeof a == "function" ? a(e) : typeof a == "number" ? a : e, [a]);
	function d() {
		k.cancel(l.current);
	}
	return (0, g.useEffect)(() => {
		let e = {};
		if (t) {
			if (n) {
				e.width = u(t.width);
				let n = r ? "right" : "left";
				o === "start" && (e[n] = t[n]), o === "center" && (e[n] = t[n] + t.width / 2, e.transform = r ? "translateX(50%)" : "translateX(-50%)"), o === "end" && (e[n] = t[n] + t.width, e.transform = "translateX(-100%)");
			} else e.height = u(t.height), o === "start" && (e.top = t.top), o === "center" && (e.top = t.top + t.height / 2, e.transform = "translateY(-50%)"), o === "end" && (e.top = t.top + t.height, e.transform = "translateY(-100%)");
		}
		return d(), l.current = k(() => {
			s && e && Object.keys(e).every((t) => {
				let n = e[t], r = s[t];
				return typeof n == "number" && typeof r == "number" ? Math.round(n) === Math.round(r) : n === r;
			}) || c(e);
		}), d;
	}, [
		JSON.stringify(t),
		n,
		r,
		o,
		u
	]), { style: s };
}, Yv = {
	width: 0,
	height: 0,
	left: 0,
	top: 0
};
function Xv(e, t, n) {
	return (0, g.useMemo)(() => {
		let n = /* @__PURE__ */ new Map(), r = t.get(e[0]?.key) || Yv, i = r.left + r.width;
		for (let r = 0; r < e.length; r += 1) {
			let { key: a } = e[r], o = t.get(a);
			o ||= t.get(e[r - 1]?.key) || Yv;
			let s = n.get(a) || { ...o };
			s.right = i - s.left - s.width, n.set(a, s);
		}
		return n;
	}, [
		e.map((e) => e.key).join("_"),
		t,
		n
	]);
}
// node_modules/@rc-component/tabs/es/hooks/useSyncState.js
function Zv(e, t) {
	let n = g.useRef(e), [, r] = g.useState({});
	function i(e) {
		let i = typeof e == "function" ? e(n.current) : e;
		i !== n.current && t(i, n.current), n.current = i, r({});
	}
	return [n.current, i];
}
// node_modules/@rc-component/tabs/es/hooks/useTouchMove.js
var Qv = .1, $v = .01, ey = 20, ty = .995 ** ey;
function ny(e, t) {
	let [n, r] = (0, g.useState)(), [i, a] = (0, g.useState)(0), [o, s] = (0, g.useState)(0), [c, l] = (0, g.useState)(), u = (0, g.useRef)(void 0);
	function d(e) {
		let { screenX: t, screenY: n } = e.touches[0];
		r({
			x: t,
			y: n
		}), window.clearInterval(u.current);
	}
	function f(e) {
		if (!n) return;
		let { screenX: o, screenY: c } = e.touches[0];
		r({
			x: o,
			y: c
		});
		let u = o - n.x, d = c - n.y;
		t(u, d);
		let f = Date.now();
		a(f), s(f - i), l({
			x: u,
			y: d
		});
	}
	function p() {
		if (n && (r(null), l(null), c)) {
			let e = c.x / o, n = c.y / o;
			if (Math.max(Math.abs(e), Math.abs(n)) < Qv) return;
			let r = e, i = n;
			u.current = window.setInterval(() => {
				Math.abs(r) < $v && Math.abs(i) < $v ? window.clearInterval(u.current) : (r *= ty, i *= ty, t(r * ey, i * ey));
			}, ey);
		}
	}
	let m = (0, g.useRef)(void 0);
	function h(e) {
		let { deltaX: n, deltaY: r } = e, i, a = Math.abs(n), o = Math.abs(r);
		a === o ? i = m.current === "x" ? n : r : a > o ? (i = n, m.current = "x") : (i = r, m.current = "y"), t(-i, -i) && e.preventDefault();
	}
	let _ = (0, g.useRef)(null);
	_.current = {
		onTouchStart: d,
		onTouchMove: f,
		onTouchEnd: p,
		onWheel: h
	}, g.useEffect(() => {
		function t(e) {
			_.current.onTouchStart(e);
		}
		function n(e) {
			_.current.onTouchMove(e);
		}
		function r(e) {
			_.current.onTouchEnd(e);
		}
		function i(e) {
			_.current.onWheel(e);
		}
		return document.addEventListener("touchmove", n, { passive: !1 }), document.addEventListener("touchend", r, { passive: !0 }), e.current.addEventListener("touchstart", t, { passive: !0 }), e.current.addEventListener("wheel", i, { passive: !1 }), () => {
			document.removeEventListener("touchmove", n), document.removeEventListener("touchend", r);
		};
	}, []);
}
// node_modules/@rc-component/tabs/es/hooks/useUpdate.js
function ry(e) {
	let [t, n] = (0, g.useState)(0), r = (0, g.useRef)(0), i = (0, g.useRef)(void 0);
	return i.current = e, x(() => {
		i.current?.();
	}, [t]), () => {
		r.current === t && (r.current += 1, n(r.current));
	};
}
function iy(e) {
	let t = (0, g.useRef)([]), [, n] = (0, g.useState)({}), r = (0, g.useRef)(typeof e == "function" ? e() : e), i = ry(() => {
		let e = r.current;
		t.current.forEach((t) => {
			e = t(e);
		}), t.current = [], r.current = e, n({});
	});
	function a(e) {
		t.current.push(e), i();
	}
	return [r.current, a];
}
// node_modules/@rc-component/tabs/es/hooks/useVisibleRange.js
var ay = {
	width: 0,
	height: 0,
	left: 0,
	top: 0,
	right: 0
};
function oy(e, t, n, r, i, a, { tabs: o, tabPosition: s, rtl: c }) {
	let l, u, d;
	return ["top", "bottom"].includes(s) ? (l = "width", u = c ? "right" : "left", d = Math.abs(n)) : (l = "height", u = "top", d = -n), (0, g.useMemo)(() => {
		if (!o.length) return [0, 0];
		let n = o.length, r = n;
		for (let i = 0; i < n; i += 1) {
			let n = e.get(o[i].key) || ay;
			if (Math.floor(n[u] + n[l]) > Math.floor(d + t)) {
				r = i - 1;
				break;
			}
		}
		let i = 0;
		for (let t = n - 1; t >= 0; --t) if ((e.get(o[t].key) || ay)[u] < d) {
			i = t + 1;
			break;
		}
		return i > r ? [0, -1] : [i, r];
	}, [
		e,
		t,
		r,
		i,
		a,
		d,
		s,
		o.map((e) => e.key).join("_"),
		c
	]);
}
// node_modules/@rc-component/tabs/es/util.js
function sy(e) {
	let t;
	return e instanceof Map ? (t = {}, e.forEach((e, n) => {
		t[n] = e;
	})) : t = e, JSON.stringify(t);
}
var cy = "TABS_DQ";
function ly(e) {
	return String(e).replace(/"/g, cy);
}
function uy(e, t, n, r) {
	return !(!n || r || e === !1 || e === void 0 && (t === !1 || t === null));
}
// node_modules/@rc-component/tabs/es/TabNavList/AddButton.js
var dy = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { prefixCls: n, editable: r, locale: i, style: a } = e;
	return !r || r.showAdd === !1 ? null : /*#__PURE__*/ g.createElement("button", {
		ref: t,
		type: "button",
		className: `${n}-nav-add`,
		style: a,
		"aria-label": i?.addAriaLabel || "Add tab",
		onClick: (e) => {
			r.onEdit("add", { event: e });
		}
	}, r.addIcon || "+");
}), fy = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { position: n, prefixCls: r, extra: i } = e;
	if (!i) return null;
	let a, o = {};
	return typeof i == "object" && !/*#__PURE__*/ g.isValidElement(i) ? o = i : o.right = i, n === "right" && (a = o.right), n === "left" && (a = o.left), a ? /*#__PURE__*/ g.createElement("div", {
		className: `${r}-extra-content`,
		ref: t
	}, a) : null;
});
// node_modules/@rc-component/tabs/es/TabNavList/OperationNode.js
function py() {
	return py = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, py.apply(this, arguments);
}
var my = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { prefixCls: n, id: r, tabs: i, locale: a, mobile: o, more: s = {}, style: c, className: l, editable: u, tabBarGutter: d, rtl: f, removeAriaLabel: p, onTabClick: m, getPopupContainer: h, popupClassName: _, popupStyle: v, classNames: y, styles: b } = e, [x, S] = (0, g.useState)(!1), [C, w] = (0, g.useState)(null), { icon: T = "More", popupRender: E } = s, D = `${r}-more-popup`, O = `${n}-dropdown`, k = C === null ? null : `${D}-${C}`, A = a?.dropdownAriaLabel;
	function j(e, t) {
		e.preventDefault(), e.stopPropagation(), u.onEdit("remove", {
			key: t,
			event: e
		});
	}
	let M = /*#__PURE__*/ g.createElement(zv, {
		onClick: ({ key: e, domEvent: t }) => {
			m(e, t), S(!1);
		},
		prefixCls: `${O}-menu`,
		id: D,
		tabIndex: -1,
		role: "listbox",
		"aria-activedescendant": k,
		selectedKeys: [C],
		"aria-label": A === void 0 ? "expanded dropdown" : A
	}, i.map((e) => {
		let { closable: t, disabled: n, closeIcon: i, key: a, label: o } = e, s = uy(t, i, u, n);
		return /*#__PURE__*/ g.createElement(hv, {
			key: a,
			id: `${D}-${a}`,
			role: "option",
			"aria-controls": r && `${r}-panel-${a}`,
			disabled: n
		}, /*#__PURE__*/ g.createElement("span", null, o), s && /*#__PURE__*/ g.createElement("button", {
			type: "button",
			"aria-label": p || "remove",
			tabIndex: 0,
			className: Z(`${O}-menu-item-remove`, y?.remove),
			style: b?.remove,
			onClick: (e) => {
				e.stopPropagation(), j(e, a);
			}
		}, i || u.removeIcon || "×"));
	})), N = E ? E(M, {
		restTabs: i,
		onClose: () => S(!1)
	}) : M;
	function P(e) {
		let t = i.filter((e) => !e.disabled), n = t.findIndex((e) => e.key === C) || 0, r = t.length;
		for (let i = 0; i < r; i += 1) {
			n = (n + e + r) % r;
			let i = t[n];
			if (!i.disabled) {
				w(i.key);
				return;
			}
		}
	}
	function F(e) {
		let { which: t } = e;
		if (!x) [
			X.DOWN,
			X.SPACE,
			X.ENTER
		].includes(t) && (S(!0), e.preventDefault());
		else switch (t) {
			case X.UP:
				P(-1), e.preventDefault();
				break;
			case X.DOWN:
				P(1), e.preventDefault();
				break;
			case X.ESC:
				S(!1);
				break;
			case X.SPACE:
			case X.ENTER: C !== null && m(C, e);
		}
	}
	(0, g.useEffect)(() => {
		let e = document.getElementById(k);
		e?.scrollIntoView && e.scrollIntoView(!1);
	}, [k, C]), (0, g.useEffect)(() => {
		x || w(null);
	}, [x]);
	let I = { marginInlineStart: d };
	i.length || (I.visibility = "hidden", I.order = 1);
	let L = Z(_, { [`${O}-rtl`]: f }), R = o ? null : /*#__PURE__*/ g.createElement(w_, py({
		prefixCls: O,
		overlay: N,
		visible: i.length ? x : !1,
		onVisibleChange: S,
		overlayClassName: L,
		overlayStyle: v,
		mouseEnterDelay: .1,
		mouseLeaveDelay: .1,
		getPopupContainer: h
	}, s), /*#__PURE__*/ g.createElement("button", {
		type: "button",
		className: `${n}-nav-more`,
		style: I,
		"aria-haspopup": "listbox",
		"aria-controls": D,
		id: `${r}-more`,
		"aria-expanded": x,
		onKeyDown: F
	}, T));
	return /*#__PURE__*/ g.createElement("div", {
		className: Z(`${n}-nav-operations`, l),
		style: c,
		ref: t
	}, R, /*#__PURE__*/ g.createElement(dy, {
		prefixCls: n,
		locale: a,
		editable: u
	}));
}), hy = /*#__PURE__*/ g.memo(my, (e, t) => t.tabMoving), gy = (e) => {
	let { prefixCls: t, id: n, active: r, focus: i, tab: { key: a, label: o, disabled: s, closeIcon: c, icon: l }, closable: u, renderWrapper: d, removeAriaLabel: f, editable: p, onClick: m, onFocus: h, onBlur: _, onKeyDown: v, onMouseDown: y, onMouseUp: b, styles: x, classNames: S, tabCount: C, currentPosition: w } = e, T = `${t}-tab`, E = uy(u, c, p, s);
	function D(e) {
		s || m(e);
	}
	function O(e) {
		e.preventDefault(), e.stopPropagation(), p.onEdit("remove", {
			key: a,
			event: e
		});
	}
	let k = g.useMemo(() => l && typeof o == "string" ? /*#__PURE__*/ g.createElement("span", null, o) : o, [o, l]), A = g.useRef(null);
	g.useEffect(() => {
		i && A.current && A.current.focus();
	}, [i]);
	let j = /*#__PURE__*/ g.createElement("div", {
		key: a,
		"data-node-key": ly(a),
		className: Z(T, S?.item, {
			[`${T}-with-remove`]: E,
			[`${T}-active`]: r,
			[`${T}-disabled`]: s,
			[`${T}-focus`]: i
		}),
		style: x?.item,
		onClick: D
	}, /*#__PURE__*/ g.createElement("div", {
		ref: A,
		role: "tab",
		"aria-selected": r,
		id: n && `${n}-tab-${a}`,
		className: `${T}-btn`,
		"aria-controls": n && `${n}-panel-${a}`,
		"aria-disabled": s,
		tabIndex: s ? null : r ? 0 : -1,
		onClick: (e) => {
			e.stopPropagation(), D(e);
		},
		onKeyDown: v,
		onMouseDown: y,
		onMouseUp: b,
		onFocus: h,
		onBlur: _
	}, i && /*#__PURE__*/ g.createElement("div", {
		"aria-live": "polite",
		style: {
			width: 0,
			height: 0,
			position: "absolute",
			overflow: "hidden",
			opacity: 0
		}
	}, `Tab ${w} of ${C}`), l && /*#__PURE__*/ g.createElement("span", { className: `${T}-icon` }, l), o && k), E && /*#__PURE__*/ g.createElement("button", {
		type: "button",
		"aria-label": f || "remove",
		tabIndex: r ? 0 : -1,
		className: Z(`${T}-remove`, S?.remove),
		style: x?.remove,
		onClick: (e) => {
			e.stopPropagation(), O(e);
		}
	}, c || p.removeIcon || "×"));
	return d ? d(j) : j;
};
// node_modules/@rc-component/tabs/es/TabNavList/index.js
function _y() {
	return _y = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, _y.apply(this, arguments);
}
var vy = (e, t) => {
	let { offsetWidth: n, offsetHeight: r, offsetTop: i, offsetLeft: a } = e, { width: o, height: s, left: c, top: l } = e.getBoundingClientRect();
	return Math.abs(o - n) < 1 ? [
		o,
		s,
		c - t.left,
		l - t.top
	] : [
		n,
		r,
		a,
		i
	];
}, yy = (e) => {
	let { offsetWidth: t = 0, offsetHeight: n = 0 } = e.current || {};
	if (e.current) {
		let { width: n, height: r } = e.current.getBoundingClientRect();
		if (Math.abs(n - t) < 1) return [n, r];
	}
	return [t, n];
}, by = (e, t) => e[+!t], xy = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { className: n, style: r, id: i, animated: a, activeKey: o, rtl: s, extra: c, editable: l, locale: u, tabPosition: d, tabBarGutter: f, children: p, onTabClick: m, onTabScroll: h, indicator: v, classNames: y, styles: b } = e, { prefixCls: x, tabs: S } = g.useContext(qv), C = (0, g.useRef)(null), w = (0, g.useRef)(null), T = (0, g.useRef)(null), E = (0, g.useRef)(null), D = (0, g.useRef)(null), O = (0, g.useRef)(null), k = (0, g.useRef)(null), A = d === "top" || d === "bottom", [j, M] = Zv(0, (e, t) => {
		A && h && h({ direction: e > t ? "left" : "right" });
	}), [N, P] = Zv(0, (e, t) => {
		!A && h && h({ direction: e > t ? "top" : "bottom" });
	}), [F, I] = (0, g.useState)([0, 0]), [L, R] = (0, g.useState)([0, 0]), [z, B] = (0, g.useState)([0, 0]), [V, H] = (0, g.useState)([0, 0]), [U, W] = iy(/* @__PURE__ */ new Map()), ee = Xv(S, U, L[0]), te = by(F, A), re = by(L, A), ie = by(z, A), ae = by(V, A), G = Math.floor(te) < Math.floor(re + ie), K = G ? te - ae : te - ie, oe = `${x}-nav-operations-hidden`, se = 0, ce = 0;
	A && s ? (se = 0, ce = Math.max(0, re - K)) : (se = Math.min(0, K - re), ce = 0);
	function q(e) {
		return e < se ? se : e > ce ? ce : e;
	}
	let le = (0, g.useRef)(null), [ue, de] = (0, g.useState)();
	function fe() {
		de(Date.now());
	}
	function pe() {
		le.current && clearTimeout(le.current);
	}
	ny(E, (e, t) => {
		function n(e, t) {
			e((e) => q(e + t));
		}
		return G ? (A ? n(M, e) : n(P, t), pe(), fe(), !0) : !1;
	}), (0, g.useEffect)(() => (pe(), ue && (le.current = setTimeout(() => {
		de(0);
	}, 100)), pe), [ue]);
	let [me, J] = oy(ee, K, A ? j : N, re, ie, ae, {
		...e,
		tabs: S
	}), Y = _((e = o) => {
		let t = ee.get(e) || {
			width: 0,
			height: 0,
			left: 0,
			right: 0,
			top: 0
		};
		if (A) {
			let e = j;
			s ? t.right < j ? e = t.right : t.right + t.width > j + K && (e = t.right + t.width - K) : t.left < -j ? e = -t.left : t.left + t.width > -j + K && (e = -(t.left + t.width - K)), P(0), M(q(e));
		} else {
			let e = N;
			t.top < -N ? e = -t.top : t.top + t.height > -N + K && (e = -(t.top + t.height - K)), M(0), P(q(e));
		}
	}), [he, ge] = (0, g.useState)(), [_e, ve] = (0, g.useState)(!1), ye = S.filter((e) => !e.disabled).map((e) => e.key), be = (e) => {
		let t = ye.indexOf(he || o), n = ye.length, r = (t + e + n) % n, i = ye[r];
		ge(i);
	}, xe = (e, t) => {
		let n = ye.indexOf(e), r = S.find((t) => t.key === e);
		uy(r?.closable, r?.closeIcon, l, r?.disabled) && (t.preventDefault(), t.stopPropagation(), l.onEdit("remove", {
			key: e,
			event: t
		}), n === ye.length - 1 ? be(-1) : be(1));
	}, Se = (e, t) => {
		ve(!0), t.button === 1 && xe(e, t);
	}, Ce = (e) => {
		let { code: t } = e, n = s && A, r = ye[0], i = ye[ye.length - 1];
		switch (t) {
			case "ArrowLeft":
				A && be(n ? 1 : -1);
				break;
			case "ArrowRight":
				A && be(n ? -1 : 1);
				break;
			case "ArrowUp":
				e.preventDefault(), A || be(-1);
				break;
			case "ArrowDown":
				e.preventDefault(), A || be(1);
				break;
			case "Home":
				e.preventDefault(), ge(r);
				break;
			case "End":
				e.preventDefault(), ge(i);
				break;
			case "Enter":
			case "Space":
				e.preventDefault(), m(he ?? o, e);
				break;
			case "Backspace":
			case "Delete": xe(he, e);
		}
	}, X = {};
	A ? X.marginInlineStart = f : X.marginTop = f;
	let we = S.map((e, t) => {
		let { key: n } = e;
		return /*#__PURE__*/ g.createElement(gy, {
			id: i,
			prefixCls: x,
			key: n,
			tab: e,
			classNames: {
				item: y?.item,
				remove: y?.remove
			},
			styles: {
				item: t === 0 ? b?.item : {
					...X,
					...b?.item
				},
				remove: b?.remove
			},
			closable: e.closable,
			editable: l,
			active: n === o,
			focus: n === he,
			renderWrapper: p,
			removeAriaLabel: u?.removeAriaLabel,
			tabCount: ye.length,
			currentPosition: t + 1,
			onClick: (e) => {
				m(n, e);
			},
			onKeyDown: Ce,
			onFocus: () => {
				_e || ge(n), Y(n), fe(), E.current && (s || (E.current.scrollLeft = 0), E.current.scrollTop = 0);
			},
			onBlur: () => {
				ge(void 0);
			},
			onMouseDown: (e) => Se(n, e),
			onMouseUp: () => {
				ve(!1);
			}
		});
	}), Te = () => W(() => {
		let e = /* @__PURE__ */ new Map(), t = D.current?.getBoundingClientRect();
		return S.forEach(({ key: n }) => {
			let r = D.current?.querySelector(`[data-node-key="${ly(n)}"]`);
			if (r) {
				let [i, a, o, s] = vy(r, t);
				e.set(n, {
					width: i,
					height: a,
					left: o,
					top: s
				});
			}
		}), e;
	});
	(0, g.useEffect)(() => {
		Te();
	}, [S.map((e) => e.key).join("_")]);
	let Ee = ry(() => {
		let e = yy(C), t = yy(w), n = yy(T);
		I([e[0] - t[0] - n[0], e[1] - t[1] - n[1]]);
		let r = yy(k);
		B(r);
		let i = yy(O);
		H(i);
		let a = yy(D);
		R([a[0] - r[0], a[1] - r[1]]), Te();
	}), De = S.slice(0, me), Oe = S.slice(J + 1), ke = [...De, ...Oe], Ae = ee.get(o), { style: je } = Jv({
		activeTabOffset: Ae,
		horizontal: A,
		indicator: v,
		rtl: s
	});
	(0, g.useEffect)(() => {
		Y();
	}, [
		o,
		se,
		ce,
		sy(Ae),
		sy(ee),
		A
	]), (0, g.useEffect)(() => {
		Ee();
	}, [s]);
	let Me = !!ke.length, Ne = `${x}-nav-wrap`, Pe, Fe, Ie, Le;
	return A ? s ? (Fe = j > 0, Pe = j !== ce) : (Pe = j < 0, Fe = j !== se) : (Ie = N < 0, Le = N !== se), /*#__PURE__*/ g.createElement(Et, { onResize: Ee }, /*#__PURE__*/ g.createElement("div", {
		ref: ne(t, C),
		role: "tablist",
		"aria-orientation": A ? "horizontal" : "vertical",
		className: Z(`${x}-nav`, n, y?.header),
		style: {
			...b?.header,
			...r
		},
		onKeyDown: () => {
			fe();
		}
	}, /*#__PURE__*/ g.createElement(fy, {
		ref: w,
		position: "left",
		extra: c,
		prefixCls: x
	}), /*#__PURE__*/ g.createElement(Et, { onResize: Ee }, /*#__PURE__*/ g.createElement("div", {
		className: Z(Ne, {
			[`${Ne}-ping-left`]: Pe,
			[`${Ne}-ping-right`]: Fe,
			[`${Ne}-ping-top`]: Ie,
			[`${Ne}-ping-bottom`]: Le
		}),
		ref: E
	}, /*#__PURE__*/ g.createElement(Et, { onResize: Ee }, /*#__PURE__*/ g.createElement("div", {
		ref: D,
		className: `${x}-nav-list`,
		style: {
			transform: `translate(${j}px, ${N}px)`,
			transition: ue ? "none" : void 0
		}
	}, we, /*#__PURE__*/ g.createElement(dy, {
		ref: k,
		prefixCls: x,
		locale: u,
		editable: l,
		style: {
			...we.length === 0 ? void 0 : X,
			visibility: Me ? "hidden" : null
		}
	}), /*#__PURE__*/ g.createElement("div", {
		className: Z(`${x}-ink-bar`, y?.indicator, { [`${x}-ink-bar-animated`]: a.inkBar }),
		style: {
			...je,
			...b?.indicator
		}
	}))))), /*#__PURE__*/ g.createElement(hy, _y({}, e, {
		removeAriaLabel: u?.removeAriaLabel,
		ref: O,
		prefixCls: x,
		tabs: ke,
		className: !Me && oe,
		popupStyle: b?.popup,
		tabMoving: !!ue
	})), /*#__PURE__*/ g.createElement(fy, {
		ref: T,
		position: "right",
		extra: c,
		prefixCls: x
	})));
}), Sy = ({ renderTabBar: e, ...t }) => e ? e(t, xy) : /*#__PURE__*/ g.createElement(xy, t), Cy = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { prefixCls: n, className: r, style: i, id: a, active: o, tabKey: s, children: c } = e, l = g.Children.count(c) > 0;
	return /*#__PURE__*/ g.createElement("div", {
		id: a && `${a}-panel-${s}`,
		role: "tabpanel",
		tabIndex: o && l ? 0 : -1,
		"aria-labelledby": a && `${a}-tab-${s}`,
		"aria-hidden": !o,
		style: i,
		className: Z(n, o && `${n}-active`, r),
		ref: t
	}, c);
});
// node_modules/@rc-component/tabs/es/TabPanelList/index.js
function wy() {
	return wy = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, wy.apply(this, arguments);
}
var Ty = (e) => {
	let { id: t, activeKey: n, animated: r, tabPosition: i, destroyOnHidden: a, bodyStyle: o, bodyClassName: s, contentStyle: c, contentClassName: l } = e, { prefixCls: u, tabs: d } = g.useContext(qv), f = r.tabPane, p = `${u}-body`, m = `${u}-content`;
	return /*#__PURE__*/ g.createElement("div", { className: Z(`${p}-holder`) }, /*#__PURE__*/ g.createElement("div", {
		className: Z(p, `${p}-${i}`, { [`${p}-animated`]: f }, s),
		style: o
	}, d.map((e) => {
		let { key: i, forceRender: o, style: s, className: u, destroyOnHidden: d, ...p } = e, h = i === n;
		return /*#__PURE__*/ g.createElement(ic, wy({
			key: i,
			visible: h,
			forceRender: o,
			removeOnLeave: !!(a ?? d),
			leavedClassName: `${m}-hidden`
		}, r.tabPaneMotion), ({ style: e, className: n }, r) => /*#__PURE__*/ g.createElement(Cy, wy({}, p, {
			prefixCls: m,
			id: t,
			tabKey: i,
			animated: f,
			active: h,
			style: {
				...c,
				...s,
				...e
			},
			className: Z(l, u, n),
			ref: r
		})));
	})));
};
// node_modules/@rc-component/tabs/es/hooks/useAnimateConfig.js
function Ey(e = {
	inkBar: !0,
	tabPane: !1
}) {
	let t;
	return t = e === !1 ? {
		inkBar: !1,
		tabPane: !1
	} : e === !0 ? {
		inkBar: !0,
		tabPane: !1
	} : {
		inkBar: !0,
		...typeof e == "object" ? e : {}
	}, t.tabPaneMotion && t.tabPane === void 0 && (t.tabPane = !0), !t.tabPaneMotion && t.tabPane && (t.tabPane = !1), t;
}
// node_modules/@rc-component/tabs/es/Tabs.js
function Dy() {
	return Dy = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Dy.apply(this, arguments);
}
var Oy = 0, ky = /* @__PURE__ */ g.forwardRef((e, t) => {
	let { id: n, prefixCls: r = "rc-tabs", className: i, items: a, direction: o, activeKey: s, defaultActiveKey: c, editable: l, animated: u, tabPosition: d = "top", tabBarGutter: f, tabBarStyle: p, tabBarExtraContent: m, locale: h, more: _, destroyOnHidden: v, renderTabBar: y, onChange: b, onTabClick: x, onTabScroll: S, getPopupContainer: w, popupClassName: T, indicator: E, classNames: D, styles: O, ...k } = e, A = g.useMemo(() => (a || []).filter((e) => e && typeof e == "object" && "key" in e), [a]), j = o === "rtl", M = Ey(u), [N, P] = (0, g.useState)(!1);
	(0, g.useEffect)(() => {
		P(Be());
	}, []);
	let [F, I] = C(c ?? A[0]?.key, s), [L, R] = (0, g.useState)(() => A.findIndex((e) => e.key === F));
	(0, g.useEffect)(() => {
		let e = A.findIndex((e) => e.key === F);
		e === -1 && (e = Math.max(0, Math.min(L, A.length - 1)), I(A[e]?.key)), R(e);
	}, [
		A.map((e) => e.key).join("_"),
		F,
		L
	]);
	let [z, B] = C(null, n);
	(0, g.useEffect)(() => {
		n || (B(`rc-tabs-${Oy}`), Oy += 1);
	}, []);
	function V(e, t) {
		x?.(e, t);
		let n = e !== F;
		I(e), n && b?.(e);
	}
	let H = {
		id: z,
		activeKey: F,
		animated: M,
		tabPosition: d,
		rtl: j,
		mobile: N
	}, U = {
		...H,
		editable: l,
		locale: h,
		more: _,
		tabBarGutter: f,
		onTabClick: V,
		onTabScroll: S,
		extra: m,
		style: p,
		getPopupContainer: w,
		popupClassName: Z(T, D?.popup),
		indicator: E,
		styles: O,
		classNames: D
	}, W = g.useMemo(() => ({
		tabs: A,
		prefixCls: r
	}), [A, r]);
	return /*#__PURE__*/ g.createElement(qv.Provider, { value: W }, /*#__PURE__*/ g.createElement("div", Dy({
		ref: t,
		id: n,
		className: Z(r, `${r}-${d}`, {
			[`${r}-mobile`]: N,
			[`${r}-editable`]: l,
			[`${r}-rtl`]: j
		}, i)
	}, k), /*#__PURE__*/ g.createElement(Sy, Dy({}, U, { renderTabBar: y })), /*#__PURE__*/ g.createElement(Ty, Dy({ destroyOnHidden: v }, H, {
		bodyStyle: O?.body,
		bodyClassName: D?.body,
		contentStyle: O?.content,
		contentClassName: D?.content,
		animated: M
	}))));
}), Ay = {
	motionAppear: !1,
	motionEnter: !0,
	motionLeave: !0
};
function jy(e, t = {
	inkBar: !0,
	tabPane: !1
}) {
	let n;
	return n = t === !1 ? {
		inkBar: !1,
		tabPane: !1
	} : t === !0 ? {
		inkBar: !0,
		tabPane: !0
	} : {
		inkBar: !0,
		...sc(t) ? t : {}
	}, n.tabPane && (n.tabPaneMotion = {
		...Ay,
		motionName: Du(e, "switch")
	}), n;
}
// node_modules/antd/es/tabs/hooks/useLegacyItems.js
function My(e) {
	return e.filter((e) => e);
}
function Ny(e, t) {
	return e ? e.map((e) => ({
		...e,
		destroyOnHidden: e.destroyOnHidden ?? e.destroyInactiveTabPane
	})) : My(qe(t).map((e) => {
		if (/*#__PURE__*/ g.isValidElement(e)) {
			let { key: t, props: n } = e, { tab: r, ...i } = n || {};
			return {
				key: String(t),
				...i,
				label: r
			};
		}
		return null;
	}));
}
// node_modules/antd/es/tabs/style/motion.js
var Py = (e) => {
	let { componentCls: t, motionDurationSlow: n } = e;
	return [{ [t]: { [`${t}-switch`]: {
		"&-appear, &-enter": {
			transition: "none",
			"&-start": { opacity: 0 },
			"&-active": {
				opacity: 1,
				transition: `opacity ${n}`
			}
		},
		"&-leave": {
			position: "absolute",
			transition: "none",
			inset: 0,
			"&-start": { opacity: 1 },
			"&-active": {
				opacity: 0,
				transition: `opacity ${n}`
			}
		}
	} } }, [yd(e, "slide-up"), yd(e, "slide-down")]];
}, Fy = (e) => {
	let { componentCls: t, tabsCardPadding: n, cardBg: r, cardGutter: i, colorBorderSecondary: a, itemSelectedColor: o } = e;
	return { [`${t}-card`]: {
		[`> ${t}-nav, > div > ${t}-nav`]: {
			[`${t}-tab`]: {
				margin: 0,
				padding: n,
				background: r,
				border: `${Q(e.lineWidth)} ${e.lineType} ${a}`,
				transition: `all ${e.motionDurationSlow} ${e.motionEaseInOut}`
			},
			[`${t}-tab-active`]: {
				color: o,
				background: e.colorBgContainer
			},
			[`${t}-tab-focus:has(${t}-tab-btn:focus-visible)`]: mo(e, -3),
			[`& ${t}-tab${t}-tab-focus ${t}-tab-btn:focus-visible`]: { outline: "none" },
			[`${t}-ink-bar`]: { visibility: "hidden" }
		},
		[`&${t}-top, &${t}-bottom`]: { [`> ${t}-nav, > div > ${t}-nav`]: { [`${t}-tab + ${t}-tab`]: { marginLeft: {
			_skip_check_: !0,
			value: Q(i)
		} } } },
		[`&${t}-top`]: { [`> ${t}-nav, > div > ${t}-nav`]: {
			[`${t}-tab`]: { borderRadius: `${Q(e.borderRadiusLG)} ${Q(e.borderRadiusLG)} 0 0` },
			[`${t}-tab-active`]: { borderBottomColor: e.colorBgContainer }
		} },
		[`&${t}-bottom`]: { [`> ${t}-nav, > div > ${t}-nav`]: {
			[`${t}-tab`]: { borderRadius: `0 0 ${Q(e.borderRadiusLG)} ${Q(e.borderRadiusLG)}` },
			[`${t}-tab-active`]: { borderTopColor: e.colorBgContainer }
		} },
		[`&${t}-left, &${t}-right`]: { [`> ${t}-nav, > div > ${t}-nav`]: { [`${t}-tab + ${t}-tab`]: { marginTop: Q(i) } } },
		[`&${t}-left`]: { [`> ${t}-nav, > div > ${t}-nav`]: {
			[`${t}-tab`]: { borderRadius: {
				_skip_check_: !0,
				value: `${Q(e.borderRadiusLG)} 0 0 ${Q(e.borderRadiusLG)}`
			} },
			[`${t}-tab-active`]: { borderRightColor: {
				_skip_check_: !0,
				value: e.colorBgContainer
			} }
		} },
		[`&${t}-right`]: { [`> ${t}-nav, > div > ${t}-nav`]: {
			[`${t}-tab`]: { borderRadius: {
				_skip_check_: !0,
				value: `0 ${Q(e.borderRadiusLG)} ${Q(e.borderRadiusLG)} 0`
			} },
			[`${t}-tab-active`]: { borderLeftColor: {
				_skip_check_: !0,
				value: e.colorBgContainer
			} }
		} }
	} };
}, Iy = (e) => {
	let { antCls: t, componentCls: n, itemHoverColor: r, dropdownEdgeChildVerticalPadding: i } = e;
	return { [`${n}-dropdown`]: {
		...lo(e),
		position: "absolute",
		top: -9999,
		left: {
			_skip_check_: !0,
			value: -9999
		},
		zIndex: e.zIndexPopup,
		display: "block",
		"&-hidden": { display: "none" },
		[`&${t}-slide-down-enter${t}-slide-down-enter-active${n}-dropdown-placement-bottomLeft,
        &${t}-slide-down-appear${t}-slide-down-appear-active${n}-dropdown-placement-bottomLeft,
        &${t}-slide-down-enter${t}-slide-down-enter-active${n}-dropdown-placement-bottom,
        &${t}-slide-down-appear${t}-slide-down-appear-active${n}-dropdown-placement-bottom,
        &${t}-slide-down-enter${t}-slide-down-enter-active${n}-dropdown-placement-bottomRight,
        &${t}-slide-down-appear${t}-slide-down-appear-active${n}-dropdown-placement-bottomRight`]: { animationName: ud },
		[`&${t}-slide-up-enter${t}-slide-up-enter-active${n}-dropdown-placement-topLeft,
        &${t}-slide-up-appear${t}-slide-up-appear-active${n}-dropdown-placement-topLeft,
        &${t}-slide-up-enter${t}-slide-up-enter-active${n}-dropdown-placement-top,
        &${t}-slide-up-appear${t}-slide-up-appear-active${n}-dropdown-placement-top,
        &${t}-slide-up-enter${t}-slide-up-enter-active${n}-dropdown-placement-topRight,
        &${t}-slide-up-appear${t}-slide-up-appear-active${n}-dropdown-placement-topRight`]: { animationName: fd },
		[`&${t}-slide-down-leave${t}-slide-down-leave-active${n}-dropdown-placement-bottomLeft,
        &${t}-slide-down-leave${t}-slide-down-leave-active${n}-dropdown-placement-bottom,
        &${t}-slide-down-leave${t}-slide-down-leave-active${n}-dropdown-placement-bottomRight`]: { animationName: dd },
		[`&${t}-slide-up-leave${t}-slide-up-leave-active${n}-dropdown-placement-topLeft,
        &${t}-slide-up-leave${t}-slide-up-leave-active${n}-dropdown-placement-top,
        &${t}-slide-up-leave${t}-slide-up-leave-active${n}-dropdown-placement-topRight`]: { animationName: pd },
		[`${n}-dropdown-menu`]: {
			maxHeight: e.tabsDropdownHeight,
			margin: 0,
			padding: `${Q(i)} 0`,
			overflowX: "hidden",
			overflowY: "auto",
			textAlign: {
				_skip_check_: !0,
				value: "left"
			},
			listStyleType: "none",
			backgroundColor: e.colorBgContainer,
			backgroundClip: "padding-box",
			borderRadius: e.borderRadiusLG,
			outline: "none",
			boxShadow: e.boxShadowSecondary,
			"&-item": {
				...co,
				display: "flex",
				alignItems: "center",
				minWidth: e.tabsDropdownWidth,
				margin: 0,
				padding: `${Q(e.paddingXXS)} ${Q(e.paddingSM)}`,
				color: e.colorText,
				fontWeight: 400,
				fontSize: e.fontSize,
				lineHeight: e.lineHeight,
				cursor: "pointer",
				transition: `all ${e.motionDurationSlow}`,
				"> span": {
					flex: 1,
					whiteSpace: "nowrap"
				},
				"&-remove": {
					flex: "none",
					marginLeft: {
						_skip_check_: !0,
						value: e.marginSM
					},
					color: e.colorIcon,
					fontSize: e.fontSizeSM,
					background: "transparent",
					border: 0,
					cursor: "pointer",
					"&:hover": { color: r }
				},
				"&:hover": { background: e.controlItemBgHover },
				"&-disabled": { "&, &:hover": {
					color: e.colorTextDisabled,
					background: "transparent",
					cursor: "not-allowed"
				} }
			}
		}
	} };
}, Ly = (e) => {
	let { componentCls: t, margin: n, colorBorderSecondary: r, horizontalMargin: i, verticalItemPadding: a, verticalItemMargin: o, motionDurationSlow: s, calc: c } = e;
	return {
		[`${t}-top, ${t}-bottom`]: {
			flexDirection: "column",
			[`> ${t}-nav, > div > ${t}-nav`]: {
				margin: i,
				"&::before": {
					position: "absolute",
					right: {
						_skip_check_: !0,
						value: 0
					},
					left: {
						_skip_check_: !0,
						value: 0
					},
					borderBottom: `${Q(e.lineWidth)} ${e.lineType} ${r}`,
					content: "''"
				},
				[`${t}-ink-bar`]: {
					height: e.lineWidthBold,
					"&-animated": { transition: [
						"width",
						"left",
						"right"
					].map((e) => `${e} ${s}`).join(", ") }
				},
				[`${t}-nav-wrap`]: {
					"&::before, &::after": {
						top: 0,
						bottom: 0,
						width: e.controlHeight
					},
					"&::before": {
						left: {
							_skip_check_: !0,
							value: 0
						},
						boxShadow: e.boxShadowTabsOverflowLeft
					},
					"&::after": {
						right: {
							_skip_check_: !0,
							value: 0
						},
						boxShadow: e.boxShadowTabsOverflowRight
					},
					[`&${t}-nav-wrap-ping-left::before`]: { opacity: 1 },
					[`&${t}-nav-wrap-ping-right::after`]: { opacity: 1 }
				}
			}
		},
		[`${t}-top`]: { [`> ${t}-nav,
        > div > ${t}-nav`]: {
			"&::before": { bottom: 0 },
			[`${t}-ink-bar`]: { bottom: 0 }
		} },
		[`${t}-bottom`]: {
			[`> ${t}-nav, > div > ${t}-nav`]: {
				order: 1,
				marginTop: n,
				marginBottom: 0,
				"&::before": { top: 0 },
				[`${t}-ink-bar`]: { top: 0 }
			},
			[`> ${t}-body-holder, > div > ${t}-body-holder`]: { order: 0 }
		},
		[`${t}-left, ${t}-right`]: { [`> ${t}-nav, > div > ${t}-nav`]: {
			flexDirection: "column",
			minWidth: c(e.controlHeight).mul(1.25).equal(),
			[`${t}-tab`]: {
				padding: a,
				textAlign: "center"
			},
			[`${t}-tab + ${t}-tab`]: { margin: o },
			[`${t}-nav-wrap`]: {
				flexDirection: "column",
				"&::before, &::after": {
					right: {
						_skip_check_: !0,
						value: 0
					},
					left: {
						_skip_check_: !0,
						value: 0
					},
					height: e.controlHeight
				},
				"&::before": {
					top: 0,
					boxShadow: e.boxShadowTabsOverflowTop
				},
				"&::after": {
					bottom: 0,
					boxShadow: e.boxShadowTabsOverflowBottom
				},
				[`&${t}-nav-wrap-ping-top::before`]: { opacity: 1 },
				[`&${t}-nav-wrap-ping-bottom::after`]: { opacity: 1 }
			},
			[`${t}-ink-bar`]: {
				width: e.lineWidthBold,
				"&-animated": { transition: ["height", "top"].map((e) => `${e} ${s}`).join(", ") }
			},
			[`${t}-nav-list, ${t}-nav-operations`]: {
				flex: "1 0 auto",
				flexDirection: "column"
			}
		} },
		[`${t}-left`]: {
			[`> ${t}-nav, > div > ${t}-nav`]: { [`${t}-ink-bar`]: { right: {
				_skip_check_: !0,
				value: 0
			} } },
			[`> ${t}-body-holder, > div > ${t}-body-holder`]: {
				marginLeft: {
					_skip_check_: !0,
					value: Q(c(e.lineWidth).mul(-1).equal())
				},
				borderLeft: {
					_skip_check_: !0,
					value: `${Q(e.lineWidth)} ${e.lineType} ${e.colorBorder}`
				},
				[`> ${t}-body > ${t}-content`]: { paddingLeft: {
					_skip_check_: !0,
					value: e.paddingLG
				} }
			}
		},
		[`${t}-right`]: {
			[`> ${t}-nav, > div > ${t}-nav`]: {
				order: 1,
				[`${t}-ink-bar`]: { left: {
					_skip_check_: !0,
					value: 0
				} }
			},
			[`> ${t}-body-holder, > div > ${t}-body-holder`]: {
				order: 0,
				marginRight: {
					_skip_check_: !0,
					value: c(e.lineWidth).mul(-1).equal()
				},
				borderRight: {
					_skip_check_: !0,
					value: `${Q(e.lineWidth)} ${e.lineType} ${e.colorBorder}`
				},
				[`> ${t}-body > ${t}-content`]: { paddingRight: {
					_skip_check_: !0,
					value: e.paddingLG
				} }
			}
		}
	};
}, Ry = (e) => {
	let { componentCls: t, cardPaddingSM: n, cardPaddingLG: r, cardHeightSM: i, cardHeightLG: a, horizontalItemPaddingSM: o, horizontalItemPaddingLG: s } = e;
	return {
		[t]: {
			"&-small": { [`> ${t}-nav`]: { [`${t}-tab`]: {
				padding: o,
				fontSize: e.titleFontSizeSM
			} } },
			"&-large": { [`> ${t}-nav`]: { [`${t}-tab`]: {
				padding: s,
				fontSize: e.titleFontSizeLG,
				lineHeight: e.lineHeightLG
			} } }
		},
		[`${t}-card`]: {
			[`&${t}-small`]: {
				[`> ${t}-nav`]: {
					[`${t}-tab`]: { padding: n },
					[`${t}-nav-add`]: {
						minWidth: i,
						minHeight: i
					}
				},
				[`&${t}-bottom`]: { [`> ${t}-nav ${t}-tab`]: { borderRadius: `0 0 ${Q(e.borderRadius)} ${Q(e.borderRadius)}` } },
				[`&${t}-top`]: { [`> ${t}-nav ${t}-tab`]: { borderRadius: `${Q(e.borderRadius)} ${Q(e.borderRadius)} 0 0` } },
				[`&${t}-right`]: { [`> ${t}-nav ${t}-tab`]: { borderRadius: {
					_skip_check_: !0,
					value: `0 ${Q(e.borderRadius)} ${Q(e.borderRadius)} 0`
				} } },
				[`&${t}-left`]: { [`> ${t}-nav ${t}-tab`]: { borderRadius: {
					_skip_check_: !0,
					value: `${Q(e.borderRadius)} 0 0 ${Q(e.borderRadius)}`
				} } }
			},
			[`&${t}-large`]: { [`> ${t}-nav`]: {
				[`${t}-tab`]: { padding: r },
				[`${t}-nav-add`]: {
					minWidth: a,
					minHeight: a
				}
			} }
		}
	};
}, zy = (e) => {
	let { componentCls: t, itemActiveColor: n, itemHoverColor: r, iconCls: i, tabsHorizontalItemMargin: a, horizontalItemPadding: o, itemSelectedColor: s, itemColor: c } = e, l = `${t}-tab`;
	return {
		[l]: {
			position: "relative",
			WebkitTouchCallout: "none",
			WebkitTapHighlightColor: "transparent",
			display: "inline-flex",
			alignItems: "center",
			padding: o,
			fontSize: e.titleFontSize,
			background: "transparent",
			border: 0,
			outline: "none",
			cursor: "pointer",
			color: c,
			"&-btn, &-remove": { "&:focus:not(:focus-visible), &:active": { color: n } },
			"&-btn": {
				outline: "none",
				transition: `all ${e.motionDurationSlow}`,
				[`${l}-icon:not(:last-child)`]: { marginInlineEnd: e.marginSM },
				[`${l}-icon > svg`]: {
					display: "inline-block",
					verticalAlign: "middle",
					marginBlockEnd: "0.2em"
				}
			},
			"&-remove": {
				flex: "none",
				lineHeight: 1,
				marginRight: {
					_skip_check_: !0,
					value: e.calc(e.marginXXS).mul(-1).equal()
				},
				marginLeft: {
					_skip_check_: !0,
					value: e.marginXS
				},
				color: e.colorIcon,
				fontSize: e.fontSizeSM,
				background: "transparent",
				border: "none",
				outline: "none",
				cursor: "pointer",
				transition: `all ${e.motionDurationSlow}`,
				"&:hover": { color: e.colorTextHeading },
				...ho(e)
			},
			"&:hover": { color: r },
			[`&${l}-active ${l}-btn`]: { color: s },
			[`&${l}-focus ${l}-btn:focus-visible`]: mo(e),
			[`&${l}-disabled`]: {
				color: e.colorTextDisabled,
				cursor: "not-allowed"
			},
			[`&${l}-disabled ${l}-btn, &${l}-disabled ${t}-remove`]: { "&:focus, &:active": { color: e.colorTextDisabled } },
			[`& ${l}-remove ${i}`]: {
				margin: 0,
				verticalAlign: "middle"
			},
			[`${i}:not(:last-child)`]: { marginRight: {
				_skip_check_: !0,
				value: e.marginSM
			} }
		},
		[`${l} + ${l}`]: { margin: {
			_skip_check_: !0,
			value: a
		} }
	};
}, By = (e) => {
	let { componentCls: t, tabsHorizontalItemMarginRTL: n, iconCls: r, cardGutter: i, calc: a } = e;
	return {
		[`${t}-rtl`]: {
			direction: "rtl",
			[`${t}-nav`]: { [`${t}-tab`]: {
				margin: {
					_skip_check_: !0,
					value: n
				},
				[`${t}-tab:last-of-type`]: { marginLeft: {
					_skip_check_: !0,
					value: 0
				} },
				[r]: {
					marginRight: {
						_skip_check_: !0,
						value: 0
					},
					marginLeft: {
						_skip_check_: !0,
						value: e.marginSM
					}
				},
				[`${t}-tab-remove`]: {
					marginRight: {
						_skip_check_: !0,
						value: e.marginXS
					},
					marginLeft: {
						_skip_check_: !0,
						value: a(e.marginXXS).mul(-1).equal()
					},
					[r]: { margin: 0 }
				}
			} },
			[`&${t}-left`]: {
				[`> ${t}-nav`]: { order: 1 },
				[`> ${t}-body-holder`]: { order: 0 }
			},
			[`&${t}-right`]: {
				[`> ${t}-nav`]: { order: 0 },
				[`> ${t}-body-holder`]: { order: 1 }
			},
			[`&${t}-card${t}-top, &${t}-card${t}-bottom`]: { [`> ${t}-nav, > div > ${t}-nav`]: { [`${t}-tab + ${t}-tab`]: {
				marginRight: {
					_skip_check_: !0,
					value: i
				},
				marginLeft: {
					_skip_check_: !0,
					value: 0
				}
			} } }
		},
		[`${t}-dropdown-rtl`]: { direction: "rtl" },
		[`${t}-menu-item`]: { [`${t}-dropdown-rtl`]: { textAlign: {
			_skip_check_: !0,
			value: "right"
		} } }
	};
}, Vy = (e) => {
	let { componentCls: t, tabsCardPadding: n, cardHeight: r, cardGutter: i, itemHoverColor: a, itemActiveColor: o, colorBorderSecondary: s } = e;
	return {
		[t]: {
			...lo(e),
			display: "flex",
			[`> ${t}-nav, > div > ${t}-nav`]: {
				position: "relative",
				display: "flex",
				flex: "none",
				alignItems: "center",
				[`${t}-nav-wrap`]: {
					position: "relative",
					display: "flex",
					flex: "auto",
					alignSelf: "stretch",
					overflow: "hidden",
					whiteSpace: "nowrap",
					transform: "translate(0)",
					"&::before, &::after": {
						position: "absolute",
						zIndex: 1,
						opacity: 0,
						transition: `opacity ${e.motionDurationSlow}`,
						content: "''",
						pointerEvents: "none"
					}
				},
				[`${t}-nav-list`]: {
					position: "relative",
					display: "flex",
					transition: `opacity ${e.motionDurationSlow}`
				},
				[`${t}-nav-operations`]: {
					display: "flex",
					alignSelf: "stretch"
				},
				[`${t}-nav-operations-hidden`]: {
					position: "absolute",
					visibility: "hidden",
					pointerEvents: "none"
				},
				[`${t}-nav-more`]: {
					position: "relative",
					padding: n,
					background: "transparent",
					border: 0,
					color: e.colorText,
					"&::after": {
						position: "absolute",
						right: {
							_skip_check_: !0,
							value: 0
						},
						bottom: 0,
						left: {
							_skip_check_: !0,
							value: 0
						},
						height: e.calc(e.controlHeightLG).div(8).equal(),
						transform: "translateY(100%)",
						content: "''"
					}
				},
				[`${t}-nav-add`]: {
					minWidth: r,
					minHeight: r,
					marginLeft: {
						_skip_check_: !0,
						value: i
					},
					background: "transparent",
					border: `${Q(e.lineWidth)} ${e.lineType} ${s}`,
					borderRadius: `${Q(e.borderRadiusLG)} ${Q(e.borderRadiusLG)} 0 0`,
					outline: "none",
					cursor: "pointer",
					color: e.colorText,
					transition: `all ${e.motionDurationSlow} ${e.motionEaseInOut}`,
					"&:hover": { color: a },
					"&:active, &:focus:not(:focus-visible)": { color: o },
					...ho(e, -3)
				}
			},
			[`${t}-extra-content`]: { flex: "none" },
			[`${t}-ink-bar`]: {
				position: "absolute",
				background: e.inkBarColor,
				pointerEvents: "none"
			},
			...zy(e),
			[`${t}-body`]: {
				position: "relative",
				width: "100%"
			},
			[`${t}-body-holder`]: {
				flex: "auto",
				minWidth: 0,
				minHeight: 0
			},
			[`${t}-content`]: {
				...ho(e),
				"&-hidden": { display: "none" }
			}
		},
		[`${t}-centered`]: { [`> ${t}-nav, > div > ${t}-nav`]: { [`${t}-nav-wrap`]: { [`&:not([class*='${t}-nav-wrap-ping']) > ${t}-nav-list`]: { margin: "auto" } } } }
	};
}, Hy = yo("Tabs", (e) => {
	let t = ji(e, {
		tabsCardPadding: e.cardPadding,
		dropdownEdgeChildVerticalPadding: e.paddingXXS,
		tabsDropdownHeight: 200,
		tabsDropdownWidth: 120,
		tabsHorizontalItemMargin: `0 0 0 ${Q(e.horizontalItemGutter)}`,
		tabsHorizontalItemMarginRTL: `0 0 0 ${Q(e.horizontalItemGutter)}`
	});
	return [
		Ry(t),
		By(t),
		Ly(t),
		Iy(t),
		Fy(t),
		Vy(t),
		Py(t)
	];
}, (e) => {
	let { cardHeight: t, cardHeightSM: n, cardHeightLG: r, controlHeight: i, controlHeightLG: a } = e, o = t || a, s = n || i, c = r || a + 8;
	return {
		zIndexPopup: e.zIndexPopupBase + 50,
		cardBg: e.colorFillAlter,
		cardHeight: o,
		cardHeightSM: s,
		cardHeightLG: c,
		cardPadding: `${(o - e.fontHeight) / 2 - e.lineWidth}px ${e.padding}px`,
		cardPaddingSM: `${(s - e.fontHeight) / 2 - e.lineWidth}px ${e.paddingXS}px`,
		cardPaddingLG: `${(c - e.fontHeightLG) / 2 - e.lineWidth}px ${e.padding}px`,
		titleFontSize: e.fontSize,
		titleFontSizeLG: e.fontSizeLG,
		titleFontSizeSM: e.fontSize,
		inkBarColor: e.colorPrimary,
		horizontalMargin: `0 0 ${e.margin}px 0`,
		horizontalItemGutter: 32,
		horizontalItemMargin: "",
		horizontalItemMarginRTL: "",
		horizontalItemPadding: `${e.paddingSM}px 0`,
		horizontalItemPaddingSM: `${e.paddingXS}px 0`,
		horizontalItemPaddingLG: `${e.padding}px 0`,
		verticalItemPadding: `${e.paddingXS}px ${e.paddingLG}px`,
		verticalItemMargin: `${e.margin}px 0 0 0`,
		itemColor: e.colorText,
		itemSelectedColor: e.colorPrimary,
		itemHoverColor: e.colorPrimaryHover,
		itemActiveColor: e.colorPrimaryActive,
		cardGutter: e.marginXXS / 2
	};
}), Uy = () => null, Wy = /* @__PURE__ */ g.forwardRef((e, t) => {
	let { type: n, className: r, rootClassName: i, size: a, onEdit: o, hideAdd: s, centered: c, addIcon: l, removeIcon: u, moreIcon: d, more: f, popupClassName: p, children: m, items: h, animated: _, style: v, indicatorSize: y, indicator: b, classNames: x, styles: S, destroyInactiveTabPane: C, destroyOnHidden: w, tabPlacement: T, tabPosition: E, ...D } = e, { prefixCls: O } = D, { getPrefixCls: k, direction: A, getPopupContainer: j, className: M, style: N, classNames: P, styles: F } = zt("tabs"), { tabs: I } = g.useContext(It), L = k("tabs", O), R = Oc(L), [z, B] = Hy(L, R), V = g.useRef(null);
	g.useImperativeHandle(t, () => ({ nativeElement: V.current }));
	let H;
	n === "editable-card" && (H = {
		onEdit: (e, { key: t, event: n }) => {
			o?.(e === "add" ? n : t, e);
		},
		removeIcon: u ?? I?.removeIcon ?? /*#__PURE__*/ g.createElement(cs, null),
		addIcon: (l ?? I?.addIcon) || /*#__PURE__*/ g.createElement(Kv, null),
		showAdd: s !== !0
	});
	let U = k(), W = Ru(a), ee = Ny(h, m), te = jy(L, _), ne = {
		align: b?.align ?? I?.indicator?.align,
		size: b?.size ?? y ?? I?.indicator?.size ?? I?.indicatorSize
	}, re = g.useMemo(() => {
		let e = T ?? E ?? void 0, t = A === "rtl";
		switch (e) {
			case "start": return t ? "right" : "left";
			case "end": return t ? "left" : "right";
			default: return e;
		}
	}, [
		T,
		E,
		A
	]), ie = {
		...e,
		size: W,
		tabPlacement: re,
		items: ee
	}, ae = mc(N), G = mc(v), [K, oe] = gc([P, x], [
		F,
		ae,
		S,
		G
	], { props: ie }, { popup: { _default: "root" } });
	return /*#__PURE__*/ g.createElement(ky, {
		ref: V,
		direction: A,
		getPopupContainer: j,
		...D,
		items: ee,
		className: Z({
			[`${L}-large`]: W === "large",
			[`${L}-small`]: W === "small",
			[`${L}-card`]: ["card", "editable-card"].includes(n),
			[`${L}-editable-card`]: n === "editable-card",
			[`${L}-centered`]: c
		}, M, r, i, K.root, z, B, R),
		classNames: {
			...K,
			popup: Z(p, z, B, R, K.popup?.root)
		},
		styles: {
			...oe,
			popup: oe.popup?.root
		},
		style: oe.root,
		editable: H,
		more: {
			icon: I?.more?.icon ?? I?.moreIcon ?? d ?? /*#__PURE__*/ g.createElement(Hv, null),
			transitionName: `${U}-slide-up`,
			...f
		},
		prefixCls: L,
		animated: te,
		indicator: ne,
		destroyOnHidden: w ?? C,
		tabPosition: re
	});
});
Wy.TabPane = Uy;
// node_modules/antd/es/card/CardGrid.js
var Gy = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { prefixCls: n, className: r, hoverable: i = !0, ...a } = e, { getPrefixCls: o } = g.useContext(It), s = o("card", n), c = Z(`${s}-grid`, r, { [`${s}-grid-hoverable`]: i }), l = g.useRef(null);
	return g.useImperativeHandle(t, () => ({ nativeElement: l.current })), /*#__PURE__*/ g.createElement("div", {
		ref: l,
		...a,
		className: c
	});
}), Ky = (e) => {
	let { antCls: t, headerHeight: n, headerPadding: r, tabsMarginBottom: i } = e;
	return {
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
		minHeight: n,
		marginBottom: -1,
		padding: `0 ${Q(r)}`,
		color: e.colorTextHeading,
		fontWeight: e.fontWeightStrong,
		fontSize: e.headerFontSize,
		background: e.headerBg,
		borderBottom: `${Q(e.lineWidth)} ${e.lineType} ${e.colorBorderSecondary}`,
		borderRadius: `${Q(e.borderRadiusLG)} ${Q(e.borderRadiusLG)} 0 0`,
		...po(),
		"&-wrapper": {
			width: "100%",
			display: "flex",
			alignItems: "center"
		},
		"&-title": {
			display: "inline-block",
			flex: 1,
			...co,
			[`> ${t}-typography`]: {
				insetInlineStart: 0,
				marginTop: 0,
				marginBottom: 0
			}
		},
		[`${t}-tabs-top`]: {
			clear: "both",
			marginBottom: i,
			color: e.colorText,
			fontWeight: 400,
			fontSize: e.fontSize
		}
	};
}, qy = (e) => {
	let { cardPaddingBase: t, colorBorderSecondary: n, cardShadow: r, lineWidth: i } = e;
	return {
		width: "33.33%",
		padding: t,
		border: 0,
		borderRadius: 0,
		boxShadow: `
      ${Q(i)} 0 0 0 ${n},
      0 ${Q(i)} 0 0 ${n},
      ${Q(i)} ${Q(i)} 0 0 ${n},
      ${Q(i)} 0 0 0 ${n} inset,
      0 ${Q(i)} 0 0 ${n} inset;
    `,
		transition: `all ${e.motionDurationMid}`,
		"&-hoverable:hover": {
			position: "relative",
			zIndex: 1,
			boxShadow: r
		}
	};
}, Jy = (e) => {
	let { componentCls: t, iconCls: n, actionsLiMargin: r, cardActionsIconSize: i, colorBorderSecondary: a, actionsBg: o } = e;
	return {
		margin: 0,
		padding: 0,
		listStyle: "none",
		background: o,
		borderTop: `${Q(e.lineWidth)} ${e.lineType} ${a}`,
		display: "flex",
		borderRadius: `0 0 ${Q(e.borderRadiusLG)} ${Q(e.borderRadiusLG)}`,
		...po(),
		"& > li": {
			margin: r,
			color: e.colorTextDescription,
			textAlign: "center",
			"> span": {
				position: "relative",
				display: "block",
				minWidth: e.calc(e.cardActionsIconSize).mul(2).equal(),
				fontSize: e.fontSize,
				lineHeight: e.lineHeight,
				cursor: "pointer",
				"&:hover": {
					color: e.colorPrimary,
					transition: `color ${e.motionDurationMid}`
				},
				[`a:not(${t}-btn), > ${n}`]: {
					display: "inline-block",
					width: "100%",
					color: e.colorIcon,
					lineHeight: Q(e.fontHeight),
					transition: `color ${e.motionDurationMid}`,
					"&:hover": { color: e.colorPrimary }
				},
				[`> ${n}`]: {
					fontSize: i,
					lineHeight: Q(e.calc(i).mul(e.lineHeight).equal())
				}
			},
			"&:not(:last-child)": { borderInlineEnd: `${Q(e.lineWidth)} ${e.lineType} ${a}` }
		}
	};
}, Yy = (e) => ({
	margin: `${Q(e.calc(e.marginXXS).mul(-1).equal())} 0`,
	display: "flex",
	...po(),
	"&-avatar": { paddingInlineEnd: e.padding },
	"&-section": {
		overflow: "hidden",
		flex: 1,
		"> div:not(:last-child)": { marginBottom: e.marginXS }
	},
	"&-title": {
		color: e.colorTextHeading,
		fontWeight: e.fontWeightStrong,
		fontSize: e.fontSizeLG,
		...co
	},
	"&-description": { color: e.colorTextDescription }
}), Xy = (e) => {
	let { componentCls: t, colorFillAlter: n, headerPadding: r, bodyPadding: i } = e;
	return {
		[`${t}-head`]: {
			padding: `0 ${Q(r)}`,
			background: n,
			"&-title": { fontSize: e.fontSize }
		},
		[`${t}-body`]: { padding: `${Q(e.padding)} ${Q(i)}` }
	};
}, Zy = (e) => {
	let { componentCls: t } = e;
	return {
		overflow: "hidden",
		[`${t}-body`]: { userSelect: "none" }
	};
}, Qy = (e) => {
	let { componentCls: t, cardShadow: n, cardHeadPadding: r, colorBorderSecondary: i, boxShadowTertiary: a, bodyPadding: o, extraColor: s, motionDurationMid: c } = e;
	return {
		[t]: {
			...lo(e),
			position: "relative",
			background: e.colorBgContainer,
			borderRadius: e.borderRadiusLG,
			[`&:not(${t}-bordered)`]: { boxShadow: a },
			[`${t}-head`]: Ky(e),
			[`${t}-extra`]: {
				marginInlineStart: "auto",
				color: s,
				fontWeight: 400,
				fontSize: e.fontSize
			},
			[`${t}-body`]: {
				padding: o,
				borderRadius: `0 0 ${Q(e.borderRadiusLG)} ${Q(e.borderRadiusLG)}`,
				"&:first-child": {
					borderStartStartRadius: e.borderRadiusLG,
					borderStartEndRadius: e.borderRadiusLG
				},
				"&:not(:last-child)": {
					borderEndStartRadius: 0,
					borderEndEndRadius: 0
				}
			},
			[`${t}-grid`]: qy(e),
			[`${t}-cover`]: { "> *": {
				display: "block",
				width: "100%",
				borderRadius: `${Q(e.borderRadiusLG)} ${Q(e.borderRadiusLG)} 0 0`
			} },
			[`${t}-actions`]: Jy(e),
			[`${t}-meta`]: Yy(e)
		},
		[`${t}-bordered`]: {
			border: `${Q(e.lineWidth)} ${e.lineType} ${i}`,
			[`${t}-cover`]: {
				marginTop: -1,
				marginInlineStart: -1,
				marginInlineEnd: -1
			}
		},
		[`${t}-hoverable`]: {
			cursor: "pointer",
			transition: ["box-shadow", "border-color"].map((e) => `${e} ${c}`).join(", "),
			"&:hover": {
				borderColor: "transparent",
				boxShadow: n
			}
		},
		[`${t}-contain-grid`]: {
			borderRadius: `${Q(e.borderRadiusLG)} ${Q(e.borderRadiusLG)} 0 0 `,
			[`&:not(:has(> ${t}-head))`]: { borderRadius: 0 },
			[`${t}-body`]: {
				display: "flex",
				flexWrap: "wrap"
			},
			[`&:not(${t}-loading) ${t}-body`]: {
				marginBlockStart: e.calc(e.lineWidth).mul(-1).equal(),
				marginInlineStart: e.calc(e.lineWidth).mul(-1).equal(),
				padding: 0
			}
		},
		[`${t}-contain-tabs`]: { [`> div${t}-head`]: {
			minHeight: 0,
			[`${t}-head-title, ${t}-extra`]: { paddingTop: r }
		} },
		[`${t}-type-inner`]: Xy(e),
		[`${t}-loading`]: Zy(e),
		[`${t}-rtl`]: { direction: "rtl" }
	};
}, $y = (e) => {
	let { componentCls: t, bodyPaddingSM: n, headerPaddingSM: r, headerHeightSM: i, headerFontSizeSM: a } = e;
	return {
		[`${t}-small`]: {
			[`> ${t}-head`]: {
				minHeight: i,
				padding: `0 ${Q(r)}`,
				fontSize: a,
				[`> ${t}-head-wrapper`]: { [`> ${t}-extra`]: { fontSize: e.fontSize } }
			},
			[`> ${t}-body`]: { padding: n }
		},
		[`${t}-small${t}-contain-tabs`]: { [`> ${t}-head`]: { [`${t}-head-title, ${t}-extra`]: {
			paddingTop: 0,
			display: "flex",
			alignItems: "center"
		} } }
	};
}, eb = yo("Card", (e) => {
	let t = ji(e, {
		cardShadow: e.boxShadowCard,
		cardHeadPadding: e.padding,
		cardPaddingBase: e.paddingLG,
		cardActionsIconSize: e.fontSize
	});
	return [Qy(t), $y(t)];
}, (e) => ({
	headerBg: "transparent",
	headerFontSize: e.fontSizeLG,
	headerFontSizeSM: e.fontSize,
	headerHeight: e.fontSizeLG * e.lineHeightLG + e.padding * 2,
	headerHeightSM: e.fontSize * e.lineHeight + e.paddingXS * 2,
	actionsBg: e.colorBgContainer,
	actionsLiMargin: `${e.paddingSM}px 0`,
	tabsMarginBottom: -e.padding - e.lineWidth,
	extraColor: e.colorText,
	bodyPaddingSM: 12,
	headerPaddingSM: 12,
	bodyPadding: e.bodyPadding ?? e.paddingLG,
	headerPadding: e.headerPadding ?? e.paddingLG
})), tb = (e) => {
	let { actionClasses: t, actions: n = [], actionStyle: r } = e;
	return /*#__PURE__*/ g.createElement("ul", {
		className: t,
		style: r
	}, n.map((e, t) => {
		let r = `action-${t}`;
		return /*#__PURE__*/ g.createElement("li", {
			style: { width: `${100 / n.length}%` },
			key: r
		}, /*#__PURE__*/ g.createElement("span", null, e));
	}));
}, nb = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { prefixCls: n, className: r, rootClassName: i, style: a, extra: o, headStyle: s = {}, bodyStyle: c = {}, title: l, loading: u, bordered: d, variant: f, size: p, type: m, cover: h, actions: _, tabList: v, children: y, activeTabKey: b, defaultActiveTabKey: x, tabBarExtraContent: S, hoverable: C, tabProps: w = {}, classNames: T, styles: E, ...D } = e, { getPrefixCls: O, direction: k, className: A, style: j, classNames: M, styles: N } = zt("card"), [P] = Fg("card", f, d), F = Ru(p), I = {
		...e,
		size: F,
		variant: P
	}, L = mc(j), R = mc(a), [z, B] = gc([M, T], [
		N,
		L,
		E,
		R
	], { props: I }), V = (t) => {
		e.onTabChange?.(t);
	}, H = g.useMemo(() => qe(y), [y]), U = g.useMemo(() => H.some((e) => /*#__PURE__*/ g.isValidElement(e) && e.type === Gy), [H]), W = O("card", n), [ee, te] = eb(W), ne = /*#__PURE__*/ g.createElement(hm, {
		loading: !0,
		active: !0,
		paragraph: { rows: 4 },
		title: !1
	}, y), re = b !== void 0, ie = {
		...w,
		[re ? "activeKey" : "defaultActiveKey"]: re ? b : x ?? w.defaultActiveKey,
		tabBarExtraContent: S
	}, ae, G = F === "small" ? F : "large", K = v ? /*#__PURE__*/ g.createElement(Wy, {
		size: G,
		...ie,
		className: `${W}-head-tabs`,
		onChange: V,
		items: v.map(({ tab: e, ...t }) => ({
			label: e,
			...t
		}))
	}) : null;
	if (Le(l) || Le(o) || K) {
		let e = Z(`${W}-head`, z.header), t = Z(`${W}-head-title`, z.title), n = Z(`${W}-extra`, z.extra), r = {
			...s,
			...B.header
		};
		ae = /*#__PURE__*/ g.createElement("div", {
			className: e,
			style: r
		}, /*#__PURE__*/ g.createElement("div", { className: `${W}-head-wrapper` }, Le(l) && /*#__PURE__*/ g.createElement("div", {
			className: t,
			style: B.title
		}, l), Le(o) && /*#__PURE__*/ g.createElement("div", {
			className: n,
			style: B.extra
		}, o)), K);
	}
	let oe = Z(`${W}-cover`, z.cover), se = Le(h) ? /*#__PURE__*/ g.createElement("div", {
		className: oe,
		style: B.cover
	}, h) : null, ce = Z(`${W}-body`, z.body), q = {
		...c,
		...B.body
	}, le = u || H.length ? /*#__PURE__*/ g.createElement("div", {
		className: ce,
		style: q
	}, u ? ne : y) : null, ue = Z(`${W}-actions`, z.actions), de = _?.length ? /*#__PURE__*/ g.createElement(tb, {
		actionClasses: ue,
		actionStyle: B.actions,
		actions: _
	}) : null, fe = Ve(D, ["onTabChange"]), pe = Z(W, A, {
		[`${W}-loading`]: u,
		[`${W}-bordered`]: P !== "borderless",
		[`${W}-hoverable`]: C,
		[`${W}-contain-grid`]: U,
		[`${W}-contain-tabs`]: v?.length,
		[`${W}-small`]: F === "small",
		[`${W}-type-${m}`]: !!m,
		[`${W}-rtl`]: k === "rtl"
	}, r, i, ee, te, z.root), me = { ...B.root };
	return /*#__PURE__*/ g.createElement("div", {
		ref: t,
		...fe,
		className: pe,
		style: me
	}, ae, se, le, de);
}), rb = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { prefixCls: n, className: r, avatar: i, title: a, description: o, style: s, classNames: c, styles: l, ...u } = e, { getPrefixCls: d, className: f, style: p, classNames: m, styles: h } = zt("cardMeta"), _ = `${d("card", n)}-meta`, v = mc(p), y = mc(s), [b, x] = gc([m, c], [
		h,
		v,
		l,
		y
	], { props: e }), S = Z(_, r, f, b.root), C = { ...x.root }, w = Z(`${_}-avatar`, b.avatar), T = Z(`${_}-title`, b.title), E = Z(`${_}-description`, b.description), D = Z(`${_}-section`, b.section), O = Le(i) ? /*#__PURE__*/ g.createElement("div", {
		className: w,
		style: x.avatar
	}, i) : null, k = Le(a) ? /*#__PURE__*/ g.createElement("div", {
		className: T,
		style: x.title
	}, a) : null, A = Le(o) ? /*#__PURE__*/ g.createElement("div", {
		className: E,
		style: x.description
	}, o) : null, j = k || A ? /*#__PURE__*/ g.createElement("div", {
		className: D,
		style: x.section
	}, k, A) : null, M = g.useRef(null);
	return g.useImperativeHandle(t, () => ({ nativeElement: M.current })), /*#__PURE__*/ g.createElement("div", {
		ref: M,
		...u,
		className: S,
		style: C
	}, O, j);
}), ib = nb;
ib.Grid = Gy, ib.Meta = rb;
// node_modules/antd/es/tag/style/index.js
var ab = (e) => {
	let { paddingXXS: t, lineWidth: n, tagPaddingHorizontal: r, componentCls: i, calc: a } = e, o = a(r).sub(n).equal(), s = a(t).sub(n).equal();
	return {
		[i]: {
			...lo(e),
			display: "inline-block",
			height: "auto",
			paddingInline: o,
			fontSize: e.tagFontSize,
			lineHeight: e.tagLineHeight,
			whiteSpace: "nowrap",
			backgroundColor: e.defaultBg,
			border: `${Q(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,
			borderRadius: e.borderRadiusSM,
			opacity: 1,
			transition: `all ${e.motionDurationMid}`,
			textAlign: "start",
			position: "relative",
			[`&${i}-rtl`]: { direction: "rtl" },
			"&, a, a:hover": { color: e.defaultColor },
			[`${i}-close-icon`]: {
				marginInlineStart: s,
				fontSize: e.tagIconSize,
				color: e.colorIcon,
				cursor: "pointer",
				transition: `all ${e.motionDurationMid}`,
				"&:hover": { color: e.colorTextHeading }
			},
			"&-checkable": {
				backgroundColor: "transparent",
				borderColor: "transparent",
				cursor: "pointer",
				[`&:not(${i}-checkable-checked):hover`]: {
					color: e.colorPrimary,
					backgroundColor: e.colorFillSecondary
				},
				"&:active, &-checked": { color: e.colorTextLightSolid },
				"&-checked": {
					backgroundColor: e.colorPrimary,
					"&:hover": { backgroundColor: e.colorPrimaryHover }
				},
				"&:active": { backgroundColor: e.colorPrimaryActive },
				"&-disabled": {
					cursor: "not-allowed",
					[`&:not(${i}-checkable-checked)`]: {
						color: e.colorTextDisabled,
						"&:hover": { backgroundColor: "transparent" }
					},
					[`&${i}-checkable-checked`]: {
						color: e.colorTextDisabled,
						backgroundColor: e.colorBgContainerDisabled
					},
					"&:hover, &:active": {
						backgroundColor: e.colorBgContainerDisabled,
						color: e.colorTextDisabled
					},
					[`&:not(${i}-checkable-checked):hover`]: { color: e.colorTextDisabled }
				},
				"&-group": {
					display: "flex",
					flexWrap: "wrap",
					gap: e.paddingXS
				}
			},
			"&-hidden": { display: "none" },
			"> svg": {
				display: "inline-block",
				verticalAlign: "middle",
				marginBlockEnd: "0.2em"
			},
			[`> ${e.iconCls} + span, > span + ${e.iconCls}, > svg + span, > span + svg`]: { marginInlineStart: o }
		},
		[`&${e.componentCls}-solid`]: {
			borderColor: "transparent",
			color: e.colorTextLightSolid,
			backgroundColor: e.colorBgSolid,
			[`&${i}-default`]: { color: e.solidTextColor }
		},
		[`${i}-filled`]: {
			borderColor: "transparent",
			backgroundColor: e.tagBorderlessBg
		},
		[`&${i}-disabled`]: {
			color: e.colorTextDisabled,
			cursor: "not-allowed",
			backgroundColor: e.colorBgContainerDisabled,
			a: {
				cursor: "not-allowed",
				pointerEvents: "none",
				color: e.colorTextDisabled,
				"&:hover": { color: e.colorTextDisabled }
			},
			"a&": { "&:hover, &:active": { color: e.colorTextDisabled } },
			[`&${i}-outlined`]: { borderColor: e.colorBorderDisabled },
			[`&${i}-solid, &${i}-filled`]: {
				color: e.colorTextDisabled,
				[`${i}-close-icon`]: { color: e.colorTextDisabled }
			},
			[`${i}-close-icon`]: {
				cursor: "not-allowed",
				color: e.colorTextDisabled,
				"&:hover": { color: e.colorTextDisabled }
			}
		}
	};
}, ob = (e) => {
	let { lineWidth: t, fontSizeIcon: n, calc: r } = e, i = e.fontSizeSM;
	return ji(e, {
		tagFontSize: i,
		tagLineHeight: Q(r(e.lineHeightSM).mul(i).equal()),
		tagIconSize: r(n).sub(r(t).mul(2)).equal(),
		tagPaddingHorizontal: 8,
		tagBorderlessBg: e.defaultBg
	});
}, sb = (e) => {
	let t = Ad(new Od(e.colorBgSolid), "#fff") ? "#000" : "#fff";
	return {
		defaultBg: new $i(e.colorFillTertiary).onBackground(e.colorBgContainer).toHexString(),
		defaultColor: e.colorText,
		solidTextColor: t
	};
}, cb = yo("Tag", (e) => ab(ob(e)), sb), lb = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { prefixCls: n, style: r, className: i, checked: a, children: o, icon: s, onChange: c, onClick: l, onKeyDown: u, disabled: d, ...f } = e, { getPrefixCls: p, tag: m } = g.useContext(It), h = g.useContext(Xl), _ = d ?? h, v = (e) => {
		_ || (c?.(!a), l?.(e));
	}, y = (e) => {
		u?.(e), !(e.defaultPrevented || _) && e.key === " " && (e.preventDefault(), e.repeat || c?.(!a));
	}, b = p("tag", n), [x, S] = cb(b), C = Z(b, `${b}-checkable`, {
		[`${b}-checkable-checked`]: a,
		[`${b}-checkable-disabled`]: _
	}, m?.className, i, x, S);
	return /*#__PURE__*/ g.createElement("span", {
		...f,
		ref: t,
		role: "checkbox",
		"aria-checked": a,
		"aria-disabled": _ || void 0,
		tabIndex: _ ? -1 : 0,
		style: {
			...m?.style,
			...r
		},
		className: C,
		onClick: v,
		onKeyDown: y
	}, s, /*#__PURE__*/ g.createElement("span", null, o));
}), ub = /*#__PURE__*/ g.forwardRef((e, t) => {
	let { id: n, prefixCls: r, rootClassName: i, className: a, style: o, classNames: s, styles: c, disabled: l, options: u, value: d, defaultValue: f, onChange: p, multiple: m, ...h } = e, { getPrefixCls: _, direction: v, className: y, style: b, classNames: x, styles: S } = zt("tag"), w = _("tag", r), T = `${w}-checkable-group`, [E, D] = cb(w, Oc(w)), O = mc(b), k = mc(o), [A, j] = gc([x, s], [
		S,
		O,
		c,
		k
	], { props: e }), M = (0, g.useMemo)(() => Array.isArray(u) ? u.map((e) => sc(e) ? e : {
		value: e,
		label: e
	}) : [], [u]), [N, P] = C(f, d), F = (e, t) => {
		let n = null;
		if (m) {
			let r = N || [];
			n = e ? [].concat(Nt(r), [t.value]) : r.filter((e) => e !== t.value);
		} else n = e ? t.value : null;
		P(n), p?.(n);
	}, I = g.useRef(null);
	(0, g.useImperativeHandle)(t, () => ({ nativeElement: I.current }));
	let L = Ke(h, {
		aria: !0,
		data: !0
	});
	return /*#__PURE__*/ g.createElement("div", {
		...L,
		className: Z(T, y, i, {
			[`${T}-disabled`]: l,
			[`${T}-rtl`]: v === "rtl"
		}, E, D, a, A.root),
		style: j.root,
		id: n,
		ref: I
	}, M.map((e) => /*#__PURE__*/ g.createElement(lb, {
		key: e.value,
		className: Z(`${T}-item`, A.item, e.className),
		style: {
			...j.item,
			...e.style
		},
		checked: m ? (N || []).includes(e.value) : N === e.value,
		onChange: (t) => F(t, e),
		disabled: l
	}, e.label)));
});
// node_modules/antd/es/tag/hooks/useColor.js
function db(e, t) {
	let { color: n, variant: r, bordered: i } = e;
	return g.useMemo(() => {
		let e = n?.endsWith("-inverse"), a;
		a = r || (e ? "solid" : i === !1 ? "filled" : t || "filled");
		let o = e ? n?.replace("-inverse", "") : n;
		o === void 0 && a === "solid" && (o = "default");
		let s = m_(o), c = h_(o), l = {};
		if (!s && !c && o) {
			if (a === "solid") l.backgroundColor = n;
			else {
				let e = new $i(o).toHsl();
				e.l = .95, l.backgroundColor = new $i(e).toHexString(), l.color = n, a === "outlined" && (l.borderColor = n);
			}
		}
		return [
			a,
			o,
			s,
			c,
			l
		];
	}, [
		n,
		r,
		i,
		t
	]);
}
// node_modules/antd/es/tag/style/presetCmp.js
var fb = (e) => Co(e, (t, { textColor: n, lightBorderColor: r, lightColor: i, darkColor: a }) => ({ [`${e.componentCls}${e.componentCls}-${t}:not(${e.componentCls}-disabled)`]: {
	[`&${e.componentCls}-outlined`]: {
		backgroundColor: i,
		borderColor: r,
		color: n
	},
	[`&${e.componentCls}-solid`]: {
		backgroundColor: a,
		borderColor: a,
		color: e.colorTextLightSolid
	},
	[`&${e.componentCls}-filled`]: {
		backgroundColor: i,
		color: n
	}
} })), pb = xo(["Tag", "preset"], (e) => fb(ob(e)), sb);
// node_modules/antd/es/_util/capitalize.js
function mb(e) {
	return typeof e == "string" ? e.charAt(0).toUpperCase() + e.slice(1) : e;
}
// node_modules/antd/es/tag/style/statusCmp.js
var hb = (e, t, n) => {
	let r = mb(n);
	return { [`${e.componentCls}${e.componentCls}-${t}:not(${e.componentCls}-disabled)`]: {
		[`&${e.componentCls}-outlined`]: {
			backgroundColor: e[`color${r}Bg`],
			borderColor: e[`color${r}Border`],
			color: e[`color${n}`]
		},
		[`&${e.componentCls}-solid`]: {
			backgroundColor: e[`color${n}`],
			borderColor: e[`color${n}`]
		},
		[`&${e.componentCls}-filled`]: {
			backgroundColor: e[`color${r}Bg`],
			color: e[`color${n}`]
		}
	} };
}, gb = xo(["Tag", "status"], (e) => {
	let t = ob(e);
	return [
		hb(t, "success", "Success"),
		hb(t, "processing", "Info"),
		hb(t, "error", "Error"),
		hb(t, "warning", "Warning")
	];
}, sb), _b = /* @__PURE__ */ g.forwardRef((e, t) => {
	let { prefixCls: n, className: r, rootClassName: i, style: a, children: o, icon: s, color: c, variant: l, onClose: u, bordered: d, disabled: f, href: p, target: m, styles: h, classNames: _, ...v } = e, { getPrefixCls: y, direction: b, className: x, variant: S, style: C, classNames: w, styles: T } = zt("tag"), [E, D, O, k, A] = db(e, S), j = O || k, M = g.useContext(Xl), N = f ?? M, { tag: P } = g.useContext(It), [F, I] = g.useState(!0), L = Ve(v, ["closeIcon", "closable"]), R = {
		...e,
		color: D,
		variant: E,
		disabled: N
	}, z = mc(C), B = mc(a), [V, H] = gc([w, _], [
		T,
		z,
		h,
		B
	], { props: R }), U = g.useMemo(() => {
		let e = H.root;
		return N || (e = {
			...A,
			...e
		}), e;
	}, [
		H.root,
		A,
		N
	]), W = y("tag", n), [ee, te] = cb(W), ne = Z(W, x, V.root, `${W}-${E}`, {
		[`${W}-${D}`]: j,
		[`${W}-hidden`]: !F,
		[`${W}-rtl`]: b === "rtl",
		[`${W}-disabled`]: N
	}, r, i, ee, te), re = (e) => {
		N || (e.stopPropagation(), u?.(e), !e.defaultPrevented && (p && e.preventDefault(), I(!1)));
	}, ie = (e) => {
		(e.key === "Enter" || e.key === " ") && (e.preventDefault(), e.repeat || e.currentTarget.click());
	}, [, ae] = bu(mu(e), mu(P), {
		closable: !1,
		closeIconRender: (e) => Wl(e, /* @__PURE__ */ g.createElement("span", {
			role: "button",
			tabIndex: N ? -1 : 0,
			"aria-disabled": N || void 0,
			className: Z(`${W}-close-icon`, V.close),
			onClick: re,
			onKeyDown: ie,
			style: H.close
		}, e), (e) => ({
			onClick: (t) => {
				e?.onClick?.(t), re(t);
			},
			onKeyDown: (t) => {
				e?.onKeyDown?.(t), t.defaultPrevented || ie(t);
			},
			role: "button",
			tabIndex: N ? -1 : 0,
			"aria-disabled": N || void 0,
			className: Z(e?.className, `${W}-close-icon`, V.close),
			style: {
				...H.close,
				...e?.style
			}
		}))
	}), G = cc(v.onClick) || o && o.type === "a", K = Gl(s, {
		className: Z(/*#__PURE__*/ g.isValidElement(s) ? s.props?.className : void 0, V.icon),
		style: H.icon
	}), oe = K ? /*#__PURE__*/ g.createElement(g.Fragment, null, K, Le(o) && /*#__PURE__*/ g.createElement("span", {
		className: V.content,
		style: H.content
	}, o)) : o, se = p ? "a" : "span", ce = /*#__PURE__*/ g.createElement(se, {
		...L,
		ref: t,
		className: ne,
		style: U,
		href: N ? void 0 : p,
		target: m,
		onClick: N ? void 0 : L.onClick,
		...p && N ? { "aria-disabled": !0 } : {}
	}, oe, ae, O && /*#__PURE__*/ g.createElement(pb, {
		key: "preset",
		prefixCls: W
	}), k && /*#__PURE__*/ g.createElement(gb, {
		key: "status",
		prefixCls: W
	}));
	return G ? /*#__PURE__*/ g.createElement(Lu, { component: "Tag" }, ce) : ce;
});
_b.CheckableTag = lb, _b.CheckableTagGroup = ub;
// node_modules/@babel/runtime/helpers/interopRequireDefault.js
var vb = /* @__PURE__ */ o(((e, t) => {
	function n(e) {
		return e && e.__esModule ? e : { default: e };
	}
	t.exports = n, t.exports.__esModule = !0, t.exports.default = t.exports;
})), yb = /* @__PURE__ */ o(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		items_per_page: "条/页",
		jump_to: "跳至",
		jump_to_confirm: "确定",
		page: "页",
		prev_page: "上一页",
		next_page: "下一页",
		prev_5: "向前 5 页",
		next_5: "向后 5 页",
		prev_3: "向前 3 页",
		next_3: "向后 3 页",
		page_size: "页码"
	};
})), bb = /* @__PURE__ */ o(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.commonLocale = void 0, e.commonLocale = {
		yearFormat: "YYYY",
		dayFormat: "D",
		cellMeridiemFormat: "A",
		monthBeforeYear: !0
	};
})), xb = /* @__PURE__ */ o(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		...bb().commonLocale,
		locale: "zh_CN",
		today: "今天",
		now: "此刻",
		backToToday: "返回今天",
		ok: "确定",
		timeSelect: "选择时间",
		dateSelect: "选择日期",
		weekSelect: "选择周",
		clear: "清除",
		week: "周",
		month: "月",
		year: "年",
		previousMonth: "上个月",
		nextMonth: "下个月",
		monthSelect: "选择月份",
		yearSelect: "选择年份",
		decadeSelect: "选择年代",
		previousYear: "上一年",
		nextYear: "下一年",
		previousDecade: "上一年代",
		nextDecade: "下一年代",
		previousCentury: "上一世纪",
		nextCentury: "下一世纪",
		yearFormat: "YYYY年",
		cellDateFormat: "D",
		monthBeforeYear: !1
	};
})), Sb = /* @__PURE__ */ o(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		placeholder: "请选择时间",
		rangePlaceholder: ["开始时间", "结束时间"]
	};
})), Cb = /* @__PURE__ */ o(((e) => {
	var t = vb().default;
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
	var n = t(xb()), r = t(Sb()), i = {
		lang: {
			placeholder: "请选择日期",
			yearPlaceholder: "请选择年份",
			quarterPlaceholder: "请选择季度",
			monthPlaceholder: "请选择月份",
			weekPlaceholder: "请选择周",
			rangePlaceholder: ["开始日期", "结束日期"],
			rangeYearPlaceholder: ["开始年份", "结束年份"],
			rangeMonthPlaceholder: ["开始月份", "结束月份"],
			rangeQuarterPlaceholder: ["开始季度", "结束季度"],
			rangeWeekPlaceholder: ["开始周", "结束周"],
			...n.default
		},
		timePickerLocale: { ...r.default }
	};
	i.lang.ok = "确定", e.default = i;
})), wb = /* @__PURE__ */ o(((e) => {
	var t = vb().default;
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = t(Cb()).default;
})), Tb = /* @__PURE__ */ o(((e) => {
	var t = vb().default;
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
	var n = t(yb()), r = t(wb()), i = t(Cb()), a = t(Sb()), o = "${label}不是一个有效的${type}";
	e.default = {
		locale: "zh-cn",
		Pagination: n.default,
		DatePicker: i.default,
		TimePicker: a.default,
		Calendar: r.default,
		global: {
			placeholder: "请选择",
			close: "关闭",
			sortable: "可排序",
			show: "显示",
			hide: "隐藏"
		},
		Table: {
			filterTitle: "筛选",
			filterConfirm: "确定",
			filterReset: "重置",
			filterEmptyText: "无筛选项",
			filterCheckAll: "全选",
			filterSearchPlaceholder: "在筛选项中搜索",
			emptyText: "暂无数据",
			selectAll: "全选当页",
			selectInvert: "反选当页",
			selectNone: "清空所有",
			selectionAll: "全选所有",
			sortTitle: "排序",
			expand: "展开行",
			collapse: "关闭行",
			triggerDesc: "点击降序",
			triggerAsc: "点击升序",
			cancelSort: "取消排序"
		},
		Modal: {
			okText: "确定",
			cancelText: "取消",
			justOkText: "知道了"
		},
		Tour: {
			Next: "下一步",
			Previous: "上一步",
			Finish: "结束导览"
		},
		Popconfirm: {
			cancelText: "取消",
			okText: "确定"
		},
		Transfer: {
			titles: ["", ""],
			searchPlaceholder: "请输入搜索内容",
			itemUnit: "项",
			itemsUnit: "项",
			remove: "删除",
			selectCurrent: "全选当页",
			removeCurrent: "删除当页",
			selectAll: "全选所有",
			deselectAll: "取消全选",
			removeAll: "删除全部",
			selectInvert: "反选当页"
		},
		Upload: {
			uploading: "文件上传中",
			removeFile: "删除文件",
			uploadError: "上传错误",
			previewFile: "预览文件",
			downloadFile: "下载文件"
		},
		Empty: { description: "暂无数据" },
		Icon: { icon: "图标" },
		Text: {
			edit: "编辑",
			copy: "复制",
			copied: "复制成功",
			expand: "展开",
			collapse: "收起"
		},
		Carousel: {
			prevSlide: "上一张幻灯片",
			nextSlide: "下一张幻灯片"
		},
		Form: {
			optional: "（可选）",
			defaultValidateMessages: {
				default: "字段验证错误${label}",
				required: "请输入${label}",
				enum: "${label}必须是其中一个[${enum}]",
				whitespace: "${label}不能为空字符",
				date: {
					format: "${label}日期格式无效",
					parse: "${label}不能转换为日期",
					invalid: "${label}是一个无效日期"
				},
				types: {
					string: o,
					method: o,
					array: o,
					object: o,
					number: o,
					date: o,
					boolean: o,
					integer: o,
					float: o,
					regexp: o,
					email: o,
					url: o,
					hex: o
				},
				string: {
					len: "${label}须为${len}个字符",
					min: "${label}最少${min}个字符",
					max: "${label}最多${max}个字符",
					range: "${label}须在${min}-${max}字符之间"
				},
				number: {
					len: "${label}必须等于${len}",
					min: "${label}最小值为${min}",
					max: "${label}最大值为${max}",
					range: "${label}须在${min}-${max}之间"
				},
				array: {
					len: "须为${len}个${label}",
					min: "最少${min}个${label}",
					max: "最多${max}个${label}",
					range: "${label}数量须在${min}-${max}之间"
				},
				pattern: { mismatch: "${label}与模式不匹配${pattern}" }
			}
		},
		QRCode: {
			expired: "二维码过期",
			refresh: "点击刷新",
			scanned: "已扫描"
		},
		ColorPicker: {
			presetEmpty: "暂无",
			transparent: "无色",
			singleColor: "单色",
			gradientColor: "渐变色"
		}
	};
})), Eb = /* @__PURE__ */ o(((e, t) => {
	t.exports = Tb();
})), Db = /* @__PURE__ */ o(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
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
	};
})), Ob = /* @__PURE__ */ o(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		...bb().commonLocale,
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
	};
})), kb = /* @__PURE__ */ o(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = {
		placeholder: "Select time",
		rangePlaceholder: ["Start time", "End time"]
	};
})), Ab = /* @__PURE__ */ o(((e) => {
	var t = vb().default;
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
	var n = t(Ob()), r = t(kb());
	e.default = {
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
			...n.default
		},
		timePickerLocale: { ...r.default }
	};
})), jb = /* @__PURE__ */ o(((e) => {
	var t = vb().default;
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0, e.default = t(Ab()).default;
})), Mb = /* @__PURE__ */ o(((e) => {
	var t = vb().default;
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = void 0;
	var n = t(Db()), r = t(jb()), i = t(Ab()), a = t(kb()), o = "${label} is not a valid ${type}";
	e.default = {
		locale: "en",
		Pagination: n.default,
		DatePicker: i.default,
		TimePicker: a.default,
		Calendar: r.default,
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
					string: o,
					method: o,
					array: o,
					object: o,
					number: o,
					date: o,
					boolean: o,
					integer: o,
					float: o,
					regexp: o,
					email: o,
					url: o,
					hex: o
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
})), Nb = /* @__PURE__ */ o(((e, t) => {
	t.exports = Mb();
})), Pb = /* @__PURE__ */ c(Eb(), 1), Fb = /* @__PURE__ */ c(Nb(), 1), Ib = [
	"draft",
	"review",
	"changes",
	"approved"
], Lb = [
	{
		id: "WF-104",
		title: "Keyboard path for upload review",
		titleZh: "上传审核的键盘操作",
		status: "review",
		version: 3
	},
	{
		id: "WF-103",
		title: "Document retry contract",
		titleZh: "记录重试接口契约",
		status: "changes",
		version: 2
	},
	{
		id: "WF-102",
		title: "Reconcile empty-state copy",
		titleZh: "统一空状态提示",
		status: "approved",
		version: 5
	},
	{
		id: "WF-101",
		title: "Map attachment permissions",
		titleZh: "梳理附件权限",
		status: "draft",
		version: 1
	}
];
function Rb() {
	return {
		tasks: Lb.map((e) => ({ ...e })),
		role: "reviewer",
		pending: null,
		failed: null,
		conflict: null,
		message: "ready"
	};
}
function zb(e, t) {
	return e === "owner" && (t === "draft" || t === "changes") ? ["review"] : e === "reviewer" && t === "review" ? ["approved", "changes"] : e === "reviewer" && t === "approved" ? ["review"] : [];
}
function Bb(e, t) {
	if (t.type === "reset") return Rb();
	if (t.type === "role") return e.pending ? e : {
		...e,
		role: t.role,
		failed: null,
		message: "ready"
	};
	if (t.type === "refresh") {
		if (!e.conflict || e.pending) return e;
		let t = e.conflict;
		return {
			...e,
			tasks: e.tasks.map((e) => e.id === t.id ? {
				...e,
				version: t.version
			} : e),
			conflict: null,
			failed: null,
			message: "refreshed"
		};
	}
	if (t.type === "start") {
		if (e.pending || e.conflict) return e;
		let { operation: n } = t, r = e.tasks.find((e) => e.id === n.id);
		return !r || r.version !== n.version || !zb(e.role, r.status).includes(n.to) ? {
			...e,
			message: "forbidden"
		} : {
			...e,
			pending: n,
			failed: null,
			message: "pending"
		};
	}
	if (!e.pending || e.pending.token !== t.token) return e;
	let n = e.pending, r = e.tasks.find((e) => e.id === n.id);
	return r ? t.outcome === "error" ? {
		...e,
		pending: null,
		failed: n,
		message: "error"
	} : t.outcome === "conflict" || r.version !== n.version ? {
		...e,
		pending: null,
		failed: null,
		conflict: {
			id: r.id,
			version: Math.max(r.version, n.version + 1)
		},
		message: "conflict"
	} : {
		...e,
		tasks: e.tasks.map((e) => e.id === r.id ? {
			...e,
			status: n.to,
			version: e.version + 1
		} : e),
		pending: null,
		failed: null,
		message: "success"
	} : {
		...e,
		pending: null,
		message: "forbidden"
	};
}
// node_modules/react/cjs/react-jsx-runtime.production.min.js
var Vb = /* @__PURE__ */ o(((e) => {
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
})), Hb = (/* @__PURE__ */ o(((e, t) => {
	t.exports = Vb();
})))(), Ub = {
	draft: ["Draft", "草稿"],
	review: ["In review", "审核中"],
	changes: ["Changes", "待修改"],
	approved: ["Approved", "已通过"]
}, Wb = {
	ready: ["Choose a role, an outcome and a task action.", "选择角色、模拟结果，再操作任务。"],
	pending: ["Simulating a request… reset cancels this pending result.", "正在模拟请求……重置可取消本次结果。"],
	success: ["State updated and version incremented.", "状态已更新，版本号已递增。"],
	error: ["Simulated network error. Nothing changed; retry the same action.", "模拟网络错误，状态未变；可重试同一操作。"],
	conflict: ["Simulated version conflict. Refresh the snapshot before trying again.", "模拟版本冲突；请先刷新快照，再重新操作。"],
	refreshed: ["Snapshot refreshed. Choose a successful outcome to continue.", "快照已刷新，可选择正常响应后继续。"],
	forbidden: ["Action rejected: the role, state or version does not match.", "操作被拒绝：角色、状态或版本不匹配。"]
};
function Gb({ children: e, label: t }) {
	let n = (0, g.useRef)(null);
	return (0, g.useEffect)(() => {
		n.current?.querySelector("[role=\"listbox\"]")?.setAttribute("aria-label", t);
	}, [e, t]), /* @__PURE__ */ (0, Hb.jsx)("div", {
		ref: n,
		children: e
	});
}
function Kb() {
	let [e, t] = (0, g.useReducer)(Bb, void 0, Rb), [n, r] = (0, g.useState)(+!!document.documentElement.lang.startsWith("zh")), [i, a] = (0, g.useState)("success"), [o, s] = (0, g.useState)(matchMedia("(prefers-reduced-motion: reduce)").matches), c = (0, g.useRef)(0), l = (0, g.useRef)(null), u = (0, g.useRef)(null), d = (e, t) => n ? t : e;
	(0, g.useEffect)(() => {
		let e = matchMedia("(prefers-reduced-motion: reduce)"), t = () => s(e.matches);
		return e.addEventListener("change", t), () => e.removeEventListener("change", t);
	}, []), (0, g.useEffect)(() => {
		let e = () => r(+!!document.documentElement.lang.startsWith("zh"));
		return document.addEventListener("portfolio-language-change", e), () => {
			document.removeEventListener("portfolio-language-change", e), l.current && clearTimeout(l.current), c.current++;
		};
	}, []), (0, g.useEffect)(() => {
		!e.pending && u.current && (document.getElementById(`task-${u.current}`)?.focus({ preventScroll: !0 }), u.current = null);
	}, [e.pending]);
	function f(n, r) {
		if (l.current || e.pending || e.conflict || !zb(e.role, n.status).includes(r)) return;
		let a = ++c.current, o = i;
		u.current = n.id, t({
			type: "start",
			operation: {
				token: a,
				id: n.id,
				to: r,
				version: n.version
			}
		}), l.current = setTimeout(() => {
			l.current = null, a === c.current && t({
				type: "settle",
				token: a,
				outcome: o
			});
		}, 600);
	}
	function p() {
		l.current && clearTimeout(l.current), l.current = null, c.current++, u.current = null, a("success"), t({ type: "reset" });
	}
	function m(e, t) {
		return t === "approved" ? d("Approve", "通过") : t === "changes" ? d("Request changes", "退回修改") : e.status === "approved" ? d("Reopen", "重新打开") : d("Submit for review", "提交审核");
	}
	return /* @__PURE__ */ (0, Hb.jsxs)(lu, {
		locale: n ? Pb.default : Fb.default,
		theme: { token: {
			motion: !o,
			colorPrimary: "#205ad3",
			colorText: "#263445",
			colorTextSecondary: "#5e6c7c",
			colorBorder: "#cbd5e1",
			borderRadius: 5,
			controlHeight: 38,
			fontFamily: "\"Segoe UI\", \"Microsoft YaHei\", sans-serif"
		} },
		children: [
			/* @__PURE__ */ (0, Hb.jsxs)("div", {
				className: "board-toolbar",
				children: [/* @__PURE__ */ (0, Hb.jsxs)("div", { children: [/* @__PURE__ */ (0, Hb.jsx)("p", {
					className: "section-number",
					children: "INTERACTION LAB"
				}), /* @__PURE__ */ (0, Hb.jsx)("h2", {
					id: "board-title",
					children: d("Review queue", "审核队列")
				})] }), /* @__PURE__ */ (0, Hb.jsxs)("div", {
					className: "board-controls",
					children: [
						/* @__PURE__ */ (0, Hb.jsxs)("div", {
							className: "ant-control",
							children: [/* @__PURE__ */ (0, Hb.jsx)("label", {
								htmlFor: "role-select",
								children: d("Role", "角色")
							}), /* @__PURE__ */ (0, Hb.jsx)(u_, {
								virtual: !1,
								popupRender: (e) => /* @__PURE__ */ (0, Hb.jsx)(Gb, {
									label: d("Role options", "角色选项"),
									children: e
								}),
								id: "role-select",
								"aria-label": d("Role", "角色"),
								value: e.role,
								disabled: !!e.pending,
								onChange: (e) => {
									(e === "owner" || e === "reviewer") && t({
										type: "role",
										role: e
									});
								},
								options: [{
									value: "reviewer",
									label: d("Reviewer", "审核人")
								}, {
									value: "owner",
									label: d("Owner", "负责人")
								}]
							})]
						}),
						/* @__PURE__ */ (0, Hb.jsxs)("div", {
							className: "ant-control",
							children: [/* @__PURE__ */ (0, Hb.jsx)("label", {
								htmlFor: "scenario-select",
								children: d("Next response", "下次响应")
							}), /* @__PURE__ */ (0, Hb.jsx)(u_, {
								virtual: !1,
								popupRender: (e) => /* @__PURE__ */ (0, Hb.jsx)(Gb, {
									label: d("Response options", "模拟响应选项"),
									children: e
								}),
								id: "scenario-select",
								"aria-label": d("Next response", "下次响应"),
								value: i,
								disabled: !!e.pending,
								onChange: (e) => {
									(e === "success" || e === "error" || e === "conflict") && a(e);
								},
								options: [
									{
										value: "success",
										label: d("Success", "正常响应")
									},
									{
										value: "error",
										label: d("Network error", "网络错误")
									},
									{
										value: "conflict",
										label: d("Version conflict", "版本冲突")
									}
								]
							})]
						}),
						/* @__PURE__ */ (0, Hb.jsx)(Uv, {
							id: "reset-board",
							onClick: p,
							children: d("Reset", "重置")
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, Hb.jsx)(Dc, {
				className: "board-status",
				id: "board-status",
				role: "status",
				"aria-live": "polite",
				"data-tone": e.message,
				showIcon: !0,
				type: e.message === "error" || e.message === "forbidden" ? "error" : e.message === "conflict" ? "warning" : e.message === "success" ? "success" : "info",
				title: Wb[e.message][n]
			}),
			e.failed && /* @__PURE__ */ (0, Hb.jsx)(Uv, {
				id: "retry-action",
				type: "primary",
				onClick: () => {
					let t = e.tasks.find((t) => t.id === e.failed?.id);
					t && e.failed && f(t, e.failed.to);
				},
				children: d("Retry action", "重试操作")
			}),
			e.conflict && /* @__PURE__ */ (0, Hb.jsx)(Uv, {
				id: "refresh-snapshot",
				type: "primary",
				onClick: () => t({ type: "refresh" }),
				children: d("Refresh snapshot", "刷新快照")
			}),
			/* @__PURE__ */ (0, Hb.jsx)("div", {
				className: "workflow-columns",
				id: "workflow-columns",
				"aria-busy": !!e.pending,
				children: Ib.map((t) => /* @__PURE__ */ (0, Hb.jsxs)("section", {
					className: "workflow-column",
					"data-status": t,
					"aria-labelledby": `column-${t}`,
					children: [
						/* @__PURE__ */ (0, Hb.jsxs)("div", {
							className: "column-heading",
							children: [/* @__PURE__ */ (0, Hb.jsx)("h3", {
								id: `column-${t}`,
								children: Ub[t][n]
							}), /* @__PURE__ */ (0, Hb.jsx)(_b, {
								variant: "filled",
								color: t === "approved" ? "green" : t === "changes" ? "gold" : "blue",
								className: "column-count",
								children: e.tasks.filter((e) => e.status === t).length
							})]
						}),
						e.tasks.filter((e) => e.status === t).map((n) => /* @__PURE__ */ (0, Hb.jsxs)(ib, {
							size: "small",
							id: `task-${n.id}`,
							className: "workflow-card",
							"data-task-id": n.id,
							tabIndex: -1,
							role: "article",
							"aria-label": d(n.title, n.titleZh),
							children: [
								/* @__PURE__ */ (0, Hb.jsxs)("div", {
									className: "card-meta",
									children: [/* @__PURE__ */ (0, Hb.jsx)("span", { children: n.id }), /* @__PURE__ */ (0, Hb.jsx)("span", { children: d("Synthetic", "合成任务") })]
								}),
								/* @__PURE__ */ (0, Hb.jsx)("h4", { children: d(n.title, n.titleZh) }),
								/* @__PURE__ */ (0, Hb.jsxs)("p", { children: [
									d("Version", "版本"),
									" ",
									/* @__PURE__ */ (0, Hb.jsx)("strong", {
										"data-version": !0,
										children: n.version
									})
								] }),
								/* @__PURE__ */ (0, Hb.jsx)("div", {
									className: "card-actions",
									children: zb(e.role, t).map((t) => /* @__PURE__ */ (0, Hb.jsx)(Uv, {
										type: t === "changes" ? "default" : "primary",
										size: "small",
										"data-action": t,
										disabled: !!e.pending || !!e.conflict,
										onClick: () => f(n, t),
										children: m(n, t)
									}, t))
								}),
								!zb(e.role, t).length && /* @__PURE__ */ (0, Hb.jsx)("p", { children: d("Switch role to act on this state.", "切换角色后可操作此状态。") })
							]
						}, n.id)),
						!e.tasks.some((e) => e.status === t) && /* @__PURE__ */ (0, Hb.jsx)("p", {
							className: "empty-column",
							children: d("No tasks in this state.", "此状态下没有任务。")
						})
					]
				}, t))
			}),
			/* @__PURE__ */ (0, Hb.jsx)("p", {
				className: "demo-note",
				children: d("In-memory simulation. Role controls illustrate UI rules, not server authorization.", "内存模拟：角色控件用于演示界面规则，不构成服务端授权。")
			})
		]
	});
}
// src/main.tsx
(0, rt.createRoot)(document.getElementById("workflow-app")).render(/* @__PURE__ */ (0, Hb.jsx)(g.StrictMode, { children: /* @__PURE__ */ (0, Hb.jsx)(Kb, {}) }));
