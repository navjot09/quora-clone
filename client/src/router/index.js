import { createWebHistory, createRouter } from 'vue-router';
import Login from '../views/login.vue';
import Home from '../views/home.vue';
import { getCookies } from '../../utils/utilities';


const routes = [
  {
    path: '/login',
    name: 'Login',
    beforeEnter: (to, from, next) => {
      const cookies = getCookies()
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
      const cookies = getCookies()
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
