import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import LoginPage from '../views/LoginPage.vue';
import CartPage from '@/views/CartPage.vue';
import MenuPage from '../views/MenuPage.vue';
import HistoryPage from '@/views/HistoryPage.vue';
import OrderPage from '@/views/OrderPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage
  },
  {
    path: '/menu',
    name: 'Menu',
    component: MenuPage
  },
  {
    path: '/history',
    name: 'History',
    component: HistoryPage
  },
  {
    path: '/order',
    name: 'Order',
    component: OrderPage
  },
  {
    path: '/productos/crear',
    name: 'ProductoFormPage',
    component: () => import('@/views/ProductoFormPage.vue')
  },
  {
    path: '/productos/editar/:id',
    component: () => import('@/views/ProductoFormPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
