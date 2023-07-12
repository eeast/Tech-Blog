const goToPost = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    window.location.href = `/post/${event.currentTarget.dataset.id}`;
};

const goToEditPost = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    window.location.href = `/edit/${event.currentTarget.dataset.id}`;
}

const postLinks = document.querySelectorAll('#post-link');
if (window.location.href.includes('userpage')){
    for(let i = 0; i < postLinks.length; i++) {
        postLinks[i].addEventListener('click', goToEditPost);
    };
} else {
    for(let i = 0; i < postLinks.length; i++) {
        postLinks[i].addEventListener('click', goToPost);
    };
}
