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

var colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

// ユーザー送信時の処理のチェックファンクション
// 送信を押されたときに始まるイベント
function connect(event) {
	//Inputのユーザー名を取得する
    username = document.querySelector('#name').value.trim();

    if(username) {
        var socket = new SockJS('/websocket');
        stompClient = Stomp.over(socket);
		// Soketをクラアントに入れて onConnected() を呼び出す。
        stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault();
}



// メッセージが送信されたときの挙動
// 送信を押されたときに始まるイベント（SEND）
function send(event) {
    var messageContent = messageInput.value.trim();

    if(messageContent && stompClient) {
        var chatMessage = {
            sender: username,
            content: messageInput.value,
            type: 'CHAT'
        };
		// chat.sendにメッセージとユーザーを送信
        stompClient.send("/app/chat.send", {}, JSON.stringify(chatMessage));
        messageInput.value = '';
    }
	// キャンセル可能ならキャンセル
    event.preventDefault();
}



//NameのInputに値が入って無事に送信されたら起動
function onConnected() {
    // topic/public にNameのInputの情報を入れてControllerに送信する。
    stompClient.subscribe('/topic/public', onMessageReceived);
    // WebSoketのクライアント情報をController側に送信する。
    stompClient.send("/app/chat.register",
        {},
        JSON.stringify({sender: username, type: 'JOIN'})
    )
	// 接続中の文字をHiddenにする。
    connectingElement.classList.add('hidden');
}



// NameのInputが送信されてControllerからのレスポンスがあったときに起動
// チャットメッセージが送信されたときの挙動
function onMessageReceived(payload) {
	//送信された情報をMessageに格納する。
    var message = JSON.parse(payload.body);
    var messageElement = document.createElement('li');

/**
	// TypeがJoinのときの処理
    if(message.type === 'JOIN') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' joined!';
	// TypeがLeaveのときの処理
    } else
 */
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




// TypeがChatでバックグラウンドのスタイルが変更されたときの処理
function getAvatarColor(messageSender) {
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }
	// Colorを決定する。
    var index = Math.abs(hash % colors.length);
    return colors[index];
}



function onError(error) {
	//エラー時のテキスト
    connectingElement.textContent = 'Não foi possível se conectar ao WebSocket! Atualize a página e tente novamente ou entre em contato com o administrador.';
    connectingElement.style.color = 'red';
}



usernameForm.addEventListener('submit', connect, true);
messageForm.addEventListener('submit', connect, true);
messageForm.addEventListener('submit', send, true);