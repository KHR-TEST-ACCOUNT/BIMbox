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
	
	//マウスカーソルが重なった時の処理
	$('.zooming').hover(function() {
			var img = $(this).children('img');
			var img_height = ($(this).innerHeight() - img.innerHeight()) / 2;
			img.css('top', img_height);
		},function() {
			$(this).children('img').css('top', '50%');
	});
	
});

