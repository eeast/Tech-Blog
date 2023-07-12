const editPostHandler = async (event) => {
    event.preventDefault();

    const title = $('#postTitle').val().trim();
    const post_body = $('#postBody').val().trim();

    if (title && post_body) {
        const response = await fetch(`/api/post/${event.currentTarget.dataset.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: title,
                body: post_body,
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

const clearPostHandler = (event) => {
    event.preventDefault();

    document.querySelector('#postTitle').value = "";
    document.querySelector('#postBody').value = "";
}

document.querySelector('.editBlogPost').addEventListener('submit', editPostHandler);
document.querySelector('#clearBtn').addEventListener('click', clearPostHandler);