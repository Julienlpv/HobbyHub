<template>
    <div>
        <h1>Étagères</h1>
        <ul>
            <li v-for="shelf in shelves" :key="shelf.id">
                {{ shelf.title }}
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            shelves: [],
        };
    },
    async mounted() {
        try {
            const response = await axios.get('/api/shelves', {
                headers: {
                    // Remplacez par le token d'accès OAuth 2.0 de l'utilisateur
                    Authorization: 'Bearer ACCESS_TOKEN',
                },
            });
            this.shelves = response.data.items;
        } catch (error) {
            console.error('Error fetching shelves:', error);
        }
    },
};
</script>
