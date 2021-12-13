$(function() {
	// ロード時の window size に合わせてSideNaviを表示
	$(window).on('load', function() {
		toggled_userList();
	});
	// 表示非表示を設定
	function toggled_userList() {
		var windowSize = $(window).width();
		if (windowSize < 1300) {
			$(".page-wrapper").removeClass("toggled");
		}
		if (windowSize >= 1300) {
			$(".page-wrapper").addClass("toggled");
		}
	}
});

$(function() {
	
	$('.card-content').on('click', function() {
		
		var $this = $(this);
		var content = $('.modal-content');
		
		var cardbody = $this.find('.card-body');
		var userId2 = cardbody.children();
		var username = $this.find('.username').text();
		var cardImg = $this.find('img').attr('src');
		
		
		content.find('#userId').text(userId2); 
		content.find('.modal-title').text(username); 
		content.find('.img-fluid').attr('src', cardImg);
	
	
		/**
		// Button that triggered the modal
		var button = event.relatedTarget
		// Extract info from data-bs-* attributes
		var recipient = button.getAttribute('data-bs-whatever')
		// If necessary, you could initiate an AJAX request here
		// and then do the updating in a callback.
		//
		// Update the modal's content.
		var modalTitle = exampleModal.querySelector('.modal-title')
		var modalBodyInput = exampleModal.querySelector('.modal-body input')

		modalTitle.textContent = 'New message to ' + recipient
		modalBodyInput.value = recipient
		 */
	});

});
