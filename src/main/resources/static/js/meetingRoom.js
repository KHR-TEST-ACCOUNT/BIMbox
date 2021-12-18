
// layout
$(function() {
	
	// 読み込み時にPostの高さを決定する
	$(document).ready(function() {
		decide_topics_height();
	});
	
	$(window).on('resize', function() {
		decide_topics_height();
	});
	
	// accordion
	$('.link').on('click', function() {
		accodion_do($(this))
		setTimeout(function() {
			decide_topics_height()
			},
			450
		);		
	});
	
	function accodion_do(e){
		var parent = e.closest('.ac-parent');
		parent.nextAll('.ac-child').slideToggle();
		parent.toggleClass("open");
		$('.ac-parent').not(parent).removeClass('open');
		$('.ac-parent').not(parent).nextAll('.ac-child').slideUp();
	}
	
	//　Postの高さを決定する
	function decide_topics_height(){
		var column_height = $(window).height() - 40;
		var sc_height = $('.search-container').outerHeight(true);
		var mc_height = $('.moodle-container').outerHeight(true);
		
		var topics_height = column_height - (sc_height + mc_height)
		$('.topics').outerHeight(topics_height);
	}
	
})


// tooltip
$(function() {
	$('[data-toggle="tooltip"]').tooltip();
});
	
	
/**
//textareaの高さを自動で合わせる
$(function() {
	$('#textarea').on('input', function() {
		if ($(this).outerHeight() > this.scrollHeight) {
			$(this).height(1)
		}
		while ($(this).outerHeight() < this.scrollHeight) {
			$(this).height($(this).height() + 1)
		}
	});
});
 */


//send options
$(function() {

	$(document).ajaxSend(function(e, xhr, options) {
		let token = $("meta[name='_csrf']").attr("content");
		let header = $("meta[name='_csrf_header']").attr("content");
		xhr.setRequestHeader(header, token);
	});

	$(document).on('click', '#ajaxForm button', function() {

		let ajaxForm = $(this).parents("#ajaxForm");
		let paramTopicNo = ajaxForm.find('#topicNo').val();
		let paramSubject = ajaxForm.find('#subject').val();
		let paramPostText = ajaxForm.find('#postText').val();
		let paramPostImg = ajaxForm.find('#paramPostImg');

		$.ajax({
			type: ajaxForm.attr('method'),
			url: ajaxForm.attr('action'),
			dataType: 'html',
			data: {
				topicNo: paramTopicNo,
				subject: paramSubject,
				primaryPost: paramPostText,
				primaryPostImg: paramPostImg.attr('src')
			}
		}).done((data) => {
			let targetId = '#' + paramTopicNo;
			$(targetId).html(data);
		});
	});

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

	$(document).on('click', '#postEdit', function() {
		let target = $(this).data('ts-target');
		let postText = $(this).parents('#ratingForm').find('textarea[name="postText"]');
		$(target).toggleClass('d-none');
		postText.toggleClass('readonly').toggleClass('p-0');
		if (postText.attr('readonly')) {
			postText.removeAttr('readonly');
		} else {
			postText.attr('readonly', 'readonly');
		}
	});

// Imageを追加する。
	$(document).on('click', '#textEdit', function() {
		let parent = $(this).parents('#ratingForm');
		let paramPostText = parent.find('#postText').val();
		let paramTopicNo = parent.find('input[name="topicNo"]').val();
		let paramPostNo = parent.find('input[name="postNo"]').val();
		$.ajax({
			type: parent.attr('method'),
			url: '/comms/EditPost.do',
			dataType: 'html',
			data: {
				postText: paramPostText,
				topicNo: paramTopicNo,
				postNo: paramPostNo
			}
		}).done((data) => {
			let targetId = '#' + paramTopicNo;
			$(targetId).html(data);
		});
	});

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


// 画像のアップロード
$(document).ready(function() {
	var view_box = $('.view_box');

	$(".file").on('change', function() {
		var fileprop = $(this).prop('files')[0],
			find_img = $(this).next('img'),
			fileRdr = new FileReader();

		if (find_img.length) {
			find_img.nextAll().remove();
			find_img.remove();
		}

		var img = '<img width="200" alt="" id="paramPostImg"><a href="#" class="img_del">画像を削除する</a>';

		view_box.append(img);

		fileRdr.onload = function() {
			view_box.find('img').attr('src', fileRdr.result);
			img_del(view_box);
		}
		fileRdr.readAsDataURL(fileprop);
	});

	function img_del(target) {
		target.find("a.img_del").on('click', function() {

			if (window.confirm('サーバーから画像を削除します。\nよろしいですか？')) {
				$(this).parent().find('input[type=file]').val('');
				$(this).parent().find('.img_view, br').remove();
				$(this).remove();
			}

			return false;
		});
	}
});
