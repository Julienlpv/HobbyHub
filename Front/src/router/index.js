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
    component: Home
    
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
     component: Books,
    meta: { requiresAuth: true }
  },
  {
    path: '/series',
    name: 'Series',
    component: Series,
    meta: { requiresAuth: true }
  },
  {
    path: '/movies',
    name: 'Movies',
    component: Movies,
    meta: { requiresAuth: true }
  },
  {
    path: '/musics',
    name: 'Musics',
    component: Musics,
    meta: { requiresAuth: true }
  },
  {
    path: '/shelves',
    name: 'Shelves',
    component: Shelves,
    meta: { requiresAuth: true }
  },
  {
    path: '/reviews/:volumeId',
    name: 'Reviews',
    component: Reviews,
    meta: { requiresAuth: true }
  },
  {
    path: '/test-protected',
    name: 'Testprotected',
    component: Testprotected,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    
    const token = localStorage.getItem('authToken');
    if (!token) {
     
      next({
        path: '/signin',
        query: { message: 'Vous devez être connecté pour accéder à cette fonctionnalité' }
      })
    } else {
      next() 
    }
  } else {
    next() 
  }
})



export default router;
