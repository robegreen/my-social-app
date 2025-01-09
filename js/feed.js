class Feed {
  constructor() {
    this.posts = postsData;
    this.container = document.getElementById("posts-container");
    this.init();
  }

  init() {
    this.renderPosts();
    this.setupImageModal();
  }

  renderPosts() {
    this.container.innerHTML = "";
    this.posts.forEach((post) => {
      const postElement = this.createPostElement(post);
      this.container.appendChild(postElement);
    });
  }

  createPostElement(post) {
    const postDiv = document.createElement("div");
    postDiv.className = "post neu-element";
    postDiv.innerHTML = `
            <div class="post-header">
                <img src="${post.author.profilePic}" alt="${
      post.author.name
    }" class="post-author-img">
                <div class="post-author-info">
                    <div class="post-author-name">${post.author.name}</div>
                    <div class="post-timestamp">${this.formatTimestamp(
                      post.timestamp
                    )}</div>
                </div>
            </div>
            <div class="post-content">
                <p>${post.content}</p>
                ${
                  post.image
                    ? `<img src="${post.image}" class="post-image" alt="Post image">`
                    : ""
                }
            </div>
            <div class="reactions">
                <button class="reaction-btn neu-element" data-type="like" data-post-id="${
                  post.id
                }">
                    <span>👍</span> ${post.reactions.likes}
                </button>
                <button class="reaction-btn neu-element" data-type="dislike" data-post-id="${
                  post.id
                }">
                    <span>👎</span> ${post.reactions.dislikes}
                </button>
                <button class="reaction-btn neu-element" data-type="love" data-post-id="${
                  post.id
                }">
                    <span>❤️</span> ${post.reactions.loves}
                </button>
            </div>
            <div class="comments-section">
                ${this.renderComments(post.comments)}
                <div class="comment-input-container">
                    <input type="text" class="comment-input neu-element" 
                           placeholder="Write a comment..." 
                           data-post-id="${post.id}">
                </div>
            </div>
        `;

    this.setupPostInteractions(postDiv, post);
    return postDiv;
  }

  setupPostInteractions(postElement, post) {
    // Reaction buttons
    postElement.querySelectorAll(".reaction-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const type = button.dataset.type;
        post.reactions[type + "s"]++;
        this.createParticles(button, type);
        this.renderPosts();
      });
    });

    // Comment input
    const commentInput = postElement.querySelector(".comment-input");
    commentInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && e.target.value.trim()) {
        this.addComment(post.id, e.target.value.trim());
        e.target.value = "";
      }
    });

    // Image modal
    const postImage = postElement.querySelector(".post-image");
    if (postImage) {
      postImage.addEventListener("click", () => {
        this.showImageModal(post.image);
      });
    }
  }

  createParticles(element, type) {
    const colors = {
      like: "#4CAF50",
      dislike: "#f44336",
      love: "#E91E63",
    };

    for (let i = 0; i < 12; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";

      const rect = element.getBoundingClientRect();
      const startX = rect.left + rect.width / 2;
      const startY = rect.top + rect.height / 2;

      // Random angle and distance
      const angle = Math.random() * Math.PI * 2;
      const distance = 50 + Math.random() * 50;

      particle.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
      particle.style.setProperty("--y", `${Math.sin(angle) * distance}px`);
      particle.style.left = `${startX}px`;
      particle.style.top = `${startY}px`;
      particle.style.backgroundColor = colors[type];

      document.body.appendChild(particle);

      // Remove particle after animation
      setTimeout(() => particle.remove(), 1000);
    }
  }

  renderComments(comments) {
    return comments
      .map(
        (comment) => `
      <div class="comment neu-element">
        <div class="comment-header">
          <img src="${comment.author.profilePic}" alt="${
          comment.author.name
        }" class="comment-author-img">
          <div class="comment-author-name">${comment.author.name}</div>
          <div class="comment-timestamp">${this.formatTimestamp(
            comment.timestamp
          )}</div>
        </div>
        <div class="comment-content">${comment.content}</div>
      </div>
    `
      )
      .join("");
  }

  addComment(postId, content) {
    const post = this.posts.find((p) => p.id === postId);
    if (post) {
      post.comments.push({
        id: Date.now(),
        author: {
          id: "current-user",
          name: "Current User",
          profilePic: "https://randomuser.me/api/portraits/lego/1.jpg",
        },
        content: content,
        timestamp: new Date().toISOString(),
      });
      this.renderPosts();
    }
  }

  formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    // Less than 1 minute
    if (diff < 60000) {
      return "Just now";
    }
    // Less than 1 hour
    if (diff < 3600000) {
      const minutes = Math.floor(diff / 60000);
      return `${minutes}m ago`;
    }
    // Less than 1 day
    if (diff < 86400000) {
      const hours = Math.floor(diff / 3600000);
      return `${hours}h ago`;
    }
    // More than 1 day
    return date.toLocaleDateString();
  }

  setupImageModal() {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    const closeBtn = document.querySelector(".close-modal");

    closeBtn.onclick = () => (modal.style.display = "none");
    window.onclick = (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    };
  }

  showImageModal(imageSrc) {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    modal.style.display = "block";
    modalImg.src = imageSrc;
  }
}

// Initialize Feed when document is loaded
document.addEventListener("DOMContentLoaded", () => {
  new Feed();
});
