
// layout
$(function() {
	
	// 読み込み時にPostの高さを決定する
	$(document).ready(function() {
		decide_topics_height();
		change_addImg_text();
	});
	
	$(window).on('resize', function() {
		decide_topics_height();
		change_addImg_text();
	});
	
	// accordion
	$(document).on("click", ".link", function() {
		accodion_do($(this))
		setTimeout(function() {
			decide_topics_height()
			},
			450
		);		
	});
	
	// Accodeionの開閉ロジック
	function accodion_do(e){
		var parent = e.closest('.ac-parent');
		parent.nextAll('.ac-child').slideToggle();
		parent.toggleClass("open");
		$('.ac-parent').not(parent).removeClass('open');
		$('.ac-parent').not(parent).nextAll('.ac-child').slideUp();
	}
	
	// 画像投稿エリアの文字を変更する
	function change_addImg_text(){
		var content_width = $('.two').innerWidth();
		var addImgBox_text = $('.drag-text');
		if(content_width < 664){
			addImgBox_text.each(function (){
				$(this).html('<h3>Drag and drop or Click.</h3>');
			})
		} else {
			addImgBox_text.each(function (){
				$(this).html('<h3>Drag and drop or Click to add image.</h3>');
			})
		}
	}
	
	//　Postの高さを決定する
	function decide_topics_height(){
		var column_height = $(window).height() - 40;
		var sc_height = $('.search-container').outerHeight(true);
		var mc_height = $('.moodle-container').outerHeight(true);
		var search_box = $('.search-content');
		var topics_height = column_height - (sc_height + mc_height)
		$('.topics').outerHeight(topics_height);
		if(search_box.innerWidth() < 398){
			search_box.attr('placeholder', 'by topic, user, post.');
		} else {
			search_box.attr('placeholder', 'ユーザー名、トピック名、投稿内容 を検索できます。');
		}
	}
	
})


$(function() {
	/**
	 */
	// ファイルのUPLOAD
	$(document).on("change", ".file-upload-input", function() {
		var input = $(this);
		var this_file = input.parents('.file-upload');
		if (input.prop('files') && input.prop('files')[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				this_file.find('.image-upload-wrap').hide();
				this_file.find('.file-upload-image').attr('src', e.target.result);
				this_file.find('.file-upload-content').show();
				this_file.find('.image-title').html(input.prop('files')[0].name);
			};
			reader.readAsDataURL(input.prop('files')[0]);
		} else {
			this_file.find('.remove-image').trigger('click');
			this_file.find('.image-upload-wrap').trigger('dragleave'); 
		}
	});
	
	// ファイル削除
	$(document).on("click", ".remove-image", function() {
		var this_img = $(this).parents('.file-upload');
		this_img.find('.file-upload-content').hide();
		this_img.find('.image-upload-wrap').show();
		this_img.find('.file-upload-image').attr('src', '');
		this_img.find('.image-upload-wrap').trigger('dragleave'); 
	});
	
	// ドラッグ時処理
	$('.image-upload-wrap').bind('dragover', function() {
		$(this).addClass('image-dropping');
	});
	
	// ドロップ時処理
	$('.image-upload-wrap').bind('dragleave', function() {
		$(this).removeClass('image-dropping');
	});
	
});

	
// コメントとドロップダウンの非表示処理
$(function() {
	$(document).ready(function() {
		var comment_list = $('.comment');
	});
});
	

