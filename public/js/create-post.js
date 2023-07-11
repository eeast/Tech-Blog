const newPostHandler = async (event) => {
    event.preventDefault();

    const title = $('#postTitle').val().trim();
    const post_body = $('#postBody').val().trim();

    if (title && post_body) {
        const response = await fetch('/api/post/', {
            method: 'POST',
            body: JSON.stringify({
                title,
                post_body,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/userpage');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.createBlogPost').addEventListener('submit', newPostHandler);