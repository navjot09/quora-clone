import { createWebHistory, createRouter } from 'vue-router';
import Login from '../views/login.vue';
import Home from '../views/home.vue';
import Answer from '../views/answer.vue'
import Question from '../views/questions.vue';
import { getCookies } from '../../utils/utilities';
import Profile from '../views/profile.vue'



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
  },
  {
    path: '/answer',
    name: 'Answer',
    beforeEnter: (to, from, next) => {
      const cookies = getCookies()
      if (cookies.token) {
        next();
      } else {
        next('/login');
      }
    },
    component: Answer
  },
  {
    path : '/questions/:text/:id',
    name : 'Questions',
    beforeEnter: (to, from, next) => {
      const cookies = getCookies()
      if (cookies.token) {
        next();
      } else {
        next('/login');
      }
    },
    component : Question
  },
  {
    path : '/profile/:id',
    name : 'Profile',
    beforeEnter: (to, from, next) => {
      const cookies = getCookies()
      if (cookies.token) {
        next();
      } else {
        next('/login');
      }
    },
    component : Profile
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
