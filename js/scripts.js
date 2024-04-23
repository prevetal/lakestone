// Ширина окна для ресайза
WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]
OVERLAY = document.querySelector('.overlay')


document.addEventListener('DOMContentLoaded', function () {
	// Основной слайдер на главной
	let mainSlider = document.querySelector('.main_slider .swiper')

	if (mainSlider) {
		new Swiper('.main_slider .swiper', {
			loop: true,
			speed: 750,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: false
			}
		})
	}


	// Карусель топовых статей
	const topArticlesSliders = [],
		topArticles = document.querySelectorAll('.articles .top_articles .swiper')

	topArticles.forEach(function (el, i) {
		el.classList.add('top_articles_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: false
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			breakpoints: {
				0: {
					spaceBetween: 20,
					slidesPerView: 1
				},
				768: {
					spaceBetween: 10,
					slidesPerView: 2
				},
				1280: {
					spaceBetween: 20,
					slidesPerView: 2
				}
			},
			on: {
				init: swiper => setHeight(swiper.el.querySelectorAll('.top_article')),
				resize: swiper => {
					let articles = swiper.el.querySelectorAll('.top_article')

					articles.forEach(el => el.style.height = 'auto')

					setHeight(articles)
				}
			}
		}

		topArticlesSliders.push(new Swiper('.top_articles_s' + i, options))
	})


	// Карусель товаров
	const productsSliders = [],
		products = document.querySelectorAll('.products .products_swiper')

	products.forEach(function (el, i) {
		el.classList.add('products_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: false
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			breakpoints: {
				0: {
					spaceBetween: 10,
					slidesPerView: 2
				},
				768: {
					spaceBetween: 20,
					slidesPerView: 3
				},
				1024: {
					spaceBetween: 20,
					slidesPerView: 3
				},
				1280: {
					spaceBetween: 20,
					slidesPerView: 4
				},
				1440: {
					spaceBetween: 20,
					slidesPerView: 5
				}
			},
			on: {
				init: swiper => {
					setTimeout(() => {
						setHeight(swiper.el.querySelectorAll('.product .name'))

						$(swiper.$el).find('.swiper-button-next, .swiper-button-prev').css(
							'top', $(swiper.$el).find('.thumb').outerHeight() * 0.5
						)
					})
				},
				resize: swiper => {
					setTimeout(() => {
						let productNames = swiper.el.querySelectorAll('.product .name')

						productNames.forEach(el => el.style.height = 'auto')

						setHeight(productNames)

						$(swiper.$el).find('.swiper-button-next, .swiper-button-prev').css(
							'top', $(swiper.$el).find('.thumb').outerHeight() * 0.5
						)
					})
				}
			}
		}

		productsSliders.push(new Swiper('.products_s' + i, options))
	})


	// Карусель изображений в товаре
	const productThumbsSliders = [],
		productThumbs = document.querySelectorAll('.products .product .swiper')

	productThumbs.forEach(function (el, i) {
		el.classList.add('product_thumbs_s' + i)

		let options = {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			nested: true,
			allowTouchMove: false,
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: false
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			spaceBetween: 0,
			slidesPerView: 1,
			on: {
				init: swiper => {
					$(swiper.$el).find('.swiper-pagination-bullet').mouseenter(function() {
						swiper.slideTo($(this).index() + 1)
					})
				}
			}
		}

		productThumbsSliders.push(new Swiper('.product_thumbs_s' + i, options))
	})


	// Получение скидки
	const getDiscountSliders = [],
		getDiscount = document.querySelectorAll('.get_discount .swiper')

	getDiscount.forEach(function (el, i) {
		el.classList.add('get_discount_s' + i)

		el.closest('.get_discount').querySelectorAll('.current_discount > *').forEach(el => el.setAttribute('data-slider-index', i))

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			autoHeight: true,
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: false
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			spaceBetween: 24,
			slidesPerView: 1,
			on: {
				activeIndexChange: swiper => {
					setTimeout(() => {
						let currentSlide = swiper.realIndex + 1

						$('.get_discount .current_discount > *').removeClass('active')
						$('.get_discount .current_discount > *').eq(swiper.realIndex).addClass('active')

						$(swiper.$el).find('.count .current').text(currentSlide)
					})
				}
			}
		}

		getDiscountSliders.push(new Swiper('.get_discount_s' + i, options))
	})

	$('.get_discount .current_discount > *').click(function(e) {
		e.preventDefault()

		getDiscountSliders[$(this).data('slider-index')].slideTo($(this).index())
	})


	// Карусель категорий
	const categoriesSliders = [],
		categories = document.querySelectorAll('.categories_carousel .swiper')

	categories.forEach(function (el, i) {
		el.classList.add('categories_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: false
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			breakpoints: {
				0: {
					spaceBetween: 10,
					slidesPerView: 2
				},
				768: {
					spaceBetween: 10,
					slidesPerView: 3
				},
				1280: {
					spaceBetween: 20,
					slidesPerView: 4
				}
			},
			on: {
				init: swiper => {
					setTimeout(() => {
						$(swiper.$el).find('.swiper-button-next, .swiper-button-prev').css(
							'top', $(swiper.$el).find('.thumb').outerHeight() * 0.5
						)
					})
				},
				resize: swiper => {
					setTimeout(() => {
						$(swiper.$el).find('.swiper-button-next, .swiper-button-prev').css(
							'top', $(swiper.$el).find('.thumb').outerHeight() * 0.5
						)
					})
				}
			}
		}

		categoriesSliders.push(new Swiper('.categories_s' + i, options))
	})


	// Аккордион
	$('body').on('click', '.accordion .accordion_item .head', function(e) {
		e.preventDefault()

		const $item = $(this).closest('.accordion_item'),
			$accordion = $(this).closest('.accordion')

		if ($item.hasClass('active')) {
			$item.removeClass('active').find('.data').slideUp(300)
		} else {
			$accordion.find('.accordion_item').removeClass('active')
			$accordion.find('.data').slideUp(300)

			$item.addClass('active').find('.data').slideDown(300)
		}
	})


	// Товар в избранное
	$('body').on('click', '.product .favorite_btn', function(e) {
		e.preventDefault()

		$(this).toggleClass('active')
	})


	// Корпоративным клиентам - карусель изображений
	$('.to_corp_clients .gallery .wheelSlider-container').wheelSlider({
		arrowPrevHtml: '<svg class="icon"><use xlink:href="images/sprite.svg#ic_arr_hor"></use></svg>',
		arrowNextHtml: '<svg class="icon"><use xlink:href="images/sprite.svg#ic_arr_hor"></use></svg>'
	})


	// Оформление заказа - Выбор способа доаставки
	$('.checkout .delivery_method select').change(function(e) {
		$('.checkout .delivery_method .method_info').hide()
		$('.checkout .delivery_method .method'+ $(this).val() +'_info').fadeIn(300)
	})


	// Подарок к товару
	$('.product_info .buy .gift label').click(function (e) {
		if (e.target.nodeName == 'LABEL') {
			$('.product_info .buy .gift').toggleClass('active')
		}
	})


	// Информация о товаре
	$('.product_info_btn').click(function (e) {
		e.preventDefault()

		let content = $(this).data('content')

		$('.product_info_modal').removeClass('show')
		$('#' + content).addClass('show')

		$('.overlay').fadeIn(300)
	})

	$('.product_info_modal .close_btn, .overlay').click(e => {
		e.preventDefault()

		$('.overlay').fadeOut(200)
		$('.product_info_modal').removeClass('show')
	})


	// Отзывы - спойлер ответа
	$('.reviews .review .answer .spoler_btn').click(function (e) {
		e.preventDefault()

		let review = $(this).closest('.review')

		$(this).toggleClass('active')
		review.find('.answer .text').slideToggle(300)
	})


	// Табы
	var locationHash = window.location.hash

	$('body').on('click', '.tabs .btn', function(e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			const $parent           = $(this).closest('.tabs_container'),
				  activeTab         = $(this).data('content'),
				  $activeTabContent = $(activeTab),
				  level             = $(this).data('level')

			$parent.find('.tabs:first .btn').removeClass('active')
			$parent.find('.tab_content.' + level).removeClass('active')

			$(this).addClass('active')
			$activeTabContent.addClass('active')
		}
	})

	if (locationHash && $('.tabs_container').length) {
		const $activeTab        = $(`.tabs .btn[data-content="${locationHash}"]`),
			  $activeTabContent = $(locationHash),
			  $parent           = $activeTab.closest('.tabs_container'),
			  level             = $activeTab.data('level')

		$parent.find('.tabs:first .btn').removeClass('active')
		$parent.find('.tab_content.' + level).removeClass('active')

		$activeTab.addClass('active')
		$activeTabContent.addClass('active')

		$('html, body').stop().animate({ scrollTop: $activeTabContent.offset().top }, 1000)
	}


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.l10n = {
		CLOSE: "Закрыть",
		NEXT: "Следующий",
		PREV: "Предыдущий",
		MODAL: "Вы можете закрыть это модальное окно нажав клавишу ESC"
	}

	Fancybox.defaults.template = {
		closeButton: '<svg><use xlink:href="images/sprite.svg#ic_close"></use></svg>',
		spinner: '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="25 25 50 50" tabindex="-1"><circle cx="50" cy="50" r="20"/></svg>',
		main: null
	}


	// Всплывающие окна
	const modalBtns = document.querySelectorAll('.modal_btn')

	if (modalBtns) {
		modalBtns.forEach(el => {
			el.addEventListener('click', e => {
				e.preventDefault()

				Fancybox.close()

				Fancybox.show([{
					src: document.getElementById(el.getAttribute('data-modal')),
					type: 'inline'
				}])
			})
		})
	}


	// Увеличение картинки
	Fancybox.bind('.fancy_img', {
		Image: {
			zoom: false,
		},
		Thumbs: {
			autoStart: false,
		}
	})


	// Модалка скидки
	// Fancybox.show([{
	// 	src: '#get_discount_modal',
	// 	type: 'inline'
	// }])


	// Автоопределение города
	// $('#location_autodetection').addClass('show')
	// $('.overlay').fadeIn(300)

	// $('#location_autodetection .yes_btn, .overlay').click(e => {
	// 	e.preventDefault()

	// 	$('#location_autodetection').removeClass('show')
	// 	$('.overlay').fadeOut(200)
	// })


	// Фильтр
	$('aside .filter .item .head').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active').next().slideToggle(300)
	})

	$('aside .filter .item .clear_btn').click(function(e) {
		e.preventDefault()

		let item = $(this).closest('.item')

		item.find('input').prop('checked', false)
	})


	$priceRange = $('.filter #price_range').ionRangeSlider({
		type: 'double',
		min: 0,
		max: 30000,
		from: 2000,
		to: 20000,
		step: 100,
		onChange: data => {
			$('.filter .price_range input.from').val(data.from.toLocaleString() + ' ₽')
			$('.filter .price_range input.to').val(data.to.toLocaleString() + ' ₽')

			$('.filter .item .val .from').text(data.from.toLocaleString())
			$('.filter .item .val .to').text(data.to.toLocaleString())
		},
		onUpdate: data => {
			$('.filter .price_range input.from').val(data.from.toLocaleString() + ' ₽')
			$('.filter .price_range input.to').val(data.to.toLocaleString() + ' ₽')

			$('.filter .item .val .from').text(data.from.toLocaleString())
			$('.filter .item .val .to').text(data.to.toLocaleString())
		}
	}).data('ionRangeSlider')

	$('.filter .price_range .input').keyup(function () {
		$priceRange.update({
			from: parseInt($('.filter .price_range input.from').val().replace(/\s/g, '')),
			to: parseInt($('.filter .price_range input.to').val().replace(/\s/g, ''))
		})
	})


	$('.filter .item .range .inputs .clear_btn').click(function(e) {
		e.preventDefault()
		$priceRange.reset()
	})


	$('.filter .reset_btn').click(function() {
		$priceRange.reset()
	})


	$('.products_head .mob_filter_btn').click(function(e) {
		e.preventDefault()

		$('body').toggleClass('menu_open')
		$('#filter').fadeIn(300)
	})

	$('.filter .close_btn').click(function(e) {
		e.preventDefault()

		$('body').toggleClass('menu_open')
		$('#filter').fadeOut(200)
	})


	// Поиск
	$('header .links .search .btn').click(e => {
		e.preventDefault()

		$('#search_modal').addClass('show')
		$('.overlay').fadeIn(300)

		setTimeout(() => $('#search_modal .form .field .input').focus())
	})

	$('#search_modal .form .close_btn, .overlay').click(e => {
		e.preventDefault()

		$('#search_modal').removeClass('show')
		$('.overlay').fadeOut(200)
	})

	$('#search_modal .form .field .input').keyup(function() {
		$(this).val().length
			? $('#search_modal .result').addClass('show')
			: $('#search_modal .result').removeClass('show')
	})


	// Подписка на рассылку
	$('.get_discount .step .form').submit(e => {
		e.preventDefault()

		$('.get_discount .step .form').hide()
		$('.get_discount .step .success').fadeIn(300)
	})


	// Моб. спойлеры в подвале сайта
	$('footer .links .title').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active').next().slideToggle(300)
	})


	// Моб. меню
	$('header .mob_menu_btn, .mob_menu .close_btn').click(e => {
		e.preventDefault()

		$('body').toggleClass('menu_open')
		$('.mob_menu').toggleClass('show')
	})

	$('.mob_menu .links a.sub_link, aside .mob_links .links a').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active').next().slideToggle(300)
	})


	// Кастомный select
	const selects = document.querySelectorAll('select')

	if (selects) {
		selects.forEach(el => NiceSelect.bind(el, {
			placeholder: el.getAttribute('data-placeholder')
		}))
	}


	// Маска ввода
	const phoneInputs = document.querySelectorAll('input[type=tel]')

	if (phoneInputs) {
		phoneInputs.forEach(el => {
			IMask(el, {
				mask: '+{7} (000) 000-00-00',
				lazy: true
			})
		})
	}


	if (is_touch_device()) {
		// Подменю на тач скрине
		const subMenu = document.querySelectorAll('header .menu .sub_menu')

		$('header .menu_item > a.sub_link').addClass('touch_link')

		$('header .menu_item > a.sub_link').click(function (e) {
			const $dropdown = $(this).next()

			if ($dropdown.css('visibility') === 'hidden') {
				e.preventDefault()

				subMenu.forEach(el => el.classList.remove('show'))
				$dropdown.addClass('show')

				BODY.style = 'cursor: pointer;'
			}
		})

		// Закрываем под. меню при клике за её пределами
		document.addEventListener('click', e => {
			if ($(e.target).closest('.menu').length === 0) {
				subMenu.forEach(el => el.classList.remove('show'))

				BODY.style = 'cursor: default;'
			}
		})


		// Подкатегории на тач скрине
		const subCategories = document.querySelectorAll('header .categories .sub_categories')

		$('header .categories > * > a.sub_link').addClass('touch_link')

		$('header .categories > * > a.sub_link').click(function (e) {
			const $dropdown = $(this).next()

			if ($dropdown.css('visibility') === 'hidden') {
				e.preventDefault()

				subCategories.forEach(el => el.classList.remove('show'))
				$dropdown.addClass('show')

				BODY.style = 'cursor: pointer;'
			}
		})

		// Закрываем под. меню при клике за её пределами
		document.addEventListener('click', e => {
			if ($(e.target).closest('.categories').length === 0) {
				subCategories.forEach(el => el.classList.remove('show'))

				BODY.style = 'cursor: default;'
			}
		})
	}


	// Верхний баннер
	$('.top_banner .close_btn').click(function(e) {
		e.preventDefault()

		$('.top_banner').slideUp(300, () => headerOffset = 0)
	})


	// Преимущества
	initAdvantagesSliders()

	// Корпоративным клиентам - Плюсы
	initToCorpClientsPlusesSliders()

	// Корпоративным клиентам - Цели
	initToCorpClientsGoalsSliders()

	// Этапы производства
	initOurProductionStepsSliders()

	// Почему мы поддерживаем применение старинных традиций?
	initVintageTechniquesWhySliders()

	// Натуральная кожа - этапы
	initGenuineLeatherStepsSliders()

	// Страница товара - Плюсы
	initProductInfoPlusesSliders()


	// Мини всплывающие окна
	$('.mini_modal_btn').click(function(e) {
		e.preventDefault()

		const modalId = $(this).data('modal-id')

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')
			$('.mini_modal').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		} else {
			$('.mini_modal_btn').removeClass('active')
			$(this).addClass('active')

			$('.mini_modal').removeClass('active')
			$(modalId).addClass('active')

			if (is_touch_device()) $('body').css('cursor', 'pointer')
		}
	})

	// Закрываем всплывашку при клике за её пределами
	$(document).click(e => {
		if ($(e.target).closest('.modal_cont').length === 0) {
			$('.mini_modal, .mini_modal_btn').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		}
	})


	// Спойлер в нижнем тексте
	$('.bottom_text .spoler_btn').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active')
		$('.bottom_text .text_block').toggleClass('show')
	})


	// Страница товара
	new Swiper('.product_info .images .mob_slider .swiper', {
		loop: true,
		speed: 500,
		watchSlidesProgress: true,
		slideActiveClass: 'active',
		slideVisibleClass: 'visible',
		nested: true,
		preloadImages: false,
		lazy: {
			enabled: true,
			checkInView: true,
			loadOnTransitionStart: true,
			loadPrevNext: false
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
			bulletActiveClass: 'active'
		},
		spaceBetween: 0,
		slidesPerView: 1
	})


	// Страница товара - видео
	$('.product_info .images .video .thumb').click(function(e) {
		e.preventDefault()

		let parent = $(this).closest('.video')

		parent.find('video').fadeIn(300, () => parent.find('video').get(0).play())
	})

	$('.product_info .images .video video').click(function(e) {
		e.preventDefault()

		let parent = $(this).closest('.video')

		parent.find('video').fadeOut(200, () => parent.find('video').get(0).pause())
	})


	// О компании - видео
	$('.about_info .video .thumb').click(function(e) {
		e.preventDefault()

		$('.about_info .video iframe').fadeIn(300)
	})


	// Наше производство - видео
	$('.our_production .video .thumb').click(function(e) {
		e.preventDefault()

		$('.our_production .video iframe').fadeIn(300)
	})


	// Залипание блока
	new hcSticky('.sticky', {
		top: 20
	})
})



