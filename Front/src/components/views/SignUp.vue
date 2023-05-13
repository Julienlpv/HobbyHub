<template>
    <div class="signup">
        <h1>Inscription</h1>
        <form @submit.prevent="submitForm">
            <div>
                <label for="username">Nom d'utilisateur:</label>
                <input id="username" v-model="username" type="text" required />
            </div>
            <div>
                <label for="password">Mot de passe:</label>
                <input id="password" v-model="password" type="password" required />
            </div>
            <button type="submit">S'inscrire</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: "",
            password: ""
        };
    },
    methods: {
        async submitForm() {
            try {
                const response = await fetch("http://localhost:3000/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Inscription réussie", data);
                    window.alert('Inscription réussie, veuillez vous connecter');
                    this.$router.push('/signin'); // Redirection vers la page de connexion
                } else {
                    console.error("Erreur lors de l'inscription", response);
                }
            } catch (error) {
                console.error("Erreur lors de l'inscription", error);
            }
        }
    }
};
</script>

<style scoped>
.signup {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
    padding: 1em;
    box-sizing: border-box;
}

.signup input {
    width: 100%;
    margin-bottom: 1em;
}
</style>
