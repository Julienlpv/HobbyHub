<template>
    <div>
        <h1>Sign In</h1>
        <form @submit.prevent="submitSignInForm">
            <input v-model="username" type="text" placeholder="Username" required />
            <input v-model="password" type="password" placeholder="Password" required />
            <button type="submit">Sign In</button>
        </form>
    </div>
</template>

<script>

import api from "@/services/api";

export default {
    data() {
        return {
            username: "",
            password: "",
        };
    },
    methods: {
        async submitSignInForm() {
            try {
                const response = await api.post("/signin", {
                    username: this.username,
                    password: this.password,
                });

                const token = response.data.token;
                // Stockez le token dans localStorage ou dans le Vuex store
                // Redirigez l'utilisateur vers une page protégée ou la page d'accueil
            } catch (error) {
                // Gérez les erreurs de connexion (par exemple, affichez un message d'erreur)
            }
        },
    },
};
</script>