window.addEventListener('load', function () {
	// Фикс. шапка
	headerInit = true,
	headerHeight = $('header').outerHeight(),
	headerOffset = $('header').offset().top,
	scrollOffset = $(window).scrollTop()

	$('header').wrap('<div class="header_wrap"></div>')
	$('.header_wrap').height(headerHeight)
})



window.addEventListener('scroll', function () {
	// Фикс. шапка
	typeof headerInit !== 'undefined' && headerInit && $(window).scrollTop() < scrollOffset && WW < 1280
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')

	scrollOffset = $(window).scrollTop()
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Перезапись ширины окна
		WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth


		// Фикс. шапка
		headerInit = false
		$('.header_wrap').height('auto')

		setTimeout(() => {
			headerInit   = true
			headerHeight = $('header').outerHeight()

			$('.header_wrap').height(headerHeight)

			headerInit && $(window).scrollTop() > 0
				? $('header').addClass('fixed')
				: $('header').removeClass('fixed')
		}, 100)


		// Преимущества
		initAdvantagesSliders()

		// Корпоративным клиентам - Плюсы
		initToCorpClientsPlusesSliders()

		// Корпоративным клиентам - Цели
		initToCorpClientsGoalsSliders()

		// Этапы производства
		initOurProductionStepsSliders()

		// Почему мы поддерживаем применение старинных традиций?
		initVintageTechniquesWhySliders()

		// Натуральная кожа - этапы
		initGenuineLeatherStepsSliders()

		// Страница товара - Плюсы
		initProductInfoPlusesSliders()


		// Моб. версия
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})



