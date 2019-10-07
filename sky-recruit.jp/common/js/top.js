// ===================================================================
// トップ
// ===================================================================

var loadedVideo = false;
var loadedVideoSp = false;
// var playedVideo = false;

// 動画のパス設定
var movieSP = "video/top_video_SP.mp4";
var moviePC = "video/top_video_PC.mp4";

// movie
// -------------------------------------------------------------------

//document ready
$(function(){
	widthJudge();
	videoReplace(fadeLogo);
});

$(window).bind('resize', function () { //リサイズのときのみ
	videoReplace(fadeLogo);
});

function fadeLogo(value) {

	var ua;
	ua = navigator.userAgent;

	$('.mv__inner__logo > img').on('animationend', function() {
		$('.mv__inner__logo').delay(1000).fadeOut(1000);

		if (ua.match(/SecuredBrowser/i)) {
			//Sブラウザだけ背景表示
			$('#video').addClass('mvBG');
		}

		// $('#video').css({ 'background': 'red'});
		// alert('a');
		// $('.mv__inner__logo').delay(2000).animate({ 'opacity': 0 }, 1000).queue(function () {
			// $(this).fadeOut("slow");
		// });
	});
}

//ビデオタグのチェック用
function videoReplace(callback) {

	//渡された引数が関数でなければメッセージを出して関数終了
	if (typeof callback !== "function") {
		console.log("callback is not function");
		return;
	}

	var video = $('#video').get(0);

	if (sizeType == 1) { //PC

		if (loadedVideo === false && $("#video").length >= 1) {
			video.pause();
			$("#video").find("source").attr("src", moviePC);

			video.autoplay = true;
			video.loop = true;
			video.muted = true;
			video.playsinline = true;

			video.load();
			video.play();
			loadedVideo = true;
			loadedVideoSp = false;

		}

	}

	if (sizeType == 2) {
		if (loadedVideoSp === false && $("#video").length >= 1) {
			video.pause();
			$("#video").find("source").attr("src", movieSP);

			video.autoplay = true;
			video.loop = true;
			video.muted = true;
			video.playsinline = true;

			video.load();
			video.play();
			loadedVideoSp = true;
			loadedVideo = false;

		}
	}
	callback();

}

// function videoPlay() {
// 	if (typeof $("#video").find("source").attr("src") !== 'undefined' && playedVideo === false) {
// 		var video = $('#video').get(0);
// 		video.load();
// 		video.play();
// 		playedVideo = true;
// 	}
// }
