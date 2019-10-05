//======================================================
//  Sky Co., LTD.
//======================================================


// グローバルナビ
// -------------------------------------------------------------------
var sizeType = 0;

var widthJudge = function () {
	if (mediaWidth(768)) {
		if (sizeType != 2) { // SP時の処理
			$('.header__nav').hide();
			$('body').removeClass('PC');
			$('.navBtn').removeClass('navBtn--on');
			$('.gNav02').hide();
			pagetop();
		}
		sizeType = 2;
	} else {
		if (sizeType != 1) { // PC時の処理
			$('.header__nav').hide();
			$('body').addClass('PC');
			$('.gNav01__item--toggle').removeClass('gNav01__item--toggle--on');
			$('.navBtn').removeClass('navBtn--on');
			$('.gNav02').show();
			pagetop();
		}
		sizeType = 1;
	}
};

// グローバルの開閉処理とホバーの処理
$(function () {

	var glovalArea = $('.header__nav'); // 開閉エリア
	var navBtn = $('.navBtn'); // メニューボタン
	glovalArea.hide();

	// メニューエリア開閉
	navBtn.stop().on("click", function () {
		if (!$(this).hasClass('navBtn--on')) {
			glovalArea.slideDown(400, 'easeInOutCubic');
			glovalArea.css({ display: 'flex' });
			$('.gNav01__item').css({ opacity: 0 }).delay(200).each(function (i) {
				$(this).delay(i * 80).animate({ opacity: 1 }, 500);
			});
			$(this).addClass('navBtn--on');
		} else {
			$('.gNav01__item').animate({ opacity: 0 }, 400);
			glovalArea.delay(200).slideUp(400, 'easeInOutCubic');
			$(this).removeClass('navBtn--on');
		}
	});


	// SP時の第二階層開閉
	$('.gNav01__item--toggle').stop().on('click', function (e) {
		if (sizeType != 1) {
			if (!$(this).hasClass('gNav01__item--toggle--on')) {
				$(this).addClass('gNav01__item--toggle--on');
				$(this).find('ul').slideDown();
			} else {
				$(this).find('ul').slideUp();
				$(this).removeClass('gNav01__item--toggle--on');
			}
			e.preventDefault();
			$('.gNav02').on('click', function (e) {
				e.stopPropagation();
			});
		}
	});

	// SP時の閉じるボタン
	$('.gNavClose').stop().on('click', function () {
		glovalArea.slideUp(400, 'easeInOutCubic');
		navBtn.removeClass('navBtn--on');
	});
});


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
			if (documentH - btnPos <= footerH - 60 && sizeType === 1) {
				$('.pagetop').css({
					'position': 'absolute',
					'bottom': footerH - 30
				});
			} else {
				$('.pagetop').css({
					'position': 'fixed',
					'bottom': 30
				});
			}
		} else if (topPos <= 50) {
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

$(function () {
	//load and resize.
	$(window).bind('load resize', function () {
		widthJudge();
		scrollFadeIn();
	});
});

// アンカー処理
// -------------------------------------------------------------------
$(function () {
	//直接アクセス時のアンカーリンクの処理
	var hashData = location.hash;
	if (hashData && hashData.match(/#asa-.*/)) {
		hashData = hashData.replace(/#asa-(.*)/, '#$1')
		if ($(hashData).length > 0) {
			var timer = setTimeout(function(){
				$(window).scrollTop($(hashData).offset().top-$('.header').height());
			},300);
		}
	}

	$('a[href*="#asa-"]').each(function() {
		$(this).on("click", function(event){
			var speed = 5;
			var href = $(this).attr("href").replace(/#asa-(.*)/, '#$1');
			var target = $(href == "#" || href == "" ? 'html' : href);
			var headerHeight = $('.header').height();
			//ターゲットの座標からヘッダの高さ分引く
			var position = target.offset().top - headerHeight;
			//アニメーションを使うことでブラウザバックの挙動に対応(スムーズスクロール扱い)
			$('body,html').animate({scrollTop:position}, speed, 'swing');
			// $('body,html').scrollTop(position);
		});
	});
});
// -------------------------------------------------------------------

//新入社員の声のcookieを消す
$(function () {
	if (!location.pathname.match(/\/person\/voice/)) {
		$.removeCookie('offset',{ path: "/" });
		$.removeCookie('offset-page',{ path: "/" });
	}
});
