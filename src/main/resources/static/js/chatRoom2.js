'use strict';

var usernamePage = document.querySelector('#username-page');
var chatPage = document.querySelector('#chat-page');
var usernameForm = document.querySelector('#usernameForm');
var messageForm = document.querySelector('#messageForm');
var deleteMsgForm = document.querySelector('#deleteMsgForm');
var messageInput = document.querySelector('#message');
var messageArea = document.querySelector('#messageArea');
var connectingElement = document.querySelector('.connecting');

var stompClient = null;
var userId = null;
var fromUserIcon = null;
var fromUserId = null;
var username = null;
var content = null;
var messageImg = null;
var sentAvf = null;
var avf = null;
var toUserId = null;
var msgId = null;
var a = null;
var colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

/**----------- message Send -------------- */

function send(event) {
    userId = document.querySelector('#userId').value.trim();
    username = document.querySelector('#name').value.trim();
    fromUserId = document.querySelector('#fromUserId').value.trim();
    fromUserIcon = document.querySelector('.profile-photo');
    content = messageInput.value.trim();
//    messageImg = document.querySelector('.imgContent');
    messageImg = document.querySelector('.thumbnail');
	// console.log(messageImg.getAttribute('src'));
    sentAvf = new Date();
    avf = getNowDateWithString(sentAvf);
    toUserId = document.querySelector('#toUserId').value.trim();
	

    if(username && (content || messageImg)) {
		if (stompClient) {
	        var chatMessage = {
				fromUserId: fromUserId,
				fromUser: username,
				fromUserIcon: fromUserIcon,
				content: content,
				// uploadFile: messageImg,
				// messageImg: messageImg,
				// encodedString: messageImg.getAttribute('src'),
				sentAvf: sentAvf,
				toUserId: toUserId,
				type: 'CHAT'
	        };
	        stompClient.send("/app/chat.send", {}, JSON.stringify(chatMessage));
		}else{
	        var socket = new SockJS('/websocket');
	        stompClient = Stomp.over(socket);
			// Soketをクラアントに入れて onConnected() を呼び出す。
			stompClient.connect({}, onConnected, onError);
		}
		messageInput.value = '';
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
			fromUserIcon: fromUserIcon,
			content: content,
			// uploadFile: messageImg,
				//messageImg: messageImg,
			// encodedString: messageImg.getAttribute('src'),
			sentAvf: sentAvf,
			toUserId: toUserId,
			type: 'JOIN'
		})
	)
	if (connectingElement) {
		connectingElement.classList.add('hidden');
	}
}


/**----------- チャットメッセージの表示処理 -------------- */

function onMessageReceived(payload) {
	//送信された情報をMessageに格納する。
    var message = JSON.parse(payload.body);
    var messageElement = document.createElement('li');
	// TypeがLEAVEのときの処理
    if (message.type === 'LEAVE') {
        messageElement.classList.add('event-message');
        message.content = message.fromUser + ' left!';
	// TypeがChatのときの処理 
    } else {
		// 送信ユーザーのアイコンを設定
        messageElement.classList.add('chat-message');
		var avatarElement = document.createElement('img');
		avatarElement.src = message.fromUserIcon.encodedString;
		if (userId == message.fromUserId) {
			avatarElement.classList.add('fromUserImg');
			messageElement.classList.add('text-end');
		} else {
			avatarElement.classList.add('toUserImg');
		}
		messageElement.appendChild(avatarElement);
		// ユーザーの名前を追加する。
		var usernameElement = document.createElement('span');
		var usernameText = document.createTextNode(message.fromUser);
		usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }
	// 上記の条件分岐に応じたメッセージを追加する
    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);
    messageElement.appendChild(textElement);
    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
	// 上記の条件分岐に応じたメッセージを追加する
    var imgElement = document.createElement('img');
	imgElement.src = messageImg.getAttribute('src');
	imgElement.classList.add('imgContent');
	imgElement.classList.add('text-end');
    messageElement.appendChild(imgElement);
    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
	// 上記の条件分岐に応じたメッセージを追加する
    var dateElement = document.createElement('small');
    var dateText = document.createTextNode(avf);
    dateElement.appendChild(dateText);
    messageElement.appendChild(dateElement);
    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
}




/**----------- delete -------------- */

