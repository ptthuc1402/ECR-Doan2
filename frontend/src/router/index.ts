import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    component: () => import('@/views/Home.vue'),
    beforeEnter: (to, from, next) => {
      if (JSON.parse(localStorage.getItem('user')) ===null) {
        return next({ path: '/login' });
      }
      next();
    }
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
    beforeEnter: (to, from, next) => {
      if (JSON.parse(localStorage.getItem('user')) !==null) {
        return next({ path: '/home' });
      }
      next();
    }
  },
  {
    path: '/register',
    component: () => import('@/views/Register.vue'),
    beforeEnter: (to, from, next) => {
      if (JSON.parse(localStorage.getItem('user')) !==null) {
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
    redirect: '/login'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