// Преимущества
advantagesSliders = []

function initAdvantagesSliders() {
	if ($(window).width() < 1024) {
		if ($('.advantages .row').length) {
			$('.advantages .row > *').addClass('swiper-slide')
			$('.advantages .row').addClass('swiper-wrapper').removeClass('row')

			$('.advantages .swiper').each(function (i) {
				$(this).addClass('advantages_s' + i)

				let options = {
					loop: false,
					speed: 500,
					watchSlidesProgress: true,
					slideActiveClass: 'active',
					slideVisibleClass: 'visible',
					pagination: {
						el: '.swiper-pagination',
						type: 'bullets',
						clickable: true,
						bulletActiveClass: 'active'
					},
					breakpoints: {
						0: {
							spaceBetween: 20,
							slidesPerView: 1
						},
						768: {
							spaceBetween: 30,
							slidesPerView: 3
						}
					}
				}

				advantagesSliders.push(new Swiper('.advantages_s' + i, options))
			})
		}
	} else {
		advantagesSliders.forEach(element => element.destroy(true, true))

		advantagesSliders = []

		$('.advantages .swiper-wrapper').addClass('row').removeClass('swiper-wrapper')
		$('.advantages .row > *').removeClass('swiper-slide')
	}
}



// Корпоративным клиентам - Плюсы
toCorpClientsPlusesSliders = []

