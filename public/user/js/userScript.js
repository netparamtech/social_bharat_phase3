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

// const scrollFunction = () => {

//   const scrollBtn = document.getElementById("scrollToTopBtn");
//   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//     scrollBtn.style.display = "block";
   
//   } else {
//     scrollBtn.style.display = "none";
   
//   }
// }
// When the user clicks on the button, scroll to the top of the document
// function topFunction() {
//   document.body.scrollTop = 0; // For Safari
//   document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
// }

// window.onscroll = scrollFunction();



// ................



$(document).ready(function () {
//   $('.repeater').repeater({
//     // (Optional)
//     // start with an empty list of repeaters. Set your first (and only)
//     // "data-repeater-item" with style="display:none;" and pass the
//     // following configuration flag
//     initEmpty: false,

//     // (Optional)
//     // Removes the delete button from the first list item, [defaults to false]
//     isFirstItemUndeletable: true,

//     // (Optional)
//     // Call while add the element
//     show: function () {
//       $(this).slideDown();
//       $(this).find('[data-repeater-create]').remove()
//     },

//   })
});

// ----- OnScroll NAvBAr -------

$(window).scroll(function() {
    if ($(this).scrollTop() > 50) { // Adjust the value as needed
        $('.navbar-light').addClass('scrolled');
    } else {
        $('.navbar-light').removeClass('scrolled');
    }
});

// ...........
function myFunctionPassword() {
  var x = document.getElementById("myInput");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}