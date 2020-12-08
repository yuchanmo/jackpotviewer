import Vue from 'vue'
import VueRouter from 'vue-router'
import ItemList from '../views/ItemList.vue'
import Trend from '../views/Trend.vue'
import Summary from '../views/Summary.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/list',
    name: 'List',
    component: ItemList
  },
  {
    path: '/trend',
    name: 'Trend',
    component: Trend
  },
  {
    path : '/',
    name : 'Summary',
    component:Summary

  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
