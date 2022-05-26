import { createWebHistory, createRouter } from 'vue-router';
import Login from '../views/login.vue';
import Home from '../views/home.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    beforeEnter: (to, from, next) => {
      const cookies = document.cookie
        .split(';')
        .map((cookie) => cookie.split('='))
        .reduce(
          (accumulator, [key, value]) => ({
            ...accumulator,
            [key.trim()]: decodeURIComponent(value)
          }),
          {}
        );

      if (cookies.token) {
        next('/home');
      } else {
        next();
      }
    },
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    beforeEnter: (to, from, next) => {
      const cookies = document.cookie
        .split(';')
        .map((cookie) => cookie.split('='))
        .reduce(
          (accumulator, [key, value]) => ({
            ...accumulator,
            [key.trim()]: decodeURIComponent(value)
          }),
          {}
        );

      if (cookies.token) {
        next();
      } else {
        next('/login');
      }
    },
    component: Home
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
