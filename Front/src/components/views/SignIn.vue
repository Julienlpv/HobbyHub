<template>
    <div>
        <h1>Sign In</h1>
        <form @submit.prevent="submitSignInForm">
            <input v-model="username" type="text" placeholder="Username" required />
            <input v-model="password" type="password" placeholder="Password" required />
            <!-- Change the div to a link that redirects to your backend's Google auth route -->
            <a href="http://localhost:3000/auth/google" id="google-signin-button">Sign in with Google</a>

            <button type="submit">Sign In</button>
        </form>
    </div>
</template>

<script>

import api from "@/services/api";
import { onMounted } from "vue";

export default {
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        async submitSignInForm() {
            try {
                const response = await api.post('/signin', {
                    username: this.username,
                    password: this.password,
                });

                const token = response.data.token;
                localStorage.setItem("authToken", token); // Stockage du token dans le localStorage
                this.isAuthenticated = true;
                this.$router.push("/"); // Redirection après connexion
            } catch (error) {
                
            }
        },
        

    },
    
};
</script>
