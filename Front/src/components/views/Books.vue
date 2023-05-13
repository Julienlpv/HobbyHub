<template>
    <div>
        <h1>Recherche de livres</h1>
        <form @submit.prevent="searchBooks">
            <label for="search-query">Rechercher :</label>
            <input id="search-query" v-model="searchQuery" type="text" />
            <button type="submit">Rechercher</button>
        </form>
        <div v-if="books.length > 0">
            <h2>Résultats de la recherche :</h2>
            <ul>
                <li v-for="book in books" :key="book.id">
                    <h3>{{ book.volumeInfo.title }}</h3>
                    <p>Auteurs : {{ book.volumeInfo.authors }}</p>
                    <p>Nombre de pages : {{ book.volumeInfo.pageCount }}</p>
                    <p>Éditeur : {{ book.volumeInfo.publisher }}</p>
                    <p>Catégories : {{ book.volumeInfo.categories }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
// Importez l'instance "api" d'Axios au lieu d'importer Axios directement
import api from '../../services/api';


export default {
    data() {
        return {
            searchQuery: '',
            books: [],
        };
    },
    methods: {
        async searchBooks() {
            try {
                // Utilisez l'instance "api" d'Axios pour faire la requête
                const response = await api.get(`/api/books/search?q=${this.searchQuery}`);
                this.books = response.data;
            } catch (error) {
                console.error('Error fetching data from API:', error);
            }
        },
    },
};

</script>
