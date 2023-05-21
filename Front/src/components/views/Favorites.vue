<!-- <template>
    <div>
        <h1>Mes favs</h1>
        <h2>voici mes favoris !</h2>
        <ul>
            <li v-for="favorite in favorites" :key="favorite._id">
                {{ favorite.name }}
            </li>
        </ul>
    </div>
</template> -->

<!-- <script>
import api from '../../services/api';

export default {
    data() {
        return {
            favorites: [],
            userId: null,
        };
    },
    async mounted() {
        try {
            const token = localStorage.getItem('authToken');
            console.log(token);
            const response = await api.get('/api/favorites', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            this.favorites = response.data;
            this.userId = response.data.userId;
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    },
};
</script> -->


<!-- <script>
import api from '../../services/api';

export default {
    data() {
        return {
            favorites: [],
            userId: null,
        };
    },
    async mounted() {
        try {
            const token = localStorage.getItem('authToken');
            console.log(token);
            const response = await api.get('/api/favorites', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            this.favorites = response.data;
            this.userId = response.data[0].userId; // Modifier cette ligne pour récupérer l'ID de l'utilisateur depuis la réponse
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    },
};
</script> -->


<template>
    <div>
        <h1>Mes favoris</h1>
        <ul>
            <li v-for="favorite in favorites" :key="favorite._id">
                {{ favorite.title }}
            </li>
        </ul>
    </div>
</template>

<script>
import api from '../../services/api';

export default {
    data() {
        return {
            favorites: [],
        };
    },
    async mounted() {
        try {
            const token = localStorage.getItem('authToken');
            const response = await api.get('/api/favorites', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            this.favorites = response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des favoris:', error);
        }
    },
};
</script>
