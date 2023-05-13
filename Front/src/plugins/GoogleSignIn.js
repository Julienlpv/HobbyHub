

const GoogleSignIn = {
  install: async (app, options) => {
    try {
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/api.js";
        script.async = true;
        script.onload = () => {
          window.gapi.load("auth2", () => {
            window.gapi.auth2
              .init({
                client_id: options.clientId,
              })
              .then((authInstance) => {
                app.config.globalProperties.$googleAuth = authInstance;
                resolve();
              })
              .catch(reject);
          });
        };
        script.onerror = reject;
        document.head.appendChild(script);
      });
    } catch (error) {
      console.error("Error loading Google Sign-In:", error);
    }
  },
};


export default GoogleSignIn;
