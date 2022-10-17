var socket = io();
var form = document.getElementById('form');
var input = document.getElementById('input');
var leftCol = document.querySelector('.left-col');
var rightCol = document.querySelector('.right-col');
var mainBody = document.querySelector('.mainBody');
var channelWindow = document.getElementById('channel-window')
const URL = document.URL;

const init = () => {
    rightCol.scrollTo(0, rightCol.scrollHeight);
}

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

            // console.log(data);
            // localStorage.setItem('sender', data.user.username);

            socket.emit('chat message', input.value, {sender: data.sender, receiver: data.receiver, senderId: data.senderId, receiverId: data.receiverId, channelId: data.channelId, timestamp: data.newMessage.createdAt});
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

init();