// ===================================================================
// トップ
// ===================================================================

var loadedVideo = false;
var playedVideo = false;

// movie
// -------------------------------------------------------------------

$(function(){

	widthJudge();
	videoReplace();

	var winH = $(window).outerHeight();
	$('.topWrapper').hide();

	$(window).load(function () { //全ての読み込みが完了したら実行
		//ローディングを初回アクセス時のみに変更
		if ($.cookie('loading') == 1) {
			$('.loadScreen').hide();
			$('.topWrapper').fadeIn(450);
			videoPlay();
			spSlide();
		} else {
			$('.subLogo').addClass('subLogo--on');
			$('.loadScreen__inner').delay(2100).fadeOut(300);
			$('.loadScreen').addClass('loadScreen--in');
			$('.loadScreen').delay(2300).animate({height:'hide'}, 600, 'easeInOutExpo', function(){
				videoPlay();
				$('.loadScreen').hide();
				$('.topWrapper').fadeIn(450);
				spSlide();
				var date = new Date();
				date.setTime(date.getTime() + (1 * 60 * 60 * 1000));
				$.cookie('loading', 1, { expires: date }); //有効期限1時間
			});
		}
	});
});

// skip
// -------------------------------------------------------------------

$(function(){
	widthJudge();
	$('.videoArea__scroll a,.topics__scroll a').click(function() {
		var speed = 1000; // ミリ秒
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		if (sizeType == 2) {
			//SPのとき
			$('body,html').animate({scrollTop:(position - 59)}, speed, 'easeInOutCubic');
		} else {
			//PCのとき
			$('body,html').animate({scrollTop:(position - 74)}, speed, 'easeInOutCubic');
		}
		return false;
	});
});


// SPメインスライダー
// -------------------------------------------------------------------

var spSlide = function () {
	var flag = '';
	var slideItem = '.spSlide li';// スライドする要素
	var delayTime = 4000;// スライダの切り替わる時間
	var slideCurrent = 0;// 現在のスライド数
	var total = $(slideItem).length - 1;// スライダーの数
	var innerH = window.innerHeight;
	$('.spSlide, .spSlide__item').css({ height: innerH - 60 });
	// 一定時間ごとに自動切り替え
	var flgStop = false;
	var slideInterval;
	$(slideItem).css({opacity:0});
	function autoChange () {
		var sliderMove = function () {
			$(slideItem).animate({opacity:0},{ dulation:500, queue: false});
			$(slideItem).eq(slideCurrent).animate({opacity:1},{ dulation:500, queue: false});
		};
		slideInterval = setInterval(function(){
			if(slideCurrent < total){
				slideCurrent++;
				sliderMove();
			} else if(slideCurrent == total) {
				slideCurrent = 0;
				sliderMove();
			}
		}, delayTime);
	}

	function widthCheck() {
		var winWidth = $(window).innerWidth();
		if (winWidth <= 768 && flag != 'sp') {
			$('.spSlide').find('li').eq(0).css({opacity:1});
			flag = 'sp';
			autoChange();
		} else if (winWidth > 768 && flag != 'pc') {
			slideCurrent = 0;
			flag = 'pc';
			clearInterval(slideInterval);
		}
	}

	widthCheck();

	$(window).bind('load resize', function () {
		widthCheck();
		videoReplace();
		videoPlay();
	});

};

//ビデオタグのチェック用
function videoReplace() {
	if (sizeType != 2) { //スマホのとき以外この処理を走らせる
		if ($("#video").find("source").attr("src") !== "" && loadedVideo === false&&$("#video").length>=1) {
			//ここでソースの書き換え
			$("#video").find("source").attr("src",$("#video").find("source").attr("data-src"));
			$("#video").find("source").removeAttr("data-src");
			var video = $('#video').get(0);
			video.autoplay = true;
			video.loop = true;
			video.muted = true;

			loadedVideo = true;
		}
	}
}

function videoPlay() {
	if (typeof $("#video").find("source").attr("src") !== 'undefined' && playedVideo === false) {
		var video = $('#video').get(0);
		video.load();
		video.play();
		playedVideo = true;
	}
}
