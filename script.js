document.addEventListener("DOMContentLoaded", function () {
    const postForm = document.getElementById("comment-section");
    const postsContainer = document.getElementById("posts");

    // user authentication
    const user = {
        username: "web2cohort",
        userId: 1,
    };

    postForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const postId = document.getElementById("post-id").value;
        const title = document.getElementById("title").value;
        const content = document.getElementById("content").value;

        if (title.trim() === "" || content.trim() === "") {
            alert("Title and content cannot be empty.");
            return;
        }

        const post = {
            postId: postId || generateUniqueId(),
            title: title,
            content: content,
            author: user,
        };

        if (postId) {
            const existingPost = document.getElementById(postId);
            existingPost.querySelector("h3").textContent = title;
            existingPost.querySelector("p").textContent = content;
        } else {
            const postElement = createPostElement(post);
            postsContainer.appendChild(postElement);
        }

        postForm.reset();
    });

    // function to create a new post
    function createPostElement(post) {
        const postElement = document.createElement("div");
        postElement.id = post.postId;
        postElement.className = "post";
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <button class="edit-button" data-postid="${post.postId}">Edit</button>
            <button class="delete-button" data-postid="${post.postId}">Delete</button>
        `;

        // edit and delete buttons
        const editButton = postElement.querySelector(".edit-button");
        const deleteButton = postElement.querySelector(".delete-button");

        editButton.addEventListener("click", function () {
            // for editing
            document.getElementById("post-id").value = post.postId;
            document.getElementById("title").value = post.title;
            document.getElementById("content").value = post.content;
        });

        deleteButton.addEventListener("click", async function () {
            // Delete post
            const postElement = document.getElementById(post.postId);
            postElement.remove();
        });

        return postElement;
    }
    
    function generateUniqueId() {
        return Math.random().toString(36).substr(2, 9);
    }

    // Replace fetchPostsFromServer with actual server-side functionality
    async function fetchPostsFromServer() {
        // Simulate fetching posts from a server (Replace with actual fetch)
        return [
            {
                postId: "post1",
                title: "First Post",
                content: "This is the content of the first post.",
                author: {
                    username: "web2cohort",
                    userId: 1,
                },
            },
            {
                postId: "post2",
                title: "Second Post",
                content: "This is the content of the second post.",
                author: {
                    username: "web2cohort",
                    userId: 1,
                },
            },
        ];
    }
});
