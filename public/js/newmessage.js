var socket = io();
var form = document.getElementById('form');
var input = document.getElementById('input');
var rightCol = document.querySelector('.right-col');
var mainBody = document.querySelector('.mainBody');
var channelWindow = document.getElementById('channel-window')
const URL = document.URL;

rightCol.scrollTo(0, rightCol.scrollHeight);

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (input.value) {
        const response = await fetch('/api/message', {
            method: 'POST',
            body: JSON.stringify({
                body: input.value,
                channelId: URL.slice(URL.lastIndexOf('/')+1)
            }),
            headers: { 'Content-Type': 'application/json' },
        })
        if (response.ok) {
            const data = await response.json();

            console.log(data);
            localStorage.setItem('sender', data.user.username);

            socket.emit('chat message', input.value, {sender: data.user.username});
            // document.location.replace(`/channel/${data.id}`);
            // const splitUrl = response.url.split("/") // [http:, ]
            // const url = splitUrl[splitUrl.length-1];
            // console.log(url);
            // document.location.replace(`/channel/${url}`);
        } else {
            alert(response.statusText);
        }
        
        input.value = '';
    }
});

socket.on('chat message', async function (msg, username) {
    
    const sender = username.sender;
    var div1 = document.createElement('div');
    if (username.sender == localStorage.getItem('username')) {
        div1.classList.add('card', 'text-bg-primary', 'mb-3', 'right');
    } else {
        div1.classList.add('card', 'text-bg-success', 'mb-3', 'left');
    }
    div1.setAttribute('style', 'max-width: 18rem');
    var div2 = document.createElement('div');
    div2.classList.add('card-header');
    div2.textContent = sender;
    var div3 = document.createElement('div');
    div3.classList.add('card-body');
    var item = document.createElement('h5');
    item.classList.add('card-title');
    item.textContent = msg;

    div3.appendChild(item);
    div1.appendChild(div2);
    div1.appendChild(div3);
    channelWindow.appendChild(div1);

    // // brian's
    // var item = document.createElement('li');
    // item.textContent = msg;
    console.log(msg);
    // channelWindow.appendChild(item);
    // // end brian's

    rightCol.scrollTo(0, rightCol.scrollHeight);
});