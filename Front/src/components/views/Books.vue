<!-- <template>
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

</script> -->


<template>
    <div>
        <h1>Recherche de livres</h1>
        <form @submit.prevent="searchBooks">
            <label for="search-query">Rechercher :</label>
            <input id="search-query" v-model="searchQuery" type="text" />
            <button type="submit">Rechercher</button>
        </form>
        <button @click="previousPage" :disabled="page <= 1"><img src="../../assets/arrowLeft.png" class="arrow" alt=""></button>
        <button @click="nextPage"><img src="../../assets/arrowRight.png" class="arrow" alt=""></button>
        <div class="card-container" v-if="books.length > 0">
            <h2>Résultats de la recherche</h2>
            <div class="card" v-for="book in books" :key="book.id">
                <h3>{{ book.volumeInfo.title }}</h3>
                <img v-if="book.volumeInfo.imageLinks" :src="book.volumeInfo.imageLinks.thumbnail" alt="Couverture du livre" class="bookimg" />
                <p>Auteurs : {{ book.volumeInfo.authors }}</p>
                <p>Nombre de pages : {{ book.volumeInfo.pageCount }}</p>
                <p>Éditeur : {{ book.volumeInfo.publisher }}</p>
                <p>Catégories : {{ book.volumeInfo.categories }}</p>
            </div>
        </div>
    </div>
</template>

<!-- <script>
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
                const response = await api.get(`/api/books/search?q=${this.searchQuery}&maxResults=40`);
                this.books = response.data;
            } catch (error) {
                console.error('Error fetching data from API:', error);
            }
        },
    },
};
</script> -->

<script>
import api from '../../services/api';

export default {
    data() {
        return {
            searchQuery: '',
            books: [],
            page: 1, // Ajoutez une nouvelle propriété pour suivre la page actuelle
        };
    },
    methods: {
        async searchBooks() {
            try {
                const response = await api.get(`/api/books/search?q=${this.searchQuery}&page=${this.page}`);
                this.books = response.data;
            } catch (error) {
                console.error('Error fetching data from API:', error);
            }
        },
        nextPage() {
            this.page += 1;
            this.searchBooks();
        },
        previousPage() {
            if (this.page > 1) {
                this.page -= 1;
                this.searchBooks();
            }
        },
    },
};
</script>

<style>
.card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.card {
    background-color: #f4f4f4;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 20px;
    margin: 20px;
    width: 300px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
}

.card h3 {
    margin: 0 0 15px 0;
}

.card p {
    margin: 0 0 10px 0;
}

.bookimg {
    min-width: 300px;
    min-height: 300px;
}

.arrow {
    max-width: 100px;
    max-height: 180px;
}
</style>
