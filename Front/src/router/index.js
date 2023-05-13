import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/views/Home.vue';
import SignIn from '@/components/views/SignIn.vue';
import SignUp from '@/components/views/SignUp.vue';
import Books from '@/components/views/Books.vue';
import Series from '@/components/views/Series.vue';
import Movies from '@/components/views/Movies.vue';
import Musics from '@/components/views/Musics.vue';
import Shelves from '@/components/views/Shelves.vue';
import Reviews from '@/components/views/Reviews.vue';
import Testprotected from '@/components/views/Testprotected.vue';

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
  },
  {
    path: '/shelves',
    name: 'Shelves',
    component: Shelves,
  },
  {
    path: '/reviews/:volumeId',
    name: 'Reviews',
    component: Reviews,
  },
  {
    path: '/test-protected',
    name: 'Testprotected',
    component: Testprotected,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
