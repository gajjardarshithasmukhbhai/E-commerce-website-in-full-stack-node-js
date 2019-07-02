"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function ($) {
  var INPUT_DATA = {};
  var DATA_COLOR = '';
  var BUTTON_X_COLOR = '';
  var BUTTON_X_BLUR_COLOR = '#ced4da';
  var INPUT_FOCUS = '1px solid #4285f4';
  var INPUT_BLUR = '1px solid #ced4da';
  var INPUT_FOCUS_SHADOW = '0 1px 0 0 #4285f4';
  var INPUT_BLUR_SHADOW = '';
  var ENTER_CHAR_CODE = 13;

  var mdbAutocomplete =
  /*#__PURE__*/
  function () {
    function mdbAutocomplete(input, options) {
      _classCallCheck(this, mdbAutocomplete);

      this.defaults = {
        data: INPUT_DATA,
        dataColor: DATA_COLOR,
        xColor: BUTTON_X_COLOR,
        xBlurColor: BUTTON_X_BLUR_COLOR,
        inputFocus: INPUT_FOCUS,
        inputBlur: INPUT_BLUR,
        inputFocusShadow: INPUT_FOCUS_SHADOW,
        inputBlurShadow: INPUT_BLUR_SHADOW
      };
      this.$input = input;
      this.options = this.assignOptions(options);
      this.$clearButton = $('.mdb-autocomplete-clear');
      this.$autocompleteWrap = $('<ul class="mdb-autocomplete-wrap"></ul>');
      this.init();
    }

    _createClass(mdbAutocomplete, [{
      key: "init",
      value: function init() {
        this.setData();
        this.inputFocus();
        this.inputBlur();
        this.inputKeyupData();
        this.inputLiClick();
        this.clearAutocomplete();
      }
    }, {
      key: "assignOptions",
      value: function assignOptions(newOptions) {
        return $.extend({}, this.defaults, newOptions);
      }
    }, {
      key: "setData",
      value: function setData() {
        if (Object.keys(this.options.data).length) {
          this.$autocompleteWrap.insertAfter(this.$input);
        }
      }
    }, {
      key: "inputFocus",
      value: function inputFocus() {
        var _this = this;

        this.$input.on('focus', function () {
          _this.$input.css('border-bottom', _this.options.inputFocus);

          _this.$input.css('box-shadow', _this.options.inputFocusShadow);
        });
      }
    }, {
      key: "inputBlur",
      value: function inputBlur() {
        var _this2 = this;

        this.$input.on('blur', function () {
          _this2.$input.css('border-bottom', _this2.options.inputBlur);

          _this2.$input.css('box-shadow', _this2.options.inputBlurShadow);
        });
      }
    }, {
      key: "inputKeyupData",
      value: function inputKeyupData() {
        var _this3 = this;

        this.$input.on('keyup', function (e) {
          var $inputValue = _this3.$input.val();

          _this3.$autocompleteWrap.empty();

          if ($inputValue.length) {
            for (var item in _this3.options.data) {
              if (_this3.options.data[item].toLowerCase().indexOf($inputValue.toLowerCase()) !== -1) {
                var option = $("<li>".concat(_this3.options.data[item], "</li>"));

                _this3.$autocompleteWrap.append(option);
              }
            }
          }

          if (e.which === ENTER_CHAR_CODE) {
            _this3.$autocompleteWrap.children(':first').trigger('click');

            _this3.$autocompleteWrap.empty();
          }

          if ($inputValue.length === 0) {
            _this3.$input.parent().find('.mdb-autocomplete-clear').css('visibility', 'hidden');
          } else {
            _this3.$input.parent().find('.mdb-autocomplete-clear').css('visibility', 'visible');
          }

          _this3.$autocompleteWrap.children().css('color', _this3.options.dataColor);
        });
      }
    }, {
      key: "inputLiClick",
      value: function inputLiClick() {
        var _this4 = this;

        this.$autocompleteWrap.on('click', 'li', function (e) {
          e.preventDefault();

          _this4.$input.val($(e.target).text());

          _this4.$autocompleteWrap.empty();
        });
      }
    }, {
      key: "clearAutocomplete",
      value: function clearAutocomplete() {
        var _this5 = this;

        this.$clearButton.on('click', function (e) {
          e.preventDefault();
          var $this = $(e.currentTarget);
          $this.parent().find('.mdb-autocomplete').val('');
          $this.css('visibility', 'hidden');

          _this5.$autocompleteWrap.empty();

          $this.parent().find('label').removeClass('active');
        });
      }
    }, {
      key: "changeSVGcolors",
      value: function changeSVGcolors() {
        if (this.$input.hasClass('mdb-autocomplete')) {
          this.$input.on('click keyup', function (e) {
            e.preventDefault();
            $(e.target).parent().find('.mdb-autocomplete-clear').find('svg').css('fill', xColor);
          });
          this.$input.on('blur', function (e) {
            e.preventDefault();
            $(e.target).parent().find('.mdb-autocomplete-clear').find('svg').css('fill', xBlurColor);
          });
        }
      }
    }]);

    return mdbAutocomplete;
  }();

  $.fn.mdbAutocomplete = function (options) {
    return this.each(function () {
      new mdbAutocomplete($(this), options);
    });
  }; //deprecated, delete soon


  $.fn.mdb_autocomplete = $.fn.mdbAutocomplete;
})(jQuery);