import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Information from '../views/Information.vue'
import Login from '../views/authentication/Login.vue'
import Singup from '../views/authentication/SingUp.vue'
import ConfirmSignUp from '../views/authentication/ConfirmSignUp.vue'
import ForgotPassword from '../views/authentication/ForgotPassword.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/singup',
    name: 'Singup',
    component: Singup
  },
  {
    path: '/confirmsignup',
    name: 'ConfirmSignUp',
    component: ConfirmSignUp
  },
  {
    path: '/forgotpassword',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/information',
    name: 'information',
    component: Information
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
