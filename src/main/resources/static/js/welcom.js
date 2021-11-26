$(function() {

/**
 */
	var WelcomPage = $(".WelcomPage");
	var SignUpPage = $(".SignUpPage");
	var signInBtn = $(".signIn");
	var toWelcom = $("#toWelcom");

	signInBtn.on('click', function() {
		/**
		WelcomPage.fadeIn();
		SignUpPage.fadeOut();
		*/
		WelcomPage.addClass('hidden');
		SignUpPage.removeClass('hidden');
	});
	
	toWelcom.on('click', function() {
		/**
		WelcomPage.fadeOut();
		SignUpPage.fadeIn();
		 */
		WelcomPage.removeClass('hidden');
		SignUpPage.addClass('hidden');
	});
			/**
		if (WelcomPage) {
		} else {
			WelcomPage.removeClass('hidden');
			SignUpPage.addClass('hidden');
		}
			 */
});

$(function() {

	const sign_in_btn = $("#sign-in-btn");
	const sign_up_btn = $("#sign-up-btn");
	const container = $(".container");

	sign_up_btn.on('click', function() {
		container.addClass("sign-up-mode");
	});

	sign_in_btn.on('click', function() {
		container.removeClass("sign-up-mode");
	});

});