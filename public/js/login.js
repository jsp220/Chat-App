const loginFormHandler = async function(event) {
  event.preventDefault();

  const usernameEl = document.querySelector("#username-login");
  const passwordEl = document.querySelector("#password-login");
  
  fetch("/api/user/login", {
    method: "post",
    body: JSON.stringify({
      username: usernameEl.value,
      password: passwordEl.value
    }),
    headers: { "Content-Type": "application/json" }
  })
  .then(response => {
    if (response.ok) {
      localStorage.setItem('username', usernameEl.value);
      return response.json();
    } else {
      console.log('abc')
      alert('Invalid user name or password');
    }
  })
  .then(data => {
    document.location.replace("/");
  })
  .catch(err => alert('Invalid user name or password'));
};

document
  .querySelector("#login-form")
  .addEventListener("submit", loginFormHandler);