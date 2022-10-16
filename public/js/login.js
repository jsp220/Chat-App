const loginFormHandler = async function (event) {
    event.preventDefault();

    try {
        const username = document.querySelector("#username-login").value.trim();
        const password = document.querySelector("#password-login").value.trim();
        
        if (username && password) {
            const response = await fetch("/api/user/login", {
                method: "POST",
                body: JSON.stringify({
                    username: username.toLowerCase(),
                    password
                }),
                headers: { "Content-Type": "application/json" }
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('username', username.toLowerCase());
                document.location.replace("/");
            } else {
                alert('Invalid user name or password');
            }
        }
    } catch (err) {
        alert('Invalid user name or password');
    }
};

document
    .querySelector("#login-form")
    .addEventListener("submit", loginFormHandler);