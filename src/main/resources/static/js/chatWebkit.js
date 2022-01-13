
var messageForm = $('#messageForm');
var messageArea = $('#messanger-list');
var connectingElement = $('.connecting');
// var deleteMsgForm = $('#deleteMsgForm');

var stompClient = null;
var userId = null;
var username = null;
var fromUserId = null;
var fromUserIcon = null;
var content = null;
var messageImg = null;
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
	$('#messageForm').submit(function() {
		send();
	});
	// deleter Mesage
	$('.deleterMsg').on('click', function(event) {
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
    messageImg = $('.file-upload-image');
    // messageImg = $('.thumbnail');
	// console.log(messageImg.getAttribute('src'));
    sentAvf = new Date();
    avf = getNowDateWithString(sentAvf);
    toUserId = $('#toUserId').val();

	// テキストか画像があれば実行
    if(username && (content || messageImg)) {
		if (stompClient) {
			// クライアントがあればリアルタイム通信を行う
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
			// Soketをクラアントに入れて onConnected() を呼び出す。
	        var socket = new SockJS('/websocket');
	        stompClient = Stomp.over(socket);
			stompClient.connect({}, onConnected, onError);
		}
		messageInput.val('');
	}
	// キャンセル可能ならキャンセル
	event.preventDefault();
	/**
	event.stopPropagation();
	var hoge = 1;
	 */
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
        messageElement.classList.add('common-message ');
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
function deleterMsg(event, deleterMsg_a) {
	// メッセージ削除を押下したとき
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



function updateMsgData(event, data_a) {
	msgId = data_a.find('.msgId').val();
	fromUserId = $('#fromUserId').val();
	a = data_a;
	if (msgId) {
		if (stompClient) {
			var deleterTarget = {
				msgId: msgId,
				fromUserId: fromUserId,
				type: 'CHAT'
			};
			changeContent();
			stompClient.send("/app/chat.delete", {}, JSON.stringify(deleterTarget));
		} else {
			var socket = new SockJS('/websocket');
			stompClient = Stomp.over(socket);
			stompClient.connect({}, onDeleterConnected, onError);
		}
	}
	// キャンセル可能ならキャンセル
	event.preventDefault();
}


// サーバーに削除対象の情報を送信する。
function onDeleterConnected() {
	changeContent();
	var url = "/app/chat.delete";
	stompClient.subscribe('/topic/public');
	stompClient.send(url,
		{},
		JSON.stringify({
			msgId: msgId,
			fromUserId: fromUserId,
			type: 'JOIN'
		})
	)
}


// JSで表示内容を変更
function changeContent() {
	var common_message = a.parents('.common-message');
	var msgText = common_message.find('.common-message-content');
	console.log(msgText);
	msgText.html('削除されたメッセージです。7日経過後（現在は3分後に設定）に自動削除されます。');
	a.find('.fa-trash').hide();
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


//エラー時処理
function onError(error) {
    connectingElement.textContent = '予期せぬエラーが発生しました。';
    connectingElement.style.color = 'red';
}
