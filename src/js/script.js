$(document).ready(function(){
	$('.carousel__inner').slick({
		speed: 1000,
		prevArrow: '<button type="button" class="slick-prev"> <img src="icon/left.png"> </button>',
		nextArrow: '<button type="button" class="slick-next"> <img src="icon/right.png"> </button>',
		responsive:[
			{
				breakpoint: 768,
				settings: {
				  infinite: true,
				  dots: true,
				  arrows: false
				}
			},
		]
	});
});

