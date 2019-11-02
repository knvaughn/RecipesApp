// When you click on the menu toggle, display the navigation
var toggleMenu = document.querySelector(".toggle-menu");
var closeMenu = document.querySelector(".close-menu");
var navMenu = document.querySelector("#nav ul");

toggleMenu.addEventListener("click", function() {
    navMenu.style.display = "block";
    closeMenu.style.display = "block";
    toggleMenu.style.display = "none"
});
closeMenu.addEventListener("click", function() {
    navMenu.style.display = "none";
    closeMenu.style.display = "none";
    toggleMenu.style.display = "block"
});
window.onresize = function(event) {
    if(window.innerWidth > 768) {
        navMenu.style.display = "block";
        closeMenu.style.display = "none";
        toggleMenu.style.display = "none"
    } else {
        navMenu.style.display = "none";
        closeMenu.style.display = "none";
        toggleMenu.style.display = "block"
    }
};