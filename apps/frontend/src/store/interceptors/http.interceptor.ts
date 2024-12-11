import axios, { AxiosInstance, AxiosError } from "axios";

export default class HttpInterceptor {
   private privateAxios: AxiosInstance;

   private get BASE_URL() {
      return `/api/v1`;
   }

   constructor() {
      this.privateAxios = axios.create({
         baseURL: this.BASE_URL,
         headers: {},
         withCredentials: true,
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

   private removeToken = async () => {
      localStorage.clear();
      setTimeout(() => {
         window.location.replace("/auth/login");
      }, 500);
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
            if (data?.error?.status === 401) this.removeToken();
            if (data?.error?.status === 403) this.removeToken();
            return Promise.reject(error);
         }
      );
   };

   protected get http(): AxiosInstance {
      return new HttpInterceptor().privateAxios;
   }
}