// コメントボックスの開閉
$(function() {
	// 開く
	$(document).on("click", ".comment", function() {
		var comment_box = $(this).parent().nextAll('.comment-box');
		if(comment_box.hasClass('open')){
			comment_box.css('display', 'none');
			comment_box.removeClass('open');
		} else {
			comment_box.css('display', 'block');
			comment_box.addClass('open');
		}
	});
});
	
	
// tooltip
$(function() {
	$('[data-toggle="tooltip"]').tooltip();
});
	
	
	
	
// 非同期通信処理
$(function() {

	$(document).ajaxSend(function(e, xhr, options) {
		let token = $("meta[name='_csrf']").attr("content");
		let header = $("meta[name='_csrf_header']").attr("content");
		xhr.setRequestHeader(header, token);
	});

	
	// コメント投稿時の非同期通信処理
	$(document).on('click', '#ajaxForm .comment-button', function(event) {

		let ajaxForm = $(this).parents("#ajaxForm");
		let paramTopicNo = ajaxForm.find('#topicNo').val();
		let paramSubject = ajaxForm.find('#subject').val();
		let paramPostText = ajaxForm.find('#postText').val();
		let paramPostImg = ajaxForm.find('img').attr('src');
		/**
		let uploadFile = ajaxForm.find('#uploadFile');
		let uploadFile = ajaxForm.find('#uploadFile').val();
		 */

		$.ajax({
			type: ajaxForm.attr('method'),
			url: ajaxForm.attr('action'),
			dataType: 'html',
			data: {
				topicNo: paramTopicNo,
				subject: paramSubject,
				primaryPost: paramPostText,
				postImgEncodeString: paramPostImg
				/**
				uploadFile: uploadFile
				primaryPostImg: paramPostImg
				 */
			}
		}).done((data) => {
			let targetId = '#' + paramTopicNo;
			$(targetId).html(data);
			let accordion = $(targetId).find('.ac-parent');
			accordion.addClass('open');
			accordion.nextAll('.ac-child').css('display', 'block');
		});
		event.preventDefault();
	});


	// Post評価時の非同期通信処理
	$(document).on('click', 'button.ajax-link', function() {
		let parent = $(this).parents('#ratingForm');
		let paramTopicNo = parent.find('input[name="topicNo"]').val();
		let paramPostNo = parent.find('input[name="postNo"]').val();
		let paramRating = $(this).data('ts-param');
		$.ajax({
			type: parent.attr('method'),
			url: parent.attr('action'),
			dataType: 'html',
			data: {
				topicNo: paramTopicNo,
				postNo: paramPostNo,
				rating: paramRating
			}
		}).done((data) => {
			let targetId = '#' + paramTopicNo;
			$(targetId).html(data);
		});
	});


	// コメント編集を押下した際の表示・非表示処理
	$(document).on('click', '#postEdit', function() {
		let target = $(this).data('ts-target');
		let parent = $(this).parents('#ratingForm');
		let postText = parent.find('textarea[name="postText"]');
		let postUpLoadArea = parent.find(target + '.edit-image');
		let postButtons = parent.find(target + '.edit-buttons');
		// 表示・非表示 を切り替え
		postText.toggleClass('readonly').toggleClass('p-0 h-100');
		postUpLoadArea.toggleClass('d-none');
		postButtons.toggleClass('d-none');
		// 画像の表示・非表示 を切り替え
		var postImg = postText.next().find('img');
		if(postImg.attr('src') != '') {
			postImg.closest('.postImgArea').hide();
			postUpLoadArea.find('.image-upload-wrap').hide();
			postUpLoadArea.find('.file-upload-image').attr('src', postImg.attr('src'));
			postUpLoadArea.find('.file-upload-content').show();
			postUpLoadArea.find('.image-title').html(' 画像を削除');
		}
		// readonly を切り替え
		if (postText.attr('readonly')) {
			postText.removeAttr('readonly');
		} else {
			postText.attr('readonly', 'readonly');
		}
	});


	// Post編集時の非同期通信処理
	$(document).on('click', '#textEdit', function() {
		let parent = $(this).parents('#ratingForm');
		let paramPostImg = parent.find('.file-upload').find('img').attr('src')
		let paramPostText = parent.find('#postText').val();
		let paramTopicNo = parent.find('input[name="topicNo"]').val();
		let paramPostNo = parent.find('input[name="postNo"]').val();
		
		$.ajax({
			type: parent.attr('method'),
			url: '/comms/EditPost.do',
			dataType: 'html',
			data: {
				postText: paramPostText,
				postImg: paramPostImg,
				topicNo: paramTopicNo,
				postNo: paramPostNo
			}
		}).done((data) => {
			let targetId = '#' + paramTopicNo;
			$(targetId).html(data);
			let accordion = $(targetId).find('.ac-parent');
			accordion.addClass('open');
			accordion.nextAll('.ac-child').css('display', 'block');
			/**
			$('.ac-parent').not(accordion).nextAll('.ac-child').css('display', 'block');
			$('.ac-parent').not(accordion).nextAll('.ac-child').slideUp();
			let targetId = '#' + paramTopicNo + paramPostNo;
			let hoge = $(targetId).prev().find('textarea');
			hoge.html(paramPostText);
			hoge.addClass('readonly p-0');
			 */
		});
	});
	

	// Post削除時の非同期通信処理
	$(document).on('click', '#textDelete', function() {
		if (!confirm('本当にこの投稿を削除しますか？')) {
			return false;
		} else {
			let parent = $(this).parents('#ratingForm');
			let paramPostText = parent.find('#postText').val();
			let paramTopicNo = parent.find('input[name="topicNo"]').val();
			let paramPostNo = parent.find('input[name="postNo"]').val();
			$.ajax({
				type: parent.attr('method'),
				url: '/comms/DeletePost.do',
				dataType: 'html',
				data: {
					topicNo: paramTopicNo,
					postNo: paramPostNo
				}
			}).done((data) => {
				let targetId = '#' + paramTopicNo;
				$(targetId).html(data);
			});
		}
	});


	// Topic削除時の非同期通信処理
	$(document).on('click', '#deleteForm button', function() {
		if (!confirm('本当にこのトピックを削除しますか？')) {
			return false;
		} else {
			let parent = $(this).parents('#deleteForm');
			let paramTopicNo = parent.find('input[name="topicNo"]').val();
			$.ajax({
				type: parent.attr('method'),
				url: parent.attr('action'),
				dataType: 'html',
				data: {
					topicNo: paramTopicNo,
				}
			}).done((data) => {
				let targetId = '#' + paramTopicNo;
				$(targetId).html(data);
			});
		}
	});

});
