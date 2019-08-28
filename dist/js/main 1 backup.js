let webmapids = []
let webmapNames = []
let webmapNameIds = []
$.ajax({
	url: "./dist/config.json",
	success: function (data) {
		for (i = 0; i < data["safMaps"].length; i++) {
			let safMapId = data["safMaps"][i]['id']
				let safMapNamesIds = data["safMaps"][i]['nameid']
				let safMapName = data["safMaps"][i]['name']
				webmapids.push(safMapId)
				webmapNames.push(safMapName)
				webmapNameIds.push(safMapNamesIds)
		}
		require(["esri/views/MapView", "esri/widgets/Legend", "esri/widgets/Print", "esri/widgets/Expand", "esri/WebMap"], function (MapView, Legend, Print, Expand, WebMap) {
			var webmaps = webmapids.map(function (webmapid) {
					return new WebMap({
						portalItem: {
							id: webmapid
						}
					});
				});
			var view = new MapView({
					map: webmaps[0],
					container: "viewDiv",
					center: [42,0],
					zoom: 5
				});
			var legend = new Legend({
					view: view,
				});
			let legendExpand = new Expand({
					view: view,
					expanded: true,
					content: legend
				});
			let print = new Print({
					view: view,
					printServiceUrl: "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
					container: document.createElement("div")
				});
			let printExpand = new Expand({
					view: view,
					content: print
				});
			view.ui.add(printExpand, "top-left");
			view.ui.add(legendExpand, "bottom-right");
			var list = document.getElementsByTagName('li')
				$('li').on('click', function () {
					$(this).addClass("active").siblings().removeClass("active");
				});
			var safMapLinks = document.getElementsByClassName('saf');
			let title = safMapLinks.innerText;
			for (var i = 0; i < safMapLinks.length; i++) {
				safMapLinks[i].addEventListener('click', changeMap);
			}
			function changeMap(e) {
				var element = e.target.innerText;
				console.log(element);
				var mapTitle = document.getElementById('mapTitle');
				mapTitle.innerHTML = element
					var mapId = event.target.getAttribute("data-id");
				var nameid = event.target.getAttribute("nameid");
				if (mapId === 'undefined') {
					toastr.error(element + ' at the moment has no data!')
				}
				if (nameid === 'undefined') {
					toastr.error(element + ' at the moment has no data!')
				}
				if (mapId) {
					var webmap = webmaps[mapId];
					view.map = webmap;
					document.getElementsByClassName("btn-switch")
					var safMaps = document.querySelectorAll(".btn-switch");
					for (var idx = 0; idx < safMaps.length; idx++) {
						var safMap = safMaps[idx];
						var mapIndex = safMap.getAttribute("data-id");
						if (mapIndex === mapId) {
							safMap.classList.add("active-map");
						} else {
							safMap.classList.remove("active-map");
						}
					}
				}
			}
		});
	},
	error: function (e) {
		console.log(e);
	}
});
