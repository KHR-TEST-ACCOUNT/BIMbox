
var messageForm = $('#messageForm');
var messageArea = $('#messanger-list');
var connectingElement = $('.connecting');
// var deleteMsgForm = $('#deleteMsgForm');

var stompClient = null;
var stompClient_delete = null;
var userId = null;
var username = null;
var fromUserId = null;
var fromUserIcon = null;
var content = null;
var uploadFile = null;
var sentAvf = null;
var avf = null;
var toUserId = null;
var msgId = null;
var a = null;

// 特に影響がなければ削除
var colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

$(function() {
	// Mesage send
	$('#messageForm').submit(function(event) {
		send(event);
	});
	// deleter Mesage
	$(document).on("click", ".deleterMsg", function(event) {
		deleterMsg(event, $(this));
	});
});


/**----------- message Send -------------- */
function send(event) {
	var messageInput = $('#message-box');
    userId = $('#userId').val();
    username = $('#name').val();
    fromUserId = $('#fromUserId').val();
    // fromUserIcon = $('.profile-photo');
    content = messageInput.val();
    // uploadFile = $('.file-upload-input');
	console.log(uploadFile);
	console.log(typeof(uploadFile));
    sentAvf = new Date();
    avf = getNowDateWithString(sentAvf);
    toUserId = $('#toUserId').val();

	// テキストか画像があれば実行
    if(username && (content || uploadFile)) {
		if (stompClient) {
			// クライアントがあればリアルタイム通信を行う
	        var chatMessage = {
				fromUserId: fromUserId,
				fromUser: username,
				// fromUserIcon: fromUserIcon,
				content: content,
				// uploadFile: uploadFile,
				sentAvf: sentAvf,
				toUserId: toUserId,
				type: 'CHAT'
	        };
	        stompClient.send("/app/chat.send", {}, JSON.stringify(chatMessage));
		} else {
			// Soketをクラアントに入れて onConnected() を呼び出す。
	        var socket = new SockJS('/websocket');
	        stompClient = Stomp.over(socket);
			stompClient.connect({}, onConnected, onError);
		}
		messageInput.val('');
		messageInput.innerHeight(62);
		removeUpload();
	}
	// キャンセル可能ならキャンセル
	event.preventDefault();
}


// サーバーに情報を送信する。
function onConnected() {
	stompClient.subscribe('/topic/public', onMessageReceived);
	stompClient.send("/app/chat.send",
		{},
		JSON.stringify({
			fromUserId: fromUserId,
			fromUser: username,
			// fromUserIcon: fromUserIcon,
			content: content,
			// uploadFile: uploadFile,
			sentAvf: sentAvf,
			toUserId: toUserId,
			type: 'JOIN'
		})
	)
	// Let's start... を非表示にする
	if (connectingElement) {
		connectingElement.addClass('d-none');
	}
}


/**----------- チャットメッセージの表示処理 -------------- */

function onMessageReceived(payload) {
	//送信された情報をMessageに格納する。
	var message = JSON.parse(payload.body);
	// Delete押下時の処理 
    if (message.type === 'LEAVE') {
		changeUserListContent();
	} else {
		// message List を取得
		var listElement = $('.messanger-list');
		// li を 最後の li 配下に追加
		var messageElement = $("<li>");
		messageElement.addClass('common-message is-you');
		listElement.append(messageElement);
		// messeage があれば li 配下に追加
		if(message.content){
			var textElement =  $("<p>").text(message.content);
			textElement.addClass('common-message-content');
			messageElement.append(textElement);
		}
		/**
		// uploadFile があれば li 配下に追加
		if(message.uploadFile){
			var imageElement =  $("<img>").attr('src', message.uploadFile.encodedString);
			imageElement.addClass('file-upload');
			messageElement.append(imageElement);
		}
		 */
		// message footer を li 配下に追加
		var footerElement =  $("<div>");
		footerElement.addClass('massage-footer');
		messageElement.append(footerElement);
		// time を message footer 配下に追加
		var timeElement =  $("<time>").text(avf);
		footerElement.append(timeElement)
		// a を message footer 配下に追加
		var aElement = $("<a>");	
		aElement.addClass('text-decoration-none text-end deleterMsg');
		footerElement.append(aElement);
		// icon を a 配下に追加
		var iconsElement = $("<i>");	
		iconsElement.addClass('fas fa-trash isDelete');
		aElement.append(iconsElement);
		// input を a 配下に追加
		var inputElement = $('<input type="hidden" />');
		inputElement.addClass('msgId');
		inputElement.attr('value', message.msgId);
		aElement.append(inputElement)
		// ユーザーリストの表示を更新
		var selectio_id = $('.selection-id');
		selectio_id.each(function() {
			if($(this).val() == message.toUserId) {
				var chats_content = $(this).parents('.chats-item');
				chats_content.find('.chats-item-time').text(avf);
				chats_content.find('.chats-item-last').text(message.content);
				chats_content.prependTo('.chats-list');
			}
		});
		
	}
}


