(function () {
	"use strict";

	var app = WinJS.Application,
	mediaControls = Windows.Media.MediaControl;

	WinJS.Namespace.define("Radio", {
		Player: WinJS.Class.define(null,
		{
			init: function () {
				this.bPlayer = document.querySelector("#player");
				// Определяем плеер
				this.stPlayer = document.querySelector("#stPlayer");
				// Кнопки плеера
				this.stPlayButton = document.querySelector("#stPlayButton");
				this.stPauseButton = document.querySelector("#stPauseButton");
				this.stRefreshButton = document.querySelector("#stRefreshButton");
				// Элементы плеера
				this.stTrack = document.querySelector("#stTrack");
				this.stLive = document.querySelector("#stLive");
				this.stCover = document.querySelector("#stCover");
				this.stSubject = document.querySelector("#stSubject");
				this.stFindButton = document.querySelector("#stFindButton");
				// Фрейм 
				//this.vkIframe = document.querySelector('#vkIframe');

				// API
				this.stStreamLink = "http://ice.tlen-fm.com:9000/live";
				this.stApiLink = "http://tlen-fm.com/player/get.php";
				this.stCoverLink = "http://tlen-fm.com/player/cover.php?r=";
				this.stStatusLink = "http://tlen-fm.com/player/st_informer.php?get=1";
				this.stFindLink = "https://vk.com/audio?q=";

				// Нажатия
				this.stPlay = () => {
					// Меняем заголовок
					app.TitleBar.setTitle("Играет");
					// Обновляем трансляцию
					this.stPlayer.src = '';
					this.stPlayer.src = this.stStreamLink;
					// Включаем эфир
					this.stPlayer.play();
				};
				this.stPause = () => {
					// Меняем заголовок
					app.TitleBar.setTitle("Пауза");
					// Ставим эфир на паузу
					this.stPlayer.pause();
				};
				this.stPlayPause = () => {
					if (mediaControls.isPlaying === true)
						this.stPause();
					else
						this.stPlay();
				},
				this.stRefresh = () => {
					// Включаем эфир
					this.stPlay();
					// Обновляем информации о эфире
					this.requestInfo();
					// Обновление темы эфира
					this.requestSubject();
					// Обновляем фрейм с комментариями
					//if (this.vkIframe)
						//this.vkIframe.src = this.vkIframe.src;
				},

				// Элементы
				this.stTrackSet = (title) => {
					this.stTrack.innerText = '';
					this.stTrack.innerHTML = title;
					this.stFindButton.href = this.stFindLink + title;
	
					title = null;
				},
				this.stLiveSet = (description) => {
					this.stLive.innerText = '';
					this.stLive.innerHTML = description;

					description = null;
				},
				this.stCoverSet = (title) => {
					this.stCover.src = '';
					this.stCover.src = this.stCoverLink + encodeURI(title) + '&size=1';

					title = null;
				},
				this.stSubjectSet = (subject) => {
					this.stSubject.innerText = '';
					this.stSubject.innerHTML = subject;

					subject = null;
				},

				// Функция парса результата плеера
				this.resultInfo = (res) => {
					var csRes = eval("(" + res + ")"),
						a = [];
					// Тип эфира
					if (csRes["/live"]["name"] != "") {
						a = csRes["/live"];
						var stType = a['description'];
					} else {
						a = csRes["/play"];
						var stType = "Нет эфира (non-stop)ssda";
					}
					this.stLiveSet(stType);
					// Обложка
					this.stCoverSet(a["title"]);
					// Заголовок
					this.stTrackSet(a["title"]);

					res = csRes = a = stType = null;
				},
				// Функция парса результата темы эфира
				this.resultSubject = (res) => {
					// Тема эфира
					this.stSubjectSet(res);

					res = null;
				},
				// Функция запроса на получения инфы о эфире
				this.requestInfo = () => {
					WinJS.xhr({
						url: this.stApiLink,
						responseType: "text",
						headers: { "If-Modified-Since": "Mon, 27 Mar 2012 00:00:00 GMT" }
					}).done(
						function completed(result) { this.resultInfo(result.responseText); }.bind(this),
						function error(result) { }
					);
				},
				// Функция запроса на получения темы
				this.requestSubject = () => {
					WinJS.xhr({
						url: this.stStatusLink,
						responseType: "text",
						headers: { "If-Modified-Since": "Mon, 27 Mar 2012 00:00:00 GMT" }
					}).done(
						function completed(result) { this.resultSubject(result.responseText); }.bind(this),
						function error(result) { }
					);
				},

				// Запуск информации о эфире
				this.requestInfo();
				// Запуск темы эфира
				this.requestSubject();
				// Запускаем радио
				this.stPlay();

				// Обработка кнопок плеера
				this.stPlayButton.onclick = this.stPlay;
				this.stPauseButton.onclick = this.stPause;
				this.stRefreshButton.onclick = this.stRefresh;

				// Обработка кнопок глобальных
				mediaControls.onplaypausetogglepressed = this.stPlayPause;
				mediaControls.onplaypressed = this.stPlay;
				mediaControls.onpausepressed = this.stPause;
			}
		})
	});

	WinJS.Application.Player = new Radio.Player();
})();