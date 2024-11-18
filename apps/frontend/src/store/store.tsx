import { configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import toastMiddleware from "./middlewares/toast.middleware";
import { authReducer, authService } from "./services/auth.service";
import { useEffect } from "react";
import { SplashScreen } from "@/components/splash-screen/splash-screen";
import { contactReducer } from "./services/contect.service";
import { chatReducer } from "./services/chat.service";
import { channelReducer } from "./services/channel.service";

export const store = configureStore({
   reducer: {
      auth: authReducer,
      contact: contactReducer,
      chat: chatReducer,
      channel: channelReducer,
   },
   middleware(getDefaultMiddleware) {
      return getDefaultMiddleware().concat(toastMiddleware);
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

type Props = {
   children?: Readonly<React.ReactNode>;
};

/*----------------------ReduxProvider-----------------*/
const ReduxProvider = ({ children }: Props) => (
   <Provider store={store}>
      <AppProvider>{children}</AppProvider>
   </Provider>
);

/* -------------------- AppProvider ------------------*/
function AppProvider({ children }: Props) {
   const dispatch = useAppDispatch();
   const { loadings } = useAppSelector((state) => state.auth);

   useEffect(() => {
      dispatch(authService.getSession.api());
      return () => {};
   }, []);

   return loadings.getSession ? <SplashScreen /> : <>{children}</>;
}

export default ReduxProvider;
