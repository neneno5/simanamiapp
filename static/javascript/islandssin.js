var navLinks = document.querySelectorAll('nav a');

navLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        var page = this.getAttribute('href');
        navigateTo(page);
    });
});

function navigateTo(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('content').innerHTML = this.responseText;
            updateActiveNavLink(page);
        }
    };
    xhttp.open('GET', page, true);
    xhttp.send();
}

function updateActiveNavLink(page) {
    navLinks.forEach(function(link) {
        if (link.getAttribute('href') === page) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

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
        navigateTo(previousPage);
    }
}

function navigateToNextPage() {
    var currentPage = getCurrentPage();
    var nextPage = getNextPage(currentPage);
    if (nextPage) {
        navigateTo(nextPage);
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

