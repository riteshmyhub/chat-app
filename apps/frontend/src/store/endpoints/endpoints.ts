const ENDPOINTS = Object.seal({
   AUTH: {
      LOGIN: "/auth/login",
      GET_SESSION: "/auth/session",
      REGISTER: "/auth/register",
      LOGOUT: "/auth/logout",
   },
   USER: {
      CREATE_PROFILE: "/user/profile",
      SEARCH_USER: "/user/search",
      GET_CONTACTS: "/user/get-contacts",
      GET_CONTACTS_DETAILS: (id: string) => `/user/get-contacts/${id}`,
      ADD_CONTACT: "/user/add-contact",
      DELETE_CONTACT: (id: string) => `/user/delete-contact/${id}`,
      SETTING: {
         GET_RINGTONES: "/user/settings/get-ringtones",
         CHANGE_RINGTONES: "/user/settings/change-ringtone",
      },
   },
   CHAT: {
      CREATE_CHAT: "/chat/create-chat",
      GET_CHATS: "/chat/get-chats",
      GET_CHATS_DETAILS: (chatID: string) => `/chat/details-chat/${chatID}`,
      DELETE_CHAT: (chatID: string) => `/chat/delete-chat/${chatID}`,
      MESSAGES: {
         GET_MESSAGES: (chatID: string) => `/chat/get-messages/${chatID}`,
         DELETE_MESSAGES: (chatID: string) => `/chat/delete-messages/${chatID}`,
      },
      CHANNEL: {
         ADD_MEMBERS: "/chat/channel/add-members",
         REMOVE_MEMBERS: "/chat/channel/remove-member",
      },
   },
});

export default ENDPOINTS;
