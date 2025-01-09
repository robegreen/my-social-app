class App {
  constructor() {
    this.currentPage = "feed";
    this.pages = {
      feed: null,
      messaging: null,
      friends: null,
    };
    this.init();
  }

  init() {
    // Setup navigation
    this.setupNavigation();

    // Initialize page classes
    this.pages.feed = new Feed();
    this.pages.messaging = new Messaging();
    this.pages.friends = new Friends();

    // Handle browser back/forward buttons
    window.addEventListener("popstate", (e) => {
      if (e.state && e.state.page) {
        this.navigateToPage(e.state.page, false);
      }
    });

    // Handle initial URL
    const initialPage = window.location.hash.replace("#", "") || "feed";
    this.navigateToPage(initialPage, false);
  }

  setupNavigation() {
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = link.dataset.page;
        this.navigateToPage(page);
      });
    });
  }

  navigateToPage(pageName, pushState = true) {
    // Update navigation active state
    document.querySelectorAll("nav a").forEach((link) => {
      link.classList.toggle("active", link.dataset.page === pageName);
    });

    // Hide all pages and show the selected one
    document.querySelectorAll(".page").forEach((page) => {
      page.classList.toggle("active", page.id === `${pageName}-page`);
    });

    // Update current page
    this.currentPage = pageName;

    // Update URL
    if (pushState) {
      const url = `#${pageName}`;
      window.history.pushState({ page: pageName }, "", url);
    }

    // Trigger page-specific updates
    this.updateCurrentPage();
  }

  updateCurrentPage() {
    // Refresh current page content if needed
    switch (this.currentPage) {
      case "feed":
        this.pages.feed.renderPosts();
        break;
      case "messaging":
        this.pages.messaging.renderConversationsList();
        break;
      case "friends":
        this.pages.friends.renderFriendsList();
        break;
    }
  }
}

// Initialize the app when document is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.app = new App();
});
