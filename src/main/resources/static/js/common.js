
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
//showBtnクラスのついた要素の位置情報を取得して変数showに入れる
var show = $(".showBtn").offset();

$(function() {
    //画面をスクロールしたとき
    $(window).scroll(function() {
      //スクロールした量より変数showのトップからの高さの方が小さい場合
      if($(this).scrollTop() > show.top) {
         doOverlay($(".showBtn"));
        //それ以外の場合
      } else {
        //ボタンをフェードアウトさせる
        $('#topBtn').fadeOut();
      }
    });
});
 */



$(document).ready(function() {
  doOverlay($(".animsition-overlay"));
});

// Overlayアニメーション
function doOverlay(doAnimation){
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
    browser: [ 'animation-duration', '-webkit-animation-duration'],
    overlay : true,
    overlayClass : 'animsition-overlay-slide',
    overlayParentElement : 'body',
    transition: function(url){ window.location.href = url; }
  });
}


// フェードインアニメーション
$(document).ready(function() {
	fadeInAnimation();
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
    browser: [ 'animation-duration', '-webkit-animation-duration'],
    // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
    // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
    // ブラウザが配列内のCSSプロパティをサポートしていない場合、アニメーションを中止します。デフォルトは「animation-duration」をサポートしていない場合です。
    overlay : false, // オーバーレイの有効/無効
    overlayClass : 'animsition-overlay-slide', // オーバーレイのクラス
    overlayParentElement : 'body', // オーバーレイ要素のラッパー
    transition: function(url){ window.location.href = url; } // transition後にどこに遷移させるかを設定、urlは「linkElement」のhref
  });
}

/**
$(document).ready(function() {
	var $table = $('table');
	if ($table) {
		$table.floatThead({
			top: 50,
			position: 'fixed',
			responsiveContainer: function($table) {
				return $table.closest('.table-responsive');
			}
		});
	}
});
 */


function isSureMsg() {
	// 削除を押下したとき
	const promise = new Promise((resolve, reject) => {
		
		// 削除確認アラート
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success',
				cancelButton: 'btn btn-danger'
			},
			buttonsStyling: false
		})
		swalWithBootstrapButtons.fire({
			title: '本当に削除しますか?',
			text: '',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: '削除します',
			cancelButtonText: 'キャンセル',
			reverseButtons: true
		}).then((result) => {
			// 削除実行
			if (result.isConfirmed) {
				swalWithBootstrapButtons.fire(
					'正常に削除しました',
					'',
					'success'
				)
				isDelete = true;
			} else if (result.dismiss === Swal.DismissReason.cancel) {
				// キャンセル処理
				swalWithBootstrapButtons.fire(
					'キャンセルしました',
					'',
					'error'
				)
				isDelete = false;
			}
		})
		resolve(isDelete);
	});
	return promise;
}



/**----------- pluginの共通ロジック END -------------- */



var setAddress = function(pref, city) {
	$('#pref').val(pref);
	$('#city').val(city);
}



/**
jQuery(document).ready(function(){
    jQuery.goup();
});

$.goup({
  location: "left",
  locationOffset: 400,
  bottomOffset: 400
});
 */


var callbackFunction = function(data) {
	if (data.results == null) {
		alert('該当の住所が見つかりませんでした。');
		return;
	}
	var result = data.results[0];
	pref = result.address1;
	city = result.address2 + result.address3;

	setAddress(pref, city);
}


$(function() {
	$('#condition-toggler').click(function(e) {
		$(this).find('span').each(function(index, element) {
			$(element).toggleClass('d-none');
		});
		e.preventDefault();
	});
});
/**
// トグル
 */

/**
$("#login-button").click(function(event){
	 event.preventDefault();
   
   $('form').fadeOut(500);
   $('.wrapper').addClass('form-success');
});
 */

$(function() {
	$("#wkSelect").multiselect();
});
	
$(function() {
	/* 変数 lists に #list li を格納 */
	var lists = $(".post");
	/**
	$(".topic").animation({opacity:1}, 200);
	lists[0].animation({opacity:1}, 200);
	 */
	/* lists を一つずつ処理 */
	lists.each(function(i){
		/* delay() で animate（）の実行を 200ミリ秒ずつ遅延 */
		$(this).delay(200*i).animation({opacity: 1});
	});
});
	
// ページ内スクロール
$(function(){
// 全てのアンカータグを対象にする
	$('a').click(function(e){
		var anchor = $(this);
		href = anchor.attr('href');
		pagename = window.location.href;
		// 現在のurlのハッシュ以降を削除
		pagename = pagename.replace(/#.*/,'');
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

/**
$(function(){
	$('a[href^="#"]').click(function () {
		let speed = 600;
		let headerHight = $('header').html().height();
		let href = $(this).attr("href");
		let target = $(href == "#" || href == "" ? "html" : href);
		let position = target.offset().top - headerHight;
		$("body,html").animate({ scrollTop: position }, speed, "swing");
		return false;
	});
});

 */
// アコーディオンメニュー
$(function(){
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
				if (isDeleted)  {
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


	// HTMLを読み込んだ際の処理
	$(document).ready(function() {

		// UserProfileの読み込み時
		if(window.location.href.match("UserProfile.html")){
			setProfileDefault();
		}
		// UserRegistrationの読み込み時
		if(window.location.href.match("UserRegistration.html")){
			isProfEdPermission();
		}
	});
	
	
	// UserProfileのデフォルトの画面表示を設定する。
	function setProfileDefault() {
		$('#wkSelect').multiselect({
			checkAllText: '全て選択',
			uncheckAllText: '全て選択解除',
			noneSelectedText: '選択してください',
			selectedText: '# 個選択',
		});
		// $("#wkSelect").multiselect();
		// $("#id").dropdownchecklist( {width: 200 } );
	}

	// UserRegistrationのデフォルトの画面表示を設定する。
	function isProfEdPermission() {
		fadeinAnimation();
		switch ($("#loginUserRoles").val()) {
			case "01":
				$('select[name="roles"] option[value="02"]').prop('disabled', true);
	    		$('select[name="roles"] option[value="03"]').prop('disabled', true);
	    		$('#userDelete').prop('disabled', true);
				break;
			case "02":
	    		$('select[name="roles"] option[value="03"]').prop('disabled', true);
				break;
		}
	}

	// UserRegistrationのデフォルトの画面表示を設定する。
	function fadeinAnimation() {
	    var topBtn = $('.fadein');    
	    topBtn.hide();
	    //スクロールが100に達したらボタン表示
	    $(window).scroll(function () {
	        if ($(this).scrollTop() > 100) {
	            topBtn.fadeIn();
	        } else {
	            topBtn.fadeOut();
	        }
	    });
	    //スクロールしてトップ
	    topBtn.click(function () {
	        $('body,html').animate({
	            scrollTop: 0
	        }, 500);
	        return false;
		});
	}

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

	// 郵便番号検索
	$(document).on('click', '#search-address', function() {
		var baseURL = 'https://zipcloud.ibsnet.co.jp/api/search';
		var zip = $('#zipcode').val();

		// 郵便番号未入力チェック
		if (zip == null || zip.length != 7) {
			alert('郵便番号は7桁で入力してください。');
		}

		// Ajaxでzipcloudへアクセス
		$.ajax({
			type: 'GET',
			url: baseURL,
			dataType: 'jsonp',
			jsonp: callbackFunction,
			data: {
				zipcode: zip,
				callback: 'callbackFunction'
			}
		});
	});
	
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