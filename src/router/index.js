import Vue from "vue";
import VueRouter from "vue-router";

import Layout from '@/layouts'

Vue.use(VueRouter);

const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard'),
        meta: { title: 'Dashboard', icon: 'dashboard', permissions: ['admin'] }
      },
    ],
  },
  {
    path: '/home',
    component: Layout,
    redirect: '/home',
    meta: { title: '首页', icon: 'home' },
    children: [
      {
        path: '/index',
        name: 'list',
        component: () => import('@/views/index'),
        meta: { title: '列表', icon: 'unordered-list' }
      },
      {
        path: '/product',
        name: 'product',
        component: () => import('@/views/product'),
        meta: { title: '产品', icon: 'project' }
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login'),
    meta: { title: '登录' },
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/default/404'),
    meta: { title: 'NotFound' },
    hidden: true
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: constantRoutes
});

// 允许路由重复点击
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location, onResolve, onReject) {
//   if (onResolve || onReject)
//     return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch((err) => err)
// }

export default router;
