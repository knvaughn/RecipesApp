window.onload = function() {
    // When you click on the star button, show/hide the rating dialogue
    var rateButton = document.querySelector(".rate-recipe");
    var rateDialogue = document.querySelector(".rate-dialogue");
    var dialogueInner = document.querySelector(".dialogue-inner");
    var closeDialogueButton = document.querySelector(".close-dialogue");

    var openDialogue = function() {
        rateDialogue.style.display = "block";
        setTimeout(function(){
            rateDialogue.style.opacity = 1;
        }, 50);
    };

    var closeDialogue = function() {
        rateDialogue.style.opacity = 0;
        setTimeout(function(){
            rateDialogue.style.display = "none";
        }, 200);
    };

    rateButton.addEventListener("click", () => openDialogue());

    rateDialogue.addEventListener("click", () => closeDialogue());

    dialogueInner.addEventListener("click", (event) => event.stopPropagation());

    closeDialogueButton.addEventListener("click", () => closeDialogue());

    // Rating stars functionality
    var ratingStars = Array.prototype.slice.call(document.querySelectorAll(".rating-star"));
    var ratingInput = document.getElementById("ratingInput");
    var selectedStar = false;
    var selectedStarIndex = 0;

    ratingStars.forEach(function(star) {
        star.addEventListener("mouseover", function() {
            var index = ratingStars.indexOf(this);
            for(var i = 0; i < ratingStars.length; i++) {
                i <= index ? ratingStars[i].style.background = "url('/images/full-star.png') no-repeat center" : ratingStars[i].style.background = "url('/images/open-star.png') no-repeat center";
            }
            this.style.background = "url('/images/full-star.png') no-repeat center";
        });
        star.addEventListener("click", function(event) {
            var index = ratingStars.indexOf(this);
            for(var i = 0; i < ratingStars.length; i++) {
                i <= index ? ratingStars[i].style.background = "url('/images/full-star.png') no-repeat center" : ratingStars[i].style.background = "url('/images/open-star.png') no-repeat center";
            }
            ratingInput.value = index + 1;
            selectedStar = true;
            selectedStarIndex = index;
        });
        star.addEventListener("mouseout", function() {
            if(selectedStar == false) {
                for(var i = 0; i < ratingStars.length; i++) {
                    ratingStars[i].style.background = "url('/images/open-star.png') no-repeat center";
                }
            } else {
                for(var i = 0; i < ratingStars.length; i++) {
                    i <= selectedStarIndex ? ratingStars[i].style.background = "url('/images/full-star.png') no-repeat center" : ratingStars[i].style.background = "url('/images/open-star.png') no-repeat center";
                }
            }
        });
    });
};