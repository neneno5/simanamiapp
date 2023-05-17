var startX;
var startY;
var threshold = 100; // スワイプの閾値

document.addEventListener('touchstart', function(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
});

document.addEventListener('touchend', function(event) {
    var endX = event.changedTouches[0].clientX;
    var endY = event.changedTouches[0].clientY;
    var deltaX = endX - startX;
    var deltaY = endY - startY;

    // スワイプの方向を判定
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > threshold) {
            navigateToPreviousPage();
        } else if (deltaX < -threshold) {
            navigateToNextPage();
        }
    }
});

function navigateToPreviousPage() {
    var currentPage = getCurrentPage();
    var previousPage = getPreviousPage(currentPage);
    if (previousPage) {
        window.location.href = previousPage;
    }
}

function navigateToNextPage() {
    var currentPage = getCurrentPage();
    var nextPage = getNextPage(currentPage);
    if (nextPage) {
        window.location.href = nextPage;
    }
}

function getCurrentPage() {
    var currentURL = window.location.href;
    var currentPage = currentURL.substring(currentURL.lastIndexOf('/') + 1);
    return currentPage;
}

function getPreviousPage(currentPage) {
    var pages = ['/islands1', '/islands2', '/islands3', '/islands4', '/islands5', '/islands6'];
    var currentIndex = pages.indexOf(currentPage);
    if (currentIndex > 0) {
        return pages[currentIndex - 1];
    }
    return null;
}

function getNextPage(currentPage) {
    var pages = ['/islands1', '/islands2', '/islands3', '/islands4', '/islands5', '/islands6'];
    var currentIndex = pages.indexOf(currentPage);
    if (currentIndex < pages.length - 1) {
        return pages[currentIndex + 1];
    }
    return null;
}

document.addEventListener('DOMContentLoaded', function() {
    var navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(function(item) {
        item.addEventListener('click', function() {
            var currentPage = getCurrentPage();
            var targetPage = item.getAttribute('data-page');
            if (targetPage !== currentPage) {
                window.location.href = targetPage;
            }
        });
    });

    setActiveNavItem();
});

function setActiveNavItem() {
    var currentPage = getCurrentPage();
    var navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(function(item) {
        var page = item.getAttribute('data-page');
        if (page === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}
