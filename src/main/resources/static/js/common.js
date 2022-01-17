$(function() {

	/* Side Nav */
	$(".sidebar-dropdown > a").click(function() {
		$(".sidebar-submenu").slideUp(200);
		if ( 
			$(this)
				.parent()
				.hasClass("active")
		) {
			$(".sidebar-dropdown").removeClass("active");
			$(this)
				.parent()
				.removeClass("active");
		} else {
			$(".sidebar-dropdown").removeClass("active");
			$(this)
				.next(".sidebar-submenu")
				.slideDown(200);
			$(this)
				.parent()
				.addClass("active");
		}
	});

	// closeボタン押下
	$("#close-sidebar").click(function() {
		$(".page-wrapper").removeClass("toggled");
	});

	// Showボタン押下
	$("#show-sidebar").click(function() {
		$(".page-wrapper").addClass("toggled");
	});

	// window size に合わせてSideNaviを表示
	$(window).on('resize', function() {
		toggled();
	});
	
	// ロード時の window size に合わせてSideNaviを表示
	$(window).on('load', function() {
		toggled();
	});
	
	// 表示非表示を設定
	function toggled() {
		var windowSize = $(window).width();
		if (windowSize < 768) {
			$(".page-wrapper").removeClass("toggled");
		}
		if (windowSize >= 768) {
			$(".page-wrapper").addClass("toggled");
		}
	}
});


//textareaの高さを自動で合わせる
$(document).on("change", "textarea", function(event) {
	var min_height = 28; //テキストエリアの最小の高さをお好みで設定
	// if($(this).hasClass('h-100')) $(this).removeClass('h-100');
	$(evt.target).height(min_height); //一旦最小サイズにする
	$(evt.target).height(event.target.scrollHeight - 10); //スクロールなしでテキストが収まる最小の高さに上書き
});

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
	
	// HTMLを読み込んだ際の処理
	$(document).ready(function() {
		// UserRegistrationの読み込み時
		if(window.location.href.match("UserRegistration.html")){
			isProfEdPermission();
		}
	});
	
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
