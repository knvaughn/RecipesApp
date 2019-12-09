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
$(document).ready(function () {
    // File Input Path
    $(document).on('change', 'input[type="file"]', function () {
        var file_field = $(this).closest('.file-field');
        var path_input = file_field.find('.file-path');
        var files = $(this)[0].files;
        var file_names = [];
        for (var i = 0; i < files.length; i++) {
        file_names.push(files[i].name);
        }
        path_input[0].value = file_names.join(', ');
        path_input.trigger('change');
    });

    if ( $( "#success" ).length ) {
        $('html, body').animate({
            scrollTop: ($('#success').offset().top)
        },500);
    }
});