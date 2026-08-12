import { PostsResponse } from "../types/posts";

export const postsData: PostsResponse = {
  message: "success",

  paginationInfo: {
    currentPage: 1,
    numberOfPage: 10,
    limit: 10,
    nextPage: 2,
    total: 100
  },

  Posts: [
    {
      _id: "post001",
      body: "Learning Next.js is amazing 🚀 Building modern apps with App Router and TypeScript.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",

      user: {
        _id: "user001",
        name: "Ahmed Ali",
        photo: "https://randomuser.me/api/portraits/men/1.jpg"
      },

      createdAt: "2026-08-08T10:00:00Z",

      comments: [
        {
          _id: "comment001",
          content: "Great post! Next.js is really powerful.",
          commentCreator: {
            _id: "user002",
            name: "Sara Mohamed",
            photo: "https://randomuser.me/api/portraits/women/2.jpg"
          },
          post: "post001",
          createdAt: "2026-08-08T10:30:00Z"
        },
        {
          _id: "comment002",
          content: "I am learning Next.js too!",
          commentCreator: {
            _id: "user003",
            name: "Omar Hassan",
            photo: "https://randomuser.me/api/portraits/men/3.jpg"
          },
          post: "post001",
          createdAt: "2026-08-08T11:00:00Z"
        }
      ]
    },

    {
      _id: "post002",
      body: "Just finished my first full stack project using React and Node.js 🎉",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",

      user: {
        _id: "user004",
        name: "Mona Adel",
        photo: "https://randomuser.me/api/portraits/women/4.jpg"
      },

      createdAt: "2026-08-07T14:20:00Z",

      comments: [
        {
          _id: "comment003",
          content: "Congratulations! Keep going 👏",
          commentCreator: {
            _id: "user001",
            name: "Ahmed Ali",
            photo: "https://randomuser.me/api/portraits/men/1.jpg"
          },
          post: "post002",
          createdAt: "2026-08-07T15:00:00Z"
        }
      ]
    },

    {
      _id: "post003",
      body: "Beautiful morning to start learning something new ☀️",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",

      user: {
        _id: "user005",
        name: "Youssef Khaled",
        photo: "https://randomuser.me/api/portraits/men/5.jpg"
      },

      createdAt: "2026-08-06T08:15:00Z",

      comments: []
    },

    {
      _id: "post004",
      body: "Working on improving my frontend skills and exploring advanced CSS techniques.",
      image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd",

      user: {
        _id: "user006",
        name: "Nour Ahmed",
        photo: "https://randomuser.me/api/portraits/women/6.jpg"
      },

      createdAt: "2026-08-05T16:45:00Z",

      comments: [
        {
          _id: "comment004",
          content: "CSS animations are fun!",
          commentCreator: {
            _id: "user007",
            name: "Karim Adel",
            photo: "https://randomuser.me/api/portraits/men/7.jpg"
          },
          post: "post004",
          createdAt: "2026-08-05T17:00:00Z"
        },
        {
          _id: "comment005",
          content: "Can you share resources?",
          commentCreator: {
            _id: "user008",
            name: "Laila Hassan",
            photo: "https://randomuser.me/api/portraits/women/8.jpg"
          },
          post: "post004",
          createdAt: "2026-08-05T17:30:00Z"
        }
      ]
    },

    {
      _id: "post005",
      body: "Today I learned about React Server Components. They are amazing!",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",

      user: {
        _id: "user009",
        name: "Hana Ibrahim",
        photo: "https://randomuser.me/api/portraits/women/9.jpg"
      },

      createdAt: "2026-08-04T12:00:00Z",

      comments: [
        {
          _id: "comment006",
          content: "Server Components changed everything.",
          commentCreator: {
            _id: "user010",
            name: "Mostafa Samir",
            photo: "https://randomuser.me/api/portraits/men/10.jpg"
          },
          post: "post005",
          createdAt: "2026-08-04T13:00:00Z"
        }
      ]
    },

    {
      _id: "post006",
      body: "My favorite tools for frontend development in 2026 💻",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",

      user: {
        _id: "user011",
        name: "Salma Ali",
        photo: "https://randomuser.me/api/portraits/women/11.jpg"
      },

      createdAt: "2026-08-03T09:00:00Z",

      comments: []
    },

    {
      _id: "post007",
      body: "Debugging is not a problem, it is a learning process.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",

      user: {
        _id: "user012",
        name: "Khaled Mahmoud",
        photo: "https://randomuser.me/api/portraits/men/12.jpg"
      },

      createdAt: "2026-08-02T18:30:00Z",

      comments: [
        {
          _id: "comment007",
          content: "Exactly! Every bug teaches something.",
          commentCreator: {
            _id: "user004",
            name: "Mona Adel",
            photo: "https://randomuser.me/api/portraits/women/4.jpg"
          },
          post: "post007",
          createdAt: "2026-08-02T19:00:00Z"
        }
      ]
    },

    {
      _id: "post008",
      body: "Exploring Tailwind CSS and building beautiful interfaces.",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb",

      user: {
        _id: "user013",
        name: "Aya Mohamed",
        photo: "https://randomuser.me/api/portraits/women/13.jpg"
      },

      createdAt: "2026-08-01T15:20:00Z",

      comments: []
    },

    {
      _id: "post009",
      body: "Clean code makes development easier and teamwork better.",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea",

      user: {
        _id: "user014",
        name: "Mostafa Ali",
        photo: "https://randomuser.me/api/portraits/men/14.jpg"
      },

      createdAt: "2026-07-31T11:10:00Z",

      comments: [
        {
          _id: "comment008",
          content: "Clean code is very important.",
          commentCreator: {
            _id: "user006",
            name: "Nour Ahmed",
            photo: "https://randomuser.me/api/portraits/women/6.jpg"
          },
          post: "post009",
          createdAt: "2026-07-31T12:00:00Z"
        }
      ]
    },

    {
      _id: "post010",
      body: "Starting a new journey in software engineering 🚀",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",

      user: {
        _id: "user015",
        name: "Omar Adel",
        photo: "https://randomuser.me/api/portraits/men/15.jpg"
      },

      createdAt: "2026-07-30T09:45:00Z",

      comments: []
    }
  ]
};