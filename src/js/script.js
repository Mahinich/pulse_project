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

	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
		  .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
		  .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
	  });
});