import { createMemoryHistory, RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    // component: () => import('../App.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('../views/home/index.vue'),
      },
      {
        path: 'about',
        component: () => import('../views/about/index.vue')
      }
    ]
  }
]

const router = createRouter({
  routes,
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory()
});

export default router;