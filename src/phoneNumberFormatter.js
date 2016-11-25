const formats = require('./formats.js').default;

function formatForPhone_(phone, defaultPrefix = null) {
  if (phone.indexOf('+') !== 0 && defaultPrefix) {
    phone = defaultPrefix + phone.replace(/[^0-9]/g, '');
  } else {
    phone = `+${phone.replace(/[^0-9]/g, '')}`;
  }

  let bestFormat = null;
  let precision = 0;

  Object.keys(formats).forEach( (prefix) => {
    const format = formats[prefix]

    if (phone.length >= prefix.length && phone.substring(0, prefix.length) === prefix && prefix.length > precision) {
      bestFormat = {};

      Object.keys(format).forEach( (key) => {
        bestFormat[key] = format[key];
      })

      bestFormat.prefix = prefix;
      precision = prefix.length;
    }
  })
  return bestFormat;
}

function prefixesAreSubsets_(prefixA, prefixB) {
  if (prefixA === prefixB) {
    return true;
  }

  if (prefixA.length < prefixB.length) {
    return prefixB.substring(0, prefixA.length) === prefixA;
  }

  return prefixA.substring(0, prefixB.length) === prefixB;
}

function formattedPhoneNumber_(phone, lastChar, defaultPrefix = null) {
  let formattedPhone;
  let formatDigitCount;
  let phoneDigits;
  let prefixPhoneFormat;
  let phonePrefix;
  let phoneFormat;
  let format;

  if (phone.length !== 0 && (phone.substring(0, 1) === '+' || defaultPrefix)) {
    format = formatForPhone_(phone, defaultPrefix);

    if (format && format.format) {
      phoneFormat = format.format;
      phonePrefix = format.prefix;

      if (defaultPrefix) {
        if ((defaultPrefix === phonePrefix || prefixesAreSubsets_(phonePrefix, defaultPrefix)) && (phone.indexOf('+') !== 0 || phone.length === 0)) {
          phoneFormat = phoneFormat.substring(Math.min(phonePrefix.length, defaultPrefix.length) + 1);

          if (format.nationalPrefix != null) {
            prefixPhoneFormat = '';

            for (const i of Shopify.range({
              from: 0,
              to: format.nationalPrefix.length,
              inclusive: false,
            })) {
              prefixPhoneFormat += '.';
            }

            phoneFormat = prefixPhoneFormat + phoneFormat;
          }
        }
      }

      if (phone.substring(0, 1) === '+') {
        phoneDigits = phone.substring(1);
      } else {
        phoneDigits = phone;
      }

      formatDigitCount = phoneFormat.match(/\./g).length;
      formattedPhone = '';

      for (const formatChar of phoneFormat) {
        if (formatChar === '.') {
          if (phoneDigits.length === 0) {
            break;
          }

          formattedPhone += phoneDigits.substring(0, 1);
          phoneDigits = phoneDigits.substring(1);
        } else if (lastChar || phoneDigits.length > 0) {
          formattedPhone += formatChar;
        }
      }

      phone = formattedPhone + phoneDigits;
    }
  }

  return phone;
}

function isEventAllowed_(e) {
  if (e.metaKey) {
    return true;
  }

  if (e.which === 32) {
    return false;
  }

  if (e.which === 0) {
    return true;
  }

  if (e.which < 33) {
    return true;
  }

  return isEventAllowedChar_(e);
}

var isEventAllowedChar_ = e => {
  const char = String.fromCharCode(e.which);
  return Boolean(/[\d\s+]/.test(char));
};

function restrictEventAndFormat_(e) {
  if (!isEventAllowed_(e)) {
    e.preventDefault();
    return;
  }

  if (!isEventAllowedChar_(e)) {
    return;
  }

  let value = this.val();
  const caretEnd = this.get(0).selectionEnd;
  value = value.substring(0, caretPosition_.call(this)) + String.fromCharCode(e.which) + value.substring(caretEnd, value.length);
  return format_.call(this, value, e);
}

function formatUp_(e) {
  checkForCountryChange_.call(this);
  const value = this.val();

  if (e.keyCode === 8 && caretPosition_.call(this) === value.length) {
    return;
  }

  return format_.call(this, value, e);
}

function formatBack_(e) {
  if (!e) {
    return;
  }

  if (e.meta) {
    return;
  }

  let value = this.val();

  if (value.length === 0) {
    return;
  }

  if (!(caretPosition_.call(this) === value.length)) {
    return;
  }

  if (e.keyCode !== 8) {
    return;
  }

  value = value.substring(0, value.length - 1);
  e.preventDefault();
  const phone = formattedPhone_.call(this, value, false);

  if (this.val() !== phone) {
    return this.val(phone);
  }
}

