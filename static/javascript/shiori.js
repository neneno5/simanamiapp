var currentPage = 1;

function showPage(page) {
    var pages = document.getElementsByClassName("page");
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = "none";
    }
    document.getElementById("page" + page).style.display = "block";

    // 目次の色変更
    var navItems = document.getElementsByClassName("nav-item");
    for (var i = 0; i < navItems.length; i++) {
        navItems[i].classList.remove("active");
    }
    document.querySelector(".nav-item:nth-child(" + page + ")").classList.add("active");
    currentPage = page;
}
        
function changePage(page) {
    if (currentPage !== page) {
        showPage(page);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    showPage(1); // 最初のページを表示
});

function initMap() {
	var map = new google.maps.Map(document.getElementById('innMap'), {
		zoom: 16,
		center: {lat: 34.2392124, lng: 133.0442671},
        gestureHandling: 'greedy'
	});

	var start = new google.maps.LatLng(34.2168391, 133.0541043);
    var inn = new google.maps.LatLng(34.2575849, 133.0475745);
	var directionsService = new google.maps.DirectionsService();
	var directionsRenderer = new google.maps.DirectionsRenderer();

	var request = {
		origin: start, //スタート地点
		destination: inn, //ゴール地点
	//	waypoints: [ //経由地点
	//		{location: new google.maps.LatLng(35.683021,139.702668), stopover: false}
	//	],
		travelMode: google.maps.DirectionsTravelMode.DRIVING, //移動手段
	};

	directionsService.route(request, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
	//		directionsRenderer.setOptions({
	//			preserveViewport: true //ズーム率を変更してルート全体を表示しない
	//		});
			// ルート検索の結果を地図上に描画
			directionsRenderer.setDirections(result);
			directionsRenderer.setMap(map);
		}
	});
}
