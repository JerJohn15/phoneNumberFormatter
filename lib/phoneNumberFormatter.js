/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var formats = __webpack_require__(1).default;

	function formatForPhone_(phone) {
	  var defaultPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	  if (phone.indexOf('+') !== 0 && defaultPrefix) {
	    phone = defaultPrefix + phone.replace(/[^0-9]/g, '');
	  } else {
	    phone = '+' + phone.replace(/[^0-9]/g, '');
	  }

	  var bestFormat = null;
	  var precision = 0;

	  Object.keys(formats).forEach(function (prefix) {
	    var format = formats[prefix];

	    if (phone.length >= prefix.length && phone.substring(0, prefix.length) === prefix && prefix.length > precision) {
	      bestFormat = {};

	      Object.keys(format).forEach(function (key) {
	        bestFormat[key] = format[key];
	      });

	      bestFormat.prefix = prefix;
	      precision = prefix.length;
	    }
	  });
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

	function formattedPhoneNumber_(phone, lastChar) {
	  var defaultPrefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

	  var formattedPhone = void 0;
	  var formatDigitCount = void 0;
	  var phoneDigits = void 0;
	  var prefixPhoneFormat = void 0;
	  var phonePrefix = void 0;
	  var phoneFormat = void 0;
	  var format = void 0;

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

	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	              for (var _iterator = Shopify.range({
	                from: 0,
	                to: format.nationalPrefix.length,
	                inclusive: false
	              })[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var i = _step.value;

	                prefixPhoneFormat += '.';
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

	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = phoneFormat[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var formatChar = _step2.value;

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

	var isEventAllowedChar_ = function isEventAllowedChar_(e) {
	  var char = String.fromCharCode(e.which);
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

	  var value = this.val();
	  var caretEnd = this.get(0).selectionEnd;
	  value = value.substring(0, caretPosition_.call(this)) + String.fromCharCode(e.which) + value.substring(caretEnd, value.length);
	  return format_.call(this, value, e);
	}

	function formatUp_(e) {
	  checkForCountryChange_.call(this);
	  var value = this.val();

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

	  var value = this.val();

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
	  var phone = formattedPhone_.call(this, value, false);

	  if (this.val() !== phone) {
	    return this.val(phone);
	  }
	}

	var format_ = function format_(value, e) {
	  var selectionAtEnd = void 0;
	  var selection = void 0;
	  var textBeforeCaret = void 0;
	  var phone = formattedPhone_.call(this, value, true);

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

	var formattedPhone_ = function formattedPhone_(phone, lastChar) {
	  if (phone.indexOf('+') !== 0 && this.data('defaultPrefix')) {
	    phone = phone.replace(/[^0-9]/g, '');
	  } else {
	    phone = '+' + phone.replace(/[^0-9]/g, '');
	  }

	  return formattedPhoneNumber_(phone, lastChar, this.data('defaultPrefix'));
	};

	var checkForCountryChange_ = function checkForCountryChange_() {
	  var phone = this.val();
	  var format = formatForPhone_(phone, this.data('defaultPrefix'));
	  var country = null;

	  if (format) {
	    country = format.country;
	  }

	  if (this.data('mobilePhoneCountry') !== country) {
	    this.data('mobilePhoneCountry', country);
	    return this.trigger('country.mobilePhoneNumber', country);
	  }
	};

	var getNewCaretPosition_ = function getNewCaretPosition_(textBeforeCaret) {
	  if (!textBeforeCaret) {
	    return this.val().length;
	  }

	  var caretPosition = 0;

	  var _iteratorNormalCompletion3 = true;
	  var _didIteratorError3 = false;
	  var _iteratorError3 = undefined;

	  try {
	    for (var _iterator3 = this.val()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	      var char = _step3.value;

	      if (!textBeforeCaret) {
	        break;
	      }

	      if (char === textBeforeCaret[0]) {
	        textBeforeCaret = textBeforeCaret.substring(1);
	      }

	      caretPosition++;
	    }
	  } catch (err) {
	    _didIteratorError3 = true;
	    _iteratorError3 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion3 && _iterator3.return) {
	        _iterator3.return();
	      }
	    } finally {
	      if (_didIteratorError3) {
	        throw _iteratorError3;
	      }
	    }
	  }

	  if (isNaN(this.val().slice(caretPosition, caretPosition + 1))) {
	    return caretPosition + this.val().slice(caretPosition).split(/\d/)[0].length;
	  }

	  return caretPosition;
	};

	var caretPosition_ = function caretPosition_() {
	  return this[0].selectionStart;
	};

	var setCaretPosition_ = function setCaretPosition_(position) {
	  return this[0].setSelectionRange(position, position);
	};

	function browserNotSupported() {
	  if (!'selectionStart' in document.createElement('input')) {
	    return true;
	  }

	  return false;
	}

	var mobilePhoneNumber = {};

	mobilePhoneNumber.init = function () {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  var ref = void 0;

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

	mobilePhoneNumber.val = function () {
	  var val = this.val().replace(/[^0-9]/g, '');
	  var format = formatForPhone_(val, this.data('defaultPrefix'));

	  if (this.val().indexOf('+') === 0 || !(this.data('defaultPrefix') != null)) {
	    return '+' + val;
	  } else {
	    return this.data('defaultPrefix') + val;
	  }
	};

	mobilePhoneNumber.validate = function () {
	  var val = this.mobilePhoneNumber('val');
	  var format = formatForPhone_(val, this.data('defaultPrefix'));

	  if (!format) {
	    return true;
	  }

	  return val.length > format.prefix.length;
	};

	mobilePhoneNumber.country = function () {
	  var format = formatForPhone_(this.mobilePhoneNumber('val'));

	  if (format) {
	    return format.country;
	  }
	};

	mobilePhoneNumber.prefix = function () {
	  var countryCode = this.mobilePhoneNumber('country');

	  if (!(countryCode != null)) {
	    return '';
	  }

	  return $.mobilePhoneNumberPrefixFromCountryCode(countryCode);
	};

	$.fn.mobilePhoneNumber = function (method) {
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }

	  var args;

	  if (!(typeof method !== 'undefined' && method !== null) || !(typeof method === 'string')) {
	    if (method != null) {
	      args = [method];
	    }

	    method = 'init';
	  }

	  return mobilePhoneNumber[method].apply(this, args);
	};

	$.formatMobilePhoneNumber = function (phone) {
	  phone = '+' + phone.replace(/[^0-9\*]/g, '');
	  return formattedPhoneNumber_(phone, true);
	};

	$.mobilePhoneNumberPrefixFromCountryCode = function (countryCode) {
	  Object.keys(formats).forEach(function (prefix) {
	    var format = formats[prefix];
	    if (format.country.toLowerCase() === countryCode.toLowerCase()) {
	      if (prefix.length === 5 && prefix[1] === '1') {
	        return '+1';
	      }

	      return prefix;
	    }
	  });

	  return null;
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var formats = {
	  '+247': {
	    country: 'AC'
	  },

	  '+376': {
	    country: 'AD',
	    format: '+... ... ...'
	  },

	  '+971': {
	    country: 'AE',
	    format: '+... .. ... ....'
	  },

	  '+93': {
	    country: 'AF',
	    format: '+.. .. ... ....',
	    nationalPrefix: '0'
	  },

	  '+1268': {
	    country: 'AG'
	  },

	  '+1264': {
	    country: 'AI'
	  },

	  '+355': {
	    country: 'AL',
	    format: '+... .. ... ....',
	    nationalPrefix: '0'
	  },

	  '+374': {
	    country: 'AM',
	    format: '+... .. ......'
	  },

	  '+244': {
	    country: 'AO',
	    format: '+... ... ... ...'
	  },

	  '+54': {
	    country: 'AR',
	    format: '+.. .. ..-....-....',
	    nationalPrefix: '0'
	  },

	  '+1684': {
	    country: 'AS'
	  },

	  '+43': {
	    country: 'AT',
	    format: '+.. ... ......',
	    nationalPrefix: '0'
	  },

	  '+61': {
	    country: 'AU',
	    format: '+.. ... ... ...',
	    nationalPrefix: '0'
	  },

	  '+297': {
	    country: 'AW',
	    format: '+... ... ....'
	  },

	  '+994': {
	    country: 'AZ',
	    format: '+... .. ... .. ..',
	    nationalPrefix: '8'
	  },

	  '+387': {
	    country: 'BA',
	    format: '+... .. ...-...',
	    nationalPrefix: '0'
	  },

	  '+1246': {
	    country: 'BB'
	  },

	  '+880': {
	    country: 'BD',
	    format: '+... ....-......',
	    nationalPrefix: '0'
	  },

	  '+32': {
	    country: 'BE',
	    format: '+.. ... .. .. ..',
	    nationalPrefix: '0'
	  },

	  '+226': {
	    country: 'BF',
	    format: '+... .. .. .. ..'
	  },

	  '+359': {
	    country: 'BG',
	    format: '+... ... ... ..',
	    nationalPrefix: '0'
	  },

	  '+973': {
	    country: 'BH',
	    format: '+... .... ....'
	  },

	  '+257': {
	    country: 'BI',
	    format: '+... .. .. .. ..'
	  },

	  '+229': {
	    country: 'BJ',
	    format: '+... .. .. .. ..'
	  },

	  '+1441': {
	    country: 'BM'
	  },

	  '+673': {
	    country: 'BN',
	    format: '+... ... ....'
	  },

	  '+591': {
	    country: 'BO',
	    format: '+... ........'
	  },

	  '+55': {
	    country: 'BR',
	    format: '+.. .. .....-....',
	    nationalPrefix: '0'
	  },

	  '+1242': {
	    country: 'BS'
	  },

	  '+975': {
	    country: 'BT',
	    format: '+... .. .. .. ..'
	  },

	  '+267': {
	    country: 'BW',
	    format: '+... .. ... ...'
	  },

	  '+375': {
	    country: 'BY',
	    format: '+... .. ...-..-..',
	    nationalPrefix: '8'
	  },

	  '+501': {
	    country: 'BZ',
	    format: '+... ...-....'
	  },

	  '+243': {
	    country: 'CD',
	    format: '+... ... ... ...'
	  },

	  '+236': {
	    country: 'CF',
	    format: '+... .. .. .. ..'
	  },

	  '+242': {
	    country: 'CG',
	    format: '+... .. ... ....'
	  },

	  '+41': {
	    country: 'CH',
	    format: '+.. .. ... .. ..',
	    nationalPrefix: '0'
	  },

	  '+225': {
	    country: 'CI',
	    format: '+... .. .. .. ..'
	  },

	  '+682': {
	    country: 'CK',
	    format: '+... .. ...'
	  },

	  '+56': {
	    country: 'CL',
	    format: '+.. . .... ....'
	  },

	  '+237': {
	    country: 'CM',
	    format: '+... .. .. .. ..'
	  },

	  '+86': {
	    country: 'CN',
	    format: '+.. ... .... ....',
	    nationalPrefix: '0'
	  },

	  '+57': {
	    country: 'CO',
	    format: '+.. ... .......'
	  },

	  '+506': {
	    country: 'CR',
	    format: '+... .... ....'
	  },

	  '+53': {
	    country: 'CU',
	    format: '+.. . .......'
	  },

	  '+238': {
	    country: 'CV',
	    format: '+... ... .. ..'
	  },

	  '+599': {
	    country: 'CW',
	    format: '+... . ... ....'
	  },

	  '+537': {
	    country: 'CY',
	    nationalPrefix: '0'
	  },

	  '+357': {
	    country: 'CY',
	    format: '+... .. ......'
	  },

	  '+420': {
	    country: 'CZ',
	    format: '+... ... ... ...'
	  },

	  '+49': {
	    country: 'DE',
	    format: '+.. .... .......',
	    nationalPrefix: '0'
	  },

	  '+253': {
	    country: 'DJ',
	    format: '+... .. .. .. ..'
	  },

	  '+45': {
	    country: 'DK',
	    format: '+.. .. .. .. ..'
	  },

	  '+1767': {
	    country: 'DM'
	  },

	  '+1849': {
	    country: 'DO'
	  },

	  '+213': {
	    country: 'DZ',
	    format: '+... ... .. .. ..'
	  },

	  '+593': {
	    country: 'EC',
	    format: '+... .. ... ....'
	  },

	  '+372': {
	    country: 'EE',
	    format: '+... .... ....'
	  },

	  '+20': {
	    country: 'EG',
	    format: '+.. ... ... ....'
	  },

	  '+291': {
	    country: 'ER',
	    format: '+... . ... ...'
	  },

	  '+34': {
	    country: 'ES',
	    format: '+.. ... .. .. ..'
	  },

	  '+251': {
	    country: 'ET',
	    format: '+... .. ... ....'
	  },

	  '+358': {
	    country: 'FI',
	    format: '+... .. ... .. ..',
	    nationalPrefix: '0'
	  },

	  '+679': {
	    country: 'FJ',
	    format: '+... ... ....'
	  },

	  '+500': {
	    country: 'FK'
	  },

	  '+691': {
	    country: 'FM',
	    format: '+... ... ....'
	  },

	  '+298': {
	    country: 'FO',
	    format: '+... ......'
	  },

	  '+33': {
	    country: 'FR',
	    format: '+.. . .. .. .. ..',
	    nationalPrefix: '0'
	  },

	  '+241': {
	    country: 'GA',
	    format: '+... .. .. .. ..'
	  },

	  '+44': {
	    country: 'GB',
	    format: '+.. .... ......',
	    nationalPrefix: '0'
	  },

	  '+1473': {
	    country: 'GD'
	  },

	  '+995': {
	    country: 'GE',
	    format: '+... ... .. .. ..',
	    nationalPrefix: '0'
	  },

	  '+594': {
	    country: 'GF',
	    format: '+... ... .. .. ..'
	  },

	  '+233': {
	    country: 'GH',
	    format: '+... .. ... ....'
	  },

	  '+350': {
	    country: 'GI',
	    format: '+... ... .....'
	  },

	  '+299': {
	    country: 'GL',
	    format: '+... .. .. ..'
	  },

	  '+220': {
	    country: 'GM',
	    format: '+... ... ....'
	  },

	  '+224': {
	    country: 'GN',
	    format: '+... ... .. .. ..'
	  },

	  '+240': {
	    country: 'GQ',
	    format: '+... ... ... ...'
	  },

	  '+30': {
	    country: 'GR',
	    format: '+.. ... ... ....'
	  },

	  '+502': {
	    country: 'GT',
	    format: '+... .... ....'
	  },

	  '+1671': {
	    country: 'GU'
	  },

	  '+245': {
	    country: 'GW',
	    format: '+... ... ....'
	  },

	  '+592': {
	    country: 'GY',
	    format: '+... ... ....'
	  },

	  '+852': {
	    country: 'HK',
	    format: '+... .... ....'
	  },

	  '+504': {
	    country: 'HN',
	    format: '+... ....-....'
	  },

	  '+385': {
	    country: 'HR',
	    format: '+... .. ... ....',
	    nationalPrefix: '0'
	  },

	  '+509': {
	    country: 'HT',
	    format: '+... .. .. ....'
	  },

	  '+36': {
	    country: 'HU',
	    format: '+.. .. ... ....',
	    nationalPrefix: '06'
	  },

	  '+62': {
	    country: 'ID',
	    format: '+.. ...-...-...',
	    nationalPrefix: '0'
	  },

	  '+353': {
	    country: 'IE',
	    format: '+... .. ... ....',
	    nationalPrefix: '0'
	  },

	  '+972': {
	    country: 'IL',
	    format: '+... ..-...-....',
	    nationalPrefix: '0'
	  },

	  '+91': {
	    country: 'IN',
	    format: '+.. .. .. ......',
	    nationalPrefix: '0'
	  },

	  '+246': {
	    country: 'IO',
	    format: '+... ... ....'
	  },

	  '+964': {
	    country: 'IQ',
	    format: '+... ... ... ....'
	  },

	  '+98': {
	    country: 'IR',
	    format: '+.. ... ... ....',
	    nationalPrefix: '0'
	  },

	  '+354': {
	    country: 'IS',
	    format: '+... ... ....'
	  },

	  '+39': {
	    country: 'IT',
	    format: '+.. .. .... ....'
	  },

	  '+1876': {
	    country: 'JM'
	  },

	  '+962': {
	    country: 'JO',
	    format: '+... . .... ....',
	    nationalPrefix: '0'
	  },

	  '+81': {
	    country: 'JP',
	    format: '+.. ..-....-....',
	    nationalPrefix: '0'
	  },

	  '+254': {
	    country: 'KE',
	    format: '+... .. .......',
	    nationalPrefix: '0'
	  },

	  '+996': {
	    country: 'KG',
	    format: '+... ... ... ...'
	  },

	  '+855': {
	    country: 'KH',
	    format: '+... .. ... ...',
	    nationalPrefix: '0'
	  },

	  '+686': {
	    country: 'KI'
	  },

	  '+269': {
	    country: 'KM',
	    format: '+... ... .. ..'
	  },

	  '+1869': {
	    country: 'KN'
	  },

	  '+850': {
	    country: 'KP',
	    format: '+... ... ... ....'
	  },

	  '+82': {
	    country: 'KR',
	    format: '+.. ..-....-....',
	    nationalPrefix: '0'
	  },

	  '+965': {
	    country: 'KW',
	    format: '+... ... .....'
	  },

	  '+345': {
	    country: 'KY'
	  },

	  '+77': {
	    country: 'KZ',
	    nationalPrefix: '8'
	  },

	  '+856': {
	    country: 'LA',
	    format: '+... .. .. ... ...',
	    nationalPrefix: '0'
	  },

	  '+961': {
	    country: 'LB',
	    format: '+... .. ... ...'
	  },

	  '+1758': {
	    country: 'LC'
	  },

	  '+423': {
	    country: 'LI',
	    format: '+... ... ... ...'
	  },

	  '+94': {
	    country: 'LK',
	    format: '+.. .. . ......'
	  },

	  '+231': {
	    country: 'LR',
	    format: '+... ... ... ...'
	  },

	  '+266': {
	    country: 'LS',
	    format: '+... .... ....'
	  },

	  '+370': {
	    country: 'LT',
	    format: '+... ... .....',
	    nationalPrefix: '8'
	  },

	  '+352': {
	    country: 'LU',
	    format: '+... .. .. .. ...'
	  },

	  '+371': {
	    country: 'LV',
	    format: '+... .. ... ...'
	  },

	  '+218': {
	    country: 'LY',
	    format: '+... ..-.......'
	  },

	  '+212': {
	    country: 'MA',
	    format: '+... ...-......',
	    nationalPrefix: '0'
	  },

	  '+377': {
	    country: 'MC',
	    format: '+... . .. .. .. ..'
	  },

	  '+373': {
	    country: 'MD',
	    format: '+... ... .. ...',
	    nationalPrefix: '0'
	  },

	  '+382': {
	    country: 'ME',
	    format: '+... .. ... ...',
	    nationalPrefix: '0'
	  },

	  '+590': {
	    country: 'MF'
	  },

	  '+261': {
	    country: 'MG',
	    format: '+... .. .. ... ..'
	  },

	  '+692': {
	    country: 'MH',
	    format: '+... ...-....'
	  },

	  '+389': {
	    country: 'MK',
	    format: '+... .. ... ...',
	    nationalPrefix: '0'
	  },

	  '+223': {
	    country: 'ML',
	    format: '+... .. .. .. ..'
	  },

	  '+95': {
	    country: 'MM',
	    format: '+.. . ... ....',
	    nationalPrefix: '0'
	  },

	  '+976': {
	    country: 'MN',
	    format: '+... .... ....'
	  },

	  '+853': {
	    country: 'MO',
	    format: '+... .... ....'
	  },

	  '+1670': {
	    country: 'MP'
	  },

	  '+596': {
	    country: 'MQ',
	    format: '+... ... .. .. ..'
	  },

	  '+222': {
	    country: 'MR',
	    format: '+... .. .. .. ..'
	  },

	  '+1664': {
	    country: 'MS'
	  },

	  '+356': {
	    country: 'MT',
	    format: '+... .... ....'
	  },

	  '+230': {
	    country: 'MU',
	    format: '+... .... ....'
	  },

	  '+960': {
	    country: 'MV',
	    format: '+... ...-....'
	  },

	  '+265': {
	    country: 'MW',
	    format: '+... ... .. .. ..'
	  },

	  '+52': {
	    country: 'MX',
	    format: '+.. ... ... ... ....'
	  },

	  '+60': {
	    country: 'MY',
	    format: '+.. ..-... ....',
	    nationalPrefix: '0'
	  },

	  '+258': {
	    country: 'MZ',
	    format: '+... .. ... ....'
	  },

	  '+264': {
	    country: 'NA',
	    format: '+... .. ... ....'
	  },

	  '+687': {
	    country: 'NC',
	    format: '+... ........'
	  },

	  '+227': {
	    country: 'NE',
	    format: '+... .. .. .. ..'
	  },

	  '+672': {
	    country: 'NF',
	    format: '+... .. ....'
	  },

	  '+234': {
	    country: 'NG',
	    format: '+... ... ... ....',
	    nationalPrefix: '0'
	  },

	  '+505': {
	    country: 'NI',
	    format: '+... .... ....'
	  },

	  '+31': {
	    country: 'NL',
	    format: '+.. . ........',
	    nationalPrefix: '0'
	  },

	  '+47': {
	    country: 'NO',
	    format: '+.. ... .. ...'
	  },

	  '+977': {
	    country: 'NP',
	    format: '+... ...-.......'
	  },

	  '+674': {
	    country: 'NR',
	    format: '+... ... ....'
	  },

	  '+683': {
	    country: 'NU'
	  },

	  '+64': {
	    country: 'NZ',
	    format: '+.. .. ... ....',
	    nationalPrefix: '0'
	  },

	  '+968': {
	    country: 'OM',
	    format: '+... .... ....'
	  },

	  '+507': {
	    country: 'PA',
	    format: '+... ....-....'
	  },

	  '+51': {
	    country: 'PE',
	    format: '+.. ... ... ...'
	  },

	  '+689': {
	    country: 'PF',
	    format: '+... .. .. ..'
	  },

	  '+675': {
	    country: 'PG',
	    format: '+... ... ....'
	  },

	  '+63': {
	    country: 'PH',
	    format: '+.. .... ......',
	    nationalPrefix: '0'
	  },

	  '+92': {
	    country: 'PK',
	    format: '+.. ... .......',
	    nationalPrefix: '0'
	  },

	  '+48': {
	    country: 'PL',
	    format: '+.. .. ... .. ..'
	  },

	  '+508': {
	    country: 'PM',
	    format: '+... .. .. ..'
	  },

	  '+872': {
	    country: 'PN'
	  },

	  '+1939': {
	    country: 'PR'
	  },

	  '+970': {
	    country: 'PS',
	    format: '+... ... ... ...'
	  },

	  '+351': {
	    country: 'PT',
	    format: '+... ... ... ...'
	  },

	  '+680': {
	    country: 'PW',
	    format: '+... ... ....'
	  },

	  '+595': {
	    country: 'PY',
	    format: '+... .. .......'
	  },

	  '+974': {
	    country: 'QA',
	    format: '+... .... ....'
	  },

	  '+262': {
	    country: 'RE'
	  },

	  '+40': {
	    country: 'RO',
	    format: '+.. .. ... ....',
	    nationalPrefix: '0'
	  },

	  '+381': {
	    country: 'RS',
	    format: '+... .. .......',
	    nationalPrefix: '0'
	  },

	  '+7': {
	    country: 'RU',
	    format: '+. ... ...-..-..',
	    nationalPrefix: '8'
	  },

	  '+250': {
	    country: 'RW',
	    format: '+... ... ... ...',
	    nationalPrefix: '0'
	  },

	  '+966': {
	    country: 'SA',
	    format: '+... .. ... ....'
	  },

	  '+677': {
	    country: 'SB',
	    format: '+... ... ....'
	  },

	  '+248': {
	    country: 'SC',
	    format: '+... . ... ...'
	  },

	  '+249': {
	    country: 'SD',
	    format: '+... .. ... ....'
	  },

	  '+46': {
	    country: 'SE',
	    format: '+.. ..-... .. ..',
	    nationalPrefix: '0'
	  },

	  '+65': {
	    country: 'SG',
	    format: '+.. .... ....'
	  },

	  '+290': {
	    country: 'SH'
	  },

	  '+386': {
	    country: 'SI',
	    format: '+... .. ... ...',
	    nationalPrefix: '0'
	  },

	  '+421': {
	    country: 'SK',
	    format: '+... ... ... ...',
	    nationalPrefix: '0'
	  },

	  '+232': {
	    country: 'SL',
	    format: '+... .. ......'
	  },

	  '+378': {
	    country: 'SM',
	    format: '+... .. .. .. ..'
	  },

	  '+221': {
	    country: 'SN',
	    format: '+... .. ... .. ..'
	  },

	  '+252': {
	    country: 'SO',
	    format: '+... .. .......'
	  },

	  '+597': {
	    country: 'SR',
	    format: '+... ...-....'
	  },

	  '+211': {
	    country: 'SS',
	    format: '+... ... ... ...'
	  },

	  '+239': {
	    country: 'ST',
	    format: '+... ... ....'
	  },

	  '+503': {
	    country: 'SV',
	    format: '+... .... ....'
	  },

	  '+963': {
	    country: 'SY',
	    format: '+... ... ... ...'
	  },

	  '+268': {
	    country: 'SZ',
	    format: '+... .... ....'
	  },

	  '+1649': {
	    country: 'TC'
	  },

	  '+235': {
	    country: 'TD',
	    format: '+... .. .. .. ..'
	  },

	  '+228': {
	    country: 'TG',
	    format: '+... .. .. .. ..'
	  },

	  '+66': {
	    country: 'TH',
	    format: '+.. .. ... ....',
	    nationalPrefix: '0'
	  },

	  '+992': {
	    country: 'TJ',
	    format: '+... ... .. ....'
	  },

	  '+690': {
	    country: 'TK'
	  },

	  '+670': {
	    country: 'TL',
	    format: '+... .... ....'
	  },

	  '+993': {
	    country: 'TM',
	    format: '+... .. ..-..-..',
	    nationalPrefix: '8'
	  },

	  '+216': {
	    country: 'TN',
	    format: '+... .. ... ...'
	  },

	  '+676': {
	    country: 'TO',
	    format: '+... ... ....'
	  },

	  '+90': {
	    country: 'TR',
	    format: '+.. ... ... ....',
	    nationalPrefix: '0'
	  },

	  '+1868': {
	    country: 'TT'
	  },

	  '+688': {
	    country: 'TV'
	  },

	  '+886': {
	    country: 'TW',
	    format: '+... ... ... ...',
	    nationalPrefix: '0'
	  },

	  '+255': {
	    country: 'TZ',
	    format: '+... ... ... ...',
	    nationalPrefix: '0'
	  },

	  '+380': {
	    country: 'UA',
	    format: '+... .. ... ....',
	    nationalPrefix: '0'
	  },

	  '+256': {
	    country: 'UG',
	    format: '+... ... ......'
	  },

	  '+1': {
	    country: 'US'
	  },

	  '+598': {
	    country: 'UY',
	    format: '+... .... ....'
	  },

	  '+998': {
	    country: 'UZ',
	    format: '+... .. ... .. ..',
	    nationalPrefix: '8'
	  },

	  '+379': {
	    country: 'VA'
	  },

	  '+1784': {
	    country: 'VC'
	  },

	  '+58': {
	    country: 'VE',
	    format: '+.. ...-.......',
	    nationalPrefix: '0'
	  },

	  '+1284': {
	    country: 'VG'
	  },

	  '+1340': {
	    country: 'VI'
	  },

	  '+84': {
	    country: 'VN',
	    format: '+.. .. ... .. ..',
	    nationalPrefix: '0'
	  },

	  '+678': {
	    country: 'VU',
	    format: '+... ... ....'
	  },

	  '+681': {
	    country: 'WF',
	    format: '+... .. .. ..'
	  },

	  '+685': {
	    country: 'WS'
	  },

	  '+967': {
	    country: 'YE',
	    format: '+... ... ... ...'
	  },

	  '+27': {
	    country: 'ZA',
	    format: '+.. .. ... ....',
	    nationalPrefix: '0'
	  },

	  '+260': {
	    country: 'ZM',
	    format: '+... .. .......'
	  },

	  '+263': {
	    country: 'ZW',
	    format: '+... .. ... ....'
	  }
	};

	var canadaPrefixes = [403, 587, 780, 250, 604, 778, 204, 506, 709, 902, 226, 249, 289, 343, 416, 519, 613, 647, 705, 807, 905, 418, 438, 450, 514, 579, 581, 819, 873, 306, 867];

	canadaPrefixes.forEach(function (prefix) {
	  formats['+1' + prefix] = {
	    country: 'CA'
	  };
	});

	Object.keys(formats).forEach(function (prefix) {
	  if (prefix.substring(0, 2) === '+1') {
	    formats[prefix].format = '+. (...) ...-....';
	  }
	});

	exports.default = formats;

/***/ }
/******/ ]);