function initToCorpClientsPlusesSliders() {
	if ($(window).width() < 1279) {
		if ($('.to_corp_clients .pluses .row').length) {
			$('.to_corp_clients .pluses .row > *').addClass('swiper-slide')
			$('.to_corp_clients .pluses .row').addClass('swiper-wrapper').removeClass('row')

			$('.to_corp_clients .pluses .swiper').each(function (i) {
				$(this).addClass('to_corp_clients_pluses_s' + i)

				let options = {
					loop: false,
					speed: 500,
					watchSlidesProgress: true,
					slideActiveClass: 'active',
					slideVisibleClass: 'visible',
					slidesPerView: 'auto',
					spaceBetween: 10,
					pagination: {
						el: '.swiper-pagination',
						type: 'bullets',
						clickable: true,
						bulletActiveClass: 'active'
					},
					on: {
						init: swiper => {
							setTimeout(() => {
								setHeight(swiper.el.querySelectorAll('.item'))
							})
						},
						resize: swiper => {
							setTimeout(() => {
								let items = swiper.el.querySelectorAll('.item')

								items.forEach(el => el.style.height = 'auto')

								setHeight(items)
							})
						}
					}
				}

				toCorpClientsPlusesSliders.push(new Swiper('.to_corp_clients_pluses_s' + i, options))
			})
		}
	} else {
		toCorpClientsPlusesSliders.forEach(element => element.destroy(true, true))

		toCorpClientsPlusesSliders = []

		$('.to_corp_clients .pluses .swiper-wrapper').addClass('row').removeClass('swiper-wrapper')
		$('.to_corp_clients .pluses .row > *').removeClass('swiper-slide')
	}
}



