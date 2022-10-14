const channelHandler = async (data) => {
        
    const username = data.id;
    
    if (username) {
        const response = await fetch('/api/channel', {
            method: 'POST',
            body: JSON.stringify({username}),
            headers: { 'Content-Type': 'application/json' },
        })
        if (response.ok) {
            const data = await response.json();

            document.location.replace(`/channel/${data.id}`);
            // const splitUrl = response.url.split("/") // [http:, ]
            // const url = splitUrl[splitUrl.length-1];
            // console.log(url);
            // document.location.replace(`/channel/${url}`);
        } else {
            alert(response.statusText);
        }
    } 
}





// const channelHandler = async (event) => {
//     event.preventDefault();

//     console.log(event);
//     // const title = document.querySelector('#post-title').value;
//     // const body = document.querySelector('#post-body').value;

//     // if (title) {
//     //     const response = await fetch('/api/post', {
//     //         method: 'POST',
//     //         body: JSON.stringify({title, body}),
//     //         headers: { 'Content-Type': 'application/json' },
//     //     });

//     //     if (response.ok) {
//     //         document.location.replace('/dashboard');
//     //     } else {
//     //         alert(response.statusText);
//     //     }
//     // } 
// }

// document.querySelector('#channel-form').addEventListener("submit", channelHandler);