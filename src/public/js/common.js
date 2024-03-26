const allLikeButton = document.querySelectorAll('.like-btn');

async function likeButton(productId, btn) {

    try {
        const response = await axios({
            method: 'post',
            url: `/product/${productId}/like`,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
        });

        if (btn.children[0].classList.contains('bi-heart-fill')) {
            btn.children[0].classList.remove('bi-heart-fill');
            btn.children[0].classList.add('bi-heart');
        } else {
            btn.children[0].classList.add('bi-heart-fill');
            btn.children[0].classList.remove('bi-heart');

        }
        console.log(response);
    }
    catch (e) {
        // used to redirect the browser using js
        window.location.replace('/login');
        console.log(e.message);
    }
}

for (let btn of allLikeButton) {
    btn.addEventListener('click', () => {
        const productId = btn.getAttribute('product-id')
        likeButton(productId, btn);
    })
}