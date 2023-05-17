document.addEventListener("DOMContentLoaded", function() {
    var currentIndex = 0;
    var maxIndex = 5; // ページの総数 - 1

    function showPage(index) {
        var pages = document.querySelectorAll(".page");
        for (var i = 0; i < pages.length; i++) {
            pages[i].style.display = "none";
        }
        pages[index].style.display = "block";
    }

    function setActiveNavItem(index) {
        var navItems = document.querySelectorAll("nav ul li");
        for (var i = 0; i < navItems.length; i++) {
            navItems[i].classList.remove("active");
        }
        navItems[index].classList.add("active");
    }

    function navigateToNextPage() {
        if (currentIndex < maxIndex) {
            currentIndex++;
            showPage(currentIndex);
            setActiveNavItem(currentIndex);
        }
    }

    function navigateToPreviousPage() {
        if (currentIndex > 0) {
            currentIndex--;
            showPage(currentIndex);
            setActiveNavItem(currentIndex);
        }
    }

    document.addEventListener("touchstart", function(event) {
        startX = event.changedTouches[0].screenX;
    });

    document.addEventListener("touchend", function(event) {
        var endX = event.changedTouches[0].screenX;
        var diffX = endX - startX;
        if (diffX > 50) {
            navigateToPreviousPage();
        } else if (diffX < -50) {
            navigateToNextPage();
        }
    });

    var navItems = document.querySelectorAll("nav ul li");
    for (var i = 0; i < navItems.length; i++) {
        navItems[i].addEventListener("click", function() {
            var index = Array.from(navItems).indexOf(this);
            currentIndex = index;
            showPage(currentIndex);
            setActiveNavItem(currentIndex);
        });
    }

    showPage(currentIndex);
    setActiveNavItem(currentIndex);
});
