
$(function() {
	// ロード時の window size に合わせてSideNaviを表示
	$(window).on('load', function() {
		$(".page-wrapper").removeClass("toggled");
		decide_msg_width();
		decide_msgBox_width();
		hyperlink_deletion();
	});
	// window size に合わせてSideNaviを非表示
	$(window).on('resize', function() {
		$(".page-wrapper").removeClass("toggled");
		decide_msg_width();
		decide_msgBox_width();
	});
	//ChatMessageの横幅を指定
	function decide_msg_width(){
		if($(window).width() < 955) {
			var msg_width = $('.messanger-list').innerWidth() * 0.7;
			$('.common-message').css('max-width', msg_width);
		}
	}
	//MessageBoxの横幅を指定
	function decide_msgBox_width(){
		if($(window).width() < 955) {
			var msg_width = $('.message-box').outerWidth() -  $('.file-upload').outerWidth();
			$('.common-message').css('max-width', msg_width);
		}
	}
	//　ChatUserのハイパーリンクを削除
	function hyperlink_deletion(){
		var selectio_id = $('.selection-id');
		var display_id = $('#display-id').val();
		selectio_id.each(function() {
			if($(this).val() == display_id) {
				var chats_content = $(this).parents('.chats-list');
				var link = $(this).nextAll('.chat-reception');
				chats_content.css('background-color','#e9e9e9')
				link.css('pointer-events', 'none');
			}
		});
	}
});


// 表示切り替えボタンの表示
$(document).ready(function() {
	$(".js-chat-button, .js-back").on("click", function() {
		var selection_id = $(this).children('.selection-id').val();
		var display_id = $('#display-id').val()
		if ( selection_id == display_id || $(this).hasClass('js-back')) {
			$(".main-grid").toggleClass("is-message-open");
		}
	});
	$(".js-side-info-button, .js-close-main-info").on("click", function() {
		$(".main-grid").toggleClass("is-main-info-open");
		$(".main-info").toggleClass("u-hide");
	});
});


// ファイルのUPLOAD
function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function(e) {
			$('.image-upload-wrap').hide();
			$('.file-upload-image').attr('src', e.target.result);
			$('.file-upload-content').show();
			$('.image-title').html(input.files[0].name);
		};
		reader.readAsDataURL(input.files[0]);
	} else {
		removeUpload();
	}
}
// ファイル削除
function removeUpload() {
	$('.file-upload-content').hide();
	$('.image-upload-wrap').show();
	$('.file-upload-image').attr('src', '');
}
// ドラッグ時処理
$('.image-upload-wrap').bind('dragover', function() {
	$('.image-upload-wrap').addClass('image-dropping');
});
// ドロップ時処理
$('.image-upload-wrap').bind('dragleave', function() {
	$('.image-upload-wrap').removeClass('image-dropping');
});
