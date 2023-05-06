<template>
    <header>
        <nav>
            <ul>
                <li><router-link to="/books" class="books">Livres</router-link></li>
                <li><router-link to="/series" class="series">Séries</router-link></li>
                <li><router-link to="/movies" class="films">Films</router-link></li>
                <li><router-link to="/musics" class="musics">Musiques</router-link></li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'AppHeader'
}
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