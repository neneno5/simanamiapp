
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
    }
	});
});