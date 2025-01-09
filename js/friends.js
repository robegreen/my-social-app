class Friends {
  constructor() {
    this.friends = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
        status: "online",
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
        status: "offline",
      },
      // Add more friends as needed
    ];

    this.friendsList = document.getElementById("friends-list");
    this.searchInput = document.getElementById("friends-search");

    this.init();
  }

  init() {
    this.renderFriendsList();
    this.setupSearch();
    this.setupDragAndDrop();
  }

  renderFriendsList(filteredFriends = this.friends) {
    this.friendsList.innerHTML = filteredFriends
      .map(
        (friend, index) => `
                <li class="friend-item neu-element" draggable="true" data-friend-id="${friend.id}">
                    <div class="friend-info">
                        <img src="${friend.profilePic}" alt="${friend.firstName}" class="friend-img">
                        <div class="friend-details">
                            <h3>${friend.firstName} ${friend.lastName}</h3>
                            <span class="friend-status ${friend.status}">${friend.status}</span>
                        </div>
                    </div>
                    <button class="message-btn neu-element" data-friend-id="${friend.id}">
                        Message
                    </button>
                </li>
            `
      )
      .join("");

    this.setupMessageButtons();
  }

  setupSearch() {
    this.searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const filteredFriends = this.friends.filter((friend) =>
        `${friend.firstName} ${friend.lastName}`
          .toLowerCase()
          .includes(searchTerm)
      );
      this.renderFriendsList(filteredFriends);
    });
  }

  setupDragAndDrop() {
    let draggedItem = null;

    this.friendsList.addEventListener("dragstart", (e) => {
      draggedItem = e.target;
      e.target.classList.add("dragging");
    });

    this.friendsList.addEventListener("dragend", (e) => {
      e.target.classList.remove("dragging");
    });

    this.friendsList.addEventListener("dragover", (e) => {
      e.preventDefault();
      const afterElement = this.getDragAfterElement(e.clientY);
      const draggable = document.querySelector(".dragging");

      if (afterElement) {
        this.friendsList.insertBefore(draggable, afterElement);
      } else {
        this.friendsList.appendChild(draggable);
      }
    });
  }

  getDragAfterElement(y) {
    const draggableElements = [
      ...this.friendsList.querySelectorAll(".friend-item:not(.dragging)"),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  setupMessageButtons() {
    const messageButtons = document.querySelectorAll(".message-btn");
    messageButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const friendId = parseInt(button.dataset.friendId);
        this.openMessaging(friendId);
      });
    });
  }

  openMessaging(friendId) {
    // Navigate to messaging page and open conversation
    document.querySelector('[data-page="messaging"]').click();
    // You would need to implement the logic to open the specific conversation
  }
}

// Initialize Friends when document is loaded
document.addEventListener("DOMContentLoaded", () => {
  new Friends();
});
