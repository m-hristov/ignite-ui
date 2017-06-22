/*!@license
 * Infragistics.Web.ClientUI Toolbar <build_number>
 *
 * Copyright (c) 2011-<year> Infragistics Inc.
 * <Licensing info>
 *
 * http://www.infragistics.com/
 *
 * Depends on:
 *   jquery-1.9.1.js
 *   jquery.ui.core.js
 *   jquery.ui.widget.js
 *   infragistics.util.js
 *   infragistics.util.jquery.js
 */

(function (factory) {
	if (typeof define === "function" && define.amd) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"jquery-ui",
			"./infragistics.util",
			"./infragistics.util.jquery"
		], factory );
	} else {

		// Browser globals
		factory(jQuery);
	}
}
(function ($) {
    /*
		Base igWidget for all Ignite UI widgets.
	*/
    $.widget("ui.igWidget", {
		localeWidgetName: null,
		localeAttributeName: "data-locale",
		options: {
            /* type="string" Set/Get the locale setting for the widget.
            ```
                 //Initialize
                $(".selector").igWidget({
                    locale: "ja"
                });

                // Get
                var locale = $(".selector").igWidget("option", "locale");

                // Set
                $(".selector").igWidget("option", "locale", "ja");
            ```
            */
            locale: null,
            /* type="string" Set/Get the regional setting for the widget.
            ```
                //Initialize
                $(".selector").igWidget({
                    regional: "ja"
                });

                // Get
                var regional = $(".selector").igWidget("option", "regional");

                // Set
                $(".selector").igWidget("option", "regional", "ja");
            ```
            */
            regional: "en-US"
		},
		_setOption: function (key, value) {
			var prevValue = this.options[ key ];
			if (prevValue === value) {
				return;
			}
			this._super(key, value);
			switch (key) {
			case "locale":
				this._changeLocale();
				break;
			case "regional":
				this._changeRegional();
				break;
			default:
				break;
			}
		},
		_getLocaleWidgetName: function () {
			this.localeWidgetName = this.localeWidgetName ||
							(this.widgetFullName || this.widgetName)
								.replace(/^((ui-ig(\.)*)|(ig(\.)*))/ig, "");
			return this.localeWidgetName;
		},
		_getLocaleObject: function (locale, localeWidgetName) {
			localeWidgetName = localeWidgetName || this._getLocaleWidgetName();
			return 	$.ig.locale &&
					$.ig.locale[ locale ] &&
					$.ig.locale[ locale ][ localeWidgetName ];
		},
		_getLocaleValue: function (key, localeWidgetName) {
			var locale = this.options.locale, localeObject;
			if (locale) {
				if (typeof locale === "object" && locale[ key ]) {
					return locale[ key ];
				}
				localeObject = 	this._getLocaleObject(locale, localeWidgetName);
				if (localeObject && localeObject[ key ]) {
					return localeObject[ key ];
				}
			}
			localeWidgetName = localeWidgetName || this._getLocaleWidgetName();
			if ($.ig && $.ig[ localeWidgetName ] && $.ig[ localeWidgetName ].locale) {
				return $.ig[ localeWidgetName ].locale[ key ];
			}
			return "";
		},
		_changeLocaleForElement: function ($element, localeId) {
			// localeId is optional - if set - then changes only those locale setting specified by localeId in attribute data-locale
			// if localeId is NOT set - changes all locales for the specified element(set in attribute data-locale)
			var i, pairs, localeAttr = $element.attr(this.localeAttributeName);// format "optionName0:attributeName0;optionName1:attributeName1;"
			if (!localeAttr) {
				return;
			}
			pairs = localeAttr.split(";");
			for (i = 0; i < pairs.length; i++) {
				keyValue = pairs[ i ].split(":");
				key = keyValue[ 0 ];
				attr = keyValue[ 1 ];
				if (!key || !attr) {
					continue;
				}
				if (localeId === key || !localeId) {
					if (attr === "text") {
						$element.text(this._getLocaleValue(key));
					} else {
						$element.attr(attr, this._getLocaleValue(key));
					}
					if (localeId === key) {// if localeId is specified
						break;
					}
				}
			}
		},
		_changeLocaleByLocaleId: function (localeId, $container) {
			if (!localeId) {
				return;
			}
			var self = this;
			($container || this.element)
				.find("[" + this.localeAttributeName + "*='" + localeId + ":']")
				.each(function () {
					self._changeLocaleForElement($(this), localeId);
				});
		},
		_changeLocaleForElementsInContainer: function ($container) {
			var self = this;
			($container || this.element)
				.find("[" + this.localeAttributeName + "]")
				.each(function () {
					self._changeLocaleForElement($(this));
				});
		},
		_getLocaleOptions: function () {
			return {};
		},
		_changeLocale: function () {
			var opts = this._getLocaleOptions();
			if (!jQuery.isEmptyObject(opts)) {
				if (opts.locale) { //THROW EXCEPTION
				}
				this._setOptions(opts);
			}
		},
		_changeRegional: $.noop
    });
    $.extend($.ui.igWidget, { version: "<build_number>" });
    return $.ui.igWidget;// REMOVE_FROM_COMBINED_FILES
}));// REMOVE_FROM_COMBINED_FILES