/** */








/*JS isnt my experty 😉*/
$(document).ready(function() {
  $(".js-chat-button, .js-back").on("click", function(){
    $(".main-grid").toggleClass("is-message-open");
  });
  
  $(".js-side-info-button, .js-close-main-info").on("click", function(){
      $(".main-grid").toggleClass("is-main-info-open");
      $(".main-info").toggleClass("u-hide");
  });
});


/* image empty error replace with emoji */
document.addEventListener("DOMContentLoaded", function(event) {
	document.querySelectorAll('img').forEach(function(img) {
		img.onerror = function() { 
			this.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='50' height='50' viewport='0 0 100 100' style='fill:black;font-size:50px;opacity:0.5;filter:grayscale(1)'><filter id='grayscale'><feColorMatrix type='saturate' values='0.10'/></filter><text y='85%'>👶</text></svg>";
		};
	})
});


$(function() {
	// ロード時の window size に合わせてSideNaviを表示
	$(window).on('load', function() {
		$(".page-wrapper").removeClass("toggled");
		decide_msg_width();
		hyperlink_deletion();
	});
	// window size に合わせてSideNaviを非表示
	$(window).on('resize', function() {
		$(".page-wrapper").removeClass("toggled");
		decide_msg_width();
	});
	
	//ChatMessageの横幅を指定
	function decide_msg_width(){
		if($(window).width() < 886) {
			var msg_width = $('.messanger-list').innerWidth() * 0.7;
			$('.common-message').css('max-width', msg_width);
		}
	}
	/**
	 */
	
	//　ChatUserのハイパーリンクを削除
	function hyperlink_deletion(){
		var selectio_id = $('.selection-id');
		var display_id = $('#display-id').val();
		selectio_id.each(function() {
			if($(this).val() == display_id) {
				var chats_content = $(this).parents('.chats-list');
				var link = $(this).nextAll('.chat-reception');
				chats_content.css('background-color','#e9e9e9')
				link.contents().unwrap();
			}
		});
	}
	
});



