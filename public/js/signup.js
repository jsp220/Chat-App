const signupFormHandler = async function(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({
                username: username.toLowerCase(),
                password
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            localStorage.setItem('username', username.toLowerCase());
            document.location.replace('/');
        } else {
            const data = await response.json();
            alert(data.message);
        }
    }
}

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);