function deleterMsg(event, atag) {
	// 復元を押下したとき
	if (atag.children[0].innerHTML == '復元') {
		updateMsgData(event, atag);
	} else {
		// メッセージ削除を押下したとき
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success',
				cancelButton: 'btn btn-danger'
			},
			buttonsStyling: false
		})
		swalWithBootstrapButtons.fire({
			title: '本当にこのメッセージを削除しますか?',
			text: "削除されたメッセージは 7日経過後（現在は3分後に設定）に自動削除されます。",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: '削除します',
			cancelButtonText: 'キャンセル',
			reverseButtons: true
		}).then((result) => {
			// 削除実行
			if (result.isConfirmed) {
				swalWithBootstrapButtons.fire(
					'削除しました',
					'7日経過後に自動削除されます（現在は3分後に設定）',
					'success'
				)
				if (event && atag) updateMsgData(event, atag);
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
}



function updateMsgData(event, atag) {
	a = atag;
	msgId = a.children[1].value.trim();
	fromUserId = document.querySelector('#fromUserId').value.trim();
	if(msgId){
		if (stompClient) {
	        var chatMessage = {
	            msgId: msgId,
	            fromUserId: fromUserId,
	            type: 'CHAT'
	        };
			changeP();
			
			if(a.children[0].innerHTML != '復元'){
	       		stompClient.send("/app/chat.restore", {}, JSON.stringify(chatMessage));
			}
			if(a.children[0].innerHTML != 'メッセージ削除'){
	       		stompClient.send("/app/chat.delete", {}, JSON.stringify(chatMessage));
			}
		}else{
	        var socket = new SockJS('/websocket');
	        stompClient = Stomp.over(socket);
		    stompClient.connect({}, onDeleterConnected, onError);
		}
	}
	// キャンセル可能ならキャンセル
    event.preventDefault();
}


function changeP() {
	var li = a.parentNode;
	if (a.children[0].innerHTML == '復元') {
		a.children[0].innerHTML = 'メッセージ削除';
		li.children[2].innerHTML = '復元しました。反映するには更新してください。（※デモ）';
	} else {
		// if(a.children[0].innerHTML == 'メッセージ削除'){
		a.children[0].innerHTML = '復元';
		li.children[2].innerHTML = '削除されたメッセージです。7日経過後（現在は3分後に設定）に自動削除されます。';
	}
}


// サーバーに情報を送信する。
function onDeleterConnected() {
	stompClient.subscribe('/topic/public');
	if (a.children[0].innerHTML == '復元') {
		var url = "/app/chat.restore";
	}
	if (a.children[0].innerHTML == 'メッセージ削除') {
		var url = "/app/chat.delete";
	}
	stompClient.send(url,
		{},
		JSON.stringify({
			msgId: msgId,
			fromUserId: fromUserId,
			type: 'JOIN'
		})
	)
	changeP();
}


/**----------- バックグラウンドのスタイル変更処理 -------------- */
function getAvatarColor(messageSender) {
	var hash = 0;
	for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }
    var index = Math.abs(hash % colors.length);
    return colors[index];
}


/**----------- 日付の変換処理 -------------- */
function getNowDateWithString(date){
	var yyMMddHmm = new Intl.DateTimeFormat('ja-JP', {
						year: 'numeric',
						month: 'narrow',
						day: 'numeric',
						hour: 'numeric',
						minute: 'numeric'					
					}).format(date);
	return yyMMddHmm;
}


/**
$(function() {
	// アップロードするファイルを選択
	$('input[type=file]').change(function() {
		
		var imgContent = $('.imgContent');
		if(imgContent) imgContent.remove();
		
		$('.userfile').after('<img class="imgContent">');
		var file = $(this).prop('files')[0];
		imgContent = $('.imgContent');
		
		// 画像以外は処理を停止
		if (!file.type.match('image.*')) {
			// クリア
			$(this).val('');
			$('img').html('');
			return;
		}
		// 画像表示
		var reader = new FileReader();
		reader.onload = function() {
			var img_src = imgContent.attr('src', reader.result);
			imgContent.html(img_src);
		}
		reader.readAsDataURL(file);
	});
});
 */


//エラー時処理
function onError(error) {
    connectingElement.textContent = '予期せぬエラーが発生しました。';
    connectingElement.style.color = 'red';
}


messageForm.addEventListener('submit', send, true);