const registerFormHandler = async (event) => {
    event.preventDefault();
  
    const email = $('#email-register').val().trim();
    const username = $('#username-register').val().trim();
    const password = $('#password-register').val().trim();

    console.log(`${email}; ${username}; ${password}`);
  
    if (email && username && password) {
      const response = await fetch('/api/user/register', {
        method: 'POST',
        body: JSON.stringify({ email, username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to register');
      }
    }
  };
  
  document
    .querySelector('.register-form')
    .addEventListener('submit', registerFormHandler);
  