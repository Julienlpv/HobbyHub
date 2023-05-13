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

// export default {
//     data() {
//         return {
//             message: '',
//         };
//     },
//     methods: {
//         async fetchData() {
//             try {
//                 const data = await fetchProtectedData();
//                 this.data = data;
//             } catch (error) {
//                 console.error("Erreur lors de la récupération des données protégées", error);
//             }
//         }
//     },
//     mounted() {
//         this.fetchData();
//     }
// };

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


