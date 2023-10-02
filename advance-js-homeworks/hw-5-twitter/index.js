// Select elements
const root = document.querySelector('.root');

// Function to display loading animation
const displayLoading = (parentElement) => {
    const loader = document.createElement("div");
    loader.classList.add("loader");
    loader.style.display = "block";
    for (let i = 1; i <= 4; i++) {
        const span = document.createElement("span");
        loader.appendChild(span);
    }
    parentElement.appendChild(loader);
};

// Function to hide loading animation
const hideLoading = (parentElement) => {
    const loader = parentElement.querySelector(".loader");
    if (loader) {
        loader.style.display = "none";
    }
};

// Fetch users
const fetchUsers = () => {
    return fetch('https://ajax.test-danit.com/api/json/users')
        .then(res => res.json())
        .catch(err => console.log(err));
};

// Fetch posts
const fetchPosts = () => {
    return fetch('https://ajax.test-danit.com/api/json/posts')
        .then(res => res.json())
        .catch(err => console.log(err));
};



// Send post
const sendPost = (userId, title, body) => {
    return fetch("https://ajax.test-danit.com/api/json/posts", {
        method: 'POST',
        body: JSON.stringify({
            userId: userId,
            title: title,
            body: body
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => data);
};

//Edit post
const editPost = (postId, userId, title, body) => {
    return fetch(`https://ajax.test-danit.com/api/json/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
            userId: userId,
            title: title,
            body: body
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Failed to update post.');
        })
        .catch(error => console.log(error));
};
displayLoading(root);
class Card {
    constructor(title, text, userName, userEmail, userUserName) {
        this.title = title;
        this.text = text;
        this.userName = userName;
        this.userEmail = userEmail;
        this.userUserName = userUserName;
    }

    createPostCard() {
        const card = document.createElement('div');

        const cardTitle = document.createElement('h2');
        cardTitle.classList.add('card-title')
        cardTitle.textContent = this.title;

        const cardBody = document.createElement('p');
        cardBody.classList.add('card-body')
        cardBody.textContent = this.text;

        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');

        const userProfile = document.createElement('div');
        userProfile.classList.add('user-profile');
        const userNameArr = this.userName.split(' ');
        const profilePic = userNameArr.map(userName => userName[0]).join('');
        userProfile.textContent = profilePic;

        const userInfo = document.createElement('div');
        userInfo.classList.add('user-info')

        const userNameElement = document.createElement('h2');
        userNameElement.textContent = this.userName;

        const userUsername = document.createElement('p');
        userUsername.textContent = `${this.userEmail}`;

        const delButton = document.createElement('button');
        delButton.classList.add('delete')
        delButton.innerHTML = '<i class="fas fa-trash"></i>';

        const editButton = document.createElement('button');
        editButton.classList.add('edit');
        editButton.innerHTML = '<i class="fas fa-pen"></i>'

        userInfo.appendChild(userNameElement);
        userInfo.appendChild(userUsername);

        cardHeader.appendChild(userProfile);
        cardHeader.appendChild(userInfo);

        card.classList.add('card');

        card.appendChild(cardHeader);
        card.appendChild(cardTitle);
        card.appendChild(cardBody);
        card.appendChild(delButton);
        card.appendChild(editButton);

        return card;
    }
    // Delete post
    deleteCard(postId) {
        return fetch(`https://ajax.test-danit.com/api/json/posts/${postId}`, {
            method: 'DELETE',
        })
            .then(response => response);
    };
    //Edit Post
    editCard(postId, userId, cardElement) {
        const modal = new Modal()
        modal.openModal();
        modal.sendButton.textContent = 'Update';
        const updatePostHandler = () => {
            editPost(postId, userId, modal.titleInput.value, modal.bodyInput.value)
                .then(data => {
                    cardElement.querySelector('.card-title').textContent = data.title;
                    cardElement.querySelector('.card-body').textContent = data.body;
                    modal.closeModal();
                })
                .catch(error => console.error(error));
        };
        modal.sendButton.addEventListener('click', updatePostHandler);
    }

}

// Create modal element
class Modal {
    constructor() {
        this.modal = document.createElement('div');
        this.modal.classList.add('modal');
        this.modalContent = document.createElement('div');
        this.modalContent.classList.add('modal-content');
        this.titleInput = document.createElement('input');
        this.titleInput.classList.add('input-title');
        this.bodyInput = document.createElement('input');
        this.bodyInput.classList.add('input-body');
        this.sendButton = document.createElement('button');
        this.closeButton = document.createElement('div');
        this.closeButton.classList.add('close');
        this.closeButton.innerHTML = '&times;';

        this.modalContent.appendChild(this.closeButton);
        this.modalContent.appendChild(this.titleInput);
        this.modalContent.appendChild(this.bodyInput);
        this.modalContent.appendChild(this.sendButton);
        this.sendButton.textContent = 'Send';

        this.modal.appendChild(this.modalContent);
        root.appendChild(this.modal);

        this.closeButton.addEventListener('click', () => {
            this.closeModal();
        });
    }

    openModal() {
        this.modal.style.display = 'block';
    }

    closeModal() {
        this.modal.style.display = 'none';
    }
}

// Display data as Card
Promise.all([fetchUsers(), fetchPosts()])
    .then(([users, posts]) => {
        hideLoading(root);
        users.forEach(user => {
            const cardContainer = document.createElement('div');
            const createPostBtn = document.createElement('button');
            createPostBtn.classList.add('send');
            createPostBtn.textContent = 'Create post';
            cardContainer.classList.add('card-container');
            cardContainer.appendChild(createPostBtn);

            posts.forEach(post => {
                if (post.userId === user.id) {
                    const cardPosts = new Card(post.title, post.body, user.name, user.email, user.username);
                    const cardElement = cardPosts.createPostCard();
                    cardContainer.appendChild(cardElement);

                    const deleteButton = cardElement.querySelector('.delete');
                    deleteButton.addEventListener('click', () => {
                        cardPosts.deleteCard(post.id)
                        cardElement.remove();
                    });
                    const editButton = cardElement.querySelector('.edit');
                    editButton.addEventListener('click', () => {
                        cardPosts.editCard(post.id, user.id, cardElement)
                    });

                }
            });

            createPostBtn.addEventListener('click', () => {
                const modal = new Modal()
                modal.sendButton.textContent = 'Send'
                const selectedPost = posts.find(post => post.userId === user.id);
                if (selectedPost) {
                    modal.openModal()
                    const sendPostHandler = () => {
                        const userId = selectedPost.userId;
                        const postTitle = modal.titleInput.value;
                        const postBody = modal.bodyInput.value;
                        sendPost(userId, postTitle, postBody)
                            .then(data => {
                                const newCardPosts = new Card(data.title, data.body, user.name, user.email, user.username);
                                const newCardElement = newCardPosts.createPostCard();
                                cardContainer.insertBefore(newCardElement, createPostBtn.nextSibling);
                                modal.closeModal();

                                // Remove the event listener after it has been used once
                                modal.sendButton.removeEventListener('click', sendPostHandler);
                            })
                            .catch(error => console.error(error));
                    };

                    modal.sendButton.addEventListener('click', sendPostHandler);
                }
            });

            root.appendChild(cardContainer);
        });
    })
    .catch((error) => console.error(error));
