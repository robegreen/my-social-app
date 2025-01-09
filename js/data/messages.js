const conversationsData = [
  {
    id: 1,
    participant: {
      id: 101,
      name: "Jane Smith",
      profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
      status: "online",
    },
    messages: [
      {
        id: 1,
        senderId: 101,
        content: "Hey, how are you?",
        timestamp: "2024-03-20T10:30:00Z",
        isRead: true,
      },
      {
        id: 2,
        senderId: "current-user",
        content: "I'm good, thanks! How about you?",
        timestamp: "2024-03-20T10:31:00Z",
        isRead: true,
      },
    ],
    lastActivity: "2024-03-20T10:31:00Z",
  },
  {
    id: 2,
    participant: {
      id: 102,
      name: "John Doe",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
      status: "offline",
    },
    messages: [
      {
        id: 3,
        senderId: "current-user",
        content: "Did you see the new project requirements?",
        timestamp: "2024-03-20T09:15:00Z",
        isRead: true,
      },
    ],
    lastActivity: "2024-03-20T09:15:00Z",
  },
];
