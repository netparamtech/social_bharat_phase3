$(document).ready(function() {
    //Wow
    new WOW().init({
      offset: 3000,
      duration: 2000
    }); 
    
    // Counter
    $('.counter').counterUp({
      delay: 10,
      time: 2000
    });
    $('.costomer-logos').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false,
      autoplaySpeed: 1500,
    
      responsive: [
      {
        breakpoint: 1024,
        settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false  
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false
          
        }
      }
    ]
    });
});
AOS.init({
  offset: 1000,
  duration: 1500,
  once: false,
});




