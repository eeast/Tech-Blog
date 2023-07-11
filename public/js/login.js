const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = $('#email-login').val().trim();
    const password = $('#password-login').val().trim();

    console.log(`${email}; ${password}`);

    if (email && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            $(location).prop('href', '/');
        } else {
            alert('Failed to log in');
        }
    }
};

document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
