(function () {
	"use strict";

	var appView = Windows.UI.ViewManagement.ApplicationView.getForCurrentView(),
	titleBar = appView.titleBar;

	WinJS.Namespace.define("Radio", {
		TitleBar: WinJS.Class.define(null, {
			init: function () {
				// Изменяем цвет TitleBar
				const WHITE = this.hexStrToRGBA("#FFF");
				const BLACK = this.hexStrToRGBA("#000");
				const GRAY = this.hexStrToRGBA("#5c5a58");
				const GRAY_DARK = this.hexStrToRGBA("#131313");
				const YELLOW = this.hexStrToRGBA("#FFD200");
				const YELLOW_DARK = this.hexStrToRGBA("#A78900");

				// Когда окно активно
				titleBar.backgroundColor = BLACK;
				titleBar.foregroundColor = WHITE;

				titleBar.buttonBackgroundColor = BLACK;
				titleBar.buttonForegroundColor = WHITE;

				titleBar.buttonHoverBackgroundColor = YELLOW;
				titleBar.buttonHoverForegroundColor = BLACK;

				titleBar.buttonPressedBackgroundColor = YELLOW_DARK;
				titleBar.buttonPressedForegroundColor = BLACK;

				// Когда окно не активно
				titleBar.inactiveBackgroundColor = BLACK;
				titleBar.inactiveForegroundColor = GRAY;

				titleBar.buttonInactiveBackgroundColor = BLACK;
				titleBar.buttonInactiveForegroundColor = GRAY;

				titleBar.buttonInactiveHoverBackgroundColor = YELLOW;
				titleBar.buttonInactiveHoverForegroundColor = BLACK;

				titleBar.buttonPressedBackgroundColor = YELLOW_DARK;
				titleBar.buttonPressedForegroundColor = BLACK;
			},
			hexStrToRGBA: function (hexStr) {
				// RGBA color object
				let colorObject = { "r": 255, "g": 255, "b": 255, "a": 255 };

				// Remove hash if it exists
				hexStr = hexStr.replace("#", "");

				if (hexStr.length === 6) {
					// No Alpha
					return Object.assign(colorObject, {
						"r": parseInt(hexStr.slice(0, 2), 16),
						"g": parseInt(hexStr.slice(2, 4), 16),
						"b": parseInt(hexStr.slice(4, 6), 16),
						"a": parseInt("0xFF", 16)
					});
				}
				if (hexStr.length === 8) {
					// Alpha
					return Object.assign(colorObject, {
						"r": parseInt(hexStr.slice(0, 2), 16),
						"g": parseInt(hexStr.slice(2, 4), 16),
						"b": parseInt(hexStr.slice(4, 6), 16),
						"a": parseInt(hexStr.slice(6, 8), 16)
					});
				}
				if (hexStr.length === 3) {
					// Shorthand hex color
					let rVal = hexStr.slice(0, 1);
					let gVal = hexStr.slice(1, 2);
					let bVal = hexStr.slice(2, 3);

					return Object.assign(colorObject, {
						"r": parseInt(rVal + rVal, 16),
						"g": parseInt(gVal + gVal, 16),
						"b": parseInt(bVal + bVal, 16)
					});
				}
				throw new Error('Invalid HexString length. Expected either 8, 6, or 3. The actual length was ${hexStr.length}');
			},
			setTitle: function (title) {
				appView.title = title;
			}
		})
	});

	WinJS.Application.TitleBar = new Radio.TitleBar();
})();