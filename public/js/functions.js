// Nav links

function navScroll(value){
  document.querySelector(value).scrollIntoView({
  behavior: 'smooth'
});
}

document.querySelectorAll('.nav').forEach(function(link){
  link.addEventListener('click', function(event){
    event.preventDefault();
    navScroll(link.getAttribute('href'));
  });
});


// Scrolling Hero Text
var last_known_scroll_position = 0;
var ticking = false;


function scrollAnimation(wScroll) {
  document.querySelector('.head-title').style.transform = 'translate(0px, ' + wScroll/2.68 + '%)';
  document.querySelector('.head-title').style.opacity = 1/(wScroll/150);
  document.querySelector('.head-kicker').style.transform = 'translate('+ wScroll/30 + '%, ' + wScroll/1.25 +'%)';
  document.querySelector('.head-kicker').style.opacity = 1/(wScroll/40);
};

window.addEventListener('scroll', function(e) {

  last_known_scroll_position = window.scrollY;

  if (!ticking) {

    window.requestAnimationFrame(function() {
      scrollAnimation(last_known_scroll_position);
      ticking = false;
    });

    ticking = true;
  }
});

// carousel

document.addEventListener("DOMContentLoaded", function(){

  const skillCarousel = new Siema({
    duration: 500,
    selector: '.main-window',
    easing: 'ease-in-out',
    draggable: true,
    loop: true,
  });

  var arrows = document.querySelectorAll('.nav-arrow');

  arrows[0].addEventListener('click',() => skillCarousel.prev());
  arrows[1].addEventListener('click',() => skillCarousel.next());

});
