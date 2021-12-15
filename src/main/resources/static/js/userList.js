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

