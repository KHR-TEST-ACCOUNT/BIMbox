'use strict';

var usernamePage = document.querySelector('#username-page');
var chatPage = document.querySelector('#chat-page');
var usernameForm = document.querySelector('#usernameForm');
var messageForm = document.querySelector('#messageForm');
var messageInput = document.querySelector('#message');
var messageArea = document.querySelector('#messageArea');
var connectingElement = document.querySelector('.connecting');

var stompClient = null;
var username = null;
var content = null;

var colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

function send(event) {
    username = document.querySelector('#name').value.trim();
    content = messageInput.value.trim();

    if(username && content) {
		if (stompClient) {
	        var chatMessage = {
	            sender: username,
	            content: messageInput.value,
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
        JSON.stringify({sender: username,content: content, type: 'JOIN'})
    )
	// 接続中の文字をHiddenにする。
    connectingElement.classList.add('hidden');
}

// チャットメッセージの表示処理
function onMessageReceived(payload) {
	//送信された情報をMessageに格納する。
    var message = JSON.parse(payload.body);
    var messageElement = document.createElement('li');

	// TypeがLEAVEのときの処理
    if (message.type === 'LEAVE') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' left!';
	// TypeがChatのときの処理
    } else {
        messageElement.classList.add('chat-message');
		//チャットメッセージを追加する
        var avatarElement = document.createElement('i');
        var avatarText = document.createTextNode(message.sender[0]);
        avatarElement.appendChild(avatarText);
		//バックグラウンドのスタイルを変更
        avatarElement.style['background-color'] = getAvatarColor(message.sender);
		//チャットメッセージを追加する
        messageElement.appendChild(avatarElement);
        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.sender);
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

//エラー時処理
function onError(error) {
    connectingElement.textContent = '予期せぬエラーが発生しました。';
    connectingElement.style.color = 'red';
}

messageForm.addEventListener('submit', send, true);