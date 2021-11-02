'use strict';

var usernamePage = document.querySelector('#username-page');
var chatPage = document.querySelector('#chat-page');
var usernameForm = document.querySelector('#usernameForm');
var messageForm = document.querySelector('#messageForm');
var messageInput = document.querySelector('#message');
var messageArea = document.querySelector('#messageArea');
var connectingElement = document.querySelector('.connecting');
var deleterMessage = document.querySelector('.deleterMessage');

var stompClient = null;
var userId = null;
var fromUserIcon = null;
var fromUserId = null;
var username = null;
var content = null;
var sentAvf = null;
var avf = null;
var toUserId = null;

var colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

function send(event) {
    userId = document.querySelector('#userId').value.trim();
    fromUserId = document.querySelector('#fromUserId').value.trim();
    fromUserIcon = document.querySelector('.profile-photo');
    username = document.querySelector('#name').value.trim();
    content = messageInput.value.trim();
    sentAvf = new Date();
    avf = getNowDateWithString(sentAvf);
    toUserId = document.querySelector('#toUserId').value.trim();

    if(username && content) {
		if (stompClient) {
	        var chatMessage = {
	            fromUserId: fromUserId,
	            fromUser: username,
	            fromUserIcon: fromUserIcon,
	            content: content,
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
	        sentAvf: sentAvf,
			toUserId: toUserId, 
			type: 'JOIN'
		})
    )
	if(connectingElement) connectingElement.classList.add('hidden');
}

// チャットメッセージの表示処理
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
		if(userId == message.fromUserId){
			avatarElement.classList.add('fromUserImg');
			messageElement.classList.add('text-end');
		}else{
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
    var dateElement = document.createElement('small');
    var dateText = document.createTextNode(avf);
    dateElement.appendChild(dateText);
    messageElement.appendChild(dateElement);
    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
}

// バックグラウンドのスタイル変更処理
function getAvatarColor(messageSender) {
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }
    var index = Math.abs(hash % colors.length);
    return colors[index];
}

// 日付の変換処理
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


$(function() {
	
	$(document).on('click', '.deleteMessage', function() {
	    if(!confirm('本当にこのメッセージを削除しますか？')){
	        return false;
	    }else{
		/**
			let parent = $(this).parents('#messageForm');
			let fromUserId = parent.find('input[id="fromUserId"]').val();
			let toUserId = parent.find('input[id="toUserId"]').val();
			$.ajax({
				type: parent.attr('method'),
				url: '/websocket/DeleteMessage.do',
				dataType: 'html',
				data: {
					fromUserId: fromUserId,
					toUserId: toUserId
				}
			}).done((data) => {
				let targetId = '#' + paramTopicNo;
				$(targetId).html(data);
			});
		 */
	    }
	});
	
});

messageForm.addEventListener('submit', send, true);