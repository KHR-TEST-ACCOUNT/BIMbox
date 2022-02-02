$(function() {
	
	/* Tooltip */
	(function() {
		"use strict";
		var jQueryPlugin = (window.jQueryPlugin = function(ident, func) {
			return function(arg) {
				if (this.length > 1) {
					this.each(function() {
						var $this = $(this);

						if (!$this.data(ident)) {
							$this.data(ident, func($this, arg));
						}
					});

					return this;
				} else if (this.length === 1) {
					if (!this.data(ident)) {
						this.data(ident, func(this, arg));
					}

					return this.data(ident);
				}
			};
		});
	})();

	(function() {
		"use strict";
  var TooltipStyle =
    "<style id='aks-tooltip-style'>" +
			"[data-tooltip]{position:relative;display:inline-block}" +
			"[data-tooltip] .aks-tooltip{position:absolute;width:fit-content;min-width:fit-content;" +
				"padding:6px 10px;border-radius:5px;box-shadow:0 1em 2em -.5em rgba(0,0,0,.35);background:#020204;" +
				"opacity:0;color:#fff;font-size:13px;font-weight:400;text-align:center;text-transform:none;line-height:1;" +
				"user-select:none;pointer-events:none;visibility:hidden;z-index:1}" +
			"[data-tooltip] .aks-tooltip::after{display:inline-block;position:absolute;content:''}" +
			"[data-tooltip-location=up] .aks-tooltip{bottom:calc(100% + 10px);left:50%;" +
				"transform:translateX(-50%);animation:tooltips-vert .3s ease-out forwards}" +
			"[data-tooltip-location=up] .aks-tooltip::after{bottom:-4px;left:50%;transform:translateX(-50%);" +
				"border-top:5px solid #020204;border-right:5px solid transparent;border-left:5px solid transparent}" +
			"[data-tooltip-location=down] .aks-tooltip{top:calc(100% + 10px);left:50%;" +
				"transform:translateX(-50%);animation:tooltips-vert .3s ease-out forwards}" +
			"[data-tooltip-location=down] .aks-tooltip::after{top:-4px;left:50%;transform:translateX(-50%);" +
				"border-right:5px solid transparent;border-bottom:5px solid #020204;border-left:5px solid transparent}" +
			"[data-tooltip-location=left] .aks-tooltip{top:50%;right:calc(100% + 10px);" +
				"transform:translateY(-50%);animation:tooltips-horz .3s ease-out forwards}" +
			"[data-tooltip-location=left] .aks-tooltip::after{top:50%;right:-4px;transform:translateY(-50%);" +
				"border-top:5px solid transparent;border-bottom:5px solid transparent;border-left:5px solid #020204}" +
			"[data-tooltip-location=right] .aks-tooltip{top:50%;left:calc(100% + 10px);" +
				"transform:translateY(-50%);animation:tooltips-horz .3s ease-out forwards}" +
			"[data-tooltip-location=right] .aks-tooltip::after{top:50%;left:-4px;transform:translateY(-50%);" +
				"border-top:5px solid transparent;border-right:5px solid #020204;border-bottom:5px solid transparent}" +
			"@-moz-keyframes tooltips-vert{to{opacity:.9;transform:translate(-50%,0)}}" +
			"@-webkit-keyframes tooltips-vert{to{opacity:.9;transform:translate(-50%,0)}}" +
			"@-o-keyframes tooltips-vert{to{opacity:.9;transform:translate(-50%,0)}}" +
			"@keyframes tooltips-vert{to{opacity:.9;transform:translate(-50%,0)}}" +
			"@-moz-keyframes tooltips-horz{to{opacity:.9;transform:translate(0,-50%)}}" +
			"@-webkit-keyframes tooltips-horz{to{opacity:.9;transform:translate(0,-50%)}}" +
			"@-o-keyframes tooltips-horz{to{opacity:.9;transform:translate(0,-50%)}}" +
			"@keyframes tooltips-horz{to{opacity:.9;transform:translate(0,-50%)}}" +
		"</style>";
		$("head").append(TooltipStyle);
		
		function Tooltip($root) {
			const element = $root;
			const tooltip_el = $root.first("[data-tooltip]");
			const tooltip = $root.data("tooltip");
			element.append('<span class="aks-tooltip">' + tooltip + "</span>");
			const tooltip_container = $root.find(".aks-tooltip");

			tooltip_el.mousemove(function(event) {
				tooltip_container.css({ opacity: "1", visibility: "visible" });
			});
			tooltip_el.mouseout(function(event) {
				tooltip_container.css({ opacity: "0", visibility: "hidden" });
			});
		}

		$.fn.Tooltip = jQueryPlugin("Tooltip", Tooltip);
		$("[data-tooltip]").Tooltip();
	})();
	
	
	
	
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
