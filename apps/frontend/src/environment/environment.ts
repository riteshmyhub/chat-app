const ENVIRONMENT = Object.freeze({
   production: true,
   get BASE_URL() {
      return this.production ? "https://chat-app-onh1.onrender.com" : "http://localhost:8000";
   },
});
export default ENVIRONMENT;
