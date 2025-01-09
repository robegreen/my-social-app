class Messaging {
  constructor() {
    this.conversations = conversationsData;
    this.currentConversation = null;
    this.conversationsList = document.querySelector(".conversations-list");
    this.messagesContainer = document.getElementById("messages-container");
    this.messageInput = document.getElementById("message-input");
    this.sendButton = document.getElementById("send-message");

    this.init();
  }

  init() {
    this.renderConversationsList();
    this.setupEventListeners();

    // Open first conversation by default
    if (this.conversations.length > 0) {
      this.openConversation(this.conversations[0].id);
    }
  }

  setupEventListeners() {
    this.sendButton.addEventListener("click", () => this.sendMessage());
    this.messageInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.sendMessage();
      }
    });
  }

  renderConversationsList() {
    this.conversationsList.innerHTML = this.conversations
      .map(
        (conv) => `
                <div class="conversation-item neu-element ${
                  this.currentConversation?.id === conv.id ? "active" : ""
                }" 
                     data-conversation-id="${conv.id}">
                    <div class="participant-img-container">
                        <img src="${conv.participant.profilePic}" 
                             alt="${conv.participant.name}" 
                             class="participant-img">
                        <span class="status-indicator ${
                          conv.participant.status === "online"
                            ? "status-online"
                            : "status-offline"
                        }"></span>
                    </div>
                    <div class="conversation-info">
                        <h3>${conv.participant.name}</h3>
                        <p class="last-message">${this.getLastMessage(conv)}</p>
                        <span class="timestamp">${this.formatTimestamp(
                          conv.lastActivity
                        )}</span>
                    </div>
                </div>
            `
      )
      .join("");

    // Add click listeners to conversation items
    this.conversationsList
      .querySelectorAll(".conversation-item")
      .forEach((item) => {
        item.addEventListener("click", () => {
          const convId = parseInt(item.dataset.conversationId);
          this.openConversation(convId);
        });
      });
  }

  getLastMessage(conversation) {
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    if (!lastMessage) return "No messages yet";
    return lastMessage.content.length > 30
      ? lastMessage.content.substring(0, 30) + "..."
      : lastMessage.content;
  }

  openConversation(conversationId) {
    this.currentConversation = this.conversations.find(
      (c) => c.id === conversationId
    );
    this.renderConversationsList(); // Update active state
    this.renderMessages();
  }

  renderMessages() {
    if (!this.currentConversation) return;

    this.messagesContainer.innerHTML = this.currentConversation.messages
      .map(
        (msg) => `
                <div class="message neu-element ${
                  msg.senderId === "current-user" ? "sent" : "received"
                }">
                    ${
                      msg.senderId !== "current-user"
                        ? `
                        <div class="message-author">
                            <img src="${this.currentConversation.participant.profilePic}" 
                                 alt="${this.currentConversation.participant.name}" 
                                 class="message-author-img">
                        </div>
                    `
                        : ""
                    }
                    <div class="message-content">
                        <p>${msg.content}</p>
                        <span class="message-timestamp">${this.formatTimestamp(
                          msg.timestamp
                        )}</span>
                    </div>
                </div>
            `
      )
      .join("");

    // Scroll to bottom
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  sendMessage() {
    const content = this.messageInput.value.trim();
    if (!content || !this.currentConversation) return;

    const newMessage = {
      id: Date.now(),
      senderId: "current-user",
      content: content,
      timestamp: new Date().toISOString(),
      isRead: false,
    };

    this.currentConversation.messages.push(newMessage);
    this.currentConversation.lastActivity = newMessage.timestamp;
    this.messageInput.value = "";

    this.renderMessages();
    this.renderConversationsList();
  }

  formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  }
}

// Initialize Messaging when document is loaded
document.addEventListener("DOMContentLoaded", () => {
  new Messaging();
});
