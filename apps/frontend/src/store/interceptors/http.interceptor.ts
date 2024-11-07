import toast from "react-hot-toast";
import axios, { AxiosInstance, AxiosError } from "axios";

export default class HttpInterceptor {
   private privateAxios: AxiosInstance;
   private publicAxios: AxiosInstance;

   public static get SERVER_URL() {
      const isProdution = true;
      return isProdution ? "https://chat-hrm.vercel.app" : `http://${location.hostname}:8000`;
   }

   private get BASE_URL() {
      return `${HttpInterceptor.SERVER_URL}/api/v1`;
   }

   constructor() {
      this.privateAxios = axios.create({
         baseURL: this.BASE_URL,
         headers: {},
         withCredentials: true,
      });

      this.publicAxios = axios.create({
         baseURL: this.BASE_URL,
         headers: {},
      });

      this.privateInterceptor();
      this.publicInterceptor();
   }

   private getToken = async () => {
      const accessToken = localStorage.getItem("accessToken") as string;
      return accessToken;
   };

   private setLoading(loading: boolean) {
      const event = new CustomEvent("loading", { detail: loading });
      window.dispatchEvent(event);
   }

   private removeToken = async () => {
      localStorage.removeItem("accessToken");
      this.toaster("session expired", "default");
      setTimeout(() => {
         window.location.replace("/auth/login");
      }, 500);
   };

   protected toaster = (message: any, variant?: "default" | "error" | "done" | null) => {
      switch (variant) {
         case "error":
            toast.error(message?.response?.data?.error?.message);
            break;
         case "done":
            toast.success(message);
            break;
         default:
            toast(message);
            break;
      }
   };

   protected errorMessage = (error: any) => {
      if (axios.isAxiosError(error)) {
         return { message: error?.response?.data.error.message || "Server error occurred" };
      } else {
         return { message: "Network error occurred" };
      }
   };
   protected saveToken = async (accessToken: string) => {
      localStorage.setItem("accessToken", accessToken);
   };

   private publicInterceptor = async () => {
      this.publicAxios.interceptors.request.use(
         (config) => {
            this.setLoading(true);
            return config;
         },
         (error) => {
            this.setLoading(false);
            return Promise.reject(error);
         }
      );

      this.publicAxios.interceptors.response.use(
         (response) => {
            this.setLoading(false);
            return response;
         },
         (error) => {
            this.setLoading(false);
            return Promise.reject(error);
         }
      );
   };

   private privateInterceptor = async () => {
      this.privateAxios.interceptors.request.use(
         async (config) => {
            this.setLoading(true);
            const authToken = await this.getToken();
            if (authToken) {
               config.headers = { ...config.headers, Authorization: `bearer ${authToken}` } as any;
            }
            return config;
         },
         (error: AxiosError) => {
            this.setLoading(false);
            return Promise.reject(error);
         }
      );
      this.privateAxios.interceptors.response.use(
         async (response) => {
            this.setLoading(false);
            return response;
         },
         async (error: AxiosError) => {
            this.setLoading(false);
            const data = error.response?.data as { error: { status: number } };
            if (data?.error?.status === 401) this.removeToken();
            if (data?.error?.status === 403) this.removeToken();
            return Promise.reject(error);
         }
      );
   };

   protected get publicHttp(): AxiosInstance {
      return new HttpInterceptor().publicAxios;
   }

   protected get privateHttp(): AxiosInstance {
      return new HttpInterceptor().privateAxios;
   }
}
