<template>
    <div class="home">
        <h1>HobbyHub</h1>

        <p> 
            Veuillez vous
            <router-link to="/signin">connecter</router-link>
            ou vous
            <router-link to="/signup">inscrire</router-link>
        </p>
    </div>
</template>

<script>
export default {
    name: "Home"
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

</style>
