<template>
  <header>
    <nav>
      <ul>
        <li><router-link to="/books" class="books">Livres</router-link></li>
        <li><router-link to="/series" class="series">Séries</router-link></li>
        <li><router-link to="/movies" class="films">Films</router-link></li>
        <li><router-link to="/musics" class="musics">Musiques</router-link></li>
        <li><router-link to="/favorites" class="favs">Mes favs</router-link></li>
        <li v-if="isAuthenticated"><a @click="logout" class="logout">Déconnexion</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      isAuthenticated: false,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('authToken');
      this.isAuthenticated = false;
      this.$router.push('/signin');
      this.$emit('auth-changed', this.isAuthenticated);
    },
  },
  created() {
    this.isAuthenticated = !!localStorage.getItem('authToken');
  },
  watch: {
    '$route'() {
      this.isAuthenticated = !!localStorage.getItem('authToken');
    },
  },
};
</script>

<style>

ul {
    width: 100%;
}

.books  {
  color: #90c470;
  font-weight: bolder;
}


.series {
  color: #E8CD9A;
  font-weight: bolder;
}


.films {
  color: #E89A9A;
  font-weight: bolder;
}


.musics {
  color: #9ACCE8;
  font-weight: bolder;
} 

</style>