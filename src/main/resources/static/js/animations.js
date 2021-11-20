
/**----------- 定数 -------------- */
var isDelete;
/**
	// オーバーレイ対象要素
	var overlayElement = $(".overlay");
	// フェードイン対象要素
	var fadeInElement = $(".fadeIn");
	// スクロール時に表示する要素
	var displayElement = $(".displayElement");
	var elementsPosition = displayElement.offset();
 */


/**----------- pluginの共通ロジック START -------------- */
// $("body").addClass(animsition);

/**
//fadeUpAnimationクラスのついた要素の位置情報を取得して変数showに入れる
$(function() {
	//画面をスクロールしたとき
	$(window).scroll(function() {
		var fadeUp = $(".fadeUpAnimation");
		//スクロールした量より変数showのトップからの高さの方が小さい場合
		if ($(this).scrollTop() > fadeUp.offset().top) {
			fadeUpAnimation();
			//それ以外の場合
		} else {
			//ボタンをフェードアウトさせる
			fadeUp.fadeOut();
		}
	});
});
 */


// フェードインアニメーション
$(document).ready(function() {
	fadeInAnimation();
});


$(document).ready(function() {
	doOverlay($(".animsition-overlay"));
});



// フェードインアニメーション
function fadeInAnimation() {
	$(".animsition").animsition({
		inClass: 'fade-in', // ロード時のエフェクト
		outClass: 'fade-out', // 離脱時のエフェクト
		inDuration: 1500, // ロード時の演出時間
		outDuration: 800, // 離脱時の演出時間
		linkElement: '.animsition-link', // アニメーションを行う要素
		// e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
		loading: true, // ローディングの有効/無効
		loadingParentElement: 'body', // ローディング要素のラッパー
		loadingClass: 'animsition-loading', // ローディングのクラス
		loadingInner: '', // e.g '' ローディングの内容
		timeout: false, // 一定時間が経ったらアニメーションをキャンセルの有効/無効
		timeoutCountdown: 5000, // アニメーションをキャンセルするまでの時間
		onLoadEvent: true, // onLoadイベント後にアニメーションをするかの有効/無効
		browser: ['animation-duration', '-webkit-animation-duration'],
		// ブラウザが配列内のCSSプロパティをサポートしていない場合、アニメーションを中止します。デフォルトは「animation-duration」をサポートしていない場合です。
		overlay: false, // オーバーレイの有効/無効
		overlayClass: 'animsition-overlay-slide', // オーバーレイのクラス
		overlayParentElement: 'body', // オーバーレイ要素のラッパー
		transition: function(url) { window.location.href = url; } // transition後にどこに遷移させるかを設定、urlは「linkElement」のhref
	});
}


// 要素のフェードアップアニメーション
function fadeUpAnimation() {
	$(".fadeUpAnimation").animsition({
		inClass: 'fade-in-up',
		outClass: 'fade-out-up',
		inDuration: 2500,
		outDuration: 800,
		linkElement: '.animsition-link',
		// e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
		loading: true,
		loadingParentElement: 'body', //animsition wrapper element
		loadingClass: 'animsition-loading',
		loadingInner: '', // e.g '<img src="loading.svg" />'
		timeout: false,
		timeoutCountdown: 5000,
		onLoadEvent: true,
		browser: ['animation-duration', '-webkit-animation-duration'],
		// "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
		// The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
		overlay: false,
		overlayClass: 'animsition-overlay-slide',
		overlayParentElement: 'body',
		transition: function(url) { window.location.href = url; }
	});
}


// Overlayアニメーション
function doOverlay(doAnimation) {
	doAnimation.animsition({
		inClass: 'overlay-slide-in-top',
		outClass: 'overlay-slide-out-top',
		inDuration: 1500,
		outDuration: 800,
		linkElement: '.animsition-link',
		loading: true,
		loadingParentElement: 'body', //animsition wrapper element
		loadingClass: 'animsition-loading',
		loadingInner: '', // e.g '<img src="loading.svg" />'
		timeout: false,
		timeoutCountdown: 5000,
		onLoadEvent: true,
		browser: ['animation-duration', '-webkit-animation-duration'],
		overlay: true,
		overlayClass: 'animsition-overlay-slide',
		overlayParentElement: 'body',
		transition: function(url) { window.location.href = url; }
	});
}


// topicアニメーション
$(function() {
	/* 変数 lists に #list li を格納 */
	var lists = $(".post");
	/**
	$(".topic").animation({opacity:1}, 200);
	lists[0].animation({opacity:1}, 200);
	 */
	/* lists を一つずつ処理 */
	lists.each(function(i) {
		/* delay() で animate（）の実行を 200ミリ秒ずつ遅延 */
		$(this).delay(200 * i).animation({ opacity: 1 });
	});
});


/**
// ページ内スクロール
$(function(){
// 全てのアンカータグを対象にする
	$('a').click(function(e){
		var anchor = $(this);
		href = anchor.attr('href');
		pagename = window.location.href;
		// 現在のurlのハッシュ以降を削除
		
 */
// pagename = pagename.replace(/#.*/,'');
/**
		// リンク先のurlから現在の表示中のurlを削除
		href = href.replace( pagename , '' );
		if( href.search(/^#/) >= 0 ){
			// 整形したリンクがページ内リンクの場合はページ無いスクロールの対象とする
			// 通常の遷移処理をキャンセル
			e.preventDefault();
			var speed = 500;
			// 前段階で整形したhrefを使用する
			// var href= $(this).attr("href");
			var target = $(href == "#" || href == "" ? 'html' : href);
			var position = target.offset().top;
			$("html, body").animate({scrollTop:position}, speed, "swing");
			// ロケーションバーの内容を書き換え
			location.hash = href ;
			return false;
		}
	});
});
 */


