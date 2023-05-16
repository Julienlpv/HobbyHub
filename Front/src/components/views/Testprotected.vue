<template>
    <div>
        <h1>Page protégée</h1>
        <div v-if="message">
            <h2>{{ message }}</h2>
            
        </div>
    </div>
</template>

<script>
import { fetchProtectedData } from '../../services/protected';

export default {
    data() {
        return {
            message: '',
        };
    },
    async mounted() {
        const response = await fetchProtectedData();
        this.message = response.message;
    },
};
</script>