/**----------- delete -------------- */

function updateMsgData(event, data_a) {
	msgId = data_a.find('.msgId').val();
	fromUserId = $('#fromUserId').val();
	a = data_a;
	if (msgId) {
		if (stompClient_delete) {
			var deleterTarget = {
				msgId: msgId,
				fromUserId: fromUserId,
				type: 'LEAVE'
			};
			stompClient_delete.send("/app/chat.delete", {}, JSON.stringify(deleterTarget));
			changeContent();
		} else {
			var socket = new SockJS('/websocket');
			stompClient_delete = Stomp.over(socket);
			stompClient_delete.connect({}, onDeleterConnected, onError);
		}
	}
	// キャンセル可能ならキャンセル
	event.preventDefault();
}


// サーバーに削除対象の情報を送信する。
function onDeleterConnected() {
	var url = "/app/chat.delete";
	stompClient_delete.subscribe('/topic/public');
	stompClient_delete.send(url,
		{},
		JSON.stringify({
			msgId: msgId,
			fromUserId: fromUserId,
			type: 'LEAVE'
		})
	)
	changeContent();
	changeUserListContent();
}


	// Msgを削除表記に変更
function changeContent() {
	var common_message = a.parents('.common-message');
	var msgText = common_message.find('.common-message-content');
	msgText.html('削除されたメッセージです。7日経過後（現在は3分後に設定）に自動削除されます。');
	a.find('.fa-trash').hide();
}


// 最後のメッセージをユーザーリストに表示する
function changeUserListContent() {
	var selectio_id = $('.selection-id');
	var last_li = $('.common-message:last');
	var last_msg = last_li.find('.common-message-content').text();
	var last_avf = last_li.find('time').text();
	selectio_id.each(function() {
		if($(this).val() == $('#display-id').val()) {
			var chats_content = $(this).parents('.chats-item');
			chats_content.find('.chats-item-time').text(last_avf);
			chats_content.find('.chats-item-last').text(last_msg);
		}
	});
}


// メッセージ削除を押下したときの処理
function deleterMsg(event, deleterMsg_a) {
	const swalWithBootstrapButtons = Swal.mixin({
		customClass: {
			confirmButton: 'btn btn-success',
			cancelButton: 'btn btn-danger'
		},
		buttonsStyling: false
	})
	swalWithBootstrapButtons.fire({
		title: '本当に削除しますか?',
		text: "削除されたメッセージは 7日経過後（現在は3分後に設定）に自動削除されます。",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonText: '削除します',
		cancelButtonText: 'キャンセル',
		reverseButtons: true,
		width : '350rem',
		padding : '10rem'
	}).then((result) => {
		// 削除実行
		if (result.isConfirmed) {
			swalWithBootstrapButtons.fire(
				'削除しました',
				'7日経過後に自動削除されます（現在は3分後に設定）',
				'success'
			)
			if (event && deleterMsg_a) updateMsgData(event, deleterMsg_a);
		} else if (result.dismiss === Swal.DismissReason.cancel) {
			// キャンセル処理
			swalWithBootstrapButtons.fire(
				'キャンセルしました',
				'',
				'error'
			)
		}
	})
}



/**----------- 日付の変換処理 -------------- */
function getNowDateWithString(date){
	var yyMMddHmm = new Intl.DateTimeFormat('ja-JP', {
		month: 'narrow',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric'					
	}).format(date);
	return yyMMddHmm;
}


//エラー時処理
function onError(error) {
    connectingElement.textContent = '予期せぬエラーが発生しました。';
    connectingElement.style.color = 'red';
}
