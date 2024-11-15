const ENVIRONMENT = Object.freeze({
   production: true,
   get BASE_URL() {
      return this.production ? "https://chat-app-onh1.onrender.com" : "http://192.168.1.153:8000";
   },
});
export default ENVIRONMENT;
