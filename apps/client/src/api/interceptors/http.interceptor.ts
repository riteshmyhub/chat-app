import axios, { AxiosInstance, AxiosError } from "axios";

export default class HttpInterceptor {
   private PRODUCTION = !Boolean(location.hostname === "localhost");
   private privateAxios: AxiosInstance;

   private get BASE_URL() {
      return this.PRODUCTION ? `https://chat-app-onh1.onrender.com/api/v1` : "http://localhost:8000/api/v1";
   }

   constructor() {
      this.privateAxios = axios.create({
         baseURL: this.BASE_URL,
         headers: {},
      });
      this.httpInterceptor();
   }

   private getToken = async () => {
      const accessToken = localStorage.getItem("accessToken") as string;
      return accessToken;
   };

   private setLoading(loading: boolean) {
      const event = new CustomEvent("loading", { detail: loading });
      window.dispatchEvent(event);
   }

   protected clear = async () => {
      localStorage.clear();
      setTimeout(() => window.location.replace("/auth/login"), 500);
   };

   protected errorMessage = (error: any) => {
      if (error?.response) {
         return { message: error?.response?.data.error.message || "Server error occurred" };
      } else {
         return { message: error?.message || "An unknown error occurred." };
      }
   };

   private httpInterceptor = async () => {
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
            if (data?.error?.status === 401) this.clear();
            if (data?.error?.status === 403) this.clear();
            return Promise.reject(error);
         }
      );
   };

   protected get http(): AxiosInstance {
      return new HttpInterceptor().privateAxios;
   }
}
