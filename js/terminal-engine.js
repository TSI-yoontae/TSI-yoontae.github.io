/* TSI Terminal — adapted from the HTML reference supplied by the site owner, September 2026.
   Everything here is synthetic data generated in the browser. */
(function (root) {
  'use strict';
  var COL = {
    amber: '#E8DCC5', ice: '#B7C3BE', violet: '#C4B7AA', mint: '#9DAB9F', slate: '#85857B',
    text: '#F7F3E9', text2: '#D4CFC4', text3: '#BCB6AB', ink: '#292824',
    grid: 'rgba(240,232,218,0.10)', panel: 'rgba(41,40,36,0.97)', panelLine: 'rgba(240,232,218,0.22)'
  };
  var MONO = '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
  var STEP = { forecast: 220, allocate: 220, book: 150 };

  function rgba(hex, a) { var n = parseInt(hex.slice(1), 16); return 'rgba(' + (n >> 16 & 255) + ',' + (n >> 8 & 255) + ',' + (n & 255) + ',' + a + ')'; }
  function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function ease(t) { t = clamp(t, 0, 1); return 1 - Math.pow(1 - t, 3); }
  function rng(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function normal(r) {
    var u = 0, v = 0;
    while (u === 0) u = r();
    while (v === 0) v = r();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }
  function niceStep(range, count) {
    var raw = range / Math.max(1, count);
    var mag = Math.pow(10, Math.floor(Math.log10(raw)));
    var f = raw / mag;
    return (f < 1.5 ? 1 : f < 3 ? 2 : f < 7 ? 5 : 10) * mag;
  }
  function decimals(step) { return step >= 1 ? 0 : step >= 0.1 ? 1 : 2; }
  function fmtInt(x) { return Math.round(x).toLocaleString('en-US'); }
  function signed(x, d) { return (x >= 0 ? '+' : '−') + Math.abs(x).toFixed(d); }
  function rrect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  /* ---------- simulations ---------- */
  function makeForecast() {
    var r = rng(20250901);
    var REG = [{ mu: 0.0010, vm: 0.85 }, { mu: -0.0009, vm: 1.2 }, { mu: 0.0001, vm: 0.6 }, { mu: 0.0004, vm: 1.5 }];
    var regime = 0, v = 1.4e-4, eps = 0;
    var px = [100];
    function next() {
      if (r() < 0.014) regime = Math.floor(r() * REG.length);
      var g = REG[regime];
      v = 3e-6 + 0.09 * eps * eps + 0.89 * v;
      var sd = Math.sqrt(v), z = normal(r);
      eps = sd * z;
      var last = px[px.length - 1];
      px.push(last * Math.exp(g.mu - 0.004 * Math.log(last / 100) + sd * g.vm * z));
      if (px.length > 3000) px.splice(0, 1500);
    }
    for (var i = 0; i < 700; i++) next();
    var K = 14, HMAX = 480;
    function makeZ(seed) {
      var rr = rng(seed), out = [];
      for (var k = 0; k < K; k++) {
        var row = new Float32Array(HMAX + 1), c = 0;
        for (var h = 1; h <= HMAX; h++) { c += normal(rr); row[h] = c; }
        out.push(row);
      }
      return out;
    }
    return { px: px, next: next, K: K, HMAX: HMAX, makeZ: makeZ, Z: makeZ(97), Zp: null, morph: 1, seed: 97, lo: null, hi: null, ox: null };
  }

  function estimate(px, o) {
    var s = Math.max(1, o - 160), v = 0, cnt = 0, m = 0, i, rr;
    for (i = s; i < Math.min(o, s + 20); i++) { rr = Math.log(px[i] / px[i - 1]); v += rr * rr; cnt++; }
    v = cnt ? v / cnt : 1e-4;
    for (i = s; i <= o; i++) { rr = Math.log(px[i] / px[i - 1]); v = 0.94 * v + 0.06 * rr * rr; m = 0.97 * m + 0.03 * rr; }
    return { mu: m * 0.5, sd: Math.sqrt(v) };
  }

  function makeAlloc() {
    var r = rng(4242);
    var NAMES = ['Equity', 'Credit', 'Rates', 'Commodity', 'Cash'];
    var SHORT = ['EQ', 'CR', 'RT', 'CM', 'CA'];
    var COLORS = [COL.amber, COL.ice, COL.violet, COL.mint, COL.slate];
    var MU = [0.0005, 0.00022, 0.0001, 0.00025, 0.00002];
    var SIG = [0.011, 0.0048, 0.0032, 0.0135, 0.0007];
    var BETA = [1, 0.4, -0.2, 0.35, 0];
    var N = 5, w = [0.2, 0.2, 0.2, 0.2, 0.2], target = w.slice();
    var V = 1, Bv = 1, t = 0, turn = 0, regime = 1;
    var R = [], hist = [];
    function targetWeights() {
      var m = R.length, raw = [], i, j;
      for (i = 0; i < N; i++) {
        var s = 0, s2 = 0;
        for (j = 0; j < m; j++) { s += R[j][i]; s2 += R[j][i] * R[j][i]; }
        var mean = s / m, sdv = Math.sqrt(Math.max(s2 / m - mean * mean, 1e-10));
        raw.push(Math.exp(7 * mean / sdv));
      }
      var ww = raw, tot;
      for (var it = 0; it < 5; it++) {
        tot = ww.reduce(function (a, b) { return a + b; }, 0);
        ww = ww.map(function (x) { return clamp(x / tot, 0.04, 0.45); });
      }
      tot = ww.reduce(function (a, b) { return a + b; }, 0);
      return ww.map(function (x) { return x / tot; });
    }
    function next() {
      if (r() < 0.01) regime = r() < 0.55 ? 1 : -1;
      var f = 0.0003 * regime + normal(r) * 0.007, ret = [], i;
      for (i = 0; i < N; i++) ret.push(MU[i] + BETA[i] * f + SIG[i] * 0.75 * normal(r));
      R.push(ret); if (R.length > 60) R.shift();
      var pr = 0, br = 0;
      for (i = 0; i < N; i++) { pr += w[i] * ret[i]; br += ret[i] / N; }
      V *= 1 + pr; Bv *= 1 + br;
      for (i = 0; i < N; i++) w[i] = w[i] * (1 + ret[i]) / (1 + pr);
      var rebal = false;
      if (t % 24 === 0 && R.length >= 40) {
        var nt = targetWeights();
        turn = 0; for (i = 0; i < N; i++) turn += Math.abs(nt[i] - w[i]) / 2;
        target = nt; rebal = true;
      }
      var s = 0;
      for (i = 0; i < N; i++) { w[i] += (target[i] - w[i]) * 0.3; s += w[i]; }
      for (i = 0; i < N; i++) w[i] /= s;
      hist.push({ w: w.slice(), v: V, b: Bv, rebal: rebal });
      if (hist.length > 2400) hist.splice(0, 1200);
      t++;
    }
    for (var k = 0; k < 700; k++) next();
    return { NAMES: NAMES, SHORT: SHORT, COLORS: COLORS, N: N, hist: hist, next: next,
      turnover: function () { return turn; }, untilRebal: function () { return 24 - (t % 24); }, lo: null, hi: null };
  }

  function makeBook() {
    var r = rng(8080);
    var LV = 28, tick = 0.02, m = 5006;
    var bids = new Float64Array(LV), asks = new Float64Array(LV);
    function base(i) { return 60 + 22 * i + 160 * (1 - Math.exp(-i / 5)); }
    function fresh(i) { return base(i) * (0.55 + r() * 0.9); }
    for (var i = 0; i < LV; i++) { bids[i] = fresh(i); asks[i] = fresh(i); }
    var mids = [], trades = [];
    function imb() { var b = 0, a = 0; for (var j = 0; j < 5; j++) { b += bids[j]; a += asks[j]; } return (b - a) / (b + a); }
    function shiftOut(arr, k) { for (var j = 0; j < LV; j++) arr[j] = j + k < LV ? arr[j + k] : fresh(j); }
    function shiftIn(arr, k) { for (var j = LV - 1; j >= 0; j--) arr[j] = j - k >= 0 ? arr[j - k] : base(0) * (0.25 + r() * 0.5); }
    function next(now) {
      var k, j, side;
      for (k = 0; k < 7; k++) { side = r() < 0.5 ? bids : asks; j = Math.min(LV - 1, Math.floor(-Math.log(1 - r()) * 6)); side[j] += 8 + r() * 55; }
      for (k = 0; k < 6; k++) { side = r() < 0.5 ? bids : asks; j = Math.floor(r() * LV); side[j] = Math.max(4, side[j] * (0.7 + r() * 0.25)); }
      for (j = 0; j < LV; j++) { bids[j] += (base(j) - bids[j]) * 0.01; asks[j] += (base(j) - asks[j]) * 0.01; }
      if (r() < 0.3) {
        var buy = r() < 0.5 + 0.35 * imb();
        var qty = 30 - Math.log(1 - r()) * 150, book = buy ? asks : bids;
        var px0 = buy ? (m + 1) * tick : m * tick, lvl = 0, filled = 0;
        while (qty > 0 && lvl < LV - 1) {
          var take = Math.min(qty, book[lvl]);
          book[lvl] -= take; qty -= take; filled += take;
          if (book[lvl] < 1) lvl++; else break;
        }
        if (lvl > 0) {
          shiftOut(book, lvl);
          if (buy) { m += lvl; shiftIn(bids, lvl); } else { m -= lvl; shiftIn(asks, lvl); }
        }
        trades.push({ buy: buy, px: px0, size: filled, t: now });
        if (trades.length > 40) trades.shift();
      }
      mids.push((m + 0.5) * tick);
      if (mids.length > 400) mids.shift();
    }
    for (var s = 0; s < 320; s++) next(-1e9);
    return { LV: LV, tick: tick, bids: bids, asks: asks, mids: mids, trades: trades, next: next, imb: imb,
      m: function () { return m; }, vmaxC: null, vmaxS: null };
  }

  /* ---------- drawing helpers ---------- */
  function hud(ctx, x, y, w, title, tag, rows) {
    var narrow = ctx.canvas.clientWidth < 620;
    if (narrow) {
      var width = ctx.canvas.clientWidth - 28, col = width / rows.length;
      ctx.save(); ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      ctx.font = '500 11px ' + MONO; ctx.fillStyle = COL.text;
      ctx.fillText(title, 14, 18);
      ctx.textAlign = 'right'; ctx.fillStyle = COL.text3; ctx.fillText(tag, width + 14, 18);
      rows.forEach(function (row, i) {
        ctx.textAlign = 'left'; ctx.font = '400 10px ' + MONO; ctx.fillStyle = COL.text3;
        ctx.fillText(row[0].replace(' (L5)', ''), 14 + i * col, 41);
        ctx.font = '500 12px ' + MONO; ctx.fillStyle = row[2] || COL.text;
        ctx.fillText(row[1], 14 + i * col, 60);
      });
      ctx.strokeStyle = COL.panelLine; ctx.beginPath(); ctx.moveTo(14, 76); ctx.lineTo(width + 14, 76); ctx.stroke();
      ctx.restore(); return 72;
    }
    var rowH = 19, padX = 12, padY = 11;
    var h = padY * 2 + 18 + rows.length * rowH;
    ctx.save();
    ctx.fillStyle = COL.panel; rrect(ctx, x, y, w, h, 11); ctx.fill();
    ctx.strokeStyle = COL.panelLine; ctx.lineWidth = 1; ctx.stroke();
    ctx.textBaseline = 'middle';
    ctx.font = '500 10.5px ' + MONO;
    ctx.fillStyle = COL.amber; ctx.textAlign = 'left'; ctx.fillText(title, x + padX, y + padY + 7);
    if (tag) { ctx.fillStyle = COL.text3; ctx.textAlign = 'right'; ctx.fillText(tag, x + w - padX, y + padY + 7); }
    ctx.font = '400 11.5px ' + MONO;
    for (var i = 0; i < rows.length; i++) {
      var ry = y + padY + 18 + i * rowH + rowH / 2 + 1;
      ctx.textAlign = 'left'; ctx.fillStyle = COL.text3; ctx.fillText(rows[i][0], x + padX, ry);
      ctx.textAlign = 'right'; ctx.fillStyle = rows[i][2] || COL.text; ctx.fillText(rows[i][1], x + w - padX, ry);
    }
    ctx.restore();
    return h;
  }
  function chip(ctx, x, y, text, bg, fg, align) {
    ctx.save();
    ctx.font = '500 10.5px ' + MONO;
    var w = ctx.measureText(text).width + 12, h = 18;
    var lx = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x;
    ctx.fillStyle = bg; rrect(ctx, lx, y - h / 2, w, h, 5); ctx.fill();
    ctx.fillStyle = fg; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText(text, lx + 6, y + 0.5);
    ctx.restore();
    return w;
  }
  function legend(ctx, xRight, y, items) {
    ctx.save();
    ctx.font = '400 10.5px ' + MONO; ctx.textBaseline = 'middle';
    var x = xRight;
    for (var i = items.length - 1; i >= 0; i--) {
      var it = items[i], tw = ctx.measureText(it.label).width;
      x -= tw;
      ctx.fillStyle = COL.text3; ctx.textAlign = 'left'; ctx.fillText(it.label, x, y);
      x -= 22;
      ctx.strokeStyle = it.color; ctx.fillStyle = it.color; ctx.lineWidth = it.width || 2;
      ctx.setLineDash(it.dash || []);
      if (it.box) { ctx.globalAlpha *= 0.5; ctx.fillRect(x, y - 5, 16, 10); ctx.globalAlpha /= 0.5; }
      else { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 16, y); ctx.stroke(); }
      ctx.setLineDash([]);
      x -= 18;
    }
    ctx.restore();
  }
  function frameBox(W, H, narrow, padR) {
    var padL = 14, padT = narrow ? 92 : 14, padB = 28;
    return { x0: padL, x1: W - padR, y0: padT, y1: H - padB };
  }

  /* ---------- forecast view ---------- */
  function drawForecast(S) {
    var ctx = S.ctx, W = S.W, H = S.H, F = S.F;
    var narrow = W < 620;
    var b = frameBox(W, H, narrow, narrow ? 48 : 64);
    var x0 = b.x0, x1 = b.x1, y0 = b.y0, y1 = b.y1;
    var n = clamp(Math.round((x1 - x0) / (narrow ? 4.2 : 5.4)), 70, 240);
    var dx = (x1 - x0) / (n - 1);
    var px = F.px, L = px.length, newest = L - 2, first = newest - n;
    var shift = S.phase * dx;
    function xAt(i) { return x1 - (newest - i) * dx - shift; }

    var defX = x0 + (x1 - x0) * 0.68;
    var tX = S.pointer.active ? clamp(S.pointer.x, x0 + (x1 - x0) * 0.2, x1 - dx * 5) : defX;
    F.ox = F.ox == null ? tX : lerp(F.ox, tX, S.k(0.25));
    var o = Math.round(newest - (x1 - shift - F.ox) / dx);
    o = clamp(o, first + 24, newest - 3);
    var Hh = L - 1 - o;
    var est = estimate(px, o), mu = est.mu, sd = est.sd;
    var lp0 = Math.log(px[o]);
    var Z80 = 1.2816, Z50 = 0.6745;
    function band(h, z) { return Math.exp(lp0 + mu * h + z * sd * Math.sqrt(h)); }

    var lo = Infinity, hi = -Infinity, i, h, p;
    for (i = first; i < L; i++) { p = px[i]; if (p < lo) lo = p; if (p > hi) hi = p; }
    var span = Math.max(hi - lo, px[o] * 0.02);
    lo = Math.min(lo, Math.max(band(Hh, -Z80), lo - span * 0.45));
    hi = Math.max(hi, Math.min(band(Hh, Z80), hi + span * 0.45));
    var pad = (hi - lo) * 0.1; lo -= pad; hi += pad;
    if (F.lo == null) { F.lo = lo; F.hi = hi; }
    F.lo = lerp(F.lo, lo, S.k(0.08)); F.hi = lerp(F.hi, hi, S.k(0.08));
    function yAt(v) { return y1 - (v - F.lo) / (F.hi - F.lo) * (y1 - y0); }

    // grid + y labels
    ctx.lineWidth = 1;
    var step = niceStep(F.hi - F.lo, 4), dec = decimals(step), v, y, x;
    ctx.font = '400 11px ' + MONO; ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
    for (v = Math.ceil(F.lo / step) * step; v <= F.hi; v += step) {
      y = Math.round(yAt(v)) + 0.5;
      ctx.strokeStyle = COL.grid; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
      ctx.fillStyle = COL.text3; ctx.fillText(v.toFixed(dec), x1 + 10, y);
    }
    for (i = Math.ceil(first / 20) * 20; i < L; i += 20) {
      x = Math.round(xAt(i)) + 0.5;
      if (x < x0 || x > x1) continue;
      ctx.strokeStyle = COL.grid; ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y1); ctx.stroke();
    }

    var reveal = ease(S.intro);
    var fa = clamp((S.intro - 0.55) / 0.45, 0, 1);
    var baseA = ctx.globalAlpha;
    var xo = xAt(o), yo = yAt(px[o]);

    ctx.save();
    ctx.beginPath(); ctx.rect(x0, y0 - 6, Math.max(0, (x1 - x0 + dx) * reveal), y1 - y0 + 12); ctx.clip();
    ctx.beginPath(); ctx.rect(x0, y0 - 6, x1 - x0, y1 - y0 + 12); ctx.clip();

    var grad = ctx.createLinearGradient(0, y0, 0, y1);
    grad.addColorStop(0, rgba(COL.amber, 0.17)); grad.addColorStop(1, rgba(COL.amber, 0));
    ctx.beginPath(); ctx.moveTo(xAt(first), y1);
    for (i = first; i <= o; i++) ctx.lineTo(xAt(i), yAt(px[i]));
    ctx.lineTo(xo, y1); ctx.closePath(); ctx.fillStyle = grad; ctx.fill();

    var cov = 0, p50 = Math.exp(lp0 + mu * Hh);
    if (fa > 0) {
      ctx.globalAlpha = baseA * fa;
      var zs = [Z80, Z50], fills = [0.075, 0.13];
      for (var q = 0; q < 2; q++) {
        ctx.beginPath();
        for (h = 0; h <= Hh; h++) ctx.lineTo(xAt(o + h), yAt(band(h, zs[q])));
        for (h = Hh; h >= 0; h--) ctx.lineTo(xAt(o + h), yAt(band(h, -zs[q])));
        ctx.closePath(); ctx.fillStyle = rgba(COL.ice, fills[q]); ctx.fill();
      }
      ctx.strokeStyle = rgba(COL.ice, 0.32); ctx.lineWidth = 1;
      [Z80, -Z80].forEach(function (z) {
        ctx.beginPath();
        for (var hh = 0; hh <= Hh; hh++) ctx.lineTo(xAt(o + hh), yAt(band(hh, z)));
        ctx.stroke();
      });
      var Z = F.Z, Zp = F.Zp, mm = ease(F.morph);
      ctx.strokeStyle = rgba(COL.ice, 0.17); ctx.lineWidth = 1;
      for (var k = 0; k < F.K; k++) {
        ctx.beginPath(); ctx.moveTo(xo, yo);
        for (h = 1; h <= Hh && h <= F.HMAX; h++) {
          var zz = Zp ? lerp(Zp[k][h], Z[k][h], mm) : Z[k][h];
          ctx.lineTo(xAt(o + h), yAt(Math.exp(lp0 + mu * h + sd * zz)));
        }
        ctx.stroke();
      }
      if (Hh >= 10) {
        var c = lp0 + mu * Hh, s = sd * Math.sqrt(Hh), maxW = Math.min(56, (x1 - xo) * 0.4), started = false;
        ctx.beginPath();
        for (y = y0; y <= y1; y += 2) {
          p = F.lo + (y1 - y) / (y1 - y0) * (F.hi - F.lo);
          if (p <= 0) continue;
          var zd = (Math.log(p) - c) / s, d = Math.exp(-0.5 * zd * zd);
          if (!started) { ctx.moveTo(x1, y); started = true; }
          ctx.lineTo(x1 - d * maxW, y);
        }
        ctx.lineTo(x1, y1); ctx.closePath();
        ctx.fillStyle = rgba(COL.ice, 0.08); ctx.fill();
        ctx.strokeStyle = rgba(COL.ice, 0.45); ctx.stroke();
      }
      ctx.setLineDash([5, 4]); ctx.strokeStyle = rgba(COL.ice, 0.95); ctx.lineWidth = 1.5;
      ctx.beginPath(); for (h = 0; h <= Hh; h++) ctx.lineTo(xAt(o + h), yAt(Math.exp(lp0 + mu * h))); ctx.stroke();
      ctx.setLineDash([2, 4]); ctx.strokeStyle = rgba(COL.text2, 0.8); ctx.lineWidth = 1.3;
      ctx.beginPath(); for (i = o; i < L; i++) ctx.lineTo(xAt(i), yAt(px[i])); ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = baseA;
    }
    ctx.shadowColor = rgba(COL.amber, 0.55); ctx.shadowBlur = 0;
    ctx.strokeStyle = COL.amber; ctx.lineWidth = 2; ctx.lineJoin = 'round';
    ctx.beginPath(); for (i = first; i <= o; i++) ctx.lineTo(xAt(i), yAt(px[i])); ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.restore();

    for (h = 1; h <= Hh; h++) { p = px[o + h]; if (p >= band(h, -Z80) && p <= band(h, Z80)) cov++; }
    cov = Hh ? Math.round(100 * cov / Hh) : 0;

    // x labels
    ctx.font = '400 11px ' + MONO; ctx.textBaseline = 'middle'; ctx.textAlign = 'center';
    var every = narrow ? 50 : 40;
    for (var kk = -10; kk <= 10; kk++) {
      if (kk === 0) continue;
      var ii = o + kk * every;
      if (ii < first || ii >= L) continue;
      x = xAt(ii);
      if (x < x0 + 18 || x > x1 - 18 || Math.abs(x - xo) < 34) continue;
      ctx.fillStyle = COL.text3;
      ctx.fillText('t' + (kk > 0 ? '+' : '−') + Math.abs(kk * every), x, y1 + 15);
    }

    if (fa > 0) {
      ctx.globalAlpha = baseA * fa;
      ctx.setLineDash([3, 3]); ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(Math.round(xo) + 0.5, y0); ctx.lineTo(Math.round(xo) + 0.5, y1); ctx.stroke(); ctx.setLineDash([]);
      var ph = (S.now % 1600) / 1600;
      ctx.beginPath(); ctx.arc(xo, yo, 4 + ph * 13, 0, Math.PI * 2); ctx.strokeStyle = rgba(COL.amber, 0.55 * (1 - ph)); ctx.lineWidth = 1.5; ctx.stroke();
      ctx.beginPath(); ctx.arc(xo, yo, 4.2, 0, Math.PI * 2); ctx.fillStyle = COL.amber; ctx.fill();
      ctx.beginPath(); ctx.arc(xo, yo, 1.7, 0, Math.PI * 2); ctx.fillStyle = COL.ink; ctx.fill();
      chip(ctx, xo, y1 + 15, 't', COL.amber, COL.ink, 'center');
      chip(ctx, xo, y0 + 4, S.pointer.active ? 'ORIGIN' : 'NOW', 'rgba(255,255,255,0.1)', COL.text, 'center');
      var rows = narrow ? [
        ['P50  h=' + Hh, p50.toFixed(2)],
        ['80% BAND', band(Hh, -Z80).toFixed(1) + '–' + band(Hh, Z80).toFixed(1)],
        ['IN BAND', cov + '%', COL.ice]
      ] : [
        ['LAST', px[o].toFixed(2)],
        ['P50  h=' + Hh, p50.toFixed(2) + '  ' + signed((p50 / px[o] - 1) * 100, 1) + '%'],
        ['80% BAND', band(Hh, -Z80).toFixed(1) + ' – ' + band(Hh, Z80).toFixed(1)],
        ['VOL (EWMA)', (sd * 100).toFixed(2) + '%'],
        ['REALIZED IN 80%', cov + '%', COL.ice]
      ];
      hud(ctx, x0 + 10, y0 + 22, narrow ? 196 : 244, 'FORECAST', 't = ' + fmtInt(S.ticks), rows);
      if (W > 820) legend(ctx, x1 - 12, y0 + 32, [
        { label: 'OBSERVED', color: COL.amber },
        { label: 'P50', color: COL.ice, dash: [4, 3], width: 1.5 },
        { label: '50/80%', color: COL.ice, box: true },
        { label: 'REALIZED', color: COL.text2, dash: [2, 3], width: 1.3 }
      ]);
      ctx.globalAlpha = baseA;
    }
  }

  /* ---------- allocation view ---------- */
  function drawAllocate(S) {
    var ctx = S.ctx, W = S.W, H = S.H, A = S.A;
    var narrow = W < 620;
    var b = frameBox(W, H, narrow, narrow ? 48 : 64);
    var x0 = b.x0, x1 = b.x1, y0 = b.y0, y1 = b.y1;
    var n = clamp(Math.round((x1 - x0) / (narrow ? 4.2 : 5.4)), 70, 240);
    var dx = (x1 - x0) / (n - 1);
    var hist = A.hist, L = hist.length, newest = L - 2, first = newest - n;
    var shift = S.phase * dx;
    function xAt(i) { return x1 - (newest - i) * dx - shift; }
    var topY0 = y0 + 4, topY1 = y0 + (y1 - y0) * 0.45, legY = topY1 + 20, botY0 = topY1 + (W < 450 ? 58 : 38), botY1 = y1;
    var i, j, k, x, y, v;

    var lo = Infinity, hi = -Infinity;
    for (i = first; i < L; i++) { var hh = hist[i]; lo = Math.min(lo, hh.v, hh.b); hi = Math.max(hi, hh.v, hh.b); }
    var pad = Math.max((hi - lo) * 0.14, 0.002); lo -= pad; hi += pad;
    if (A.lo == null) { A.lo = lo; A.hi = hi; }
    A.lo = lerp(A.lo, lo, S.k(0.08)); A.hi = lerp(A.hi, hi, S.k(0.08));
    function yW(val) { return topY1 - (val - A.lo) / (A.hi - A.lo) * (topY1 - topY0); }
    function yS(c) { return botY1 - c * (botY1 - botY0); }

    ctx.lineWidth = 1; ctx.font = '400 11px ' + MONO; ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
    var step = niceStep((A.hi - A.lo) * 100, 3), dec = decimals(step);
    for (v = Math.ceil(A.lo * 100 / step) * step; v <= A.hi * 100; v += step) {
      y = Math.round(yW(v / 100)) + 0.5;
      ctx.strokeStyle = COL.grid; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
      ctx.fillStyle = COL.text3; ctx.fillText(v.toFixed(dec), x1 + 10, y);
    }
    [0, 0.5, 1].forEach(function (c) {
      var yy = Math.round(yS(c)) + 0.5;
      ctx.strokeStyle = COL.grid; ctx.beginPath(); ctx.moveTo(x0, yy); ctx.lineTo(x1, yy); ctx.stroke();
      ctx.fillStyle = COL.text3; ctx.fillText((c * 100) + '%', x1 + 10, yy);
    });

    var hov = null;
    if (S.pointer.active && S.pointer.x >= x0 && S.pointer.x <= x1) hov = clamp(Math.round(newest - (x1 - shift - S.pointer.x) / dx), first + 1, newest);

    var reveal = ease(S.intro);
    ctx.save();
    ctx.beginPath(); ctx.rect(x0, y0 - 6, Math.max(0, (x1 - x0 + dx) * reveal), y1 - y0 + 12); ctx.clip();
    ctx.beginPath(); ctx.rect(x0, y0 - 6, x1 - x0, y1 - y0 + 12); ctx.clip();

    var cum = new Array(L);
    for (i = first; i < L; i++) { var cc = [0], acc = 0; for (j = 0; j < A.N; j++) { acc += hist[i].w[j]; cc.push(acc); } cum[i] = cc; }
    for (k = 0; k < A.N; k++) {
      ctx.beginPath();
      for (i = first; i < L; i++) ctx.lineTo(xAt(i), yS(cum[i][k + 1]));
      for (i = L - 1; i >= first; i--) ctx.lineTo(xAt(i), yS(cum[i][k]));
      ctx.closePath(); ctx.fillStyle = rgba(A.COLORS[k], k === 4 ? 0.7 : 0.6); ctx.fill();
    }
    ctx.strokeStyle = 'rgba(10,11,14,0.85)'; ctx.lineWidth = 1;
    for (k = 1; k < A.N; k++) { ctx.beginPath(); for (i = first; i < L; i++) ctx.lineTo(xAt(i), yS(cum[i][k])); ctx.stroke(); }
    ctx.setLineDash([2, 3]); ctx.strokeStyle = 'rgba(255,255,255,0.22)';
    for (i = first; i < L; i++) if (hist[i].rebal) { x = Math.round(xAt(i)) + 0.5; ctx.beginPath(); ctx.moveTo(x, botY0); ctx.lineTo(x, botY1); ctx.stroke(); }
    ctx.setLineDash([]);

    var grad = ctx.createLinearGradient(0, topY0, 0, topY1);
    grad.addColorStop(0, rgba(COL.amber, 0.14)); grad.addColorStop(1, rgba(COL.amber, 0));
    ctx.beginPath(); ctx.moveTo(xAt(first), topY1);
    for (i = first; i < L; i++) ctx.lineTo(xAt(i), yW(hist[i].v));
    ctx.lineTo(xAt(L - 1), topY1); ctx.closePath(); ctx.fillStyle = grad; ctx.fill();
    ctx.setLineDash([4, 3]); ctx.strokeStyle = rgba(COL.text2, 0.85); ctx.lineWidth = 1.4;
    ctx.beginPath(); for (i = first; i < L; i++) ctx.lineTo(xAt(i), yW(hist[i].b)); ctx.stroke(); ctx.setLineDash([]);
    ctx.shadowColor = rgba(COL.amber, 0.5); ctx.shadowBlur = 0; ctx.strokeStyle = COL.amber; ctx.lineWidth = 2;
    ctx.beginPath(); for (i = first; i < L; i++) ctx.lineTo(xAt(i), yW(hist[i].v)); ctx.stroke(); ctx.shadowBlur = 0;
    ctx.restore();

    var at = hov == null ? newest : hov;
    if (hov != null) {
      x = Math.round(xAt(hov)) + 0.5;
      ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(x, topY0); ctx.lineTo(x, botY1); ctx.stroke(); ctx.setLineDash([]);
      ctx.beginPath(); ctx.arc(x, yW(hist[hov].v), 4, 0, Math.PI * 2); ctx.fillStyle = COL.amber; ctx.fill();
      ctx.beginPath(); ctx.arc(x, yW(hist[hov].b), 3.2, 0, Math.PI * 2); ctx.fillStyle = COL.text2; ctx.fill();
      chip(ctx, x, y1 + 15, 't−' + (newest - hov), COL.amber, COL.ink, 'center');
    }

    ctx.save();
    ctx.font = '400 11px ' + MONO; ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
    var lx = x0 + 2, wAt = hist[at].w;
    for (k = 0; k < A.N; k++) {
      if (W < 450 && k === 3) { lx = x0 + 2; legY += 18; }
      var label = (narrow ? A.SHORT[k] : A.NAMES[k]) + ' ' + Math.round(wAt[k] * 100) + '%';
      ctx.fillStyle = A.COLORS[k]; rrect(ctx, lx, legY - 4, 8, 8, 2); ctx.fill();
      ctx.fillStyle = COL.text2; ctx.fillText(label, lx + 13, legY);
      lx += ctx.measureText(label).width + 13 + (narrow ? 12 : 22);
    }
    ctx.restore();

    var f0 = hist[Math.max(first, 0)], fe = hist[at];
    var mRet = (fe.v / f0.v - 1) * 100, bRet = (fe.b / f0.b - 1) * 100;
    var rows = narrow ? [
      ['MODEL', signed(mRet, 1) + '%', COL.amber],
      ['1/N', signed(bRet, 1) + '%'],
      ['ACTIVE', signed(mRet - bRet, 1) + ' pp']
    ] : [
      ['MODEL (window)', signed(mRet, 2) + '%', COL.amber],
      ['1/N (window)', signed(bRet, 2) + '%'],
      ['ACTIVE', signed(mRet - bRet, 2) + ' pp'],
      ['LAST TURNOVER', (A.turnover() * 100).toFixed(1) + '%'],
      ['NEXT REBALANCE', 'in ' + A.untilRebal()]
    ];
    hud(ctx, x0 + 10, topY0 + 4, narrow ? 176 : 232, 'ALLOCATION', 'REBAL / 24', rows);
    if (W > 820) legend(ctx, x1 - 12, topY0 + 16, [
      { label: 'MODEL', color: COL.amber },
      { label: '1/N BENCHMARK', color: COL.text2, dash: [4, 3], width: 1.4 }
    ]);
  }

  /* ---------- order book view ---------- */
  function drawBook(S) {
    var ctx = S.ctx, W = S.W, H = S.H, B = S.B;
    var narrow = W < 620;
    var LV = narrow ? 16 : B.LV;
    var x0 = 14, x1 = W - 14, y0 = narrow ? 92 : 14, y1 = H - 28;
    var ladH = (y1 - y0) * 0.2;
    var dY0 = y0 + 8, dY1 = y1 - ladH - 20, lY1 = y1;
    var lw = (x1 - x0) / (2 * LV), midX = (x0 + x1) / 2;
    var m = B.m(), tick = B.tick, i, x, y;
    function bidL(j) { return midX - (j + 1) * lw; }
    function askL(j) { return midX + j * lw; }
    function xOf(price) { return midX + (price / tick - (m + 0.5)) * lw; }

    var cumB = [], cumA = [], cb = 0, ca = 0, maxS = 0;
    for (i = 0; i < LV; i++) { cb += B.bids[i]; ca += B.asks[i]; cumB.push(cb); cumA.push(ca); maxS = Math.max(maxS, B.bids[i], B.asks[i]); }
    var maxC = Math.max(cb, ca) * 1.12;
    B.vmaxC = B.vmaxC == null ? maxC : lerp(B.vmaxC, maxC, S.k(0.05));
    B.vmaxS = B.vmaxS == null ? maxS * 1.1 : lerp(B.vmaxS, maxS * 1.1, S.k(0.05));
    function yD(c) { return dY1 - Math.min(1, c / B.vmaxC) * (dY1 - dY0); }

    ctx.lineWidth = 1;
    for (i = 1; i <= 3; i++) {
      y = Math.round(dY1 - (dY1 - dY0) * i / 3.4) + 0.5;
      ctx.strokeStyle = COL.grid; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
    }
    var reveal = ease(S.intro);
    ctx.save();
    var half = (x1 - x0) / 2 * reveal;
    ctx.beginPath(); ctx.rect(midX - half, y0 - 4, half * 2, y1 - y0 + 8); ctx.clip();

    function side(cum, left, color) {
      var g = ctx.createLinearGradient(0, dY0, 0, dY1);
      g.addColorStop(0, rgba(color, 0.3)); g.addColorStop(1, rgba(color, 0.04));
      function trace() {
        ctx.moveTo(midX, dY1); ctx.lineTo(midX, yD(cum[0]));
        for (var j = 0; j < LV; j++) {
          var xe = left ? bidL(j) : askL(j) + lw;
          ctx.lineTo(xe, yD(cum[j]));
          if (j + 1 < LV) ctx.lineTo(xe, yD(cum[j + 1]));
        }
      }
      ctx.beginPath(); trace();
      ctx.lineTo(left ? bidL(LV - 1) : askL(LV - 1) + lw, dY1); ctx.closePath();
      ctx.fillStyle = g; ctx.fill();
      ctx.beginPath(); trace();
      ctx.shadowColor = rgba(color, 0.5); ctx.shadowBlur = 0;
      ctx.strokeStyle = color; ctx.lineWidth = 1.75; ctx.stroke(); ctx.shadowBlur = 0;
    }
    side(cumB, true, COL.amber);
    side(cumA, false, COL.ice);

    for (i = 0; i < LV; i++) {
      var hb = B.bids[i] / B.vmaxS * ladH, ha = B.asks[i] / B.vmaxS * ladH;
      ctx.fillStyle = rgba(COL.amber, 0.6); ctx.fillRect(bidL(i) + 1, lY1 - hb, lw - 2, hb);
      ctx.fillStyle = rgba(COL.ice, 0.6); ctx.fillRect(askL(i) + 1, lY1 - ha, lw - 2, ha);
    }
    for (i = 0; i < B.trades.length; i++) {
      var tr = B.trades[i], age = (S.now - tr.t) / 900;
      if (age < 0 || age > 1) continue;
      x = xOf(tr.px);
      if (x < x0 || x > x1) continue;
      var col = tr.buy ? COL.ice : COL.amber;
      ctx.beginPath(); ctx.arc(x, dY1, 3 + 20 * ease(age), 0, Math.PI * 2);
      ctx.strokeStyle = rgba(col, 0.85 * (1 - age)); ctx.lineWidth = 1.5; ctx.stroke();
      ctx.beginPath(); ctx.arc(x, dY1, 2.5, 0, Math.PI * 2); ctx.fillStyle = rgba(col, 1 - age); ctx.fill();
    }
    ctx.restore();

    ctx.setLineDash([3, 3]); ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(Math.round(midX) + 0.5, dY0 + 14); ctx.lineTo(Math.round(midX) + 0.5, y1); ctx.stroke(); ctx.setLineDash([]);
    chip(ctx, midX, dY0 + 4, 'MID ' + ((m + 0.5) * tick).toFixed(2), 'rgba(255,255,255,0.1)', COL.text, 'center');

    ctx.font = '400 10.5px ' + MONO; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    var every = narrow ? (W < 350 ? 8 : 5) : 6;
    for (i = every - 1; i < LV; i += every) {
      ctx.fillStyle = COL.text3;
      ctx.fillText(((m - i) * tick).toFixed(2), bidL(i) + lw / 2, y1 + 15);
      ctx.fillText(((m + 1 + i) * tick).toFixed(2), askL(i) + lw / 2, y1 + 15);
    }

    if (S.pointer.active && S.pointer.x > x0 && S.pointer.x < x1) {
      var px = S.pointer.x, isBid = px < midX;
      var lv = Math.floor(Math.abs(px - midX) / lw);
      if (lv < LV) {
        var cx = isBid ? bidL(lv) + lw / 2 : askL(lv) + lw / 2;
        var price = isBid ? (m - lv) * tick : (m + 1 + lv) * tick;
        var depth = isBid ? cumB[lv] : cumA[lv];
        var cy = yD(depth);
        ctx.setLineDash([3, 3]); ctx.strokeStyle = 'rgba(255,255,255,0.35)';
        ctx.beginPath(); ctx.moveTo(Math.round(cx) + 0.5, dY0); ctx.lineTo(Math.round(cx) + 0.5, y1); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x0, Math.round(cy) + 0.5); ctx.lineTo(x1, Math.round(cy) + 0.5); ctx.stroke(); ctx.setLineDash([]);
        ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2); ctx.fillStyle = isBid ? COL.amber : COL.ice; ctx.fill();
        var lab = price.toFixed(2) + ' · ' + (isBid ? 'BID' : 'ASK') + ' DEPTH ' + fmtInt(depth);
        chip(ctx, clamp(cx, x0 + 110, x1 - 110), cy - 16, lab, isBid ? COL.amber : COL.ice, COL.ink, 'center');
      }
    }

    var I = B.imb(), last = B.trades[B.trades.length - 1];
    var rows = [
      ['BID', (m * tick).toFixed(2), COL.amber],
      ['ASK', ((m + 1) * tick).toFixed(2), COL.ice],
      ['SPREAD', tick.toFixed(2)],
      ['IMBALANCE (L5)', signed(I, 2), I >= 0 ? COL.amber : COL.ice]
    ];
    if (!narrow && last) rows.push(['LAST', (last.buy ? 'BUY ' : 'SELL ') + fmtInt(last.size) + ' @ ' + last.px.toFixed(2), last.buy ? COL.ice : COL.amber]);
    var hw = narrow ? 186 : 246, hx = x0 + 10, hy = y0 + 22;
    var hh = hud(ctx, hx, hy, hw, 'ORDER BOOK', 'L1–L' + LV, rows);
    var gy = narrow ? 82 : hy + hh - 7, gx0 = narrow ? 14 : hx + 12, gw = narrow ? W - 28 : hw - 24;
    ctx.fillStyle = 'rgba(255,255,255,0.08)'; ctx.fillRect(gx0, gy, gw, 3);
    var gm = gx0 + gw / 2, gl = gw / 2 * Math.min(1, Math.abs(I) * 2);
    ctx.fillStyle = I >= 0 ? COL.amber : COL.ice;
    if (I >= 0) ctx.fillRect(gm - gl, gy, gl, 3); else ctx.fillRect(gm, gy, gl, 3);

    if (W > 700) {
      var sw = 210, sh = 64, sx = x1 - sw - 10, sy = y0 + 22, mids = B.mids, nn = Math.min(240, mids.length);
      ctx.fillStyle = COL.panel; rrect(ctx, sx, sy, sw, sh, 11); ctx.fill();
      ctx.strokeStyle = COL.panelLine; ctx.lineWidth = 1; ctx.stroke();
      ctx.font = '500 10.5px ' + MONO; ctx.fillStyle = COL.text3; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      ctx.fillText('MID · LAST ' + nn, sx + 12, sy + 14);
      var mlo = Infinity, mhi = -Infinity;
      for (i = mids.length - nn; i < mids.length; i++) { mlo = Math.min(mlo, mids[i]); mhi = Math.max(mhi, mids[i]); }
      if (mhi - mlo < tick * 4) { var cmid = (mhi + mlo) / 2; mlo = cmid - tick * 2; mhi = cmid + tick * 2; }
      ctx.strokeStyle = COL.amber; ctx.lineWidth = 1.5; ctx.beginPath();
      for (i = 0; i < nn; i++) {
        var val = mids[mids.length - nn + i];
        ctx.lineTo(sx + 12 + i / (nn - 1) * (sw - 24), sy + sh - 10 - (val - mlo) / (mhi - mlo) * (sh - 34));
      }
      ctx.stroke();
    }
  }

  /* ---------- controller ---------- */
  function create(canvas, opts) {
    opts = opts || {};
    var ctx = canvas.getContext('2d');
    if (!ctx) return null;
    var paused = !!opts.paused || !!opts.reducedMotion;
    var S = {
      ctx: ctx, W: 0, H: 0, dpr: 1, mode: opts.mode || 'forecast', phase: 0, acc: 0, now: 0, dt: 16.7,
      intro: paused ? 1 : 0, fade: 1, ticks: 0,
      pointer: { x: 0, y: 0, active: false },
      F: makeForecast(), A: makeAlloc(), B: makeBook(),
      k: function (base) { return paused ? 1 : 1 - Math.pow(1 - base, S.dt / 16.7); }
    };
    var raf = 0, last = 0, inView = true, dead = false, touchTimer = 0;

    function resize() {
      var w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      S.dpr = Math.min(2, window.devicePixelRatio || 1);
      S.W = w; S.H = h;
      canvas.width = Math.round(w * S.dpr);
      canvas.height = Math.round(h * S.dpr);
    }
    function advance(now) {
      S.ticks++;
      if (S.mode === 'forecast') S.F.next();
      else if (S.mode === 'allocate') S.A.next();
      else S.B.next(now);
    }
    function draw() {
      if (!S.W) resize();
      if (!S.W) return;
      ctx.setTransform(S.dpr, 0, 0, S.dpr, 0, 0);
      ctx.clearRect(0, 0, S.W, S.H);
      ctx.globalAlpha = ease(S.fade);
      if (S.mode === 'forecast') drawForecast(S);
      else if (S.mode === 'allocate') drawAllocate(S);
      else drawBook(S);
      ctx.globalAlpha = 1;
    }
    function requestDraw() { if (!dead && !raf) raf = requestAnimationFrame(frame); }
    function frame(now) {
      raf = 0;
      if (dead || !inView || document.hidden) { last = 0; return; }
      var dt = last ? Math.min(100, now - last) : 16.7;
      last = paused ? 0 : now; S.dt = dt;
      if (!paused) {
        S.now += dt;
        var step = STEP[S.mode], guard = 0;
        S.acc += dt;
        while (S.acc >= step && guard < 5) { S.acc -= step; advance(S.now); guard++; }
        if (guard >= 5) S.acc = 0;
        S.phase = S.acc / step;
        S.intro = Math.min(1, S.intro + dt / 1500);
        S.fade = Math.min(1, S.fade + dt / 420);
        S.F.morph = Math.min(1, S.F.morph + dt / 520);
      } else { S.intro = 1; S.fade = 1; S.F.morph = 1; }
      draw();
      if (!paused) requestDraw();
    }
    function onVisibility() { last = 0; requestDraw(); }
    function toLocal(e) {
      var r = canvas.getBoundingClientRect();
      S.pointer.x = (e.clientX - r.left) * (S.W / r.width);
      S.pointer.y = (e.clientY - r.top) * (S.H / r.height);
    }
    function onMove(e) { toLocal(e); S.pointer.active = true; clearTimeout(touchTimer); requestDraw(); }
    function onLeave(e) {
      if (e.pointerType === 'touch') { clearTimeout(touchTimer); touchTimer = setTimeout(function () { S.pointer.active = false; requestDraw(); }, 2500); }
      else S.pointer.active = false;
      requestDraw();
    }
    function onDown(e) { toLocal(e); S.pointer.active = true; clearTimeout(touchTimer); requestDraw(); }
    function onClick() { if (S.mode === 'forecast') resample(); }
    function resample() { var F = S.F; F.Zp = F.Z; F.seed += 1; F.Z = F.makeZ(F.seed * 7919); F.morph = paused ? 1 : 0; requestDraw(); }

    function onKey(e) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        S.pointer.x = clamp((S.pointer.active ? S.pointer.x : S.W * 0.68) + (e.key === 'ArrowLeft' ? -1 : 1) * S.W * 0.04, 24, S.W - 54);
        S.pointer.active = true; requestDraw();
      } else if (e.key === 'Escape') { S.pointer.active = false; requestDraw(); }
      else if ((e.key === 'Enter' || e.key === ' ') && S.mode === 'forecast') { e.preventDefault(); resample(); }
    }
    canvas.addEventListener('keydown', onKey);
    document.addEventListener('visibilitychange', onVisibility);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointerleave', onLeave);
    canvas.addEventListener('pointercancel', onLeave);
    canvas.addEventListener('click', onClick);
    var ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(function () { resize(); requestDraw(); }) : null;
    if (ro) ro.observe(canvas); else window.addEventListener('resize', resize);
    var io = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(function (es) { inView = es[es.length - 1].isIntersecting; last = 0; if (inView) requestDraw(); }, { threshold: 0 }) : null;
    if (io) io.observe(canvas);
    resize();
    requestDraw();

    return {
      setMode: function (m) { if (m === S.mode || !STEP[m]) return; S.mode = m; S.fade = paused ? 1 : 0; S.acc = 0; S.phase = 0; S.pointer.active = false; requestDraw(); },
      getMode: function () { return S.mode; },
      setPaused: function (value) { paused = !!value; last = 0; requestDraw(); },
      resample: resample,
      destroy: function () {
        dead = true; cancelAnimationFrame(raf); clearTimeout(touchTimer);
        canvas.removeEventListener('keydown', onKey);
        document.removeEventListener('visibilitychange', onVisibility);
        canvas.removeEventListener('pointermove', onMove);
        canvas.removeEventListener('pointerdown', onDown);
        canvas.removeEventListener('pointerleave', onLeave);
        canvas.removeEventListener('pointercancel', onLeave);
        canvas.removeEventListener('click', onClick);
        if (ro) ro.disconnect(); else window.removeEventListener('resize', resize);
        if (io) io.disconnect();
      }
    };
  }

  root.TSITerminal = { create: create, rng: rng, normal: normal };
})(typeof window !== 'undefined' ? window : this);
