// $(document).ready(function(){
// 	$('.carousel__inner').slick({
// 		speed: 1000,
// 		prevArrow: '<button type="button" class="slick-prev"> <img src="icon/left.png"> </button>',
// 		nextArrow: '<button type="button" class="slick-next"> <img src="icon/right.png"> </button>',
// 		responsive:[
// 			{
// 				breakpoint: 992,
// 				settings: {
// 				  infinite: true,
// 				  dots: true,
// 				  arrows: false
// 				}
// 			},
// 		]
// 	});
// });

const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
	controls: false,
	nav: false
  });
  document.querySelector('.prev').addEventListener('click', function () {
	slider.goTo('prev');
  });

  document.querySelector('.next').addEventListener('click', function () {
	slider.goTo('next');
  });