// Корпоративным клиентам - Цели
toCorpClientsGoalsSliders = []

function initToCorpClientsGoalsSliders() {
	if ($(window).width() < 1279) {
		if ($('.to_corp_clients .goals .row').length) {
			$('.to_corp_clients .goals .row > *').addClass('swiper-slide')
			$('.to_corp_clients .goals .row').addClass('swiper-wrapper').removeClass('row')

			$('.to_corp_clients .goals .swiper').each(function (i) {
				$(this).addClass('to_corp_clients_goals_s' + i)

				let options = {
					loop: true,
					speed: 500,
					watchSlidesProgress: true,
					slideActiveClass: 'active',
					slideVisibleClass: 'visible',
					slidesPerView: 'auto',
					spaceBetween: 10,
					centeredSlides: true,
					pagination: {
						el: '.swiper-pagination',
						type: 'bullets',
						clickable: true,
						bulletActiveClass: 'active'
					},
					on: {
						init: swiper => {
							setTimeout(() => {
								setHeight(swiper.el.querySelectorAll('.item'))
							})
						},
						resize: swiper => {
							setTimeout(() => {
								let items = swiper.el.querySelectorAll('.item')

								items.forEach(el => el.style.height = 'auto')

								setHeight(items)
							})
						}
					}
				}

				toCorpClientsGoalsSliders.push(new Swiper('.to_corp_clients_goals_s' + i, options))
			})
		}
	} else {
		toCorpClientsGoalsSliders.forEach(element => element.destroy(true, true))

		toCorpClientsGoalsSliders = []

		$('.to_corp_clients .goals .swiper-wrapper').addClass('row').removeClass('swiper-wrapper')
		$('.to_corp_clients .goals .row > *').removeClass('swiper-slide')
	}
}



