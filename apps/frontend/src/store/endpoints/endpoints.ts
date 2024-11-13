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
         CHANGE_RINGTONES: "/settings/change-ringtone",
      },
      CHANNEL: {
         CREATE_CHANNEL: "/user/create-channel",
         GET_CHANNELS: "/user/get-channels",
         GET_CHANNEL_DETAILS: (channelID: string) => `/user/get-channels/${channelID}`,
         ADD_MEMBERS: "/user/add-members",
         REMOVE_MEMBER: "/user/remove-member",
      },
   },
   CHAT: {
      GET_CHATS_DETAILS: (chatID: string) => `/chat/chat-details/${chatID}`,
      MESSAGES: {
         GET_MESSAGES: (chatID: string) => `/chat/get-messages/${chatID}`,
         DELETE_MESSAGES: (chatID: string) => `/chat/delete-messages/${chatID}`,
      },
   },
});

export default ENDPOINTS;
