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
    
    // スワイプによる画面切り替え
    var touchStartX = 0;
    var touchEndX = 0;
    var minSwipeDistance = 50; // スワイプとみなす最小距離
    
    document.addEventListener("touchstart", function(event) {
        touchStartX = event.touches[0].clientX;
    });
    
    document.addEventListener("touchend", function(event) {
        touchEndX = event.changedTouches[0].clientX;
        var swipeDistance = touchEndX - touchStartX;
        
        if (swipeDistance > minSwipeDistance && currentPage > 1) {
            showPage(currentPage - 1); // 前のページを表示
        } else if (swipeDistance < -minSwipeDistance && currentPage < 3) {
            showPage(currentPage + 1); // 次のページを表示
        } else if (swipeDistance < -minSwipeDistance && currentPage == 3) {
            showPage(currentPage - 2);
        } else if (swipeDistance > minSwipeDistance && currentPage == 1) {
            showPage(currentPage + 2);
        }
    });
});




function initMap() {
	var map = new google.maps.Map(document.getElementById('innMap'), {
		zoom: 15,
		center: {lat: 34.406286, lng: 133.1943841},
        gestureHandling: 'greedy'
	});

	var onomichiSta = new google.maps.LatLng(34.4048654, 133.192269);
    var inn = new google.maps.LatLng(34.406038, 133.198332);
	var directionsService = new google.maps.DirectionsService();
	var directionsRenderer = new google.maps.DirectionsRenderer();

	var request = {
		origin: onomichiSta, //スタート地点
		destination: inn, //ゴール地点
	//	waypoints: [ //経由地点
	//		{location: new google.maps.LatLng(35.683021,139.702668), stopover: false}
	//	],
		travelMode: google.maps.DirectionsTravelMode.WALKING, //移動手段
	};

	directionsService.route(request, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsRenderer.setOptions({
				preserveViewport: true //ズーム率を変更してルート全体を表示しない
			});
			// ルート検索の結果を地図上に描画
			directionsRenderer.setDirections(result);
			directionsRenderer.setMap(map);
		}
	});
}