var format_ = function(value, e) {
  let selectionAtEnd;
  let selection;
  let textBeforeCaret;
  const phone = formattedPhone_.call(this, value, true);

  if (phone !== this.val()) {
    textBeforeCaret = value.slice(0, caretPosition_.call(this) + 1).replace(/\D+/g, '');
    e.preventDefault();
    this.val(phone);
    selection = getNewCaretPosition_.call(this, textBeforeCaret);
    selectionAtEnd = selection === this.val().length;

    if (!selectionAtEnd) {
      return setCaretPosition_.call(this, selection);
    }
  }
};

var formattedPhone_ = function(phone, lastChar) {
  if (phone.indexOf('+') !== 0 && this.data('defaultPrefix')) {
    phone = phone.replace(/[^0-9]/g, '');
  } else {
    phone = `+${phone.replace(/[^0-9]/g, '')}`;
  }

  return formattedPhoneNumber_(phone, lastChar, this.data('defaultPrefix'));
};

var checkForCountryChange_ = function() {
  const phone = this.val();
  const format = formatForPhone_(phone, this.data('defaultPrefix'));
  let country = null;

  if (format) {
    country = format.country;
  }

  if (this.data('mobilePhoneCountry') !== country) {
    this.data('mobilePhoneCountry', country);
    return this.trigger('country.mobilePhoneNumber', country);
  }
};

var getNewCaretPosition_ = function(textBeforeCaret) {
  if (!textBeforeCaret) {
    return this.val().length;
  }

  let caretPosition = 0;

  for (const char of this.val()) {
    if (!textBeforeCaret) {
      break;
    }

    if (char === textBeforeCaret[0]) {
      textBeforeCaret = textBeforeCaret.substring(1);
    }

    caretPosition++;
  }

  if (isNaN(this.val().slice(caretPosition, caretPosition + 1))) {
    return caretPosition + this.val().slice(caretPosition).split(/\d/)[0].length;
  }

  return caretPosition;
};

var caretPosition_ = function() {
  return this[0].selectionStart;
};

var setCaretPosition_ = function(position) {
  return this[0].setSelectionRange(position, position);
};

function browserNotSupported() {
  if (!'selectionStart' in document.createElement('input')) {
    return true;
  }

  return false;
}

const mobilePhoneNumber = {};

mobilePhoneNumber.init = function(options = {}) {
  let ref;

  if (browserNotSupported()) {
    return;
  }

  if (!this.data('mobilePhoneNumberInited')) {
    this.data('mobilePhoneNumberInited', true);

    this.bind('keypress', restrictEventAndFormat_.bind($(this)));

    this.bind('keyup', formatUp_.bind($(this)));

    this.bind('keydown', formatBack_.bind($(this)));
  }

  this.data('defaultPrefix', (ref = options.allowPhoneWithoutPrefix) != null ? ref : options.defaultPrefix);

  if (this.val() !== '') {
    this.val(formattedPhone_.call(this, this.val(), false));
  }

  return this;
};

mobilePhoneNumber.val = function() {
  const val = this.val().replace(/[^0-9]/g, '');
  const format = formatForPhone_(val, this.data('defaultPrefix'));

  if (this.val().indexOf('+') === 0 || !(this.data('defaultPrefix') != null)) {
    return `+${val}`;
  } else {
    return this.data('defaultPrefix') + val;
  }
};

mobilePhoneNumber.validate = function() {
  const val = this.mobilePhoneNumber('val');
  const format = formatForPhone_(val, this.data('defaultPrefix'));

  if (!format) {
    return true;
  }

  return val.length > format.prefix.length;
};

mobilePhoneNumber.country = function() {
  const format = formatForPhone_(this.mobilePhoneNumber('val'));

  if (format) {
    return format.country;
  }
};

mobilePhoneNumber.prefix = function() {
  const countryCode = this.mobilePhoneNumber('country');

  if (!(countryCode != null)) {
    return '';
  }

  return $.mobilePhoneNumberPrefixFromCountryCode(countryCode);
};

$.fn.mobilePhoneNumber = function(method, ...args) {
  var args;

  if (!(typeof method !== 'undefined' && method !== null) || !(typeof (method) === 'string')) {
    if (method != null) {
      args = [method];
    }

    method = 'init';
  }

  return mobilePhoneNumber[method].apply(this, args);
};

$.formatMobilePhoneNumber = phone => {
  phone = `+${phone.replace(/[^0-9\*]/g, '')}`;
  return formattedPhoneNumber_(phone, true);
};

$.mobilePhoneNumberPrefixFromCountryCode = countryCode => {
  Object.keys(formats).forEach( (prefix) => {
    const format = formats[prefix]
    if (format.country.toLowerCase() === countryCode.toLowerCase()) {
      if (prefix.length === 5 && prefix[1] === '1') {
        return '+1';
      }

      return prefix;
    }
  })

  return null;
};
