// ----- DATI CAROSELLO -----
var carouselData = [
   {
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        title: "SOFTWARE ENGINEERING SOLUTIONS",
        tagline: "Dall’idea al rilascio: software scalabile, stabile e pronto per il business.",
        activeService: "software"
    },
    {
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        title: "GENERATIVE AI",
        tagline: "Trasformiamo l’AI generativa in soluzioni concrete, sicure e produttive.",
        activeService: "generative-ai"
    },
    {
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
        title: "DEVOPS & CLOUD SERVICES",
        tagline: "Automatizziamo rilasci e infrastrutture per velocità, sicurezza e controllo.",
        activeService: "devops"
    },
    {
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        title: "DATA ANALYTICS & BI",
        tagline: "Diamo ai dati una voce chiara per decisioni rapide e misurabili.",
        activeService: "data-analytics"
    },
    {
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        title: "IOT SYSTEMS DEVELOPMENT",
        tagline: "Connettiamo dispositivi, processi e persone in ecosistemi IoT intelligenti.",
        activeService: "iot"
    }
];

// Dove deve portare "Read more" per ogni slide
var readMoreTargets = {
    "software": "SES.HTML",
    "generative-ai": "GAS.html",
    "devops": "DCS.html",
    "data-analytics": "DA&BI.html",
    "iot": "IOT.html"
};

var currentSlide = 0;
var totalSlides = carouselData.length;
var slideInterval = 6000; // ms

var coverImage, coverTitle, coverTagline, controls, serviceLinks, readMoreLink;
var autoSlideInterval = null;

// ----- INIZIALIZZAZIONE -----
function initCarousel() {
    coverImage   = document.getElementById('cover-image');
    coverTitle   = document.getElementById('cover-title');
    coverTagline = document.getElementById('cover-tagline');
    controls     = document.getElementsByClassName('carousel-control');
    serviceLinks = document.querySelectorAll('.services-list a');
    readMoreLink = document.getElementById('read-more-link');

    if (!coverImage || !coverTitle || !coverTagline) {
        console.error('Elementi del carosello non trovati');
        return;
    }

    // Imposta esplicitamente la prima slide
    goToSlide(0, true);
    addEventListeners();
}

// ----- EVENT LISTENERS -----
function addEventListeners() {
    // Pallini
    for (var i = 0; i < controls.length; i++) {
        (function (index) {
            controls[index].addEventListener('click', function () {
                goToSlide(index, false);
                resetAutoSlide();
            });
        })(i);
    }

    // Link servizi nella lista
    for (var j = 0; j < serviceLinks.length; j++) {
        serviceLinks[j].addEventListener('click', function (e) {
            e.preventDefault();
            var service = this.getAttribute('data-service');
            var idx = findSlideIndexByService(service);
            if (idx !== -1) {
                goToSlide(idx, false);
                resetAutoSlide();
            }
        });
    }
}

function findSlideIndexByService(service) {
    for (var i = 0; i < carouselData.length; i++) {
        if (carouselData[i].activeService === service) {
            return i;
        }
    }
    return -1;
}

// ----- CAMBIO SLIDE -----
function goToSlide(index, skipFade) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    currentSlide = index;
    var data = carouselData[currentSlide];
    if (!data) return;

    // Immagine + fade
    if (skipFade) {
        coverImage.src = data.image;
        coverImage.alt = data.title;
    } else {
        coverImage.style.opacity = '0.7';
        setTimeout(function () {
            coverImage.src = data.image;
            coverImage.alt = data.title;
            coverImage.style.opacity = '1';
        }, 300);
    }

    // Titolo e tagline
    coverTitle.textContent = data.title;
    coverTagline.textContent = data.tagline;

    // Aggiorna href di "Read more"
    if (readMoreLink) {
        var target = readMoreTargets[data.activeService] || "#services";
        readMoreLink.setAttribute("href", target);
    }

    // Aggiorna pallini
    for (var i = 0; i < controls.length; i++) {
        if (i === currentSlide) {
            controls[i].classList.add('active');
        } else {
            controls[i].classList.remove('active');
        }
    }

    // Aggiorna servizio attivo nella lista
    for (var j = 0; j < serviceLinks.length; j++) {
        var link = serviceLinks[j];
        if (link.getAttribute('data-service') === data.activeService) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    }
}

// ----- AUTOPLAY -----
function startAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
    autoSlideInterval = setInterval(function () {
        goToSlide(currentSlide + 1, false);
    }, slideInterval);
}

function resetAutoSlide() {
    startAutoSlide();
}

// ----- AVVIO -----
document.addEventListener('DOMContentLoaded', function () {
    initCarousel();
    startAutoSlide(); // parte SUBITO in autoplay
});
