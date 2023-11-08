import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    component: () => import('@/views/Home.vue'),
    // middleware
    beforeEnter: (to, from, next) => {
      if (JSON.parse(localStorage.getItem('user')!) === null) {
        return next({ path: '/login' });
      }
      next();
    }
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
    // middleware
    beforeEnter: (to, from, next) => {
      if (JSON.parse(localStorage.getItem('user')!) !== null) {
        return next({ path: '/home' });
      }
      next();
    }
  },
  {
    path: '/register',
    component: () => import('@/views/Register.vue'),

    // middelware
    beforeEnter: (to, from, next) => {
      if (JSON.parse(localStorage.getItem('user')!) !== null ) {
        return next({ path: '/home' });
      }
      next();
    }
  },
  {
    path: '/ocr',
    component: () => import('@/views/Ocr.vue')
  },
  {
    path: '/datepicker',
    component: () => import('@/views/content/Appoinment.vue'),

    // middleware
    beforeEnter: (to, from, next) => {
      if (JSON.parse(localStorage.getItem('user')!) === null ) {
        return next({ path: '/login' });
      }
      next();
    }
  },
  {
    // Not found
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;