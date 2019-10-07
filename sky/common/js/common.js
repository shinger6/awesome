//======================================================
//  Sky Co., LTD.
//======================================================


// グローバルナビ
// -------------------------------------------------------------------
var sizeType = 0;

var widthJudge = function () {
	if (mediaWidth(895)) {
		if (sizeType != 2) { // SP時の処理
			pagetop();
			$('.subNav').hide();
			$('.spNavWrapp').remove();
			$('.subNav__item').attr('style', '');
			$('.spNavBtn').removeClass('spNavBtn--on');
			$('.gNav__item__icon').removeClass('gNav__item__ico--open');
		}
		sizeType = 2;
	} else {
		if (sizeType != 1) { // PC時の処理
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

// ページの先頭へ
// -------------------------------------------------------------------
var pagetop = function () {
	$(window).scroll(function () {
		var documentH = $(document).height(); //ドキュメントの高さ
		var topPos = $(window).scrollTop(); //トップからの距離
		var btnPos = $(window).height() + $(window).scrollTop();// 現在地
		var footerH = $('.footer').innerHeight();// フッターの高さ
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


// スクロールしたら表示
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
		//初回読み込み時＆スクロールする度に毎回まわす
		var element = $(".fadeIn:not(.fadeIn__on):visible");
		var i = 0;
		element.each(function() {
			var objPos = $(this).offset().top; //TOPからの距離
			var scroll = $(window).scrollTop(); //スクロールした距離
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
		// セレクタ出るたびに実行
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
// アンカー処理
//-------------------------------------------------------------------
var pageAnchor = function () {
	var windowW = $(window).width();
	var bp = 767; // ブレイクポイント
	if (windowW <= bp) {
		var headerHight = 60; // SPヘッダ高さ
	} else {
		var headerHight = 0; // PCヘッダ高さ
	}
	$('a[href^="#"]').click(function() {
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top-headerHight;
		$('body,html').animate({ 'scrollTop': position }, 0);
		return false;
	});
}

$(function () {
	var nav = $('.nav'),
		spNavBtn = $('.spNavBtn'),
		gNavItem = $('.gNav__item'),//グローバルビリンク
		subNav = $('.subNav'),// サブナビエリア
		subNavItem = $('.subNav__item'),//サブナビリンク
		flag = false;
		//load and resize.
	$(window).bind('load resize', function () {
		widthJudge();
		pageAnchor();
		// scrollFadeIn();
	});

	// 【PC】グローバルの開閉処理とホバーの処理
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

	// 【SP】グローバルの開閉処理
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

	//SP時の第二階層開閉
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

//新入社員の声のcookieを消す
// $(function () {
// 	if (!location.pathname.match(/\/person\/voice/)) {
// 		$.removeCookie('offset',{ path: "/" });
// 		$.removeCookie('offset-page',{ path: "/" });
// 	}
// });