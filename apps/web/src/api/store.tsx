import { configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import toastMiddleware from "./middlewares/toast.middleware";
import { authReducer } from "./services/auth.service";
import { contactReducer } from "./services/contect.service";
import { chatReducer } from "./services/chat.service";
import { messageReducer } from "./services/message.service";
import { channelReducer } from "./services/channel.service";

export const store = configureStore({
   reducer: {
      authReducer: authReducer,
      contactReducer: contactReducer,
      chatReducer: chatReducer,
      messageReducer: messageReducer,
      channelReducer: channelReducer,
   },
   middleware(getDefaultMiddleware) {
      return getDefaultMiddleware().concat(toastMiddleware);
   },
});

/*----------------------ReduxProvider-----------------*/
type Props = { children?: Readonly<React.ReactNode> };

export const ReduxProvider = ({ children }: Props) => <Provider store={store}>{children}</Provider>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
