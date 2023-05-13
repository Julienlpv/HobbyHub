<template>
    <div>
        <h1>Critiques pour {{ bookTitle }}</h1>
        <ul>
            <li v-for="review in reviews" :key="review.id">
                {{ review.content }}
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            bookTitle: '',
            reviews: [],
        };
    },
    async mounted() {
        try {
            const { volumeId } = this.$route.params;
            const response = await axios.get(`/api/reviews/${volumeId}`);
            this.reviews = response.data.items;
            this.bookTitle = response.data.volumeInfo.title;
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    },
};
</script>
