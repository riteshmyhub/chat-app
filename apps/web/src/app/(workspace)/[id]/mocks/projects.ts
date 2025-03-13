const sprints = [
   {
      _id: "1",
      title: "auth",
      isCompleted: false,
      started_on: "2025-03-10",
      end_on: null,
      description: "Implement a secure authentication module, including user login, signup, password recovery, and session management with JWT-based authentication.",
   },
   {
      _id: "2",
      isCompleted: false,
      title: "dashboard",
      started_on: "2025-03-10",
      end_on: null,
      description: "Develop an interactive user dashboard with real-time data visualization, personalized widgets, and seamless API integration for dynamic content updates.",
   },
   {
      _id: "3",
      isCompleted: false,
      title: "payments",
      started_on: null,
      end_on: null,
      description: "Integrate a secure payment gateway supporting multiple payment methods, transaction history, automated invoicing, and real-time status updates for completed transactions.",
   },
   {
      _id: "4",
      isCompleted: false,
      title: "notifications",
      started_on: null,
      end_on: null,
      description: "Implement a comprehensive real-time notification system, including email, push notifications, and in-app alerts with user preferences and scheduling options.",
   },
   {
      _id: "5",
      isCompleted: false,
      title: "settings",
      started_on: null,
      end_on: null,
      description: "Develop a user settings module allowing profile management, theme customization, security preferences, and integration settings with third-party services.",
   },
   {
      _id: "6",
      isCompleted: false,
      title: "reports",
      started_on: null,
      end_on: null,
      description: "Generate comprehensive reports with detailed analytics, export options in PDF/Excel, data filtering capabilities, and graphical insights for business performance.",
   },
   {
      _id: "7",
      isCompleted: false,
      title: "analytics",
      started_on: null,
      end_on: null,
      description: "Develop an advanced analytics module with AI-driven insights, predictive analytics, user behavior tracking, and custom reporting dashboards for decision-making.",
   },
];

const features = [
   {
      _id: "1",
      sprint: "auth",
      title: "User Authentication",
      description: "Implement user login and registration",
      note: "Use JWT for authentication",
      isCompleted: true,
   },
   {
      _id: "2",
      sprint: "auth",
      title: "Forgot Password",
      description: "Forgot password flow",
      note: "Send reset link via email",
      isCompleted: true,
   },
   {
      _id: "3",
      sprint: "auth",
      title: "Two-Factor Authentication",
      description: "Enable two-factor authentication",
      note: "Support SMS and email verification",
      isCompleted: true,
   },

   // Dashboard Features
   {
      _id: "4",
      sprint: "dashboard",
      title: "User Profile Page",
      description: "Create and manage user profile",
      note: "Include avatar and settings",
      isCompleted: false,
   },
   {
      _id: "5",
      sprint: "dashboard",
      title: "Activity Logs",
      description: "Display user activity logs",
      note: "Show recent actions",
      isCompleted: false,
   },
   {
      _id: "6",
      sprint: "dashboard",
      title: "Dark Mode",
      description: "Add dark mode toggle",
      note: "Save user preference in local storage",
      isCompleted: false,
   },

   // Payments Features
   {
      _id: "7",
      sprint: "payments",
      title: "Stripe Integration",
      description: "Integrate Stripe for payments",
      note: "Support recurring payments",
      isCompleted: false,
   },
   {
      _id: "8",
      sprint: "payments",
      title: "Transaction History",
      description: "Allow users to view payment history",
      note: "Enable export to CSV",
      isCompleted: false,
   },
   {
      _id: "9",
      sprint: "payments",
      title: "Refund Requests",
      description: "Implement refund request functionality",
      note: "Allow users to request refunds within 7 days",
      isCompleted: false,
   },

   // Notifications Features
   {
      _id: "10",
      sprint: "notifications",
      title: "Real-Time Notifications",
      description: "Enable real-time updates for users",
      note: "Use WebSockets for instant updates",
      isCompleted: false,
   },
   {
      _id: "11",
      sprint: "notifications",
      title: "Email Notifications",
      description: "Customize email notification preferences",
      note: "Allow users to enable/disable specific email alerts",
      isCompleted: false,
   },
   {
      _id: "12",
      sprint: "notifications",
      title: "Push Notifications",
      description: "Enable push notifications",
      note: "Use Firebase Cloud Messaging (FCM)",
      isCompleted: false,
   },

   // Settings Features
   {
      _id: "13",
      sprint: "settings",
      title: "Account Deletion",
      description: "Allow users to delete their accounts",
      note: "Require confirmation before deleting account",
      isCompleted: false,
   },
   {
      _id: "14",
      sprint: "settings",
      title: "Language Selection",
      description: "Support multiple languages",
      note: "Provide options for English, Spanish, and French",
      isCompleted: false,
   },
   {
      _id: "15",
      sprint: "settings",
      title: "Privacy Settings",
      description: "Manage user privacy settings",
      note: "Allow users to control data sharing",
      isCompleted: false,
   },

   // Reports Features
   {
      _id: "16",
      sprint: "reports",
      title: "Financial Reports",
      description: "Generate monthly financial reports",
      note: "Export data in PDF and Excel format",
      isCompleted: false,
   },
   {
      _id: "17",
      sprint: "reports",
      title: "User Activity Reports",
      description: "Track and display user activity",
      note: "Monitor login and transaction history",
      isCompleted: false,
   },
   {
      _id: "18",
      sprint: "reports",
      title: "Error Logs",
      description: "Display system and application errors",
      note: "Enable filtering by error type",
      isCompleted: false,
   },

   // Analytics Features
   {
      _id: "19",
      sprint: "analytics",
      title: "User Engagement",
      description: "Analyze user activity and behavior",
      note: "Track session duration and active users",
      isCompleted: false,
   },
   {
      _id: "20",
      sprint: "analytics",
      title: "Sales Performance",
      description: "Display sales and revenue trends",
      note: "Visualize data with charts",
      isCompleted: false,
   },
   {
      _id: "21",
      sprint: "analytics",
      title: "Conversion Tracking",
      description: "Monitor conversion rates",
      note: "Analyze signup-to-purchase ratio",
      isCompleted: false,
   },
];

const projectMock = {
   image: "https://static.businessworld.in/Picture1_20250201185810_original_image_40.webp",
   name: "UPI Zone",
   createdAt: "12 jan 2025",
   release_plan: "23 nov 2025",
   platform: "mobile",
   technologies: ["react", "python"],
   description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam maxime eligendi vitae, cumque molestias quidem amet a aspernatur dolores tenetur eveniet, reiciendis eius molestiae laboriosam aliquid, alias consequatur qui doloremque.",
   teams: [
      {
         name: "ritesh goswami",
         designation: "react",
         avatar: "https://res.cloudinary.com/project-buddy/image/upload/v1741678461/users/67cc15ee6b6a57106ac990e5/67cc15ee6b6a57106ac990e5.png",
         email: "ritesh@gmail.com",
      },
   ],
   features: features,
   sprints: sprints,
};

export default projectMock;
