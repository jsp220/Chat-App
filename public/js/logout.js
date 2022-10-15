const logout = async () => {
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    localStorage.removeItem('username');
    localStorage.removeItem('user1');
    localStorage.removeItem('user2');
    document.location.replace('/login');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#logout').addEventListener('click', (event) => {
  event.preventDefault();
  logout();
});
