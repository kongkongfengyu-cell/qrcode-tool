/* 二维码生成器 - 纯前端，本地生成 */
(function () {
  'use strict';

  var DEFAULT_TEXT = 'https://example.com';

  var els = {
    text: document.getElementById('qr-text'),
    dotStyle: document.getElementById('dot-style'),
    eccLevel: document.getElementById('ecc-level'),
    fg: document.getElementById('fg-color'),
    bg: document.getElementById('bg-color'),
    size: document.getElementById('size'),
    sizeValue: document.getElementById('size-value'),
    logoInput: document.getElementById('logo-input'),
    logoBtn: document.getElementById('logo-btn'),
    logoClear: document.getElementById('logo-clear'),
    qrBox: document.getElementById('qr-box'),
    emptyHint: document.getElementById('empty-hint'),
    dlPng: document.getElementById('dl-png'),
    dlSvg: document.getElementById('dl-svg')
  };

  var state = {
    text: '',
    dotType: 'square',
    level: 'M',
    fg: '#111827',
    bg: '#ffffff',
    size: 512,
    logo: ''
  };

  // 点样式与定位点样式的映射，让整体风格统一
  var CORNER_MAP = {
    'square': 'square',
    'extra-rounded': 'extra-rounded',
    'dots': 'dot'
  };

  // 底层 qrcode 库默认按 charCode & 0xff 逐字节编码，中文会被静默截断成乱码。
  // 这里先用 encodeURIComponent + unescape 把字符串转成"UTF-8 字节的 latin1 映射"，
  // 让底层逐字节处理后恰好得到正确的 UTF-8 字节流，扫码器即可正确解码中文。
  function toUtf8(str) {
    return unescape(encodeURIComponent(str));
  }

  function buildOptions() {
    var hasText = state.text.trim().length > 0;
    return {
      width: state.size,
      height: state.size,
      type: 'canvas',
      data: toUtf8(hasText ? state.text : DEFAULT_TEXT),
      margin: 8,
      qrOptions: { errorCorrectionLevel: state.level },
      image: state.logo || '',
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.35,
        margin: 6,
        crossOrigin: 'anonymous'
      },
      dotsOptions: { color: state.fg, type: state.dotType },
      backgroundOptions: { color: state.bg },
      cornersSquareOptions: { color: state.fg, type: CORNER_MAP[state.dotType] || 'square' },
      cornersDotOptions: { color: state.fg }
    };
  }

  var qr = new QRCodeStyling(buildOptions());
  qr.append(els.qrBox);

  function refresh() {
    var hasText = state.text.trim().length > 0;
    qr.update(buildOptions());
    els.qrBox.classList.toggle('is-placeholder', !hasText);
    els.emptyHint.style.display = hasText ? 'none' : '';
  }

  function debounce(fn, ms) {
    var t;
    return function () {
      var self = this, args = arguments;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(self, args); }, ms);
    };
  }
  var refreshSoon = debounce(refresh, 200);

  // 分段选择器通用绑定
  function bindSegmented(container, onPick) {
    container.addEventListener('click', function (e) {
      var btn = e.target.closest('button');
      if (!btn) return;
      var all = container.querySelectorAll('button');
      for (var i = 0; i < all.length; i++) all[i].classList.remove('active');
      btn.classList.add('active');
      onPick(btn.dataset.value);
    });
  }

  function setSegmentedValue(container, value) {
    var all = container.querySelectorAll('button');
    for (var i = 0; i < all.length; i++) {
      all[i].classList.toggle('active', all[i].dataset.value === value);
    }
  }

  // --- 事件绑定 ---

  els.text.addEventListener('input', function () {
    state.text = this.value;
    refreshSoon();
  });

  bindSegmented(els.dotStyle, function (v) {
    state.dotType = v;
    refresh();
  });

  bindSegmented(els.eccLevel, function (v) {
    state.level = v;
    refresh();
  });

  els.fg.addEventListener('input', function () {
    state.fg = this.value;
    refreshSoon();
  });

  els.bg.addEventListener('input', function () {
    state.bg = this.value;
    refreshSoon();
  });

  els.size.addEventListener('input', function () {
    state.size = parseInt(this.value, 10);
    els.sizeValue.textContent = state.size + ' × ' + state.size;
    refreshSoon();
  });

  // Logo 嵌入：嵌入时自动切到最高容错 H，保证扫码成功率
  els.logoBtn.addEventListener('click', function () {
    els.logoInput.click();
  });

  els.logoInput.addEventListener('change', function () {
    var file = this.files && this.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (e) {
      state.logo = e.target.result;
      state.level = 'H';
      setSegmentedValue(els.eccLevel, 'H');
      els.logoClear.hidden = false;
      refresh();
    };
    reader.readAsDataURL(file);
  });

  els.logoClear.addEventListener('click', function () {
    state.logo = '';
    els.logoInput.value = '';
    this.hidden = true;
    refresh();
  });

  els.dlPng.addEventListener('click', function () {
    qr.download({ name: 'qrcode-' + Date.now(), extension: 'png' });
  });

  els.dlSvg.addEventListener('click', function () {
    qr.download({ name: 'qrcode-' + Date.now(), extension: 'svg' });
  });

  refresh();
})();
