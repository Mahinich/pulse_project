$(document).ready(function(){
	// Carousel
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

	//Catalog tabs
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
		  .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
		  .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});
	
	function toggleSlide (item) {
		$(item).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active'); 
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			})
		});
	};
	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');

	//Modal

	$('[data-modal="consultation"]').on('click', function() {
		$('.overlay, #consultation').fadeIn('slow');
	});

	$('.modal__close').on('click', function() {
		$('.overlay, #consultation, #order, #thanks').fadeOut('slow');
	});

	$('.button_catalog-item').each(function(i) {
		$(this).on('click', function() {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		});
	});

	function validateForms(form) {
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				  },
				phone:"required", 
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: {
					required: "Пожалуйста введите свое имя",
					minlength: jQuery.validator.format("Введите {0} символов")
				  },
				phone: "Пожалуйста, введите свое номер",
				email: {
				  required: "Пожалуйста, введите свою почту",
				  email: "Неправильно введен адрес почты"
				}
			  }
		});
	};

	validateForms('#consultation-form');
	validateForms('#consultation form');
	validateForms('#order form');
});