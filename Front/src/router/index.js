import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/views/Home.vue';
import SignIn from '@/components/views/SignIn.vue';
import SignUp from '@/components/views/SignUp.vue';
import Books from '@/components/views/Books.vue';
import Series from '@/components/views/Series.vue';
import Movies from '@/components/views/Movies.vue';
import Musics from '@/components/views/Musics.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    },
   {
    path: '/books',
    name: 'Books',
    component: Books
  },
  {
    path: '/series',
    name: 'Series',
    component: Series
  },
  {
    path: '/movies',
    name: 'Movies',
    component: Movies
  },
  {
    path: '/musics',
    name: 'Musics',
    component: Musics
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
