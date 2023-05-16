<template>
    <div class="form">
         <h1 v-if="message" class="alert">{{ message }}</h1>
        <h1>Sign In</h1>
        <form @submit.prevent="submitSignInForm">
            <input v-model="username" type="text" placeholder="Username" required />
            <input v-model="password" type="password" placeholder="Password" required />
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
    computed: {
        message() {
            return this.$route.query.message; // Récupération du message dans la query de l'URL
        }
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
                this.$router.push({ path: "/", query: { welcome: `Bienvenue ${this.username}!` } });
            } catch (error) {
                
            }
        },
        

    },
    
};
</script>


<style scoped>

.alert {
    color: red;
    text-align: center;
    margin-top: 50px;

}

.form {
    text-align: center;
    padding-top: 50px;
}

input {
    margin-right: 30px;
}

#google-signin-button {
    margin-right: 30px;
}

</style>