// Этапы производства
ourProductionStepsSliders = []

function initOurProductionStepsSliders() {
	if ($(window).width() < 1279) {
		if ($('.our_production .steps .row').length) {
			$('.our_production .steps .row > *').addClass('swiper-slide')
			$('.our_production .steps .row').addClass('swiper-wrapper').removeClass('row')

			$('.our_production .steps .swiper').each(function (i) {
				$(this).addClass('our_production_steps_s' + i)

				let options = {
					loop: false,
					speed: 500,
					watchSlidesProgress: true,
					slideActiveClass: 'active',
					slideVisibleClass: 'visible',
					pagination: {
						el: '.swiper-pagination',
						type: 'bullets',
						clickable: true,
						bulletActiveClass: 'active'
					},
					breakpoints: {
						0: {
							spaceBetween: 10,
							slidesPerView: 2
						},
						768: {
							slidesPerView: 'auto',
							spaceBetween: 10
						}
					}
				}

				ourProductionStepsSliders.push(new Swiper('.our_production_steps_s' + i, options))
			})
		}
	} else {
		ourProductionStepsSliders.forEach(element => element.destroy(true, true))

		ourProductionStepsSliders = []

		$('.our_production .steps .swiper-wrapper').addClass('row').removeClass('swiper-wrapper')
		$('.our_production .steps .row > *').removeClass('swiper-slide')
	}
}



