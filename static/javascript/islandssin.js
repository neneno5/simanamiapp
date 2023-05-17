document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav ul li');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navLinks.forEach(function(item) {
                item.classList.remove('current');
            });
            
            this.classList.add('current');
        });
    });
});
