!(function (t, a) {
  "function" == typeof define && define.amd
    ? define(a)
    : "object" == typeof exports
    ? (module.exports = a(require, exports, module))
    : (t.CountUp = a());
})(this, function () {
  var t = function (t, a, e, n, i, r) {
    for (
      var o = 0, s = ["webkit", "moz", "ms", "o"], u = 0;
      u < s.length && !window.requestAnimationFrame;
      ++u
    )
      (window.requestAnimationFrame = window[s[u] + "RequestAnimationFrame"]),
        (window.cancelAnimationFrame =
          window[s[u] + "CancelAnimationFrame"] ||
          window[s[u] + "CancelRequestAnimationFrame"]);
    window.requestAnimationFrame ||
      (window.requestAnimationFrame = function (t) {
        var a = new Date().getTime(),
          e = Math.max(0, 16 - (a - o)),
          n = window.setTimeout(function () {
            t(a + e);
          }, e);
        return (o = a + e), n;
      }),
      window.cancelAnimationFrame ||
        (window.cancelAnimationFrame = function (t) {
          clearTimeout(t);
        }),
      (this.options = {
        useEasing: !0,
        useGrouping: !0,
        separator: ",",
        decimal: ".",
      });
    for (var m in r) r.hasOwnProperty(m) && (this.options[m] = r[m]);
    "" === this.options.separator && (this.options.useGrouping = !1),
      this.options.prefix || (this.options.prefix = ""),
      this.options.suffix || (this.options.suffix = ""),
      (this.d = "string" == typeof t ? document.getElementById(t) : t),
      (this.startVal = Number(a)),
      (this.endVal = Number(e)),
      (this.countDown = this.startVal > this.endVal),
      (this.frameVal = this.startVal),
      (this.decimals = Math.max(0, n || 0)),
      (this.dec = Math.pow(10, this.decimals)),
      (this.duration = 1e3 * Number(i) || 2e3);
    var l = this;
    (this.version = function () {
      return "1.6.0";
    }),
      (this.printValue = function (t) {
        var a = isNaN(t) ? "--" : l.formatNumber(t);
        "INPUT" == l.d.tagName
          ? (this.d.value = a)
          : "text" == l.d.tagName || "tspan" == l.d.tagName
          ? (this.d.textContent = a)
          : (this.d.innerHTML = a);
      }),
      (this.easeOutExpo = function (t, a, e, n) {
        return (e * (-Math.pow(2, (-10 * t) / n) + 1) * 1024) / 1023 + a;
      }),
      (this.count = function (t) {
        l.startTime || (l.startTime = t), (l.timestamp = t);
        var a = t - l.startTime;
        (l.remaining = l.duration - a),
          (l.frameVal = l.options.useEasing
            ? l.countDown
              ? l.startVal -
                l.easeOutExpo(a, 0, l.startVal - l.endVal, l.duration)
              : l.easeOutExpo(a, l.startVal, l.endVal - l.startVal, l.duration)
            : l.countDown
            ? l.startVal - (l.startVal - l.endVal) * (a / l.duration)
            : l.startVal + (l.endVal - l.startVal) * (a / l.duration)),
          (l.frameVal = l.countDown
            ? l.frameVal < l.endVal
              ? l.endVal
              : l.frameVal
            : l.frameVal > l.endVal
            ? l.endVal
            : l.frameVal),
        //   (l.frameVal = Math.round(l.frameVal * l.dec) / l.dec),
          l.printValue(l.frameVal),
          a < l.duration
            ? (l.rAF = requestAnimationFrame(l.count))
            : l.callback && l.callback();
      }),
      (this.start = function (t) {
        return (l.callback = t), (l.rAF = requestAnimationFrame(l.count)), !1;
      }),
      (this.pauseResume = function () {
        l.paused
          ? ((l.paused = !1),
            delete l.startTime,
            (l.duration = l.remaining),
            (l.startVal = l.frameVal),
            requestAnimationFrame(l.count))
          : ((l.paused = !0), cancelAnimationFrame(l.rAF));
      }),
      (this.reset = function () {
        (l.paused = !1),
          delete l.startTime,
          (l.startVal = a),
          cancelAnimationFrame(l.rAF),
          l.printValue(l.startVal);
      }),
      (this.update = function (t) {
        cancelAnimationFrame(l.rAF),
          (l.paused = !1),
          delete l.startTime,
          (l.startVal = l.frameVal),
          (l.endVal = Number(t)),
          (l.countDown = l.startVal > l.endVal),
          (l.rAF = requestAnimationFrame(l.count));
      }),
      (this.formatNumber = function (t) {
        (t = t.toFixed(l.decimals)), (t += "");
        var a, e, n, i;
        if (
          ((a = t.split(".")),
          (e = a[0]),
          (n = a.length > 1 ? l.options.decimal + a[1] : ""),
          (i = /(\d+)(\d{3})/),
          l.options.useGrouping)
        )
          for (; i.test(e); )
            e = e.replace(i, "$1" + l.options.separator + "$2");
        return l.options.prefix + e + n + l.options.suffix;
      }),
      l.printValue(l.startVal);
  };
  return t;
});
