const postsData = [
  {
    id: 1,
    author: {
      id: 1,
      name: "John Doe",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    content: "Just finished working on an amazing project! #coding #webdev",
    image: "https://picsum.photos/800/600?random=1",
    timestamp: new Date("2024-03-20T10:30:00").toISOString(),
    reactions: {
      likes: 15,
      dislikes: 2,
      loves: 25,
    },
    comments: [
      {
        id: 1,
        author: {
          id: 2,
          name: "Jane Smith",
          profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
        },
        content: "This looks fantastic! Great work! 👏",
        timestamp: new Date("2024-03-20T10:35:00").toISOString(),
      },
    ],
  },
  {
    id: 2,
    author: {
      id: 3,
      name: "Alice Johnson",
      profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    content: "Beautiful sunset at the beach today! 🌅",
    image: "https://picsum.photos/800/600?random=2",
    timestamp: new Date("2024-03-20T09:15:00").toISOString(),
    reactions: {
      likes: 45,
      dislikes: 0,
      loves: 67,
    },
    comments: [],
  },
];