// Почему мы поддерживаем применение старинных традиций?
vintageTechniquesWhySliders = []

function initVintageTechniquesWhySliders() {
	if ($(window).width() < 1279) {
		if ($('.vintage_techniques .why .row').length) {
			$('.vintage_techniques .why .row > *').addClass('swiper-slide')
			$('.vintage_techniques .why .row').addClass('swiper-wrapper').removeClass('row')

			$('.vintage_techniques .why .swiper').each(function (i) {
				$(this).addClass('vintage_techniques_why_s' + i)

				let options = {
					loop: false,
					speed: 500,
					watchSlidesProgress: true,
					slideActiveClass: 'active',
					slideVisibleClass: 'visible',
					pagination: {
						el: '.swiper-pagination',
						type: 'bullets',
						clickable: true,
						bulletActiveClass: 'active'
					},
					slidesPerView: 'auto',
					spaceBetween: 15
				}

				vintageTechniquesWhySliders.push(new Swiper('.vintage_techniques_why_s' + i, options))
			})
		}
	} else {
		vintageTechniquesWhySliders.forEach(element => element.destroy(true, true))

		vintageTechniquesWhySliders = []

		$('.vintage_techniques .why .swiper-wrapper').addClass('row').removeClass('swiper-wrapper')
		$('.vintage_techniques .why .row > *').removeClass('swiper-slide')
	}
}



// Натуральная кожа - этапы
genuineLeatherStepsSliders = []

function initGenuineLeatherStepsSliders() {
	if ($(window).width() < 1279) {
		if ($('.genuine_leather .steps .row').length) {
			$('.genuine_leather .steps .row > *').addClass('swiper-slide')
			$('.genuine_leather .steps .row').addClass('swiper-wrapper').removeClass('row')

			$('.genuine_leather .steps .swiper').each(function (i) {
				$(this).addClass('genuine_leather_steps_s' + i)

				let options = {
					loop: false,
					speed: 500,
					watchSlidesProgress: true,
					slideActiveClass: 'active',
					slideVisibleClass: 'visible',
					pagination: {
						el: '.swiper-pagination',
						type: 'bullets',
						clickable: true,
						bulletActiveClass: 'active'
					},
					breakpoints: {
						0: {
							spaceBetween: 10,
							slidesPerView: 2
						},
						768: {
							slidesPerView: 'auto',
							spaceBetween: 10
						}
					}
				}

				genuineLeatherStepsSliders.push(new Swiper('.genuine_leather_steps_s' + i, options))
			})
		}
	} else {
		genuineLeatherStepsSliders.forEach(element => element.destroy(true, true))

		genuineLeatherStepsSliders = []

		$('.genuine_leather .steps .swiper-wrapper').addClass('row').removeClass('swiper-wrapper')
		$('.genuine_leather .steps .row > *').removeClass('swiper-slide')
	}
}



// Страница товара - Плюсы
productInfoPlusesSliders = []

function initProductInfoPlusesSliders() {
	if ($(window).width() < 768) {
		if ($('.product_info .pluses .row').length) {
			$('.product_info .pluses .row > *').addClass('swiper-slide')
			$('.product_info .pluses .row').addClass('swiper-wrapper').removeClass('row')

			$('.product_info .pluses .swiper').each(function (i) {
				$(this).addClass('product_info_pluses_s' + i)

				let options = {
					loop: false,
					speed: 500,
					watchSlidesProgress: true,
					slideActiveClass: 'active',
					slideVisibleClass: 'visible',
					slidesPerView: 'auto',
					spaceBetween: 30
				}

				productInfoPlusesSliders.push(new Swiper('.product_info_pluses_s' + i, options))
			})
		}
	} else {
		productInfoPlusesSliders.forEach(element => element.destroy(true, true))

		productInfoPlusesSliders = []

		$('.product_info .pluses .swiper-wrapper').addClass('row').removeClass('swiper-wrapper')
		$('.product_info .pluses .row > *').removeClass('swiper-slide')
	}
}