<template>
    <div id="app">
        <header>
            <nav>
                <router-link to="/"><img src="./assets/home.png" alt=""></router-link>
                <!-- <router-link to="/signin">Sign In</router-link>
                <router-link to="/signup">Sign Up</router-link> -->
                <AppHeader />

            </nav>
        </header>
        <main>           
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';

export default {
    name: 'App',
    components: {
        AppHeader,
    },
};
</script>

<style>
ul {
    list-style-type: none;
    display: flex;
    justify-content: space-around;
    font-family: 'Love Ya Like A Sister', cursive;
    font-size: 200%;
}

img {
    height: 5%;
    width: 5%;
    padding-left: 10px;
    padding-top: 10px;
}

</style>