// アコーディオンメニュー
$(function() {
	$("#acMenu dt").on("click", function() {
		$(this).next().slideToggle();
		$(this).toggleClass("active");
	});
});


$(function() {

	// レイアウト調整	
	$('textarea.readonly').each(function(index, element) {
		$(element).height(0).innerHeight(element.scrollHeight);
	});
	$(document).on('input', 'textarea', function() {
		$(this).height(0).innerHeight(this.scrollHeight);
	})

	// CollapseのToggler設定
	$(document).on('click', '*[data-bs-toggle="collapse"]', function(e) {
		e.preventDefault();
		$(this).find('span').toggleClass('d-none');
	})

	// サイドナビゲーション
	$(document).on('click', '.sidenav-toggler, .cover', function() {
		$('.sidenav').toggleClass('visible');
		$('.cover').toggleClass('visible');
	});

	/**
	 */
	// ユーザー情報削除を押下した際にFromのAction属性を変更する
	$('#userDelete').click(function() {
		dddd();
	});


	async function dddd() {
		const isDeleted = await isSureMsg();
		await isDoDelete(isDeleted);
	}


	function isDoDelete(isDeleted) {
		const promise2 = new Promise((resolve, reject) => {
			// isDelete isDeleted
			isDeleted = false
			setTimeout(() => {
				if (isDeleted) {
					(this).parents('form').attr('action', $(this).data('action'));
					$(this).parents('form').submit();
				} else {
					return false;
				}
				resolve();
			}, 30000)
		});
		return promise2;
	}



	/**
	
	async function helloWorld() {
		const promise = new Promise((resolve, reject) => resolve());
		const hw = await promise;
		console.log(hw); // hello, world!
	}

	helloWorld();
	
	
function openFile(url) {
	const p = new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.addEventListener('load', (e) => resolve(xhr));
		xhr.send();
	});
    
	return p;
}

async function loadAllFiles() {
	const xhr1 = await openFile('foo.txt');
	const xhr2 = await openFile('bar.txt');
	const xhr3 = await openFile('baz.txt');
	console.log('done!');
}

loadAllFiles();
	 */


	/**
	//フェードイン
	$("#topic div").on("click", function() {
		$(this).next().slideToggle();
		$(this).toggleClass("active");//追加部分
	});

	$(".topic").click(function () {
	  $(".post").next().slideToggle();
	  $(".post").toggleClass("active");//追加部分
	});
	 */

});


// 画像ファイルのサムネイル取得
$(document).on('change', '#photo-file', function() {
	var file = $(this).prop('files')[0];
	// 画像以外は処理を停止
	if (!file.type.match('image.*')) {
		// クリア
		$(this).val('');
		alert('画像ファイルを選択してください。');
		return;
	}
	readerOnLoad(file);
	var file = $(this).prop('files')[0];
	// 画像以外は処理を停止
	if (!file.type.match('image.*')) {
		// クリア
		$(this).val('');
		alert('画像ファイルを選択してください。');
		return;
	}

	var reader = new FileReader();
	reader.onload = function() {
		$('#thumbnail').attr('src', reader.result);
	}
	reader.readAsDataURL(file);
});

// 画像表示
function readerOnLoad(file) {
	var reader = new FileReader();
	reader.onload = function() {
		$('#thumbnail').attr('src', reader.result);
	}
	reader.readAsDataURL(file);
}

/**

	// ドラッグ＆ドロップイベントをハンドル
	$("#thumbnail").on('dragenter', function(e) {
		e.stopPropagation();
		e.preventDefault();
	});
	$("#thumbnail").on('dragover', function(e) {
		e.stopPropagation();
		e.preventDefault();
	});
	$("#thumbnail").on('drop', function(e) {
		e.preventDefault();
		handleFiles(e.originalEvent.dataTransfer.files);
	});
	// ファイルがdivの外でドロップされブラウザで開かないよう、documentの「ドロップ」イベントを防ぐ。
	$(document).on('dragenter', function(e) {
		e.stopPropagation();
		e.preventDefault();
	});
	$(document).on('dragover', function(e) {
		e.stopPropagation();
		e.preventDefault();
	});
	$(document).on('drop', function(e) {
		e.stopPropagation();
		e.preventDefault();
	});


	// ファイルがドロップされた時にファイルの中身を読み込む。
	function handleFiles(files) {

		var file = $('#photo-file').prop('files')[0];
		// 画像以外は処理を停止
		if (!file.type.match('image.*')) {
			// クリア
			$(this).val('');
			alert('画像ファイルを選択してください。');
			return;
		}

		// 画像表示
		var reader = new FileReader();
		reader.onload = function() {
			$('#thumbnail').attr('src', reader.result);
		}
		reader.readAsDataURL(file);

		var file = files[0];

		// ファイルが画像が確認する
		if (!file.type.match('image.*')) {
			alert('画像を選択してください');
			return;
		}

		var img = document.createElement('img');  // <img>をつくります
		var reader = new FileReader();

		reader.onload = function() {  // 読み込みが完了したら
			img.src = reader.result;  // readAsDataURLの読み込み結果がresult
			$('#thumbnail').append(img);  // preview_filedに画像を表示
		}

		reader.readAsDataURL(file); // ファイル読み込みを非同期でバックグラウンドで開始
	}
	*/