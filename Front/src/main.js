import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/global.css';

const app = createApp(App);

app.use(router);



// app.use(GoogleSignIn, {
//   apiKey: "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", 
//   clientId: "83181114508-1l1n1th3k7koshk9vvoifomi0tgdqrgm.apps.googleusercontent.com",
//   version: "weekly"
// });





app.mount('#app');
