class User {
  constructor() {
    this.username();
    this.registerBtn();
  }

  username() {
    document
      .getElementById('sign-up')
      .addEventListener('click', this.openUsername);
    document
      .getElementById('save-username')
      .addEventListener('click', this.closeUsername);
  }

  openUsername() {
    document.getElementById('username-modal').classList.remove('hidden');
  }

  closeUsername(e) {
    e.preventDefault();
    const username = document.getElementById('enter-username').value;
    document.getElementById('username-modal').classList.add('hidden');
    localStorage.setItem('username', username);
  }

  registerBtn() {
    localStorage.getItem('username')
      ? document.getElementById('sign-up').classList.add('hidden')
      : document.getElementById('sign-up').classList.remove('hidden');
  }
}

export default User;
