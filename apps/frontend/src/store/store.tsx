import { configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import { authReducer, authService } from "./services/auth.service";
import { useEffect } from "react";
import { SplashScreen } from "@/components";
import toastMiddleware from "./middlewares/toast.middleware";
import { chatReducer } from "./services/chat.service";

export const store = configureStore({
   reducer: {
      auth: authReducer,
      chat: chatReducer,
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
   const { loadings, token } = useAppSelector((state) => state.auth);

   useEffect(() => {
      if (token) {
         dispatch(authService.getSession.api());
         dispatch(authService.getRingtones.api());
      }
      return () => {};
   }, [token]);

   return loadings.getSession && token ? <SplashScreen /> : <>{children}</>;
}

export default ReduxProvider;

/*
{
   user1:{
     id:1,
     contacts:[2]
   },
   user2:{
     id:2,
     contacts:[1]
   },
   user3:{
     id:3,
     contacts:[]
   },
   user4:{
     id:4,
     contacts:[1]
   },
}

*/
