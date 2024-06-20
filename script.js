document.addEventListener("DOMContentLoaded", function() {
    const burgerButton = document.querySelector('.burger-button');
    const burgerMenu = document.querySelector('.burger-menu');

    burgerButton.addEventListener('click', function() {
        burgerMenu.classList.toggle('active');
    });

    const subNavHeaders = document.querySelectorAll('.a-sous-nav > p');

    subNavHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const subNav = this.nextElementSibling;
            subNav.style.display = subNav.style.display === 'block' ? 'none' : 'block';
        });
        
    });
});

(function () {
    "use strict";
    const slideTimeout = 5000; // Temps de chaque diapositive
    const transitionDuration = 1.5; // Durée de transition en secondes

    const prev = document.querySelector('#prev'); // Boutons de navigation
    const next = document.querySelector('#next');

    const $slides = document.querySelectorAll('.slide');  // Éléments de type "slide"

    let $dots;
    let intervalId;
    let currentSlide = 1;

    // Fonction pour afficher une diapositive spécifique en utilisant un index
    function slideTo(index) {
        currentSlide = index >= $slides.length || index < 1 ? 0 : index;
        $slides.forEach($elt => {
            $elt.style.transition = `transform ${transitionDuration}s ease-in-out`; // Ajout de la transition
            $elt.style.transform = `translateX(-${currentSlide * 100}%)`;
        });
        $dots.forEach(($elt, key) => $elt.classList = `dot ${key === currentSlide ? 'active' : 'inactive'}`);
    }

    // Fonction pour afficher la prochaine diapositive
    function showSlide() {
        slideTo(currentSlide);
        currentSlide++;
    }

    // Boucle pour créer les "dots" en fonction du nombre de diapositives
    for (let i = 1; i <= $slides.length; i++) {
        let dotClass = i == currentSlide ? 'active' : 'inactive';
        let $dot = `<span data-slidId="${i}" class="dot ${dotClass}"></span>`;
        document.querySelector('.carousel-dots').innerHTML += $dot;
    }

    // Récupère tous les "dots"
    $dots = document.querySelectorAll('.dot');

    // Boucle pour ajouter des écouteurs d'événement "click" sur chaque "dot"
    $dots.forEach(($elt, key) => $elt.addEventListener('click', () => slideTo(key)));
    
    prev.addEventListener('click', () => slideTo(--currentSlide));
    next.addEventListener('click', () => slideTo(++currentSlide));

    // Initialisation de l'intervalle pour afficher les diapositives
    intervalId = setInterval(showSlide, slideTimeout);
    $slides.forEach($elt => {
        let startX;
        let endX;
        $elt.addEventListener('mouseover', () => {
            clearInterval(intervalId);
        }, false);
        $elt.addEventListener('mouseout', () => {
            intervalId = setInterval(showSlide, slideTimeout);
        }, false);
        $elt.addEventListener('touchstart', (event) => {
            startX = event.touches[0].clientX;
        });
        $elt.addEventListener('touchend', (event) => {
            endX = event.changedTouches[0].clientX;
            if (startX > endX) {
                slideTo(currentSlide + 1);
            } else if (startX < endX) {
                slideTo(currentSlide - 1);
            }
        });
    });
})();

