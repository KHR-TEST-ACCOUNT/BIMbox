$(function() {

	// multiselect
	$(".js-select2").select2({
		closeOnSelect: false,
		placeholder: "趣味を選択してください。",
		allowHtml: true,
		allowClear: true,
		tags: false
	});


	// ロード時の window size に合わせてSideNaviを表示
	$(window).on('load', function() {
		rePages();
		// 画面読み込み時にテキストエリアの高さを更新
		autoResizeHeightForTextArea($('#aboutMe'), 1);
		inLinefeed($("#privacy"));
		// multiselect
		$('.select2-selection--multiple').css('border', '0');
	});
	// window size に合わせてSideNaviを非表示
	$(window).on('resize', function() {
		rePages();
		// 画面読み込み時にテキストエリアの高さを更新
		autoResizeHeightForTextArea($('#aboutMe'), 1);
		inLinefeed($("#privacy"));
	});


	// ページの高さを決定
	function rePages() {
		var settings = $('#settings');
		var contentHeight = $('.page-content').height();
		var settingHeight = contentHeight - settings.height();
		var contentTop = settingHeight / 2;
		settings.css('top', contentTop);
	}


	//入力内容の行数によってテキストエリアの高さを変更する
	function autoResizeHeightForTextArea($textArea, minRow) {
		// 一行の高さ
		const lineHeight = parseInt($textArea.css('line-height').replace('px', ''));
		const paddingTop = parseInt($textArea.css('padding-top').replace('px', ''));
		const paddingBottom = parseInt($textArea.css('padding-bottom').replace('px', ''));
		const minHeight = minRow * lineHeight;
		// scrollHeight を高さを更新するため height に小さな数値を指定
		$textArea.height(10);
		// 反映する高さ
		let reflectHeight = $textArea[0].scrollHeight - paddingTop - paddingBottom;
		reflectHeight = reflectHeight < minHeight ? minHeight : reflectHeight;
		$textArea.height(reflectHeight);
	}
	
	
	// 要素の横幅によって改行を入れる
	function inLinefeed(element) {
		var element_width = element.innerWidth();
		var user_card = element.find('.user-card');
		
		if (642 <= element_width && element_width < 956) {
			user_card.each(function() {
				$(this).css('width', '33.333%');
			});
		} else if (397 <= element_width && element_width < 642) {
			user_card.each(function() {
				$(this).css('width', '50%');
			});
		} else if (element_width < 397) {
			user_card.each(function() {
				$(this).css('width', '100%');
			});
		} else {
			user_card.each(function() {
				$(this).css('width', '25%');
			});
		}
	}
});