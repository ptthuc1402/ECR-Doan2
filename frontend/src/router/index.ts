import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    component: () => import('@/views/Home.vue'),
    // middleware
    beforeEnter: (to, from, next) => {
      const user = JSON.parse(localStorage.getItem('roleid')!);
      if ((JSON.parse(localStorage.getItem('user')!) === null)) {
        return next({ path: '/login' });
      };
      if ((JSON.parse(localStorage.getItem('user')!) !== null) && (user==='2')) {
        return next({ path: '/home1' });
      }
      next();
    }
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
    // middleware
    beforeEnter: (to, from, next) => {
      if ((JSON.parse(localStorage.getItem('user')!) !== null)) {
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
    // Not found
    path: '/:pathMatch(.*)*',
    redirect: '/home'
  },
  {
    path: "/home1",
    component:() => import('@/views/Home_patient.vue'),
    beforeEnter: (to, from, next) => {
      const user = JSON.parse(localStorage.getItem('roleid')!);
      if ((JSON.parse(localStorage.getItem('user')!) !== null) && (user==='1')) {
        return next({ path: '/home' });
      }
      next();
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;