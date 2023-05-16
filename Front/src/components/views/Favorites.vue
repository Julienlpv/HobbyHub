<!-- <template>
    <div>
        <h1>Favoris</h1>
        <ul>
            <li v-for="favorite in favorites" :key="favorite.id">
                {{ favorite.title }}
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            favorites: [],
        };
    },
    async mounted() {
        try {
            const response = await axios.get('/api/favorites');
            this.favorites = response.data.items;
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    },
};
</script> -->


<template>
    <div>
        <h1>Favoris</h1>
        <ul>
            <li v-for="favorite in favorites" :key="favorite.id">
                {{ favorite.title }}
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            favorites: [],
        };
    },
    async mounted() {
        try {
            const response = await axios.get('/api/favorites/user/:userId');
            this.favorites = response.data;
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    },
};
</script>
