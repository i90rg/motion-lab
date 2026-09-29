// Скрипты сайта Motion Lab (jQuery + Semantic UI + GSAP)

$(function () {
  // Бургер-меню
  $('.site-header__toggle').on('click', function () {
    var $nav = $('.site-header__nav');
    $nav.toggleClass('site-header__nav--open');
    $(this).attr('aria-expanded', $nav.hasClass('site-header__nav--open'));
  });

  // Компоненты Semantic UI
  $('.ui.accordion').accordion();
  $('.ui.checkbox').checkbox();
  $('.ui.dropdown').dropdown();

  // Форма подписки в сайдбаре
  $('.subscribe-form').form({
    fields: {
      email: ['empty', 'email']
    },
    prompt: {
      empty: 'Введите e-mail',
      email: 'Неверный формат e-mail'
    },
    onSuccess: function (event) {
      event.preventDefault();
      $(this).addClass('success').find('input').val('');
    }
  });

  // Форма обратной связи
  $('.contact-form').form({
    fields: {
      name: {
        identifier: 'name',
        rules: [{ type: 'empty', prompt: 'Введите имя' }]
      },
      email: {
        identifier: 'email',
        rules: [{ type: 'email', prompt: 'Введите правильный e-mail' }]
      },
      message: {
        identifier: 'message',
        rules: [{ type: 'minLength[10]', prompt: 'Сообщение должно быть не короче 10 символов' }]
      },
      agree: {
        identifier: 'agree',
        rules: [{ type: 'checked', prompt: 'Нужно согласие на обработку данных' }]
      }
    },
    onSuccess: function (event) {
      event.preventDefault();
      $(this).addClass('success');
      $(this).find('input[type="text"], input[type="email"], textarea').val('');
    }
  });

  // Демо переходов: кнопка для телефонов, где нет hover
  $('.js-toggle-demo').on('click', function () {
    $(this).closest('.demo').toggleClass('demo--active');
  });

  // Демо keyframes: пауза
  $('.js-pause-demo').on('click', function () {
    var $demo = $(this).closest('.demo');
    $demo.toggleClass('demo--paused');
    $(this).text($demo.hasClass('demo--paused') ? 'Продолжить' : 'Пауза');
  });

  // Демо Web Animations API
  var square = document.querySelector('.js-waapi');
  if (square && square.animate) {
    var animation = square.animate([
      { transform: 'translateX(-100px) rotate(0deg)' },
      { transform: 'translateX(100px) rotate(360deg)' }
    ], {
      duration: 1500,
      iterations: Infinity,
      direction: 'alternate',
      easing: 'ease-in-out'
    });
    animation.pause();

    $('.js-waapi-play').on('click', function () {
      animation.play();
    });
    $('.js-waapi-pause').on('click', function () {
      animation.pause();
    });
  }

  // Галерея: фильтр
  $('.js-filter').on('click', function () {
    var filter = $(this).data('filter');
    $('.js-filter').removeClass('active');
    $(this).addClass('active');

    $('.gallery__item').each(function () {
      var show = filter === 'all' || $(this).data('category') === filter;
      $(this).toggleClass('gallery__item--hidden', !show);
    });
  });

  // Галерея: модальное окно
  $('.gallery__link').on('click', function (event) {
    event.preventDefault();
    var $modal = $('.gallery-modal');
    $modal.find('.header').text($(this).data('title'));
    $modal.find('img').attr('src', $(this).attr('href')).attr('alt', $(this).data('title'));
    $modal.modal('show');
  });

  // Дальше всё на GSAP
  if (typeof gsap === 'undefined') {
    return;
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Появление заголовка страницы
  gsap.from('.page__title', { y: -30, opacity: 0, duration: 0.8 });
  gsap.from('.page__lead', { y: 20, opacity: 0, duration: 0.8, delay: 0.2 });

  // Блоки появляются при прокрутке
  $('.js-fade').each(function () {
    gsap.from(this, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      scrollTrigger: {
        trigger: this,
        start: 'top 85%'
      }
    });
  });

  // Демо таймлайна GSAP
  if ($('.gsap-demo').length) {
    var tl = gsap.timeline({ paused: true });
    tl.to('.gsap-demo__item--1', { y: -40, rotation: 180, duration: 0.5 })
      .to('.gsap-demo__item--2', { scale: 1.5, backgroundColor: '#00b5ad', duration: 0.5 })
      .to('.gsap-demo__item--3', { x: -30, borderRadius: '50%', duration: 0.5 })
      .to('.gsap-demo__item', { y: 0, x: 0, scale: 1, rotation: 360, duration: 0.8, stagger: 0.1, ease: 'bounce.out' });

    $('.js-tl-play').on('click', function () {
      tl.play();
    });
    $('.js-tl-reverse').on('click', function () {
      tl.reverse();
    });
    $('.js-tl-restart').on('click', function () {
      tl.restart();
    });
  }
});
