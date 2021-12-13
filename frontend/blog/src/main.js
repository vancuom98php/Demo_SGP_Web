import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// import vue router
import VueRouter from 'vue-router'
import 'bootstrap'

Vue.use(VueRouter)

import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import HomePage from './components/HomePage'

const routes = [
    {path: '/login', component: Login, name: 'login'},
    {path: '/register', component: Register},
    {path: '/dashboard', component: Dashboard, name: 'dashboard'},
    {path: '/', component: HomePage, name: 'homepage'}
]

const router = new VueRouter({
    mode: 'history',
    routes
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
