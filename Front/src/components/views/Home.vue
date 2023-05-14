<template>
    <div class="home">
        <h1>HobbyHub</h1>
        <p v-if="!isAuthenticated">
            Veuillez vous
            <router-link to="/signin">connecter</router-link>
            ou vous
            <router-link to="/signup">inscrire</router-link>
        </p>
        <div v-if="welcomeMessage" class="welcome-message">{{ welcomeMessage }}</div>
    </div>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            welcomeMessage: this.$route.query.welcome,
            isAuthenticated: false,
        }
    },
    created() {
        this.isAuthenticated = !!localStorage.getItem('authToken');
    }
};
</script>

<style scoped>
.home {
    text-align: center;
    padding: 2em;
}

.router-link-active {
    color: #42b983;
}

h1 {
    font-family: 'Love Ya Like A Sister', cursive;
    font-size: 400%;
}

p {   
    font-family: 'Open Sans', sans-serif;
}

.welcome-message {
    color: rgb(219, 154, 32);
    font-family: 'Love Ya Like A Sister', cursive;
    font-size: 300%;
}

</style>
