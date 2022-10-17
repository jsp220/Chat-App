var socket = io();
var form = document.getElementById('form');
var input = document.getElementById('input');
var leftCol = document.querySelector('.left-col');
var rightCol = document.querySelector('.right-col');
var mainBody = document.querySelector('.mainBody');
var channelWindow = document.getElementById('channel-window');
var order = 0;

const chatOrder = () => {
    const chats = leftCol.children;
    // console.log(chats);
    for (let i = chats.length-1; i > 0; i--) {
        // console.log(chats[i])
        chats[i].setAttribute('style', `order: ${order}`);
        order--;
    }
}

socket.on('chat message', async function (msg, info) {
    const sender = info.sender;
    const receiver = info.receiver;
    const utcDate = new Date(`${info.timestamp}`)
    const timestamp = `${utcDate.toLocaleDateString()} ${utcDate.toLocaleTimeString('en-US')}`;
    // console.log(timestamp)
    
    if (receiver == localStorage.getItem('username')) {
        if (sender == localStorage.getItem('user1') || sender == localStorage.getItem('user2')) {
            var chatEl = document.querySelector(`.chat-${sender}`);
            // var topChat = chatEl.parentElement.children[1];
            // topChatOrder = topChat.getAttribute('style').split(" ")[1];
            // console.log(topChatOrder);
            chatEl.setAttribute('style', `order: ${order}`);
            order--;
        } else {

            if (document.querySelector(`.chat-${sender}`) != undefined) {
                var chatEl = document.querySelector(`.chat-${sender}`);
                // var topChat = chatEl.parentElement.children[1];
                // topChatOrder = topChat.getAttribute('style').split(" ")[1];
                // console.log(topChatOrder);
                chatEl.setAttribute('style', `order: ${order}`);
                order--;
                chatEl.firstElementChild.setAttribute('style', `box-shadow: 5px 5px 5px red`);
            } else {
                var leftColEl = document.querySelector('.left-col');
                var div1 = document.createElement('div', `chat-${sender}`);
                div1.classList.add('col');
                div1.setAttribute('style', `order: ${order}`);
                order--;
                
                var div2 = document.createElement('div');
                div2.classList.add('card');
                div2.setAttribute('style', 'box-shadow: 5px 5px 5px red;')
                
                var aEl = document.createElement('a');
                aEl.classList.add('btn', 'card-body', 'p-1', 'hover-card-body');
                aEl.setAttribute('href', `/channel/${info.channelId}`);
                
                var pEl = document.createElement('p');
                pEl.classList.add('card-text', 'hover-card-text');
                pEl.textContent = `Chat with ${sender}`;
                
                aEl.appendChild(pEl);
                div2.appendChild(aEl);
                div1.appendChild(div2);
                leftColEl.appendChild(div1);
            }
        }
    }
    if (sender == localStorage.getItem('username')) {
        var chatEl = document.querySelector(`.chat-${receiver}`);
            // var topChat = chatEl.parentElement.children[1];
            // topChatOrder = topChat.getAttribute('style').split(" ")[1];
            // console.log(topChatOrder);
        chatEl.setAttribute('style', `order: ${order}`);
        order--;
    }
    if (
        (sender == localStorage.getItem('user1') && receiver == localStorage.getItem('user2')) ||
        (sender == localStorage.getItem('user2') && receiver == localStorage.getItem('user1'))) {

        var div1 = document.createElement('div');
        if (sender == localStorage.getItem('username')) {
            div1.classList.add('card', 'text-bg-primary', 'mb-3', 'right');
        } else {
            div1.classList.add('card', 'text-bg-success', 'mb-3', 'left');
        }
        
        var div2 = document.createElement('div');
        div2.classList.add('card-header');
        
        var p1 = document.createElement('p');
        p1.classList.add('fw-bolder', 'user-name');
        p1.textContent = sender;
        
        var p2 = document.createElement('p');
        p2.classList.add('time-stamp');
        p2.textContent = timestamp;

        var div3 = document.createElement('div');
        div3.classList.add('card-body');
        var item = document.createElement('p');
        item.classList.add('card-title');
        item.textContent = msg;
    
        div2.appendChild(p1);
        div2.appendChild(p2);

        div3.appendChild(item);

        div1.appendChild(div2);
        div1.appendChild(div3);

        channelWindow.appendChild(div1);
    }

    rightCol.scrollTo(0, rightCol.scrollHeight);
});

chatOrder();