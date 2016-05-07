(function () {
	"use strict";

	// Предопределение чего-то
	var app			= WinJS.Application,
		appPackage  = Windows.ApplicationModel;

	var activation	= appPackage.Activation;
	// Медиа
	var mediaControls = Windows.Media.MediaControl;

	// Если приложение запущенно
	app.onactivated = function (args) {
		if (args.detail.kind === activation.ActivationKind.launch) {

			// Запуск тайтлбара
			app.TitleBar.init();

			// Запуск плеера
			app.Player.init();

			// А давайте анимации
			WinJS.UI.Animation.enterPage(app.Player.bPlayer, null);
			document.getElementById("version").innerHTML = "Версия " + getAppVersion();

			// Запрашиваем состояние каждые 15 секунд
			new WinJS.Promise((complete) => {
				setInterval(() => {
					app.Player.requestInfo();
					app.Player.requestSubject();
				}, 15000);
			});

			// TODO: Надо разобраться с этим
			args.setPromise(WinJS.UI.processAll());
		}
	};

	app.oncheckpoint = function (args) {
		// TODO: действие приложения будет приостановлено. Сохраните здесь все состояния, которые понадобятся после приостановки.
		// Вы можете использовать объект WinJS.Application.sessionState, который автоматически сохраняется и восстанавливается после приостановки.
		// Если вам нужно завершить асинхронную операцию до того, как действие приложения будет приостановлено, вызовите args.setPromise().
	};	
	// Функция преобразовния версии приложения
	function getAppVersion () {
		var p = appPackage.Package.current.id.version;
		return p.major + "." + p.minor + "." + p.build + "." + p.revision;
	}

	// Поехали!
	app.start();
})();
