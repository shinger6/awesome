//======================================================
//  Sky Co., LTD.
//======================================================


// �O���[�o���i�r
// -------------------------------------------------------------------
var sizeType = 0;

var widthJudge = function () {
	if (mediaWidth(895)) {
		if (sizeType != 2) { // SP���̏���
			pagetop();
			$('.subNav').hide();
			$('.spNavWrapp').remove();
			$('.subNav__item').attr('style', '');
			$('.spNavBtn').removeClass('spNavBtn--on');
			$('.gNav__item__icon').removeClass('gNav__item__ico--open');
		}
		sizeType = 2;
	} else {
		if (sizeType != 1) { // PC���̏���
			pagetop();
			$('.subNav').show();
			$('.spNavWrapp').remove();
			$('.spNavBtn').removeClass('spNavBtn--on');
			$('.gNav__item__icon').removeClass('gNav__item__ico--open');
			$('nav').css({ right: '-100%', display: 'flex', height: 'auto' });
		}
		sizeType = 1;
	}
};

// �y�[�W�̐擪��
// -------------------------------------------------------------------
var pagetop = function () {
	$(window).scroll(function () {
		var documentH = $(document).height(); //�h�L�������g�̍���
		var topPos = $(window).scrollTop(); //�g�b�v����̋���
		var btnPos = $(window).height() + $(window).scrollTop();// ���ݒn
		var footerH = $('.footer').innerHeight();// �t�b�^�[�̍���
		if (topPos > 50) {
			$('.pagetop').fadeIn();
			if (documentH - btnPos <= footerH && sizeType === 1) {
				$('.pagetop').css({
					'position': 'absolute',
					'bottom': footerH + 20
				});
			} else {
				$('.pagetop').css({
					'position': 'fixed',
					'bottom': 20
				});
			}
		} else if (topPos <= 60) {
			$('.pagetop').stop().fadeOut();
		}
	});
};


// �X�N���[��������\��
// -------------------------------------------------------------------
var scrollFadeIn = function () {
	var scrollSize;
	var scrollSizePC = 100;
	var scrollSizeSP = 50;
	if (sizeType != 2) {
		scrollSize = scrollSizePC;
	} else {
		scrollSize = scrollSizeSP;
	}

	function fadeElement(){
		//����ǂݍ��ݎ����X�N���[������x�ɖ���܂킷
		var element = $(".fadeIn:not(.fadeIn__on):visible");
		var i = 0;
		element.each(function() {
			var objPos = $(this).offset().top; //TOP����̋���
			var scroll = $(window).scrollTop(); //�X�N���[����������
			var winHeight = $(window).height();
			if (scroll > (objPos - winHeight + scrollSize)) {
				$(this).delay(i * 100).queue(function () {
					$(this).addClass('fadeIn__on').dequeue();
				});
				i++;
			}
		});
	}
	fadeElement();
	$(window).scroll(function () {
		// �Z���N�^�o�邽�тɎ��s
		fadeElement();
	});
};


var mediaWidth = function(checkWidth){
	if (!window.innerWidth) {
		return false;
	} else {
		if (typeof window.matchMedia == 'function') {
			return window.matchMedia('(max-width:' + checkWidth + 'px)').matches
		} else {
			if (window.innerWidth < checkWidth) {
				return true;
			} else {
				return false;
			}
		}
	}
}
// �A���J�[����
//-------------------------------------------------------------------
var pageAnchor = function () {
	var windowW = $(window).width();
	var bp = 767; // �u���C�N�|�C���g
	if (windowW <= bp) {
		var headerHight = 60; // SP�w�b�_����
	} else {
		var headerHight = 0; // PC�w�b�_����
	}
	$('a[href^="#"]').click(function() {
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		target = target.offset() ? target : $(".wrapper");
		var position = target.offset().top-headerHight;
		$('body,html').animate({ 'scrollTop': position }, 400);
		return false;
	});
}

$(function () {
	var nav = $('.nav'),
		spNavBtn = $('.spNavBtn'),
		gNavItem = $('.gNav__item'),//�O���[�o���r�����N
		subNav = $('.subNav'),// �T�u�i�r�G���A
		subNavItem = $('.subNav__item'),//�T�u�i�r�����N
		flag = false;
		//load and resize.
	$(window).bind('load resize', function () {
		widthJudge();
		pageAnchor();
		// scrollFadeIn();
	});

	// �yPC�z�O���[�o���̊J�����ƃz�o�[�̏���
	//-------------------------------------------------------------------
	gNavItem.hover(function () {
		if (!flag && !mediaWidth(895)) {
			flag = true;
			$(this).find(subNav).addClass('subNav--open');
			$(this).find(subNavItem).delay(200).each(function (i) {
				$(this).delay(i * 50).stop(false, false).animate({ opacity: 1, marginLeft: 0 }, 300);
			});
		}
	}, function () {
		if (!mediaWidth(895)) {
			$(this).find(subNavItem).stop(true, true).animate({ opacity: 0, marginLeft: '-20px' }, 300);
			$(this).find(subNav).delay(100).queue(function (next) {
				$(this).removeClass('subNav--open');
				next();
			});
			flag = false;
		}
	});
	$('.contents').hover(function () {
		if (flag && !mediaWidth(895)) {
			subNavItem.stop(true, true).animate({ opacity: 0, marginLeft: '-20px' }, 300);
			subNav.delay(100).queue(function (next) {
				$(this).removeClass('subNav--open');
				next();
			});
			flag = false;
		}
	});

	// �ySP�z�O���[�o���̊J����
	//-------------------------------------------------------------------
	spNavBtn.stop(true, false).on("click", function () {
		var h = $(window).outerHeight();
		$('.nav').height(h);
		$('html').toggleClass('spNavOn')
		// console.log(h);
		if (!$(this).hasClass('spNavBtn--on')) {
			nav.after("<div class='spNavWrapp'></div>");
			$('.spNavWrapp').stop(true, false).animate({ opacity: 1 }, 300);
			nav.stop(true, false).animate({ right: 0,}, 300);
			$(this).addClass('spNavBtn--on');
		} else if ($(this).hasClass('spNavBtn--on')) {
			$('.gNav01__item').stop(true, false).animate({ opacity: 0 }, 300);
			nav.stop(true, false).animate({ right: '-100%' }, 300, function () {
				nav.css({ display: 'flex' });
			});
			$('.spNavWrapp').stop(true, false).fadeOut(300, function () {
				$(this).remove();
			});
			nav.removeClass('nav--on');
			$(this).removeClass('spNavBtn--on');
		}
	});

	//SP���̑��K�w�J��
	$('.gNav__item__icon').stop().on('click', function (e) {
		if (!$(this).hasClass('gNav__item__ico--open')) {
			$(this).addClass('gNav__item__ico--open');
			$(this).next('ul').slideDown(300);
		} else {
			$(this).next('ul').slideUp(300);
			$(this).removeClass('gNav__item__ico--open');
		}
		e.preventDefault();
		$('.gNav02').on('click', function (e) {
			e.stopPropagation();
		});
	});
});

// -------------------------------------------------------------------

//�V���Ј��̐���cookie������
// $(function () {
// 	if (!location.pathname.match(/\/person\/voice/)) {
// 		$.removeCookie('offset',{ path: "/" });
// 		$.removeCookie('offset-page',{ path: "/" });
// 	}
// });